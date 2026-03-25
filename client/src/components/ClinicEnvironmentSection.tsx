import { motion } from 'framer-motion'
import { Smile, Lightbulb, Users, Stethoscope } from 'lucide-react'

interface EnvironmentFeature {
  icon: React.ReactNode
  title: string
  description: string
}

const FEATURES: EnvironmentFeature[] = [
  {
    icon: <Smile className="w-8 h-8" />,
    title: "Ambiente Kid-Friendly",
    description: "Consultório aconchegante e acolhedor, decorado para deixar as crianças à vontade e sem medo"
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Equipamentos Modernos",
    description: "Tecnologia de ponta para diagnósticos precisos e confortáveis para o seu filho"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Equipe Atenciosa",
    description: "Profissionais treinados e dedicados a proporcionar a melhor experiência para sua família"
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "Consultório Especializado",
    description: "Espaço totalmente equipado para atendimento em gastroenterologia pediátrica"
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

export function ClinicEnvironmentSection() {
  return (
    <section className="section-spacing bg-card">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nosso Consultório
          </h2>
          <p className="text-lg text-foreground/70">
            Um espaço seguro, aconchegante e preparado para o cuidado especializado do seu filho
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex gap-6 p-6 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              variants={itemVariants}
            >
              <div className="text-primary flex-shrink-0 mt-1">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/70">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          className="bg-background rounded-lg p-8 border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Galeria do Consultório
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/20 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-foreground/60 text-sm">Foto {idx} do Consultório</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-foreground/60 mt-6 text-sm">
            Visite nosso consultório pessoalmente ou agende uma telemedicina para conhecer nosso espaço
          </p>
        </motion.div>

        {/* Location Info */}
        <motion.div
          className="mt-12 bg-primary/10 rounded-lg p-8 text-center border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Localização
          </h3>
          <p className="text-foreground/70 mb-4">
            Rua Salvador, 79 - Uberaba, MG
          </p>
          <p className="text-sm text-foreground/60 mb-6">
            Atendimento presencial e por telemedicina
          </p>
          <a href="https://wa.me/5534997099226" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
            Agendar Consulta
          </a>
        </motion.div>
      </div>
    </section>
  )
}
