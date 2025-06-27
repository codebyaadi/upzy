import PasswordResetEmail from "../templates/PasswordResetEmail";
import WelcomeEmail from "../templates/WelcomeEmail";

// Define a type for mapping template names to their React components and props
export type EmailTemplates = {
  WelcomeEmail: typeof WelcomeEmail;
  PasswordResetEmail: typeof PasswordResetEmail;
  // Add all your other email templates here
  // Example: 'OrderConfirmation': typeof OrderConfirmationEmail;
};
