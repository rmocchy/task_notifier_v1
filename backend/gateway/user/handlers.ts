import { Context } from "hono";
import {
  UserUseCaseToken,
  IUserUseCase,
} from "@backend/src/usecase/user_usecase";
import { getContainer } from "@backend/src/infra/di/container";
import { runUseCaseForGET } from "@backend/pkg/gateway";
import { UserCountRequestSchema } from "./schemas";

export const userCountHandler = async (c: Context) => {
  const userUseCase = getContainer().get<IUserUseCase>(UserUseCaseToken);
  return await runUseCaseForGET({
    context: c,
    reqSchema: UserCountRequestSchema,
    usecaseFn: async (args) => {
      return await userUseCase.countUsersByCreatedAt(args);
    },
  });
};
