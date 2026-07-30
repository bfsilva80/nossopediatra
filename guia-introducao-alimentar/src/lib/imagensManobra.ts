import type { IdCartao } from '@/content/ilustracoes';

import alternarMaior1Ano from '@/assets/manobras/alternar-maior1ano.jpg';
import alternarMenor1Ano from '@/assets/manobras/alternar-menor1ano.jpg';
import cadeirao from '@/assets/manobras/cadeirao.jpg';
import compressoesMenor1Ano from '@/assets/manobras/compressoes-menor1ano.jpg';
import decisao from '@/assets/manobras/decisao.jpg';
import golpesMaior1Ano from '@/assets/manobras/golpes-maior1ano.jpg';
import golpesMenor1Ano from '@/assets/manobras/golpes-menor1ano.jpg';
import heimlichMaior1Ano from '@/assets/manobras/heimlich-maior1ano.jpg';
import naoFaca from '@/assets/manobras/nao-faca.jpg';
import posicionarMenor1Ano from '@/assets/manobras/posicionar-menor1ano.jpg';
import sinalMaior1Ano from '@/assets/manobras/sinal-maior1ano.jpg';

/**
 * Wiring de asset, separado do conteúdo em `content/ilustracoes.ts`.
 *
 * O Vite gera nome com hash de conteúdo para cada arquivo: se um cartão for
 * corrigido clinicamente, o nome muda e a família recebe a versão nova em vez de
 * uma arte velha presa no cache do service worker.
 *
 * O Record é exaustivo por tipo — acrescentar um id no manifesto sem apontar a
 * imagem aqui quebra o build.
 */
export const imagensManobra: Record<IdCartao, string> = {
  decisao,
  'posicionar-menor1ano': posicionarMenor1Ano,
  'golpes-menor1ano': golpesMenor1Ano,
  'compressoes-menor1ano': compressoesMenor1Ano,
  'alternar-menor1ano': alternarMenor1Ano,
  'sinal-maior1ano': sinalMaior1Ano,
  'golpes-maior1ano': golpesMaior1Ano,
  'heimlich-maior1ano': heimlichMaior1Ano,
  'alternar-maior1ano': alternarMaior1Ano,
  'nao-faca': naoFaca,
  cadeirao,
};
