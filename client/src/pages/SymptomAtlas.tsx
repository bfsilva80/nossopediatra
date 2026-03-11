import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Lightbulb, Info, ArrowRight, Sparkles } from "lucide-react";

const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";

const SYMPTOMS = [
  {
    id: "barriga-inchada",
    name: "Barriga Inchada",
    fullName: "Barriga Inchada / Distensão Abdominal",
    emoji: "🫧",
    color: "from-coral/20 to-golden/20",
    borderColor: "border-coral/40",
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
    color: "from-blue/15 to-emerald/15",
    borderColor: "border-blue/40",
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
    emoji: "🧱",
    color: "from-golden/25 to-coral/15",
    borderColor: "border-golden/50",
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
    emoji: "🔍",
    color: "from-emerald/15 to-blue/15",
    borderColor: "border-emerald/40",
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
    color: "from-teal/15 to-golden/15",
    borderColor: "border-teal/40",
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
      <section
        className="section-spacing relative overflow-hidden"
        style={{
          backgroundImage: `url('${PATTERN_BG}')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/80" />
        {/* Floating decorations */}
        <div className="absolute top-10 left-[8%] text-3xl animate-float opacity-40 pointer-events-none">🩺</div>
        <div className="absolute top-16 right-[12%] text-2xl animate-float-slow opacity-30 pointer-events-none">⭐</div>
        <div className="absolute bottom-8 left-[15%] text-2xl animate-wiggle opacity-30 pointer-events-none">💛</div>

        <div className="container max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald/10 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-4 h-4 text-teal" />
              <span className="text-sm font-bold text-teal font-display">Ferramenta Interativa</span>
            </div>
            <h1 className="mb-4">Atlas de <span className="text-coral">Sintomas</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pais pesquisam sintomas, não diagnósticos. Explore cada um para entender melhor o que pode estar acontecendo com seu filho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-cream">
        <div className="container">
          {/* Symptom Selector - Playful rounded cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-12">
            {SYMPTOMS.map((symptom, idx) => (
              <motion.button
                key={symptom.id}
                onClick={() => setSelectedId(symptom.id)}
                className={`p-4 md:p-5 rounded-2xl transition-all duration-300 border-3 text-center group ${
                  selectedId === symptom.id
                    ? `bg-gradient-to-br ${symptom.color} ${symptom.borderColor} shadow-lg`
                    : "bg-white border-golden/20 hover:border-blue/30 hover:shadow-md"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.03, rotate: selectedId === symptom.id ? 0 : 1 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={`text-3xl md:text-4xl mb-2 transition-transform duration-300 ${selectedId === symptom.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                  {symptom.emoji}
                </div>
                <div className="text-sm font-bold font-display leading-tight text-foreground">
                  {symptom.name}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Symptom Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="card-base p-6 md:p-10 lg:p-12 border-t-4 border-t-blue"
            >
              {/* Title */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedSymptom.color} rounded-2xl flex items-center justify-center text-4xl rotate-[-3deg]`}>
                    {selectedSymptom.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl">{selectedSymptom.fullName}</h2>
                    <p className="text-muted-foreground mt-1">{selectedSymptom.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* O que é */}
                <div className="bg-blue/5 rounded-2xl p-6">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue" />
                    O que é?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSymptom.whatIs}
                  </p>
                </div>

                {/* Causas Comuns */}
                <div className="bg-golden/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4">Causas Comuns</h3>
                  <ul className="space-y-2.5">
                    {selectedSymptom.commonCauses.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-coral rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quando é Urgente */}
              <div className="bg-red-50/80 border-l-4 border-red-400 p-6 rounded-2xl mb-6">
                <h3 className="text-xl mb-4 text-red-700 flex items-center gap-2 font-display">
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
              <div className="bg-emerald/8 border-l-4 border-emerald p-6 rounded-2xl mb-8">
                <h3 className="text-xl mb-4 text-teal flex items-center gap-2 font-display">
                  <Lightbulb className="w-5 h-5" />
                  Dicas Práticas
                </h3>
                <ul className="space-y-2">
                  {selectedSymptom.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald font-bold mt-0.5">✓</span>
                      <span className="text-foreground/80">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-6 border-t-2 border-blue/10 text-center">
                <p className="text-muted-foreground mb-4 font-display">
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
      <section className="section-spacing bg-white">
        <div className="container max-w-2xl">
          <div className="bg-blue/8 border-l-4 border-blue p-6 rounded-2xl">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 font-display">
              <Info className="w-5 h-5 text-blue" />
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
