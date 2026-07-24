import { usePersistido } from '@/lib/storage';
import { Smartphone, X } from 'lucide-react';

/**
 * O app funciona offline e é instalável (PWA) — mas ninguém descobre isso
 * sozinho. Dica única e dispensável, no painel inicial.
 */
export default function DicaInstalar() {
  const [dispensada, setDispensada] = usePersistido<boolean>('dica-instalar-dispensada', false);

  if (dispensada) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
      <p className="flex-1 text-sm">
        <strong>Adicione à tela inicial do celular:</strong> o app abre em um toque e funciona{' '}
        <strong>sem internet</strong> na cozinha. No navegador, use o menu → "Adicionar à tela
        inicial".
      </p>
      <button
        onClick={() => setDispensada(true)}
        aria-label="Dispensar dica de instalação"
        className="-m-2 p-2 text-ink-soft hover:text-ink"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
