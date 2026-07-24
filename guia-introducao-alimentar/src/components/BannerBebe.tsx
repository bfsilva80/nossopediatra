import { usePersistido } from '@/lib/storage';
import { calcularIdade, descreverIdade, faseParaMeses } from '@/lib/idade';
import { Pencil } from 'lucide-react';
import { Link } from 'wouter';

export function useNascimento() {
  return usePersistido<string>('nascimento', '');
}

/**
 * Faixa fixa no topo das telas: idade atual e fase do bebê.
 * A data é informada uma única vez (tela Começar) e alimenta o app inteiro.
 */
export default function BannerBebe() {
  const [nascimento] = useNascimento();
  const idade = calcularIdade(nascimento);

  if (!idade) return null;

  const fase = faseParaMeses(idade.meses);
  const texto =
    idade.meses < 6
      ? 'ainda em aleitamento exclusivo'
      : fase
        ? `${fase.icone} ${fase.nome} (${fase.faixa})`
        : 'além dos 24 meses deste guia';

  return (
    <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl bg-primary-soft px-4 py-3">
      <p className="text-sm text-ink">
        <span className="font-semibold">Seu bebê:</span> {descreverIdade(idade)} · {texto}
      </p>
      <Link
        href="/"
        aria-label="Alterar data de nascimento"
        className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden />
        alterar
      </Link>
    </div>
  );
}
