/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns any Basic health check status
     * @throws ApiError
     */
    public static healthCheck(): CancelablePromise<{
        status: 'healthy' | 'unhealthy';
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
            errors: {
                500: `内部サーバーエラー`,
            },
        });
    }
    /**
     * @returns any Integrated health check status including database
     * @throws ApiError
     */
    public static integratedHealthCheck(): CancelablePromise<{
        status: 'healthy' | 'unhealthy';
        timestamp: string;
        details: {
            database: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health_integrate',
        });
    }
}
