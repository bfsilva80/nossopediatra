import logo from '@/assets/logo.svg';
import AvisoStorage from '@/components/AvisoStorage';
import AvisoTeste from '@/components/AvisoTeste';
import { APP_VERSAO, linkFeedback } from '@/lib/feedback';
import { AlertTriangle, ChefHat, Home, NotebookPen, Search } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';

const abas = [
  { href: '/', rotulo: 'Início', Icone: Home },
  { href: '/alimentos', rotulo: 'Alimentos', Icone: Search },
  { href: '/receitas', rotulo: 'Receitas', Icone: ChefHat },
  { href: '/seguranca', rotulo: 'Segurança', Icone: AlertTriangle },
  { href: '/diario', rotulo: 'Diário', Icone: NotebookPen },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [rota] = useLocation();

  // Toda troca de tela começa do topo — sem isto, navegar a partir de uma
  // posição rolada abre a próxima tela no meio. Os deep-links de seção
  // (/seguranca/:secao, /metodos/:secao) rolam depois, via rAF, e prevalecem.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [rota]);

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <img src={logo} alt="" aria-hidden className="h-9 w-9" />
            <span className="leading-tight">
              <span className="block text-base font-bold text-primary">Nosso Pediatra</span>
              <span className="block text-[11px] text-ink-soft">Introdução Alimentar</span>
            </span>
          </Link>
          <Link
            href="/emergencia"
            className="rounded-full bg-danger px-3 py-1.5 text-xs font-bold text-white hover:opacity-90"
          >
            <span aria-hidden>🚨</span> Engasgo
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <AvisoStorage />
        {children}
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-6 pt-10 text-center text-xs text-ink-soft">
        <p className="mb-1 font-medium text-warn">
          {APP_VERSAO} · conteúdo revisado clinicamente (jul/2026) — não substitui a orientação do seu pediatra.
        </p>
        <p className="mb-2">
          <Link href="/sobre" className="font-medium text-primary underline">
            Sobre este guia e fontes
          </Link>
          {' · '}
          <a
            href={linkFeedback('rodapé')}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline"
          >
            Enviar feedback
          </a>
        </p>
        <p>
          Este app faz parte do projeto <strong>Nosso Pediatra</strong> · Amor de pai. Ciência
          de médico. © {new Date().getFullYear()}
        </p>
      </footer>

      <AvisoTeste />

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
