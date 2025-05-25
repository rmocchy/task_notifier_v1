import { injectable, inject } from 'tsyringe'
import postgres from 'postgres'
import { DatabaseClient, DatabaseConfig } from './types'

type SqlInstance = postgres.Sql<{[key: string]: postgres.PostgresType<any>}>

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
      this.client = postgres(this.config.url, this.config.poolConfig) as SqlInstance
      // 接続テスト
      await this.query('SELECT 1')
    } catch (error) {
      throw new Error(`Failed to connect to database: ${error}`)
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
      await this.query('SELECT 1')
      return true
    } catch {
      return false
    }
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.client) {
      throw new Error('Database client is not connected')
    }
    const result = await this.client.unsafe(sql, params)
    return Array.from(result) as unknown as T[]
  }
} 