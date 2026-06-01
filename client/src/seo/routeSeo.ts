/**
 * SEO Route Map - Canonical metadata for each route
 * Used by SEOHead component and prerender script
 */

export interface RouteSeoMetadata {
  path: string;
  title: string;
  description: string;
  canonical: string;
  type: "website" | "article" | "profile";
  keywords?: string[];
}

export const ROUTE_SEO_MAP: Record<string, RouteSeoMetadata> = {
  "/": {
    path: "/",
    title: "Gastropediatra em Uberaba | Dr. Bruno Fernandes | Nosso Pediatra",
    description: "Consulta com gastroenterologista pediátrico em Uberaba para refluxo, constipação, alergias alimentares e sintomas digestivos infantis. Atendimento presencial e telemedicina.",
    canonical: "https://nossopediatra.com.br/",
    type: "website",
    keywords: ["gastropediatra", "refluxo infantil", "constipação criança", "alergia alimentar bebê", "pediatra Uberaba"],
  },
  "/diagnostico": {
    path: "/diagnostico",
    title: "Entender os Sintomas do Seu Filho | Nosso Pediatra",
    description: "Ferramenta educativa para organizar sintomas digestivos infantis como refluxo, vômitos, constipação, dor abdominal e suspeita de alergia alimentar.",
    canonical: "https://nossopediatra.com.br/diagnostico",
    type: "website",
    keywords: ["sintomas digestivos", "refluxo bebê", "constipação infantil", "dor abdominal criança"],
  },
  "/atlas-sintomas": {
    path: "/atlas-sintomas",
    title: "Atlas de Sintomas Digestivos Infantis | Nosso Pediatra",
    description: "Guia para compreender sintomas digestivos em crianças, incluindo refluxo, vômitos, dor abdominal, constipação, diarreia e sangue nas fezes.",
    canonical: "https://nossopediatra.com.br/atlas-sintomas",
    type: "website",
    keywords: ["atlas sintomas", "sintomas digestivos infantis", "refluxo", "constipação", "diarreia"],
  },
  "/biblioteca": {
    path: "/biblioteca",
    title: "Biblioteca de Condições Pediátricas | Refluxo, Alergias e Constipação",
    description: "Biblioteca com textos claros sobre refluxo em bebês, APLV, constipação infantil, diarreia, doença celíaca, intolerância à lactose e outros temas de gastropediatria.",
    canonical: "https://nossopediatra.com.br/biblioteca",
    type: "website",
    keywords: ["biblioteca", "APLV", "constipação", "refluxo", "doença celíaca"],
  },
  "/refluxo-bebes": {
    path: "/refluxo-bebes",
    title: "Refluxo em Bebês: Quando é Normal e Quando Investigar",
    description: "Entenda refluxo em bebês, regurgitação, vômitos, sinais de alerta e quando procurar avaliação com gastropediatra pediátrico.",
    canonical: "https://nossopediatra.com.br/refluxo-bebes",
    type: "article",
    keywords: ["refluxo bebê", "regurgitação", "vômitos", "gastropediatra"],
  },
  "/consultas": {
    path: "/consultas",
    title: "Consulta com Gastropediatra em Uberaba | Dr. Bruno Fernandes",
    description: "Agende consulta presencial em Uberaba ou por telemedicina para avaliação de refluxo, constipação, alergias alimentares e sintomas digestivos infantis.",
    canonical: "https://nossopediatra.com.br/consultas",
    type: "website",
    keywords: ["consulta", "gastropediatra", "telemedicina", "Uberaba"],
  },
  "/contato": {
    path: "/contato",
    title: "Contato e Agendamento | Nosso Pediatra",
    description: "Entre em contato para agendar consulta com o Dr. Bruno Fernandes, gastropediatra em Uberaba, com atendimento presencial e telemedicina.",
    canonical: "https://nossopediatra.com.br/contato",
    type: "website",
    keywords: ["contato", "agendamento", "telefone", "email"],
  },
  "/sobre": {
    path: "/sobre",
    title: "Dr. Bruno Fernandes | Gastropediatra em Uberaba",
    description: "Conheça o Dr. Bruno Fernandes, médico gastroenterologista pediátrico em Uberaba, com atuação em refluxo, constipação, alergias alimentares e sintomas digestivos infantis.",
    canonical: "https://nossopediatra.com.br/sobre",
    type: "profile",
    keywords: ["Dr. Bruno Fernandes", "gastropediatra", "formação", "experiência"],
  },
  "/blog": {
    path: "/blog",
    title: "Blog de Gastropediatria | Nosso Pediatra",
    description: "Artigos sobre refluxo, constipação, alergias alimentares, dor abdominal, diarreia e outros temas de gastroenterologia pediátrica.",
    canonical: "https://nossopediatra.com.br/blog",
    type: "website",
    keywords: ["blog", "artigos", "gastropediatria", "refluxo", "constipação"],
  },
};

/**
 * Get SEO metadata for a given path
 * Falls back to home metadata if path not found
 */
export function getRouteSeoMetadata(path: string): RouteSeoMetadata {
  // Normalize path (remove trailing slash except for home)
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");
  
  return ROUTE_SEO_MAP[normalizedPath] || ROUTE_SEO_MAP["/"];
}

/**
 * Get all routes for sitemap generation
 */
export function getAllRoutes(): RouteSeoMetadata[] {
  return Object.values(ROUTE_SEO_MAP);
}
