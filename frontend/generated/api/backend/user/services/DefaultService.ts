/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns any ユーザー数を取得
     * @throws ApiError
     */
    public static userCount(): CancelablePromise<{
        count: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/count',
        });
    }
}
