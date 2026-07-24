/**
 * Canal de feedback do teste com famílias — sem backend:
 * abre o WhatsApp do NossoPediatra com mensagem pré-preenchida.
 */

export const APP_VERSAO = 'v0.6 · teste';

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
