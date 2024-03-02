(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).mediumZoom=t()}(this,(function(){"use strict";var e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},t=function(e){return"IMG"===e.tagName},o=function(e){return e&&1===e.nodeType},n=function(e){return".svg"===(e.currentSrc||e.src).substr(-4).toLowerCase()},i=function(e){try{return Array.isArray(e)?e.filter(t):function(e){return NodeList.prototype.isPrototypeOf(e)}(e)?[].slice.call(e).filter(t):o(e)?[e].filter(t):"string"==typeof e?[].slice.call(document.querySelectorAll(e)).filter(t):[]}catch(e){throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom")}},r=function(e){var t=document.createElement("div");return t.classList.add("medium-zoom-overlay"),t.style.background=e,t},d=function(e){var t=e.getBoundingClientRect(),o=t.top,n=t.left,i=t.width,r=t.height,d=e.cloneNode(),a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,m=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return d.removeAttribute("id"),d.style.position="absolute",d.style.top=o+a+"px",d.style.left=n+m+"px",d.style.width=i+"px",d.style.height=r+"px",d.style.transform="",d},a=function(t,o){var n=e({bubbles:!1,cancelable:!1,detail:void 0},o);if("function"==typeof window.CustomEvent)return new CustomEvent(t,n);var i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),i};return function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===o&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}"),function t(m){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=window.Promise||function(e){function t(){}e(t,t)},u=function(e){var t=e.target;t!==N?-1!==x.indexOf(t)&&w({target:t}):E()},s=function(){if(!A&&k.original){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(S-e)>T.scrollOffset&&setTimeout(E,150)}},f=function(e){var t=e.key||e.keyCode;"Escape"!==t&&"Esc"!==t&&27!==t||E()},p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t;if(t.background&&(N.style.background=t.background),t.container&&t.container instanceof Object&&(n.container=e({},T.container,t.container)),t.template){var i=o(t.template)?t.template:document.querySelector(t.template);n.template=i}return T=e({},T,n),x.forEach((function(e){e.dispatchEvent(a("medium-zoom:update",{detail:{zoom:j}}))})),j},g=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t(e({},T,o))},v=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];var n=t.reduce((function(e,t){return[].concat(e,i(t))}),[]);return n.filter((function(e){return-1===x.indexOf(e)})).forEach((function(e){x.push(e),e.classList.add("medium-zoom-image")})),O.forEach((function(e){var t=e.type,o=e.listener,i=e.options;n.forEach((function(e){e.addEventListener(t,o,i)}))})),j},h=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];k.zoomed&&E();var n=t.length>0?t.reduce((function(e,t){return[].concat(e,i(t))}),[]):x;return n.forEach((function(e){e.classList.remove("medium-zoom-image"),e.dispatchEvent(a("medium-zoom:detach",{detail:{zoom:j}}))})),x=x.filter((function(e){return-1===n.indexOf(e)})),j},z=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return x.forEach((function(n){n.addEventListener("medium-zoom:"+e,t,o)})),O.push({type:"medium-zoom:"+e,listener:t,options:o}),j},y=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return x.forEach((function(n){n.removeEventListener("medium-zoom:"+e,t,o)})),O=O.filter((function(o){return!(o.type==="medium-zoom:"+e&&o.listener.toString()===t.toString())})),j},b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.target,r=function(){var t={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},i=void 0,r=void 0;if(T.container)if(T.container instanceof Object)i=(t=e({},t,T.container)).width-t.left-t.right-2*T.margin,r=t.height-t.top-t.bottom-2*T.margin;else{var d=(o(T.container)?T.container:document.querySelector(T.container)).getBoundingClientRect(),a=d.width,m=d.height,l=d.left,c=d.top;t=e({},t,{width:a,height:m,left:l,top:c})}i=i||t.width-2*T.margin,r=r||t.height-2*T.margin;var u=k.zoomedHd||k.original,s=n(u)?i:u.naturalWidth||i,f=n(u)?r:u.naturalHeight||r,p=u.getBoundingClientRect(),g=p.top,v=p.left,h=p.width,z=p.height,y=Math.min(Math.max(h,s),i)/h,b=Math.min(Math.max(z,f),r)/z,E=Math.min(y,b),w="scale("+E+") translate3d("+((i-h)/2-v+T.margin+t.left)/E+"px, "+((r-z)/2-g+T.margin+t.top)/E+"px, 0)";k.zoomed.style.transform=w,k.zoomedHd&&(k.zoomedHd.style.transform=w)};return new c((function(e){if(i&&-1===x.indexOf(i))e(j);else{if(k.zoomed)e(j);else{if(i)k.original=i;else{if(!(x.length>0))return void e(j);var t=x;k.original=t[0]}if(k.original.dispatchEvent(a("medium-zoom:open",{detail:{zoom:j}})),S=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,A=!0,k.zoomed=d(k.original),document.body.appendChild(N),T.template){var n=o(T.template)?T.template:document.querySelector(T.template);k.template=document.createElement("div"),k.template.appendChild(n.content.cloneNode(!0)),document.body.appendChild(k.template)}if(k.original.parentElement&&"PICTURE"===k.original.parentElement.tagName&&k.original.currentSrc&&(k.zoomed.src=k.original.currentSrc),document.body.appendChild(k.zoomed),window.requestAnimationFrame((function(){document.body.classList.add("medium-zoom--opened")})),k.original.classList.add("medium-zoom-image--hidden"),k.zoomed.classList.add("medium-zoom-image--opened"),k.zoomed.addEventListener("click",E),k.zoomed.addEventListener("transitionend",(function t(){A=!1,k.zoomed.removeEventListener("transitionend",t),k.original.dispatchEvent(a("medium-zoom:opened",{detail:{zoom:j}})),e(j)})),k.original.getAttribute("data-zoom-src")){k.zoomedHd=k.zoomed.cloneNode(),k.zoomedHd.removeAttribute("srcset"),k.zoomedHd.removeAttribute("sizes"),k.zoomedHd.removeAttribute("loading"),k.zoomedHd.src=k.zoomed.getAttribute("data-zoom-src"),k.zoomedHd.onerror=function(){clearInterval(m),console.warn("Unable to reach the zoom image target "+k.zoomedHd.src),k.zoomedHd=null,r()};var m=setInterval((function(){k.zoomedHd.complete&&(clearInterval(m),k.zoomedHd.classList.add("medium-zoom-image--opened"),k.zoomedHd.addEventListener("click",E),document.body.appendChild(k.zoomedHd),r())}),10)}else if(k.original.hasAttribute("srcset")){k.zoomedHd=k.zoomed.cloneNode(),k.zoomedHd.removeAttribute("sizes"),k.zoomedHd.removeAttribute("loading");var l=k.zoomedHd.addEventListener("load",(function(){k.zoomedHd.removeEventListener("load",l),k.zoomedHd.classList.add("medium-zoom-image--opened"),k.zoomedHd.addEventListener("click",E),document.body.appendChild(k.zoomedHd),r()}))}else r()}}}))},E=function(){return new c((function(e){if(!A&&k.original){A=!0,document.body.classList.remove("medium-zoom--opened"),k.zoomed.style.transform="",k.zoomedHd&&(k.zoomedHd.style.transform=""),k.template&&(k.template.style.transition="opacity 150ms",k.template.style.opacity=0),k.original.dispatchEvent(a("medium-zoom:close",{detail:{zoom:j}})),k.zoomed.addEventListener("transitionend",(function t(){k.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(k.zoomed),k.zoomedHd&&document.body.removeChild(k.zoomedHd),document.body.removeChild(N),k.zoomed.classList.remove("medium-zoom-image--opened"),k.template&&document.body.removeChild(k.template),A=!1,k.zoomed.removeEventListener("transitionend",t),k.original.dispatchEvent(a("medium-zoom:closed",{detail:{zoom:j}})),k.original=null,k.zoomed=null,k.zoomedHd=null,k.template=null,e(j)}))}else e(j)}))},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.target;return k.original?E():b({target:t})},L=function(){return T},H=function(){return x},C=function(){return k.original},x=[],O=[],A=!1,S=0,T=l,k={original:null,zoomed:null,zoomedHd:null,template:null};"[object Object]"===Object.prototype.toString.call(m)?T=m:(m||"string"==typeof m)&&v(m),T=e({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},T);var N=r(T.background);document.addEventListener("click",u),document.addEventListener("keyup",f),document.addEventListener("scroll",s),window.addEventListener("resize",E);var j={open:b,close:E,toggle:w,update:p,clone:g,attach:v,detach:h,on:z,off:y,getOptions:L,getImages:H,getZoomedImage:C};return j}}));

},{}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("lazysizes");
var _urlRegularExpression = _interopRequireDefault(require("./util/url-regular-expression"));
var _documentQuerySelectorAll = _interopRequireDefault(require("./util/document-query-selector-all"));
/* global followSocialMedia menuDropdown localStorage */

// lib

// import loadScript from './util/load-script'

const simplySetup = () => {
  const rootEl = document.documentElement;
  const documentBody = document.body;

  /* Menu DropDown
  /* ---------------------------------------------------------- */
  const dropDownMenu = () => {
    // Checking if the variable exists and if it is an object
    if (typeof menuDropdown !== 'object' || menuDropdown === null) return;

    // check if the box for the menu exists
    const $dropdownMenu = document.querySelector('.js-dropdown-menu');
    if (!$dropdownMenu) return;
    Object.entries(menuDropdown).forEach(_ref => {
      let [name, url] = _ref;
      if (name !== 'string' && !(0, _urlRegularExpression.default)(url)) return;
      const link = document.createElement('a');
      link.href = url;
      link.classList = 'dropdown-item block py-2 leading-tight px-5 hover:text-primary';
      link.innerText = name;
      $dropdownMenu.appendChild(link);
    });
  };
  dropDownMenu();

  /* Social Media
  /* ---------------------------------------------------------- */
  const socialMedia = () => {
    // Checking if the variable exists and if it is an object
    if (typeof followSocialMedia !== 'object' || followSocialMedia === null) return;

    // check if the box for the menu exists
    const $socialMedia = (0, _documentQuerySelectorAll.default)('.js-social-media');
    if (!$socialMedia.length) return;
    const linkElement = element => {
      Object.entries(followSocialMedia).forEach(_ref2 => {
        let [name, urlTitle] = _ref2;
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

},{"./util/document-query-selector-all":6,"./util/url-regular-expression":8,"@babel/runtime/helpers/interopRequireDefault":1,"lazysizes":2}],5:[function(require,module,exports){
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

},{"./main":4,"./util/document-query-selector-all":6,"./util/load-script":7,"@babel/runtime/helpers/interopRequireDefault":1,"medium-zoom":3}],6:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvbGF6eXNpemVzL2xhenlzaXplcy5qcyIsIm5vZGVfbW9kdWxlcy9tZWRpdW0tem9vbS9kaXN0L21lZGl1bS16b29tLm1pbi5qcyIsInNyYy9qcy9tYWluLmpzIiwic3JjL2pzL3Bvc3QuanMiLCJzcmMvanMvdXRpbC9kb2N1bWVudC1xdWVyeS1zZWxlY3Rvci1hbGwuanMiLCJzcmMvanMvdXRpbC9sb2FkLXNjcmlwdC5qcyIsInNyYy9qcy91dGlsL3VybC1yZWd1bGFyLWV4cHJlc3Npb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUVBOztFQUVBO0FBQ0Y7RUFDRSxJQUFJLElBQUEsaUNBQWMsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEVBQUU7SUFDckYsSUFBQSxtQkFBVSxFQUFDLE9BQU8sQ0FBQztFQUNyQjtBQUNGLENBQUM7QUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDOzs7Ozs7Ozs7aUNDckcxQyxTQUFBLFNBQUMsUUFBUTtFQUFBLElBQUUsTUFBTSxHQUFBLFNBQUEsQ0FBQSxNQUFBLFFBQUEsU0FBQSxRQUFBLFNBQUEsR0FBQSxTQUFBLE1BQUcsUUFBUTtFQUFBLE9BQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFBQTs7Ozs7Ozs7O2VDQWpHLENBQUMsR0FBRyxFQUFFLFFBQVEsS0FBSztFQUNoQyxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUN0RCxhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUc7RUFDdkIsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJO0VBQzFCLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSTtFQUUxQixRQUFRLElBQUksYUFBYSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7RUFDNUQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQzFDLENBQUM7QUFBQSxPQUFBLENBQUEsT0FBQSxHQUFBLFFBQUE7Ozs7Ozs7OztlQ1JjLEdBQUcsSUFBSSxrRUFBa0UsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUM7QUFBQSxPQUFBLENBQUEsT0FBQSxHQUFBLFFBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIihmdW5jdGlvbih3aW5kb3csIGZhY3RvcnkpIHtcblx0dmFyIGxhenlTaXplcyA9IGZhY3Rvcnkod2luZG93LCB3aW5kb3cuZG9jdW1lbnQsIERhdGUpO1xuXHR3aW5kb3cubGF6eVNpemVzID0gbGF6eVNpemVzO1xuXHRpZih0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGxhenlTaXplcztcblx0fVxufSh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID9cbiAgICAgIHdpbmRvdyA6IHt9LCBcbi8qKlxuICogaW1wb3J0KFwiLi90eXBlcy9nbG9iYWxcIilcbiAqIEB0eXBlZGVmIHsgaW1wb3J0KFwiLi90eXBlcy9sYXp5c2l6ZXMtY29uZmlnXCIpLkxhenlTaXplc0NvbmZpZ1BhcnRpYWwgfSBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsXG4gKi9cbmZ1bmN0aW9uIGwod2luZG93LCBkb2N1bWVudCwgRGF0ZSkgeyAvLyBQYXNzIGluIHRoZSB3aW5kb3cgRGF0ZSBmdW5jdGlvbiBhbHNvIGZvciBTU1IgYmVjYXVzZSB0aGUgRGF0ZSBjbGFzcyBjYW4gYmUgbG9zdFxuXHQndXNlIHN0cmljdCc7XG5cdC8qanNoaW50IGVxbnVsbDp0cnVlICovXG5cblx0dmFyIGxhenlzaXplcyxcblx0XHQvKipcblx0XHQgKiBAdHlwZSB7IExhenlTaXplc0NvbmZpZ1BhcnRpYWwgfVxuXHRcdCAqL1xuXHRcdGxhenlTaXplc0NmZztcblxuXHQoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJvcDtcblxuXHRcdHZhciBsYXp5U2l6ZXNEZWZhdWx0cyA9IHtcblx0XHRcdGxhenlDbGFzczogJ2xhenlsb2FkJyxcblx0XHRcdGxvYWRlZENsYXNzOiAnbGF6eWxvYWRlZCcsXG5cdFx0XHRsb2FkaW5nQ2xhc3M6ICdsYXp5bG9hZGluZycsXG5cdFx0XHRwcmVsb2FkQ2xhc3M6ICdsYXp5cHJlbG9hZCcsXG5cdFx0XHRlcnJvckNsYXNzOiAnbGF6eWVycm9yJyxcblx0XHRcdC8vc3RyaWN0Q2xhc3M6ICdsYXp5c3RyaWN0Jyxcblx0XHRcdGF1dG9zaXplc0NsYXNzOiAnbGF6eWF1dG9zaXplcycsXG5cdFx0XHRmYXN0TG9hZGVkQ2xhc3M6ICdscy1pcy1jYWNoZWQnLFxuXHRcdFx0aWZyYW1lTG9hZE1vZGU6IDAsXG5cdFx0XHRzcmNBdHRyOiAnZGF0YS1zcmMnLFxuXHRcdFx0c3Jjc2V0QXR0cjogJ2RhdGEtc3Jjc2V0Jyxcblx0XHRcdHNpemVzQXR0cjogJ2RhdGEtc2l6ZXMnLFxuXHRcdFx0Ly9wcmVsb2FkQWZ0ZXJMb2FkOiBmYWxzZSxcblx0XHRcdG1pblNpemU6IDQwLFxuXHRcdFx0Y3VzdG9tTWVkaWE6IHt9LFxuXHRcdFx0aW5pdDogdHJ1ZSxcblx0XHRcdGV4cEZhY3RvcjogMS41LFxuXHRcdFx0aEZhYzogMC44LFxuXHRcdFx0bG9hZE1vZGU6IDIsXG5cdFx0XHRsb2FkSGlkZGVuOiB0cnVlLFxuXHRcdFx0cmljVGltZW91dDogMCxcblx0XHRcdHRocm90dGxlRGVsYXk6IDEyNSxcblx0XHR9O1xuXG5cdFx0bGF6eVNpemVzQ2ZnID0gd2luZG93LmxhenlTaXplc0NvbmZpZyB8fCB3aW5kb3cubGF6eXNpemVzQ29uZmlnIHx8IHt9O1xuXG5cdFx0Zm9yKHByb3AgaW4gbGF6eVNpemVzRGVmYXVsdHMpe1xuXHRcdFx0aWYoIShwcm9wIGluIGxhenlTaXplc0NmZykpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDZmdbcHJvcF0gPSBsYXp5U2l6ZXNEZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0pKCk7XG5cblx0aWYgKCFkb2N1bWVudCB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbml0OiBmdW5jdGlvbiAoKSB7fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUgeyBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH1cblx0XHRcdCAqL1xuXHRcdFx0Y2ZnOiBsYXp5U2l6ZXNDZmcsXG5cdFx0XHQvKipcblx0XHRcdCAqIEB0eXBlIHsgdHJ1ZSB9XG5cdFx0XHQgKi9cblx0XHRcdG5vU3VwcG9ydDogdHJ1ZSxcblx0XHR9O1xuXHR9XG5cblx0dmFyIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0dmFyIHN1cHBvcnRQaWN0dXJlID0gd2luZG93LkhUTUxQaWN0dXJlRWxlbWVudDtcblxuXHR2YXIgX2FkZEV2ZW50TGlzdGVuZXIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5cblx0dmFyIF9nZXRBdHRyaWJ1dGUgPSAnZ2V0QXR0cmlidXRlJztcblxuXHQvKipcblx0ICogVXBkYXRlIHRvIGJpbmQgdG8gd2luZG93IGJlY2F1c2UgJ3RoaXMnIGJlY29tZXMgbnVsbCBkdXJpbmcgU1NSXG5cdCAqIGJ1aWxkcy5cblx0ICovXG5cdHZhciBhZGRFdmVudExpc3RlbmVyID0gd2luZG93W19hZGRFdmVudExpc3RlbmVyXS5iaW5kKHdpbmRvdyk7XG5cblx0dmFyIHNldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0O1xuXG5cdHZhciByZXF1ZXN0SWRsZUNhbGxiYWNrID0gd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2s7XG5cblx0dmFyIHJlZ1BpY3R1cmUgPSAvXnBpY3R1cmUkL2k7XG5cblx0dmFyIGxvYWRFdmVudHMgPSBbJ2xvYWQnLCAnZXJyb3InLCAnbGF6eWluY2x1ZGVkJywgJ19sYXp5bG9hZGVkJ107XG5cblx0dmFyIHJlZ0NsYXNzQ2FjaGUgPSB7fTtcblxuXHR2YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlIHtFbGVtZW50fVxuXHQgKiBAcGFyYW0gY2xzIHtzdHJpbmd9XG5cdCAqL1xuXHR2YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmKCFyZWdDbGFzc0NhY2hlW2Nsc10pe1xuXHRcdFx0cmVnQ2xhc3NDYWNoZVtjbHNdID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJytjbHMrJyhcXFxcc3wkKScpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVnQ2xhc3NDYWNoZVtjbHNdLnRlc3QoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKSAmJiByZWdDbGFzc0NhY2hlW2Nsc107XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGUge0VsZW1lbnR9XG5cdCAqIEBwYXJhbSBjbHMge3N0cmluZ31cblx0ICovXG5cdHZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0aWYgKCFoYXNDbGFzcyhlbGUsIGNscykpe1xuXHRcdFx0ZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS50cmltKCkgKyAnICcgKyBjbHMpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZSB7RWxlbWVudH1cblx0ICogQHBhcmFtIGNscyB7c3RyaW5nfVxuXHQgKi9cblx0dmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHR2YXIgcmVnO1xuXHRcdGlmICgocmVnID0gaGFzQ2xhc3MoZWxlLGNscykpKSB7XG5cdFx0XHRlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnJlcGxhY2UocmVnLCAnICcpKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIGFkZFJlbW92ZUxvYWRFdmVudHMgPSBmdW5jdGlvbihkb20sIGZuLCBhZGQpe1xuXHRcdHZhciBhY3Rpb24gPSBhZGQgPyBfYWRkRXZlbnRMaXN0ZW5lciA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblx0XHRpZihhZGQpe1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhkb20sIGZuKTtcblx0XHR9XG5cdFx0bG9hZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2dCl7XG5cdFx0XHRkb21bYWN0aW9uXShldnQsIGZuKTtcblx0XHR9KTtcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZW0geyBFbGVtZW50IH1cblx0ICogQHBhcmFtIG5hbWUgeyBzdHJpbmcgfVxuXHQgKiBAcGFyYW0gZGV0YWlsIHsgYW55IH1cblx0ICogQHBhcmFtIG5vQnViYmxlcyB7IGJvb2xlYW4gfVxuXHQgKiBAcGFyYW0gbm9DYW5jZWxhYmxlIHsgYm9vbGVhbiB9XG5cdCAqIEByZXR1cm5zIHsgQ3VzdG9tRXZlbnQgfVxuXHQgKi9cblx0dmFyIHRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uKGVsZW0sIG5hbWUsIGRldGFpbCwgbm9CdWJibGVzLCBub0NhbmNlbGFibGUpe1xuXHRcdHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXG5cdFx0aWYoIWRldGFpbCl7XG5cdFx0XHRkZXRhaWwgPSB7fTtcblx0XHR9XG5cblx0XHRkZXRhaWwuaW5zdGFuY2UgPSBsYXp5c2l6ZXM7XG5cblx0XHRldmVudC5pbml0RXZlbnQobmFtZSwgIW5vQnViYmxlcywgIW5vQ2FuY2VsYWJsZSk7XG5cblx0XHRldmVudC5kZXRhaWwgPSBkZXRhaWw7XG5cblx0XHRlbGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdHJldHVybiBldmVudDtcblx0fTtcblxuXHR2YXIgdXBkYXRlUG9seWZpbGwgPSBmdW5jdGlvbiAoZWwsIGZ1bGwpe1xuXHRcdHZhciBwb2x5ZmlsbDtcblx0XHRpZiggIXN1cHBvcnRQaWN0dXJlICYmICggcG9seWZpbGwgPSAod2luZG93LnBpY3R1cmVmaWxsIHx8IGxhenlTaXplc0NmZy5wZikgKSApe1xuXHRcdFx0aWYoZnVsbCAmJiBmdWxsLnNyYyAmJiAhZWxbX2dldEF0dHJpYnV0ZV0oJ3NyY3NldCcpKXtcblx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBmdWxsLnNyYyk7XG5cdFx0XHR9XG5cdFx0XHRwb2x5ZmlsbCh7cmVldmFsdWF0ZTogdHJ1ZSwgZWxlbWVudHM6IFtlbF19KTtcblx0XHR9IGVsc2UgaWYoZnVsbCAmJiBmdWxsLnNyYyl7XG5cdFx0XHRlbC5zcmMgPSBmdWxsLnNyYztcblx0XHR9XG5cdH07XG5cblx0dmFyIGdldENTUyA9IGZ1bmN0aW9uIChlbGVtLCBzdHlsZSl7XG5cdFx0cmV0dXJuIChnZXRDb21wdXRlZFN0eWxlKGVsZW0sIG51bGwpIHx8IHt9KVtzdHlsZV07XG5cdH07XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbGVtIHsgRWxlbWVudCB9XG5cdCAqIEBwYXJhbSBwYXJlbnQgeyBFbGVtZW50IH1cblx0ICogQHBhcmFtIFt3aWR0aF0ge251bWJlcn1cblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgd2lkdGgpe1xuXHRcdHdpZHRoID0gd2lkdGggfHwgZWxlbS5vZmZzZXRXaWR0aDtcblxuXHRcdHdoaWxlKHdpZHRoIDwgbGF6eVNpemVzQ2ZnLm1pblNpemUgJiYgcGFyZW50ICYmICFlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHR3aWR0aCA9ICBwYXJlbnQub2Zmc2V0V2lkdGg7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2lkdGg7XG5cdH07XG5cblx0dmFyIHJBRiA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBydW5uaW5nLCB3YWl0aW5nO1xuXHRcdHZhciBmaXJzdEZucyA9IFtdO1xuXHRcdHZhciBzZWNvbmRGbnMgPSBbXTtcblx0XHR2YXIgZm5zID0gZmlyc3RGbnM7XG5cblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBydW5GbnMgPSBmbnM7XG5cblx0XHRcdGZucyA9IGZpcnN0Rm5zLmxlbmd0aCA/IHNlY29uZEZucyA6IGZpcnN0Rm5zO1xuXG5cdFx0XHRydW5uaW5nID0gdHJ1ZTtcblx0XHRcdHdhaXRpbmcgPSBmYWxzZTtcblxuXHRcdFx0d2hpbGUocnVuRm5zLmxlbmd0aCl7XG5cdFx0XHRcdHJ1bkZucy5zaGlmdCgpKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0dmFyIHJhZkJhdGNoID0gZnVuY3Rpb24oZm4sIHF1ZXVlKXtcblx0XHRcdGlmKHJ1bm5pbmcgJiYgIXF1ZXVlKXtcblx0XHRcdFx0Zm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZucy5wdXNoKGZuKTtcblxuXHRcdFx0XHRpZighd2FpdGluZyl7XG5cdFx0XHRcdFx0d2FpdGluZyA9IHRydWU7XG5cdFx0XHRcdFx0KGRvY3VtZW50LmhpZGRlbiA/IHNldFRpbWVvdXQgOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUpKHJ1bik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmFmQmF0Y2guX2xzRmx1c2ggPSBydW47XG5cblx0XHRyZXR1cm4gcmFmQmF0Y2g7XG5cdH0pKCk7XG5cblx0dmFyIHJBRkl0ID0gZnVuY3Rpb24oZm4sIHNpbXBsZSl7XG5cdFx0cmV0dXJuIHNpbXBsZSA/XG5cdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0ckFGKGZuKTtcblx0XHRcdH0gOlxuXHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblx0XHRcdFx0ckFGKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0Zm4uYXBwbHkodGhhdCwgYXJncyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdDtcblx0fTtcblxuXHR2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbihmbil7XG5cdFx0dmFyIHJ1bm5pbmc7XG5cdFx0dmFyIGxhc3RUaW1lID0gMDtcblx0XHR2YXIgZ0RlbGF5ID0gbGF6eVNpemVzQ2ZnLnRocm90dGxlRGVsYXk7XG5cdFx0dmFyIHJJQ1RpbWVvdXQgPSBsYXp5U2l6ZXNDZmcucmljVGltZW91dDtcblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHRcdGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRcdGZuKCk7XG5cdFx0fTtcblx0XHR2YXIgaWRsZUNhbGxiYWNrID0gcmVxdWVzdElkbGVDYWxsYmFjayAmJiBySUNUaW1lb3V0ID4gNDkgP1xuXHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0cmVxdWVzdElkbGVDYWxsYmFjayhydW4sIHt0aW1lb3V0OiBySUNUaW1lb3V0fSk7XG5cblx0XHRcdFx0aWYocklDVGltZW91dCAhPT0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQpe1xuXHRcdFx0XHRcdHJJQ1RpbWVvdXQgPSBsYXp5U2l6ZXNDZmcucmljVGltZW91dDtcblx0XHRcdFx0fVxuXHRcdFx0fSA6XG5cdFx0XHRyQUZJdChmdW5jdGlvbigpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KHJ1bik7XG5cdFx0XHR9LCB0cnVlKVxuXHRcdDtcblxuXHRcdHJldHVybiBmdW5jdGlvbihpc1ByaW9yaXR5KXtcblx0XHRcdHZhciBkZWxheTtcblxuXHRcdFx0aWYoKGlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5ID09PSB0cnVlKSl7XG5cdFx0XHRcdHJJQ1RpbWVvdXQgPSAzMztcblx0XHRcdH1cblxuXHRcdFx0aWYocnVubmluZyl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cnVubmluZyA9ICB0cnVlO1xuXG5cdFx0XHRkZWxheSA9IGdEZWxheSAtIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpO1xuXG5cdFx0XHRpZihkZWxheSA8IDApe1xuXHRcdFx0XHRkZWxheSA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKGlzUHJpb3JpdHkgfHwgZGVsYXkgPCA5KXtcblx0XHRcdFx0aWRsZUNhbGxiYWNrKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGlkbGVDYWxsYmFjaywgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0Ly9iYXNlZCBvbiBodHRwOi8vbW9kZXJuamF2YXNjcmlwdC5ibG9nc3BvdC5kZS8yMDEzLzA4L2J1aWxkaW5nLWJldHRlci1kZWJvdW5jZS5odG1sXG5cdHZhciBkZWJvdW5jZSA9IGZ1bmN0aW9uKGZ1bmMpIHtcblx0XHR2YXIgdGltZW91dCwgdGltZXN0YW1wO1xuXHRcdHZhciB3YWl0ID0gOTk7XG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMoKTtcblx0XHR9O1xuXHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGxhc3QgPSBEYXRlLm5vdygpIC0gdGltZXN0YW1wO1xuXG5cdFx0XHRpZiAobGFzdCA8IHdhaXQpIHtcblx0XHRcdFx0c2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0KHJlcXVlc3RJZGxlQ2FsbGJhY2sgfHwgcnVuKShydW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHR0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRpZiAoIXRpbWVvdXQpIHtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0dmFyIGxvYWRlciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBwcmVsb2FkRWxlbXMsIGlzQ29tcGxldGVkLCByZXNldFByZWxvYWRpbmdUaW1lciwgbG9hZE1vZGUsIHN0YXJ0ZWQ7XG5cblx0XHR2YXIgZUx2VywgZWx2SCwgZUx0b3AsIGVMbGVmdCwgZUxyaWdodCwgZUxib3R0b20sIGlzQm9keUhpZGRlbjtcblxuXHRcdHZhciByZWdJbWcgPSAvXmltZyQvaTtcblx0XHR2YXIgcmVnSWZyYW1lID0gL15pZnJhbWUkL2k7XG5cblx0XHR2YXIgc3VwcG9ydFNjcm9sbCA9ICgnb25zY3JvbGwnIGluIHdpbmRvdykgJiYgISgvKGdsZXxpbmcpYm90Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTtcblxuXHRcdHZhciBzaHJpbmtFeHBhbmQgPSAwO1xuXHRcdHZhciBjdXJyZW50RXhwYW5kID0gMDtcblxuXHRcdHZhciBpc0xvYWRpbmcgPSAwO1xuXHRcdHZhciBsb3dSdW5zID0gLTE7XG5cblx0XHR2YXIgcmVzZXRQcmVsb2FkaW5nID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRpc0xvYWRpbmctLTtcblx0XHRcdGlmKCFlIHx8IGlzTG9hZGluZyA8IDAgfHwgIWUudGFyZ2V0KXtcblx0XHRcdFx0aXNMb2FkaW5nID0gMDtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGlzVmlzaWJsZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0XHRpZiAoaXNCb2R5SGlkZGVuID09IG51bGwpIHtcblx0XHRcdFx0aXNCb2R5SGlkZGVuID0gZ2V0Q1NTKGRvY3VtZW50LmJvZHksICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbic7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpc0JvZHlIaWRkZW4gfHwgIShnZXRDU1MoZWxlbS5wYXJlbnROb2RlLCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nICYmIGdldENTUyhlbGVtLCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nKTtcblx0XHR9O1xuXG5cdFx0dmFyIGlzTmVzdGVkVmlzaWJsZSA9IGZ1bmN0aW9uKGVsZW0sIGVsZW1FeHBhbmQpe1xuXHRcdFx0dmFyIG91dGVyUmVjdDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtO1xuXHRcdFx0dmFyIHZpc2libGUgPSBpc1Zpc2libGUoZWxlbSk7XG5cblx0XHRcdGVMdG9wIC09IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTGJvdHRvbSArPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxsZWZ0IC09IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTHJpZ2h0ICs9IGVsZW1FeHBhbmQ7XG5cblx0XHRcdHdoaWxlKHZpc2libGUgJiYgKHBhcmVudCA9IHBhcmVudC5vZmZzZXRQYXJlbnQpICYmIHBhcmVudCAhPSBkb2N1bWVudC5ib2R5ICYmIHBhcmVudCAhPSBkb2NFbGVtKXtcblx0XHRcdFx0dmlzaWJsZSA9ICgoZ2V0Q1NTKHBhcmVudCwgJ29wYWNpdHknKSB8fCAxKSA+IDApO1xuXG5cdFx0XHRcdGlmKHZpc2libGUgJiYgZ2V0Q1NTKHBhcmVudCwgJ292ZXJmbG93JykgIT0gJ3Zpc2libGUnKXtcblx0XHRcdFx0XHRvdXRlclJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0dmlzaWJsZSA9IGVMcmlnaHQgPiBvdXRlclJlY3QubGVmdCAmJlxuXHRcdFx0XHRcdFx0ZUxsZWZ0IDwgb3V0ZXJSZWN0LnJpZ2h0ICYmXG5cdFx0XHRcdFx0XHRlTGJvdHRvbSA+IG91dGVyUmVjdC50b3AgLSAxICYmXG5cdFx0XHRcdFx0XHRlTHRvcCA8IG91dGVyUmVjdC5ib3R0b20gKyAxXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2aXNpYmxlO1xuXHRcdH07XG5cblx0XHR2YXIgY2hlY2tFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGVMbGVuLCBpLCByZWN0LCBhdXRvTG9hZEVsZW0sIGxvYWRlZFNvbWV0aGluZywgZWxlbUV4cGFuZCwgZWxlbU5lZ2F0aXZlRXhwYW5kLCBlbGVtRXhwYW5kVmFsLFxuXHRcdFx0XHRiZWZvcmVFeHBhbmRWYWwsIGRlZmF1bHRFeHBhbmQsIHByZWxvYWRFeHBhbmQsIGhGYWM7XG5cdFx0XHR2YXIgbGF6eWxvYWRFbGVtcyA9IGxhenlzaXplcy5lbGVtZW50cztcblxuXHRcdFx0aWYoKGxvYWRNb2RlID0gbGF6eVNpemVzQ2ZnLmxvYWRNb2RlKSAmJiBpc0xvYWRpbmcgPCA4ICYmIChlTGxlbiA9IGxhenlsb2FkRWxlbXMubGVuZ3RoKSl7XG5cblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdFx0bG93UnVucysrO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBlTGxlbjsgaSsrKXtcblxuXHRcdFx0XHRcdGlmKCFsYXp5bG9hZEVsZW1zW2ldIHx8IGxhenlsb2FkRWxlbXNbaV0uX2xhenlSYWNlKXtjb250aW51ZTt9XG5cblx0XHRcdFx0XHRpZighc3VwcG9ydFNjcm9sbCB8fCAobGF6eXNpemVzLnByZW1hdHVyZVVudmVpbCAmJiBsYXp5c2l6ZXMucHJlbWF0dXJlVW52ZWlsKGxhenlsb2FkRWxlbXNbaV0pKSl7dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtjb250aW51ZTt9XG5cblx0XHRcdFx0XHRpZighKGVsZW1FeHBhbmRWYWwgPSBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKCdkYXRhLWV4cGFuZCcpKSB8fCAhKGVsZW1FeHBhbmQgPSBlbGVtRXhwYW5kVmFsICogMSkpe1xuXHRcdFx0XHRcdFx0ZWxlbUV4cGFuZCA9IGN1cnJlbnRFeHBhbmQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFkZWZhdWx0RXhwYW5kKSB7XG5cdFx0XHRcdFx0XHRkZWZhdWx0RXhwYW5kID0gKCFsYXp5U2l6ZXNDZmcuZXhwYW5kIHx8IGxhenlTaXplc0NmZy5leHBhbmQgPCAxKSA/XG5cdFx0XHRcdFx0XHRcdGRvY0VsZW0uY2xpZW50SGVpZ2h0ID4gNTAwICYmIGRvY0VsZW0uY2xpZW50V2lkdGggPiA1MDAgPyA1MDAgOiAzNzAgOlxuXHRcdFx0XHRcdFx0XHRsYXp5U2l6ZXNDZmcuZXhwYW5kO1xuXG5cdFx0XHRcdFx0XHRsYXp5c2l6ZXMuX2RlZkV4ID0gZGVmYXVsdEV4cGFuZDtcblxuXHRcdFx0XHRcdFx0cHJlbG9hZEV4cGFuZCA9IGRlZmF1bHRFeHBhbmQgKiBsYXp5U2l6ZXNDZmcuZXhwRmFjdG9yO1xuXHRcdFx0XHRcdFx0aEZhYyA9IGxhenlTaXplc0NmZy5oRmFjO1xuXHRcdFx0XHRcdFx0aXNCb2R5SGlkZGVuID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0aWYoY3VycmVudEV4cGFuZCA8IHByZWxvYWRFeHBhbmQgJiYgaXNMb2FkaW5nIDwgMSAmJiBsb3dSdW5zID4gMiAmJiBsb2FkTW9kZSA+IDIgJiYgIWRvY3VtZW50LmhpZGRlbil7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBwcmVsb2FkRXhwYW5kO1xuXHRcdFx0XHRcdFx0XHRsb3dSdW5zID0gMDtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZihsb2FkTW9kZSA+IDEgJiYgbG93UnVucyA+IDEgJiYgaXNMb2FkaW5nIDwgNil7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y3VycmVudEV4cGFuZCA9IHNocmlua0V4cGFuZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihiZWZvcmVFeHBhbmRWYWwgIT09IGVsZW1FeHBhbmQpe1xuXHRcdFx0XHRcdFx0ZUx2VyA9IGlubmVyV2lkdGggKyAoZWxlbUV4cGFuZCAqIGhGYWMpO1xuXHRcdFx0XHRcdFx0ZWx2SCA9IGlubmVySGVpZ2h0ICsgZWxlbUV4cGFuZDtcblx0XHRcdFx0XHRcdGVsZW1OZWdhdGl2ZUV4cGFuZCA9IGVsZW1FeHBhbmQgKiAtMTtcblx0XHRcdFx0XHRcdGJlZm9yZUV4cGFuZFZhbCA9IGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVjdCA9IGxhenlsb2FkRWxlbXNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdFx0XHRpZiAoKGVMYm90dG9tID0gcmVjdC5ib3R0b20pID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAmJlxuXHRcdFx0XHRcdFx0KGVMdG9wID0gcmVjdC50b3ApIDw9IGVsdkggJiZcblx0XHRcdFx0XHRcdChlTHJpZ2h0ID0gcmVjdC5yaWdodCkgPj0gZWxlbU5lZ2F0aXZlRXhwYW5kICogaEZhYyAmJlxuXHRcdFx0XHRcdFx0KGVMbGVmdCA9IHJlY3QubGVmdCkgPD0gZUx2VyAmJlxuXHRcdFx0XHRcdFx0KGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSAmJlxuXHRcdFx0XHRcdFx0KGxhenlTaXplc0NmZy5sb2FkSGlkZGVuIHx8IGlzVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldKSkgJiZcblx0XHRcdFx0XHRcdCgoaXNDb21wbGV0ZWQgJiYgaXNMb2FkaW5nIDwgMyAmJiAhZWxlbUV4cGFuZFZhbCAmJiAobG9hZE1vZGUgPCAzIHx8IGxvd1J1bnMgPCA0KSkgfHwgaXNOZXN0ZWRWaXNpYmxlKGxhenlsb2FkRWxlbXNbaV0sIGVsZW1FeHBhbmQpKSl7XG5cdFx0XHRcdFx0XHR1bnZlaWxFbGVtZW50KGxhenlsb2FkRWxlbXNbaV0pO1xuXHRcdFx0XHRcdFx0bG9hZGVkU29tZXRoaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGlmKGlzTG9hZGluZyA+IDkpe2JyZWFrO31cblx0XHRcdFx0XHR9IGVsc2UgaWYoIWxvYWRlZFNvbWV0aGluZyAmJiBpc0NvbXBsZXRlZCAmJiAhYXV0b0xvYWRFbGVtICYmXG5cdFx0XHRcdFx0XHRpc0xvYWRpbmcgPCA0ICYmIGxvd1J1bnMgPCA0ICYmIGxvYWRNb2RlID4gMiAmJlxuXHRcdFx0XHRcdFx0KHByZWxvYWRFbGVtc1swXSB8fCBsYXp5U2l6ZXNDZmcucHJlbG9hZEFmdGVyTG9hZCkgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgKCFlbGVtRXhwYW5kVmFsICYmICgoZUxib3R0b20gfHwgZUxyaWdodCB8fCBlTGxlZnQgfHwgZUx0b3ApIHx8IGxhenlsb2FkRWxlbXNbaV1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNpemVzQXR0cikgIT0gJ2F1dG8nKSkpKXtcblx0XHRcdFx0XHRcdGF1dG9Mb2FkRWxlbSA9IHByZWxvYWRFbGVtc1swXSB8fCBsYXp5bG9hZEVsZW1zW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGF1dG9Mb2FkRWxlbSAmJiAhbG9hZGVkU29tZXRoaW5nKXtcblx0XHRcdFx0XHR1bnZlaWxFbGVtZW50KGF1dG9Mb2FkRWxlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIHRocm90dGxlZENoZWNrRWxlbWVudHMgPSB0aHJvdHRsZShjaGVja0VsZW1lbnRzKTtcblxuXHRcdHZhciBzd2l0Y2hMb2FkaW5nQ2xhc3MgPSBmdW5jdGlvbihlKXtcblx0XHRcdHZhciBlbGVtID0gZS50YXJnZXQ7XG5cblx0XHRcdGlmIChlbGVtLl9sYXp5Q2FjaGUpIHtcblx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlDYWNoZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXNldFByZWxvYWRpbmcoZSk7XG5cdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGVkQ2xhc3MpO1xuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHJhZlN3aXRjaExvYWRpbmdDbGFzcyk7XG5cdFx0XHR0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenlsb2FkZWQnKTtcblx0XHR9O1xuXHRcdHZhciByYWZlZFN3aXRjaExvYWRpbmdDbGFzcyA9IHJBRkl0KHN3aXRjaExvYWRpbmdDbGFzcyk7XG5cdFx0dmFyIHJhZlN3aXRjaExvYWRpbmdDbGFzcyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0cmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3Moe3RhcmdldDogZS50YXJnZXR9KTtcblx0XHR9O1xuXG5cdFx0dmFyIGNoYW5nZUlmcmFtZVNyYyA9IGZ1bmN0aW9uKGVsZW0sIHNyYyl7XG5cdFx0XHR2YXIgbG9hZE1vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1sb2FkLW1vZGUnKSB8fCBsYXp5U2l6ZXNDZmcuaWZyYW1lTG9hZE1vZGU7XG5cblx0XHRcdC8vIGxvYWRNb2RlIGNhbiBiZSBhbHNvIGEgc3RyaW5nIVxuXHRcdFx0aWYgKGxvYWRNb2RlID09IDApIHtcblx0XHRcdFx0ZWxlbS5jb250ZW50V2luZG93LmxvY2F0aW9uLnJlcGxhY2Uoc3JjKTtcblx0XHRcdH0gZWxzZSBpZiAobG9hZE1vZGUgPT0gMSkge1xuXHRcdFx0XHRlbGVtLnNyYyA9IHNyYztcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGhhbmRsZVNvdXJjZXMgPSBmdW5jdGlvbihzb3VyY2Upe1xuXHRcdFx0dmFyIGN1c3RvbU1lZGlhO1xuXG5cdFx0XHR2YXIgc291cmNlU3Jjc2V0ID0gc291cmNlW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNzZXRBdHRyKTtcblxuXHRcdFx0aWYoIChjdXN0b21NZWRpYSA9IGxhenlTaXplc0NmZy5jdXN0b21NZWRpYVtzb3VyY2VbX2dldEF0dHJpYnV0ZV0oJ2RhdGEtbWVkaWEnKSB8fCBzb3VyY2VbX2dldEF0dHJpYnV0ZV0oJ21lZGlhJyldKSApe1xuXHRcdFx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdtZWRpYScsIGN1c3RvbU1lZGlhKTtcblx0XHRcdH1cblxuXHRcdFx0aWYoc291cmNlU3Jjc2V0KXtcblx0XHRcdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc291cmNlU3Jjc2V0KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGxhenlVbnZlaWwgPSByQUZJdChmdW5jdGlvbiAoZWxlbSwgZGV0YWlsLCBpc0F1dG8sIHNpemVzLCBpc0ltZyl7XG5cdFx0XHR2YXIgc3JjLCBzcmNzZXQsIHBhcmVudCwgaXNQaWN0dXJlLCBldmVudCwgZmlyZXNMb2FkO1xuXG5cdFx0XHRpZighKGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3JldW52ZWlsJywgZGV0YWlsKSkuZGVmYXVsdFByZXZlbnRlZCl7XG5cblx0XHRcdFx0aWYoc2l6ZXMpe1xuXHRcdFx0XHRcdGlmKGlzQXV0byl7XG5cdFx0XHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcuYXV0b3NpemVzQ2xhc3MpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCBzaXplcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3Jjc2V0ID0gZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3Jjc2V0QXR0cik7XG5cdFx0XHRcdHNyYyA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY0F0dHIpO1xuXG5cdFx0XHRcdGlmKGlzSW1nKSB7XG5cdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdGlzUGljdHVyZSA9IHBhcmVudCAmJiByZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZpcmVzTG9hZCA9IGRldGFpbC5maXJlc0xvYWQgfHwgKCgnc3JjJyBpbiBlbGVtKSAmJiAoc3Jjc2V0IHx8IHNyYyB8fCBpc1BpY3R1cmUpKTtcblxuXHRcdFx0XHRldmVudCA9IHt0YXJnZXQ6IGVsZW19O1xuXG5cdFx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXG5cdFx0XHRcdGlmKGZpcmVzTG9hZCl7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHJlc2V0UHJlbG9hZGluZ1RpbWVyKTtcblx0XHRcdFx0XHRyZXNldFByZWxvYWRpbmdUaW1lciA9IHNldFRpbWVvdXQocmVzZXRQcmVsb2FkaW5nLCAyNTAwKTtcblx0XHRcdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHJhZlN3aXRjaExvYWRpbmdDbGFzcywgdHJ1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihpc1BpY3R1cmUpe1xuXHRcdFx0XHRcdGZvckVhY2guY2FsbChwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpLCBoYW5kbGVTb3VyY2VzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKHNyY3NldCl7XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNyY3NldCk7XG5cdFx0XHRcdH0gZWxzZSBpZihzcmMgJiYgIWlzUGljdHVyZSl7XG5cdFx0XHRcdFx0aWYocmVnSWZyYW1lLnRlc3QoZWxlbS5ub2RlTmFtZSkpe1xuXHRcdFx0XHRcdFx0Y2hhbmdlSWZyYW1lU3JjKGVsZW0sIHNyYyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGlzSW1nICYmIChzcmNzZXQgfHwgaXNQaWN0dXJlKSl7XG5cdFx0XHRcdFx0dXBkYXRlUG9seWZpbGwoZWxlbSwge3NyYzogc3JjfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoZWxlbS5fbGF6eVJhY2Upe1xuXHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eVJhY2U7XG5cdFx0XHR9XG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubGF6eUNsYXNzKTtcblxuXHRcdFx0ckFGKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdC8vIFBhcnQgb2YgdGhpcyBjYW4gYmUgcmVtb3ZlZCBhcyBzb29uIGFzIHRoaXMgZml4IGlzIG9sZGVyOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03NzMxICgyMDE1KVxuXHRcdFx0XHR2YXIgaXNMb2FkZWQgPSBlbGVtLmNvbXBsZXRlICYmIGVsZW0ubmF0dXJhbFdpZHRoID4gMTtcblxuXHRcdFx0XHRpZiggIWZpcmVzTG9hZCB8fCBpc0xvYWRlZCl7XG5cdFx0XHRcdFx0aWYgKGlzTG9hZGVkKSB7XG5cdFx0XHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcuZmFzdExvYWRlZENsYXNzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3dpdGNoTG9hZGluZ0NsYXNzKGV2ZW50KTtcblx0XHRcdFx0XHRlbGVtLl9sYXp5Q2FjaGUgPSB0cnVlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGlmICgnX2xhenlDYWNoZScgaW4gZWxlbSkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eUNhY2hlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sIDkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlbGVtLmxvYWRpbmcgPT0gJ2xhenknKSB7XG5cdFx0XHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyoqXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gZWxlbSB7IEVsZW1lbnQgfVxuXHRcdCAqL1xuXHRcdHZhciB1bnZlaWxFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW0pe1xuXHRcdFx0aWYgKGVsZW0uX2xhenlSYWNlKSB7cmV0dXJuO31cblx0XHRcdHZhciBkZXRhaWw7XG5cblx0XHRcdHZhciBpc0ltZyA9IHJlZ0ltZy50ZXN0KGVsZW0ubm9kZU5hbWUpO1xuXG5cdFx0XHQvL2FsbG93IHVzaW5nIHNpemVzPVwiYXV0b1wiLCBidXQgZG9uJ3QgdXNlLiBpdCdzIGludmFsaWQuIFVzZSBkYXRhLXNpemVzPVwiYXV0b1wiIG9yIGEgdmFsaWQgdmFsdWUgZm9yIHNpemVzIGluc3RlYWQgKGkuZS46IHNpemVzPVwiODB2d1wiKVxuXHRcdFx0dmFyIHNpemVzID0gaXNJbWcgJiYgKGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNpemVzQXR0cikgfHwgZWxlbVtfZ2V0QXR0cmlidXRlXSgnc2l6ZXMnKSk7XG5cdFx0XHR2YXIgaXNBdXRvID0gc2l6ZXMgPT0gJ2F1dG8nO1xuXG5cdFx0XHRpZiggKGlzQXV0byB8fCAhaXNDb21wbGV0ZWQpICYmIGlzSW1nICYmIChlbGVtW19nZXRBdHRyaWJ1dGVdKCdzcmMnKSB8fCBlbGVtLnNyY3NldCkgJiYgIWVsZW0uY29tcGxldGUgJiYgIWhhc0NsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5lcnJvckNsYXNzKSAmJiBoYXNDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubGF6eUNsYXNzKSl7cmV0dXJuO31cblxuXHRcdFx0ZGV0YWlsID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5dW52ZWlscmVhZCcpLmRldGFpbDtcblxuXHRcdFx0aWYoaXNBdXRvKXtcblx0XHRcdFx0IGF1dG9TaXplci51cGRhdGVFbGVtKGVsZW0sIHRydWUsIGVsZW0ub2Zmc2V0V2lkdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHRlbGVtLl9sYXp5UmFjZSA9IHRydWU7XG5cdFx0XHRpc0xvYWRpbmcrKztcblxuXHRcdFx0bGF6eVVudmVpbChlbGVtLCBkZXRhaWwsIGlzQXV0bywgc2l6ZXMsIGlzSW1nKTtcblx0XHR9O1xuXG5cdFx0dmFyIGFmdGVyU2Nyb2xsID0gZGVib3VuY2UoZnVuY3Rpb24oKXtcblx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDM7XG5cdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cdFx0fSk7XG5cblx0XHR2YXIgYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyID0gZnVuY3Rpb24oKXtcblx0XHRcdGlmKGxhenlTaXplc0NmZy5sb2FkTW9kZSA9PSAzKXtcblx0XHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMjtcblx0XHRcdH1cblx0XHRcdGFmdGVyU2Nyb2xsKCk7XG5cdFx0fTtcblxuXHRcdHZhciBvbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0aWYoaXNDb21wbGV0ZWQpe3JldHVybjt9XG5cdFx0XHRpZihEYXRlLm5vdygpIC0gc3RhcnRlZCA8IDk5OSl7XG5cdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCA5OTkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblxuXHRcdFx0aXNDb21wbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAzO1xuXG5cdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cblx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lciwgdHJ1ZSk7XG5cdFx0fTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRfOiBmdW5jdGlvbigpe1xuXHRcdFx0XHRzdGFydGVkID0gRGF0ZS5ub3coKTtcblxuXHRcdFx0XHRsYXp5c2l6ZXMuZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpO1xuXHRcdFx0XHRwcmVsb2FkRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NmZy5sYXp5Q2xhc3MgKyAnICcgKyBsYXp5U2l6ZXNDZmcucHJlbG9hZENsYXNzKTtcblxuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKGUucGVyc2lzdGVkKSB7XG5cdFx0XHRcdFx0XHR2YXIgbG9hZGluZ0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBsYXp5U2l6ZXNDZmcubG9hZGluZ0NsYXNzKTtcblxuXHRcdFx0XHRcdFx0aWYgKGxvYWRpbmdFbGVtZW50cy5sZW5ndGggJiYgbG9hZGluZ0VsZW1lbnRzLmZvckVhY2gpIHtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRsb2FkaW5nRWxlbWVudHMuZm9yRWFjaCggZnVuY3Rpb24gKGltZykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGltZy5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR1bnZlaWxFbGVtZW50KGltZyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYod2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpe1xuXHRcdFx0XHRcdG5ldyBNdXRhdGlvbk9ic2VydmVyKCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzICkub2JzZXJ2ZSggZG9jRWxlbSwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX0gKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkb2NFbGVtW19hZGRFdmVudExpc3RlbmVyXSgnRE9NTm9kZUluc2VydGVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHRcdFx0ZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTUF0dHJNb2RpZmllZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHRcdHNldEludGVydmFsKHRocm90dGxlZENoZWNrRWxlbWVudHMsIDk5OSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0Ly8sICdmdWxsc2NyZWVuY2hhbmdlJ1xuXHRcdFx0XHRbJ2ZvY3VzJywgJ21vdXNlb3ZlcicsICdjbGljaycsICdsb2FkJywgJ3RyYW5zaXRpb25lbmQnLCAnYW5pbWF0aW9uZW5kJ10uZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcblx0XHRcdFx0XHRkb2N1bWVudFtfYWRkRXZlbnRMaXN0ZW5lcl0obmFtZSwgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmKCgvZCR8XmMvLnRlc3QoZG9jdW1lbnQucmVhZHlTdGF0ZSkpKXtcblx0XHRcdFx0XHRvbmxvYWQoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25sb2FkKTtcblx0XHRcdFx0XHRkb2N1bWVudFtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzKTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KG9ubG9hZCwgMjAwMDApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYobGF6eXNpemVzLmVsZW1lbnRzLmxlbmd0aCl7XG5cdFx0XHRcdFx0Y2hlY2tFbGVtZW50cygpO1xuXHRcdFx0XHRcdHJBRi5fbHNGbHVzaCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IHRocm90dGxlZENoZWNrRWxlbWVudHMsXG5cdFx0XHR1bnZlaWw6IHVudmVpbEVsZW1lbnQsXG5cdFx0XHRfYUxTTDogYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyLFxuXHRcdH07XG5cdH0pKCk7XG5cblxuXHR2YXIgYXV0b1NpemVyID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGF1dG9zaXplc0VsZW1zO1xuXG5cdFx0dmFyIHNpemVFbGVtZW50ID0gckFGSXQoZnVuY3Rpb24oZWxlbSwgcGFyZW50LCBldmVudCwgd2lkdGgpe1xuXHRcdFx0dmFyIHNvdXJjZXMsIGksIGxlbjtcblx0XHRcdGVsZW0uX2xhenlzaXplc1dpZHRoID0gd2lkdGg7XG5cdFx0XHR3aWR0aCArPSAncHgnO1xuXG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCB3aWR0aCk7XG5cblx0XHRcdGlmKHJlZ1BpY3R1cmUudGVzdChwYXJlbnQubm9kZU5hbWUgfHwgJycpKXtcblx0XHRcdFx0c291cmNlcyA9IHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc291cmNlJyk7XG5cdFx0XHRcdGZvcihpID0gMCwgbGVuID0gc291cmNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG5cdFx0XHRcdFx0c291cmNlc1tpXS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKCFldmVudC5kZXRhaWwuZGF0YUF0dHIpe1xuXHRcdFx0XHR1cGRhdGVQb2x5ZmlsbChlbGVtLCBldmVudC5kZXRhaWwpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8qKlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGVsZW0ge0VsZW1lbnR9XG5cdFx0ICogQHBhcmFtIGRhdGFBdHRyXG5cdFx0ICogQHBhcmFtIFt3aWR0aF0geyBudW1iZXIgfVxuXHRcdCAqL1xuXHRcdHZhciBnZXRTaXplRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtLCBkYXRhQXR0ciwgd2lkdGgpe1xuXHRcdFx0dmFyIGV2ZW50O1xuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYocGFyZW50KXtcblx0XHRcdFx0d2lkdGggPSBnZXRXaWR0aChlbGVtLCBwYXJlbnQsIHdpZHRoKTtcblx0XHRcdFx0ZXZlbnQgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenliZWZvcmVzaXplcycsIHt3aWR0aDogd2lkdGgsIGRhdGFBdHRyOiAhIWRhdGFBdHRyfSk7XG5cblx0XHRcdFx0aWYoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpe1xuXHRcdFx0XHRcdHdpZHRoID0gZXZlbnQuZGV0YWlsLndpZHRoO1xuXG5cdFx0XHRcdFx0aWYod2lkdGggJiYgd2lkdGggIT09IGVsZW0uX2xhenlzaXplc1dpZHRoKXtcblx0XHRcdFx0XHRcdHNpemVFbGVtZW50KGVsZW0sIHBhcmVudCwgZXZlbnQsIHdpZHRoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIHVwZGF0ZUVsZW1lbnRzU2l6ZXMgPSBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGk7XG5cdFx0XHR2YXIgbGVuID0gYXV0b3NpemVzRWxlbXMubGVuZ3RoO1xuXHRcdFx0aWYobGVuKXtcblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdFx0Zm9yKDsgaSA8IGxlbjsgaSsrKXtcblx0XHRcdFx0XHRnZXRTaXplRWxlbWVudChhdXRvc2l6ZXNFbGVtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMgPSBkZWJvdW5jZSh1cGRhdGVFbGVtZW50c1NpemVzKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRfOiBmdW5jdGlvbigpe1xuXHRcdFx0XHRhdXRvc2l6ZXNFbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmF1dG9zaXplc0NsYXNzKTtcblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyk7XG5cdFx0XHR9LFxuXHRcdFx0Y2hlY2tFbGVtczogZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyxcblx0XHRcdHVwZGF0ZUVsZW06IGdldFNpemVFbGVtZW50XG5cdFx0fTtcblx0fSkoKTtcblxuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCl7XG5cdFx0aWYoIWluaXQuaSAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKXtcblx0XHRcdGluaXQuaSA9IHRydWU7XG5cdFx0XHRhdXRvU2l6ZXIuXygpO1xuXHRcdFx0bG9hZGVyLl8oKTtcblx0XHR9XG5cdH07XG5cblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdGlmKGxhenlTaXplc0NmZy5pbml0KXtcblx0XHRcdGluaXQoKTtcblx0XHR9XG5cdH0pO1xuXG5cdGxhenlzaXplcyA9IHtcblx0XHQvKipcblx0XHQgKiBAdHlwZSB7IExhenlTaXplc0NvbmZpZ1BhcnRpYWwgfVxuXHRcdCAqL1xuXHRcdGNmZzogbGF6eVNpemVzQ2ZnLFxuXHRcdGF1dG9TaXplcjogYXV0b1NpemVyLFxuXHRcdGxvYWRlcjogbG9hZGVyLFxuXHRcdGluaXQ6IGluaXQsXG5cdFx0dVA6IHVwZGF0ZVBvbHlmaWxsLFxuXHRcdGFDOiBhZGRDbGFzcyxcblx0XHRyQzogcmVtb3ZlQ2xhc3MsXG5cdFx0aEM6IGhhc0NsYXNzLFxuXHRcdGZpcmU6IHRyaWdnZXJFdmVudCxcblx0XHRnVzogZ2V0V2lkdGgsXG5cdFx0ckFGOiByQUYsXG5cdH07XG5cblx0cmV0dXJuIGxhenlzaXplcztcbn1cbikpO1xuIiwiLyohIG1lZGl1bS16b29tIDEuMS4wIHwgTUlUIExpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb20gKi9cbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPWV8fHNlbGYpLm1lZGl1bVpvb209dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0xO3Q8YXJndW1lbnRzLmxlbmd0aDt0Kyspe3ZhciBvPWFyZ3VtZW50c1t0XTtmb3IodmFyIG4gaW4gbylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobyxuKSYmKGVbbl09b1tuXSl9cmV0dXJuIGV9LHQ9ZnVuY3Rpb24oZSl7cmV0dXJuXCJJTUdcIj09PWUudGFnTmFtZX0sbz1mdW5jdGlvbihlKXtyZXR1cm4gZSYmMT09PWUubm9kZVR5cGV9LG49ZnVuY3Rpb24oZSl7cmV0dXJuXCIuc3ZnXCI9PT0oZS5jdXJyZW50U3JjfHxlLnNyYykuc3Vic3RyKC00KS50b0xvd2VyQ2FzZSgpfSxpPWZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gQXJyYXkuaXNBcnJheShlKT9lLmZpbHRlcih0KTpmdW5jdGlvbihlKXtyZXR1cm4gTm9kZUxpc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoZSl9KGUpP1tdLnNsaWNlLmNhbGwoZSkuZmlsdGVyKHQpOm8oZSk/W2VdLmZpbHRlcih0KTpcInN0cmluZ1wiPT10eXBlb2YgZT9bXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZSkpLmZpbHRlcih0KTpbXX1jYXRjaChlKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIHByb3ZpZGVkIHNlbGVjdG9yIGlzIGludmFsaWQuXFxuRXhwZWN0cyBhIENTUyBzZWxlY3RvciwgYSBOb2RlIGVsZW1lbnQsIGEgTm9kZUxpc3Qgb3IgYW4gYXJyYXkuXFxuU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb21cIil9fSxyPWZ1bmN0aW9uKGUpe3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIHQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLW92ZXJsYXlcIiksdC5zdHlsZS5iYWNrZ3JvdW5kPWUsdH0sZD1mdW5jdGlvbihlKXt2YXIgdD1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG89dC50b3Asbj10LmxlZnQsaT10LndpZHRoLHI9dC5oZWlnaHQsZD1lLmNsb25lTm9kZSgpLGE9d2luZG93LnBhZ2VZT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcHx8MCxtPXdpbmRvdy5wYWdlWE9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnR8fGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdHx8MDtyZXR1cm4gZC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKSxkLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIixkLnN0eWxlLnRvcD1vK2ErXCJweFwiLGQuc3R5bGUubGVmdD1uK20rXCJweFwiLGQuc3R5bGUud2lkdGg9aStcInB4XCIsZC5zdHlsZS5oZWlnaHQ9citcInB4XCIsZC5zdHlsZS50cmFuc2Zvcm09XCJcIixkfSxhPWZ1bmN0aW9uKHQsbyl7dmFyIG49ZSh7YnViYmxlczohMSxjYW5jZWxhYmxlOiExLGRldGFpbDp2b2lkIDB9LG8pO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudClyZXR1cm4gbmV3IEN1c3RvbUV2ZW50KHQsbik7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtyZXR1cm4gaS5pbml0Q3VzdG9tRXZlbnQodCxuLmJ1YmJsZXMsbi5jYW5jZWxhYmxlLG4uZGV0YWlsKSxpfTtyZXR1cm4gZnVuY3Rpb24oZSx0KXt2b2lkIDA9PT10JiYodD17fSk7dmFyIG89dC5pbnNlcnRBdDtpZihlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQpe3ZhciBuPWRvY3VtZW50LmhlYWR8fGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtpLnR5cGU9XCJ0ZXh0L2Nzc1wiLFwidG9wXCI9PT1vJiZuLmZpcnN0Q2hpbGQ/bi5pbnNlcnRCZWZvcmUoaSxuLmZpcnN0Q2hpbGQpOm4uYXBwZW5kQ2hpbGQoaSksaS5zdHlsZVNoZWV0P2kuc3R5bGVTaGVldC5jc3NUZXh0PWU6aS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlKSl9fShcIi5tZWRpdW0tem9vbS1vdmVybGF5e3Bvc2l0aW9uOmZpeGVkO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzO3dpbGwtY2hhbmdlOm9wYWNpdHl9Lm1lZGl1bS16b29tLS1vcGVuZWQgLm1lZGl1bS16b29tLW92ZXJsYXl7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20tb3V0O29wYWNpdHk6MX0ubWVkaXVtLXpvb20taW1hZ2V7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20taW47dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzIGN1YmljLWJlemllciguMiwwLC4yLDEpIWltcG9ydGFudH0ubWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlbnt2aXNpYmlsaXR5OmhpZGRlbn0ubWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZHtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjtjdXJzb3I6em9vbS1vdXQ7d2lsbC1jaGFuZ2U6dHJhbnNmb3JtfVwiKSxmdW5jdGlvbiB0KG0pe3ZhciBsPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxjPXdpbmRvdy5Qcm9taXNlfHxmdW5jdGlvbihlKXtmdW5jdGlvbiB0KCl7fWUodCx0KX0sdT1mdW5jdGlvbihlKXt2YXIgdD1lLnRhcmdldDt0IT09Tj8tMSE9PXguaW5kZXhPZih0KSYmdyh7dGFyZ2V0OnR9KTpFKCl9LHM9ZnVuY3Rpb24oKXtpZighQSYmay5vcmlnaW5hbCl7dmFyIGU9d2luZG93LnBhZ2VZT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcHx8MDtNYXRoLmFicyhTLWUpPlQuc2Nyb2xsT2Zmc2V0JiZzZXRUaW1lb3V0KEUsMTUwKX19LGY9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5rZXl8fGUua2V5Q29kZTtcIkVzY2FwZVwiIT09dCYmXCJFc2NcIiE9PXQmJjI3IT09dHx8RSgpfSxwPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LG49dDtpZih0LmJhY2tncm91bmQmJihOLnN0eWxlLmJhY2tncm91bmQ9dC5iYWNrZ3JvdW5kKSx0LmNvbnRhaW5lciYmdC5jb250YWluZXIgaW5zdGFuY2VvZiBPYmplY3QmJihuLmNvbnRhaW5lcj1lKHt9LFQuY29udGFpbmVyLHQuY29udGFpbmVyKSksdC50ZW1wbGF0ZSl7dmFyIGk9byh0LnRlbXBsYXRlKT90LnRlbXBsYXRlOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodC50ZW1wbGF0ZSk7bi50ZW1wbGF0ZT1pfXJldHVybiBUPWUoe30sVCxuKSx4LmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuZGlzcGF0Y2hFdmVudChhKFwibWVkaXVtLXpvb206dXBkYXRlXCIse2RldGFpbDp7em9vbTpqfX0pKX0pKSxqfSxnPWZ1bmN0aW9uKCl7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9O3JldHVybiB0KGUoe30sVCxvKSl9LHY9ZnVuY3Rpb24oKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCx0PUFycmF5KGUpLG89MDtvPGU7bysrKXRbb109YXJndW1lbnRzW29dO3ZhciBuPXQucmVkdWNlKChmdW5jdGlvbihlLHQpe3JldHVybltdLmNvbmNhdChlLGkodCkpfSksW10pO3JldHVybiBuLmZpbHRlcigoZnVuY3Rpb24oZSl7cmV0dXJuLTE9PT14LmluZGV4T2YoZSl9KSkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7eC5wdXNoKGUpLGUuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlXCIpfSkpLE8uZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIHQ9ZS50eXBlLG89ZS5saXN0ZW5lcixpPWUub3B0aW9ucztuLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuYWRkRXZlbnRMaXN0ZW5lcih0LG8saSl9KSl9KSksan0saD1mdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9QXJyYXkoZSksbz0wO288ZTtvKyspdFtvXT1hcmd1bWVudHNbb107ay56b29tZWQmJkUoKTt2YXIgbj10Lmxlbmd0aD4wP3QucmVkdWNlKChmdW5jdGlvbihlLHQpe3JldHVybltdLmNvbmNhdChlLGkodCkpfSksW10pOng7cmV0dXJuIG4uZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20taW1hZ2VcIiksZS5kaXNwYXRjaEV2ZW50KGEoXCJtZWRpdW0tem9vbTpkZXRhY2hcIix7ZGV0YWlsOnt6b29tOmp9fSkpfSkpLHg9eC5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVybi0xPT09bi5pbmRleE9mKGUpfSkpLGp9LHo9ZnVuY3Rpb24oZSx0KXt2YXIgbz1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06e307cmV0dXJuIHguZm9yRWFjaCgoZnVuY3Rpb24obil7bi5hZGRFdmVudExpc3RlbmVyKFwibWVkaXVtLXpvb206XCIrZSx0LG8pfSkpLE8ucHVzaCh7dHlwZTpcIm1lZGl1bS16b29tOlwiK2UsbGlzdGVuZXI6dCxvcHRpb25zOm99KSxqfSx5PWZ1bmN0aW9uKGUsdCl7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOnt9O3JldHVybiB4LmZvckVhY2goKGZ1bmN0aW9uKG4pe24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lZGl1bS16b29tOlwiK2UsdCxvKX0pKSxPPU8uZmlsdGVyKChmdW5jdGlvbihvKXtyZXR1cm4hKG8udHlwZT09PVwibWVkaXVtLXpvb206XCIrZSYmby5saXN0ZW5lci50b1N0cmluZygpPT09dC50b1N0cmluZygpKX0pKSxqfSxiPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LGk9dC50YXJnZXQscj1mdW5jdGlvbigpe3ZhciB0PXt3aWR0aDpkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsaGVpZ2h0OmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsbGVmdDowLHRvcDowLHJpZ2h0OjAsYm90dG9tOjB9LGk9dm9pZCAwLHI9dm9pZCAwO2lmKFQuY29udGFpbmVyKWlmKFQuY29udGFpbmVyIGluc3RhbmNlb2YgT2JqZWN0KWk9KHQ9ZSh7fSx0LFQuY29udGFpbmVyKSkud2lkdGgtdC5sZWZ0LXQucmlnaHQtMipULm1hcmdpbixyPXQuaGVpZ2h0LXQudG9wLXQuYm90dG9tLTIqVC5tYXJnaW47ZWxzZXt2YXIgZD0obyhULmNvbnRhaW5lcik/VC5jb250YWluZXI6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihULmNvbnRhaW5lcikpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGE9ZC53aWR0aCxtPWQuaGVpZ2h0LGw9ZC5sZWZ0LGM9ZC50b3A7dD1lKHt9LHQse3dpZHRoOmEsaGVpZ2h0Om0sbGVmdDpsLHRvcDpjfSl9aT1pfHx0LndpZHRoLTIqVC5tYXJnaW4scj1yfHx0LmhlaWdodC0yKlQubWFyZ2luO3ZhciB1PWsuem9vbWVkSGR8fGsub3JpZ2luYWwscz1uKHUpP2k6dS5uYXR1cmFsV2lkdGh8fGksZj1uKHUpP3I6dS5uYXR1cmFsSGVpZ2h0fHxyLHA9dS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxnPXAudG9wLHY9cC5sZWZ0LGg9cC53aWR0aCx6PXAuaGVpZ2h0LHk9TWF0aC5taW4oTWF0aC5tYXgoaCxzKSxpKS9oLGI9TWF0aC5taW4oTWF0aC5tYXgoeixmKSxyKS96LEU9TWF0aC5taW4oeSxiKSx3PVwic2NhbGUoXCIrRStcIikgdHJhbnNsYXRlM2QoXCIrKChpLWgpLzItditULm1hcmdpbit0LmxlZnQpL0UrXCJweCwgXCIrKChyLXopLzItZytULm1hcmdpbit0LnRvcCkvRStcInB4LCAwKVwiO2suem9vbWVkLnN0eWxlLnRyYW5zZm9ybT13LGsuem9vbWVkSGQmJihrLnpvb21lZEhkLnN0eWxlLnRyYW5zZm9ybT13KX07cmV0dXJuIG5ldyBjKChmdW5jdGlvbihlKXtpZihpJiYtMT09PXguaW5kZXhPZihpKSllKGopO2Vsc2V7aWYoay56b29tZWQpZShqKTtlbHNle2lmKGkpay5vcmlnaW5hbD1pO2Vsc2V7aWYoISh4Lmxlbmd0aD4wKSlyZXR1cm4gdm9pZCBlKGopO3ZhciB0PXg7ay5vcmlnaW5hbD10WzBdfWlmKGsub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChhKFwibWVkaXVtLXpvb206b3BlblwiLHtkZXRhaWw6e3pvb206an19KSksUz13aW5kb3cucGFnZVlPZmZzZXR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B8fGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wfHwwLEE9ITAsay56b29tZWQ9ZChrLm9yaWdpbmFsKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKE4pLFQudGVtcGxhdGUpe3ZhciBuPW8oVC50ZW1wbGF0ZSk/VC50ZW1wbGF0ZTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFQudGVtcGxhdGUpO2sudGVtcGxhdGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxrLnRlbXBsYXRlLmFwcGVuZENoaWxkKG4uY29udGVudC5jbG9uZU5vZGUoITApKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGsudGVtcGxhdGUpfWlmKGsub3JpZ2luYWwucGFyZW50RWxlbWVudCYmXCJQSUNUVVJFXCI9PT1rLm9yaWdpbmFsLnBhcmVudEVsZW1lbnQudGFnTmFtZSYmay5vcmlnaW5hbC5jdXJyZW50U3JjJiYoay56b29tZWQuc3JjPWsub3JpZ2luYWwuY3VycmVudFNyYyksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChrLnpvb21lZCksd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS0tb3BlbmVkXCIpfSkpLGsub3JpZ2luYWwuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1oaWRkZW5cIiksay56b29tZWQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksay56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsRSksay56b29tZWQuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwoZnVuY3Rpb24gdCgpe0E9ITEsay56b29tZWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIix0KSxrLm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQoYShcIm1lZGl1bS16b29tOm9wZW5lZFwiLHtkZXRhaWw6e3pvb206an19KSksZShqKX0pKSxrLm9yaWdpbmFsLmdldEF0dHJpYnV0ZShcImRhdGEtem9vbS1zcmNcIikpe2suem9vbWVkSGQ9ay56b29tZWQuY2xvbmVOb2RlKCksay56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNzZXRcIiksay56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzaXplc1wiKSxrLnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcImxvYWRpbmdcIiksay56b29tZWRIZC5zcmM9ay56b29tZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS16b29tLXNyY1wiKSxrLnpvb21lZEhkLm9uZXJyb3I9ZnVuY3Rpb24oKXtjbGVhckludGVydmFsKG0pLGNvbnNvbGUud2FybihcIlVuYWJsZSB0byByZWFjaCB0aGUgem9vbSBpbWFnZSB0YXJnZXQgXCIray56b29tZWRIZC5zcmMpLGsuem9vbWVkSGQ9bnVsbCxyKCl9O3ZhciBtPXNldEludGVydmFsKChmdW5jdGlvbigpe2suem9vbWVkSGQuY29tcGxldGUmJihjbGVhckludGVydmFsKG0pLGsuem9vbWVkSGQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksay56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixFKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGsuem9vbWVkSGQpLHIoKSl9KSwxMCl9ZWxzZSBpZihrLm9yaWdpbmFsLmhhc0F0dHJpYnV0ZShcInNyY3NldFwiKSl7ay56b29tZWRIZD1rLnpvb21lZC5jbG9uZU5vZGUoKSxrLnpvb21lZEhkLnJlbW92ZUF0dHJpYnV0ZShcInNpemVzXCIpLGsuem9vbWVkSGQucmVtb3ZlQXR0cmlidXRlKFwibG9hZGluZ1wiKTt2YXIgbD1rLnpvb21lZEhkLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsKGZ1bmN0aW9uKCl7ay56b29tZWRIZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLGwpLGsuem9vbWVkSGQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksay56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixFKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGsuem9vbWVkSGQpLHIoKX0pKX1lbHNlIHIoKX19fSkpfSxFPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBjKChmdW5jdGlvbihlKXtpZighQSYmay5vcmlnaW5hbCl7QT0hMCxkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtZWRpdW0tem9vbS0tb3BlbmVkXCIpLGsuem9vbWVkLnN0eWxlLnRyYW5zZm9ybT1cIlwiLGsuem9vbWVkSGQmJihrLnpvb21lZEhkLnN0eWxlLnRyYW5zZm9ybT1cIlwiKSxrLnRlbXBsYXRlJiYoay50ZW1wbGF0ZS5zdHlsZS50cmFuc2l0aW9uPVwib3BhY2l0eSAxNTBtc1wiLGsudGVtcGxhdGUuc3R5bGUub3BhY2l0eT0wKSxrLm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQoYShcIm1lZGl1bS16b29tOmNsb3NlXCIse2RldGFpbDp7em9vbTpqfX0pKSxrLnpvb21lZC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLChmdW5jdGlvbiB0KCl7ay5vcmlnaW5hbC5jbGFzc0xpc3QucmVtb3ZlKFwibWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlblwiKSxkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGsuem9vbWVkKSxrLnpvb21lZEhkJiZkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGsuem9vbWVkSGQpLGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoTiksay56b29tZWQuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIiksay50ZW1wbGF0ZSYmZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChrLnRlbXBsYXRlKSxBPSExLGsuem9vbWVkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsdCksay5vcmlnaW5hbC5kaXNwYXRjaEV2ZW50KGEoXCJtZWRpdW0tem9vbTpjbG9zZWRcIix7ZGV0YWlsOnt6b29tOmp9fSkpLGsub3JpZ2luYWw9bnVsbCxrLnpvb21lZD1udWxsLGsuem9vbWVkSGQ9bnVsbCxrLnRlbXBsYXRlPW51bGwsZShqKX0pKX1lbHNlIGUoail9KSl9LHc9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1lLnRhcmdldDtyZXR1cm4gay5vcmlnaW5hbD9FKCk6Yih7dGFyZ2V0OnR9KX0sTD1mdW5jdGlvbigpe3JldHVybiBUfSxIPWZ1bmN0aW9uKCl7cmV0dXJuIHh9LEM9ZnVuY3Rpb24oKXtyZXR1cm4gay5vcmlnaW5hbH0seD1bXSxPPVtdLEE9ITEsUz0wLFQ9bCxrPXtvcmlnaW5hbDpudWxsLHpvb21lZDpudWxsLHpvb21lZEhkOm51bGwsdGVtcGxhdGU6bnVsbH07XCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChtKT9UPW06KG18fFwic3RyaW5nXCI9PXR5cGVvZiBtKSYmdihtKSxUPWUoe21hcmdpbjowLGJhY2tncm91bmQ6XCIjZmZmXCIsc2Nyb2xsT2Zmc2V0OjQwLGNvbnRhaW5lcjpudWxsLHRlbXBsYXRlOm51bGx9LFQpO3ZhciBOPXIoVC5iYWNrZ3JvdW5kKTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix1KSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIixmKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIscyksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixFKTt2YXIgaj17b3BlbjpiLGNsb3NlOkUsdG9nZ2xlOncsdXBkYXRlOnAsY2xvbmU6ZyxhdHRhY2g6dixkZXRhY2g6aCxvbjp6LG9mZjp5LGdldE9wdGlvbnM6TCxnZXRJbWFnZXM6SCxnZXRab29tZWRJbWFnZTpDfTtyZXR1cm4gan19KSk7XG4iLCIvKiBnbG9iYWwgZm9sbG93U29jaWFsTWVkaWEgbWVudURyb3Bkb3duIGxvY2FsU3RvcmFnZSAqL1xyXG5cclxuLy8gbGliXHJcbmltcG9ydCAnbGF6eXNpemVzJ1xyXG5cclxuLy8gaW1wb3J0IGxvYWRTY3JpcHQgZnJvbSAnLi91dGlsL2xvYWQtc2NyaXB0J1xyXG5pbXBvcnQgdXJsUmVnZXhwIGZyb20gJy4vdXRpbC91cmwtcmVndWxhci1leHByZXNzaW9uJ1xyXG5pbXBvcnQgZG9jU2VsZWN0b3JBbGwgZnJvbSAnLi91dGlsL2RvY3VtZW50LXF1ZXJ5LXNlbGVjdG9yLWFsbCdcclxuXHJcbmNvbnN0IHNpbXBseVNldHVwID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxyXG4gIGNvbnN0IGRvY3VtZW50Qm9keSA9IGRvY3VtZW50LmJvZHlcclxuXHJcbiAgLyogTWVudSBEcm9wRG93blxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBjb25zdCBkcm9wRG93bk1lbnUgPSAoKSA9PiB7XHJcbiAgICAvLyBDaGVja2luZyBpZiB0aGUgdmFyaWFibGUgZXhpc3RzIGFuZCBpZiBpdCBpcyBhbiBvYmplY3RcclxuICAgIGlmICh0eXBlb2YgbWVudURyb3Bkb3duICE9PSAnb2JqZWN0JyB8fCBtZW51RHJvcGRvd24gPT09IG51bGwpIHJldHVyblxyXG5cclxuICAgIC8vIGNoZWNrIGlmIHRoZSBib3ggZm9yIHRoZSBtZW51IGV4aXN0c1xyXG4gICAgY29uc3QgJGRyb3Bkb3duTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1kcm9wZG93bi1tZW51JylcclxuICAgIGlmICghJGRyb3Bkb3duTWVudSkgcmV0dXJuXHJcblxyXG4gICAgT2JqZWN0LmVudHJpZXMobWVudURyb3Bkb3duKS5mb3JFYWNoKChbbmFtZSwgdXJsXSkgPT4ge1xyXG4gICAgICBpZiAobmFtZSAhPT0gJ3N0cmluZycgJiYgIXVybFJlZ2V4cCh1cmwpKSByZXR1cm5cclxuXHJcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcclxuICAgICAgbGluay5ocmVmID0gdXJsXHJcbiAgICAgIGxpbmsuY2xhc3NMaXN0ID0gJ2Ryb3Bkb3duLWl0ZW0gYmxvY2sgcHktMiBsZWFkaW5nLXRpZ2h0IHB4LTUgaG92ZXI6dGV4dC1wcmltYXJ5J1xyXG4gICAgICBsaW5rLmlubmVyVGV4dCA9IG5hbWVcclxuXHJcbiAgICAgICRkcm9wZG93bk1lbnUuYXBwZW5kQ2hpbGQobGluaylcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBkcm9wRG93bk1lbnUoKVxyXG5cclxuICAvKiBTb2NpYWwgTWVkaWFcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgY29uc3Qgc29jaWFsTWVkaWEgPSAoKSA9PiB7XHJcbiAgICAvLyBDaGVja2luZyBpZiB0aGUgdmFyaWFibGUgZXhpc3RzIGFuZCBpZiBpdCBpcyBhbiBvYmplY3RcclxuICAgIGlmICh0eXBlb2YgZm9sbG93U29jaWFsTWVkaWEgIT09ICdvYmplY3QnIHx8IGZvbGxvd1NvY2lhbE1lZGlhID09PSBudWxsKSByZXR1cm5cclxuXHJcbiAgICAvLyBjaGVjayBpZiB0aGUgYm94IGZvciB0aGUgbWVudSBleGlzdHNcclxuICAgIGNvbnN0ICRzb2NpYWxNZWRpYSA9IGRvY1NlbGVjdG9yQWxsKCcuanMtc29jaWFsLW1lZGlhJylcclxuICAgIGlmICghJHNvY2lhbE1lZGlhLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgbGlua0VsZW1lbnQgPSBlbGVtZW50ID0+IHtcclxuICAgICAgT2JqZWN0LmVudHJpZXMoZm9sbG93U29jaWFsTWVkaWEpLmZvckVhY2goKFtuYW1lLCB1cmxUaXRsZV0pID0+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB1cmxUaXRsZVswXVxyXG5cclxuICAgICAgICAvLyBUaGUgdXJsIGlzIGJlaW5nIHZhbGlkYXRlZCBpZiBpdCBpcyBmYWxzZSBpdCByZXR1cm5zXHJcbiAgICAgICAgaWYgKCF1cmxSZWdleHAodXJsKSkgcmV0dXJuXHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcclxuICAgICAgICBsaW5rLmhyZWYgPSB1cmxcclxuICAgICAgICBsaW5rLnRpdGxlID0gdXJsVGl0bGVbMV1cclxuICAgICAgICBsaW5rLmNsYXNzTGlzdCA9ICdwLTIgaW5saW5lLWJsb2NrIGhvdmVyOm9wYWNpdHktNzAnXHJcbiAgICAgICAgbGluay50YXJnZXQgPSAnX2JsYW5rJ1xyXG4gICAgICAgIGxpbmsucmVsID0gJ25vb3BlbmVyIG5vcmVmZXJyZXInXHJcbiAgICAgICAgbGluay5pbm5lckhUTUwgPSBgPHN2ZyBjbGFzcz1cImljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi0ke25hbWV9XCI+PC91c2U+PC9zdmc+YFxyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmspXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgJHNvY2lhbE1lZGlhLmZvckVhY2gobGlua0VsZW1lbnQpXHJcbiAgfVxyXG5cclxuICBzb2NpYWxNZWRpYSgpXHJcblxyXG4gIC8qICBUb2dnbGUgbW9kYWxcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgLypjb25zdCBzaW1wbHlNb2RhbCA9ICgpID0+IHtcclxuICAgIGNvbnN0ICRtb2RhbHMgPSBkb2NTZWxlY3RvckFsbCgnLmpzLW1vZGFsJylcclxuICAgIGNvbnN0ICRtb2RhbEJ1dHRvbnMgPSBkb2NTZWxlY3RvckFsbCgnLmpzLW1vZGFsLWJ1dHRvbicpXHJcbiAgICBjb25zdCAkbW9kYWxDbG9zZXMgPSBkb2NTZWxlY3RvckFsbCgnLmpzLW1vZGFsLWNsb3NlJylcclxuXHJcbiAgICAvLyBNb2RhbCBDbGljayBPcGVuXHJcbiAgICBpZiAoISRtb2RhbEJ1dHRvbnMubGVuZ3RoKSByZXR1cm5cclxuICAgICRtb2RhbEJ1dHRvbnMuZm9yRWFjaCgkZWwgPT4gJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3Blbk1vZGFsKCRlbC5kYXRhc2V0LnRhcmdldCkpKVxyXG5cclxuICAgIC8vIE1vZGFsIENsaWNrIENsb3NlXHJcbiAgICBpZiAoISRtb2RhbENsb3Nlcy5sZW5ndGgpIHJldHVyblxyXG4gICAgJG1vZGFsQ2xvc2VzLmZvckVhY2goZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZU1vZGFscygpKSlcclxuXHJcbiAgICBjb25zdCBvcGVuTW9kYWwgPSB0YXJnZXQgPT4ge1xyXG4gICAgICBkb2N1bWVudEJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLW1lbnUnKVxyXG4gICAgICBjb25zdCAkdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KVxyXG4gICAgICByb290RWwuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJylcclxuICAgICAgJHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb3NlTW9kYWxzID0gKCkgPT4ge1xyXG4gICAgICByb290RWwuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3ctaGlkZGVuJylcclxuICAgICAgJG1vZGFscy5mb3JFYWNoKCRlbCA9PiAkZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJykpXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICBjb25zdCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50XHJcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgY2xvc2VNb2RhbHMoKVxyXG4gICAgICAgIC8vIGNsb3NlRHJvcGRvd25zKClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHNpbXBseU1vZGFsKClcclxuICAqL1xyXG5cclxuICAvKiBIZWFkZXIgVHJhbnNwYXJlbmN5XHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGNvbnN0IGhlYWRlclRyYW5zcGFyZW5jeSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGhhc0NvdmVyID0gZG9jdW1lbnRCb2R5LmNsb3Nlc3QoJy5oYXMtY292ZXInKVxyXG4gICAgY29uc3QgJGpzSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWhlYWRlcicpXHJcblxyXG4gICAgaWYgKGRvY3VtZW50Qm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWhlYWQtc3RhY2tlZCcpKSByZXR1cm5cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBsYXN0U2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZXHJcblxyXG4gICAgICBpZiAobGFzdFNjcm9sbFkgPiA1KSB7XHJcbiAgICAgICAgJGpzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NoYWRvdy1oZWFkZXInLCAnaGVhZGVyLWJnJylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkanNIZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hhZG93LWhlYWRlcicsICdoZWFkZXItYmcnKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWhhc0NvdmVyKSByZXR1cm5cclxuXHJcbiAgICAgIGxhc3RTY3JvbGxZID49IDIwID8gZG9jdW1lbnRCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhlYWQtdHJhbnNwYXJlbnQnKSA6IGRvY3VtZW50Qm9keS5jbGFzc0xpc3QuYWRkKCdpcy1oZWFkLXRyYW5zcGFyZW50JylcclxuICAgIH0sIHsgcGFzc2l2ZTogdHJ1ZSB9KVxyXG4gIH1cclxuXHJcbiAgaGVhZGVyVHJhbnNwYXJlbmN5KClcclxuXHJcbiAgLyogRGFyayBNb2RlXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGNvbnN0IGRhcmtNb2RlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgJHRvZ2dsZURhcmtNb2RlID0gZG9jU2VsZWN0b3JBbGwoJy5qcy1kYXJrLW1vZGUnKVxyXG5cclxuICAgIGlmICghJHRvZ2dsZURhcmtNb2RlLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgJHRvZ2dsZURhcmtNb2RlLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgIGlmICghcm9vdEVsLmNsYXNzTGlzdC5jb250YWlucygnZGFyaycpKSB7XHJcbiAgICAgICAgcm9vdEVsLmNsYXNzTGlzdC5hZGQoJ2RhcmsnKVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS50aGVtZSA9ICdkYXJrJ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvb3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJylcclxuICAgICAgICBsb2NhbFN0b3JhZ2UudGhlbWUgPSAnbGlnaHQnXHJcbiAgICAgIH1cclxuICAgIH0pKVxyXG4gIH1cclxuXHJcbiAgZGFya01vZGUoKVxyXG5cclxuICAvKiBEcm9wRG93biBUb2dnbGVcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgY29uc3QgZHJvcERvd25NZW51VG9nZ2xlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZHJvcGRvd25zID0gZG9jU2VsZWN0b3JBbGwoJy5kcm9wZG93bjpub3QoLmlzLWhvdmVyYWJsZSknKVxyXG5cclxuICAgIGlmICghZHJvcGRvd25zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgZHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKCdpcy1hY3RpdmUnKVxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtbWVudScpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGNsb3NlRHJvcGRvd25zID0gKCkgPT4gZHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VEcm9wZG93bnMpXHJcbiAgfVxyXG5cclxuICBkcm9wRG93bk1lbnVUb2dnbGUoKVxyXG5cclxuICAvKiBUb2dnbGUgTWVudVxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudS10b2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGRvY3VtZW50Qm9keS5jbGFzc0xpc3QudG9nZ2xlKCdoYXMtbWVudScpXHJcbiAgfSlcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNpbXBseVNldHVwKVxyXG4iLCIvKiBnbG9iYWwgcHJpc21KcyAqL1xyXG5cclxuaW1wb3J0ICcuL21haW4nXHJcblxyXG5pbXBvcnQgbWVkaXVtWm9vbSBmcm9tICdtZWRpdW0tem9vbSdcclxuXHJcbmltcG9ydCBsb2FkU2NyaXB0IGZyb20gJy4vdXRpbC9sb2FkLXNjcmlwdCdcclxuaW1wb3J0IGRvY1NlbGVjdG9yQWxsIGZyb20gJy4vdXRpbC9kb2N1bWVudC1xdWVyeS1zZWxlY3Rvci1hbGwnXHJcblxyXG5jb25zdCBzaW1wbHlQb3N0ID0gKCkgPT4ge1xyXG4gIC8qIEFsbCBWaWRlbyBSZXNwb25zaXZlXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGNvbnN0IHZpZGVvUmVzcG9uc2l2ZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNlbGVjdG9ycyA9IFtcclxuICAgICAgJ2lmcmFtZVtzcmMqPVwicGxheWVyLnZpbWVvLmNvbVwiXScsXHJcbiAgICAgICdpZnJhbWVbc3JjKj1cImRhaWx5bW90aW9uLmNvbVwiXScsXHJcbiAgICAgICdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tXCJdJyxcclxuICAgICAgJ2lmcmFtZVtzcmMqPVwieW91dHViZS1ub2Nvb2tpZS5jb21cIl0nLFxyXG4gICAgICAnaWZyYW1lW3NyYyo9XCJwbGF5ZXIudHdpdGNoLnR2XCJdJyxcclxuICAgICAgJ2lmcmFtZVtzcmMqPVwia2lja3N0YXJ0ZXIuY29tXCJdW3NyYyo9XCJ2aWRlby5odG1sXCJdJ1xyXG4gICAgXVxyXG5cclxuICAgIGNvbnN0ICRpZnJhbWVzID0gZG9jU2VsZWN0b3JBbGwoc2VsZWN0b3JzLmpvaW4oJywnKSlcclxuXHJcbiAgICBpZiAoISRpZnJhbWVzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgJGlmcmFtZXMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2FzcGVjdC12aWRlbycsICd3LWZ1bGwnKVxyXG4gICAgICAvLyBjb25zdCBwYXJlbnRGb3JWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgIC8vIHBhcmVudEZvclZpZGVvLmNsYXNzTmFtZSA9ICd2aWRlby1yZXNwb25zaXZlJ1xyXG4gICAgICAvLyBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwYXJlbnRGb3JWaWRlbywgZWwpXHJcbiAgICAgIC8vIHBhcmVudEZvclZpZGVvLmFwcGVuZENoaWxkKGVsKVxyXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2hlaWdodCcpXHJcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnd2lkdGgnKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHZpZGVvUmVzcG9uc2l2ZSgpXHJcblxyXG4gIC8qIG1lZGl1bS16b29tXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIGNvbnN0IG1lZGl1bVpvb21JbWcgPSAoKSA9PiB7XHJcbiAgICBkb2NTZWxlY3RvckFsbCgnLnBvc3QtYm9keSBpbWcnKS5mb3JFYWNoKGVsID0+ICFlbC5jbG9zZXN0KCdhJykgJiYgZWwuY2xhc3NMaXN0LmFkZCgnc2ltcGx5LXpvb20nKSlcclxuXHJcbiAgICBtZWRpdW1ab29tKCcuc2ltcGx5LXpvb20nLCB7XHJcbiAgICAgIG1hcmdpbjogMjAsXHJcbiAgICAgIGJhY2tncm91bmQ6ICdoc2xhKDAsMCUsMTAwJSwuODUpJ1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG1lZGl1bVpvb21JbWcoKVxyXG5cclxuICAvKiBDb3B5IExpbmtcclxuICAvKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2xpcGJvYXJkL3dyaXRlVGV4dCNleGFtcGxlc1xyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgY29uc3QgY29weUxpbmsgPSAoKSA9PiB7XHJcbiAgICBjb25zdCAkbGlua3MgPSBkb2NTZWxlY3RvckFsbCgnLmpzLWNvcHktbGluaycpXHJcblxyXG4gICAgaWYgKCEkbGlua3MubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICAkbGlua3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICAgY29uc3Qgc2hvcnRMaW5rSW5kaWNhdG9yID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc2hvcnRsaW5rLWluZGljYXRvcicpXHJcblxyXG4gICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChpdGVtLmhyZWYpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHNob3J0TGlua0luZGljYXRvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBzaG9ydExpbmtJbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyksIDQwMDApXHJcbiAgICB9KSlcclxuICB9XHJcblxyXG4gIGNvcHlMaW5rKClcclxuXHJcbiAgLyogR2FsbGVyeSBDYXJkXHJcbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gIC8vIGNvbnN0IHJlc2l6ZUltYWdlc0luR2FsbGVyaWVzID0gKCkgPT4ge1xyXG4gIC8vICAgY29uc3QgJGdhbGxlcnlJbWcgPSBkb2NTZWxlY3RvckFsbCgnLmtnLWdhbGxlcnktaW1hZ2UgPiBpbWcnKVxyXG5cclxuICAvLyAgIGlmICghJGdhbGxlcnlJbWcubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgLy8gICAkZ2FsbGVyeUltZy5mb3JFYWNoKGltYWdlID0+IHtcclxuICAvLyAgICAgY29uc3QgY29udGFpbmVyID0gaW1hZ2UuY2xvc2VzdCgnLmtnLWdhbGxlcnktaW1hZ2UnKVxyXG4gIC8vICAgICBjb25zdCB3aWR0aCA9IGltYWdlLmF0dHJpYnV0ZXMud2lkdGgudmFsdWVcclxuICAvLyAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuYXR0cmlidXRlcy5oZWlnaHQudmFsdWVcclxuICAvLyAgICAgY29uc3QgcmF0aW8gPSB3aWR0aCAvIGhlaWdodFxyXG4gIC8vICAgICBjb250YWluZXIuc3R5bGUuZmxleCA9IHJhdGlvICsgJyAxIDAlJ1xyXG4gIC8vICAgfSlcclxuICAvLyB9XHJcblxyXG4gIC8vIHJlc2l6ZUltYWdlc0luR2FsbGVyaWVzKClcclxuXHJcbiAgLyogaGlnaGxpZ2h0IHByaXNtanNcclxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgaWYgKGRvY1NlbGVjdG9yQWxsKCdjb2RlW2NsYXNzKj1sYW5ndWFnZS1dJykubGVuZ3RoICYmIHR5cGVvZiBwcmlzbUpzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgbG9hZFNjcmlwdChwcmlzbUpzKVxyXG4gIH1cclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNpbXBseVBvc3QpXHJcbiIsImV4cG9ydCBkZWZhdWx0IChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQpID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgMClcclxuIiwiZXhwb3J0IGRlZmF1bHQgKHNyYywgY2FsbGJhY2spID0+IHtcclxuICBjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcclxuICBzY3JpcHRFbGVtZW50LnNyYyA9IHNyY1xyXG4gIHNjcmlwdEVsZW1lbnQuZGVmZXIgPSB0cnVlXHJcbiAgc2NyaXB0RWxlbWVudC5hc3luYyA9IHRydWVcclxuXHJcbiAgY2FsbGJhY2sgJiYgc2NyaXB0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2FsbGJhY2spXHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IHVybCA9PiAvXihodHRwcz86XFwvXFwvKT8oW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkoW1xcL1xcdyBcXCtcXC4tXSopKlxcLz8kLy50ZXN0KHVybCkgLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcbiJdfQ==

//# sourceMappingURL=map/post.js.map
