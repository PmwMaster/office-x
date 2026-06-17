import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LojaDePecas } from './pages/LojaDePecas';
import { MeuPainel } from './pages/MeuPainel';
import { PagamentoSeguro } from './pages/PagamentoSeguro';
import { Servicos } from './pages/Servicos';
import { AdminKanban } from './pages/AdminKanban';
import { Carrinho } from './pages/Carrinho';
import { LocacaoEquipamentos } from './pages/LocacaoEquipamentos';
import { Marcas } from './pages/Marcas';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
