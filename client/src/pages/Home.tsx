import { Link } from "wouter";
import { motion } from "framer-motion";
import { Microscope, Target, Heart, ArrowRight, CheckCircle } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/hero_consultorio-4WcHmd2FZMZP4G9aYDcNQU.webp";
const ATLAS_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/atlas_header-k6BwF2Q8RLyB6Npdd2f76H.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const TRUST_ITEMS = [
  {
    icon: Microscope,
    title: "Medicina que Explica",
    description:
      "Raciocínio clínico transparente, não apenas listas de doenças. Você entenderá o porquê de cada orientação.",
  },
  {
    icon: Target,
    title: "Foco Digestivo",
    description:
      "Especialização em refluxo, APLV, constipação e dor abdominal. Conhecimento profundo, não genérico.",
  },
  {
    icon: Heart,
    title: "Linguagem Humana",
    description:
      "Ciência com acolhimento. Nem acadêmica demais, nem simplista. A medida certa para pais que querem entender.",
  },
];

const SYMPTOMS = [
  "Barriga Inchada",
  "Refluxo",
  "Intestino Preso",
  "Fezes Diferentes",
  "Dor Abdominal",
];

const LIBRARY_ARTICLES = [
  {
    slug: "refluxo-bebe",
    title: "Refluxo em Bebê",
    description: "Quando é normal, quando é problema e como manejar",
    icon: "🔄",
    category: "Refluxo",
  },
  {
    slug: "aplv-guia-completo",
    title: "APLV",
    description: "Alergia à Proteína do Leite de Vaca: sinais e manejo",
    icon: "🥛",
    category: "Alergias",
  },
  {
    slug: "constipacao-infantil",
    title: "Constipação Infantil",
    description: "Além do laxante: entenda as causas reais",
    icon: "💪",
    category: "Constipação",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 container text-center text-white max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm md:text-base uppercase tracking-[0.2em] text-white/80 mb-4 font-sans font-medium">
              Gastroenterologia Pediátrica
            </p>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Saúde Digestiva Infantil
            <br />
            <span className="text-white/90">com Confiança</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 text-white/85 font-sans max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Informações claras, baseadas em ciência, para pais que querem entender e agir
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/atlas-sintomas"
              className="btn-primary !bg-white !text-primary hover:!bg-white/90 !shadow-lg"
            >
              Explorar Atlas de Sintomas
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/contato"
              className="btn-outline !border-white !text-white hover:!bg-white/10"
            >
              Agendar Consulta
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="section-spacing bg-background">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">Por que Nosso Pediatra?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um ecossistema completo de informação confiável sobre gastroenterologia pediátrica
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRUST_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                className="card-base p-8 text-center hover:shadow-lg transition-shadow duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
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

      {/* Atlas Preview */}
      <section className="section-spacing bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={0}
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block font-sans">
                Ferramenta Interativa
              </span>
              <h2 className="mb-6">Atlas de Sintomas</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Pais pesquisam sintomas, não diagnósticos. Nosso atlas organiza informação de forma intuitiva para você entender o que está acontecendo.
              </p>
              <ul className="space-y-3 mb-8">
                {SYMPTOMS.map((symptom, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx * 0.5}
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground font-medium">{symptom}</span>
                  </motion.li>
                ))}
              </ul>
              <Link href="/atlas-sintomas" className="btn-primary">
                Acessar Atlas Completo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={1}
            >
              <div
                className="rounded-2xl overflow-hidden h-80 md:h-[28rem] bg-cover bg-center shadow-xl"
                style={{ backgroundImage: `url('${ATLAS_IMAGE}')` }}
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Library Preview */}
      <section className="section-spacing bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block font-sans">
              Conteúdo Educativo
            </span>
            <h2 className="mb-4">Biblioteca Educativa</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Artigos profundos que geram autoridade e confiança, escritos por quem entende do assunto
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
                  className="card-base p-7 block hover:shadow-lg transition-all duration-300 group h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{article.icon}</span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-sans">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {article.description}
                  </p>
                  <span className="text-primary font-semibold text-sm inline-flex items-center gap-1 font-sans">
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

      {/* CTA Section */}
      <section className="section-spacing bg-primary text-white">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-6 text-white">Pronto para Agendar uma Consulta?</h2>
            <p className="text-xl mb-10 text-white/85 font-sans">
              Consulta a 1 clique de distância. Escolha a forma que funciona melhor para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
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
