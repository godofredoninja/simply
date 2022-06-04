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
    // key: searchSettings.key,
    onSearchEnd: function onSearchEnd(results) {
      return afterDisplaySearch(results);
    }
  }; // join user settings

  Object.assign(mySearchSettings, searchSettings);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvZmxleHNlYXJjaC9kaXN0L2ZsZXhzZWFyY2gubWluLmpzIiwic3JjL2pzL2xpYi9zZWFyY2hpbmdob3N0LmpzIiwic3JjL2pzL3NlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QVAsR0FWa0MsQ0FZbEM7O0FBQ0EsUUFBSSxTQUFTLEtBQUssRUFBbEIsRUFBc0I7QUFDcEIsTUFBQSxNQUFNLEdBQUcsSUFBVDs7QUFFQSxVQUFJLFlBQVksSUFBSSxDQUFwQixFQUF1QjtBQUNyQixRQUFBLE1BQU0sQ0FBQyxLQUFQO0FBQ0EsUUFBQSxZQUFZLEdBQUcsQ0FBZjtBQUNELE9BSEQsTUFHTztBQUNMLFFBQUEsWUFBWSxJQUFJLENBQWhCO0FBQ0Q7QUFDRixLQVRELE1BU087QUFDTCxNQUFBLE1BQU0sR0FBRyxNQUFUOztBQUVBLFVBQUksWUFBWSxJQUFJLG9CQUFvQixHQUFHLENBQTNDLEVBQThDO0FBQzVDLFFBQUEsWUFBWSxHQUFHLENBQWY7QUFDRCxPQUZELE1BRU87QUFDTCxRQUFBLFlBQVksSUFBSSxDQUFoQjtBQUNEO0FBQ0Y7O0FBRUQsSUFBQSxrQkFBa0IsQ0FBQyxZQUFELEVBQWUsTUFBZixDQUFsQjtBQUNEO0FBRUQ7QUFDRjs7O0FBQ0UsV0FBUyxXQUFULENBQXNCLENBQXRCLEVBQXlCO0FBQ3ZCLFFBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFwQjtBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUksUUFBSSxTQUFTLEtBQUssRUFBbEIsRUFBc0I7QUFDcEIsTUFBQSxNQUFNLENBQUMsSUFBUDtBQUNBLE1BQUEsUUFBUTtBQUNULEtBSEQsTUFHTyxJQUFJLFNBQVMsS0FBSyxFQUFkLElBQW9CLFNBQVMsS0FBSyxFQUF0QyxFQUEwQztBQUMvQyxNQUFBLGNBQWMsQ0FBQyxTQUFELENBQWQ7QUFDQSxNQUFBLENBQUMsQ0FBQyxjQUFGO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7O0FBQ0U7OztBQUNBLE1BQUksc0JBQUosQ0FBa0IsZ0JBQWxCO0FBQ0QsQ0EvSUQsRUErSUcsUUEvSUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5TGlrZVRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2ssIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3MsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG5cbiAgaWYgKF9pID09IG51bGwpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG5cbiAgdmFyIF9zLCBfZTtcblxuICB0cnkge1xuICAgIGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzLmpzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiKTtcblxudmFyIHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLypcbiBGbGV4U2VhcmNoIHYwLjYuMzBcbiBDb3B5cmlnaHQgMjAxOSBOZXh0YXBwcyBHbWJIXG4gQXV0aG9yOiBUaG9tYXMgV2lsa2VybGluZ1xuIFJlbGVhc2VkIHVuZGVyIHRoZSBBcGFjaGUgMi4wIExpY2VuY2VcbiBodHRwczovL2dpdGh1Yi5jb20vbmV4dGFwcHMtZGUvZmxleHNlYXJjaFxuKi9cbid1c2Ugc3RyaWN0JzsoZnVuY3Rpb24oSyxSLHcpe2xldCBMOyhMPXcuZGVmaW5lKSYmTC5hbWQ/TChbXSxmdW5jdGlvbigpe3JldHVybiBSfSk6KEw9dy5tb2R1bGVzKT9MW0sudG9Mb3dlckNhc2UoKV09UjpcIm9iamVjdFwiPT09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9Ujp3W0tdPVJ9KShcIkZsZXhTZWFyY2hcIixmdW5jdGlvbiBtYShLKXtmdW5jdGlvbiB3KGEsYyl7Y29uc3QgYj1jP2MuaWQ6YSYmYS5pZDt0aGlzLmlkPWJ8fDA9PT1iP2I6bmErKzt0aGlzLmluaXQoYSxjKTtmYSh0aGlzLFwiaW5kZXhcIixmdW5jdGlvbigpe3JldHVybiB0aGlzLmE/T2JqZWN0LmtleXModGhpcy5hLmluZGV4W3RoaXMuYS5rZXlzWzBdXS5jKTpPYmplY3Qua2V5cyh0aGlzLmMpfSk7ZmEodGhpcyxcImxlbmd0aFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaW5kZXgubGVuZ3RofSl9ZnVuY3Rpb24gTChhLGMsYixkKXt0aGlzLnUhPT10aGlzLmcmJih0aGlzLm89dGhpcy5vLmNvbmNhdChiKSx0aGlzLnUrKyxcbmQmJnRoaXMuby5sZW5ndGg+PWQmJih0aGlzLnU9dGhpcy5nKSx0aGlzLnU9PT10aGlzLmcmJih0aGlzLmNhY2hlJiZ0aGlzLmouc2V0KGMsdGhpcy5vKSx0aGlzLkYmJnRoaXMuRih0aGlzLm8pKSk7cmV0dXJuIHRoaXN9ZnVuY3Rpb24gUyhhKXtjb25zdCBjPUIoKTtmb3IoY29uc3QgYiBpbiBhKWlmKGEuaGFzT3duUHJvcGVydHkoYikpe2NvbnN0IGQ9YVtiXTtGKGQpP2NbYl09ZC5zbGljZSgwKTpHKGQpP2NbYl09UyhkKTpjW2JdPWR9cmV0dXJuIGN9ZnVuY3Rpb24gVyhhLGMpe2NvbnN0IGI9YS5sZW5ndGgsZD1PKGMpLGU9W107Zm9yKGxldCBmPTAsaD0wO2Y8YjtmKyspe2NvbnN0IGc9YVtmXTtpZihkJiZjKGcpfHwhZCYmIWNbZ10pZVtoKytdPWd9cmV0dXJuIGV9ZnVuY3Rpb24gUChhLGMsYixkLGUsZixoLGcsayxsKXtiPWhhKGIsaD8wOmUsZyxmLGMsayxsKTtsZXQgcDtnJiYoZz1iLnBhZ2UscD1iLm5leHQsYj1iLnJlc3VsdCk7aWYoaCljPXRoaXMud2hlcmUoaCxudWxsLFxuZSxiKTtlbHNle2M9YjtiPXRoaXMubDtlPWMubGVuZ3RoO2Y9QXJyYXkoZSk7Zm9yKGg9MDtoPGU7aCsrKWZbaF09YltjW2hdXTtjPWZ9Yj1jO2QmJihPKGQpfHwoTT1kLnNwbGl0KFwiOlwiKSwxPE0ubGVuZ3RoP2Q9b2E6KE09TVswXSxkPXBhKSksYi5zb3J0KGQpKTtiPVQoZyxwLGIpO3RoaXMuY2FjaGUmJnRoaXMuai5zZXQoYSxiKTtyZXR1cm4gYn1mdW5jdGlvbiBmYShhLGMsYil7T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsYyx7Z2V0OmJ9KX1mdW5jdGlvbiByKGEpe3JldHVybiBuZXcgUmVnRXhwKGEsXCJnXCIpfWZ1bmN0aW9uIFEoYSxjKXtmb3IobGV0IGI9MDtiPGMubGVuZ3RoO2IrPTIpYT1hLnJlcGxhY2UoY1tiXSxjW2IrMV0pO3JldHVybiBhfWZ1bmN0aW9uIFYoYSxjLGIsZCxlLGYsaCxnKXtpZihjW2JdKXJldHVybiBjW2JdO2U9ZT8oZy0oaHx8Zy8xLjUpKSpmKyhofHxnLzEuNSkqZTpmO2NbYl09ZTtlPj1oJiYoYT1hW2ctKGUrLjU+PjApXSxhPWFbYl18fChhW2JdPVtdKSxcbmFbYS5sZW5ndGhdPWQpO3JldHVybiBlfWZ1bmN0aW9uIGJhKGEsYyl7aWYoYSl7Y29uc3QgYj1PYmplY3Qua2V5cyhhKTtmb3IobGV0IGQ9MCxlPWIubGVuZ3RoO2Q8ZTtkKyspe2NvbnN0IGY9YltkXSxoPWFbZl07aWYoaClmb3IobGV0IGc9MCxrPWgubGVuZ3RoO2c8aztnKyspaWYoaFtnXT09PWMpezE9PT1rP2RlbGV0ZSBhW2ZdOmguc3BsaWNlKGcsMSk7YnJlYWt9ZWxzZSBHKGhbZ10pJiZiYShoW2ddLGMpfX19ZnVuY3Rpb24gY2EoYSl7bGV0IGM9XCJcIixiPVwiXCI7dmFyIGQ9XCJcIjtmb3IobGV0IGU9MDtlPGEubGVuZ3RoO2UrKyl7Y29uc3QgZj1hW2VdO2lmKGYhPT1iKWlmKGUmJlwiaFwiPT09Zil7aWYoZD1cImFcIj09PWR8fFwiZVwiPT09ZHx8XCJpXCI9PT1kfHxcIm9cIj09PWR8fFwidVwiPT09ZHx8XCJ5XCI9PT1kLChcImFcIj09PWJ8fFwiZVwiPT09Ynx8XCJpXCI9PT1ifHxcIm9cIj09PWJ8fFwidVwiPT09Ynx8XCJ5XCI9PT1iKSYmZHx8XCIgXCI9PT1iKWMrPWZ9ZWxzZSBjKz1mO2Q9ZT09PWEubGVuZ3RoLTE/XCJcIjphW2UrXG4xXTtiPWZ9cmV0dXJuIGN9ZnVuY3Rpb24gcWEoYSxjKXthPWEubGVuZ3RoLWMubGVuZ3RoO3JldHVybiAwPmE/MTphPy0xOjB9ZnVuY3Rpb24gcGEoYSxjKXthPWFbTV07Yz1jW01dO3JldHVybiBhPGM/LTE6YT5jPzE6MH1mdW5jdGlvbiBvYShhLGMpe2NvbnN0IGI9TS5sZW5ndGg7Zm9yKGxldCBkPTA7ZDxiO2QrKylhPWFbTVtkXV0sYz1jW01bZF1dO3JldHVybiBhPGM/LTE6YT5jPzE6MH1mdW5jdGlvbiBUKGEsYyxiKXtyZXR1cm4gYT97cGFnZTphLG5leHQ6Yz9cIlwiK2M6bnVsbCxyZXN1bHQ6Yn06Yn1mdW5jdGlvbiBoYShhLGMsYixkLGUsZixoKXtsZXQgZyxrPVtdO2lmKCEwPT09Yil7Yj1cIjBcIjt2YXIgbD1cIlwifWVsc2UgbD1iJiZiLnNwbGl0KFwiOlwiKTtjb25zdCBwPWEubGVuZ3RoO2lmKDE8cCl7Y29uc3QgeT1CKCksdD1bXTtsZXQgdix4O3ZhciBuPTAsbTtsZXQgSTt2YXIgdT0hMDtsZXQgRCxFPTAsTixkYSxYLGVhO2wmJigyPT09bC5sZW5ndGg/KFg9bCxsPSExKTpsPWVhPVxucGFyc2VJbnQobFswXSwxMCkpO2lmKGgpe2Zvcih2PUIoKTtuPHA7bisrKWlmKFwibm90XCI9PT1lW25dKWZvcih4PWFbbl0sST14Lmxlbmd0aCxtPTA7bTxJO20rKyl2W1wiQFwiK3hbbV1dPTE7ZWxzZSBkYT1uKzE7aWYoQyhkYSkpcmV0dXJuIFQoYixnLGspO249MH1lbHNlIE49SihlKSYmZTtsZXQgWTtmb3IoO248cDtuKyspe2NvbnN0IHJhPW49PT0oZGF8fHApLTE7aWYoIU58fCFuKWlmKChtPU58fGUmJmVbbl0pJiZcImFuZFwiIT09bSlpZihcIm9yXCI9PT1tKVk9ITE7ZWxzZSBjb250aW51ZTtlbHNlIFk9Zj0hMDt4PWFbbl07aWYoST14Lmxlbmd0aCl7aWYodSlpZihEKXt2YXIgcT1ELmxlbmd0aDtmb3IobT0wO208cTttKyspe3U9RFttXTt2YXIgQT1cIkBcIit1O2gmJnZbQV18fCh5W0FdPTEsZnx8KGtbRSsrXT11KSl9RD1udWxsO3U9ITF9ZWxzZXtEPXg7Y29udGludWV9QT0hMTtmb3IobT0wO208STttKyspe3E9eFttXTt2YXIgej1cIkBcIitxO2NvbnN0IFo9Zj95W3pdfHwwOm47aWYoISghWiYmXG4hZHx8aCYmdlt6XXx8IWYmJnlbel0pKWlmKFo9PT1uKXtpZihyYSl7aWYoIWVhfHwtLWVhPEUpaWYoa1tFKytdPXEsYyYmRT09PWMpcmV0dXJuIFQoYixFKyhsfHwwKSxrKX1lbHNlIHlbel09bisxO0E9ITB9ZWxzZSBkJiYoej10W1pdfHwodFtaXT1bXSkselt6Lmxlbmd0aF09cSl9aWYoWSYmIUEmJiFkKWJyZWFrfWVsc2UgaWYoWSYmIWQpcmV0dXJuIFQoYixnLHgpfWlmKEQpaWYobj1ELmxlbmd0aCxoKWZvcihtPWw/cGFyc2VJbnQobCwxMCk6MDttPG47bSsrKWE9RFttXSx2W1wiQFwiK2FdfHwoa1tFKytdPWEpO2Vsc2Ugaz1EO2lmKGQpZm9yKEU9ay5sZW5ndGgsWD8obj1wYXJzZUludChYWzBdLDEwKSsxLG09cGFyc2VJbnQoWFsxXSwxMCkrMSk6KG49dC5sZW5ndGgsbT0wKTtuLS07KWlmKHE9dFtuXSl7Zm9yKEk9cS5sZW5ndGg7bTxJO20rKylpZihkPXFbbV0sIWh8fCF2W1wiQFwiK2RdKWlmKGtbRSsrXT1kLGMmJkU9PT1jKXJldHVybiBUKGIsbitcIjpcIittLGspO209MH19ZWxzZSFwfHxcbmUmJlwibm90XCI9PT1lWzBdfHwoaz1hWzBdLGwmJihsPXBhcnNlSW50KGxbMF0sMTApKSk7YyYmKGg9ay5sZW5ndGgsbCYmbD5oJiYobD0wKSxsPWx8fDAsZz1sK2MsZzxoP2s9ay5zbGljZShsLGcpOihnPTAsbCYmKGs9ay5zbGljZShsKSkpKTtyZXR1cm4gVChiLGcsayl9ZnVuY3Rpb24gSihhKXtyZXR1cm5cInN0cmluZ1wiPT09dHlwZW9mIGF9ZnVuY3Rpb24gRihhKXtyZXR1cm4gYS5jb25zdHJ1Y3Rvcj09PUFycmF5fWZ1bmN0aW9uIE8oYSl7cmV0dXJuXCJmdW5jdGlvblwiPT09dHlwZW9mIGF9ZnVuY3Rpb24gRyhhKXtyZXR1cm5cIm9iamVjdFwiPT09dHlwZW9mIGF9ZnVuY3Rpb24gQyhhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT09dHlwZW9mIGF9ZnVuY3Rpb24gaWEoYSl7Y29uc3QgYz1BcnJheShhKTtmb3IobGV0IGI9MDtiPGE7YisrKWNbYl09QigpO3JldHVybiBjfWZ1bmN0aW9uIEIoKXtyZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKX1mdW5jdGlvbiBzYSgpe2xldCBhLGM7c2VsZi5vbm1lc3NhZ2U9XG5mdW5jdGlvbihiKXtpZihiPWIuZGF0YSlpZihiLnNlYXJjaCl7Y29uc3QgZD1jLnNlYXJjaChiLmNvbnRlbnQsYi50aHJlc2hvbGQ/e2xpbWl0OmIubGltaXQsdGhyZXNob2xkOmIudGhyZXNob2xkLHdoZXJlOmIud2hlcmV9OmIubGltaXQpO3NlbGYucG9zdE1lc3NhZ2Uoe2lkOmEsY29udGVudDpiLmNvbnRlbnQsbGltaXQ6Yi5saW1pdCxyZXN1bHQ6ZH0pfWVsc2UgYi5hZGQ/Yy5hZGQoYi5pZCxiLmNvbnRlbnQpOmIudXBkYXRlP2MudXBkYXRlKGIuaWQsYi5jb250ZW50KTpiLnJlbW92ZT9jLnJlbW92ZShiLmlkKTpiLmNsZWFyP2MuY2xlYXIoKTpiLmluZm8/KGI9Yy5pbmZvKCksYi53b3JrZXI9YSxjb25zb2xlLmxvZyhiKSk6Yi5yZWdpc3RlciYmKGE9Yi5pZCxiLm9wdGlvbnMuY2FjaGU9ITEsYi5vcHRpb25zLmFzeW5jPSExLGIub3B0aW9ucy53b3JrZXI9ITEsYz0obmV3IEZ1bmN0aW9uKGIucmVnaXN0ZXIuc3Vic3RyaW5nKGIucmVnaXN0ZXIuaW5kZXhPZihcIntcIikrMSxiLnJlZ2lzdGVyLmxhc3RJbmRleE9mKFwifVwiKSkpKSgpLFxuYz1uZXcgYyhiLm9wdGlvbnMpKX19ZnVuY3Rpb24gdGEoYSxjLGIsZCl7YT1LKFwiZmxleHNlYXJjaFwiLFwiaWRcIithLHNhLGZ1bmN0aW9uKGYpeyhmPWYuZGF0YSkmJmYucmVzdWx0JiZkKGYuaWQsZi5jb250ZW50LGYucmVzdWx0LGYubGltaXQsZi53aGVyZSxmLmN1cnNvcixmLnN1Z2dlc3QpfSxjKTtjb25zdCBlPW1hLnRvU3RyaW5nKCk7Yi5pZD1jO2EucG9zdE1lc3NhZ2Uoe3JlZ2lzdGVyOmUsb3B0aW9uczpiLGlkOmN9KTtyZXR1cm4gYX1jb25zdCBIPXtlbmNvZGU6XCJpY2FzZVwiLGY6XCJmb3J3YXJkXCIsc3BsaXQ6L1xcVysvLGNhY2hlOiExLGFzeW5jOiExLGc6ITEsRDohMSxhOiExLGI6OSx0aHJlc2hvbGQ6MCxkZXB0aDowfSxqYT17bWVtb3J5OntlbmNvZGU6XCJleHRyYVwiLGY6XCJzdHJpY3RcIix0aHJlc2hvbGQ6MCxiOjF9LHNwZWVkOntlbmNvZGU6XCJpY2FzZVwiLGY6XCJzdHJpY3RcIix0aHJlc2hvbGQ6MSxiOjMsZGVwdGg6Mn0sbWF0Y2g6e2VuY29kZTpcImV4dHJhXCIsZjpcImZ1bGxcIix0aHJlc2hvbGQ6MSxcbmI6M30sc2NvcmU6e2VuY29kZTpcImV4dHJhXCIsZjpcInN0cmljdFwiLHRocmVzaG9sZDoxLGI6OSxkZXB0aDo0fSxiYWxhbmNlOntlbmNvZGU6XCJiYWxhbmNlXCIsZjpcInN0cmljdFwiLHRocmVzaG9sZDowLGI6MyxkZXB0aDozfSxmYXN0OntlbmNvZGU6XCJpY2FzZVwiLGY6XCJzdHJpY3RcIix0aHJlc2hvbGQ6OCxiOjksZGVwdGg6MX19LGFhPVtdO2xldCBuYT0wO2NvbnN0IGthPXt9LGxhPXt9O3cuY3JlYXRlPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIG5ldyB3KGEsYyl9O3cucmVnaXN0ZXJNYXRjaGVyPWZ1bmN0aW9uKGEpe2Zvcihjb25zdCBjIGluIGEpYS5oYXNPd25Qcm9wZXJ0eShjKSYmYWEucHVzaChyKGMpLGFbY10pO3JldHVybiB0aGlzfTt3LnJlZ2lzdGVyRW5jb2Rlcj1mdW5jdGlvbihhLGMpe1VbYV09Yy5iaW5kKFUpO3JldHVybiB0aGlzfTt3LnJlZ2lzdGVyTGFuZ3VhZ2U9ZnVuY3Rpb24oYSxjKXtrYVthXT1jLmZpbHRlcjtsYVthXT1jLnN0ZW1tZXI7cmV0dXJuIHRoaXN9O3cuZW5jb2RlPVxuZnVuY3Rpb24oYSxjKXtyZXR1cm4gVVthXShjKX07dy5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbihhLGMpe3RoaXMudj1bXTtpZihjKXt2YXIgYj1jLnByZXNldDthPWN9ZWxzZSBhfHwoYT1IKSxiPWEucHJlc2V0O2M9e307SihhKT8oYz1qYVthXSxhPXt9KTpiJiYoYz1qYVtiXSk7aWYoYj1hLndvcmtlcilpZihcInVuZGVmaW5lZFwiPT09dHlwZW9mIFdvcmtlcilhLndvcmtlcj0hMSx0aGlzLm09bnVsbDtlbHNle3ZhciBkPXBhcnNlSW50KGIsMTApfHw0O3RoaXMuQz0tMTt0aGlzLnU9MDt0aGlzLm89W107dGhpcy5GPW51bGw7dGhpcy5tPUFycmF5KGQpO2Zvcih2YXIgZT0wO2U8ZDtlKyspdGhpcy5tW2VdPXRhKHRoaXMuaWQsZSxhLEwuYmluZCh0aGlzKSl9dGhpcy5mPWEudG9rZW5pemV8fGMuZnx8dGhpcy5mfHxILmY7dGhpcy5zcGxpdD1DKGI9YS5zcGxpdCk/dGhpcy5zcGxpdHx8SC5zcGxpdDpKKGIpP3IoYik6Yjt0aGlzLkQ9YS5ydGx8fHRoaXMuRHx8SC5EO3RoaXMuYXN5bmM9XG5cInVuZGVmaW5lZFwiPT09dHlwZW9mIFByb21pc2V8fEMoYj1hLmFzeW5jKT90aGlzLmFzeW5jfHxILmFzeW5jOmI7dGhpcy5nPUMoYj1hLndvcmtlcik/dGhpcy5nfHxILmc6Yjt0aGlzLnRocmVzaG9sZD1DKGI9YS50aHJlc2hvbGQpP2MudGhyZXNob2xkfHx0aGlzLnRocmVzaG9sZHx8SC50aHJlc2hvbGQ6Yjt0aGlzLmI9QyhiPWEucmVzb2x1dGlvbik/Yj1jLmJ8fHRoaXMuYnx8SC5iOmI7Yjw9dGhpcy50aHJlc2hvbGQmJih0aGlzLmI9dGhpcy50aHJlc2hvbGQrMSk7dGhpcy5kZXB0aD1cInN0cmljdFwiIT09dGhpcy5mfHxDKGI9YS5kZXB0aCk/Yy5kZXB0aHx8dGhpcy5kZXB0aHx8SC5kZXB0aDpiO3RoaXMudz0oYj1DKGI9YS5lbmNvZGUpP2MuZW5jb2RlfHxILmVuY29kZTpiKSYmVVtiXSYmVVtiXS5iaW5kKFUpfHwoTyhiKT9iOnRoaXMud3x8ITEpOyhiPWEubWF0Y2hlcikmJnRoaXMuYWRkTWF0Y2hlcihiKTtpZihiPShjPWEubGFuZyl8fGEuZmlsdGVyKXtKKGIpJiYoYj1rYVtiXSk7XG5pZihGKGIpKXtkPXRoaXMudztlPUIoKTtmb3IodmFyIGY9MDtmPGIubGVuZ3RoO2YrKyl7dmFyIGg9ZD9kKGJbZl0pOmJbZl07ZVtoXT0xfWI9ZX10aGlzLmZpbHRlcj1ifWlmKGI9Y3x8YS5zdGVtbWVyKXt2YXIgZztjPUooYik/bGFbYl06YjtkPXRoaXMudztlPVtdO2ZvcihnIGluIGMpYy5oYXNPd25Qcm9wZXJ0eShnKSYmKGY9ZD9kKGcpOmcsZS5wdXNoKHIoZitcIigkfFxcXFxXKVwiKSxkP2QoY1tnXSk6Y1tnXSkpO3RoaXMuc3RlbW1lcj1nPWV9dGhpcy5hPWU9KGI9YS5kb2MpP1MoYik6dGhpcy5hfHxILmE7dGhpcy5pPWlhKHRoaXMuYi0odGhpcy50aHJlc2hvbGR8fDApKTt0aGlzLmg9QigpO3RoaXMuYz1CKCk7aWYoZSl7dGhpcy5sPUIoKTthLmRvYz1udWxsO2c9ZS5pbmRleD17fTtjPWUua2V5cz1bXTtkPWUuZmllbGQ7Zj1lLnRhZztoPWUuc3RvcmU7RihlLmlkKXx8KGUuaWQ9ZS5pZC5zcGxpdChcIjpcIikpO2lmKGgpe3ZhciBrPUIoKTtpZihKKGgpKWtbaF09MTtlbHNlIGlmKEYoaCkpZm9yKGxldCBsPVxuMDtsPGgubGVuZ3RoO2wrKylrW2hbbF1dPTE7ZWxzZSBHKGgpJiYoaz1oKTtlLnN0b3JlPWt9aWYoZil7dGhpcy5HPUIoKTtoPUIoKTtpZihkKWlmKEooZCkpaFtkXT1hO2Vsc2UgaWYoRihkKSlmb3Ioaz0wO2s8ZC5sZW5ndGg7aysrKWhbZFtrXV09YTtlbHNlIEcoZCkmJihoPWQpO0YoZil8fChlLnRhZz1mPVtmXSk7Zm9yKGQ9MDtkPGYubGVuZ3RoO2QrKyl0aGlzLkdbZltkXV09QigpO3RoaXMuST1mO2Q9aH1pZihkKXtsZXQgbDtGKGQpfHwoRyhkKT8obD1kLGUuZmllbGQ9ZD1PYmplY3Qua2V5cyhkKSk6ZS5maWVsZD1kPVtkXSk7Zm9yKGU9MDtlPGQubGVuZ3RoO2UrKylmPWRbZV0sRihmKXx8KGwmJihhPWxbZl0pLGNbZV09ZixkW2VdPWYuc3BsaXQoXCI6XCIpKSxnW2ZdPW5ldyB3KGEpfWEuZG9jPWJ9dGhpcy5CPSEwO3RoaXMuaj0odGhpcy5jYWNoZT1iPUMoYj1hLmNhY2hlKT90aGlzLmNhY2hlfHxILmNhY2hlOmIpP25ldyB1YShiKTohMTtyZXR1cm4gdGhpc307dy5wcm90b3R5cGUuZW5jb2RlPVxuZnVuY3Rpb24oYSl7YSYmKGFhLmxlbmd0aCYmKGE9UShhLGFhKSksdGhpcy52Lmxlbmd0aCYmKGE9UShhLHRoaXMudikpLHRoaXMudyYmKGE9dGhpcy53KGEpKSx0aGlzLnN0ZW1tZXImJihhPVEoYSx0aGlzLnN0ZW1tZXIpKSk7cmV0dXJuIGF9O3cucHJvdG90eXBlLmFkZE1hdGNoZXI9ZnVuY3Rpb24oYSl7Y29uc3QgYz10aGlzLnY7Zm9yKGNvbnN0IGIgaW4gYSlhLmhhc093blByb3BlcnR5KGIpJiZjLnB1c2gocihiKSxhW2JdKTtyZXR1cm4gdGhpc307dy5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKGEsYyxiLGQsZSl7aWYodGhpcy5hJiZHKGEpKXJldHVybiB0aGlzLkEoXCJhZGRcIixhLGMpO2lmKGMmJkooYykmJihhfHwwPT09YSkpe3ZhciBmPVwiQFwiK2E7aWYodGhpcy5jW2ZdJiYhZClyZXR1cm4gdGhpcy51cGRhdGUoYSxjKTtpZih0aGlzLmcpcmV0dXJuKyt0aGlzLkM+PXRoaXMubS5sZW5ndGgmJih0aGlzLkM9MCksdGhpcy5tW3RoaXMuQ10ucG9zdE1lc3NhZ2Uoe2FkZDohMCxpZDphLFxuY29udGVudDpjfSksdGhpcy5jW2ZdPVwiXCIrdGhpcy5DLGImJmIoKSx0aGlzO2lmKCFlKXtpZih0aGlzLmFzeW5jJiZcImZ1bmN0aW9uXCIhPT10eXBlb2YgaW1wb3J0U2NyaXB0cyl7bGV0IHQ9dGhpcztmPW5ldyBQcm9taXNlKGZ1bmN0aW9uKHYpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt0LmFkZChhLGMsbnVsbCxkLCEwKTt0PW51bGw7digpfSl9KTtpZihiKWYudGhlbihiKTtlbHNlIHJldHVybiBmO3JldHVybiB0aGlzfWlmKGIpcmV0dXJuIHRoaXMuYWRkKGEsYyxudWxsLGQsITApLGIoKSx0aGlzfWM9dGhpcy5lbmNvZGUoYyk7aWYoIWMubGVuZ3RoKXJldHVybiB0aGlzO2I9dGhpcy5mO2U9TyhiKT9iKGMpOmMuc3BsaXQodGhpcy5zcGxpdCk7dGhpcy5maWx0ZXImJihlPVcoZSx0aGlzLmZpbHRlcikpO2NvbnN0IG49QigpO24uX2N0eD1CKCk7Y29uc3QgbT1lLmxlbmd0aCx1PXRoaXMudGhyZXNob2xkLHE9dGhpcy5kZXB0aCxBPXRoaXMuYix6PXRoaXMuaSx5PXRoaXMuRDtmb3IobGV0IHQ9XG4wO3Q8bTt0Kyspe3ZhciBoPWVbdF07aWYoaCl7dmFyIGc9aC5sZW5ndGgsaz0oeT90KzE6bS10KS9tLGw9XCJcIjtzd2l0Y2goYil7Y2FzZSBcInJldmVyc2VcIjpjYXNlIFwiYm90aFwiOmZvcih2YXIgcD1nOy0tcDspbD1oW3BdK2wsVih6LG4sbCxhLHk/MTooZy1wKS9nLGssdSxBLTEpO2w9XCJcIjtjYXNlIFwiZm9yd2FyZFwiOmZvcihwPTA7cDxnO3ArKylsKz1oW3BdLFYoeixuLGwsYSx5PyhwKzEpL2c6MSxrLHUsQS0xKTticmVhaztjYXNlIFwiZnVsbFwiOmZvcihwPTA7cDxnO3ArKyl7Y29uc3Qgdj0oeT9wKzE6Zy1wKS9nO2ZvcihsZXQgeD1nO3g+cDt4LS0pbD1oLnN1YnN0cmluZyhwLHgpLFYoeixuLGwsYSx2LGssdSxBLTEpfWJyZWFrO2RlZmF1bHQ6aWYoZz1WKHosbixoLGEsMSxrLHUsQS0xKSxxJiYxPG0mJmc+PXUpZm9yKGc9bi5fY3R4W2hdfHwobi5fY3R4W2hdPUIoKSksaD10aGlzLmhbaF18fCh0aGlzLmhbaF09aWEoQS0odXx8MCkpKSxrPXQtcSxsPXQrcSsxLDA+ayYmKGs9MCksbD5cbm0mJihsPW0pO2s8bDtrKyspayE9PXQmJlYoaCxnLGVba10sYSwwLEEtKGs8dD90LWs6ay10KSx1LEEtMSl9fX10aGlzLmNbZl09MTt0aGlzLkI9ITF9cmV0dXJuIHRoaXN9O3cucHJvdG90eXBlLkE9ZnVuY3Rpb24oYSxjLGIpe2lmKEYoYykpe3ZhciBkPWMubGVuZ3RoO2lmKGQtLSl7Zm9yKHZhciBlPTA7ZTxkO2UrKyl0aGlzLkEoYSxjW2VdKTtyZXR1cm4gdGhpcy5BKGEsY1tkXSxiKX19ZWxzZXt2YXIgZj10aGlzLmEuaW5kZXgsaD10aGlzLmEua2V5cyxnPXRoaXMuYS50YWc7ZT10aGlzLmEuc3RvcmU7dmFyIGs7dmFyIGw9dGhpcy5hLmlkO2Q9Yztmb3IodmFyIHA9MDtwPGwubGVuZ3RoO3ArKylkPWRbbFtwXV07aWYoXCJyZW1vdmVcIj09PWEmJihkZWxldGUgdGhpcy5sW2RdLGw9aC5sZW5ndGgsbC0tKSl7Zm9yKGM9MDtjPGw7YysrKWZbaFtjXV0ucmVtb3ZlKGQpO3JldHVybiBmW2hbbF1dLnJlbW92ZShkLGIpfWlmKGcpe2ZvcihrPTA7azxnLmxlbmd0aDtrKyspe3ZhciBuPWdba107XG52YXIgbT1jO2w9bi5zcGxpdChcIjpcIik7Zm9yKHA9MDtwPGwubGVuZ3RoO3ArKyltPW1bbFtwXV07bT1cIkBcIittfWs9dGhpcy5HW25dO2s9a1ttXXx8KGtbbV09W10pfWw9dGhpcy5hLmZpZWxkO2ZvcihsZXQgdT0wLHE9bC5sZW5ndGg7dTxxO3UrKyl7bj1sW3VdO2c9Yztmb3IobT0wO208bi5sZW5ndGg7bSsrKWc9Z1tuW21dXTtuPWZbaFt1XV07bT1cImFkZFwiPT09YT9uLmFkZDpuLnVwZGF0ZTt1PT09cS0xP20uY2FsbChuLGQsZyxiKTptLmNhbGwobixkLGcpfWlmKGUpe2I9T2JqZWN0LmtleXMoZSk7YT1CKCk7Zm9yKGY9MDtmPGIubGVuZ3RoO2YrKylpZihoPWJbZl0sZVtoXSl7aD1oLnNwbGl0KFwiOlwiKTtsZXQgdSxxO2ZvcihsPTA7bDxoLmxlbmd0aDtsKyspZz1oW2xdLHU9KHV8fGMpW2ddLHE9KHF8fGEpW2ddPXV9Yz1hfWsmJihrW2subGVuZ3RoXT1jKTt0aGlzLmxbZF09Y31yZXR1cm4gdGhpc307dy5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKGEsYyxiKXtpZih0aGlzLmEmJlxuRyhhKSlyZXR1cm4gdGhpcy5BKFwidXBkYXRlXCIsYSxjKTt0aGlzLmNbXCJAXCIrYV0mJkooYykmJih0aGlzLnJlbW92ZShhKSx0aGlzLmFkZChhLGMsYiwhMCkpO3JldHVybiB0aGlzfTt3LnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oYSxjLGIpe2lmKHRoaXMuYSYmRyhhKSlyZXR1cm4gdGhpcy5BKFwicmVtb3ZlXCIsYSxjKTt2YXIgZD1cIkBcIithO2lmKHRoaXMuY1tkXSl7aWYodGhpcy5nKXJldHVybiB0aGlzLm1bdGhpcy5jW2RdXS5wb3N0TWVzc2FnZSh7cmVtb3ZlOiEwLGlkOmF9KSxkZWxldGUgdGhpcy5jW2RdLGMmJmMoKSx0aGlzO2lmKCFiKXtpZih0aGlzLmFzeW5jJiZcImZ1bmN0aW9uXCIhPT10eXBlb2YgaW1wb3J0U2NyaXB0cyl7bGV0IGU9dGhpcztkPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGYpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtlLnJlbW92ZShhLG51bGwsITApO2U9bnVsbDtmKCl9KX0pO2lmKGMpZC50aGVuKGMpO2Vsc2UgcmV0dXJuIGQ7cmV0dXJuIHRoaXN9aWYoYylyZXR1cm4gdGhpcy5yZW1vdmUoYSxcbm51bGwsITApLGMoKSx0aGlzfWZvcihjPTA7Yzx0aGlzLmItKHRoaXMudGhyZXNob2xkfHwwKTtjKyspYmEodGhpcy5pW2NdLGEpO3RoaXMuZGVwdGgmJmJhKHRoaXMuaCxhKTtkZWxldGUgdGhpcy5jW2RdO3RoaXMuQj0hMX1yZXR1cm4gdGhpc307bGV0IE07dy5wcm90b3R5cGUuc2VhcmNoPWZ1bmN0aW9uKGEsYyxiLGQpe2lmKEcoYykpe2lmKEYoYykpZm9yKHZhciBlPTA7ZTxjLmxlbmd0aDtlKyspY1tlXS5xdWVyeT1hO2Vsc2UgYy5xdWVyeT1hO2E9YztjPTFFM31lbHNlIGMmJk8oYyk/KGI9YyxjPTFFMyk6Y3x8MD09PWN8fChjPTFFMyk7aWYodGhpcy5nKXt0aGlzLkY9Yjt0aGlzLnU9MDt0aGlzLm89W107Zm9yKHZhciBmPTA7Zjx0aGlzLmc7ZisrKXRoaXMubVtmXS5wb3N0TWVzc2FnZSh7c2VhcmNoOiEwLGxpbWl0OmMsY29udGVudDphfSl9ZWxzZXt2YXIgaD1bXSxnPWE7aWYoRyhhKSYmIUYoYSkpe2J8fChiPWEuY2FsbGJhY2spJiYoZy5jYWxsYmFjaz1udWxsKTt2YXIgaz1cbmEuc29ydDt2YXIgbD1hLnBhZ2U7Yz1hLmxpbWl0O2Y9YS50aHJlc2hvbGQ7dmFyIHA9YS5zdWdnZXN0O2E9YS5xdWVyeX1pZih0aGlzLmEpe2Y9dGhpcy5hLmluZGV4O2NvbnN0IHk9Zy53aGVyZTt2YXIgbj1nLmJvb2x8fFwib3JcIixtPWcuZmllbGQ7bGV0IHQ9bjtsZXQgdix4O2lmKG0pRihtKXx8KG09W21dKTtlbHNlIGlmKEYoZykpe3ZhciB1PWc7bT1bXTt0PVtdO2Zvcih2YXIgcT0wO3E8Zy5sZW5ndGg7cSsrKWQ9Z1txXSxlPWQuYm9vbHx8bixtW3FdPWQuZmllbGQsdFtxXT1lLFwibm90XCI9PT1lP3Y9ITA6XCJhbmRcIj09PWUmJih4PSEwKX1lbHNlIG09dGhpcy5hLmtleXM7bj1tLmxlbmd0aDtmb3IocT0wO3E8bjtxKyspdSYmKGc9dVtxXSksbCYmIUooZykmJihnLnBhZ2U9bnVsbCxnLmxpbWl0PTApLGhbcV09ZlttW3FdXS5zZWFyY2goZywwKTtpZihiKXJldHVybiBiKFAuY2FsbCh0aGlzLGEsdCxoLGssYyxwLHksbCx4LHYpKTtpZih0aGlzLmFzeW5jKXtjb25zdCBJPXRoaXM7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKEQpe1Byb21pc2UuYWxsKGgpLnRoZW4oZnVuY3Rpb24oRSl7RChQLmNhbGwoSSxcbmEsdCxFLGssYyxwLHksbCx4LHYpKX0pfSl9cmV0dXJuIFAuY2FsbCh0aGlzLGEsdCxoLGssYyxwLHksbCx4LHYpfWZ8fChmPXRoaXMudGhyZXNob2xkfHwwKTtpZighZCl7aWYodGhpcy5hc3luYyYmXCJmdW5jdGlvblwiIT09dHlwZW9mIGltcG9ydFNjcmlwdHMpe2xldCB5PXRoaXM7Zj1uZXcgUHJvbWlzZShmdW5jdGlvbih0KXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dCh5LnNlYXJjaChnLGMsbnVsbCwhMCkpO3k9bnVsbH0pfSk7aWYoYilmLnRoZW4oYik7ZWxzZSByZXR1cm4gZjtyZXR1cm4gdGhpc31pZihiKXJldHVybiBiKHRoaXMuc2VhcmNoKGcsYyxudWxsLCEwKSksdGhpc31pZighYXx8IUooYSkpcmV0dXJuIGg7Zz1hO2lmKHRoaXMuY2FjaGUpaWYodGhpcy5CKXtpZihiPXRoaXMuai5nZXQoYSkpcmV0dXJuIGJ9ZWxzZSB0aGlzLmouY2xlYXIoKSx0aGlzLkI9ITA7Zz10aGlzLmVuY29kZShnKTtpZighZy5sZW5ndGgpcmV0dXJuIGg7Yj10aGlzLmY7Yj1PKGIpP2IoZyk6Zy5zcGxpdCh0aGlzLnNwbGl0KTtcbnRoaXMuZmlsdGVyJiYoYj1XKGIsdGhpcy5maWx0ZXIpKTt1PWIubGVuZ3RoO2Q9ITA7ZT1bXTt2YXIgQT1CKCksej0wOzE8dSYmKHRoaXMuZGVwdGgmJlwic3RyaWN0XCI9PT10aGlzLmY/bj0hMDpiLnNvcnQocWEpKTtpZighbnx8KHE9dGhpcy5oKSl7Y29uc3QgeT10aGlzLmI7Zm9yKDt6PHU7eisrKXtsZXQgdD1iW3pdO2lmKHQpe2lmKG4pe2lmKCFtKWlmKHFbdF0pbT10LEFbdF09MTtlbHNlIGlmKCFwKXJldHVybiBoO2lmKHAmJno9PT11LTEmJiFlLmxlbmd0aCluPSExLHQ9bXx8dCxBW3RdPTA7ZWxzZSBpZighbSljb250aW51ZX1pZighQVt0XSl7Y29uc3Qgdj1bXTtsZXQgeD0hMSxJPTA7Y29uc3QgRD1uP3FbbV06dGhpcy5pO2lmKEQpe2xldCBFO2ZvcihsZXQgTj0wO048eS1mO04rKylpZihFPURbTl0mJkRbTl1bdF0pdltJKytdPUUseD0hMH1pZih4KW09dCxlW2UubGVuZ3RoXT0xPEk/di5jb25jYXQuYXBwbHkoW10sdik6dlswXTtlbHNlIGlmKCFwKXtkPSExO2JyZWFrfUFbdF09XG4xfX19fWVsc2UgZD0hMTtkJiYoaD1oYShlLGMsbCxwKSk7dGhpcy5jYWNoZSYmdGhpcy5qLnNldChhLGgpO3JldHVybiBofX07dy5wcm90b3R5cGUuZmluZD1mdW5jdGlvbihhLGMpe3JldHVybiB0aGlzLndoZXJlKGEsYywxKVswXXx8bnVsbH07dy5wcm90b3R5cGUud2hlcmU9ZnVuY3Rpb24oYSxjLGIsZCl7Y29uc3QgZT10aGlzLmwsZj1bXTtsZXQgaD0wO2xldCBnO3ZhciBrO2xldCBsO2lmKEcoYSkpe2J8fChiPWMpO3ZhciBwPU9iamVjdC5rZXlzKGEpO3ZhciBuPXAubGVuZ3RoO2c9ITE7aWYoMT09PW4mJlwiaWRcIj09PXBbMF0pcmV0dXJuW2VbYS5pZF1dO2lmKChrPXRoaXMuSSkmJiFkKWZvcih2YXIgbT0wO208ay5sZW5ndGg7bSsrKXt2YXIgdT1rW21dLHE9YVt1XTtpZighQyhxKSl7bD10aGlzLkdbdV1bXCJAXCIrcV07aWYoMD09PS0tbilyZXR1cm4gbDtwLnNwbGljZShwLmluZGV4T2YodSksMSk7ZGVsZXRlIGFbdV07YnJlYWt9fWs9QXJyYXkobik7Zm9yKG09MDttPG47bSsrKWtbbV09XG5wW21dLnNwbGl0KFwiOlwiKX1lbHNle2lmKE8oYSkpe2M9ZHx8T2JqZWN0LmtleXMoZSk7Yj1jLmxlbmd0aDtmb3IocD0wO3A8YjtwKyspbj1lW2NbcF1dLGEobikmJihmW2grK109bik7cmV0dXJuIGZ9aWYoQyhjKSlyZXR1cm5bZVthXV07aWYoXCJpZFwiPT09YSlyZXR1cm5bZVtjXV07cD1bYV07bj0xO2s9W2Euc3BsaXQoXCI6XCIpXTtnPSEwfWQ9bHx8ZHx8T2JqZWN0LmtleXMoZSk7bT1kLmxlbmd0aDtmb3IodT0wO3U8bTt1Kyspe3E9bD9kW3VdOmVbZFt1XV07bGV0IEE9ITA7Zm9yKGxldCB6PTA7ejxuO3orKyl7Z3x8KGM9YVtwW3pdXSk7Y29uc3QgeT1rW3pdLHQ9eS5sZW5ndGg7bGV0IHY9cTtpZigxPHQpZm9yKGxldCB4PTA7eDx0O3grKyl2PXZbeVt4XV07ZWxzZSB2PXZbeVswXV07aWYodiE9PWMpe0E9ITE7YnJlYWt9fWlmKEEmJihmW2grK109cSxiJiZoPT09YikpYnJlYWt9cmV0dXJuIGZ9O3cucHJvdG90eXBlLmluZm89ZnVuY3Rpb24oKXtpZih0aGlzLmcpZm9yKGxldCBhPTA7YTxcbnRoaXMuZzthKyspdGhpcy5tW2FdLnBvc3RNZXNzYWdlKHtpbmZvOiEwLGlkOnRoaXMuaWR9KTtlbHNlIHJldHVybntpZDp0aGlzLmlkLGl0ZW1zOnRoaXMubGVuZ3RoLGNhY2hlOnRoaXMuY2FjaGUmJnRoaXMuY2FjaGUucz90aGlzLmNhY2hlLnMubGVuZ3RoOiExLG1hdGNoZXI6YWEubGVuZ3RoKyh0aGlzLnY/dGhpcy52Lmxlbmd0aDowKSx3b3JrZXI6dGhpcy5nLHRocmVzaG9sZDp0aGlzLnRocmVzaG9sZCxkZXB0aDp0aGlzLmRlcHRoLHJlc29sdXRpb246dGhpcy5iLGNvbnRleHR1YWw6dGhpcy5kZXB0aCYmXCJzdHJpY3RcIj09PXRoaXMuZn19O3cucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGVzdHJveSgpLmluaXQoKX07dy5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuY2FjaGUmJih0aGlzLmouY2xlYXIoKSx0aGlzLmo9bnVsbCk7dGhpcy5pPXRoaXMuaD10aGlzLmM9bnVsbDtpZih0aGlzLmEpe2NvbnN0IGE9dGhpcy5hLmtleXM7Zm9yKGxldCBjPVxuMDtjPGEubGVuZ3RoO2MrKyl0aGlzLmEuaW5kZXhbYVtjXV0uZGVzdHJveSgpO3RoaXMuYT10aGlzLmw9bnVsbH1yZXR1cm4gdGhpc307dy5wcm90b3R5cGUuZXhwb3J0PWZ1bmN0aW9uKGEpe2NvbnN0IGM9IWF8fEMoYS5zZXJpYWxpemUpfHxhLnNlcmlhbGl6ZTtpZih0aGlzLmEpe2NvbnN0IGQ9IWF8fEMoYS5kb2MpfHxhLmRvYzt2YXIgYj0hYXx8QyhhLmluZGV4KXx8YS5pbmRleDthPVtdO2xldCBlPTA7aWYoYilmb3IoYj10aGlzLmEua2V5cztlPGIubGVuZ3RoO2UrKyl7Y29uc3QgZj10aGlzLmEuaW5kZXhbYltlXV07YVtlXT1bZi5pLGYuaCxPYmplY3Qua2V5cyhmLmMpXX1kJiYoYVtlXT10aGlzLmwpfWVsc2UgYT1bdGhpcy5pLHRoaXMuaCxPYmplY3Qua2V5cyh0aGlzLmMpXTtjJiYoYT1KU09OLnN0cmluZ2lmeShhKSk7cmV0dXJuIGF9O3cucHJvdG90eXBlLmltcG9ydD1mdW5jdGlvbihhLGMpe2lmKCFjfHxDKGMuc2VyaWFsaXplKXx8Yy5zZXJpYWxpemUpYT1KU09OLnBhcnNlKGEpO1xuY29uc3QgYj1CKCk7aWYodGhpcy5hKXt2YXIgZD0hY3x8QyhjLmRvYyl8fGMuZG9jLGU9MDtpZighY3x8QyhjLmluZGV4KXx8Yy5pbmRleCl7Yz10aGlzLmEua2V5cztjb25zdCBoPWMubGVuZ3RoO2Zvcih2YXIgZj1hWzBdWzJdO2U8Zi5sZW5ndGg7ZSsrKWJbZltlXV09MTtmb3IoZT0wO2U8aDtlKyspe2Y9dGhpcy5hLmluZGV4W2NbZV1dO2NvbnN0IGc9YVtlXTtnJiYoZi5pPWdbMF0sZi5oPWdbMV0sZi5jPWIpfX1kJiYodGhpcy5sPUcoZCk/ZDphW2VdKX1lbHNle2Q9YVsyXTtmb3IoZT0wO2U8ZC5sZW5ndGg7ZSsrKWJbZFtlXV09MTt0aGlzLmk9YVswXTt0aGlzLmg9YVsxXTt0aGlzLmM9Yn19O2NvbnN0IHZhPWZ1bmN0aW9uKCl7Y29uc3QgYT1yKFwiXFxcXHMrXCIpLGM9cihcIlteYS16MC05IF1cIiksYj1bcihcIlstL11cIiksXCIgXCIsYyxcIlwiLGEsXCIgXCJdO3JldHVybiBmdW5jdGlvbihkKXtyZXR1cm4gY2EoUShkLnRvTG93ZXJDYXNlKCksYikpfX0oKSxVPXtpY2FzZTpmdW5jdGlvbihhKXtyZXR1cm4gYS50b0xvd2VyQ2FzZSgpfSxcbnNpbXBsZTpmdW5jdGlvbigpe2NvbnN0IGE9cihcIlxcXFxzK1wiKSxjPXIoXCJbXmEtejAtOSBdXCIpLGI9cihcIlstL11cIiksZD1yKFwiW1xcdTAwZTBcXHUwMGUxXFx1MDBlMlxcdTAwZTNcXHUwMGU0XFx1MDBlNV1cIiksZT1yKFwiW1xcdTAwZThcXHUwMGU5XFx1MDBlYVxcdTAwZWJdXCIpLGY9cihcIltcXHUwMGVjXFx1MDBlZFxcdTAwZWVcXHUwMGVmXVwiKSxoPXIoXCJbXFx1MDBmMlxcdTAwZjNcXHUwMGY0XFx1MDBmNVxcdTAwZjZcXHUwMTUxXVwiKSxnPXIoXCJbXFx1MDBmOVxcdTAwZmFcXHUwMGZiXFx1MDBmY1xcdTAxNzFdXCIpLGs9cihcIltcXHUwMGZkXFx1MDE3N1xcdTAwZmZdXCIpLGw9cihcIlxcdTAwZjFcIikscD1yKFwiW1xcdTAwZTdjXVwiKSxuPXIoXCJcXHUwMGRmXCIpLG09cihcIiAmIFwiKSx1PVtkLFwiYVwiLGUsXCJlXCIsZixcImlcIixoLFwib1wiLGcsXCJ1XCIsayxcInlcIixsLFwiblwiLHAsXCJrXCIsbixcInNcIixtLFwiIGFuZCBcIixiLFwiIFwiLGMsXCJcIixhLFwiIFwiXTtyZXR1cm4gZnVuY3Rpb24ocSl7cT1RKHEudG9Mb3dlckNhc2UoKSx1KTtyZXR1cm5cIiBcIj09PXE/XCJcIjpxfX0oKSxhZHZhbmNlZDpmdW5jdGlvbigpe2NvbnN0IGE9XG5yKFwiYWVcIiksYz1yKFwiYWlcIiksYj1yKFwiYXlcIiksZD1yKFwiZXlcIiksZT1yKFwib2VcIiksZj1yKFwidWVcIiksaD1yKFwiaWVcIiksZz1yKFwic3pcIiksaz1yKFwienNcIiksbD1yKFwiY2tcIikscD1yKFwiY2NcIiksbj1yKFwic2hcIiksbT1yKFwidGhcIiksdT1yKFwiZHRcIikscT1yKFwicGhcIiksQT1yKFwicGZcIiksej1yKFwib3VcIikseT1yKFwidW9cIiksdD1bYSxcImFcIixjLFwiZWlcIixiLFwiZWlcIixkLFwiZWlcIixlLFwib1wiLGYsXCJ1XCIsaCxcImlcIixnLFwic1wiLGssXCJzXCIsbixcInNcIixsLFwia1wiLHAsXCJrXCIsbSxcInRcIix1LFwidFwiLHEsXCJmXCIsQSxcImZcIix6LFwib1wiLHksXCJ1XCJdO3JldHVybiBmdW5jdGlvbih2LHgpe2lmKCF2KXJldHVybiB2O3Y9dGhpcy5zaW1wbGUodik7Mjx2Lmxlbmd0aCYmKHY9USh2LHQpKTt4fHwxPHYubGVuZ3RoJiYodj1jYSh2KSk7cmV0dXJuIHZ9fSgpLGV4dHJhOmZ1bmN0aW9uKCl7Y29uc3QgYT1yKFwicFwiKSxjPXIoXCJ6XCIpLGI9cihcIltjZ3FdXCIpLGQ9cihcIm5cIiksZT1yKFwiZFwiKSxmPXIoXCJbdnddXCIpLGg9cihcIlthZWlvdXldXCIpLFxuZz1bYSxcImJcIixjLFwic1wiLGIsXCJrXCIsZCxcIm1cIixlLFwidFwiLGYsXCJmXCIsaCxcIlwiXTtyZXR1cm4gZnVuY3Rpb24oayl7aWYoIWspcmV0dXJuIGs7az10aGlzLmFkdmFuY2VkKGssITApO2lmKDE8ay5sZW5ndGgpe2s9ay5zcGxpdChcIiBcIik7Zm9yKGxldCBsPTA7bDxrLmxlbmd0aDtsKyspe2NvbnN0IHA9a1tsXTsxPHAubGVuZ3RoJiYoa1tsXT1wWzBdK1EocC5zdWJzdHJpbmcoMSksZykpfWs9ay5qb2luKFwiIFwiKTtrPWNhKGspfXJldHVybiBrfX0oKSxiYWxhbmNlOnZhfSx1YT1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoYyl7dGhpcy5jbGVhcigpO3RoaXMuSD0hMCE9PWMmJmN9YS5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLmNhY2hlPUIoKTt0aGlzLmNvdW50PUIoKTt0aGlzLmluZGV4PUIoKTt0aGlzLnM9W119O2EucHJvdG90eXBlLnNldD1mdW5jdGlvbihjLGIpe2lmKHRoaXMuSCYmQyh0aGlzLmNhY2hlW2NdKSl7bGV0IGQ9dGhpcy5zLmxlbmd0aDtpZihkPT09dGhpcy5IKXtkLS07XG5jb25zdCBlPXRoaXMuc1tkXTtkZWxldGUgdGhpcy5jYWNoZVtlXTtkZWxldGUgdGhpcy5jb3VudFtlXTtkZWxldGUgdGhpcy5pbmRleFtlXX10aGlzLmluZGV4W2NdPWQ7dGhpcy5zW2RdPWM7dGhpcy5jb3VudFtjXT0tMTt0aGlzLmNhY2hlW2NdPWI7dGhpcy5nZXQoYyl9ZWxzZSB0aGlzLmNhY2hlW2NdPWJ9O2EucHJvdG90eXBlLmdldD1mdW5jdGlvbihjKXtjb25zdCBiPXRoaXMuY2FjaGVbY107aWYodGhpcy5IJiZiKXt2YXIgZD0rK3RoaXMuY291bnRbY107Y29uc3QgZj10aGlzLmluZGV4O2xldCBoPWZbY107aWYoMDxoKXtjb25zdCBnPXRoaXMucztmb3IodmFyIGU9aDt0aGlzLmNvdW50W2dbLS1oXV08PWQmJi0xIT09aDspO2grKztpZihoIT09ZSl7Zm9yKGQ9ZTtkPmg7ZC0tKWU9Z1tkLTFdLGdbZF09ZSxmW2VdPWQ7Z1toXT1jO2ZbY109aH19fXJldHVybiBifTtyZXR1cm4gYX0oKTtyZXR1cm4gd30oZnVuY3Rpb24oKXtjb25zdCBLPXt9LFI9XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBCbG9iJiZcblwidW5kZWZpbmVkXCIhPT10eXBlb2YgVVJMJiZVUkwuY3JlYXRlT2JqZWN0VVJMO3JldHVybiBmdW5jdGlvbih3LEwsUyxXLFApe1M9Uj9VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtcIihcIitTLnRvU3RyaW5nKCkrXCIpKClcIl0se3R5cGU6XCJ0ZXh0L2phdmFzY3JpcHRcIn0pKTp3K1wiLm1pbi5qc1wiO3crPVwiLVwiK0w7S1t3XXx8KEtbd109W10pO0tbd11bUF09bmV3IFdvcmtlcihTKTtLW3ddW1BdLm9ubWVzc2FnZT1XO3JldHVybiBLW3ddW1BdfX0oKSksdGhpcyk7XG4iLCIvKiBnbG9iYWwgZmV0Y2ggKi9cclxuXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nbWZtaS9zZWFyY2hpbkdob3N0XHJcblxyXG5pbXBvcnQgRmxleFNlYXJjaCBmcm9tICdmbGV4c2VhcmNoJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoaW5HaG9zdCB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgYW5kIGVudHJ5IHBvaW50IG9mIHRoZSBsaWJyYXJ5XHJcbiAgICogQHBhcmFtIHtEb2N1bWVudH0gYXJnc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yIChhcmdzKSB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxyXG4gICAgICBrZXk6ICcnLFxyXG4gICAgICB2ZXJzaW9uOiAndjQnLFxyXG4gICAgICBsb2FkT246ICdmb2N1cycsXHJcbiAgICAgIHNlYXJjaE9uOiAna2V5dXAnLFxyXG4gICAgICBsaW1pdDogMTAsXHJcbiAgICAgIGlucHV0SWQ6IFsnc2VhcmNoLWZpZWxkJ10sXHJcbiAgICAgIG91dHB1dElkOiBbJ3NlYXJjaC1yZXN1bHRzJ10sXHJcbiAgICAgIG91dHB1dENoaWxkc1R5cGU6ICdsaScsXHJcbiAgICAgIC8vXHJcbiAgICAgIHBvc3RzRmllbGRzOiBbJ3RpdGxlJywgJ3VybCcsICdwdWJsaXNoZWRfYXQnXSxcclxuICAgICAgcG9zdHNFeHRyYUZpZWxkczogW10sXHJcbiAgICAgIHBvc3RzRm9ybWF0czogW10sXHJcbiAgICAgIGluZGV4ZWRGaWVsZHM6IFsndGl0bGUnXSxcclxuICAgICAgdGVtcGxhdGU6IHBvc3QgPT4gYDxhIGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXIgbm9XcmFwV2l0aEVsbGlwc2lzIHB4LTQgcHktMlwiIGhyZWY9XCIke3Bvc3QudXJsfVwiPjxzdmcgY2xhc3M9XCJpY29uIGZsZXgtbm9uZSBtci0yXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tc2VhcmNoXCI+PC91c2U+PC9zdmc+IDxzcGFuPiR7cG9zdC5uYW1lID09PSB1bmRlZmluZWQgPyBwb3N0LnRpdGxlIDogcG9zdC5uYW1lfTwvc3Bhbj48L2E+YCxcclxuICAgICAgLy8gdGVtcGxhdGU6IGZ1bmN0aW9uIChwb3N0KSB7fSxcclxuICAgICAgLy9cclxuICAgICAgLy8gcG9zdHNGaWVsZHM6IFsndGl0bGUnLCAndXJsJywgJ2V4Y2VycHQnLCAnY3VzdG9tX2V4Y2VycHQnLCAncHVibGlzaGVkX2F0JywgJ2ZlYXR1cmVfaW1hZ2UnXSxcclxuICAgICAgLy8gcG9zdHNFeHRyYUZpZWxkczogWyd0YWdzJ10sXHJcbiAgICAgIC8vIHBvc3RzRm9ybWF0czogWydwbGFpbnRleHQnXSxcclxuICAgICAgLy8gaW5kZXhlZEZpZWxkczogWyd0aXRsZScsICdzdHJpbmdfdGFncycsICdleGNlcnB0JywgJ3BsYWludGV4dCddLFxyXG4gICAgICAvLyB0ZW1wbGF0ZTogZnVuY3Rpb24gKHBvc3QpIHtcclxuICAgICAgLy8gICBsZXQgbyA9IGA8YSBocmVmPScke3Bvc3QudXJsfSc+YFxyXG4gICAgICAvLyAgIGlmIChwb3N0LmZlYXR1cmVfaW1hZ2UpIG8gKz0gYDxpbWcgc3JjPScke3Bvc3QuZmVhdHVyZV9pbWFnZX0nPmBcclxuICAgICAgLy8gICBvICs9ICc8c2VjdGlvbj4nXHJcbiAgICAgIC8vICAgbyArPSBgPGgyPiR7cG9zdC50aXRsZX08L2gyPmBcclxuICAgICAgLy8gICBvICs9IGA8L3NlY3Rpb24+PC9hPmBcclxuICAgICAgLy8gICByZXR1cm4gb1xyXG4gICAgICAvLyB9LFxyXG4gICAgICBlbXB0eVRlbXBsYXRlOiBmdW5jdGlvbiAoKSB7fSxcclxuICAgICAgY3VzdG9tUHJvY2Vzc2luZzogZnVuY3Rpb24gKHBvc3QpIHtcclxuICAgICAgICBpZiAocG9zdC50YWdzKSBwb3N0LnN0cmluZ190YWdzID0gcG9zdC50YWdzLm1hcChvID0+IG8ubmFtZSkuam9pbignICcpLnRvTG93ZXJDYXNlKClcclxuICAgICAgICByZXR1cm4gcG9zdFxyXG4gICAgICB9LFxyXG4gICAgICBkYXRlOiB7XHJcbiAgICAgICAgbG9jYWxlOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyB8fCAnZW4tVVMnLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcclxuICAgICAgICAgIG1vbnRoOiAnc2hvcnQnLFxyXG4gICAgICAgICAgZGF5OiAnbnVtZXJpYydcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNhY2hlTWF4QWdlOiAxODAwLFxyXG4gICAgICBvbkZldGNoU3RhcnQ6ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaXMtbG9hZGluZycpLFxyXG4gICAgICBvbkZldGNoRW5kOiAoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHsgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1sb2FkaW5nJykgfSwgNDAwMCksXHJcbiAgICAgIG9uSW5kZXhCdWlsZFN0YXJ0OiBmdW5jdGlvbiAoKSB7fSxcclxuICAgICAgb25JbmRleEJ1aWxkRW5kOiBmdW5jdGlvbiAoaW5kZXgpIHt9LFxyXG4gICAgICBvblNlYXJjaFN0YXJ0OiBmdW5jdGlvbiAoKSB7fSxcclxuICAgICAgb25TZWFyY2hFbmQ6IGZ1bmN0aW9uIChwb3N0cykge30sXHJcbiAgICAgIGluZGV4T3B0aW9uczoge30sXHJcbiAgICAgIHNlYXJjaE9wdGlvbnM6IHt9LFxyXG4gICAgICBkZWJ1ZzogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRhdGFMb2FkZWQgPSBmYWxzZSAvLyBmbGFnIHRvIGVuc3VyZSBkYXRhIGFyZSBwcm9wZXJseSBsb2FkZWRcclxuICAgIHRoaXMucG9zdHNDb3VudCA9IDAgLy8ga2VlcCB0cmFjayBvZiBwb3N0cyBJRCwgbXVzdCBiZSBudW1lcmljXHJcbiAgICB0aGlzLnN0b3JhZ2UgPSB0aGlzLmdldExvY2FsU3RvcmFnZU9wdGlvbigpXHJcblxyXG4gICAgdGhpcy5pbml0Q29uZmlnKGFyZ3MpXHJcbiAgICB0aGlzLnRyaWdnZXJEYXRhTG9hZCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBseSB0aGUgdXNlciBjb25maWd1cmF0aW9uIGFuZCBpbml0aWFsaXplIGltcG9ydGFudCB2YXJpYWJsZXNcclxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBhcmdzXHJcbiAgICovXHJcbiAgaW5pdENvbmZpZyAoYXJncykge1xyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoYXJncykpIHtcclxuICAgICAgdGhpcy5jb25maWdba2V5XSA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW5zdXJlIGNvbmZpZyBiYWNrd2FyZCBjb21wYXRpbGliaXR5IG9mIDwxLjUuMFxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuY29uZmlnLmlucHV0SWQpKSB0aGlzLmNvbmZpZy5pbnB1dElkID0gW3RoaXMuY29uZmlnLmlucHV0SWRdXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5jb25maWcub3V0cHV0SWQpKSB0aGlzLmNvbmZpZy5vdXRwdXRJZCA9IFt0aGlzLmNvbmZpZy5vdXRwdXRJZF1cclxuXHJcbiAgICAvLyBJbmplY3QgdGhlICdsaW1pdCcgYXJnIHdpdGhpbiB0aGUgZmluYWwgc2VhcmNoT3B0aW9uc1xyXG4gICAgdGhpcy5jb25maWcuc2VhcmNoT3B0aW9ucy5saW1pdCA9IHRoaXMuY29uZmlnLmxpbWl0XHJcblxyXG4gICAgLy8gRW5zdXJlICd1cGRhdGVkX2F0JyB3aWxsIGJlIGZldGNoZWQsIG5lZWRlZCBmb3IgdGhlIGxvY2FsIHN0b3JhZ2UgbG9naWNcclxuICAgIHRoaXMub3JpZ2luYWxQb3N0c0ZpZWxkcyA9IHRoaXMuY29uZmlnLnBvc3RzRmllbGRzXHJcbiAgICBpZiAoIXRoaXMuY29uZmlnLnBvc3RzRmllbGRzLmluY2x1ZGVzKCd1cGRhdGVkX2F0JykpIHtcclxuICAgICAgdGhpcy5jb25maWcucG9zdHNGaWVsZHMucHVzaCgndXBkYXRlZF9hdCcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmlucHV0SWQgJiYgdGhpcy5jb25maWcuaW5wdXRJZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc2VhcmNoQmFyRWxzID0gW11cclxuICAgICAgdGhpcy5jb25maWcuaW5wdXRJZC5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICBjb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcclxuICAgICAgICBpZiAoc2VhcmNoQmFyKSB7XHJcbiAgICAgICAgICB0aGlzLnNlYXJjaEJhckVscy5wdXNoKHNlYXJjaEJhcilcclxuICAgICAgICAgIHRoaXMuYWRkU2VhcmNoTGlzdGVuZXJzKHNlYXJjaEJhcilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5lcnJvcihgRW5hYmxlIHRvIGZpbmQgdGhlIGlucHV0IGVsZW1lbnQgIyR7aWR9LCBwbGVhc2UgY2hlY2sgeW91ciBjb25maWd1cmF0aW9uYClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLm91dHB1dElkICYmIHRoaXMuY29uZmlnLm91dHB1dElkLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zZWFyY2hSZXN1bHRFbHMgPSBbXVxyXG4gICAgICB0aGlzLmNvbmZpZy5vdXRwdXRJZC5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcclxuICAgICAgICBpZiAoc2VhcmNoUmVzdWx0KSB7XHJcbiAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdEVscy5wdXNoKHNlYXJjaFJlc3VsdClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5lcnJvcihgRW5hYmxlIHRvIGZpbmQgdGhlIG91dHB1dCBlbGVtZW50ICMke2lkfSwgcGxlYXNlIGNoZWNrIHlvdXIgY29uZmlndXJhdGlvbmApXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5kZXggPSB0aGlzLmdldE5ld1NlYXJjaEluZGV4KClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgc2VhcmNoIGlucHV0IGJhciBhbmQgZm9ybSBldmVudCBsaXN0ZW5lcnMgdG8gdHJpZ2dlclxyXG4gICAqIGZ1cnRoZXIgc2VhcmNoZXNcclxuICAgKi9cclxuICBhZGRTZWFyY2hMaXN0ZW5lcnMgKHNlYXJjaEJhckVsKSB7XHJcbiAgICAvLyBJbiBhbnkgY2FzZSwgcHJldmVudCB0aGUgaW5wdXQgZm9ybSBmcm9tIGJlaW5nIHN1Ym1pdHRlZFxyXG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IHNlYXJjaEJhckVsLmNsb3Nlc3QoJ2Zvcm0nKVxyXG5cclxuICAgIGlmIChzZWFyY2hGb3JtKSB7XHJcbiAgICAgIHNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2KSA9PiB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAodGhpcy5jb25maWcuc2VhcmNoT24pIHtcclxuICAgICAgY2FzZSAna2V5dXAnOlxyXG4gICAgICAgIHNlYXJjaEJhckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaW5wdXRRdWVyeSA9IHNlYXJjaEJhckVsLnZhbHVlLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgIHRoaXMuc2VhcmNoKGlucHV0UXVlcnkpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdzdWJtaXQnOlxyXG4gICAgICAgIHNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaW5wdXRRdWVyeSA9IHNlYXJjaEJhckVsLnZhbHVlLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgIHRoaXMuc2VhcmNoKGlucHV0UXVlcnkpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIGZhbHNlOlxyXG4gICAgICBjYXNlICdub25lJzpcclxuICAgICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLmVycm9yKGBVbmtub3duICdzZWFyY2hPbicgb3B0aW9uOiAnJHt0aGlzLmNvbmZpZy5zZWFyY2hPbn0nYClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0cmlnZ2VycyB0byBsb2FkIHRoZSBwb3N0cyBkYXRhIHdoZW4gcmVhZHlcclxuICAgKi9cclxuICB0cmlnZ2VyRGF0YUxvYWQgKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZy5sb2FkT24pIHtcclxuICAgICAgY2FzZSAnZm9jdXMnOlxyXG4gICAgICAgIHRoaXMuc2VhcmNoQmFyRWxzLmZvckVhY2goc2VhcmNoQmFyRWwgPT4ge1xyXG4gICAgICAgICAgc2VhcmNoQmFyRWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgJ3BhZ2UnOlxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkRGF0YSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIGZhbHNlOlxyXG4gICAgICBjYXNlICdub25lJzpcclxuICAgICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLmVycm9yKGBVbmtub3duICdsb2FkT24nIG9wdGlvbjogJyR7dGhpcy5jb25maWcubG9hZE9ufSdgKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0dWFsbHkgbG9hZCB0aGUgZGF0YSBpbnRvIGEgc2VhcmNoYWJsZSBpbmRleC5cclxuICAgKiBXaGVuIHRoaXMgbWV0aG9kIGlzIGNvbXBsZXRlZCwgd2UgYXJlIHJlYWR5IHRvIGxhdW5jaCBzZWFyY2ggcXVlcmllcy5cclxuICAgKi9cclxuICBsb2FkRGF0YSAoKSB7XHJcbiAgICBpZiAodGhpcy5kYXRhTG9hZGVkKSByZXR1cm5cclxuXHJcbiAgICBpZiAoIXRoaXMuc3RvcmFnZSkge1xyXG4gICAgICB0aGlzLmxvZygnTm8gbG9jYWwgc3RvcmFnZSBhdmFpbGFibGUsIHN3aXRjaCB0byBkZWdyYWRlZCBtb2RlJylcclxuICAgICAgdGhpcy5mZXRjaCgpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0b3JlZEluZGV4ID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0oJ1NlYXJjaGluR2hvc3RfaW5kZXgnKVxyXG4gICAgaWYgKHN0b3JlZEluZGV4KSB7XHJcbiAgICAgIHRoaXMubG9nKCdGb3VuZCBhbiBpbmRleCBzdG9yZWQgbG9jYWxseSwgbG9hZHMgaXQnKVxyXG4gICAgICB0aGlzLmNvbmZpZy5vbkluZGV4QnVpbGRTdGFydCgpXHJcbiAgICAgIHRoaXMuaW5kZXguaW1wb3J0KHN0b3JlZEluZGV4KVxyXG4gICAgICB0aGlzLmRhdGFMb2FkZWQgPSB0cnVlXHJcbiAgICAgIHRoaXMuY29uZmlnLm9uSW5kZXhCdWlsZEVuZCh0aGlzLmluZGV4KVxyXG4gICAgICB0aGlzLnZhbGlkYXRlQ2FjaGUoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb2coJ05vIGFscmVhZHkgc3RvcmVkIGluZGV4IGZvdW5kJylcclxuICAgICAgdGhpcy5mZXRjaCgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbnN1cmUgc3RvcmVkIGRhdGEgYXJlIHVwIHRvIGRhdGUuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVDYWNoZSAoKSB7XHJcbiAgICBjb25zdCBjYWNoZUluZm9TdHJpbmcgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSgnU2VhcmNoaW5HaG9zdF9jYWNoZV9pbmZvJylcclxuICAgIGlmICghY2FjaGVJbmZvU3RyaW5nKSB7XHJcbiAgICAgIHRoaXMubG9nKCdObyBjYWNoZSBpbmZvIGxvY2FsIG9iamVjdCBmb3VuZCcpXHJcbiAgICAgIHRoaXMuZmV0Y2goKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYWNoZUluZm8gPSBKU09OLnBhcnNlKGNhY2hlSW5mb1N0cmluZylcclxuXHJcbiAgICBjb25zdCBsYXN0VXBkYXRlID0gbmV3IERhdGUoY2FjaGVJbmZvLmxhc3RDYWNoZUNoZWNrKVxyXG4gICAgY29uc3QgZWxhcHNlZFRpbWUgPSBNYXRoLnJvdW5kKChuZXcgRGF0ZSgpIC0gbGFzdFVwZGF0ZSkgLyAxMDAwKVxyXG4gICAgaWYgKGVsYXBzZWRUaW1lIDwgdGhpcy5jb25maWcuY2FjaGVNYXhBZ2UpIHtcclxuICAgICAgdGhpcy5sb2coYFNraXAgY2FjaGUgcmVmcmVzaGluZywgdXBkYXRlZCBsZXNzIHRoYW4gJHt0aGlzLmNvbmZpZy5jYWNoZU1heEFnZX1zIGFnbyAoJHtlbGFwc2VkVGltZX1zKWApXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJyb3dzZU9wdGlvbnMgPSB7XHJcbiAgICAgIGxpbWl0OiAxLFxyXG4gICAgICBmaWVsZHM6IFsndXBkYXRlZF9hdCddLFxyXG4gICAgICBvcmRlcjogJ3VwZGF0ZWRfYXQgREVTQydcclxuICAgIH1cclxuICAgIGNvbnN0IGxhc3RVcGRhdGVkUG9zdFVybCA9IHRoaXMuYnVpbGRVcmwoYnJvd3NlT3B0aW9ucylcclxuXHJcbiAgICBmZXRjaChsYXN0VXBkYXRlZFBvc3RVcmwpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKGpzb25SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxhc3Rlc3RQb3N0VXBkYXRlZEF0ID0ganNvblJlc3BvbnNlLnBvc3RzWzBdLnVwZGF0ZWRfYXRcclxuICAgICAgICBjb25zdCB0b3RhbFBvc3RzID0ganNvblJlc3BvbnNlLm1ldGEucGFnaW5hdGlvbi50b3RhbFxyXG5cclxuICAgICAgICBpZiAobGFzdGVzdFBvc3RVcGRhdGVkQXQgIT09IGNhY2hlSW5mby5sYXN0ZXN0UG9zdFVwZGF0ZWRBdCkge1xyXG4gICAgICAgICAgdGhpcy5sb2coJ1Bvc3RzIHVwZGF0ZSBmb3VuZCwgcHVyZ2Ugb3V0ZGF0ZWQgbG9jYWwgY2FjaGUnKVxyXG4gICAgICAgICAgdGhpcy5mZXRjaCgpXHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3RhbFBvc3RzIDwgY2FjaGVJbmZvLnRvdGFsUG9zdHMpIHtcclxuICAgICAgICAgIHRoaXMubG9nKCdEZWxldGVkIG9yIHVucHVibGlzaGVkIHBvc3RzIGZvdW5kLCBwdXJnZSBvdXRkYXRlZCBsb2NhbCBjYWNoZScpXHJcbiAgICAgICAgICB0aGlzLmZldGNoKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5sb2coJ0xvY2FsIGNhY2hlZCBkYXRhIHVwIHRvIGRhdGUnKVxyXG4gICAgICAgICAgY2FjaGVJbmZvLmxhc3RDYWNoZUNoZWNrID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcbiAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSgnU2VhcmNoaW5HaG9zdF9jYWNoZV9pbmZvJywgSlNPTi5zdHJpbmdpZnkoY2FjaGVJbmZvKSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBmZXRjaCB0aGUgbGF0ZXN0IHBvc3QgaW5mb3JtYXRpb24gdG8gY2hlY2sgY2FjaGUgc3RhdGUnLCBlcnJvcilcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoLCBmb3JtYXQgYW5kIHN0b3JlIHBvc3RzIGRhdGEgZnJvbSBHaG9zdC5cclxuICAgKi9cclxuICBmZXRjaCAoKSB7XHJcbiAgICB0aGlzLmxvZygnRmV0Y2hpbmcgZGF0YSBmcm9tIEdob3N0IEFQSScpXHJcbiAgICB0aGlzLmNvbmZpZy5vbkZldGNoU3RhcnQoKVxyXG5cclxuICAgIGNvbnN0IGJyb3dzZU9wdGlvbnMgPSB7XHJcbiAgICAgIGxpbWl0OiAnYWxsJyxcclxuICAgICAgZmllbGRzOiB0aGlzLmNvbmZpZy5wb3N0c0ZpZWxkcyxcclxuICAgICAgb3JkZXI6ICd1cGRhdGVkX2F0IERFU0MnXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jb25maWcucG9zdHNFeHRyYUZpZWxkcy5sZW5ndGggPiAwKSBicm93c2VPcHRpb25zLmluY2x1ZGUgPSB0aGlzLmNvbmZpZy5wb3N0c0V4dHJhRmllbGRzXHJcbiAgICBpZiAodGhpcy5jb25maWcucG9zdHNGb3JtYXRzLmxlbmd0aCA+IDApIGJyb3dzZU9wdGlvbnMuZm9ybWF0cyA9IHRoaXMuY29uZmlnLnBvc3RzRm9ybWF0c1xyXG5cclxuICAgIGNvbnN0IGFsbFBvc3RzVXJsID0gdGhpcy5idWlsZFVybChicm93c2VPcHRpb25zKVxyXG5cclxuICAgIGZldGNoKGFsbFBvc3RzVXJsKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChqc29uUmVzcG9uc2UpID0+IHtcclxuICAgICAgICBjb25zdCBwb3N0cyA9IGpzb25SZXNwb25zZS5wb3N0c1xyXG4gICAgICAgIHRoaXMuY29uZmlnLm9uRmV0Y2hFbmQocG9zdHMpXHJcbiAgICAgICAgdGhpcy5jb25maWcub25JbmRleEJ1aWxkU3RhcnQoKVxyXG5cclxuICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5nZXROZXdTZWFyY2hJbmRleCgpXHJcbiAgICAgICAgcG9zdHMuZm9yRWFjaCgocG9zdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZm9ybWF0dGVkUG9zdCA9IHRoaXMuZm9ybWF0KHBvc3QpXHJcbiAgICAgICAgICBpZiAoZm9ybWF0dGVkUG9zdCkgdGhpcy5pbmRleC5hZGQoZm9ybWF0dGVkUG9zdClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmRhdGFMb2FkZWQgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5jb25maWcub25JbmRleEJ1aWxkRW5kKHRoaXMuaW5kZXgpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcclxuICAgICAgICAgIGNvbnN0IGNhY2hlSW5mbyA9IHtcclxuICAgICAgICAgICAgbGFzdENhY2hlQ2hlY2s6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICAgICAgbGFzdGVzdFBvc3RVcGRhdGVkQXQ6IHBvc3RzWzBdLnVwZGF0ZWRfYXQsXHJcbiAgICAgICAgICAgIHRvdGFsUG9zdHM6IGpzb25SZXNwb25zZS5tZXRhLnBhZ2luYXRpb24udG90YWxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKCdTZWFyY2hpbkdob3N0X2luZGV4JywgdGhpcy5pbmRleC5leHBvcnQoKSlcclxuICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKCdTZWFyY2hpbkdob3N0X2NhY2hlX2luZm8nLCBKU09OLnN0cmluZ2lmeShjYWNoZUluZm8pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2coJ1NlYXJjaCBpbmRleCBidWlsZCBjb21wbGV0ZScpXHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICB0aGlzLmVycm9yKCdVbmFibGUgdG8gZmV0Y2ggR2hvc3QgZGF0YS5cXG4nLCBlcnJvcilcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1hdCBhIHBvc3QgZG9jdW1lbnQgYmVmb3JlIGJlaW5nIGluZGV4ZWQuXHJcbiAgICogQHBhcmFtIHtEb2N1bWVudH0gcG9zdFxyXG4gICAqIEByZXR1cm4ge0RvY3VtZW50fSBUaGUgZm9ybWF0dGVkIHBvc3RcclxuICAgKi9cclxuICBmb3JtYXQgKHBvc3QpIHtcclxuICAgIC8vIE5lZWQgdG8gdXNlIGEgbnVtZXJpYyBJRCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlICYgZGlzayBzcGFjZVxyXG4gICAgcG9zdC5pZCA9IHRoaXMucG9zdHNDb3VudCsrXHJcblxyXG4gICAgLy8gZGlzcGxheSBkYXRlIHVzaW5nICdsb2NhbGUnIGZvcm1hdFxyXG4gICAgcG9zdC5wdWJsaXNoZWRfYXQgPSB0aGlzLnByZXR0eURhdGUocG9zdC5wdWJsaXNoZWRfYXQpXHJcblxyXG4gICAgLy8gb25seSB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIGxhc3QgZmV0Y2ggdGltZSxcclxuICAgIC8vIHJlbW92ZSBpdCBiZWZvcmUgaW5kZXhpbmcgQlVUIG9ubHkgaWYgbm90IHdhbnRlZCBieSB0aGUgdXNlclxyXG4gICAgaWYgKCF0aGlzLm9yaWdpbmFsUG9zdHNGaWVsZHMuaW5jbHVkZXMoJ3VwZGF0ZWRfYXQnKSkge1xyXG4gICAgICBkZWxldGUgcG9zdC51cGRhdGVkX2F0XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBvc3QuY3VzdG9tX2V4Y2VycHQpIHtcclxuICAgICAgcG9zdC5leGNlcnB0ID0gcG9zdC5jdXN0b21fZXhjZXJwdFxyXG4gICAgICBkZWxldGUgcG9zdC5jdXN0b21fZXhjZXJwdFxyXG4gICAgfVxyXG5cclxuICAgIHBvc3QgPSB0aGlzLmNvbmZpZy5jdXN0b21Qcm9jZXNzaW5nKHBvc3QpXHJcblxyXG4gICAgcmV0dXJuIHBvc3RcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4ZWN1dGUgYSBzZWFyY2ggcXVlcnkuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0UXVlcnlcclxuICAgKi9cclxuICBzZWFyY2ggKGlucHV0UXVlcnkpIHtcclxuICAgIHRoaXMubG9hZERhdGEoKVxyXG5cclxuICAgIHRoaXMuY29uZmlnLm9uU2VhcmNoU3RhcnQoKVxyXG5cclxuICAgIGNvbnN0IHBvc3RzRm91bmQgPSB0aGlzLmluZGV4LnNlYXJjaChpbnB1dFF1ZXJ5LCB0aGlzLmNvbmZpZy5zZWFyY2hPcHRpb25zKVxyXG5cclxuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdEVscyAmJiB0aGlzLnNlYXJjaFJlc3VsdEVscy5sZW5ndGggPiAwKSB0aGlzLmRpc3BsYXkocG9zdHNGb3VuZClcclxuXHJcbiAgICB0aGlzLmNvbmZpZy5vblNlYXJjaEVuZChwb3N0c0ZvdW5kKVxyXG4gICAgcmV0dXJuIHBvc3RzRm91bmRcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BsYXkgdGhlIHJlc3VsdHMgYXMgSFRNTCBpbnRvIHRoZSBjb25maWd1cmVkIERPTSBvdXRwdXQgZWxlbWVudC5cclxuICAgKiBAcGFyYW0ge0RvY3VtZW50W119IHBvc3RzXHJcbiAgICovXHJcbiAgZGlzcGxheSAocG9zdHMpIHtcclxuICAgIHRoaXMuc2VhcmNoUmVzdWx0RWxzLmZvckVhY2gocmVzdWx0RWwgPT4ge1xyXG4gICAgICByZXN1bHRFbC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgfSlcclxuXHJcbiAgICBpZiAocG9zdHMubGVuZ3RoIDwgMSkge1xyXG4gICAgICB0aGlzLmluc2VydFRlbXBsYXRlKHRoaXMuY29uZmlnLmVtcHR5VGVtcGxhdGUoKSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBvc3RzLmZvckVhY2gocG9zdCA9PiB7XHJcbiAgICAgICAgdGhpcy5pbnNlcnRUZW1wbGF0ZSh0aGlzLmNvbmZpZy50ZW1wbGF0ZShwb3N0KSlcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluc2VydCB0aGUgSFRNTCBnZW5lcmF0ZWQgYnkgdGhlIHRlbXBsYXRlIGludG8gdGhlIERPTSByZXN1bHRzIG91dHB1dCBlbGVtZW50LlxyXG4gICAqIElmIGEgZmFsc3kgdmFsdWUgaXMgcmV0dXJuZWQgYnkgdGhlIHRlbXBsYXRlLCBkbyBub3QgYXBwbHkgYW55IHVwZGF0ZS5cclxuICAgKiBAcGFyYW0geyp9IGdlbmVyYXRlZEh0bWwgSFRNTCBub2RlIGVsZW1lbnQgb3IgSFRNTCBzdHJpbmdcclxuICAgKi9cclxuICBpbnNlcnRUZW1wbGF0ZSAoZ2VuZXJhdGVkSHRtbCkge1xyXG4gICAgaWYgKGdlbmVyYXRlZEh0bWwpIHtcclxuICAgICAgdGhpcy5zZWFyY2hSZXN1bHRFbHMuZm9yRWFjaChyZXN1bHRFbCA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm91dHB1dENoaWxkc1R5cGUpIHtcclxuICAgICAgICAgIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLmNvbmZpZy5vdXRwdXRDaGlsZHNUeXBlKVxyXG4gICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZChgJHtyZXN1bHRFbC5pZH0taXRlbWApXHJcbiAgICAgICAgICBjaGlsZC5pbm5lckhUTUwgPSBnZW5lcmF0ZWRIdG1sXHJcbiAgICAgICAgICByZXN1bHRFbC5hcHBlbmRDaGlsZChjaGlsZClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzdWx0RWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBnZW5lcmF0ZWRIdG1sKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhIG5ldyBpbnN0YW5jZSBvZiBGbGV4U2VhcmNoLlxyXG4gICAqIEByZXR1cm4ge0ZsZXhTZWFyY2h9IFRoZSBpbnN0YW5jZSBvZiBGbGV4U2VhcmNoLlxyXG4gICAqL1xyXG4gIGdldE5ld1NlYXJjaEluZGV4ICgpIHtcclxuICAgIGNvbnN0IGluZGV4Q29uZmlnID0ge1xyXG4gICAgICBkb2M6IHtcclxuICAgICAgICBpZDogJ2lkJyxcclxuICAgICAgICBmaWVsZDogdGhpcy5jb25maWcuaW5kZXhlZEZpZWxkc1xyXG4gICAgICB9LFxyXG4gICAgICBlbmNvZGU6ICdzaW1wbGUnLFxyXG4gICAgICB0b2tlbml6ZTogJ2ZvcndhcmQnLFxyXG4gICAgICB0aHJlc2hvbGQ6IDAsXHJcbiAgICAgIHJlc29sdXRpb246IDQsXHJcbiAgICAgIGRlcHRoOiAwXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5jb25maWcuaW5kZXhPcHRpb25zKSkge1xyXG4gICAgICBpbmRleENvbmZpZ1trZXldID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEZsZXhTZWFyY2goaW5kZXhDb25maWcpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgZmluYWwgR2hvc3QgQVBJIFVSTCByZXNvdXJjZXMgYmFzZWQgb24gb3B0aW9ucy5cclxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvcHRpb25zIHRoZSBHaG9zdCBBUEkgYnJvd3NlIG9wdGlvbnNcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB1cmxcclxuICAgKi9cclxuICBidWlsZFVybCAob3B0aW9ucykge1xyXG4gICAgbGV0IHVybCA9IGAke3RoaXMuY29uZmlnLnVybH0vZ2hvc3QvYXBpLyR7dGhpcy5jb25maWcudmVyc2lvbn0vY29udGVudC9wb3N0cy8/a2V5PSR7dGhpcy5jb25maWcua2V5fWBcclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpKSB7XHJcbiAgICAgIHVybCArPSBgJiR7a2V5fT0ke3ZhbHVlfWBcclxuICAgIH1cclxuICAgIHJldHVybiBlbmNvZGVVUkkodXJsKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkYXRlIGluIHRoZSBsb2NhbGUgZXhwZWN0ZWQgZm9ybWF0LlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXHJcbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGRhdGVcclxuICAgKi9cclxuICBwcmV0dHlEYXRlIChkYXRlKSB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSlcclxuICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZyh0aGlzLmNvbmZpZy5kYXRlLmxvY2FsZSwgdGhpcy5jb25maWcuZGF0ZS5vcHRpb25zKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2FmZWx5IGdldCB0aGUgbG9jYWwgc3RvcmFnZSBvYmplY3QgaWYgYXZhaWxhYmxlLlxyXG4gICAqIElmIHRoZSB1c2VyIGJyb3dzZXIgZGlzYWJsZWQgaXQsIGdldCBgdW5kZWZpbmVkYCBpbnN0ZWFkLlxyXG4gICAqIEByZXR1cm4ge1N0b3JhZ2V9IFRoZSBzdG9yYWdlIG9iamVjdCBvciBgdW5kZWZpbmVkYFxyXG4gICAqL1xyXG4gIGdldExvY2FsU3RvcmFnZU9wdGlvbiAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2UtYXZhaWxhYmlsaXR5LXRlc3QnLCAnJylcclxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdG9yYWdlLWF2YWlsYWJpbGl0eS10ZXN0JylcclxuICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2VcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaW1wbGUgbG9nZ2luZyBmdW5jdGlvbi5cclxuICAgKiBPdXRwdXQgbG9ncyBvbmx5IGlmIGBkZWJ1Z2AgaXMgc2V0IHRvIGB0cnVlYC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIHRoZSB0ZXh0IHRvIG91dHB1dFxyXG4gICAqIEBwYXJhbSB7Kn0gb2JqIG9wdGlvbmFsIG9iamVjdCB0byBvdXRwdXRcclxuICAgKi9cclxuICBsb2cgKHN0ciwgb2JqKSB7XHJcbiAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIG9iaiA/IGNvbnNvbGUubG9nKHN0ciwgb2JqKSA6IGNvbnNvbGUubG9nKHN0cilcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpbXBsZSAnZXJyb3InIGxldmVsIGxvZ2dpbmcgZnVuY3Rpb24uXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgdGV4dCB0byBvdXRwdXRcclxuICAgKiBAcGFyYW0geyp9IG9iaiBvcHRpb25hbCBvYmplY3QgdG8gb3V0cHV0XHJcbiAgICovXHJcbiAgZXJyb3IgKHN0ciwgb2JqKSB7XHJcbiAgICBvYmogPyBjb25zb2xlLmVycm9yKHN0ciwgb2JqKSA6IGNvbnNvbGUuZXJyb3Ioc3RyKVxyXG4gIH1cclxufVxyXG4iLCIvKiBnbG9iYWwgc2VhcmNoU2V0dGluZ3MgKi9cclxuXHJcbmltcG9ydCBTZWFyY2hpbkdob3N0IGZyb20gJy4vbGliL3NlYXJjaGluZ2hvc3QnXHJcblxyXG4oZnVuY3Rpb24gKGRvY3VtZW50KSB7XHJcbiAgY29uc3QgJGJvZHkgPSBkb2N1bWVudC5ib2R5XHJcbiAgY29uc3QgJGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1maWVsZCcpXHJcbiAgY29uc3QgJHJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdHMnKVxyXG4gIGNvbnN0ICRzZWFyY2hNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNlYXJjaC1tZXNzYWdlJylcclxuXHJcbiAgY29uc3QgY2xhc3NJc0FjdGl2ZSA9ICdpcy1hY3RpdmUnXHJcblxyXG4gIGxldCBhbGxTZWFyY2hMaW5rc0xlbmd0aCA9IDBcclxuXHJcbiAgbGV0IHNlYXJjaFJlc3VsdHNIZWlnaHQgPSB7XHJcbiAgICBvdXRlcjogMCxcclxuICAgIHNjcm9sbDogMFxyXG4gIH1cclxuXHJcbiAgLy8gU0hvdyBpY29uIHNlYXJjaCBpbiBoZWFkZXJcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhW2RhdGEtdGFyZ2V0PW1vZGFsLXNlYXJjaF0nKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG5cclxuICBjb25zdCBhZnRlckRpc3BsYXlTZWFyY2ggPSByZXN1bHRzID0+IHtcclxuICAgIC8vIEFjdGl2ZSBjbGFzcyB0byBsaW5rIHNlYXJjaFxyXG4gICAgc2VhcmNoUmVzdWx0QWN0aXZlKClcclxuXHJcbiAgICBhbGxTZWFyY2hMaW5rc0xlbmd0aCA9IHJlc3VsdHMubGVuZ3RoXHJcblxyXG4gICAgc2VhcmNoUmVzdWx0c0hlaWdodCA9IHtcclxuICAgICAgb3V0ZXI6ICRyZXN1bHRzLm9mZnNldEhlaWdodCxcclxuICAgICAgc2Nyb2xsOiAkcmVzdWx0cy5zY3JvbGxIZWlnaHRcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWxsU2VhcmNoTGlua3NMZW5ndGggPT09IDAgJiYgJGlucHV0LnZhbHVlICE9PSAnJykge1xyXG4gICAgICAkc2VhcmNoTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAkYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgbXlTZWFyY2hLZXkpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkc2VhcmNoTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxyXG4gICAgICAkYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgbXlTZWFyY2hLZXkpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiBDdXN0b21pemVkIHNlYXJjaCBkYXRhXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICBjb25zdCBteVNlYXJjaFNldHRpbmdzID0ge1xyXG4gICAgLy8ga2V5OiBzZWFyY2hTZXR0aW5ncy5rZXksXHJcbiAgICBvblNlYXJjaEVuZDogcmVzdWx0cyA9PiBhZnRlckRpc3BsYXlTZWFyY2gocmVzdWx0cylcclxuICB9XHJcblxyXG4gIC8vIGpvaW4gdXNlciBzZXR0aW5nc1xyXG4gIE9iamVjdC5hc3NpZ24obXlTZWFyY2hTZXR0aW5ncywgc2VhcmNoU2V0dGluZ3MpXHJcblxyXG4gIC8qIHdoZW4gdGhlIEVudGVyIGtleSBpcyBwcmVzc2VkXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGZ1bmN0aW9uIGVudGVyS2V5ICgpIHtcclxuICAgIGNvbnN0IGxpbmsgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yKGBsaS4ke2NsYXNzSXNBY3RpdmV9YClcclxuICAgIGxpbmsgJiYgbGluay5maXJzdENoaWxkLmNsaWNrKClcclxuICB9XHJcblxyXG4gIC8qIEF0dGVuZGluZyB0aGUgYWN0aXZlIGNsYXNzIHRvIHRoZSBzZWFyY2ggbGlua1xyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBmdW5jdGlvbiBzZWFyY2hSZXN1bHRBY3RpdmUgKGluZGV4LCB1cERvd24pIHtcclxuICAgIGluZGV4ID0gaW5kZXggfHwgMFxyXG4gICAgdXBEb3duID0gdXBEb3duIHx8ICd1cCdcclxuXHJcbiAgICBjb25zdCBhbGxTZWFyY2hMaW5rcyA9ICRyZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcclxuXHJcbiAgICAvLyBSZXR1cm4gaWYgdGhlcmUgYXJlIG5vIHJlc3VsdHNcclxuICAgIGlmICghYWxsU2VhcmNoTGlua3MubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICAvLyBSZW1vdmUgQWxsIGNsYXNzIEFjdGl2ZVxyXG4gICAgYWxsU2VhcmNoTGlua3MuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc0lzQWN0aXZlKSlcclxuXHJcbiAgICAvLyBBZGQgY2xhc3MgYWN0aXZlXHJcbiAgICBhbGxTZWFyY2hMaW5rc1tpbmRleF0uY2xhc3NMaXN0LmFkZChjbGFzc0lzQWN0aXZlKVxyXG5cclxuICAgIC8vIFNjcm9sbCBmb3IgcmVzdWx0cyBib3hcclxuICAgIGNvbnN0IGxpbmtPZmZTZXRUb3AgPSBhbGxTZWFyY2hMaW5rc1tpbmRleF0ub2Zmc2V0VG9wXHJcbiAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSAwXHJcblxyXG4gICAgdXBEb3duID09PSAnZG93bicgJiYgbGlua09mZlNldFRvcCA+IHNlYXJjaFJlc3VsdHNIZWlnaHQub3V0ZXIgLyAyID8gc2Nyb2xsUG9zaXRpb24gPSBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiB1cERvd24gPT09ICd1cCcgJiYgKHNjcm9sbFBvc2l0aW9uID0gbGlua09mZlNldFRvcCA8IHNlYXJjaFJlc3VsdHNIZWlnaHQuc2Nyb2xsIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgPyBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiBzZWFyY2hSZXN1bHRzSGVpZ2h0LnNjcm9sbClcclxuXHJcbiAgICAkcmVzdWx0cy5zY3JvbGxUbygwLCBzY3JvbGxQb3NpdGlvbilcclxuICB9XHJcblxyXG4gIC8qIFJlYWN0ZWQgdG8gdGhlIHVwIG9yIGRvd24ga2V5c1xyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBmdW5jdGlvbiBhcnJvd0tleVVwRG93biAoa2V5TnVtYmVyKSB7XHJcbiAgICBsZXQgdXBEb3duXHJcbiAgICBsZXQgaW5kZXhUaGVMaW5rID0gMFxyXG5cclxuICAgIGNvbnN0IHJlc3VsdEFjdGl2ZSA9ICRyZXN1bHRzLnF1ZXJ5U2VsZWN0b3IoYGxpLiR7Y2xhc3NJc0FjdGl2ZX1gKVxyXG5cclxuICAgIGlmIChyZXN1bHRBY3RpdmUpIHtcclxuICAgICAgaW5kZXhUaGVMaW5rID0gW10uc2xpY2UuY2FsbChyZXN1bHRBY3RpdmUucGFyZW50Tm9kZS5jaGlsZHJlbikuaW5kZXhPZihyZXN1bHRBY3RpdmUpXHJcbiAgICB9XHJcblxyXG4gICAgJGlucHV0LmJsdXIoKVxyXG5cclxuICAgIC8vIDM4ID09PSBVUFxyXG4gICAgaWYgKGtleU51bWJlciA9PT0gMzgpIHtcclxuICAgICAgdXBEb3duID0gJ3VwJ1xyXG5cclxuICAgICAgaWYgKGluZGV4VGhlTGluayA8PSAwKSB7XHJcbiAgICAgICAgJGlucHV0LmZvY3VzKClcclxuICAgICAgICBpbmRleFRoZUxpbmsgPSAwXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXhUaGVMaW5rIC09IDFcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXBEb3duID0gJ2Rvd24nXHJcblxyXG4gICAgICBpZiAoaW5kZXhUaGVMaW5rID49IGFsbFNlYXJjaExpbmtzTGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIGluZGV4VGhlTGluayA9IDBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbmRleFRoZUxpbmsgKz0gMVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoUmVzdWx0QWN0aXZlKGluZGV4VGhlTGluaywgdXBEb3duKVxyXG4gIH1cclxuXHJcbiAgLyogQWRkaW5nIGZ1bmN0aW9ucyB0byB0aGUga2V5c1xyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBmdW5jdGlvbiBteVNlYXJjaEtleSAoZSkge1xyXG4gICAgY29uc3Qga2V5TnVtYmVyID0gZS5rZXlDb2RlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogMzggPT4gVXBcclxuICAgICAgKiA0MCA9PiBkb3duXHJcbiAgICAgICogMTMgPT4gZW50ZXJcclxuICAgICAgKiovXHJcblxyXG4gICAgaWYgKGtleU51bWJlciA9PT0gMTMpIHtcclxuICAgICAgJGlucHV0LmJsdXIoKVxyXG4gICAgICBlbnRlcktleSgpXHJcbiAgICB9IGVsc2UgaWYgKGtleU51bWJlciA9PT0gMzggfHwga2V5TnVtYmVyID09PSA0MCkge1xyXG4gICAgICBhcnJvd0tleVVwRG93bihrZXlOdW1iZXIpXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyogU2VhcmNoXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xyXG4gIG5ldyBTZWFyY2hpbkdob3N0KG15U2VhcmNoU2V0dGluZ3MpXHJcbn0pKGRvY3VtZW50KVxyXG4iXX0=

//# sourceMappingURL=map/search.js.map
