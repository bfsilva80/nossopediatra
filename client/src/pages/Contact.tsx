import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Send, Sparkles, MessageCircle, Phone, Heart } from "lucide-react";

const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";

const FAQ_ITEMS = [
  {
    q: "Qual é o tempo de resposta?",
    a: "Respondemos via WhatsApp em até 2 horas durante horário comercial. Por telefone, atendemos de segunda a sexta das 8h às 18h.",
  },
  {
    q: "Como funciona o agendamento?",
    a: "Após entrar em contato via WhatsApp ou telefone, nossa equipe enviará opções de horários disponíveis. Você escolhe o que melhor se encaixa na sua rotina.",
  },
  {
    q: "Qual é o valor da consulta?",
    a: "Entre em contato para informações atualizadas sobre valores e formas de pagamento. Trabalhamos com particular e alguns convênios.",
  },
  {
    q: "Fazem atendimento online?",
    a: "Sim, oferecemos consultas presenciais e por telemedicina, conforme sua preferência e necessidade clínica. Consultas de acompanhamento são especialmente adequadas para o formato online.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 } as const,
  }),
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    concern: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Olá! Meu nome é ${formData.name}. ${formData.concern}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/553499709226?text=${encodedMessage}`, "_blank");
    setFormData({ name: "", concern: "" });
  };

  return (
    <div className="w-full overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section
        className="relative min-h-[70vh] md:min-h-[75vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url('${PATTERN_BG}')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-white/85" />
        <div className="absolute top-10 right-[10%] text-4xl animate-float opacity-30 pointer-events-none">💬</div>
        <div className="absolute bottom-8 left-[8%] text-3xl animate-float-slow opacity-25 pointer-events-none">📞</div>

        <div className="container max-w-4xl relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-teal/10 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-teal" />
              <span className="text-sm font-bold text-teal font-display">Vamos Conversar</span>
            </div>
            <h1 className="mb-6 text-5xl md:text-6xl">
              Pronto para <span className="text-coral">Agendar?</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Escolha a forma mais rápida e conveniente para você. Estamos aqui para ajudar.
            </p>
          </motion.div>

          {/* ═══════════ DIRECT CONTACT OPTIONS ═══════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/553499709226"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl p-8 md:p-10 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald/30 hover:border-emerald/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <MessageCircle className="w-8 h-8 text-emerald-600" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                  WhatsApp
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Resposta rápida em até 2 horas
                </p>
                
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg group-hover:gap-3 transition-all">
                  <span>Enviar Mensagem</span>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.a>

            {/* Telefone */}
            <motion.a
              href="tel:+553499709226"
              className="group relative overflow-hidden rounded-3xl p-8 md:p-10 bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue/30 hover:border-blue/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                  Telefone
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Ligue direto para o consultório
                </p>
                
                <div className="flex items-center gap-2 text-blue-600 font-bold text-lg group-hover:gap-3 transition-all">
                  <span>(34) 9 9709-9226</span>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.a>
          </div>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-teal/20" />
            <span className="text-muted-foreground font-display font-bold">OU</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-teal/20" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SIMPLIFIED FORM ═══════════ */}
      <section className="section-spacing bg-background">
        <div className="container max-w-2xl">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">
              Deixe uma <span className="text-coral">Mensagem</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Prefere deixar uma mensagem? Preencha o formulário abaixo e enviaremos direto para o WhatsApp.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="card-base p-8 md:p-10 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div>
              <label className="block text-sm font-bold mb-3 font-display">
                Seu Nome *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-teal/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 bg-white font-sans text-base transition-all"
                placeholder="Como você se chama?"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 font-display">
                Sua Dúvida ou Preocupação *
              </label>
              <textarea
                name="concern"
                value={formData.concern}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-teal/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 bg-white font-sans text-base transition-all resize-none"
                placeholder="Descreva o sintoma ou dúvida que você tem sobre a saúde digestiva do seu filho..."
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg font-bold"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar via WhatsApp
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Sua mensagem será enviada direto para o WhatsApp do consultório.
            </p>
          </motion.form>
        </div>
      </section>

      {/* ═══════════ CONSULTATION TYPES ═══════════ */}
      <section className="section-spacing bg-gradient-to-b from-teal/5 to-white">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">
              Como Funciona o <span className="text-coral">Atendimento</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Oferecemos flexibilidade para que você escolha o formato que melhor se encaixa na sua rotina
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Presencial */}
            <motion.div
              className="card-base p-8 border-2 border-teal/20 hover:border-teal/50 transition-all"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-2xl font-display font-bold mb-3">Consulta Presencial</h3>
              <p className="text-muted-foreground mb-4">
                Atendimento no consultório em <strong>Uberaba, MG</strong>
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Avaliação clínica completa</li>
                <li>✓ Exame físico detalhado</li>
                <li>✓ Orientação personalizada</li>
                <li>✓ Prescrição de medicações</li>
              </ul>
            </motion.div>

            {/* Telemedicina */}
            <motion.div
              className="card-base p-8 border-2 border-coral/20 hover:border-coral/50 transition-all"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-display font-bold mb-3">Telemedicina</h3>
              <p className="text-muted-foreground mb-4">
                Consulta online de qualquer lugar
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Consultas de acompanhamento</li>
                <li>✓ Orientação e esclarecimentos</li>
                <li>✓ Seguimento de tratamento</li>
                <li>✓ Comodidade e flexibilidade</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">
              Perguntas <span className="text-coral">Frequentes</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Respostas às dúvidas mais comuns
            </p>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white border-2 border-teal/10 rounded-2xl overflow-hidden hover:border-teal/30 transition-colors"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-teal/5 transition-colors"
                >
                  <span className="font-bold text-foreground text-base md:text-lg pr-4 font-display">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal flex-shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 border-t border-teal/10"
                  >
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="section-spacing relative overflow-hidden bg-teal">
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="white" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="absolute top-16 left-[10%] text-3xl animate-float opacity-15">💬</div>
        <div className="absolute bottom-12 right-[8%] text-2xl animate-float-slow opacity-15">📞</div>

        <div className="container max-w-2xl text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <Heart className="w-12 h-12 text-white/40 mx-auto mb-6 animate-pulse-soft" />
            <h2 className="!text-white mb-6">Estamos Prontos para Ajudar</h2>
            <p className="text-lg mb-10 text-white/90 font-display leading-relaxed">
              Não importa qual seja sua dúvida ou preocupação, estamos aqui para oferecer a melhor orientação para a saúde digestiva do seu filho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/553499709226"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !bg-white !text-teal font-bold text-lg py-4"
              >
                💬 Conversar no WhatsApp
              </a>
              <a
                href="tel:+553499709226"
                className="btn-outline !border-2 !border-white !text-white hover:!bg-white/10 font-bold text-lg py-4"
              >
                📞 Ligar Agora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
