import { motion } from 'framer-motion'
import { CheckCircle, Heart, Scale, TrendingUp, Stethoscope, Brain } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

const BENEFITS: Benefit[] = [
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "Exame Completo",
    description: "Avaliação detalhada do coração, pulmões e abdômen do seu filho"
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: "Medições de Crescimento",
    description: "Peso, altura e percentil de crescimento monitorados com precisão"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Acompanhamento do Desenvolvimento",
    description: "Avaliação neurodevelopmental contínua e marcos de desenvolvimento"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Orientação Nutricional",
    description: "Recomendações personalizadas para nutrição e alimentação saudável"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Cuidado Integral",
    description: "Abordagem holística focada na saúde física e emocional"
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Acompanhamento Contínuo",
    description: "Suporte especializado durante todo o crescimento da criança"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ConsultationBenefitsSection() {
  return (
    <section className="section-spacing bg-background">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            O Que Está Incluído em Cada Consulta
          </h2>
          <p className="text-lg text-foreground/70">
            Cuidado completo e especializado para o bem-estar do seu filho
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {BENEFITS.map((benefit, idx) => (
            <motion.div
              key={idx}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4">
                <div className="text-primary flex-shrink-0 mt-1">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/70">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 bg-primary/10 rounded-lg p-8 text-center border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Consulta Especializada em Gastroenterologia Pediátrica
          </h3>
          <p className="text-foreground/70 mb-6">
            Além do exame completo, você recebe orientações personalizadas, 
            diagnóstico preciso e plano de tratamento adaptado às necessidades específicas do seu filho.
          </p>
          <p className="text-sm text-foreground/60 mb-6">
            Disponível em formato presencial em Uberaba e por telemedicina
          </p>
          <a href="https://wa.me/5534997099226" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
            Agendar Consulta
          </a>
        </motion.div>
      </div>
    </section>
  )
}
