import { motion } from "framer-motion";

interface LoadingAnimationProps {
  message?: string;
}

export function LoadingAnimation({ message = "Analisando seus sintomas..." }: LoadingAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 space-y-8"
    >
      {/* Animação de carregamento com círculos concêntricos */}
      <div className="relative w-32 h-32">
        {/* Círculo externo rotativo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue border-r-teal"
        />

        {/* Círculo do meio (rotação inversa) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue border-l-teal"
        />

        {/* Círculo central com pulso */}
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-6 rounded-full bg-gradient-to-br from-blue/20 to-teal/20 flex items-center justify-center"
        >
          {/* Ícone central */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-2xl"
          >
            🔍
          </motion.div>
        </motion.div>
      </div>

      {/* Pontos flutuantes */}
      <div className="flex gap-2 justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="w-3 h-3 rounded-full bg-gradient-to-br from-blue to-teal"
          />
        ))}
      </div>

      {/* Mensagem de carregamento */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-2"
      >
        <p className="text-lg font-display font-bold text-foreground">{message}</p>
        <p className="text-sm text-foreground/60">
          Processando suas respostas com inteligência...
        </p>
      </motion.div>

      {/* Barra de progresso animada */}
      <motion.div
        className="w-48 h-1 bg-blue/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue via-teal to-blue"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
