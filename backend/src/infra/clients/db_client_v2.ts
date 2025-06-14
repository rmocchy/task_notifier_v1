import { injectable, Container } from "inversify";
import { PrismaClient } from "@prisma/client";

export interface IDBClientV2 {
  getPrismaClient(): PrismaClient;
}
export const DBClientV2Token = Symbol("DBClientV2Token");
export const registerDBClientV2 = (container: Container) => {
  container.bind<IDBClientV2>(DBClientV2Token).to(DBClientV2).inSingletonScope();
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
    if (!this.prismaClient) {
      this.prismaClient = new PrismaClient({
        log: ["query", "info", "warn", "error"],
      });
    }
    return this.prismaClient;
  }
}
