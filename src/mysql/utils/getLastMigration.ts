import type { PrismaClient } from "../../types/PrismaClient";

export async function getLastMigration(prisma: PrismaClient) {
  const last = (await prisma.$queryRaw`SELECT *
    FROM _prisma_migrations
    WHERE finished_at > started_at
    AND rolled_back_at IS NULL
    ORDER BY started_at DESC
    LIMIT 1;`) as unknown[];

  if (last.length === 0) return null;

  return last[0];
}
