import { AlertTriangle, BookOpen, ChefHat, Home, NotebookPen } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';

const abas = [
  { href: '/', rotulo: 'Começar', Icone: Home },
  { href: '/fases', rotulo: 'Fases', Icone: BookOpen },
  { href: '/seguranca', rotulo: 'Segurança', Icone: AlertTriangle },
  { href: '/receitas', rotulo: 'Receitas', Icone: ChefHat },
  { href: '/diario', rotulo: 'Diário', Icone: NotebookPen },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [rota] = useLocation();

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">Nosso Pediatra</span>
            <span className="text-xs text-ink-soft">Introdução Alimentar</span>
          </Link>
          <Link
            href="/seguranca"
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              rota === '/seguranca'
                ? 'bg-danger text-white'
                : 'bg-danger-soft text-danger'
            }`}
          >
            🚨 Emergência
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>

      <footer className="mx-auto max-w-3xl px-4 pb-6 pt-10 text-center text-xs text-ink-soft">
        <p className="mb-1">
          Conteúdo baseado no Guia Alimentar para Crianças Brasileiras Menores de 2 Anos
          (Ministério da Saúde, 2019) e no Manual de Alimentação da SBP.
        </p>
        <p className="mb-1 font-medium text-warn">
          Versão em revisão clínica — não substitui a orientação do seu pediatra.
        </p>
        <p>© {new Date().getFullYear()} Nosso Pediatra · Amor de pai. Ciência de médico.</p>
      </footer>

      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur"
      >
        <div className="mx-auto grid max-w-3xl grid-cols-5">
          {abas.map(({ href, rotulo, Icone }) => {
            const ativa = rota === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={ativa ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  ativa ? 'text-primary' : 'text-ink-soft hover:text-ink'
                }`}
              >
                <Icone className="h-5 w-5" aria-hidden />
                {rotulo}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
