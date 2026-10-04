import type { ReactNode } from 'react';
import Reveal from './Reveal';

/**
 * Container usado por todas as secções. Até 1600px ocupa o ecrã inteiro com
 * 40px de margem (xl); abaixo de 1280px as margens não mudaram.
 */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-8 xl:px-10 ${className}`}>{children}</div>;
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Fundo ligeiramente mais escuro, para alternar o ritmo visual da página. */
  muted?: boolean;
};

export function Section({ id, children, className = '', muted = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-24 lg:py-32 ${muted ? 'border-y border-white/5 bg-black/40' : ''} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

type HeadingProps = {
  kicker?: string;
  title: ReactNode;
  subtitle?: string;
  /** Alinhamento do bloco de título. */
  align?: 'center' | 'left';
  className?: string;
};

export function SectionHeading({ kicker, title, subtitle, align = 'center', className = '' }: HeadingProps) {
  const centered = align === 'center';

  return (
    <Reveal className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange`}
        >
          {kicker}
        </span>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
