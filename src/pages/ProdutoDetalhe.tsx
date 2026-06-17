import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Package } from 'lucide-react';
import type { ProductItem } from '../types';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { useProducts } from '../services';
import { useCartStore } from '../stores/cartStore';

export function ProdutoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const addProduct = useCartStore((s) => s.addProduct);
  const cartProducts = useCartStore((s) => s.products);

  const product = products.find((p) => p.id === id);
  const cartEntry = cartProducts.find((p) => p.item.id === id);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-10 h-10 border-2 border-primary-fixed border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <Package size={64} className="text-on-surface-variant/30" />
          <h2 className="text-headline-lg font-semibold text-primary">Produto não encontrado</h2>
          <Link to="/loja">
            <Button variant="primary">VOLTAR PARA LOJA</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link
        to="/loja"
        className="inline-flex items-center gap-2 text-label-md text-on-surface-variant hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        VOLTAR PARA LOJA
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="glass-surface rounded-xl p-8 border border-white/5 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="max-w-full max-h-[500px] object-contain"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/products/placeholder.svg';
            }}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-display-lg-mobile lg:text-display-lg font-bold text-primary mb-4">
              {product.name}
            </h1>
            <span className="text-label-sm text-primary-fixed status-pill">{product.category.toUpperCase()}</span>
          </div>

          <GlassCard className="space-y-4">
            <h3 className="text-label-sm text-on-surface-variant uppercase tracking-widest">Especificações</h3>
            <p className="text-body-lg text-primary">{product.specs}</p>
          </GlassCard>

          <GlassCard className="space-y-4">
            <h3 className="text-label-sm text-on-surface-variant uppercase tracking-widest">Descrição</h3>
            <p className="text-body-md text-on-surface-variant">
              {product.type === 'sale'
                ? `Produto da categoria ${product.category} com especificações ${product.specs}. Ideal para entusiastas e profissionais que buscam alta performance.`
                : 'Equipamento disponível para locação.'}
            </p>
          </GlassCard>

          <div className="flex items-end justify-between mt-4">
            <div>
              <span className="text-label-sm text-on-surface-variant block mb-1">PREÇO</span>
              <span className="text-headline-lg font-black text-primary-fixed">
                {product.price === 0
                  ? 'CONSULTE'
                  : `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              </span>
            </div>

            {cartEntry ? (
              <Button variant="secondary" className="border-primary-fixed text-primary-fixed" onClick={() => {}}>
                <Check size={18} className="inline mr-2" />
                NO CARRINHO
              </Button>
            ) : (
              <Button variant="primary" onClick={() => addProduct(product)}>
                <ShoppingCart size={18} className="inline mr-2" />
                ADICIONAR AO CARRINHO
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
