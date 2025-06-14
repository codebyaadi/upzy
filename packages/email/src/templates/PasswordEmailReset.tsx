import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Button,
  Section,
  Hr,
} from "@react-email/components";

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
}

// Define the React component for your Password Reset Email template
const PasswordResetEmail = ({
  userName,
  resetUrl,
}: PasswordResetEmailProps) => (
  <Html lang="en">
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={heading}>Password Reset Request</Text>
        <Text style={paragraph}>Hello {userName},</Text>
        <Text style={paragraph}>
          We received a request to reset the password for your account. If you
          did not make this request, you can ignore this email.
        </Text>
        <Text style={paragraph}>
          To reset your password, please click the button below:
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={resetUrl}>
            Reset Your Password
          </Button>
        </Section>
        <Text style={paragraph}>
          This link will expire in a short period for security reasons.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          If you're having trouble with the button above, copy and paste the URL
          below into your web browser:
          <br />
          <Link href={resetUrl} style={anchor}>
            {resetUrl}
          </Link>
        </Text>
        <Text style={footer}>This email was sent by Your App Name.</Text>
      </Container>
    </Body>
  </Html>
);

// Define default props for the template
PasswordResetEmail.defaultProps = {
  userName: "User",
  resetUrl: "http://localhost:3000/reset-password?token=12345",
};

// Basic styling for the email (can be shared or customized per template)
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Inter, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  color: "#333333",
  marginBottom: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555555",
  margin: "0 30px 15px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#dc3545", // A red color for password reset
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "10px 20px",
};

const hr = {
  borderColor: "#e0e0e0",
  margin: "20px 0",
};

const footer = {
  color: "#888888",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "20px",
};

const anchor = {
  color: "#007bff",
  textDecoration: "underline",
};

export default PasswordResetEmail;
