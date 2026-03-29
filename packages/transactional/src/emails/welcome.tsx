import { Html, Head, Body, Container, Text, Button, Section, Hr } from "@react-email/components";
import React from "react";

interface WelcomeEmailProps {
  userName?: string;
  ctaUrl?: string;
}

const WelcomeEmail = ({
  userName = "there",
  ctaUrl = "https://upzy.dev/login",
}: WelcomeEmailProps) => (
  <Html lang="en">
    <Head>
      {/* Load Google Font: Figtree */}
      <link
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Body style={styles.body}>
      <Container style={styles.container}>
        {/* Heading */}
        <Text style={styles.heading}>Welcome to Upzy, {userName} 👋</Text>

        {/* Paragraph */}
        <Text style={styles.paragraph}>
          Never miss a beat when your site goes down. With Upzy, you're always one step ahead.
        </Text>

        {/* CTA Button */}
        <Section style={styles.buttonContainer}>
          <Button style={styles.button} href={ctaUrl}>
            Get Started
          </Button>
        </Section>

        {/* Supporting text */}
        <Text style={styles.paragraph}>
          Have questions? Just reply to this email — we're here to help.
        </Text>

        {/* Divider */}
        <Hr style={styles.hr} />

        {/* Footer */}
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
    fontFamily: "'Figtree', -apple-system, BlinkMacSystemFont, sans-serif",
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
    fontFamily: "'Figtree', sans-serif",
    fontSize: "26px",
    fontWeight: 700,
    textAlign: "center" as const,
    color: "#f97316", // orange
    marginBottom: "20px",
  },
  paragraph: {
    fontFamily: "'Figtree', sans-serif",
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
    fontFamily: "'Figtree', sans-serif",
    backgroundColor: "#f97316",
    color: "#0d0d0d", // dark text for contrast
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
    fontFamily: "'Figtree', sans-serif",
    fontSize: "12px",
    color: "#888",
    textAlign: "center" as const,
  },
};

export default WelcomeEmail;
