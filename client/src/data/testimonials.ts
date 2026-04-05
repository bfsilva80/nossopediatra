import type { Testimonial } from "@/components/ui/testimonials-columns";

// Curated testimonials for About page - 3 best testimonials
// Selected for: authenticity, emotional impact, and alignment with brand values
export const testimonials: Testimonial[] = [
  {
    text: "Fiquei impactada com sua atenção com cada bebê que estava no quarto e quando o Sr fez questão de ouvir os pais e abençoar seus filhos! Que Deus abençoe sempre",
    name: "Salles Mikaelem",
    role: "Atenção e acolhimento",
  },
  {
    text: "Esse é o pediatra mais humano que eu conheci, que ama com o olhar cada criança e cada história",
    name: "Jully Carolinne",
    role: "Humanidade",
  },
  {
    text: "Eu te admirei como servo que trabalha para glória de Deus. Já o admirava pelo profissionalismo e excelente médico que o sr é",
    name: "Euamarina OFC",
    role: "Dedicação e fé",
  },
];

// Dividir depoimentos em 3 colunas para animação
export const firstColumn = testimonials.slice(0, 3);
export const secondColumn = testimonials.slice(3, 6);
export const thirdColumn = testimonials.slice(6, 9);
