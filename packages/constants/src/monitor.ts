export const AVAILABLE_REGIONS = [
  { id: "us-east-1", label: "US East (N. Virginia)" },
  { id: "us-west-2", label: "US West (Oregon)" },
  { id: "eu-west-1", label: "Europe (Ireland)" },
  { id: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  { id: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
];

export const MONITOR_TYPES = [
  {
    value: "http",
    label: "HTTP/HTTPS",
    description: "Monitor HTTP/HTTPS endpoints",
  },
  {
    value: "tcp",
    label: "TCP Port",
    description: "Monitor TCP port connectivity",
  },
  {
    value: "ping",
    label: "Ping",
    description: "Monitor server availability via ping",
  },
  { value: "dns", label: "DNS", description: "Monitor DNS resolution" },
  {
    value: "ssl",
    label: "SSL Certificate",
    description: "Monitor SSL certificate validity",
  },
  { value: "smtp", label: "SMTP", description: "Monitor email server" },
  { value: "pop3", label: "POP3", description: "Monitor POP3 email server" },
  { value: "imap", label: "IMAP", description: "Monitor IMAP email server" },
  {
    value: "playwright",
    label: "Browser",
    description: "Monitor with browser automation",
  },
  {
    value: "heartbeat",
    label: "Heartbeat",
    description: "Monitor application heartbeat",
  },
];

export const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
];

export const AUTH_TYPES = [
  { value: "none", label: "None" },
  { value: "basic", label: "Basic Auth" },
  { value: "bearer", label: "Bearer Token" },
  { value: "api_key", label: "API Key" },
  { value: "digest", label: "Digest Auth" },
];

export const DNS_RECORD_TYPES = [
  "A",
  "AAAA",
  "CNAME",
  "MX",
  "TXT",
  "NS",
  "SOA",
  "PTR",
];

export const STATUS_CODES = [
  200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 500, 502, 503,
];
