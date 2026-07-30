import { cartoesManobra, type CartaoManobra } from '@/content/ilustracoes';
import { imagensManobra } from '@/lib/imagensManobra';
import { X, ZoomIn } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Galeria das ilustrações das manobras — usada em Segurança e Treino.
 *
 * NÃO entra na tela de Emergência por decisão de produto: lá o passo a passo é
 * texto-primeiro, e os quadros SVG (leves, geometria explícita) abrem instantâneo
 * mesmo offline. Estas imagens são para aprender com calma, não para operar em pânico.
 *
 * O texto clínico vem sempre de `content/`; a imagem ilustra. Por isso o `alt`
 * descreve a técnica, não a cena — é o que o leitor de tela anuncia.
 */

function Cartao({ cartao, onAbrir }: { cartao: CartaoManobra; onAbrir: () => void }) {
  return (
    <button
      onClick={onAbrir}
      className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white text-left shadow-sm hover:border-primary"
    >
      <img
        src={imagensManobra[cartao.id]}
        alt={cartao.alt}
        loading="lazy"
        decoding="async"
        className="aspect-[9/16] w-full object-cover"
      />
      <span
        aria-hidden
        className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-ink-soft shadow-sm group-hover:text-primary"
      >
        <ZoomIn className="h-4 w-4" />
      </span>
      <span className="block p-2 text-xs font-semibold leading-snug">{cartao.legenda}</span>
    </button>
  );
}

function Ampliada({ cartao, aoFechar }: { cartao: CartaoManobra; aoFechar: () => void }) {
  // Esc fecha, e a rolagem do fundo trava enquanto a imagem está aberta.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') aoFechar();
    };
    document.addEventListener('keydown', aoTeclar);
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = overflowAnterior;
    };
  }, [aoFechar]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cartao.legenda}
      onClick={aoFechar}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-ink/90 p-4"
    >
      <button
        onClick={aoFechar}
        aria-label="Fechar imagem"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
      >
        <X className="h-6 w-6" aria-hidden />
      </button>
      <img
        src={imagensManobra[cartao.id]}
        alt={cartao.alt}
        onClick={e => e.stopPropagation()}
        className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
      />
      <p className="max-w-md text-center text-sm text-white/90">{cartao.legenda}</p>
    </div>
  );
}

export default function GaleriaManobras({
  faixa,
  className,
}: {
  /** 'menor1ano' e 'maior1ano' incluem também os cartões marcados como 'ambos'. */
  faixa: 'menor1ano' | 'maior1ano' | 'todas';
  className?: string;
}) {
  const [aberto, setAberto] = useState<CartaoManobra | null>(null);

  const cartoes =
    faixa === 'todas'
      ? cartoesManobra
      : cartoesManobra.filter(c => c.faixa === faixa || c.faixa === 'ambos');

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${className ?? ''}`}>
        {cartoes.map(c => (
          <Cartao key={c.id} cartao={c} onAbrir={() => setAberto(c)} />
        ))}
      </div>
      {aberto && <Ampliada cartao={aberto} aoFechar={() => setAberto(null)} />}
    </>
  );
}
