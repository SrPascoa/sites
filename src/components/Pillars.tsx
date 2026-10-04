import { MessageCircle, Search, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { pillars } from '../config/content';
import Reveal from './ui/Reveal';
import { Section, SectionHeading } from './ui/Section';

const icons: Record<string, LucideIcon> = { search: Search, smartphone: Smartphone, messageCircle: MessageCircle };

export default function Pillars() {
  return (
    <Section id="diferenca">
      <SectionHeading
        kicker="O custo de não ser encontrado"
        title={
          <>
            Quem não está no Google <span className="text-gradient">não existe</span> para quem procura
          </>
        }
        subtitle="Os seus clientes já estão a pesquisar. A pergunta é se o encontram a si ou ao concorrente."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-20">
        {pillars.map((pillar, index) => {
          const Icon = icons[pillar.icon];
          return (
            <Reveal key={pillar.title} delay={index * 0.1}>
              <article className="feature-card glow-card h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-9">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-2xl border border-brand-orange/20 bg-brand-orange/10 p-3.5">
                    <Icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{pillar.kicker}</p>
                  <h3 className="mb-4 text-balance text-xl font-bold leading-snug lg:text-2xl">{pillar.title}</h3>
                  <p className="text-pretty leading-relaxed text-zinc-400">{pillar.body}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
