# Avaliação — Guia de Introdução Alimentar (app enviado em .zip)

Avaliação clínica, de produto, de experiência e técnica do protótipo `guia_introducao_alimentar` (React + Vite + shadcn/ui, template Manus). Data: 24/07/2026.

Nota de método: os apontamentos clínicos abaixo se dividem em (a) **erros claros** frente ao consenso atual e (b) **pontos a validar** com as fontes primárias (Guia Alimentar para Crianças Brasileiras Menores de 2 Anos — MS/2019; Manual de Alimentação da SBP; consensos de alergia alimentar; diretrizes de desobstrução de vias aéreas em lactentes). Nada aqui substitui a revisão final do pediatra responsável.

---

## 1. Diagnóstico geral — o que o app já tem de bom

- **Escopo certo.** Os blocos escolhidos (sinais de prontidão, métodos, fases, alergênicos, engasgo vs. reflexo de náusea, sinais de alerta, diário alimentar, receitas brasileiras) são exatamente o que uma família precisa. A FAQ é o melhor conteúdo do app: a distinção gag/engasgo, a orientação de introdução precoce de alergênicos e o "não force, o leite ainda é a base" estão corretos e bem escritos.
- **Tom acolhedor sem infantilizar.** Linguagem acessível, disclaimers "consulte seu pediatra" presentes, receitas com cara de comida brasileira de verdade (arroz-feijão, moqueca adaptada) em vez de "papinha genérica".
- **Boas intenções de produto.** Calculadora de idade, diário exportável para levar à consulta e telefone de emergência visível mostram intuição correta de que o app deve *fazer* algo, não só informar.
- **Base técnica moderna.** React 19, Tailwind 4, TypeScript, componentes acessíveis (Radix) disponíveis.

O problema central: **é uma landing page de ~18 seções empilhadas, não um app** — e o conteúdo clínico foi duplicado em 5+ arquivos que divergem entre si, gerando contradições que, num produto assinado por um pediatra, viram passivo.

---

## 2. Conteúdo pediátrico

### 2.1 Erros com potencial de dano (corrigir antes de qualquer publicação)

1. **Manobra de Heimlich indicada para bebê** (`FAQ.tsx`, pergunta "tossindo muito"). Em **menores de 1 ano não se faz Heimlich clássico**: a conduta é golpes dorsais + compressões torácicas com o lactente apoiado no antebraço. Como está, o app ensina a manobra errada para a faixa etária inteira do produto. Além disso, o único lugar que trata de conduta diz "procure emergência imediatamente" — em obstrução total não há tempo de deslocamento; a orientação correta é **iniciar a desobstrução na hora e acionar o 192**. Falta uma seção de primeiros socorros passo a passo (validar redação final com diretriz de reanimação pediátrica vigente / material SBP).

2. **Checklist de prontidão dá "luz verde" sem checar idade** (`Home.tsx`). Marcados os 5 sinais, o app afirma: *"Você pode começar a oferecer alimentos sólidos com segurança"* — para qualquer bebê, inclusive um de 4 meses cujos pais marquem tudo. Precisa de trava de idade (em torno de 6 meses) e de redação condicional ("sinais presentes + idade adequada → converse com seu pediatra para iniciar").

3. **"Comece pela gema, depois a clara" / "gema é menos alergênica"** (`Timeline.tsx` fase 2, receita "Gema de Ovo Cozida" em `Recipes.tsx`). Orientação desatualizada e invertida: a fração mais alergênica do ovo é a **clara**, e o consenso atual é **ovo inteiro bem cozido desde o início da IA (~6 meses)**, sem fracionamento — que só atrasa a exposição. O próprio FAQ do app diz o oposto (introduzir alergênicos cedo e por inteiro): o app se contradiz internamente.

4. **Ferro tardio e escasso.** A fase "6 meses" (`Timeline.tsx`, `AgeCalculator.tsx`) lista apenas frutas, legumes, cereais e leguminosas; carnes e ovo só entram aos 7–8 meses, com a dica *"proteína animal 2–3 vezes por semana"*. O Guia do MS orienta **alimento fonte de ferro (carne/víscera/ovo) diariamente na refeição principal desde os 6 meses** — reserva de ferro do lactente se esgota justamente nessa janela. Como está, o app desenha um cardápio com risco de anemia ferropriva. (Validar redação final com Guia MS 2019 / SBP, mas a direção da correção é clara.)

5. **"Peneirar ou processar até virar pasta lisa" + caldo como refeição** (`Recipes.tsx`, "Caldo de Legumes Caseiro", fase 6 meses). Diretriz nacional é explícita: **amassar com garfo, não peneirar nem liquidificar**, e evitar caldos/sopas ralas pela baixa densidade energética. A receita ensina exatamente o que o guia manda evitar.

6. **"Água filtrada ou destilada é preferível"** (`FAQ.tsx`). Água **destilada não é recomendada** para consumo infantil. Em outro ponto o app diz "água filtrada e fervida" (`Home.tsx`). Unificar: água potável (filtrada/fervida conforme a realidade local), a partir dos 6 meses, no copo.

7. **Depoimentos fabricados com avaliação 5 estrelas** (`Testimonials.tsx`). "Marina Silva, mãe de Sofia" etc. não existem. Em produto de saúde assinado por médico isso é (a) eticamente indefensável e (b) provável infração das normas de **publicidade médica do CFM** (vedação a depoimentos de pacientes). Remover por completo — não é ajuste de texto.

### 2.2 Contradições internas (o app discorda de si mesmo)

| Tema | Onde diz A | Onde diz B |
|---|---|---|
| Intervalo entre alimentos novos | "Espere 3–5 dias" (`Timeline`, `AgeCalculator`) | "Não há necessidade de esperar dias" (`FAQ`) |
| Refeições aos 6 meses | "1 refeição por dia" (`AgeCalculator`, `PortionCalculator`) | Esquema com fruta na colação **e** papa no almoço (`MealSchedule`) |
| Água | "A partir dos 6 meses" (`Home`, `FAQ`) | Água só aparece na fase 7–8 meses (`AgeCalculator`) |
| BLW | Descrito como método desde o início (`Home`, `FAQ`) | "Comece com BLW se desejar" só aos 9–11 meses (`AgeCalculator`) |
| Ovo | Alergênico a introduzir cedo e por inteiro (`FAQ`) | Gema antes da clara (`Timeline`, `Recipes`) |
| Leite de vaca | "Evitar antes de 1 ano" (`DownloadGuide`) | "Em preparações a partir de 8–9 meses" (`FAQ`) — **ponto a validar**; SBP/MS orientam evitar no 1º ano |

A causa raiz é técnica (dados de fases copiados em 5 arquivos — ver §5), mas a consequência é clínica: o pai recebe orientação diferente dependendo da seção em que rolar.

### 2.3 Ajustes de conteúdo recomendados (menor gravidade)

- **"Constipação: mais de 3 dias sem evacuar" como sinal de alerta** (`AlertSigns.tsx`): lactente, sobretudo em aleitamento materno, pode ficar vários dias sem evacuar normalmente. Reescrever com critérios melhores (fezes duras/cíbalos, dor, sangue, distensão) para não gerar alarme e consulta desnecessária.
- **Mel**: o FAQ diz "após 12 meses é seguro". Verdade para botulismo, mas alinhar com a própria regra do app (sem açúcares de adição, incluindo mel, **até 2 anos**).
- **"Método Participativo é o mais recomendado pelas diretrizes brasileiras"** (`Home.tsx`): afirmação sem fonte — as diretrizes descrevem abordagens, não elegem oficialmente um híbrido. Suavizar ("uma abordagem prática endossada por muitos pediatras") ou referenciar. **Ponto a validar.**
- **Bolinho de chuva frito aos 12+ meses** (`Recipes.tsx`): fritura e farinha branca contrariam o espírito do próprio guia (MS desaconselha frituras/biscoitos até 2 anos). Substituir por versão assada ou remover. Idem "pão e biscoito sem sal" e "biscoito caseiro" nos esquemas — reescrever.
- **Alergênicos listados como "ovo, peixe, glúten"** (`Home.tsx`): incluir amendoim (em pasta diluída — nunca inteiro), castanhas, leite. O FAQ cita amendoim apenas como risco de engasgo, sem a nuance "o alimento é bem-vindo, o formato é que muda".
- **Leite materno/fórmula como ingrediente assado** (broa, bolinho): desnecessário e sem benefício após cocção; simplificar as receitas.
- **Sucos**: o app acerta ao não incluí-los, mas a dúvida é universal — merece entrada explícita no FAQ ("por que não oferecer suco antes de 1 ano / evitar até 2").
- **Falta selo editorial**: para um guia "baseado nas diretrizes da SBP e do MS", não há citação de versão/ano das fontes nem "revisado por Dr. Bruno — CRM — em [data]". Isso é diferencial de credibilidade que o NossoPediatra já tem e o app não usa.

---

## 3. Experiência da família

**Como está:** uma página única enorme (hero de tela cheia → calculadora → checklist → métodos → timeline → prato colorido → dicas → porções → horários → receitas → diário → alertas → FAQ → newsletter → download → share → depoimentos → rodapé). Isso atende quem quer *ler tudo uma vez*, mas o caso de uso real é outro: **mãe com bebê no colo, 40 segundos, uma dúvida específica**.

Problemas concretos:

1. **O CTA principal está quebrado.** "Começar Agora" (hero e depoimentos) rola para `#readiness`, que não existe — o id da seção é `readiness-checklist`. O primeiro clique do usuário não faz nada.
2. **Navegação triplicada e parcialmente quebrada.** `TableOfContents` (desktop + botão flutuante) aponta para vários ids inexistentes (`hero`, `readiness`, `testimonials`, `portion-calculator`, `newsletter`, `download`); `MobileMenu` repete a mesma lista com outros ids. Dois menus, duas fontes de verdade, ambos incompletos.
3. **Três botões flutuantes no mesmo canto** (WhatsApp `bottom-6 right-6`, índice `bottom-8 right-8`, ScrollToTop) — sobrepõem-se entre si e cobrem conteúdo no mobile.
4. **Repetição exaustiva.** Há pelo menos seis caixas "💡 Dicas Importantes" com conteúdo quase igual ("cada bebê é único", "consulte seu pediatra", "respeite fome e saciedade"). O aviso certo, repetido seis vezes, vira ruído — e alonga a página que já é longa.
5. **O usuário escolhe a fase manualmente 4 vezes** (porções, horários, receitas, timeline). A calculadora de idade existe, mas seu resultado não alimenta nada: o app pergunta a data de nascimento e depois ignora a resposta.
6. **O diário perde tudo ao recarregar a página** (estado apenas em memória, sem `localStorage`). É a ferramenta de maior valor diário do app e, na prática, inutilizável. O botão diz "Exportar" mas a função se chama `exportToPDF` e gera `.txt`.
7. **Promessas falsas:** a newsletter simula inscrição com `setTimeout` e diz "verifique seu email para confirmar" (nenhum email é enviado); "Fale com um Especialista" no FAQ não tem ação; o "Guia Completo" para download é um `.txt` de texto puro.
8. **Conteúdo de segurança enterrado.** Sinais de alerta e engasgo — o que os pais mais precisam achar em pânico — estão na 12ª seção do scroll.

**Jornada proposta (simples):** onboarding pergunta a data de nascimento uma única vez → app abre já filtrado na fase do bebê → navegação fixa com 5 destinos: **Começar** (prontidão + primeira semana guiada) · **Fases** (o que oferecer agora, consistência, evolução) · **Segurança** (engasgo passo a passo, alergênicos, sinais de alerta — acessível em 1 toque de qualquer tela) · **Receitas** (filtradas pela fase) · **Diário**.

---

## 4. Produto e estrutura

### Essencial para a V1
1. **Fonte única de conteúdo clínico** revisada pelo Bruno (ver §5) — é pré-requisito de tudo.
2. **Onboarding com data de nascimento** persistida; fase calculada corretamente (incluindo o dia do mês) e propagada para todas as telas.
3. **5 telas acima** em vez de scroll único; seção Segurança reescrita com primeiros socorros corretos por faixa etária.
4. **Diário com `localStorage`** + exportação real (PDF ou compartilhar texto via WhatsApp — mais útil no Brasil que download).
5. **Rastreador de alergênicos** (evolução natural do diário): lista dos principais alergênicos, "ofereci em __/__", "reação: sim/não" — é o registro que o pediatra realmente quer ver na consulta. Barato de construir, valor clínico alto.
6. **Guia visual "como cortar cada alimento por idade"** (uva, tomate cereja, banana, carne...) — a dúvida de segurança mais frequente e hoje ausente.
7. Selo editorial: fontes citadas com ano, nome e CRM do revisor, data da última revisão.

### Fica para depois (V2+)
- Conta/sincronização entre cuidadores; lembretes/notificações; busca global; conteúdo em vídeo; versão PWA offline completa; qualquer backend (newsletter real, WhatsApp Business, analytics consentida).

### Cortar
- Depoimentos (fabricados — remover já), newsletter simulada, download `.txt`, botões de compartilhar em seção própria (podem virar um ícone no header), 2 dos 3 botões flutuantes, hero de tela cheia (reduzir a um cabeçalho com proposta de valor + CTA correto).

---

## 5. Implementação

### Causa raiz
Os dados das 4 fases estão **copiados e divergentes em pelo menos 6 arquivos**: `Timeline.tsx`, `AgeCalculator.tsx`, `MealSchedule.tsx`, `PortionCalculator.tsx`, `Recipes.tsx` e o texto embutido de `DownloadGuide.tsx`. Toda contradição clínica do §2.2 nasce daí. **Correção estrutural nº 1:** criar `client/src/content/` (`fases.ts`, `receitas.ts`, `faq.ts`, `alertas.ts`) como fonte única tipada; componentes só renderizam. Isso também permite ao Bruno revisar o conteúdo num lugar só — hoje uma revisão clínica exigiria caçar strings em 15 arquivos.

### Bugs funcionais
- `Home.tsx:118` e `Testimonials.tsx:128`: `getElementById('readiness')` → id inexistente (CTA morto).
- `TableOfContents.tsx`: 6 dos 13 ids não existem no DOM.
- `AgeCalculator.tsx:95-98`: cálculo de meses ignora o dia do mês (bebê de 5m20d pode cair na fase "6 meses" — erro com consequência clínica) e aceita data futura (idade negativa).
- `FoodDiary.tsx`: sem persistência; remoção de sintoma por `string.replace` corrompe a lista quando um sintoma é prefixo de outro; `exportToPDF` gera `.txt`.
- `Newsletter.tsx` + `useAnalytics.ts`: o email digitado é enviado ao analytics e logado no console (`console.log('[Analytics]', ...)`) — **PII em claro, problema de LGPD**.
- `PrivacyPolicy.tsx` é órfã (rota usa `Privacy.tsx`); `Map.tsx` e `ManusDialog.tsx` são restos do template sem uso.

### Fragilidades
- **Imagens hardcoded no CDN do Manus** (logo, hero, prato colorido, sinais de alerta) — se o workspace expirar, o app perde as imagens. Trazer para `client/public/`.
- As duas imagens informativas (prato colorido, sinais de alerta) têm conteúdo clínico **dentro da imagem**, sem alternativa textual equivalente — inacessível para leitores de tela e impossível de revisar/atualizar como texto.
- ~50 componentes shadcn instalados, ~6 usados; dependências mortas (`recharts`, `embla-carousel`, `axios`, `react-hook-form`, `@types/google.maps`...). Limpar reduz manutenção e build.
- Servidor Express serve apenas estático — para a V1 sem backend, hospedagem estática pura basta (o repositório do site já passou por essa mesma conclusão nos commits de SEO).

### Acessibilidade e UI
- Labels de formulário sem `htmlFor` (calculadora, diário); cards expansíveis como `div onClick` sem teclado/`aria-expanded` (`Timeline`, `Home` métodos — `Recipes` e `FAQ` usam `<button>`, padrão a seguir); `alert()` nativo; `animate-pulse` permanente em textos; emojis dentro de headings (ruído em leitor de tela); `hover:scale-105` em cards inteiros causa tremulação.
- Sem meta tags de SEO/OG específicas nem `title` descritivo por seção — irrelevante se virar app autenticado, importante se continuar como página pública.

---

## 6. Plano enxuto (ordem de execução)

**Etapa 0 — Segurança do conteúdo (antes de qualquer deploy público)**
1. Corrigir Heimlich→manobra correta para <1 ano; adicionar passo a passo de engasgo validado.
2. Trava de idade no checklist de prontidão.
3. Ovo inteiro desde o início (remover gema/clara).
4. Ferro diário desde 6 meses nas fases/receitas.
5. Remover "peneirar/pasta lisa" e receitas-caldo; remover fritura.
6. Corrigir água (nada de "destilada"); unificar as 6 contradições da tabela do §2.2.
7. Remover depoimentos fabricados e newsletter simulada.

**Etapa 1 — Fundação técnica (1–2 dias de trabalho)**
8. Extrair conteúdo para `content/` (fonte única) e fazer os componentes consumirem.
9. Corrigir âncoras quebradas; um único componente de navegação; um único botão flutuante.
10. Corrigir cálculo de idade (dia do mês + validação); persistir data de nascimento e filtrar o app pela fase.
11. `localStorage` no diário + export real.
12. Internalizar imagens; limpar componentes/dependências mortos; remover PII do analytics.

**Etapa 2 — Virar app de verdade**
13. Reestruturar em 5 telas (Começar / Fases / Segurança / Receitas / Diário).
14. Rastreador de alergênicos + guia visual de cortes.
15. Selo editorial com fontes datadas e revisão assinada.

**Etapa 3 — Crescimento (só depois de validar uso)**
16. PWA/offline, lembretes, conta, conteúdo em vídeo, integração com o site NossoPediatra.

---

## Resumo executivo

O protótipo tem o **escopo certo e o tom certo**, mas hoje é uma landing page com conteúdo clínico duplicado e divergente, alguns erros de segurança reais (manobra de engasgo errada para a idade, luz verde de prontidão sem idade, gema/clara invertida, ferro tardio, "água destilada") e elementos que um produto médico não pode ter (depoimentos inventados, newsletter falsa). A boa notícia: quase tudo se resolve com duas decisões estruturais — **uma fonte única de conteúdo revisada pelo pediatra** e **uma jornada de 5 telas guiada pela idade do bebê** — mais uma passada de correção clínica que está listada item a item acima.
