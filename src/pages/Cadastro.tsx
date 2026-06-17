import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';

export function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/loja';

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = await register(email, password, name);
    if (!err) navigate(from);
  };

  return (
    <Layout>
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-secondary-container/8 rounded-full blur-[120px] -z-10" />
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="glass-surface rounded-xl p-10 w-full max-w-md border border-white/5">
          <div className="text-center mb-8">
            <UserPlus size={40} className="text-primary-fixed mx-auto mb-4" />
            <h1 className="text-headline-lg font-bold text-primary mb-2">CRIAR CONTA</h1>
            <p className="text-body-md text-on-surface-variant">Junte-se à OFFICE-X</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 block">Nome</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#050505] border-b border-white/10 p-4 pl-12 text-primary font-semibold input-focus-gradient transition-all focus:outline-none"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 block">E-mail</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#050505] border-b border-white/10 p-4 pl-12 text-primary font-semibold input-focus-gradient transition-all focus:outline-none"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 block">Senha</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#050505] border-b border-white/10 p-4 pl-12 text-primary font-semibold input-focus-gradient transition-all focus:outline-none"
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-error text-label-sm text-center bg-error/10 py-3 rounded">{error}</p>
            )}

            <Button type="submit" variant="primary" className="w-full py-4 text-sm tracking-widest">
              CRIAR CONTA
            </Button>
          </form>

          <p className="text-center text-label-sm text-on-surface-variant mt-6">
            Já tem conta?{' '}
            <Link to="/login" className="text-primary-fixed hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
