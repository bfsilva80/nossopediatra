import React from "react";
import { motion, easeInOut } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mãe do Miguel",
    text: "Dia 10/10 meu 3 tesouro nasceu (Hgt) fiquei impactada com sua atenção com cada bebê que estava no quarto o quando o Sr fez questão de ouvir os pais e abençoar seus filhos! Que Deus abençoe sempre.",
    rating: 5,
  },
  {
    id: "2",
    name: "Mãe da Layslla",
    text: "Que Deus o proteja e conserve sempre assim o senhor foi o anjo da vida da minha filha e eu agradeço sempre pela sua vida pois hj Layslla já está com 7 anos mais seus primeiros meses foi o maior desespero e Deus colocou o Senhor no nosso caminho só agradecer e orar pela sua vida e de toda família.",
    rating: 5,
  },
  {
    id: "3",
    name: "Mãe do Marcelino",
    text: "Um profissional extraordinário que exercer a sua profissão com muito amor e carinho vc está de parabéns Dr. Bruno",
    rating: 5,
  },
  {
    id: "4",
    name: "Mãe da Laylla",
    text: "Ora, ora se esse não é o pediatra mais humano que eu conheci, que ama com o olhar cada criança e cada história aqui do Marajó. Que Deus abençoe sempre sua vida e de toda sua família.",
    rating: 5,
  },
  {
    id: "5",
    name: "Mãe do Mariano",
    text: "Parabéns doutor que Deus poça abençoar a sua profição e que o senhor te de muita sabedoria",
    rating: 5,
  },
  {
    id: "6",
    name: "Profissional da Saúde",
    text: "Ser humano digno de elogios e reconhecimento de sua excelente capacidade como profissional e como pessoa.",
    rating: 5,
  },
];

export const HomeTestimonials: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            O que os pais dizem
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Histórias reais de famílias que confiaram no Dr. Bruno para cuidar da saúde digestiva de seus filhos
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-teal/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-4">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <p className="text-slate-900 font-semibold text-sm">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-slate-600 mb-6">
            Pronto para entender melhor a saúde do seu filho?
          </p>
          <a
            href="/diagnostico"
            className="inline-block bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal/90 transition-colors duration-200"
          >
            Começar Avaliação Gratuita
          </a>
        </motion.div>
      </div>
    </section>
  );
};
