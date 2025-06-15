import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// ページコンポーネントのインポート
import Home from './pages/Home'
import StartPage from './pages/StartPage'
import CallbackPage from './pages/CallbackPage'

// OpenAPIの設定
import { OpenAPI as SsoAuthOpenAPI } from '../generated/api/backend/sso-auth'
import { OpenAPI as UserOpenAPI } from '../generated/api/backend/user'

// APIのベースURLを設定
SsoAuthOpenAPI.BASE = '/api'
UserOpenAPI.BASE = '/api'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/start" element={<StartPage />} />
        <Route path="/auth/callback" element={<CallbackPage />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)


