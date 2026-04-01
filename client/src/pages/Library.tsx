import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ExternalLink, BookOpen, Sparkles, Search, Filter, Phone, MessageCircle } from "lucide-react";

const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_pattern_bg-34yacUnjfmHmqkqTqfFYVg.webp";

interface Condition {
  id: string;
  name: string;
  category: string;
  emoji: string;
  description: string;
  slug: string;
}

const CONDITIONS: Condition[] = [
  {
    id: '1',
    name: 'Refluxo Gastroesofágico',
    category: 'Digestivo',
    emoji: '🔄',
    description: 'Regurgitação frequente e desconforto após alimentação',
    slug: 'refluxo-infantil',
  },
  {
    id: '2',
    name: 'Alergia Alimentar (APLV)',
    category: 'Digestivo',
    emoji: '🥛',
    description: 'Reação alérgica a proteínas do leite de vaca',
    slug: 'alergia-alimentar',
  },
  {
    id: '3',
    name: 'Constipação Intestinal',
    category: 'Digestivo',
    emoji: '💩',
    description: 'Dificuldade para evacuar ou evacuações infrequentes',
    slug: 'constipacao-infantil',
  },
  {
    id: '4',
    name: 'Diarreia Crônica',
    category: 'Digestivo',
    emoji: '🌊',
    description: 'Evacuações frequentes e líquidas por mais de 2 semanas',
    slug: 'diarreia-cronica',
  },
  {
    id: '5',
    name: 'Intolerância à Lactose',
    category: 'Digestivo',
    emoji: '🥤',
    description: 'Dificuldade para digerir lactose presente no leite',
    slug: 'intolerancia-lactose',
  },
  {
    id: '6',
    name: 'Doença Inflamatória Intestinal',
    category: 'Digestivo',
    emoji: '🔥',
    description: 'Inflamação crônica do trato digestivo',
    slug: 'doenca-inflamatoria-intestinal',
  },
  {
    id: '7',
    name: 'Doença Celíaca',
    category: 'Digestivo',
    emoji: '🌾',
    description: 'Intolerância ao glúten com danos ao intestino',
    slug: 'doenca-celiaca',
  },
  {
    id: '8',
    name: 'Sangue nas Fezes',
    category: 'Digestivo',
    emoji: '⚠️',
    description: 'Presença de sangue nas evacuações',
    slug: 'sangue-fezes',
  },
];

const CATEGORIES = [
  { name: 'Digestivo', emoji: '🍽️', color: 'bg-amber-50' },
  { name: 'Respiratório', emoji: '💨', color: 'bg-blue-50' },
  { name: 'Pele', emoji: '🩹', color: 'bg-pink-50' },
  { name: 'Ouvido e Garganta', emoji: '👂', color: 'bg-purple-50' },
  { name: 'Olhos', emoji: '👁️', color: 'bg-green-50' },
  { name: 'Neurológico', emoji: '🧠', color: 'bg-indigo-50' },
];

const QUICK_SEARCHES = [
  'Refluxo em bebê',
  'Alergia alimentar',
  'Constipação infantil',
  'Diarreia',
  'Sangue nas fezes',
];

const ARTICLES = [
  {
    slug: "refluxo-bebe",
    title: "Refluxo em Bebê: Quando é Normal, Quando é Problema",
    excerpt: "Entenda o raciocínio clínico por trás do refluxo infantil, quando é fisiológico e quando merece investigação",
    category: "Refluxo",
    readTime: "8 min",
    emoji: "🍼",
    color: "border-coral/40",
    bgColor: "bg-coral/10",
  },
  {
    slug: "aplv-guia-completo",
    title: "APLV (Alergia à Proteína do Leite de Vaca): Sinais e Manejo",
    excerpt: "Como identificar, diagnosticar e manejar a alergia alimentar mais comum em bebês brasileiros",
    category: "Alergias",
    readTime: "10 min",
    emoji: "🥛",
    color: "border-blue/40",
    bgColor: "bg-blue/10",
  },
  {
    slug: "constipacao-infantil",
    title: "Constipação Infantil: Além do Laxante",
    excerpt: "Entenda as causas reais e estratégias eficazes para resolver constipação em crianças de forma sustentável",
    category: "Constipação",
    readTime: "9 min",
    emoji: "💪",
    color: "border-emerald/40",
    bgColor: "bg-emerald/10",
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

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredConditions = useMemo(() => {
    return CONDITIONS.filter((condition) => {
      const matchesSearch =
        condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        condition.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || condition.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  return (
    <div className="w-full">
      {/* Hero Section with Search */}
      <section
        className="section-spacing relative overflow-hidden"
        style={{
          backgroundImage: `url('${PATTERN_BG}')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/80" />
        <div className="absolute top-10 right-[10%] text-3xl animate-float opacity-40 pointer-events-none">📚</div>
        <div className="absolute bottom-8 left-[8%] text-2xl animate-float-slow opacity-30 pointer-events-none">✨</div>

        <div className="container max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary font-display">Biblioteca de Condições</span>
            </div>
            <h1 className="mb-4">Entenda o que está <span className="text-accent">acontecendo</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Explore as principais condições pediátricas com explicações claras, sem jargão técnico. 
              Cada condição é explicada como o Dr. Bruno faria com você.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <input
                type="text"
                placeholder="Digite um sintoma, condição ou pergunta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-primary/20 bg-white text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_SEARCHES.map((query) => (
                <button
                  key={query}
                  onClick={() => handleQuickSearch(query)}
                  className="px-3 py-1.5 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium"
                >
                  {query}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
              <Link href="/contato">
                <a className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                  <Phone className="w-5 h-5" />
                  Agendar Consulta
                </a>
              </Link>
              <a
                href="https://wa.me/5534997099226"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-12 md:py-16 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">
            Categorias de Condições
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.name}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.name ? null : category.name
                  )
                }
                className={`p-4 rounded-lg text-center transition-all ${
                  selectedCategory === category.name
                    ? `${category.color} ring-2 ring-primary`
                    : `${category.color} hover:ring-2 hover:ring-primary/50`
                }`}
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <p className="text-sm font-semibold text-foreground">{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions List Section */}
      <section className="px-4 py-12 md:py-16 bg-foreground/5">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {selectedCategory ? `${selectedCategory}` : 'Todas as Condições'}
            </h2>
            <span className="text-sm font-semibold text-primary">
              {filteredConditions.length} resultado{filteredConditions.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredConditions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConditions.map((condition) => (
                <Link key={condition.id} href={`/artigo/${condition.slug}`}>
                  <a className="block p-6 rounded-lg bg-white border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all group">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{condition.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {condition.name}
                        </h3>
                        <p className="text-sm text-foreground/60 mt-1">{condition.description}</p>
                        <span className="inline-block mt-3 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {condition.category}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60 mb-4">Nenhuma condição encontrada.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="text-primary hover:text-primary/80 font-semibold"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section-spacing bg-cream">
        <div className="container max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">
            Artigos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ARTICLES.map((article, idx) => (
              <motion.div
                key={article.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={idx}
              >
                <Link
                  href={`/artigo/${article.slug}`}
                  className={`card-base p-6 md:p-7 block group h-full border-t-4 ${article.color}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${article.bgColor} rounded-2xl flex items-center justify-center text-2xl rotate-[-3deg] group-hover:rotate-[3deg] transition-transform duration-300`}>
                        {article.emoji}
                      </div>
                      <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider font-display">
                        {article.category}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-display">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl mb-3 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="text-primary font-bold text-sm inline-flex items-center gap-1 font-display">
                    Ler artigo
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-12 md:py-16 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Confiança Baseada em Expertise
            </h2>
            <p className="text-foreground/75 mb-8">
              Todas as condições nesta biblioteca foram revisadas e validadas pelo Dr. Bruno Fernandes, 
              gastroenterologista pediátrico com mais de 15 anos de experiência clínica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">8+</p>
                <p className="text-sm text-foreground/60">Condições Revisadas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-foreground/60">Anos de Experiência</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-foreground/60">Famílias Atendidas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing relative overflow-hidden bg-teal">
        {/* Wavy top */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path fill="white" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="absolute top-16 left-[10%] text-2xl animate-float opacity-15">📬</div>
        <div className="absolute bottom-12 right-[8%] text-xl animate-float-slow opacity-15">💌</div>

        <div className="container max-w-2xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="!text-white mb-4">Pronto para conversar com o Dr. Bruno?</h2>
            <p className="text-lg mb-8 text-white/85 font-display">
              Agende uma consulta e esclareça todas as suas dúvidas sobre a saúde digestiva do seu filho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5534997099226"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="tel:+5534997099226"
                className="flex items-center justify-center gap-2 bg-white text-teal px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Ligar Agora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
