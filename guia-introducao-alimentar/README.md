# Guia de Introdução Alimentar — v2 (reformulado)

App para famílias com bebês de 6 a 24 meses, reconstruído a partir do protótipo original
conforme a avaliação em `../avaliacao_guia_introducao_alimentar.md`.

## Como rodar

```bash
cd guia-introducao-alimentar
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + build de produção (gera dist/)
```

É um app 100% estático — o `dist/` pode ser hospedado em qualquer serviço de arquivos
estáticos, sem servidor Node.

## O que mudou em relação ao protótipo

**Estrutura**
- Landing page única de ~18 seções → app com navegação inferior:
  **Início** (painel condicional à idade, com progresso) · **Alimentos** (banco A–Z com busca) ·
  **Receitas** · **Segurança** · **Diário** — mais as rotas `/fases`, `/comecando` (prontidão,
  primeira semana, métodos), `/duvidas` (FAQ com busca) e `/emergencia`.
- A data de nascimento é informada uma vez e filtra o app inteiro (banner de fase em toda tela).
- Botão "🚨 Engasgo" fixo no cabeçalho abre o **modo emergência**: tela cheia, um passo por vez,
  letras grandes, botão de ligar 192 — operável em pânico, sem rolagem.
- Painel Início devolve progresso: alimentos experimentados e alergênicos introduzidos
  (derivados dos registros locais), com conteúdo diferente para <6 meses, 6–24 meses e >24 meses.

**Fonte única de conteúdo** — todo o conteúdo clínico vive em `src/content/`:
- `alimentos.ts` — banco "posso dar…?": ~55 alimentos brasileiros com quando pode, como
  oferecer, risco de engasgo/corte, alergênico e fonte de ferro
- `fases.ts` — fases, métodos, sinais de prontidão
- `seguranca.ts` — engasgo (gag vs. real, manobras <1 ano e >1 ano), cortes seguros,
  alergênicos, sinais de alerta
- `receitas.ts` — receitas por fase
- `faq.ts` — perguntas frequentes

Componentes apenas renderizam. Uma revisão clínica = editar 4 arquivos.

**Correções clínicas aplicadas** (detalhes na avaliação):
- Heimlich removido para <1 ano → golpes dorsais + compressões torácicas; conduta imediata + 192.
- Checklist de prontidão com trava de idade (sinais sem 6 meses não liberam início).
- Ovo inteiro e bem cozido desde o início (removido "gema antes da clara").
- Ferro diário desde os 6 meses em toda refeição principal (fases e receitas).
- Removidos: peneirar/liquidificar, caldos ralos como refeição, frituras, "água destilada".
- Unificadas as contradições (intervalo entre alimentos, água aos 6 meses, BLW desde o início,
  nº de refeições por fase, leite de vaca).
- Removidos depoimentos fabricados, newsletter simulada e coleta de e-mail no analytics.
- Novo: rastreador de alergênicos, tabela de cortes seguros, fluxo de primeira semana.

**Técnica**
- Diário e demais registros persistem em `localStorage` (nada sai do aparelho — sem PII).
- Cálculo de idade considera o dia do mês e rejeita datas futuras.
- Sem shadcn/Radix/Express: 4 dependências de runtime (react, react-dom, wouter, lucide-react).
- Acessibilidade: acordeões com `<button>` + `aria-expanded`, labels com `htmlFor`,
  tabelas com cabeçalho, navegação com `aria-current`.
- Rotas por hash (`#/fases`): funciona em qualquer hospedagem estática, sem fallback de SPA.
- PWA leve: `manifest.webmanifest` + service worker network-first (`public/sw.js`) — instalável
  e utilizável offline na cozinha; sem pré-cache, para nunca servir build antigo.
- Busca sem acentos (normalização NFD) em alimentos, dúvidas e receitas.

## Validação clínica

Todos os pontos pendentes foram **validados pelo pediatra responsável em 24/07/2026**
(comentários `// VALIDADO` no código, com rastreabilidade item a item). Novas pendências
devem usar comentários `// VALIDAR:` — nunca dentro das strings exibidas; o build falha se
a forma antiga com colchetes aparecer em `src/`. Itens historicamente validados:
1. Redação final das manobras de desobstrução (conferir com diretriz de SBV pediátrico vigente).
2. Idade de introdução de iogurte/queijos (~9 meses) e limite diário de leite após 12 meses (~500 ml).
3. Exceções na introdução de alergênicos (dermatite atópica grave / alergia diagnosticada).
4. O rodapé exibe "Versão em revisão clínica" até o pediatra revisor assinar; após a revisão,
   substituir por "Revisado por Dr. — CRM — em [data]" em `src/components/Layout.tsx`.

## MVP de teste (v0.3)

Adições para o teste com famílias reais:
- **Aviso de primeira visita**: modal único deixando claro que é versão de teste em revisão
  clínica, que o app não substitui o pediatra, e que os dados ficam no aparelho.
- **Canal de feedback sem backend**: links "Enviar feedback" (rodapé e tela Sobre) abrem o
  WhatsApp do NossoPediatra com mensagem pré-preenchida (`src/lib/feedback.ts`).
- **Tela Sobre** (`/sobre`): status da revisão, fontes com ano, política de dados locais.
- **Ideia para hoje** no painel: sugere um alimento ainda não experimentado, adequado à idade,
  rotacionando por dia — motivo simples para abrir o app amanhã de novo.
- Acessibilidade: seletores de fase/grupo agora usam `aria-pressed` (padrão correto para
  filtros), aviso como `role="dialog"`.

## Primeira leva do comitê (v0.9)

Quatro funcionalidades novas, todas sem backend, priorizadas por impacto × esforço × risco
(fundamentação e arbitragens na conversa do comitê; dados-âncora: ENANI-2019 sobre baixo
consumo de fontes de ferro em 6–11 meses; decaimento de habilidades de socorro em ~3 meses):

- **Cartão do cuidador** (`/cuidador`): resumo em texto puro (≤15 linhas) para avó/babá/creche —
  o que pode agora, a lista NUNCA, reações já registradas, gag vs. engasgo e 192. Compartilha
  via `navigator.share` com fallback de cópia. O link do cartão carrega `?bb=<nascimento>`:
  quem abre cai no app já configurado (bootstrap em `Inicio.tsx`).
- **Modo treino de engasgo** (`/treino`): releitura das manobras + 5 cenários com feedback
  imediato. Visualmente o oposto do modo emergência (azul, selo "MODO TREINO") para nunca
  serem confundidos. Salva a data do último treino, sugere revisão trimestral e gera lembrete
  `.ics` recorrente. Card de entrada em Segurança + lembrete dispensável no Início após 90 dias.
- **"O que tem na sua cozinha?"** (Receitas): chips de ingredientes persistidos; as receitas
  são ranqueadas por casamento parcial (`contarMatches`) — nunca zeram a lista, só reordenam —
  com selo "usa N do que você tem" e aviso quando nenhuma fonte de ferro está selecionada.
- **Ferro hoje** (Início): marcação diária leve, só reforço positivo (sem sequências/cobranças,
  por decisão de red-team contra ansiedade de rastreador), contagem dos últimos 7 dias e nota
  fixa de que não substitui a suplementação prescrita. Enquanto o dia não está marcado, a
  "Ideia para hoje" prioriza alimentos ricos em ferro.

## Ondas A + B (v0.10)

**Onda A — conteúdo clínico (marcado `// VALIDAR`, pacote de revisão enviado ao pediatra):**
- **"Hoje tem feijoada?"** (`/comida-da-familia`): 10 pratos brasileiros com "vai para o
  prato / como adaptar / fica de fora" — o bebê come a comida da família, adaptada.
- **Registro guiado de reação** (`/reacao`): triagem primeiro (qualquer sinal grave → 192,
  sem formulário no caminho); o caminho leve registra no diário com foto da pele lembrada.
- **Mitos** (`/mitos`): 10 verbetes no formato mito → ciência → por que pegou (acolhe a avó).
- **Batch cooking** (Receitas): congelar/rotular/descongelar com prazos e as regras "nunca".

**Onda B — código puro:**
- **Relatório para a consulta** (`/relatorio`): síntese estruturada (reações no topo,
  alergênicos, ferro 30d, refeições recentes) com compartilhar/copiar/baixar.
- **Transferência entre celulares** (`/transferir`): dados viram código `NPIA1.…` (base64)
  que viaja por WhatsApp e é importado no outro aparelho — sem servidor; QR foi descartado
  de propósito (leitor de câmera pesa mais que o problema).

## Onda C2 (v0.11) — manobras ilustradas

Os 6 quadros esquemáticos (aprovados quadro a quadro pelo pediatra responsável em 25/07/2026)
entraram no app via `src/components/IlustracaoManobra.tsx`. O conteúdo declara qual quadro
cada passo usa (`ilustracao?: QuadroManobra` em `seguranca.ts`) — componentes só renderizam:
- **Emergência**: um quadro por passo (decisão → golpes → compressões; decisão → Heimlich).
- **Treino e Segurança**: os mesmos quadros nas seções de manobras; decisão + sinal universal
  no topo do gag vs. engasgo; cadeirão na prevenção.
Geometria alterada = nova aprovação (regra registrada no componente).
