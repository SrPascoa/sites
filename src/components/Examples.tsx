import { ExternalLink, Globe } from 'lucide-react';
import { examples, testimonials } from '../config/content';
import { whatsappUrl } from '../config/site';
import { ButtonLink } from './ui/Button';
import Reveal from './ui/Reveal';
import { Section, SectionHeading } from './ui/Section';

/**
 * Exemplos por setor. Enquanto não houver sites de clientes com `url`, o texto
 * apresenta-os como estruturas tipo — nunca como clientes.
 */
export default function Examples() {
  const hasRealSites = examples.some((item) => item.url);

  return (
    <Section id="exemplos" muted>
      <SectionHeading
        kicker={hasRealSites ? 'Portefólio' : 'Exemplos por setor'}
        title="Cada setor tem o seu objetivo. O site é desenhado para ele"
        subtitle={
          hasRealSites
            ? 'Sites reais de clientes, no ar e a receber pedidos.'
            : 'Um restaurante quer reservas, uma clínica quer marcações, uma obra quer pedidos de orçamento. É por aí que começamos.'
        }
      />

      <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
        {examples.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.1}>
            <article className="feature-card flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                <Globe className="h-4 w-4" />
                {item.sector}
              </div>

              <h3 className="mt-5 text-balance text-xl font-bold leading-snug lg:text-2xl">{item.title}</h3>
              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-zinc-400">{item.body}</p>

              <ul className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:underline"
                >
                  Ver o site
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14 text-center">
          <ButtonLink
            href={whatsappUrl('Olá! Gostava de ver como ficaria o site do meu negócio.')}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Quero ver como ficava o meu
          </ButtonLink>
        </div>
      </Reveal>

      {testimonials.length > 0 && (
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8">
                <span aria-hidden="true" className="font-display text-5xl leading-none text-brand-orange/40">
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-pretty leading-relaxed text-zinc-300">{item.quote}</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-semibold text-zinc-100">{item.author}</p>
                  <p className="mt-0.5 text-sm text-zinc-500">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
