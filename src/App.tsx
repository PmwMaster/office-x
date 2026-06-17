import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const LojaDePecas = lazy(() => import('./pages/LojaDePecas').then(m => ({ default: m.LojaDePecas })));
const MeuPainel = lazy(() => import('./pages/MeuPainel').then(m => ({ default: m.MeuPainel })));
const PagamentoSeguro = lazy(() => import('./pages/PagamentoSeguro').then(m => ({ default: m.PagamentoSeguro })));
const Servicos = lazy(() => import('./pages/Servicos').then(m => ({ default: m.Servicos })));
const AdminKanban = lazy(() => import('./pages/AdminKanban').then(m => ({ default: m.AdminKanban })));
const Carrinho = lazy(() => import('./pages/Carrinho').then(m => ({ default: m.Carrinho })));
const LocacaoEquipamentos = lazy(() => import('./pages/LocacaoEquipamentos').then(m => ({ default: m.LocacaoEquipamentos })));
const Marcas = lazy(() => import('./pages/Marcas').then(m => ({ default: m.Marcas })));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-primary-fixed border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/loja" replace />} />
          <Route path="/loja" element={<LojaDePecas />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/equipamentos" element={<LocacaoEquipamentos />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/meu-painel" element={<MeuPainel />} />
          <Route path="/pagamento" element={<PagamentoSeguro />} />
          <Route path="/admin" element={<AdminKanban />} />
          <Route path="*" element={<Navigate to="/loja" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
