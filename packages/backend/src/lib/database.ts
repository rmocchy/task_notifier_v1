import postgres from 'postgres'
import { getDatabaseUrl } from '../config/database'

// データベースクライアントの設定
const sql = postgres(getDatabaseUrl(), {
  max: 10, // 接続プール数
  idle_timeout: 20,
  connect_timeout: 10
})

export default sql 