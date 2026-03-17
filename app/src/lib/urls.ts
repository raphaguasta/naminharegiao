import type { Bairro, NegocioCompleto } from './types'

export function bairroUrl(bairro: Pick<Bairro, 'uf' | 'cidade_slug' | 'slug'>) {
  return `/${bairro.uf}/${bairro.cidade_slug}/${bairro.slug}`
}

export function negocioUrl(negocio: Pick<NegocioCompleto, 'slug' | 'bairro'>) {
  if (!negocio.bairro) return `/${negocio.slug}`
  return `${bairroUrl(negocio.bairro)}/${negocio.slug}`
}

export function categoriaUrl(bairro: Pick<Bairro, 'uf' | 'cidade_slug' | 'slug'>, categoriaSlug: string) {
  return `${bairroUrl(bairro)}/${categoriaSlug}`
}
