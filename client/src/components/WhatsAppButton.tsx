import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5516981112555"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow rotate-[-3deg]"
      initial={{ scale: 0, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: -3 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.15, rotate: 0 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}
