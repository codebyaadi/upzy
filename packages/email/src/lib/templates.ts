import WelcomeEmail from "@upzy/email/templates/WelcomeEmail";
import PasswordResetEmail from "@upzy/email/templates/PasswordEmailReset";
import { EmailTemplates } from "@upzy/email/types";

// Map template names to their components
export const TEMPLATES: EmailTemplates = {
  WelcomeEmail,
  PasswordResetEmail,
  // Add all your other email templates here
};
