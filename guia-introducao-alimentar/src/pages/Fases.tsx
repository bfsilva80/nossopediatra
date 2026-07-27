import BannerBebe, { useNascimento } from '@/components/BannerBebe';
import { fases } from '@/content/fases';
import { calcularIdade, faseParaMeses } from '@/lib/idade';
import { useState } from 'react';
import { Link } from 'wouter';

export default function Fases() {
  const [nascimento] = useNascimento();
  const idade = calcularIdade(nascimento);
  const faseDoBebe = idade ? faseParaMeses(idade.meses) : null;

  const [selecionada, setSelecionada] = useState<string>(faseDoBebe?.id ?? fases[0].id);
  const fase = fases.find(f => f.id === selecionada) ?? fases[0];

  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Fases da introdução alimentar</h1>
        <p className="text-ink-soft">
          O que muda dos 6 aos 24 meses: textura, quantidade e rotina — sempre no ritmo do bebê.
        </p>
      </div>

      <div role="group" aria-label="Fases" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {fases.map(f => {
          const ativa = f.id === selecionada;
          return (
            <button
              key={f.id}
              aria-pressed={ativa}
              onClick={() => setSelecionada(f.id)}
              className={`rounded-xl border-2 px-3 py-3 text-center transition-colors ${
                ativa
                  ? 'border-primary bg-primary text-white'
                  : 'border-stone-200 bg-white hover:border-primary'
              }`}
            >
              <span className="block text-lg" aria-hidden>
                {f.icone}
              </span>
              <span className="block text-sm font-semibold">{f.faixa}</span>
              {f.id === faseDoBebe?.id && (
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    ativa ? 'bg-white/20' : 'bg-primary-soft text-primary'
                  }`}
                >
                  seu bebê
                </span>
              )}
            </button>
          );
        })}
      </div>

      <article className="space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <header>
          <h2 className="text-xl font-bold">
            {fase.icone} {fase.nome} · {fase.faixa}
          </h2>
          <p className="mt-2 text-ink-soft">{fase.resumo}</p>
        </header>

        <section>
          <h3 className="mb-1 font-semibold text-primary">Consistência</h3>
          <p className="text-sm">{fase.consistencia}</p>
          <p className="mt-2 text-sm">
            Papa, tiras ou os dois?{' '}
            <Link href="/metodos" className="font-medium text-primary underline">
              Veja o guia Colher, BLW ou BLISS
            </Link>
          </p>
        </section>

        <section>
          <h3 className="mb-2 font-semibold text-primary">O que oferecer</h3>
          <ul className="space-y-2 text-sm">
            {fase.oQueOferecer.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-primary">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 font-semibold text-primary">Um dia típico</h3>
          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <caption className="sr-only">Esquema de refeições da fase {fase.faixa}</caption>
              <tbody>
                {fase.esquemaDia.map((linha, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                    <th scope="row" className="w-36 px-3 py-2.5 text-left font-semibold">
                      {linha.refeicao}
                    </th>
                    <td className="px-3 py-2.5 text-ink-soft">{linha.oferta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-soft">
            Horários e ordem são flexíveis — o esquema é um mapa, não um contrato.
          </p>
        </section>

        <section>
          <h3 className="mb-1 font-semibold text-primary">Quantidades</h3>
          <p className="text-sm">{fase.quantidades}</p>
        </section>

        <section className={`rounded-xl p-4 ${fase.corSuave}`}>
          <h3 className="mb-2 font-semibold">Para lembrar nesta fase</h3>
          <ul className="space-y-2 text-sm">
            {fase.dicas.map((dica, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden>✓</span>
                {dica}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <p className="rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
        Cada bebê tem seu ritmo. Estas orientações seguem as diretrizes brasileiras, mas quem
        conhece o SEU bebê é o pediatra que o acompanha.
      </p>
    </div>
  );
}
