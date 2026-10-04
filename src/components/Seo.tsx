import { Helmet } from 'react-helmet-async';
import { faq, serviceGroups } from '../config/content';
import { company, contact, site } from '../config/site';

/**
 * Meta tags e dados estruturados.
 * O FAQPage schema é o que dá direito aos resultados expandidos na pesquisa
 * Google — por isso é gerado a partir do mesmo array que renderiza a secção.
 */
export default function Seo() {
  const title = `${site.name} ${site.nameAccent} — ${site.tagline}`;
  const logoUrl = `${site.url}${site.logo}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${site.name} ${site.nameAccent}`,
    legalName: company.legalName,
    taxID: company.nipc,
    vatID: company.vatId,
    description: site.description,
    url: site.url,
    logo: logoUrl,
    image: logoUrl,
    email: contact.email,
    telephone: `+${contact.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: company.address.countryCode,
    },
    areaServed: ['PT', 'BR'],
    sameAs: [...Object.values(contact.social), contact.telegram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Criação de sites',
      itemListElement: serviceGroups.map((group) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: group.title, description: group.summary },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <Helmet>
      <html lang="pt" />
      <title>{title}</title>
      <meta name="description" content={site.description} />
      <link rel="canonical" href={site.url} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_PT" />
      <meta property="og:site_name" content={`${site.name} ${site.nameAccent}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={site.description} />
      <meta property="og:url" content={site.url} />
      <meta property="og:image" content={logoUrl} />

      {/* TODO: trocar por uma imagem 1200×630 desenhada para partilha (og-image.png).
          O logótipo sozinho fica com barras nos cartões do Facebook/LinkedIn. */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@brivon_pt" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={site.description} />
      <meta name="twitter:image" content={logoUrl} />

      <meta name="theme-color" content="#030303" />

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
}
