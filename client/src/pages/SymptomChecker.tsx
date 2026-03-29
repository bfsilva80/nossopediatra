import { motion } from "framer-motion";
import { Link } from "wouter";
import { SymptomChecker } from "@/components/SymptomCheckerComponent";
import { Lightbulb, Heart, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function SymptomCheckerPage() {
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
              <span className="text-teal font-semibold text-sm">Ferramenta Interativa</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Entender Meu Filho
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Um verificador de sintomas inteligente para ajudar você a entender melhor a saúde digestiva do seu filho. 
              Responda algumas perguntas simples e receba orientações personalizadas.
            </p>
          </motion.div>

          {/* Benefícios */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: Lightbulb,
                title: "Informação Clara",
                description: "Entenda melhor os sintomas do seu filho com explicações simples",
              },
              {
                icon: Heart,
                title: "Orientação Personalizada",
                description: "Recomendações específicas baseadas nas respostas que você fornecer",
              },
              {
                icon: Shield,
                title: "Segurança em Primeiro",
                description: "Sempre com recomendação para consulta profissional quando necessário",
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                custom={idx + 1}
                className="bg-white rounded-2xl p-6 border-2 border-blue/10 hover:border-teal/30 transition-colors"
              >
                <benefit.icon className="w-10 h-10 text-teal mb-4" />
                <h3 className="font-display font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-foreground/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Symptom Checker */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <SymptomChecker />
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-spacing bg-cream">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="bg-blue/5 rounded-2xl p-8 border-2 border-blue/10"
          >
            <h3 className="font-display font-bold text-foreground mb-4">Importante</h3>
            <p className="text-foreground/70 mb-4">
              Este verificador de sintomas é uma ferramenta educacional e <strong>não substitui</strong> a avaliação profissional de um médico. 
              Os resultados são baseados nas informações que você fornece e servem apenas como orientação inicial.
            </p>
            <p className="text-foreground/70">
              Se seu filho apresenta sintomas graves, dificuldade respiratória, ou qualquer preocupação imediata, 
              procure atendimento médico de emergência. Para outras situações, agendaremos uma consulta com o Dr. Bruno para avaliação completa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-spacing bg-gradient-to-br from-teal/5 to-blue/5">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Converse diretamente com o Dr. Bruno para uma avaliação completa e personalizada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sobre">
                <button className="px-8 py-3 bg-white border-2 border-blue rounded-lg font-semibold text-blue hover:bg-blue/5 transition-colors">
                  Conhecer Dr. Bruno
                </button>
              </Link>
              <button className="px-8 py-3 bg-blue hover:bg-blue/90 text-white rounded-lg font-semibold transition-colors">
                Agendar Consulta
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
