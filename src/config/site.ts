/**
 * Fonte única de verdade para todo o conteúdo do site.
 * Alterar aqui reflete em todas as secções — não é preciso mexer nos componentes.
 */

export const site = {
  name: 'Brivon',
  nameAccent: 'Sites',
  tagline: 'Sites profissionais para negócios locais',
  description:
    'Criação de sites profissionais para negócios locais, a partir de 199 €. No ar em 7 dias, com domínio em seu nome, otimizado para o Google e para receber pedidos por WhatsApp.',
  url: 'https://brivon.pt',

  /**
   * Símbolo da marca, servido a partir de `public/`.
   * Extraído do logótipo oficial da Brivon (company-assets no Supabase).
   * Se o ficheiro faltar, o cabeçalho e o rodapé mostram só a marca textual.
   */
  logo: '/logo.png', // símbolo isolado; o bloco completo com a palavra está em /logo-completo.png
} as const;

/** Dados legais obrigatórios (rodapé, dados estruturados). */
export const company = {
  legalName: 'Brivon Unipessoal, Lda.',
  nipc: '519586565',
  vatId: 'PT519586565',
  address: {
    street: 'Rua Celado 8',
    postalCode: '5000-011',
    city: 'Vila Real',
    country: 'Portugal',
    countryCode: 'PT',
  },
  jurisdiction: 'Vila Real, Portugal',
  complaintsBook: 'https://www.livroreclamacoes.pt',
  /** Entidade de Resolução Alternativa de Litígios de Consumo (Lei n.º 144/2015). */
  ral: { name: 'CNIACC — Centro Nacional de Informação e Arbitragem de Conflitos de Consumo', url: 'https://www.cniacc.pt' },
} as const;

export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}, ${company.address.country}`;

export const contact = {
  whatsapp: '351928202858', // só dígitos com indicativo do país
  whatsappLabel: '+351 928 202 858',
  email: 'geral@brivon.pt',
  telegram: 'https://t.me/brivon_lda',
  location: 'Atendimento remoto — Portugal & Brasil',
  hours: 'Segunda a sexta, 09h às 18h',
  social: {
    instagram: 'https://instagram.com/brivon.pt',
    linkedin: 'https://linkedin.com/company/brivonpt',
    facebook: 'https://facebook.com/brivon.pt',
    youtube: 'https://youtube.com/@BrivonPlataforma',
    x: 'https://x.com/brivon_pt',
  },
} as const;

/** Aplicação Brivon. */
export const app = {
  url: 'https://app.brivon.pt',
  register: 'https://app.brivon.pt/#/register',
  booking: 'https://app.brivon.pt/#/book/brivon-pt?type=40e7aa7b-5f09-4308-8dfa-26582ba700a6',
} as const;

/** Widget de chat tawk.to — `propertyId/widgetId`. */
export const tawkTo = '6a653275846c4d1d49b063cf/1judkq7ds';

/** Mensagem pré-preenchida no WhatsApp. */
export const whatsappUrl = (
  message = 'Olá! Vi o site da Brivon e quero um site para o meu negócio.',
) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: 'O que recebe', href: '#servicos' },
  { label: 'Como funciona', href: '#metodo' },
  { label: 'Exemplos', href: '#exemplos' },
  { label: 'Preços', href: '#planos' },
  { label: 'Dúvidas', href: '#faq' },
] as const;
