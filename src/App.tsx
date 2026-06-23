import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Especificacoes } from './pages/Especificacoes';
import { Comprar } from './pages/Comprar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/especificacoes" element={<Especificacoes />} />
        <Route path="/comprar" element={<Comprar />} />
      </Routes>
    </BrowserRouter>
  );
}
