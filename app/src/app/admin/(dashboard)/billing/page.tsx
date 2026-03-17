import { db } from '@/lib/data'

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

export default async function BillingPage() {
  const [negocios, guias, planos] = await Promise.all([db.getNegocios(), db.getGuias(), db.getPlanos()])

  const ativos = negocios.filter(n => n.cobranca_status === 'ativa')
  const trial = negocios.filter(n => n.cobranca_status === 'trial')
  const pausados = negocios.filter(n => n.cobranca_status === 'pausada')
  const cancelados = negocios.filter(n => n.cobranca_status === 'cancelada')

  const mrr = ativos.reduce((s, n) => s + (n.valor_cobrado ?? 0), 0)
  const repasseTotal = ativos.reduce((s, n) => s + (n.valor_repasse ?? 0), 0)
  const receitaLiquida = mrr - repasseTotal

  // Por guia
  const repassePorGuia = guias.map(g => {
    const negG = ativos.filter(n => n.guia_id === g.id)
    return { guia: g, count: negG.length, repasse: negG.reduce((s, n) => s + (n.valor_repasse ?? 0), 0) }
  }).filter(x => x.repasse > 0)

  return (
    <div>
      <h1 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl mb-1">Billing</h1>
      <p className="text-[#8a9bc4] text-sm mb-6">Assinaturas e receita mensal</p>

      {/* Resumo financeiro */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'MRR', value: `R$ ${mrr.toLocaleString('pt-BR')}`, color: '#e8603a' },
          { label: 'Repasse guias', value: `R$ ${repasseTotal.toLocaleString('pt-BR')}`, color: '#3aabab' },
          { label: 'Receita líquida', value: `R$ ${receitaLiquida.toLocaleString('pt-BR')}`, color: '#3aabab' },
          { label: 'Ticket médio', value: `R$ ${ativos.length ? Math.round(mrr / ativos.length) : 0}`, color: '#f5f7fa' },
        ].map(s => (
          <div key={s.label} className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-4">
            <p className="text-[#8a9bc4] text-xs mb-1">{s.label}</p>
            <p className="font-[family-name:var(--font-jakarta)] font-bold text-xl" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Por status */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Ativos', count: ativos.length, color: '#3aabab' },
          { label: 'Trial', count: trial.length, color: '#f5f7fa' },
          { label: 'Pausados', count: pausados.length, color: '#8a9bc4' },
          { label: 'Cancelados', count: cancelados.length, color: '#e8603a' },
        ].map(s => (
          <div key={s.label} className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-xl p-4 text-center">
            <p className="font-[family-name:var(--font-jakarta)] font-bold text-2xl" style={{ color: s.color }}>{s.count}</p>
            <p className="text-[#8a9bc4] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Planos disponíveis */}
      <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5 mb-6">
        <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white mb-4">Planos disponíveis</h2>
        <div className="flex gap-4 flex-wrap">
          {planos.map(p => (
            <div key={p.id} className="flex-1 min-w-[200px] bg-[rgba(255,255,255,0.04)] rounded-xl p-4 border border-[rgba(255,255,255,0.07)]">
              <div className="flex items-center justify-between mb-2">
                <p className="font-[family-name:var(--font-jakarta)] font-bold text-white">{p.nome}</p>
                {p.ativo && <span className="text-xs text-[#3aabab] bg-[rgba(42,140,140,0.15)] px-2 py-0.5 rounded-full">Ativo</span>}
              </div>
              <p className="text-[#8a9bc4] text-xs mb-3">{p.descricao}</p>
              <div className="flex justify-between text-sm">
                <div><p className="text-[#8a9bc4] text-xs">Negócio paga</p><p className="text-white font-medium">R$ {p.valor_negocio}/mês</p></div>
                <div className="text-right"><p className="text-[#8a9bc4] text-xs">Guia recebe</p><p className="text-[#e8603a] font-medium">R$ {p.valor_guia}/mês</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repasse por guia */}
      {repassePorGuia.length > 0 && (
        <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.07)]">
            <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white">Repasse por guia (este mês)</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#8a9bc4] text-xs border-b border-[rgba(255,255,255,0.05)]">
                <th className="text-left px-5 py-3 font-medium">Guia</th>
                <th className="text-left px-5 py-3 font-medium">Negócios ativos</th>
                <th className="text-left px-5 py-3 font-medium">Repasse</th>
              </tr>
            </thead>
            <tbody>
              {repassePorGuia.map(({ guia, count, repasse }) => (
                <tr key={guia.id} className="border-b border-[rgba(255,255,255,0.04)]">
                  <td className="px-5 py-3 text-white font-medium">{guia.nome}</td>
                  <td className="px-5 py-3 text-[#8a9bc4]">{count}</td>
                  <td className="px-5 py-3 text-[#e8603a] font-medium">R$ {repasse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabela completa de assinaturas */}
      <div className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.07)]">
          <h2 className="font-[family-name:var(--font-jakarta)] font-bold text-white">Todas as assinaturas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#8a9bc4] text-xs border-b border-[rgba(255,255,255,0.05)]">
                <th className="text-left px-5 py-3 font-medium">Negócio</th>
                <th className="text-left px-5 py-3 font-medium">Guia</th>
                <th className="text-left px-5 py-3 font-medium">Plano</th>
                <th className="text-left px-5 py-3 font-medium">Valor</th>
                <th className="text-left px-5 py-3 font-medium">Repasse</th>
                <th className="text-left px-5 py-3 font-medium">Início</th>
                <th className="text-left px-5 py-3 font-medium">Renovação</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {negocios.map(n => (
                <tr key={n.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-5 py-3 text-white font-medium">{n.nome}</td>
                  <td className="px-5 py-3 text-[#8a9bc4] text-xs">{n.guia?.nome ?? '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4] text-xs">{n.plano?.nome ?? '—'}</td>
                  <td className="px-5 py-3 text-[#3aabab]">R$ {n.valor_cobrado ?? '—'}</td>
                  <td className="px-5 py-3 text-[#e8603a]">R$ {n.valor_repasse ?? '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4] text-xs">{n.cobranca_inicio ? new Date(n.cobranca_inicio).toLocaleDateString('pt-BR') : '—'}</td>
                  <td className="px-5 py-3 text-[#8a9bc4] text-xs">{n.cobranca_renovacao ? new Date(n.cobranca_renovacao).toLocaleDateString('pt-BR') : '—'}</td>
                  <td className="px-5 py-3"><StatusBadge status={n.cobranca_status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
