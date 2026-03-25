import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Award, BookOpen, Stethoscope, Users } from 'lucide-react'

interface QualificationItem {
  id: string
  title: string
  items: string[]
  icon: React.ReactNode
}

const QUALIFICATIONS: QualificationItem[] = [
  {
    id: 'medical-school',
    title: 'Formação Médica',
    icon: <BookOpen className="w-6 h-6" />,
    items: [
      'Graduação em Medicina - Universidade Federal do Mato Grosso do Sul (UFMS)',
      'Registro Profissional: CRM MG 93321',
      'Pediatra Especialista em Gastroenterologia e Hepatologia Pediátrica'
    ]
  },
  {
    id: 'residency',
    title: 'Residência Médica',
    icon: <Stethoscope className="w-6 h-6" />,
    items: [
      'Residência em Pediatria - Hospital de Clínicas da UFTM',
      'Subespecialização em Gastroenterologia Pediátrica',
      'Experiência clínica de mais de 15 anos'
    ]
  },
  {
    id: 'certifications',
    title: 'Certificações e Credenciais',
    icon: <Award className="w-6 h-6" />,
    items: [
      'Registro de Especialista: RQE 63639',
      'Membro da Sociedade Brasileira de Pediatria (SBP)',
      'Membro da Sociedade Brasileira de Gastroenterologia Pediátrica',
      'Certificação em Suporte Avançado de Vida Pediátrica (PALS)',
      'Certificação em Reanimação Neonatal'
    ]
  },
  {
    id: 'training',
    title: 'Treinamento Avançado',
    icon: <Users className="w-6 h-6" />,
    items: [
      'Treinamento em Endoscopia Digestiva Pediátrica',
      'Especialização em Nutrição Infantil e Alergias Alimentares',
      'Formação em Distúrbios do Sono Pediátrico',
      'Participação em congressos nacionais e internacionais',
      'Atualização contínua em gastroenterologia pediátrica'
    ]
  }
]

export function QualificationsSection() {
  const [expanded, setExpanded] = useState<string | null>('medical-school')

  return (
    <section className="section-spacing bg-card">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Qualificações e Experiência
          </h2>
          <p className="text-lg text-foreground/70">
            Formação especializada e experiência clínica para cuidar da saúde do seu filho
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {QUALIFICATIONS.map((qual) => (
            <motion.div
              key={qual.id}
              className="border border-border rounded-lg overflow-hidden"
              initial={false}
            >
              <button
                onClick={() => setExpanded(expanded === qual.id ? null : qual.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-primary">{qual.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground text-left">
                    {qual.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: expanded === qual.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-primary" size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {expanded === qual.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="px-6 py-4 bg-background/30 space-y-3">
                      {qual.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <p className="text-foreground/80">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Credentials Display */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-background rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <p className="text-foreground/70">Anos de Experiência</p>
          </div>
          <div className="bg-background rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-foreground/70">Famílias Atendidas</p>
          </div>
          <div className="bg-background rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">CRM 93321</div>
            <p className="text-foreground/70">RQE 63639</p>
          </div>
        </div>
      </div>
    </section>
  )
}
