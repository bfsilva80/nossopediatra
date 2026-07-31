# Nosso Pediatra — Introdução Alimentar

App para famílias com bebês de 6 a 24 meses. Estático, sem backend, dados só no aparelho.
Produção: https://nossopediatra.netlify.app · código do app em `guia-introducao-alimentar/`.

Bruno (bfsilva80) é pediatra e **é o revisor clínico responsável** — nenhum conteúdo clínico
novo vai ao ar sem o aval dele.

## Comandos

```bash
cd guia-introducao-alimentar
npm install
npm run dev            # desenvolvimento
npm run invariantes    # só as invariantes de conteúdo clínico
npm run check          # gates + tsc, sem gerar bundle
npm run build          # gates + tsc + vite build
npm run build:release  # idem, com gate clínico ESTRITO — é o que o Netlify roda
```

**A cadeia de verificação** (`scripts/`, Node puro, zero dependências):
1. `checar-conteudo.mjs` — marcas de revisão. Em `STRICT_CLINICAL=1` falha se houver
   `// VALIDAR:` pendente. **O deploy do Netlify usa `build:release`**, então pendência
   clínica bloqueia publicação.
2. `checar-invariantes.mjs` — importa os módulos de `src/content/` de verdade (Node 22,
   `--experimental-strip-types`) e checa valores que o `tsc` não alcança: listas clínicas
   vazias, `corretaIdx` fora do intervalo no quiz, opções duplicadas, ilustração apontando
   para quadro inexistente, telefone de emergência não discável.
3. `tsc --noEmit` e `vite build`.

`.github/workflows/ci.yml` roda `build:release` em todo push e PR contra `main` — o mesmo
comando do Netlify, então verde no CI significa que publica.

Não há testes de interação. Para smoke test manual, Playwright (`playwright-core` está em
devDependencies; Chromium em `/opt/pw-browsers/chromium`): crie `smoke.tmp.mjs` **dentro de
`guia-introducao-alimentar/`** (a resolução de módulo exige isso), rode e apague antes do commit.

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

**Sistema visual: duas famílias com papéis distintos, não intercambiáveis.** Definidas em
`src/index.css`.
- **Superfícies** (`surf-azul`, `surf-menta`): pastéis que preenchem heróis e blocos.
  Recebem **sempre** tinta escura (`ink`/`ink-soft`) — nunca texto branco, que é o que
  reprova contraste. Só duas famílias de propósito: mais que isso vira colcha de retalhos
  e a hierarquia se perde. `surf-menta` ancora a tela; `surf-azul` é bloco informativo.
- **Tinta interativa** (`primary` #17506f): ícone, link, aba ativa, e **fundo de botão com
  texto branco**. Botão pastel não lê como botão — por isso botões não viraram superfície.
- `danger` é exclusivo da emergência. A tela `/emergencia` e o pill vermelho do cabeçalho
  ficaram intocados na troca de pele: o caminho de socorro não muda por motivo estético.
- Toda combinação foi medida contra WCAG AA (mínimo 4,5:1). A pior do sistema é
  `ink-soft` sobre `surf-menta`, em 4,54:1. Ao criar par novo, meça antes.

## Princípios de produto que já custaram discussão

- **Emergência é texto-primeiro — o que não é texto-único.** Sob pânico, reconhecer uma postura
  numa imagem é mais rápido que ler a frase que a descreve, então cada passo com arte aprovada
  mostra a imagem em destaque e o texto manda no detalhe. Vídeo, sim, está fora: não se assiste
  a vídeo em emergência. Requisitos para uma arte entrar nessa tela: **sem texto embutido**
  (o texto vem do app, traduzível, lido por leitor de tela, escalável), leve e já em cache,
  e geometria conferida especificamente para lá — na galeria a família lê a legenda ao lado, na
  tela de pânico ela copia a imagem sem ler. Passo sem arte aprovada fica sem imagem e **nunca**
  empresta a de outro passo. Esta tela é tela cheia, um passo por vez, operável em pânico e offline.
  Já erramos duas vezes aqui: primeiro com SVG esquemático de bonecos de palito (reprovado em
  27/07), depois deixando esses mesmos SVGs na tela por três dias porque este documento os
  descrevia como decisão de projeto.
- **Modo treino é o oposto visual da emergência** (azul, selo "MODO TREINO"): quem está em
  pânico real não pode confundir as duas telas.
- **Sem rastreador ansiogênico.** A marcação de ferro é só reforço positivo — sem sequências,
  sem grade semanal, sem cobrança. Decisão de red-team, não esquecimento.
- **Nunca zerar resultado.** O ranking de receitas por ingredientes reordena, nunca esconde:
  família cansada não pode receber "nenhum resultado".
- **Acolher quem repete o mito.** A seção Mitos explica por que a crença pegou (quase sempre foi
  orientação médica de outra época) em vez de ridicularizar a avó.
- **Conteúdo de ferramenta de design com IA NUNCA entra no projeto.** Layout e tratamento visual
  podem servir de referência; texto, jamais. Caso concreto (30/07/2026): pediu-se ao Google Stitch
  variantes da tela Início, com o conteúdo real passado no prompt. Ele reescreveu o cartão de
  treino como *"Revise a Manobra de Heimlich em bebês agora mesmo"* — a manobra é contraindicada
  em menores de 1 ano, e é o que este app inteiro existe para desmentir. Numa das variantes o erro
  ainda ganhou um selo "AVISO DE SEGURANÇA". No mesmo lote, o cartão de ferro virou "Ofereceu água
  hoje?". Ao usar essas ferramentas: reimplemente à mão, com o texto vindo de `src/content/`.

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

1. **Ilustrações das manobras.** ~~Pendente~~ **Concluído em 29/07/2026.** 11 cartões
   ilustrados em `src/assets/manobras/*.jpg` (JPEG 900px, ~200 KB cada; os PNG originais de
   5 MB ficam fora do git). Arquitetura em três peças:
   - `src/content/ilustracoes.ts` — manifesto de dados puros (id, legenda, `alt`, faixa
     etária, âncora clínica). **Sem import de imagem**, para que o script de invariantes
     consiga importá-lo no Node.
   - `src/lib/imagensManobra.ts` — wiring de asset, `Record<IdCartao, string>` exaustivo por
     tipo: acrescentar id no manifesto sem apontar a imagem quebra o build.
   - `src/components/GaleriaManobras.tsx` — galeria tocável com ampliação, `loading="lazy"`.

   **Trava de deriva.** Nenhum gate lê pixel, então cada cartão guarda o *hash* do trecho
   canônico de `seguranca.ts` que ilustra. Mudou o texto, o build falha e cobra reconferência
   da arte, já imprimindo o hash novo. Guardamos hash e não o texto para não criar segunda
   cópia do conteúdo clínico.

   **Onde aparece.** A galeria (miniaturas + ampliação) fica em Segurança e Treino. Na
   **Emergência** entra UM cartão por passo, marcado com `emergencia: true` no manifesto e
   renderizado direto pela tela — desde 30/07/2026. Os SVGs de palito foram removidos; o
   componente `IlustracaoManobra` não existe mais.
   - A ligação passo → arte vive só no manifesto (`ancora.fonte` + `ancora.indice` + `emergencia`),
     consultada por `cartaoDeEmergencia()`. `PassoSocorro` **não** tem campo de ilustração: uma
     tabela só, um lugar só para sair de sincronia. `checar-invariantes.mjs` recusa arte de
     emergência apontando para passo inexistente e dois cartões disputando o mesmo passo.
   - `lib/aquecerEmergencia.ts` busca os cartões de emergência quando o app fica ocioso, para
     eles já estarem no cache do service worker antes do engasgo (respeita `save-data` e 2G).
     Não é lista de pré-cache no `sw.js` porque os nomes só existem com o hash do build.
   - **Exceção aberta:** `compressoes-menor1ano` está fora da Emergência de propósito. A arte
     divergiu do texto em dois pontos — bebê na horizontal em vez de cabeça rebaixada, e alvo
     sobre/acima da linha dos mamilos em vez de logo abaixo. Enquanto não for refeita, o passo
     das compressões aparece sem imagem (e não empresta a de posicionamento, que mostra o bebê
     de bruços — o oposto). Ver comentário no cartão em `content/ilustracoes.ts`.
   - Também vale reconferir a arte dos golpes: a mão aparece espalmada, e o texto diz
     "base da mão".
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

- ~~`gravarStorage` falha em silêncio~~ **Resolvido em 29/07/2026.** `gravarStorage` devolve
  `boolean` e sinaliza a falha por assinatura (`assinarFalhaStorage` / `useFalhaStorage`);
  `AvisoStorage` no `Layout` mostra um alerta em todas as telas enquanto durar, apontando
  para `/transferir`. O app segue funcionando em memória.
- O Diário ainda é um registro de refeições genérico; o uso real que importa é o episódico
  (reação), hoje coberto pelo fluxo `/reacao`.
- iOS pode limpar o localStorage após ~7 dias sem uso do site; hoje a única mitigação é a dica
  de instalar como app.
