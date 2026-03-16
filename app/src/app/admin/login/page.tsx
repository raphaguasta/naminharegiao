'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', { method: 'POST', body: JSON.stringify({ password }), headers: { 'Content-Type': 'application/json' } })
    if (res.ok) router.push('/admin')
    else { setError('Senha incorreta'); setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1929' }}>
      <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <path d="M20 3C13.37 3 8 8.37 8 15c0 9.75 12 22 12 22s12-12.25 12-22C32 8.37 26.63 3 20 3z" fill="#2a8c8c"/>
            <circle cx="20" cy="15" r="5" fill="white"/>
            <circle cx="20" cy="6" r="3" fill="#e8603a"/>
          </svg>
          <div>
            <h1 className="font-[family-name:var(--font-jakarta)] font-bold text-white">Na Minha Região</h1>
            <p className="text-[#8a9bc4] text-xs">Painel administrativo</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha de acesso"
            className="bg-[#1a2744] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-sm placeholder-[#8a9bc4] outline-none focus:border-[rgba(42,140,140,0.6)] transition-colors"
            autoFocus
          />
          {error && <p className="text-[#e8603a] text-xs">{error}</p>}
          <button type="submit" disabled={loading || !password}
            className="bg-[#e8603a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#f07550] transition-colors disabled:opacity-40">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
