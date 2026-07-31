import BannerBebe, { useNascimento } from '@/components/BannerBebe';
import Expansivel from '@/components/Expansivel';
import { alimentos } from '@/content/alimentos';
import { fases } from '@/content/fases';
import {
  batchCooking,
  chipsComFerro,
  contarMatches,
  ingredientesCozinha,
  principiosReceitas,
  receitas,
} from '@/content/receitas';
import { calcularIdade, faseParaMeses } from '@/lib/idade';
import { usePersistido } from '@/lib/storage';
import { ChefHat, Clock, Snowflake } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export default function Receitas() {
  const [nascimento] = useNascimento();
  const idade = calcularIdade(nascimento);
  const faseDoBebe = idade ? faseParaMeses(idade.meses) : null;

  const [faseId, setFaseId] = useState<string>(faseDoBebe?.id ?? fases[0].id);
  const [despensa, setDespensa] = usePersistido<string[]>('despensa', []);

  const alternarItem = (id: string) =>
    setDespensa(atual =>
      atual.includes(id) ? atual.filter(x => x !== id) : [...atual, id]
    );

  const temFerroNaDespensa = despensa.some(id => chipsComFerro.includes(id));

  // Ranking por casamento parcial: nunca zera a lista — receitas sem match
  // continuam visíveis, só descem. Família cansada não pode receber "nada".
  const daFase = receitas
    .filter(r => r.faseId === faseId)
    .map(receita => ({ receita, matches: contarMatches(receita, despensa) }))
    .sort((a, b) => b.matches - a.matches);

  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Receitas por fase</h1>
        <p className="text-ink-soft">
          Comida brasileira de verdade, adaptada com segurança — toda refeição principal traz uma
          fonte de ferro.
        </p>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="mb-1 font-bold">O que tem na sua cozinha?</h2>
        <p className="mb-3 text-sm text-ink-soft">
          Toque no que você já tem em casa — as receitas que mais aproveitam esses ingredientes
          sobem para o topo.
        </p>
        <div role="group" aria-label="Ingredientes que tenho em casa" className="flex flex-wrap gap-2">
          {ingredientesCozinha.map(id => {
            const alimento = alimentos.find(a => a.id === id);
            if (!alimento) return null;
            const ativo = despensa.includes(id);
            return (
              <button
                key={id}
                aria-pressed={ativo}
                onClick={() => alternarItem(id)}
                className={`rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-colors ${
                  ativo
                    ? 'border-primary bg-primary text-white'
                    : 'border-stone-200 bg-white hover:border-primary'
                }`}
              >
                {alimento.nome}
              </button>
            );
          })}
        </div>
        {despensa.length > 0 && (
          <div className="mt-3 flex items-center justify-between gap-3">
            {!temFerroNaDespensa ? (
              <p className="rounded-xl bg-warn-soft px-3 py-2 text-sm">
                Nenhuma fonte de ferro selecionada — vale incluir carne, frango, ovo, peixe,
                feijão ou lentilha na refeição principal.
              </p>
            ) : (
              <span />
            )}
            <button
              onClick={() => setDespensa([])}
              className="shrink-0 text-sm font-medium text-primary underline"
            >
              Limpar seleção
            </button>
          </div>
        )}
      </section>

      <div role="group" aria-label="Fase das receitas" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {fases.map(f => {
          const ativa = f.id === faseId;
          return (
            <button
              key={f.id}
              aria-pressed={ativa}
              onClick={() => setFaseId(f.id)}
              className={`rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                ativa
                  ? 'border-primary bg-primary text-white'
                  : 'border-stone-200 bg-white hover:border-primary'
              }`}
            >
              {f.faixa}
              {f.id === faseDoBebe?.id && (
                <span className="block text-[10px] font-bold opacity-80">seu bebê</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {daFase.map(({ receita, matches }) => (
          <Expansivel
            key={receita.id}
            titulo={`${receita.icone} ${receita.nome}`}
            subtitulo={
              <span className="flex items-center gap-3">
                <span>{receita.tipo}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {receita.tempo}
                </span>
                {matches > 0 && (
                  <span className="rounded-full bg-surf-azul px-2 py-0.5 text-xs font-bold text-primary">
                    usa {matches} do que você tem
                  </span>
                )}
              </span>
            }
          >
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="mb-2 font-semibold text-primary">Ingredientes</h3>
                <ul className="space-y-1">
                  {receita.ingredientes.map((ing, i) => (
                    <li key={i}>• {ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-primary">Preparo</h3>
                <ol className="space-y-1.5">
                  {receita.preparo.map((passo, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-semibold text-primary">{i + 1}.</span>
                      {passo}
                    </li>
                  ))}
                </ol>
              </div>
              <p className="rounded-xl bg-surf-azul p-3">
                <strong>Dica:</strong> {receita.dica}
              </p>
            </div>
          </Expansivel>
        ))}
      </div>

      <Link
        href="/comida-da-familia"
        className="flex items-center gap-3 rounded-2xl border-2 border-primary bg-surf-azul p-4 hover:opacity-90"
      >
        <ChefHat className="h-6 w-6 shrink-0 text-primary" aria-hidden />
        <span>
          <span className="block font-bold text-primary">Hoje tem feijoada?</span>
          <span className="text-sm text-ink-soft">
            O bebê come a comida da família — veja como adaptar cada prato.
          </span>
        </span>
      </Link>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-bold">Princípios de todas as receitas</h2>
        <ul className="space-y-2 text-sm">
          {principiosReceitas.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-primary">
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="mb-1 flex items-center gap-2 font-bold">
          <Snowflake className="h-5 w-5 text-primary" aria-hidden />
          {batchCooking.titulo}
        </h2>
        <p className="mb-4 text-sm text-ink-soft">{batchCooking.intro}</p>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="mb-2 font-semibold text-primary">Para congelar bem</h3>
            <ul className="space-y-1.5">
              {batchCooking.congelar.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-primary">Para descongelar com segurança</h3>
            <ul className="space-y-1.5">
              {batchCooking.descongelar.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <ul className="space-y-1.5 rounded-xl bg-warn-soft p-3">
            {batchCooking.nunca.map((item, i) => (
              <li key={i} className="font-medium">
                ✗ {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
