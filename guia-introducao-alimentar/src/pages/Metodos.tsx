import BannerBebe from '@/components/BannerBebe';
import Expansivel from '@/components/Expansivel';
import {
  combinarSemCulpa,
  comparacaoBlwBliss,
  metodos,
  regrasComuns,
  sinaisDeAjuda,
} from '@/content/metodos';
import { Scale, ShieldCheck, Utensils } from 'lucide-react';
import { Link } from 'wouter';

export default function Metodos() {
  return (
    <div className="space-y-10">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Colher, BLW ou BLISS?</h1>
        <p className="text-ink-soft">
          Não existe método vencedor — existe o que cabe na sua família, aplicado com segurança.
          Aqui está o que cada caminho é, quando faz sentido e como montar o prato. Combinar é
          permitido.
        </p>
      </div>

      {/* Os três métodos */}
      <section aria-labelledby="titulo-metodos" className="space-y-4">
        <h2 id="titulo-metodos" className="sr-only">
          Os três métodos
        </h2>
        {metodos.map(m => (
          <article key={m.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <header className="border-b border-stone-100 p-5">
              <h3 className="text-lg font-bold">
                <span aria-hidden className="mr-1">
                  {m.icone}
                </span>
                {m.nome}
              </h3>
              <p className="text-sm text-ink-soft">{m.subtitulo}</p>
              <p className="mt-3 text-sm">{m.oQueE}</p>
            </header>

            <div className="space-y-3 p-5">
              <Expansivel titulo="Quando faz sentido">
                <ul className="space-y-2 text-sm">
                  {m.quandoFazSentido.map((q, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className="text-primary">
                        •
                      </span>
                      {q}
                    </li>
                  ))}
                </ul>
              </Expansivel>

              <Expansivel titulo="Vantagens e limitações">
                <div className="grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-primary">Vantagens</h4>
                    <ul className="space-y-2">
                      {m.vantagens.map((v, i) => (
                        <li key={i} className="flex gap-2">
                          <span aria-hidden>✓</span>
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-warn">Limitações</h4>
                    <ul className="space-y-2">
                      {m.limitacoes.map((l, i) => (
                        <li key={i} className="flex gap-2">
                          <span aria-hidden>–</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Expansivel>

              <Expansivel titulo="Cuidados de segurança">
                <ul className="space-y-2 text-sm">
                  {m.seguranca.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className="text-danger">
                        !
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 rounded-xl bg-stone-100 p-3 text-sm">
                  <strong>Textura, corte e supervisão: </strong>
                  {m.comoServir}
                </p>
              </Expansivel>

              <div className="rounded-xl bg-primary-soft p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Utensils className="h-4 w-4 text-primary" aria-hidden />
                  {m.pratoExemplo.contexto}
                </h4>
                <ul className="space-y-1.5 text-sm">
                  {m.pratoExemplo.itens.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
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
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <caption className="sr-only">Comparação entre BLW e BLISS</caption>
            <thead>
              <tr className="bg-stone-100 text-left">
                <th className="px-4 py-3 font-semibold">Critério</th>
                <th className="px-4 py-3 font-semibold">BLW livre</th>
                <th className="px-4 py-3 font-semibold">BLISS</th>
              </tr>
            </thead>
            <tbody>
              {comparacaoBlwBliss.map((linha, i) => (
                <tr key={i} className="border-t border-stone-100 align-top">
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
        <h2 id="titulo-combinar" className="mb-2 text-xl font-bold">
          🤝 {combinarSemCulpa.titulo}
        </h2>
        <p className="mb-3 text-sm">{combinarSemCulpa.texto}</p>
        <ul className="space-y-2 text-sm">
          {combinarSemCulpa.exemplos.map((e, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden>•</span>
              {e}
            </li>
          ))}
        </ul>
      </section>

      {/* Regras comuns */}
      <section aria-labelledby="titulo-regras">
        <h2 id="titulo-regras" className="mb-3 flex items-center gap-2 text-xl font-bold">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
          Seja qual for o método
        </h2>
        <ul className="space-y-2 rounded-2xl bg-white p-5 text-sm shadow-sm">
          {regrasComuns.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-primary">
                ✓
              </span>
              {r}
            </li>
          ))}
        </ul>
      </section>

      {/* Quando simplificar ou pedir ajuda */}
      <section aria-labelledby="titulo-ajuda">
        <h2 id="titulo-ajuda" className="mb-3 text-xl font-bold">
          Quando simplificar — ou pedir orientação
        </h2>
        <div className="space-y-3">
          {sinaisDeAjuda.map((s, i) => (
            <div key={i} className="rounded-xl border-l-4 border-warn bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm font-semibold">{s.sinal}</p>
              <p className="text-sm text-ink-soft">{s.conduta}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
          Método é ferramenta, não identidade. Trocar, combinar ou simplificar não é falha — é
          leitura do próprio bebê. E as manobras de engasgo estão sempre a um toque no botão{' '}
          <Link href="/emergencia" className="font-medium text-danger underline">
            🚨 Engasgo
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
