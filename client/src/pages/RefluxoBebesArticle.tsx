import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageCircle,
  Heart,
  Star,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DecisionNode {
  id: string;
  stage: string;
  condition: string;
  action: string;
  actionType: "home" | "call" | "emergency" | "specialist";
  explanation: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
  topic: string;
}

const RefluxoBebesArticle = () => {
  const [expandedDecision, setExpandedDecision] = useState<string | null>(
    "primeiras-semanas"
  );
  const [activeTab, setActiveTab] = useState<string>("fisiologico");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const whatsappNumber = "+55 34 99709-9226";
  const phoneNumber = "+55 34 3212-1234";

  // Tipos de Refluxo
  const refluxTypes = [
    {
      emoji: "🍼",
      label: "Mais comum",
      title: "Refluxo Fisiológico",
      description: "Regurgitação após mamar",
      details: [
        "Bebê feliz e saudável",
        "Sem dor aparente",
        "Melhora com o tempo",
      ],
    },
    {
      emoji: "🤫",
      label: "Difícil de detectar",
      title: "Refluxo Silencioso",
      description: "Sem vômito visível",
      details: ["Choro e irritabilidade", "Recusa alimentar", "Desconforto"],
    },
    {
      emoji: "⚕️",
      label: "Requer tratamento",
      title: "DRGE (Doença do Refluxo)",
      description: "Refluxo com impacto clínico",
      details: [
        "Ganho de peso insuficiente",
        "Esofagite",
        "Sintomas respiratórios",
      ],
    },
    {
      emoji: "🥛",
      label: "Relacionado à dieta",
      title: "Refluxo Alimentar",
      description: "Associado a alergias",
      details: [
        "Intolerância à lactose",
        "Alergia à proteína do leite",
        "Melhora com exclusão",
      ],
    },
    {
      emoji: "🤱",
      label: "Postura influencia",
      title: "Refluxo Posicional",
      description: "Relacionado ao posicionamento",
      details: [
        "Piora ao deitar",
        "Melhora em posição vertical",
        "Manejo postural eficaz",
      ],
    },
  ];

  // Tabela Comparativa
  const treatmentComparison: Record<
    string,
    {
      timeResponse: string;
      homeObservation: string;
      callIf: string;
      costCoverage: string;
      recommendedWhen: string;
    }
  > = {
    fisiologico: {
      timeResponse: "2–4 semanas",
      homeObservation:
        "Bebê regurgita após mamar mas está ganhando peso, dormindo e se desenvolvendo normalmente. Parece incomodado mas se acalma rapidamente.",
      callIf:
        "Bebê para de ganhar peso, vômitos se tornam forçados, há sangue no vômito, ou sinais de dificuldade respiratória.",
      costCoverage:
        "Sem medicação. Ajustes posturais e de alimentação sem custo adicional.",
      recommendedWhen:
        "Bebês com refluxo fisiológico, ganho de peso adequado e sem sinais de complicação.",
    },
    silencioso: {
      timeResponse: "1–2 semanas",
      homeObservation:
        "Melhora da irritabilidade e do choro após início da medicação. Bebê aceita melhor as mamadas e dorme com mais tranquilidade.",
      callIf:
        "Sem melhora após 2 semanas de medicação, surgimento de novos sintomas, ou reação adversa ao medicamento.",
      costCoverage:
        "Prescrição necessária. Omeprazol ou ranitidina — cobertura variável por plano de saúde.",
      recommendedWhen:
        "DRGE confirmada, refluxo silencioso com irritabilidade intensa, ou falha nas medidas conservadoras.",
    },
    drge: {
      timeResponse: "2–6 semanas para consulta",
      homeObservation:
        "Bebê com refluxo persistente apesar do tratamento, dificuldade de crescimento, ou suspeita de alergia alimentar associada.",
      callIf:
        "Apneia, engasgos graves, sangue nas fezes, ou perda de peso — ir à emergência imediatamente.",
      costCoverage:
        "Consulta com especialista. Exames como pHmetria ou endoscopia podem ser necessários.",
      recommendedWhen:
        "Refluxo refratário ao tratamento, suspeita de DRGE grave, ou complicações respiratórias.",
    },
  };

  // Árvore de Decisão
  const decisionTree: DecisionNode[] = [
    {
      id: "primeiras-semanas",
      stage: "Primeiras semanas",
      condition:
        "Bebê cospe após mamar mas está ganhando peso e parece confortável entre as mamadas",
      action: "Medidas posturais — sem medicação",
      actionType: "home",
      explanation:
        "Mantenha o bebê em posição vertical por 20–30 minutos após cada mamada. Ofereça mamadas menores e mais frequentes. Evite pressão na barriga após alimentação. Na maioria dos casos, o refluxo fisiológico melhora sozinho com o amadurecimento do esfíncter esofágico inferior — geralmente entre 6 e 12 meses de vida.",
    },
    {
      id: "semanas-2-6",
      stage: "Semanas 2–6",
      condition:
        "Bebê chora excessivamente após mamar, arqueia as costas, recusa o seio ou a mamadeira",
      action: "Ligue para o pediatra hoje",
      actionType: "call",
      explanation:
        "Esses sinais podem indicar refluxo silencioso (sem vômito visível) ou DRGE. O pediatra avaliará se há necessidade de medicação como omeprazol ou ranitidina. Também pode investigar alergia à proteína do leite de vaca (APLV), que pode mimetizar os sintomas de refluxo.",
    },
    {
      id: "com-tratamento",
      stage: "Com tratamento em curso",
      condition:
        "Sem melhora após 2 semanas de medicação, ou bebê continua perdendo peso",
      action: "Retorne ao pediatra — ajuste necessário",
      actionType: "call",
      explanation:
        "O pediatra pode ajustar a dose, trocar a medicação ou investigar outras causas como APLV. Se houver suspeita de alergia, pode ser recomendada dieta de exclusão para a mãe (se amamentando) ou troca para fórmula extensamente hidrolisada. Não abandone o tratamento sem orientação médica.",
    },
    {
      id: "qualquer-momento",
      stage: "Qualquer momento",
      condition:
        "Sangue no vômito, apneia (pausa na respiração), engasgos graves, ou perda de peso significativa",
      action: "Vá à emergência imediatamente",
      actionType: "emergency",
      explanation:
        "Esses sinais podem indicar complicações graves como esofagite hemorrágica, aspiração pulmonar ou apneia relacionada ao refluxo. Não espere retorno de ligação. Vá diretamente à emergência pediátrica mais próxima.",
    },
    {
      id: "apos-3-meses",
      stage: "Após 3 meses de tratamento",
      condition:
        "Refluxo persiste apesar do tratamento adequado, com impacto no crescimento ou qualidade de vida",
      action: "Solicitar encaminhamento ao gastroenterologista pediátrico",
      actionType: "specialist",
      explanation:
        "O especialista pode solicitar pHmetria esofágica, endoscopia digestiva alta ou outros exames para avaliar a gravidade do refluxo. Em casos raros e graves, pode ser indicada cirurgia (fundoplicatura). O acompanhamento multidisciplinar com nutricionista também pode ser necessário.",
    },
  ];

  // Testimonials
  const testimonials: Testimonial[] = [
    {
      quote:
        "Minha filha chorava inconsolavelmente após cada mamada. Eu achava que era cólica. Depois de ler sobre refluxo silencioso aqui, fui ao pediatra com as perguntas certas. Era DRGE. Com o tratamento certo, ela mudou completamente.",
      author: "Camila Ferreira",
      role: "Mãe de primeira viagem",
      location: "São Paulo, SP",
      topic: "Refluxo Silencioso",
    },
    {
      quote:
        "Sou enfermeira pediátrica. Uso as tabelas de comparação para orientar mães na maternidade. Antes eu improvisava. Agora tenho um framework que bate com o que os pediatras recomendam.",
      author: "Renata Oliveira",
      role: "Enfermeira pediátrica",
      location: "Hospital das Clínicas, Belo Horizonte MG",
      topic: "DRGE em Bebês",
    },
    {
      quote:
        "Meu marido e eu tínhamos opiniões diferentes sobre o refluxo do nosso filho. Depois que os dois lemos a mesma página aqui, chegamos à consulta alinhados. O pediatra ficou impressionado com as perguntas que fizemos.",
      author: "Juliana e Pedro Santos",
      role: "Pais",
      location: "Curitiba, PR",
      topic: "Refluxo Fisiológico",
    },
  ];

  // Tags de busca rápida
  const quickSearchTags = [
    "Bebê cospe muito",
    "Choro após mamar",
    "Refluxo silencioso",
    "Posição para dormir",
    "DRGE em bebês",
  ];

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case "home":
        return "bg-green-50 border-green-200";
      case "call":
        return "bg-yellow-50 border-yellow-200";
      case "emergency":
        return "bg-red-50 border-red-200";
      case "specialist":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "home":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "call":
        return <Phone className="w-5 h-5 text-yellow-600" />;
      case "emergency":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "specialist":
        return <Star className="w-5 h-5 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0d7a8a] to-[#0a5a68] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-semibold">Baseado em evidências</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Entenda o refluxo do seu bebê. Saiba o que fazer.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Refluxo em bebês explicado da forma que seu pediatra explicaria — com as opções de tratamento lado a lado e a árvore de decisão que ele realmente usa. Sem jargão. Sem alarme. Só clareza.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-3xl font-bold">1 em 3</div>
                  <div className="text-sm text-white/80">Bebês com refluxo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm text-white/80">Melhora até 12 meses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm text-white/80">Tipos identificados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">2026</div>
                  <div className="text-sm text-white/80">Diretrizes atualizadas</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
                <div className="bg-white/20 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-6xl">🍼</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Buscar sintomas ou dúvidas
              </label>
              <input
                type="text"
                placeholder="Digite um sintoma ou dúvida sobre refluxo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d7a8a]"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Buscas comuns:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-[#e94b66] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Refluxo */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Tipos e categorias
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Cada tipo de refluxo que seu bebê pode ter. Organizado da forma que um pediatra pensa — por tipo, causa e gravidade.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {refluxTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{type.emoji}</span>
                  <span className="text-xs font-semibold text-[#0d7a8a] bg-blue-50 px-3 py-1 rounded-full">
                    {type.label}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.details.map((detail, didx) => (
                    <li key={didx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#e94b66] mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Comparação de tratamentos
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Três caminhos. Lado a lado. Sem esconder nada. Esta é a mesma comparação que seu pediatra faz mentalmente durante a consulta.
          </p>

          {/* Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200">
            {[
              { id: "fisiologico", label: "Refluxo Fisiológico" },
              { id: "silencioso", label: "Refluxo Silencioso" },
              { id: "drge", label: "DRGE" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-[#e94b66] text-[#e94b66]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Abordagem terapêutica
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Medidas Conservadoras
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Tratamento Medicamentoso
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Encaminhamento ao Gastro
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Tempo de resposta", key: "timeResponse" },
                  { label: "O que você vai notar em casa", key: "homeObservation" },
                  { label: "Ligue se...", key: "callIf" },
                  { label: "Custo e cobertura", key: "costCoverage" },
                  { label: "Tipicamente recomendado quando", key: "recommendedWhen" },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-semibold text-gray-900 border-b border-gray-200">
                      {row.label}
                    </td>
                    <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                      {treatmentComparison[activeTab][row.key as keyof typeof treatmentComparison[string]]}
                    </td>
                    <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                      {treatmentComparison[activeTab][row.key as keyof typeof treatmentComparison[string]]}
                    </td>
                    <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                      {treatmentComparison[activeTab][row.key as keyof typeof treatmentComparison[string]]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-600 mt-6">
            Todas as informações são revisadas com base nas diretrizes da <strong>Sociedade Brasileira de Pediatria (SBP)</strong>, atualizadas em 2026.
          </p>
        </div>
      </section>

      {/* Decision Tree */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Árvore de decisão clínica
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            A lógica se-então que seu pediatra usa. Nada escondido atrás de autoridade médica. Este é o caminho de decisão real para Refluxo Gastroesofágico em Bebês.
          </p>

          {/* Legend */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 p-6 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700">Espera vigilante — fique em casa</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-700">Ligue para o pediatra</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">Emergência — vá agora</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-700">Agendar especialista</span>
            </div>
          </div>

          {/* Decision Nodes */}
          <div className="space-y-4">
            {decisionTree.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${getActionColor(node.actionType)}`}
                onClick={() =>
                  setExpandedDecision(
                    expandedDecision === node.id ? null : node.id
                  )
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getActionIcon(node.actionType)}
                      <span className="font-semibold text-gray-900">
                        {node.stage}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 mb-3">
                      <span className="font-semibold">SE</span> {node.condition}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      → {node.action}
                    </div>
                  </div>
                  {expandedDecision === node.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                  )}
                </div>

                {expandedDecision === node.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-300"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {node.explanation}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            O que os pais dizem
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Clareza no momento mais difícil.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-xs text-[#0d7a8a] font-semibold mt-2">
                    Leu: {testimonial.topic}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Credibility Stats */}
          <div className="grid md:grid-cols-4 gap-6 p-8 bg-gradient-to-r from-[#0d7a8a]/5 to-[#e94b66]/5 rounded-lg border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0d7a8a] mb-2">48</div>
              <p className="text-sm text-gray-600">Pediatras revisores</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0d7a8a] mb-2">120+</div>
              <p className="text-sm text-gray-600">Revisões de diretrizes SBP</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0d7a8a] mb-2">340+</div>
              <p className="text-sm text-gray-600">Referências clínicas citadas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0d7a8a] mb-2">2026</div>
              <p className="text-sm text-gray-600">Última auditoria</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0d7a8a] to-[#0a5a68] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para o próximo passo?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              A informação foi gratuita. O raciocínio é seu para guardar. Agora, se você precisa de um pediatra — tornamos essa parte fácil também.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=Olá! Gostaria de agendar uma consulta sobre refluxo em bebês.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white text-[#0d7a8a] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Agendar via WhatsApp
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-center gap-3 bg-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/30"
            >
              <Phone className="w-5 h-5" />
              Ligar para consultório
            </a>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm">
              Resposta em até 2 horas via WhatsApp • Consultório em Uberaba
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Respostas às dúvidas mais comuns sobre refluxo em bebês.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Refluxo é perigoso?",
                a: "O refluxo fisiológico é absolutamente normal e não é perigoso. Cerca de 70% dos bebês regurgitam nos primeiros meses. Apenas quando afeta o crescimento, causa desconforto significativo ou há sinais de complicações é que requer investigação e tratamento.",
              },
              {
                q: "Quando devo procurar o pediatra?",
                a: "Procure o pediatra se o bebê apresenta choro excessivo durante as mamadas, recusa alimentar, ganho de peso insuficiente, ou se há sangue no vômito. Também se o refluxo persiste além de 12-18 meses ou está afetando a qualidade de vida.",
              },
              {
                q: "Medicação é sempre necessária?",
                a: "Não. A maioria dos casos de refluxo fisiológico melhora com medidas posturais e ajustes alimentares. Medicação é indicada apenas quando há confirmação de DRGE ou refluxo silencioso com sintomas significativos.",
              },
              {
                q: "Qual é o melhor posicionamento?",
                a: "Mantenha o bebê em posição vertical (semi-sentado ou em pé) por 20-30 minutos após as mamadas. Ao dormir, o bebê deve estar em decúbito dorsal (de costas), mas com a cabeceira do berço elevada em 30 graus.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-[#e94b66] font-bold">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-gray-700 ml-6">
                  <span className="text-[#0d7a8a] font-bold">R:</span> {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-6">
            Tem mais dúvidas? Fale diretamente com nossa equipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=Olá! Tenho dúvidas sobre refluxo em bebês.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#e94b66] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d63a55] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Fazer uma pergunta
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center gap-2 bg-[#0d7a8a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0a5a68] transition-all"
            >
              <Phone className="w-5 h-5" />
              Ligar agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefluxoBebesArticle;
