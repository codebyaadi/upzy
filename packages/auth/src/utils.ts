import { eq, schema, Database } from "@upzy/db";

const members = schema.members;
const organizations = schema.organizations;

export async function getActiveOrganization(userId: string, db: Database) {
  const result = await db
    .select()
    .from(members)
    .innerJoin(organizations, eq(members.organizationId, organizations.id))
    .where(eq(members.userId, userId))
    .limit(1);

  if (!result[0]) {
    throw new Error(`No organization found for user ${userId}`);
  }

  return result[0].organizations;
}
