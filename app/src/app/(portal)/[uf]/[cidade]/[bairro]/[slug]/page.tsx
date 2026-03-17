import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/data'
import NegocioCard from '@/components/NegocioCard'
import { bairroUrl, negocioUrl, categoriaUrl } from '@/lib/urls'

interface Props { params: Promise<{ uf: string; cidade: string; bairro: string; slug: string }> }

export async function generateStaticParams() {
  const [bairros, categorias, negocios] = await Promise.all([
    db.getBairros(),
    db.getCategorias(),
    db.getNegocios({ ativo: true }),
  ])

  const params: { uf: string; cidade: string; bairro: string; slug: string }[] = []

  // Negócios
  for (const n of negocios) {
    const b = bairros.find(b => b.id === n.bairro_id)
    if (b) params.push({ uf: b.uf, cidade: b.cidade_slug, bairro: b.slug, slug: n.slug })
  }

  // Categorias (only pairs that have active negocios)
  for (const b of bairros) {
    for (const c of categorias) {
      if (negocios.some(n => n.bairro_id === b.id && n.categoria_id === c.id)) {
        params.push({ uf: b.uf, cidade: b.cidade_slug, bairro: b.slug, slug: c.slug })
      }
    }
  }

  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bairro: bairroSlug, slug } = await params
  const [bairro, categoria, negocio] = await Promise.all([
    db.getBairroBySlug(bairroSlug),
    db.getCategoriaBySlug(slug),
    db.getNegocioBySlug(slug),
  ])
  if (!bairro) return {}
  if (categoria) return {
    title: `${categoria.nome} em ${bairro.nome}`,
    description: `Os melhores ${categoria.nome.toLowerCase()} em ${bairro.nome}, ${bairro.cidade}. Recomendados pelo guia local.`,
  }
  if (negocio) return {
    title: negocio.nome,
    description: negocio.descricao ?? `${negocio.nome} — ${bairro.nome}`,
  }
  return {}
}

export default async function SlugPage({ params }: Props) {
  const { bairro: bairroSlug, slug } = await params
  const [bairro, categoria, negocio] = await Promise.all([
    db.getBairroBySlug(bairroSlug),
    db.getCategoriaBySlug(slug),
    db.getNegocioBySlug(slug),
  ])
  if (!bairro) return notFound()
  if (categoria) return <CategoriaPage bairroSlug={bairroSlug} categoriaSlug={slug} />
  if (negocio) return <NegocioPage slug={slug} />
  return notFound()
}

// ─── CATEGORIA PAGE ───────────────────────────────────────────────────────────

async function CategoriaPage({ bairroSlug, categoriaSlug }: { bairroSlug: string; categoriaSlug: string }) {
  const [bairro, categoria, negocios] = await Promise.all([
    db.getBairroBySlug(bairroSlug),
    db.getCategoriaBySlug(categoriaSlug),
    db.getNegociosByBairroCategoria(bairroSlug, categoriaSlug),
  ])
  if (!bairro || !categoria) return notFound()

  return (
    <div className="px-[5vw] py-10 max-w-[1200px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[#8a9bc4] text-sm mb-6 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span>/</span>
        <Link href={bairroUrl(bairro)} className="hover:text-white transition-colors">{bairro.nome}</Link>
        <span>/</span>
        <span className="text-white">{categoria.nome}</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">{categoria.icone}</span>
          <h1 className="font-[family-name:var(--font-jakarta)] font-extrabold text-white text-3xl">{categoria.nome}</h1>
        </div>
        <p className="text-[#8a9bc4]">
          {negocios.length} negócio{negocios.length !== 1 ? 's' : ''} em <span className="text-white">{bairro.nome}</span>
        </p>
      </div>

      {negocios.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {negocios.map(n => <NegocioCard key={n.id} negocio={n} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[#8a9bc4] text-lg">Nenhum negócio cadastrado aqui ainda.</p>
          <Link href={bairroUrl(bairro)} className="text-[#3aabab] text-sm mt-2 inline-block hover:text-white transition-colors">
            ← Voltar para {bairro.nome}
          </Link>
        </div>
      )}
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

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[#8a9bc4] text-sm mb-6 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        {negocio.bairro && (
          <>
            <span>/</span>
            <Link href={bairroUrl(negocio.bairro)} className="hover:text-white transition-colors">{negocio.bairro.nome}</Link>
          </>
        )}
        {negocio.bairro && negocio.categoria && (
          <>
            <span>/</span>
            <Link href={categoriaUrl(negocio.bairro, negocio.categoria.slug)} className="hover:text-white transition-colors">
              {negocio.categoria.nome}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-white">{negocio.nome}</span>
      </div>

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
            <Link href={`/guias/${negocio.guia.slug}`}
              className="bg-[rgba(42,140,140,0.08)] border border-[rgba(42,140,140,0.2)] rounded-xl px-4 py-3 mt-1 hover:border-[rgba(42,140,140,0.4)] transition-all block">
              <p className="text-[#3aabab] text-xs font-medium mb-0.5">Indicado pelo guia</p>
              <p className="text-white text-sm">{negocio.guia.nome}</p>
              {negocio.guia.instagram && (
                <p className="text-[#8a9bc4] text-xs">@{negocio.guia.instagram}</p>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
