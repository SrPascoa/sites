import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { contact, navLinks, site, whatsappUrl } from '../config/site';
import { ButtonLink } from './ui/Button';
import Logo from './ui/Logo';
import { Container } from './ui/Section';
import { WhatsAppIcon } from './ui/icons';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // O index.css usa esta classe para esconder o widget de chat com o menu aberto.
  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-black/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      {/* Medidas em px por ecrã: telemóvel, 1024, 1280 e 1920. */}
      <div className="mx-auto flex h-20 w-full items-center justify-between px-5 sm:px-6 lg:h-[102px] lg:max-w-[1440px] lg:px-[42.5px] min-[1920px]:h-[108px] min-[1920px]:max-w-[1600px] min-[1920px]:px-[45px]">
        <a href="#topo" aria-label={`${site.name} ${site.nameAccent} — início`}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center lg:flex lg:gap-[25.5px] xl:gap-[46.75px] min-[1920px]:gap-[49.5px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium text-zinc-200 transition-colors hover:text-brand-orange lg:text-[15.9px] xl:text-[18px] min-[1920px]:text-[19.1px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:gap-[8.5px] lg:px-[21px] lg:py-[10.6px] lg:text-[14.9px] xl:px-[29.75px] xl:py-[14.9px] xl:text-[17px] min-[1920px]:px-[31.5px] min-[1920px]:py-[15.75px] min-[1920px]:text-[18px]"
          >
            <WhatsAppIcon className="lg:h-[21px] lg:w-[21px] min-[1920px]:h-[22.5px] min-[1920px]:w-[22.5px]" />
            Pedir o meu site
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="rounded-lg border border-white/10 bg-white/5 p-3 text-zinc-200 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden">
          <Container className="flex flex-col gap-1 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3.5 text-base font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-brand-orange"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Pedir o meu site
            </ButtonLink>
            <p className="mt-3 text-center text-xs text-zinc-500">{contact.hours}</p>
          </Container>
        </div>
      )}
    </header>
  );
}
