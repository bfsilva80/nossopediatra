import {
  Stethoscope,
  BookOpen,
  MessageSquare,
  Calendar,
  Home,
  HelpCircle,
  Phone,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Link } from 'wouter';

const dockItems = [
  {
    title: 'Home',
    icon: <Home className='h-full w-full text-blue-600 dark:text-blue-400' />,
    href: '/',
  },
  {
    title: 'O que esta acontecendo?',
    icon: <Stethoscope className='h-full w-full text-emerald-600 dark:text-emerald-400' />,
    href: '/diagnostico',
  },
  {
    title: 'Consultas',
    icon: <Calendar className='h-full w-full text-pink-600 dark:text-pink-400' />,
    href: '/consultas',
  },
  {
    title: 'Sobre',
    icon: <Phone className='h-full w-full text-red-600 dark:text-red-400' />,
    href: '/sobre',
  },
];

export function FloatingDock() {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 pointer-events-none'>
      <div className='pointer-events-auto'>
        <Dock className='items-end pb-2'>
          {dockItems.map((item, idx) => (
            <DockItem
              key={idx}
              className='aspect-square rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:shadow-lg transition-shadow'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <Link href={item.href} className='w-full h-full flex items-center justify-center'>
                  {item.icon}
                </Link>
              </DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    </div>
  );
}

export default FloatingDock;
