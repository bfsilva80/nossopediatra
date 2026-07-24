import { useNascimento } from '@/components/BannerBebe';
import { alergenicos } from '@/content/seguranca';
import { alimentos } from '@/content/alimentos';
import { fases } from '@/content/fases';
import { calcularIdade, descreverIdade, faseParaMeses } from '@/lib/idade';
import { lerStorage, usePersistido } from '@/lib/storage';
import {
  AlertTriangle,
  Baby,
  BookOpen,
  ChefHat,
  HelpCircle,
  NotebookPen,
  Scale,
  Search,
  Sprout,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

interface FormNascimentoProps {
  nascimento: string;
  setNascimento: (valor: string) => void;
}

function FormNascimento({ nascimento, setNascimento }: FormNascimentoProps) {
  const [rascunho, setRascunho] = useState(nascimento);
  const [erro, setErro] = useState('');
  const hojeISO = new Date().toISOString().slice(0, 10);

  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rascunho || !calcularIdade(rascunho)) {
      setErro('Confira a data — ela não pode estar vazia nem no futuro.');
      return;
    }
    setErro('');
    setNascimento(rascunho);
  };

  return (
    <form onSubmit={salvar} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <label htmlFor="nascimento" className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Baby className="h-4 w-4 text-primary" aria-hidden />
        Data de nascimento do bebê
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="nascimento"
          type="date"
          max={hojeISO}
          value={rascunho}
          onChange={e => setRascunho(e.target.value)}
          className="flex-1 rounded-lg border-2 border-stone-200 px-4 py-2.5 focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white hover:opacity-90"
        >
          {nascimento ? 'Atualizar' : 'Começar'}
        </button>
      </div>
      {erro && (
        <p role="alert" className="mt-2 text-sm text-danger">
          {erro}
        </p>
      )}
      <p className="mt-3 text-xs text-ink-soft">Os dados ficam somente neste aparelho.</p>
    </form>
  );
}

interface Atalho {
  href: string;
  titulo: string;
  descricao: string;
  Icone: typeof Search;
  destaque?: boolean;
}

function GradeAtalhos({ atalhos }: { atalhos: Atalho[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {atalhos.map(({ href, titulo, descricao, Icone, destaque }) => (
        <Link
          key={href + titulo}
          href={href}
          className={`rounded-2xl p-4 shadow-sm transition-colors ${
            destaque
              ? 'bg-danger text-white hover:opacity-95'
              : 'border border-stone-200 bg-white hover:border-primary'
          }`}
        >
          <Icone className={`mb-2 h-6 w-6 ${destaque ? '' : 'text-primary'}`} aria-hidden />
          <p className="font-bold leading-tight">{titulo}</p>
          <p className={`mt-1 text-xs ${destaque ? 'text-white/85' : 'text-ink-soft'}`}>{descricao}</p>
        </Link>
      ))}
    </div>
  );
}

export default function Inicio() {
  const [nascimento, setNascimento] = useNascimento();
  const idade = calcularIdade(nascimento);
  const formNascimento = <FormNascimento nascimento={nascimento} setNascimento={setNascimento} />;
  const [experimentados] = usePersistido<string[]>('alimentos-experimentados', []);
  const registroAlergenicos = lerStorage<Record<string, { status: string }>>('alergenicos', {});

  const elegiveis = alimentos.filter(a => a.quando === '6m' || a.quando === '9m').length;
  const alergenicosOfertados = alergenicos.filter(
    a => registroAlergenicos[a.id]?.status === 'ok' || registroAlergenicos[a.id]?.status === 'reacao'
  ).length;

  // ——— Sem data: boas-vindas ———
  if (!idade) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="mb-2 text-2xl font-bold">Introdução alimentar, sem pânico</h1>
          <p className="text-ink-soft">
            Do primeiro amassadinho à comida da família: o que oferecer, como cortar com segurança
            e o que fazer quando algo sai do roteiro — tudo na idade do SEU bebê.
          </p>
        </div>
        {formNascimento}
        <GradeAtalhos
          atalhos={[
            { href: '/alimentos', titulo: 'Posso dar…?', descricao: 'Busque qualquer alimento', Icone: Search },
            { href: '/emergencia', titulo: 'Engasgo', descricao: 'Passo a passo de socorro', Icone: AlertTriangle, destaque: true },
            { href: '/comecando', titulo: 'Como começar', descricao: 'Prontidão e primeira semana', Icone: Sprout },
            { href: '/duvidas', titulo: 'Dúvidas', descricao: 'Perguntas frequentes', Icone: HelpCircle },
          ]}
        />
      </div>
    );
  }

  const { meses } = idade;
  const fase = faseParaMeses(meses);

  // ——— Antes dos 6 meses: preparação ———
  if (meses < 6) {
    const alvo = new Date(`${nascimento}T00:00:00`);
    alvo.setMonth(alvo.getMonth() + 6);
    const diasRestantes = Math.max(0, Math.ceil((alvo.getTime() - Date.now()) / 86_400_000));
    return (
      <div className="space-y-8">
        <div className="rounded-2xl bg-primary-soft p-5">
          <h1 className="mb-1 text-xl font-bold">Seu bebê tem {descreverIdade(idade)}</h1>
          <p className="text-sm">
            Ainda é tempo de leite (materno ou fórmula) em exclusiva. A janela dos 6 meses chega em
            aproximadamente <strong>{diasRestantes} dias</strong> — e dá para se preparar desde já.
          </p>
        </div>
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Preparação para a chegada da comida</h2>
          <ul className="space-y-3">
          {[
            'Aprenda as manobras de engasgo com calma agora, antes da primeira papa (procure também um curso presencial)',
            'Observe os sinais de prontidão aparecerem — a lista está em "Como começar"',
            'Providencie cadeira de alimentação em que o bebê fique sentado e ereto',
            'Nada de papinha antes da hora: antecipar só com indicação expressa do pediatra',
          ].map((item, i) => (
            <li key={i} className="list-none rounded-xl bg-white p-4 text-sm shadow-sm">
              {item}
            </li>
          ))}
          </ul>
        </section>
        <GradeAtalhos
          atalhos={[
            { href: '/comecando', titulo: 'Como começar', descricao: 'Sinais de prontidão', Icone: Sprout },
            { href: '/emergencia', titulo: 'Engasgo', descricao: 'Aprenda antes de precisar', Icone: AlertTriangle, destaque: true },
            { href: '/metodos', titulo: 'Colher, BLW ou BLISS?', descricao: 'Decida com calma antes da primeira papa', Icone: Scale },
            { href: '/duvidas', titulo: 'Dúvidas', descricao: 'Perguntas frequentes', Icone: HelpCircle },
          ]}
        />
        {formNascimento}
      </div>
    );
  }

  // ——— Depois dos 24 meses ———
  if (meses > 24 || !fase) {
    return (
      <div className="space-y-8">
        <div className="rounded-2xl bg-primary-soft p-5">
          <h1 className="mb-1 text-xl font-bold">Missão cumprida <span aria-hidden>🎉</span></h1>
          <p className="text-sm">
            Com {descreverIdade(idade)}, seu bebê já atravessou a introdução alimentar — agora a
            criança come a comida da família. As regras que seguem valendo: sem ultraprocessados,
            pouco sal, açúcar só de vez em quando, e refeições juntos à mesa.
          </p>
        </div>
        <GradeAtalhos
          atalhos={[
            { href: '/alimentos', titulo: 'Posso dar…?', descricao: 'Cortes e cuidados por alimento', Icone: Search },
            { href: '/emergencia', titulo: 'Engasgo', descricao: 'Passo a passo de socorro', Icone: AlertTriangle, destaque: true },
            { href: '/receitas', titulo: 'Receitas', descricao: 'Pratos da família', Icone: ChefHat },
            { href: '/duvidas', titulo: 'Dúvidas', descricao: 'Perguntas frequentes', Icone: HelpCircle },
          ]}
        />
        {formNascimento}
      </div>
    );
  }

  // ——— 6–24 meses: painel principal ———
  const indiceFase = fases.findIndex(f => f.id === fase.id);
  const proximaFase = fases[indiceFase + 1];

  // Ideia do dia: um alimento ainda não experimentado, adequado à idade,
  // escolhido de forma determinística pelo dia do ano (muda a cada dia).
  const candidatos = alimentos.filter(
    a => (a.quando === '6m' || (a.quando === '9m' && meses >= 9)) && !experimentados.includes(a.id)
  );
  const diaDoAno = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  const ideiaDoDia = candidatos.length > 0 ? candidatos[diaDoAno % candidatos.length] : null;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-primary p-5 text-white">
        <p className="text-sm text-white/80">Seu bebê tem {descreverIdade(idade)}</p>
        <h1 className="mt-1 text-2xl font-bold">
          <span aria-hidden>{fase.icone}</span> {fase.nome}
        </h1>
        <p className="mt-2 text-sm text-white/90">{fase.resumo}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/fases"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-primary hover:opacity-90"
          >
            Ver minha fase
          </Link>
          {proximaFase && (
            <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
              próxima: {proximaFase.faixa}
            </span>
          )}
        </div>
      </section>

      {ideiaDoDia && (
        <Link
          href="/alimentos"
          className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-primary bg-primary-soft p-4 hover:border-solid"
        >
          <span className="text-3xl" aria-hidden>
            {ideiaDoDia.emoji}
          </span>
          <span className="flex-1">
            <span className="block text-xs font-bold uppercase tracking-wide text-primary">
              Ideia para hoje
            </span>
            <span className="block text-sm">
              Que tal oferecer <strong>{ideiaDoDia.nome.toLowerCase()}</strong>? Toque para ver
              como.
            </span>
          </span>
        </Link>
      )}

      <section aria-labelledby="titulo-progresso">
        <h2 id="titulo-progresso" className="mb-3 text-lg font-bold">
          Progresso da jornada
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/alimentos" className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-primary">
            <p className="text-3xl font-extrabold text-primary">
              {experimentados.length}
              <span className="text-base font-semibold text-ink-soft">/{elegiveis}</span>
            </p>
            <p className="mt-1 text-sm font-semibold">alimentos experimentados</p>
            <p className="text-xs text-ink-soft">toque para marcar mais</p>
          </Link>
          <Link href="/seguranca" className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-primary">
            <p className="text-3xl font-extrabold text-primary">
              {alergenicosOfertados}
              <span className="text-base font-semibold text-ink-soft">/{alergenicos.length}</span>
            </p>
            <p className="mt-1 text-sm font-semibold">alergênicos introduzidos</p>
            <p className="text-xs text-ink-soft">toque para atualizar</p>
          </Link>
        </div>
      </section>

      <section aria-labelledby="titulo-atalhos">
        <h2 id="titulo-atalhos" className="mb-3 text-lg font-bold">
          O que você precisa agora
        </h2>
        <GradeAtalhos
          atalhos={[
            { href: '/alimentos', titulo: 'Posso dar…?', descricao: 'Busque qualquer alimento', Icone: Search },
            { href: '/emergencia', titulo: 'Engasgo', descricao: 'Socorro passo a passo', Icone: AlertTriangle, destaque: true },
            { href: '/receitas', titulo: 'Receitas da fase', descricao: `Para ${fase.faixa}`, Icone: ChefHat },
            { href: '/diario', titulo: 'Registrar refeição', descricao: 'Diário para a consulta', Icone: NotebookPen },
          ]}
        />
      </section>

      <section className="grid grid-cols-2 gap-3 text-center text-sm">
        <Link href="/fases" className="rounded-xl bg-stone-100 p-3 font-semibold hover:bg-primary-soft">
          <BookOpen className="mx-auto mb-1 h-5 w-5 text-primary" aria-hidden />
          Fases
        </Link>
        <Link href="/metodos" className="rounded-xl bg-stone-100 p-3 font-semibold hover:bg-primary-soft">
          <Scale className="mx-auto mb-1 h-5 w-5 text-primary" aria-hidden />
          Colher, BLW ou BLISS?
        </Link>
        <Link href="/comecando" className="rounded-xl bg-stone-100 p-3 font-semibold hover:bg-primary-soft">
          <Sprout className="mx-auto mb-1 h-5 w-5 text-primary" aria-hidden />
          Como começar
        </Link>
        <Link href="/duvidas" className="rounded-xl bg-stone-100 p-3 font-semibold hover:bg-primary-soft">
          <HelpCircle className="mx-auto mb-1 h-5 w-5 text-primary" aria-hidden />
          Dúvidas
        </Link>
      </section>

      {formNascimento}
    </div>
  );
}
