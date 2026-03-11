import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Heart, BookOpen } from "lucide-react";
import { Link } from "wouter";
import InstagramGallery from "@/components/InstagramGallery";

/* ── Asset URLs (CDN, lifecycle-tied) ── */
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_hero_bg-L2bcXukaEp8T537j9dHZXM.webp";
const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";
const DOCTOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/dr_bruno_watercolor_a674df2f.png";

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

            {/* Doctor watercolor portrait */}
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              <div className="relative">
                <div className="w-72 h-80 xl:w-80 xl:h-[22rem] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={DOCTOR_IMG}
                    alt="Dr. Bruno Fernandes - Gastropediatra"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative shapes around the image */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-golden/40 rounded-full opacity-60 animate-pulse-soft" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-emerald/20 rounded-2xl opacity-50 animate-float-slow" />
                <div className="absolute top-1/2 -right-6 w-8 h-8 bg-blue/20 rounded-lg opacity-60 animate-wiggle" />
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
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
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
            <Link href="/atlas-sintomas" className="btn-secondary">
              Ver Todos os Sintomas
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TRUST SECTION ═══════════ */}
      <section className="section-spacing relative bg-white">
        {/* Wavy top divider */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="#f6f0e6" fillOpacity="0.5" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <span className="text-sm font-bold text-blue uppercase tracking-wider mb-3 block font-display">
              Por que nos escolher?
            </span>
            <h2 className="mb-4">
              Nosso <span className="text-coral">Pediatra</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um ecossistema completo de informação confiável sobre gastroenterologia pediátrica
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRUST_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                className="card-base p-8 text-center group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl rotate-[-3deg] group-hover:rotate-[3deg] transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ATLAS PREVIEW ═══════════ */}
      <section
        className="section-spacing relative"
        style={{
          backgroundImage: `url('${PATTERN_BG}')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 bg-emerald/10 rounded-full px-4 py-1.5 mb-4">
                <span className="text-lg">🗺️</span>
                <span className="text-sm font-bold text-teal font-display">Ferramenta Interativa</span>
              </div>
              <h2 className="mb-6">Atlas de <span className="text-coral">Sintomas</span></h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Explore os principais sintomas de problemas digestivos em crianças. Cada um tem explicação detalhada sobre o que é, causas comuns, quando procurar emergência e dicas práticas.
              </p>
              <Link href="/atlas-sintomas" className="btn-primary">
                Explorar Atlas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
            >
              {SYMPTOMS.map((symptom, idx) => (
                <button
                  key={idx}
                  className="card-base p-4 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{symptom.emoji}</div>
                  <p className="text-xs font-semibold text-foreground/70 leading-tight">{symptom.name}</p>
                </button>
              ))}
            </motion.div>
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
            <div className="inline-flex items-center gap-2 bg-blue/10 rounded-full px-4 py-1.5 mb-4">
              <BookOpen className="w-4 h-4 text-blue" />
              <span className="text-sm font-bold text-blue font-display">Conteúdo Educativo</span>
            </div>
            <h2 className="mb-4">Biblioteca <span className="text-coral">Educativa</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Artigos profundos e confiáveis sobre os temas que mais importam para a saúde digestiva do seu filho
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {LIBRARY_ARTICLES.map((article, idx) => (
              <Link
                key={idx}
                href={`/artigo/${article.slug}`}
                className={`card-base p-6 border-2 ${article.color} ${article.bgColor} hover:shadow-lg transition-all duration-300 group cursor-pointer`}
              >
                <div className="text-4xl mb-3">{article.emoji}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-coral transition-colors">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{article.description}</p>
                <div className="flex items-center text-sm font-semibold text-blue group-hover:translate-x-1 transition-transform">
                  Ler artigo <ArrowRight className="ml-2 w-4 h-4" />
                </div>
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
            <Link href="/biblioteca" className="btn-secondary">
              Ver Todos os Artigos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ GUIA ALIMENTAR ═══════════ */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <motion.div
            className="card-base p-8 md:p-12 bg-gradient-to-br from-golden/10 to-emerald/10 border-2 border-golden/30 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <div className="text-5xl mb-4">🍌</div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              1ª Papinha? O Guia que Todo Pai Queria Ter Recebido Antes
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Descubra o que oferecer, o que evitar, e os erros mais comuns que ninguém te conta sobre introdução alimentar.
            </p>
            <a
              href="https://guiabebes-xlauyfmx.manus.space"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Acessar Guia Completo
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ INSTAGRAM GALLERY ═══════════ */}
      <InstagramGallery />

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="section-spacing bg-gradient-to-r from-blue/5 to-emerald/5">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-6">Pronto para Começar?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Agende uma consulta para discussão personalizada sobre a saúde digestiva do seu filho
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
