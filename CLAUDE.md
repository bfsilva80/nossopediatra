# Nosso Pediatra — Introdução Alimentar

App para famílias com bebês de 6 a 24 meses. Estático, sem backend, dados só no aparelho.
Produção: https://nossopediatra.netlify.app · código do app em `guia-introducao-alimentar/`.

Bruno (bfsilva80) é pediatra e **é o revisor clínico responsável** — nenhum conteúdo clínico
novo vai ao ar sem o aval dele.

## Comandos

```bash
cd guia-introducao-alimentar
npm install
npm run dev      # desenvolvimento
npm run build    # gate de conteúdo + tsc --noEmit + vite build
```

Não existe suíte de testes automatizada. A verificação padrão antes de entregar é
`npm run build` + um smoke test com Playwright (`playwright-core` está em devDependencies;
o Chromium fica em `/opt/pw-browsers/chromium`). Scripts de smoke são temporários: crie
`smoke.tmp.mjs` **dentro de `guia-introducao-alimentar/`** (a resolução de módulo exige isso),
rode e apague antes do commit.

## Regras de arquitetura

**Fonte única de conteúdo.** Todo conteúdo clínico vive em `src/content/*.ts`. Componentes
apenas renderizam — nunca escreva texto clínico dentro de JSX. Uma revisão clínica deve ser
possível editando só os arquivos de `content/`.

**Convenção de validação.** Conteúdo pendente de revisão usa comentário `// VALIDAR:` no
código; depois de aprovado vira `// VALIDADO (pediatra responsável, DD/MM/AAAA)` com o
detalhe do que foi aprovado. Marcas de revisão **nunca** dentro de strings exibidas — o
build falha (`scripts/checar-conteudo.mjs`) se a forma antiga com colchetes aparecer em `src/`.

**Sem dependências novas sem motivo forte.** O runtime tem 4: react, react-dom, wouter,
lucide-react. É o que mantém o app leve e instalável.

**Rotas por hash** (`#/fases`), via `useHashLocation` do wouter. Consequência: âncoras `#id`
não funcionam — deep-link de seção é feito com `useRoute` + `scrollIntoView({behavior:'instant'})`.
O `Layout` reseta a rolagem a cada mudança de rota (com `'instant'`: o CSS tem `scroll-behavior:
smooth` e animaria o reset).

**Persistência** em `localStorage` via `usePersistido` (`src/lib/storage.ts`), sempre com o
prefixo `guia-ia:`. Nada sai do aparelho — essa promessa está escrita na tela Sobre e no aviso
de primeira visita; qualquer recurso que contrarie isso (embed de terceiros, analytics) precisa
de decisão explícita do Bruno e de fachada de clique.

## Princípios de produto que já custaram discussão

- **Emergência é texto-primeiro.** Vídeo não se assiste em emergência; imagem com texto embutido
  compete com o passo a passo. O modo emergência é tela cheia, um passo por vez, operável em
  pânico e offline.
- **Modo treino é o oposto visual da emergência** (azul, selo "MODO TREINO"): quem está em
  pânico real não pode confundir as duas telas.
- **Sem rastreador ansiogênico.** A marcação de ferro é só reforço positivo — sem sequências,
  sem grade semanal, sem cobrança. Decisão de red-team, não esquecimento.
- **Nunca zerar resultado.** O ranking de receitas por ingredientes reordena, nunca esconde:
  família cansada não pode receber "nenhum resultado".
- **Acolher quem repete o mito.** A seção Mitos explica por que a crença pegou (quase sempre foi
  orientação médica de outra época) em vez de ridicularizar a avó.

## Deploy

Netlify conectado ao GitHub: **todo merge em `main` publica a produção automaticamente**
(`netlify.toml` na raiz aponta para `guia-introducao-alimentar/`, build `npm run build`,
publish `dist`). Não há mais deploy manual por zip.

> **Atenção (28/07/2026):** descobriu-se que a branch de produção configurada no Netlify era
> `claude/baby-feeding-app-review-8z4qrf`, não `main` — pushes em `main` não publicavam nada.
> Correção definitiva: Site configuration → Build & deploy → Branches → Production branch →
> `main`. Enquanto isso não for feito, publicar exige empurrar `main` para aquela branch.
> Só apague a branch antiga DEPOIS de trocar a configuração. O gate estrito de conteúdo
> clínico é `npm run build:release` (STRICT_CLINICAL=1) — o build do Netlify usa o modo
> não-estrito, então rode o estrito antes de qualquer release clínico.

Trabalhe em branch e abra PR contra `main`. O PR ganha deploy preview automático
(`deploy-preview-N--nossopediatra.netlify.app`) — é lá que o Bruno testa antes de mesclar.

## Pendências no momento desta escrita (27/07/2026)

1. **Ilustrações das manobras.** Atualização 28/07: na `main`, os SVGs esquemáticos foram
   mantidos e **corrigidos** (novo quadro `golpesMaior1Ano`, geometria do Heimlich revista) —
   a remoção da v0.11.1 vale só para a branch antiga. Os cartões PNG do Bruno (6 arquivos)
   existem localmente em `guia-introducao-alimentar/src/assets/ilustracoes-novas/` (fora do
   git — 11 MB; ver `.gitignore`). Integração continua pendente e o plano original se mantém:
   galeria tocável em Segurança e Treino, **não** na Emergência; texto alternativo completo;
   registrar no README o mapeamento cartão↔trecho. Confirmar com o Bruno o mapeamento (a
   numeração 1–6 não segue a ordem dos passos) e os cartões que faltam (compressões no peito
   e Heimlich >1 ano).
2. **Vídeos das manobras**, produzidos por uma capitã do Corpo de Bombeiros. Usar **embed** do
   YouTube (nunca re-hospedar), com autorização escrita da autora e crédito visível, e com
   fachada de clique + `youtube-nocookie` para não carregar rastreador sem o toque da família.
3. **Golpes dorsais em maiores de 1 ano.** ~~Pendente~~ **Resolvido em 28/07/2026**: o Bruno
   validou a sequência com golpes dorsais antes das compressões abdominais, alternando 5+5.
   Implementado em `socorroMaior1Ano`, no quiz e nas telas Segurança/Treino/Emergência
   (marcas `// VALIDADO` em `seguranca.ts`).
4. **Onda D**, adiada de propósito até chegar feedback de famílias reais: perfis (vegetariano,
   alergia diagnosticada, prematuro, gemelar) e cardápio da semana com lista de compras.

## Dívidas técnicas conhecidas

- `gravarStorage` falha em silêncio quando o storage está cheio ou indisponível; a família não
  recebe sinal nenhum.
- O Diário ainda é um registro de refeições genérico; o uso real que importa é o episódico
  (reação), hoje coberto pelo fluxo `/reacao`.
- iOS pode limpar o localStorage após ~7 dias sem uso do site; hoje a única mitigação é a dica
  de instalar como app.
