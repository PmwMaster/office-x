import { X } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import type { Product } from '../../data/products';

const DETAIL_IMAGES: Record<string, { gallery: string[]; specs: string }> = {
  'vortex-core-pro': {
    gallery: ['/vortex-core-pro-1.png', '/vortex-core-pro-2.png'],
    specs: '/vortex-core-pro-especif.png',
  },
  'vortex-core-ultra': {
    gallery: ['/vortex-core-ultra-1.png', '/vortex-core-ultra-2.png'],
    specs: '/vortex-core-ultra-especif.png',
  },
};

const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { items, add, increase, decrease } = useCartStore();
  const inCart = items.find((i) => i.product.id === product.id);
  const detail = DETAIL_IMAGES[product.id];

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-start justify-center overflow-y-auto p-4" onClick={onClose}>
      <div className="relative w-full max-w-3xl my-8 bg-surface border border-border rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors">
          <X size={16} className="text-white" />
        </button>

        {detail ? (
          <div className="space-y-6 p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detail.gallery.map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden bg-black/40 border border-border aspect-[4/3]">
                  <img src={img} alt={`${product.name} vista ${i + 1}`} className="absolute inset-0 w-full h-full object-contain p-4" />
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden bg-black/40 border border-border">
              <img src={detail.specs} alt={`${product.name} especificações`} className="w-full h-auto" />
            </div>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="w-24 h-24 rounded-2xl bg-black/40 border border-border flex items-center justify-center mx-auto mb-6 text-5xl">🎧</div>
          </div>
        )}

        <div className="px-6 md:px-10 pb-10 space-y-4">
          <div>
            <h2 className="text-[22px] font-bold text-white">{product.name}</h2>
            <p className="text-[14px] text-text-secondary font-mono mt-1">{product.specs}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-[24px] font-bold text-white tracking-tight">{fmt(product.price)}</span>
            {inCart ? (
              <div className="flex items-center gap-3">
                <button onClick={() => decrease(product.id)} className="w-9 h-9 rounded-full bg-white/5 text-text-secondary hover:bg-white/10 text-base transition-colors">−</button>
                <span className="text-[15px] font-semibold font-mono text-white w-5 text-center">{inCart.quantity}</span>
                <button onClick={() => increase(product.id)} className="w-9 h-9 rounded-full bg-white/5 text-text-secondary hover:bg-white/10 text-base transition-colors">+</button>
              </div>
            ) : (
              <button onClick={() => { add(product); onClose(); }} className="inline-flex items-center rounded-full text-[15px] font-medium px-7 py-3 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]">
                Adicionar ao carrinho
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function hasProductDetail(id: string): boolean {
  return id in DETAIL_IMAGES;
}
