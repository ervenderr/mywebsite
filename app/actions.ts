"use server"

export async function sendContactForm(formData: FormData) {
  // Simulate a delay to mimic sending the form data
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Get form data
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // In a real application, you would send this data to your email service
  // For example, using Nodemailer, SendGrid, or another email service

  console.log("Contact form submission:", { name, email, subject, message })

  // Return success
  return { success: true }
}
