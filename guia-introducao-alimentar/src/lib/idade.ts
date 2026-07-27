import { fases, type Fase } from '@/content/fases';

export interface Idade {
  meses: number;
  dias: number;
}

/** Nascimento há mais de 10 anos é tratado como erro de digitação (ex.: ano "0006"). */
export const MAX_ANOS_NASCIMENTO = 10;

export function nascimentoMinimoISO(hoje: Date = new Date()): string {
  const limite = new Date(hoje);
  limite.setFullYear(limite.getFullYear() - MAX_ANOS_NASCIMENTO);
  return limite.toISOString().slice(0, 10);
}

/**
 * Idade em meses completos + dias, considerando o dia do mês
 * (um bebê de 5 meses e 20 dias tem 5 meses, não 6).
 * Retorna null para datas inválidas, futuras ou implausíveis (>10 anos):
 * um ano digitado errado (ex.: "0006") não pode contaminar o app inteiro.
 */
export function calcularIdade(nascimentoISO: string, hoje: Date = new Date()): Idade | null {
  if (!nascimentoISO) return null;
  const nascimento = new Date(`${nascimentoISO}T00:00:00`);
  if (Number.isNaN(nascimento.getTime()) || nascimento > hoje) return null;
  if (nascimentoISO < nascimentoMinimoISO(hoje)) return null;

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
