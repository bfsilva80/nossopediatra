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
      title: "Verificador de Sintomas | Entender Meu Filho",
      description: "Ferramenta interativa para diagnosticar sintomas digestivos em criancas. Refluxo, constipacao, alergias alimentares e dor abdominal. Diagnostico personalizado em menos de 2 minutos.",
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
            <div className="inline-block mb-4 px-4 py-2 bg-teal/10 rounded-full">
              <span className="text-sm font-medium text-teal">Orientação inicial por sintomas</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Entenda melhor os sintomas digestivos do seu filho
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
              Responda algumas perguntas simples e receba uma orientação inicial sobre o que observar e qual pode ser o próximo passo.
            </p>
            <p className="text-base text-slate-600 max-w-2xl mx-auto italic">
              Nem sempre é fácil saber o que pode esperar e o que merece atenção. Esta ferramenta ajuda a organizar os sintomas com mais clareza.
            </p>
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

      {/* FAQ Section */}
      <section className="section-spacing bg-slate-50">
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

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="mt-12 p-8 bg-gradient-to-r from-teal/10 to-blue/10 rounded-lg text-center border border-teal/20"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ainda ficou em dúvida?
            </h3>
            <p className="text-slate-600 mb-6">
              Se preferir, converse com o Dr. Bruno e receba uma orientação mais individualizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="inline-block px-8 py-3 bg-teal text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                Conversar no WhatsApp
              </Link>
              <Link href="/" className="inline-block px-8 py-3 bg-white text-teal border-2 border-teal rounded-lg font-semibold hover:bg-teal/5 transition-colors">
                Agendar consulta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
