import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Home } from './pages/Home';
import { Especificacoes } from './pages/Especificacoes';
import { Comprar } from './pages/Comprar';
import { Comparar } from './pages/Comparar';
import { Login } from './pages/Login';
import { Sucesso } from './pages/Sucesso';
import { ProdutoDetalhe } from './pages/ProdutoDetalhe';
import { useAuthStore } from './stores/authStore';
import { supabase } from './lib/supabase';

export default function App() {
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    }).catch((err) => {
      console.error('Failed to restore session:', err);
      setSession(null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/especificacoes" element={<Especificacoes />} />
        <Route path="/comparar" element={<Comparar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sucesso" element={<ProtectedRoute><Sucesso /></ProtectedRoute>} />
        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
        <Route path="/comprar" element={<ProtectedRoute><Comprar /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
