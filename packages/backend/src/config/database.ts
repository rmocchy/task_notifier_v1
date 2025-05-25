interface DatabaseConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
  schema: string
}

// 環境ごとのデータベース設定
const databaseConfigs: Record<string, DatabaseConfig> = {
  local: {
    host: 'postgres', // Docker Composeのサービス名
    port: 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'be_local',
    schema: process.env.DATABASE_SCHEMA || 'public'
  },
  production: {
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || '',
    schema: process.env.DATABASE_SCHEMA || 'public'
  }
}

// 現在の環境を取得（デフォルトはlocal）
const currentEnv = process.env.NODE_ENV === 'production' ? 'production' : 'local'

// 現在の環境の設定を取得
export const getDatabaseConfig = (): DatabaseConfig => {
  const config = databaseConfigs[currentEnv]
  
  // 本番環境の場合は必須パラメータをチェック
  if (currentEnv === 'production') {
    const requiredParams = ['host', 'user', 'password', 'database']
    const missingParams = requiredParams.filter(param => !config[param as keyof DatabaseConfig])
    
    if (missingParams.length > 0) {
      throw new Error(`Missing required database configuration parameters: ${missingParams.join(', ')}`)
    }
  }
  
  return config
}

// データベースURLを構築
export const getDatabaseUrl = (): string => {
  const config = getDatabaseConfig()
  return `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`
}

// スキーマ名を取得
export const getSchema = (): string => {
  return getDatabaseConfig().schema
}

// 現在の環境名を取得
export const getCurrentEnv = (): string => currentEnv 