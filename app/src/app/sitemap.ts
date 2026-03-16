import type { MetadataRoute } from 'next'
import { db } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://naminharegiao.com.br'
  const [bairros, categorias, negocios] = await Promise.all([db.getBairros(), db.getCategorias(), db.getNegocios({ ativo: true })])

  const bairroUrls = bairros.map(b => ({ url: `${base}/${b.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 }))
  const negocioUrls = negocios.map(n => ({ url: `${base}/${n.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 }))
  const categoriaUrls: MetadataRoute.Sitemap = []
  for (const b of bairros) {
    for (const c of categorias) {
      if (negocios.some(n => n.bairro_id === b.id && n.categoria_id === c.id)) {
        categoriaUrls.push({ url: `${base}/${b.slug}/${c.slug}`, changeFrequency: 'weekly', priority: 0.75 })
      }
    }
  }

  return [
    { url: base, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/parceiros`, changeFrequency: 'monthly', priority: 0.6 },
    ...bairroUrls,
    ...categoriaUrls,
    ...negocioUrls,
  ]
}
