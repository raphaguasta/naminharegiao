## Antes de começar qualquer tarefa

Leia `pitch-deck.md` na raiz do repositório. Ele define o produto, o modelo de negócio e o tom da plataforma — use como referência para qualquer decisão de produto ou copy.

---

## HOW — rodar e buildar

```bash
cd app && npm run dev      # dev em localhost:3000
cd app && npm run build    # sempre rode antes de commitar
```

Admin: `/admin/login` — senha em `app/.env.local` (`ADMIN_PASSWORD`).

---

## WHAT — decisões de arquitetura não óbvias no código

**Mock-first:** toda leitura de dados passa por `app/src/lib/data.ts` → `export const db = mockRepository`. Para migrar para Supabase: implementar `DataRepository` (definida em `lib/types.ts`) e trocar essa linha. Nada nas páginas muda.

**URLs:** helpers em `lib/urls.ts` — use sempre `bairroUrl`, `negocioUrl`, `categoriaUrl`. Nunca monte a URL manualmente nas páginas.

**`/[uf]/[cidade]/[bairro]/[slug]` serve negócio E categoria na mesma página.** A página faz as duas queries em paralelo e renderiza o tipo correto. Não separe em arquivos distintos — quebraria o SEO das URLs já definidas.

**Billing desnormalizado no Negocio:** `valor_cobrado` e `valor_repasse` são snapshots do momento da contratação. Se o Plano subir de preço amanhã, quem já está ativo continua no valor antigo. Use sempre `negocio.valor_cobrado` (não `plano.valor_negocio`) para calcular MRR.

---

## WHY — modelo de negócio

Vende **presença e posicionamento**, não performance. O negócio paga para aparecer nas recomendações de um canal de confiança — não paga por clique ou venda rastreável. Isso é intencional: protege contra churn por resultado fraco.

Ciclo de valor tem 3 elos: (1) seguidor usa o WhatsApp → (2) negócio percebe movimento → (3) negócio renova. Se o elo 1 falhar, os outros colapsam. Toda decisão de produto deve endereçar frequência de uso do canal.

**Fora do MVP:** login de usuário, billing automatizado, Supabase (estrutura pronta, integração depois).
