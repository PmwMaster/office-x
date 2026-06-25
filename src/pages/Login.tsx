import { useState } from 'react';
import { useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, MailCheck } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Footer } from '../components/layout/Footer';

export function Login() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { signIn, signUp, loading, error, clearError, confirmationSent, clearConfirmation, user } = useAuthStore();
  const navigate = useNavigate();

  if (!loading && user) {
    return <Navigate to={redirect} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const ok = await signUp(email, password);
        if (ok) navigate(redirect, { replace: true });
        // if !ok, confirmationSent is now true — stay on page
      } else {
        await signIn(email, password);
        navigate(redirect, { replace: true });
      }
    } catch {
      // error is handled in store
    }
  };

  return (
    <div className="min-h-screen bg-black text-text pt-20">
      <div className="max-w-md mx-auto px-6 py-16">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[13px] text-text-secondary hover:text-text transition-colors mb-10">
          <ArrowLeft size={14} /> Voltar
        </button>

        <div className="space-y-3 mb-10">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/70 font-mono">
            Conta VORTEX
          </p>
          <h1 className="text-[36px] font-bold tracking-[-0.02em] text-text leading-tight">
            {isRegister ? 'Criar conta' : 'Entrar'}
          </h1>
          <p className="text-[14px] text-text-secondary">
            {isRegister
              ? 'Registre-se para acompanhar seus pedidos e histórico.'
              : 'Acesse sua conta VORTEX para continuar.'}
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/[0.06] border border-red-500/[0.15] mb-6">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-medium text-red-400">{error}</p>
              <button onClick={clearError} className="text-[11px] text-red-400/60 hover:text-red-400 transition-colors mt-1">
                Fechar
              </button>
            </div>
          </div>
        )}

        {confirmationSent ? (
          <div className="p-8 rounded-2xl bg-green-500/[0.04] border border-green-500/[0.15] text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <MailCheck size={28} className="text-green-400" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-white">Verifique seu e-mail</h2>
              <p className="text-[14px] text-text-secondary mt-2 leading-relaxed">
                Enviamos um link de confirmação para{' '}
                <span className="text-white font-medium">{email}</span>.
                Clique no link para ativar sua conta.
              </p>
            </div>
            <p className="text-[12px] text-text-tertiary font-mono">
              Não recebeu? Verifique a pasta de spam ou{' '}
              <button
                type="button"
                onClick={() => { clearConfirmation(); setEmail(''); setPassword(''); }}
                className="text-primary hover:text-primary/70 transition-colors"
              >
                tente outro e-mail
              </button>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[12px] font-medium text-text-secondary uppercase tracking-wider mb-1.5 block">
              E-mail
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-[14px] text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-medium text-text-secondary uppercase tracking-wider mb-1.5 block">
              Senha
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-11 py-3 text-[14px] text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full text-[15px] font-medium py-3.5 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isRegister ? 'Criando conta...' : 'Entrando...'}
              </>
            ) : (
              isRegister ? 'Criar conta' : 'Entrar'
            )}
          </button>
        </form>
        )}

        {!confirmationSent && (
          <>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => { setIsRegister(!isRegister); clearError(); }}
                className="text-[13px] text-text-secondary hover:text-text transition-colors"
              >
                {isRegister ? (
                  <>Já tem uma conta? <span className="text-primary font-medium">Entrar</span></>
                ) : (
                  <>Não tem conta? <span className="text-primary font-medium">Criar conta</span></>
                )}
              </button>
            </div>

            <div className="mt-10 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-[12px] text-text-tertiary leading-relaxed">
                {isRegister
                  ? 'Ao criar uma conta, você concorda com os Termos de Uso e Política de Privacidade da VORTEX Audio Labs.'
                  : 'Sua conta VORTEX dá acesso ao histórico de pedidos, rastreamento de compras e ofertas exclusivas.'}
              </p>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
