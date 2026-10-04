import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Duração da contagem em ms. */
  duration?: number;
  className?: string;
};

/** Formata com vírgula decimal (pt) e só mostra decimal quando o alvo o tem. */
function format(value: number, target: number) {
  const decimals = Number.isInteger(target) ? 0 : 1;
  return value.toFixed(decimals).replace('.', ',');
}

/** Número que conta do zero até `to` quando entra no viewport, uma única vez. */
function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function CountUp({ to, prefix = '', suffix = '', duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Quem pediu menos movimento vê o valor final já no primeiro render.
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo — rápido no início, assenta suavemente no valor final.
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setValue(to * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value, to)}
      {suffix}
    </span>
  );
}
