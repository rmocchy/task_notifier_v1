import { injectable, inject, Container } from "inversify";
import { countUsersByCreatedAt } from "../../generated/users.queries";
import { DBClientToken, IDBClient } from "./clients/db_client";

export const UserRepositoryToken = Symbol("UserRepositoryToken");

export interface IUserRepository {
  CountUsersByCreatedAt(createdAt: Date): Promise<number>;
}
export const registerUserRepository = (container: Container) => {
  container.bind<IUserRepository>(UserRepositoryToken).to(UserRepository).inSingletonScope();
};

@injectable()
class UserRepository {
  constructor(@inject(DBClientToken) private client: IDBClient) {}

  async CountUsersByCreatedAt(createdAt: Date): Promise<number> {
    const result = await countUsersByCreatedAt.run(
      { created_at: createdAt ? new Date(createdAt).toISOString() : null },
      this.client.getPool() // Pool インスタンスを直接使う
    );
    const count = result[0]?.count ? parseInt(result[0].count, 10) : 0;
    return count;
  }
}