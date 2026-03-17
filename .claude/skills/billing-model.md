---
name: billing-model
description: Modelo de billing do Na Minha Região — como calcular MRR, repasse e status de cobrança. Use quando trabalhar com admin/billing ou métricas financeiras.
type: reference
---

## Estrutura

**Plano** (tabela de preços): `valor_negocio` e `valor_guia` são os preços ATUAIS. Não use para calcular receita histórica.

**Billing fica no Negocio** (desnormalizado):
- `valor_cobrado` — snapshot do preço no momento da contratação ← USE ESTE para MRR
- `valor_repasse` — snapshot do repasse ao guia ← USE ESTE para repasse
- `cobranca_status`: `'trial' | 'ativa' | 'pausada' | 'cancelada'`
- `cobranca_inicio` e `cobranca_renovacao` — datas ISO

## Cálculos

```ts
// MRR — só negócios ativos, usando valor snapshottado
const mrr = negocios
  .filter(n => n.cobranca_status === 'ativa')
  .reduce((sum, n) => sum + (n.valor_cobrado ?? 0), 0)

// Repasse total do mês
const repasse = negocios
  .filter(n => n.cobranca_status === 'ativa')
  .reduce((sum, n) => sum + (n.valor_repasse ?? 0), 0)

// Receita líquida
const liquido = mrr - repasse

// Trials expirando (próximos 7 dias)
const hoje = new Date()
const em7dias = new Date(hoje.getTime() + 7 * 24 * 60 * 60 * 1000)
const expirando = negocios.filter(n =>
  n.cobranca_status === 'trial' &&
  n.cobranca_renovacao &&
  new Date(n.cobranca_renovacao) <= em7dias
)
```

## Por que snapshot?

Se o Plano Básico subir de R$150 para R$200, negócios contratados anteriormente continuam em R$150. Apenas novos contratos entram no preço novo. Por isso MRR usa `valor_cobrado` (imutável após contratação), não `plano.valor_negocio`.
