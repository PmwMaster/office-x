# VORTEX Audio Labs — Documentação Técnica

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19, TypeScript 6, Vite 8, React Router 7 |
| Estilo | Tailwind CSS 4 (tema escuro com design tokens customizados) |
| Estado | Zustand 5 (cartStore, authStore) |
| Backend | Supabase (PostgreSQL + Auth), Stripe (pagamento) |
| Deploy | Vercel (SPA estática + Serverless Functions) |
| Pacotes | `@supabase/supabase-js`, `lucide-react`, `stripe`, `zustand` |

---

## Estrutura de Diretórios

```
office-x/
├── api/
│   └── create-checkout.ts          # Serverless Function — cria sessão Stripe
├── public/
│   ├── vortex-logo.png             # Logo VORTEX
│   ├── favicon.png                 # Favicon
│   ├── comercial.mp4               # Vídeo Pulse Overdrive
│   ├── core-earphones.mp4          # Vídeo Core Ultra
│   ├── video-project-7.mp4         # Vídeo Apex Prime
│   ├── corfone/                    # 4 variantes de cor (azul, branco, carbon, rosa)
│   ├── framesfone/                 # 21 frames sequenciais para animação
│   └── images/products/            # 83 imagens de produtos
├── scripts/
│   ├── download-images.mjs         # Baixa imagens de CDNs
│   └── icecat-fetch.cjs            # Busca dados da API Icecat
├── src/
│   ├── main.tsx                    # Entry point React
│   ├── index.css                   # CSS global + design tokens + animações
│   ├── App.tsx                     # Root — restaura sessão + router
│   ├── components/
│   │   ├── animation/              # ScrollFrames, ScrollVideo, LoopVideo
│   │   ├── auth/                   # ProtectedRoute
│   │   ├── hero/                   # Hero, CoreSection, Commercial
│   │   ├── layout/                 # Navbar, Footer, Layout, VortexRibbon
│   │   ├── product/                # ProductCard, ProductGrid, ProductDetailModal
│   │   └── ui/                     # Button, GlassCard, HybridCartSidebar
│   ├── data/
│   │   ├── products.ts             # Interface Product
│   │   └── headset-catalog.ts      # Catálogo com 6 produtos VORTEX
│   ├── lib/
│   │   └── supabase.ts             # Singleton cliente Supabase
│   ├── pages/
│   │   ├── Home.tsx                # Landing page (/)
│   │   ├── Especificacoes.tsx       # Catálogo de produtos (/especificacoes)
│   │   ├── ProdutoDetalhe.tsx       # Detalhe do produto (/produto/:id)
│   │   ├── Comparar.tsx            # Comparação de produtos (/comparar)
│   │   ├── Comprar.tsx             # Carrinho + checkout (/comprar) — protegida
│   │   ├── Login.tsx               # Login / cadastro (/login)
│   │   └── Sucesso.tsx             # Confirmação de pagamento (/sucesso) — protegida
│   └── stores/
│       ├── cartStore.ts            # Carrinho (persistido em localStorage)
│       └── authStore.ts            # Autenticação (user, session, signIn, signUp)
├── supabase/
│   └── migrations/
│       ├── 001_schema.sql           # Tabelas, índices, RLS, triggers
│       ├── 002_product_images_bucket.sql  # Bucket de storage
│       ├── 003_rentals_and_brands.sql     # Tabelas rentals + brands + seed
│       └── 004_fix_purchase_history.sql   # Corrige RLS do purchase_history
├── .env                            # Variáveis de ambiente (gitignored)
├── .env.example                    # Template das variáveis
├── vercel.json                     # Config de deploy (rewrites SPA + API)
├── package.json                    # Scripts e dependências
└── DOCS.md                         # Esta documentação
```

---

## Rotas

| Caminho | Página | Protegida | Descrição |
|---|---|---|---|
| `/` | Home | Não | Landing page com hero sections animadas |
| `/especificacoes` | Especificacoes | Não | Catálogo de produtos com grid |
| `/produto/:id` | ProdutoDetalhe | Não | Página individual de produto |
| `/comparar` | Comparar | Não | Comparação lado a lado (até 3 produtos) |
| `/comprar` | Comprar | **Sim** | Carrinho + checkout multi-etapas |
| `/login` | Login | Não | Login / cadastro de usuário |
| `/sucesso` | Sucesso | **Sim** | Confirmação pós-pagamento |

**Proteção de rota:** `ProtectedRoute` (src/components/auth/ProtectedRoute.tsx). Se não autenticado, redireciona para `/login?redirect=<rota-original>`. Se autenticação ainda carregando, mostra spinner.

---

## Fluxo de Autenticação

### Login
```
Usuário em /login → preenche e-mail + senha → "Entrar"
  → authStore.signIn(email, password)
    → supabase.auth.signInWithPassword()
    → Sucesso: user + session salvos no estado
    → Erro: mensagem traduzida (pt-BR) exibida na tela
  → Redireciona para ?redirect ou /
```

### Cadastro
```
Usuário em /login → alterna para "Criar conta" → preenche e-mail + senha
  → authStore.signUp(email, password, redirectTo)
    → supabase.auth.signUp({ emailRedirectTo: /login?redirect=... })
    → Se confirmação de e-mail ativada: tela "Verifique seu e-mail"
      → Reenvio disponível via resendConfirmation(email)
    → Se desativada: login automático, redireciona
    → Se e-mail já cadastrado: exibe alerta sugerindo login
```

### Persistência da sessão
```
App.tsx (useEffect na montagem):
  1. supabase.auth.getSession() → restaura sessão do cookie/token
  2. supabase.auth.onAuthStateChange() → listener em tempo real
  Ambos chamam authStore.setSession() que atualiza user + session + loading
```

### Tradução de erros
O `authStore` mapeia mensagens de erro do Supabase para português:
- `Invalid login credentials` → "E-mail ou senha inválidos."
- `User already registered` → "Este e-mail já está cadastrado."
- `Email not confirmed` → "E-mail ainda não foi confirmado."
- Erros de rede (fetch/network/timeout) → "Erro de conexão."

---

## Fluxo de Checkout

### 1. Carrinho (step='cart')
```
Comprar.tsx exibe itens do cartStore com:
  - Imagem, nome, specs, preço unitário
  - Controles +/- quantidade, botão remover
  - Sidebar: subtotal, frete (grátis >R$500, senão R$29,90), total
  - "Continuar" → step='info'
```

### 2. Dados do comprador (step='info')
```
Formulário: nome, e-mail, telefone
  - Pré-preenchido com dados do usuário Supabase (user_metadata.full_name, email)
  - Validação: nome preenchido, e-mail preenchido, telefone ≥10 caracteres
  - "Continuar para pagamento" → step='payment'
```

### 3. Pagamento (step='payment')
```
Opções:
  - PIX: 5% de desconto, aprovação instantânea
  - Cartão de Crédito: até 12x sem juros (seletor de parcelas)
  - Boleto: vencimento em 3 dias úteis

"Finalizar pedido" → handleFinish():
  → POST /api/create-checkout
    Headers: Authorization: Bearer <access_token>, Content-Type: application/json
    Body: { items, customerEmail, customerName, paymentMethod }
  → Se sucesso: window.location.href = data.url (redireciona para Stripe)
  → Se erro: alerta na tela
```

### 4. API: POST /api/create-checkout
```
Vercel Serverless Function (api/create-checkout.ts):
  1. Valida método POST
  2. Extrai token JWT do header Authorization
  3. Valida token via supabase.auth.getUser(token)
  4. Aplica 5% de desconto se paymentMethod === 'pix'
  5. Converte itens para line_items do Stripe (currency: brl)
  6. Cria Stripe Checkout Session (mode: payment, payment_method_types: [card])
  7. success_url: /sucesso?session_id={CHECKOUT_SESSION_ID}
  8. cancel_url: /comprar?cancelado=true
  9. Retorna { url: "https://checkout.stripe.com/..." }

Variáveis de ambiente necessárias no Vercel:
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
  - STRIPE_SECRET_KEY
```

### 5. Confirmação (step='done' + /sucesso)
```
Após pagamento no Stripe → redirecionado para /sucesso?session_id=...
  → Sucesso.tsx limpa o carrinho (cartStore.clear())
  → Exibe mensagem de confirmação
  → Links para continuar comprando ou ver catálogo
```

---

## Banco de Dados (Supabase)

### Tabelas

| Tabela | Descrição | RLS |
|---|---|---|
| `products` | Catálogo de peças/equipamentos | SELECT público |
| `services` | Serviços de manutenção/customização | SELECT público |
| `service_orders` | Kanban de ordens de serviço | SELECT/INSERT/UPDATE público |
| `purchase_history` | Histórico de compras dos usuários | SELECT/INSERT por user_id |
| `orders` | Pedidos do checkout | SELECT/INSERT por user_id |
| `rentals` | Equipamentos para locação | SELECT público |
| `brands` | Marcas parceiras | SELECT público |

### RLS (Row Level Security)

| Tabela | Política | Regra |
|---|---|---|
| `products` | Produtos visíveis publicamente | `true` |
| `services` | Serviços visíveis publicamente | `true` |
| `service_orders` | Admin pode ver/criar/atualizar | `true` |
| `purchase_history` | Usuário vê seu histórico | `auth.uid() = user_id` |
| `purchase_history` | Usuário insere seu histórico | `auth.uid() = user_id` |
| `orders` | Usuário vê seus pedidos | `auth.uid() = user_id` |
| `orders` | Usuário cria pedidos | `auth.uid() = user_id` |
| `rentals` | Equipamentos visíveis publicamente | `true` |
| `brands` | Marcas visíveis publicamente | `true` |

### Migrations (executar em ordem no SQL Editor do Supabase)
1. `001_schema.sql` — Tabelas principais + índices + RLS + triggers
2. `002_product_images_bucket.sql` — Bucket de storage para imagens
3. `003_rentals_and_brands.sql` — Tabelas rentals/brands + seed data
4. `004_fix_purchase_history.sql` — Corrige RLS com user_id

### Seed Data
`supabase/seed.sql` popula o banco com dados de exemplo: 14 switches, 8 keycaps, 4 lubrificantes, 5 placas, 4 estabilizadores, 4 cabos, 8 teclados, 6 mouses, 4 monitores, 5 áudio, 8 serviços, 8 ordens de serviço, 7 histórico de compras.

---

## Componentes

### Layout
| Componente | Descrição |
|---|---|
| `Navbar` | Barra fixa no topo: logo, links (Visão Geral, Catálogo, Comparar), menu do usuário (login/sair), ícone do carrinho com badge |
| `Footer` | Rodapé com 4 colunas: logo, produtos, navegação, suporte + copyright |
| `VortexRibbon` | Faixa animada com gradiente roxo deslizando texto "VORTEX" |
| `Layout` | Wrapper genérico (não utilizado atualmente) |

### Hero
| Componente | Descrição |
|---|---|
| `Hero` | Seção Apex Prime com vídeo scroll-driven (`ScrollVideo`) |
| `CoreSection` | Seção Core Ultra com vídeo em loop + IntersectionObserver |
| `Commercial` | Comercial Pulse Overdrive com vídeo auto-play |

### Produto
| Componente | Descrição |
|---|---|
| `ProductCard` | Card de produto (imagem + specs + preço + botão carrinho). Alterna lado esquerdo/direito |
| `ProductGrid` | Lista vertical de `ProductCard` |
| `ProductDetailModal` | Modal de visualização rápida do produto |

### UI
| Componente | Descrição |
|---|---|
| `Button` | Botão com 3 variantes: primary (roxo), secondary (vidro), ghost (transparente) |
| `GlassCard` | Card com efeito glass-morphism (backdrop-blur, borda sutil) |
| `HybridCartSidebar` | Sidebar de checkout alternativo (não utilizado) |

### Animação
| Componente | Descrição |
|---|---|
| `ScrollVideo` | Video scrub baseado em scroll (container 240vh, vídeo sticky, currentTime vinculado ao scroll) |
| `ScrollFrames` | Animação frame-a-frame baseada em scroll (interpola entre imagens pré-carregadas) |
| `LoopVideo` | Vídeo em loop renderizado em canvas para performance |

### Auth
| Componente | Descrição |
|---|---|
| `ProtectedRoute` | Guarda de rota — loading spinner → redirect /login se não autenticado → children se autenticado |

---

## Stores (Zustand)

### cartStore (`src/stores/cartStore.ts`)
```typescript
interface CartState {
  items: CartEntry[];         // { product: Product, quantity: number }
  add(product): void;         // Adiciona ou incrementa
  remove(id): void;           // Remove item
  increase(id): void;         // +1
  decrease(id): void;         // -1 (remove se <1)
  clear(): void;              // Esvazia carrinho
  totalItems(): number;       // Soma das quantidades
  totalPrice(): number;       // Soma de price × quantity
}
```
- **Persistência:** `localStorage` (chave `"vortex-cart"`) via middleware `zustand/persist`
- **Usado por:** Navbar, ProductCard, ProdutoDetalhe, Comprar, Sucesso

### authStore (`src/stores/authStore.ts`)
```typescript
interface AuthState {
  user: User | null;          // Usuário Supabase
  session: Session | null;    // Sessão Supabase
  loading: boolean;           // Carregando estado inicial
  error: string | null;       // Mensagem de erro (pt-BR)
  confirmationSent: boolean;  // E-mail de confirmação enviado
  setUser(user): void;
  setSession(session): void;
  signUp(email, password, redirectTo?): Promise<boolean>;
  signIn(email, password): Promise<void>;
  signOut(): Promise<void>;
  clearError(): void;
  clearConfirmation(): void;
  resendConfirmation(email): Promise<void>;
}
```
- **Usado por:** App.tsx, Navbar, Login, Comprar, ProtectedRoute

---

## Variáveis de Ambiente

| Variável | Escopo | Descrição |
|---|---|---|
| `VITE_SUPABASE_URL` | Frontend (Vite) | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Frontend (Vite) | Chave anônima/pública do Supabase |
| `SUPABASE_URL` | Backend (Vercel) | Mesma URL para API server-side |
| `SUPABASE_ANON_KEY` | Backend (Vercel) | Mesma chave para API server-side |
| `STRIPE_SECRET_KEY` | Backend (Vercel) | Chave secreta Stripe (modo teste) |
| `STRIPE_WEBHOOK_SECRET` | Backend (Vercel) | Chave de webhook Stripe (futuro) |

### Configuração no Vercel
As variáveis sem prefixo `VITE_` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `STRIPE_SECRET_KEY`) precisam estar configuradas no dashboard do Vercel em **Settings > Environment Variables** para o ambiente **Production**.

### Configuração no Supabase
No dashboard do Supabase (Authentication):
- **URL Configuration:**
  - Site URL: `https://office-x-jet.vercel.app`
  - Redirect URLs: `https://office-x-jet.vercel.app/**`
- **Email Auth:**
  - `Enable email confirmations`: desativado (recomendado para teste)
  - Se ativado, configurar provedor SMTP em Email > Settings

---

## Deploy

### Comandos
```bash
npm run dev          # Desenvolvimento local (localhost:5173)
npm run build        # Build de produção (dist/)
npm run typecheck    # Verificação de tipos (tsc --noEmit)
npm run lint         # Lint (eslint .)
npm run preview      # Preview local da build
```

### Vercel
- **Config:** `vercel.json` com rewrites: `/api/*` → serverless function, demais rotas → SPA fallback
- **Deploy automático:** push na branch `main` dispara deploy
- **Deploy manual:** `vercel --prod`
- **URL produção:** `https://office-x-jet.vercel.app`

### Supabase
- **Projeto:** `uhshyjkwvpjpvigazyyq`
- **CLI:** `supabase login` → `supabase link --project-ref uhshyjkwvpjpvigazyyq`
- **Migrations:** executar arquivos `.sql` em ordem no SQL Editor
- **Seed:** executar `supabase/seed.sql` após as migrations

---

## Catálogo de Produtos (Frontend)

6 produtos definidos em `src/data/headset-catalog.ts`:

| Produto | Preço | Categoria |
|---|---|---|
| VORTEX CORE PRO | R$99 | Audio |
| VORTEX CORE ULTRA | R$199 | Audio |
| VORTEX APEX PRIME | R$399 | Audio |
| VORTEX PULSE WRAITH | R$599 | Audio |
| VORTEX PULSE OVERDRIVE | R$799 | Audio |
| VORTEX LAB SHIELD | R$899 | Audio |

Interface `Product`:
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  specs: string;
  image: string;
  imageAlt: string;
}
```

---

## Configuração do Stripe

### Modo Teste
- Cartão de teste: `4242 4242 4242 4242`
- Data futura qualquer, CVC qualquer
- PIX: escolher "PIX" no checkout → aparece QR code falso

### Webhook (opcional)
Para processar eventos pós-pagamento (confirmação, estorno), configurar webhook no Stripe Dashboard apontando para `https://office-x-jet.vercel.app/api/webhook` e adicionar `STRIPE_WEBHOOK_SECRET` às env vars do Vercel.

---

## Troubleshooting

### Login não funciona
1. Verificar se `VITE_SUPABASE_URL` está correto (projeto `uhshyjkwvpjpvigazyyq`)
2. Verificar se Email Confirmations está desativado ou e-mail chegou
3. Verificar console do navegador para erros de rede

### Checkout retorna erro
1. `STRIPE_SECRET_KEY` configurada no Vercel (sem caracteres invisíveis)
2. `SUPABASE_URL` e `SUPABASE_ANON_KEY` configuradas no Vercel
3. Token de autenticação válido (usuário logado)

### Erro 500 no checkout
- Verificar logs do Vercel: `vercel logs`
- Causa comum: `req.headers.origin` undefined — código já trata com fallback para `req.headers.host`

### Sessão não persiste
- App.tsx chama `getSession()` na montagem com `.catch()` para erros de rede
- `onAuthStateChange` mantém estado sincronizado
- Verificar se cookies de terceiros não estão bloqueados
