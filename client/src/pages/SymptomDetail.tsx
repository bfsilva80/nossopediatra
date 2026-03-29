import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const SYMPTOMS_DB: Record<string, {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  fullDescription: string;
  causes: string[];
  whenToSeek: string[];
  tips: string[];
  faq: Array<{ question: string; answer: string }>;
}> = {
  "refluxo-infantil": {
    slug: "refluxo-infantil",
    title: "Refluxo Infantil",
    emoji: "🔄",
    description: "Regurgitação frequente e desconforto após alimentação",
    fullDescription: "O refluxo gastroesofágico é comum em bebês pequenos. Ocorre quando o conteúdo do estômago retorna para o esôfago. Enquanto alguns bebês têm refluxo fisiológico (normal), outros desenvolvem doença do refluxo que causa sintomas significativos.",
    causes: [
      "Esfíncter esofágico inferior ainda em desenvolvimento",
      "Posição durante alimentação",
      "Sensibilidade alimentar ou alergia",
      "Excesso de ar durante alimentação"
    ],
    whenToSeek: [
      "Sangue no vômito ou nas fezes",
      "Recusa alimentar persistente",
      "Perda de peso ou ganho inadequado",
      "Choro intenso durante as mamadas",
      "Tosse crônica ou engasgo frequente"
    ],
    tips: [
      "Manter bebê em posição vertical por 20-30 minutos após alimentação",
      "Oferecer volumes menores e mais frequentes",
      "Elevar a cabeceira do berço",
      "Evitar roupas apertadas",
      "Fazer pequenas pausas durante a alimentação"
    ],
    faq: [
      {
        question: "Refluxo é normal em bebês?",
        answer: "Sim, refluxo fisiológico é muito comum e geralmente desaparece entre 12-24 meses. O importante é que o bebê esteja ganhando peso e não apresente sintomas de desconforto."
      },
      {
        question: "Quando o refluxo se torna preocupante?",
        answer: "Quando há sangue, recusa alimentar, perda de peso, ou sintomas que afetam a qualidade de vida do bebê e da família."
      },
      {
        question: "Medicação é sempre necessária?",
        answer: "Não. Muitos casos melhoram apenas com mudanças posturais e alimentares. Medicação é indicada quando as medidas iniciais não funcionam."
      }
    ]
  },
  "constipacao-infantil": {
    slug: "constipacao-infantil",
    title: "Constipação Infantil",
    emoji: "🧱",
    description: "Dificuldade para evacuar ou fezes endurecidas",
    fullDescription: "Constipação em crianças é mais comum do que se imagina. Não é apenas falta de evacuações frequentes, mas a combinação de fezes endurecidas, dificuldade para evacuar e, frequentemente, comportamento de retenção.",
    causes: [
      "Dieta pobre em fibras",
      "Hidratação inadequada",
      "Desfralde forçado",
      "Medo ou dor ao evacuar",
      "Mudanças de rotina ou estresse"
    ],
    whenToSeek: [
      "Constipação desde o nascimento",
      "Sangue nas fezes recorrente",
      "Distensão abdominal importante",
      "Falha no crescimento",
      "Constipação que não melhora com medidas dietéticas"
    ],
    tips: [
      "Aumentar gradualmente a ingestão de fibras",
      "Garantir hidratação adequada (água, sucos naturais)",
      "Estabelecer rotina de ida ao banheiro após refeições",
      "Reduzir excesso de leite de vaca",
      "Oferecer frutas, vegetais e alimentos integrais"
    ],
    faq: [
      {
        question: "Laxante é seguro para crianças?",
        answer: "Laxantes podem ser usados sob orientação médica, mas devem ser parte de uma estratégia maior que inclui mudanças dietéticas e hábitos."
      },
      {
        question: "Constipação pode causar danos?",
        answer: "Constipação crônica pode levar a ciclos de dor e retenção. Por isso, é importante intervir cedo com medidas eficazes."
      },
      {
        question: "Quanto tempo leva para melhorar?",
        answer: "Com mudanças dietéticas e comportamentais, muitas crianças melhoram em 2-4 semanas. Casos mais severos podem levar mais tempo."
      }
    ]
  },
  "diarreia-infantil": {
    slug: "diarreia-infantil",
    title: "Diarreia Infantil",
    emoji: "💧",
    description: "Fezes soltas ou aquosas frequentes",
    fullDescription: "Diarreia em crianças pode ter várias causas: infecções virais, bacterianas, alergias alimentares ou intolerâncias. A maioria dos casos é autolimitada, mas algumas requerem investigação.",
    causes: [
      "Infecção viral (rotavírus, norovírus)",
      "Infecção bacteriana",
      "Alergia ou intolerância alimentar",
      "Mudança na alimentação",
      "Uso de antibióticos"
    ],
    whenToSeek: [
      "Diarreia por mais de 5-7 dias",
      "Sangue ou muco excessivo nas fezes",
      "Sinais de desidratação",
      "Febre alta ou dor abdominal intensa",
      "Perda de peso ou falha no crescimento"
    ],
    tips: [
      "Manter hidratação com soro caseiro ou bebidas isotônicas",
      "Continuar alimentação normalmente (não fazer jejum)",
      "Oferecer alimentos leves e fáceis de digerir",
      "Lavar as mãos frequentemente",
      "Monitorar sinais de desidratação"
    ],
    faq: [
      {
        question: "Devo dar soro caseiro?",
        answer: "Sim, soro caseiro (1 litro de água + 6 colheres de açúcar + 1 colher de sal) é eficaz para manter a hidratação."
      },
      {
        question: "Quando usar antibiótico?",
        answer: "Antibióticos são indicados apenas para infecções bacterianas confirmadas. A maioria das diarreias virais passa sozinha."
      },
      {
        question: "Diarreia crônica é diferente?",
        answer: "Sim. Diarreia crônica (mais de 2 semanas) requer investigação para identificar a causa e orientar o tratamento."
      }
    ]
  },
  "alergia-alimentar": {
    slug: "alergia-alimentar",
    title: "Alergia Alimentar",
    emoji: "⚠️",
    description: "Reação do corpo a proteínas específicas em alimentos",
    fullDescription: "Alergia alimentar é uma reação imunológica do corpo a proteínas específicas em alimentos. Diferente de intolerância, pode ser grave e requer cuidados especiais.",
    causes: [
      "Leite de vaca (APLV)",
      "Ovo",
      "Amendoim",
      "Frutos do mar",
      "Trigo e glúten"
    ],
    whenToSeek: [
      "Inchaço de lábios, língua ou garganta",
      "Dificuldade para respirar",
      "Vômitos ou diarreia com sangue",
      "Reações cutâneas graves",
      "Qualquer suspeita de reação alérgica imediata"
    ],
    tips: [
      "Identificar o alérgeno através de exclusão e reintrodução",
      "Ler rótulos de alimentos cuidadosamente",
      "Evitar contaminação cruzada",
      "Manter medicação de emergência se prescrito",
      "Educar cuidadores sobre a alergia"
    ],
    faq: [
      {
        question: "Como identificar alergia alimentar?",
        answer: "Através de história clínica, testes de pele ou sangue, e teste de provocação controlado sob supervisão médica."
      },
      {
        question: "Alergia alimentar é para a vida toda?",
        answer: "Algumas alergias (leite, ovo) podem desaparecer com o tempo. Outras (amendoim, frutos do mar) tendem a persistir."
      },
      {
        question: "Qual é a diferença entre alergia e intolerância?",
        answer: "Alergia é reação imunológica (pode ser grave). Intolerância é reação não-imunológica (como falta de enzima para digerir lactose)."
      }
    ]
  },
  "dor-abdominal": {
    slug: "dor-abdominal",
    title: "Dor Abdominal Recorrente",
    emoji: "😣",
    description: "Dor na barriga que volta frequentemente",
    fullDescription: "Dor abdominal recorrente em crianças pode ter várias causas. A maioria é funcional (sem doença orgânica), mas algumas requerem investigação.",
    causes: [
      "Constipação",
      "Síndrome do intestino irritável",
      "Intolerância alimentar",
      "Inflamação intestinal",
      "Estresse ou ansiedade"
    ],
    whenToSeek: [
      "Dor que acorda a criança à noite",
      "Perda de peso ou falha no crescimento",
      "Sangue nas fezes",
      "Febre persistente",
      "Dor que interfere nas atividades diárias"
    ],
    tips: [
      "Manter diário de dor (quando, onde, o que comeu)",
      "Aumentar atividade física",
      "Garantir hidratação adequada",
      "Reduzir alimentos que pioram os sintomas",
      "Técnicas de relaxamento e manejo de estresse"
    ],
    faq: [
      {
        question: "Dor abdominal funcional é séria?",
        answer: "Não é grave, mas afeta a qualidade de vida. Com investigação e manejo adequado, melhora significativamente."
      },
      {
        question: "Quando investigar mais profundamente?",
        answer: "Quando há sinais de alerta: sangue, perda de peso, dor noturna, ou dor que não melhora com medidas iniciais."
      },
      {
        question: "Estresse pode causar dor abdominal?",
        answer: "Sim. O intestino é sensível ao estresse. Técnicas de relaxamento e apoio emocional ajudam muito."
      }
    ]
  }
};

export default function SymptomDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const symptom = SYMPTOMS_DB[slug];

  if (!symptom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sintoma não encontrado</h1>
          <Link href="/">
            <Button variant="outline">Voltar para Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": symptom.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // Add FAQ schema to document head
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    
    // Update page title and meta description
    document.title = `${symptom.title} - Nosso Pediatra`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', symptom.description);
    }
    
    return () => {
      script.remove();
    };
  }, [symptom]);

  return (
    <div className="w-full overflow-hidden">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue/5 to-white border-b border-blue/10">
        <div className="container py-8">
            <Link href="/">
              <button className="flex items-center gap-2 text-blue hover:text-blue/80 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="text-5xl">{symptom.emoji}</span>
              <h1 className="text-4xl md:text-5xl font-bold">{symptom.title}</h1>
            </motion.div>
            
            <p className="text-lg text-foreground/70 max-w-2xl">{symptom.fullDescription}</p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Causes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>🔍</span> Possíveis Causas
                </h2>
                <ul className="space-y-3">
                  {symptom.causes.map((cause, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-blue/5 rounded-lg border border-blue/10">
                      <CheckCircle className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{cause}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>💡</span> Dicas Práticas
                </h2>
                <ul className="space-y-3">
                  {symptom.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-emerald/5 rounded-lg border border-emerald/10">
                      <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>❓</span> Perguntas Frequentes
                </h2>
                <div className="space-y-4">
                  {symptom.faq.map((item, i) => (
                    <details key={i} className="group p-4 bg-white border border-blue/10 rounded-lg hover:border-blue/30 transition-colors cursor-pointer">
                      <summary className="font-semibold text-foreground flex items-center justify-between">
                        {item.question}
                        <span className="text-blue group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-4 text-foreground/70 leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* When to Seek Help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-24 p-6 bg-coral/10 border border-coral/30 rounded-lg mb-6"
              >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-coral">
                  <AlertCircle className="w-5 h-5" />
                  Quando Procurar Ajuda
                </h3>
                <ul className="space-y-3">
                  {symptom.whenToSeek.map((item, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="text-coral font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <Button 
                  className="w-full bg-blue hover:bg-blue/90 text-white"
                  onClick={() => window.location.href = "tel:+5534997099226"}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar para Dr. Bruno
                </Button>
                
                <Button 
                  className="w-full bg-emerald hover:bg-emerald/90 text-white"
                  onClick={() => window.location.href = "https://wa.me/5534997099226?text=Olá%20Dr.%20Bruno,%20gostaria%20de%20marcar%20uma%20consulta"}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>

                <Link href="/o-que-a-barriguinha-esta-dizendo">
                  <Button variant="outline" className="w-full">
                    Fazer Avaliação
                  </Button>
                </Link>
              </motion.div>
            </div>
        </div>
      </section>
    </div>
  );
}
