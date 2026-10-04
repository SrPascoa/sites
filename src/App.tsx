import { useEffect } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Examples from './components/Examples';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Method from './components/Method';
import Pillars from './components/Pillars';
import Pricing from './components/Pricing';
import Sectors from './components/Sectors';
import Seo from './components/Seo';
import Services from './components/Services';
import WhatsAppFab from './components/WhatsAppFab';

export default function App() {
  /**
   * Alimenta a variável usada pelo `.glow-card` no index.css: o brilho segue o
   * rato. Um único listener no documento evita um por cartão.
   */
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>('.glow-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-brand-orange/30">
      <Seo />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-orange focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Saltar para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Sectors />
        <Pillars />
        <Services />
        <Method />
        <Examples />
        <Pricing />
        <About />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
