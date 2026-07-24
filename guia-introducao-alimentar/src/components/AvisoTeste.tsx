import logo from '@/assets/logo.svg';
import { usePersistido } from '@/lib/storage';
import { useLocation } from 'wouter';

/**
 * Aviso exibido uma única vez, na primeira visita: deixa claro que é uma
 * versão de teste em revisão clínica e que o app não substitui o pediatra.
 * Não aparece sobre o modo emergência.
 */
export default function AvisoTeste() {
  const [aceito, setAceito] = usePersistido<boolean>('aviso-teste-aceito', false);
  const [rota] = useLocation();

  if (aceito || rota === '/emergencia') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-aviso"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex flex-col items-center text-center">
          <img src={logo} alt="" aria-hidden className="mb-2 h-16 w-16" />
          <h2 id="titulo-aviso" className="text-lg font-bold">
            Antes de começar
          </h2>
          <p className="text-xs text-ink-soft">
            Este app faz parte do projeto <strong>Nosso Pediatra</strong>
          </p>
        </div>
        <ul className="mb-5 space-y-2.5 text-sm text-ink">
          <li>
            • Esta é uma <strong>versão de teste</strong> — o conteúdo segue as diretrizes
            brasileiras e foi revisado pelo pediatra responsável (jul/2026).
          </li>
          <li>
            • O app <strong>não substitui</strong> a consulta com o pediatra que acompanha o seu
            bebê.
          </li>
          <li>
            • Em emergência, ligue <strong>192</strong> — o botão vermelho no topo mostra o passo a
            passo do engasgo.
          </li>
          <li>
            • Tudo que você registrar fica <strong>somente neste aparelho</strong>. Nenhum dado é
            enviado para servidores.
          </li>
        </ul>
        <button
          onClick={() => setAceito(true)}
          className="w-full rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
        >
          Entendi, começar
        </button>
      </div>
    </div>
  );
}
