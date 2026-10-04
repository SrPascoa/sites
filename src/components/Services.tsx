import { Check, LayoutTemplate, MapPin, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { serviceGroups } from '../config/content';
import { whatsappUrl } from '../config/site';
import { ButtonLink } from './ui/Button';
import Reveal from './ui/Reveal';
import { Section, SectionHeading } from './ui/Section';

const icons: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  mapPin: MapPin,
  messageCircle: MessageCircle,
};

export default function Services() {
  return (
    <Section id="servicos" muted>
      <SectionHeading
        kicker="O que recebe"
        title="Um site completo, sem ter de perceber nada de sites"
        subtitle="Tratamos de tudo: design, textos, domínio, alojamento e Google. Só precisa de nos dizer como é o seu negócio."
      />

      <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
        {serviceGroups.map((group, index) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.id} delay={index * 0.1}>
              <article className="glow-card flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 inline-flex w-fit rounded-2xl border border-brand-blue/20 bg-brand-blue/10 p-3.5">
                    <Icon className="h-6 w-6 text-brand-blue" />
                  </div>

                  <h3 className="text-balance text-xl font-bold lg:text-2xl">{group.title}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-400">{group.summary}</p>

                  <ul className="mt-7 space-y-5 border-t border-white/10 pt-7">
                    {group.items.map((item) => (
                      <li key={item.name} className="flex gap-3">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-brand-orange" />
                        <div>
                          <p className="font-semibold leading-snug text-zinc-100">{item.name}</p>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-500">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14 flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-10 text-center lg:flex-row lg:justify-between lg:text-left">
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
