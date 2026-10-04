# Brivon Sites

Landing page de criação de sites para negócios locais. React 19 + Vite + Tailwind CSS 4.

```bash
npm install
npm run dev      # servidor local
npm run build    # produção -> dist/
npm run lint     # oxlint
```

## Antes de publicar

Todo o texto e todos os dados vivem em dois ficheiros — **não é preciso mexer em componentes**:

| Ficheiro | O que contém |
| --- | --- |
| `src/config/site.ts` | Nome, domínio, WhatsApp, e-mail, redes sociais, menu |
| `src/config/content.ts` | Métricas, setores, serviços, calendário, exemplos, depoimentos, planos, FAQ |

Os pontos marcados com `TODO` nesses ficheiros são **placeholders** e têm de ser substituídos:

1. **`contact.whatsapp`** — número real, só dígitos com indicativo (ex.: `351912345678`). É usado em todos os CTAs do site.
2. **`contact.email`**, **`contact.whatsappLabel`**, **`contact.social.*`**, **`site.url`**.
3. **`examples`** em `content.ts` — são estruturas tipo por setor, não clientes. Quando houver sites reais, substituir e preencher `url`: a secção passa a chamar-se "Portefólio" e mostra o link. **`testimonials`** está vazio de propósito; o bloco só aparece com depoimentos reais e autorizados.
4. **`plans`** e **`pricingNote`** — preços 199 €/399 €/149 € + anuidade 79 €/99 €. Confirmar se são com ou sem IVA (para particulares têm de ser anunciados com IVA).
5. **`About.tsx`** — falta o nome e a fotografia de quem fala com o cliente.

A versão anterior (Brivon Tráfego) está guardada em `_backup-trafego/`.

## Formulário de contacto

O formulário (`src/components/Contact.tsx`) não tem backend: monta a mensagem com os campos preenchidos e abre o WhatsApp. Para receber por e-mail ou enviar a um CRM, substituir o corpo de `handleSubmit` por um `POST` ao serviço escolhido (Formspree, Resend, n8n…).

## Estrutura da página

Ordem das secções em `src/App.tsx`:

```
Hero → Setores → O custo de não ser encontrado → O que recebe → Como funciona →
Exemplos (+ Depoimentos) → Preços → Sobre → FAQ → Contacto → Rodapé
```

Cada uma é um componente em `src/components/`. Para reordenar ou remover uma secção, basta mexer no JSX do `App.tsx`.

## Notas técnicas

- **SEO**: `src/components/Seo.tsx` gera as meta tags e os dados estruturados (`ProfessionalService` + `FAQPage`) a partir dos mesmos arrays que renderizam a página — o schema do FAQ nunca fica dessincronizado do conteúdo visível.
- **Animações**: `src/components/ui/Reveal.tsx` (framer-motion, dispara uma vez ao entrar no viewport). O bloco `prefers-reduced-motion` do `index.css` anula-as para quem pediu menos movimento.
- **Faixa de setores**: é a única animação deliberadamente isenta do `prefers-reduced-motion` — sem a isenção ficava congelada a meio do ciclo em máquinas com os efeitos de animação desligados no sistema. Para voltar ao comportamento acessível, substituir a regra de isenção no `index.css` por um fallback estático: `width: auto; flex-wrap: wrap; justify-content: center; transform: none !important` no `.marquee-track`, `display: none` no `.marquee-dupe` (a classe já está aplicada à segunda cópia das etiquetas em `Sectors.tsx`) e `mask-image: none` no `.marquee-viewport`.
- **Tema**: as cores da marca são tokens Tailwind em `src/index.css`, amostradas do logótipo — `brand-gold` `#f5a623`, `brand-orange` `#f2711c`, `brand-ember` `#e8552d` (a chama) e `brand-blue` `#29abe2`, `brand-deep` `#1560bd` (a base azul). Mudar aí propaga para todo o site.
- **Logótipo**: `public/logo.png` é o símbolo isolado, recortado do logótipo oficial da Brivon (o bloco completo com a palavra "brivon" está em `public/logo-completo.png`). O caminho vem de `site.logo`; `src/components/ui/Logo.tsx` é o único componente que o consome e, se o ficheiro faltar, esconde a imagem e deixa a marca textual.
- **Servidor de desenvolvimento**: `server.host: true` no `vite.config.ts` é necessário — sem isso o Vite escuta só em `[::1]` e o `localhost` em IPv4 do Windows dá página em branco.
- **Tipografia**: Outfit (títulos) e Plus Jakarta Sans (corpo), carregadas no `index.html`.
