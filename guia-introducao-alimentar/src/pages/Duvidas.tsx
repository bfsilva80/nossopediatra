import BannerBebe from '@/components/BannerBebe';
import Expansivel from '@/components/Expansivel';
import { perguntasFAQ } from '@/content/faq';
import { normalizar } from '@/content/alimentos';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Duvidas() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  const categorias = ['Todas', ...Array.from(new Set(perguntasFAQ.map(p => p.categoria)))];
  const termo = normalizar(busca.trim());

  const filtradas = useMemo(
    () =>
      perguntasFAQ.filter(p => {
        if (categoria !== 'Todas' && p.categoria !== categoria) return false;
        if (!termo) return true;
        return normalizar(`${p.pergunta} ${p.resposta}`).includes(termo);
      }),
    [categoria, termo]
  );

  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Dúvidas frequentes</h1>
        <p className="text-ink-soft">As perguntas que toda família faz, respondidas sem rodeio.</p>
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
          aria-hidden
        />
        <input
          type="search"
          role="searchbox"
          aria-label="Buscar dúvida"
          placeholder="Ex.: suco, sal, quanto comer…"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full rounded-2xl border-2 border-stone-200 bg-white py-3 pl-12 pr-4 text-base shadow-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categorias.map(c => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={`shrink-0 rounded-full border-2 px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              categoria === c
                ? 'border-primary bg-primary text-white'
                : 'border-stone-200 bg-white text-ink-soft hover:border-primary'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtradas.map(item => (
          <Expansivel key={item.id} titulo={item.pergunta} subtitulo={item.categoria}>
            <p className="text-sm leading-relaxed">{item.resposta}</p>
          </Expansivel>
        ))}
        {filtradas.length === 0 && (
          <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-ink-soft">
            Nenhuma dúvida encontrada para "{busca}".
          </p>
        )}
      </div>

      <p className="rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
        Não achou sua dúvida? Cada bebê é único — leve a pergunta para a consulta com o pediatra.
      </p>
    </div>
  );
}
