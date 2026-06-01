// YOUR BEST — API Layer → Spring Boot
// 1. Imposta BASE_URL col tuo endpoint
// 2. Sostituisci le risposte simulate in app.js con le chiamate api.*

var api = (function() {
  BASE_URL_API = 'http://localhost:8080';
  var token = sessionStorage.getItem('yb_token') || '';
  function h() { return {'Content-Type':'application/json','Authorization':token?'Bearer '+token:''}; }
  function post(p,b){ return fetch(BASE_URL_API+p,{method:'POST',headers:h(),body:JSON.stringify(b)}).then(r=>r.json()); }
  function get(p){ return fetch(BASE_URL_API+p,{method:'GET',headers:h()}).then(r=>r.json()); }
  return {
    // POST /api/auth/login  →  { token, role, name }
    login:          function(e,p)      { return post('/api/auth/login',{email:e,password:p}); },
    // POST /api/chat  →  { response: string }
    chat:           function(cid,msg,sid,tid){ return post('/api/chat',{conversationId:cid,message:msg,subjectId:sid,topicId:tid}); },
    // POST /api/exercises/submit  →  { feedback, score }
    submitExercise: function(eid,sid,ans){ return post('/api/exercises/submit',{exerciseId:eid,studentId:sid,answer:ans}); },
    // GET  /api/exercises?topicId=...
    getExercises:   function(tid)      { return get('/api/exercises?topicId='+tid); },
    // GET  /api/exercises/{id}/report
    getReport:      function(eid)      { return get('/api/exercises/'+eid+'/report'); },
    // POST /api/teacher/chat  →  { response }
    teacherChat:    function(lid,msg)  { return post('/api/teacher/chat',{lessonId:lid,message:msg}); },
    // GET  /api/students/{id}/performance
    getPerformance: function(sid)      { return get('/api/students/'+sid+'/performance'); },
    setToken:       function(t)        { token=t; sessionStorage.setItem('yb_token',t); },
    // GET /api/teaching-assignments/my → classi e materie del docente
    getMyAssignments: function() { return get('/api/teaching-assignments/my'); },
  };
})();
