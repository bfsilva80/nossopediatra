import BannerBebe, { useNascimento } from '@/components/BannerBebe';
import Expansivel from '@/components/Expansivel';
import { fases } from '@/content/fases';
import { principiosReceitas, receitas } from '@/content/receitas';
import { calcularIdade, faseParaMeses } from '@/lib/idade';
import { Clock } from 'lucide-react';
import { useState } from 'react';

export default function Receitas() {
  const [nascimento] = useNascimento();
  const idade = calcularIdade(nascimento);
  const faseDoBebe = idade ? faseParaMeses(idade.meses) : null;

  const [faseId, setFaseId] = useState<string>(faseDoBebe?.id ?? fases[0].id);
  const daFase = receitas.filter(r => r.faseId === faseId);

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
        {daFase.map(receita => (
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
              <p className="rounded-xl bg-primary-soft p-3">
                <strong>Dica:</strong> {receita.dica}
              </p>
            </div>
          </Expansivel>
        ))}
      </div>

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
    </div>
  );
}
