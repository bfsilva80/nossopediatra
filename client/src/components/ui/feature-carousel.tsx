"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "wouter";
import {
  Activity,
  Pill,
  Droplets,
  AlertCircle,
  Zap,
  Flame,
  Microscope,
  HeartHandshake,
  Stethoscope,
  CheckCircle2,
  Droplet,
  Heart,
  Utensils,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Updated consultation reasons with user-provided images
const FEATURES = [
  {
    id: "reflux",
    slug: "refluxo-gastroesofagico",
    label: "Refluxo Gastroesofágico",
    icon: Activity,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Consulta_f415ff2b.webp",
    description: "Tratamento especializado para refluxo em crianças e bebês.",
    specialty: "Gastroenterologia",
  },
  {
    id: "constipation",
    slug: "constipacao-intestinal",
    label: "Constipação Intestinal",
    icon: Pill,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Constipacao_7d4f890a.webp",
    description: "Orientação e tratamento para problemas de constipação.",
    specialty: "Gastroenterologia",
  },
  {
    id: "diarrhea",
    slug: "diarreia-cronica",
    label: "Diarreia Crônica",
    icon: Droplets,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Consulta2_83e1d370.webp",
    description: "Diagnóstico e manejo de diarreia persistente em pediatria.",
    specialty: "Gastroenterologia",
  },
  {
    id: "allergy",
    slug: "alergia-alimentar",
    label: "Alergia Alimentar",
    icon: AlertCircle,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/APLV_e269c4ee.webp",
    description: "Avaliação completa e orientação para alergias alimentares.",
    specialty: "Nutrição",
  },
  {
    id: "intolerance",
    slug: "intolerancia-lactose",
    label: "Intolerância à Lactose",
    icon: Zap,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Alergia_8b250ced.webp",
    description: "Diagnóstico e estratégias nutricionais personalizadas.",
    specialty: "Nutrição",
  },
  {
    id: "ibd",
    slug: "doenca-inflamatoria-intestinal",
    label: "Doença Inflamatória Intestinal",
    icon: Flame,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/DorAbdominal_debc644f.webp",
    description: "Manejo especializado de Crohn e retocolite ulcerativa.",
    specialty: "Gastroenterologia",
  },
  {
    id: "celiac",
    slug: "doenca-celiaca",
    label: "Doença Celíaca",
    icon: Microscope,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Dieta_925834a0.webp",
    description: "Diagnóstico, orientação nutricional e acompanhamento.",
    specialty: "Nutrição",
  },
  {
    id: "blood",
    slug: "sangue-fezes",
    label: "Sangue nas Fezes",
    icon: Droplet,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Paipreocupado_a411aede.webp",
    description: "Investigação e diagnóstico de hematoquesia pediátrica.",
    specialty: "Gastroenterologia",
  },
  {
    id: "hepatitis",
    slug: "hepatites",
    label: "Hepatites",
    icon: Heart,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Ictericia_1993d4a5.webp",
    description: "Diagnóstico e manejo de hepatites virais e autoimunes.",
    specialty: "Hepatologia",
  },
  {
    id: "liver",
    slug: "doencas-figado-vias-biliares",
    label: "Doenças do Fígado/Vias Biliares",
    icon: Heart,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Consulta2_83e1d370.webp",
    description: "Avaliação e tratamento especializado de hepatopatias.",
    specialty: "Hepatologia",
  },
  {
    id: "feeding",
    slug: "dificuldade-alimentar",
    label: "Dificuldade Alimentar",
    icon: Utensils,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Orientando_074dcbce.webp",
    description: "Orientação nutricional para problemas de alimentação.",
    specialty: "Nutrição",
  },
  {
    id: "eosinophilic",
    slug: "esofagite-eosinofílica",
    label: "Esofagite Eosinofílica",
    icon: Zap,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Consulta_f415ff2b.webp",
    description: "Diagnóstico e manejo de esofagite eosinofílica.",
    specialty: "Gastroenterologia",
  },
  {
    id: "pancreatitis",
    slug: "pancreatite",
    label: "Pancreatite Aguda/Recorrente/Crônica",
    icon: Flame,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/DorAbdominal_debc644f.webp",
    description: "Manejo especializado de pancreatite em crianças.",
    specialty: "Gastroenterologia",
  },
  {
    id: "vomiting",
    slug: "vomito-recorrente",
    label: "Vômito Recorrente",
    icon: Stethoscope,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/Consulta2_83e1d370.webp",
    description: "Investigação e tratamento de vômitos persistentes.",
    specialty: "Gastroenterologia",
  }
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-border/40 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20">
        {/* Left side - Feature list */}
        <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-gradient-to-br from-blue-500 to-emerald-500">
          <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-blue-500 via-blue-500/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-blue-500 via-blue-500/80 to-transparent z-40" />
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-white text-blue-600 border-white z-10 shadow-lg"
                        : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-blue-600" : "text-white/40"
                      )}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>

                    <span className="font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right side - Image and description */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-secondary/30 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              const Icon = feature.icon;

              return (
                <Link key={feature.id} href={`/conteudo/${feature.slug}`}>
                  <motion.div
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-background bg-background origin-center cursor-pointer"
                  >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-background text-foreground px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-border/50">
                          {index + 1} • {feature.specialty}
                        </div>
                        <p className="text-white font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]" />
                    <span className="text-white/80 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                      {feature.specialty}
                    </span>
                  </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
