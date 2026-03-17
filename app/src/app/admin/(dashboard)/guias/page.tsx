import { db } from '@/lib/data'

export default async function GuiasPage() {
  const [guias, negocios, bairros] = await Promise.all([db.getGuias(), db.getNegocios({ ativo: true }), db.getBairros()])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-2xl mb-1">Guias</h1>
          <p className="text-[#8a9bc4] text-sm">{guias.length} guias parceiros</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guias.map(g => {
          const bairro = bairros.find(b => b.id === g.bairro_id)
          const negociosGuia = negocios.filter(n => n.guia_id === g.id)
          const ativos = negociosGuia.filter(n => n.cobranca_status === 'ativa')
          const repasse = ativos.reduce((s, n) => s + (n.valor_repasse ?? 0), 0)

          return (
            <div key={g.id} className="bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-[rgba(42,140,140,0.15)] flex items-center justify-center text-lg">👤</div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${g.ativo ? 'text-[#3aabab] bg-[rgba(42,140,140,0.15)]' : 'text-[#8a9bc4] bg-[rgba(255,255,255,0.05)]'}`}>
                  {g.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-white mb-0.5">{g.nome}</h3>
              <p className="text-[#8a9bc4] text-xs mb-3">{bairro?.nome ?? '—'}</p>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-[rgba(255,255,255,0.04)] rounded-lg py-2">
                  <p className="font-bold text-white text-base">{negociosGuia.length}</p>
                  <p className="text-[#8a9bc4] text-[0.6rem]">negócios</p>
                </div>
                <div className="bg-[rgba(255,255,255,0.04)] rounded-lg py-2">
                  <p className="font-bold text-[#3aabab] text-base">{ativos.length}</p>
                  <p className="text-[#8a9bc4] text-[0.6rem]">ativos</p>
                </div>
                <div className="bg-[rgba(255,255,255,0.04)] rounded-lg py-2">
                  <p className="font-bold text-[#e8603a] text-base">R${repasse}</p>
                  <p className="text-[#8a9bc4] text-[0.6rem]">repasse/mês</p>
                </div>
              </div>

              <div className="flex gap-2">
                {g.instagram && (
                  <a href={`https://instagram.com/${g.instagram}`} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-1 text-[#8a9bc4] hover:text-white text-xs transition-colors">
                    📸 @{g.instagram}
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
