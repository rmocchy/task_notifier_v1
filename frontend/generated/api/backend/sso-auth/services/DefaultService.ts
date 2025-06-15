/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns any 認証URLを取得
     * @throws ApiError
     */
    public static googleAuthUri(): CancelablePromise<{
        url: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/google/url',
        });
    }
    /**
     * @param requestBody
     * @returns any 認証コードからトークンを取得
     * @throws ApiError
     */
    public static tokenExchange(
        requestBody?: {
            code: string;
        },
    ): CancelablePromise<{
        access_token: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/google/token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
