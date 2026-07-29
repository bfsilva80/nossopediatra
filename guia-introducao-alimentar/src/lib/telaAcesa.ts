import { useEffect } from 'react';

/**
 * Mantém a tela acesa enquanto o modo emergência está aberto.
 *
 * Numa desobstrução as duas mãos estão no bebê: ninguém toca a tela para impedir
 * que ela apague, e o passo a passo some no meio da manobra. O Wake Lock evita isso.
 *
 * Degradação silenciosa por decisão: se a API não existe (Safari antigo) ou o
 * navegador nega (bateria baixa), o app segue funcionando igual — a tela apenas
 * volta a apagar sozinha. Nunca falha de forma visível durante uma emergência.
 */
export function useTelaAcesa(ativo: boolean): void {
  useEffect(() => {
    if (!ativo || !('wakeLock' in navigator)) return;

    let trava: WakeLockSentinel | null = null;
    let desmontado = false;

    const pedir = async () => {
      try {
        trava = await navigator.wakeLock.request('screen');
      } catch {
        // negado: sem tratamento — a tela volta ao comportamento padrão
      }
    };

    void pedir();

    // O navegador solta a trava ao trocar de aba ou atender uma ligação.
    // Como o app manda ligar 192, voltar da chamada precisa reativar.
    const aoVoltar = () => {
      if (document.visibilityState === 'visible' && !desmontado) void pedir();
    };
    document.addEventListener('visibilitychange', aoVoltar);

    return () => {
      desmontado = true;
      document.removeEventListener('visibilitychange', aoVoltar);
      void trava?.release().catch(() => {});
    };
  }, [ativo]);
}
