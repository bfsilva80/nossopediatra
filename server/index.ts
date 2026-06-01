import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route SEO metadata - must match client/src/seo/routeSeo.ts
const ROUTE_SEO_MAP = {
  "/": {
    title: "Gastropediatra em Uberaba | Dr. Bruno Fernandes | Nosso Pediatra",
    description: "Consulta com gastroenterologista pediátrico em Uberaba para refluxo, constipação, alergias alimentares e sintomas digestivos infantis. Atendimento presencial e telemedicina.",
    canonical: "https://nossopediatra.com.br/",
    type: "website",
  },
  "/diagnostico": {
    title: "Entender os Sintomas do Seu Filho | Nosso Pediatra",
    description: "Ferramenta educativa para organizar sintomas digestivos infantis como refluxo, vômitos, constipação, dor abdominal e suspeita de alergia alimentar.",
    canonical: "https://nossopediatra.com.br/diagnostico",
    type: "website",
  },
  "/atlas-sintomas": {
    title: "Atlas de Sintomas Digestivos Infantis | Nosso Pediatra",
    description: "Guia para compreender sintomas digestivos em crianças, incluindo refluxo, vômitos, dor abdominal, constipação, diarreia e sangue nas fezes.",
    canonical: "https://nossopediatra.com.br/atlas-sintomas",
    type: "website",
  },
  "/biblioteca": {
    title: "Biblioteca de Condições Pediátricas | Refluxo, Alergias e Constipação",
    description: "Biblioteca com textos claros sobre refluxo em bebês, APLV, constipação infantil, diarreia, doença celíaca, intolerância à lactose e outros temas de gastropediatria.",
    canonical: "https://nossopediatra.com.br/biblioteca",
    type: "website",
  },
  "/refluxo-bebes": {
    title: "Refluxo em Bebês: Quando é Normal e Quando Investigar",
    description: "Entenda refluxo em bebês, regurgitação, vômitos, sinais de alerta e quando procurar avaliação com gastropediatra pediátrico.",
    canonical: "https://nossopediatra.com.br/refluxo-bebes",
    type: "article",
  },
  "/consultas": {
    title: "Consulta com Gastropediatra em Uberaba | Dr. Bruno Fernandes",
    description: "Agende consulta presencial em Uberaba ou por telemedicina para avaliação de refluxo, constipação, alergias alimentares e sintomas digestivos infantis.",
    canonical: "https://nossopediatra.com.br/consultas",
    type: "website",
  },
  "/contato": {
    title: "Contato e Agendamento | Nosso Pediatra",
    description: "Entre em contato para agendar consulta com o Dr. Bruno Fernandes, gastropediatra em Uberaba, com atendimento presencial e telemedicina.",
    canonical: "https://nossopediatra.com.br/contato",
    type: "website",
  },
  "/sobre": {
    title: "Dr. Bruno Fernandes | Gastropediatra em Uberaba",
    description: "Conheça o Dr. Bruno Fernandes, médico gastroenterologista pediátrico em Uberaba, com atuação em refluxo, constipação, alergias alimentares e sintomas digestivos infantis.",
    canonical: "https://nossopediatra.com.br/sobre",
    type: "profile",
  },
  "/blog": {
    title: "Blog de Gastropediatria | Nosso Pediatra",
    description: "Artigos sobre refluxo, constipação, alergias alimentares, dor abdominal, diarreia e outros temas de gastroenterologia pediátrica.",
    canonical: "https://nossopediatra.com.br/blog",
    type: "website",
  },
};

const IMAGE_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hd_35b978f0.png";

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function getRouteSeoMetadata(pathname: string) {
  // Normalize path (remove trailing slash except for home)
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  return ROUTE_SEO_MAP[normalizedPath as keyof typeof ROUTE_SEO_MAP] || ROUTE_SEO_MAP["/"];
}

function injectMetadata(html: string, metadata: Record<string, string>): string {
  const { title, description, canonical, type } = metadata;

  // Generate meta tags
  const metaTags = `    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:type" content="${type}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${IMAGE_URL}">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Nosso Pediatra">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${IMAGE_URL}">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Nosso Pediatra - Gastroenterologia Pediátrica",
      "url": "https://nossopediatra.com.br",
      "telephone": "+55 34 99709-9226",
      "email": "contato@nossopediatra.com.br",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Uberaba",
        "addressRegion": "MG",
        "addressCountry": "BR"
      },
      "medicalSpecialty": "Pediatric Gastroenterology",
      "doctor": {
        "@type": "Person",
        "name": "Dr. Bruno Fernandes",
        "jobTitle": "Gastroenterologista Pediátrico",
        "identifier": {
          "@type": "Text",
          "name": "CRM",
          "value": "93321"
        }
      },
      "sameAs": [
        "https://www.instagram.com/nossopediatra",
        "https://www.facebook.com/nossopediatra"
      ],
      "image": "${IMAGE_URL}"
    }
  </script>`;

  // Remove existing meta tags and title
  let cleanHtml = html
    .replace(/<title>[^<]*<\/title>/g, "")
    .replace(/<meta\s+name="description"[^>]*>/g, "")
    .replace(/<meta\s+name="robots"[^>]*>/g, "")
    .replace(/<link\s+rel="canonical"[^>]*>/g, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/g, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, "")
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

  // Insert new tags before closing </head>
  cleanHtml = cleanHtml.replace("</head>", `${metaTags}\n  </head>`);

  return cleanHtml;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Middleware to inject route-specific metadata for HTML requests (BEFORE static files)
  app.get("*", (req, res, next) => {
    // Skip if it's a file with extension (CSS, JS, etc)
    if (req.path.includes(".")) {
      return next();
    }

    // Get metadata for this route
    const metadata = getRouteSeoMetadata(req.path);

    try {
      // Always serve with injected metadata
      let html = fs.readFileSync(path.join(staticPath, "index.html"), "utf-8");
      html = injectMetadata(html, metadata);
      res.set("Content-Type", "text/html; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600");
      return res.send(html);
    } catch (error) {
      console.error("Error serving HTML", error);
      return res.status(500).send("Internal Server Error");
    }
  });

  // Serve static files (CSS, JS, images, etc) with appropriate caching
  app.use(express.static(staticPath, {
    maxAge: "1d",
    etag: false,
  }));

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}/`);
    console.log(`📍 Static path: ${staticPath}`);
  });
}

startServer().catch(console.error);
