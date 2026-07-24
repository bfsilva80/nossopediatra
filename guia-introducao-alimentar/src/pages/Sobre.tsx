import BannerBebe from '@/components/BannerBebe';
import { APP_VERSAO, linkFeedback } from '@/lib/feedback';
import { MessageCircle, ShieldCheck } from 'lucide-react';

const fontes = [
  'Guia Alimentar para Crianças Brasileiras Menores de 2 Anos — Ministério da Saúde, 2019',
  'Manual de Alimentação: orientações para alimentação do lactente ao adolescente — Sociedade Brasileira de Pediatria',
  'Consensos brasileiros e internacionais sobre introdução precoce de alimentos alergênicos',
  'Ensaios do método BLISS (Baby-Led Introduction to SolidS) — Universidade de Otago, Nova Zelândia',
  'Diretrizes de suporte básico de vida pediátrico (desobstrução de vias aéreas)',
];

export default function Sobre() {
  return (
    <div className="space-y-8">
      <BannerBebe />

      <div>
        <h1 className="mb-2 text-2xl font-bold">Sobre este guia</h1>
        <p className="text-ink-soft">
          Um app do NossoPediatra para acompanhar famílias na introdução alimentar, dos 6 aos 24
          meses — feito para ser consultado na cozinha, com uma mão só.
        </p>
      </div>

      <section className="rounded-2xl border-2 border-warn bg-warn-soft p-5">
        <h2 className="mb-2 flex items-center gap-2 font-bold">
          <ShieldCheck className="h-5 w-5 text-warn" aria-hidden />
          Status: versão de teste, em revisão clínica
        </h2>
        <p className="text-sm">
          O conteúdo foi escrito a partir das diretrizes brasileiras listadas abaixo, mas ainda
          passa por revisão final do pediatra responsável — os pontos em confirmação estão
          marcados para validação no material de origem. Este app é educativo e{' '}
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
        <h2 className="mb-3 text-lg font-bold">Seus dados</h2>
        <p className="rounded-xl bg-white p-4 text-sm shadow-sm">
          Tudo o que você registra — data de nascimento, diário, alimentos experimentados,
          alergênicos — fica armazenado <strong>somente neste aparelho</strong> (no navegador).
          Nada é enviado a servidores, não há cadastro e não há rastreamento de uso. Se você limpar
          os dados do navegador, os registros são apagados.
        </p>
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
    </div>
  );
}
