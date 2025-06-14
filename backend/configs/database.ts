import {Envs} from './config'
import { Container } from 'inversify';


export const DBConfigToken = Symbol.for('DBConfig');

export const registerDBConfig = (container: Container): void => {
    const config = GetConfig();
    container.bind<Config>(DBConfigToken).toConstantValue(config);
}

export interface Config {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
    ssl?: boolean; // Optional SSL configuration
}

const GetConfig = (): Config => {
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