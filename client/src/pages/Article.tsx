import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, User, ArrowLeft, ArrowRight, AlertTriangle, BookOpen, Sparkles, CheckCircle, Heart } from "lucide-react";

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  emoji: string;
  intro: string;
  sections: { title: string; content: string }[];
  whenToSeek: string[];
  relatedSlugs: string[];
}

const ARTICLES: Record<string, ArticleData> = {
  "refluxo-infantil": {
    slug: "refluxo-infantil",
    title: "Refluxo em Bebê: Quando é Normal, Quando é Problema",
    category: "Refluxo",
    readTime: "8 min",
    emoji: "🍼",
    intro:
      "O refluxo é uma das queixas mais frequentes nos consultórios de gastropediatria. Quase todos os bebês regurgitam nos primeiros meses de vida, e a grande maioria não precisa de tratamento. Mas como saber quando o refluxo deixa de ser fisiológico e passa a ser doença? Neste artigo, vamos entender juntos o raciocínio clínico que guia essa avaliação.",
    sections: [
      {
        title: "O que é Refluxo Gastroesofágico?",
        content:
          "O refluxo gastroesofágico (RGE) é o retorno involuntário do conteúdo gástrico para o esôfago. Em bebês, acontece porque o esfíncter esofágico inferior — a \"válvula\" entre o esôfago e o estômago — ainda está amadurecendo. Isso é absolutamente normal nos primeiros meses de vida. Cerca de 70% dos bebês de 4 meses regurgitam pelo menos uma vez ao dia. A maioria melhora espontaneamente entre 12 e 18 meses, quando o esfíncter amadurece e a criança passa mais tempo em posição vertical.",
      },
      {
        title: "Refluxo Fisiológico vs. Doença do Refluxo",
        content:
          "A diferença fundamental está no impacto clínico. O refluxo fisiológico é o \"bebê que golfou feliz\" — regurgita, mas ganha peso adequadamente, se alimenta bem e não apresenta desconforto significativo. Já a Doença do Refluxo Gastroesofágico (DRGE) causa sintomas que afetam a qualidade de vida: recusa alimentar, choro excessivo durante as mamadas, arqueamento do corpo, irritabilidade persistente, ganho de peso insuficiente ou sintomas respiratórios recorrentes. A investigação é indicada quando há sinais de alerta ou quando os sintomas impactam o desenvolvimento.",
      },
      {
        title: "Manejo Prático: O que Funciona",
        content:
          "Para o refluxo fisiológico, medidas posturais são o pilar do tratamento: manter o bebê em posição vertical por 20-30 minutos após as mamadas, oferecer volumes menores e mais frequentes, e elevar a cabeceira do berço em 30 graus. Evitar roupas apertadas na região abdominal e não movimentar o bebê bruscamente após a alimentação também ajudam. Quando há suspeita de DRGE, o pediatra pode indicar investigação adicional e, em alguns casos, tratamento medicamentoso. Mas atenção: medicação sem indicação precisa pode trazer mais riscos que benefícios.",
      },
    ],
    whenToSeek: [
      "Sangue no vômito ou nas fezes",
      "Recusa alimentar persistente com perda de peso",
      "Choro intenso e arqueamento durante as mamadas",
      "Episódios de engasgo, tosse crônica ou chiado",
      "Irritabilidade extrema que não melhora com medidas posturais",
    ],
    relatedSlugs: ["alergia-alimentar", "constipacao-infantil", "diarreia-cronica"],
  },
  "alergia-alimentar": {
    slug: "alergia-alimentar",
    title: "Alergia Alimentar em Crianças: Identificação e Manejo Seguro",
    category: "Alergias",
    readTime: "11 min",
    emoji: "🥛",
    intro:
      "A Alergia à Proteína do Leite de Vaca (APLV) é a alergia alimentar mais comum na infância, afetando cerca de 2-3% dos bebês. Entender os sinais, como diferenciar de intolerância, e como manejar com segurança é crucial para a saúde do seu filho.",
    sections: [
      {
        title: "Alergia vs. Intolerância: Qual é a Diferença?",
        content:
          "Alergia alimentar é uma reação imunológica — o corpo reconhece uma proteína como ameaça e monta uma resposta imunológica. Pode ser imediata (minutos a 2 horas) com sintomas como urticária, inchaço, vômitos, ou anafilaxia. Ou tardia (horas a dias) com sintomas gastrointestinais como diarreia, cólicas, ou dermatite. Intolerância é uma reação não-imunológica — por exemplo, falta de lactase para digerir lactose. Ambas requerem manejo, mas o tratamento é diferente.",
      },
      {
        title: "Sinais de Alerta para Alergia Alimentar",
        content:
          "Sinais imediatos incluem: inchaço de lábios ou língua, urticária, vômitos, ou dificuldade para respirar — estes são emergências. Sinais tardios incluem: diarreia com sangue ou muco, cólicas intensas, eczema ou dermatite que piora, ou refluxo persistente após introdução de novo alimento. Se você suspeita de alergia, não introduza o alimento novamente sem orientação médica — o risco de reação grave aumenta na reexposição.",
      },
      {
        title: "Diagnóstico e Manejo Seguro",
        content:
          "O diagnóstico não é feito por um único teste. O padrão-ouro é a exclusão do alimento suspeito por 2-4 semanas, observando melhora dos sintomas, seguida de reintrodução controlada. Exames de sangue e testes cutâneos auxiliam, mas não são definitivos isoladamente. O manejo é a exclusão rigorosa do alérgeno — da dieta da criança e, se em aleitamento materno, da dieta materna. Substitutos seguros devem ser oferecidos para garantir nutrição adequada. O acompanhamento com gastropediatra é fundamental.",
      },
    ],
    whenToSeek: [
      "Inchaço de lábios, língua ou garganta",
      "Dificuldade para respirar",
      "Vômitos ou diarreia com sangue",
      "Reações cutâneas graves",
      "Qualquer suspeita de reação alérgica imediata",
    ],
    relatedSlugs: ["refluxo-infantil", "diarreia-cronica", "intolerancia-lactose"],
  },
  "constipacao-infantil": {
    slug: "constipacao-infantil",
    title: "Constipação Infantil: Além do Laxante",
    category: "Constipação",
    readTime: "9 min",
    emoji: "💪",
    intro:
      "A constipação intestinal é uma das queixas mais comuns na pediatria, responsável por até 25% das consultas em gastropediatria. Muitos pais recorrem a laxantes como primeira solução, mas entender as causas é fundamental para um tratamento eficaz e duradouro. Vamos além da receita e entender o que realmente está acontecendo.",
    sections: [
      {
        title: "O que é Constipação na Criança?",
        content:
          "Constipação não é apenas \"não fazer cocô todo dia\". A frequência normal varia com a idade: recém-nascidos em aleitamento materno podem evacuar de 8 vezes ao dia a uma vez a cada 7 dias. Crianças maiores geralmente evacuam de 3 vezes ao dia a 3 vezes por semana. O que define constipação é a combinação de fezes endurecidas, dificuldade ou dor para evacuar, e comportamento de retenção. Os critérios de Roma IV ajudam o médico a fazer o diagnóstico de forma padronizada.",
      },
      {
        title: "O Ciclo Vicioso da Constipação",
        content:
          "Mais de 95% dos casos de constipação são funcionais — não há doença orgânica. O ciclo vicioso é clássico: a criança sente dor ao evacuar, passa a reter as fezes, as fezes ficam mais duras, e a próxima evacuação é ainda mais dolorosa. Fatores desencadeantes incluem: introdução alimentar inadequada, desfralde forçado, mudanças de rotina, estresse, e dieta pobre em fibras. Identificar e corrigir esses fatores é essencial.",
      },
      {
        title: "Abordagem Integrada ao Tratamento",
        content:
          "O tratamento eficaz tem três pilares: desimpactação (quando necessário), manutenção e mudança de hábitos. A alimentação é fundamental — aumentar gradualmente fibras, garantir hidratação adequada, e reduzir excesso de leite de vaca. O treinamento evacuatório — sentar no vaso após as refeições — aproveita reflexos naturais. Laxantes podem ser necessários, mas sempre sob orientação médica como parte de uma estratégia mais ampla, nunca como solução única.",
      },
    ],
    whenToSeek: [
      "Constipação desde o nascimento",
      "Sangue nas fezes recorrente",
      "Distensão abdominal importante",
      "Falha no crescimento ou perda de peso",
      "Constipação que não melhora com medidas dietéticas",
    ],
    relatedSlugs: ["refluxo-infantil", "alergia-alimentar", "diarreia-cronica"],
  },
  "diarreia-cronica": {
    slug: "diarreia-cronica",
    title: "Diarreia Crônica em Crianças: Investigação e Manejo",
    category: "Diarreia",
    readTime: "9 min",
    emoji: "💧",
    intro: "Diarreia crônica em crianças pode ter múltiplas causas. Entender quando é apenas uma alteração transitória e quando requer investigação é fundamental para o cuidado adequado.",
    sections: [
      {
        title: "Definindo Diarreia Crônica",
        content: "Diarreia crônica é definida como fezes soltas ou aquosas por mais de 2 semanas. Pode ser contínua, intermitente ou recorrente. As causas variam conforme a idade: em bebês, frequentemente está relacionada a alergias alimentares ou intolerâncias. Em crianças maiores, pode indicar infecções recorrentes, alergias, intolerâncias, ou problemas de absorção. A avaliação cuidadosa das características das fezes, padrão de ocorrência e sintomas associados ajuda a orientar a investigação.",
      },
      {
        title: "Investigação Clínica Sistemática",
        content: "A história clínica é fundamental: quando começou, padrão das fezes, presença de sangue ou muco, sintomas associados, ganho de peso, e relação com alimentos. Observar se há perda de peso, desnutrição, ou sinais de desidratação é essencial. Alguns casos requerem investigação laboratorial — exames de fezes, testes de alergia, ou endoscopia. Mas muitos casos de diarreia crônica são funcionais e melhoram com ajustes dietéticos e manejo adequado.",
      },
      {
        title: "Estratégias de Manejo",
        content: "O manejo depende da causa. Se relacionada a alergia alimentar, exclusão do alérgeno é essencial. Se funcional, aumentar fibras solúveis, garantir hidratação, e evitar alimentos que pioram os sintomas ajuda. Probióticos podem ser benéficos em alguns casos. A manutenção do estado nutricional é fundamental — suplementação de vitaminas e minerais pode ser necessária se houver má absorção. O acompanhamento regular com o pediatra garante que o tratamento está sendo eficaz.",
      },
    ],
    whenToSeek: [
      "Sangue ou muco excessivo nas fezes",
      "Perda de peso ou falha no crescimento",
      "Sinais de desidratação",
      "Diarreia por mais de 2 semanas sem melhora",
      "Sintomas de desnutrição ou anemia",
    ],
    relatedSlugs: ["alergia-alimentar", "constipacao-infantil", "intolerancia-lactose"],
  },
  "intolerancia-lactose": {
    slug: "intolerancia-lactose",
    title: "Intolerância à Lactose em Crianças: Diagnóstico e Manejo",
    category: "Alergias",
    readTime: "8 min",
    emoji: "🥛",
    intro: "A intolerância à lactose é diferente de alergia ao leite. Entender essa distinção e como manejar adequadamente é importante para garantir nutrição adequada ao seu filho.",
    sections: [
      {
        title: "O que é Intolerância à Lactose?",
        content: "Intolerância à lactose é a dificuldade em digerir lactose, o açúcar presente no leite. Ocorre quando há deficiência de lactase, a enzima responsável por quebrar a lactose em açúcares simples. Diferentemente da alergia (reação imunológica), a intolerância é uma reação não-imunológica. Os sintomas aparecem após consumo de leite ou derivados: inchaço, gases, diarreia, cólicas e desconforto abdominal.",
      },
      {
        title: "Intolerância Primária vs. Secundária",
        content: "A intolerância primária é genética e desenvolve-se naturalmente após o desmame — é a forma mais comum em adultos. A intolerância secundária ocorre após infecções gastrointestinais que danificam a mucosa intestinal, reduzindo temporariamente a produção de lactase. Crianças com intolerância secundária frequentemente recuperam a capacidade de digerir lactose após alguns meses de exclusão. É importante distinguir entre os dois tipos para orientar adequadamente o manejo.",
      },
      {
        title: "Manejo Nutricional Adequado",
        content: "O manejo envolve redução ou exclusão de leite e derivados, dependendo do grau de intolerância. Muitas crianças toleram pequenas quantidades de leite ou derivados fermentados (iogurte, queijo). Alternativas como leite de cabra, bebidas vegetais enriquecidas e alimentos ricos em cálcio devem ser oferecidas para garantir nutrição adequada. O acompanhamento com nutricionista é recomendado para garantir que a criança receba todos os nutrientes necessários.",
      },
    ],
    whenToSeek: [
      "Sintomas persistentes mesmo com exclusão de lactose",
      "Perda de peso ou falha no crescimento",
      "Sinais de desnutrição",
      "Diarreia com sangue ou muco",
      "Suspeita de alergia ao leite (reação imediata)",
    ],
    relatedSlugs: ["alergia-alimentar", "diarreia-cronica", "refluxo-infantil"],
  },
  "doenca-inflamatoria-intestinal": {
    slug: "doenca-inflamatoria-intestinal",
    title: "Doença Inflamatória Intestinal em Crianças: Reconhecimento Precoce",
    category: "Gastroenterologia",
    readTime: "10 min",
    emoji: "⚠️",
    intro: "Doença inflamatória intestinal (DII) em crianças é rara, mas seu reconhecimento precoce é crucial. Saiba quais sinais merecem investigação especializada.",
    sections: [
      {
        title: "O que é Doença Inflamatória Intestinal?",
        content: "Doença inflamatória intestinal (DII) é um grupo de condições crônicas que causam inflamação no trato gastrointestinal. As duas principais são Doença de Crohn (pode afetar qualquer parte do trato digestivo) e Retocolite Ulcerativa (afeta apenas o cólon e reto). Diferentemente de intolerâncias ou alergias, a DII é uma doença autoimune onde o sistema imunológico ataca o intestino. Em crianças, geralmente se manifesta com diarreia crônica, dor abdominal, perda de peso, e atraso no crescimento.",
      },
      {
        title: "Sinais de Alerta que Requerem Investigação",
        content: "Sinais que sugerem possível DII incluem: diarreia persistente por mais de 4 semanas com sangue ou muco, dor abdominal crônica, perda de peso ou falha no crescimento, atraso na puberdade, aftas recorrentes, ou articulações inchadas. Febre baixa recorrente também pode estar presente. É importante não confundir com constipação ou alergias alimentares — a investigação adequada com gastroenterologista pediátrico é essencial para diagnóstico correto.",
      },
      {
        title: "Diagnóstico e Abordagem Terapêutica",
        content: "O diagnóstico envolve exames de sangue, análise de fezes, e frequentemente endoscopia com biópsia. O tratamento é individualizado e pode incluir anti-inflamatórios, imunomoduladoras, ou terapias biológicas. O objetivo é controlar a inflamação, aliviar sintomas, e permitir crescimento e desenvolvimento normais. O acompanhamento multidisciplinar — com gastroenterologista, nutricionista, e psicólogo — garante cuidado integral. Embora seja uma condição crônica, muitas crianças vivem bem com tratamento apropriado.",
      },
    ],
    whenToSeek: [
      "Diarreia persistente com sangue por mais de 4 semanas",
      "Dor abdominal crônica",
      "Perda de peso ou falha no crescimento",
      "Atraso na puberdade",
      "Aftas recorrentes ou problemas articulares associados",
    ],
    relatedSlugs: ["diarreia-cronica", "constipacao-infantil", "alergia-alimentar"],
  },
  "doenca-celiaca": {
    slug: "doenca-celiaca",
    title: "Doença Celíaca em Crianças: Diagnóstico e Manejo com Dieta Sem Glúten",
    category: "Alergias",
    readTime: "10 min",
    emoji: "🌾",
    intro: "A doença celíaca é uma condição autoimune que afeta a absorção de nutrientes. Entender seus sinais e como manejar com dieta sem glúten é essencial para a saúde e desenvolvimento da criança.",
    sections: [
      {
        title: "O que é Doença Celíaca?",
        content: "Doença celíaca é uma condição autoimune onde o consumo de glúten (proteína presente em trigo, cevada e centeio) causa inflamação no intestino delgado, danificando as vilosidades intestinais e prejudicando a absorção de nutrientes. Afeta cerca de 1% da população e tem predisposição genética. Pode se manifestar em qualquer idade, mas frequentemente aparece após a introdução de alimentos com glúten (por volta dos 6-12 meses) ou após infecções que desencadeiam a resposta autoimune.",
      },
      {
        title: "Sinais e Sintomas",
        content: "Os sintomas variam bastante. Alguns incluem: diarreia crônica, constipação, distensão abdominal, dor abdominal recorrente, perda de peso ou falha no crescimento, anemia, fadiga, irritabilidade, atraso no desenvolvimento, dermatite herpetiforme (erupção cutânea característica) e aftas recorrentes. Alguns casos são assintomáticos e descobertos apenas por triagem em familiares de afetados. A apresentação clínica varia significativamente entre crianças.",
      },
      {
        title: "Diagnóstico e Manejo com Dieta Sem Glúten",
        content: "O diagnóstico envolve exames de sangue (sorologia) e confirmação com biópsia duodenal. É importante que a criança esteja consumindo glúten no momento dos testes — uma dieta sem glúten prematura pode resultar em falsos negativos. O tratamento é a dieta sem glúten rigorosa, que deve ser mantida por toda a vida. Nutricionista especializado é fundamental para garantir que a criança receba todos os nutrientes necessários. A maioria das crianças melhora significativamente com a dieta e pode ter vida completamente normal.",
      },
    ],
    whenToSeek: [
      "Diarreia crônica ou constipação persistente",
      "Falha no crescimento ou perda de peso",
      "Anemia sem causa aparente",
      "Atraso no desenvolvimento",
      "Histórico familiar de doença celíaca",
    ],
    relatedSlugs: ["diarreia-cronica", "alergia-alimentar", "constipacao-infantil"],
  },
  "sangue-fezes": {
    slug: "sangue-fezes",
    title: "Sangue nas Fezes em Crianças: Quando Investigar",
    category: "Gastroenterologia",
    readTime: "8 min",
    emoji: "🩸",
    intro: "Sangue nas fezes é sempre motivo de preocupação para os pais. Entender as possíveis causas e quando investigar ajuda a manter a calma e buscar ajuda apropriada.",
    sections: [
      {
        title: "Causas Comuns de Sangue nas Fezes",
        content: "Sangue nas fezes em crianças pode ter múltiplas causas. As mais comuns incluem: fissura anal (causa mais frequente em crianças pequenas), alergia alimentar (especialmente APLV), constipação com trauma da mucosa, infecções gastrointestinais, doença inflamatória intestinal, doença celíaca, e poliposes. A localização do sangue (misturado com fezes, nas fraldas ou no papel) e a quantidade ajudam a orientar o diagnóstico.",
      },
      {
        title: "Avaliação Clínica Inicial",
        content: "A história clínica é fundamental: há quanto tempo ocorre, frequência, quantidade, presença de dor ou desconforto, outros sintomas gastrointestinais, padrão alimentar e histórico familiar. Exame físico cuidadoso, incluindo inspeção da região anal, geralmente revela a causa em muitos casos. Alguns casos requerem investigação adicional com exames de sangue, análise de fezes, ou endoscopia. Não se deve ignorar sangue nas fezes, mas também não é necessário panicar — a maioria dos casos tem causa benigna.",
      },
      {
        title: "Quando Procurar Ajuda Especializada",
        content: "Procure avaliação especializada se: o sangue persiste por mais de 2 semanas, há quantidade significativa de sangue, há perda de peso ou falha no crescimento, há febre ou outros sintomas sistêmicos, ou há histórico familiar de doença inflamatória intestinal ou poliposes. Avaliação urgente é necessária se há sinais de choque ou sangramento profuso. O gastropediatra pode orientar adequadamente sobre a necessidade de investigação adicional.",
      },
    ],
    whenToSeek: [
      "Sangue nas fezes por mais de 2 semanas",
      "Quantidade significativa de sangue",
      "Perda de peso ou falha no crescimento",
      "Febre ou outros sintomas sistêmicos",
      "Sangramento profuso ou sinais de choque",
    ],
    relatedSlugs: ["alergia-alimentar", "diarreia-cronica", "constipacao-infantil"],
  },
};

const ALL_ARTICLES_META: Record<string, { title: string; category: string; emoji: string }> = {
  "refluxo-infantil": { title: "Refluxo em Bebê", category: "Refluxo", emoji: "🍼" },
  "alergia-alimentar": { title: "Alergia Alimentar", category: "Alergias", emoji: "🥛" },
  "constipacao-infantil": { title: "Constipação Infantil", category: "Constipação", emoji: "💪" },
  "diarreia-cronica": { title: "Diarreia Crônica", category: "Diarreia", emoji: "💧" },
  "intolerancia-lactose": { title: "Intolerância à Lactose", category: "Alergias", emoji: "🥛" },
  "doenca-inflamatoria-intestinal": { title: "Doença Inflamatória Intestinal", category: "Gastroenterologia", emoji: "⚠️" },
  "doenca-celiaca": { title: "Doença Celíaca", category: "Alergias", emoji: "🌾" },
  "sangue-fezes": { title: "Sangue nas Fezes", category: "Gastroenterologia", emoji: "🩸" },
};

const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";

export default function Article() {
  const [, params] = useRoute("/artigo/:slug");
  const slug = params?.slug || "";
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="section-spacing bg-white">
        <div className="container max-w-3xl text-center">
          <div className="text-6xl mb-6">📖</div>
          <h1 className="mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O artigo que você procura não está disponível.
          </p>
          <Link href="/biblioteca" className="btn-primary">
            Voltar para Biblioteca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Article Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal/10 via-background to-background py-16 md:py-24">
        <div className="absolute top-0 right-0 text-8xl opacity-10 pointer-events-none">{article.emoji}</div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="container max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/biblioteca"
              className="text-teal font-semibold text-sm mb-8 inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Biblioteca
            </Link>

            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-teal/20 text-teal text-xs font-bold rounded-full uppercase tracking-wider">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-8 leading-[1.1] text-foreground">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-foreground/70 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Dr. Bruno Fernandes
              </span>
              <span className="text-teal/30">•</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} de leitura
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-spacing bg-cream">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Introduction */}
            <div className="bg-blue/8 border-l-4 border-blue p-6 rounded-2xl mb-10">
              <p className="text-foreground leading-relaxed text-lg">
                {article.intro}
              </p>
            </div>

            {/* Sections */}
            {article.sections.map((section, idx) => (
              <div key={idx} className="mb-10">
                <h2 className="text-2xl md:text-3xl mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {section.content}
                </p>
              </div>
            ))}

            {/* When to Seek */}
            <div className="bg-coral/10 border-l-4 border-coral p-6 rounded-2xl mb-10">
              <h3 className="text-xl mb-4 text-coral flex items-center gap-2 font-display font-bold">
                <AlertTriangle className="w-5 h-5" />
                Quando Procurar o Pediatra
              </h3>
              <ul className="space-y-3">
                {article.whenToSeek.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-golden/10 p-5 rounded-2xl mb-6">
              <p className="text-muted-foreground text-sm flex items-start gap-2">
                <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue" />
                Este artigo é informativo e educativo. Não substitui avaliação médica profissional. Sempre consulte um pediatra para diagnóstico e tratamento adequado.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-spacing bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-2xl md:text-3xl mb-8 text-center">Artigos <span className="text-coral">Relacionados</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {article.relatedSlugs.map((relSlug) => {
              const meta = ALL_ARTICLES_META[relSlug];
              if (!meta) return null;
              return (
                <Link
                  key={relSlug}
                  href={`/artigo/${relSlug}`}
                  className="card-base p-5 group block border-t-4 border-blue/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{meta.emoji}</span>
                    <span className="text-xs font-bold text-blue bg-blue/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-display">
                      {meta.category}
                    </span>
                  </div>
                  <h3 className="text-lg mb-2 group-hover:text-blue transition-colors">
                    {meta.title}
                  </h3>
                  <span className="text-blue font-bold text-sm inline-flex items-center gap-1 font-display">
                    Ler artigo
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing relative overflow-hidden bg-gradient-to-br from-teal via-teal/95 to-teal/90">
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="#f5f1eb" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
        <div className="container max-w-2xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="!text-white mb-4 text-3xl md:text-4xl font-display font-bold">Pronto para Entender Melhor?</h2>
            <p className="text-lg mb-10 text-white/90 leading-relaxed">
              Agende uma consulta com o Dr. Bruno para uma avaliação personalizada e orientação específica para seu filho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/553499709226"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !bg-white !text-teal inline-flex items-center justify-center gap-2"
              >
                💬 Conversar no WhatsApp
              </a>
              <Link href="/contato" className="btn-secondary !bg-white/20 !text-white border-2 border-white inline-flex items-center justify-center gap-2 hover:bg-white/30 transition-all">
                📞 Ligar Agora
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
