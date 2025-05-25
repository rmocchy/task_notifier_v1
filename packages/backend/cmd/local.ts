import InitBackendDI from "../src/di_backend";
import NewApp from "../app/local";
import { serve } from "@hono/node-server";
import { DatabaseConfig, getDBUrl } from "../configs/database";
import { InitDBConnection } from "../src/infra/db/PostgresClient";

const main = async () => {
  const dbConfig: DatabaseConfig = {
    url: getDBUrl(),
  };
  const port = 8787;

  // DI
  InitBackendDI(dbConfig);

  // DB
  await InitDBConnection(dbConfig).catch((error) => {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  });

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
