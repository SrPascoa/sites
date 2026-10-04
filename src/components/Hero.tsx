import { ArrowRight, CircleCheckBig } from 'lucide-react';
import { heroStats } from '../config/content';
import { whatsappUrl } from '../config/site';
import BorderBeam from './ui/BorderBeam';
import { ButtonLink } from './ui/Button';
import CountUp from './ui/CountUp';
import HeroVisual from './HeroVisual';
import Reveal from './ui/Reveal';
import { Container } from './ui/Section';
import { WhatsAppIcon } from './ui/icons';

const proofPoints = ['Vê o site antes de aprovar', 'Domínio sempre em seu nome', 'Textos escritos por nós'];

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pb-20 pt-10 sm:pt-14 lg:pb-28 lg:pt-8">
      {/* Fundo decorativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animated-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="animate-blob absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-brand-orange/15 blur-[120px]" />
        <div className="animate-blob animation-delay-2000 absolute -right-20 top-20 h-[24rem] w-[24rem] rounded-full bg-brand-blue/10 blur-[120px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-4xl text-center 2xl:max-w-6xl">
          <Reveal immediate delay={0.08}>
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05] 2xl:text-[4rem]">
              Criamos o site do seu negócio.
              <br />
              <span className="text-gradient">No ar em 7 dias, desde 199&nbsp;€.</span>
            </h1>
          </Reveal>
        </div>

        {/* Ilustração entre o título e a descrição. */}
        <HeroVisual />

        <div className="mx-auto mt-8 max-w-4xl text-center lg:mt-5">
          <Reveal immediate delay={0.16}>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl lg:max-w-4xl lg:text-lg">
              Sites profissionais para negócios locais, preparados para aparecer no Google e receber pedidos por
              WhatsApp. Quantos clientes o procuraram esta semana e não o encontraram?
            </p>
          </Reveal>

          <Reveal immediate delay={0.24}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:mt-6">
              <ButtonLink
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir o meu site
              </ButtonLink>
              <ButtonLink href="#planos" variant="secondary" size="lg" className="w-full sm:w-auto">
                Ver preços
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal immediate delay={0.32}>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 lg:mt-4">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-zinc-500">
                  <CircleCheckBig className="h-4 w-4 shrink-0 text-brand-orange/80" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Barra de métricas */}
        <Reveal immediate delay={0.4}>
          <dl className="relative mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:mt-24 lg:grid-cols-4">
            <BorderBeam size={320} duration={16} colorFrom="var(--color-brand-blue)" colorTo="var(--color-brand-deep)" />
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-zinc-950/80 px-5 py-8 text-center backdrop-blur-sm sm:px-6 sm:py-10">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUp
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="block font-display text-3xl font-bold tracking-tight text-brand-orange sm:text-4xl lg:text-5xl"
                  />
                  <span className="mt-2.5 block text-xs leading-snug text-zinc-400 sm:text-sm">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
