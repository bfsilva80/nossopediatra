import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, MessageCircle, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareResultsProps {
  diagnosisTitle: string;
  diagnosisDescription: string;
  recommendations: string[];
  severity: "low" | "medium" | "high" | "emergency";
}

export function ShareResults({
  diagnosisTitle,
  diagnosisDescription,
  recommendations,
  severity,
}: ShareResultsProps) {
  const [copied, setCopied] = useState(false);

  // Gerar URL com resultado codificado
  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const resultText = `${diagnosisTitle}\n${diagnosisDescription}`;
    return `${baseUrl}/diagnostico?resultado=${encodeURIComponent(resultText)}`;
  };

  // Gerar texto do resultado
  const generateResultText = () => {
    const recommendations_text = recommendations.join("\n• ");
    return `Resultado do Verificador de Sintomas - Nosso Pediatra\n\n${diagnosisTitle}\n\n${diagnosisDescription}\n\nRecomendações:\n• ${recommendations_text}\n\nPara avaliação completa, agende uma consulta com o Dr. Bruno.`;
  };

  // Compartilhar via WhatsApp
  const handleWhatsAppShare = () => {
    const text = generateResultText();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Abrindo WhatsApp...");
  };

  // Compartilhar via Email
  const handleEmailShare = () => {
    const subject = `Resultado do Verificador de Sintomas - ${diagnosisTitle}`;
    const body = generateResultText();
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    toast.success("Abrindo cliente de email...");
  };

  // Copiar link
  const handleCopyLink = () => {
    const shareUrl = generateShareUrl();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 bg-gradient-to-br from-blue/5 to-teal/5 rounded-2xl border-2 border-blue/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <Share2 className="w-5 h-5 text-blue" />
        <h3 className="font-display font-bold text-foreground">
          Compartilhar Resultado
        </h3>
      </div>

      <p className="text-sm text-foreground/70 mb-6">
        Envie este resultado para um familiar ou salve para consultar depois
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* WhatsApp */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWhatsAppShare}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </motion.button>

        {/* Email */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleEmailShare}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span>Email</span>
        </motion.button>

        {/* Copy Link */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-teal-500 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copiar Link</span>
            </>
          )}
        </motion.button>
      </div>

      <p className="text-xs text-foreground/60 mt-4 text-center">
        Seus dados não são armazenados. O resultado é gerado apenas para compartilhamento.
      </p>
    </motion.div>
  );
}
