/**
 * Canal de feedback do teste com famílias — sem backend:
 * abre o WhatsApp do NossoPediatra com mensagem pré-preenchida.
 */

export const APP_VERSAO = 'v0.13 · teste';

/**
 * Identificação exata do que está publicado. Exibida na tela Sobre para tornar
 * verificável, de fora, qual commit o site está servindo.
 */
export const BUILD_INFO = {
  commit: __COMMIT__,
  branch: __BRANCH__,
  data: __BUILD_TIME__,
};

const NUMERO_WHATSAPP = '5516981112555';

export function linkFeedback(contexto?: string): string {
  const texto = [
    'Feedback do app de Introdução Alimentar (versão de teste):',
    contexto ? `[${contexto}]` : '',
    '',
    'O que eu estava tentando fazer: ',
    'O que achei: ',
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
}
