import { sinaisReacaoAlergica } from '@/content/seguranca';
import { usePersistido } from '@/lib/storage';
import { AlertTriangle, Camera, Check, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

/**
 * Registro guiado de reação a alimento.
 * Desenho de segurança: a triagem vem ANTES de qualquer formulário — um
 * único sinal grave leva direto ao 192, sem burocracia no caminho. O
 * registro é para a reação leve, que é a que precisa de memória (padrões
 * valem mais que episódios para o diagnóstico no consultório).
 *
 * VALIDADO (pediatra responsável, 25/07/2026): arquitetura da triagem
 * (grave-primeiro, "na dúvida trate como grave"), orientações "enquanto o
 * socorro não chega" (sem posicionamento e sem antialérgico, de propósito)
 * e conduta pós-reação leve (suspender até conversar com o pediatra).
 */

interface RegistroDiario {
  id: string;
  data: string;
  hora: string;
  refeicao: string;
  alimentos: string;
  sintomas: string[];
  notas: string;
}

type Etapa = 'triagem' | 'grave' | 'leve' | 'salvo';

export default function Reacao() {
  const [, setRegistros] = usePersistido<RegistroDiario[]>('diario', []);
  const [etapa, setEtapa] = useState<Etapa>('triagem');
  const [alimento, setAlimento] = useState('');
  const [sinaisMarcados, setSinaisMarcados] = useState<string[]>([]);
  const [notas, setNotas] = useState('');

  const alternarSinal = (s: string) =>
    setSinaisMarcados(prev => (prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]));

  const salvar = () => {
    const agora = new Date();
    setRegistros(prev => [
      {
        id: crypto.randomUUID(),
        data: agora.toISOString().slice(0, 10),
        hora: `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`,
        refeicao: 'Reação a alimento (registro guiado)',
        alimentos: alimento.trim() || 'não informado',
        sintomas: sinaisMarcados.length ? sinaisMarcados : ['Reação leve'],
        notas: notas.trim(),
      },
      ...prev,
    ]);
    setEtapa('salvo');
  };

  return (
    <div className="space-y-6">
      {etapa === 'triagem' && (
        <>
          <div>
            <h1 className="mb-2 text-2xl font-bold">O bebê reagiu a um alimento?</h1>
            <p className="text-ink-soft">
              Primeiro o mais importante. Olhe para o bebê agora e responda:
            </p>
          </div>

          <div className="rounded-2xl border-2 border-danger bg-danger-soft p-5">
            <h2 className="mb-3 font-bold text-danger">Algum destes sinais AGORA?</h2>
            <ul className="mb-4 space-y-2 text-sm">
              {sinaisReacaoAlergica.grave.sinais.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setEtapa('grave')}
              className="w-full rounded-xl bg-danger py-3.5 text-lg font-extrabold text-white hover:opacity-90"
            >
              SIM — tem pelo menos um
            </button>
          </div>

          <button
            onClick={() => setEtapa('leve')}
            className="w-full rounded-xl border-2 border-primary py-3.5 font-bold text-primary hover:bg-primary-soft"
          >
            Não — nenhum desses. Registrar a reação leve
          </button>

          <p className="text-sm text-ink-soft">
            Na dúvida entre leve e grave, trate como grave: aperte o botão vermelho.
          </p>
        </>
      )}

      {etapa === 'grave' && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-danger p-6 text-white">
            <h1 className="mb-2 text-2xl font-extrabold">Ligue 192 agora</h1>
            <p className="mb-4 text-white/90">
              Sinais de reação grave pedem atendimento imediato — não espere passar.
            </p>
            <a
              href="tel:192"
              className="flex items-center justify-center gap-3 rounded-2xl bg-white py-5 text-2xl font-extrabold text-danger hover:opacity-90"
            >
              <Phone className="h-7 w-7" aria-hidden />
              LIGAR 192 (SAMU)
            </a>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-bold">Enquanto o socorro não chega</h2>
            <ul className="space-y-2 text-sm">
              <li>• Siga as orientações do atendente do 192 — ele guia você pelo telefone.</li>
              <li>• Não ofereça mais nenhum alimento, água ou remédio por conta própria.</li>
              <li>
                • Se o bebê tem caneta/medicação de emergência prescrita pelo médico (casos de
                alergia já diagnosticada), use conforme a orientação que recebeu.
              </li>
              <li>• Fique com o bebê no colo, acordado e sob seus olhos, até o socorro chegar.</li>
            </ul>
          </div>
          <p className="text-sm text-ink-soft">
            Depois do atendimento, volte aqui e registre o episódio — o registro ajuda o pediatra
            e o alergista na investigação.
          </p>
          <button
            onClick={() => setEtapa('leve')}
            className="w-full rounded-xl border-2 border-stone-300 py-3 font-semibold text-ink-soft hover:bg-stone-100"
          >
            Registrar o episódio (depois do atendimento)
          </button>
        </div>
      )}

      {etapa === 'leve' && (
        <div className="space-y-5">
          <div>
            <h1 className="mb-2 text-2xl font-bold">Registrar a reação</h1>
            <p className="text-ink-soft">
              Padrões valem mais que episódios isolados: este registro é o que o pediatra vai
              querer ver na consulta.
            </p>
          </div>

          <p className="flex items-start gap-2 rounded-xl bg-primary-soft p-4 text-sm">
            <Camera className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>
              <strong>Antes de tudo: fotografe a pele agora.</strong> Vermelhidão some em horas —
              a foto no celular vale mais que qualquer descrição no consultório.
            </span>
          </p>

          <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div>
              <label htmlFor="r-alimento" className="mb-1 block text-sm font-semibold">
                Qual alimento você suspeita?
              </label>
              <input
                id="r-alimento"
                type="text"
                placeholder="Ex.: ovo mexido, ~2 colheres, no almoço"
                value={alimento}
                onChange={e => setAlimento(e.target.value)}
                className="w-full rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-semibold">O que você observou?</legend>
              <div className="flex flex-wrap gap-2">
                {sinaisReacaoAlergica.leve.sinais.map(s => (
                  <label
                    key={s}
                    className={`cursor-pointer rounded-full border-2 px-3 py-1.5 text-sm ${
                      sinaisMarcados.includes(s)
                        ? 'border-warn bg-warn-soft'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={sinaisMarcados.includes(s)}
                      onChange={() => alternarSinal(s)}
                      className="sr-only"
                    />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="r-notas" className="mb-1 block text-sm font-semibold">
                Observações (horário, quanto tempo depois de comer, evolução…)
              </label>
              <textarea
                id="r-notas"
                rows={2}
                value={notas}
                onChange={e => setNotas(e.target.value)}
                className="w-full resize-none rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
              />
            </div>

            <button
              onClick={salvar}
              className="w-full rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
            >
              Salvar no diário
            </button>
          </div>

          <div className="rounded-xl bg-warn-soft p-4 text-sm">
            <strong>E agora?</strong> Suspenda esse alimento até conversar com o pediatra, e
            observe o bebê nas próximas horas.{' '}
            <strong>Se aparecer qualquer sinal grave (inchaço, chiado, moleza), é 192 na hora.</strong>
          </div>
        </div>
      )}

      {etapa === 'salvo' && (
        <div className="space-y-5">
          <div className="rounded-2xl bg-primary p-5 text-white">
            <h1 className="mb-1 flex items-center gap-2 text-xl font-bold">
              <Check className="h-6 w-6" aria-hidden />
              Registrado no diário
            </h1>
            <p className="text-sm text-white/90">
              O episódio está salvo com data e hora — vai aparecer no diário e no relatório da
              consulta.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/seguranca/rastreador"
              className="rounded-xl border-2 border-primary p-4 text-center font-bold text-primary hover:bg-primary-soft"
            >
              Marcar no rastreador de alergênicos
            </Link>
            <Link
              href="/diario"
              className="rounded-xl border-2 border-stone-300 p-4 text-center font-semibold text-ink-soft hover:bg-stone-100"
            >
              Ver o diário
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
