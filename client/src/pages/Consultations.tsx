import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  MessageSquare,
  UserCheck,
  HeartHandshake,
  Star,
  ArrowRight,
  Stethoscope,
  FileText,
  Clock,
} from "lucide-react";

const CONSULTATION_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/consultation_hero-6mn9vcHYs2XbweyVPQR6Vx.webp";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Avaliação Completa",
    description:
      "Histórico detalhado, exame físico minucioso e investigação cuidadosa dos sintomas. Cada detalhe importa.",
  },
  {
    icon: MessageSquare,
    title: "Explicação Clara",
    description:
      "Você entenderá o raciocínio clínico por trás de cada recomendação. Medicina que explica, não apenas prescreve.",
  },
  {
    icon: UserCheck,
    title: "Plano Personalizado",
    description:
      "Estratégia de manejo adaptada às necessidades específicas do seu filho e à realidade da sua família.",
  },
  {
    icon: HeartHandshake,
    title: "Acompanhamento",
    description:
      "Suporte contínuo e ajustes conforme necessário. Você não estará sozinho nessa jornada.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Silva",
    text: "Finalmente entendi o que estava acontecendo com meu filho. O Dr. Bruno explicou tudo com clareza e paciência, e o tratamento funcionou! Recomendo de olhos fechados.",
  },
  {
    name: "João Santos",
    text: "Consultei vários pediatras antes. Aqui consegui respostas reais e um plano que realmente funciona. A diferença está na escuta atenta e no conhecimento especializado.",
  },
  {
    name: "Ana Costa",
    text: "A empatia e profissionalismo fizeram toda a diferença. Minha filha melhorou muito e estou muito grata. Finalmente encontrei um médico que ouve e explica.",
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
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${CONSULTATION_BG}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/55" />
        </div>
        <div className="relative z-10 container text-center text-white max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-white/80 mb-3 block font-sans font-medium">
              Atendimento Especializado
            </span>
            <h1 className="mb-4 text-white">Consultas Especializadas</h1>
            <p className="text-lg md:text-xl text-white/85 font-sans">
              Atendimento focado em gastroenterologia pediátrica, com escuta atenta e ciência de verdade
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - O que Esperar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="mb-8">O que Esperar</h2>
              <div className="space-y-6">
                {STEPS.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx + 1}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-foreground mb-1">
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
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={1}
            >
              <h2 className="mb-8">Informações Práticas</h2>
              <div className="card-base p-6 md:p-8 space-y-6">
                {/* Quando Procurar */}
                <div>
                  <h4 className="font-sans font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-primary" />
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
                        <span className="text-primary mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-sans font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
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
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-sans font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Duração
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/5 p-4 rounded-lg text-center">
                      <p className="text-2xl font-display font-bold text-primary">60</p>
                      <p className="text-xs text-muted-foreground mt-1">min — Primeira consulta</p>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-lg text-center">
                      <p className="text-2xl font-display font-bold text-secondary">30-45</p>
                      <p className="text-xs text-muted-foreground mt-1">min — Acompanhamento</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing bg-card border-t border-border">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">O que Pais Dizem</h2>
            <p className="text-muted-foreground text-lg">
              Depoimentos de famílias que confiaram no Nosso Pediatra
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="card-base p-6 md:p-7"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-5 italic leading-relaxed text-sm">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground text-sm font-sans">
                    {testimonial.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-primary text-white">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-white mb-4">Pronto para Agendar?</h2>
            <p className="text-lg mb-8 text-white/85 font-sans">
              Escolha a forma mais conveniente para você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
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
