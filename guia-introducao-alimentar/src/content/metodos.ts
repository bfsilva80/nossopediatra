/**
 * FONTE ÚNICA do conteúdo sobre métodos de introdução alimentar
 * (tradicional/colher, BLW e BLISS).
 *
 * Postura editorial: nenhum método é "o certo". O objetivo é ajudar a família
 * a escolher, aplicar com segurança e combinar sem culpa.
 *
 * Pontos pendentes de revisão clínica ficam em comentários "VALIDAR:" ao lado
 * do item — NUNCA dentro das strings (elas são renderizadas ao usuário).
 * O build falha se a forma antiga "[" + "VALIDAR" aparecer em qualquer arquivo de src/.
 *
 * Referências: Guia Alimentar MS 2019 (alimentação responsiva), Manual de
 * Alimentação da SBP, ensaios do BLISS (Univ. de Otago/NZ — ver tela Sobre).
 */

import { regrasDeOuroEngasgo } from './seguranca';

export type MetodoId = 'tradicional' | 'blw' | 'bliss';

export interface PratoExemplo {
  contexto: string;
  itens: string[];
  /** true = os itens são regras ordenadas (renderizar numerado) */
  ordenado?: boolean;
  exemploFinal?: string;
  /** exibe link para a aba Receitas quando há receita correspondente */
  temReceita?: boolean;
}

export interface Metodo {
  id: MetodoId;
  nome: string;
  subtitulo: string;
  icone: string;
  oQueE: string;
  quandoFazSentido: string[];
  vantagens: string[];
  limitacoes: string[];
  seguranca: string[];
  comoServir: string;
  pratoExemplo: PratoExemplo;
}

/** Frase-âncora, usada na tela de métodos e nos pontos de entrada. */
export const resumoMetodos =
  'Não existe método vencedor — existe o que cabe na sua família, aplicado com segurança.';

/** Atalho de decisão: uma linha por método, antes de qualquer detalhe. */
export const decisaoRapida: Array<{ id: MetodoId; icone: string; linha: string }> = [
  {
    id: 'tradicional',
    icone: '🥄',
    linha: 'Colher — você controla o que entra. Bom para creche e para começar com calma.',
  },
  {
    id: 'blw',
    icone: '🥕',
    linha: 'BLW — o bebê come sozinho, em tiras. Pede estudo dos formatos e tolerância à bagunça.',
  },
  {
    id: 'bliss',
    icone: '🧩',
    linha: 'BLISS — o BLW com receita pronta de prato: ferro + energia + segurança.',
  },
];

export const naDuvida =
  'Na dúvida? Combine. Colher na creche, tiras em casa — é o que a maioria das famílias faz.';

export const metodos: Metodo[] = [
  {
    id: 'tradicional',
    nome: 'Método tradicional',
    subtitulo: 'A comida vai na colher, oferecida pelo adulto',
    icone: '🥄',
    oQueE:
      'O adulto oferece a comida amassada na colher, evoluindo a textura ao longo das semanas: amassado espesso com garfo → amassado com pedacinhos → picado.',
    quandoFazSentido: [
      'A família quer começar com controle total do que entra',
      'A creche ou a cuidadora só consegue oferecer na colher',
      'O pediatra pediu acompanhamento fino de quantidade (ex.: ganho de peso baixo)',
      'O medo de engasgo ainda é grande — começar pela colher é legítimo, desde que a família treine as manobras mesmo assim',
    ],
    vantagens: [
      'Fácil saber quanto o bebê comeu — útil para garantir o ferro do dia',
      'Menos bagunça, refeições mais rápidas',
      'Simples de delegar para avós e cuidadoras',
    ],
    limitacoes: [
      'Risco de virar "empurra-colher", ignorando a saciedade do bebê',
      // VALIDAR: janela de introdução de texturas com pedaços (~9 meses) — conferir redação com a diretriz
      'Sem evolução de textura, a mastigação atrasa — pedaços macios devem entrar até por volta dos 9 meses',
      'O bebê participa menos da mesa da família',
    ],
    seguranca: [
      'Colher responsiva: aproxime e ESPERE o bebê abrir a boca — nunca force nem "raspe" a sobra no lábio',
      'Evolua a textura a cada semana: papa amassada é ponto de partida, não de chegada',
      'Pare quando o bebê virar o rosto ou fechar a boca — saciedade não se negocia',
      'Sem telas e sem "aviãozinho de distração" para fazer comer mais',
    ],
    comoServir:
      'Textura: amassada com garfo, espessa, nunca peneirada ou batida. Corte: os pedacinhos crescem semana a semana. Supervisão: adulto presente e atento — engasgo também acontece com colher.',
    pratoExemplo: {
      contexto: 'Almoço de 6–7 meses, na colher',
      itens: [
        'Frango desfiado fininho amassado com abóbora (ferro + legume)',
        'Arroz bem cozido amassado com feijão amassado e um pouco do caldo (energia + mais ferro)',
        'Sobremesa: mamão amassado; água no copo',
      ],
      temReceita: true,
    },
  },
  {
    id: 'blw',
    nome: 'BLW',
    subtitulo: 'Baby-Led Weaning: o bebê se serve com as mãos',
    icone: '🥕',
    oQueE:
      'Desde os 6 meses, o bebê pega sozinho alimentos macios em tiras e come junto com a família. O adulto decide o quê e o formato; o bebê decide se come e quanto.',
    quandoFazSentido: [
      'O bebê senta firme e leva objetos à boca com facilidade',
      'A família consegue comer junto com o bebê e tolera bagunça',
      'Os cuidadores estudaram os formatos seguros e treinaram as manobras de engasgo',
    ],
    vantagens: [
      'O bebê treina mastigar antes de engolir',
      'Respeito natural à saciedade',
      'Texturas variadas e comida da família desde cedo',
      'Refeição vira momento social, não procedimento',
    ],
    limitacoes: [
      'Nas primeiras semanas o bebê explora mais do que engole — difícil saber quanto ferro e energia entraram',
      'Exige preparo: formatos certos, paciência e chão lavável',
      'Sem planejamento, o prato vira "só legume macio" — pobre em ferro e calorias',
    ],
    seguranca: [
      // VALIDAR: triagem de prematuros/hipotonia/atraso motor antes do BLW puro — conferir redação
      'Bebê prematuro, com hipotonia, atraso motor ou síndrome: NÃO comece BLW puro por conta própria — a escolha deve ser feita com o pediatra (às vezes com fonoaudióloga)',
      'Tiras do tamanho do dedo de um adulto, com sobra para fora do punho do bebê',
      'Teste da maciez: se você amassa a tira entre a língua e o céu da boca, está segura',
      'Sentado ereto no cadeirão, nunca reclinado, nunca sozinho',
      'Fora do prato: tudo que é duro, redondo ou em moeda',
      'Caretas e gag barulhento fazem parte do aprendizado — engasgo real é silencioso',
    ],
    comoServir:
      'Textura: cozidos até "macio de amassar", frutas maduras. Corte: tiras grandes no início — mais seguras que cubinhos, porque o bebê ainda não controla pedaços soltos na boca; pedaços menores quando a pinça aparecer (~9 meses). Supervisão: a um braço de distância, sempre.',
    pratoExemplo: {
      contexto: 'Almoço de 6–7 meses, no BLW',
      itens: [
        // VALIDAR: formato "tira de carne para sugar" — redação revisada, confirmar com o revisor
        'Tira grande de carne macia, cozida até desmanchar (tipo carne de panela), maior que o punho do bebê, para segurar e sugar — se soltar pedaços, troque por almôndega assada desfiável',
        'Tira de batata-doce assada com azeite (energia)',
        'Florete de brócolis bem cozido, com o "cabinho" de pegador',
        'Meia banana com a casca bem lavada, cortada como "cabo"; água no copo',
      ],
    },
  },
  {
    id: 'bliss',
    nome: 'BLISS',
    subtitulo: 'O BLW com uma receita fixa de prato',
    icone: '🧩',
    oQueE:
      'A autonomia é a mesma do BLW — o bebê se serve — mas toda refeição segue três regras de montagem, criadas para cobrir os pontos fracos mais estudados do BLW: ferro, energia e engasgo.',
    quandoFazSentido: [
      'A família quer a autonomia do BLW com a tranquilidade de um roteiro',
      'A família quer garantir a OFERTA de ferro e energia em toda refeição — se já há anemia ou peso baixo, método nenhum substitui o acompanhamento do pediatra',
      // VALIDAR: sugestão editorial do guia (montar o BLW pelas 3 regras) — confirmar com o revisor
      'Se o caminho escolhido é o autoguiado, montar o prato pelas 3 regras cobre as críticas clássicas ao BLW livre — é assim que este guia sugere fazê-lo',
    ],
    vantagens: [
      'Garante a oferta de ferro e energia — os dois pontos fracos clássicos do BLW livre',
      'Lista explícita do que fica fora do prato por risco de engasgo',
      'Mantém autonomia, saciedade, texturas e mesa em família',
    ],
    limitacoes: [
      'Exige montar o prato com método — menos improviso que o BLW livre',
      'Pouco conhecido no Brasil',
    ],
    seguranca: [
      'Todas as regras do BLW valem inteiras: tiras macias, bebê ereto, supervisão constante',
      'A terceira regra é literalmente de segurança: nada duro, redondo ou em moeda no prato',
      // VALIDAR: leitura do ensaio BLISS (engasgo/gag) — conferir com a publicação original
      'No estudo do BLISS, engasgo real não foi mais frequente que na colher; caretas e gag foram mais comuns nas primeiras semanas — e, nos dois grupos, o risco veio de alimentos proibidos que escaparam para o prato',
    ],
    comoServir:
      'Igual ao BLW (tiras macias → pedaços menores com a pinça). O que muda é a montagem do prato: as 3 regras abaixo, em toda refeição.',
    pratoExemplo: {
      contexto: 'Monte o prato: as 3 regras, em toda refeição',
      ordenado: true,
      itens: [
        'Um alimento rico em FERRO: carne ou frango em tira macia, almôndega assada desfiável, ovo em omelete de forno, bolinho de feijão',
        'Um alimento rico em ENERGIA: batata-doce com azeite, abacate, aipim macio',
        'Uma fruta ou legume macio: brócolis, abóbora, banana, mamão',
      ],
      exemploFinal: 'Ex.: tira de carne desmanchando + batata-doce com azeite + brócolis bem cozido.',
    },
  },
];

/** BLW × BLISS lado a lado — células curtas; a nuance vive nos cards. */
export interface LinhaComparacao {
  criterio: string;
  blw: string;
  bliss: string;
}

export const comparacaoBlwBliss: LinhaComparacao[] = [
  {
    criterio: 'Ferro',
    blw: 'Depende do planejamento da família',
    bliss: 'Regra fixa: ferro em toda refeição',
  },
  {
    criterio: 'Energia',
    blw: 'Bebê que só explora pode ingerir pouco',
    bliss: 'Regra fixa: um alimento calórico por refeição',
  },
  {
    criterio: 'Engasgo',
    blw: 'Depende de aplicar os formatos seguros',
    bliss: 'Lista explícita do que fica fora do prato',
  },
];

/** Combinar métodos: legítimo, comum e sem culpa. */
export const combinarSemCulpa = {
  titulo: 'Combinar é permitido (e é o que a maioria faz)',
  texto:
    'Não existe fidelidade a método — existe refeição segura e responsiva. O bebê não fica "confuso": ele aprende dos dois jeitos.',
  exemplos: [
    'Almoço na creche na colher + jantar em casa com tiras para pegar',
    'Papa de colher com uma tira de legume ao lado para explorar, na mesma refeição',
    'Semana difícil? Volte para o que é mais simples para VOCÊ — consistência da família vale mais que pureza de método',
  ],
};

/** Regras que valem para qualquer método — as 4 primeiras vêm da tela Segurança (fonte única). */
export const regrasComuns = [
  ...regrasDeOuroEngasgo,
  'Ferro todos os dias, seja na papa ou na tira',
  'O adulto decide O QUE, QUANDO e ONDE; o bebê decide SE come e QUANTO',
];

/** Quando simplificar ou procurar ajuda profissional. */
export const sinaisDeAjuda = [
  {
    sinal: 'A refeição virou briga, choro ou negociação diária',
    conduta:
      'Simplifique: volte alguns dias para o formato mais tranquilo para a família, sem meta de quantidade. Pressão piora a aceitação.',
  },
  {
    sinal: 'Engasgos REAIS repetidos (silêncio, arroxeamento — não caretas e tosse)',
    conduta:
      'Pare os formatos que causaram e reveja os cortes na tela Segurança. Depois de qualquer engasgo real — principalmente se você precisou fazer as manobras — leve o bebê para avaliação médica no mesmo dia, mesmo que pareça bem.',
  },
  {
    sinal: 'Recusa de quase tudo por mais de 1–2 semanas, com peso parado ou caindo',
    conduta: 'Consulta — antes de trocar de método por conta própria.',
  },
  {
    sinal: 'Bebê prematuro, com hipotonia, atraso motor ou síndrome',
    conduta:
      'A escolha do método deve ser feita COM o pediatra (às vezes com fonoaudióloga) — não pelo app.',
  },
  {
    sinal: 'Ansiedade dos pais dominando a mesa',
    conduta:
      'Treine as manobras (isso reduz o medo de verdade), simplifique o cardápio e divida a mesa com outro adulto por uns dias.',
  },
];
