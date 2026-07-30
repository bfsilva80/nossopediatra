import { useFalhaStorage } from '@/lib/storage';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'wouter';

/**
 * Aviso de que o aparelho não está conseguindo salvar os registros.
 *
 * Existe porque a falha era silenciosa: a família preenchia o diário, o
 * localStorage recusava (cheio, navegação privada, cota negada) e nada indicava
 * que o registro se perderia ao fechar a aba. Aparece em todas as telas enquanto
 * durar, e aponta a saída — exportar os dados antes de perdê-los.
 */
export default function AvisoStorage() {
  if (!useFalhaStorage()) return null;

  return (
    <div
      role="alert"
      className="mb-4 flex gap-3 rounded-xl border-2 border-warn bg-warn-soft p-4 text-sm"
    >
      <AlertTriangle className="h-5 w-5 shrink-0 text-warn" aria-hidden />
      <div>
        <p className="font-bold">Este aparelho não está salvando seus registros</p>
        <p className="mt-1">
          O que você digitar continua valendo nesta sessão, mas será perdido ao fechar o app.
          Costuma ser falta de espaço no navegador ou navegação anônima. Libere espaço ou abra
          o app numa janela normal.
        </p>
        <Link
          href="/transferir"
          className="mt-2 inline-block font-bold text-primary underline underline-offset-2"
        >
          Salvar uma cópia dos meus dados agora
        </Link>
      </div>
    </div>
  );
}
