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

// VALIDAR: sequência e técnica final das manobras após atualização clínica de 27/07/2026
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
