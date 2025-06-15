import { Context } from "hono";
import {
  SSOLoginUseCaseToken,
  ISSOLoginUseCase,
} from "../../src/usecase/sso_login_usecase";
import { getContainer } from "@backend/src/infra/di/container";
import { runUseCaseForGET, runUseCase } from "../../pkg/gateway";
import {
  GoogleAuthUriRequestSchema,
  TokenExchangeRequestSchema,
} from "./schemas";

export const getGoogleAuthUriHandler = async (c: Context) => {
  const ssoLoginUsecase =
    getContainer().get<ISSOLoginUseCase>(SSOLoginUseCaseToken);
  return await runUseCaseForGET({
    context: c,
    reqSchema: GoogleAuthUriRequestSchema,
    usecaseFn: async (args) => await ssoLoginUsecase.generateAuthUri(args),
  });
};

export const tokenExchangeHandler = async (c: Context) => {
  const ssoLoginUsecase =
    getContainer().get<ISSOLoginUseCase>(SSOLoginUseCaseToken);
  return await runUseCase({
    context: c,
    reqSchema: TokenExchangeRequestSchema,
    usecaseFn: async (args) => await ssoLoginUsecase.exchangeCodeForToken(args),
  });
};
