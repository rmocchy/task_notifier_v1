import { Context } from "hono";
import { SSOLoginUseCaseToken, ISSOLoginUseCase } from "backend/src/usecase/sso_login_usecase";
import { getContainer } from "backend/di/main";


export const googleAuthUriHandler = async (c: Context) => {
    const ssoLoginUsecase = getContainer().get<ISSOLoginUseCase>(SSOLoginUseCaseToken);
    const res = await ssoLoginUsecase.generateAuthUrl()
  return c.json({ url: res.url, state: res.state }, 200);
};

export const tokenExchangeHandler = async (c: Context) => {
  const ssoLoginUsecase =  getContainer().get<ISSOLoginUseCase>(SSOLoginUseCaseToken);

  const body = await c.req.json();
  const code = body.code;

  const res = await ssoLoginUsecase.exchangeCodeForToken(code);

  // cookieにリフレッシュトークンを設定するための処理が必要
  
  return c.json({
    access_token: res.accessToken,
  }, 200);
};