import { useState } from 'react';
import { Check, ChevronDown, LayoutTemplate, MapPin, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { serviceGroups } from '../config/content';
import { whatsappUrl } from '../config/site';
import { ButtonLink } from './ui/Button';
import Reveal from './ui/Reveal';
import { Section, SectionHeading } from './ui/Section';
import { useMediaQuery } from './ui/useMediaQuery';

const icons: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  mapPin: MapPin,
  messageCircle: MessageCircle,
};

/**
 * Desktop: 3 cartões lado a lado, tudo à vista. Telemóvel e tablet: acordeão —
 * cada grupo mostra título e resumo, e a lista abre com um toque. Os cartões
 * tinham ~760px de altura cada no telemóvel, impossíveis de ler num carrossel.
 */
export default function Services() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [openId, setOpenId] = useState<string | null>(serviceGroups[0]?.id ?? null);

  return (
    <Section id="servicos" muted>
      <SectionHeading
        kicker="O que recebe"
        title="Um site completo, sem ter de perceber nada de sites"
        subtitle="Tratamos de tudo: design, textos, domínio, alojamento e Google. Só precisa de nos dizer como é o seu negócio."
      />

      <div className="mt-10 grid gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-6">
        {serviceGroups.map((group, index) => {
          const Icon = icons[group.icon];
          const expanded = isDesktop || openId === group.id;
          const heading = (
            <>
              <span className="inline-flex w-fit shrink-0 rounded-2xl border border-brand-blue/20 bg-brand-blue/10 p-3 lg:mb-6 lg:p-3.5">
                <Icon className="h-6 w-6 text-brand-blue" />
              </span>
              <span className="min-w-0 flex-1 lg:block">
                <span className="block text-balance font-display text-lg font-bold leading-snug lg:text-2xl">
                  {group.title}
                </span>
                <span className="mt-1 block text-pretty font-sans text-sm font-normal leading-relaxed text-zinc-400 lg:mt-3">
                  {group.summary}
                </span>
              </span>
            </>
          );

          return (
            <Reveal key={group.id} delay={index * 0.08} className="h-full">
              <article className="glow-card flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 sm:p-6 lg:p-8">
                <div className="relative z-10 flex h-full flex-col">
                  <h3>
                    {isDesktop ? (
                      <span className="block">{heading}</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenId(expanded ? null : group.id)}
                        aria-expanded={expanded}
                        aria-controls={`servico-${group.id}`}
                        className="flex w-full items-center gap-4 text-left"
                      >
                        {heading}
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-brand-orange transition-transform duration-300 ${
                            expanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </h3>

                  <div
                    id={`servico-${group.id}`}
                    inert={!expanded}
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-5 space-y-4 border-t border-white/10 pt-5 lg:mt-7 lg:space-y-5 lg:pt-7">
                        {group.items.map((item) => (
                          <li key={item.name} className="flex gap-3">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-brand-orange" />
                            <div>
                              <p className="font-semibold leading-snug text-zinc-100">{item.name}</p>
                              <p className="mt-1 text-sm leading-relaxed text-zinc-400 lg:text-zinc-500">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-7 sm:mt-14 sm:items-center sm:px-8 sm:py-10 sm:text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="text-balance text-xl font-bold lg:text-2xl">Já tem site mas não recebe pedidos?</p>
            <p className="mt-2 text-pretty text-zinc-400">
              Analisamos o seu site atual e dizemos o que o está a travar — mesmo que não trabalhe connosco.
            </p>
          </div>
          <ButtonLink
            href={whatsappUrl('Olá! Gostaria que analisassem o meu site atual.')}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="w-full shrink-0 sm:w-auto"
          >
            Pedir análise do meu site
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
