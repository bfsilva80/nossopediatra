export type InstagramTestimonial = {
  id: string;
  quote: string;
  image: string;
  name: string;
  username: string;
  role?: string;
};

// Curated testimonials for home page - 6 best testimonials (2 columns)
// Selected for: authenticity, specificity, and alignment with brand values
export const instagramTestimonials: InstagramTestimonial[] = [
  {
    id: "salles.mikaelem-1",
    quote: "Fiquei impactada com sua atenção com cada bebê que estava no quarto e quando o Sr fez questão de ouvir os pais e abençoar seus filhos! Que Deus abençoe sempre",
    image: "https://unavatar.io/instagram/salles.mikaelem",
    name: "Mãe do Miguel",
    username: "salles.mikaelem",
    role: "Atenção e acolhimento",
  },
  {
    id: "jully.carolinne-1",
    quote: "Esse é o pediatra mais humano que eu conheci, que ama com o olhar cada criança e cada história",
    image: "https://unavatar.io/instagram/jully.carolinne",
    name: "Jully Carolinne",
    username: "jully.carolinne",
    role: "Humanidade",
  },
  {
    id: "euamarina.ofc-1",
    quote: "Eu te admirei como servo que trabalha para glória de Deus. Já o admirava pelo profissionalismo e excelente médico que o sr é",
    image: "https://unavatar.io/instagram/euamarina.ofc",
    name: "Mãe da Layslla",
    username: "euamarina.ofc",
    role: "Dedicação e fé",
  },
  {
    id: "nellyloreiro-1",
    quote: "Deus colocou vc no nosso caminho quando eu já não sabia o que fazer. Obrigada por ter sempre me ajudado com meu filho",
    image: "https://unavatar.io/instagram/nellyloreiro",
    name: "Nelly Loreiro",
    username: "nellyloreiro",
    role: "Profissionalismo",
  },
  {
    id: "lariiicorrea-1",
    quote: "O melhor pediatra. Além de médico, humano e acolhedor",
    image: "https://unavatar.io/instagram/lariiicorrea",
    name: "Larii Correa",
    username: "lariiicorrea",
    role: "Humanidade e profissionalismo",
  },
  {
    id: "ccchaves-1",
    quote: "Já trabalhei com alguns pediatras, outros já atenderam meu filho, mas esse é incomparável!",
    image: "https://unavatar.io/instagram/ccchaves",
    name: "CC Chaves",
    username: "ccchaves",
    role: "Colega Profissional",
  },
];
