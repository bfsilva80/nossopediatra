/**
 * SEO Schema Utility
 * Generates JSON-LD structured data for better SEO and featured snippets
 */

export interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string;
  telephone: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  url: string;
  sameAs: string[];
  priceRange: string;
  areaServed: string[];
  medicalSpecialty: string[];
  knowsAbout: string[];
}

export interface FAQSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
}

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    "@type": string;
    contactType: string;
    telephone: string;
  };
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

/**
 * Generate LocalBusiness schema for pediatrician
 */
export const generateLocalBusinessSchema = (): LocalBusinessSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Nosso Pediatra - Dr. Bruno Fernandes",
    description: "Gastropediatra especializado em refluxo infantil, constipação, alergias alimentares e doenças digestivas infantis. Atendimento presencial em Uberaba e telemedicina.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hires_c3083669.png",
    telephone: "+55 (34) 99709-9226",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Uberaba",
      addressLocality: "Uberaba",
      addressRegion: "MG",
      postalCode: "38000-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -19.7597,
      longitude: -47.9203,
    },
    url: "https://nossopediatra.com.br",
    sameAs: [
      "https://www.instagram.com/nossopediatra",
      "https://www.facebook.com/nossopediatra",
      "https://www.linkedin.com/company/nossopediatra",
    ],
    priceRange: "R$ 150 - R$ 400",
    areaServed: ["Uberaba", "Minas Gerais", "Brasil"],
    medicalSpecialty: [
      "Pediatric Gastroenterology",
      "Pediatrics",
      "Gastroenterology",
    ],
    knowsAbout: [
      "Refluxo gastroesofágico infantil",
      "Constipação em crianças",
      "Alergias alimentares",
      "Dor abdominal pediátrica",
      "Doenças digestivas infantis",
      "Intolerância à lactose",
      "Diarreia crônica",
    ],
  };
};

/**
 * Generate FAQ schema from FAQ data
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
): FAQSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate Article schema for blog posts
 */
export const generateArticleSchema = (
  title: string,
  description: string,
  image: string,
  slug: string,
  publishedDate: string,
  modifiedDate: string
): ArticleSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      name: "Dr. Bruno Fernandes da Silva",
    },
    publisher: {
      "@type": "Organization",
      name: "Nosso Pediatra",
      logo: {
        "@type": "ImageObject",
        url: "https://nossopediatra.com.br/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nossopediatra.com.br/blog/${slug}`,
    },
  };
};

/**
 * Generate Organization schema (global)
 */
export const generateOrganizationSchema = (): OrganizationSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Nosso Pediatra - Dr. Bruno Fernandes",
    url: "https://nossopediatra.com.br",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/logo-hires_c3083669.png",
    description: "Gastropediatra especializado em refluxo infantil, constipação, alergias alimentares e doenças digestivas. Consultas presenciais em Uberaba e telemedicina.",
    sameAs: [
      "https://www.instagram.com/nossopediatra",
      "https://www.facebook.com/nossopediatra",
      "https://www.linkedin.com/company/nossopediatra",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Medical",
      telephone: "+55 (34) 99709-9226",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Uberaba",
      addressLocality: "Uberaba",
      addressRegion: "MG",
      postalCode: "38000-000",
      addressCountry: "BR",
    },
  };
};

/**
 * Inject JSON-LD schema into page head
 */
export const injectSchema = (schema: object): void => {
  if (typeof document === "undefined") return;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Remove existing schema from page
 */
export const removeSchema = (type: string): void => {
  if (typeof document === "undefined") return;

  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach((script) => {
    const content = script.textContent;
    if (content && content.includes(`"@type":"${type}"`)) {
      script.remove();
    }
  });
};
