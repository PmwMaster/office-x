import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, CreditCard, Barcode, QrCode, Check, ArrowLeft, Truck, Shield, LogIn } from 'lucide-react';
import { GlassCard } from '../components/ui';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { Footer } from '../components/layout/Footer';

const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

type Step = 'cart' | 'info' | 'payment' | 'done';

export function Comprar() {
  const [step, setStep] = useState<Step>('cart');
  const { items, remove, increase, decrease, clear, totalPrice, totalItems } = useCartStore();
  const { user, session } = useAuthStore();
  const isLoggedIn = !!session;
  const navigate = useNavigate();

  // Customer info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Payment
  const [payment, setPayment] = useState<'credit' | 'pix' | 'boleto'>('pix');
  const [installments, setInstallments] = useState(1);

  const subtotal = totalPrice();
  const shipping = subtotal > 500 ? 0 : subtotal > 0 ? 29.90 : 0;
  const total = subtotal + shipping;

  const isValidInfo = name.trim() && email.trim() && phone.trim().length >= 10;

  const handleContinue = () => {
    if (!isLoggedIn) {
      navigate('/login?redirect=/comprar');
      return;
    }
    if (!name.trim()) setName(user?.user_metadata?.full_name ?? '');
    if (!email.trim()) setEmail(user.email ?? '');
    setStep('info');
  };

  const handleFinish = () => {
    setStep('done');
  };

  const handleReset = () => {
    clear();
    setStep('cart');
    setName('');
    setEmail('');
    setPhone('');
    setPayment('pix');
    setInstallments(1);
  };

  return (
    <div className="min-h-screen bg-black text-text pt-20">
      <section className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/70 font-mono">
            {step === 'cart' && 'Carrinho'}
            {step === 'info' && 'Seus Dados'}
            {step === 'payment' && 'Pagamento'}
            {step === 'done' && 'Confirmado'}
          </p>
          <h1 className="text-[40px] font-bold tracking-[-0.02em] text-text leading-tight">
            {step === 'cart' && 'Seu carrinho'}
            {step === 'info' && 'Informações de entrega'}
            {step === 'payment' && 'Forma de pagamento'}
            {step === 'done' && 'Pedido confirmado!'}
          </h1>

          {/* Step indicator */}
          {step !== 'done' && (
            <div className="flex items-center gap-3 pt-2">
              {(['cart', 'info', 'payment'] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    step === s ? 'bg-primary text-black' : i < ['cart', 'info', 'payment'].indexOf(step) ? 'bg-primary/30 text-primary' : 'bg-white/[0.06] text-text-tertiary'
                  }`}>
                    {i < ['cart', 'info', 'payment'].indexOf(step) ? <Check size={12} /> : i + 1}
                  </div>
                  <span className={`text-[12px] font-mono uppercase tracking-wider hidden sm:inline ${
                    step === s ? 'text-text' : 'text-text-tertiary'
                  }`}>
                    {s === 'cart' ? 'Itens' : s === 'info' ? 'Dados' : 'Pagamento'}
                  </span>
                  {i < 2 && <div className={`w-8 h-px ${i < ['cart', 'info', 'payment'].indexOf(step) ? 'bg-primary/30' : 'bg-white/[0.06]'}`} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length === 0 && step === 'cart' ? (
          <div className="text-center py-24 space-y-5">
            <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto">
              <ShoppingCart size={28} className="text-text-tertiary" />
            </div>
            <div>
              <p className="text-[20px] font-semibold text-text">Carrinho vazio</p>
              <p className="text-[14px] text-text-secondary mt-1">Explore nosso catálogo e adicione produtos.</p>
            </div>
            <Link to="/especificacoes" className="inline-flex items-center gap-2 rounded-full text-[15px] font-medium px-7 py-3 bg-primary text-white hover:bg-primary-dim transition-all duration-300">
              Ver Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className={`${step === 'done' ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-4`}>
              {step === 'cart' && (
                <>
                  {items.map(({ product, quantity }) => (
                    <GlassCard key={product.id} className="p-4 flex gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-black border border-white/[0.04] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <h3 className="text-[15px] font-semibold text-text leading-tight">{product.name}</h3>
                        <p className="text-[12px] text-text-tertiary font-mono truncate">{product.specs}</p>
                        <span className="text-[14px] font-semibold text-text">{fmt(product.price)}</span>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => remove(product.id)} className="text-text-tertiary hover:text-red-400 transition-colors p-1">
                          <Trash2 size={14} />
                        </button>
                        <div className="flex items-center gap-3 bg-white/[0.04] rounded-full px-2 py-1">
                          <button onClick={() => decrease(product.id)} className="w-6 h-6 rounded-full bg-white/5 text-text-secondary hover:bg-white/10 text-sm transition-colors">−</button>
                          <span className="text-[13px] font-semibold font-mono text-text w-4 text-center">{quantity}</span>
                          <button onClick={() => increase(product.id)} className="w-6 h-6 rounded-full bg-white/5 text-text-secondary hover:bg-white/10 text-sm transition-colors">+</button>
                        </div>
                        <span className="text-[15px] font-semibold text-text tabular-nums">{fmt(product.price * quantity)}</span>
                      </div>
                    </GlassCard>
                  ))}

                  <div className="flex justify-between items-center pt-4">
                    <Link to="/especificacoes" className="text-[13px] text-primary hover:text-primary/70 transition-colors flex items-center gap-1.5">
                      <ArrowLeft size={14} /> Continuar comprando
                    </Link>
                    <button onClick={() => clear()} className="text-[13px] text-text-tertiary hover:text-red-400 transition-colors">
                      Limpar carrinho
                    </button>
                  </div>
                </>
              )}

              {step === 'info' && (
                <GlassCard className="p-6 md:p-8 space-y-5">
                  <h2 className="text-[18px] font-semibold text-text">Dados do comprador</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[12px] font-medium text-text-secondary uppercase tracking-wider mb-1.5 block">Nome completo</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-text-secondary uppercase tracking-wider mb-1.5 block">E-mail</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-text-secondary uppercase tracking-wider mb-1.5 block">WhatsApp / Telefone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep('cart')} className="px-5 py-2.5 rounded-full text-[14px] font-medium bg-white/[0.04] text-text-secondary hover:bg-white/[0.08] transition-colors">
                      Voltar
                    </button>
                    <button
                      onClick={() => setStep('payment')}
                      disabled={!isValidInfo}
                      className={`px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 ${
                        isValidInfo ? 'bg-primary text-white hover:bg-primary-dim active:scale-[0.97]' : 'bg-white/[0.04] text-text-tertiary cursor-not-allowed'
                      }`}
                    >
                      Continuar para pagamento
                    </button>
                  </div>
                </GlassCard>
              )}

              {step === 'payment' && (
                <GlassCard className="p-6 md:p-8 space-y-6">
                  <h2 className="text-[18px] font-semibold text-text">Escolha como pagar</h2>

                  <div className="space-y-3">
                    {[
                      { id: 'pix' as const, label: 'PIX', desc: 'Aprovação instantânea · 5% de desconto', icon: QrCode, discount: true },
                      { id: 'credit' as const, label: 'Cartão de Crédito', desc: 'Até 12x sem juros', icon: CreditCard, discount: false },
                      { id: 'boleto' as const, label: 'Boleto Bancário', desc: 'Vencimento em 3 dias úteis', icon: Barcode, discount: false },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPayment(opt.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                          payment === opt.id
                            ? 'border-primary bg-primary/[0.04]'
                            : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10]'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          payment === opt.id ? 'bg-primary/15 text-primary' : 'bg-white/[0.04] text-text-secondary'
                        }`}>
                          <opt.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <span className="text-[15px] font-semibold text-text">{opt.label}</span>
                          <p className="text-[12px] text-text-tertiary">{opt.discount ? <span className="text-green-400">{opt.desc}</span> : opt.desc}</p>
                        </div>
                        {payment === opt.id && <Check size={18} className="text-primary flex-shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {payment === 'credit' && (
                    <div>
                      <label className="text-[12px] font-medium text-text-secondary uppercase tracking-wider mb-1.5 block">Parcelas</label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-primary/50 transition-colors"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}x de {fmt(total / n)} {n === 1 ? '(à vista)' : 'sem juros'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {payment === 'pix' && (
                    <div className="bg-green-500/[0.05] border border-green-500/[0.15] rounded-2xl p-4 text-center">
                      <p className="text-[14px] text-green-400 font-semibold">5% de desconto no PIX</p>
                      <p className="text-[12px] text-text-tertiary mt-1">Economize {fmt(total * 0.05)} nesta compra</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep('info')} className="px-5 py-2.5 rounded-full text-[14px] font-medium bg-white/[0.04] text-text-secondary hover:bg-white/[0.08] transition-colors">
                      Voltar
                    </button>
                    <button
                      onClick={handleFinish}
                      className="px-6 py-2.5 rounded-full text-[14px] font-medium bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]"
                    >
                      Finalizar pedido
                    </button>
                  </div>
                </GlassCard>
              )}

              {step === 'done' && (
                <GlassCard className="p-10 md:p-16 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                    <Check size={32} className="text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-[28px] font-bold text-white">Pedido confirmado!</h2>
                    <p className="text-[15px] text-text-secondary">
                      {payment === 'pix' ? 'Escaneie o QR Code enviado para seu e-mail para pagar.' :
                       payment === 'boleto' ? 'O boleto foi enviado para seu e-mail.' :
                       'O pagamento será processado em instantes.'}
                    </p>
                    <p className="text-[13px] text-text-tertiary font-mono">
                      Confirmação enviada para <span className="text-text-secondary">{email || 'seu e-mail'}</span>
                    </p>
                  </div>

                  {/* Order summary in confirmation */}
                  <div className="max-w-md mx-auto border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04] bg-white/[0.02]">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center gap-3 px-5 py-3">
                        <div className="w-10 h-10 rounded-xl bg-black/40 overflow-hidden flex-shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-[13px] font-medium text-text truncate">{product.name}</p>
                          <p className="text-[11px] text-text-tertiary font-mono">Qtd: {quantity}</p>
                        </div>
                        <span className="text-[13px] font-semibold text-text">{fmt(product.price * quantity)}</span>
                      </div>
                    ))}
                    <div className="px-5 py-3 flex justify-between text-[14px]">
                      <span className="text-text-secondary">Total</span>
                      <span className="font-bold text-text">{fmt(total)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center pt-4">
                    <Link to="/especificacoes" className="px-6 py-2.5 rounded-full text-[14px] font-medium bg-white/[0.06] text-text-secondary hover:bg-white/[0.10] transition-colors">
                      Continuar comprando
                    </Link>
                    <button onClick={handleReset} className="px-6 py-2.5 rounded-full text-[14px] font-medium bg-primary text-white hover:bg-primary-dim transition-all duration-300">
                      Nova compra
                    </button>
                  </div>
                </GlassCard>
              )}
            </div>

            {/* Sidebar - Summary */}
            {step !== 'done' && (
              <GlassCard className="p-6 h-fit lg:sticky lg:top-24 space-y-5">
                <h3 className="text-[17px] font-semibold text-text">Resumo do pedido</h3>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black/40 overflow-hidden flex-shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-text truncate">{product.name}</p>
                        <p className="text-[11px] text-text-tertiary font-mono">Qtd: {quantity}</p>
                      </div>
                      <span className="text-[13px] font-semibold text-text tabular-nums">{fmt(product.price * quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/[0.06] pt-4 space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Subtotal ({totalItems()} itens)</span>
                    <span className="text-text">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary flex items-center gap-1.5"><Truck size={12} /> Frete</span>
                    {shipping === 0 ? (
                      <span className="text-green-400 font-medium">Grátis</span>
                    ) : (
                      <span className="text-text">{fmt(shipping)}</span>
                    )}
                  </div>
                  {subtotal > 0 && subtotal <= 500 && (
                    <p className="text-[10px] text-text-tertiary font-mono">
                      <span className="text-primary/70">Frete grátis</span> em compras acima de {fmt(500)}
                    </p>
                  )}
                  {payment === 'pix' && step === 'payment' && (
                    <div className="flex justify-between text-green-400">
                      <span>Desconto PIX (5%)</span>
                      <span>−{fmt(total * 0.05)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/[0.06] pt-4 flex justify-between items-baseline">
                  <span className="text-[15px] font-semibold text-text">Total</span>
                  <div className="text-right">
                    <span className="text-[24px] font-bold text-text tracking-tight">
                      {fmt(payment === 'pix' && step === 'payment' ? total * 0.95 : total)}
                    </span>
                    {payment === 'credit' && installments > 1 && step === 'payment' && (
                      <p className="text-[11px] text-text-tertiary font-mono">{installments}x de {fmt(total / installments)}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-text-tertiary pt-1">
                  <Shield size={12} className="text-primary/60" />
                  <span>Compra segura · Dados criptografados</span>
                </div>

                {step === 'cart' && (
                  <>
                    {!isLoggedIn && (
                      <p className="text-[12px] text-text-tertiary text-center font-mono">
                        Faça login para continuar com a compra
                      </p>
                    )}
                    <button
                      onClick={handleContinue}
                    className="w-full rounded-full text-[15px] font-medium py-3.5 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    {isLoggedIn ? 'Continuar' : (
                      <>
                        <LogIn size={16} />
                        Entrar para comprar
                      </>
                    )}
                  </button>
                  </>
                )}
              </GlassCard>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
