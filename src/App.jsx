import { useState, useRef, useEffect } from "react";

/* ─── TOKENS ──────────────────────────────────────────────────────────────── */
const C = {
  primary:"#1756A9", primaryDark:"#0F3F7A", primaryLight:"#EBF3FF",
  accent:"#3EA8F5", success:"#1D9E75", successLight:"#E0F5EC",
  warning:"#F59E0B", warningLight:"#FFFBEB",
  danger:"#DC2626", dangerLight:"#FCEAEA",
  text:"#0F1923", textMuted:"#5A6A80", textLight:"#9AA5B4",
  border:"#DDE3ED", bg:"#F4F7FB", surface:"#FFFFFF",
};

/* ─── LOGO SVG ─────────────────────────────────────────────────────────────── */
const Logo = ({ size = 32, withText = true }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M40 8 C40 8 60 18 60 38 C60 52 52 62 40 68 C28 62 20 52 20 38 C20 18 40 8 40 8Z" fill={C.primary}/>
      <path d="M40 8 L52 28 L44 26 L44 48 L36 48 L36 26 L28 28 Z" fill="white"/>
      <circle cx="56" cy="58" r="10" fill={C.accent}/>
      <path d="M52 58 L56 54 L60 58 L56 62 Z" fill="white"/>
    </svg>
    {withText && (
      <span style={{ fontSize: size * 0.56, fontWeight:900, letterSpacing:-0.5, fontFamily:"Georgia, serif",
        background:`linear-gradient(135deg, ${C.primary}, ${C.accent})`,
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        Your<span style={{ fontStyle:"italic" }}>Best</span>
      </span>
    )}
  </div>
);

/* ─── SHARED UI ────────────────────────────────────────────────────────────── */
const Btn = ({ children, onClick, variant="primary", style={} }) => {
  const base = { border:"none", borderRadius:12, padding:"12px 20px", fontSize:14,
    fontWeight:700, cursor:"pointer", transition:"all .15s", ...style };
  const vars = {
    primary:{ background:C.primary, color:"#fff" },
    outline:{ background:"transparent", color:C.primary, border:`1.5px solid ${C.primary}` },
    ghost:{ background:"transparent", color:C.primary, padding:"6px 0", textDecoration:"underline" },
  };
  return <button onClick={onClick} style={{ ...base, ...vars[variant] }}>{children}</button>;
};

const Badge = ({ children, color="blue" }) => {
  const m = { blue:{bg:C.primaryLight,c:C.primary}, green:{bg:C.successLight,c:C.success},
    orange:{bg:C.warningLight,c:"#92400E"}, red:{bg:C.dangerLight,c:C.danger} };
  const s = m[color]||m.blue;
  return <span style={{ background:s.bg, color:s.c, fontSize:11, fontWeight:700,
    padding:"2px 9px", borderRadius:20 }}>{children}</span>;
};

const ProgressBar = ({ value=0, color=C.primary, h=6 }) => (
  <div style={{ height:h, borderRadius:h, background:C.border, overflow:"hidden" }}>
    <div style={{ width:`${value}%`, height:"100%", borderRadius:h, background:color, transition:"width .4s" }}/>
  </div>
);

const StatCard = ({ label, value, sub, color=C.primary }) => (
  <div style={{ flex:1, background:C.surface, border:`1px solid ${C.border}`, borderRadius:12,
    padding:"12px 14px", textAlign:"center" }}>
    <div style={{ fontSize:22, fontWeight:900, color }}>{value}</div>
    {sub && <div style={{ fontSize:10, color:C.textMuted }}>{sub}</div>}
    <div style={{ fontSize:11, color:C.textMuted, marginTop:2 }}>{label}</div>
  </div>
);

const HintBox = ({ children, color=C.warning }) => (
  <div style={{ background:C.warningLight, borderLeft:`3px solid ${color}`,
    borderRadius:"0 8px 8px 0", padding:"9px 13px", fontSize:12,
    color:"#78350F", marginBottom:12, lineHeight:1.55 }}>{children}</div>
);

const Input = ({ label, type="text", placeholder, value, onChange }) => (
  <div style={{ marginBottom:12 }}>
    {label && <label style={{ fontSize:12, fontWeight:600, color:C.textMuted,
      display:"block", marginBottom:4 }}>{label}</label>}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10,
        padding:"10px 13px", fontSize:14, color:C.text, background:C.surface,
        outline:"none", boxSizing:"border-box" }}
      onFocus={e=>e.target.style.borderColor=C.primary}
      onBlur={e=>e.target.style.borderColor=C.border} />
  </div>
);

const Select = ({ label, options=[] }) => (
  <div style={{ marginBottom:12 }}>
    {label && <label style={{ fontSize:12, fontWeight:600, color:C.textMuted,
      display:"block", marginBottom:4 }}>{label}</label>}
    <select style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10,
      padding:"10px 13px", fontSize:14, color:C.text, background:C.surface,
      outline:"none", boxSizing:"border-box", appearance:"none" }}>
      {options.map((o,i)=><option key={i}>{o}</option>)}
    </select>
  </div>
);

const UploadBox = ({ label="Carica documento" }) => (
  <div style={{ border:`2px dashed #C0D4EE`, borderRadius:12, padding:"18px 12px",
    textAlign:"center", background:"#F5F9FF", cursor:"pointer", marginBottom:12 }}
    onMouseEnter={e=>e.currentTarget.style.borderColor=C.primary}
    onMouseLeave={e=>e.currentTarget.style.borderColor="#C0D4EE"}>
    <div style={{ fontSize:26, marginBottom:4 }}>📎</div>
    <div style={{ fontSize:13, color:C.textMuted }}>
      <span style={{ color:C.primary, fontWeight:700 }}>{label}</span><br/>
      <span style={{ fontSize:11, color:C.textLight }}>PDF, JPG, PNG — max 5MB</span>
    </div>
  </div>
);

const ChatBubble = ({ from="ai", children }) => (
  <div style={{ maxWidth:"82%", padding:"10px 14px",
    borderRadius: from==="ai"?"16px 16px 16px 4px":"16px 16px 4px 16px",
    background: from==="ai"?C.primaryLight:C.primary,
    color: from==="ai"?C.text:"#fff",
    fontSize:13, lineHeight:1.55,
    alignSelf: from==="ai"?"flex-start":"flex-end", marginBottom:2 }}>
    {from==="ai" && <div style={{ fontSize:10, fontWeight:800, color:C.primary,
      marginBottom:3, letterSpacing:"0.06em" }}>YOUR BEST</div>}
    {children}
  </div>
);

const MiniChat = ({ placeholder="Chiedi qualcosa...", messages=[], compact=false }) => {
  const [msgs, setMsgs] = useState(messages);
  const [val, setVal] = useState("");
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs]);

  const send = () => {
    if (!val.trim()) return;
    const userMsg = { from:"user", text:val };
    const aiMsg = { from:"ai", text:"Ottima domanda! Sto elaborando una risposta basata sul materiale del docente..." };
    setMsgs(m=>[...m, userMsg, aiMsg]);
    setVal("");
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", minHeight: compact?200:320 }}>
      <div style={{ flex:1, overflowY:"auto", padding:"10px 12px", display:"flex",
        flexDirection:"column", gap:6 }}>
        {msgs.map((m,i)=><ChatBubble key={i} from={m.from}>{m.text}</ChatBubble>)}
        <div ref={endRef}/>
      </div>
      <div style={{ display:"flex", gap:8, padding:"8px 10px",
        borderTop:`1px solid ${C.border}`, background:C.surface }}>
        <input value={val} onChange={e=>setVal(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder={placeholder}
          style={{ flex:1, border:`1.5px solid ${C.border}`, borderRadius:20,
            padding:"8px 13px", fontSize:13, outline:"none" }}
          onFocus={e=>e.target.style.borderColor=C.primary}
          onBlur={e=>e.target.style.borderColor=C.border}/>
        <button onClick={send} style={{ width:34, height:34, borderRadius:"50%",
          background:C.primary, border:"none", color:"#fff",
          fontSize:15, cursor:"pointer", flexShrink:0 }}>↑</button>
      </div>
    </div>
  );
};

/* ─── FORMULA INPUT (for math/physics exercises) ──────────────────────────── */
const FormulaBar = () => {
  const [tex, setTex] = useState("");
  const symbols = ["x²","√","∫","π","±","≤","≥","∞","Δ","α","β","θ","∑","∈","⁻¹"];
  return (
    <div style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:12,
      padding:"10px 12px", marginBottom:10 }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.textMuted, marginBottom:8,
        letterSpacing:"0.06em" }}>INSERIMENTO FORMULA</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:8 }}>
        {symbols.map(s=>(
          <button key={s} onClick={()=>setTex(t=>t+s)}
            style={{ padding:"4px 9px", borderRadius:7, border:`1px solid ${C.border}`,
              background:C.surface, color:C.primary, fontSize:13, fontWeight:700,
              cursor:"pointer", fontFamily:"Georgia, serif" }}>{s}</button>
        ))}
      </div>
      <input value={tex} onChange={e=>setTex(e.target.value)}
        placeholder="Scrivi o usa i simboli sopra: es. x = (-b ± √Δ) / 2a"
        style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:9,
          padding:"9px 12px", fontSize:14, fontFamily:"Georgia, serif",
          outline:"none", boxSizing:"border-box", color:C.text }}
        onFocus={e=>e.target.style.borderColor=C.primary}
        onBlur={e=>e.target.style.borderColor=C.border}/>
      {tex && (
        <div style={{ marginTop:8, padding:"8px 12px", background:C.primaryLight,
          borderRadius:8, fontSize:14, fontFamily:"Georgia, serif", color:C.primaryDark }}>
          ƒ(x) = {tex}
        </div>
      )}
      <div style={{ display:"flex", gap:6, marginTop:8 }}>
        <button style={{ fontSize:12, padding:"5px 12px", borderRadius:8, border:`1px solid ${C.border}`,
          background:C.surface, color:C.textMuted, cursor:"pointer" }}>📊 Inserisci grafico</button>
        <button style={{ fontSize:12, padding:"5px 12px", borderRadius:8, border:`1px solid ${C.border}`,
          background:C.surface, color:C.textMuted, cursor:"pointer" }}>📷 Fotografa foglio</button>
        <button onClick={()=>setTex("")}
          style={{ fontSize:12, padding:"5px 12px", borderRadius:8, border:"none",
            background:"transparent", color:C.danger, cursor:"pointer" }}>✕ Cancella</button>
      </div>
    </div>
  );
};

/* ─── TOP NAV (post-login, replaces sidebar on all views) ─────────────────── */
const TopNav = ({ screen, goTo, subject, isMobile }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const subjectScreens = ["topic","dashboard","study","exercise","review","verify"];
  const inSubject = subjectScreens.includes(screen);

  const phases = [
    { id:"study", label:"Studio", icon:"📚" },
    { id:"exercise", label:"Esercizi", icon:"✏️" },
    { id:"review", label:"Ripasso", icon:"🔁" },
    { id:"verify", label:"Verifica", icon:"✅" },
  ];

  return (
    <div style={{ background:C.primary, flexShrink:0, position:"sticky", top:0, zIndex:100 }}>
      {/* Main bar */}
      <div style={{ display:"flex", alignItems:"center", padding:"10px 20px", gap:12 }}>
        <Logo size={28} withText={!isMobile}/>
        <div style={{ flex:1 }}/>
        {inSubject && (
          <button onClick={()=>goTo("subject")}
            style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff",
              borderRadius:20, padding:"5px 13px", fontSize:12, fontWeight:600, cursor:"pointer",
              display:"flex", alignItems:"center", gap:6 }}>
            ← {isMobile?"Materie":"Cambia materia"}
          </button>
        )}
        <div style={{ width:32, height:32, borderRadius:"50%",
          background:"rgba(255,255,255,0.15)", display:"flex",
          alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16 }}>🔔</div>
        <div style={{ width:32, height:32, borderRadius:"50%",
          background:"rgba(255,255,255,0.2)", display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:C.primary,
          background:C.primaryLight, cursor:"pointer" }}>MR</div>
      </div>

      {/* Subject + phase tabs (only when inside a subject) */}
      {inSubject && (
        <div style={{ display:"flex", alignItems:"center", gap:0,
          borderTop:"1px solid rgba(255,255,255,0.12)", overflowX:"auto" }}>
          {phases.map(p=>(
            <button key={p.id} onClick={()=>goTo(p.id)}
              style={{ flex:"0 0 auto", padding:"9px 20px", border:"none", fontSize:12,
                fontWeight: screen===p.id?700:500,
                color: screen===p.id?"#fff":"rgba(255,255,255,0.62)",
                background: screen===p.id?"rgba(255,255,255,0.18)":"transparent",
                cursor:"pointer", borderBottom: screen===p.id?"2px solid #fff":"2px solid transparent",
                transition:"all .15s", whiteSpace:"nowrap" }}>
              {p.icon} {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── MOBILE BOTTOM NAV (only mobile, only home/subject screens) ──────────── */
const BottomNav = ({ screen }) => {
  const tabs = [["🏠","Home"],["📊","Progressi"],["🔔","Notifiche"],["👤","Profilo"]];
  return (
    <div style={{ background:C.surface, borderTop:`1px solid ${C.border}`,
      display:"flex", padding:"6px 0 2px", flexShrink:0 }}>
      {tabs.map(([icon,label],i)=>(
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column",
          alignItems:"center", gap:2, cursor:"pointer", padding:"4px 0" }}>
          <span style={{ fontSize:18 }}>{icon}</span>
          <span style={{ fontSize:10, color:i===0?C.primary:C.textMuted,
            fontWeight:i===0?700:400 }}>{label}</span>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/* SCREENS                                                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */

/* LOGIN */
const LoginScreen = ({ goTo }) => (
  <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh",
    background:`linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)` }}>
    <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
      padding:"20px" }}>
      <div style={{ background:C.surface, borderRadius:20, padding:"36px 32px",
        width:"100%", maxWidth:400, boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <Logo size={48} withText={false}/>
          <div style={{ marginTop:12 }}>
            <Logo size={36} withText/>
          </div>
          <p style={{ fontSize:13, color:C.textMuted, marginTop:6 }}>
            La piattaforma che trasforma il tuo modo di studiare
          </p>
        </div>
        <Input label="Email" type="email" placeholder="tuaemail@scuola.it"/>
        <Input label="Password" type="password" placeholder="••••••••"/>
        <div style={{ textAlign:"right", marginBottom:18 }}>
          <Btn variant="ghost" style={{ fontSize:12 }}>Password dimenticata?</Btn>
        </div>
        <Btn onClick={()=>goTo("subject")} style={{ width:"100%" }}>Accedi →</Btn>
        <div style={{ textAlign:"center", marginTop:14, fontSize:13, color:C.textMuted }}>
          Non hai un account?{" "}
          <button onClick={()=>goTo("register")}
            style={{ background:"none", border:"none", color:C.primary,
              fontWeight:700, cursor:"pointer", fontSize:13 }}>Registrati</button>
        </div>
      </div>
    </div>
  </div>
);

/* REGISTER */
const RegisterScreen = ({ goTo }) => {
  const [role, setRole] = useState("student");
  const roles = [
    { id:"student", icon:"🎓", label:"Studente" },
    { id:"teacher", icon:"👩‍🏫", label:"Docente" },
    { id:"school", icon:"🏫", label:"Istituto" },
  ];
  return (
    <div style={{ minHeight:"100vh", background:C.bg }}>
      {/* Top bar with logo */}
      <div style={{ background:C.primary, padding:"14px 24px",
        display:"flex", alignItems:"center", gap:16 }}>
        <button onClick={()=>goTo("login")}
          style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff",
            borderRadius:20, padding:"5px 12px", fontSize:12, cursor:"pointer" }}>← Indietro</button>
        <Logo size={26}/>
      </div>

      <div style={{ maxWidth:640, margin:"0 auto", padding:"28px 20px" }}>
        <h2 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:4 }}>Crea il tuo account</h2>
        <p style={{ fontSize:13, color:C.textMuted, marginBottom:24 }}>Compila tutti i campi per completare la registrazione.</p>

        {/* Role */}
        <div style={{ background:C.surface, borderRadius:14, padding:"18px 20px",
          border:`1px solid ${C.border}`, marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.textMuted,
            letterSpacing:"0.06em", marginBottom:12 }}>SELEZIONA RUOLO</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            {roles.map(r=>(
              <div key={r.id} onClick={()=>setRole(r.id)} style={{
                border:`2px solid ${role===r.id?C.primary:C.border}`,
                background:role===r.id?C.primaryLight:C.surface,
                borderRadius:12, padding:"14px 8px", textAlign:"center", cursor:"pointer",
                transition:"all .15s" }}>
                <div style={{ fontSize:26, marginBottom:5 }}>{r.icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Anagrafica */}
        <div style={{ background:C.surface, borderRadius:14, padding:"18px 20px",
          border:`1px solid ${C.border}`, marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.textMuted,
            letterSpacing:"0.06em", marginBottom:12 }}>DATI ANAGRAFICI</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Input label="Nome" placeholder="Marco"/>
            <Input label="Cognome" placeholder="Rossi"/>
            <Input label="Data di nascita" type="date"/>
            <Select label="Sesso" options={["M","F","Altro"]}/>
          </div>
          <Input label="Codice fiscale" placeholder="RSSMRC05A01H501Z"/>
        </div>

        {/* Scolastici */}
        <div style={{ background:C.surface, borderRadius:14, padding:"18px 20px",
          border:`1px solid ${C.border}`, marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.textMuted,
            letterSpacing:"0.06em", marginBottom:12 }}>DATI SCOLASTICI</div>
          <Select label="Istituto di appartenenza"
            options={["Seleziona istituto...","Liceo Scientifico A. Einstein","Ist. Tecnico G. Marconi"]}/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Select label="Classe" options={["3A","3B","4A","5A"]}/>
            <Select label="Anno scolastico" options={["2025/26","2026/27"]}/>
          </div>
          <HintBox>⚠️ Sei minorenne? Il genitore/tutore dovrà completare la sezione successiva con i propri dati.</HintBox>
        </div>

        {/* Documenti */}
        <div style={{ background:C.surface, borderRadius:14, padding:"18px 20px",
          border:`1px solid ${C.border}`, marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.textMuted,
            letterSpacing:"0.06em", marginBottom:12 }}>DOCUMENTI E CONSENSI</div>
          <UploadBox label="Carica consenso genitori / documento identità"/>
          <label style={{ display:"flex", alignItems:"flex-start", gap:8,
            fontSize:12, color:C.textMuted, marginBottom:8, cursor:"pointer" }}>
            <input type="checkbox" style={{ marginTop:2, flexShrink:0 }}/>
            Accetto i Termini di servizio e la Privacy Policy di Your Best
          </label>
          <label style={{ display:"flex", alignItems:"flex-start", gap:8,
            fontSize:12, color:C.textMuted, cursor:"pointer" }}>
            <input type="checkbox" style={{ marginTop:2, flexShrink:0 }}/>
            Autorizzo il trattamento dei dati per finalità didattiche (GDPR art. 6)
          </label>
        </div>

        <Btn onClick={()=>goTo("subject")} style={{ width:"100%", padding:"14px" }}>
          Completa registrazione →
        </Btn>
      </div>
    </div>
  );
};

/* HOME / MATERIE */
const SubjectScreen = ({ goTo, isMobile }) => {
  const subjects = [
    { icon:"📐", name:"Matematica", teacher:"Prof. Bianchi", topics:6, progress:60, color:C.primary },
    { icon:"⚗️", name:"Fisica", teacher:"Prof.ssa Verdi", topics:4, progress:35, color:"#7C3AED" },
    { icon:"📖", name:"Italiano", teacher:"Prof.ssa Neri", topics:5, progress:80, color:C.success },
    { icon:"🌍", name:"Storia", teacher:"Prof. Conti", topics:3, progress:20, color:C.warning },
  ];
  return (
    <div style={{ flex:1, overflowY:"auto", padding:"20px 20px" }}>
      {/* Stats with clear labels */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.textMuted,
          letterSpacing:"0.06em", marginBottom:8 }}>I TUOI PROGRESSI OGGI</div>
        <div style={{ display:"flex", gap:10 }}>
          <StatCard value="3" label="Argomenti studiati" sub="nella sessione odierna" color={C.primary}/>
          <StatCard value="12" label="Esercizi completati" sub="totale del giorno" color={C.success}/>
          <StatCard value="85%" label="Punteggio medio" sub="su tutti gli esercizi" color={C.warning}/>
        </div>
      </div>

      <div style={{ fontSize:11, fontWeight:700, color:C.textMuted,
        letterSpacing:"0.06em", marginBottom:12 }}>LE TUE MATERIE</div>

      <div style={{ display:"grid",
        gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:12 }}>
        {subjects.map((s,i)=>(
          <div key={i} onClick={()=>goTo("topic")}
            style={{ background:C.surface, border:`1px solid ${C.border}`,
              borderRadius:14, padding:"16px", cursor:"pointer",
              transition:"box-shadow .15s, transform .15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 6px 20px rgba(23,86,169,0.12)"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:s.color+"18",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize:16, fontWeight:800, color:C.text }}>{s.name}</div>
                <div style={{ fontSize:12, color:C.textMuted }}>{s.teacher} · {s.topics} argomenti</div>
              </div>
            </div>
            <ProgressBar value={s.progress} color={s.color}/>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
              <span style={{ fontSize:11, color:C.textMuted }}>Completamento</span>
              <span style={{ fontSize:11, fontWeight:700, color:s.color }}>{s.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* TOPICS */
const TopicScreen = ({ goTo }) => {
  const topics = [
    { n:1, name:"Equazioni di 1° grado", sub:"Completato · 4 lezioni", status:"done" },
    { n:2, name:"Disequazioni", sub:"Completato · 3 lezioni", status:"done" },
    { n:3, name:"Equazioni di 2° grado", sub:"In corso · 3/5 lezioni", status:"active" },
    { n:4, name:"Sistemi lineari", sub:"Non iniziato", status:"locked" },
    { n:5, name:"Funzioni e grafici", sub:"Non iniziato", status:"locked" },
  ];
  return (
    <div style={{ flex:1, overflowY:"auto", padding:"20px 20px" }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.textMuted,
        letterSpacing:"0.06em", marginBottom:14 }}>SCEGLI ARGOMENTO — MATEMATICA</div>
      {topics.map((t,i)=>{
        const done=t.status==="done", active=t.status==="active", locked=t.status==="locked";
        return (
          <div key={i} onClick={()=>!locked&&goTo("study")}
            style={{ background:active?"#F5F9FF":C.surface,
              border:`${active?2:1}px solid ${active?C.primary:C.border}`,
              borderRadius:12, padding:"14px 16px", marginBottom:8,
              display:"flex", alignItems:"center", justifyContent:"space-between",
              cursor:locked?"default":"pointer", opacity:locked?0.5:1,
              transition:"box-shadow .15s" }}
            onMouseEnter={e=>!locked&&(e.currentTarget.style.boxShadow="0 4px 14px rgba(23,86,169,0.10)")}
            onMouseLeave={e=>(e.currentTarget.style.boxShadow="none")}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", fontSize:13, fontWeight:800,
                display:"flex", alignItems:"center", justifyContent:"center",
                background:done?C.success:active?C.primary:C.border,
                color:done||active?"#fff":C.textLight }}>
                {done?"✓":t.n}
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:locked?C.textMuted:C.text }}>{t.name}</div>
                <div style={{ fontSize:11, color:C.textMuted, marginTop:1 }}>{t.sub}</div>
              </div>
            </div>
            {done&&<Badge color="green">Fatto</Badge>}
            {active&&<Badge color="blue">In corso →</Badge>}
            {locked&&<span style={{ fontSize:14, color:C.border }}>🔒</span>}
          </div>
        );
      })}
    </div>
  );
};

/* STUDY */
const StudyScreen = ({ goTo }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const subtopics = [
    { title:"Forma generale", files:[
      { name:"Lezione 31/01/2026", type:"pdf" },
      { name:"Appunti integrativa", type:"pdf" },
    ]},
    { title:"I coefficienti", files:[
      { name:"Dispensa coefficienti", type:"pdf" },
      { name:"Video-lezione 14/02", type:"video" },
    ]},
    { title:"Il discriminante", files:[
      { name:"Lezione 21/02/2026", type:"pdf" },
    ], active:true },
  ];

  const initMsgs = [
    { from:"ai", text:"Ciao Marco! Sono qui per aiutarti su tutti i materiali di questo argomento. Cosa vuoi approfondire?" },
  ];

  return (
    <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
      {/* LEFT: file tree */}
      <div style={{ width:230, borderRight:`1px solid ${C.border}`,
        overflowY:"auto", background:"#FAFBFD", flexShrink:0 }}>
        <div style={{ padding:"12px 14px" }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.textMuted,
            letterSpacing:"0.06em", marginBottom:10 }}>MATEMATICA</div>
          {subtopics.map((sub,i)=>(
            <div key={i} style={{ marginBottom:12 }}>
              <div style={{ fontSize:12, fontWeight:700,
                color:sub.active?C.primary:C.text, marginBottom:5,
                display:"flex", alignItems:"center", gap:5 }}>
                {sub.active&&<span style={{ width:5, height:5, borderRadius:"50%",
                  background:C.primary, display:"inline-block" }}/>}
                {sub.title}
              </div>
              {sub.files.map((f,j)=>(
                <div key={j}
                  style={{ padding:"5px 8px", borderRadius:7, fontSize:12,
                    color:selectedFile?.name===f.name?C.primary:C.textMuted,
                    background:selectedFile?.name===f.name?C.primaryLight:"transparent",
                    cursor:"pointer", display:"flex", alignItems:"center",
                    justifyContent:"space-between", gap:6, marginBottom:2 }}
                  onMouseEnter={e=>selectedFile?.name!==f.name&&(e.currentTarget.style.background=C.bg)}
                  onMouseLeave={e=>selectedFile?.name!==f.name&&(e.currentTarget.style.background="transparent")}>
                  <span onClick={()=>setSelectedFile(f)} style={{ flex:1 }}>
                    {f.type==="pdf"?"📄":"🎬"} {f.name}
                  </span>
                  <span style={{ fontSize:10, color:C.textLight, cursor:"pointer" }}
                    title="Scarica">⬇</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CENTER: file viewer or placeholder */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {selectedFile ? (
          <>
            <div style={{ padding:"10px 16px", borderBottom:`1px solid ${C.border}`,
              background:C.surface, display:"flex", alignItems:"center",
              justifyContent:"space-between" }}>
              <span style={{ fontSize:13, fontWeight:700, color:C.text }}>
                📄 {selectedFile.name}
              </span>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setSelectedFile(null)}
                  style={{ fontSize:12, padding:"4px 12px", borderRadius:20,
                    border:`1px solid ${C.border}`, background:C.surface,
                    color:C.textMuted, cursor:"pointer" }}>✕ Chiudi</button>
              </div>
            </div>
            <div style={{ flex:1, background:"#F0F4F8", display:"flex",
              alignItems:"center", justifyContent:"center" }}>
              <div style={{ textAlign:"center", color:C.textMuted }}>
                <div style={{ fontSize:48, marginBottom:8 }}>📄</div>
                <div style={{ fontSize:14 }}>{selectedFile.name}</div>
                <div style={{ fontSize:12, marginTop:4 }}>Anteprima documento</div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex:1, display:"flex", alignItems:"center",
            justifyContent:"center", flexDirection:"column", gap:12,
            color:C.textMuted, padding:32 }}>
            <div style={{ fontSize:48 }}>📂</div>
            <div style={{ fontSize:15, fontWeight:600 }}>Seleziona un file dalla barra laterale</div>
            <div style={{ fontSize:13 }}>oppure usa la chat generale qui sotto</div>
          </div>
        )}
      </div>

      {/* RIGHT: mini chat */}
      <div style={{ width:280, borderLeft:`1px solid ${C.border}`,
        display:"flex", flexDirection:"column", flexShrink:0, background:C.surface }}>
        <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}`,
          background:C.primaryLight }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.primary,
            letterSpacing:"0.06em" }}>
            {selectedFile ? `CHAT — ${selectedFile.name}` : "CHAT GENERALE"}
          </div>
          <div style={{ fontSize:11, color:C.textMuted, marginTop:1 }}>
            {selectedFile ? "Chiedi chiarimenti su questo file" : "Chiedi su tutti i materiali"}
          </div>
        </div>
        <MiniChat
          placeholder={selectedFile?"Chiedi su questo file...":"Fai una domanda sui materiali..."}
          messages={initMsgs}/>
        {!selectedFile && (
          <div style={{ padding:"6px 10px 10px",
            borderTop:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
              {["Riassumi tutto","Crea mappa","Quiz rapido"].map(c=>(
                <span key={c} style={{ background:C.primaryLight, color:C.primary,
                  fontSize:11, fontWeight:600, padding:"3px 10px",
                  borderRadius:20, cursor:"pointer" }}>{c}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* EXERCISE */
const ExerciseScreen = ({ goTo }) => {
  const exercises = [
    { n:1, pts:2, text:"Risolvi: x² − 5x + 6 = 0. Mostra il procedimento.", done:true },
    { n:2, pts:2, text:"Calcola Δ per: 3x² + 4x − 2 = 0 e determina la natura delle soluzioni.", done:true },
    { n:3, pts:3, text:"Risolvi: 2x² + 5x − 3 = 0 usando la formula quadratica.", done:false, active:true },
    { n:4, pts:3, text:"Trova b tale che x² + bx + 9 = 0 abbia soluzioni coincidenti.", done:false },
  ];
  const [active, setActive] = useState(3);

  const chatMsgs = [
    { from:"ai", text:"Esercizio 3: risolvi 2x² + 5x − 3 = 0. Mostrami il ragionamento passo passo. Non preoccuparti degli errori!" },
    { from:"user", text:"Uso la formula quadratica: x = (−5 ± √(25+24)) / 4" },
    { from:"ai", text:"Ottimo! Δ = 49 è corretto ✓ Ora calcola le due soluzioni separate x₁ e x₂." },
  ];

  return (
    <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
      {/* Left: exercise list */}
      <div style={{ width:220, borderRight:`1px solid ${C.border}`,
        overflowY:"auto", background:"#FAFBFD", flexShrink:0, padding:"12px 10px" }}>
        <div style={{ fontSize:11, fontWeight:800, color:C.textMuted,
          letterSpacing:"0.06em", marginBottom:10 }}>ESERCIZI</div>
        {exercises.map(ex=>(
          <div key={ex.n} onClick={()=>!ex.done&&setActive(ex.n)}
            style={{ padding:"9px 10px", borderRadius:9, marginBottom:6,
              background:active===ex.n?C.primaryLight:C.surface,
              border:`1px solid ${active===ex.n?C.primary:C.border}`,
              cursor:ex.done?"default":"pointer",
              display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:24, height:24, borderRadius:"50%", fontSize:11,
              fontWeight:800, flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              background:ex.done?C.success:active===ex.n?C.primary:C.border,
              color:ex.done||active===ex.n?"#fff":C.textLight }}>
              {ex.done?"✓":ex.n}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:600,
                color:ex.done?C.textMuted:C.text }}>Esercizio {ex.n}</div>
              <div style={{ fontSize:10, color:C.textMuted }}>{ex.pts} punti</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop:14, borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.textMuted,
            letterSpacing:"0.06em", marginBottom:6 }}>REPORT</div>
          <div style={{ fontSize:12, color:C.success, marginBottom:3 }}>✅ 2 completati</div>
          <div style={{ fontSize:12, color:C.textMuted }}>⚠️ 0 errori</div>
        </div>
      </div>

      {/* Center: formula + answer */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ flex:1, overflowY:"auto", padding:"14px 16px" }}>
          <div style={{ background:C.primaryLight, borderRadius:12, padding:"12px 14px",
            marginBottom:12, fontSize:13, color:C.primaryDark, fontWeight:600 }}>
            ✏️ Esercizio {active}: {exercises.find(e=>e.n===active)?.text}
          </div>
          <FormulaBar/>
          <div style={{ marginBottom:8 }}>
            <label style={{ fontSize:12, fontWeight:600, color:C.textMuted,
              display:"block", marginBottom:5 }}>IL TUO PROCEDIMENTO</label>
            <textarea rows={5} placeholder="Scrivi qui i passaggi del tuo ragionamento..."
              style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10,
                padding:"10px 12px", fontSize:13, resize:"vertical",
                outline:"none", boxSizing:"border-box" }}
              onFocus={e=>e.target.style.borderColor=C.primary}
              onBlur={e=>e.target.style.borderColor=C.border}/>
          </div>
          <Btn style={{ width:"100%" }}>Invia risposta →</Btn>
        </div>
      </div>

      {/* Right: AI chat feedback */}
      <div style={{ width:270, borderLeft:`1px solid ${C.border}`,
        display:"flex", flexDirection:"column", flexShrink:0, background:C.surface }}>
        <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}`,
          background:C.primaryLight }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.primary,
            letterSpacing:"0.06em" }}>FEEDBACK YOUR BEST</div>
          <div style={{ fontSize:11, color:C.textMuted, marginTop:1 }}>
            Guida al ragionamento
          </div>
        </div>
        <MiniChat placeholder="Chiedi un suggerimento..." messages={chatMsgs}/>
      </div>
    </div>
  );
};

/* REVIEW */
const ReviewScreen = ({ goTo }) => {
  const reviewMsgs = [
    { from:"ai", text:"Ho analizzato tutte le tue attività su questo argomento. Iniziamo dal discriminante: quando Δ = 0, quante soluzioni ha l'equazione?" },
  ];
  return (
    <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
      {/* Left: report */}
      <div style={{ width:280, borderRight:`1px solid ${C.border}`,
        overflowY:"auto", padding:"16px 14px", background:"#FAFBFD", flexShrink:0 }}>
        <div style={{ fontSize:11, fontWeight:800, color:C.textMuted,
          letterSpacing:"0.06em", marginBottom:10 }}>IL TUO REPORT</div>
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          <StatCard value="8/10" label="Completati" color={C.success}/>
          <StatCard value="2" label="Errori" color={C.danger}/>
        </div>
        <ProgressBar value={78} color={C.primary} h={8}/>
        <div style={{ textAlign:"right", fontSize:12, color:C.textMuted, marginTop:3, marginBottom:14 }}>Media: 78%</div>

        <div style={{ fontSize:11, fontWeight:800, color:C.textMuted,
          letterSpacing:"0.06em", marginBottom:8 }}>AREE DI MIGLIORAMENTO</div>
        {[
          { icon:"⚠️", bg:C.dangerLight, title:"Calcolo discriminante", sub:"2 errori — Es. 2 e 4", prog:70, color:C.danger },
          { icon:"💡", bg:C.primaryLight, title:"Interpretazione geometrica", sub:"Da ripassare", prog:50, color:C.primary },
          { icon:"✅", bg:C.successLight, title:"Formula quadratica", sub:"100% corretto", prog:100, color:C.success },
        ].map((item,i)=>(
          <div key={i} style={{ background:C.surface, border:`1px solid ${C.border}`,
            borderRadius:10, padding:"10px 12px", marginBottom:8,
            display:"flex", alignItems:"flex-start", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:item.bg,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:16, flexShrink:0 }}>{item.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{item.title}</div>
              <div style={{ fontSize:11, color:C.textMuted, marginBottom:4 }}>{item.sub}</div>
              <ProgressBar value={item.prog} color={item.color}/>
            </div>
          </div>
        ))}

        <div style={{ marginTop:14, borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.textMuted,
            letterSpacing:"0.06em", marginBottom:8 }}>SUGGERIMENTI AI</div>
          {["📝 Ho preparato 3 esercizi mirati sugli errori",
            "🎯 Simulazione esame disponibile",
            "📚 Ripeti teoria sul discriminante"].map((s,i)=>(
            <div key={i} style={{ padding:"7px 10px", borderRadius:8,
              background:C.primaryLight, fontSize:12, color:C.primaryDark,
              marginBottom:5, cursor:"pointer", fontWeight:500 }}>{s}</div>
          ))}
        </div>

        <Btn onClick={()=>goTo("verify")} style={{ width:"100%", marginTop:14 }}>
          Sono pronto per la verifica →
        </Btn>
      </div>

      {/* Right: ripasso chat */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:C.surface }}>
        <div style={{ padding:"10px 16px", borderBottom:`1px solid ${C.border}`,
          background:C.primaryLight }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.primary,
            letterSpacing:"0.06em" }}>SESSIONE DI RIPASSO GUIDATA</div>
          <div style={{ fontSize:11, color:C.textMuted, marginTop:1 }}>
            Your Best ti guida sulle lacune identificate
          </div>
        </div>
        <MiniChat placeholder="Rispondi o chiedi chiarimenti..." messages={reviewMsgs}/>
        <div style={{ padding:"6px 12px 10px", borderTop:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {["Spiegami il discriminante","Dammi un esercizio","Non capisco ancora"].map(c=>(
              <span key={c} style={{ background:C.primaryLight, color:C.primary,
                fontSize:11, fontWeight:600, padding:"4px 11px",
                borderRadius:20, cursor:"pointer" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* VERIFY */
const VerifyScreen = ({ goTo }) => (
  <div style={{ flex:1, overflowY:"auto", padding:"20px 20px" }}>
    <div style={{ background:C.warningLight, borderLeft:`3px solid ${C.warning}`,
      borderRadius:"0 10px 10px 0", padding:"10px 16px", fontSize:13,
      color:"#78350F", marginBottom:16 }}>
      🔒 Modalità verifica attiva — l'AI non può rispondere durante lo svolgimento.
    </div>

    <div style={{ display:"flex", gap:10, marginBottom:20 }}>
      <StatCard value="3" label="Esercizi" color={C.primary}/>
      <StatCard value="8 pt" label="Punteggio totale" color={C.success}/>
      <StatCard value="45 min" label="Tempo disponibile" color={C.warning}/>
    </div>

    <div style={{ fontSize:11, fontWeight:700, color:C.textMuted,
      letterSpacing:"0.06em", marginBottom:14 }}>ESERCIZI — 21/02/2026</div>

    {[
      { n:1, pts:2, text:"Risolvi l'equazione x² − 5x + 6 = 0 e indica la natura delle soluzioni basandoti sul discriminante." },
      { n:2, pts:3, text:"Data 3x² + bx + 3 = 0, trova il valore di b per cui l'equazione ha soluzioni reali coincidenti." },
      { n:3, pts:3, text:"Una palla viene lanciata: h(t) = −5t² + 20t + 1. Quando tocca terra? Usa il discriminante." },
    ].map((ex,i)=>(
      <div key={i} style={{ background:C.surface, border:`1.5px solid ${C.primary}`,
        borderRadius:14, padding:"16px 18px", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <span style={{ fontSize:14, fontWeight:800, color:C.primary }}>Esercizio {ex.n}</span>
          <Badge color="blue">{ex.pts} punti</Badge>
        </div>
        <div style={{ fontSize:13, color:C.text, lineHeight:1.6, marginBottom:10 }}>{ex.text}</div>
        <FormulaBar/>
        <textarea rows={4} placeholder="Svolgi qui il tuo esercizio..."
          style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10,
            padding:"10px 12px", fontSize:13, resize:"vertical", outline:"none",
            boxSizing:"border-box" }}
          onFocus={e=>e.target.style.borderColor=C.primary}
          onBlur={e=>e.target.style.borderColor=C.border}/>
      </div>
    ))}

    <UploadBox label="Carica foto del foglio (opzionale — se hai svolto su carta)"/>
    <Btn style={{ width:"100%", padding:14, marginTop:4 }}>Consegna verifica</Btn>
    <div style={{ height:24 }}/>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
/* APP ROOT                                                                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [screen, setScreen] = useState("login");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const authScreens = ["login","register"];
  const isAuth = !authScreens.includes(screen);
  const showBottomNav = isAuth && ["subject","topic"].includes(screen);

  const screenMap = {
    login: <LoginScreen goTo={setScreen}/>,
    register: <RegisterScreen goTo={setScreen}/>,
    subject: <SubjectScreen goTo={setScreen} isMobile={isMobile}/>,
    topic: <TopicScreen goTo={setScreen}/>,
    study: <StudyScreen goTo={setScreen}/>,
    exercise: <ExerciseScreen goTo={setScreen}/>,
    review: <ReviewScreen goTo={setScreen}/>,
    verify: <VerifyScreen goTo={setScreen}/>,
  };

  /* Full-page auth screens */
  if (!isAuth) return screenMap[screen];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh",
      background:C.bg, fontFamily:"'Segoe UI', system-ui, sans-serif" }}>

      <style>{`
        @media (max-width: 767px) {
          .desktop-bottom-hide { display: none !important; }
        }
        @media (min-width: 768px) {
          .mobile-bottom-only { display: none !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #C0D4EE; border-radius: 10px; }
      `}</style>

      <TopNav screen={screen} goTo={setScreen} isMobile={isMobile}/>

      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
        {/* Content panel */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {screenMap[screen]}
        </div>
      </div>

      {/* Bottom nav: mobile only, only on home/topic */}
      {showBottomNav && (
        <div className="mobile-bottom-only">
          <BottomNav screen={screen}/>
        </div>
      )}
    </div>
  );
}
