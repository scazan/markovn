!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("MarkovN",[],e):"object"==typeof exports?exports.MarkovN=e():t.MarkovN=e()}("undefined"!=typeof self?self:this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e),n.d(e,"MarkovN",(function(){return l})),n.d(e,"utils",(function(){return o}));const r={mtof:t=>440*Math.pow(2,t/12),ftom:t=>Math.sqrt(t/440)/12,choose:t=>t[Math.floor(Math.random()*t.length)],getRateFromFrequencies:(t,e)=>t/e,getClosestMember:(t,e)=>e.reduce((e,n)=>{const r=e-t,o=n-t;return Math.abs(o)<Math.abs(r)?n:e},e[0]),findInCollection:(t,e)=>t.reduce((t,n)=>e(n)?n:t),mapToDomain:(t,e)=>{const n=Math.min(...e)-Math.min(...t),o=Math.max(...e)-Math.min(...e),i=Math.max(...t)-Math.min(...t);return t.map(a=>r.getClosestMember((a-Math.min(...t))/i*o+n,e))},flipCoin:(t=.5)=>!(Math.random()<t),makeFunction:t=>"function"==typeof t?t:()=>t};var o=r;const i=t=>{let e=t.reduce((t,e)=>t+e);return e>0?t.map(t=>t/e):t.map(()=>0)},a=(t,e)=>{var n=Object.getOwnPropertyNames(t),r=Object.getOwnPropertyNames(e);if(n.length!=r.length)return!1;for(var o=0;o<n.length;o++){var i=n[o];if(t[i]!==e[i])return!1}return!0},s=(t,e)=>(t%e+e)%e,u=(t,e)=>{const n=[...t];return n.shift(),n.push(e),n};var l=class{constructor(t,e){this.dictionary=[],this.combinations=[],this.lastState=[];for(let n=0;n<e;n++)this.lastState.push(t[n]);this.transitionMatrix=this.createTransitionMatrix(t,e)}createTransitionMatrix(t,e){this.dictionary=Array.from(new Set(t)),this.combinations=((t,e)=>t.reduce((n,r,o)=>{const i=[];for(let n=e;n>=0;n--)i.push(t[s(o-n,t.length)]);return n.push(i),n},[]))(t,e);let n=[];for(let t=0;t<this.combinations.length;t++){let t=[];for(let e=0;e<this.dictionary.length;e++)t.push(0);n.push(t)}for(let r=0;r<t.length;r++){let o=[];for(let n=e;n>=0;n--)o.push(t[s(r-n,t.length)]);let i=this.combinations.findIndex(t=>a(o,t)),u=t[(r+1)%t.length],l=this.dictionary.indexOf(u);n[i][l]++}return n=n.map(i),n}getNextState(t){const e=(t=>{let e=t.reduce((t,e)=>t+e),n=Math.random()*e,r=0;for(let e=0;e<t.length;e++)if(r+=t[e],r=+r.toFixed(2),n<=r)return e})(this.transitionMatrix[this.combinations.findIndex(e=>a(t,e))]);return this.dictionary[e]}*asPattern(t){for(this.lastState=t;;){let t=this.getNextState(this.lastState);this.lastState=u(this.lastState,t),yield t}}}}])}));