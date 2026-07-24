/**
 * FONTE ÚNICA do banco de alimentos ("posso dar X? como ofereço?").
 * Foco em alimentos comuns na mesa brasileira.
 *
 * Referências: Guia Alimentar MS 2019, Manual de Alimentação da SBP,
 * consensos de alergia alimentar e materiais de prevenção de engasgo.
 * Itens com [VALIDAR] aguardam confirmação do pediatra revisor.
 */

export type GrupoAlimento =
  | 'Frutas'
  | 'Legumes e verduras'
  | 'Cereais e tubérculos'
  | 'Feijões'
  | 'Carnes e ovos'
  | 'Leite e derivados'
  | 'Outros';

export type QuandoPode = '6m' | '9m' | '12m' | '24m' | 'nao';

export interface Alimento {
  id: string;
  nome: string;
  emoji: string;
  grupo: GrupoAlimento;
  quando: QuandoPode;
  /** Texto curto substituindo o rótulo padrão do "quando", se necessário */
  rotuloQuando?: string;
  /** Nome do grupo alergênico, quando for um dos principais */
  alergenico?: string;
  /** Boa fonte de ferro */
  ferro?: boolean;
  /** Atenção de engasgo/corte, quando houver */
  engasgo?: string;
  /** Como oferecer, do início à comida da família */
  como: string;
  nota?: string;
}

export const rotulosQuando: Record<QuandoPode, string> = {
  '6m': 'A partir dos 6 meses',
  '9m': 'A partir dos ~9 meses',
  '12m': 'A partir dos 12 meses',
  '24m': 'Só depois dos 2 anos',
  nao: 'Não oferecer',
};

export const alimentos: Alimento[] = [
  // ——— Frutas ———
  {
    id: 'banana',
    nome: 'Banana',
    emoji: '🍌',
    grupo: 'Frutas',
    quando: '6m',
    como: 'Amassada no início; depois em metades no comprimento para segurar com a mão; madura sempre.',
  },
  {
    id: 'mamao',
    nome: 'Mamão',
    emoji: '🧡',
    grupo: 'Frutas',
    quando: '6m',
    como: 'Amassado ou em tiras macias, sem sementes. Ajuda o intestino.',
  },
  {
    id: 'abacate',
    nome: 'Abacate',
    emoji: '🥑',
    grupo: 'Frutas',
    quando: '6m',
    como: 'Amassado puro (sem açúcar) ou em tiras maduras. Ótima gordura para o crescimento.',
  },
  {
    id: 'maca',
    nome: 'Maçã',
    emoji: '🍎',
    grupo: 'Frutas',
    quando: '6m',
    engasgo: 'Crua e em pedaço duro é risco: rale fino ou cozinhe até os molares (~12–18m).',
    como: 'Raspada/ralada fina no início; cozida em pedaços macios; crua em fatias finas bem mais tarde.',
  },
  {
    id: 'pera',
    nome: 'Pera',
    emoji: '🍐',
    grupo: 'Frutas',
    quando: '6m',
    como: 'Raspada ou ralada quando firme; madura e macia pode ir em tiras.',
  },
  {
    id: 'manga',
    nome: 'Manga',
    emoji: '🥭',
    grupo: 'Frutas',
    quando: '6m',
    como: 'Amassada ou em tiras escorregadias (segure com guardanapo). Madura e sem fiapos duros.',
  },
  {
    id: 'laranja',
    nome: 'Laranja e tangerina',
    emoji: '🍊',
    grupo: 'Frutas',
    quando: '6m',
    engasgo: 'Retire sementes e, no início, as películas dos gomos.',
    como: 'Gomos sem pele e sem sementes, picados. A fruta — o suco não (nem natural, antes de 1 ano).',
    nota: 'Rica em vitamina C: sobremesa perfeita para absorver o ferro do almoço.',
  },
  {
    id: 'morango',
    nome: 'Morango',
    emoji: '🍓',
    grupo: 'Frutas',
    quando: '6m',
    engasgo: 'Inteiro e firme pode obstruir: corte em quartos.',
    como: 'Picado ou amassado desde os 6 meses — esperar 1 ano é mito antigo.',
    nota: 'A acidez pode avermelhar a pele ao redor da boca sem ser alergia; observe se há outros sinais.',
  },
  {
    id: 'uva',
    nome: 'Uva',
    emoji: '🍇',
    grupo: 'Frutas',
    quando: '6m',
    engasgo: 'ALTO RISCO inteira: é do diâmetro exato da via aérea. Sempre em 4, no comprimento, até ~4 anos.',
    como: 'Em quartos no sentido do comprimento, sem sementes.',
  },
  {
    id: 'melancia',
    nome: 'Melancia e melão',
    emoji: '🍉',
    grupo: 'Frutas',
    quando: '6m',
    engasgo: 'Retire TODAS as sementes.',
    como: 'Em tiras ou pedaços macios, sem sementes.',
  },
  {
    id: 'goiaba',
    nome: 'Goiaba',
    emoji: '🟢',
    grupo: 'Frutas',
    quando: '6m',
    engasgo: 'Sementes duras: no início prefira a polpa raspada.',
    como: 'Polpa madura amassada; inteira madura em pedaços quando a mastigação evoluir.',
  },
  {
    id: 'acai',
    nome: 'Açaí (polpa pura)',
    emoji: '🫐',
    grupo: 'Frutas',
    quando: '6m',
    rotuloQuando: 'Polpa pura, sem xarope',
    como: 'Somente polpa 100%, batida com banana ou outra fruta — sem xarope de guaraná, sem açúcar, sem granola dura.',
    nota: 'O açaí "de lanchonete" é sobremesa açucarada: esse fica para depois dos 2 anos.',
  },
  {
    id: 'coco',
    nome: 'Coco',
    emoji: '🥥',
    grupo: 'Frutas',
    quando: '6m',
    engasgo: 'Pedaços duros não; ralado fino ou leite de coco em preparações.',
    como: 'Ralado fino em papas e mingaus; água de coco eventualmente, sem substituir água.',
  },

  // ——— Legumes e verduras ———
  {
    id: 'abobora',
    nome: 'Abóbora',
    emoji: '🎃',
    grupo: 'Legumes e verduras',
    quando: '6m',
    como: 'Cozida e amassada; depois em cubos macios. Base querida das primeiras papas.',
  },
  {
    id: 'cenoura',
    nome: 'Cenoura',
    emoji: '🥕',
    grupo: 'Legumes e verduras',
    quando: '6m',
    engasgo: 'CRUA é risco alto (dura). Sempre bem cozida nos primeiros anos, ou ralada fininha.',
    como: 'Bem cozida: amassada, em tiras macias ou cubinhos.',
  },
  {
    id: 'batata',
    nome: 'Batata',
    emoji: '🥔',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    como: 'Cozida e amassada com garfo (purê espesso, sem peneirar); depois em cubos.',
  },
  {
    id: 'batatadoce',
    nome: 'Batata-doce',
    emoji: '🍠',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    como: 'Cozida ou assada, amassada ou em tiras macias — finger food ideal.',
  },
  {
    id: 'aipim',
    nome: 'Aipim (mandioca)',
    emoji: '🤎',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    engasgo: 'Retire as fibras centrais duras.',
    como: 'Bem cozido e macio, amassado ou em pedaços que desmancham.',
    nota: 'Sempre cozido — mandioca crua não é comestível.',
  },
  {
    id: 'inhame',
    nome: 'Inhame e cará',
    emoji: '🟤',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    como: 'Cozidos e amassados; textura cremosa boa para as primeiras papas.',
  },
  {
    id: 'abobrinha',
    nome: 'Abobrinha e chuchu',
    emoji: '🥒',
    grupo: 'Legumes e verduras',
    quando: '6m',
    como: 'Cozidos, amassados ou em tiras macias com casca retirada.',
  },
  {
    id: 'brocolis',
    nome: 'Brócolis e couve-flor',
    emoji: '🥦',
    grupo: 'Legumes e verduras',
    quando: '6m',
    como: 'Floretes bem cozidos — o "cabinho" vira pegador natural para a mão do bebê.',
  },
  {
    id: 'couve',
    nome: 'Couve e espinafre',
    emoji: '🥬',
    grupo: 'Legumes e verduras',
    quando: '6m',
    como: 'Picados fininhos e refogados, misturados ao feijão ou à papa.',
  },
  {
    id: 'beterraba',
    nome: 'Beterraba',
    emoji: '🟣',
    grupo: 'Legumes e verduras',
    quando: '6m',
    como: 'Cozida e amassada ou ralada fina. Vai tingir cocô e xixi de rosa — não se assuste.',
  },
  {
    id: 'tomate',
    nome: 'Tomate',
    emoji: '🍅',
    grupo: 'Legumes e verduras',
    quando: '6m',
    engasgo: 'Tomate-cereja inteiro é ALTO risco: sempre em 4.',
    como: 'Sem pele e sementes no início (refogado); depois em pedaços. Cereja sempre em quartos.',
  },
  {
    id: 'milho',
    nome: 'Milho',
    emoji: '🌽',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    engasgo: 'Grãos inteiros escapam da mastigação no início.',
    como: 'No início como polenta/angu ou grãos bem amassados; na espiga, segurando, quando já mastigar bem (~12m+).',
  },
  {
    id: 'quiabo',
    nome: 'Quiabo',
    emoji: '🫛',
    grupo: 'Legumes e verduras',
    quando: '6m',
    como: 'Bem cozido, picado — a "baba" não faz mal nenhum.',
  },

  // ——— Cereais ———
  {
    id: 'arroz',
    nome: 'Arroz',
    emoji: '🍚',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    como: 'Bem cozido e amassado com o garfo no início; solto conforme a mastigação evolui.',
  },
  {
    id: 'aveia',
    nome: 'Aveia',
    emoji: '🥣',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    como: 'Em mingau com água ou fruta amassada, ou em bolinhos assados.',
    nota: 'Costuma ter traços de glúten — o que até ajuda na exposição precoce ao trigo.',
  },
  {
    id: 'pao',
    nome: 'Pão e trigo',
    emoji: '🍞',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    alergenico: 'Trigo (glúten)',
    engasgo: 'Miolo fofo em bola gruda no céu da boca: prefira casquinha ou torradinha leve.',
    como: 'Pão caseiro/francês: casca ou pedaços pequenos; macarrão bem cozido é ótima porta de entrada do trigo.',
  },
  {
    id: 'macarrao',
    nome: 'Macarrão',
    emoji: '🍝',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    alergenico: 'Trigo (glúten)',
    como: 'Bem cozido; formatos como penne e fusilli são fáceis de segurar. Molho caseiro, sem sal no primeiro ano.',
  },
  {
    id: 'tapioca',
    nome: 'Tapioca',
    emoji: '🫓',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    engasgo: 'Pedaço grande e borrachudo pode enrolar: corte pequeno.',
    como: 'Macia, em pedaços pequenos, com recheio nutritivo (ovo, queijo depois dos ~9m).',
    nota: 'É quase só amido — conta como energia, não como refeição completa.',
  },
  {
    id: 'fuba',
    nome: 'Fubá (polenta/angu)',
    emoji: '🌽',
    grupo: 'Cereais e tubérculos',
    quando: '6m',
    como: 'Polenta cremosa sem queijo no início; depois em cubos assados macios.',
  },

  // ——— Feijões ———
  {
    id: 'feijao',
    nome: 'Feijão',
    emoji: '🫘',
    grupo: 'Feijões',
    quando: '6m',
    ferro: true,
    como: 'Grãos bem cozidos e amassados com um pouco do caldo — presença diária no prato brasileiro.',
    nota: 'Com fruta cítrica de sobremesa, o ferro absorve melhor.',
  },
  {
    id: 'lentilha',
    nome: 'Lentilha',
    emoji: '🟠',
    grupo: 'Feijões',
    quando: '6m',
    ferro: true,
    como: 'Cozida e amassada; a vermelha desmancha sozinha e é ótima para o início.',
  },
  {
    id: 'graodebico',
    nome: 'Grão-de-bico',
    emoji: '🟡',
    grupo: 'Feijões',
    quando: '6m',
    ferro: true,
    engasgo: 'Grão inteiro e firme pode escapar: amasse no início.',
    como: 'Bem cozido e amassado (tipo homus sem tahine no começo).',
  },
  {
    id: 'ervilha',
    nome: 'Ervilha',
    emoji: '🟢',
    grupo: 'Feijões',
    quando: '6m',
    engasgo: 'Redonda: amasse levemente com o garfo no início.',
    como: 'Fresca ou congelada, cozida e amassada.',
  },

  // ——— Carnes e ovos ———
  {
    id: 'carne',
    nome: 'Carne bovina',
    emoji: '🥩',
    grupo: 'Carnes e ovos',
    quando: '6m',
    ferro: true,
    engasgo: 'Pedaço fibroso grande é risco: desfiada, moída ou tiras macias.',
    como: 'Desde a primeira papa: bem cozida e desfiada fininha ou moída refogada.',
    nota: 'A fonte de ferro mais eficiente da introdução alimentar.',
  },
  {
    id: 'frango',
    nome: 'Frango',
    emoji: '🍗',
    grupo: 'Carnes e ovos',
    quando: '6m',
    ferro: true,
    como: 'Cozido e desfiado fino; sobrecoxa é mais macia e tem mais ferro que o peito.',
  },
  {
    id: 'peixe',
    nome: 'Peixe',
    emoji: '🐟',
    grupo: 'Carnes e ovos',
    quando: '6m',
    alergenico: 'Peixe',
    ferro: true,
    engasgo: 'Espinhas: desfie conferindo uma a uma.',
    como: 'Cozido e desfiado. Tilápia, merluza e sardinha são boas opções acessíveis.',
    nota: 'Peixes predadores grandes (cação, peixe-espada, atum em excesso) concentram mercúrio: modere. [VALIDAR orientação de frequência]',
  },
  {
    id: 'ovo',
    nome: 'Ovo',
    emoji: '🥚',
    grupo: 'Carnes e ovos',
    quando: '6m',
    alergenico: 'Ovo',
    ferro: true,
    como: 'INTEIRO (gema + clara) e sempre bem cozido: cozido amassado, mexido firme, omelete de forno.',
    nota: 'Não existe mais "primeiro a gema, depois a clara" — o ovo vai inteiro desde o início.',
  },
  {
    id: 'figado',
    nome: 'Fígado',
    emoji: '🟤',
    grupo: 'Carnes e ovos',
    quando: '6m',
    ferro: true,
    como: 'Bem cozido e amassado/desfiado, cerca de 1 vez por semana.',
    nota: 'Campeão de ferro e vitamina A — por isso mesmo, semanal e não diário.',
  },
  {
    id: 'porco',
    nome: 'Carne de porco',
    emoji: '🐷',
    grupo: 'Carnes e ovos',
    quando: '6m',
    ferro: true,
    como: 'Cortes magros (lombo, pernil), bem cozidos e desfiados. Embutidos (linguiça, bacon) não contam: ficam para depois dos 2 anos.',
  },
  {
    id: 'camarao',
    nome: 'Camarão e frutos do mar',
    emoji: '🦐',
    grupo: 'Carnes e ovos',
    quando: '6m',
    alergenico: 'Frutos do mar',
    engasgo: 'Textura borrachuda: pique fino.',
    como: 'Bem cozidos e picados finos, de fonte confiável. É alergênico: primeira oferta pequena e observada.',
  },

  // ——— Leite e derivados ———
  {
    id: 'leitevaca',
    nome: 'Leite de vaca',
    emoji: '🥛',
    grupo: 'Leite e derivados',
    quando: '12m',
    alergenico: 'Leite',
    como: 'Como bebida, só após 12 meses (integral), até ~500 ml/dia somando derivados.',
    nota: 'Antes disso, não substitui leite materno nem fórmula. [VALIDAR volume máximo]',
  },
  {
    id: 'iogurte',
    nome: 'Iogurte natural',
    emoji: '🍶',
    grupo: 'Leite e derivados',
    quando: '9m',
    rotuloQuando: 'A partir dos ~9 meses [VALIDAR]',
    alergenico: 'Leite',
    como: 'Natural, integral, SEM açúcar — pode misturar fruta amassada. "Iogurtinhos de bebê" e petit suisse são sobremesas açucaradas: não.',
  },
  {
    id: 'queijo',
    nome: 'Queijo',
    emoji: '🧀',
    grupo: 'Leite e derivados',
    quando: '9m',
    rotuloQuando: 'A partir dos ~9 meses [VALIDAR]',
    alergenico: 'Leite',
    como: 'Queijos leves e menos salgados (minas frescal, ricota) em pedaços pequenos ou ralados.',
  },

  // ——— Outros ———
  {
    id: 'amendoim',
    nome: 'Amendoim',
    emoji: '🥜',
    grupo: 'Outros',
    quando: '6m',
    rotuloQuando: 'Pasta desde os 6m · inteiro só aos 4 anos',
    alergenico: 'Amendoim',
    engasgo: 'INTEIRO é dos maiores riscos de engasgo que existem: nunca antes dos 4 anos.',
    como: 'Pasta 100% amendoim, fina e diluída na fruta ou papa. Introdução precoce reduz risco de alergia.',
  },
  {
    id: 'castanhas',
    nome: 'Castanhas e nozes',
    emoji: '🌰',
    grupo: 'Outros',
    quando: '6m',
    rotuloQuando: 'Trituradas/pasta desde os 6m · inteiras só aos 4 anos',
    alergenico: 'Castanhas',
    engasgo: 'Inteiras: NUNCA antes dos 4 anos.',
    como: 'Farinha fina ou pasta diluída em papas e frutas.',
  },
  {
    id: 'gergelim',
    nome: 'Gergelim (tahine)',
    emoji: '🫙',
    grupo: 'Outros',
    quando: '6m',
    alergenico: 'Gergelim',
    como: 'Tahine diluído em papas, frutas ou homus.',
  },
  {
    id: 'azeite',
    nome: 'Azeite e óleos',
    emoji: '🫒',
    grupo: 'Outros',
    quando: '6m',
    como: 'Um fio cru sobre a papa pronta dá energia extra. Frituras, não.',
  },
  {
    id: 'agua',
    nome: 'Água',
    emoji: '💧',
    grupo: 'Outros',
    quando: '6m',
    como: 'Potável (filtrada ou fervida), no copo, junto das refeições e ao longo do dia.',
  },
  {
    id: 'mel',
    nome: 'Mel',
    emoji: '🍯',
    grupo: 'Outros',
    quando: '24m',
    rotuloQuando: 'Antes de 12m: PROIBIDO (botulismo) · até 2a: evitar (açúcar)',
    como: 'Antes dos 12 meses é risco real de botulismo infantil, inclusive em preparações. Depois, segue sendo açúcar: espere os 2 anos.',
  },
  {
    id: 'acucar',
    nome: 'Açúcar e doces',
    emoji: '🍭',
    grupo: 'Outros',
    quando: '24m',
    como: 'Recomendação brasileira: nada de açúcar, doces, achocolatados ou sobremesas açucaradas antes dos 2 anos.',
  },
  {
    id: 'sal',
    nome: 'Sal',
    emoji: '🧂',
    grupo: 'Outros',
    quando: '12m',
    rotuloQuando: 'Zero até 12m · mínimo depois',
    como: 'Nada de sal no primeiro ano (nem "só um pouquinho"). Depois, o mínimo — e temperos prontos/caldos em cubo nunca.',
  },
  {
    id: 'suco',
    nome: 'Suco (mesmo natural)',
    emoji: '🧃',
    grupo: 'Outros',
    quando: '24m',
    rotuloQuando: 'Evitar antes dos 2 anos',
    como: 'A fruta sim, o suco não: concentra açúcar sem a fibra e ocupa o lugar do leite e da comida.',
  },
  {
    id: 'ultraprocessados',
    nome: 'Ultraprocessados',
    emoji: '🚫',
    grupo: 'Outros',
    quando: '24m',
    rotuloQuando: 'Evitar antes dos 2 anos (e depois também)',
    como: 'Biscoitos recheados, salgadinhos, embutidos, macarrão instantâneo, refrigerante, "iogurtinhos": não fazem parte do cardápio de bebê.',
  },
  {
    id: 'cafe',
    nome: 'Café e chás com cafeína',
    emoji: '☕',
    grupo: 'Outros',
    quando: 'nao',
    como: 'Café, chá preto/mate e refrigerantes de cola não têm idade mínima "liberada" na infância — não ofereça.',
  },
  {
    id: 'pipoca',
    nome: 'Pipoca',
    emoji: '🍿',
    grupo: 'Outros',
    quando: '24m',
    rotuloQuando: 'Só depois dos 4 anos',
    engasgo: 'Casca leve e dura, fácil de aspirar: um dos maiores causadores de engasgo.',
    como: 'Não antes dos 4 anos.',
  },
];

/** Busca sem acentos e sem caixa. */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
