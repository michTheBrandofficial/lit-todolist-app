if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const l=e=>i(e,r),c={module:{uri:r},exports:o,require:l};s[r]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(t(...e),o)))}}define(["./workbox-23fe103c"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-16d4e43a.css",revision:null},{url:"assets/index-bc5f79a1.js",revision:null},{url:"index.html",revision:"1cc58a82fed285f7b1d0443c84288e31"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"6b8e1c8e720d000ff233bd944425bdea"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({url:e})=>e.pathname.startsWith("/api")),new e.CacheFirst({cacheName:"static",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
