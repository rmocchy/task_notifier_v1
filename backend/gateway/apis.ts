import getUserServiceAPI from './user/api';
import getSsoAuthServiceAPI from './sso-auth/api';
import getHealthServiceAPI from './health/api';
import { APIGenerateFunc } from './types';
import { Hono } from 'hono';

const apis : Array<APIGenerateFunc> = [
    getUserServiceAPI,
    getSsoAuthServiceAPI,
    getHealthServiceAPI
]

export default apis;

export const registerRoutesForServer = (app: Hono) => {
    apis.forEach((generateFunc) => {
        const { honoAPI } = generateFunc();
        // APIを統合したいが、prefixをつけるとopenAPIと乖離するのでここではrootを設定する
        app.route("/", honoAPI)
    });
    return app;
}