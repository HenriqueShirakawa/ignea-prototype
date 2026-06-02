// ===== IGNEA — Professional: profile, availability, history, review =====
const { useState: ppUseState } = React;

// ---------- Profile (tab) ----------
function PmProfile({ go }) {
  const me = IG_PRO_ME;
  return (
    <>
      <MobileHeader title="Perfil" big right={<button className="pm-icobtn" onClick={() => go('editProfile')}><Icon.edit size={18}/></button>} />
      <div className="pm-scroll">
        <div className="pm-profhero">
          <Avatar initial={me.initial} color={me.color} size={76} radius={20}/>
          <h2>{me.name}</h2>
          <p className="pm-profhero__title">{me.title}</p>
          <div className="pm-profhero__meta"><span><Icon.pin size={13}/> {me.city}</span><span><Icon.money size={13}/> {me.rate}</span></div>
          <Verified/>
        </div>

        <div className="pm-profstats">
          <div><strong>{me.rating.toFixed(1)}</strong><span>avaliação</span></div>
          <div><strong>{me.projects}</strong><span>projetos</span></div>
          <div><strong>{me.contracts}</strong><span>contratos</span></div>
        </div>

        <div className="pm-completion" onClick={() => go('editProfile')}>
          <div className="pm-completion__row"><span>Perfil {me.completion}% completo</span><Icon.chevR size={16}/></div>
          <div className="pm-completion__bar"><i style={{ width: `${me.completion}%` }}></i></div>
          <p>Adicione um portfólio para chegar a 100%.</p>
        </div>

        <div className="pm-menu">
          <button className="pm-menurow" onClick={() => go('availability')}><span className="pm-menurow__ic" style={{ background: 'rgba(63,167,118,.12)', color: '#2E9166' }}><Icon.calendar size={18}/></span><div><strong>Disponibilidade</strong><span>{me.available ? 'Disponível para propostas' : 'Indisponível'}</span></div><Icon.chevR size={17}/></button>
          <button className="pm-menurow" onClick={() => go('history')}><span className="pm-menurow__ic" style={{ background: 'rgba(232,178,58,.14)', color: '#C8902A' }}><Icon.star size={18}/></span><div><strong>Histórico e avaliações</strong><span>{me.reviews} avaliações recebidas</span></div><Icon.chevR size={17}/></button>
          <button className="pm-menurow" onClick={() => go('reviewCompany')}><span className="pm-menurow__ic" style={{ background: 'rgba(78,134,170,.12)', color: '#4E86AA' }}><Icon.checkCircle size={18}/></span><div><strong>Avaliar empresa</strong><span>1 serviço aguardando avaliação</span><i className="pm-menurow__badge">1</i></div><Icon.chevR size={17}/></button>
        </div>

        <div className="pm-block pm-block--card"><h4>Sobre</h4><p>{me.bio}</p></div>
        <div className="pm-block pm-block--card"><h4>Habilidades</h4><div className="pm-skills">{me.skills.map(s => <span key={s}>{s}</span>)}</div></div>

        <button className="pm-logout" onClick={() => go('logout')}><Icon.logout size={17}/> Sair da conta</button>
      </div>
    </>
  );
}

// ---------- Edit profile (pushed) ----------
function PmEditProfile({ back }) {
  const me = IG_PRO_ME;
  const toast = useToast();
  return (
    <div className="pm-push">
      <MobileHeader title="Editar perfil" onBack={back} />
      <div className="pm-scroll pm-scroll--push">
        <div className="pm-editavatar"><Avatar initial={me.initial} color={me.color} size={72} radius={18}/><button className="pm-link">Trocar foto</button></div>
        <Field label="Nome completo"><Input defaultValue={me.name}/></Field>
        <Field label="Título profissional"><Input defaultValue={me.title}/></Field>
        <div className="ig-auth-grid2">
          <Field label="Cidade"><Input defaultValue={me.city}/></Field>
          <Field label="Valor / hora"><Input defaultValue={me.rate}/></Field>
        </div>
        <Field label="Sobre"><Textarea rows={4} defaultValue={me.bio}/></Field>
        <Field label="Habilidades" hint="Separe por vírgula"><Input defaultValue={me.skills.join(', ')}/></Field>
      </div>
      <div className="pm-bottombar"><Button block size="lg" onClick={() => { toast('Perfil atualizado'); back(); }}>Salvar alterações</Button></div>
    </div>
  );
}

// ---------- Availability (pushed) ----------
function PmAvailability({ back }) {
  const [on, setOn] = ppUseState(IG_PRO_ME.available);
  const [mode, setMode] = ppUseState('Remoto');
  const [hours, setHours] = ppUseState('Integral');
  const toast = useToast();
  return (
    <div className="pm-push">
      <MobileHeader title="Disponibilidade" onBack={back} />
      <div className="pm-scroll pm-scroll--push">
        <div className="pm-toggle-card">
          <div><strong>Disponível para propostas</strong><span>Empresas veem seu perfil na busca</span></div>
          <button className={`pm-switch${on ? ' on' : ''}`} onClick={() => setOn(v => !v)}><i></i></button>
        </div>
        <div className="pm-block"><h4>Modelo de trabalho</h4><div className="pm-choice">{['Remoto', 'Híbrido', 'Presencial'].map(o => <Pill key={o} active={mode === o} onClick={() => setMode(o)}>{o}</Pill>)}</div></div>
        <div className="pm-block"><h4>Carga horária</h4><div className="pm-choice">{['Integral', 'Meio período', 'Projeto'].map(o => <Pill key={o} active={hours === o} onClick={() => setHours(o)}>{o}</Pill>)}</div></div>
        <Field label="A partir de quando?"><Select defaultValue="now"><option value="now">Imediatamente</option><option>Em 15 dias</option><option>Em 30 dias</option></Select></Field>
      </div>
      <div className="pm-bottombar"><Button block size="lg" onClick={() => { toast('Disponibilidade salva'); back(); }}>Salvar</Button></div>
    </div>
  );
}

// ---------- History + reviews received (pushed) ----------
function PmHistory({ back }) {
  const me = IG_PRO_ME;
  return (
    <div className="pm-push">
      <MobileHeader title="Histórico" onBack={back} />
      <div className="pm-scroll pm-scroll--push">
        <div className="pm-histsummary">
          <div className="pm-histsummary__big"><Stars value={me.rating} size={18}/><strong>{me.rating.toFixed(1)}</strong><span>{me.reviews} avaliações</span></div>
          <div className="pm-histsummary__grid">
            <div><strong>{me.projects}</strong><span>projetos concluídos</span></div>
            <div><strong>{me.contracts}</strong><span>contratações</span></div>
            <div><strong>{me.joined}</strong><span>na plataforma</span></div>
          </div>
        </div>
        <div className="pm-sec-head"><h3>Avaliações recebidas</h3></div>
        <div className="pm-revlist">
          {IG_PRO_REVIEWS.map((r, i) => (
            <div key={i} className="pm-revcard">
              <div className="pm-revcard__top"><Avatar initial={r.initial} color={r.color} size={40} radius={11}/><div className="pm-revcard__id"><strong>{r.from}</strong><span>{r.role}</span></div></div>
              <div className="pm-revcard__rate"><Stars value={r.rating} size={14}/><span>{r.when}</span></div>
              <p>"{r.text}"</p>
              <div className="pm-revcard__proj"><Icon.briefcase size={13}/> {r.project}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Review company (pushed) ----------
function PmReviewCompany({ back }) {
  const [rating, setRating] = ppUseState(5);
  const c = IG_PENDING_REVIEW.company;
  const toast = useToast();
  return (
    <div className="pm-push">
      <MobileHeader title="Avaliar empresa" onBack={back} />
      <div className="pm-scroll pm-scroll--push">
        <div className="pm-reviewco">
          <Avatar initial={c.initial} color={c.color} size={56} radius={14}/>
          <strong>{c.name}</strong>
          <span>{IG_PENDING_REVIEW.job} · {IG_PENDING_REVIEW.period}</span>
        </div>
        <div className="pm-rate">
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setRating(n)} className="pm-rate__btn"><Icon.star size={40} fill={n <= rating ? '#E8B23A' : 'none'} stroke={n <= rating ? '#E8B23A' : '#D6DEE2'} sw={1.5}/></button>
          ))}
        </div>
        <Field label="Como foi trabalhar com essa empresa?"><Textarea rows={4} placeholder="Processo, comunicação, clareza, pagamento…"/></Field>
        <div className="pm-block"><h4>Recomendaria a outros profissionais?</h4><div className="pm-choice">{['Com certeza', 'Sim', 'Talvez'].map((o, i) => <Pill key={o} active={i === 0}>{o}</Pill>)}</div></div>
      </div>
      <div className="pm-bottombar"><Button block size="lg" icon={<Icon.check size={17} sw={2.6}/>} onClick={() => { toast('Avaliação enviada', 'Obrigado por construir histórico real.'); back(); }}>Enviar avaliação</Button></div>
    </div>
  );
}

// ---------- Professional app shell ----------
function ProfessionalApp({ authMode, startAuthed, onExit }) {
  const [authed, setAuthed] = ppUseState(!!startAuthed);
  const [screen, setScreen] = ppUseState('home');
  const [param, setParam] = ppUseState(null);
  const [lastTab, setLastTab] = ppUseState('home');
  const [saved, setSaved] = ppUseState(() => new Set());
  const [applied, setApplied] = ppUseState(() => new Set(['o1', 'o2', 'o3']));
  const toast = useToast();

  const tabs = ['home', 'search', 'apps', 'profile'];
  const go = (name, p = null) => {
    if (name === 'logout') { onExit(); return; }
    if (tabs.includes(name)) setLastTab(name);
    setScreen(name); setParam(p);
  };
  const back = () => { setScreen(lastTab); setParam(null); };
  const toggleSave = id => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const apply = id => { setApplied(s => new Set(s).add(id)); toast('Candidatura enviada', 'A empresa foi notificada.'); };

  if (!authed) return <ProAuth mode={authMode} onAuthed={() => setAuthed(true)} onRole={onExit} />;

  const isTab = tabs.includes(screen);
  return (
    <div className="pm-app">
      <div className="pm-body">
        {screen === 'home' && <PmHome go={go} saved={saved} toggleSave={toggleSave} />}
        {screen === 'search' && <PmSearch go={go} saved={saved} toggleSave={toggleSave} />}
        {screen === 'apps' && <PmApps go={go} />}
        {screen === 'profile' && <PmProfile go={go} />}
        {screen === 'opp' && <PmOpp oppId={param} back={back} applied={applied} onApply={apply} />}
        {screen === 'editProfile' && <PmEditProfile back={back} />}
        {screen === 'availability' && <PmAvailability back={back} />}
        {screen === 'history' && <PmHistory back={back} />}
        {screen === 'reviewCompany' && <PmReviewCompany back={back} />}
      </div>
      {isTab && <BottomNav tab={screen} go={go} />}
    </div>
  );
}

Object.assign(window, { PmProfile, PmEditProfile, PmAvailability, PmHistory, PmReviewCompany, ProfessionalApp });
