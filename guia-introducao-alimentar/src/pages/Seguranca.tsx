import BannerBebe from '@/components/BannerBebe';
import Expansivel from '@/components/Expansivel';
import {
  alergenicos,
  avisoTreinamento,
  cortesSeguro,
  gagVsEngasgo,
  orientacaoAlergenicos,
  regrasDeOuroEngasgo,
  sinaisAlerta,
  sinaisReacaoAlergica,
  socorroMaior1Ano,
  socorroMenor1Ano,
  type PassoSocorro,
} from '@/content/seguranca';
import { usePersistido } from '@/lib/storage';
import { Phone, ShieldAlert } from 'lucide-react';

type StatusAlergenico = 'nao' | 'ok' | 'reacao';
type RegistroAlergenicos = Record<string, { status: StatusAlergenico; data: string }>;

function ListaPassos({ passos }: { passos: PassoSocorro[] }) {
  return (
    <ol className="space-y-3">
      {passos.map((p, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger text-xs font-bold text-white"
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

export default function Seguranca() {
  const [registro, setRegistro] = usePersistido<RegistroAlergenicos>('alergenicos', {});

  const marcar = (id: string, status: StatusAlergenico) =>
    setRegistro(prev => ({
      ...prev,
      [id]: { status, data: new Date().toISOString().slice(0, 10) },
    }));

  return (
    <div className="space-y-10">
      <BannerBebe />

      {/* Emergência sempre no topo */}
      <section
        aria-labelledby="titulo-emergencia"
        className="rounded-2xl bg-danger p-5 text-white"
      >
        <h1 id="titulo-emergencia" className="mb-3 flex items-center gap-2 text-xl font-bold">
          <Phone className="h-5 w-5" aria-hidden /> Emergência
        </h1>
        <div className="grid grid-cols-2 gap-3">
          <a href="tel:192" className="rounded-xl bg-white/15 p-4 text-center hover:bg-white/25">
            <span className="block text-sm">SAMU</span>
            <span className="block text-3xl font-bold">192</span>
          </a>
          <a href="tel:193" className="rounded-xl bg-white/15 p-4 text-center hover:bg-white/25">
            <span className="block text-sm">Bombeiros</span>
            <span className="block text-3xl font-bold">193</span>
          </a>
        </div>
      </section>

      {/* Gag vs engasgo */}
      <section aria-labelledby="titulo-gag">
        <h2 id="titulo-gag" className="mb-2 text-xl font-bold">
          Careta e tosse não são engasgo
        </h2>
        <p className="mb-4 text-sm text-ink-soft">
          Saber a diferença tira o pânico da mesa — e ensina quando (não) intervir.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-primary bg-primary-soft p-5">
            <h3 className="mb-3 font-bold">{gagVsEngasgo.gag.titulo}</h3>
            <ul className="mb-3 space-y-1.5 text-sm">
              {gagVsEngasgo.gag.sinais.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
            <p className="text-sm font-medium">{gagVsEngasgo.gag.conduta}</p>
          </div>
          <div className="rounded-2xl border-2 border-danger bg-danger-soft p-5">
            <h3 className="mb-3 font-bold text-danger">{gagVsEngasgo.engasgo.titulo}</h3>
            <ul className="mb-3 space-y-1.5 text-sm">
              {gagVsEngasgo.engasgo.sinais.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
            <p className="text-sm font-medium">{gagVsEngasgo.engasgo.conduta}</p>
          </div>
        </div>
      </section>

      {/* Manobras */}
      <section aria-labelledby="titulo-manobras">
        <h2 id="titulo-manobras" className="mb-2 text-xl font-bold">
          Desobstrução: o que fazer
        </h2>
        <p className="mb-4 rounded-xl bg-warn-soft p-4 text-sm">
          <ShieldAlert className="mr-1 inline h-4 w-4 text-warn" aria-hidden />
          {avisoTreinamento}
        </p>
        <div className="space-y-3">
          <Expansivel
            titulo="Bebês MENORES de 1 ano"
            subtitulo="Golpes nas costas + compressões no peito — NÃO use a manobra de Heimlich"
            abertoInicial
          >
            <ListaPassos passos={socorroMenor1Ano} />
          </Expansivel>
          <Expansivel
            titulo="Crianças MAIORES de 1 ano"
            subtitulo="Manobra de Heimlich (compressões abdominais)"
          >
            <ListaPassos passos={socorroMaior1Ano} />
          </Expansivel>
        </div>
      </section>

      {/* Prevenção e cortes */}
      <section aria-labelledby="titulo-prevencao">
        <h2 id="titulo-prevencao" className="mb-2 text-xl font-bold">
          Prevenção: o formato importa mais que o alimento
        </h2>
        <ul className="mb-4 space-y-2 rounded-2xl bg-white p-5 text-sm shadow-sm">
          {regrasDeOuroEngasgo.map((regra, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-primary">
                ✓
              </span>
              {regra}
            </li>
          ))}
        </ul>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <caption className="sr-only">Como oferecer cada alimento com segurança</caption>
            <thead>
              <tr className="bg-stone-100 text-left">
                <th className="px-4 py-3 font-semibold">Alimento</th>
                <th className="px-4 py-3 font-semibold">Como oferecer</th>
              </tr>
            </thead>
            <tbody>
              {cortesSeguro.map((c, i) => (
                <tr key={i} className="border-t border-stone-100 align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium">{c.alimento}</p>
                    <p className="text-xs text-ink-soft">{c.risco}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{c.comoOferecer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Alergênicos + rastreador */}
      <section aria-labelledby="titulo-alergenicos">
        <h2 id="titulo-alergenicos" className="mb-2 text-xl font-bold">
          Alergênicos: cedo, um por vez, com regularidade
        </h2>
        <ul className="mb-5 space-y-2 rounded-2xl bg-white p-5 text-sm shadow-sm">
          {orientacaoAlergenicos.map((o, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-primary">
                •
              </span>
              {o}
            </li>
          ))}
        </ul>

        <h3 className="mb-3 font-semibold">Rastreador — marque conforme for oferecendo</h3>
        <div className="space-y-2">
          {alergenicos.map(a => {
            const estado = registro[a.id];
            return (
              <div key={a.id} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-semibold">
                    <span aria-hidden className="mr-1">
                      {a.icone}
                    </span>
                    {a.nome}
                  </p>
                  {estado?.status === 'ok' && (
                    <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
                      sem reação · {estado.data.split('-').reverse().join('/')}
                    </span>
                  )}
                  {estado?.status === 'reacao' && (
                    <span className="rounded-full bg-danger-soft px-2.5 py-1 text-xs font-bold text-danger">
                      teve reação · {estado.data.split('-').reverse().join('/')}
                    </span>
                  )}
                </div>
                <p className="mb-3 text-xs text-ink-soft">{a.comoOferecer}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => marcar(a.id, 'ok')}
                    className="rounded-full border-2 border-primary px-3 py-1 text-xs font-semibold text-primary hover:bg-primary-soft"
                  >
                    Ofereci, sem reação
                  </button>
                  <button
                    onClick={() => marcar(a.id, 'reacao')}
                    className="rounded-full border-2 border-danger px-3 py-1 text-xs font-semibold text-danger hover:bg-danger-soft"
                  >
                    Teve reação
                  </button>
                  {estado && (
                    <button
                      onClick={() => marcar(a.id, 'nao')}
                      className="rounded-full px-3 py-1 text-xs text-ink-soft underline"
                    >
                      limpar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink-soft">
          Registrou uma reação? Detalhe no Diário (alimento, quantidade, horário, foto da pele) e
          leve à consulta. Reação grave é 192, sempre.
        </p>
      </section>

      {/* Reações alérgicas */}
      <section aria-labelledby="titulo-reacoes">
        <h2 id="titulo-reacoes" className="mb-4 text-xl font-bold">
          Reação alérgica: leve ou grave?
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-warn bg-warn-soft p-5">
            <h3 className="mb-3 font-bold">{sinaisReacaoAlergica.leve.titulo}</h3>
            <ul className="mb-3 space-y-1.5 text-sm">
              {sinaisReacaoAlergica.leve.sinais.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
            <p className="text-sm font-medium">{sinaisReacaoAlergica.leve.conduta}</p>
          </div>
          <div className="rounded-2xl border-2 border-danger bg-danger-soft p-5">
            <h3 className="mb-3 font-bold text-danger">{sinaisReacaoAlergica.grave.titulo}</h3>
            <ul className="mb-3 space-y-1.5 text-sm">
              {sinaisReacaoAlergica.grave.sinais.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
            <p className="text-sm font-medium">{sinaisReacaoAlergica.grave.conduta}</p>
          </div>
        </div>
      </section>

      {/* Sinais de alerta gerais */}
      <section aria-labelledby="titulo-alerta">
        <h2 id="titulo-alerta" className="mb-4 text-xl font-bold">
          Quando procurar ajuda
        </h2>
        <div className="space-y-3">
          {sinaisAlerta.map(sinal => (
            <div
              key={sinal.id}
              className={`rounded-xl border-l-4 bg-white p-4 shadow-sm ${
                sinal.gravidade === 'emergencia' ? 'border-danger' : 'border-warn'
              }`}
            >
              <p className="mb-1 font-semibold">
                {sinal.gravidade === 'emergencia' ? '🚨 ' : '📋 '}
                {sinal.titulo}
              </p>
              <p className="text-sm text-ink-soft">{sinal.descricao}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
          E vale sempre: confie no seu instinto. Se algo não parece certo com o seu bebê, procurar
          o pediatra nunca é exagero.
        </p>
      </section>
    </div>
  );
}
