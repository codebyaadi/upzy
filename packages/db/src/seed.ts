import { MonitorType, CheckStatus } from "../generated/prisma/client";
import { createPrismaClient } from "./client";

const prisma = createPrismaClient();

const USERS = [
  { name: "Sarah Chen", email: "sarah.chen@techflow.io" },
  { name: "Marcus Rodriguez", email: "m.rodriguez@cyber-sentinel.com" },
  { name: "Aisha Gupta", email: "aisha@cloud-scale.net" },
  { name: "Julian Vancore", email: "j.vancore@vanguard-sec.org" },
  { name: "Elena Rossi", email: "elena@biotech-systems.eu" },
  { name: "David Park", email: "dpark@nexus-ops.com" },
  { name: "Fiona Gallagher", email: "fiona@summit-networks.com" },
  { name: "Liam O’Sullivan", email: "liam.os@emerald-defense.ie" },
  { name: "Suki Sato", email: "sato.s@tokyo-infra.jp" },
  { name: "Arjun Mehra", email: "arjun@pioneer-labs.in" },
];

const ORGANIZATIONS = [
  { name: "TechFlow Solutions", slug: "techflow" },
  { name: "Cyber Sentinel Inc", slug: "cybersentinel" },
  { name: "CloudScale Networks", slug: "cloudscale" },
  { name: "Vanguard Security", slug: "vanguard" },
  { name: "BioTech Systems", slug: "biotech" },
  { name: "Nexus Operations", slug: "nexus" },
  { name: "Summit Global", slug: "summit" },
  { name: "Emerald Defense", slug: "emerald" },
  { name: "Tokyo Infrastructure", slug: "tokyoinfra" },
  { name: "Pioneer Labs", slug: "pioneer" },
];

const POPULAR_URLS = [
  "https://google.com",
  "https://youtube.com",
  "https://facebook.com",
  "https://amazon.com",
  "https://wikipedia.org",
  "https://twitter.com",
  "https://instagram.com",
  "https://linkedin.com",
  "https://reddit.com",
  "https://netflix.com",
  "https://github.com",
  "https://microsoft.com",
  "https://apple.com",
  "https://cloudflare.com",
  "https://wordpress.org",
  "https://mozilla.org",
  "https://adobe.com",
  "https://vimeo.com",
  "https://dropbox.com",
  "https://spotify.com",
  "https://nytimes.com",
  "https://cnn.com",
  "https://bbc.co.uk",
  "https://forbes.com",
  "https://theguardian.com",
  "https://bloomberg.com",
  "https://wsj.com",
  "https://reuters.com",
  "https://huffpost.com",
  "https://techcrunch.com",
  "https://twitch.tv",
  "https://discord.com",
  "https://slack.com",
  "https://zoom.us",
  "https://trello.com",
  "https://canva.com",
  "https://figma.com",
  "https://notion.so",
  "https://asana.com",
  "https://monday.com",
  "https://stripe.com",
  "https://paypal.com",
  "https://shopify.com",
  "https://mailchimp.com",
  "https://hubspot.com",
  "https://salesforce.com",
  "https://zendesk.com",
  "https://intercom.com",
  "https://okta.com",
  "https://auth0.com",
  "https://heroku.com",
  "https://vercel.com",
  "https://netlify.com",
  "https://digitalocean.com",
  "https://linode.com",
  "https://aws.amazon.com",
  "https://azure.microsoft.com",
  "https://cloud.google.com",
  "https://mongodb.com",
  "https://redis.com",
  "https://elastic.co",
  "https://datadoghq.com",
  "https://newrelic.com",
  "https://sentry.io",
  "https://loggly.com",
  "https://bitbucket.org",
  "https://gitlab.com",
  "https://docker.com",
  "https://kubernetes.io",
  "https://terraform.io",
  "https://stackoverflow.com",
  "https://medium.com",
  "https://quora.com",
  "https://dev.to",
  "https://hashnode.com",
  "https://producthunt.com",
  "https://indiehackers.com",
  "https://news.ycombinator.com",
  "https://slashdot.org",
  "https://dzone.com",
  "https://behance.net",
  "https://dribbble.com",
  "https://pinterest.com",
  "https://flickr.com",
  "https://giphy.com",
  "https://imgur.com",
  "https://9gag.com",
  "https://buzzfeed.com",
  "https://vice.com",
  "https://vox.com",
  "https://nationalgeographic.com",
  "https://nasa.gov",
  "https://un.org",
  "https://who.int",
  "https://wikipedia.com",
  "https://w3schools.com",
  "https://udemy.com",
  "https://coursera.org",
  "https://edx.org",
  "https://khanacademy.org",
];

async function main() {
  console.log("Cleaning database...");
  // Use a transaction for a clean wipe
  await prisma.$transaction([
    prisma.members.deleteMany(),
    prisma.workspaces.deleteMany(),
    prisma.monitors.deleteMany(),
    prisma.organizations.deleteMany(),
    prisma.users.deleteMany(),
  ]);

  console.log("Seeding Users & Organizations...");

  for (let i = 0; i < USERS.length; i++) {
    // 1. Use non-null assertion or local constants to satisfy TypeScript
    const userData = USERS[i]!;
    const orgData = ORGANIZATIONS[i]!;

    // 2. Create User
    // Note: Your schema for 'Users' requires an 'id' string and has no @default.
    const user = await prisma.users.create({
      data: {
        id: `user-id-${i}`, // Providing a manual ID as your schema requires it
        name: userData.name,
        email: userData.email,
      },
    });

    // 3. Create Org
    const org = await prisma.organizations.create({
      data: {
        id: `org-id-${i}`,
        name: orgData.name,
        slug: orgData.slug,
        createdAt: new Date(),
      },
    });

    // 4. Link User to Org
    await prisma.members.create({
      data: {
        id: `member-id-${i}`,
        organizationId: org.id,
        userId: user.id,
        role: "admin",
        createdAt: new Date(),
      },
    });

    // 5. Create Workspace
    const workspace = await prisma.workspaces.create({
      data: {
        name: `${org.name} Default`,
        orgId: org.id,
      },
    });

    // 6. Assign 10 URLs
    const startIndex = i * 10;
    const batch = POPULAR_URLS.slice(startIndex, startIndex + 10);

    // Using Promise.all for the monitors to speed up the seed
    await Promise.all(
      batch.map((url) => {
        const namePart =
          url.replace("https://", "").replace("http://", "").split(".")[0] || "Monitor";
        return prisma.monitors.create({
          data: {
            workspaceId: workspace.id,
            name: `${namePart.charAt(0).toUpperCase() + namePart.slice(1)} Health`,
            type: MonitorType.http,
            target: url,
            interval: 60,
            active: true,
            lastStatus: CheckStatus.up,
          },
        });
      }),
    );
  }

  console.log(
    `Seeding complete: ${USERS.length} Users and ${POPULAR_URLS.length} Monitors created.`,
  );
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
