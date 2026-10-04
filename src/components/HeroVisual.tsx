import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import {
  CircleCheckBig,
  Hammer,
  Lock,
  MapPin,
  MessageCircle,
  MousePointer2,
  Scissors,
  Search,
  Smartphone,
  Star,
  Stethoscope,
  Utensils,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Ilustração do hero: um portátil onde um site "se constrói" bloco a bloco,
 * rodeado de sites de outros setores em leque 3D. Reage ao rato (paralaxe) e
 * os cartões laterais e as etiquetas mudam o setor que está a ser construído.
 *
 * Tudo é desenhado com divs e unidades `cqw` (container query), por isso cada
 * mini-site escala com a caixa onde está, do telemóvel ao Full HD.
 */

type Sector = {
  id: string;
  label: string;
  name: string;
  domain: string;
  headline: string;
  sub: string;
  cta: string;
  cards: [string, string, string];
  Icon: LucideIcon;
  /** Gradiente da "fotografia" do hero do mini-site. */
  photo: string;
};

const sectors: Sector[] = [
  {
    id: 'restaurante',
    label: 'Restaurante',
    name: 'Sabor da Casa',
    domain: 'saborDaCasa.pt',
    headline: 'Cozinha tradicional, feita com tempo',
    sub: 'Almoços e jantares no centro da cidade.',
    cta: 'Reservar mesa',
    cards: ['Menu do dia', 'Grelhados', 'Sobremesas'],
    Icon: Utensils,
    photo: 'from-amber-300 via-orange-400 to-red-500',
  },
  {
    id: 'clinica',
    label: 'Clínica',
    name: 'Clínica Sorrir',
    domain: 'clinicaSorrir.pt',
    headline: 'O seu sorriso em boas mãos',
    sub: 'Medicina dentária para toda a família.',
    cta: 'Marcar consulta',
    cards: ['Implantes', 'Ortodontia', 'Higiene'],
    Icon: Stethoscope,
    photo: 'from-sky-300 via-cyan-400 to-teal-500',
  },
  {
    id: 'obras',
    label: 'Obras',
    name: 'Obra Certa',
    domain: 'obraCerta.pt',
    headline: 'Remodelações chave na mão',
    sub: 'Cozinhas, casas de banho e moradias.',
    cta: 'Pedir orçamento',
    cards: ['Cozinhas', 'Telhados', 'Pinturas'],
    Icon: Hammer,
    photo: 'from-zinc-300 via-stone-400 to-orange-500',
  },
  {
    id: 'estetica',
    label: 'Estética',
    name: 'Studio Bella',
    domain: 'studioBella.pt',
    headline: 'Cabelo, unhas e bem-estar',
    sub: 'Marque online em menos de um minuto.',
    cta: 'Marcar agora',
    cards: ['Cabelo', 'Unhas', 'Massagens'],
    Icon: Scissors,
    photo: 'from-pink-300 via-rose-400 to-fuchsia-500',
  },
];

/** Blocos do mini-site, pela ordem em que são "construídos" no portátil. */
const BUILD_STEPS = 6; // nav, título, fotografia, botão, cartões, rodapé
const STEP_MS = 650;
const PUBLISHED_MS = 2600;

/** Posição do cursor (em % do ecrã do portátil) enquanto coloca cada bloco. */
const cursorPath = [
  { x: 82, y: 9 },
  { x: 30, y: 30 },
  { x: 78, y: 38 },
  { x: 20, y: 56 },
  { x: 55, y: 76 },
  { x: 50, y: 94 },
  { x: 88, y: 12 },
];

function MiniSite({ sector, step = BUILD_STEPS }: { sector: Sector; step?: number }) {
  const { Icon } = sector;
  const show = (n: number) => ({
    initial: false,
    animate: step > n ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: '2cqw', scale: 0.97 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="flex h-full flex-col gap-[2cqw] bg-white p-[2.8cqw] text-zinc-900 @container">
      {/* Navegação */}
      <motion.div {...show(0)} className="flex items-center justify-between">
        <div className="flex items-center gap-[1.2cqw]">
          <span className="grid size-[4.4cqw] place-items-center rounded-full bg-brand-orange text-white">
            <Icon className="size-[2.6cqw]" strokeWidth={2.5} />
          </span>
          <span className="font-display text-[3.2cqw] font-bold leading-none">{sector.name}</span>
        </div>
        <div className="flex items-center gap-[2cqw] text-[2.2cqw] font-medium text-zinc-500">
          <span>Início</span>
          <span>Serviços</span>
          <span className="rounded-full bg-zinc-900 px-[2cqw] py-[0.8cqw] text-white">Contacto</span>
        </div>
      </motion.div>

      {/* Hero do mini-site */}
      <div className="grid grid-cols-[1.1fr_1fr] items-center gap-[3cqw]">
        <motion.div {...show(1)}>
          <p className="text-[2cqw] font-semibold uppercase tracking-wider text-brand-orange">{sector.label}</p>
          <p className="mt-[1cqw] font-display text-[4.4cqw] font-bold leading-[1.05]">{sector.headline}</p>
          <p className="mt-[1.4cqw] text-[2.4cqw] leading-snug text-zinc-500">{sector.sub}</p>
          <motion.span
            {...show(3)}
            className="mt-[2.2cqw] inline-flex items-center gap-[1cqw] rounded-full bg-brand-orange px-[3cqw] py-[1.4cqw] text-[2.4cqw] font-semibold text-white shadow-[0_0_3cqw_rgba(242,113,28,0.45)]"
          >
            {sector.cta}
          </motion.span>
        </motion.div>
        <motion.div
          {...show(2)}
          className={`relative grid aspect-[16/10] place-items-center overflow-hidden rounded-[2cqw] bg-gradient-to-br ${sector.photo}`}
        >
          <Icon className="size-[14cqw] text-white/80" strokeWidth={1.4} />
          <span className="absolute bottom-[1.6cqw] left-[1.6cqw] inline-flex items-center gap-[0.6cqw] rounded-full bg-white/90 px-[1.6cqw] py-[0.6cqw] text-[1.9cqw] font-semibold">
            <Star className="size-[2cqw] fill-amber-400 text-amber-400" /> 4,9 no Google
          </span>
        </motion.div>
      </div>

      {/* Cartões de serviços */}
      <motion.div {...show(4)} className="grid grid-cols-3 gap-[2cqw]">
        {sector.cards.map((card) => (
          <div key={card} className="rounded-[1.6cqw] border border-zinc-200 p-[2cqw]">
            <span className={`block h-[4cqw] rounded-[1cqw] bg-gradient-to-br opacity-70 ${sector.photo}`} />
            <p className="mt-[1.4cqw] text-[2.3cqw] font-semibold leading-tight">{card}</p>
            <span className="mt-[0.8cqw] block h-[0.9cqw] w-3/4 rounded-full bg-zinc-200" />
          </div>
        ))}
      </motion.div>

      {/* Rodapé com mapa e contactos */}
      <motion.div
        {...show(5)}
        className="mt-auto flex items-center justify-between rounded-[1.6cqw] bg-zinc-900 px-[2.6cqw] py-[2cqw] text-[2.1cqw] text-zinc-300"
      >
        <span className="inline-flex items-center gap-[1cqw]">
          <MapPin className="size-[2.4cqw] text-brand-orange" /> Como chegar
        </span>
        <span className="inline-flex items-center gap-[1cqw] rounded-full bg-[#25D366] px-[2cqw] py-[0.8cqw] font-semibold text-black">
          <MessageCircle className="size-[2.4cqw]" /> WhatsApp
        </span>
      </motion.div>
    </div>
  );
}

function BrowserBar({ domain, secure }: { domain: string; secure: boolean }) {
  return (
    <div className="flex items-center gap-[1.4cqw] border-b border-zinc-200 bg-zinc-100 px-[2.4cqw] py-[1.5cqw]">
      <span className="flex gap-[0.8cqw]">
        <span className="size-[1.6cqw] rounded-full bg-red-400" />
        <span className="size-[1.6cqw] rounded-full bg-amber-400" />
        <span className="size-[1.6cqw] rounded-full bg-green-400" />
      </span>
      <span className="flex flex-1 items-center gap-[0.8cqw] rounded-full bg-white px-[2cqw] py-[0.6cqw] text-[2cqw] text-zinc-500">
        <Lock className={`size-[1.9cqw] transition-colors ${secure ? 'text-green-600' : 'text-zinc-300'}`} />
        {domain.toLowerCase()}
      </span>
    </div>
  );
}

/** Mini-site lateral, em leque. `depth` controla o paralaxe (mais longe = menos movimento). */
function SideCard({
  sector,
  active,
  onSelect,
  className,
  rotate,
  depth,
  mx,
  my,
  delay,
}: {
  sector: Sector;
  active: boolean;
  onSelect: () => void;
  className: string;
  rotate: number;
  depth: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  delay: number;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={`Ver o exemplo de site para ${sector.label.toLowerCase()}`}
      aria-pressed={active}
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute cursor-pointer ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: rotate, scale: active ? 1.04 : 1 }}
        whileHover={{ rotateY: rotate * 0.35, scale: 1.08, z: 40 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className={`aspect-[3/4.3] overflow-hidden rounded-[0.9rem] border bg-white shadow-2xl shadow-black/60 @container ${
          active ? 'border-brand-orange ring-2 ring-brand-orange/60' : 'border-white/20'
        }`}
      >
        <BrowserBar domain={sector.domain} secure />
        <div className="h-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
          <MiniSite sector={sector} />
        </div>
      </motion.div>
    </motion.button>
  );
}

const chips = [
  { Icon: Smartphone, text: 'Perfeito no telemóvel', className: 'left-[2%] top-[62%] md:left-[19%] md:top-[70%]', depth: 1.6 },
  { Icon: Search, text: 'Aparece no Google', className: 'right-[2%] top-[4%] md:right-[20%] md:top-[2%]', depth: 1.3 },
  { Icon: MessageCircle, text: 'Pedidos no WhatsApp', className: 'right-[4%] top-[74%] md:right-[18%] md:top-[78%]', depth: 1.8 },
];

export default function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { margin: '-10% 0px' });

  const [sectorIndex, setSectorIndex] = useState(0);
  const [step, setStep] = useState(reduceMotion ? BUILD_STEPS : 0);
  const published = step >= BUILD_STEPS;
  const sector = sectors[sectorIndex];

  // Ciclo de construção: um bloco de cada vez, pausa em "publicado", setor seguinte.
  useEffect(() => {
    if (reduceMotion || !inView) return;
    const timer = window.setTimeout(
      () => {
        if (published) {
          setSectorIndex((i) => (i + 1) % sectors.length);
          setStep(0);
        } else {
          setStep((s) => s + 1);
        }
      },
      published ? PUBLISHED_MS : STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [step, published, inView, reduceMotion]);

  const select = (index: number) => {
    setSectorIndex(index);
    setStep(reduceMotion ? BUILD_STEPS : 0);
  };

  // Paralaxe: posição do rato normalizada (-1..1), suavizada por molas.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(useTransform(rawX, (v) => v * 18), { stiffness: 70, damping: 20 });
  const my = useSpring(useTransform(rawY, (v) => v * 12), { stiffness: 70, damping: 20 });
  const tiltX = useTransform(my, (v) => -v * 0.35);
  const tiltY = useTransform(mx, (v) => v * 0.3);
  const chipX = useTransform(mx, (v) => v * 1.6);
  const chipY = useTransform(my, (v) => v * 1.6);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const cursor = cursorPath[Math.min(step, cursorPath.length - 1)];

  // Em ecrãs grandes a cena mantém a proporção e a largura acompanha a altura do
  // ecrã (100svh menos o resto do hero), para título, imagem, texto e botões
  // caberem juntos no primeiro ecrã.
  return (
    <div className="relative mx-auto mt-8 w-full max-w-[1200px] lg:mt-5 lg:max-w-[min(1200px,max(560px,calc((100svh-36rem)*2.55)))]">
      <div
        ref={sceneRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative h-[19rem] [perspective:1400px] sm:h-[23rem] md:h-[26rem] lg:aspect-[2.55/1] lg:h-auto"
      >
        {/* Brilho atrás do portátil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/25 blur-[90px]"
        />

        {/* Sites em leque, por trás — um por setor; o que está no portátil fica destacado */}
        <SideCard
          sector={sectors[1]}
          active={sectorIndex === 1}
          onSelect={() => select(1)}
          className="left-0 top-[16%] hidden w-[17%] md:block"
          rotate={28}
          depth={0.5}
          mx={mx}
          my={my}
          delay={0.5}
        />
        <SideCard
          sector={sectors[0]}
          active={sectorIndex === 0}
          onSelect={() => select(0)}
          className="left-[1%] top-[10%] w-[30%] sm:w-[24%] md:left-[11%] md:top-[5%] md:w-[19%]"
          rotate={20}
          depth={0.8}
          mx={mx}
          my={my}
          delay={0.35}
        />
        <SideCard
          sector={sectors[2]}
          active={sectorIndex === 2}
          onSelect={() => select(2)}
          className="right-[1%] top-[10%] w-[30%] sm:w-[24%] md:right-[11%] md:top-[5%] md:w-[19%]"
          rotate={-20}
          depth={0.8}
          mx={mx}
          my={my}
          delay={0.35}
        />
        <SideCard
          sector={sectors[3]}
          active={sectorIndex === 3}
          onSelect={() => select(3)}
          className="right-0 top-[16%] hidden w-[17%] md:block"
          rotate={-28}
          depth={0.5}
          mx={mx}
          my={my}
          delay={0.5}
        />

        {/* Portátil ao centro */}
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY }}
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-[12%] w-[72%] -translate-x-1/2 sm:w-[60%] md:top-[8%] md:w-[48%]"
        >
          <div className="rounded-t-[1.1rem] border border-white/15 bg-zinc-800 p-[1.6%] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.85),0_0_60px_rgba(242,113,28,0.25)]">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[0.5rem] bg-white @container">
              <BrowserBar domain={sector.domain} secure={published} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-[calc(100%-6cqw)]"
                >
                  <MiniSite sector={sector} step={step} />
                </motion.div>
              </AnimatePresence>

              {/* Cursor a "montar" o site */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 text-zinc-900 drop-shadow"
                  animate={{ left: `${cursor.x}%`, top: `${cursor.y}%`, opacity: published ? 0 : 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MousePointer2 className="size-[4cqw] fill-white" />
                </motion.div>
              )}

              {/* Selo de publicação */}
              <AnimatePresence>
                {published && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="absolute right-[3cqw] top-[8.5cqw] inline-flex items-center gap-[1.2cqw] whitespace-nowrap rounded-full bg-zinc-900 px-[3cqw] py-[1.6cqw] text-[2.6cqw] font-semibold text-white shadow-xl"
                  >
                    <CircleCheckBig className="size-[3cqw] text-green-400" />
                    Site publicado em {sector.domain.toLowerCase()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Base do portátil */}
          <div className="relative left-1/2 h-[0.9rem] w-[114%] -translate-x-1/2 rounded-b-[1.2rem] bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-[0_20px_40px_rgba(0,0,0,0.7)] sm:h-[1.1rem]">
            <span className="absolute left-1/2 top-0 h-[40%] w-[16%] -translate-x-1/2 rounded-b-lg bg-zinc-900/60" />
          </div>
        </motion.div>

        {/* Etiquetas a flutuar */}
        {chips.map(({ Icon, text, className, depth }, index) => (
          <motion.div
            key={text}
            aria-hidden="true"
            style={{ x: chipX, y: chipY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.15, duration: 0.5 }}
            className={`pointer-events-none absolute z-10 ${className}`}
          >
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, -8 * depth, 0] }}
              transition={{ duration: 3.2 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-zinc-950/80 px-3 py-1.5 text-xs font-semibold text-zinc-100 shadow-lg shadow-black/40 backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm lg:px-3 lg:py-1.5 lg:text-xs 2xl:px-4 2xl:py-2 2xl:text-sm"
            >
              <span className="grid size-5 place-items-center rounded-full bg-brand-orange/20 text-brand-orange sm:size-6">
                <Icon className="size-3 sm:size-3.5" />
              </span>
              {text}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Escolha de setor — a parte interativa explícita, também por teclado. */}
      {/* Em ecrãs grandes fica numa linha mesmo quando a cena é mais estreita que a fila (o excesso centra-se). */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2 whitespace-nowrap sm:mt-8 lg:mt-3 lg:flex-nowrap">
        <span className="mr-1 text-sm text-zinc-500 lg:text-xs 2xl:text-sm">Veja um exemplo:</span>
        {sectors.map((s, index) => {
          const isActive = index === sectorIndex;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => select(index)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors lg:px-3 lg:py-1 lg:text-xs 2xl:px-3.5 2xl:py-1.5 2xl:text-sm ${
                isActive
                  ? 'border-brand-orange bg-brand-orange/15 text-white'
                  : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
              }`}
            >
              <s.Icon className="size-3.5" />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
