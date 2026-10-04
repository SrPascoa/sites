import { Bed, Briefcase, Dumbbell, Hammer, House, Scissors, Stethoscope, Store, Utensils, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { sectors } from '../config/content';
import { Container } from './ui/Section';

const icons: Record<string, LucideIcon> = {
  utensils: Utensils,
  stethoscope: Stethoscope,
  scissors: Scissors,
  wrench: Wrench,
  hammer: Hammer,
  bed: Bed,
  store: Store,
  dumbbell: Dumbbell,
  home: House,
  briefcase: Briefcase,
};

/**
 * Faixa infinita de setores. A lista é duplicada porque a animação
 * `marquee-scroll` (index.css) desloca exatamente -50% da faixa.
 */
export default function Sectors() {
  // A segunda cópia é o que torna o ciclo contínuo; fica marcada para o CSS a
  // poder esconder quando o utilizador pediu movimento reduzido.
  const track = [
    ...sectors.map((sector) => ({ ...sector, dupe: false })),
    ...sectors.map((sector) => ({ ...sector, dupe: true })),
  ];

  return (
    <section className="border-y border-white/5 bg-black/40 py-10">
      <Container>
        <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Sites para negócios locais de todos os setores
        </p>
      </Container>

      <div
        className="marquee-viewport relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden="true"
      >
        <ul className="marquee-track flex items-center gap-4">
          {track.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={`${item.name}-${index}`}
                className={`group flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-6 font-display text-sm font-medium text-zinc-300 transition-colors hover:border-brand-orange/30 hover:text-zinc-100 sm:text-base ${
                  item.dupe ? 'marquee-dupe' : ''
                }`}
              >
                <Icon className="h-5 w-5 shrink-0 text-zinc-400 transition-colors group-hover:text-brand-orange" />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Equivalente acessível, sem duplicação nem animação. */}
      <p className="sr-only">Setores: {sectors.map((sector) => sector.name).join(', ')}.</p>
    </section>
  );
}
