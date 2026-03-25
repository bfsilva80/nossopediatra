import { motion } from 'framer-motion'
import { Award, BookOpen, Stethoscope, ArrowRight } from 'lucide-react'
import { Link } from 'wouter'

interface CredentialItem {
  icon: React.ReactNode
  label: string
  value: string
}

const CREDENTIALS: CredentialItem[] = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Formação",
    value: "Medicina (UFMS 2006)"
  },
  {
    icon: <Stethoscope className="w-5 h-5" />,
    label: "Especialidade",
    value: "Pediatria com Gastroenterologia e Hepatologia"
  },
  {
    icon: <Award className="w-5 h-5" />,
    label: "Experiência",
    value: "14 anos de prática clínica"
  }
]

export function QualificationsSection() {
  return (
    <section className="section-spacing bg-background">
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle Header */}
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Credenciais Profissionais
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Formação e Experiência Especializada
            </h2>
          </div>

          {/* Credentials Grid - Minimal and Clean */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {CREDENTIALS.map((cred, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-lg border border-border/50 bg-card/50 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="text-primary mb-3">
                  {cred.icon}
                </div>
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">
                  {cred.label}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {cred.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CRM and RQE - Minimal Display */}
          <motion.div
            className="text-center text-xs text-foreground/50 mb-8 space-y-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p>CRM MG 93321 | RQE 63639</p>
            <p>Membro da Sociedade Brasileira de Pediatria</p>
          </motion.div>

          {/* CTA to Full Profile */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/sobre-dr-bruno" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm"
            >
              Ver formação completa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
