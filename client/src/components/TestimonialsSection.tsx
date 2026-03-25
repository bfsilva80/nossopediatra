import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
  image: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Mariana Silva",
    text: "O Dr. Bruno é excelente! Meu filho tinha refluxo e a orientação dele foi muito clara e eficaz. Recomendo para todos os pais de Uberaba.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana"
  },
  {
    id: 2,
    name: "Carlos Mendes",
    text: "Profissional muito atencioso e preparado. Minha filha se sente totalmente à vontade nas consultas. Confiamos plenamente no Dr. Bruno.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
  },
  {
    id: 3,
    name: "Ana Costa",
    text: "Consultório acolhedor e o Dr. Bruno explica tudo com paciência. Resolveu o problema de alergia alimentar do meu filho rapidamente.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
  },
  {
    id: 4,
    name: "Roberto Ferreira",
    text: "Melhor pediatra que já conhecemos! Atencioso, competente e genuinamente preocupado com o bem-estar das crianças.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto"
  },
  {
    id: 5,
    name: "Juliana Oliveira",
    text: "O Dr. Bruno não apenas trata, mas educa os pais sobre a saúde dos filhos. Muito obrigada pela dedicação e profissionalismo.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana"
  },
  {
    id: 6,
    name: "Felipe Gomes",
    text: "Consultório moderno, equipe atenciosa e o Dr. Bruno é simplesmente excepcional. Recomendamos para todas as famílias!",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felipe"
  },
  {
    id: 7,
    name: "Patricia Ribeiro",
    text: "Meu filho tinha constipação crônica e o Dr. Bruno resolveu com orientações nutricionais e acompanhamento. Muito grato!",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia"
  },
  {
    id: 8,
    name: "Lucas Alves",
    text: "Profissional de excelência! Consultório aconchegante para as crianças. O Dr. Bruno é referência em pediatria em Uberaba.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas"
  }
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
    setAutoplay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    setAutoplay(false)
  }

  const testimonial = TESTIMONIALS[current]

  return (
    <section className="section-spacing bg-background">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            O que Pais Confiam Sobre Nós
          </h2>
          <p className="text-lg text-foreground/70">
            Confiado por mais de 500 famílias em Uberaba
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg text-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-foreground/60">Cliente verificado</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="text-primary" size={24} />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrent(i)
                    setAutoplay(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-primary w-8' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="text-primary" size={24} />
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/70">
              ⭐ Confiado por mais de 500 famílias • Mais de 1000 consultas realizadas
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
