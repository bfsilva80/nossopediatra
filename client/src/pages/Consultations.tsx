import { motion } from "framer-motion";
import { Star, ArrowRight, Sparkles, Heart, Stethoscope, FileText, Clock } from "lucide-react";
import { Link } from "wouter";
import { TestimonialsSection } from "@/components/testimonials-section";

const DOCTOR_PORTRAIT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/ChatGPTImage30dejun.de2025,21_56_13_d914da2d.png";
const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";
const DOCTOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/dr_bruno_watercolor_a674df2f.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 } as const,
  }),
};

export default function Consultations() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-coral/5" />
        {/* Floating decorations */}
        <div className="absolute top-16 left-[8%] text-3xl animate-float opacity-40 pointer-events-none">🩺</div>
        <div className="absolute top-20 right-[12%] text-2xl animate-float-slow opacity-30 pointer-events-none">💛</div>
        <div className="absolute bottom-16 left-[15%] text-2xl animate-wiggle opacity-30 pointer-events-none">⭐</div>

        <div className="relative z-10 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-lg"
            >
              <h1 className="mb-6 text-white">Consulta que ajuda a entender e decidir melhor</h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                Quando os sintomas digestivos confundem, uma boa consulta não serve apenas para dizer o que fazer. Serve para organizar a história e mostrar com mais clareza o caminho.
              </p>
              <Link href="/contato" className="btn-primary inline-block">
                Agendar Consulta
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img src={DOCTOR_IMG} alt="Dr. Bruno" className="w-full max-w-sm" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como é a consulta */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="bg-white rounded-lg p-8 md:p-12 border border-teal/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Na consulta, eu procuro entender o quadro por inteiro</h2>
            
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Como os sintomas começaram, o que já foi tentado, o que piora, o que melhora e o que, naquela história, realmente chama atenção.
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              A partir disso, a gente constrói um plano. Às vezes ele inclui exames. Às vezes não. Às vezes o mais importante é tratar. Em outras, é observar melhor. O ponto é: a família sai entendendo mais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Para quem essa consulta ajuda */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="bg-white rounded-lg p-8 md:p-12 border border-teal/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Para quem essa consulta costuma ajudar</h2>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              Essa consulta costuma ser especialmente útil quando a criança tem refluxo, vômitos, constipação, dor abdominal recorrente, suspeita de alergia alimentar, dificuldade para evacuar, alteração do cocô ou sintomas digestivos que já vêm se repetindo sem uma explicação clara.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fecho e CTA */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="bg-white rounded-lg p-8 md:p-12 border border-teal/10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Se você sente que está faltando clareza</h2>
            
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              Se você sente que está faltando clareza para entender o que seu filho tem, talvez este já seja o momento de organizar essa história com mais cuidado.
            </p>

            <Link href="/contato" className="btn-primary inline-block">
              Agendar Consulta
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />
    </div>
  );
}
