import PasswordResetEmail from "../templates/PasswordEmailReset";
import WelcomeEmail from "../templates/WelcomeEmail";
import { EmailTemplates } from "../types";

// Map template names to their components
export const TEMPLATES: EmailTemplates = {
  WelcomeEmail,
  PasswordResetEmail,
  // Add all your other email templates here
};
