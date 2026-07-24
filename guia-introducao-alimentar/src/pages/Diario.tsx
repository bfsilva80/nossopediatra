import BannerBebe from '@/components/BannerBebe';
import { usePersistido } from '@/lib/storage';
import { Download, Plus, Share2, Trash2 } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

interface Registro {
  id: string;
  data: string;
  hora: string;
  refeicao: string;
  alimentos: string;
  sintomas: string[];
  notas: string;
}

const tiposRefeicao = ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Outro'];

const sintomasComuns = [
  'Recusou a refeição',
  'Vermelhidão / urticária',
  'Coceira',
  'Inchaço',
  'Vômito',
  'Diarreia',
  'Intestino preso',
  'Irritabilidade',
  'Chiado / tosse',
];

const formularioVazio = () => ({
  data: new Date().toISOString().slice(0, 10),
  hora: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
  refeicao: 'Almoço',
  alimentos: '',
  sintomas: [] as string[],
  notas: '',
});

function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function gerarTexto(registros: Registro[]): string {
  const linhas = ['DIÁRIO ALIMENTAR DO BEBÊ', ''];
  for (const r of [...registros].reverse()) {
    linhas.push(
      `${formatarData(r.data)} ${r.hora} — ${r.refeicao}`,
      `  Alimentos: ${r.alimentos}`,
      `  Sintomas: ${r.sintomas.length ? r.sintomas.join(', ') : 'nenhum'}`
    );
    if (r.notas) linhas.push(`  Notas: ${r.notas}`);
    linhas.push('');
  }
  linhas.push('Gerado pelo app Introdução Alimentar — Nosso Pediatra');
  return linhas.join('\n');
}

export default function Diario() {
  const [registros, setRegistros] = usePersistido<Registro[]>('diario', []);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState(formularioVazio);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState<string | null>(null);

  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.alimentos.trim()) return;
    setRegistros(prev => [{ id: crypto.randomUUID(), ...form }, ...prev]);
    setForm(formularioVazio());
    setMostrarForm(false);
  };

  const excluir = (id: string) => {
    setRegistros(prev => prev.filter(r => r.id !== id));
    setConfirmandoExclusao(null);
  };

  const alternarSintoma = (sintoma: string) =>
    setForm(prev => ({
      ...prev,
      sintomas: prev.sintomas.includes(sintoma)
        ? prev.sintomas.filter(s => s !== sintoma)
        : [...prev.sintomas, sintoma],
    }));

  const compartilhar = async () => {
    const texto = gerarTexto(registros);
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Diário alimentar', text: texto });
        return;
      } catch {
        // usuário cancelou — sem fallback necessário
        return;
      }
    }
    baixar();
  };

  const baixar = () => {
    const blob = new Blob([gerarTexto(registros)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diario-alimentar-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Diário alimentar</h1>
        <p className="text-ink-soft">
          Registre refeições e reações para levar à consulta. Tudo fica salvo somente neste
          aparelho.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setMostrarForm(m => !m)}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:opacity-90"
        >
          <Plus className="h-5 w-5" aria-hidden />
          Novo registro
        </button>
        {registros.length > 0 && (
          <>
            <button
              onClick={compartilhar}
              className="flex items-center gap-2 rounded-lg border-2 border-primary px-5 py-2.5 font-semibold text-primary hover:bg-primary-soft"
            >
              <Share2 className="h-5 w-5" aria-hidden />
              Compartilhar
            </button>
            <button
              onClick={baixar}
              className="flex items-center gap-2 rounded-lg border-2 border-stone-300 px-5 py-2.5 font-semibold text-ink-soft hover:bg-stone-100"
            >
              <Download className="h-5 w-5" aria-hidden />
              Baixar (.txt)
            </button>
          </>
        )}
      </div>

      {mostrarForm && (
        <form onSubmit={salvar} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="d-data" className="mb-1 block text-sm font-semibold">
                Data
              </label>
              <input
                id="d-data"
                type="date"
                required
                max={new Date().toISOString().slice(0, 10)}
                value={form.data}
                onChange={e => setForm(prev => ({ ...prev, data: e.target.value }))}
                className="w-full rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="d-hora" className="mb-1 block text-sm font-semibold">
                Hora
              </label>
              <input
                id="d-hora"
                type="time"
                required
                value={form.hora}
                onChange={e => setForm(prev => ({ ...prev, hora: e.target.value }))}
                className="w-full rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="d-refeicao" className="mb-1 block text-sm font-semibold">
                Refeição
              </label>
              <select
                id="d-refeicao"
                value={form.refeicao}
                onChange={e => setForm(prev => ({ ...prev, refeicao: e.target.value }))}
                className="w-full rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
              >
                {tiposRefeicao.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="d-alimentos" className="mb-1 block text-sm font-semibold">
              Alimentos oferecidos
            </label>
            <textarea
              id="d-alimentos"
              required
              rows={2}
              placeholder="Ex.: papa de frango com abóbora, banana amassada"
              value={form.alimentos}
              onChange={e => setForm(prev => ({ ...prev, alimentos: e.target.value }))}
              className="w-full resize-none rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
            />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Sintomas observados (se houver)</legend>
            <div className="flex flex-wrap gap-2">
              {sintomasComuns.map(s => (
                <label
                  key={s}
                  className={`cursor-pointer rounded-full border-2 px-3 py-1.5 text-sm ${
                    form.sintomas.includes(s)
                      ? 'border-danger bg-danger-soft text-danger'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.sintomas.includes(s)}
                    onChange={() => alternarSintoma(s)}
                    className="sr-only"
                  />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          {form.sintomas.includes('Recusou a refeição') && (
            <p className="rounded-xl bg-primary-soft p-3 text-sm">
              <strong>Recusa faz parte do treino:</strong> podem ser precisas 8–10 ofertas em dias
              diferentes até um alimento ser aceito. Sem pressão — registre e ofereça de novo
              outro dia.
            </p>
          )}

          <div>
            <label htmlFor="d-notas" className="mb-1 block text-sm font-semibold">
              Observações
            </label>
            <textarea
              id="d-notas"
              rows={2}
              placeholder="Quantidade aproximada, humor do bebê, contexto…"
              value={form.notas}
              onChange={e => setForm(prev => ({ ...prev, notas: e.target.value }))}
              className="w-full resize-none rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 rounded-lg bg-primary py-2.5 font-semibold text-white hover:opacity-90">
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setMostrarForm(false)}
              className="flex-1 rounded-lg border-2 border-stone-200 py-2.5 font-semibold text-ink-soft hover:bg-stone-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {registros.length === 0 && !mostrarForm && (
          <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-ink-soft">
            Nenhum registro ainda. Anotar as primeiras semanas ajuda muito na consulta com o
            pediatra.
          </p>
        )}
        {registros.map(r => (
          <article key={r.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold">{r.refeicao}</h2>
                <p className="text-xs text-ink-soft">
                  {formatarData(r.data)} às {r.hora}
                </p>
              </div>
              {confirmandoExclusao === r.id ? (
                <span className="flex items-center gap-2 text-xs">
                  Excluir?
                  <button onClick={() => excluir(r.id)} className="font-bold text-danger underline">
                    sim
                  </button>
                  <button onClick={() => setConfirmandoExclusao(null)} className="underline">
                    não
                  </button>
                </span>
              ) : (
                <button
                  onClick={() => setConfirmandoExclusao(r.id)}
                  aria-label={`Excluir registro de ${r.refeicao} de ${formatarData(r.data)}`}
                  className="text-ink-soft hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
            <p className="text-sm">{r.alimentos}</p>
            {r.sintomas.length > 0 && (
              <p className="mt-2 flex flex-wrap gap-1.5">
                {r.sintomas.map(s => (
                  <span key={s} className="rounded-full bg-danger-soft px-2.5 py-0.5 text-xs font-medium text-danger">
                    {s}
                  </span>
                ))}
              </p>
            )}
            {r.notas && <p className="mt-2 text-sm text-ink-soft">{r.notas}</p>}
          </article>
        ))}
      </div>

      <p className="rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
        💡 Registrou algum sintoma repetido com o mesmo alimento? Leve o diário na próxima
        consulta — padrões valem mais que episódios isolados. E se a refeição virou briga,{' '}
        <Link href="/metodos/ajuda" className="font-medium text-primary underline">
          veja quando simplificar
        </Link>
        .
      </p>
    </div>
  );
}
