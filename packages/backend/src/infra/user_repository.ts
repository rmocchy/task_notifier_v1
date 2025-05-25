import { injectable, inject } from "tsyringe";
import { countUsersByCreatedAt } from "../../generated/users.queries";
import { DBClient } from "./clients/db_client";

@injectable()
export class UserRepository {
  constructor(@inject(DBClient) private client: DBClient) {}

  async CountUsersByCreatedAt(createdAt: Date): Promise<number> {
    const result = await countUsersByCreatedAt.run(
      { created_at: createdAt ? new Date(createdAt).toISOString() : null },
      this.client.getPool() // Pool インスタンスを直接使う
    );
    const count = result[0]?.count ? parseInt(result[0].count, 10) : 0;
    return count;
  }
}