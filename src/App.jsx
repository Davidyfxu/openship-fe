import { useEffect, useState } from 'react'

// 开发环境走 vite 代理：/api -> http://localhost:8000
// 部署时若前后端不同源，构建前设置 VITE_API_BASE_URL=http://<服务器IP>:8000/api
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function check() {
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch(`${API_BASE}/hello?name=BN Square`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setData(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    check()
  }, [])

  const state = loading ? 'wait' : error ? 'bad' : data ? 'ok' : ''

  return (
    <main className="card">
      <h1>BN Square · 部署连通性测试</h1>
      <p className="muted">前端 Vite + React，后端 FastAPI</p>

      <div className={`status ${state}`}>
        {loading ? '请求中…' : error ? '连接失败' : data ? '连接成功' : '未连接'}
      </div>

      <pre>{data ? JSON.stringify(data, null, 2) : error || `API_BASE = ${API_BASE}`}</pre>

      <button onClick={check} disabled={loading}>
        {loading ? '测试中…' : '重新测试'}
      </button>
    </main>
  )
}
