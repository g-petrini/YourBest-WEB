import { useEffect } from "react";

// ── INJECT FONTS ──
(function() {
  if (!document.getElementById('yb-fonts')) {
    const l = document.createElement('link');
    l.id = 'yb-fonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }
  if (!document.getElementById('yb-chartjs')) {
    const s = document.createElement('script');
    s.id = 'yb-chartjs';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
    document.head.appendChild(s);
  }
  if (!document.getElementById('yb-styles')) {
    const st = document.createElement('style');
    st.id = 'yb-styles';
    st.textContent = `
:root{
  --navy:#0A1628;--navy2:#112038;
  --blue:#1E6BFF;--blue2:#4D8DFF;--bpale:#EEF4FF;
  --green:#059669;--gold:#F59E0B;--red:#DC2626;
  --sur:#F5F7FB;--bor:#E4E9F2;--tx:#0A1628;--mu:#64748B;
  --sw:228px;
}
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;font-family:'Plus Jakarta Sans',sans-serif;background:var(--sur);color:var(--tx);overflow:hidden;}
/* SCREENS */
.pg{position:absolute;inset:0;display:none;flex-direction:column;}
.pg.on{display:flex;}
@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.fu{animation:fadeUp .22s ease forwards;}
/* ROLE SWITCHER */
#rsw{position:fixed;top:10px;right:14px;z-index:9999;display:none;gap:5px;background:rgba(10,22,40,.9);border-radius:20px;padding:4px;border:1px solid rgba(255,255,255,.1);}
#rsw.on{display:flex;}
.rb{padding:5px 13px;border-radius:16px;border:none;font-family:inherit;font-size:11px;font-weight:700;cursor:pointer;color:rgba(255,255,255,.38);background:transparent;transition:.2s;}
.rb.on{background:var(--blue);color:#fff;}
.rb.ong{background:var(--green);color:#fff;}
/* AUTH */
.auth{background:var(--navy);align-items:center;justify-content:center;overflow-y:auto;}
.auth::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 800px 600px at 20% 50%,rgba(30,107,255,.15),transparent 70%),radial-gradient(ellipse 500px 700px at 80% 20%,rgba(5,150,105,.08),transparent 70%);pointer-events:none;}
.acard{background:rgba(255,255,255,.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:42px 48px;width:480px;position:relative;z-index:1;box-shadow:0 40px 80px rgba(0,0,0,.5);margin:20px;}
.logo{display:flex;align-items:center;gap:11px;margin-bottom:34px;}
.logo-icon{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--blue),var(--blue2));display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 8px 20px rgba(30,107,255,.4);}
.logo-txt{font-family:"Clash Display",sans-serif;font-size:22px;font-weight:700;color:#fff;letter-spacing:.5px;}
.logo-sub{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.5px;}
.ah1{font-family:"Clash Display",sans-serif;font-size:22px;color:#fff;margin-bottom:4px;}
.ah2{font-size:12px;color:rgba(255,255,255,.4);margin-bottom:26px;}
.albl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:rgba(255,255,255,.38);margin-bottom:5px;margin-top:14px;}
.ainp{width:100%;padding:11px 14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#fff;font-family:inherit;font-size:13px;outline:none;transition:.2s;}
.ainp:focus{border-color:var(--blue);}
.ainp::placeholder{color:rgba(255,255,255,.2);}
.ainp-s{width:100%;padding:9px 12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);border-radius:9px;color:#fff;font-family:inherit;font-size:12px;outline:none;margin-bottom:9px;transition:.2s;}
.ainp-s:focus{border-color:var(--blue);}
.ainp-s::placeholder{color:rgba(255,255,255,.18);}
.abtn{width:100%;padding:13px;background:linear-gradient(135deg,var(--blue),var(--blue2));border:none;border-radius:11px;color:#fff;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;margin-top:18px;transition:.15s;}
.abtn:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(30,107,255,.4);}
.alnk{background:none;border:none;color:rgba(255,255,255,.35);font-family:inherit;font-size:12px;cursor:pointer;width:100%;text-align:center;margin-top:11px;display:block;transition:.2s;}
.alnk:hover{color:var(--blue2);}
.anote{font-size:10px;color:rgba(255,255,255,.18);text-align:center;margin-top:15px;}
.rchips{display:flex;gap:6px;margin-bottom:20px;}
.rc{flex:1;padding:10px 5px;border-radius:10px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.38);font-size:11px;cursor:pointer;text-align:center;transition:.2s;font-family:inherit;}
.rc.on{border-color:var(--blue);background:rgba(30,107,255,.18);color:#93C5FD;font-weight:600;}
.rci{font-size:17px;display:block;margin-bottom:3px;}
.rgsec{font-size:10px;font-weight:700;color:rgba(255,255,255,.25);letter-spacing:.8px;text-transform:uppercase;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,.06);margin:12px 0 9px;}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.regf{display:none;}
.regf.on{display:block;}
.minor{background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.2);border-radius:9px;padding:12px;margin:6px 0 10px;}
.minor-t{font-size:11px;color:var(--gold);font-weight:700;margin-bottom:7px;}
.msopts{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;}
.msopt{padding:4px 10px;border-radius:16px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:rgba(255,255,255,.4);font-size:11px;cursor:pointer;transition:.2s;font-family:inherit;}
.msopt.on{border-color:var(--blue);background:rgba(30,107,255,.18);color:#93C5FD;font-weight:600;}
/* APP SHELL */
.shell{display:flex;height:100vh;overflow:hidden;}
.sb{width:var(--sw);background:var(--navy);display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.06);flex-shrink:0;}
.sb-top{padding:12px 13px 10px;border-bottom:1px solid rgba(255,255,255,.06);}
.sb-logo{display:flex;align-items:center;gap:7px;margin-bottom:8px;}
.sb-li{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--blue),var(--blue2));display:flex;align-items:center;justify-content:center;font-size:12px;}
.sb-lt{font-family:"Clash Display",sans-serif;font-size:14px;color:#fff;letter-spacing:.5px;}
.rcard{border-radius:10px;padding:9px 10px;display:flex;align-items:center;gap:8px;margin-bottom:7px;}
.rcd{background:linear-gradient(135deg,rgba(30,107,255,.2),rgba(30,107,255,.07));border:1px solid rgba(30,107,255,.25);}
.rcs{background:linear-gradient(135deg,rgba(5,150,105,.2),rgba(5,150,105,.07));border:1px solid rgba(5,150,105,.25);}
.rav{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;}
.rav-d{background:linear-gradient(135deg,#F59E0B,#D97706);}
.rav-s{background:linear-gradient(135deg,var(--blue),var(--blue2));}
.rname{font-size:12px;font-weight:700;color:#fff;}
.rsub{font-size:9px;color:rgba(255,255,255,.35);margin-top:1px;}
.rbadge{margin-left:auto;font-size:9px;font-weight:700;border-radius:4px;padding:2px 6px;letter-spacing:.4px;flex-shrink:0;}
.rbadge-d{background:rgba(245,158,11,.17);color:#FCD34D;border:1px solid rgba(245,158,11,.28);}
.rbadge-s{background:rgba(5,150,105,.17);color:#6EE7B7;border:1px solid rgba(5,150,105,.28);}
.cpill{border-radius:7px;padding:7px 10px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:.2s;}
.cpill-d{background:rgba(30,107,255,.1);border:1px solid rgba(30,107,255,.18);}
.cpill-d:hover{background:rgba(30,107,255,.18);}
.cpill-s{background:rgba(5,150,105,.1);border:1px solid rgba(5,150,105,.18);}
.cpill-s:hover{background:rgba(5,150,105,.18);}
.cpnm{font-size:11px;font-weight:700;}
.cpnm-d{color:#93C5FD;}
.cpnm-s{color:#6EE7B7;}
.cpa{font-size:9px;color:rgba(147,197,253,.4);}
.sb-nav{flex:1;overflow-y:auto;padding:6px;}
.nl{font-size:9px;font-weight:700;color:rgba(255,255,255,.16);letter-spacing:1px;text-transform:uppercase;padding:8px 7px 3px;}
.ni{display:flex;align-items:center;gap:7px;padding:7px 8px;border-radius:8px;cursor:pointer;color:rgba(255,255,255,.4);font-size:12px;font-weight:500;transition:.2s;margin-bottom:1px;}
.ni:hover{background:rgba(255,255,255,.06);color:#fff;}
.ni.on{background:rgba(30,107,255,.18);color:#93C5FD;}
.ni.on.g{background:rgba(5,150,105,.18);color:#6EE7B7;}
.sg{background:rgba(30,107,255,.05);border:1px solid rgba(30,107,255,.12);border-radius:9px;padding:4px;margin-top:2px;}
.sg.g{background:rgba(5,150,105,.05);border-color:rgba(5,150,105,.12);}
.nis{display:flex;align-items:center;gap:7px;padding:7px 8px;border-radius:7px;cursor:pointer;color:rgba(255,255,255,.42);font-size:12px;font-weight:500;transition:.2s;margin-bottom:1px;}
.nis:last-child{margin-bottom:0;}
.nis:hover{background:rgba(255,255,255,.06);color:#fff;}
.nis.on{background:rgba(37,99,235,.3);color:#93C5FD;font-weight:600;}
.nis.on.g{background:rgba(5,150,105,.28);color:#6EE7B7;}
.nico{font-size:13px;width:15px;text-align:center;flex-shrink:0;}
.nbg{margin-left:auto;background:var(--gold);color:#fff;font-size:9px;font-weight:700;border-radius:8px;padding:1px 5px;}
.nbr{margin-left:auto;background:var(--red);color:#fff;font-size:9px;font-weight:700;border-radius:8px;padding:1px 5px;}
.nbgr{margin-left:auto;background:var(--green);color:#fff;font-size:9px;font-weight:700;border-radius:8px;padding:1px 5px;}
.sb-foot{padding:8px 12px;border-top:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between;}
.nbt{position:relative;background:none;border:none;cursor:pointer;font-size:14px;color:rgba(255,255,255,.35);}
.nbtd{position:absolute;top:0;right:0;width:6px;height:6px;background:var(--gold);border-radius:50%;border:2px solid var(--navy);}
.logbtn{background:none;border:none;cursor:pointer;font-family:inherit;font-size:11px;color:rgba(255,255,255,.2);display:flex;align-items:center;gap:3px;}
/* MAIN */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.tb{height:58px;background:#fff;border-bottom:1px solid var(--bor);display:flex;align-items:center;padding:0 20px;flex-shrink:0;}
.pgtit{font-family:"Clash Display",sans-serif;font-size:16px;color:var(--navy);flex:1;}
.pgsub{font-size:10px;color:var(--mu);margin-top:1px;}
.cnt{flex:1;overflow-y:auto;padding:15px 18px;}
/* VIEWS */
.vw{display:none;}
.vw.on{display:block;}
/* COMPONENTS */
.apill{display:flex;align-items:center;background:var(--blue);border-radius:9px;overflow:hidden;cursor:pointer;box-shadow:0 3px 12px rgba(30,107,255,.22);margin-bottom:12px;user-select:none;}
.apill:hover{box-shadow:0 5px 18px rgba(30,107,255,.32);}
.apill-t{flex:1;text-align:center;font-size:13px;font-weight:700;color:#fff;padding:9px 14px;}
.apill-btn{background:rgba(0,0,0,.18);padding:9px 12px;font-size:14px;color:#fff;border-left:1px solid rgba(255,255,255,.13);}
.krow{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:13px;}
.kc{background:#fff;border-radius:11px;border:1px solid var(--bor);padding:12px 14px;box-shadow:0 1px 5px rgba(0,0,0,.04);}
.kico{font-size:16px;margin-bottom:4px;}
.kval{font-family:"Clash Display",sans-serif;font-size:21px;font-weight:700;color:var(--navy);line-height:1;}
.klbl{font-size:10px;color:var(--mu);margin-top:2px;}
.kdelta{font-size:10px;margin-top:3px;font-weight:600;}
.up{color:var(--green);}
.wa{color:#92400E;}
.dn{color:var(--red);}
.card{background:#fff;border-radius:12px;border:1px solid var(--bor);box-shadow:0 1px 5px rgba(0,0,0,.04);overflow:hidden;}
.ch{padding:11px 14px;border-bottom:1px solid var(--bor);display:flex;align-items:center;gap:7px;}
.ct{font-size:13px;font-weight:700;color:var(--navy);}
.mla{margin-left:auto;}
.tag{display:inline-flex;align-items:center;padding:2px 7px;border-radius:5px;font-size:10px;font-weight:700;}
.tg{background:#D1FAE5;color:#065F46;}
.ta{background:#DBEAFE;color:#1E40AF;}
.tl{background:#F3F4F6;color:#6B7280;}
.tw{background:#FFFBEB;color:#92400E;}
.te{background:#FEE2E2;color:#991B1B;}
.btns{padding:5px 11px;border-radius:7px;border:1.5px solid var(--bor);background:#fff;font-family:inherit;font-size:11px;font-weight:600;color:var(--navy);cursor:pointer;transition:.2s;}
.btns:hover{border-color:var(--blue);color:var(--blue);}
.btna{padding:5px 11px;border-radius:7px;border:none;background:var(--blue);font-family:inherit;font-size:11px;font-weight:700;color:#fff;cursor:pointer;transition:.2s;}
.btna:hover{background:var(--blue2);}
/* TREE */
.tp{background:#fff;border-radius:12px;border:1px solid var(--bor);display:flex;flex-direction:column;overflow:hidden;}
.tph{padding:10px 12px;border-bottom:1px solid var(--bor);display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.tpt{font-size:12px;font-weight:700;color:var(--navy);}
.tpb{flex:1;overflow-y:auto;padding:4px;}
.ta2{border-radius:8px;margin-bottom:3px;border:1.5px solid var(--bor);overflow:hidden;}
.ta2.open{border-color:#93C5FD;}
.tar{padding:8px 10px;display:flex;align-items:center;gap:6px;cursor:pointer;background:#fff;transition:.15s;}
.tar:hover{background:var(--sur);}
.ta2.open .tar{background:#DBEAFE;}
.tan{font-size:11px;font-weight:600;flex:1;color:var(--navy);}
.ta2.open .tan{color:#1E40AF;}
.tarr{font-size:9px;color:var(--mu);transition:.2s;}
.ta2.open .tarr{transform:rotate(90deg);}
.tsubs{display:none;border-top:1px solid var(--bor);background:#FAFBFD;}
.ta2.open .tsubs{display:block;}
.tsb{padding:7px 10px 7px 22px;display:flex;align-items:center;gap:6px;font-size:11px;color:#6B7280;border-bottom:1px solid rgba(0,0,0,.04);font-weight:600;}
.tsb.on{color:#1E40AF;background:rgba(30,107,255,.05);}
.tsb.dn{color:#065F46;}
.tle{padding:5px 10px 5px 36px;display:flex;align-items:center;gap:6px;cursor:pointer;font-size:10px;color:var(--mu);border-bottom:1px solid rgba(0,0,0,.03);transition:.15s;}
.tle:hover{background:var(--sur);}
.tle.on{background:rgba(30,107,255,.04);color:var(--blue);}
.tle.dn{color:var(--green);}
.tle.lk{color:#9CA3AF;cursor:not-allowed;opacity:.5;}
.tex{padding:7px 10px 7px 22px;display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;border-bottom:1px solid rgba(0,0,0,.03);transition:.15s;}
.tex:hover{background:var(--sur);}
.tex.on{background:#DBEAFE;}
.texn{width:18px;height:18px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0;}
.tnok{background:#D1FAE5;color:#065F46;}
.tner{background:#FEE2E2;color:#991B1B;}
.tntd{background:#F3F4F6;color:#6B7280;}
.texnm{flex:1;color:var(--navy);font-weight:500;font-size:11px;}
/* AI CHAT */
.aic{background:#fff;border-radius:12px;border:1px solid var(--bor);display:flex;flex-direction:column;}
.aich{padding:10px 13px;border-bottom:1px solid var(--bor);display:flex;align-items:center;gap:7px;flex-shrink:0;}
.aidot{width:7px;height:7px;border-radius:50%;background:#10B981;flex-shrink:0;}
.ait{font-size:12px;font-weight:700;color:var(--navy);}
.ais{font-size:10px;color:var(--mu);}
.aimsgs{overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px;}
.msg{max-width:84%;padding:8px 12px;border-radius:12px;font-size:12px;line-height:1.55;white-space:pre-wrap;}
.msg.bot{background:var(--sur);color:var(--tx);border-bottom-left-radius:4px;align-self:flex-start;border:1px solid var(--bor);}
.msg.user{background:var(--blue);color:#fff;border-bottom-right-radius:4px;align-self:flex-end;}
.qrow{padding:0 10px 7px;display:flex;flex-wrap:wrap;gap:4px;flex-shrink:0;}
.qbtn{padding:4px 9px;border-radius:14px;border:1px solid var(--bor);background:#fff;font-family:inherit;font-size:10px;font-weight:600;color:var(--mu);cursor:pointer;white-space:nowrap;transition:.2s;}
.qbtn:hover{border-color:var(--blue);color:var(--blue);background:var(--bpale);}
.ai-irow{padding:7px 10px;border-top:1px solid var(--bor);display:flex;gap:5px;flex-shrink:0;}
.ai-inp{flex:1;padding:7px 10px;border-radius:8px;border:1.5px solid var(--bor);font-family:inherit;font-size:12px;outline:none;resize:none;transition:.2s;}
.ai-inp:focus{border-color:var(--blue);}
.ai-snd{padding:7px 12px;border-radius:8px;background:var(--blue);border:none;color:#fff;font-size:12px;cursor:pointer;}
/* MISC */
.ebar{display:flex;align-items:center;gap:7px;margin-bottom:6px;}
.elbl{font-size:11px;color:var(--navy);flex-shrink:0;width:86px;}
.ebg{flex:1;height:6px;background:var(--bor);border-radius:3px;overflow:hidden;}
.efill{height:100%;border-radius:3px;}
.epct{width:25px;font-size:10px;color:var(--mu);text-align:right;flex-shrink:0;}
.srow{display:flex;align-items:center;gap:7px;padding:8px 0;border-bottom:1px solid var(--bor);cursor:pointer;transition:.15s;}
.srow:hover{background:var(--sur);margin:0 -14px;padding:8px 14px;}
.srow:last-child{border-bottom:none;}
.sav{width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0;}
.ag{background:#D1FAE5;color:#065F46;}
.ab{background:#DBEAFE;color:#1E40AF;}
.ay{background:#FFFBEB;color:#92400E;}
.ar{background:#FEE2E2;color:#991B1B;}
.ap{background:#EDE9FE;color:#5B21B6;}
.snm{flex:1;font-size:12px;color:var(--navy);font-weight:500;}
.sbar{width:58px;height:4px;background:var(--bor);border-radius:2px;overflow:hidden;flex-shrink:0;}
.sbf{height:100%;border-radius:2px;}
.spct{font-size:10px;color:var(--mu);width:26px;text-align:right;flex-shrink:0;}
.aiins{background:var(--bpale);border:1.5px solid #93C5FD;border-radius:10px;padding:10px 12px;}
.aiinst{font-size:10px;font-weight:700;color:#1E40AF;margin-bottom:3px;}
.aiinsb{font-size:11px;color:var(--tx);line-height:1.55;}
.tbtn{padding:5px 10px;border-radius:7px;border:1px solid var(--bor);background:#fff;font-family:inherit;font-size:11px;font-weight:600;color:var(--mu);cursor:pointer;display:flex;align-items:center;gap:4px;transition:.2s;}
.tbtn:hover{border-color:var(--blue);color:var(--blue);}
.verans{width:100%;min-height:100px;padding:10px;border:1.5px solid var(--bor);border-radius:8px;font-family:inherit;font-size:12px;resize:vertical;outline:none;transition:.2s;}
.verans:focus{border-color:var(--blue);}
.fbcard{border-radius:9px;padding:9px 11px;margin-top:7px;font-size:11px;line-height:1.55;}
.fbok{background:#D1FAE5;border:1px solid #6EE7B7;color:#065F46;}
.fber{background:#FEE2E2;border:1px solid #FCA5A5;color:#991B1B;}
.fblbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px;}
.pi{border-radius:9px;padding:9px 11px;margin-bottom:6px;border:1px solid;}
.piok{background:#D1FAE5;border-color:#6EE7B7;}
.pier{background:#FEE2E2;border-color:#FCA5A5;}
.piwa{background:#FFFBEB;border-color:#FDE68A;}
.pilbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px;}
.pilbl.ok{color:#065F46;}
.pilbl.er{color:#991B1B;}
.pilbl.wa{color:#92400E;}
.bbtn{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:7px;border:1.5px solid var(--bor);background:#fff;font-family:inherit;font-size:11px;font-weight:600;color:var(--mu);cursor:pointer;transition:.2s;margin-bottom:11px;}
.bbtn:hover{border-color:var(--blue);color:var(--blue);}
.vqd{width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;cursor:pointer;border:1.5px solid var(--bor);background:var(--sur);color:var(--mu);}
.vqd.done{background:#D1FAE5;border-color:#6EE7B7;color:#065F46;}
.vqd.curr{background:var(--navy);color:#fff;border-color:var(--navy);}
/* MODALS */
.mo{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:500;backdrop-filter:blur(6px);}
.mo.open{display:flex;}
.mbox{background:#fff;border-radius:18px;padding:22px 24px;width:440px;box-shadow:0 28px 56px rgba(0,0,0,.22);animation:fadeUp .2s ease;max-height:88vh;overflow-y:auto;}
.mbox.w{width:600px;}
.mt{font-family:"Clash Display",sans-serif;font-size:15px;color:var(--navy);margin-bottom:2px;}
.ms{font-size:11px;color:var(--mu);margin-bottom:14px;}
.ml{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--mu);margin-bottom:4px;margin-top:10px;}
.mi{width:100%;padding:9px 11px;border:1.5px solid var(--bor);border-radius:8px;font-family:inherit;font-size:12px;outline:none;margin-bottom:9px;transition:.2s;color:var(--navy);}
.mi:focus{border-color:var(--blue);}
.mpill{background:var(--blue);border-radius:7px;padding:8px 12px;font-size:11px;font-weight:700;color:#fff;margin-bottom:9px;}
.lzl{border:1.5px solid var(--bor);border-radius:8px;overflow:hidden;margin-bottom:9px;}
.lzi{display:flex;align-items:center;gap:6px;padding:7px 10px;border-bottom:1px solid var(--bor);font-size:11px;}
.lzi:last-child{border-bottom:none;}
.lzn{width:19px;height:19px;border-radius:4px;background:#DBEAFE;color:#1E40AF;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0;}
.mact{display:flex;gap:6px;justify-content:flex-end;margin-top:11px;}
.popup{position:fixed;bottom:15px;right:15px;background:var(--navy);color:#fff;border-radius:12px;padding:12px 15px;width:260px;box-shadow:0 12px 30px rgba(0,0,0,.3);z-index:100;animation:fadeUp .3s ease;cursor:pointer;}
.popup.off{display:none;}
.poptop{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;}
.poptit{font-size:11px;font-weight:700;}
.popx{background:none;border:none;color:rgba(255,255,255,.28);cursor:pointer;font-size:11px;}
.popbody{font-size:10px;color:rgba(255,255,255,.45);line-height:1.45;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-thumb{background:rgba(0,0,0,.1);border-radius:2px;}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .shell { flex-direction: column; height: 100vh; }
  .sb { width: 100% !important; height: auto; flex-direction: row; border-right: none; border-bottom: 1px solid rgba(255,255,255,.06); }
  .sb-top { padding: 8px 12px; border-bottom: none; }
  .rcard { display: none; }
  .sbnav { display: none; }
  .sb-foot { padding: 6px 12px; }
  .main { flex: 1; overflow: hidden; }
  .tb { height: 50px; padding: 0 14px; }
  .cnt { padding: 12px 14px; }
  .krow { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 900px) {
  [style*="218px"] { display: flex !important; flex-direction: column !important; }
}
@media (max-width: 600px) {
  .acard { padding: 26px 20px !important; width: 100% !important; margin: 10px !important; border-radius: 18px !important; }
  .krow { grid-template-columns: 1fr 1fr !important; gap: 7px !important; }
  .grid2 { grid-template-columns: 1fr !important; }
  .cnt { padding: 10px 12px !important; }
  #rsw { top: 5px; right: 8px; }
  .tb { height: 46px; }
}
`;
    document.head.appendChild(st);
  }
})();

// ── ALL DATA + LOGIC ──

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

// ── PAGE ROUTING ──
function showPage(id) {
  document.querySelectorAll('.pg').forEach(function(p) { p.classList.remove('on'); });
  var el = document.getElementById(id);
  if (el) el.classList.add('on');
}

function doLogin() {
  var email = (document.getElementById('l-email') || {}).value || '';
  loginRole = email.indexOf('mario') !== -1 ? 'stu' : 'doc';
  document.getElementById('rsw').classList.add('on');
  document.getElementById('rbd').classList.toggle('on', loginRole === 'doc');
  document.getElementById('rbs').classList.toggle('on', loginRole === 'stu');
  if (loginRole === 'doc') { showPage('pg-onboarding'); } 
  else { showPage('pg-stu'); sV('home'); }
  setTimeout(function() {
    var p = document.getElementById(loginRole === 'doc' ? 'pop-doc' : 'pop-stu');
    if (p) setTimeout(function() { p.classList.add('off'); }, 5000);
  }, 100);
}

function switchRole(r) {
  loginRole = r;
  document.getElementById('rbd').classList.toggle('on', r === 'doc');
  document.getElementById('rbs').classList.toggle('on', r === 'stu');
  if (r === 'doc') { showPage('pg-onboarding'); }
  else { showPage('pg-stu'); sV('home'); }
}

function setLoginRole(el, role) {
  el.closest('#login-chips').querySelectorAll('.rc').forEach(function(c) { c.classList.remove('on'); });
  el.classList.add('on');
  var emailMap = { doc: 'giulia.rossi@liceo.it', stu: 'mario.rossi@liceo.it', ist: 'admin@einstein.edu.it' };
  var em = document.getElementById('l-email');
  if (em) em.value = emailMap[role] || '';
}

function setRegRole(el, role) {
  el.closest('#reg-chips').querySelectorAll('.rc').forEach(function(c) { c.classList.remove('on'); });
  el.classList.add('on');
  document.querySelectorAll('.regf').forEach(function(f) { f.classList.remove('on'); });
  var rf = document.getElementById('rf-' + role);
  if (rf) rf.classList.add('on');
}

// ── DOCENTE VIEWS ──
function dV(v, name, avCls, avTxt, voto) {
  document.querySelectorAll('#d-cnt .vw').forEach(function(el) { el.classList.remove('on'); });
  var el = document.getElementById('dv-' + v);
  if (el) { el.classList.add('on', 'fu'); setTimeout(function() { el.classList.remove('fu'); }, 250); }
  document.querySelectorAll('#pg-doc .ni, #pg-doc .nis').forEach(function(n) { n.classList.remove('on'); });
  var nmap = { dash: 'dn-dash', prog: 'dn-prog', studio: 'dn-studio', esercizi: 'dn-esercizi', analisi: 'dn-analisi', verifica: 'dn-verifica' };
  var ni = document.getElementById(nmap[v]);
  if (ni) ni.classList.add('on');
  var titles = { dash: 'Dashboard', prog: 'Programma Didattico', studio: 'Studio', esercizi: 'Esercizi', 'stud-det': 'Dettaglio studente', analisi: 'Analisi Classe', verifica: 'Verifica', 'ver-stud': 'Verifica studente', 'rep-es': 'Report performance', 'rep-ver': 'Report classe' };
  var t = document.getElementById('d-tit');
  if (t) t.textContent = titles[v] || v;
  if (v === 'analisi') setTimeout(initAnalisiCharts, 150);
  if (v === 'verifica') setTimeout(initVerChart, 150);
  if (v === 'rep-es') setTimeout(initRepChart, 150);
  if (v === 'rep-ver') setTimeout(initRvrChart, 150);
  if (v === 'stud-det' && name) {
    var av = document.getElementById('sd-av');
    if (av) { av.className = 'sav ' + (avCls || 'ag'); av.textContent = avTxt || '??'; }
    var nm = document.getElementById('sd-nm');
    if (nm) nm.textContent = name + ' — Esercizio 1';
  }
  if (v === 'ver-stud' && name) {
    var av2 = document.getElementById('vs-av');
    if (av2) { av2.className = 'sav ' + (avCls || 'ag'); av2.textContent = avTxt || '??'; }
    var nm2 = document.getElementById('vs-nm');
    if (nm2) nm2.textContent = name + ' — Verifica';
    var vt = document.getElementById('vs-voto');
    if (vt) vt.textContent = 'Voto: ' + (voto || '?') + '/10';
  }
}

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
function sV(v) {
  document.querySelectorAll('#s-cnt .vw').forEach(function(el) { el.classList.remove('on'); });
  var el = document.getElementById('sv-' + v);
  if (el) { el.classList.add('on', 'fu'); setTimeout(function() { el.classList.remove('fu'); }, 250); }
  document.querySelectorAll('#pg-stu .ni, #pg-stu .nis').forEach(function(n) { n.classList.remove('on'); });
  var nmap = { home: 'sn-home', studio: 'sn-studio', esercizi: 'sn-esercizi', ripasso: 'sn-ripasso', verifica: 'sn-verifica', perf: 'sn-perf' };
  var ni = document.getElementById(nmap[v]);
  if (ni) ni.classList.add('on');
  var titles = { home: 'Home', studio: 'Studio', esercizi: 'Esercizi', ripasso: 'Ripasso', verifica: 'Verifica', perf: 'Le mie performance' };
  var t = document.getElementById('s-tit');
  if (t) t.textContent = titles[v] || v;
  if (v === 'perf') setTimeout(initPerfCharts, 150);
  if (v === 'ripasso') setTimeout(initRipChart, 150);
}

function setSMat(m) {
  var lbl = document.getElementById('s-mat-lbl');
  if (lbl) lbl.textContent = m;
  var albl = document.getElementById('s-arg-lbl');
  if (albl) albl.textContent = m + ' — ' + (m.indexOf('Mat') !== -1 ? 'Equazioni di 2° grado' : 'Principi di Newton');
}

function sSelLes(el, nm) {
  document.querySelectorAll('.tle').forEach(function(l) { l.classList.remove('on'); });
  if (!el.classList.contains('lk')) el.classList.add('on');
  var t = document.getElementById('s-les-t');
  if (t) t.textContent = nm;
}

function sSelDoc(el, nm) {
  var mats = ['mat-pdf', 'mat-ppt', 'mat-vid'];
  mats.forEach(function(id) {
    var m = document.getElementById(id);
    if (m) { m.style.background = ''; m.style.border = ''; }
  });
  el.style.background = 'var(--bpale)';
  el.style.border = '1px solid #93C5FD';
  el.style.borderRadius = '7px';
  addMsg('s-msgs-studio', 'Ho selezionato "' + nm + '". Vuoi che approfondisca questo documento specifico, o preferisci lavorare sull\'intera lezione?', 'bot');
}

function sSelEx(el, idx) {
  document.querySelectorAll('.tex').forEach(function(r) { r.classList.remove('on'); });
  el.classList.add('on');
  var e = S_EXDATA[idx];
  if (!e) return;
  var t = document.getElementById('s-es-t'); if (t) t.textContent = e.title;
  var tx = document.getElementById('s-es-tx'); if (tx) tx.innerHTML = e.tx;
  var tag = document.getElementById('s-es-tag');
  if (tag) { tag.className = 'tag ' + e.tagc + ' mla'; tag.textContent = e.tag; }
  var ans = document.getElementById('s-es-ans'); if (ans) ans.value = '';
  var fb = document.getElementById('s-es-fb');
  if (fb) fb.style.display = e.fb ? 'block' : 'none';
}

function sAnalyze() {
  var ans = document.getElementById('s-es-ans');
  if (!ans || !ans.value.trim()) { alert('Scrivi prima il tuo procedimento!'); return; }
  var fb = document.getElementById('s-es-fb');
  if (fb) {
    fb.style.display = 'block';
    fb.className = 'fbcard fber';
    fb.innerHTML = '<div class="fblbl">⏳ Analisi AI in corso...</div>';
    setTimeout(function() {
      fb.innerHTML = '<div class="fblbl">⚠️ Feedback AI</div>Il metodo è corretto! Hai trovato Δ al punto b), ma manca x₂ = (−3−5)/4 = −2. Ricorda: la formula dà SEMPRE due soluzioni (±). Non fermarti alla prima!';
    }, 1300);
  }
}

// ── STUDENTE AI CHAT ──
function sChat(type, txt) {
  addMsg('s-msgs-' + type, txt, 'user');
  var rmap = { studio: R_STUDIO, esercizi: R_ESERCIZI, ripasso: R_RIPASSO };
  var arr = rmap[type];
  if (!arr) return;
  setTimeout(function() {
    addMsg('s-msgs-' + type, arr[aiIdx['s' + type] % arr.length], 'bot');
    aiIdx['s' + type]++;
  }, 650);
}

function sChatSend(type) {
  var inp = document.getElementById('s-inp-' + type);
  var t = (inp || {}).value.trim();
  if (!t) return;
  inp.value = '';
  sChat(type, t);
}

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

function enterDashboard() {
  var ctx = obClasses[obSelected].ctx;
  var lbl = document.getElementById('d-ctx-lbl');
  if (lbl) lbl.textContent = ctx;
  showPage('pg-doc');
  dV('dash');
  document.getElementById('rsw').classList.add('on');
  document.getElementById('rbd').classList.add('on');
  document.getElementById('rbs').classList.remove('on');
  setTimeout(function() {
    var p = document.getElementById('pop-doc');
    if (p) setTimeout(function() { p.classList.add('off'); }, 5000);
  }, 100);
}


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


// ── EXPORT TO WINDOW (so JSX onClick refs resolve) ──
Object.assign(window, {
  showPage, doLogin, switchRole, setLoginRole, setRegRole,
  dV, sV, togArg, dSelLes, openLesChat, closeLesChat,
  dSelEx, selPdArg, addLes, doAddLes, dChat, dChatSend,
  setSMat, sSelLes, sSelDoc, sSelEx, sAnalyze,
  sChat, sChatSend, startTimer, verNav, doConsegna,
  insF, renderF, insFormula, openMo, closeMo,
  selObClass, enterDashboard, addMsg,
  initAnalisiCharts, initVerChart, initRepChart,
  initRvrChart, initPerfCharts, initRipChart,
});

// ── ROOT COMPONENT ──
export default function YourBest() {
  useEffect(() => {
    // modal backdrop
    document.querySelectorAll('.mo').forEach(m => {
      m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
    });
    // chat enter-key
    [
      ['d-chat-inp',     () => dChatSend()],
      ['s-inp-studio',   () => sChatSend('studio')],
      ['s-inp-esercizi', () => sChatSend('esercizi')],
      ['s-inp-ripasso',  () => sChatSend('ripasso')],
    ].forEach(([id, fn]) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); fn(); }
      });
    });
    startTimer();
    renderF('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');
    // auto-hide popups
    setTimeout(() => {
      ['pop-doc','pop-stu'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('off');
      });
    }, 6000);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

<div id="rsw">
  <button className="rb on" id="rbd" onClick={() => { switchRole('doc') }}>👨‍🏫 Docente</button>
  <button className="rb" id="rbs" onClick={() => { switchRole('stu') }}>👨‍🎓 Studente</button>
</div>


<div id="pg-login" className="pg on auth">
  <div className="acard">
    <div className="logo">
      <div className="logo-icon">⭐</div>
      <div><div className="logo-txt">YOUR BEST</div><div className="logo-sub">PIATTAFORMA E-LEARNING</div></div>
    </div>
    <div className="ah1">Bentornato</div>
    <div className="ah2">Accedi al tuo account</div>
    <div className="albl">Seleziona ruolo</div>
    <div className="rchips" id="login-chips">
      <div className="rc on" onClick={() => { setLoginRole(this,'doc') }}><span className="rci">👨‍🏫</span>Docente</div>
      <div className="rc" onClick={() => { setLoginRole(this,'stu') }}><span className="rci">👨‍🎓</span>Studente</div>
      <div className="rc" onClick={() => { setLoginRole(this,'ist') }}><span className="rci">🏫</span>Istituzione</div>
    </div>
    <div className="albl">Email</div>
    <input className="ainp" id="l-email" type="email" placeholder="email@liceo.it" value="giulia.rossi@liceo.it"/>
    <div className="albl" style={{marginTop: "10px"}}>Password</div>
    <input className="ainp" type="password" placeholder="••••••••" value="password"/>
    <button className="abtn" onClick={() => { doLogin() }}>Accedi →</button>
    <button className="alnk" onClick={() => { showPage('pg-register') }}>Non hai un account? Registrati</button>
    <div className="anote">Demo · giulia.rossi (docente) · mario.rossi (studente)</div>
  </div>
</div>


<div id="pg-register" className="pg auth" style={{overflowY: "auto"}}>
  <div className="acard" style={{width: "500px", maxWidth: "96vw"}}>
    <div className="logo" style={{marginBottom: "22px"}}>
      <div className="logo-icon">⭐</div>
      <div><div className="logo-txt">YOUR BEST</div><div className="logo-sub">PIATTAFORMA E-LEARNING</div></div>
    </div>
    <div className="ah1">Crea il tuo account</div>
    <div className="ah2" style={{marginBottom: "20px"}}>Seleziona il ruolo per personalizzare la registrazione</div>
    <div className="rchips" id="reg-chips">
      <div className="rc on" onClick={() => { setRegRole(this,'stu') }}><span className="rci">👨‍🎓</span>Studente</div>
      <div className="rc" onClick={() => { setRegRole(this,'doc') }}><span className="rci">👨‍🏫</span>Docente</div>
      <div className="rc" onClick={() => { setRegRole(this,'ist') }}><span className="rci">🏫</span>Istituzione</div>
    </div>
    
    <div id="rf-stu" className="regf on">
      <div className="rgsec">Dati anagrafici</div>
      <div className="grid2">
        <div><div className="albl">Nome</div><input className="ainp-s" placeholder="Mario"/></div>
        <div><div className="albl">Cognome</div><input className="ainp-s" placeholder="Rossi"/></div>
        <div><div className="albl">Data di nascita</div><input className="ainp-s" type="date"/></div>
        <div><div className="albl">Codice fiscale</div><input className="ainp-s" placeholder="RSSMRA00..."/></div>
      </div>
      <div className="rgsec">Dati scolastici</div>
      <div className="albl">Istituto</div>
      <select className="ainp-s" style={{background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)"}}>
        <option>Liceo Scientifico Einstein — Roma</option>
        <option>Liceo Classico Virgilio — Roma</option>
      </select>
      <div className="grid2">
        <div><div className="albl">Classe</div>
          <select className="ainp-s" style={{background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)"}}>
            <option>3ª A</option><option>3ª B</option><option>4ª A</option>
          </select>
        </div>
        <div><div className="albl">Anno scolastico</div>
          <select className="ainp-s" style={{background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)"}}>
            <option>2025/2026</option>
          </select>
        </div>
      </div>
      <div className="minor">
        <div className="minor-t">⚠️ Studente minorenne — Autorizzazione genitori</div>
        <div className="grid2">
          <div><div className="albl">Nome genitore</div><input className="ainp-s" placeholder="Giuseppe"/></div>
          <div><div className="albl">Cognome</div><input className="ainp-s" placeholder="Rossi"/></div>
        </div>
        <div className="albl">Email genitore</div>
        <input className="ainp-s" placeholder="genitore@email.it"/>
        <div style={{border: "1.5px dashed rgba(255,255,255,.15)", borderRadius: "8px", padding: "10px", textAlign: "center", fontSize: "11px", color: "rgba(255,255,255,.28)", cursor: "pointer"}}>📎 Carica documento di autorizzazione</div>
      </div>
      <div className="rgsec">Credenziali di accesso</div>
      <div className="grid2">
        <div><div className="albl">Email</div><input className="ainp-s" placeholder="mario@email.it"/></div>
        <div><div className="albl">Password</div><input className="ainp-s" type="password" placeholder="••••••••"/></div>
      </div>
    </div>
    
    <div id="rf-doc" className="regf">
      <div className="rgsec">Dati anagrafici</div>
      <div className="grid2">
        <div><div className="albl">Nome</div><input className="ainp-s" placeholder="Giulia"/></div>
        <div><div className="albl">Cognome</div><input className="ainp-s" placeholder="Rossi"/></div>
      </div>
      <div className="albl">Email istituzionale</div>
      <input className="ainp-s" placeholder="g.rossi@liceo.it"/>
      <div className="rgsec">Dati professionali</div>
      <div className="albl">Scuola</div>
      <select className="ainp-s" style={{background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)"}}>
        <option>Liceo Scientifico Einstein — Roma</option>
        <option>ITIS Galileo Ferraris — Milano</option>
      </select>
      <div className="grid2">
        <div><div className="albl">Ruolo</div>
          <select className="ainp-s" style={{background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)"}}>
            <option>Docente titolare</option><option>Supplente</option>
          </select>
        </div>
        <div><div className="albl">Grado</div>
          <select className="ainp-s" style={{background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.7)"}}>
            <option>Liceo</option><option>Scuola media</option>
          </select>
        </div>
      </div>
      <div className="albl">Materie insegnate</div>
      <div className="msopts">
        <div className="msopt on" onClick={() => { this.classList.toggle('on') }}>Matematica</div>
        <div className="msopt" onClick={() => { this.classList.toggle('on') }}>Fisica</div>
        <div className="msopt" onClick={() => { this.classList.toggle('on') }}>Italiano</div>
        <div className="msopt" onClick={() => { this.classList.toggle('on') }}>Storia</div>
        <div className="msopt" onClick={() => { this.classList.toggle('on') }}>Scienze</div>
      </div>
      <div className="rgsec">Credenziali di accesso</div>
      <div className="grid2">
        <div><div className="albl">Email</div><input className="ainp-s" placeholder="g.rossi@liceo.it"/></div>
        <div><div className="albl">Password</div><input className="ainp-s" type="password" placeholder="••••••••"/></div>
      </div>
    </div>
    
    <div id="rf-ist" className="regf">
      <div className="rgsec">Dati istituzione</div>
      <div className="albl">Nome istituto</div>
      <input className="ainp-s" placeholder="Liceo Scientifico Einstein"/>
      <div className="grid2">
        <div><div className="albl">Codice meccanografico</div><input className="ainp-s" placeholder="RMPS01000"/></div>
        <div><div className="albl">Città</div><input className="ainp-s" placeholder="Roma"/></div>
      </div>
      <div className="albl">Email amministrativa</div>
      <input className="ainp-s" placeholder="segreteria@liceo.edu.it"/>
      <div className="grid2">
        <div><div className="albl">Password</div><input className="ainp-s" type="password" placeholder="••••••••"/></div>
        <div><div className="albl">Conferma password</div><input className="ainp-s" type="password" placeholder="••••••••"/></div>
      </div>
    </div>
    <button className="abtn" onClick={() => { showPage('pg-login') }}>Completa registrazione →</button>
    <button className="alnk" onClick={() => { showPage('pg-login') }}>← Torna al login</button>
  </div>
</div>

<div id="pg-onboarding" className="pg auth">
  <div className="acard" style={{width: "560px", maxWidth: "96vw"}}>
    <div className="logo" style={{marginBottom: "28px"}}>
      <div className="logo-icon">⭐</div>
      <div><div className="logo-txt">YOUR BEST</div><div className="logo-sub">PIATTAFORMA E-LEARNING</div></div>
    </div>
    <div className="ah1">Benvenuta, Giulia 👋</div>
    <div className="ah2" style={{marginBottom: "26px"}}>Seleziona la classe con cui vuoi lavorare oggi. Potrai cambiare in qualsiasi momento dalla sidebar.</div>
    <div id="ob-classes" style={{display: "flex", flexDirection: "column", gap: "9px", marginBottom: "22px"}}>
      
      <div className="ob-cls on" id="ob-0" onClick={() => { selObClass(0) }} style={{padding: "14px 16px", borderRadius: "12px", border: "2px solid var(--blue)", background: "rgba(30,107,255,.18)", display: "flex", alignItems: "center", gap: "13px", cursor: "pointer", transition: ".2s"}}>
        <div style={{width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg,#1E6BFF,#4D8DFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", flexShrink: 0}}>📐</div>
        <div style={{flex: 1}}>
          <div style={{fontSize: "14px", fontWeight: 700, color: "#fff"}}>3ª A — Matematica</div>
          <div style={{fontSize: "11px", color: "rgba(255,255,255,.45)", marginTop: "2px"}}>5 studenti · Liceo Scientifico Einstein</div>
        </div>
        <div id="ob-chk-0" style={{width: "22px", height: "22px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", flexShrink: 0}}>✓</div>
      </div>
      
      <div className="ob-cls" id="ob-1" onClick={() => { selObClass(1) }} style={{padding: "14px 16px", borderRadius: "12px", border: "2px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)", display: "flex", alignItems: "center", gap: "13px", cursor: "pointer", transition: ".2s"}}>
        <div style={{width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg,#7C3AED,#6D28D9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", flexShrink: 0}}>📚</div>
        <div style={{flex: 1}}>
          <div style={{fontSize: "14px", fontWeight: 700, color: "#fff"}}>4ª B — Filosofia</div>
          <div style={{fontSize: "11px", color: "rgba(255,255,255,.45)", marginTop: "2px"}}>22 studenti · Liceo Scientifico Einstein</div>
        </div>
        <div id="ob-chk-1" style={{width: "22px", height: "22px", borderRadius: "50%", border: "2px solid rgba(255,255,255,.2)", flexShrink: 0}}></div>
      </div>
    </div>
    <button className="abtn" style={{marginTop: 0}} onClick={() => { enterDashboard() }}>Entra nella dashboard →</button>
  </div>
</div>


<div id="pg-doc" className="pg">
  <div className="shell">
    <nav className="sb">
      <div className="sb-top">
        <div className="sb-logo"><div className="sb-li">⭐</div><div className="sb-lt">YOUR BEST</div></div>
        <div className="rcard rcd">
          <div className="rav rav-d">GR</div>
          <div><div className="rname">Giulia Rossi</div><div className="rsub">Liceo Einstein · Roma</div></div>
          <span className="rbadge rbadge-d">DOCENTE</span>
        </div>
        <div className="cpill cpill-d" onClick={() => { openMo('mo-ctx') }}>
          <div style={{display: "flex", alignItems: "center", gap: "5px"}}><div style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--blue)"}}></div><span className="cpnm cpnm-d" id="d-ctx-lbl">3A · Matematica</span></div>
          <span className="cpa">cambia ▾</span>
        </div>
      </div>
      <div className="sb-nav">
        <div className="nl">Panoramica</div>
        <div className="ni on" id="dn-dash" onClick={() => { dV('dash') }}><span className="nico">🏠</span>Dashboard</div>
        <div className="ni" id="dn-prog" onClick={() => { dV('prog') }}><span className="nico">📋</span>Programma didattico</div>
        <div className="nl" style={{marginTop: "4px"}}>Sezioni</div>
        <div className="sg">
          <div className="nis" id="dn-studio" onClick={() => { dV('studio') }}><span className="nico">📚</span>Studio</div>
          <div className="nis" id="dn-esercizi" onClick={() => { dV('esercizi') }}><span className="nico">✏️</span>Esercizi<span className="nbg">5</span></div>
          <div className="nis" id="dn-analisi" onClick={() => { dV('analisi') }}><span className="nico">📊</span>Analisi Classe</div>
          <div className="nis" id="dn-verifica" onClick={() => { dV('verifica') }}><span className="nico">📝</span>Verifica<span className="nbr">2</span></div>
        </div>
      </div>
      <div className="sb-foot"><button className="nbt">🔔<div className="nbtd"></div></button><button className="logbtn" onClick={() => { showPage('pg-login') }}>↩ Esci</button></div>
    </nav>
    <div className="main">
      <div className="tb"><div><div className="pgtit" id="d-tit">Dashboard</div><div className="pgsub">Prof.ssa Giulia Rossi · 20 Marzo 2026</div></div></div>
      <div className="cnt" id="d-cnt">

        
        <div id="dv-dash" className="vw on">
          <div style={{background: "linear-gradient(135deg,var(--navy),#1A3A5C)", borderRadius: "13px", padding: "18px 22px", marginBottom: "13px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden"}}>
            <div style={{position: "absolute", right: "-10px", top: "-10px", width: "110px", height: "110px", borderRadius: "50%", background: "rgba(30,107,255,.12)"}}></div>
            <div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "19px", color: "#fff", marginBottom: "2px"}}>Buongiorno, Giulia 👋</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.42)"}}>Classe 3A · Matematica · Argomento in corso: Equazioni di 2° grado</div></div>
            <div style={{fontSize: "34px", position: "relative", zIndex: 1}}>🏫</div>
          </div>
          <div className="apill" onClick={() => { openMo('mo-arg') }}><div className="apill-t">📐 Equazioni di 2° grado</div><div className="apill-btn">▾</div></div>
          <div className="krow">
            <div className="kc"><div className="kico">👨‍🎓</div><div className="kval">5</div><div className="klbl">Studenti attivi</div><div className="kdelta up">tutti presenti</div></div>
            <div className="kc"><div className="kico">✏️</div><div className="kval">68%</div><div className="klbl">Completamento esercizi</div><div className="kdelta wa">1 in ritardo</div></div>
            <div className="kc"><div className="kico">🎯</div><div className="kval">74%</div><div className="klbl">Autonomia media</div><div className="kdelta up">↑ vs prec.</div></div>
            <div className="kc"><div className="kico">⚠️</div><div className="kval">3</div><div className="klbl">Lacune: discriminante</div><div className="kdelta dn">richiede attenzione</div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "13px"}}>
            <div style={{background: "#FFFBEB", border: "1.5px solid #FDE68A", borderRadius: "11px", padding: "12px 14px"}}>
              <div style={{fontSize: "11px", fontWeight: 700, color: "#92400E", marginBottom: "7px"}}>✏️ Da fare — Esercizi</div>
              <div style={{fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: "6px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>5 esercizi</strong> da rivedere su Eq. 2° grado</span></div>
              <div style={{fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: "6px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Marco G.</strong> ha richiesto feedback</span></div>
              <div style={{fontSize: "11px", padding: "4px 0", display: "flex", gap: "6px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Anna V.</strong> in ritardo — scad. ieri</span></div>
            </div>
            <div style={{background: "#FEE2E2", border: "1.5px solid #FCA5A5", borderRadius: "11px", padding: "12px 14px"}}>
              <div style={{fontSize: "11px", fontWeight: 700, color: "#991B1B", marginBottom: "7px"}}>📝 Da fare — Verifiche</div>
              <div style={{fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: "6px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--red)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Verifica Eq. e Sistemi</strong> — 5 elaborati</span></div>
              <div style={{fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: "6px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--red)", flexShrink: 0, marginTop: "3px"}}></span><span>Scadenza voti: <strong>25/03</strong></span></div>
              <div style={{fontSize: "11px", padding: "4px 0", display: "flex", gap: "6px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--red)", flexShrink: 0, marginTop: "3px"}}></span><span>Report di classe da generare</span></div>
            </div>
          </div>
          <div className="card">
            <div className="ch"><span style={{fontSize: "14px"}}>💬</span><div className="ct">Messaggi dalla classe — 3A</div><button className="btns mla">Vedi tutti</button></div>
            <div style={{padding: "0 14px"}}>
              <div className="srow"><div style={{width: "7px", height: "7px", borderRadius: "50%", background: "var(--blue)", flexShrink: 0}}></div><div className="sav ay">MG</div><div style={{flex: 1}}><div style={{fontSize: "11px", fontWeight: 700}}>Marco Galli</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Non capisco il passaggio b²−4ac, può spiegarmelo?</div></div><div style={{fontSize: "10px", color: "var(--mu)"}}>14:22</div></div>
              <div className="srow"><div style={{width: "7px", height: "7px", borderRadius: "50%", background: "var(--blue)", flexShrink: 0}}></div><div className="sav ab">SF</div><div style={{flex: 1}}><div style={{fontSize: "11px", fontWeight: 700}}>Sara Ferri</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Ho finito l'esercizio 2, posso avere un feedback?</div></div><div style={{fontSize: "10px", color: "var(--mu)"}}>ieri</div></div>
              <div className="srow" style={{border: "none"}}><div style={{width: "7px", height: "7px", borderRadius: "50%", background: "transparent", flexShrink: 0}}></div><div className="sav ar">AV</div><div style={{flex: 1}}><div style={{fontSize: "11px", fontWeight: 700}}>Anna Vitale</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Sono assente domani, posso consegnare in ritardo?</div></div><div style={{fontSize: "10px", color: "var(--mu)"}}>ieri</div></div>
            </div>
          </div>
        </div>

        
        <div id="dv-prog" className="vw">
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px"}}><div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "15px", color: "var(--navy)"}}>Programma — 3A Matematica</div><div style={{fontSize: "10px", color: "var(--mu)"}}>A.S. 2025/2026</div></div><button className="btna" onClick={() => { openMo('mo-new-arg') }}>+ Nuovo argomento</button></div>
          <div style={{display: "grid", gridTemplateColumns: "260px 1fr", gap: "13px", height: "calc(100vh - 58px - 90px)"}}>
            <div className="tp">
              <div className="tph"><div className="tpt">Argomenti</div></div>
              <div style={{flex: 1, overflowY: "auto"}}>
                <div id="pda-0" style={{padding: "11px 13px", borderBottom: "1px solid var(--bor)", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", background: "var(--bpale)"}} onClick={() => { selPdArg(0) }}><div style={{fontSize: "13px"}}>📐</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 700}}>Equazioni e sistemi</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Gen–Mar 2026 · In corso</div></div><div style={{fontSize: "11px", background: "#DBEAFE", color: "#1E40AF", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>🔵</div></div>
                <div id="pda-1" style={{padding: "11px 13px", borderBottom: "1px solid var(--bor)", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer"}} onClick={() => { selPdArg(1) }}><div style={{fontSize: "13px"}}>📏</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 700}}>Geometria analitica</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Apr–Mag 2026</div></div><div style={{fontSize: "11px"}}>⚪</div></div>
                <div id="pda-2" style={{padding: "11px 13px", borderBottom: "1px solid var(--bor)", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer"}} onClick={() => { selPdArg(2) }}><div style={{fontSize: "13px"}}>📈</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 700}}>Funzioni e grafici</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Mag–Giu 2026</div></div><div style={{fontSize: "11px"}}>⚪</div></div>
                <div style={{padding: "11px 13px", cursor: "pointer", textAlign: "center"}} onClick={() => { openMo('mo-new-arg') }}><span style={{fontSize: "12px", fontWeight: 700, color: "var(--blue)"}}>+ Aggiungi argomento</span></div>
              </div>
            </div>
            <div className="card" id="pd-det" style={{overflowY: "auto"}}>
              <div className="ch"><span style={{fontSize: "14px"}}>📐</span><div className="ct" id="pd-title">Equazioni e sistemi</div><button className="btns mla">Modifica</button></div>
              <div style={{padding: "12px 14px"}}>
                <div style={{fontSize: "10px", fontWeight: 700, color: "var(--mu)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "6px"}}>Obiettivi didattici</div>
                <div id="pd-obj">
                  <div style={{display: "flex", gap: "5px", fontSize: "11px", marginBottom: "4px"}}><span style={{color: "var(--green)"}}>✓</span>Risolvere equazioni di 1° e 2° grado</div>
                  <div style={{display: "flex", gap: "5px", fontSize: "11px", marginBottom: "4px"}}><span style={{color: "var(--green)"}}>✓</span>Calcolare e interpretare il discriminante Δ</div>
                  <div style={{display: "flex", gap: "5px", fontSize: "11px", marginBottom: "4px"}}><span style={{color: "var(--mu)"}}>○</span><span style={{color: "var(--mu)"}}>Risolvere sistemi lineari</span></div>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", margin: "11px 0 7px"}}><div style={{fontSize: "10px", fontWeight: 700, color: "var(--mu)", textTransform: "uppercase", letterSpacing: ".5px"}}>Sottoargomenti e lezioni</div><button className="btns" onClick={() => { openMo('mo-new-arg') }}>+ Sottoarg.</button></div>
                <div style={{background: "#DBEAFE", border: "1.5px solid #93C5FD", borderRadius: "9px", padding: "9px 11px", marginBottom: "7px"}}>
                  <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px"}}><div style={{fontSize: "11px", fontWeight: 700, color: "#1E40AF"}}>🔵 Equazioni di 2° grado <span className="tag ta" style={{fontSize: "9px"}}>In corso</span></div><button className="btns" style={{fontSize: "10px"}} onClick={() => { openMo('mo-new-les') }}>+ Lezione</button></div>
                  <div className="lzi" style={{background: "#fff", borderRadius: "6px", marginBottom: "3px", border: "1px solid var(--bor)"}}><div className="lzn">1</div><div style={{flex: 1, fontSize: "11px"}}>Introduzione</div><div style={{fontSize: "10px", color: "var(--mu)"}}>12 gen · ✅</div></div>
                  <div className="lzi" style={{background: "#fff", borderRadius: "6px", marginBottom: "3px", border: "1px solid #93C5FD"}}><div className="lzn">2</div><div style={{flex: 1, fontSize: "11px"}}>Il discriminante</div><div style={{fontSize: "10px", color: "var(--mu)"}}>19 gen · 🔵</div></div>
                  <div className="lzi" style={{background: "#fff", borderRadius: "6px", border: "1px solid var(--bor)"}}><div className="lzn" style={{background: "#F3F4F6", color: "#6B7280"}}>3</div><div style={{flex: 1, fontSize: "11px"}}>Formula completa</div><div style={{fontSize: "10px", color: "var(--mu)"}}>26 gen · ⚪</div></div>
                </div>
                <div style={{background: "var(--sur)", border: "1.5px solid var(--bor)", borderRadius: "9px", padding: "9px 11px"}}>
                  <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px"}}><div style={{fontSize: "11px", fontWeight: 700, color: "#6B7280"}}>⚪ Sistemi lineari <span className="tag tl" style={{fontSize: "9px"}}>Da fare</span></div><button className="btns" style={{fontSize: "10px"}} onClick={() => { openMo('mo-new-les') }}>+ Lezione</button></div>
                  <div className="lzi" style={{background: "#fff", borderRadius: "6px", border: "1px solid var(--bor)"}}><div className="lzn" style={{background: "#F3F4F6", color: "#6B7280"}}>1</div><div style={{flex: 1, fontSize: "11px"}}>Metodo sostituzione</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Feb · ⚪</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div id="dv-studio" className="vw">
          <div className="apill" onClick={() => { openMo('mo-arg') }}><div className="apill-t">📐 Equazioni di 2° grado</div><div className="apill-btn">▾</div></div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "11px"}}>
            <div style={{background: "#fff", borderRadius: "10px", border: "1px solid var(--bor)", padding: "10px", textAlign: "center"}}><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--green)"}}>4</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Lezioni visualizzate</div></div>
            <div style={{background: "#fff", borderRadius: "10px", border: "1px solid var(--bor)", padding: "10px", textAlign: "center"}}><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--blue)"}}>47</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Domande all'AI</div></div>
            <div style={{background: "#fff", borderRadius: "10px", border: "1px solid var(--bor)", padding: "10px", textAlign: "center"}}><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--gold)"}}>2.1</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Sessioni medie/sett.</div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "218px 1fr", gap: "12px", height: "calc(100vh - 58px - 175px)"}}>
            <div className="tp">
              <div className="tph"><div className="tpt">Programma</div><button className="btna" style={{fontSize: "10px"}} onClick={() => { openMo('mo-new-arg') }}>+ Arg.</button></div>
              <div className="tpb">
                <div className="ta2 open" id="dta-0">
                  <div className="tar" onClick={() => { togArg('dta-0') }}><span>📂</span><span className="tan">Equazioni e sistemi</span><span className="tarr">▶</span></div>
                  <div className="tsubs">
                    <div className="tsb on">🔵 Eq. di 2° grado</div>
                    <div className="tle dn" onClick={() => { dSelLes(this,'Lezione 1 — Introduzione') }}>↳ Lez.1 — Intro ✅</div>
                    <div className="tle on" onClick={() => { dSelLes(this,'Lezione 2 — Il discriminante') }}>↳ Lez.2 — Il discriminante 🔵</div>
                    <div className="tle" onClick={() => { dSelLes(this,'Lezione 3 — Formula completa') }}>↳ Lez.3 — Formula ⚪</div>
                    <div className="tsb">⚪ Sistemi lineari</div>
                    <div className="tle" onClick={() => { dSelLes(this,'Lezione 1 — Sostituzione') }}>↳ Lez.1 — Sostituzione ⚪</div>
                  </div>
                </div>
                <div className="ta2" id="dta-1">
                  <div className="tar" onClick={() => { togArg('dta-1') }}><span>📁</span><span className="tan" style={{color: "#6B7280"}}>Geometria analitica</span><span className="tarr">▶</span></div>
                  <div className="tsubs"><div className="tsb">⚪ La retta</div><div className="tsb">⚪ La parabola</div></div>
                </div>
              </div>
              <div style={{padding: "6px", borderTop: "1px solid var(--bor)"}}><button className="btna" style={{width: "100%", fontSize: "10px"}} onClick={() => { openMo('mo-new-arg') }}>+ Nuovo argomento</button></div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "11px", overflowY: "auto"}}>
              <div className="card" id="d-les-card">
                <div className="ch"><span style={{fontSize: "14px"}}>📖</span><div style={{flex: 1}}><div className="ct" id="d-les-t">Lezione 2 — Il discriminante</div><div style={{fontSize: "10px", color: "var(--mu)"}}>19 gen 2026</div></div><span className="tag ta mla">Pubblicata</span><button className="btns" style={{marginLeft: "7px", fontSize: "10px"}}>Modifica</button></div>
                <div style={{padding: "10px 14px"}}>
                  <div style={{fontSize: "10px", fontWeight: 700, color: "var(--mu)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "5px"}}>Materiali caricati</div>
                  <div style={{display: "flex", alignItems: "center", gap: "7px", padding: "6px 0", borderBottom: "1px solid var(--bor)", fontSize: "11px"}}><div style={{width: "22px", height: "22px", borderRadius: "5px", background: "#FEE2E2", color: "#991B1B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, flexShrink: 0}}>PDF</div><span style={{flex: 1}}>Cap. 4 — Il discriminante.pdf</span><span className="tag tg" style={{fontSize: "9px"}}>AI pronto</span></div>
                  <div style={{display: "flex", alignItems: "center", gap: "7px", padding: "6px 0", borderBottom: "1px solid var(--bor)", fontSize: "11px"}}><div style={{width: "22px", height: "22px", borderRadius: "5px", background: "#FFFBEB", color: "#92400E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, flexShrink: 0}}>PPT</div><span style={{flex: 1}}>Slide Lezione 2.pptx</span><span className="tag tg" style={{fontSize: "9px"}}>AI pronto</span></div>
                  <div style={{display: "flex", alignItems: "center", gap: "7px", padding: "6px 0", fontSize: "11px"}}><div style={{width: "22px", height: "22px", borderRadius: "5px", background: "#D1FAE5", color: "#065F46", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, flexShrink: 0}}>VID</div><span style={{flex: 1}}>Video-lezione.mp4</span><span className="tag tw" style={{fontSize: "9px"}}>In elaboraz.</span></div>
                  <div style={{marginTop: "9px", border: "2px dashed var(--bor)", borderRadius: "8px", padding: "11px", textAlign: "center", cursor: "pointer"}} onMouseOver={() => { this.style.borderColor='var(--blue)' }} onMouseOut={() => { this.style.borderColor='var(--bor)' }}><div style={{fontSize: "15px", marginBottom: "2px"}}>📤</div><div style={{fontSize: "11px", fontWeight: 600, color: "var(--navy)"}}>Carica materiale</div></div>
                  <div style={{background: "linear-gradient(135deg,var(--navy),#1A3A5C)", borderRadius: "10px", padding: "11px 13px", display: "flex", alignItems: "center", gap: "10px", marginTop: "9px", cursor: "pointer"}} onClick={() => { openLesChat() }}>
                    <div style={{fontSize: "18px"}}>🤖</div>
                    <div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "1px"}}>Creiamo una lezione insieme</div><div style={{fontSize: "10px", color: "rgba(255,255,255,.42)"}}>L'AI ti aiuta a strutturare contenuti ed esempi</div></div>
                    <button className="btna" style={{fontSize: "10px"}}>Apri chat AI</button>
                  </div>
                </div>
              </div>
              <div className="aic" id="d-les-chat" style={{display: "none", flex: 1, minHeight: "360px", flexDirection: "column"}}>
                <div style={{padding: "8px 12px", borderBottom: "1px solid var(--bor)", display: "flex", alignItems: "center", gap: "7px", flexShrink: 0}}>
                  <button className="bbtn" style={{marginBottom: 0}} onClick={() => { closeLesChat() }}>← Torna ai documenti</button>
                  <div className="aidot"></div><div className="ait">AI — Creiamo la lezione</div>
                </div>
                <div className="aimsgs" id="d-chat" style={{flex: 1}}><div className="msg bot">Ciao Giulia! Sono pronto ad aiutarti a strutturare la <strong>Lezione 2 — Il discriminante</strong>. Da dove vuoi iniziare?</div></div>
                <div className="qrow">
                  <button className="qbtn" onClick={() => { dChat('Suggerisci struttura lezione completa') }}>📋 Struttura</button>
                  <button className="qbtn" onClick={() => { dChat('Dammi 3 esempi applicativi') }}>💡 Esempi</button>
                  <button className="qbtn" onClick={() => { dChat('Crea 5 esercizi graduati') }}>✏️ Esercizi</button>
                  <button className="qbtn" onClick={() => { dChat('Quali errori fanno gli studenti?') }}>⚠️ Errori comuni</button>
                </div>
                <div className="ai-irow"><textarea className="ai-inp" id="d-chat-inp" rows={1} placeholder="Scrivi per comunicare con AI..."></textarea><button className="ai-snd" onClick={() => { dChatSend() }}>➤</button></div>
              </div>
            </div>
          </div>
        </div>

        
        <div id="dv-esercizi" className="vw">
          <div className="apill" onClick={() => { openMo('mo-arg') }}><div className="apill-t">📐 Equazioni di 2° grado</div><div className="apill-btn">▾</div></div>
          <div className="krow">
            <div className="kc"><div className="kico">✅</div><div className="kval" id="ke-c">21</div><div className="klbl">Consegnati</div><div className="kdelta up">su 25</div></div>
            <div className="kc"><div className="kico">⏰</div><div className="kval" id="ke-r">1</div><div className="klbl">In ritardo</div><div className="kdelta dn">scadenza ieri</div></div>
            <div className="kc"><div className="kico">🔁</div><div className="kval" id="ke-t">3.2</div><div className="klbl">Tentativi medi</div><div className="kdelta wa">+0.6</div></div>
            <div className="kc"><div className="kico">🔴</div><div className="kval" id="ke-e">58%</div><div className="klbl">Errori concettuali</div><div className="kdelta dn">discriminante</div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "218px 1fr", gap: "12px", height: "calc(100vh - 58px - 192px)"}}>
            <div className="tp">
              <div className="tph"><div className="tpt">Struttura</div><button className="btna" style={{fontSize: "10px"}} onClick={() => { openMo('mo-new-es') }}>+ Es.</button></div>
              <div className="tpb">
                <div className="ta2 open" id="dea-0">
                  <div className="tar" onClick={() => { togArg('dea-0') }}><span>📐</span><span className="tan">Eq. 2° grado</span><span className="tarr">▶</span></div>
                  <div className="tsubs">
                    <div className="tsb on">🔵 Il discriminante</div>
                    <div className="tex on" onClick={() => { dSelEx(this,0) }}><div className="texn tnok">1</div><div className="texnm">Formula risolutiva</div><span style={{fontSize: "10px", color: "var(--mu)"}}>5/5</span></div>
                    <div className="tex" onClick={() => { dSelEx(this,1) }}><div className="texn tnok">2</div><div className="texnm">Analisi discriminante</div><span style={{fontSize: "10px", color: "var(--mu)"}}>4/5</span></div>
                    <div className="tex" onClick={() => { dSelEx(this,2) }}><div className="texn tner">3</div><div className="texnm">Eq. con frazioni</div><span style={{fontSize: "10px", color: "var(--mu)"}}>3/5</span></div>
                    <div className="tsb">⚪ Sistemi lineari</div>
                    <div className="tex" onClick={() => { dSelEx(this,3) }}><div className="texn tntd">4</div><div className="texnm">Sostituzione</div><span style={{fontSize: "10px", color: "var(--mu)"}}>bozza</span></div>
                  </div>
                </div>
              </div>
              <div style={{padding: "6px", borderTop: "1px solid var(--bor)"}}><button className="btna" style={{width: "100%", fontSize: "10px"}} onClick={() => { openMo('mo-new-es') }}>+ Nuovo esercizio</button></div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "11px", overflowY: "auto"}}>
              <div className="card">
                <div className="ch"><span>✏️</span><div style={{flex: 1}}><div className="ct" id="de-title">Esercizio 1 — Formula risolutiva</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Scadenza: 21 mar · Obbligatorio</div></div><div style={{display: "flex", gap: "5px", marginLeft: "auto"}}><span className="tag tg">Pubblicato</span><button className="btns" style={{fontSize: "10px"}}>Modifica</button></div></div>
                <div style={{padding: "10px 14px"}}>
                  <div style={{background: "var(--sur)", border: "1px solid var(--bor)", borderRadius: "7px", padding: "9px 11px", fontSize: "12px", lineHeight: 1.6, marginBottom: "10px"}} id="de-tx">Risolvi le equazioni. Calcola Δ = b²−4ac e determina le soluzioni.<br/><strong>a)</strong> x²−5x+6=0 &nbsp;<strong>b)</strong> 2x²+3x−2=0</div>
                  <div style={{fontSize: "10px", fontWeight: 700, color: "var(--mu)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "6px"}}>Tipologia errori</div>
                  <div id="de-errs">
                    <div className="ebar"><span className="elbl">Concettuale</span><div className="ebg"><div className="efill" style={{width: "58%", background: "#DC2626"}}></div></div><span className="epct">58%</span></div>
                    <div className="ebar"><span className="elbl">Metodo</span><div className="ebg"><div className="efill" style={{width: "26%", background: "#F59E0B"}}></div></div><span className="epct">26%</span></div>
                    <div className="ebar" style={{marginBottom: 0}}><span className="elbl">Distrazione</span><div className="ebg"><div className="efill" style={{width: "16%", background: "#93C5FD"}}></div></div><span className="epct">16%</span></div>
                  </div>
                  <button className="btns" style={{width: "100%", marginTop: "8px", fontSize: "10px"}} onClick={() => { dV('rep-es') }}>📊 Report performance classe →</button>
                  <div className="aiins" style={{marginTop: "9px"}}><div className="aiinst" id="de-ai-t">🤖 Analisi AI</div><div className="aiinsb" id="de-ai-b">3 su 5 studenti hanno commesso errori nel discriminante al punto b). Errore più comune: segno di −4ac.</div></div>
                </div>
              </div>
              <div className="card">
                <div className="ch"><span>👥</span><div className="ct">Svolgimenti studenti</div><button className="btns mla">Esporta</button></div>
                <div style={{padding: "0 14px"}}>
                  <div className="srow" onClick={() => { dV('stud-det','Luca Marini','ag','LM') }}><div className="sav ag">LM</div><span className="snm">Luca Marini</span><span className="tag tg">Corretto</span><div className="sbar" style={{marginLeft: "7px"}}><div className="sbf" style={{width: "94%", background: "#059669"}}></div></div><span className="spct">94%</span><span style={{fontSize: "10px", color: "var(--mu)", flexShrink: 0}}>2 tent.</span></div>
                  <div className="srow" onClick={() => { dV('stud-det','Sara Ferri','ab','SF') }}><div className="sav ab">SF</div><span className="snm">Sara Ferri</span><span className="tag tg">Corretto</span><div className="sbar" style={{marginLeft: "7px"}}><div className="sbf" style={{width: "82%", background: "#1E6BFF"}}></div></div><span className="spct">82%</span><span style={{fontSize: "10px", color: "var(--mu)", flexShrink: 0}}>3 tent.</span></div>
                  <div className="srow" onClick={() => { dV('stud-det','Marco Galli','ay','MG') }}><div className="sav ay">MG</div><span className="snm">Marco Galli</span><span className="tag tw">Parziale</span><div className="sbar" style={{marginLeft: "7px"}}><div className="sbf" style={{width: "51%", background: "#F59E0B"}}></div></div><span className="spct">51%</span><span style={{fontSize: "10px", color: "var(--mu)", flexShrink: 0}}>8 tent.</span></div>
                  <div className="srow" onClick={() => { dV('stud-det','Pietro Leone','ap','PL') }}><div className="sav ap">PL</div><span className="snm">Pietro Leone</span><span className="tag tw">Parziale</span><div className="sbar" style={{marginLeft: "7px"}}><div className="sbf" style={{width: "65%", background: "#8B5CF6"}}></div></div><span className="spct">65%</span><span style={{fontSize: "10px", color: "var(--mu)", flexShrink: 0}}>5 tent.</span></div>
                  <div className="srow" style={{border: "none"}} onClick={() => { dV('stud-det','Anna Vitale','ar','AV') }}><div className="sav ar">AV</div><span className="snm">Anna Vitale</span><span className="tag te">Non svolto</span><div className="sbar" style={{marginLeft: "7px"}}><div className="sbf" style={{width: "0%"}}></div></div><span className="spct">—</span><span style={{fontSize: "10px", color: "var(--mu)", flexShrink: 0}}>0 tent.</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div id="dv-stud-det" className="vw">
          <button className="bbtn" onClick={() => { dV('esercizi') }}>← Torna agli esercizi</button>
          <div className="card">
            <div className="ch"><div className="sav ag" id="sd-av">LM</div><div style={{flex: 1}}><div className="ct" id="sd-nm">Luca Marini — Esercizio 1</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Consegnato 20 mar · click per dettaglio</div></div><span className="tag tw mla">Parziale — 51%</span></div>
            <div style={{padding: "10px 14px"}}>
              <div style={{background: "var(--sur)", border: "1px solid var(--bor)", borderRadius: "7px", padding: "9px 11px", fontSize: "12px", lineHeight: 1.6, marginBottom: "10px"}}>Risolvi: a) x²−5x+6=0 &nbsp; b) 2x²+3x−2=0</div>
              <div style={{background: "#FAFAFA", border: "1px solid var(--bor)", borderRadius: "7px", padding: "10px 12px", fontSize: "12px", fontFamily: "'Courier New',monospace", lineHeight: 1.7, marginBottom: "12px"}}>a) a=1, b=-5, c=6<br/>Δ = 25-24=1 ✓<br/>x₁=3, x₂=2 ✓<br/><br/>b) a=2, b=3, c=-2<br/>Δ = 9+16=25 ✓<br/>x₁=(-3+5)/4=0.5 ✓<br/><span style={{color: "#DC2626"}}>⚠️ Manca x₂ e verifica finale</span></div>
              <div className="pi piok"><div className="pilbl ok">✅ Punto a) — Corretto</div><div style={{fontSize: "11px"}}>Identificazione coefficienti perfetta. Discriminante corretto. Entrambe le soluzioni calcolate.</div></div>
              <div className="pi piwa"><div className="pilbl wa">⚠️ Punto b) — Parziale</div><div style={{fontSize: "11px"}}>Δ=25 corretto, x₁ corretta. Manca x₂ = (−3−5)/4 = −2. Lo studente si è fermato alla prima soluzione.</div></div>
              <div className="pi pier"><div className="pilbl er">❌ Conclusione — Assente</div><div style={{fontSize: "11px"}}>Nessuna verifica delle soluzioni. Pattern ricorrente: 4 esercizi su 5 presentano questo errore.</div></div>
              <div className="aiins" style={{marginTop: "9px"}}><div className="aiinst">🤖 Riepilogo AI</div><div className="aiinsb"><strong>Punti di forza:</strong> ottima identificazione coefficienti. <strong>Debolezza:</strong> abbandona prima di completare. Consiglio: esercizi mirati sulla seconda soluzione.</div></div>
            </div>
          </div>
        </div>

        
        <div id="dv-analisi" className="vw">
          <div className="apill" onClick={() => { openMo('mo-arg') }}><div className="apill-t">📐 Equazioni di 2° grado</div><div className="apill-btn">▾</div></div>
          <div className="krow">
            <div className="kc"><div className="kico">📈</div><div className="kval">73%</div><div className="klbl">Completamento medio</div><div className="kdelta up">↑ vs prec.</div></div>
            <div className="kc"><div className="kico">🔁</div><div className="kval">3.2</div><div className="klbl">Tentativi medi</div><div className="kdelta wa">leggermente alto</div></div>
            <div className="kc"><div className="kico">🤖</div><div className="kval">71%</div><div className="klbl">Autonomia media</div><div className="kdelta up">↑ dal mese scorso</div></div>
            <div className="kc"><div className="kico">⚠️</div><div className="kval">3</div><div className="klbl">Con lacune</div><div className="kdelta dn">discriminante</div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 240px", gap: "12px", height: "calc(100vh - 58px - 192px)", overflowY: "auto"}}>
            <div style={{display: "flex", flexDirection: "column", gap: "11px", overflowY: "auto"}}>
              <div className="aiins" style={{borderRadius: "11px", padding: "11px 13px"}}><div className="aiinst">🤖 Insight AI — Settimana corrente</div><div className="aiinsb">3 su 5 studenti hanno difficoltà ricorrenti sul <strong>calcolo del discriminante al punto b)</strong>. Marco G. e Anna V. in peggioramento. Consigliata lezione di rinforzo prima del 25 marzo.</div><div style={{display: "flex", gap: "5px", marginTop: "7px"}}><button className="btna" style={{fontSize: "10px"}} onClick={() => { dV('studio') }}>💡 Aggiungi materiale</button><button className="btns" style={{fontSize: "10px"}}>📩 Contatta studenti</button></div></div>
              <div className="card">
                <div className="ch"><span>👥</span><div className="ct">Performance studenti</div><button className="btns mla">Esporta</button></div>
                <div style={{padding: "0 14px"}}>
                  <div className="srow"><div className="sav ag">LM</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Luca Marini</div><div style={{fontSize: "10px", color: "var(--mu)"}}>5 esercizi · 2 aiuti</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "94%", background: "#059669"}}></div></div><span className="spct">94%</span><span className="tag tg" style={{flexShrink: 0, marginLeft: "7px"}}>Ottimo</span></div>
                  <div className="srow"><div className="sav ab">SF</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Sara Ferri</div><div style={{fontSize: "10px", color: "var(--mu)"}}>5 esercizi · 4 aiuti</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "78%", background: "#1E6BFF"}}></div></div><span className="spct">78%</span><span className="tag ta" style={{flexShrink: 0, marginLeft: "7px"}}>Buono</span></div>
                  <div className="srow"><div className="sav ap">PL</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Pietro Leone</div><div style={{fontSize: "10px", color: "var(--mu)"}}>4 esercizi · 5 aiuti</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "65%", background: "#8B5CF6"}}></div></div><span className="spct">65%</span><span className="tag ta" style={{flexShrink: 0, marginLeft: "7px"}}>Buono</span></div>
                  <div className="srow"><div className="sav ay">MG</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Marco Galli</div><div style={{fontSize: "10px", color: "var(--mu)"}}>3 esercizi · 8 aiuti</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "51%", background: "#F59E0B"}}></div></div><span className="spct">51%</span><span className="tag tw" style={{flexShrink: 0, marginLeft: "7px"}}>Attenzione</span></div>
                  <div className="srow" style={{border: "none"}}><div className="sav ar">AV</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Anna Vitale</div><div style={{fontSize: "10px", color: "var(--mu)"}}>1 esercizio · inattiva</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "15%", background: "#DC2626"}}></div></div><span className="spct">15%</span><span className="tag te" style={{flexShrink: 0, marginLeft: "7px"}}>Critico</span></div>
                </div>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "11px", overflowY: "auto"}}>
              <div className="card" style={{padding: "12px"}}><div style={{fontSize: "11px", fontWeight: 700, color: "var(--navy)", marginBottom: "9px"}}>🏷 Tipologia errori</div><canvas id="ac-pie" height="130"></canvas></div>
              <div className="card" style={{padding: "12px"}}><div style={{fontSize: "11px", fontWeight: 700, color: "var(--navy)", marginBottom: "8px"}}>📈 Autonomia</div><canvas id="ac-line" height="110"></canvas></div>
            </div>
          </div>
        </div>

        
        <div id="dv-verifica" className="vw">
          <div className="apill" onClick={() => { openMo('mo-arg') }}><div className="apill-t">📐 Equazioni di 2° grado</div><div className="apill-btn">▾</div></div>
          <div className="krow">
            <div className="kc"><div className="kico">📋</div><div className="kval">5</div><div className="klbl">Elaborati ricevuti</div><div className="kdelta up">tutti</div></div>
            <div className="kc"><div className="kico">✅</div><div className="kval">1</div><div className="klbl">Votati</div><div className="kdelta wa">4 in attesa</div></div>
            <div className="kc"><div className="kico">📊</div><div className="kval">69%</div><div className="klbl">Media AI</div><div className="kdelta wa">sotto soglia</div></div>
            <div className="kc"><div className="kico">📅</div><div className="kval">25/03</div><div className="klbl">Scadenza voti</div><div className="kdelta dn">5 giorni</div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 250px", gap: "12px", height: "calc(100vh - 58px - 192px)"}}>
            <div className="card" style={{overflowY: "auto"}}>
              <div className="ch"><span>👥</span><div className="ct">Studenti — Verifica Eq. e Sistemi</div><span style={{marginLeft: "auto", fontSize: "9px", fontWeight: 700, background: "#DC2626", color: "#fff", borderRadius: "16px", padding: "2px 7px"}}>4 da correggere</span></div>
              <div style={{padding: "0 14px"}}>
                <div style={{padding: "9px 0", borderBottom: "1px solid var(--bor)"}}>
                  <div style={{display: "flex", alignItems: "center", gap: "7px", cursor: "pointer"}} onClick={() => { dV('ver-stud','Luca Marini','ag','LM',9) }}><div className="sav ag">LM</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Luca Marini</div><div style={{fontSize: "10px", color: "var(--mu)"}}>38 min · clicca per vedere la verifica</div></div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "#059669"}}>91</div><input className="mi" value="9" style={{width: "44px", padding: "4px 7px", textAlign: "center", fontWeight: 700, margin: "0 0 0 7px"}}/><button className="btna" style={{fontSize: "9px", marginLeft: "5px"}}>✓</button></div>
                  <div style={{marginTop: "7px", background: "var(--sur)", borderRadius: "7px", padding: "8px 10px", fontSize: "11px", border: "1px solid var(--bor)"}}><span style={{fontSize: "9px", fontWeight: 700, color: "var(--mu)", textTransform: "uppercase"}}>🤖 Pre-analisi AI: </span>Tutti i procedimenti corretti. Alta autonomia. Nessun aiuto richiesto.</div>
                </div>
                <div className="srow" style={{borderBottom: "1px solid var(--bor)", padding: "9px 0"}} onClick={() => { dV('ver-stud','Sara Ferri','ab','SF',7) }}><div className="sav ab">SF</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Sara Ferri</div><div style={{fontSize: "10px", color: "var(--mu)"}}>44 min</div></div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--gold)"}}>74</div><input className="mi" value="7" style={{width: "44px", padding: "4px 7px", textAlign: "center", fontWeight: 700, margin: "0 0 0 7px"}}/><button className="btna" style={{fontSize: "9px", marginLeft: "5px"}}>✓</button></div>
                <div className="srow" style={{borderBottom: "1px solid var(--bor)", padding: "9px 0"}} onClick={() => { dV('ver-stud','Pietro Leone','ap','PL',7) }}><div className="sav ap">PL</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Pietro Leone</div><div style={{fontSize: "10px", color: "var(--mu)"}}>41 min</div></div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--gold)"}}>68</div><input className="mi" value="7" style={{width: "44px", padding: "4px 7px", textAlign: "center", fontWeight: 700, margin: "0 0 0 7px"}}/><button className="btna" style={{fontSize: "9px", marginLeft: "5px"}}>✓</button></div>
                <div className="srow" style={{borderBottom: "1px solid var(--bor)", padding: "9px 0"}} onClick={() => { dV('ver-stud','Marco Galli','ay','MG',4) }}><div className="sav ay">MG</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Marco Galli</div><div style={{fontSize: "10px", color: "var(--mu)"}}>49 min</div></div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "#DC2626"}}>43</div><input className="mi" value="4" style={{width: "44px", padding: "4px 7px", textAlign: "center", fontWeight: 700, margin: "0 0 0 7px"}}/><button className="btna" style={{fontSize: "9px", marginLeft: "5px"}}>✓</button></div>
                <div className="srow" style={{padding: "9px 0"}} onClick={() => { dV('ver-stud','Anna Vitale','ar','AV',5) }}><div className="sav ar">AV</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Anna Vitale</div><div style={{fontSize: "10px", color: "var(--mu)"}}>51 min</div></div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "#DC2626"}}>49</div><input className="mi" value="5" style={{width: "44px", padding: "4px 7px", textAlign: "center", fontWeight: 700, margin: "0 0 0 7px"}}/><button className="btna" style={{fontSize: "9px", marginLeft: "5px"}}>✓</button></div>
              </div>
              <div style={{padding: "9px 14px", borderTop: "1px solid var(--bor)"}}><div style={{fontSize: "10px", color: "var(--mu)", fontStyle: "italic", marginBottom: "6px"}}>⚠️ Il voto finale è assegnato dal docente. L'AI fornisce solo supporto all'analisi.</div><div style={{display: "flex", gap: "7px"}}><button className="btns" style={{flex: 1, fontSize: "10px"}} onClick={() => { dV('rep-ver') }}>📊 Report di classe completo</button><button className="btna" style={{fontSize: "10px"}}>Salva tutti i voti</button></div></div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "11px", overflowY: "auto"}}>
              <div className="card" style={{padding: "12px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "8px"}}>📝 Dettagli</div><div style={{display: "flex", flexDirection: "column", gap: "5px", fontSize: "11px"}}><div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--mu)"}}>Titolo</span><span style={{fontWeight: 600}}>Equazioni e Sistemi</span></div><div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--mu)"}}>Data</span><span style={{fontWeight: 600}}>20 marzo 2026</span></div><div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--mu)"}}>Tempo</span><span style={{fontWeight: 600}}>50 min</span></div><div style={{display: "flex", justifyContent: "space-between"}}><span style={{color: "var(--mu)"}}>Media</span><span style={{fontWeight: 700, color: "var(--gold)"}}>6.4/10</span></div></div></div>
              <div className="card" style={{padding: "12px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "8px"}}>📊 Distribuzione voti</div><canvas id="ver-ch" height="140"></canvas></div>
            </div>
          </div>
        </div>

        
        <div id="dv-ver-stud" className="vw">
          <button className="bbtn" onClick={() => { dV('verifica') }}>← Torna alle verifiche</button>
          <div className="card">
            <div className="ch"><div className="sav ag" id="vs-av">LM</div><div style={{flex: 1}}><div className="ct" id="vs-nm">Luca Marini — Verifica</div><div style={{fontSize: "10px", color: "var(--mu)"}}>20 mar · 38 min</div></div><span className="tag tg mla" id="vs-voto">Voto: 9/10</span></div>
            <div style={{padding: "10px 14px"}}>
              <div className="pi piok"><div className="pilbl ok">✅ Dom. 1 — Risolvi x²−5x+6=0 — Perfetta</div><div style={{fontSize: "11px"}}>Metodo corretto, discriminante esatto, soluzioni con verifica.</div></div>
              <div className="pi piok"><div className="pilbl ok">✅ Dom. 2 — Analisi discriminante — Corretta</div><div style={{fontSize: "11px"}}>Calcolo Δ perfetto, interpretazione del segno corretta.</div></div>
              <div className="pi piwa"><div className="pilbl wa">⚠️ Dom. 3 — Sistema — Parzialmente corretta</div><div style={{fontSize: "11px"}}>Soluzione trovata ma verifica non inclusa. −1 punto metodologico.</div></div>
              <div className="pi piok"><div className="pilbl ok">✅ Dom. 4 — Problema geometrico — Corretta</div><div style={{fontSize: "11px"}}>Impostazione perfetta, soluzione corretta e coerente col contesto.</div></div>
              <div className="aiins" style={{marginTop: "9px"}}><div className="aiinst">🤖 Riepilogo AI</div><div className="aiinsb"><strong>Punti di forza:</strong> ottima padronanza, metodo rigoroso. <strong>Margine:</strong> includere sempre la verifica nei sistemi.</div></div>
            </div>
          </div>
        </div>

        
        <div id="dv-rep-es" className="vw">
          <button className="bbtn" onClick={() => { dV('esercizi') }}>← Torna agli esercizi</button>
          <div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "15px", color: "var(--navy)", marginBottom: "11px"}}>Report Performance — Equazioni di 2° grado</div>
          <div className="krow">
            <div className="kc"><div className="kico">✅</div><div className="kval">4/5</div><div className="klbl">Tutti gli esercizi</div><div className="kdelta wa">Anna V. in ritardo</div></div>
            <div className="kc"><div className="kico">📊</div><div className="kval">73%</div><div className="klbl">Media completamento</div><div className="kdelta up">↑</div></div>
            <div className="kc"><div className="kico">🎯</div><div className="kval">71%</div><div className="klbl">Autonomia media</div><div className="kdelta up">↑</div></div>
            <div className="kc"><div className="kico">⏱</div><div className="kval">18 min</div><div className="klbl">Tempo medio</div><div className="kdelta">nella norma</div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 250px", gap: "12px"}}>
            <div className="card"><div className="ch"><span>📋</span><div className="ct">Completamento per studente</div><button className="btns mla">Esporta PDF</button></div>
              <div style={{padding: "0 14px"}}>
                <div className="srow"><div className="sav ag">LM</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Luca Marini</div><div style={{fontSize: "10px", color: "var(--mu)"}}>5/5 · 2 aiuti</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "94%", background: "#059669"}}></div></div><span className="spct">94%</span><span className="tag tg" style={{flexShrink: 0, marginLeft: "7px"}}>Ottimo</span></div>
                <div className="srow"><div className="sav ab">SF</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Sara Ferri</div><div style={{fontSize: "10px", color: "var(--mu)"}}>5/5 · 4 aiuti</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "78%", background: "#1E6BFF"}}></div></div><span className="spct">78%</span><span className="tag ta" style={{flexShrink: 0, marginLeft: "7px"}}>Buono</span></div>
                <div className="srow"><div className="sav ap">PL</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Pietro Leone</div><div style={{fontSize: "10px", color: "var(--mu)"}}>4/5 · 5 aiuti</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "65%", background: "#8B5CF6"}}></div></div><span className="spct">65%</span><span className="tag ta" style={{flexShrink: 0, marginLeft: "7px"}}>Buono</span></div>
                <div className="srow"><div className="sav ay">MG</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Marco Galli</div><div style={{fontSize: "10px", color: "var(--mu)"}}>4/5 · 8 aiuti</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "51%", background: "#F59E0B"}}></div></div><span className="spct">51%</span><span className="tag tw" style={{flexShrink: 0, marginLeft: "7px"}}>Attenzione</span></div>
                <div className="srow" style={{border: "none"}}><div className="sav ar">AV</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Anna Vitale</div><div style={{fontSize: "10px", color: "var(--mu)"}}>1/5 · assenze</div></div><div className="sbar" style={{width: "75px"}}><div className="sbf" style={{width: "15%", background: "#DC2626"}}></div></div><span className="spct">15%</span><span className="tag te" style={{flexShrink: 0, marginLeft: "7px"}}>Critico</span></div>
              </div>
            </div>
            <div className="card" style={{padding: "12px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "8px"}}>📊 Completamento</div><canvas id="rep-ch" height="180"></canvas></div>
          </div>
        </div>

        
        <div id="dv-rep-ver" className="vw">
          <button className="bbtn" onClick={() => { dV('verifica') }}>← Torna alla verifica</button>
          <div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "15px", color: "var(--navy)", marginBottom: "11px"}}>Report di Classe — Verifica Equazioni e Sistemi</div>
          <div className="krow">
            <div className="kc"><div className="kico">📊</div><div className="kval">6.4</div><div className="klbl">Media classe</div><div className="kdelta wa">sotto soglia</div></div>
            <div className="kc"><div className="kico">🏆</div><div className="kval">9</div><div className="klbl">Voto più alto</div><div className="kdelta up">Luca M.</div></div>
            <div className="kc"><div className="kico">📉</div><div className="kval">4</div><div className="klbl">Voto più basso</div><div className="kdelta dn">Marco G.</div></div>
            <div className="kc"><div className="kico">⚠️</div><div className="kval">2/5</div><div className="klbl">Insufficienti</div><div className="kdelta dn">Marco e Anna</div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 250px", gap: "12px"}}>
            <div className="card"><div className="ch"><span>📋</span><div className="ct">Risultati</div><button className="btns mla">Esporta PDF</button></div>
              <div style={{padding: "0 14px"}}>
                <div className="srow"><div className="sav ag">LM</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Luca Marini</div><div style={{fontSize: "10px", color: "var(--mu)"}}>91/100 AI</div></div><span style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "#059669"}}>9</span><span className="tag tg" style={{flexShrink: 0, marginLeft: "7px"}}>Ottimo</span></div>
                <div className="srow"><div className="sav ab">SF</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Sara Ferri</div><div style={{fontSize: "10px", color: "var(--mu)"}}>74/100 AI</div></div><span style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--gold)"}}>7</span><span className="tag ta" style={{flexShrink: 0, marginLeft: "7px"}}>Buono</span></div>
                <div className="srow"><div className="sav ap">PL</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Pietro Leone</div><div style={{fontSize: "10px", color: "var(--mu)"}}>68/100 AI</div></div><span style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--gold)"}}>7</span><span className="tag ta" style={{flexShrink: 0, marginLeft: "7px"}}>Sufficiente</span></div>
                <div className="srow"><div className="sav ay">MG</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Marco Galli</div><div style={{fontSize: "10px", color: "var(--mu)"}}>43/100 AI</div></div><span style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "#DC2626"}}>4</span><span className="tag te" style={{flexShrink: 0, marginLeft: "7px"}}>Insuff.</span></div>
                <div className="srow" style={{border: "none"}}><div className="sav ar">AV</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Anna Vitale</div><div style={{fontSize: "10px", color: "var(--mu)"}}>49/100 AI</div></div><span style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "#DC2626"}}>5</span><span className="tag te" style={{flexShrink: 0, marginLeft: "7px"}}>Insuff.</span></div>
              </div>
            </div>
            <div className="card" style={{padding: "12px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "8px"}}>📊 Distribuzione</div><canvas id="rvr-ch" height="180"></canvas></div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div className="popup" id="pop-doc" onClick={() => { this.classList.add('off') }}><div className="poptop"><span className="poptit">🤖 Analisi AI disponibile</span><button className="popx">✕</button></div><div className="popbody">Marco Galli ha completato l'esercizio 2. Rilevati errori concettuali.</div></div>
</div>

<div id="pg-stu" className="pg">
  <div className="shell">
    <nav className="sb">
      <div className="sb-top">
        <div className="sb-logo"><div className="sb-li">⭐</div><div className="sb-lt">YOUR BEST</div></div>
        <div className="rcard rcs">
          <div className="rav rav-s">MR</div>
          <div><div className="rname">Mario Rossi</div><div className="rsub">Liceo Einstein · 3A</div></div>
          <span className="rbadge rbadge-s">STUDENTE</span>
        </div>
        <div className="cpill cpill-s" onClick={() => { openMo('mo-mat') }}>
          <div style={{display: "flex", alignItems: "center", gap: "5px"}}><div style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)"}}></div><span className="cpnm cpnm-s" id="s-mat-lbl">📐 Matematica</span></div>
          <span className="cpa">cambia ▾</span>
        </div>
      </div>
      <div className="sb-nav">
        <div className="nl">Panoramica</div>
        <div className="ni on g" id="sn-home" onClick={() => { sV('home') }}><span className="nico">🏠</span>Home</div>
        <div className="nl" style={{marginTop: "4px"}}>Sezioni</div>
        <div className="sg g">
          <div className="nis g" id="sn-studio" onClick={() => { sV('studio') }}><span className="nico">📚</span>Studio</div>
          <div className="nis" id="sn-esercizi" onClick={() => { sV('esercizi') }}><span className="nico">✏️</span>Esercizi<span className="nbg">3</span></div>
          <div className="nis" id="sn-ripasso" onClick={() => { sV('ripasso') }}><span className="nico">🔄</span>Ripasso</div>
          <div className="nis" id="sn-verifica" onClick={() => { sV('verifica') }}><span className="nico">📝</span>Verifica<span className="nbgr">Nuova</span></div>
        </div>
        <div className="nl" style={{marginTop: "4px"}}>Report</div>
        <div className="ni g" id="sn-perf" onClick={() => { sV('perf') }}><span className="nico">📊</span>Le mie performance</div>
      </div>
      <div className="sb-foot"><button className="nbt">🔔<div className="nbtd"></div></button><button className="logbtn" onClick={() => { showPage('pg-login') }}>↩ Esci</button></div>
    </nav>
    <div className="main">
      <div className="tb"><div><div className="pgtit" id="s-tit">Home</div><div className="pgsub">Prof. Carla Bianchi · 20 Marzo 2026</div></div></div>
      <div className="cnt" id="s-cnt">

        
        <div id="sv-home" className="vw on">
          <div style={{background: "linear-gradient(135deg,var(--navy),#1A3A5C)", borderRadius: "13px", padding: "18px 22px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden"}}>
            <div style={{position: "absolute", right: "-10px", top: "-10px", width: "110px", height: "110px", borderRadius: "50%", background: "rgba(5,150,105,.13)"}}></div>
            <div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "19px", color: "#fff", marginBottom: "2px"}}>Ciao Mario! 👋</div><div style={{fontSize: "11px", color: "rgba(255,255,255,.42)", marginBottom: "11px"}}>2 nuove lezioni e 3 esercizi questa settimana</div><div style={{display: "flex", gap: "7px"}}><button className="btna" onClick={() => { sV('studio') }}>📚 Studio</button><button className="btns" style={{borderColor: "rgba(255,255,255,.2)", color: "rgba(255,255,255,.5)", background: "transparent"}} onClick={() => { sV('esercizi') }}>✏️ Esercizi</button></div></div>
            <div style={{fontSize: "34px", position: "relative", zIndex: 1}}>📖</div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "13px"}}>
            <div style={{background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: "11px", padding: "12px 14px"}}><div style={{fontSize: "11px", fontWeight: 700, color: "#1E40AF", marginBottom: "7px"}}>📖 Nuove lezioni</div>
              <div style={{fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: "5px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--blue)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Matematica</strong> — Il discriminante</span></div>
              <div style={{fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: "5px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--blue)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Matematica</strong> — Formula completa</span></div>
              <div style={{fontSize: "11px", padding: "4px 0", display: "flex", gap: "5px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--blue)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Fisica</strong> — Principio di inerzia</span></div>
            </div>
            <div style={{background: "#FFFBEB", border: "1.5px solid #FDE68A", borderRadius: "11px", padding: "12px 14px"}}><div style={{fontSize: "11px", fontWeight: 700, color: "#92400E", marginBottom: "7px"}}>✏️ Esercizi assegnati</div>
              <div style={{fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: "5px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Mat.</strong> — Formula · scad. 21 mar</span></div>
              <div style={{fontSize: "11px", padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)", display: "flex", gap: "5px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Mat.</strong> — Discriminante · scad. 21 mar</span></div>
              <div style={{fontSize: "11px", padding: "4px 0", display: "flex", gap: "5px"}}><span style={{width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0, marginTop: "3px"}}></span><span><strong>Fis.</strong> — Cinematica · scad. 24 mar</span></div>
            </div>
          </div>
          <div style={{fontSize: "12px", fontWeight: 700, color: "var(--navy)", marginBottom: "10px"}}>Le tue materie</div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
            <div style={{background: "#fff", borderRadius: "11px", border: "1.5px solid var(--bor)", padding: "13px", cursor: "pointer", transition: ".2s", position: "relative", overflow: "hidden"}} onMouseOver={() => { this.style.transform='translateY(-2px)' }} onMouseOut={() => { this.style.transform='' }} onClick={() => { setSMat('📐 Matematica');sV('studio') }}>
              <div style={{position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#1E6BFF,#4D8DFF)"}}></div>
              <div style={{fontSize: "20px", marginBottom: "5px"}}>📐</div>
              <div style={{fontSize: "12px", fontWeight: 700, marginBottom: "2px"}}>Matematica</div>
              <div style={{fontSize: "10px", color: "var(--mu)", marginBottom: "8px"}}>Prof. Carla Bianchi</div>
              <div style={{height: "4px", background: "var(--bor)", borderRadius: "2px", marginBottom: "3px"}}><div style={{height: "100%", width: "58%", background: "#1E6BFF", borderRadius: "2px"}}></div></div>
              <div style={{fontSize: "9px", color: "var(--mu)"}}>Eq. 2° grado · 58%</div>
            </div>
            <div style={{background: "#fff", borderRadius: "11px", border: "1.5px solid var(--bor)", padding: "13px", cursor: "pointer", transition: ".2s", position: "relative", overflow: "hidden"}} onMouseOver={() => { this.style.transform='translateY(-2px)' }} onMouseOut={() => { this.style.transform='' }} onClick={() => { setSMat('⚡ Fisica');sV('studio') }}>
              <div style={{position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#10B981,#059669)"}}></div>
              <div style={{fontSize: "20px", marginBottom: "5px"}}>⚡</div>
              <div style={{fontSize: "12px", fontWeight: 700, marginBottom: "2px"}}>Fisica</div>
              <div style={{fontSize: "10px", color: "var(--mu)", marginBottom: "8px"}}>Prof. Marco Conti</div>
              <div style={{height: "4px", background: "var(--bor)", borderRadius: "2px", marginBottom: "3px"}}><div style={{height: "100%", width: "35%", background: "#10B981", borderRadius: "2px"}}></div></div>
              <div style={{fontSize: "9px", color: "var(--mu)"}}>Principi Newton · 35%</div>
            </div>
          </div>
        </div>

        
        <div id="sv-studio" className="vw">
          <div style={{background: "var(--blue)", borderRadius: "9px", padding: "9px 14px", marginBottom: "11px", fontSize: "13px", fontWeight: 700, color: "#fff"}} id="s-arg-lbl">📐 Equazioni di 2° grado — Matematica</div>
          <div style={{display: "grid", gridTemplateColumns: "218px 1fr", gap: "12px", height: "calc(100vh - 58px - 110px)"}}>
            <div className="tp">
              <div className="tph"><div className="tpt">Programma</div><span className="tag ta" style={{fontSize: "9px"}}>In corso</span></div>
              <div className="tpb">
                <div className="ta2" id="sta-0"><div className="tar" onClick={() => { togArg('sta-0') }}><span>✅</span><span className="tan" style={{color: "#065F46"}}>Eq. di 1° grado</span><span className="tarr">▶</span></div><div className="tsubs"><div className="tsb dn">✅ Forma normale</div><div className="tle dn" onClick={() => { sSelLes(this,'Lezione 1 — Forma normale') }}>↳ Lez.1 ✅</div><div className="tsb dn">✅ Soluzioni</div><div className="tle dn" onClick={() => { sSelLes(this,'Lezione 2 — Soluzioni') }}>↳ Lez.2 ✅</div></div></div>
                <div className="ta2 open" id="sta-1">
                  <div className="tar" onClick={() => { togArg('sta-1') }}><span>🔵</span><span className="tan">Eq. di 2° grado</span><span className="tarr">▶</span></div>
                  <div className="tsubs">
                    <div className="tsb dn">✅ Introduzione</div>
                    <div className="tle dn" onClick={() => { sSelLes(this,'Lezione 1 — Introduzione') }}>↳ Lez.1 — Intro ✅</div>
                    <div className="tsb on">🔵 Il discriminante</div>
                    <div className="tle on" onClick={() => { sSelLes(this,'Lezione 2 — Il discriminante') }}>↳ Lez.2 — Il discriminante 🔵</div>
                    <div className="tle" onClick={() => { sSelLes(this,'Lezione 3 — Formula completa') }}>↳ Lez.3 — Formula ⚪</div>
                    <div className="tsb">⚪ Sistemi lineari</div>
                    <div className="tle lk">↳ Lez.4 — Sostituzione 🔒</div>
                  </div>
                </div>
                <div className="ta2" id="sta-2"><div className="tar" onClick={() => { togArg('sta-2') }}><span>⚪</span><span className="tan" style={{color: "#6B7280"}}>Geometria analitica</span><span className="tarr">▶</span></div><div className="tsubs"><div className="tsb">🔒 La retta</div><div className="tsb">🔒 La parabola</div></div></div>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "11px", overflowY: "auto"}}>
              <div className="card">
                <div className="ch"><span>📖</span><div style={{flex: 1}}><div className="ct" id="s-les-t">Lezione 2 — Il discriminante</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Prof. Carla Bianchi · 19 mar 2026</div></div><span className="tag ta mla">In corso</span></div>
                <div style={{padding: "10px 14px"}}>
                  <div style={{fontSize: "10px", fontWeight: 700, color: "var(--mu)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: "5px"}}>Materiali — clicca per studiare con l'AI</div>
                  <div id="mat-pdf" style={{display: "flex", alignItems: "center", gap: "7px", padding: "6px 8px", borderBottom: "1px solid var(--bor)", fontSize: "11px", cursor: "pointer", borderRadius: "6px", transition: ".15s"}} onMouseOver={() => { this.style.background='var(--sur)' }} onMouseOut={() => { this.style.background='' }} onClick={() => { sSelDoc(this,'Cap. 4 — Il discriminante.pdf') }}><div style={{width: "22px", height: "22px", borderRadius: "5px", background: "#FEE2E2", color: "#991B1B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, flexShrink: 0}}>PDF</div><span style={{flex: 1}}>Cap. 4 — Il discriminante.pdf</span><span style={{fontSize: "11px"}}>⬇</span></div>
                  <div id="mat-ppt" style={{display: "flex", alignItems: "center", gap: "7px", padding: "6px 8px", borderBottom: "1px solid var(--bor)", fontSize: "11px", cursor: "pointer", borderRadius: "6px", transition: ".15s"}} onMouseOver={() => { this.style.background='var(--sur)' }} onMouseOut={() => { this.style.background='' }} onClick={() => { sSelDoc(this,'Slide Lezione 2.pptx') }}><div style={{width: "22px", height: "22px", borderRadius: "5px", background: "#FFFBEB", color: "#92400E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, flexShrink: 0}}>PPT</div><span style={{flex: 1}}>Slide Lezione 2.pptx</span><span style={{fontSize: "11px"}}>⬇</span></div>
                  <div id="mat-vid" style={{display: "flex", alignItems: "center", gap: "7px", padding: "6px 8px", fontSize: "11px", cursor: "pointer", borderRadius: "6px", transition: ".15s"}} onMouseOver={() => { this.style.background='var(--sur)' }} onMouseOut={() => { this.style.background='' }} onClick={() => { sSelDoc(this,'Video-lezione.mp4') }}><div style={{width: "22px", height: "22px", borderRadius: "5px", background: "#D1FAE5", color: "#065F46", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, flexShrink: 0}}>VID</div><span style={{flex: 1}}>Video-lezione.mp4</span><span style={{fontSize: "11px"}}>▶️</span></div>
                </div>
              </div>
              <div className="aic" style={{flex: 1, minHeight: "280px", display: "flex", flexDirection: "column"}}>
                <div className="aich"><div className="aidot"></div><div style={{flex: 1}}><div className="ait">Assistente AI — Studio</div><div className="ais" id="s-ai-sub">Conosce tutti i materiali del docente</div></div><span className="tag ta mla" id="s-ai-tag">📐 Eq. 2° grado</span></div>
                <div className="aimsgs" id="s-msgs-studio" style={{flex: 1}}><div className="msg bot">Ciao Mario! 👋 Sono pronto ad aiutarti con <strong>Il discriminante</strong>. Ho studiato tutti i materiali della Prof. Bianchi. Come posso aiutarti?</div></div>
                <div className="qrow">
                  <button className="qbtn" onClick={() => { sChat('studio','Spiegami il discriminante') }}>🎯 Spiegami il discriminante</button>
                  <button className="qbtn" onClick={() => { sChat('studio','Crea uno schema riassuntivo') }}>🗂 Schema</button>
                  <button className="qbtn" onClick={() => { sChat('studio','Dammi un esempio pratico') }}>💡 Esempio</button>
                  <button className="qbtn" onClick={() => { sChat('studio','Cosa significa Δ negativo?') }}>❓ Δ negativo?</button>
                </div>
                <div className="ai-irow"><textarea className="ai-inp" id="s-inp-studio" rows={1} placeholder="Chiedi qualcosa sulla lezione..."></textarea><button className="ai-snd" onClick={() => { sChatSend('studio') }}>➤</button></div>
              </div>
            </div>
          </div>
        </div>

        
        <div id="sv-esercizi" className="vw">
          <div style={{background: "var(--blue)", borderRadius: "9px", padding: "9px 14px", marginBottom: "11px", fontSize: "13px", fontWeight: 700, color: "#fff"}}>📐 Equazioni di 2° grado — Esercizi assegnati</div>
          <div style={{display: "grid", gridTemplateColumns: "218px 1fr", gap: "12px", height: "calc(100vh - 58px - 110px)"}}>
            <div className="tp">
              <div className="tph"><div className="tpt">Esercizi assegnati</div></div>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "var(--bor)", flexShrink: 0}}>
                <div style={{background: "#fff", padding: "7px", textAlign: "center"}}><div style={{fontSize: "13px", fontWeight: 700, color: "#065F46"}}>1</div><div style={{fontSize: "9px", color: "var(--mu)"}}>Fatto</div></div>
                <div style={{background: "#fff", padding: "7px", textAlign: "center"}}><div style={{fontSize: "13px", fontWeight: 700, color: "#991B1B"}}>1</div><div style={{fontSize: "9px", color: "var(--mu)"}}>Errori</div></div>
                <div style={{background: "#fff", padding: "7px", textAlign: "center"}}><div style={{fontSize: "13px", fontWeight: 700, color: "#6B7280"}}>2</div><div style={{fontSize: "9px", color: "var(--mu)"}}>Da fare</div></div>
              </div>
              <div className="tpb" style={{padding: 0}}>
                <div style={{padding: "4px 10px 3px", fontSize: "9px", color: "var(--mu)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px", borderBottom: "1px solid var(--bor)"}}>EQ. 2° GRADO</div>
                <div className="tex on" onClick={() => { sSelEx(this,0) }}><div className="texn tner">1</div><div className="texnm">Formula risolutiva</div><span style={{fontSize: "11px"}}>❌</span></div>
                <div className="tex" onClick={() => { sSelEx(this,1) }}><div className="texn tnok">2</div><div className="texnm">Discriminante</div><span style={{fontSize: "11px"}}>✅</span></div>
                <div className="tex" onClick={() => { sSelEx(this,2) }}><div className="texn tntd">3</div><div className="texnm">Problemi applicativi</div><span style={{fontSize: "11px"}}>⚪</span></div>
                <div style={{padding: "4px 10px 3px", fontSize: "9px", color: "var(--mu)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px", borderTop: "1px solid var(--bor)", borderBottom: "1px solid var(--bor)"}}>SISTEMI LINEARI</div>
                <div className="tex" onClick={() => { sSelEx(this,3) }}><div className="texn tntd">4</div><div className="texnm">Sostituzione</div><span style={{fontSize: "11px"}}>⚪</span></div>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "11px", overflowY: "auto"}}>
              <div className="card">
                <div className="ch"><span>✏️</span><div style={{flex: 1}}><div className="ct" id="s-es-t">Esercizio 1 — Formula risolutiva</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Scadenza: 21 mar · Obbligatorio</div></div><span className="tag te mla" id="s-es-tag">Errori presenti</span></div>
                <div style={{padding: "10px 14px"}}>
                  <div style={{background: "var(--sur)", border: "1px solid var(--bor)", borderRadius: "7px", padding: "9px 11px", fontSize: "12px", lineHeight: 1.6, marginBottom: "10px"}} id="s-es-tx">Risolvi le equazioni. Calcola Δ = b²−4ac.<br/><strong>a)</strong> x²−5x+6=0 &nbsp;<strong>b)</strong> 2x²+3x−2=0</div>
                  <textarea className="verans" id="s-es-ans" placeholder="Scrivi qui il procedimento...&#10;&#10;a) a=1, b=-5, c=6&#10;   Δ = (-5)² - 4·1·6 = ..."></textarea>
                  <div style={{display: "flex", gap: "6px", marginTop: "7px", flexWrap: "wrap"}}>
                    <button className="tbtn" onClick={() => { openMo('mo-formula') }}>∑ Formula LaTeX</button>
                    <button className="tbtn">📎 Allega file</button>
                  </div>
                  <div className="fbcard fber" id="s-es-fb"><div className="fblbl">⚠️ Feedback AI — tentativo precedente</div>Il discriminante al punto b) è corretto (Δ=25), ma hai dimenticato x₂ = (−3−5)/4 = −2. Non fermarti alla prima soluzione!</div>
                  <button className="btna" style={{width: "100%", marginTop: "9px"}} onClick={() => { sAnalyze() }}>Invia per analisi AI ➤</button>
                </div>
              </div>
              <div className="aic">
                <div className="aich"><div className="aidot"></div><div><div className="ait">Assistente AI — Esercizi</div><div className="ais">Suggerimenti guidati, mai la risposta diretta</div></div></div>
                <div className="aimsgs" id="s-msgs-esercizi" style={{maxHeight: "160px"}}><div className="msg bot">Hai commesso un errore al tentativo precedente sul punto b). Vuoi un suggerimento su come calcolare x₂? 💪</div></div>
                <div className="qrow"><button className="qbtn" onClick={() => { sChat('esercizi','Suggerimento punto b)') }}>💡 Suggerimento b)</button><button className="qbtn" onClick={() => { sChat('esercizi','Ripassa la formula risolutiva') }}>📚 Ripassa teoria</button></div>
                <div className="ai-irow"><textarea className="ai-inp" id="s-inp-esercizi" rows={1} placeholder="Chiedi un aiuto..."></textarea><button className="ai-snd" onClick={() => { sChatSend('esercizi') }}>➤</button></div>
              </div>
            </div>
          </div>
        </div>

        
        <div id="sv-ripasso" className="vw">
          <div style={{background: "var(--blue)", borderRadius: "9px", padding: "9px 14px", marginBottom: "11px", fontSize: "13px", fontWeight: 700, color: "#fff"}}>📐 Equazioni di 2° grado — Ripasso</div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 238px", gap: "12px", height: "calc(100vh - 58px - 110px)"}}>
            <div className="aic" style={{display: "flex", flexDirection: "column"}}>
              <div className="aich"><div className="aidot"></div><div><div className="ait">Assistente AI — Ripasso</div><div className="ais">Simulazioni, quiz e schemi personalizzati</div></div></div>
              <div className="aimsgs" id="s-msgs-ripasso" style={{flex: 1}}><div className="msg bot">Ciao Mario! Ho analizzato le tue performance. Il punto debole è il <strong>calcolo del discriminante al punto b)</strong>. Vuoi simulare un'interrogazione o preferisci un quiz rapido?</div></div>
              <div className="qrow">
                <button className="qbtn" onClick={() => { sChat('ripasso','Simula una interrogazione') }}>🎤 Interrogazione</button>
                <button className="qbtn" onClick={() => { sChat('ripasso','Quiz rapido sul discriminante') }}>❓ Quiz rapido</button>
                <button className="qbtn" onClick={() => { sChat('ripasso','Schema riassuntivo') }}>📋 Schema</button>
                <button className="qbtn" onClick={() => { sChat('ripasso','Simula una verifica scritta') }}>📝 Simula verifica</button>
                <button className="qbtn" onClick={() => { sChat('ripasso','Quali sono i miei punti deboli?') }}>🎯 Punti deboli</button>
              </div>
              <div className="ai-irow"><textarea className="ai-inp" id="s-inp-ripasso" rows={1} placeholder="Chiedi di simulare, spiegare o riassumere..."></textarea><button className="ai-snd" onClick={() => { sChatSend('ripasso') }}>➤</button></div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto"}}>
              <div className="card" style={{padding: "11px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "9px"}}>📊 Performance</div><div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px"}}><div style={{background: "var(--sur)", borderRadius: "8px", padding: "9px", textAlign: "center"}}><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "19px", fontWeight: 700, color: "var(--green)"}}>75%</div><div style={{fontSize: "9px", color: "var(--mu)"}}>Corretti</div></div><div style={{background: "var(--sur)", borderRadius: "8px", padding: "9px", textAlign: "center"}}><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "19px", fontWeight: 700, color: "var(--gold)"}}>3.2</div><div style={{fontSize: "9px", color: "var(--mu)"}}>Tentativi medi</div></div></div></div>
              <div className="card" style={{padding: "11px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "7px"}}>🎯 Da ripassare</div>
                <div style={{display: "flex", alignItems: "center", gap: "6px", padding: "5px 0", borderBottom: "1px solid var(--bor)", fontSize: "11px"}}><span>🔴</span><span style={{flex: 1}}>Calcolo discriminante b)</span><span className="tag te" style={{fontSize: "9px"}}>Debole</span></div>
                <div style={{display: "flex", alignItems: "center", gap: "6px", padding: "5px 0", fontSize: "11px"}}><span>🟢</span><span style={{flex: 1}}>Identificare a, b, c</span><span className="tag tg" style={{fontSize: "9px"}}>Forte</span></div>
              </div>
              <div className="card" style={{padding: "11px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "7px"}}>📈 Andamento</div><canvas id="rip-ch" height="110"></canvas></div>
            </div>
          </div>
        </div>

        
        <div id="sv-verifica" className="vw">
          <div style={{background: "linear-gradient(135deg,var(--navy),#1A3A5C)", borderRadius: "9px", padding: "9px 14px", marginBottom: "11px", fontSize: "13px", fontWeight: 700, color: "#fff"}}>📝 Verifica — Equazioni e Sistemi · 25 marzo 2026</div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 200px", gap: "12px", height: "calc(100vh - 58px - 110px)"}}>
            <div className="card" style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
              <div style={{padding: "10px 15px", borderBottom: "1px solid var(--bor)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0}}>
                <div><div style={{fontSize: "12px", fontWeight: 700}}>Verifica — Eq. e Sistemi · Dom. <span id="ver-qn">1</span>/4</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Prof. Carla Bianchi</div></div>
                <div style={{display: "flex", alignItems: "center", gap: "5px", background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "6px", padding: "3px 9px", fontSize: "12px", fontWeight: 700, color: "#991B1B"}}>⏱ <span id="ver-timer">45:00</span></div>
              </div>
              <div style={{flex: 1, padding: "15px", overflowY: "auto"}}>
                <div style={{fontSize: "13px", fontWeight: 600, color: "var(--navy)", marginBottom: "12px", lineHeight: 1.6}} id="ver-q">1. Risolvi la seguente equazione di secondo grado. Mostra tutti i passaggi e verifica le soluzioni:<br/><br/>x² − 5x + 6 = 0</div>
                <textarea className="verans" id="ver-ans" placeholder="Svolgi qui la tua soluzione...&#10;&#10;Identifico: a=1, b=..., c=...&#10;Δ = ..."></textarea>
                <div style={{display: "flex", gap: "6px", marginTop: "7px", flexWrap: "wrap"}}><button className="tbtn" onClick={() => { openMo('mo-formula') }}>∑ Formula LaTeX</button><button className="tbtn">📎 Allega</button></div>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "12px", gap: "7px"}}><button className="btns" id="ver-prev" onClick={() => { verNav(-1) }} disabled={true}>← Prec.</button><button className="btna" id="ver-next" onClick={() => { verNav(1) }}>Successiva →</button></div>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto"}}>
              <div className="card" style={{padding: "11px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "7px"}}>Progresso</div><div style={{display: "flex", flexWrap: "wrap", gap: "4px"}} id="vq-grid"><div className="vqd curr" id="vq-0">1</div><div className="vqd" id="vq-1">2</div><div className="vqd" id="vq-2">3</div><div className="vqd" id="vq-3">4</div></div><div style={{marginTop: "6px", fontSize: "10px", color: "var(--mu)"}} id="vq-cnt">0 di 4 completate</div></div>
              <div className="card" style={{padding: "11px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "5px"}}>📋 Istruzioni</div><div style={{fontSize: "10px", color: "var(--mu)", lineHeight: 1.6}}>• Mostra tutti i passaggi<br/>• Usa l'editor formule<br/>• No aiuto AI in questa sezione<br/>• Consegna entro il tempo</div></div>
              <div className="card" style={{padding: "11px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "6px"}}>📎 Carica elaborato</div><div style={{border: "2px dashed var(--bor)", borderRadius: "8px", padding: "11px", textAlign: "center", cursor: "pointer"}}><div style={{fontSize: "17px", marginBottom: "3px"}}>📄</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Trascina o clicca</div></div></div>
              <button style={{width: "100%", padding: "10px", background: "linear-gradient(135deg,var(--navy),#1A3A5C)", border: "none", borderRadius: "9px", color: "#fff", fontFamily: "inherit", fontSize: "12px", fontWeight: 700, cursor: "pointer"}} onClick={() => { openMo('mo-consegna') }}>Consegna verifica</button>
            </div>
          </div>
        </div>

        
        <div id="sv-perf" className="vw">
          <div style={{background: "linear-gradient(135deg,var(--green),#047857)", borderRadius: "9px", padding: "9px 14px", marginBottom: "11px", fontSize: "13px", fontWeight: 700, color: "#fff"}}>📊 Le mie performance — tutti gli argomenti</div>
          <div className="krow">
            <div className="kc"><div className="kico">✅</div><div className="kval">75%</div><div className="klbl">Esercizi corretti</div><div className="kdelta up">↑</div></div>
            <div className="kc"><div className="kico">🎯</div><div className="kval">72%</div><div className="klbl">Autonomia media</div><div className="kdelta up">buono</div></div>
            <div className="kc"><div className="kico">🔁</div><div className="kval">3.2</div><div className="klbl">Tentativi medi</div><div className="kdelta wa">migliorabile</div></div>
            <div className="kc"><div className="kico">📚</div><div className="kval">7/9</div><div className="klbl">Lezioni studiate</div><div className="kdelta up">77%</div></div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 238px", gap: "12px"}}>
            <div style={{display: "flex", flexDirection: "column", gap: "11px"}}>
              <div className="card"><div className="ch"><span>📈</span><div className="ct">Andamento per argomento</div></div><div style={{padding: "12px 14px"}}>
                <div className="ebar"><span className="elbl">Eq. 1° grado</span><div className="ebg"><div className="efill" style={{width: "92%", background: "#059669"}}></div></div><span className="epct">92%</span></div>
                <div className="ebar"><span className="elbl">Eq. 2° grado</span><div className="ebg"><div className="efill" style={{width: "75%", background: "#1E6BFF"}}></div></div><span className="epct">75%</span></div>
                <div className="ebar" style={{marginBottom: 0}}><span className="elbl">Sistemi lin.</span><div className="ebg"><div className="efill" style={{width: "45%", background: "#F59E0B"}}></div></div><span className="epct">45%</span></div>
              </div></div>
              <div className="card"><div className="ch"><span>📝</span><div className="ct">Storico verifiche</div></div>
                <div style={{padding: "0 14px"}}>
                  <div className="srow"><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Verifica Eq. 1° grado</div><div style={{fontSize: "10px", color: "var(--mu)"}}>12 feb 2026</div></div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "#059669"}}>8</div><span className="tag tg" style={{flexShrink: 0, marginLeft: "7px"}}>Ottimo</span></div>
                  <div className="srow"><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Test Disequazioni</div><div style={{fontSize: "10px", color: "var(--mu)"}}>5 mar 2026</div></div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--gold)"}}>7</div><span className="tag ta" style={{flexShrink: 0, marginLeft: "7px"}}>Buono</span></div>
                  <div className="srow" style={{border: "none"}}><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 600}}>Verifica Eq. 2° grado</div><div style={{fontSize: "10px", color: "var(--mu)"}}>25 mar · In arrivo</div></div><div style={{fontFamily: "'Clash Display',sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--mu)"}}>—</div><span className="tag tw" style={{flexShrink: 0, marginLeft: "7px"}}>Prog.</span></div>
                </div>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
              <div className="card" style={{padding: "11px"}}><div style={{fontSize: "11px", fontWeight: 700, marginBottom: "8px"}}>📊 Radar</div><canvas id="perf-radar" height="155"></canvas></div>
              <div className="aiins" style={{borderRadius: "11px", padding: "11px 12px"}}><div className="aiinst">🤖 Suggerimento AI</div><div className="aiinsb">Prima del 25 marzo ripassa il calcolo del discriminante.</div><button className="btna" style={{marginTop: "7px", fontSize: "10px", width: "100%"}} onClick={() => { sV('ripasso') }}>🔄 Vai al ripasso</button></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div className="popup" id="pop-stu" onClick={() => { this.classList.add('off') }}><div className="poptop"><span className="poptit">📢 Nuovi materiali disponibili</span><button className="popx">✕</button></div><div className="popbody">Prof. Bianchi ha caricato: <strong>Formula risolutiva completa</strong></div></div>
</div>



<div className="mo" id="mo-ctx"><div className="mbox"><div className="mt">Cambia classe</div><div className="ms">Seleziona la classe su cui lavorare</div><div style={{padding: "11px 12px", borderRadius: "9px", border: "2px solid var(--blue)", background: "var(--bpale)", display: "flex", alignItems: "center", gap: "9px", marginBottom: "7px"}}><div style={{fontSize: "12px"}}>📐</div><div style={{flex: 1}}><div style={{fontSize: "12px", fontWeight: 700}}>3A — Matematica</div><div style={{fontSize: "10px", color: "var(--mu)"}}>5 studenti</div></div><div style={{width: "16px", height: "16px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px"}}>✓</div></div><div className="mact"><button className="btns" onClick={() => { closeMo('mo-ctx') }}>Chiudi</button></div></div></div>

<div className="mo" id="mo-arg"><div className="mbox"><div className="mt">Seleziona argomento</div><div className="ms">Scegli l'argomento su cui lavorare</div>
  <div style={{padding: "10px 12px", borderRadius: "9px", border: "2px solid var(--blue)", background: "var(--bpale)", cursor: "pointer", marginBottom: "6px", display: "flex", alignItems: "center", justifyContent: "space-between"}} onClick={() => { closeMo('mo-arg') }}><div><div style={{fontSize: "12px", fontWeight: 600}}>📐 Equazioni di 2° grado</div><div style={{fontSize: "10px", color: "var(--mu)"}}>In corso · 3 lezioni</div></div><div style={{width: "16px", height: "16px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px"}}>✓</div></div>
  <div style={{padding: "10px 12px", borderRadius: "9px", border: "1.5px solid var(--bor)", cursor: "pointer", marginBottom: "6px"}} onClick={() => { closeMo('mo-arg') }}><div style={{fontSize: "12px", fontWeight: 600}}>📏 Geometria analitica</div><div style={{fontSize: "10px", color: "var(--mu)"}}>Non iniziato</div></div>
  <div style={{padding: "10px 12px", borderRadius: "9px", border: "1.5px solid var(--bor)", cursor: "pointer", marginBottom: "12px"}} onClick={() => { openMo('mo-new-arg') }}><div style={{fontSize: "12px", fontWeight: 600, color: "var(--blue)"}}>+ Crea nuovo argomento</div></div>
  <div className="mact"><button className="btns" onClick={() => { closeMo('mo-arg') }}>Annulla</button><button className="btna" onClick={() => { closeMo('mo-arg') }}>Conferma</button></div></div></div>

<div className="mo" id="mo-new-arg"><div className="mbox"><div className="mt">Nuovo argomento</div><div className="ms">Definisci argomento, sottoargomenti e obiettivi</div>
  <div className="mpill">Nome argomento</div><input className="mi" placeholder="Es. Probabilità e statistica"/>
  <div className="mpill">Nome sottoargomento</div><input className="mi" placeholder="Es. Probabilità classica"/>
  <div className="mpill">Obiettivi didattici</div><textarea className="mi" style={{height: "60px", resize: "none"}} placeholder="Es. Comprendere il concetto di probabilità"></textarea>
  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "9px"}}><div><div className="ml" style={{marginTop: 0}}>Data inizio</div><input className="mi" type="date" style={{marginBottom: 0}}/></div><div><div className="ml" style={{marginTop: 0}}>Data fine</div><input className="mi" type="date" style={{marginBottom: 0}}/></div></div>
  <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px"}}><div className="mpill" style={{marginBottom: 0, flex: 1, marginRight: "7px"}}>Lezioni programmate</div><button className="btna" style={{fontSize: "10px"}} onClick={() => { addLes() }}>+</button></div>
  <div className="lzl" id="lz-list"><div className="lzi"><div className="lzn">1</div><div style={{flex: 1, fontSize: "11px"}}>Lezione 1</div><div style={{fontSize: "10px", color: "var(--mu)"}}>—</div></div></div>
  <div className="mact"><button className="btns" onClick={() => { closeMo('mo-new-arg') }}>Annulla</button><button className="btna" onClick={() => { closeMo('mo-new-arg') }}>Crea argomento</button></div></div></div>

<div className="mo" id="mo-new-les"><div className="mbox"><div className="mt">Aggiungi lezione</div><div className="ms">Inserisci nome e data</div><div className="ml" style={{marginTop: 0}}>Nome lezione</div><input className="mi" id="les-nm" placeholder="Es. Il discriminante"/><div className="ml">Data pianificata</div><input className="mi" id="les-dt" type="date"/><div className="mact"><button className="btns" onClick={() => { closeMo('mo-new-les') }}>Annulla</button><button className="btna" onClick={() => { doAddLes() }}>Aggiungi</button></div></div></div>

<div className="mo" id="mo-new-es"><div className="mbox w"><div className="mt">Nuovo esercizio</div><div className="ms">Crea manualmente o con l'AI</div>
  <div className="ml" style={{marginTop: 0}}>Titolo</div><input className="mi" placeholder="Es. Equazioni parametriche"/>
  <div className="ml">Tipo</div><select className="mi"><option>Aperto (risposta libera)</option><option>Chiuso (scelta multipla)</option></select>
  <div className="ml">Testo</div><textarea className="mi" style={{height: "75px", resize: "none"}} placeholder="Scrivi il testo dell'esercizio..."></textarea>
  <div style={{display: "flex", gap: "5px", marginBottom: "9px", flexWrap: "wrap"}}><button className="tbtn" onClick={() => { openMo('mo-formula') }}>∑ Formula LaTeX</button><button className="tbtn">📈 Grafico</button></div>
  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}><div><div className="ml" style={{marginTop: 0}}>Deadline</div><input className="mi" type="date" style={{marginBottom: 0}}/></div><div><div className="ml" style={{marginTop: 0}}>Obbligatorio</div><select className="mi" style={{marginBottom: 0}}><option>Sì</option><option>No</option></select></div></div>
  <button className="btns" style={{width: "100%", fontSize: "10px", marginTop: "9px", marginBottom: "9px"}}>🤖 Genera suggerimenti AI</button>
  <div className="mact"><button className="btns" onClick={() => { closeMo('mo-new-es') }}>Annulla</button><button className="btna" onClick={() => { closeMo('mo-new-es') }}>Salva bozza</button><button className="btna" style={{background: "#059669"}} onClick={() => { closeMo('mo-new-es') }}>Pubblica</button></div></div></div>

<div className="mo" id="mo-formula"><div className="mbox"><div className="mt">∑ Editor Formule — LaTeX</div><div className="ms">Digita la formula e vedi l'anteprima</div>
  <div style={{display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "9px"}}>
    <button style={{padding: "3px 8px", borderRadius: "5px", border: "1px solid var(--bor)", background: "#fff", fontFamily: "'Courier New',monospace", fontSize: "10px", cursor: "pointer"}} onClick={() => { insF('\\frac{a}{b}') }}>a/b</button>
    <button style={{padding: "3px 8px", borderRadius: "5px", border: "1px solid var(--bor)", background: "#fff", fontFamily: "'Courier New',monospace", fontSize: "10px", cursor: "pointer"}} onClick={() => { insF('x^{2}') }}>x²</button>
    <button style={{padding: "3px 8px", borderRadius: "5px", border: "1px solid var(--bor)", background: "#fff", fontFamily: "'Courier New',monospace", fontSize: "10px", cursor: "pointer"}} onClick={() => { insF('\\sqrt{x}') }}>√x</button>
    <button style={{padding: "3px 8px", borderRadius: "5px", border: "1px solid var(--bor)", background: "#fff", fontFamily: "'Courier New',monospace", fontSize: "10px", cursor: "pointer"}} onClick={() => { insF('\\Delta = b^2 - 4ac') }}>Δ=b²-4ac</button>
    <button style={{padding: "3px 8px", borderRadius: "5px", border: "1px solid var(--bor)", background: "#fff", fontFamily: "'Courier New',monospace", fontSize: "10px", cursor: "pointer"}} onClick={() => { insF('\\pm') }}>±</button>
    <button style={{padding: "3px 8px", borderRadius: "5px", border: "1px solid var(--bor)", background: "#fff", fontFamily: "'Courier New',monospace", fontSize: "10px", cursor: "pointer"}} onClick={() => { insF('\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}') }}>formula completa</button>
  </div>
  <textarea className="mi" id="f-inp" style={{fontFamily: "'Courier New',monospace", height: "52px", resize: "none"}} onInput={() => { renderF(this.value) }}>x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}</textarea>
  <div style={{fontSize: "10px", color: "var(--mu)", marginBottom: "4px"}}>Anteprima:</div>
  <div id="f-prev" style={{minHeight: "38px", padding: "9px", background: "var(--sur)", borderRadius: "7px", border: "1px solid var(--bor)", marginBottom: "9px", textAlign: "center", fontSize: "14px"}}>\(x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\)</div>
  <div className="mact"><button className="btna" style={{flex: 1}} onClick={() => { insFormula() }}>Inserisci ✓</button><button className="btns" onClick={() => { closeMo('mo-formula') }}>Chiudi</button></div></div></div>

<div className="mo" id="mo-mat"><div className="mbox"><div className="mt">Seleziona materia</div><div className="ms">Scegli su quale materia vuoi lavorare</div>
  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "13px"}}>
    <div style={{padding: "12px", borderRadius: "9px", border: "2px solid var(--blue)", background: "var(--bpale)", cursor: "pointer", textAlign: "center"}} onClick={() => { setSMat('📐 Matematica');closeMo('mo-mat') }}><div style={{fontSize: "19px", marginBottom: "3px"}}>📐</div><div style={{fontSize: "11px", fontWeight: 700}}>Matematica</div></div>
    <div style={{padding: "12px", borderRadius: "9px", border: "1.5px solid var(--bor)", cursor: "pointer", textAlign: "center"}} onClick={() => { setSMat('⚡ Fisica');closeMo('mo-mat') }}><div style={{fontSize: "19px", marginBottom: "3px"}}>⚡</div><div style={{fontSize: "11px", fontWeight: 700}}>Fisica</div></div>
  </div>
  <div className="mact"><button className="btns" onClick={() => { closeMo('mo-mat') }}>Chiudi</button></div></div></div>

<div className="mo" id="mo-consegna"><div className="mbox" style={{textAlign: "center"}}><div style={{fontSize: "36px", marginBottom: "9px"}}>📝</div><div className="mt" style={{textAlign: "center"}}>Confermi la consegna?</div><div className="ms" style={{textAlign: "center", marginBottom: "16px"}}>Una volta consegnata non potrai più modificare le risposte.</div><div className="mact" style={{justifyContent: "center"}}><button className="btns" onClick={() => { closeMo('mo-consegna') }}>Annulla</button><button className="btna" onClick={() => { doConsegna() }}>Sì, consegna ✓</button></div></div></div>
    </div>
  );
}
