import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Users } from "lucide-react";
import { Link } from "wouter";

const DOCTOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/dr_bruno_watercolor_a674df2f.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const CREDENTIALS = [
  {
    icon: Award,
    title: "Formação Acadêmica",
    items: [
      "Medicina - Universidade de São Paulo (USP)",
      "Especialização em Pediatria",
      "Especialização em Gastroenterologia Pediátrica",
    ],
  },
  {
    icon: BookOpen,
    title: "Registro Profissional",
    items: [
      "CRM 93321 - Conselho Regional de Medicina",
      "RQE 63639 - Registro de Qualificação de Especialista",
      "Membro da Sociedade Brasileira de Pediatria",
    ],
  },
  {
    icon: Users,
    title: "Experiência",
    items: [
      "Atendimento especializado em gastroenterologia pediátrica",
      "Foco em refluxo, APLV, constipação e dor abdominal",
      "Abordagem baseada em evidências científicas",
    ],
  },
  {
    icon: Heart,
    title: "Filosofia de Atendimento",
    items: [
      "Escuta atenta e acolhedora",
      "Explicações claras e baseadas em ciência",
      "Parceria com as famílias no cuidado",
    ],
  },
];

export default function About() {
  return (
    <div className="w-full overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-b from-blue/5 to-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue/10 rounded-full px-4 py-2 mb-6">
                <span className="text-lg">👨‍⚕️</span>
                <span className="text-sm font-bold text-blue font-display">Sobre o Especialista</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight mb-6">
                Dr. Bruno <span className="text-coral">Fernandes</span>
              </h1>

              <p className="text-lg md:text-xl text-foreground/70 mb-6 leading-relaxed">
                Gastropediatra dedicado a ajudar pais a entender e cuidar dos problemas digestivos das crianças com clareza, ciência e acolhimento.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <p className="font-semibold text-foreground">Formação</p>
                    <p className="text-sm text-muted-foreground">Universidade de São Paulo (USP) - Ribeirão Preto</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-semibold text-foreground">Registro Profissional</p>
                    <p className="text-sm text-muted-foreground">CRM 93321 | RQE 63639</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-foreground">Atendimento</p>
                    <p className="text-sm text-muted-foreground">Uberaba, MG | Telemedicina</p>
                  </div>
                </div>
              </div>

              <Link href="/consultas" className="btn-primary">
                Agendar Consulta
              </Link>
            </motion.div>

            {/* Doctor Image */}
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-72 h-80 xl:w-80 xl:h-[22rem] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={DOCTOR_IMG}
                    alt="Dr. Bruno Fernandes"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-emerald/20 rounded-2xl opacity-50 animate-float-slow" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ CREDENTIALS ═══════════ */}
      <section className="section-spacing bg-cream">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">
              Credenciais e <span className="text-coral">Experiência</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Formação rigorosa e dedicação contínua à especialização em gastroenterologia pediátrica
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CREDENTIALS.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <motion.div
                  key={idx}
                  className="card-base p-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={idx + 1}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue/15 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue" />
                    </div>
                    <h3 className="text-xl font-semibold">{cred.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {cred.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-coral font-bold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ PHILOSOPHY ═══════════ */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <h2 className="mb-8">
              Filosofia de <span className="text-coral">Atendimento</span>
            </h2>

            <div className="space-y-6">
              <motion.div
                className="card-base p-8 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={1}
              >
                <h3 className="text-xl font-semibold mb-3 text-teal">Escuta Atenta</h3>
                <p className="text-muted-foreground">
                  Cada criança é única. Cada família tem sua história. Dedicamos tempo real para entender não apenas os sintomas, mas o contexto, as preocupações e as necessidades específicas.
                </p>
              </motion.div>

              <motion.div
                className="card-base p-8 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={2}
              >
                <h3 className="text-xl font-semibold mb-3 text-coral">Ciência com Clareza</h3>
                <p className="text-muted-foreground">
                  A medicina baseada em evidências não precisa ser complicada. Explicamos o raciocínio clínico de forma acessível, para que você entenda o porquê de cada recomendação.
                </p>
              </motion.div>

              <motion.div
                className="card-base p-8 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={3}
              >
                <h3 className="text-xl font-semibold mb-3 text-emerald">Parceria com Famílias</h3>
                <p className="text-muted-foreground">
                  Você é o expert no seu filho. Nós somos o expert em gastroenterologia pediátrica. Juntos, construímos um plano que funciona para sua realidade.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="section-spacing bg-gradient-to-r from-blue/5 to-emerald/5">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-6">Pronto para uma Consulta?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Agende uma consulta para discussão personalizada sobre a saúde digestiva do seu filho
            </p>
            <Link href="/consultas" className="btn-primary">
              Agendar Agora
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
