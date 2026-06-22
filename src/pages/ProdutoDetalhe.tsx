import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui';
import { useProductDetail } from '../hooks';
import { useCartStore } from '../stores';

export function ProdutoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { product, loading } = useProductDetail(id ?? '');
  const addProduct = useCartStore((s) => s.addProduct);

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-32 bg-white/5 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-white/5 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 bg-white/5 rounded" />
              <div className="h-6 w-1/2 bg-white/5 rounded" />
              <div className="h-24 w-full bg-white/5 rounded" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <p className="text-center py-20 text-on-surface-variant">Produto não encontrado.</p>
      </MainLayout>
    );
  }

  const price = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <MainLayout>
      <Link to="/loja" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8">
        <ArrowLeft size={18} />
        <span className="text-label-md uppercase">Voltar</span>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-surface-container-lowest rounded-2xl overflow-hidden">
          <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-label-sm text-primary-fixed font-mono uppercase">{product.category}</span>
          <h1 className="text-display-md font-black text-primary mt-2 mb-4">{product.name}</h1>
          <p className="text-body-lg text-on-surface-variant mb-6 font-mono">{product.specs}</p>
          <span className="text-display-md font-black text-primary-fixed block mb-8">{price}</span>
          <Button size="lg" onClick={() => addProduct(product)}>
            <ShoppingCart size={20} className="mr-3" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
