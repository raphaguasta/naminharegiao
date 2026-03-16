import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/data'
import NegocioCard from '@/components/NegocioCard'

interface Props { params: Promise<{ bairro: string; categoria: string }> }

export async function generateStaticParams() {
  const [bairros, categorias, negocios] = await Promise.all([db.getBairros(), db.getCategorias(), db.getNegocios({ ativo: true })])
  const pairs: { bairro: string; categoria: string }[] = []
  for (const b of bairros) {
    for (const c of categorias) {
      if (negocios.some(n => n.bairro_id === b.id && n.categoria_id === c.id)) {
        pairs.push({ bairro: b.slug, categoria: c.slug })
      }
    }
  }
  return pairs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bairro: bairroSlug, categoria: categoriaSlug } = await params
  const [bairro, categoria] = await Promise.all([db.getBairroBySlug(bairroSlug), db.getCategoriaBySlug(categoriaSlug)])
  if (!bairro || !categoria) return {}
  return {
    title: `${categoria.nome} em ${bairro.nome}`,
    description: `Os melhores ${categoria.nome.toLowerCase()} em ${bairro.nome}, ${bairro.cidade}. Recomendados pelo guia local.`,
  }
}

export default async function CategoriaPage({ params }: Props) {
  const { bairro: bairroSlug, categoria: categoriaSlug } = await params
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
        <Link href={`/${bairro.slug}`} className="hover:text-white transition-colors">{bairro.nome}</Link>
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
          <Link href={`/${bairro.slug}`} className="text-[#3aabab] text-sm mt-2 inline-block hover:text-white transition-colors">
            ← Voltar para {bairro.nome}
          </Link>
        </div>
      )}
    </div>
  )
}
