import { useEffect, useState } from 'react';

/**
 * Persistência local (localStorage). Nenhum dado sai do aparelho da família.
 *
 * A gravação pode falhar de verdade: storage cheio, navegação privada em alguns
 * navegadores, ou cota negada. Antes isso era engolido em silêncio — a família
 * registrava o diário, nada era salvo e nada avisava. Agora a falha é sinalizada
 * para quem estiver ouvindo (ver `AvisoStorage`), sem quebrar o app: a sessão
 * continua funcionando em memória.
 */

const PREFIX = 'guia-ia:';

type Ouvinte = (falhando: boolean) => void;
const ouvintes = new Set<Ouvinte>();
let falhando = false;

function sinalizar(estado: boolean): void {
  if (estado === falhando) return;
  falhando = estado;
  for (const ouvinte of ouvintes) ouvinte(estado);
}

/** Assina o estado de falha de gravação. Devolve a função de cancelamento. */
export function assinarFalhaStorage(ouvinte: Ouvinte): () => void {
  ouvintes.add(ouvinte);
  ouvinte(falhando);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export function lerStorage<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(PREFIX + chave);
    return bruto === null ? padrao : (JSON.parse(bruto) as T);
  } catch {
    return padrao;
  }
}

/** Devolve `false` quando não foi possível persistir. */
export function gravarStorage<T>(chave: string, valor: T): boolean {
  try {
    localStorage.setItem(PREFIX + chave, JSON.stringify(valor));
    sinalizar(false);
    return true;
  } catch {
    // A falha vira aviso na interface; o app segue com o valor em memória.
    sinalizar(true);
    return false;
  }
}

/** useState espelhado no localStorage. */
export function usePersistido<T>(chave: string, padrao: T) {
  const [valor, setValor] = useState<T>(() => lerStorage(chave, padrao));
  useEffect(() => {
    gravarStorage(chave, valor);
  }, [chave, valor]);
  return [valor, setValor] as const;
}

/** `true` enquanto a última tentativa de gravação tiver falhado. */
export function useFalhaStorage(): boolean {
  const [falha, setFalha] = useState(falhando);
  useEffect(() => assinarFalhaStorage(setFalha), []);
  return falha;
}
