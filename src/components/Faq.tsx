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

      <div className="mx-auto mt-8 max-w-3xl space-y-3 max-sm:space-y-0 max-sm:divide-y max-sm:divide-white/10 max-sm:border-y max-sm:border-white/10 sm:mt-14 lg:mt-20">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={item.q} delay={index * 0.05}>
              <div
                className={`overflow-hidden transition-colors sm:rounded-2xl sm:border ${
                  isOpen ? 'sm:border-brand-orange/30 sm:bg-white/[0.05]' : 'sm:border-white/10 sm:bg-white/[0.02]'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left transition-colors sm:px-6 sm:active:bg-white/[0.04]"
                  >
                    <span
                      className={`text-pretty font-semibold leading-snug text-zinc-100 ${isOpen ? 'max-sm:text-brand-orange' : ''}`}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brand-orange transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                {/* Abre e fecha com animação de altura (grid 0fr → 1fr). Fechado fica
                    `inert`: fora da ordem de tabulação e dos leitores de ecrã. */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-pretty leading-relaxed text-zinc-400 sm:px-6">{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-10 text-center sm:mt-12">
          <ButtonLink
            href={whatsappUrl('Olá! Tenho uma dúvida sobre a criação do meu site que não estava na página.')}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Tenho outra dúvida
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
