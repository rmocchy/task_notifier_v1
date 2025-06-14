import { injectable, inject, Container } from "inversify";
import { IDBClientV2, DBClientV2Token } from "../infra/clients/db_client_v2";
import {
  HealthCheckRequest,
  HealthCheckResponse,
} from "@backend/gateway/health/schemas";

export const HealthCheckUseCaseToken = Symbol("HealthCheckUseCaseToken");

export const registerHealthCheckUseCase = (container: Container) => {
  container
    .bind<IHealthCheckUseCase>(HealthCheckUseCaseToken)
    .to(HealthCheckUseCase)
    .inSingletonScope();
};

export interface IHealthCheckUseCase {
  execute(req: HealthCheckRequest): Promise<HealthCheckResponse>;
}

@injectable()
class HealthCheckUseCase {
  constructor(@inject(DBClientV2Token) private dbClient: IDBClientV2) {}

  async execute(): Promise<HealthCheckResponse> {
    const dbHealth = await this.dbClient.isHealthy();

    return {
      status: dbHealth ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      details: {
        database: dbHealth,
      },
    };
  }
}
