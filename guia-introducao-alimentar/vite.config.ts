import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * COMMIT_REF e BRANCH são fornecidos pelo Netlify durante o build. Ficam visíveis
 * na tela Sobre para que dê para saber, olhando o site, exatamente qual commit está
 * publicado — foi a ausência disso que deixou a produção servir uma versão antiga
 * por dias sem ninguém perceber.
 */
const commit = (process.env.COMMIT_REF ?? '').slice(0, 7) || 'local';
const branch = process.env.BRANCH ?? 'local';
const construidoEm = new Date().toISOString().slice(0, 16).replace('T', ' ');

export default defineConfig({
  base: './',
  define: {
    __COMMIT__: JSON.stringify(commit),
    __BRANCH__: JSON.stringify(branch),
    __BUILD_TIME__: JSON.stringify(construidoEm),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
});
