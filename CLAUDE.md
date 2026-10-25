# Brivon Sites — sites.brivon.pt

Landing page de página única (React 19 + Vite + Tailwind 4) do serviço de criação de websites da Brivon. Detalhes de conteúdo e estrutura no `README.md`.

- Todo o texto visível é **português europeu (pt-PT)**. Comentários de código também em pt-PT.
- **Só factos verificáveis**: nada de números, avaliações, "+X clientes" ou testemunhos inventados (DL 57/2008). Os pontos marcados com `TODO` em `src/config/content.ts` estão por confirmar.

## Alojamento

- **Cloudflare Pages**, ligado ao GitHub (`SrPascoa/sites`): build `npm run build`, saída `dist/`. Sem Pages Functions (não há `functions/`), sem PHP, sem `.htaccess`.
- `public/404.html` faz o Pages responder 404 a URLs inexistentes. Não há rotas: as secções são âncoras da home (`#servicos`, `#planos`, `#faq`, `#contato`…).
- Definições da zona no Cloudflare (robôs de IA, robots.txt gerido, regras de países) são geridas fora deste repositório — não mexer.

## SEO e GEO — onde vive

| Ficheiro | O quê |
| --- | --- |
| `src/config/seo.ts` | **Fonte única**: nome, URL, título/descrição, imagem de partilha, `ORGANIZATION_SUMMARY` (o que as IAs citam), builders de JSON-LD. Sem React nem APIs do browser (corre em Node no build). |
| `scripts/seo-plugin.ts` | Plugin do Vite que gera tudo o resto (ver abaixo). |
| `src/config/content.ts` | Conteúdo das secções; a FAQ e o hero também alimentam o JSON-LD e o resumo estático. |
| `scripts/og-image.html` | Fonte de `public/brand/og-default.png` (1200×630); instruções no topo do ficheiro. |

**Gerado no build — não editar à mão** (não existem em `public/`):
- Cabeça do `index.html`: o marcador `<!--seo:head-->` passa a title, description, robots, canónico, Open Graph, X (`@brivon_pt`), `<link rel="alternate" href="/llms.txt">` e JSON-LD (`WebSite` + `Service` + `FAQPage`, com `publisher`/`provider` = `https://brivon.pt/#organization`, o mesmo `@id` do portal).
- `<!--seo:fallback-->` dentro do `#root`: resumo em HTML simples para robôs sem JavaScript (ChatGPT, Claude, Perplexity, redes sociais). O React substitui-o ao arrancar.
- `dist/llms.txt`, `dist/robots.txt`, `dist/sitemap.xml` (o `lastmod` vem do último commit que mexeu em `src/`, `public/` ou `index.html`).

Não há `react-helmet-async`: em React 19 ele só acrescenta etiquetas (não substitui as do `index.html`) e duplicava o título e a descrição. Se um dia houver mais páginas, cada uma precisa do seu título, descrição e canónico (`https://sites.brivon.pt/caminho`), formato `Página | Brivon Sites`, e de entrar no sitemap.

## Formulário de contacto

`src/components/Contact.tsx` não tem backend: abre o WhatsApp (`wa.me`) com a mensagem preenchida.

## Verificar antes de publicar

```bash
npm run build && npm run lint
npx vite preview --port 4173
curl -A "GPTBot/1.2" http://localhost:4173/   # tem de trazer o resumo, não um #root vazio
```
