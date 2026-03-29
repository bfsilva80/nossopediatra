import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems, faqCategories, FAQItem } from "@/data/faq";

export function FAQAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("general");

  const filteredFAQ = faqItems.filter((item) => item.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-3xl mx-auto">

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setExpandedId(null);
              }}
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

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          <AnimatePresence mode="wait">
            {filteredFAQ.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-border rounded-lg overflow-hidden hover:border-foreground/30 transition-colors"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-background hover:bg-background/80 transition-colors text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{item.question}</span>
                  <motion.div
                    animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-foreground/60" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-background/50 border-t border-border text-foreground/80 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>


      </div>
    </section>
  );
}
