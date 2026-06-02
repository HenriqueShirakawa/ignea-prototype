// ===== IGNEA — shared UI kit (icons + primitives) =====
// Relies on classes defined in the host HTML <style>. Exports to window.

// ---------- Icons (inline SVG, stroke = currentColor) ----------
const _ic = (paths, vb = '0 0 24 24') => ({ size = 20, fill = 'none', stroke = 'currentColor', sw = 2, style, className }) =>
<svg width={size} height={size} viewBox={vb} fill={fill} stroke={stroke} strokeWidth={sw}
strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>{paths}</svg>;


const Icon = {
  search: _ic(<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>),
  briefcase: _ic(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M3 13h18" /></>),
  users: _ic(<><circle cx="9" cy="8" r="3.5" /><path d="M3 20v-1a6 6 0 0112 0v1" /><path d="M16 5.2a3.5 3.5 0 010 6.6M21 20v-1a6 6 0 00-4-5.7" /></>),
  user: _ic(<><circle cx="12" cy="8" r="4" /><path d="M5 21v-1a7 7 0 0114 0v1" /></>),
  lock: _ic(<><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></>),
  unlock: _ic(<><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 017.5-2" /></>),
  star: _ic(<path d="M12 2l3 6.5 7 .6-5.3 4.6L18.4 21 12 17.3 5.6 21l1.7-7.3L2 9.1l7-.6z" />),
  check: _ic(<path d="M20 6L9 17l-5-5" />),
  checkCircle: _ic(<><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></>),
  plus: _ic(<><path d="M12 5v14M5 12h14" /></>),
  chevR: _ic(<path d="M9 6l6 6-6 6" />),
  chevL: _ic(<path d="M15 6l-6 6 6 6" />),
  chevD: _ic(<path d="M6 9l6 6 6-6" />),
  arrowR: _ic(<><path d="M5 12h14M13 6l6 6-6 6" /></>),
  arrowL: _ic(<><path d="M19 12H5M11 6l-6 6 6 6" /></>),
  building: _ic(<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6" /></>),
  pin: _ic(<><path d="M12 21s-7-5.7-7-11a7 7 0 0114 0c0 5.3-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  clock: _ic(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  money: _ic(<><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>),
  bell: _ic(<><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></>),
  settings: _ic(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1V21a2 2 0 11-4 0v-.1A1.6 1.6 0 006.8 19.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.6 1.6 0 003.1 14H3a2 2 0 110-4h.1a1.6 1.6 0 001.5-2.7l-.1-.1a2 2 0 112.8-2.8l.1.1A1.6 1.6 0 009 4.6V4a2 2 0 114 0v.1a1.6 1.6 0 002.7 1.5l.1-.1a2 2 0 112.8 2.8l-.1.1A1.6 1.6 0 0021 12h-.1" /></>),
  home: _ic(<><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>),
  grid: _ic(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>),
  file: _ic(<><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5" /></>),
  calendar: _ic(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>),
  edit: _ic(<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></>),
  eye: _ic(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>),
  phone: _ic(<><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.6a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" /></>),
  mail: _ic(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>),
  link: _ic(<><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1.5 1.5" /><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1.5-1.5" /></>),
  logout: _ic(<><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></>),
  sparkle: _ic(<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />),
  sliders: _ic(<><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0M16 18h2" /><circle cx="16" cy="6" r="2" /><circle cx="8" cy="12" r="2" /><circle cx="14" cy="18" r="2" /></>),
  bookmark: _ic(<path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />),
  x: _ic(<path d="M18 6L6 18M6 6l12 12" />),
  trending: _ic(<><path d="M3 17l6-6 4 4 7-7" /><path d="M17 7h4v4" /></>)
};

// ---------- Logo ----------
function Logo({ size = 30, withText = true, light = false, textSize = 19 }) {
  const ink = light ? '#FFFFFF' : '#2E424B';
  return (
    <span className="ig-brand" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
        <path d="M16.8 2.4c0 6.6 6.9 8.9 6.9 16.1a7.7 7.7 0 0 1-15.4 0c0-3.7 1.7-5.4 3.3-8.4.6 2.9 2.2 3.3 2.9 1.4 1.1-2.9 2.3-5 2.3-9.1Z" fill={ink} />
        <path d="M16.4 12.6c.1 3.5 3.4 4.2 3.4 7.4a3.8 3.8 0 0 1-7.6 0c0-1.9 1-2.8 1.9-4.3.8 1.6 2 1 2.3-3.1Z" fill={light ? '#C6DAE2' : '#4E86AA'} />
      </svg>
      {withText && <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: textSize, letterSpacing: '.04em', color: ink }}>IGNEA</span>}
    </span>);

}

// ---------- Button ----------
function Button({ children, variant = 'primary', size = 'md', block, icon, iconRight, onClick, type, className = '', style, disabled }) {
  const cls = ['ig-btn', `ig-btn--${variant}`, size !== 'md' && `ig-btn--${size}`, block && 'ig-btn--block', className].
  filter(Boolean).join(' ');
  return (
    <button type={type || 'button'} className={cls} style={style} onClick={onClick} disabled={disabled}>
      {icon && <span className="ig-btn__i">{icon}</span>}
      {children}
      {iconRight && <span className="ig-btn__i">{iconRight}</span>}
    </button>);

}

// ---------- Field / Input / Textarea / Select ----------
function Field({ label, children, hint, optional }) {
  return (
    <label className="ig-field">
      {label && <span className="ig-label">{label}{optional && <em className="ig-label__opt">opcional</em>}</span>}
      {children}
      {hint && <span className="ig-hint">{hint}</span>}
    </label>);

}
function Input({ icon, ...p }) {
  if (icon) return (
    <span className="ig-input-wrap">
      <span className="ig-input-icon">{icon}</span>
      <input className="ig-input ig-input--icon" {...p} />
    </span>);

  return <input className="ig-input" {...p} />;
}
function Textarea(p) {return <textarea className="ig-input ig-textarea" {...p} />;}
function Select({ children, ...p }) {
  return (
    <span className="ig-select-wrap">
      <select className="ig-input ig-select" {...p}>{children}</select>
      <span className="ig-select-chev"><Icon.chevD size={16} /></span>
    </span>);

}

// ---------- Badge / Pill ----------
function Badge({ children, tone = 'blue', dot, icon }) {
  return <span className={`ig-badge ig-badge--${tone}`}>{dot && <i className="ig-badge__dot" />}{icon}{children}</span>;
}
function Pill({ children, active, onClick, icon }) {
  return <button className={`ig-pill${active ? ' is-active' : ''}`} onClick={onClick}>{icon}{children}</button>;
}

// ---------- Avatar ----------
function Avatar({ initial, color = '#2E424B', size = 44, radius = 11, title }) {
  return (
    <span className="ig-avatar" title={title} style={{ width: size, height: size, borderRadius: radius, background: color, fontSize: size * 0.36 }}>
      {initial}
    </span>);

}

// ---------- Stars ----------
function Stars({ value = 5, size = 15, count, showValue }) {
  return (
    <span className="ig-stars" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ display: 'inline-flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map((n) =>
        <Icon.star key={n} size={size} fill={n <= Math.round(value) ? '#E8B23A' : 'none'} stroke={n <= Math.round(value) ? '#E8B23A' : '#D6DEE2'} sw={1.5} />
        )}
      </span>
      {showValue && <strong style={{ fontSize: size, color: '#2E424B', fontWeight: 600 }}>{value.toFixed(1)}</strong>}
      {count != null && <span style={{ fontSize: size - 1, color: '#6B7E86' }}>({count})</span>}
    </span>);

}

// ---------- Verified tag ----------
function Verified({ children = 'Verificado' }) {
  return <span className="ig-verified"><Icon.checkCircle size={13} sw={2.2} />{children}</span>;
}

// ---------- Card ----------
function Card({ children, className = '', hover, onClick, style }) {
  return <div className={`ig-card${hover ? ' ig-card--hover' : ''} ${className}`} onClick={onClick} style={style}>{children}</div>;
}

// ---------- Toast system ----------
const IGToastCtx = React.createContext(() => {});
function useToast() {return React.useContext(IGToastCtx);}
function ToastProvider({ children }) {
  const [items, setItems] = React.useState([]);
  const push = React.useCallback((title, msg, tone = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setItems((s) => [...s, { id, title, msg, tone }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3200);
  }, []);
  return (
    <IGToastCtx.Provider value={push}>
      {children}
      <div className="ig-toasts">
        {items.map((t) =>
        <div key={t.id} className="ig-toast">
            <span className={`ig-toast__i ig-toast__i--${t.tone}`}><Icon.check size={15} sw={2.6} /></span>
            <div><strong>{t.title}</strong>{t.msg && <span>{t.msg}</span>}</div>
          </div>
        )}
      </div>
    </IGToastCtx.Provider>);

}

Object.assign(window, {
  Icon, Logo, Button, Field, Input, Textarea, Select, Badge, Pill,
  Avatar, Stars, Verified, Card, ToastProvider, useToast
});