import{S as te,i as se,s as le,l as E,a as N,r as L,K as ge,m as k,h as m,c as I,n as S,u as A,p as b,q as Y,F as a,b as x,L as be,M as Z,v as Q,N as Ee,E as ee,O as ce,o as ke,P as X,f as H,g as pe,d as de,t as G,Q as he,R as ze,w as me,x as ye,y as _e,B as ve}from"../../chunks/index-bb6fa99f.js";import"../../chunks/transform-ce4debc3.js";import{b as Ce}from"../../chunks/paths-b9644fda.js";function Se(t,e){return t==null||e==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}class Te extends Map{constructor(e,l=Me){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:l}}),e!=null)for(const[s,f]of e)this.set(s,f)}get(e){return super.get(re(this,e))}has(e){return super.has(re(this,e))}set(e,l){return super.set(we(this,e),l)}delete(e){return super.delete(Pe(this,e))}}function re({_intern:t,_key:e},l){const s=e(l);return t.has(s)?t.get(s):l}function we({_intern:t,_key:e},l){const s=e(l);return t.has(s)?t.get(s):(t.set(s,l),l)}function Pe({_intern:t,_key:e},l){const s=e(l);return t.has(s)&&(l=t.get(s),t.delete(s)),l}function Me(t){return t!==null&&typeof t=="object"?t.valueOf():t}function De(t){return t}function Ne(t,...e){return Le(t,Array.from,De,e)}function Le(t,e,l,s){return function f(u,g){if(g>=s.length)return l(u);const y=new Te,_=s[g++];let n=-1;for(const d of u){const o=_(d,++n,u),r=y.get(o);r?r.push(d):y.set(o,[d])}for(const[d,o]of y)y.set(d,f(o,g));return e(y)}(t,0)}const Ie=async t=>{if("clipboard"in navigator)await navigator.clipboard.writeText(t);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=t,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}},Ae=(t,e)=>{async function l(){if(e)try{await Ie(e),t.dispatchEvent(new CustomEvent("svelte-copy",{detail:e}))}catch(s){t.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:s}))}}return t.addEventListener("click",l,!0),{update:s=>e=s,destroy:()=>t.removeEventListener("click",l,!0)}};function Fe(t){let e,l,s,f,u,g,y,_,n,d,o,r,p,T,w,q,M,F,U,P,B,D,R,K;return{c(){e=E("link"),l=N(),s=E("div"),f=E("h3"),u=L(t[0]),g=N(),y=E("p"),_=L(t[1]),n=N(),d=E("details"),o=E("summary"),r=L("CSS Snippet"),p=N(),T=E("code"),w=L(t[2]),q=N(),M=E("p"),F=E("button"),U=L("Copy CSS to Clipboard"),B=E("span"),D=L(t[3]),this.h()},l(C){const z=ge('[data-svelte="svelte-1uevrx3"]',document.head);e=k(z,"LINK",{rel:!0,href:!0}),z.forEach(m),l=I(C),s=k(C,"DIV",{style:!0,class:!0});var c=S(s);f=k(c,"H3",{class:!0});var W=S(f);u=A(W,t[0]),W.forEach(m),g=I(c),y=k(c,"P",{});var i=S(y);_=A(i,t[1]),i.forEach(m),n=I(c),d=k(c,"DETAILS",{class:!0});var h=S(d);o=k(h,"SUMMARY",{class:!0});var v=S(o);r=A(v,"CSS Snippet"),v.forEach(m),p=I(h),T=k(h,"CODE",{class:!0});var j=S(T);w=A(j,t[2]),j.forEach(m),h.forEach(m),q=I(c),M=k(c,"P",{});var V=S(M);F=k(V,"BUTTON",{class:!0});var O=S(F);U=A(O,"Copy CSS to Clipboard"),O.forEach(m),B=k(V,"SPAN",{class:!0});var J=S(B);D=A(J,t[3]),J.forEach(m),V.forEach(m),c.forEach(m),this.h()},h(){b(e,"rel","external stylesheet"),b(e,"href",t[5]),b(f,"class","svelte-19ry7n"),Y(y,"font-size",t[4],!1),b(o,"class","svelte-19ry7n"),b(T,"class","svelte-19ry7n"),b(d,"class","svelte-19ry7n"),b(F,"class","svelte-19ry7n"),b(B,"class","svelte-19ry7n"),Y(s,"font-family","'"+t[0]+"'"),b(s,"class","svelte-19ry7n")},m(C,z){a(document.head,e),x(C,l,z),x(C,s,z),a(s,f),a(f,u),a(s,g),a(s,y),a(y,_),a(s,n),a(s,d),a(d,o),a(o,r),a(d,p),a(d,T),a(T,w),a(s,q),a(s,M),a(M,F),a(F,U),a(M,B),a(B,D),R||(K=[be(P=Ae.call(null,F,t[2])),Z(F,"svelte-copy",t[6])],R=!0)},p(C,[z]){z&1&&Q(u,C[0]),z&2&&Q(_,C[1]),z&16&&Y(y,"font-size",C[4],!1),z&4&&Q(w,C[2]),P&&Ee(P.update)&&z&4&&P.update.call(null,C[2]),z&8&&Q(D,C[3]),z&1&&Y(s,"font-family","'"+C[0]+"'")},i:ee,o:ee,d(C){m(e),C&&m(l),C&&m(s),R=!1,ce(K)}}}function Be(t,e,l){let s,{id:f=""}=e,{family:u=""}=e,{size:g=16}=e,{text:y}=e,_="",n="";const d=`${Ce}/assets/demo/fonts/${f}.css`,o=()=>{l(3,n="Copied!"),setTimeout(()=>{l(3,n="")},1e3)};return ke(async()=>{const r=await fetch(d);l(2,_=await r.text())}),t.$$set=r=>{"id"in r&&l(7,f=r.id),"family"in r&&l(0,u=r.family),"size"in r&&l(8,g=r.size),"text"in r&&l(1,y=r.text)},t.$$.update=()=>{t.$$.dirty&256&&l(4,s=`${g}px`)},[u,y,_,n,s,d,o,f,g]}class Oe extends te{constructor(e){super(),se(this,e,Be,Fe,le,{id:7,family:0,size:8,text:1})}}const Re=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"sans-serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];function ae(t,e,l){const s=t.slice();return s[5]=e[l][0],s[6]=e[l][1],s}function ie(t,e,l){const s=t.slice();return s[9]=e[l].family,s[10]=e[l].id,s}function fe(t){let e,l;return e=new Oe({props:{id:t[10],family:t[9],size:t[0],text:t[1]}}),{c(){me(e.$$.fragment)},l(s){ye(e.$$.fragment,s)},m(s,f){_e(e,s,f),l=!0},p(s,f){const u={};f&1&&(u.size=s[0]),f&2&&(u.text=s[1]),e.$set(u)},i(s){l||(H(e.$$.fragment,s),l=!0)},o(s){G(e.$$.fragment,s),l=!1},d(s){ve(e,s)}}}function ue(t){let e,l=t[5]+"",s,f,u,g,y,_=t[6],n=[];for(let o=0;o<_.length;o+=1)n[o]=fe(ie(t,_,o));const d=o=>G(n[o],1,1,()=>{n[o]=null});return{c(){e=E("h2"),s=L(l),f=N(),u=E("section");for(let o=0;o<n.length;o+=1)n[o].c();g=N(),this.h()},l(o){e=k(o,"H2",{});var r=S(e);s=A(r,l),r.forEach(m),f=I(o),u=k(o,"SECTION",{class:!0});var p=S(u);for(let T=0;T<n.length;T+=1)n[T].l(p);g=I(p),p.forEach(m),this.h()},h(){b(u,"class","svelte-1lzc8ku")},m(o,r){x(o,e,r),a(e,s),x(o,f,r),x(o,u,r);for(let p=0;p<n.length;p+=1)n[p].m(u,null);a(u,g),y=!0},p(o,r){if(r&7){_=o[6];let p;for(p=0;p<_.length;p+=1){const T=ie(o,_,p);n[p]?(n[p].p(T,r),H(n[p],1)):(n[p]=fe(T),n[p].c(),H(n[p],1),n[p].m(u,g))}for(pe(),p=_.length;p<n.length;p+=1)d(p);de()}},i(o){if(!y){for(let r=0;r<_.length;r+=1)H(n[r]);y=!0}},o(o){n=n.filter(Boolean);for(let r=0;r<n.length;r+=1)G(n[r]);y=!1},d(o){o&&m(e),o&&m(f),o&&m(u),he(n,o)}}}function je(t){let e,l,s,f,u,g,y,_,n,d,o,r,p,T,w,q,M,F,U,P,B,D,R,K,C,z=t[2],c=[];for(let i=0;i<z.length;i+=1)c[i]=ue(ae(t,z,i));const W=i=>G(c[i],1,1,()=>{c[i]=null});return{c(){e=E("div"),l=E("h1"),s=L("Hosted Fonts on The Pudding"),f=N(),u=E("p"),g=E("em"),y=L("Do not use fonts hosted by The Pudding without written permission."),_=N(),n=E("form"),d=E("label"),o=L("font-size: "),r=L(t[0]),p=L("px"),T=N(),w=E("input"),q=N(),M=E("label"),F=L("text sample"),U=N(),P=E("input"),B=N(),D=E("article");for(let i=0;i<c.length;i+=1)c[i].c();this.h()},l(i){e=k(i,"DIV",{id:!0,class:!0});var h=S(e);l=k(h,"H1",{});var v=S(l);s=A(v,"Hosted Fonts on The Pudding"),v.forEach(m),f=I(h),u=k(h,"P",{});var j=S(u);g=k(j,"EM",{});var V=S(g);y=A(V,"Do not use fonts hosted by The Pudding without written permission."),V.forEach(m),j.forEach(m),_=I(h),n=k(h,"FORM",{});var O=S(n);d=k(O,"LABEL",{for:!0,class:!0});var J=S(d);o=A(J,"font-size: "),r=A(J,t[0]),p=A(J,"px"),J.forEach(m),T=I(O),w=k(O,"INPUT",{id:!0,type:!0,min:!0,max:!0}),q=I(O),M=k(O,"LABEL",{for:!0,class:!0});var ne=S(M);F=A(ne,"text sample"),ne.forEach(m),U=I(O),P=k(O,"INPUT",{id:!0,type:!0,maxlength:!0}),O.forEach(m),h.forEach(m),B=I(i),D=k(i,"ARTICLE",{class:!0});var oe=S(D);for(let $=0;$<c.length;$+=1)c[$].l(oe);oe.forEach(m),this.h()},h(){b(d,"for","size"),b(d,"class","svelte-1lzc8ku"),b(w,"id","size"),b(w,"type","range"),b(w,"min","12"),b(w,"max","48"),b(M,"for","text"),b(M,"class","svelte-1lzc8ku"),b(P,"id","text"),b(P,"type","text"),b(P,"maxlength","100"),b(e,"id","info"),b(e,"class","svelte-1lzc8ku"),b(D,"class","svelte-1lzc8ku")},m(i,h){x(i,e,h),a(e,l),a(l,s),a(e,f),a(e,u),a(u,g),a(g,y),a(e,_),a(e,n),a(n,d),a(d,o),a(d,r),a(d,p),a(n,T),a(n,w),X(w,t[0]),a(n,q),a(n,M),a(M,F),a(n,U),a(n,P),X(P,t[1]),x(i,B,h),x(i,D,h);for(let v=0;v<c.length;v+=1)c[v].m(D,null);R=!0,K||(C=[Z(w,"change",t[3]),Z(w,"input",t[3]),Z(P,"input",t[4])],K=!0)},p(i,[h]){if((!R||h&1)&&Q(r,i[0]),h&1&&X(w,i[0]),h&2&&P.value!==i[1]&&X(P,i[1]),h&7){z=i[2];let v;for(v=0;v<z.length;v+=1){const j=ae(i,z,v);c[v]?(c[v].p(j,h),H(c[v],1)):(c[v]=ue(j),c[v].c(),H(c[v],1),c[v].m(D,null))}for(pe(),v=z.length;v<c.length;v+=1)W(v);de()}},i(i){if(!R){for(let h=0;h<z.length;h+=1)H(c[h]);R=!0}},o(i){c=c.filter(Boolean);for(let h=0;h<c.length;h+=1)G(c[h]);R=!1},d(i){i&&m(e),i&&m(B),i&&m(D),he(c,i),K=!1,ce(C)}}}function xe(t,e,l){let s=18,f="The quick brown fox jumps over the lazy dog.";const u=Ne(Re,_=>_.type);u.sort((_,n)=>Se(_[1].length,n[1].length));function g(){s=ze(this.value),l(0,s)}function y(){f=this.value,l(1,f)}return[s,f,u,g,y]}class He extends te{constructor(e){super(),se(this,e,xe,je,le,{})}}function qe(t){let e,l;return e=new He({}),{c(){me(e.$$.fragment)},l(s){ye(e.$$.fragment,s)},m(s,f){_e(e,s,f),l=!0},p:ee,i(s){l||(H(e.$$.fragment,s),l=!0)},o(s){G(e.$$.fragment,s),l=!1},d(s){ve(e,s)}}}class Ve extends te{constructor(e){super(),se(this,e,null,qe,le,{})}}export{Ve as default};
