import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Loader2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Footer } from '../components/layout/Footer';

export function Sucesso() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    if (sessionId) {
      // Session exists = payment likely successful
      setStatus('success');
      clear();
      // In production, verify with your backend
    } else {
      setStatus('error');
    }
  }, [sessionId, clear]);

  return (
    <div className="min-h-screen bg-black text-text pt-20">
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        {status === 'loading' && (
          <div className="space-y-6">
            <Loader2 size={40} className="animate-spin mx-auto text-primary" />
            <h1 className="text-[28px] font-bold text-white">Confirmando pagamento...</h1>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
              <Check size={36} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-[32px] font-bold text-white">Pagamento confirmado!</h1>
              <p className="text-[15px] text-text-secondary mt-3 leading-relaxed">
                Seu pedido foi processado com sucesso. Você receberá a confirmação por e-mail em instantes.
              </p>
              {sessionId && (
                <p className="text-[11px] text-text-tertiary font-mono mt-4">
                  ID da sessão: {sessionId.slice(0, 12)}...
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full text-[14px] font-medium px-7 py-3 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]"
              >
                <ShoppingBag size={16} />
                Continuar comprando
              </Link>
              <Link
                to="/especificacoes"
                className="inline-flex items-center justify-center rounded-full text-[14px] font-medium px-7 py-3 bg-white/[0.06] text-text-secondary hover:bg-white/[0.10] transition-all duration-300 active:scale-[0.97]"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <span className="text-3xl">!</span>
            </div>
            <div>
              <h1 className="text-[28px] font-bold text-white">Sessão não encontrada</h1>
              <p className="text-[15px] text-text-secondary mt-3">
                Não foi possível confirmar seu pagamento. Se o valor foi debitado, entre em contato com o suporte.
              </p>
            </div>
            <Link
              to="/comprar"
              className="inline-flex items-center rounded-full text-[14px] font-medium px-7 py-3 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]"
            >
              Voltar ao carrinho
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
