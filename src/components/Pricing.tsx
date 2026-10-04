import { Check, Sparkles } from 'lucide-react';
import { plans, pricingNote } from '../config/content';
import { whatsappUrl } from '../config/site';
import BorderBeam from './ui/BorderBeam';
import { ButtonLink } from './ui/Button';
import Reveal from './ui/Reveal';
import { Section, SectionHeading } from './ui/Section';

export default function Pricing() {
  return (
    <Section id="planos">
      <SectionHeading
        kicker="Preços"
        title="Preço fechado, sem mensalidades"
        subtitle="Paga a criação uma vez. Depois, só a anuidade que mantém o site no ar — domínio, alojamento e segurança incluídos."
      />

      <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 0.1} className="h-full">
            <article
              className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                plan.highlighted
                  ? 'border-brand-orange/40 bg-gradient-to-b from-brand-orange/10 to-transparent glow-orange-sm lg:-mt-4 lg:pb-10 lg:pt-12'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              {plan.highlighted && <BorderBeam size={260} duration={10} borderWidth={2} />}

              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-orange px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  Mais escolhido
                </span>
              )}

              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-zinc-300">{plan.name}</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-400">{plan.pitch}</p>

              <p className="mt-7 flex items-baseline gap-1">
                <span
                  className={`font-display font-bold tracking-tight ${
                    plan.period ? 'text-4xl lg:text-5xl' : 'whitespace-nowrap text-3xl lg:text-[1.75rem] lg:leading-[3rem] xl:text-[2.5rem]'
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && <span className="text-zinc-500">{plan.period}</span>}
              </p>
              <p className="mt-2 text-xs text-zinc-500">{plan.renewal}</p>

              <ul className="mt-7 flex-1 space-y-3.5 border-t border-white/10 pt-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-snug text-zinc-300">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? 'text-brand-orange' : 'text-brand-blue'}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={whatsappUrl(
                  plan.period
                    ? `Olá! Tenho interesse no plano ${plan.name}. Pode dar-me mais detalhes?`
                    : 'Olá! Gostava de pedir um orçamento para um projeto à medida (loja online, SaaS, CRM, ERP ou tráfego).',
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant={plan.highlighted ? 'primary' : 'secondary'}
                size="lg"
                className="mt-8 w-full"
              >
                {plan.cta}
              </ButtonLink>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-10 text-center text-sm text-zinc-500">
          {pricingNote}
        </p>
      </Reveal>
    </Section>
  );
}
