import type { Testimonial } from "@/components/ui/testimonials-columns";

export const testimonials: Testimonial[] = [
  {
    text: "Dia 10/10 meu 3 tesouro nasceu (Hgt) fiquei impactada com sua atenção com cada bebê que estava no quarto o quando o Sr fez questão de ouvir os pais e abençoar seus filhos! Que Deus abençoe sempre",
    name: "Salles Mikaelem",
    role: "Atenção e acolhimento",
  },
  {
    text: "Ora, ora se esse não é o pediatra mais humano que eu conheci, que ama com o olhar cada criança e cada história aqui do Marajó",
    name: "Jully Carolinne",
    role: "Humanidade",
  },
  {
    text: "Um ser humano raro, Deus o abençoe no fazer e nas palavras",
    name: "Polyanna Oliver",
    role: "Raridade humana",
  },
  {
    text: "Dr que bom vê-lo! Já o admirava pelo profissionalismo e excelente médico que o sr é. Mas a minha admiração aumentou foi quando estive de plantão e uma criança infelizmente veio a óbito mesmo após várias intervenções e manobras que o sr fez. Eu te vi sair e orar com aquela mãe. Eu te admirei como servo que trabalha para glória de Deus!",
    name: "Euamarina OFC",
    role: "Dedicação e fé",
  },
  {
    text: "Que Deus o proteja e conserve sempre assim o senhor foi o anjo da vida da minha filha e eu agradeço sempre pela sua vida pois hj Layslla já está com 7 anos mais seus primeiros meses foi o maior desespero e Deus colocou o Senhor no nosso caminho só agradecer e orar pela sua vida e de toda família",
    name: "Lara Cristina",
    role: "Anjo da vida",
  },
  {
    text: "Um profissional extraordinário que exercer a sua profissão com muito amor e carinho vc está de parabéns Dr. Bruno",
    name: "Celiany Ferreira",
    role: "Amor e carinho",
  },
  {
    text: "Parabéns doutor que Deus poça abençoar a sua profissão e que o senhor te de muita sabedoria",
    name: "Mariaines Vieira",
    role: "Bênção profissional",
  },
  {
    text: "Pediatra de respeito, esse é pediatra por amor, sou suspeita e muito grata ao Dr. BRUNO",
    name: "Juliana Ramos",
    role: "Pediatra por amor",
  },
  {
    text: "Um profissional extraordinário que exercer a sua profissão com muito amor e carinho vc está de parabéns Dr. Bruno",
    name: "Landerval",
    role: "Excelência profissional",
  },
];

// Dividir depoimentos em 3 colunas para animação
export const firstColumn = testimonials.slice(0, 3);
export const secondColumn = testimonials.slice(3, 6);
export const thirdColumn = testimonials.slice(6, 9);
