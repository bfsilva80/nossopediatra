import {
  Stethoscope,
  BookOpen,
  MessageSquare,
  Calendar,
  Home,
  HelpCircle,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';

const dockItems = [
  {
    title: 'Home',
    icon: <Home className='h-full w-full text-teal-600 dark:text-teal-400' />,
    href: '/',
  },
  {
    title: 'Barriguinha',
    icon: <Stethoscope className='h-full w-full text-emerald-600 dark:text-emerald-400' />,
    href: '/diagnostico',
  },
  {
    title: 'Consultas',
    icon: <Calendar className='h-full w-full text-coral-600 dark:text-coral-400' />,
    href: '/sobre',
  },
  {
    title: 'Sobre',
    icon: <Phone className='h-full w-full text-teal-600 dark:text-teal-400' />,
    href: '/sobre',
    hideOnMobile: true,
  },
  {
    title: 'WhatsApp',
    icon: <MessageCircle className='h-full w-full text-green-600 dark:text-green-400' />,
    href: 'https://wa.me/553499709226',
    showOnMobileOnly: true,
  },
];

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
    <div className='fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-3 md:pb-4 pointer-events-none'>
      <div className='pointer-events-auto'>
        <Dock className='items-end pb-2 md:pb-3 gap-1 md:gap-2'>
          {dockItems.map((item, idx) => {
            if (item.hideOnMobile && isMobile) return null;
            if (item.showOnMobileOnly && !isMobile) return null;

            return (
              <DockItem
                key={idx}
                className='aspect-square rounded-full bg-gradient-to-br from-teal/10 to-teal/20 hover:from-teal/20 hover:to-teal/30 dark:from-teal/20 dark:to-teal/30 hover:shadow-lg transition-all duration-200 border border-teal/30 hover:border-teal/50'
              >
                <DockLabel className='text-xs md:text-sm font-medium'>{item.title}</DockLabel>
                <DockIcon>
                  {item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-200'
                    >
                      {item.icon}
                    </a>
                  ) : (
                    <Link href={item.href} className='w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                      {item.icon}
                    </Link>
                  )}
                </DockIcon>
              </DockItem>
            );
          })}
        </Dock>
      </div>
    </div>
  );
}

export default FloatingDock;
