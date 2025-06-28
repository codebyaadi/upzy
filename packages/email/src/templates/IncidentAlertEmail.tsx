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

interface IncidentAlertEmailProps {
  monitorName?: string;
  downTime?: string;
  statusPageUrl?: string;
}

const IncidentAlertEmail = ({
  monitorName = "api.upzy.dev",
  downTime = "June 27, 2025, 10:42 PM UTC",
  statusPageUrl = "https://upzy.dev/status",
}: IncidentAlertEmailProps) => (
  <Html lang="en">
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Text style={styles.heading}>🚨 Incident Detected</Text>
        <Text style={styles.paragraph}>
          One of your monitors just went down: <strong>{monitorName}</strong>
        </Text>
        <Text style={styles.paragraph}>
          <strong>Time:</strong> {downTime}
        </Text>
        <Section style={styles.buttonContainer}>
          <Button style={styles.button} href={statusPageUrl}>
            View Incident
          </Button>
        </Section>
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
    padding: 0,
    margin: 0,
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
    fontSize: "22px",
    fontWeight: 700,
    textAlign: "center" as const,
    color: "#ff4d4f",
    marginBottom: "24px",
  },
  paragraph: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center" as const,
    color: "#cccccc",
    marginBottom: "16px",
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

export default IncidentAlertEmail;
