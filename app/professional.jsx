// ===== IGNEA — Professional app (mobile) =====
const { useState: pUseState } = React;

// ---------- Shells ----------
function MobileHeader({ title, big, sub, right, onBack }) {
  return (
    <header className={`pm-head${big ? ' pm-head--big' : ''}`}>
      <div className="pm-head__row">
        {onBack && <button className="pm-back" onClick={onBack}><Icon.chevL size={20}/></button>}
        <div className="pm-head__t">{big ? <h1>{title}</h1> : <h2>{title}</h2>}{sub && <p>{sub}</p>}</div>
        {right}
      </div>
    </header>
  );
}

function BottomNav({ tab, go }) {
  const items = [
    { id: 'home', label: 'Início', icon: Icon.home },
    { id: 'search', label: 'Vagas', icon: Icon.search },
    { id: 'apps', label: 'Candidaturas', icon: Icon.file },
    { id: 'profile', label: 'Perfil', icon: Icon.user },
  ];
  return (
    <nav className="pm-tabs">
      {items.map(it => {
        const I = it.icon;
        const active = tab === it.id;
        return (
          <button key={it.id} className={`pm-tab${active ? ' is-active' : ''}`} onClick={() => go(it.id)}>
            <I size={22} sw={active ? 2.3 : 2}/>
            <span>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ---------- Opportunity card ----------
function OppCard({ o, onOpen, saved, onSave }) {
  return (
    <div className="pm-opp" onClick={onOpen}>
      <div className="pm-opp__top">
        <Avatar initial={o.initial} color={o.color} size={44} radius={12}/>
        <div className="pm-opp__co"><strong>{o.company}</strong><span><Icon.star size={11} fill="#E8B23A" stroke="#E8B23A" sw={1}/> {o.rating} · {o.posted}</span></div>
        <button className={`pm-save${saved ? ' is-saved' : ''}`} onClick={e => { e.stopPropagation(); onSave(); }}><Icon.bookmark size={18} fill={saved ? '#4E86AA' : 'none'}/></button>
      </div>
      <h3 className="pm-opp__title">{o.title}</h3>
      <div className="pm-opp__tags"><span className="pm-tag">{o.mode}</span><span className="pm-tag">{o.type}</span></div>
      <div className="pm-opp__foot">
        <span className="pm-opp__pay"><Icon.money size={14}/> {o.range}</span>
        <span className="pm-match"><Icon.sparkle size={12}/> {o.match}%</span>
      </div>
    </div>
  );
}

// ---------- Home ----------
function PmHome({ go, saved, toggleSave }) {
  const top = [...IG_OPPS].sort((a, b) => b.match - a.match);
  return (
    <>
      <MobileHeader big title={`Olá, ${IG_PRO_ME.name.split(' ')[0]}`} sub="3 oportunidades com alto match para você"
        right={<Avatar initial={IG_PRO_ME.initial} color={IG_PRO_ME.color} size={40}/>} />
      <div className="pm-scroll">
        <div className="pm-availcard" onClick={() => go('availability')}>
          <span className={`pm-avail-dot${IG_PRO_ME.available ? ' on' : ''}`}></span>
          <div><strong>{IG_PRO_ME.available ? 'Disponível para propostas' : 'Indisponível'}</strong><span>Toque para ajustar sua disponibilidade</span></div>
          <Icon.chevR size={18}/>
        </div>

        <div className="pm-sec-head"><h3>Melhor match</h3><button onClick={() => go('search')} className="pm-link">Ver tudo</button></div>
        <div className="pm-feature" onClick={() => go('opp', top[0].id)}>
          <div className="pm-feature__top"><Avatar initial={top[0].initial} color={top[0].color} size={42} radius={12}/><span className="pm-match pm-match--lg"><Icon.sparkle size={13}/> {top[0].match}% match</span></div>
          <h3>{top[0].title}</h3>
          <p>{top[0].company}</p>
          <div className="pm-opp__tags"><span className="pm-tag">{top[0].mode}</span><span className="pm-tag">{top[0].range}</span></div>
        </div>

        <div className="pm-sec-head"><h3>Recomendadas</h3></div>
        <div className="pm-opplist">
          {top.slice(1).map(o => <OppCard key={o.id} o={o} onOpen={() => go('opp', o.id)} saved={saved.has(o.id)} onSave={() => toggleSave(o.id)} />)}
        </div>
      </div>
    </>
  );
}

// ---------- Search ----------
function PmSearch({ go, saved, toggleSave }) {
  const [q, setQ] = pUseState('');
  const [f, setF] = pUseState('Todas');
  const filters = ['Todas', 'Remoto', 'Design', 'Engenharia', 'Integral'];
  const list = IG_OPPS.filter(o => {
    const okQ = !q || (o.title + o.company + o.area).toLowerCase().includes(q.toLowerCase());
    const okF = f === 'Todas' || o.mode === f || o.area === f || (f === 'Integral' && o.type.includes('Integral'));
    return okQ && okF;
  });
  return (
    <>
      <MobileHeader title="Oportunidades" big />
      <div className="pm-searchwrap">
        <Input icon={<Icon.search size={18}/>} placeholder="Cargo, empresa ou habilidade" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="pm-filters">{filters.map(x => <Pill key={x} active={f === x} onClick={() => setF(x)}>{x}</Pill>)}</div>
      <div className="pm-scroll pm-scroll--list">
        <div className="pm-count">{list.length} vagas encontradas</div>
        <div className="pm-opplist">
          {list.map(o => <OppCard key={o.id} o={o} onOpen={() => go('opp', o.id)} saved={saved.has(o.id)} onSave={() => toggleSave(o.id)} />)}
        </div>
      </div>
    </>
  );
}

// ---------- Opportunity detail + apply (pushed) ----------
function PmOpp({ oppId, back, applied, onApply }) {
  const o = IG_OPPS.find(x => x.id === oppId) || IG_OPPS[0];
  const isApplied = applied.has(o.id);
  return (
    <div className="pm-push">
      <MobileHeader title={o.company} onBack={back} right={<button className="pm-save"><Icon.bookmark size={18}/></button>} />
      <div className="pm-scroll pm-scroll--push">
        <div className="pm-oppdetail__hero">
          <Avatar initial={o.initial} color={o.color} size={60} radius={16}/>
          <span className="pm-match pm-match--lg"><Icon.sparkle size={13}/> {o.match}% match</span>
        </div>
        <h1 className="pm-oppdetail__title">{o.title}</h1>
        <div className="pm-oppdetail__co"><strong>{o.company}</strong> · <Stars value={o.rating} size={12} showValue/></div>
        <div className="pm-oppdetail__chips">
          <div className="pm-chip"><Icon.pin size={15}/><span>{o.location}</span></div>
          <div className="pm-chip"><Icon.money size={15}/><span>{o.range}</span></div>
          <div className="pm-chip"><Icon.clock size={15}/><span>{o.type}</span></div>
          <div className="pm-chip"><Icon.briefcase size={15}/><span>{o.mode}</span></div>
        </div>
        <div className="pm-block"><h4>Sobre a vaga</h4><p>{o.desc}</p></div>
        <div className="pm-block"><h4>Requisitos</h4><ul className="pm-reqs">{o.reqs.map((r, i) => <li key={i}><Icon.check size={15} sw={2.4}/> {r}</li>)}</ul></div>
        <div className="pm-block pm-trust"><Icon.checkCircle size={18}/><div><strong>Empresa verificada</strong><span>{o.rating} de avaliação dos profissionais</span></div></div>
      </div>
      <div className="pm-bottombar">
        {isApplied
          ? <Button block variant="success" size="lg" icon={<Icon.check size={17} sw={2.6}/>}>Candidatura enviada</Button>
          : <Button block size="lg" onClick={() => onApply(o.id)}>Candidatar-se</Button>}
      </div>
    </div>
  );
}

// ---------- Applications ----------
function PmApps({ go }) {
  return (
    <>
      <MobileHeader title="Candidaturas" big sub="Acompanhe o status de cada vaga" />
      <div className="pm-scroll pm-scroll--list">
        {IG_APPLICATIONS.map(a => {
          const o = IG_OPPS.find(x => x.id === a.oppId);
          return (
            <div key={a.id} className="pm-appcard" onClick={() => go('opp', a.oppId)}>
              <div className="pm-appcard__top">
                <Avatar initial={o.initial} color={o.color} size={42} radius={11}/>
                <div className="pm-appcard__id"><strong>{o.title}</strong><span>{o.company} · {a.appliedAt}</span></div>
                <Badge tone={a.status === 'Entrevista' ? 'green' : a.status === 'Em análise' ? 'blue' : 'muted'}>{a.status}</Badge>
              </div>
              <div className="pm-stepper">
                {IG_APP_STEPS.map((s, i) => (
                  <div key={i} className={`pm-step${i <= a.step ? ' done' : ''}${i === a.step ? ' cur' : ''}`}>
                    <i></i><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

Object.assign(window, { MobileHeader, BottomNav, OppCard, PmHome, PmSearch, PmOpp, PmApps });
