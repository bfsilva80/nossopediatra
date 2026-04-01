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
  ArrowRight,
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

const RefluxoBebesArticle = () => {
  const [expandedDecision, setExpandedDecision] = useState<string | null>(
    "ganhando-peso"
  );
  const [activeTab, setActiveTab] = useState<string>("conservador");
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
      description: "Quando os sintomas levantam a hipótese de refluxo mas os vômitos e regurgitações não são frequentes",
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
      label: "Relacionado à alimentação",
      title: "Refluxo associado à alimentação",
      description: "Quando os sintomas levantam hipótese de relação com leite, fórmula ou outros gatilhos alimentares.",
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
      id: "conservador",
      name: "Cuidados em casa",
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
      name: "Quando considerar medicação",
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
      name: "Quando procurar especialista",
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

  // Árvore de Decisão - Simplificada para linguagem leiga
  const decisionNodes: DecisionNode[] = [
    {
      id: "ganhando-peso",
      stage: "Se está ganhando peso e parece bem",
      condition:
        "Bebê cospe após mamar mas está ganhando peso e parece confortável entre as mamadas",
      action: "Medidas posturais — sem medicação",
      actionType: "home",
      explanation:
        "Mantenha o bebê em posição vertical por 20–30 minutos após cada mamada. Ofereça mamadas menores e mais frequentes. Evite pressão na barriga após alimentação. Na maioria dos casos, o refluxo fisiológico melhora sozinho com o amadurecimento do esfíncter esofágico inferior — geralmente entre 6 e 12 meses de vida.",
    },
    {
      id: "chora-muito",
      stage: "Se chora muito ou recusa mamadas",
      condition:
        "Bebê chora excessivamente após mamar, arqueia as costas, recusa o seio ou a mamadeira",
      action: "Ligue para o pediatra hoje",
      actionType: "call",
      explanation:
        "Esses sinais podem indicar refluxo silencioso (sem vômito visível) ou DRGE. O pediatra avaliará se há necessidade de medicação como omeprazol ou ranitidina. Também investigará possíveis alergias alimentares. Não espere — quanto mais cedo diagnosticado, melhor a resposta ao tratamento.",
    },
    {
      id: "sem-melhora",
      stage: "Se já está usando medicação sem melhora",
      condition:
        "Sem melhora após 2 semanas de medicação, ou bebê continua perdendo peso",
      action: "Retorne ao pediatra — ajuste necessário",
      actionType: "call",
      explanation:
        "A medicação pode precisar de ajuste de dose ou mudança de classe. Também é importante investigar se há alergia alimentar não diagnosticada, especialmente intolerância à lactose ou alergia à proteína do leite. O pediatra pode indicar testes adicionais ou encaminhamento ao gastroenterologista pediátrico.",
    },
    {
      id: "alerta",
      stage: "Se aparecer sinal de alerta",
      condition:
        "Sangue no vômito, apneia (pausa na respiração), engasgos graves, ou perda de peso significativa",
      action: "Vá à emergência imediatamente",
      actionType: "emergency",
      explanation:
        "Esses são sinais de alerta que requerem avaliação urgente. Podem indicar complicações como esofagite erosiva, aspiração, ou outras condições que precisam de investigação imediata. Não hesite — procure o pronto-socorro mais próximo.",
    },
    {
      id: "continua",
      stage: "Se o problema continua mesmo com cuidado adequado",
      condition:
        "Refluxo persiste apesar do tratamento adequado, com impacto no crescimento ou qualidade de vida",
      action: "Solicitar encaminhamento ao gastroenterologista pediátrico",
      actionType: "specialist",
      explanation:
        "Casos refratários podem precisar de investigação mais profunda com endoscopia, pH-metria ou manometria esofágica. O especialista pode indicar tratamentos mais avançados ou investigar causas secundárias. Essa avaliação é importante para evitar complicações a longo prazo.",
    },
  ];

  // FAQ - Expandida
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
    {
      question: "Refluxo pode causar tosse?",
      answer:
        "Pode estar associado em alguns casos, principalmente quando há irritação, engasgos ou sintomas respiratórios. Quando isso se repete, vale avaliação pediátrica.",
    },
    {
      question: "Todo bebê que golfa tem alergia ao leite?",
      answer:
        "Não. A maioria dos bebês que regurgita não tem alergia. A suspeita depende do conjunto de sintomas, da evolução e da resposta ao manejo.",
    },
    {
      question: "Quando o refluxo deixa de ser esperado?",
      answer:
        "Quando passa a atrapalhar alimentação, sono, ganho de peso, conforto ou desenvolvimento do bebê.",
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
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/biblioteca" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
            ← Voltar para Biblioteca
          </a>
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            REFLUXO
          </span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Refluxo em Bebê:<br />
              <span className="text-teal-600">Quando é Normal, Quando é Problema</span>
            </h1>
            <div className="flex items-center gap-3 text-slate-600 mb-8">
              <span>Dr. Bruno Fernandes</span>
              <span>•</span>
              <span>12 min de leitura</span>
            </div>
          </div>

          {/* Box-Resumo Inicial (Novo) */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 border-l-4 border-teal-600 p-6 rounded-lg mb-8">
            <p className="text-slate-900 leading-relaxed">
              <strong>A maioria dos bebês regurgita e melhora com o tempo.</strong> O ponto importante é saber quando isso é esperado e quando merece investigação.
            </p>
          </div>

          {/* Intro Paragraph */}
          <p className="text-slate-700 leading-relaxed text-lg">
            O refluxo é uma das queixas mais frequentes nos consultórios de gastropediatria. Quase todos os bebês regurgitam nos primeiros meses de vida, e a grande maioria não precisa de tratamento. Mas como saber quando o refluxo deixa de ser fisiológico e passa a ser doença? Neste artigo, vamos entender juntos o raciocínio clínico que guia essa avaliação.
          </p>
        </motion.section>

        {/* Section: O que é Refluxo Gastroesofágico */}
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
            O refluxo gastroesofágico (RGE) é o retorno involuntário do conteúdo gástrico para o esôfago. Em bebês, acontece porque o esfíncter esofágico inferior — a "válvula" entre o esôfago e o estômago — ainda está amadurecendo. Isso é absolutamente normal nos primeiros meses de vida.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Cerca de 70% dos bebês de 4 meses regurgitam pelo menos uma vez ao dia.</strong> A maioria melhora espontaneamente entre 12 e 18 meses, quando o esfíncter amadurece e a criança passa mais tempo em posição vertical.
          </p>

          {/* Key Highlight */}
          <div className="bg-slate-100 border-l-4 border-slate-400 p-6 rounded-lg mb-8 italic">
            <p className="text-slate-900">
              <strong>O que separa o refluxo esperado do problema não é só o leite voltar. É o impacto que isso causa na criança.</strong>
            </p>
          </div>

          <p className="text-slate-700 leading-relaxed">
            O bebê que "golfou feliz" — regurgita, mas ganha peso adequadamente, se alimenta bem e não apresenta desconforto significativo — é o exemplo clássico de refluxo fisiológico. Esse é o cenário mais comum, e nesses casos, paciência e medidas simples são suficientes.
          </p>
        </motion.section>

        {/* Section: Tipos e Categorias */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {refluxTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{type.emoji}</span>
                  <div>
                    <div className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                      {type.label}
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {type.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle size={16} className="text-teal-600 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Clinical Safety Note */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <p className="text-slate-700">
              <strong>Nota importante:</strong> Essas categorias ajudam a organizar o raciocínio clínico, mas a avaliação de cada bebê depende do contexto, da evolução e dos sinais associados.
            </p>
          </div>
        </motion.section>

        {/* Section: Refluxo Fisiológico vs. DRGE */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Refluxo Fisiológico vs. Doença do Refluxo
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6 italic">
            O que separa o normal do problema não é apenas o refluxo. É o impacto que ele causa na alimentação, no conforto, no sono, no crescimento e na qualidade de vida do bebê.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            A investigação é indicada quando há sinais de alerta ou quando os sintomas impactam o desenvolvimento. Essa é a linha que separa o "normal" do "problema".
          </p>

          <p className="text-slate-700 leading-relaxed">
            Quando há suspeita de DRGE, o pediatra pode indicar investigação adicional e, em alguns casos, tratamento medicamentoso. Mas atenção: <strong>medicação sem indicação precisa pode trazer mais riscos que benefícios.</strong>
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
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === approach.id
                    ? "bg-teal-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {approach.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {treatmentApproaches.map((approach) => (
            activeTab === approach.id && (
              <motion.div
                key={approach.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg border border-slate-200 p-8"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Tempo de resposta</h4>
                    <p className="text-slate-700">{approach.timeframe}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">O que você vai notar em casa</h4>
                    <p className="text-slate-700">{approach.atHome}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Ligue se...</h4>
                    <p className="text-slate-700">{approach.whenToCall}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Custo e cobertura</h4>
                    <p className="text-slate-700">{approach.cost}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Tipicamente recomendado quando</h4>
                    <p className="text-slate-700">{approach.recommended}</p>
                  </div>
                </div>
              </motion.div>
            )
          ))}

          <p className="text-slate-700 leading-relaxed mt-8 p-4 bg-slate-50 rounded-lg">
            <strong>Resumo:</strong> Na maioria dos bebês saudáveis, o primeiro passo é observar bem, ajustar o manejo e evitar medicação sem indicação.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Após as mamadas",
                description: "Manter o bebê em posição vertical por 20 a 30 minutos costuma ajudar.",
              },
              {
                title: "Posição",
                description: "O refluxo tende a incomodar mais quando o bebê é colocado deitado logo após mamar.",
              },
              {
                title: "Volume e frequência",
                description: "Mamadas menores e mais frequentes podem reduzir desconforto em alguns casos.",
              },
              {
                title: "O que evitar",
                description: "Evite roupas apertadas na barriga e movimentos bruscos logo após a alimentação.",
              },
              {
                title: "Quando voltar ao pediatra",
                description: "Se o bebê estiver piorando, recusando mamadas, perdendo peso ou com sinais de alerta, a reavaliação é necessária.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-6 border border-slate-200"
              >
                <h4 className="font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section: Quando Procurar o Pediatra */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-coral-50 to-coral-100/50 border-l-4 border-coral-600 p-6 rounded-lg">
            <div className="flex gap-4">
              <AlertTriangle className="text-coral-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg">
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
            Esse é um jeito simples de organizar a decisão: o que pode ser observado, o que merece reavaliação e o que pede ajuda mais rápida.
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

        {/* Section: CTA - Rewritten */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Pronto para o próximo passo?</h2>
          <p className="mb-6 text-teal-100 leading-relaxed">
            Se você precisa de ajuda para entender melhor o caso do seu filho, posso te ajudar a organizar essa história com mais clareza. Você pode falar comigo pelo WhatsApp e dar o próximo passo com mais segurança.
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
                title: "Alergia à Proteína do Leite",
                link: "/artigo/alergia-alimentar",
              },
              {
                emoji: "🤢",
                title: "Vômitos em Lactentes",
                link: "/artigo/vomitos",
              },
              {
                emoji: "💪",
                title: "Cólica e Desconforto",
                link: "/artigo/colica",
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
            Conteúdo informativo construído com base em diretrizes pediátricas atuais, revisão técnica e raciocínio clínico aplicado à prática. Sempre consulte um pediatra para diagnóstico e tratamento adequado.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default RefluxoBebesArticle;
