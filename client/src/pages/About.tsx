import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Award, Users, BookOpen, Stethoscope, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { firstColumn } from "@/data/testimonials";
import { SEOHead } from "@/components/SEOHead";

const DOCTOR_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/ChatGPTImage30dejun.de2025,21_56_13_d914da2d.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const CARE_VALUES = [
  {
    icon: Heart,
    title: "Humanidade",
    description: "Cada criança é única. Ouço com atenção, compreendo a realidade da sua família e construo soluções juntos.",
  },
  {
    icon: BookOpen,
    title: "Conhecimento Científico",
    description: "Formação contínua, protocolos atualizados e evidências clínicas guiam cada decisão que tomo.",
  },
  {
    icon: Sparkles,
    title: "Clareza",
    description: "Explico tudo de forma simples. Você entenderá o raciocínio clínico e terá segurança para agir.",
  },
];

const SPECIALTIES = [
  {
    emoji: "🍼",
    title: "Refluxo e Vômitos",
    description: "Desde o refluxo fisiológico até DRGE complexa, com orientação prática e medicação quando necessária.",
  },
  {
    emoji: "🥛",
    title: "Alergia Alimentar (APLV)",
    description: "Diagnóstico cuidadoso e orientação nutricional para garantir desenvolvimento saudável.",
  },
  {
    emoji: "💪",
    title: "Constipação",
    description: "Abordagem que combina cuidados em casa, educação e medicação quando indicado.",
  },
  {
    emoji: "💧",
    title: "Diarreia Crônica",
    description: "Investigação das causas e manejo para restabelecer o bem-estar digestivo.",
  },
  {
    emoji: "🤕",
    title: "Dor Abdominal",
    description: "Escuta atenta para entender a origem e oferecer alívio com segurança.",
  },
];

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

const CREDENTIALS = [
  {
    icon: Award,
    title: "Formação Especializada",
    description: "Graduado em Medicina pela UFMS, especializado em Pediatria e Gastroenterologia & Hepatologia Pediátrica pela USP Ribeirão Preto",
  },
  {
    icon: Users,
    title: "Experiência Clínica",
    description: "Mais de 15 anos de experiência em assistência clínica, com expertise em casos de alta complexidade digestiva",
  },
  {
    icon: BookOpen,
    title: "Liderança em Saúde",
    description: "MBA em Gestão de Serviços de Saúde pelo Hospital Israelita Albert Einstein, com atuação como docente convidado",
  },
  {
    icon: Heart,
    title: "Visão Humanizada",
    description: "Abordagem que coloca o paciente e sua família no centro, unindo excelência clínica com acolhimento genuíno",
  },
];

export default function About() {
  useEffect(() => {
    SEOHead({
      title: "Conhecer Dr. Bruno Fernandes | Gastroenterologista Pediátrico",
      description: "Conheça Dr. Bruno Fernandes, especialista em gastroenterologia pediátrica com mais de 15 anos de experiência. Formado pela USP, MBA em Gestão de Saúde, com abordagem humanizada e acolhedora para crianças e famílias.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/ChatGPTImage30dejun.de2025,21_56_13_d914da2d.png",
      url: "https://nossopediatra.com.br/sobre",
      type: "website",
      author: "Dr. Bruno Fernandes",
      keywords: [
        "Dr. Bruno Fernandes",
        "gastroenterologista pediátrico",
        "especialista em pediatria",
        "CRM 93321",
        "RQE 63639",
        "USP Ribeirão Preto",
      ],
    });
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue/5" />

        <div className="relative z-10 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 bg-blue/8 backdrop-blur-md rounded-full px-5 py-2.5 mb-8 border border-blue/20 hover:border-blue/40 transition-colors"
              >
                <Heart className="w-4 h-4 text-blue flex-shrink-0" />
                <span className="text-xs font-semibold tracking-wide text-blue uppercase">
                  Conhecer Dr. Bruno
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Dr. Bruno Fernandes
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl font-semibold mb-6 text-foreground/80 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                <strong>Gastropediatra</strong> com mais de 15 anos de experiência, dedicado a transformar a saúde digestiva de crianças com ciência, humanidade e fé.
              </motion.p>

              {/* Credentials */}
              <motion.div
                className="mb-10 pb-8 border-b border-teal/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <p className="text-sm font-bold text-foreground mb-3 tracking-wide">CREDENCIAIS</p>
                <div className="space-y-2 text-sm text-foreground/70 font-light leading-relaxed">
                  <p>CRM MG 93321 | RQE 63639</p>
                  <p>Especialista em Gastroenterologia e Hepatologia Pediátrica</p>
                  <p>Faculdade de Medicina de Ribeirão Preto – USP</p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Link href="/contato" className="btn-primary text-base font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Conversar Agora
                </Link>
                <Link href="/diagnostico" className="btn-outline text-base font-semibold px-8 py-3 rounded-lg border-2 hover:bg-teal/5 transition-all">
                  Explorar Sintomas
                </Link>
              </motion.div>
            </motion.div>

            {/* Doctor Photo */}
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              <div className="relative w-full" style={{ maxWidth: '450px' }}>
                <div className="relative h-[550px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={DOCTOR_PHOTO}
                    alt="Dr. Bruno Fernandes da Silva"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ COMO EU CUIDO ═══════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">Como <span className="text-coral">Eu Cuido</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Minha abordagem é fundamentada em três pilares que guiam cada consulta
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CARE_VALUES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="card-base p-8 border-2 border-transparent hover:border-teal/20 transition-colors"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={idx + 1}
                >
                  <Icon className="w-10 h-10 text-teal mb-4" />
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ EM QUE SITUAÇÕES POSSO AJUDAR ═══════════ */}
      <section className="py-20 md:py-32">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">Em que Situações <span className="text-teal">Posso Ajudar</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Especialidades que cobro com profundidade e dedicação
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPECIALTIES.map((item, idx) => (
              <motion.div
                key={idx}
                className="card-base p-6 border-2 border-transparent hover:border-coral/20 transition-colors group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMO É A CONSULTA ═══════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Como é a Consulta */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="mb-8">Como é a <span className="text-coral">Consulta</span></h2>
              <div className="space-y-5">
                {STEPS.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-4 bg-white rounded-2xl p-5 border-2 border-golden/15 hover:border-teal/20 transition-all duration-300 hover:shadow-md group"
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
                    <Stethoscope className="w-5 h-5 text-teal" />
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
                        <CheckCircle2 className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t-2 border-teal/10 pt-6">
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
                        <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FORMAÇÃO E TRAJETÓRIA ═══════════ */}
      <section className="py-20 md:py-32">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">Formação e <span className="text-coral">Experiência</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma base sólida construída através de dedicação, aprendizado contínuo e compromisso com a excelência
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CREDENTIALS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="card-base p-8 border-2 border-transparent hover:border-teal/20 transition-colors"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={idx + 1}
                >
                  <Icon className="w-10 h-10 text-teal mb-4" />
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container max-w-6xl">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">O que <span className="text-teal">os Pais Dizem</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de famílias que encontraram respostas e conforto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialsColumn testimonials={firstColumn.slice(0, 3)} />
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <motion.div
            className="card-base p-8 md:p-12 bg-gradient-to-br from-teal/5 via-white to-coral/5 border-2 border-teal/20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-6">Pronto para Entender Melhor?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Cada criança merece compreensão e cada pai merece segurança. Vamos conversar sobre a saúde do seu filho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary text-base font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
                Agendar Consulta
              </Link>
              <Link href="/diagnostico" className="btn-outline text-base font-semibold px-8 py-3 rounded-lg border-2 hover:bg-teal/5 transition-all">
                Explorar Sintomas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
