#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "../dist");
const publicDir = path.join(distDir, "public");
const indexHtmlPath = path.join(publicDir, "index.html");

// Route SEO metadata
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

function generateMetaTags(metadata) {
  const { title, description, canonical, type } = metadata;

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${IMAGE_URL}">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:site_name" content="Nosso Pediatra">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${IMAGE_URL}">`,
  ];

  return tags.join("\n    ");
}

function generateJsonLd() {
  return `<script type="application/ld+json">
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
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function processHtmlFile(filePath, metadata) {
  let html = fs.readFileSync(filePath, "utf-8");

  // Remove existing meta tags
  html = html.replace(/<title>.*?<\/title>/s, "");
  html = html.replace(/<meta\s+name="description"[^>]*>/g, "");
  html = html.replace(/<meta\s+name="robots"[^>]*>/g, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*>/g, "");
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/g, "");
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, "");
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

  // Generate new meta tags
  const metaTags = generateMetaTags(metadata);
  const jsonLd = generateJsonLd();

  // Insert new tags before closing </head>
  html = html.replace("</head>", `    ${metaTags}\n    ${jsonLd}\n  </head>`);

  return html;
}

function createDirectoryIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateSitemap() {
  const routes = Object.keys(ROUTE_SEO_MAP);
  const sitemapEntries = routes
    .map((route) => {
      const canonical = ROUTE_SEO_MAP[route].canonical;
      return `  <url>
    <loc>${canonical}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /404

Sitemap: https://nossopediatra.com.br/sitemap.xml`;
}

async function prerender() {
  try {
    console.log("🔍 Starting SEO prerender...");

    if (!fs.existsSync(indexHtmlPath)) {
      console.error(`❌ Error: ${indexHtmlPath} not found. Run 'npm run build' first.`);
      process.exit(1);
    }

    // Process each route
    for (const [route, metadata] of Object.entries(ROUTE_SEO_MAP)) {
      const routePath = route === "/" ? "" : route;
      const routeDir = path.join(publicDir, routePath);
      const routeHtmlPath = path.join(routeDir, "index.html");

      createDirectoryIfNotExists(routeDir);

      const html = processHtmlFile(indexHtmlPath, metadata);
      fs.writeFileSync(routeHtmlPath, html);

      console.log(`✅ Generated: ${routeHtmlPath}`);
    }

    // Generate sitemap
    const sitemap = generateSitemap();
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
    console.log(`✅ Generated: ${path.join(publicDir, "sitemap.xml")}`);

    // Generate robots.txt
    const robotsTxt = generateRobotsTxt();
    fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);
    console.log(`✅ Generated: ${path.join(publicDir, "robots.txt")}`);

    console.log("\n✨ SEO prerender complete!");
  } catch (error) {
    console.error("❌ Error during prerender:", error);
    process.exit(1);
  }
}

prerender();
