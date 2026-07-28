/**
 * FONTE ÚNICA do conteúdo de segurança: engasgo, alergênicos e sinais de alerta.
 *
 * Referências: diretrizes de suporte básico de vida pediátrico (desobstrução de
 * vias aéreas), Guia Alimentar MS 2019, consensos de alergia alimentar.
 * Revisão clínica: itens validados em 24/07/2026 (comentários "VALIDADO").
 * Novas pendências devem usar comentários "VALIDAR:" — nunca dentro das strings.
 */

/** Reflexo de proteção (gag) vs engasgo real */
export const gagVsEngasgo = {
  gag: {
    titulo: 'Reflexo de proteção (gag) — NORMAL',
    sinais: [
      'Tosse forte, barulhenta',
      'Faz careta, fica vermelho, pode até vomitar um pouco',
      'Consegue chorar e emitir sons',
      'Resolve sozinho em segundos',
    ],
    conduta: 'Não intervenha. Mantenha a calma, fique por perto e deixe o bebê resolver. Não dê tapas nas costas nem coloque o dedo na boca — isso pode empurrar o alimento.',
  },
  engasgo: {
    titulo: 'Engasgo real (obstrução) — EMERGÊNCIA',
    sinais: [
      'Silêncio: não tosse, não chora, não emite som',
      'Não consegue respirar',
      'Lábios ou rosto arroxeados',
      'Pode perder a consciência',
    ],
    conduta: 'Aja imediatamente com as manobras abaixo e peça que alguém ligue 192. Não perca tempo se deslocando ao hospital com o bebê obstruído.',
  },
};

/** Quadros das manobras. Alterações geométricas exigem nova revisão clínica. */
export type QuadroManobra =
  | 'decisao'
  | 'golpes'
  | 'golpesMaior1Ano'
  | 'compressoes'
  | 'heimlich'
  | 'sinal'
  | 'cadeirao';

export interface PassoSocorro {
  passo: string;
  detalhe: string;
  /** ilustração correspondente, quando houver */
  ilustracao?: QuadroManobra;
}

/** Desobstrução em MENORES de 1 ano — NÃO usar a manobra de Heimlich clássica. */
export const socorroMenor1Ano: PassoSocorro[] = [
  {
    passo: 'Confirme que é engasgo real',
    detalhe: 'Se o bebê tosse ou chora, NÃO faça manobras: incentive a tosse e observe.',
    ilustracao: 'decisao',
  },
  {
    passo: 'Peça ajuda',
    detalhe: 'Grite por ajuda e peça que alguém ligue 192 (SAMU). Se estiver sozinho, inicie as manobras antes de ligar.',
  },
  {
    passo: '5 golpes nas costas',
    detalhe:
      'Apoie o bebê de bruços sobre seu antebraço, cabeça mais baixa que o corpo, sustentando a mandíbula. Dê 5 golpes firmes com a base da mão entre as escápulas.',
    ilustracao: 'golpes',
  },
  {
    passo: '5 compressões no peito',
    detalhe:
      'Vire o bebê de barriga para cima, ainda com a cabeça mais baixa. Com 2 dedos no centro do peito (logo abaixo da linha dos mamilos), faça 5 compressões.',
    ilustracao: 'compressoes',
  },
  {
    passo: 'Alterne até desobstruir',
    detalhe: 'Repita 5 golpes nas costas + 5 compressões no peito até o objeto sair ou o bebê chorar/tossir.',
  },
  {
    passo: 'Se ficar inconsciente',
    detalhe: 'Inicie reanimação (RCP) e mantenha o 192 na linha. Só retire algo da boca se estiver visível e fácil de alcançar.',
  },
];

/** Desobstrução em MAIORES de 1 ano. */
export const socorroMaior1Ano: PassoSocorro[] = [
  {
    passo: 'Confirme que é engasgo real',
    detalhe: 'Se a criança tosse ou fala, incentive a tosse e não faça manobras.',
    ilustracao: 'decisao',
  },
  {
    passo: 'Peça ajuda',
    detalhe: 'Peça que alguém ligue 192 (SAMU) enquanto você inicia as manobras.',
  },
  {
    passo: '5 golpes nas costas',
    detalhe:
      'Fique ao lado e ligeiramente atrás da criança. Apoie o tórax, incline-a para a frente e dê 5 golpes firmes entre as escápulas com a base da mão.',
    ilustracao: 'golpesMaior1Ano',
  },
  {
    passo: '5 compressões abdominais',
    detalhe:
      'Fique atrás da criança, ajustado à altura dela. Posicione o punho fechado na linha média, acima do umbigo e abaixo da extremidade inferior do esterno. Segure o punho com a outra mão e faça 5 compressões rápidas para dentro e para cima.',
    ilustracao: 'heimlich',
  },
  {
    passo: 'Alterne as manobras',
    detalhe:
      'Repita 5 golpes nas costas e 5 compressões abdominais até o objeto sair, a criança voltar a respirar ou ficar inconsciente.',
  },
  {
    passo: 'Se ficar inconsciente',
    detalhe:
      'Coloque a criança em uma superfície firme, inicie reanimação começando pelas compressões e mantenha o 192 na linha. Retire da boca somente um objeto claramente visível e fácil de alcançar.',
  },
];

// VALIDADO (pediatra responsável, 28/07/2026) — sequência de maior de 1 ano: alternar
// 5 golpes dorsais e 5 compressões abdominais até desobstruir ou perder consciência
export const avisoTreinamento =
  'Ler não substitui treinar: procure um curso presencial de primeiros socorros para pais e cuidadores. Estas instruções seguem as diretrizes de suporte básico de vida pediátrico.';

/** Prevenção de engasgo: formato importa mais que o alimento. */
export interface CorteSeguro {
  alimento: string;
  risco: string;
  comoOferecer: string;
}

export const cortesSeguro: CorteSeguro[] = [
  {
    alimento: 'Uva, tomate-cereja, cereja',
    risco: 'Redondos e do diâmetro exato da via aérea',
    comoOferecer: 'Sempre cortados em 4, no sentido do comprimento — até por volta dos 4 anos',
  },
  {
    alimento: 'Cenoura e maçã cruas',
    risco: 'Duras, soltam pedaços rígidos',
    comoOferecer: 'Cozidas e macias (tiras) ou raladas fininho. Cruas em palito, só bem mais tarde',
  },
  {
    alimento: 'Amendoim, castanhas, sementes',
    risco: 'Duros, pequenos, impossíveis de mastigar sem molares',
    comoOferecer: 'Inteiros: NÃO antes dos 4 anos. Em pasta 100% (fina, diluída na papa ou fruta): pode desde o início da IA',
  },
  {
    alimento: 'Salsicha e embutidos',
    risco: 'Formato de moeda = alto risco (além de ultraprocessados)',
    comoOferecer: 'Não fazem parte da alimentação antes dos 2 anos',
  },
  {
    alimento: 'Pipoca',
    risco: 'Casca dura e leve, fácil de aspirar',
    comoOferecer: 'Não antes dos 4 anos',
  },
  {
    alimento: 'Banana, abacate, manga madura',
    risco: 'Baixo risco quando maduros',
    comoOferecer: 'Em tiras que o bebê consiga segurar (tamanho de um dedo adulto)',
  },
  {
    alimento: 'Carnes',
    risco: 'Pedaços grandes e fibrosos',
    comoOferecer: 'Desfiadas, moídas ou em tiras macias; sempre sem ossos e espinhas',
  },
  {
    alimento: 'Pão de miolo fofo',
    risco: 'Forma "bola" que gruda no céu da boca',
    comoOferecer: 'Prefira casquinha/torradinha leve; miolo em pedaços pequenos',
  },
];

export const regrasDeOuroEngasgo = [
  'Bebê sempre sentado e ereto para comer — nunca deitado, andando, no carro ou no carrinho em movimento',
  'Supervisão de um adulto o tempo todo, com o bebê ao alcance das mãos',
  'Sem pressa e sem distração (telas desligadas)',
  'Aprenda as manobras de desobstrução antes de começar a IA',
];

/** Alergênicos: orientação geral + lista para o rastreador. */
export const orientacaoAlergenicos = [
  'Introduza os alergênicos cedo, a partir dos 6 meses, junto com os demais alimentos — adiar não protege; a exposição precoce e regular reduz o risco de alergia',
  'Ofereça um alergênico novo por vez, em pequena quantidade, de preferência de manhã ou quando puder observar o bebê nas horas seguintes',
  'Não é preciso esperar vários dias entre alimentos comuns; para alergênicos, observe as primeiras ofertas antes de introduzir o próximo',
  'Depois de aceito sem reação, mantenha o alimento na rotina (por exemplo, 1–2 vezes por semana) — a regularidade sustenta a tolerância',
  // VALIDADO (pediatra responsável, 24/07/2026) — redação das exceções (dermatite atópica grave / alergia diagnosticada)
  'Histórico de alergia na família NÃO é motivo para adiar. Exceção: bebês com dermatite atópica grave ou alergia alimentar já diagnosticada — nesses casos, converse com o pediatra antes',
];

export interface Alergenico {
  id: string;
  nome: string;
  icone: string;
  comoOferecer: string;
}

export const alergenicos: Alergenico[] = [
  { id: 'ovo', nome: 'Ovo', icone: '🥚', comoOferecer: 'Inteiro (gema + clara), sempre bem cozido: mexido firme, cozido amassado ou em omelete de forno' },
  { id: 'amendoim', nome: 'Amendoim', icone: '🥜', comoOferecer: 'Pasta 100% amendoim, fina, diluída na fruta amassada ou papa. Nunca inteiro ou em pedaços' },
  { id: 'peixe', nome: 'Peixe', icone: '🐟', comoOferecer: 'Cozido, desfiado, conferindo espinhas uma a uma' },
  { id: 'trigo', nome: 'Trigo (glúten)', icone: '🌾', comoOferecer: 'Macarrão bem cozido, pão caseiro em pedaços seguros, mingau de aveia (aveia costuma ter traços de glúten)' },
  // VALIDADO (pediatra responsável, 24/07/2026) — idade de introdução de iogurte/queijos (~9 meses)
  { id: 'leite', nome: 'Leite de vaca (proteína)', icone: '🥛', comoOferecer: 'Antes de 12 meses, não como bebida. Iogurte natural integral sem açúcar e queijos leves podem entrar aos ~9 meses' },
  { id: 'soja', nome: 'Soja', icone: '🫛', comoOferecer: 'Tofu macio amassado ou em preparações' },
  { id: 'castanhas', nome: 'Castanhas', icone: '🌰', comoOferecer: 'Trituradas finíssimas ou em pasta diluída. Nunca inteiras antes dos 4 anos' },
  { id: 'frutosmar', nome: 'Frutos do mar', icone: '🦐', comoOferecer: 'Bem cozidos e picados finos, de fonte confiável' },
  { id: 'gergelim', nome: 'Gergelim', icone: '🫙', comoOferecer: 'Tahine (pasta) diluído em papas e frutas' },
];

export const sinaisReacaoAlergica = {
  leve: {
    titulo: 'Reação leve — observe e registre',
    sinais: [
      'Vermelhidão ou poucas placas de urticária ao redor da boca',
      'Coceira leve',
      'Um episódio isolado de vômito ou fezes amolecidas',
    ],
    conduta:
      'Suspenda o alimento, anote no diário (alimento, quantidade, horário, foto da pele se possível) e converse com o pediatra antes de oferecer de novo.',
  },
  grave: {
    titulo: 'Anafilaxia — ligue 192 imediatamente',
    sinais: [
      'Inchaço de lábios, língua ou rosto',
      'Dificuldade para respirar, chiado, tosse persistente ou rouquidão súbita',
      'Urticária espalhada pelo corpo',
      'Vômitos repetidos logo após o alimento',
      'Palidez, moleza, sonolência anormal ou desmaio',
    ],
    conduta: 'Emergência médica: ligue 192 na hora. Não espere "passar" e não dirija segurando o bebê no colo.',
  },
};

/** Sinais de alerta gerais — quando procurar ajuda. */
export interface SinalAlerta {
  id: string;
  titulo: string;
  descricao: string;
  gravidade: 'emergencia' | 'consulta';
}

export const sinaisAlerta: SinalAlerta[] = [
  {
    id: 'engasgo',
    titulo: 'Engasgo com obstrução',
    descricao: 'Bebê sem tossir, sem som, arroxeado: inicie as manobras de desobstrução AGORA e acione o 192. Não se desloque ao hospital com o bebê obstruído.',
    gravidade: 'emergencia',
  },
  {
    id: 'anafilaxia',
    titulo: 'Reação alérgica grave',
    descricao: 'Inchaço de rosto/língua, dificuldade para respirar, urticária espalhada, vômitos repetidos ou moleza logo após um alimento: ligue 192.',
    gravidade: 'emergencia',
  },
  {
    id: 'desidratacao',
    titulo: 'Sinais de desidratação',
    descricao: 'Vômitos ou diarreia persistentes com boca seca, choro sem lágrimas, fralda seca por muitas horas, moleza ou olhos fundos: procure atendimento no mesmo dia.',
    gravidade: 'emergencia',
  },
  {
    id: 'sangue',
    titulo: 'Sangue nas fezes ou no vômito',
    descricao: 'Merece avaliação médica rápida, principalmente se o bebê estiver abatido.',
    gravidade: 'emergencia',
  },
  {
    id: 'peso',
    titulo: 'Recusa persistente + peso parado',
    descricao: 'Recusar quase tudo por mais de 1–2 semanas, com perda de peso, apatia ou queda das curvas de crescimento: agende consulta.',
    gravidade: 'consulta',
  },
  {
    id: 'intestino',
    titulo: 'Intestino muito preso',
    descricao: 'Ficar dias sem evacuar pode ser normal (principalmente em bebês amamentados). Preocupe-se com fezes duras e ressecadas (bolinhas), dor e esforço com choro, sangue vivo ou barriga muito distendida — nesses casos, fale com o pediatra.',
    gravidade: 'consulta',
  },
  {
    id: 'pele',
    titulo: 'Reações leves repetidas',
    descricao: 'Vermelhidão ou coceira que se repete sempre com o mesmo alimento: registre no diário e leve à consulta.',
    gravidade: 'consulta',
  },
];

export const telefonesEmergencia = [
  { nome: 'SAMU', numero: '192' },
  { nome: 'Bombeiros', numero: '193' },
];

/**
 * Quiz do modo treino — cada questão reafirma condutas já validadas acima
 * (gag vs engasgo, manobras por idade, avaliação pós-episódio).
 * O erro mais comum dos pais é intervir no gag: por isso ele abre o quiz.
 */
export interface QuestaoTreino {
  cenario: string;
  opcoes: string[];
  corretaIdx: number;
  explicacao: string;
}

// VALIDADO (pediatra responsável, 28/07/2026) — questão de maior de 1 ano alinhada a
// socorroMaior1Ano: alternância de golpes dorsais e compressões abdominais
export const quizEngasgo: QuestaoTreino[] = [
  {
    cenario: 'O bebê está comendo, faz careta, fica vermelho e tosse COM FORÇA, fazendo barulho.',
    opcoes: ['Dar tapas nas costas agora', 'Não intervir: deixar tossir e observar de perto', 'Colocar o dedo na boca para tirar o pedaço'],
    corretaIdx: 1,
    explicacao: 'Tosse barulhenta é o reflexo de proteção funcionando. Intervir pode empurrar o alimento e piorar. Fique por perto e deixe o bebê resolver.',
  },
  {
    cenario: 'O bebê fica em SILÊNCIO de repente: não tosse, não chora, e os lábios começam a arroxear.',
    opcoes: ['Correr com ele para o hospital', 'Oferecer água', 'Iniciar as manobras AGORA e pedir que alguém ligue 192'],
    corretaIdx: 2,
    explicacao: 'Silêncio + arroxeamento = obstrução real. Não há tempo de deslocamento: as manobras começam na hora, com o 192 acionado.',
  },
  {
    cenario: 'Bebê de 8 meses com engasgo real. Qual é a manobra correta?',
    opcoes: ['Manobra de Heimlich (compressões abdominais)', '5 golpes nas costas + 5 compressões no peito, alternando', 'Sacudir o bebê de cabeça para baixo'],
    corretaIdx: 1,
    explicacao: 'Em MENORES de 1 ano nunca se faz Heimlich. É golpes dorsais + compressões torácicas, em ciclos, até desobstruir.',
  },
  {
    cenario: 'Criança de 2 anos com engasgo real (sem tosse, sem som). O que fazer?',
    opcoes: ['Alternar 5 golpes nas costas e 5 compressões abdominais, com o 192 acionado', 'Somente compressões abdominais, sem golpes nas costas', 'Esperar para ver se melhora'],
    corretaIdx: 0,
    explicacao: 'Acima de 1 ano, alterne 5 golpes firmes entre as escápulas e 5 compressões abdominais para dentro e para cima, até o objeto sair ou a criança ficar inconsciente. O 192 é acionado desde o início.',
  },
  {
    cenario: 'Você fez as manobras, o pedaço saiu e o bebê chorou. Agora parece bem.',
    opcoes: ['Tudo resolvido, seguir o dia normalmente', 'Levar para avaliação médica no mesmo dia, mesmo parecendo bem', 'Dar água e observar por 1 hora'],
    corretaIdx: 1,
    explicacao: 'Depois de qualquer engasgo real com manobras, a avaliação médica no mesmo dia é obrigatória — mesmo que o bebê pareça ótimo.',
  },
];
