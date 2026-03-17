import { db } from '@/lib/data'

export default async function AdminDashboard() {
  const [negocios, guias, bairros, planos] = await Promise.all([
    db.getNegocios({ ativo: true }),
    db.getGuias(),
    db.getBairros(),
    db.getPlanos(),
  ])

  const ativos = negocios.filter(n => n.cobranca_status === 'ativa')
  const trial = negocios.filter(n => n.cobranca_status === 'trial')
  const cancelados = negocios.filter(n => n.cobranca_status === 'cancelada')
  const mrr = ativos.reduce((sum, n) => sum + (n.valor_cobrado ?? 0), 0)
  const repasse = ativos.reduce((sum, n) => sum + (n.valor_repasse ?? 0), 0)
  const receita = mrr - repasse

  const hoje = new Date()
  const em7dias = new Date(hoje); em7dias.setDate(hoje.getDate() + 7)
  const trialsExpirando = trial.filter(n => {
    if (!n.cobranca_renovacao) return false
    const d = new Date(n.cobranca_renovacao)
    return d >= hoje && d <= em7dias
  })

  const statCards = [
    { label: 'MRR total', value: `R$ ${mrr.toLocaleString('pt-BR')}`, sub: 'cobrado dos negócios', color: '#e8603a' },
    { label: 'Repasse guias', value: `R$ ${repasse.toLocaleString('pt-BR')}`, sub: 'a pagar este mês', color: '#3aabab' },
    { label: 'Receita líquida', value: `R$ ${receita.toLocaleString('pt-BR')}`, sub: 'MRR − repasse', color: '#3aabab' },
    { label: 'Negócios ativos', value: ativos.length, sub: `${trial.length} em trial · ${cancelados.length} cancelados`, color: '#f5f7fa' },
    { label: 'Guias parceiros', value: guias.length, sub: `em ${bairros.length} bairros`, color: '#f5f7fa' },
    { label: 'Trials expirando', value: trialsExpirando.length, sub: 'próximos 7 dias', color: trialsExpirando.length > 0 ? '#e8603a' : '#8a9bc4' },
  ]

  return (
    <div>
      <h1 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl mb-1">Dashboard</h1>
      <p className="text-[#8a9bc4] text-sm mb-8">Visão geral da plataforma</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {statCards.map(s => (
          <div key={s.label} className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5">
            <p className="text-[#8a9bc4] text-xs mb-2">{s.label}</p>
            <p className="font-[family-name:var(--font-jakarta)] font-bold text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[#8a9bc4] text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Negócios recentes */}
      <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-base">Negócios recentes</h2>
          <a href="/admin/negocios" className="text-[#3aabab] text-xs hover:text-white transition-colors">Ver todos →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#8a9bc4] text-xs border-b border-[rgba(255,255,255,0.05)]">
                <th className="text-left px-5 py-3 font-medium">Negócio</th>
                <th className="text-left px-5 py-3 font-medium">Bairro</th>
                <th className="text-left px-5 py-3 font-medium">Plano</th>
                <th className="text-left px-5 py-3 font-medium">Valor</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {negocios.slice(0, 8).map(n => (
                <tr key={n.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="px-5 py-3 text-white font-medium">{n.nome}</td>
                  <td className="px-5 py-3 text-[#8a9bc4]">{n.bairro?.nome ?? '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4]">{n.plano?.nome ?? '—'}</td>
                  <td className="px-5 py-3 text-[#3aabab]">R$ {n.valor_cobrado ?? 0}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={n.cobranca_status} />
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
