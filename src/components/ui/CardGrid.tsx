import { Children } from 'react';
import type { ReactNode } from 'react';
import Reveal from './Reveal';

type CardGridProps = {
  children: ReactNode;
  /** Nome acessível da lista (lido pelos leitores de ecrã). */
  label: string;
  className?: string;
};

/**
 * 3 colunas a partir de 1024px; abaixo disso, os cartões empilham-se inteiros,
 * um por baixo do outro — nada cortado na borda nem escondido para o lado.
 */
export default function CardGrid({ children, label, className = '' }: CardGridProps) {
  return (
    <ul role="list" aria-label={label} className={`grid gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6 ${className}`}>
      {Children.toArray(children).map((child, index) => (
        <li key={index}>
          <Reveal delay={index * 0.1} className="h-full">
            {child}
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
