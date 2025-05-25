import { injectable, inject } from 'tsyringe'
import { DBClient } from '../infra/clients/db_client'

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
    @inject(DBClient) private dbClient: DBClient
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