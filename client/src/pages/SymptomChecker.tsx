import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, RotateCcw, Phone, Check } from 'lucide-react'
import { Link } from 'wouter'

interface Question {
  id: string
  text: string
  subtitle?: string
  answers: Answer[]
  isMultiSelect?: boolean
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
  severity: 'low' | 'medium' | 'high' | 'emergency'
  emoji?: string
  isEmergency?: boolean
}

const DIAGNOSES: Record<string, Diagnosis> = {
  emergency: {
    id: 'emergency',
    slug: 'emergencia',
    title: '🚨 PROCURE EMERGÊNCIA AGORA',
    emoji: '🚨',
    description: 'Os sintomas que você descreveu indicam uma situação que precisa de atendimento médico imediato. Não espere - procure um pronto-socorro ou ligue para o SAMU agora.',
    recommendation: 'Esta é uma situação de emergência. Procure atendimento médico imediatamente.',
    contentSlug: '',
    severity: 'emergency',
    isEmergency: true
  },
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
    title: 'Pode estar relacionado a Constipação Intestinal',
    emoji: '🔒',
    description: 'Os sintomas sugerem dificuldade para evacuar, que é muito comum em crianças. Mas cada caso é único e merece uma avaliação pessoal.',
    recommendation: 'Essa é apenas uma pista inicial. Só um pediatra pode confirmar o que está realmente acontecendo com seu filho.',
    contentSlug: 'constipacao-intestinal',
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
    subtitle: 'Preciso saber se há algo urgente acontecendo agora. Marque todos os sinais que você observa:',
    isMultiSelect: true,
    answers: [
      { id: 'alert_breathing', text: '😰 Dificuldade para respirar', diagnosis: 'emergency' },
      { id: 'alert_blood', text: '🔴 Sangue no vômito ou fezes', diagnosis: 'emergency' },
      { id: 'alert_fever', text: '🌡️ Febre alta persistente (>38.5°C)', diagnosis: 'emergency' },
      { id: 'alert_lethargy', text: '😴 Desmaio ou sonolência excessiva', diagnosis: 'emergency' },
      { id: 'alert_belly', text: '🤰 Barriga muito inchada e dura', diagnosis: 'emergency' },
      { id: 'alert_weight_loss', text: '⬇️ Perda de peso significativa', diagnosis: 'emergency' },
      { id: 'alert_none', text: 'Nenhum desses — quero continuar a avaliação', nextQuestionId: 'age_context' }
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
      { id: 'complaint_constipation', text: '🔒 Constipação intestinal / fezes duras', nextQuestionId: 'constipation_frequency' },
      { id: 'complaint_diarrhea', text: '💧 Diarreia / fezes muito soltas', nextQuestionId: 'diarrhea_duration' },
      { id: 'complaint_allergy', text: '🚫 Reação após comer algo', nextQuestionId: 'allergy_type' },
      { id: 'complaint_pain', text: '😣 Dor de barriga recorrente', nextQuestionId: 'pain_location' },
      { id: 'complaint_other', text: '❓ Outro sintoma', diagnosis: 'unclear' }
    ]
  },
  // REFLUXO - 3 passos de refinamento
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
      { id: 'reflux_after_feed', text: '🍽️ Logo após comer ou beber', nextQuestionId: 'reflux_weight' },
      { id: 'reflux_during_sleep', text: '😴 Durante o sono ou deitado', nextQuestionId: 'reflux_weight' },
      { id: 'reflux_all_time', text: '⏰ O tempo todo, sem padrão', nextQuestionId: 'reflux_weight' },
      { id: 'reflux_with_pain', text: '😣 Acompanhado de choro ou incômodo', nextQuestionId: 'reflux_weight' }
    ]
  },
  reflux_weight: {
    id: 'reflux_weight',
    text: 'Seu filho está ganhando peso adequadamente?',
    subtitle: 'Isso é importante para avaliar o impacto do refluxo',
    answers: [
      { id: 'reflux_weight_ok', text: '✅ Sim, ganha peso normalmente', diagnosis: 'reflux' },
      { id: 'reflux_weight_uncertain', text: '❓ Não tenho certeza', diagnosis: 'reflux' },
      { id: 'reflux_weight_loss', text: '⬇️ Não, está perdendo peso ou ganho insuficiente', diagnosis: 'reflux' }
    ]
  },
  // CONSTIPAÇÃO - 3 passos de refinamento
  constipation_frequency: {
    id: 'constipation_frequency',
    text: 'Com que frequência seu filho evacua?',
    subtitle: 'Quantas vezes por semana?',
    answers: [
      { id: 'const_rare', text: '⏰ Menos de 3 vezes por semana', nextQuestionId: 'constipation_pain' },
      { id: 'const_normal', text: '📊 3 a 5 vezes por semana', nextQuestionId: 'constipation_pain' },
      { id: 'const_frequent', text: '✅ Mais de 5 vezes por semana', diagnosis: 'unclear' }
    ]
  },
  constipation_pain: {
    id: 'constipation_pain',
    text: 'Seu filho sente dor ou chora ao evacuar?',
    subtitle: 'Isso é um sinal importante',
    answers: [
      { id: 'const_pain_yes', text: '😣 Sim, tem dor ou chora', nextQuestionId: 'constipation_behavior' },
      { id: 'const_pain_no', text: '✨ Não, evacua sem dor', nextQuestionId: 'constipation_behavior' }
    ]
  },
  constipation_behavior: {
    id: 'constipation_behavior',
    text: 'Como é o processo de evacuar?',
    subtitle: 'Escolha o que mais se parece',
    answers: [
      { id: 'const_difficult', text: '😣 Difícil, com esforço excessivo', diagnosis: 'constipation' },
      { id: 'const_hard_stool', text: '🪨 Fezes muito duras e ressecadas', diagnosis: 'constipation' },
      { id: 'const_holds', text: '🤐 Segura as fezes ou evita ir ao banheiro', diagnosis: 'constipation' },
      { id: 'const_normal', text: '✨ Normal, sem dificuldade', diagnosis: 'unclear' }
    ]
  },
  // DIARREIA - 3 passos de refinamento
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
      { id: 'diar_constant', text: '💧 Fezes muito soltas o tempo todo', nextQuestionId: 'diarrhea_blood' },
      { id: 'diar_after_food', text: '🍽️ Piora após comer certos alimentos', diagnosis: 'allergy' },
      { id: 'diar_with_urgency', text: '⚡ Urgência para evacuar', nextQuestionId: 'diarrhea_blood' },
      { id: 'diar_with_pain', text: '😣 Acompanhada de dor ou gases', nextQuestionId: 'diarrhea_blood' }
    ]
  },
  diarrhea_blood: {
    id: 'diarrhea_blood',
    text: 'Há sangue ou muco nas fezes?',
    subtitle: 'Isso nos ajuda a refinar a avaliação',
    answers: [
      { id: 'diar_blood_yes', text: '🔴 Sim, há sangue ou muco', diagnosis: 'diarrhea' },
      { id: 'diar_blood_no', text: '✨ Não, sem sangue ou muco', diagnosis: 'diarrhea' }
    ]
  },
  // ALERGIA - 3 passos de refinamento
  allergy_type: {
    id: 'allergy_type',
    text: 'Qual é a reação que você observa?',
    subtitle: 'Pode ser mais de uma',
    answers: [
      { id: 'allergy_skin', text: '🔴 Coceira, inchaço ou vermelhidão na pele', nextQuestionId: 'allergy_feeding' },
      { id: 'allergy_gi', text: '🤢 Vômito, diarreia ou dor abdominal', nextQuestionId: 'allergy_feeding' },
      { id: 'allergy_respiratory', text: '😤 Dificuldade para respirar ou tosse', nextQuestionId: 'allergy_feeding' },
      { id: 'allergy_other', text: '❓ Outro tipo de reação', nextQuestionId: 'allergy_feeding' }
    ]
  },
  allergy_feeding: {
    id: 'allergy_feeding',
    text: 'Como seu filho é alimentado?',
    subtitle: 'Isso ajuda a identificar possíveis alérgenos',
    answers: [
      { id: 'allergy_breast', text: '🤱 Peito exclusivo', nextQuestionId: 'allergy_timing' },
      { id: 'allergy_formula', text: '🍼 Fórmula exclusiva', nextQuestionId: 'allergy_timing' },
      { id: 'allergy_mixed', text: '🔄 Misto (peito + fórmula)', nextQuestionId: 'allergy_timing' },
      { id: 'allergy_solids', text: '🥣 Já come sólidos', nextQuestionId: 'allergy_timing' }
    ]
  },
  allergy_timing: {
    id: 'allergy_timing',
    text: 'Os sintomas aparecem em minutos ou em dias após comer?',
    subtitle: 'O timing nos dá pistas sobre o tipo de reação',
    answers: [
      { id: 'allergy_minutes', text: '⚡ Em minutos (reação rápida)', nextQuestionId: 'allergy_trigger' },
      { id: 'allergy_hours', text: '⏰ Em horas', nextQuestionId: 'allergy_trigger' },
      { id: 'allergy_days', text: '📅 Em dias (reação tardia)', nextQuestionId: 'allergy_trigger' }
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
      { id: 'pain_upper', text: '📍 Na parte superior da barriga', nextQuestionId: 'pain_pattern' },
      { id: 'pain_lower', text: '📍 Na parte inferior da barriga', nextQuestionId: 'pain_pattern' },
      { id: 'pain_around_navel', text: '📍 Ao redor do umbigo', nextQuestionId: 'pain_pattern' },
      { id: 'pain_diffuse', text: '📍 Em toda a barriga', nextQuestionId: 'pain_pattern' }
    ]
  },
  pain_pattern: {
    id: 'pain_pattern',
    text: 'Como é o padrão dessa dor?',
    subtitle: 'Escolha o que mais se parece',
    answers: [
      { id: 'pain_constant', text: '⏰ Constante, o tempo todo', diagnosis: 'ibd' },
      { id: 'pain_episodes', text: '🔄 Em episódios/crises', diagnosis: 'unclear' },
      { id: 'pain_after_food', text: '🍽️ Principalmente após comer', diagnosis: 'unclear' },
      { id: 'pain_with_stool', text: '🚽 Relacionada com evacuar', diagnosis: 'constipation' }
    ]
  }
}

export default function SymptomChecker() {
  const [currentQuestionId, setCurrentQuestionId] = useState('initial')
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [totalSteps, setTotalSteps] = useState(5)

  const currentQuestion = QUESTIONS[currentQuestionId]
  const isMultiSelect = currentQuestion?.isMultiSelect || false

  const handleAnswerClick = (answerId: string, nextQuestionId?: string, diagnosisId?: string) => {
    if (isMultiSelect) {
      // Multi-select mode (checkboxes)
      if (answerId === 'alert_none') {
        // If "Nenhum desses" is clicked, proceed to next question
        setCurrentQuestionId(nextQuestionId || 'age_context')
        setSelectedAnswers([])
        setCurrentStep(currentStep + 1)
      } else if (selectedAnswers.includes(answerId)) {
        // Uncheck
        setSelectedAnswers(selectedAnswers.filter(id => id !== answerId))
      } else {
        // Check - but if any red flag is selected, go to emergency
        if (diagnosisId === 'emergency') {
          setDiagnosis(DIAGNOSES.emergency)
          setCurrentStep(currentStep + 1)
        } else {
          setSelectedAnswers([...selectedAnswers, answerId])
        }
      }
    } else {
      // Single-select mode (radio buttons)
      if (diagnosisId) {
        setDiagnosis(DIAGNOSES[diagnosisId])
        setCurrentStep(currentStep + 1)
      } else if (nextQuestionId) {
        setCurrentQuestionId(nextQuestionId)
        setSelectedAnswers([])
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleMultiSelectContinue = () => {
    if (selectedAnswers.length === 0) return
    // All selected answers should lead to emergency
    setDiagnosis(DIAGNOSES.emergency)
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (diagnosis) {
      setDiagnosis(null)
      setCurrentStep(currentStep - 1)
    } else if (currentQuestionId !== 'initial') {
      // Find previous question
      const allQuestions = Object.keys(QUESTIONS)
      const currentIndex = allQuestions.indexOf(currentQuestionId)
      if (currentIndex > 0) {
        setCurrentQuestionId(allQuestions[currentIndex - 1])
        setSelectedAnswers([])
        setCurrentStep(Math.max(1, currentStep - 1))
      }
    }
  }

  const handleRestart = () => {
    setCurrentQuestionId('initial')
    setSelectedAnswers([])
    setDiagnosis(null)
    setCurrentStep(1)
  }

  if (diagnosis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-white">
        {/* Header */}
        <div className="bg-white border-b border-golden/20 sticky top-0 z-40">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hires_c3083669.png"
                alt="Nosso Pediatra"
                className="w-10 h-10"
              />
              <h1 className="text-xl font-bold">O que a Barriguinha Está Dizendo?</h1>
            </div>
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Nova Avaliação
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="container max-w-2xl py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Emergency Result */}
            {diagnosis.isEmergency ? (
              <div className="space-y-8">
                <div className="bg-red-50 border-4 border-red-500 rounded-3xl p-8 text-center">
                  <div className="text-6xl mb-4">🚨</div>
                  <h2 className="text-3xl font-bold text-red-700 mb-4">{diagnosis.title}</h2>
                  <p className="text-lg text-red-600 mb-8 leading-relaxed">{diagnosis.description}</p>
                  
                  <div className="space-y-4">
                    <a
                      href="tel:192"
                      className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl transition-colors text-lg"
                    >
                      📞 Ligue SAMU 192
                    </a>
                    <p className="text-red-700 font-semibold">OU</p>
                    <p className="text-red-600 text-lg">
                      Procure o pronto-socorro mais próximo imediatamente
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Normal Result */
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue/5 to-emerald/5 border-4 border-blue rounded-3xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="text-5xl">{diagnosis.emoji}</div>
                    <div className="flex-1">
                      <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
                        💡 Pista Inicial
                      </div>
                      <h2 className="text-3xl font-bold mb-3">{diagnosis.title}</h2>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{diagnosis.description}</p>
                      
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-6">
                        <p className="text-amber-900 font-semibold">{diagnosis.recommendation}</p>
                      </div>

                      <div className="space-y-3">
                        {diagnosis.contentSlug && (
                          <Link href={`/artigo/${diagnosis.contentSlug}`}>
                            <a className="inline-block w-full bg-blue hover:bg-blue/90 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center">
                              📚 Saber mais sobre isso
                            </a>
                          </Link>
                        )}
                        <a
                          href="https://wa.me/5534997099226?text=Olá%20Dr.%20Bruno!%20Gostaria%20de%20conversar%20sobre%20a%20saúde%20do%20meu%20filho."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full bg-emerald hover:bg-emerald/90 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center"
                        >
                          💬 Conversar com o Dr. Bruno
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRestart}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-blue font-bold hover:bg-blue/10 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Fazer Nova Avaliação
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Header */}
      <div className="bg-white border-b border-golden/20 sticky top-0 z-40">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hires_c3083669.png"
              alt="Nosso Pediatra"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold">O que a Barriguinha Está Dizendo?</h1>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-golden/20">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Passo {currentStep} de {totalSteps}</span>
            <span className="text-sm font-medium text-blue">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-golden/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue to-emerald h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-2xl py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Question */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{currentQuestion.text}</h2>
              {currentQuestion.subtitle && (
                <p className="text-lg text-muted-foreground">{currentQuestion.subtitle}</p>
              )}
            </div>

            {/* Answers */}
            <div className="space-y-3">
              {currentQuestion.answers.map((answer, idx) => (
                <motion.button
                  key={answer.id}
                  onClick={() => handleAnswerClick(answer.id, answer.nextQuestionId, answer.diagnosis)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`w-full p-4 text-left rounded-2xl border-2 transition-all ${
                    isMultiSelect && selectedAnswers.includes(answer.id)
                      ? 'bg-blue/10 border-blue'
                      : 'bg-white border-golden/20 hover:border-blue hover:bg-blue/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isMultiSelect ? (
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        selectedAnswers.includes(answer.id)
                          ? 'bg-blue border-blue'
                          : 'border-golden/40'
                      }`}>
                        {selectedAnswers.includes(answer.id) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-golden/40" />
                    )}
                    <span className="text-lg font-medium">{answer.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Multi-select Continue Button */}
            {isMultiSelect && selectedAnswers.length > 0 && !selectedAnswers.includes('alert_none') && (
              <motion.button
                onClick={handleMultiSelectContinue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full bg-blue hover:bg-blue/90 text-white font-bold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                Continuar <ArrowRight className="w-5 h-5" />
              </motion.button>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {currentQuestionId !== 'initial' && (
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-blue font-bold hover:bg-blue/10 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
