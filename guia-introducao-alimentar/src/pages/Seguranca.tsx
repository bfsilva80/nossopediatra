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
import { useTreino } from '@/pages/Treino';
import { AlertTriangle, GraduationCap, Phone, ShieldAlert } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useRoute } from 'wouter';

type StatusAlergenico = 'nao' | 'ok' | 'reacao';
type RegistroAlergenicos = Record<string, { status: StatusAlergenico; data: string }>;

/**
 * Arquitetura da tela, por hierarquia de urgência:
 * 1) "Agir agora": engasgo + anafilaxia + 192, visíveis sem rolagem;
 * 2) índice de seções (rolagem programática — âncora #id colidiria com o hash router);
 * 3) aprendizado e prevenção (engasgo → alergênicos → sinais de alerta).
 * O conteúdo de emergência se repete de forma compacta no topo de propósito:
 * reconhecimento não pode depender de descoberta por rolagem.
 */

const secoes = [
  { id: 'sec-engasgo', rotulo: 'Engasgo e prevenção' },
  { id: 'sec-alergenicos', rotulo: 'Alergênicos e reações' },
  { id: 'sec-alerta', rotulo: 'Quando procurar ajuda' },
];

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
  const [treino] = useTreino();

  // Deep-link por seção (/seguranca/alergenicos etc.) — âncora #id não
  // funciona com o roteamento por hash, então rolamos ao montar.
  const [, params] = useRoute('/seguranca/:secao');
  useEffect(() => {
    const alvo = params?.secao ? `sec-${params.secao}` : null;
    const alvosValidos = [...secoes.map(s => s.id), 'sec-rastreador'];
    if (alvo && alvosValidos.includes(alvo)) {
      // instantâneo: em aterrissagem de rota, animar a rolagem só atrasa
      requestAnimationFrame(() =>
        document.getElementById(alvo)?.scrollIntoView({ block: 'start', behavior: 'instant' })
      );
    }
  }, [params?.secao]);

  const marcar = (id: string, status: StatusAlergenico) =>
    setRegistro(prev => ({
      ...prev,
      [id]: { status, data: new Date().toISOString().slice(0, 10) },
    }));

  const rolarPara = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="space-y-10">
      {/* ——— Nível 1: agir agora (sem rolagem) ——— */}
      <section aria-labelledby="titulo-agir" className="rounded-2xl bg-danger p-5 text-white">
        <h1 id="titulo-agir" className="mb-3 text-xl font-bold">
          Emergência: agir agora
        </h1>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/emergencia"
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-4 text-center font-extrabold text-danger hover:opacity-90"
          >
            <AlertTriangle className="h-6 w-6" aria-hidden />
            Engasgo: passo a passo
          </Link>
          <a
            href="tel:192"
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/15 p-4 text-center hover:bg-white/25"
          >
            <Phone className="h-6 w-6" aria-hidden />
            <span className="text-sm">SAMU</span>
            <span className="text-2xl font-extrabold leading-none">192</span>
          </a>
        </div>
        <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm">
          <strong>Reação alérgica grave?</strong> Inchaço de rosto ou língua, chiado ou
          dificuldade para respirar, urticária pelo corpo, moleza ou desmaio após um alimento:{' '}
          <a href="tel:192" className="font-bold underline">
            ligue 192 agora
          </a>
          .
        </p>
        <p className="mt-2 text-xs text-white/70">
          Bombeiros: <a href="tel:193" className="underline">193</a> · Depois de qualquer engasgo
          real com manobras, leve o bebê para avaliação médica no mesmo dia.
        </p>
      </section>

      {/* ——— Nível 2: índice — cada seção a um toque, sem depender de rolagem ——— */}
      <nav aria-label="Seções de segurança" className="flex gap-2 overflow-x-auto pb-1">
        {secoes.map(s => (
          <button
            key={s.id}
            onClick={() => rolarPara(s.id)}
            className="shrink-0 rounded-full border-2 border-stone-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-soft hover:border-primary"
          >
            {s.rotulo}
          </button>
        ))}
      </nav>

      {/* ——— Seção: engasgo e prevenção ——— */}
      <section id="sec-engasgo" aria-labelledby="titulo-gag" className="scroll-mt-20 space-y-6">
        <div>
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
        </div>

        <div>
          <h2 className="mb-2 text-xl font-bold">Desobstrução: aprenda antes de precisar</h2>
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
          <Link
            href="/treino"
            className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-primary bg-primary-soft p-4 hover:opacity-90"
          >
            <GraduationCap className="h-6 w-6 shrink-0 text-primary" aria-hidden />
            <span className="text-sm">
              <span className="block font-bold text-primary">
                Treinar as manobras (3 minutos)
              </span>
              <span className="text-ink-soft">
                {treino.ultimoTreino
                  ? `Último treino: ${treino.ultimoTreino.split('-').reverse().join('/')}. Habilidades se perdem em ~3 meses.`
                  : 'Ler não é o mesmo que saber fazer — teste-se em 5 cenários rápidos.'}
              </span>
            </span>
          </Link>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-bold">Prevenção: o formato importa mais que o alimento</h2>
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
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Alimento
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Como oferecer
                  </th>
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
        </div>
      </section>

      {/* ——— Seção: alergênicos — reconhecer reação vem ANTES do rastreador ——— */}
      <section id="sec-alergenicos" aria-labelledby="titulo-alergenicos" className="scroll-mt-20 space-y-6">
        <div>
          <h2 id="titulo-alergenicos" className="mb-2 text-xl font-bold">
            Alergênicos: cedo, um por vez, com regularidade
          </h2>
          <ul className="space-y-2 rounded-2xl bg-white p-5 text-sm shadow-sm">
            {orientacaoAlergenicos.map((o, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-primary">
                  •
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Reação alérgica: leve ou grave?</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-warn bg-warn-soft p-5">
              <h4 className="mb-3 font-bold">{sinaisReacaoAlergica.leve.titulo}</h4>
              <ul className="mb-3 space-y-1.5 text-sm">
                {sinaisReacaoAlergica.leve.sinais.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
              <p className="text-sm font-medium">{sinaisReacaoAlergica.leve.conduta}</p>
            </div>
            <div className="rounded-2xl border-2 border-danger bg-danger-soft p-5">
              <h4 className="mb-3 font-bold text-danger">{sinaisReacaoAlergica.grave.titulo}</h4>
              <ul className="mb-3 space-y-1.5 text-sm">
                {sinaisReacaoAlergica.grave.sinais.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
              <p className="text-sm font-medium">{sinaisReacaoAlergica.grave.conduta}</p>
            </div>
          </div>
        </div>

        <div id="sec-rastreador" className="scroll-mt-20">
          <h3 className="mb-3 text-lg font-bold">Rastreador — marque conforme for oferecendo</h3>
          <ul className="space-y-2">
            {alergenicos.map(a => {
              const estado = registro[a.id];
              return (
                <li key={a.id} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
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
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-ink-soft">
            Registrou uma reação? Detalhe no Diário (alimento, quantidade, horário, foto da pele) e
            leve à consulta. Reação grave é 192, sempre.
          </p>
        </div>
      </section>

      {/* ——— Seção: sinais de alerta gerais ——— */}
      <section id="sec-alerta" aria-labelledby="titulo-alerta" className="scroll-mt-20">
        <h2 id="titulo-alerta" className="mb-4 text-xl font-bold">
          Quando procurar ajuda
        </h2>
        <ul className="space-y-3">
          {sinaisAlerta.map(sinal => (
            <li
              key={sinal.id}
              className={`rounded-xl border-l-4 bg-white p-4 shadow-sm ${
                sinal.gravidade === 'emergencia' ? 'border-danger' : 'border-warn'
              }`}
            >
              <p className="mb-1 font-semibold">
                <span aria-hidden>{sinal.gravidade === 'emergencia' ? '🚨 ' : '📋 '}</span>
                {sinal.titulo}
              </p>
              <p className="text-sm text-ink-soft">{sinal.descricao}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
          E vale sempre: confie no seu instinto. Se algo não parece certo com o seu bebê, procurar
          o pediatra nunca é exagero.
        </p>
      </section>
    </div>
  );
}
