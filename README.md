# YOUR BEST — Struttura Progetto

## Come aprire
1. Decomprimi lo zip → apri la cartella `yb` in **VS Code**
2. Tasto destro su `index.html` → **Open with Live Server**
3. Oppure: `python3 -m http.server 3000` dalla cartella `yb`

**Credenziali demo:**
- Docente: `giulia.rossi@liceo.it`  
- Studente: `mario.rossi@liceo.it`

## Struttura
```
yb/
├── index.html               ← Entry point (redirect a login)
├── assets/
│   ├── style.css            ← CSS globale (colori, layout, componenti)
│   ├── data.js              ← Dati demo e risposte AI simulate
│   ├── api.js               ← Connessione backend Spring Boot ← LAVORI QUI
│   └── app.js               ← Navigazione e logica interazioni
└── pages/
    ├── auth/
    │   ├── login.html       ← Login + Registrazione
    │   └── onboarding.html  ← Selezione classe docente
    ├── docente/
    │   ├── dashboard.html
    │   ├── programma.html
    │   ├── crea-lezione.html
    │   ├── esercizi.html    ← include anche dettaglio studente + report
    │   ├── analisi.html
    │   ├── verifica.html    ← include anche verifica studente
    │   └── ripasso.html
    └── studente/
        ├── home.html
        ├── studio.html
        ├── esercizi.html
        ├── ripasso.html
        ├── verifica.html
        └── performance.html
```

## Collegare Spring Boot (api.js)
```javascript
var BASE_URL = 'http://localhost:8080'; // ← il tuo URL

// Login reale:
api.login(email, password).then(function(res) {
  api.setToken(res.token);
  // redirect in base a res.role
});

// Chat AI reale:
api.chat(conversationId, message, subjectId, topicId)
  .then(function(res) { addMsg('s-msgs-studio', res.response, 'bot'); });
```
