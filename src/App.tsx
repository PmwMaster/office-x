import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Especificacoes } from './pages/Especificacoes';
import { Comprar } from './pages/Comprar';
import { ProdutoDetalhe } from './pages/ProdutoDetalhe';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/especificacoes" element={<Especificacoes />} />
        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
        <Route path="/comprar" element={<Comprar />} />
      </Routes>
    </BrowserRouter>
  );
}
