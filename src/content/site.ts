export type Unit = {
  id: string;
  name: string;
  image: string;
  imageCaption: string;
  address: string | null;
  hours: string | null;
  whatsapp: string | null;
  maps: string | null;
};
export type Plan = {
  id: string;
  name: string;
  label: string;
  description: string;
  price: number | null;
  benefits: string[];
  recommended: boolean;
  provisional: boolean;
};
export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  unit: string;
  verified: boolean;
  sourceUrl: string;
};
export type Professional = {
  id: string;
  name: string;
  unit: string;
  specialty: string;
  photo: string;
  confirmed: boolean;
};

// Only confirmed details are published. Null fields must be supplied by Casa 77.
export const site = {
  name: "Barbearia Casa 77",
  city: "Barreiras",
  state: "Bahia",
  tagline: "Referência se constrói com atitude.",
  description:
    "Barbearia Casa 77 em Barreiras, Bahia. Três unidades, mais de 300 assinantes e um novo jeito de cuidar do seu estilo. Conheça a Casa e agende seu horário.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  whatsappFallback: "https://api.whatsapp.com/message/55KJSXV3Q7CGP1",
  app: "https://onelink.to/23vzd9",
  instagram: "https://www.instagram.com/barbeariacasa77/",
  linktree: "https://linktr.ee/barbeariacasa77",
  sources: {
    verifiedOn: "2026-09-11",
    contact: "https://linktr.ee/barbeariacasa77",
    references: "referenciasBarbearia/",
  },
  stats: { subscribers: 300, units: 3 },
  nav: [
    { label: "A Casa 77", href: "#a-casa" },
    { label: "Equipe", href: "#equipe" },
    { label: "Unidades", href: "#unidades" },
    { label: "Assinaturas", href: "#assinaturas" },
    { label: "Avaliações", href: "#avaliacoes" },
  ],
  about:
    "A Casa 77 nasceu para transformar o cuidado masculino em uma experiência de identidade, confiança e atitude. Com três unidades em Barreiras e a primeira proposta de barbearia por assinatura da região, a marca tornou a recorrência parte de um novo jeito de cuidar do estilo.",
};

export const units: Unit[] = [
  {
    id: "barreirinhas",
    name: "Barreirinhas",
    image: "/images/UnidadeBarreirinhas.webp",
    imageCaption: "Dentro da Casa 77 · acervo da marca",
    address: "R. São Sebastião, 453 - Barreirinhas, Barreiras - BA, 47810-674",
    hours: null,
    whatsapp: null,
    maps: "https://goo.gl/maps/yufK7L2cq1q",
  },
  {
    id: "renato-goncalves",
    name: "Renato Gonçalves",
    image: "/images/UnidadeRenGonc.webp",
    imageCaption: "O cuidado Casa 77 · acervo da marca",
    address: "Rua Ruy Barbosa, 1375 — Renato Gonçalves, Barreiras — BA",
    hours: null,
    whatsapp: null,
    maps: "https://maps.app.goo.gl/zVYboqsUgpnwuney9",
  },
  {
    id: "avenida",
    name: "Avenida",
    image: "/images/UnidadeAvenid.webp",
    imageCaption: "Identidade Casa 77 · acervo da marca",
    address:
      "Av. Antônio Carlos Magalhães, 1134 - Vila Brasil, Barreiras - BA, 47802-147",
    hours: null,
    whatsapp: null,
    maps: "https://maps.app.goo.gl/bpyzdK2jdv4bifVq6",
  },
];

// These are layout slots, not real product offerings. Publish confirmed plans here.
export const plans: Plan[] = [
  {
    id: "01",
    name: "Plano 01",
    label: "Sua rotina",
    description: "Um espaço para o cuidado fazer parte dos seus dias.",
    price: null,
    benefits: [],
    recommended: false,
    provisional: true,
  },
  {
    id: "02",
    name: "Plano 02",
    label: "Seu estilo",
    description: "Sua melhor versão merece um lugar na agenda.",
    price: null,
    benefits: [],
    recommended: true,
    provisional: true,
  },
  {
    id: "03",
    name: "Plano 03",
    label: "Sua experiência",
    description: "Encontre com a equipe a assinatura que combina com você.",
    price: null,
    benefits: [],
    recommended: false,
    provisional: true,
  },
];
export const professionals: Professional[] = [];
export const editorial = [
  {
    image: "/images/Funcionario01.jpg",
    title: "Autenticidade.",
    caption: "Cada estilo, uma identidade.",
  },
  {
    image: "/images/editorial-02.webp",
    title: "Personalidade.",
    caption: "Seu jeito de estar no mundo.",
  },
  {
    image: "/images/Funcionario03.jpg",
    title: "Presença.",
    caption: "Confiança em cada detalhe.",
  },
];
// Public Google profiles supplied by Casa 77; checked on 2026-09-11.
// Quotes are verbatim excerpts, not rewritten testimonials.
export const reviewUnits = [
  {
    id: "barreirinhas",
    name: "Barreirinhas",
    rating: 4.9,
    count: 445,
    url: "https://share.google/ZVelqk62T10SGtmiN",
  },
  {
    id: "renato-goncalves",
    name: "Renato Gonçalves",
    rating: 5,
    count: 143,
    url: "https://share.google/aZWLuylgJZqNs59Xe",
  },
  {
    id: "avenida",
    name: "Avenida",
    rating: 5,
    count: 59,
    url: "https://share.google/AhZFy5sZ6Y3501wg8",
  },
];
export const reviewSummary = {
  count: reviewUnits.reduce((total, unit) => total + unit.count, 0),
  verifiedOn: "2026-09-11",
};
export const reviews: Review[] = [
  {
    id: "joao-victor",
    name: "João Victor Sousa",
    text: "Serviço top, galera gente boa e muito profissionais",
    rating: 5,
    unit: "Barreirinhas",
    verified: true,
    sourceUrl: reviewUnits[0].url,
  },
  {
    id: "rafael",
    name: "Rafael Guimarães",
    text: "Sou fã da Casa 77",
    rating: 5,
    unit: "Renato Gonçalves",
    verified: true,
    sourceUrl:
      "https://www.google.com/maps/contrib/108031052472163836219/reviews?hl=pt-BR",
  },
  {
    id: "euris",
    name: "Euris Nunes",
    text: "Experiência maravilhosa!",
    rating: 5,
    unit: "Avenida",
    verified: true,
    sourceUrl:
      "https://www.google.com/maps/contrib/105859768442648330587/reviews?hl=pt-BR",
  },
  {
    id: "gustavo",
    name: "gustavo sandes",
    text: "Ótimo profissional, muito bacana o espaço, show!",
    rating: 5,
    unit: "Barreirinhas",
    verified: true,
    sourceUrl: reviewUnits[0].url,
  },
  {
    id: "igor",
    name: "igor piau",
    text: "Excelente. Qualidade que só encontro na casa 77.",
    rating: 5,
    unit: "Renato Gonçalves",
    verified: true,
    sourceUrl:
      "https://www.google.com/maps/contrib/112158147798916511872/reviews?hl=pt-BR",
  },
  {
    id: "bruno",
    name: "Bruno Lopes",
    text: "Ótimos profissionais e lugar muito aconchegante!!",
    rating: 5,
    unit: "Avenida",
    verified: true,
    sourceUrl:
      "https://www.google.com/maps/contrib/112531119886479774860/reviews?hl=pt-BR",
  },
];

export function whatsappUrl(message: string, phone?: string | null) {
  const number = (phone || site.whatsapp).replace(/\D/g, "");
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `${site.whatsappFallback}?text=${encodeURIComponent(message)}`;
}
export const messages = {
  general: "Olá! Conheci a Casa 77 pelo site e gostaria de agendar um horário.",
  unit: (name: string) =>
    `Olá! Gostaria de agendar um horário na Casa 77 ${name}.`,
  plan: (name?: string) =>
    `Olá! Conheci os planos pelo site da Casa 77 e quero saber mais sobre ${name ? `a assinatura ${name}` : "as assinaturas disponíveis"}.`,
  professional: (name: string) =>
    `Olá! Gostaria de agendar com ${name} na Casa 77.`,
};
