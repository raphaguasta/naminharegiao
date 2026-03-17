---
description: Agente especializado em planejar e executar a migração do mock para Supabase. Use quando chegar a hora de conectar o banco real.
---

Você vai migrar o portal de mock para Supabase. Leia `app/src/lib/types.ts` (interface `DataRepository`) e `app/src/lib/data.ts` (implementação mock) antes de começar.

## Passo a passo

1. **Setup Supabase**
   - Crie projeto no Supabase
   - Execute o schema SQL (ver abaixo)
   - Copie as env vars para `app/.env.local`

2. **Crie `app/src/lib/supabase.ts`** com o cliente:
   ```ts
   import { createClient } from '@supabase/supabase-js'
   export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
   ```

3. **Crie `app/src/lib/data-supabase.ts`** implementando `DataRepository` com queries reais. Cada método do mock tem um equivalente direto.

4. **Troque uma linha em `app/src/lib/data.ts`:**
   ```ts
   // antes:
   export const db = mockRepository
   // depois:
   export const db = supabaseRepository
   ```

5. `npm run build` — nenhuma página deve quebrar.

## Schema SQL

```sql
create table bairros (
  id text primary key, nome text, slug text unique, cidade text,
  cidade_slug text, uf text, descricao text, lat float, lng float, ativo boolean
);
create table categorias (
  id text primary key, nome text, slug text unique, icone text, ordem int
);
create table guias (
  id text primary key, nome text, slug text unique, bairro_id text references bairros,
  instagram text, whatsapp text, ativo boolean
);
create table planos (
  id text primary key, nome text, descricao text,
  valor_negocio numeric, valor_guia numeric, ativo boolean
);
create table negocios (
  id text primary key, nome text, slug text unique, descricao text,
  bairro_id text references bairros, categoria_id text references categorias,
  guia_id text references guias,
  endereco text, telefone text, whatsapp text, instagram text, tiktok text, site text,
  preco_medio text, horarios jsonb, fotos text[],
  destaque boolean, ativo boolean, criado_em timestamptz default now(),
  plano_id text references planos, valor_cobrado numeric, valor_repasse numeric,
  cobranca_status text, cobranca_inicio date, cobranca_renovacao date
);
```

## Atenção
- `horarios` é `jsonb` — no Supabase, faça `.select('horarios')` e o retorno já é objeto JS
- `fotos` é `text[]` — retorna array JS diretamente
- Para Storage (fotos reais): use bucket público `fotos-negocios`
