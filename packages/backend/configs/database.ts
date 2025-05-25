import {Envs} from './config'

export type DatabaseConfig = {
  url: string
}

export type Config = {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
    ssl?: boolean; // Optional SSL configuration
}

export const GetConfig = (): Config => {
    const DB_USER = Envs.DB_USER || 'postgres';
    const DB_PASS = Envs.DB_PASS || 'postgres';
    const DB_NAME = Envs.DB_NAME || 'be_local';
    const DB_HOST = Envs.DB_HOST || 'postgres'; // Default to localhost if not set
    const DB_PORT = parseInt(Envs.DB_PORT || '5432', 10); // Default to 5432 if not set

    return {
        user: DB_USER,
        host: DB_HOST,
        database: DB_NAME,
        password: DB_PASS,
        port: DB_PORT,
        ssl: false 
    };
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