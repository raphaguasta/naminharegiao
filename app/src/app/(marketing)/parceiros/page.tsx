import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Transforme seu guia de bairro em receita recorrente | Para Parceiros',
  description: 'Um assistente de IA no WhatsApp com a identidade do seu guia. Seus seguidores perguntam, o assistente recomenda — e os negócios locais pagam R$150/mês.',
}

const WA = 'https://wa.me/5511944405488'

export default function ParceirosPage() {
  return (
    <div style={{ background: '#1a2744', color: '#f5f7fa', fontFamily: 'var(--font-dm, DM Sans, sans-serif)', fontWeight: 300, lineHeight: 1.65, overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 5vw', backdropFilter: 'blur(14px)', background: 'rgba(26,39,68,0.85)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontWeight: 700, fontSize: '1.05rem', color: '#f5f7fa', textDecoration: 'none' }}>
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
            <path d="M20 3C13.37 3 8 8.37 8 15c0 9.75 12 22 12 22s12-12.25 12-22C32 8.37 26.63 3 20 3z" fill="#2a8c8c"/>
            <circle cx="20" cy="15" r="5" fill="white"/>
            <circle cx="13" cy="12" r="2.5" fill="rgba(255,255,255,0.4)"/>
            <circle cx="27" cy="12" r="2.5" fill="rgba(255,255,255,0.4)"/>
            <circle cx="20" cy="6" r="3" fill="#e8603a"/>
          </svg>
          Na Minha Região
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ color: '#8a9bc4', textDecoration: 'none', fontSize: '.9rem' }}>Explorar bairros</Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ background: '#e8603a', color: '#fff', padding: '.5rem 1.3rem', borderRadius: 6, fontWeight: 500, fontSize: '.9rem', textDecoration: 'none' }}>
            Quero ser parceiro
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '6rem 5vw 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(42,140,140,.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 80%, rgba(232,96,58,.1) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(42,140,140,.15)', border: '1px solid rgba(42,140,140,.35)', color: '#3aabab', padding: '.4rem 1rem', borderRadius: 100, fontSize: '.8rem', fontWeight: 500, marginBottom: '1.5rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3aabab', display: 'inline-block' }} />
            PARA PARCEIROS
          </div>
          <h1 style={{ fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Transforme seu guia de bairro<br />em <span style={{ color: '#e8603a' }}>receita recorrente</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#8a9bc4', maxWidth: 480, marginBottom: '2.5rem' }}>
            Seu seguidor encontra o melhor do bairro pelo WhatsApp. Os negócios locais pagam por isso. Você participa.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{ background: '#e8603a', color: '#fff', padding: '.85rem 2rem', borderRadius: 8, fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 24px rgba(232,96,58,.35)' }}>
              Quero ser parceiro →
            </a>
            <a href="#como-funciona" style={{ color: '#8a9bc4', fontSize: '.95rem', textDecoration: 'none' }}>Ver como funciona ↓</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: '#1e2e50', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '2rem 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-around', gap: '2rem', flexWrap: 'wrap', textAlign: 'center' }}>
          {[['R$50', 'por negócio / mês para você'], ['7 dias', 'para ativar o WhatsApp do guia'], ['R$0', 'custo de adesão para o guia'], ['24h', 'o assistente responde sempre']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontWeight: 800, fontSize: '2rem' }}><span style={{ color: '#e8603a' }}>{v}</span></div>
              <div style={{ fontSize: '.8rem', color: '#8a9bc4', marginTop: '.2rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ color: '#3aabab', fontSize: '.8rem', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Como funciona</div>
          <h2 style={{ fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, marginBottom: '3.5rem' }}>Do seguidor ao pagamento,<br />em 4 passos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { n: '1', title: 'Seguidor manda mensagem', desc: 'No WhatsApp do guia. Sem baixar app, sem sair do feed.', color: '#2a8c8c' },
              { n: '2', title: 'IA responde na hora', desc: 'O assistente recomenda os melhores negócios do bairro, 24h por dia.', color: '#2a8c8c' },
              { n: '3', title: 'Negócio aparece', desc: 'O estabelecimento é recomendado toda vez que alguém perguntar sobre aquele segmento.', color: '#e8603a' },
              { n: '4', title: 'Negócio paga — você recebe', desc: 'R$150/mês vai para a plataforma. R$50 vão direto para você, todo mês.', color: '#e8603a' },
            ].map(s => (
              <div key={s.n} style={{ background: '#1e2e50', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '1.8rem 1.5rem', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontWeight: 800, fontSize: '1.1rem', border: `1.5px solid ${s.color}`, color: s.color, background: `${s.color}22` }}>
                  {s.n}
                </div>
                <h4 style={{ fontWeight: 700, marginBottom: '.5rem', fontSize: '1rem' }}>{s.title}</h4>
                <p style={{ fontSize: '.85rem', color: '#8a9bc4' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO VOCÊ GANHA */}
      <section style={{ background: '#1e2e50', padding: '6rem 5vw', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ color: '#3aabab', fontSize: '.8rem', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Para guias parceiros</div>
          <h2 style={{ fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, marginBottom: '2rem' }}>Receita previsível,<br />sem operação</h2>
          <p style={{ color: '#8a9bc4', marginBottom: '1.5rem', maxWidth: 520 }}>Você indica os negócios que já conhece e recomenda. A plataforma cuida de todo o resto.</p>
          <div style={{ background: '#1a2744', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(42,140,140,.12)', padding: '.9rem 1.4rem', fontSize: '.75rem', color: '#8a9bc4', fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase' }}>
              <span>Negócios ativos</span><span>Receita / mês</span><span>Acumulado / ano</span>
            </div>
            {[['5 negócios', 'R$ 250', 'R$ 3.000'], ['10 negócios', 'R$ 500', 'R$ 6.000'], ['30 negócios', 'R$ 1.500', 'R$ 18.000'], ['100 negócios', 'R$ 5.000', 'R$ 60.000']].map(([n, m, a], i) => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1rem 1.4rem', borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: '.9rem' }}>
                <span style={{ color: '#8a9bc4' }}>{n}</span>
                <span style={{ color: i === 3 ? '#e8603a' : '#3aabab', fontWeight: 600 }}>{m}</span>
                <span style={{ color: i === 3 ? '#e8603a' : '#8a9bc4', fontWeight: i === 3 ? 700 : 400 }}>{a}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '.8rem', color: '#8a9bc4' }}>Base: R$50 por negócio ativo por mês</p>
        </div>
      </section>

      {/* COMO COMEÇAR */}
      <section style={{ padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ color: '#3aabab', fontSize: '.8rem', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Como começar</div>
          <h2 style={{ fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, marginBottom: '3rem' }}>Simples. Sem custo.<br />Em 4 passos.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['01', 'Feche a parceria', 'Sem taxa de adesão. Zero custo para o guia. Você só começa a receber quando os negócios pagarem.'],
              ['02', 'Liste os primeiros negócios', 'Indique 5–10 estabelecimentos que você já conhece e recomenda. A plataforma faz o contato e o cadastro.'],
              ['03', 'Ativamos o WhatsApp do guia', 'Setup em até 7 dias. Número configurado, assistente treinado com o perfil do seu bairro, identidade visual aplicada.'],
              ['04', 'Escala', 'Você divulga para os seguidores, novos negócios entram, receita cresce mês a mês. Sem limite de teto.'],
            ].map(([n, t, d]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', background: '#1e2e50', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '1.6rem 2rem' }}>
                <div style={{ fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontWeight: 800, fontSize: '2rem', color: 'rgba(255,255,255,0.1)', minWidth: '3rem', lineHeight: 1 }}>{n}</div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '.4rem', fontSize: '1rem' }}>{t}</h4>
                  <p style={{ fontSize: '.875rem', color: '#8a9bc4' }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: 'linear-gradient(135deg, #243357, #1a2744)', borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center', padding: '7rem 5vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 80% at 50% 100%, rgba(232,96,58,.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
            Seu bairro já tem comunidade.<br /><span style={{ color: '#e8603a' }}>Agora ela pode gerar receita para você.</span>
          </h2>
          <p style={{ color: '#8a9bc4', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: 500, margin: '0 auto 2.5rem' }}>
            Sem custo de adesão. Sem risco. Só receita recorrente.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-block', background: '#e8603a', color: '#fff', padding: '.95rem 2.5rem', borderRadius: 10, fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 8px 32px rgba(232,96,58,.4)' }}>
            Quero ser parceiro →
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {['Zero custo de entrada', 'Setup em 7 dias', 'Identidade white-label', 'Repasse automático'].map(b => (
              <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.8rem', color: '#8a9bc4' }}>
                <span style={{ color: '#3aabab', fontWeight: 700 }}>✓</span> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2.5rem 5vw', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '.8rem', color: '#8a9bc4' }}>© {new Date().getFullYear()} Na Minha Região. Todos os direitos reservados.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/" style={{ color: '#8a9bc4', textDecoration: 'none', fontSize: '.8rem' }}>Explorar bairros</Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: '#8a9bc4', textDecoration: 'none', fontSize: '.8rem' }}>Contato</a>
        </div>
      </footer>
    </div>
  )
}
