# VORTEX Audio Labs

Site oficial da **VORTEX Audio Labs** — linha premium de equipamentos de áudio, fones esportivos e acessórios táticos.

## Stack

- **Frontend:** React 19 + TypeScript + Vite 8
- **Estilo:** Tailwind CSS 4
- **Roteamento:** React Router 7
- **Estado:** Zustand 5 (carrinho + autenticação)
- **Backend:** Supabase (Auth + Database)
- **Deploy:** Vercel

## Estrutura

```
src/
├── components/
│   ├── animation/     # ScrollVideo, ScrollFrames
│   ├── hero/          # Hero, CoreSection, Commercial
│   ├── layout/        # Navbar, Footer, VortexRibbon
│   ├── product/       # ProductCard, ProductGrid, ProductDetailModal
│   └── ui/            # GlassCard, Button
├── data/              # Catálogo de produtos (headset-catalog.ts)
├── lib/               # Cliente Supabase
├── pages/             # Home, Especificacoes, Comparar, Comprar, Login, ProdutoDetalhe
├── stores/            # cartStore, authStore
└── main.tsx           # Entry point
```

## Rotas

| Rota | Página |
|------|--------|
| `/` | Home — Visão Geral |
| `/especificacoes` | Catálogo de produtos |
| `/produto/:id` | Detalhe do produto |
| `/comparar` | Comparação ficha técnica |
| `/comprar` | Carrinho + checkout |
| `/login` | Login / Cadastro |

## Setup local

```bash
npm install
npm run dev
```

## Variáveis de ambiente

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

## Banco de dados

As migrations estão em `supabase/migrations/`. Execute em ordem no SQL Editor do Supabase.

## Deploy

```bash
npm run build
vercel --prod
```

## Licença

Proprietário — VORTEX Audio Labs.
