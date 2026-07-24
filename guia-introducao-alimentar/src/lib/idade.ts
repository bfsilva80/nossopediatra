import { fases, type Fase } from '@/content/fases';

export interface Idade {
  meses: number;
  dias: number;
}

/**
 * Idade em meses completos + dias, considerando o dia do mês
 * (um bebê de 5 meses e 20 dias tem 5 meses, não 6).
 * Retorna null para datas inválidas ou futuras.
 */
export function calcularIdade(nascimentoISO: string, hoje: Date = new Date()): Idade | null {
  if (!nascimentoISO) return null;
  const nascimento = new Date(`${nascimentoISO}T00:00:00`);
  if (Number.isNaN(nascimento.getTime()) || nascimento > hoje) return null;

  let meses =
    (hoje.getFullYear() - nascimento.getFullYear()) * 12 +
    (hoje.getMonth() - nascimento.getMonth());
  if (hoje.getDate() < nascimento.getDate()) meses -= 1;
  if (meses < 0) return null;

  const ancora = new Date(nascimento);
  ancora.setMonth(ancora.getMonth() + meses);
  const dias = Math.max(0, Math.floor((hoje.getTime() - ancora.getTime()) / 86_400_000));

  return { meses, dias };
}

export function faseParaMeses(meses: number): Fase | null {
  return fases.find(f => meses >= f.minMeses && meses <= f.maxMeses) ?? null;
}

export function descreverIdade({ meses, dias }: Idade): string {
  if (meses === 0) return `${dias} dia${dias === 1 ? '' : 's'}`;
  const m = `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
  return dias > 0 ? `${m} e ${dias} dia${dias === 1 ? '' : 's'}` : m;
}
