import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { blogArticles, blogCategories } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { injectSchema, generateArticleSchema, removeSchema } from "@/lib/seo-schema";
import { SEOHead } from "@/components/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = useMemo(() => {
    return blogArticles.find((a) => a.slug === slug);
  }, [slug]);

  useEffect(() => {
    if (article) {
      // Set SEO meta tags for article
      SEOHead({
        title: article.title,
        description: article.description,
        image: article.image || "https://nossopediatra.com.br/logo.png",
        url: `https://nossopediatra.com.br/blog/${article.slug}`,
        type: "article",
        author: article.author,
        publishedDate: article.date,
        modifiedDate: article.date,
        keywords: article.tags,
      });

      // Inject Article schema
      const schema = generateArticleSchema(
        article.title,
        article.description,
        article.image || "https://nossopediatra.com.br/logo.png",
        article.slug,
        article.date,
        article.date
      );
      injectSchema(schema);
    }
  }, [article]);


  const categoryColor = useMemo(() => {
    if (!article) return "";
    const category = blogCategories.find((c) => c.id === article.category);
    return category?.color || "";
  }, [article]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return blogArticles
      .filter((a) => a.category === article.category && a.id !== article.id)
      .slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Artigo não encontrado
          </h1>
          <Link href="/blog">
            <a className="text-blue hover:text-teal transition-colors">
              ← Voltar para Blog
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Confira este artigo: ${article.title}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "email":
        url = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        alert("Link copiado!");
        return;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Header */}
      <section className="section-spacing bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link href="/blog">
              <a className="inline-flex items-center gap-2 text-blue hover:text-teal transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Voltar para Blog
              </a>
            </Link>

            <div className="mb-6">
              <span className={`inline-block px-3 py-1 bg-gradient-to-r ${categoryColor} text-white text-xs font-semibold rounded-full`}>
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-foreground/70 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min de leitura</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleShare("whatsapp")}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => handleShare("email")}
                className="px-4 py-2 bg-blue hover:bg-blue/90 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="px-4 py-2 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Copiar
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <motion.article
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="prose prose-lg max-w-none"
          >
            <div className="text-foreground/80 leading-relaxed space-y-6">
              {article.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("#")) {
                  const level = paragraph.match(/^#+/)?.[0].length || 1;
                  const text = paragraph.replace(/^#+\s/, "");
                  const className =
                    level === 1
                      ? "text-3xl font-display font-bold text-foreground mt-8 mb-4"
                      : level === 2
                        ? "text-2xl font-display font-bold text-foreground mt-6 mb-3"
                        : "text-xl font-display font-bold text-foreground mt-4 mb-2";
                  return (
                    <div key={idx} className={className}>
                      {text}
                    </div>
                  );
                }

                if (paragraph.startsWith("-") || paragraph.startsWith("•")) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2 ml-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i} className="text-foreground/80">
                          {item.replace(/^[-•]\s/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (paragraph.match(/^\d+\./)) {
                  return (
                    <ol key={idx} className="list-decimal list-inside space-y-2 ml-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i} className="text-foreground/80">
                          {item.replace(/^\d+\.\s/, "")}
                        </li>
                      ))}
                    </ol>
                  );
                }

                return (
                  <p key={idx} className="text-foreground/80">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.article>

          {/* Tags */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 pt-8 border-t border-border"
          >
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-background border border-border rounded-full text-sm text-foreground/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section-spacing bg-cream">
          <div className="container max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="mb-8"
            >
              <h2 className="text-3xl font-display font-bold text-foreground">
                Artigos Relacionados
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {relatedArticles.map((relatedArticle, idx) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${relatedArticle.slug}`}>
                    <a className="block group">
                      <div className="bg-white rounded-lg p-4 border border-border hover:border-foreground/30 transition-colors">
                        <h3 className="font-semibold text-foreground group-hover:text-blue transition-colors mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sm text-foreground/70 line-clamp-2">
                          {relatedArticle.description}
                        </p>
                      </div>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-spacing bg-gradient-to-br from-teal/5 to-blue/5">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Quer saber mais?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Converse com o Dr. Bruno para uma avaliação personalizada e orientações específicas.
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
