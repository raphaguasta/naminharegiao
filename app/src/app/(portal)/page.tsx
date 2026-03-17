import type { Metadata } from 'next'
import { db } from '@/lib/data'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Descubra os melhores negócios do seu bairro',
  description: 'Na Minha Região — Encontre restaurantes, cafés, bares e serviços recomendados pelo guia do seu bairro.',
}

export default async function HomePage() {
  const [bairros, negociosDestaque, guias] = await Promise.all([
    db.getBairros(),
    db.getNegocios({ destaque: true, ativo: true }),
    db.getGuias(),
  ])

  return <HomeClient bairros={bairros} negociosDestaque={negociosDestaque} guias={guias} />
}
