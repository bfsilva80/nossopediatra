/**
 * Performance Optimization Utilities
 * Handles lazy loading, image optimization, and Core Web Vitals improvements
 */

/**
 * Lazy load images using Intersection Observer
 * Improves LCP (Largest Contentful Paint) by deferring non-critical images
 */
export function setupLazyLoading() {
  if (!("IntersectionObserver" in window)) {
    // Fallback for older browsers
    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img: any) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute("data-src");
        if (src) {
          img.src = src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: "50px",
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

/**
 * Preload critical resources
 * Improves FCP (First Contentful Paint) and LCP
 */
export function preloadCriticalResources() {
  const criticalFonts = [
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
  ];

  criticalFonts.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = href;
    document.head.appendChild(link);
  });

  // Prefetch secondary resources
  const prefetchResources = [
    "/blog",
    "/about",
    "/diagnostico",
  ];

  prefetchResources.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  });
}

/**
 * Monitor Core Web Vitals
 * Helps identify performance issues
 */
export function monitorCoreWebVitals() {
  // LCP (Largest Contentful Paint)
  if ("PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.log("LCP monitoring not supported");
    }

    // FID (First Input Delay) - replaced by INP in newer versions
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          console.log("FID:", entry.processingDuration);
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch (e) {
      console.log("FID monitoring not supported");
    }

    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log("CLS:", clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.log("CLS monitoring not supported");
    }
  }
}

/**
 * Optimize images with srcset for responsive loading
 */
export function generateImageSrcSet(baseUrl: string): string {
  return `${baseUrl}?w=320 320w, ${baseUrl}?w=640 640w, ${baseUrl}?w=1280 1280w`;
}

/**
 * Defer non-critical JavaScript
 * Reduces FID by deferring script execution
 */
export function deferNonCriticalScripts() {
  const scripts = document.querySelectorAll("script[data-defer]");
  scripts.forEach((script) => {
    const src = script.getAttribute("data-src");
    if (src) {
      const newScript = document.createElement("script");
      newScript.src = src;
      newScript.async = true;
      document.body.appendChild(newScript);
      script.remove();
    }
  });
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations() {
  // Setup lazy loading
  setupLazyLoading();

  // Preload critical resources
  preloadCriticalResources();

  // Monitor Core Web Vitals
  monitorCoreWebVitals();

  // Defer non-critical scripts
  deferNonCriticalScripts();
}
