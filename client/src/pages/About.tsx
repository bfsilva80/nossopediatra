import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Award, Users, BookOpen, Stethoscope, FileText, Clock, Sparkles, CheckCircle } from "lucide-react";
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

const CREDENTIALS_PILLS = [
  "CRM MG 93321",
  "RQE 63639",
  "Especialista em Gastroenterologia Pediátrica",
  "USP Ribeirão Preto",
  "MBA em Gestão de Saúde",
  "Pai de 3 filhos",
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
      {/* ═══════════ HERO SECTION ═══════════ */}
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
              {/* H1 - Título Principal */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[1.2] tracking-tight mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Gastro não é só a barriga.
                <br />
                <span className="text-coral">É imunidade, crescimento, comportamento alimentar.</span>
                <br />
                Escolhi essa especialidade porque ela explica muita coisa.
              </motion.h1>

              {/* Parágrafo de Abertura - Quem Sou */}
              <motion.div
                className="space-y-6 mb-10 pb-10 border-b border-teal/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <p className="text-lg md:text-xl text-foreground/85 leading-relaxed font-light">
                  Me chamo <strong>Bruno Fernandes</strong>. Sou gastropediatra — especialista em tudo o que passa pela barriga de criança: refluxo, alergia alimentar, constipação, dor abdominal, fígado.
                </p>

                <p className="text-lg md:text-xl text-foreground/85 leading-relaxed font-light">
                  Atendo em Uberaba, MG, e por telemedicina. Mas já atendi em lugares onde a distância do hospital mais próximo se mede em horas de barco. Essa experiência me ensinou a ouvir com mais atenção. E a não desperdiçar uma consulta.
                </p>
              </motion.div>

              {/* Seção Formação */}
              <motion.div
                className="space-y-4 mb-10 pb-10 border-b border-teal/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                  <Award className="w-6 h-6 text-coral" />
                  Formação — Âncora de Segurança
                </h3>

                <p className="text-lg text-foreground/85 leading-relaxed font-light">
                  Fiz minha residência em Pediatria e depois a especialização em Gastroenterologia e Hepatologia Pediátrica no <strong>Hospital das Clínicas da Faculdade de Medicina de Ribeirão Preto — a USP</strong>.
                </p>

                <p className="text-lg text-foreground/85 leading-relaxed font-light">
                  Não menciono isso por vaidade. Menciono porque você merece saber que o raciocínio clínico que orienta o cuidado do seu filho foi construído em um dos centros de formação mais rigorosos do Brasil.
                </p>

                <p className="text-lg text-foreground/85 leading-relaxed font-light italic text-coral">
                  Ciência não é enfeite. É o que me permite dizer: <strong>sei o que estou fazendo.</strong>
                </p>
              </motion.div>

              {/* Seção O que me move */}
              <motion.div
                className="space-y-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                  <Heart className="w-6 h-6 text-coral" />
                  O que me move — Humanidade + Fé
                </h3>

                <p className="text-lg text-foreground/85 leading-relaxed font-light">
                  Sou pai de três filhos. Já fui o lado de cá da consulta — o pai preocupado que quer entender, que não quer sair da sala com mais dúvida do que entrou.
                </p>

                <p className="text-lg text-foreground/85 leading-relaxed font-light">
                  Essa experiência mudou a forma como pratico medicina. Cada família que passa pelo meu consultório tem uma história. Ouço com cuidado. Explico com clareza. Acolho com respeito.
                </p>

                <p className="text-lg text-foreground/85 leading-relaxed font-light">
                  Sou também um homem de fé. Isso não interfere no rigor científico — ao contrário, me lembra que por trás de cada diagnóstico existe uma vida. Uma criança com nome. Uma família com esperança.
                </p>

                <p className="text-lg text-foreground/85 leading-relaxed font-light font-semibold">
                  Trabalho para estar à altura dessa confiança todos os dias.
                </p>
              </motion.div>

              {/* Fecho com CTA Implícito */}
              <motion.div
                className="bg-teal/5 border border-teal/20 rounded-xl p-6 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <p className="text-lg text-foreground/85 leading-relaxed font-light">
                  Se você chegou até aqui, é porque está buscando alguém que entenda o que seu filho tem — e que saiba explicar com clareza o que fazer a respeito.
                </p>
                <p className="text-lg text-foreground font-semibold mt-3">
                  É exatamente isso que faço.
                </p>
              </motion.div>

              {/* Credenciais em Pills */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <p className="text-xs font-bold text-foreground/60 tracking-widest uppercase">Credenciais</p>
                <div className="flex flex-wrap gap-2">
                  {CREDENTIALS_PILLS.map((credential, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-2 text-sm font-medium text-teal hover:bg-teal/20 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {credential}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <Link href="/contato" className="btn-primary text-base font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Agendar Consulta
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

      {/* ═══════════ COMO É A CONSULTA ═══════════ */}
      <section className="section-spacing bg-gradient-to-b from-white to-blue/5">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Como é a <span className="text-coral">Consulta</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um processo pensado para entender profundamente o que seu filho vivencia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "📋",
                title: "Avaliação Completa",
                description: "Histórico detalhado, exame físico minucioso e investigação cuidadosa dos sintomas.",
              },
              {
                emoji: "💬",
                title: "Explicação Clara",
                description: "Você entenderá o raciocínio clínico por trás de cada recomendação.",
              },
              {
                emoji: "🎯",
                title: "Plano Personalizado",
                description: "Estratégia adaptada às necessidades do seu filho e à realidade da sua família.",
              },
              {
                emoji: "🤝",
                title: "Acompanhamento",
                description: "Suporte contínuo e ajustes conforme necessário. Você não estará sozinho.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={index}
                className="bg-white rounded-2xl p-8 border border-teal/10 hover:border-teal/30 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{step.emoji}</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section-spacing bg-background">
        <div className="container max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              O que <span className="text-coral">Pais e Colegas</span> Dizem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de famílias que confiaram em nosso cuidado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialsColumn testimonials={firstColumn} />
            <TestimonialsColumn testimonials={secondColumn} />
            <TestimonialsColumn testimonials={thirdColumn} />
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="section-spacing bg-gradient-to-r from-teal/5 to-coral/5">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Pronto para conversar?
            </h2>
            <p className="text-xl text-foreground/75 mb-10 leading-relaxed">
              Se seu filho está enfrentando desafios digestivos, alergias alimentares ou qualquer preocupação relacionada à saúde gastrointestinal, estou aqui para ajudar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary text-base font-semibold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                Agendar Consulta
              </Link>
              <a
                href="https://wa.me/5534997099226?text=Olá%20Dr.%20Bruno%2C%20gostaria%20de%20agendar%20uma%20consulta!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-base font-semibold px-10 py-4 rounded-lg border-2 hover:bg-emerald/5 transition-all"
              >
                Conversar no WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
