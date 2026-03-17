import Link from 'next/link'
import type { Bairro } from '@/lib/types'
import { bairroUrl } from '@/lib/urls'

export default function BairroCard({ bairro }: { bairro: Bairro }) {
  return (
    <Link href={bairroUrl(bairro)}
      className="block bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 hover:border-[rgba(42,140,140,0.4)] hover:-translate-y-1 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-[rgba(42,140,140,0.15)] flex items-center justify-center text-lg">
          📍
        </div>
        <span className="text-xs text-[#8a9bc4] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded-full">
          {bairro.total_negocios ?? 0} negócios
        </span>
      </div>
      <h3 className="font-[family-name:var(--font-jakarta)] font-700 text-white text-lg mb-1 group-hover:text-[#3aabab] transition-colors">
        {bairro.nome}
      </h3>
      <p className="text-[#8a9bc4] text-sm leading-relaxed line-clamp-2">{bairro.descricao}</p>
      <div className="mt-4 text-[#3aabab] text-xs font-medium flex items-center gap-1">
        Explorar bairro <span>→</span>
      </div>
    </Link>
  )
}
