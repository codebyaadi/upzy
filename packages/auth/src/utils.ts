import { Database } from "@upzy/db/drizzle";
import { members, organizations } from "@upzy/db/schema/auth";
import { eq } from "@upzy/db/drizzle";

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
