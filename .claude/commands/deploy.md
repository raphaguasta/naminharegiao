Prepare e faça deploy do portal para Vercel.

1. `cd app && npm run build` — não continue se houver erros.
2. Commite pendências com `/commit`.
3. `git push`
4. Se não estiver linkado ao Vercel ainda: `cd app && npx vercel --prod`
   Se já estiver linkado: o push já dispara o deploy automático.

Variáveis de ambiente necessárias no painel do Vercel:
- `ADMIN_PASSWORD` — obrigatório
- `ANTHROPIC_API_KEY` — opcional (busca IA usa fallback texto sem ele)
- `NEXT_PUBLIC_SUPABASE_URL` — futuro
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — futuro
- `SUPABASE_SERVICE_ROLE_KEY` — futuro

$ARGUMENTS
