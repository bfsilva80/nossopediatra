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
    icon: <Home className='h-full w-full text-blue-600 dark:text-blue-400' />,
    href: '/',
  },
  {
    title: 'Barriguinha',
    icon: <Stethoscope className='h-full w-full text-emerald-600 dark:text-emerald-400' />,
    href: '/diagnostico',
  },
  {
    title: 'Consultas',
    icon: <Calendar className='h-full w-full text-pink-600 dark:text-pink-400' />,
    href: '/sobre',
  },
  {
    title: 'Sobre',
    icon: <Phone className='h-full w-full text-red-600 dark:text-red-400' />,
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

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 pointer-events-none'>
      <div className='pointer-events-auto'>
        <Dock className='items-end pb-2'>
          {dockItems.map((item, idx) => {
            if (item.hideOnMobile && isMobile) return null;
            if (item.showOnMobileOnly && !isMobile) return null;

            return (
              <DockItem
                key={idx}
                className='aspect-square rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:shadow-lg transition-shadow'
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>
                  {item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-full h-full flex items-center justify-center'
                    >
                      {item.icon}
                    </a>
                  ) : (
                    <Link href={item.href} className='w-full h-full flex items-center justify-center'>
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
