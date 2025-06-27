# ⚡ Upzy

Upzy is a modern uptime and performance monitoring platform inspired by BetterStack — but built to go further. It provides fast, reliable uptime checks, smart incident alerts, and is designed with a scalable microservices-first architecture using Turborepo.

## 🚀 Features

- 🔍 **Uptime Monitoring** — Track the availability of websites, APIs, and services in real-time.
- 📬 **Incident Alerts** — Get instant email alerts when downtime is detected.
- 🕵️‍♂️ **Smart Checks** — Perform regular HTTP checks with customizable intervals and timeouts.
- 🧾 **Monitor Dashboard** — View all your monitors, statuses, and response times in one place (coming soon).
- 📊 **Historical Logs** — Access uptime/downtime history and monitor performance over time (coming soon).
- 🧠 **Incident Timeline** — Automatically track when an incident starts, escalates, and resolves (planned).
- 🌐 **Public Status Pages** — Share uptime stats publicly with beautiful custom pages (planned).


## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Backend**: NestJS (Node.js)
- **Emails**: React Email + Nodemailer
- **Database**: PostgreSQL
- **Monorepo Tooling**: Turborepo
- **Planned**: Golang services, Redis, Kafka, k8s

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/codebyaadi/upzy.git
cd upzy
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

- For **apps/api** (NestJS):
```bash
cd apps/api
cp .env.example .env
# Fill in DB connection, SMTP config, etc.
```

- For **apps/web** (Next.js):
```bash
cd apps/web
cp .env.example .env
# Add NEXT_PUBLIC_ variables, API base URL, etc.
```

## 🚀 Running the Application

Start all services in dev mode:
```bash
bun run dev
```

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/awesome-feature`)  
3. Commit your changes (`git commit -m 'Add awesome feature'`)  
4. Push to the branch (`git push origin feature/awesome-feature`)  
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Aditya Rajbhar – [codebyaadi](https://github.com/codebyaadi)

## 🙏 Acknowledgments

- Inspired by BetterStack and other dev tools  
- Built with passion for reliability and DX  
- Powered by modern open-source stacks
