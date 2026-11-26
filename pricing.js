/* Single source of truth for prices (EUR). Used by index.html (form estimate) and proposal.html.
   Change a number in GRID and every bundle, estimate and table follows. Agreed baseline: 2026-11-12. */
const T=(en,de)=>({en,de});
const GRID={
  base:{setup:250,refresh:150,s4:250,s2:135},   // client brings their own list
  lg:{setup:200,refresh:100,s4:125,s2:65},      // lead generation add-on: we find the people
  list:300,followup:100,language:50,area:100
};
const _b=(key,route,name,d,price,refresh,weeks,incl)=>({key,route,name,d,price,refresh,weeks,incl,
  en:`${name}: ${d.en}`,de:`${name}: ${d.de}`});
const PRICING={cur:"€",followup:GRID.followup,language:GRID.language,area:GRID.area,list:GRID.list,grid:GRID,
 bundles:[
  _b("starter","own","Starter",T("your own list, 2-week sprint","Ihre eigene Liste, 2 Wochen"),
     GRID.base.setup+GRID.base.s2,GRID.base.setup-GRID.base.refresh,2,
     T("Base set-up and a 2-week sprint","Basis-Einrichtung und ein 2-Wochen-Sprint")),
  _b("standard","own","Standard",T("your own list, 4-week sprint","Ihre eigene Liste, 4 Wochen"),
     GRID.base.setup+GRID.base.s4,GRID.base.setup-GRID.base.refresh,4,
     T("Base set-up and a 4-week sprint","Basis-Einrichtung und ein 4-Wochen-Sprint")),
  _b("lgstarter","build","Lead Gen Starter",T("we build your list, 2-week sprint","wir erstellen Ihre Liste, 2 Wochen"),
     GRID.base.setup+GRID.lg.setup+GRID.base.s2+GRID.lg.s2,(GRID.base.setup+GRID.lg.setup)-(GRID.base.refresh+GRID.lg.refresh),2,
     T("Set-up with lead generation and a 2-week sprint","Einrichtung mit Lead-Generierung und ein 2-Wochen-Sprint")),
  _b("lgfull","build","Lead Gen Full",T("we build your list, 4-week sprint","wir erstellen Ihre Liste, 4 Wochen"),
     GRID.base.setup+GRID.lg.setup+GRID.base.s4+GRID.lg.s4,(GRID.base.setup+GRID.lg.setup)-(GRID.base.refresh+GRID.lg.refresh),4,
     T("Set-up with lead generation and a 4-week sprint","Einrichtung mit Lead-Generierung und ein 4-Wochen-Sprint"))],
 best:T("Pick the best bundle for my case","Das passende Paket für meinen Fall auswählen")};
const money=n=>PRICING.cur+n;
const bLabel=(b,lg)=>`${b[lg]} (${money(b.price)})`;
/* One more 4-week sprint after the first: base sprint, plus the lead generation part when we build the list. */
const extraSprint=route=>route==="build"?GRID.base.s4+GRID.lg.s4:GRID.base.s4;
