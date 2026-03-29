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
    name: "Nosso Pediatra - Dr. Bruno Fernandes da Silva",
    description: "Especialista em Gastroenterologia Pediátrica com mais de 15 anos de experiência. Atendimento em Uberaba.",
    image: "https://nossopediatra.com.br/logo.png",
    telephone: "+55 (34) 99999-9999",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Exemplo, 123",
      addressLocality: "Uberaba",
      addressRegion: "MG",
      postalCode: "38000-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -19.7681,
      longitude: -47.9923,
    },
    url: "https://nossopediatra.com.br",
    sameAs: [
      "https://www.instagram.com/nossopediatra",
      "https://www.facebook.com/nossopediatra",
    ],
    priceRange: "R$ 150 - R$ 300",
    areaServed: ["Uberaba", "Minas Gerais", "Brasil"],
    medicalSpecialty: [
      "Pediatrics",
      "Gastroenterology",
      "Pediatric Gastroenterology",
    ],
    knowsAbout: [
      "Refluxo infantil",
      "Constipação",
      "Alergias alimentares",
      "Dor abdominal",
      "Doenças digestivas",
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
    name: "Nosso Pediatra",
    url: "https://nossopediatra.com.br",
    logo: "https://nossopediatra.com.br/logo.png",
    description: "Gastroenterologia Pediátrica - Especialista em refluxo, constipação e alergias alimentares",
    sameAs: [
      "https://www.instagram.com/nossopediatra",
      "https://www.facebook.com/nossopediatra",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+55 (34) 99999-9999",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Exemplo, 123",
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
