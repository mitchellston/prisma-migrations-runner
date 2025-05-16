import type { PrismaClient } from "../types/PrismaClient";

export function getDefaultMigrationsPath(client: PrismaClient) {
  return client._engine.config.cwd + "/migrations";
}
