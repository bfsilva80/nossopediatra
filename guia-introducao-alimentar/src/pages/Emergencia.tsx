import { socorroMaior1Ano, socorroMenor1Ano, type PassoSocorro } from '@/content/seguranca';
import { ArrowLeft, ArrowRight, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

/**
 * Modo emergência: tela cheia, um passo por vez, letras grandes.
 * Pensado para ser operado em pânico, com uma mão, sem rolagem.
 */
export default function Emergencia() {
  const [faixa, setFaixa] = useState<'menor' | 'maior' | null>(null);
  const [indice, setIndice] = useState(0);

  const passos: PassoSocorro[] = faixa === 'menor' ? socorroMenor1Ano : socorroMaior1Ano;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-danger text-white">
      {/* Barra superior: sair + ligar 192 */}
      <div className="flex items-center justify-between gap-3 p-4">
        <Link
          href="/seguranca"
          aria-label="Sair do modo emergência"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
        >
          <X className="h-6 w-6" aria-hidden />
        </Link>
        <a
          href="tel:192"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3 text-xl font-extrabold text-danger hover:opacity-90"
        >
          <Phone className="h-6 w-6" aria-hidden />
          LIGAR 192
        </a>
      </div>

      {faixa === null ? (
        <div className="flex flex-1 flex-col justify-center gap-4 p-6">
          <h1 className="text-center text-2xl font-extrabold">Engasgo: qual a idade?</h1>
          <p className="text-center text-white/85">
            Se o bebê tosse ou chora, NÃO faça manobras — incentive a tosse. Se está em silêncio,
            sem respirar: comece agora.
          </p>
          <button
            onClick={() => {
              setFaixa('menor');
              setIndice(0);
            }}
            className="rounded-2xl bg-white p-6 text-2xl font-extrabold text-danger hover:opacity-90"
          >
            MENOS de 1 ano
          </button>
          <button
            onClick={() => {
              setFaixa('maior');
              setIndice(0);
            }}
            className="rounded-2xl bg-white/15 p-6 text-2xl font-extrabold hover:bg-white/25"
          >
            MAIS de 1 ano
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col p-6">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-white/70">
            {faixa === 'menor' ? 'Menos de 1 ano — sem Heimlich' : 'Mais de 1 ano'} · passo{' '}
            {indice + 1} de {passos.length}
          </p>
          <div className="flex flex-1 flex-col justify-center">
            <h2 className="mb-4 text-3xl font-extrabold leading-tight">{passos[indice].passo}</h2>
            <p className="text-xl leading-relaxed text-white/95">{passos[indice].detalhe}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => (indice === 0 ? setFaixa(null) : setIndice(i => i - 1))}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/15 py-5 text-lg font-bold hover:bg-white/25"
            >
              <ArrowLeft className="h-6 w-6" aria-hidden />
              Voltar
            </button>
            {indice < passos.length - 1 ? (
              <button
                onClick={() => setIndice(i => i + 1)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white py-5 text-lg font-extrabold text-danger hover:opacity-90"
              >
                Próximo
                <ArrowRight className="h-6 w-6" aria-hidden />
              </button>
            ) : (
              <button
                onClick={() => setIndice(0)}
                className="flex items-center justify-center rounded-2xl bg-white py-5 text-lg font-extrabold text-danger hover:opacity-90"
              >
                Repetir ciclo
              </button>
            )}
          </div>
          <p className="mt-4 text-center text-sm text-white/70">
            Continue alternando as manobras até desobstruir ou o socorro chegar.
          </p>
        </div>
      )}
    </div>
  );
}
