import IlustracaoManobra from '@/components/IlustracaoManobra';
import {
  sinaisReacaoAlergica,
  socorroMaior1Ano,
  socorroMenor1Ano,
  type PassoSocorro,
} from '@/content/seguranca';
import { useTelaAcesa } from '@/lib/telaAcesa';
import { ArrowLeft, ArrowRight, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

/**
 * Modo emergência: tela cheia, um passo por vez, letras grandes.
 * Pensado para ser operado em pânico, com uma mão, sem rolagem.
 * Cobre as duas emergências alimentares: engasgo e anafilaxia.
 */
export default function Emergencia() {
  const [modo, setModo] = useState<'menor' | 'maior' | 'alergia' | null>(null);
  const [indice, setIndice] = useState(0);

  // A tela não pode apagar com as mãos ocupadas no bebê.
  useTelaAcesa(true);

  const passos: PassoSocorro[] = modo === 'menor' ? socorroMenor1Ano : socorroMaior1Ano;

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

      {modo === null ? (
        <div className="flex flex-1 flex-col justify-center gap-4 p-6">
          <h1 className="text-center text-2xl font-extrabold">Engasgo: qual a idade?</h1>
          <p className="text-center text-white/85">
            Se o bebê tosse ou chora, NÃO faça manobras — incentive a tosse. Se está em silêncio,
            sem respirar: comece agora.
          </p>
          <button
            onClick={() => {
              setModo('menor');
              setIndice(0);
            }}
            className="rounded-2xl bg-white p-6 text-2xl font-extrabold text-danger hover:opacity-90"
          >
            MENOS de 1 ano
          </button>
          <button
            onClick={() => {
              setModo('maior');
              setIndice(0);
            }}
            className="rounded-2xl bg-white/15 p-6 text-2xl font-extrabold hover:bg-white/25"
          >
            MAIS de 1 ano
          </button>
          <button
            onClick={() => setModo('alergia')}
            className="rounded-2xl border-2 border-white/40 p-4 text-lg font-bold hover:bg-white/10"
          >
            Não é engasgo — é reação alérgica
          </button>
        </div>
      ) : modo === 'alergia' ? (
        <div className="flex flex-1 flex-col justify-center p-6">
          <h1 className="mb-4 text-2xl font-extrabold">{sinaisReacaoAlergica.grave.titulo}</h1>
          <ul className="mb-6 space-y-3 text-xl leading-snug">
            {sinaisReacaoAlergica.grave.sinais.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden>•</span>
                {s}
              </li>
            ))}
          </ul>
          <p className="mb-6 text-lg text-white/95">{sinaisReacaoAlergica.grave.conduta}</p>
          <button
            onClick={() => setModo(null)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white/15 py-5 text-lg font-bold hover:bg-white/25"
          >
            <ArrowLeft className="h-6 w-6" aria-hidden />
            Voltar
          </button>
          <p className="mt-4 text-center text-sm text-white/70">
            Sinais leves (vermelhidão local, coceira discreta): suspenda o alimento, registre no
            Diário e fale com o pediatra antes de oferecer de novo.
          </p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col p-6">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-white/70">
            {modo === 'menor' ? 'Menos de 1 ano — sem Heimlich' : 'Mais de 1 ano'} · passo{' '}
            {indice + 1} de {passos.length}
          </p>
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            {passos[indice].ilustracao && (
              <div className="mx-auto mb-4 w-full max-w-72 rounded-2xl bg-white p-2">
                <IlustracaoManobra quadro={passos[indice].ilustracao} />
              </div>
            )}
            <h2 className="mb-3 text-2xl font-extrabold leading-tight sm:text-3xl">
              {passos[indice].passo}
            </h2>
            <p className="text-lg leading-relaxed text-white/95 sm:text-xl">
              {passos[indice].detalhe}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => (indice === 0 ? setModo(null) : setIndice(i => i - 1))}
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
            Continue alternando as manobras até desobstruir ou o socorro chegar. Desobstruiu? Leve
            o bebê para avaliação médica no mesmo dia, mesmo que pareça bem.
          </p>
        </div>
      )}
    </div>
  );
}
