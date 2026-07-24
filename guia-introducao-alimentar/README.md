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
