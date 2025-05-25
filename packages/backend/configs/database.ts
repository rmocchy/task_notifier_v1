import {Envs} from './config'

export type DatabaseConfig = {
  url: string
}

export const getDBUrl = (): string => {
    var url = ""
    if (Envs.NODE_ENV === 'production') {
        const DB_HOST = Envs.DB_HOST || '';
        url =`postgres://${Envs.DB_USER}:${Envs.DB_PASS}@${DB_HOST}/${Envs.DB_NAME}`;
    } else {
        const DB_HOST = Envs.DB_HOST  || 'postgres'; // Docker Composeでのサービス名
        const DB_PORT = process.env.DB_PORT || '5432';
        url = `postgres://${Envs.DB_USER}:${Envs.DB_PASS}@${DB_HOST}:${DB_PORT}/${Envs.DB_NAME}`;
    }
    console.log(`DB URL: ${url}`);
    return url;
}

export const getDBSchema = (): string => {
    return Envs.DB_SCHEMA
}