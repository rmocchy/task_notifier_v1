import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { injectable, inject, Container } from 'inversify';
import { GoogleAuthConfig, GoogleAuthConfigToken } from '../../../configs/google_auth';

export const GoogleAuthClientToken = Symbol("GoogleAuthClientToken");

export interface IGoogleAuthClient {
  generateAuthUrl(): { url: string; state: string };
  getToken(code: string): Promise<{ accessToken: string; refreshToken: string; expiryDate: number | null }>;
  refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; expiryDate: number | null }>;
  verifyAccessToken(accessToken: string): Promise<{ isValid: boolean; userId?: string; email?: string; error?: string }>;
}

export const registerGoogleAuthClient = (container: Container) => {
  container.bind<IGoogleAuthClient>(GoogleAuthClientToken).to(GoogleAuthClient).inSingletonScope();
};


@injectable()
class GoogleAuthClient {
  private client: OAuth2Client;

  constructor(@inject(GoogleAuthConfigToken) private config: GoogleAuthConfig) {
    this.client = new OAuth2Client(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );
  }

  /**
   * ランダムなstateを生成する
   * @returns 生成されたstate
   */
  private generateState(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * 認可URLを生成する
   * @returns 認可URLとstate（FEでの検証用）
   */
  public generateAuthUrl(): { url: string; state: string } {
    const state = this.generateState();
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid'
    ];

    const url = this.client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
      state: state
    });

    return { url, state };
  }

  /**
   * 認可コードからトークンを取得する
   * @param code 認可コード
   * @returns アクセストークンとリフレッシュトークン
   */
  public async getToken(code: string) {
    const { tokens } = await this.client.getToken(code);
    if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
      throw new Error('Failed to retrieve access token or refresh token from Google');
    }
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: tokens.expiry_date
    };
  }

  /**
   * リフレッシュトークンを使用して新しいアクセストークンを取得する
   * @param refreshToken リフレッシュトークン
   * @returns 新しいアクセストークン
   */
  public async refreshAccessToken(refreshToken: string) {
    this.client.setCredentials({
      refresh_token: refreshToken
    });

    const { credentials } = await this.client.refreshAccessToken();

    if (!credentials.access_token || !credentials.expiry_date) {
      throw new Error('Failed to refresh access token from Google');
    }

    return {
      accessToken: credentials.access_token,
      expiryDate: credentials.expiry_date
    };
  }

  /**
   * アクセストークンを検証する
   * @param accessToken アクセストークン
   * @returns 検証結果
   */
  public async verifyAccessToken(accessToken: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: accessToken,
        audience: this.config.clientId
      });
      
      const payload = ticket.getPayload();
      return {
        isValid: true,
        userId: payload?.sub,
        email: payload?.email
      };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
} 