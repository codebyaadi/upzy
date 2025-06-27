import * as React from "react";
import nodemailer from "nodemailer";
import { EmailTemplates } from "./types";
import { TEMPLATES } from "./lib/templates";
import { renderEmail } from "./lib/render";

/**
 * Sends an email using a specified React Email template.
 * @param to The recipient's email address.
 * @param subject The subject of the email.
 * @param templateName The name of the email template to use (e.g., 'WelcomeEmail').
 * @param templateProps The props to pass to the React Email template component.
 * @returns A Promise that resolves when the email is sent, or rejects on error.
 */
export async function sendEmail<T extends keyof EmailTemplates>(
  to: string,
  subject: string,
  templateName: T,
  templateProps: React.ComponentProps<EmailTemplates[T]>,
) {
  // Configure Nodemailer transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10), // Default to 587 if not set
    secure: parseInt(process.env.EMAIL_PORT || "587", 10) === 465, // Use SSL if port is 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Ensure the EMAIL_FROM environment variable is set
  const fromEmail = process.env.EMAIL_FROM;
  if (!fromEmail) {
    console.error(
      "EMAIL_FROM environment variable is not set. Email cannot be sent.",
    );
    throw new Error("EMAIL_FROM environment variable is not set.");
  }

  // Get the React Email component based on the templateName
  const EmailComponent = TEMPLATES[templateName];

  if (!EmailComponent) {
    console.error(`Email template "${String(templateName)}" not found.`);
    throw new Error(`Email template "${String(templateName)}" not found.`);
  }

  try {
    // Render the email component to HTML and plain text
    const { html, text } = await renderEmail(EmailComponent, templateProps);

    // Send the email using Nodemailer
    const info = await transporter.sendMail({
      from: fromEmail,
      to: to,
      subject: subject,
      html: html,
      text: text,
    });

    console.log(`Email sent to ${to}: %s`, info.messageId);
    return info;
  } catch (error) {
    console.error(
      `Failed to send email to ${to} using template ${String(templateName)}:`,
      error,
    );
    throw error;
  }
}
