function x(){}const st=t=>t;function ot(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function W(){return Object.create(null)}function $(t){t.forEach(K)}function B(t){return typeof t=="function"}function Lt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let N;function Tt(t,e){return N||(N=document.createElement("a")),N.href=e,t===N.href}function ct(t){return Object.keys(t).length===0}function lt(t,...e){if(t==null)return x;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function zt(t,e,n){t.$$.on_destroy.push(lt(e,n))}function Bt(t,e,n,r){if(t){const s=Q(t,e,n,r);return t[0](s)}}function Q(t,e,n,r){return t[1]&&r?ot(n.ctx.slice(),t[1](r(e))):n.ctx}function Ft(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],i=Math.max(e.dirty.length,s.length);for(let c=0;c<i;c+=1)l[c]=e.dirty[c]|s[c];return l}return e.dirty|s}return e.dirty}function Ht(t,e,n,r,s,l){if(s){const i=Q(e,n,r,l);t.p(i,s)}}function It(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function Wt(t,e,n){return t.set(n),e}function Gt(t){return t&&B(t.destroy)?t.destroy:x}const U=typeof window<"u";let ut=U?()=>window.performance.now():()=>Date.now(),F=U?t=>requestAnimationFrame(t):x;const b=new Set;function V(t){b.forEach(e=>{e.c(t)||(b.delete(e),e.f())}),b.size!==0&&F(V)}function at(t){let e;return b.size===0&&F(V),{promise:new Promise(n=>{b.add(e={c:t,f:n})}),abort(){b.delete(e)}}}let R=!1;function ft(){R=!0}function _t(){R=!1}function dt(t,e,n,r){for(;t<e;){const s=t+(e-t>>1);n(s)<=r?t=s+1:e=s}return t}function ht(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&o.push(_)}e=o}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,_=(s>0&&e[n[s]].claim_order<=u?s+1:dt(1,s,a=>e[n[a]].claim_order,u))-1;r[o]=n[_]+1;const f=_+1;n[f]=o,s=Math.max(f,s)}const l=[],i=[];let c=e.length-1;for(let o=n[s]+1;o!=0;o=r[o-1]){for(l.push(e[o-1]);c>=o;c--)i.push(e[c]);c--}for(;c>=0;c--)i.push(e[c]);l.reverse(),i.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<i.length;o++){for(;u<l.length&&i[o].claim_order>=l[u].claim_order;)u++;const _=u<l.length?l[u]:null;t.insertBefore(i[o],_)}}function mt(t,e){t.appendChild(e)}function X(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function pt(t){const e=Y("style");return yt(X(t),e),e.sheet}function yt(t,e){mt(t.head||t,e)}function gt(t,e){if(R){for(ht(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Jt(t,e,n){R&&!n?gt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function bt(t){t.parentNode.removeChild(t)}function Kt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Y(t){return document.createElement(t)}function xt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function H(t){return document.createTextNode(t)}function Qt(){return H(" ")}function Ut(){return H("")}function Vt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function Xt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function $t(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Yt(t,e){for(const n in e)$t(t,n,e[n])}function Zt(t){return t===""?null:+t}function wt(t){return Array.from(t.childNodes)}function vt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Z(t,e,n,r,s=!1){vt(t);const l=(()=>{for(let i=t.claim_info.last_index;i<t.length;i++){const c=t[i];if(e(c)){const o=n(c);return o===void 0?t.splice(i,1):t[i]=o,s||(t.claim_info.last_index=i),c}}for(let i=t.claim_info.last_index-1;i>=0;i--){const c=t[i];if(e(c)){const o=n(c);return o===void 0?t.splice(i,1):t[i]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=i,c}}return r()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function tt(t,e,n,r){return Z(t,s=>s.nodeName===e,s=>{const l=[];for(let i=0;i<s.attributes.length;i++){const c=s.attributes[i];n[c.name]||l.push(c.name)}l.forEach(i=>s.removeAttribute(i))},()=>r(e))}function te(t,e,n){return tt(t,e,n,Y)}function ee(t,e,n){return tt(t,e,n,xt)}function Et(t,e){return Z(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>H(e),!0)}function ne(t){return Et(t," ")}function ie(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function re(t,e){t.value=e==null?"":e}function se(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function oe(t,e,n){t.classList[n?"add":"remove"](e)}function kt(t,e,{bubbles:n=!1,cancelable:r=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,r,e),s}function ce(t,e=document.body){return Array.from(e.querySelectorAll(t))}const M=new Map;let q=0;function At(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Nt(t,e){const n={stylesheet:pt(e),rules:{}};return M.set(t,n),n}function G(t,e,n,r,s,l,i,c=0){const o=16.666/r;let u=`{
`;for(let p=0;p<=1;p+=o){const g=e+(n-e)*l(p);u+=p*100+`%{${i(g,1-g)}}
`}const _=u+`100% {${i(n,1-n)}}
}`,f=`__svelte_${At(_)}_${c}`,a=X(t),{stylesheet:d,rules:h}=M.get(a)||Nt(a,t);h[f]||(h[f]=!0,d.insertRule(`@keyframes ${f} ${_}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${f} ${r}ms linear ${s}ms 1 both`,q+=1,f}function St(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),s=n.length-r.length;s&&(t.style.animation=r.join(", "),q-=s,q||jt())}function jt(){F(()=>{q||(M.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),M.clear())})}let k;function E(t){k=t}function I(){if(!k)throw new Error("Function called outside component initialization");return k}function le(t){I().$$.on_mount.push(t)}function ue(t){I().$$.after_update.push(t)}function ae(t,e){return I().$$.context.set(t,e),e}const v=[],J=[],j=[],T=[],et=Promise.resolve();let z=!1;function nt(){z||(z=!0,et.then(it))}function fe(){return nt(),et}function P(t){j.push(t)}function _e(t){T.push(t)}const D=new Set;let S=0;function it(){const t=k;do{for(;S<v.length;){const e=v[S];S++,E(e),Ct(e.$$)}for(E(null),v.length=0,S=0;J.length;)J.pop()();for(let e=0;e<j.length;e+=1){const n=j[e];D.has(n)||(D.add(n),n())}j.length=0}while(v.length);for(;T.length;)T.pop()();z=!1,D.clear(),E(t)}function Ct(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}let w;function Mt(){return w||(w=Promise.resolve(),w.then(()=>{w=null})),w}function L(t,e,n){t.dispatchEvent(kt(`${e?"intro":"outro"}${n}`))}const C=new Set;let m;function de(){m={r:0,c:[],p:m}}function he(){m.r||$(m.c),m=m.p}function qt(t,e){t&&t.i&&(C.delete(t),t.i(e))}function me(t,e,n,r){if(t&&t.o){if(C.has(t))return;C.add(t),m.c.push(()=>{C.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}const Pt={duration:0};function pe(t,e,n,r){let s=e(t,n),l=r?0:1,i=null,c=null,o=null;function u(){o&&St(t,o)}function _(a,d){const h=a.b-l;return d*=Math.abs(h),{a:l,b:a.b,d:h,duration:d,start:a.start,end:a.start+d,group:a.group}}function f(a){const{delay:d=0,duration:h=300,easing:y=st,tick:p=x,css:g}=s||Pt,O={start:ut()+d,b:a};a||(O.group=m,m.r+=1),i||c?c=O:(g&&(u(),o=G(t,l,a,h,d,y,g)),a&&p(0,1),i=_(O,h),P(()=>L(t,a,"start")),at(A=>{if(c&&A>c.start&&(i=_(c,h),c=null,L(t,i.b,"start"),g&&(u(),o=G(t,l,i.b,i.duration,0,y,s.css))),i){if(A>=i.end)p(l=i.b,1-l),L(t,i.b,"end"),c||(i.b?u():--i.group.r||$(i.group.c)),i=null;else if(A>=i.start){const rt=A-i.start;l=i.a+i.d*y(rt/i.duration),p(l,1-l)}}return!!(i||c)}))}return{run(a){B(s)?Mt().then(()=>{s=s(),f(a)}):f(a)},end(){u(),i=c=null}}}function ye(t,e){const n={},r={},s={$$scope:1};let l=t.length;for(;l--;){const i=t[l],c=e[l];if(c){for(const o in i)o in c||(r[o]=1);for(const o in c)s[o]||(n[o]=c[o],s[o]=1);t[l]=c}else for(const o in i)s[o]=1}for(const i in r)i in n||(n[i]=void 0);return n}function ge(t){return typeof t=="object"&&t!==null?t:{}}function be(t,e,n){const r=t.$$.props[e];r!==void 0&&(t.$$.bound[r]=n,n(t.$$.ctx[r]))}function xe(t){t&&t.c()}function $e(t,e){t&&t.l(e)}function Rt(t,e,n,r){const{fragment:s,on_mount:l,on_destroy:i,after_update:c}=t.$$;s&&s.m(e,n),r||P(()=>{const o=l.map(K).filter(B);i?i.push(...o):$(o),t.$$.on_mount=[]}),c.forEach(P)}function Ot(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Dt(t,e){t.$$.dirty[0]===-1&&(v.push(t),nt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function we(t,e,n,r,s,l,i,c=[-1]){const o=k;E(t);const u=t.$$={fragment:null,ctx:null,props:l,update:x,not_equal:s,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:W(),dirty:c,skip_bound:!1,root:e.target||o.$$.root};i&&i(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...d)=>{const h=d.length?d[0]:a;return u.ctx&&s(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),_&&Dt(t,f)),a}):[],u.update(),_=!0,$(u.before_update),u.fragment=r?r(u.ctx):!1,e.target){if(e.hydrate){ft();const f=wt(e.target);u.fragment&&u.fragment.l(f),f.forEach(bt)}else u.fragment&&u.fragment.c();e.intro&&qt(t.$$.fragment),Rt(t,e.target,e.anchor,e.customElement),_t(),it()}E(o)}class ve{$destroy(){Ot(this,1),this.$destroy=x}$on(e,n){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}$set(e){this.$$set&&!ct(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Yt as $,ge as A,Ot as B,ot as C,fe as D,x as E,lt as F,$ as G,B as H,oe as I,gt as J,zt as K,Bt as L,Ht as M,It as N,Ft as O,ut as P,at as Q,st as R,ve as S,ce as T,Gt as U,Vt as V,re as W,Kt as X,Zt as Y,xt as Z,ee as _,Qt as a,P as a0,pe as a1,J as a2,be as a3,_e as a4,Wt as a5,Tt as a6,Xt as a7,Jt as b,ne as c,he as d,Ut as e,qt as f,de as g,bt as h,we as i,ae as j,ue as k,Y as l,te as m,wt as n,le as o,$t as p,se as q,H as r,Lt as s,me as t,Et as u,ie as v,xe as w,$e as x,Rt as y,ye as z};
