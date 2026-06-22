/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home').then((m) => ({ default: m.Home })));
const Loja = lazy(() => import('../pages/Loja').then((m) => ({ default: m.Loja })));
const ProdutoDetalhe = lazy(() => import('../pages/ProdutoDetalhe').then((m) => ({ default: m.ProdutoDetalhe })));
const Servicos = lazy(() => import('../pages/Servicos').then((m) => ({ default: m.Servicos })));
const Locacao = lazy(() => import('../pages/Locacao').then((m) => ({ default: m.Locacao })));
const Marcas = lazy(() => import('../pages/Marcas').then((m) => ({ default: m.Marcas })));
const Carrinho = lazy(() => import('../pages/Carrinho').then((m) => ({ default: m.Carrinho })));
const Login = lazy(() => import('../pages/Login').then((m) => ({ default: m.Login })));
const Cadastro = lazy(() => import('../pages/Cadastro').then((m) => ({ default: m.Cadastro })));
const Painel = lazy(() => import('../pages/Painel').then((m) => ({ default: m.Painel })));
const Pagamento = lazy(() => import('../pages/Pagamento').then((m) => ({ default: m.Pagamento })));
const Admin = lazy(() => import('../pages/Admin').then((m) => ({ default: m.Admin })));
const Privacidade = lazy(() => import('../pages/Privacidade').then((m) => ({ default: m.Privacidade })));
const Termos = lazy(() => import('../pages/Termos').then((m) => ({ default: m.Termos })));

export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/loja', element: <Loja /> },
  { path: '/loja/:id', element: <ProdutoDetalhe /> },
  { path: '/servicos', element: <Servicos /> },
  { path: '/locacao', element: <Locacao /> },
  { path: '/marcas', element: <Marcas /> },
  { path: '/carrinho', element: <Carrinho /> },
  { path: '/login', element: <Login /> },
  { path: '/cadastro', element: <Cadastro /> },
  { path: '/meu-painel', element: <Painel /> },
  { path: '/pagamento', element: <Pagamento /> },
  { path: '/admin', element: <Admin /> },
  { path: '/privacidade', element: <Privacidade /> },
  { path: '/termos', element: <Termos /> },
];
