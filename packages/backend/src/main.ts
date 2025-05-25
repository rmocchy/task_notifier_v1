import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { getDatabaseUrl } from './config/database'
import { createDatabaseClient } from './infra/db'
import { checkDatabaseHealth } from './usecase/healthCheck'

const createApp = () => {
  const app = new Hono()

  // 組み込みのロガーミドルウェアを適用
  app.use('*', logger())

  // データベースクライアントの初期化
  const dbClient = createDatabaseClient(getDatabaseUrl())

  // 基本的なサーバー疎通確認エンドポイント
  app.get('/health', (c) => {
    return c.json({
      status: 'healthy',
      timestamp: new Date().toISOString()
    })
  })

  // 統合ヘルスチェックエンドポイント（DBを含む）
  app.get('/health_integrate', async (c) => {
    const health = await checkDatabaseHealth(dbClient)
    return c.json(health, health.status === 'healthy' ? 200 : 503)
  })

  return app
}

const main = async () => {
  try {
    const port = 8787
    const app = createApp()

    console.log(`Server is starting on port ${port}...`)

    await serve({
      fetch: app.fetch,
      port
    })

    console.log(`Server is running on port ${port}`)
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// エントリーポイント
if (require.main === module) {
  main().catch((error) => {
    console.error('Unhandled error:', error)
    process.exit(1)
  })
}