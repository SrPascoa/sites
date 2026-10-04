import { useEffect } from 'react';
import { tawkTo } from '../config/site';

type TawkApi = { hideWidget?: () => void; showWidget?: () => void; onLoad?: () => void };

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

/**
 * Carrega o chat tawk.to uma única vez e esconde-o enquanto o menu móvel está
 * aberto (o Header marca o body com `mobile-menu-open`).
 */
export default function TawkToWidget() {
  useEffect(() => {
    const src = `https://embed.tawk.to/${tawkTo}`;
    if (!document.querySelector(`script[src="${src}"]`)) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);
    }

    const sync = () => {
      const api = window.Tawk_API;
      if (document.body.classList.contains('mobile-menu-open')) api?.hideWidget?.();
      else api?.showWidget?.();
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return null;
}
