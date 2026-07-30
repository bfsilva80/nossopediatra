/*
 * Invariantes do conteúdo clínico.
 *
 * Complementa o `tsc`: aqui checamos o que os tipos não alcançam — valores.
 * Roda importando os módulos de `src/content/` de verdade (Node 22 com
 * --experimental-strip-types), então testa os dados publicados, não o texto-fonte.
 *
 * Cada checagem existe por causa de uma falha real:
 *  - listas vazias: o PR #2 truncou seguranca.ts e apagou 3 exports; o build só
 *    quebrou porque havia import quebrado. Um array esvaziado passaria batido.
 *  - corretaIdx fora do intervalo: o quiz de emergência ficaria sem resposta
 *    correta possível, e o tsc não vê isso.
 *  - passos sem ilustração declarada apontando para quadro inexistente.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const base = new URL('../src/', import.meta.url);
const erros = [];
const checar = (cond, msg) => { if (!cond) erros.push(msg); };

const seguranca = await import(new URL('content/seguranca.ts', base).href);

// --- listas clínicas nunca podem chegar vazias à família -------------------
const listasObrigatorias = {
  socorroMenor1Ano: seguranca.socorroMenor1Ano,
  socorroMaior1Ano: seguranca.socorroMaior1Ano,
  quizEngasgo: seguranca.quizEngasgo,
  sinaisAlerta: seguranca.sinaisAlerta,
  telefonesEmergencia: seguranca.telefonesEmergencia,
  cortesSeguro: seguranca.cortesSeguro,
  alergenicos: seguranca.alergenicos,
  regrasDeOuroEngasgo: seguranca.regrasDeOuroEngasgo,
};
for (const [nome, lista] of Object.entries(listasObrigatorias)) {
  checar(Array.isArray(lista) && lista.length > 0, `${nome}: lista vazia ou ausente`);
}

// --- todo passo de socorro precisa de texto ------------------------------
for (const [nome, passos] of [
  ['socorroMenor1Ano', seguranca.socorroMenor1Ano],
  ['socorroMaior1Ano', seguranca.socorroMaior1Ano],
]) {
  passos?.forEach((p, i) => {
    checar(p.passo?.trim(), `${nome}[${i}]: campo "passo" vazio`);
    checar(p.detalhe?.trim(), `${nome}[${i}]: campo "detalhe" vazio`);
  });
}

// --- ilustrações referenciadas precisam existir no componente ------------
const linhas = readFileSync(new URL('components/IlustracaoManobra.tsx', base), 'utf8').split('\n');
const inicioQuadros = linhas.findIndex(l => l.includes('const quadros'));
const fimQuadros = linhas.findIndex((l, i) => i > inicioQuadros && l.trim() === '};');
checar(inicioQuadros !== -1 && fimQuadros !== -1, 'IlustracaoManobra: bloco "const quadros" não localizado');
const quadrosDisponiveis = new Set(
  linhas
    .slice(inicioQuadros + 1, fimQuadros)
    .map(l => l.match(/^\s*([a-zA-Z0-9_]+)\s*:/)?.[1])
    .filter(Boolean),
);
for (const [nome, passos] of [
  ['socorroMenor1Ano', seguranca.socorroMenor1Ano],
  ['socorroMaior1Ano', seguranca.socorroMaior1Ano],
]) {
  passos?.forEach((p, i) => {
    if (!p.ilustracao) return;
    checar(
      quadrosDisponiveis.has(p.ilustracao),
      `${nome}[${i}]: ilustração "${p.ilustracao}" não existe em IlustracaoManobra`,
    );
  });
}

// --- quiz: toda questão tem resposta correta alcançável ------------------
seguranca.quizEngasgo?.forEach((q, i) => {
  checar(q.cenario?.trim(), `quizEngasgo[${i}]: cenário vazio`);
  checar(Array.isArray(q.opcoes) && q.opcoes.length >= 2, `quizEngasgo[${i}]: menos de 2 opções`);
  checar(
    Number.isInteger(q.corretaIdx) && q.corretaIdx >= 0 && q.corretaIdx < (q.opcoes?.length ?? 0),
    `quizEngasgo[${i}]: corretaIdx ${q.corretaIdx} fora do intervalo (${q.opcoes?.length} opções) — nenhuma resposta seria correta`,
  );
  checar(
    new Set(q.opcoes).size === q.opcoes?.length,
    `quizEngasgo[${i}]: opções duplicadas`,
  );
  checar(q.explicacao?.trim(), `quizEngasgo[${i}]: explicação vazia`);
});

// --- telefones de emergência precisam ser discáveis ----------------------
seguranca.telefonesEmergencia?.forEach((t, i) => {
  checar(/^\d{3}$/.test(t.numero), `telefonesEmergencia[${i}]: "${t.numero}" não é um número de 3 dígitos`);
});

// --- TRAVA DE DERIVA das ilustrações -------------------------------------
// Nenhum script lê pixel: não dá para verificar se a arte confere com o texto.
// O que dá para garantir é que ninguém mude o texto e esqueça a arte. Cada cartão
// guarda o hash do trecho canônico na data da revisão; se o trecho mudar, falha aqui.
const { cartoesManobra } = await import(new URL('content/ilustracoes.ts', base).href);

const resolverAncora = ({ fonte, indice }) => {
  if (fonte === 'gagVsEngasgo.gag.conduta') return seguranca.gagVsEngasgo?.gag?.conduta;
  if (fonte === 'regrasDeOuroEngasgo') return seguranca.regrasDeOuroEngasgo?.join('|');
  return seguranca[fonte]?.[indice]?.detalhe;
};

const idsVistos = new Set();
for (const c of cartoesManobra ?? []) {
  checar(!idsVistos.has(c.id), `ilustracoes: id duplicado "${c.id}"`);
  idsVistos.add(c.id);

  checar(c.alt?.trim().length > 40, `ilustracoes[${c.id}]: alt ausente ou curto demais para descrever a técnica`);
  checar(c.legenda?.trim(), `ilustracoes[${c.id}]: legenda vazia`);
  checar(/^\d{4}-\d{2}-\d{2}$/.test(c.revisadoEm ?? ''), `ilustracoes[${c.id}]: revisadoEm inválido`);
  checar(
    existsSync(new URL(`assets/manobras/${c.id}.jpg`, base)),
    `ilustracoes[${c.id}]: arquivo assets/manobras/${c.id}.jpg não existe`,
  );

  const textoAtual = resolverAncora(c.ancora ?? {});
  if (textoAtual === undefined) {
    erros.push(`ilustracoes[${c.id}]: âncora "${c.ancora?.fonte}" não resolve para nenhum texto`);
    continue;
  }
  const hashAtual = createHash('sha256').update(textoAtual).digest('hex').slice(0, 12);
  if (hashAtual !== c.ancora.hash) {
    erros.push(
      `ilustracoes[${c.id}]: o texto de ${c.ancora.fonte}` +
        (c.ancora.indice !== undefined ? `[${c.ancora.indice}]` : '') +
        ` MUDOU desde a revisão da arte em ${c.revisadoEm}.\n` +
        `      A ilustração pode ter ficado desatualizada — reconfira com o pediatra responsável.\n` +
        `      Se a arte continua correta, atualize o hash para "${hashAtual}" e a data de revisão.`,
    );
  }
}

if (erros.length > 0) {
  console.error('ERRO: invariantes de conteúdo clínico violadas:');
  for (const e of erros) console.error('  ' + e);
  process.exit(1);
}
console.log(
  `checar-invariantes: ok — ${Object.keys(listasObrigatorias).length} listas, ` +
    `${seguranca.quizEngasgo.length} questões e ${cartoesManobra.length} ilustrações conferidas.`,
);
