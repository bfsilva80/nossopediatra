import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export interface Breadcrumb {
  id: string;
  label: string;
  answer?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  onNavigate?: (questionId: string) => void;
  currentQuestionId?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  onNavigate, 
  currentQuestionId 
}) => {
  if (items.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-6 flex items-center flex-wrap gap-2 text-sm"
    >
      {items.map((breadcrumb, index) => {
        const isLast = index === items.length - 1;
        const isCurrent = breadcrumb.id === currentQuestionId;

        return (
          <motion.div
            key={breadcrumb.id}
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            {/* Breadcrumb Item */}
            <motion.button
              onClick={() => onNavigate?.(breadcrumb.id)}
              disabled={isLast || !onNavigate}
              className={`
                px-3 py-1.5 rounded-lg transition-all duration-300 font-medium
                ${isCurrent 
                  ? 'bg-teal text-white shadow-md' 
                  : isLast
                  ? 'bg-blue/10 text-foreground/70 cursor-default'
                  : 'bg-blue/5 text-foreground/60 hover:bg-blue/10 hover:text-foreground cursor-pointer'
                }
              `}
              whileHover={!isLast && onNavigate ? { scale: 1.05 } : {}}
              whileTap={!isLast && onNavigate ? { scale: 0.95 } : {}}
            >
              <span className="truncate max-w-[120px]">
                {breadcrumb.label}
              </span>
              {breadcrumb.answer && (
                <span className="ml-1 text-xs opacity-75">
                  ({breadcrumb.answer})
                </span>
              )}
            </motion.button>

            {/* Separator */}
            {!isLast && (
              <motion.div
                variants={itemVariants}
                className="text-foreground/30"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
