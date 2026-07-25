/**
 * FONTE ÚNICA das receitas, corrigidas conforme a revisão clínica:
 * - toda refeição principal tem fonte de ferro;
 * - ovo sempre inteiro e bem cozido (nada de "só a gema");
 * - nada de peneirar/liquidificar nem caldos ralos como refeição;
 * - sem frituras, sem açúcar, sem sal antes de 12 meses (mínimo depois).
 */

export interface Receita {
  id: string;
  faseId: string;
  /** ids de alimentos.ts usados no casamento "o que tenho em casa" */
  ingredientesChave: string[];
  nome: string;
  tipo: 'Refeição' | 'Lanche';
  tempo: string;
  icone: string;
  ingredientes: string[];
  preparo: string[];
  dica: string;
}

export const receitas: Receita[] = [
  // ——— Fase 1 · 6 meses ———
  {
    id: 'f1-frango-abobora',
    ingredientesChave: ['frango', 'abobora', 'arroz', 'feijao'],
    faseId: 'fase1',
    nome: 'Papa de frango com abóbora e arroz',
    tipo: 'Refeição',
    tempo: '35 min',
    icone: '🍗',
    ingredientes: [
      '80 g de peito ou coxa de frango sem pele',
      '1 fatia grossa de abóbora',
      '2 colheres de sopa de arroz',
      '1 colher de sopa de feijão cozido (grãos)',
      'Cebola, alho e um fio de azeite',
    ],
    preparo: [
      'Refogue cebola e alho no azeite e junte o frango em cubos',
      'Acrescente água quente, o arroz e a abóbora; cozinhe até tudo ficar bem macio',
      'Desfie o frango bem fininho e amasse os demais ingredientes com o garfo, junto com os grãos de feijão',
      'A papa deve ficar espessa — não peneire nem bata no liquidificador',
    ],
    dica: 'O frango desfiado garante o ferro do dia. Congele em porções pequenas por até 1 mês.',
  },
  {
    id: 'f1-carne-batata',
    ingredientesChave: ['carne', 'batata', 'cenoura', 'lentilha'],
    faseId: 'fase1',
    nome: 'Papa de carne com batata e cenoura',
    tipo: 'Refeição',
    tempo: '40 min',
    icone: '🥩',
    ingredientes: [
      '80 g de carne bovina macia (patinho/músculo) em cubos pequenos',
      '1 batata pequena',
      '½ cenoura',
      '1 colher de sopa de lentilha',
      'Cebola, alho, salsinha e um fio de azeite',
    ],
    preparo: [
      'Refogue a carne com cebola e alho, cubra com água quente e cozinhe até amaciar',
      'Junte batata, cenoura e lentilha e cozinhe até ficarem bem macias',
      'Desfie ou pique a carne bem miúda e amasse o restante com o garfo',
      'Finalize com salsinha picada e o azeite',
    ],
    dica: 'Carne vermelha é a fonte de ferro mais eficiente da IA — apareça com ela várias vezes na semana.',
  },
  {
    id: 'f1-ovo-batatadoce',
    ingredientesChave: ['ovo', 'batatadoce'],
    faseId: 'fase1',
    nome: 'Ovo inteiro com purê de batata-doce',
    tipo: 'Refeição',
    tempo: '20 min',
    icone: '🥚',
    ingredientes: [
      '1 ovo',
      '1 batata-doce pequena',
      'Um fio de azeite',
    ],
    preparo: [
      'Cozinhe o ovo por 10–12 minutos (bem cozido, gema firme)',
      'Cozinhe a batata-doce até ficar bem macia e amasse com o garfo',
      'Amasse o ovo INTEIRO (gema e clara) e misture ao purê com o azeite',
    ],
    dica: 'Ovo é alergênico: ofereça pela manhã na primeira vez e observe o bebê nas horas seguintes. Aceito sem reação, mantenha na rotina da semana.',
  },
  {
    id: 'f1-frutas',
    ingredientesChave: ['banana'],
    faseId: 'fase1',
    nome: 'Frutas amassadas do dia a dia',
    tipo: 'Lanche',
    tempo: '5 min',
    icone: '🍌',
    ingredientes: ['Banana, mamão, abacate, pera ou maçã bem madura'],
    preparo: [
      'Lave bem, descasque e amasse com o garfo na hora de servir',
      'Maçã e pera podem ser raspadas com colher se estiverem firmes',
      'Não coe, não bata e não transforme em suco — a fruta inteira alimenta mais',
    ],
    dica: 'Fruta madura dispensa qualquer açúcar. Varie as cores ao longo da semana.',
  },

  // ——— Fase 2 · 7–8 meses ———
  {
    id: 'f2-peixe-batatadoce',
    ingredientesChave: ['peixe', 'batatadoce', 'brocolis'],
    faseId: 'fase2',
    nome: 'Peixe com batata-doce e brócolis',
    tipo: 'Refeição',
    tempo: '25 min',
    icone: '🐟',
    ingredientes: [
      '80 g de filé de peixe branco (tilápia, merluza)',
      '1 batata-doce pequena',
      '2 floretes de brócolis',
      'Cebola, um fio de azeite e limão',
    ],
    preparo: [
      'Cozinhe o peixe no vapor ou em pouca água com cebola',
      'Desfie conferindo espinha por espinha',
      'Cozinhe batata-doce e brócolis até ficarem macios e amasse grosseiramente',
      'Misture tudo com o azeite e gotas de limão',
    ],
    dica: 'Peixe também é alergênico: primeira oferta em pequena quantidade, observando depois. Depois, 1–2 vezes por semana.',
  },
  {
    id: 'f2-lentilha',
    ingredientesChave: ['lentilha', 'batata', 'cenoura', 'ovo'],
    faseId: 'fase2',
    nome: 'Lentilha cremosa com legumes e ovo',
    tipo: 'Refeição',
    tempo: '30 min',
    icone: '🫘',
    ingredientes: [
      '¼ de xícara de lentilha',
      '1 batata pequena e ½ cenoura',
      '1 ovo cozido',
      'Cebola, alho e um fio de azeite',
    ],
    preparo: [
      'Refogue cebola e alho, junte a lentilha lavada e os legumes em cubos',
      'Cubra com água quente e cozinhe até tudo ficar bem macio',
      'Amasse com o garfo deixando pedacinhos macios',
      'Misture o ovo inteiro cozido e amassado',
    ],
    dica: 'Uma fruta rica em vitamina C de sobremesa (laranja, acerola) ajuda a absorver o ferro da lentilha.',
  },
  {
    id: 'f2-mingau-aveia',
    ingredientesChave: ['aveia', 'banana'],
    faseId: 'fase2',
    nome: 'Mingau de aveia com banana',
    tipo: 'Lanche',
    tempo: '10 min',
    icone: '🥣',
    ingredientes: [
      '2 colheres de sopa de aveia em flocos finos',
      '½ xícara de água',
      '½ banana madura amassada',
      'Canela (opcional)',
    ],
    preparo: [
      'Cozinhe a aveia na água em fogo baixo, mexendo, por 3–5 minutos',
      'Misture a banana amassada fora do fogo',
      'Sirva morno, na consistência de papa espessa',
    ],
    dica: 'Sem açúcar e sem mel — a banana adoça. Aveia costuma conter traços de glúten, o que ajuda na exposição precoce ao trigo.',
  },
  {
    id: 'f2-tiras',
    ingredientesChave: ['batatadoce', 'cenoura', 'banana'],
    faseId: 'fase2',
    nome: 'Tiras para comer com a mão',
    tipo: 'Lanche',
    tempo: '15 min',
    icone: '🥕',
    ingredientes: [
      'Batata-doce, cenoura, abobrinha ou chuchu',
      'Banana ou abacate maduros',
    ],
    preparo: [
      'Corte os legumes em tiras do tamanho de um dedo adulto',
      'Cozinhe no vapor até ficarem macios (amassáveis entre os dedos), sem desmanchar',
      'Ofereça 2–3 tiras por vez, com o bebê sentado e supervisionado',
    ],
    dica: 'O teste é simples: se você amassa a tira entre a língua e o céu da boca, o bebê consegue também.',
  },

  // ——— Fase 3 · 9–11 meses ———
  {
    id: 'f3-arroz-feijao',
    ingredientesChave: ['arroz', 'feijao', 'carne', 'abobora', 'cenoura'],
    faseId: 'fase3',
    nome: 'Arroz, feijão e carne desfiada (prato da casa)',
    tipo: 'Refeição',
    tempo: '40 min',
    icone: '🍚',
    ingredientes: [
      '2 colheres de sopa de arroz cozido',
      '2 colheres de sopa de feijão com pouco caldo',
      '2 colheres de sopa de carne cozida desfiada',
      'Legumes cozidos picados (abóbora, cenoura, couve fininha)',
    ],
    preparo: [
      'Monte o prato com a comida da família preparada sem sal (tempere a porção dos adultos depois)',
      'Pique ou desfie a carne em pedaços bem pequenos',
      'Amasse levemente os grãos de feijão e sirva os legumes picados',
    ],
    dica: 'A partir daqui, a melhor "receita" é a comida da casa adaptada — mesma panela, corte seguro.',
  },
  {
    id: 'f3-omelete-forno',
    ingredientesChave: ['ovo', 'cenoura', 'brocolis'],
    faseId: 'fase3',
    nome: 'Omelete de forno com legumes',
    tipo: 'Refeição',
    tempo: '30 min',
    icone: '🍳',
    ingredientes: [
      '3 ovos',
      '1 cenoura ralada fina e 2 floretes de brócolis picados',
      '1 colher de sopa de queijo minas padrão ralado (opcional)',
      'Salsinha e um fio de azeite',
    ],
    preparo: [
      'Bata os ovos e misture os legumes e a salsinha',
      'Despeje em forma pequena untada com azeite',
      'Asse a 180 °C por cerca de 20 minutos, até firmar',
      'Corte em tiras para o bebê segurar',
    ],
    dica: 'Rende lanches e jantares rápidos; guarda 2 dias na geladeira.',
  },
  {
    id: 'f3-bolinho-arroz',
    ingredientesChave: ['arroz', 'ovo', 'aveia', 'cenoura'],
    faseId: 'fase3',
    nome: 'Bolinho de arroz ASSADO',
    tipo: 'Lanche',
    tempo: '35 min',
    icone: '🍙',
    ingredientes: [
      '1 xícara de arroz cozido',
      '1 ovo',
      '2 colheres de sopa de aveia',
      'Cenoura ralada fina e salsinha',
    ],
    preparo: [
      'Misture tudo até dar liga (junte mais aveia se precisar)',
      'Modele bolinhos achatados e disponha em assadeira untada com azeite',
      'Asse a 200 °C por 20–25 minutos, virando na metade',
    ],
    dica: 'Versão assada no lugar de frituras — bolinho de chuva e afins ficam fora do cardápio nessa idade.',
  },
  // ——— Fase 4 · 12–24 meses ———
  {
    id: 'f4-moqueca',
    ingredientesChave: ['peixe', 'arroz'],
    faseId: 'fase4',
    nome: 'Moqueca suave de peixe',
    tipo: 'Refeição',
    tempo: '35 min',
    icone: '🍲',
    ingredientes: [
      '150 g de peixe branco em cubos',
      '1 tomate sem pele e ½ pimentão sem sementes picados',
      '½ cebola e coentro ou salsinha',
      '2 colheres de sopa de leite de coco natural',
      'Um fio de azeite',
    ],
    preparo: [
      'Refogue cebola, tomate e pimentão no azeite',
      'Junte o peixe e um pouco de água; cozinhe por 10 minutos',
      'Acrescente o leite de coco e as ervas e apague o fogo',
      'Sirva com arroz e pirão da própria moqueca (engrosse o caldo com farinha de mandioca)',
    ],
    dica: 'Prato da família inteira: sal mínimo na panela e ajuste no prato dos adultos.',
  },
  {
    id: 'f4-bolo-banana',
    ingredientesChave: ['banana', 'ovo', 'aveia'],
    faseId: 'fase4',
    nome: 'Bolo de banana sem açúcar',
    tipo: 'Lanche',
    tempo: '40 min',
    icone: '🍌',
    ingredientes: [
      '3 bananas bem maduras',
      '2 ovos',
      '1 xícara de aveia em flocos',
      '2 colheres de sopa de azeite ou óleo',
      '1 colher de chá de fermento e canela',
    ],
    preparo: [
      'Amasse as bananas e misture com ovos e azeite',
      'Junte a aveia, a canela e por último o fermento',
      'Asse em forma pequena untada, a 180 °C, por 25–30 minutos',
    ],
    dica: 'Doçura só da fruta. Antes dos 2 anos a recomendação vale para todo o cardápio: nada de açúcar, mel ou achocolatados.',
  },
  {
    id: 'f4-feijao-completo',
    ingredientesChave: ['feijao', 'carne', 'abobora'],
    faseId: 'fase4',
    nome: 'Feijão completo da família',
    tipo: 'Refeição',
    tempo: '50 min',
    icone: '🫘',
    ingredientes: [
      '1 xícara de feijão cozido',
      '100 g de músculo ou patinho em cubos pequenos',
      'Abóbora e couve picadas',
      'Cebola, alho e um fio de azeite',
    ],
    preparo: [
      'Refogue a carne com cebola e alho até dourar',
      'Junte o feijão, a abóbora e água; cozinhe até a carne desmanchar',
      'Acrescente a couve no final',
      'Sirva com arroz, com a carne desfiada em pedaços pequenos',
    ],
    dica: 'Versão de "feijoada" adequada à idade: sem embutidos (salsicha, linguiça, bacon ficam fora antes dos 2 anos).',
  },
];

export const principiosReceitas = [
  'Sem sal até 12 meses; depois, o mínimo possível — temperos naturais à vontade',
  'Sem açúcar, mel ou adoçantes até 2 anos',
  'Toda refeição principal tem uma fonte de ferro (carnes, ovo inteiro, feijões)',
  'Amasse com o garfo — peneira e liquidificador ficam guardados',
  'Congele em porções pequenas e identifique com data (até 1 mês)',
  'Esfrie e teste a temperatura antes de servir',
];

/** Chips do "o que tem na sua cozinha?" — ids canônicos de alimentos.ts. */
export const ingredientesCozinha = [
  'frango',
  'carne',
  'ovo',
  'peixe',
  'feijao',
  'lentilha',
  'arroz',
  'aveia',
  'batata',
  'batatadoce',
  'cenoura',
  'abobora',
  'brocolis',
  'banana',
];

/** Ids de chips que contam como fonte de ferro (espelho de alimentos.ts). */
export const chipsComFerro = ['frango', 'carne', 'ovo', 'peixe', 'feijao', 'lentilha'];

/**
 * Ranking por compatibilidade parcial: receitas que casam sobem,
 * nenhuma some — zero-resultado é impossível por construção.
 */
export function contarMatches(receita: Receita, despensa: string[]): number {
  return receita.ingredientesChave.filter(i => despensa.includes(i)).length;
}
