import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faq } from '../config/content';
import { whatsappUrl } from '../config/site';
import { ButtonLink } from './ui/Button';
import Reveal from './ui/Reveal';
import { Section, SectionHeading } from './ui/Section';

export default function Faq() {
  // Acordeão de item único: guarda o índice aberto (null = todos fechados).
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeading
        kicker="Sem rodeios"
        title="O que todos perguntam antes de avançar"
        subtitle="Se a sua dúvida não estiver aqui, é só chamar no WhatsApp — respondemos sem compromisso."
      />

      <div className="mx-auto mt-14 max-w-3xl space-y-3 lg:mt-20">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={item.q} delay={index * 0.05}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-brand-orange/30 bg-white/[0.05]' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-pretty font-semibold leading-snug text-zinc-100">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brand-orange transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  hidden={!isOpen}
                  className="px-6 pb-6 text-pretty leading-relaxed text-zinc-400"
                >
                  {item.a}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-12 text-center">
          <ButtonLink
            href={whatsappUrl('Olá! Tenho uma dúvida sobre a criação do meu site que não estava na página.')}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
          >
            Tenho outra dúvida
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
