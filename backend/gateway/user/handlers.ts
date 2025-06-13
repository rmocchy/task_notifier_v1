import { Context } from "hono";
import {
  UserUseCaseToken,
  IUserUseCase,
} from "backend/src/usecase/user_usecase";
import { getContainer } from "backend/di/main";

export const userCountHandler = async (c: Context) => {
  const now = new Date();
  const userUseCase = getContainer().get<IUserUseCase>(UserUseCaseToken);
  const res = await userUseCase.countUsersByCreatedAt(now);

  return c.json({ count: res });
};
