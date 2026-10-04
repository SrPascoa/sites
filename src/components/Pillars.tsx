import { MessageCircle, Search, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { pillars } from '../config/content';
import { Section, SectionHeading } from './ui/Section';
import CardGrid from './ui/CardGrid';

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

      <CardGrid
        label="Porque precisa de um site"
        className="mt-6 max-sm:gap-0 max-sm:divide-y max-sm:divide-white/10 sm:mt-14 lg:mt-20"
      >
        {pillars.map((pillar) => {
          const Icon = icons[pillar.icon];
          return (
            <article
              key={pillar.title}
              className="feature-card glow-card h-full py-7 sm:rounded-3xl sm:border sm:border-white/10 sm:bg-white/[0.03] sm:p-8 lg:p-9"
            >
              <div className="relative z-10">
                {/* Telemóvel: ícone e etiqueta na mesma linha; a partir de sm, empilhados. */}
                <div className="mb-4 flex items-center gap-3 sm:mb-0 sm:block">
                  <div className="inline-flex shrink-0 rounded-xl border border-brand-orange/20 bg-brand-orange/10 p-2.5 sm:mb-6 sm:rounded-2xl sm:p-3.5">
                    <Icon className="h-5 w-5 text-brand-orange sm:h-6 sm:w-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:mb-3">{pillar.kicker}</p>
                </div>
                <h3 className="mb-3 text-balance text-xl font-bold leading-snug sm:mb-4 lg:text-2xl">{pillar.title}</h3>
                <p className="text-pretty leading-relaxed text-zinc-400">{pillar.body}</p>
              </div>
            </article>
          );
        })}
      </CardGrid>
    </Section>
  );
}
