import BannerBebe from '@/components/BannerBebe';
import Expansivel from '@/components/Expansivel';
import { pratosFamilia, principioFamilia } from '@/content/familia';
import { ChefHat, Check, X } from 'lucide-react';
import { Link } from 'wouter';

/**
 * "Hoje tem feijoada — o que o bebê come disso?"
 * A pergunta que toda família faz no domingo, respondida prato a prato.
 */
export default function ComidaDaFamilia() {
  return (
    <div className="space-y-6">
      <BannerBebe />

      <div>
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          <ChefHat className="h-6 w-6 text-primary" aria-hidden />
          Hoje tem… o que o bebê come disso?
        </h1>
        <p className="text-ink-soft">
          O bebê não precisa de cardápio paralelo: ele come a comida da família, adaptada. Ache o
          prato de hoje e veja o que separar, como preparar e o que fica de fora.
        </p>
      </div>

      <p className="rounded-2xl bg-primary-soft p-4 text-sm">
        <strong>A regra de ouro:</strong> {principioFamilia}
      </p>

      <div className="space-y-3">
        {pratosFamilia.map(prato => (
          <Expansivel
            key={prato.id}
            titulo={`${prato.icone} ${prato.nome}`}
            subtitulo={prato.resumo}
          >
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="mb-2 flex items-center gap-1.5 font-semibold text-primary">
                  <Check className="h-4 w-4" aria-hidden />
                  Vai para o prato do bebê
                </h3>
                <ul className="space-y-1.5">
                  {prato.podeDoPrato.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-primary">Como adaptar</h3>
                <ol className="space-y-1.5">
                  {prato.comoAdaptar.map((passo, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-semibold text-primary">{i + 1}.</span>
                      {passo}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="mb-2 flex items-center gap-1.5 font-semibold text-danger">
                  <X className="h-4 w-4" aria-hidden />
                  Fica de fora
                </h3>
                <ul className="space-y-1.5">
                  {prato.ficaDeFora.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Expansivel>
        ))}
      </div>

      <p className="rounded-xl bg-stone-100 p-4 text-sm text-ink-soft">
        Não achou o prato de hoje? A regra de ouro lá de cima resolve quase tudo. E o corte
        seguro de cada ingrediente está no{' '}
        <Link href="/alimentos" className="font-medium text-primary underline">
          Posso dar…?
        </Link>
      </p>
    </div>
  );
}
