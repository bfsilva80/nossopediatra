import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Heart, BookOpen } from "lucide-react";
import { Link } from "wouter";
import InstagramGallery from "@/components/InstagramGallery";

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
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    emoji: "🥛",
    title: "Alergia Alimentar",
    description: "APLV, suspeitas de reação alimentar, investigação especializada.",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    emoji: "🧱",
    title: "Intestino Preso ou Fezes Diferentes",
    description: "Constipação, diarreia recorrente, distensão abdominal.",
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

const SYMPTOMS = [
  { name: "Barriga Inchada", emoji: "🫧" },
  { name: "Refluxo", emoji: "🔄" },
  { name: "Intestino Preso", emoji: "🧱" },
  { name: "Fezes Diferentes", emoji: "🔍" },
  { name: "Dor Abdominal", emoji: "😣" },
];

const LIBRARY_ARTICLES = [
  {
    slug: "refluxo-bebe",
    title: "Refluxo em Bebê",
    description: "Quando é normal, quando é problema e como manejar",
    emoji: "🍼",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    slug: "aplv-guia-completo",
    title: "APLV",
    description: "Alergia à Proteína do Leite de Vaca: sinais e manejo",
    emoji: "🥛",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    slug: "constipacao-infantil",
    title: "Constipação Infantil",
    description: "Além do laxante: entenda as causas reais",
    emoji: "💪",
    color: "border-emerald/40",
    bgColor: "bg-emerald/10",
  },
];

export default function Home() {
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
      <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center overflow-hidden">
        {/* Watercolor background with reduced opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/70 to-white/80" />

        {/* Floating decorative elements with reduced opacity */}
        <div className="absolute top-20 left-[10%] w-16 h-16 text-4xl animate-float opacity-30 pointer-events-none">🎈</div>
        <div className="absolute top-32 right-[15%] w-12 h-12 text-3xl animate-float-slow opacity-20 pointer-events-none">⭐</div>
        <div className="absolute bottom-40 left-[5%] w-14 h-14 text-3xl animate-float-reverse opacity-15 pointer-events-none">☁️</div>
        <div className="absolute bottom-32 right-[8%] w-10 h-10 text-2xl animate-wiggle opacity-25 pointer-events-none">🩺</div>

        <div className="relative z-10 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border-2 border-blue/15"
              >
                <Sparkles className="w-4 h-4 text-blue" />
                <span className="text-sm font-semibold text-foreground/80 font-display">
                  Gastroenterologia Pediátrica
                </span>
              </motion.div>

              {/* New H1 */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-[3.2rem] font-display font-extrabold leading-[1.2] mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Ajudando a entender e cuidar dos problemas digestivos das <span className="text-coral">crianças</span>
              </motion.h1>

              {/* New Subtitle */}
              <motion.p
                className="text-lg md:text-xl mb-6 text-foreground/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Informações claras, baseadas em ciência, para ajudar pais a compreender melhor o que está acontecendo e tomar decisões com segurança.
              </motion.p>

              {/* Credentials Line */}
              <motion.div
                className="mb-8 pb-6 border-b border-blue/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <p className="text-sm font-semibold text-teal mb-2">Dr. Bruno Fernandes</p>
                <p className="text-xs text-muted-foreground">
                  Gastropediatra – USP Ribeirão Preto<br />
                  CRM 93321 | RQE 63639
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Link href="/consultas" className="btn-primary">
                  Agendar Consulta
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link href="/atlas-sintomas" className="btn-outline">
                  Explorar Sintomas
                </Link>
              </motion.div>

              {/* Microtexto */}
              <motion.p
                className="text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                Atendimento em Uberaba e por telemedicina.
              </motion.p>
            </div>

            {/* Animated Doctor Scenes Carousel */}
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              <div className="relative w-full" style={{ maxWidth: '346px' }}>
                {/* Carousel container */}
                <div className="relative h-96 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  {DOCTOR_SCENES.map((scene, idx) => (
                    <motion.img
                      key={idx}
                      src={scene}
                      alt={`Dr. Bruno - Cena ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentScene === idx ? 1 : 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  ))}
                  {/* Ink drop transition effect disabled - keeping smooth fade only */}
                </div>

                {/* Decorative shapes around the carousel */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-golden/40 rounded-full opacity-60 animate-pulse-soft" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-emerald/20 rounded-2xl opacity-50 animate-float-slow" />
                <div className="absolute top-1/2 -right-6 w-8 h-8 bg-blue/20 rounded-lg opacity-60 animate-wiggle" />

                {/* Scene indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {DOCTOR_SCENES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentScene(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
      <section className="section-spacing bg-cream">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {CONSULTATION_REASONS.map((reason, idx) => (
              <motion.div
                key={idx}
                className={`card-base p-6 border-2 ${reason.color} ${reason.bgColor}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="text-4xl mb-4">{reason.emoji}</div>
                <h3 className="font-display font-bold text-lg mb-3">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </motion.div>
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
            <Link href="/atlas-sintomas" className="btn-primary">
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
      <section className="section-spacing bg-cream">
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
            <Link href="/biblioteca" className="btn-primary">
              Ver Biblioteca Completa
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

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
            <Link href="/consultas" className="btn-primary">
              Agendar Consulta Agora
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
