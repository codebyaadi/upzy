// scripts/seed.ts

import "dotenv/config";
import { faker } from "@faker-js/faker";
import { v7 as uuidv7 } from "uuid";
import { closeAllDatabaseConnections, getDefaultDb } from "./drizzle";
import * as schema from "./schema";

const main = async () => {
  const db = getDefaultDb();
  console.log("🌱 Seeding database with large dataset...");

  // 1. Clear existing data
  console.log("🔥 Deleting existing data...");
  await db.delete(schema.monitors);
  await db.delete(schema.members);
  await db.delete(schema.users);
  await db.delete(schema.organizations);
  console.log("✅ Existing data deleted.");

  // 2. Seed Organizations
  const ORG_COUNT = 25;
  console.log(`🏢 Seeding ${ORG_COUNT} organizations...`);
  const orgsData = Array.from({ length: ORG_COUNT }, () => {
    const companyName = faker.company.name();
    return {
      id: uuidv7(),
      name: companyName,
      slug: faker.helpers.slugify(companyName).toLowerCase(),
      createdAt: new Date(),
    };
  });
  const orgs = await db
    .insert(schema.organizations)
    .values(orgsData)
    .returning();
  console.log("✅ Organizations seeded.");

  // 3. Seed Users
  const USER_COUNT = 100;
  console.log(`👤 Seeding ${USER_COUNT} users...`);
  const usersData = Array.from({ length: USER_COUNT }, () => ({
    id: uuidv7(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
  }));
  const seededUsers = await db
    .insert(schema.users)
    .values(usersData)
    .returning();
  console.log("✅ Users seeded.");

  // 4. Seed Members (Link Users to Organizations)
  console.log(`🤝 Seeding ${USER_COUNT} members...`);
  const membersData = seededUsers.map((user) => {
    const randomOrg = orgs[Math.floor(Math.random() * orgs.length)];
    if (!randomOrg) {
      throw new Error("No organization found when creating member");
    }

    return {
      id: uuidv7(),
      organizationId: randomOrg.id,
      userId: user.id,
      role: Math.random() > 0.8 ? "admin" : "member",
      createdAt: new Date(),
    };
  });
  await db.insert(schema.members).values(membersData);
  console.log("✅ Members seeded.");

  // 5. Seed Monitors (500 for each organization with valid URLs)
  const MONITORS_PER_ORG = 500;
  const TOTAL_MONITORS = ORG_COUNT * MONITORS_PER_ORG;
  console.log(
    `📡 Seeding ${TOTAL_MONITORS} monitors using a list of 50 valid URLs...`,
  );

  // *** NEW: List of 50 valid URLs ***
  const VALID_URLS = [
    // Your provided URLs
    "https://refine-dashboard-ant.netlify.app/",
    "https://portfolio-react-framer-m.netlify.app/",
    "https://movieboot.netlify.app/",
    "https://finance-tracker-fastapi-react.netlify.app/",
    // 46 additional valid URLs
    "https://google.com",
    "https://github.com",
    "https://microsoft.com",
    "https://vercel.com",
    "https://aws.amazon.com",
    "https://cloudflare.com",
    "https://youtube.com",
    "https://developer.mozilla.org",
    "https://www.typescriptlang.org",
    "https://react.dev",
    "https://stackoverflow.com",
    "https://digitalocean.com",
    "https://www.mongodb.com",
    "https://www.postgresql.org",
    "https://redis.io",
    "https://www.docker.com",
    "https://kubernetes.io",
    "https://nodejs.org",
    "https://www.npmjs.com",
    "https://nextjs.org",
    "https://nestjs.com",
    "https://vuejs.org",
    "https://angular.io",
    "https://svelte.dev",
    "https://www.figma.com",
    "https://www.wikipedia.org",
    "https://drizzle-orm.com",
    "https://www.prisma.io",
    "https://graphql.org",
    "https://www.apollographql.com",
    "https://www.djangoproject.com",
    "https://rubyonrails.org",
    "https://laravel.com",
    "https://gohugo.io",
    "https://www.elastic.co",
    "https://prometheus.io",
    "https://grafana.com",
    "https://www.theverge.com",
    "https://www.nytimes.com",
    "https://www.bbc.com",
    "https://www.forbes.com",
    "https://stripe.com",
    "https://www.paypal.com",
    "https://www.shopify.com",
    "https://tailwindcss.com",
    "https://www.oracle.com",
  ];

  const randomUser = () => {
    const user = seededUsers[Math.floor(Math.random() * seededUsers.length)];
    if (!user) {
      throw new Error("No user found when creating monitor");
    }
    return user;
  };

  // Loop through each organization to create its monitors
  for (const org of orgs) {
    const monitorsData = Array.from({ length: MONITORS_PER_ORG }, () => {
      // *** MODIFIED: Pick a random URL from the valid list ***
      const randomUrl = faker.helpers.arrayElement(VALID_URLS);
      const monitorName = `Check ${new URL(randomUrl).hostname}`;

      return {
        name: monitorName,
        // After
        slug:
          faker.helpers.slugify(monitorName).toLowerCase() +
          `-${faker.string.alphanumeric(8)}`,
        url: randomUrl,
        type: "http" as const,
        interval: faker.helpers.arrayElement([60, 120, 300, 600]),
        regions: faker.helpers.arrayElements(
          ["us-east-1", "eu-west-1", "ap-south-1", "us-west-2"],
          { min: 1, max: 3 },
        ),
        createdById: randomUser().id,
        organizationId: org.id, // Assign to the current organization in the loop
      };
    });

    await db.insert(schema.monitors).values(monitorsData);
    console.log(`✅ Seeded ${MONITORS_PER_ORG} monitors for ${org.name}`);
  }

  console.log("✨ Seed complete!");
};

main()
  .catch((e) => {
    console.error("❌ An error occurred during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await closeAllDatabaseConnections();
  });
