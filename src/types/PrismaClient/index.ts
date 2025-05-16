import type { PrismaClientConfig } from "./prismaClientConfig";

// @TODO: Get the real type
export type PrismaClient = {
  _engine: {
    config: PrismaClientConfig;
  };
  $executeRaw: <T extends TemplateStringsArray>(
    query: T,
    ...values: any[]
  ) => Promise<number>;
  $queryRaw: <T extends TemplateStringsArray>(
    query: T,
    ...values: any[]
  ) => Promise<unknown>;
  $queryRawUnsafe: (query: string, ...values: any[]) => Promise<unknown>;
  $executeRawUnsafe: (query: string, ...values: any[]) => Promise<unknown>;
  $transaction: (queries: (fn: PrismaClient) => Promise<void>) => Promise<void>;
};
