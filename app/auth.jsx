// ===== IGNEA — Auth & Onboarding =====
const { useState } = React;

// ---------- Welcome / role selection (full canvas) ----------
function Welcome({ onEnter }) {
  return (
    <div className="ig-welcome">
      <div className="ig-welcome__bg" aria-hidden="true"></div>
      <header className="ig-welcome__top">
        <Logo size={32} textSize={20} />
        <button className="ig-btn ig-btn--ghost ig-btn--sm" onClick={() => onEnter('professional', 'login')}>Entrar</button>
      </header>

      <main className="ig-welcome__main">
        <span className="ig-eyebrow"><i className="ig-eyebrow__dot"></i> Avaliações verificadas dos dois lados</span>
        <h1 className="ig-welcome__h1">Bem-vindo à <span className="ig-accent">IGNEA</span>.<br/>Como você quer começar?</h1>
        <p className="ig-welcome__sub">Um marketplace entre empresas e profissionais, construído sobre oportunidades reais e histórico comprovado.</p>

        <div className="ig-role-grid">
          <button className="ig-role-card" onClick={() => onEnter('company', 'signup')}>
            <span className="ig-role-card__ic" style={{ background: 'rgba(46,66,75,.07)', color: '#2E424B' }}><Icon.building size={26}/></span>
            <h3>Sou uma empresa</h3>
            <p>Publique vagas, encontre profissionais com histórico real e desbloqueie contatos quando decidir.</p>
            <span className="ig-role-card__go">Criar conta empresarial <Icon.arrowR size={17}/></span>
            <span className="ig-role-card__tag">Desktop</span>
          </button>

          <button className="ig-role-card ig-role-card--pro" onClick={() => onEnter('professional', 'signup')}>
            <span className="ig-role-card__ic" style={{ background: 'rgba(78,134,170,.1)', color: '#4E86AA' }}><Icon.user size={26}/></span>
            <h3>Sou um profissional</h3>
            <p>Monte seu perfil, candidate-se a oportunidades reais e construa um histórico que fala por você.</p>
            <span className="ig-role-card__go">Criar perfil profissional <Icon.arrowR size={17}/></span>
            <span className="ig-role-card__tag">Mobile</span>
          </button>
        </div>
      </main>
    </div>
  );
}

// ---------- Shared auth form bits ----------
function AuthSocial({ light }) {
  return (
    <div className="ig-auth-social">
      <button className="ig-btn ig-btn--ghost ig-btn--block"><span className="ig-gmark">G</span> Continuar com Google</button>
      <div className="ig-auth-or"><span>ou com e-mail</span></div>
    </div>
  );
}

// ---------- Company auth (desktop split) ----------
function CompanyAuth({ mode = 'signup', onAuthed, onSwitch, onRole }) {
  const [m, setM] = useState(mode);
  const signup = m === 'signup';
  return (
    <div className="ig-auth-split">
      <aside className="ig-auth-aside">
        <div className="ig-auth-aside__top"><Logo size={30} light textSize={19}/></div>
        <div className="ig-auth-aside__body">
          <h2>Contrate com base em<br/>histórico, não em achismo.</h2>
          <ul className="ig-auth-points">
            <li><Icon.check size={16} sw={2.4}/> Profissionais com avaliações verificadas</li>
            <li><Icon.check size={16} sw={2.4}/> Contatos protegidos até você decidir</li>
            <li><Icon.check size={16} sw={2.4}/> Publicação de vagas em minutos</li>
          </ul>
          <div className="ig-auth-quote">
            <Stars value={5} size={14}/>
            <p>"Reduzimos pela metade o tempo de contratação. O histórico real muda tudo."</p>
            <span>— Rafael Torres, Head de Engenharia · Nuvex</span>
          </div>
        </div>
        <button className="ig-auth-aside__role" onClick={onRole}><Icon.arrowL size={15}/> É um profissional? Comece por aqui</button>
      </aside>

      <section className="ig-auth-form">
        <div className="ig-auth-form__inner">
          <h1>{signup ? 'Criar conta empresarial' : 'Entrar na sua conta'}</h1>
          <p className="ig-auth-form__sub">{signup ? 'Leva menos de 2 minutos para publicar sua primeira vaga.' : 'Bom te ver de novo.'}</p>
          <AuthSocial />
          <form onSubmit={e => { e.preventDefault(); onAuthed(); }}>
            {signup && <Field label="Nome da empresa"><Input placeholder="Ex.: Nuvex Tecnologia" defaultValue="Nuvex Tecnologia"/></Field>}
            <Field label="E-mail de trabalho"><Input type="email" placeholder="voce@empresa.com" defaultValue="contato@nuvex.com" icon={<Icon.mail size={17}/>}/></Field>
            <Field label="Senha"><Input type="password" placeholder="••••••••" defaultValue="123456" icon={<Icon.lock size={17}/>}/></Field>
            {signup && (
              <div className="ig-auth-grid2">
                <Field label="Setor"><Select defaultValue="tec"><option value="tec">Tecnologia</option><option>Design & Produto</option><option>Fintech</option><option>Outro</option></Select></Field>
                <Field label="Tamanho"><Select defaultValue="50"><option value="50">50–200</option><option>1–10</option><option>11–50</option><option>200+</option></Select></Field>
              </div>
            )}
            <Button type="submit" block size="lg">{signup ? 'Criar conta' : 'Entrar'}</Button>
          </form>
          <p className="ig-auth-switch">
            {signup ? 'Já tem conta?' : 'Ainda não tem conta?'}{' '}
            <button onClick={() => setM(signup ? 'login' : 'signup')}>{signup ? 'Entrar' : 'Criar conta'}</button>
          </p>
        </div>
      </section>
    </div>
  );
}

// ---------- Professional auth (mobile) ----------
function ProAuth({ mode = 'signup', onAuthed, onRole }) {
  const [m, setM] = useState(mode);
  const signup = m === 'signup';
  return (
    <div className="pro-auth">
      <div className="pro-auth__top">
        <Logo size={30} textSize={19}/>
      </div>
      <div className="pro-auth__hero">
        <h1>{signup ? 'Crie seu perfil profissional' : 'Entrar'}</h1>
        <p>{signup ? 'Candidate-se a oportunidades reais e construa seu histórico.' : 'Que bom te ver de novo.'}</p>
      </div>
      <div className="pro-auth__card">
        <AuthSocial />
        <form onSubmit={e => { e.preventDefault(); onAuthed(); }}>
          {signup && <Field label="Nome completo"><Input placeholder="Seu nome" defaultValue="Camila Moraes"/></Field>}
          <Field label="E-mail"><Input type="email" placeholder="voce@email.com" defaultValue="camila@email.com" icon={<Icon.mail size={17}/>}/></Field>
          <Field label="Senha"><Input type="password" placeholder="••••••••" defaultValue="123456" icon={<Icon.lock size={17}/>}/></Field>
          {signup && <Field label="Área principal"><Select defaultValue="design"><option value="design">Design & Produto</option><option>Engenharia</option><option>Dados</option><option>Outra</option></Select></Field>}
          <Button type="submit" block size="lg">{signup ? 'Criar perfil' : 'Entrar'}</Button>
        </form>
      </div>
      <div className="pro-auth__foot">
        <p>{signup ? 'Já tem conta?' : 'Ainda não tem conta?'} <button onClick={() => setM(signup ? 'login' : 'signup')}>{signup ? 'Entrar' : 'Criar perfil'}</button></p>
        <button className="pro-auth__role" onClick={onRole}>É uma empresa? Acesse pelo computador</button>
      </div>
    </div>
  );
}

Object.assign(window, { Welcome, CompanyAuth, ProAuth });
