import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ArrowRight, Sparkles, Heart, Stethoscope, FileText, Clock } from "lucide-react";
import { TestimonialsSection } from "@/components/testimonials-section";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_hero_bg-L2bcXukaEp8T537j9dHZXM.webp";
const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";
const DOCTOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/dr_bruno_watercolor_a674df2f.png";

const STEPS = [
  {
    emoji: "📋",
    color: "bg-coral/15",
    title: "Avaliação Completa",
    description: "Histórico detalhado, exame físico minucioso e investigação cuidadosa dos sintomas.",
  },
  {
    emoji: "💬",
    color: "bg-blue/10",
    title: "Explicação Clara",
    description: "Você entenderá o raciocínio clínico por trás de cada recomendação.",
  },
  {
    emoji: "🎯",
    color: "bg-emerald/10",
    title: "Plano Personalizado",
    description: "Estratégia adaptada às necessidades do seu filho e à realidade da sua família.",
  },
  {
    emoji: "🤝",
    color: "bg-golden/20",
    title: "Acompanhamento",
    description: "Suporte contínuo e ajustes conforme necessário. Você não estará sozinho.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Silva",
    text: "Finalmente entendi o que estava acontecendo com meu filho. O Dr. Bruno explicou tudo com clareza e paciência, e o tratamento funcionou!",
    emoji: "💛",
  },
  {
    name: "João Santos",
    text: "Consultei vários pediatras antes. Aqui consegui respostas reais e um plano que realmente funciona. A diferença está na escuta atenta.",
    emoji: "⭐",
  },
  {
    name: "Ana Costa",
    text: "A empatia e profissionalismo fizeram toda a diferença. Minha filha melhorou muito. Finalmente encontrei um médico que ouve e explica.",
    emoji: "🌟",
  },
];

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
        className="relative min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-white/70 to-emerald/10" />
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
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border-2 border-blue/15">
                <Sparkles className="w-4 h-4 text-blue" />
                <span className="text-sm font-bold text-foreground/80 font-display">Atendimento Especializado</span>
              </div>
              <h1 className="mb-4">Consultas <span className="text-coral">Especializadas</span></h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Atendimento focado em gastroenterologia pediátrica, com escuta atenta e ciência de verdade
              </p>
            </motion.div>

            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-56 h-64 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src={DOCTOR_IMG} alt="Dr. Bruno Fernandes" className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-golden/40 rounded-full opacity-60 animate-pulse-soft" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-emerald/20 rounded-2xl opacity-50 animate-float-slow" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - O que Esperar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="mb-8">O que <span className="text-coral">Esperar</span></h2>
              <div className="space-y-5">
                {STEPS.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-4 bg-white rounded-2xl p-5 border-2 border-golden/15 hover:border-blue/20 transition-all duration-300 hover:shadow-md group"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx + 1}
                  >
                    <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl rotate-[-3deg] group-hover:rotate-[3deg] transition-transform duration-300`}>
                      {step.emoji}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground mb-1">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Informações Práticas */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={1}
            >
              <h2 className="mb-8">Informações <span className="text-teal">Práticas</span></h2>
              <div className="card-base p-6 md:p-8 space-y-6">
                {/* Quando Procurar */}
                <div>
                  <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue" />
                    Quando Procurar
                  </h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {[
                      "Refluxo persistente ou com sinais de alerta",
                      "Suspeita de alergia alimentar (APLV)",
                      "Constipação ou diarreia crônica",
                      "Dor abdominal recorrente",
                      "Dificuldades na alimentação ou ganho de peso",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-coral mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t-2 border-blue/10 pt-6">
                  <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal" />
                    O que Levar
                  </h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {[
                      "Cartão de vacinação atualizado",
                      "Histórico médico e exames anteriores",
                      "Exames recentes (se houver)",
                      "Diário alimentar dos últimos 3 dias",
                      "Anotações de sintomas observados",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald font-bold mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t-2 border-blue/10 pt-6">
                  <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue" />
                    Duração
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-coral/10 p-4 rounded-2xl text-center">
                      <p className="text-2xl font-display font-bold text-coral">60</p>
                      <p className="text-xs text-muted-foreground mt-1">min — Primeira consulta</p>
                    </div>
                    <div className="bg-emerald/10 p-4 rounded-2xl text-center">
                      <p className="text-2xl font-display font-bold text-teal">30-45</p>
                      <p className="text-xs text-muted-foreground mt-1">min — Acompanhamento</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Resgate da página principal */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="section-spacing relative overflow-hidden bg-teal">
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="white" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="absolute top-16 left-[10%] text-2xl animate-float opacity-15">💛</div>
        <div className="absolute bottom-12 right-[8%] text-xl animate-float-slow opacity-15">⭐</div>

        <div className="container max-w-2xl text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <Heart className="w-10 h-10 text-white/40 mx-auto mb-4 animate-pulse-soft" />
            <h2 className="!text-white mb-4">Pronto para Agendar?</h2>
            <p className="text-lg mb-8 text-white/85 font-display">
              Escolha a forma mais conveniente para você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/553499709226"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !bg-white !text-teal"
              >
                💬 WhatsApp
              </a>
              <Link
                href="/contato"
                className="btn-outline !border-white !text-white hover:!bg-white/10"
              >
                📅 Agenda Online
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
