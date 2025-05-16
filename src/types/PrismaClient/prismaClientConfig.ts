// PRISMACLIENT._engine.config
export type PrismaClientConfig = {
  cwd: string;
  dirname: string;
  activeProvider: "mysql" | "sqlite" | "postgresql" | "sqlserver" | "mongodb";
  generator: {
    name: string;
    provider: {
      fromEnvVar: string | null;
      value: string;
    };
    output: {
      value: string;
      fromEnvVar: string | null;
    };
    config: {
      engineType: string;
    };
    sourceFilePath: string;
    isCustomOutput: boolean;
  };
};
