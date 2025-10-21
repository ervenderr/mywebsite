"use server";

import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema (server-side validation)
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Sanitize input to prevent XSS attacks
function sanitizeInput(input: string): string {
  return input
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;")
    .replaceAll("/", "&#x2F;");
}

// Rate limiting check (simple in-memory approach - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // 3 submissions
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(email);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(email, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function sendContactForm(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Server-side validation
    const validatedData = contactFormSchema.parse(data);

    // Rate limiting
    if (!checkRateLimit(validatedData.email)) {
      return {
        success: false,
        error: "Too many requests. Please try again later.",
      };
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(validatedData.name);
    const sanitizedSubject = sanitizeInput(validatedData.subject);
    const sanitizedMessage = sanitizeInput(validatedData.message);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      // Fallback: log the message (for development)
      console.log("Contact form submission:", {
        name: sanitizedName,
        email: validatedData.email,
        subject: sanitizedSubject,
        message: sanitizedMessage,
      });
      return { success: true };
    }

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact <contact@ervenderr.com>", // Update with your verified domain
      to: ["ervenidjad12@gmail.com"], // Your email
      replyTo: validatedData.email,
      subject: `[Portfolio] ${sanitizedSubject}`,
      text: `
Name: ${sanitizedName}
Email: ${validatedData.email}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
Sent from ervenderr.com portfolio contact form
Received: ${new Date().toLocaleString()}
      `,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Message</h1>
            </div>
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px;">Contact Information</h2>
                <p style="margin: 10px 0;"><strong style="color: #495057;">Name:</strong> ${sanitizedName}</p>
                <p style="margin: 10px 0;"><strong style="color: #495057;">Email:</strong> <a href="mailto:${
                  validatedData.email
                }" style="color: #667eea; text-decoration: none;">${
        validatedData.email
      }</a></p>
                <p style="margin: 10px 0;"><strong style="color: #495057;">Subject:</strong> ${sanitizedSubject}</p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #667eea; margin-top: 0; font-size: 18px;">Message</h2>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea;">
                  <p style="margin: 0; white-space: pre-wrap;">${sanitizedMessage}</p>
                </div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 6px; border-left: 4px solid #0066cc;">
                <p style="margin: 0; font-size: 14px; color: #495057;">
                  <strong>Quick Reply:</strong> Click reply to respond directly to ${sanitizedName}
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding: 20px; color: #6c757d; font-size: 12px;">
              <p style="margin: 5px 0;">This message was sent from your portfolio contact form</p>
              <p style="margin: 5px 0;">Received on ${new Date().toLocaleString()}</p>
            </div>
          </body>
        </html>
      `,
      headers: {
        "X-Entity-Ref-ID": `contact-${Date.now()}`,
      },
      tags: [
        {
          name: "category",
          value: "portfolio-contact",
        },
      ],
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      };
    }

    console.log("Email sent successfully:", emailData);
    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid form data. Please check your inputs.",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
