import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Send, Sparkles } from "lucide-react";

const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";

const CONTACT_METHODS = [
  {
    emoji: "💬",
    title: "WhatsApp",
    description: "Resposta rápida para dúvidas e agendamento",
    link: "https://wa.me/553499709226",
    linkText: "Enviar Mensagem",
    bgColor: "bg-emerald/10",
    borderColor: "border-emerald/40",
  },
  {
    emoji: "📞",
    title: "Telefone",
    description: "Ligue para o consultório",
    link: "tel:+553499709226",
    linkText: "Ligar Agora",
    bgColor: "bg-blue/10",
    borderColor: "border-blue/40",
  },
];

const FAQ_ITEMS = [
  {
    q: "Qual é o tempo de resposta?",
    a: "Respondemos via WhatsApp em até 2 horas durante horário comercial. Por email, em até 24 horas. Nos finais de semana, o retorno pode ser no próximo dia útil.",
  },
  {
    q: "Como funciona o agendamento?",
    a: "Após entrar em contato via WhatsApp ou formulário, nossa equipe enviará opções de horários disponíveis. Você escolhe o que melhor se encaixa na sua rotina.",
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
    phone: "",
    childAge: "",
    concern: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Obrigado! Entraremos em contato em breve.");
    setFormData({ name: "", phone: "", childAge: "", concern: "" });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section
        className="section-spacing relative overflow-hidden"
        style={{
          backgroundImage: `url('${PATTERN_BG}')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/80" />
        <div className="absolute top-10 right-[10%] text-3xl animate-float opacity-40 pointer-events-none">💌</div>
        <div className="absolute bottom-8 left-[8%] text-2xl animate-float-slow opacity-30 pointer-events-none">☁️</div>

        <div className="container max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue/10 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-4 h-4 text-blue" />
              <span className="text-sm font-bold text-blue font-display">Fale Conosco</span>
            </div>
            <h1 className="mb-4">Entre em <span className="text-coral">Contato</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estamos aqui para ajudar. Escolha a forma que funciona melhor para você.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-spacing bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {CONTACT_METHODS.map((method, idx) => (
              <motion.a
                key={idx}
                href={method.link}
                target={method.link.startsWith("http") ? "_blank" : undefined}
                rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`card-base p-6 text-center hover:shadow-lg transition-all duration-300 group block border-t-4 ${method.borderColor}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
              >
                <div className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl rotate-[-3deg] group-hover:rotate-[3deg] transition-transform duration-300`}>
                  {method.emoji}
                </div>
                <h3 className="text-xl mb-2">{method.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {method.description}
                </p>
                <span className="text-blue font-bold text-sm inline-flex items-center gap-1 font-display group-hover:underline">
                  {method.linkText} →
                </span>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-2xl md:text-3xl mb-8 text-center">
              Formulário de <span className="text-coral">Contato</span>
            </h2>
            <form onSubmit={handleSubmit} className="card-base p-6 md:p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 font-display">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-golden/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue/40 bg-white font-sans text-sm transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 font-display">
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-golden/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue/40 bg-white font-sans text-sm transition-colors"
                  placeholder="(34) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 font-display">
                  Idade da Criança *
                </label>
                <select
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-golden/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue/40 bg-white font-sans text-sm transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="0-3m">0-3 meses</option>
                  <option value="3-6m">3-6 meses</option>
                  <option value="6-12m">6-12 meses</option>
                  <option value="1-2a">1-2 anos</option>
                  <option value="2-5a">2-5 anos</option>
                  <option value="5-12a">5-12 anos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 font-display">
                  Qual é sua Dúvida ou Preocupação? *
                </label>
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-golden/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue/40 bg-white font-sans text-sm transition-colors resize-none"
                  placeholder="Descreva o sintoma ou dúvida que você tem sobre a saúde digestiva do seu filho..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Mensagem
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Responderemos em até 24 horas. Suas informações são tratadas com sigilo.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-white">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="mb-4">Perguntas <span className="text-coral">Frequentes</span></h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white border-2 border-golden/15 rounded-2xl overflow-hidden hover:border-blue/20 transition-colors"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx + 1}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-cream/50 transition-colors"
                >
                  <span className="font-bold text-foreground text-sm md:text-base pr-4 font-display">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue flex-shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
