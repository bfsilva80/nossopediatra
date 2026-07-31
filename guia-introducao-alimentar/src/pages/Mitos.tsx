import BannerBebe from '@/components/BannerBebe';
import { mitos } from '@/content/mitos';
import { Sparkles } from 'lucide-react';
import { Link } from 'wouter';

/**
 * Mitos: seção de defesa da família contra o "sempre foi assim".
 * Estrutura fixa: o mito (como se fala) → a verdade → por que a crença
 * pegou (acolhe a avó em vez de humilhá-la — ela quase sempre repete a
 * orientação médica da época dela).
 */
export default function Mitos() {
  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="h-6 w-6 text-primary" aria-hidden />
          "Sempre foi assim": os mitos
        </h1>
        <p className="text-ink-soft">
          Quase todo mito da introdução alimentar já foi orientação médica de outra época — quem
          repete está tentando ajudar. Aqui está o que mudou, e por quê.
        </p>
      </div>

      <div className="space-y-4">
        {mitos.map(m => (
          <article key={m.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <p className="bg-stone-100 px-5 py-3 font-bold italic">{m.mito}</p>
            <div className="space-y-3 p-5 text-sm">
              <p>
                <span className="font-bold text-primary">O que a ciência diz: </span>
                {m.verdade}
              </p>
              <p className="text-ink-soft">
                <span className="font-semibold">Por que esse mito pegou: </span>
                {m.porquePegou}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="rounded-xl bg-surf-azul p-4 text-sm">
        <strong>Vai discutir com a avó?</strong> Melhor que discutir: gere o{' '}
        <Link href="/cuidador" className="font-medium text-primary underline">
          cartão do cuidador
        </Link>{' '}
        — o essencial da idade atual, sem sermão, pronto para o WhatsApp da família.
      </p>
    </div>
  );
}
