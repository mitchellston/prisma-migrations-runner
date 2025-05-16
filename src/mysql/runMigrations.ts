import { randomUUID } from "crypto";
import fs from "fs/promises";
import type { PrismaClient } from "../types/PrismaClient";
import { getDefaultMigrationsPath } from "../utils/getDefaultPaths";
import { getMigrations } from "./getMigrations";
import { generateChecksum } from "../utils/generateChecksum";

/**
 * Runs the migrations
 * @returns Returns true if the migrations ran successfully, false if they failed, and null if no migrations were found
 */
export async function runMigrations(
  prisma: PrismaClient,
  migrationsPath?: string,
  migrations?: string[]
) {
  if (!migrations || migrations.length === 0) {
    migrations = await getMigrations(prisma);
  }
  if (migrations.length === 0) {
    return null;
  }

  if (!migrationsPath) {
    migrationsPath = getDefaultMigrationsPath(prisma);
  }

  // Run every migration
  for (let i = 0; i < migrations.length; i++) {
    const uuid = randomUUID();
    const migration = migrations[i];
    const getStartedDateTime = new Date();
    // Execute the migration
    const path = `${migrationsPath}/${migration}/migration.sql`;
    const migrationSql = await fs.readFile(path, "utf8");

    await prisma.$queryRawUnsafe(migrationSql);

    const getFinishedDateTime = new Date();

    const checksum = generateChecksum(migrationSql);
    await prisma.$executeRaw`INSERT INTO _prisma_migrations (id, checksum, migration_name, started_at, finished_at, applied_steps_count) VALUES (${uuid}, ${checksum}, ${migration}, ${getStartedDateTime}, ${getFinishedDateTime}, 0);`;
  }

  return true;
}
