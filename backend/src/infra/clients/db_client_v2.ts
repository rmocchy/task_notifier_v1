import { injectable, Container } from "inversify";
import { PrismaClient } from "@prisma/client";

export interface IDBClientV2 {
  getPrismaClient(): PrismaClient;
  isHealthy(): Promise<boolean>;
}
export const DBClientV2Token = Symbol("DBClientV2Token");
export const registerDBClientV2 = (container: Container) => {
  container
    .bind<IDBClientV2>(DBClientV2Token)
    .to(DBClientV2)
    .inSingletonScope();
};

@injectable()
class DBClientV2 {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  getPrismaClient() {
    return this.prismaClient;
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.prismaClient.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error("Database health check failed:", error);
      return false;
    }
  }
}
