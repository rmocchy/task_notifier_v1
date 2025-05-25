import { DatabaseClient, testDatabaseConnection } from '../infra/db'
import { getDatabaseConfig } from '../config/database'

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy'
  database: {
    connected: boolean
    config: {
      host: string
      database: string
      schema: string
      environment: string
    }
    usersCount?: number
    error?: {
      message: string
      name: string
    }
  }
  timestamp: string
}

export const checkDatabaseHealth = async (
  dbClient: DatabaseClient
): Promise<HealthCheckResult> => {
  const config = getDatabaseConfig()
  const baseResult = {
    database: {
      config: {
        host: config.host,
        database: config.database,
        schema: config.schema,
        environment: process.env.NODE_ENV || 'development'
      }
    },
    timestamp: new Date().toISOString()
  }

  const testResult = await testDatabaseConnection(dbClient)

  if (!testResult.isConnected) {
    return {
      status: 'unhealthy',
      database: {
        ...baseResult.database,
        connected: false,
        error: testResult.error
      },
      timestamp: baseResult.timestamp
    }
  }

  return {
    status: 'healthy',
    database: {
      ...baseResult.database,
      connected: true,
      usersCount: testResult.userCount
    },
    timestamp: baseResult.timestamp
  }
} 