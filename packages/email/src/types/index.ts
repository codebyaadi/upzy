import WelcomeEmail from "@upzy/email/templates/WelcomeEmail";
import PasswordResetEmail from "@upzy/email/templates/PasswordEmailReset";

// Define a type for mapping template names to their React components and props
export type EmailTemplates = {
  WelcomeEmail: typeof WelcomeEmail;
  PasswordResetEmail: typeof PasswordResetEmail;
  // Add all your other email templates here
  // Example: 'OrderConfirmation': typeof OrderConfirmationEmail;
};
