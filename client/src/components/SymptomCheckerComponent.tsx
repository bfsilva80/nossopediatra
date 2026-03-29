import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareResults } from "@/components/ShareResults";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { Breadcrumbs, Breadcrumb } from "@/components/Breadcrumbs";
import {
  initialQuestions,
  refluxQuestions,
  constipationQuestions,
  allergyQuestions,
  bellyPainQuestions,
  uncertainQuestions,
  conditions,
  Question,
  Condition,
} from "@/data/symptoms";

interface SymptomCheckerProps {
  onComplete?: (result: { condition: Condition; matchedSymptoms: string[] }) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onComplete }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("main-complaint");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ condition: Condition; matchedSymptoms: string[] } | null>(null);
  const [history, setHistory] = useState<string[]>(["main-complaint"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Obter todas as perguntas em um mapa único
  const allQuestions = new Map<string, Question>();
  [initialQuestions, refluxQuestions, constipationQuestions, allergyQuestions, bellyPainQuestions, uncertainQuestions].forEach((group) => {
    group.forEach((q) => allQuestions.set(q.id, q));
  });

  const currentQuestion = allQuestions.get(currentQuestionId);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestionId]: answer };
    setAnswers(newAnswers);

    // Determinar próxima pergunta
    if (currentQuestion?.nextQuestions) {
      const nextId = currentQuestion.nextQuestions[answer];
      if (nextId === "reflux-result" || nextId === "constipation-result" || nextId === "allergy-result" || nextId === "belly-pain-result" || nextId === "uncertain-result") {
        // Mostrar loading e calcular resultado com delay
        setIsLoading(true);
        setTimeout(() => {
          const diagnosisResult = calculateDiagnosis(newAnswers);
          setResult(diagnosisResult);
          setIsLoading(false);
        }, 2000);
      } else if (nextId) {
        setHistory([...history, currentQuestionId]);
        setCurrentQuestionId(nextId);
      }
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousId = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentQuestionId(previousId);
      setResult(null);
    }
  };

  const handleReset = () => {
    setCurrentQuestionId("main-complaint");
    setAnswers({});
    setResult(null);
    setHistory(["main-complaint"]);
  };

  // Gerar breadcrumbs dinâmicos
  const generateBreadcrumbs = (): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [];
    const addedIds = new Set<string>();
    
    // Adicionar breadcrumb inicial
    breadcrumbs.push({
      id: "main-complaint",
      label: "Sintoma Principal",
      answer: answers["main-complaint"],
    });
    addedIds.add("main-complaint");

    // Adicionar breadcrumbs para cada pergunta no histórico (exceto main-complaint)
    history.forEach((questionId) => {
      if (addedIds.has(questionId)) return; // Evitar duplicatas
      
      const question = allQuestions.get(questionId);
      if (question && answers[questionId]) {
        breadcrumbs.push({
          id: questionId,
          label: question.text.substring(0, 30) + (question.text.length > 30 ? "..." : ""),
          answer: answers[questionId],
        });
        addedIds.add(questionId);
      }
    });

    // Adicionar breadcrumb atual (se não foi adicionado ainda)
    if (currentQuestion && !addedIds.has(currentQuestionId)) {
      breadcrumbs.push({
        id: currentQuestionId,
        label: currentQuestion.text.substring(0, 30) + (currentQuestion.text.length > 30 ? "..." : ""),
      });
      addedIds.add(currentQuestionId);
    }

    return breadcrumbs;
  };

  // Navegar para uma pergunta anterior via breadcrumb
  const handleBreadcrumbNavigate = (questionId: string) => {
    if (questionId === currentQuestionId) return;
    
    const indexInHistory = history.indexOf(questionId);
    if (indexInHistory >= 0) {
      // Remover todas as perguntas após a selecionada
      setHistory(history.slice(0, indexInHistory));
      setCurrentQuestionId(questionId);
      setResult(null);
    }
  };

  const calculateDiagnosis = (allAnswers: Record<string, string>): { condition: Condition; matchedSymptoms: string[] } => {
    const mainComplaint = allAnswers["main-complaint"];

    let condition: Condition | undefined;
    let matchedSymptoms: string[] = [];

    if (mainComplaint === "Refluxo ou vômitos") {
      condition = conditions.find((c) => c.id === "reflux");
      matchedSymptoms = ["Vômitos frequentes", "Irritabilidade após alimentação"];
    } else if (mainComplaint === "Intestino preso / constipação") {
      condition = conditions.find((c) => c.id === "constipation");
      matchedSymptoms = ["Evacuações infrequentes", "Fezes duras"];
    } else if (mainComplaint === "Dor de barriga") {
      const painType = allAnswers["belly-pain-type"];
      if (painType === "Dor aguda/Súbita") {
        condition = conditions.find((c) => c.id === "belly-pain-acute");
        matchedSymptoms = ["Dor abdominal súbita", "Vômitos"];
      } else if (painType === "Dor crônica/Contínua") {
        condition = conditions.find((c) => c.id === "belly-pain-chronic");
        matchedSymptoms = ["Dor abdominal crônica", "Distensão abdominal"];
      } else {
        condition = conditions.find((c) => c.id === "uncertain");
        matchedSymptoms = ["Sintomas não específicos"];
      }
    } else if (mainComplaint === "Suspeita de reação a alimentos") {
      condition = conditions.find((c) => c.id === "allergy");
      matchedSymptoms = ["Reação alérgica", "Sintomas após ingestão de alimento"];
    } else if (mainComplaint === "Ainda não sei ao certo") {
      const uncertainSymptoms = allAnswers["uncertain-symptoms"];
      if (uncertainSymptoms === "Vômitos ou refluxo") {
        condition = conditions.find((c) => c.id === "reflux");
        matchedSymptoms = ["Vômitos", "Refluxo"];
      } else if (uncertainSymptoms === "Dificuldade intestinal") {
        condition = conditions.find((c) => c.id === "constipation");
        matchedSymptoms = ["Dificuldade intestinal", "Constipação"];
      } else if (uncertainSymptoms === "Dor abdominal") {
        condition = conditions.find((c) => c.id === "belly-pain-acute");
        matchedSymptoms = ["Dor abdominal"];
      } else if (uncertainSymptoms === "Reações após comer") {
        condition = conditions.find((c) => c.id === "allergy");
        matchedSymptoms = ["Reações alimentares"];
      } else {
        condition = conditions.find((c) => c.id === "uncertain");
        matchedSymptoms = ["Sintomas não específicos"];
      }
    } else {
      condition = conditions.find((c) => c.id === "uncertain");
      matchedSymptoms = ["Sintomas não específicos"];
    }

    return {
      condition: condition || conditions[0],
      matchedSymptoms,
    };
  };

  // Mostrar loading enquanto processa
  if (isLoading) {
    return <LoadingAnimation message="Analisando seus sintomas..." />;
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Resultado */}
        <div className="bg-gradient-to-br from-teal/5 to-blue/5 rounded-2xl p-8 border-2 border-teal/20">
          <div className="flex items-start gap-4 mb-6">
            {result.condition.urgency === "high" ? (
              <AlertCircle className="w-8 h-8 text-coral flex-shrink-0 mt-1" />
            ) : (
              <CheckCircle className="w-8 h-8 text-teal flex-shrink-0 mt-1" />
            )}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                {result.condition.name}
              </h2>
              <p className="text-foreground/70 leading-relaxed">{result.condition.description}</p>
            </div>
          </div>

          {/* Sintomas Identificados */}
          <div className="mb-6">
            <h3 className="font-display font-bold text-foreground mb-3">Sintomas Identificados:</h3>
            <div className="flex flex-wrap gap-2">
              {result.matchedSymptoms.map((symptom, idx) => (
                <span key={idx} className="px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-medium">
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Recomendações */}
          <div className="mb-6">
            <h3 className="font-display font-bold text-foreground mb-3">Recomendações:</h3>
            <ul className="space-y-2">
              {result.condition.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-3 text-foreground/80">
                  <span className="text-teal font-bold flex-shrink-0">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aviso de Urgência */}
          {result.condition.urgency === "high" && (
            <div className="bg-coral/10 border-l-4 border-coral p-4 rounded">
              <p className="text-coral font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Consulta médica recomendada com urgência
              </p>
            </div>
          )}

          {result.condition.shouldConsult && result.condition.urgency !== "high" && (
            <div className="bg-blue/10 border-l-4 border-blue p-4 rounded">
              <p className="text-blue font-semibold flex items-center gap-2">
                <Info className="w-5 h-5" />
                Recomendamos agendar uma consulta para avaliação profissional
              </p>
            </div>
          )}
        </div>

        {/* Compartilhar Resultado */}
        <ShareResults
          diagnosisTitle={result.condition.name}
          diagnosisDescription={result.condition.description}
          recommendations={result.condition.recommendations}
          severity={result.condition.urgency === "high" ? "high" : "medium"}
        />

        {/* CTA Final */}
        <div className="bg-white rounded-2xl p-8 border-2 border-blue/20 text-center">
          <h3 className="text-xl font-display font-bold text-foreground mb-3">Pronto para conversar com um especialista?</h3>
          <p className="text-foreground/70 mb-6">
            Agendaremos uma consulta para avaliar seu filho com atenção e cuidado
          </p>
          <Button className="bg-blue hover:bg-blue/90 text-white px-8 py-3 rounded-lg font-semibold">
            Agendar Consulta Agora
          </Button>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            Começar Novamente
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/70">Pergunta não encontrada. Por favor, comece novamente.</p>
        <Button onClick={handleReset} className="mt-4">
          Começar Novamente
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      key={currentQuestionId}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={generateBreadcrumbs()} 
        onNavigate={handleBreadcrumbNavigate}
        currentQuestionId={currentQuestionId}
      />

      {/* Barra de Progresso */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-2"
      >
        <div className="flex justify-between text-sm text-foreground/60">
          <span>Etapa {history.length + 1} de 10</span>
          <span>{Math.round(((history.length + 1) / 10) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-blue/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal to-blue"
            initial={{ width: 0 }}
            animate={{ width: `${((history.length + 1) / 10) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Pergunta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl p-8 border-2 border-blue/10"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl font-display font-bold text-foreground mb-6"
        >
          {currentQuestion.text}
        </motion.h2>

        {/* Opções de Resposta */}
        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.25,
              },
            },
          }}
        >
          {currentQuestion.type === "yes-no" ? (
            <>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
              >
                <Button
                  onClick={() => handleAnswer("yes")}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-4 px-6 border-2 hover:border-teal hover:bg-teal/5 transition-all duration-300 hover:scale-105"
                >
                  <span className="font-semibold">Sim</span>
                </Button>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
              >
                <Button
                  onClick={() => handleAnswer("no")}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-4 px-6 border-2 hover:border-teal hover:bg-teal/5 transition-all duration-300 hover:scale-105"
                >
                  <span className="font-semibold">Não</span>
                </Button>
              </motion.div>
            </>
          ) : (
            currentQuestion.options?.map((option) => (
              <motion.div
                key={option}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
              >
                <Button
                  onClick={() => handleAnswer(option)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-4 px-6 border-2 hover:border-teal hover:bg-teal/5 transition-all duration-300 hover:scale-105"
                >
                  <span className="font-semibold">{option}</span>
                </Button>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>

      {/* Botão Voltar */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
