import{S as g,i as y,s as E,l as _,m as f,n as m,h as c,p as u,I as p,b as d,J as h,E as $,K as w,L as H,w as A,a as I,x as M,c as k,y as D,M as L,N,O as S,f as v,t as b,B as T}from"../chunks/index-04d788da.js";import{w as Y,s as q}from"../chunks/scrollY-4bef3e7f.js";import"../chunks/index-07813ced.js";function B(o){let t,n,s;return{c(){t=_("header"),n=_("div"),s=_("a"),this.h()},l(a){t=f(a,"HEADER",{class:!0});var l=m(t);n=f(l,"DIV",{class:!0});var r=m(n);s=f(r,"A",{href:!0,"aria-label":!0,class:!0});var e=m(s);e.forEach(c),r.forEach(c),l.forEach(c),this.h()},h(){u(s,"href","https://pudding.cool"),u(s,"aria-label","The Pudding"),u(s,"class","svelte-nm27vh"),u(n,"class","wordmark svelte-nm27vh"),p(n,"visible",o[0]),u(t,"class","svelte-nm27vh")},m(a,l){d(a,t,l),h(t,n),h(n,s),s.innerHTML=Y},p(a,[l]){l&1&&p(n,"visible",a[0])},i:$,o:$,d(a){a&&c(t)}}}function C(o,t,n){let s,a;return w(o,q,l=>n(1,a=l)),o.$$.update=()=>{o.$$.dirty&2&&n(0,s=a<30)},[s,a]}class J extends g{constructor(t){super(),y(this,t,C,B,E,{})}}function K(o){let t,n,s,a;t=new J({});const l=o[1].default,r=H(l,o,o[0],null);return{c(){A(t.$$.fragment),n=I(),s=_("main"),r&&r.c(),this.h()},l(e){M(t.$$.fragment,e),n=k(e),s=f(e,"MAIN",{id:!0});var i=m(s);r&&r.l(i),i.forEach(c),this.h()},h(){u(s,"id","content")},m(e,i){D(t,e,i),d(e,n,i),d(e,s,i),r&&r.m(s,null),a=!0},p(e,[i]){r&&r.p&&(!a||i&1)&&L(r,l,e,e[0],a?S(l,e[0],i,null):N(e[0]),null)},i(e){a||(v(t.$$.fragment,e),v(r,e),a=!0)},o(e){b(t.$$.fragment,e),b(r,e),a=!1},d(e){T(t,e),e&&c(n),e&&c(s),r&&r.d(e)}}}function O(o,t,n){let{$$slots:s={},$$scope:a}=t;return o.$$set=l=>{"$$scope"in l&&n(0,a=l.$$scope)},[a,s]}class j extends g{constructor(t){super(),y(this,t,O,K,E,{})}}export{j as default};