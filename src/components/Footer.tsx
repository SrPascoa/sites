import { CalendarCheck, LogIn, Mail, MapPin, MessageCircle, UserPlus } from 'lucide-react';
import { app, company, contact, fullAddress, navLinks, site, whatsappUrl } from '../config/site';
import { serviceGroups } from '../config/content';
import Logo from './ui/Logo';
import { Container } from './ui/Section';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TelegramIcon, XIcon, YouTubeIcon } from './ui/icons';

const socials = [
  { href: contact.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: contact.social.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: contact.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: contact.social.youtube, label: 'YouTube', Icon: YouTubeIcon },
  { href: contact.social.x, label: 'X (Twitter)', Icon: XIcon },
  { href: contact.telegram, label: 'Telegram', Icon: TelegramIcon },
];

const platformLinks = [
  { href: app.booking, label: 'Agendar demonstração', Icon: CalendarCheck },
  { href: app.register, label: 'Criar conta', Icon: UserPlus },
  { href: app.url, label: 'Entrar na app', Icon: LogIn },
];

// Em ecrãs táteis (telemóvel, tablet, iPad deitado) cada link ganha altura de toque; com rato, no desktop, volta ao tamanho do texto.
const linkClass =
  'py-1.5 text-sm text-zinc-400 transition-colors hover:text-brand-orange lg:[@media(pointer:fine)]:py-0';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      {/* Folga em baixo para o botão flutuante do WhatsApp não tapar o copyright. */}
      <Container className="pb-[calc(7rem+env(safe-area-inset-bottom))] pt-12 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-12 lg:grid-cols-4 xl:grid-cols-[1.4fr_0.8fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 lg:col-span-4 xl:col-span-1">
            <a href="#topo" aria-label={`${site.name} ${site.nameAccent} — início`}>
              <Logo size="sm" />
            </a>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-zinc-400">
              {site.tagline}. Feitos para aparecer no Google e receber pedidos.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-zinc-400 lg:p-2.5 transition-colors hover:border-brand-orange/30 hover:text-brand-orange"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Navegar</h2>
            <ul className="mt-4 space-y-1 lg:mt-5 lg:[@media(pointer:fine)]:space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`inline-block ${linkClass}`}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#sobre" className={`inline-block ${linkClass}`}>
                  Sobre
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Serviços</h2>
            <ul className="mt-4 space-y-1 lg:mt-5 lg:[@media(pointer:fine)]:space-y-3">
              {serviceGroups.map((group) => (
                <li key={group.id}>
                  <a href="#servicos" className={`inline-block ${linkClass}`}>
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Plataforma</h2>
            <ul className="mt-4 space-y-1 lg:mt-5 lg:[@media(pointer:fine)]:space-y-3">
              {platformLinks.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 ${linkClass}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Contacto</h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 ${linkClass}`}
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  {contact.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`flex items-center gap-2.5 ${linkClass}`}>
                  <Mail className="h-4 w-4 shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <address className="not-italic">
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}, {company.address.country}
                </address>
              </li>
              <li className="text-sm leading-relaxed text-zinc-500">
                {contact.location}
                <br />
                {contact.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 space-y-3 border-t sm:mt-14 border-white/10 pt-8 text-xs leading-relaxed text-zinc-500">
          <p>
            {company.legalName} · NIPC {company.nipc} · NIF Comunitário {company.vatId} · {fullAddress}
          </p>
          <p>
            <a
              href={company.complaintsBook}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-brand-orange"
            >
              Livro de Reclamações Eletrónico
            </a>
            {' · '}
            Em caso de litígio de consumo, pode recorrer à entidade de resolução alternativa de litígios{' '}
            <a
              href={company.ral.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-brand-orange"
            >
              {company.ral.name}
            </a>
            . Foro competente: {company.jurisdiction}.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} {company.legalName} Todos os direitos reservados.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Design · Google · Pedidos</p>
        </div>
      </Container>
    </footer>
  );
}
