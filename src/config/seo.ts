/**
 * Fonte única de SEO e GEO (motores de pesquisa e de IA).
 *
 * Usado pelo plugin `scripts/seo-plugin.ts` no build: cabeça do index.html,
 * resumo estático para robôs sem JavaScript, JSON-LD, llms.txt, robots.txt e
 * sitemap.xml. Sem React nem APIs do browser — corre em Node durante o build.
 *
 * Só factos verificáveis. Preços e prazos ficam fora do resumo e da descrição
 * (aparecem só onde a página já os mostra: título do hero e FAQ).
 */
// Extensões `.ts` explícitas: este ficheiro também é importado pelo vite.config.ts (module nodenext).
import { faq, serviceGroups } from './content.ts';
import { company, contact, site } from './site.ts';

export const SITE_NAME = `${site.name} ${site.nameAccent}`;
export const SITE_URL = site.url;
export const PORTAL_URL = 'https://brivon.pt';

export const DEFAULT_TITLE = `Sites Profissionais para Negócios Locais | ${SITE_NAME}`;
export const DEFAULT_DESCRIPTION =
  'Criação de sites profissionais para negócios locais: design pensado para telemóvel, textos escritos por nós, otimização para o Google e pedidos por WhatsApp. Empresa portuguesa sediada em Vila Real.';

export const SHARE_IMAGE = {
  url: `${SITE_URL}/brand/og-default.png`,
  width: 1200,
  height: 630,
  alt: 'Brivon Sites — Sites profissionais para negócios locais, feitos para aparecer no Google e receber pedidos.',
} as const;

export const TWITTER_HANDLE = '@brivon_pt';

/** O que as IAs citam: 1–2 frases factuais sobre a marca. */
export const ORGANIZATION_SUMMARY =
  'A Brivon Sites é o serviço de criação de websites da Brivon, empresa portuguesa sediada em Vila Real. Cria sites profissionais para negócios locais — pensados para telemóvel, com os textos escritos pela equipa e preparados para aparecer no Google e receber pedidos por WhatsApp — e lojas online e projetos à medida, com suporte em português.';

/** Projetos fora dos planos fixos (plano "Projetos à medida" em `content.ts`). */
export const CUSTOM_PROJECTS = ['Lojas online com pagamentos', 'Plataformas SaaS', 'CRM à medida', 'ERP e gestão interna'] as const;

/** As outras marcas da Brivon, para o llms.txt e o resumo estático. */
export const SISTER_BRANDS = [
  { name: 'Brivon Obras', url: 'https://obras.brivon.pt', summary: 'plataforma de gestão de obras, equipas, orçamentos e logística.' },
  { name: 'Brivon Tráfego', url: 'https://trafego.brivon.pt', summary: 'gestão de campanhas de Google Ads e Meta Ads.' },
] as const;

/** Páginas legais (vivem no portal). */
export const LEGAL_PAGES = [
  { name: 'Termos de Serviço', url: `${PORTAL_URL}/terms` },
  { name: 'Política de Privacidade', url: `${PORTAL_URL}/privacy` },
  { name: 'Política de Cookies', url: `${PORTAL_URL}/cookies` },
] as const;

/** Empresa-mãe: o mesmo `@id` do portal, para os motores ligarem as duas entidades. */
export const PARENT_ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${PORTAL_URL}/#organization`,
  name: 'Brivon',
  url: PORTAL_URL,
} as const;

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'pt-PT',
    publisher: PARENT_ORGANIZATION,
  };
}

export function buildServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service`,
    name: SITE_NAME,
    serviceType: 'Criação de websites',
    description: ORGANIZATION_SUMMARY,
    url: SITE_URL,
    image: SHARE_IMAGE.url,
    logo: `${SITE_URL}${site.logo}`,
    provider: PARENT_ORGANIZATION,
    areaServed: { '@type': 'Country', name: company.address.country },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: SITE_URL,
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: `+${contact.whatsapp}`,
        email: contact.email,
        availableLanguage: ['pt-PT'],
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Criação de sites',
      itemListElement: [
        ...serviceGroups.map((group) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: group.title, description: group.summary },
        })),
        ...CUSTOM_PROJECTS.map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      ],
    },
  };
}

/** Gerado do mesmo array que renderiza a secção — nunca fica dessincronizado da FAQ visível. */
export function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function buildJsonLd() {
  return [buildWebSiteSchema(), buildServiceSchema(), buildFaqSchema()];
}
