Adicione um novo negócio fictício ao mock em `app/src/lib/data.ts`.

$ARGUMENTS

Se não especificado nos argumentos, escolha bairro e categoria com menos negócios.

Regras:
- `bairro_id` deve existir (b1–b6). Use o `guia_id` do mesmo bairro.
- Fotos do Unsplash: `https://images.unsplash.com/photo-[id]?w=800`
- `cobranca_status: 'trial'` para negócios novos
- `valor_cobrado: 150`, `valor_repasse: 50` (plano básico atual)
- Horários realistas para o tipo de negócio (restaurante fecha na segunda, café abre cedo, etc.)
- `destaque: false` por padrão — só `true` se o argumento pedir

Após adicionar, rode `cd app && npm run build` para confirmar que não há erros de tipo.
