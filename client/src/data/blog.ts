export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "refluxo" | "constipacao" | "alergias";
  author: string;
  date: string;
  readTime: number;
  content: string;
  tags: string[];
  image?: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    slug: "refluxo-infantil-causas-sintomas",
    title: "Refluxo Infantil: Causas, Sintomas e Quando Procurar Ajuda",
    description: "Guia completo sobre refluxo em crianças, seus sintomas e quando é necessário procurar um especialista.",
    category: "refluxo",
    author: "Dr. Bruno Fernandes",
    date: "2026-03-15",
    readTime: 8,
    tags: ["refluxo", "sintomas", "pediatria"],
    content: `
# Refluxo Infantil: Guia Completo para Pais

O refluxo gastroesofágico (RGE) é uma das condições mais comuns em bebês e crianças pequenas. Neste artigo, vamos explorar tudo o que você precisa saber sobre essa condição.

## O que é Refluxo?

O refluxo ocorre quando o alimento ou ácido do estômago volta para o esôfago. Isso acontece porque o esfíncter esofágico inferior (LES), que funciona como uma válvula, ainda não está completamente desenvolvido em bebês.

## Sintomas Comuns

- Vômitos ou regurgitação frequente
- Irritabilidade após alimentação
- Recusa alimentar
- Tosse noturna
- Halitose (mau hálito)
- Dificuldade para ganhar peso

## Causas do Refluxo

Em bebês, o refluxo é geralmente fisiológico e melhora com o tempo. Porém, alguns fatores podem aumentar o risco:

1. **Imaturidade do esfíncter esofágico**: O LES ainda está em desenvolvimento
2. **Posição durante alimentação**: Bebês deitados têm mais refluxo
3. **Volume de alimento**: Refeições muito grandes aumentam o refluxo
4. **Tipo de alimento**: Alimentos gordurosos e ácidos podem piorar
5. **Histórico familiar**: Predisposição genética

## Quando Procurar um Especialista?

Procure o Dr. Bruno se seu filho apresenta:

- Refluxo persistente após 18-24 meses
- Dor abdominal intensa
- Sangue no vômito
- Dificuldade para ganhar peso
- Sintomas que afetam a qualidade de vida

## Medidas Práticas em Casa

### Posicionamento
- Mantenha a cabeça elevada em 30 graus durante o sono
- Evite deitar imediatamente após alimentação
- Use almofadas apropriadas para a idade

### Alimentação
- Ofereça refeições menores e mais frequentes
- Evite alimentos gordurosos e ácidos
- Aguarde 30 minutos após alimentação antes de deitar

### Estilo de Vida
- Mantenha a criança em posição vertical durante e após refeições
- Evite roupas muito apertadas
- Reduza o estresse (que pode piorar os sintomas)

## Tratamento

A maioria dos casos de refluxo melhora naturalmente com o tempo. Porém, se necessário, o Dr. Bruno pode recomendar:

- Mudanças na alimentação
- Medicações para reduzir ácido gástrico
- Avaliação de alergias alimentares

## Conclusão

O refluxo infantil é comum e geralmente transitório. Com as medidas corretas e acompanhamento profissional, a maioria das crianças melhora significativamente. Se você tem dúvidas, agende uma consulta com o Dr. Bruno para avaliação personalizada.
    `,
  },
  {
    id: "2",
    slug: "constipacao-infantil-solucoes",
    title: "Constipação Infantil: Causas e Soluções Práticas",
    description: "Entenda as causas da constipação em crianças e aprenda estratégias eficazes para melhorar a função intestinal.",
    category: "constipacao",
    author: "Dr. Bruno Fernandes",
    date: "2026-03-10",
    readTime: 7,
    tags: ["constipação", "intestino", "nutrição"],
    content: `
# Constipação Infantil: Guia Prático para Pais

A constipação é uma queixa frequente em consultório pediátrico. Muitos pais se preocupam quando seus filhos não evacuam regularmente. Vamos esclarecer essa questão.

## O que é Constipação?

Constipação não é apenas sobre frequência de evacuações, mas sobre a dificuldade ou desconforto ao evacuar. Fezes duras, ressecadas e infrequentes são sinais de constipação.

## Frequência Normal por Idade

- **Bebês amamentados**: Podem evacuar a cada mamada ou uma vez por semana
- **Bebês com fórmula**: Geralmente 1-2 vezes por dia
- **Crianças maiores**: 1-3 vezes por dia é considerado normal

## Causas Comuns

### Nutricionais
- Ingestão insuficiente de fibras
- Falta de líquidos
- Transição para alimentação sólida

### Comportamentais
- Ignorar o desejo de evacuar
- Medo do vaso sanitário
- Falta de atividade física

### Médicas
- Alergia alimentar
- Intolerância à lactose
- Problemas anatômicos (raros)

## Estratégias Práticas

### 1. Aumente a Ingestão de Fibras

**Frutas e Vegetais:**
- Maçã com casca
- Pera
- Ameixa
- Abóbora
- Brócolis

**Cereais Integrais:**
- Aveia
- Pão integral
- Arroz integral

### 2. Hidratação Adequada

- Ofereça água regularmente ao longo do dia
- Evite bebidas açucaradas
- Aumente especialmente em dias quentes

### 3. Atividade Física

- Brinque ao ar livre
- Pratique esportes
- Reduza tempo de tela

### 4. Hábitos Regulares

- Estabeleça horário para ir ao banheiro
- Preferencialmente após refeições
- Crie rotina sem pressão

## Quando Procurar Ajuda

Consulte o Dr. Bruno se:

- Constipação persiste por mais de 2 semanas
- Há dor abdominal intensa
- Sangue nas fezes
- Perda de peso
- Incontinência fecal

## Tratamento

Dependendo da causa, o Dr. Bruno pode recomendar:

- Ajustes dietéticos
- Suplementos de fibra
- Medicações específicas
- Investigação de alergias alimentares

## Conclusão

A constipação infantil geralmente responde bem a mudanças simples no estilo de vida. Paciência e consistência são fundamentais. Se os sintomas persistirem, procure orientação profissional.
    `,
  },
  {
    id: "3",
    slug: "alergias-alimentares-criancas",
    title: "Alergias Alimentares em Crianças: Identificação e Manejo",
    description: "Aprenda a identificar sinais de alergia alimentar e como manejar essa condição de forma segura.",
    category: "alergias",
    author: "Dr. Bruno Fernandes",
    date: "2026-03-05",
    readTime: 9,
    tags: ["alergia", "alimentação", "segurança"],
    content: `
# Alergias Alimentares em Crianças: Guia Essencial

Alergias alimentares afetam aproximadamente 8% das crianças. Compreender essa condição é fundamental para a segurança e bem-estar da criança.

## Alergia vs. Intolerância

### Alergia Alimentar
- Envolve o sistema imunológico
- Pode ser grave e até fatal
- Sintomas aparecem rapidamente (minutos a horas)
- Requer evitar completamente o alimento

### Intolerância Alimentar
- Problema digestivo, não imunológico
- Geralmente não é grave
- Sintomas aparecem lentamente
- Às vezes pequenas quantidades são toleradas

## Alimentos Alergênicos Comuns

Os "8 principais" alergênicos responsáveis por 90% das alergias:

1. Leite de vaca
2. Ovo
3. Amendoim
4. Castanhas
5. Peixe
6. Frutos do mar
7. Soja
8. Trigo

## Sinais de Alergia Alimentar

### Sintomas Leves
- Coceira na boca/garganta
- Urticária
- Eczema
- Inchaço leve de lábios

### Sintomas Moderados
- Vômitos
- Diarréia
- Dor abdominal
- Inchaço mais pronunciado

### Sintomas Graves (Anafilaxia)
- Dificuldade respiratória
- Inchaço de garganta
- Queda de pressão
- Perda de consciência

**Anafilaxia é uma emergência médica. Procure atendimento imediato!**

## Diagnóstico

O Dr. Bruno pode usar:

- **Teste de pele**: Aplicação de pequenas quantidades do alérgeno
- **Teste de sangue**: Detecção de anticorpos IgE
- **Teste de provocação oral**: Sob supervisão médica
- **Histórico detalhado**: Padrão de sintomas

## Manejo Seguro

### 1. Evitar o Alimento
- Leia rótulos cuidadosamente
- Procure por "pode conter traços de..."
- Comunique com escolas e cuidadores

### 2. Introdução Segura de Alimentos
- Introduza um alimento por vez
- Espere 3-5 dias antes de novo alimento
- Ofereça durante o dia (não à noite)
- Observe sinais de reação

### 3. Alternativas Nutricionais

**Se alérgico a leite:**
- Fórmula hipoalergênica
- Leites alternativos (soja, aveia)
- Suplementação de cálcio

**Se alérgico a ovo:**
- Substitutos de ovo em receitas
- Alimentos ricos em proteína alternativa

## Quando Introduzir Alimentos Alergênicos

Pesquisas recentes sugerem que introduzir alimentos alergênicos cedo (após 6 meses) pode reduzir risco de alergia. Porém, isso deve ser feito:

- Sob orientação médica
- Um alimento por vez
- Com supervisão
- Em ambiente seguro

## Conclusão

Alergias alimentares requerem vigilância, mas com conhecimento e planejamento, crianças alérgicas podem viver vidas plenas e seguras. O Dr. Bruno está aqui para ajudar no diagnóstico e manejo personalizado.
    `,
  },
  {
    id: "4",
    slug: "introducao-alimentos-solidos",
    title: "Introdução de Alimentos Sólidos: Guia Passo a Passo",
    description: "Saiba como introduzir alimentos sólidos de forma segura e nutritiva para seu bebê.",
    category: "alergias",
    author: "Dr. Bruno Fernandes",
    date: "2026-02-28",
    readTime: 8,
    tags: ["alimentação", "bebê", "nutrição"],
    content: `
# Introdução de Alimentos Sólidos: Guia Completo

A introdução de alimentos sólidos é um marco importante no desenvolvimento do bebê. Este guia oferece orientações baseadas em evidências científicas.

## Quando Começar?

A maioria dos bebês está pronta para alimentos sólidos entre 4-6 meses, com sinais de prontidão incluindo:

- Controle de cabeça adequado
- Interesse por alimentos
- Capacidade de engolir
- Desaparecimento do reflexo de protrusão da língua

## Primeiros Alimentos

### Cereais
- Arroz integral
- Aveia
- Milho

### Frutas
- Maçã
- Pera
- Banana

### Vegetais
- Abóbora
- Batata doce
- Cenoura (após 8 meses)

## Método de Introdução

### Semana 1-2
- Um alimento por vez
- Quantidade pequena (1-2 colheres)
- Observar por 3-5 dias
- Aumentar gradualmente

### Semana 3-4
- Introduzir segundo alimento
- Manter mesmo protocolo
- Observar reações

### Mês 2-3
- Combinar alimentos
- Aumentar variedade
- Oferecer 2-3 refeições

## Sinais de Reação Alérgica

- Vômitos
- Diarréia
- Constipação
- Eczema
- Inchaço

Se observar qualquer sinal, suspenda o alimento e consulte o Dr. Bruno.

## Alimentos a Evitar

**Antes de 1 ano:**
- Mel (risco de botulismo)
- Alimentos duros (risco de asfixia)
- Alimentos muito salgados

**Antes de 3 anos:**
- Amendoim integral
- Nozes inteiras
- Uvas inteiras

## Conclusão

A introdução de alimentos sólidos é um processo gradual que requer paciência. Cada bebê é único, então adapte o ritmo às necessidades do seu filho. O Dr. Bruno está disponível para orientação personalizada.
    `,
  },
  {
    id: "5",
    slug: "postura-alimentacao-refluxo",
    title: "A Importância da Postura Durante a Alimentação",
    description: "Como a posição correta durante refeições pode reduzir sintomas de refluxo e melhorar digestão.",
    category: "refluxo",
    author: "Dr. Bruno Fernandes",
    date: "2026-02-20",
    readTime: 6,
    tags: ["postura", "refluxo", "digestão"],
    content: `
# A Importância da Postura Durante a Alimentação

A postura durante e após as refeições tem impacto significativo na digestão e na redução de sintomas como refluxo. Vamos explorar como otimizar essa prática.

## Por Que a Postura Importa?

A gravidade desempenha papel crucial na digestão. Uma postura adequada facilita o movimento do alimento através do esôfago e estômago, reduzindo o refluxo.

## Postura Ideal Durante Refeições

### Para Bebês
- Segure em posição semi-vertical (45-60 graus)
- Apoie bem a cabeça e pescoço
- Evite deitar completamente

### Para Crianças Maiores
- Sente-se direito na cadeira
- Pés apoiados no chão ou banquinho
- Mesa na altura apropriada
- Relaxado, sem pressão

## Após as Refeições

### Primeiros 30 Minutos
- Mantenha posição vertical
- Evite deitar ou inclinar para trás
- Caminhe um pouco se possível

### Posição para Dormir
- Eleve a cabeça em 30 graus
- Use almofada apropriada
- Evite posição completamente deitada

## Dicas Práticas

1. **Use almofadas adequadas**: Nem muito altas, nem muito baixas
2. **Evite apertar a cintura**: Roupas soltas facilitam digestão
3. **Não corra após comer**: Atividade vigorosa pode piorar refluxo
4. **Mastigação adequada**: Facilita digestão

## Conclusão

Postura correta é uma intervenção simples mas poderosa. Combinada com outras medidas, pode fazer grande diferença na qualidade de vida da criança.
    `,
  },
];

export const blogCategories = [
  { id: "refluxo", label: "Refluxo", color: "from-blue to-teal" },
  { id: "constipacao", label: "Constipação", color: "from-amber to-orange" },
  { id: "alergias", label: "Alergias", color: "from-rose to-pink" },
];
