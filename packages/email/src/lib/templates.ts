import PasswordResetEmail from "../templates/PasswordResetEmail";
import WelcomeEmail from "../templates/WelcomeEmail";
import MagicLinkEmail from "../templates/MagicLinkEmail";
import { EmailTemplates } from "../types";

// Map template names to their components
export const TEMPLATES: EmailTemplates = {
  WelcomeEmail,
  PasswordResetEmail,
  MagicLinkEmail,
  // Add all your other email templates here
};
