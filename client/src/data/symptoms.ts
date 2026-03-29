// Estrutura de dados para o verificador de sintomas interativo

export interface Question {
  id: string;
  text: string;
  type: "yes-no" | "multiple-choice" | "age-range";
  options?: string[];
  nextQuestions?: {
    [key: string]: string; // yes/no ou option value -> next question id
  };
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  recommendations: string[];
  urgency: "low" | "medium" | "high";
  shouldConsult: boolean;
}

export interface DiagnosisResult {
  condition: Condition;
  confidence: number; // 0-100
  matchedSymptoms: string[];
}

// Perguntas iniciais
export const initialQuestions: Question[] = [
  {
    id: "main-complaint",
    text: "Qual é a principal queixa do seu filho?",
    type: "multiple-choice",
    options: ["Refluxo/Vômitos", "Constipação/Dificuldade intestinal", "Alergias alimentares", "Não tenho certeza"],
    nextQuestions: {
      "Refluxo/Vômitos": "reflux-frequency",
      "Constipação/Dificuldade intestinal": "constipation-frequency",
      "Alergias alimentares": "allergy-symptoms",
      "Não tenho certeza": "age-check",
    },
  },
];

// Fluxo de perguntas para REFLUXO
export const refluxQuestions: Question[] = [
  {
    id: "reflux-frequency",
    text: "Com que frequência seu filho apresenta refluxo ou vômitos?",
    type: "multiple-choice",
    options: ["Raramente (menos de 1x por semana)", "Ocasionalmente (1-3x por semana)", "Frequentemente (mais de 3x por semana)", "Constantemente"],
    nextQuestions: {
      "Raramente (menos de 1x por semana)": "reflux-age",
      "Ocasionalmente (1-3x por semana)": "reflux-age",
      "Frequentemente (mais de 3x por semana)": "reflux-symptoms",
      "Constantemente": "reflux-symptoms",
    },
  },
  {
    id: "reflux-age",
    text: "Qual é a idade do seu filho?",
    type: "age-range",
    options: ["Menos de 3 meses", "3-6 meses", "6-12 meses", "1-2 anos", "2-5 anos", "Acima de 5 anos"],
    nextQuestions: {
      "Menos de 3 meses": "reflux-symptoms",
      "3-6 meses": "reflux-symptoms",
      "6-12 meses": "reflux-symptoms",
      "1-2 anos": "reflux-symptoms",
      "2-5 anos": "reflux-symptoms",
      "Acima de 5 anos": "reflux-symptoms",
    },
  },
  {
    id: "reflux-symptoms",
    text: "Seu filho apresenta algum desses sintomas?",
    type: "multiple-choice",
    options: ["Irritabilidade/Desconforto após alimentação", "Recusa alimentar", "Tosse noturna", "Halitose (mau hálito)", "Nenhum desses"],
    nextQuestions: {
      "Irritabilidade/Desconforto após alimentação": "reflux-duration",
      "Recusa alimentar": "reflux-duration",
      "Tosse noturna": "reflux-duration",
      "Halitose (mau hálito)": "reflux-duration",
      "Nenhum desses": "reflux-duration",
    },
  },
  {
    id: "reflux-duration",
    text: "Há quanto tempo seu filho apresenta esses sintomas?",
    type: "multiple-choice",
    options: ["Menos de 1 mês", "1-3 meses", "3-6 meses", "Mais de 6 meses"],
    nextQuestions: {
      "Menos de 1 mês": "reflux-result",
      "1-3 meses": "reflux-result",
      "3-6 meses": "reflux-result",
      "Mais de 6 meses": "reflux-result",
    },
  },
];

// Fluxo de perguntas para CONSTIPAÇÃO
export const constipationQuestions: Question[] = [
  {
    id: "constipation-frequency",
    text: "Com que frequência seu filho evacua?",
    type: "multiple-choice",
    options: ["Menos de 3x por semana", "3-5x por semana", "Diariamente", "Mais de 1x por dia"],
    nextQuestions: {
      "Menos de 3x por semana": "constipation-consistency",
      "3-5x por semana": "constipation-age",
      "Diariamente": "constipation-age",
      "Mais de 1x por dia": "constipation-age",
    },
  },
  {
    id: "constipation-consistency",
    text: "Como é a consistência das fezes?",
    type: "multiple-choice",
    options: ["Muito dura/Ressecada", "Dura", "Normal", "Mole"],
    nextQuestions: {
      "Muito dura/Ressecada": "constipation-symptoms",
      "Dura": "constipation-symptoms",
      "Normal": "constipation-age",
      "Mole": "constipation-age",
    },
  },
  {
    id: "constipation-age",
    text: "Qual é a idade do seu filho?",
    type: "age-range",
    options: ["Menos de 6 meses", "6-12 meses", "1-2 anos", "2-5 anos", "Acima de 5 anos"],
    nextQuestions: {
      "Menos de 6 meses": "constipation-diet",
      "6-12 meses": "constipation-diet",
      "1-2 anos": "constipation-diet",
      "2-5 anos": "constipation-diet",
      "Acima de 5 anos": "constipation-diet",
    },
  },
  {
    id: "constipation-symptoms",
    text: "Seu filho apresenta algum desses sintomas?",
    type: "multiple-choice",
    options: ["Dor ao evacuar", "Sangue nas fezes", "Distensão abdominal", "Falta de apetite", "Nenhum desses"],
    nextQuestions: {
      "Dor ao evacuar": "constipation-diet",
      "Sangue nas fezes": "constipation-diet",
      "Distensão abdominal": "constipation-diet",
      "Falta de apetite": "constipation-diet",
      "Nenhum desses": "constipation-diet",
    },
  },
  {
    id: "constipation-diet",
    text: "Como é a ingestão de fibras e água do seu filho?",
    type: "multiple-choice",
    options: ["Baixa em fibras e água", "Moderada", "Adequada", "Não sei"],
    nextQuestions: {
      "Baixa em fibras e água": "constipation-result",
      "Moderada": "constipation-result",
      "Adequada": "constipation-result",
      "Não sei": "constipation-result",
    },
  },
];

// Fluxo de perguntas para ALERGIAS
export const allergyQuestions: Question[] = [
  {
    id: "allergy-symptoms",
    text: "Quais sintomas seu filho apresenta após comer?",
    type: "multiple-choice",
    options: ["Coceira/Inchaço na boca", "Urticária/Erupção cutânea", "Inchaço facial", "Vômitos/Diarreia", "Dificuldade respiratória"],
    nextQuestions: {
      "Coceira/Inchaço na boca": "allergy-triggers",
      "Urticária/Erupção cutânea": "allergy-triggers",
      "Inchaço facial": "allergy-triggers",
      "Vômitos/Diarreia": "allergy-triggers",
      "Dificuldade respiratória": "allergy-triggers",
    },
  },
  {
    id: "allergy-triggers",
    text: "Qual alimento parece desencadear os sintomas?",
    type: "multiple-choice",
    options: ["Leite/Laticínios", "Ovos", "Amendoim/Nozes", "Frutos do mar", "Glúten", "Não identificado"],
    nextQuestions: {
      "Leite/Laticínios": "allergy-severity",
      "Ovos": "allergy-severity",
      "Amendoim/Nozes": "allergy-severity",
      "Frutos do mar": "allergy-severity",
      "Glúten": "allergy-severity",
      "Não identificado": "allergy-severity",
    },
  },
  {
    id: "allergy-severity",
    text: "Qual é a gravidade dos sintomas?",
    type: "multiple-choice",
    options: ["Leve (desconforto leve)", "Moderada (sintomas claros)", "Grave (reação forte)", "Muito grave (risco de vida)"],
    nextQuestions: {
      "Leve (desconforto leve)": "allergy-history",
      "Moderada (sintomas claros)": "allergy-history",
      "Grave (reação forte)": "allergy-history",
      "Muito grave (risco de vida)": "allergy-history",
    },
  },
  {
    id: "allergy-history",
    text: "Há histórico de alergias na família?",
    type: "yes-no",
    nextQuestions: {
      yes: "allergy-result",
      no: "allergy-result",
    },
  },
];

// Condições e recomendações
export const conditions: Condition[] = [
  {
    id: "reflux",
    name: "Refluxo Gastroesofágico Infantil",
    description: "Refluxo ácido que causa desconforto e possíveis complicações",
    symptoms: ["Vômitos frequentes", "Irritabilidade após alimentação", "Recusa alimentar", "Tosse noturna"],
    recommendations: [
      "Elevar a cabeceira do berço/cama em 30 graus",
      "Fazer refeições menores e mais frequentes",
      "Aguardar 30 minutos após alimentação antes de deitar",
      "Evitar alimentos gordurosos e ácidos",
      "Manter postura vertical durante e após alimentação",
    ],
    urgency: "medium",
    shouldConsult: true,
  },
  {
    id: "constipation",
    name: "Constipação Infantil",
    description: "Dificuldade em evacuar com frequência reduzida",
    symptoms: ["Evacuações infrequentes", "Fezes duras", "Dor ao evacuar", "Distensão abdominal"],
    recommendations: [
      "Aumentar ingestão de fibras (frutas, vegetais, cereais integrais)",
      "Garantir hidratação adequada (água e sucos naturais)",
      "Estimular atividade física e movimento",
      "Estabelecer rotina regular de evacuação",
      "Evitar alimentos muito processados",
    ],
    urgency: "low",
    shouldConsult: true,
  },
  {
    id: "allergy",
    name: "Alergia Alimentar",
    description: "Reação do sistema imunológico a determinado alimento",
    symptoms: ["Urticária", "Inchaço facial", "Vômitos", "Diarreia", "Dificuldade respiratória"],
    recommendations: [
      "Identificar e evitar o alimento alergênico",
      "Ler rótulos de alimentos com atenção",
      "Informar escola/cuidadores sobre a alergia",
      "Manter medicação de emergência (se prescrita) à mão",
      "Considerar teste de alergia com alergista",
    ],
    urgency: "high",
    shouldConsult: true,
  },
  {
    id: "uncertain",
    name: "Necessário Avaliação Profissional",
    description: "Os sintomas requerem avaliação médica para diagnóstico preciso",
    symptoms: ["Sintomas variados ou não específicos"],
    recommendations: [
      "Agendar consulta com pediatra ou gastropediatra",
      "Manter registro dos sintomas e quando ocorrem",
      "Anotar alimentos ingeridos e reações observadas",
      "Fotografar/descrever qualquer erupção cutânea",
    ],
    urgency: "medium",
    shouldConsult: true,
  },
];
