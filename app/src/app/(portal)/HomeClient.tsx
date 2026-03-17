'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BairroCard from '@/components/BairroCard'
import NegocioCard from '@/components/NegocioCard'
import SearchBar from '@/components/SearchBar'
import GeolocationModal from '@/components/GeolocationModal'
import Carousel from '@/components/Carousel'
import type { Bairro, Guia, NegocioCompleto } from '@/lib/types'

interface Props {
  bairros: Bairro[]
  negociosDestaque: NegocioCompleto[]
  guias: Guia[]
}

export default function HomeClient({ bairros, negociosDestaque, guias }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [bairroAtual, setBairroAtual] = useState<Bairro | null>(null)
  const [negociosLocais, setNegociosLocais] = useState<NegocioCompleto[]>([])

  useEffect(() => {
    const savedSlug = localStorage.getItem('nmr_bairro_slug')
    if (savedSlug) {
      const b = bairros.find(b => b.slug === savedSlug)
      if (b) { setBairroAtual(b); filterDestaques(b); return }
    }

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

      {/* Destaques por localização — carousel */}
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
              <button
                onClick={() => { localStorage.removeItem('nmr_bairro_id'); localStorage.removeItem('nmr_bairro_slug'); setShowModal(true) }}
                className="text-[#8a9bc4] text-xs hover:text-white transition-colors flex items-center gap-1"
              >
                📍 Mudar bairro
              </button>
            </div>
            <Carousel
              items={negociosLocais}
              renderItem={(n) => <NegocioCard negocio={n} />}
            />
          </div>
        </section>
      )}

      {/* Bairros disponíveis — carousel */}
      <section className="px-[5vw] py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-1.5 text-[#3aabab] text-xs font-medium uppercase tracking-widest mb-2">
            <span className="w-5 h-0.5 bg-[#3aabab] inline-block" />
            Explorar
          </div>
          <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl mb-6">Bairros disponíveis</h2>
          <Carousel
            items={bairros}
            renderItem={(b) => <BairroCard bairro={b} />}
          />
        </div>
      </section>

      {/* Guias parceiros */}
      {guias.length > 0 && (
        <section className="px-[5vw] py-12 border-t border-[rgba(255,255,255,0.05)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-1.5 text-[#3aabab] text-xs font-medium uppercase tracking-widest mb-2">
              <span className="w-5 h-0.5 bg-[#3aabab] inline-block" />
              Comunidade
            </div>
            <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl mb-6">Guias parceiros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guias.map(g => <GuiaCard key={g.id} guia={g} bairros={bairros} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function GuiaCard({ guia, bairros }: { guia: Guia; bairros: Bairro[] }) {
  const bairro = bairros.find(b => b.id === guia.bairro_id)
  return (
    <Link href={`/guias/${guia.slug}`}
      className="block bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 hover:border-[rgba(42,140,140,0.4)] hover:-translate-y-1 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[rgba(42,140,140,0.15)] flex items-center justify-center text-lg">
          📍
        </div>
        {guia.instagram && (
          <span className="text-xs text-[#8a9bc4] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded-full">
            @{guia.instagram}
          </span>
        )}
      </div>
      <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-lg mb-1 group-hover:text-[#3aabab] transition-colors">
        {guia.nome}
      </h3>
      {bairro && (
        <p className="text-[#8a9bc4] text-sm">📍 {bairro.nome}</p>
      )}
      <div className="mt-4 text-[#3aabab] text-xs font-medium flex items-center gap-1">
        Ver negócios indicados <span>→</span>
      </div>
    </Link>
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
