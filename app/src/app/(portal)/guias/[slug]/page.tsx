import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/data'
import NegocioCard from '@/components/NegocioCard'
import { bairroUrl } from '@/lib/urls'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const guias = await db.getGuias()
  return guias.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guia = await db.getGuiaBySlug(slug)
  if (!guia) return {}
  return {
    title: `${guia.nome} — Guia Parceiro`,
    description: `Conheça os negócios recomendados por ${guia.nome}.`,
  }
}

export default async function GuiaPage({ params }: Props) {
  const { slug } = await params
  const guia = await db.getGuiaBySlug(slug)
  if (!guia) return notFound()

  const [bairros, negocios] = await Promise.all([
    db.getBairros(),
    db.getNegocios({ ativo: true }),
  ])
  const bairro = bairros.find(b => b.id === guia.bairro_id)
  const negociosGuia = negocios.filter(n => n.guia_id === guia.id)

  return (
    <div className="px-[5vw] py-10 max-w-[1200px] mx-auto">
      <Link href="/" className="text-[#8a9bc4] text-sm hover:text-white transition-colors flex items-center gap-1 mb-6">
        ← Início
      </Link>

      {/* Header */}
      <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-8 mb-10">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(42,140,140,0.15)] flex items-center justify-center text-3xl flex-shrink-0">
            📍
          </div>
          <div>
            <p className="text-[#3aabab] text-xs font-medium uppercase tracking-widest mb-1">Guia Parceiro</p>
            <h1 className="font-[family-name:var(--font-jakarta)] font-extrabold text-white text-2xl mb-2">{guia.nome}</h1>
            {bairro && (
              <Link href={bairroUrl(bairro)} className="text-[#8a9bc4] text-sm hover:text-white transition-colors inline-flex items-center gap-1">
                📍 {bairro.nome}, {bairro.cidade}
              </Link>
            )}
            <div className="flex gap-4 mt-3 flex-wrap">
              {guia.instagram && (
                <a href={`https://instagram.com/${guia.instagram}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-[#8a9bc4] hover:text-white text-sm transition-colors">
                  📸 @{guia.instagram}
                </a>
              )}
              {guia.whatsapp && (
                <a href={`https://wa.me/${guia.whatsapp}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-[#3aabab] hover:text-[#2a8c8c] text-sm transition-colors">
                  💬 Entrar em contato
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Negócios indicados */}
      <div>
        <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-xl mb-1">
          Negócios indicados
        </h2>
        <p className="text-[#8a9bc4] text-sm mb-6">
          {negociosGuia.length} negócio{negociosGuia.length !== 1 ? 's' : ''} recomendado{negociosGuia.length !== 1 ? 's' : ''} por este guia
        </p>
        {negociosGuia.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {negociosGuia.map(n => <NegocioCard key={n.id} negocio={n} />)}
          </div>
        ) : (
          <p className="text-[#8a9bc4] py-8 text-center">Nenhum negócio indicado ainda.</p>
        )}
      </div>
    </div>
  )
}
