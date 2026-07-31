import { usePersistido } from '@/lib/storage';
import { ArrowLeftRight, Check, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';

/**
 * Transferência de dados entre celulares SEM servidor: os dados viram um
 * código de texto que viaja pelo canal que a família já usa (WhatsApp).
 * Decisão deliberada: sem QR — ler QR numa página web exige biblioteca de
 * câmera pesada; colar um texto no WhatsApp resolve o mesmo problema.
 */

const PREFIXO_STORAGE = 'guia-ia:';
const PREFIXO_CODIGO = 'NPIA1.';

function exportarCodigo(): string {
  const dados: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave?.startsWith(PREFIXO_STORAGE)) {
      dados[chave.slice(PREFIXO_STORAGE.length)] = localStorage.getItem(chave) ?? '';
    }
  }
  const json = JSON.stringify(dados);
  return PREFIXO_CODIGO + btoa(String.fromCharCode(...new TextEncoder().encode(json)));
}

function importarCodigo(codigo: string): number {
  const limpo = codigo.trim();
  if (!limpo.startsWith(PREFIXO_CODIGO)) {
    throw new Error('Este não parece um código do app (deve começar com NPIA1.).');
  }
  const bytes = Uint8Array.from(atob(limpo.slice(PREFIXO_CODIGO.length)), c => c.charCodeAt(0));
  const dados = JSON.parse(new TextDecoder().decode(bytes)) as Record<string, string>;
  if (typeof dados !== 'object' || dados === null) throw new Error('Código corrompido.');
  let gravadas = 0;
  for (const [chave, valor] of Object.entries(dados)) {
    if (typeof valor === 'string') {
      localStorage.setItem(PREFIXO_STORAGE + chave, valor);
      gravadas++;
    }
  }
  return gravadas;
}

export default function Transferir() {
  // usePersistido só para saber se há dados neste aparelho
  const [nascimento] = usePersistido<string>('nascimento', '');
  const [codigoGerado, setCodigoGerado] = useState('');
  const [codigoColado, setCodigoColado] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const gerar = () => setCodigoGerado(exportarCodigo());

  const copiar = async () => {
    await navigator.clipboard.writeText(codigoGerado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const compartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: codigoGerado });
        return;
      } catch {
        return;
      }
    }
    copiar();
  };

  const importar = () => {
    setErro('');
    try {
      const n = importarCodigo(codigoColado);
      setResultado(`${n} registros importados. Recarregando o app…`);
      setConfirmando(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (e) {
      setConfirmando(false);
      setErro(e instanceof Error ? e.message : 'Não foi possível ler este código.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <ArrowLeftRight className="h-6 w-6 text-primary" aria-hidden />
          Levar os dados para outro celular
        </h1>
        <p className="text-ink-soft">
          Trocou de aparelho, ou o outro responsável também quer os registros? Os dados viram um
          código de texto — mande pelo WhatsApp e cole no outro celular. Nada passa por servidor.
        </p>
      </div>

      <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold">1. Neste aparelho: gerar o código</h2>
        {!nascimento && (
          <p className="rounded-xl bg-warn-soft p-3 text-sm">
            Este aparelho ainda não tem dados do app — o código sairá praticamente vazio.
          </p>
        )}
        {!codigoGerado ? (
          <button
            onClick={gerar}
            className="w-full rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
          >
            Gerar código de transferência
          </button>
        ) : (
          <>
            <p className="max-h-28 overflow-y-auto break-all rounded-xl bg-stone-100 p-3 font-mono text-xs">
              {codigoGerado}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={compartilhar}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
              >
                <Share2 className="h-5 w-5" aria-hidden />
                Enviar pelo WhatsApp
              </button>
              <button
                onClick={copiar}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary py-3 font-bold text-primary hover:bg-surf-azul"
              >
                <Copy className="h-5 w-5" aria-hidden />
                {copiado ? 'Copiado ✓' : 'Copiar'}
              </button>
            </div>
          </>
        )}
      </section>

      <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold">2. No outro aparelho: colar o código</h2>
        <textarea
          rows={3}
          placeholder="Cole aqui o código recebido (começa com NPIA1.)"
          value={codigoColado}
          onChange={e => {
            setCodigoColado(e.target.value);
            setErro('');
          }}
          className="w-full resize-none rounded-lg border-2 border-stone-200 px-3 py-2 font-mono text-xs focus:border-primary focus:outline-none"
        />
        {erro && (
          <p role="alert" className="text-sm text-danger">
            {erro}
          </p>
        )}
        {resultado ? (
          <p className="flex items-center gap-2 rounded-xl bg-surf-azul p-3 text-sm font-semibold">
            <Check className="h-5 w-5 text-primary" aria-hidden />
            {resultado}
          </p>
        ) : !confirmando ? (
          <button
            onClick={() => codigoColado.trim() && setConfirmando(true)}
            disabled={!codigoColado.trim()}
            className="w-full rounded-xl border-2 border-primary py-3 font-bold text-primary hover:bg-surf-azul disabled:opacity-40"
          >
            Importar
          </button>
        ) : (
          <div className="rounded-xl bg-warn-soft p-4 text-sm">
            <p className="mb-3 font-semibold">
              Importar vai SOBRESCREVER os registros deste aparelho com os do código. Continuar?
            </p>
            <div className="flex gap-3">
              <button
                onClick={importar}
                className="flex-1 rounded-lg bg-primary py-2 font-bold text-white hover:opacity-90"
              >
                Sim, importar
              </button>
              <button
                onClick={() => setConfirmando(false)}
                className="flex-1 rounded-lg border-2 border-stone-300 py-2 font-semibold text-ink-soft"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </section>

      <p className="rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
        O código contém os registros do app (data de nascimento, diário, alergênicos, ferro…).
        Envie apenas para quem cuida do bebê. Apagar a mensagem depois de importar é uma boa
        higiene.
      </p>
    </div>
  );
}
