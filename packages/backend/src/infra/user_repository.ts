import { injectable, inject } from 'tsyringe'
import { DatabaseClient } from './db/types'
import postgres from 'postgres'

type SqlInstance = postgres.Sql<{[key: string]: postgres.PostgresType<any>}>

@injectable()
export class UserRepository {
  constructor(
    @inject('DatabaseClient') private dbClient: DatabaseClient
  ) {}

  async countUsers(): Promise<number> {
    const client = (this.dbClient as any).client as SqlInstance
    if (!client) {
      throw new Error('Database client is not connected')
    }
    const result = await client`SELECT COUNT(*) as count FROM users`
    return parseInt(result[0].count, 10)
  }
} 