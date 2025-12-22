# Trade Pro — UI Shell (Responsive)

Este projeto é o **esqueleto visual**: Sidebar + Topbar + Body com rotas, placeholders e **filtro global de tempo** (presets) pronto para ligar à DB na próxima etapa.

## Requisitos
- Node.js 18+ (recomendado: LTS)
- npm

## Como correr
```bash
npm install
npm run dev
```

## O que já está feito
- Sidebar (desktop fixo, tablet rail, mobile drawer)
- Topbar (presets em 2 rows em desktop, bottom sheet em mobile)
- Rotas conforme a estrutura definida
- Quick Create: botões no desktop + FAB no mobile
- TimeFilterContext com range calculado (EU week starts Monday)

## Próximo passo
- Fechar schema DB (Prisma) e ligar os filtros às queries por página
- Implementar listas + filtros + ações (archive/delete) nos Reports
