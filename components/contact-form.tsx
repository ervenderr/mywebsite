"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendContactForm } from "@/app/actions";
import { Loader2 } from "lucide-react";

// Validation schema with security best practices
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
    .max(200, "Subject must be less than 200 characters")
    .regex(/^[a-zA-Z0-9\s.,!?'-]+$/, "Subject contains invalid characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters")
    .refine((msg) => msg.trim().length > 0, "Message cannot be empty"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);

    try {
      const result = await sendContactForm(data);

      if (result.success) {
        toast({
          title: "Message sent successfully! ✓",
          description:
            "Thank you for reaching out. I'll get back to you as soon as possible.",
        });
        reset();
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Failed to send message",
        description:
          error instanceof Error
            ? error.message
            : "Please try again later or email me directly at ervenidjad12@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          {...register("name")}
          placeholder="John Doe"
          disabled={isSubmitting}
          className={errors.name ? "border-destructive" : ""}
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email <span className="text-destructive">*</span>
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="john@example.com"
          disabled={isSubmitting}
          className={errors.email ? "border-destructive" : ""}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject <span className="text-destructive">*</span>
        </label>
        <Input
          id="subject"
          {...register("subject")}
          placeholder="Project inquiry"
          disabled={isSubmitting}
          className={errors.subject ? "border-destructive" : ""}
        />
        {errors.subject && (
          <p className="text-sm text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Tell me about your project or inquiry..."
          rows={5}
          disabled={isSubmitting}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Your information is secure and will only be used to respond to your
        inquiry.
      </p>
    </form>
  );
}
