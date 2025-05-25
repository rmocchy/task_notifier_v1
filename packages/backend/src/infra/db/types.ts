import postgres from 'postgres'

export interface DatabaseClient {
  connect(): Promise<void>
  disconnect(): Promise<void>
  isHealthy(): Promise<boolean>
  query<T = any>(sql: string, params?: any[]): Promise<T[]>
  // 必要に応じて他のデータベース操作メソッドを追加
}

export interface DatabaseConfig {
  url: string
  poolConfig?: Omit<postgres.Options<any>, 'types'>
} 