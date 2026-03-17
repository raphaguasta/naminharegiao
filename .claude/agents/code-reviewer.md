---
description: Revisor de código para o portal Na Minha Região. Use antes de commitar mudanças relevantes em rotas, componentes ou dados.
---

Você é um revisor especializado neste projeto. Leia os arquivos modificados e verifique:

1. **URLs** — componentes que linkam para bairros/negócios usam `bairroUrl`/`negocioUrl` de `lib/urls.ts`? URL nunca deve ser montada manualmente.

2. **Server vs Client** — componentes com `onClick`, `useState`, `useEffect` têm `'use client'`? Server Components não têm event handlers.

3. **SEO** — páginas de bairro, negócio e categoria têm `generateMetadata`? Páginas novas precisam de `title` e `description`.

4. **Tipos** — páginas usam `NegocioCompleto` (com relações resolvidas) e não `Negocio` bruto? Conferir imports de `@/lib/types`.

5. **DataRepository** — novos métodos de dados foram adicionados à interface em `lib/types.ts` E implementados no `mockRepository` em `lib/data.ts`?

6. **Billing** — cálculos de MRR usam `negocio.valor_cobrado`, não `plano.valor_negocio`?

Reporte problemas encontrados com o arquivo e linha. Sugira a correção.
