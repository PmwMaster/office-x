import { Suspense, useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { isSupabaseConfigured, checkReachable } from '../lib';
import { routes } from './routes';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-10 h-10 border-2 border-primary-fixed border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AppRoutes() {
  return useRoutes(routes);
}

export default function App() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      useAuthStore.setState({ loading: false });
      return;
    }
    checkReachable().then((ok) => {
      if (ok) {
        init();
        window.dispatchEvent(new CustomEvent('supabase-ready'));
      } else {
        useAuthStore.setState({ loading: false });
      }
    });
  }, [init]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
