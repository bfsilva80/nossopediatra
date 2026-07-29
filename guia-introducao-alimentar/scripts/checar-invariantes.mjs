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
import { readFileSync } from 'node:fs';

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

if (erros.length > 0) {
  console.error('ERRO: invariantes de conteúdo clínico violadas:');
  for (const e of erros) console.error('  ' + e);
  process.exit(1);
}
console.log(`checar-invariantes: ok — ${Object.keys(listasObrigatorias).length} listas e ${seguranca.quizEngasgo.length} questões conferidas.`);
