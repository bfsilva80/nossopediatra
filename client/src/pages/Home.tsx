'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Heart, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { TestimonialsSection } from "@/components/testimonials-section";
import { injectSchema, generateLocalBusinessSchema } from "@/lib/seo-schema";
import { SEOHead } from "@/components/SEOHead";

/* ── Asset URLs (CDN, lifecycle-tied) ── */
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_hero_bg-L2bcXukaEp8T537j9dHZXM.webp";
const DOCTOR_SCENES = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/ChatGPTImage30dejun.de2025,21_56_13_d914da2d.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_li4vndli4vndli4v_aa3193cf.png",
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_n7x9hkn7x9hkn7x9_7377a486.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_68rwyj68rwyj68rw_f6f9682d.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_gwuqr2gwuqr2gwuq_a7bc7850.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_qgkrzpqgkrzpqgkr_ad98dd33.webp",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Main symptoms - 3 core issues
const MAIN_SYMPTOMS = [
  {
    emoji: "🍼",
    title: "Refluxo e Vômitos",
    description: "Bebê regurgita frequentemente? Entenda quando é normal e quando requer investigação.",
    slug: "refluxo-bebes",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    emoji: "🥛",
    title: "Alergia Alimentar",
    description: "Suspeita de reação a alimentos? Saiba como investigar com segurança.",
    slug: "alergia-alimentar",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    emoji: "🚽",
    title: "Constipação Intestinal",
    description: "Bebê com dificuldade para evacuar? Conheça as causas e o tratamento.",
    slug: "constipacao-infantil",
    color: "border-emerald/40",
    bgColor: "bg-emerald/10",
  },
];

// Why trust - 3 core values
const WHY_TRUST = [
  {
    icon: "🔬",
    color: "bg-emerald/15",
    title: "Medicina que Explica",
    description: "Você entenderá o raciocínio clínico por trás de cada orientação.",
  },
  {
    icon: "🎯",
    color: "bg-coral/15",
    title: "Foco Especializado",
    description: "Especialização em refluxo, APLV, constipação e dor abdominal infantil.",
  },
  {
    icon: "💛",
    color: "bg-golden/20",
    title: "Linguagem Humana",
    description: "Ciência com acolhimento. A medida certa para pais que querem entender.",
  },
];

// How consultation works - 4 steps
const CONSULTATION_STEPS = [
  {
    number: "1",
    title: "Você Descreve",
    description: "Conte a história dos sintomas do seu filho com detalhes.",
  },
  {
    number: "2",
    title: "Eu Escuto",
    description: "Faço perguntas para entender melhor o contexto clínico.",
  },
  {
    number: "3",
    title: "Nós Organizamos",
    description: "Estruturamos um plano de ação claro e personalizado.",
  },
  {
    number: "4",
    title: "Você Avança",
    description: "Com clareza, você sabe exatamente o próximo passo.",
  },
];

export default function Home() {
  useEffect(() => {
    SEOHead({
      title: "Gastropediatra em Uberaba | Dr. Bruno Fernandes | Nosso Pediatra",
      description: "Consulta com gastropediatra em Uberaba para refluxo, constipação, alergias alimentares e dor abdominal infantil. Atendimento presencial e telemedicina.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/dr_bruno_watercolor_a674df2f.png",
      url: "https://nossopediatra.com.br",
      type: "website",
      keywords: [
        "gastroenterologista pediátrico",
        "refluxo infantil",
        "constipação em crianças",
        "alergias alimentares",
        "pediatra em Uberaba",
        "telemedicina pediátrica",
      ],
    });

    const schema = generateLocalBusinessSchema();
    injectSchema(schema);
  }, []);

  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % DOCTOR_SCENES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen md:min-h-[95vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-teal/5" />

        <div className="relative z-10 container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-2 max-w-2xl">
              <motion.p
                className="text-xs md:text-sm font-semibold text-teal/80 tracking-wide uppercase mb-3 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Gastropediatra em Uberaba
              </motion.p>

              <motion.h1
                className="text-3xl md:text-5xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight mb-3 md:mb-6 text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Entender o que seu filho tem muda <span className="text-coral">tudo.</span>
              </motion.h1>

              <motion.h2
                className="text-sm md:text-lg lg:text-xl font-normal mb-6 md:mb-10 text-foreground/75 leading-relaxed max-w-2xl font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Ajudo você a entender refluxo, constipação, alergias alimentares e outros sintomas digestivos da infância com mais clareza e segurança.
              </motion.h2>

              <motion.div
                className="hidden md:block mb-8 md:mb-12 pb-8 md:pb-10 border-b border-teal/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <p className="text-xs font-medium text-foreground/60 tracking-wide uppercase">
                  Dr. Bruno Fernandes • CRM 93321 • RQE 63639
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Link href="/contato" className="btn-primary text-sm md:text-base font-semibold px-6 md:px-8 py-4 md:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full md:w-auto text-center" title="Agendar consulta com gastropediatra em Uberaba">
                  Agendar Consulta
                  <ArrowRight className="hidden md:inline ml-2 w-5 h-5" />
                </Link>
                <Link href="/diagnostico" className="btn-outline text-sm md:text-base font-semibold px-6 md:px-8 py-4 md:py-3 rounded-lg border-2 hover:bg-teal/5 transition-all w-full md:w-auto text-center" title="Começar a entender os sintomas do seu filho">
                  Entender Sintomas
                  <ArrowRight className="hidden md:inline ml-2 w-5 h-5" />
                </Link>
              </motion.div>

              <motion.p
                className="text-xs md:text-sm text-foreground/50 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Atendimento em Uberaba e por telemedicina
              </motion.p>
            </div>

            {/* Doctor Carousel */}
            <motion.div
              className="flex justify-center lg:col-span-3 mt-4 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              <div className="relative w-full" style={{ maxWidth: '500px' }}>
                <div className="relative h-[280px] md:h-[400px] lg:h-[600px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  {DOCTOR_SCENES.map((scene, idx) => (
                    <motion.img
                      key={idx}
                      src={scene}
                      alt={`Dr. Bruno - Cena ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentScene === idx ? 1 : 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  ))}
                </div>

                <div className="flex justify-center gap-2 mt-3 md:mt-6">
                  {DOCTOR_SCENES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentScene(idx)}
                      className={`hidden md:block w-2 h-2 rounded-full transition-all duration-300 ${
                        currentScene === idx ? "bg-teal w-6" : "bg-teal/30 hover:bg-teal/50"
                      }`}
                      aria-label={`Ir para cena ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ PRINCIPAIS SINTOMAS ═══════════ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">Principais Sintomas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Os três problemas digestivos mais comuns que atendo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MAIN_SYMPTOMS.map((symptom, idx) => (
              <Link key={idx} href={`/artigo/${symptom.slug}`}>
                <motion.div
                  className={`card-base p-6 border-2 cursor-pointer ${symptom.color} ${symptom.bgColor} hover:shadow-lg transition-shadow h-full`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={idx + 1}
                >
                  <div className="text-4xl mb-4">{symptom.emoji}</div>
                  <h3 className="font-display font-bold text-lg mb-3">{symptom.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{symptom.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMO POSSO AJUDAR ═══════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">Como Posso Ajudar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Minha abordagem em três pilares
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_TRUST.map((item, idx) => (
              <motion.div
                key={idx}
                className={`card-base p-6 ${item.color}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMO FUNCIONA A CONSULTA ═══════════ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">Como Funciona a Consulta</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e claro em 4 passos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {CONSULTATION_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                className="card-base p-6 text-center relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="text-4xl font-bold text-teal/30 mb-4">{step.number}</div>
                <h3 className="font-display font-bold text-base mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                
                {idx < CONSULTATION_STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-teal/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <TestimonialsSection />

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
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
              Pronto para entender melhor?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende uma consulta e vamos descobrir juntos o que está acontecendo com seu filho.
            </p>
            <Link href="/contato" className="btn-primary">
              Agendar Consulta
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
