// ===== IGNEA — Company: search, profile+unlock, plans, reviews =====
const { useState: csUseState } = React;

// ---------- Search professionals ----------
function CoSearch({ go, unlocked, onUnlock }) {
  const [q, setQ] = csUseState('');
  const filters = ['Todos', 'Design', 'Engenharia', 'Dados', 'Remoto', 'Disponível'];
  const [f, setF] = csUseState('Todos');
  const list = IG_PROS.filter(p => {
    const okQ = !q || (p.name + p.title + p.skills.join(' ')).toLowerCase().includes(q.toLowerCase());
    const okF = f === 'Todos' || p.title.includes(f) || p.skills.includes(f) || (f === 'Remoto' && p.mode === 'Remoto') || (f === 'Disponível' && p.available) || (f === 'Engenharia' && /Developer|Engineer/.test(p.title)) || (f === 'Design' && /Design|UX/.test(p.title)) || (f === 'Dados' && /Data/.test(p.title));
    return okQ && okF;
  });
  return (
    <div className="co-page">
      <div className="co-searchbar">
        <Input icon={<Icon.search size={18}/>} placeholder="Buscar por cargo, habilidade ou nome…" value={q} onChange={e => setQ(e.target.value)} />
        <Button variant="ghost" icon={<Icon.sliders size={16}/>}>Filtros</Button>
      </div>
      <div className="co-filters">{filters.map(x => <Pill key={x} active={f === x} onClick={() => setF(x)}>{x}</Pill>)}</div>
      <div className="co-progrid">
        {list.map(p => {
          const isU = unlocked.has(p.id);
          return (
            <Card key={p.id} hover className="co-procard" onClick={() => go('pro', p.id)}>
              <div className="co-procard__top">
                <Avatar initial={p.initial} color={p.color} size={54} radius={14}/>
                {p.available ? <Badge tone="green" dot>Disponível</Badge> : <Badge tone="muted">Ocupado</Badge>}
              </div>
              <h3>{p.name}</h3>
              <div className="co-procard__title">{p.title}</div>
              <div className="co-procard__meta"><span><Icon.pin size={13}/> {p.city}</span><span><Icon.money size={13}/> {p.rate}</span></div>
              <div className="co-procard__stats"><Stars value={p.rating} size={13} showValue/><span>·</span><span>{p.projects} projetos</span></div>
              <div className="co-cand__skills">{p.skills.slice(0, 3).map(s => <span key={s}>{s}</span>)}</div>
              <div className="co-procard__foot" onClick={e => e.stopPropagation()}>
                {isU
                  ? <span className="co-contact-ok"><Icon.checkCircle size={15}/> Contato desbloqueado</span>
                  : <span className="co-contact-lock"><Icon.lock size={14}/> Contato protegido</span>}
                {!isU && <Button size="sm" variant="ghost" onClick={() => onUnlock(p)}>Desbloquear</Button>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Professional profile + unlock ----------
function CoPro({ proId, go, unlocked, onUnlock }) {
  const p = IG_PROS.find(x => x.id === proId) || IG_PROS[0];
  const isU = unlocked.has(p.id);
  const toast = useToast();
  return (
    <div className="co-page co-page--narrow">
      <button className="co-back" onClick={() => go('search')}><Icon.arrowL size={16}/> Voltar para profissionais</button>
      <div className="co-prodetail">
        <Card className="co-prodetail__head">
          <Avatar initial={p.initial} color={p.color} size={72} radius={18}/>
          <div className="co-prodetail__id">
            <div className="co-prodetail__namerow"><h2>{p.name}</h2>{p.available && <Badge tone="green" dot>Disponível</Badge>}</div>
            <div className="co-prodetail__title">{p.title}</div>
            <div className="co-procard__meta"><span><Icon.pin size={14}/> {p.city}</span><span><Icon.money size={14}/> {p.rate}</span><span><Icon.clock size={14}/> {p.mode}</span></div>
          </div>
          <Verified/>
        </Card>

        <div className="co-prodetail__grid">
          <div className="co-prodetail__left">
            <Card className="co-block"><h4>Sobre</h4><p>{p.bio}</p></Card>
            <Card className="co-block"><h4>Habilidades</h4><div className="co-cand__skills co-cand__skills--lg">{p.skills.map(s => <span key={s}>{s}</span>)}</div></Card>
            <Card className="co-block">
              <div className="co-block__head"><h4>Avaliações recebidas</h4><Stars value={p.rating} size={14} count={p.reviews}/></div>
              {IG_PRO_REVIEWS.slice(0, 2).map((r, i) => (
                <div key={i} className="co-revitem">
                  <div className="co-revitem__top"><Avatar initial={r.initial} color={r.color} size={34} radius={9}/><div><strong>{r.from}</strong><span>{r.project}</span></div><Stars value={r.rating} size={12}/></div>
                  <p>"{r.text}"</p>
                </div>
              ))}
            </Card>
          </div>
          <aside className="co-prodetail__right">
            <Card className="co-histcard">
              <h4>Histórico verificado</h4>
              <div className="co-histrow"><Icon.checkCircle size={16}/><div><strong>{p.projects}</strong><span>projetos concluídos</span></div></div>
              <div className="co-histrow"><Icon.briefcase size={16}/><div><strong>{p.reviews}</strong><span>contratações</span></div></div>
              <div className="co-histrow"><Icon.star size={16}/><div><strong>{p.rating.toFixed(1)}</strong><span>avaliação média</span></div></div>
              <div className="co-histrow"><Icon.calendar size={16}/><div><strong>desde {p.joined}</strong><span>na plataforma</span></div></div>
            </Card>

            <Card className={`co-unlock${isU ? ' is-unlocked' : ''}`}>
              {isU ? (
                <>
                  <div className="co-unlock__ok"><Icon.checkCircle size={22}/> Contato desbloqueado</div>
                  <div className="co-contactlist">
                    <a><Icon.mail size={16}/> camila.moraes@email.com</a>
                    <a><Icon.phone size={16}/> +55 11 9 8xxx-xxxx</a>
                    <a><Icon.link size={16}/> linkedin.com/in/camilamoraes</a>
                  </div>
                  <Button block variant="primary" size="sm" onClick={() => toast('Conversa iniciada', 'Você pode contratar pela plataforma.')}>Iniciar conversa</Button>
                </>
              ) : (
                <>
                  <div className="co-unlock__lock"><Icon.lock size={20}/></div>
                  <h4>Contato protegido</h4>
                  <p>E-mail, telefone, WhatsApp e LinkedIn ficam ocultos até o desbloqueio.</p>
                  <Button block icon={<Icon.unlock size={16}/>} onClick={() => onUnlock(p)}>Desbloquear contato</Button>
                  <span className="co-unlock__credits">Usa 1 de {IG_CREDITS.available} desbloqueios</span>
                </>
              )}
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ---------- Plans ----------
function CoPlans() {
  const toast = useToast();
  return (
    <div className="co-page">
      <div className="co-plans-head">
        <h2>Escolha o plano da sua empresa</h2>
        <p>Vagas ilimitadas em todos os planos. Você paga pelos desbloqueios de contato.</p>
      </div>
      <div className="co-plans">
        {IG_PLANS.map(pl => (
          <Card key={pl.id} className={`co-plan${pl.popular ? ' is-popular' : ''}${pl.id === IG_CREDITS.plan.toLowerCase() ? ' is-current' : ''}`}>
            {pl.popular && <span className="co-plan__tag">Mais popular</span>}
            <h3>{pl.name}</h3>
            <p className="co-plan__blurb">{pl.blurb}</p>
            <div className="co-plan__price"><strong>R$ {pl.price}</strong><span>/mês</span></div>
            <div className="co-plan__unlocks"><Icon.unlock size={15}/> {pl.unlocks} desbloqueios / mês</div>
            <ul className="co-plan__feats">{pl.feats.map((f, i) => <li key={i}><Icon.check size={15} sw={2.4}/> {f}</li>)}</ul>
            {pl.id === IG_CREDITS.plan.toLowerCase()
              ? <Button block variant="ghost" disabled>Plano atual</Button>
              : <Button block variant={pl.popular ? 'primary' : 'ghost'} onClick={() => toast('Plano atualizado', `Você está no plano ${pl.name}.`)}>Escolher {pl.name}</Button>}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------- Reviews (company side) ----------
function CoReviews({ go }) {
  return (
    <div className="co-page">
      <Card className="co-pending co-pending--wide">
        <div className="co-pending__head"><Icon.star size={16}/> Aguardando sua avaliação</div>
        <div className="co-pending__row">
          <div className="co-pending__pro">
            <Avatar initial={IG_PENDING_REVIEW.pro.initial} color={IG_PENDING_REVIEW.pro.color} size={44}/>
            <div><strong>{IG_PENDING_REVIEW.pro.name}</strong><span>{IG_PENDING_REVIEW.job} · {IG_PENDING_REVIEW.period}</span></div>
          </div>
          <Button variant="primary" size="sm" onClick={() => go('review')}>Avaliar profissional</Button>
        </div>
      </Card>
      <h3 className="co-section-title">Avaliações que você deu</h3>
      <div className="co-revgrid">
        {IG_PRO_REVIEWS.map((r, i) => (
          <Card key={i} className="co-revcard">
            <div className="rev-dir"><Icon.user size={14}/> Você avaliou um profissional</div>
            <Stars value={r.rating} size={15}/>
            <p className="co-revcard__text">"{r.text}"</p>
            <div className="co-revcard__foot"><Avatar initial={r.initial} color={r.color} size={36} radius={9}/><div><strong>{IG_PRO_ME.name}</strong><span>{r.project}</span></div><span className="co-revcard__when">{r.when}</span></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------- Review a professional (form) ----------
function CoReview({ go }) {
  const [rating, setRating] = csUseState(5);
  const [hover, setHover] = csUseState(0);
  const toast = useToast();
  const pr = IG_PENDING_REVIEW;
  const submit = e => { e.preventDefault(); toast('Avaliação enviada', 'Obrigado por fortalecer o histórico real.'); go('reviews'); };
  return (
    <div className="co-page co-page--narrow">
      <button className="co-back" onClick={() => go('reviews')}><Icon.arrowL size={16}/> Voltar</button>
      <Card className="co-form">
        <form onSubmit={submit}>
          <h2 className="co-form__title">Avaliar profissional</h2>
          <p className="co-form__sub">Serviço concluído · {pr.job} · {pr.period}</p>
          <div className="co-review-pro">
            <Avatar initial={pr.pro.initial} color={pr.pro.color} size={52} radius={13}/>
            <div><strong>{pr.pro.name}</strong><span>{pr.pro.title}</span></div>
          </div>
          <div className="co-rate">
            <span className="ig-label">Sua nota</span>
            <div className="co-rate__stars" onMouseLeave={() => setHover(0)}>
              {[1,2,3,4,5].map(n => (
                <button type="button" key={n} onMouseEnter={() => setHover(n)} onClick={() => setRating(n)} className="co-rate__btn">
                  <Icon.star size={34} fill={n <= (hover || rating) ? '#E8B23A' : 'none'} stroke={n <= (hover || rating) ? '#E8B23A' : '#D6DEE2'} sw={1.5}/>
                </button>
              ))}
              <span className="co-rate__num">{(hover || rating).toFixed(1)}</span>
            </div>
          </div>
          <Field label="Comentário" hint="Visível no histórico do profissional"><Textarea rows={4} placeholder="Como foi trabalhar com este profissional? Pontos fortes, entrega, comunicação…" defaultValue="Entrega impecável e comunicação clara do início ao fim."/></Field>
          <Field label="Recomendaria para outras empresas?">
            <div className="co-rec">{['Com certeza', 'Sim', 'Talvez'].map((o, i) => <Pill key={o} active={i === 0}>{o}</Pill>)}</div>
          </Field>
          <div className="co-form__foot"><Button variant="ghost" onClick={() => go('reviews')}>Cancelar</Button><Button type="submit" icon={<Icon.check size={16} sw={2.4}/>}>Enviar avaliação</Button></div>
        </form>
      </Card>
    </div>
  );
}

// ---------- Unlock modal ----------
function UnlockModal({ pro, onConfirm, onClose }) {
  if (!pro) return null;
  return (
    <div className="ig-modal-overlay" onClick={onClose}>
      <Card className="ig-modal" style={{}}>
        <div onClick={e => e.stopPropagation()}>
          <button className="ig-modal__x" onClick={onClose}><Icon.x size={18}/></button>
          <div className="ig-modal__ic"><Icon.unlock size={24}/></div>
          <h3>Desbloquear contato de {pro.name}?</h3>
          <p>Você verá e-mail, telefone, WhatsApp e LinkedIn. Isso usa <strong>1 desbloqueio</strong>.</p>
          <div className="ig-modal__credits"><span>Desbloqueios restantes</span><strong>{IG_CREDITS.available} → {IG_CREDITS.available - 1}</strong></div>
          <div className="ig-modal__actions"><Button variant="ghost" block onClick={onClose}>Cancelar</Button><Button block icon={<Icon.unlock size={15}/>} onClick={() => onConfirm(pro)}>Desbloquear</Button></div>
        </div>
      </Card>
    </div>
  );
}

// ---------- Company app shell ----------
function CompanyApp({ authMode, startAuthed, onExit }) {
  const [authed, setAuthed] = csUseState(!!startAuthed);
  const [route, setRoute] = csUseState('overview');
  const [param, setParam] = csUseState(null);
  const [unlocked, setUnlocked] = csUseState(() => new Set());
  const [modalPro, setModalPro] = csUseState(null);
  const toast = useToast();

  const go = (name, p = null) => { setRoute(name); setParam(p); };
  const askUnlock = pro => setModalPro(pro);
  const confirmUnlock = pro => { setUnlocked(s => new Set(s).add(pro.id)); setModalPro(null); toast('Contato desbloqueado', `${pro.name} agora aparece em seus contatos.`); };

  if (!authed) return <CompanyAuth mode={authMode} onAuthed={() => setAuthed(true)} onRole={onExit} />;

  const titles = {
    overview: ['Visão geral', `Olá, ${IG_COMPANY.short}. Aqui está o resumo de hoje.`],
    jobs: ['Vagas', 'Gerencie suas oportunidades publicadas.'],
    job: ['Detalhe da vaga', 'Candidatos e informações.'],
    newJob: ['Nova vaga', null],
    search: ['Buscar profissionais', 'Encontre talento com histórico verificado.'],
    pro: ['Perfil do profissional', null],
    plans: ['Planos & créditos', 'Gerencie sua assinatura e desbloqueios.'],
    reviews: ['Avaliações', 'Histórico de avaliações dadas e pendentes.'],
    review: ['Avaliar profissional', null],
  };
  const [title, sub] = titles[route] || ['', ''];
  const action = (route === 'jobs' || route === 'overview')
    ? <Button size="sm" icon={<Icon.plus size={16}/>} onClick={() => go('newJob')}>Publicar vaga</Button>
    : null;

  return (
    <div className="co-app">
      <CoSidebar route={route} go={go} />
      <div className="co-main">
        <CoTopbar title={title} sub={sub} action={action} />
        <div className="co-scroll">
          {route === 'overview' && <CoOverview go={go} />}
          {route === 'jobs' && <CoJobs go={go} />}
          {route === 'job' && <CoJob jobId={param} go={go} unlocked={unlocked} onUnlock={askUnlock} />}
          {route === 'newJob' && <CoNewJob go={go} />}
          {route === 'search' && <CoSearch go={go} unlocked={unlocked} onUnlock={askUnlock} />}
          {route === 'pro' && <CoPro proId={param} go={go} unlocked={unlocked} onUnlock={askUnlock} />}
          {route === 'plans' && <CoPlans />}
          {route === 'reviews' && <CoReviews go={go} />}
          {route === 'review' && <CoReview go={go} />}
        </div>
      </div>
      <UnlockModal pro={modalPro} onConfirm={confirmUnlock} onClose={() => setModalPro(null)} />
    </div>
  );
}

Object.assign(window, { CoSearch, CoPro, CoPlans, CoReviews, CoReview, UnlockModal, CompanyApp });
