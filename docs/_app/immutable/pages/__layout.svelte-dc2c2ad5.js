import{S as y,i as E,s as w,l as _,m,n as f,h as c,p as u,I as p,b as d,J as h,E as v,K as $,L as H,w as A,a as I,x as M,c as k,y as D,M as L,N,O as S,f as b,t as g,B as T}from"../chunks/index-2eabaa8d.js";import{w as Y,s as q,e as B}from"../chunks/scrollY-4a23acaa.js";import"../chunks/index-f8d5096c.js";function C(o){let t,r,s;return{c(){t=_("header"),r=_("div"),s=_("a"),this.h()},l(a){t=m(a,"HEADER",{class:!0});var l=f(t);r=m(l,"DIV",{class:!0});var n=f(r);s=m(n,"A",{href:!0,"aria-label":!0,class:!0});var e=f(s);e.forEach(c),n.forEach(c),l.forEach(c),this.h()},h(){u(s,"href","https://pudding.cool"),u(s,"aria-label","The Pudding"),u(s,"class","svelte-nm27vh"),u(r,"class","wordmark svelte-nm27vh"),p(r,"visible",o[0]),u(t,"class","svelte-nm27vh")},m(a,l){d(a,t,l),h(t,r),h(r,s),s.innerHTML=Y},p(a,[l]){l&1&&p(r,"visible",a[0])},i:v,o:v,d(a){a&&c(t)}}}function J(o,t,r){let s,a,l;return $(o,q,n=>r(1,a=n)),$(o,B,n=>r(2,l=n)),o.$$.update=()=>{o.$$.dirty&6&&r(0,s=!l||a<30)},[s,a,l]}class K extends y{constructor(t){super(),E(this,t,J,C,w,{})}}function O(o){let t,r,s,a;t=new K({});const l=o[1].default,n=H(l,o,o[0],null);return{c(){A(t.$$.fragment),r=I(),s=_("main"),n&&n.c(),this.h()},l(e){M(t.$$.fragment,e),r=k(e),s=m(e,"MAIN",{id:!0});var i=f(s);n&&n.l(i),i.forEach(c),this.h()},h(){u(s,"id","content")},m(e,i){D(t,e,i),d(e,r,i),d(e,s,i),n&&n.m(s,null),a=!0},p(e,[i]){n&&n.p&&(!a||i&1)&&L(n,l,e,e[0],a?S(l,e[0],i,null):N(e[0]),null)},i(e){a||(b(t.$$.fragment,e),b(n,e),a=!0)},o(e){g(t.$$.fragment,e),g(n,e),a=!1},d(e){T(t,e),e&&c(r),e&&c(s),n&&n.d(e)}}}function P(o,t,r){let{$$slots:s={},$$scope:a}=t;return o.$$set=l=>{"$$scope"in l&&r(0,a=l.$$scope)},[a,s]}class z extends y{constructor(t){super(),E(this,t,P,O,w,{})}}export{z as default};