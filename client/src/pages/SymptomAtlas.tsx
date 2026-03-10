import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Lightbulb, Info, ArrowRight } from "lucide-react";

const SYMPTOMS = [
  {
    id: "barriga-inchada",
    name: "Barriga Inchada",
    fullName: "Barriga Inchada / Distensão Abdominal",
    emoji: "🫘",
    description: "Quando a barriguinha fica inchada, dura ou desconfortável",
    whatIs:
      "A distensão abdominal é o aumento do volume da barriga do bebê ou da criança. Pode ser causada por acúmulo de gases, retenção de fezes ou até mesmo por engolir ar durante a alimentação. Na maioria das vezes é benigna, mas merece atenção quando acompanhada de outros sintomas.",
    commonCauses: [
      "Gases intestinais por fermentação alimentar",
      "Alimentação inadequada para a idade",
      "Intolerância alimentar (lactose, frutose)",
      "Constipação intestinal",
    ],
    whenUrgent: [
      "Febre alta associada",
      "Vômitos persistentes",
      "Recusa alimentar total",
      "Choro inconsolável por mais de 3 horas",
    ],
    tips: [
      "Massagem abdominal suave em movimentos circulares",
      "Posição adequada durante e após alimentação",
      "Eructação frequente durante as mamadas",
      "Movimentos de bicicleta com as perninhas",
    ],
  },
  {
    id: "refluxo",
    name: "Refluxo",
    fullName: "Refluxo / Regurgitação",
    emoji: "🔄",
    description: "Quando o alimento volta pela boca após alimentação",
    whatIs:
      "O refluxo gastroesofágico é o retorno do conteúdo gástrico para o esôfago e, às vezes, até a boca. Em bebês, é muito comum nos primeiros meses de vida devido à imaturidade do esfíncter esofágico inferior. A maioria melhora naturalmente até os 12-18 meses.",
    commonCauses: [
      "Imaturidade do esfíncter esofágico inferior",
      "Volume excessivo de alimentação",
      "Posição inadequada durante e após mamada",
      "Intolerância à proteína do leite de vaca",
    ],
    whenUrgent: [
      "Sangue no vômito",
      "Recusa alimentar persistente",
      "Perda de peso ou ganho insuficiente",
      "Dificuldade respiratória após episódios",
    ],
    tips: [
      "Manter posição vertical por 20-30 min após mamada",
      "Oferecer refeições menores e mais frequentes",
      "Elevar a cabeceira do berço em 30 graus",
      "Evitar movimentos bruscos após alimentação",
    ],
  },
  {
    id: "intestino-preso",
    name: "Intestino Preso",
    fullName: "Intestino Preso / Constipação",
    emoji: "💪",
    description: "Quando a criança tem dificuldade para evacuar ou fezes muito duras",
    whatIs:
      "A constipação intestinal é caracterizada pela dificuldade em evacuar, fezes endurecidas ou intervalos prolongados entre as evacuações. É muito comum durante a introdução alimentar e no período de desfralde. O manejo adequado evita complicações como fissuras anais.",
    commonCauses: [
      "Transição alimentar (introdução de sólidos)",
      "Pouca ingestão de água e líquidos",
      "Dieta pobre em fibras",
      "Retenção voluntária (medo de evacuar)",
    ],
    whenUrgent: [
      "Sangue nas fezes",
      "Dor intensa e persistente",
      "Abdômen muito inchado e rígido",
      "Febre associada à constipação",
    ],
    tips: [
      "Aumentar gradualmente a ingestão de água",
      "Oferecer frutas laxativas (mamão, ameixa, laranja)",
      "Estimular atividade física adequada à idade",
      "Nunca forçar ou punir durante evacuação",
    ],
  },
  {
    id: "fezes-diferentes",
    name: "Fezes Diferentes",
    fullName: "Fezes Diferentes / Alteração de Padrão",
    emoji: "💩",
    description: "Quando as fezes mudam de cor, consistência ou frequência",
    whatIs:
      "Mudanças no padrão das fezes são muito comuns em crianças e nem sempre indicam doença. A cor, consistência e frequência variam conforme a idade, alimentação e estado de saúde. Conhecer o padrão normal do seu filho é o primeiro passo para identificar alterações relevantes.",
    commonCauses: [
      "Introdução de novos alimentos na dieta",
      "Alimentos com corantes naturais (beterraba, espinafre)",
      "Infecções gastrointestinais virais",
      "Intolerância ou alergia alimentar",
    ],
    whenUrgent: [
      "Presença de sangue vivo ou escuro",
      "Muco excessivo por mais de 2 dias",
      "Diarreia persistente com sinais de desidratação",
      "Febre alta associada a alterações fecais",
    ],
    tips: [
      "Observar o padrão por 2-3 dias antes de se preocupar",
      "Manter hidratação adequada sempre",
      "Fotografar para mostrar ao pediatra se necessário",
      "Anotar alimentos novos introduzidos recentemente",
    ],
  },
  {
    id: "dor-abdominal",
    name: "Dor Abdominal",
    fullName: "Dor Abdominal / Cólica",
    emoji: "😣",
    description: "Quando a criança apresenta choro persistente e desconforto abdominal",
    whatIs:
      "A dor abdominal é uma das queixas mais comuns na pediatria. Em bebês, manifesta-se como choro intenso e flexão das pernas. Em crianças maiores, pode ser localizada ou difusa. As causas variam desde cólicas funcionais benignas até condições que necessitam investigação.",
    commonCauses: [
      "Cólica infantil (nos primeiros 3-4 meses)",
      "Acúmulo de gases intestinais",
      "Intolerância alimentar não diagnosticada",
      "Constipação intestinal",
    ],
    whenUrgent: [
      "Choro incontrolável por horas seguidas",
      "Febre alta associada à dor",
      "Vômitos repetidos com dor",
      "Recusa alimentar total e prostração",
    ],
    tips: [
      "Massagem abdominal com movimentos suaves",
      "Posições confortáveis (barriga para baixo no antebraço)",
      "Ambiente calmo e acolhedor",
      "Banho morno para relaxamento",
    ],
  },
];

export default function SymptomAtlas() {
  const [selectedId, setSelectedId] = useState(SYMPTOMS[0].id);
  const selectedSymptom = SYMPTOMS.find((s) => s.id === selectedId)!;

  return (
    <div className="w-full">
      {/* Header */}
      <section className="section-spacing bg-card border-b border-border">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block font-sans">
              Ferramenta Interativa
            </span>
            <h1 className="mb-4">Atlas de Sintomas</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pais pesquisam sintomas, não diagnósticos. Explore cada um para entender melhor o que pode estar acontecendo com seu filho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-background">
        <div className="container">
          {/* Symptom Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-12">
            {SYMPTOMS.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => setSelectedId(symptom.id)}
                className={`p-4 rounded-xl transition-all duration-200 border-2 text-center ${
                  selectedId === symptom.id
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:shadow-sm"
                }`}
              >
                <div className="text-3xl mb-2">{symptom.emoji}</div>
                <div className="text-sm font-semibold font-sans leading-tight">
                  {symptom.name}
                </div>
              </button>
            ))}
          </div>

          {/* Symptom Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="card-base p-6 md:p-10 lg:p-12"
            >
              {/* Title */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl md:text-5xl">{selectedSymptom.emoji}</span>
                  <div>
                    <h2 className="text-2xl md:text-3xl">{selectedSymptom.fullName}</h2>
                    <p className="text-muted-foreground mt-1">{selectedSymptom.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* O que é */}
                <div>
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    O que é?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSymptom.whatIs}
                  </p>
                </div>

                {/* Causas Comuns */}
                <div>
                  <h3 className="text-xl mb-4">Causas Comuns</h3>
                  <ul className="space-y-2.5">
                    {selectedSymptom.commonCauses.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quando é Urgente */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                <h3 className="text-xl mb-4 text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Quando Procurar Emergência?
                </h3>
                <ul className="space-y-2">
                  {selectedSymptom.whenUrgent.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-500 font-bold mt-0.5">!</span>
                      <span className="text-red-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dicas Práticas */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-xl mb-4 text-green-700 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Dicas Práticas
                </h3>
                <ul className="space-y-2">
                  {selectedSymptom.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span className="text-green-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-6 border-t border-border text-center">
                <p className="text-muted-foreground mb-4">
                  Quer entender melhor este sintoma com um especialista?
                </p>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Agendar Consulta
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Educational Note */}
      <section className="section-spacing bg-card border-t border-border">
        <div className="container max-w-2xl">
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Informação Educativa
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Este atlas é informativo e educativo. Não substitui avaliação médica profissional. Sempre consulte um pediatra para diagnóstico e tratamento adequado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
