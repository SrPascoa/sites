/**
 * Plugin do Vite que gera no build tudo o que os robôs leem sem JavaScript.
 * Os dados vêm de `src/config/seo.ts` (e de `site.ts`/`content.ts`).
 *
 * - `<!--seo:head-->` no index.html → title, description, robots, canónico,
 *   Open Graph, X, link para o llms.txt e JSON-LD.
 * - `<!--seo:fallback-->` dentro do #root → resumo da página em HTML simples.
 *   É o mesmo conteúdo da página (não texto escondido); o React substitui-o ao
 *   arrancar.
 * - Ficheiros emitidos para dist/: llms.txt, robots.txt e sitemap.xml.
 */
import { execSync } from 'node:child_process';
import type { Plugin } from 'vite';
import { faq, hero, heroStats, methodSteps, sectors, serviceGroups } from '../src/config/content.ts';
import {
  CUSTOM_PROJECTS,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  ORGANIZATION_SUMMARY,
  PORTAL_URL,
  SHARE_IMAGE,
  SISTER_BRANDS,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  buildJsonLd,
} from '../src/config/seo.ts';
import { company, contact, fullAddress, legalPages, whatsappUrl } from '../src/config/site.ts';

const ROBOTS_DIRECTIVES = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

/** Robôs de IA listados um a um. Quem é nomeado num grupo ignora o `*`, por isso cada grupo repete as regras. */
const AI_BOTS: readonly [comment: string, agents: readonly string[]][] = [
  ['OpenAI (ChatGPT): pesquisa, pedidos dos utilizadores e treino', ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot']],
  ['Anthropic (Claude)', ['Claude-SearchBot', 'Claude-User', 'ClaudeBot']],
  ['Perplexity', ['PerplexityBot', 'Perplexity-User']],
  ['Google Gemini / AI Overviews (o Googlebot normal segue o grupo "*")', ['Google-Extended']],
  ['Apple Intelligence', ['Applebot-Extended']],
  ['Microsoft Copilot usa o índice do Bing', ['bingbot']],
  ['Outros assistentes', ['DuckAssistBot', 'MistralAI-User', 'Amazonbot', 'meta-externalagent', 'CCBot']],
];

/** Áreas privadas. Este site não tem nenhuma; se passar a ter, acrescentar aqui (ex.: '/admin'). */
const DISALLOW: readonly string[] = [];

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON dentro de <script>: `<` escapado para nunca fechar a etiqueta. */
const jsonForScript = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

/** Data da última alteração ao conteúdo (git); hoje, se não houver histórico. */
function lastModified() {
  try {
    const date = execSync('git log -1 --format=%cs -- src public index.html', { encoding: 'utf8' }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {
    // sem git no ambiente de build
  }
  return new Date().toISOString().slice(0, 10);
}

function renderHead() {
  const canonical = `${SITE_URL}/`;
  const meta = (attr: 'name' | 'property', key: string, content: string | number) =>
    `<meta ${attr}="${key}" content="${escapeHtml(String(content))}" />`;

  return [
    `<title>${escapeHtml(DEFAULT_TITLE)}</title>`,
    meta('name', 'description', DEFAULT_DESCRIPTION),
    meta('name', 'robots', ROBOTS_DIRECTIVES),
    `<link rel="canonical" href="${canonical}" />`,
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:locale', 'pt_PT'),
    meta('property', 'og:url', canonical),
    meta('property', 'og:title', DEFAULT_TITLE),
    meta('property', 'og:description', DEFAULT_DESCRIPTION),
    meta('property', 'og:image', SHARE_IMAGE.url),
    meta('property', 'og:image:type', 'image/png'),
    meta('property', 'og:image:width', SHARE_IMAGE.width),
    meta('property', 'og:image:height', SHARE_IMAGE.height),
    meta('property', 'og:image:alt', SHARE_IMAGE.alt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:site', TWITTER_HANDLE),
    meta('name', 'twitter:title', DEFAULT_TITLE),
    meta('name', 'twitter:description', DEFAULT_DESCRIPTION),
    meta('name', 'twitter:image', SHARE_IMAGE.url),
    meta('name', 'twitter:image:alt', SHARE_IMAGE.alt),
    '<link rel="alternate" type="text/plain" title="Resumo para modelos de IA" href="/llms.txt" />',
    `<script type="application/ld+json">${jsonForScript(buildJsonLd())}</script>`,
  ].join('\n    ');
}

function renderFallback() {
  const e = escapeHtml;
  const li = (items: readonly string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

  return `<div class="seo-fallback" style="max-width:48rem;margin:0 auto;padding:2rem 1rem;font-family:system-ui,sans-serif;line-height:1.6">
      <h1>${e(hero.title)} ${e(hero.titleAccent)}</h1>
      <p>${e(ORGANIZATION_SUMMARY)}</p>
      <p>${e(hero.subtitle)}</p>
      <ul>${heroStats.map((stat) => `<li>${e(stat.label)}: ${stat.value}${e(stat.suffix)}</li>`).join('')}</ul>
      <h2>Para que negócios</h2>
      <p>${e(sectors.map((sector) => sector.name).join(', '))}.</p>
      <h2>O que recebe</h2>
      ${serviceGroups
        .map(
          (group) =>
            `<h3>${e(group.title)}</h3><p>${e(group.summary)}</p>${li(
              group.items.map((item) => `<strong>${e(item.name)}</strong> — ${e(item.desc)}`),
            )}`,
        )
        .join('\n      ')}
      <h3>Projetos à medida</h3>
      ${li(CUSTOM_PROJECTS.map(e))}
      <h2>Como funciona</h2>
      <ol>${methodSteps.map((step) => `<li><strong>${e(step.title)}</strong> (${e(step.duration)}) — ${e(step.body)}</li>`).join('')}</ol>
      <h2>Perguntas frequentes</h2>
      <dl>${faq.map((item) => `<dt><strong>${e(item.q)}</strong></dt><dd>${e(item.a)}</dd>`).join('')}</dl>
      <h2>Contacto</h2>
      <ul>
        <li><a href="${e(whatsappUrl())}">WhatsApp ${e(contact.whatsappLabel)}</a></li>
        <li><a href="mailto:${contact.email}">${contact.email}</a></li>
        <li>${e(company.legalName)} · NIPC ${company.nipc} · ${e(fullAddress)}</li>
      </ul>
      <p>${legalPages.map((page) => `<a href="${page.href}">${e(page.label)}</a>`).join(' · ')}</p>
      <p>${e(SITE_NAME)} é uma marca da <a href="${PORTAL_URL}">Brivon</a>. Conheça também ${SISTER_BRANDS.map(
        (brand) => `<a href="${brand.url}">${e(brand.name)}</a>`,
      ).join(' e ')}.</p>
    </div>`;
}

function renderLlmsTxt() {
  return `# ${SITE_NAME}

> ${ORGANIZATION_SUMMARY}

- Nome legal: ${company.legalName} (NIPC ${company.nipc})
- Sede: ${fullAddress}
- Atendimento: em português, só para empresas, em Portugal continental, Açores e Madeira (remoto)
- Preços: anunciados sem IVA (serviço exclusivo para empresas)
- Contacto: ${contact.email} · ${contact.whatsappLabel}
- Marca da Brivon: ${PORTAL_URL}

## O que fazemos

${serviceGroups
  .flatMap((group) => group.items.map((item) => `- ${item.name}: ${item.desc}`))
  .join('\n')}

## Projetos à medida

${CUSTOM_PROJECTS.map((name) => `- ${name}`).join('\n')}

## Para que negócios

${sectors.map((sector) => `- ${sector.name}`).join('\n')}

## Como funciona

${methodSteps.map((step) => `${Number(step.number)}. ${step.title} (${step.duration}): ${step.body}`).join('\n')}

## Páginas

- [Início](${SITE_URL}/): ${DEFAULT_DESCRIPTION}
- [Perguntas frequentes](${SITE_URL}/#faq): ${faq.map((item) => item.q).join(' ')}
- [Contacto](${SITE_URL}/#contato): pedido de site (abre o WhatsApp com a mensagem preenchida).

## Brivon

- [Brivon](${PORTAL_URL}): portal da empresa.
${SISTER_BRANDS.map((brand) => `- [${brand.name}](${brand.url}): ${brand.summary}`).join('\n')}

## Contactos e redes

- [Email](mailto:${contact.email})
- [WhatsApp](https://wa.me/${contact.whatsapp})
- [LinkedIn](${contact.social.linkedin})
- [Facebook](${contact.social.facebook})
- [Instagram](${contact.social.instagram})
- [YouTube](${contact.social.youtube})
- [X](${contact.social.x})

## Optional

${legalPages.map((page) => `- [${page.label}](${page.href})`).join('\n')}
`;
}

function renderRobotsTxt() {
  const rules = ['Allow: /', ...DISALLOW.map((path) => `Disallow: ${path}`)].join('\n');
  const aiGroups = AI_BOTS.map(([comment, agents]) => [`# ${comment}`, ...agents.map((agent) => `User-agent: ${agent}`)].join('\n'));

  return `# ${SITE_NAME} — ${SITE_URL}
#
# Gerado no build (scripts/seo-plugin.ts) — não editar à mão.
# O site está aberto a todos os motores de pesquisa e de IA. Os motores de IA
# estão listados um a um para deixar a intenção explícita. Resumo para modelos
# de IA: /llms.txt
#
# Atenção: um robô que encontra o seu nome num grupo ignora o grupo "*", por
# isso cada grupo repete as regras.

User-agent: *
${rules}

${aiGroups.join('\n')}
${rules}

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

/** Página única: as secções são âncoras da home, por isso só há um URL canónico. */
function renderSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastModified()}</lastmod>
  </url>
</urlset>
`;
}

export function seoPlugin(): Plugin {
  return {
    name: 'brivon-seo',
    transformIndexHtml(html) {
      for (const marker of ['<!--seo:head-->', '<!--seo:fallback-->']) {
        if (!html.includes(marker)) throw new Error(`[brivon-seo] Falta o marcador ${marker} no index.html`);
      }
      return html.replace('<!--seo:head-->', renderHead()).replace('<!--seo:fallback-->', renderFallback());
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: renderLlmsTxt() });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobotsTxt() });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() });
    },
  };
}
