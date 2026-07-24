import BannerBebe, { useNascimento } from '@/components/BannerBebe';
import Expansivel from '@/components/Expansivel';
import { metodos, sinaisProntidao } from '@/content/fases';
import { perguntasFAQ } from '@/content/faq';
import { calcularIdade, descreverIdade } from '@/lib/idade';
import { usePersistido } from '@/lib/storage';
import { Baby, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

const primeiraSemana = [
  'Antes do primeiro garfo: aprenda as manobras de engasgo (tela Segurança) e providencie uma cadeira em que o bebê fique sentado e ereto',
  'Comece pelo almoço: uma papa amassada com fonte de ferro (carne, frango ou ovo inteiro) + cereal ou tubérculo + leguminosa + legume',
  'Nos lanches, fruta amassada ou raspada; água no copo junto das refeições',
  'Quantidade: 2–3 colheres de sopa já são um ótimo começo. Recusou? Tudo bem — reofereça outro dia, sem insistência',
  'Ao longo das primeiras semanas, introduza os alergênicos um a um pela manhã (ovo primeiro é uma boa escolha), observando o bebê depois',
  'Fezes vão mudar de cor e cheiro — é o esperado com comida de verdade',
];

export default function Comecar() {
  const [nascimento, setNascimento] = useNascimento();
  const [rascunhoData, setRascunhoData] = useState(nascimento);
  const [erroData, setErroData] = useState('');
  const [marcados, setMarcados] = usePersistido<string[]>('sinais-prontidao', []);

  const idade = calcularIdade(nascimento);
  const hojeISO = new Date().toISOString().slice(0, 10);

  const salvarData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rascunhoData) {
      setErroData('Informe a data de nascimento.');
      return;
    }
    if (!calcularIdade(rascunhoData)) {
      setErroData('Confira a data — ela não pode estar no futuro.');
      return;
    }
    setErroData('');
    setNascimento(rascunhoData);
  };

  const alternarSinal = (id: string) =>
    setMarcados(prev => (prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]));

  const todosMarcados = marcados.length === sinaisProntidao.length;

  return (
    <div className="space-y-10">
      <BannerBebe />

      {/* Data de nascimento — informada uma vez, usada no app inteiro */}
      <section aria-labelledby="titulo-inicio">
        <h1 id="titulo-inicio" className="mb-2 text-2xl font-bold">
          Introdução alimentar, sem pânico
        </h1>
        <p className="mb-5 text-ink-soft">
          Um guia prático para famílias, do primeiro amassadinho à comida da família. Informe a
          data de nascimento e o app mostra o que vale para o SEU bebê, em cada tela.
        </p>

        <form
          onSubmit={salvarData}
          className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
        >
          <label htmlFor="nascimento" className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Baby className="h-4 w-4 text-primary" aria-hidden />
            Data de nascimento do bebê
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="nascimento"
              type="date"
              max={hojeISO}
              value={rascunhoData}
              onChange={e => setRascunhoData(e.target.value)}
              className="flex-1 rounded-lg border-2 border-stone-200 px-4 py-2.5 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white hover:opacity-90"
            >
              {nascimento ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
          {erroData && (
            <p role="alert" className="mt-2 text-sm text-danger">
              {erroData}
            </p>
          )}
          {idade && (
            <p className="mt-3 text-sm text-ink-soft">
              Idade hoje: <strong className="text-ink">{descreverIdade(idade)}</strong>. Os dados
              ficam somente neste aparelho.
            </p>
          )}
        </form>
      </section>

      {/* Sinais de prontidão — com trava de idade */}
      <section aria-labelledby="titulo-prontidao">
        <h2 id="titulo-prontidao" className="mb-2 text-xl font-bold">
          Seu bebê está pronto?
        </h2>
        <p className="mb-4 text-sm text-ink-soft">
          A introdução alimentar começa por volta dos 6 meses, quando idade E sinais de prontidão
          se encontram.
        </p>
        <div className="space-y-2">
          {sinaisProntidao.map(sinal => (
            <label
              key={sinal.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors ${
                marcados.includes(sinal.id)
                  ? 'border-primary bg-primary-soft'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <input
                type="checkbox"
                checked={marcados.includes(sinal.id)}
                onChange={() => alternarSinal(sinal.id)}
                className="h-5 w-5 accent-primary"
              />
              <span>{sinal.label}</span>
            </label>
          ))}
        </div>

        {todosMarcados && idade && idade.meses >= 6 && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border-2 border-primary bg-primary-soft p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm">
              <strong>Sinais presentes e idade adequada.</strong> Confirme com o pediatra na
              consulta e boas primeiras papas! O passo a passo da primeira semana está logo
              abaixo.
            </p>
          </div>
        )}
        {todosMarcados && idade && idade.meses < 6 && (
          <div className="mt-4 rounded-xl border-2 border-warn bg-warn-soft p-4 text-sm">
            <strong>Calma — ainda não.</strong> Mesmo com todos os sinais marcados, antes dos 6
            meses a recomendação é manter apenas leite materno (ou fórmula). Antecipar o início
            só deve acontecer com indicação expressa do pediatra.
          </div>
        )}
        {todosMarcados && !idade && (
          <div className="mt-4 rounded-xl border-2 border-warn bg-warn-soft p-4 text-sm">
            <strong>Falta a idade.</strong> Informe a data de nascimento acima para o app conferir
            se, além dos sinais, o bebê já está na janela dos 6 meses.
          </div>
        )}
      </section>

      {/* Primeira semana */}
      <section aria-labelledby="titulo-semana">
        <h2 id="titulo-semana" className="mb-4 text-xl font-bold">
          A primeira semana, passo a passo
        </h2>
        <ol className="space-y-3">
          {primeiraSemana.map((passo, i) => (
            <li key={i} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              <span className="text-sm">{passo}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-ink-soft">
          Detalhes de cada fase — texturas, esquema do dia, quantidades — na tela{' '}
          <Link href="/fases" className="font-medium text-primary underline">
            Fases
          </Link>
          .
        </p>
      </section>

      {/* Métodos */}
      <section aria-labelledby="titulo-metodos">
        <h2 id="titulo-metodos" className="mb-2 text-xl font-bold">
          Colher, BLW ou os dois?
        </h2>
        <p className="mb-4 text-sm text-ink-soft">
          Não existe método único certo — existe o que funciona para o seu bebê e a sua rotina,
          com segurança.
        </p>
        <div className="space-y-3">
          {metodos.map(metodo => (
            <Expansivel
              key={metodo.id}
              titulo={`${metodo.icone} ${metodo.nome}`}
              subtitulo={metodo.descricao}
            >
              <ul className="space-y-2 text-sm">
                {metodo.pontos.map((ponto, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="text-primary">
                      •
                    </span>
                    {ponto}
                  </li>
                ))}
              </ul>
            </Expansivel>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="titulo-faq">
        <h2 id="titulo-faq" className="mb-4 text-xl font-bold">
          Dúvidas frequentes
        </h2>
        <div className="space-y-3">
          {perguntasFAQ.map(item => (
            <Expansivel key={item.id} titulo={item.pergunta} subtitulo={item.categoria}>
              <p className="text-sm leading-relaxed">{item.resposta}</p>
            </Expansivel>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
          Não achou sua dúvida? Cada bebê é único — leve a pergunta para a consulta com o
          pediatra.
        </p>
      </section>
    </div>
  );
}
