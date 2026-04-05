import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'wouter';

const data = {
  facebookLink: 'https://facebook.com/nossopediatra',
  instaLink: 'https://instagram.com/nossopediatra',
  linkedinLink: 'https://www.linkedin.com/in/drbruno/',
  whatsappLink: 'https://wa.me/553499709226',
  about: {
    about: '/sobre',
    especialidades: '/especialidades',
    blog: '/blog',
    contato: '/contato',
  },
  services: {
    consultas: '/sobre',
    telemedicina: '/telemedicina',
    artigos: '/blog',
    diagnostico: '/diagnostico',
  },
  help: {
    faqs: '/diagnostico#faq',
    agendamento: '/sobre',
    suporte: '/contato',
  },
  contact: {
    email: 'contato@nossopediatra.com.br',
    phone: '(34) 9 9709-9226',
    address: 'Uberaba, MG - Brasil',
  },
  company: {
    name: 'Nosso Pediatra',
    description:
      'Gastropediatra especializado em refluxo infantil, constipação, alergias alimentares e doenças digestivas. Consultas presenciais em Uberaba e telemedicina.',
  },
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: data.facebookLink },
  { icon: Instagram, label: 'Instagram', href: data.instaLink },
  { icon: Linkedin, label: 'LinkedIn', href: data.linkedinLink },
  { icon: MessageCircle, label: 'WhatsApp', href: data.whatsappLink },
];

const aboutLinks = [
  { text: 'Sobre Dr. Bruno', href: data.about.about },
  { text: 'Especialidades', href: data.about.especialidades },
  { text: 'Artigos', href: data.about.blog },
  { text: 'Contato', href: data.about.contato },
];

const serviceLinks = [
  { text: 'Consultas Presenciais', href: data.services.consultas },
  { text: 'Telemedicina', href: data.services.telemedicina },
  { text: 'Biblioteca de Artigos', href: data.services.artigos },
  { text: 'Verificador de Sintomas', href: data.services.diagnostico },
];

const helpfulLinks = [
  { text: 'Perguntas Frequentes', href: data.help.faqs },
  { text: 'Agendar Consulta', href: data.help.agendamento, hasIndicator: true },
  { text: 'Suporte', href: data.help.suporte },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-16 w-full">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="flex justify-center gap-2 sm:justify-start">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hd_35b978f0.png"
                alt="Nosso Pediatra"
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-semibold text-white">
                {data.company.name}
              </span>
            </div>

            <p className="text-slate-300 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              {data.company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-teal transition"
                    aria-label={label}
                  >
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            {/* About Us */}
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-white">Sobre</p>
              <ul className="mt-8 space-y-4 text-sm">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-slate-300 hover:text-teal transition"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-white">Serviços</p>
              <ul className="mt-8 space-y-4 text-sm">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-slate-300 hover:text-teal transition"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Helpful Links */}
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-white">Recursos</p>
              <ul className="mt-8 space-y-4 text-sm">
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className={`${
                        hasIndicator
                          ? 'group flex justify-center gap-1.5 sm:justify-start'
                          : 'text-slate-300 hover:text-teal transition'
                      }`}
                    >
                      <span className="text-slate-300 hover:text-teal transition">
                        {text}
                      </span>
                      {hasIndicator && (
                        <span className="relative flex size-2">
                          <span className="bg-teal absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                          <span className="bg-teal relative inline-flex size-2 rounded-full" />
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-white">Contato</p>
              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start text-slate-300 hover:text-teal transition"
                      href="#"
                    >
                      <Icon className="text-teal size-5 shrink-0" />
                      {isAddress ? (
                        <address className="text-slate-300 -mt-0.5 flex-1 not-italic">
                          {text}
                        </address>
                      ) : (
                        <span className="text-slate-300 flex-1">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-slate-700 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-slate-300">
              <span className="block sm:inline">Todos os direitos reservados.</span>
            </p>

            <p className="text-slate-400 mt-4 text-sm sm:order-first sm:mt-0">
              &copy; {currentYear} {data.company.name}
            </p>
          </div>

          {/* Poetic Footer Message */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 italic text-sm">
              Barriga de criança conta história. Aprendi a ouvir com ciência, abraço e fé.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
