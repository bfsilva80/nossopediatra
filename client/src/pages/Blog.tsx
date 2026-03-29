import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import { blogArticles, blogCategories } from "@/data/blog";
import { Search } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function BlogPage() {
  useEffect(() => {
    SEOHead({
      title: "Blog | Artigos sobre Saude Digestiva Infantil",
      description: "Biblioteca educacional com artigos sobre refluxo infantil, constipacao, alergias alimentares e saude digestiva. Conteudo baseado em evidencias cientificas.",
      image: "https://nossopediatra.com.br/logo.png",
      url: "https://nossopediatra.com.br/blog",
      type: "website",
      keywords: [
        "blog pediatria",
        "saude digestiva infantil",
        "refluxo infantil",
        "constipacao em criancas",
        "alergias alimentares",
        "artigos pediatricos",
      ],
    });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="section-spacing bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-blue/10 border border-blue/20 mb-6">
              <span className="text-sm font-medium text-blue">Biblioteca Educacional</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Artigos e Guias
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conteúdo educacional baseado em evidências científicas sobre saúde digestiva infantil, refluxo, constipação e alergias alimentares.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-spacing">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue/50"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === null
                    ? "bg-blue text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Todos
              </button>
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-spacing">
        <div className="container max-w-6xl">
          {filteredArticles.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, index) => (
                <motion.div key={article.id} variants={fadeUp} custom={index}>
                  <BlogCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600">
                Nenhum artigo encontrado. Tente ajustar seus filtros.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-br from-blue/5 via-teal/5 to-emerald/5">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Converse com o Dr. Bruno para um diagnóstico profissional e personalizado.
          </p>
          <a
            href="https://wa.me/5534999999999"
            className="inline-block px-8 py-3 bg-blue text-white rounded-lg font-semibold hover:bg-blue/90 transition-colors"
          >
            Conversar Agora
          </a>
        </div>
      </section>
    </div>
  );
}
