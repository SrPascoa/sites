import { Eye, Handshake, Receipt, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { differentiators } from '../config/content';
import { contact, site } from '../config/site';
import Reveal from './ui/Reveal';
import { Container, SectionHeading } from './ui/Section';

const icons: Record<string, LucideIcon> = {
  eye: Eye,
  shieldCheck: ShieldCheck,
  receipt: Receipt,
  handshake: Handshake,
};

export default function About() {
  return (
    <section id="sobre" className="border-y border-white/10 bg-white/[0.04] lg:border-white/5 lg:bg-black/40 py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              kicker="Sobre a Brivon"
              title="Quem está por trás"
              subtitle={`A ${site.name} faz sites para negócios que não têm tempo para pensar em sites. Falamos consigo 15 minutos, tratamos do resto e só publicamos quando estiver satisfeito.`}
            />

            <Reveal delay={0.12}>
              <div className="mt-7 space-y-4 border-l-2 border-brand-orange/40 pl-5 sm:mt-9 sm:pl-6">
                <p className="text-pretty leading-relaxed text-zinc-400">
                  {/* TODO: nome e fotografia de quem fala com o cliente — "É comigo que fala desde a primeira conversa." */}
                  Trabalhamos com negócios de todo o país, sempre com contacto direto com quem faz o seu site — não com
                  um intermediário que repassa pedidos.
                </p>
                <p className="text-sm text-zinc-500">
                  {contact.location} · {contact.hours}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Telemóvel: um só bloco com linhas (ícone à esquerda); a partir de sm, 4 cartões em grelha. */}
          <div className="grid divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:grid-cols-2 sm:gap-5 sm:divide-y-0 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent">
            {differentiators.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <div className="flex h-full gap-4 p-5 transition-colors sm:block sm:rounded-2xl sm:border sm:border-white/10 sm:bg-white/[0.03] sm:p-6 sm:hover:border-brand-orange/25">
                    <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-orange sm:mb-4 sm:mt-0" />
                    <div>
                      <h3 className="text-base font-bold leading-snug">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400 sm:mt-2">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
