import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Heart, BookOpen } from "lucide-react";
import { Link } from "wouter";
import InstagramGallery from "@/components/InstagramGallery";
import FeatureCarousel from "@/components/ui/feature-carousel";
import TypingEffect from "@/components/ui/typing-effect";
import { TestimonialsSection } from "@/components/testimonials-section";
import { injectSchema, generateLocalBusinessSchema } from "@/lib/seo-schema";
import { SEOHead } from "@/components/SEOHead";

/* ── Asset URLs (CDN, lifecycle-tied) ── */
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_hero_bg-L2bcXukaEp8T537j9dHZXM.webp";
const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";
const DOCTOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/dr_bruno_watercolor_a674df2f.png";

// Doctor scene carousel images - 3 pairs with smoke transition effect
// Each pair: real photo → watercolor version
const DOCTOR_SCENES = [
  // Pair 1: Professional Portrait
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/ChatGPTImage30dejun.de2025,21_56_13_d914da2d.png", // Real
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_li4vndli4vndli4v_aa3193cf.png", // Watercolor
  // Pair 2: Consultation with Parents
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_n7x9hkn7x9hkn7x9_7377a486.webp", // Real
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_68rwyj68rwyj68rw_f6f9682d.webp", // Watercolor
  // Pair 3: Presentation/Lecture
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_gwuqr2gwuqr2gwuq_a7bc7850.webp", // Real
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Gemini_Generated_Image_qgkrzpqgkrzpqgkr_ad98dd33.webp", // Watercolor
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const CONSULTATION_REASONS = [
  {
    emoji: "🔄",
    title: "Refluxo e Dor Abdominal",
    description: "Bebês irritados, regurgitação frequente, desconforto após alimentação.",
    slug: "refluxo-infantil",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    emoji: "🥛",
    title: "Alergia Alimentar",
    description: "Suspeitas de reação alimentar e investigação especializada.",
    slug: "alergia-alimentar",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    emoji: "🧱",
    title: "Constipação Intestinal",
    description: "Constipação, fezes diferentes e distensão abdominal.",
    slug: "constipacao-infantil",
    color: "border-emerald/40",
    bgColor: "bg-emerald/10",
  },
];

const TRUST_ITEMS = [
  {
    icon: "🔬",
    color: "bg-emerald/15",
    title: "Medicina que Explica",
    description: "Raciocínio clínico transparente. Você entenderá o porquê de cada orientação.",
  },
  {
    icon: "🎯",
    color: "bg-coral/15",
    title: "Foco Digestivo",
    description: "Especialização em refluxo, APLV, constipação e dor abdominal.",
  },
  {
    icon: "💛",
    color: "bg-golden/20",
    title: "Linguagem Humana",
    description: "Ciência com acolhimento. A medida certa para pais que querem entender.",
  },
];

// Removed: SYMPTOMS array consolidated into CONSULTATION_REASONS

const LIBRARY_ARTICLES = [
  {
    slug: "refluxo-infantil",
    title: "Refluxo em Bebê",
    description: "Entenda quando o refluxo é normal e quando requer tratamento",
    emoji: "🍼",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    slug: "constipacao-infantil",
    title: "Constipação Infantil",
    description: "Muito além do laxante: entenda as causas e o tratamento integrado",
    emoji: "💪",
    color: "border-emerald/40",
    bgColor: "bg-emerald/10",
  },
  {
    slug: "diarreia-cronica",
    title: "Diarreia Crônica",
    description: "Investigação sistemática e manejo adequado",
    emoji: "💧",
    color: "border-teal/40",
    bgColor: "bg-teal/10",
  },
  {
    slug: "alergia-alimentar",
    title: "Alergia Alimentar",
    description: "Identificação segura e manejo da alergia alimentar em crianças",
    emoji: "🥛",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    slug: "intolerancia-lactose",
    title: "Intolerância à Lactose",
    description: "Diagnóstico e estratégias nutricionais personalizadas",
    emoji: "🥛",
    color: "border-golden/40",
    bgColor: "bg-golden/10",
  },
  {
    slug: "doenca-inflamatoria-intestinal",
    title: "Doença Inflamatória Intestinal",
    description: "Reconhecimento precoce e manejo especializado",
    emoji: "⚠️",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    slug: "doenca-celiaca",
    title: "Doença Celíaca",
    description: "Diagnóstico, orientação nutricional e acompanhamento",
    emoji: "🌾",
    color: "border-emerald/40",
    bgColor: "bg-emerald/10",
  },
  {
    slug: "sangue-fezes",
    title: "Sangue nas Fezes",
    description: "Quando investigar e como proceder adequadamente",
    emoji: "🩸",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    slug: "hepatites",
    title: "Hepatites",
    description: "Diagnóstico e manejo de hepatites virais e autoimunes",
    emoji: "🩸",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    slug: "doencas-figado-vias-biliares",
    title: "Doenças do Fígado/Vias Biliares",
    description: "Avaliação e tratamento especializado de hepatopatias",
    emoji: "⚕️",
    color: "border-teal/40",
    bgColor: "bg-teal/10",
  },
  {
    slug: "dificuldade-alimentar",
    title: "Dificuldade Alimentar",
    description: "Orientação nutricional para problemas de alimentação",
    emoji: "🍽️",
    color: "border-golden/40",
    bgColor: "bg-golden/10",
  },
  {
    slug: "esofagite-eosinofílica",
    title: "Esofagite Eosinofílica",
    description: "Diagnóstico e manejo de esofagite eosinofílica",
    emoji: "🔬",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    slug: "pancreatite",
    title: "Pancreatite Aguda/Recorrente/Crônica",
    description: "Manejo especializado de pancreatite em crianças",
    emoji: "⚡",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    slug: "vomito-recorrente",
    title: "Vômito Recorrente",
    description: "Investigação e tratamento de vômitos persistentes",
    emoji: "🤢",
    color: "border-emerald/40",
    bgColor: "bg-emerald/10",
  },
]

export default function Home() {
  useEffect(() => {
    // Set SEO meta tags for home page
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

    // Inject LocalBusiness schema
    const schema = generateLocalBusinessSchema();
    injectSchema(schema);
  }, []);

  const [currentScene, setCurrentScene] = useState(0);

  // Auto-rotate doctor scenes every 3.5 seconds
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
        {/* Clean background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-teal/5" />

        {/* Decorative elements removed for minimalist design */}

        <div className="relative z-10 container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-2 max-w-2xl">
              {/* Sobrancelha - Eyebrow */}
              <motion.p
                className="text-xs md:text-sm font-semibold text-teal/80 tracking-wide uppercase mb-3 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Gastropediatra em Uberaba
              </motion.p>

              {/* H1 - Main Title - Responsive sizing */}
              <motion.h1
                className="text-3xl md:text-5xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight mb-3 md:mb-6 text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Entender o que seu filho tem muda <span className="text-coral">tudo.</span>
              </motion.h1>

              {/* H2 - Subtitle with Clarity - Responsive sizing */}
              <motion.h2
                className="text-sm md:text-lg lg:text-xl font-normal mb-6 md:mb-10 text-foreground/75 leading-relaxed max-w-2xl font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Ajudo você a entender refluxo, constipação, alergias alimentares e outros sintomas digestivos da infância com mais clareza e segurança.
              </motion.h2>

              {/* Credentials Line - Hidden on mobile */}
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

              {/* CTAs - Full width stack on mobile, side-by-side on desktop */}
              <motion.div
                className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Link href="/sobre" className="btn-primary text-sm md:text-base font-semibold px-6 md:px-8 py-4 md:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full md:w-auto text-center" title="Agendar consulta com gastropediatra em Uberaba">
                  Agendar consulta
                  <ArrowRight className="hidden md:inline ml-2 w-5 h-5" />
                </Link>
                <Link href="/diagnostico" className="btn-outline text-sm md:text-base font-semibold px-6 md:px-8 py-4 md:py-3 rounded-lg border-2 hover:bg-teal/5 transition-all w-full md:w-auto text-center" title="Começar a entender os sintomas do seu filho">
                  Por onde começar
                </Link>
              </motion.div>

              {/* Microtexto - Mobile only */}
              <motion.p
                className="text-xs md:text-sm text-foreground/50 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Atendimento em Uberaba e por telemedicina
              </motion.p>
            </div>

            {/* Animated Doctor Scenes Carousel - Reduced height on mobile */}
            <motion.div
              className="flex justify-center lg:col-span-3 mt-4 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              <div className="relative w-full" style={{ maxWidth: '500px' }}>
                {/* Carousel container - Responsive height */}
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
                  {/* Ink drop transition effect disabled - keeping smooth fade only */}
                </div>



                {/* Scene indicators */}
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
                  {/* Ink drop transition effect disabled - keeping smooth fade only */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONSULTATION REASONS ═══════════ */}
      <section className="section-spacing bg-background">
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
              Principais Motivos de <span className="text-coral">Consulta</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Se você observa qualquer um desses sintomas, uma avaliação especializada pode fazer toda a diferença
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={1}
          >
            <FeatureCarousel />
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={2}
          >
            <Link href="/diagnostico" className="btn-primary" title="Ver verificador completo de sintomas digestivos">
              Ver Todos os Sintomas
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TRUST SECTION ═══════════ */}
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
              Por Que <span className="text-teal">Confiar</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma abordagem que coloca você e seu filho no centro da decisão
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRUST_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                className={`card-base p-8 ${item.color} border-2 border-transparent hover:border-teal/20 transition-colors`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ LIBRARY PREVIEW ═══════════ */}
      <section id="conteudo-pais" className="section-spacing bg-background">
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
              Conteúdo para <span className="text-coral">Pais</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Artigos baseados em evidência para você entender melhor
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {LIBRARY_ARTICLES.map((article, idx) => (
              <Link key={idx} href={`/artigo/${article.slug}`}>
                <motion.div
                  className={`card-base p-6 border-2 cursor-pointer ${article.color} ${article.bgColor} hover:shadow-lg transition-shadow`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={idx + 1}
                >
                  <div className="text-4xl mb-4">{article.emoji}</div>
                  <h3 className="font-display font-bold text-lg mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={4}
          >
            <Link href="/blog" className="btn-primary" title="Ver biblioteca completa de artigos sobre saúde digestiva infantil">
              Ver Biblioteca Completa
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <TestimonialsSection />

      {/* ═══════════ INSTAGRAM GALLERY ═══════════ */}
      <InstagramGallery />

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
              Pronto para entender melhor?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende uma consulta e vamos descobrir juntos o que está acontecendo com seu filho.
            </p>
            <Link href="/sobre" className="btn-primary">
              Agendar Consulta Agora
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
