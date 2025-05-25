export const Envs: {
    NODE_ENV: string
    // 共通
    DB_USER: string
    DB_PASS: string
    DB_NAME: string
    DB_SCHEMA: string
    // local用
    DB_PORT: string
    // prd&カスタムlocal用
    DB_HOST?: string
} = {
    NODE_ENV:  process.env.NODE_ENV === 'production' ? 'production' : 'local',
    // 共通
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASS: process.env.DB_PASS || 'postgres',
    DB_NAME: process.env.DB_NAME || 'be_local',
    DB_SCHEMA: process.env.DB_SCHEMA || 'public',
    // local用
    DB_PORT: process.env.DB_PORT || '5432',
    // prd&カスタムlocal用
    DB_HOST: process.env.DB_HOST,
}