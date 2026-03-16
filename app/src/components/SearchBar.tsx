'use client'

import { useState, useRef } from 'react'
import NegocioCard from './NegocioCard'
import type { NegocioCompleto } from '@/lib/types'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<NegocioCompleto[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function search(q: string) {
    if (!q.trim()) { setResults([]); setSearched(false); return }
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.results ?? [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 500)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    search(query)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-[#1e2e50] border border-[rgba(255,255,255,0.12)] rounded-2xl overflow-hidden focus-within:border-[rgba(42,140,140,0.6)] transition-colors">
          <span className="pl-4 text-[#8a9bc4] text-lg shrink-0">🔍</span>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder='Pergunte algo como "pizza boa perto da Mooca"'
            className="flex-1 bg-transparent text-white placeholder-[#8a9bc4] px-3 py-4 text-sm outline-none"
          />
          {loading && (
            <div className="pr-4 shrink-0">
              <div className="w-4 h-4 border-2 border-[#3aabab] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {!loading && query && (
            <button type="submit" className="mr-3 bg-[#e8603a] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#f07550] transition-colors shrink-0">
              Buscar
            </button>
          )}
        </div>
      </form>

      {searched && !loading && (
        <div className="mt-4">
          {results.length > 0 ? (
            <>
              <p className="text-[#8a9bc4] text-xs mb-3">{results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map(n => <NegocioCard key={n.id} negocio={n} />)}
              </div>
            </>
          ) : (
            <p className="text-[#8a9bc4] text-sm text-center py-4">Nenhum resultado para &ldquo;{query}&rdquo;</p>
          )}
        </div>
      )}
    </div>
  )
}
