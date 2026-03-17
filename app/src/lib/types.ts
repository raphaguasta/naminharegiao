export type Bairro = {
  id: string
  nome: string
  slug: string
  cidade: string
  cidade_slug: string
  uf: string
  descricao?: string
  lat?: number
  lng?: number
  ativo: boolean
  total_negocios?: number
}

export type Categoria = {
  id: string
  nome: string
  slug: string
  icone: string
  ordem: number
}

export type Guia = {
  id: string
  nome: string
  slug: string
  bairro_id: string
  instagram?: string
  whatsapp?: string
  ativo: boolean
}

export type Plano = {
  id: string
  nome: string
  descricao?: string
  valor_negocio: number
  valor_guia: number
  ativo: boolean
}

export type Negocio = {
  id: string
  nome: string
  slug: string
  descricao?: string
  bairro_id: string
  categoria_id: string
  guia_id?: string
  endereco?: string
  telefone?: string
  whatsapp?: string
  instagram?: string
  tiktok?: string
  site?: string
  preco_medio?: '$' | '$$' | '$$$'
  horarios?: Record<string, string>
  fotos: string[]
  destaque: boolean
  ativo: boolean
  criado_em: string
  // billing
  plano_id?: string
  valor_cobrado?: number
  valor_repasse?: number
  cobranca_status?: 'trial' | 'ativa' | 'pausada' | 'cancelada'
  cobranca_inicio?: string
  cobranca_renovacao?: string
}

// Negocio com relações resolvidas (para uso nas páginas)
export type NegocioCompleto = Negocio & {
  bairro?: Bairro
  categoria?: Categoria
  guia?: Guia
  plano?: Plano
}

export interface DataRepository {
  getBairros(): Promise<Bairro[]>
  getBairroBySlug(slug: string): Promise<Bairro | null>
  getCategorias(): Promise<Categoria[]>
  getCategoriaBySlug(slug: string): Promise<Categoria | null>
  getGuias(): Promise<Guia[]>
  getGuiaBySlug(slug: string): Promise<Guia | null>
  getPlanos(): Promise<Plano[]>
  getNegocios(filters?: { bairro_id?: string; categoria_id?: string; destaque?: boolean; ativo?: boolean }): Promise<NegocioCompleto[]>
  getNegocioBySlug(slug: string): Promise<NegocioCompleto | null>
  getNegociosByBairroCategoria(bairroSlug: string, categoriaSlug: string): Promise<NegocioCompleto[]>
  searchNegocios(query: string, bairroSlug?: string): Promise<NegocioCompleto[]>
  // Admin
  createNegocio(data: Omit<Negocio, 'id' | 'criado_em'>): Promise<Negocio>
  updateNegocio(id: string, data: Partial<Negocio>): Promise<Negocio>
  deleteNegocio(id: string): Promise<void>
  createGuia(data: Omit<Guia, 'id'>): Promise<Guia>
  updateGuia(id: string, data: Partial<Guia>): Promise<Guia>
  createBairro(data: Omit<Bairro, 'id'>): Promise<Bairro>
  updateBairro(id: string, data: Partial<Bairro>): Promise<Bairro>
}
