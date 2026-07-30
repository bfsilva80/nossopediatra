import { cartoesManobra } from '@/content/ilustracoes';
import { imagensManobra } from '@/lib/imagensManobra';

/**
 * Deixa a arte da tela de Emergência no cache ANTES de ela ser aberta.
 *
 * O problema: o service worker é cache-first para `/assets/*`, mas nada entra no
 * cache sem ter sido buscado uma vez. Quem nunca abriu a Emergência não tem as
 * imagens — e o engasgo é exatamente a hora em que a rede pode estar ruim ou o
 * app estar offline. Um passo a passo que aparece sem imagem justo no aperto
 * derrota o motivo de ter imagem.
 *
 * Por que aqui e não uma lista de pré-cache no service worker: os nomes têm hash
 * de conteúdo, gerado no build, e o `sw.js` é copiado literal de `public/` — ele
 * não teria como saber os nomes sem um passo de build que os injetasse. Buscar
 * daqui usa os nomes que o próprio bundle conhece e cai no mesmo cache.
 *
 * Não pré-cacheia o app inteiro: só os cartões marcados `emergencia` no manifesto
 * (hoje 7, ~1,4 MB), uma vez por versão. Como o nome carrega o hash, arte
 * corrigida gera nome novo e nunca fica presa no cache.
 *
 * Respeita quem pediu economia: em `save-data` ou 2G não busca nada — nesses
 * casos a imagem ainda carrega sob demanda, só não fica adiantada.
 */

interface ConexaoInfo {
  saveData?: boolean;
  effectiveType?: string;
}

function deveAquecer(): boolean {
  const conexao = (navigator as Navigator & { connection?: ConexaoInfo }).connection;
  if (!conexao) return true;
  if (conexao.saveData) return false;
  return conexao.effectiveType !== 'slow-2g' && conexao.effectiveType !== '2g';
}

export function aquecerEmergencia(): void {
  if (typeof window === 'undefined' || !deveAquecer()) return;

  const urls = cartoesManobra.filter(c => c.emergencia).map(c => imagensManobra[c.id]);

  const buscar = () => {
    for (const url of urls) {
      // `cache: 'force-cache'` evita revalidação: o arquivo é imutável por nome.
      // Falha de rede aqui é irrelevante — a imagem volta a ser buscada na hora.
      fetch(url, { cache: 'force-cache' }).catch(() => {});
    }
  };

  const agendar = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
  agendar(buscar);
}
