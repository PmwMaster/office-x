import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { isSupabaseReady } from './lib/supabase';

const LojaDePecas = lazy(() => import('./pages/LojaDePecas').then(m => ({ default: m.LojaDePecas })));
const MeuPainel = lazy(() => import('./pages/MeuPainel').then(m => ({ default: m.MeuPainel })));
const PagamentoSeguro = lazy(() => import('./pages/PagamentoSeguro').then(m => ({ default: m.PagamentoSeguro })));
const Servicos = lazy(() => import('./pages/Servicos').then(m => ({ default: m.Servicos })));
const AdminKanban = lazy(() => import('./pages/AdminKanban').then(m => ({ default: m.AdminKanban })));
const Carrinho = lazy(() => import('./pages/Carrinho').then(m => ({ default: m.Carrinho })));
const LocacaoEquipamentos = lazy(() => import('./pages/LocacaoEquipamentos').then(m => ({ default: m.LocacaoEquipamentos })));
const Marcas = lazy(() => import('./pages/Marcas').then(m => ({ default: m.Marcas })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Cadastro = lazy(() => import('./pages/Cadastro').then(m => ({ default: m.Cadastro })));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-primary-fixed border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    if (isSupabaseReady()) init();
    else useAuthStore.setState({ loading: false });
  }, [init]);

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
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/meu-painel" element={
            <ProtectedRoute><MeuPainel /></ProtectedRoute>
          } />
          <Route path="/pagamento" element={
            <ProtectedRoute><PagamentoSeguro /></ProtectedRoute>
          } />
          <Route path="/admin" element={<AdminKanban />} />
          <Route path="*" element={<Navigate to="/loja" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
