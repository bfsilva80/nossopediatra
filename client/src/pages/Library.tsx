import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    slug: "refluxo-bebe",
    title: "Refluxo em Bebê: Quando é Normal, Quando é Problema",
    excerpt:
      "Entenda o raciocínio clínico por trás do refluxo infantil, quando é fisiológico e quando merece investigação",
    category: "Refluxo",
    readTime: "8 min",
    icon: "🔄",
  },
  {
    slug: "aplv-guia-completo",
    title: "APLV (Alergia à Proteína do Leite de Vaca): Sinais e Manejo",
    excerpt:
      "Como identificar, diagnosticar e manejar a alergia alimentar mais comum em bebês brasileiros",
    category: "Alergias",
    readTime: "10 min",
    icon: "🥛",
  },
  {
    slug: "constipacao-infantil",
    title: "Constipação Infantil: Além do Laxante",
    excerpt:
      "Entenda as causas reais e estratégias eficazes para resolver constipação em crianças de forma sustentável",
    category: "Constipação",
    readTime: "9 min",
    icon: "💪",
  },
  {
    slug: "introducao-alimentar",
    title: "Introdução Alimentar: Guia Completo para Pais",
    excerpt:
      "Tudo que você precisa saber para começar a introdução alimentar com segurança, confiança e sem neuras",
    category: "Alimentação",
    readTime: "12 min",
    icon: "🥑",
  },
  {
    slug: "coco-crianca",
    title: "Cocô de Criança: Tudo que Você Precisa Saber",
    excerpt:
      "Cores, consistências, frequência: o que é normal e quando procurar o pediatra. Sem tabu, com ciência.",
    category: "Desenvolvimento",
    readTime: "7 min",
    icon: "💩",
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
      <section className="section-spacing bg-card border-b border-border">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block font-sans">
              Conteúdo Educativo
            </span>
            <h1 className="mb-4">Biblioteca Educativa</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Conteúdo profundo e confiável sobre temas que importam para a saúde digestiva do seu filho
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-spacing bg-background">
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
                  className="card-base p-6 md:p-7 block hover:shadow-lg transition-all duration-300 group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{article.icon}</span>
                      <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider font-sans">
                        {article.category}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-sans">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl mb-3 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="text-primary font-semibold text-sm inline-flex items-center gap-1 font-sans">
                    Ler artigo
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-spacing bg-primary text-white">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-4">Receba Novos Artigos por Email</h2>
            <p className="text-lg mb-8 text-white/85 font-sans">
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
                className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white/50 font-sans"
                required
              />
              <button type="submit" className="btn-secondary whitespace-nowrap">
                Inscrever
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
