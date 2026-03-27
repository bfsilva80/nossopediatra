import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/diagnostico", label: "O que a Barriguinha Está Dizendo?" },
  { href: "/sobre", label: "Sobre o Dr. Bruno" },
  { href: "/consultas", label: "Consultas" },
];

const GUIA_ALIMENTAR_URL = "https://guiabebes-xlauyfmx.manus.space";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b-2 border-blue/15"
          : "bg-white/70 backdrop-blur-sm border-b-2 border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-[4.5rem]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:scale-105 transition-transform duration-300"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-teal to-blue rounded-2xl flex items-center justify-center shadow-md rotate-[-3deg] hover:rotate-0 transition-transform">
            <span className="text-white font-bold text-sm font-display">NP</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-lg text-foreground leading-none block">
              Nosso Pediatra
            </span>
            <span className="text-[10px] text-muted-foreground font-sans tracking-wider uppercase">
              Gastropediatria
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold font-display px-4 py-2 rounded-full transition-all duration-300 ${
                location === link.href
                  ? "text-blue bg-blue/10"
                  : "text-foreground/70 hover:text-foreground hover:bg-golden/20"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={GUIA_ALIMENTAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold font-display px-4 py-2 rounded-full text-emerald hover:bg-emerald/10 transition-all duration-300 inline-flex items-center gap-1.5"
          >
            1ª Papinha?
            <ExternalLink className="w-3 h-3" />
          </a>
          <Link
            href="/contato"
            className="btn-primary text-sm !py-2 !px-6 ml-2"
          >
            Agendar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 hover:bg-golden/20 rounded-xl transition-colors"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden border-t-2 border-blue/10 bg-white overflow-hidden"
          >
            <div className="container py-4 space-y-1">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-3 px-4 rounded-2xl text-sm font-semibold font-display transition-all ${
                      location === link.href
                        ? "text-blue bg-blue/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-golden/15"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <a
                  href={GUIA_ALIMENTAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl text-sm font-semibold font-display text-emerald hover:bg-emerald/10 transition-all flex items-center gap-1.5"
                >
                  1ª Papinha?
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
              <motion.div
                className="pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/contato" className="btn-primary w-full text-center text-sm block">
                  Agendar Consulta
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
