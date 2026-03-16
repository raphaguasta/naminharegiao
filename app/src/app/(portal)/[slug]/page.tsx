import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/data'
import NegocioCard from '@/components/NegocioCard'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const [bairros, negocios] = await Promise.all([db.getBairros(), db.getNegocios({ ativo: true })])
  return [
    ...bairros.map(b => ({ slug: b.slug })),
    ...negocios.map(n => ({ slug: n.slug })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [bairro, negocio] = await Promise.all([db.getBairroBySlug(slug), db.getNegocioBySlug(slug)])
  if (bairro) return { title: `${bairro.nome}`, description: bairro.descricao ?? `Descubra os melhores negócios em ${bairro.nome}.` }
  if (negocio) return { title: negocio.nome, description: negocio.descricao ?? `${negocio.nome} — ${negocio.bairro?.nome}` }
  return {}
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const [bairro, negocio] = await Promise.all([db.getBairroBySlug(slug), db.getNegocioBySlug(slug)])

  if (bairro) return <BairroPage bairroSlug={slug} />
  if (negocio) return <NegocioPage slug={slug} />
  notFound()
}

// ─── BAIRRO PAGE ─────────────────────────────────────────────────────────────

async function BairroPage({ bairroSlug }: { bairroSlug: string }) {
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
          <Link key={c.id} href={`/${bairro.slug}/${c.slug}`}
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
              <Link href={`/${bairro.slug}/${c.slug}`} className="text-[#3aabab] text-sm hover:text-[#2a8c8c] transition-colors">
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

// ─── NEGOCIO PAGE ─────────────────────────────────────────────────────────────

async function NegocioPage({ slug }: { slug: string }) {
  const negocio = await db.getNegocioBySlug(slug)
  if (!negocio) return notFound()

  const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
  const DIAS_LABEL: Record<string, string> = { seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta', sab: 'Sábado', dom: 'Domingo' }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: negocio.nome,
    description: negocio.descricao,
    address: { '@type': 'PostalAddress', streetAddress: negocio.endereco, addressLocality: negocio.bairro?.cidade ?? 'São Paulo' },
    telephone: negocio.telefone,
    url: negocio.site,
    image: negocio.fotos[0],
  }

  return (
    <div className="px-[5vw] py-10 max-w-[1000px] mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href={negocio.bairro ? `/${negocio.bairro.slug}` : '/'} className="text-[#8a9bc4] text-sm hover:text-white transition-colors flex items-center gap-1 mb-6">
        ← {negocio.bairro?.nome ?? 'Voltar'}
      </Link>

      {/* Foto principal */}
      {negocio.fotos[0] && (
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
          <Image src={negocio.fotos[0]} alt={negocio.nome} fill className="object-cover" unoptimized />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info principal */}
        <div className="md:col-span-2">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            {negocio.categoria && (
              <span className="text-xs text-[#3aabab] bg-[rgba(42,140,140,0.1)] px-2.5 py-1 rounded-full">
                {negocio.categoria.icone} {negocio.categoria.nome}
              </span>
            )}
            {negocio.preco_medio && (
              <span className="text-xs text-[#8a9bc4] bg-[rgba(255,255,255,0.05)] px-2.5 py-1 rounded-full">
                {negocio.preco_medio}
              </span>
            )}
            {negocio.destaque && (
              <span className="text-xs text-[#e8603a] bg-[rgba(232,96,58,0.1)] px-2.5 py-1 rounded-full font-medium">
                ✓ Aprovado pelo guia
              </span>
            )}
          </div>

          <h1 className="font-[family-name:var(--font-jakarta)] font-extrabold text-white text-3xl md:text-4xl mb-3">{negocio.nome}</h1>
          <p className="text-[#8a9bc4] text-base leading-relaxed mb-6">{negocio.descricao}</p>

          {negocio.endereco && (
            <div className="flex items-start gap-2 text-[#8a9bc4] text-sm mb-3">
              <span className="mt-0.5">📍</span>
              <span>{negocio.endereco}</span>
            </div>
          )}

          {/* Horários */}
          {negocio.horarios && (
            <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5 mt-6">
              <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-sm mb-3">🕐 Horários</h3>
              <div className="grid grid-cols-1 gap-1.5">
                {DIAS.map(d => (
                  <div key={d} className="flex items-center justify-between text-sm">
                    <span className="text-[#8a9bc4] w-20">{DIAS_LABEL[d]}</span>
                    <span className={negocio.horarios![d] === 'Fechado' ? 'text-[#e8603a]' : 'text-white'}>
                      {negocio.horarios![d] ?? '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — contatos e canais */}
        <div className="flex flex-col gap-3">
          {negocio.whatsapp && (
            <a href={`https://wa.me/${negocio.whatsapp}`} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 hover:border-[rgba(42,140,140,0.4)] transition-all">
              <span className="text-2xl">💬</span>
              <div><p className="text-white text-sm font-medium">WhatsApp</p><p className="text-[#8a9bc4] text-xs">Enviar mensagem</p></div>
            </a>
          )}
          {negocio.instagram && (
            <a href={`https://instagram.com/${negocio.instagram}`} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 hover:border-[rgba(42,140,140,0.4)] transition-all">
              <span className="text-2xl">📸</span>
              <div><p className="text-white text-sm font-medium">Instagram</p><p className="text-[#8a9bc4] text-xs">@{negocio.instagram}</p></div>
            </a>
          )}
          {negocio.tiktok && (
            <a href={`https://tiktok.com/@${negocio.tiktok}`} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 hover:border-[rgba(42,140,140,0.4)] transition-all">
              <span className="text-2xl">🎵</span>
              <div><p className="text-white text-sm font-medium">TikTok</p><p className="text-[#8a9bc4] text-xs">@{negocio.tiktok}</p></div>
            </a>
          )}
          {negocio.site && (
            <a href={negocio.site} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 hover:border-[rgba(42,140,140,0.4)] transition-all">
              <span className="text-2xl">🌐</span>
              <div><p className="text-white text-sm font-medium">Site</p><p className="text-[#8a9bc4] text-xs truncate max-w-[140px]">{negocio.site.replace('https://', '')}</p></div>
            </a>
          )}
          {negocio.telefone && (
            <a href={`tel:${negocio.telefone}`}
               className="flex items-center gap-3 bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-3 hover:border-[rgba(42,140,140,0.4)] transition-all">
              <span className="text-2xl">📞</span>
              <div><p className="text-white text-sm font-medium">Telefone</p><p className="text-[#8a9bc4] text-xs">{negocio.telefone}</p></div>
            </a>
          )}

          {/* Guia */}
          {negocio.guia && (
            <div className="bg-[rgba(42,140,140,0.08)] border border-[rgba(42,140,140,0.2)] rounded-xl px-4 py-3 mt-1">
              <p className="text-[#3aabab] text-xs font-medium mb-0.5">Indicado pelo guia</p>
              <p className="text-white text-sm">{negocio.guia.nome}</p>
              {negocio.guia.instagram && (
                <a href={`https://instagram.com/${negocio.guia.instagram}`} target="_blank" rel="noopener noreferrer"
                   className="text-[#8a9bc4] text-xs hover:text-white transition-colors">@{negocio.guia.instagram}</a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
