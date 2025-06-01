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

interface WelcomeEmailProps {
  userName: string;
  loginUrl: string;
}

// Define the React component for your Welcome Email template
const WelcomeEmail = ({ userName, loginUrl }: WelcomeEmailProps) => (
  <Html lang="en">
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={heading}>Welcome, {userName}!</Text>
        <Text style={paragraph}>
          Thank you for joining our community. We're excited to have you on
          board.
        </Text>
        <Text style={paragraph}>
          To get started, please log in to your account:
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={loginUrl}>
            Login to Your Account
          </Button>
        </Section>
        <Text style={paragraph}>
          If you have any questions, feel free to reply to this email.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>This email was sent by Your App Name.</Text>
      </Container>
    </Body>
  </Html>
);

// Define default props for the template, useful for previews or testing
WelcomeEmail.defaultProps = {
  userName: "New User",
  loginUrl: "http://localhost:3000/login",
};

// Basic styling for the email, using inline styles for maximum compatibility
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
  backgroundColor: "#007bff",
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

export default WelcomeEmail;
