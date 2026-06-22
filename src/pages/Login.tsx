import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button, Input } from '../components/ui';
import { useAuthStore } from '../stores';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = await login(email, password);
    if (!err) navigate('/');
  };

  return (
    <AuthLayout title="OFFICE-X">
      <div className="glass-card p-8 rounded-2xl">
        <h2 className="text-headline-lg font-bold text-primary mb-6 text-center">ENTRAR</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-label-sm text-error">{error}</p>}
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
        <p className="text-label-sm text-on-surface-variant text-center mt-6">
          Não tem conta?{' '}
          <Link to="/cadastro" className="text-primary-fixed hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
