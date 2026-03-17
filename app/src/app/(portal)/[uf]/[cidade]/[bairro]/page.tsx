import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/data'
import NegocioCard from '@/components/NegocioCard'
import { bairroUrl, categoriaUrl } from '@/lib/urls'

interface Props { params: Promise<{ uf: string; cidade: string; bairro: string }> }

export async function generateStaticParams() {
  const bairros = await db.getBairros()
  return bairros.map(b => ({ uf: b.uf, cidade: b.cidade_slug, bairro: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bairro: bairroSlug } = await params
  const bairro = await db.getBairroBySlug(bairroSlug)
  if (!bairro) return {}
  return {
    title: `${bairro.nome} — Guia local`,
    description: bairro.descricao ?? `Descubra os melhores negócios em ${bairro.nome}, ${bairro.cidade}.`,
  }
}

export default async function BairroPage({ params }: Props) {
  const { bairro: bairroSlug } = await params
  const [bairro, categorias, todosNegocios] = await Promise.all([
    db.getBairroBySlug(bairroSlug),
    db.getCategorias(),
    db.getNegocios({ ativo: true }),
  ])
  if (!bairro) return notFound()

  const negocios = todosNegocios.filter(n => n.bairro_id === bairro.id)
  const categoriasComNegocios = categorias.filter(c => negocios.some(n => n.categoria_id === c.id))
  const destaques = negocios.filter(n => n.destaque)

  return (
    <div className="px-[5vw] py-10 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="text-[#8a9bc4] text-sm hover:text-white transition-colors flex items-center gap-1 mb-4">
          ← Todos os bairros
        </Link>
        <h1 className="font-[family-name:var(--font-jakarta)] font-extrabold text-white text-3xl md:text-4xl mb-2">{bairro.nome}</h1>
        <p className="text-[#8a9bc4] max-w-xl">{bairro.descricao}</p>
        <div className="flex gap-3 mt-3 flex-wrap">
          <span className="text-xs text-[#8a9bc4] bg-[rgba(255,255,255,0.05)] px-3 py-1 rounded-full">{bairro.cidade}</span>
          <span className="text-xs text-[#3aabab] bg-[rgba(42,140,140,0.1)] px-3 py-1 rounded-full">{bairro.total_negocios} negócios</span>
        </div>
      </div>

      {/* Categorias */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categoriasComNegocios.map(c => (
          <Link key={c.id} href={categoriaUrl(bairro, c.slug)}
            className="flex items-center gap-1.5 bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] text-[#8a9bc4] text-sm px-4 py-2 rounded-xl hover:border-[rgba(42,140,140,0.4)] hover:text-white transition-all">
            {c.icone} {c.nome}
            <span className="text-xs text-[#3aabab] ml-1">({negocios.filter(n => n.categoria_id === c.id).length})</span>
          </Link>
        ))}
      </div>

      {/* Destaques */}
      {destaques.length > 0 && (
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-xl mb-4">⭐ Em destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destaques.map(n => <NegocioCard key={n.id} negocio={n} />)}
          </div>
        </div>
      )}

      {/* Todos os negócios por categoria */}
      {categoriasComNegocios.map(c => {
        const lista = negocios.filter(n => n.categoria_id === c.id)
        return (
          <div key={c.id} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-xl">{c.icone} {c.nome}</h2>
              <Link href={categoriaUrl(bairro, c.slug)} className="text-[#3aabab] text-sm hover:text-[#2a8c8c] transition-colors">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lista.slice(0, 3).map(n => <NegocioCard key={n.id} negocio={n} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
