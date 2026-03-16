'use client'

import { useEffect, useState } from 'react'
import BairroCard from '@/components/BairroCard'
import NegocioCard from '@/components/NegocioCard'
import SearchBar from '@/components/SearchBar'
import GeolocationModal from '@/components/GeolocationModal'
import type { Bairro, NegocioCompleto } from '@/lib/types'

interface Props {
  bairros: Bairro[]
  negociosDestaque: NegocioCompleto[]
}

export default function HomeClient({ bairros, negociosDestaque }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [bairroAtual, setBairroAtual] = useState<Bairro | null>(null)
  const [negociosLocais, setNegociosLocais] = useState<NegocioCompleto[]>([])

  useEffect(() => {
    // Tenta recuperar bairro salvo
    const savedSlug = localStorage.getItem('nmr_bairro_slug')
    if (savedSlug) {
      const b = bairros.find(b => b.slug === savedSlug)
      if (b) { setBairroAtual(b); filterDestaques(b); return }
    }

    // Solicita geolocalização
    if (!navigator.geolocation) { setShowModal(true); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestBairro(pos.coords.latitude, pos.coords.longitude, bairros)
        if (nearest) { setBairroAtual(nearest); filterDestaques(nearest) }
        else setShowModal(true)
      },
      () => setShowModal(true),
      { timeout: 5000 }
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function filterDestaques(bairro: Bairro) {
    setNegociosLocais(negociosDestaque.filter(n => n.bairro_id === bairro.id))
  }

  function onModalSelect(bairro: Bairro) {
    setBairroAtual(bairro)
    filterDestaques(bairro)
    setShowModal(false)
  }

  return (
    <>
      {showModal && <GeolocationModal bairros={bairros} onSelect={onModalSelect} onClose={() => setShowModal(false)} />}

      {/* Hero */}
      <section className="relative px-[5vw] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(42,140,140,0.15) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[rgba(42,140,140,0.12)] border border-[rgba(42,140,140,0.3)] text-[#3aabab] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3aabab] inline-block" />
            Guia local com IA — recomendado pela comunidade
          </div>
          <h1 className="font-[family-name:var(--font-jakarta)] font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            O melhor do seu bairro,<br /><span className="text-[#e8603a]">na ponta dos dedos</span>
          </h1>
          <p className="text-[#8a9bc4] text-lg mb-8 max-w-xl mx-auto">
            Descubra restaurantes, cafés, bares e serviços recomendados pelo guia da sua comunidade.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Destaques por localização */}
      {negociosLocais.length > 0 && bairroAtual && (
        <section className="px-[5vw] py-10 border-t border-[rgba(255,255,255,0.05)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-1.5 text-[#3aabab] text-xs font-medium uppercase tracking-widest mb-1">
                  <span className="w-5 h-0.5 bg-[#3aabab] inline-block" />
                  Perto de você
                </div>
                <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl">
                  Destaques em {bairroAtual.nome}
                </h2>
              </div>
              <button onClick={() => { localStorage.removeItem('nmr_bairro_id'); localStorage.removeItem('nmr_bairro_slug'); setShowModal(true) }}
                      className="text-[#8a9bc4] text-xs hover:text-white transition-colors flex items-center gap-1">
                📍 Mudar bairro
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {negociosLocais.map(n => <NegocioCard key={n.id} negocio={n} />)}
            </div>
          </div>
        </section>
      )}

      {/* Grid de bairros */}
      <section className="px-[5vw] py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-1.5 text-[#3aabab] text-xs font-medium uppercase tracking-widest mb-2">
            <span className="w-5 h-0.5 bg-[#3aabab] inline-block" />
            Explorar
          </div>
          <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl mb-6">Bairros disponíveis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bairros.map(b => <BairroCard key={b.id} bairro={b} />)}
          </div>
        </div>
      </section>

      {/* CTA parceiros */}
      <section className="px-[5vw] py-16 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(232,96,58,0.08) 0%, transparent 70%)' }} />
            <p className="text-[#3aabab] text-xs font-medium uppercase tracking-widest mb-3 relative">Para guias de bairro</p>
            <h2 className="font-[family-name:var(--font-jakarta)] font-extrabold text-white text-2xl md:text-3xl mb-3 relative">
              Seu bairro já tem comunidade.<br />Agora pode gerar receita.
            </h2>
            <p className="text-[#8a9bc4] mb-6 relative max-w-md mx-auto text-sm">
              Transforme seus seguidores em receita recorrente. Sem custo de adesão.
            </p>
            <a href="/parceiros"
               className="inline-block bg-[#e8603a] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#f07550] transition-colors relative text-sm">
              Quero ser parceiro →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function findNearestBairro(lat: number, lng: number, bairros: Bairro[]): Bairro | null {
  const withCoords = bairros.filter(b => b.lat && b.lng)
  if (!withCoords.length) return null
  return withCoords.reduce((nearest, b) => {
    const d = Math.hypot((b.lat! - lat), (b.lng! - lng))
    const dn = Math.hypot((nearest.lat! - lat), (nearest.lng! - lng))
    return d < dn ? b : nearest
  })
}
