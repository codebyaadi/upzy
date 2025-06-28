import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Hr,
  Button,
} from "@react-email/components";

interface WeeklyReportEmailProps {
  uptime?: string;
  downtimeEvents?: number;
  topMonitor?: string;
  reportUrl?: string;
}

const WeeklyReportEmail = ({
  uptime = "99.98%",
  downtimeEvents = 2,
  topMonitor = "api.upzy.dev",
  reportUrl = "https://upzy.dev/dashboard/reports",
}: WeeklyReportEmailProps) => (
  <Html lang="en">
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Text style={styles.heading}>📈 Your Weekly Uptime Summary</Text>

        <Text style={styles.paragraph}>
          Here's how your monitors performed this week:
        </Text>

        <Section style={styles.metricBox}>
          <Text style={styles.metricLabel}>Overall Uptime</Text>
          <Text style={styles.metricValue}>{uptime}</Text>
        </Section>

        <Section style={styles.metricBox}>
          <Text style={styles.metricLabel}>Downtime Events</Text>
          <Text style={styles.metricValue}>{downtimeEvents}</Text>
        </Section>

        <Section style={styles.metricBox}>
          <Text style={styles.metricLabel}>Top Performing Monitor</Text>
          <Text style={styles.metricValue}>{topMonitor}</Text>
        </Section>

        <Section style={styles.buttonContainer}>
          <Button style={styles.button} href={reportUrl}>
            View Full Report
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
    fontFamily: "'Inter', sans-serif",
    padding: 0,
    margin: 0,
  },
  container: {
    backgroundColor: "#121212",
    borderRadius: "12px",
    padding: "40px 30px",
    maxWidth: "540px",
    margin: "40px auto",
    border: "1px solid #222",
  },
  heading: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    textAlign: "center" as const,
    color: "#ffffff",
    marginBottom: "24px",
  },
  paragraph: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center" as const,
    color: "#cccccc",
    marginBottom: "24px",
  },
  metricBox: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "16px 24px",
    marginBottom: "16px",
    textAlign: "center" as const,
  },
  metricLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "4px",
  },
  metricValue: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "18px",
    fontWeight: 600,
    color: "#fff",
  },
  buttonContainer: {
    textAlign: "center" as const,
    marginTop: "32px",
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

export default WeeklyReportEmail;
