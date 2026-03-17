import type { Bairro, Categoria, Guia, Plano, Negocio, NegocioCompleto, DataRepository } from './types'

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const bairros: Bairro[] = [
  { id: 'b1', nome: 'Vila Leopoldina', slug: 'vila-leopoldina', cidade: 'São Paulo', cidade_slug: 'sao-paulo', uf: 'sp', descricao: 'Bairro residencial e gastronômico na zona oeste de SP, famoso por restaurantes e bares.', lat: -23.5306, lng: -46.7589, ativo: true },
  { id: 'b2', nome: 'Pinheiros', slug: 'pinheiros', cidade: 'São Paulo', cidade_slug: 'sao-paulo', uf: 'sp', descricao: 'Um dos bairros mais agitados de SP, com vida cultural intensa, bares e restaurantes.', lat: -23.5629, lng: -46.6862, ativo: true },
  { id: 'b3', nome: 'Mooca', slug: 'mooca', cidade: 'São Paulo', cidade_slug: 'sao-paulo', uf: 'sp', descricao: 'Bairro tradicional de origem italiana com culinária típica e comércio local forte.', lat: -23.5571, lng: -46.6025, ativo: true },
  { id: 'b4', nome: 'Vila Madalena', slug: 'vila-madalena', cidade: 'São Paulo', cidade_slug: 'sao-paulo', uf: 'sp', descricao: 'Bairro boêmio e artístico com bares, galerias, murais e a famosa Rua Aspicuelta.', lat: -23.5553, lng: -46.6917, ativo: true },
  { id: 'b5', nome: 'Itaim Bibi', slug: 'itaim-bibi', cidade: 'São Paulo', cidade_slug: 'sao-paulo', uf: 'sp', descricao: 'Hub corporativo e gastronômico com restaurantes premiados e bares modernos.', lat: -23.5858, lng: -46.6745, ativo: true },
  { id: 'b6', nome: 'Perdizes', slug: 'perdizes', cidade: 'São Paulo', cidade_slug: 'sao-paulo', uf: 'sp', descricao: 'Bairro familiar e cultural na zona oeste, com feiras, cafés e comércio local tradicional.', lat: -23.5375, lng: -46.6659, ativo: true },
]

const categorias: Categoria[] = [
  { id: 'c1', nome: 'Restaurantes', slug: 'restaurantes', icone: '🍽️', ordem: 1 },
  { id: 'c2', nome: 'Cafés', slug: 'cafes', icone: '☕', ordem: 2 },
  { id: 'c3', nome: 'Bares', slug: 'bares', icone: '🍺', ordem: 3 },
  { id: 'c4', nome: 'Serviços', slug: 'servicos', icone: '🛠️', ordem: 4 },
  { id: 'c5', nome: 'Mercados', slug: 'mercados', icone: '🛒', ordem: 5 },
]

const guias: Guia[] = [
  { id: 'g1', nome: 'Guia Vila Leopoldina', slug: 'guia-vila-leopoldina', bairro_id: 'b1', instagram: 'guiavilaleopoldina', whatsapp: '5511944405488', ativo: true },
  { id: 'g2', nome: 'Guia Pinheiros', slug: 'guia-pinheiros', bairro_id: 'b2', instagram: 'guiapinheiros', whatsapp: '5511944405488', ativo: true },
  { id: 'g3', nome: 'Guia Mooca', slug: 'guia-mooca', bairro_id: 'b3', instagram: 'guiamooca', whatsapp: '5511944405488', ativo: true },
  { id: 'g4', nome: 'Guia Vila Madalena', slug: 'guia-vila-madalena', bairro_id: 'b4', instagram: 'guiavilamadalena', whatsapp: '5511944405488', ativo: true },
  { id: 'g5', nome: 'Guia Itaim Bibi', slug: 'guia-itaim-bibi', bairro_id: 'b5', instagram: 'guiaitaim', whatsapp: '5511944405488', ativo: true },
  { id: 'g6', nome: 'Guia Perdizes', slug: 'guia-perdizes', bairro_id: 'b6', instagram: 'guiaperdizes', whatsapp: '5511944405488', ativo: true },
]

const planos: Plano[] = [
  { id: 'p1', nome: 'Básico', descricao: 'Presença no WhatsApp + página SEO + campanhas de cupom', valor_negocio: 150, valor_guia: 50, ativo: true },
]

const negocios: Negocio[] = [
  // Vila Leopoldina — Restaurantes
  { id: 'n1', nome: 'Trattoria Felice', slug: 'trattoria-felice', descricao: 'Restaurante italiano familiar com massas artesanais e ambiente aconchegante. Uma das melhores cantinas da zona oeste.', bairro_id: 'b1', categoria_id: 'c1', guia_id: 'g1', endereco: 'Rua Apa, 142 — Vila Leopoldina, SP', telefone: '(11) 3641-2288', whatsapp: '5511936412288', instagram: 'trattoriafelice', tiktok: 'trattoriafelice', site: 'https://trattoriafelice.com.br', preco_medio: '$$', horarios: { seg: 'Fechado', ter: '12h–15h / 19h–23h', qua: '12h–15h / 19h–23h', qui: '12h–15h / 19h–23h', sex: '12h–15h / 19h–23h', sab: '12h–23h', dom: '12h–17h' }, fotos: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'], destaque: true, ativo: true, criado_em: '2025-01-01', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-01-01', cobranca_renovacao: '2025-02-01' },
  { id: 'n2', nome: 'Sushi Naka', slug: 'sushi-naka', descricao: 'Restaurante japonês com peixes frescos do dia. Temaki, sashimi e combinados a preços justos.', bairro_id: 'b1', categoria_id: 'c1', guia_id: 'g1', endereco: 'Av. Imperatriz Leopoldina, 801 — Vila Leopoldina, SP', telefone: '(11) 3645-9900', whatsapp: '5511936459900', instagram: 'sushinaka_sp', preco_medio: '$$', horarios: { seg: 'Fechado', ter: 'Fechado', qua: '18h–23h', qui: '18h–23h', sex: '18h–00h', sab: '12h–00h', dom: '12h–22h' }, fotos: ['https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800'], destaque: false, ativo: true, criado_em: '2025-01-15', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-01-15', cobranca_renovacao: '2025-02-15' },
  { id: 'n3', nome: 'Braseiro da Vila', slug: 'braseiro-da-vila', descricao: 'Churrascaria artesanal com cortes nobres e brasa no ponto. Ambiente informal e porções generosas.', bairro_id: 'b1', categoria_id: 'c1', guia_id: 'g1', endereco: 'Rua Guaicurus, 230 — Vila Leopoldina, SP', whatsapp: '5511999001234', instagram: 'braseirodavila', preco_medio: '$$$', horarios: { seg: 'Fechado', ter: 'Fechado', qua: '19h–23h', qui: '19h–23h', sex: '12h–15h / 19h–00h', sab: '12h–00h', dom: '12h–18h' }, fotos: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=800'], destaque: true, ativo: true, criado_em: '2025-02-01', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-02-01', cobranca_renovacao: '2025-03-01' },
  // Vila Leopoldina — Cafés
  { id: 'n4', nome: 'Café do Arco', slug: 'cafe-do-arco', descricao: 'Cafeteria especialidade com grãos selecionados, pães artesanais e espaço de trabalho aconchegante.', bairro_id: 'b1', categoria_id: 'c2', guia_id: 'g1', endereco: 'Rua Apa, 55 — Vila Leopoldina, SP', instagram: 'cafedoarco', tiktok: 'cafedoarco', whatsapp: '5511988776655', preco_medio: '$', horarios: { seg: '07h–19h', ter: '07h–19h', qua: '07h–19h', qui: '07h–19h', sex: '07h–20h', sab: '08h–20h', dom: '09h–17h' }, fotos: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800'], destaque: true, ativo: true, criado_em: '2025-01-20', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-01-20', cobranca_renovacao: '2025-02-20' },
  // Vila Leopoldina — Bares
  { id: 'n5', nome: 'Bar do Léo', slug: 'bar-do-leo', descricao: 'Bar de esquina clássico com petiscos da casa, chope gelado e música ao vivo nas sextas.', bairro_id: 'b1', categoria_id: 'c3', guia_id: 'g1', endereco: 'Rua Sousa Lima, 12 — Vila Leopoldina, SP', whatsapp: '5511977665544', instagram: 'bardoleo_vila', preco_medio: '$', horarios: { seg: 'Fechado', ter: '18h–00h', qua: '18h–00h', qui: '18h–01h', sex: '17h–02h', sab: '15h–02h', dom: '15h–23h' }, fotos: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800'], destaque: false, ativo: true, criado_em: '2025-02-10', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-02-10', cobranca_renovacao: '2025-03-10' },
  // Vila Leopoldina — Serviços
  { id: 'n6', nome: 'Lavanderia Express', slug: 'lavanderia-express', descricao: 'Lavanderia self-service e delivery com entrega em até 24h. Roupas lavadas, passadas e dobradas.', bairro_id: 'b1', categoria_id: 'c4', guia_id: 'g1', endereco: 'Av. Imperatriz Leopoldina, 310 — Vila Leopoldina, SP', whatsapp: '5511966554433', instagram: 'lavanderiaexpress', preco_medio: '$', horarios: { seg: '08h–20h', ter: '08h–20h', qua: '08h–20h', qui: '08h–20h', sex: '08h–20h', sab: '08h–18h', dom: 'Fechado' }, fotos: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], destaque: false, ativo: true, criado_em: '2025-02-15', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-02-15', cobranca_renovacao: '2025-03-15' },

  // Pinheiros — Restaurantes
  { id: 'n7', nome: 'Empório São Paulo', slug: 'emporio-sao-paulo', descricao: 'Restaurante contemporâneo com menu autoral baseado em ingredientes locais e carta de vinhos brasileiros.', bairro_id: 'b2', categoria_id: 'c1', guia_id: 'g2', endereco: 'Rua dos Pinheiros, 422 — Pinheiros, SP', telefone: '(11) 3062-1199', instagram: 'emporiosp_restaurante', site: 'https://emporiosp.com.br', preco_medio: '$$$', horarios: { seg: 'Fechado', ter: '12h–15h / 19h–23h', qua: '12h–15h / 19h–23h', qui: '12h–15h / 19h–23h', sex: '12h–15h / 19h–00h', sab: '12h–00h', dom: '12h–17h' }, fotos: ['https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800'], destaque: true, ativo: true, criado_em: '2025-01-10', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-01-10', cobranca_renovacao: '2025-02-10' },
  { id: 'n8', nome: 'La Taquerìa', slug: 'la-taqueria', descricao: 'Tacos e burritos autênticos com pimentas importadas do México. O melhor tex-mex da região.', bairro_id: 'b2', categoria_id: 'c1', guia_id: 'g2', endereco: 'Rua Wisard, 93 — Pinheiros, SP', whatsapp: '5511955443322', instagram: 'lataqueria_sp', tiktok: 'lataqueria', preco_medio: '$$', horarios: { seg: 'Fechado', ter: '12h–22h', qua: '12h–22h', qui: '12h–22h', sex: '12h–23h', sab: '12h–23h', dom: '12h–20h' }, fotos: ['https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800'], destaque: false, ativo: true, criado_em: '2025-01-25', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-01-25', cobranca_renovacao: '2025-02-25' },
  // Pinheiros — Cafés
  { id: 'n9', nome: 'Slow Coffee Pinheiros', slug: 'slow-coffee-pinheiros', descricao: 'Café especialidade com métodos filtrados e baristas certificados. Ambiente perfeito para trabalhar ou ler.', bairro_id: 'b2', categoria_id: 'c2', guia_id: 'g2', endereco: 'Rua Teodoro Sampaio, 847 — Pinheiros, SP', instagram: 'slowcoffeepinheiros', whatsapp: '5511944332211', preco_medio: '$', horarios: { seg: '08h–19h', ter: '08h–19h', qua: '08h–19h', qui: '08h–19h', sex: '08h–20h', sab: '09h–20h', dom: '10h–18h' }, fotos: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800'], destaque: true, ativo: true, criado_em: '2025-02-05', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-02-05', cobranca_renovacao: '2025-03-05' },
  // Pinheiros — Bares
  { id: 'n10', nome: 'Boteco Raiz', slug: 'boteco-raiz', descricao: 'Botequim raiz com chope de pressão, petiscos generosos e muito samba no fim de semana.', bairro_id: 'b2', categoria_id: 'c3', guia_id: 'g2', endereco: 'Rua Mourato Coelho, 321 — Pinheiros, SP', whatsapp: '5511933221100', instagram: 'botecoraiz_pinheiros', preco_medio: '$', horarios: { seg: 'Fechado', ter: 'Fechado', qua: '18h–01h', qui: '18h–01h', sex: '16h–02h', sab: '14h–02h', dom: '14h–23h' }, fotos: ['https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=800'], destaque: false, ativo: true, criado_em: '2025-02-20', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-02-20', cobranca_renovacao: '2025-03-20' },
  // Pinheiros — Mercados
  { id: 'n11', nome: 'Orgânicos da Feira', slug: 'organicos-da-feira', descricao: 'Loja de produtos orgânicos e naturais com hortifruti, laticínios e itens a granel. Entrega no bairro.', bairro_id: 'b2', categoria_id: 'c5', guia_id: 'g2', endereco: 'Rua dos Pinheiros, 655 — Pinheiros, SP', whatsapp: '5511922110099', instagram: 'organicosdafeira', site: 'https://organicosdafeira.com.br', preco_medio: '$$', horarios: { seg: '08h–20h', ter: '08h–20h', qua: '08h–20h', qui: '08h–20h', sex: '08h–20h', sab: '08h–18h', dom: '09h–14h' }, fotos: ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'], destaque: false, ativo: true, criado_em: '2025-03-01', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-03-01', cobranca_renovacao: '2025-04-01' },

  // Mooca — Restaurantes
  { id: 'n12', nome: 'Cantina da Nona', slug: 'cantina-da-nona', descricao: 'Cantina italiana tradicional há 40 anos no bairro. Receitas da nonna com macarrão caseiro e molho da casa.', bairro_id: 'b3', categoria_id: 'c1', guia_id: 'g3', endereco: 'Rua da Mooca, 1.887 — Mooca, SP', telefone: '(11) 2295-3344', instagram: 'cantina_da_nona', preco_medio: '$$', horarios: { seg: 'Fechado', ter: '12h–15h', qua: '12h–15h', qui: '12h–15h / 19h–22h', sex: '12h–15h / 19h–22h', sab: '12h–22h', dom: '12h–17h' }, fotos: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'], destaque: true, ativo: true, criado_em: '2025-01-05', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-01-05', cobranca_renovacao: '2025-02-05' },
  { id: 'n13', nome: 'Hamburgueria Mooca', slug: 'hamburgueria-mooca', descricao: 'Hambúrgueres artesanais com carne angus e pão brioche. Batata frita da casa é famosa no bairro.', bairro_id: 'b3', categoria_id: 'c1', guia_id: 'g3', endereco: 'Av. Paes de Barros, 534 — Mooca, SP', whatsapp: '5511911009988', instagram: 'hamburgueriamooca', tiktok: 'hamburgueriamooca', preco_medio: '$$', horarios: { seg: 'Fechado', ter: '11h–23h', qua: '11h–23h', qui: '11h–23h', sex: '11h–00h', sab: '11h–00h', dom: '11h–22h' }, fotos: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'], destaque: false, ativo: true, criado_em: '2025-01-30', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-01-30', cobranca_renovacao: '2025-02-28' },
  // Mooca — Cafés
  { id: 'n14', nome: 'Café Mooca', slug: 'cafe-mooca', descricao: 'Café de bairro com pão de queijo quentinho, bolos caseiros e café passado na hora.', bairro_id: 'b3', categoria_id: 'c2', guia_id: 'g3', endereco: 'Rua da Mooca, 1.230 — Mooca, SP', instagram: 'cafemooca', whatsapp: '5511900998877', preco_medio: '$', horarios: { seg: '06h30–19h', ter: '06h30–19h', qua: '06h30–19h', qui: '06h30–19h', sex: '06h30–19h', sab: '07h–17h', dom: 'Fechado' }, fotos: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'], destaque: false, ativo: true, criado_em: '2025-02-08', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-02-08', cobranca_renovacao: '2025-03-08' },
  // Mooca — Bares
  { id: 'n15', nome: 'Bar da Esquina Mooca', slug: 'bar-da-esquina-mooca', descricao: 'Bar tradicional com tira-gosto generoso, chope bem tirado e ambiente familiar desde 1975.', bairro_id: 'b3', categoria_id: 'c3', guia_id: 'g3', endereco: 'Rua Taquari, 88 — Mooca, SP', whatsapp: '5511988776600', instagram: 'barda_esquinamooca', preco_medio: '$', horarios: { seg: 'Fechado', ter: '17h–00h', qua: '17h–00h', qui: '17h–01h', sex: '16h–02h', sab: '14h–02h', dom: '14h–22h' }, fotos: ['https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800'], destaque: true, ativo: true, criado_em: '2025-02-25', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-02-25', cobranca_renovacao: '2025-03-25' },
  // Mooca — Serviços
  { id: 'n16', nome: 'Barbearia Mooca Classic', slug: 'barbearia-mooca-classic', descricao: 'Barbearia tradicional com corte clássico, barba e bigode. Ambiente vintage com serviço de qualidade.', bairro_id: 'b3', categoria_id: 'c4', guia_id: 'g3', endereco: 'Rua da Mooca, 998 — Mooca, SP', whatsapp: '5511977665500', instagram: 'barbearia_moocaclassic', preco_medio: '$', horarios: { seg: '09h–19h', ter: '09h–19h', qua: '09h–19h', qui: '09h–19h', sex: '09h–20h', sab: '09h–18h', dom: 'Fechado' }, fotos: ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800'], destaque: false, ativo: true, criado_em: '2025-03-05', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-03-05', cobranca_renovacao: '2025-04-05' },
  // Mooca — Mercados
  { id: 'n17', nome: 'Mercado Italiano', slug: 'mercado-italiano', descricao: 'Importadora de produtos italianos com massas, queijos, frios e azeites. O melhor da Itália no seu bairro.', bairro_id: 'b3', categoria_id: 'c5', guia_id: 'g3', endereco: 'Rua da Mooca, 2.100 — Mooca, SP', telefone: '(11) 2291-4455', instagram: 'mercado_italiano_mooca', site: 'https://mercadoitaliano.com.br', preco_medio: '$$', horarios: { seg: '09h–19h', ter: '09h–19h', qua: '09h–19h', qui: '09h–19h', sex: '09h–19h', sab: '09h–17h', dom: '09h–13h' }, fotos: ['https://images.unsplash.com/photo-1604719312566-8912e9667d9f?w=800'], destaque: false, ativo: true, criado_em: '2025-03-10', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-03-10', cobranca_renovacao: '2025-04-10' },
  // Extra — Vila Leopoldina
  { id: 'n18', nome: 'Açaí & Cia', slug: 'acai-e-cia', descricao: 'Bowl de açaí com frutas frescas, granola e complementos. Também tem sucos naturais e vitaminas.', bairro_id: 'b1', categoria_id: 'c2', guia_id: 'g1', endereco: 'Av. Imperatriz Leopoldina, 520 — Vila Leopoldina, SP', whatsapp: '5511966554410', instagram: 'acaie_cia', tiktok: 'acaie_cia', preco_medio: '$', horarios: { seg: '10h–21h', ter: '10h–21h', qua: '10h–21h', qui: '10h–21h', sex: '10h–22h', sab: '09h–22h', dom: '09h–20h' }, fotos: ['https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800'], destaque: false, ativo: true, criado_em: '2025-03-12', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'trial', cobranca_inicio: '2025-03-12', cobranca_renovacao: '2025-04-12' },
  { id: 'n19', nome: 'Adega Vila', slug: 'adega-vila', descricao: 'Adega e empório de vinhos com curadoria especial de rótulos nacionais e importados. Harmonização e degustação.', bairro_id: 'b1', categoria_id: 'c5', guia_id: 'g1', endereco: 'Rua Guaicurus, 78 — Vila Leopoldina, SP', whatsapp: '5511955440011', instagram: 'adegavila', site: 'https://adegavila.com.br', preco_medio: '$$', horarios: { seg: 'Fechado', ter: '15h–21h', qua: '15h–21h', qui: '15h–22h', sex: '14h–22h', sab: '12h–22h', dom: '12h–18h' }, fotos: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800'], destaque: false, ativo: true, criado_em: '2025-03-15', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'trial', cobranca_inicio: '2025-03-15', cobranca_renovacao: '2025-04-15' },
  { id: 'n20', nome: 'Padaria Bella Manhã', slug: 'padaria-bella-manha', descricao: 'Padaria artesanal com pães de fermentação natural, croissants e café da manhã completo.', bairro_id: 'b2', categoria_id: 'c2', guia_id: 'g2', endereco: 'Rua Teodoro Sampaio, 312 — Pinheiros, SP', whatsapp: '5511944440022', instagram: 'padariabellamanha', preco_medio: '$', horarios: { seg: '06h–20h', ter: '06h–20h', qua: '06h–20h', qui: '06h–20h', sex: '06h–20h', sab: '06h–18h', dom: '07h–14h' }, fotos: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], destaque: true, ativo: true, criado_em: '2025-03-18', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-03-18', cobranca_renovacao: '2025-04-18' },

  // Vila Madalena
  { id: 'n21', nome: 'Bar da Aspicuelta', slug: 'bar-da-aspicuelta', descricao: 'Bar icônico na rua mais famosa da Vila Madalena. Happy hour, drinks autorais e petiscos criativos.', bairro_id: 'b4', categoria_id: 'c3', guia_id: 'g4', endereco: 'Rua Aspicuelta, 54 — Vila Madalena, SP', whatsapp: '5511933445566', instagram: 'baraspicuelta', preco_medio: '$$', horarios: { seg: 'Fechado', ter: 'Fechado', qua: '18h–01h', qui: '18h–01h', sex: '17h–02h', sab: '14h–02h', dom: '14h–23h' }, fotos: ['https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800'], destaque: true, ativo: true, criado_em: '2025-03-01', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-03-01', cobranca_renovacao: '2025-04-01' },
  { id: 'n22', nome: 'Empanadas Vila', slug: 'empanadas-vila', descricao: 'Empanadas artesanais argentinas com recheios variados e molhos da casa. Também tem churros.', bairro_id: 'b4', categoria_id: 'c1', guia_id: 'g4', endereco: 'Rua Wisard, 271 — Vila Madalena, SP', instagram: 'empanadasvila', whatsapp: '5511922334455', preco_medio: '$', horarios: { seg: 'Fechado', ter: '12h–21h', qua: '12h–21h', qui: '12h–21h', sex: '12h–22h', sab: '11h–22h', dom: '11h–20h' }, fotos: ['https://images.unsplash.com/photo-1574484284002-952d92456975?w=800'], destaque: true, ativo: true, criado_em: '2025-03-05', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-03-05', cobranca_renovacao: '2025-04-05' },

  // Itaim Bibi
  { id: 'n23', nome: 'Sushi Sen', slug: 'sushi-sen', descricao: 'Omakasê moderno com ingredientes premium e carta de saquê. Referência em sushi no Itaim.', bairro_id: 'b5', categoria_id: 'c1', guia_id: 'g5', endereco: 'Rua João Cachoeira, 450 — Itaim Bibi, SP', telefone: '(11) 3078-4422', instagram: 'sushisen_sp', site: 'https://sushisen.com.br', preco_medio: '$$$', horarios: { seg: 'Fechado', ter: '19h–23h', qua: '19h–23h', qui: '19h–23h', sex: '19h–00h', sab: '12h–15h / 19h–00h', dom: '12h–16h' }, fotos: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800'], destaque: true, ativo: true, criado_em: '2025-02-20', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-02-20', cobranca_renovacao: '2025-03-20' },
  { id: 'n24', nome: 'Coffee Lab Itaim', slug: 'coffee-lab-itaim', descricao: 'Cafeteria especialidade no coração do Itaim. Espressos premiados, filtrado e workshop de barista.', bairro_id: 'b5', categoria_id: 'c2', guia_id: 'g5', endereco: 'Rua Leopoldo Couto de Magalhães Jr., 681 — Itaim Bibi, SP', instagram: 'coffeelab_itaim', whatsapp: '5511911223344', preco_medio: '$', horarios: { seg: '07h–19h', ter: '07h–19h', qua: '07h–19h', qui: '07h–19h', sex: '07h–20h', sab: '09h–18h', dom: '10h–16h' }, fotos: ['https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800'], destaque: true, ativo: true, criado_em: '2025-03-08', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-03-08', cobranca_renovacao: '2025-04-08' },

  // Perdizes
  { id: 'n25', nome: 'Feira da Pompeia', slug: 'feira-da-pompeia', descricao: 'Mercado e feira gourmet com produtores locais, queijos artesanais, pães e orgânicos. Aberto na manhã de sábado.', bairro_id: 'b6', categoria_id: 'c5', guia_id: 'g6', endereco: 'Rua Turiassu, 390 — Perdizes, SP', instagram: 'feiradapompeia', whatsapp: '5511900112233', preco_medio: '$', horarios: { seg: 'Fechado', ter: 'Fechado', qua: 'Fechado', qui: 'Fechado', sex: 'Fechado', sab: '07h–14h', dom: 'Fechado' }, fotos: ['https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800'], destaque: true, ativo: true, criado_em: '2025-03-12', plano_id: 'p1', valor_cobrado: 150, valor_repasse: 50, cobranca_status: 'ativa', cobranca_inicio: '2025-03-12', cobranca_renovacao: '2025-04-12' },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function resolveNegocio(n: Negocio): NegocioCompleto {
  return {
    ...n,
    bairro: bairros.find(b => b.id === n.bairro_id),
    categoria: categorias.find(c => c.id === n.categoria_id),
    guia: guias.find(g => g.id === n.guia_id),
    plano: planos.find(p => p.id === n.plano_id),
  }
}

function delay(ms = 0) {
  return new Promise(r => setTimeout(r, ms))
}

// ─── MOCK REPOSITORY ──────────────────────────────────────────────────────────

const mockRepository: DataRepository = {
  async getBairros() {
    await delay()
    return bairros
      .filter(b => b.ativo)
      .map(b => ({
        ...b,
        total_negocios: negocios.filter(n => n.bairro_id === b.id && n.ativo).length,
      }))
  },

  async getBairroBySlug(slug) {
    await delay()
    const b = bairros.find(b => b.slug === slug && b.ativo)
    if (!b) return null
    return { ...b, total_negocios: negocios.filter(n => n.bairro_id === b.id && n.ativo).length }
  },

  async getCategorias() {
    await delay()
    return [...categorias].sort((a, b) => a.ordem - b.ordem)
  },

  async getCategoriaBySlug(slug) {
    await delay()
    return categorias.find(c => c.slug === slug) ?? null
  },

  async getGuias() {
    await delay()
    return guias.filter(g => g.ativo)
  },

  async getGuiaBySlug(slug) {
    await delay()
    return guias.find(g => g.slug === slug && g.ativo) ?? null
  },

  async getPlanos() {
    await delay()
    return planos.filter(p => p.ativo)
  },

  async getNegocios(filters = {}) {
    await delay()
    let result = negocios
    if (filters.ativo !== undefined) result = result.filter(n => n.ativo === filters.ativo)
    if (filters.bairro_id) result = result.filter(n => n.bairro_id === filters.bairro_id)
    if (filters.categoria_id) result = result.filter(n => n.categoria_id === filters.categoria_id)
    if (filters.destaque !== undefined) result = result.filter(n => n.destaque === filters.destaque)
    return result.map(resolveNegocio)
  },

  async getNegocioBySlug(slug) {
    await delay()
    const n = negocios.find(n => n.slug === slug && n.ativo)
    return n ? resolveNegocio(n) : null
  },

  async getNegociosByBairroCategoria(bairroSlug, categoriaSlug) {
    await delay()
    const bairro = bairros.find(b => b.slug === bairroSlug)
    const categoria = categorias.find(c => c.slug === categoriaSlug)
    if (!bairro || !categoria) return []
    return negocios
      .filter(n => n.bairro_id === bairro.id && n.categoria_id === categoria.id && n.ativo)
      .map(resolveNegocio)
  },

  async searchNegocios(query, bairroSlug) {
    await delay()
    const q = query.toLowerCase()
    let result = negocios.filter(n => n.ativo)
    if (bairroSlug) {
      const bairro = bairros.find(b => b.slug === bairroSlug)
      if (bairro) result = result.filter(n => n.bairro_id === bairro.id)
    }
    return result
      .filter(n => {
        const cat = categorias.find(c => c.id === n.categoria_id)
        return (
          n.nome.toLowerCase().includes(q) ||
          n.descricao?.toLowerCase().includes(q) ||
          cat?.nome.toLowerCase().includes(q)
        )
      })
      .map(resolveNegocio)
  },

  // Admin mutations (mock — apenas retornam dados simulados)
  async createNegocio(data) {
    const novo: Negocio = { ...data, id: `n${Date.now()}`, criado_em: new Date().toISOString() }
    negocios.push(novo)
    return novo
  },
  async updateNegocio(id, data) {
    const idx = negocios.findIndex(n => n.id === id)
    if (idx === -1) throw new Error('Negócio não encontrado')
    negocios[idx] = { ...negocios[idx], ...data }
    return negocios[idx]
  },
  async deleteNegocio(id) {
    const idx = negocios.findIndex(n => n.id === id)
    if (idx !== -1) negocios.splice(idx, 1)
  },
  async createGuia(data) {
    const novo: Guia = { ...data, id: `g${Date.now()}` }
    guias.push(novo)
    return novo
  },
  async updateGuia(id, data) {
    const idx = guias.findIndex(g => g.id === id)
    if (idx === -1) throw new Error('Guia não encontrado')
    guias[idx] = { ...guias[idx], ...data }
    return guias[idx]
  },
  async createBairro(data) {
    const novo: Bairro = { ...data, id: `b${Date.now()}` }
    bairros.push(novo)
    return novo
  },
  async updateBairro(id, data) {
    const idx = bairros.findIndex(b => b.id === id)
    if (idx === -1) throw new Error('Bairro não encontrado')
    bairros[idx] = { ...bairros[idx], ...data }
    return bairros[idx]
  },
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
// Para migrar para Supabase: crie supabaseRepository implementando DataRepository
// e troque a linha abaixo: export const db = supabaseRepository

export const db = mockRepository
