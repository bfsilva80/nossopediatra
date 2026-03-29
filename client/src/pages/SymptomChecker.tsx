import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SymptomChecker } from "@/components/SymptomCheckerComponent";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Lightbulb, Heart, Shield } from "lucide-react";
import { injectSchema, generateFAQSchema } from "@/lib/seo-schema";
import { faqItems, FAQItem } from "@/data/faq";

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
              <span className="text-sm font-medium text-teal">Diagnóstico Inteligente</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Entender Meu Filho
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Responda algumas perguntas simples e receba um diagnóstico personalizado sobre os sintomas do seu filho.
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
              { icon: Lightbulb, title: "Rápido", desc: "Menos de 2 minutos" },
              { icon: Heart, title: "Seguro", desc: "Informações confidenciais" },
              { icon: Shield, title: "Confiável", desc: "Baseado em medicina" },
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
              Respostas às dúvidas mais comuns sobre diagnóstico e sintomas
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
              Ainda tem dúvidas?
            </h3>
            <p className="text-slate-600 mb-6">
              Converse com o Dr. Bruno para um diagnóstico profissional e personalizado.
            </p>
            <Link href="/">
              <a className="inline-block px-8 py-3 bg-teal text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                Conversar Agora
              </a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
