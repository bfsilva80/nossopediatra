'use client';

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
  ArrowRight,
  Search,
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
  const treatmentApproaches = [
    {
      id: "fisiologico",
      name: "Medidas Conservadoras",
      timeframe: "2–4 semanas",
      atHome:
        "Bebê regurgita após mamar mas está ganhando peso, dormindo e se desenvolvendo normalmente. Parece incomodado mas se acalma rapidamente.",
      whenToCall:
        "Bebê para de ganhar peso, vômitos se tornam forçados, há sangue no vômito, ou sinais de dificuldade respiratória.",
      cost: "Sem medicação. Ajustes posturais e de alimentação sem custo adicional.",
      recommended:
        "Bebês com refluxo fisiológico, ganho de peso adequado e sem sinais de complicação.",
    },
    {
      id: "medicamentoso",
      name: "Tratamento Medicamentoso",
      timeframe: "2–4 semanas",
      atHome:
        "Bebê regurgita após mamar mas está ganhando peso, dormindo e se desenvolvendo normalmente. Parece incomodado mas se acalma rapidamente.",
      whenToCall:
        "Bebê para de ganhar peso, vômitos se tornam forçados, há sangue no vômito, ou sinais de dificuldade respiratória.",
      cost: "Medicação conforme prescrição. Custos variam conforme cobertura.",
      recommended:
        "Bebês com DRGE confirmada ou sintomas que não melhoram com medidas conservadoras.",
    },
    {
      id: "especialista",
      name: "Encaminhamento ao Gastro",
      timeframe: "2–4 semanas",
      atHome:
        "Bebê regurgita após mamar mas está ganhando peso, dormindo e se desenvolvendo normalmente. Parece incomodado mas se acalma rapidamente.",
      whenToCall:
        "Bebê para de ganhar peso, vômitos se tornam forçados, há sangue no vômito, ou sinais de dificuldade respiratória.",
      cost: "Consulta especializada. Custos conforme plano de saúde.",
      recommended:
        "Casos complexos, suspeita de complicações, ou falha de tratamento prévio.",
    },
  ];

  // Árvore de Decisão
  const decisionNodes: DecisionNode[] = [
    {
      id: "primeiras-semanas",
      stage: "Primeiras semanas",
      condition:
        "SE Bebê cospe após mamar mas está ganhando peso e parece confortável entre as mamadas",
      action: "Medidas posturais — sem medicação",
      actionType: "home",
      explanation:
        "Mantenha o bebê em posição vertical por 20–30 minutos após cada mamada. Ofereça mamadas menores e mais frequentes. Evite pressão na barriga após alimentação. Na maioria dos casos, o refluxo fisiológico melhora sozinho com o amadurecimento do esfíncter esofágico inferior — geralmente entre 6 e 12 meses de vida.",
    },
    {
      id: "semanas-2-6",
      stage: "Semanas 2–6",
      condition:
        "SE Bebê chora excessivamente após mamar, arqueia as costas, recusa o seio ou a mamadeira",
      action: "Ligue para o pediatra hoje",
      actionType: "call",
      explanation:
        "Esses sinais podem indicar refluxo silencioso (sem vômito visível) ou DRGE. O pediatra avaliará se há necessidade de medicação como omeprazol ou ranitidina. Também investigará possíveis alergias alimentares. Não espere — quanto mais cedo diagnosticado, melhor a resposta ao tratamento.",
    },
    {
      id: "com-tratamento",
      stage: "Com tratamento em curso",
      condition:
        "SE Sem melhora após 2 semanas de medicação, ou bebê continua perdendo peso",
      action: "Retorne ao pediatra — ajuste necessário",
      actionType: "call",
      explanation:
        "A medicação pode precisar de ajuste de dose ou mudança de classe. Também é importante investigar se há alergia alimentar não diagnosticada, especialmente intolerância à lactose ou alergia à proteína do leite. O pediatra pode indicar testes adicionais ou encaminhamento ao gastroenterologista pediátrico.",
    },
    {
      id: "emergencia",
      stage: "Qualquer momento",
      condition:
        "SE Sangue no vômito, apneia (pausa na respiração), engasgos graves, ou perda de peso significativa",
      action: "Vá à emergência imediatamente",
      actionType: "emergency",
      explanation:
        "Esses são sinais de alerta que requerem avaliação urgente. Podem indicar complicações como esofagite erosiva, aspiração, ou outras condições que precisam de investigação imediata. Não hesite — procure o pronto-socorro mais próximo.",
    },
    {
      id: "apos-3-meses",
      stage: "Após 3 meses de tratamento",
      condition:
        "SE Refluxo persiste apesar do tratamento adequado, com impacto no crescimento ou qualidade de vida",
      action: "Solicitar encaminhamento ao gastroenterologista pediátrico",
      actionType: "specialist",
      explanation:
        "Casos refratários podem precisar de investigação mais profunda com endoscopia, pH-metria ou manometria esofágica. O especialista pode indicar tratamentos mais avançados ou investigar causas secundárias. Essa avaliação é importante para evitar complicações a longo prazo.",
    },
  ];

  // Testimonials
  const testimonials: Testimonial[] = [
    {
      quote:
        "Minha filha chorava inconsolavelmente após cada mamada. Eu achava que era cólica. Depois de ler sobre refluxo silencioso aqui, fui ao pediatra com as perguntas certas. Ela mudou completamente.",
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
        "Meu filho e eu tínhamos opiniões diferentes sobre o refluxo do nosso filho. Depois que os dois lemos a mesma página aqui, chegamos à consulta alinhados. O pediatra ficou impressionado com as perguntas que fizemos.",
      author: "Juliana e Pedro Santos",
      role: "Pais",
      location: "Curitiba, PR",
      topic: "Refluxo Fisiológico",
    },
  ];

  // FAQ
  const faqs = [
    {
      question: "Com quantos meses o refluxo geralmente melhora?",
      answer:
        "A maioria dos bebês com refluxo fisiológico melhora entre 6 e 12 meses, quando o esfíncter esofágico amadurece e passam mais tempo em posição vertical. Alguns levam até 18 meses. Se o bebê está ganhando peso e se desenvolvendo bem, paciência é a melhor medicina.",
    },
    {
      question: "Posso dar medicação preventiva mesmo que o bebê não tenha sintomas?",
      answer:
        "Não. Medicação sem indicação precisa pode trazer mais riscos que benefícios. O refluxo fisiológico não precisa de tratamento. Medicação é indicada apenas quando há sintomas que afetam a qualidade de vida ou o desenvolvimento.",
    },
    {
      question: "Qual é a diferença entre refluxo e vômito?",
      answer:
        "Refluxo é o retorno passivo do conteúdo gástrico — o bebê cospe sem esforço. Vômito é ativo — há contração muscular. O refluxo fisiológico é normal. Vômito frequente ou forçado pode indicar problema.",
    },
    {
      question: "Posso amamentar se meu bebê tem DRGE?",
      answer:
        "Sim. Amamentação é segura e recomendada. Leite materno é mais fácil de digerir. Se há suspeita de alergia alimentar, a mãe pode fazer exclusão dietética (sem leite de vaca, por exemplo) sob orientação do pediatra.",
    },
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá Dr. Bruno, gostaria de agendar uma consulta para discutir o refluxo do meu bebê."
    );
    window.open(
      `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
  };

  const handlePhone = () => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/biblioteca" className="text-teal-600 hover:text-teal-700 font-medium text-sm">
            ← Voltar para Biblioteca
          </a>
          <span className="text-slate-600 text-sm">🍼 REFLUXO</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">
            Refluxo em Bebê:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-700">
              Quando é Normal, Quando é Problema
            </span>
          </h1>
          <div className="flex items-center gap-6 text-slate-600 mb-8">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="text-sm">Dr. Bruno Fernandes</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-sm">12 min de leitura</span>
            </div>
          </div>

          {/* Intro Box */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 border-l-4 border-teal-600 p-6 rounded-lg mb-8">
            <p className="text-slate-700 leading-relaxed">
              O refluxo é uma das queixas mais frequentes nos consultórios de gastropediatria. Quase todos os bebês regurgitam nos primeiros meses de vida, e a grande maioria não precisa de tratamento. Mas como saber quando o refluxo deixa de ser fisiológico e passa a ser doença? Neste artigo, vamos entender juntos o raciocínio clínico que guia essa avaliação.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Bebês com refluxo", value: "1 em 3" },
              { label: "Melhora até 12 meses", value: "95%" },
              { label: "Tipos identificados", value: "5" },
              { label: "Diretrizes atualizadas", value: "2026" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-4 border border-slate-200 text-center"
              >
                <div className="text-2xl font-bold text-teal-600">{stat.value}</div>
                <div className="text-xs text-slate-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section: O que é Refluxo */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            O que é Refluxo Gastroesofágico?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            O refluxo gastroesofágico (RGE) é o retorno involuntário do conteúdo gástrico para o esôfago. Em bebês, acontece porque o esfíncter esofágico inferior — a "válvula" entre o esôfago e o estômago — ainda está amadurecendo. Isso é absolutamente normal nos primeiros meses de vida. <strong>Cerca de 70% dos bebês de 4 meses regurgitam pelo menos uma vez ao dia.</strong> A maioria melhora espontaneamente entre 12 e 18 meses, quando o esfíncter amadurece e a criança passa mais tempo em posição vertical.
          </p>
          <p className="text-slate-700 leading-relaxed">
            O bebê que "golfou feliz" — regurgita, mas ganha peso adequadamente, se alimenta bem e não apresenta desconforto significativo — é o exemplo clássico de refluxo fisiológico. Esse é o cenário mais comum, e nesses casos, paciência e medidas simples são suficientes.
          </p>
        </motion.section>

        {/* Section: 5 Tipos de Refluxo */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Tipos e Categorias
          </h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            Cada tipo de refluxo que seu bebê pode ter. Organizado da forma que um pediatra pensa — por tipo, causa e gravidade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {refluxTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{type.emoji}</div>
                  <div>
                    <div className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                      {type.label}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {type.title}
                    </h3>
                    <p className="text-sm text-slate-600">{type.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {type.details.map((detail, didx) => (
                    <li key={didx} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle size={16} className="text-teal-600 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section: Refluxo Fisiológico vs. DRGE */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Refluxo Fisiológico vs. Doença do Refluxo
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            A diferença fundamental está no impacto clínico. O refluxo fisiológico é o "bebê que golfou feliz" — regurgita, mas ganha peso adequadamente, se alimenta bem e não apresenta desconforto significativo. Já a Doença do Refluxo Gastroesofágico (DRGE) causa sintomas que afetam a qualidade de vida: recusa alimentar, choro excessivo durante as mamadas, arqueamento do corpo, irritabilidade persistente, ganho de peso insuficiente ou sintomas respiratórios recorrentes.
          </p>
          <p className="text-slate-700 leading-relaxed">
            A investigação é indicada quando há sinais de alerta ou quando os sintomas impactam o desenvolvimento. Essa é a linha que separa o "normal" do "problema".
          </p>
        </motion.section>

        {/* Section: Comparação de Tratamentos */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Comparação de Tratamentos
          </h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            Três caminhos. Lado a lado. Sem esconder nada. Esta é a mesma comparação que seu pediatra faz mentalmente durante a consulta.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {treatmentApproaches.map((approach) => (
              <button
                key={approach.id}
                onClick={() => setActiveTab(approach.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === approach.id
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {approach.name}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            {treatmentApproaches.map((approach) => (
              activeTab === approach.id && (
                <motion.div
                  key={approach.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        Tempo de resposta
                      </h4>
                      <p className="text-slate-700">{approach.timeframe}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        O que você vai notar em casa
                      </h4>
                      <p className="text-slate-700">{approach.atHome}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        Ligue se...
                      </h4>
                      <p className="text-slate-700">{approach.whenToCall}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        Custo e cobertura
                      </h4>
                      <p className="text-slate-700">{approach.cost}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        Tipicamente recomendado quando
                      </h4>
                      <p className="text-slate-700">{approach.recommended}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-6">
            Todas as informações são revisadas com base nas diretrizes da{" "}
            <strong>Sociedade Brasileira de Pediatria (SBP)</strong>, atualizadas em 2026.
          </p>
        </motion.section>

        {/* Section: Manejo Prático */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Manejo Prático: O que Funciona
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Para o refluxo fisiológico, medidas posturais são o pilar do tratamento: manter o bebê em posição vertical por 20-30 minutos após as mamadas, oferecer volumes menores e mais frequentes, e elevar a cabeceira do berço em 30 graus. Evitar roupas apertadas na região abdominal e não movimentar o bebê bruscamente após a alimentação também ajudam.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            Quando há suspeita de DRGE, o pediatra pode indicar investigação adicional e, em alguns casos, tratamento medicamentoso. Mas atenção: <strong>medicação sem indicação precisa pode trazer mais riscos que benefícios.</strong>
          </p>

          <div className="bg-gradient-to-br from-coral-50 to-coral-100/50 border-l-4 border-coral-600 p-6 rounded-lg">
            <div className="flex gap-4">
              <AlertTriangle className="text-coral-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-slate-900 mb-3">
                  ⚠️ Quando Procurar o Pediatra
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-coral-600" />
                    Sangue no vômito ou nas fezes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-coral-600" />
                    Recusa alimentar persistente com perda de peso
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-coral-600" />
                    Choro intenso e arqueamento durante as mamadas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-coral-600" />
                    Episódios de engasgo, tosse crônica ou chiado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-coral-600" />
                    Irritabilidade extrema que não melhora com medidas posturais
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section: Árvore de Decisão */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Árvore de Decisão Clínica
          </h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            A lógica se-então que seu pediatra usa. Nada escondido atrás de autoridade médica. Este é o caminho de decisão real para Refluxo Gastroesofágico em Bebês.
          </p>

          <div className="space-y-4">
            {decisionNodes.map((node) => {
              const actionColors = {
                home: "from-green-50 to-green-100/50 border-green-300",
                call: "from-yellow-50 to-yellow-100/50 border-yellow-300",
                emergency: "from-red-50 to-red-100/50 border-red-300",
                specialist: "from-purple-50 to-purple-100/50 border-purple-300",
              };

              const actionIcons = {
                home: "✅",
                call: "📞",
                emergency: "🚨",
                specialist: "👨‍⚕️",
              };

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-br ${actionColors[node.actionType]} border-2 rounded-lg overflow-hidden`}
                >
                  <button
                    onClick={() =>
                      setExpandedDecision(
                        expandedDecision === node.id ? null : node.id
                      )
                    }
                    className="w-full p-6 text-left hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{actionIcons[node.actionType]}</span>
                          <h3 className="font-bold text-slate-900">
                            {node.stage}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">
                          <strong>SE</strong> {node.condition}
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          <strong>→</strong> {node.action}
                        </p>
                      </div>
                      {expandedDecision === node.id ? (
                        <ChevronUp className="text-slate-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="text-slate-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  {expandedDecision === node.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 border-t-2 border-current border-opacity-20"
                    >
                      <p className="text-slate-700 leading-relaxed">
                        {node.explanation}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Section: Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            O que os pais dizem
          </h2>
          <p className="text-slate-600 mb-8">Clareza no momento mais difícil.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-6 border border-slate-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {testimonial.location}
                  </p>
                  <div className="mt-3 inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-1 rounded">
                    {testimonial.topic}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section: Credibilidade */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gradient-to-r from-teal-50 to-teal-100/50 rounded-lg p-8 border border-teal-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "48", label: "Pediatras revisores" },
              { number: "120+", label: "Revisões de diretrizes SBP" },
              { number: "340+", label: "Referências clínicas citadas" },
              { number: "2026", label: "Última auditoria" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-teal-600">
                  {item.number}
                </div>
                <p className="text-sm text-slate-600 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section: FAQ */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg border border-slate-200 p-6"
              >
                <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section: CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Pronto para o próximo passo?</h2>
          <p className="mb-6 text-teal-100">
            A informação foi gratuita. O raciocínio é seu para guardar. Agora, se você precisa de um pediatra — tornamos essa parte fácil também.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleWhatsApp}
              className="bg-white text-teal-600 hover:bg-teal-50 font-semibold"
            >
              <MessageCircle size={18} className="mr-2" />
              Conversar no WhatsApp
            </Button>
            <Button
              onClick={handlePhone}
              className="bg-teal-500 text-white hover:bg-teal-600 font-semibold"
            >
              <Phone size={18} className="mr-2" />
              Ligar Agora
            </Button>
          </div>
          <p className="text-sm text-teal-100 mt-4">
            Resposta em até 2 horas via WhatsApp • Consultório em Uberaba
          </p>
        </motion.section>

        {/* Section: Related Articles */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Artigos Relacionados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🥛",
                title: "Alergia Alimentar",
                link: "/artigo/alergia-alimentar",
              },
              {
                emoji: "💪",
                title: "Constipação Infantil",
                link: "/artigo/constipacao",
              },
              {
                emoji: "💧",
                title: "Diarreia Crônica",
                link: "/artigo/diarreia",
              },
            ].map((article, idx) => (
              <a
                key={idx}
                href={article.link}
                className="group bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{article.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-teal-600 font-semibold text-sm">
                  Ler artigo <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-slate-600 py-8 border-t border-slate-200"
        >
          <p>
            Este artigo é informativo e educativo. Não substitui avaliação médica profissional. Sempre consulte um pediatra para diagnóstico e tratamento adequado.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default RefluxoBebesArticle;
