(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var zl=function(n){return n.toLocaleString('pl-PL',{minimumFractionDigits:2,maximumFractionDigits:2})+' zł'};
var UP='https://para.pl/wp-content/uploads/';

/* ---------- farby (dane ze sklepu para.pl, 23.11.2026) ---------- */
var P=[
 {s:'ultra-8000',k:'8000',n:'PARA Ultra 8000',gl:'Mat',glf:'Pełny mat',g:'mat',cyc:'10 000',gu:'@60: 1-5 GU, @85: 1-3 GU',wyd:12,v:[['0,946 l',138.14],['3,78 l',455.86]],dark:0,
  d:'W 100% lateksowa farba, w pełni matowa, do zmywania i mycia detergentami. Stworzona dla osób, które cenią jakość i elegancję. Idealna do salonów i pomieszczeń narażonych na zabrudzenia.',
  dry:'Sucha w dotyku: 30-60 min, następne malowanie: 2-6 godz., całkowite wyschnięcie: 24 godz.',sol:'83% wagowo, 40% objętościowo',kol:'Biała. Barwiona na pastelowe kolory (ok. 1800 z DL III). Do innych kolorów linia 1800.',baz:'1, 2, 3, 4, 5',use:'Salon, pomieszczenia narażone na zabrudzenia; tynki, gładzie, płyty g-k, zagruntowane drewno',tds:'2022/04/PARA-8000-Karta-techniczna.pdf',sds:'2022/04/Para-8000-Karta-Charakterystyki.pdf'},
 {s:'premium-velvet-1800',k:'1800',n:'PARA Premium Velvet 1800',gl:'Półmat',glf:'Półmat',g:'pmat',cyc:'10 000',gu:'@60: 3-4 GU, @85: 6-12 GU',wyd:12,v:[['0,946 l',108.21],['3,78 l',331.08]],dark:1,out:1,
  d:'Lateksowa farba o półmatowym stopniu połysku, zmywalna i odporna na szorowanie. Do użytku wewnątrz i na zewnątrz. Tworzy piękną i elegancką powłokę. Zalecana do salonów i pomieszczeń narażonych na zabrudzenia.',
  dry:'Sucha w dotyku: 1-2 godz., następne malowanie: 4-6 godz., całkowite wyschnięcie: 24 godz.',sol:'47% wagowo, 30% objętościowo (dla farby białej)',kol:'Biała. Ponad 3500 kolorów w systemie barwienia.',baz:'1, 4',use:'Salon, pokój dzienny, wnętrza i elewacje; tynki, gładzie, płyty g-k, zagruntowane drewno',tds:'2022/04/PARA-1800-Karta-techniczna.pdf',sds:'2022/04/Para-1800-Karta-Charakterystyki.pdf'},
 {s:'elite-ceramic-4090',k:'4090',n:'PARA Elite Ceramic 4090',gl:'Skorupka jajka',glf:'Eggshell (skorupka jajka)',g:'egg',cyc:'20 000',gu:'@60: 8-10 GU, @85: 0-2 GU',wyd:14,v:[['0,946 l',178.27],['3,78 l',580.66]],dark:0,
  d:'Ceramiczna farba lateksowa o połysku skorupki jajka. Najwyższej jakości farba z domieszką opiłków ceramicznych. Tworzy elegancką i bardzo trwałą powłokę. Do salonów i pomieszczeń narażonych na duże zabrudzenia.',
  dry:'Sucha w dotyku: 1-2 godz., następne malowanie: 4-6 godz., pełna eksploatacja z myciem po 30 dniach.',sol:'60% wagowo, 33% objętościowo',kol:'Biała. Barwiona na ok. 1500 pastelowych kolorów w systemie PARA.',baz:'-',use:'Korytarz, hol, klatka schodowa, kuchnia, pokój dziecięcy, salon',tds:'2022/04/PARA-4090-Karta-techniczna.pdf',sds:'2022/04/Para-4090-Karta-Charakterystyki.pdf'},
 {s:'premium-mat-900',k:'900',n:'PARA Premium Mat 900',gl:'Mat',glf:'Mat',g:'mat',cyc:'2 500',gu:'@60: 0-2 GU, @85: 0-2 GU',wyd:12,v:[['0,946 l',89.13],['3,78 l',292.87]],dark:0,
  d:'Lateksowa farba o matowym stopniu połysku, zmywalna. Minimalizuje nierówności podłoża, dlatego jest zalecana także do sufitów. Polecana do sypialni i pokoi nienarażonych na duże zabrudzenia.',
  dry:'Sucha w dotyku: 30-60 min, następne malowanie: 4-6 godz., całkowite wyschnięcie: 24 godz.',sol:'60% wagowo, 33% objętościowo',kol:'Biała. Barwiona na jasne, pastelowe kolory (ok. 2200).',baz:'-',use:'Sypialnia, garderoba, sufity; tynki, gładzie, płyty g-k',tds:'2022/08/PARA-900-Karta-techniczna.pdf',sds:'2022/04/Para-900-Karta-Charakterystyki.pdf'},
 {s:'ultra-976',k:'976',n:'PARA Ultra 976',gl:'Głęboki mat',glf:'Głęboki mat, sufitowa',g:'gmat',cyc:'-',gu:'@60: 2 GU, @85: 3 GU',wyd:12,v:[['0,946 l',89.13],['3,78 l',267.41]],dark:0,ceil:1,
  d:'Farba sufitowa o stopniu połysku głębokiego matu, śnieżnobiała. W postaci niekapiącego żelu, bezzapachowa, o wysokiej sile krycia. Minimalizuje nierówności podłoża i nie żółknie.',
  dry:'Sucha w dotyku: 30 min, następne malowanie: 2-4 godz., całkowite wyschnięcie: 24 godz.',sol:'58% wagowo, 37% objętościowo',kol:'Biała. Barwiona tylko na jasne kolory (ok. 1500 z DL III i DL IV).',baz:'-',use:'Sufity w sypialniach, salonach, jadalniach, holu, łazience i kuchni',tds:'2022/04/PARA-976-Karta-techniczna.pdf',sds:'2022/04/PARA-976-Karta-Charakterystyki.pdf'},
 {s:'melamina-8300',k:'8300',n:'PARA Melamina 8300',gl:'Satyna',glf:'Satyna',g:'sat',cyc:'-',gu:'-',wyd:12,v:[['0,946 l',125.68]],dark:1,wood:1,
  d:'Alkidowo-akrylowa emalia lateksowa do drewna wewnątrz pomieszczeń. Piękna i bardzo trwała powierzchnia dla stolarki, paneli, mebli, listew przypodłogowych, ram okiennych i drzwi. Łatwo uzyskać gładką, zmywalną powłokę.',
  dry:'Sucha w dotyku: 2 godz., następne malowanie: 8 godz., całkowite wyschnięcie: 48 godz.',sol:'52% wagowo, 37% objętościowo',kol:'Biała. Może być barwiona na kolor.',baz:'-',use:'Drzwi, meble, listwy przypodłogowe, ramy okienne, panele',tds:'',sds:''}
];
var TESTER=44.57;
var bySlug=function(s){return P.filter(function(p){return p.s===s})[0]};
var byK=function(k){return P.filter(function(p){return p.k===k})[0]};
var GL={gmat:'g-gmat',mat:'g-mat',pmat:'g-pmat',egg:'g-egg',sat:'g-sat'};
var img=function(p,w){return 'img/p-'+p.k+'-'+(w||400)+'.webp'};
var from=function(p){return p.v[0][1]};

/* ---------- paleta: Lab, rodziny, opisy ---------- */
var FAM=[['biele','Biele'],['szarosci','Szarości'],['beze','Beże i greige'],['braz','Brązy'],['czerw','Czerwienie i bordo'],['roze','Róże'],['pom','Pomarańcze i terakoty'],['zolte','Żółcie'],['ziel','Zielenie'],['turk','Turkusy'],['nieb','Błękity i granaty'],['fiol','Fiolety']];
var FAMN={};FAM.forEach(function(f){FAMN[f[0]]=f[1]});
var FAMS={biele:'biel',szarosci:'szarość',beze:'beż',braz:'brąz',czerw:'czerwień',roze:'róż',pom:'pomarańcz',zolte:'żółć',ziel:'zieleń',turk:'turkus',nieb:'błękit',fiol:'fiolet'};
function lab(hex){
 var c=[0,2,4].map(function(i){var v=parseInt(hex.substr(i,2),16)/255;return v>0.04045?Math.pow((v+0.055)/1.055,2.4):v/12.92});
 var X=(c[0]*.4124+c[1]*.3576+c[2]*.1805)/.95047,Y=c[0]*.2126+c[1]*.7152+c[2]*.0722,Z=(c[0]*.0193+c[1]*.1192+c[2]*.9505)/1.08883;
 var f=function(t){return t>0.008856?Math.cbrt(t):7.787*t+16/116};
 return [116*f(Y)-16,500*(f(X)-f(Y)),200*(f(Y)-f(Z))];
}
function famOf(L,a,b,C,h){
 if(C<5.5)return L>=90?'biele':'szarosci';
 if(L>=91&&C<10)return 'biele';
 if(C<14&&h>=40&&h<115&&L>=52)return 'beze';
 if(C<9)return 'szarosci';
 if(C<12&&h>=40&&h<115)return 'beze';
 if(h>=340||h<35)return L>=68?'roze':(C<22&&L<50?'braz':'czerw');
 if(h<70)return (L<52||(C<26&&L<64))?'braz':'pom';
 if(h<105)return L<56?'braz':(C<22?'beze':'zolte');
 if(h<172)return 'ziel';
 if(h<218)return 'turk';
 if(h<302)return 'nieb';
 return L>=74&&h>322?'roze':'fiol';
}
var C=[],CK={};
(function(){
 var PA=window.PALETA||{DL5:[],DL4:[]};
 ['DL5','DL4'].forEach(function(sys){PA[sys].forEach(function(r,i){
  var hex=r[1],l=lab(hex),Cc=Math.sqrt(l[1]*l[1]+l[2]*l[2]),h=(Math.atan2(l[2],l[1])*180/Math.PI+360)%360;
  var fam=famOf(l[0],l[1],l[2],Cc,h);
  var warm=Cc<14?((l[2]>2&&h>=15&&h<115)?1:((l[2]<0||(h>=150&&h<302))?-1:0)):((h<105||h>=340)?1:(h>=150&&h<302?-1:0));
  var m=sys==='DL5'?/^(\d{3})([A-G])$/.exec(r[0]):/^(P\d{4})-(\d{2})/.exec(r[0]);
  var o={k:r[0],hex:'#'+hex,sys:sys,dark:r[2],L:l[0],a:l[1],b:l[2],C:Cc,h:h,fam:fam,warm:warm,strip:m?sys+m[1]:'',i:C.length};
  C.push(o);CK[o.k.toUpperCase()]=o;
 })});
})();
var lv=function(L){return L>=85?'bardzo jasny':L>=70?'jasny':L>=50?'średni':L>=35?'ciemny':'głęboki'};
var FEM={biele:1,szarosci:1,czerw:1,zolte:1,ziel:1};
function desc(c){
 var f=FEM[c.fam],nm=FAMS[c.fam];
 var l={'bardzo jasny':f?'bardzo jasna':'bardzo jasny','jasny':f?'jasna':'jasny','średni':f?'średnia':'średni','ciemny':f?'ciemna':'ciemny','głęboki':f?'głęboka':'głęboki'}[lv(c.L)];
 var t=c.warm>0?(f?'ciepła':'ciepły'):c.warm<0?(f?'chłodna':'chłodny'):(f?'neutralna':'neutralny');
 return nm.charAt(0).toUpperCase()+nm.slice(1)+', '+l+' i '+t;
}
var fc=function(c){return c.L>58?'#1B1D1F':'#fff'};
var dE=function(x,y){var d0=x.L-y.L,d1=x.a-y.a,d2=x.b-y.b;return Math.sqrt(d0*d0+d1*d1+d2*d2)};
function nearest(c,n,filt){return C.filter(function(o){return o!==c&&(!filt||filt(o))}).map(function(o){return [dE(c,o),o]}).sort(function(a,b){return a[0]-b[0]}).slice(0,n).map(function(x){return x[1]})}
function stripOf(c){
 if(c.strip)return C.filter(function(o){return o.strip===c.strip}).sort(function(a,b){return b.L-a.L});
 var s=C.filter(function(o){return o.sys===c.sys&&o.fam===c.fam&&Math.abs(o.h-c.h)<14&&Math.abs(o.C-c.C)<12}).sort(function(a,b){return Math.abs(a.L-c.L)-Math.abs(b.L-c.L)}).slice(0,8);
 if(s.indexOf(c)<0)s[s.length-1]=c;
 return s.sort(function(a,b){return b.L-a.L});
}
function pairsOf(c){
 var st=stripOf(c).filter(function(o){return o!==c});
 var tL=c.L>55?c.L-30:c.L+32;
 var ton=st.length?st.slice().sort(function(a,b){return Math.abs(a.L-tL)-Math.abs(b.L-tL)})[0]:nearest(c,1,function(o){return Math.abs(o.L-tL)<8})[0];
 var th=(c.h+180)%360,kL=c.L>60?c.L-22:c.L+22;
 var hd=function(o){var d=Math.abs(o.h-th);return Math.min(d,360-d)};
 var kon=C.filter(function(o){return o.C>=Math.max(14,c.C*.6)&&o.sys===c.sys}).sort(function(a,b){return (hd(a)+Math.abs(a.L-kL)*.7)-(hd(b)+Math.abs(b.L-kL)*.7)})[0];
 var wh=C.filter(function(o){return o.fam==='biele'&&o.C<6});
 var bia=wh.sort(function(a,b){return c.warm>=0?(b.b-a.b)+(a.L>b.L?-0.2:0.2):(a.b-b.b)})[c.warm===0?Math.floor(wh.length/2):0];
 if(c.fam==='biele')bia=C.filter(function(o){return o.fam==='szarosci'&&o.L>55&&o.L<72&&(c.warm>=0?o.b>1:o.b<0)})[0]||bia;
 return [[ton,'Para tonalna','Ten sam ton w innym nasyceniu. Spokojne przejście między ścianą główną a wnęką albo lamperią.'],[kon,'Para kontrastowa','Barwa z przeciwnej strony koła barw. Na ścianę akcentową, drzwi albo meble.'],[bia,c.fam==='biele'?'Para z szarością':'Para z bielą',c.fam==='biele'?'Szarość o tej samej temperaturze. Na ścianę za łóżkiem albo sofą.':'Biel o tej samej temperaturze co kolor. Na sufit, listwy i stolarkę.']].filter(function(x){return x[0]});
}
/* farby dla koloru */
function paintsFor(c){
 if(!c.dark){var l=[byK('8000'),byK('1800'),byK('4090'),byK('900')];if(c.L>=80)l.push(byK('976'));l.push(byK('8300'));return {l:l,w:''}}
 return {l:[byK('1800'),byK('8300')],w:'Ciemny kolor: farby 900, 976 i 8000 barwimy tylko na jasne odcienie. Do ciemnych barw karta PARA 8000 poleca linię 1800 - dostępność bazy potwierdza dział barwienia przy zamówieniu.'};
}

/* ---------- wyszukiwanie jezykiem naturalnym ---------- */
var FW=[[/biel|biał|bial|ecru|kremow|śmietan|kość|kosc/i,'biele'],[/szaroś|szaros|szar|grafit|antracyt|popiel|stalow|beton/i,'szarosci'],[/beż|bez\b|beze|greige|piask|kawa z mlek|cappucc|taup/i,'beze'],[/brąz|braz|czekolad|kakao|orzech|kawow/i,'braz'],[/czerw|bordo|burgund|wiśni|wisni|karmin/i,'czerw'],[/róż|roz\b|roze|róże|pudr|łososi|lososi/i,'roze'],[/pomarańcz|pomarancz|terakot|brzoskw|rud|miedzi|koral/i,'pom'],[/żółt|zolt|żółć|zolc|musztard|cytryn|słonecz|slonecz|miodow|złot|zlot/i,'zolte'],[/ziel|oliw|szałw|szalw|mięt|miet|butelkow|khaki|limonk|pistacj/i,'ziel'],[/turkus|morsk|petrol|lazur|akwam/i,'turk'],[/błęk|blek|niebiesk|granat|navy|chaber|indyg|kobalt/i,'nieb'],[/fiolet|lawend|lila|wrzos|śliw|sliw|ameryst/i,'fiol']];
var ROOM=[[/sypial|garderob/i,'sypialnia','900'],[/salon|pokój dzienn|pokoj dzienn|jadaln/i,'salon','1800'],[/kuchn/i,'kuchnia','4090'],[/łazien|lazien/i,'łazienka','4090'],[/korytarz|hol\b|przedpok|klatk|wejści/i,'korytarz','4090'],[/dziec|dzieci|maluch/i,'pokój dziecięcy','4090'],[/biur|gabinet|pracown/i,'biuro','8000'],[/sufit/i,'sufit','976'],[/drzw|mebl|stolar|listw|okn|panel/i,'stolarka','8300'],[/zewn|elewac|taras|balkon/i,'na zewnątrz','1800']];
function parseQ(q){
 var r={fam:[],tags:[],f:[],room:null,code:null};if(!q)return r;
 var qt=q.trim();
 var cm=/^\s*([a-z]{0,5}\d{2,4}[a-z]?(-\d{1,2}d?)?)\s*$/i.exec(qt);
 if(cm){r.code=cm[1].toUpperCase();r.tags.push('kod '+r.code);return r}
 FW.forEach(function(x){if(x[0].test(qt)&&r.fam.indexOf(x[1])<0){r.fam.push(x[1]);r.tags.push(FAMN[x[1]].toLowerCase())}});
 if(/granat|navy|indyg/i.test(qt)){r.f.push(function(c){return c.L<45});r.tags.push('ciemny')}
 if(/butelkow|bordo|burgund|czekolad/i.test(qt))r.f.push(function(c){return c.L<45});
 if(/terakot|rud|miedzi/i.test(qt))r.f.push(function(c){return c.L<72&&c.C>=22});
 if(/mięt|miet|lawend|pudr/i.test(qt))r.f.push(function(c){return c.L>=72});
 if(/szałw|szalw|oliw|khaki/i.test(qt))r.f.push(function(c){return c.C<30});
 if(/ciepł|ciepl/i.test(qt)){r.f.push(function(c){return c.warm>0});r.tags.push('ciepły')}
 if(/chłodn|chlodn|zimn/i.test(qt)){r.f.push(function(c){return c.warm<0});r.tags.push('chłodny')}
 if(/neutraln|złaman|zlaman|stonowan|przygaszon/i.test(qt)){r.f.push(function(c){return c.C<18});r.tags.push('stonowany')}
 if(/bardzo jasn/i.test(qt)){r.f.push(function(c){return c.L>=85});r.tags.push('bardzo jasny')}
 else if(/jasn|pastel|delikat/i.test(qt)){r.f.push(function(c){return c.L>=70});r.tags.push('jasny')}
 if(/średn|sredn/i.test(qt)){r.f.push(function(c){return c.L>=50&&c.L<70});r.tags.push('średni')}
 if(/ciemn/i.test(qt)){r.f.push(function(c){return c.L<50});r.tags.push('ciemny')}
 if(/głęb|gleb|intensyw|nasycon|mocn|wyrazist/i.test(qt)){r.f.push(function(c){return c.C>=28||c.L<38});r.tags.push('głęboki')}
 ROOM.some(function(x){if(x[0].test(qt)){r.room=x;r.tags.push(x[1]);return true}});
 if(r.room&&r.room[1]==='sufit'&&!r.f.length){r.f.push(function(c){return c.L>=82})}
 if(r.room&&r.room[1]==='sypialnia'&&!/ciemn|głęb|gleb|granat|mocn/i.test(qt))r.f.push(function(c){return c.L>=55&&c.C<40});
 if(!r.fam.length&&!r.f.length&&!r.room){r.raw=qt.toUpperCase()}
 return r;
}
function searchC(q,opt){
 opt=opt||{};var pr=parseQ(q),res;
 if(pr.code){res=C.filter(function(c){return c.k.toUpperCase().indexOf(pr.code)===0});if(!res.length)res=C.filter(function(c){return c.k.toUpperCase().indexOf(pr.code)>=0})}
 else if(pr.raw){res=C.filter(function(c){return c.k.toUpperCase().indexOf(pr.raw.replace(/\s/g,''))>=0})}
 else res=C.filter(function(c){return (!pr.fam.length||pr.fam.indexOf(c.fam)>=0)&&pr.f.every(function(f){return f(c)})});
 if(opt.fam)res=res.filter(function(c){return c.fam===opt.fam});
 if(opt.sys)res=res.filter(function(c){return c.sys===opt.sys});
 if(opt.l==='j')res=res.filter(function(c){return !c.dark});
 if(opt.l==='c')res=res.filter(function(c){return c.dark});
 if(q&&!pr.code){var neu=pr.fam.length&&pr.fam.every(function(f){return f==='szarosci'||f==='biele'});res=res.slice().sort(neu?function(a,b){return (Math.round(a.C/2.5)-Math.round(b.C/2.5))||(b.L-a.L)}:function(a,b){return b.L-a.L})}
 return {r:res,p:pr};
}
function ceg(c,extra){return '<a class="ceg" href="#/kolor/'+encodeURIComponent(c.k)+'" style="--c:'+c.hex+'"><i></i><span>'+esc(c.k)+'<small>'+(extra||c.sys)+'</small></span></a>'}

/* ---------- koszyk ---------- */
var cart=[];
try{cart=JSON.parse(sessionStorage.getItem('para-koszyk')||'[]')||[]}catch(e){cart=[]}
function saveCart(){try{sessionStorage.setItem('para-koszyk',JSON.stringify(cart))}catch(e){}renderCart()}
function addCart(it){
 var f=cart.filter(function(x){return x.s===it.s&&x.v===it.v&&x.c===it.c})[0];
 if(f)f.q+=it.q||1;else cart.push({s:it.s,v:it.v,c:it.c,q:it.q||1,pr:it.pr});
 saveCart();toast((it.s==='tester'?'Tester 450 ml':bySlug(it.s).n+' '+it.v)+(it.c?' w kolorze '+it.c:'')+' - dodano do koszyka');
}
function renderCart(){
 var n=cart.reduce(function(a,x){return a+x.q},0),sum=cart.reduce(function(a,x){return a+x.q*x.pr},0);
 $('#cartn').textContent=n;
 $('#clines').innerHTML=cart.length?cart.map(function(x,i){var p=x.s==='tester'?null:bySlug(x.s),c=CK[(x.c||'').toUpperCase()];
  return '<div class="cl"><div class="im"><img src="'+(p?img(p):'img/tester-640.webp')+'" alt="" width="64" height="64">'+(c?'<i style="--c:'+c.hex+'"></i>':'')+'</div><div><b>'+(p?esc(p.n):'Próbka koloru PARA 450 ml')+'</b><small>'+(p?esc(x.v)+' · ':'')+(c?'kolor '+esc(c.k):'kolor biały / do wyboru')+'</small><div class="q"><button type="button" data-cq="'+i+'" data-d="-1" aria-label="Mniej">-</button><b>'+x.q+'</b><button type="button" data-cq="'+i+'" data-d="1" aria-label="Więcej">+</button><button type="button" class="rm" data-crm="'+i+'">usuń</button></div></div><b>'+zl(x.q*x.pr)+'</b></div>'}).join(''):'<p class="empty">Koszyk jest pusty. Wybierz kolor i farbę albo zamów tester 450 ml.</p>';
 $('#csum').textContent=zl(sum);
}
function openCart(){$('.cart').hidden=false;$('.scrim').hidden=false}
function closeCart(){$('.cart').hidden=true;$('.scrim').hidden=true}
var tt;function toast(m){var t=$('.toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(function(){t.hidden=true},2600)}

/* ---------- moduly strony glownej ---------- */
var QS=['ciepła szarość do sypialni','głęboki granat do salonu','jasna zieleń szałwiowa','biel na sufit','terakota','321D','WH05'];
function renderQs(el){el.innerHTML=QS.map(function(q){return '<button type="button" data-q="'+esc(q)+'">'+esc(q)+'</button>'}).join('')}
function renderFams(){
 $('#fams').innerHTML=FAM.map(function(f){
  var l=C.filter(function(c){return c.fam===f[0]&&c.sys==='DL5'});var all=C.filter(function(c){return c.fam===f[0]}).length;
  l.sort(function(a,b){return b.L-a.L});var pk=[.15,.45,.75].map(function(t){return l[Math.floor(t*(l.length-1))]});
  return '<a class="ceg" href="#/kolory?r='+f[0]+'"><i>'+pk.map(function(c){return '<em style="--c:'+c.hex+'"></em>'}).join('')+'</i><span>'+f[1]+'<small>'+all+'</small></span></a>'}).join('');
}
var ALT=['321D','WH05','109F','116G','134F','219F','439A','311G'];
var pairC='321D';
function renderPair(){
 var c=CK[pairC],pf=paintsFor(c),show=c.dark?pf.l:[byK('8000'),byK('1800'),byK('4090')];
 $('#pairmod').innerHTML='<div class="pick"><div class="sw" style="--c:'+c.hex+'"><span><b>'+esc(c.k)+'</b>'+esc(desc(c))+'<br><a href="#/kolor/'+encodeURIComponent(c.k)+'">karta koloru</a></span></div><div class="alt" role="group" aria-label="Zmień kolor">'+ALT.map(function(k){var o=CK[k];return '<button type="button" data-pair="'+k+'" style="--c:'+o.hex+'" aria-pressed="'+(k===pairC)+'" aria-label="Kolor '+k+'"></button>'}).join('')+'</div></div>'+
 '<div><div class="paints">'+show.map(function(p){return '<div class="pc"><div class="panel sheen '+GL[p.g]+'" style="--c:'+c.hex+'"><img src="'+img(p)+'" width="400" height="400" alt="" loading="lazy"></div><div class="b"><span class="gl">'+p.glf+(p.cyc!=='-'?' · '+p.cyc+' cykli zmywalności':'')+'</span><h3>'+p.n.replace('PARA ','')+'</h3><span class="note">'+esc(p.use.split(';')[0])+'</span><span class="pr">od '+zl(from(p))+'</span><div class="acts"><a class="btn" href="#/farba/'+p.s+'?c='+encodeURIComponent(c.k)+'">Zamów w '+esc(c.k)+'</a><button class="btn o" type="button" data-tester="'+esc(c.k)+'">Tester 44,57 zł</button></div></div></div>'}).join('')+'</div>'+(pf.w?'<p class="note" style="margin-top:14px">'+pf.w+'</p>':'')+'</div>';
}
/* polysk */
var GLO=[['mat','Mat','Premium Mat 900, Ultra 8000','@60: 0-5 GU','Sypialnia, garderoba i pokoje nienarażone na intensywne użytkowanie. Mat ukrywa nierówności podłoża.','2 500 (900), 10 000 (8000)'],['pmat','Półmat','Premium Velvet 1800','@60: 3-4 GU, @85: 6-12 GU','Salon i pokój dzienny. Pozwala usuwać trudniejsze zabrudzenia, zachowując strukturę powłoki.','10 000'],['egg','Skorupka jajka','Elite Ceramic 4090','@60: 8-10 GU','Korytarz, hol, klatka schodowa, kuchnia, pokój dziecięcy. Usuwanie bardzo trudnych zabrudzeń, także detergentami.','20 000'],['sat','Satyna','Melamina 8300','-','Drzwi, meble, listwy, ramy okienne i panele. Gładka, wytrzymała i zmywalna powierzchnia drewna.','-']];
var GLC=['116G','109F','134F','219F','311G'];
var glState={g:'pmat',c:'116G'};
function renderGl(el){
 var o=GLO.filter(function(x){return x[0]===glState.g})[0],c=CK[glState.c];
 el.innerHTML='<div class="gl-mod"><div><div class="sheen gl-main '+GL[o[0]]+'" style="--c:'+c.hex+'" data-glmain><span class="lbl">'+o[1]+' · kolor '+esc(c.k)+'</span></div><div class="gl-row">'+GLO.map(function(x){return '<button type="button" data-gl="'+x[0]+'" aria-pressed="'+(x[0]===o[0])+'"><span class="sheen '+GL[x[0]]+'" style="--c:'+c.hex+'"></span>'+x[1]+'</button>'}).join('')+'</div></div>'+
 '<div class="gl-txt"><div class="seg" role="group" aria-label="Stopień połysku">'+GLO.map(function(x){return '<button type="button" data-gl="'+x[0]+'" aria-pressed="'+(x[0]===o[0])+'">'+x[1]+'</button>'}).join('')+'</div><h3>'+o[1]+'</h3><p>'+o[4]+'</p><dl><dt>Farby PARA</dt><dd>'+o[2]+'</dd><dt>Połysk</dt><dd>'+o[3]+'</dd><dt>Cykle zmywalności</dt><dd>'+o[5]+'</dd></dl><div class="gl-cols"><span class="note">Kolor próbki:</span>'+GLC.map(function(k){return '<button type="button" data-glc="'+k+'" style="--c:'+CK[k].hex+'" aria-pressed="'+(k===glState.c)+'" aria-label="Kolor '+k+'"></button>'}).join('')+'</div><div class="hrow" style="margin-top:22px"><a class="btn" href="#/kolor/'+encodeURIComponent(c.k)+'">Ten kolor w '+o[1].toLowerCase()+'cie</a></div></div></div>';
 el.querySelector('.btn').textContent='Zamów '+c.k+' - '+o[1].toLowerCase();
}
function renderProds(el){
 el.innerHTML=P.map(function(p){return '<a class="pcard" href="#/farba/'+p.s+'"><div class="ph"><span class="gchip"><i class="sheen '+GL[p.g]+'" style="--c:#8A9A86"></i>'+p.gl+'</span><img src="'+img(p)+'" width="400" height="400" loading="lazy" alt="Puszka '+esc(p.n)+'"></div><div class="t"><h3>'+p.n.replace('PARA ','')+'</h3><span class="d">'+esc(p.use.split(';')[0])+'</span><span class="pr">od '+zl(from(p))+' <small>/ '+p.v[0][0]+'</small></span></div></a>'}).join('')+
 '<a class="pcard" href="#/kolory?tester=1"><div class="ph"><span class="gchip"><i style="background:#1B1D1F"></i>450 ml</span><img src="img/tester-640.webp" width="640" height="398" loading="lazy" alt="Próbka koloru PARA 450 ml"></div><div class="t"><h3>Tester koloru</h3><span class="d">Dowolny kolor z palety, wysyłka kurierem</span><span class="pr">'+zl(TESTER)+' <small>/ 450 ml</small></span></div></a>';
}
var RO=[['sypialnia','Sypialnia','garderoba','#ACB08F'],['salon','Salon','pokój dzienny','#D8CCC7'],['kuchnia','Kuchnia','i jadalnia','#F1E1C7'],['lazienka','Łazienka','miejsca wilgotne','#AADCE6'],['korytarz','Korytarz','hol, klatka','#89827A'],['dziecko','Pokój dziecięcy','nauka i zabawa','#FECD7A'],['biuro','Biuro','gabinet','#5A6771'],['sufit','Sufit','każde pomieszczenie','#F4F5F0'],['stolarka','Drzwi i meble','listwy, okna','#323C47']];
function renderRooms(el,sel){el.innerHTML=RO.map(function(r){return '<button type="button" data-room="'+r[0]+'"'+(sel?' aria-pressed="'+(sel===r[0])+'"':'')+'><i style="--c:'+r[3]+'"></i>'+r[1]+'<small>'+r[2]+'</small></button>'}).join('')}
var INS=[['zielona','Sypialnia','321D','Najczęściej polecane kolory do sypialni to barwy jasne, które uspokajają i rozświetlają wnętrze.'],['sypialnia','Sypialnia nocą','PLN75','Granat, głęboki fiolet, bordo, a nawet czerń pomogą wyciemnić wnętrze i ułatwią zasypianie.'],['salon','Salon','439A','Najbezpieczniejszy, ponadczasowy kolor do salonu to jeden z odcieni neutralnych, najlepiej złamanych.'],['dziecko2','Pokój dziecięcy','110B','Neutralna baza i kilka akcentów, o których może zdecydować dziecko.'],['dziecko','Pokój malucha','401G','Barwa ścian łatwa do zmiany, gdy dziecko zacznie mieć własne zdanie.'],['biuro','Biuro','412F','Prostokąt intensywnej, ciemnej barwy za biurkiem wyeksponuje najważniejsze miejsce pracy.'],['salon2','Strefa dzienna','P5245-24','Kilka odcieni w jednym pomieszczeniu miękko zarysuje strefy salonu, kuchni i jadalni.']];
function renderRow(){
 $('#row1').innerHTML=INS.map(function(x){var c=CK[x[2]];return '<div class="room"><button type="button" class="im" data-lb="img/w-'+x[0]+'-1600.webp" aria-label="'+x[1]+' - powiększ"><img src="img/w-'+x[0]+'-640.webp" srcset="img/w-'+x[0]+'-640.webp 640w, img/w-'+x[0]+'-1000.webp 1000w" sizes="(max-width:760px) 84vw, (max-width:1280px) 45vw, 30vw" width="640" height="427" loading="lazy" alt="'+x[1]+'"></button><div class="cap"><h3>'+x[1]+'</h3><a class="chip" href="#/kolor/'+encodeURIComponent(c.k)+'" style="--c:'+c.hex+'"><b></b>'+esc(c.k)+'</a></div></div>'}).join('');
}
function renderIg(){
 var im=['zielona','salon','sypialnia','dziecko2','biuro','salon2'];
 $('#ig').innerHTML=im.map(function(k,i){return '<figure><img src="img/w-'+k+'-640.webp" width="640" height="427" loading="lazy" alt=""><figcaption>'+'Przykład'+'</figcaption></figure>'}).join('');
}

/* ---------- widok: kolory ---------- */
var ks={q:'',fam:'',sys:'',l:'',n:60,tester:false};
function renderKfam(){$('#kfam').innerHTML='<button type="button" class="chip t" data-kfam="" aria-pressed="'+(!ks.fam)+'">Wszystkie rodziny</button>'+FAM.map(function(f){var s=C.filter(function(c){return c.fam===f[0]&&c.sys==='DL5'}).sort(function(a,b){return b.L-a.L});var r=s[Math.floor(s.length*.45)];return '<button type="button" class="chip" data-kfam="'+f[0]+'" aria-pressed="'+(ks.fam===f[0])+'" style="--c:'+r.hex+'"><b></b>'+f[1]+'</button>'}).join('')}
function renderK(){
 var o=searchC(ks.q,{fam:ks.fam,sys:ks.sys,l:ks.l}),r=o.r,pr=o.p;
 $('#kcount').textContent=r.length+' '+(r.length===1?'kolor':(r.length%10>=2&&r.length%10<=4&&(r.length%100<10||r.length%100>20))?'kolory':'kolorów');
 $('#kgrid').innerHTML=r.length?r.slice(0,ks.n).map(function(c){return ceg(c,FAMN[c.fam].split(' ')[0])}).join(''):'<p class="note" style="grid-column:1/-1">Brak kolorów dla tego zapytania. Spróbuj np. "ciepła biel", "zieleń" albo kod 219F.</p>';
 $('#kmore').hidden=r.length<=ks.n;
 var u=$('#kund');
 if(ks.q||ks.tester){
  var h='';
  if(ks.q)h+=(pr.tags.length?'Szukam: '+pr.tags.map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join(''):'Szukam kodu zawierającego "'+esc(ks.q)+'".');
  if(pr.room){var p=byK(pr.room[2]);h+='<br>Do pomieszczenia <b>'+pr.room[1]+'</b> polecamy <a href="#/farba/'+p.s+'">'+p.n+'</a> ('+p.glf.toLowerCase()+(p.cyc!=='-'?', '+p.cyc+' cykli zmywalności':'')+').'}
  if(ks.tester)h+=(h?'<br>':'')+'Wybierz kolor, a na jego karcie kliknij <b>Zamów tester 450 ml</b> ('+zl(TESTER)+').';
  u.innerHTML=h;u.hidden=false;
 }else u.hidden=true;
}
function viewKolory(qs){
 var u=new URLSearchParams(qs||'');ks.q=u.get('q')||'';ks.fam=u.get('r')||'';ks.tester=u.has('tester');ks.n=60;
 $('#kq').value=ks.q;renderKfam();
 $$('#ksys button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.sys===ks.sys)});
 $$('#klig button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l===ks.l)});
 renderK();document.title='Kolory PARA - wyszukiwarka kolorów | para.pl';
}

/* ---------- widok: karta koloru ---------- */
function viewKolor(code){
 var c=CK[(code||'').toUpperCase()]||CK['321D'];
 $('#kccrumb').textContent=c.k;
 var pf=paintsFor(c),rgb=[1,3,5].map(function(i){return parseInt(c.hex.substr(i,2),16)});
 $('#kc').innerHTML='<div><div class="viz" id="viz" style="--c:'+c.hex+'"><img src="img/sciana-1600.webp" srcset="img/sciana-960.webp 960w, img/sciana-1600.webp 1600w" sizes="(max-width:1000px) 100vw, 56vw" width="1600" height="1067" alt="Sypialnia z kolorem '+esc(c.k)+' na ścianie"><div class="tint"></div><div class="flat"></div><div class="vt"><span class="seg"><button type="button" data-vz="w" aria-pressed="true">Na ścianie</button><button type="button" data-vz="f" aria-pressed="false">Próbka</button></span></div><span class="vn">Podgląd orientacyjny - kolor sprawdź testerem</span></div></div>'+
 '<div><h1>'+esc(c.k)+'</h1><p class="desc">'+esc(desc(c))+'</p><dl class="meta"><dt>Wzornik</dt><dd>'+(c.sys==='DL5'?'PARA DL5':'PARA DL4')+(c.strip?', pasmo '+c.strip.replace(/^DL\d/,''):'')+'</dd><dt>Rodzina</dt><dd>'+FAMN[c.fam]+'</dd><dt>HEX / RGB</dt><dd>'+c.hex+' / '+rgb.join(', ')+'</dd><dt>Nazwa koloru</dt><dd style="color:var(--mute);font-weight:500">do uzupełnienia w CMS</dd></dl>'+
 '<div class="tbtn"><button class="btn" type="button" data-tester="'+esc(c.k)+'">Zamów tester 450 ml - '+zl(TESTER)+'</button><a class="btn o" href="#/farba/'+pf.l[0].s+'?c='+encodeURIComponent(c.k)+'">Zamów farbę</a></div>'+
 '<div class="onp"><h3>Na jakiej farbie i w jakim połysku</h3>'+pf.l.map(function(p){return '<div class="it"><span class="sheen '+GL[p.g]+'" style="--c:'+c.hex+'"></span><div><b>'+p.n.replace('PARA ','')+'</b><small>'+p.glf+(p.cyc!=='-'?' · '+p.cyc+' cykli':'')+' · '+esc(p.use.split(';')[0].split(',').slice(0,3).join(','))+'</small></div><div class="r">od '+zl(from(p))+'<button class="btn sm o" type="button" data-addp="'+p.s+'" data-c="'+esc(c.k)+'">Do koszyka</button></div></div>'}).join('')+(pf.w?'<p class="warn">'+pf.w+'</p>':'')+'</div></div>';
 $('#kband').innerHTML=stripOf(c).map(function(o){return '<a href="#/kolor/'+encodeURIComponent(o.k)+'" style="--c:'+o.hex+';--fc:'+fc(o)+'"'+(o===c?' aria-current="true"':'')+'>'+esc(o.k)+'</a>'}).join('');
 $('#ksim').innerHTML=nearest(c,8).map(function(o){return ceg(o)}).join('');
 $('#kpairs').innerHTML=pairsOf(c).map(function(x){var o=x[0];return '<div class="prr"><div class="two"><a href="#/kolor/'+encodeURIComponent(c.k)+'" style="--c:'+c.hex+';--fc:'+fc(c)+'">'+esc(c.k)+'</a><a href="#/kolor/'+encodeURIComponent(o.k)+'" style="--c:'+o.hex+';--fc:'+fc(o)+'">'+esc(o.k)+'</a></div><p><b>'+x[1]+'</b>'+x[2]+'</p></div>'}).join('');
 document.title='Kolor '+c.k+' - '+desc(c)+' | Farby PARA';
}

/* ---------- widok: farby + karta farby ---------- */
function renderCmp(){
 $('#cmp').innerHTML='<thead><tr><th>Farba</th><th>Połysk</th><th>Zmywalność</th><th>Gdzie</th><th>Kolory</th><th>Cena od</th></tr></thead><tbody>'+P.map(function(p){return '<tr><td><a href="#/farba/'+p.s+'"><b>'+p.n.replace('PARA ','')+'</b></a></td><td>'+p.glf+'</td><td>'+(p.cyc!=='-'?p.cyc+' cykli':'-')+'</td><td>'+esc(p.use.split(';')[0])+'</td><td>'+esc(p.kol)+'</td><td><b>'+zl(from(p))+'</b></td></tr>'}).join('')+'</tbody>';
}
var fps={v:0,c:'321D',q:1};
function viewFarba(slug,qs){
 var p=bySlug(slug)||P[1],u=new URLSearchParams(qs||'');
 if(u.get('c')&&CK[u.get('c').toUpperCase()])fps.c=CK[u.get('c').toUpperCase()].k;
 if(fps.v>=p.v.length)fps.v=0;
 var c=CK[fps.c.toUpperCase()],ok=!c.dark||p.dark;
 $('#fpcrumb').textContent=p.n;
 var docs=(p.tds?'<a href="'+UP+p.tds+'" rel="nofollow">Karta techniczna '+p.k+' <span>PDF</span></a><a href="'+UP+p.sds+'" rel="nofollow">Karta charakterystyki '+p.k+' <span>PDF</span></a>':'<p class="note" style="padding:12px 0">Karta techniczna do uzupełnienia (brak na obecnej stronie).</p>')+'<a href="'+UP+'2023/05/para-atest-1.pdf" rel="nofollow">Atest higieniczny NIZP-PZH <span>PDF</span></a>';
 $('#fp').innerHTML='<div class="gal"><div class="main"><div><img src="'+img(p,800)+'" width="800" height="800" alt="Puszka '+esc(p.n)+'"></div><div class="sheen '+GL[p.g]+'" style="--c:'+c.hex+'" data-glmain><span>'+esc(c.k)+' · '+p.gl.toLowerCase()+'</span></div></div></div>'+
 '<div><h1>'+esc(p.n)+'</h1><p class="sub">'+p.glf+(p.cyc!=='-'?' · '+p.cyc+' cykli zmywalności':'')+' · wydajność do '+p.wyd+' m²/l</p><p style="margin-top:14px">'+esc(p.d)+'</p>'+
 '<div class="opt"><h3>Kolor</h3><div class="colsel" style="--c:'+c.hex+'"><i></i><div><b>'+esc(c.k)+'</b><small>'+esc(desc(c))+'</small></div><a class="btn sm o" href="#/kolor/'+encodeURIComponent(c.k)+'">Karta koloru</a></div><div class="cpick"><label class="sr" for="fpq">Zmień kolor</label><input id="fpq" type="search" placeholder="Zmień kolor: wpisz kod albo opis, np. 109F, ciepła biel" autocomplete="off"><div class="res" id="fpres"></div></div>'+(ok?'':'<p class="note" style="margin-top:8px;color:var(--red)">'+esc(p.n)+' barwimy tylko na jasne kolory. Dla '+esc(c.k)+' wybierz Premium Velvet 1800 albo jaśniejszy odcień.</p>')+'</div>'+
 '<div class="opt"><h3>Opakowanie</h3><div class="vars">'+p.v.map(function(v,i){return '<button type="button" data-var="'+i+'" aria-pressed="'+(i===fps.v)+'"><b>'+v[0]+'</b><small>'+zl(v[1])+'</small></button>'}).join('')+'</div></div>'+
 '<p class="bigpr">'+zl(p.v[fps.v][1])+'<small>cena z obecnego sklepu para.pl</small></p>'+
 '<div class="buy"><div class="qty"><button type="button" data-qd="-1" aria-label="Mniej">-</button><input id="fqty" value="'+fps.q+'" inputmode="numeric" aria-label="Ilość"><button type="button" data-qd="1" aria-label="Więcej">+</button></div><button class="btn" type="button" data-addfp="'+p.s+'"'+(ok?'':' disabled')+'>Dodaj do koszyka</button><button class="btn o" type="button" data-tester="'+esc(c.k)+'">Tester '+esc(c.k)+' - '+zl(TESTER)+'</button></div>'+
 '<div class="calc"><h3>Ile farby potrzebuję?</h3><div class="f"><label>Długość pokoju (m)<input id="cA" type="number" min="1" step="0.1" value="4"></label><label>Szerokość (m)<input id="cB" type="number" min="1" step="0.1" value="3"></label><label>Wysokość (m)<input id="cH" type="number" min="2" step="0.05" value="2.6"></label><label>Warstwy<select id="cW"><option>1</option><option selected>2</option></select></label></div><output id="cOut"></output></div>'+
 '<div class="opt"><h3>Parametry z karty produktu</h3><table class="spec"><tr><th>Stopień połysku</th><td>'+p.glf+'</td></tr><tr><th>Połysk (GU)</th><td>'+p.gu+'</td></tr><tr><th>Cykle zmywalności</th><td>'+(p.cyc!=='-'?p.cyc:'-')+'</td></tr><tr><th>Wydajność</th><td>do '+p.wyd+' m²/l</td></tr><tr><th>Czas schnięcia</th><td>'+p.dry+'</td></tr><tr><th>Części stałe</th><td>'+p.sol+'</td></tr><tr><th>Kolorystyka</th><td>'+esc(p.kol)+'</td></tr><tr><th>Bazy</th><td>'+p.baz+'</td></tr><tr><th>Klasa odporności</th><td>Klasa 1</td></tr><tr><th>Rozpuszczalnik</th><td>woda</td></tr><tr><th>Zastosowanie</th><td>'+esc(p.use)+'</td></tr></table></div>'+
 '<div class="opt"><h3>Dokumenty</h3><div class="docs">'+docs+'</div></div></div>';
 calc(p);
 var ld={'@context':'https://schema.org','@type':'Product',name:p.n,sku:p.k,brand:{'@type':'Brand',name:'PARA'},image:'https://para.pl/'+img(p,800),description:p.d,offers:p.v.map(function(v){return {'@type':'Offer',name:v[0],price:v[1].toFixed(2),priceCurrency:'PLN',availability:'https://schema.org/InStock'}})};
 var s=$('#ldp');if(!s){s=document.createElement('script');s.type='application/ld+json';s.id='ldp';document.head.appendChild(s)}s.textContent=JSON.stringify(ld);
 document.title=p.n+' - '+p.glf+' | Farby PARA';
}
function calc(p){
 var A=+$('#cA').value||0,B=+$('#cB').value||0,H=+$('#cH').value||0,W=+$('#cW').value||2;
 var area=2*(A+B)*H,lit=area*W/p.wyd;
 var big=p.v.length>1?p.v[1]:null,sm=p.v[0],nb=0,ns=0;
 if(big){nb=Math.floor(lit/3.78);var rest=lit-nb*3.78;ns=Math.ceil(rest/0.946);if(ns*sm[1]>big[1]){nb++;ns=0}}else ns=Math.ceil(lit/0.946);
 var cost=nb*(big?big[1]:0)+ns*sm[1];
 $('#cOut').innerHTML='Ściany: ok. <b>'+area.toFixed(1).replace('.',',')+' m²</b> (bez odliczenia okien i drzwi), farby: ok. <b>'+lit.toFixed(1).replace('.',',')+' l</b> przy wydajności '+p.wyd+' m²/l.<br>Proponowane opakowania: <b>'+[nb?nb+' x 3,78 l':'',ns?ns+' x 0,946 l':''].filter(Boolean).join(' + ')+'</b> = '+zl(cost)+'.';
 $('#cOut').dataset.nb=nb;$('#cOut').dataset.ns=ns;
}

/* ---------- widok: polysk ---------- */
function renderGlTab(){
 $('#gltab').innerHTML='<thead><tr><th>Farba</th><th>Stopień połysku</th><th>Połysk (GU)</th><th>Cykle zmywalności</th><th>Gdzie</th></tr></thead><tbody>'+P.map(function(p){return '<tr><td><a href="#/farba/'+p.s+'"><b>'+p.n.replace('PARA ','')+'</b></a></td><td>'+p.glf+'</td><td>'+p.gu+'</td><td>'+(p.cyc!=='-'?p.cyc:'-')+'</td><td>'+esc(p.use.split(';')[0])+'</td></tr>'}).join('')+'</tbody>';
}

/* ---------- widok: dobor ---------- */
var wz={step:0,a:{}};
var WQ=[
 {k:'room',t:'Jakie pomieszczenie malujesz?',o:RO.map(function(r){return [r[0],r[1],r[2]]})},
 {k:'use',t:'Jak intensywnie jest użytkowane?',o:[['1','Spokojnie','sypialnia gościnna, garderoba'],['2','Codziennie','zdarzają się zabrudzenia'],['3','Intensywnie','dzieci, zwierzęta, częste mycie']]},
 {k:'gl',t:'Jaki efekt Ci odpowiada?',o:[['mat','Głęboki mat','elegancko, ukrywa nierówności'],['pol','Delikatny połysk','łatwiej domyć ścianę'],['x','Nie wiem','doradźcie']]}
];
function recommend(a){
 var r=a.room,u=+a.use||2,g=a.gl||'x',main,alt,why=[],note='';
 if(r==='sufit'){main='976';alt='900';why.push('Farba sufitowa w postaci niekapiącego żelu, głęboki mat (@60: 2 GU), minimalizuje nierówności podłoża i nie żółknie.')}
 else if(r==='stolarka'){main='8300';alt='';why.push('Emalia do drewna wewnątrz: stolarka, panele, meble, listwy, ramy okienne i drzwi. Satyna, gładka i zmywalna powłoka.')}
 else if(u===3||r==='korytarz'||r==='dziecko'||r==='kuchnia'||r==='lazienka'){main=g==='mat'?'8000':'4090';alt=g==='mat'?'4090':'8000';why.push(main==='4090'?'Pomieszczenia intensywnie użytkowane wymagają farb o wyższym stopniu połysku, np. eggshell. Elite Ceramic 4090: 20 000 cykli zmywalności, usuwanie trudnych zabrudzeń nawet detergentami.':'Chcesz matu przy intensywnym użytkowaniu: Ultra 8000 jest w pełni matowa, a wytrzymuje 10 000 cykli zmywalności.')}
 else if(u===2||r==='salon'||r==='biuro'){main=g==='pol'?'1800':(g==='mat'?'8000':(r==='biuro'?'8000':'1800'));alt=main==='1800'?'8000':'1800';why.push(main==='1800'?'Do salonu i pokoju dziennego PARA zaleca półmat. Premium Velvet 1800 pozwala usuwać trudniejsze zabrudzenia, 10 000 cykli zmywalności.':'Ultra 8000: pełny mat, który da się zmywać i myć detergentami (10 000 cykli). Polecana do salonów i pomieszczeń narażonych na zabrudzenia.')}
 else{main=g==='pol'?'1800':'900';alt=main==='900'?'8000':'900';why.push(main==='900'?'W sypialni i garderobie, które nie są intensywnie użytkowane, mat idealnie spełni oczekiwania. Premium Mat 900 minimalizuje nierówności, jest zmywalna (2 500 cykli).':'Delikatny połysk ułatwi mycie ścian: Premium Velvet 1800, półmat, 10 000 cykli.')}
 if(r==='kuchnia'||r==='lazienka')note='Do miejsc bardzo wilgotnych (kuchnia, łazienka, piwnica) PARA ma specjalistyczną farbę PARA 4200 ze środkami przeciwgrzybicznymi - nie ma jej w sklepie online, zapytaj w salonie PARA lub Dekorian.';
 return {p:byK(main),alt:alt?byK(alt):null,why:why,note:note};
}
function renderWz(){
 var el=$('#wz');
 if(wz.step<WQ.length){var q=WQ[wz.step];
  el.innerHTML='<p class="stp">Pytanie '+(wz.step+1)+' z '+WQ.length+'</p><h2>'+q.t+'</h2><div class="opts">'+q.o.map(function(o){return '<button type="button" data-wza="'+o[0]+'">'+o[1]+'<small>'+o[2]+'</small></button>'}).join('')+'</div><div class="nav2">'+(wz.step?'<button class="btn o" type="button" data-wzback>Wstecz</button>':'')+'</div>';
  return}
 var r=recommend(wz.a),p=r.p,rn=RO.filter(function(x){return x[0]===wz.a.room})[0];
 el.innerHTML='<p class="stp">Wynik dla: '+rn[1].toLowerCase()+'</p><div class="wres"><img src="'+img(p)+'" width="400" height="400" alt="Puszka '+esc(p.n)+'"><div><h2 style="margin-bottom:8px">'+p.n+'</h2><p class="sub" style="color:var(--mute)">'+p.glf+(p.cyc!=='-'?' · '+p.cyc+' cykli zmywalności':'')+' · od '+zl(from(p))+'</p><ul>'+r.why.map(function(w){return '<li>'+w+'</li>'}).join('')+'</ul>'+(r.note?'<p class="note" style="margin-top:12px">'+r.note+'</p>':'')+(r.alt?'<p style="margin-top:12px">Alternatywa: <a href="#/farba/'+r.alt.s+'">'+r.alt.n+'</a> ('+r.alt.glf.toLowerCase()+').</p>':'')+'<div class="hrow" style="margin-top:20px"><a class="btn" href="#/farba/'+p.s+'">Wybierz kolor i zamów</a><a class="btn o" href="#/kolory?q='+encodeURIComponent((rn[0]==='sufit'?'biel na sufit':'kolor do '+rn[1].toLowerCase()))+'">Kolory do tego pomieszczenia</a><button class="btn o" type="button" data-wzreset>Od nowa</button></div></div></div>';
}

/* ---------- widok: inspiracje ---------- */
function renderInsp(){
 var R=[['Do sypialni','zielona','sypialnia','Najczęściej polecane kolory do sypialni to barwy jasne: biel, pastele, beże, delikatne szarości. Wnętrze, które ma służyć wypoczynkowi, powinno uspokajać. Spotkać się można jednak i z podejściem przeciwnym: granat, głęboki fiolet, bordo, a nawet czerń pomogą wyciemnić wnętrze i ułatwią zasypianie.','321D','PLN75','ciepła szarość do sypialni'],
  ['Do salonu','salon','salon2','Najbezpieczniejszy, ponadczasowy kolor do salonu to jeden z odcieni neutralnych, najlepiej złamanych. W pokoju od południa lub zachodu sprawdzi się chłodna szarość, miętowa zieleń albo błękit, od wschodu i północy cieplejszy beż, brzoskwiniowy róż czy delikatna żółć.','439A','P5245-24','chłodna szarość do salonu'],
  ['Do pokoju dziecięcego','dziecko2','dziecko','Pokój dziecięcy to najbardziej wielofunkcyjne pomieszczenie domu. Warto zbudować neutralną bazę, a o barwie akcentów pozwolić zdecydować dziecku. Zróżnicowanie koloru dobrze oddziela strefę nauki i zabawy od strefy łóżka.','110B','401G','jasny błękit'],
  ['Do biura','biuro','biuro2','Kolor w biurze ma sprzyjać koncentracji albo pobudzać kreatywność. Kluczowe obiekty, np. biurko lub stół do rozmów, wyeksponuje prostokąt intensywnej, ciemnej barwy w tle: granat, butelkowa zieleń albo bordo na jasnoszarej całości.','412F','219F','głęboki granat']];
 $('#insp').innerHTML=R.map(function(x,i){return '<section style="display:grid;grid-template-columns:'+(i%2?'1fr 1.3fr':'1.3fr 1fr')+';gap:clamp(20px,4vw,56px);align-items:center;padding:clamp(28px,4vw,48px) 0;border-top:1px solid var(--line)" class="insr"><button type="button" class="im" data-lb="img/w-'+x[1]+'-1600.webp" aria-label="'+x[0]+' - powiększ" style="border:0;padding:0;background:none;cursor:zoom-in;'+(i%2?'order:2':'')+'"><img src="img/w-'+x[1]+'-1000.webp" srcset="img/w-'+x[1]+'-640.webp 640w, img/w-'+x[1]+'-1000.webp 1000w, img/w-'+x[1]+'-1600.webp 1600w" sizes="(max-width:860px) 100vw, 55vw" width="1000" height="667" loading="lazy" alt="Inspiracja '+x[0].toLowerCase()+'" style="width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:2px"></button><div><h2 style="font-size:clamp(28px,3vw,42px)">'+x[0]+'</h2><p style="margin-top:12px;color:var(--mute)">'+x[3]+'</p><p class="note" style="margin:16px 0 8px">Odcienie ze zdjęć (najbliższe z palety):</p><div class="hrow">'+[x[4],x[5]].map(function(k){var c=CK[k];return '<a class="chip" href="#/kolor/'+encodeURIComponent(k)+'" style="--c:'+c.hex+'"><b></b>'+k+'</a>'}).join('')+'<a class="btn sm o" href="#/kolory?q='+encodeURIComponent(x[6])+'">Szukaj: '+x[6]+'</a></div></div></section>'}).join('');
}

/* ---------- widok: wspolpraca ---------- */
var kit=[];
function renderDocs(){
 var h='';P.forEach(function(p){if(p.tds)h+='<a href="'+UP+p.tds+'" rel="nofollow">'+p.n.replace('PARA ','')+' - karta techniczna <span>PDF</span></a>'});
 h+='<a href="'+UP+'2023/05/para-atest-1.pdf" rel="nofollow">Atest higieniczny NIZP-PZH <span>PDF</span></a><a href="'+UP+'2022/02/Katalog-produktow.pdf" rel="nofollow">Katalog produktów (2022) <span>PDF</span></a>';
 $('#docsall').innerHTML=h;
}
function renderKit(){
 $('#kitn').textContent=kit.length;
 $('#kit').innerHTML=kit.map(function(k,i){var c=CK[k];return '<div class="ceg" style="--c:'+c.hex+'"><i></i><span>'+esc(k)+'</span><button type="button" data-kitrm="'+i+'">usuń</button></div>'}).join('')||'<p class="note">Zestaw jest pusty.</p>';
 $('#kitsum').textContent=kit.length?kit.length+' x tester 450 ml = '+zl(kit.length*TESTER):'';
 $('#kitcart').disabled=!kit.length;
}
function pickRes(inp,out,attr){var q=inp.value.trim();out.innerHTML=q?searchC(q).r.slice(0,16).map(function(c){return '<button type="button" '+attr+'="'+esc(c.k)+'" style="--c:'+c.hex+'"><i></i><span>'+esc(c.k)+'</span></button>'}).join(''):''}

/* ---------- doradca ---------- */
var AQ=['Ile farby na pokój 4 x 3 m?','Która farba do kuchni?','Czas schnięcia Ultra 8000','Czy Velvet 1800 na zewnątrz?','Czy mogę zamówić ciemny kolor?','Czym różni się mat od półmatu?'];
function advise(q){
 var t=q.toLowerCase(),p=null;
 P.forEach(function(x){if(t.indexOf(x.k)>=0||t.indexOf(x.n.toLowerCase().replace('para ','').split(' ')[1]||'@@')>=0)p=x});
 if(/velvet/.test(t))p=byK('1800');if(/ceramic/.test(t))p=byK('4090');if(/melamin/.test(t))p=byK('8300');
 var src=function(x){return '<small>Źródło: karta produktu '+x.n+'</small>'};
 var m=/(\d+(?:[.,]\d+)?)\s*(?:m\s*)?[x×na]+\s*(\d+(?:[.,]\d+)?)/.exec(t);
 if(m&&/ile|potrzeb|litr|farby/.test(t)){var A=parseFloat(m[1].replace(',','.')),B=parseFloat(m[2].replace(',','.')),hh=/(\d[.,]\d+)\s*m?\s*wys/.exec(t),H=hh?parseFloat(hh[1].replace(',','.')):2.6,pp=p||byK('1800'),ar=2*(A+B)*H,l=ar*2/pp.wyd;return 'Pokój '+A+' x '+B+' m przy wysokości '+String(H).replace('.',',')+' m to ok. '+ar.toFixed(1).replace('.',',')+' m² ścian. Przy dwóch warstwach i wydajności '+pp.wyd+' m²/l ('+pp.n+') potrzeba ok. '+l.toFixed(1).replace('.',',')+' l, czyli np. '+(l>3.78?Math.ceil(l/3.78)+' x 3,78 l':Math.ceil(l/0.946)+' x 0,946 l')+'. Sufit liczymy osobno, najlepiej farbą Ultra 976.'+src(pp)}
 if(/ile|wydajn|litr|m2|m²|metr/.test(t)){var pq=p||byK('1800');return pq.n+': wydajność do '+pq.wyd+' m² z litra. Zalecane dwie warstwy. Podaj wymiary pokoju, np. "ile farby na pokój 4 x 3 m", a policzę.'+src(pq)}
 if(/schn|wysych|kolejn.*warstw|drug.*warstw/.test(t)){var pd=p||byK('8000');return pd.n+' - '+pd.dry+src(pd)}
 if(/zewn|elewac|taras|balkon|na dworze/.test(t)){return 'Na zewnątrz nadaje się Premium Velvet 1800: akrylowa farba lateksowa do stosowania wewnątrz i na zewnątrz, odporna na warunki atmosferyczne. Pozostałe farby PARA w sklepie są do wnętrz.'+src(byK('1800'))}
 if(/ciemn|granat|czarn|intensyw|barwi|kolor.*dostęp|jaki.*kolor/.test(t)){return 'Farby 900, 976 i 8000 barwimy tylko na jasne kolory, Elite Ceramic 4090 na ok. 1500 pastelowych. Do ciemnych barw karta PARA 8000 poleca linię 1800 (bazy 1 i 4), Melaminę 8300 można barwić na kolor. Na karcie każdego koloru widać, na jakiej farbie go zamówisz.'+src(byK('8000'))}
 if(/kuchn|łazien|lazien|wilg/.test(t)){return 'Do kuchni PARA poleca farby o wyższym połysku: Elite Ceramic 4090 (skorupka jajka, 20 000 cykli zmywalności, usuwa trudne zabrudzenia także detergentami). Do miejsc bardzo wilgotnych jest specjalistyczna PARA 4200 ze środkami przeciwgrzybicznymi - dostępna w salonach, nie w sklepie online.'+src(byK('4090'))}
 if(/sufit/.test(t)){return 'Na sufit: Ultra 976 - głęboki mat, niekapiący żel, bezzapachowa, minimalizuje nierówności i nie żółknie. Zalecane dwie warstwy, ostatnią przy najmocniejszym świetle dziennym.'+src(byK('976'))}
 if(/drzw|mebl|listw|drewn|okn|stolar/.test(t)){return 'Do drewna wewnątrz: Melamina 8300 - satyna, alkidowo-akrylowa emalia do stolarki, paneli, mebli, listew i drzwi. Sucha w dotyku po 2 godz., kolejna warstwa po 8 godz.'+src(byK('8300'))}
 if(/mat|półmat|polmat|połysk|polysk|eggshell|skorup|satyn/.test(t)){return 'Mat (900, 8000) ukrywa nierówności i daje elegancki, głęboki kolor - do sypialni i pokoi bez dużych zabrudzeń. Półmat (Velvet 1800) i skorupka jajka (Ceramic 4090) odbijają więcej światła i łatwiej je domyć - do salonu, korytarza, kuchni i pokoju dziecięcego. Porównanie na tym samym kolorze znajdziesz w zakładce Stopnie połysku.'+src(byK('1800'))}
 if(/zmyw|mycie|myć|plam|szoro|brud/.test(t)){var pm=p||byK('4090');return pm.n+': '+(pm.cyc!=='-'?pm.cyc+' cykli zmywalności. ':'')+'Drobne zabrudzenia zmywaj wodą lub wodą z detergentem i ściereczką z mikrofibry. Najwyższą odporność ma Elite Ceramic 4090 (20 000 cykli).'+src(pm)}
 if(/grunt|przygot|podkład|szpach/.test(t)){return 'Powierzchnia musi być czysta i sucha, wolna od pyłu, tłuszczu i grzybów. Pęknięcia wypełnij i przeszlifuj, błyszczące powierzchnie zmatuj. Wewnętrzne tynki i płyty g-k zagruntuj środkiem gruntującym. Farb PARA nie rozcieńczamy - są gotowe do użycia.'+src(p||byK('8000'))}
 if(/tester|próbk|probk/.test(t)){return 'Tester to puszka 450 ml w dowolnym kolorze z palety za '+zl(TESTER)+', wysyłana kurierem. Przycisk "Zamów tester" jest na karcie każdego koloru.'}
 if(/cen|koszt|ile kosztuj/.test(t)){var pc=p||byK('1800');return pc.n+': '+pc.v.map(function(v){return v[0]+' - '+zl(v[1])}).join(', ')+'.'+src(pc)}
 if(p){return p.n+': '+p.glf.toLowerCase()+(p.cyc!=='-'?', '+p.cyc+' cykli zmywalności':'')+', wydajność do '+p.wyd+' m²/l. '+p.d+src(p)}
 return 'Tego nie znajdę w kartach produktów. Napisz do nas: para@mam.com.pl albo zadzwoń: (41) 346 53 05. Mogę za to podpowiedzieć farbę do pomieszczenia, połysk, zmywalność, czas schnięcia albo ilość farby.';
}

/* ---------- routing ---------- */
var VIEWS=['home','kolory','kolor','farby','farba','polysk','dobor','inspiracje','wspolpraca'];
function route(){
 var h=location.hash.replace(/^#\/?/,''),qi=h.indexOf('?'),qs=qi>=0?h.slice(qi+1):'',path=(qi>=0?h.slice(0,qi):h).split('/');
 var view=path[0]||'home';if(VIEWS.indexOf(view)<0)view='home';
 $$('[data-view]').forEach(function(v){v.classList.toggle('on',v.dataset.view===view)});
 var nk=view==='kolor'?'kolory':view==='farba'?'farby':view;
 $$('[data-nav]').forEach(function(a){if(a.dataset.nav===nk)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 var anchor=null;
 if(view==='home'){document.title='Farby do wnętrz PARA - propozycja nowej strony para.pl'}
 if(view==='kolory')viewKolory(qs);
 if(view==='kolor')viewKolor(decodeURIComponent(path[1]||''));
 if(view==='farby'){document.title='Farby PARA - sklep | para.pl'}
 if(view==='farba')viewFarba(path[1],qs);
 if(view==='polysk'){renderGl($('#glpage'));document.title='Stopnie połysku farb PARA | para.pl'}
 if(view==='dobor'){var u=new URLSearchParams(qs);if(u.get('room')){wz={step:1,a:{room:u.get('room')}}}renderWz();document.title='Dobór farby | Farby PARA'}
 if(view==='inspiracje'){document.title='Inspiracje | Farby PARA'}
 if(view==='wspolpraca'){anchor=path[1]||null;document.title='Dla architektów i wykonawców | Farby PARA'}
 closeMenu();topc();
 if(anchor){var t=document.getElementById(anchor);if(t){setTimeout(function(){window.scrollTo(0,t.getBoundingClientRect().top+scrollY-80)},0);return}}
 window.scrollTo(0,0);
}
function closeMenu(){$('#mnav').hidden=true;$('.burger').setAttribute('aria-expanded','false')}
function topc(){document.body.classList.toggle('top',(location.hash.replace(/^#\/?/,'')==='')&&scrollY<innerHeight*.6)}

/* ---------- zdarzenia ---------- */
document.addEventListener('click',function(e){
 var t=e.target.closest('button,a');if(!t)return;
 if(t.matches('.burger')){var m=$('#mnav');m.hidden=!m.hidden;t.setAttribute('aria-expanded',!m.hidden);return}
 if(t.hasAttribute('data-cart')){openCart();return}
 if(t.hasAttribute('data-cartclose')){closeCart();return}
 if(t.dataset.cq!=null){var it=cart[+t.dataset.cq];it.q+=+t.dataset.d;if(it.q<1)cart.splice(+t.dataset.cq,1);saveCart();return}
 if(t.dataset.crm!=null){cart.splice(+t.dataset.crm,1);saveCart();return}
 if(t.hasAttribute('data-checkout')){toast(cart.length?'W makiecie zamówienie nie jest wysyłane. Tu będzie dostawa i płatność.':'Koszyk jest pusty.');return}
 if(t.dataset.q){location.hash='#/kolory?q='+encodeURIComponent(t.dataset.q);return}
 if(t.dataset.pair){pairC=t.dataset.pair;renderPair();return}
 if(t.dataset.tester){addCart({s:'tester',v:'450 ml',c:t.dataset.tester,pr:TESTER});return}
 if(t.dataset.addp){var pp=bySlug(t.dataset.addp);addCart({s:pp.s,v:pp.v[0][0],c:t.dataset.c,pr:pp.v[0][1]});return}
 if(t.dataset.gl){glState.g=t.dataset.gl;$$('.glmod').forEach(function(el){if(el.offsetParent)renderGl(el)});return}
 if(t.dataset.glc){glState.c=t.dataset.glc;$$('.glmod').forEach(function(el){if(el.offsetParent)renderGl(el)});return}
 if(t.dataset.room!=null&&t.closest('#rooms1')){wz={step:1,a:{room:t.dataset.room}};location.hash='#/dobor';return}
 if(t.dataset.kfam!=null){ks.fam=t.dataset.kfam;ks.n=60;renderKfam();renderK();return}
 if(t.dataset.sys!=null){ks.sys=t.dataset.sys;$$('#ksys button').forEach(function(b){b.setAttribute('aria-pressed',b===t)});renderK();return}
 if(t.dataset.l!=null&&t.closest('#klig')){ks.l=t.dataset.l;$$('#klig button').forEach(function(b){b.setAttribute('aria-pressed',b===t)});renderK();return}
 if(t.id==='kmore'){ks.n+=120;renderK();return}
 if(t.dataset.vz){$('#viz').classList.toggle('f',t.dataset.vz==='f');$$('#viz .seg button').forEach(function(b){b.setAttribute('aria-pressed',b===t)});return}
 if(t.dataset.var!=null){fps.v=+t.dataset.var;var sl=location.hash.split('/')[2]||'';viewFarbaKeep(sl.split('?')[0]);return}
 if(t.dataset.qd){var qi=$('#fqty');qi.value=Math.max(1,(+qi.value||1)+(+t.dataset.qd));fps.q=+qi.value;return}
 if(t.dataset.addfp){var p2=bySlug(t.dataset.addfp);addCart({s:p2.s,v:p2.v[fps.v][0],c:fps.c,q:Math.max(1,+$('#fqty').value||1),pr:p2.v[fps.v][1]});return}
 if(t.dataset.fpc){fps.c=t.dataset.fpc;viewFarbaKeep((location.hash.split('/')[2]||'').split('?')[0]);return}
 if(t.dataset.wza){wz.a[WQ[wz.step].k]=t.dataset.wza;wz.step++;renderWz();window.scrollTo(0,0);return}
 if(t.hasAttribute('data-wzback')){wz.step=Math.max(0,wz.step-1);renderWz();return}
 if(t.hasAttribute('data-wzreset')){wz={step:0,a:{}};renderWz();return}
 if(t.dataset.kit){if(kit.indexOf(t.dataset.kit)<0&&kit.length<8)kit.push(t.dataset.kit);else if(kit.length>=8)toast('Zestaw może mieć maksymalnie 8 kolorów.');renderKit();return}
 if(t.dataset.kitrm!=null){kit.splice(+t.dataset.kitrm,1);renderKit();return}
 if(t.id==='kitcart'){kit.forEach(function(k){cart.push({s:'tester',v:'450 ml',c:k,q:1,pr:TESTER})});saveCart();toast(kit.length+' testerów dodano do koszyka');return}
 if(t.dataset.lb){var lb=$('.lb');$('img',lb).src=t.dataset.lb;$('p',lb).textContent=t.getAttribute('aria-label').replace(' - powiększ','');lb.hidden=false;return}
 if(t.matches('.adv')){var ap=$('#advp');ap.hidden=!ap.hidden;t.setAttribute('aria-expanded',!ap.hidden);if(!ap.hidden&&innerWidth>760)$('#advin').focus();return}
 if(t.hasAttribute('data-advclose')){$('#advp').hidden=true;$('.adv').setAttribute('aria-expanded','false');return}
 if(t.dataset.aq){ask(t.dataset.aq);return}
 if(t.closest('.arrows')){var row=document.getElementById(t.closest('.arrows').dataset.for);var c=row.firstElementChild;row.scrollBy({left:(+t.dataset.d)*(c.offsetWidth+20),behavior:'smooth'});return}
});
function viewFarbaKeep(slug){var y=scrollY;viewFarba(slug,'');window.scrollTo(0,y)}
$('.scrim').addEventListener('click',closeCart);
$('.lb').addEventListener('click',function(){this.hidden=true});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){$('.lb').hidden=true;$('#advp').hidden=true;closeCart();closeMenu()}});
function ask(q){var ms=$('#msgs');ms.insertAdjacentHTML('beforeend','<div class="msg me">'+esc(q)+'</div><div class="msg ai">'+advise(q)+'</div>');ms.scrollTop=ms.scrollHeight}
document.addEventListener('submit',function(e){
 var f=e.target;e.preventDefault();
 if(f.matches('[data-ksearch]')){var q=$('input',f).value.trim();location.hash='#/kolory'+(q?'?q='+encodeURIComponent(q):'');return}
 if(f.matches('[data-ksearch2]')){ks.q=$('#kq').value.trim();ks.n=60;ks.tester=false;renderK();return}
 if(f.matches('[data-advform]')){var inp=$('#advin'),q2=inp.value.trim();if(!q2)return;ask(q2);inp.value='';return}
 if(f.matches('[data-coop]')){if(!f.checkValidity()){f.reportValidity();return}f.insertAdjacentHTML('beforeend','<p class="ok">Dziękujemy. W makiecie zgłoszenie nie jest wysyłane - na stronie trafi do działu marketingu PARA.</p>');f.querySelector('button[type=submit]').disabled=true;return}
});
document.addEventListener('input',function(e){
 var t=e.target;
 if(t.id==='fpq')pickRes(t,$('#fpres'),'data-fpc');
 if(t.id==='kitq')pickRes(t,$('#kitres'),'data-kit');
 if(/^c[ABHW]$/.test(t.id)){var sl=(location.hash.split('/')[2]||'').split('?')[0];calc(bySlug(sl)||P[1])}
});
document.addEventListener('change',function(e){if(e.target.id==='cW'){var sl=(location.hash.split('/')[2]||'').split('?')[0];calc(bySlug(sl)||P[1])}});
/* swiatlo na probce polysku */
document.addEventListener('pointermove',function(e){var m=e.target.closest('[data-glmain]');if(!m)return;var r=m.getBoundingClientRect();m.style.setProperty('--lx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');m.style.setProperty('--ly',((e.clientY-r.top)/r.height*100).toFixed(1)+'%')},{passive:true});
/* przeciaganie pasow myszka */
document.addEventListener('pointerdown',function(e){
 var row=e.target.closest('.row');if(!row||e.pointerType!=='mouse')return;
 var x0=e.clientX,s0=row.scrollLeft,moved=false;
 function mv(ev){var dx=ev.clientX-x0;if(Math.abs(dx)>5){moved=true;row.classList.add('drag')}row.scrollLeft=s0-dx}
 function up(){document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',up);setTimeout(function(){row.classList.remove('drag')},0);if(moved){var c=row.firstElementChild,w=c.offsetWidth+parseFloat(getComputedStyle(row).columnGap||20);row.scrollTo({left:Math.round(row.scrollLeft/w)*w,behavior:'smooth'})}}
 document.addEventListener('pointermove',mv);document.addEventListener('pointerup',up);
});
document.addEventListener('click',function(e){if(e.target.closest('.row.drag'))e.preventDefault()},true);
document.addEventListener('dragstart',function(e){if(e.target.closest('.row'))e.preventDefault()});
$$('[data-year]').forEach(function(y){y.textContent=new Date().getFullYear()});

/* start */
renderQs($('#qs1'));renderFams();renderPair();renderGl($('#glhome'));renderProds($('#prods1'));renderProds($('#prods2'));renderRooms($('#rooms1'));renderRow();renderIg();renderCmp();renderGlTab();renderInsp();renderDocs();renderKit();renderCart();
$('#advq').innerHTML=AQ.map(function(q){return '<button type="button" data-aq="'+esc(q)+'">'+esc(q)+'</button>'}).join('');
addEventListener('scroll',topc,{passive:true});
addEventListener('hashchange',route);
route();
})();
