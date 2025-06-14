import { injectable, inject, Container } from "inversify";
import { DBClientV2Token, IDBClientV2 } from "../infra/clients/db_client_v2";
import { PrismaClient } from "@prisma/client";

export const UserRepositoryToken = Symbol("UserRepositoryToken");

export interface IUserRepository {
  CountUsersByCreatedAt(createdAt: Date): Promise<number>;
}
export const registerUserRepository = (container: Container) => {
  container.bind<IUserRepository>(UserRepositoryToken).to(UserRepository).inSingletonScope();
};

@injectable()
class UserRepository {
  private prisma : PrismaClient;
  constructor(@inject(DBClientV2Token) private clientV2: IDBClientV2) {
    this.prisma = this.clientV2.getPrismaClient();
  }

  async CountUsersByCreatedAt(createdAt: Date): Promise<number> {
    return await this.prisma.users.count()
  }
}