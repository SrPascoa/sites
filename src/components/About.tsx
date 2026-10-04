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
    <section id="sobre" className="scroll-mt-24 border-y border-white/5 bg-black/40 py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              kicker="Sobre a Brivon"
              title="Quem está por trás"
              subtitle={`A ${site.name} faz sites para negócios que não têm tempo para pensar em sites. Falamos consigo 15 minutos, tratamos do resto e só publicamos quando estiver satisfeito.`}
            />

            <Reveal delay={0.12}>
              <div className="mt-9 space-y-4 border-l-2 border-brand-orange/40 pl-6">
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

          <div className="grid gap-5 sm:grid-cols-2">
            {differentiators.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-brand-orange/25">
                    <Icon className="mb-4 h-6 w-6 text-brand-orange" />
                    <h3 className="text-base font-bold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
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
