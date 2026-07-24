import BannerBebe from '@/components/BannerBebe';
import {
  alimentos,
  normalizar,
  rotulosQuando,
  type GrupoAlimento,
  type QuandoPode,
} from '@/content/alimentos';
import { perguntasFAQ } from '@/content/faq';
import { receitas } from '@/content/receitas';
import { usePersistido } from '@/lib/storage';
import { Check, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'wouter';

const grupos: Array<GrupoAlimento | 'Todos'> = [
  'Todos',
  'Frutas',
  'Legumes e verduras',
  'Cereais e tubérculos',
  'Feijões',
  'Carnes e ovos',
  'Leite e derivados',
  'Outros',
];

const corQuando: Record<QuandoPode, string> = {
  '6m': 'bg-primary-soft text-primary',
  '9m': 'bg-primary-soft text-primary',
  '12m': 'bg-warn-soft text-warn',
  '24m': 'bg-danger-soft text-danger',
  nao: 'bg-danger-soft text-danger',
};

export default function Alimentos() {
  const [busca, setBusca] = useState('');
  const [grupo, setGrupo] = useState<GrupoAlimento | 'Todos'>('Todos');
  const [aberto, setAberto] = useState<string | null>(null);
  const [experimentados, setExperimentados] = usePersistido<string[]>('alimentos-experimentados', []);

  const termo = normalizar(busca.trim());

  const filtrados = useMemo(() => {
    return alimentos.filter(a => {
      if (grupo !== 'Todos' && a.grupo !== grupo) return false;
      if (!termo) return true;
      return normalizar(`${a.nome} ${a.grupo} ${a.alergenico ?? ''}`).includes(termo);
    });
  }, [termo, grupo]);

  const faqRelacionadas = useMemo(
    () =>
      termo
        ? perguntasFAQ.filter(p => normalizar(`${p.pergunta} ${p.resposta}`).includes(termo)).slice(0, 3)
        : [],
    [termo]
  );

  const receitasRelacionadas = useMemo(
    () =>
      termo
        ? receitas
            .filter(r => normalizar(`${r.nome} ${r.ingredientes.join(' ')}`).includes(termo))
            .slice(0, 3)
        : [],
    [termo]
  );

  const alternarExperimentado = (id: string) =>
    setExperimentados(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Posso dar…?</h1>
        <p className="text-ink-soft">
          Busque o alimento e veja quando pode, como oferecer e o que merece atenção. Marque o que
          o bebê já experimentou.
        </p>
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
          aria-hidden
        />
        <input
          type="search"
          role="searchbox"
          aria-label="Buscar alimento"
          placeholder="Ex.: morango, uva, ovo, mel…"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full rounded-2xl border-2 border-stone-200 bg-white py-3 pl-12 pr-4 text-base shadow-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Grupos de alimentos">
        {grupos.map(g => (
          <button
            key={g}
            role="tab"
            aria-selected={grupo === g}
            onClick={() => setGrupo(g)}
            className={`shrink-0 rounded-full border-2 px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              grupo === g
                ? 'border-primary bg-primary text-white'
                : 'border-stone-200 bg-white text-ink-soft hover:border-primary'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="text-sm text-ink-soft" aria-live="polite">
        {filtrados.length} alimento{filtrados.length === 1 ? '' : 's'} ·{' '}
        <span className="font-semibold text-primary">{experimentados.length} já experimentados</span>
      </p>

      <div className="space-y-2">
        {filtrados.map(a => {
          const abertoEste = aberto === a.id;
          const jaExperimentou = experimentados.includes(a.id);
          return (
            <div key={a.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <button
                type="button"
                aria-expanded={abertoEste}
                onClick={() => setAberto(abertoEste ? null : a.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-stone-50"
              >
                <span className="text-2xl" aria-hidden>
                  {a.emoji}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{a.nome}</span>
                    {jaExperimentou && (
                      <Check className="h-4 w-4 text-primary" aria-label="Já experimentou" />
                    )}
                  </span>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${corQuando[a.quando]}`}
                  >
                    {a.rotuloQuando ?? rotulosQuando[a.quando]}
                  </span>
                </span>
                <span className="flex shrink-0 gap-1">
                  {a.ferro && (
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">
                      ferro
                    </span>
                  )}
                  {a.alergenico && (
                    <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-bold text-warn">
                      alergênico
                    </span>
                  )}
                  {a.engasgo && (
                    <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-bold text-danger">
                      atenção
                    </span>
                  )}
                </span>
              </button>

              {abertoEste && (
                <div className="space-y-3 border-t border-stone-100 px-4 py-4 text-sm">
                  <p>
                    <strong className="text-primary">Como oferecer: </strong>
                    {a.como}
                  </p>
                  {a.engasgo && (
                    <p className="rounded-xl bg-danger-soft p-3">
                      <strong className="text-danger">Engasgo: </strong>
                      {a.engasgo}
                    </p>
                  )}
                  {a.alergenico && (
                    <p className="rounded-xl bg-warn-soft p-3">
                      <strong>Alergênico ({a.alergenico}): </strong>
                      primeira oferta pequena e observada; sem reação, mantenha na rotina.{' '}
                      <Link href="/seguranca" className="font-medium text-primary underline">
                        Ver orientações
                      </Link>
                    </p>
                  )}
                  {a.nota && <p className="text-ink-soft">{a.nota}</p>}
                  {a.quando !== 'nao' && a.quando !== '24m' && (
                    <button
                      onClick={() => alternarExperimentado(a.id)}
                      className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors ${
                        jaExperimentou
                          ? 'border-primary bg-primary text-white'
                          : 'border-primary text-primary hover:bg-primary-soft'
                      }`}
                    >
                      {jaExperimentou ? '✓ Já experimentou' : 'Marcar como experimentado'}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtrados.length === 0 && (
          <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-ink-soft">
            Nenhum alimento encontrado para "{busca}". Na dúvida sobre um alimento que não está
            aqui, pergunte ao pediatra — e nos conte, para entrar na próxima atualização.
          </p>
        )}
      </div>

      {(faqRelacionadas.length > 0 || receitasRelacionadas.length > 0) && (
        <section className="space-y-3 rounded-2xl bg-stone-100 p-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            Relacionado à sua busca
          </h2>
          {faqRelacionadas.map(p => (
            <Link
              key={p.id}
              href="/duvidas"
              className="block rounded-xl bg-white p-3 text-sm shadow-sm hover:bg-primary-soft"
            >
              ❓ {p.pergunta}
            </Link>
          ))}
          {receitasRelacionadas.map(r => (
            <Link
              key={r.id}
              href="/receitas"
              className="block rounded-xl bg-white p-3 text-sm shadow-sm hover:bg-primary-soft"
            >
              {r.icone} Receita: {r.nome}
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
