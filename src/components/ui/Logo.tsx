import { useState } from 'react';
import { site } from '../../config/site';

type LogoProps = {
  /** Altura do símbolo. O texto acompanha. */
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * O símbolo é mais alto que largo, por isso a largura é automática — forçar uma
 * caixa quadrada deixava-o opticamente pequeno ao lado do texto.
 */
const sizes = {
  sm: { gap: 'gap-2.5', mark: 'h-9 w-auto', text: 'text-lg sm:text-xl' },
  /** Cabeçalho: medidas em px por ecrã (telemóvel, 1024, 1280, 1920). */
  md: {
    gap: 'gap-2.5 lg:gap-[10.6px] min-[1920px]:gap-[11.25px]',
    mark: 'h-11 w-auto sm:h-12 lg:h-[51px] xl:h-[59.5px] min-[1920px]:h-[63px]',
    text: 'text-xl leading-[1.2] sm:text-2xl lg:text-[25.5px] xl:text-[29.75px] min-[1920px]:text-[31.5px]',
  },
};

/**
 * Símbolo + marca textual.
 *
 * O símbolo vem de `site.logo`. Enquanto esse ficheiro não existir em `public/`,
 * o `onError` esconde a imagem e sobra a marca textual — a página nunca mostra
 * um ícone partido.
 */
export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const [markFailed, setMarkFailed] = useState(false);
  const s = sizes[size];

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      {!markFailed && (
        <img
          src={site.logo}
          alt=""
          width={296}
          height={296}
          onError={() => setMarkFailed(true)}
          className={`${s.mark} shrink-0 object-contain`}
        />
      )}
      <span className={`font-display font-bold tracking-tight ${s.text}`}>
        {site.name} <span className="text-brand-orange">{site.nameAccent}</span>
      </span>
    </span>
  );
}
