import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">NP</span>
              </div>
              <span className="font-display font-bold text-foreground">
                Nosso Pediatra
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Referência em informação pediátrica digestiva confiável e acessível. Ciência com acolhimento.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/atlas-sintomas", label: "Atlas de Sintomas" },
                { href: "/biblioteca", label: "Biblioteca" },
                { href: "/consultas", label: "Consultas" },
                { href: "/contato", label: "Contato" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-sans font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@nossopediatra.com.br"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/nossopediatra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
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

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Nosso Pediatra. Todos os direitos reservados.
          </p>
          <p className="text-center text-xs text-muted-foreground/70 mt-2">
            Este site é informativo e não substitui consulta médica profissional.
          </p>
        </div>
      </div>
    </footer>
  );
}
