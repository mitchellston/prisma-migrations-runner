import fs from "fs";
import type { PrismaClient } from "../types/PrismaClient";
import { getDefaultMigrationsPath } from "../utils/getDefaultPaths";
import { createMigrationTable } from "./sql/createMigrationTable";
import { getLastMigration } from "./utils/getLastMigration";

/**
 * This function will return an array of migration files that have not been run yet
 */
export async function getMigrations(
  prisma: PrismaClient,
  settings?: {
    migrationsPath?: string;
  }
) {
  // Create migration table if it doesn't exist
  await createMigrationTable(prisma);

  // Get last applied migration
  const lastMigration = await getLastMigration(prisma);

  // Apply settings
  let migrationsPath = settings?.migrationsPath;
  if (!migrationsPath) {
    migrationsPath = getDefaultMigrationsPath(prisma);
  }

  // Get migrations from file system
  const files = fs
    .readdirSync(migrationsPath)
    .filter((file) => file !== "migration_lock.toml")
    .sort();

  // Remove all migrations that have already been applied
  if (
    lastMigration &&
    typeof lastMigration === "object" &&
    "migration_name" in lastMigration
  ) {
    const index = files.findIndex(
      (file) => file == lastMigration.migration_name
    );
    if (index !== -1) {
      return files.slice(index + 1);
    }
  }

  return files;
}
