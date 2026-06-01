import { useEffect } from "react";
import { getRouteSeoMetadata } from "./routeSeo";

interface SEOHeadProps {
  path: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
}

export function SEOHead({ path, customTitle, customDescription, customImage }: SEOHeadProps) {
  useEffect(() => {
    const metadata = getRouteSeoMetadata(path);
    const title = customTitle || metadata.title;
    const description = customDescription || metadata.description;
    const image = customImage || "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hd_35b978f0.png";

    // Update document title
    document.title = title;

    // Remove existing meta tags (avoid duplicates)
    const existingMetas = document.querySelectorAll(
      'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]'
    );
    existingMetas.forEach((meta) => meta.remove());

    // Set description
    const descMeta = document.createElement("meta");
    descMeta.name = "description";
    descMeta.content = description;
    document.head.appendChild(descMeta);

    // Set robots
    const robotsMeta = document.createElement("meta");
    robotsMeta.name = "robots";
    robotsMeta.content = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    document.head.appendChild(robotsMeta);

    // Set canonical
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = metadata.canonical;
    document.head.appendChild(canonical);

    // Open Graph tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: metadata.type },
      { property: "og:url", content: metadata.canonical },
      { property: "og:image", content: image },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Nosso Pediatra" },
    ];

    ogTags.forEach(({ property, content }) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", property);
      meta.content = content;
      document.head.appendChild(meta);
    });

    // Twitter tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ];

    twitterTags.forEach(({ name, content }) => {
      const meta = document.createElement("meta");
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    });

    // JSON-LD MedicalBusiness
    const jsonLdScript = document.createElement("script");
    jsonLdScript.type = "application/ld+json";
    jsonLdScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Nosso Pediatra - Gastroenterologia Pediátrica",
      url: "https://nossopediatra.com.br",
      telephone: "+55 34 99709-9226",
      email: "contato@nossopediatra.com.br",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Uberaba",
        addressRegion: "MG",
        addressCountry: "BR",
      },
      medicalSpecialty: "Pediatric Gastroenterology",
      doctor: {
        "@type": "Person",
        name: "Dr. Bruno Fernandes",
        jobTitle: "Gastroenterologista Pediátrico",
        identifier: {
          "@type": "Text",
          name: "CRM",
          value: "93321",
        },
      },
      sameAs: [
        "https://www.instagram.com/nossopediatra",
        "https://www.facebook.com/nossopediatra",
      ],
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hd_35b978f0.png",
    });

    // Remove existing JSON-LD scripts
    const existingJsonLd = document.querySelectorAll('script[type="application/ld+json"]');
    existingJsonLd.forEach((script) => {
      if (script.innerHTML.includes("MedicalBusiness")) {
        script.remove();
      }
    });

    document.head.appendChild(jsonLdScript);
  }, [path, customTitle, customDescription, customImage]);

  return null;
}
