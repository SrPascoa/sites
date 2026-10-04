import { useEffect, useState } from 'react';
import { whatsappUrl } from '../config/site';
import { WhatsAppIcon } from './ui/icons';

const isField = (el: Element | null) => !!el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);

/**
 * Botão flutuante — aparece depois do hero para não competir com o CTA principal.
 *
 * Esconde-se enquanto se escreve no formulário: com o teclado do telemóvel
 * aberto, um elemento fixo fica a flutuar por cima dos campos.
 */
export default function WhatsAppFab() {
  const [pastHero, setPastHero] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 700);
    const onFocus = () => setTyping(isField(document.activeElement));
    // No focusout o activeElement ainda é o campo que está a perder o foco.
    const onBlur = () => window.setTimeout(onFocus, 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('focusin', onFocus);
    document.addEventListener('focusout', onBlur);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('focusout', onBlur);
    };
  }, []);

  const visible = pastHero && !typing;

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar connosco no WhatsApp"
      className={`fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-[calc(1.25rem+env(safe-area-inset-left))] z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-black shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 active:scale-95 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">Falar agora</span>
    </a>
  );
}
