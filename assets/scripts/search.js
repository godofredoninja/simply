(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],3:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],4:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],5:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],7:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],8:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles.js");

var iterableToArrayLimit = require("./iterableToArrayLimit.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableRest = require("./nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithHoles.js":2,"./iterableToArrayLimit.js":6,"./nonIterableRest.js":7,"./unsupportedIterableToArray.js":9}],9:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":1}],10:[function(require,module,exports){
/*
 FlexSearch v0.6.30
 Copyright 2019 Nextapps GmbH
 Author: Thomas Wilkerling
 Released under the Apache 2.0 Licence
 https://github.com/nextapps-de/flexsearch
*/
'use strict';(function(K,R,w){let L;(L=w.define)&&L.amd?L([],function(){return R}):(L=w.modules)?L[K.toLowerCase()]=R:"object"===typeof exports?module.exports=R:w[K]=R})("FlexSearch",function ma(K){function w(a,c){const b=c?c.id:a&&a.id;this.id=b||0===b?b:na++;this.init(a,c);fa(this,"index",function(){return this.a?Object.keys(this.a.index[this.a.keys[0]].c):Object.keys(this.c)});fa(this,"length",function(){return this.index.length})}function L(a,c,b,d){this.u!==this.g&&(this.o=this.o.concat(b),this.u++,
d&&this.o.length>=d&&(this.u=this.g),this.u===this.g&&(this.cache&&this.j.set(c,this.o),this.F&&this.F(this.o)));return this}function S(a){const c=B();for(const b in a)if(a.hasOwnProperty(b)){const d=a[b];F(d)?c[b]=d.slice(0):G(d)?c[b]=S(d):c[b]=d}return c}function W(a,c){const b=a.length,d=O(c),e=[];for(let f=0,h=0;f<b;f++){const g=a[f];if(d&&c(g)||!d&&!c[g])e[h++]=g}return e}function P(a,c,b,d,e,f,h,g,k,l){b=ha(b,h?0:e,g,f,c,k,l);let p;g&&(g=b.page,p=b.next,b=b.result);if(h)c=this.where(h,null,
e,b);else{c=b;b=this.l;e=c.length;f=Array(e);for(h=0;h<e;h++)f[h]=b[c[h]];c=f}b=c;d&&(O(d)||(M=d.split(":"),1<M.length?d=oa:(M=M[0],d=pa)),b.sort(d));b=T(g,p,b);this.cache&&this.j.set(a,b);return b}function fa(a,c,b){Object.defineProperty(a,c,{get:b})}function r(a){return new RegExp(a,"g")}function Q(a,c){for(let b=0;b<c.length;b+=2)a=a.replace(c[b],c[b+1]);return a}function V(a,c,b,d,e,f,h,g){if(c[b])return c[b];e=e?(g-(h||g/1.5))*f+(h||g/1.5)*e:f;c[b]=e;e>=h&&(a=a[g-(e+.5>>0)],a=a[b]||(a[b]=[]),
a[a.length]=d);return e}function ba(a,c){if(a){const b=Object.keys(a);for(let d=0,e=b.length;d<e;d++){const f=b[d],h=a[f];if(h)for(let g=0,k=h.length;g<k;g++)if(h[g]===c){1===k?delete a[f]:h.splice(g,1);break}else G(h[g])&&ba(h[g],c)}}}function ca(a){let c="",b="";var d="";for(let e=0;e<a.length;e++){const f=a[e];if(f!==b)if(e&&"h"===f){if(d="a"===d||"e"===d||"i"===d||"o"===d||"u"===d||"y"===d,("a"===b||"e"===b||"i"===b||"o"===b||"u"===b||"y"===b)&&d||" "===b)c+=f}else c+=f;d=e===a.length-1?"":a[e+
1];b=f}return c}function qa(a,c){a=a.length-c.length;return 0>a?1:a?-1:0}function pa(a,c){a=a[M];c=c[M];return a<c?-1:a>c?1:0}function oa(a,c){const b=M.length;for(let d=0;d<b;d++)a=a[M[d]],c=c[M[d]];return a<c?-1:a>c?1:0}function T(a,c,b){return a?{page:a,next:c?""+c:null,result:b}:b}function ha(a,c,b,d,e,f,h){let g,k=[];if(!0===b){b="0";var l=""}else l=b&&b.split(":");const p=a.length;if(1<p){const y=B(),t=[];let v,x;var n=0,m;let I;var u=!0;let D,E=0,N,da,X,ea;l&&(2===l.length?(X=l,l=!1):l=ea=
parseInt(l[0],10));if(h){for(v=B();n<p;n++)if("not"===e[n])for(x=a[n],I=x.length,m=0;m<I;m++)v["@"+x[m]]=1;else da=n+1;if(C(da))return T(b,g,k);n=0}else N=J(e)&&e;let Y;for(;n<p;n++){const ra=n===(da||p)-1;if(!N||!n)if((m=N||e&&e[n])&&"and"!==m)if("or"===m)Y=!1;else continue;else Y=f=!0;x=a[n];if(I=x.length){if(u)if(D){var q=D.length;for(m=0;m<q;m++){u=D[m];var A="@"+u;h&&v[A]||(y[A]=1,f||(k[E++]=u))}D=null;u=!1}else{D=x;continue}A=!1;for(m=0;m<I;m++){q=x[m];var z="@"+q;const Z=f?y[z]||0:n;if(!(!Z&&
!d||h&&v[z]||!f&&y[z]))if(Z===n){if(ra){if(!ea||--ea<E)if(k[E++]=q,c&&E===c)return T(b,E+(l||0),k)}else y[z]=n+1;A=!0}else d&&(z=t[Z]||(t[Z]=[]),z[z.length]=q)}if(Y&&!A&&!d)break}else if(Y&&!d)return T(b,g,x)}if(D)if(n=D.length,h)for(m=l?parseInt(l,10):0;m<n;m++)a=D[m],v["@"+a]||(k[E++]=a);else k=D;if(d)for(E=k.length,X?(n=parseInt(X[0],10)+1,m=parseInt(X[1],10)+1):(n=t.length,m=0);n--;)if(q=t[n]){for(I=q.length;m<I;m++)if(d=q[m],!h||!v["@"+d])if(k[E++]=d,c&&E===c)return T(b,n+":"+m,k);m=0}}else!p||
e&&"not"===e[0]||(k=a[0],l&&(l=parseInt(l[0],10)));c&&(h=k.length,l&&l>h&&(l=0),l=l||0,g=l+c,g<h?k=k.slice(l,g):(g=0,l&&(k=k.slice(l))));return T(b,g,k)}function J(a){return"string"===typeof a}function F(a){return a.constructor===Array}function O(a){return"function"===typeof a}function G(a){return"object"===typeof a}function C(a){return"undefined"===typeof a}function ia(a){const c=Array(a);for(let b=0;b<a;b++)c[b]=B();return c}function B(){return Object.create(null)}function sa(){let a,c;self.onmessage=
function(b){if(b=b.data)if(b.search){const d=c.search(b.content,b.threshold?{limit:b.limit,threshold:b.threshold,where:b.where}:b.limit);self.postMessage({id:a,content:b.content,limit:b.limit,result:d})}else b.add?c.add(b.id,b.content):b.update?c.update(b.id,b.content):b.remove?c.remove(b.id):b.clear?c.clear():b.info?(b=c.info(),b.worker=a,console.log(b)):b.register&&(a=b.id,b.options.cache=!1,b.options.async=!1,b.options.worker=!1,c=(new Function(b.register.substring(b.register.indexOf("{")+1,b.register.lastIndexOf("}"))))(),
c=new c(b.options))}}function ta(a,c,b,d){a=K("flexsearch","id"+a,sa,function(f){(f=f.data)&&f.result&&d(f.id,f.content,f.result,f.limit,f.where,f.cursor,f.suggest)},c);const e=ma.toString();b.id=c;a.postMessage({register:e,options:b,id:c});return a}const H={encode:"icase",f:"forward",split:/\W+/,cache:!1,async:!1,g:!1,D:!1,a:!1,b:9,threshold:0,depth:0},ja={memory:{encode:"extra",f:"strict",threshold:0,b:1},speed:{encode:"icase",f:"strict",threshold:1,b:3,depth:2},match:{encode:"extra",f:"full",threshold:1,
b:3},score:{encode:"extra",f:"strict",threshold:1,b:9,depth:4},balance:{encode:"balance",f:"strict",threshold:0,b:3,depth:3},fast:{encode:"icase",f:"strict",threshold:8,b:9,depth:1}},aa=[];let na=0;const ka={},la={};w.create=function(a,c){return new w(a,c)};w.registerMatcher=function(a){for(const c in a)a.hasOwnProperty(c)&&aa.push(r(c),a[c]);return this};w.registerEncoder=function(a,c){U[a]=c.bind(U);return this};w.registerLanguage=function(a,c){ka[a]=c.filter;la[a]=c.stemmer;return this};w.encode=
function(a,c){return U[a](c)};w.prototype.init=function(a,c){this.v=[];if(c){var b=c.preset;a=c}else a||(a=H),b=a.preset;c={};J(a)?(c=ja[a],a={}):b&&(c=ja[b]);if(b=a.worker)if("undefined"===typeof Worker)a.worker=!1,this.m=null;else{var d=parseInt(b,10)||4;this.C=-1;this.u=0;this.o=[];this.F=null;this.m=Array(d);for(var e=0;e<d;e++)this.m[e]=ta(this.id,e,a,L.bind(this))}this.f=a.tokenize||c.f||this.f||H.f;this.split=C(b=a.split)?this.split||H.split:J(b)?r(b):b;this.D=a.rtl||this.D||H.D;this.async=
"undefined"===typeof Promise||C(b=a.async)?this.async||H.async:b;this.g=C(b=a.worker)?this.g||H.g:b;this.threshold=C(b=a.threshold)?c.threshold||this.threshold||H.threshold:b;this.b=C(b=a.resolution)?b=c.b||this.b||H.b:b;b<=this.threshold&&(this.b=this.threshold+1);this.depth="strict"!==this.f||C(b=a.depth)?c.depth||this.depth||H.depth:b;this.w=(b=C(b=a.encode)?c.encode||H.encode:b)&&U[b]&&U[b].bind(U)||(O(b)?b:this.w||!1);(b=a.matcher)&&this.addMatcher(b);if(b=(c=a.lang)||a.filter){J(b)&&(b=ka[b]);
if(F(b)){d=this.w;e=B();for(var f=0;f<b.length;f++){var h=d?d(b[f]):b[f];e[h]=1}b=e}this.filter=b}if(b=c||a.stemmer){var g;c=J(b)?la[b]:b;d=this.w;e=[];for(g in c)c.hasOwnProperty(g)&&(f=d?d(g):g,e.push(r(f+"($|\\W)"),d?d(c[g]):c[g]));this.stemmer=g=e}this.a=e=(b=a.doc)?S(b):this.a||H.a;this.i=ia(this.b-(this.threshold||0));this.h=B();this.c=B();if(e){this.l=B();a.doc=null;g=e.index={};c=e.keys=[];d=e.field;f=e.tag;h=e.store;F(e.id)||(e.id=e.id.split(":"));if(h){var k=B();if(J(h))k[h]=1;else if(F(h))for(let l=
0;l<h.length;l++)k[h[l]]=1;else G(h)&&(k=h);e.store=k}if(f){this.G=B();h=B();if(d)if(J(d))h[d]=a;else if(F(d))for(k=0;k<d.length;k++)h[d[k]]=a;else G(d)&&(h=d);F(f)||(e.tag=f=[f]);for(d=0;d<f.length;d++)this.G[f[d]]=B();this.I=f;d=h}if(d){let l;F(d)||(G(d)?(l=d,e.field=d=Object.keys(d)):e.field=d=[d]);for(e=0;e<d.length;e++)f=d[e],F(f)||(l&&(a=l[f]),c[e]=f,d[e]=f.split(":")),g[f]=new w(a)}a.doc=b}this.B=!0;this.j=(this.cache=b=C(b=a.cache)?this.cache||H.cache:b)?new ua(b):!1;return this};w.prototype.encode=
function(a){a&&(aa.length&&(a=Q(a,aa)),this.v.length&&(a=Q(a,this.v)),this.w&&(a=this.w(a)),this.stemmer&&(a=Q(a,this.stemmer)));return a};w.prototype.addMatcher=function(a){const c=this.v;for(const b in a)a.hasOwnProperty(b)&&c.push(r(b),a[b]);return this};w.prototype.add=function(a,c,b,d,e){if(this.a&&G(a))return this.A("add",a,c);if(c&&J(c)&&(a||0===a)){var f="@"+a;if(this.c[f]&&!d)return this.update(a,c);if(this.g)return++this.C>=this.m.length&&(this.C=0),this.m[this.C].postMessage({add:!0,id:a,
content:c}),this.c[f]=""+this.C,b&&b(),this;if(!e){if(this.async&&"function"!==typeof importScripts){let t=this;f=new Promise(function(v){setTimeout(function(){t.add(a,c,null,d,!0);t=null;v()})});if(b)f.then(b);else return f;return this}if(b)return this.add(a,c,null,d,!0),b(),this}c=this.encode(c);if(!c.length)return this;b=this.f;e=O(b)?b(c):c.split(this.split);this.filter&&(e=W(e,this.filter));const n=B();n._ctx=B();const m=e.length,u=this.threshold,q=this.depth,A=this.b,z=this.i,y=this.D;for(let t=
0;t<m;t++){var h=e[t];if(h){var g=h.length,k=(y?t+1:m-t)/m,l="";switch(b){case "reverse":case "both":for(var p=g;--p;)l=h[p]+l,V(z,n,l,a,y?1:(g-p)/g,k,u,A-1);l="";case "forward":for(p=0;p<g;p++)l+=h[p],V(z,n,l,a,y?(p+1)/g:1,k,u,A-1);break;case "full":for(p=0;p<g;p++){const v=(y?p+1:g-p)/g;for(let x=g;x>p;x--)l=h.substring(p,x),V(z,n,l,a,v,k,u,A-1)}break;default:if(g=V(z,n,h,a,1,k,u,A-1),q&&1<m&&g>=u)for(g=n._ctx[h]||(n._ctx[h]=B()),h=this.h[h]||(this.h[h]=ia(A-(u||0))),k=t-q,l=t+q+1,0>k&&(k=0),l>
m&&(l=m);k<l;k++)k!==t&&V(h,g,e[k],a,0,A-(k<t?t-k:k-t),u,A-1)}}}this.c[f]=1;this.B=!1}return this};w.prototype.A=function(a,c,b){if(F(c)){var d=c.length;if(d--){for(var e=0;e<d;e++)this.A(a,c[e]);return this.A(a,c[d],b)}}else{var f=this.a.index,h=this.a.keys,g=this.a.tag;e=this.a.store;var k;var l=this.a.id;d=c;for(var p=0;p<l.length;p++)d=d[l[p]];if("remove"===a&&(delete this.l[d],l=h.length,l--)){for(c=0;c<l;c++)f[h[c]].remove(d);return f[h[l]].remove(d,b)}if(g){for(k=0;k<g.length;k++){var n=g[k];
var m=c;l=n.split(":");for(p=0;p<l.length;p++)m=m[l[p]];m="@"+m}k=this.G[n];k=k[m]||(k[m]=[])}l=this.a.field;for(let u=0,q=l.length;u<q;u++){n=l[u];g=c;for(m=0;m<n.length;m++)g=g[n[m]];n=f[h[u]];m="add"===a?n.add:n.update;u===q-1?m.call(n,d,g,b):m.call(n,d,g)}if(e){b=Object.keys(e);a=B();for(f=0;f<b.length;f++)if(h=b[f],e[h]){h=h.split(":");let u,q;for(l=0;l<h.length;l++)g=h[l],u=(u||c)[g],q=(q||a)[g]=u}c=a}k&&(k[k.length]=c);this.l[d]=c}return this};w.prototype.update=function(a,c,b){if(this.a&&
G(a))return this.A("update",a,c);this.c["@"+a]&&J(c)&&(this.remove(a),this.add(a,c,b,!0));return this};w.prototype.remove=function(a,c,b){if(this.a&&G(a))return this.A("remove",a,c);var d="@"+a;if(this.c[d]){if(this.g)return this.m[this.c[d]].postMessage({remove:!0,id:a}),delete this.c[d],c&&c(),this;if(!b){if(this.async&&"function"!==typeof importScripts){let e=this;d=new Promise(function(f){setTimeout(function(){e.remove(a,null,!0);e=null;f()})});if(c)d.then(c);else return d;return this}if(c)return this.remove(a,
null,!0),c(),this}for(c=0;c<this.b-(this.threshold||0);c++)ba(this.i[c],a);this.depth&&ba(this.h,a);delete this.c[d];this.B=!1}return this};let M;w.prototype.search=function(a,c,b,d){if(G(c)){if(F(c))for(var e=0;e<c.length;e++)c[e].query=a;else c.query=a;a=c;c=1E3}else c&&O(c)?(b=c,c=1E3):c||0===c||(c=1E3);if(this.g){this.F=b;this.u=0;this.o=[];for(var f=0;f<this.g;f++)this.m[f].postMessage({search:!0,limit:c,content:a})}else{var h=[],g=a;if(G(a)&&!F(a)){b||(b=a.callback)&&(g.callback=null);var k=
a.sort;var l=a.page;c=a.limit;f=a.threshold;var p=a.suggest;a=a.query}if(this.a){f=this.a.index;const y=g.where;var n=g.bool||"or",m=g.field;let t=n;let v,x;if(m)F(m)||(m=[m]);else if(F(g)){var u=g;m=[];t=[];for(var q=0;q<g.length;q++)d=g[q],e=d.bool||n,m[q]=d.field,t[q]=e,"not"===e?v=!0:"and"===e&&(x=!0)}else m=this.a.keys;n=m.length;for(q=0;q<n;q++)u&&(g=u[q]),l&&!J(g)&&(g.page=null,g.limit=0),h[q]=f[m[q]].search(g,0);if(b)return b(P.call(this,a,t,h,k,c,p,y,l,x,v));if(this.async){const I=this;return new Promise(function(D){Promise.all(h).then(function(E){D(P.call(I,
a,t,E,k,c,p,y,l,x,v))})})}return P.call(this,a,t,h,k,c,p,y,l,x,v)}f||(f=this.threshold||0);if(!d){if(this.async&&"function"!==typeof importScripts){let y=this;f=new Promise(function(t){setTimeout(function(){t(y.search(g,c,null,!0));y=null})});if(b)f.then(b);else return f;return this}if(b)return b(this.search(g,c,null,!0)),this}if(!a||!J(a))return h;g=a;if(this.cache)if(this.B){if(b=this.j.get(a))return b}else this.j.clear(),this.B=!0;g=this.encode(g);if(!g.length)return h;b=this.f;b=O(b)?b(g):g.split(this.split);
this.filter&&(b=W(b,this.filter));u=b.length;d=!0;e=[];var A=B(),z=0;1<u&&(this.depth&&"strict"===this.f?n=!0:b.sort(qa));if(!n||(q=this.h)){const y=this.b;for(;z<u;z++){let t=b[z];if(t){if(n){if(!m)if(q[t])m=t,A[t]=1;else if(!p)return h;if(p&&z===u-1&&!e.length)n=!1,t=m||t,A[t]=0;else if(!m)continue}if(!A[t]){const v=[];let x=!1,I=0;const D=n?q[m]:this.i;if(D){let E;for(let N=0;N<y-f;N++)if(E=D[N]&&D[N][t])v[I++]=E,x=!0}if(x)m=t,e[e.length]=1<I?v.concat.apply([],v):v[0];else if(!p){d=!1;break}A[t]=
1}}}}else d=!1;d&&(h=ha(e,c,l,p));this.cache&&this.j.set(a,h);return h}};w.prototype.find=function(a,c){return this.where(a,c,1)[0]||null};w.prototype.where=function(a,c,b,d){const e=this.l,f=[];let h=0;let g;var k;let l;if(G(a)){b||(b=c);var p=Object.keys(a);var n=p.length;g=!1;if(1===n&&"id"===p[0])return[e[a.id]];if((k=this.I)&&!d)for(var m=0;m<k.length;m++){var u=k[m],q=a[u];if(!C(q)){l=this.G[u]["@"+q];if(0===--n)return l;p.splice(p.indexOf(u),1);delete a[u];break}}k=Array(n);for(m=0;m<n;m++)k[m]=
p[m].split(":")}else{if(O(a)){c=d||Object.keys(e);b=c.length;for(p=0;p<b;p++)n=e[c[p]],a(n)&&(f[h++]=n);return f}if(C(c))return[e[a]];if("id"===a)return[e[c]];p=[a];n=1;k=[a.split(":")];g=!0}d=l||d||Object.keys(e);m=d.length;for(u=0;u<m;u++){q=l?d[u]:e[d[u]];let A=!0;for(let z=0;z<n;z++){g||(c=a[p[z]]);const y=k[z],t=y.length;let v=q;if(1<t)for(let x=0;x<t;x++)v=v[y[x]];else v=v[y[0]];if(v!==c){A=!1;break}}if(A&&(f[h++]=q,b&&h===b))break}return f};w.prototype.info=function(){if(this.g)for(let a=0;a<
this.g;a++)this.m[a].postMessage({info:!0,id:this.id});else return{id:this.id,items:this.length,cache:this.cache&&this.cache.s?this.cache.s.length:!1,matcher:aa.length+(this.v?this.v.length:0),worker:this.g,threshold:this.threshold,depth:this.depth,resolution:this.b,contextual:this.depth&&"strict"===this.f}};w.prototype.clear=function(){return this.destroy().init()};w.prototype.destroy=function(){this.cache&&(this.j.clear(),this.j=null);this.i=this.h=this.c=null;if(this.a){const a=this.a.keys;for(let c=
0;c<a.length;c++)this.a.index[a[c]].destroy();this.a=this.l=null}return this};w.prototype.export=function(a){const c=!a||C(a.serialize)||a.serialize;if(this.a){const d=!a||C(a.doc)||a.doc;var b=!a||C(a.index)||a.index;a=[];let e=0;if(b)for(b=this.a.keys;e<b.length;e++){const f=this.a.index[b[e]];a[e]=[f.i,f.h,Object.keys(f.c)]}d&&(a[e]=this.l)}else a=[this.i,this.h,Object.keys(this.c)];c&&(a=JSON.stringify(a));return a};w.prototype.import=function(a,c){if(!c||C(c.serialize)||c.serialize)a=JSON.parse(a);
const b=B();if(this.a){var d=!c||C(c.doc)||c.doc,e=0;if(!c||C(c.index)||c.index){c=this.a.keys;const h=c.length;for(var f=a[0][2];e<f.length;e++)b[f[e]]=1;for(e=0;e<h;e++){f=this.a.index[c[e]];const g=a[e];g&&(f.i=g[0],f.h=g[1],f.c=b)}}d&&(this.l=G(d)?d:a[e])}else{d=a[2];for(e=0;e<d.length;e++)b[d[e]]=1;this.i=a[0];this.h=a[1];this.c=b}};const va=function(){const a=r("\\s+"),c=r("[^a-z0-9 ]"),b=[r("[-/]")," ",c,"",a," "];return function(d){return ca(Q(d.toLowerCase(),b))}}(),U={icase:function(a){return a.toLowerCase()},
simple:function(){const a=r("\\s+"),c=r("[^a-z0-9 ]"),b=r("[-/]"),d=r("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"),e=r("[\u00e8\u00e9\u00ea\u00eb]"),f=r("[\u00ec\u00ed\u00ee\u00ef]"),h=r("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"),g=r("[\u00f9\u00fa\u00fb\u00fc\u0171]"),k=r("[\u00fd\u0177\u00ff]"),l=r("\u00f1"),p=r("[\u00e7c]"),n=r("\u00df"),m=r(" & "),u=[d,"a",e,"e",f,"i",h,"o",g,"u",k,"y",l,"n",p,"k",n,"s",m," and ",b," ",c,"",a," "];return function(q){q=Q(q.toLowerCase(),u);return" "===q?"":q}}(),advanced:function(){const a=
r("ae"),c=r("ai"),b=r("ay"),d=r("ey"),e=r("oe"),f=r("ue"),h=r("ie"),g=r("sz"),k=r("zs"),l=r("ck"),p=r("cc"),n=r("sh"),m=r("th"),u=r("dt"),q=r("ph"),A=r("pf"),z=r("ou"),y=r("uo"),t=[a,"a",c,"ei",b,"ei",d,"ei",e,"o",f,"u",h,"i",g,"s",k,"s",n,"s",l,"k",p,"k",m,"t",u,"t",q,"f",A,"f",z,"o",y,"u"];return function(v,x){if(!v)return v;v=this.simple(v);2<v.length&&(v=Q(v,t));x||1<v.length&&(v=ca(v));return v}}(),extra:function(){const a=r("p"),c=r("z"),b=r("[cgq]"),d=r("n"),e=r("d"),f=r("[vw]"),h=r("[aeiouy]"),
g=[a,"b",c,"s",b,"k",d,"m",e,"t",f,"f",h,""];return function(k){if(!k)return k;k=this.advanced(k,!0);if(1<k.length){k=k.split(" ");for(let l=0;l<k.length;l++){const p=k[l];1<p.length&&(k[l]=p[0]+Q(p.substring(1),g))}k=k.join(" ");k=ca(k)}return k}}(),balance:va},ua=function(){function a(c){this.clear();this.H=!0!==c&&c}a.prototype.clear=function(){this.cache=B();this.count=B();this.index=B();this.s=[]};a.prototype.set=function(c,b){if(this.H&&C(this.cache[c])){let d=this.s.length;if(d===this.H){d--;
const e=this.s[d];delete this.cache[e];delete this.count[e];delete this.index[e]}this.index[c]=d;this.s[d]=c;this.count[c]=-1;this.cache[c]=b;this.get(c)}else this.cache[c]=b};a.prototype.get=function(c){const b=this.cache[c];if(this.H&&b){var d=++this.count[c];const f=this.index;let h=f[c];if(0<h){const g=this.s;for(var e=h;this.count[g[--h]]<=d&&-1!==h;);h++;if(h!==e){for(d=e;d>h;d--)e=g[d-1],g[d]=e,f[e]=d;g[h]=c;f[c]=h}}}return b};return a}();return w}(function(){const K={},R="undefined"!==typeof Blob&&
"undefined"!==typeof URL&&URL.createObjectURL;return function(w,L,S,W,P){S=R?URL.createObjectURL(new Blob(["("+S.toString()+")()"],{type:"text/javascript"})):w+".min.js";w+="-"+L;K[w]||(K[w]=[]);K[w][P]=new Worker(S);K[w][P].onmessage=W;return K[w][P]}}()),this);

},{}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _flexsearch = _interopRequireDefault(require("flexsearch"));

/* global fetch */
// https://github.com/gmfmi/searchinGhost
var SearchinGhost = /*#__PURE__*/function () {
  /**
   * Constructor and entry point of the library
   * @param {Document} args
   */
  function SearchinGhost(args) {
    (0, _classCallCheck2.default)(this, SearchinGhost);
    this.config = {
      url: window.location.origin,
      key: '',
      version: 'v4',
      loadOn: 'focus',
      searchOn: 'keyup',
      limit: 10,
      inputId: ['search-field'],
      outputId: ['search-results'],
      outputChildsType: 'li',
      //
      postsFields: ['title', 'url', 'published_at'],
      postsExtraFields: [],
      postsFormats: [],
      indexedFields: ['title'],
      template: function template(post) {
        return "<a class=\"flex items-center noWrapWithEllipsis px-4 py-2\" href=\"".concat(post.url, "\"><svg class=\"icon flex-none mr-2\"><use xlink:href=\"#icon-search\"></use></svg> <span>").concat(post.name === undefined ? post.title : post.name, "</span></a>");
      },
      // template: function (post) {},
      //
      // postsFields: ['title', 'url', 'excerpt', 'custom_excerpt', 'published_at', 'feature_image'],
      // postsExtraFields: ['tags'],
      // postsFormats: ['plaintext'],
      // indexedFields: ['title', 'string_tags', 'excerpt', 'plaintext'],
      // template: function (post) {
      //   let o = `<a href='${post.url}'>`
      //   if (post.feature_image) o += `<img src='${post.feature_image}'>`
      //   o += '<section>'
      //   o += `<h2>${post.title}</h2>`
      //   o += `</section></a>`
      //   return o
      // },
      emptyTemplate: function emptyTemplate() {},
      customProcessing: function customProcessing(post) {
        if (post.tags) post.string_tags = post.tags.map(function (o) {
          return o.name;
        }).join(' ').toLowerCase();
        return post;
      },
      date: {
        locale: document.documentElement.lang || 'en-US',
        options: {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }
      },
      cacheMaxAge: 1800,
      onFetchStart: function onFetchStart() {
        return document.body.classList.add('is-loading');
      },
      onFetchEnd: function onFetchEnd() {
        return setTimeout(function () {
          document.body.classList.remove('is-loading');
        }, 4000);
      },
      onIndexBuildStart: function onIndexBuildStart() {},
      onIndexBuildEnd: function onIndexBuildEnd(index) {},
      onSearchStart: function onSearchStart() {},
      onSearchEnd: function onSearchEnd(posts) {},
      indexOptions: {},
      searchOptions: {},
      debug: false
    };
    this.dataLoaded = false; // flag to ensure data are properly loaded

    this.postsCount = 0; // keep track of posts ID, must be numeric

    this.storage = this.getLocalStorageOption();
    this.initConfig(args);
    this.triggerDataLoad();
  }
  /**
   * Apply the user configuration and initialize important variables
   * @param {Document} args
   */


  (0, _createClass2.default)(SearchinGhost, [{
    key: "initConfig",
    value: function initConfig(args) {
      var _this = this;

      for (var _i = 0, _Object$entries = Object.entries(args); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        this.config[key] = value;
      } // ensure config backward compatilibity of <1.5.0


      if (!Array.isArray(this.config.inputId)) this.config.inputId = [this.config.inputId];
      if (!Array.isArray(this.config.outputId)) this.config.outputId = [this.config.outputId]; // Inject the 'limit' arg within the final searchOptions

      this.config.searchOptions.limit = this.config.limit; // Ensure 'updated_at' will be fetched, needed for the local storage logic

      this.originalPostsFields = this.config.postsFields;

      if (!this.config.postsFields.includes('updated_at')) {
        this.config.postsFields.push('updated_at');
      }

      if (this.config.inputId && this.config.inputId.length > 0) {
        this.searchBarEls = [];
        this.config.inputId.forEach(function (id) {
          var searchBar = document.getElementById(id);

          if (searchBar) {
            _this.searchBarEls.push(searchBar);

            _this.addSearchListeners(searchBar);
          } else {
            _this.error("Enable to find the input element #".concat(id, ", please check your configuration"));
          }
        });
      }

      if (this.config.outputId && this.config.outputId.length > 0) {
        this.searchResultEls = [];
        this.config.outputId.forEach(function (id) {
          var searchResult = document.getElementById(id);

          if (searchResult) {
            _this.searchResultEls.push(searchResult);
          } else {
            _this.error("Enable to find the output element #".concat(id, ", please check your configuration"));
          }
        });
      }

      this.index = this.getNewSearchIndex();
    }
    /**
     * Set the search input bar and form event listeners to trigger
     * further searches
     */

  }, {
    key: "addSearchListeners",
    value: function addSearchListeners(searchBarEl) {
      var _this2 = this;

      // In any case, prevent the input form from being submitted
      var searchForm = searchBarEl.closest('form');

      if (searchForm) {
        searchForm.addEventListener('submit', function (ev) {
          ev.preventDefault();
        });
      }

      switch (this.config.searchOn) {
        case 'keyup':
          searchBarEl.addEventListener('keyup', function () {
            var inputQuery = searchBarEl.value.toLowerCase();

            _this2.search(inputQuery);
          });
          break;

        case 'submit':
          searchForm.addEventListener('submit', function () {
            var inputQuery = searchBarEl.value.toLowerCase();

            _this2.search(inputQuery);
          });
          break;

        case false:
        case 'none':
          // do nothing
          break;

        default:
          this.error("Unknown 'searchOn' option: '".concat(this.config.searchOn, "'"));
      }
    }
    /**
     * Set triggers to load the posts data when ready
     */

  }, {
    key: "triggerDataLoad",
    value: function triggerDataLoad() {
      var _this3 = this;

      switch (this.config.loadOn) {
        case 'focus':
          this.searchBarEls.forEach(function (searchBarEl) {
            searchBarEl.addEventListener('focus', function () {
              _this3.loadData();
            });
          });
          break;

        case 'page':
          window.addEventListener('load', function () {
            _this3.loadData();
          });
          break;

        case false:
        case 'none':
          // do nothing
          break;

        default:
          this.error("Unknown 'loadOn' option: '".concat(this.config.loadOn, "'"));
      }
    }
    /**
     * Actually load the data into a searchable index.
     * When this method is completed, we are ready to launch search queries.
     */

  }, {
    key: "loadData",
    value: function loadData() {
      if (this.dataLoaded) return;

      if (!this.storage) {
        this.log('No local storage available, switch to degraded mode');
        this.fetch();
        return;
      }

      var storedIndex = this.storage.getItem('SearchinGhost_index');

      if (storedIndex) {
        this.log('Found an index stored locally, loads it');
        this.config.onIndexBuildStart();
        this.index.import(storedIndex);
        this.dataLoaded = true;
        this.config.onIndexBuildEnd(this.index);
        this.validateCache();
      } else {
        this.log('No already stored index found');
        this.fetch();
      }
    }
    /**
     * Ensure stored data are up to date.
     */

  }, {
    key: "validateCache",
    value: function validateCache() {
      var _this4 = this;

      var cacheInfoString = this.storage.getItem('SearchinGhost_cache_info');

      if (!cacheInfoString) {
        this.log('No cache info local object found');
        this.fetch();
        return;
      }

      var cacheInfo = JSON.parse(cacheInfoString);
      var lastUpdate = new Date(cacheInfo.lastCacheCheck);
      var elapsedTime = Math.round((new Date() - lastUpdate) / 1000);

      if (elapsedTime < this.config.cacheMaxAge) {
        this.log("Skip cache refreshing, updated less than ".concat(this.config.cacheMaxAge, "s ago (").concat(elapsedTime, "s)"));
        return;
      }

      var browseOptions = {
        limit: 1,
        fields: ['updated_at'],
        order: 'updated_at DESC'
      };
      var lastUpdatedPostUrl = this.buildUrl(browseOptions);
      fetch(lastUpdatedPostUrl).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        var lastestPostUpdatedAt = jsonResponse.posts[0].updated_at;
        var totalPosts = jsonResponse.meta.pagination.total;

        if (lastestPostUpdatedAt !== cacheInfo.lastestPostUpdatedAt) {
          _this4.log('Posts update found, purge outdated local cache');

          _this4.fetch();
        } else if (totalPosts < cacheInfo.totalPosts) {
          _this4.log('Deleted or unpublished posts found, purge outdated local cache');

          _this4.fetch();
        } else {
          _this4.log('Local cached data up to date');

          cacheInfo.lastCacheCheck = new Date().toISOString();

          _this4.storage.setItem('SearchinGhost_cache_info', JSON.stringify(cacheInfo));
        }
      }).catch(function (error) {
        console.error('Unable to fetch the latest post information to check cache state', error);
      });
    }
    /**
     * Fetch, format and store posts data from Ghost.
     */

  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch() {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function () {
      var _this5 = this;

      this.log('Fetching data from Ghost API');
      this.config.onFetchStart();
      var browseOptions = {
        limit: 'all',
        fields: this.config.postsFields,
        order: 'updated_at DESC'
      };
      if (this.config.postsExtraFields.length > 0) browseOptions.include = this.config.postsExtraFields;
      if (this.config.postsFormats.length > 0) browseOptions.formats = this.config.postsFormats;
      var allPostsUrl = this.buildUrl(browseOptions);
      fetch(allPostsUrl).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        var posts = jsonResponse.posts;

        _this5.config.onFetchEnd(posts);

        _this5.config.onIndexBuildStart();

        _this5.index = _this5.getNewSearchIndex();
        posts.forEach(function (post) {
          var formattedPost = _this5.format(post);

          if (formattedPost) _this5.index.add(formattedPost);
        });
        _this5.dataLoaded = true;

        _this5.config.onIndexBuildEnd(_this5.index);

        if (_this5.storage) {
          var cacheInfo = {
            lastCacheCheck: new Date().toISOString(),
            lastestPostUpdatedAt: posts[0].updated_at,
            totalPosts: jsonResponse.meta.pagination.total
          };

          _this5.storage.setItem('SearchinGhost_index', _this5.index.export());

          _this5.storage.setItem('SearchinGhost_cache_info', JSON.stringify(cacheInfo));
        }

        _this5.log('Search index build complete');
      }).catch(function (error) {
        _this5.error('Unable to fetch Ghost data.\n', error);
      });
    }
    /**
     * Format a post document before being indexed.
     * @param {Document} post
     * @return {Document} The formatted post
     */
    )
  }, {
    key: "format",
    value: function format(post) {
      // Need to use a numeric ID to improve performance & disk space
      post.id = this.postsCount++; // display date using 'locale' format

      post.published_at = this.prettyDate(post.published_at); // only used to keep track of the last fetch time,
      // remove it before indexing BUT only if not wanted by the user

      if (!this.originalPostsFields.includes('updated_at')) {
        delete post.updated_at;
      }

      if (post.custom_excerpt) {
        post.excerpt = post.custom_excerpt;
        delete post.custom_excerpt;
      }

      post = this.config.customProcessing(post);
      return post;
    }
    /**
     * Execute a search query.
     * @param {string} inputQuery
     */

  }, {
    key: "search",
    value: function search(inputQuery) {
      this.loadData();
      this.config.onSearchStart();
      var postsFound = this.index.search(inputQuery, this.config.searchOptions);
      if (this.searchResultEls && this.searchResultEls.length > 0) this.display(postsFound);
      this.config.onSearchEnd(postsFound);
      return postsFound;
    }
    /**
     * Display the results as HTML into the configured DOM output element.
     * @param {Document[]} posts
     */

  }, {
    key: "display",
    value: function display(posts) {
      var _this6 = this;

      this.searchResultEls.forEach(function (resultEl) {
        resultEl.innerHTML = '';
      });

      if (posts.length < 1) {
        this.insertTemplate(this.config.emptyTemplate());
      } else {
        posts.forEach(function (post) {
          _this6.insertTemplate(_this6.config.template(post));
        });
      }
    }
    /**
     * Insert the HTML generated by the template into the DOM results output element.
     * If a falsy value is returned by the template, do not apply any update.
     * @param {*} generatedHtml HTML node element or HTML string
     */

  }, {
    key: "insertTemplate",
    value: function insertTemplate(generatedHtml) {
      var _this7 = this;

      if (generatedHtml) {
        this.searchResultEls.forEach(function (resultEl) {
          if (_this7.config.outputChildsType) {
            var child = document.createElement(_this7.config.outputChildsType);
            child.classList.add("".concat(resultEl.id, "-item"));
            child.innerHTML = generatedHtml;
            resultEl.appendChild(child);
          } else {
            resultEl.insertAdjacentHTML('beforeend', generatedHtml);
          }
        });
      }
    }
    /**
     * Get a new instance of FlexSearch.
     * @return {FlexSearch} The instance of FlexSearch.
     */

  }, {
    key: "getNewSearchIndex",
    value: function getNewSearchIndex() {
      var indexConfig = {
        doc: {
          id: 'id',
          field: this.config.indexedFields
        },
        encode: 'simple',
        tokenize: 'forward',
        threshold: 0,
        resolution: 4,
        depth: 0
      };

      for (var _i2 = 0, _Object$entries2 = Object.entries(this.config.indexOptions); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i2], 2),
            key = _Object$entries2$_i[0],
            value = _Object$entries2$_i[1];

        indexConfig[key] = value;
      }

      return new _flexsearch.default(indexConfig);
    }
    /**
     * Build the final Ghost API URL resources based on options.
     * @param {Document} options the Ghost API browse options
     * @return {string} the url
     */

  }, {
    key: "buildUrl",
    value: function buildUrl(options) {
      var url = "".concat(this.config.url, "/ghost/api/").concat(this.config.version, "/content/posts/?key=").concat(this.config.key);

      for (var _i3 = 0, _Object$entries3 = Object.entries(options); _i3 < _Object$entries3.length; _i3++) {
        var _Object$entries3$_i = (0, _slicedToArray2.default)(_Object$entries3[_i3], 2),
            key = _Object$entries3$_i[0],
            value = _Object$entries3$_i[1];

        url += "&".concat(key, "=").concat(value);
      }

      return encodeURI(url);
    }
    /**
     * Get the date in the locale expected format.
     * @param {string} date
     * @return {string} The formatted date
     */

  }, {
    key: "prettyDate",
    value: function prettyDate(date) {
      var d = new Date(date);
      return d.toLocaleDateString(this.config.date.locale, this.config.date.options);
    }
    /**
     * Safely get the local storage object if available.
     * If the user browser disabled it, get `undefined` instead.
     * @return {Storage} The storage object or `undefined`
     */

  }, {
    key: "getLocalStorageOption",
    value: function getLocalStorageOption() {
      try {
        window.localStorage.setItem('storage-availability-test', '');
        window.localStorage.removeItem('storage-availability-test');
        return window.localStorage;
      } catch (err) {
        return undefined;
      }
    }
    /**
     * Simple logging function.
     * Output logs only if `debug` is set to `true`.
     * @param {string} str the text to output
     * @param {*} obj optional object to output
     */

  }, {
    key: "log",
    value: function log(str, obj) {
      if (this.config.debug) obj ? console.log(str, obj) : console.log(str);
    }
    /**
     * Simple 'error' level logging function.
     * @param {string} str the text to output
     * @param {*} obj optional object to output
     */

  }, {
    key: "error",
    value: function error(str, obj) {
      obj ? console.error(str, obj) : console.error(str);
    }
  }]);
  return SearchinGhost;
}();

exports.default = SearchinGhost;

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/interopRequireDefault":5,"@babel/runtime/helpers/slicedToArray":8,"flexsearch":10}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _searchinghost = _interopRequireDefault(require("./lib/searchinghost"));

/* global searchSettings */
(function (document) {
  var $body = document.body;
  var $input = document.querySelector('#search-field');
  var $results = document.querySelector('#search-results');
  var $searchMessage = document.querySelector('.js-search-message');
  var classIsActive = 'is-active';
  var allSearchLinksLength = 0;
  var searchResultsHeight = {
    outer: 0,
    scroll: 0
  }; // SHow icon search in header

  document.querySelector('a[data-target=modal-search]').classList.remove('hidden');

  var afterDisplaySearch = function afterDisplaySearch(results) {
    // Active class to link search
    searchResultActive();
    allSearchLinksLength = results.length;
    searchResultsHeight = {
      outer: $results.offsetHeight,
      scroll: $results.scrollHeight
    };

    if (allSearchLinksLength === 0 && $input.value !== '') {
      $searchMessage.classList.remove('hidden');
      $body.removeEventListener('keydown', mySearchKey);
    } else {
      $searchMessage.classList.add('hidden');
      $body.addEventListener('keydown', mySearchKey);
    }
  };
  /* Customized search data
  /* ---------------------------------------------------------- */


  var mySearchSettings = {
    key: searchSettings.key,
    onSearchEnd: function onSearchEnd(results) {
      return afterDisplaySearch(results);
    }
  };
  /* when the Enter key is pressed
  /* ---------------------------------------------------------- */

  function enterKey() {
    var link = $results.querySelector("li.".concat(classIsActive));
    link && link.firstChild.click();
  }
  /* Attending the active class to the search link
  /* ---------------------------------------------------------- */


  function searchResultActive(index, upDown) {
    index = index || 0;
    upDown = upDown || 'up';
    var allSearchLinks = $results.querySelectorAll('li'); // Return if there are no results

    if (!allSearchLinks.length) return; // Remove All class Active

    allSearchLinks.forEach(function (element) {
      return element.classList.remove(classIsActive);
    }); // Add class active

    allSearchLinks[index].classList.add(classIsActive); // Scroll for results box

    var linkOffSetTop = allSearchLinks[index].offsetTop;
    var scrollPosition = 0;
    upDown === 'down' && linkOffSetTop > searchResultsHeight.outer / 2 ? scrollPosition = linkOffSetTop - searchResultsHeight.outer / 2 : upDown === 'up' && (scrollPosition = linkOffSetTop < searchResultsHeight.scroll - searchResultsHeight.outer / 2 ? linkOffSetTop - searchResultsHeight.outer / 2 : searchResultsHeight.scroll);
    $results.scrollTo(0, scrollPosition);
  }
  /* Reacted to the up or down keys
  /* ---------------------------------------------------------- */


  function arrowKeyUpDown(keyNumber) {
    var upDown;
    var indexTheLink = 0;
    var resultActive = $results.querySelector("li.".concat(classIsActive));

    if (resultActive) {
      indexTheLink = [].slice.call(resultActive.parentNode.children).indexOf(resultActive);
    }

    $input.blur(); // 38 === UP

    if (keyNumber === 38) {
      upDown = 'up';

      if (indexTheLink <= 0) {
        $input.focus();
        indexTheLink = 0;
      } else {
        indexTheLink -= 1;
      }
    } else {
      upDown = 'down';

      if (indexTheLink >= allSearchLinksLength - 1) {
        indexTheLink = 0;
      } else {
        indexTheLink += 1;
      }
    }

    searchResultActive(indexTheLink, upDown);
  }
  /* Adding functions to the keys
  /* ---------------------------------------------------------- */


  function mySearchKey(e) {
    var keyNumber = e.keyCode;
    /**
      * 38 => Up
      * 40 => down
      * 13 => enter
      **/

    if (keyNumber === 13) {
      $input.blur();
      enterKey();
    } else if (keyNumber === 38 || keyNumber === 40) {
      arrowKeyUpDown(keyNumber);
      e.preventDefault();
    }
  }
  /* Search
  /* ---------------------------------------------------------- */

  /* eslint-disable no-new */


  new _searchinghost.default(mySearchSettings);
})(document);

},{"./lib/searchinghost":11,"@babel/runtime/helpers/interopRequireDefault":5}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L2ZsZXhzZWFyY2gubWluLmpzIiwic3JjL2pzL2xpYi9zZWFyY2hpbmdob3N0LmpzIiwic3JjL2pzL3NlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFLLEVBQWxCLEVBQXNCO0FBQ3BCLE1BQUEsTUFBTSxHQUFHLElBQVQ7O0FBRUEsVUFBSSxZQUFZLElBQUksQ0FBcEIsRUFBdUI7QUFDckIsUUFBQSxNQUFNLENBQUMsS0FBUDtBQUNBLFFBQUEsWUFBWSxHQUFHLENBQWY7QUFDRCxPQUhELE1BR087QUFDTCxRQUFBLFlBQVksSUFBSSxDQUFoQjtBQUNEO0FBQ0YsS0FURCxNQVNPO0FBQ0wsTUFBQSxNQUFNLEdBQUcsTUFBVDs7QUFFQSxVQUFJLFlBQVksSUFBSSxvQkFBb0IsR0FBRyxDQUEzQyxFQUE4QztBQUM1QyxRQUFBLFlBQVksR0FBRyxDQUFmO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsUUFBQSxZQUFZLElBQUksQ0FBaEI7QUFDRDtBQUNGOztBQUVELElBQUEsa0JBQWtCLENBQUMsWUFBRCxFQUFlLE1BQWYsQ0FBbEI7QUFDRDtBQUVEO0FBQ0Y7OztBQUNFLFdBQVMsV0FBVCxDQUFzQixDQUF0QixFQUF5QjtBQUN2QixRQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsT0FBcEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVJLFFBQUksU0FBUyxLQUFLLEVBQWxCLEVBQXNCO0FBQ3BCLE1BQUEsTUFBTSxDQUFDLElBQVA7QUFDQSxNQUFBLFFBQVE7QUFDVCxLQUhELE1BR08sSUFBSSxTQUFTLEtBQUssRUFBZCxJQUFvQixTQUFTLEtBQUssRUFBdEMsRUFBMEM7QUFDL0MsTUFBQSxjQUFjLENBQUMsU0FBRCxDQUFkO0FBQ0EsTUFBQSxDQUFDLENBQUMsY0FBRjtBQUNEO0FBQ0Y7QUFFRDtBQUNGOztBQUNFOzs7QUFDQSxNQUFJLHNCQUFKLENBQWtCLGdCQUFsQjtBQUNELENBM0lELEVBMklHLFFBM0lIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheUxpa2VUb0FycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlcywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3QsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIik7XG5cbnZhciB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwidmFyIGFycmF5TGlrZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCIpO1xuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIi8qXG4gRmxleFNlYXJjaCB2MC42LjMwXG4gQ29weXJpZ2h0IDIwMTkgTmV4dGFwcHMgR21iSFxuIEF1dGhvcjogVGhvbWFzIFdpbGtlcmxpbmdcbiBSZWxlYXNlZCB1bmRlciB0aGUgQXBhY2hlIDIuMCBMaWNlbmNlXG4gaHR0cHM6Ly9naXRodWIuY29tL25leHRhcHBzLWRlL2ZsZXhzZWFyY2hcbiovXG4ndXNlIHN0cmljdCc7KGZ1bmN0aW9uKEssUix3KXtsZXQgTDsoTD13LmRlZmluZSkmJkwuYW1kP0woW10sZnVuY3Rpb24oKXtyZXR1cm4gUn0pOihMPXcubW9kdWxlcyk/TFtLLnRvTG93ZXJDYXNlKCldPVI6XCJvYmplY3RcIj09PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPVI6d1tLXT1SfSkoXCJGbGV4U2VhcmNoXCIsZnVuY3Rpb24gbWEoSyl7ZnVuY3Rpb24gdyhhLGMpe2NvbnN0IGI9Yz9jLmlkOmEmJmEuaWQ7dGhpcy5pZD1ifHwwPT09Yj9iOm5hKys7dGhpcy5pbml0KGEsYyk7ZmEodGhpcyxcImluZGV4XCIsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hP09iamVjdC5rZXlzKHRoaXMuYS5pbmRleFt0aGlzLmEua2V5c1swXV0uYyk6T2JqZWN0LmtleXModGhpcy5jKX0pO2ZhKHRoaXMsXCJsZW5ndGhcIixmdW5jdGlvbigpe3JldHVybiB0aGlzLmluZGV4Lmxlbmd0aH0pfWZ1bmN0aW9uIEwoYSxjLGIsZCl7dGhpcy51IT09dGhpcy5nJiYodGhpcy5vPXRoaXMuby5jb25jYXQoYiksdGhpcy51KyssXG5kJiZ0aGlzLm8ubGVuZ3RoPj1kJiYodGhpcy51PXRoaXMuZyksdGhpcy51PT09dGhpcy5nJiYodGhpcy5jYWNoZSYmdGhpcy5qLnNldChjLHRoaXMubyksdGhpcy5GJiZ0aGlzLkYodGhpcy5vKSkpO3JldHVybiB0aGlzfWZ1bmN0aW9uIFMoYSl7Y29uc3QgYz1CKCk7Zm9yKGNvbnN0IGIgaW4gYSlpZihhLmhhc093blByb3BlcnR5KGIpKXtjb25zdCBkPWFbYl07RihkKT9jW2JdPWQuc2xpY2UoMCk6RyhkKT9jW2JdPVMoZCk6Y1tiXT1kfXJldHVybiBjfWZ1bmN0aW9uIFcoYSxjKXtjb25zdCBiPWEubGVuZ3RoLGQ9TyhjKSxlPVtdO2ZvcihsZXQgZj0wLGg9MDtmPGI7ZisrKXtjb25zdCBnPWFbZl07aWYoZCYmYyhnKXx8IWQmJiFjW2ddKWVbaCsrXT1nfXJldHVybiBlfWZ1bmN0aW9uIFAoYSxjLGIsZCxlLGYsaCxnLGssbCl7Yj1oYShiLGg/MDplLGcsZixjLGssbCk7bGV0IHA7ZyYmKGc9Yi5wYWdlLHA9Yi5uZXh0LGI9Yi5yZXN1bHQpO2lmKGgpYz10aGlzLndoZXJlKGgsbnVsbCxcbmUsYik7ZWxzZXtjPWI7Yj10aGlzLmw7ZT1jLmxlbmd0aDtmPUFycmF5KGUpO2ZvcihoPTA7aDxlO2grKylmW2hdPWJbY1toXV07Yz1mfWI9YztkJiYoTyhkKXx8KE09ZC5zcGxpdChcIjpcIiksMTxNLmxlbmd0aD9kPW9hOihNPU1bMF0sZD1wYSkpLGIuc29ydChkKSk7Yj1UKGcscCxiKTt0aGlzLmNhY2hlJiZ0aGlzLmouc2V0KGEsYik7cmV0dXJuIGJ9ZnVuY3Rpb24gZmEoYSxjLGIpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShhLGMse2dldDpifSl9ZnVuY3Rpb24gcihhKXtyZXR1cm4gbmV3IFJlZ0V4cChhLFwiZ1wiKX1mdW5jdGlvbiBRKGEsYyl7Zm9yKGxldCBiPTA7YjxjLmxlbmd0aDtiKz0yKWE9YS5yZXBsYWNlKGNbYl0sY1tiKzFdKTtyZXR1cm4gYX1mdW5jdGlvbiBWKGEsYyxiLGQsZSxmLGgsZyl7aWYoY1tiXSlyZXR1cm4gY1tiXTtlPWU/KGctKGh8fGcvMS41KSkqZisoaHx8Zy8xLjUpKmU6ZjtjW2JdPWU7ZT49aCYmKGE9YVtnLShlKy41Pj4wKV0sYT1hW2JdfHwoYVtiXT1bXSksXG5hW2EubGVuZ3RoXT1kKTtyZXR1cm4gZX1mdW5jdGlvbiBiYShhLGMpe2lmKGEpe2NvbnN0IGI9T2JqZWN0LmtleXMoYSk7Zm9yKGxldCBkPTAsZT1iLmxlbmd0aDtkPGU7ZCsrKXtjb25zdCBmPWJbZF0saD1hW2ZdO2lmKGgpZm9yKGxldCBnPTAsaz1oLmxlbmd0aDtnPGs7ZysrKWlmKGhbZ109PT1jKXsxPT09az9kZWxldGUgYVtmXTpoLnNwbGljZShnLDEpO2JyZWFrfWVsc2UgRyhoW2ddKSYmYmEoaFtnXSxjKX19fWZ1bmN0aW9uIGNhKGEpe2xldCBjPVwiXCIsYj1cIlwiO3ZhciBkPVwiXCI7Zm9yKGxldCBlPTA7ZTxhLmxlbmd0aDtlKyspe2NvbnN0IGY9YVtlXTtpZihmIT09YilpZihlJiZcImhcIj09PWYpe2lmKGQ9XCJhXCI9PT1kfHxcImVcIj09PWR8fFwiaVwiPT09ZHx8XCJvXCI9PT1kfHxcInVcIj09PWR8fFwieVwiPT09ZCwoXCJhXCI9PT1ifHxcImVcIj09PWJ8fFwiaVwiPT09Ynx8XCJvXCI9PT1ifHxcInVcIj09PWJ8fFwieVwiPT09YikmJmR8fFwiIFwiPT09YiljKz1mfWVsc2UgYys9ZjtkPWU9PT1hLmxlbmd0aC0xP1wiXCI6YVtlK1xuMV07Yj1mfXJldHVybiBjfWZ1bmN0aW9uIHFhKGEsYyl7YT1hLmxlbmd0aC1jLmxlbmd0aDtyZXR1cm4gMD5hPzE6YT8tMTowfWZ1bmN0aW9uIHBhKGEsYyl7YT1hW01dO2M9Y1tNXTtyZXR1cm4gYTxjPy0xOmE+Yz8xOjB9ZnVuY3Rpb24gb2EoYSxjKXtjb25zdCBiPU0ubGVuZ3RoO2ZvcihsZXQgZD0wO2Q8YjtkKyspYT1hW01bZF1dLGM9Y1tNW2RdXTtyZXR1cm4gYTxjPy0xOmE+Yz8xOjB9ZnVuY3Rpb24gVChhLGMsYil7cmV0dXJuIGE/e3BhZ2U6YSxuZXh0OmM/XCJcIitjOm51bGwscmVzdWx0OmJ9OmJ9ZnVuY3Rpb24gaGEoYSxjLGIsZCxlLGYsaCl7bGV0IGcsaz1bXTtpZighMD09PWIpe2I9XCIwXCI7dmFyIGw9XCJcIn1lbHNlIGw9YiYmYi5zcGxpdChcIjpcIik7Y29uc3QgcD1hLmxlbmd0aDtpZigxPHApe2NvbnN0IHk9QigpLHQ9W107bGV0IHYseDt2YXIgbj0wLG07bGV0IEk7dmFyIHU9ITA7bGV0IEQsRT0wLE4sZGEsWCxlYTtsJiYoMj09PWwubGVuZ3RoPyhYPWwsbD0hMSk6bD1lYT1cbnBhcnNlSW50KGxbMF0sMTApKTtpZihoKXtmb3Iodj1CKCk7bjxwO24rKylpZihcIm5vdFwiPT09ZVtuXSlmb3IoeD1hW25dLEk9eC5sZW5ndGgsbT0wO208STttKyspdltcIkBcIit4W21dXT0xO2Vsc2UgZGE9bisxO2lmKEMoZGEpKXJldHVybiBUKGIsZyxrKTtuPTB9ZWxzZSBOPUooZSkmJmU7bGV0IFk7Zm9yKDtuPHA7bisrKXtjb25zdCByYT1uPT09KGRhfHxwKS0xO2lmKCFOfHwhbilpZigobT1OfHxlJiZlW25dKSYmXCJhbmRcIiE9PW0paWYoXCJvclwiPT09bSlZPSExO2Vsc2UgY29udGludWU7ZWxzZSBZPWY9ITA7eD1hW25dO2lmKEk9eC5sZW5ndGgpe2lmKHUpaWYoRCl7dmFyIHE9RC5sZW5ndGg7Zm9yKG09MDttPHE7bSsrKXt1PURbbV07dmFyIEE9XCJAXCIrdTtoJiZ2W0FdfHwoeVtBXT0xLGZ8fChrW0UrK109dSkpfUQ9bnVsbDt1PSExfWVsc2V7RD14O2NvbnRpbnVlfUE9ITE7Zm9yKG09MDttPEk7bSsrKXtxPXhbbV07dmFyIHo9XCJAXCIrcTtjb25zdCBaPWY/eVt6XXx8MDpuO2lmKCEoIVomJlxuIWR8fGgmJnZbel18fCFmJiZ5W3pdKSlpZihaPT09bil7aWYocmEpe2lmKCFlYXx8LS1lYTxFKWlmKGtbRSsrXT1xLGMmJkU9PT1jKXJldHVybiBUKGIsRSsobHx8MCksayl9ZWxzZSB5W3pdPW4rMTtBPSEwfWVsc2UgZCYmKHo9dFtaXXx8KHRbWl09W10pLHpbei5sZW5ndGhdPXEpfWlmKFkmJiFBJiYhZClicmVha31lbHNlIGlmKFkmJiFkKXJldHVybiBUKGIsZyx4KX1pZihEKWlmKG49RC5sZW5ndGgsaClmb3IobT1sP3BhcnNlSW50KGwsMTApOjA7bTxuO20rKylhPURbbV0sdltcIkBcIithXXx8KGtbRSsrXT1hKTtlbHNlIGs9RDtpZihkKWZvcihFPWsubGVuZ3RoLFg/KG49cGFyc2VJbnQoWFswXSwxMCkrMSxtPXBhcnNlSW50KFhbMV0sMTApKzEpOihuPXQubGVuZ3RoLG09MCk7bi0tOylpZihxPXRbbl0pe2ZvcihJPXEubGVuZ3RoO208STttKyspaWYoZD1xW21dLCFofHwhdltcIkBcIitkXSlpZihrW0UrK109ZCxjJiZFPT09YylyZXR1cm4gVChiLG4rXCI6XCIrbSxrKTttPTB9fWVsc2UhcHx8XG5lJiZcIm5vdFwiPT09ZVswXXx8KGs9YVswXSxsJiYobD1wYXJzZUludChsWzBdLDEwKSkpO2MmJihoPWsubGVuZ3RoLGwmJmw+aCYmKGw9MCksbD1sfHwwLGc9bCtjLGc8aD9rPWsuc2xpY2UobCxnKTooZz0wLGwmJihrPWsuc2xpY2UobCkpKSk7cmV0dXJuIFQoYixnLGspfWZ1bmN0aW9uIEooYSl7cmV0dXJuXCJzdHJpbmdcIj09PXR5cGVvZiBhfWZ1bmN0aW9uIEYoYSl7cmV0dXJuIGEuY29uc3RydWN0b3I9PT1BcnJheX1mdW5jdGlvbiBPKGEpe3JldHVyblwiZnVuY3Rpb25cIj09PXR5cGVvZiBhfWZ1bmN0aW9uIEcoYSl7cmV0dXJuXCJvYmplY3RcIj09PXR5cGVvZiBhfWZ1bmN0aW9uIEMoYSl7cmV0dXJuXCJ1bmRlZmluZWRcIj09PXR5cGVvZiBhfWZ1bmN0aW9uIGlhKGEpe2NvbnN0IGM9QXJyYXkoYSk7Zm9yKGxldCBiPTA7YjxhO2IrKyljW2JdPUIoKTtyZXR1cm4gY31mdW5jdGlvbiBCKCl7cmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCl9ZnVuY3Rpb24gc2EoKXtsZXQgYSxjO3NlbGYub25tZXNzYWdlPVxuZnVuY3Rpb24oYil7aWYoYj1iLmRhdGEpaWYoYi5zZWFyY2gpe2NvbnN0IGQ9Yy5zZWFyY2goYi5jb250ZW50LGIudGhyZXNob2xkP3tsaW1pdDpiLmxpbWl0LHRocmVzaG9sZDpiLnRocmVzaG9sZCx3aGVyZTpiLndoZXJlfTpiLmxpbWl0KTtzZWxmLnBvc3RNZXNzYWdlKHtpZDphLGNvbnRlbnQ6Yi5jb250ZW50LGxpbWl0OmIubGltaXQscmVzdWx0OmR9KX1lbHNlIGIuYWRkP2MuYWRkKGIuaWQsYi5jb250ZW50KTpiLnVwZGF0ZT9jLnVwZGF0ZShiLmlkLGIuY29udGVudCk6Yi5yZW1vdmU/Yy5yZW1vdmUoYi5pZCk6Yi5jbGVhcj9jLmNsZWFyKCk6Yi5pbmZvPyhiPWMuaW5mbygpLGIud29ya2VyPWEsY29uc29sZS5sb2coYikpOmIucmVnaXN0ZXImJihhPWIuaWQsYi5vcHRpb25zLmNhY2hlPSExLGIub3B0aW9ucy5hc3luYz0hMSxiLm9wdGlvbnMud29ya2VyPSExLGM9KG5ldyBGdW5jdGlvbihiLnJlZ2lzdGVyLnN1YnN0cmluZyhiLnJlZ2lzdGVyLmluZGV4T2YoXCJ7XCIpKzEsYi5yZWdpc3Rlci5sYXN0SW5kZXhPZihcIn1cIikpKSkoKSxcbmM9bmV3IGMoYi5vcHRpb25zKSl9fWZ1bmN0aW9uIHRhKGEsYyxiLGQpe2E9SyhcImZsZXhzZWFyY2hcIixcImlkXCIrYSxzYSxmdW5jdGlvbihmKXsoZj1mLmRhdGEpJiZmLnJlc3VsdCYmZChmLmlkLGYuY29udGVudCxmLnJlc3VsdCxmLmxpbWl0LGYud2hlcmUsZi5jdXJzb3IsZi5zdWdnZXN0KX0sYyk7Y29uc3QgZT1tYS50b1N0cmluZygpO2IuaWQ9YzthLnBvc3RNZXNzYWdlKHtyZWdpc3RlcjplLG9wdGlvbnM6YixpZDpjfSk7cmV0dXJuIGF9Y29uc3QgSD17ZW5jb2RlOlwiaWNhc2VcIixmOlwiZm9yd2FyZFwiLHNwbGl0Oi9cXFcrLyxjYWNoZTohMSxhc3luYzohMSxnOiExLEQ6ITEsYTohMSxiOjksdGhyZXNob2xkOjAsZGVwdGg6MH0samE9e21lbW9yeTp7ZW5jb2RlOlwiZXh0cmFcIixmOlwic3RyaWN0XCIsdGhyZXNob2xkOjAsYjoxfSxzcGVlZDp7ZW5jb2RlOlwiaWNhc2VcIixmOlwic3RyaWN0XCIsdGhyZXNob2xkOjEsYjozLGRlcHRoOjJ9LG1hdGNoOntlbmNvZGU6XCJleHRyYVwiLGY6XCJmdWxsXCIsdGhyZXNob2xkOjEsXG5iOjN9LHNjb3JlOntlbmNvZGU6XCJleHRyYVwiLGY6XCJzdHJpY3RcIix0aHJlc2hvbGQ6MSxiOjksZGVwdGg6NH0sYmFsYW5jZTp7ZW5jb2RlOlwiYmFsYW5jZVwiLGY6XCJzdHJpY3RcIix0aHJlc2hvbGQ6MCxiOjMsZGVwdGg6M30sZmFzdDp7ZW5jb2RlOlwiaWNhc2VcIixmOlwic3RyaWN0XCIsdGhyZXNob2xkOjgsYjo5LGRlcHRoOjF9fSxhYT1bXTtsZXQgbmE9MDtjb25zdCBrYT17fSxsYT17fTt3LmNyZWF0ZT1mdW5jdGlvbihhLGMpe3JldHVybiBuZXcgdyhhLGMpfTt3LnJlZ2lzdGVyTWF0Y2hlcj1mdW5jdGlvbihhKXtmb3IoY29uc3QgYyBpbiBhKWEuaGFzT3duUHJvcGVydHkoYykmJmFhLnB1c2gocihjKSxhW2NdKTtyZXR1cm4gdGhpc307dy5yZWdpc3RlckVuY29kZXI9ZnVuY3Rpb24oYSxjKXtVW2FdPWMuYmluZChVKTtyZXR1cm4gdGhpc307dy5yZWdpc3Rlckxhbmd1YWdlPWZ1bmN0aW9uKGEsYyl7a2FbYV09Yy5maWx0ZXI7bGFbYV09Yy5zdGVtbWVyO3JldHVybiB0aGlzfTt3LmVuY29kZT1cbmZ1bmN0aW9uKGEsYyl7cmV0dXJuIFVbYV0oYyl9O3cucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oYSxjKXt0aGlzLnY9W107aWYoYyl7dmFyIGI9Yy5wcmVzZXQ7YT1jfWVsc2UgYXx8KGE9SCksYj1hLnByZXNldDtjPXt9O0ooYSk/KGM9amFbYV0sYT17fSk6YiYmKGM9amFbYl0pO2lmKGI9YS53b3JrZXIpaWYoXCJ1bmRlZmluZWRcIj09PXR5cGVvZiBXb3JrZXIpYS53b3JrZXI9ITEsdGhpcy5tPW51bGw7ZWxzZXt2YXIgZD1wYXJzZUludChiLDEwKXx8NDt0aGlzLkM9LTE7dGhpcy51PTA7dGhpcy5vPVtdO3RoaXMuRj1udWxsO3RoaXMubT1BcnJheShkKTtmb3IodmFyIGU9MDtlPGQ7ZSsrKXRoaXMubVtlXT10YSh0aGlzLmlkLGUsYSxMLmJpbmQodGhpcykpfXRoaXMuZj1hLnRva2VuaXplfHxjLmZ8fHRoaXMuZnx8SC5mO3RoaXMuc3BsaXQ9QyhiPWEuc3BsaXQpP3RoaXMuc3BsaXR8fEguc3BsaXQ6SihiKT9yKGIpOmI7dGhpcy5EPWEucnRsfHx0aGlzLkR8fEguRDt0aGlzLmFzeW5jPVxuXCJ1bmRlZmluZWRcIj09PXR5cGVvZiBQcm9taXNlfHxDKGI9YS5hc3luYyk/dGhpcy5hc3luY3x8SC5hc3luYzpiO3RoaXMuZz1DKGI9YS53b3JrZXIpP3RoaXMuZ3x8SC5nOmI7dGhpcy50aHJlc2hvbGQ9QyhiPWEudGhyZXNob2xkKT9jLnRocmVzaG9sZHx8dGhpcy50aHJlc2hvbGR8fEgudGhyZXNob2xkOmI7dGhpcy5iPUMoYj1hLnJlc29sdXRpb24pP2I9Yy5ifHx0aGlzLmJ8fEguYjpiO2I8PXRoaXMudGhyZXNob2xkJiYodGhpcy5iPXRoaXMudGhyZXNob2xkKzEpO3RoaXMuZGVwdGg9XCJzdHJpY3RcIiE9PXRoaXMuZnx8QyhiPWEuZGVwdGgpP2MuZGVwdGh8fHRoaXMuZGVwdGh8fEguZGVwdGg6Yjt0aGlzLnc9KGI9QyhiPWEuZW5jb2RlKT9jLmVuY29kZXx8SC5lbmNvZGU6YikmJlVbYl0mJlVbYl0uYmluZChVKXx8KE8oYik/Yjp0aGlzLnd8fCExKTsoYj1hLm1hdGNoZXIpJiZ0aGlzLmFkZE1hdGNoZXIoYik7aWYoYj0oYz1hLmxhbmcpfHxhLmZpbHRlcil7SihiKSYmKGI9a2FbYl0pO1xuaWYoRihiKSl7ZD10aGlzLnc7ZT1CKCk7Zm9yKHZhciBmPTA7ZjxiLmxlbmd0aDtmKyspe3ZhciBoPWQ/ZChiW2ZdKTpiW2ZdO2VbaF09MX1iPWV9dGhpcy5maWx0ZXI9Yn1pZihiPWN8fGEuc3RlbW1lcil7dmFyIGc7Yz1KKGIpP2xhW2JdOmI7ZD10aGlzLnc7ZT1bXTtmb3IoZyBpbiBjKWMuaGFzT3duUHJvcGVydHkoZykmJihmPWQ/ZChnKTpnLGUucHVzaChyKGYrXCIoJHxcXFxcVylcIiksZD9kKGNbZ10pOmNbZ10pKTt0aGlzLnN0ZW1tZXI9Zz1lfXRoaXMuYT1lPShiPWEuZG9jKT9TKGIpOnRoaXMuYXx8SC5hO3RoaXMuaT1pYSh0aGlzLmItKHRoaXMudGhyZXNob2xkfHwwKSk7dGhpcy5oPUIoKTt0aGlzLmM9QigpO2lmKGUpe3RoaXMubD1CKCk7YS5kb2M9bnVsbDtnPWUuaW5kZXg9e307Yz1lLmtleXM9W107ZD1lLmZpZWxkO2Y9ZS50YWc7aD1lLnN0b3JlO0YoZS5pZCl8fChlLmlkPWUuaWQuc3BsaXQoXCI6XCIpKTtpZihoKXt2YXIgaz1CKCk7aWYoSihoKSlrW2hdPTE7ZWxzZSBpZihGKGgpKWZvcihsZXQgbD1cbjA7bDxoLmxlbmd0aDtsKyspa1toW2xdXT0xO2Vsc2UgRyhoKSYmKGs9aCk7ZS5zdG9yZT1rfWlmKGYpe3RoaXMuRz1CKCk7aD1CKCk7aWYoZClpZihKKGQpKWhbZF09YTtlbHNlIGlmKEYoZCkpZm9yKGs9MDtrPGQubGVuZ3RoO2srKyloW2Rba11dPWE7ZWxzZSBHKGQpJiYoaD1kKTtGKGYpfHwoZS50YWc9Zj1bZl0pO2ZvcihkPTA7ZDxmLmxlbmd0aDtkKyspdGhpcy5HW2ZbZF1dPUIoKTt0aGlzLkk9ZjtkPWh9aWYoZCl7bGV0IGw7RihkKXx8KEcoZCk/KGw9ZCxlLmZpZWxkPWQ9T2JqZWN0LmtleXMoZCkpOmUuZmllbGQ9ZD1bZF0pO2ZvcihlPTA7ZTxkLmxlbmd0aDtlKyspZj1kW2VdLEYoZil8fChsJiYoYT1sW2ZdKSxjW2VdPWYsZFtlXT1mLnNwbGl0KFwiOlwiKSksZ1tmXT1uZXcgdyhhKX1hLmRvYz1ifXRoaXMuQj0hMDt0aGlzLmo9KHRoaXMuY2FjaGU9Yj1DKGI9YS5jYWNoZSk/dGhpcy5jYWNoZXx8SC5jYWNoZTpiKT9uZXcgdWEoYik6ITE7cmV0dXJuIHRoaXN9O3cucHJvdG90eXBlLmVuY29kZT1cbmZ1bmN0aW9uKGEpe2EmJihhYS5sZW5ndGgmJihhPVEoYSxhYSkpLHRoaXMudi5sZW5ndGgmJihhPVEoYSx0aGlzLnYpKSx0aGlzLncmJihhPXRoaXMudyhhKSksdGhpcy5zdGVtbWVyJiYoYT1RKGEsdGhpcy5zdGVtbWVyKSkpO3JldHVybiBhfTt3LnByb3RvdHlwZS5hZGRNYXRjaGVyPWZ1bmN0aW9uKGEpe2NvbnN0IGM9dGhpcy52O2Zvcihjb25zdCBiIGluIGEpYS5oYXNPd25Qcm9wZXJ0eShiKSYmYy5wdXNoKHIoYiksYVtiXSk7cmV0dXJuIHRoaXN9O3cucHJvdG90eXBlLmFkZD1mdW5jdGlvbihhLGMsYixkLGUpe2lmKHRoaXMuYSYmRyhhKSlyZXR1cm4gdGhpcy5BKFwiYWRkXCIsYSxjKTtpZihjJiZKKGMpJiYoYXx8MD09PWEpKXt2YXIgZj1cIkBcIithO2lmKHRoaXMuY1tmXSYmIWQpcmV0dXJuIHRoaXMudXBkYXRlKGEsYyk7aWYodGhpcy5nKXJldHVybisrdGhpcy5DPj10aGlzLm0ubGVuZ3RoJiYodGhpcy5DPTApLHRoaXMubVt0aGlzLkNdLnBvc3RNZXNzYWdlKHthZGQ6ITAsaWQ6YSxcbmNvbnRlbnQ6Y30pLHRoaXMuY1tmXT1cIlwiK3RoaXMuQyxiJiZiKCksdGhpcztpZighZSl7aWYodGhpcy5hc3luYyYmXCJmdW5jdGlvblwiIT09dHlwZW9mIGltcG9ydFNjcmlwdHMpe2xldCB0PXRoaXM7Zj1uZXcgUHJvbWlzZShmdW5jdGlvbih2KXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5hZGQoYSxjLG51bGwsZCwhMCk7dD1udWxsO3YoKX0pfSk7aWYoYilmLnRoZW4oYik7ZWxzZSByZXR1cm4gZjtyZXR1cm4gdGhpc31pZihiKXJldHVybiB0aGlzLmFkZChhLGMsbnVsbCxkLCEwKSxiKCksdGhpc31jPXRoaXMuZW5jb2RlKGMpO2lmKCFjLmxlbmd0aClyZXR1cm4gdGhpcztiPXRoaXMuZjtlPU8oYik/YihjKTpjLnNwbGl0KHRoaXMuc3BsaXQpO3RoaXMuZmlsdGVyJiYoZT1XKGUsdGhpcy5maWx0ZXIpKTtjb25zdCBuPUIoKTtuLl9jdHg9QigpO2NvbnN0IG09ZS5sZW5ndGgsdT10aGlzLnRocmVzaG9sZCxxPXRoaXMuZGVwdGgsQT10aGlzLmIsej10aGlzLmkseT10aGlzLkQ7Zm9yKGxldCB0PVxuMDt0PG07dCsrKXt2YXIgaD1lW3RdO2lmKGgpe3ZhciBnPWgubGVuZ3RoLGs9KHk/dCsxOm0tdCkvbSxsPVwiXCI7c3dpdGNoKGIpe2Nhc2UgXCJyZXZlcnNlXCI6Y2FzZSBcImJvdGhcIjpmb3IodmFyIHA9ZzstLXA7KWw9aFtwXStsLFYoeixuLGwsYSx5PzE6KGctcCkvZyxrLHUsQS0xKTtsPVwiXCI7Y2FzZSBcImZvcndhcmRcIjpmb3IocD0wO3A8ZztwKyspbCs9aFtwXSxWKHosbixsLGEseT8ocCsxKS9nOjEsayx1LEEtMSk7YnJlYWs7Y2FzZSBcImZ1bGxcIjpmb3IocD0wO3A8ZztwKyspe2NvbnN0IHY9KHk/cCsxOmctcCkvZztmb3IobGV0IHg9Zzt4PnA7eC0tKWw9aC5zdWJzdHJpbmcocCx4KSxWKHosbixsLGEsdixrLHUsQS0xKX1icmVhaztkZWZhdWx0OmlmKGc9Vih6LG4saCxhLDEsayx1LEEtMSkscSYmMTxtJiZnPj11KWZvcihnPW4uX2N0eFtoXXx8KG4uX2N0eFtoXT1CKCkpLGg9dGhpcy5oW2hdfHwodGhpcy5oW2hdPWlhKEEtKHV8fDApKSksaz10LXEsbD10K3ErMSwwPmsmJihrPTApLGw+XG5tJiYobD1tKTtrPGw7aysrKWshPT10JiZWKGgsZyxlW2tdLGEsMCxBLShrPHQ/dC1rOmstdCksdSxBLTEpfX19dGhpcy5jW2ZdPTE7dGhpcy5CPSExfXJldHVybiB0aGlzfTt3LnByb3RvdHlwZS5BPWZ1bmN0aW9uKGEsYyxiKXtpZihGKGMpKXt2YXIgZD1jLmxlbmd0aDtpZihkLS0pe2Zvcih2YXIgZT0wO2U8ZDtlKyspdGhpcy5BKGEsY1tlXSk7cmV0dXJuIHRoaXMuQShhLGNbZF0sYil9fWVsc2V7dmFyIGY9dGhpcy5hLmluZGV4LGg9dGhpcy5hLmtleXMsZz10aGlzLmEudGFnO2U9dGhpcy5hLnN0b3JlO3ZhciBrO3ZhciBsPXRoaXMuYS5pZDtkPWM7Zm9yKHZhciBwPTA7cDxsLmxlbmd0aDtwKyspZD1kW2xbcF1dO2lmKFwicmVtb3ZlXCI9PT1hJiYoZGVsZXRlIHRoaXMubFtkXSxsPWgubGVuZ3RoLGwtLSkpe2ZvcihjPTA7YzxsO2MrKylmW2hbY11dLnJlbW92ZShkKTtyZXR1cm4gZltoW2xdXS5yZW1vdmUoZCxiKX1pZihnKXtmb3Ioaz0wO2s8Zy5sZW5ndGg7aysrKXt2YXIgbj1nW2tdO1xudmFyIG09YztsPW4uc3BsaXQoXCI6XCIpO2ZvcihwPTA7cDxsLmxlbmd0aDtwKyspbT1tW2xbcF1dO209XCJAXCIrbX1rPXRoaXMuR1tuXTtrPWtbbV18fChrW21dPVtdKX1sPXRoaXMuYS5maWVsZDtmb3IobGV0IHU9MCxxPWwubGVuZ3RoO3U8cTt1Kyspe249bFt1XTtnPWM7Zm9yKG09MDttPG4ubGVuZ3RoO20rKylnPWdbblttXV07bj1mW2hbdV1dO209XCJhZGRcIj09PWE/bi5hZGQ6bi51cGRhdGU7dT09PXEtMT9tLmNhbGwobixkLGcsYik6bS5jYWxsKG4sZCxnKX1pZihlKXtiPU9iamVjdC5rZXlzKGUpO2E9QigpO2ZvcihmPTA7ZjxiLmxlbmd0aDtmKyspaWYoaD1iW2ZdLGVbaF0pe2g9aC5zcGxpdChcIjpcIik7bGV0IHUscTtmb3IobD0wO2w8aC5sZW5ndGg7bCsrKWc9aFtsXSx1PSh1fHxjKVtnXSxxPShxfHxhKVtnXT11fWM9YX1rJiYoa1trLmxlbmd0aF09Yyk7dGhpcy5sW2RdPWN9cmV0dXJuIHRoaXN9O3cucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbihhLGMsYil7aWYodGhpcy5hJiZcbkcoYSkpcmV0dXJuIHRoaXMuQShcInVwZGF0ZVwiLGEsYyk7dGhpcy5jW1wiQFwiK2FdJiZKKGMpJiYodGhpcy5yZW1vdmUoYSksdGhpcy5hZGQoYSxjLGIsITApKTtyZXR1cm4gdGhpc307dy5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKGEsYyxiKXtpZih0aGlzLmEmJkcoYSkpcmV0dXJuIHRoaXMuQShcInJlbW92ZVwiLGEsYyk7dmFyIGQ9XCJAXCIrYTtpZih0aGlzLmNbZF0pe2lmKHRoaXMuZylyZXR1cm4gdGhpcy5tW3RoaXMuY1tkXV0ucG9zdE1lc3NhZ2Uoe3JlbW92ZTohMCxpZDphfSksZGVsZXRlIHRoaXMuY1tkXSxjJiZjKCksdGhpcztpZighYil7aWYodGhpcy5hc3luYyYmXCJmdW5jdGlvblwiIT09dHlwZW9mIGltcG9ydFNjcmlwdHMpe2xldCBlPXRoaXM7ZD1uZXcgUHJvbWlzZShmdW5jdGlvbihmKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5yZW1vdmUoYSxudWxsLCEwKTtlPW51bGw7ZigpfSl9KTtpZihjKWQudGhlbihjKTtlbHNlIHJldHVybiBkO3JldHVybiB0aGlzfWlmKGMpcmV0dXJuIHRoaXMucmVtb3ZlKGEsXG5udWxsLCEwKSxjKCksdGhpc31mb3IoYz0wO2M8dGhpcy5iLSh0aGlzLnRocmVzaG9sZHx8MCk7YysrKWJhKHRoaXMuaVtjXSxhKTt0aGlzLmRlcHRoJiZiYSh0aGlzLmgsYSk7ZGVsZXRlIHRoaXMuY1tkXTt0aGlzLkI9ITF9cmV0dXJuIHRoaXN9O2xldCBNO3cucHJvdG90eXBlLnNlYXJjaD1mdW5jdGlvbihhLGMsYixkKXtpZihHKGMpKXtpZihGKGMpKWZvcih2YXIgZT0wO2U8Yy5sZW5ndGg7ZSsrKWNbZV0ucXVlcnk9YTtlbHNlIGMucXVlcnk9YTthPWM7Yz0xRTN9ZWxzZSBjJiZPKGMpPyhiPWMsYz0xRTMpOmN8fDA9PT1jfHwoYz0xRTMpO2lmKHRoaXMuZyl7dGhpcy5GPWI7dGhpcy51PTA7dGhpcy5vPVtdO2Zvcih2YXIgZj0wO2Y8dGhpcy5nO2YrKyl0aGlzLm1bZl0ucG9zdE1lc3NhZ2Uoe3NlYXJjaDohMCxsaW1pdDpjLGNvbnRlbnQ6YX0pfWVsc2V7dmFyIGg9W10sZz1hO2lmKEcoYSkmJiFGKGEpKXtifHwoYj1hLmNhbGxiYWNrKSYmKGcuY2FsbGJhY2s9bnVsbCk7dmFyIGs9XG5hLnNvcnQ7dmFyIGw9YS5wYWdlO2M9YS5saW1pdDtmPWEudGhyZXNob2xkO3ZhciBwPWEuc3VnZ2VzdDthPWEucXVlcnl9aWYodGhpcy5hKXtmPXRoaXMuYS5pbmRleDtjb25zdCB5PWcud2hlcmU7dmFyIG49Zy5ib29sfHxcIm9yXCIsbT1nLmZpZWxkO2xldCB0PW47bGV0IHYseDtpZihtKUYobSl8fChtPVttXSk7ZWxzZSBpZihGKGcpKXt2YXIgdT1nO209W107dD1bXTtmb3IodmFyIHE9MDtxPGcubGVuZ3RoO3ErKylkPWdbcV0sZT1kLmJvb2x8fG4sbVtxXT1kLmZpZWxkLHRbcV09ZSxcIm5vdFwiPT09ZT92PSEwOlwiYW5kXCI9PT1lJiYoeD0hMCl9ZWxzZSBtPXRoaXMuYS5rZXlzO249bS5sZW5ndGg7Zm9yKHE9MDtxPG47cSsrKXUmJihnPXVbcV0pLGwmJiFKKGcpJiYoZy5wYWdlPW51bGwsZy5saW1pdD0wKSxoW3FdPWZbbVtxXV0uc2VhcmNoKGcsMCk7aWYoYilyZXR1cm4gYihQLmNhbGwodGhpcyxhLHQsaCxrLGMscCx5LGwseCx2KSk7aWYodGhpcy5hc3luYyl7Y29uc3QgST10aGlzO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihEKXtQcm9taXNlLmFsbChoKS50aGVuKGZ1bmN0aW9uKEUpe0QoUC5jYWxsKEksXG5hLHQsRSxrLGMscCx5LGwseCx2KSl9KX0pfXJldHVybiBQLmNhbGwodGhpcyxhLHQsaCxrLGMscCx5LGwseCx2KX1mfHwoZj10aGlzLnRocmVzaG9sZHx8MCk7aWYoIWQpe2lmKHRoaXMuYXN5bmMmJlwiZnVuY3Rpb25cIiE9PXR5cGVvZiBpbXBvcnRTY3JpcHRzKXtsZXQgeT10aGlzO2Y9bmV3IFByb21pc2UoZnVuY3Rpb24odCl7c2V0VGltZW91dChmdW5jdGlvbigpe3QoeS5zZWFyY2goZyxjLG51bGwsITApKTt5PW51bGx9KX0pO2lmKGIpZi50aGVuKGIpO2Vsc2UgcmV0dXJuIGY7cmV0dXJuIHRoaXN9aWYoYilyZXR1cm4gYih0aGlzLnNlYXJjaChnLGMsbnVsbCwhMCkpLHRoaXN9aWYoIWF8fCFKKGEpKXJldHVybiBoO2c9YTtpZih0aGlzLmNhY2hlKWlmKHRoaXMuQil7aWYoYj10aGlzLmouZ2V0KGEpKXJldHVybiBifWVsc2UgdGhpcy5qLmNsZWFyKCksdGhpcy5CPSEwO2c9dGhpcy5lbmNvZGUoZyk7aWYoIWcubGVuZ3RoKXJldHVybiBoO2I9dGhpcy5mO2I9TyhiKT9iKGcpOmcuc3BsaXQodGhpcy5zcGxpdCk7XG50aGlzLmZpbHRlciYmKGI9VyhiLHRoaXMuZmlsdGVyKSk7dT1iLmxlbmd0aDtkPSEwO2U9W107dmFyIEE9QigpLHo9MDsxPHUmJih0aGlzLmRlcHRoJiZcInN0cmljdFwiPT09dGhpcy5mP249ITA6Yi5zb3J0KHFhKSk7aWYoIW58fChxPXRoaXMuaCkpe2NvbnN0IHk9dGhpcy5iO2Zvcig7ejx1O3orKyl7bGV0IHQ9Ylt6XTtpZih0KXtpZihuKXtpZighbSlpZihxW3RdKW09dCxBW3RdPTE7ZWxzZSBpZighcClyZXR1cm4gaDtpZihwJiZ6PT09dS0xJiYhZS5sZW5ndGgpbj0hMSx0PW18fHQsQVt0XT0wO2Vsc2UgaWYoIW0pY29udGludWV9aWYoIUFbdF0pe2NvbnN0IHY9W107bGV0IHg9ITEsST0wO2NvbnN0IEQ9bj9xW21dOnRoaXMuaTtpZihEKXtsZXQgRTtmb3IobGV0IE49MDtOPHktZjtOKyspaWYoRT1EW05dJiZEW05dW3RdKXZbSSsrXT1FLHg9ITB9aWYoeCltPXQsZVtlLmxlbmd0aF09MTxJP3YuY29uY2F0LmFwcGx5KFtdLHYpOnZbMF07ZWxzZSBpZighcCl7ZD0hMTticmVha31BW3RdPVxuMX19fX1lbHNlIGQ9ITE7ZCYmKGg9aGEoZSxjLGwscCkpO3RoaXMuY2FjaGUmJnRoaXMuai5zZXQoYSxoKTtyZXR1cm4gaH19O3cucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24oYSxjKXtyZXR1cm4gdGhpcy53aGVyZShhLGMsMSlbMF18fG51bGx9O3cucHJvdG90eXBlLndoZXJlPWZ1bmN0aW9uKGEsYyxiLGQpe2NvbnN0IGU9dGhpcy5sLGY9W107bGV0IGg9MDtsZXQgZzt2YXIgaztsZXQgbDtpZihHKGEpKXtifHwoYj1jKTt2YXIgcD1PYmplY3Qua2V5cyhhKTt2YXIgbj1wLmxlbmd0aDtnPSExO2lmKDE9PT1uJiZcImlkXCI9PT1wWzBdKXJldHVybltlW2EuaWRdXTtpZigoaz10aGlzLkkpJiYhZClmb3IodmFyIG09MDttPGsubGVuZ3RoO20rKyl7dmFyIHU9a1ttXSxxPWFbdV07aWYoIUMocSkpe2w9dGhpcy5HW3VdW1wiQFwiK3FdO2lmKDA9PT0tLW4pcmV0dXJuIGw7cC5zcGxpY2UocC5pbmRleE9mKHUpLDEpO2RlbGV0ZSBhW3VdO2JyZWFrfX1rPUFycmF5KG4pO2ZvcihtPTA7bTxuO20rKylrW21dPVxucFttXS5zcGxpdChcIjpcIil9ZWxzZXtpZihPKGEpKXtjPWR8fE9iamVjdC5rZXlzKGUpO2I9Yy5sZW5ndGg7Zm9yKHA9MDtwPGI7cCsrKW49ZVtjW3BdXSxhKG4pJiYoZltoKytdPW4pO3JldHVybiBmfWlmKEMoYykpcmV0dXJuW2VbYV1dO2lmKFwiaWRcIj09PWEpcmV0dXJuW2VbY11dO3A9W2FdO249MTtrPVthLnNwbGl0KFwiOlwiKV07Zz0hMH1kPWx8fGR8fE9iamVjdC5rZXlzKGUpO209ZC5sZW5ndGg7Zm9yKHU9MDt1PG07dSsrKXtxPWw/ZFt1XTplW2RbdV1dO2xldCBBPSEwO2ZvcihsZXQgej0wO3o8bjt6Kyspe2d8fChjPWFbcFt6XV0pO2NvbnN0IHk9a1t6XSx0PXkubGVuZ3RoO2xldCB2PXE7aWYoMTx0KWZvcihsZXQgeD0wO3g8dDt4Kyspdj12W3lbeF1dO2Vsc2Ugdj12W3lbMF1dO2lmKHYhPT1jKXtBPSExO2JyZWFrfX1pZihBJiYoZltoKytdPXEsYiYmaD09PWIpKWJyZWFrfXJldHVybiBmfTt3LnByb3RvdHlwZS5pbmZvPWZ1bmN0aW9uKCl7aWYodGhpcy5nKWZvcihsZXQgYT0wO2E8XG50aGlzLmc7YSsrKXRoaXMubVthXS5wb3N0TWVzc2FnZSh7aW5mbzohMCxpZDp0aGlzLmlkfSk7ZWxzZSByZXR1cm57aWQ6dGhpcy5pZCxpdGVtczp0aGlzLmxlbmd0aCxjYWNoZTp0aGlzLmNhY2hlJiZ0aGlzLmNhY2hlLnM/dGhpcy5jYWNoZS5zLmxlbmd0aDohMSxtYXRjaGVyOmFhLmxlbmd0aCsodGhpcy52P3RoaXMudi5sZW5ndGg6MCksd29ya2VyOnRoaXMuZyx0aHJlc2hvbGQ6dGhpcy50aHJlc2hvbGQsZGVwdGg6dGhpcy5kZXB0aCxyZXNvbHV0aW9uOnRoaXMuYixjb250ZXh0dWFsOnRoaXMuZGVwdGgmJlwic3RyaWN0XCI9PT10aGlzLmZ9fTt3LnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRlc3Ryb3koKS5pbml0KCl9O3cucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmNhY2hlJiYodGhpcy5qLmNsZWFyKCksdGhpcy5qPW51bGwpO3RoaXMuaT10aGlzLmg9dGhpcy5jPW51bGw7aWYodGhpcy5hKXtjb25zdCBhPXRoaXMuYS5rZXlzO2ZvcihsZXQgYz1cbjA7YzxhLmxlbmd0aDtjKyspdGhpcy5hLmluZGV4W2FbY11dLmRlc3Ryb3koKTt0aGlzLmE9dGhpcy5sPW51bGx9cmV0dXJuIHRoaXN9O3cucHJvdG90eXBlLmV4cG9ydD1mdW5jdGlvbihhKXtjb25zdCBjPSFhfHxDKGEuc2VyaWFsaXplKXx8YS5zZXJpYWxpemU7aWYodGhpcy5hKXtjb25zdCBkPSFhfHxDKGEuZG9jKXx8YS5kb2M7dmFyIGI9IWF8fEMoYS5pbmRleCl8fGEuaW5kZXg7YT1bXTtsZXQgZT0wO2lmKGIpZm9yKGI9dGhpcy5hLmtleXM7ZTxiLmxlbmd0aDtlKyspe2NvbnN0IGY9dGhpcy5hLmluZGV4W2JbZV1dO2FbZV09W2YuaSxmLmgsT2JqZWN0LmtleXMoZi5jKV19ZCYmKGFbZV09dGhpcy5sKX1lbHNlIGE9W3RoaXMuaSx0aGlzLmgsT2JqZWN0LmtleXModGhpcy5jKV07YyYmKGE9SlNPTi5zdHJpbmdpZnkoYSkpO3JldHVybiBhfTt3LnByb3RvdHlwZS5pbXBvcnQ9ZnVuY3Rpb24oYSxjKXtpZighY3x8QyhjLnNlcmlhbGl6ZSl8fGMuc2VyaWFsaXplKWE9SlNPTi5wYXJzZShhKTtcbmNvbnN0IGI9QigpO2lmKHRoaXMuYSl7dmFyIGQ9IWN8fEMoYy5kb2MpfHxjLmRvYyxlPTA7aWYoIWN8fEMoYy5pbmRleCl8fGMuaW5kZXgpe2M9dGhpcy5hLmtleXM7Y29uc3QgaD1jLmxlbmd0aDtmb3IodmFyIGY9YVswXVsyXTtlPGYubGVuZ3RoO2UrKyliW2ZbZV1dPTE7Zm9yKGU9MDtlPGg7ZSsrKXtmPXRoaXMuYS5pbmRleFtjW2VdXTtjb25zdCBnPWFbZV07ZyYmKGYuaT1nWzBdLGYuaD1nWzFdLGYuYz1iKX19ZCYmKHRoaXMubD1HKGQpP2Q6YVtlXSl9ZWxzZXtkPWFbMl07Zm9yKGU9MDtlPGQubGVuZ3RoO2UrKyliW2RbZV1dPTE7dGhpcy5pPWFbMF07dGhpcy5oPWFbMV07dGhpcy5jPWJ9fTtjb25zdCB2YT1mdW5jdGlvbigpe2NvbnN0IGE9cihcIlxcXFxzK1wiKSxjPXIoXCJbXmEtejAtOSBdXCIpLGI9W3IoXCJbLS9dXCIpLFwiIFwiLGMsXCJcIixhLFwiIFwiXTtyZXR1cm4gZnVuY3Rpb24oZCl7cmV0dXJuIGNhKFEoZC50b0xvd2VyQ2FzZSgpLGIpKX19KCksVT17aWNhc2U6ZnVuY3Rpb24oYSl7cmV0dXJuIGEudG9Mb3dlckNhc2UoKX0sXG5zaW1wbGU6ZnVuY3Rpb24oKXtjb25zdCBhPXIoXCJcXFxccytcIiksYz1yKFwiW15hLXowLTkgXVwiKSxiPXIoXCJbLS9dXCIpLGQ9cihcIltcXHUwMGUwXFx1MDBlMVxcdTAwZTJcXHUwMGUzXFx1MDBlNFxcdTAwZTVdXCIpLGU9cihcIltcXHUwMGU4XFx1MDBlOVxcdTAwZWFcXHUwMGViXVwiKSxmPXIoXCJbXFx1MDBlY1xcdTAwZWRcXHUwMGVlXFx1MDBlZl1cIiksaD1yKFwiW1xcdTAwZjJcXHUwMGYzXFx1MDBmNFxcdTAwZjVcXHUwMGY2XFx1MDE1MV1cIiksZz1yKFwiW1xcdTAwZjlcXHUwMGZhXFx1MDBmYlxcdTAwZmNcXHUwMTcxXVwiKSxrPXIoXCJbXFx1MDBmZFxcdTAxNzdcXHUwMGZmXVwiKSxsPXIoXCJcXHUwMGYxXCIpLHA9cihcIltcXHUwMGU3Y11cIiksbj1yKFwiXFx1MDBkZlwiKSxtPXIoXCIgJiBcIiksdT1bZCxcImFcIixlLFwiZVwiLGYsXCJpXCIsaCxcIm9cIixnLFwidVwiLGssXCJ5XCIsbCxcIm5cIixwLFwia1wiLG4sXCJzXCIsbSxcIiBhbmQgXCIsYixcIiBcIixjLFwiXCIsYSxcIiBcIl07cmV0dXJuIGZ1bmN0aW9uKHEpe3E9UShxLnRvTG93ZXJDYXNlKCksdSk7cmV0dXJuXCIgXCI9PT1xP1wiXCI6cX19KCksYWR2YW5jZWQ6ZnVuY3Rpb24oKXtjb25zdCBhPVxucihcImFlXCIpLGM9cihcImFpXCIpLGI9cihcImF5XCIpLGQ9cihcImV5XCIpLGU9cihcIm9lXCIpLGY9cihcInVlXCIpLGg9cihcImllXCIpLGc9cihcInN6XCIpLGs9cihcInpzXCIpLGw9cihcImNrXCIpLHA9cihcImNjXCIpLG49cihcInNoXCIpLG09cihcInRoXCIpLHU9cihcImR0XCIpLHE9cihcInBoXCIpLEE9cihcInBmXCIpLHo9cihcIm91XCIpLHk9cihcInVvXCIpLHQ9W2EsXCJhXCIsYyxcImVpXCIsYixcImVpXCIsZCxcImVpXCIsZSxcIm9cIixmLFwidVwiLGgsXCJpXCIsZyxcInNcIixrLFwic1wiLG4sXCJzXCIsbCxcImtcIixwLFwia1wiLG0sXCJ0XCIsdSxcInRcIixxLFwiZlwiLEEsXCJmXCIseixcIm9cIix5LFwidVwiXTtyZXR1cm4gZnVuY3Rpb24odix4KXtpZighdilyZXR1cm4gdjt2PXRoaXMuc2ltcGxlKHYpOzI8di5sZW5ndGgmJih2PVEodix0KSk7eHx8MTx2Lmxlbmd0aCYmKHY9Y2EodikpO3JldHVybiB2fX0oKSxleHRyYTpmdW5jdGlvbigpe2NvbnN0IGE9cihcInBcIiksYz1yKFwielwiKSxiPXIoXCJbY2dxXVwiKSxkPXIoXCJuXCIpLGU9cihcImRcIiksZj1yKFwiW3Z3XVwiKSxoPXIoXCJbYWVpb3V5XVwiKSxcbmc9W2EsXCJiXCIsYyxcInNcIixiLFwia1wiLGQsXCJtXCIsZSxcInRcIixmLFwiZlwiLGgsXCJcIl07cmV0dXJuIGZ1bmN0aW9uKGspe2lmKCFrKXJldHVybiBrO2s9dGhpcy5hZHZhbmNlZChrLCEwKTtpZigxPGsubGVuZ3RoKXtrPWsuc3BsaXQoXCIgXCIpO2ZvcihsZXQgbD0wO2w8ay5sZW5ndGg7bCsrKXtjb25zdCBwPWtbbF07MTxwLmxlbmd0aCYmKGtbbF09cFswXStRKHAuc3Vic3RyaW5nKDEpLGcpKX1rPWsuam9pbihcIiBcIik7az1jYShrKX1yZXR1cm4ga319KCksYmFsYW5jZTp2YX0sdWE9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGMpe3RoaXMuY2xlYXIoKTt0aGlzLkg9ITAhPT1jJiZjfWEucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy5jYWNoZT1CKCk7dGhpcy5jb3VudD1CKCk7dGhpcy5pbmRleD1CKCk7dGhpcy5zPVtdfTthLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24oYyxiKXtpZih0aGlzLkgmJkModGhpcy5jYWNoZVtjXSkpe2xldCBkPXRoaXMucy5sZW5ndGg7aWYoZD09PXRoaXMuSCl7ZC0tO1xuY29uc3QgZT10aGlzLnNbZF07ZGVsZXRlIHRoaXMuY2FjaGVbZV07ZGVsZXRlIHRoaXMuY291bnRbZV07ZGVsZXRlIHRoaXMuaW5kZXhbZV19dGhpcy5pbmRleFtjXT1kO3RoaXMuc1tkXT1jO3RoaXMuY291bnRbY109LTE7dGhpcy5jYWNoZVtjXT1iO3RoaXMuZ2V0KGMpfWVsc2UgdGhpcy5jYWNoZVtjXT1ifTthLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oYyl7Y29uc3QgYj10aGlzLmNhY2hlW2NdO2lmKHRoaXMuSCYmYil7dmFyIGQ9Kyt0aGlzLmNvdW50W2NdO2NvbnN0IGY9dGhpcy5pbmRleDtsZXQgaD1mW2NdO2lmKDA8aCl7Y29uc3QgZz10aGlzLnM7Zm9yKHZhciBlPWg7dGhpcy5jb3VudFtnWy0taF1dPD1kJiYtMSE9PWg7KTtoKys7aWYoaCE9PWUpe2ZvcihkPWU7ZD5oO2QtLSllPWdbZC0xXSxnW2RdPWUsZltlXT1kO2dbaF09YztmW2NdPWh9fX1yZXR1cm4gYn07cmV0dXJuIGF9KCk7cmV0dXJuIHd9KGZ1bmN0aW9uKCl7Y29uc3QgSz17fSxSPVwidW5kZWZpbmVkXCIhPT10eXBlb2YgQmxvYiYmXG5cInVuZGVmaW5lZFwiIT09dHlwZW9mIFVSTCYmVVJMLmNyZWF0ZU9iamVjdFVSTDtyZXR1cm4gZnVuY3Rpb24odyxMLFMsVyxQKXtTPVI/VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbXCIoXCIrUy50b1N0cmluZygpK1wiKSgpXCJdLHt0eXBlOlwidGV4dC9qYXZhc2NyaXB0XCJ9KSk6dytcIi5taW4uanNcIjt3Kz1cIi1cIitMO0tbd118fChLW3ddPVtdKTtLW3ddW1BdPW5ldyBXb3JrZXIoUyk7S1t3XVtQXS5vbm1lc3NhZ2U9VztyZXR1cm4gS1t3XVtQXX19KCkpLHRoaXMpO1xuIiwiLyogZ2xvYmFsIGZldGNoICovXG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nbWZtaS9zZWFyY2hpbkdob3N0XG5cbmltcG9ydCBGbGV4U2VhcmNoIGZyb20gJ2ZsZXhzZWFyY2gnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaGluR2hvc3Qge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgYW5kIGVudHJ5IHBvaW50IG9mIHRoZSBsaWJyYXJ5XG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yIChhcmdzKSB7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICBrZXk6ICcnLFxuICAgICAgdmVyc2lvbjogJ3Y0JyxcbiAgICAgIGxvYWRPbjogJ2ZvY3VzJyxcbiAgICAgIHNlYXJjaE9uOiAna2V5dXAnLFxuICAgICAgbGltaXQ6IDEwLFxuICAgICAgaW5wdXRJZDogWydzZWFyY2gtZmllbGQnXSxcbiAgICAgIG91dHB1dElkOiBbJ3NlYXJjaC1yZXN1bHRzJ10sXG4gICAgICBvdXRwdXRDaGlsZHNUeXBlOiAnbGknLFxuICAgICAgLy9cbiAgICAgIHBvc3RzRmllbGRzOiBbJ3RpdGxlJywgJ3VybCcsICdwdWJsaXNoZWRfYXQnXSxcbiAgICAgIHBvc3RzRXh0cmFGaWVsZHM6IFtdLFxuICAgICAgcG9zdHNGb3JtYXRzOiBbXSxcbiAgICAgIGluZGV4ZWRGaWVsZHM6IFsndGl0bGUnXSxcbiAgICAgIHRlbXBsYXRlOiBwb3N0ID0+IGA8YSBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyIG5vV3JhcFdpdGhFbGxpcHNpcyBweC00IHB5LTJcIiBocmVmPVwiJHtwb3N0LnVybH1cIj48c3ZnIGNsYXNzPVwiaWNvbiBmbGV4LW5vbmUgbXItMlwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXNlYXJjaFwiPjwvdXNlPjwvc3ZnPiA8c3Bhbj4ke3Bvc3QubmFtZSA9PT0gdW5kZWZpbmVkID8gcG9zdC50aXRsZSA6IHBvc3QubmFtZX08L3NwYW4+PC9hPmAsXG4gICAgICAvLyB0ZW1wbGF0ZTogZnVuY3Rpb24gKHBvc3QpIHt9LFxuICAgICAgLy9cbiAgICAgIC8vIHBvc3RzRmllbGRzOiBbJ3RpdGxlJywgJ3VybCcsICdleGNlcnB0JywgJ2N1c3RvbV9leGNlcnB0JywgJ3B1Ymxpc2hlZF9hdCcsICdmZWF0dXJlX2ltYWdlJ10sXG4gICAgICAvLyBwb3N0c0V4dHJhRmllbGRzOiBbJ3RhZ3MnXSxcbiAgICAgIC8vIHBvc3RzRm9ybWF0czogWydwbGFpbnRleHQnXSxcbiAgICAgIC8vIGluZGV4ZWRGaWVsZHM6IFsndGl0bGUnLCAnc3RyaW5nX3RhZ3MnLCAnZXhjZXJwdCcsICdwbGFpbnRleHQnXSxcbiAgICAgIC8vIHRlbXBsYXRlOiBmdW5jdGlvbiAocG9zdCkge1xuICAgICAgLy8gICBsZXQgbyA9IGA8YSBocmVmPScke3Bvc3QudXJsfSc+YFxuICAgICAgLy8gICBpZiAocG9zdC5mZWF0dXJlX2ltYWdlKSBvICs9IGA8aW1nIHNyYz0nJHtwb3N0LmZlYXR1cmVfaW1hZ2V9Jz5gXG4gICAgICAvLyAgIG8gKz0gJzxzZWN0aW9uPidcbiAgICAgIC8vICAgbyArPSBgPGgyPiR7cG9zdC50aXRsZX08L2gyPmBcbiAgICAgIC8vICAgbyArPSBgPC9zZWN0aW9uPjwvYT5gXG4gICAgICAvLyAgIHJldHVybiBvXG4gICAgICAvLyB9LFxuICAgICAgZW1wdHlUZW1wbGF0ZTogZnVuY3Rpb24gKCkge30sXG4gICAgICBjdXN0b21Qcm9jZXNzaW5nOiBmdW5jdGlvbiAocG9zdCkge1xuICAgICAgICBpZiAocG9zdC50YWdzKSBwb3N0LnN0cmluZ190YWdzID0gcG9zdC50YWdzLm1hcChvID0+IG8ubmFtZSkuam9pbignICcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgcmV0dXJuIHBvc3RcbiAgICAgIH0sXG4gICAgICBkYXRlOiB7XG4gICAgICAgIGxvY2FsZTogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgfHwgJ2VuLVVTJyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgICAgICBkYXk6ICdudW1lcmljJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FjaGVNYXhBZ2U6IDE4MDAsXG4gICAgICBvbkZldGNoU3RhcnQ6ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaXMtbG9hZGluZycpLFxuICAgICAgb25GZXRjaEVuZDogKCkgPT4gc2V0VGltZW91dCgoKSA9PiB7IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaXMtbG9hZGluZycpIH0sIDQwMDApLFxuICAgICAgb25JbmRleEJ1aWxkU3RhcnQ6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgb25JbmRleEJ1aWxkRW5kOiBmdW5jdGlvbiAoaW5kZXgpIHt9LFxuICAgICAgb25TZWFyY2hTdGFydDogZnVuY3Rpb24gKCkge30sXG4gICAgICBvblNlYXJjaEVuZDogZnVuY3Rpb24gKHBvc3RzKSB7fSxcbiAgICAgIGluZGV4T3B0aW9uczoge30sXG4gICAgICBzZWFyY2hPcHRpb25zOiB7fSxcbiAgICAgIGRlYnVnOiBmYWxzZVxuICAgIH1cblxuICAgIHRoaXMuZGF0YUxvYWRlZCA9IGZhbHNlIC8vIGZsYWcgdG8gZW5zdXJlIGRhdGEgYXJlIHByb3Blcmx5IGxvYWRlZFxuICAgIHRoaXMucG9zdHNDb3VudCA9IDAgLy8ga2VlcCB0cmFjayBvZiBwb3N0cyBJRCwgbXVzdCBiZSBudW1lcmljXG4gICAgdGhpcy5zdG9yYWdlID0gdGhpcy5nZXRMb2NhbFN0b3JhZ2VPcHRpb24oKVxuXG4gICAgdGhpcy5pbml0Q29uZmlnKGFyZ3MpXG4gICAgdGhpcy50cmlnZ2VyRGF0YUxvYWQoKVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSB1c2VyIGNvbmZpZ3VyYXRpb24gYW5kIGluaXRpYWxpemUgaW1wb3J0YW50IHZhcmlhYmxlc1xuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBhcmdzXG4gICAqL1xuICBpbml0Q29uZmlnIChhcmdzKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoYXJncykpIHtcbiAgICAgIHRoaXMuY29uZmlnW2tleV0gPSB2YWx1ZVxuICAgIH1cblxuICAgIC8vIGVuc3VyZSBjb25maWcgYmFja3dhcmQgY29tcGF0aWxpYml0eSBvZiA8MS41LjBcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5jb25maWcuaW5wdXRJZCkpIHRoaXMuY29uZmlnLmlucHV0SWQgPSBbdGhpcy5jb25maWcuaW5wdXRJZF1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5jb25maWcub3V0cHV0SWQpKSB0aGlzLmNvbmZpZy5vdXRwdXRJZCA9IFt0aGlzLmNvbmZpZy5vdXRwdXRJZF1cblxuICAgIC8vIEluamVjdCB0aGUgJ2xpbWl0JyBhcmcgd2l0aGluIHRoZSBmaW5hbCBzZWFyY2hPcHRpb25zXG4gICAgdGhpcy5jb25maWcuc2VhcmNoT3B0aW9ucy5saW1pdCA9IHRoaXMuY29uZmlnLmxpbWl0XG5cbiAgICAvLyBFbnN1cmUgJ3VwZGF0ZWRfYXQnIHdpbGwgYmUgZmV0Y2hlZCwgbmVlZGVkIGZvciB0aGUgbG9jYWwgc3RvcmFnZSBsb2dpY1xuICAgIHRoaXMub3JpZ2luYWxQb3N0c0ZpZWxkcyA9IHRoaXMuY29uZmlnLnBvc3RzRmllbGRzXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5wb3N0c0ZpZWxkcy5pbmNsdWRlcygndXBkYXRlZF9hdCcpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wb3N0c0ZpZWxkcy5wdXNoKCd1cGRhdGVkX2F0JylcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuaW5wdXRJZCAmJiB0aGlzLmNvbmZpZy5pbnB1dElkLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2VhcmNoQmFyRWxzID0gW11cbiAgICAgIHRoaXMuY29uZmlnLmlucHV0SWQuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuICAgICAgICBpZiAoc2VhcmNoQmFyKSB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hCYXJFbHMucHVzaChzZWFyY2hCYXIpXG4gICAgICAgICAgdGhpcy5hZGRTZWFyY2hMaXN0ZW5lcnMoc2VhcmNoQmFyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3IoYEVuYWJsZSB0byBmaW5kIHRoZSBpbnB1dCBlbGVtZW50ICMke2lkfSwgcGxlYXNlIGNoZWNrIHlvdXIgY29uZmlndXJhdGlvbmApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLm91dHB1dElkICYmIHRoaXMuY29uZmlnLm91dHB1dElkLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2VhcmNoUmVzdWx0RWxzID0gW11cbiAgICAgIHRoaXMuY29uZmlnLm91dHB1dElkLmZvckVhY2goaWQgPT4ge1xuICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcbiAgICAgICAgaWYgKHNlYXJjaFJlc3VsdCkge1xuICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0RWxzLnB1c2goc2VhcmNoUmVzdWx0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3IoYEVuYWJsZSB0byBmaW5kIHRoZSBvdXRwdXQgZWxlbWVudCAjJHtpZH0sIHBsZWFzZSBjaGVjayB5b3VyIGNvbmZpZ3VyYXRpb25gKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuaW5kZXggPSB0aGlzLmdldE5ld1NlYXJjaEluZGV4KClcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHNlYXJjaCBpbnB1dCBiYXIgYW5kIGZvcm0gZXZlbnQgbGlzdGVuZXJzIHRvIHRyaWdnZXJcbiAgICogZnVydGhlciBzZWFyY2hlc1xuICAgKi9cbiAgYWRkU2VhcmNoTGlzdGVuZXJzIChzZWFyY2hCYXJFbCkge1xuICAgIC8vIEluIGFueSBjYXNlLCBwcmV2ZW50IHRoZSBpbnB1dCBmb3JtIGZyb20gYmVpbmcgc3VibWl0dGVkXG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IHNlYXJjaEJhckVsLmNsb3Nlc3QoJ2Zvcm0nKVxuXG4gICAgaWYgKHNlYXJjaEZvcm0pIHtcbiAgICAgIHNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2KSA9PiB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZy5zZWFyY2hPbikge1xuICAgICAgY2FzZSAna2V5dXAnOlxuICAgICAgICBzZWFyY2hCYXJFbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpbnB1dFF1ZXJ5ID0gc2VhcmNoQmFyRWwudmFsdWUudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIHRoaXMuc2VhcmNoKGlucHV0UXVlcnkpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgICBzZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpbnB1dFF1ZXJ5ID0gc2VhcmNoQmFyRWwudmFsdWUudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIHRoaXMuc2VhcmNoKGlucHV0UXVlcnkpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZXJyb3IoYFVua25vd24gJ3NlYXJjaE9uJyBvcHRpb246ICcke3RoaXMuY29uZmlnLnNlYXJjaE9ufSdgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdHJpZ2dlcnMgdG8gbG9hZCB0aGUgcG9zdHMgZGF0YSB3aGVuIHJlYWR5XG4gICAqL1xuICB0cmlnZ2VyRGF0YUxvYWQgKCkge1xuICAgIHN3aXRjaCAodGhpcy5jb25maWcubG9hZE9uKSB7XG4gICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgIHRoaXMuc2VhcmNoQmFyRWxzLmZvckVhY2goc2VhcmNoQmFyRWwgPT4ge1xuICAgICAgICAgIHNlYXJjaEJhckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3BhZ2UnOlxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWREYXRhKClcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICBjYXNlICdub25lJzpcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5lcnJvcihgVW5rbm93biAnbG9hZE9uJyBvcHRpb246ICcke3RoaXMuY29uZmlnLmxvYWRPbn0nYClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWN0dWFsbHkgbG9hZCB0aGUgZGF0YSBpbnRvIGEgc2VhcmNoYWJsZSBpbmRleC5cbiAgICogV2hlbiB0aGlzIG1ldGhvZCBpcyBjb21wbGV0ZWQsIHdlIGFyZSByZWFkeSB0byBsYXVuY2ggc2VhcmNoIHF1ZXJpZXMuXG4gICAqL1xuICBsb2FkRGF0YSAoKSB7XG4gICAgaWYgKHRoaXMuZGF0YUxvYWRlZCkgcmV0dXJuXG5cbiAgICBpZiAoIXRoaXMuc3RvcmFnZSkge1xuICAgICAgdGhpcy5sb2coJ05vIGxvY2FsIHN0b3JhZ2UgYXZhaWxhYmxlLCBzd2l0Y2ggdG8gZGVncmFkZWQgbW9kZScpXG4gICAgICB0aGlzLmZldGNoKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHN0b3JlZEluZGV4ID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0oJ1NlYXJjaGluR2hvc3RfaW5kZXgnKVxuICAgIGlmIChzdG9yZWRJbmRleCkge1xuICAgICAgdGhpcy5sb2coJ0ZvdW5kIGFuIGluZGV4IHN0b3JlZCBsb2NhbGx5LCBsb2FkcyBpdCcpXG4gICAgICB0aGlzLmNvbmZpZy5vbkluZGV4QnVpbGRTdGFydCgpXG4gICAgICB0aGlzLmluZGV4LmltcG9ydChzdG9yZWRJbmRleClcbiAgICAgIHRoaXMuZGF0YUxvYWRlZCA9IHRydWVcbiAgICAgIHRoaXMuY29uZmlnLm9uSW5kZXhCdWlsZEVuZCh0aGlzLmluZGV4KVxuICAgICAgdGhpcy52YWxpZGF0ZUNhY2hlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2coJ05vIGFscmVhZHkgc3RvcmVkIGluZGV4IGZvdW5kJylcbiAgICAgIHRoaXMuZmV0Y2goKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgc3RvcmVkIGRhdGEgYXJlIHVwIHRvIGRhdGUuXG4gICAqL1xuICB2YWxpZGF0ZUNhY2hlICgpIHtcbiAgICBjb25zdCBjYWNoZUluZm9TdHJpbmcgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSgnU2VhcmNoaW5HaG9zdF9jYWNoZV9pbmZvJylcbiAgICBpZiAoIWNhY2hlSW5mb1N0cmluZykge1xuICAgICAgdGhpcy5sb2coJ05vIGNhY2hlIGluZm8gbG9jYWwgb2JqZWN0IGZvdW5kJylcbiAgICAgIHRoaXMuZmV0Y2goKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGVJbmZvID0gSlNPTi5wYXJzZShjYWNoZUluZm9TdHJpbmcpXG5cbiAgICBjb25zdCBsYXN0VXBkYXRlID0gbmV3IERhdGUoY2FjaGVJbmZvLmxhc3RDYWNoZUNoZWNrKVxuICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gTWF0aC5yb3VuZCgobmV3IERhdGUoKSAtIGxhc3RVcGRhdGUpIC8gMTAwMClcbiAgICBpZiAoZWxhcHNlZFRpbWUgPCB0aGlzLmNvbmZpZy5jYWNoZU1heEFnZSkge1xuICAgICAgdGhpcy5sb2coYFNraXAgY2FjaGUgcmVmcmVzaGluZywgdXBkYXRlZCBsZXNzIHRoYW4gJHt0aGlzLmNvbmZpZy5jYWNoZU1heEFnZX1zIGFnbyAoJHtlbGFwc2VkVGltZX1zKWApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBicm93c2VPcHRpb25zID0ge1xuICAgICAgbGltaXQ6IDEsXG4gICAgICBmaWVsZHM6IFsndXBkYXRlZF9hdCddLFxuICAgICAgb3JkZXI6ICd1cGRhdGVkX2F0IERFU0MnXG4gICAgfVxuICAgIGNvbnN0IGxhc3RVcGRhdGVkUG9zdFVybCA9IHRoaXMuYnVpbGRVcmwoYnJvd3NlT3B0aW9ucylcblxuICAgIGZldGNoKGxhc3RVcGRhdGVkUG9zdFVybClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGpzb25SZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBsYXN0ZXN0UG9zdFVwZGF0ZWRBdCA9IGpzb25SZXNwb25zZS5wb3N0c1swXS51cGRhdGVkX2F0XG4gICAgICAgIGNvbnN0IHRvdGFsUG9zdHMgPSBqc29uUmVzcG9uc2UubWV0YS5wYWdpbmF0aW9uLnRvdGFsXG5cbiAgICAgICAgaWYgKGxhc3Rlc3RQb3N0VXBkYXRlZEF0ICE9PSBjYWNoZUluZm8ubGFzdGVzdFBvc3RVcGRhdGVkQXQpIHtcbiAgICAgICAgICB0aGlzLmxvZygnUG9zdHMgdXBkYXRlIGZvdW5kLCBwdXJnZSBvdXRkYXRlZCBsb2NhbCBjYWNoZScpXG4gICAgICAgICAgdGhpcy5mZXRjaCgpXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWxQb3N0cyA8IGNhY2hlSW5mby50b3RhbFBvc3RzKSB7XG4gICAgICAgICAgdGhpcy5sb2coJ0RlbGV0ZWQgb3IgdW5wdWJsaXNoZWQgcG9zdHMgZm91bmQsIHB1cmdlIG91dGRhdGVkIGxvY2FsIGNhY2hlJylcbiAgICAgICAgICB0aGlzLmZldGNoKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZygnTG9jYWwgY2FjaGVkIGRhdGEgdXAgdG8gZGF0ZScpXG4gICAgICAgICAgY2FjaGVJbmZvLmxhc3RDYWNoZUNoZWNrID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oJ1NlYXJjaGluR2hvc3RfY2FjaGVfaW5mbycsIEpTT04uc3RyaW5naWZ5KGNhY2hlSW5mbykpXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gZmV0Y2ggdGhlIGxhdGVzdCBwb3N0IGluZm9ybWF0aW9uIHRvIGNoZWNrIGNhY2hlIHN0YXRlJywgZXJyb3IpXG4gICAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoLCBmb3JtYXQgYW5kIHN0b3JlIHBvc3RzIGRhdGEgZnJvbSBHaG9zdC5cbiAgICovXG4gIGZldGNoICgpIHtcbiAgICB0aGlzLmxvZygnRmV0Y2hpbmcgZGF0YSBmcm9tIEdob3N0IEFQSScpXG4gICAgdGhpcy5jb25maWcub25GZXRjaFN0YXJ0KClcblxuICAgIGNvbnN0IGJyb3dzZU9wdGlvbnMgPSB7XG4gICAgICBsaW1pdDogJ2FsbCcsXG4gICAgICBmaWVsZHM6IHRoaXMuY29uZmlnLnBvc3RzRmllbGRzLFxuICAgICAgb3JkZXI6ICd1cGRhdGVkX2F0IERFU0MnXG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5wb3N0c0V4dHJhRmllbGRzLmxlbmd0aCA+IDApIGJyb3dzZU9wdGlvbnMuaW5jbHVkZSA9IHRoaXMuY29uZmlnLnBvc3RzRXh0cmFGaWVsZHNcbiAgICBpZiAodGhpcy5jb25maWcucG9zdHNGb3JtYXRzLmxlbmd0aCA+IDApIGJyb3dzZU9wdGlvbnMuZm9ybWF0cyA9IHRoaXMuY29uZmlnLnBvc3RzRm9ybWF0c1xuXG4gICAgY29uc3QgYWxsUG9zdHNVcmwgPSB0aGlzLmJ1aWxkVXJsKGJyb3dzZU9wdGlvbnMpXG5cbiAgICBmZXRjaChhbGxQb3N0c1VybClcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGpzb25SZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBwb3N0cyA9IGpzb25SZXNwb25zZS5wb3N0c1xuICAgICAgICB0aGlzLmNvbmZpZy5vbkZldGNoRW5kKHBvc3RzKVxuICAgICAgICB0aGlzLmNvbmZpZy5vbkluZGV4QnVpbGRTdGFydCgpXG5cbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuZ2V0TmV3U2VhcmNoSW5kZXgoKVxuICAgICAgICBwb3N0cy5mb3JFYWNoKChwb3N0KSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybWF0dGVkUG9zdCA9IHRoaXMuZm9ybWF0KHBvc3QpXG4gICAgICAgICAgaWYgKGZvcm1hdHRlZFBvc3QpIHRoaXMuaW5kZXguYWRkKGZvcm1hdHRlZFBvc3QpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5kYXRhTG9hZGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLmNvbmZpZy5vbkluZGV4QnVpbGRFbmQodGhpcy5pbmRleClcblxuICAgICAgICBpZiAodGhpcy5zdG9yYWdlKSB7XG4gICAgICAgICAgY29uc3QgY2FjaGVJbmZvID0ge1xuICAgICAgICAgICAgbGFzdENhY2hlQ2hlY2s6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIGxhc3Rlc3RQb3N0VXBkYXRlZEF0OiBwb3N0c1swXS51cGRhdGVkX2F0LFxuICAgICAgICAgICAgdG90YWxQb3N0czoganNvblJlc3BvbnNlLm1ldGEucGFnaW5hdGlvbi50b3RhbFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSgnU2VhcmNoaW5HaG9zdF9pbmRleCcsIHRoaXMuaW5kZXguZXhwb3J0KCkpXG4gICAgICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oJ1NlYXJjaGluR2hvc3RfY2FjaGVfaW5mbycsIEpTT04uc3RyaW5naWZ5KGNhY2hlSW5mbykpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZygnU2VhcmNoIGluZGV4IGJ1aWxkIGNvbXBsZXRlJylcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3IoJ1VuYWJsZSB0byBmZXRjaCBHaG9zdCBkYXRhLlxcbicsIGVycm9yKVxuICAgICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBwb3N0IGRvY3VtZW50IGJlZm9yZSBiZWluZyBpbmRleGVkLlxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBwb3N0XG4gICAqIEByZXR1cm4ge0RvY3VtZW50fSBUaGUgZm9ybWF0dGVkIHBvc3RcbiAgICovXG4gIGZvcm1hdCAocG9zdCkge1xuICAgIC8vIE5lZWQgdG8gdXNlIGEgbnVtZXJpYyBJRCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlICYgZGlzayBzcGFjZVxuICAgIHBvc3QuaWQgPSB0aGlzLnBvc3RzQ291bnQrK1xuXG4gICAgLy8gZGlzcGxheSBkYXRlIHVzaW5nICdsb2NhbGUnIGZvcm1hdFxuICAgIHBvc3QucHVibGlzaGVkX2F0ID0gdGhpcy5wcmV0dHlEYXRlKHBvc3QucHVibGlzaGVkX2F0KVxuXG4gICAgLy8gb25seSB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIGxhc3QgZmV0Y2ggdGltZSxcbiAgICAvLyByZW1vdmUgaXQgYmVmb3JlIGluZGV4aW5nIEJVVCBvbmx5IGlmIG5vdCB3YW50ZWQgYnkgdGhlIHVzZXJcbiAgICBpZiAoIXRoaXMub3JpZ2luYWxQb3N0c0ZpZWxkcy5pbmNsdWRlcygndXBkYXRlZF9hdCcpKSB7XG4gICAgICBkZWxldGUgcG9zdC51cGRhdGVkX2F0XG4gICAgfVxuXG4gICAgaWYgKHBvc3QuY3VzdG9tX2V4Y2VycHQpIHtcbiAgICAgIHBvc3QuZXhjZXJwdCA9IHBvc3QuY3VzdG9tX2V4Y2VycHRcbiAgICAgIGRlbGV0ZSBwb3N0LmN1c3RvbV9leGNlcnB0XG4gICAgfVxuXG4gICAgcG9zdCA9IHRoaXMuY29uZmlnLmN1c3RvbVByb2Nlc3NpbmcocG9zdClcblxuICAgIHJldHVybiBwb3N0XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZSBhIHNlYXJjaCBxdWVyeS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0UXVlcnlcbiAgICovXG4gIHNlYXJjaCAoaW5wdXRRdWVyeSkge1xuICAgIHRoaXMubG9hZERhdGEoKVxuXG4gICAgdGhpcy5jb25maWcub25TZWFyY2hTdGFydCgpXG5cbiAgICBjb25zdCBwb3N0c0ZvdW5kID0gdGhpcy5pbmRleC5zZWFyY2goaW5wdXRRdWVyeSwgdGhpcy5jb25maWcuc2VhcmNoT3B0aW9ucylcblxuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdEVscyAmJiB0aGlzLnNlYXJjaFJlc3VsdEVscy5sZW5ndGggPiAwKSB0aGlzLmRpc3BsYXkocG9zdHNGb3VuZClcblxuICAgIHRoaXMuY29uZmlnLm9uU2VhcmNoRW5kKHBvc3RzRm91bmQpXG4gICAgcmV0dXJuIHBvc3RzRm91bmRcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5IHRoZSByZXN1bHRzIGFzIEhUTUwgaW50byB0aGUgY29uZmlndXJlZCBET00gb3V0cHV0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RG9jdW1lbnRbXX0gcG9zdHNcbiAgICovXG4gIGRpc3BsYXkgKHBvc3RzKSB7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRFbHMuZm9yRWFjaChyZXN1bHRFbCA9PiB7XG4gICAgICByZXN1bHRFbC5pbm5lckhUTUwgPSAnJ1xuICAgIH0pXG5cbiAgICBpZiAocG9zdHMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhpcy5pbnNlcnRUZW1wbGF0ZSh0aGlzLmNvbmZpZy5lbXB0eVRlbXBsYXRlKCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgIHRoaXMuaW5zZXJ0VGVtcGxhdGUodGhpcy5jb25maWcudGVtcGxhdGUocG9zdCkpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgdGhlIEhUTUwgZ2VuZXJhdGVkIGJ5IHRoZSB0ZW1wbGF0ZSBpbnRvIHRoZSBET00gcmVzdWx0cyBvdXRwdXQgZWxlbWVudC5cbiAgICogSWYgYSBmYWxzeSB2YWx1ZSBpcyByZXR1cm5lZCBieSB0aGUgdGVtcGxhdGUsIGRvIG5vdCBhcHBseSBhbnkgdXBkYXRlLlxuICAgKiBAcGFyYW0geyp9IGdlbmVyYXRlZEh0bWwgSFRNTCBub2RlIGVsZW1lbnQgb3IgSFRNTCBzdHJpbmdcbiAgICovXG4gIGluc2VydFRlbXBsYXRlIChnZW5lcmF0ZWRIdG1sKSB7XG4gICAgaWYgKGdlbmVyYXRlZEh0bWwpIHtcbiAgICAgIHRoaXMuc2VhcmNoUmVzdWx0RWxzLmZvckVhY2gocmVzdWx0RWwgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb25maWcub3V0cHV0Q2hpbGRzVHlwZSkge1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLmNvbmZpZy5vdXRwdXRDaGlsZHNUeXBlKVxuICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5hZGQoYCR7cmVzdWx0RWwuaWR9LWl0ZW1gKVxuICAgICAgICAgIGNoaWxkLmlubmVySFRNTCA9IGdlbmVyYXRlZEh0bWxcbiAgICAgICAgICByZXN1bHRFbC5hcHBlbmRDaGlsZChjaGlsZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGdlbmVyYXRlZEh0bWwpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIG5ldyBpbnN0YW5jZSBvZiBGbGV4U2VhcmNoLlxuICAgKiBAcmV0dXJuIHtGbGV4U2VhcmNofSBUaGUgaW5zdGFuY2Ugb2YgRmxleFNlYXJjaC5cbiAgICovXG4gIGdldE5ld1NlYXJjaEluZGV4ICgpIHtcbiAgICBjb25zdCBpbmRleENvbmZpZyA9IHtcbiAgICAgIGRvYzoge1xuICAgICAgICBpZDogJ2lkJyxcbiAgICAgICAgZmllbGQ6IHRoaXMuY29uZmlnLmluZGV4ZWRGaWVsZHNcbiAgICAgIH0sXG4gICAgICBlbmNvZGU6ICdzaW1wbGUnLFxuICAgICAgdG9rZW5pemU6ICdmb3J3YXJkJyxcbiAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIHJlc29sdXRpb246IDQsXG4gICAgICBkZXB0aDogMFxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuY29uZmlnLmluZGV4T3B0aW9ucykpIHtcbiAgICAgIGluZGV4Q29uZmlnW2tleV0gPSB2YWx1ZVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgRmxleFNlYXJjaChpbmRleENvbmZpZylcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCB0aGUgZmluYWwgR2hvc3QgQVBJIFVSTCByZXNvdXJjZXMgYmFzZWQgb24gb3B0aW9ucy5cbiAgICogQHBhcmFtIHtEb2N1bWVudH0gb3B0aW9ucyB0aGUgR2hvc3QgQVBJIGJyb3dzZSBvcHRpb25zXG4gICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHVybFxuICAgKi9cbiAgYnVpbGRVcmwgKG9wdGlvbnMpIHtcbiAgICBsZXQgdXJsID0gYCR7dGhpcy5jb25maWcudXJsfS9naG9zdC9hcGkvJHt0aGlzLmNvbmZpZy52ZXJzaW9ufS9jb250ZW50L3Bvc3RzLz9rZXk9JHt0aGlzLmNvbmZpZy5rZXl9YFxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpKSB7XG4gICAgICB1cmwgKz0gYCYke2tleX09JHt2YWx1ZX1gXG4gICAgfVxuICAgIHJldHVybiBlbmNvZGVVUkkodXJsKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0ZSBpbiB0aGUgbG9jYWxlIGV4cGVjdGVkIGZvcm1hdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGRhdGVcbiAgICovXG4gIHByZXR0eURhdGUgKGRhdGUpIHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSlcbiAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcodGhpcy5jb25maWcuZGF0ZS5sb2NhbGUsIHRoaXMuY29uZmlnLmRhdGUub3B0aW9ucylcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlbHkgZ2V0IHRoZSBsb2NhbCBzdG9yYWdlIG9iamVjdCBpZiBhdmFpbGFibGUuXG4gICAqIElmIHRoZSB1c2VyIGJyb3dzZXIgZGlzYWJsZWQgaXQsIGdldCBgdW5kZWZpbmVkYCBpbnN0ZWFkLlxuICAgKiBAcmV0dXJuIHtTdG9yYWdlfSBUaGUgc3RvcmFnZSBvYmplY3Qgb3IgYHVuZGVmaW5lZGBcbiAgICovXG4gIGdldExvY2FsU3RvcmFnZU9wdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZS1hdmFpbGFiaWxpdHktdGVzdCcsICcnKVxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdG9yYWdlLWF2YWlsYWJpbGl0eS10ZXN0JylcbiAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBsb2dnaW5nIGZ1bmN0aW9uLlxuICAgKiBPdXRwdXQgbG9ncyBvbmx5IGlmIGBkZWJ1Z2AgaXMgc2V0IHRvIGB0cnVlYC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgdGV4dCB0byBvdXRwdXRcbiAgICogQHBhcmFtIHsqfSBvYmogb3B0aW9uYWwgb2JqZWN0IHRvIG91dHB1dFxuICAgKi9cbiAgbG9nIChzdHIsIG9iaikge1xuICAgIGlmICh0aGlzLmNvbmZpZy5kZWJ1Zykgb2JqID8gY29uc29sZS5sb2coc3RyLCBvYmopIDogY29uc29sZS5sb2coc3RyKVxuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSAnZXJyb3InIGxldmVsIGxvZ2dpbmcgZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgdGhlIHRleHQgdG8gb3V0cHV0XG4gICAqIEBwYXJhbSB7Kn0gb2JqIG9wdGlvbmFsIG9iamVjdCB0byBvdXRwdXRcbiAgICovXG4gIGVycm9yIChzdHIsIG9iaikge1xuICAgIG9iaiA/IGNvbnNvbGUuZXJyb3Ioc3RyLCBvYmopIDogY29uc29sZS5lcnJvcihzdHIpXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBzZWFyY2hTZXR0aW5ncyAqL1xuXG5pbXBvcnQgU2VhcmNoaW5HaG9zdCBmcm9tICcuL2xpYi9zZWFyY2hpbmdob3N0J1xuXG4oZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gIGNvbnN0ICRib2R5ID0gZG9jdW1lbnQuYm9keVxuICBjb25zdCAkaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWZpZWxkJylcbiAgY29uc3QgJHJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdHMnKVxuICBjb25zdCAkc2VhcmNoTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zZWFyY2gtbWVzc2FnZScpXG5cbiAgY29uc3QgY2xhc3NJc0FjdGl2ZSA9ICdpcy1hY3RpdmUnXG5cbiAgbGV0IGFsbFNlYXJjaExpbmtzTGVuZ3RoID0gMFxuXG4gIGxldCBzZWFyY2hSZXN1bHRzSGVpZ2h0ID0ge1xuICAgIG91dGVyOiAwLFxuICAgIHNjcm9sbDogMFxuICB9XG5cbiAgLy8gU0hvdyBpY29uIHNlYXJjaCBpbiBoZWFkZXJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtkYXRhLXRhcmdldD1tb2RhbC1zZWFyY2hdJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcblxuICBjb25zdCBhZnRlckRpc3BsYXlTZWFyY2ggPSByZXN1bHRzID0+IHtcbiAgICAvLyBBY3RpdmUgY2xhc3MgdG8gbGluayBzZWFyY2hcbiAgICBzZWFyY2hSZXN1bHRBY3RpdmUoKVxuXG4gICAgYWxsU2VhcmNoTGlua3NMZW5ndGggPSByZXN1bHRzLmxlbmd0aFxuXG4gICAgc2VhcmNoUmVzdWx0c0hlaWdodCA9IHtcbiAgICAgIG91dGVyOiAkcmVzdWx0cy5vZmZzZXRIZWlnaHQsXG4gICAgICBzY3JvbGw6ICRyZXN1bHRzLnNjcm9sbEhlaWdodFxuICAgIH1cblxuICAgIGlmIChhbGxTZWFyY2hMaW5rc0xlbmd0aCA9PT0gMCAmJiAkaW5wdXQudmFsdWUgIT09ICcnKSB7XG4gICAgICAkc2VhcmNoTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgJGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG15U2VhcmNoS2V5KVxuICAgIH0gZWxzZSB7XG4gICAgICAkc2VhcmNoTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgJGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG15U2VhcmNoS2V5KVxuICAgIH1cbiAgfVxuXG4gIC8qIEN1c3RvbWl6ZWQgc2VhcmNoIGRhdGFcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBjb25zdCBteVNlYXJjaFNldHRpbmdzID0ge1xuICAgIGtleTogc2VhcmNoU2V0dGluZ3Mua2V5LFxuICAgIG9uU2VhcmNoRW5kOiByZXN1bHRzID0+IGFmdGVyRGlzcGxheVNlYXJjaChyZXN1bHRzKVxuICB9XG5cbiAgLyogd2hlbiB0aGUgRW50ZXIga2V5IGlzIHByZXNzZWRcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBmdW5jdGlvbiBlbnRlcktleSAoKSB7XG4gICAgY29uc3QgbGluayA9ICRyZXN1bHRzLnF1ZXJ5U2VsZWN0b3IoYGxpLiR7Y2xhc3NJc0FjdGl2ZX1gKVxuICAgIGxpbmsgJiYgbGluay5maXJzdENoaWxkLmNsaWNrKClcbiAgfVxuXG4gIC8qIEF0dGVuZGluZyB0aGUgYWN0aXZlIGNsYXNzIHRvIHRoZSBzZWFyY2ggbGlua1xuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGZ1bmN0aW9uIHNlYXJjaFJlc3VsdEFjdGl2ZSAoaW5kZXgsIHVwRG93bikge1xuICAgIGluZGV4ID0gaW5kZXggfHwgMFxuICAgIHVwRG93biA9IHVwRG93biB8fCAndXAnXG5cbiAgICBjb25zdCBhbGxTZWFyY2hMaW5rcyA9ICRyZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcblxuICAgIC8vIFJldHVybiBpZiB0aGVyZSBhcmUgbm8gcmVzdWx0c1xuICAgIGlmICghYWxsU2VhcmNoTGlua3MubGVuZ3RoKSByZXR1cm5cblxuICAgIC8vIFJlbW92ZSBBbGwgY2xhc3MgQWN0aXZlXG4gICAgYWxsU2VhcmNoTGlua3MuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc0lzQWN0aXZlKSlcblxuICAgIC8vIEFkZCBjbGFzcyBhY3RpdmVcbiAgICBhbGxTZWFyY2hMaW5rc1tpbmRleF0uY2xhc3NMaXN0LmFkZChjbGFzc0lzQWN0aXZlKVxuXG4gICAgLy8gU2Nyb2xsIGZvciByZXN1bHRzIGJveFxuICAgIGNvbnN0IGxpbmtPZmZTZXRUb3AgPSBhbGxTZWFyY2hMaW5rc1tpbmRleF0ub2Zmc2V0VG9wXG4gICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gMFxuXG4gICAgdXBEb3duID09PSAnZG93bicgJiYgbGlua09mZlNldFRvcCA+IHNlYXJjaFJlc3VsdHNIZWlnaHQub3V0ZXIgLyAyID8gc2Nyb2xsUG9zaXRpb24gPSBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiB1cERvd24gPT09ICd1cCcgJiYgKHNjcm9sbFBvc2l0aW9uID0gbGlua09mZlNldFRvcCA8IHNlYXJjaFJlc3VsdHNIZWlnaHQuc2Nyb2xsIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgPyBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiBzZWFyY2hSZXN1bHRzSGVpZ2h0LnNjcm9sbClcblxuICAgICRyZXN1bHRzLnNjcm9sbFRvKDAsIHNjcm9sbFBvc2l0aW9uKVxuICB9XG5cbiAgLyogUmVhY3RlZCB0byB0aGUgdXAgb3IgZG93biBrZXlzXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgZnVuY3Rpb24gYXJyb3dLZXlVcERvd24gKGtleU51bWJlcikge1xuICAgIGxldCB1cERvd25cbiAgICBsZXQgaW5kZXhUaGVMaW5rID0gMFxuXG4gICAgY29uc3QgcmVzdWx0QWN0aXZlID0gJHJlc3VsdHMucXVlcnlTZWxlY3RvcihgbGkuJHtjbGFzc0lzQWN0aXZlfWApXG5cbiAgICBpZiAocmVzdWx0QWN0aXZlKSB7XG4gICAgICBpbmRleFRoZUxpbmsgPSBbXS5zbGljZS5jYWxsKHJlc3VsdEFjdGl2ZS5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKHJlc3VsdEFjdGl2ZSlcbiAgICB9XG5cbiAgICAkaW5wdXQuYmx1cigpXG5cbiAgICAvLyAzOCA9PT0gVVBcbiAgICBpZiAoa2V5TnVtYmVyID09PSAzOCkge1xuICAgICAgdXBEb3duID0gJ3VwJ1xuXG4gICAgICBpZiAoaW5kZXhUaGVMaW5rIDw9IDApIHtcbiAgICAgICAgJGlucHV0LmZvY3VzKClcbiAgICAgICAgaW5kZXhUaGVMaW5rID0gMFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXhUaGVMaW5rIC09IDFcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXBEb3duID0gJ2Rvd24nXG5cbiAgICAgIGlmIChpbmRleFRoZUxpbmsgPj0gYWxsU2VhcmNoTGlua3NMZW5ndGggLSAxKSB7XG4gICAgICAgIGluZGV4VGhlTGluayA9IDBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4VGhlTGluayArPSAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoUmVzdWx0QWN0aXZlKGluZGV4VGhlTGluaywgdXBEb3duKVxuICB9XG5cbiAgLyogQWRkaW5nIGZ1bmN0aW9ucyB0byB0aGUga2V5c1xuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGZ1bmN0aW9uIG15U2VhcmNoS2V5IChlKSB7XG4gICAgY29uc3Qga2V5TnVtYmVyID0gZS5rZXlDb2RlXG5cbiAgICAvKipcbiAgICAgICogMzggPT4gVXBcbiAgICAgICogNDAgPT4gZG93blxuICAgICAgKiAxMyA9PiBlbnRlclxuICAgICAgKiovXG5cbiAgICBpZiAoa2V5TnVtYmVyID09PSAxMykge1xuICAgICAgJGlucHV0LmJsdXIoKVxuICAgICAgZW50ZXJLZXkoKVxuICAgIH0gZWxzZSBpZiAoa2V5TnVtYmVyID09PSAzOCB8fCBrZXlOdW1iZXIgPT09IDQwKSB7XG4gICAgICBhcnJvd0tleVVwRG93bihrZXlOdW1iZXIpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICAvKiBTZWFyY2hcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXcgKi9cbiAgbmV3IFNlYXJjaGluR2hvc3QobXlTZWFyY2hTZXR0aW5ncylcbn0pKGRvY3VtZW50KVxuIl19

//# sourceMappingURL=map/search.js.map
