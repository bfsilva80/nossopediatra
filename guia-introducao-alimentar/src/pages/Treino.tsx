import GaleriaManobras from '@/components/GaleriaManobras';
import IlustracaoManobra from '@/components/IlustracaoManobra';
import {
  quizEngasgo,
  socorroMaior1Ano,
  socorroMenor1Ano,
  type PassoSocorro,
} from '@/content/seguranca';
import { usePersistido } from '@/lib/storage';
import { ArrowLeft, ArrowRight, GraduationCap, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export interface EstadoTreino {
  ultimoTreino: string | null;
  dispensadoEm: string | null;
}

export function useTreino() {
  return usePersistido<EstadoTreino>('treino', { ultimoTreino: null, dispensadoEm: null });
}

/**
 * MODO TREINO — deliberadamente o oposto visual do modo emergência
 * (fundo claro/azul, selo TREINO, sem botão 192 falso): quem está em
 * pânico real não pode confundir as duas telas. Habilidades de socorro
 * decaem em ~3 meses; por isso a recomendação de revisão trimestral.
 */

function gerarIcs(): void {
  const inicio = new Date();
  inicio.setMonth(inicio.getMonth() + 3);
  const stamp = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T200000`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NossoPediatra//IntroducaoAlimentar//PT',
    'BEGIN:VEVENT',
    `UID:treino-engasgo-${inicio.getTime()}@nossopediatra`,
    `DTSTART:${stamp(inicio)}`,
    'RRULE:FREQ=MONTHLY;INTERVAL=3',
    'SUMMARY:Revisar manobras de engasgo (3 min) — app Introdução Alimentar',
    'DESCRIPTION:Habilidades de socorro se perdem em ~3 meses. Abra o app e refaça o treino.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'lembrete-treino-engasgo.ics';
  link.click();
  URL.revokeObjectURL(url);
}

function ListaPassosTreino({ passos }: { passos: PassoSocorro[] }) {
  return (
    <ol className="space-y-3">
      {passos.map((p, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
          >
            {i + 1}
          </span>
          <div className="text-sm">
            <p className="font-semibold">{p.passo}</p>
            <p className="text-ink-soft">{p.detalhe}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

type Etapa = 'inicio' | 'passos' | 'quiz' | 'fim';

export default function Treino() {
  const [, setTreino] = useTreino();
  const [etapa, setEtapa] = useState<Etapa>('inicio');
  const [questao, setQuestao] = useState(0);
  const [respondida, setRespondida] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);

  const q = quizEngasgo[questao];

  const responder = (idx: number) => {
    if (respondida !== null) return;
    setRespondida(idx);
    if (idx === q.corretaIdx) setAcertos(a => a + 1);
  };

  const proximaQuestao = () => {
    if (questao < quizEngasgo.length - 1) {
      setQuestao(i => i + 1);
      setRespondida(null);
    } else {
      setTreino(prev => ({ ...prev, ultimoTreino: new Date().toISOString().slice(0, 10) }));
      setEtapa('fim');
    }
  };

  return (
    <div className="space-y-6">
      {/* Selo permanente: isto NÃO é o modo emergência */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-primary bg-primary-soft p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-primary">
          <GraduationCap className="h-5 w-5" aria-hidden />
          MODO TREINO — sem pressa, sem emergência
        </p>
        <Link href="/seguranca" aria-label="Sair do treino" className="-m-2 p-2 text-ink-soft hover:text-ink">
          <X className="h-5 w-5" aria-hidden />
        </Link>
      </div>

      {etapa === 'inicio' && (
        <div className="space-y-5">
          <div>
            <h1 className="mb-2 text-2xl font-bold">Treinar as manobras de engasgo</h1>
            <p className="text-ink-soft">
              3 minutos: reveja os passos e responda 5 cenários. Habilidades de socorro se perdem
              em cerca de 3 meses — treinar de novo de tempos em tempos é o que mantém a resposta
              pronta.
            </p>
          </div>
          <p className="rounded-xl bg-warn-soft p-4 text-sm">
            <strong>Isto é um treino.</strong> Numa emergência real, use o botão vermelho no topo
            do app e ligue 192. E a tela não substitui praticar os gestos: treine os movimentos
            numa boneca ou almofada, e procure um curso presencial de primeiros socorros.
          </p>
          <button
            onClick={() => setEtapa('passos')}
            className="w-full rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
          >
            Começar o treino
          </button>
        </div>
      )}

      {etapa === 'passos' && (
        <div className="space-y-5">
          <h1 className="text-xl font-bold">Passo 1 de 2: releia as manobras</h1>
          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-bold">Bebês MENORES de 1 ano — sem Heimlich</h2>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <IlustracaoManobra quadro="golpes" className="rounded-xl bg-cream p-1" />
              <IlustracaoManobra quadro="compressoes" className="rounded-xl bg-cream p-1" />
            </div>
            <ListaPassosTreino passos={socorroMenor1Ano} />
            <p className="mb-2 mt-5 text-sm font-semibold">Passo a passo ilustrado</p>
            <GaleriaManobras faixa="menor1ano" />
          </section>
          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-bold">
              Crianças MAIORES de 1 ano — golpes nas costas + compressões abdominais
            </h2>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <IlustracaoManobra quadro="golpesMaior1Ano" className="rounded-xl bg-cream p-1" />
              <IlustracaoManobra quadro="heimlich" className="rounded-xl bg-cream p-1" />
            </div>
            <ListaPassosTreino passos={socorroMaior1Ano} />
            <p className="mb-2 mt-5 text-sm font-semibold">Passo a passo ilustrado</p>
            <GaleriaManobras faixa="maior1ano" />
          </section>
          <button
            onClick={() => setEtapa('quiz')}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
          >
            Passo 2: me teste
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}

      {etapa === 'quiz' && (
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            Cenário {questao + 1} de {quizEngasgo.length}
          </p>
          <h1 className="text-xl font-bold">{q.cenario}</h1>
          <div className="space-y-2" role="group" aria-label="Opções de resposta">
            {q.opcoes.map((opcao, idx) => {
              const estado =
                respondida === null
                  ? 'border-stone-200 bg-white hover:border-primary'
                  : idx === q.corretaIdx
                    ? 'border-primary bg-primary-soft'
                    : idx === respondida
                      ? 'border-danger bg-danger-soft'
                      : 'border-stone-200 bg-white opacity-60';
              return (
                <button
                  key={idx}
                  onClick={() => responder(idx)}
                  disabled={respondida !== null}
                  className={`w-full rounded-xl border-2 p-4 text-left text-sm font-medium transition-colors ${estado}`}
                >
                  {opcao}
                </button>
              );
            })}
          </div>
          {respondida !== null && (
            <div className="space-y-3">
              <p
                className={`rounded-xl p-4 text-sm ${
                  respondida === q.corretaIdx ? 'bg-primary-soft' : 'bg-warn-soft'
                }`}
              >
                <strong>{respondida === q.corretaIdx ? 'Isso!' : 'Quase —'}</strong> {q.explicacao}
              </p>
              <button
                onClick={proximaQuestao}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
              >
                {questao < quizEngasgo.length - 1 ? 'Próximo cenário' : 'Concluir treino'}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          )}
        </div>
      )}

      {etapa === 'fim' && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-primary p-5 text-white">
            <h1 className="mb-1 text-xl font-bold">
              Treino concluído — {acertos} de {quizEngasgo.length} cenários
            </h1>
            <p className="text-sm text-white/90">
              Registrado em {new Date().toLocaleDateString('pt-BR')}. Recomendamos repetir a cada
              3 meses: é o intervalo em que as habilidades começam a se perder.
            </p>
          </div>
          {acertos < quizEngasgo.length && (
            <p className="rounded-xl bg-warn-soft p-4 text-sm">
              Errar aqui é o melhor lugar para errar. Vale reler as manobras e refazer o treino
              agora — leva 3 minutos.
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={gerarIcs}
              className="rounded-xl border-2 border-primary py-3 font-bold text-primary hover:bg-primary-soft"
            >
              Lembrete trimestral no calendário
            </button>
            <button
              onClick={() => {
                setEtapa('passos');
                setQuestao(0);
                setRespondida(null);
                setAcertos(0);
              }}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-stone-300 py-3 font-bold text-ink-soft hover:bg-stone-100"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
              Treinar de novo
            </button>
          </div>
          <p className="text-sm text-ink-soft">
            O quiz familiariza — não certifica. Um curso presencial de primeiros socorros para
            pais continua sendo o padrão-ouro.
          </p>
        </div>
      )}
    </div>
  );
}
