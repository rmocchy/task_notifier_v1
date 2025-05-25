import { injectable, inject } from 'tsyringe'
import postgres from 'postgres'
import { DatabaseClient, DatabaseConfig } from './types'
import { container } from 'tsyringe'

type SqlInstance = postgres.Sql<{[key: string]: postgres.PostgresType<any>}>

export async function InitDBConnection(config: DatabaseConfig) {
  const dbClient = container.resolve<DatabaseClient>("DatabaseClient")
  await dbClient.connect()
}

@injectable()
export class PostgresClient implements DatabaseClient {
  private client: SqlInstance | null = null
  private config: DatabaseConfig

  constructor(@inject('DatabaseConfig') config: DatabaseConfig) {
    this.config = config
  }

  async connect(): Promise<void> {
    if (this.client) {
      return
    }

    try {
      this.client = postgres(this.config.url, {
        max: 1,
        idle_timeout: 20,
        connect_timeout: 10,
        transform: {
          undefined: null,
        },
      }) as SqlInstance

      // Test the connection
      await this.client`SELECT 1`
    } catch (error) {
      this.client = null
      throw error
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.end()
      this.client = null
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      if (!this.client) {
        await this.connect()
      }
      if (!this.client) {
        return false
      }
      await this.client`SELECT 1`
      return true
    } catch {
      return false
    }
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.client) {
      throw new Error('Database client is not connected')
    }
    const result = await this.client(sql, params)
    return Array.from(result) as unknown as T[]
  }
} 