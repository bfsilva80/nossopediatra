import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SymptomChecker } from "@/components/SymptomCheckerComponent";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Lightbulb, Heart, Shield } from "lucide-react";
import { injectSchema, generateFAQSchema } from "@/lib/seo-schema";
import { faqItems, FAQItem } from "@/data/faq";
import { SEOHead } from "@/components/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function SymptomCheckerPage() {
  useEffect(() => {
    // Set SEO meta tags
    SEOHead({
      title: "Entender os Sintomas do Seu Filho | Nosso Pediatra",
      description: "Ferramenta para organizar melhor a historia dos sintomas digestivos. Refluxo, constipacao, alergias alimentares e dor abdominal. Orientacao inicial em menos de 2 minutos.",
      image: "https://nossopediatra.com.br/logo.png",
      url: "https://nossopediatra.com.br/diagnostico",
      type: "website",
      keywords: [
        "verificador de sintomas",
        "diagnostico infantil",
        "refluxo em criancas",
        "constipacao infantil",
        "alergias alimentares",
        "dor abdominal em criancas",
      ],
    });

    // Convert FAQ data to schema format
    const schemaFaqs = faqItems.map((item: FAQItem) => ({
      question: item.question,
      answer: item.answer,
    }));
    const schema = generateFAQSchema(schemaFaqs);
    injectSchema(schema);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="section-spacing bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            {/* Sobrancelha */}
            {/* H1 */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Entender os sintomas do seu filho já ajuda a cuidar melhor.
            </h1>
            
            {/* Subtítulo */}
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Nem sempre é fácil saber o que é esperado, o que merece atenção e o que já pede uma avaliação mais cuidadosa. Esta ferramenta foi feita para ajudar a organizar a história com mais clareza.
            </p>
            
            {/* Texto de Apoio */}
            <div className="bg-white/60 backdrop-blur rounded-lg p-6 mb-8 border border-slate-200/50">
              <p className="text-base text-slate-700 leading-relaxed">
                Você não precisa acertar o nome do problema. Basta contar o que está acontecendo. A ideia aqui é ajudar a dar forma à dúvida.
              </p>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: Lightbulb, title: "Rápido", desc: "Leva cerca de 2 minutos" },
              { icon: Heart, title: "Confidencial", desc: "Suas respostas são confidenciais" },
              { icon: Shield, title: "Clínico", desc: "Triagem inicial baseada em critérios clínicos" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="p-4 bg-white rounded-lg border border-slate-200 text-center"
              >
                <item.icon className="w-8 h-8 text-teal mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Symptom Checker */}
      <section className="section-spacing">
        <div className="container max-w-4xl">
          <SymptomChecker />
        </div>
      </section>

      {/* Bloco de Segurança Clínica */}
      <section className="section-spacing bg-amber-50">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="bg-white border-l-4 border-amber-500 p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Importante: Segurança Clínica
            </h3>
            <p className="text-amber-800 leading-relaxed">
              Esta ferramenta não fecha diagnóstico e não substitui consulta médica. Ela ajuda a entender melhor os sintomas e a decidir com mais clareza o próximo passo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Seção de Transição */}
      <section className="section-spacing bg-gradient-to-b from-white to-slate-50">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12 p-8 bg-white rounded-lg border border-slate-200"
          >
            <p className="text-lg text-slate-700 leading-relaxed italic">
              Quando a história fica mais organizada, muita coisa muda.<br />
              <span className="font-medium text-slate-900">A ansiedade diminui, os sinais de atenção ficam mais claros e a decisão sobre o que fazer deixa de ser um escuro sem mapa.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-slate-50 pb-40 md:pb-12">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-slate-600">
              Respostas às dúvidas mais comuns
            </p>
          </motion.div>

          <FAQAccordion />
        </div>
      </section>

      {/* Ponte para Conteúdo */}
      <section className="section-spacing bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Prefere ler primeiro?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Veja também nossos conteúdos sobre refluxo, constipação, alergias alimentares e outros sintomas digestivos da infância.
            </p>
          </motion.div>

          {/* Links para Artigos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Ler sobre refluxo",
                href: "/artigo/refluxo-bebes",
                icon: "🔄",
              },
              {
                title: "Ler sobre constipação",
                href: "/artigo/constipacao-infantil",
                icon: "🚽",
              },
              {
                title: "Ler sobre alergias alimentares",
                href: "/artigo/alergia-alimentar",
                icon: "🍎",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
              >
                <Link
                  href={item.href}
                  className="block p-6 bg-slate-50 rounded-lg border-2 border-slate-200 hover:border-teal hover:bg-teal/5 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-teal transition-colors">
                    {item.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-spacing bg-gradient-to-br from-teal/5 to-blue/5">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="p-8 bg-white rounded-lg border-2 border-blue/20 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              O objetivo aqui não é fechar diagnóstico. É deixar a história mais clara.
            </h3>
            <p className="text-slate-600 mb-6">
              Com esse primeiro mapa, fica mais fácil entender o que pode estar acontecendo, o que merece atenção e quando vale procurar uma avaliação especializada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/biblioteca" className="inline-block px-8 py-3 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                Ler mais sobre isso
              </Link>
              <Link href="/contato" className="inline-block px-8 py-3 bg-white text-teal border-2 border-teal rounded-lg font-semibold hover:bg-teal/5 transition-colors">
                Agendar Consulta
              </Link>
              <Link href="/diagnostico" className="inline-block px-8 py-3 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                Voltar ao Início
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rodape de Posicionamento */}
      <section className="section-spacing bg-slate-900 text-white">
        <div className="container max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h3 className="text-2xl font-bold mb-3">
              Nosso Pediatra
            </h3>
            <p className="text-slate-300 mb-6 text-lg">
              Gastropediatria com clareza, escuta e foco nos sintomas digestivos da infancia.
            </p>
            <p className="text-slate-400 italic text-base">
              Barriga de crianca conta historia.<br />
              <span className="font-medium text-white">A gente ajuda a ouvir melhor.</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
