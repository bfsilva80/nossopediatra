import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function StickyMobileFooterCTA() {
  const phoneNumber = "+55 34 99709-9226";
  const whatsappMessage = encodeURIComponent(
    "Olá Dr. Bruno! Gostaria de agendar uma consulta."
  );
  const whatsappUrl = `https://wa.me/5534997099226?text=${whatsappMessage}`;

  return (
    <>
      {/* Mobile-only sticky footer CTA - hidden on desktop */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-white via-white to-white/80 border-t border-blue/10 p-3 z-40 shadow-lg"
      >
        <div className="flex gap-2 max-w-md mx-auto">
          {/* Phone CTA */}
          <a href={`tel:${phoneNumber}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full h-12 rounded-lg border-2 border-blue text-blue hover:bg-blue/5 font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden sm:inline">Ligar</span>
            </Button>
          </a>

          {/* WhatsApp CTA - Primary */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              className="w-full h-12 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>
          </a>
        </div>

        {/* Micro-copy */}
        <p className="text-xs text-foreground/60 text-center mt-2">
          Resposta em até 2 horas
        </p>
      </motion.div>

      {/* Spacer to prevent content overlap on mobile */}
      <div className="h-24 md:h-0" />
    </>
  );
}
