import postgres from 'postgres'
import { getDatabaseUrl, getSchema } from '../config/database'

export type DatabaseClient = postgres.Sql<{}>

export interface DatabaseTestResult {
  isConnected: boolean
  userCount?: number
  error?: {
    message: string
    name: string
  }
}

export const createDatabaseClient = (connectionUrl: string): DatabaseClient => {
  return postgres(connectionUrl, {
    max: 10, // 接続プールの最大数
    idle_timeout: 20, // アイドル接続のタイムアウト（秒）
    connect_timeout: 10, // 接続タイムアウト（秒）
  })
}

export const testDatabaseConnection = async (
  client: DatabaseClient
): Promise<DatabaseTestResult> => {
  try {
    const schema = getSchema()
    const [{ count }] = await client`
      SELECT COUNT(*) as count
      FROM ${client(schema)}.users
    `
    
    return {
      isConnected: true,
      userCount: Number(count)
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        isConnected: false,
        error: {
          message: error.message,
          name: error.name
        }
      }
    }
    return {
      isConnected: false,
      error: {
        message: 'Unknown error occurred',
        name: 'UnknownError'
      }
    }
  }
}