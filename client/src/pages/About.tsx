import { motion } from "framer-motion";
import { Heart, Award, Users, BookOpen, Stethoscope, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { instagramTestimonials } from "@/data/instagram-testimonials";
import { SEOHead } from "@/components/SEOHead";
import { useEffect } from "react";

const DOCTOR_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/ChatGPTImage30dejun.de2025,21_56_13_d914da2d.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const CREDENTIALS_BADGES = [
  "CRM MG 93321",
  "RQE 63639",
  "Graduação UFMS",
  "Especialização USP Ribeirão Preto",
  "Gastropediatria",
  "Hepatologia Pediátrica",
  "Consulta em Uberaba",
  "Telemedicina disponível",
];

export default function About() {
  useEffect(() => {
    SEOHead({
      title: "Dr. Bruno Fernandes - Gastropediatra Especializado | Refluxo, Constipacao, Alergias",
      description: "Dr. Bruno Fernandes - Gastropediatra com 15+ anos de experiencia em refluxo infantil, constipacao e alergias alimentares. Formado pela USP, especialista em gastroenterologia pediatrica com abordagem humanizada para criancas e familias.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/ChatGPTImage30dejun.de2025,21_56_13_d914da2d.png",
      url: "https://nossopediatra.com.br/sobre",
      type: "website",
      author: "Dr. Bruno Fernandes",
      keywords: [
        "Dr. Bruno Fernandes",
        "gastropediatra",
        "gastroenterologista pediatrico",
        "especialista refluxo infantil",
        "CRM 93321",
        "RQE 63639",
        "USP Ribeirao Preto",
        "gastropediatria Uberaba",
      ],
    });
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue/5" />

        <div className="relative z-10 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Sou o Dr. Bruno Fernandes.
                <br />
                <span className="text-coral">Gastropediatra.</span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl font-semibold mb-8 text-foreground/80 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Meu trabalho é ajudar famílias a entender, com mais clareza, o que a barriga da criança está tentando contar.
              </motion.p>

              <motion.div
                className="mb-10 pb-8 border-b border-teal/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <p className="text-base text-foreground/80 leading-relaxed mb-6">
                  Atendo em Uberaba, MG, e também por telemedicina. Mas já trabalhei em lugares onde a distância até o hospital mais próximo se media em horas de barco. Essa vivência me ensinou duas coisas: ouvir melhor e não desperdiçar uma consulta.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Link href="/contato" className="btn-primary text-base font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Agendar Consulta
                </Link>
              </motion.div>
            </motion.div>

            {/* Doctor Photo */}
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              <div className="relative w-full" style={{ maxWidth: '450px' }}>
                <div className="relative h-[550px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={DOCTOR_PHOTO}
                    alt="Dr. Bruno Fernandes da Silva"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FORMAÇÃO ═══════════ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="bg-white rounded-lg p-8 md:p-12 border border-teal/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Formação</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Fiz minha residência em Pediatria e, depois, a especialização em Gastroenterologia e Hepatologia Pediátrica no Hospital das Clínicas da Faculdade de Medicina de Ribeirão Preto da USP.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Digo isso porque a família tem o direito de saber de onde vem o raciocínio clínico que orienta o cuidado do seu filho. Ciência, para mim, não é detalhe. É o que sustenta uma escuta mais precisa, uma investigação mais criteriosa e decisões mais seguras.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ O QUE ME MOVE ═══════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="bg-white rounded-lg p-8 md:p-12 border border-teal/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">O que me move</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Sou pai de três filhos. Já estive do lado de cá da consulta: o lado de quem chega preocupado e quer sair entendendo melhor o que está acontecendo.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Isso mudou a forma como pratico medicina. Cada criança tem uma história. Cada família chega com um medo, uma esperança, uma pergunta. Procuro escutar com atenção, explicar com clareza e cuidar com respeito.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Sou também um homem de fé. E talvez por isso eu me lembre todos os dias de que, por trás de cada diagnóstico, existe uma vida inteira pedindo cuidado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FECHO ═══════════ */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-teal/5 via-blue/5 to-emerald/5">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="bg-white rounded-lg p-8 md:p-12 border border-teal/10 text-center"
          >
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
              Se você chegou até aqui, talvez esteja procurando alguém que ajude a entender melhor o que seu filho tem e a escolher com mais clareza o que fazer agora.
            </p>
            <p className="text-lg md:text-xl font-semibold text-foreground mb-8">
              É exatamente esse o meu trabalho.
            </p>

            {/* Credentials Badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {CREDENTIALS_BADGES.map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2 bg-teal/10 text-teal rounded-full text-sm font-medium"
                >
                  {badge}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/contato" className="btn-primary text-base font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all inline-block">
              Agendar Consulta
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">O que algumas famílias levam da consulta</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mais do que respostas prontas, muitas vezes o que muda tudo é finalmente entender o que está acontecendo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialsColumn testimonials={instagramTestimonials.slice(0, 3).map(t => ({ text: t.quote, image: t.image, name: t.name, role: t.role || '' }))} />
            <TestimonialsColumn testimonials={instagramTestimonials.slice(3, 6).map(t => ({ text: t.quote, image: t.image, name: t.name, role: t.role || '' }))} />
          </div>
        </div>
      </section>
    </div>
  );
}
