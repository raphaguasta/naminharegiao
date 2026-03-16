import { db } from '@/lib/data'
import Link from 'next/link'

export default async function BairrosPage() {
  const [bairros, categorias, negocios] = await Promise.all([db.getBairros(), db.getCategorias(), db.getNegocios({ ativo: true })])

  return (
    <div>
      <h1 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl mb-1">Bairros</h1>
      <p className="text-[#8a9bc4] text-sm mb-6">{bairros.length} bairros cadastrados</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bairros.map(b => {
          const negsBairro = negocios.filter(n => n.bairro_id === b.id)
          const cats = categorias.filter(c => negsBairro.some(n => n.categoria_id === c.id))

          return (
            <div key={b.id} className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-lg">{b.nome}</h3>
                <Link href={`/${b.slug}`} target="_blank" className="text-[#8a9bc4] hover:text-white text-xs transition-colors" title="Ver no site">↗</Link>
              </div>
              <p className="text-[#8a9bc4] text-xs mb-3">{b.cidade}</p>
              <p className="text-[#8a9bc4] text-sm leading-relaxed mb-4 line-clamp-2">{b.descricao}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-[#3aabab] text-sm font-medium">{negsBairro.length} negócios</span>
                {b.lat && <span className="text-[#8a9bc4] text-xs">{b.lat.toFixed(4)}, {b.lng?.toFixed(4)}</span>}
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {cats.map(c => (
                  <Link key={c.id} href={`/${b.slug}/${c.slug}`} target="_blank"
                    className="text-xs text-[#8a9bc4] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded-full hover:text-white hover:bg-[rgba(42,140,140,0.15)] transition-colors">
                    {c.icone} {c.nome} ({negsBairro.filter(n => n.categoria_id === c.id).length})
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
