"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  businessSlug: string;
  recipientEmail: string;
}

/**
 * Server action: sends a contact form submission via Resend.
 * Called from the API route at /api/contact.
 */
export async function sendContactEmail(data: ContactSubmission) {
  const { name, email, phone, message, businessSlug, recipientEmail } = data;

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
    <hr />
    <p>${message.replace(/\n/g, "<br />")}</p>
    <hr />
    <p style="color: #999; font-size: 12px;">Sent from your website (${businessSlug})</p>
  `;

  const { error } = await resend.emails.send({
    from: `Website Contact <contact@${process.env.RESEND_DOMAIN ?? "notifications.example.com"}>`,
    to: recipientEmail,
    replyTo: email,
    subject: `New message from ${name} via your website`,
    html: htmlBody,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return { success: true };
}
