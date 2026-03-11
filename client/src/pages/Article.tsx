import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, User, ArrowLeft, ArrowRight, AlertTriangle, BookOpen, Sparkles } from "lucide-react";

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
  "refluxo-bebe": {
    slug: "refluxo-bebe",
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
    relatedSlugs: ["aplv-guia-completo", "constipacao-infantil", "coco-crianca"],
  },
  "aplv-guia-completo": {
    slug: "aplv-guia-completo",
    title: "APLV (Alergia à Proteína do Leite de Vaca): Sinais e Manejo",
    category: "Alergias",
    readTime: "10 min",
    emoji: "🥛",
    intro:
      "A Alergia à Proteína do Leite de Vaca (APLV) é a alergia alimentar mais comum na infância, afetando cerca de 2-3% dos bebês. É também uma das mais confusas para os pais, porque os sintomas podem ser sutis e se sobrepor a outras condições. Vamos desmistificar essa alergia com ciência e clareza.",
    sections: [
      {
        title: "O que é APLV e como se manifesta?",
        content:
          "A APLV é uma reação imunológica adversa às proteínas presentes no leite de vaca (caseína e proteínas do soro). Pode se manifestar de forma imediata (minutos a 2 horas após ingestão) com urticária, vômitos, inchaço ou, raramente, anafilaxia. Ou de forma tardia (horas a dias), com sintomas gastrointestinais como diarreia com muco ou sangue, cólicas intensas, refluxo persistente, constipação e dermatite. A forma tardia é mais difícil de diagnosticar porque os sintomas são inespecíficos e podem ser confundidos com outras condições.",
      },
      {
        title: "Diagnóstico: O Caminho Correto",
        content:
          "O diagnóstico de APLV não é feito por um único exame. O padrão-ouro é o teste de provocação oral, precedido por um período de exclusão. Na prática, o médico orienta a retirada completa das proteínas do leite de vaca da dieta (do bebê e da mãe, se em aleitamento materno) por 2-4 semanas. Se houver melhora significativa dos sintomas, seguida de retorno dos sintomas na reintrodução, o diagnóstico é confirmado. Exames de sangue (IgE específica) e testes cutâneos podem auxiliar, mas não são definitivos isoladamente.",
      },
      {
        title: "Manejo e Perspectiva de Cura",
        content:
          "O tratamento é a exclusão rigorosa das proteínas do leite de vaca. Para bebês em aleitamento materno, a mãe faz dieta de exclusão com suplementação de cálcio. Para bebês em fórmula, existem fórmulas especiais (extensamente hidrolisadas ou à base de aminoácidos). A boa notícia: a maioria das crianças supera a APLV. Cerca de 50% toleram leite de vaca aos 12 meses, 75% aos 3 anos e mais de 90% aos 6 anos. O acompanhamento com gastropediatra é fundamental para garantir nutrição adequada e planejar a reintrodução no momento certo.",
      },
    ],
    whenToSeek: [
      "Sangue nas fezes do bebê",
      "Perda de peso ou ganho insuficiente",
      "Vômitos frequentes com recusa alimentar",
      "Dermatite grave que não responde a tratamento",
      "Suspeita de reação alérgica imediata (inchaço, urticária)",
    ],
    relatedSlugs: ["refluxo-bebe", "introducao-alimentar", "coco-crianca"],
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
        title: "As Causas Reais (e o Ciclo Vicioso)",
        content:
          "Na grande maioria dos casos (mais de 95%), a constipação é funcional — não há doença orgânica. O ciclo vicioso é clássico: a criança sente dor ao evacuar → passa a reter as fezes → as fezes ficam mais duras e volumosas → a próxima evacuação é ainda mais dolorosa. Fatores desencadeantes incluem: introdução alimentar com pouca fibra e água, desfralde precoce ou forçado, mudanças de rotina, estresse emocional e dieta rica em leite de vaca e pobre em frutas e vegetais.",
      },
      {
        title: "Tratamento Integrado: Muito Além do Laxante",
        content:
          "O tratamento eficaz tem três pilares: desimpactação (quando há fecaloma), manutenção e mudança de hábitos. A alimentação é fundamental: aumentar gradualmente fibras (frutas, vegetais, cereais integrais), garantir hidratação adequada e reduzir excesso de leite de vaca. O treinamento evacuatório — sentar no vaso após as refeições por 5-10 minutos, com apoio para os pés — aproveita o reflexo gastrocólico natural. Laxantes podem ser necessários temporariamente, mas sempre sob orientação médica e como parte de uma estratégia mais ampla.",
      },
    ],
    whenToSeek: [
      "Constipação desde o nascimento (pode indicar causa orgânica)",
      "Sangue nas fezes recorrente",
      "Distensão abdominal importante",
      "Falha no crescimento ou perda de peso",
      "Constipação que não melhora com medidas dietéticas",
    ],
    relatedSlugs: ["coco-crianca", "introducao-alimentar", "refluxo-bebe"],
  },
  "introducao-alimentar": {
    slug: "introducao-alimentar",
    title: "Introdução Alimentar: Guia Completo para Pais",
    category: "Alimentação",
    readTime: "12 min",
    emoji: "🥑",
    intro:
      "A introdução alimentar é um marco no desenvolvimento do bebê e uma das fases que mais gera ansiedade nos pais. Quando começar? O que oferecer primeiro? BLW ou papinha? Neste guia, vamos navegar juntos por esse momento com base nas evidências científicas mais atuais e muito bom senso.",
    sections: [
      {
        title: "Quando e Como Começar",
        content:
          "A Sociedade Brasileira de Pediatria e a OMS recomendam aleitamento materno exclusivo até os 6 meses, com introdução de alimentos complementares a partir dessa idade. Os sinais de prontidão incluem: sentar com apoio mínimo, perda do reflexo de protrusão da língua, interesse pelos alimentos e coordenação mão-boca. Não há evidência de que começar antes dos 6 meses traga benefícios — pelo contrário, pode aumentar riscos de alergias e problemas gastrointestinais.",
      },
      {
        title: "O que Oferecer e em que Ordem",
        content:
          "Não existe uma ordem obrigatória de introdução de alimentos. O importante é oferecer variedade: frutas, legumes, verduras, cereais, tubérculos, leguminosas e proteínas animais. Comece com alimentos de sabor suave e textura adequada. A exposição precoce a alimentos potencialmente alergênicos (ovo, peixe, amendoim) é hoje recomendada — não se deve atrasar a introdução desses alimentos. Sal e açúcar devem ser evitados até os 2 anos. Mel é contraindicado antes de 1 ano pelo risco de botulismo.",
      },
      {
        title: "BLW, Papinha ou Abordagem Mista?",
        content:
          "O Baby-Led Weaning (BLW) propõe oferecer alimentos em pedaços desde o início, permitindo que o bebê se alimente sozinho. A abordagem tradicional usa papinhas amassadas com progressão gradual de textura. A abordagem mista combina ambas. Todas são válidas quando feitas com segurança. O mais importante é: respeitar os sinais de fome e saciedade do bebê, não forçar alimentação, oferecer variedade, e tornar as refeições um momento prazeroso. A alimentação responsiva — onde o cuidador oferece e o bebê decide quanto come — é o princípio que une todas as abordagens.",
      },
    ],
    whenToSeek: [
      "Recusa alimentar persistente após os 6 meses",
      "Engasgos frequentes durante as refeições",
      "Perda de peso ou estagnação do crescimento",
      "Reações alérgicas após introdução de novos alimentos",
      "Vômitos ou diarreia recorrentes com novos alimentos",
    ],
    relatedSlugs: ["aplv-guia-completo", "constipacao-infantil", "coco-crianca"],
  },
  "coco-crianca": {
    slug: "coco-crianca",
    title: "Cocô de Criança: Tudo que Você Precisa Saber",
    category: "Desenvolvimento",
    readTime: "7 min",
    emoji: "🔍",
    intro:
      "Vamos falar sobre cocô? Sem tabu e com ciência. As fezes do seu filho são uma janela para a saúde digestiva, e aprender a \"ler\" o que elas dizem pode ajudar você a identificar problemas precocemente e evitar preocupações desnecessárias.",
    sections: [
      {
        title: "O que é Normal em Cada Fase",
        content:
          "Nos primeiros dias, o mecônio (fezes escuras e pegajosas) é completamente normal. Bebês em aleitamento materno exclusivo têm fezes amarelo-douradas, pastosas e com odor suave — podem evacuar várias vezes ao dia ou passar até 7 dias sem evacuar, ambos normais. Bebês em fórmula tendem a ter fezes mais firmes e esverdeadas. Com a introdução alimentar, as fezes mudam significativamente: ficam mais consistentes, com cor e odor mais fortes.",
      },
      {
        title: "Cores e o que Significam",
        content:
          "Amarelo, mostarda, marrom e verde são todas cores normais. Verde pode indicar trânsito intestinal rápido ou excesso de vegetais verdes — geralmente não é preocupante. Vermelho pode ser alimento (beterraba, tomate) ou sangue — observe se repete. Preto pode ser ferro suplementar ou sangue digerido — merece avaliação. A única cor que é sempre emergência é o branco/acólico (fezes sem cor, como massa de vidraceiro), que pode indicar problema nas vias biliares e requer avaliação imediata.",
      },
      {
        title: "Frequência e Consistência",
        content:
          "A Escala de Bristol é a ferramenta que usamos para classificar as fezes. Tipos 3 e 4 (formato de salsicha lisa ou cobra) são o ideal. Tipos 1 e 2 (bolinhas duras) indicam constipação. Tipos 6 e 7 (pastosas ou líquidas) podem indicar diarreia se persistentes. Mais importante que a frequência é o conforto: se a criança evacua sem dor e as fezes têm consistência adequada, o padrão está saudável, independente de ser diário ou a cada 2-3 dias.",
      },
    ],
    whenToSeek: [
      "Fezes brancas ou muito claras (acólicas) — urgente",
      "Sangue vivo ou escuro nas fezes de forma recorrente",
      "Diarreia por mais de 5-7 dias",
      "Fezes com muco excessivo persistente",
      "Mudança brusca de padrão com outros sintomas (febre, dor, vômitos)",
    ],
    relatedSlugs: ["constipacao-infantil", "aplv-guia-completo", "refluxo-bebe"],
  },
};

const ALL_ARTICLES_META: Record<string, { title: string; category: string; emoji: string }> = {
  "refluxo-bebe": { title: "Refluxo em Bebê", category: "Refluxo", emoji: "🍼" },
  "aplv-guia-completo": { title: "APLV: Sinais e Manejo", category: "Alergias", emoji: "🥛" },
  "constipacao-infantil": { title: "Constipação Infantil", category: "Constipação", emoji: "💪" },
  "introducao-alimentar": { title: "Introdução Alimentar", category: "Alimentação", emoji: "🥑" },
  "coco-crianca": { title: "Cocô de Criança", category: "Desenvolvimento", emoji: "🔍" },
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
      <section
        className="section-spacing relative overflow-hidden"
        style={{
          backgroundImage: `url('${PATTERN_BG}')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/85" />
        <div className="absolute top-10 right-[10%] text-4xl animate-float opacity-30 pointer-events-none">{article.emoji}</div>

        <div className="container max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/biblioteca"
              className="text-blue font-bold text-sm mb-6 inline-flex items-center gap-1 hover:underline font-display"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Biblioteca
            </Link>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue/10 text-blue text-xs font-bold rounded-full uppercase tracking-wider font-display">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground text-sm font-display">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                Dr. Bruno
              </span>
              <span className="text-golden">|</span>
              <span className="flex items-center gap-1.5">
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
            <div className="bg-red-50/80 border-l-4 border-red-400 p-6 rounded-2xl mb-10">
              <h3 className="text-xl mb-4 text-red-700 flex items-center gap-2 font-display">
                <AlertTriangle className="w-5 h-5" />
                Quando Procurar o Pediatra
              </h3>
              <ul className="space-y-2">
                {article.whenToSeek.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-0.5">!</span>
                    <span className="text-red-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guia Alimentar CTA - only for introducao-alimentar article */}
            {slug === "introducao-alimentar" && (
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald/10 via-golden/15 to-blue/10 border-3 border-emerald/20 p-6 md:p-8 mb-10">
                <div className="absolute top-4 right-6 text-2xl animate-float opacity-50">🥑</div>
                <div className="flex flex-col md:flex-row md:items-center gap-5 relative z-10">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 rounded-full mb-3">
                      <Sparkles className="w-3 h-3 text-emerald" />
                      <span className="text-xs font-bold text-emerald font-display uppercase tracking-wider">Guia Interativo</span>
                    </div>
                    <h3 className="text-xl mb-2">E Agora, o Que Colocar no Prato?</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Descubra no nosso guia interativo: cronograma por idade, receitas testadas e os erros que quase todo pai comete sem saber.
                    </p>
                  </div>
                  <a
                    href="https://guiabebes-xlauyfmx.manus.space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary whitespace-nowrap inline-flex items-center gap-2"
                  >
                    Quero Descobrir
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

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
      <section className="section-spacing relative overflow-hidden bg-teal">
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="white" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
        <div className="container max-w-2xl text-center relative z-10">
          <h2 className="!text-white mb-4">Quer Conversar com um Especialista?</h2>
          <p className="text-lg mb-8 text-white/85 font-display">
            Agende uma consulta para discussão personalizada sobre o caso do seu filho
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !bg-white !text-teal"
          >
            Agendar Consulta
          </a>
        </div>
      </section>
    </div>
  );
}
