import BannerBebe from '@/components/BannerBebe';
import Expansivel from '@/components/Expansivel';
import {
  combinarSemCulpa,
  comparacaoBlwBliss,
  decisaoRapida,
  metodos,
  naDuvida,
  regrasComuns,
  resumoMetodos,
  sinaisDeAjuda,
  type Metodo,
} from '@/content/metodos';
import { Handshake, LifeBuoy, Scale, ShieldCheck, Utensils } from 'lucide-react';
import { Link } from 'wouter';

function ListaMarcada({
  itens,
  marcador,
  corMarcador,
}: {
  itens: string[];
  marcador: string;
  corMarcador: string;
}) {
  return (
    <ul className="space-y-2 text-sm">
      {itens.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden className={corMarcador}>
            {marcador}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function CardMetodo({ metodo }: { metodo: Metodo }) {
  const prato = metodo.pratoExemplo;
  return (
    <article
      id={metodo.id}
      className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
    >
      <header className="border-b border-stone-100 p-5">
        <h3 className="text-lg font-bold">
          <span aria-hidden className="mr-1">
            {metodo.icone}
          </span>
          {metodo.nome}
        </h3>
        <p className="text-sm text-ink-soft">{metodo.subtitulo}</p>
        <p className="mt-3 text-sm">{metodo.oQueE}</p>
      </header>

      <div className="space-y-3 p-5">
        <Expansivel titulo="Quando faz sentido">
          <ListaMarcada itens={metodo.quandoFazSentido} marcador="•" corMarcador="text-primary" />
        </Expansivel>

        <Expansivel titulo="Vantagens e limitações">
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-primary">Vantagens</h4>
              <ListaMarcada itens={metodo.vantagens} marcador="✓" corMarcador="text-primary" />
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-warn">Limitações</h4>
              <ListaMarcada itens={metodo.limitacoes} marcador="–" corMarcador="text-warn" />
            </div>
          </div>
        </Expansivel>

        {/* Segurança fica aberta por padrão: informação crítica não exige descoberta */}
        <Expansivel titulo="Cuidados de segurança" abertoInicial>
          <ListaMarcada itens={metodo.seguranca} marcador="!" corMarcador="text-danger" />
          <p className="mt-3 rounded-xl bg-stone-100 p-3 text-sm">
            <strong>Textura, corte e supervisão: </strong>
            {metodo.comoServir}
          </p>
        </Expansivel>

        <div className="rounded-xl bg-primary-soft p-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold">
            <Utensils className="h-4 w-4 text-primary" aria-hidden />
            {prato.contexto}
          </h4>
          {prato.ordenado ? (
            <ol className="space-y-2 text-sm">
              {prato.itens.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span
                    aria-hidden
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {prato.itens.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {prato.exemploFinal && <p className="mt-2 text-sm font-medium">{prato.exemploFinal}</p>}
          {prato.temReceita && (
            <Link href="/receitas" className="mt-2 inline-block text-sm font-medium text-primary underline">
              Receita completa na aba Receitas →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Metodos() {
  return (
    <div className="space-y-10">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Colher, BLW ou BLISS?</h1>
        <p className="text-ink-soft">{resumoMetodos}</p>
      </div>

      {/* Atalho de decisão: a resposta em 20 segundos, antes de qualquer detalhe */}
      <section aria-label="Resumo para decidir" className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <ul className="space-y-3 text-sm">
          {decisaoRapida.map(d => (
            <li key={d.id} className="flex gap-3">
              <span aria-hidden className="text-xl">
                {d.icone}
              </span>
              {/* rolagem programática: âncora #id colidiria com o roteamento por hash */}
              <button
                onClick={() => document.getElementById(d.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-left hover:underline"
              >
                {d.linha}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-accent-soft p-3 text-sm font-medium">{naDuvida}</p>
      </section>

      {/* Os três métodos */}
      <section aria-labelledby="titulo-metodos" className="space-y-4">
        <h2 id="titulo-metodos" className="sr-only">
          Os três métodos em detalhe
        </h2>
        {metodos.map(m => (
          <CardMetodo key={m.id} metodo={m} />
        ))}
      </section>

      {/* BLW × BLISS */}
      <section aria-labelledby="titulo-comparacao">
        <h2 id="titulo-comparacao" className="mb-2 flex items-center gap-2 text-xl font-bold">
          <Scale className="h-5 w-5 text-primary" aria-hidden />
          BLW × BLISS: as 3 diferenças que importam
        </h2>
        <p className="mb-4 text-sm text-ink-soft">
          O BLISS não é um quarto método — é o BLW com rede de proteção. A autonomia é idêntica; o
          que muda é a montagem do prato.
        </p>
        <div
          tabIndex={0}
          role="region"
          aria-labelledby="titulo-comparacao"
          className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm focus-visible:outline-2 focus-visible:outline-primary"
        >
          <table className="w-full min-w-[30rem] text-sm">
            <caption className="sr-only">Comparação entre BLW e BLISS</caption>
            <thead>
              <tr className="bg-stone-100 text-left">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Critério
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  BLW livre
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  BLISS
                </th>
              </tr>
            </thead>
            <tbody>
              {comparacaoBlwBliss.map(linha => (
                <tr key={linha.criterio} className="border-t border-stone-100 align-top">
                  <th scope="row" className="px-4 py-3 text-left font-semibold">
                    {linha.criterio}
                  </th>
                  <td className="px-4 py-3 text-ink-soft">{linha.blw}</td>
                  <td className="px-4 py-3 text-ink-soft">{linha.bliss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Combinar sem culpa */}
      <section aria-labelledby="titulo-combinar" className="rounded-2xl bg-accent-soft p-5">
        <h2 id="titulo-combinar" className="mb-2 flex items-center gap-2 text-xl font-bold">
          <Handshake className="h-5 w-5 text-accent" aria-hidden />
          {combinarSemCulpa.titulo}
        </h2>
        <p className="mb-3 text-sm">{combinarSemCulpa.texto}</p>
        <ListaMarcada itens={combinarSemCulpa.exemplos} marcador="•" corMarcador="text-accent" />
      </section>

      {/* Regras comuns */}
      <section aria-labelledby="titulo-regras">
        <h2 id="titulo-regras" className="mb-3 flex items-center gap-2 text-xl font-bold">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
          Seja qual for o método
        </h2>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <ListaMarcada itens={regrasComuns} marcador="✓" corMarcador="text-primary" />
        </div>
      </section>

      {/* Quando simplificar ou pedir ajuda */}
      <section id="ajuda" aria-labelledby="titulo-ajuda">
        <h2 id="titulo-ajuda" className="mb-3 flex items-center gap-2 text-xl font-bold">
          <LifeBuoy className="h-5 w-5 text-warn" aria-hidden />
          Quando simplificar — ou pedir orientação
        </h2>
        <ul className="space-y-3">
          {sinaisDeAjuda.map((s, i) => (
            <li key={i} className="rounded-xl border-l-4 border-warn bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm font-semibold">{s.sinal}</p>
              <p className="text-sm text-ink-soft">{s.conduta}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
          Método é ferramenta, não identidade. Trocar, combinar ou simplificar não é falha — é
          leitura do próprio bebê. E as manobras de engasgo estão sempre a um toque no botão{' '}
          <Link href="/emergencia" className="font-medium text-danger underline">
            <span aria-hidden>🚨</span> Engasgo
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
