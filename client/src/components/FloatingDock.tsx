import { Home, Stethoscope, Calendar, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'wouter';
import { AppleDock, AppleDockIcon } from './ui/apple-dock';
import { useEffect, useState } from 'react';

export function FloatingDock() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent scrolling when dock is visible on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.paddingBottom = '80px';
      return () => {
        document.body.style.paddingBottom = '0';
      };
    }
  }, [isMobile]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 md:pb-8 pointer-events-none">
      <AppleDock 
        iconSize={40} 
        iconMagnification={70} 
        iconDistance={160}
        className="pointer-events-auto"
      >
        {/* Home */}
        <Link href="/">
          <AppleDockIcon className="bg-teal/10 text-teal hover:bg-teal/20 transition-colors">
            <Home className="w-5 h-5" />
          </AppleDockIcon>
        </Link>

        {/* Barriguinha (Symptoms) */}
        <Link href="/diagnostico">
          <AppleDockIcon className="bg-teal/10 text-teal hover:bg-teal/20 transition-colors">
            <Stethoscope className="w-5 h-5" />
          </AppleDockIcon>
        </Link>

        {/* Consultas/Sobre */}
        <Link href="/sobre">
          <AppleDockIcon className="bg-teal/10 text-teal hover:bg-teal/20 transition-colors">
            <Calendar className="w-5 h-5" />
          </AppleDockIcon>
        </Link>

        {/* WhatsApp - Mobile only */}
        {isMobile && (
          <a 
            href="https://wa.me/553499709226" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <AppleDockIcon className="bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </AppleDockIcon>
          </a>
        )}

        {/* Phone - Desktop only */}
        {!isMobile && (
          <a 
            href="tel:+553499709226"
          >
            <AppleDockIcon className="bg-coral/10 text-coral hover:bg-coral/20 transition-colors">
              <Phone className="w-5 h-5" />
            </AppleDockIcon>
          </a>
        )}
      </AppleDock>
    </div>
  );
}

export default FloatingDock;
