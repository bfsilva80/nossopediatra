/*
 * Gate de publicação: falha o build se a marca antiga "[VALIDAR" existir em
 * qualquer arquivo de src/ — ela seria renderizada ao usuário final.
 * Pendências de revisão clínica devem viver em comentários "// VALIDAR: ...".
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const RAIZ = new URL('../src', import.meta.url).pathname;
const MARCA = '[' + 'VALIDAR';
const problemas = [];

function varrer(dir) {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) {
      varrer(caminho);
      continue;
    }
    const linhas = readFileSync(caminho, 'utf8').split('\n');
    linhas.forEach((linha, i) => {
      if (linha.includes(MARCA)) problemas.push(`${caminho}:${i + 1}`);
    });
  }
}

varrer(RAIZ);

if (problemas.length > 0) {
  console.error(`ERRO: marca "${MARCA}]" encontrada (seria exibida ao usuário):`);
  for (const p of problemas) console.error('  ' + p);
  console.error('Mova a pendência para um comentário "// VALIDAR: ..." e rode o build de novo.');
  process.exit(1);
}
console.log('checar-conteudo: ok — nenhuma marca de revisão vaza para a interface.');
