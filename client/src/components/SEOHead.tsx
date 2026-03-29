/**
 * SEOHead Component
 * Manages meta tags and OpenGraph tags for each page
 */

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  keywords?: string[];
}

export const SEOHead = ({
  title,
  description,
  image = "https://nossopediatra.com.br/logo.png",
  url = "https://nossopediatra.com.br",
  type = "website",
  author,
  publishedDate,
  modifiedDate,
  keywords = [],
}: SEOHeadProps) => {
  // Update document title
  if (typeof document !== "undefined") {
    document.title = `${title} | Nosso Pediatra`;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;

      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) {
          tag.setAttribute("property", name);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("viewport", "width=device-width, initial-scale=1");
    updateMetaTag("charset", "utf-8");

    if (keywords.length > 0) {
      updateMetaTag("keywords", keywords.join(", "));
    }

    if (author) {
      updateMetaTag("author", author);
    }

    // OpenGraph tags for social media
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "Nosso Pediatra", true);
    updateMetaTag("og:locale", "pt_BR", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:site", "@nossopediatra");

    // LinkedIn tags
    updateMetaTag("linkedin:title", title, true);

    // Article-specific tags
    if (type === "article") {
      updateMetaTag("article:published_time", publishedDate || new Date().toISOString(), true);
      if (modifiedDate) {
        updateMetaTag("article:modified_time", modifiedDate, true);
      }
      if (author) {
        updateMetaTag("article:author", author, true);
      }
      updateMetaTag("article:section", "Saúde Digestiva", true);
    }

    // WhatsApp specific (uses OpenGraph)
    updateMetaTag("og:image:width", "1200", true);
    updateMetaTag("og:image:height", "630", true);

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  return null;
};

/**
 * Hook to set SEO meta tags
 */
export const useSEOHead = (props: SEOHeadProps) => {
  if (typeof document !== "undefined") {
    SEOHead(props);
  }
};
