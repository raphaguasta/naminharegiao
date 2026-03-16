import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/data'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const query = searchParams.get('q')?.trim()
  const bairroSlug = searchParams.get('bairro') ?? undefined

  if (!query) return NextResponse.json({ results: [] })

  // Busca candidatos no data layer
  const candidatos = await db.searchNegocios(query, bairroSlug)

  if (!candidatos.length) return NextResponse.json({ results: [] })

  // Se não tem API key, retorna busca simples (fallback)
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ results: candidatos.slice(0, 6) })
  }

  // Monta contexto para o Claude
  const contexto = candidatos.map(n =>
    `ID: ${n.id} | Nome: ${n.nome} | Categoria: ${n.categoria?.nome ?? '?'} | Bairro: ${n.bairro?.nome ?? '?'} | Preço: ${n.preco_medio ?? '?'} | Descrição: ${n.descricao ?? ''}`
  ).join('\n')

  try {
    const resp = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{
        role: 'user',
        content: `Você é um assistente de recomendação de negócios locais no Brasil.

Lista de negócios disponíveis:
${contexto}

Pergunta do usuário: "${query}"

Responda com um JSON array com os IDs dos negócios mais relevantes para a pergunta, em ordem de relevância. Retorne no máximo 6. Se nenhum for relevante, retorne array vazio.

Formato: {"ids": ["id1","id2",...]}`,
      }],
    })

    const text = resp.content[0].type === 'text' ? resp.content[0].text : ''
    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      const { ids } = JSON.parse(match[0]) as { ids: string[] }
      const ordered = ids
        .map(id => candidatos.find(n => n.id === id))
        .filter(Boolean)
      return NextResponse.json({ results: ordered })
    }
  } catch {
    // fallback para busca simples
  }

  return NextResponse.json({ results: candidatos.slice(0, 6) })
}
