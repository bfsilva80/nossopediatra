/**
 * FONTE ÚNICA do conteúdo clínico sobre fases da introdução alimentar.
 * Toda tela do app consome estes dados — não duplique orientações em componentes.
 *
 * Referências: Guia Alimentar para Crianças Brasileiras Menores de 2 Anos
 * (Ministério da Saúde, 2019) e Manual de Alimentação da SBP.
 * Itens marcados com [VALIDAR] aguardam confirmação do pediatra revisor.
 */

export interface EsquemaRefeicao {
  refeicao: string;
  oferta: string;
}

export interface Fase {
  id: string;
  nome: string;
  faixa: string;
  minMeses: number;
  maxMeses: number;
  icone: string;
  cor: string;
  corSuave: string;
  consistencia: string;
  resumo: string;
  oQueOferecer: string[];
  quantidades: string;
  esquemaDia: EsquemaRefeicao[];
  dicas: string[];
}

export const fases: Fase[] = [
  {
    id: 'fase1',
    nome: 'Primeiras papas',
    faixa: '6 meses',
    minMeses: 6,
    maxMeses: 6,
    icone: '🥣',
    cor: 'bg-accent',
    corSuave: 'bg-accent-soft',
    consistencia:
      'Papa amassada com garfo, espessa (fica no talher sem escorrer). Não peneire nem bata no liquidificador — a papa peneirada perde textura e densidade calórica.',
    resumo:
      'O leite (materno ou fórmula) continua sendo a principal fonte de nutrição. As primeiras refeições servem para o bebê conhecer sabores e texturas — e já devem conter ferro todos os dias.',
    oQueOferecer: [
      'Refeição principal completa desde o início: um alimento fonte de ferro TODOS os dias (carne bovina, frango, peixe ou ovo inteiro bem cozido) + cereal ou tubérculo (arroz, batata, aipim) + leguminosa (feijão, lentilha) + legume ou verdura',
      'Ovo sempre inteiro (gema e clara juntas), bem cozido — não é preciso começar "só pela gema"',
      'Frutas amassadas ou raspadas nos lanches (banana, mamão, maçã, pera, abacate) — a fruta, não o suco',
      'Água potável (filtrada ou fervida) no copo, junto com as refeições',
      'Alimentos alergênicos (ovo, peixe, amendoim em pasta diluída) já podem entrar — veja a tela Segurança',
    ],
    quantidades:
      'Comece com 2 a 3 colheres de sopa e aumente aos poucos, respeitando fome e saciedade. Não force nem "termine o prato" pelo bebê.',
    esquemaDia: [
      { refeicao: 'Ao acordar', oferta: 'Leite materno em livre demanda (ou fórmula)' },
      { refeicao: 'Lanche da manhã', oferta: 'Fruta amassada ou raspada' },
      { refeicao: 'Almoço', oferta: 'Papa principal (ferro + cereal/tubérculo + leguminosa + legume)' },
      { refeicao: 'Lanche da tarde', oferta: 'Fruta amassada ou raspada' },
      { refeicao: 'Restante do dia', oferta: 'Leite materno em livre demanda (ou fórmula)' },
    ],
    dicas: [
      'Não é necessário esperar vários dias entre alimentos novos. Para os alergênicos, ofereça um de cada vez, em pequena quantidade, e observe o bebê nas horas seguintes',
      'Sem sal e sem açúcar (nem mel). Tempere com cebola, alho e ervas frescas',
      'Engasgos e caretas fazem parte do aprendizado — conheça a diferença entre reflexo de proteção e engasgo real na tela Segurança',
      'O bebê pode comer pouco no começo. O objetivo agora é aprender, não substituir o leite',
    ],
  },
  {
    id: 'fase2',
    nome: 'Duas refeições e texturas',
    faixa: '7–8 meses',
    minMeses: 7,
    maxMeses: 8,
    icone: '🥘',
    cor: 'bg-warn',
    corSuave: 'bg-warn-soft',
    consistencia:
      'Papa amassada com pedaços macios cada vez maiores. Carnes desfiadas ou bem picadas. Ofereça também tiras de alimentos macios para o bebê pegar com a mão.',
    resumo:
      'Entra a segunda refeição principal (jantar). O bebê explora texturas e começa a comer com as mãos — bagunça é parte do processo.',
    oQueOferecer: [
      'Almoço e jantar completos, sempre com fonte de ferro diária (carnes, ovo inteiro, feijões)',
      'Frutas variadas nos lanches, em pedaços macios ou amassadas',
      'Alimentos em tiras para pegar com a mão: batata-doce cozida, cenoura bem cozida, banana, abacate',
      'Água no copo junto com as refeições',
    ],
    quantidades:
      'Aumente gradualmente até cerca de meia xícara (250 ml) por refeição principal, sempre guiado pelos sinais do bebê.',
    esquemaDia: [
      { refeicao: 'Ao acordar', oferta: 'Leite materno em livre demanda (ou fórmula)' },
      { refeicao: 'Lanche da manhã', oferta: 'Fruta' },
      { refeicao: 'Almoço', oferta: 'Refeição principal completa' },
      { refeicao: 'Lanche da tarde', oferta: 'Fruta' },
      { refeicao: 'Jantar', oferta: 'Refeição principal completa' },
      { refeicao: 'Noite', oferta: 'Leite materno em livre demanda (ou fórmula)' },
    ],
    dicas: [
      'Evolua a textura: bebê que só come papa lisa por muito tempo tem mais dificuldade de aceitar pedaços depois',
      'Deixe o bebê tocar a comida e tentar se alimentar — coordenação se aprende treinando',
      'Continue oferecendo alimentos que foram recusados: podem ser necessárias 8 a 10 tentativas em dias diferentes',
      'Nada de sucos, biscoitos, petit suisse ou produtos "para bebê" ultraprocessados',
    ],
  },
  {
    id: 'fase3',
    nome: 'Rumo à comida da família',
    faixa: '9–11 meses',
    minMeses: 9,
    maxMeses: 11,
    icone: '🍽️',
    cor: 'bg-primary',
    corSuave: 'bg-primary-soft',
    consistencia:
      'Comida picada em pedaços pequenos, desfiada ou levemente amassada — cada vez mais parecida com a da família (preparada sem sal ou com o mínimo).',
    resumo:
      'O bebê mastiga melhor (mesmo sem todos os dentes), come com mais autonomia e passa a acompanhar as refeições da casa.',
    oQueOferecer: [
      'A mesma comida da família, adaptada: sem sal em excesso, sem frituras, cortada com segurança',
      'Ferro diário segue obrigatório: carnes, ovo inteiro, feijões',
      'Frutas em pedaços nos lanches',
      'Alimentos para comer com as mãos em quase toda refeição',
    ],
    quantidades:
      'Cerca de meia xícara (250 ml) por refeição principal, podendo chegar perto de ¾ de xícara. O apetite varia de dia para dia — isso é normal.',
    esquemaDia: [
      { refeicao: 'Café da manhã', oferta: 'Fruta + leite materno (ou fórmula); pode incluir mingau simples ou pão caseiro sem recheio' },
      { refeicao: 'Lanche da manhã', oferta: 'Fruta' },
      { refeicao: 'Almoço', oferta: 'Comida da família adaptada (arroz, feijão, carne, legumes)' },
      { refeicao: 'Lanche da tarde', oferta: 'Fruta' },
      { refeicao: 'Jantar', oferta: 'Comida da família adaptada' },
      { refeicao: 'Noite', oferta: 'Leite materno em livre demanda (ou fórmula)' },
    ],
    dicas: [
      'Faça as refeições junto com o bebê sempre que possível: ele aprende comendo com a família',
      'Sem telas durante as refeições — nem para "distrair e fazer comer"',
      'Respeite a saciedade: pressão e chantagem atrapalham a relação da criança com a comida',
      'Revise os cortes seguros na tela Segurança: uva, tomate-cereja e afins sempre em quartos',
    ],
  },
  {
    id: 'fase4',
    nome: 'Comida da família',
    faixa: '12–24 meses',
    minMeses: 12,
    maxMeses: 24,
    icone: '🍲',
    cor: 'bg-ink',
    corSuave: 'bg-primary-soft',
    consistencia:
      'A mesma comida da família, em pedaços pequenos e seguros. Alimentos muito duros, redondos ou em moeda ainda precisam de corte adaptado.',
    resumo:
      'A criança come o que a família come. A qualidade do prato da casa passa a ser o principal cuidado — e o apetite costuma diminuir, porque o crescimento desacelera.',
    oQueOferecer: [
      'Refeições da família: arroz, feijão, carnes, legumes, verduras e frutas variadas',
      'Leite de vaca integral pode ser oferecido a partir de 12 meses — limite em torno de 500 ml/dia entre leite e derivados, para não atrapalhar o ferro [VALIDAR: volume máximo com o pediatra revisor]',
      'Água várias vezes ao dia',
      'Aleitamento materno pode e deve continuar até 2 anos ou mais, se mãe e criança desejarem',
    ],
    quantidades:
      'De ¾ a 1 xícara por refeição principal, com grande variação diária. Comer menos em alguns dias é esperado nessa idade.',
    esquemaDia: [
      { refeicao: 'Café da manhã', oferta: 'Fruta + leite; pode incluir pão caseiro, aipim, batata-doce, ovos' },
      { refeicao: 'Lanche da manhã', oferta: 'Fruta' },
      { refeicao: 'Almoço', oferta: 'Refeição da família' },
      { refeicao: 'Lanche da tarde', oferta: 'Fruta ou preparação caseira simples' },
      { refeicao: 'Jantar', oferta: 'Refeição da família' },
      { refeicao: 'Noite', oferta: 'Leite materno, se ainda mamar' },
    ],
    dicas: [
      'Açúcar, doces, mel e ultraprocessados: recomendação é não oferecer antes dos 2 anos',
      'Mel especificamente é proibido antes de 12 meses pelo risco de botulismo; depois disso, evite pelo açúcar',
      'A "birra alimentar" do segundo ano é fase normal do desenvolvimento — mantenha a oferta variada, sem brigas',
      'Sal: o mínimo possível; o paladar se educa agora',
    ],
  },
];

/** Sinais de prontidão para iniciar a introdução alimentar. */
/* Os métodos (tradicional, BLW, BLISS) vivem em ./metodos.ts */
export const sinaisProntidao = [
  { id: 'senta', label: 'Senta com pouco ou nenhum apoio' },
  { id: 'cabeca', label: 'Sustenta bem a cabeça e o tronco' },
  { id: 'interesse', label: 'Mostra interesse pela comida dos adultos' },
  { id: 'maos', label: 'Leva objetos à boca com as mãos' },
  { id: 'lingua', label: 'Diminuiu o reflexo de empurrar a comida com a língua' },
];
