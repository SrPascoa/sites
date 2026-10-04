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

      <ol className="relative mt-14 lg:mt-20">
        {/* Linha do tempo — só em ecrãs largos. */}
        <div
          aria-hidden="true"
          className="absolute left-[1.4rem] top-3 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-brand-orange/60 via-brand-blue/40 to-transparent sm:block"
        />

        {methodSteps.map((step, index) => (
          <Reveal key={step.number} as="li" delay={index * 0.08} className="relative pb-10 last:pb-0 sm:pl-20">
            <div className="absolute left-0 top-0 hidden h-12 w-12 items-center justify-center rounded-full border border-brand-orange/30 bg-zinc-950 font-display text-sm font-bold text-brand-orange sm:flex">
              {step.number}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-brand-orange/25 hover:bg-white/[0.05] lg:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-sm font-bold text-brand-orange sm:hidden">{step.number}</span>
                <h3 className="text-lg font-bold lg:text-xl">{step.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
                  {step.duration}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-zinc-400">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
