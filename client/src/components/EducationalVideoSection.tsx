import { motion } from 'framer-motion'
import { Play, BookOpen, Lightbulb } from 'lucide-react'
import { useState } from 'react'

interface VideoCard {
  id: string
  title: string
  description: string
  duration: string
  category: string
  thumbnail: string
}

const VIDEOS: VideoCard[] = [
  {
    id: '1',
    title: "Entendendo a Saúde Digestiva Infantil",
    description: "Conheça como funciona o sistema digestivo das crianças e por que é importante cuidar desde cedo",
    duration: "8:32",
    category: "Educação",
    thumbnail: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/video_thumb_1-KmL9pX8nQvZjR2tY.webp"
  },
  {
    id: '2',
    title: "Nutrição Adequada para o Desenvolvimento",
    description: "Dicas práticas sobre alimentação saudável e como evitar problemas digestivos comuns",
    duration: "6:15",
    category: "Nutrição",
    thumbnail: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/video_thumb_2-KmL9pX8nQvZjR2tY.webp"
  },
  {
    id: '3',
    title: "Quando Procurar um Gastroenterologista?",
    description: "Sinais de alerta que indicam a necessidade de consulta especializada",
    duration: "5:48",
    category: "Saúde",
    thumbnail: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/video_thumb_3-KmL9pX8nQvZjR2tY.webp"
  }
]

export function EducationalVideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <section className="section-spacing bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Conteúdo Educativo
            </span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Aprenda Sobre Saúde Digestiva Infantil
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Vídeos informativos e dicas práticas para ajudar você a entender melhor a saúde do seu filho
          </p>
        </motion.div>

        {/* Featured Video */}
        {selectedVideo && (
          <motion.div
            className="mb-12 rounded-lg overflow-hidden border border-border bg-card p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center mb-4 border border-primary/20">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-foreground/60">Vídeo: {VIDEOS.find(v => v.id === selectedVideo)?.title}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {VIDEOS.find(v => v.id === selectedVideo)?.title}
              </h3>
              <p className="text-foreground/70 mb-4">
                {VIDEOS.find(v => v.id === selectedVideo)?.description}
              </p>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-sm text-primary hover:text-primary/80 font-semibold"
              >
                ← Voltar à lista
              </button>
            </div>
          </motion.div>
        )}

        {/* Video Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {VIDEOS.map((video, idx) => (
            <motion.button
              key={video.id}
              onClick={() => setSelectedVideo(video.id)}
              className="group text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="relative mb-4 rounded-lg overflow-hidden border border-border bg-card">
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Play className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" />
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {video.category}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-foreground/60 line-clamp-2">
                  {video.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="mt-3 flex items-center gap-2 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4" />
                Assistir agora
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 bg-primary/10 rounded-lg p-8 text-center border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">
              Dúvidas Específicas?
            </h3>
          </div>
          <p className="text-foreground/70 mb-4">
            Agende uma consulta para discutir as preocupações específicas do seu filho com o Dr. Bruno
          </p>
          <a href="https://wa.me/5534997099226" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
            Agendar Consulta
          </a>
        </motion.div>
      </div>
    </section>
  )
}
