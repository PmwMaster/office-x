import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button, Input } from '../components/ui';
import { useAuthStore } from '../stores';

export function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = useAuthStore((s) => s.register);
  const error = useAuthStore((s) => s.error);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = await register(email, password, name);
    if (!err) navigate('/');
  };

  return (
    <AuthLayout title="OFFICE-X">
      <div className="glass-card p-8 rounded-2xl">
        <h2 className="text-headline-lg font-bold text-primary mb-6 text-center">CADASTRO</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-label-sm text-error">{error}</p>}
          <Button type="submit" className="w-full">Criar Conta</Button>
        </form>
        <p className="text-label-sm text-on-surface-variant text-center mt-6">
          Já tem conta?{' '}
          <Link to="/login" className="text-primary-fixed hover:underline">Entrar</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
