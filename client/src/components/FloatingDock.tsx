"use client";

import { Home, Stethoscope, Calendar, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface DockItem {
  icon: React.ReactNode;
  href: string;
  label: string;
  showOnMobileOnly?: boolean;
  hideOnMobile?: boolean;
  isExternal?: boolean;
  color: string;
}

export function FloatingDock() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.paddingBottom = '80px';
      return () => {
        document.body.style.paddingBottom = '0';
      };
    }
  }, [isMobile]);

  const dockItems: DockItem[] = [
    {
      icon: <Home className="w-5 h-5" />,
      href: '/',
      label: 'Home',
      color: 'text-teal-600',
    },
    {
      icon: <Stethoscope className="w-5 h-5" />,
      href: '/diagnostico',
      label: 'Barriguinha',
      color: 'text-teal-600',
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      href: '/sobre',
      label: 'Consultas',
      color: 'text-teal-600',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      href: 'https://wa.me/553499709226',
      label: 'WhatsApp',
      showOnMobileOnly: true,
      isExternal: true,
      color: 'text-green-600',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: 'tel:+553499709226',
      label: 'Ligar',
      hideOnMobile: true,
      isExternal: true,
      color: 'text-coral-600',
    },
  ];

  const visibleItems = dockItems.filter(item => {
    if (item.showOnMobileOnly && !isMobile) return false;
    if (item.hideOnMobile && isMobile) return false;
    return true;
  });

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.4;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.1;
    return 1;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 md:pb-8 pointer-events-none">
      <motion.div
        ref={containerRef}
        className="pointer-events-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {visibleItems.map((item, index) => (
          <motion.div
            key={index}
            animate={{ scale: getScale(index) }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={() => setHoveredIndex(index)}
            className="flex items-center justify-center"
          >
            {item.isExternal ? (
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${item.color} hover:bg-slate-100 dark:hover:bg-slate-800`}
                title={item.label}
              >
                {item.icon}
              </a>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${item.color} hover:bg-slate-100 dark:hover:bg-slate-800`}
                title={item.label}
              >
                {item.icon}
              </Link>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default FloatingDock;
