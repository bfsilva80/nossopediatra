import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Heart, BookOpen } from "lucide-react";
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
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* Watercolor background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50" />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[10%] w-16 h-16 text-4xl animate-float opacity-60 pointer-events-none">🎈</div>
        <div className="absolute top-32 right-[15%] w-12 h-12 text-3xl animate-float-slow opacity-50 pointer-events-none">⭐</div>
        <div className="absolute bottom-40 left-[5%] w-14 h-14 text-3xl animate-float-reverse opacity-40 pointer-events-none">☁️</div>
        <div className="absolute bottom-32 right-[8%] w-10 h-10 text-2xl animate-wiggle opacity-50 pointer-events-none">🩺</div>

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

              <motion.h1
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-[1.15] mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Saúde Digestiva{" "}
                <span className="text-coral">Infantil</span>
                <br />
                <span className="text-teal">com Confiança</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl mb-8 text-foreground/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Informações claras, baseadas em ciência, para pais que querem entender e agir
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                <Link href="/atlas-sintomas" className="btn-primary">
                  Explorar Atlas de Sintomas
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link href="/contato" className="btn-outline">
                  Agendar Consulta
                </Link>
              </motion.div>
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

      {/* ═══════════ TRUST SECTION ═══════════ */}
      <section className="section-spacing relative bg-cream">
        {/* Wavy top divider */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="white" fillOpacity="0.5" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
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
                Pais pesquisam sintomas, não diagnósticos. Nosso atlas organiza informação de forma intuitiva para você entender o que está acontecendo.
              </p>
              <div className="space-y-3 mb-8">
                {SYMPTOMS.map((symptom, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 bg-white/80 rounded-2xl px-4 py-3 border-2 border-golden/20 hover:border-blue/25 transition-colors"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx * 0.3}
                  >
                    <span className="text-xl">{symptom.emoji}</span>
                    <span className="text-foreground font-semibold font-display">{symptom.name}</span>
                  </motion.div>
                ))}
              </div>
              <Link href="/atlas-sintomas" className="btn-primary">
                Acessar Atlas Completo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              className="relative flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={1}
            >
              {/* Decorative card */}
              <div className="relative">
                <div className="w-72 h-80 md:w-80 md:h-[22rem] bg-gradient-to-br from-blue/15 to-golden/20 rounded-[2rem] border-4 border-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center p-6">
                    <div className="text-7xl mb-4 animate-float">🩺</div>
                    <p className="font-display font-bold text-xl text-foreground/80">5 Sintomas</p>
                    <p className="text-muted-foreground text-sm mt-1">Guia completo e interativo</p>
                  </div>
                </div>
                <div className="absolute -top-5 -right-5 w-14 h-14 bg-golden/40 rounded-2xl flex items-center justify-center text-2xl animate-wiggle shadow-md">
                  ✨
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-emerald/20 rounded-full opacity-70 animate-float-slow" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ LIBRARY PREVIEW ═══════════ */}
      <section className="section-spacing bg-cream">
        <div className="container">
          <motion.div
            className="text-center mb-14"
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
              Artigos profundos que geram autoridade e confiança
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LIBRARY_ARTICLES.map((article, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <Link
                  href={`/artigo/${article.slug}`}
                  className={`card-base p-7 block group h-full border-t-4 ${article.color}`}
                >
                  <div className={`w-14 h-14 ${article.bgColor} rounded-2xl flex items-center justify-center text-3xl mb-4 rotate-[-3deg] group-hover:rotate-[3deg] transition-transform duration-300`}>
                    {article.emoji}
                  </div>
                  <h3 className="text-xl mb-2 group-hover:text-blue transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {article.description}
                  </p>
                  <span className="text-blue font-bold text-sm inline-flex items-center gap-1 font-display">
                    Ler artigo
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={4}
          >
            <Link href="/biblioteca" className="btn-outline">
              Ver Todos os Artigos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ GUIA ALIMENTAR DESTAQUE ═══════════ */}
      <section className="section-spacing relative overflow-hidden bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <a
              href="https://guiabebes-xlauyfmx.manus.space"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald/10 via-golden/15 to-blue/10 border-3 border-emerald/20 p-8 md:p-12 hover:shadow-xl transition-all duration-500">
                {/* Floating decorations */}
                <div className="absolute top-4 right-6 text-3xl animate-float opacity-60">🥑</div>
                <div className="absolute bottom-6 right-16 text-2xl animate-float-slow opacity-50">🍌</div>
                <div className="absolute top-1/2 right-8 text-xl animate-wiggle opacity-40">🍎</div>

                <div className="max-w-xl relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/60 rounded-full px-3 py-1 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-emerald" />
                    <span className="text-xs font-bold text-emerald font-display uppercase tracking-wider">Ferramenta Interativa</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl mb-3 group-hover:text-teal transition-colors">
                    E Quando Chega a Hora da 1ª Papinha?
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                    Seu bebê já está pronto? Descubra no nosso guia interativo: o que oferecer primeiro, o que evitar, e os erros que quase todo pai comete sem saber.
                  </p>
                  <span className="btn-secondary inline-flex items-center gap-2">
                    Descobrir Agora
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-emerald/10 rounded-full" />
                <div className="absolute -top-6 right-1/4 w-24 h-24 bg-golden/15 rounded-full" />
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ INSTAGRAM GALLERY ═══════════ */}
      <InstagramGallery />

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="section-spacing relative overflow-hidden bg-teal">
        {/* Wavy top */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="white" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        {/* Floating decorations */}
        <div className="absolute top-20 left-[10%] text-3xl animate-float opacity-20">💛</div>
        <div className="absolute bottom-16 right-[12%] text-2xl animate-float-slow opacity-20">⭐</div>
        <div className="absolute top-1/2 right-[5%] text-xl animate-wiggle opacity-15">☁️</div>

        <div className="container max-w-2xl text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <Heart className="w-10 h-10 text-white/40 mx-auto mb-4 animate-pulse-soft" />
            <h2 className="mb-6 !text-white">Pronto para Agendar uma Consulta?</h2>
            <p className="text-xl mb-10 text-white/85 font-display">
              Consulta a 1 clique de distância. Escolha a forma que funciona melhor para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511999999999"
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
