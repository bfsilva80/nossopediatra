/**
 * FONTE ÚNICA da FAQ — respostas revisadas e alinhadas com fases.ts e seguranca.ts.
 * Revisão clínica: itens validados em 24/07/2026 (comentários "VALIDADO").
 * Novas pendências devem usar comentários "VALIDAR:" — nunca dentro das strings.
 */

export interface PerguntaFAQ {
  id: string;
  categoria: 'Começando' | 'Quantidade' | 'Alergias' | 'Segurança' | 'Bebidas e extras';
  pergunta: string;
  resposta: string;
}

export const perguntasFAQ: PerguntaFAQ[] = [
  {
    id: 'quando-comecar',
    categoria: 'Começando',
    pergunta: 'Quando devo começar a introdução alimentar?',
    resposta:
      'Por volta dos 6 meses, quando o bebê mostra os sinais de prontidão: senta com pouco apoio, sustenta bem a cabeça, leva objetos à boca e se interessa pela comida. Antes dos 6 meses o recomendado é leite materno exclusivo (ou fórmula, quando indicada). Idade sozinha não basta, e sinais sozinhos também não — na dúvida, confirme com o pediatra na consulta do 5º/6º mês.',
  },
  {
    id: 'esperar-dias',
    categoria: 'Começando',
    pergunta: 'Preciso esperar 3 dias entre um alimento novo e outro?',
    resposta:
      'Para a maioria dos alimentos, não — pode variar o cardápio livremente desde o início; a variedade é bem-vinda. A atenção especial vale para os alergênicos (ovo, amendoim, peixe, trigo, leite, castanhas, soja, frutos do mar, gergelim): ofereça um de cada vez, em pequena quantidade, e observe o bebê nas horas seguintes antes de introduzir o próximo alergênico novo.',
  },
  {
    id: 'nao-come',
    categoria: 'Quantidade',
    pergunta: 'Meu bebê come muito pouco. Devo me preocupar?',
    resposta:
      'No começo, comer pouco é o esperado — o leite ainda é a principal fonte de nutrição e as refeições são treino. Ofereça sem pressão, no ritmo do bebê, e volte a oferecer o que foi recusado em outros dias (às vezes são precisas 8–10 tentativas). O que merece consulta: recusa de quase tudo por mais de 1–2 semanas, perda de peso ou queda na curva de crescimento.',
  },
  {
    id: 'quanto-oferecer',
    categoria: 'Quantidade',
    pergunta: 'Quanto oferecer em cada refeição?',
    resposta:
      'Guia aproximado: aos 6 meses, comece com 2–3 colheres de sopa e aumente conforme a aceitação; dos 7 aos 11 meses, algo em torno de metade de uma xícara de 250 ml por refeição principal; após 1 ano, de ¾ a 1 xícara. Mas a régua verdadeira é o bebê: quem decide QUANTO come é ele; você decide O QUE é oferecido.',
  },
  {
    id: 'alergenicos-como',
    categoria: 'Alergias',
    pergunta: 'Como introduzir os alimentos alergênicos com segurança?',
    resposta:
      'Cedo (a partir dos 6 meses) e com regularidade — adiar não protege, expõe. Ofereça um alergênico novo por vez, em pequena quantidade, de manhã ou quando puder observar o bebê depois. Sem reação? Mantenha o alimento na rotina (1–2x/semana). Ovo vai inteiro e bem cozido; amendoim e castanhas só em pasta fina diluída, nunca inteiros. Bebês com dermatite atópica grave ou alergia já diagnosticada: converse antes com o pediatra.',
  },
  {
    id: 'historico-familiar',
    categoria: 'Alergias',
    pergunta: 'Temos alergia na família. Devo evitar os alergênicos?',
    resposta:
      'Não — e a evidência atual aponta o contrário: a introdução precoce e regular reduz o risco de alergia, inclusive em bebês com histórico familiar. A exceção que pede conversa prévia com o pediatra é o bebê com dermatite atópica grave ou com alguma alergia alimentar já confirmada.',
  },
  {
    id: 'alergia-sinais',
    categoria: 'Alergias',
    pergunta: 'Como reconhecer uma reação alérgica?',
    resposta:
      'Reação leve: vermelhidão ou poucas placas de urticária perto da boca, coceira, um episódio de vômito — suspenda o alimento, registre no diário e converse com o pediatra antes de reoferecer. Reação grave (anafilaxia): inchaço de lábios/língua/rosto, dificuldade para respirar, chiado, urticária espalhada, vômitos repetidos, moleza ou desmaio — ligue 192 imediatamente.',
  },
  {
    id: 'gag-engasgo',
    categoria: 'Segurança',
    pergunta: 'Meu bebê "engasga" e faz caretas comendo. É normal?',
    resposta:
      'Quase sempre o que assusta é o reflexo de proteção (gag): o bebê tosse, fica vermelho, faz barulho — e resolve sozinho. Isso é treino, não emergência; não bata nas costas nem coloque o dedo na boca. Engasgo real é SILENCIOSO: sem tosse, sem choro, lábios arroxeados — aí é agir na hora com as manobras (veja a tela Segurança) e acionar o 192.',
  },
  // VALIDADO (pediatra responsável, 24/07/2026) — afirmação sobre estudos de engasgo no BLW (evidência observacional)
  {
    id: 'blw-seguro',
    categoria: 'Segurança',
    pergunta: 'BLW é seguro? Não aumenta o risco de engasgo?',
    resposta:
      'Os estudos disponíveis não mostram mais engasgo no BLW do que na colher, desde que os alimentos estejam em formato seguro (tiras macias, cortes certos), o bebê coma sentado e supervisionado, e a família conheça as manobras de desobstrução. O que aumenta risco em qualquer método: alimentos duros ou redondos inteiros, comer deitado, andando ou no carro.',
  },
  {
    id: 'agua',
    categoria: 'Bebidas e extras',
    pergunta: 'Quando e como oferecer água?',
    resposta:
      'A partir dos 6 meses, junto com o início da IA. Ofereça água potável — filtrada ou fervida, conforme a segurança da água da sua região — em copo (pode ser copo de transição), várias vezes ao dia, sem forçar. Antes dos 6 meses, bebês em aleitamento exclusivo não precisam de água.',
  },
  {
    id: 'suco',
    categoria: 'Bebidas e extras',
    pergunta: 'Pode dar suco, mesmo natural?',
    resposta:
      'A recomendação é não oferecer suco antes de 1 ano — nem o natural — e evitar até os 2. O suco concentra o açúcar de várias frutas sem a fibra, ocupa espaço do leite e das refeições e acostuma ao sabor muito doce. A fruta em si (amassada, raspada, em pedaços) é sempre a melhor escolha.',
  },
  {
    id: 'leite-vaca',
    categoria: 'Bebidas e extras',
    pergunta: 'Quando entra o leite de vaca?',
    resposta:
      'Como bebida, a partir de 12 meses (integral), limitado a cerca de 500 ml/dia somando derivados — excesso de leite atrapalha o ferro. Antes dos 12 meses, o leite de vaca não deve substituir leite materno ou fórmula. Iogurte natural integral sem açúcar e queijos leves costumam ser liberados um pouco antes, por volta dos 9 meses.',
    // VALIDADO (pediatra responsável, 24/07/2026) — idade de iogurte/queijos (~9 meses) e teto de 500 ml/dia
  },
  {
    id: 'mel-acucar',
    categoria: 'Bebidas e extras',
    pergunta: 'Mel e açúcar: quando pode?',
    resposta:
      'Mel: proibido antes dos 12 meses pelo risco de botulismo infantil (inclusive em preparações). Açúcar de qualquer tipo — incluindo o mel depois dos 12 meses, achocolatados e bolachas: a recomendação brasileira é não oferecer antes dos 2 anos. O paladar que se forma agora acompanha a criança pela vida.',
  },
  {
    id: 'sal-tempero',
    categoria: 'Bebidas e extras',
    pergunta: 'Posso temperar a comida do bebê?',
    resposta:
      'Sim — e deve! Cebola, alho, azeite, salsinha, coentro, orégano, manjericão e outras ervas são bem-vindos desde o início. O que fica de fora é o sal (nada até 12 meses; mínimo depois) e os temperos prontos industrializados (caldos em cubo, temperos completos), que são basicamente sal e aditivos.',
  },
];
