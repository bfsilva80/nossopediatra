import React, { useState } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import { blogArticles, blogCategories } from "@/data/blog";
import { Search } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function BlogPage() {
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
            <div className="inline-block mb-4 px-4 py-2 bg-teal/10 rounded-full">
              <span className="text-teal font-semibold text-sm">Biblioteca Educacional</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Artigos e Guias
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Conteúdo educacional baseado em evidências científicas sobre saúde digestiva infantil, 
              refluxo, constipação e alergias alimentares.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-spacing">
        <div className="container max-w-4xl">
          {/* Search Bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-blue transition-colors"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={1}
            className="flex flex-wrap gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-blue to-teal text-white shadow-lg"
                  : "bg-background border border-border text-foreground hover:border-foreground/50"
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
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-background border border-border text-foreground hover:border-foreground/50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, idx) => (
                <BlogCard key={article.id} article={article} index={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-foreground/70 text-lg">
                Nenhum artigo encontrado. Tente ajustar seus filtros.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-br from-teal/5 to-blue/5">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Tem dúvidas específicas?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Converse com o Dr. Bruno para uma avaliação personalizada e orientações específicas para seu filho.
            </p>
            <button className="px-8 py-3 bg-blue hover:bg-blue/90 text-white rounded-lg font-semibold transition-colors">
              Agendar Consulta
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
