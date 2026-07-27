import type { QuadroManobra } from '@/content/seguranca';
import type { ReactElement } from 'react';

/**
 * Os 6 quadros ilustrados das manobras e da prevenção de engasgo, em traço
 * esquemático (estilo cartão de segurança de avião). Geometria idêntica à
 * página de aprovação — APROVADOS quadro a quadro pelo pediatra responsável
 * em 25/07/2026. Qualquer alteração de posição/zonas exige nova aprovação.
 */

const INK = '#1a2b33';
const SKIN = '#f2e3d0';
const BABY = '#d9e8f0';
const DANGER = '#b91c1c';
const OK = '#1a6f50';
const SOFT = '#506470';
const LINE = '#dbe4e8';

const tr = {
  stroke: INK,
  strokeWidth: 6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
} as const;
const trFino = { stroke: INK, strokeWidth: 3.5, strokeLinecap: 'round', fill: 'none' } as const;
const acao = { stroke: DANGER, strokeWidth: 6, strokeLinecap: 'round', fill: 'none' } as const;
const som = { stroke: OK, strokeWidth: 5, strokeLinecap: 'round', fill: 'none' } as const;
const rotulo = { fontSize: 22, fontWeight: 800, fill: DANGER, fontFamily: 'inherit' } as const;

function Golpes() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Adulto sentado com bebê de bruços no antebraço apoiado na coxa, cabeça do bebê mais baixa que o corpo, aplicando golpes entre as escápulas">
      <circle {...tr} fill={SKIN} cx="336" cy="58" r="24" />
      <path {...tr} d="M330 84 Q318 130 314 178" />
      <path {...tr} d="M314 178 L128 244" />
      <path {...tr} d="M128 244 L124 282" />
      <path {...tr} d="M306 196 L134 252" />
      <ellipse {...tr} fill={SKIN} cx="122" cy="256" rx="16" ry="11" transform="rotate(-18 122 256)" />
      <ellipse {...tr} fill={BABY} cx="218" cy="210" rx="66" ry="26" transform="rotate(-17 218 210)" />
      <circle {...tr} fill={BABY} cx="140" cy="238" r="21" />
      <path {...trFino} d="M280 188 L302 172 M276 196 L300 190" />
      <ellipse fill={DANGER} opacity="0.85" cx="192" cy="197" rx="13" ry="9" transform="rotate(-17 192 197)" />
      <path {...tr} d="M322 104 L248 152" />
      <rect {...tr} fill={SKIN} x="196" y="164" width="46" height="17" rx="8" transform="rotate(-32 219 172)" />
      <path {...acao} d="M266 92 L236 128" />
      <path fill={DANGER} d="M236 128 L249 122 L238 111 Z" />
      <text {...rotulo} x="280" y="82">5×</text>
    </svg>
  );
}

function Compressoes() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Bebê de barriga para cima no antebraço do adulto, cabeça mais baixa, dois dedos comprimindo o centro do peito logo abaixo da linha dos mamilos">
      <path {...tr} d="M338 168 L152 238" />
      <ellipse {...tr} fill={SKIN} cx="140" cy="252" rx="17" ry="12" transform="rotate(-18 140 252)" />
      <path {...tr} d="M348 210 L142 278" />
      <ellipse {...tr} fill={BABY} cx="216" cy="206" rx="66" ry="27" transform="rotate(-17 216 206)" />
      <circle {...tr} fill={BABY} cx="138" cy="236" r="22" />
      <path {...trFino} d="M130 230 L138 228 M144 226 L152 224" />
      <path {...trFino} d="M200 181 L232 197" strokeDasharray="5 6" />
      <ellipse fill={DANGER} opacity="0.85" cx="212" cy="198" rx="10" ry="8" />
      <path {...tr} d="M206 150 L208 190 M222 146 L220 188" />
      <path {...tr} fill={SKIN} d="M200 128 L230 122 L226 150 L204 154 Z" />
      <path {...acao} d="M258 128 L232 168" />
      <path fill={DANGER} d="M232 168 L244 160 L228 152 Z" />
      <text {...rotulo} x="272" y="118">5×</text>
    </svg>
  );
}

function Heimlich() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Adulto ajoelhado atrás da criança em pé, punho fechado acima do umbigo e abaixo das costelas, movimento para dentro e para cima">
      <circle {...tr} fill={BABY} cx="150" cy="66" r="25" />
      <path {...tr} d="M150 92 L150 200" />
      <path {...tr} d="M150 200 L128 272 M150 200 L172 272" />
      <path {...trFino} d="M147 112 L120 168 M153 112 L128 176" />
      <path {...trFino} d="M136 128 L164 128" strokeDasharray="2 7" />
      <circle {...trFino} fill={INK} cx="150" cy="172" r="3.5" />
      <circle {...tr} fill={SKIN} cx="268" cy="64" r="27" />
      <path {...tr} d="M262 92 Q244 140 240 188 L268 258 M240 200 L204 262" />
      <path {...tr} d="M250 116 Q192 122 158 150" />
      <path {...tr} d="M244 146 Q200 168 162 158" />
      <circle {...tr} fill={SKIN} cx="150" cy="152" r="13" />
      <circle fill={DANGER} opacity="0.85" cx="150" cy="152" r="5" />
      <path {...acao} d="M92 208 Q108 176 130 154" />
      <path fill={DANGER} d="M130 154 L116 157 L126 170 Z" />
      <text {...rotulo} fontSize={17} x="30" y="248">para dentro</text>
      <text {...rotulo} fontSize={17} x="30" y="270">e para cima</text>
    </svg>
  );
}

function Sinal() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Criança com as duas mãos no pescoço, boca aberta sem emitir som">
      <circle {...tr} fill={BABY} cx="200" cy="112" r="42" />
      <circle {...trFino} fill={INK} cx="186" cy="104" r="4" />
      <circle {...trFino} fill={INK} cx="214" cy="104" r="4" />
      <ellipse {...trFino} fill="#ffffff" cx="200" cy="132" rx="9" ry="12" />
      <path {...tr} d="M200 154 L200 168 M172 240 Q200 218 228 240" />
      <path {...tr} d="M166 226 Q182 190 200 172 Q218 190 234 226" />
      <ellipse {...tr} fill={SKIN} cx="176" cy="164" rx="17" ry="12" transform="rotate(24 176 164)" />
      <ellipse {...tr} fill={SKIN} cx="224" cy="164" rx="17" ry="12" transform="rotate(-24 224 164)" />
      <path {...som} stroke={SOFT} d="M268 96 Q282 112 268 128" />
      <path {...som} stroke={SOFT} d="M288 84 Q310 112 288 140" />
      <path {...acao} d="M258 74 L318 150" />
      <text {...rotulo} fontSize={18} x="252" y="188">sem som</text>
    </svg>
  );
}

function Decisao() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Dois painéis: à esquerda criança tossindo com som, conduta é só observar; à direita criança em silêncio, conduta é agir">
      <line x1="200" y1="16" x2="200" y2="284" stroke={LINE} strokeWidth="3" />
      <circle {...tr} fill={BABY} cx="100" cy="120" r="36" />
      <path {...trFino} d="M86 112 L94 110 M108 108 L116 110" />
      <ellipse {...trFino} fill="#ffffff" cx="100" cy="138" rx="10" ry="8" />
      <path {...som} d="M146 100 Q158 120 146 140" />
      <path {...som} d="M162 88 Q180 120 162 152" />
      <path {...tr} d="M100 158 L100 196 M100 168 Q76 180 68 198 M100 168 Q124 180 132 198" />
      <text fontSize={16} fontWeight={800} fill={OK} fontFamily="inherit" x="100" y="240" textAnchor="middle">tosse com barulho:</text>
      <text fontSize={16} fontWeight={800} fill={OK} fontFamily="inherit" x="100" y="262" textAnchor="middle">deixe tossir ✓</text>
      <circle {...tr} fill={BABY} cx="300" cy="120" r="36" />
      <circle {...trFino} fill={INK} cx="288" cy="112" r="4" />
      <circle {...trFino} fill={INK} cx="312" cy="112" r="4" />
      <ellipse {...trFino} fill="#ffffff" cx="300" cy="140" rx="8" ry="10" />
      <path {...tr} d="M300 158 L300 178" />
      <ellipse {...tr} fill={SKIN} cx="282" cy="172" rx="14" ry="10" transform="rotate(24 282 172)" />
      <ellipse {...tr} fill={SKIN} cx="318" cy="172" rx="14" ry="10" transform="rotate(-24 318 172)" />
      <path {...som} stroke={SOFT} d="M346 104 Q356 120 346 136" />
      <path {...acao} d="M340 92 L364 148" />
      <text fontSize={16} fontWeight={800} fill={DANGER} fontFamily="inherit" x="300" y="240" textAnchor="middle">silêncio ou chiado fraco:</text>
      <text fontSize={16} fontWeight={800} fill={DANGER} fontFamily="inherit" x="300" y="262" textAnchor="middle">aja agora — manobras</text>
    </svg>
  );
}

function Cadeirao() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Bebê sentado ereto no cadeirão com cinto, adulto ao lado, tela de celular riscada">
      <text fontSize={16} fontWeight={800} fill={OK} fontFamily="inherit" x="200" y="34" textAnchor="middle">sentado · cinto · adulto ao lado · sem telas</text>
      <path {...tr} d="M120 96 L120 208 M120 148 L196 148 M196 140 L196 208 M104 208 L212 208 M116 208 L96 282 M200 208 L224 282" />
      <path {...tr} strokeWidth={9} d="M112 148 L204 148" />
      <circle {...tr} fill={BABY} cx="158" cy="84" r="22" />
      <path {...tr} d="M158 108 L158 156" />
      <path {...trFino} d="M158 120 L138 140 M158 120 L178 140" />
      <path {...acao} strokeWidth={5} d="M138 150 L178 150" />
      <path {...trFino} d="M158 138 L170 138 L170 150" strokeDasharray="2 5" />
      <circle {...tr} fill={SKIN} cx="304" cy="76" r="25" />
      <path {...tr} d="M304 102 L304 200 M304 124 L262 152 M304 200 L286 276 M304 200 L322 276" />
      <rect {...trFino} x="330" y="220" width="42" height="28" rx="4" />
      <path {...acao} d="M324 214 L378 254" />
    </svg>
  );
}

const quadros: Record<QuadroManobra, () => ReactElement> = {
  golpes: Golpes,
  compressoes: Compressoes,
  heimlich: Heimlich,
  sinal: Sinal,
  decisao: Decisao,
  cadeirao: Cadeirao,
};

export default function IlustracaoManobra({
  quadro,
  className,
}: {
  quadro: QuadroManobra;
  className?: string;
}) {
  const Quadro = quadros[quadro];
  return (
    <div className={className}>
      <Quadro />
    </div>
  );
}
