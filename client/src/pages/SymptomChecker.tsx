import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, RotateCcw, Heart, Smile } from 'lucide-react'
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
  icon?: React.ReactNode
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
    title: 'Refluxo Gastroesofágico',
    emoji: '🌊',
    description: 'A barriguinha está devolvendo o alimento. Isso é comum em bebês e crianças pequenas, especialmente quando comem rápido ou em grandes quantidades.',
    recommendation: 'Uma consulta vai ajudar a confirmar e encontrar as melhores estratégias para seu filho.',
    contentSlug: 'refluxo-gastroesofagico',
    severity: 'medium'
  },
  constipation: {
    id: 'constipation',
    slug: 'constipacao-infantil',
    title: 'Intestino Preso',
    emoji: '🔒',
    description: 'A barriguinha está com dificuldade para evacuar. Isso é muito comum em crianças e tem solução! Geralmente envolve ajustes na rotina e na alimentação.',
    recommendation: 'Vamos conversar sobre o que pode estar acontecendo e como ajudar seu filho a se sentir melhor.',
    contentSlug: 'constipacao-infantil',
    severity: 'medium'
  },
  diarrhea: {
    id: 'diarrhea',
    slug: 'diarreia-cronica',
    title: 'Diarreia Persistente',
    emoji: '💧',
    description: 'A barriguinha está solta há mais tempo. Pode ter várias causas, e é importante investigar para encontrar a melhor solução.',
    recommendation: 'Uma avaliação vai ajudar a identificar o que está acontecendo e como tratar.',
    contentSlug: 'diarreia-cronica',
    severity: 'medium'
  },
  allergy: {
    id: 'allergy',
    slug: 'alergia-alimentar',
    title: 'Possível Alergia Alimentar',
    emoji: '🚫',
    description: 'A barriguinha pode estar reagindo a algum alimento. Isso é importante investigar para que seu filho coma com segurança e tranquilidade.',
    recommendation: 'Vamos conversar sobre quais alimentos estão causando reações e como proceder com segurança.',
    contentSlug: 'alergia-alimentar',
    severity: 'high'
  },
  ibd: {
    id: 'ibd',
    slug: 'doenca-inflamatoria-intestinal',
    title: 'Possível Inflamação Intestinal',
    emoji: '⚠️',
    description: 'Os sintomas sugerem uma possível inflamação que precisa de investigação especializada.',
    recommendation: 'É importante fazer uma avaliação completa para confirmar e iniciar o tratamento adequado.',
    contentSlug: 'doenca-inflamatoria-intestinal',
    severity: 'high'
  },
  unclear: {
    id: 'unclear',
    slug: 'diagnostico-nao-definido',
    title: 'Precisa de Avaliação Completa',
    emoji: '🤔',
    description: 'Com as informações que você deu, não consigo identificar um padrão claro. Cada criança é única e merece uma avaliação pessoal.',
    recommendation: 'Vamos conversar sobre o que está acontecendo para encontrar a melhor solução para seu filho.',
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
      { id: 'complaint_reflux', text: '🌊 Golfadas ou vômitos', nextQuestionId: 'reflux_detail', diagnosis: 'reflux' },
      { id: 'complaint_constipation', text: '🔒 Intestino preso / fezes duras', nextQuestionId: 'constipation_detail', diagnosis: 'constipation' },
      { id: 'complaint_diarrhea', text: '💧 Diarreia / fezes muito soltas', nextQuestionId: 'diarrhea_detail', diagnosis: 'diarrhea' },
      { id: 'complaint_allergy', text: '🚫 Reação após comer algo', nextQuestionId: 'allergy_detail', diagnosis: 'allergy' },
      { id: 'complaint_pain', text: '😣 Dor de barriga recorrente', nextQuestionId: 'pain_detail', diagnosis: 'unclear' },
      { id: 'complaint_other', text: '❓ Outro sintoma', diagnosis: 'unclear' }
    ]
  },
  reflux_detail: {
    id: 'reflux_detail',
    text: 'Com que frequência isso acontece?',
    subtitle: 'Ajuda a entender melhor a situação',
    answers: [
      { id: 'reflux_daily', text: '📅 Diariamente ou várias vezes ao dia', diagnosis: 'reflux' },
      { id: 'reflux_occasional', text: '📆 Algumas vezes por semana', diagnosis: 'unclear' },
      { id: 'reflux_rare', text: '🤷 Raramente', diagnosis: 'unclear' }
    ]
  },
  constipation_detail: {
    id: 'constipation_detail',
    text: 'Como está a frequência?',
    subtitle: 'Quantas vezes por semana seu filho evacua?',
    answers: [
      { id: 'const_rare', text: '⏰ Menos de 3 vezes por semana', diagnosis: 'constipation' },
      { id: 'const_normal', text: '📊 3 a 5 vezes por semana', nextQuestionId: 'constipation_texture' },
      { id: 'const_frequent', text: '✅ Mais de 5 vezes por semana', diagnosis: 'unclear' }
    ]
  },
  constipation_texture: {
    id: 'constipation_texture',
    text: 'E as fezes, como estão?',
    subtitle: 'A textura é importante',
    answers: [
      { id: 'texture_hard', text: '🪨 Muito duras e difíceis de sair', diagnosis: 'constipation' },
      { id: 'texture_normal', text: '✨ Textura normal', diagnosis: 'unclear' },
      { id: 'texture_soft', text: '💧 Moles ou soltas', diagnosis: 'unclear' }
    ]
  },
  diarrhea_detail: {
    id: 'diarrhea_detail',
    text: 'Há quanto tempo isso está acontecendo?',
    subtitle: 'Isso nos ajuda a entender se é algo agudo ou crônico',
    answers: [
      { id: 'diar_chronic', text: '📅 Mais de 2 semanas', diagnosis: 'diarrhea' },
      { id: 'diar_acute', text: '⏰ Menos de 2 semanas', diagnosis: 'unclear' },
      { id: 'diar_intermittent', text: '🔄 Vai e volta', diagnosis: 'unclear' }
    ]
  },
  allergy_detail: {
    id: 'allergy_detail',
    text: 'Qual é a reação que você observa?',
    subtitle: 'Pode ser mais de uma',
    answers: [
      { id: 'allergy_skin', text: '🔴 Coceira, inchaço ou vermelhidão na pele', diagnosis: 'allergy' },
      { id: 'allergy_gi', text: '🤢 Vômito, diarreia ou dor abdominal', diagnosis: 'allergy' },
      { id: 'allergy_respiratory', text: '😤 Dificuldade para respirar ou tosse', diagnosis: 'allergy' },
      { id: 'allergy_other', text: '❓ Outro tipo de reação', diagnosis: 'allergy' }
    ]
  },
  pain_detail: {
    id: 'pain_detail',
    text: 'Onde fica essa dor?',
    subtitle: 'A localização nos dá pistas importantes',
    answers: [
      { id: 'pain_upper', text: '☝️ Na parte superior (perto do peito)', diagnosis: 'reflux' },
      { id: 'pain_middle', text: '⭕ Ao redor do umbigo', diagnosis: 'unclear' },
      { id: 'pain_lower', text: '👇 Na parte baixa do abdômen', diagnosis: 'constipation' },
      { id: 'pain_diffuse', text: '🌐 Em vários lugares', diagnosis: 'unclear' }
    ]
  }
}

export default function SymptomChecker() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('initial')
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [history, setHistory] = useState<string[]>(['initial'])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})

  const currentQuestion = QUESTIONS[currentQuestionId]
  const currentStep = history.length
  const totalSteps = 4 // Alert → Age → Complaint → Detail

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentQuestionId, diagnosis])

  const handleAnswer = (answer: Answer) => {
    const newAnswers = { ...selectedAnswers, [currentQuestionId]: answer.id }
    setSelectedAnswers(newAnswers)

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
    setSelectedAnswers({})
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
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
            🤔 O que a Barriguinha Está Dizendo?
          </h1>
          <p className="text-lg text-foreground/70 mb-4">
            Vou te ajudar a entender o que está acontecendo
          </p>
          <p className="text-sm text-foreground/60 bg-blue-100 text-blue-900 rounded-full inline-block px-4 py-2">
            ⏱️ Leva menos de 2 minutos | 💙 Este é um guia educativo
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
            // Diagnosis View
            <motion.div
              key="diagnosis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Diagnosis Card */}
              <div className={`rounded-3xl p-8 md:p-12 border-3 ${
                diagnosis.severity === 'high' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">{diagnosis.emoji}</div>
                  <div className="flex-1">
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
                    <p className="text-sm text-foreground/60 mt-6">
                      ⚠️ Este resultado é educativo. Sempre consulte um pediatra para diagnóstico e tratamento.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                {diagnosis.contentSlug && (
                  <Link href={`/conteudo/${diagnosis.contentSlug}`}>
                    <button className="w-full bg-primary text-white font-bold py-4 px-6 rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-lg">
                      📖 Ler artigo completo
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                )}
                
                <a 
                  href="https://wa.me/5534997099226" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  💬 Agendar consulta no WhatsApp
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
