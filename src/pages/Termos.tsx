import { MainLayout } from '../components/layout/MainLayout';

export function Termos() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-display-md font-black text-primary mb-8">TERMOS DE USO</h1>
        <div className="space-y-8 text-on-surface-variant text-body-lg leading-relaxed">
          <section>
            <h2 className="text-headline-md font-semibold text-primary mb-4">1. Serviços Técnicos</h2>
            <p>Todos os serviços são realizados por técnicos especializados. Prazo padrão de 5 a 10 dias úteis. Serviços urgentes têm taxa adicional de 30%.</p>
          </section>
          <section>
            <h2 className="text-headline-md font-semibold text-primary mb-4">2. Garantia</h2>
            <p>Produtos novos têm garantia de 90 dias contra defeitos de fabricação. Serviços de modding têm garantia de 30 dias sobre a mão de obra.</p>
          </section>
          <section>
            <h2 className="text-headline-md font-semibold text-primary mb-4">3. Pagamentos</h2>
            <p>Aceitamos cartões de crédito (até 12x), PIX (5% de desconto) e boleto. Pedidos processados após confirmação do pagamento.</p>
          </section>
          <section>
            <h2 className="text-headline-md font-semibold text-primary mb-4">4. Envios e Devoluções</h2>
            <p>Enviamos para todo o Brasil. Conforme o CDC, você tem 7 dias corridos após o recebimento para desistir da compra com reembolso integral.</p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
