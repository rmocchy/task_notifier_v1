import { injectable, inject, Container } from "inversify"
import { DBClientToken, IDBClient } from '../infra/clients/db_client'
import { HealthCheckRequest, HealthCheckResponse } from "@backend/gateway/health/schemas"

export const HealthCheckUseCaseToken = Symbol("HealthCheckUseCaseToken")

export const registerHealthCheckUseCase = (container: Container) => {
  container.bind<IHealthCheckUseCase>(HealthCheckUseCaseToken)
    .to(HealthCheckUseCase)
    .inSingletonScope()
}

export interface IHealthCheckUseCase {
  execute(req: HealthCheckRequest): Promise<HealthCheckResponse>
}

@injectable()
class HealthCheckUseCase {
  constructor(
    @inject(DBClientToken) private dbClient: IDBClient
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