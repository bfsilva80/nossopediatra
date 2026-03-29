import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, Clock, Tag } from "lucide-react";
import { BlogArticle } from "@/data/blog";

interface BlogCardProps {
  article: BlogArticle;
  index?: number;
}

const categoryColors = {
  refluxo: "from-blue to-teal",
  constipacao: "from-amber to-orange",
  alergias: "from-rose to-pink",
};

export function BlogCard({ article, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/blog/${article.slug}`}>
        <a className="block h-full">
          <div className="h-full bg-white rounded-2xl border border-border overflow-hidden hover:border-foreground/30 transition-colors shadow-sm hover:shadow-md">
            {/* Image Placeholder */}
            <div className={`h-48 bg-gradient-to-br ${categoryColors[article.category]} opacity-10 relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-foreground/20 mb-2">
                    {article.title.charAt(0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category Badge */}
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${categoryColors[article.category]} text-white text-xs font-semibold rounded-full`}>
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-blue transition-colors">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                {article.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-3 mb-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs bg-background px-2 py-1 rounded-full text-foreground/70">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs font-medium text-foreground/60">{article.author}</span>
                <span className="text-xs font-semibold text-blue group-hover:text-teal transition-colors">
                  Ler mais →
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
