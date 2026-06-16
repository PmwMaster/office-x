import { Fragment } from 'react';
import { Keyboard, Mouse, Cable, Filter, Download } from 'lucide-react';
import { DASHBOARD_PROGRESS } from '../mock/data';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';
import { usePurchaseHistory } from '../services';

export function MeuPainel() {
  const { history, loading } = usePurchaseHistory();
  return (
    <Layout>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-fixed/5 rounded-full blur-[120px] -z-10" />

      <section className="mb-section-gap">
        <h1 className="text-display-lg font-bold text-primary mb-4">Bem-vindo, Operador.</h1>
        <p className="text-on-surface-variant max-w-xl text-body-lg">
          Acompanhe o status dos seus serviços de modding e gerencie seu histórico de aquisições.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Service Order Tracking - now full width top row */}
        <div className="lg:col-span-12 glass-card p-8 md:p-12 relative overflow-hidden group rounded-xl">
          <div className="flex justify-between items-start mb-12">
            <div>
              <span className="text-label-sm text-primary-fixed tracking-widest uppercase mb-2 block">
                STATUS DE SERVIÇO
              </span>
              <h2 className="text-headline-lg font-semibold text-primary">Ordem de Serviço #X-902</h2>
            </div>
            <div className="status-pill px-4 py-1 text-label-sm uppercase rounded-sm">
              PRIORIDADE: ALTA
            </div>
          </div>

          <div className="relative pt-12 pb-8">
            <div className="flex justify-between items-center relative z-10">
              {DASHBOARD_PROGRESS.map((step, i) => (
                <Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        step.active ? 'bg-primary-fixed neon-pulse' : 'bg-white/20'
                      }`}
                    />
                    <span
                      className={`text-label-md font-medium ${
                        step.active ? 'text-primary-fixed' : 'text-on-surface-variant'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < DASHBOARD_PROGRESS.length - 1 && (
                    <div className={`step-line ${i < 2 ? 'step-line-active' : ''}`} />
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-8 pt-8 border-t border-white/5">
            <div className="flex-1">
              <span className="text-label-sm text-on-surface-variant block mb-1">TÉCNICO RESPONSÁVEL</span>
              <p className="text-headline-md font-semibold text-primary">Nexus-04</p>
            </div>
            <div className="flex-1">
              <span className="text-label-sm text-on-surface-variant block mb-1">DATA ESTIMADA</span>
              <p className="text-headline-md font-semibold text-primary">14.05.2024</p>
            </div>
            <div className="flex-1">
              <span className="text-label-sm text-on-surface-variant block mb-1">SERVIÇO</span>
              <p className="text-headline-md font-semibold text-primary">Case Swap + Lubrificação</p>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="px-8 py-3">DETALHES</Button>
            </div>
          </div>
        </div>

        {/* Purchase History */}
        <div className="lg:col-span-12 mt-8 glass-card overflow-hidden rounded-xl">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-headline-md font-semibold text-primary">Histórico de Aquisições</h3>
            <div className="flex gap-4">
              <Filter size={20} className="text-on-surface-variant cursor-pointer" />
              <Download size={20} className="text-on-surface-variant cursor-pointer" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  {['ITEM', 'ID', 'DATA', 'STATUS', 'VALOR'].map((h) => (
                    <th
                      key={h}
                      className={`p-8 text-label-sm text-on-surface-variant tracking-widest uppercase font-medium ${
                        h === 'VALOR' ? 'text-right' : ''
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-on-surface">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                      Carregando histórico...
                    </td>
                  </tr>
                ) : (
                  history.map((row) => {
                  const ICONS: Record<string, typeof Keyboard> = {
                    keyboard: Keyboard,
                    mouse: Mouse,
                    cable: Cable,
                  };
                  const Icon = ICONS[row.icon] || Keyboard;
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-surface-container-high rounded-sm flex items-center justify-center">
                            <Icon size={24} className={row.iconColor} />
                          </div>
                          <div>
                            <p className="text-body-md font-bold">{row.item}</p>
                            <p className="text-label-sm text-on-surface-variant">{row.itemSub}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8 font-mono text-label-md opacity-60">{row.id}</td>
                      <td className="p-8 text-label-md">{row.date}</td>
                      <td className="p-8">
                        <span className="text-primary-fixed text-label-sm border border-primary-fixed/30 px-3 py-1 rounded-full">
                          {row.status}
                        </span>
                      </td>
                      <td className="p-8 text-right font-bold text-headline-md">
                        R$ {row.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                }))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
