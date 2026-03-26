import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, AlertTriangle, RotateCcw } from 'lucide-react'
import { Link } from 'wouter'

interface Question {
  id: string
  text: string
  help?: string
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
}

const DIAGNOSES: Record<string, Diagnosis> = {
  reflux: {
    id: 'reflux',
    slug: 'refluxo-lactente',
    title: 'Refluxo Gastroesofágico',
    description: 'Com base nas respostas, seu filho pode estar com refluxo, que é quando o alimento volta do estômago para o esôfago. É comum em bebês e crianças pequenas.',
    recommendation: 'Recomendamos uma consulta especializada para confirmar o diagnóstico e definir o melhor tratamento.',
    contentSlug: 'refluxo-gastroesofagico',
    severity: 'medium'
  },
  constipation: {
    id: 'constipation',
    slug: 'constipacao-infantil',
    title: 'Constipação Intestinal',
    description: 'Os sintomas sugerem dificuldade para evacuar. A constipação é comum em crianças e tem tratamento eficaz.',
    recommendation: 'Uma avaliação profissional ajudará a identificar a causa e prescrever o tratamento adequado.',
    contentSlug: 'constipacao-intestinal',
    severity: 'medium'
  },
  diarrhea: {
    id: 'diarrhea',
    slug: 'diarreia-cronica',
    title: 'Diarreia Crônica',
    description: 'As respostas indicam diarreia persistente. Isso pode ter várias causas que precisam ser investigadas.',
    recommendation: 'É importante identificar a causa para oferecer o tratamento correto. Agende uma consulta.',
    contentSlug: 'diarreia-cronica',
    severity: 'medium'
  },
  allergy: {
    id: 'allergy',
    slug: 'alergia-alimentar',
    title: 'Possível Alergia Alimentar',
    description: 'Os sintomas podem estar relacionados a uma alergia ou intolerância alimentar, como APLV (Alergia à Proteína do Leite de Vaca).',
    recommendation: 'Um teste de alergia e avaliação nutricional são recomendados para confirmar e orientar a dieta.',
    contentSlug: 'alergia-alimentar',
    severity: 'high'
  },
  ibd: {
    id: 'ibd',
    slug: 'doenca-inflamatoria-intestinal',
    title: 'Possível Doença Inflamatória Intestinal',
    description: 'Os sintomas sugerem uma possível inflamação intestinal que requer investigação especializada.',
    recommendation: 'Procure atendimento especializado para realizar exames diagnósticos e iniciar tratamento.',
    contentSlug: 'doenca-inflamatoria-intestinal',
    severity: 'high'
  },
  unclear: {
    id: 'unclear',
    slug: 'diagnostico-nao-definido',
    title: 'Diagnóstico Não Definido',
    description: 'Com base nas respostas, não conseguimos identificar um padrão claro. Os sintomas podem ter várias causas.',
    recommendation: 'Recomendamos uma consulta presencial para uma avaliação completa e diagnóstico preciso.',
    contentSlug: '',
    severity: 'medium'
  }
}

const QUESTIONS: Record<string, Question> = {
  initial: {
    id: 'initial',
    text: 'O que mais preocupa você hoje?',
    help: 'Escolha a opção mais parecida com o que seu filho está vivenciando',
    answers: [
      { id: 'reflux_start', text: 'Golfadas/vômitos', nextQuestionId: 'reflux_q1', diagnosis: 'reflux' },
      { id: 'constipation_start', text: 'Intestino preso/fezes duras', nextQuestionId: 'constipation_q1', diagnosis: 'constipation' },
      { id: 'diarrhea_start', text: 'Diarreia/fezes muito soltas', nextQuestionId: 'diarrhea_q1', diagnosis: 'diarrhea' },
      { id: 'allergy_start', text: 'Piora após leite/ovo/trigo etc', nextQuestionId: 'allergy_q1', diagnosis: 'allergy' },
      { id: 'pain_start', text: 'Dor de barriga recorrente', nextQuestionId: 'pain_q1', diagnosis: 'unclear' },
      { id: 'other_start', text: 'Outro (me conte em 1 frase)', nextQuestionId: 'other_q1', diagnosis: 'unclear' }
    ]
  },
  reflux_q1: {
    id: 'reflux_q1',
    text: 'Com que frequência isso acontece?',
    answers: [
      { id: 'reflux_daily', text: 'Diariamente ou várias vezes ao dia', diagnosis: 'reflux' },
      { id: 'reflux_occasional', text: 'Ocasionalmente (algumas vezes por semana)', diagnosis: 'unclear' },
      { id: 'reflux_back', text: 'Voltar à pergunta anterior', nextQuestionId: 'initial' }
    ]
  },
  constipation_q1: {
    id: 'constipation_q1',
    text: 'Com que frequência seu filho evacua?',
    answers: [
      { id: 'const_rare', text: 'Menos de 3 vezes por semana', diagnosis: 'constipation' },
      { id: 'const_normal', text: '3 ou mais vezes por semana', nextQuestionId: 'constipation_q2' },
      { id: 'const_back', text: 'Voltar à pergunta anterior', nextQuestionId: 'initial' }
    ]
  },
  constipation_q2: {
    id: 'constipation_q2',
    text: 'As fezes são duras ou difíceis de sair?',
    answers: [
      { id: 'const_hard', text: 'Sim, muito duras', diagnosis: 'constipation' },
      { id: 'const_normal_texture', text: 'Não, textura normal', diagnosis: 'unclear' },
      { id: 'const_back2', text: 'Voltar à pergunta anterior', nextQuestionId: 'constipation_q1' }
    ]
  },
  diarrhea_q1: {
    id: 'diarrhea_q1',
    text: 'Há quanto tempo isso acontece?',
    answers: [
      { id: 'diar_chronic', text: 'Mais de 2 semanas', diagnosis: 'diarrhea' },
      { id: 'diar_acute', text: 'Menos de 2 semanas', diagnosis: 'unclear' },
      { id: 'diar_back', text: 'Voltar à pergunta anterior', nextQuestionId: 'initial' }
    ]
  },
  allergy_q1: {
    id: 'allergy_q1',
    text: 'Quais são os sintomas após comer?',
    answers: [
      { id: 'allergy_skin', text: 'Coceira, inchaço ou vermelhidão na pele', diagnosis: 'allergy' },
      { id: 'allergy_gi', text: 'Vômito, diarreia ou dor abdominal', diagnosis: 'allergy' },
      { id: 'allergy_respiratory', text: 'Dificuldade para respirar ou tosse', diagnosis: 'allergy' },
      { id: 'allergy_back', text: 'Voltar à pergunta anterior', nextQuestionId: 'initial' }
    ]
  },
  pain_q1: {
    id: 'pain_q1',
    text: 'A dor é em algum local específico?',
    answers: [
      { id: 'pain_umbilical', text: 'Ao redor do umbigo', diagnosis: 'unclear' },
      { id: 'pain_lower', text: 'Na parte baixa do abdômen', diagnosis: 'constipation' },
      { id: 'pain_upper', text: 'Na parte superior do abdômen', diagnosis: 'reflux' },
      { id: 'pain_back', text: 'Voltar à pergunta anterior', nextQuestionId: 'initial' }
    ]
  },
  other_q1: {
    id: 'other_q1',
    text: 'Qual é o sintoma?',
    answers: [
      { id: 'other_blood', text: 'Sangue nas fezes', diagnosis: 'unclear' },
      { id: 'other_weight', text: 'Ganho de peso inadequado', diagnosis: 'unclear' },
      { id: 'other_bloating', text: 'Barriga inchada ou gases', diagnosis: 'unclear' },
      { id: 'other_back', text: 'Voltar à pergunta anterior', nextQuestionId: 'initial' }
    ]
  }
}

const ALERT_SIGNS = [
  'Dificuldade para respirar',
  'Sonolência excessiva ou desmaio',
  'Sangue no vômito ou fezes',
  'Vômitos persistentes (não consegue reter nada)',
  'Febre alta (acima de 39°C)',
  'Barriga muito inchada ou dura',
  'Recusa total em comer ou beber'
]

export default function SymptomChecker() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('initial')
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [history, setHistory] = useState<string[]>(['initial'])
  const [totalQuestions] = useState<number>(3) // Average questions to reach diagnosis

  const currentQuestion = QUESTIONS[currentQuestionId]
  const currentStep = history.length
  const progressPercent = (currentStep / (totalQuestions + 1)) * 100

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
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Alert Banner - Critical Safety */}
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
                Dificuldade para respirar, sonolência excessiva, sangue, vômitos persistentes ou febre alta? Ligue <span className="font-bold">192 (SAMU)</span> ou vá ao pronto-socorro.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container max-w-2xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            O que está acontecendo com seu filho?
          </h1>
          <p className="text-lg text-foreground/70 mb-4">
            Vou te guiar por algumas perguntas simples
          </p>
          <p className="text-sm text-foreground/60">
            ⏱️ Leva ~60 segundos | 📋 Este guia é educativo e não substitui consulta médica
          </p>
        </motion.div>

        {/* Progress Bar */}
        {!diagnosis && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground/70">
                Pergunta {currentStep} de {totalQuestions}
              </span>
              <span className="text-sm font-semibold text-primary">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
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
              className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-sm"
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  {currentQuestion.text}
                </h2>
                {currentQuestion.help && (
                  <p className="text-foreground/60 text-sm">
                    {currentQuestion.help}
                  </p>
                )}
                <div className="h-1 w-16 bg-primary rounded-full mt-4" />
              </div>

              <div className="space-y-3 mb-8">
                {currentQuestion.answers.map((answer) => (
                  <motion.button
                    key={answer.id}
                    onClick={() => handleAnswer(answer)}
                    className="w-full text-left p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    whileHover={{ x: 4 }}
                    aria-label={answer.text}
                  >
                    <span className="text-foreground font-medium">{answer.text}</span>
                  </motion.button>
                ))}
              </div>

              {history.length > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  aria-label="Voltar à pergunta anterior"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar à pergunta anterior
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
              <div className={`rounded-2xl p-8 md:p-12 border-2 ${
                diagnosis.severity === 'high' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-4 mb-6">
                  {diagnosis.severity === 'high' ? (
                    <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {diagnosis.title}
                    </h2>
                    <p className="text-foreground/80 text-lg leading-relaxed mb-4">
                      {diagnosis.description}
                    </p>
                    <p className="text-foreground/70 font-semibold mb-4">
                      {diagnosis.recommendation}
                    </p>
                    <p className="text-sm text-foreground/60 border-t border-current pt-3">
                      ⚠️ Este resultado é educativo. Sempre consulte um pediatra para diagnóstico e tratamento.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                {diagnosis.contentSlug && (
                  <Link href={`/conteudo/${diagnosis.contentSlug}`}>
                    <button className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                      Ler artigo completo
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                )}
                
                <a 
                  href="https://wa.me/5534997099226" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  Agendar consulta no WhatsApp
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full text-primary font-semibold py-3 px-6 rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Fazer nova avaliação
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
