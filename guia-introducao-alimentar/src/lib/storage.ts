import { useEffect, useState } from 'react';

/**
 * Persistência local (localStorage) com fallback silencioso.
 * Nenhum dado sai do aparelho da família.
 */

const PREFIX = 'guia-ia:';

export function lerStorage<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(PREFIX + chave);
    return bruto === null ? padrao : (JSON.parse(bruto) as T);
  } catch {
    return padrao;
  }
}

export function gravarStorage<T>(chave: string, valor: T): void {
  try {
    localStorage.setItem(PREFIX + chave, JSON.stringify(valor));
  } catch {
    // storage cheio/indisponível: app continua funcionando sem persistir
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
