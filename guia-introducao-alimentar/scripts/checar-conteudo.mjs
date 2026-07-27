/*
 * Gate de conteúdo clínico.
 *
 * - Sempre falha se a marca antiga "[VALIDAR" estiver em src/, pois ela seria
 *   renderizada para a família.
 * - Em modo de publicação clínica (STRICT_CLINICAL=1), também falha se houver
 *   comentários "// VALIDAR:" pendentes.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const RAIZ = new URL('../src', import.meta.url).pathname;
const MARCA_VISIVEL = '[' + 'VALIDAR';
const MARCA_PENDENTE = '// VALIDAR:';
const estrito = process.env.STRICT_CLINICAL === '1';
const visiveis = [];
const pendentes = [];

function varrer(dir) {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) {
      varrer(caminho);
      continue;
    }

    const linhas = readFileSync(caminho, 'utf8').split('\n');
    linhas.forEach((linha, i) => {
      if (linha.includes(MARCA_VISIVEL)) visiveis.push(`${caminho}:${i + 1}`);
      if (linha.includes(MARCA_PENDENTE)) pendentes.push(`${caminho}:${i + 1}`);
    });
  }
}

varrer(RAIZ);

if (visiveis.length > 0) {
  console.error(`ERRO: marca "${MARCA_VISIVEL}]" encontrada (seria exibida ao usuário):`);
  for (const p of visiveis) console.error('  ' + p);
  console.error('Mova a pendência para um comentário "// VALIDAR: ..." e rode o build novamente.');
  process.exit(1);
}

if (pendentes.length > 0) {
  const titulo = estrito
    ? 'ERRO: existem pendências de revisão clínica:'
    : 'AVISO: existem pendências de revisão clínica:';
  console.error(titulo);
  for (const p of pendentes) console.error('  ' + p);

  if (estrito) {
    console.error('Valide os itens e substitua "// VALIDAR:" por "// VALIDADO" antes da publicação clínica.');
    process.exit(1);
  }
}

console.log(
  estrito
    ? 'checar-conteudo: ok — publicação clínica sem pendências.'
    : 'checar-conteudo: ok — nenhuma marca de revisão vaza para a interface.',
);
