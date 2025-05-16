import type { PrismaClient } from "@prisma/client";
import { getPrismaProvider } from "./utils/getPrismaProvider";
import { getMigrations as getMysqlMigrations } from "./mysql/getMigrations";
import { runMigrations as runMysqlMigrations } from "./mysql/runMigrations";

export async function getMigrations(
  prisma: PrismaClient,
  settings?: {
    migrationsPath?: string;
  }
) {
  const provider = getPrismaProvider(prisma);
  if (provider === "mysql") {
    return await getMysqlMigrations(prisma, settings);
  } else {
    console.error(
      "Getting migrations not supported for this provider, please contibute or use the prisma cli"
    );
  }
}

export async function runMigrations(
  prisma: PrismaClient,
  settings?: {
    migrationsPath?: string;
    migrations?: string[];
  }
) {
  const provider = getPrismaProvider(prisma);
  if (provider === "mysql") {
    return await runMysqlMigrations(prisma, settings);
  } else {
    console.error(
      "Running migrations not supported for this provider, please contibute or use the prisma cli"
    );
  }
}
