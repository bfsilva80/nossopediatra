import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ExternalLink, BookOpen, Sparkles } from "lucide-react";

const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";

const ARTICLES = [
  {
    slug: "refluxo-bebe",
    title: "Refluxo em Bebê: Quando é Normal, Quando é Problema",
    excerpt: "Entenda o raciocínio clínico por trás do refluxo infantil, quando é fisiológico e quando merece investigação",
    category: "Refluxo",
    readTime: "8 min",
    emoji: "🍼",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    slug: "aplv-guia-completo",
    title: "APLV (Alergia à Proteína do Leite de Vaca): Sinais e Manejo",
    excerpt: "Como identificar, diagnosticar e manejar a alergia alimentar mais comum em bebês brasileiros",
    category: "Alergias",
    readTime: "10 min",
    emoji: "🥛",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    slug: "constipacao-infantil",
    title: "Constipação Infantil: Além do Laxante",
    excerpt: "Entenda as causas reais e estratégias eficazes para resolver constipação em crianças de forma sustentável",
    category: "Constipação",
    readTime: "9 min",
    emoji: "💪",
    color: "border-emerald/40",
    bgColor: "bg-emerald/10",
  },
  {
    slug: "introducao-alimentar",
    title: "Introdução Alimentar: Guia Completo para Pais",
    excerpt: "Tudo que você precisa saber para começar a introdução alimentar com segurança, confiança e sem neuras",
    category: "Alimentação",
    readTime: "12 min",
    emoji: "🥑",
    color: "border-golden/50",
    bgColor: "bg-golden/15",
  },
  {
    slug: "coco-crianca",
    title: "Cocô de Criança: Tudo que Você Precisa Saber",
    excerpt: "Cores, consistências, frequência: o que é normal e quando procurar o pediatra. Sem tabu, com ciência.",
    category: "Desenvolvimento",
    readTime: "7 min",
    emoji: "🔍",
    color: "border-teal/40",
    bgColor: "bg-teal/10",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 } as const,
  }),
};

export default function Library() {
  return (
    <div className="w-full">
      {/* Header */}
      <section
        className="section-spacing relative overflow-hidden"
        style={{
          backgroundImage: `url('${PATTERN_BG}')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/80" />
        <div className="absolute top-10 right-[10%] text-3xl animate-float opacity-40 pointer-events-none">📚</div>
        <div className="absolute bottom-8 left-[8%] text-2xl animate-float-slow opacity-30 pointer-events-none">✨</div>

        <div className="container max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue/10 rounded-full px-4 py-1.5 mb-4">
              <BookOpen className="w-4 h-4 text-blue" />
              <span className="text-sm font-bold text-blue font-display">Conteúdo Educativo</span>
            </div>
            <h1 className="mb-4">Biblioteca <span className="text-coral">Educativa</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Conteúdo profundo e confiável sobre temas que importam para a saúde digestiva do seu filho
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-spacing bg-cream">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {ARTICLES.map((article, idx) => (
              <motion.div
                key={article.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx}
              >
                <Link
                  href={`/artigo/${article.slug}`}
                  className={`card-base p-6 md:p-7 block group h-full border-t-4 ${article.color}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${article.bgColor} rounded-2xl flex items-center justify-center text-2xl rotate-[-3deg] group-hover:rotate-[3deg] transition-transform duration-300`}>
                        {article.emoji}
                      </div>
                      <span className="inline-block px-2.5 py-1 bg-blue/10 text-blue text-xs font-bold rounded-full uppercase tracking-wider font-display">
                        {article.category}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-display">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl mb-3 group-hover:text-blue transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="text-blue font-bold text-sm inline-flex items-center gap-1 font-display">
                    Ler artigo
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guia Alimentar Destaque */}
      <section className="section-spacing bg-white">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="https://guiabebes-xlauyfmx.manus.space"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald/10 via-golden/15 to-blue/10 border-3 border-emerald/20 p-6 md:p-8 hover:shadow-xl transition-all duration-500">
                <div className="absolute top-4 right-6 text-3xl animate-float opacity-50">🥑</div>
                <div className="absolute bottom-4 right-16 text-2xl animate-float-slow opacity-40">🍌</div>

                <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald/15 rounded-2xl flex items-center justify-center text-3xl rotate-[-3deg] group-hover:rotate-[3deg] transition-transform">
                      🥑
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 rounded-full">
                        <Sparkles className="w-3 h-3 text-emerald" />
                        <span className="text-xs font-bold text-emerald font-display uppercase tracking-wider">Guia Interativo</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald" />
                    </div>
                    <h3 className="text-lg md:text-xl mb-2 group-hover:text-teal transition-colors leading-snug">
                      1ª Papinha? O Guia que Todo Pai Queria Ter Recebido Antes
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      O que oferecer, o que evitar, e os erros mais comuns que ninguém te conta.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="btn-secondary text-sm inline-flex items-center gap-1.5">
                      Acessar Guia
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-spacing relative overflow-hidden bg-teal">
        {/* Wavy top */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="white" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="absolute top-16 left-[10%] text-2xl animate-float opacity-15">📬</div>
        <div className="absolute bottom-12 right-[8%] text-xl animate-float-slow opacity-15">💌</div>

        <div className="container max-w-2xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="!text-white mb-4">Receba Novos Artigos por Email</h2>
            <p className="text-lg mb-8 text-white/85 font-display">
              Inscreva-se para receber conteúdo exclusivo e atualizado sobre saúde pediátrica digestiva
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Obrigado! Você será notificado sobre novos artigos.");
              }}
            >
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-5 py-3 rounded-full text-foreground bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white/50 font-sans"
                required
              />
              <button type="submit" className="btn-secondary !bg-white !text-teal whitespace-nowrap">
                Inscrever
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
