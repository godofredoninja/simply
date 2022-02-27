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

// https://www.javascripttutorial.net/javascript-dom/javascript-scroll-events/
var _default = function _default(coverClass, headTransparent) {
  var domBody = document.body;
  var hasCover = domBody.closest(coverClass);
  var $jsHeader = document.querySelector('.js-header');
  window.addEventListener('scroll', function () {
    var lastScrollY = window.scrollY;

    if (lastScrollY > 5) {
      $jsHeader.classList.add('shadow-header', 'header-bg');
    } else {
      $jsHeader.classList.remove('shadow-header', 'header-bg');
    }

    if (!hasCover) return;
    lastScrollY >= 20 ? domBody.classList.remove(headTransparent) : domBody.classList.add(headTransparent);
    console.log('joder');
  }, {
    passive: true
  });
}; // const scrollFunction = () => {
//   if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
//     $jsHeader.classList.add('shadow-header', 'header-bg')
//   } else {
//     $jsHeader.classList.remove('shadow-header', 'header-bg')
//   }
// }
// window.onscroll = function () {
//   scrollFunction()
// }


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
    link.classList = 'dropdown-item block py-2 leading-tight px-5 hover:text-primary';
    link.innerText = name; // link.innerHTML = `<a href="${url}" class="dropdown-item hover:text-primary">${name}</a>`

    newbox.appendChild(link);
  });
};

exports.default = _default;

},{"../components/url-regular-expression":20,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/helpers/slicedToArray":6}],16:[function(require,module,exports){
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
      link.classList = 'p-2 inline-block hover:opacity-70';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = "<svg class=\"icon\"><use xlink:href=\"#icon-".concat(name, "\"></use></svg>");
      element.appendChild(link);
    });
  };

  return nodeBox.forEach(createElement);
};

exports.default = _default;

},{"../components/url-regular-expression":20,"./get-all":13,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/helpers/slicedToArray":6}],17:[function(require,module,exports){
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(url) {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/.test(url);
}; //eslint-disable-line


exports.default = _default;

},{}],21:[function(require,module,exports){
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
    el.classList.add('aspect-video', 'w-full'); // const parentForVideo = document.createElement('div')
    // parentForVideo.className = 'video-responsive'
    // el.parentNode.insertBefore(parentForVideo, el)
    // parentForVideo.appendChild(el)

    el.removeAttribute('height');
    el.removeAttribute('width');
  });
};

exports.default = _default;

},{"../app/get-all":13,"@babel/runtime/helpers/interopRequireDefault":3}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("lazysizes");

var _loadScript = _interopRequireDefault(require("./components/load-script"));

var _videoResponsive = _interopRequireDefault(require("./components/video-responsive"));

var _mediumZoom = _interopRequireDefault(require("./components/medium-zoom"));

var _modal = _interopRequireDefault(require("./components/modal"));

var _menuDropDown = _interopRequireDefault(require("./app/menu-drop-down"));

var _soncialMedia = _interopRequireDefault(require("./app/soncial-media"));

var _headerTransparency = _interopRequireDefault(require("./app/header-transparency"));

var _darkMode = _interopRequireDefault(require("./app/dark-mode"));

var _dropdownToggle = _interopRequireDefault(require("./app/dropdown-toggle"));

/* global prismJs followSocialMedia menuDropdown siteSearch */
// lib
// import resizeImagesInGalleries from './components/resize-images-galleries'
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
  // resizeImagesInGalleries()

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

},{"./app/dark-mode":11,"./app/dropdown-toggle":12,"./app/header-transparency":14,"./app/menu-drop-down":15,"./app/soncial-media":16,"./components/load-script":17,"./components/medium-zoom":18,"./components/modal":19,"./components/video-responsive":21,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/helpers/typeof":7,"lazysizes":9}]},{},[22])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sYXp5c2l6ZXMvbGF6eXNpemVzLmpzIiwibm9kZV9tb2R1bGVzL21lZGl1bS16b29tL2Rpc3QvbWVkaXVtLXpvb20ubWluLmpzIiwic3JjL2pzL2FwcC9kYXJrLW1vZGUuanMiLCJzcmMvanMvYXBwL2Ryb3Bkb3duLXRvZ2dsZS5qcyIsInNyYy9qcy9hcHAvZ2V0LWFsbC5qcyIsInNyYy9qcy9hcHAvaGVhZGVyLXRyYW5zcGFyZW5jeS5qcyIsInNyYy9qcy9hcHAvbWVudS1kcm9wLWRvd24uanMiLCJzcmMvanMvYXBwL3NvbmNpYWwtbWVkaWEuanMiLCJzcmMvanMvY29tcG9uZW50cy9sb2FkLXNjcmlwdC5qcyIsInNyYy9qcy9jb21wb25lbnRzL21lZGl1bS16b29tLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJzcmMvanMvY29tcG9uZW50cy91cmwtcmVndWxhci1leHByZXNzaW9uLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdmlkZW8tcmVzcG9uc2l2ZS5qcyIsInNyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LEtBQXNCLFdBQW5FLEVBQWdGO0FBQzlFLDZCQUFXLFVBQVgsRUFEOEUsQ0FFOUU7QUFDQTtBQUNBO0FBQ0QsR0E3RHVCLENBK0R4Qjs7QUFDRCxDQWhFRDs7QUFrRUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxXQUE5QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlMaWtlVG9BcnJheSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG5cbiAgaWYgKF9pID09IG51bGwpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG5cbiAgdmFyIF9zLCBfZTtcblxuICB0cnkge1xuICAgIGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzLmpzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiKTtcblxudmFyIHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzKSwgX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuXHR2YXIgbGF6eVNpemVzID0gZmFjdG9yeSh3aW5kb3csIHdpbmRvdy5kb2N1bWVudCwgRGF0ZSk7XG5cdHdpbmRvdy5sYXp5U2l6ZXMgPSBsYXp5U2l6ZXM7XG5cdGlmKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuXHRcdG1vZHVsZS5leHBvcnRzID0gbGF6eVNpemVzO1xuXHR9XG59KHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgP1xuICAgICAgd2luZG93IDoge30sIFxuLyoqXG4gKiBpbXBvcnQoXCIuL3R5cGVzL2dsb2JhbFwiKVxuICogQHR5cGVkZWYgeyBpbXBvcnQoXCIuL3R5cGVzL2xhenlzaXplcy1jb25maWdcIikuTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9IExhenlTaXplc0NvbmZpZ1BhcnRpYWxcbiAqL1xuZnVuY3Rpb24gbCh3aW5kb3csIGRvY3VtZW50LCBEYXRlKSB7IC8vIFBhc3MgaW4gdGhlIHdpbmRvdyBEYXRlIGZ1bmN0aW9uIGFsc28gZm9yIFNTUiBiZWNhdXNlIHRoZSBEYXRlIGNsYXNzIGNhbiBiZSBsb3N0XG5cdCd1c2Ugc3RyaWN0Jztcblx0Lypqc2hpbnQgZXFudWxsOnRydWUgKi9cblxuXHR2YXIgbGF6eXNpemVzLFxuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHsgTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9XG5cdFx0ICovXG5cdFx0bGF6eVNpemVzQ2ZnO1xuXG5cdChmdW5jdGlvbigpe1xuXHRcdHZhciBwcm9wO1xuXG5cdFx0dmFyIGxhenlTaXplc0RlZmF1bHRzID0ge1xuXHRcdFx0bGF6eUNsYXNzOiAnbGF6eWxvYWQnLFxuXHRcdFx0bG9hZGVkQ2xhc3M6ICdsYXp5bG9hZGVkJyxcblx0XHRcdGxvYWRpbmdDbGFzczogJ2xhenlsb2FkaW5nJyxcblx0XHRcdHByZWxvYWRDbGFzczogJ2xhenlwcmVsb2FkJyxcblx0XHRcdGVycm9yQ2xhc3M6ICdsYXp5ZXJyb3InLFxuXHRcdFx0Ly9zdHJpY3RDbGFzczogJ2xhenlzdHJpY3QnLFxuXHRcdFx0YXV0b3NpemVzQ2xhc3M6ICdsYXp5YXV0b3NpemVzJyxcblx0XHRcdGZhc3RMb2FkZWRDbGFzczogJ2xzLWlzLWNhY2hlZCcsXG5cdFx0XHRpZnJhbWVMb2FkTW9kZTogMCxcblx0XHRcdHNyY0F0dHI6ICdkYXRhLXNyYycsXG5cdFx0XHRzcmNzZXRBdHRyOiAnZGF0YS1zcmNzZXQnLFxuXHRcdFx0c2l6ZXNBdHRyOiAnZGF0YS1zaXplcycsXG5cdFx0XHQvL3ByZWxvYWRBZnRlckxvYWQ6IGZhbHNlLFxuXHRcdFx0bWluU2l6ZTogNDAsXG5cdFx0XHRjdXN0b21NZWRpYToge30sXG5cdFx0XHRpbml0OiB0cnVlLFxuXHRcdFx0ZXhwRmFjdG9yOiAxLjUsXG5cdFx0XHRoRmFjOiAwLjgsXG5cdFx0XHRsb2FkTW9kZTogMixcblx0XHRcdGxvYWRIaWRkZW46IHRydWUsXG5cdFx0XHRyaWNUaW1lb3V0OiAwLFxuXHRcdFx0dGhyb3R0bGVEZWxheTogMTI1LFxuXHRcdH07XG5cblx0XHRsYXp5U2l6ZXNDZmcgPSB3aW5kb3cubGF6eVNpemVzQ29uZmlnIHx8IHdpbmRvdy5sYXp5c2l6ZXNDb25maWcgfHwge307XG5cblx0XHRmb3IocHJvcCBpbiBsYXp5U2l6ZXNEZWZhdWx0cyl7XG5cdFx0XHRpZighKHByb3AgaW4gbGF6eVNpemVzQ2ZnKSl7XG5cdFx0XHRcdGxhenlTaXplc0NmZ1twcm9wXSA9IGxhenlTaXplc0RlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSkoKTtcblxuXHRpZiAoIWRvY3VtZW50IHx8ICFkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGluaXQ6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAdHlwZSB7IExhenlTaXplc0NvbmZpZ1BhcnRpYWwgfVxuXHRcdFx0ICovXG5cdFx0XHRjZmc6IGxhenlTaXplc0NmZyxcblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUgeyB0cnVlIH1cblx0XHRcdCAqL1xuXHRcdFx0bm9TdXBwb3J0OiB0cnVlLFxuXHRcdH07XG5cdH1cblxuXHR2YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHR2YXIgc3VwcG9ydFBpY3R1cmUgPSB3aW5kb3cuSFRNTFBpY3R1cmVFbGVtZW50O1xuXG5cdHZhciBfYWRkRXZlbnRMaXN0ZW5lciA9ICdhZGRFdmVudExpc3RlbmVyJztcblxuXHR2YXIgX2dldEF0dHJpYnV0ZSA9ICdnZXRBdHRyaWJ1dGUnO1xuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdG8gYmluZCB0byB3aW5kb3cgYmVjYXVzZSAndGhpcycgYmVjb21lcyBudWxsIGR1cmluZyBTU1Jcblx0ICogYnVpbGRzLlxuXHQgKi9cblx0dmFyIGFkZEV2ZW50TGlzdGVuZXIgPSB3aW5kb3dbX2FkZEV2ZW50TGlzdGVuZXJdLmJpbmQod2luZG93KTtcblxuXHR2YXIgc2V0VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0O1xuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHNldFRpbWVvdXQ7XG5cblx0dmFyIHJlcXVlc3RJZGxlQ2FsbGJhY2sgPSB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaztcblxuXHR2YXIgcmVnUGljdHVyZSA9IC9ecGljdHVyZSQvaTtcblxuXHR2YXIgbG9hZEV2ZW50cyA9IFsnbG9hZCcsICdlcnJvcicsICdsYXp5aW5jbHVkZWQnLCAnX2xhenlsb2FkZWQnXTtcblxuXHR2YXIgcmVnQ2xhc3NDYWNoZSA9IHt9O1xuXG5cdHZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGUge0VsZW1lbnR9XG5cdCAqIEBwYXJhbSBjbHMge3N0cmluZ31cblx0ICovXG5cdHZhciBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0aWYoIXJlZ0NsYXNzQ2FjaGVbY2xzXSl7XG5cdFx0XHRyZWdDbGFzc0NhY2hlW2Nsc10gPSBuZXcgUmVnRXhwKCcoXFxcXHN8XiknK2NscysnKFxcXFxzfCQpJyk7XG5cdFx0fVxuXHRcdHJldHVybiByZWdDbGFzc0NhY2hlW2Nsc10udGVzdChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpICYmIHJlZ0NsYXNzQ2FjaGVbY2xzXTtcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZSB7RWxlbWVudH1cblx0ICogQHBhcmFtIGNscyB7c3RyaW5nfVxuXHQgKi9cblx0dmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHRpZiAoIWhhc0NsYXNzKGVsZSwgY2xzKSl7XG5cdFx0XHRlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnRyaW0oKSArICcgJyArIGNscyk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlIHtFbGVtZW50fVxuXHQgKiBAcGFyYW0gY2xzIHtzdHJpbmd9XG5cdCAqL1xuXHR2YXIgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdHZhciByZWc7XG5cdFx0aWYgKChyZWcgPSBoYXNDbGFzcyhlbGUsY2xzKSkpIHtcblx0XHRcdGVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykucmVwbGFjZShyZWcsICcgJykpO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgYWRkUmVtb3ZlTG9hZEV2ZW50cyA9IGZ1bmN0aW9uKGRvbSwgZm4sIGFkZCl7XG5cdFx0dmFyIGFjdGlvbiA9IGFkZCA/IF9hZGRFdmVudExpc3RlbmVyIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXHRcdGlmKGFkZCl7XG5cdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGRvbSwgZm4pO1xuXHRcdH1cblx0XHRsb2FkRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZ0KXtcblx0XHRcdGRvbVthY3Rpb25dKGV2dCwgZm4pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlbSB7IEVsZW1lbnQgfVxuXHQgKiBAcGFyYW0gbmFtZSB7IHN0cmluZyB9XG5cdCAqIEBwYXJhbSBkZXRhaWwgeyBhbnkgfVxuXHQgKiBAcGFyYW0gbm9CdWJibGVzIHsgYm9vbGVhbiB9XG5cdCAqIEBwYXJhbSBub0NhbmNlbGFibGUgeyBib29sZWFuIH1cblx0ICogQHJldHVybnMgeyBDdXN0b21FdmVudCB9XG5cdCAqL1xuXHR2YXIgdHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24oZWxlbSwgbmFtZSwgZGV0YWlsLCBub0J1YmJsZXMsIG5vQ2FuY2VsYWJsZSl7XG5cdFx0dmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cblx0XHRpZighZGV0YWlsKXtcblx0XHRcdGRldGFpbCA9IHt9O1xuXHRcdH1cblxuXHRcdGRldGFpbC5pbnN0YW5jZSA9IGxhenlzaXplcztcblxuXHRcdGV2ZW50LmluaXRFdmVudChuYW1lLCAhbm9CdWJibGVzLCAhbm9DYW5jZWxhYmxlKTtcblxuXHRcdGV2ZW50LmRldGFpbCA9IGRldGFpbDtcblxuXHRcdGVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0cmV0dXJuIGV2ZW50O1xuXHR9O1xuXG5cdHZhciB1cGRhdGVQb2x5ZmlsbCA9IGZ1bmN0aW9uIChlbCwgZnVsbCl7XG5cdFx0dmFyIHBvbHlmaWxsO1xuXHRcdGlmKCAhc3VwcG9ydFBpY3R1cmUgJiYgKCBwb2x5ZmlsbCA9ICh3aW5kb3cucGljdHVyZWZpbGwgfHwgbGF6eVNpemVzQ2ZnLnBmKSApICl7XG5cdFx0XHRpZihmdWxsICYmIGZ1bGwuc3JjICYmICFlbFtfZ2V0QXR0cmlidXRlXSgnc3Jjc2V0Jykpe1xuXHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIGZ1bGwuc3JjKTtcblx0XHRcdH1cblx0XHRcdHBvbHlmaWxsKHtyZWV2YWx1YXRlOiB0cnVlLCBlbGVtZW50czogW2VsXX0pO1xuXHRcdH0gZWxzZSBpZihmdWxsICYmIGZ1bGwuc3JjKXtcblx0XHRcdGVsLnNyYyA9IGZ1bGwuc3JjO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgZ2V0Q1NTID0gZnVuY3Rpb24gKGVsZW0sIHN0eWxlKXtcblx0XHRyZXR1cm4gKGdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCkgfHwge30pW3N0eWxlXTtcblx0fTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVsZW0geyBFbGVtZW50IH1cblx0ICogQHBhcmFtIHBhcmVudCB7IEVsZW1lbnQgfVxuXHQgKiBAcGFyYW0gW3dpZHRoXSB7bnVtYmVyfVxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0dmFyIGdldFdpZHRoID0gZnVuY3Rpb24oZWxlbSwgcGFyZW50LCB3aWR0aCl7XG5cdFx0d2lkdGggPSB3aWR0aCB8fCBlbGVtLm9mZnNldFdpZHRoO1xuXG5cdFx0d2hpbGUod2lkdGggPCBsYXp5U2l6ZXNDZmcubWluU2l6ZSAmJiBwYXJlbnQgJiYgIWVsZW0uX2xhenlzaXplc1dpZHRoKXtcblx0XHRcdHdpZHRoID0gIHBhcmVudC5vZmZzZXRXaWR0aDtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiB3aWR0aDtcblx0fTtcblxuXHR2YXIgckFGID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHJ1bm5pbmcsIHdhaXRpbmc7XG5cdFx0dmFyIGZpcnN0Rm5zID0gW107XG5cdFx0dmFyIHNlY29uZEZucyA9IFtdO1xuXHRcdHZhciBmbnMgPSBmaXJzdEZucztcblxuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIHJ1bkZucyA9IGZucztcblxuXHRcdFx0Zm5zID0gZmlyc3RGbnMubGVuZ3RoID8gc2Vjb25kRm5zIDogZmlyc3RGbnM7XG5cblx0XHRcdHJ1bm5pbmcgPSB0cnVlO1xuXHRcdFx0d2FpdGluZyA9IGZhbHNlO1xuXG5cdFx0XHR3aGlsZShydW5GbnMubGVuZ3RoKXtcblx0XHRcdFx0cnVuRm5zLnNoaWZ0KCkoKTtcblx0XHRcdH1cblxuXHRcdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdH07XG5cblx0XHR2YXIgcmFmQmF0Y2ggPSBmdW5jdGlvbihmbiwgcXVldWUpe1xuXHRcdFx0aWYocnVubmluZyAmJiAhcXVldWUpe1xuXHRcdFx0XHRmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm5zLnB1c2goZm4pO1xuXG5cdFx0XHRcdGlmKCF3YWl0aW5nKXtcblx0XHRcdFx0XHR3YWl0aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHQoZG9jdW1lbnQuaGlkZGVuID8gc2V0VGltZW91dCA6IHJlcXVlc3RBbmltYXRpb25GcmFtZSkocnVuKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyYWZCYXRjaC5fbHNGbHVzaCA9IHJ1bjtcblxuXHRcdHJldHVybiByYWZCYXRjaDtcblx0fSkoKTtcblxuXHR2YXIgckFGSXQgPSBmdW5jdGlvbihmbiwgc2ltcGxlKXtcblx0XHRyZXR1cm4gc2ltcGxlID9cblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyQUYoZm4pO1xuXHRcdFx0fSA6XG5cdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHRcdFx0XHRyQUYoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRmbi5hcHBseSh0aGF0LCBhcmdzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0O1xuXHR9O1xuXG5cdHZhciB0aHJvdHRsZSA9IGZ1bmN0aW9uKGZuKXtcblx0XHR2YXIgcnVubmluZztcblx0XHR2YXIgbGFzdFRpbWUgPSAwO1xuXHRcdHZhciBnRGVsYXkgPSBsYXp5U2l6ZXNDZmcudGhyb3R0bGVEZWxheTtcblx0XHR2YXIgcklDVGltZW91dCA9IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0O1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdFx0bGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0Zm4oKTtcblx0XHR9O1xuXHRcdHZhciBpZGxlQ2FsbGJhY2sgPSByZXF1ZXN0SWRsZUNhbGxiYWNrICYmIHJJQ1RpbWVvdXQgPiA0OSA/XG5cdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHRyZXF1ZXN0SWRsZUNhbGxiYWNrKHJ1biwge3RpbWVvdXQ6IHJJQ1RpbWVvdXR9KTtcblxuXHRcdFx0XHRpZihySUNUaW1lb3V0ICE9PSBsYXp5U2l6ZXNDZmcucmljVGltZW91dCl7XG5cdFx0XHRcdFx0cklDVGltZW91dCA9IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0O1xuXHRcdFx0XHR9XG5cdFx0XHR9IDpcblx0XHRcdHJBRkl0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHNldFRpbWVvdXQocnVuKTtcblx0XHRcdH0sIHRydWUpXG5cdFx0O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGlzUHJpb3JpdHkpe1xuXHRcdFx0dmFyIGRlbGF5O1xuXG5cdFx0XHRpZigoaXNQcmlvcml0eSA9IGlzUHJpb3JpdHkgPT09IHRydWUpKXtcblx0XHRcdFx0cklDVGltZW91dCA9IDMzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihydW5uaW5nKXtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRydW5uaW5nID0gIHRydWU7XG5cblx0XHRcdGRlbGF5ID0gZ0RlbGF5IC0gKERhdGUubm93KCkgLSBsYXN0VGltZSk7XG5cblx0XHRcdGlmKGRlbGF5IDwgMCl7XG5cdFx0XHRcdGRlbGF5ID0gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYoaXNQcmlvcml0eSB8fCBkZWxheSA8IDkpe1xuXHRcdFx0XHRpZGxlQ2FsbGJhY2soKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoaWRsZUNhbGxiYWNrLCBkZWxheSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHQvL2Jhc2VkIG9uIGh0dHA6Ly9tb2Rlcm5qYXZhc2NyaXB0LmJsb2dzcG90LmRlLzIwMTMvMDgvYnVpbGRpbmctYmV0dGVyLWRlYm91bmNlLmh0bWxcblx0dmFyIGRlYm91bmNlID0gZnVuY3Rpb24oZnVuYykge1xuXHRcdHZhciB0aW1lb3V0LCB0aW1lc3RhbXA7XG5cdFx0dmFyIHdhaXQgPSA5OTtcblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYygpO1xuXHRcdH07XG5cdFx0dmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbGFzdCA9IERhdGUubm93KCkgLSB0aW1lc3RhbXA7XG5cblx0XHRcdGlmIChsYXN0IDwgd2FpdCkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQocmVxdWVzdElkbGVDYWxsYmFjayB8fCBydW4pKHJ1bik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cblx0XHRcdGlmICghdGltZW91dCkge1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHR2YXIgbG9hZGVyID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHByZWxvYWRFbGVtcywgaXNDb21wbGV0ZWQsIHJlc2V0UHJlbG9hZGluZ1RpbWVyLCBsb2FkTW9kZSwgc3RhcnRlZDtcblxuXHRcdHZhciBlTHZXLCBlbHZILCBlTHRvcCwgZUxsZWZ0LCBlTHJpZ2h0LCBlTGJvdHRvbSwgaXNCb2R5SGlkZGVuO1xuXG5cdFx0dmFyIHJlZ0ltZyA9IC9eaW1nJC9pO1xuXHRcdHZhciByZWdJZnJhbWUgPSAvXmlmcmFtZSQvaTtcblxuXHRcdHZhciBzdXBwb3J0U2Nyb2xsID0gKCdvbnNjcm9sbCcgaW4gd2luZG93KSAmJiAhKC8oZ2xlfGluZylib3QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpO1xuXG5cdFx0dmFyIHNocmlua0V4cGFuZCA9IDA7XG5cdFx0dmFyIGN1cnJlbnRFeHBhbmQgPSAwO1xuXG5cdFx0dmFyIGlzTG9hZGluZyA9IDA7XG5cdFx0dmFyIGxvd1J1bnMgPSAtMTtcblxuXHRcdHZhciByZXNldFByZWxvYWRpbmcgPSBmdW5jdGlvbihlKXtcblx0XHRcdGlzTG9hZGluZy0tO1xuXHRcdFx0aWYoIWUgfHwgaXNMb2FkaW5nIDwgMCB8fCAhZS50YXJnZXQpe1xuXHRcdFx0XHRpc0xvYWRpbmcgPSAwO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgaXNWaXNpYmxlID0gZnVuY3Rpb24gKGVsZW0pIHtcblx0XHRcdGlmIChpc0JvZHlIaWRkZW4gPT0gbnVsbCkge1xuXHRcdFx0XHRpc0JvZHlIaWRkZW4gPSBnZXRDU1MoZG9jdW1lbnQuYm9keSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGlzQm9keUhpZGRlbiB8fCAhKGdldENTUyhlbGVtLnBhcmVudE5vZGUsICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbicgJiYgZ2V0Q1NTKGVsZW0sICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbicpO1xuXHRcdH07XG5cblx0XHR2YXIgaXNOZXN0ZWRWaXNpYmxlID0gZnVuY3Rpb24oZWxlbSwgZWxlbUV4cGFuZCl7XG5cdFx0XHR2YXIgb3V0ZXJSZWN0O1xuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW07XG5cdFx0XHR2YXIgdmlzaWJsZSA9IGlzVmlzaWJsZShlbGVtKTtcblxuXHRcdFx0ZUx0b3AgLT0gZWxlbUV4cGFuZDtcblx0XHRcdGVMYm90dG9tICs9IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTGxlZnQgLT0gZWxlbUV4cGFuZDtcblx0XHRcdGVMcmlnaHQgKz0gZWxlbUV4cGFuZDtcblxuXHRcdFx0d2hpbGUodmlzaWJsZSAmJiAocGFyZW50ID0gcGFyZW50Lm9mZnNldFBhcmVudCkgJiYgcGFyZW50ICE9IGRvY3VtZW50LmJvZHkgJiYgcGFyZW50ICE9IGRvY0VsZW0pe1xuXHRcdFx0XHR2aXNpYmxlID0gKChnZXRDU1MocGFyZW50LCAnb3BhY2l0eScpIHx8IDEpID4gMCk7XG5cblx0XHRcdFx0aWYodmlzaWJsZSAmJiBnZXRDU1MocGFyZW50LCAnb3ZlcmZsb3cnKSAhPSAndmlzaWJsZScpe1xuXHRcdFx0XHRcdG91dGVyUmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0XHR2aXNpYmxlID0gZUxyaWdodCA+IG91dGVyUmVjdC5sZWZ0ICYmXG5cdFx0XHRcdFx0XHRlTGxlZnQgPCBvdXRlclJlY3QucmlnaHQgJiZcblx0XHRcdFx0XHRcdGVMYm90dG9tID4gb3V0ZXJSZWN0LnRvcCAtIDEgJiZcblx0XHRcdFx0XHRcdGVMdG9wIDwgb3V0ZXJSZWN0LmJvdHRvbSArIDFcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZpc2libGU7XG5cdFx0fTtcblxuXHRcdHZhciBjaGVja0VsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZUxsZW4sIGksIHJlY3QsIGF1dG9Mb2FkRWxlbSwgbG9hZGVkU29tZXRoaW5nLCBlbGVtRXhwYW5kLCBlbGVtTmVnYXRpdmVFeHBhbmQsIGVsZW1FeHBhbmRWYWwsXG5cdFx0XHRcdGJlZm9yZUV4cGFuZFZhbCwgZGVmYXVsdEV4cGFuZCwgcHJlbG9hZEV4cGFuZCwgaEZhYztcblx0XHRcdHZhciBsYXp5bG9hZEVsZW1zID0gbGF6eXNpemVzLmVsZW1lbnRzO1xuXG5cdFx0XHRpZigobG9hZE1vZGUgPSBsYXp5U2l6ZXNDZmcubG9hZE1vZGUpICYmIGlzTG9hZGluZyA8IDggJiYgKGVMbGVuID0gbGF6eWxvYWRFbGVtcy5sZW5ndGgpKXtcblxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0XHRsb3dSdW5zKys7XG5cblx0XHRcdFx0Zm9yKDsgaSA8IGVMbGVuOyBpKyspe1xuXG5cdFx0XHRcdFx0aWYoIWxhenlsb2FkRWxlbXNbaV0gfHwgbGF6eWxvYWRFbGVtc1tpXS5fbGF6eVJhY2Upe2NvbnRpbnVlO31cblxuXHRcdFx0XHRcdGlmKCFzdXBwb3J0U2Nyb2xsIHx8IChsYXp5c2l6ZXMucHJlbWF0dXJlVW52ZWlsICYmIGxhenlzaXplcy5wcmVtYXR1cmVVbnZlaWwobGF6eWxvYWRFbGVtc1tpXSkpKXt1bnZlaWxFbGVtZW50KGxhenlsb2FkRWxlbXNbaV0pO2NvbnRpbnVlO31cblxuXHRcdFx0XHRcdGlmKCEoZWxlbUV4cGFuZFZhbCA9IGxhenlsb2FkRWxlbXNbaV1bX2dldEF0dHJpYnV0ZV0oJ2RhdGEtZXhwYW5kJykpIHx8ICEoZWxlbUV4cGFuZCA9IGVsZW1FeHBhbmRWYWwgKiAxKSl7XG5cdFx0XHRcdFx0XHRlbGVtRXhwYW5kID0gY3VycmVudEV4cGFuZDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIWRlZmF1bHRFeHBhbmQpIHtcblx0XHRcdFx0XHRcdGRlZmF1bHRFeHBhbmQgPSAoIWxhenlTaXplc0NmZy5leHBhbmQgfHwgbGF6eVNpemVzQ2ZnLmV4cGFuZCA8IDEpID9cblx0XHRcdFx0XHRcdFx0ZG9jRWxlbS5jbGllbnRIZWlnaHQgPiA1MDAgJiYgZG9jRWxlbS5jbGllbnRXaWR0aCA+IDUwMCA/IDUwMCA6IDM3MCA6XG5cdFx0XHRcdFx0XHRcdGxhenlTaXplc0NmZy5leHBhbmQ7XG5cblx0XHRcdFx0XHRcdGxhenlzaXplcy5fZGVmRXggPSBkZWZhdWx0RXhwYW5kO1xuXG5cdFx0XHRcdFx0XHRwcmVsb2FkRXhwYW5kID0gZGVmYXVsdEV4cGFuZCAqIGxhenlTaXplc0NmZy5leHBGYWN0b3I7XG5cdFx0XHRcdFx0XHRoRmFjID0gbGF6eVNpemVzQ2ZnLmhGYWM7XG5cdFx0XHRcdFx0XHRpc0JvZHlIaWRkZW4gPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRpZihjdXJyZW50RXhwYW5kIDwgcHJlbG9hZEV4cGFuZCAmJiBpc0xvYWRpbmcgPCAxICYmIGxvd1J1bnMgPiAyICYmIGxvYWRNb2RlID4gMiAmJiAhZG9jdW1lbnQuaGlkZGVuKXtcblx0XHRcdFx0XHRcdFx0Y3VycmVudEV4cGFuZCA9IHByZWxvYWRFeHBhbmQ7XG5cdFx0XHRcdFx0XHRcdGxvd1J1bnMgPSAwO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmKGxvYWRNb2RlID4gMSAmJiBsb3dSdW5zID4gMSAmJiBpc0xvYWRpbmcgPCA2KXtcblx0XHRcdFx0XHRcdFx0Y3VycmVudEV4cGFuZCA9IGRlZmF1bHRFeHBhbmQ7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gc2hyaW5rRXhwYW5kO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKGJlZm9yZUV4cGFuZFZhbCAhPT0gZWxlbUV4cGFuZCl7XG5cdFx0XHRcdFx0XHRlTHZXID0gaW5uZXJXaWR0aCArIChlbGVtRXhwYW5kICogaEZhYyk7XG5cdFx0XHRcdFx0XHRlbHZIID0gaW5uZXJIZWlnaHQgKyBlbGVtRXhwYW5kO1xuXHRcdFx0XHRcdFx0ZWxlbU5lZ2F0aXZlRXhwYW5kID0gZWxlbUV4cGFuZCAqIC0xO1xuXHRcdFx0XHRcdFx0YmVmb3JlRXhwYW5kVmFsID0gZWxlbUV4cGFuZDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZWN0ID0gbGF6eWxvYWRFbGVtc1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0XHRcdGlmICgoZUxib3R0b20gPSByZWN0LmJvdHRvbSkgPj0gZWxlbU5lZ2F0aXZlRXhwYW5kICYmXG5cdFx0XHRcdFx0XHQoZUx0b3AgPSByZWN0LnRvcCkgPD0gZWx2SCAmJlxuXHRcdFx0XHRcdFx0KGVMcmlnaHQgPSByZWN0LnJpZ2h0KSA+PSBlbGVtTmVnYXRpdmVFeHBhbmQgKiBoRmFjICYmXG5cdFx0XHRcdFx0XHQoZUxsZWZ0ID0gcmVjdC5sZWZ0KSA8PSBlTHZXICYmXG5cdFx0XHRcdFx0XHQoZUxib3R0b20gfHwgZUxyaWdodCB8fCBlTGxlZnQgfHwgZUx0b3ApICYmXG5cdFx0XHRcdFx0XHQobGF6eVNpemVzQ2ZnLmxvYWRIaWRkZW4gfHwgaXNWaXNpYmxlKGxhenlsb2FkRWxlbXNbaV0pKSAmJlxuXHRcdFx0XHRcdFx0KChpc0NvbXBsZXRlZCAmJiBpc0xvYWRpbmcgPCAzICYmICFlbGVtRXhwYW5kVmFsICYmIChsb2FkTW9kZSA8IDMgfHwgbG93UnVucyA8IDQpKSB8fCBpc05lc3RlZFZpc2libGUobGF6eWxvYWRFbGVtc1tpXSwgZWxlbUV4cGFuZCkpKXtcblx0XHRcdFx0XHRcdHVudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7XG5cdFx0XHRcdFx0XHRsb2FkZWRTb21ldGhpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0aWYoaXNMb2FkaW5nID4gOSl7YnJlYWs7fVxuXHRcdFx0XHRcdH0gZWxzZSBpZighbG9hZGVkU29tZXRoaW5nICYmIGlzQ29tcGxldGVkICYmICFhdXRvTG9hZEVsZW0gJiZcblx0XHRcdFx0XHRcdGlzTG9hZGluZyA8IDQgJiYgbG93UnVucyA8IDQgJiYgbG9hZE1vZGUgPiAyICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8IGxhenlTaXplc0NmZy5wcmVsb2FkQWZ0ZXJMb2FkKSAmJlxuXHRcdFx0XHRcdFx0KHByZWxvYWRFbGVtc1swXSB8fCAoIWVsZW1FeHBhbmRWYWwgJiYgKChlTGJvdHRvbSB8fCBlTHJpZ2h0IHx8IGVMbGVmdCB8fCBlTHRvcCkgfHwgbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc2l6ZXNBdHRyKSAhPSAnYXV0bycpKSkpe1xuXHRcdFx0XHRcdFx0YXV0b0xvYWRFbGVtID0gcHJlbG9hZEVsZW1zWzBdIHx8IGxhenlsb2FkRWxlbXNbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoYXV0b0xvYWRFbGVtICYmICFsb2FkZWRTb21ldGhpbmcpe1xuXHRcdFx0XHRcdHVudmVpbEVsZW1lbnQoYXV0b0xvYWRFbGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyA9IHRocm90dGxlKGNoZWNrRWxlbWVudHMpO1xuXG5cdFx0dmFyIHN3aXRjaExvYWRpbmdDbGFzcyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0dmFyIGVsZW0gPSBlLnRhcmdldDtcblxuXHRcdFx0aWYgKGVsZW0uX2xhenlDYWNoZSkge1xuXHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eUNhY2hlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJlc2V0UHJlbG9hZGluZyhlKTtcblx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkZWRDbGFzcyk7XG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGluZ0NsYXNzKTtcblx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZWxlbSwgcmFmU3dpdGNoTG9hZGluZ0NsYXNzKTtcblx0XHRcdHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWxvYWRlZCcpO1xuXHRcdH07XG5cdFx0dmFyIHJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzID0gckFGSXQoc3dpdGNoTG9hZGluZ0NsYXNzKTtcblx0XHR2YXIgcmFmU3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRyYWZlZFN3aXRjaExvYWRpbmdDbGFzcyh7dGFyZ2V0OiBlLnRhcmdldH0pO1xuXHRcdH07XG5cblx0XHR2YXIgY2hhbmdlSWZyYW1lU3JjID0gZnVuY3Rpb24oZWxlbSwgc3JjKXtcblx0XHRcdHZhciBsb2FkTW9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWxvYWQtbW9kZScpIHx8IGxhenlTaXplc0NmZy5pZnJhbWVMb2FkTW9kZTtcblxuXHRcdFx0Ly8gbG9hZE1vZGUgY2FuIGJlIGFsc28gYSBzdHJpbmchXG5cdFx0XHRpZiAobG9hZE1vZGUgPT0gMCkge1xuXHRcdFx0XHRlbGVtLmNvbnRlbnRXaW5kb3cubG9jYXRpb24ucmVwbGFjZShzcmMpO1xuXHRcdFx0fSBlbHNlIGlmIChsb2FkTW9kZSA9PSAxKSB7XG5cdFx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgaGFuZGxlU291cmNlcyA9IGZ1bmN0aW9uKHNvdXJjZSl7XG5cdFx0XHR2YXIgY3VzdG9tTWVkaWE7XG5cblx0XHRcdHZhciBzb3VyY2VTcmNzZXQgPSBzb3VyY2VbX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY3NldEF0dHIpO1xuXG5cdFx0XHRpZiggKGN1c3RvbU1lZGlhID0gbGF6eVNpemVzQ2ZnLmN1c3RvbU1lZGlhW3NvdXJjZVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1tZWRpYScpIHx8IHNvdXJjZVtfZ2V0QXR0cmlidXRlXSgnbWVkaWEnKV0pICl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgY3VzdG9tTWVkaWEpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihzb3VyY2VTcmNzZXQpe1xuXHRcdFx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgbGF6eVVudmVpbCA9IHJBRkl0KGZ1bmN0aW9uIChlbGVtLCBkZXRhaWwsIGlzQXV0bywgc2l6ZXMsIGlzSW1nKXtcblx0XHRcdHZhciBzcmMsIHNyY3NldCwgcGFyZW50LCBpc1BpY3R1cmUsIGV2ZW50LCBmaXJlc0xvYWQ7XG5cblx0XHRcdGlmKCEoZXZlbnQgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenliZWZvcmV1bnZlaWwnLCBkZXRhaWwpKS5kZWZhdWx0UHJldmVudGVkKXtcblxuXHRcdFx0XHRpZihzaXplcyl7XG5cdFx0XHRcdFx0aWYoaXNBdXRvKXtcblx0XHRcdFx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHNpemVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzcmNzZXQgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNzZXRBdHRyKTtcblx0XHRcdFx0c3JjID0gZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3JjQXR0cik7XG5cblx0XHRcdFx0aWYoaXNJbWcpIHtcblx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdFx0aXNQaWN0dXJlID0gcGFyZW50ICYmIHJlZ1BpY3R1cmUudGVzdChwYXJlbnQubm9kZU5hbWUgfHwgJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZmlyZXNMb2FkID0gZGV0YWlsLmZpcmVzTG9hZCB8fCAoKCdzcmMnIGluIGVsZW0pICYmIChzcmNzZXQgfHwgc3JjIHx8IGlzUGljdHVyZSkpO1xuXG5cdFx0XHRcdGV2ZW50ID0ge3RhcmdldDogZWxlbX07XG5cblx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cblx0XHRcdFx0aWYoZmlyZXNMb2FkKXtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQocmVzZXRQcmVsb2FkaW5nVGltZXIpO1xuXHRcdFx0XHRcdHJlc2V0UHJlbG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChyZXNldFByZWxvYWRpbmcsIDI1MDApO1xuXHRcdFx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZWxlbSwgcmFmU3dpdGNoTG9hZGluZ0NsYXNzLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGlzUGljdHVyZSl7XG5cdFx0XHRcdFx0Zm9yRWFjaC5jYWxsKHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc291cmNlJyksIGhhbmRsZVNvdXJjZXMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoc3Jjc2V0KXtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc3Jjc2V0KTtcblx0XHRcdFx0fSBlbHNlIGlmKHNyYyAmJiAhaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRpZihyZWdJZnJhbWUudGVzdChlbGVtLm5vZGVOYW1lKSl7XG5cdFx0XHRcdFx0XHRjaGFuZ2VJZnJhbWVTcmMoZWxlbSwgc3JjKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5zcmMgPSBzcmM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNJbWcgJiYgKHNyY3NldCB8fCBpc1BpY3R1cmUpKXtcblx0XHRcdFx0XHR1cGRhdGVQb2x5ZmlsbChlbGVtLCB7c3JjOiBzcmN9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZihlbGVtLl9sYXp5UmFjZSl7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5UmFjZTtcblx0XHRcdH1cblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpO1xuXG5cdFx0XHRyQUYoZnVuY3Rpb24oKXtcblx0XHRcdFx0Ly8gUGFydCBvZiB0aGlzIGNhbiBiZSByZW1vdmVkIGFzIHNvb24gYXMgdGhpcyBmaXggaXMgb2xkZXI6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTc3MzEgKDIwMTUpXG5cdFx0XHRcdHZhciBpc0xvYWRlZCA9IGVsZW0uY29tcGxldGUgJiYgZWxlbS5uYXR1cmFsV2lkdGggPiAxO1xuXG5cdFx0XHRcdGlmKCAhZmlyZXNMb2FkIHx8IGlzTG9hZGVkKXtcblx0XHRcdFx0XHRpZiAoaXNMb2FkZWQpIHtcblx0XHRcdFx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5mYXN0TG9hZGVkQ2xhc3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzd2l0Y2hMb2FkaW5nQ2xhc3MoZXZlbnQpO1xuXHRcdFx0XHRcdGVsZW0uX2xhenlDYWNoZSA9IHRydWU7XG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0aWYgKCdfbGF6eUNhY2hlJyBpbiBlbGVtKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5Q2FjaGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSwgOSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGVsZW0ubG9hZGluZyA9PSAnbGF6eScpIHtcblx0XHRcdFx0XHRpc0xvYWRpbmctLTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBlbGVtIHsgRWxlbWVudCB9XG5cdFx0ICovXG5cdFx0dmFyIHVudmVpbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSl7XG5cdFx0XHRpZiAoZWxlbS5fbGF6eVJhY2UpIHtyZXR1cm47fVxuXHRcdFx0dmFyIGRldGFpbDtcblxuXHRcdFx0dmFyIGlzSW1nID0gcmVnSW1nLnRlc3QoZWxlbS5ub2RlTmFtZSk7XG5cblx0XHRcdC8vYWxsb3cgdXNpbmcgc2l6ZXM9XCJhdXRvXCIsIGJ1dCBkb24ndCB1c2UuIGl0J3MgaW52YWxpZC4gVXNlIGRhdGEtc2l6ZXM9XCJhdXRvXCIgb3IgYSB2YWxpZCB2YWx1ZSBmb3Igc2l6ZXMgaW5zdGVhZCAoaS5lLjogc2l6ZXM9XCI4MHZ3XCIpXG5cdFx0XHR2YXIgc2l6ZXMgPSBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc2l6ZXNBdHRyKSB8fCBlbGVtW19nZXRBdHRyaWJ1dGVdKCdzaXplcycpKTtcblx0XHRcdHZhciBpc0F1dG8gPSBzaXplcyA9PSAnYXV0byc7XG5cblx0XHRcdGlmKCAoaXNBdXRvIHx8ICFpc0NvbXBsZXRlZCkgJiYgaXNJbWcgJiYgKGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NyYycpIHx8IGVsZW0uc3Jjc2V0KSAmJiAhZWxlbS5jb21wbGV0ZSAmJiAhaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmVycm9yQ2xhc3MpICYmIGhhc0NsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpKXtyZXR1cm47fVxuXG5cdFx0XHRkZXRhaWwgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenl1bnZlaWxyZWFkJykuZGV0YWlsO1xuXG5cdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHQgYXV0b1NpemVyLnVwZGF0ZUVsZW0oZWxlbSwgdHJ1ZSwgZWxlbS5vZmZzZXRXaWR0aCk7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uX2xhenlSYWNlID0gdHJ1ZTtcblx0XHRcdGlzTG9hZGluZysrO1xuXG5cdFx0XHRsYXp5VW52ZWlsKGVsZW0sIGRldGFpbCwgaXNBdXRvLCBzaXplcywgaXNJbWcpO1xuXHRcdH07XG5cblx0XHR2YXIgYWZ0ZXJTY3JvbGwgPSBkZWJvdW5jZShmdW5jdGlvbigpe1xuXHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMztcblx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblx0XHR9KTtcblxuXHRcdHZhciBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIgPSBmdW5jdGlvbigpe1xuXHRcdFx0aWYobGF6eVNpemVzQ2ZnLmxvYWRNb2RlID09IDMpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAyO1xuXHRcdFx0fVxuXHRcdFx0YWZ0ZXJTY3JvbGwoKTtcblx0XHR9O1xuXG5cdFx0dmFyIG9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihpc0NvbXBsZXRlZCl7cmV0dXJuO31cblx0XHRcdGlmKERhdGUubm93KCkgLSBzdGFydGVkIDwgOTk5KXtcblx0XHRcdFx0c2V0VGltZW91dChvbmxvYWQsIDk5OSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXG5cdFx0XHRpc0NvbXBsZXRlZCA9IHRydWU7XG5cblx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDM7XG5cblx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblxuXHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyLCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRcdGxhenlzaXplcy5lbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmxhenlDbGFzcyk7XG5cdFx0XHRcdHByZWxvYWRFbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmxhenlDbGFzcyArICcgJyArIGxhenlTaXplc0NmZy5wcmVsb2FkQ2xhc3MpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZiAoZS5wZXJzaXN0ZWQpIHtcblx0XHRcdFx0XHRcdHZhciBsb2FkaW5nRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXG5cdFx0XHRcdFx0XHRpZiAobG9hZGluZ0VsZW1lbnRzLmxlbmd0aCAmJiBsb2FkaW5nRWxlbWVudHMuZm9yRWFjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdGxvYWRpbmdFbGVtZW50cy5mb3JFYWNoKCBmdW5jdGlvbiAoaW1nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaW1nLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVudmVpbEVsZW1lbnQoaW1nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZih3aW5kb3cuTXV0YXRpb25PYnNlcnZlcil7XG5cdFx0XHRcdFx0bmV3IE11dGF0aW9uT2JzZXJ2ZXIoIHRocm90dGxlZENoZWNrRWxlbWVudHMgKS5vYnNlcnZlKCBkb2NFbGVtLCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Ob2RlSW5zZXJ0ZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRkb2NFbGVtW19hZGRFdmVudExpc3RlbmVyXSgnRE9NQXR0ck1vZGlmaWVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHRcdFx0c2V0SW50ZXJ2YWwodGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgOTk5KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuXHRcdFx0XHQvLywgJ2Z1bGxzY3JlZW5jaGFuZ2UnXG5cdFx0XHRcdFsnZm9jdXMnLCAnbW91c2VvdmVyJywgJ2NsaWNrJywgJ2xvYWQnLCAndHJhbnNpdGlvbmVuZCcsICdhbmltYXRpb25lbmQnXS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXShuYW1lLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoKC9kJHxeYy8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkpe1xuXHRcdFx0XHRcdG9ubG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWQpO1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXSgnRE9NQ29udGVudExvYWRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCAyMDAwMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihsYXp5c2l6ZXMuZWxlbWVudHMubGVuZ3RoKXtcblx0XHRcdFx0XHRjaGVja0VsZW1lbnRzKCk7XG5cdFx0XHRcdFx0ckFGLl9sc0ZsdXNoKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y2hlY2tFbGVtczogdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyxcblx0XHRcdHVudmVpbDogdW52ZWlsRWxlbWVudCxcblx0XHRcdF9hTFNMOiBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIsXG5cdFx0fTtcblx0fSkoKTtcblxuXG5cdHZhciBhdXRvU2l6ZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgYXV0b3NpemVzRWxlbXM7XG5cblx0XHR2YXIgc2l6ZUVsZW1lbnQgPSByQUZJdChmdW5jdGlvbihlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCl7XG5cdFx0XHR2YXIgc291cmNlcywgaSwgbGVuO1xuXHRcdFx0ZWxlbS5fbGF6eXNpemVzV2lkdGggPSB3aWR0aDtcblx0XHRcdHdpZHRoICs9ICdweCc7XG5cblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblxuXHRcdFx0aWYocmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJykpe1xuXHRcdFx0XHRzb3VyY2VzID0gcGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKTtcblx0XHRcdFx0Zm9yKGkgPSAwLCBsZW4gPSBzb3VyY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcblx0XHRcdFx0XHRzb3VyY2VzW2ldLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCB3aWR0aCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoIWV2ZW50LmRldGFpbC5kYXRhQXR0cil7XG5cdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIGV2ZW50LmRldGFpbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0LyoqXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gZWxlbSB7RWxlbWVudH1cblx0XHQgKiBAcGFyYW0gZGF0YUF0dHJcblx0XHQgKiBAcGFyYW0gW3dpZHRoXSB7IG51bWJlciB9XG5cdFx0ICovXG5cdFx0dmFyIGdldFNpemVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW0sIGRhdGFBdHRyLCB3aWR0aCl7XG5cdFx0XHR2YXIgZXZlbnQ7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXG5cdFx0XHRpZihwYXJlbnQpe1xuXHRcdFx0XHR3aWR0aCA9IGdldFdpZHRoKGVsZW0sIHBhcmVudCwgd2lkdGgpO1xuXHRcdFx0XHRldmVudCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWJlZm9yZXNpemVzJywge3dpZHRoOiB3aWR0aCwgZGF0YUF0dHI6ICEhZGF0YUF0dHJ9KTtcblxuXHRcdFx0XHRpZighZXZlbnQuZGVmYXVsdFByZXZlbnRlZCl7XG5cdFx0XHRcdFx0d2lkdGggPSBldmVudC5kZXRhaWwud2lkdGg7XG5cblx0XHRcdFx0XHRpZih3aWR0aCAmJiB3aWR0aCAhPT0gZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0XHRcdFx0c2l6ZUVsZW1lbnQoZWxlbSwgcGFyZW50LCBldmVudCwgd2lkdGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgdXBkYXRlRWxlbWVudHNTaXplcyA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgaTtcblx0XHRcdHZhciBsZW4gPSBhdXRvc2l6ZXNFbGVtcy5sZW5ndGg7XG5cdFx0XHRpZihsZW4pe1xuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0XHRmb3IoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdGdldFNpemVFbGVtZW50KGF1dG9zaXplc0VsZW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyA9IGRlYm91bmNlKHVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGF1dG9zaXplc0VsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcuYXV0b3NpemVzQ2xhc3MpO1xuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzKTtcblx0XHRcdH0sXG5cdFx0XHRjaGVja0VsZW1zOiBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzLFxuXHRcdFx0dXBkYXRlRWxlbTogZ2V0U2l6ZUVsZW1lbnRcblx0XHR9O1xuXHR9KSgpO1xuXG5cdHZhciBpbml0ID0gZnVuY3Rpb24oKXtcblx0XHRpZighaW5pdC5pICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpe1xuXHRcdFx0aW5pdC5pID0gdHJ1ZTtcblx0XHRcdGF1dG9TaXplci5fKCk7XG5cdFx0XHRsb2FkZXIuXygpO1xuXHRcdH1cblx0fTtcblxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYobGF6eVNpemVzQ2ZnLmluaXQpe1xuXHRcdFx0aW5pdCgpO1xuXHRcdH1cblx0fSk7XG5cblx0bGF6eXNpemVzID0ge1xuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHsgTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9XG5cdFx0ICovXG5cdFx0Y2ZnOiBsYXp5U2l6ZXNDZmcsXG5cdFx0YXV0b1NpemVyOiBhdXRvU2l6ZXIsXG5cdFx0bG9hZGVyOiBsb2FkZXIsXG5cdFx0aW5pdDogaW5pdCxcblx0XHR1UDogdXBkYXRlUG9seWZpbGwsXG5cdFx0YUM6IGFkZENsYXNzLFxuXHRcdHJDOiByZW1vdmVDbGFzcyxcblx0XHRoQzogaGFzQ2xhc3MsXG5cdFx0ZmlyZTogdHJpZ2dlckV2ZW50LFxuXHRcdGdXOiBnZXRXaWR0aCxcblx0XHRyQUY6IHJBRixcblx0fTtcblxuXHRyZXR1cm4gbGF6eXNpemVzO1xufVxuKSk7XG4iLCIvKiEgbWVkaXVtLXpvb20gMS4wLjYgfCBNSVQgTGljZW5zZSB8IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmFuY29pc2NoYWxpZm91ci9tZWRpdW0tem9vbSAqL1xuIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9ZXx8c2VsZikubWVkaXVtWm9vbT10KCl9KHRoaXMsKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTE7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyl7dmFyIG89YXJndW1lbnRzW3RdO2Zvcih2YXIgbiBpbiBvKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLG4pJiYoZVtuXT1vW25dKX1yZXR1cm4gZX0sdD1mdW5jdGlvbihlKXtyZXR1cm5cIklNR1wiPT09ZS50YWdOYW1lfSxvPWZ1bmN0aW9uKGUpe3JldHVybiBlJiYxPT09ZS5ub2RlVHlwZX0sbj1mdW5jdGlvbihlKXtyZXR1cm5cIi5zdmdcIj09PShlLmN1cnJlbnRTcmN8fGUuc3JjKS5zdWJzdHIoLTQpLnRvTG93ZXJDYXNlKCl9LGk9ZnVuY3Rpb24oZSl7dHJ5e3JldHVybiBBcnJheS5pc0FycmF5KGUpP2UuZmlsdGVyKHQpOmZ1bmN0aW9uKGUpe3JldHVybiBOb2RlTGlzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihlKX0oZSk/W10uc2xpY2UuY2FsbChlKS5maWx0ZXIodCk6byhlKT9bZV0uZmlsdGVyKHQpOlwic3RyaW5nXCI9PXR5cGVvZiBlP1tdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlKSkuZmlsdGVyKHQpOltdfWNhdGNoKGUpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgcHJvdmlkZWQgc2VsZWN0b3IgaXMgaW52YWxpZC5cXG5FeHBlY3RzIGEgQ1NTIHNlbGVjdG9yLCBhIE5vZGUgZWxlbWVudCwgYSBOb2RlTGlzdCBvciBhbiBhcnJheS5cXG5TZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmFuY29pc2NoYWxpZm91ci9tZWRpdW0tem9vbVwiKX19LHI9ZnVuY3Rpb24oZSl7dmFyIHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gdC5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20tb3ZlcmxheVwiKSx0LnN0eWxlLmJhY2tncm91bmQ9ZSx0fSxkPWZ1bmN0aW9uKGUpe3ZhciB0PWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbz10LnRvcCxuPXQubGVmdCxpPXQud2lkdGgscj10LmhlaWdodCxkPWUuY2xvbmVOb2RlKCksbT13aW5kb3cucGFnZVlPZmZzZXR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B8fGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wfHwwLGE9d2luZG93LnBhZ2VYT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0fHwwO3JldHVybiBkLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpLGQuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLGQuc3R5bGUudG9wPW8rbStcInB4XCIsZC5zdHlsZS5sZWZ0PW4rYStcInB4XCIsZC5zdHlsZS53aWR0aD1pK1wicHhcIixkLnN0eWxlLmhlaWdodD1yK1wicHhcIixkLnN0eWxlLnRyYW5zZm9ybT1cIlwiLGR9LG09ZnVuY3Rpb24odCxvKXt2YXIgbj1lKHtidWJibGVzOiExLGNhbmNlbGFibGU6ITEsZGV0YWlsOnZvaWQgMH0sbyk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50KXJldHVybiBuZXcgQ3VzdG9tRXZlbnQodCxuKTt2YXIgaT1kb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO3JldHVybiBpLmluaXRDdXN0b21FdmVudCh0LG4uYnViYmxlcyxuLmNhbmNlbGFibGUsbi5kZXRhaWwpLGl9O3JldHVybiBmdW5jdGlvbihlLHQpe3ZvaWQgMD09PXQmJih0PXt9KTt2YXIgbz10Lmluc2VydEF0O2lmKGUmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBkb2N1bWVudCl7dmFyIG49ZG9jdW1lbnQuaGVhZHx8ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO2kudHlwZT1cInRleHQvY3NzXCIsXCJ0b3BcIj09PW8mJm4uZmlyc3RDaGlsZD9uLmluc2VydEJlZm9yZShpLG4uZmlyc3RDaGlsZCk6bi5hcHBlbmRDaGlsZChpKSxpLnN0eWxlU2hlZXQ/aS5zdHlsZVNoZWV0LmNzc1RleHQ9ZTppLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGUpKX19KFwiLm1lZGl1bS16b29tLW92ZXJsYXl7cG9zaXRpb246Zml4ZWQ7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtsZWZ0OjA7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAuM3M7d2lsbC1jaGFuZ2U6b3BhY2l0eX0ubWVkaXVtLXpvb20tLW9wZW5lZCAubWVkaXVtLXpvb20tb3ZlcmxheXtjdXJzb3I6cG9pbnRlcjtjdXJzb3I6em9vbS1vdXQ7b3BhY2l0eToxfS5tZWRpdW0tem9vbS1pbWFnZXtjdXJzb3I6cG9pbnRlcjtjdXJzb3I6em9vbS1pbjt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MgY3ViaWMtYmV6aWVyKC4yLDAsLjIsMSkhaW1wb3J0YW50fS5tZWRpdW0tem9vbS1pbWFnZS0taGlkZGVue3Zpc2liaWxpdHk6aGlkZGVufS5tZWRpdW0tem9vbS1pbWFnZS0tb3BlbmVke3Bvc2l0aW9uOnJlbGF0aXZlO2N1cnNvcjpwb2ludGVyO2N1cnNvcjp6b29tLW91dDt3aWxsLWNoYW5nZTp0cmFuc2Zvcm19XCIpLGZ1bmN0aW9uIHQoYSl7dmFyIGw9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LGM9d2luZG93LlByb21pc2V8fGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoKXt9ZSh0LHQpfSx1PWZ1bmN0aW9uKGUpe3ZhciB0PWUudGFyZ2V0O3QhPT1OPy0xIT09Ty5pbmRleE9mKHQpJiZ3KHt0YXJnZXQ6dH0pOkUoKX0scz1mdW5jdGlvbigpe2lmKCFBJiZULm9yaWdpbmFsKXt2YXIgZT13aW5kb3cucGFnZVlPZmZzZXR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B8fGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wfHwwO01hdGguYWJzKGstZSk+Uy5zY3JvbGxPZmZzZXQmJnNldFRpbWVvdXQoRSwxNTApfX0sZj1mdW5jdGlvbihlKXt2YXIgdD1lLmtleXx8ZS5rZXlDb2RlO1wiRXNjYXBlXCIhPT10JiZcIkVzY1wiIT09dCYmMjchPT10fHxFKCl9LHA9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sbj10O2lmKHQuYmFja2dyb3VuZCYmKE4uc3R5bGUuYmFja2dyb3VuZD10LmJhY2tncm91bmQpLHQuY29udGFpbmVyJiZ0LmNvbnRhaW5lciBpbnN0YW5jZW9mIE9iamVjdCYmKG4uY29udGFpbmVyPWUoe30sUy5jb250YWluZXIsdC5jb250YWluZXIpKSx0LnRlbXBsYXRlKXt2YXIgaT1vKHQudGVtcGxhdGUpP3QudGVtcGxhdGU6ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0LnRlbXBsYXRlKTtuLnRlbXBsYXRlPWl9cmV0dXJuIFM9ZSh7fSxTLG4pLE8uZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5kaXNwYXRjaEV2ZW50KG0oXCJtZWRpdW0tem9vbTp1cGRhdGVcIix7ZGV0YWlsOnt6b29tOmp9fSkpfSkpLGp9LGc9ZnVuY3Rpb24oKXt2YXIgbz1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e307cmV0dXJuIHQoZSh7fSxTLG8pKX0sdj1mdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9QXJyYXkoZSksbz0wO288ZTtvKyspdFtvXT1hcmd1bWVudHNbb107dmFyIG49dC5yZWR1Y2UoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuW10uY29uY2F0KGUsaSh0KSl9KSxbXSk7cmV0dXJuIG4uZmlsdGVyKChmdW5jdGlvbihlKXtyZXR1cm4tMT09PU8uaW5kZXhPZihlKX0pKS5mb3JFYWNoKChmdW5jdGlvbihlKXtPLnB1c2goZSksZS5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2VcIil9KSkseC5mb3JFYWNoKChmdW5jdGlvbihlKXt2YXIgdD1lLnR5cGUsbz1lLmxpc3RlbmVyLGk9ZS5vcHRpb25zO24uZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5hZGRFdmVudExpc3RlbmVyKHQsbyxpKX0pKX0pKSxqfSxoPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1BcnJheShlKSxvPTA7bzxlO28rKyl0W29dPWFyZ3VtZW50c1tvXTtULnpvb21lZCYmRSgpO3ZhciBuPXQubGVuZ3RoPjA/dC5yZWR1Y2UoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuW10uY29uY2F0KGUsaSh0KSl9KSxbXSk6TztyZXR1cm4gbi5mb3JFYWNoKChmdW5jdGlvbihlKXtlLmNsYXNzTGlzdC5yZW1vdmUoXCJtZWRpdW0tem9vbS1pbWFnZVwiKSxlLmRpc3BhdGNoRXZlbnQobShcIm1lZGl1bS16b29tOmRldGFjaFwiLHtkZXRhaWw6e3pvb206an19KSl9KSksTz1PLmZpbHRlcigoZnVuY3Rpb24oZSl7cmV0dXJuLTE9PT1uLmluZGV4T2YoZSl9KSksan0sej1mdW5jdGlvbihlLHQpe3ZhciBvPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTp7fTtyZXR1cm4gTy5mb3JFYWNoKChmdW5jdGlvbihuKXtuLmFkZEV2ZW50TGlzdGVuZXIoXCJtZWRpdW0tem9vbTpcIitlLHQsbyl9KSkseC5wdXNoKHt0eXBlOlwibWVkaXVtLXpvb206XCIrZSxsaXN0ZW5lcjp0LG9wdGlvbnM6b30pLGp9LHk9ZnVuY3Rpb24oZSx0KXt2YXIgbz1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06e307cmV0dXJuIE8uZm9yRWFjaCgoZnVuY3Rpb24obil7bi5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVkaXVtLXpvb206XCIrZSx0LG8pfSkpLHg9eC5maWx0ZXIoKGZ1bmN0aW9uKG8pe3JldHVybiEoby50eXBlPT09XCJtZWRpdW0tem9vbTpcIitlJiZvLmxpc3RlbmVyLnRvU3RyaW5nKCk9PT10LnRvU3RyaW5nKCkpfSkpLGp9LGI9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30saT10LnRhcmdldCxyPWZ1bmN0aW9uKCl7dmFyIHQ9e3dpZHRoOmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxoZWlnaHQ6ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxsZWZ0OjAsdG9wOjAscmlnaHQ6MCxib3R0b206MH0saT12b2lkIDAscj12b2lkIDA7aWYoUy5jb250YWluZXIpaWYoUy5jb250YWluZXIgaW5zdGFuY2VvZiBPYmplY3QpaT0odD1lKHt9LHQsUy5jb250YWluZXIpKS53aWR0aC10LmxlZnQtdC5yaWdodC0yKlMubWFyZ2luLHI9dC5oZWlnaHQtdC50b3AtdC5ib3R0b20tMipTLm1hcmdpbjtlbHNle3ZhciBkPShvKFMuY29udGFpbmVyKT9TLmNvbnRhaW5lcjpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFMuY29udGFpbmVyKSkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbT1kLndpZHRoLGE9ZC5oZWlnaHQsbD1kLmxlZnQsYz1kLnRvcDt0PWUoe30sdCx7d2lkdGg6bSxoZWlnaHQ6YSxsZWZ0OmwsdG9wOmN9KX1pPWl8fHQud2lkdGgtMipTLm1hcmdpbixyPXJ8fHQuaGVpZ2h0LTIqUy5tYXJnaW47dmFyIHU9VC56b29tZWRIZHx8VC5vcmlnaW5hbCxzPW4odSk/aTp1Lm5hdHVyYWxXaWR0aHx8aSxmPW4odSk/cjp1Lm5hdHVyYWxIZWlnaHR8fHIscD11LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGc9cC50b3Asdj1wLmxlZnQsaD1wLndpZHRoLHo9cC5oZWlnaHQseT1NYXRoLm1pbihzLGkpL2gsYj1NYXRoLm1pbihmLHIpL3osRT1NYXRoLm1pbih5LGIpLHc9XCJzY2FsZShcIitFK1wiKSB0cmFuc2xhdGUzZChcIisoKGktaCkvMi12K1MubWFyZ2luK3QubGVmdCkvRStcInB4LCBcIisoKHIteikvMi1nK1MubWFyZ2luK3QudG9wKS9FK1wicHgsIDApXCI7VC56b29tZWQuc3R5bGUudHJhbnNmb3JtPXcsVC56b29tZWRIZCYmKFQuem9vbWVkSGQuc3R5bGUudHJhbnNmb3JtPXcpfTtyZXR1cm4gbmV3IGMoKGZ1bmN0aW9uKGUpe2lmKGkmJi0xPT09Ty5pbmRleE9mKGkpKWUoaik7ZWxzZXtpZihULnpvb21lZCllKGopO2Vsc2V7aWYoaSlULm9yaWdpbmFsPWk7ZWxzZXtpZighKE8ubGVuZ3RoPjApKXJldHVybiB2b2lkIGUoaik7dmFyIHQ9TztULm9yaWdpbmFsPXRbMF19aWYoVC5vcmlnaW5hbC5kaXNwYXRjaEV2ZW50KG0oXCJtZWRpdW0tem9vbTpvcGVuXCIse2RldGFpbDp7em9vbTpqfX0pKSxrPXdpbmRvdy5wYWdlWU9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3B8fDAsQT0hMCxULnpvb21lZD1kKFQub3JpZ2luYWwpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoTiksUy50ZW1wbGF0ZSl7dmFyIG49byhTLnRlbXBsYXRlKT9TLnRlbXBsYXRlOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoUy50ZW1wbGF0ZSk7VC50ZW1wbGF0ZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFQudGVtcGxhdGUuYXBwZW5kQ2hpbGQobi5jb250ZW50LmNsb25lTm9kZSghMCkpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoVC50ZW1wbGF0ZSl9aWYoZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChULnpvb21lZCksd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS0tb3BlbmVkXCIpfSkpLFQub3JpZ2luYWwuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1oaWRkZW5cIiksVC56b29tZWQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksVC56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsRSksVC56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwoZnVuY3Rpb24gdCgpe0E9ITEsVC56b29tZWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIix0KSxULm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQobShcIm1lZGl1bS16b29tOm9wZW5lZFwiLHtkZXRhaWw6e3pvb206an19KSksZShqKX0pKSxULm9yaWdpbmFsLmdldEF0dHJpYnV0ZShcImRhdGEtem9vbS1zcmNcIikpe1Quem9vbWVkSGQ9VC56b29tZWQuY2xvbmVOb2RlKCksVC56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNzZXRcIiksVC56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzaXplc1wiKSxULnpvb21lZEhkLnNyYz1ULnpvb21lZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXpvb20tc3JjXCIpLFQuem9vbWVkSGQub25lcnJvcj1mdW5jdGlvbigpe2NsZWFySW50ZXJ2YWwoYSksY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHJlYWNoIHRoZSB6b29tIGltYWdlIHRhcmdldCBcIitULnpvb21lZEhkLnNyYyksVC56b29tZWRIZD1udWxsLHIoKX07dmFyIGE9c2V0SW50ZXJ2YWwoKGZ1bmN0aW9uKCl7VC56b29tZWRIZC5jb21wbGV0ZSYmKGNsZWFySW50ZXJ2YWwoYSksVC56b29tZWRIZC5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZFwiKSxULnpvb21lZEhkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLEUpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoVC56b29tZWRIZCkscigpKX0pLDEwKX1lbHNlIGlmKFQub3JpZ2luYWwuaGFzQXR0cmlidXRlKFwic3Jjc2V0XCIpKXtULnpvb21lZEhkPVQuem9vbWVkLmNsb25lTm9kZSgpLFQuem9vbWVkSGQucmVtb3ZlQXR0cmlidXRlKFwic2l6ZXNcIiksVC56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJsb2FkaW5nXCIpO3ZhciBsPVQuem9vbWVkSGQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwoZnVuY3Rpb24oKXtULnpvb21lZEhkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsbCksVC56b29tZWRIZC5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZFwiKSxULnpvb21lZEhkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLEUpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoVC56b29tZWRIZCkscigpfSkpfWVsc2UgcigpfX19KSl9LEU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGMoKGZ1bmN0aW9uKGUpe2lmKCFBJiZULm9yaWdpbmFsKXtBPSEwLGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLS1vcGVuZWRcIiksVC56b29tZWQuc3R5bGUudHJhbnNmb3JtPVwiXCIsVC56b29tZWRIZCYmKFQuem9vbWVkSGQuc3R5bGUudHJhbnNmb3JtPVwiXCIpLFQudGVtcGxhdGUmJihULnRlbXBsYXRlLnN0eWxlLnRyYW5zaXRpb249XCJvcGFjaXR5IDE1MG1zXCIsVC50ZW1wbGF0ZS5zdHlsZS5vcGFjaXR5PTApLFQub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChtKFwibWVkaXVtLXpvb206Y2xvc2VcIix7ZGV0YWlsOnt6b29tOmp9fSkpLFQuem9vbWVkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsKGZ1bmN0aW9uIHQoKXtULm9yaWdpbmFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtZWRpdW0tem9vbS1pbWFnZS0taGlkZGVuXCIpLGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoVC56b29tZWQpLFQuem9vbWVkSGQmJmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoVC56b29tZWRIZCksZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChOKSxULnpvb21lZC5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZFwiKSxULnRlbXBsYXRlJiZkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKFQudGVtcGxhdGUpLEE9ITEsVC56b29tZWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIix0KSxULm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQobShcIm1lZGl1bS16b29tOmNsb3NlZFwiLHtkZXRhaWw6e3pvb206an19KSksVC5vcmlnaW5hbD1udWxsLFQuem9vbWVkPW51bGwsVC56b29tZWRIZD1udWxsLFQudGVtcGxhdGU9bnVsbCxlKGopfSkpfWVsc2UgZShqKX0pKX0sdz1mdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSx0PWUudGFyZ2V0O3JldHVybiBULm9yaWdpbmFsP0UoKTpiKHt0YXJnZXQ6dH0pfSxMPWZ1bmN0aW9uKCl7cmV0dXJuIFN9LEg9ZnVuY3Rpb24oKXtyZXR1cm4gT30sQz1mdW5jdGlvbigpe3JldHVybiBULm9yaWdpbmFsfSxPPVtdLHg9W10sQT0hMSxrPTAsUz1sLFQ9e29yaWdpbmFsOm51bGwsem9vbWVkOm51bGwsem9vbWVkSGQ6bnVsbCx0ZW1wbGF0ZTpudWxsfTtcIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpP1M9YTooYXx8XCJzdHJpbmdcIj09dHlwZW9mIGEpJiZ2KGEpLFM9ZSh7bWFyZ2luOjAsYmFja2dyb3VuZDpcIiNmZmZcIixzY3JvbGxPZmZzZXQ6NDAsY29udGFpbmVyOm51bGwsdGVtcGxhdGU6bnVsbH0sUyk7dmFyIE49cihTLmJhY2tncm91bmQpO2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHUpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLGYpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixzKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLEUpO3ZhciBqPXtvcGVuOmIsY2xvc2U6RSx0b2dnbGU6dyx1cGRhdGU6cCxjbG9uZTpnLGF0dGFjaDp2LGRldGFjaDpoLG9uOnosb2ZmOnksZ2V0T3B0aW9uczpMLGdldEltYWdlczpILGdldFpvb21lZEltYWdlOkN9O3JldHVybiBqfX0pKTtcbiIsIi8qIGdsb2JhbCBsb2NhbFN0b3JhZ2UgICovXHJcbmltcG9ydCBnZXRBbGwgZnJvbSAnLi9nZXQtYWxsJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZWwgPT4ge1xyXG4gIGNvbnN0IHRvZ2dsZVRoZW1lID0gZ2V0QWxsKGVsKVxyXG5cclxuICBpZiAoIXRvZ2dsZVRoZW1lLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcclxuXHJcbiAgdG9nZ2xlVGhlbWUuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICBpZiAoIWh0bWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrJykpIHtcclxuICAgICAgaHRtbC5jbGFzc0xpc3QuYWRkKCdkYXJrJylcclxuICAgICAgbG9jYWxTdG9yYWdlLnRoZW1lID0gJ2RhcmsnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBodG1sLmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKVxyXG4gICAgICBsb2NhbFN0b3JhZ2UudGhlbWUgPSAnbGlnaHQnXHJcbiAgICB9XHJcbiAgfSkpXHJcbn1cclxuIiwiaW1wb3J0IGdldEFsbCBmcm9tICcuL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoZHJvcGRvd25zQm94cykgPT4ge1xyXG4gIGNvbnN0IGRyb3Bkb3ducyA9IGdldEFsbChkcm9wZG93bnNCb3hzKVxyXG5cclxuICBpZiAoIWRyb3Bkb3ducy5sZW5ndGgpIHJldHVyblxyXG5cclxuICBkcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLW1lbnUnKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBjb25zdCBjbG9zZURyb3Bkb3ducyA9ICgpID0+IGRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcclxuICB9KVxyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlRHJvcGRvd25zKVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGNvbnN0IHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnRcclxuXHJcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgMClcclxufVxyXG4iLCIvLyBodHRwczovL3d3dy5qYXZhc2NyaXB0dHV0b3JpYWwubmV0L2phdmFzY3JpcHQtZG9tL2phdmFzY3JpcHQtc2Nyb2xsLWV2ZW50cy9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IChjb3ZlckNsYXNzLCBoZWFkVHJhbnNwYXJlbnQpID0+IHtcclxuICBjb25zdCBkb21Cb2R5ID0gZG9jdW1lbnQuYm9keVxyXG4gIGNvbnN0IGhhc0NvdmVyID0gZG9tQm9keS5jbG9zZXN0KGNvdmVyQ2xhc3MpXHJcbiAgY29uc3QgJGpzSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWhlYWRlcicpXHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBsYXN0U2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZXHJcblxyXG4gICAgaWYgKGxhc3RTY3JvbGxZID4gNSkge1xyXG4gICAgICAkanNIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2hhZG93LWhlYWRlcicsICdoZWFkZXItYmcnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGpzSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWRvdy1oZWFkZXInLCAnaGVhZGVyLWJnJylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWhhc0NvdmVyKSByZXR1cm5cclxuXHJcbiAgICBsYXN0U2Nyb2xsWSA+PSAyMCA/IGRvbUJvZHkuY2xhc3NMaXN0LnJlbW92ZShoZWFkVHJhbnNwYXJlbnQpIDogZG9tQm9keS5jbGFzc0xpc3QuYWRkKGhlYWRUcmFuc3BhcmVudClcclxuICAgIGNvbnNvbGUubG9nKCdqb2RlcicpXHJcbiAgfSwgeyBwYXNzaXZlOiB0cnVlIH0pXHJcbn1cclxuXHJcbi8vIGNvbnN0IHNjcm9sbEZ1bmN0aW9uID0gKCkgPT4ge1xyXG4vLyAgIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDUgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA+IDUpIHtcclxuLy8gICAgICRqc0hlYWRlci5jbGFzc0xpc3QuYWRkKCdzaGFkb3ctaGVhZGVyJywgJ2hlYWRlci1iZycpXHJcbi8vICAgfSBlbHNlIHtcclxuLy8gICAgICRqc0hlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzaGFkb3ctaGVhZGVyJywgJ2hlYWRlci1iZycpXHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG4vLyB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgc2Nyb2xsRnVuY3Rpb24oKVxyXG4vLyB9XHJcbiIsImltcG9ydCB1cmxSZWdleHAgZnJvbSAnLi4vY29tcG9uZW50cy91cmwtcmVndWxhci1leHByZXNzaW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKG1lbnVEcm9wRG93biwgYm94KSA9PiB7XHJcbiAgLy8gY2hlY2sgaWYgdGhlIGJveCBmb3IgdGhlIG1lbnUgZXhpc3RzXHJcbiAgY29uc3QgbmV3Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihib3gpXHJcblxyXG4gIC8qXHJcbiAgICB2YXIgbWVudURyb3Bkb3duID0ge1xyXG4gICAgICAnU2lkZWJhcic6ICdodHRwOi8vLi4uJyxcclxuICAgICAgJ0ZlYXR1cmVkJzogJ2h0dHA6Ly8uLi4nXHJcbiAgICB9XHJcbiAgKi9cclxuXHJcbiAgaWYgKCFuZXdib3gpIHJldHVyblxyXG5cclxuICBPYmplY3QuZW50cmllcyhtZW51RHJvcERvd24pLmZvckVhY2goKFtuYW1lLCB1cmxdKSA9PiB7XHJcbiAgICBpZiAobmFtZSAhPT0gJ3N0cmluZycgJiYgIXVybFJlZ2V4cCh1cmwpKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXHJcbiAgICBsaW5rLmhyZWYgPSB1cmxcclxuICAgIGxpbmsuY2xhc3NMaXN0ID0gJ2Ryb3Bkb3duLWl0ZW0gYmxvY2sgcHktMiBsZWFkaW5nLXRpZ2h0IHB4LTUgaG92ZXI6dGV4dC1wcmltYXJ5J1xyXG4gICAgbGluay5pbm5lclRleHQgPSBuYW1lXHJcbiAgICAvLyBsaW5rLmlubmVySFRNTCA9IGA8YSBocmVmPVwiJHt1cmx9XCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtIGhvdmVyOnRleHQtcHJpbWFyeVwiPiR7bmFtZX08L2E+YFxyXG5cclxuICAgIG5ld2JveC5hcHBlbmRDaGlsZChsaW5rKVxyXG4gIH0pXHJcbn1cclxuIiwiLy8gaW1wb3J0IHsgdXJsUmVnZXhwIH0gZnJvbSAnLi9hcHAudmFyaWFibGVzJ1xuaW1wb3J0IHVybFJlZ2V4cCBmcm9tICcuLi9jb21wb25lbnRzL3VybC1yZWd1bGFyLWV4cHJlc3Npb24nXG5pbXBvcnQgZ2V0QWxsIGZyb20gJy4vZ2V0LWFsbCdcblxuZXhwb3J0IGRlZmF1bHQgKHNvY2lhbE1lZGlhRGF0YSwgYm94U2VsZWN0b3IpID0+IHtcbiAgLy8gY2hlY2sgaWYgdGhlIGJveCBmb3IgdGhlIG1lbnUgZXhpc3RzXG4gIGNvbnN0IG5vZGVCb3ggPSBnZXRBbGwoYm94U2VsZWN0b3IpXG5cbiAgaWYgKCFub2RlQm94Lmxlbmd0aCkgcmV0dXJuXG5cbiAgY29uc3QgY3JlYXRlRWxlbWVudCA9IGVsZW1lbnQgPT4ge1xuICAgIE9iamVjdC5lbnRyaWVzKHNvY2lhbE1lZGlhRGF0YSkuZm9yRWFjaCgoW25hbWUsIHVybFRpdGxlXSkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gdXJsVGl0bGVbMF1cblxuICAgICAgLy8gVGhlIHVybCBpcyBiZWluZyB2YWxpZGF0ZWQgaWYgaXQgaXMgZmFsc2UgaXQgcmV0dXJuc1xuICAgICAgaWYgKCF1cmxSZWdleHAodXJsKSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgIGxpbmsuaHJlZiA9IHVybFxuICAgICAgbGluay50aXRsZSA9IHVybFRpdGxlWzFdXG4gICAgICBsaW5rLmNsYXNzTGlzdCA9ICdwLTIgaW5saW5lLWJsb2NrIGhvdmVyOm9wYWNpdHktNzAnXG4gICAgICBsaW5rLnRhcmdldCA9ICdfYmxhbmsnXG4gICAgICBsaW5rLnJlbCA9ICdub29wZW5lciBub3JlZmVycmVyJ1xuICAgICAgbGluay5pbm5lckhUTUwgPSBgPHN2ZyBjbGFzcz1cImljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi0ke25hbWV9XCI+PC91c2U+PC9zdmc+YFxuXG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmspXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBub2RlQm94LmZvckVhY2goY3JlYXRlRWxlbWVudClcbn1cbiIsImV4cG9ydCBkZWZhdWx0IChzcmMsIGNhbGxiYWNrKSA9PiB7XHJcbiAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXHJcbiAgc2NyaXB0RWxlbWVudC5zcmMgPSBzcmNcclxuICBzY3JpcHRFbGVtZW50LmRlZmVyID0gdHJ1ZVxyXG4gIHNjcmlwdEVsZW1lbnQuYXN5bmMgPSB0cnVlXHJcblxyXG4gIGNhbGxiYWNrICYmIHNjcmlwdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNhbGxiYWNrKVxyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudClcclxufVxyXG4iLCJpbXBvcnQgbWVkaXVtWm9vbSBmcm9tICdtZWRpdW0tem9vbSdcclxuXHJcbmltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbWcgPT4ge1xyXG4gIGdldEFsbChpbWcpLmZvckVhY2goZWwgPT4gIWVsLmNsb3Nlc3QoJ2EnKSAmJiBlbC5jbGFzc0xpc3QuYWRkKCdzaW1wbHktem9vbScpKVxyXG5cclxuICBtZWRpdW1ab29tKCcuc2ltcGx5LXpvb20nLCB7XHJcbiAgICBtYXJnaW46IDIwLFxyXG4gICAgYmFja2dyb3VuZDogJ2hzbGEoMCwwJSwxMDAlLC44NSknXHJcbiAgfSlcclxufVxyXG4iLCIvLyBNb29kYWxcclxuXHJcbmltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCAobW9kYWwsIG1vZGFsQnV0dG9uLCBtb2RhbENsb3NlLCBpc0FjdGl2ZSkgPT4ge1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxyXG4gIGNvbnN0ICRtb2RhbHMgPSBnZXRBbGwobW9kYWwpXHJcbiAgY29uc3QgJG1vZGFsQnV0dG9ucyA9IGdldEFsbChtb2RhbEJ1dHRvbilcclxuICBjb25zdCAkbW9kYWxDbG9zZXMgPSBnZXRBbGwobW9kYWxDbG9zZSlcclxuXHJcbiAgLy8gTW9kYWwgQ2xpY2sgT3BlblxyXG4gIGlmICghJG1vZGFsQnV0dG9ucy5sZW5ndGgpIHJldHVyblxyXG4gICRtb2RhbEJ1dHRvbnMuZm9yRWFjaCgkZWwgPT4gJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3Blbk1vZGFsKCRlbC5kYXRhc2V0LnRhcmdldCkpKVxyXG5cclxuICAvLyBNb2RhbCBDbGljayBDbG9zZVxyXG4gIGlmICghJG1vZGFsQ2xvc2VzLmxlbmd0aCkgcmV0dXJuXHJcbiAgJG1vZGFsQ2xvc2VzLmZvckVhY2goZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZU1vZGFscygpKSlcclxuXHJcbiAgY29uc3Qgb3Blbk1vZGFsID0gdGFyZ2V0ID0+IHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLW1lbnUnKVxyXG4gICAgY29uc3QgJHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldClcclxuICAgIHJvb3RFbC5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy1oaWRkZW4nKVxyXG4gICAgJHRhcmdldC5jbGFzc0xpc3QuYWRkKGlzQWN0aXZlKVxyXG5cclxuICAgIGlmICh0YXJnZXQgPT09ICdtb2RhbC1zZWFyY2gnKSB7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtZmllbGQnKS5mb2N1cygpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbG9zZU1vZGFscyA9ICgpID0+IHtcclxuICAgIHJvb3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKVxyXG4gICAgJG1vZGFscy5mb3JFYWNoKCRlbCA9PiAkZWwuY2xhc3NMaXN0LnJlbW92ZShpc0FjdGl2ZSkpXHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBjb25zdCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICBjbG9zZU1vZGFscygpXHJcbiAgICAgIC8vIGNsb3NlRHJvcGRvd25zKClcclxuICAgIH1cclxuICB9KVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IHVybCA9PiAvXihodHRwcz86XFwvXFwvKT8oW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkoW1xcL1xcdyBcXCtcXC4tXSopKlxcLz8kLy50ZXN0KHVybCkgLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnLi4vYXBwL2dldC1hbGwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgLyogSWZyYW1lIFNSQyB2aWRlbyAqL1xyXG4gIGNvbnN0IHNlbGVjdG9ycyA9IFtcclxuICAgICdpZnJhbWVbc3JjKj1cInBsYXllci52aW1lby5jb21cIl0nLFxyXG4gICAgJ2lmcmFtZVtzcmMqPVwiZGFpbHltb3Rpb24uY29tXCJdJyxcclxuICAgICdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcclxuICAgICdpZnJhbWVbc3JjKj1cInlvdXR1YmUtbm9jb29raWUuY29tXCJdJyxcclxuICAgICdpZnJhbWVbc3JjKj1cInBsYXllci50d2l0Y2gudHZcIl0nLFxyXG4gICAgJ2lmcmFtZVtzcmMqPVwia2lja3N0YXJ0ZXIuY29tXCJdW3NyYyo9XCJ2aWRlby5odG1sXCJdJ1xyXG4gIF1cclxuXHJcbiAgY29uc3QgaWZyYW1lcyA9IGdldEFsbChzZWxlY3RvcnMuam9pbignLCcpKVxyXG5cclxuICBpZiAoIWlmcmFtZXMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgaWZyYW1lcy5mb3JFYWNoKGVsID0+IHtcclxuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2FzcGVjdC12aWRlbycsICd3LWZ1bGwnKVxyXG4gICAgLy8gY29uc3QgcGFyZW50Rm9yVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgLy8gcGFyZW50Rm9yVmlkZW8uY2xhc3NOYW1lID0gJ3ZpZGVvLXJlc3BvbnNpdmUnXHJcbiAgICAvLyBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwYXJlbnRGb3JWaWRlbywgZWwpXHJcbiAgICAvLyBwYXJlbnRGb3JWaWRlby5hcHBlbmRDaGlsZChlbClcclxuICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0JylcclxuICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnd2lkdGgnKVxyXG4gIH0pXHJcbn1cclxuIiwiLyogZ2xvYmFsIHByaXNtSnMgZm9sbG93U29jaWFsTWVkaWEgbWVudURyb3Bkb3duIHNpdGVTZWFyY2ggKi9cclxuXHJcbi8vIGxpYlxyXG5pbXBvcnQgJ2xhenlzaXplcydcclxuXHJcbmltcG9ydCBsb2FkU2NyaXB0IGZyb20gJy4vY29tcG9uZW50cy9sb2FkLXNjcmlwdCdcclxuaW1wb3J0IHZpZGVvUmVzcG9uc2l2ZSBmcm9tICcuL2NvbXBvbmVudHMvdmlkZW8tcmVzcG9uc2l2ZSdcclxuLy8gaW1wb3J0IHJlc2l6ZUltYWdlc0luR2FsbGVyaWVzIGZyb20gJy4vY29tcG9uZW50cy9yZXNpemUtaW1hZ2VzLWdhbGxlcmllcydcclxuaW1wb3J0IG1lZGl1bVpvb21JbWcgZnJvbSAnLi9jb21wb25lbnRzL21lZGl1bS16b29tJ1xyXG5pbXBvcnQgc2ltcGx5TW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJ1xyXG5cclxuaW1wb3J0IGRyb3BEb3duTWVudSBmcm9tICcuL2FwcC9tZW51LWRyb3AtZG93bidcclxuaW1wb3J0IHNvY2lhbE1lZGlhIGZyb20gJy4vYXBwL3NvbmNpYWwtbWVkaWEnXHJcbmltcG9ydCBoZWFkZXJUcmFuc3BhcmVuY3kgZnJvbSAnLi9hcHAvaGVhZGVyLXRyYW5zcGFyZW5jeSdcclxuaW1wb3J0IGRhcmtNb2RlIGZyb20gJy4vYXBwL2RhcmstbW9kZSdcclxuaW1wb3J0IGRyb3Bkb3duVG9nZ2xlIGZyb20gJy4vYXBwL2Ryb3Bkb3duLXRvZ2dsZSdcclxuXHJcbmNvbnN0IHNpbXBseVNldHVwID0gKCkgPT4ge1xyXG4gIC8qIE1lbnUgRHJvcERvd25cclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgaWYgKHR5cGVvZiBtZW51RHJvcGRvd24gPT09ICdvYmplY3QnICYmIG1lbnVEcm9wZG93biAhPT0gbnVsbCkge1xyXG4gICAgZHJvcERvd25NZW51KG1lbnVEcm9wZG93biwgJy5qcy1kcm9wZG93bi1tZW51JylcclxuICB9XHJcblxyXG4gIC8qIFNvY2lhbCBNZWRpYVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBpZiAodHlwZW9mIGZvbGxvd1NvY2lhbE1lZGlhID09PSAnb2JqZWN0JyAmJiBmb2xsb3dTb2NpYWxNZWRpYSAhPT0gbnVsbCkge1xyXG4gICAgc29jaWFsTWVkaWEoZm9sbG93U29jaWFsTWVkaWEsICcuanMtc29jaWFsLW1lZGlhJylcclxuICB9XHJcblxyXG4gIC8qICBUb2dnbGUgbW9kYWxcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgc2ltcGx5TW9kYWwoJy5qcy1tb2RhbCcsICcuanMtbW9kYWwtYnV0dG9uJywgJy5qcy1tb2RhbC1jbG9zZScsICdpcy1hY3RpdmUnKVxyXG5cclxuICAvKiBUb2dnbGUgTWVudVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudS10b2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnaGFzLW1lbnUnKVxyXG4gIH0pXHJcblxyXG4gIC8qIEhlYWRlciBUcmFuc3BhcmVuY3lcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgaGVhZGVyVHJhbnNwYXJlbmN5KCcuaGFzLWNvdmVyJywgJ2lzLWhlYWQtdHJhbnNwYXJlbnQnKVxyXG5cclxuICAvKiBEYXJrIE1vZGVcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgZGFya01vZGUoJy5qcy1kYXJrLW1vZGUnKVxyXG5cclxuICAvKiBBbGwgVmlkZW8gUmVzcG9uc2l2ZVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICB2aWRlb1Jlc3BvbnNpdmUoKVxyXG5cclxuICAvKiBHYWxsZXJ5IENhcmRcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgLy8gcmVzaXplSW1hZ2VzSW5HYWxsZXJpZXMoKVxyXG5cclxuICAvKiBtZWRpdW0tem9vbVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBtZWRpdW1ab29tSW1nKCcucG9zdC1ib2R5IGltZycpXHJcblxyXG4gIC8qIERyb3BEb3duIFRvZ2dsZVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBkcm9wZG93blRvZ2dsZSgnLmRyb3Bkb3duOm5vdCguaXMtaG92ZXJhYmxlKScpXHJcblxyXG4gIC8qIGhpZ2hsaWdodCBwcmlzbWpzXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlW2NsYXNzKj1sYW5ndWFnZS1dJykubGVuZ3RoICYmIHR5cGVvZiBwcmlzbUpzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgbG9hZFNjcmlwdChwcmlzbUpzKVxyXG4gIH1cclxuXHJcbiAgLyogTG9hZCBTZWFyY2hcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgaWYgKHR5cGVvZiBzZWFyY2hTZXR0aW5ncyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHNpdGVTZWFyY2ggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBsb2FkU2NyaXB0KHNpdGVTZWFyY2gpXHJcbiAgICAvLyBsb2FkU2NyaXB0KCdodHRwczovL3VucGtnLmNvbS9AdHJ5Z2hvc3QvY29udGVudC1hcGlAMS40LjkvdW1kL2NvbnRlbnQtYXBpLm1pbi5qcycsICgpID0+IHtcclxuICAgIC8vICAgbG9hZFNjcmlwdChzaXRlU2VhcmNoKVxyXG4gICAgLy8gfSlcclxuICB9XHJcblxyXG4gIC8vXHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzaW1wbHlTZXR1cClcclxuIl19

//# sourceMappingURL=map/main.js.map
