import "reflect-metadata"

import NewApp from "../app/local";
import { serve } from "@hono/node-server";
import { GetConfig as GetDBConfig } from "../configs/database";
import { SetDIValue } from "../src/di";

const main = async () => {
  const port = 8787;

  // DI
  SetDIValue("DBConfig", GetDBConfig());

  const app = NewApp();

  console.log(`Server is starting on port ${port}...`);

  try {
    await serve({
      fetch: app.fetch,
      port,
    });

    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

main();
