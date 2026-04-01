"use client";

import { useLocation } from "wouter";
import { AppleDock, AppleDockIcon } from "@/components/ui/apple-dock";
import { Home, Stethoscope, Calendar, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

export function FloatingDock() {
  const [, navigate] = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5534997099226?text=Olá%20Dr.%20Bruno%2C%20gostaria%20de%20agendar%20uma%20consulta!", "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+5534997099226";
  };

  return (
    <AppleDock iconMagnification={70} iconDistance={160} className="hidden md:flex">
      <AppleDockIcon
        className="bg-teal-500/10 text-teal-600 hover:bg-teal-500/20 transition-colors"
        onClick={() => handleNavigation("/")}
        title="Home"
      >
        <Home className="w-5 h-5" />
      </AppleDockIcon>

      <AppleDockIcon
        className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
        onClick={() => handleNavigation("/diagnostico")}
        title="Barriguinha"
      >
        <Stethoscope className="w-5 h-5" />
      </AppleDockIcon>

      <AppleDockIcon
        className="bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 transition-colors"
        onClick={() => handleNavigation("/sobre")}
        title="Consultas"
      >
        <Calendar className="w-5 h-5" />
      </AppleDockIcon>

      <AppleDockIcon
        className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors"
        onClick={handleWhatsApp}
        title="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </AppleDockIcon>

      <AppleDockIcon
        className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition-colors"
        onClick={handlePhone}
        title="Ligar"
      >
        <Phone className="w-5 h-5" />
      </AppleDockIcon>
    </AppleDock>
  );
}

export default FloatingDock;
