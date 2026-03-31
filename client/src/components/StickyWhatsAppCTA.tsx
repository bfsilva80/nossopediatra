import { MessageCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function StickyWhatsAppCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show after scrolling 300px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isMobile || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-0 left-0 right-0 z-40 md:hidden"
    >
      <a
        href="https://wa.me/553499709226"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 mx-2 mt-2 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        <div className="flex items-center gap-2 flex-1">
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Conversar no WhatsApp</span>
            <span className="text-xs text-green-100 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Resposta em 2h
            </span>
          </div>
        </div>
        <span className="text-lg">→</span>
      </a>
    </motion.div>
  );
}
