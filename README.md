# Nosso Pediatra — Introdução Alimentar

App gratuito para famílias com bebês de **6 a 24 meses**: o que oferecer, como cortar com
segurança, o que fazer quando algo sai do roteiro — tudo na idade do seu bebê.

Parte do projeto **Nosso Pediatra**. _Amor de pai. Ciência de médico._

**No ar:** https://nossopediatra.netlify.app

## Princípios

- **Conteúdo clínico com fonte única e revisão rastreável** — todo o conteúdo vive em
  `guia-introducao-alimentar/src/content/`, com convenção de revisão (`// VALIDAR:` /
  `// VALIDADO`) e trava de build que impede conteúdo não revisado de chegar às famílias.
- **Privacidade por arquitetura** — 100% estático, sem backend: os dados da família ficam
  somente no aparelho (localStorage). Nada é coletado.
- **Segurança em primeiro lugar** — modo emergência de tela cheia para engasgo, hierarquia
  de urgência na seção de segurança, treino das manobras com lembrete trimestral.

## Desenvolvimento

O app fica em [`guia-introducao-alimentar/`](guia-introducao-alimentar/) — instruções de
build, arquitetura e histórico de decisões no README de lá. A avaliação técnica e clínica
que originou a reconstrução está em
[`avaliacao_guia_introducao_alimentar.md`](avaliacao_guia_introducao_alimentar.md).

O deploy é contínuo via Netlify (`netlify.toml` na raiz).

## Aviso

Este app é material educativo em versão de teste e **não substitui a orientação do
pediatra do seu filho**. Em emergência, ligue **192 (SAMU)**.
