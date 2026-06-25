import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Star } from 'lucide-react';
import { Button, GlassCard } from '../components/ui';
import { useCartStore } from '../stores/cartStore';
import { CATALOG } from '../data/headset-catalog';
import { Footer } from '../components/layout/Footer';

const PRODUCT_DETAILS: Record<string, {
  variants: { label: string; color: string; gallery: string[] }[];
  specsImg: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
}> = {
  'vortex-core-pro': {
    variants: [
      { label: 'Carbono', color: '#1a1a1a', gallery: ['/vortex-core-pro-1.png', '/vortex-core-pro-2.png'] },
      { label: 'Branco', color: '#e5e5e5', gallery: ['/vortex-core-pro-2-b.png', '/vortex-core-pro-1-b.png'] },
    ],
    specsImg: '/vortex-core-pro-especif.png',
    description: 'O VORTEX CORE PRO representa o ápice da engenharia acústica da VORTEX Audio Labs. Drivers de precisão milimétrica, design minimalista em preto absoluto e performance sonora incomparável fazem deste fone a escolha definitiva para audiófilos e profissionais que exigem o melhor.',
    highlights: [
      'Drivers de alta precisão com resposta plana',
      'Design ergonômico em fibra de carbono',
      'Cabos balanceados 4.4mm + XLR inclusos',
      'Almofadas em veludo memory-foam',
      'Garantia Vitalícia VORTEX',
    ],
    specs: [
      { label: 'Driver', value: '50mm Planar Magnético' },
      { label: 'Resposta de Frequência', value: '4Hz – 51kHz' },
      { label: 'Impedância', value: '25Ω' },
      { label: 'Sensibilidade', value: '102dB/mW' },
      { label: 'THD', value: '< 0.01%' },
      { label: 'Peso', value: '340g' },
      { label: 'Cabo', value: '1.5m + 3m (4.4mm / XLR)' },
      { label: 'Conexão', value: 'Balanceada + Single-ended' },
    ],
  },
  'vortex-core-ultra': {
    variants: [
      { label: 'Carbono', color: '#1a1a1a', gallery: ['/vortex-core-ultra-1.png', '/vortex-core-ultra-2.png'] },
      { label: 'Branco', color: '#e5e5e5', gallery: ['/vortex-core-ultra-1-b.png', '/vortex-core-ultra-2.png'] },
    ],
    specsImg: '/vortex-core-ultra-especif.png',
    description: 'O ápice do áudio portátil. O VORTEX CORE ULTRA combina cancelamento de ruído híbrido avançado, latência zero e engenharia acústica de ponta em um design que desaparece nos seus ouvidos e se destaca no seu setup.',
    highlights: [
      'ANC Híbrido Avançado de até 45dB com Modo Ambiente Adaptativo',
      'Modo Gamer com Ultra-Low Latency de 20ms',
      'Fast Charge USB-C (10min = 2h) + Carregamento Sem Fio Qi',
      'LED Dinâmico customizável via app Vortex',
      'Garantia Vitalícia VORTEX',
    ],
    specs: [
      { label: 'Driver', value: 'Dual-Driver Coaxial (11mm + 6mm)' },
      { label: 'ANC', value: 'Híbrido até 45dB' },
      { label: 'Latência', value: '20ms (Modo Gamer)' },
      { label: 'Conectividade', value: 'Bluetooth 5.4 + Multiponto' },
      { label: 'Bateria (Fones)', value: '10h (ANC off) / 7h (ANC on)' },
      { label: 'Bateria (Total)', value: '40h com estojo' },
      { label: 'Carregamento', value: 'USB-C Fast Charge + Qi' },
      { label: 'Codec', value: 'Vortex-Sync proprietário' },
    ],
  },
};

const REVIEWS = [
  { name: 'Lucas M.', rating: 5, date: '12 jun 2026', text: 'O VORTEX CORE PRO superou todas as minhas expectativas. A qualidade de construção é impecável e o som é cristalino. Melhor investimento em áudio que já fiz.', verified: true },
  { name: 'Ana R.', rating: 5, date: '08 jun 2026', text: 'Comprei para o meu estúdio e a diferença é absurda. Os drivers planares entregam uma precisão que eu nunca tinha ouvido antes.', verified: true },
  { name: 'Pedro S.', rating: 4, date: '03 jun 2026', text: 'Som excelente e design minimalista lindo. A garantia vitalícia passa muita confiança. Recomendo para qualquer audiófilo.', verified: true },
  { name: 'Marina C.', rating: 5, date: '28 mai 2026', text: 'Uso diariamente há 2 meses e continuam como novos. O conforto é surreal, consigo usar por horas sem cansar. Áudio espacial impressionante.', verified: false },
  { name: 'Rafael T.', rating: 5, date: '20 mai 2026', text: 'Vim de um headphone gamer e a diferença é de outro planeta. Cada detalhe da mixagem aparece. Atendimento da VORTEX foi nota 10.', verified: true },
  { name: 'Carla D.', rating: 4, date: '15 mai 2026', text: 'Produto premium em todos os sentidos. A embalagem já impressiona. Som equilibrado e natural, nada artificial.', verified: true },
  { name: 'Gabriel F.', rating: 5, date: '18 jun 2026', text: 'O ANC do CORE ULTRA é insano. Uso no metrô e simplesmente não escuto nada além da música. O modo ambiente é perfeito pra correr na rua.', verified: true },
  { name: 'Tatiane L.', rating: 5, date: '14 jun 2026', text: 'Troquei meu AirPods Pro por esse e não me arrependo. A qualidade do som é anos-luz à frente. Os graves são profundos sem distorcer.', verified: true },
  { name: 'Henrique A.', rating: 4, date: '10 jun 2026', text: 'O LED customizável é um diferencial absurdo. Mudo a cor pelo app conforme o humor. Bateria dura a semana inteira com uso moderado.', verified: true },
  { name: 'Bianca S.', rating: 5, date: '05 jun 2026', text: 'Comprei o Branco e é lindo demais. O fast charge salva demais — esqueci de carregar, coloquei 10min e usei o dia todo.', verified: false },
];

const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function ProdutoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const product = CATALOG.find((p) => p.id === id);
  const detail = id ? PRODUCT_DETAILS[id] : null;
  const { items, add, increase, decrease } = useCartStore();
  const [mainImg, setMainImg] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product || !detail) {
    return (
      <div className="min-h-screen bg-black text-text pt-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-text-tertiary">Produto não encontrado.</p>
          <Link to="/especificacoes" className="text-primary hover:text-primary/70 transition-colors text-sm">← Voltar ao Catálogo</Link>
        </div>
      </div>
    );
  }

  const inCart = items.find((i) => i.product.id === product.id);
  const currentVariant = detail.variants[variantIndex];

  return (
    <div className="min-h-screen bg-black text-text pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/especificacoes" className="inline-flex items-center gap-2 text-[13px] text-text-secondary hover:text-text transition-colors mb-8">
          <ArrowLeft size={14} /> Voltar ao Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface to-black border border-border aspect-square">
              <img
                src={currentVariant.gallery[mainImg]}
                alt={`${product.name} - Imagem ${mainImg + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {currentVariant.gallery.length > 1 && (
              <div className="flex gap-3">
                {currentVariant.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImg(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === mainImg ? 'border-primary' : 'border-border hover:border-border-hover'
                    }`}
                  >
                    <img src={img} alt="" className="absolute inset-0 w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-mono text-primary/80 uppercase tracking-[0.2em] mb-2">VORTEX Audio Labs</p>
              <h1 className="text-[clamp(28px,4vw,40px)] font-bold text-white leading-tight">{product.name}</h1>
              <p className="text-[15px] text-text-secondary mt-3 leading-relaxed">{detail.description}</p>
            </div>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-[32px] font-bold text-white tracking-tight">{fmt(product.price)}</span>
              <span className="text-[13px] text-text-tertiary">em até 12x</span>
            </div>

            {detail.variants.length > 1 && (
              <div className="space-y-2">
                <p className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider">
                  Cor: <span className="text-white font-normal">{currentVariant.label}</span>
                </p>
                <div className="flex gap-3">
                  {detail.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => { setVariantIndex(i); setMainImg(0); }}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                        i === variantIndex ? 'border-primary scale-110' : 'border-border hover:border-border-hover'
                      }`}
                      title={v.label}
                    >
                      <span
                        className="absolute inset-1 rounded-full"
                        style={{ background: v.color }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Destaques</p>
              <ul className="space-y-2">
                {detail.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[14px] text-text-secondary">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              {inCart ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => decrease(product.id)} className="w-10 h-10 rounded-full bg-white/5 text-text-secondary hover:bg-white/10 text-lg transition-colors">−</button>
                  <span className="text-[16px] font-semibold font-mono text-white w-6 text-center">{inCart.quantity}</span>
                  <button onClick={() => increase(product.id)} className="w-10 h-10 rounded-full bg-white/5 text-text-secondary hover:bg-white/10 text-lg transition-colors">+</button>
                </div>
              ) : (
                <button
                  onClick={() => { add(product); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
                  className={`inline-flex items-center gap-2 rounded-full text-[15px] font-medium px-8 py-3.5 transition-all duration-300 active:scale-[0.97] ${
                    added ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-primary-dim'
                  }`}
                >
                  {added ? <Check size={18} /> : <ShoppingCart size={18} />}
                  {added ? 'Adicionado!' : 'Adicionar ao Carrinho'}
                </button>
              )}
              <Link to="/comprar" className="inline-flex items-center rounded-full text-[15px] font-medium px-8 py-3.5 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 active:scale-[0.97] backdrop-blur-md">
                Comprar
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-8">
          <div className="space-y-1">
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/70 font-mono">Especificações Técnicas</p>
            <h2 className="text-[28px] font-bold text-white">Ficha Técnica</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detail.specs.map((s) => (
              <GlassCard key={s.label} className="p-5 flex justify-between items-center">
                <span className="text-[13px] text-text-secondary">{s.label}</span>
                <span className="text-[14px] font-semibold text-white font-mono">{s.value}</span>
              </GlassCard>
            ))}
          </div>

          <div className="rounded-3xl overflow-hidden bg-surface border border-border">
            <img src={detail.specsImg} alt="Especificações técnicas" className="w-full h-auto block" />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 space-y-8">
          <div className="space-y-1">
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/70 font-mono">Avaliações</p>
            <h2 className="text-[28px] font-bold text-white">O que dizem nossos clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((r) => (
              <GlassCard key={r.name + r.date} className="p-5 space-y-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? 'text-primary fill-primary' : 'text-text-tertiary'} />
                  ))}
                </div>
                <p className="text-[13px] text-text-secondary leading-relaxed">"{r.text}"</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-[12px] font-semibold text-text">{r.name}</p>
                    <p className="text-[10px] text-text-tertiary font-mono">{r.date}</p>
                  </div>
                  {r.verified && (
                    <span className="text-[9px] font-mono text-primary/70 uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">Verificado</span>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
