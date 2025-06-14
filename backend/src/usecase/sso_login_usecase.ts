import { injectable, inject, Container } from "inversify"
import { IGoogleAuthClient, GoogleAuthClientToken } from "../infra/clients/google_auth_client";
import { AppError, ErrorCode } from "../domain/errors";
import * as schema from "@backend/gateway/sso-auth/schemas";

export const SSOLoginUseCaseToken = Symbol("SSOLoginUseCaseToken");

export const registerSSOLoginUseCase = (container: Container) => {
  container.bind<ISSOLoginUseCase>(SSOLoginUseCaseToken).to(SSOLoginUseCase).inSingletonScope();
}

export interface ISSOLoginUseCase {
  generateAuthUri(req: schema.GoogleAuthUriRequest): Promise<schema.GoogleAuthUriResponse>;
  exchangeCodeForToken(req: schema.TokenExchangeRequest): Promise<schema.TokenExchangeResponse>;
  // TODO: トークンリフレッシュ
  // refreshAccessToken(refreshToken: string): Promise<Omit<TokenExchangeResponse, 'refreshToken'>>;
}

@injectable()
class SSOLoginUseCase implements ISSOLoginUseCase {
  constructor(
    @inject(GoogleAuthClientToken) private googleAuthClient: IGoogleAuthClient
  ) {}

  /**
   * 認可URLを生成する
   * @returns 認可URLとstate（FEでの検証用）
   */
  async generateAuthUri(_: schema.GoogleAuthUriRequest): Promise<schema.GoogleAuthUriResponse> {
    const res = this.googleAuthClient.generateAuthUrl();
    return {
      uri: res.url,
    }
  }

  /**
   * 認可コードからトークンを取得する
   * @param code 認可コード
   * @returns トークン情報
   * @throws {AppError} 認証エラーが発生した場合
   */
  async exchangeCodeForToken(
    req: schema.TokenExchangeRequest
  ): Promise<schema.TokenExchangeResponse> {
    const tokens = await this.googleAuthClient.getToken(req.code).catch((error) => {
      throw error
  });
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Failed to get tokens from Google"
      );
    }
    // TODO: cookieコールバックを呼んでsetCookieを行う
    return {
      access_token: tokens.accessToken,
    }
  }


  // TODO: トークンリフレッシュの実装
  // async refreshAccessToken(refreshToken: string): Promise<Omit<TokenExchangeResponse, 'refreshToken'>> {
  //   try {
  //     const result = await this.googleAuthClient.refreshAccessToken(refreshToken);
  //     if (!result.accessToken) {
  //       throw new AppError(
  //         ErrorCode.UNAUTHORIZED,
  //         "Failed to refresh access token"
  //       );
  //     }

  //     return {
  //       accessToken: result.accessToken,
  //       expiryDate: result.expiryDate || null
  //     };
  //   } catch (error) {
  //     if (error instanceof AppError) {
  //       throw error;
  //     }
  //     throw new AppError(
  //       ErrorCode.UNAUTHORIZED,
  //       "Failed to refresh access token",
  //       error
  //     );
  //   }
  // }
}