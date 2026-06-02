// ===== IGNEA — mock data =====
// All fictional. Mirrors the PRD data model (users, profiles, jobs,
// applications, contracts, reviews, unlock credits).

const IG_COMPANY = {
  name: 'Nuvex Tecnologia',
  short: 'Nuvex',
  initial: 'N',
  color: '#2E424B',
  sector: 'Tecnologia',
  size: '50–200',
  city: 'São Paulo, SP',
  plan: 'Pro',
  rating: 4.9,
};

// Unlock credits (monetization)
const IG_CREDITS = { available: 38, used: 12, total: 50, plan: 'Pro' };

const IG_PLANS = [
  { id: 'starter', name: 'Starter', price: 149, unlocks: 10, blurb: 'Para começar a contratar.',
    feats: ['10 desbloqueios / mês', 'Publicação de vagas ilimitada', 'Histórico verificado', 'Suporte por e-mail'] },
  { id: 'pro', name: 'Pro', price: 449, unlocks: 50, blurb: 'Para times que contratam todo mês.',
    feats: ['50 desbloqueios / mês', 'Tudo do Starter', 'Busca avançada de profissionais', 'Avaliações em destaque', 'Suporte prioritário'], popular: true },
  { id: 'business', name: 'Business', price: 1290, unlocks: 200, blurb: 'Para escala e múltiplos times.',
    feats: ['200 desbloqueios / mês', 'Tudo do Pro', 'Múltiplos usuários', 'Relatórios de contratação', 'Gerente de conta dedicado'] },
];

// Jobs published by the company
const IG_JOBS = [
  { id: 'j1', title: 'Senior Frontend Engineer', area: 'Engenharia', mode: 'Remoto', type: 'PJ · Integral',
    range: 'R$ 14–18k', location: 'Remoto · Brasil', status: 'Ativa', posted: 'há 2 dias',
    applicants: 18, newApplicants: 5,
    desc: 'Buscamos um(a) profissional para liderar o desenvolvimento da nossa interface de produto, trabalhando próximo a design e produto.',
    reqs: ['5+ anos com React e TypeScript', 'Experiência com design systems', 'Inglês técnico', 'Boa comunicação assíncrona'] },
  { id: 'j2', title: 'Product Designer', area: 'Design', mode: 'Híbrido', type: 'PJ · Integral',
    range: 'R$ 10–14k', location: 'São Paulo, SP', status: 'Ativa', posted: 'há 5 dias',
    applicants: 24, newApplicants: 2,
    desc: 'Procuramos um(a) Product Designer para conduzir fluxos de ponta a ponta, de pesquisa a interface final.',
    reqs: ['Portfólio com casos de produto', 'Domínio de Figma', 'Experiência com pesquisa', 'Pensamento sistêmico'] },
  { id: 'j3', title: 'Data Analyst Pleno', area: 'Dados', mode: 'Presencial', type: 'PJ · Integral',
    range: 'R$ 8–11k', location: 'São Paulo, SP', status: 'Pausada', posted: 'há 2 semanas',
    applicants: 11, newApplicants: 0,
    desc: 'Análise de dados para apoiar decisões de produto e negócio, construindo dashboards e relatórios recorrentes.',
    reqs: ['SQL avançado', 'Experiência com BI (Metabase/Looker)', 'Python para análise', 'Storytelling com dados'] },
];

// Professionals (for company search)
const IG_PROS = [
  { id: 'p1', name: 'Camila Moraes', initial: 'CM', color: '#4E86AA', title: 'Product Designer',
    city: 'São Paulo, SP', mode: 'Remoto', rate: 'R$ 120/h', available: true,
    skills: ['Figma', 'Design System', 'Pesquisa', 'Prototipagem'], rating: 4.9, reviews: 12,
    projects: 23, years: 6, joined: '2023',
    bio: 'Designer de produto com foco em sistemas e fluxos complexos. Já atuei em fintechs e SaaS B2B, sempre conectando pesquisa, interface e métricas.',
    locked: true },
  { id: 'p2', name: 'Diego Souza', initial: 'DS', color: '#2E424B', title: 'Backend Developer',
    city: 'Curitiba, PR', mode: 'Remoto', rate: 'R$ 140/h', available: true,
    skills: ['Node.js', 'PostgreSQL', 'AWS', 'APIs'], rating: 4.8, reviews: 9,
    projects: 17, years: 7, joined: '2022',
    bio: 'Desenvolvedor backend especializado em sistemas distribuídos e APIs de alta disponibilidade.',
    locked: true },
  { id: 'p3', name: 'Rafael Torres', initial: 'RT', color: '#6B7E86', title: 'Fullstack Engineer',
    city: 'Remoto', mode: 'Remoto', rate: 'R$ 130/h', available: false,
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'], rating: 5.0, reviews: 15,
    projects: 31, years: 8, joined: '2021',
    bio: 'Engenheiro fullstack com histórico em produtos de ponta a ponta, do banco de dados à interface.',
    locked: true },
  { id: 'p4', name: 'Beatriz Nunes', initial: 'BN', color: '#4E86AA', title: 'Data Analyst',
    city: 'Belo Horizonte, MG', mode: 'Híbrido', rate: 'R$ 95/h', available: true,
    skills: ['SQL', 'Python', 'Looker', 'Estatística'], rating: 4.7, reviews: 7,
    projects: 13, years: 4, joined: '2023',
    bio: 'Analista de dados focada em transformar números em decisões claras de produto e negócio.',
    locked: true },
  { id: 'p5', name: 'Lucas Almeida', initial: 'LA', color: '#2E424B', title: 'Mobile Developer',
    city: 'Recife, PE', mode: 'Remoto', rate: 'R$ 125/h', available: true,
    skills: ['React Native', 'Swift', 'Kotlin', 'CI/CD'], rating: 4.8, reviews: 10,
    projects: 19, years: 5, joined: '2022',
    bio: 'Desenvolvedor mobile com apps publicados nas duas lojas e foco em performance.',
    locked: true },
  { id: 'p6', name: 'Marina Costa', initial: 'MC', color: '#6B7E86', title: 'UX Researcher',
    city: 'São Paulo, SP', mode: 'Remoto', rate: 'R$ 110/h', available: true,
    skills: ['Entrevistas', 'Testes', 'Análise', 'Discovery'], rating: 4.9, reviews: 8,
    projects: 15, years: 5, joined: '2023',
    bio: 'Pesquisadora de UX que conecta evidências de usuários a decisões de produto.',
    locked: true },
];

// Candidates for a specific job (company side)
const IG_CANDIDATES = [
  { proId: 'p1', appliedAt: 'há 1 dia', status: 'Novo', match: 94 },
  { proId: 'p3', appliedAt: 'há 2 dias', status: 'Em análise', match: 91 },
  { proId: 'p6', appliedAt: 'há 3 dias', status: 'Novo', match: 88 },
  { proId: 'p5', appliedAt: 'há 4 dias', status: 'Em análise', match: 82 },
];

// ===== Professional side =====
const IG_PRO_ME = {
  name: 'Camila Moraes', initial: 'CM', color: '#4E86AA', title: 'Product Designer',
  city: 'São Paulo, SP', rate: 'R$ 120/h', available: true,
  bio: 'Designer de produto com foco em sistemas e fluxos complexos. Já atuei em fintechs e SaaS B2B, conectando pesquisa, interface e métricas.',
  skills: ['Figma', 'Design System', 'Pesquisa', 'Prototipagem', 'UX Writing'],
  rating: 4.9, reviews: 12, projects: 23, contracts: 19, joined: 'mar 2023',
  completion: 85,
};

// Opportunities (professional search)
const IG_OPPS = [
  { id: 'o1', title: 'Senior Frontend Engineer', company: 'Nuvex Tecnologia', initial: 'N', color: '#2E424B',
    mode: 'Remoto', range: 'R$ 14–18k', type: 'PJ · Integral', posted: 'há 2 dias', rating: 4.9,
    area: 'Engenharia', match: 92, location: 'Remoto · Brasil',
    desc: 'Lidere o desenvolvimento da nossa interface de produto, próximo a design e produto.',
    reqs: ['5+ anos com React e TypeScript', 'Experiência com design systems', 'Inglês técnico'] },
  { id: 'o2', title: 'Product Designer', company: 'Fluxo Studio', initial: 'F', color: '#4E86AA',
    mode: 'Híbrido', range: 'R$ 10–14k', type: 'PJ · Integral', posted: 'há 5 dias', rating: 4.8,
    area: 'Design', match: 96, location: 'São Paulo, SP',
    desc: 'Conduza fluxos de produto de ponta a ponta, de pesquisa a interface final.',
    reqs: ['Portfólio com casos de produto', 'Domínio de Figma', 'Experiência com pesquisa'] },
  { id: 'o3', title: 'UX Researcher', company: 'Vértice', initial: 'V', color: '#2E424B',
    mode: 'Remoto', range: 'R$ 9–12k', type: 'PJ · Projeto', posted: 'há 1 semana', rating: 4.9,
    area: 'Design', match: 89, location: 'Remoto · Brasil',
    desc: 'Discovery e validação para uma nova linha de produtos financeiros.',
    reqs: ['Experiência com entrevistas e testes', 'Síntese de pesquisa', 'Colaboração com produto'] },
  { id: 'o4', title: 'Design Lead', company: 'Órbita Dados', initial: 'O', color: '#6B7E86',
    mode: 'Presencial', range: 'R$ 16–20k', type: 'PJ · Integral', posted: 'há 1 semana', rating: 4.7,
    area: 'Design', match: 78, location: 'São Paulo, SP',
    desc: 'Liderança de um time de 3 designers em produtos de dados.',
    reqs: ['Experiência liderando designers', 'Visão de produto', 'Maturidade em design ops'] },
];

// Professional's applications
const IG_APPLICATIONS = [
  { id: 'a1', oppId: 'o2', status: 'Em análise', appliedAt: 'há 2 dias', step: 2 },
  { id: 'a2', oppId: 'o1', status: 'Visualizada', appliedAt: 'há 4 dias', step: 1 },
  { id: 'a3', oppId: 'o3', status: 'Entrevista', appliedAt: 'há 1 semana', step: 3 },
];
const IG_APP_STEPS = ['Enviada', 'Visualizada', 'Em análise', 'Entrevista', 'Contratado'];

// Reviews received by the professional + history
const IG_PRO_REVIEWS = [
  { from: 'Nuvex Tecnologia', initial: 'N', color: '#2E424B', role: 'Head de Engenharia · Nuvex',
    rating: 5, when: 'há 1 mês', project: 'Redesign do painel de produto',
    text: 'Entrega impecável e comunicação clara do início ao fim. Trouxe soluções que nem tínhamos mapeado.' },
  { from: 'Fluxo Studio', initial: 'F', color: '#4E86AA', role: 'CEO · Fluxo Studio',
    rating: 5, when: 'há 3 meses', project: 'Design system v2',
    text: 'Profissionalismo acima da média. Cumpriu todos os prazos e elevou a qualidade do time.' },
  { from: 'Vértice', initial: 'V', color: '#6B7E86', role: 'Product Lead · Vértice',
    rating: 4, when: 'há 5 meses', project: 'Discovery de onboarding',
    text: 'Pesquisa muito bem conduzida, com sínteses claras. Ajudou bastante nas decisões de produto.' },
];

// A finished contract pending review (used by both review flows)
const IG_PENDING_REVIEW = {
  contractId: 'c1',
  company: { name: 'Fluxo Studio', initial: 'F', color: '#4E86AA' },
  pro: { name: 'Camila Moraes', initial: 'CM', color: '#4E86AA', title: 'Product Designer' },
  job: 'Design System v2',
  period: 'jan – abr 2026',
};

Object.assign(window, {
  IG_COMPANY, IG_CREDITS, IG_PLANS, IG_JOBS, IG_PROS, IG_CANDIDATES,
  IG_PRO_ME, IG_OPPS, IG_APPLICATIONS, IG_APP_STEPS, IG_PRO_REVIEWS, IG_PENDING_REVIEW,
});
