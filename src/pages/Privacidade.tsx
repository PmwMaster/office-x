import { MainLayout } from '../components/layout/MainLayout';

export function Privacidade() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-display-md font-black text-primary mb-8">POLÍTICA DE PRIVACIDADE</h1>
        <div className="space-y-8 text-on-surface-variant text-body-lg leading-relaxed">
          <section>
            <h2 className="text-headline-md font-semibold text-primary mb-4">1. Coleta de Dados</h2>
            <p>A OFFICE-X coleta apenas os dados estritamente necessários para processamento de pedidos e prestação de serviços. Nenhum dado é compartilhado com terceiros sem consentimento.</p>
          </section>
          <section>
            <h2 className="text-headline-md font-semibold text-primary mb-4">2. Uso de Cookies</h2>
            <p>Utilizamos cookies essenciais para funcionamento do carrinho e autenticação. Cookies de análise são opcionais.</p>
          </section>
          <section>
            <h2 className="text-headline-md font-semibold text-primary mb-4">3. Seus Direitos (LGPD)</h2>
            <p>Nos termos da LGPD, você tem direito a acessar, corrigir e solicitar a exclusão dos seus dados. Envie sua solicitação para privacidade@officex.com.br.</p>
          </section>
          <section>
            <h2 className="text-headline-md font-semibold text-primary mb-4">4. Contato</h2>
            <p>Dúvidas sobre esta política? Entre em contato pelo e-mail privacidade@officex.com.br ou pelo Discord da comunidade.</p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
