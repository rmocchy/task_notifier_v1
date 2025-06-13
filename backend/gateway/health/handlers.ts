import { HealthCheckUseCaseToken, IHealthCheckUseCase } from "../../src/usecase/healthCheck";
import { getContainer } from "backend/di/main";
import { Context } from "hono";

export const healthCheckHandler = async (c:Context) => {
  const healthCheckUseCase = getContainer().get<IHealthCheckUseCase>(HealthCheckUseCaseToken)
  const health = await healthCheckUseCase.execute();
  return c.json(health, health.status === 'healthy' ? 200 : 503);
}

export const healthCheckIntegrateHandler = async (c:Context) => {
    const healthCheckUseCase = getContainer().get<IHealthCheckUseCase>(HealthCheckUseCaseToken)
    const health = await healthCheckUseCase.execute();
    return c.json(health, health.status === "healthy" ? 200 : 503);
}