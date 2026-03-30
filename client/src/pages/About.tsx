import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Award, Users, BookOpen, Stethoscope, FileText, Clock, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { firstColumn, secondColumn, thirdColumn } from "@/data/testimonials";
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
                Dr. Bruno Fernandes da Silva
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl font-semibold mb-6 text-foreground/80 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Gastropediatra com mais de 15 anos de experiência, dedicado a transformar a saúde digestiva de crianças com ciência, humanidade e fé.
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

      {/* ═══════════ BIOGRAPHY ═══════════ */}
      <section className="section-spacing bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Trajetória de <span className="text-teal">Excelência e Humanidade</span>
            </h2>

            <div className="space-y-6 text-lg text-foreground/75 leading-relaxed">
              <p>
                Sou médico pediatra e gestor de saúde com mais de 15 anos de experiência, unindo a excelência da assistência clínica à visão estratégica da gestão de serviços de saúde. Minha formação começou na Universidade Federal de Mato Grosso do Sul (UFMS), onde me graduei em Medicina com dedicação aos princípios fundamentais da prática médica.
              </p>

              <p>
                Posteriormente, me especializei em Pediatria e, em seguida, em Gastroenterologia e Hepatologia Pediátrica pelo Hospital das Clínicas da Faculdade de Medicina de Ribeirão Preto da USP — uma das maiores referências em medicina do Brasil. Essa trajetória me deu uma base técnica sólida e a capacidade de lidar com casos de alta complexidade, sempre com foco no bem-estar da criança e da família.
              </p>

              <p>
                Ao longo da carreira, percebi que a transformação da saúde vai além do consultório. Por isso, investi em formação em gestão, concluindo o MBA Executivo em Gestão de Serviços de Saúde pelo Instituto de Ensino e Pesquisa do Hospital Israelita Albert Einstein — onde também tive a honra de atuar como docente convidado no curso de pós-graduação em Gestão em Saúde.
              </p>

              <p>
                Como Secretário Municipal de Saúde de Morro Agudo (2019–2021), liderei equipes multidisciplinares, gerenciei recursos públicos e implementei políticas de saúde com foco em resultados para a população. Essa experiência consolidou minha atuação na interseção entre medicina, liderança e gestão pública.
              </p>

              <p>
                Hoje, minha missão é clara: oferecer atendimento de excelência que une conhecimento científico com humanidade genuína. Acredito que cada criança merece ser compreendida em sua totalidade, e cada pai merece ser ouvido com respeito e atenção. É isso que guia meu trabalho todos os dias.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CREDENTIALS ═══════════ */}
      <section className="section-spacing">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">
              Formação e <span className="text-coral">Experiência</span>
            </h2>
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

      {/* ═══════════ CONSULTATION PROCESS ═══════════ */}
      <section className="section-spacing bg-background">
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
                        <span className="text-coral mt-0.5">•</span>
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
                        <span className="text-emerald font-bold mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t-2 border-teal/10 pt-6">
                  <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal" />
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

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">
              O que os <span className="text-coral">Pais Dizem</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de famílias que confiaram em meu atendimento e viram a diferença na saúde de seus filhos
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
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
