import type { PrismaClient } from "../types/PrismaClient";

export function getPrismaProvider(prisma: PrismaClient) {
  return prisma._engine.config.activeProvider;
}
