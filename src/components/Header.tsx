import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import { contact, navLinks, site, whatsappUrl } from '../config/site';
import { ButtonLink } from './ui/Button';
import Logo from './ui/Logo';
import { WhatsAppIcon } from './ui/icons';

/**
 * Secção visível agora, para destacar o link certo no menu. A faixa de deteção
 * é uma linha a meio do ecrã: a secção que a atravessa é a ativa.
 */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    sections.forEach((section) => observer.observe(section));

    // Acima da primeira secção (hero) nenhum link fica ativo.
    const onScroll = () => {
      if (sections[0] && window.scrollY + window.innerHeight * 0.45 < sections[0].offsetTop) setActive(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return active;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Com o menu aberto a página por trás não desloca. O bloqueio vai no <html> e
  // no <body>: o Safari do iPhone só deixa de deslocar a página com os dois.
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      root.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [open]);

  // Fecha com Esc (devolvendo o foco ao botão) e ao rodar/alargar para desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => desktop.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onChange);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`sticky top-0 z-50 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] transition-colors duration-300 ${
          solid ? 'border-b border-white/10 bg-black/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        {/* Altura em --header-h (index.css). Medidas em px por ecrã: telemóvel, 1024, 1280 e 1920. */}
        <div className="mx-auto flex h-[var(--header-h)] w-full items-center justify-between gap-3 px-5 sm:px-6 lg:max-w-[1440px] lg:px-[42.5px] min-[1920px]:max-w-[1600px] min-[1920px]:px-[45px]">
          <a
            href="#topo"
            onClick={() => setOpen(false)}
            aria-label={`${site.name} ${site.nameAccent} — início`}
            className="[@media(orientation:landscape)_and_(max-height:500px)]:scale-90 [@media(orientation:landscape)_and_(max-height:500px)]:origin-left"
          >
            <Logo />
          </a>

          <nav
            aria-label="Principal"
            className="hidden items-center lg:flex lg:gap-[25.5px] xl:gap-[46.75px] min-[1920px]:gap-[49.5px]"
          >
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`py-2 font-medium transition-colors hover:text-brand-orange lg:text-[15.9px] xl:text-[18px] min-[1920px]:text-[19.1px] ${
                    isActive ? 'text-brand-orange' : 'text-zinc-200'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
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

          {/* Tablet e telemóvel grande: o CTA fica à vista ao lado do menu. */}
          <div className="flex items-center gap-2.5 lg:hidden">
            {/* Embrulhado: o `inline-flex` do botão anulava um `hidden` direto. */}
            <span className="hidden sm:block">
              <ButtonLink href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" />
                Pedir o meu site
              </ButtonLink>
            </span>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movel"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition-colors active:bg-white/15 [@media(orientation:landscape)_and_(max-height:500px)]:size-10"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Fora do <header>: o backdrop-filter dele faria do cabeçalho o
          contentor do `fixed`, e o painel ficaria preso aos 80px de altura. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[45] overflow-y-auto overscroll-contain bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              aria-label="Menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{ open: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } }, closed: {} }}
              className="mx-auto flex min-h-full w-full max-w-xl flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pl-[calc(1.25rem+env(safe-area-inset-left))] pr-[calc(1.25rem+env(safe-area-inset-right))] pt-4 sm:px-6"
            >
              <ul className="divide-y divide-white/[0.06]">
                {navLinks.map((link) => {
                  const isActive = active === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -8 } }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`flex items-center justify-between py-4 font-display text-xl font-semibold transition-colors active:text-brand-orange [@media(max-height:500px)]:py-2.5 ${
                          isActive ? 'text-brand-orange' : 'text-zinc-100'
                        }`}
                      >
                        {link.label}
                        <ChevronRight className={`h-5 w-5 ${isActive ? 'text-brand-orange' : 'text-zinc-600'}`} />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 8 } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-auto pt-8"
              >
                <ButtonLink
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Pedir o meu site
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${contact.email}`}
                  variant="secondary"
                  size="lg"
                  className="mt-3 w-full"
                  onClick={() => setOpen(false)}
                >
                  {contact.email}
                </ButtonLink>
                <p className="mt-4 text-center text-xs text-zinc-500">{contact.hours}</p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
