import { Link } from "wouter";
import { Mail, MapPin, Phone, MessageCircle, Instagram, Facebook, Linkedin } from "lucide-react";
import { LocationMap } from "./LocationMap";

const MOUNTAINS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_mountains_footer-d9sbJ8crkY33j276wNkwsN.webp";

export default function Footer() {


  const currentYear = new Date().getFullYear();
  const whatsappNumber = "553499709-9226";
  const phoneNumber = "(34) 9 9709-9226";
  const email = "nossopediatra@gmail.com";
  const address = "Uberaba, MG";
  const coordinates = "-19.7597° S, 47.9203° W";

  return (
    <footer className="relative bg-gradient-to-b from-white to-blue-50/30">
      {/* Watercolor mountains decoration */}
      <div
        className="w-full h-32 md:h-48 bg-contain bg-bottom bg-repeat-x pointer-events-none"
        style={{ backgroundImage: `url('${MOUNTAINS_BG}')` }}
      />

      <div className="border-t-2 border-blue/10">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hires_c3083669.png"
                  alt="Nosso Pediatra"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-display font-bold text-foreground text-lg">
                  Nosso Pediatra
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Barriga de criança tem história. Aprendi ouvir com ciência, abraço e fé.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Dr. Bruno Fernandes | USP | RQE 63639<br />
                Uberaba, MG
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4 text-sm">
                Navegação
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/atlas-sintomas", label: "Atlas de Sintomas" },
                  { href: "/blog", label: "Artigos" },
                  { href: "/biblioteca", label: "Biblioteca" },
                  { href: "/consultas", label: "Consultas" },
                  { href: "/contato", label: "Contato" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://guiabebes-xlauyfmx.manus.space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    1ª Papinha? ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4 text-sm">
                Contato
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {phoneNumber}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-green-600 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/nossopediatra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    @nossopediatra
                  </a>
                </li>
              </ul>
            </div>

            {/* Siga-nos */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4 text-sm">
                Siga-nos
              </h4>
              <div className="flex gap-3 mb-6">
                <a
                  href="https://instagram.com/nossopediatra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-blue/20 hover:border-blue/40 hover:bg-blue/5 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-foreground" />
                </a>
                <a
                  href="https://wa.me/5534997099226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-blue/20 hover:border-blue/40 hover:bg-blue/5 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-foreground" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-blue/20 hover:border-blue/40 hover:bg-blue/5 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-foreground" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-blue/20 hover:border-blue/40 hover:bg-blue/5 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-foreground" />
                </a>
              </div>

            </div>

            {/* Localização */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4 text-sm">
                Localização
              </h4>
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-coral" />
                <p className="text-sm text-muted-foreground">{address}</p>
              </div>
              <LocationMap location="Uberaba, MG" coordinates={coordinates} />
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4 text-sm">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <span className="text-sm text-muted-foreground">
                    Política de Privacidade
                  </span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">
                    Termos de Uso
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-blue/10 pt-8">
            <p className="text-center text-sm text-muted-foreground font-display">
              &copy; {currentYear} Nosso Pediatra. Todos os direitos reservados.
            </p>
            <p className="text-center text-xs text-muted-foreground/70 mt-2">
              Este site é informativo e não substitui consulta médica profissional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
