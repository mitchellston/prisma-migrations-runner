import type { PrismaClient } from "../../types/PrismaClient";

export async function createMigrationTable(prisma: PrismaClient) {
  await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS _prisma_migrations (
    id varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    checksum varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    finished_at datetime(3) DEFAULT NULL,
    migration_name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    logs text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    rolled_back_at datetime(3) DEFAULT NULL,
    started_at datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    applied_steps_count int unsigned NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;
}
