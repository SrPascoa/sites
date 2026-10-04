/**
 * Conteúdo das secções da landing page.
 * Separado de `site.ts` (dados da empresa) para manter cada ficheiro legível.
 */

/** Métricas da barra do hero. `value` é numérico para a animação de contagem. */
export const heroStats = [
  { value: 199, suffix: '€', prefix: '', label: 'Site profissional, a partir de' },
  { value: 7, suffix: ' dias', prefix: '', label: 'Da primeira conversa ao site no ar' },
  { value: 15, suffix: ' min', prefix: '', label: 'Reunião inicial, sem compromisso' },
  { value: 79, suffix: '€/ano', prefix: '', label: 'Domínio, alojamento e SSL' },
] as const;

/** Setores da faixa animada. `icon` é a chave do mapa de ícones em `Sectors.tsx`. */
export const sectors = [
  { name: 'Restaurantes', icon: 'utensils' },
  { name: 'Clínicas', icon: 'stethoscope' },
  { name: 'Cabeleireiros e estética', icon: 'scissors' },
  { name: 'Oficinas', icon: 'wrench' },
  { name: 'Construção e remodelações', icon: 'hammer' },
  { name: 'Alojamento local', icon: 'bed' },
  { name: 'Lojas', icon: 'store' },
  { name: 'Ginásios', icon: 'dumbbell' },
  { name: 'Imobiliárias', icon: 'home' },
  { name: 'Serviços profissionais', icon: 'briefcase' },
] as const;

/** O custo de não ter site — situações concretas antes da solução. */
export const pillars = [
  {
    icon: 'search',
    kicker: 'O que acontece hoje',
    title: 'Procuram-no no Google e encontram o concorrente',
    body: 'Todos os dias há pessoas na sua zona a pesquisar exatamente o que faz. Veem uma ficha sem fotos, sem horário, sem site. Fecham. Ligam a quem aparece primeiro.',
  },
  {
    icon: 'smartphone',
    kicker: 'O que não chega',
    title: 'Uma página de Facebook não é um site',
    body: 'Não aparece no Google como um site, não transmite a mesma confiança e não é sua — as regras mudam quando a plataforma quiser.',
  },
  {
    icon: 'messageCircle',
    kicker: 'O que muda',
    title: 'Um site feito para receber pedidos',
    body: 'Não é um cartão de visita bonito. Cada secção leva a uma ação: ligar, mandar WhatsApp, pedir orçamento ou marcar.',
  },
] as const;

/** O que o cliente recebe, agrupado em três frentes. */
export const serviceGroups = [
  {
    id: 'design',
    icon: 'layout',
    title: 'Design profissional',
    summary: 'Um site que passa confiança logo no primeiro segundo — sobretudo no telemóvel.',
    items: [
      {
        name: 'Pensado primeiro para telemóvel',
        desc: 'A maioria dos seus clientes vai abrir o site no telemóvel. Desenhamos para aí primeiro.',
      },
      {
        name: 'Textos escritos por nós',
        desc: 'Não precisa de escrever nada. Numa conversa de 15 minutos recolhemos o que precisamos.',
      },
      {
        name: 'A sua marca, as suas cores',
        desc: 'Logótipo, fotografias e identidade do seu negócio — não um modelo genérico.',
      },
      {
        name: 'Rápido a carregar',
        desc: 'Um site lento perde visitas antes de abrir. O nosso abre em segundos.',
      },
    ],
  },
  {
    id: 'google',
    icon: 'mapPin',
    title: 'Encontrado no Google',
    summary: 'De nada serve um site bonito que ninguém encontra.',
    items: [
      {
        name: 'Otimização para pesquisa local',
        desc: 'Estrutura e textos pensados para quem pesquisa o seu serviço na sua zona.',
      },
      {
        name: 'Indexação no Google',
        desc: 'Submetemos o site ao Google no dia em que fica no ar.',
      },
      {
        name: 'Google Meu Negócio',
        desc: 'Ficha otimizada e ligada ao site, para aparecer no mapa (plano Negócio).',
      },
      {
        name: 'Domínio próprio e SSL',
        desc: 'O seu endereço .pt ou .com, com o cadeado de segurança que o Google exige.',
      },
    ],
  },
  {
    id: 'contactos',
    icon: 'messageCircle',
    title: 'Feito para receber pedidos',
    summary: 'O objetivo do site é um só: o telefone tocar.',
    items: [
      {
        name: 'Botão de WhatsApp e chamada',
        desc: 'Em todas as secções, a um toque de distância.',
      },
      {
        name: 'Formulário de pedido',
        desc: 'Pedidos de orçamento ou de contacto direto para o seu e-mail.',
      },
      {
        name: 'Mapa e horário',
        desc: 'Como chegar e quando está aberto, sem o cliente ter de perguntar.',
      },
      {
        name: 'Marcações e reservas',
        desc: 'Ligação ao sistema que já usa (ou a um novo) para marcar sem telefonar.',
      },
    ],
  },
] as const;

/** Calendário de entrega dia a dia. */
export const methodSteps = [
  {
    number: '01',
    title: 'Conversa de 15 minutos',
    duration: 'Dia 1',
    body: 'Falamos sobre o seu negócio, os seus clientes e o que o distingue. Envia-nos o logótipo e as fotografias que tiver.',
  },
  {
    number: '02',
    title: 'Design e textos',
    duration: 'Dias 2–4',
    body: 'Desenhamos o site e escrevemos os textos. Não precisa de fazer mais nada.',
  },
  {
    number: '03',
    title: 'Vê o site pronto',
    duration: 'Dia 5',
    body: 'Envia-lhe o link de pré-visualização. Pede os ajustes que quiser na ronda de revisão.',
  },
  {
    number: '04',
    title: 'Aprovação e publicação',
    duration: 'Dias 6–7',
    body: 'Só depois do seu sim: domínio, segurança e indexação no Google. O site fica no ar.',
  },
] as const;

/**
 * Exemplos por setor — estruturas tipo, não clientes.
 * ⚠️ TODO: substituir por sites reais de clientes (com `url` para o site no ar)
 * assim que existirem. Apresentar exemplos como clientes é publicidade enganosa.
 */
export const examples: readonly {
  sector: string;
  title: string;
  body: string;
  features: readonly string[];
  url?: string;
}[] = [
  {
    sector: 'Restaurante',
    title: 'Reservas de mesa sem telefonar',
    body: 'Menu sempre atualizado, fotografias dos pratos e reserva direta a partir do telemóvel.',
    features: ['Menu', 'Reservas', 'Mapa e horário'],
  },
  {
    sector: 'Clínica',
    title: 'Marcações diretas pelo site',
    body: 'Especialidades, equipa e um botão de marcação visível em todas as páginas.',
    features: ['Marcações', 'Equipa', 'WhatsApp'],
  },
  {
    sector: 'Construção e remodelações',
    title: 'Obras que vendem a próxima obra',
    body: 'Galeria de trabalhos feitos e um formulário de pedido de orçamento com fotografias.',
    features: ['Galeria', 'Orçamentos', 'Zona servida'],
  },
] as const;

/** ⚠️ TODO: depoimentos reais e autorizados. Enquanto a lista estiver vazia, o bloco não aparece. */
export const testimonials: readonly { quote: string; author: string; role: string }[] = [];

/**
 * Planos. Criação paga uma vez + anuidade obrigatória (domínio, alojamento, SSL, pequenas alterações).
 * ⚠️ TODO: confirmar se os valores são com ou sem IVA — ver `pricingNote`.
 */
export const plans = [
  {
    name: 'Presença',
    price: '199 €',
    period: 'criação',
    pitch: 'Para quem ainda não tem site e quer aparecer no Google com uma página profissional.',
    renewal: '+ 79 €/ano — domínio, alojamento, SSL e pequenas alterações',
    features: [
      'Site de 1 página com várias secções',
      'Design pensado para telemóvel',
      'Textos escritos por nós',
      'Botões de WhatsApp, chamada e mapa',
      'Formulário de contacto',
      'Indexação no Google',
      '1 ronda de revisão',
    ],
    highlighted: false,
    cta: 'Quero o plano Presença',
  },
  {
    name: 'Negócio',
    price: '399 €',
    period: 'criação',
    pitch: 'O mais escolhido: várias páginas e presença no mapa do Google.',
    renewal: '+ 99 €/ano — domínio, alojamento, SSL e pequenas alterações',
    features: [
      'Até 5 páginas (serviços, galeria, sobre…)',
      'Tudo o que inclui o plano Presença',
      'Google Meu Negócio otimizado',
      'SEO local em cada página',
      'Ligação a marcações ou reservas',
      '2 rondas de revisão',
    ],
    highlighted: true,
    cta: 'Quero o plano Negócio',
  },
  {
    name: 'Projetos à medida',
    price: 'Sob orçamento',
    period: '',
    pitch: 'Para quem precisa de mais do que um site: sistemas e lojas feitos para o seu negócio.',
    renewal: 'Valor fechado e por escrito antes de começar',
    features: [
      'Lojas online com pagamentos',
      'Plataformas SaaS',
      'CRM à medida',
      'ERP e gestão interna',
      'Gestão de tráfego (Meta e Google Ads)',
    ],
    highlighted: false,
    cta: 'Pedir orçamento',
  },
] as const;

/** ⚠️ TODO: confirmar com a contabilidade. Para clientes particulares, os preços têm de ser anunciados com IVA incluído. */
export const pricingNote =
  'Valores sem IVA. A anuidade começa no dia em que o site fica no ar. Páginas extra, loja online e alterações maiores são orçamentadas antes — nunca há surpresas na fatura.';

export const faq = [
  {
    q: 'Quanto custa, ao certo?',
    a: 'A criação custa 199 € (1 página) ou 399 € (até 5 páginas). A isso soma-se uma anuidade de 79 € ou 99 € que cobre domínio, alojamento, certificado de segurança e pequenas alterações. Não há mensalidades. Lojas online, sistemas à medida e gestão de anúncios são orçamentados à parte.',
  },
  {
    // TODO: se adotarem "paga só depois de aprovar", trocar para "Vejo o site antes de pagar?".
    q: 'Vejo o site antes de ser publicado?',
    a: 'Sim. Ao fim de cinco dias recebe um link com o site pronto. Pede os ajustes que quiser e só publicamos depois do seu sim.',
  },
  {
    q: 'Em quanto tempo fica pronto?',
    a: 'Em 7 dias, a contar da reunião inicial. O prazo depende de nos enviar o logótipo e as fotografias logo no início.',
  },
  {
    q: 'O domínio e o site ficam em meu nome?',
    a: 'Sim, sempre. O domínio é registado em seu nome. Se um dia quiser sair, transferimos tudo sem custos nem complicações.',
  },
  {
    q: 'O que preciso de enviar?',
    a: 'Apenas o logótipo, algumas fotografias do negócio e 15 minutos para conversarmos. Os textos escrevemos nós. Se não tiver fotografias, ajudamos a escolher imagens adequadas.',
  },
  {
    q: 'O que não está incluído?',
    a: 'Páginas além das do plano, loja online com pagamentos e alterações grandes depois de o site estar no ar. Tudo isso é possível — damos-lhe o valor antes, por escrito, e só avançamos com a sua aprovação.',
  },
  {
    q: 'O que acontece se não renovar a anuidade?',
    a: 'O site deixa de estar no ar quando a anuidade termina. Avisamos com antecedência. Se preferir alojá-lo noutro lado, transferimos o domínio e os ficheiros para si.',
  },
  {
    q: 'Já tenho página de Facebook e Instagram. Preciso de um site?',
    a: 'As redes sociais são ótimas para quem já o conhece. O site é para quem ainda não o conhece e pesquisa no Google. Além disso, a página de Facebook não é sua: o site é.',
  },
  {
    q: 'Tenho de fazer anúncios?',
    a: 'Não. O site funciona sozinho no Google. Os anúncios são opcionais, para quem quer acelerar — se quiser, também tratamos da gestão de tráfego, com orçamento à parte.',
  },
] as const;

/** Motivos de escolha, na secção "Sobre". */
export const differentiators = [
  {
    icon: 'eye',
    title: 'Vê antes de aprovar',
    body: 'Recebe o site pronto para rever. Nada é publicado sem o seu sim.',
  },
  {
    icon: 'shieldCheck',
    title: 'Tudo em seu nome',
    body: 'O domínio e o site são seus. Se sair, levamos-lhe tudo sem custos.',
  },
  {
    icon: 'receipt',
    title: 'Preço fechado',
    body: 'Sabe quanto paga antes de começar. Extras só com orçamento aprovado.',
  },
  {
    icon: 'handshake',
    title: 'Fala sempre connosco',
    body: 'A mesma pessoa do início ao fim, por WhatsApp. Sem intermediários.',
  },
] as const;
