import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Atraso em segundos — usar para escalonar itens de uma grelha. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
  /**
   * Anima logo ao carregar, sem esperar pelo viewport. Para o hero: o que está
   * junto à borda de baixo do primeiro ecrã nunca chegaria a entrar na margem.
   */
  immediate?: boolean;
};

/**
 * Anima o conteúdo ao entrar no viewport, uma única vez.
 * O `@media (prefers-reduced-motion)` do index.css reduz a duração a ~0 para
 * quem pediu menos movimento, por isso não é preciso condicional aqui.
 */
export default function Reveal({ children, delay = 0, className, as = 'div', immediate = false }: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } })}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
