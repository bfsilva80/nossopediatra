/**
 * MANIFESTO das ilustrações das manobras — dados puros, sem import de imagem.
 *
 * O arquivo de imagem de cada cartão fica em `src/lib/imagensManobra.ts`; aqui vive
 * só o que é conteúdo (legenda, texto alternativo, âncora clínica). A separação
 * existe para que `checar-invariantes.mjs` consiga importar este módulo no Node,
 * que não resolve alias nem asset do Vite — e segue a regra do projeto de manter
 * conteúdo em `content/` e apresentação fora dele.
 *
 * O texto clínico continua vivendo só em `seguranca.ts`. Aqui não há conteúdo novo,
 * apenas a ligação entre cada arte e o trecho que ela ilustra.
 *
 * TRAVA DE DERIVA. Imagem é opaca para os gates: nenhum script lê pixel. Por isso
 * cada cartão guarda o HASH do texto canônico como ele estava quando a arte foi
 * revisada. Se aquele texto mudar, `checar-invariantes.mjs` falha e cobra nova
 * conferência da arte. Guardamos o hash, não o texto, para não criar uma segunda
 * cópia do conteúdo clínico.
 *
 * Ao aprovar uma mudança: rode `npm run invariantes`, que imprime o hash novo,
 * e atualize também `revisadoEm`.
 */

/** Onde o texto canônico vive. O script de invariantes resolve estes nomes. */
export type FonteAncora =
  | 'socorroMenor1Ano'
  | 'socorroMaior1Ano'
  | 'gagVsEngasgo.gag.conduta'
  | 'regrasDeOuroEngasgo';

export type IdCartao =
  | 'decisao'
  | 'posicionar-menor1ano'
  | 'golpes-menor1ano'
  | 'compressoes-menor1ano'
  | 'alternar-menor1ano'
  | 'sinal-maior1ano'
  | 'golpes-maior1ano'
  | 'heimlich-maior1ano'
  | 'alternar-maior1ano'
  | 'nao-faca'
  | 'cadeirao';

export interface CartaoManobra {
  id: IdCartao;
  /** Legenda curta sob o cartão. */
  legenda: string;
  /**
   * Descreve a TÉCNICA CORRETA conforme `seguranca.ts` — é o que o leitor de tela
   * anuncia no lugar do desenho. Não é descrição literal da cena.
   */
  alt: string;
  faixa: 'menor1ano' | 'maior1ano' | 'ambos';
  /** Trecho canônico ilustrado + hash na data da revisão. */
  ancora: { fonte: FonteAncora; indice?: number; hash: string };
  revisadoEm: string;
}

export const cartoesManobra: CartaoManobra[] = [
  {
    id: 'decisao',
    legenda: 'Tosse com som ou silêncio?',
    alt: 'Dois quadros lado a lado. À esquerda, o bebê tosse com força e emite som: a conduta é não intervir, incentivar a tosse e observar. À direita, o bebê está em silêncio e aflito, sem emitir som: a conduta é agir imediatamente com as manobras.',
    faixa: 'ambos',
    ancora: { fonte: 'socorroMenor1Ano', indice: 0, hash: '9a35b4830d3d' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'posicionar-menor1ano',
    legenda: 'Como apoiar o bebê',
    alt: 'Adulto sentado apoia o bebê de bruços sobre o antebraço, que descansa na própria coxa. A cabeça do bebê fica mais baixa que o corpo e a mão sustenta a mandíbula, mantendo a boca e o nariz livres.',
    faixa: 'menor1ano',
    ancora: { fonte: 'socorroMenor1Ano', indice: 2, hash: '89092e69044b' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'golpes-menor1ano',
    legenda: '5 golpes nas costas',
    alt: 'Com o bebê de bruços sobre o antebraço e a cabeça mais baixa que o corpo, o adulto aplica 5 golpes firmes com a base da mão entre as escápulas.',
    faixa: 'menor1ano',
    ancora: { fonte: 'socorroMenor1Ano', indice: 2, hash: '89092e69044b' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'compressoes-menor1ano',
    legenda: '5 compressões no peito',
    alt: 'Bebê de barriga para cima sobre o antebraço, com a cabeça mais baixa que o corpo. O adulto faz 5 compressões com a base de uma das mãos no centro do peito, logo abaixo da linha dos mamilos.',
    faixa: 'menor1ano',
    ancora: { fonte: 'socorroMenor1Ano', indice: 3, hash: '5362fb0e5601' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'alternar-menor1ano',
    legenda: 'Alternar até desobstruir',
    alt: 'Ciclo alternado em menores de 1 ano: 5 golpes nas costas com o bebê de bruços, seguidos de 5 compressões no peito com o bebê de barriga para cima, repetindo até o objeto sair ou o bebê chorar ou tossir.',
    faixa: 'menor1ano',
    ancora: { fonte: 'socorroMenor1Ano', indice: 4, hash: '85125c5d2af5' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'sinal-maior1ano',
    legenda: 'Reconhecer o engasgo',
    alt: 'Criança em pé leva as duas mãos ao pescoço, com a boca aberta e sem emitir som — sinal de engasgo grave. O adulto se aproxima. Se a criança tosse ou fala, a conduta é incentivar a tosse e não fazer manobras.',
    faixa: 'maior1ano',
    ancora: { fonte: 'socorroMaior1Ano', indice: 0, hash: '4e42ce2c344f' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'golpes-maior1ano',
    legenda: '5 golpes nas costas',
    alt: 'Adulto ajoelhado ao lado e ligeiramente atrás da criança apoia o tórax dela, inclina-a para a frente e aplica 5 golpes firmes entre as escápulas com a base da mão.',
    faixa: 'maior1ano',
    ancora: { fonte: 'socorroMaior1Ano', indice: 2, hash: 'e251d5fdf17d' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'heimlich-maior1ano',
    legenda: '5 compressões abdominais',
    alt: 'Adulto ajoelhado atrás da criança posiciona o punho fechado na linha média do abdome, acima do umbigo e abaixo da extremidade inferior do osso do peito, segura o punho com a outra mão e faz 5 compressões rápidas para dentro e para cima.',
    faixa: 'maior1ano',
    ancora: { fonte: 'socorroMaior1Ano', indice: 3, hash: '0bd9039a6830' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'alternar-maior1ano',
    legenda: 'Alternar até desobstruir',
    alt: 'Ciclo alternado em maiores de 1 ano: 5 golpes nas costas com a criança inclinada para a frente, seguidos de 5 compressões abdominais, repetindo até o objeto sair, a criança voltar a respirar ou ficar inconsciente.',
    faixa: 'maior1ano',
    ancora: { fonte: 'socorroMaior1Ano', indice: 4, hash: 'aed073e34b44' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'nao-faca',
    legenda: 'O que não fazer',
    alt: 'Quatro condutas proibidas durante um engasgo, cada uma marcada com um círculo de proibição: sacudir o bebê, tentar retirar o alimento com o dedo, segurar o bebê de cabeça para baixo e oferecer água.',
    faixa: 'ambos',
    ancora: { fonte: 'gagVsEngasgo.gag.conduta', hash: '62c973a9554f' },
    revisadoEm: '2026-07-29',
  },
  {
    id: 'cadeirao',
    legenda: 'Prevenção na refeição',
    alt: 'Bebê sentado ereto no cadeirão, com o cinto afivelado e os pés apoiados, e um adulto sentado ao lado ao alcance das mãos. O celular está guardado e a televisão desligada.',
    faixa: 'ambos',
    ancora: { fonte: 'regrasDeOuroEngasgo', hash: 'ffaa4dfe6188' },
    revisadoEm: '2026-07-29',
  },
];

// VALIDADO (pediatra responsável, 29/07/2026) — textos alternativos descrevem a
// técnica conforme socorroMenor1Ano/socorroMaior1Ano; arte aprovada para uso em
// Segurança e Treino. A tela de Emergência segue com os quadros SVG.
