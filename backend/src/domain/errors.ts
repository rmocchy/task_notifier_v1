/**
 * アプリケーションのエラーコード定義
 */
export enum ErrorCode {
  // 一般的なエラー
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  
  // ビジネスロジックエラー
  INVALID_INPUT = 'INVALID_INPUT',
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  
  // 外部サービスエラー
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
}

/**
 * アプリケーションの基本エラークラス
 */
export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * 内部エラー
 */
export class InternalError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(ErrorCode.INTERNAL_ERROR, message, cause);
  }
}

/**
 * バリデーションエラー
 */
export class ValidationError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(ErrorCode.VALIDATION_ERROR, message, cause);
  }
}

/**
 * 未検出エラー
 */
export class NotFoundError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(ErrorCode.NOT_FOUND, message, cause);
  }
}

/**
 * ビジネスルール違反エラー
 */
export class BusinessError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(ErrorCode.BUSINESS_RULE_VIOLATION, message, cause);
  }
}

/**
 * 外部サービスエラー
 */
export class ExternalServiceError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(ErrorCode.EXTERNAL_SERVICE_ERROR, message, cause);
  }
} 