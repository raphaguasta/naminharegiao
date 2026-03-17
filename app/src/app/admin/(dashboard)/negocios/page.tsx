import { db } from '@/lib/data'
import Link from 'next/link'

function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    ativa:    { label: 'Ativa',    color: '#3aabab', bg: 'rgba(42,140,140,0.15)' },
    trial:    { label: 'Trial',    color: '#f5f7fa', bg: 'rgba(255,255,255,0.08)' },
    pausada:  { label: 'Pausada',  color: '#8a9bc4', bg: 'rgba(138,155,196,0.1)' },
    cancelada:{ label: 'Cancelada',color: '#e8603a', bg: 'rgba(232,96,58,0.12)' },
  }
  const s = map[status ?? ''] ?? { label: status ?? '—', color: '#8a9bc4', bg: 'rgba(255,255,255,0.05)' }
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
}

export default async function NegociosPage() {
  const negocios = await db.getNegocios()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl mb-1">Negócios</h1>
          <p className="text-[#8a9bc4] text-sm">{negocios.length} negócios cadastrados</p>
        </div>
        <button className="bg-[#e8603a] text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-[#f07550] transition-colors cursor-not-allowed opacity-60" title="Em breve">
          + Novo negócio
        </button>
      </div>

      <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#8a9bc4] text-xs border-b border-[rgba(255,255,255,0.07)]">
                <th className="text-left px-5 py-3 font-medium">Nome</th>
                <th className="text-left px-5 py-3 font-medium">Bairro</th>
                <th className="text-left px-5 py-3 font-medium">Categoria</th>
                <th className="text-left px-5 py-3 font-medium">Guia</th>
                <th className="text-left px-5 py-3 font-medium">Plano</th>
                <th className="text-left px-5 py-3 font-medium">Valor cobrado</th>
                <th className="text-left px-5 py-3 font-medium">Repasse</th>
                <th className="text-left px-5 py-3 font-medium">Renovação</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Canais</th>
              </tr>
            </thead>
            <tbody>
              {negocios.map(n => (
                <tr key={n.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="px-5 py-3">
                    <div>
                      <Link href={`/${n.slug}`} target="_blank" className="text-white font-medium hover:text-[#3aabab] transition-colors">{n.nome}</Link>
                      {n.destaque && <span className="ml-2 text-[#e8603a] text-[0.6rem]">★ destaque</span>}
                    </div>
                    <div className="text-[#8a9bc4] text-xs">{n.endereco?.split('—')[0]?.trim()}</div>
                  </td>
                  <td className="px-5 py-3 text-[#8a9bc4]">{n.bairro?.nome ?? '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4]">{n.categoria?.icone} {n.categoria?.nome ?? '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4] text-xs">{n.guia?.nome ?? '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4] text-xs">{n.plano?.nome ?? '—'}</td>
                  <td className="px-5 py-3 text-[#3aabab] font-medium">R$ {n.valor_cobrado ?? '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4]">R$ {n.valor_repasse ?? '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4] text-xs">{n.cobranca_renovacao ? new Date(n.cobranca_renovacao).toLocaleDateString('pt-BR') : '—'}</td>
                  <td className="px-5 py-3"><StatusBadge status={n.cobranca_status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      {n.whatsapp && <a href={`https://wa.me/${n.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#3aabab] hover:text-white text-xs" title="WhatsApp">💬</a>}
                      {n.instagram && <a href={`https://instagram.com/${n.instagram}`} target="_blank" rel="noopener noreferrer" className="text-[#8a9bc4] hover:text-white text-xs" title="Instagram">📸</a>}
                      {n.tiktok && <a href={`https://tiktok.com/@${n.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-[#8a9bc4] hover:text-white text-xs" title="TikTok">🎵</a>}
                      {n.site && <a href={n.site} target="_blank" rel="noopener noreferrer" className="text-[#8a9bc4] hover:text-white text-xs" title="Site">🌐</a>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
