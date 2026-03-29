import { motion } from "framer-motion";
import { Heart, Award, Users, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { firstColumn, secondColumn, thirdColumn } from "@/data/testimonials";

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

export default function About() {
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
                className="mb-10 pb-8 border-b border-blue/10"
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
                <Link href="/diagnostico" className="btn-outline text-base font-semibold px-8 py-3 rounded-lg border-2 hover:bg-blue/5 transition-all">
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
      <section className="section-spacing bg-cream">
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

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section-spacing bg-cream relative overflow-hidden">
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
      <section className="section-spacing bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-6">
              Pronto para conhecer melhor?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende uma consulta e vamos conversar sobre a saúde digestiva do seu filho. Estou aqui para ajudar.
            </p>
            <Link href="/contato" className="btn-primary">
              Conversar Agora
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
