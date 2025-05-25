import { injectable, inject } from 'tsyringe'
import { DatabaseClient } from '../infra/db/types'

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  details: {
    database: boolean
  }
}

@injectable()
export class HealthCheckUseCase {
  constructor(
    @inject('DatabaseClient') private dbClient: DatabaseClient
  ) {}

  async execute(): Promise<HealthCheckResponse> {
    const dbHealth = await this.dbClient.isHealthy()

    return {
      status: dbHealth ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      details: {
        database: dbHealth
      }
    }
  }
} 