import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react'
import { Link } from 'wouter'

interface Question {
  id: string
  text: string
  subtitle?: string
  answers: Answer[]
}

interface Answer {
  id: string
  text: string
  nextQuestionId?: string
  diagnosis?: string
}

interface Diagnosis {
  id: string
  slug: string
  title: string
  description: string
  recommendation: string
  contentSlug: string
  severity: 'low' | 'medium' | 'high'
  emoji?: string
}

const DIAGNOSES: Record<string, Diagnosis> = {
  reflux: {
    id: 'reflux',
    slug: 'refluxo-lactente',
    title: 'Pode estar relacionado a Refluxo',
    emoji: '🌊',
    description: 'Os sintomas que você descreveu costumam estar relacionados a refluxo - quando a barriguinha devolve o alimento. Isso é muito comum em bebês e crianças pequenas.',
    recommendation: 'Essa é apenas uma pista inicial. Só um pediatra pode confirmar o que está realmente acontecendo com seu filho.',
    contentSlug: 'refluxo-gastroesofagico',
    severity: 'medium'
  },
  constipation: {
    id: 'constipation',
    slug: 'constipacao-infantil',
    title: 'Pode estar relacionado a Intestino Preso',
    emoji: '🔒',
    description: 'Os sintomas sugerem dificuldade para evacuar, que é muito comum em crianças. Mas cada caso é único e merece uma avaliação pessoal.',
    recommendation: 'Essa é apenas uma pista inicial. Só um pediatra pode confirmar o que está realmente acontecendo com seu filho.',
    contentSlug: 'constipacao-infantil',
    severity: 'medium'
  },
  diarrhea: {
    id: 'diarrhea',
    slug: 'diarreia-cronica',
    title: 'Pode estar relacionado a Diarreia Persistente',
    emoji: '💧',
    description: 'Os sintomas que você descreveu costumam estar relacionados a diarreia crônica. Mas há várias causas possíveis que precisam ser investigadas.',
    recommendation: 'Essa é apenas uma pista inicial. Só um pediatra pode confirmar o que está realmente acontecendo com seu filho.',
    contentSlug: 'diarreia-cronica',
    severity: 'medium'
  },
  allergy: {
    id: 'allergy',
    slug: 'alergia-alimentar',
    title: 'Pode estar relacionado a Alergia Alimentar',
    emoji: '🚫',
    description: 'Os sintomas sugerem uma possível reação a algum alimento. Isso é importante investigar com cuidado para que seu filho coma com segurança.',
    recommendation: 'Essa é apenas uma pista inicial. Só um pediatra pode confirmar o que está realmente acontecendo com seu filho.',
    contentSlug: 'alergia-alimentar',
    severity: 'high'
  },
  ibd: {
    id: 'ibd',
    slug: 'doenca-inflamatoria-intestinal',
    title: 'Pode estar relacionado a Inflamação Intestinal',
    emoji: '⚠️',
    description: 'Os sintomas que você descreveu costumam estar relacionados a uma possível inflamação intestinal. Isso precisa de investigação especializada.',
    recommendation: 'Essa é apenas uma pista inicial. Só um pediatra pode confirmar o que está realmente acontecendo com seu filho.',
    contentSlug: 'doenca-inflamatoria-intestinal',
    severity: 'high'
  },
  unclear: {
    id: 'unclear',
    slug: 'diagnostico-nao-definido',
    title: 'Precisa de uma Conversa Pessoal',
    emoji: '🤔',
    description: 'Com as informações que você deu, não consigo identificar um padrão claro. Cada criança é única e os sintomas podem ter várias causas diferentes.',
    recommendation: 'Essa é apenas uma pista inicial. Só um pediatra pode confirmar o que está realmente acontecendo com seu filho.',
    contentSlug: '',
    severity: 'medium'
  }
}

const QUESTIONS: Record<string, Question> = {
  initial: {
    id: 'initial',
    text: 'Antes de tudo...',
    subtitle: 'Preciso saber se há algo urgente acontecendo agora',
    answers: [
      { id: 'alert_yes', text: 'Sim, estou preocupado(a) com algo grave', nextQuestionId: 'alert_check' },
      { id: 'alert_no', text: 'Não, é algo que vem acontecendo há tempo', nextQuestionId: 'age_context' }
    ]
  },
  alert_check: {
    id: 'alert_check',
    text: 'Qual dessas situações está acontecendo?',
    subtitle: 'Escolha todas que se aplicam',
    answers: [
      { id: 'alert_breathing', text: '😰 Dificuldade para respirar', diagnosis: 'ibd' },
      { id: 'alert_blood', text: '🔴 Sangue no vômito ou fezes', diagnosis: 'ibd' },
      { id: 'alert_fever', text: '🌡️ Febre muito alta (acima de 39°C)', diagnosis: 'ibd' },
      { id: 'alert_lethargy', text: '😴 Muito sonolento ou desacordado', diagnosis: 'ibd' },
      { id: 'alert_belly', text: '🤰 Barriga muito inchada ou dura', diagnosis: 'ibd' },
      { id: 'alert_none', text: 'Nenhum desses', nextQuestionId: 'age_context' }
    ]
  },
  age_context: {
    id: 'age_context',
    text: 'Qual é a idade do seu filho?',
    subtitle: 'Isso vai me ajudar a entender melhor',
    answers: [
      { id: 'age_0_6m', text: '👶 Até 6 meses', nextQuestionId: 'main_complaint' },
      { id: 'age_6_12m', text: '🍼 6 meses a 1 ano', nextQuestionId: 'main_complaint' },
      { id: 'age_1_3y', text: '🧒 1 a 3 anos', nextQuestionId: 'main_complaint' },
      { id: 'age_3_6y', text: '👦 3 a 6 anos', nextQuestionId: 'main_complaint' },
      { id: 'age_6plus', text: '🎒 Acima de 6 anos', nextQuestionId: 'main_complaint' }
    ]
  },
  main_complaint: {
    id: 'main_complaint',
    text: 'O que a barriguinha está dizendo?',
    subtitle: 'Escolha o que mais se parece com o que seu filho está vivenciando',
    answers: [
      { id: 'complaint_reflux', text: '🌊 Golfadas ou vômitos', nextQuestionId: 'reflux_frequency' },
      { id: 'complaint_constipation', text: '🔒 Intestino preso / fezes duras', nextQuestionId: 'constipation_frequency' },
      { id: 'complaint_diarrhea', text: '💧 Diarreia / fezes muito soltas', nextQuestionId: 'diarrhea_duration' },
      { id: 'complaint_allergy', text: '🚫 Reação após comer algo', nextQuestionId: 'allergy_type' },
      { id: 'complaint_pain', text: '😣 Dor de barriga recorrente', nextQuestionId: 'pain_location' },
      { id: 'complaint_other', text: '❓ Outro sintoma', diagnosis: 'unclear' }
    ]
  },
  // REFLUXO - 2 passos de refinamento
  reflux_frequency: {
    id: 'reflux_frequency',
    text: 'Com que frequência isso acontece?',
    subtitle: 'Ajuda a entender melhor a situação',
    answers: [
      { id: 'reflux_daily', text: '📅 Diariamente ou várias vezes ao dia', nextQuestionId: 'reflux_context' },
      { id: 'reflux_occasional', text: '📆 Algumas vezes por semana', nextQuestionId: 'reflux_context' },
      { id: 'reflux_rare', text: '🤷 Raramente', diagnosis: 'unclear' }
    ]
  },
  reflux_context: {
    id: 'reflux_context',
    text: 'Quando costuma acontecer?',
    subtitle: 'Isso nos dá pistas importantes',
    answers: [
      { id: 'reflux_after_feed', text: '🍽️ Logo após comer ou beber', diagnosis: 'reflux' },
      { id: 'reflux_during_sleep', text: '😴 Durante o sono ou deitado', diagnosis: 'reflux' },
      { id: 'reflux_all_time', text: '⏰ O tempo todo, sem padrão', diagnosis: 'reflux' },
      { id: 'reflux_with_pain', text: '😣 Acompanhado de choro ou incômodo', diagnosis: 'reflux' }
    ]
  },
  // CONSTIPAÇÃO - 2 passos de refinamento
  constipation_frequency: {
    id: 'constipation_frequency',
    text: 'Com que frequência seu filho evacua?',
    subtitle: 'Quantas vezes por semana?',
    answers: [
      { id: 'const_rare', text: '⏰ Menos de 3 vezes por semana', nextQuestionId: 'constipation_behavior' },
      { id: 'const_normal', text: '📊 3 a 5 vezes por semana', nextQuestionId: 'constipation_behavior' },
      { id: 'const_frequent', text: '✅ Mais de 5 vezes por semana', diagnosis: 'unclear' }
    ]
  },
  constipation_behavior: {
    id: 'constipation_behavior',
    text: 'Como é o processo de evacuar?',
    subtitle: 'Escolha o que mais se parece',
    answers: [
      { id: 'const_difficult', text: '😣 Difícil, com esforço ou dor', diagnosis: 'constipation' },
      { id: 'const_hard_stool', text: '🪨 Fezes muito duras e ressecadas', diagnosis: 'constipation' },
      { id: 'const_holds', text: '🤐 Segura as fezes ou evita evacuar', diagnosis: 'constipation' },
      { id: 'const_normal', text: '✨ Normal, sem dificuldade', diagnosis: 'unclear' }
    ]
  },
  // DIARREIA - 2 passos de refinamento
  diarrhea_duration: {
    id: 'diarrhea_duration',
    text: 'Há quanto tempo isso está acontecendo?',
    subtitle: 'Ajuda a entender se é algo agudo ou crônico',
    answers: [
      { id: 'diar_chronic', text: '📅 Mais de 2 semanas', nextQuestionId: 'diarrhea_pattern' },
      { id: 'diar_acute', text: '⏰ Menos de 2 semanas', diagnosis: 'unclear' },
      { id: 'diar_intermittent', text: '🔄 Vai e volta há meses', nextQuestionId: 'diarrhea_pattern' }
    ]
  },
  diarrhea_pattern: {
    id: 'diarrhea_pattern',
    text: 'Como é o padrão da diarreia?',
    subtitle: 'Escolha o que mais se parece',
    answers: [
      { id: 'diar_constant', text: '💧 Fezes muito soltas o tempo todo', diagnosis: 'diarrhea' },
      { id: 'diar_after_food', text: '🍽️ Piora após comer certos alimentos', diagnosis: 'allergy' },
      { id: 'diar_with_urgency', text: '⚡ Urgência para evacuar', diagnosis: 'diarrhea' },
      { id: 'diar_with_pain', text: '😣 Acompanhada de dor ou gases', diagnosis: 'diarrhea' }
    ]
  },
  // ALERGIA - 2 passos de refinamento
  allergy_type: {
    id: 'allergy_type',
    text: 'Qual é a reação que você observa?',
    subtitle: 'Pode ser mais de uma',
    answers: [
      { id: 'allergy_skin', text: '🔴 Coceira, inchaço ou vermelhidão na pele', nextQuestionId: 'allergy_trigger' },
      { id: 'allergy_gi', text: '🤢 Vômito, diarreia ou dor abdominal', nextQuestionId: 'allergy_trigger' },
      { id: 'allergy_respiratory', text: '😤 Dificuldade para respirar ou tosse', nextQuestionId: 'allergy_trigger' },
      { id: 'allergy_other', text: '❓ Outro tipo de reação', nextQuestionId: 'allergy_trigger' }
    ]
  },
  allergy_trigger: {
    id: 'allergy_trigger',
    text: 'Qual alimento parece causar a reação?',
    subtitle: 'Ou o que você suspeita?',
    answers: [
      { id: 'allergy_milk', text: '🥛 Leite ou derivados (APLV)', diagnosis: 'allergy' },
      { id: 'allergy_egg', text: '🥚 Ovo', diagnosis: 'allergy' },
      { id: 'allergy_gluten', text: '🌾 Trigo ou glúten', diagnosis: 'allergy' },
      { id: 'allergy_nuts', text: '🥜 Amendoim ou nozes', diagnosis: 'allergy' },
      { id: 'allergy_unknown', text: '❓ Não sei qual é', diagnosis: 'allergy' }
    ]
  },
  // DOR - 2 passos de refinamento
  pain_location: {
    id: 'pain_location',
    text: 'Onde fica essa dor?',
    subtitle: 'A localização nos dá pistas importantes',
    answers: [
      { id: 'pain_upper', text: '☝️ Na parte superior (perto do peito)', nextQuestionId: 'pain_pattern' },
      { id: 'pain_middle', text: '⭕ Ao redor do umbigo', nextQuestionId: 'pain_pattern' },
      { id: 'pain_lower', text: '👇 Na parte baixa do abdômen', nextQuestionId: 'pain_pattern' },
      { id: 'pain_diffuse', text: '🌐 Em vários lugares', nextQuestionId: 'pain_pattern' }
    ]
  },
  pain_pattern: {
    id: 'pain_pattern',
    text: 'Como é o padrão dessa dor?',
    subtitle: 'Ajuda a entender melhor',
    answers: [
      { id: 'pain_constant', text: '⏰ O tempo todo', diagnosis: 'unclear' },
      { id: 'pain_episodes', text: '🔄 Em episódios (vai e volta)', diagnosis: 'unclear' },
      { id: 'pain_after_food', text: '🍽️ Após comer', diagnosis: 'reflux' },
      { id: 'pain_before_poop', text: '💩 Antes de evacuar', diagnosis: 'constipation' }
    ]
  }
}

export default function SymptomChecker() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('initial')
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [history, setHistory] = useState<string[]>(['initial'])

  const currentQuestion = QUESTIONS[currentQuestionId]
  const currentStep = history.length
  const totalSteps = 6 // Alert → Age → Complaint → Detail1 → Detail2 → Result

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentQuestionId, diagnosis])

  const handleAnswer = (answer: Answer) => {
    if (answer.diagnosis) {
      setDiagnosis(DIAGNOSES[answer.diagnosis])
    } else if (answer.nextQuestionId) {
      setHistory([...history, answer.nextQuestionId])
      setCurrentQuestionId(answer.nextQuestionId)
    }
  }

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1)
      const previousQuestion = newHistory[newHistory.length - 1]
      setHistory(newHistory)
      setCurrentQuestionId(previousQuestion)
      setDiagnosis(null)
    }
  }

  const handleReset = () => {
    setCurrentQuestionId('initial')
    setDiagnosis(null)
    setHistory(['initial'])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background pt-24 pb-20">
      {/* Alert Banner */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-40 bg-red-50 border-b-2 border-red-200 px-4 py-3"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container max-w-2xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-900">
              <p className="font-semibold mb-1">
                🛟 Se houver sinais de gravidade, procure urgência
              </p>
              <p className="text-red-800">
                Dificuldade para respirar, sangue, febre alta ou sonolência excessiva? Ligue <span className="font-bold">192 (SAMU)</span>.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container max-w-2xl px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hires_c3083669.png"
            alt="Nosso Pediatra"
            className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto mb-4"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
            🤔 O que a Barriguinha Está Dizendo?
          </h1>
          <p className="text-lg text-foreground/70 mb-4">
            Vou te ajudar a entender o que está acontecendo
          </p>
          <p className="text-sm text-foreground/60 bg-blue-100 text-blue-900 rounded-full inline-block px-4 py-2">
            ⏱️ Leva menos de 3 minutos | 💙 Este é um guia educativo
          </p>
        </motion.div>

        {/* Progress Bar */}
        {!diagnosis && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground/70">
                Passo {currentStep} de {totalSteps}
              </span>
              <span className="text-sm font-semibold text-primary">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!diagnosis ? (
            // Question View
            <motion.div
              key={currentQuestionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 md:p-12 border-2 border-blue-100 shadow-lg"
            >
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {currentQuestion.text}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-lg text-foreground/60">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-10">
                {currentQuestion.answers.map((answer) => (
                  <motion.button
                    key={answer.id}
                    onClick={() => handleAnswer(answer)}
                    className="w-full text-left p-5 rounded-2xl border-2 border-blue-100 hover:border-primary hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-lg"
                    whileHover={{ x: 4 }}
                    aria-label={answer.text}
                  >
                    <span className="font-semibold text-foreground">{answer.text}</span>
                  </motion.button>
                ))}
              </div>

              {history.length > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  aria-label="Voltar à pergunta anterior"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </button>
              )}
            </motion.div>
          ) : (
            // Clue View
            <motion.div
              key="diagnosis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Clue Card */}
              <div className={`rounded-3xl p-8 md:p-12 border-3 ${
                diagnosis.severity === 'high' 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">{diagnosis.emoji}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-amber-700 mb-2 uppercase tracking-wide">
                      💡 Pista Inicial
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {diagnosis.title}
                    </h2>
                    <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                      {diagnosis.description}
                    </p>
                    <div className="bg-white/60 rounded-xl p-4 border-l-4 border-primary">
                      <p className="text-foreground font-semibold">
                        💙 {diagnosis.recommendation}
                      </p>
                    </div>
                    <p className="text-sm text-foreground/70 mt-6 font-semibold bg-amber-50 rounded-lg p-3 border-l-4 border-amber-300">
                      ⚠️ Lembre-se: Isso é apenas uma orientação inicial baseada nos sintomas que você descreveu. Não substitui uma avaliação médica completa. Somente um pediatra pode fazer um diagnóstico preciso.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                {diagnosis.contentSlug && (
                  <Link href={`/conteudo/${diagnosis.contentSlug}`}>
                    <button className="w-full bg-primary text-white font-bold py-4 px-6 rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-lg">
                      📖 Saber mais sobre isso
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                )}
                
                <a 
                  href="https://wa.me/5534997099226?text=Ol%C3%A1%20Dr.%20Bruno!%20Gostaria%20de%20conversar%20sobre%20os%20sintomas%20do%20meu%20filho." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  💬 Conversar com o Dr. Bruno
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full text-primary font-bold py-4 px-6 rounded-2xl border-2 border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <RotateCcw className="w-5 h-5" />
                Fazer nova avaliação
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
