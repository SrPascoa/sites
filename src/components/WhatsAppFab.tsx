import { useEffect, useState } from 'react';
import { whatsappUrl } from '../config/site';
import { WhatsAppIcon } from './ui/icons';

/**
 * Botão flutuante — aparece depois do hero para não competir com o CTA principal.
 * Fica à esquerda porque o canto direito é ocupado pelo chat tawk.to.
 */
export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar connosco no WhatsApp"
      className={`fixed bottom-6 left-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-black shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 active:scale-95 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">Falar agora</span>
    </a>
  );
}
