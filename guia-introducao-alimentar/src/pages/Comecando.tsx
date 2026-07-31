import BannerBebe, { useNascimento } from '@/components/BannerBebe';
import { sinaisProntidao } from '@/content/fases';
import { calcularIdade } from '@/lib/idade';
import { usePersistido } from '@/lib/storage';
import { CheckCircle2, Scale } from 'lucide-react';
import { Link } from 'wouter';

const primeiraSemana = [
  'Antes do primeiro garfo: aprenda as manobras de engasgo (tela Segurança) e providencie uma cadeira em que o bebê fique sentado e ereto',
  'Comece pelo almoço: uma papa amassada com fonte de ferro (carne, frango ou ovo inteiro) + cereal ou tubérculo + leguminosa + legume',
  'Nos lanches, fruta amassada ou raspada; água no copo junto das refeições',
  'Quantidade: 2–3 colheres de sopa já são um ótimo começo. Recusou? Tudo bem — reofereça outro dia, sem insistência',
  'Ao longo das primeiras semanas, introduza os alergênicos um a um pela manhã (ovo primeiro é uma boa escolha), observando o bebê depois',
  'Fezes vão mudar de cor e cheiro — é o esperado com comida de verdade',
];

export default function Comecando() {
  const [nascimento] = useNascimento();
  const idade = calcularIdade(nascimento);
  const [marcados, setMarcados] = usePersistido<string[]>('sinais-prontidao', []);

  const alternarSinal = (id: string) =>
    setMarcados(prev => (prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]));

  const todosMarcados = marcados.length === sinaisProntidao.length;

  return (
    <div className="space-y-10">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Como começar</h1>
        <p className="text-ink-soft">
          A introdução alimentar começa por volta dos 6 meses, quando idade E sinais de prontidão
          se encontram.
        </p>
      </div>

      {/* Sinais de prontidão — com trava de idade */}
      <section aria-labelledby="titulo-prontidao">
        <h2 id="titulo-prontidao" className="mb-4 text-xl font-bold">
          Seu bebê está pronto?
        </h2>
        <div className="space-y-2">
          {sinaisProntidao.map(sinal => (
            <label
              key={sinal.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors ${
                marcados.includes(sinal.id)
                  ? 'border-primary bg-surf-azul'
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
          <div className="mt-4 flex items-start gap-3 rounded-xl border-2 border-primary bg-surf-azul p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm">
              <strong>Sinais presentes e idade adequada.</strong> Confirme com o pediatra na
              consulta e boas primeiras papas! O passo a passo da primeira semana está logo abaixo.
            </p>
          </div>
        )}
        {todosMarcados && idade && idade.meses < 6 && (
          <div className="mt-4 rounded-xl border-2 border-warn bg-warn-soft p-4 text-sm">
            <strong>Calma — ainda não.</strong> Mesmo com todos os sinais marcados, antes dos 6
            meses a recomendação é manter apenas leite materno (ou fórmula). Antecipar o início só
            deve acontecer com indicação expressa do pediatra.
          </div>
        )}
        {todosMarcados && !idade && (
          <div className="mt-4 rounded-xl border-2 border-warn bg-warn-soft p-4 text-sm">
            <strong>Falta a idade.</strong> Informe a data de nascimento na tela{' '}
            <Link href="/" className="font-medium text-primary underline">
              Início
            </Link>{' '}
            para o app conferir se, além dos sinais, o bebê já está na janela dos 6 meses.
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

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <p className="rounded-xl border-2 border-primary bg-surf-azul p-4 text-sm">
            <strong>Vai acontecer e é normal:</strong> careta, ânsia e tosse barulhenta são o
            reflexo de proteção treinando. Não intervenha — deixe o bebê resolver.
          </p>
          <p className="rounded-xl border-2 border-danger bg-danger-soft p-4 text-sm">
            <strong>Engasgo real é silencioso:</strong> sem tosse, sem choro, lábios arroxeados.
            Aí é agir:{' '}
            <Link href="/emergencia" className="font-bold text-danger underline">
              passo a passo aqui
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Métodos */}
      <section aria-labelledby="titulo-metodos">
        <h2 id="titulo-metodos" className="mb-4 text-xl font-bold">
          Colher, BLW ou BLISS?
        </h2>
        <Link
          href="/metodos"
          className="flex items-center gap-3 rounded-2xl border-2 border-primary bg-surf-azul p-4"
        >
          <Scale className="h-8 w-8 shrink-0 text-primary" aria-hidden />
          <span className="flex-1">
            <span className="block font-bold">Guia dos métodos</span>
            <span className="block text-sm text-ink-soft">
              O que é cada um, como escolher — e por que combinar é permitido.
            </span>
          </span>
        </Link>
      </section>
    </div>
  );
}
