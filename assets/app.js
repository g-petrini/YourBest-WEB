// ============================================================
// YOUR BEST — Logica app (navigazione, viste, AI, grafici)
// ============================================================

// ── NAVIGAZIONE MULTI-PAGINA ─────────────────────────────────
// goTo() usa path assoluti basati su <base> tag
// Il <base> tag è settato dinamicamente in ogni pagina
// e punta sempre alla root del progetto (cartella yb3/)
function goTo(path) {
  window.location.href = path;
}
function showPage(id) { /* no-op in multi-page mode */ }

var BASE_URL_API = 'http://localhost:8080';
var obSelected = 0;
var obClasses = [{ ctx:'3A · Matematica' }, { ctx:'4B · Italiano' }];

function doLogin() {
  var email    = (document.getElementById('l-email')    || {}).value || '';
  var password = (document.getElementById('l-password') || {}).value || '';

  // Mostra loading sul bottone
  var btn = document.querySelector('.abtn');
  if (btn) { btn.textContent = 'Accesso in corso...'; btn.disabled = true; }

  fetch(BASE_URL_API + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  })
  .then(function(res) {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  })
  .then(function(data) {
    // Salva token e dati utente
    sessionStorage.setItem('yb_token',    data.token);
    sessionStorage.setItem('yb_role',     data.role === 'TEACHER' ? 'doc' : 'stu');
    sessionStorage.setItem('yb_name',     data.fullName);
    sessionStorage.setItem('yb_email',    data.email);
    sessionStorage.setItem('yb_initials', data.fullName.split(' ').map(function(w){ return w[0]; }).join('').substring(0,2).toUpperCase());



    // Redirect in base al ruolo
    if (data.role === 'TEACHER') goTo('pages/auth/onboarding.html');
    else                         goTo('pages/studente/home.html');
  })
  .catch(function(err) {
    // Ripristina bottone e mostra errore
    if (btn) { btn.textContent = 'Accedi →'; btn.disabled = false; }
    var note = document.querySelector('.anote');
    if (note) {
      note.textContent = err.message === '401' ? 'Email o password errati.' : 'Errore di connessione. Backend attivo?';
      note.style.color = '#DC2626';
    }
  });
}

function switchRole(r) {
  sessionStorage.setItem('yb_role', r);
  if (r === 'doc') goTo('pages/auth/onboarding.html');
  else             goTo('pages/studente/home.html');
}

function enterDashboard() {
  sessionStorage.setItem('yb_ctx', obClasses[obSelected].ctx);
  goTo('pages/docente/dashboard.html');
}

function selObClass(idx) {
  obSelected = idx;
  for (var i = 0; i < 2; i++) {
    var row = document.getElementById('ob-' + i);
    var chk = document.getElementById('ob-chk-' + i);
    if (!row || !chk) continue;
    if (i === idx) {
      row.style.border = '2px solid var(--blue)';
      row.style.background = 'rgba(30,107,255,.18)';
      chk.style.cssText = 'width:22px;height:22px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;flex-shrink:0;';
      chk.textContent = '✓';
    } else {
      row.style.border = '2px solid rgba(255,255,255,.12)';
      row.style.background = 'rgba(255,255,255,.05)';
      chk.style.cssText = 'width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,.2);flex-shrink:0;';
      chk.textContent = '';
    }
  }
}

function setLoginRole(el, role) {
  el.closest('#login-chips').querySelectorAll('.rc').forEach(function(c){c.classList.remove('on');});
  el.classList.add('on');
  var map = {doc:'giulia.rossi@liceo.it', stu:'mario.rossi@liceo.it', ist:'admin@einstein.edu.it'};
  var em = document.getElementById('l-email');
  if (em) em.value = map[role] || '';
}

function setRegRole(el, role) {
  el.closest('#reg-chips').querySelectorAll('.rc').forEach(function(c){c.classList.remove('on');});
  el.classList.add('on');
  document.querySelectorAll('.regf').forEach(function(f){f.classList.remove('on');});
  var form = document.getElementById('rf-'+role);
  if (form) form.classList.add('on');
}

function dV(view) {
  var map = {
    dash:'pages/docente/dashboard.html',     prog:'pages/docente/programma.html',
    studio:'pages/docente/crea-lezione.html', esercizi:'pages/docente/esercizi.html',
    analisi:'pages/docente/analisi.html',    verifica:'pages/docente/verifica.html',
    ripasso:'pages/docente/ripasso.html',
    'stud-det':'pages/docente/esercizi.html','ver-stud':'pages/docente/verifica.html',
    'rep-es':'pages/docente/esercizi.html',  'rep-ver':'pages/docente/verifica.html',
  };
  if (map[view]) goTo(map[view]);
}

function sV(view) {
  var map = {
    home:'pages/studente/home.html',       studio:'pages/studente/studio.html',
    esercizi:'pages/studente/esercizi.html', ripasso:'pages/studente/ripasso.html',
    verifica:'pages/studente/verifica.html', perf:'pages/studente/performance.html',
  };
  if (map[view]) goTo(map[view]);
}

function highlightNav(id) {
  document.querySelectorAll('.ni,.nis').forEach(function(n){n.classList.remove('on');});
  var el = document.getElementById(id);
  if (el) el.classList.add('on');
}

document.addEventListener('DOMContentLoaded', function() {
  // Role switcher
  var rsw = document.getElementById('rsw');
  if (rsw) rsw.classList.add('on');
  var role = sessionStorage.getItem('yb_role') || 'doc';
  var rbd = document.getElementById('rbd'), rbs = document.getElementById('rbs');
  if (rbd) rbd.classList.toggle('on', role==='doc');
  if (rbs) { rbs.classList.toggle('on', role==='stu'); if(role==='stu') rbs.classList.add('ong'); }
  // Contesto docente
  var ctx = sessionStorage.getItem('yb_ctx');
  var lbl = document.getElementById('d-ctx-lbl');
  if (ctx && lbl) lbl.textContent = ctx;
});



// ── FUNZIONI ORIGINALI ──────────────────────────────────
// ── PAGE ROUTING ──





// ── DOCENTE VIEWS ──

function togArg(id) {
  var el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function dSelLes(el, nm) {
  document.querySelectorAll('.tle').forEach(function(l) { l.classList.remove('on'); });
  el.classList.add('on');
  var t = document.getElementById('d-les-t');
  if (t) t.textContent = nm;
}

function openLesChat() {
  var card = document.getElementById('d-les-card');
  var chat = document.getElementById('d-les-chat');
  if (card) card.style.display = 'none';
  if (chat) chat.style.display = 'flex';
}

function closeLesChat() {
  var card = document.getElementById('d-les-card');
  var chat = document.getElementById('d-les-chat');
  if (card) card.style.display = '';
  if (chat) chat.style.display = 'none';
}

function dSelEx(el, idx) {
  document.querySelectorAll('.tex').forEach(function(r) { r.classList.remove('on'); });
  el.classList.add('on');
  var e = D_EXDATA[idx];
  if (!e) return;
  var f = function(id, val) { var x = document.getElementById(id); if (x) x.innerHTML = val; };
  f('de-title', e.title); f('de-tx', e.tx); f('de-ai-b', e.ai);
  f('ke-c', e.c); f('ke-r', e.r); f('ke-t', e.t); f('ke-e', e.e);
}

function selPdArg(idx) {
  var pdata = [
    { name: 'Equazioni e sistemi', obj: ['Risolvere equazioni di 1° e 2° grado', 'Calcolare il discriminante Δ', 'Risolvere sistemi lineari'] },
    { name: 'Geometria analitica', obj: ['Rappresentare punti e rette nel piano', 'Calcolare distanze e intersezioni'] },
    { name: 'Funzioni e grafici', obj: ['Comprendere il concetto di funzione', 'Disegnare grafici elementari'] }
  ];
  for (var i = 0; i < 3; i++) {
    var row = document.getElementById('pda-' + i);
    if (row) row.style.background = i === idx ? 'var(--bpale)' : '';
  }
  var d = pdata[idx];
  if (!d) return;
  var t = document.getElementById('pd-title');
  if (t) t.textContent = d.name;
  var ob = document.getElementById('pd-obj');
  if (ob) ob.innerHTML = d.obj.map(function(o) { return '<div style="display:flex;gap:5px;font-size:11px;margin-bottom:4px;"><span style="color:var(--green);">✓</span><span>' + o + '</span></div>'; }).join('');
}

function addLes() { openMo('mo-new-les'); }

function doAddLes() {
  var nm = (document.getElementById('les-nm') || {}).value || 'Nuova lezione';
  var dt = (document.getElementById('les-dt') || {}).value || '—';
  lzCount++;
  var list = document.getElementById('lz-list');
  if (list) {
    var item = document.createElement('div');
    item.className = 'lzi';
    item.innerHTML = '<div class="lzn">' + lzCount + '</div><div style="flex:1;font-size:11px;">' + nm + '</div><div style="font-size:10px;color:var(--mu);">' + dt + '</div>';
    list.appendChild(item);
  }
  closeMo('mo-new-les');
}

// ── DOCENTE AI CHAT ──
function dChat(txt) {
  addMsg('d-chat', txt, 'user');
  setTimeout(function() {
    addMsg('d-chat', R_DCHAT[aiIdx.dchat % R_DCHAT.length], 'bot');
    aiIdx.dchat++;
  }, 650);
}

function dChatSend() {
  var inp = document.getElementById('d-chat-inp');
  var t = (inp || {}).value.trim();
  if (!t) return;
  inp.value = '';
  dChat(t);
}

// ── STUDENTE VIEWS ──


function sSelLes(el, nm) {
  document.querySelectorAll('.tle').forEach(function(l) { l.classList.remove('on'); });
  if (!el.classList.contains('lk')) el.classList.add('on');
  var t = document.getElementById('s-les-t');
  if (t) t.textContent = nm;
}




// ── STUDENTE AI CHAT ──


// ── SHARED ──
function addMsg(containerId, text, role) {
  var c = document.getElementById(containerId);
  if (!c) return;
  var d = document.createElement('div');
  d.className = 'msg ' + role;
  d.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

// ── VERIFICA ──
function startTimer() {
  clearInterval(timerInt);
  timerInt = setInterval(function() {
    if (timerSec > 0) {
      timerSec--;
      var m = Math.floor(timerSec / 60), s = timerSec % 60;
      var el = document.getElementById('ver-timer');
      if (el) el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }
  }, 1000);
}

function verNav(dir) {
  var ans = document.getElementById('ver-ans');
  if (ans && ans.value.trim() && verDone.indexOf(verCur) === -1) { verDone.push(verCur); }
  verCur = Math.max(0, Math.min(3, verCur + dir));
  var q = document.getElementById('ver-q'); if (q) q.innerHTML = VER_QS[verCur];
  var qn = document.getElementById('ver-qn'); if (qn) qn.textContent = verCur + 1;
  if (ans) ans.value = '';
  var prev = document.getElementById('ver-prev'); if (prev) prev.disabled = verCur === 0;
  var nxt = document.getElementById('ver-next'); if (nxt) nxt.textContent = verCur === 3 ? 'Consegna →' : 'Successiva →';
  document.querySelectorAll('.vqd').forEach(function(v, i) {
    v.classList.remove('curr', 'done');
    if (i === verCur) v.classList.add('curr');
    else if (verDone.indexOf(i) !== -1) v.classList.add('done');
  });
  var cnt = document.getElementById('vq-cnt'); if (cnt) cnt.textContent = verDone.length + ' di 4 completate';
  if (verCur === 3 && dir === 1) openMo('mo-consegna');
}

function doConsegna() {
  closeMo('mo-consegna');
  clearInterval(timerInt);
  alert('Verifica consegnata! ✓\nLa Prof. Bianchi riceverà il tuo elaborato.\nL\'AI effettuerà una pre-analisi e il docente ti darà il voto finale.');
}

// ── FORMULA ──
function insF(s) {
  var ta = document.getElementById('f-inp');
  if (!ta) return;
  var p = ta.selectionStart;
  ta.value = ta.value.slice(0, p) + s + ta.value.slice(ta.selectionEnd);
  ta.focus();
  renderF(ta.value);
}

function renderF(val) {
  fVal = val;
  var p = document.getElementById('f-prev');
  if (p) p.innerHTML = '\\(' + val + '\\)';
}

function insFormula() {
  var targets = ['s-es-ans', 'ver-ans'];
  for (var i = 0; i < targets.length; i++) {
    var ta = document.getElementById(targets[i]);
    if (ta && ta.offsetParent !== null) { ta.value += '\n[' + fVal + ']\n'; break; }
  }
  closeMo('mo-formula');
}

// ── MODALS ──
function openMo(id) { var el = document.getElementById(id); if (el) el.classList.add('open'); }
function closeMo(id) { var el = document.getElementById(id); if (el) el.classList.remove('open'); }

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.mo').forEach(function(m) {
    m.addEventListener('click', function(e) { if (e.target === m) m.classList.remove('open'); });
  });
  // Enter to send
  var chatPairs = [
    ['d-chat-inp', function() { dChatSend(); }],
    ['s-inp-studio', function() { sChatSend('studio'); }],
    ['s-inp-esercizi', function() { sChatSend('esercizi'); }],
    ['s-inp-ripasso', function() { sChatSend('ripasso'); }]
  ];
  chatPairs.forEach(function(pair) {
    var el = document.getElementById(pair[0]);
    if (el) el.addEventListener('keydown', function(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pair[1](); } });
  });
  startTimer();
  renderF(fVal);
});

// ── ONBOARDING DOCENTE ──
var obSelected = 0;
var obClasses = [
  { ctx: '3A · Matematica' },
  { ctx: '4B · Filosofia'  }
];




function makeChart(id, type, data, opts) {
  var el = document.getElementById(id);
  if (!el || el._c) return;
  try { el._c = new Chart(el, { type: type, data: data, options: opts }); } catch(e) {}
}

function initAnalisiCharts() {
  if (chartsInited.danalisi) return; chartsInited.danalisi = true;
  makeChart('ac-pie', 'doughnut', {
    labels: ['Concettuale', 'Metodo', 'Calcolo'],
    datasets: [{ data: [51, 30, 19], backgroundColor: ['#DC2626', '#F59E0B', '#93C5FD'], borderWidth: 0 }]
  }, { responsive: true, cutout: '65%', plugins: { legend: { display: false } } });
  makeChart('ac-line', 'line', {
    labels: ['Gen', 'Feb', 'Mar'],
    datasets: [{ data: [60, 67, 71], borderColor: '#1E6BFF', backgroundColor: 'rgba(30,107,255,.08)', fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: '#1E6BFF' }]
  }, { responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 40, max: 100, ticks: { font: { size: 9 } }, grid: { color: 'rgba(0,0,0,.05)' } }, x: { ticks: { font: { size: 9 } }, grid: { display: false } } } });
}

function initVerChart() {
  if (chartsInited.dver) return; chartsInited.dver = true;
  makeChart('ver-ch', 'bar', {
    labels: ['4', '5', '7', '7', '9'],
    datasets: [{ data: [1, 1, 2, 0, 1], backgroundColor: ['#FCA5A5', '#FCA5A5', '#6EE7B7', '#6EE7B7', '#059669'], borderRadius: 5 }]
  }, { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { font: { size: 9 }, stepSize: 1 }, grid: { color: 'rgba(0,0,0,.05)' } }, x: { ticks: { font: { size: 9 } }, grid: { display: false } } } });
}

function initRepChart() {
  if (chartsInited.drep) return; chartsInited.drep = true;
  makeChart('rep-ch', 'bar', {
    labels: ['LM', 'SF', 'PL', 'MG', 'AV'],
    datasets: [{ data: [94, 78, 65, 51, 15], backgroundColor: ['#059669', '#1E6BFF', '#8B5CF6', '#F59E0B', '#DC2626'], borderRadius: 5 }]
  }, { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, ticks: { font: { size: 9 } }, grid: { color: 'rgba(0,0,0,.05)' } }, x: { ticks: { font: { size: 9 } }, grid: { display: false } } } });
}

function initRvrChart() {
  if (chartsInited.drvr) return; chartsInited.drvr = true;
  makeChart('rvr-ch', 'bar', {
    labels: ['4', '5', '7', '7', '9'],
    datasets: [{ data: [1, 1, 2, 0, 1], backgroundColor: ['#FCA5A5', '#FCA5A5', '#6EE7B7', '#6EE7B7', '#059669'], borderRadius: 5 }]
  }, { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { font: { size: 9 }, stepSize: 1 }, grid: { color: 'rgba(0,0,0,.05)' } }, x: { ticks: { font: { size: 9 } }, grid: { display: false } } } });
}

function initPerfCharts() {
  if (chartsInited.sperfd) return; chartsInited.sperfd = true;
  makeChart('perf-radar', 'radar', {
    labels: ['Correttezza', 'Autonomia', 'Metodo', 'Velocità', 'Costanza'],
    datasets: [{ data: [75, 72, 68, 80, 85], backgroundColor: 'rgba(5,150,105,.15)', borderColor: '#059669', borderWidth: 2, pointBackgroundColor: '#059669', pointRadius: 4 }]
  }, { responsive: true, plugins: { legend: { display: false } }, scales: { r: { beginAtZero: true, max: 100, ticks: { display: false }, grid: { color: 'rgba(0,0,0,.08)' }, pointLabels: { font: { size: 10 } } } } });
}

function initRipChart() {
  if (chartsInited.sripc) return; chartsInited.sripc = true;
  makeChart('rip-ch', 'line', {
    labels: ['Sett.1', 'Sett.2', 'Sett.3', 'Sett.4'],
    datasets: [{ data: [58, 64, 70, 75], borderColor: '#059669', backgroundColor: 'rgba(5,150,105,.08)', fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: '#059669' }]
  }, { responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 40, max: 100, ticks: { font: { size: 9 } }, grid: { color: 'rgba(0,0,0,.05)' } }, x: { ticks: { font: { size: 9 } }, grid: { display: false } } } });
}

// ════════════════════════════════════════════════════════════
// YOUR BEST v2 — FUNZIONI AGGIUNTIVE (nessun override)
// ════════════════════════════════════════════════════════════

var CURR_MAT_DOC = 'mat';
var CURR_MAT_STU = 'mat';
chartsInited.rip = false;

// ── DATI ITALIANO ──
var D_EX_DATA_ITA = [
  { title:'Esercizio 1 — Analisi personaggio', tx:'Analizza il personaggio di Renzo nei <em>Promessi Sposi</em>. Individua le tecniche di caratterizzazione usate da Manzoni.', ai:'4/22 studenti non distinguono caratterizzazione diretta/indiretta.', c:18, r:2, t:'2.8', e:'38%' },
  { title:'Esercizio 2 — Narratore', tx:'Identifica il tipo di narratore nel brano fornito. Giustifica con citazioni.', ai:'6/22 studenti confondono narratore onnisciente e interno.', c:16, r:3, t:'3.1', e:'42%' },
  { title:'Esercizio 3 — Fabula e intreccio', tx:"Ricostruisci la fabula e confrontala con l'intreccio. Segnala analessi/prolessi.", ai:'—', c:0, r:0, t:'—', e:'—' }
];
var S_EX_DATA_ITA = [
  { title:'Esercizio 1 — Analisi personaggio', tx:"Analizza il personaggio di Renzo nei Promessi Sposi. Individua le tecniche di caratterizzazione.", tag:'Errori presenti', tagc:'te', fb:true },
  { title:'Esercizio 2 — Narratore', tx:'Identifica il tipo di narratore. Giustifica con citazioni.', tag:'Da svolgere', tagc:'tl', fb:false },
  { title:'Esercizio 3 — Fabula', tx:"Ricostruisci fabula e intreccio. Segnala analessi/prolessi.", tag:'Da svolgere', tagc:'tl', fb:false }
];
var R_STUDIO_ITA = [
  'Il personaggio può essere caratterizzato in modo:\n🔵 DIRETTO — il narratore lo descrive esplicitamente\n🟢 INDIRETTO — emerge da azioni e dialoghi\n\nIn quali modi Manzoni caratterizza Renzo?',
  'Tipi di narratore:\n① Onnisciente — sa tutto\n② Interno — è anche personaggio\n③ Esterno — osserva dall\'esterno\n\nI Promessi Sposi hanno un narratore onnisciente.',
  'Fabula = ordine cronologico. Intreccio = ordine narrativo.\nANALESSI = flashback · PROLESSI = anticipazione'
];
var R_ESERCIZI_ITA = [
  'Suggerimento: la caratterizzazione DIRETTA è quando il narratore descrive esplicitamente il personaggio. Cerca aggettivi e descrizioni nel testo.',
  "La caratterizzazione INDIRETTA emerge da comportamenti e dialoghi. Cerca azioni significative.",
  'Il tuo approccio è giusto! Cita il testo per ogni affermazione.'
];
var R_RIPASSO_ITA = [
  '🎤 Domanda simulazione:\n"Descrivi la differenza tra narratore onnisciente e interno."',
  'Quiz rapido:\n1) Cos\'è la fabula?\n2) Cos\'è un\'analessi?\n3) Cita un esempio di caratterizzazione diretta.',
  'Schema personaggi:\n• PROTAGONISTA — al centro\n• ANTAGONISTA — si oppone\n• AIUTANTE — supporta'
];
var PROG_DATA = {
  0:  { icon:'📐', title:'Equazioni e sistemi',        obj:['Risolvere equazioni di 1° e 2° grado','Calcolare e interpretare il discriminante Δ','Risolvere sistemi lineari'] },
  1:  { icon:'📏', title:'Geometria analitica',         obj:['Rappresentare punti e rette nel piano','Calcolare distanze e intersezioni','Equazione della retta in varie forme'] },
  10: { icon:'📖', title:'Analisi del testo narrativo', obj:['Identificare le tecniche di caratterizzazione','Distinguere fabula e intreccio','Analizzare narratore e punto di vista'] },
  11: { icon:'✍️', title:'Scrittura argomentativa',     obj:['Strutturare un testo argomentativo','Costruire tesi e argomenti efficaci','Usare tecniche retoriche appropriate'] }
};
var R_LES_AI = [
  'Struttura consigliata:\n① Ripasso prerequisiti (5 min)\n② Concetto principale con esempi\n③ Formalizzazione della teoria\n④ 2-3 esercizi guidati\n\nVuoi che sviluppi uno di questi punti?',
  'Esempi pratici:\n💡 x²−5x+6=0 → Δ=1 → x=3, x=2\n💡 x²−4x+4=0 → Δ=0 → x=2 (doppia)\n💡 x²+x+1=0 → Δ=−3 → nessuna sol.',
  'Errori comuni:\n🔴 Sbagliare il segno di −4ac quando c<0\n🔴 Dimenticare x₂ dopo x₁\n🟡 Non verificare le soluzioni'
];
var LESSON_DATA = [
  { title:'Lez.1 — Introduzione', sub:'12 gen 2026', tag:'Completata', tagc:'tg' },
  { title:'Lez.2 — Il discriminante Δ', sub:'19 gen 2026', tag:'In corso', tagc:'ta' },
  { title:'Lez.3 — Formula completa', sub:'26 gen 2026', tag:'Bozza', tagc:'tl' },
  { title:'Lez.4 — Esercizi guidati', sub:'2 feb 2026', tag:'Non iniziata', tagc:'tl' }
];
var aiTabMsgs = {
  appr:['Ciao Mario! 👋 Sono pronto ad aiutarti con <strong>Il discriminante Δ</strong>. Ho studiato tutti i materiali della Prof. Bianchi. Chiedimi qualcosa!'],
  riass:['Posso generare un <strong>riassunto strutturato</strong> della lezione. Vuoi il riassunto completo o per argomento specifico?'],
  mappa:['<strong>Mappa — Discriminante:</strong>\nax²+bx+c=0 → Δ=b²−4ac\n  ├→ Δ>0: 2 soluzioni\n  ├→ Δ=0: soluzione doppia\n  └→ Δ<0: nessuna soluzione\n\nVuoi che la espanda?'],
  dom:['Domanda di verifica:\n\n❓ Dato ax²+bx+c=0, come si calcola il discriminante e cosa indica il suo valore?']
};
var ripTabMsgs = {
  appr:['Ciao Mario! Il punto debole è il <strong>discriminante con c negativo</strong>. Vuoi simulare un\'interrogazione o fare un quiz rapido?'],
  riass:['<strong>Riepilogo performance:</strong>\n✅ Punti forti: identificare a,b,c\n⚠️ Da migliorare: discriminante con c<0\n🔴 Critico: calcolare entrambe le soluzioni'],
  mappa:['<strong>Mappa — Eq. 2° grado:</strong>\nax²+bx+c=0 → Δ=b²−4ac\n  ├→ Δ>0: x₁ e x₂\n  ├→ Δ=0: x doppia\n  └→ Δ<0: nessuna'],
  dom:['Simulazione:\n\n❓ Dom.1: Spiega cos\'è il discriminante Δ e cosa indica il suo segno.']
};
var dLesAiIdx = 0;

// ── BANNER UPDATE ──
function updateDocBanners() {
  var isIta = CURR_MAT_DOC === 'ita';
  var matLbl = isIta ? '📚 Italiano' : '📐 Matematica';
  var argLbl = isIta ? 'Analisi del testo narrativo' : 'Equazioni e sistemi';
  var subLbl = isIta ? 'Testo narrativo — personaggi' : 'Equazioni di 2° grado';
  ['d-les-mat-lbl','d-es-mat-lbl','d-rip-mat-lbl','d-an-mat-lbl'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.textContent=matLbl;
  });
  ['d-les-arg-lbl','d-es-arg-lbl','d-rip-arg-lbl','d-an-arg-lbl'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.textContent=argLbl;
  });
  ['d-les-sub-lbl','d-es-sub-lbl'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.textContent=subLbl;
  });
  ['d-les-mat-ban','d-es-mat-ban','d-rip-mat-ban'].forEach(function(id){
    var b=document.getElementById(id); if(b) b.className='ban '+(isIta?'ban-mat ita':'ban-mat');
  });
  ['d-les-arg-ban','d-es-arg-ban','d-rip-arg-ban'].forEach(function(id){
    var b=document.getElementById(id); if(b) b.className='ban '+(isIta?'ban-arg ita':'ban-arg');
  });
  ['d-les-sub-ban','d-es-sub-ban'].forEach(function(id){
    var b=document.getElementById(id); if(b) b.className='ban '+(isIta?'ban-sub ita':'ban-sub');
  });
}

// ── DOCENTE: seleziona materia ──
function dSelMat(mat) {
  CURR_MAT_DOC = mat;
  var isIta = mat === 'ita';
  var ml=document.getElementById('prog-mat-list'), il=document.getElementById('prog-ita-list');
  if(ml) ml.style.display=isIta?'none':'block';
  if(il) il.style.display=isIta?'block':'none';
  var pt=document.getElementById('prog-title');
  if(pt) pt.textContent='Programma — '+(isIta?'4B Italiano':'3A Matematica');
  var bm=document.getElementById('prog-btn-mat'), bi=document.getElementById('prog-btn-ita');
  if(bm){bm.className=isIta?'btns':'btna'; bm.style.fontSize='10px';}
  if(bi){bi.className=isIta?'btna':'btns'; bi.style.fontSize='10px';}
  ['d-arg-list-mat','d-sub-list-mat'].forEach(function(id){var e=document.getElementById(id);if(e)e.style.display=isIta?'none':'block';});
  ['d-arg-list-ita','d-sub-list-ita'].forEach(function(id){var e=document.getElementById(id);if(e)e.style.display=isIta?'block':'none';});
  var ctx=document.getElementById('d-ctx-lbl');
  if(ctx) ctx.textContent=isIta?'4B · Italiano':'3A · Matematica';
  updateDocBanners();
  selProgArg(isIta?10:0);
  closeMo('mo-d-mat');
}

function dSelArg(nome) {
  ['d-les-arg-lbl','d-es-arg-lbl','d-rip-arg-lbl','d-an-arg-lbl'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.textContent=nome;
  });
  closeMo('mo-d-arg');
}

function dSelSub(nome) {
  ['d-les-sub-lbl','d-es-sub-lbl'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.textContent=nome;
  });
  closeMo('mo-d-sub');
}

// ── DOCENTE: Crea una Lezione ──
function dSelLesson(idx) {
  document.querySelectorAll('[id^="dll-"]').forEach(function(e){e.className='les-row-item';});
  var el=document.getElementById('dll-'+idx); if(el) el.className='les-row-item active';
  var d=LESSON_DATA[idx]; if(!d) return;
  var t=document.getElementById('d-les-det-title'); if(t) t.textContent=d.title;
  var s=document.getElementById('d-les-det-sub'); if(s) s.textContent=d.sub;
  var tag=document.getElementById('d-les-det-tag'); if(tag){tag.textContent=d.tag; tag.className='tag mla '+d.tagc;}
  var ctx=document.getElementById('d-les-ai-ctx'); if(ctx) ctx.textContent=d.title;
  addMsg('d-chat-les','Ho aggiornato il contesto: ora lavoriamo sulla <strong>'+d.title+'</strong>.','bot');
}

function dChatLes(msg) {
  addMsg('d-chat-les', msg, 'user');
  setTimeout(function(){
    addMsg('d-chat-les', R_LES_AI[dLesAiIdx % R_LES_AI.length], 'bot');
    dLesAiIdx++;
  }, 650);
}
function dChatLesSend() {
  var inp=document.getElementById('d-les-inp');
  var t=(inp.value||'').trim(); if(!t) return;
  inp.value=''; dChatLes(t);
}

// ── DOCENTE: Esercizi ──
function dEsOverview() {
  var ov=document.getElementById('d-es-ov'), det=document.getElementById('d-es-det');
  if(ov) ov.style.display='block';
  if(det) det.style.display='none';
  document.querySelectorAll('[id^="d-tex-"]').forEach(function(e){e.classList.remove('on');});
}

function dEsDetail(idx) {
  document.querySelectorAll('[id^="d-tex-"]').forEach(function(e){e.classList.remove('on');});
  var el=document.getElementById('d-tex-'+idx); if(el) el.classList.add('on');
  var ov=document.getElementById('d-es-ov'), det=document.getElementById('d-es-det');
  if(ov) ov.style.display='none';
  if(det) det.style.display='block';
  var isIta=CURR_MAT_DOC==='ita';
  var data=isIta?D_EX_DATA_ITA:D_EXDATA;
  var ex=data[idx]||data[0];
  var t=document.getElementById('d-ex-title'); if(t) t.textContent=ex.title;
  var tx=document.getElementById('d-ex-testo'); if(tx) tx.innerHTML=ex.tx;
  var ai=document.getElementById('d-ex-ai'); if(ai) ai.textContent=ex.ai;
  var kc=document.getElementById('ke-c'); if(kc) kc.textContent=ex.c;
  var kr=document.getElementById('ke-r'); if(kr) kr.textContent=ex.r;
  var kt=document.getElementById('ke-t'); if(kt) kt.textContent=ex.t;
  var ke=document.getElementById('ke-e'); if(ke) ke.textContent=ex.e;
  var kai=document.getElementById('ke-ai'); if(kai) kai.textContent=ex.ai;
}

// ── DOCENTE: Programma ──
function switchProgClasse(mat) { dSelMat(mat); }

function selProgArg(idx) {
  document.querySelectorAll('[id^="pda-"]').forEach(function(el){el.style.background='';});
  var selEl=document.getElementById('pda-'+idx)||document.getElementById('pda-ita-'+(idx-10));
  var isIta=idx>=10;
  if(selEl) selEl.style.background=isIta?'#F5F3FF':'var(--bpale)';
  var d=PROG_DATA[idx]; if(!d) return;
  var icon=document.getElementById('prog-det-icon'); if(icon) icon.textContent=d.icon;
  var title=document.getElementById('prog-det-title'); if(title) title.textContent=d.title;
  var obj=document.getElementById('prog-det-obj');
  if(obj) obj.innerHTML=d.obj.map(function(o,i){
    var col=i<2?'var(--green)':'var(--mu)', sym=i<2?'✓':'○';
    return '<div style="display:flex;gap:5px;font-size:11px;margin-bottom:4px;"><span style="color:'+col+';">'+sym+'</span>'+o+'</div>';
  }).join('');
}

function selProgLes(el) {
  var dd=document.getElementById('prog-doc-detail'); if(!dd) return;
  var isOpen=dd.style.display!=='none';
  dd.style.display=isOpen?'none':'block';
  el.style.background=isOpen?'':'var(--bpale)';
}

function dSelStud(name, avCls, avTxt) { dV('stud-det', name, avCls, avTxt); }

// ── STUDENTE: setSMat ──
function setSMat(mat) {
  CURR_MAT_STU = mat;
  var isIta=mat==='ita';
  var matLbl=isIta?'📚 Italiano':'📐 Matematica';
  var lbl=document.getElementById('s-mat-lbl'); if(lbl) lbl.textContent=matLbl;
  ['s-mat-ban','s-es-mat-ban','s-rip-mat-ban'].forEach(function(id){
    var b=document.getElementById(id); if(b) b.className='ban '+(isIta?'ban-mat ita':'ban-mat');
  });
  ['s-studio-mat-lbl','s-es-mat-lbl','s-rip-mat-lbl'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.textContent=matLbl;
  });
  var tag=document.getElementById('s-ai-tag'); if(tag) tag.textContent=matLbl;
  var ml=document.getElementById('s-arg-list-mat'), il=document.getElementById('s-arg-list-ita');
  if(ml) ml.style.display=isIta?'none':'block';
  if(il) il.style.display=isIta?'block':'none';
  sSelArg(isIta?'Analisi del testo narrativo':'Equazioni e sistemi');
}

function sSelArg(nome) {
  var isIta=CURR_MAT_STU==='ita';
  var banCls=isIta?'ban ban-arg ita':'ban ban-arg';
  ['s-arg-ban','s-es-arg-ban','s-rip-arg-ban'].forEach(function(id){
    var b=document.getElementById(id); if(b) b.className=banCls;
  });
  ['s-studio-arg-lbl','s-es-arg-lbl','s-rip-arg-lbl'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.textContent=nome;
  });
  closeMo('mo-s-arg');
}

function sSeSel(ses) {
  var el=document.getElementById('s-es-ses-lbl'); if(el) el.textContent='Sessione — '+ses;
  closeMo('mo-s-ses');
}

function sSelLesson(idx) {
  document.querySelectorAll('[id^="s-ll-"]').forEach(function(e){e.className='les-row-item';});
  var el=document.getElementById('s-ll-'+idx); if(el) el.className='les-row-item active';
  var names=['Lez.1 — Introduzione','Lez.2 — Il discriminante Δ','Lez.3 — Formula completa'];
  var badges=['Completata','In corso','Da fare']; var badgeCls=['tg','ta','tl'];
  var nome=names[idx]||names[0];
  var t=document.getElementById('s-les-title'); if(t) t.textContent=nome;
  var b=document.getElementById('s-les-badge'); if(b){b.textContent=badges[idx]||'—'; b.className='tag mla '+(badgeCls[idx]||'tl');}
  addMsg('s-msgs-studio','Hai selezionato <strong>'+nome+'</strong>. Cosa vuoi fare?','bot');
}

function sSelDoc(el, nome) {
  document.querySelectorAll('#s-docs-list > div').forEach(function(e){e.style.background='';});
  el.style.background='var(--bpale)';
  addMsg('s-msgs-studio','Hai selezionato <strong>'+nome+'</strong>. Posso approfondire, riassumere o fare domande su questo documento.','bot');
}

function sSelEx(el, idx) {
  document.querySelectorAll('[id^="s-tex-"]').forEach(function(e){e.classList.remove('on');});
  el.classList.add('on');
  var isIta=CURR_MAT_STU==='ita';
  var data=isIta?S_EX_DATA_ITA:S_EXDATA;
  var ex=data[idx]||data[0];
  var t=document.getElementById('s-es-title'); if(t) t.textContent=ex.title;
  var tx=document.getElementById('s-es-testo'); if(tx) tx.innerHTML=ex.tx;
  var tag=document.getElementById('s-es-tag'); if(tag){tag.textContent=ex.tag; tag.className='tag mla '+ex.tagc;}
  var fb=document.getElementById('s-es-fb'); if(fb) fb.style.display=ex.fb?'block':'none';
  var ans=document.getElementById('s-es-ans'); if(ans) ans.value='';
  if(ex.fb) addMsg('s-msgs-esercizi','Hai commesso un errore al tentativo precedente. Vuoi un suggerimento? 💪','bot');
  else addMsg('s-msgs-esercizi','Hai selezionato <strong>'+ex.title+'</strong>. Scrivi il tuo svolgimento!','bot');
}

function sAnalyze() {
  var ans=(document.getElementById('s-es-ans')||{}).value||'';
  if(!ans.trim()){alert('Scrivi prima il tuo procedimento!'); return;}
  var fb=document.getElementById('s-es-fb');
  if(fb){fb.style.display='block'; fb.innerHTML='<div class="fblbl">⏳ Analisi AI in corso...</div>';}
  setTimeout(function(){
    if(fb) fb.innerHTML='<div class="fblbl">✅ Feedback AI</div>Il metodo è corretto! Hai trovato Δ al punto b), ma manca x₂ = (−3−5)/4 = −2.';
    addMsg('s-msgs-esercizi','Il discriminante è corretto (Δ=25), ma stai dimenticando x₂. Ricorda: ± dà DUE soluzioni.','bot');
  }, 1200);
}

// ── STUDENTE: AI tabs studio ──
function stuSelTab(tab) {
  document.querySelectorAll('[id^="s-tab-"]').forEach(function(t){t.classList.remove('on');});
  var active=document.getElementById('s-tab-'+tab); if(active) active.classList.add('on');
  var titles={appr:'AI — Approfondisci',riass:'AI — Riassunto',mappa:'AI — Mappa',dom:'AI — Domande'};
  var subs={appr:'Analisi approfondita',riass:'Sintesi strutturata',mappa:'Mappa concettuale',dom:'Domande di verifica'};
  var ti=document.getElementById('s-ai-title'); if(ti) ti.textContent=titles[tab]||'AI';
  var si=document.getElementById('s-ai-sub'); if(si) si.textContent=subs[tab]||'';
  var msgsEl=document.getElementById('s-msgs-studio');
  if(msgsEl && aiTabMsgs[tab]){
    msgsEl.innerHTML='';
    aiTabMsgs[tab].forEach(function(txt){
      var d=document.createElement('div'); d.className='msg bot';
      d.innerHTML=txt.replace(/\n/g,'<br>'); msgsEl.appendChild(d);
    });
    msgsEl.scrollTop=msgsEl.scrollHeight;
  }
}

// ── STUDENTE: AI tabs ripasso ──
function ripSelTab(tab) {
  document.querySelectorAll('[id^="rip-tab-"]').forEach(function(t){t.classList.remove('on');});
  var active=document.getElementById('rip-tab-'+tab); if(active) active.classList.add('on');
  var titles={appr:'AI — Approfondisci',riass:'AI — Riassunto',mappa:'AI — Mappa',dom:'AI — Domande'};
  var ti=document.getElementById('rip-ai-title'); if(ti) ti.textContent=titles[tab]||'AI';
  var msgsEl=document.getElementById('s-msgs-ripasso');
  if(msgsEl && ripTabMsgs[tab]){
    msgsEl.innerHTML='';
    ripTabMsgs[tab].forEach(function(txt){
      var d=document.createElement('div'); d.className='msg bot';
      d.innerHTML=txt.replace(/\n/g,'<br>'); msgsEl.appendChild(d);
    });
    msgsEl.scrollTop=msgsEl.scrollHeight;
  }
}

// ── STUDENTE: invia studio ──
function sSendStudio(msg) { sChat('studio', msg); }

// Override sChat to support ITA
var _origSChat = sChat;
function sChat(type, txt) {
  var msgsId = 's-msgs-' + type;
  if (txt) addMsg(msgsId, txt, 'user');
  var isIta = CURR_MAT_STU === 'ita';
  var maps = {
    studio:   isIta ? R_STUDIO_ITA   : R_STUDIO,
    esercizi: isIta ? R_ESERCIZI_ITA : R_ESERCIZI,
    ripasso:  isIta ? R_RIPASSO_ITA  : R_RIPASSO
  };
  var arr = maps[type] || R_STUDIO;
  var k = 'sc_' + type;
  if (!sChat._idx) sChat._idx = {};
  if (!sChat._idx[k]) sChat._idx[k] = 0;
  setTimeout(function(){
    addMsg(msgsId, arr[sChat._idx[k] % arr.length], 'bot');
    sChat._idx[k]++;
  }, 650);
}

function sChatSend(type) {
  var inp = document.getElementById('s-inp-' + type);
  var t = (inp||{}).value; if (t) t = t.trim(); if (!t) return;
  inp.value = ''; sChat(type, t);
}

// ── CHAT DOCENTE ──
function openChatDocente() { openMo('mo-chat-docente'); }
function inviaDocente() {
  var inp=document.getElementById('chat-doc-inp');
  var t=(inp.value||'').trim(); if(!t) return;
  inp.value=''; addMsg('chat-doc-msgs', t, 'user');
  setTimeout(function(){ addMsg('chat-doc-msgs','✅ Messaggio inviato. Risposta entro 24h.','bot'); }, 600);
}