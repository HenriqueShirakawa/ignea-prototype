// ===== IGNEA — Company dashboard (desktop) =====
const { useState: cUseState } = React;

// ---------- Sidebar ----------
function CoSidebar({ route, go }) {
  const items = [
    { id: 'overview', label: 'Visão geral', icon: <Icon.grid size={19}/> },
    { id: 'jobs', label: 'Vagas', icon: <Icon.briefcase size={19}/>, badge: IG_JOBS.filter(j => j.status === 'Ativa').length },
    { id: 'search', label: 'Profissionais', icon: <Icon.users size={19}/> },
    { id: 'reviews', label: 'Avaliações', icon: <Icon.star size={19}/> },
    { id: 'plans', label: 'Planos & créditos', icon: <Icon.sparkle size={19}/> },
  ];
  return (
    <nav className="co-side">
      <div className="co-side__brand"><Logo size={28} textSize={18}/></div>
      <div className="co-side__nav">
        {items.map(it => (
          <button key={it.id} className={`co-nav${route === it.id ? ' is-active' : ''}`} onClick={() => go(it.id)}>
            {it.icon}<span>{it.label}</span>
            {it.badge != null && <em className="co-nav__badge">{it.badge}</em>}
          </button>
        ))}
      </div>
      <div className="co-side__bottom">
        <button className="co-nav"><Icon.settings size={19}/><span>Configurações</span></button>
        <div className="co-side__cred">
          <div className="co-side__cred-top"><Icon.unlock size={15}/> Desbloqueios</div>
          <div className="co-side__cred-bar"><i style={{ width: `${(IG_CREDITS.available / IG_CREDITS.total) * 100}%` }}></i></div>
          <div className="co-side__cred-num"><strong>{IG_CREDITS.available}</strong> de {IG_CREDITS.total} restantes</div>
        </div>
      </div>
    </nav>
  );
}

// ---------- Topbar ----------
function CoTopbar({ title, sub, action }) {
  return (
    <header className="co-top">
      <div>
        <h1 className="co-top__title">{title}</h1>
        {sub && <p className="co-top__sub">{sub}</p>}
      </div>
      <div className="co-top__right">
        <button className="co-icobtn" aria-label="Notificações"><Icon.bell size={19}/><i className="co-icobtn__dot"></i></button>
        {action}
        <div className="co-top__me"><Avatar initial={IG_COMPANY.initial} color={IG_COMPANY.color} size={38} radius={10}/><div><strong>{IG_COMPANY.short}</strong><span>Plano {IG_COMPANY.plan}</span></div></div>
      </div>
    </header>
  );
}

// ---------- Overview ----------
function CoOverview({ go }) {
  const stats = [
    { label: 'Vagas ativas', value: '2', icon: <Icon.briefcase size={18}/>, tone: 'ink' },
    { label: 'Candidaturas novas', value: '7', icon: <Icon.users size={18}/>, tone: 'blue', up: '+5 esta semana' },
    { label: 'Desbloqueios usados', value: '12', icon: <Icon.unlock size={18}/>, tone: 'green', sub: `${IG_CREDITS.available} restantes` },
    { label: 'Avaliação média', value: '4.9', icon: <Icon.star size={18}/>, tone: 'amber', sub: 'como contratante' },
  ];
  return (
    <div className="co-page">
      <div className="co-stats">
        {stats.map((s, i) => (
          <Card key={i} className="co-stat">
            <span className={`co-stat__ic co-stat__ic--${s.tone}`}>{s.icon}</span>
            <div className="co-stat__num">{s.value}</div>
            <div className="co-stat__lbl">{s.label}</div>
            {s.up && <div className="co-stat__up"><Icon.trending size={13}/> {s.up}</div>}
            {s.sub && <div className="co-stat__sub">{s.sub}</div>}
          </Card>
        ))}
      </div>

      <div className="co-cols">
        <section className="co-panel">
          <div className="co-panel__head"><h2>Suas vagas</h2><button className="co-link" onClick={() => go('jobs')}>Ver todas <Icon.chevR size={14}/></button></div>
          <div className="co-joblist">
            {IG_JOBS.map(j => (
              <button key={j.id} className="co-jobrow" onClick={() => go('job', j.id)}>
                <div className="co-jobrow__main">
                  <h3>{j.title}</h3>
                  <div className="co-jobrow__meta"><span>{j.area}</span><i></i><span>{j.mode}</span><i></i><span>{j.range}</span></div>
                </div>
                <div className="co-jobrow__right">
                  <Badge tone={j.status === 'Ativa' ? 'green' : 'muted'} dot>{j.status}</Badge>
                  <div className="co-jobrow__apps"><strong>{j.applicants}</strong> candidatos{j.newApplicants > 0 && <em>+{j.newApplicants} novos</em>}</div>
                  <Icon.chevR size={18}/>
                </div>
              </button>
            ))}
          </div>
        </section>

        <aside className="co-aside">
          <Card className="co-pending">
            <div className="co-pending__head"><Icon.star size={16}/> Aguardando sua avaliação</div>
            <p>Você concluiu um serviço com <strong>{IG_PENDING_REVIEW.pro.name}</strong>. Avaliar fortalece o histórico dos dois lados.</p>
            <div className="co-pending__pro">
              <Avatar initial={IG_PENDING_REVIEW.pro.initial} color={IG_PENDING_REVIEW.pro.color} size={40}/>
              <div><strong>{IG_PENDING_REVIEW.pro.name}</strong><span>{IG_PENDING_REVIEW.job}</span></div>
            </div>
            <Button block variant="primary" size="sm" onClick={() => go('review')}>Avaliar profissional</Button>
          </Card>

          <Card className="co-credits-card">
            <div className="co-credits-card__top"><div><span>Plano {IG_CREDITS.plan}</span><strong>{IG_CREDITS.available} desbloqueios</strong></div><Icon.unlock size={20}/></div>
            <div className="co-credits-card__bar"><i style={{ width: `${(IG_CREDITS.used / IG_CREDITS.total) * 100}%` }}></i></div>
            <p>{IG_CREDITS.used} usados este mês · renova em 12 dias</p>
            <Button block variant="ghost" size="sm" onClick={() => go('plans')}>Gerenciar plano</Button>
          </Card>
        </aside>
      </div>
    </div>
  );
}

// ---------- Jobs list ----------
function CoJobs({ go }) {
  return (
    <div className="co-page">
      <div className="co-joblist co-joblist--cards">
        {IG_JOBS.map(j => (
          <Card key={j.id} hover className="co-jobcard" onClick={() => go('job', j.id)}>
            <div className="co-jobcard__top">
              <Badge tone={j.status === 'Ativa' ? 'green' : 'muted'} dot>{j.status}</Badge>
              <span className="co-jobcard__posted">{j.posted}</span>
            </div>
            <h3>{j.title}</h3>
            <div className="co-jobcard__meta">
              <span><Icon.pin size={14}/> {j.location}</span>
              <span><Icon.money size={14}/> {j.range}</span>
              <span><Icon.clock size={14}/> {j.type}</span>
            </div>
            <div className="co-jobcard__foot">
              <div className="co-jobcard__apps"><strong>{j.applicants}</strong> candidatos {j.newApplicants > 0 && <Badge tone="blue">+{j.newApplicants} novos</Badge>}</div>
              <span className="co-link">Ver candidatos <Icon.chevR size={14}/></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------- Job detail + candidates ----------
function CoJob({ jobId, go, unlocked, onUnlock }) {
  const j = IG_JOBS.find(x => x.id === jobId) || IG_JOBS[0];
  const toast = useToast();
  return (
    <div className="co-page">
      <button className="co-back" onClick={() => go('jobs')}><Icon.arrowL size={16}/> Voltar para vagas</button>
      <div className="co-jobdetail">
        <Card className="co-jobdetail__main">
          <div className="co-jobcard__top"><Badge tone={j.status === 'Ativa' ? 'green' : 'muted'} dot>{j.status}</Badge><span className="co-jobcard__posted">Publicada {j.posted}</span></div>
          <h2>{j.title}</h2>
          <div className="co-jobcard__meta"><span><Icon.pin size={14}/> {j.location}</span><span><Icon.money size={14}/> {j.range}</span><span><Icon.clock size={14}/> {j.type}</span></div>
          <p className="co-jobdetail__desc">{j.desc}</p>
          <h4>Requisitos</h4>
          <ul className="co-reqs">{j.reqs.map((r, i) => <li key={i}><Icon.check size={15} sw={2.4}/> {r}</li>)}</ul>
          <div className="co-jobdetail__actions"><Button variant="ghost" size="sm" icon={<Icon.edit size={15}/>}>Editar vaga</Button><Button variant="ghost" size="sm">Pausar</Button></div>
        </Card>

        <div className="co-cands">
          <div className="co-cands__head"><h3>Candidatos <span>{IG_CANDIDATES.length}</span></h3><Select style={{ width: 160 }}><option>Maior match</option><option>Mais recentes</option><option>Melhor avaliação</option></Select></div>
          {IG_CANDIDATES.map(c => {
            const p = IG_PROS.find(x => x.id === c.proId);
            const isUnlocked = unlocked.has(p.id);
            return (
              <Card key={c.proId} className="co-cand">
                <Avatar initial={p.initial} color={p.color} size={52} radius={13}/>
                <div className="co-cand__body">
                  <div className="co-cand__line"><h4>{p.name}</h4><Badge tone={c.status === 'Novo' ? 'blue' : 'muted'}>{c.status}</Badge></div>
                  <div className="co-cand__title">{p.title} · {p.city}</div>
                  <div className="co-cand__meta"><Stars value={p.rating} size={13} count={p.reviews}/><span className="co-cand__match"><Icon.sparkle size={13}/> {c.match}% match</span><span>{c.appliedAt}</span></div>
                  <div className="co-cand__skills">{p.skills.slice(0, 3).map(s => <span key={s}>{s}</span>)}</div>
                </div>
                <div className="co-cand__actions">
                  <Button variant="ghost" size="sm" onClick={() => go('pro', p.id)}>Ver perfil</Button>
                  {isUnlocked
                    ? <Button variant="success" size="sm" icon={<Icon.phone size={14}/>} onClick={() => toast('Contato disponível', `${p.name} já está desbloqueado.`)}>Contato</Button>
                    : <Button variant="primary" size="sm" icon={<Icon.unlock size={14}/>} onClick={() => onUnlock(p)}>Desbloquear</Button>}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- New job form ----------
function CoNewJob({ go }) {
  const toast = useToast();
  const submit = e => { e.preventDefault(); toast('Oportunidade publicada', 'Sua vaga já está no ar.'); go('jobs'); };
  return (
    <div className="co-page co-page--narrow">
      <button className="co-back" onClick={() => go('jobs')}><Icon.arrowL size={16}/> Cancelar</button>
      <Card className="co-form">
        <form onSubmit={submit}>
          <h2 className="co-form__title">Publicar nova vaga</h2>
          <p className="co-form__sub">Sem ruído, sem burocracia. Preencha o essencial e publique.</p>
          <Field label="Título da vaga"><Input placeholder="Ex.: Senior Frontend Engineer"/></Field>
          <div className="ig-auth-grid2">
            <Field label="Área"><Select><option>Engenharia</option><option>Design</option><option>Dados</option><option>Produto</option></Select></Field>
            <Field label="Modelo"><Select><option>Remoto</option><option>Híbrido</option><option>Presencial</option></Select></Field>
          </div>
          <div className="ig-auth-grid2">
            <Field label="Faixa de remuneração"><Input placeholder="R$ 14–18k"/></Field>
            <Field label="Tipo"><Select><option>PJ · Integral</option><option>PJ · Projeto</option><option>PJ · Meio período</option></Select></Field>
          </div>
          <Field label="Localização" optional><Input placeholder="Remoto · Brasil" icon={<Icon.pin size={16}/>}/></Field>
          <Field label="Descrição"><Textarea rows={4} placeholder="Conte sobre o desafio, o time e o que a pessoa vai fazer."/></Field>
          <Field label="Requisitos" hint="Um por linha"><Textarea rows={3} placeholder={"5+ anos com React\nExperiência com design systems"}/></Field>
          <div className="co-form__foot">
            <Button variant="ghost" onClick={() => go('jobs')}>Salvar rascunho</Button>
            <Button type="submit" icon={<Icon.check size={16} sw={2.4}/>}>Publicar vaga</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

Object.assign(window, { CoSidebar, CoTopbar, CoOverview, CoJobs, CoJob, CoNewJob });
