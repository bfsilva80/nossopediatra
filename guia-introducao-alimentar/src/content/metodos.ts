/**
 * FONTE ÚNICA do conteúdo sobre métodos de introdução alimentar
 * (tradicional/colher, BLW e BLISS).
 *
 * Postura editorial: nenhum método é "o certo". O objetivo é ajudar a família
 * a escolher, aplicar com segurança e combinar sem culpa.
 *
 * Referências: Guia Alimentar MS 2019 (alimentação responsiva), Manual de
 * Alimentação da SBP, literatura do BLISS (Baby-Led Introduction to SolidS,
 * Univ. de Otago/NZ). Itens com [VALIDAR] aguardam o pediatra revisor.
 */

export interface PratoExemplo {
  contexto: string;
  itens: string[];
}

export interface Metodo {
  id: string;
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

export const metodos: Metodo[] = [
  {
    id: 'tradicional',
    nome: 'Método tradicional',
    subtitulo: 'A comida vai na colher, oferecida pelo adulto',
    icone: '🥄',
    oQueE:
      'O cuidador prepara a comida amassada com garfo e oferece na colher, evoluindo a textura ao longo das semanas: amassado liso → amassado com pedacinhos → picado. É o formato mais conhecido pelas famílias brasileiras e o mais comum em creches.',
    quandoFazSentido: [
      'Quando a família se sente mais segura começando com controle total do que entra',
      'Quando a creche ou outra cuidadora só consegue oferecer na colher',
      'Quando o pediatra pediu acompanhamento mais fino de quantidade (por exemplo, ganho de peso baixo)',
      'Como porta de entrada para famílias muito ansiosas com engasgo — desde que treinem as manobras mesmo assim',
    ],
    vantagens: [
      'Fácil saber quanto o bebê comeu — útil para garantir o ferro do dia',
      'Menos bagunça e refeições um pouco mais rápidas',
      'Simples de delegar para avós e cuidadoras',
    ],
    limitacoes: [
      'Risco de virar "empurra-colher": o adulto decide o ritmo e ignora os sinais de saciedade do bebê',
      'Se a papa ficar lisa por tempo demais, a mastigação atrasa — bebês que só conhecem purê até perto dos 9 meses tendem a aceitar pior os pedaços depois [VALIDAR redação]',
      'O bebê participa menos da refeição da família',
    ],
    seguranca: [
      'Colher responsiva: aproxime e ESPERE o bebê abrir a boca — nunca force nem "raspe" a sobra no lábio',
      'Evolua a textura a cada semana; papa lisa é ponto de partida, não de chegada',
      'Pare quando o bebê virar o rosto, fechar a boca ou empurrar a colher: saciedade não se negocia',
      'Sem telas e sem "aviãozinho de distração" para fazer comer mais',
    ],
    comoServir:
      'Textura: amassada com garfo, espessa (não escorre da colher), nunca peneirada ou batida. Corte: os pedacinhos crescem semana a semana. Supervisão: adulto presente e atento, bebê sentado ereto — engasgo também acontece com colher.',
    pratoExemplo: {
      contexto: 'Almoço de um bebê de 6–7 meses, na colher',
      itens: [
        'Frango desfiado bem fininho amassado junto com abóbora (ferro + legume)',
        'Arroz bem cozido amassado com grãos de feijão (energia + mais ferro)',
        'Sobremesa: mamão amassado; água no copo',
      ],
    },
  },
  {
    id: 'blw',
    nome: 'BLW',
    subtitulo: 'Baby-Led Weaning: o bebê se serve com as mãos',
    icone: '🥕',
    oQueE:
      'Desde o início (por volta dos 6 meses), o bebê pega sozinho alimentos macios em tiras e leva à boca, comendo junto com a família — sem papa e sem colher do adulto. Quem decide o quê e o formato é o adulto; quem decide se come e quanto é o bebê.',
    quandoFazSentido: [
      'Quando o bebê mostra bom controle de tronco e coordenação para pegar e levar à boca',
      'Quando a família consegue fazer refeições junto com o bebê e tolera bagunça',
      'Quando os cuidadores estudaram os formatos seguros e treinaram as manobras de engasgo',
      'Bebês prematuros, com hipotonia ou dificuldades motoras: converse com o pediatra antes de optar pelo BLW puro [VALIDAR]',
    ],
    vantagens: [
      'Autonomia e coordenação: o bebê treina mastigar antes de engolir',
      'Respeito natural à saciedade — dificilmente alguém come demais pelo bebê',
      'Contato precoce com texturas variadas e com a comida da família',
      'Refeição vira momento social, não procedimento',
    ],
    limitacoes: [
      'Nas primeiras semanas o bebê explora mais do que engole: é difícil saber quanto ferro e energia entraram',
      'Exige preparo: formatos certos, paciência e chão lavável',
      'Sem planejamento, o prato pode virar "só legumes macios" — pobre em ferro e calorias',
    ],
    seguranca: [
      'Formato: tiras do tamanho do dedo de um adulto, que o bebê consiga segurar com sobra para fora do punho',
      'Teste da maciez: se você amassa a tira entre a língua e o céu da boca (ou entre dois dedos), está segura',
      'Bebê sentado ereto no cadeirão, nunca reclinado, nunca comendo sozinho',
      'Fora do prato: tudo que é duro, redondo ou em moeda (uva inteira, cenoura crua, castanhas, pipoca)',
      'Náusea e caretas (gag) fazem parte do aprendizado — engasgo real é silencioso; saiba diferenciar na tela Segurança',
    ],
    comoServir:
      'Textura: cozidos até "macio de amassar", assados macios, frutas maduras. Corte: tiras grandes no início (mais seguras que cubinhos pequenos!); quando a pinça com os dedos aparecer (~9 meses), pedaços menores. Supervisão: braço de distância, sempre.',
    pratoExemplo: {
      contexto: 'Almoço de um bebê de 6–7 meses, no BLW',
      itens: [
        'Tira de carne bovina macia e bem cozida, para segurar e "chupar" (ferro) [VALIDAR formato]',
        'Tira de batata-doce assada com azeite (energia)',
        'Florete de brócolis bem cozido com o "cabinho" de pegador',
        'Meia banana com a casca cortada como "cabo"; água no copo',
      ],
    },
  },
  {
    id: 'bliss',
    nome: 'BLISS',
    subtitulo: 'O BLW com três regras fixas por refeição',
    icone: '🧩',
    oQueE:
      'O BLISS (Baby-Led Introduction to SolidS) é uma versão estruturada do BLW, criada por pesquisadoras na Nova Zelândia justamente para responder às três críticas ao BLW: ferro, energia e engasgo. A autonomia é a mesma — o bebê se serve —, mas TODA refeição segue uma receita de montagem.',
    quandoFazSentido: [
      'Quando a família quer a autonomia do BLW com a tranquilidade de um roteiro',
      'Quando há preocupação específica com ferro ou ganho de peso, mas o bebê come bem sozinho',
      'É, na prática, a forma mais segura de "fazer BLW" — e a que este guia recomenda para quem escolhe o caminho autoguiado [VALIDAR recomendação]',
    ],
    vantagens: [
      'Garante oferta de ferro e de energia em toda refeição — os dois calcanhares do BLW livre',
      'Lista explícita de alimentos proibidos por risco de engasgo, sem depender de improviso',
      'Mantém todas as vantagens do BLW: autonomia, saciedade, texturas, mesa em família',
    ],
    limitacoes: [
      'Exige montar o prato com método — menos improviso que o BLW livre',
      'Menos conhecido no Brasil; o nome confunde ("é outro método?" — não: é BLW com regras)',
    ],
    seguranca: [
      'As mesmas regras do BLW valem inteiras: tiras macias, bebê ereto, supervisão constante',
      'A terceira regra do BLISS é literalmente de segurança: nenhum alimento duro, redondo ou em moeda no prato',
      'Estudos do BLISS não mostraram mais engasgo do que o método tradicional [VALIDAR]',
    ],
    comoServir:
      'Igual ao BLW (tiras macias → pedaços menores com a pinça), com a montagem do prato obedecendo às três regras abaixo, em toda refeição — café, almoço e jantar.',
    pratoExemplo: {
      contexto: 'A "receita" BLISS — as 3 regras em todo prato',
      itens: [
        '1️⃣ Um alimento RICO EM FERRO: carne/frango em tira macia, almôndega assada desfiável, ovo inteiro em omelete de forno, bolinho de feijão assado',
        '2️⃣ Um alimento RICO EM ENERGIA: batata-doce com azeite, abacate, aipim macio, arroz em bolinho',
        '3️⃣ Uma fruta ou legume macio: brócolis, abóbora, banana, mamão — nunca itens de alto risco de engasgo',
      ],
    },
  },
];

/** BLW × BLISS lado a lado — as três diferenças que importam. */
export interface LinhaComparacao {
  criterio: string;
  blw: string;
  bliss: string;
}

export const comparacaoBlwBliss: LinhaComparacao[] = [
  {
    criterio: 'Ferro',
    blw: 'Fica por conta do planejamento da família — sem atenção, o prato vira só legume e fruta',
    bliss: 'Regra fixa: um alimento rico em ferro em TODA refeição',
  },
  {
    criterio: 'Energia (calorias)',
    blw: 'Bebê que só explora pode ingerir pouco nas primeiras semanas',
    bliss: 'Regra fixa: um alimento calórico em toda refeição (tubérculo com azeite, abacate…)',
  },
  {
    criterio: 'Engasgo',
    blw: 'Depende de a família conhecer e aplicar os formatos seguros',
    bliss: 'Lista explícita de alimentos excluídos por risco; estudos não mostraram mais engasgo que a colher [VALIDAR]',
  },
];

/** Combinar métodos: legítimo, comum e sem culpa. */
export const combinarSemCulpa = {
  titulo: 'Combinar é permitido (e é o que a maioria faz)',
  texto:
    'Não existe fidelidade a método — existe refeição segura e responsiva. Papa na colher no almoço da creche e jantar estilo BLW em casa é uma combinação excelente, não uma traição. O bebê não fica "confuso": ele aprende dos dois jeitos.',
  exemplos: [
    'Almoço na creche na colher + jantar em casa com tiras para pegar',
    'Papa de colher com uma tira de legume ao lado para explorar, na mesma refeição',
    'Semana difícil? Volte para o que é mais simples para VOCÊ — consistência da família vale mais que pureza de método',
  ],
};

/** Regras que valem para qualquer método. */
export const regrasComuns = [
  'Bebê sentado ereto no cadeirão, à mesa com a família sempre que possível',
  'Adulto presente e a um braço de distância, da primeira à última garfada',
  'Sem telas na refeição — nem para distrair, nem para "fazer comer"',
  'Ferro todos os dias, seja na papa ou na tira',
  'O adulto decide O QUE, QUANDO e ONDE; o bebê decide SE come e QUANTO',
  'Aprenda as manobras de desobstrução antes da primeira refeição, seja qual for o método',
];

/** Quando simplificar ou procurar ajuda profissional. */
export const sinaisDeAjuda = [
  {
    sinal: 'A refeição virou briga, choro ou negociação diária',
    conduta: 'Simplifique: volte alguns dias para o formato mais tranquilo para a família, sem meta de quantidade. Pressão piora a aceitação.',
  },
  {
    sinal: 'Engasgos REAIS repetidos (silêncio, arroxeamento — não caretas e tosse)',
    conduta: 'Pare os formatos que causaram, reveja os cortes na tela Segurança e converse com o pediatra antes de retomar.',
  },
  {
    sinal: 'Recusa de quase tudo por mais de 1–2 semanas, com peso parado ou caindo',
    conduta: 'Consulta — antes de trocar de método por conta própria.',
  },
  {
    sinal: 'Bebê prematuro, com hipotonia, atraso motor ou síndrome',
    conduta: 'A escolha do método deve ser feita COM o pediatra (às vezes com fonoaudióloga) — não pelo app [VALIDAR redação].',
  },
  {
    sinal: 'Ansiedade dos pais dominando a mesa',
    conduta: 'Treine as manobras (isso reduz o medo de verdade), simplifique o cardápio e divida a mesa com outro adulto por uns dias.',
  },
];
