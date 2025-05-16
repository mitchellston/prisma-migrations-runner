# prisma-migrations-runner

Run Prisma migrations in code without the CLI. This package is created for the [this](https://github.com/prisma/prisma/issues/13549) Prisma issue.

## Notice

This package is not a replacement for the Prisma CLI. Currently, this package only supports MySQL. Also rollbacks are currently not yet supported.

## Why?

I am building applications that are going to be deployed to environments where I don't have access to the Prisma CLI. Which is why I created this package, to be able to run migrations in code.

## Features

- Get migrations that have not been applied
- Run any migrations for the prisma database

## Installation

```bash
npm install prisma-migrations-runner
```

## Usage

```ts
import { PrismaClient } from "@prisma/client";
import { runMigrations } from "prisma-migrations-runner";

const prisma = new PrismaClient();

await runMigrations(prisma);
```

## License

MIT
