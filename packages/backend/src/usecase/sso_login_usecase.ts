import { injectable, inject } from "tsyringe";
import { GoogleAuthClient } from "../infra/clients/google_auth_client";
import { AsyncBaseClass } from "../../domain/AsyncBaseClass";
import { AppError, ErrorCode } from "../../domain/errors";

export type AuthUrlResponse = {
  url: string;
  state: string;
};

export type TokenExchangeResponse = {
  accessToken: string;
  refreshToken: string;
  expiryDate: number | null;
};

@injectable()
export class SSOLoginUseCase extends AsyncBaseClass {
  constructor(
    @inject(GoogleAuthClient) private googleAuthClient: GoogleAuthClient
  ) {
    super();
  }

  /**
   * 認可URLを生成する
   * @returns 認可URLとstate（FEでの検証用）
   */
  async generateAuthUrl(): Promise<AuthUrlResponse> {
    return this.googleAuthClient.generateAuthUrl();
  }

  /**
   * 認可コードからトークンを取得する
   * @param code 認可コード
   * @returns トークン情報
   * @throws {AppError} 認証エラーが発生した場合
   */
  async exchangeCodeForToken(
    code: string
  ): Promise<TokenExchangeResponse> {
    try {
      const tokens = await this.googleAuthClient.getToken(code);
      if (!tokens.accessToken || !tokens.refreshToken) {
        throw new AppError(
          ErrorCode.UNAUTHORIZED,
          "Failed to get tokens from Google"
        );
      }

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiryDate: tokens.expiryDate || null
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Failed to exchange code for tokens",
        error
      );
    }
  }

  /**
   * リフレッシュトークンを使用して新しいアクセストークンを取得する
   * @param refreshToken リフレッシュトークン
   * @returns 新しいアクセストークン情報
   * @throws {AppError} トークンのリフレッシュに失敗した場合
   */
  async refreshAccessToken(refreshToken: string): Promise<Omit<TokenExchangeResponse, 'refreshToken'>> {
    try {
      const result = await this.googleAuthClient.refreshAccessToken(refreshToken);
      if (!result.accessToken) {
        throw new AppError(
          ErrorCode.UNAUTHORIZED,
          "Failed to refresh access token"
        );
      }

      return {
        accessToken: result.accessToken,
        expiryDate: result.expiryDate || null
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Failed to refresh access token",
        error
      );
    }
  }
} 