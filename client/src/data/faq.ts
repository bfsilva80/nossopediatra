export interface FAQItem {
  id: string;
  category: "reflux" | "constipation" | "allergy" | "general";
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  // Geral - Reordenado para o topo
  {
    id: "general-1",
    category: "general",
    question: "Esta ferramenta substitui uma consulta médica?",
    answer:
      "Não. Ela foi criada para oferecer uma orientação inicial e ajudar a organizar os sintomas. A avaliação médica continua sendo o melhor caminho quando os sinais persistem, se repetem ou preocupam.",
  },
  {
    id: "general-2",
    category: "general",
    question: "Quando devo procurar atendimento com mais urgência?",
    answer:
      "Vale procurar atendimento mais rápido se a criança estiver muito prostrada, com vômitos repetidos, sangue nas fezes ou no vômito, sinais de desidratação, dor abdominal intensa, dificuldade para respirar, febre persistente com piora do estado geral ou qualquer mudança importante no comportamento habitual.",
  },
  {
    id: "general-3",
    category: "general",
    question: "Quando vale marcar consulta com gastropediatra?",
    answer:
      "Quando os sintomas se repetem, duram mais do que o esperado, atrapalham alimentação, sono, evacuação, ganho de peso ou qualidade de vida. Também faz sentido quando a família sente que a história está confusa e precisa de mais clareza.",
  },
  {
    id: "general-4",
    category: "general",
    question: "Como agendar uma consulta com o Dr. Bruno?",
    answer:
      "Você pode seguir direto para o WhatsApp ou para o agendamento da consulta. Se preferir, a gente ajuda você a encontrar o melhor caminho.",
  },

  // Refluxo
  {
    id: "reflux-1",
    category: "reflux",
    question: "Refluxo e vômitos são a mesma coisa?",
    answer:
      "Nem sempre. Regurgitação, refluxo e vômito podem parecer a mesma coisa no começo, mas têm significados clínicos diferentes. O contexto, a frequência, o ganho de peso e os sinais associados ajudam a entender melhor.",
  },
  {
    id: "reflux-2",
    category: "reflux",
    question: "Qual é a melhor posição para dormir com refluxo?",
    answer:
      "A posição ideal é com a cabeça elevada em 30 graus, mantendo o corpo em linha reta. Evite deitar a criança imediatamente após as refeições. Para bebês, sempre coloque-os de costas para dormir. Consulte o Dr. Bruno para orientações específicas conforme a idade.",
  },
  {
    id: "reflux-3",
    category: "reflux",
    question: "Refluxo em bebê é normal?",
    answer:
      "Sim, refluxo leve é comum em bebês devido à imaturidade do esfíncter esofágico inferior. No entanto, refluxo frequente, com desconforto, recusa alimentar ou tosse noturna requer avaliação profissional. A maioria dos casos melhora naturalmente até os 12-18 meses, mas alguns precisam de intervenção.",
  },
  {
    id: "reflux-4",
    category: "reflux",
    question: "Quais alimentos pioram o refluxo?",
    answer:
      "Alimentos gordurosos, cítricos, tomate, chocolate, cafeína e alimentos muito quentes podem piorar o refluxo. Também evite refeições grandes e próximas à hora de dormir. Cada criança pode reagir diferente, então é importante observar padrões individuais e consultar um especialista.",
  },

  // Constipação
  {
    id: "const-1",
    category: "constipation",
    question: "Constipação ocasional é sempre normal?",
    answer:
      "Nem sempre. Muitas crianças têm fases de intestino mais preso, mas a frequência das evacuações, a consistência das fezes, a dor para evacuar, o medo de evacuar e a presença de fissuras ou sangue fazem diferença na avaliação.",
  },
  {
    id: "const-2",
    category: "constipation",
    question: "Como aumentar a ingestão de fibras?",
    answer:
      "Ofereça frutas (maçã, pera, ameixa), vegetais (abóbora, brócolis), cereais integrais e legumes. Aumente gradualmente para evitar gases. Também é fundamental aumentar a ingestão de água. Para crianças menores de 1 ano, consulte o Dr. Bruno antes de introduzir certos alimentos.",
  },
  {
    id: "const-3",
    category: "constipation",
    question: "Constipação pode causar dor abdominal?",
    answer:
      "Sim, constipação pode causar cólicas, desconforto e dor abdominal. Se seu filho apresenta dor intensa, febre, sangue nas fezes ou constipação persistente por mais de 2 semanas, procure avaliação profissional imediatamente.",
  },
  {
    id: "const-4",
    category: "constipation",
    question: "Quando devo usar laxante infantil?",
    answer:
      "Laxantes devem ser usados apenas sob orientação médica. Primeiro, tente aumentar fibras, água e atividade física. Se a constipação persistir, o Dr. Bruno pode recomendar opções seguras e apropriadas para a idade da criança.",
  },

  // Alergias
  {
    id: "allergy-1",
    category: "allergy",
    question: "Suspeita de reação a alimentos significa alergia?",
    answer:
      "Não obrigatoriamente. Existem reações que lembram alergia, mas podem ter outras explicações. O mais importante é entender o tipo de sintoma, o tempo de relação com o alimento e o contexto clínico da criança.",
  },
  {
    id: "allergy-2",
    category: "allergy",
    question: "Qual é a diferença entre alergia e intolerância alimentar?",
    answer:
      "Alergia envolve o sistema imunológico e pode ser grave. Intolerância (como à lactose) é uma reação digestiva, geralmente menos severa. Ambas causam desconforto, mas alergias podem ser perigosas. Testes e avaliação profissional ajudam a diferenciar.",
  },
  {
    id: "allergy-3",
    category: "allergy",
    question: "Posso introduzir alimentos alergênicos cedo?",
    answer:
      "Pesquisas recentes sugerem que introduzir alimentos alergênicos cedo (após 6 meses) pode reduzir risco de alergia. No entanto, isso deve ser feito sob orientação médica, especialmente se há histórico familiar de alergias. Consulte o Dr. Bruno para um plano personalizado.",
  },
  {
    id: "allergy-4",
    category: "allergy",
    question: "Meu filho tem alergia à proteína do leite. O que fazer?",
    answer:
      "Evite leite de vaca e derivados. Existem fórmulas infantis hipoalergênicas ou à base de aminoácidos. Para crianças maiores, leites alternativos (soja, aveia, amêndoa) podem ser opções. O Dr. Bruno pode recomendar suplementação de cálcio e orientar sobre leitura de rótulos.",
  },
];

export const faqCategories = [
  { id: "general", label: "Geral", color: "from-slate to-gray" },
  { id: "reflux", label: "Refluxo/Vômitos", color: "from-blue to-teal" },
  { id: "constipation", label: "Constipação", color: "from-amber to-orange" },
  { id: "allergy", label: "Alergias", color: "from-rose to-pink" },
];
