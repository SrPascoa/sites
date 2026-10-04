import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { CalendarCheck, Clock, Mail, MapPin, Send } from 'lucide-react';
import { app, contact, whatsappUrl } from '../config/site';
import { Button, ButtonLink } from './ui/Button';
import Reveal from './ui/Reveal';
import { Container, SectionHeading } from './ui/Section';
import { WhatsAppIcon } from './ui/icons';

const situationOptions = [
  'Ainda não tenho site',
  'Só tenho Facebook ou Instagram',
  'Tenho site, mas está desatualizado',
  'Tenho site, mas não recebo pedidos',
];

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-brand-orange/50 focus:outline-none focus:ring-1 focus:ring-brand-orange/40';

/**
 * O formulário não tem backend: monta a mensagem e abre o WhatsApp já
 * preenchido. Para receber por e-mail/CRM, trocar `handleSubmit` por um POST
 * ao serviço escolhido (Formspree, Resend, n8n, etc.).
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', business: '', situation: situationOptions[0], message: '' });

  const set = (field: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = [
      `Olá! Sou ${form.name || '(nome)'}.`,
      `Negócio: ${form.business || '(não indicado)'}`,
      `Situação atual: ${form.situation}`,
      form.message ? `Contexto: ${form.message}` : '',
      '',
      'Gostaria de ter um site para o meu negócio.',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="contato" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-brand-orange/10 blur-[130px]" />
      </div>

      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              kicker="Vamos falar"
              title={
                <>
                  O próximo cliente <span className="text-gradient">já está a procurar</span>
                </>
              }
              subtitle="Conte-nos sobre o seu negócio. Marcamos 15 minutos de conversa e dizemos-lhe o valor final antes de começar. Sem compromisso."
            />

            <Reveal delay={0.1}>
              <ul className="mt-10 space-y-5">
                <li className="flex items-start gap-4">
                  <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <div>
                    <p className="font-semibold">Resposta no próprio dia útil</p>
                    <p className="text-sm text-zinc-500">Falamos consigo antes de qualquer proposta.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <div>
                    <p className="font-semibold">{contact.hours}</p>
                    <p className="text-sm text-zinc-500">Mensagens fora deste horário são respondidas no dia seguinte.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <div>
                    <p className="font-semibold">{contact.location}</p>
                    <p className="text-sm text-zinc-500">Reunião por videochamada ou telefone, à sua escolha.</p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col flex-wrap gap-3 sm:flex-row">
                <ButtonLink href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="sm:w-auto">
                  <WhatsAppIcon className="h-4 w-4" />
                  {contact.whatsappLabel}
                </ButtonLink>
                <ButtonLink href={`mailto:${contact.email}`} variant="secondary" className="sm:w-auto">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </ButtonLink>
                <ButtonLink href={app.booking} target="_blank" rel="noopener noreferrer" variant="secondary" className="sm:w-auto">
                  <CalendarCheck className="h-4 w-4" />
                  Marcar os 15 minutos
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-zinc-950/60 p-7 backdrop-blur-sm sm:p-9"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
                    Seu nome
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Como podemos tratá-lo?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="business" className="mb-2 block text-sm font-medium text-zinc-300">
                    Negócio e setor
                  </label>
                  <input
                    id="business"
                    required
                    value={form.business}
                    onChange={set('business')}
                    placeholder="Ex.: restaurante em Vila Real"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="situation" className="mb-2 block text-sm font-medium text-zinc-300">
                    Tem site neste momento?
                  </label>
                  <select id="situation" value={form.situation} onChange={set('situation')} className={inputClass}>
                    {situationOptions.map((option) => (
                      <option key={option} value={option} className="bg-zinc-900">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-300">
                    O que gostava que o site fizesse? <span className="text-zinc-600">(opcional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Ex.: receber pedidos de orçamento e marcações."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="mt-7 w-full">
                <Send className="h-4 w-4" />
                Pedir o meu site
              </Button>

              <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">
                Ao enviar, abrimos o WhatsApp com a sua mensagem já escrita. Os seus dados não são partilhados com
                terceiros.
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
