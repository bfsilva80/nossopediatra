import BannerBebe, { useNascimento } from '@/components/BannerBebe';
import { alergenicos } from '@/content/seguranca';
import { calcularIdade, descreverIdade, faseParaMeses } from '@/lib/idade';
import { lerStorage, usePersistido } from '@/lib/storage';
import { Copy, Share2, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

/**
 * Cartão do cuidador: resumo em TEXTO PURO (≤ ~15 linhas) para avó, babá e
 * creche — pesquisas mostram que cuidadores secundários seguem práticas de
 * outra geração (mel, açúcar, chás, alimentos inteiros). O texto é o produto;
 * o link (com a data de nascimento embutida via ?bb=) é bônus para quem quiser
 * abrir o app no próprio aparelho já configurado.
 */

const NUNCA_RESUMO =
  'NUNCA: mel, açúcar, sal, suco ou refrigerante; uva e tomate-cereja INTEIROS (sempre em 4, no comprimento); pipoca, amendoim e castanhas inteiras; salsicha.';

function montarCartao(opts: {
  nome: string;
  idadeTexto: string;
  faseResumo: string;
  reacoes: string[];
  contato: string;
  linkApp: string;
}): string {
  const { nome, idadeTexto, faseResumo, reacoes, contato, linkApp } = opts;
  const quem = nome ? nome : 'o bebê';
  const linhas = [
    `CARTÃO DO CUIDADOR — ${quem}, ${idadeTexto}`,
    `Gerado em ${new Date().toLocaleDateString('pt-BR')} (validade curta: a fase muda rápido)`,
    '',
    `PODE AGORA: ${faseResumo}`,
    NUNCA_RESUMO,
  ];
  if (reacoes.length > 0) {
    linhas.push(`⚠️ JÁ TEVE REAÇÃO A: ${reacoes.join(', ')}. NÃO oferecer.`);
  }
  linhas.push(
    'Sempre: sentado no cadeirão, adulto ao lado o tempo todo, sem telas.',
    'Careta e tosse BARULHENTA = normal. Deixe tossir, não intervenha.',
    'SILÊNCIO + lábios roxos = engasgo real → manobras e ligue 192 (SAMU).',
    ''
  );
  if (contato) linhas.push(`Falar com a família: ${contato}`);
  linhas.push(`Passo a passo do engasgo e guia completo: ${linkApp}`);
  return linhas.join('\n');
}

export default function Cuidador() {
  const [nascimento] = useNascimento();
  const [nome, setNome] = usePersistido<string>('nome-bebe', '');
  const [contato, setContato] = usePersistido<string>('contato-familia', '');
  const [copiado, setCopiado] = useState(false);

  const idade = calcularIdade(nascimento);
  const fase = idade ? faseParaMeses(idade.meses) : null;

  if (!idade || !fase) {
    return (
      <div className="space-y-6">
        <BannerBebe />
        <h1 className="text-2xl font-bold">Cartão do cuidador</h1>
        <p className="rounded-xl bg-warn-soft p-4 text-sm">
          {!idade
            ? 'Informe a data de nascimento na tela Início para gerar o cartão da idade certa.'
            : 'O cartão cobre a fase de introdução alimentar (6–24 meses).'}{' '}
          <Link href="/" className="font-medium text-primary underline">
            Ir para o Início
          </Link>
        </p>
      </div>
    );
  }

  const registro = lerStorage<Record<string, { status: string }>>('alergenicos', {});
  const reacoes = alergenicos.filter(a => registro[a.id]?.status === 'reacao').map(a => a.nome);

  // Primeira frase da consistência da fase = resumo do que pode agora
  const faseResumo = `${fase.consistencia.split('.')[0].toLowerCase()}; frutas nos lanches; água no copo.`;
  const linkApp = `${window.location.origin}${window.location.pathname}?bb=${nascimento}`;

  const texto = montarCartao({
    nome: nome.trim(),
    idadeTexto: descreverIdade(idade),
    faseResumo,
    reacoes,
    contato: contato.trim(),
    linkApp,
  });

  const compartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: texto });
        return;
      } catch {
        return; // usuário cancelou
      }
    }
    copiar();
  };

  const copiar = async () => {
    await navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <Users className="h-6 w-6 text-primary" aria-hidden />
          Cartão do cuidador
        </h1>
        <p className="text-ink-soft">
          Vai deixar o bebê com avó, babá ou creche? Compartilhe este resumo pelo WhatsApp — o
          essencial da idade atual, sem sermão, em 15 linhas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-nome" className="mb-1 block text-sm font-semibold">
            Nome do bebê (opcional)
          </label>
          <input
            id="c-nome"
            type="text"
            placeholder="Ex.: Pedro"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="c-contato" className="mb-1 block text-sm font-semibold">
            Telefone da família (opcional)
          </label>
          <input
            id="c-contato"
            type="tel"
            placeholder="Ex.: (16) 99999-9999"
            value={contato}
            onChange={e => setContato(e.target.value)}
            className="w-full rounded-lg border-2 border-stone-200 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-soft">
          Prévia do que será enviado
        </p>
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{texto}</pre>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={compartilhar}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
        >
          <Share2 className="h-5 w-5" aria-hidden />
          Compartilhar
        </button>
        <button
          onClick={copiar}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary py-3 font-bold text-primary hover:bg-surf-azul"
        >
          <Copy className="h-5 w-5" aria-hidden />
          {copiado ? 'Copiado ✓' : 'Copiar texto'}
        </button>
      </div>

      <p className="rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
        O link do fim do cartão abre o app já configurado com a idade do bebê no aparelho de quem
        receber — bom para a avó ter o passo a passo do engasgo à mão. Gere um cartão novo quando
        a fase mudar.
      </p>
    </div>
  );
}
