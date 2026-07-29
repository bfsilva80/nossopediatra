import logo from '@/assets/logo.svg';
import BannerBebe from '@/components/BannerBebe';
import { APP_VERSAO, BUILD_INFO, linkFeedback } from '@/lib/feedback';
import { ArrowLeftRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';

const fontes = [
  'Guia Alimentar para Crianças Brasileiras Menores de 2 Anos — Ministério da Saúde, 2019',
  'Manual de Alimentação: orientações para alimentação do lactente ao adolescente — Sociedade Brasileira de Pediatria',
  'Consensos brasileiros e internacionais sobre introdução precoce de alimentos alergênicos',
  'Ensaios do método BLISS (Baby-Led Introduction to SolidS) — Universidade de Otago, Nova Zelândia',
  'Diretrizes de suporte básico de vida pediátrico — 2025 AHA/AAP Guidelines for CPR and ECC, Part 6: Pediatric Basic Life Support (Circulation, out/2025)',
];

export default function Sobre() {
  return (
    <div className="space-y-8">
      <BannerBebe />

      <div className="flex items-start gap-4">
        <img src={logo} alt="Logo do Nosso Pediatra" className="h-16 w-16 shrink-0" />
        <div>
          <h1 className="mb-2 text-2xl font-bold">Sobre este guia</h1>
          <p className="text-ink-soft">
            Este app faz parte do projeto <strong>Nosso Pediatra</strong> e acompanha famílias na
            introdução alimentar, dos 6 aos 24 meses — feito para ser consultado na cozinha, com
            uma mão só.
          </p>
        </div>
      </div>

      <section className="rounded-2xl border-2 border-warn bg-warn-soft p-5">
        <h2 className="mb-2 flex items-center gap-2 font-bold">
          <ShieldCheck className="h-5 w-5 text-warn" aria-hidden />
          Status: versão de teste — conteúdo revisado clinicamente
        </h2>
        <p className="text-sm">
          O conteúdo foi escrito a partir das diretrizes brasileiras listadas abaixo e revisado
          pelo pediatra responsável em julho/2026. Este app é educativo e{' '}
          <strong>não substitui a consulta com o pediatra que acompanha o seu bebê</strong>. Em
          emergência, ligue 192.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Fontes</h2>
        <ul className="space-y-2">
          {fontes.map((f, i) => (
            <li key={i} className="rounded-xl bg-white p-4 text-sm shadow-sm">
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Levar na cozinha (funciona offline)</h2>
        <p className="rounded-xl bg-white p-4 text-sm shadow-sm">
          Adicione o app à tela inicial do celular e ele abre em um toque, mesmo sem internet:
          no Android, menu do navegador (⋮) → "Adicionar à tela inicial"; no iPhone, botão de
          compartilhar → "Adicionar à Tela de Início".
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Seus dados</h2>
        <p className="rounded-xl bg-white p-4 text-sm shadow-sm">
          Tudo o que você registra — data de nascimento, diário, alimentos experimentados,
          alergênicos — fica armazenado <strong>somente neste aparelho</strong> (no navegador).
          Nada é enviado a servidores, não há cadastro e não há rastreamento de uso. Se você limpar
          os dados do navegador, os registros são apagados.
        </p>
        <Link
          href="/transferir"
          className="mt-3 flex items-center gap-2 rounded-xl border-2 border-primary p-3 text-sm font-bold text-primary hover:bg-primary-soft"
        >
          <ArrowLeftRight className="h-5 w-5 shrink-0" aria-hidden />
          Trocou de celular? Levar os dados para outro aparelho
        </Link>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Encontrou algo confuso ou errado?</h2>
        <p className="mb-3 text-sm text-ink-soft">
          Esta versão existe para ouvir famílias de verdade. Conte o que funcionou, o que
          confundiu e o que faltou:
        </p>
        <a
          href={linkFeedback('tela Sobre')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white hover:opacity-90"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Enviar feedback pelo WhatsApp
        </a>
      </section>

      <p className="text-center text-xs text-ink-soft">
        {APP_VERSAO} · NossoPediatra · Amor de pai. Ciência de médico.
      </p>
      <p className="text-center text-[11px] text-ink-soft/70">
        publicado de <code>{BUILD_INFO.commit}</code> ({BUILD_INFO.branch}) em{' '}
        {BUILD_INFO.data} UTC
      </p>
    </div>
  );
}
