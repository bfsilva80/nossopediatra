import BannerBebe, { useNascimento } from '@/components/BannerBebe';
import { alimentos } from '@/content/alimentos';
import { alergenicos } from '@/content/seguranca';
import { calcularIdade, descreverIdade, faseParaMeses } from '@/lib/idade';
import { lerStorage, usePersistido } from '@/lib/storage';
import { Copy, Download, FileText, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

/**
 * Relatório estruturado para a consulta: o pediatra recebe SÍNTESE, não
 * despejo de dados — reações em destaque no topo (é o que muda conduta),
 * alergênicos com status, ferro dos últimos 30 dias, e só então o diário
 * recente resumido.
 */

interface RegistroDiario {
  id: string;
  data: string;
  hora: string;
  refeicao: string;
  alimentos: string;
  sintomas: string[];
  notas: string;
}

function dataBR(iso: string): string {
  return iso.split('-').reverse().join('/');
}

export default function Relatorio() {
  const [nascimento] = useNascimento();
  const [copiado, setCopiado] = useState(false);
  const idade = calcularIdade(nascimento);
  const fase = idade ? faseParaMeses(idade.meses) : null;

  const registros = lerStorage<RegistroDiario[]>('diario', []);
  const registroAlergenicos = lerStorage<Record<string, { status: string; data: string }>>('alergenicos', {});
  const [ferroDias] = usePersistido<string[]>('ferro-dias', []);
  const experimentados = lerStorage<string[]>('alimentos-experimentados', []);

  const comReacao = registros.filter(r => r.sintomas.length > 0);
  const ferro30 = ferroDias.filter(
    d => (Date.now() - new Date(`${d}T12:00:00`).getTime()) / 86_400_000 < 30
  ).length;

  const alergOk = alergenicos.filter(a => registroAlergenicos[a.id]?.status === 'ok');
  const alergReacao = alergenicos.filter(a => registroAlergenicos[a.id]?.status === 'reacao');
  const alergPendentes = alergenicos.filter(a => !registroAlergenicos[a.id]?.status || registroAlergenicos[a.id]?.status === 'nao');

  const gerarTexto = (): string => {
    const linhas: string[] = [
      'RELATÓRIO PARA A CONSULTA — INTRODUÇÃO ALIMENTAR',
      `Gerado em ${new Date().toLocaleDateString('pt-BR')}`,
    ];
    if (idade) {
      linhas.push(`Idade: ${descreverIdade(idade)}${fase ? ` (${fase.nome})` : ''}`);
    }
    linhas.push('');

    linhas.push('== REAÇÕES E SINTOMAS REGISTRADOS ==');
    if (comReacao.length === 0) {
      linhas.push('Nenhum sintoma registrado até aqui.');
    } else {
      for (const r of [...comReacao].reverse().slice(-15)) {
        linhas.push(`${dataBR(r.data)} ${r.hora} — ${r.alimentos}`);
        linhas.push(`  Sintomas: ${r.sintomas.join(', ')}`);
        if (r.notas) linhas.push(`  Obs.: ${r.notas}`);
      }
    }
    linhas.push('');

    linhas.push('== ALERGÊNICOS ==');
    if (alergReacao.length > 0) {
      linhas.push(
        `TEVE REAÇÃO: ${alergReacao.map(a => `${a.nome} (${dataBR(registroAlergenicos[a.id].data)})`).join(', ')}`
      );
    }
    linhas.push(
      alergOk.length > 0
        ? `Introduzidos sem reação: ${alergOk.map(a => a.nome).join(', ')}`
        : 'Nenhum alergênico introduzido ainda.'
    );
    if (alergPendentes.length > 0) {
      linhas.push(`Ainda não introduzidos: ${alergPendentes.map(a => a.nome).join(', ')}`);
    }
    linhas.push('');

    linhas.push('== FERRO E VARIEDADE ==');
    linhas.push(`Dias com fonte de ferro marcada nos últimos 30 dias: ${ferro30}`);
    linhas.push(`Alimentos já experimentados: ${experimentados.length} de ${alimentos.filter(a => a.quando === '6m' || a.quando === '9m').length} do guia`);
    linhas.push('');

    const semSintoma = registros.filter(r => r.sintomas.length === 0).slice(0, 10);
    if (semSintoma.length > 0) {
      linhas.push('== ÚLTIMAS REFEIÇÕES REGISTRADAS (sem sintomas) ==');
      for (const r of semSintoma) {
        linhas.push(`${dataBR(r.data)} — ${r.refeicao}: ${r.alimentos}`);
      }
      linhas.push('');
    }

    linhas.push('Gerado pelo app Introdução Alimentar — projeto Nosso Pediatra.');
    linhas.push('Dados registrados pela própria família; não substitui avaliação clínica.');
    return linhas.join('\n');
  };

  const texto = gerarTexto();

  const copiar = async () => {
    await navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const compartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Relatório para a consulta', text: texto });
        return;
      } catch {
        return;
      }
    }
    copiar();
  };

  const baixar = () => {
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-consulta-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const temDados = registros.length > 0 || Object.keys(registroAlergenicos).length > 0 || ferroDias.length > 0;

  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <FileText className="h-6 w-6 text-primary" aria-hidden />
          Relatório para a consulta
        </h1>
        <p className="text-ink-soft">
          Tudo que você registrou, organizado do jeito que o pediatra precisa: reações primeiro,
          depois alergênicos, ferro e as refeições recentes.
        </p>
      </div>

      {!temDados ? (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-ink-soft">
          Ainda não há registros para relatar. Use o{' '}
          <Link href="/diario" className="font-medium text-primary underline">
            diário
          </Link>
          , o rastreador de alergênicos e a marcação de ferro — o relatório se monta sozinho.
        </p>
      ) : (
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-soft">
              Prévia do relatório
            </p>
            <pre className="max-h-96 overflow-y-auto whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {texto}
            </pre>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              onClick={compartilhar}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
            >
              <Share2 className="h-5 w-5" aria-hidden />
              Compartilhar
            </button>
            <button
              onClick={copiar}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary py-3 font-bold text-primary hover:bg-primary-soft"
            >
              <Copy className="h-5 w-5" aria-hidden />
              {copiado ? 'Copiado ✓' : 'Copiar'}
            </button>
            <button
              onClick={baixar}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-stone-300 py-3 font-semibold text-ink-soft hover:bg-stone-100"
            >
              <Download className="h-5 w-5" aria-hidden />
              Baixar (.txt)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
