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
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles.js");

var iterableToArrayLimit = require("./iterableToArrayLimit.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableRest = require("./nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithHoles.js":2,"./iterableToArrayLimit.js":4,"./nonIterableRest.js":5,"./unsupportedIterableToArray.js":8}],7:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],8:[function(require,module,exports){
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
},{"./arrayLikeToArray.js":1}],9:[function(require,module,exports){
(function(window, factory) {
	var lazySizes = factory(window, window.document, Date);
	window.lazySizes = lazySizes;
	if(typeof module == 'object' && module.exports){
		module.exports = lazySizes;
	}
}(typeof window != 'undefined' ?
      window : {}, 
/**
 * import("./types/global")
 * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
 */
function l(window, document, Date) { // Pass in the window Date function also for SSR because the Date class can be lost
	'use strict';
	/*jshint eqnull:true */

	var lazysizes,
		/**
		 * @type { LazySizesConfigPartial }
		 */
		lazySizesCfg;

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
			fastLoadedClass: 'ls-is-cached',
			iframeLoadMode: 0,
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
			/**
			 * @type { LazySizesConfigPartial }
			 */
			cfg: lazySizesCfg,
			/**
			 * @type { true }
			 */
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

	/**
	 * @param ele {Element}
	 * @param cls {string}
	 */
	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	/**
	 * @param ele {Element}
	 * @param cls {string}
	 */
	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	/**
	 * @param ele {Element}
	 * @param cls {string}
	 */
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

	/**
	 * @param elem { Element }
	 * @param name { string }
	 * @param detail { any }
	 * @param noBubbles { boolean }
	 * @param noCancelable { boolean }
	 * @returns { CustomEvent }
	 */
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

	/**
	 *
	 * @param elem { Element }
	 * @param parent { Element }
	 * @param [width] {number}
	 * @returns {number}
	 */
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
			var loadMode = elem.getAttribute('data-load-mode') || lazySizesCfg.iframeLoadMode;

			// loadMode can be also a string!
			if (loadMode == 0) {
				elem.contentWindow.location.replace(src);
			} else if (loadMode == 1) {
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
						addClass(elem, lazySizesCfg.fastLoadedClass);
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

		/**
		 *
		 * @param elem { Element }
		 */
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
		/**
		 *
		 * @param elem {Element}
		 * @param dataAttr
		 * @param [width] { number }
		 */
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
		/**
		 * @type { LazySizesConfigPartial }
		 */
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

},{}],10:[function(require,module,exports){
/*! medium-zoom 1.0.6 | MIT License | https://github.com/francoischalifour/medium-zoom */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).mediumZoom=t()}(this,(function(){"use strict";var e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},t=function(e){return"IMG"===e.tagName},o=function(e){return e&&1===e.nodeType},n=function(e){return".svg"===(e.currentSrc||e.src).substr(-4).toLowerCase()},i=function(e){try{return Array.isArray(e)?e.filter(t):function(e){return NodeList.prototype.isPrototypeOf(e)}(e)?[].slice.call(e).filter(t):o(e)?[e].filter(t):"string"==typeof e?[].slice.call(document.querySelectorAll(e)).filter(t):[]}catch(e){throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom")}},r=function(e){var t=document.createElement("div");return t.classList.add("medium-zoom-overlay"),t.style.background=e,t},d=function(e){var t=e.getBoundingClientRect(),o=t.top,n=t.left,i=t.width,r=t.height,d=e.cloneNode(),m=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,a=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return d.removeAttribute("id"),d.style.position="absolute",d.style.top=o+m+"px",d.style.left=n+a+"px",d.style.width=i+"px",d.style.height=r+"px",d.style.transform="",d},m=function(t,o){var n=e({bubbles:!1,cancelable:!1,detail:void 0},o);if("function"==typeof window.CustomEvent)return new CustomEvent(t,n);var i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),i};return function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===o&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}"),function t(a){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=window.Promise||function(e){function t(){}e(t,t)},u=function(e){var t=e.target;t!==N?-1!==O.indexOf(t)&&w({target:t}):E()},s=function(){if(!A&&T.original){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(k-e)>S.scrollOffset&&setTimeout(E,150)}},f=function(e){var t=e.key||e.keyCode;"Escape"!==t&&"Esc"!==t&&27!==t||E()},p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t;if(t.background&&(N.style.background=t.background),t.container&&t.container instanceof Object&&(n.container=e({},S.container,t.container)),t.template){var i=o(t.template)?t.template:document.querySelector(t.template);n.template=i}return S=e({},S,n),O.forEach((function(e){e.dispatchEvent(m("medium-zoom:update",{detail:{zoom:j}}))})),j},g=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t(e({},S,o))},v=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];var n=t.reduce((function(e,t){return[].concat(e,i(t))}),[]);return n.filter((function(e){return-1===O.indexOf(e)})).forEach((function(e){O.push(e),e.classList.add("medium-zoom-image")})),x.forEach((function(e){var t=e.type,o=e.listener,i=e.options;n.forEach((function(e){e.addEventListener(t,o,i)}))})),j},h=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];T.zoomed&&E();var n=t.length>0?t.reduce((function(e,t){return[].concat(e,i(t))}),[]):O;return n.forEach((function(e){e.classList.remove("medium-zoom-image"),e.dispatchEvent(m("medium-zoom:detach",{detail:{zoom:j}}))})),O=O.filter((function(e){return-1===n.indexOf(e)})),j},z=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return O.forEach((function(n){n.addEventListener("medium-zoom:"+e,t,o)})),x.push({type:"medium-zoom:"+e,listener:t,options:o}),j},y=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return O.forEach((function(n){n.removeEventListener("medium-zoom:"+e,t,o)})),x=x.filter((function(o){return!(o.type==="medium-zoom:"+e&&o.listener.toString()===t.toString())})),j},b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.target,r=function(){var t={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},i=void 0,r=void 0;if(S.container)if(S.container instanceof Object)i=(t=e({},t,S.container)).width-t.left-t.right-2*S.margin,r=t.height-t.top-t.bottom-2*S.margin;else{var d=(o(S.container)?S.container:document.querySelector(S.container)).getBoundingClientRect(),m=d.width,a=d.height,l=d.left,c=d.top;t=e({},t,{width:m,height:a,left:l,top:c})}i=i||t.width-2*S.margin,r=r||t.height-2*S.margin;var u=T.zoomedHd||T.original,s=n(u)?i:u.naturalWidth||i,f=n(u)?r:u.naturalHeight||r,p=u.getBoundingClientRect(),g=p.top,v=p.left,h=p.width,z=p.height,y=Math.min(s,i)/h,b=Math.min(f,r)/z,E=Math.min(y,b),w="scale("+E+") translate3d("+((i-h)/2-v+S.margin+t.left)/E+"px, "+((r-z)/2-g+S.margin+t.top)/E+"px, 0)";T.zoomed.style.transform=w,T.zoomedHd&&(T.zoomedHd.style.transform=w)};return new c((function(e){if(i&&-1===O.indexOf(i))e(j);else{if(T.zoomed)e(j);else{if(i)T.original=i;else{if(!(O.length>0))return void e(j);var t=O;T.original=t[0]}if(T.original.dispatchEvent(m("medium-zoom:open",{detail:{zoom:j}})),k=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,A=!0,T.zoomed=d(T.original),document.body.appendChild(N),S.template){var n=o(S.template)?S.template:document.querySelector(S.template);T.template=document.createElement("div"),T.template.appendChild(n.content.cloneNode(!0)),document.body.appendChild(T.template)}if(document.body.appendChild(T.zoomed),window.requestAnimationFrame((function(){document.body.classList.add("medium-zoom--opened")})),T.original.classList.add("medium-zoom-image--hidden"),T.zoomed.classList.add("medium-zoom-image--opened"),T.zoomed.addEventListener("click",E),T.zoomed.addEventListener("transitionend",(function t(){A=!1,T.zoomed.removeEventListener("transitionend",t),T.original.dispatchEvent(m("medium-zoom:opened",{detail:{zoom:j}})),e(j)})),T.original.getAttribute("data-zoom-src")){T.zoomedHd=T.zoomed.cloneNode(),T.zoomedHd.removeAttribute("srcset"),T.zoomedHd.removeAttribute("sizes"),T.zoomedHd.src=T.zoomed.getAttribute("data-zoom-src"),T.zoomedHd.onerror=function(){clearInterval(a),console.warn("Unable to reach the zoom image target "+T.zoomedHd.src),T.zoomedHd=null,r()};var a=setInterval((function(){T.zoomedHd.complete&&(clearInterval(a),T.zoomedHd.classList.add("medium-zoom-image--opened"),T.zoomedHd.addEventListener("click",E),document.body.appendChild(T.zoomedHd),r())}),10)}else if(T.original.hasAttribute("srcset")){T.zoomedHd=T.zoomed.cloneNode(),T.zoomedHd.removeAttribute("sizes"),T.zoomedHd.removeAttribute("loading");var l=T.zoomedHd.addEventListener("load",(function(){T.zoomedHd.removeEventListener("load",l),T.zoomedHd.classList.add("medium-zoom-image--opened"),T.zoomedHd.addEventListener("click",E),document.body.appendChild(T.zoomedHd),r()}))}else r()}}}))},E=function(){return new c((function(e){if(!A&&T.original){A=!0,document.body.classList.remove("medium-zoom--opened"),T.zoomed.style.transform="",T.zoomedHd&&(T.zoomedHd.style.transform=""),T.template&&(T.template.style.transition="opacity 150ms",T.template.style.opacity=0),T.original.dispatchEvent(m("medium-zoom:close",{detail:{zoom:j}})),T.zoomed.addEventListener("transitionend",(function t(){T.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(T.zoomed),T.zoomedHd&&document.body.removeChild(T.zoomedHd),document.body.removeChild(N),T.zoomed.classList.remove("medium-zoom-image--opened"),T.template&&document.body.removeChild(T.template),A=!1,T.zoomed.removeEventListener("transitionend",t),T.original.dispatchEvent(m("medium-zoom:closed",{detail:{zoom:j}})),T.original=null,T.zoomed=null,T.zoomedHd=null,T.template=null,e(j)}))}else e(j)}))},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.target;return T.original?E():b({target:t})},L=function(){return S},H=function(){return O},C=function(){return T.original},O=[],x=[],A=!1,k=0,S=l,T={original:null,zoomed:null,zoomedHd:null,template:null};"[object Object]"===Object.prototype.toString.call(a)?S=a:(a||"string"==typeof a)&&v(a),S=e({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},S);var N=r(S.background);document.addEventListener("click",u),document.addEventListener("keyup",f),document.addEventListener("scroll",s),window.addEventListener("resize",E);var j={open:b,close:E,toggle:w,update:p,clone:g,attach:v,detach:h,on:z,off:y,getOptions:L,getImages:H,getZoomedImage:C};return j}}));

},{}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getAll = _interopRequireDefault(require("./get-all"));

/* global localStorage  */
var _default = function _default(el) {
  var toggleTheme = (0, _getAll.default)(el);
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

exports.default = _default;

},{"./get-all":13,"@babel/runtime/helpers/interopRequireDefault":3}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getAll = _interopRequireDefault(require("./get-all"));

var _default = function _default(dropdownsBoxs) {
  var dropdowns = (0, _getAll.default)(dropdownsBoxs);
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

exports.default = _default;

},{"./get-all":13,"@babel/runtime/helpers/interopRequireDefault":3}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

exports.default = _default;

},{}],15:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        name = _ref2[0],
        url = _ref2[1];

    if (name !== 'string' && !(0, _urlRegularExpression.default)(url)) return;
    var link = document.createElement('a');
    link.href = url;
    link.classList = 'dropdown-item hover:text-primary';
    link.innerText = name; // link.innerHTML = `<a href="${url}" class="dropdown-item hover:text-primary">${name}</a>`

    newbox.appendChild(link);
  });
};

exports.default = _default;

},{"../components/url-regular-expression":21,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/helpers/slicedToArray":6}],16:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _urlRegularExpression = _interopRequireDefault(require("../components/url-regular-expression"));

var _getAll = _interopRequireDefault(require("./get-all"));

// import { urlRegexp } from './app.variables'
var _default = function _default(socialMediaData, boxSelector) {
  // check if the box for the menu exists
  var nodeBox = (0, _getAll.default)(boxSelector);
  if (!nodeBox.length) return;

  var createElement = function createElement(element) {
    Object.entries(socialMediaData).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          name = _ref2[0],
          urlTitle = _ref2[1];

      var url = urlTitle[0]; // The url is being validated if it is false it returns

      if (!(0, _urlRegularExpression.default)(url)) return;
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

exports.default = _default;

},{"../components/url-regular-expression":21,"./get-all":13,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/helpers/slicedToArray":6}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(src, callback) {
  var scriptElement = document.createElement('script');
  scriptElement.src = src;
  scriptElement.defer = true;
  scriptElement.async = true;
  callback && scriptElement.addEventListener('load', callback);
  document.body.appendChild(scriptElement);
};

exports.default = _default;

},{}],18:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mediumZoom = _interopRequireDefault(require("medium-zoom"));

var _getAll = _interopRequireDefault(require("../app/get-all"));

var _default = function _default(img) {
  (0, _getAll.default)(img).forEach(function (el) {
    return !el.closest('a') && el.classList.add('simply-zoom');
  });
  (0, _mediumZoom.default)('.simply-zoom', {
    margin: 20,
    background: 'hsla(0,0%,100%,.85)'
  });
};

exports.default = _default;

},{"../app/get-all":13,"@babel/runtime/helpers/interopRequireDefault":3,"medium-zoom":10}],19:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getAll = _interopRequireDefault(require("../app/get-all"));

// Moodal
var _default = function _default(modal, modalButton, modalClose, isActive) {
  var rootEl = document.documentElement;
  var $modals = (0, _getAll.default)(modal);
  var $modalButtons = (0, _getAll.default)(modalButton);
  var $modalCloses = (0, _getAll.default)(modalClose); // Modal Click Open

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

exports.default = _default;

},{"../app/get-all":13,"@babel/runtime/helpers/interopRequireDefault":3}],20:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getAll = _interopRequireDefault(require("../app/get-all"));

/**
 * Gallery card support
 * Used on any individual post/page
 *
 * Detects when a gallery card has been used and applies sizing to make sure
 * the display matches what is seen in the editor.
 */
var _default = function _default() {
  var images = (0, _getAll.default)('.kg-gallery-image > img');
  if (!images.length) return;
  images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });
};

exports.default = _default;

},{"../app/get-all":13,"@babel/runtime/helpers/interopRequireDefault":3}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(url) {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/.test(url);
}; //eslint-disable-line


exports.default = _default;

},{}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getAll = _interopRequireDefault(require("../app/get-all"));

var _default = function _default() {
  /* Iframe SRC video */
  var selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="dailymotion.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="player.twitch.tv"]', 'iframe[src*="kickstarter.com"][src*="video.html"]'];
  var iframes = (0, _getAll.default)(selectors.join(','));
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

exports.default = _default;

},{"../app/get-all":13,"@babel/runtime/helpers/interopRequireDefault":3}],23:[function(require,module,exports){
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
  if ((typeof menuDropdown === "undefined" ? "undefined" : (0, _typeof2.default)(menuDropdown)) === 'object' && menuDropdown !== null) {
    (0, _menuDropDown.default)(menuDropdown, '.js-dropdown-menu');
  }
  /* Social Media
  /* ---------------------------------------------------------- */


  if ((typeof followSocialMedia === "undefined" ? "undefined" : (0, _typeof2.default)(followSocialMedia)) === 'object' && followSocialMedia !== null) {
    (0, _soncialMedia.default)(followSocialMedia, '.js-social-media');
  }
  /*  Toggle modal
  /* ---------------------------------------------------------- */


  (0, _modal.default)('.js-modal', '.js-modal-button', '.js-modal-close', 'is-active');
  /* Toggle Menu
  /* ---------------------------------------------------------- */

  document.querySelector('.js-menu-toggle').addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('has-menu');
  });
  /* Header Transparency
  /* ---------------------------------------------------------- */

  (0, _headerTransparency.default)('.has-cover', 'is-head-transparent');
  /* Dark Mode
  /* ---------------------------------------------------------- */

  (0, _darkMode.default)('.js-dark-mode');
  /* All Video Responsive
  /* ---------------------------------------------------------- */

  (0, _videoResponsive.default)();
  /* Gallery Card
  /* ---------------------------------------------------------- */

  (0, _resizeImagesGalleries.default)();
  /* medium-zoom
  /* ---------------------------------------------------------- */

  (0, _mediumZoom.default)('.post-body img');
  /* DropDown Toggle
  /* ---------------------------------------------------------- */

  (0, _dropdownToggle.default)('.dropdown:not(.is-hoverable)');
  /* highlight prismjs
  /* ---------------------------------------------------------- */

  if (document.querySelectorAll('code[class*=language-]').length && typeof prismJs !== 'undefined') {
    (0, _loadScript.default)(prismJs);
  }
  /* Load Search
  /* ---------------------------------------------------------- */


  if (typeof searchSettings !== 'undefined' && typeof siteSearch !== 'undefined') {
    (0, _loadScript.default)(siteSearch); // loadScript('https://unpkg.com/@tryghost/content-api@1.4.9/umd/content-api.min.js', () => {
    //   loadScript(siteSearch)
    // })
  } //

};

document.addEventListener('DOMContentLoaded', simplySetup);

},{"./app/dark-mode":11,"./app/dropdown-toggle":12,"./app/header-transparency":14,"./app/menu-drop-down":15,"./app/soncial-media":16,"./components/load-script":17,"./components/medium-zoom":18,"./components/modal":19,"./components/resize-images-galleries":20,"./components/video-responsive":22,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/helpers/typeof":7,"lazysizes":9}]},{},[23])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sYXp5c2l6ZXMvbGF6eXNpemVzLmpzIiwibm9kZV9tb2R1bGVzL21lZGl1bS16b29tL2Rpc3QvbWVkaXVtLXpvb20ubWluLmpzIiwic3JjL2pzL2FwcC9kYXJrLW1vZGUuanMiLCJzcmMvanMvYXBwL2Ryb3Bkb3duLXRvZ2dsZS5qcyIsInNyYy9qcy9hcHAvZ2V0LWFsbC5qcyIsInNyYy9qcy9hcHAvaGVhZGVyLXRyYW5zcGFyZW5jeS5qcyIsInNyYy9qcy9hcHAvbWVudS1kcm9wLWRvd24uanMiLCJzcmMvanMvYXBwL3NvbmNpYWwtbWVkaWEuanMiLCJzcmMvanMvY29tcG9uZW50cy9sb2FkLXNjcmlwdC5qcyIsInNyYy9qcy9jb21wb25lbnRzL21lZGl1bS16b29tLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJzcmMvanMvY29tcG9uZW50cy9yZXNpemUtaW1hZ2VzLWdhbGxlcmllcy5qcyIsInNyYy9qcy9jb21wb25lbnRzL3VybC1yZWd1bGFyLWV4cHJlc3Npb24uanMiLCJzcmMvanMvY29tcG9uZW50cy92aWRlby1yZXNwb25zaXZlLmpzIiwic3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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bkIsRUFBaUMscUJBQWpDO0FBRUE7QUFDRjs7QUFDRSx5QkFBUyxlQUFUO0FBRUE7QUFDRjs7QUFDRTtBQUVBO0FBQ0Y7O0FBQ0U7QUFFQTtBQUNGOztBQUNFLDJCQUFjLGdCQUFkO0FBRUE7QUFDRjs7QUFDRSwrQkFBZSw4QkFBZjtBQUVBO0FBQ0Y7O0FBQ0UsTUFBSSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsd0JBQTFCLEVBQW9ELE1BQXBELElBQThELE9BQU8sT0FBUCxLQUFtQixXQUFyRixFQUFrRztBQUNoRyw2QkFBVyxPQUFYO0FBQ0Q7QUFFRDtBQUNGOzs7QUFDRSxNQUFJLE9BQU8sY0FBUCxLQUEwQixXQUExQixJQUF5QyxPQUFPLFVBQVAsS0FBc0IsV0FBbkUsRUFBZ0Y7QUFDOUUsNkJBQVcsVUFBWCxFQUQ4RSxDQUU5RTtBQUNBO0FBQ0E7QUFDRCxHQTdEdUIsQ0E4RHhCOztBQUNELENBL0REOztBQWlFQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFdBQTlDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheUxpa2VUb0FycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlcywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXMuanNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCIpO1xuXG52YXIgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBhcnJheUxpa2VUb0FycmF5ID0gcmVxdWlyZShcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiKTtcblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIoZnVuY3Rpb24od2luZG93LCBmYWN0b3J5KSB7XG5cdHZhciBsYXp5U2l6ZXMgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmRvY3VtZW50LCBEYXRlKTtcblx0d2luZG93LmxhenlTaXplcyA9IGxhenlTaXplcztcblx0aWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBsYXp5U2l6ZXM7XG5cdH1cbn0odHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/XG4gICAgICB3aW5kb3cgOiB7fSwgXG4vKipcbiAqIGltcG9ydChcIi4vdHlwZXMvZ2xvYmFsXCIpXG4gKiBAdHlwZWRlZiB7IGltcG9ydChcIi4vdHlwZXMvbGF6eXNpemVzLWNvbmZpZ1wiKS5MYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH0gTGF6eVNpemVzQ29uZmlnUGFydGlhbFxuICovXG5mdW5jdGlvbiBsKHdpbmRvdywgZG9jdW1lbnQsIERhdGUpIHsgLy8gUGFzcyBpbiB0aGUgd2luZG93IERhdGUgZnVuY3Rpb24gYWxzbyBmb3IgU1NSIGJlY2F1c2UgdGhlIERhdGUgY2xhc3MgY2FuIGJlIGxvc3Rcblx0J3VzZSBzdHJpY3QnO1xuXHQvKmpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXG5cdHZhciBsYXp5c2l6ZXMsXG5cdFx0LyoqXG5cdFx0ICogQHR5cGUgeyBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH1cblx0XHQgKi9cblx0XHRsYXp5U2l6ZXNDZmc7XG5cblx0KGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHByb3A7XG5cblx0XHR2YXIgbGF6eVNpemVzRGVmYXVsdHMgPSB7XG5cdFx0XHRsYXp5Q2xhc3M6ICdsYXp5bG9hZCcsXG5cdFx0XHRsb2FkZWRDbGFzczogJ2xhenlsb2FkZWQnLFxuXHRcdFx0bG9hZGluZ0NsYXNzOiAnbGF6eWxvYWRpbmcnLFxuXHRcdFx0cHJlbG9hZENsYXNzOiAnbGF6eXByZWxvYWQnLFxuXHRcdFx0ZXJyb3JDbGFzczogJ2xhenllcnJvcicsXG5cdFx0XHQvL3N0cmljdENsYXNzOiAnbGF6eXN0cmljdCcsXG5cdFx0XHRhdXRvc2l6ZXNDbGFzczogJ2xhenlhdXRvc2l6ZXMnLFxuXHRcdFx0ZmFzdExvYWRlZENsYXNzOiAnbHMtaXMtY2FjaGVkJyxcblx0XHRcdGlmcmFtZUxvYWRNb2RlOiAwLFxuXHRcdFx0c3JjQXR0cjogJ2RhdGEtc3JjJyxcblx0XHRcdHNyY3NldEF0dHI6ICdkYXRhLXNyY3NldCcsXG5cdFx0XHRzaXplc0F0dHI6ICdkYXRhLXNpemVzJyxcblx0XHRcdC8vcHJlbG9hZEFmdGVyTG9hZDogZmFsc2UsXG5cdFx0XHRtaW5TaXplOiA0MCxcblx0XHRcdGN1c3RvbU1lZGlhOiB7fSxcblx0XHRcdGluaXQ6IHRydWUsXG5cdFx0XHRleHBGYWN0b3I6IDEuNSxcblx0XHRcdGhGYWM6IDAuOCxcblx0XHRcdGxvYWRNb2RlOiAyLFxuXHRcdFx0bG9hZEhpZGRlbjogdHJ1ZSxcblx0XHRcdHJpY1RpbWVvdXQ6IDAsXG5cdFx0XHR0aHJvdHRsZURlbGF5OiAxMjUsXG5cdFx0fTtcblxuXHRcdGxhenlTaXplc0NmZyA9IHdpbmRvdy5sYXp5U2l6ZXNDb25maWcgfHwgd2luZG93LmxhenlzaXplc0NvbmZpZyB8fCB7fTtcblxuXHRcdGZvcihwcm9wIGluIGxhenlTaXplc0RlZmF1bHRzKXtcblx0XHRcdGlmKCEocHJvcCBpbiBsYXp5U2l6ZXNDZmcpKXtcblx0XHRcdFx0bGF6eVNpemVzQ2ZnW3Byb3BdID0gbGF6eVNpemVzRGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9KSgpO1xuXG5cdGlmICghZG9jdW1lbnQgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdDogZnVuY3Rpb24gKCkge30sXG5cdFx0XHQvKipcblx0XHRcdCAqIEB0eXBlIHsgTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9XG5cdFx0XHQgKi9cblx0XHRcdGNmZzogbGF6eVNpemVzQ2ZnLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAdHlwZSB7IHRydWUgfVxuXHRcdFx0ICovXG5cdFx0XHRub1N1cHBvcnQ6IHRydWUsXG5cdFx0fTtcblx0fVxuXG5cdHZhciBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cdHZhciBzdXBwb3J0UGljdHVyZSA9IHdpbmRvdy5IVE1MUGljdHVyZUVsZW1lbnQ7XG5cblx0dmFyIF9hZGRFdmVudExpc3RlbmVyID0gJ2FkZEV2ZW50TGlzdGVuZXInO1xuXG5cdHZhciBfZ2V0QXR0cmlidXRlID0gJ2dldEF0dHJpYnV0ZSc7XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0byBiaW5kIHRvIHdpbmRvdyBiZWNhdXNlICd0aGlzJyBiZWNvbWVzIG51bGwgZHVyaW5nIFNTUlxuXHQgKiBidWlsZHMuXG5cdCAqL1xuXHR2YXIgYWRkRXZlbnRMaXN0ZW5lciA9IHdpbmRvd1tfYWRkRXZlbnRMaXN0ZW5lcl0uYmluZCh3aW5kb3cpO1xuXG5cdHZhciBzZXRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQ7XG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dDtcblxuXHR2YXIgcmVxdWVzdElkbGVDYWxsYmFjayA9IHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrO1xuXG5cdHZhciByZWdQaWN0dXJlID0gL15waWN0dXJlJC9pO1xuXG5cdHZhciBsb2FkRXZlbnRzID0gWydsb2FkJywgJ2Vycm9yJywgJ2xhenlpbmNsdWRlZCcsICdfbGF6eWxvYWRlZCddO1xuXG5cdHZhciByZWdDbGFzc0NhY2hlID0ge307XG5cblx0dmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZSB7RWxlbWVudH1cblx0ICogQHBhcmFtIGNscyB7c3RyaW5nfVxuXHQgKi9cblx0dmFyIGhhc0NsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHRpZighcmVnQ2xhc3NDYWNoZVtjbHNdKXtcblx0XHRcdHJlZ0NsYXNzQ2FjaGVbY2xzXSA9IG5ldyBSZWdFeHAoJyhcXFxcc3xeKScrY2xzKycoXFxcXHN8JCknKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlZ0NsYXNzQ2FjaGVbY2xzXS50ZXN0KGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykgJiYgcmVnQ2xhc3NDYWNoZVtjbHNdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlIHtFbGVtZW50fVxuXHQgKiBAcGFyYW0gY2xzIHtzdHJpbmd9XG5cdCAqL1xuXHR2YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmICghaGFzQ2xhc3MoZWxlLCBjbHMpKXtcblx0XHRcdGVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykudHJpbSgpICsgJyAnICsgY2xzKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGUge0VsZW1lbnR9XG5cdCAqIEBwYXJhbSBjbHMge3N0cmluZ31cblx0ICovXG5cdHZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0dmFyIHJlZztcblx0XHRpZiAoKHJlZyA9IGhhc0NsYXNzKGVsZSxjbHMpKSkge1xuXHRcdFx0ZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS5yZXBsYWNlKHJlZywgJyAnKSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBhZGRSZW1vdmVMb2FkRXZlbnRzID0gZnVuY3Rpb24oZG9tLCBmbiwgYWRkKXtcblx0XHR2YXIgYWN0aW9uID0gYWRkID8gX2FkZEV2ZW50TGlzdGVuZXIgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cdFx0aWYoYWRkKXtcblx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZG9tLCBmbik7XG5cdFx0fVxuXHRcdGxvYWRFdmVudHMuZm9yRWFjaChmdW5jdGlvbihldnQpe1xuXHRcdFx0ZG9tW2FjdGlvbl0oZXZ0LCBmbik7XG5cdFx0fSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGVtIHsgRWxlbWVudCB9XG5cdCAqIEBwYXJhbSBuYW1lIHsgc3RyaW5nIH1cblx0ICogQHBhcmFtIGRldGFpbCB7IGFueSB9XG5cdCAqIEBwYXJhbSBub0J1YmJsZXMgeyBib29sZWFuIH1cblx0ICogQHBhcmFtIG5vQ2FuY2VsYWJsZSB7IGJvb2xlYW4gfVxuXHQgKiBAcmV0dXJucyB7IEN1c3RvbUV2ZW50IH1cblx0ICovXG5cdHZhciB0cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbihlbGVtLCBuYW1lLCBkZXRhaWwsIG5vQnViYmxlcywgbm9DYW5jZWxhYmxlKXtcblx0XHR2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblxuXHRcdGlmKCFkZXRhaWwpe1xuXHRcdFx0ZGV0YWlsID0ge307XG5cdFx0fVxuXG5cdFx0ZGV0YWlsLmluc3RhbmNlID0gbGF6eXNpemVzO1xuXG5cdFx0ZXZlbnQuaW5pdEV2ZW50KG5hbWUsICFub0J1YmJsZXMsICFub0NhbmNlbGFibGUpO1xuXG5cdFx0ZXZlbnQuZGV0YWlsID0gZGV0YWlsO1xuXG5cdFx0ZWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRyZXR1cm4gZXZlbnQ7XG5cdH07XG5cblx0dmFyIHVwZGF0ZVBvbHlmaWxsID0gZnVuY3Rpb24gKGVsLCBmdWxsKXtcblx0XHR2YXIgcG9seWZpbGw7XG5cdFx0aWYoICFzdXBwb3J0UGljdHVyZSAmJiAoIHBvbHlmaWxsID0gKHdpbmRvdy5waWN0dXJlZmlsbCB8fCBsYXp5U2l6ZXNDZmcucGYpICkgKXtcblx0XHRcdGlmKGZ1bGwgJiYgZnVsbC5zcmMgJiYgIWVsW19nZXRBdHRyaWJ1dGVdKCdzcmNzZXQnKSl7XG5cdFx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgZnVsbC5zcmMpO1xuXHRcdFx0fVxuXHRcdFx0cG9seWZpbGwoe3JlZXZhbHVhdGU6IHRydWUsIGVsZW1lbnRzOiBbZWxdfSk7XG5cdFx0fSBlbHNlIGlmKGZ1bGwgJiYgZnVsbC5zcmMpe1xuXHRcdFx0ZWwuc3JjID0gZnVsbC5zcmM7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBnZXRDU1MgPSBmdW5jdGlvbiAoZWxlbSwgc3R5bGUpe1xuXHRcdHJldHVybiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKSB8fCB7fSlbc3R5bGVdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZWxlbSB7IEVsZW1lbnQgfVxuXHQgKiBAcGFyYW0gcGFyZW50IHsgRWxlbWVudCB9XG5cdCAqIEBwYXJhbSBbd2lkdGhdIHtudW1iZXJ9XG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHR2YXIgZ2V0V2lkdGggPSBmdW5jdGlvbihlbGVtLCBwYXJlbnQsIHdpZHRoKXtcblx0XHR3aWR0aCA9IHdpZHRoIHx8IGVsZW0ub2Zmc2V0V2lkdGg7XG5cblx0XHR3aGlsZSh3aWR0aCA8IGxhenlTaXplc0NmZy5taW5TaXplICYmIHBhcmVudCAmJiAhZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0d2lkdGggPSAgcGFyZW50Lm9mZnNldFdpZHRoO1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHdpZHRoO1xuXHR9O1xuXG5cdHZhciByQUYgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcnVubmluZywgd2FpdGluZztcblx0XHR2YXIgZmlyc3RGbnMgPSBbXTtcblx0XHR2YXIgc2Vjb25kRm5zID0gW107XG5cdFx0dmFyIGZucyA9IGZpcnN0Rm5zO1xuXG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgcnVuRm5zID0gZm5zO1xuXG5cdFx0XHRmbnMgPSBmaXJzdEZucy5sZW5ndGggPyBzZWNvbmRGbnMgOiBmaXJzdEZucztcblxuXHRcdFx0cnVubmluZyA9IHRydWU7XG5cdFx0XHR3YWl0aW5nID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlKHJ1bkZucy5sZW5ndGgpe1xuXHRcdFx0XHRydW5GbnMuc2hpZnQoKSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHZhciByYWZCYXRjaCA9IGZ1bmN0aW9uKGZuLCBxdWV1ZSl7XG5cdFx0XHRpZihydW5uaW5nICYmICFxdWV1ZSl7XG5cdFx0XHRcdGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmbnMucHVzaChmbik7XG5cblx0XHRcdFx0aWYoIXdhaXRpbmcpe1xuXHRcdFx0XHRcdHdhaXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdChkb2N1bWVudC5oaWRkZW4gPyBzZXRUaW1lb3V0IDogcmVxdWVzdEFuaW1hdGlvbkZyYW1lKShydW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJhZkJhdGNoLl9sc0ZsdXNoID0gcnVuO1xuXG5cdFx0cmV0dXJuIHJhZkJhdGNoO1xuXHR9KSgpO1xuXG5cdHZhciByQUZJdCA9IGZ1bmN0aW9uKGZuLCBzaW1wbGUpe1xuXHRcdHJldHVybiBzaW1wbGUgP1xuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJBRihmbik7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQ7XG5cdH07XG5cblx0dmFyIHRocm90dGxlID0gZnVuY3Rpb24oZm4pe1xuXHRcdHZhciBydW5uaW5nO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cdFx0dmFyIGdEZWxheSA9IGxhenlTaXplc0NmZy50aHJvdHRsZURlbGF5O1xuXHRcdHZhciBySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0XHRsYXN0VGltZSA9IERhdGUubm93KCk7XG5cdFx0XHRmbigpO1xuXHRcdH07XG5cdFx0dmFyIGlkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgcklDVGltZW91dCA+IDQ5ID9cblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2socnVuLCB7dGltZW91dDogcklDVGltZW91dH0pO1xuXG5cdFx0XHRcdGlmKHJJQ1RpbWVvdXQgIT09IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0KXtcblx0XHRcdFx0XHRySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gOlxuXHRcdFx0ckFGSXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0c2V0VGltZW91dChydW4pO1xuXHRcdFx0fSwgdHJ1ZSlcblx0XHQ7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oaXNQcmlvcml0eSl7XG5cdFx0XHR2YXIgZGVsYXk7XG5cblx0XHRcdGlmKChpc1ByaW9yaXR5ID0gaXNQcmlvcml0eSA9PT0gdHJ1ZSkpe1xuXHRcdFx0XHRySUNUaW1lb3V0ID0gMzM7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJ1bm5pbmcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJ1bm5pbmcgPSAgdHJ1ZTtcblxuXHRcdFx0ZGVsYXkgPSBnRGVsYXkgLSAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lKTtcblxuXHRcdFx0aWYoZGVsYXkgPCAwKXtcblx0XHRcdFx0ZGVsYXkgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihpc1ByaW9yaXR5IHx8IGRlbGF5IDwgOSl7XG5cdFx0XHRcdGlkbGVDYWxsYmFjaygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChpZGxlQ2FsbGJhY2ssIGRlbGF5KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdC8vYmFzZWQgb24gaHR0cDovL21vZGVybmphdmFzY3JpcHQuYmxvZ3Nwb3QuZGUvMjAxMy8wOC9idWlsZGluZy1iZXR0ZXItZGVib3VuY2UuaHRtbFxuXHR2YXIgZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jKSB7XG5cdFx0dmFyIHRpbWVvdXQsIHRpbWVzdGFtcDtcblx0XHR2YXIgd2FpdCA9IDk5O1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jKCk7XG5cdFx0fTtcblx0XHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcblxuXHRcdFx0aWYgKGxhc3QgPCB3YWl0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdChyZXF1ZXN0SWRsZUNhbGxiYWNrIHx8IHJ1bikocnVuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuXHRcdFx0aWYgKCF0aW1lb3V0KSB7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdHZhciBsb2FkZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJlbG9hZEVsZW1zLCBpc0NvbXBsZXRlZCwgcmVzZXRQcmVsb2FkaW5nVGltZXIsIGxvYWRNb2RlLCBzdGFydGVkO1xuXG5cdFx0dmFyIGVMdlcsIGVsdkgsIGVMdG9wLCBlTGxlZnQsIGVMcmlnaHQsIGVMYm90dG9tLCBpc0JvZHlIaWRkZW47XG5cblx0XHR2YXIgcmVnSW1nID0gL15pbWckL2k7XG5cdFx0dmFyIHJlZ0lmcmFtZSA9IC9eaWZyYW1lJC9pO1xuXG5cdFx0dmFyIHN1cHBvcnRTY3JvbGwgPSAoJ29uc2Nyb2xsJyBpbiB3aW5kb3cpICYmICEoLyhnbGV8aW5nKWJvdC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSk7XG5cblx0XHR2YXIgc2hyaW5rRXhwYW5kID0gMDtcblx0XHR2YXIgY3VycmVudEV4cGFuZCA9IDA7XG5cblx0XHR2YXIgaXNMb2FkaW5nID0gMDtcblx0XHR2YXIgbG93UnVucyA9IC0xO1xuXG5cdFx0dmFyIHJlc2V0UHJlbG9hZGluZyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRpZighZSB8fCBpc0xvYWRpbmcgPCAwIHx8ICFlLnRhcmdldCl7XG5cdFx0XHRcdGlzTG9hZGluZyA9IDA7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBpc1Zpc2libGUgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0aWYgKGlzQm9keUhpZGRlbiA9PSBudWxsKSB7XG5cdFx0XHRcdGlzQm9keUhpZGRlbiA9IGdldENTUyhkb2N1bWVudC5ib2R5LCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaXNCb2R5SGlkZGVuIHx8ICEoZ2V0Q1NTKGVsZW0ucGFyZW50Tm9kZSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyAmJiBnZXRDU1MoZWxlbSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyk7XG5cdFx0fTtcblxuXHRcdHZhciBpc05lc3RlZFZpc2libGUgPSBmdW5jdGlvbihlbGVtLCBlbGVtRXhwYW5kKXtcblx0XHRcdHZhciBvdXRlclJlY3Q7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbTtcblx0XHRcdHZhciB2aXNpYmxlID0gaXNWaXNpYmxlKGVsZW0pO1xuXG5cdFx0XHRlTHRvcCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxib3R0b20gKz0gZWxlbUV4cGFuZDtcblx0XHRcdGVMbGVmdCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxyaWdodCArPSBlbGVtRXhwYW5kO1xuXG5cdFx0XHR3aGlsZSh2aXNpYmxlICYmIChwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50KSAmJiBwYXJlbnQgIT0gZG9jdW1lbnQuYm9keSAmJiBwYXJlbnQgIT0gZG9jRWxlbSl7XG5cdFx0XHRcdHZpc2libGUgPSAoKGdldENTUyhwYXJlbnQsICdvcGFjaXR5JykgfHwgMSkgPiAwKTtcblxuXHRcdFx0XHRpZih2aXNpYmxlICYmIGdldENTUyhwYXJlbnQsICdvdmVyZmxvdycpICE9ICd2aXNpYmxlJyl7XG5cdFx0XHRcdFx0b3V0ZXJSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRcdHZpc2libGUgPSBlTHJpZ2h0ID4gb3V0ZXJSZWN0LmxlZnQgJiZcblx0XHRcdFx0XHRcdGVMbGVmdCA8IG91dGVyUmVjdC5yaWdodCAmJlxuXHRcdFx0XHRcdFx0ZUxib3R0b20gPiBvdXRlclJlY3QudG9wIC0gMSAmJlxuXHRcdFx0XHRcdFx0ZUx0b3AgPCBvdXRlclJlY3QuYm90dG9tICsgMVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmlzaWJsZTtcblx0XHR9O1xuXG5cdFx0dmFyIGNoZWNrRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlTGxlbiwgaSwgcmVjdCwgYXV0b0xvYWRFbGVtLCBsb2FkZWRTb21ldGhpbmcsIGVsZW1FeHBhbmQsIGVsZW1OZWdhdGl2ZUV4cGFuZCwgZWxlbUV4cGFuZFZhbCxcblx0XHRcdFx0YmVmb3JlRXhwYW5kVmFsLCBkZWZhdWx0RXhwYW5kLCBwcmVsb2FkRXhwYW5kLCBoRmFjO1xuXHRcdFx0dmFyIGxhenlsb2FkRWxlbXMgPSBsYXp5c2l6ZXMuZWxlbWVudHM7XG5cblx0XHRcdGlmKChsb2FkTW9kZSA9IGxhenlTaXplc0NmZy5sb2FkTW9kZSkgJiYgaXNMb2FkaW5nIDwgOCAmJiAoZUxsZW4gPSBsYXp5bG9hZEVsZW1zLmxlbmd0aCkpe1xuXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGxvd1J1bnMrKztcblxuXHRcdFx0XHRmb3IoOyBpIDwgZUxsZW47IGkrKyl7XG5cblx0XHRcdFx0XHRpZighbGF6eWxvYWRFbGVtc1tpXSB8fCBsYXp5bG9hZEVsZW1zW2ldLl9sYXp5UmFjZSl7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIXN1cHBvcnRTY3JvbGwgfHwgKGxhenlzaXplcy5wcmVtYXR1cmVVbnZlaWwgJiYgbGF6eXNpemVzLnByZW1hdHVyZVVudmVpbChsYXp5bG9hZEVsZW1zW2ldKSkpe3VudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIShlbGVtRXhwYW5kVmFsID0gbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1leHBhbmQnKSkgfHwgIShlbGVtRXhwYW5kID0gZWxlbUV4cGFuZFZhbCAqIDEpKXtcblx0XHRcdFx0XHRcdGVsZW1FeHBhbmQgPSBjdXJyZW50RXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghZGVmYXVsdEV4cGFuZCkge1xuXHRcdFx0XHRcdFx0ZGVmYXVsdEV4cGFuZCA9ICghbGF6eVNpemVzQ2ZnLmV4cGFuZCB8fCBsYXp5U2l6ZXNDZmcuZXhwYW5kIDwgMSkgP1xuXHRcdFx0XHRcdFx0XHRkb2NFbGVtLmNsaWVudEhlaWdodCA+IDUwMCAmJiBkb2NFbGVtLmNsaWVudFdpZHRoID4gNTAwID8gNTAwIDogMzcwIDpcblx0XHRcdFx0XHRcdFx0bGF6eVNpemVzQ2ZnLmV4cGFuZDtcblxuXHRcdFx0XHRcdFx0bGF6eXNpemVzLl9kZWZFeCA9IGRlZmF1bHRFeHBhbmQ7XG5cblx0XHRcdFx0XHRcdHByZWxvYWRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kICogbGF6eVNpemVzQ2ZnLmV4cEZhY3Rvcjtcblx0XHRcdFx0XHRcdGhGYWMgPSBsYXp5U2l6ZXNDZmcuaEZhYztcblx0XHRcdFx0XHRcdGlzQm9keUhpZGRlbiA9IG51bGw7XG5cblx0XHRcdFx0XHRcdGlmKGN1cnJlbnRFeHBhbmQgPCBwcmVsb2FkRXhwYW5kICYmIGlzTG9hZGluZyA8IDEgJiYgbG93UnVucyA+IDIgJiYgbG9hZE1vZGUgPiAyICYmICFkb2N1bWVudC5oaWRkZW4pe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gcHJlbG9hZEV4cGFuZDtcblx0XHRcdFx0XHRcdFx0bG93UnVucyA9IDA7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYobG9hZE1vZGUgPiAxICYmIGxvd1J1bnMgPiAxICYmIGlzTG9hZGluZyA8IDYpe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gZGVmYXVsdEV4cGFuZDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBzaHJpbmtFeHBhbmQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoYmVmb3JlRXhwYW5kVmFsICE9PSBlbGVtRXhwYW5kKXtcblx0XHRcdFx0XHRcdGVMdlcgPSBpbm5lcldpZHRoICsgKGVsZW1FeHBhbmQgKiBoRmFjKTtcblx0XHRcdFx0XHRcdGVsdkggPSBpbm5lckhlaWdodCArIGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0XHRlbGVtTmVnYXRpdmVFeHBhbmQgPSBlbGVtRXhwYW5kICogLTE7XG5cdFx0XHRcdFx0XHRiZWZvcmVFeHBhbmRWYWwgPSBlbGVtRXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlY3QgPSBsYXp5bG9hZEVsZW1zW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdFx0aWYgKChlTGJvdHRvbSA9IHJlY3QuYm90dG9tKSA+PSBlbGVtTmVnYXRpdmVFeHBhbmQgJiZcblx0XHRcdFx0XHRcdChlTHRvcCA9IHJlY3QudG9wKSA8PSBlbHZIICYmXG5cdFx0XHRcdFx0XHQoZUxyaWdodCA9IHJlY3QucmlnaHQpID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAqIGhGYWMgJiZcblx0XHRcdFx0XHRcdChlTGxlZnQgPSByZWN0LmxlZnQpIDw9IGVMdlcgJiZcblx0XHRcdFx0XHRcdChlTGJvdHRvbSB8fCBlTHJpZ2h0IHx8IGVMbGVmdCB8fCBlTHRvcCkgJiZcblx0XHRcdFx0XHRcdChsYXp5U2l6ZXNDZmcubG9hZEhpZGRlbiB8fCBpc1Zpc2libGUobGF6eWxvYWRFbGVtc1tpXSkpICYmXG5cdFx0XHRcdFx0XHQoKGlzQ29tcGxldGVkICYmIGlzTG9hZGluZyA8IDMgJiYgIWVsZW1FeHBhbmRWYWwgJiYgKGxvYWRNb2RlIDwgMyB8fCBsb3dSdW5zIDwgNCkpIHx8IGlzTmVzdGVkVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldLCBlbGVtRXhwYW5kKSkpe1xuXHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtcblx0XHRcdFx0XHRcdGxvYWRlZFNvbWV0aGluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRpZihpc0xvYWRpbmcgPiA5KXticmVhazt9XG5cdFx0XHRcdFx0fSBlbHNlIGlmKCFsb2FkZWRTb21ldGhpbmcgJiYgaXNDb21wbGV0ZWQgJiYgIWF1dG9Mb2FkRWxlbSAmJlxuXHRcdFx0XHRcdFx0aXNMb2FkaW5nIDwgNCAmJiBsb3dSdW5zIDwgNCAmJiBsb2FkTW9kZSA+IDIgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eVNpemVzQ2ZnLnByZWxvYWRBZnRlckxvYWQpICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8ICghZWxlbUV4cGFuZFZhbCAmJiAoKGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSB8fCBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpICE9ICdhdXRvJykpKSl7XG5cdFx0XHRcdFx0XHRhdXRvTG9hZEVsZW0gPSBwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eWxvYWRFbGVtc1tpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihhdXRvTG9hZEVsZW0gJiYgIWxvYWRlZFNvbWV0aGluZyl7XG5cdFx0XHRcdFx0dW52ZWlsRWxlbWVudChhdXRvTG9hZEVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB0aHJvdHRsZWRDaGVja0VsZW1lbnRzID0gdGhyb3R0bGUoY2hlY2tFbGVtZW50cyk7XG5cblx0XHR2YXIgc3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgZWxlbSA9IGUudGFyZ2V0O1xuXG5cdFx0XHRpZiAoZWxlbS5fbGF6eUNhY2hlKSB7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5Q2FjaGU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmVzZXRQcmVsb2FkaW5nKGUpO1xuXHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRlZENsYXNzKTtcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdFx0dHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5bG9hZGVkJyk7XG5cdFx0fTtcblx0XHR2YXIgcmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3MgPSByQUZJdChzd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdHZhciByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MgPSBmdW5jdGlvbihlKXtcblx0XHRcdHJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzKHt0YXJnZXQ6IGUudGFyZ2V0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBjaGFuZ2VJZnJhbWVTcmMgPSBmdW5jdGlvbihlbGVtLCBzcmMpe1xuXHRcdFx0dmFyIGxvYWRNb2RlID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbG9hZC1tb2RlJykgfHwgbGF6eVNpemVzQ2ZnLmlmcmFtZUxvYWRNb2RlO1xuXG5cdFx0XHQvLyBsb2FkTW9kZSBjYW4gYmUgYWxzbyBhIHN0cmluZyFcblx0XHRcdGlmIChsb2FkTW9kZSA9PSAwKSB7XG5cdFx0XHRcdGVsZW0uY29udGVudFdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHNyYyk7XG5cdFx0XHR9IGVsc2UgaWYgKGxvYWRNb2RlID09IDEpIHtcblx0XHRcdFx0ZWxlbS5zcmMgPSBzcmM7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBoYW5kbGVTb3VyY2VzID0gZnVuY3Rpb24oc291cmNlKXtcblx0XHRcdHZhciBjdXN0b21NZWRpYTtcblxuXHRcdFx0dmFyIHNvdXJjZVNyY3NldCA9IHNvdXJjZVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3Jjc2V0QXR0cik7XG5cblx0XHRcdGlmKCAoY3VzdG9tTWVkaWEgPSBsYXp5U2l6ZXNDZmcuY3VzdG9tTWVkaWFbc291cmNlW19nZXRBdHRyaWJ1dGVdKCdkYXRhLW1lZGlhJykgfHwgc291cmNlW19nZXRBdHRyaWJ1dGVdKCdtZWRpYScpXSkgKXtcblx0XHRcdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBjdXN0b21NZWRpYSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHNvdXJjZVNyY3NldCl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNvdXJjZVNyY3NldCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBsYXp5VW52ZWlsID0gckFGSXQoZnVuY3Rpb24gKGVsZW0sIGRldGFpbCwgaXNBdXRvLCBzaXplcywgaXNJbWcpe1xuXHRcdFx0dmFyIHNyYywgc3Jjc2V0LCBwYXJlbnQsIGlzUGljdHVyZSwgZXZlbnQsIGZpcmVzTG9hZDtcblxuXHRcdFx0aWYoIShldmVudCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWJlZm9yZXVudmVpbCcsIGRldGFpbCkpLmRlZmF1bHRQcmV2ZW50ZWQpe1xuXG5cdFx0XHRcdGlmKHNpemVzKXtcblx0XHRcdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmF1dG9zaXplc0NsYXNzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgc2l6ZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNyY3NldCA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY3NldEF0dHIpO1xuXHRcdFx0XHRzcmMgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNBdHRyKTtcblxuXHRcdFx0XHRpZihpc0ltZykge1xuXHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0XHRpc1BpY3R1cmUgPSBwYXJlbnQgJiYgcmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmaXJlc0xvYWQgPSBkZXRhaWwuZmlyZXNMb2FkIHx8ICgoJ3NyYycgaW4gZWxlbSkgJiYgKHNyY3NldCB8fCBzcmMgfHwgaXNQaWN0dXJlKSk7XG5cblx0XHRcdFx0ZXZlbnQgPSB7dGFyZ2V0OiBlbGVtfTtcblxuXHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGluZ0NsYXNzKTtcblxuXHRcdFx0XHRpZihmaXJlc0xvYWQpe1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChyZXNldFByZWxvYWRpbmdUaW1lcik7XG5cdFx0XHRcdFx0cmVzZXRQcmVsb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KHJlc2V0UHJlbG9hZGluZywgMjUwMCk7XG5cdFx0XHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MsIHRydWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRmb3JFYWNoLmNhbGwocGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKSwgaGFuZGxlU291cmNlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihzcmNzZXQpe1xuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzcmNzZXQpO1xuXHRcdFx0XHR9IGVsc2UgaWYoc3JjICYmICFpc1BpY3R1cmUpe1xuXHRcdFx0XHRcdGlmKHJlZ0lmcmFtZS50ZXN0KGVsZW0ubm9kZU5hbWUpKXtcblx0XHRcdFx0XHRcdGNoYW5nZUlmcmFtZVNyYyhlbGVtLCBzcmMpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNyYyA9IHNyYztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihpc0ltZyAmJiAoc3Jjc2V0IHx8IGlzUGljdHVyZSkpe1xuXHRcdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIHtzcmM6IHNyY30pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKGVsZW0uX2xhenlSYWNlKXtcblx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlSYWNlO1xuXHRcdFx0fVxuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxhenlDbGFzcyk7XG5cblx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHQvLyBQYXJ0IG9mIHRoaXMgY2FuIGJlIHJlbW92ZWQgYXMgc29vbiBhcyB0aGlzIGZpeCBpcyBvbGRlcjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzczMSAoMjAxNSlcblx0XHRcdFx0dmFyIGlzTG9hZGVkID0gZWxlbS5jb21wbGV0ZSAmJiBlbGVtLm5hdHVyYWxXaWR0aCA+IDE7XG5cblx0XHRcdFx0aWYoICFmaXJlc0xvYWQgfHwgaXNMb2FkZWQpe1xuXHRcdFx0XHRcdGlmIChpc0xvYWRlZCkge1xuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmZhc3RMb2FkZWRDbGFzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN3aXRjaExvYWRpbmdDbGFzcyhldmVudCk7XG5cdFx0XHRcdFx0ZWxlbS5fbGF6eUNhY2hlID0gdHJ1ZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRpZiAoJ19sYXp5Q2FjaGUnIGluIGVsZW0pIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlDYWNoZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCA5KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZWxlbS5sb2FkaW5nID09ICdsYXp5Jykge1xuXHRcdFx0XHRcdGlzTG9hZGluZy0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGVsZW0geyBFbGVtZW50IH1cblx0XHQgKi9cblx0XHR2YXIgdW52ZWlsRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtKXtcblx0XHRcdGlmIChlbGVtLl9sYXp5UmFjZSkge3JldHVybjt9XG5cdFx0XHR2YXIgZGV0YWlsO1xuXG5cdFx0XHR2YXIgaXNJbWcgPSByZWdJbWcudGVzdChlbGVtLm5vZGVOYW1lKTtcblxuXHRcdFx0Ly9hbGxvdyB1c2luZyBzaXplcz1cImF1dG9cIiwgYnV0IGRvbid0IHVzZS4gaXQncyBpbnZhbGlkLiBVc2UgZGF0YS1zaXplcz1cImF1dG9cIiBvciBhIHZhbGlkIHZhbHVlIGZvciBzaXplcyBpbnN0ZWFkIChpLmUuOiBzaXplcz1cIjgwdndcIilcblx0XHRcdHZhciBzaXplcyA9IGlzSW1nICYmIChlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpIHx8IGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NpemVzJykpO1xuXHRcdFx0dmFyIGlzQXV0byA9IHNpemVzID09ICdhdXRvJztcblxuXHRcdFx0aWYoIChpc0F1dG8gfHwgIWlzQ29tcGxldGVkKSAmJiBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXSgnc3JjJykgfHwgZWxlbS5zcmNzZXQpICYmICFlbGVtLmNvbXBsZXRlICYmICFoYXNDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcuZXJyb3JDbGFzcykgJiYgaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxhenlDbGFzcykpe3JldHVybjt9XG5cblx0XHRcdGRldGFpbCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eXVudmVpbHJlYWQnKS5kZXRhaWw7XG5cblx0XHRcdGlmKGlzQXV0byl7XG5cdFx0XHRcdCBhdXRvU2l6ZXIudXBkYXRlRWxlbShlbGVtLCB0cnVlLCBlbGVtLm9mZnNldFdpZHRoKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5fbGF6eVJhY2UgPSB0cnVlO1xuXHRcdFx0aXNMb2FkaW5nKys7XG5cblx0XHRcdGxhenlVbnZlaWwoZWxlbSwgZGV0YWlsLCBpc0F1dG8sIHNpemVzLCBpc0ltZyk7XG5cdFx0fTtcblxuXHRcdHZhciBhZnRlclNjcm9sbCA9IGRlYm91bmNlKGZ1bmN0aW9uKCl7XG5cdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAzO1xuXHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdH0pO1xuXG5cdFx0dmFyIGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lciA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPT0gMyl7XG5cdFx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDI7XG5cdFx0XHR9XG5cdFx0XHRhZnRlclNjcm9sbCgpO1xuXHRcdH07XG5cblx0XHR2YXIgb25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGlmKGlzQ29tcGxldGVkKXtyZXR1cm47fVxuXHRcdFx0aWYoRGF0ZS5ub3coKSAtIHN0YXJ0ZWQgPCA5OTkpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KG9ubG9hZCwgOTk5KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cblx0XHRcdGlzQ29tcGxldGVkID0gdHJ1ZTtcblxuXHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMztcblxuXHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXG5cdFx0XHRhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIsIHRydWUpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0c3RhcnRlZCA9IERhdGUubm93KCk7XG5cblx0XHRcdFx0bGF6eXNpemVzLmVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcubGF6eUNsYXNzKTtcblx0XHRcdFx0cHJlbG9hZEVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcubGF6eUNsYXNzICsgJyAnICsgbGF6eVNpemVzQ2ZnLnByZWxvYWRDbGFzcyk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncGFnZXNob3cnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmIChlLnBlcnNpc3RlZCkge1xuXHRcdFx0XHRcdFx0dmFyIGxvYWRpbmdFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cblx0XHRcdFx0XHRcdGlmIChsb2FkaW5nRWxlbWVudHMubGVuZ3RoICYmIGxvYWRpbmdFbGVtZW50cy5mb3JFYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0bG9hZGluZ0VsZW1lbnRzLmZvckVhY2goIGZ1bmN0aW9uIChpbWcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpbWcuY29tcGxldGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChpbWcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKXtcblx0XHRcdFx0XHRuZXcgTXV0YXRpb25PYnNlcnZlciggdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyApLm9ic2VydmUoIGRvY0VsZW0sIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTU5vZGVJbnNlcnRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01BdHRyTW9kaWZpZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRzZXRJbnRlcnZhbCh0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCA5OTkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdC8vLCAnZnVsbHNjcmVlbmNoYW5nZSdcblx0XHRcdFx0Wydmb2N1cycsICdtb3VzZW92ZXInLCAnY2xpY2snLCAnbG9hZCcsICd0cmFuc2l0aW9uZW5kJywgJ2FuaW1hdGlvbmVuZCddLmZvckVhY2goZnVuY3Rpb24obmFtZSl7XG5cdFx0XHRcdFx0ZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKG5hbWUsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZigoL2QkfF5jLy50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpKSl7XG5cdFx0XHRcdFx0b25sb2FkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9ubG9hZCk7XG5cdFx0XHRcdFx0ZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Db250ZW50TG9hZGVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyk7XG5cdFx0XHRcdFx0c2V0VGltZW91dChvbmxvYWQsIDIwMDAwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGxhenlzaXplcy5lbGVtZW50cy5sZW5ndGgpe1xuXHRcdFx0XHRcdGNoZWNrRWxlbWVudHMoKTtcblx0XHRcdFx0XHRyQUYuX2xzRmx1c2goKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjaGVja0VsZW1zOiB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLFxuXHRcdFx0dW52ZWlsOiB1bnZlaWxFbGVtZW50LFxuXHRcdFx0X2FMU0w6IGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lcixcblx0XHR9O1xuXHR9KSgpO1xuXG5cblx0dmFyIGF1dG9TaXplciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBhdXRvc2l6ZXNFbGVtcztcblxuXHRcdHZhciBzaXplRWxlbWVudCA9IHJBRkl0KGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgZXZlbnQsIHdpZHRoKXtcblx0XHRcdHZhciBzb3VyY2VzLCBpLCBsZW47XG5cdFx0XHRlbGVtLl9sYXp5c2l6ZXNXaWR0aCA9IHdpZHRoO1xuXHRcdFx0d2lkdGggKz0gJ3B4JztcblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuXG5cdFx0XHRpZihyZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKSl7XG5cdFx0XHRcdHNvdXJjZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGxlbiA9IHNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdHNvdXJjZXNbaV0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZighZXZlbnQuZGV0YWlsLmRhdGFBdHRyKXtcblx0XHRcdFx0dXBkYXRlUG9seWZpbGwoZWxlbSwgZXZlbnQuZGV0YWlsKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQvKipcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBlbGVtIHtFbGVtZW50fVxuXHRcdCAqIEBwYXJhbSBkYXRhQXR0clxuXHRcdCAqIEBwYXJhbSBbd2lkdGhdIHsgbnVtYmVyIH1cblx0XHQgKi9cblx0XHR2YXIgZ2V0U2l6ZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSwgZGF0YUF0dHIsIHdpZHRoKXtcblx0XHRcdHZhciBldmVudDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmKHBhcmVudCl7XG5cdFx0XHRcdHdpZHRoID0gZ2V0V2lkdGgoZWxlbSwgcGFyZW50LCB3aWR0aCk7XG5cdFx0XHRcdGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3Jlc2l6ZXMnLCB7d2lkdGg6IHdpZHRoLCBkYXRhQXR0cjogISFkYXRhQXR0cn0pO1xuXG5cdFx0XHRcdGlmKCFldmVudC5kZWZhdWx0UHJldmVudGVkKXtcblx0XHRcdFx0XHR3aWR0aCA9IGV2ZW50LmRldGFpbC53aWR0aDtcblxuXHRcdFx0XHRcdGlmKHdpZHRoICYmIHdpZHRoICE9PSBlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHRcdFx0XHRzaXplRWxlbWVudChlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB1cGRhdGVFbGVtZW50c1NpemVzID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIGxlbiA9IGF1dG9zaXplc0VsZW1zLmxlbmd0aDtcblx0XHRcdGlmKGxlbil7XG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBsZW47IGkrKyl7XG5cdFx0XHRcdFx0Z2V0U2l6ZUVsZW1lbnQoYXV0b3NpemVzRWxlbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzID0gZGVib3VuY2UodXBkYXRlRWxlbWVudHNTaXplcyk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0YXV0b3NpemVzRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NmZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMsXG5cdFx0XHR1cGRhdGVFbGVtOiBnZXRTaXplRWxlbWVudFxuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpe1xuXHRcdGlmKCFpbml0LmkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSl7XG5cdFx0XHRpbml0LmkgPSB0cnVlO1xuXHRcdFx0YXV0b1NpemVyLl8oKTtcblx0XHRcdGxvYWRlci5fKCk7XG5cdFx0fVxuXHR9O1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRpZihsYXp5U2l6ZXNDZmcuaW5pdCl7XG5cdFx0XHRpbml0KCk7XG5cdFx0fVxuXHR9KTtcblxuXHRsYXp5c2l6ZXMgPSB7XG5cdFx0LyoqXG5cdFx0ICogQHR5cGUgeyBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH1cblx0XHQgKi9cblx0XHRjZmc6IGxhenlTaXplc0NmZyxcblx0XHRhdXRvU2l6ZXI6IGF1dG9TaXplcixcblx0XHRsb2FkZXI6IGxvYWRlcixcblx0XHRpbml0OiBpbml0LFxuXHRcdHVQOiB1cGRhdGVQb2x5ZmlsbCxcblx0XHRhQzogYWRkQ2xhc3MsXG5cdFx0ckM6IHJlbW92ZUNsYXNzLFxuXHRcdGhDOiBoYXNDbGFzcyxcblx0XHRmaXJlOiB0cmlnZ2VyRXZlbnQsXG5cdFx0Z1c6IGdldFdpZHRoLFxuXHRcdHJBRjogckFGLFxuXHR9O1xuXG5cdHJldHVybiBsYXp5c2l6ZXM7XG59XG4pKTtcbiIsIi8qISBtZWRpdW0tem9vbSAxLjAuNiB8IE1JVCBMaWNlbnNlIHwgaHR0cHM6Ly9naXRodWIuY29tL2ZyYW5jb2lzY2hhbGlmb3VyL21lZGl1bS16b29tICovXG4hZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTooZT1lfHxzZWxmKS5tZWRpdW1ab29tPXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihlKXtmb3IodmFyIHQ9MTt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKXt2YXIgbz1hcmd1bWVudHNbdF07Zm9yKHZhciBuIGluIG8pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sbikmJihlW25dPW9bbl0pfXJldHVybiBlfSx0PWZ1bmN0aW9uKGUpe3JldHVyblwiSU1HXCI9PT1lLnRhZ05hbWV9LG89ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJjE9PT1lLm5vZGVUeXBlfSxuPWZ1bmN0aW9uKGUpe3JldHVyblwiLnN2Z1wiPT09KGUuY3VycmVudFNyY3x8ZS5zcmMpLnN1YnN0cigtNCkudG9Mb3dlckNhc2UoKX0saT1mdW5jdGlvbihlKXt0cnl7cmV0dXJuIEFycmF5LmlzQXJyYXkoZSk/ZS5maWx0ZXIodCk6ZnVuY3Rpb24oZSl7cmV0dXJuIE5vZGVMaXN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGUpfShlKT9bXS5zbGljZS5jYWxsKGUpLmZpbHRlcih0KTpvKGUpP1tlXS5maWx0ZXIodCk6XCJzdHJpbmdcIj09dHlwZW9mIGU/W10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGUpKS5maWx0ZXIodCk6W119Y2F0Y2goZSl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBwcm92aWRlZCBzZWxlY3RvciBpcyBpbnZhbGlkLlxcbkV4cGVjdHMgYSBDU1Mgc2VsZWN0b3IsIGEgTm9kZSBlbGVtZW50LCBhIE5vZGVMaXN0IG9yIGFuIGFycmF5LlxcblNlZTogaHR0cHM6Ly9naXRodWIuY29tL2ZyYW5jb2lzY2hhbGlmb3VyL21lZGl1bS16b29tXCIpfX0scj1mdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiB0LmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1vdmVybGF5XCIpLHQuc3R5bGUuYmFja2dyb3VuZD1lLHR9LGQ9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxvPXQudG9wLG49dC5sZWZ0LGk9dC53aWR0aCxyPXQuaGVpZ2h0LGQ9ZS5jbG9uZU5vZGUoKSxtPXdpbmRvdy5wYWdlWU9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3B8fDAsYT13aW5kb3cucGFnZVhPZmZzZXR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0fHxkb2N1bWVudC5ib2R5LnNjcm9sbExlZnR8fDA7cmV0dXJuIGQucmVtb3ZlQXR0cmlidXRlKFwiaWRcIiksZC5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsZC5zdHlsZS50b3A9byttK1wicHhcIixkLnN0eWxlLmxlZnQ9bithK1wicHhcIixkLnN0eWxlLndpZHRoPWkrXCJweFwiLGQuc3R5bGUuaGVpZ2h0PXIrXCJweFwiLGQuc3R5bGUudHJhbnNmb3JtPVwiXCIsZH0sbT1mdW5jdGlvbih0LG8pe3ZhciBuPWUoe2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMSxkZXRhaWw6dm9pZCAwfSxvKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQpcmV0dXJuIG5ldyBDdXN0b21FdmVudCh0LG4pO3ZhciBpPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7cmV0dXJuIGkuaW5pdEN1c3RvbUV2ZW50KHQsbi5idWJibGVzLG4uY2FuY2VsYWJsZSxuLmRldGFpbCksaX07cmV0dXJuIGZ1bmN0aW9uKGUsdCl7dm9pZCAwPT09dCYmKHQ9e30pO3ZhciBvPXQuaW5zZXJ0QXQ7aWYoZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50KXt2YXIgbj1kb2N1bWVudC5oZWFkfHxkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0saT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7aS50eXBlPVwidGV4dC9jc3NcIixcInRvcFwiPT09byYmbi5maXJzdENoaWxkP24uaW5zZXJ0QmVmb3JlKGksbi5maXJzdENoaWxkKTpuLmFwcGVuZENoaWxkKGkpLGkuc3R5bGVTaGVldD9pLnN0eWxlU2hlZXQuY3NzVGV4dD1lOmkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZSkpfX0oXCIubWVkaXVtLXpvb20tb3ZlcmxheXtwb3NpdGlvbjpmaXhlZDt0b3A6MDtyaWdodDowO2JvdHRvbTowO2xlZnQ6MDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IC4zczt3aWxsLWNoYW5nZTpvcGFjaXR5fS5tZWRpdW0tem9vbS0tb3BlbmVkIC5tZWRpdW0tem9vbS1vdmVybGF5e2N1cnNvcjpwb2ludGVyO2N1cnNvcjp6b29tLW91dDtvcGFjaXR5OjF9Lm1lZGl1bS16b29tLWltYWdle2N1cnNvcjpwb2ludGVyO2N1cnNvcjp6b29tLWluO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcyBjdWJpYy1iZXppZXIoLjIsMCwuMiwxKSFpbXBvcnRhbnR9Lm1lZGl1bS16b29tLWltYWdlLS1oaWRkZW57dmlzaWJpbGl0eTpoaWRkZW59Lm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWR7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20tb3V0O3dpbGwtY2hhbmdlOnRyYW5zZm9ybX1cIiksZnVuY3Rpb24gdChhKXt2YXIgbD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30sYz13aW5kb3cuUHJvbWlzZXx8ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdCgpe31lKHQsdCl9LHU9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS50YXJnZXQ7dCE9PU4/LTEhPT1PLmluZGV4T2YodCkmJncoe3RhcmdldDp0fSk6RSgpfSxzPWZ1bmN0aW9uKCl7aWYoIUEmJlQub3JpZ2luYWwpe3ZhciBlPXdpbmRvdy5wYWdlWU9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3B8fDA7TWF0aC5hYnMoay1lKT5TLnNjcm9sbE9mZnNldCYmc2V0VGltZW91dChFLDE1MCl9fSxmPWZ1bmN0aW9uKGUpe3ZhciB0PWUua2V5fHxlLmtleUNvZGU7XCJFc2NhcGVcIiE9PXQmJlwiRXNjXCIhPT10JiYyNyE9PXR8fEUoKX0scD1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSxuPXQ7aWYodC5iYWNrZ3JvdW5kJiYoTi5zdHlsZS5iYWNrZ3JvdW5kPXQuYmFja2dyb3VuZCksdC5jb250YWluZXImJnQuY29udGFpbmVyIGluc3RhbmNlb2YgT2JqZWN0JiYobi5jb250YWluZXI9ZSh7fSxTLmNvbnRhaW5lcix0LmNvbnRhaW5lcikpLHQudGVtcGxhdGUpe3ZhciBpPW8odC50ZW1wbGF0ZSk/dC50ZW1wbGF0ZTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQudGVtcGxhdGUpO24udGVtcGxhdGU9aX1yZXR1cm4gUz1lKHt9LFMsbiksTy5mb3JFYWNoKChmdW5jdGlvbihlKXtlLmRpc3BhdGNoRXZlbnQobShcIm1lZGl1bS16b29tOnVwZGF0ZVwiLHtkZXRhaWw6e3pvb206an19KSl9KSksan0sZz1mdW5jdGlvbigpe3ZhciBvPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fTtyZXR1cm4gdChlKHt9LFMsbykpfSx2PWZ1bmN0aW9uKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1BcnJheShlKSxvPTA7bzxlO28rKyl0W29dPWFyZ3VtZW50c1tvXTt2YXIgbj10LnJlZHVjZSgoZnVuY3Rpb24oZSx0KXtyZXR1cm5bXS5jb25jYXQoZSxpKHQpKX0pLFtdKTtyZXR1cm4gbi5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVybi0xPT09Ty5pbmRleE9mKGUpfSkpLmZvckVhY2goKGZ1bmN0aW9uKGUpe08ucHVzaChlKSxlLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZVwiKX0pKSx4LmZvckVhY2goKGZ1bmN0aW9uKGUpe3ZhciB0PWUudHlwZSxvPWUubGlzdGVuZXIsaT1lLm9wdGlvbnM7bi5mb3JFYWNoKChmdW5jdGlvbihlKXtlLmFkZEV2ZW50TGlzdGVuZXIodCxvLGkpfSkpfSkpLGp9LGg9ZnVuY3Rpb24oKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCx0PUFycmF5KGUpLG89MDtvPGU7bysrKXRbb109YXJndW1lbnRzW29dO1Quem9vbWVkJiZFKCk7dmFyIG49dC5sZW5ndGg+MD90LnJlZHVjZSgoZnVuY3Rpb24oZSx0KXtyZXR1cm5bXS5jb25jYXQoZSxpKHQpKX0pLFtdKTpPO3JldHVybiBuLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLWltYWdlXCIpLGUuZGlzcGF0Y2hFdmVudChtKFwibWVkaXVtLXpvb206ZGV0YWNoXCIse2RldGFpbDp7em9vbTpqfX0pKX0pKSxPPU8uZmlsdGVyKChmdW5jdGlvbihlKXtyZXR1cm4tMT09PW4uaW5kZXhPZihlKX0pKSxqfSx6PWZ1bmN0aW9uKGUsdCl7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOnt9O3JldHVybiBPLmZvckVhY2goKGZ1bmN0aW9uKG4pe24uYWRkRXZlbnRMaXN0ZW5lcihcIm1lZGl1bS16b29tOlwiK2UsdCxvKX0pKSx4LnB1c2goe3R5cGU6XCJtZWRpdW0tem9vbTpcIitlLGxpc3RlbmVyOnQsb3B0aW9uczpvfSksan0seT1mdW5jdGlvbihlLHQpe3ZhciBvPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTp7fTtyZXR1cm4gTy5mb3JFYWNoKChmdW5jdGlvbihuKXtuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZWRpdW0tem9vbTpcIitlLHQsbyl9KSkseD14LmZpbHRlcigoZnVuY3Rpb24obyl7cmV0dXJuIShvLnR5cGU9PT1cIm1lZGl1bS16b29tOlwiK2UmJm8ubGlzdGVuZXIudG9TdHJpbmcoKT09PXQudG9TdHJpbmcoKSl9KSksan0sYj1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSxpPXQudGFyZ2V0LHI9ZnVuY3Rpb24oKXt2YXIgdD17d2lkdGg6ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLGhlaWdodDpkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LGxlZnQ6MCx0b3A6MCxyaWdodDowLGJvdHRvbTowfSxpPXZvaWQgMCxyPXZvaWQgMDtpZihTLmNvbnRhaW5lcilpZihTLmNvbnRhaW5lciBpbnN0YW5jZW9mIE9iamVjdClpPSh0PWUoe30sdCxTLmNvbnRhaW5lcikpLndpZHRoLXQubGVmdC10LnJpZ2h0LTIqUy5tYXJnaW4scj10LmhlaWdodC10LnRvcC10LmJvdHRvbS0yKlMubWFyZ2luO2Vsc2V7dmFyIGQ9KG8oUy5jb250YWluZXIpP1MuY29udGFpbmVyOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoUy5jb250YWluZXIpKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxtPWQud2lkdGgsYT1kLmhlaWdodCxsPWQubGVmdCxjPWQudG9wO3Q9ZSh7fSx0LHt3aWR0aDptLGhlaWdodDphLGxlZnQ6bCx0b3A6Y30pfWk9aXx8dC53aWR0aC0yKlMubWFyZ2luLHI9cnx8dC5oZWlnaHQtMipTLm1hcmdpbjt2YXIgdT1ULnpvb21lZEhkfHxULm9yaWdpbmFsLHM9bih1KT9pOnUubmF0dXJhbFdpZHRofHxpLGY9bih1KT9yOnUubmF0dXJhbEhlaWdodHx8cixwPXUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksZz1wLnRvcCx2PXAubGVmdCxoPXAud2lkdGgsej1wLmhlaWdodCx5PU1hdGgubWluKHMsaSkvaCxiPU1hdGgubWluKGYscikveixFPU1hdGgubWluKHksYiksdz1cInNjYWxlKFwiK0UrXCIpIHRyYW5zbGF0ZTNkKFwiKygoaS1oKS8yLXYrUy5tYXJnaW4rdC5sZWZ0KS9FK1wicHgsIFwiKygoci16KS8yLWcrUy5tYXJnaW4rdC50b3ApL0UrXCJweCwgMClcIjtULnpvb21lZC5zdHlsZS50cmFuc2Zvcm09dyxULnpvb21lZEhkJiYoVC56b29tZWRIZC5zdHlsZS50cmFuc2Zvcm09dyl9O3JldHVybiBuZXcgYygoZnVuY3Rpb24oZSl7aWYoaSYmLTE9PT1PLmluZGV4T2YoaSkpZShqKTtlbHNle2lmKFQuem9vbWVkKWUoaik7ZWxzZXtpZihpKVQub3JpZ2luYWw9aTtlbHNle2lmKCEoTy5sZW5ndGg+MCkpcmV0dXJuIHZvaWQgZShqKTt2YXIgdD1PO1Qub3JpZ2luYWw9dFswXX1pZihULm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQobShcIm1lZGl1bS16b29tOm9wZW5cIix7ZGV0YWlsOnt6b29tOmp9fSkpLGs9d2luZG93LnBhZ2VZT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcHx8MCxBPSEwLFQuem9vbWVkPWQoVC5vcmlnaW5hbCksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChOKSxTLnRlbXBsYXRlKXt2YXIgbj1vKFMudGVtcGxhdGUpP1MudGVtcGxhdGU6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTLnRlbXBsYXRlKTtULnRlbXBsYXRlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksVC50ZW1wbGF0ZS5hcHBlbmRDaGlsZChuLmNvbnRlbnQuY2xvbmVOb2RlKCEwKSksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChULnRlbXBsYXRlKX1pZihkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFQuem9vbWVkKSx3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKChmdW5jdGlvbigpe2RvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLS1vcGVuZWRcIil9KSksVC5vcmlnaW5hbC5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlblwiKSxULnpvb21lZC5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZFwiKSxULnpvb21lZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixFKSxULnpvb21lZC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLChmdW5jdGlvbiB0KCl7QT0hMSxULnpvb21lZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLHQpLFQub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChtKFwibWVkaXVtLXpvb206b3BlbmVkXCIse2RldGFpbDp7em9vbTpqfX0pKSxlKGopfSkpLFQub3JpZ2luYWwuZ2V0QXR0cmlidXRlKFwiZGF0YS16b29tLXNyY1wiKSl7VC56b29tZWRIZD1ULnpvb21lZC5jbG9uZU5vZGUoKSxULnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcInNyY3NldFwiKSxULnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcInNpemVzXCIpLFQuem9vbWVkSGQuc3JjPVQuem9vbWVkLmdldEF0dHJpYnV0ZShcImRhdGEtem9vbS1zcmNcIiksVC56b29tZWRIZC5vbmVycm9yPWZ1bmN0aW9uKCl7Y2xlYXJJbnRlcnZhbChhKSxjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gcmVhY2ggdGhlIHpvb20gaW1hZ2UgdGFyZ2V0IFwiK1Quem9vbWVkSGQuc3JjKSxULnpvb21lZEhkPW51bGwscigpfTt2YXIgYT1zZXRJbnRlcnZhbCgoZnVuY3Rpb24oKXtULnpvb21lZEhkLmNvbXBsZXRlJiYoY2xlYXJJbnRlcnZhbChhKSxULnpvb21lZEhkLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZS0tb3BlbmVkXCIpLFQuem9vbWVkSGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsRSksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChULnpvb21lZEhkKSxyKCkpfSksMTApfWVsc2UgaWYoVC5vcmlnaW5hbC5oYXNBdHRyaWJ1dGUoXCJzcmNzZXRcIikpe1Quem9vbWVkSGQ9VC56b29tZWQuY2xvbmVOb2RlKCksVC56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzaXplc1wiKSxULnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcImxvYWRpbmdcIik7dmFyIGw9VC56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLChmdW5jdGlvbigpe1Quem9vbWVkSGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixsKSxULnpvb21lZEhkLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZS0tb3BlbmVkXCIpLFQuem9vbWVkSGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsRSksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChULnpvb21lZEhkKSxyKCl9KSl9ZWxzZSByKCl9fX0pKX0sRT1mdW5jdGlvbigpe3JldHVybiBuZXcgYygoZnVuY3Rpb24oZSl7aWYoIUEmJlQub3JpZ2luYWwpe0E9ITAsZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20tLW9wZW5lZFwiKSxULnpvb21lZC5zdHlsZS50cmFuc2Zvcm09XCJcIixULnpvb21lZEhkJiYoVC56b29tZWRIZC5zdHlsZS50cmFuc2Zvcm09XCJcIiksVC50ZW1wbGF0ZSYmKFQudGVtcGxhdGUuc3R5bGUudHJhbnNpdGlvbj1cIm9wYWNpdHkgMTUwbXNcIixULnRlbXBsYXRlLnN0eWxlLm9wYWNpdHk9MCksVC5vcmlnaW5hbC5kaXNwYXRjaEV2ZW50KG0oXCJtZWRpdW0tem9vbTpjbG9zZVwiLHtkZXRhaWw6e3pvb206an19KSksVC56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwoZnVuY3Rpb24gdCgpe1Qub3JpZ2luYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLWltYWdlLS1oaWRkZW5cIiksZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChULnpvb21lZCksVC56b29tZWRIZCYmZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChULnpvb21lZEhkKSxkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKE4pLFQuem9vbWVkLmNsYXNzTGlzdC5yZW1vdmUoXCJtZWRpdW0tem9vbS1pbWFnZS0tb3BlbmVkXCIpLFQudGVtcGxhdGUmJmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoVC50ZW1wbGF0ZSksQT0hMSxULnpvb21lZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLHQpLFQub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChtKFwibWVkaXVtLXpvb206Y2xvc2VkXCIse2RldGFpbDp7em9vbTpqfX0pKSxULm9yaWdpbmFsPW51bGwsVC56b29tZWQ9bnVsbCxULnpvb21lZEhkPW51bGwsVC50ZW1wbGF0ZT1udWxsLGUoail9KSl9ZWxzZSBlKGopfSkpfSx3PWZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LHQ9ZS50YXJnZXQ7cmV0dXJuIFQub3JpZ2luYWw/RSgpOmIoe3RhcmdldDp0fSl9LEw9ZnVuY3Rpb24oKXtyZXR1cm4gU30sSD1mdW5jdGlvbigpe3JldHVybiBPfSxDPWZ1bmN0aW9uKCl7cmV0dXJuIFQub3JpZ2luYWx9LE89W10seD1bXSxBPSExLGs9MCxTPWwsVD17b3JpZ2luYWw6bnVsbCx6b29tZWQ6bnVsbCx6b29tZWRIZDpudWxsLHRlbXBsYXRlOm51bGx9O1wiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSk/Uz1hOihhfHxcInN0cmluZ1wiPT10eXBlb2YgYSkmJnYoYSksUz1lKHttYXJnaW46MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLHNjcm9sbE9mZnNldDo0MCxjb250YWluZXI6bnVsbCx0ZW1wbGF0ZTpudWxsfSxTKTt2YXIgTj1yKFMuYmFja2dyb3VuZCk7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdSksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsZiksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHMpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsRSk7dmFyIGo9e29wZW46YixjbG9zZTpFLHRvZ2dsZTp3LHVwZGF0ZTpwLGNsb25lOmcsYXR0YWNoOnYsZGV0YWNoOmgsb246eixvZmY6eSxnZXRPcHRpb25zOkwsZ2V0SW1hZ2VzOkgsZ2V0Wm9vbWVkSW1hZ2U6Q307cmV0dXJuIGp9fSkpO1xuIiwiLyogZ2xvYmFsIGxvY2FsU3RvcmFnZSAgKi9cclxuaW1wb3J0IGdldEFsbCBmcm9tICcuL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBlbCA9PiB7XHJcbiAgY29uc3QgdG9nZ2xlVGhlbWUgPSBnZXRBbGwoZWwpXHJcblxyXG4gIGlmICghdG9nZ2xlVGhlbWUubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxyXG5cclxuICB0b2dnbGVUaGVtZS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIGlmICghaHRtbC5jbGFzc0xpc3QuY29udGFpbnMoJ2RhcmsnKSkge1xyXG4gICAgICBodG1sLmNsYXNzTGlzdC5hZGQoJ2RhcmsnKVxyXG4gICAgICBsb2NhbFN0b3JhZ2UudGhlbWUgPSAnZGFyaydcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGh0bWwuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpXHJcbiAgICAgIGxvY2FsU3RvcmFnZS50aGVtZSA9ICdsaWdodCdcclxuICAgIH1cclxuICB9KSlcclxufVxyXG4iLCJpbXBvcnQgZ2V0QWxsIGZyb20gJy4vZ2V0LWFsbCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChkcm9wZG93bnNCb3hzKSA9PiB7XHJcbiAgY29uc3QgZHJvcGRvd25zID0gZ2V0QWxsKGRyb3Bkb3duc0JveHMpXHJcblxyXG4gIGlmICghZHJvcGRvd25zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gIGRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJylcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtbWVudScpXHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IGNsb3NlRHJvcGRvd25zID0gKCkgPT4gZHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxyXG4gIH0pXHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VEcm9wZG93bnMpXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgY29uc3QgcGFyZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudFxyXG5cclxuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAwKVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IChjb3ZlckNsYXNzLCBoZWFkVHJhbnNwYXJlbnQpID0+IHtcclxuICBjb25zdCBkb21Cb2R5ID0gZG9jdW1lbnQuYm9keVxyXG4gIGNvbnN0IGhhc0NvdmVyID0gZG9tQm9keS5jbG9zZXN0KGNvdmVyQ2xhc3MpXHJcblxyXG4gIGlmICghaGFzQ292ZXIpIHJldHVyblxyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgY29uc3QgbGFzdFNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWVxyXG5cclxuICAgIGxhc3RTY3JvbGxZID49IDYwID8gZG9tQm9keS5jbGFzc0xpc3QucmVtb3ZlKGhlYWRUcmFuc3BhcmVudCkgOiBkb21Cb2R5LmNsYXNzTGlzdC5hZGQoaGVhZFRyYW5zcGFyZW50KVxyXG4gIH0sIHsgcGFzc2l2ZTogdHJ1ZSB9KVxyXG59XHJcbiIsImltcG9ydCB1cmxSZWdleHAgZnJvbSAnLi4vY29tcG9uZW50cy91cmwtcmVndWxhci1leHByZXNzaW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKG1lbnVEcm9wRG93biwgYm94KSA9PiB7XHJcbiAgLy8gY2hlY2sgaWYgdGhlIGJveCBmb3IgdGhlIG1lbnUgZXhpc3RzXHJcbiAgY29uc3QgbmV3Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihib3gpXHJcblxyXG4gIC8qXHJcbiAgICB2YXIgbWVudURyb3Bkb3duID0ge1xyXG4gICAgICAnU2lkZWJhcic6ICdodHRwOi8vLi4uJyxcclxuICAgICAgJ0ZlYXR1cmVkJzogJ2h0dHA6Ly8uLi4nXHJcbiAgICB9XHJcbiAgKi9cclxuXHJcbiAgaWYgKCFuZXdib3gpIHJldHVyblxyXG5cclxuICBPYmplY3QuZW50cmllcyhtZW51RHJvcERvd24pLmZvckVhY2goKFtuYW1lLCB1cmxdKSA9PiB7XHJcbiAgICBpZiAobmFtZSAhPT0gJ3N0cmluZycgJiYgIXVybFJlZ2V4cCh1cmwpKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXHJcbiAgICBsaW5rLmhyZWYgPSB1cmxcclxuICAgIGxpbmsuY2xhc3NMaXN0ID0gJ2Ryb3Bkb3duLWl0ZW0gaG92ZXI6dGV4dC1wcmltYXJ5J1xyXG4gICAgbGluay5pbm5lclRleHQgPSBuYW1lXHJcbiAgICAvLyBsaW5rLmlubmVySFRNTCA9IGA8YSBocmVmPVwiJHt1cmx9XCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtIGhvdmVyOnRleHQtcHJpbWFyeVwiPiR7bmFtZX08L2E+YFxyXG5cclxuICAgIG5ld2JveC5hcHBlbmRDaGlsZChsaW5rKVxyXG4gIH0pXHJcbn1cclxuIiwiLy8gaW1wb3J0IHsgdXJsUmVnZXhwIH0gZnJvbSAnLi9hcHAudmFyaWFibGVzJ1xyXG5pbXBvcnQgdXJsUmVnZXhwIGZyb20gJy4uL2NvbXBvbmVudHMvdXJsLXJlZ3VsYXItZXhwcmVzc2lvbidcclxuaW1wb3J0IGdldEFsbCBmcm9tICcuL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoc29jaWFsTWVkaWFEYXRhLCBib3hTZWxlY3RvcikgPT4ge1xyXG4gIC8vIGNoZWNrIGlmIHRoZSBib3ggZm9yIHRoZSBtZW51IGV4aXN0c1xyXG4gIGNvbnN0IG5vZGVCb3ggPSBnZXRBbGwoYm94U2VsZWN0b3IpXHJcblxyXG4gIGlmICghbm9kZUJveC5sZW5ndGgpIHJldHVyblxyXG5cclxuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gZWxlbWVudCA9PiB7XHJcbiAgICBPYmplY3QuZW50cmllcyhzb2NpYWxNZWRpYURhdGEpLmZvckVhY2goKFtuYW1lLCB1cmxUaXRsZV0pID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gdXJsVGl0bGVbMF1cclxuXHJcbiAgICAgIC8vIFRoZSB1cmwgaXMgYmVpbmcgdmFsaWRhdGVkIGlmIGl0IGlzIGZhbHNlIGl0IHJldHVybnNcclxuICAgICAgaWYgKCF1cmxSZWdleHAodXJsKSkgcmV0dXJuXHJcblxyXG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXHJcbiAgICAgIGxpbmsuaHJlZiA9IHVybFxyXG4gICAgICBsaW5rLnRpdGxlID0gdXJsVGl0bGVbMV1cclxuICAgICAgbGluay5jbGFzc0xpc3QgPSBgaG92ZXI6dGV4dC0ke25hbWV9IHAtMiBpbmxpbmUtYmxvY2tgXHJcbiAgICAgIGxpbmsudGFyZ2V0ID0gJ19ibGFuaydcclxuICAgICAgbGluay5yZWwgPSAnbm9vcGVuZXIgbm9yZWZlcnJlcidcclxuICAgICAgbGluay5pbm5lckhUTUwgPSBgPHN2ZyBjbGFzcz1cImljb24gaWNvbi0tJHtuYW1lfVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLSR7bmFtZX1cIj48L3VzZT48L3N2Zz5gXHJcblxyXG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmspXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vZGVCb3guZm9yRWFjaChjcmVhdGVFbGVtZW50KVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IChzcmMsIGNhbGxiYWNrKSA9PiB7XHJcbiAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXHJcbiAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcclxuICBzY3JpcHRFbGVtZW50LmRlZmVyID0gdHJ1ZVxyXG4gIHNjcmlwdEVsZW1lbnQuYXN5bmMgPSB0cnVlXHJcblxyXG4gIGNhbGxiYWNrICYmIHNjcmlwdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNhbGxiYWNrKVxyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudClcclxufVxyXG4iLCJpbXBvcnQgbWVkaXVtWm9vbSBmcm9tICdtZWRpdW0tem9vbSdcclxuXHJcbmltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbWcgPT4ge1xyXG4gIGdldEFsbChpbWcpLmZvckVhY2goZWwgPT4gIWVsLmNsb3Nlc3QoJ2EnKSAmJiBlbC5jbGFzc0xpc3QuYWRkKCdzaW1wbHktem9vbScpKVxyXG5cclxuICBtZWRpdW1ab29tKCcuc2ltcGx5LXpvb20nLCB7XHJcbiAgICBtYXJnaW46IDIwLFxyXG4gICAgYmFja2dyb3VuZDogJ2hzbGEoMCwwJSwxMDAlLC44NSknXHJcbiAgfSlcclxufVxyXG4iLCIvLyBNb29kYWxcclxuXHJcbmltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCAobW9kYWwsIG1vZGFsQnV0dG9uLCBtb2RhbENsb3NlLCBpc0FjdGl2ZSkgPT4ge1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxyXG4gIGNvbnN0ICRtb2RhbHMgPSBnZXRBbGwobW9kYWwpXHJcbiAgY29uc3QgJG1vZGFsQnV0dG9ucyA9IGdldEFsbChtb2RhbEJ1dHRvbilcclxuICBjb25zdCAkbW9kYWxDbG9zZXMgPSBnZXRBbGwobW9kYWxDbG9zZSlcclxuXHJcbiAgLy8gTW9kYWwgQ2xpY2sgT3BlblxyXG4gIGlmICghJG1vZGFsQnV0dG9ucy5sZW5ndGgpIHJldHVyblxyXG4gICRtb2RhbEJ1dHRvbnMuZm9yRWFjaCgkZWwgPT4gJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3Blbk1vZGFsKCRlbC5kYXRhc2V0LnRhcmdldCkpKVxyXG5cclxuICAvLyBNb2RhbCBDbGljayBDbG9zZVxyXG4gIGlmICghJG1vZGFsQ2xvc2VzLmxlbmd0aCkgcmV0dXJuXHJcbiAgJG1vZGFsQ2xvc2VzLmZvckVhY2goZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZU1vZGFscygpKSlcclxuXHJcbiAgY29uc3Qgb3Blbk1vZGFsID0gdGFyZ2V0ID0+IHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLW1lbnUnKVxyXG4gICAgY29uc3QgJHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldClcclxuICAgIHJvb3RFbC5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy1oaWRkZW4nKVxyXG4gICAgJHRhcmdldC5jbGFzc0xpc3QuYWRkKGlzQWN0aXZlKVxyXG5cclxuICAgIGlmICh0YXJnZXQgPT09ICdtb2RhbC1zZWFyY2gnKSB7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtZmllbGQnKS5mb2N1cygpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbG9zZU1vZGFscyA9ICgpID0+IHtcclxuICAgIHJvb3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKVxyXG4gICAgJG1vZGFscy5mb3JFYWNoKCRlbCA9PiAkZWwuY2xhc3NMaXN0LnJlbW92ZShpc0FjdGl2ZSkpXHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBjb25zdCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICBjbG9zZU1vZGFscygpXHJcbiAgICAgIC8vIGNsb3NlRHJvcGRvd25zKClcclxuICAgIH1cclxuICB9KVxyXG59XHJcbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXHJcblxyXG4vKipcclxuICogR2FsbGVyeSBjYXJkIHN1cHBvcnRcclxuICogVXNlZCBvbiBhbnkgaW5kaXZpZHVhbCBwb3N0L3BhZ2VcclxuICpcclxuICogRGV0ZWN0cyB3aGVuIGEgZ2FsbGVyeSBjYXJkIGhhcyBiZWVuIHVzZWQgYW5kIGFwcGxpZXMgc2l6aW5nIHRvIG1ha2Ugc3VyZVxyXG4gKiB0aGUgZGlzcGxheSBtYXRjaGVzIHdoYXQgaXMgc2VlbiBpbiB0aGUgZWRpdG9yLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICBjb25zdCBpbWFnZXMgPSBnZXRBbGwoJy5rZy1nYWxsZXJ5LWltYWdlID4gaW1nJylcclxuXHJcbiAgaWYgKCFpbWFnZXMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgaW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gaW1hZ2UuY2xvc2VzdCgnLmtnLWdhbGxlcnktaW1hZ2UnKVxyXG4gICAgY29uc3Qgd2lkdGggPSBpbWFnZS5hdHRyaWJ1dGVzLndpZHRoLnZhbHVlXHJcbiAgICBjb25zdCBoZWlnaHQgPSBpbWFnZS5hdHRyaWJ1dGVzLmhlaWdodC52YWx1ZVxyXG4gICAgY29uc3QgcmF0aW8gPSB3aWR0aCAvIGhlaWdodFxyXG4gICAgY29udGFpbmVyLnN0eWxlLmZsZXggPSByYXRpbyArICcgMSAwJSdcclxuICB9KVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IHVybCA9PiAvXihodHRwcz86XFwvXFwvKT8oW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkoW1xcL1xcdyBcXCtcXC4tXSopKlxcLz8kLy50ZXN0KHVybCkgLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgLyogSWZyYW1lIFNSQyB2aWRlbyAqL1xyXG4gIGNvbnN0IHNlbGVjdG9ycyA9IFtcclxuICAgICdpZnJhbWVbc3JjKj1cInBsYXllci52aW1lby5jb21cIl0nLFxyXG4gICAgJ2lmcmFtZVtzcmMqPVwiZGFpbHltb3Rpb24uY29tXCJdJyxcclxuICAgICdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcclxuICAgICdpZnJhbWVbc3JjKj1cInlvdXR1YmUtbm9jb29raWUuY29tXCJdJyxcclxuICAgICdpZnJhbWVbc3JjKj1cInBsYXllci50d2l0Y2gudHZcIl0nLFxyXG4gICAgJ2lmcmFtZVtzcmMqPVwia2lja3N0YXJ0ZXIuY29tXCJdW3NyYyo9XCJ2aWRlby5odG1sXCJdJ1xyXG4gIF1cclxuXHJcbiAgY29uc3QgaWZyYW1lcyA9IGdldEFsbChzZWxlY3RvcnMuam9pbignLCcpKVxyXG5cclxuICBpZiAoIWlmcmFtZXMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgaWZyYW1lcy5mb3JFYWNoKGVsID0+IHtcclxuICAgIGNvbnN0IHBhcmVudEZvclZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHBhcmVudEZvclZpZGVvLmNsYXNzTmFtZSA9ICd2aWRlby1yZXNwb25zaXZlJ1xyXG4gICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocGFyZW50Rm9yVmlkZW8sIGVsKVxyXG4gICAgcGFyZW50Rm9yVmlkZW8uYXBwZW5kQ2hpbGQoZWwpXHJcbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2hlaWdodCcpXHJcbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3dpZHRoJylcclxuICB9KVxyXG59XHJcbiIsIi8qIGdsb2JhbCBwcmlzbUpzIGZvbGxvd1NvY2lhbE1lZGlhIG1lbnVEcm9wZG93biBzaXRlU2VhcmNoICovXHJcblxyXG4vLyBsaWJcclxuaW1wb3J0ICdsYXp5c2l6ZXMnXHJcblxyXG5pbXBvcnQgbG9hZFNjcmlwdCBmcm9tICcuL2NvbXBvbmVudHMvbG9hZC1zY3JpcHQnXHJcbmltcG9ydCB2aWRlb1Jlc3BvbnNpdmUgZnJvbSAnLi9jb21wb25lbnRzL3ZpZGVvLXJlc3BvbnNpdmUnXHJcbmltcG9ydCByZXNpemVJbWFnZXNJbkdhbGxlcmllcyBmcm9tICcuL2NvbXBvbmVudHMvcmVzaXplLWltYWdlcy1nYWxsZXJpZXMnXHJcbmltcG9ydCBtZWRpdW1ab29tSW1nIGZyb20gJy4vY29tcG9uZW50cy9tZWRpdW0tem9vbSdcclxuaW1wb3J0IHNpbXBseU1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbCdcclxuXHJcbmltcG9ydCBkcm9wRG93bk1lbnUgZnJvbSAnLi9hcHAvbWVudS1kcm9wLWRvd24nXHJcbmltcG9ydCBzb2NpYWxNZWRpYSBmcm9tICcuL2FwcC9zb25jaWFsLW1lZGlhJ1xyXG5pbXBvcnQgaGVhZGVyVHJhbnNwYXJlbmN5IGZyb20gJy4vYXBwL2hlYWRlci10cmFuc3BhcmVuY3knXHJcbmltcG9ydCBkYXJrTW9kZSBmcm9tICcuL2FwcC9kYXJrLW1vZGUnXHJcbmltcG9ydCBkcm9wZG93blRvZ2dsZSBmcm9tICcuL2FwcC9kcm9wZG93bi10b2dnbGUnXHJcblxyXG5jb25zdCBzaW1wbHlTZXR1cCA9ICgpID0+IHtcclxuICAvKiBNZW51IERyb3BEb3duXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGlmICh0eXBlb2YgbWVudURyb3Bkb3duID09PSAnb2JqZWN0JyAmJiBtZW51RHJvcGRvd24gIT09IG51bGwpIHtcclxuICAgIGRyb3BEb3duTWVudShtZW51RHJvcGRvd24sICcuanMtZHJvcGRvd24tbWVudScpXHJcbiAgfVxyXG5cclxuICAvKiBTb2NpYWwgTWVkaWFcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgaWYgKHR5cGVvZiBmb2xsb3dTb2NpYWxNZWRpYSA9PT0gJ29iamVjdCcgJiYgZm9sbG93U29jaWFsTWVkaWEgIT09IG51bGwpIHtcclxuICAgIHNvY2lhbE1lZGlhKGZvbGxvd1NvY2lhbE1lZGlhLCAnLmpzLXNvY2lhbC1tZWRpYScpXHJcbiAgfVxyXG5cclxuICAvKiAgVG9nZ2xlIG1vZGFsXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIHNpbXBseU1vZGFsKCcuanMtbW9kYWwnLCAnLmpzLW1vZGFsLWJ1dHRvbicsICcuanMtbW9kYWwtY2xvc2UnLCAnaXMtYWN0aXZlJylcclxuXHJcbiAgLyogVG9nZ2xlIE1lbnVcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1lbnUtdG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2hhcy1tZW51JylcclxuICB9KVxyXG5cclxuICAvKiBIZWFkZXIgVHJhbnNwYXJlbmN5XHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGhlYWRlclRyYW5zcGFyZW5jeSgnLmhhcy1jb3ZlcicsICdpcy1oZWFkLXRyYW5zcGFyZW50JylcclxuXHJcbiAgLyogRGFyayBNb2RlXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGRhcmtNb2RlKCcuanMtZGFyay1tb2RlJylcclxuXHJcbiAgLyogQWxsIFZpZGVvIFJlc3BvbnNpdmVcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgdmlkZW9SZXNwb25zaXZlKClcclxuXHJcbiAgLyogR2FsbGVyeSBDYXJkXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIHJlc2l6ZUltYWdlc0luR2FsbGVyaWVzKClcclxuXHJcbiAgLyogbWVkaXVtLXpvb21cclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgbWVkaXVtWm9vbUltZygnLnBvc3QtYm9keSBpbWcnKVxyXG5cclxuICAvKiBEcm9wRG93biBUb2dnbGVcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgZHJvcGRvd25Ub2dnbGUoJy5kcm9wZG93bjpub3QoLmlzLWhvdmVyYWJsZSknKVxyXG5cclxuICAvKiBoaWdobGlnaHQgcHJpc21qc1xyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnY29kZVtjbGFzcyo9bGFuZ3VhZ2UtXScpLmxlbmd0aCAmJiB0eXBlb2YgcHJpc21KcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGxvYWRTY3JpcHQocHJpc21KcylcclxuICB9XHJcblxyXG4gIC8qIExvYWQgU2VhcmNoXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGlmICh0eXBlb2Ygc2VhcmNoU2V0dGluZ3MgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzaXRlU2VhcmNoICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgbG9hZFNjcmlwdChzaXRlU2VhcmNoKVxyXG4gICAgLy8gbG9hZFNjcmlwdCgnaHR0cHM6Ly91bnBrZy5jb20vQHRyeWdob3N0L2NvbnRlbnQtYXBpQDEuNC45L3VtZC9jb250ZW50LWFwaS5taW4uanMnLCAoKSA9PiB7XHJcbiAgICAvLyAgIGxvYWRTY3JpcHQoc2l0ZVNlYXJjaClcclxuICAgIC8vIH0pXHJcbiAgfVxyXG4gIC8vXHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzaW1wbHlTZXR1cClcclxuIl19

//# sourceMappingURL=map/main.js.map
