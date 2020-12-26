(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getAll = _interopRequireDefault(require("./get-all"));

/* global localStorage  */
var _default = function _default(el) {
  var toggleTheme = (0, _getAll["default"])(el);
  if (!toggleTheme.length) return;
  var html = document.documentElement;
  toggleTheme.forEach(function (item) {
    return item.addEventListener('click', function (event) {
      event.preventDefault();

      if (!html.classList.contains('dark')) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
      }
    });
  });
};

exports["default"] = _default;

},{"./get-all":3,"@babel/runtime/helpers/interopRequireDefault":16}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getAll = _interopRequireDefault(require("./get-all"));

var _default = function _default(dropdownsBoxs) {
  var dropdowns = (0, _getAll["default"])(dropdownsBoxs);
  if (!dropdowns.length) return;
  dropdowns.forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.stopPropagation();
      el.classList.toggle('is-active');
      document.body.classList.remove('has-menu');
    });
  });

  var closeDropdowns = function closeDropdowns() {
    return dropdowns.forEach(function (el) {
      el.classList.remove('is-active');
    });
  };

  document.addEventListener('click', closeDropdowns);
};

exports["default"] = _default;

},{"./get-all":3,"@babel/runtime/helpers/interopRequireDefault":16}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(coverClass, headTransparent) {
  var domBody = document.body;
  var hasCover = domBody.closest(coverClass);
  if (!hasCover) return;
  window.addEventListener('scroll', function () {
    var lastScrollY = window.scrollY;
    lastScrollY >= 60 ? domBody.classList.remove(headTransparent) : domBody.classList.add(headTransparent);
  }, {
    passive: true
  });
};

exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _urlRegularExpression = _interopRequireDefault(require("../components/url-regular-expression"));

var _default = function _default(menuDropDown, box) {
  // check if the box for the menu exists
  var newbox = document.querySelector(box);
  /*
    var menuDropdown = {
      'Sidebar': 'http://...',
      'Featured': 'http://...'
    }
  */

  if (!newbox) return;
  Object.entries(menuDropDown).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        name = _ref2[0],
        url = _ref2[1];

    if (name !== 'string' && !(0, _urlRegularExpression["default"])(url)) return;
    var link = document.createElement('a');
    link.href = url;
    link.classList = 'dropdown-item hover:text-primary';
    link.innerText = name; // link.innerHTML = `<a href="${url}" class="dropdown-item hover:text-primary">${name}</a>`

    newbox.appendChild(link);
  });
};

exports["default"] = _default;

},{"../components/url-regular-expression":11,"@babel/runtime/helpers/interopRequireDefault":16,"@babel/runtime/helpers/slicedToArray":19}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _urlRegularExpression = _interopRequireDefault(require("../components/url-regular-expression"));

var _getAll = _interopRequireDefault(require("./get-all"));

// import { urlRegexp } from './app.variables'
var _default = function _default(socialMediaData, boxSelector) {
  // check if the box for the menu exists
  var nodeBox = (0, _getAll["default"])(boxSelector);
  if (!nodeBox.length) return;

  var createElement = function createElement(element) {
    Object.entries(socialMediaData).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          name = _ref2[0],
          urlTitle = _ref2[1];

      var url = urlTitle[0]; // The url is being validated if it is false it returns

      if (!(0, _urlRegularExpression["default"])(url)) return;
      var link = document.createElement('a');
      link.href = url;
      link.title = urlTitle[1];
      link.classList = "hover:text-".concat(name, " p-2 inline-block");
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = "<svg class=\"icon icon--".concat(name, "\"><use xlink:href=\"#icon-").concat(name, "\"></use></svg>");
      element.appendChild(link);
    });
  };

  return nodeBox.forEach(createElement);
};

exports["default"] = _default;

},{"../components/url-regular-expression":11,"./get-all":3,"@babel/runtime/helpers/interopRequireDefault":16,"@babel/runtime/helpers/slicedToArray":19}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(src, callback) {
  var scriptElement = document.createElement('script');
  scriptElement.src = src;
  scriptElement.defer = true;
  scriptElement.async = true;
  callback && scriptElement.addEventListener('load', callback);
  document.body.appendChild(scriptElement);
};

exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mediumZoom = _interopRequireDefault(require("medium-zoom"));

var _getAll = _interopRequireDefault(require("../app/get-all"));

var _default = function _default(img) {
  (0, _getAll["default"])(img).forEach(function (el) {
    return !el.closest('a') && el.classList.add('simply-zoom');
  });
  (0, _mediumZoom["default"])('.simply-zoom', {
    margin: 20,
    background: 'hsla(0,0%,100%,.85)'
  });
};

exports["default"] = _default;

},{"../app/get-all":3,"@babel/runtime/helpers/interopRequireDefault":16,"medium-zoom":23}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getAll = _interopRequireDefault(require("../app/get-all"));

// Moodal
var _default = function _default(modal, modalButton, modalClose, isActive) {
  var rootEl = document.documentElement;
  var $modals = (0, _getAll["default"])(modal);
  var $modalButtons = (0, _getAll["default"])(modalButton);
  var $modalCloses = (0, _getAll["default"])(modalClose); // Modal Click Open

  if (!$modalButtons.length) return;
  $modalButtons.forEach(function ($el) {
    return $el.addEventListener('click', function () {
      return openModal($el.dataset.target);
    });
  }); // Modal Click Close

  if (!$modalCloses.length) return;
  $modalCloses.forEach(function (el) {
    return el.addEventListener('click', function () {
      return closeModals();
    });
  });

  var openModal = function openModal(target) {
    document.body.classList.remove('has-menu');
    var $target = document.getElementById(target);
    rootEl.classList.add('overflow-hidden');
    $target.classList.add(isActive);

    if (target === 'modal-search') {
      document.querySelector('#search-field').focus();
    }
  };

  var closeModals = function closeModals() {
    rootEl.classList.remove('overflow-hidden');
    $modals.forEach(function ($el) {
      return $el.classList.remove(isActive);
    });
  };

  document.addEventListener('keydown', function (event) {
    var e = event || window.event;

    if (e.keyCode === 27) {
      closeModals(); // closeDropdowns()
    }
  });
};

exports["default"] = _default;

},{"../app/get-all":3,"@babel/runtime/helpers/interopRequireDefault":16}],10:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getAll = _interopRequireDefault(require("../app/get-all"));

/**
 * Gallery card support
 * Used on any individual post/page
 *
 * Detects when a gallery card has been used and applies sizing to make sure
 * the display matches what is seen in the editor.
 */
var _default = function _default() {
  var images = (0, _getAll["default"])('.kg-gallery-image > img');
  if (!images.length) return;
  images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });
};

exports["default"] = _default;

},{"../app/get-all":3,"@babel/runtime/helpers/interopRequireDefault":16}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(url) {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/.test(url);
}; //eslint-disable-line


exports["default"] = _default;

},{}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getAll = _interopRequireDefault(require("../app/get-all"));

var _default = function _default() {
  /* Iframe SRC video */
  var selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="dailymotion.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="player.twitch.tv"]', 'iframe[src*="kickstarter.com"][src*="video.html"]'];
  var iframes = (0, _getAll["default"])(selectors.join(','));
  if (!iframes.length) return;
  iframes.forEach(function (el) {
    var parentForVideo = document.createElement('div');
    parentForVideo.className = 'video-responsive';
    el.parentNode.insertBefore(parentForVideo, el);
    parentForVideo.appendChild(el);
    el.removeAttribute('height');
    el.removeAttribute('width');
  });
};

exports["default"] = _default;

},{"../app/get-all":3,"@babel/runtime/helpers/interopRequireDefault":16}],13:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("lazysizes");

var _loadScript = _interopRequireDefault(require("./components/load-script"));

var _videoResponsive = _interopRequireDefault(require("./components/video-responsive"));

var _resizeImagesGalleries = _interopRequireDefault(require("./components/resize-images-galleries"));

var _mediumZoom = _interopRequireDefault(require("./components/medium-zoom"));

var _modal = _interopRequireDefault(require("./components/modal"));

var _menuDropDown = _interopRequireDefault(require("./app/menu-drop-down"));

var _soncialMedia = _interopRequireDefault(require("./app/soncial-media"));

var _headerTransparency = _interopRequireDefault(require("./app/header-transparency"));

var _darkMode = _interopRequireDefault(require("./app/dark-mode"));

var _dropdownToggle = _interopRequireDefault(require("./app/dropdown-toggle"));

/* global prismJs followSocialMedia menuDropdown siteSearch */
// lib
var simplySetup = function simplySetup() {
  /* Menu DropDown
  /* ---------------------------------------------------------- */
  if ((typeof menuDropdown === "undefined" ? "undefined" : (0, _typeof2["default"])(menuDropdown)) === 'object' && menuDropdown !== null) {
    (0, _menuDropDown["default"])(menuDropdown, '.js-dropdown-menu');
  }
  /* Social Media
  /* ---------------------------------------------------------- */


  if ((typeof followSocialMedia === "undefined" ? "undefined" : (0, _typeof2["default"])(followSocialMedia)) === 'object' && followSocialMedia !== null) {
    (0, _soncialMedia["default"])(followSocialMedia, '.js-social-media');
  }
  /*  Toggle modal
  /* ---------------------------------------------------------- */


  (0, _modal["default"])('.js-modal', '.js-modal-button', '.js-modal-close', 'is-active');
  /* Toggle Menu
  /* ---------------------------------------------------------- */

  document.querySelector('.js-menu-toggle').addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('has-menu');
  });
  /* Header Transparency
  /* ---------------------------------------------------------- */

  (0, _headerTransparency["default"])('.has-cover', 'is-head-transparent');
  /* Dark Mode
  /* ---------------------------------------------------------- */

  (0, _darkMode["default"])('.js-dark-mode');
  /* All Video Responsive
  /* ---------------------------------------------------------- */

  (0, _videoResponsive["default"])();
  /* Gallery Card
  /* ---------------------------------------------------------- */

  (0, _resizeImagesGalleries["default"])();
  /* medium-zoom
  /* ---------------------------------------------------------- */

  (0, _mediumZoom["default"])('.post-body img');
  /* DropDown Toggle
  /* ---------------------------------------------------------- */

  (0, _dropdownToggle["default"])('.dropdown:not(.is-hoverable)');
  /* highlight prismjs
  /* ---------------------------------------------------------- */

  if (document.querySelectorAll('code[class*=language-]').length && typeof prismJs !== 'undefined') {
    (0, _loadScript["default"])(prismJs);
  }
  /* Load Search
  /* ---------------------------------------------------------- */


  if (typeof searchSettings !== 'undefined' && typeof siteSearch !== 'undefined') {
    (0, _loadScript["default"])(siteSearch); // loadScript('https://unpkg.com/@tryghost/content-api@1.4.9/umd/content-api.min.js', () => {
    //   loadScript(siteSearch)
    // })
  } //

};

document.addEventListener('DOMContentLoaded', simplySetup);

},{"./app/dark-mode":1,"./app/dropdown-toggle":2,"./app/header-transparency":4,"./app/menu-drop-down":5,"./app/soncial-media":6,"./components/load-script":7,"./components/medium-zoom":8,"./components/modal":9,"./components/resize-images-galleries":10,"./components/video-responsive":12,"@babel/runtime/helpers/interopRequireDefault":16,"@babel/runtime/helpers/typeof":20,"lazysizes":22}],14:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
},{}],15:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{}],16:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],17:[function(require,module,exports){
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

module.exports = _iterableToArrayLimit;
},{}],18:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
},{}],19:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":15,"./iterableToArrayLimit":17,"./nonIterableRest":18,"./unsupportedIterableToArray":21}],20:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],21:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
},{"./arrayLikeToArray":14}],22:[function(require,module,exports){
(function(window, factory) {
	var lazySizes = factory(window, window.document, Date);
	window.lazySizes = lazySizes;
	if(typeof module == 'object' && module.exports){
		module.exports = lazySizes;
	}
}(typeof window != 'undefined' ?
      window : {}, function l(window, document, Date) { // Pass in the windoe Date function also for SSR because the Date class can be lost
	'use strict';
	/*jshint eqnull:true */

	var lazysizes, lazySizesCfg;

	(function(){
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.5,
			hFac: 0.8,
			loadMode: 2,
			loadHidden: true,
			ricTimeout: 0,
			throttleDelay: 125,
		};

		lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};

		for(prop in lazySizesDefaults){
			if(!(prop in lazySizesCfg)){
				lazySizesCfg[prop] = lazySizesDefaults[prop];
			}
		}
	})();

	if (!document || !document.getElementsByClassName) {
		return {
			init: function () {},
			cfg: lazySizesCfg,
			noSupport: true,
		};
	}

	var docElem = document.documentElement;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	/**
	 * Update to bind to window because 'this' becomes null during SSR
	 * builds.
	 */
	var addEventListener = window[_addEventListener].bind(window);

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function(ele, cls) {
		var reg;
		if ((reg = hasClass(ele,cls))) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function(dom, fn, add){
		var action = add ? _addEventListener : 'removeEventListener';
		if(add){
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function(evt){
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
		var event = document.createEvent('Event');

		if(!detail){
			detail = {};
		}

		detail.instance = lazysizes;

		event.initEvent(name, !noBubbles, !noCancelable);

		event.detail = detail;

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function (el, full){
		var polyfill;
		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesCfg.pf) ) ){
			if(full && full.src && !el[_getAttribute]('srcset')){
				el.setAttribute('srcset', full.src);
			}
			polyfill({reevaluate: true, elements: [el]});
		} else if(full && full.src){
			el.src = full.src;
		}
	};

	var getCSS = function (elem, style){
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function(elem, parent, width){
		width = width || elem.offsetWidth;

		while(width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth){
			width =  parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var rAF = (function(){
		var running, waiting;
		var firstFns = [];
		var secondFns = [];
		var fns = firstFns;

		var run = function(){
			var runFns = fns;

			fns = firstFns.length ? secondFns : firstFns;

			running = true;
			waiting = false;

			while(runFns.length){
				runFns.shift()();
			}

			running = false;
		};

		var rafBatch = function(fn, queue){
			if(running && !queue){
				fn.apply(this, arguments);
			} else {
				fns.push(fn);

				if(!waiting){
					waiting = true;
					(document.hidden ? setTimeout : requestAnimationFrame)(run);
				}
			}
		};

		rafBatch._lsFlush = run;

		return rafBatch;
	})();

	var rAFIt = function(fn, simple){
		return simple ?
			function() {
				rAF(fn);
			} :
			function(){
				var that = this;
				var args = arguments;
				rAF(function(){
					fn.apply(that, args);
				});
			}
		;
	};

	var throttle = function(fn){
		var running;
		var lastTime = 0;
		var gDelay = lazySizesCfg.throttleDelay;
		var rICTimeout = lazySizesCfg.ricTimeout;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback && rICTimeout > 49 ?
			function(){
				requestIdleCallback(run, {timeout: rICTimeout});

				if(rICTimeout !== lazySizesCfg.ricTimeout){
					rICTimeout = lazySizesCfg.ricTimeout;
				}
			} :
			rAFIt(function(){
				setTimeout(run);
			}, true)
		;

		return function(isPriority){
			var delay;

			if((isPriority = isPriority === true)){
				rICTimeout = 33;
			}

			if(running){
				return;
			}

			running =  true;

			delay = gDelay - (Date.now() - lastTime);

			if(delay < 0){
				delay = 0;
			}

			if(isPriority || delay < 9){
				idleCallback();
			} else {
				setTimeout(idleCallback, delay);
			}
		};
	};

	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
	var debounce = function(func) {
		var timeout, timestamp;
		var wait = 99;
		var run = function(){
			timeout = null;
			func();
		};
		var later = function() {
			var last = Date.now() - timestamp;

			if (last < wait) {
				setTimeout(later, wait - last);
			} else {
				(requestIdleCallback || run)(run);
			}
		};

		return function() {
			timestamp = Date.now();

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};
	};

	var loader = (function(){
		var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = -1;

		var resetPreloading = function(e){
			isLoading--;
			if(!e || isLoading < 0 || !e.target){
				isLoading = 0;
			}
		};

		var isVisible = function (elem) {
			if (isBodyHidden == null) {
				isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
			}

			return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
		};

		var isNestedVisible = function(elem, elemExpand){
			var outerRect;
			var parent = elem;
			var visible = isVisible(elem);

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
				visible = ((getCSS(parent, 'opacity') || 1) > 0);

				if(visible && getCSS(parent, 'overflow') != 'visible'){
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left &&
						eLleft < outerRect.right &&
						eLbottom > outerRect.top - 1 &&
						eLtop < outerRect.bottom + 1
					;
				}
			}

			return visible;
		};

		var checkElements = function() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,
				beforeExpandVal, defaultExpand, preloadExpand, hFac;
			var lazyloadElems = lazysizes.elements;

			if((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

				i = 0;

				lowRuns++;

				for(; i < eLlen; i++){

					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

					if(!supportScroll || (lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i]))){unveilElement(lazyloadElems[i]);continue;}

					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
						elemExpand = currentExpand;
					}

					if (!defaultExpand) {
						defaultExpand = (!lazySizesCfg.expand || lazySizesCfg.expand < 1) ?
							docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :
							lazySizesCfg.expand;

						lazysizes._defEx = defaultExpand;

						preloadExpand = defaultExpand * lazySizesCfg.expFactor;
						hFac = lazySizesCfg.hFac;
						isBodyHidden = null;

						if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
							currentExpand = preloadExpand;
							lowRuns = 0;
						} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
							currentExpand = defaultExpand;
						} else {
							currentExpand = shrinkExpand;
						}
					}

					if(beforeExpandVal !== elemExpand){
						eLvW = innerWidth + (elemExpand * hFac);
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
						(eLtop = rect.top) <= elvH &&
						(eLright = rect.right) >= elemNegativeExpand * hFac &&
						(eLleft = rect.left) <= eLvW &&
						(eLbottom || eLright || eLleft || eLtop) &&
						(lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) &&
						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if(isLoading > 9){break;}
					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
						(preloadElems[0] || lazySizesCfg.preloadAfterLoad) &&
						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto')))){
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if(autoLoadElem && !loadedSomething){
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function(e){
			var elem = e.target;

			if (elem._lazyCache) {
				delete elem._lazyCache;
				return;
			}

			resetPreloading(e);
			addClass(elem, lazySizesCfg.loadedClass);
			removeClass(elem, lazySizesCfg.loadingClass);
			addRemoveLoadEvents(elem, rafSwitchLoadingClass);
			triggerEvent(elem, 'lazyloaded');
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function(e){
			rafedSwitchLoadingClass({target: e.target});
		};

		var changeIframeSrc = function(elem, src){
			try {
				elem.contentWindow.location.replace(src);
			} catch(e){
				elem.src = src;
			}
		};

		var handleSources = function(source){
			var customMedia;

			var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);

			if( (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
				source.setAttribute('media', customMedia);
			}

			if(sourceSrcset){
				source.setAttribute('srcset', sourceSrcset);
			}
		};

		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
			var src, srcset, parent, isPicture, event, firesLoad;

			if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

				if(sizes){
					if(isAuto){
						addClass(elem, lazySizesCfg.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
				src = elem[_getAttribute](lazySizesCfg.srcAttr);

				if(isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

				event = {target: elem};

				addClass(elem, lazySizesCfg.loadingClass);

				if(firesLoad){
					clearTimeout(resetPreloadingTimer);
					resetPreloadingTimer = setTimeout(resetPreloading, 2500);
					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
				}

				if(isPicture){
					forEach.call(parent.getElementsByTagName('source'), handleSources);
				}

				if(srcset){
					elem.setAttribute('srcset', srcset);
				} else if(src && !isPicture){
					if(regIframe.test(elem.nodeName)){
						changeIframeSrc(elem, src);
					} else {
						elem.src = src;
					}
				}

				if(isImg && (srcset || isPicture)){
					updatePolyfill(elem, {src: src});
				}
			}

			if(elem._lazyRace){
				delete elem._lazyRace;
			}
			removeClass(elem, lazySizesCfg.lazyClass);

			rAF(function(){
				// Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
				var isLoaded = elem.complete && elem.naturalWidth > 1;

				if( !firesLoad || isLoaded){
					if (isLoaded) {
						addClass(elem, 'ls-is-cached');
					}
					switchLoadingClass(event);
					elem._lazyCache = true;
					setTimeout(function(){
						if ('_lazyCache' in elem) {
							delete elem._lazyCache;
						}
					}, 9);
				}
				if (elem.loading == 'lazy') {
					isLoading--;
				}
			}, true);
		});

		var unveilElement = function (elem){
			if (elem._lazyRace) {return;}
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)){return;}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if(isAuto){
				 autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var afterScroll = debounce(function(){
			lazySizesCfg.loadMode = 3;
			throttledCheckElements();
		});

		var altLoadmodeScrollListner = function(){
			if(lazySizesCfg.loadMode == 3){
				lazySizesCfg.loadMode = 2;
			}
			afterScroll();
		};

		var onload = function(){
			if(isCompleted){return;}
			if(Date.now() - started < 999){
				setTimeout(onload, 999);
				return;
			}


			isCompleted = true;

			lazySizesCfg.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', altLoadmodeScrollListner, true);
		};

		return {
			_: function(){
				started = Date.now();

				lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				addEventListener('pageshow', function (e) {
					if (e.persisted) {
						var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);

						if (loadingElements.length && loadingElements.forEach) {
							requestAnimationFrame(function () {
								loadingElements.forEach( function (img) {
									if (img.complete) {
										unveilElement(img);
									}
								});
							});
						}
					}
				});

				if(window.MutationObserver){
					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function(name){
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if((/d$|^c/.test(document.readyState))){
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				if(lazysizes.elements.length){
					checkElements();
					rAF._lsFlush();
				} else {
					throttledCheckElements();
				}
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement,
			_aLSL: altLoadmodeScrollListner,
		};
	})();


	var autoSizer = (function(){
		var autosizesElems;

		var sizeElement = rAFIt(function(elem, parent, event, width){
			var sources, i, len;
			elem._lazysizesWidth = width;
			width += 'px';

			elem.setAttribute('sizes', width);

			if(regPicture.test(parent.nodeName || '')){
				sources = parent.getElementsByTagName('source');
				for(i = 0, len = sources.length; i < len; i++){
					sources[i].setAttribute('sizes', width);
				}
			}

			if(!event.detail.dataAttr){
				updatePolyfill(elem, event.detail);
			}
		});
		var getSizeElement = function (elem, dataAttr, width){
			var event;
			var parent = elem.parentNode;

			if(parent){
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

				if(!event.defaultPrevented){
					width = event.detail.width;

					if(width && width !== elem._lazysizesWidth){
						sizeElement(elem, parent, event, width);
					}
				}
			}
		};

		var updateElementsSizes = function(){
			var i;
			var len = autosizesElems.length;
			if(len){
				i = 0;

				for(; i < len; i++){
					getSizeElement(autosizesElems[i]);
				}
			}
		};

		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

		return {
			_: function(){
				autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	})();

	var init = function(){
		if(!init.i && document.getElementsByClassName){
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	setTimeout(function(){
		if(lazySizesCfg.init){
			init();
		}
	});

	lazysizes = {
		cfg: lazySizesCfg,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth,
		rAF: rAF,
	};

	return lazysizes;
}
));

},{}],23:[function(require,module,exports){
/*! medium-zoom 1.0.6 | MIT License | https://github.com/francoischalifour/medium-zoom */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).mediumZoom=t()}(this,(function(){"use strict";var e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},t=function(e){return"IMG"===e.tagName},o=function(e){return e&&1===e.nodeType},n=function(e){return".svg"===(e.currentSrc||e.src).substr(-4).toLowerCase()},i=function(e){try{return Array.isArray(e)?e.filter(t):function(e){return NodeList.prototype.isPrototypeOf(e)}(e)?[].slice.call(e).filter(t):o(e)?[e].filter(t):"string"==typeof e?[].slice.call(document.querySelectorAll(e)).filter(t):[]}catch(e){throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom")}},r=function(e){var t=document.createElement("div");return t.classList.add("medium-zoom-overlay"),t.style.background=e,t},d=function(e){var t=e.getBoundingClientRect(),o=t.top,n=t.left,i=t.width,r=t.height,d=e.cloneNode(),m=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,a=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return d.removeAttribute("id"),d.style.position="absolute",d.style.top=o+m+"px",d.style.left=n+a+"px",d.style.width=i+"px",d.style.height=r+"px",d.style.transform="",d},m=function(t,o){var n=e({bubbles:!1,cancelable:!1,detail:void 0},o);if("function"==typeof window.CustomEvent)return new CustomEvent(t,n);var i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),i};return function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===o&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}"),function t(a){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=window.Promise||function(e){function t(){}e(t,t)},u=function(e){var t=e.target;t!==N?-1!==O.indexOf(t)&&w({target:t}):E()},s=function(){if(!A&&T.original){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(k-e)>S.scrollOffset&&setTimeout(E,150)}},f=function(e){var t=e.key||e.keyCode;"Escape"!==t&&"Esc"!==t&&27!==t||E()},p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t;if(t.background&&(N.style.background=t.background),t.container&&t.container instanceof Object&&(n.container=e({},S.container,t.container)),t.template){var i=o(t.template)?t.template:document.querySelector(t.template);n.template=i}return S=e({},S,n),O.forEach((function(e){e.dispatchEvent(m("medium-zoom:update",{detail:{zoom:j}}))})),j},g=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t(e({},S,o))},v=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];var n=t.reduce((function(e,t){return[].concat(e,i(t))}),[]);return n.filter((function(e){return-1===O.indexOf(e)})).forEach((function(e){O.push(e),e.classList.add("medium-zoom-image")})),x.forEach((function(e){var t=e.type,o=e.listener,i=e.options;n.forEach((function(e){e.addEventListener(t,o,i)}))})),j},h=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];T.zoomed&&E();var n=t.length>0?t.reduce((function(e,t){return[].concat(e,i(t))}),[]):O;return n.forEach((function(e){e.classList.remove("medium-zoom-image"),e.dispatchEvent(m("medium-zoom:detach",{detail:{zoom:j}}))})),O=O.filter((function(e){return-1===n.indexOf(e)})),j},z=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return O.forEach((function(n){n.addEventListener("medium-zoom:"+e,t,o)})),x.push({type:"medium-zoom:"+e,listener:t,options:o}),j},y=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return O.forEach((function(n){n.removeEventListener("medium-zoom:"+e,t,o)})),x=x.filter((function(o){return!(o.type==="medium-zoom:"+e&&o.listener.toString()===t.toString())})),j},b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.target,r=function(){var t={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},i=void 0,r=void 0;if(S.container)if(S.container instanceof Object)i=(t=e({},t,S.container)).width-t.left-t.right-2*S.margin,r=t.height-t.top-t.bottom-2*S.margin;else{var d=(o(S.container)?S.container:document.querySelector(S.container)).getBoundingClientRect(),m=d.width,a=d.height,l=d.left,c=d.top;t=e({},t,{width:m,height:a,left:l,top:c})}i=i||t.width-2*S.margin,r=r||t.height-2*S.margin;var u=T.zoomedHd||T.original,s=n(u)?i:u.naturalWidth||i,f=n(u)?r:u.naturalHeight||r,p=u.getBoundingClientRect(),g=p.top,v=p.left,h=p.width,z=p.height,y=Math.min(s,i)/h,b=Math.min(f,r)/z,E=Math.min(y,b),w="scale("+E+") translate3d("+((i-h)/2-v+S.margin+t.left)/E+"px, "+((r-z)/2-g+S.margin+t.top)/E+"px, 0)";T.zoomed.style.transform=w,T.zoomedHd&&(T.zoomedHd.style.transform=w)};return new c((function(e){if(i&&-1===O.indexOf(i))e(j);else{if(T.zoomed)e(j);else{if(i)T.original=i;else{if(!(O.length>0))return void e(j);var t=O;T.original=t[0]}if(T.original.dispatchEvent(m("medium-zoom:open",{detail:{zoom:j}})),k=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,A=!0,T.zoomed=d(T.original),document.body.appendChild(N),S.template){var n=o(S.template)?S.template:document.querySelector(S.template);T.template=document.createElement("div"),T.template.appendChild(n.content.cloneNode(!0)),document.body.appendChild(T.template)}if(document.body.appendChild(T.zoomed),window.requestAnimationFrame((function(){document.body.classList.add("medium-zoom--opened")})),T.original.classList.add("medium-zoom-image--hidden"),T.zoomed.classList.add("medium-zoom-image--opened"),T.zoomed.addEventListener("click",E),T.zoomed.addEventListener("transitionend",(function t(){A=!1,T.zoomed.removeEventListener("transitionend",t),T.original.dispatchEvent(m("medium-zoom:opened",{detail:{zoom:j}})),e(j)})),T.original.getAttribute("data-zoom-src")){T.zoomedHd=T.zoomed.cloneNode(),T.zoomedHd.removeAttribute("srcset"),T.zoomedHd.removeAttribute("sizes"),T.zoomedHd.src=T.zoomed.getAttribute("data-zoom-src"),T.zoomedHd.onerror=function(){clearInterval(a),console.warn("Unable to reach the zoom image target "+T.zoomedHd.src),T.zoomedHd=null,r()};var a=setInterval((function(){T.zoomedHd.complete&&(clearInterval(a),T.zoomedHd.classList.add("medium-zoom-image--opened"),T.zoomedHd.addEventListener("click",E),document.body.appendChild(T.zoomedHd),r())}),10)}else if(T.original.hasAttribute("srcset")){T.zoomedHd=T.zoomed.cloneNode(),T.zoomedHd.removeAttribute("sizes"),T.zoomedHd.removeAttribute("loading");var l=T.zoomedHd.addEventListener("load",(function(){T.zoomedHd.removeEventListener("load",l),T.zoomedHd.classList.add("medium-zoom-image--opened"),T.zoomedHd.addEventListener("click",E),document.body.appendChild(T.zoomedHd),r()}))}else r()}}}))},E=function(){return new c((function(e){if(!A&&T.original){A=!0,document.body.classList.remove("medium-zoom--opened"),T.zoomed.style.transform="",T.zoomedHd&&(T.zoomedHd.style.transform=""),T.template&&(T.template.style.transition="opacity 150ms",T.template.style.opacity=0),T.original.dispatchEvent(m("medium-zoom:close",{detail:{zoom:j}})),T.zoomed.addEventListener("transitionend",(function t(){T.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(T.zoomed),T.zoomedHd&&document.body.removeChild(T.zoomedHd),document.body.removeChild(N),T.zoomed.classList.remove("medium-zoom-image--opened"),T.template&&document.body.removeChild(T.template),A=!1,T.zoomed.removeEventListener("transitionend",t),T.original.dispatchEvent(m("medium-zoom:closed",{detail:{zoom:j}})),T.original=null,T.zoomed=null,T.zoomedHd=null,T.template=null,e(j)}))}else e(j)}))},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.target;return T.original?E():b({target:t})},L=function(){return S},H=function(){return O},C=function(){return T.original},O=[],x=[],A=!1,k=0,S=l,T={original:null,zoomed:null,zoomedHd:null,template:null};"[object Object]"===Object.prototype.toString.call(a)?S=a:(a||"string"==typeof a)&&v(a),S=e({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},S);var N=r(S.background);document.addEventListener("click",u),document.addEventListener("keyup",f),document.addEventListener("scroll",s),window.addEventListener("resize",E);var j={open:b,close:E,toggle:w,update:p,clone:g,attach:v,detach:h,on:z,off:y,getOptions:L,getImages:H,getZoomedImage:C};return j}}));

},{}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcHAvZGFyay1tb2RlLmpzIiwianMvYXBwL2Ryb3Bkb3duLXRvZ2dsZS5qcyIsImpzL2FwcC9nZXQtYWxsLmpzIiwianMvYXBwL2hlYWRlci10cmFuc3BhcmVuY3kuanMiLCJqcy9hcHAvbWVudS1kcm9wLWRvd24uanMiLCJqcy9hcHAvc29uY2lhbC1tZWRpYS5qcyIsImpzL2NvbXBvbmVudHMvbG9hZC1zY3JpcHQuanMiLCJqcy9jb21wb25lbnRzL21lZGl1bS16b29tLmpzIiwianMvY29tcG9uZW50cy9tb2RhbC5qcyIsImpzL2NvbXBvbmVudHMvcmVzaXplLWltYWdlcy1nYWxsZXJpZXMuanMiLCJqcy9jb21wb25lbnRzL3VybC1yZWd1bGFyLWV4cHJlc3Npb24uanMiLCJqcy9jb21wb25lbnRzL3ZpZGVvLXJlc3BvbnNpdmUuanMiLCJqcy9tYWluLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlMaWtlVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbGF6eXNpemVzL2xhenlzaXplcy5qcyIsIm5vZGVfbW9kdWxlcy9tZWRpdW0tem9vbS9kaXN0L21lZGl1bS16b29tLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0NBOztBQURBO2VBR2Usa0JBQUEsRUFBRSxFQUFJO0FBQ25CLE1BQU0sV0FBVyxHQUFHLHdCQUFPLEVBQVAsQ0FBcEI7QUFFQSxNQUFJLENBQUMsV0FBVyxDQUFDLE1BQWpCLEVBQXlCO0FBRXpCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUF0QjtBQUVBLEVBQUEsV0FBVyxDQUFDLE9BQVosQ0FBb0IsVUFBQSxJQUFJO0FBQUEsV0FBSSxJQUFJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBVSxLQUFWLEVBQWlCO0FBQzFFLE1BQUEsS0FBSyxDQUFDLGNBQU47O0FBRUEsVUFBSSxDQUFDLElBQUksQ0FBQyxTQUFMLENBQWUsUUFBZixDQUF3QixNQUF4QixDQUFMLEVBQXNDO0FBQ3BDLFFBQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxHQUFmLENBQW1CLE1BQW5CO0FBQ0EsUUFBQSxZQUFZLENBQUMsS0FBYixHQUFxQixNQUFyQjtBQUNELE9BSEQsTUFHTztBQUNMLFFBQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLENBQXNCLE1BQXRCO0FBQ0EsUUFBQSxZQUFZLENBQUMsS0FBYixHQUFxQixPQUFyQjtBQUNEO0FBQ0YsS0FWMkIsQ0FBSjtBQUFBLEdBQXhCO0FBV0QsQzs7Ozs7Ozs7Ozs7Ozs7QUNyQkQ7O2VBRWUsa0JBQUMsYUFBRCxFQUFtQjtBQUNoQyxNQUFNLFNBQVMsR0FBRyx3QkFBTyxhQUFQLENBQWxCO0FBRUEsTUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFmLEVBQXVCO0FBRXZCLEVBQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsVUFBVSxFQUFWLEVBQWM7QUFDOUIsSUFBQSxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIs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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbHZCQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBnbG9iYWwgbG9jYWxTdG9yYWdlICAqL1xuaW1wb3J0IGdldEFsbCBmcm9tICcuL2dldC1hbGwnXG5cbmV4cG9ydCBkZWZhdWx0IGVsID0+IHtcbiAgY29uc3QgdG9nZ2xlVGhlbWUgPSBnZXRBbGwoZWwpXG5cbiAgaWYgKCF0b2dnbGVUaGVtZS5sZW5ndGgpIHJldHVyblxuXG4gIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblxuICB0b2dnbGVUaGVtZS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIGlmICghaHRtbC5jbGFzc0xpc3QuY29udGFpbnMoJ2RhcmsnKSkge1xuICAgICAgaHRtbC5jbGFzc0xpc3QuYWRkKCdkYXJrJylcbiAgICAgIGxvY2FsU3RvcmFnZS50aGVtZSA9ICdkYXJrJ1xuICAgIH0gZWxzZSB7XG4gICAgICBodG1sLmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKVxuICAgICAgbG9jYWxTdG9yYWdlLnRoZW1lID0gJ2xpZ2h0J1xuICAgIH1cbiAgfSkpXG59XG4iLCJpbXBvcnQgZ2V0QWxsIGZyb20gJy4vZ2V0LWFsbCdcblxuZXhwb3J0IGRlZmF1bHQgKGRyb3Bkb3duc0JveHMpID0+IHtcbiAgY29uc3QgZHJvcGRvd25zID0gZ2V0QWxsKGRyb3Bkb3duc0JveHMpXG5cbiAgaWYgKCFkcm9wZG93bnMubGVuZ3RoKSByZXR1cm5cblxuICBkcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1tZW51JylcbiAgICB9KVxuICB9KVxuXG4gIGNvbnN0IGNsb3NlRHJvcGRvd25zID0gKCkgPT4gZHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbiAgfSlcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlRHJvcGRvd25zKVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIGNvbnN0IHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnRcblxuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAwKVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgKGNvdmVyQ2xhc3MsIGhlYWRUcmFuc3BhcmVudCkgPT4ge1xuICBjb25zdCBkb21Cb2R5ID0gZG9jdW1lbnQuYm9keVxuICBjb25zdCBoYXNDb3ZlciA9IGRvbUJvZHkuY2xvc2VzdChjb3ZlckNsYXNzKVxuXG4gIGlmICghaGFzQ292ZXIpIHJldHVyblxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgY29uc3QgbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWVxuXG4gICAgbGFzdFNjcm9sbFkgPj0gNjAgPyBkb21Cb2R5LmNsYXNzTGlzdC5yZW1vdmUoaGVhZFRyYW5zcGFyZW50KSA6IGRvbUJvZHkuY2xhc3NMaXN0LmFkZChoZWFkVHJhbnNwYXJlbnQpXG4gIH0sIHsgcGFzc2l2ZTogdHJ1ZSB9KVxufVxuIiwiaW1wb3J0IHVybFJlZ2V4cCBmcm9tICcuLi9jb21wb25lbnRzL3VybC1yZWd1bGFyLWV4cHJlc3Npb24nXG5cbmV4cG9ydCBkZWZhdWx0IChtZW51RHJvcERvd24sIGJveCkgPT4ge1xuICAvLyBjaGVjayBpZiB0aGUgYm94IGZvciB0aGUgbWVudSBleGlzdHNcbiAgY29uc3QgbmV3Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihib3gpXG5cbiAgLypcbiAgICB2YXIgbWVudURyb3Bkb3duID0ge1xuICAgICAgJ1NpZGViYXInOiAnaHR0cDovLy4uLicsXG4gICAgICAnRmVhdHVyZWQnOiAnaHR0cDovLy4uLidcbiAgICB9XG4gICovXG5cbiAgaWYgKCFuZXdib3gpIHJldHVyblxuXG4gIE9iamVjdC5lbnRyaWVzKG1lbnVEcm9wRG93bikuZm9yRWFjaCgoW25hbWUsIHVybF0pID0+IHtcbiAgICBpZiAobmFtZSAhPT0gJ3N0cmluZycgJiYgIXVybFJlZ2V4cCh1cmwpKSByZXR1cm5cblxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBsaW5rLmhyZWYgPSB1cmxcbiAgICBsaW5rLmNsYXNzTGlzdCA9ICdkcm9wZG93bi1pdGVtIGhvdmVyOnRleHQtcHJpbWFyeSdcbiAgICBsaW5rLmlubmVyVGV4dCA9IG5hbWVcbiAgICAvLyBsaW5rLmlubmVySFRNTCA9IGA8YSBocmVmPVwiJHt1cmx9XCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtIGhvdmVyOnRleHQtcHJpbWFyeVwiPiR7bmFtZX08L2E+YFxuXG4gICAgbmV3Ym94LmFwcGVuZENoaWxkKGxpbmspXG4gIH0pXG59XG4iLCIvLyBpbXBvcnQgeyB1cmxSZWdleHAgfSBmcm9tICcuL2FwcC52YXJpYWJsZXMnXG5pbXBvcnQgdXJsUmVnZXhwIGZyb20gJy4uL2NvbXBvbmVudHMvdXJsLXJlZ3VsYXItZXhwcmVzc2lvbidcbmltcG9ydCBnZXRBbGwgZnJvbSAnLi9nZXQtYWxsJ1xuXG5leHBvcnQgZGVmYXVsdCAoc29jaWFsTWVkaWFEYXRhLCBib3hTZWxlY3RvcikgPT4ge1xuICAvLyBjaGVjayBpZiB0aGUgYm94IGZvciB0aGUgbWVudSBleGlzdHNcbiAgY29uc3Qgbm9kZUJveCA9IGdldEFsbChib3hTZWxlY3RvcilcblxuICBpZiAoIW5vZGVCb3gubGVuZ3RoKSByZXR1cm5cblxuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gZWxlbWVudCA9PiB7XG4gICAgT2JqZWN0LmVudHJpZXMoc29jaWFsTWVkaWFEYXRhKS5mb3JFYWNoKChbbmFtZSwgdXJsVGl0bGVdKSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSB1cmxUaXRsZVswXVxuXG4gICAgICAvLyBUaGUgdXJsIGlzIGJlaW5nIHZhbGlkYXRlZCBpZiBpdCBpcyBmYWxzZSBpdCByZXR1cm5zXG4gICAgICBpZiAoIXVybFJlZ2V4cCh1cmwpKSByZXR1cm5cblxuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgbGluay5ocmVmID0gdXJsXG4gICAgICBsaW5rLnRpdGxlID0gdXJsVGl0bGVbMV1cbiAgICAgIGxpbmsuY2xhc3NMaXN0ID0gYGhvdmVyOnRleHQtJHtuYW1lfSBwLTIgaW5saW5lLWJsb2NrYFxuICAgICAgbGluay50YXJnZXQgPSAnX2JsYW5rJ1xuICAgICAgbGluay5yZWwgPSAnbm9vcGVuZXIgbm9yZWZlcnJlcidcbiAgICAgIGxpbmsuaW5uZXJIVE1MID0gYDxzdmcgY2xhc3M9XCJpY29uIGljb24tLSR7bmFtZX1cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi0ke25hbWV9XCI+PC91c2U+PC9zdmc+YFxuXG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmspXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBub2RlQm94LmZvckVhY2goY3JlYXRlRWxlbWVudClcbn1cbiIsImV4cG9ydCBkZWZhdWx0IChzcmMsIGNhbGxiYWNrKSA9PiB7XHJcbiAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXHJcbiAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcclxuICBzY3JpcHRFbGVtZW50LmRlZmVyID0gdHJ1ZVxyXG4gIHNjcmlwdEVsZW1lbnQuYXN5bmMgPSB0cnVlXHJcblxyXG4gIGNhbGxiYWNrICYmIHNjcmlwdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNhbGxiYWNrKVxyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudClcclxufVxyXG4iLCJpbXBvcnQgbWVkaXVtWm9vbSBmcm9tICdtZWRpdW0tem9vbSdcblxuaW1wb3J0IGdldEFsbCBmcm9tICcuLi9hcHAvZ2V0LWFsbCdcblxuZXhwb3J0IGRlZmF1bHQgaW1nID0+IHtcbiAgZ2V0QWxsKGltZykuZm9yRWFjaChlbCA9PiAhZWwuY2xvc2VzdCgnYScpICYmIGVsLmNsYXNzTGlzdC5hZGQoJ3NpbXBseS16b29tJykpXG5cbiAgbWVkaXVtWm9vbSgnLnNpbXBseS16b29tJywge1xuICAgIG1hcmdpbjogMjAsXG4gICAgYmFja2dyb3VuZDogJ2hzbGEoMCwwJSwxMDAlLC44NSknXG4gIH0pXG59XG4iLCIvLyBNb29kYWxcblxuaW1wb3J0IGdldEFsbCBmcm9tICcuLi9hcHAvZ2V0LWFsbCdcblxuZXhwb3J0IGRlZmF1bHQgKG1vZGFsLCBtb2RhbEJ1dHRvbiwgbW9kYWxDbG9zZSwgaXNBY3RpdmUpID0+IHtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gIGNvbnN0ICRtb2RhbHMgPSBnZXRBbGwobW9kYWwpXG4gIGNvbnN0ICRtb2RhbEJ1dHRvbnMgPSBnZXRBbGwobW9kYWxCdXR0b24pXG4gIGNvbnN0ICRtb2RhbENsb3NlcyA9IGdldEFsbChtb2RhbENsb3NlKVxuXG4gIC8vIE1vZGFsIENsaWNrIE9wZW5cbiAgaWYgKCEkbW9kYWxCdXR0b25zLmxlbmd0aCkgcmV0dXJuXG4gICRtb2RhbEJ1dHRvbnMuZm9yRWFjaCgkZWwgPT4gJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3Blbk1vZGFsKCRlbC5kYXRhc2V0LnRhcmdldCkpKVxuXG4gIC8vIE1vZGFsIENsaWNrIENsb3NlXG4gIGlmICghJG1vZGFsQ2xvc2VzLmxlbmd0aCkgcmV0dXJuXG4gICRtb2RhbENsb3Nlcy5mb3JFYWNoKGVsID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNb2RhbHMoKSkpXG5cbiAgY29uc3Qgb3Blbk1vZGFsID0gdGFyZ2V0ID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1tZW51JylcbiAgICBjb25zdCAkdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KVxuICAgIHJvb3RFbC5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy1oaWRkZW4nKVxuICAgICR0YXJnZXQuY2xhc3NMaXN0LmFkZChpc0FjdGl2ZSlcblxuICAgIGlmICh0YXJnZXQgPT09ICdtb2RhbC1zZWFyY2gnKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWZpZWxkJykuZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsb3NlTW9kYWxzID0gKCkgPT4ge1xuICAgIHJvb3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKVxuICAgICRtb2RhbHMuZm9yRWFjaCgkZWwgPT4gJGVsLmNsYXNzTGlzdC5yZW1vdmUoaXNBY3RpdmUpKVxuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnRcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgY2xvc2VNb2RhbHMoKVxuICAgICAgLy8gY2xvc2VEcm9wZG93bnMoKVxuICAgIH1cbiAgfSlcbn1cbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXG5cbi8qKlxuICogR2FsbGVyeSBjYXJkIHN1cHBvcnRcbiAqIFVzZWQgb24gYW55IGluZGl2aWR1YWwgcG9zdC9wYWdlXG4gKlxuICogRGV0ZWN0cyB3aGVuIGEgZ2FsbGVyeSBjYXJkIGhhcyBiZWVuIHVzZWQgYW5kIGFwcGxpZXMgc2l6aW5nIHRvIG1ha2Ugc3VyZVxuICogdGhlIGRpc3BsYXkgbWF0Y2hlcyB3aGF0IGlzIHNlZW4gaW4gdGhlIGVkaXRvci5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IGltYWdlcyA9IGdldEFsbCgnLmtnLWdhbGxlcnktaW1hZ2UgPiBpbWcnKVxuXG4gIGlmICghaW1hZ2VzLmxlbmd0aCkgcmV0dXJuXG5cbiAgaW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGltYWdlLmNsb3Nlc3QoJy5rZy1nYWxsZXJ5LWltYWdlJylcbiAgICBjb25zdCB3aWR0aCA9IGltYWdlLmF0dHJpYnV0ZXMud2lkdGgudmFsdWVcbiAgICBjb25zdCBoZWlnaHQgPSBpbWFnZS5hdHRyaWJ1dGVzLmhlaWdodC52YWx1ZVxuICAgIGNvbnN0IHJhdGlvID0gd2lkdGggLyBoZWlnaHRcbiAgICBjb250YWluZXIuc3R5bGUuZmxleCA9IHJhdGlvICsgJyAxIDAlJ1xuICB9KVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgdXJsID0+IC9eKGh0dHBzPzpcXC9cXC8pPyhbXFxkYS16XFwuLV0rKVxcLihbYS16XFwuXXsyLDZ9KShbXFwvXFx3IFxcK1xcLi1dKikqXFwvPyQvLnRlc3QodXJsKSAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgLyogSWZyYW1lIFNSQyB2aWRlbyAqL1xuICBjb25zdCBzZWxlY3RvcnMgPSBbXG4gICAgJ2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXG4gICAgJ2lmcmFtZVtzcmMqPVwiZGFpbHltb3Rpb24uY29tXCJdJyxcbiAgICAnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLmNvbVwiXScsXG4gICAgJ2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxuICAgICdpZnJhbWVbc3JjKj1cInBsYXllci50d2l0Y2gudHZcIl0nLFxuICAgICdpZnJhbWVbc3JjKj1cImtpY2tzdGFydGVyLmNvbVwiXVtzcmMqPVwidmlkZW8uaHRtbFwiXSdcbiAgXVxuXG4gIGNvbnN0IGlmcmFtZXMgPSBnZXRBbGwoc2VsZWN0b3JzLmpvaW4oJywnKSlcblxuICBpZiAoIWlmcmFtZXMubGVuZ3RoKSByZXR1cm5cblxuICBpZnJhbWVzLmZvckVhY2goZWwgPT4ge1xuICAgIGNvbnN0IHBhcmVudEZvclZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwYXJlbnRGb3JWaWRlby5jbGFzc05hbWUgPSAndmlkZW8tcmVzcG9uc2l2ZSdcbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwYXJlbnRGb3JWaWRlbywgZWwpXG4gICAgcGFyZW50Rm9yVmlkZW8uYXBwZW5kQ2hpbGQoZWwpXG4gICAgZWwucmVtb3ZlQXR0cmlidXRlKCdoZWlnaHQnKVxuICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnd2lkdGgnKVxuICB9KVxufVxuIiwiLyogZ2xvYmFsIHByaXNtSnMgZm9sbG93U29jaWFsTWVkaWEgbWVudURyb3Bkb3duIHNpdGVTZWFyY2ggKi9cblxuLy8gbGliXG5pbXBvcnQgJ2xhenlzaXplcydcblxuaW1wb3J0IGxvYWRTY3JpcHQgZnJvbSAnLi9jb21wb25lbnRzL2xvYWQtc2NyaXB0J1xuaW1wb3J0IHZpZGVvUmVzcG9uc2l2ZSBmcm9tICcuL2NvbXBvbmVudHMvdmlkZW8tcmVzcG9uc2l2ZSdcbmltcG9ydCByZXNpemVJbWFnZXNJbkdhbGxlcmllcyBmcm9tICcuL2NvbXBvbmVudHMvcmVzaXplLWltYWdlcy1nYWxsZXJpZXMnXG5pbXBvcnQgbWVkaXVtWm9vbUltZyBmcm9tICcuL2NvbXBvbmVudHMvbWVkaXVtLXpvb20nXG5pbXBvcnQgc2ltcGx5TW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJ1xuXG5pbXBvcnQgZHJvcERvd25NZW51IGZyb20gJy4vYXBwL21lbnUtZHJvcC1kb3duJ1xuaW1wb3J0IHNvY2lhbE1lZGlhIGZyb20gJy4vYXBwL3NvbmNpYWwtbWVkaWEnXG5pbXBvcnQgaGVhZGVyVHJhbnNwYXJlbmN5IGZyb20gJy4vYXBwL2hlYWRlci10cmFuc3BhcmVuY3knXG5pbXBvcnQgZGFya01vZGUgZnJvbSAnLi9hcHAvZGFyay1tb2RlJ1xuaW1wb3J0IGRyb3Bkb3duVG9nZ2xlIGZyb20gJy4vYXBwL2Ryb3Bkb3duLXRvZ2dsZSdcblxuY29uc3Qgc2ltcGx5U2V0dXAgPSAoKSA9PiB7XG4gIC8qIE1lbnUgRHJvcERvd25cbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBpZiAodHlwZW9mIG1lbnVEcm9wZG93biA9PT0gJ29iamVjdCcgJiYgbWVudURyb3Bkb3duICE9PSBudWxsKSB7XG4gICAgZHJvcERvd25NZW51KG1lbnVEcm9wZG93biwgJy5qcy1kcm9wZG93bi1tZW51JylcbiAgfVxuXG4gIC8qIFNvY2lhbCBNZWRpYVxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGlmICh0eXBlb2YgZm9sbG93U29jaWFsTWVkaWEgPT09ICdvYmplY3QnICYmIGZvbGxvd1NvY2lhbE1lZGlhICE9PSBudWxsKSB7XG4gICAgc29jaWFsTWVkaWEoZm9sbG93U29jaWFsTWVkaWEsICcuanMtc29jaWFsLW1lZGlhJylcbiAgfVxuXG4gIC8qICBUb2dnbGUgbW9kYWxcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBzaW1wbHlNb2RhbCgnLmpzLW1vZGFsJywgJy5qcy1tb2RhbC1idXR0b24nLCAnLmpzLW1vZGFsLWNsb3NlJywgJ2lzLWFjdGl2ZScpXG5cbiAgLyogVG9nZ2xlIE1lbnVcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudS10b2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdoYXMtbWVudScpXG4gIH0pXG5cbiAgLyogSGVhZGVyIFRyYW5zcGFyZW5jeVxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGhlYWRlclRyYW5zcGFyZW5jeSgnLmhhcy1jb3ZlcicsICdpcy1oZWFkLXRyYW5zcGFyZW50JylcblxuICAvKiBEYXJrIE1vZGVcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBkYXJrTW9kZSgnLmpzLWRhcmstbW9kZScpXG5cbiAgLyogQWxsIFZpZGVvIFJlc3BvbnNpdmVcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICB2aWRlb1Jlc3BvbnNpdmUoKVxuXG4gIC8qIEdhbGxlcnkgQ2FyZFxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIHJlc2l6ZUltYWdlc0luR2FsbGVyaWVzKClcblxuICAvKiBtZWRpdW0tem9vbVxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIG1lZGl1bVpvb21JbWcoJy5wb3N0LWJvZHkgaW1nJylcblxuICAvKiBEcm9wRG93biBUb2dnbGVcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBkcm9wZG93blRvZ2dsZSgnLmRyb3Bkb3duOm5vdCguaXMtaG92ZXJhYmxlKScpXG5cbiAgLyogaGlnaGxpZ2h0IHByaXNtanNcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnY29kZVtjbGFzcyo9bGFuZ3VhZ2UtXScpLmxlbmd0aCAmJiB0eXBlb2YgcHJpc21KcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsb2FkU2NyaXB0KHByaXNtSnMpXG4gIH1cblxuICAvKiBMb2FkIFNlYXJjaFxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGlmICh0eXBlb2Ygc2VhcmNoU2V0dGluZ3MgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzaXRlU2VhcmNoICE9PSAndW5kZWZpbmVkJykge1xuICAgIGxvYWRTY3JpcHQoc2l0ZVNlYXJjaClcbiAgICAvLyBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9AdHJ5Z2hvc3QvY29udGVudC1hcGlAMS40LjkvdW1kL2NvbnRlbnQtYXBpLm1pbi5qcycsICgpID0+IHtcbiAgICAvLyAgIGxvYWRTY3JpcHQoc2l0ZVNlYXJjaClcbiAgICAvLyB9KVxuICB9XG4gIC8vXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzaW1wbHlTZXR1cClcbiIsImZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlMaWtlVG9BcnJheTsiLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwidmFyIGFycmF5TGlrZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9hcnJheUxpa2VUb0FycmF5XCIpO1xuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheTsiLCIoZnVuY3Rpb24od2luZG93LCBmYWN0b3J5KSB7XG5cdHZhciBsYXp5U2l6ZXMgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmRvY3VtZW50LCBEYXRlKTtcblx0d2luZG93LmxhenlTaXplcyA9IGxhenlTaXplcztcblx0aWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBsYXp5U2l6ZXM7XG5cdH1cbn0odHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/XG4gICAgICB3aW5kb3cgOiB7fSwgZnVuY3Rpb24gbCh3aW5kb3csIGRvY3VtZW50LCBEYXRlKSB7IC8vIFBhc3MgaW4gdGhlIHdpbmRvZSBEYXRlIGZ1bmN0aW9uIGFsc28gZm9yIFNTUiBiZWNhdXNlIHRoZSBEYXRlIGNsYXNzIGNhbiBiZSBsb3N0XG5cdCd1c2Ugc3RyaWN0Jztcblx0Lypqc2hpbnQgZXFudWxsOnRydWUgKi9cblxuXHR2YXIgbGF6eXNpemVzLCBsYXp5U2l6ZXNDZmc7XG5cblx0KGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHByb3A7XG5cblx0XHR2YXIgbGF6eVNpemVzRGVmYXVsdHMgPSB7XG5cdFx0XHRsYXp5Q2xhc3M6ICdsYXp5bG9hZCcsXG5cdFx0XHRsb2FkZWRDbGFzczogJ2xhenlsb2FkZWQnLFxuXHRcdFx0bG9hZGluZ0NsYXNzOiAnbGF6eWxvYWRpbmcnLFxuXHRcdFx0cHJlbG9hZENsYXNzOiAnbGF6eXByZWxvYWQnLFxuXHRcdFx0ZXJyb3JDbGFzczogJ2xhenllcnJvcicsXG5cdFx0XHQvL3N0cmljdENsYXNzOiAnbGF6eXN0cmljdCcsXG5cdFx0XHRhdXRvc2l6ZXNDbGFzczogJ2xhenlhdXRvc2l6ZXMnLFxuXHRcdFx0c3JjQXR0cjogJ2RhdGEtc3JjJyxcblx0XHRcdHNyY3NldEF0dHI6ICdkYXRhLXNyY3NldCcsXG5cdFx0XHRzaXplc0F0dHI6ICdkYXRhLXNpemVzJyxcblx0XHRcdC8vcHJlbG9hZEFmdGVyTG9hZDogZmFsc2UsXG5cdFx0XHRtaW5TaXplOiA0MCxcblx0XHRcdGN1c3RvbU1lZGlhOiB7fSxcblx0XHRcdGluaXQ6IHRydWUsXG5cdFx0XHRleHBGYWN0b3I6IDEuNSxcblx0XHRcdGhGYWM6IDAuOCxcblx0XHRcdGxvYWRNb2RlOiAyLFxuXHRcdFx0bG9hZEhpZGRlbjogdHJ1ZSxcblx0XHRcdHJpY1RpbWVvdXQ6IDAsXG5cdFx0XHR0aHJvdHRsZURlbGF5OiAxMjUsXG5cdFx0fTtcblxuXHRcdGxhenlTaXplc0NmZyA9IHdpbmRvdy5sYXp5U2l6ZXNDb25maWcgfHwgd2luZG93LmxhenlzaXplc0NvbmZpZyB8fCB7fTtcblxuXHRcdGZvcihwcm9wIGluIGxhenlTaXplc0RlZmF1bHRzKXtcblx0XHRcdGlmKCEocHJvcCBpbiBsYXp5U2l6ZXNDZmcpKXtcblx0XHRcdFx0bGF6eVNpemVzQ2ZnW3Byb3BdID0gbGF6eVNpemVzRGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9KSgpO1xuXG5cdGlmICghZG9jdW1lbnQgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdDogZnVuY3Rpb24gKCkge30sXG5cdFx0XHRjZmc6IGxhenlTaXplc0NmZyxcblx0XHRcdG5vU3VwcG9ydDogdHJ1ZSxcblx0XHR9O1xuXHR9XG5cblx0dmFyIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0dmFyIHN1cHBvcnRQaWN0dXJlID0gd2luZG93LkhUTUxQaWN0dXJlRWxlbWVudDtcblxuXHR2YXIgX2FkZEV2ZW50TGlzdGVuZXIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5cblx0dmFyIF9nZXRBdHRyaWJ1dGUgPSAnZ2V0QXR0cmlidXRlJztcblxuXHQvKipcblx0ICogVXBkYXRlIHRvIGJpbmQgdG8gd2luZG93IGJlY2F1c2UgJ3RoaXMnIGJlY29tZXMgbnVsbCBkdXJpbmcgU1NSXG5cdCAqIGJ1aWxkcy5cblx0ICovXG5cdHZhciBhZGRFdmVudExpc3RlbmVyID0gd2luZG93W19hZGRFdmVudExpc3RlbmVyXS5iaW5kKHdpbmRvdyk7XG5cblx0dmFyIHNldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0O1xuXG5cdHZhciByZXF1ZXN0SWRsZUNhbGxiYWNrID0gd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2s7XG5cblx0dmFyIHJlZ1BpY3R1cmUgPSAvXnBpY3R1cmUkL2k7XG5cblx0dmFyIGxvYWRFdmVudHMgPSBbJ2xvYWQnLCAnZXJyb3InLCAnbGF6eWluY2x1ZGVkJywgJ19sYXp5bG9hZGVkJ107XG5cblx0dmFyIHJlZ0NsYXNzQ2FjaGUgPSB7fTtcblxuXHR2YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG5cdHZhciBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0aWYoIXJlZ0NsYXNzQ2FjaGVbY2xzXSl7XG5cdFx0XHRyZWdDbGFzc0NhY2hlW2Nsc10gPSBuZXcgUmVnRXhwKCcoXFxcXHN8XiknK2NscysnKFxcXFxzfCQpJyk7XG5cdFx0fVxuXHRcdHJldHVybiByZWdDbGFzc0NhY2hlW2Nsc10udGVzdChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpICYmIHJlZ0NsYXNzQ2FjaGVbY2xzXTtcblx0fTtcblxuXHR2YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmICghaGFzQ2xhc3MoZWxlLCBjbHMpKXtcblx0XHRcdGVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykudHJpbSgpICsgJyAnICsgY2xzKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHR2YXIgcmVnO1xuXHRcdGlmICgocmVnID0gaGFzQ2xhc3MoZWxlLGNscykpKSB7XG5cdFx0XHRlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnJlcGxhY2UocmVnLCAnICcpKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIGFkZFJlbW92ZUxvYWRFdmVudHMgPSBmdW5jdGlvbihkb20sIGZuLCBhZGQpe1xuXHRcdHZhciBhY3Rpb24gPSBhZGQgPyBfYWRkRXZlbnRMaXN0ZW5lciA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblx0XHRpZihhZGQpe1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhkb20sIGZuKTtcblx0XHR9XG5cdFx0bG9hZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2dCl7XG5cdFx0XHRkb21bYWN0aW9uXShldnQsIGZuKTtcblx0XHR9KTtcblx0fTtcblxuXHR2YXIgdHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24oZWxlbSwgbmFtZSwgZGV0YWlsLCBub0J1YmJsZXMsIG5vQ2FuY2VsYWJsZSl7XG5cdFx0dmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cblx0XHRpZighZGV0YWlsKXtcblx0XHRcdGRldGFpbCA9IHt9O1xuXHRcdH1cblxuXHRcdGRldGFpbC5pbnN0YW5jZSA9IGxhenlzaXplcztcblxuXHRcdGV2ZW50LmluaXRFdmVudChuYW1lLCAhbm9CdWJibGVzLCAhbm9DYW5jZWxhYmxlKTtcblxuXHRcdGV2ZW50LmRldGFpbCA9IGRldGFpbDtcblxuXHRcdGVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0cmV0dXJuIGV2ZW50O1xuXHR9O1xuXG5cdHZhciB1cGRhdGVQb2x5ZmlsbCA9IGZ1bmN0aW9uIChlbCwgZnVsbCl7XG5cdFx0dmFyIHBvbHlmaWxsO1xuXHRcdGlmKCAhc3VwcG9ydFBpY3R1cmUgJiYgKCBwb2x5ZmlsbCA9ICh3aW5kb3cucGljdHVyZWZpbGwgfHwgbGF6eVNpemVzQ2ZnLnBmKSApICl7XG5cdFx0XHRpZihmdWxsICYmIGZ1bGwuc3JjICYmICFlbFtfZ2V0QXR0cmlidXRlXSgnc3Jjc2V0Jykpe1xuXHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIGZ1bGwuc3JjKTtcblx0XHRcdH1cblx0XHRcdHBvbHlmaWxsKHtyZWV2YWx1YXRlOiB0cnVlLCBlbGVtZW50czogW2VsXX0pO1xuXHRcdH0gZWxzZSBpZihmdWxsICYmIGZ1bGwuc3JjKXtcblx0XHRcdGVsLnNyYyA9IGZ1bGwuc3JjO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgZ2V0Q1NTID0gZnVuY3Rpb24gKGVsZW0sIHN0eWxlKXtcblx0XHRyZXR1cm4gKGdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCkgfHwge30pW3N0eWxlXTtcblx0fTtcblxuXHR2YXIgZ2V0V2lkdGggPSBmdW5jdGlvbihlbGVtLCBwYXJlbnQsIHdpZHRoKXtcblx0XHR3aWR0aCA9IHdpZHRoIHx8IGVsZW0ub2Zmc2V0V2lkdGg7XG5cblx0XHR3aGlsZSh3aWR0aCA8IGxhenlTaXplc0NmZy5taW5TaXplICYmIHBhcmVudCAmJiAhZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0d2lkdGggPSAgcGFyZW50Lm9mZnNldFdpZHRoO1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHdpZHRoO1xuXHR9O1xuXG5cdHZhciByQUYgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcnVubmluZywgd2FpdGluZztcblx0XHR2YXIgZmlyc3RGbnMgPSBbXTtcblx0XHR2YXIgc2Vjb25kRm5zID0gW107XG5cdFx0dmFyIGZucyA9IGZpcnN0Rm5zO1xuXG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgcnVuRm5zID0gZm5zO1xuXG5cdFx0XHRmbnMgPSBmaXJzdEZucy5sZW5ndGggPyBzZWNvbmRGbnMgOiBmaXJzdEZucztcblxuXHRcdFx0cnVubmluZyA9IHRydWU7XG5cdFx0XHR3YWl0aW5nID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlKHJ1bkZucy5sZW5ndGgpe1xuXHRcdFx0XHRydW5GbnMuc2hpZnQoKSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHZhciByYWZCYXRjaCA9IGZ1bmN0aW9uKGZuLCBxdWV1ZSl7XG5cdFx0XHRpZihydW5uaW5nICYmICFxdWV1ZSl7XG5cdFx0XHRcdGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmbnMucHVzaChmbik7XG5cblx0XHRcdFx0aWYoIXdhaXRpbmcpe1xuXHRcdFx0XHRcdHdhaXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdChkb2N1bWVudC5oaWRkZW4gPyBzZXRUaW1lb3V0IDogcmVxdWVzdEFuaW1hdGlvbkZyYW1lKShydW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJhZkJhdGNoLl9sc0ZsdXNoID0gcnVuO1xuXG5cdFx0cmV0dXJuIHJhZkJhdGNoO1xuXHR9KSgpO1xuXG5cdHZhciByQUZJdCA9IGZ1bmN0aW9uKGZuLCBzaW1wbGUpe1xuXHRcdHJldHVybiBzaW1wbGUgP1xuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJBRihmbik7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQ7XG5cdH07XG5cblx0dmFyIHRocm90dGxlID0gZnVuY3Rpb24oZm4pe1xuXHRcdHZhciBydW5uaW5nO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cdFx0dmFyIGdEZWxheSA9IGxhenlTaXplc0NmZy50aHJvdHRsZURlbGF5O1xuXHRcdHZhciBySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0XHRsYXN0VGltZSA9IERhdGUubm93KCk7XG5cdFx0XHRmbigpO1xuXHRcdH07XG5cdFx0dmFyIGlkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgcklDVGltZW91dCA+IDQ5ID9cblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2socnVuLCB7dGltZW91dDogcklDVGltZW91dH0pO1xuXG5cdFx0XHRcdGlmKHJJQ1RpbWVvdXQgIT09IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0KXtcblx0XHRcdFx0XHRySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gOlxuXHRcdFx0ckFGSXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0c2V0VGltZW91dChydW4pO1xuXHRcdFx0fSwgdHJ1ZSlcblx0XHQ7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oaXNQcmlvcml0eSl7XG5cdFx0XHR2YXIgZGVsYXk7XG5cblx0XHRcdGlmKChpc1ByaW9yaXR5ID0gaXNQcmlvcml0eSA9PT0gdHJ1ZSkpe1xuXHRcdFx0XHRySUNUaW1lb3V0ID0gMzM7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJ1bm5pbmcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJ1bm5pbmcgPSAgdHJ1ZTtcblxuXHRcdFx0ZGVsYXkgPSBnRGVsYXkgLSAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lKTtcblxuXHRcdFx0aWYoZGVsYXkgPCAwKXtcblx0XHRcdFx0ZGVsYXkgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihpc1ByaW9yaXR5IHx8IGRlbGF5IDwgOSl7XG5cdFx0XHRcdGlkbGVDYWxsYmFjaygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChpZGxlQ2FsbGJhY2ssIGRlbGF5KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdC8vYmFzZWQgb24gaHR0cDovL21vZGVybmphdmFzY3JpcHQuYmxvZ3Nwb3QuZGUvMjAxMy8wOC9idWlsZGluZy1iZXR0ZXItZGVib3VuY2UuaHRtbFxuXHR2YXIgZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jKSB7XG5cdFx0dmFyIHRpbWVvdXQsIHRpbWVzdGFtcDtcblx0XHR2YXIgd2FpdCA9IDk5O1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jKCk7XG5cdFx0fTtcblx0XHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcblxuXHRcdFx0aWYgKGxhc3QgPCB3YWl0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdChyZXF1ZXN0SWRsZUNhbGxiYWNrIHx8IHJ1bikocnVuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuXHRcdFx0aWYgKCF0aW1lb3V0KSB7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdHZhciBsb2FkZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJlbG9hZEVsZW1zLCBpc0NvbXBsZXRlZCwgcmVzZXRQcmVsb2FkaW5nVGltZXIsIGxvYWRNb2RlLCBzdGFydGVkO1xuXG5cdFx0dmFyIGVMdlcsIGVsdkgsIGVMdG9wLCBlTGxlZnQsIGVMcmlnaHQsIGVMYm90dG9tLCBpc0JvZHlIaWRkZW47XG5cblx0XHR2YXIgcmVnSW1nID0gL15pbWckL2k7XG5cdFx0dmFyIHJlZ0lmcmFtZSA9IC9eaWZyYW1lJC9pO1xuXG5cdFx0dmFyIHN1cHBvcnRTY3JvbGwgPSAoJ29uc2Nyb2xsJyBpbiB3aW5kb3cpICYmICEoLyhnbGV8aW5nKWJvdC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSk7XG5cblx0XHR2YXIgc2hyaW5rRXhwYW5kID0gMDtcblx0XHR2YXIgY3VycmVudEV4cGFuZCA9IDA7XG5cblx0XHR2YXIgaXNMb2FkaW5nID0gMDtcblx0XHR2YXIgbG93UnVucyA9IC0xO1xuXG5cdFx0dmFyIHJlc2V0UHJlbG9hZGluZyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRpZighZSB8fCBpc0xvYWRpbmcgPCAwIHx8ICFlLnRhcmdldCl7XG5cdFx0XHRcdGlzTG9hZGluZyA9IDA7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBpc1Zpc2libGUgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0aWYgKGlzQm9keUhpZGRlbiA9PSBudWxsKSB7XG5cdFx0XHRcdGlzQm9keUhpZGRlbiA9IGdldENTUyhkb2N1bWVudC5ib2R5LCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaXNCb2R5SGlkZGVuIHx8ICEoZ2V0Q1NTKGVsZW0ucGFyZW50Tm9kZSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyAmJiBnZXRDU1MoZWxlbSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyk7XG5cdFx0fTtcblxuXHRcdHZhciBpc05lc3RlZFZpc2libGUgPSBmdW5jdGlvbihlbGVtLCBlbGVtRXhwYW5kKXtcblx0XHRcdHZhciBvdXRlclJlY3Q7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbTtcblx0XHRcdHZhciB2aXNpYmxlID0gaXNWaXNpYmxlKGVsZW0pO1xuXG5cdFx0XHRlTHRvcCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxib3R0b20gKz0gZWxlbUV4cGFuZDtcblx0XHRcdGVMbGVmdCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxyaWdodCArPSBlbGVtRXhwYW5kO1xuXG5cdFx0XHR3aGlsZSh2aXNpYmxlICYmIChwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50KSAmJiBwYXJlbnQgIT0gZG9jdW1lbnQuYm9keSAmJiBwYXJlbnQgIT0gZG9jRWxlbSl7XG5cdFx0XHRcdHZpc2libGUgPSAoKGdldENTUyhwYXJlbnQsICdvcGFjaXR5JykgfHwgMSkgPiAwKTtcblxuXHRcdFx0XHRpZih2aXNpYmxlICYmIGdldENTUyhwYXJlbnQsICdvdmVyZmxvdycpICE9ICd2aXNpYmxlJyl7XG5cdFx0XHRcdFx0b3V0ZXJSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRcdHZpc2libGUgPSBlTHJpZ2h0ID4gb3V0ZXJSZWN0LmxlZnQgJiZcblx0XHRcdFx0XHRcdGVMbGVmdCA8IG91dGVyUmVjdC5yaWdodCAmJlxuXHRcdFx0XHRcdFx0ZUxib3R0b20gPiBvdXRlclJlY3QudG9wIC0gMSAmJlxuXHRcdFx0XHRcdFx0ZUx0b3AgPCBvdXRlclJlY3QuYm90dG9tICsgMVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmlzaWJsZTtcblx0XHR9O1xuXG5cdFx0dmFyIGNoZWNrRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlTGxlbiwgaSwgcmVjdCwgYXV0b0xvYWRFbGVtLCBsb2FkZWRTb21ldGhpbmcsIGVsZW1FeHBhbmQsIGVsZW1OZWdhdGl2ZUV4cGFuZCwgZWxlbUV4cGFuZFZhbCxcblx0XHRcdFx0YmVmb3JlRXhwYW5kVmFsLCBkZWZhdWx0RXhwYW5kLCBwcmVsb2FkRXhwYW5kLCBoRmFjO1xuXHRcdFx0dmFyIGxhenlsb2FkRWxlbXMgPSBsYXp5c2l6ZXMuZWxlbWVudHM7XG5cblx0XHRcdGlmKChsb2FkTW9kZSA9IGxhenlTaXplc0NmZy5sb2FkTW9kZSkgJiYgaXNMb2FkaW5nIDwgOCAmJiAoZUxsZW4gPSBsYXp5bG9hZEVsZW1zLmxlbmd0aCkpe1xuXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGxvd1J1bnMrKztcblxuXHRcdFx0XHRmb3IoOyBpIDwgZUxsZW47IGkrKyl7XG5cblx0XHRcdFx0XHRpZighbGF6eWxvYWRFbGVtc1tpXSB8fCBsYXp5bG9hZEVsZW1zW2ldLl9sYXp5UmFjZSl7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIXN1cHBvcnRTY3JvbGwgfHwgKGxhenlzaXplcy5wcmVtYXR1cmVVbnZlaWwgJiYgbGF6eXNpemVzLnByZW1hdHVyZVVudmVpbChsYXp5bG9hZEVsZW1zW2ldKSkpe3VudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIShlbGVtRXhwYW5kVmFsID0gbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1leHBhbmQnKSkgfHwgIShlbGVtRXhwYW5kID0gZWxlbUV4cGFuZFZhbCAqIDEpKXtcblx0XHRcdFx0XHRcdGVsZW1FeHBhbmQgPSBjdXJyZW50RXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghZGVmYXVsdEV4cGFuZCkge1xuXHRcdFx0XHRcdFx0ZGVmYXVsdEV4cGFuZCA9ICghbGF6eVNpemVzQ2ZnLmV4cGFuZCB8fCBsYXp5U2l6ZXNDZmcuZXhwYW5kIDwgMSkgP1xuXHRcdFx0XHRcdFx0XHRkb2NFbGVtLmNsaWVudEhlaWdodCA+IDUwMCAmJiBkb2NFbGVtLmNsaWVudFdpZHRoID4gNTAwID8gNTAwIDogMzcwIDpcblx0XHRcdFx0XHRcdFx0bGF6eVNpemVzQ2ZnLmV4cGFuZDtcblxuXHRcdFx0XHRcdFx0bGF6eXNpemVzLl9kZWZFeCA9IGRlZmF1bHRFeHBhbmQ7XG5cblx0XHRcdFx0XHRcdHByZWxvYWRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kICogbGF6eVNpemVzQ2ZnLmV4cEZhY3Rvcjtcblx0XHRcdFx0XHRcdGhGYWMgPSBsYXp5U2l6ZXNDZmcuaEZhYztcblx0XHRcdFx0XHRcdGlzQm9keUhpZGRlbiA9IG51bGw7XG5cblx0XHRcdFx0XHRcdGlmKGN1cnJlbnRFeHBhbmQgPCBwcmVsb2FkRXhwYW5kICYmIGlzTG9hZGluZyA8IDEgJiYgbG93UnVucyA+IDIgJiYgbG9hZE1vZGUgPiAyICYmICFkb2N1bWVudC5oaWRkZW4pe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gcHJlbG9hZEV4cGFuZDtcblx0XHRcdFx0XHRcdFx0bG93UnVucyA9IDA7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYobG9hZE1vZGUgPiAxICYmIGxvd1J1bnMgPiAxICYmIGlzTG9hZGluZyA8IDYpe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gZGVmYXVsdEV4cGFuZDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBzaHJpbmtFeHBhbmQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoYmVmb3JlRXhwYW5kVmFsICE9PSBlbGVtRXhwYW5kKXtcblx0XHRcdFx0XHRcdGVMdlcgPSBpbm5lcldpZHRoICsgKGVsZW1FeHBhbmQgKiBoRmFjKTtcblx0XHRcdFx0XHRcdGVsdkggPSBpbm5lckhlaWdodCArIGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0XHRlbGVtTmVnYXRpdmVFeHBhbmQgPSBlbGVtRXhwYW5kICogLTE7XG5cdFx0XHRcdFx0XHRiZWZvcmVFeHBhbmRWYWwgPSBlbGVtRXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlY3QgPSBsYXp5bG9hZEVsZW1zW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdFx0aWYgKChlTGJvdHRvbSA9IHJlY3QuYm90dG9tKSA+PSBlbGVtTmVnYXRpdmVFeHBhbmQgJiZcblx0XHRcdFx0XHRcdChlTHRvcCA9IHJlY3QudG9wKSA8PSBlbHZIICYmXG5cdFx0XHRcdFx0XHQoZUxyaWdodCA9IHJlY3QucmlnaHQpID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAqIGhGYWMgJiZcblx0XHRcdFx0XHRcdChlTGxlZnQgPSByZWN0LmxlZnQpIDw9IGVMdlcgJiZcblx0XHRcdFx0XHRcdChlTGJvdHRvbSB8fCBlTHJpZ2h0IHx8IGVMbGVmdCB8fCBlTHRvcCkgJiZcblx0XHRcdFx0XHRcdChsYXp5U2l6ZXNDZmcubG9hZEhpZGRlbiB8fCBpc1Zpc2libGUobGF6eWxvYWRFbGVtc1tpXSkpICYmXG5cdFx0XHRcdFx0XHQoKGlzQ29tcGxldGVkICYmIGlzTG9hZGluZyA8IDMgJiYgIWVsZW1FeHBhbmRWYWwgJiYgKGxvYWRNb2RlIDwgMyB8fCBsb3dSdW5zIDwgNCkpIHx8IGlzTmVzdGVkVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldLCBlbGVtRXhwYW5kKSkpe1xuXHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtcblx0XHRcdFx0XHRcdGxvYWRlZFNvbWV0aGluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRpZihpc0xvYWRpbmcgPiA5KXticmVhazt9XG5cdFx0XHRcdFx0fSBlbHNlIGlmKCFsb2FkZWRTb21ldGhpbmcgJiYgaXNDb21wbGV0ZWQgJiYgIWF1dG9Mb2FkRWxlbSAmJlxuXHRcdFx0XHRcdFx0aXNMb2FkaW5nIDwgNCAmJiBsb3dSdW5zIDwgNCAmJiBsb2FkTW9kZSA+IDIgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eVNpemVzQ2ZnLnByZWxvYWRBZnRlckxvYWQpICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8ICghZWxlbUV4cGFuZFZhbCAmJiAoKGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSB8fCBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpICE9ICdhdXRvJykpKSl7XG5cdFx0XHRcdFx0XHRhdXRvTG9hZEVsZW0gPSBwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eWxvYWRFbGVtc1tpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihhdXRvTG9hZEVsZW0gJiYgIWxvYWRlZFNvbWV0aGluZyl7XG5cdFx0XHRcdFx0dW52ZWlsRWxlbWVudChhdXRvTG9hZEVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB0aHJvdHRsZWRDaGVja0VsZW1lbnRzID0gdGhyb3R0bGUoY2hlY2tFbGVtZW50cyk7XG5cblx0XHR2YXIgc3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgZWxlbSA9IGUudGFyZ2V0O1xuXG5cdFx0XHRpZiAoZWxlbS5fbGF6eUNhY2hlKSB7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5Q2FjaGU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmVzZXRQcmVsb2FkaW5nKGUpO1xuXHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRlZENsYXNzKTtcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdFx0dHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5bG9hZGVkJyk7XG5cdFx0fTtcblx0XHR2YXIgcmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3MgPSByQUZJdChzd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdHZhciByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MgPSBmdW5jdGlvbihlKXtcblx0XHRcdHJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzKHt0YXJnZXQ6IGUudGFyZ2V0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBjaGFuZ2VJZnJhbWVTcmMgPSBmdW5jdGlvbihlbGVtLCBzcmMpe1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZWxlbS5jb250ZW50V2luZG93LmxvY2F0aW9uLnJlcGxhY2Uoc3JjKTtcblx0XHRcdH0gY2F0Y2goZSl7XG5cdFx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgaGFuZGxlU291cmNlcyA9IGZ1bmN0aW9uKHNvdXJjZSl7XG5cdFx0XHR2YXIgY3VzdG9tTWVkaWE7XG5cblx0XHRcdHZhciBzb3VyY2VTcmNzZXQgPSBzb3VyY2VbX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY3NldEF0dHIpO1xuXG5cdFx0XHRpZiggKGN1c3RvbU1lZGlhID0gbGF6eVNpemVzQ2ZnLmN1c3RvbU1lZGlhW3NvdXJjZVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1tZWRpYScpIHx8IHNvdXJjZVtfZ2V0QXR0cmlidXRlXSgnbWVkaWEnKV0pICl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgY3VzdG9tTWVkaWEpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihzb3VyY2VTcmNzZXQpe1xuXHRcdFx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgbGF6eVVudmVpbCA9IHJBRkl0KGZ1bmN0aW9uIChlbGVtLCBkZXRhaWwsIGlzQXV0bywgc2l6ZXMsIGlzSW1nKXtcblx0XHRcdHZhciBzcmMsIHNyY3NldCwgcGFyZW50LCBpc1BpY3R1cmUsIGV2ZW50LCBmaXJlc0xvYWQ7XG5cblx0XHRcdGlmKCEoZXZlbnQgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenliZWZvcmV1bnZlaWwnLCBkZXRhaWwpKS5kZWZhdWx0UHJldmVudGVkKXtcblxuXHRcdFx0XHRpZihzaXplcyl7XG5cdFx0XHRcdFx0aWYoaXNBdXRvKXtcblx0XHRcdFx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHNpemVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzcmNzZXQgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNzZXRBdHRyKTtcblx0XHRcdFx0c3JjID0gZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3JjQXR0cik7XG5cblx0XHRcdFx0aWYoaXNJbWcpIHtcblx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdFx0aXNQaWN0dXJlID0gcGFyZW50ICYmIHJlZ1BpY3R1cmUudGVzdChwYXJlbnQubm9kZU5hbWUgfHwgJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZmlyZXNMb2FkID0gZGV0YWlsLmZpcmVzTG9hZCB8fCAoKCdzcmMnIGluIGVsZW0pICYmIChzcmNzZXQgfHwgc3JjIHx8IGlzUGljdHVyZSkpO1xuXG5cdFx0XHRcdGV2ZW50ID0ge3RhcmdldDogZWxlbX07XG5cblx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cblx0XHRcdFx0aWYoZmlyZXNMb2FkKXtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQocmVzZXRQcmVsb2FkaW5nVGltZXIpO1xuXHRcdFx0XHRcdHJlc2V0UHJlbG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChyZXNldFByZWxvYWRpbmcsIDI1MDApO1xuXHRcdFx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZWxlbSwgcmFmU3dpdGNoTG9hZGluZ0NsYXNzLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGlzUGljdHVyZSl7XG5cdFx0XHRcdFx0Zm9yRWFjaC5jYWxsKHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc291cmNlJyksIGhhbmRsZVNvdXJjZXMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoc3Jjc2V0KXtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc3Jjc2V0KTtcblx0XHRcdFx0fSBlbHNlIGlmKHNyYyAmJiAhaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRpZihyZWdJZnJhbWUudGVzdChlbGVtLm5vZGVOYW1lKSl7XG5cdFx0XHRcdFx0XHRjaGFuZ2VJZnJhbWVTcmMoZWxlbSwgc3JjKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5zcmMgPSBzcmM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNJbWcgJiYgKHNyY3NldCB8fCBpc1BpY3R1cmUpKXtcblx0XHRcdFx0XHR1cGRhdGVQb2x5ZmlsbChlbGVtLCB7c3JjOiBzcmN9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZihlbGVtLl9sYXp5UmFjZSl7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5UmFjZTtcblx0XHRcdH1cblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpO1xuXG5cdFx0XHRyQUYoZnVuY3Rpb24oKXtcblx0XHRcdFx0Ly8gUGFydCBvZiB0aGlzIGNhbiBiZSByZW1vdmVkIGFzIHNvb24gYXMgdGhpcyBmaXggaXMgb2xkZXI6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTc3MzEgKDIwMTUpXG5cdFx0XHRcdHZhciBpc0xvYWRlZCA9IGVsZW0uY29tcGxldGUgJiYgZWxlbS5uYXR1cmFsV2lkdGggPiAxO1xuXG5cdFx0XHRcdGlmKCAhZmlyZXNMb2FkIHx8IGlzTG9hZGVkKXtcblx0XHRcdFx0XHRpZiAoaXNMb2FkZWQpIHtcblx0XHRcdFx0XHRcdGFkZENsYXNzKGVsZW0sICdscy1pcy1jYWNoZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3dpdGNoTG9hZGluZ0NsYXNzKGV2ZW50KTtcblx0XHRcdFx0XHRlbGVtLl9sYXp5Q2FjaGUgPSB0cnVlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGlmICgnX2xhenlDYWNoZScgaW4gZWxlbSkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eUNhY2hlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sIDkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlbGVtLmxvYWRpbmcgPT0gJ2xhenknKSB7XG5cdFx0XHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0dmFyIHVudmVpbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSl7XG5cdFx0XHRpZiAoZWxlbS5fbGF6eVJhY2UpIHtyZXR1cm47fVxuXHRcdFx0dmFyIGRldGFpbDtcblxuXHRcdFx0dmFyIGlzSW1nID0gcmVnSW1nLnRlc3QoZWxlbS5ub2RlTmFtZSk7XG5cblx0XHRcdC8vYWxsb3cgdXNpbmcgc2l6ZXM9XCJhdXRvXCIsIGJ1dCBkb24ndCB1c2UuIGl0J3MgaW52YWxpZC4gVXNlIGRhdGEtc2l6ZXM9XCJhdXRvXCIgb3IgYSB2YWxpZCB2YWx1ZSBmb3Igc2l6ZXMgaW5zdGVhZCAoaS5lLjogc2l6ZXM9XCI4MHZ3XCIpXG5cdFx0XHR2YXIgc2l6ZXMgPSBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc2l6ZXNBdHRyKSB8fCBlbGVtW19nZXRBdHRyaWJ1dGVdKCdzaXplcycpKTtcblx0XHRcdHZhciBpc0F1dG8gPSBzaXplcyA9PSAnYXV0byc7XG5cblx0XHRcdGlmKCAoaXNBdXRvIHx8ICFpc0NvbXBsZXRlZCkgJiYgaXNJbWcgJiYgKGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NyYycpIHx8IGVsZW0uc3Jjc2V0KSAmJiAhZWxlbS5jb21wbGV0ZSAmJiAhaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmVycm9yQ2xhc3MpICYmIGhhc0NsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpKXtyZXR1cm47fVxuXG5cdFx0XHRkZXRhaWwgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenl1bnZlaWxyZWFkJykuZGV0YWlsO1xuXG5cdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHQgYXV0b1NpemVyLnVwZGF0ZUVsZW0oZWxlbSwgdHJ1ZSwgZWxlbS5vZmZzZXRXaWR0aCk7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uX2xhenlSYWNlID0gdHJ1ZTtcblx0XHRcdGlzTG9hZGluZysrO1xuXG5cdFx0XHRsYXp5VW52ZWlsKGVsZW0sIGRldGFpbCwgaXNBdXRvLCBzaXplcywgaXNJbWcpO1xuXHRcdH07XG5cblx0XHR2YXIgYWZ0ZXJTY3JvbGwgPSBkZWJvdW5jZShmdW5jdGlvbigpe1xuXHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMztcblx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblx0XHR9KTtcblxuXHRcdHZhciBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIgPSBmdW5jdGlvbigpe1xuXHRcdFx0aWYobGF6eVNpemVzQ2ZnLmxvYWRNb2RlID09IDMpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAyO1xuXHRcdFx0fVxuXHRcdFx0YWZ0ZXJTY3JvbGwoKTtcblx0XHR9O1xuXG5cdFx0dmFyIG9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihpc0NvbXBsZXRlZCl7cmV0dXJuO31cblx0XHRcdGlmKERhdGUubm93KCkgLSBzdGFydGVkIDwgOTk5KXtcblx0XHRcdFx0c2V0VGltZW91dChvbmxvYWQsIDk5OSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXG5cdFx0XHRpc0NvbXBsZXRlZCA9IHRydWU7XG5cblx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDM7XG5cblx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblxuXHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyLCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRcdGxhenlzaXplcy5lbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmxhenlDbGFzcyk7XG5cdFx0XHRcdHByZWxvYWRFbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmxhenlDbGFzcyArICcgJyArIGxhenlTaXplc0NmZy5wcmVsb2FkQ2xhc3MpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZiAoZS5wZXJzaXN0ZWQpIHtcblx0XHRcdFx0XHRcdHZhciBsb2FkaW5nRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXG5cdFx0XHRcdFx0XHRpZiAobG9hZGluZ0VsZW1lbnRzLmxlbmd0aCAmJiBsb2FkaW5nRWxlbWVudHMuZm9yRWFjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdGxvYWRpbmdFbGVtZW50cy5mb3JFYWNoKCBmdW5jdGlvbiAoaW1nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaW1nLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVudmVpbEVsZW1lbnQoaW1nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZih3aW5kb3cuTXV0YXRpb25PYnNlcnZlcil7XG5cdFx0XHRcdFx0bmV3IE11dGF0aW9uT2JzZXJ2ZXIoIHRocm90dGxlZENoZWNrRWxlbWVudHMgKS5vYnNlcnZlKCBkb2NFbGVtLCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Ob2RlSW5zZXJ0ZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRkb2NFbGVtW19hZGRFdmVudExpc3RlbmVyXSgnRE9NQXR0ck1vZGlmaWVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHRcdFx0c2V0SW50ZXJ2YWwodGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgOTk5KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuXHRcdFx0XHQvLywgJ2Z1bGxzY3JlZW5jaGFuZ2UnXG5cdFx0XHRcdFsnZm9jdXMnLCAnbW91c2VvdmVyJywgJ2NsaWNrJywgJ2xvYWQnLCAndHJhbnNpdGlvbmVuZCcsICdhbmltYXRpb25lbmQnXS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXShuYW1lLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoKC9kJHxeYy8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkpe1xuXHRcdFx0XHRcdG9ubG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWQpO1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXSgnRE9NQ29udGVudExvYWRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCAyMDAwMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihsYXp5c2l6ZXMuZWxlbWVudHMubGVuZ3RoKXtcblx0XHRcdFx0XHRjaGVja0VsZW1lbnRzKCk7XG5cdFx0XHRcdFx0ckFGLl9sc0ZsdXNoKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y2hlY2tFbGVtczogdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyxcblx0XHRcdHVudmVpbDogdW52ZWlsRWxlbWVudCxcblx0XHRcdF9hTFNMOiBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIsXG5cdFx0fTtcblx0fSkoKTtcblxuXG5cdHZhciBhdXRvU2l6ZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgYXV0b3NpemVzRWxlbXM7XG5cblx0XHR2YXIgc2l6ZUVsZW1lbnQgPSByQUZJdChmdW5jdGlvbihlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCl7XG5cdFx0XHR2YXIgc291cmNlcywgaSwgbGVuO1xuXHRcdFx0ZWxlbS5fbGF6eXNpemVzV2lkdGggPSB3aWR0aDtcblx0XHRcdHdpZHRoICs9ICdweCc7XG5cblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblxuXHRcdFx0aWYocmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJykpe1xuXHRcdFx0XHRzb3VyY2VzID0gcGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKTtcblx0XHRcdFx0Zm9yKGkgPSAwLCBsZW4gPSBzb3VyY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcblx0XHRcdFx0XHRzb3VyY2VzW2ldLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCB3aWR0aCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoIWV2ZW50LmRldGFpbC5kYXRhQXR0cil7XG5cdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIGV2ZW50LmRldGFpbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dmFyIGdldFNpemVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW0sIGRhdGFBdHRyLCB3aWR0aCl7XG5cdFx0XHR2YXIgZXZlbnQ7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXG5cdFx0XHRpZihwYXJlbnQpe1xuXHRcdFx0XHR3aWR0aCA9IGdldFdpZHRoKGVsZW0sIHBhcmVudCwgd2lkdGgpO1xuXHRcdFx0XHRldmVudCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWJlZm9yZXNpemVzJywge3dpZHRoOiB3aWR0aCwgZGF0YUF0dHI6ICEhZGF0YUF0dHJ9KTtcblxuXHRcdFx0XHRpZighZXZlbnQuZGVmYXVsdFByZXZlbnRlZCl7XG5cdFx0XHRcdFx0d2lkdGggPSBldmVudC5kZXRhaWwud2lkdGg7XG5cblx0XHRcdFx0XHRpZih3aWR0aCAmJiB3aWR0aCAhPT0gZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0XHRcdFx0c2l6ZUVsZW1lbnQoZWxlbSwgcGFyZW50LCBldmVudCwgd2lkdGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgdXBkYXRlRWxlbWVudHNTaXplcyA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgaTtcblx0XHRcdHZhciBsZW4gPSBhdXRvc2l6ZXNFbGVtcy5sZW5ndGg7XG5cdFx0XHRpZihsZW4pe1xuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0XHRmb3IoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdGdldFNpemVFbGVtZW50KGF1dG9zaXplc0VsZW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyA9IGRlYm91bmNlKHVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGF1dG9zaXplc0VsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcuYXV0b3NpemVzQ2xhc3MpO1xuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzKTtcblx0XHRcdH0sXG5cdFx0XHRjaGVja0VsZW1zOiBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzLFxuXHRcdFx0dXBkYXRlRWxlbTogZ2V0U2l6ZUVsZW1lbnRcblx0XHR9O1xuXHR9KSgpO1xuXG5cdHZhciBpbml0ID0gZnVuY3Rpb24oKXtcblx0XHRpZighaW5pdC5pICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpe1xuXHRcdFx0aW5pdC5pID0gdHJ1ZTtcblx0XHRcdGF1dG9TaXplci5fKCk7XG5cdFx0XHRsb2FkZXIuXygpO1xuXHRcdH1cblx0fTtcblxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYobGF6eVNpemVzQ2ZnLmluaXQpe1xuXHRcdFx0aW5pdCgpO1xuXHRcdH1cblx0fSk7XG5cblx0bGF6eXNpemVzID0ge1xuXHRcdGNmZzogbGF6eVNpemVzQ2ZnLFxuXHRcdGF1dG9TaXplcjogYXV0b1NpemVyLFxuXHRcdGxvYWRlcjogbG9hZGVyLFxuXHRcdGluaXQ6IGluaXQsXG5cdFx0dVA6IHVwZGF0ZVBvbHlmaWxsLFxuXHRcdGFDOiBhZGRDbGFzcyxcblx0XHRyQzogcmVtb3ZlQ2xhc3MsXG5cdFx0aEM6IGhhc0NsYXNzLFxuXHRcdGZpcmU6IHRyaWdnZXJFdmVudCxcblx0XHRnVzogZ2V0V2lkdGgsXG5cdFx0ckFGOiByQUYsXG5cdH07XG5cblx0cmV0dXJuIGxhenlzaXplcztcbn1cbikpO1xuIiwiLyohIG1lZGl1bS16b29tIDEuMC42IHwgTUlUIExpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb20gKi9cbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPWV8fHNlbGYpLm1lZGl1bVpvb209dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0xO3Q8YXJndW1lbnRzLmxlbmd0aDt0Kyspe3ZhciBvPWFyZ3VtZW50c1t0XTtmb3IodmFyIG4gaW4gbylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobyxuKSYmKGVbbl09b1tuXSl9cmV0dXJuIGV9LHQ9ZnVuY3Rpb24oZSl7cmV0dXJuXCJJTUdcIj09PWUudGFnTmFtZX0sbz1mdW5jdGlvbihlKXtyZXR1cm4gZSYmMT09PWUubm9kZVR5cGV9LG49ZnVuY3Rpb24oZSl7cmV0dXJuXCIuc3ZnXCI9PT0oZS5jdXJyZW50U3JjfHxlLnNyYykuc3Vic3RyKC00KS50b0xvd2VyQ2FzZSgpfSxpPWZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gQXJyYXkuaXNBcnJheShlKT9lLmZpbHRlcih0KTpmdW5jdGlvbihlKXtyZXR1cm4gTm9kZUxpc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoZSl9KGUpP1tdLnNsaWNlLmNhbGwoZSkuZmlsdGVyKHQpOm8oZSk/W2VdLmZpbHRlcih0KTpcInN0cmluZ1wiPT10eXBlb2YgZT9bXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZSkpLmZpbHRlcih0KTpbXX1jYXRjaChlKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHByb3ZpZGVkIHNlbGVjdG9yIGlzIGludmFsaWQuXFxuRXhwZWN0cyBhIENTUyBzZWxlY3RvciwgYSBOb2RlIGVsZW1lbnQsIGEgTm9kZUxpc3Qgb3IgYW4gYXJyYXkuXFxuU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb21cIil9fSxyPWZ1bmN0aW9uKGUpe3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIHQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLW92ZXJsYXlcIiksdC5zdHlsZS5iYWNrZ3JvdW5kPWUsdH0sZD1mdW5jdGlvbihlKXt2YXIgdD1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG89dC50b3Asbj10LmxlZnQsaT10LndpZHRoLHI9dC5oZWlnaHQsZD1lLmNsb25lTm9kZSgpLG09d2luZG93LnBhZ2VZT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcHx8MCxhPXdpbmRvdy5wYWdlWE9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnR8fGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdHx8MDtyZXR1cm4gZC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKSxkLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIixkLnN0eWxlLnRvcD1vK20rXCJweFwiLGQuc3R5bGUubGVmdD1uK2ErXCJweFwiLGQuc3R5bGUud2lkdGg9aStcInB4XCIsZC5zdHlsZS5oZWlnaHQ9citcInB4XCIsZC5zdHlsZS50cmFuc2Zvcm09XCJcIixkfSxtPWZ1bmN0aW9uKHQsbyl7dmFyIG49ZSh7YnViYmxlczohMSxjYW5jZWxhYmxlOiExLGRldGFpbDp2b2lkIDB9LG8pO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudClyZXR1cm4gbmV3IEN1c3RvbUV2ZW50KHQsbik7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtyZXR1cm4gaS5pbml0Q3VzdG9tRXZlbnQodCxuLmJ1YmJsZXMsbi5jYW5jZWxhYmxlLG4uZGV0YWlsKSxpfTtyZXR1cm4gZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT10JiYodD17fSk7dmFyIG89dC5pbnNlcnRBdDtpZihlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQpe3ZhciBuPWRvY3VtZW50LmhlYWR8fGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtpLnR5cGU9XCJ0ZXh0L2Nzc1wiLFwidG9wXCI9PT1vJiZuLmZpcnN0Q2hpbGQ/bi5pbnNlcnRCZWZvcmUoaSxuLmZpcnN0Q2hpbGQpOm4uYXBwZW5kQ2hpbGQoaSksaS5zdHlsZVNoZWV0P2kuc3R5bGVTaGVldC5jc3NUZXh0PWU6aS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlKSl9fShcIi5tZWRpdW0tem9vbS1vdmVybGF5e3Bvc2l0aW9uOmZpeGVkO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzO3dpbGwtY2hhbmdlOm9wYWNpdHl9Lm1lZGl1bS16b29tLS1vcGVuZWQgLm1lZGl1bS16b29tLW92ZXJsYXl7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20tb3V0O29wYWNpdHk6MX0ubWVkaXVtLXpvb20taW1hZ2V7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20taW47dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzIGN1YmljLWJlemllciguMiwwLC4yLDEpIWltcG9ydGFudH0ubWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlbnt2aXNpYmlsaXR5OmhpZGRlbn0ubWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZHtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjtjdXJzb3I6em9vbS1vdXQ7d2lsbC1jaGFuZ2U6dHJhbnNmb3JtfVwiKSxmdW5jdGlvbiB0KGEpe3ZhciBsPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxjPXdpbmRvdy5Qcm9taXNlfHxmdW5jdGlvbihlKXtmdW5jdGlvbiB0KCl7fWUodCx0KX0sdT1mdW5jdGlvbihlKXt2YXIgdD1lLnRhcmdldDt0IT09Tj8tMSE9PU8uaW5kZXhPZih0KSYmdyh7dGFyZ2V0OnR9KTpFKCl9LHM9ZnVuY3Rpb24oKXtpZighQSYmVC5vcmlnaW5hbCl7dmFyIGU9d2luZG93LnBhZ2VZT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcHx8MDtNYXRoLmFicyhrLWUpPlMuc2Nyb2xsT2Zmc2V0JiZzZXRUaW1lb3V0KEUsMTUwKX19LGY9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5rZXl8fGUua2V5Q29kZTtcIkVzY2FwZVwiIT09dCYmXCJFc2NcIiE9PXQmJjI3IT09dHx8RSgpfSxwPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LG49dDtpZih0LmJhY2tncm91bmQmJihOLnN0eWxlLmJhY2tncm91bmQ9dC5iYWNrZ3JvdW5kKSx0LmNvbnRhaW5lciYmdC5jb250YWluZXIgaW5zdGFuY2VvZiBPYmplY3QmJihuLmNvbnRhaW5lcj1lKHt9LFMuY29udGFpbmVyLHQuY29udGFpbmVyKSksdC50ZW1wbGF0ZSl7dmFyIGk9byh0LnRlbXBsYXRlKT90LnRlbXBsYXRlOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodC50ZW1wbGF0ZSk7bi50ZW1wbGF0ZT1pfXJldHVybiBTPWUoe30sUyxuKSxPLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuZGlzcGF0Y2hFdmVudChtKFwibWVkaXVtLXpvb206dXBkYXRlXCIse2RldGFpbDp7em9vbTpqfX0pKX0pKSxqfSxnPWZ1bmN0aW9uKCl7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9O3JldHVybiB0KGUoe30sUyxvKSl9LHY9ZnVuY3Rpb24oKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCx0PUFycmF5KGUpLG89MDtvPGU7bysrKXRbb109YXJndW1lbnRzW29dO3ZhciBuPXQucmVkdWNlKChmdW5jdGlvbihlLHQpe3JldHVybltdLmNvbmNhdChlLGkodCkpfSksW10pO3JldHVybiBuLmZpbHRlcigoZnVuY3Rpb24oZSl7cmV0dXJuLTE9PT1PLmluZGV4T2YoZSl9KSkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7Ty5wdXNoKGUpLGUuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlXCIpfSkpLHguZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIHQ9ZS50eXBlLG89ZS5saXN0ZW5lcixpPWUub3B0aW9ucztuLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuYWRkRXZlbnRMaXN0ZW5lcih0LG8saSl9KSl9KSksan0saD1mdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9QXJyYXkoZSksbz0wO288ZTtvKyspdFtvXT1hcmd1bWVudHNbb107VC56b29tZWQmJkUoKTt2YXIgbj10Lmxlbmd0aD4wP3QucmVkdWNlKChmdW5jdGlvbihlLHQpe3JldHVybltdLmNvbmNhdChlLGkodCkpfSksW10pOk87cmV0dXJuIG4uZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20taW1hZ2VcIiksZS5kaXNwYXRjaEV2ZW50KG0oXCJtZWRpdW0tem9vbTpkZXRhY2hcIix7ZGV0YWlsOnt6b29tOmp9fSkpfSkpLE89Ty5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVybi0xPT09bi5pbmRleE9mKGUpfSkpLGp9LHo9ZnVuY3Rpb24oZSx0KXt2YXIgbz1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06e307cmV0dXJuIE8uZm9yRWFjaCgoZnVuY3Rpb24obil7bi5hZGRFdmVudExpc3RlbmVyKFwibWVkaXVtLXpvb206XCIrZSx0LG8pfSkpLHgucHVzaCh7dHlwZTpcIm1lZGl1bS16b29tOlwiK2UsbGlzdGVuZXI6dCxvcHRpb25zOm99KSxqfSx5PWZ1bmN0aW9uKGUsdCl7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOnt9O3JldHVybiBPLmZvckVhY2goKGZ1bmN0aW9uKG4pe24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lZGl1bS16b29tOlwiK2UsdCxvKX0pKSx4PXguZmlsdGVyKChmdW5jdGlvbihvKXtyZXR1cm4hKG8udHlwZT09PVwibWVkaXVtLXpvb206XCIrZSYmby5saXN0ZW5lci50b1N0cmluZygpPT09dC50b1N0cmluZygpKX0pKSxqfSxiPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LGk9dC50YXJnZXQscj1mdW5jdGlvbigpe3ZhciB0PXt3aWR0aDpkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsaGVpZ2h0OmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsbGVmdDowLHRvcDowLHJpZ2h0OjAsYm90dG9tOjB9LGk9dm9pZCAwLHI9dm9pZCAwO2lmKFMuY29udGFpbmVyKWlmKFMuY29udGFpbmVyIGluc3RhbmNlb2YgT2JqZWN0KWk9KHQ9ZSh7fSx0LFMuY29udGFpbmVyKSkud2lkdGgtdC5sZWZ0LXQucmlnaHQtMipTLm1hcmdpbixyPXQuaGVpZ2h0LXQudG9wLXQuYm90dG9tLTIqUy5tYXJnaW47ZWxzZXt2YXIgZD0obyhTLmNvbnRhaW5lcik/Uy5jb250YWluZXI6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTLmNvbnRhaW5lcikpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG09ZC53aWR0aCxhPWQuaGVpZ2h0LGw9ZC5sZWZ0LGM9ZC50b3A7dD1lKHt9LHQse3dpZHRoOm0saGVpZ2h0OmEsbGVmdDpsLHRvcDpjfSl9aT1pfHx0LndpZHRoLTIqUy5tYXJnaW4scj1yfHx0LmhlaWdodC0yKlMubWFyZ2luO3ZhciB1PVQuem9vbWVkSGR8fFQub3JpZ2luYWwscz1uKHUpP2k6dS5uYXR1cmFsV2lkdGh8fGksZj1uKHUpP3I6dS5uYXR1cmFsSGVpZ2h0fHxyLHA9dS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxnPXAudG9wLHY9cC5sZWZ0LGg9cC53aWR0aCx6PXAuaGVpZ2h0LHk9TWF0aC5taW4ocyxpKS9oLGI9TWF0aC5taW4oZixyKS96LEU9TWF0aC5taW4oeSxiKSx3PVwic2NhbGUoXCIrRStcIikgdHJhbnNsYXRlM2QoXCIrKChpLWgpLzItditTLm1hcmdpbit0LmxlZnQpL0UrXCJweCwgXCIrKChyLXopLzItZytTLm1hcmdpbit0LnRvcCkvRStcInB4LCAwKVwiO1Quem9vbWVkLnN0eWxlLnRyYW5zZm9ybT13LFQuem9vbWVkSGQmJihULnpvb21lZEhkLnN0eWxlLnRyYW5zZm9ybT13KX07cmV0dXJuIG5ldyBjKChmdW5jdGlvbihlKXtpZihpJiYtMT09PU8uaW5kZXhPZihpKSllKGopO2Vsc2V7aWYoVC56b29tZWQpZShqKTtlbHNle2lmKGkpVC5vcmlnaW5hbD1pO2Vsc2V7aWYoIShPLmxlbmd0aD4wKSlyZXR1cm4gdm9pZCBlKGopO3ZhciB0PU87VC5vcmlnaW5hbD10WzBdfWlmKFQub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChtKFwibWVkaXVtLXpvb206b3BlblwiLHtkZXRhaWw6e3pvb206an19KSksaz13aW5kb3cucGFnZVlPZmZzZXR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B8fGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wfHwwLEE9ITAsVC56b29tZWQ9ZChULm9yaWdpbmFsKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKE4pLFMudGVtcGxhdGUpe3ZhciBuPW8oUy50ZW1wbGF0ZSk/Uy50ZW1wbGF0ZTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFMudGVtcGxhdGUpO1QudGVtcGxhdGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxULnRlbXBsYXRlLmFwcGVuZENoaWxkKG4uY29udGVudC5jbG9uZU5vZGUoITApKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFQudGVtcGxhdGUpfWlmKGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoVC56b29tZWQpLHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGZ1bmN0aW9uKCl7ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20tLW9wZW5lZFwiKX0pKSxULm9yaWdpbmFsLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZS0taGlkZGVuXCIpLFQuem9vbWVkLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZS0tb3BlbmVkXCIpLFQuem9vbWVkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLEUpLFQuem9vbWVkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsKGZ1bmN0aW9uIHQoKXtBPSExLFQuem9vbWVkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsdCksVC5vcmlnaW5hbC5kaXNwYXRjaEV2ZW50KG0oXCJtZWRpdW0tem9vbTpvcGVuZWRcIix7ZGV0YWlsOnt6b29tOmp9fSkpLGUoail9KSksVC5vcmlnaW5hbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXpvb20tc3JjXCIpKXtULnpvb21lZEhkPVQuem9vbWVkLmNsb25lTm9kZSgpLFQuem9vbWVkSGQucmVtb3ZlQXR0cmlidXRlKFwic3Jjc2V0XCIpLFQuem9vbWVkSGQucmVtb3ZlQXR0cmlidXRlKFwic2l6ZXNcIiksVC56b29tZWRIZC5zcmM9VC56b29tZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS16b29tLXNyY1wiKSxULnpvb21lZEhkLm9uZXJyb3I9ZnVuY3Rpb24oKXtjbGVhckludGVydmFsKGEpLGNvbnNvbGUud2FybihcIlVuYWJsZSB0byByZWFjaCB0aGUgem9vbSBpbWFnZSB0YXJnZXQgXCIrVC56b29tZWRIZC5zcmMpLFQuem9vbWVkSGQ9bnVsbCxyKCl9O3ZhciBhPXNldEludGVydmFsKChmdW5jdGlvbigpe1Quem9vbWVkSGQuY29tcGxldGUmJihjbGVhckludGVydmFsKGEpLFQuem9vbWVkSGQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksVC56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixFKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFQuem9vbWVkSGQpLHIoKSl9KSwxMCl9ZWxzZSBpZihULm9yaWdpbmFsLmhhc0F0dHJpYnV0ZShcInNyY3NldFwiKSl7VC56b29tZWRIZD1ULnpvb21lZC5jbG9uZU5vZGUoKSxULnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcInNpemVzXCIpLFQuem9vbWVkSGQucmVtb3ZlQXR0cmlidXRlKFwibG9hZGluZ1wiKTt2YXIgbD1ULnpvb21lZEhkLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsKGZ1bmN0aW9uKCl7VC56b29tZWRIZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGwpLFQuem9vbWVkSGQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksVC56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixFKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFQuem9vbWVkSGQpLHIoKX0pKX1lbHNlIHIoKX19fSkpfSxFPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBjKChmdW5jdGlvbihlKXtpZighQSYmVC5vcmlnaW5hbCl7QT0hMCxkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtZWRpdW0tem9vbS0tb3BlbmVkXCIpLFQuem9vbWVkLnN0eWxlLnRyYW5zZm9ybT1cIlwiLFQuem9vbWVkSGQmJihULnpvb21lZEhkLnN0eWxlLnRyYW5zZm9ybT1cIlwiKSxULnRlbXBsYXRlJiYoVC50ZW1wbGF0ZS5zdHlsZS50cmFuc2l0aW9uPVwib3BhY2l0eSAxNTBtc1wiLFQudGVtcGxhdGUuc3R5bGUub3BhY2l0eT0wKSxULm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQobShcIm1lZGl1bS16b29tOmNsb3NlXCIse2RldGFpbDp7em9vbTpqfX0pKSxULnpvb21lZC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLChmdW5jdGlvbiB0KCl7VC5vcmlnaW5hbC5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlblwiKSxkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKFQuem9vbWVkKSxULnpvb21lZEhkJiZkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKFQuem9vbWVkSGQpLGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoTiksVC56b29tZWQuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksVC50ZW1wbGF0ZSYmZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChULnRlbXBsYXRlKSxBPSExLFQuem9vbWVkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsdCksVC5vcmlnaW5hbC5kaXNwYXRjaEV2ZW50KG0oXCJtZWRpdW0tem9vbTpjbG9zZWRcIix7ZGV0YWlsOnt6b29tOmp9fSkpLFQub3JpZ2luYWw9bnVsbCxULnpvb21lZD1udWxsLFQuem9vbWVkSGQ9bnVsbCxULnRlbXBsYXRlPW51bGwsZShqKX0pKX1lbHNlIGUoail9KSl9LHc9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1lLnRhcmdldDtyZXR1cm4gVC5vcmlnaW5hbD9FKCk6Yih7dGFyZ2V0OnR9KX0sTD1mdW5jdGlvbigpe3JldHVybiBTfSxIPWZ1bmN0aW9uKCl7cmV0dXJuIE99LEM9ZnVuY3Rpb24oKXtyZXR1cm4gVC5vcmlnaW5hbH0sTz1bXSx4PVtdLEE9ITEsaz0wLFM9bCxUPXtvcmlnaW5hbDpudWxsLHpvb21lZDpudWxsLHpvb21lZEhkOm51bGwsdGVtcGxhdGU6bnVsbH07XCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKT9TPWE6KGF8fFwic3RyaW5nXCI9PXR5cGVvZiBhKSYmdihhKSxTPWUoe21hcmdpbjowLGJhY2tncm91bmQ6XCIjZmZmXCIsc2Nyb2xsT2Zmc2V0OjQwLGNvbnRhaW5lcjpudWxsLHRlbXBsYXRlOm51bGx9LFMpO3ZhciBOPXIoUy5iYWNrZ3JvdW5kKTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix1KSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixmKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIscyksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixFKTt2YXIgaj17b3BlbjpiLGNsb3NlOkUsdG9nZ2xlOncsdXBkYXRlOnAsY2xvbmU6ZyxhdHRhY2g6dixkZXRhY2g6aCxvbjp6LG9mZjp5LGdldE9wdGlvbnM6TCxnZXRJbWFnZXM6SCxnZXRab29tZWRJbWFnZTpDfTtyZXR1cm4gan19KSk7XG4iXX0=

//# sourceMappingURL=map/main.js.map
