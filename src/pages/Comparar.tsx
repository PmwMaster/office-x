import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { CATALOG } from '../data/headset-catalog';
import { Footer } from '../components/layout/Footer';
import type { Product } from '../data/products';

const SPECS: Record<string, { label: string; value: string }[]> = {
  'vortex-core-pro': [
    { label: 'Tipo', value: 'Over-Ear Aberto (Open-Back)' },
    { label: 'Driver', value: 'Planar Magnético 50mm' },
    { label: 'Resposta de Frequência', value: '4Hz – 51kHz' },
    { label: 'Impedância', value: '25Ω' },
    { label: 'Sensibilidade', value: '102dB/mW @ 1kHz' },
    { label: 'THD', value: '< 0.01% @ 1kHz' },
    { label: 'Peso', value: '340g (sem cabo)' },
    { label: 'Conexão', value: 'Cabo Balanceado 4.4mm + XLR incluso' },
    { label: 'Comprimento do Cabo', value: '1.5m (4.4mm) + 3m (XLR)' },
    { label: 'Almofadas', value: 'Veludo Memory-Foam destacáveis' },
    { label: 'Arco', value: 'Fibra de Carbono com ajuste milimétrico' },
    { label: 'Microfone', value: 'Não incluso' },
    { label: 'ANC', value: '— (Open-Back, isolamento natural)' },
    { label: 'Bateria', value: 'Com fio (não aplicável)' },
    { label: 'Carregamento', value: '—' },
    { label: 'Codec / Áudio', value: 'Analógico puro (sem DSP)' },
    { label: 'Resistência', value: 'Uso interno (não resistente à água)' },
    { label: 'Garantia', value: 'Vitalícia VORTEX' },
  ],
  'vortex-core-ultra': [
    { label: 'Tipo', value: 'In-Ear TWS (True Wireless)' },
    { label: 'Driver', value: 'Dual-Driver Coaxial 11mm + 6mm' },
    { label: 'Resposta de Frequência', value: '10Hz – 25kHz' },
    { label: 'Impedância', value: '16Ω' },
    { label: 'Sensibilidade', value: '98dB/mW @ 1kHz' },
    { label: 'THD', value: '< 0.5% @ 1kHz' },
    { label: 'Peso', value: '5.6g (por fone) · 52g (estojo)' },
    { label: 'ANC', value: 'Híbrido Adaptativo até 45dB' },
    { label: 'Modo Ambiente', value: 'Transparência com 3 níveis' },
    { label: 'Microfone', value: 'Triplo MEMS com ENC (beamforming)' },
    { label: 'Conexão', value: 'Bluetooth 5.4 + Multiponto (2 dispositivos)' },
    { label: 'Latência', value: '20ms (Modo Gamer Ultra-Low)' },
    { label: 'Codec', value: 'Vortex-Sync · AAC · SBC · LC3' },
    { label: 'Bateria (Fones)', value: '10h (ANC off) / 7h (ANC on)' },
    { label: 'Bateria (Estojo)', value: '30h extras · Total 40h' },
    { label: 'Carregamento', value: 'USB-C (Fast Charge: 10min = 2h) + Qi' },
    { label: 'Resistência', value: 'IPX4 (respingos e suor leve)' },
    { label: 'Estojo', value: 'Alumínio escovado com LED de bateria' },
    { label: 'Garantia', value: 'Vitalícia VORTEX' },
  ],
  'vortex-apex-prime': [
    { label: 'Tipo', value: 'Over-Ear Fechado (Closed-Back)' },
    { label: 'Driver', value: 'Neodímio Dinâmico 50mm' },
    { label: 'Resposta de Frequência', value: '20Hz – 20kHz' },
    { label: 'Impedância', value: '32Ω' },
    { label: 'Sensibilidade', value: '100dB/mW @ 1kHz' },
    { label: 'THD', value: '< 0.1% @ 1kHz' },
    { label: 'Peso', value: '320g' },
    { label: 'Áudio Espacial', value: 'Vortex 360° Spatial Audio (3D nativo)' },
    { label: 'Microfone', value: 'Condensador 9.7mm Cardioide Destacável' },
    { label: 'Pop Filter', value: 'Integrado ao microfone' },
    { label: 'ANC', value: 'Não (isolamento passivo)' },
    { label: 'Conexão', value: 'Tri-Mode: 2.4GHz + Bluetooth 5.4 + 3.5mm' },
    { label: 'Latência', value: '35ms (2.4GHz) / 180ms (Bluetooth)' },
    { label: 'Codec', value: 'LC3 · AAC · SBC' },
    { label: 'Bateria (RGB off)', value: '50 horas' },
    { label: 'Bateria (RGB on)', value: '35 horas' },
    { label: 'Carregamento', value: 'USB-C (carga completa em 2h)' },
    { label: 'Almofadas', value: 'Espuma de Memória com Couro Premium Respirável' },
    { label: 'Arco', value: 'Alumínio Aeroespacial Anodizado' },
    { label: 'Resistência', value: 'Uso interno (não resistente à água)' },
    { label: 'Garantia', value: 'Vitalícia VORTEX' },
  ],
  'vortex-pulse-wraith': [
    { label: 'Tipo', value: 'In-Ear Esportivo com Gancho' },
    { label: 'Driver', value: 'Dinâmico 10mm PowerBass v2' },
    { label: 'Resposta de Frequência', value: '20Hz – 20kHz' },
    { label: 'Impedância', value: '16Ω' },
    { label: 'Sensibilidade', value: '95dB/mW @ 1kHz' },
    { label: 'THD', value: '< 1% @ 1kHz' },
    { label: 'Peso', value: '5.2g (por fone) · 68g (estojo)' },
    { label: 'Microfone', value: 'Duplo MEMS com ENC para chamadas' },
    { label: 'ANC', value: 'Não (foco em awareness esportivo)' },
    { label: 'Conexão', value: 'Bluetooth 5.4' },
    { label: 'Latência', value: '60ms (Modo Padrão)' },
    { label: 'Codec', value: 'AAC · SBC' },
    { label: 'Bateria (Fones)', value: '12 horas contínuas' },
    { label: 'Bateria (Estojo)', value: '36h extras · Total 48h' },
    { label: 'Carregamento', value: 'USB-C (carga completa em 1.5h)' },
    { label: 'Resistência', value: 'IPX7 à Prova d\'Água (imersão 1m/30min)' },
    { label: 'Fixação', value: 'Flex-Fit Silicone Cirúrgico Hipoalergênico' },
    { label: 'Estojo', value: 'Emborrachado de Alta Resistência' },
    { label: 'Garantia', value: 'Vitalícia VORTEX' },
  ],
  'vortex-pulse-overdrive': [
    { label: 'Tipo', value: 'In-Ear Esportivo' },
    { label: 'Driver', value: 'Dinâmico 10mm PowerBass' },
    { label: 'Resposta de Frequência', value: '20Hz – 20kHz' },
    { label: 'Impedância', value: '16Ω' },
    { label: 'Sensibilidade', value: '93dB/mW @ 1kHz' },
    { label: 'THD', value: '< 1.5% @ 1kHz' },
    { label: 'Peso', value: '4.8g (por fone) · 55g (estojo)' },
    { label: 'Microfone', value: 'Duplo MEMS com redução de ruído' },
    { label: 'ANC', value: 'Não' },
    { label: 'Conexão', value: 'Bluetooth 5.3' },
    { label: 'Latência', value: '80ms (Modo Padrão)' },
    { label: 'Codec', value: 'AAC · SBC' },
    { label: 'Bateria (Fones)', value: '9 horas contínuas' },
    { label: 'Bateria (Estojo)', value: '27h extras · Total 36h' },
    { label: 'Carregamento', value: 'USB-C (Fast Charge: 10min = 1h)' },
    { label: 'Resistência', value: 'IPX6 (jatos d\'água, suor intenso)' },
    { label: 'Fixação', value: 'Pontas de Silicone em 4 tamanhos (P/M/G/GG)' },
    { label: 'Estojo', value: 'Compacto com fecho magnético' },
    { label: 'Garantia', value: 'Vitalícia VORTEX' },
  ],
  'vortex-lab-shield': [
    { label: 'Tipo', value: 'Case de Proteção Tática' },
    { label: 'Material', value: 'Policarbonato de Alto Impacto + Fibra de Carbono Real' },
    { label: 'Acabamento', value: 'Fosco com Tratamento Antiestático' },
    { label: 'Proteção', value: 'Drop-Shield Grau Militar (MIL-STD-810G)' },
    { label: 'Altura de Queda', value: 'Testado até 2.0m em concreto' },
    { label: 'Peso', value: '42g (Carbon) / 48g (Tática com mosquetão)' },
    { label: 'Dimensões (Core Pro)', value: '75 × 55 × 30mm' },
    { label: 'Dimensões (Core Ultra)', value: '65 × 45 × 28mm' },
    { label: 'Compatibilidade', value: 'Core Pro / Core Ultra (escolher modelo)' },
    { label: 'Recortes', value: 'LED Frontal · USB-C · Alto-falante · Qi' },
    { label: 'Carregamento', value: 'Compatível com indução Qi (sem remover)' },
    { label: 'Acessório Incluso', value: 'Mosquetão Tático Alumínio Preto Fosco (Tática)' },
    { label: 'Cores', value: 'Carbon (Fibra de Carbono) / Tática (com Mosquetão)' },
    { label: 'Garantia', value: 'Vitalícia VORTEX' },
  ],
};

const SPEC_SECTIONS: { title: string; keys: string[] }[] = [
  {
    title: 'Áudio',
    keys: ['Tipo', 'Driver', 'Resposta de Frequência', 'Impedância', 'Sensibilidade', 'THD', 'Áudio Espacial', 'Codec', 'Codec / Áudio', 'ANC', 'Modo Ambiente'],
  },
  {
    title: 'Conectividade',
    keys: ['Conexão', 'Latência', 'Comprimento do Cabo', 'Carregamento'],
  },
  {
    title: 'Bateria',
    keys: ['Bateria (Fones)', 'Bateria (Estojo)', 'Bateria (Total)', 'Bateria (RGB off)', 'Bateria (RGB on)', 'Bateria'],
  },
  {
    title: 'Construção',
    keys: ['Peso', 'Dimensões (Core Pro)', 'Dimensões (Core Ultra)', 'Material', 'Acabamento', 'Almofadas', 'Arco', 'Fixação', 'Resistência', 'Cores', 'Estojo'],
  },
  {
    title: 'Experiência',
    keys: ['Microfone', 'Pop Filter', 'Proteção', 'Altura de Queda', 'Recortes', 'Compatibilidade', 'Tratamento', 'Acessório Incluso'],
  },
  {
    title: 'Garantia',
    keys: ['Garantia'],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  'vortex-core-pro': 'OVER-EAR · LAB',
  'vortex-core-ultra': 'OVER-EAR · LAB',
  'vortex-apex-prime': 'OVER-EAR · APEX',
  'vortex-pulse-wraith': 'SPORT · PULSE',
  'vortex-pulse-overdrive': 'SPORT · PULSE',
  'vortex-lab-shield': 'ACESSÓRIO · LAB',
};

const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function Comparar() {
  const [selected, setSelected] = useState<Product[]>([]);

  const toggle = (p: Product) => {
    setSelected((prev) =>
      prev.some((s) => s.id === p.id) ? prev.filter((s) => s.id !== p.id) : [...prev, p].slice(0, 3)
    );
  };

  const getSpec = (p: Product, key: string) => (SPECS[p.id] ?? []).find((s) => s.label === key)?.value ?? '—';

  return (
    <div className="min-h-screen bg-black text-text pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/especificacoes" className="inline-flex items-center gap-2 text-[13px] text-text-secondary hover:text-text transition-colors mb-8">
          <ArrowLeft size={14} /> Voltar ao Catálogo
        </Link>

        <div className="mb-12 space-y-3">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/70 font-mono">Ficha Técnica</p>
          <h1 className="text-[40px] font-bold tracking-[-0.02em] text-text leading-tight">
            Comparar
            <br />
            <span className="text-text-secondary">produtos</span>
          </h1>
          <p className="text-[15px] text-text-secondary max-w-lg">
            Selecione até 3 produtos para comparar as especificações lado a lado.
          </p>
        </div>

        {/* Product selector */}
        <div className="mb-12 flex flex-wrap gap-2">
          {CATALOG.map((p) => {
            const active = selected.some((s) => s.id === p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggle(p)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border ${
                  active
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-white/[0.03] border-white/[0.06] text-text-secondary hover:border-white/[0.12] hover:text-text'
                }`}
              >
                {p.name}
                {active && <span className="ml-1.5 text-[11px] opacity-60">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Comparison table */}
        {selected.length > 0 ? (
          <div className="rounded-3xl border border-white/[0.06] bg-[#060606] overflow-hidden">
            {/* Column headers */}
            <div className="grid border-b border-white/[0.06]" style={{ gridTemplateColumns: `220px repeat(${selected.length}, 1fr)` }}>
              <div className="p-4" />
              {selected.map((p) => (
                <div key={p.id} className="p-6 text-center border-l border-white/[0.06] space-y-4 relative">
                  <button
                    onClick={() => toggle(p)}
                    className="absolute right-3 top-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    title="Remover"
                  >
                    <X size={10} className="text-text-secondary" />
                  </button>
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#0a0a0a] to-black rounded-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="w-full h-full object-contain p-3"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-primary/70 uppercase tracking-[0.2em] mb-1">
                      {CATEGORY_LABELS[p.id] ?? ''}
                    </p>
                    <h3 className="text-[16px] font-bold text-white">{p.name}</h3>
                    <p className="text-[12px] text-text-tertiary font-mono mt-1 line-clamp-2">{p.specs}</p>
                  </div>
                  <div>
                    <span className="text-[22px] font-bold text-white">{fmt(p.price)}</span>
                    <span className="text-[11px] text-text-tertiary block">em até 12x</span>
                  </div>
                  <Link
                    to={`/produto/${p.id}`}
                    className="inline-flex items-center rounded-full text-[13px] font-medium px-5 py-2 bg-white text-black hover:bg-white/90 transition-all duration-300"
                  >
                    Ver detalhes
                  </Link>
                </div>
              ))}
            </div>

            {/* Spec sections */}
            {SPEC_SECTIONS.map((section) => {
              const relevantKeys = section.keys.filter((key) =>
                selected.some((p) => getSpec(p, key) !== '—')
              );
              if (relevantKeys.length === 0) return null;

              return (
                <div key={section.title}>
                  <div className="grid bg-white/[0.02] border-b border-white/[0.06]" style={{ gridTemplateColumns: `220px repeat(${selected.length}, 1fr)` }}>
                    <div className="p-4">
                      <span className="text-[11px] font-mono text-primary/70 uppercase tracking-[0.15em] font-semibold">{section.title}</span>
                    </div>
                    {selected.map((p) => (
                      <div key={p.id} className="p-4 border-l border-white/[0.06]" />
                    ))}
                  </div>
                  {relevantKeys.map((key, i) => (
                    <div
                      key={key}
                      className={`grid border-b border-white/[0.03] last:border-b-0 transition-colors hover:bg-white/[0.01] ${
                        i === relevantKeys.length - 1 ? 'border-white/[0.08]' : ''
                      }`}
                      style={{ gridTemplateColumns: `220px repeat(${selected.length}, 1fr)` }}
                    >
                      <div className="p-4 flex items-center">
                        <span className="text-[13px] text-text-secondary">{key}</span>
                      </div>
                      {selected.map((p, j) => (
                        <div key={p.id} className="p-4 flex items-center border-l border-white/[0.06]">
                          <span className={`text-[13px] font-mono ${getSpec(p, key) === '—' ? 'text-text-tertiary/40' : 'text-text'}`}>
                            {getSpec(p, key)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 rounded-3xl border border-white/[0.06] bg-[#060606]">
            <p className="text-[17px] text-text-secondary">Selecione produtos acima para comparar.</p>
            <p className="text-[13px] text-text-tertiary mt-2 font-mono">Escolha até 3 itens</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
