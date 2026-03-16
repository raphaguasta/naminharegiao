'use client'

import { useState } from 'react'
import type { Bairro } from '@/lib/types'

interface Props {
  bairros: Bairro[]
  onSelect: (bairro: Bairro) => void
  onClose: () => void
}

export default function GeolocationModal({ bairros, onSelect, onClose }: Props) {
  const [selected, setSelected] = useState<string>('')

  function handleConfirm() {
    const bairro = bairros.find(b => b.id === selected)
    if (bairro) {
      localStorage.setItem('nmr_bairro_id', bairro.id)
      localStorage.setItem('nmr_bairro_slug', bairro.slug)
      onSelect(bairro)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,15,30,0.8)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[rgba(42,140,140,0.15)] rounded-xl flex items-center justify-center text-xl">📍</div>
          <div>
            <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-base">Em qual bairro você está?</h2>
            <p className="text-[#8a9bc4] text-xs">Para mostrar os melhores negócios perto de você</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          {bairros.map(b => (
            <button key={b.id}
              onClick={() => setSelected(b.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                selected === b.id
                  ? 'border-[#2a8c8c] bg-[rgba(42,140,140,0.15)] text-white'
                  : 'border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] text-[#8a9bc4] hover:border-[rgba(42,140,140,0.3)] hover:text-white'
              }`}>
              <span className="font-medium">{b.nome}</span>
              <span className="ml-2 text-xs opacity-60">{b.cidade}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] text-[#8a9bc4] text-sm hover:text-white transition-colors">
            Ver todos
          </button>
          <button onClick={handleConfirm} disabled={!selected}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#e8603a] text-white text-sm font-medium hover:bg-[#f07550] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
