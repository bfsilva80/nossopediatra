import { useNascimento } from '@/components/BannerBebe';
import DicaInstalar from '@/components/DicaInstalar';
import { alergenicos } from '@/content/seguranca';
import { alimentos } from '@/content/alimentos';
import { fases } from '@/content/fases';
import { calcularIdade, descreverIdade, faseParaMeses } from '@/lib/idade';
import { lerStorage, usePersistido } from '@/lib/storage';
import { useTreino } from '@/pages/Treino';
import {
  AlertTriangle,
  Baby,
  BookOpen,
  ChefHat,
  GraduationCap,
  HelpCircle,
  NotebookPen,
  Scale,
  Search,
  Sprout,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [ferroDias, setFerroDias] = usePersistido<string[]>('ferro-dias', []);
  const [treino, setTreino] = useTreino();

  // Chegou pelo link do cartão do cuidador (?bb=data): configura a idade
  // sozinho, para a avó/babá abrir o app já na fase certa, sem digitar nada.
  useEffect(() => {
    if (nascimento) return;
    const bb = new URLSearchParams(window.location.search).get('bb');
    if (bb && calcularIdade(bb)) setNascimento(bb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <DicaInstalar />
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

  // Ferro: marcação leve, sem sequências nem cobrança — só o positivo.
  // ENANI-2019: quase metade dos bebês de 6–11 meses não consumiu
  // carne/ovo no dia anterior; o widget existe para puxar esse número.
  const hojeISO = new Date().toISOString().slice(0, 10);
  const ferroHoje = ferroDias.includes(hojeISO);
  const ferroUltimos7 = ferroDias.filter(
    d => (Date.now() - new Date(`${d}T12:00:00`).getTime()) / 86_400_000 < 7
  ).length;

  const diasDesde = (iso: string | null) =>
    iso === null ? Infinity : (Date.now() - new Date(`${iso}T12:00:00`).getTime()) / 86_400_000;
  const mostrarNudgeTreino =
    diasDesde(treino.ultimoTreino) > 90 && diasDesde(treino.dispensadoEm) > 30;

  // Ideia do dia: um alimento ainda não experimentado, adequado à idade,
  // escolhido de forma determinística pelo dia do ano (muda a cada dia).
  // Enquanto o ferro de hoje não foi marcado, priorizamos fontes de ferro.
  const candidatos = alimentos.filter(
    a => (a.quando === '6m' || (a.quando === '9m' && meses >= 9)) && !experimentados.includes(a.id)
  );
  const candidatosFerro = candidatos.filter(a => a.ferro);
  const pool = !ferroHoje && candidatosFerro.length > 0 ? candidatosFerro : candidatos;
  const diaDoAno = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  const ideiaDoDia = pool.length > 0 ? pool[diaDoAno % pool.length] : null;

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

      {meses <= 7 && (
        <Link
          href="/comecando"
          className="flex items-center gap-3 rounded-2xl border-2 border-primary bg-primary-soft p-4"
        >
          <Sprout className="h-8 w-8 shrink-0 text-primary" aria-hidden />
          <span className="flex-1">
            <span className="block font-bold">Começando agora?</span>
            <span className="block text-sm text-ink-soft">
              A primeira semana passo a passo — e o que é normal acontecer.
            </span>
          </span>
        </Link>
      )}

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

      <section
        aria-labelledby="titulo-ferro"
        className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="titulo-ferro" className="font-bold">
              Ferro hoje <span aria-hidden>🥩</span>
            </h2>
            <p className="text-sm text-ink-soft">
              {ferroHoje
                ? 'Marcado! Uma fruta com vitamina C de sobremesa ajuda a absorver.'
                : 'O bebê comeu carne, frango, ovo, peixe, feijão ou lentilha hoje?'}
            </p>
          </div>
          <button
            onClick={() =>
              setFerroDias(dias =>
                ferroHoje ? dias.filter(d => d !== hojeISO) : [...dias, hojeISO]
              )
            }
            aria-pressed={ferroHoje}
            className={`shrink-0 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
              ferroHoje
                ? 'border-primary bg-primary text-white'
                : 'border-primary text-primary hover:bg-primary-soft'
            }`}
          >
            {ferroHoje ? 'Sim ✓' : 'Sim!'}
          </button>
        </div>
        {ferroUltimos7 > 0 && (
          <p className="mt-2 text-xs text-ink-soft">
            {ferroUltimos7 === 1
              ? '1 dia com ferro nos últimos 7'
              : `${ferroUltimos7} dias com ferro nos últimos 7`}{' '}
            — cada um conta.
          </p>
        )}
        <p className="mt-2 text-xs text-ink-soft">
          A marcação não substitui a suplementação de ferro prescrita pelo pediatra.
        </p>
      </section>

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
          <Link href="/seguranca/rastreador" className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-primary">
            <p className="text-3xl font-extrabold text-primary">
              {alergenicosOfertados}
              <span className="text-base font-semibold text-ink-soft">/{alergenicos.length}</span>
            </p>
            <p className="mt-1 text-sm font-semibold">alergênicos introduzidos</p>
            <p className="text-xs text-ink-soft">toque para atualizar</p>
          </Link>
        </div>
      </section>

      {mostrarNudgeTreino && (
        <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden />
          <Link href="/treino" className="flex-1">
            <span className="block font-bold">
              {treino.ultimoTreino
                ? 'Faz mais de 3 meses do seu último treino de engasgo'
                : 'Você saberia agir num engasgo?'}
            </span>
            <span className="block text-sm text-ink-soft">
              Treine as manobras em 3 minutos — sem pressa, sem emergência.
            </span>
          </Link>
          <button
            aria-label="Dispensar lembrete de treino"
            onClick={() =>
              setTreino(prev => ({ ...prev, dispensadoEm: new Date().toISOString().slice(0, 10) }))
            }
            className="-m-1 p-1 text-ink-soft hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}

      <Link
        href="/cuidador"
        className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-primary"
      >
        <Users className="h-6 w-6 shrink-0 text-primary" aria-hidden />
        <span className="flex-1">
          <span className="block font-bold">Vai deixar com a avó, babá ou creche?</span>
          <span className="block text-sm text-ink-soft">
            Gere o cartão do cuidador: o essencial da idade atual em 15 linhas, pronto para o
            WhatsApp.
          </span>
        </span>
      </Link>

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

      <DicaInstalar />

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
