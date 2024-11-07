(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
/*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).mediumZoom=t()}(this,(function(){"use strict";var e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},t=function(e){return"IMG"===e.tagName},o=function(e){return e&&1===e.nodeType},n=function(e){return".svg"===(e.currentSrc||e.src).substr(-4).toLowerCase()},i=function(e){try{return Array.isArray(e)?e.filter(t):function(e){return NodeList.prototype.isPrototypeOf(e)}(e)?[].slice.call(e).filter(t):o(e)?[e].filter(t):"string"==typeof e?[].slice.call(document.querySelectorAll(e)).filter(t):[]}catch(e){throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom")}},r=function(e){var t=document.createElement("div");return t.classList.add("medium-zoom-overlay"),t.style.background=e,t},d=function(e){var t=e.getBoundingClientRect(),o=t.top,n=t.left,i=t.width,r=t.height,d=e.cloneNode(),a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,m=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return d.removeAttribute("id"),d.style.position="absolute",d.style.top=o+a+"px",d.style.left=n+m+"px",d.style.width=i+"px",d.style.height=r+"px",d.style.transform="",d},a=function(t,o){var n=e({bubbles:!1,cancelable:!1,detail:void 0},o);if("function"==typeof window.CustomEvent)return new CustomEvent(t,n);var i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),i};return function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===o&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}"),function t(m){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=window.Promise||function(e){function t(){}e(t,t)},u=function(e){var t=e.target;t!==N?-1!==x.indexOf(t)&&w({target:t}):E()},s=function(){if(!A&&k.original){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(S-e)>T.scrollOffset&&setTimeout(E,150)}},f=function(e){var t=e.key||e.keyCode;"Escape"!==t&&"Esc"!==t&&27!==t||E()},p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t;if(t.background&&(N.style.background=t.background),t.container&&t.container instanceof Object&&(n.container=e({},T.container,t.container)),t.template){var i=o(t.template)?t.template:document.querySelector(t.template);n.template=i}return T=e({},T,n),x.forEach((function(e){e.dispatchEvent(a("medium-zoom:update",{detail:{zoom:j}}))})),j},g=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t(e({},T,o))},v=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];var n=t.reduce((function(e,t){return[].concat(e,i(t))}),[]);return n.filter((function(e){return-1===x.indexOf(e)})).forEach((function(e){x.push(e),e.classList.add("medium-zoom-image")})),O.forEach((function(e){var t=e.type,o=e.listener,i=e.options;n.forEach((function(e){e.addEventListener(t,o,i)}))})),j},h=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];k.zoomed&&E();var n=t.length>0?t.reduce((function(e,t){return[].concat(e,i(t))}),[]):x;return n.forEach((function(e){e.classList.remove("medium-zoom-image"),e.dispatchEvent(a("medium-zoom:detach",{detail:{zoom:j}}))})),x=x.filter((function(e){return-1===n.indexOf(e)})),j},z=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return x.forEach((function(n){n.addEventListener("medium-zoom:"+e,t,o)})),O.push({type:"medium-zoom:"+e,listener:t,options:o}),j},y=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return x.forEach((function(n){n.removeEventListener("medium-zoom:"+e,t,o)})),O=O.filter((function(o){return!(o.type==="medium-zoom:"+e&&o.listener.toString()===t.toString())})),j},b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.target,r=function(){var t={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},i=void 0,r=void 0;if(T.container)if(T.container instanceof Object)i=(t=e({},t,T.container)).width-t.left-t.right-2*T.margin,r=t.height-t.top-t.bottom-2*T.margin;else{var d=(o(T.container)?T.container:document.querySelector(T.container)).getBoundingClientRect(),a=d.width,m=d.height,l=d.left,c=d.top;t=e({},t,{width:a,height:m,left:l,top:c})}i=i||t.width-2*T.margin,r=r||t.height-2*T.margin;var u=k.zoomedHd||k.original,s=n(u)?i:u.naturalWidth||i,f=n(u)?r:u.naturalHeight||r,p=u.getBoundingClientRect(),g=p.top,v=p.left,h=p.width,z=p.height,y=Math.min(Math.max(h,s),i)/h,b=Math.min(Math.max(z,f),r)/z,E=Math.min(y,b),w="scale("+E+") translate3d("+((i-h)/2-v+T.margin+t.left)/E+"px, "+((r-z)/2-g+T.margin+t.top)/E+"px, 0)";k.zoomed.style.transform=w,k.zoomedHd&&(k.zoomedHd.style.transform=w)};return new c((function(e){if(i&&-1===x.indexOf(i))e(j);else{if(k.zoomed)e(j);else{if(i)k.original=i;else{if(!(x.length>0))return void e(j);var t=x;k.original=t[0]}if(k.original.dispatchEvent(a("medium-zoom:open",{detail:{zoom:j}})),S=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,A=!0,k.zoomed=d(k.original),document.body.appendChild(N),T.template){var n=o(T.template)?T.template:document.querySelector(T.template);k.template=document.createElement("div"),k.template.appendChild(n.content.cloneNode(!0)),document.body.appendChild(k.template)}if(k.original.parentElement&&"PICTURE"===k.original.parentElement.tagName&&k.original.currentSrc&&(k.zoomed.src=k.original.currentSrc),document.body.appendChild(k.zoomed),window.requestAnimationFrame((function(){document.body.classList.add("medium-zoom--opened")})),k.original.classList.add("medium-zoom-image--hidden"),k.zoomed.classList.add("medium-zoom-image--opened"),k.zoomed.addEventListener("click",E),k.zoomed.addEventListener("transitionend",(function t(){A=!1,k.zoomed.removeEventListener("transitionend",t),k.original.dispatchEvent(a("medium-zoom:opened",{detail:{zoom:j}})),e(j)})),k.original.getAttribute("data-zoom-src")){k.zoomedHd=k.zoomed.cloneNode(),k.zoomedHd.removeAttribute("srcset"),k.zoomedHd.removeAttribute("sizes"),k.zoomedHd.removeAttribute("loading"),k.zoomedHd.src=k.zoomed.getAttribute("data-zoom-src"),k.zoomedHd.onerror=function(){clearInterval(m),console.warn("Unable to reach the zoom image target "+k.zoomedHd.src),k.zoomedHd=null,r()};var m=setInterval((function(){k.zoomedHd.complete&&(clearInterval(m),k.zoomedHd.classList.add("medium-zoom-image--opened"),k.zoomedHd.addEventListener("click",E),document.body.appendChild(k.zoomedHd),r())}),10)}else if(k.original.hasAttribute("srcset")){k.zoomedHd=k.zoomed.cloneNode(),k.zoomedHd.removeAttribute("sizes"),k.zoomedHd.removeAttribute("loading");var l=k.zoomedHd.addEventListener("load",(function(){k.zoomedHd.removeEventListener("load",l),k.zoomedHd.classList.add("medium-zoom-image--opened"),k.zoomedHd.addEventListener("click",E),document.body.appendChild(k.zoomedHd),r()}))}else r()}}}))},E=function(){return new c((function(e){if(!A&&k.original){A=!0,document.body.classList.remove("medium-zoom--opened"),k.zoomed.style.transform="",k.zoomedHd&&(k.zoomedHd.style.transform=""),k.template&&(k.template.style.transition="opacity 150ms",k.template.style.opacity=0),k.original.dispatchEvent(a("medium-zoom:close",{detail:{zoom:j}})),k.zoomed.addEventListener("transitionend",(function t(){k.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(k.zoomed),k.zoomedHd&&document.body.removeChild(k.zoomedHd),document.body.removeChild(N),k.zoomed.classList.remove("medium-zoom-image--opened"),k.template&&document.body.removeChild(k.template),A=!1,k.zoomed.removeEventListener("transitionend",t),k.original.dispatchEvent(a("medium-zoom:closed",{detail:{zoom:j}})),k.original=null,k.zoomed=null,k.zoomedHd=null,k.template=null,e(j)}))}else e(j)}))},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.target;return k.original?E():b({target:t})},L=function(){return T},H=function(){return x},C=function(){return k.original},x=[],O=[],A=!1,S=0,T=l,k={original:null,zoomed:null,zoomedHd:null,template:null};"[object Object]"===Object.prototype.toString.call(m)?T=m:(m||"string"==typeof m)&&v(m),T=e({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},T);var N=r(T.background);document.addEventListener("click",u),document.addEventListener("keyup",f),document.addEventListener("scroll",s),window.addEventListener("resize",E);var j={open:b,close:E,toggle:w,update:p,clone:g,attach:v,detach:h,on:z,off:y,getOptions:L,getImages:H,getZoomedImage:C};return j}}));

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = () => {
  const mediaQuery = window.matchMedia('(max-width: 999px)');
  const $head = document.querySelector('.js-header');
  const $menu = $head.querySelector('.js-head-menu');
  const $nav = $menu?.querySelector('.js-nav');
  if (!$nav) return;
  const $logo = $head.querySelector('.header-logo');
  const navHTML = $nav.innerHTML;
  const iconDropdown = '<svg class="icon text-header-link w-7 h-7" viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="416" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="96" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>';
  const makeDropdown = () => {
    if (mediaQuery.matches) return;
    const submenuItems = [];
    while ($nav.offsetWidth + 64 > $menu.offsetWidth) {
      if ($nav.lastElementChild) {
        submenuItems.unshift($nav.lastElementChild);
        $nav.lastElementChild.remove();
      } else {
        break;
      }
    }
    if (!submenuItems.length) {
      // $head.classList.add('is-dropdown-loaded')
      return;
    }
    const toggle = document.createElement('li');
    toggle.setAttribute('class', 'dropdown is-hoverable cursor-pointer');
    // toggle.setAttribute('aria-label', 'More')
    toggle.innerHTML = iconDropdown;
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'dropdown-menu leading-snug whitespace-normal');
    const content = document.createElement('div');
    content.setAttribute('class', 'dropdown-content');
    submenuItems.forEach(function (child) {
      child.querySelector('a').classList.remove('text-header-link');
      child.querySelector('a').classList.add('py-2', 'px-3');
      content.appendChild(child);
    });
    wrapper.appendChild(content);
    toggle.appendChild(wrapper);
    $nav.appendChild(toggle);

    // $head.classList.add('is-dropdown-loaded')
    $menu.classList.remove('overflow-x-hidden');
  };
  makeDropdown();
  window.addEventListener('load', function () {
    // const image = $head.querySelector('.header-logo-img')
    // const isLoaded = image.complete && image.naturalHeight !== 0

    // if (isLoaded) {
    //   makeDropdown()
    // }

    if (!$logo) {
      makeDropdown();
    }
  });
  window.addEventListener('resize', function () {
    setTimeout(() => {
      $nav.innerHTML = navHTML;
      makeDropdown();
    }, 1);
  });
};
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _urlRegularExpression = _interopRequireDefault(require("./util/url-regular-expression"));
var _documentQuerySelectorAll = _interopRequireDefault(require("./util/document-query-selector-all"));
var _dropdown = _interopRequireDefault(require("./app/dropdown"));
/* global followSocialMedia localStorage */

// lib
// import 'lazysizes'

// import loadScript from './util/load-script'

const simplySetup = () => {
  const rootEl = document.documentElement;
  const documentBody = document.body;

  /* Menu DropDown
  /* ---------------------------------------------------------- */
  // const dropDownMenu = () => {
  //   if (typeof menuDropdown !== 'object' || menuDropdown === null) return
  //   const $dropdownMenu = document.querySelector('.js-dropdown-menu')
  //   if (!$dropdownMenu) return

  //   Object.entries(menuDropdown).forEach(([name, url]) => {
  //     if (name !== 'string' && !urlRegexp(url)) return

  //     const link = document.createElement('a')
  //     link.href = url
  //     link.classList = 'dropdown-item block py-2 leading-tight px-5 hover:text-primary'
  //     link.innerText = name

  //     $dropdownMenu.appendChild(link)
  //   })
  // }

  (0, _dropdown.default)();

  /* Social Media
  /* ---------------------------------------------------------- */
  const socialMedia = () => {
    // Checking if the variable exists and if it is an object
    if (typeof followSocialMedia !== 'object' || followSocialMedia === null) return;

    // check if the box for the menu exists
    const $socialMedia = (0, _documentQuerySelectorAll.default)('.js-social-media');
    if (!$socialMedia.length) return;
    const linkElement = element => {
      Object.entries(followSocialMedia).forEach(_ref => {
        let [name, urlTitle] = _ref;
        const url = urlTitle[0];

        // The url is being validated if it is false it returns
        if (!(0, _urlRegularExpression.default)(url)) return;
        const link = document.createElement('a');
        link.href = url;
        link.title = urlTitle[1];
        link.classList = 'p-2 inline-block hover:opacity-70';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `<svg class="icon"><use xlink:href="#icon-${name}"></use></svg>`;
        element.appendChild(link);
      });
    };
    $socialMedia.forEach(linkElement);
  };
  socialMedia();

  /*  Toggle modal
  /* ---------------------------------------------------------- */
  /*const simplyModal = () => {
    const $modals = docSelectorAll('.js-modal')
    const $modalButtons = docSelectorAll('.js-modal-button')
    const $modalCloses = docSelectorAll('.js-modal-close')
     // Modal Click Open
    if (!$modalButtons.length) return
    $modalButtons.forEach($el => $el.addEventListener('click', () => openModal($el.dataset.target)))
     // Modal Click Close
    if (!$modalCloses.length) return
    $modalCloses.forEach(el => el.addEventListener('click', () => closeModals()))
     const openModal = target => {
      documentBody.classList.remove('has-menu')
      const $target = document.getElementById(target)
      rootEl.classList.add('overflow-hidden')
      $target.classList.add('is-active')
    }
     const closeModals = () => {
      rootEl.classList.remove('overflow-hidden')
      $modals.forEach($el => $el.classList.remove('is-active'))
    }
     document.addEventListener('keydown', function (event) {
      const e = event || window.event
      if (e.keyCode === 27) {
        closeModals()
        // closeDropdowns()
      }
    })
  }
   simplyModal()
  */

  /* Header Transparency
  /* ---------------------------------------------------------- */
  const headerTransparency = () => {
    const hasCover = documentBody.closest('.has-cover');
    const $jsHeader = document.querySelector('.js-header');
    if (documentBody.classList.contains('is-head-stacked')) return;
    window.addEventListener('scroll', () => {
      const lastScrollY = window.scrollY;
      if (lastScrollY > 5) {
        $jsHeader.classList.add('shadow-header', 'header-bg');
      } else {
        $jsHeader.classList.remove('shadow-header', 'header-bg');
      }
      if (!hasCover) return;
      lastScrollY >= 20 ? documentBody.classList.remove('is-head-transparent') : documentBody.classList.add('is-head-transparent');
    }, {
      passive: true
    });
  };
  headerTransparency();

  /* Dark Mode
  /* ---------------------------------------------------------- */
  const darkMode = () => {
    const $toggleDarkMode = (0, _documentQuerySelectorAll.default)('.js-dark-mode');
    if (!$toggleDarkMode.length) return;
    $toggleDarkMode.forEach(item => item.addEventListener('click', function (event) {
      event.preventDefault();
      if (!rootEl.classList.contains('dark')) {
        rootEl.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        rootEl.classList.remove('dark');
        localStorage.theme = 'light';
      }
    }));
  };
  darkMode();

  /* DropDown Toggle
  /* ---------------------------------------------------------- */
  const dropDownMenuToggle = () => {
    const dropdowns = (0, _documentQuerySelectorAll.default)('.dropdown:not(.is-hoverable)');
    if (!dropdowns.length) return;
    dropdowns.forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.stopPropagation();
        el.classList.toggle('is-active');
        documentBody.classList.remove('has-menu');
      });
    });
    const closeDropdowns = () => dropdowns.forEach(function (el) {
      el.classList.remove('is-active');
    });
    document.addEventListener('click', closeDropdowns);
  };
  dropDownMenuToggle();

  /* Toggle Menu
  /* ---------------------------------------------------------- */
  document.querySelector('.js-menu-toggle').addEventListener('click', function (e) {
    e.preventDefault();
    documentBody.classList.toggle('has-menu');
  });
};
document.addEventListener('DOMContentLoaded', simplySetup);

},{"./app/dropdown":3,"./util/document-query-selector-all":6,"./util/url-regular-expression":8,"@babel/runtime/helpers/interopRequireDefault":1}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("./main");
var _mediumZoom = _interopRequireDefault(require("medium-zoom"));
var _loadScript = _interopRequireDefault(require("./util/load-script"));
var _documentQuerySelectorAll = _interopRequireDefault(require("./util/document-query-selector-all"));
/* global prismJs */

const simplyPost = () => {
  /* All Video Responsive
  /* ---------------------------------------------------------- */
  const videoResponsive = () => {
    const selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="dailymotion.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="player.twitch.tv"]', 'iframe[src*="kickstarter.com"][src*="video.html"]'];
    const $iframes = (0, _documentQuerySelectorAll.default)(selectors.join(','));
    if (!$iframes.length) return;
    $iframes.forEach(el => {
      el.classList.add('aspect-video', 'w-full');
      // const parentForVideo = document.createElement('div')
      // parentForVideo.className = 'video-responsive'
      // el.parentNode.insertBefore(parentForVideo, el)
      // parentForVideo.appendChild(el)
      el.removeAttribute('height');
      el.removeAttribute('width');
    });
  };
  videoResponsive();

  /* medium-zoom
  /* ---------------------------------------------------------- */
  const mediumZoomImg = () => {
    (0, _documentQuerySelectorAll.default)('.post-body img').forEach(el => !el.closest('a') && el.classList.add('simply-zoom'));
    (0, _mediumZoom.default)('.simply-zoom', {
      margin: 20,
      background: 'hsla(0,0%,100%,.85)'
    });
  };
  mediumZoomImg();

  /* Copy Link
  /* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText#examples
  /* ---------------------------------------------------------- */

  const copyLink = () => {
    const $links = (0, _documentQuerySelectorAll.default)('.js-copy-link');
    if (!$links.length) return;
    $links.forEach(item => item.addEventListener('click', function (event) {
      event.preventDefault();
      const shortLinkIndicator = item.querySelector('.shortlink-indicator');
      navigator.clipboard.writeText(item.href).then(() => {
        shortLinkIndicator.classList.remove('hidden');
      });
      setTimeout(() => shortLinkIndicator.classList.add('hidden'), 4000);
    }));
  };
  copyLink();

  /* Gallery Card
  /* ---------------------------------------------------------- */
  // const resizeImagesInGalleries = () => {
  //   const $galleryImg = docSelectorAll('.kg-gallery-image > img')

  //   if (!$galleryImg.length) return

  //   $galleryImg.forEach(image => {
  //     const container = image.closest('.kg-gallery-image')
  //     const width = image.attributes.width.value
  //     const height = image.attributes.height.value
  //     const ratio = width / height
  //     container.style.flex = ratio + ' 1 0%'
  //   })
  // }

  // resizeImagesInGalleries()

  /* highlight prismjs
  /* ---------------------------------------------------------- */
  if ((0, _documentQuerySelectorAll.default)('code[class*=language-]').length && typeof prismJs !== 'undefined') {
    (0, _loadScript.default)(prismJs);
  }
};
document.addEventListener('DOMContentLoaded', simplyPost);

},{"./main":4,"./util/document-query-selector-all":6,"./util/load-script":7,"@babel/runtime/helpers/interopRequireDefault":1,"medium-zoom":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = function _default(selector) {
  let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
};

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = (src, callback) => {
  const scriptElement = document.createElement('script');
  scriptElement.src = src;
  scriptElement.defer = true;
  scriptElement.async = true;
  callback && scriptElement.addEventListener('load', callback);
  document.body.appendChild(scriptElement);
};
exports.default = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = url => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/.test(url); //eslint-disable-line
exports.default = _default;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvbWVkaXVtLXpvb20vZGlzdC9tZWRpdW0tem9vbS5taW4uanMiLCJzcmMvanMvYXBwL2Ryb3Bkb3duLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvcG9zdC5qcyIsInNyYy9qcy91dGlsL2RvY3VtZW50LXF1ZXJ5LXNlbGVjdG9yLWFsbC5qcyIsInNyYy9qcy91dGlsL2xvYWQtc2NyaXB0LmpzIiwic3JjL2pzL3V0aWwvdXJsLXJlZ3VsYXItZXhwcmVzc2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7Ozs7Ozs7O2VDRmUsQ0FBQSxLQUFNO0VBQ25CLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUM7RUFFMUQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7RUFDbEQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFDbEQsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUM7RUFDNUMsSUFBSSxDQUFDLElBQUksRUFBRTtFQUVYLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO0VBRWpELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTO0VBRTlCLE1BQU0sWUFBWSxHQUFHLCtZQUErWTtFQUVwYSxNQUFNLFlBQVksR0FBRyxDQUFBLEtBQU07SUFDekIsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFO0lBRXhCLE1BQU0sWUFBWSxHQUFHLEVBQUU7SUFFdkIsT0FBUSxJQUFJLENB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QUNFLElBQUksSUFBQSxpQ0FBYyxFQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtJQUNyRixJQUFBLG1CQUFVLEVBQUMsT0FBTyxDQUFDO0VBQ3JCO0FBQ0YsQ0FBQztBQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUM7Ozs7Ozs7OztpQ0NyRzFDLFNBQUEsU0FBQyxRQUFRO0VBQUEsSUFBRSxNQUFNLEdBQUEsU0FBQSxDQUFBLE1BQUEsUUFBQSxTQUFBLFFBQUEsU0FBQSxHQUFBLFNBQUEsTUFBRyxRQUFRO0VBQUEsT0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUFBOzs7Ozs7Ozs7ZUNBakcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxLQUFLO0VBQ2hDLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQ3RELGFBQWEsQ0FBQyxHQUFHLEdBQUcsR0FBRztFQUN2QixhQUFhLENBQUMsS0FBSyxHQUFHLElBQUk7RUFDMUIsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJO0VBRTFCLFFBQVEsSUFBSSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztFQUM1RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFDMUMsQ0FBQztBQUFBLE9BQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQTs7Ozs7Ozs7O2VDUmMsR0FBRyxJQUFJLGtFQUFrRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQztBQUFBLE9BQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLyohIG1lZGl1bS16b29tIDEuMS4wIHwgTUlUIExpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb20gKi9cbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPWV8fHNlbGYpLm1lZGl1bVpvb209dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0xO3Q8YXJndW1lbnRzLmxlbmd0aDt0Kyspe3ZhciBvPWFyZ3VtZW50c1t0XTtmb3IodmFyIG4gaW4gbylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobyxuKSYmKGVbbl09b1tuXSl9cmV0dXJuIGV9LHQ9ZnVuY3Rpb24oZSl7cmV0dXJuXCJJTUdcIj09PWUudGFnTmFtZX0sbz1mdW5jdGlvbihlKXtyZXR1cm4gZSYmMT09PWUubm9kZVR5cGV9LG49ZnVuY3Rpb24oZSl7cmV0dXJuXCIuc3ZnXCI9PT0oZS5jdXJyZW50U3JjfHxlLnNyYykuc3Vic3RyKC00KS50b0xvd2VyQ2FzZSgpfSxpPWZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gQXJyYXkuaXNBcnJheShlKT9lLmZpbHRlcih0KTpmdW5jdGlvbihlKXtyZXR1cm4gTm9kZUxpc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoZSl9KGUpP1tdLnNsaWNlLmNhbGwoZSkuZmlsdGVyKHQpOm8oZSk/W2VdLmZpbHRlcih0KTpcInN0cmluZ1wiPT10eXBlb2YgZT9bXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZSkpLmZpbHRlcih0KTpbXX1jYXRjaChlKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHByb3ZpZGVkIHNlbGVjdG9yIGlzIGludmFsaWQuXFxuRXhwZWN0cyBhIENTUyBzZWxlY3RvciwgYSBOb2RlIGVsZW1lbnQsIGEgTm9kZUxpc3Qgb3IgYW4gYXJyYXkuXFxuU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb21cIil9fSxyPWZ1bmN0aW9uKGUpe3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIHQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLW92ZXJsYXlcIiksdC5zdHlsZS5iYWNrZ3JvdW5kPWUsdH0sZD1mdW5jdGlvbihlKXt2YXIgdD1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG89dC50b3Asbj10LmxlZnQsaT10LndpZHRoLHI9dC5oZWlnaHQsZD1lLmNsb25lTm9kZSgpLGE9d2luZG93LnBhZ2VZT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcHx8MCxtPXdpbmRvdy5wYWdlWE9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnR8fGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdHx8MDtyZXR1cm4gZC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKSxkLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIixkLnN0eWxlLnRvcD1vK2ErXCJweFwiLGQuc3R5bGUubGVmdD1uK20rXCJweFwiLGQuc3R5bGUud2lkdGg9aStcInB4XCIsZC5zdHlsZS5oZWlnaHQ9citcInB4XCIsZC5zdHlsZS50cmFuc2Zvcm09XCJcIixkfSxhPWZ1bmN0aW9uKHQsbyl7dmFyIG49ZSh7YnViYmxlczohMSxjYW5jZWxhYmxlOiExLGRldGFpbDp2b2lkIDB9LG8pO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudClyZXR1cm4gbmV3IEN1c3RvbUV2ZW50KHQsbik7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtyZXR1cm4gaS5pbml0Q3VzdG9tRXZlbnQodCxuLmJ1YmJsZXMsbi5jYW5jZWxhYmxlLG4uZGV0YWlsKSxpfTtyZXR1cm4gZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT10JiYodD17fSk7dmFyIG89dC5pbnNlcnRBdDtpZihlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQpe3ZhciBuPWRvY3VtZW50LmhlYWR8fGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtpLnR5cGU9XCJ0ZXh0L2Nzc1wiLFwidG9wXCI9PT1vJiZuLmZpcnN0Q2hpbGQ/bi5pbnNlcnRCZWZvcmUoaSxuLmZpcnN0Q2hpbGQpOm4uYXBwZW5kQ2hpbGQoaSksaS5zdHlsZVNoZWV0P2kuc3R5bGVTaGVldC5jc3NUZXh0PWU6aS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlKSl9fShcIi5tZWRpdW0tem9vbS1vdmVybGF5e3Bvc2l0aW9uOmZpeGVkO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzO3dpbGwtY2hhbmdlOm9wYWNpdHl9Lm1lZGl1bS16b29tLS1vcGVuZWQgLm1lZGl1bS16b29tLW92ZXJsYXl7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20tb3V0O29wYWNpdHk6MX0ubWVkaXVtLXpvb20taW1hZ2V7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20taW47dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzIGN1YmljLWJlemllciguMiwwLC4yLDEpIWltcG9ydGFudH0ubWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlbnt2aXNpYmlsaXR5OmhpZGRlbn0ubWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZHtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjtjdXJzb3I6em9vbS1vdXQ7d2lsbC1jaGFuZ2U6dHJhbnNmb3JtfVwiKSxmdW5jdGlvbiB0KG0pe3ZhciBsPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxjPXdpbmRvdy5Qcm9taXNlfHxmdW5jdGlvbihlKXtmdW5jdGlvbiB0KCl7fWUodCx0KX0sdT1mdW5jdGlvbihlKXt2YXIgdD1lLnRhcmdldDt0IT09Tj8tMSE9PXguaW5kZXhPZih0KSYmdyh7dGFyZ2V0OnR9KTpFKCl9LHM9ZnVuY3Rpb24oKXtpZighQSYmay5vcmlnaW5hbCl7dmFyIGU9d2luZG93LnBhZ2VZT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcHx8MDtNYXRoLmFicyhTLWUpPlQuc2Nyb2xsT2Zmc2V0JiZzZXRUaW1lb3V0KEUsMTUwKX19LGY9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5rZXl8fGUua2V5Q29kZTtcIkVzY2FwZVwiIT09dCYmXCJFc2NcIiE9PXQmJjI3IT09dHx8RSgpfSxwPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LG49dDtpZih0LmJhY2tncm91bmQmJihOLnN0eWxlLmJhY2tncm91bmQ9dC5iYWNrZ3JvdW5kKSx0LmNvbnRhaW5lciYmdC5jb250YWluZXIgaW5zdGFuY2VvZiBPYmplY3QmJihuLmNvbnRhaW5lcj1lKHt9LFQuY29udGFpbmVyLHQuY29udGFpbmVyKSksdC50ZW1wbGF0ZSl7dmFyIGk9byh0LnRlbXBsYXRlKT90LnRlbXBsYXRlOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodC50ZW1wbGF0ZSk7bi50ZW1wbGF0ZT1pfXJldHVybiBUPWUoe30sVCxuKSx4LmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuZGlzcGF0Y2hFdmVudChhKFwibWVkaXVtLXpvb206dXBkYXRlXCIse2RldGFpbDp7em9vbTpqfX0pKX0pKSxqfSxnPWZ1bmN0aW9uKCl7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9O3JldHVybiB0KGUoe30sVCxvKSl9LHY9ZnVuY3Rpb24oKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCx0PUFycmF5KGUpLG89MDtvPGU7bysrKXRbb109YXJndW1lbnRzW29dO3ZhciBuPXQucmVkdWNlKChmdW5jdGlvbihlLHQpe3JldHVybltdLmNvbmNhdChlLGkodCkpfSksW10pO3JldHVybiBuLmZpbHRlcigoZnVuY3Rpb24oZSl7cmV0dXJuLTE9PT14LmluZGV4T2YoZSl9KSkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7eC5wdXNoKGUpLGUuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlXCIpfSkpLE8uZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIHQ9ZS50eXBlLG89ZS5saXN0ZW5lcixpPWUub3B0aW9ucztuLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuYWRkRXZlbnRMaXN0ZW5lcih0LG8saSl9KSl9KSksan0saD1mdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9QXJyYXkoZSksbz0wO288ZTtvKyspdFtvXT1hcmd1bWVudHNbb107ay56b29tZWQmJkUoKTt2YXIgbj10Lmxlbmd0aD4wP3QucmVkdWNlKChmdW5jdGlvbihlLHQpe3JldHVybltdLmNvbmNhdChlLGkodCkpfSksW10pOng7cmV0dXJuIG4uZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20taW1hZ2VcIiksZS5kaXNwYXRjaEV2ZW50KGEoXCJtZWRpdW0tem9vbTpkZXRhY2hcIix7ZGV0YWlsOnt6b29tOmp9fSkpfSkpLHg9eC5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVybi0xPT09bi5pbmRleE9mKGUpfSkpLGp9LHo9ZnVuY3Rpb24oZSx0KXt2YXIgbz1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06e307cmV0dXJuIHguZm9yRWFjaCgoZnVuY3Rpb24obil7bi5hZGRFdmVudExpc3RlbmVyKFwibWVkaXVtLXpvb206XCIrZSx0LG8pfSkpLE8ucHVzaCh7dHlwZTpcIm1lZGl1bS16b29tOlwiK2UsbGlzdGVuZXI6dCxvcHRpb25zOm99KSxqfSx5PWZ1bmN0aW9uKGUsdCl7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOnt9O3JldHVybiB4LmZvckVhY2goKGZ1bmN0aW9uKG4pe24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lZGl1bS16b29tOlwiK2UsdCxvKX0pKSxPPU8uZmlsdGVyKChmdW5jdGlvbihvKXtyZXR1cm4hKG8udHlwZT09PVwibWVkaXVtLXpvb206XCIrZSYmby5saXN0ZW5lci50b1N0cmluZygpPT09dC50b1N0cmluZygpKX0pKSxqfSxiPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LGk9dC50YXJnZXQscj1mdW5jdGlvbigpe3ZhciB0PXt3aWR0aDpkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsaGVpZ2h0OmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsbGVmdDowLHRvcDowLHJpZ2h0OjAsYm90dG9tOjB9LGk9dm9pZCAwLHI9dm9pZCAwO2lmKFQuY29udGFpbmVyKWlmKFQuY29udGFpbmVyIGluc3RhbmNlb2YgT2JqZWN0KWk9KHQ9ZSh7fSx0LFQuY29udGFpbmVyKSkud2lkdGgtdC5sZWZ0LXQucmlnaHQtMipULm1hcmdpbixyPXQuaGVpZ2h0LXQudG9wLXQuYm90dG9tLTIqVC5tYXJnaW47ZWxzZXt2YXIgZD0obyhULmNvbnRhaW5lcik/VC5jb250YWluZXI6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihULmNvbnRhaW5lcikpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGE9ZC53aWR0aCxtPWQuaGVpZ2h0LGw9ZC5sZWZ0LGM9ZC50b3A7dD1lKHt9LHQse3dpZHRoOmEsaGVpZ2h0Om0sbGVmdDpsLHRvcDpjfSl9aT1pfHx0LndpZHRoLTIqVC5tYXJnaW4scj1yfHx0LmhlaWdodC0yKlQubWFyZ2luO3ZhciB1PWsuem9vbWVkSGR8fGsub3JpZ2luYWwscz1uKHUpP2k6dS5uYXR1cmFsV2lkdGh8fGksZj1uKHUpP3I6dS5uYXR1cmFsSGVpZ2h0fHxyLHA9dS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxnPXAudG9wLHY9cC5sZWZ0LGg9cC53aWR0aCx6PXAuaGVpZ2h0LHk9TWF0aC5taW4oTWF0aC5tYXgoaCxzKSxpKS9oLGI9TWF0aC5taW4oTWF0aC5tYXgoeixmKSxyKS96LEU9TWF0aC5taW4oeSxiKSx3PVwic2NhbGUoXCIrRStcIikgdHJhbnNsYXRlM2QoXCIrKChpLWgpLzItditULm1hcmdpbit0LmxlZnQpL0UrXCJweCwgXCIrKChyLXopLzItZytULm1hcmdpbit0LnRvcCkvRStcInB4LCAwKVwiO2suem9vbWVkLnN0eWxlLnRyYW5zZm9ybT13LGsuem9vbWVkSGQmJihrLnpvb21lZEhkLnN0eWxlLnRyYW5zZm9ybT13KX07cmV0dXJuIG5ldyBjKChmdW5jdGlvbihlKXtpZihpJiYtMT09PXguaW5kZXhPZihpKSllKGopO2Vsc2V7aWYoay56b29tZWQpZShqKTtlbHNle2lmKGkpay5vcmlnaW5hbD1pO2Vsc2V7aWYoISh4Lmxlbmd0aD4wKSlyZXR1cm4gdm9pZCBlKGopO3ZhciB0PXg7ay5vcmlnaW5hbD10WzBdfWlmKGsub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChhKFwibWVkaXVtLXpvb206b3BlblwiLHtkZXRhaWw6e3pvb206an19KSksUz13aW5kb3cucGFnZVlPZmZzZXR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B8fGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wfHwwLEE9ITAsay56b29tZWQ9ZChrLm9yaWdpbmFsKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKE4pLFQudGVtcGxhdGUpe3ZhciBuPW8oVC50ZW1wbGF0ZSk/VC50ZW1wbGF0ZTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFQudGVtcGxhdGUpO2sudGVtcGxhdGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxrLnRlbXBsYXRlLmFwcGVuZENoaWxkKG4uY29udGVudC5jbG9uZU5vZGUoITApKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGsudGVtcGxhdGUpfWlmKGsub3JpZ2luYWwucGFyZW50RWxlbWVudCYmXCJQSUNUVVJFXCI9PT1rLm9yaWdpbmFsLnBhcmVudEVsZW1lbnQudGFnTmFtZSYmay5vcmlnaW5hbC5jdXJyZW50U3JjJiYoay56b29tZWQuc3JjPWsub3JpZ2luYWwuY3VycmVudFNyYyksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChrLnpvb21lZCksd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS0tb3BlbmVkXCIpfSkpLGsub3JpZ2luYWwuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1oaWRkZW5cIiksay56b29tZWQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksay56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsRSksay56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwoZnVuY3Rpb24gdCgpe0E9ITEsay56b29tZWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIix0KSxrLm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQoYShcIm1lZGl1bS16b29tOm9wZW5lZFwiLHtkZXRhaWw6e3pvb206an19KSksZShqKX0pKSxrLm9yaWdpbmFsLmdldEF0dHJpYnV0ZShcImRhdGEtem9vbS1zcmNcIikpe2suem9vbWVkSGQ9ay56b29tZWQuY2xvbmVOb2RlKCksay56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNzZXRcIiksay56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzaXplc1wiKSxrLnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcImxvYWRpbmdcIiksay56b29tZWRIZC5zcmM9ay56b29tZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS16b29tLXNyY1wiKSxrLnpvb21lZEhkLm9uZXJyb3I9ZnVuY3Rpb24oKXtjbGVhckludGVydmFsKG0pLGNvbnNvbGUud2FybihcIlVuYWJsZSB0byByZWFjaCB0aGUgem9vbSBpbWFnZSB0YXJnZXQgXCIray56b29tZWRIZC5zcmMpLGsuem9vbWVkSGQ9bnVsbCxyKCl9O3ZhciBtPXNldEludGVydmFsKChmdW5jdGlvbigpe2suem9vbWVkSGQuY29tcGxldGUmJihjbGVhckludGVydmFsKG0pLGsuem9vbWVkSGQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksay56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixFKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGsuem9vbWVkSGQpLHIoKSl9KSwxMCl9ZWxzZSBpZihrLm9yaWdpbmFsLmhhc0F0dHJpYnV0ZShcInNyY3NldFwiKSl7ay56b29tZWRIZD1rLnpvb21lZC5jbG9uZU5vZGUoKSxrLnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcInNpemVzXCIpLGsuem9vbWVkSGQucmVtb3ZlQXR0cmlidXRlKFwibG9hZGluZ1wiKTt2YXIgbD1rLnpvb21lZEhkLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsKGZ1bmN0aW9uKCl7ay56b29tZWRIZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGwpLGsuem9vbWVkSGQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksay56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixFKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGsuem9vbWVkSGQpLHIoKX0pKX1lbHNlIHIoKX19fSkpfSxFPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBjKChmdW5jdGlvbihlKXtpZighQSYmay5vcmlnaW5hbCl7QT0hMCxkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtZWRpdW0tem9vbS0tb3BlbmVkXCIpLGsuem9vbWVkLnN0eWxlLnRyYW5zZm9ybT1cIlwiLGsuem9vbWVkSGQmJihrLnpvb21lZEhkLnN0eWxlLnRyYW5zZm9ybT1cIlwiKSxrLnRlbXBsYXRlJiYoay50ZW1wbGF0ZS5zdHlsZS50cmFuc2l0aW9uPVwib3BhY2l0eSAxNTBtc1wiLGsudGVtcGxhdGUuc3R5bGUub3BhY2l0eT0wKSxrLm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQoYShcIm1lZGl1bS16b29tOmNsb3NlXCIse2RldGFpbDp7em9vbTpqfX0pKSxrLnpvb21lZC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLChmdW5jdGlvbiB0KCl7ay5vcmlnaW5hbC5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlblwiKSxkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGsuem9vbWVkKSxrLnpvb21lZEhkJiZkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGsuem9vbWVkSGQpLGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoTiksay56b29tZWQuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksay50ZW1wbGF0ZSYmZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChrLnRlbXBsYXRlKSxBPSExLGsuem9vbWVkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsdCksay5vcmlnaW5hbC5kaXNwYXRjaEV2ZW50KGEoXCJtZWRpdW0tem9vbTpjbG9zZWRcIix7ZGV0YWlsOnt6b29tOmp9fSkpLGsub3JpZ2luYWw9bnVsbCxrLnpvb21lZD1udWxsLGsuem9vbWVkSGQ9bnVsbCxrLnRlbXBsYXRlPW51bGwsZShqKX0pKX1lbHNlIGUoail9KSl9LHc9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1lLnRhcmdldDtyZXR1cm4gay5vcmlnaW5hbD9FKCk6Yih7dGFyZ2V0OnR9KX0sTD1mdW5jdGlvbigpe3JldHVybiBUfSxIPWZ1bmN0aW9uKCl7cmV0dXJuIHh9LEM9ZnVuY3Rpb24oKXtyZXR1cm4gay5vcmlnaW5hbH0seD1bXSxPPVtdLEE9ITEsUz0wLFQ9bCxrPXtvcmlnaW5hbDpudWxsLHpvb21lZDpudWxsLHpvb21lZEhkOm51bGwsdGVtcGxhdGU6bnVsbH07XCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtKT9UPW06KG18fFwic3RyaW5nXCI9PXR5cGVvZiBtKSYmdihtKSxUPWUoe21hcmdpbjowLGJhY2tncm91bmQ6XCIjZmZmXCIsc2Nyb2xsT2Zmc2V0OjQwLGNvbnRhaW5lcjpudWxsLHRlbXBsYXRlOm51bGx9LFQpO3ZhciBOPXIoVC5iYWNrZ3JvdW5kKTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix1KSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixmKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIscyksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixFKTt2YXIgaj17b3BlbjpiLGNsb3NlOkUsdG9nZ2xlOncsdXBkYXRlOnAsY2xvbmU6ZyxhdHRhY2g6dixkZXRhY2g6aCxvbjp6LG9mZjp5LGdldE9wdGlvbnM6TCxnZXRJbWFnZXM6SCxnZXRab29tZWRJbWFnZTpDfTtyZXR1cm4gan19KSk7XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IG1lZGlhUXVlcnkgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogOTk5cHgpJylcblxuICBjb25zdCAkaGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1oZWFkZXInKVxuICBjb25zdCAkbWVudSA9ICRoZWFkLnF1ZXJ5U2VsZWN0b3IoJy5qcy1oZWFkLW1lbnUnKVxuICBjb25zdCAkbmF2ID0gJG1lbnU/LnF1ZXJ5U2VsZWN0b3IoJy5qcy1uYXYnKVxuICBpZiAoISRuYXYpIHJldHVyblxuXG4gIGNvbnN0ICRsb2dvID0gJGhlYWQucXVlcnlTZWxlY3RvcignLmhlYWRlci1sb2dvJylcblxuICBjb25zdCBuYXZIVE1MID0gJG5hdi5pbm5lckhUTUxcblxuICBjb25zdCBpY29uRHJvcGRvd24gPSAnPHN2ZyBjbGFzcz1cImljb24gdGV4dC1oZWFkZXItbGluayB3LTcgaC03XCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PGNpcmNsZSBjeD1cIjI1NlwiIGN5PVwiMjU2XCIgcj1cIjMyXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLXdpZHRoPVwiMzJcIi8+PGNpcmNsZSBjeD1cIjQxNlwiIGN5PVwiMjU2XCIgcj1cIjMyXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLXdpZHRoPVwiMzJcIi8+PGNpcmNsZSBjeD1cIjk2XCIgY3k9XCIyNTZcIiByPVwiMzJcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBzdHJva2Utd2lkdGg9XCIzMlwiLz48L3N2Zz4nXG5cbiAgY29uc3QgbWFrZURyb3Bkb3duID0gKCkgPT4ge1xuICAgIGlmIChtZWRpYVF1ZXJ5Lm1hdGNoZXMpIHJldHVyblxuXG4gICAgY29uc3Qgc3VibWVudUl0ZW1zID0gW11cblxuICAgIHdoaWxlICgoJG5hdi5vZmZzZXRXaWR0aCArIDY0KSA+ICRtZW51Lm9mZnNldFdpZHRoKSB7XG4gICAgICBpZiAoJG5hdi5sYXN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgIHN1Ym1lbnVJdGVtcy51bnNoaWZ0KCRuYXYubGFzdEVsZW1lbnRDaGlsZClcbiAgICAgICAgJG5hdi5sYXN0RWxlbWVudENoaWxkLnJlbW92ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc3VibWVudUl0ZW1zLmxlbmd0aCkge1xuICAgICAgLy8gJGhlYWQuY2xhc3NMaXN0LmFkZCgnaXMtZHJvcGRvd24tbG9hZGVkJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICB0b2dnbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkcm9wZG93biBpcy1ob3ZlcmFibGUgY3Vyc29yLXBvaW50ZXInKVxuICAgIC8vIHRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnTW9yZScpXG4gICAgdG9nZ2xlLmlubmVySFRNTCA9IGljb25Ecm9wZG93blxuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Ryb3Bkb3duLW1lbnUgbGVhZGluZy1zbnVnIHdoaXRlc3BhY2Utbm9ybWFsJylcblxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkcm9wZG93bi1jb250ZW50JylcblxuICAgIHN1Ym1lbnVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgY2hpbGQucXVlcnlTZWxlY3RvcignYScpLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtaGVhZGVyLWxpbmsnKVxuICAgICAgY2hpbGQucXVlcnlTZWxlY3RvcignYScpLmNsYXNzTGlzdC5hZGQoJ3B5LTInLCAncHgtMycpXG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG5cbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGNvbnRlbnQpXG4gICAgdG9nZ2xlLmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgJG5hdi5hcHBlbmRDaGlsZCh0b2dnbGUpXG5cbiAgICAvLyAkaGVhZC5jbGFzc0xpc3QuYWRkKCdpcy1kcm9wZG93bi1sb2FkZWQnKVxuICAgICRtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJmbG93LXgtaGlkZGVuJylcbiAgfVxuXG4gIG1ha2VEcm9wZG93bigpXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gY29uc3QgaW1hZ2UgPSAkaGVhZC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLWxvZ28taW1nJylcbiAgICAvLyBjb25zdCBpc0xvYWRlZCA9IGltYWdlLmNvbXBsZXRlICYmIGltYWdlLm5hdHVyYWxIZWlnaHQgIT09IDBcblxuICAgIC8vIGlmIChpc0xvYWRlZCkge1xuICAgIC8vICAgbWFrZURyb3Bkb3duKClcbiAgICAvLyB9XG5cbiAgICBpZiAoISRsb2dvKSB7XG4gICAgICBtYWtlRHJvcGRvd24oKVxuICAgIH1cbiAgfSlcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgJG5hdi5pbm5lckhUTUwgPSBuYXZIVE1MXG4gICAgICBtYWtlRHJvcGRvd24oKVxuICAgIH0sIDEpXG4gIH0pXG59XG4iLCIvKiBnbG9iYWwgZm9sbG93U29jaWFsTWVkaWEgbG9jYWxTdG9yYWdlICovXG5cbi8vIGxpYlxuLy8gaW1wb3J0ICdsYXp5c2l6ZXMnXG5cbi8vIGltcG9ydCBsb2FkU2NyaXB0IGZyb20gJy4vdXRpbC9sb2FkLXNjcmlwdCdcbmltcG9ydCB1cmxSZWdleHAgZnJvbSAnLi91dGlsL3VybC1yZWd1bGFyLWV4cHJlc3Npb24nXG5pbXBvcnQgZG9jU2VsZWN0b3JBbGwgZnJvbSAnLi91dGlsL2RvY3VtZW50LXF1ZXJ5LXNlbGVjdG9yLWFsbCdcblxuaW1wb3J0IGRyb3BEb3duTWVudSBmcm9tICcuL2FwcC9kcm9wZG93bidcblxuY29uc3Qgc2ltcGx5U2V0dXAgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICBjb25zdCBkb2N1bWVudEJvZHkgPSBkb2N1bWVudC5ib2R5XG5cbiAgLyogTWVudSBEcm9wRG93blxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8vIGNvbnN0IGRyb3BEb3duTWVudSA9ICgpID0+IHtcbiAgLy8gICBpZiAodHlwZW9mIG1lbnVEcm9wZG93biAhPT0gJ29iamVjdCcgfHwgbWVudURyb3Bkb3duID09PSBudWxsKSByZXR1cm5cbiAgLy8gICBjb25zdCAkZHJvcGRvd25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWRyb3Bkb3duLW1lbnUnKVxuICAvLyAgIGlmICghJGRyb3Bkb3duTWVudSkgcmV0dXJuXG5cbiAgLy8gICBPYmplY3QuZW50cmllcyhtZW51RHJvcGRvd24pLmZvckVhY2goKFtuYW1lLCB1cmxdKSA9PiB7XG4gIC8vICAgICBpZiAobmFtZSAhPT0gJ3N0cmluZycgJiYgIXVybFJlZ2V4cCh1cmwpKSByZXR1cm5cblxuICAvLyAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAvLyAgICAgbGluay5ocmVmID0gdXJsXG4gIC8vICAgICBsaW5rLmNsYXNzTGlzdCA9ICdkcm9wZG93bi1pdGVtIGJsb2NrIHB5LTIgbGVhZGluZy10aWdodCBweC01IGhvdmVyOnRleHQtcHJpbWFyeSdcbiAgLy8gICAgIGxpbmsuaW5uZXJUZXh0ID0gbmFtZVxuXG4gIC8vICAgICAkZHJvcGRvd25NZW51LmFwcGVuZENoaWxkKGxpbmspXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIGRyb3BEb3duTWVudSgpXG5cbiAgLyogU29jaWFsIE1lZGlhXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgY29uc3Qgc29jaWFsTWVkaWEgPSAoKSA9PiB7XG4gICAgLy8gQ2hlY2tpbmcgaWYgdGhlIHZhcmlhYmxlIGV4aXN0cyBhbmQgaWYgaXQgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBmb2xsb3dTb2NpYWxNZWRpYSAhPT0gJ29iamVjdCcgfHwgZm9sbG93U29jaWFsTWVkaWEgPT09IG51bGwpIHJldHVyblxuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGJveCBmb3IgdGhlIG1lbnUgZXhpc3RzXG4gICAgY29uc3QgJHNvY2lhbE1lZGlhID0gZG9jU2VsZWN0b3JBbGwoJy5qcy1zb2NpYWwtbWVkaWEnKVxuICAgIGlmICghJHNvY2lhbE1lZGlhLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBjb25zdCBsaW5rRWxlbWVudCA9IGVsZW1lbnQgPT4ge1xuICAgICAgT2JqZWN0LmVudHJpZXMoZm9sbG93U29jaWFsTWVkaWEpLmZvckVhY2goKFtuYW1lLCB1cmxUaXRsZV0pID0+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdXJsVGl0bGVbMF1cblxuICAgICAgICAvLyBUaGUgdXJsIGlzIGJlaW5nIHZhbGlkYXRlZCBpZiBpdCBpcyBmYWxzZSBpdCByZXR1cm5zXG4gICAgICAgIGlmICghdXJsUmVnZXhwKHVybCkpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgbGluay5ocmVmID0gdXJsXG4gICAgICAgIGxpbmsudGl0bGUgPSB1cmxUaXRsZVsxXVxuICAgICAgICBsaW5rLmNsYXNzTGlzdCA9ICdwLTIgaW5saW5lLWJsb2NrIGhvdmVyOm9wYWNpdHktNzAnXG4gICAgICAgIGxpbmsudGFyZ2V0ID0gJ19ibGFuaydcbiAgICAgICAgbGluay5yZWwgPSAnbm9vcGVuZXIgbm9yZWZlcnJlcidcbiAgICAgICAgbGluay5pbm5lckhUTUwgPSBgPHN2ZyBjbGFzcz1cImljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi0ke25hbWV9XCI+PC91c2U+PC9zdmc+YFxuXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobGluaylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgJHNvY2lhbE1lZGlhLmZvckVhY2gobGlua0VsZW1lbnQpXG4gIH1cblxuICBzb2NpYWxNZWRpYSgpXG5cbiAgLyogIFRvZ2dsZSBtb2RhbFxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qY29uc3Qgc2ltcGx5TW9kYWwgPSAoKSA9PiB7XG4gICAgY29uc3QgJG1vZGFscyA9IGRvY1NlbGVjdG9yQWxsKCcuanMtbW9kYWwnKVxuICAgIGNvbnN0ICRtb2RhbEJ1dHRvbnMgPSBkb2NTZWxlY3RvckFsbCgnLmpzLW1vZGFsLWJ1dHRvbicpXG4gICAgY29uc3QgJG1vZGFsQ2xvc2VzID0gZG9jU2VsZWN0b3JBbGwoJy5qcy1tb2RhbC1jbG9zZScpXG5cbiAgICAvLyBNb2RhbCBDbGljayBPcGVuXG4gICAgaWYgKCEkbW9kYWxCdXR0b25zLmxlbmd0aCkgcmV0dXJuXG4gICAgJG1vZGFsQnV0dG9ucy5mb3JFYWNoKCRlbCA9PiAkZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBvcGVuTW9kYWwoJGVsLmRhdGFzZXQudGFyZ2V0KSkpXG5cbiAgICAvLyBNb2RhbCBDbGljayBDbG9zZVxuICAgIGlmICghJG1vZGFsQ2xvc2VzLmxlbmd0aCkgcmV0dXJuXG4gICAgJG1vZGFsQ2xvc2VzLmZvckVhY2goZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZU1vZGFscygpKSlcblxuICAgIGNvbnN0IG9wZW5Nb2RhbCA9IHRhcmdldCA9PiB7XG4gICAgICBkb2N1bWVudEJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLW1lbnUnKVxuICAgICAgY29uc3QgJHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldClcbiAgICAgIHJvb3RFbC5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy1oaWRkZW4nKVxuICAgICAgJHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlTW9kYWxzID0gKCkgPT4ge1xuICAgICAgcm9vdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJmbG93LWhpZGRlbicpXG4gICAgICAkbW9kYWxzLmZvckVhY2goJGVsID0+ICRlbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKSlcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjb25zdCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICBjbG9zZU1vZGFscygpXG4gICAgICAgIC8vIGNsb3NlRHJvcGRvd25zKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2ltcGx5TW9kYWwoKVxuICAqL1xuXG4gIC8qIEhlYWRlciBUcmFuc3BhcmVuY3lcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBjb25zdCBoZWFkZXJUcmFuc3BhcmVuY3kgPSAoKSA9PiB7XG4gICAgY29uc3QgaGFzQ292ZXIgPSBkb2N1bWVudEJvZHkuY2xvc2VzdCgnLmhhcy1jb3ZlcicpXG4gICAgY29uc3QgJGpzSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWhlYWRlcicpXG5cbiAgICBpZiAoZG9jdW1lbnRCb2R5LmNsYXNzTGlzdC5jb250YWlucygnaXMtaGVhZC1zdGFja2VkJykpIHJldHVyblxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGxhc3RTY3JvbGxZID0gd2luZG93LnNjcm9sbFlcblxuICAgICAgaWYgKGxhc3RTY3JvbGxZID4gNSkge1xuICAgICAgICAkanNIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2hhZG93LWhlYWRlcicsICdoZWFkZXItYmcnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGpzSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWRvdy1oZWFkZXInLCAnaGVhZGVyLWJnJylcbiAgICAgIH1cblxuICAgICAgaWYgKCFoYXNDb3ZlcikgcmV0dXJuXG5cbiAgICAgIGxhc3RTY3JvbGxZID49IDIwID8gZG9jdW1lbnRCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhlYWQtdHJhbnNwYXJlbnQnKSA6IGRvY3VtZW50Qm9keS5jbGFzc0xpc3QuYWRkKCdpcy1oZWFkLXRyYW5zcGFyZW50JylcbiAgICB9LCB7IHBhc3NpdmU6IHRydWUgfSlcbiAgfVxuXG4gIGhlYWRlclRyYW5zcGFyZW5jeSgpXG5cbiAgLyogRGFyayBNb2RlXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgY29uc3QgZGFya01vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgJHRvZ2dsZURhcmtNb2RlID0gZG9jU2VsZWN0b3JBbGwoJy5qcy1kYXJrLW1vZGUnKVxuXG4gICAgaWYgKCEkdG9nZ2xlRGFya01vZGUubGVuZ3RoKSByZXR1cm5cblxuICAgICR0b2dnbGVEYXJrTW9kZS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBpZiAoIXJvb3RFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2RhcmsnKSkge1xuICAgICAgICByb290RWwuY2xhc3NMaXN0LmFkZCgnZGFyaycpXG4gICAgICAgIGxvY2FsU3RvcmFnZS50aGVtZSA9ICdkYXJrJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKVxuICAgICAgICBsb2NhbFN0b3JhZ2UudGhlbWUgPSAnbGlnaHQnXG4gICAgICB9XG4gICAgfSkpXG4gIH1cblxuICBkYXJrTW9kZSgpXG5cbiAgLyogRHJvcERvd24gVG9nZ2xlXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgY29uc3QgZHJvcERvd25NZW51VG9nZ2xlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRyb3Bkb3ducyA9IGRvY1NlbGVjdG9yQWxsKCcuZHJvcGRvd246bm90KC5pcy1ob3ZlcmFibGUpJylcblxuICAgIGlmICghZHJvcGRvd25zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBkcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXG4gICAgICAgIGRvY3VtZW50Qm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtbWVudScpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBjb25zdCBjbG9zZURyb3Bkb3ducyA9ICgpID0+IGRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZURyb3Bkb3ducylcbiAgfVxuXG4gIGRyb3BEb3duTWVudVRvZ2dsZSgpXG5cbiAgLyogVG9nZ2xlIE1lbnVcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudS10b2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZG9jdW1lbnRCb2R5LmNsYXNzTGlzdC50b2dnbGUoJ2hhcy1tZW51JylcbiAgfSlcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNpbXBseVNldHVwKVxuIiwiLyogZ2xvYmFsIHByaXNtSnMgKi9cclxuXHJcbmltcG9ydCAnLi9tYWluJ1xyXG5cclxuaW1wb3J0IG1lZGl1bVpvb20gZnJvbSAnbWVkaXVtLXpvb20nXHJcblxyXG5pbXBvcnQgbG9hZFNjcmlwdCBmcm9tICcuL3V0aWwvbG9hZC1zY3JpcHQnXHJcbmltcG9ydCBkb2NTZWxlY3RvckFsbCBmcm9tICcuL3V0aWwvZG9jdW1lbnQtcXVlcnktc2VsZWN0b3ItYWxsJ1xyXG5cclxuY29uc3Qgc2ltcGx5UG9zdCA9ICgpID0+IHtcclxuICAvKiBBbGwgVmlkZW8gUmVzcG9uc2l2ZVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBjb25zdCB2aWRlb1Jlc3BvbnNpdmUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBbXHJcbiAgICAgICdpZnJhbWVbc3JjKj1cInBsYXllci52aW1lby5jb21cIl0nLFxyXG4gICAgICAnaWZyYW1lW3NyYyo9XCJkYWlseW1vdGlvbi5jb21cIl0nLFxyXG4gICAgICAnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLmNvbVwiXScsXHJcbiAgICAgICdpZnJhbWVbc3JjKj1cInlvdXR1YmUtbm9jb29raWUuY29tXCJdJyxcclxuICAgICAgJ2lmcmFtZVtzcmMqPVwicGxheWVyLnR3aXRjaC50dlwiXScsXHJcbiAgICAgICdpZnJhbWVbc3JjKj1cImtpY2tzdGFydGVyLmNvbVwiXVtzcmMqPVwidmlkZW8uaHRtbFwiXSdcclxuICAgIF1cclxuXHJcbiAgICBjb25zdCAkaWZyYW1lcyA9IGRvY1NlbGVjdG9yQWxsKHNlbGVjdG9ycy5qb2luKCcsJykpXHJcblxyXG4gICAgaWYgKCEkaWZyYW1lcy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgICRpZnJhbWVzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdhc3BlY3QtdmlkZW8nLCAndy1mdWxsJylcclxuICAgICAgLy8gY29uc3QgcGFyZW50Rm9yVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAvLyBwYXJlbnRGb3JWaWRlby5jbGFzc05hbWUgPSAndmlkZW8tcmVzcG9uc2l2ZSdcclxuICAgICAgLy8gZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocGFyZW50Rm9yVmlkZW8sIGVsKVxyXG4gICAgICAvLyBwYXJlbnRGb3JWaWRlby5hcHBlbmRDaGlsZChlbClcclxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdoZWlnaHQnKVxyXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3dpZHRoJylcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICB2aWRlb1Jlc3BvbnNpdmUoKVxyXG5cclxuICAvKiBtZWRpdW0tem9vbVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBjb25zdCBtZWRpdW1ab29tSW1nID0gKCkgPT4ge1xyXG4gICAgZG9jU2VsZWN0b3JBbGwoJy5wb3N0LWJvZHkgaW1nJykuZm9yRWFjaChlbCA9PiAhZWwuY2xvc2VzdCgnYScpICYmIGVsLmNsYXNzTGlzdC5hZGQoJ3NpbXBseS16b29tJykpXHJcblxyXG4gICAgbWVkaXVtWm9vbSgnLnNpbXBseS16b29tJywge1xyXG4gICAgICBtYXJnaW46IDIwLFxyXG4gICAgICBiYWNrZ3JvdW5kOiAnaHNsYSgwLDAlLDEwMCUsLjg1KSdcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBtZWRpdW1ab29tSW1nKClcclxuXHJcbiAgLyogQ29weSBMaW5rXHJcbiAgLyogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NsaXBib2FyZC93cml0ZVRleHQjZXhhbXBsZXNcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gIGNvbnN0IGNvcHlMaW5rID0gKCkgPT4ge1xyXG4gICAgY29uc3QgJGxpbmtzID0gZG9jU2VsZWN0b3JBbGwoJy5qcy1jb3B5LWxpbmsnKVxyXG5cclxuICAgIGlmICghJGxpbmtzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgJGxpbmtzLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgIGNvbnN0IHNob3J0TGlua0luZGljYXRvciA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnNob3J0bGluay1pbmRpY2F0b3InKVxyXG5cclxuICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoaXRlbS5ocmVmKS50aGVuKCgpID0+IHtcclxuICAgICAgICBzaG9ydExpbmtJbmRpY2F0b3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2hvcnRMaW5rSW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpLCA0MDAwKVxyXG4gICAgfSkpXHJcbiAgfVxyXG5cclxuICBjb3B5TGluaygpXHJcblxyXG4gIC8qIEdhbGxlcnkgQ2FyZFxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAvLyBjb25zdCByZXNpemVJbWFnZXNJbkdhbGxlcmllcyA9ICgpID0+IHtcclxuICAvLyAgIGNvbnN0ICRnYWxsZXJ5SW1nID0gZG9jU2VsZWN0b3JBbGwoJy5rZy1nYWxsZXJ5LWltYWdlID4gaW1nJylcclxuXHJcbiAgLy8gICBpZiAoISRnYWxsZXJ5SW1nLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gIC8vICAgJGdhbGxlcnlJbWcuZm9yRWFjaChpbWFnZSA9PiB7XHJcbiAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGltYWdlLmNsb3Nlc3QoJy5rZy1nYWxsZXJ5LWltYWdlJylcclxuICAvLyAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS5hdHRyaWJ1dGVzLndpZHRoLnZhbHVlXHJcbiAgLy8gICAgIGNvbnN0IGhlaWdodCA9IGltYWdlLmF0dHJpYnV0ZXMuaGVpZ2h0LnZhbHVlXHJcbiAgLy8gICAgIGNvbnN0IHJhdGlvID0gd2lkdGggLyBoZWlnaHRcclxuICAvLyAgICAgY29udGFpbmVyLnN0eWxlLmZsZXggPSByYXRpbyArICcgMSAwJSdcclxuICAvLyAgIH0pXHJcbiAgLy8gfVxyXG5cclxuICAvLyByZXNpemVJbWFnZXNJbkdhbGxlcmllcygpXHJcblxyXG4gIC8qIGhpZ2hsaWdodCBwcmlzbWpzXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGlmIChkb2NTZWxlY3RvckFsbCgnY29kZVtjbGFzcyo9bGFuZ3VhZ2UtXScpLmxlbmd0aCAmJiB0eXBlb2YgcHJpc21KcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGxvYWRTY3JpcHQocHJpc21KcylcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzaW1wbHlQb3N0KVxyXG4iLCJleHBvcnQgZGVmYXVsdCAoc2VsZWN0b3IsIHBhcmVudCA9IGRvY3VtZW50KSA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIDApXHJcbiIsImV4cG9ydCBkZWZhdWx0IChzcmMsIGNhbGxiYWNrKSA9PiB7XHJcbiAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXHJcbiAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcclxuICBzY3JpcHRFbGVtZW50LmRlZmVyID0gdHJ1ZVxyXG4gIHNjcmlwdEVsZW1lbnQuYXN5bmMgPSB0cnVlXHJcblxyXG4gIGNhbGxiYWNrICYmIHNjcmlwdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNhbGxiYWNrKVxyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudClcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB1cmwgPT4gL14oaHR0cHM/OlxcL1xcLyk/KFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pKFtcXC9cXHcgXFwrXFwuLV0qKSpcXC8/JC8udGVzdCh1cmwpIC8vZXNsaW50LWRpc2FibGUtbGluZVxyXG4iXX0=

//# sourceMappingURL=map/post.js.map
