/**
 * Mitos da introdução alimentar — o que toda avó jura e a ciência desmente.
 * Tom: acolher quem acredita (quase sempre foi orientação médica de outra
 * época), corrigir sem humilhar. Fontes: Guia Alimentar MS 2019, SBP.
 *
 * VALIDADO (pediatra responsável, 25/07/2026): os 10 verbetes, incluindo a
 * atribuição histórica do mito manga-com-leite (mantida com "provavelmente").
 */

export interface Mito {
  id: string;
  mito: string;
  verdade: string;
  porquePegou: string;
}

export const mitos: Mito[] = [
  {
    id: 'suco',
    mito: '"Suco natural é saudável para o bebê"',
    verdade:
      'Antes de 1 ano, suco nenhum — nem natural, nem coado, nem "só de laranja lima". O suco concentra o açúcar de várias frutas sem a fibra, ocupa o lugar do leite e da comida e acostuma o paladar no muito doce. A fruta vai inteira: amassada, raspada ou em pedaço seguro.',
    porquePegou:
      'Por décadas o suquinho de laranja foi orientação oficial de pediatra, inclusive antes dos 6 meses. A diretriz mudou; a memória afetiva ficou.',
  },
  {
    id: 'cha',
    mito: '"Chá de erva-doce/camomila acalma a cólica"',
    verdade:
      'Antes dos 6 meses, nada além de leite (materno ou fórmula) — nem chá, nem água, nem "florzinha". Chá ocupa espaço do leite, pode conter substâncias inseguras para o bebê e não trata cólica. Depois dos 6 meses, continua sem função: a bebida da criança é água.',
    porquePegou:
      'Cólica angustia, chá é o remédio caseiro mais antigo do mundo, e o bebê às vezes acalma mesmo — pelo colo e pela sucção, não pela erva.',
  },
  {
    id: 'gema',
    mito: '"Primeiro a gema, a clara só depois de 1 ano"',
    verdade:
      'O ovo vai INTEIRO desde o comecinho, sempre bem cozido — gema e clara juntas. Adiar a clara não previne alergia; a ciência mostrou o contrário: conhecer os alergênicos cedo e com regularidade é o que reduz o risco.',
    porquePegou:
      'Era a orientação oficial até os anos 2000 — a clara concentra as proteínas alergênicas e a lógica "adiar = proteger" parecia óbvia. Os estudos derrubaram a lógica.',
  },
  {
    id: 'tres-dias',
    mito: '"Espere 3 dias entre cada alimento novo"',
    verdade:
      'Para frutas, legumes, cereais e carnes, não precisa esperar nada: ofereça variedade desde o início. A atenção especial é só para os alergênicos principais (ovo, peixe, amendoim…): esses sim, um NOVO por vez, em pequena quantidade, para identificar qualquer reação — mas sem intervalo de dias entre os demais alimentos.',
    porquePegou:
      'A regra dos 3 dias simplificava a vida do consultório e virou mantra. Aplicada a tudo, ela só atrasa a variedade — e variedade cedo é proteção.',
  },
  {
    id: 'sem-tempero',
    mito: '"Comida de bebê tem que ser sem gosto"',
    verdade:
      'Sem SAL não é sem SABOR. Alho, cebola, salsinha, coentro, manjericão, azeite: pode e deve — o bebê está formando o paladar da vida inteira. O que fica de fora é sal, caldos de tablete, temperos prontos e pimenta.',
    porquePegou:
      'Confusão entre "sem sal" (correto) e "sem tempero nenhum" (desnecessário). Comida insossa ainda parece mais "segura" — mas só torna a comida menos interessante.',
  },
  {
    id: 'mel',
    mito: '"Mel é natural, melhor que açúcar"',
    verdade:
      'Antes de 1 ano, mel é PROIBIDO — risco de botulismo infantil, uma intoxicação grave que a flora intestinal do bebê ainda não bloqueia. Nem no chá, nem na chupeta, nem "só uma pontinha". Depois de 1 ano deixa de ser perigo de botulismo, mas continua sendo açúcar.',
    porquePegou:
      '"Natural" soa inofensivo, e mel na chupeta foi truque de gerações. O risco é invisível: os esporos não têm gosto nem cheiro.',
  },
  {
    id: 'engrossar',
    mito: '"Engrossar a mamadeira com farinha sustenta mais"',
    verdade:
      'Farinha no leite não é comida — é caloria vazia que desloca nutrientes e açúcar que o bebê não precisa. Bebê que "não se satisfaz" merece avaliação do pediatra, não mucilon na mamadeira.',
    porquePegou:
      'Gerações cresceram com farinhas lácteas anunciadas como reforço. Bebê que dorme mais depois da mamadeira grossa parecia prova de que funcionava.',
  },
  {
    id: 'manga-leite',
    mito: '"Manga com leite faz mal"',
    verdade:
      'Não faz. Nenhuma combinação de frutas com leite "talha no estômago" nem intoxica. Pode dar manga, e pode dar manga no mesmo dia do leite — a lenda é só lenda.',
    porquePegou:
      'A história vem do Brasil colonial — provavelmente inventada para impedir que pessoas escravizadas consumissem leite. Atravessou séculos como "sabedoria de avó".',
  },
  {
    id: 'recusa',
    mito: '"Cuspiu/recusou = não gosta"',
    verdade:
      'Um alimento novo pode precisar de 8 a 10 ofertas em dias diferentes até ser aceito — isso é aprendizado normal, não birra nem "paladar difícil". Careta na primeira colherada de brócolis é o bebê conhecendo, não rejeitando.',
    porquePegou:
      'Adulto interpreta careta como veredito. E desistir na segunda tentativa poupa o estresse do momento — ao custo da variedade.',
  },
  {
    id: 'caldo',
    mito: '"O caldo do feijão é o que alimenta"',
    verdade:
      'É o contrário: o ferro e a proteína estão no GRÃO. Caldo ralo enche a barriga e desloca comida de verdade. Feijão de bebê é grão amassado com um pouco de caldo — consistência de creme, não de água.',
    porquePegou:
      'Caldo desce fácil e não tem risco de engasgo, então parecia a versão "segura" para bebê. A parte fácil era justamente a parte com menos nutriente.',
  },
];
