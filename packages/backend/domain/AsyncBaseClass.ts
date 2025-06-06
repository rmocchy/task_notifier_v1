import { AppError, InternalError } from './errors';

/**
 * 非同期処理を含むクラスの基底クラス
 * 各層（usecase, domain, repository）でのエラーハンドリングを自動化する
 */
export abstract class AsyncBaseClass {
  protected constructor() {
    return new Proxy(this, {
      get: (target: any, propertyKey: string | symbol) => {
        const originalMethod = target[propertyKey];
        
        // メソッドでない場合や、privateメソッドの場合は元の値をそのまま返す
        if (typeof originalMethod !== 'function' || propertyKey.toString().startsWith('_')) {
          return originalMethod;
        }

        // メソッドをtry-catchで囲む
        return async (...args: any[]) => {
          try {
            const result = await originalMethod.apply(target, args);
            return result;
          } catch (error) {
            return this.handleError(error);
          }
        };
      }
    });
  }

  /**
   * エラーハンドリングの共通処理
   * - AppErrorのインスタンスの場合は、そのまま再スロー
   * - それ以外のエラーは、InternalErrorとしてラップして再スロー
   */
  protected handleError(error: unknown): never {
    // エラー情報をログに出力
    console.error({
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      code: error instanceof AppError ? error.code : undefined,
      timestamp: new Date().toISOString()
    });

    // AppErrorのインスタンスの場合は、そのまま再スロー
    if (error instanceof AppError) {
      throw error;
    }

    // それ以外のエラーは、InternalErrorとしてラップ
    throw new InternalError(
      typeof error === 'string' ? error : 'An unexpected error occurred',
      error
    );
  }
} 