import { HealthCheckUseCaseToken, IHealthCheckUseCase } from "../../src/usecase/healthCheck";
import { getContainer } from "../../src/infra/di/container";
import { Context } from "hono";
import { HealthCheckRequestSchema } from "./schemas";
import {runUseCaseForGET} from "../../pkg/gateway";


export const healthCheckHandler = async (c:Context) => {
  const healthCheckUseCase = getContainer().get<IHealthCheckUseCase>(HealthCheckUseCaseToken)
  return await runUseCaseForGET(
    {
      context: c,
      reqSchema: HealthCheckRequestSchema,
      usecaseFn: async (args) => await healthCheckUseCase.execute(args)
    }
  )
}