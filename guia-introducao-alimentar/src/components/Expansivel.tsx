import { ChevronDown } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

interface ExpansivelProps {
  titulo: ReactNode;
  subtitulo?: ReactNode;
  children: ReactNode;
  abertoInicial?: boolean;
}

/** Acordeão acessível: botão real, aria-expanded, funciona por teclado. */
export default function Expansivel({ titulo, subtitulo, children, abertoInicial = false }: ExpansivelProps) {
  const [aberto, setAberto] = useState(abertoInicial);
  const idConteudo = useId();

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={idConteudo}
        onClick={() => setAberto(a => !a)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="flex-1">
          <span className="block font-semibold text-ink">{titulo}</span>
          {subtitulo && <span className="mt-0.5 block text-sm text-ink-soft">{subtitulo}</span>}
        </span>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-primary transition-transform ${aberto ? 'rotate-180' : ''}`}
        />
      </button>
      <div id={idConteudo} hidden={!aberto} className="border-t border-stone-100 px-4 py-4">
        {children}
      </div>
    </div>
  );
}
