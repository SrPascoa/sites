import { methodSteps } from '../config/content';
import Reveal from './ui/Reveal';
import { Section, SectionHeading } from './ui/Section';

export default function Method() {
  return (
    <Section id="metodo">
      <SectionHeading
        kicker="Como funciona"
        title="Do primeiro contacto ao site no ar em 7 dias"
        subtitle="Um processo fechado, com prazos definidos. Sabe sempre em que fase está — e nada é publicado sem o seu sim."
      />

      <ol className="relative mt-10 sm:mt-14 lg:mt-20">
        {/* Linha do tempo — em todos os ecrãs; no telemóvel com círculos mais pequenos. */}
        <div
          aria-hidden="true"
          className="absolute left-[1.2rem] top-3 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-brand-orange/60 via-brand-blue/40 to-transparent sm:left-[1.4rem]"
        />

        {methodSteps.map((step, index) => (
          <Reveal key={step.number} as="li" delay={index * 0.08} className="relative pb-9 pl-14 last:pb-0 sm:pb-10 sm:pl-20">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/30 bg-zinc-950 font-display text-sm font-bold text-brand-orange sm:h-12 sm:w-12">
              {step.number}
            </div>

            <div className="pt-1 transition-colors sm:rounded-2xl sm:border sm:border-white/10 sm:bg-white/[0.03] sm:p-7 sm:hover:border-brand-orange/25 sm:hover:bg-white/[0.05] lg:p-8">
              <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <h3 className="text-lg font-bold lg:text-xl">{step.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
                  {step.duration}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-zinc-400 sm:mt-3">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
