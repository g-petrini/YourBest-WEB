// YOUR BEST — Dati demo e risposte AI
// Modifica qui i contenuti senza toccare la logica

// ============================================================
// YOUR BEST DEMO — JavaScript (single, no duplicates)
// ============================================================

// ── STATE ──
var loginRole = 'doc';
var lzCount = 1;
var fVal = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
var verCur = 0, verDone = [], timerSec = 2700, timerInt = null;
var aiIdx = { dchat: 0, sstudio: 0, sesercizi: 0, sripasso: 0 };
var chartsInited = { danalisi: false, dver: false, drep: false, drvr: false, sperfd: false, sripc: false };

// ── EXERCISE DATA ──
var D_EXDATA = [
  { title: 'Esercizio 1 — Formula risolutiva', tx: 'Risolvi le equazioni. Calcola Δ = b²−4ac.<br><strong>a)</strong> x²−5x+6=0 &nbsp;<strong>b)</strong> 2x²+3x−2=0', ai: '3 su 5 studenti hanno commesso errori nel discriminante al punto b). Errore: segno di −4ac.', c: 21, r: 1, t: '3.2', e: '58%' },
  { title: 'Esercizio 2 — Analisi discriminante', tx: 'Calcola Δ e classifica le soluzioni.<br><strong>a)</strong> x²+4x+4=0 &nbsp;<strong>b)</strong> x²+1=0', ai: '4 su 5 studenti hanno classificato correttamente.', c: 20, r: 0, t: '2.1', e: '22%' },
  { title: 'Esercizio 3 — Equazioni con frazioni', tx: 'Risolvi: (x+1)/(x-2) = 3/(x-2)+1. Indica le condizioni di esistenza.', ai: '3/5 studenti dimenticano le condizioni di esistenza.', c: 15, r: 2, t: '4.1', e: '71%' },
  { title: 'Esercizio 4 — Sistemi (bozza)', tx: 'Risolvi il sistema: { 2x + y = 7 · { x − y = 2', ai: '—', c: 0, r: 0, t: '—', e: '—' }
];

var S_EXDATA = [
  { title: 'Esercizio 1 — Formula risolutiva', tx: 'Risolvi le equazioni. Calcola Δ = b²−4ac.<br><strong>a)</strong> x²−5x+6=0 &nbsp;<strong>b)</strong> 2x²+3x−2=0', tag: 'Errori presenti', tagc: 'te', fb: true },
  { title: 'Esercizio 2 — Analisi discriminante', tx: 'Calcola Δ e classifica le soluzioni.<br><strong>a)</strong> x²+4x+4=0 &nbsp;<strong>b)</strong> x²+1=0', tag: 'Corretto ✓', tagc: 'tg', fb: false },
  { title: 'Esercizio 3 — Problemi applicativi', tx: 'Un\'area rettangolare ha perimetro 28 cm. La lunghezza è 4 cm più della larghezza. Trova le dimensioni.', tag: 'Da svolgere', tagc: 'tl', fb: false },
  { title: 'Esercizio 4 — Sostituzione', tx: 'Risolvi il sistema: { 2x + y = 7<br>{ x − y = 2', tag: 'Da svolgere', tagc: 'tl', fb: false }
];

var VER_QS = [
  '1. Risolvi la seguente equazione di 2° grado. Mostra tutti i passaggi e verifica:<br><br>x² − 5x + 6 = 0',
  '2. Per 2x²+3x−2=0 calcola il discriminante e spiega quante soluzioni reali ha.',
  '3. Risolvi il sistema:<br>{ 2x + y = 7<br>{ x − y = 2<br><br>Verifica le soluzioni.',
  '4. Un\'area rettangolare ha perimetro 28 cm. La lunghezza è 4 cm più della larghezza. Imposta e risolvi un\'equazione di 2° grado.'
];

// ── AI RESPONSES ──
var R_DCHAT = [
  'Struttura consigliata:\n① Ripasso Eq. 1° grado (5 min)\n② Intuizione geometrica del discriminante\n③ Δ = b² − 4ac step-by-step\n④ Casi: Δ>0, Δ=0, Δ<0\n⑤ 3 esempi crescenti\n\nVuoi che sviluppi uno di questi punti?',
  'Esempi pratici:\n💡 x²−5x+6=0 → Δ=1 → x=3, x=2\n💡 x²−4x+4=0 → Δ=0 → x=2 (doppia)\n💡 x²+x+1=0 → Δ=−3 → nessuna sol.\n\nVuoi che crei esercizi simili?',
  'Errori più comuni:\n🔴 Dimenticare x₂ dopo x₁\n🔴 Sbagliare il segno di −4ac quando c<0\n🟡 Non verificare le soluzioni\n🟡 Confondere Δ=0 con Δ<0\n\nConsiglio: fai esercitare con c negativo!'
];

var R_STUDIO = [
  'Il discriminante Δ = b²−4ac è il "semaforo" delle equazioni:\n🟢 Δ>0 → 2 soluzioni reali distinte\n🟡 Δ=0 → 1 soluzione doppia\n🔴 Δ<0 → nessuna soluzione reale\n\nVuoi che faccia un esempio?',
  'Schema riassuntivo:\nFORMULA: x = (−b ± √Δ) / 2a\ndove Δ = b²−4ac\n\nPassaggi:\n① Identifica a, b, c\n② Calcola Δ\n③ Se Δ≥0 → calcola x₁ e x₂\n④ Verifica le soluzioni',
  'Esempio con x²−5x+6=0:\na=1, b=−5, c=6\nΔ = 25 − 24 = 1\nx₁ = (5+1)/2 = 3\nx₂ = (5−1)/2 = 2\nVerifica: 9−15+6=0 ✓',
  'Se Δ<0 → nessuna soluzione reale! Geometricamente la parabola non tocca l\'asse x. Esempio: x²+1=0 ha Δ=−4<0.'
];

var R_ESERCIZI = [
  'Suggerimento punto b): hai a=2, b=3, c=−2.\nΔ = 3² − 4·2·(−2) = 9 + 16 = 25.\nAttenzione: −4·2·(−2) è POSITIVO!\nOra calcola x₁ E x₂ usando ±.',
  'Riepilogo: x = (−b ± √Δ) / 2a. Il ± ti dà DUE valori. Non dimenticare mai x₂!',
  'Il tuo metodo è corretto! Procedi con Δ e poi la formula con entrambe le soluzioni.'
];

var R_RIPASSO = [
  '🎤 Prima domanda simulazione:\n"Spiega cos\'è il discriminante e cosa indica il suo segno sulle soluzioni."\n\nPrenditi il tempo che vuoi!',
  'Quiz rapido:\n1) Calcola Δ per x²−5x+6=0\n2) Quante soluzioni ha x²+4x+4=0?\n3) x²+1=0 ha soluzioni reali?\n4) Calcola x₁ e x₂ per 2x²+3x−2=0\n\nRispondi quando sei pronto!',
  'Schema:\nax²+bx+c=0 → Δ=b²−4ac\n• Δ>0 → 2 soluzioni reali\n• Δ=0 → soluzione doppia\n• Δ<0 → nessuna soluzione',
  '📝 Simulazione verifica (50 min):\n1. x²−7x+10=0\n2. 2x²+3x−2=0\n3. x²+2x+1=0\n4. Sistema: {x+y=5, xy=6}\n\nBuona fortuna! ✍️',
  'Tuoi punti deboli:\n🔴 Calcolo Δ quando c è negativo\n🟡 Calcolare ENTRAMBE le soluzioni\n🟢 Identificazione a,b,c: ottimo!'
];