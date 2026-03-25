import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { Link } from 'wouter'

interface Question {
  id: string
  text: string
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
  title: string
  description: string
  recommendation: string
  contentSlug: string
  severity: 'low' | 'medium' | 'high'
}

const DIAGNOSES: Record<string, Diagnosis> = {
  reflux: {
    id: 'reflux',
    title: 'Refluxo Gastroesofágico',
    description: 'Baseado nas respostas, seu filho pode estar com refluxo, que é quando o alimento volta do estômago para o esôfago.',
    recommendation: 'Recomendamos uma consulta especializada para confirmar o diagnóstico e definir o melhor tratamento.',
    contentSlug: 'refluxo-gastroesofagico',
    severity: 'medium'
  },
  constipation: {
    id: 'constipation',
    title: 'Constipação Intestinal',
    description: 'Os sintomas sugerem dificuldade para evacuar. A constipação é comum em crianças e tem tratamento eficaz.',
    recommendation: 'Uma avaliação profissional ajudará a identificar a causa e prescrever o tratamento adequado.',
    contentSlug: 'constipacao-intestinal',
    severity: 'medium'
  },
  diarrhea: {
    id: 'diarrhea',
    title: 'Diarreia Crônica',
    description: 'As respostas indicam diarreia persistente. Isso pode ter várias causas que precisam ser investigadas.',
    recommendation: 'É importante identificar a causa para oferecer o tratamento correto. Agende uma consulta.',
    contentSlug: 'diarreia-cronica',
    severity: 'medium'
  },
  allergy: {
    id: 'allergy',
    title: 'Possível Alergia Alimentar',
    description: 'Os sintomas podem estar relacionados a uma alergia ou intolerância alimentar, como APLV.',
    recommendation: 'Um teste de alergia e avaliação nutricional são recomendados para confirmar e orientar a dieta.',
    contentSlug: 'alergia-alimentar',
    severity: 'high'
  },
  ibd: {
    id: 'ibd',
    title: 'Possível Doença Inflamatória Intestinal',
    description: 'Os sintomas sugerem uma possível inflamação intestinal que requer investigação especializada.',
    recommendation: 'Procure atendimento especializado para realizar exames diagnósticos e iniciar tratamento.',
    contentSlug: 'doenca-inflamatoria-intestinal',
    severity: 'high'
  },
  unclear: {
    id: 'unclear',
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
    text: 'Qual é a principal queixa do seu filho?',
    answers: [
      { id: 'reflux_start', text: 'Regurgita ou vomita frequentemente', nextQuestionId: 'reflux_q1', diagnosis: 'reflux' },
      { id: 'constipation_start', text: 'Tem dificuldade para evacuar ou fezes duras', nextQuestionId: 'constipation_q1', diagnosis: 'constipation' },
      { id: 'diarrhea_start', text: 'Fezes soltas ou diarreia frequente', nextQuestionId: 'diarrhea_q1', diagnosis: 'diarrhea' },
      { id: 'allergy_start', text: 'Reações após comer certos alimentos', nextQuestionId: 'allergy_q1', diagnosis: 'allergy' },
      { id: 'pain_start', text: 'Dor abdominal recorrente', nextQuestionId: 'pain_q1', diagnosis: 'unclear' },
      { id: 'other_start', text: 'Outro sintoma', nextQuestionId: 'other_q1', diagnosis: 'unclear' }
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

export default function SymptomChecker() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('initial')
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [history, setHistory] = useState<string[]>(['initial'])

  const currentQuestion = QUESTIONS[currentQuestionId]

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
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container max-w-2xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            O que está acontecendo com seu filho?
          </h1>
          <p className="text-lg text-foreground/70">
            Responda algumas perguntas simples para ajudar a identificar possíveis problemas digestivos
          </p>
        </motion.div>

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
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                  {currentQuestion.text}
                </h2>
                <div className="h-1 w-16 bg-primary rounded-full" />
              </div>

              <div className="space-y-3 mb-8">
                {currentQuestion.answers.map((answer) => (
                  <motion.button
                    key={answer.id}
                    onClick={() => handleAnswer(answer)}
                    className="w-full text-left p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-foreground font-medium">{answer.text}</span>
                  </motion.button>
                ))}
              </div>

              {history.length > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
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
                    <p className="text-foreground/70 font-semibold">
                      {diagnosis.recommendation}
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
                className="w-full text-primary font-semibold py-3 px-6 rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
              >
                Fazer nova avaliação
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
