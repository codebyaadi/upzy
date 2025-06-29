import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Section,
  Hr,
} from "@react-email/components";

interface MagicLinkEmailProps {
  userName?: string;
  loginUrl?: string;
}

const MagicLinkEmail = ({
  userName = "there",
  loginUrl = "https://yourapp.com/magic-login",
}: MagicLinkEmailProps) => (
  <Html lang="en">
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Text style={styles.heading}>
          Here’s your magic link, {userName} ✨
        </Text>

        <Text style={styles.paragraph}>
          Click the button below to securely log in. This link will expire soon,
          so don’t wait too long!
        </Text>

        <Section style={styles.buttonContainer}>
          <Button style={styles.button} href={loginUrl}>
            Log In Now
          </Button>
        </Section>

        <Text style={styles.paragraph}>
          Didn’t request this? You can safely ignore this email.
        </Text>

        <Hr style={styles.hr} />

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Upzy — Monitoring made better.
        </Text>
      </Container>
    </Body>
  </Html>
);

const styles = {
  body: {
    backgroundColor: "#0d0d0d",
    color: "#f4f4f5",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "0",
    margin: "0",
  },
  container: {
    backgroundColor: "#121212",
    borderRadius: "12px",
    padding: "40px 30px",
    maxWidth: "520px",
    margin: "40px auto",
    border: "1px solid #222",
  },
  heading: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "26px",
    fontWeight: 700,
    textAlign: "center" as const,
    color: "#ffffff",
    marginBottom: "20px",
  },
  paragraph: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    lineHeight: "28px",
    textAlign: "center" as const,
    color: "#cccccc",
    marginBottom: "20px",
  },
  buttonContainer: {
    textAlign: "center" as const,
    margin: "32px 0",
  },
  button: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: "12px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 600,
    textDecoration: "none",
  },
  hr: {
    borderColor: "#2a2a2a",
    margin: "32px 0",
  },
  footer: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "12px",
    color: "#888",
    textAlign: "center" as const,
  },
};

export default MagicLinkEmail;
