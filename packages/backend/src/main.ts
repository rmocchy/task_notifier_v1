import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'

const app = new Hono()

// 組み込みのロガーミドルウェアを適用
app.use('*', logger())

app.get('/health', (c) => c.json({ status: 'ok' }))

const port = 8787

serve({
  fetch: app.fetch,
  port
})