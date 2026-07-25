/**
 * "Hoje tem feijoada — o que o bebê come disso?"
 * Adaptações prato-a-prato da comida brasileira de verdade.
 *
 * Princípio central (fonte: Guia Alimentar para Crianças Brasileiras Menores
 * de 2 Anos, MS 2019): o bebê come a comida da família ADAPTADA — separar a
 * porção dele ANTES de sal, temperos prontos e pimenta, ajustar textura e
 * formato ao momento, e deixar de fora embutidos e frituras.
 *
 * VALIDAR: revisão pediátrica prato a prato (porções, idades e exclusões).
 */

export interface PratoFamilia {
  id: string;
  nome: string;
  icone: string;
  resumo: string;
  /** o que separar para o bebê, direto do prato */
  podeDoPrato: string[];
  /** como preparar a porção dele */
  comoAdaptar: string[];
  /** o que NÃO vai para o prato do bebê */
  ficaDeFora: string[];
  /** observação de idade/momento, quando houver */
  nota?: string;
}

export const principioFamilia =
  'A regra que resolve quase todo prato: separe a porção do bebê antes do sal e dos temperos prontos, ajuste a textura à fase, e tire embutidos, frituras e pedaços duros. O resto é comida de verdade — e é exatamente o que ele deve comer.';

export const pratosFamilia: PratoFamilia[] = [
  {
    id: 'feijoada',
    nome: 'Feijoada',
    icone: '🫘',
    resumo: 'O prato mais perguntado — e o bebê pode participar sim.',
    podeDoPrato: [
      'Grãos de feijão preto bem cozidos e amassados, com um pouco do caldo',
      'Carne magra do cozido (músculo/lagarto) desfiada bem fina',
      'Arroz, couve refogada picadinha e laranja de sobremesa',
    ],
    comoAdaptar: [
      'Separe feijão e carne ANTES de juntar as carnes salgadas, ou escolha os itens menos salgados do caldeirão',
      'Amasse os grãos com garfo; desfie a carne até ficar desmanchando',
      'A laranja de sobremesa é bônus: vitamina C ajuda a absorver o ferro do feijão',
    ],
    ficaDeFora: [
      'Linguiça, paio, bacon e carne-seca (embutidos e excesso de sal)',
      'Torresmo (fritura + duro: risco de engasgo)',
      'Caldo muito salgado — se só houver o caldo temperado, dilua na porção dele',
    ],
  },
  {
    id: 'churrasco',
    nome: 'Churrasco',
    icone: '🍖',
    resumo: 'Domingo na churrasqueira também é lugar de bebê.',
    podeDoPrato: [
      'Parte INTERNA da carne bem passada, desfiada ou em tiras macias',
      'Frango sem pele, bem cozido e desfiado',
      'Acompanhamentos: arroz, vinagrete sem excesso (tomate sem pele), pão de alho NÃO — mas mandioca cozida sim',
    ],
    comoAdaptar: [
      'Reserve um pedaço para o bebê antes do sal grosso, ou use a parte interna (o sal fica na superfície)',
      'Corte no sentido contrário às fibras e desfie — carne de churrasco fica firme rápido',
      'Confira que não sobrou nenhum pedaço duro ou cartilagem na porção',
    ],
    ficaDeFora: [
      'Linguiça e queijo coalho (sal e formato de risco)',
      'A casquinha externa salgada e as partes tostadas/queimadas',
      'Espetinhos: NUNCA deixe palito de espeto ao alcance do bebê',
    ],
  },
  {
    id: 'strogonoff',
    nome: 'Strogonoff com arroz',
    icone: '🍛',
    resumo: 'Clássico de almoço de família — quase pronto para o bebê.',
    podeDoPrato: [
      'Frango ou carne do strogonoff desfiado, com um pouco do molho',
      'Arroz branco',
      'Batata cozida no lugar da batata palha',
    ],
    comoAdaptar: [
      'Separe a carne antes de acertar o sal e antes de molhos prontos (ketchup/mostarda industrializados)',
      'Se a receita leva creme de leite, uma porção pequena com o molho é aceitável a partir dos 9 meses; antes disso, prefira a carne "limpa" com arroz',
      'Desfie bem — os cubos de strogonoff são grandes para a pinça do bebê',
    ],
    ficaDeFora: [
      'Batata palha (frita, dura e salgada)',
      'Versões com muito ketchup/mostarda — açúcar e sal escondidos',
    ],
    nota: 'VALIDAR: idade mínima para creme de leite em preparações (9 meses é a referência usada para laticínios em preparo).',
  },
  {
    id: 'macarronada',
    nome: 'Macarronada à bolonhesa',
    icone: '🍝',
    resumo: 'Massa + carne moída = refeição completa com pouca adaptação.',
    podeDoPrato: [
      'Macarrão bem cozido (formatos curtos: penne, fusilli, parafuso)',
      'Molho de tomate caseiro com carne moída refogada',
      'Queijo ralado por cima a partir dos 9 meses, com moderação',
    ],
    comoAdaptar: [
      'Separe a porção antes do sal; molho caseiro (tomate, cebola, alho) é o ideal',
      'Espaguete longo: corte em pedaços que o bebê maneje; formatos curtos são mais fáceis de pegar',
      'Carne moída já é textura amiga — só confira que não formou bolinhos compactos',
    ],
    ficaDeFora: [
      'Molho de tomate pronto de lata/sachê (sal e açúcar altos) — se for o único, use bem pouco e dilua',
      'Queijos amarelos muito salgados em fatia grossa',
    ],
  },
  {
    id: 'pf',
    nome: 'PF: arroz, feijão, bife e salada',
    icone: '🍽️',
    resumo: 'O prato feito brasileiro é praticamente o cardápio ideal do bebê.',
    podeDoPrato: [
      'Arroz e feijão (grãos amassados com caldo)',
      'Bife: desfiado ou em tiras macias no sentido contrário às fibras',
      'Legumes da guarnição bem cozidos; tomate da salada sem pele e sem semente',
    ],
    comoAdaptar: [
      'Bife bem passado fica duro: cozinhe um pedaço a mais no molho, ou bata levemente antes de grelhar',
      'Alface crua é difícil antes da mastigação madura — prefira folhas refogadas picadinhas',
      'Azeite cru por cima da comida do bebê: pode e faz bem',
    ],
    ficaDeFora: [
      'Farofa pronta industrializada (sal alto); farofa caseira só úmida e em pequena quantidade',
      'Maionese e molhos de salada prontos',
    ],
  },
  {
    id: 'peixe-moqueca',
    nome: 'Peixada / moqueca',
    icone: '🐟',
    resumo: 'Peixe é ouro na introdução — a moqueca da família serve de base.',
    podeDoPrato: [
      'Peixe branco desfiado COM CONFERÊNCIA MINUCIOSA de espinhas',
      'Legumes do cozido (pimentão sem pele, tomate, cebola bem cozidos)',
      'Arroz e pirão (se o caldo não estiver salgado demais)',
    ],
    comoAdaptar: [
      'Desfie o peixe com os dedos, apalpando cada lasca — espinha é o risco número 1 aqui',
      'Separe antes do sal; leite de coco natural em pequena quantidade é aceitável a partir dos 6 meses',
      'Dendê: em pequena quantidade na porção do bebê está ok a partir de 1 ano; antes, prefira a versão sem',
    ],
    ficaDeFora: [
      'Camarão inteiro NÃO é proibido por ser alergênico (ofereça como os demais alergênicos: cedo e um por vez), mas o formato borrachudo exige picar muito fino',
      'Pimenta e caldo muito temperado',
    ],
    nota: 'VALIDAR: orientação sobre dendê e leite de coco em preparações por faixa etária.',
  },
  {
    id: 'canja',
    nome: 'Canja de galinha',
    icone: '🍲',
    resumo: 'A canja já é quase comida de bebê — só engrossar.',
    podeDoPrato: [
      'Tudo: frango desfiado, arroz, cenoura e batata do cozido',
    ],
    comoAdaptar: [
      'Sirva a parte SÓLIDA amassada com um pouco do caldo — caldo ralo sozinho não sustenta nem nutre',
      'Separe antes do sal e sem caldo de tablete (glutamato e sal altíssimos)',
      'Desfie o frango fino e confira ossinhos e cartilagens',
    ],
    ficaDeFora: [
      'Caldo industrializado em tablete/pó',
      'Pele do frango',
    ],
  },
  {
    id: 'cuscuz',
    nome: 'Cuscuz nordestino com ovo',
    icone: '🌽',
    resumo: 'Café da manhã de família que vira refeição do bebê.',
    podeDoPrato: [
      'Cuscuz umedecido (com leite materno, fórmula ou água) a partir dos 6 meses',
      'Ovo mexido bem cozido misturado ao cuscuz',
      'Manteiga em pequena quantidade',
    ],
    comoAdaptar: [
      'Cuscuz seco esfarela e pode engasgar — sirva sempre bem úmido, quase papa nos primeiros meses',
      'O ovo vai inteiro (clara e gema), sempre bem cozido — é um dos melhores ferros do café',
      'Sem açúcar por cima; sem café ou achocolatado de acompanhamento',
    ],
    ficaDeFora: [
      'Charque/carne de sol tradicional (sal altíssimo) — se quiser, use versão dessalgada de verdade e desfiada',
      'Leite de vaca puro como bebida antes dos 12 meses',
    ],
  },
  {
    id: 'lasanha',
    nome: 'Lasanha',
    icone: '🧀',
    resumo: 'Almoço de domingo — com dois cuidados, o bebê participa.',
    podeDoPrato: [
      'Massa, molho caseiro e carne moída do recheio',
      'Queijo derretido em pequena quantidade a partir dos 9 meses',
    ],
    comoAdaptar: [
      'Corte em pedaços pequenos; a massa em camadas é macia e fácil',
      'Se for lasanha congelada industrializada, o sal é alto demais — nessa, a porção do bebê deve ser simbólica ou de outra panela',
      'Espere amornar bem: recheio de lasanha guarda MUITO calor (queimadura de boca)',
    ],
    ficaDeFora: [
      'Presunto e outros frios do recheio (embutidos)',
      'Lasanha industrializada como refeição do bebê',
    ],
    nota: 'VALIDAR: queijos em preparações a partir de 9 meses (mesma referência de iogurte/queijos).',
  },
  {
    id: 'sopa-feijao',
    nome: 'Caldo / sopa de feijão',
    icone: '🥣',
    resumo: 'Noite fria pede caldo — o bebê come a versão inteira.',
    podeDoPrato: [
      'O feijão batido ou amassado COM os grãos — é o grão que alimenta, não a água',
      'Legumes e carne magra que forem à panela',
    ],
    comoAdaptar: [
      'Engrosse a porção do bebê: consistência de creme, nunca "aguinha" — caldo ralo ocupa a barriga sem nutrir',
      'Separe antes do sal e dos acompanhamentos salgados',
      'Couve picadinha e um fio de azeite por cima completam o prato',
    ],
    ficaDeFora: [
      'Bacon, calabresa e torresmo do caldo',
      'Croutons/torradinhas duras antes da mastigação madura',
    ],
  },
  {
    id: 'pizza',
    nome: 'Pizza em casa',
    icone: '🍕',
    resumo: 'Noite da pizza: participação simbólica, sem virar rotina.',
    podeDoPrato: [
      'A partir de ~12 meses: um pedaço pequeno de massa com molho e muçarela, na mesa com a família',
    ],
    comoAdaptar: [
      'Antes dos 12 meses, prefira que o bebê jante a comida dele e participe da mesa de outro jeito',
      'Tire o excesso de queijo esticado (formato de risco) e espere amornar',
      'Pizza é evento, não cardápio: o valor aqui é social, não nutricional',
    ],
    ficaDeFora: [
      'Coberturas com embutidos (calabresa, presunto, peperoni)',
      'Borda recheada, catupiry em excesso, refrigerante na mesa para a criança',
    ],
    nota: 'VALIDAR: recorte de idade e enquadramento "participação ocasional" para pizza.',
  },
];
