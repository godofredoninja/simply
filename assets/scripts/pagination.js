(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */

( function( global, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

function EvEmitter() {}

let proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // set events hash
  let events = this._events = this._events || {};
  // set listeners array
  let listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( !listeners.includes( listener ) ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  let onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  let index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice( 0 );
  args = args || [];
  // once stuff
  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( let listener of listeners ) {
    let isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
  return this;
};

return EvEmitter;

} ) );

},{}],3:[function(require,module,exports){
/**
 * Fizzy UI utils v3.0.0
 * MIT license
 */

( function( global, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( global );
  } else {
    // browser global
    global.fizzyUIUtils = factory( global );
  }

}( this, function factory( global ) {

let utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  return Object.assign( a, b );
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  // use object if already an array
  if ( Array.isArray( obj ) ) return obj;

  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) return [];

  let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  // convert nodeList to array
  if ( isArrayLike ) return [ ...obj ];

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  let index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( elem.matches( selector ) ) return elem;
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );

  return elems
    // check that elem is an actual element
    .filter( ( elem ) => elem instanceof HTMLElement )
    .reduce( ( ffElems, elem ) => {
      // add elem if no selector
      if ( !selector ) {
        ffElems.push( elem );
        return ffElems;
      }
      // filter & find items if we have a selector
      // filter
      if ( elem.matches( selector ) ) {
        ffElems.push( elem );
      }
      // find children
      let childElems = elem.querySelectorAll( selector );
      // concat childElems to filterFound array
      ffElems = ffElems.concat( ...childElems );
      return ffElems;
    }, [] );
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  let method = _class.prototype[ methodName ];
  let timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    clearTimeout( this[ timeoutName ] );

    let args = arguments;
    this[ timeoutName ] = setTimeout( () => {
      method.apply( this, args );
      delete this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( onDocReady ) {
  let readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( onDocReady );
  } else {
    document.addEventListener( 'DOMContentLoaded', onDocReady );
  }
};

// ----- htmlInit ----- //

// http://bit.ly/3oYLusc
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  } ).toLowerCase();
};

let console = global.console;

// allow user to initialize classes via [data-namespace] or .js-namespace class
// htmlInit( Widget, 'widgetName' )
// options are parsed from data-namespace-options
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    let dashedNamespace = utils.toDashed( namespace );
    let dataAttr = 'data-' + dashedNamespace;
    let dataAttrElems = document.querySelectorAll( `[${dataAttr}]` );
    let jQuery = global.jQuery;

    [ ...dataAttrElems ].forEach( ( elem ) => {
      let attr = elem.getAttribute( dataAttr );
      let options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( `Error parsing ${dataAttr} on ${elem.className}: ${error}` );
        }
        return;
      }
      // initialize
      let instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    } );

  } );
};

// -----  ----- //

return utils;

} ) );

},{}],4:[function(require,module,exports){
// button
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./core'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window,
        window.InfiniteScroll,
        window.fizzyUIUtils,
    );
  }

}( window, function factory( window, InfiniteScroll, utils ) {

// -------------------------- InfiniteScrollButton -------------------------- //

class InfiniteScrollButton {
  constructor( element, infScroll ) {
    this.element = element;
    this.infScroll = infScroll;
    // events
    this.clickHandler = this.onClick.bind( this );
    this.element.addEventListener( 'click', this.clickHandler );
    infScroll.on( 'request', this.disable.bind( this ) );
    infScroll.on( 'load', this.enable.bind( this ) );
    infScroll.on( 'error', this.hide.bind( this ) );
    infScroll.on( 'last', this.hide.bind( this ) );
  }

  onClick( event ) {
    event.preventDefault();
    this.infScroll.loadNextPage();
  }

  enable() {
    this.element.removeAttribute('disabled');
  }

  disable() {
    this.element.disabled = 'disabled';
  }

  hide() {
    this.element.style.display = 'none';
  }

  destroy() {
    this.element.removeEventListener( 'click', this.clickHandler );
  }

}

// -------------------------- InfiniteScroll methods -------------------------- //

// InfiniteScroll.defaults.button = null;

InfiniteScroll.create.button = function() {
  let buttonElem = utils.getQueryElement( this.options.button );
  if ( buttonElem ) {
    this.button = new InfiniteScrollButton( buttonElem, this );
  }
};

InfiniteScroll.destroy.button = function() {
  if ( this.button ) this.button.destroy();
};

// --------------------------  -------------------------- //

InfiniteScroll.Button = InfiniteScrollButton;

return InfiniteScroll;

} ) );

},{"./core":5,"fizzy-ui-utils":3}],5:[function(require,module,exports){
// core
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('ev-emitter'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    window.InfiniteScroll = factory(
        window,
        window.EvEmitter,
        window.fizzyUIUtils,
    );
  }

}( window, function factory( window, EvEmitter, utils ) {

let jQuery = window.jQuery;
// internal store of all InfiniteScroll intances
let instances = {};

function InfiniteScroll( element, options ) {
  let queryElem = utils.getQueryElement( element );

  if ( !queryElem ) {
    console.error( 'Bad element for InfiniteScroll: ' + ( queryElem || element ) );
    return;
  }
  element = queryElem;
  // do not initialize twice on same element
  if ( element.infiniteScrollGUID ) {
    let instance = instances[ element.infiniteScrollGUID ];
    instance.option( options );
    return instance;
  }

  this.element = element;
  // options
  this.options = { ...InfiniteScroll.defaults };
  this.option( options );
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  this.create();
}

// defaults
InfiniteScroll.defaults = {
  // path: null,
  // hideNav: null,
  // debug: false,
};

// create & destroy methods
InfiniteScroll.create = {};
InfiniteScroll.destroy = {};

let proto = InfiniteScroll.prototype;
// inherit EvEmitter
Object.assign( proto, EvEmitter.prototype );

// --------------------------  -------------------------- //

// globally unique identifiers
let GUID = 0;

proto.create = function() {
  // create core
  // add id for InfiniteScroll.data
  let id = this.guid = ++GUID;
  this.element.infiniteScrollGUID = id; // expando
  instances[ id ] = this; // associate via id
  // properties
  this.pageIndex = 1; // default to first page
  this.loadCount = 0;
  this.updateGetPath();
  // bail if getPath not set, or returns falsey #776
  let hasPath = this.getPath && this.getPath();
  if ( !hasPath ) {
    console.error('Disabling InfiniteScroll');
    return;
  }
  this.updateGetAbsolutePath();
  this.log( 'initialized', [ this.element.className ] );
  this.callOnInit();
  // create features
  for ( let method in InfiniteScroll.create ) {
    InfiniteScroll.create[ method ].call( this );
  }
};

proto.option = function( opts ) {
  Object.assign( this.options, opts );
};

// call onInit option, used for binding events on init
proto.callOnInit = function() {
  let onInit = this.options.onInit;
  if ( onInit ) {
    onInit.call( this, this );
  }
};

// ----- events ----- //

proto.dispatchEvent = function( type, event, args ) {
  this.log( type, args );
  let emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );
  // trigger jQuery event
  if ( !jQuery || !this.$element ) {
    return;
  }
  // namespace jQuery event
  type += '.infiniteScroll';
  let $event = type;
  if ( event ) {
    // create jQuery event
    /* eslint-disable-next-line new-cap */
    let jQEvent = jQuery.Event( event );
    jQEvent.type = type;
    $event = jQEvent;
  }
  this.$element.trigger( $event, args );
};

let loggers = {
  initialized: ( className ) => `on ${className}`,
  request: ( path ) => `URL: ${path}`,
  load: ( response, path ) => `${response.title || ''}. URL: ${path}`,
  error: ( error, path ) => `${error}. URL: ${path}`,
  append: ( response, path, items ) => `${items.length} items. URL: ${path}`,
  last: ( response, path ) => `URL: ${path}`,
  history: ( title, path ) => `URL: ${path}`,
  pageIndex: function( index, origin ) {
    return `current page determined to be: ${index} from ${origin}`;
  },
};

// log events
proto.log = function( type, args ) {
  if ( !this.options.debug ) return;

  let message = `[InfiniteScroll] ${type}`;
  let logger = loggers[ type ];
  if ( logger ) message += '. ' + logger.apply( this, args );
  console.log( message );
};

// -------------------------- methods used amoung features -------------------------- //

proto.updateMeasurements = function() {
  this.windowHeight = window.innerHeight;
  let rect = this.element.getBoundingClientRect();
  this.top = rect.top + window.scrollY;
};

proto.updateScroller = function() {
  let elementScroll = this.options.elementScroll;
  if ( !elementScroll ) {
    // default, use window
    this.scroller = window;
    return;
  }
  // if true, set to element, otherwise use option
  this.scroller = elementScroll === true ? this.element :
    utils.getQueryElement( elementScroll );
  if ( !this.scroller ) {
    throw new Error(`Unable to find elementScroll: ${elementScroll}`);
  }
};

// -------------------------- page path -------------------------- //

proto.updateGetPath = function() {
  let optPath = this.options.path;
  if ( !optPath ) {
    console.error(`InfiniteScroll path option required. Set as: ${optPath}`);
    return;
  }
  // function
  let type = typeof optPath;
  if ( type == 'function' ) {
    this.getPath = optPath;
    return;
  }
  // template string: '/pages/{{#}}.html'
  let templateMatch = type == 'string' && optPath.match('{{#}}');
  if ( templateMatch ) {
    this.updateGetPathTemplate( optPath );
    return;
  }
  // selector: '.next-page-selector'
  this.updateGetPathSelector( optPath );
};

proto.updateGetPathTemplate = function( optPath ) {
  // set getPath with template string
  this.getPath = () => {
    let nextIndex = this.pageIndex + 1;
    return optPath.replace( '{{#}}', nextIndex );
  };
  // get pageIndex from location
  // convert path option into regex to look for pattern in location
  // escape query (?) in url, allows for parsing GET parameters
  let regexString = optPath
    .replace( /(\\\?|\?)/, '\\?' )
    .replace( '{{#}}', '(\\d\\d?\\d?)' );
  let templateRe = new RegExp( regexString );
  let match = location.href.match( templateRe );

  if ( match ) {
    this.pageIndex = parseInt( match[1], 10 );
    this.log( 'pageIndex', [ this.pageIndex, 'template string' ] );
  }
};

let pathRegexes = [
  // WordPress & Tumblr - example.com/page/2
  // Jekyll - example.com/page2
  /^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/,
  // Drupal - example.com/?page=1
  /^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/,
  // catch all, last occurence of a number
  /(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/,
];

// try matching href to pathRegexes patterns
let getPathParts = InfiniteScroll.getPathParts = function( href ) {
  if ( !href ) return;
  for ( let regex of pathRegexes ) {
    let match = href.match( regex );
    if ( match ) {
      let [ , begin, index, end ] = match;
      return { begin, index, end };
    }
  }
};

proto.updateGetPathSelector = function( optPath ) {
  // parse href of link: '.next-page-link'
  let hrefElem = document.querySelector( optPath );
  if ( !hrefElem ) {
    console.error(`Bad InfiniteScroll path option. Next link not found: ${optPath}`);
    return;
  }

  let href = hrefElem.getAttribute('href');
  let pathParts = getPathParts( href );
  if ( !pathParts ) {
    console.error(`InfiniteScroll unable to parse next link href: ${href}`);
    return;
  }

  let { begin, index, end } = pathParts;
  this.isPathSelector = true; // flag for checkLastPage()
  this.getPath = () => begin + ( this.pageIndex + 1 ) + end;
  // get pageIndex from href
  this.pageIndex = parseInt( index, 10 ) - 1;
  this.log( 'pageIndex', [ this.pageIndex, 'next link' ] );
};

proto.updateGetAbsolutePath = function() {
  let path = this.getPath();
  // path doesn't start with http or /
  let isAbsolute = path.match( /^http/ ) || path.match( /^\// );
  if ( isAbsolute ) {
    this.getAbsolutePath = this.getPath;
    return;
  }

  let { pathname } = location;
  // query parameter #829. example.com/?pg=2
  let isQuery = path.match( /^\?/ );
  // /foo/bar/index.html => /foo/bar
  let directory = pathname.substring( 0, pathname.lastIndexOf('/') );
  let pathStart = isQuery ? pathname : directory + '/';

  this.getAbsolutePath = () => pathStart + this.getPath();
};

// -------------------------- nav -------------------------- //

// hide navigation
InfiniteScroll.create.hideNav = function() {
  let nav = utils.getQueryElement( this.options.hideNav );
  if ( !nav ) return;

  nav.style.display = 'none';
  this.nav = nav;
};

InfiniteScroll.destroy.hideNav = function() {
  if ( this.nav ) this.nav.style.display = '';
};

// -------------------------- destroy -------------------------- //

proto.destroy = function() {
  this.allOff(); // remove all event listeners
  // call destroy methods
  for ( let method in InfiniteScroll.destroy ) {
    InfiniteScroll.destroy[ method ].call( this );
  }

  delete this.element.infiniteScrollGUID;
  delete instances[ this.guid ];
  // remove jQuery data. #807
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'infiniteScroll' );
  }
};

// -------------------------- utilities -------------------------- //

// https://remysharp.com/2010/07/21/throttling-function-calls
InfiniteScroll.throttle = function( fn, threshold ) {
  threshold = threshold || 200;
  let last, timeout;

  return function() {
    let now = +new Date();
    let args = arguments;
    let trigger = () => {
      last = now;
      fn.apply( this, args );
    };
    if ( last && now < last + threshold ) {
      // hold on to it
      clearTimeout( timeout );
      timeout = setTimeout( trigger, threshold );
    } else {
      trigger();
    }
  };
};

InfiniteScroll.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  let id = elem && elem.infiniteScrollGUID;
  return id && instances[ id ];
};

// set internal jQuery, for Webpack + jQuery v3
InfiniteScroll.setJQuery = function( jqry ) {
  jQuery = jqry;
};

// -------------------------- setup -------------------------- //

utils.htmlInit( InfiniteScroll, 'infinite-scroll' );

// add noop _init method for jQuery Bridget. #768
proto._init = function() {};

let { jQueryBridget } = window;
if ( jQuery && jQueryBridget ) {
  jQueryBridget( 'infiniteScroll', InfiniteScroll, jQuery );
}

// --------------------------  -------------------------- //

return InfiniteScroll;

} ) );

},{"ev-emitter":2,"fizzy-ui-utils":3}],6:[function(require,module,exports){
// history
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./core'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window,
        window.InfiniteScroll,
        window.fizzyUIUtils,
    );
  }

}( window, function factory( window, InfiniteScroll, utils ) {

let proto = InfiniteScroll.prototype;

Object.assign( InfiniteScroll.defaults, {
  history: 'replace',
  // historyTitle: false,
} );

let link = document.createElement('a');

// ----- create/destroy ----- //

InfiniteScroll.create.history = function() {
  if ( !this.options.history ) return;

  // check for same origin
  link.href = this.getAbsolutePath();
  // MS Edge does not have origin on link
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12236493/
  let linkOrigin = link.origin || link.protocol + '//' + link.host;
  let isSameOrigin = linkOrigin == location.origin;
  if ( !isSameOrigin ) {
    console.error( '[InfiniteScroll] cannot set history with different origin: ' +
      `${link.origin} on ${location.origin} . History behavior disabled.` );
    return;
  }

  // two ways to handle changing history
  if ( this.options.append ) {
    this.createHistoryAppend();
  } else {
    this.createHistoryPageLoad();
  }
};

proto.createHistoryAppend = function() {
  this.updateMeasurements();
  this.updateScroller();
  // array of scroll positions of appended pages
  this.scrollPages = [
    // first page
    {
      top: 0,
      path: location.href,
      title: document.title,
    },
  ];
  this.scrollPage = this.scrollPages[0];
  // events
  this.scrollHistoryHandler = this.onScrollHistory.bind( this );
  this.unloadHandler = this.onUnload.bind( this );
  this.scroller.addEventListener( 'scroll', this.scrollHistoryHandler );
  this.on( 'append', this.onAppendHistory );
  this.bindHistoryAppendEvents( true );
};

proto.bindHistoryAppendEvents = function( isBind ) {
  let addRemove = isBind ? 'addEventListener' : 'removeEventListener';
  this.scroller[ addRemove ]( 'scroll', this.scrollHistoryHandler );
  window[ addRemove ]( 'unload', this.unloadHandler );
};

proto.createHistoryPageLoad = function() {
  this.on( 'load', this.onPageLoadHistory );
};

InfiniteScroll.destroy.history =
proto.destroyHistory = function() {
  let isHistoryAppend = this.options.history && this.options.append;
  if ( isHistoryAppend ) {
    this.bindHistoryAppendEvents( false );
  }
};

// ----- append history ----- //

proto.onAppendHistory = function( response, path, items ) {
  // do not proceed if no items. #779
  if ( !items || !items.length ) return;

  let firstItem = items[0];
  let elemScrollY = this.getElementScrollY( firstItem );
  // resolve path
  link.href = path;
  // add page data to hash
  this.scrollPages.push({
    top: elemScrollY,
    path: link.href,
    title: response.title,
  });
};

proto.getElementScrollY = function( elem ) {
  if ( this.options.elementScroll ) {
    return elem.offsetTop - this.top;
  } else {
    let rect = elem.getBoundingClientRect();
    return rect.top + window.scrollY;
  }
};

proto.onScrollHistory = function() {
  // cycle through positions, find biggest without going over
  let scrollPage = this.getClosestScrollPage();
  // set history if changed
  if ( scrollPage != this.scrollPage ) {
    this.scrollPage = scrollPage;
    this.setHistory( scrollPage.title, scrollPage.path );
  }
};

utils.debounceMethod( InfiniteScroll, 'onScrollHistory', 150 );

proto.getClosestScrollPage = function() {
  let scrollViewY;
  if ( this.options.elementScroll ) {
    scrollViewY = this.scroller.scrollTop + this.scroller.clientHeight / 2;
  } else {
    scrollViewY = window.scrollY + this.windowHeight / 2;
  }

  let scrollPage;
  for ( let page of this.scrollPages ) {
    if ( page.top >= scrollViewY ) break;

    scrollPage = page;
  }
  return scrollPage;
};

proto.setHistory = function( title, path ) {
  let optHistory = this.options.history;
  let historyMethod = optHistory && history[ optHistory + 'State' ];
  if ( !historyMethod ) return;

  history[ optHistory + 'State' ]( null, title, path );
  if ( this.options.historyTitle ) document.title = title;
  this.dispatchEvent( 'history', null, [ title, path ] );
};

// scroll to top to prevent initial scroll-reset after page refresh
// https://stackoverflow.com/a/18633915/182183
proto.onUnload = function() {
  if ( this.scrollPage.top === 0 ) return;

  // calculate where scroll position would be on refresh
  let scrollY = window.scrollY - this.scrollPage.top + this.top;
  // disable scroll event before setting scroll #679
  this.destroyHistory();
  scrollTo( 0, scrollY );
};

// ----- load history ----- //

// update URL
proto.onPageLoadHistory = function( response, path ) {
  this.setHistory( response.title, path );
};

// --------------------------  -------------------------- //

return InfiniteScroll;

} ) );

},{"./core":5,"fizzy-ui-utils":3}],7:[function(require,module,exports){
/*!
 * Infinite Scroll v4.0.1
 * Automatically add next page
 *
 * Licensed GPLv3 for open source use
 * or Infinite Scroll Commercial License for commercial use
 *
 * https://infinite-scroll.com
 * Copyright 2018-2020 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('./core'),
        require('./page-load'),
        require('./scroll-watch'),
        require('./history'),
        require('./button'),
        require('./status'),
    );
  }

} )( window, function factory( InfiniteScroll ) {
  return InfiniteScroll;
} );

},{"./button":4,"./core":5,"./history":6,"./page-load":8,"./scroll-watch":9,"./status":10}],8:[function(require,module,exports){
// page-load
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./core'),
    );
  } else {
    // browser global
    factory(
        window,
        window.InfiniteScroll,
    );
  }

}( window, function factory( window, InfiniteScroll ) {

let proto = InfiniteScroll.prototype;

Object.assign( InfiniteScroll.defaults, {
  // append: false,
  loadOnScroll: true,
  checkLastPage: true,
  responseBody: 'text',
  domParseResponse: true,
  // prefill: false,
  // outlayer: null,
} );

InfiniteScroll.create.pageLoad = function() {
  this.canLoad = true;
  this.on( 'scrollThreshold', this.onScrollThresholdLoad );
  this.on( 'load', this.checkLastPage );
  if ( this.options.outlayer ) {
    this.on( 'append', this.onAppendOutlayer );
  }
};

proto.onScrollThresholdLoad = function() {
  if ( this.options.loadOnScroll ) this.loadNextPage();
};

let domParser = new DOMParser();

proto.loadNextPage = function() {
  if ( this.isLoading || !this.canLoad ) return;

  let { responseBody, domParseResponse, fetchOptions } = this.options;
  let path = this.getAbsolutePath();
  this.isLoading = true;
  if ( typeof fetchOptions == 'function' ) fetchOptions = fetchOptions();

  let fetchPromise = fetch( path, fetchOptions )
    .then( ( response ) => {
      if ( !response.ok ) {
        let error = new Error( response.statusText );
        this.onPageError( error, path, response );
        return { response };
      }

      return response[ responseBody ]().then( ( body ) => {
        let canDomParse = responseBody == 'text' && domParseResponse;
        if ( canDomParse ) {
          body = domParser.parseFromString( body, 'text/html' );
        }
        if ( response.status == 204 ) {
          this.lastPageReached( body, path );
          return { body, response };
        } else {
          return this.onPageLoad( body, path, response );
        }
      } );
    } )
    .catch( ( error ) => {
      this.onPageError( error, path );
    } );

  this.dispatchEvent( 'request', null, [ path, fetchPromise ] );

  return fetchPromise;
};

proto.onPageLoad = function( body, path, response ) {
  // done loading if not appending
  if ( !this.options.append ) {
    this.isLoading = false;
  }
  this.pageIndex++;
  this.loadCount++;
  this.dispatchEvent( 'load', null, [ body, path, response ] );
  return this.appendNextPage( body, path, response );
};

proto.appendNextPage = function( body, path, response ) {
  let { append, responseBody, domParseResponse } = this.options;
  // do not append json
  let isDocument = responseBody == 'text' && domParseResponse;
  if ( !isDocument || !append ) return { body, response };

  let items = body.querySelectorAll( append );
  let promiseValue = { body, response, items };
  // last page hit if no items. #840
  if ( !items || !items.length ) {
    this.lastPageReached( body, path );
    return promiseValue;
  }

  let fragment = getItemsFragment( items );
  let appendReady = () => {
    this.appendItems( items, fragment );
    this.isLoading = false;
    this.dispatchEvent( 'append', null, [ body, path, items, response ] );
    return promiseValue;
  };

  // TODO add hook for option to trigger appendReady
  if ( this.options.outlayer ) {
    return this.appendOutlayerItems( fragment, appendReady );
  } else {
    return appendReady();
  }
};

proto.appendItems = function( items, fragment ) {
  if ( !items || !items.length ) return;

  // get fragment if not provided
  fragment = fragment || getItemsFragment( items );
  refreshScripts( fragment );
  this.element.appendChild( fragment );
};

function getItemsFragment( items ) {
  // add items to fragment
  let fragment = document.createDocumentFragment();
  if ( items ) fragment.append( ...items );
  return fragment;
}

// replace <script>s with copies so they load
// <script>s added by InfiniteScroll will not load
// similar to https://stackoverflow.com/questions/610995
function refreshScripts( fragment ) {
  let scripts = fragment.querySelectorAll('script');
  for ( let script of scripts ) {
    let freshScript = document.createElement('script');
    // copy attributes
    let attrs = script.attributes;
    for ( let attr of attrs ) {
      freshScript.setAttribute( attr.name, attr.value );
    }
    // copy inner script code. #718, #782
    freshScript.innerHTML = script.innerHTML;
    script.parentNode.replaceChild( freshScript, script );
  }
}

// ----- outlayer ----- //

proto.appendOutlayerItems = function( fragment, appendReady ) {
  let imagesLoaded = InfiniteScroll.imagesLoaded || window.imagesLoaded;
  if ( !imagesLoaded ) {
    console.error('[InfiniteScroll] imagesLoaded required for outlayer option');
    this.isLoading = false;
    return;
  }
  // append once images loaded
  return new Promise( function( resolve ) {
    imagesLoaded( fragment, function() {
      let bodyResponse = appendReady();
      resolve( bodyResponse );
    } );
  } );
};

proto.onAppendOutlayer = function( response, path, items ) {
  this.options.outlayer.appended( items );
};

// ----- checkLastPage ----- //

// check response for next element
proto.checkLastPage = function( body, path ) {
  let { checkLastPage, path: pathOpt } = this.options;
  if ( !checkLastPage ) return;

  // if path is function, check if next path is truthy
  if ( typeof pathOpt == 'function' ) {
    let nextPath = this.getPath();
    if ( !nextPath ) {
      this.lastPageReached( body, path );
      return;
    }
  }
  // get selector from checkLastPage or path option
  let selector;
  if ( typeof checkLastPage == 'string' ) {
    selector = checkLastPage;
  } else if ( this.isPathSelector ) {
    // path option is selector string
    selector = pathOpt;
  }
  // check last page for selector
  // bail if no selector or not document response
  if ( !selector || !body.querySelector ) return;

  // check if response has selector
  let nextElem = body.querySelector( selector );
  if ( !nextElem ) this.lastPageReached( body, path );
};

proto.lastPageReached = function( body, path ) {
  this.canLoad = false;
  this.dispatchEvent( 'last', null, [ body, path ] );
};

// ----- error ----- //

proto.onPageError = function( error, path, response ) {
  this.isLoading = false;
  this.canLoad = false;
  this.dispatchEvent( 'error', null, [ error, path, response ] );
  return error;
};

// -------------------------- prefill -------------------------- //

InfiniteScroll.create.prefill = function() {
  if ( !this.options.prefill ) return;

  let append = this.options.append;
  if ( !append ) {
    console.error(`append option required for prefill. Set as :${append}`);
    return;
  }
  this.updateMeasurements();
  this.updateScroller();
  this.isPrefilling = true;
  this.on( 'append', this.prefill );
  this.once( 'error', this.stopPrefill );
  this.once( 'last', this.stopPrefill );
  this.prefill();
};

proto.prefill = function() {
  let distance = this.getPrefillDistance();
  this.isPrefilling = distance >= 0;
  if ( this.isPrefilling ) {
    this.log('prefill');
    this.loadNextPage();
  } else {
    this.stopPrefill();
  }
};

proto.getPrefillDistance = function() {
  // element scroll
  if ( this.options.elementScroll ) {
    return this.scroller.clientHeight - this.scroller.scrollHeight;
  }
  // window
  return this.windowHeight - this.element.clientHeight;
};

proto.stopPrefill = function() {
  this.log('stopPrefill');
  this.off( 'append', this.prefill );
};

// --------------------------  -------------------------- //

return InfiniteScroll;

} ) );

},{"./core":5}],9:[function(require,module,exports){
// scroll-watch
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./core'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window,
        window.InfiniteScroll,
        window.fizzyUIUtils,
    );
  }

}( window, function factory( window, InfiniteScroll, utils ) {

let proto = InfiniteScroll.prototype;

// default options
Object.assign( InfiniteScroll.defaults, {
  scrollThreshold: 400,
  // elementScroll: null,
} );

InfiniteScroll.create.scrollWatch = function() {
  // events
  this.pageScrollHandler = this.onPageScroll.bind( this );
  this.resizeHandler = this.onResize.bind( this );

  let scrollThreshold = this.options.scrollThreshold;
  let isEnable = scrollThreshold || scrollThreshold === 0;
  if ( isEnable ) this.enableScrollWatch();
};

InfiniteScroll.destroy.scrollWatch = function() {
  this.disableScrollWatch();
};

proto.enableScrollWatch = function() {
  if ( this.isScrollWatching ) return;

  this.isScrollWatching = true;
  this.updateMeasurements();
  this.updateScroller();
  // TODO disable after error?
  this.on( 'last', this.disableScrollWatch );
  this.bindScrollWatchEvents( true );
};

proto.disableScrollWatch = function() {
  if ( !this.isScrollWatching ) return;

  this.bindScrollWatchEvents( false );
  delete this.isScrollWatching;
};

proto.bindScrollWatchEvents = function( isBind ) {
  let addRemove = isBind ? 'addEventListener' : 'removeEventListener';
  this.scroller[ addRemove ]( 'scroll', this.pageScrollHandler );
  window[ addRemove ]( 'resize', this.resizeHandler );
};

proto.onPageScroll = InfiniteScroll.throttle( function() {
  let distance = this.getBottomDistance();
  if ( distance <= this.options.scrollThreshold ) {
    this.dispatchEvent('scrollThreshold');
  }
} );

proto.getBottomDistance = function() {
  let bottom, scrollY;
  if ( this.options.elementScroll ) {
    bottom = this.scroller.scrollHeight;
    scrollY = this.scroller.scrollTop + this.scroller.clientHeight;
  } else {
    bottom = this.top + this.element.clientHeight;
    scrollY = window.scrollY + this.windowHeight;
  }
  return bottom - scrollY;
};

proto.onResize = function() {
  this.updateMeasurements();
};

utils.debounceMethod( InfiniteScroll, 'onResize', 150 );

// --------------------------  -------------------------- //

return InfiniteScroll;

} ) );

},{"./core":5,"fizzy-ui-utils":3}],10:[function(require,module,exports){
// status
( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('./core'),
        require('fizzy-ui-utils'),
    );
  } else {
    // browser global
    factory(
        window,
        window.InfiniteScroll,
        window.fizzyUIUtils,
    );
  }

}( window, function factory( window, InfiniteScroll, utils ) {

let proto = InfiniteScroll.prototype;

// InfiniteScroll.defaults.status = null;

InfiniteScroll.create.status = function() {
  let statusElem = utils.getQueryElement( this.options.status );
  if ( !statusElem ) return;

  // elements
  this.statusElement = statusElem;
  this.statusEventElements = {
    request: statusElem.querySelector('.infinite-scroll-request'),
    error: statusElem.querySelector('.infinite-scroll-error'),
    last: statusElem.querySelector('.infinite-scroll-last'),
  };
  // events
  this.on( 'request', this.showRequestStatus );
  this.on( 'error', this.showErrorStatus );
  this.on( 'last', this.showLastStatus );
  this.bindHideStatus('on');
};

proto.bindHideStatus = function( bindMethod ) {
  let hideEvent = this.options.append ? 'append' : 'load';
  this[ bindMethod ]( hideEvent, this.hideAllStatus );
};

proto.showRequestStatus = function() {
  this.showStatus('request');
};

proto.showErrorStatus = function() {
  this.showStatus('error');
};

proto.showLastStatus = function() {
  this.showStatus('last');
  // prevent last then append event race condition from showing last status #706
  this.bindHideStatus('off');
};

proto.showStatus = function( eventName ) {
  show( this.statusElement );
  this.hideStatusEventElements();
  let eventElem = this.statusEventElements[ eventName ];
  show( eventElem );
};

proto.hideAllStatus = function() {
  hide( this.statusElement );
  this.hideStatusEventElements();
};

proto.hideStatusEventElements = function() {
  for ( let type in this.statusEventElements ) {
    let eventElem = this.statusEventElements[ type ];
    hide( eventElem );
  }
};

// --------------------------  -------------------------- //

function hide( elem ) {
  setDisplay( elem, 'none' );
}

function show( elem ) {
  setDisplay( elem, 'block' );
}

function setDisplay( elem, value ) {
  if ( elem ) {
    elem.style.display = value;
  }
}

// --------------------------  -------------------------- //

return InfiniteScroll;

} ) );

},{"./core":5,"fizzy-ui-utils":3}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _infiniteScroll = _interopRequireDefault(require("infinite-scroll"));

(function (document) {
  // Next link Element
  var nextElement = document.querySelector('link[rel=next]');
  if (!nextElement) return; // Post Feed element

  var $feedElement = document.querySelector('.js-feed-entry');
  if (!$feedElement) return;
  var $viewMoreButton = document.querySelector('.load-more-btn'); // const $iconLoader = $viewMoreButton.querySelector('.icon')
  // const $label = $viewMoreButton.querySelector('.label')

  var infScroll = new _infiniteScroll.default($feedElement, {
    append: '.js-story',
    button: $viewMoreButton,
    history: false,
    debug: false,
    hideNav: '.pagination',
    path: '.pagination .older-posts'
  });
  infScroll.on('load', onPageLoad);

  function onPageLoad() {
    if (infScroll.loadCount === 1) {
      // after 3nd page loaded
      // disable loading on scroll
      infScroll.options.loadOnScroll = false; // show button

      $viewMoreButton.classList.add('flex');
      $viewMoreButton.classList.remove('hidden'); // remove event listener

      infScroll.off(onPageLoad);
    }
  } // infScroll.on('request', function () {
  //   $label.classList.add('hidden')
  //   $iconLoader.classList.remove('hidden')
  // })
  // infScroll.on('append', function () {
  //   $label.classList.remove('hidden')
  //   $iconLoader.classList.add('hidden')
  // })


  $viewMoreButton.addEventListener('click', function () {
    // load next page
    infScroll.loadNextPage(); // enable loading on scroll

    infScroll.options.loadOnScroll = true; // hide page

    this.classList.add('hidden');
  });
})(document);

},{"@babel/runtime/helpers/interopRequireDefault":1,"infinite-scroll":7}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvZXYtZW1pdHRlci9ldi1lbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2luZmluaXRlLXNjcm9sbC9qcy9idXR0b24uanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2NvcmUuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2luZmluaXRlLXNjcm9sbC9qcy9wYWdlLWxvYWQuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL3Njcm9sbC13YXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9pbmZpbml0ZS1zY3JvbGwvanMvc3RhdHVzLmpzIiwic3JjL2pzL3BhZ2luYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25YQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RHQTs7QUFFQSxDQUFDLFVBQVUsUUFBVixFQUFvQjtBQUNuQjtBQUNBLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixDQUFwQjtBQUNBLE1BQUksQ0FBQyxXQUFMLEVBQWtCLE9BSEMsQ0FLbkI7O0FBQ0EsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXJCO0FBQ0EsTUFBSSxDQUFDLFlBQUwsRUFBbUI7QUFFbkIsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXhCLENBVG1CLENBVW5CO0FBQ0E7O0FBRUEsTUFBTSxTQUFTLEdBQUcsSUFBSSx1QkFBSixDQUFtQixZQUFuQixFQUFpQztBQUNqRCxJQUFBLE1BQU0sRUFBRSxXQUR5QztBQUVqRCxJQUFBLE1BQU0sRUFBRSxlQUZ5QztBQUdqRCxJQUFBLE9BQU8sRUFBRSxLQUh3QztBQUlqRCxJQUFBLEtBQUssRUFBRSxLQUowQztBQUtqRCxJQUFBLE9BQU8sRUFBRSxhQUx3QztBQU1qRCxJQUFBLElBQUksRUFBRTtBQU4yQyxHQUFqQyxDQUFsQjtBQVNBLEVBQUEsU0FBUyxDQUFDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFVBQXJCOztBQUVBLFdBQVMsVUFBVCxHQUF1QjtBQUNyQixRQUFJLFNBQVMsQ0FBQyxTQUFWLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCO0FBQ0E7QUFDQSxNQUFBLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFlBQWxCLEdBQWlDLEtBQWpDLENBSDZCLENBSTdCOztBQUNBLE1BQUEsZUFBZSxDQUFDLFNBQWhCLENBQTBCLEdBQTFCLENBQThCLE1BQTlCO0FBQ0EsTUFBQSxlQUFlLENBQUMsU0FBaEIsQ0FBMEIsTUFBMUIsQ0FBaUMsUUFBakMsRUFONkIsQ0FPN0I7O0FBQ0EsTUFBQSxTQUFTLENBQUMsR0FBVixDQUFjLFVBQWQ7QUFDRDtBQUNGLEdBbkNrQixDQXFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEsRUFBQSxlQUFlLENBQUMsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVk7QUFDcEQ7QUFDQSxJQUFBLFNBQVMsQ0FBQyxZQUFWLEdBRm9ELENBR3BEOztBQUNBLElBQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsWUFBbEIsR0FBaUMsSUFBakMsQ0FKb0QsQ0FLcEQ7O0FBQ0EsU0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixRQUFuQjtBQUNELEdBUEQ7QUFRRCxDQXZERCxFQXVERyxRQXZESCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCIvKipcbiAqIEV2RW1pdHRlciB2Mi4xLjFcbiAqIExpbCcgZXZlbnQgZW1pdHRlclxuICogTUlUIExpY2Vuc2VcbiAqL1xuXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlMgLSBCcm93c2VyaWZ5LCBXZWJwYWNrXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZ2xvYmFsLkV2RW1pdHRlciA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oKSB7XG5cbmZ1bmN0aW9uIEV2RW1pdHRlcigpIHt9XG5cbmxldCBwcm90byA9IEV2RW1pdHRlci5wcm90b3R5cGU7XG5cbnByb3RvLm9uID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSByZXR1cm4gdGhpcztcblxuICAvLyBzZXQgZXZlbnRzIGhhc2hcbiAgbGV0IGV2ZW50cyA9IHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgLy8gc2V0IGxpc3RlbmVycyBhcnJheVxuICBsZXQgbGlzdGVuZXJzID0gZXZlbnRzWyBldmVudE5hbWUgXSA9IGV2ZW50c1sgZXZlbnROYW1lIF0gfHwgW107XG4gIC8vIG9ubHkgYWRkIG9uY2VcbiAgaWYgKCAhbGlzdGVuZXJzLmluY2x1ZGVzKCBsaXN0ZW5lciApICkge1xuICAgIGxpc3RlbmVycy5wdXNoKCBsaXN0ZW5lciApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vbmNlID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSByZXR1cm4gdGhpcztcblxuICAvLyBhZGQgZXZlbnRcbiAgdGhpcy5vbiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAvLyBzZXQgb25jZSBmbGFnXG4gIC8vIHNldCBvbmNlRXZlbnRzIGhhc2hcbiAgbGV0IG9uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzID0gdGhpcy5fb25jZUV2ZW50cyB8fCB7fTtcbiAgLy8gc2V0IG9uY2VMaXN0ZW5lcnMgb2JqZWN0XG4gIGxldCBvbmNlTGlzdGVuZXJzID0gb25jZUV2ZW50c1sgZXZlbnROYW1lIF0gPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSB8fCB7fTtcbiAgLy8gc2V0IGZsYWdcbiAgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXSA9IHRydWU7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vZmYgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSByZXR1cm4gdGhpcztcblxuICBsZXQgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZiggbGlzdGVuZXIgKTtcbiAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICBsaXN0ZW5lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5lbWl0RXZlbnQgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBhcmdzICkge1xuICBsZXQgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHJldHVybiB0aGlzO1xuXG4gIC8vIGNvcHkgb3ZlciB0byBhdm9pZCBpbnRlcmZlcmVuY2UgaWYgLm9mZigpIGluIGxpc3RlbmVyXG4gIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSggMCApO1xuICBhcmdzID0gYXJncyB8fCBbXTtcbiAgLy8gb25jZSBzdHVmZlxuICBsZXQgb25jZUxpc3RlbmVycyA9IHRoaXMuX29uY2VFdmVudHMgJiYgdGhpcy5fb25jZUV2ZW50c1sgZXZlbnROYW1lIF07XG5cbiAgZm9yICggbGV0IGxpc3RlbmVyIG9mIGxpc3RlbmVycyApIHtcbiAgICBsZXQgaXNPbmNlID0gb25jZUxpc3RlbmVycyAmJiBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdO1xuICAgIGlmICggaXNPbmNlICkge1xuICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyXG4gICAgICAvLyByZW1vdmUgYmVmb3JlIHRyaWdnZXIgdG8gcHJldmVudCByZWN1cnNpb25cbiAgICAgIHRoaXMub2ZmKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gICAgICAvLyB1bnNldCBvbmNlIGZsYWdcbiAgICAgIGRlbGV0ZSBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdO1xuICAgIH1cbiAgICAvLyB0cmlnZ2VyIGxpc3RlbmVyXG4gICAgbGlzdGVuZXIuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uYWxsT2ZmID0gZnVuY3Rpb24oKSB7XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHM7XG4gIGRlbGV0ZSB0aGlzLl9vbmNlRXZlbnRzO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnJldHVybiBFdkVtaXR0ZXI7XG5cbn0gKSApO1xuIiwiLyoqXG4gKiBGaXp6eSBVSSB1dGlscyB2My4wLjBcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuKCBmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCBnbG9iYWwgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGdsb2JhbC5maXp6eVVJVXRpbHMgPSBmYWN0b3J5KCBnbG9iYWwgKTtcbiAgfVxuXG59KCB0aGlzLCBmdW5jdGlvbiBmYWN0b3J5KCBnbG9iYWwgKSB7XG5cbmxldCB1dGlscyA9IHt9O1xuXG4vLyAtLS0tLSBleHRlbmQgLS0tLS0gLy9cblxuLy8gZXh0ZW5kcyBvYmplY3RzXG51dGlscy5leHRlbmQgPSBmdW5jdGlvbiggYSwgYiApIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oIGEsIGIgKTtcbn07XG5cbi8vIC0tLS0tIG1vZHVsbyAtLS0tLSAvL1xuXG51dGlscy5tb2R1bG8gPSBmdW5jdGlvbiggbnVtLCBkaXYgKSB7XG4gIHJldHVybiAoICggbnVtICUgZGl2ICkgKyBkaXYgKSAlIGRpdjtcbn07XG5cbi8vIC0tLS0tIG1ha2VBcnJheSAtLS0tLSAvL1xuXG4vLyB0dXJuIGVsZW1lbnQgb3Igbm9kZUxpc3QgaW50byBhbiBhcnJheVxudXRpbHMubWFrZUFycmF5ID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgLy8gdXNlIG9iamVjdCBpZiBhbHJlYWR5IGFuIGFycmF5XG4gIGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSByZXR1cm4gb2JqO1xuXG4gIC8vIHJldHVybiBlbXB0eSBhcnJheSBpZiB1bmRlZmluZWQgb3IgbnVsbC4gIzZcbiAgaWYgKCBvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQgKSByZXR1cm4gW107XG5cbiAgbGV0IGlzQXJyYXlMaWtlID0gdHlwZW9mIG9iaiA9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmxlbmd0aCA9PSAnbnVtYmVyJztcbiAgLy8gY29udmVydCBub2RlTGlzdCB0byBhcnJheVxuICBpZiAoIGlzQXJyYXlMaWtlICkgcmV0dXJuIFsgLi4ub2JqIF07XG5cbiAgLy8gYXJyYXkgb2Ygc2luZ2xlIGluZGV4XG4gIHJldHVybiBbIG9iaiBdO1xufTtcblxuLy8gLS0tLS0gcmVtb3ZlRnJvbSAtLS0tLSAvL1xuXG51dGlscy5yZW1vdmVGcm9tID0gZnVuY3Rpb24oIGFyeSwgb2JqICkge1xuICBsZXQgaW5kZXggPSBhcnkuaW5kZXhPZiggb2JqICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgYXJ5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZ2V0UGFyZW50IC0tLS0tIC8vXG5cbnV0aWxzLmdldFBhcmVudCA9IGZ1bmN0aW9uKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgd2hpbGUgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbSAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgaWYgKCBlbGVtLm1hdGNoZXMoIHNlbGVjdG9yICkgKSByZXR1cm4gZWxlbTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZ2V0UXVlcnlFbGVtZW50IC0tLS0tIC8vXG5cbi8vIHVzZSBlbGVtZW50IGFzIHNlbGVjdG9yIHN0cmluZ1xudXRpbHMuZ2V0UXVlcnlFbGVtZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsZW0gKTtcbiAgfVxuICByZXR1cm4gZWxlbTtcbn07XG5cbi8vIC0tLS0tIGhhbmRsZUV2ZW50IC0tLS0tIC8vXG5cbi8vIGVuYWJsZSAub250eXBlIHRvIHRyaWdnZXIgZnJvbSAuYWRkRXZlbnRMaXN0ZW5lciggZWxlbSwgJ3R5cGUnIClcbnV0aWxzLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBsZXQgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGZpbHRlckZpbmRFbGVtZW50cyAtLS0tLSAvL1xuXG51dGlscy5maWx0ZXJGaW5kRWxlbWVudHMgPSBmdW5jdGlvbiggZWxlbXMsIHNlbGVjdG9yICkge1xuICAvLyBtYWtlIGFycmF5IG9mIGVsZW1zXG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuXG4gIHJldHVybiBlbGVtc1xuICAgIC8vIGNoZWNrIHRoYXQgZWxlbSBpcyBhbiBhY3R1YWwgZWxlbWVudFxuICAgIC5maWx0ZXIoICggZWxlbSApID0+IGVsZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApXG4gICAgLnJlZHVjZSggKCBmZkVsZW1zLCBlbGVtICkgPT4ge1xuICAgICAgLy8gYWRkIGVsZW0gaWYgbm8gc2VsZWN0b3JcbiAgICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICAgICAgcmV0dXJuIGZmRWxlbXM7XG4gICAgICB9XG4gICAgICAvLyBmaWx0ZXIgJiBmaW5kIGl0ZW1zIGlmIHdlIGhhdmUgYSBzZWxlY3RvclxuICAgICAgLy8gZmlsdGVyXG4gICAgICBpZiAoIGVsZW0ubWF0Y2hlcyggc2VsZWN0b3IgKSApIHtcbiAgICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgICB9XG4gICAgICAvLyBmaW5kIGNoaWxkcmVuXG4gICAgICBsZXQgY2hpbGRFbGVtcyA9IGVsZW0ucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKTtcbiAgICAgIC8vIGNvbmNhdCBjaGlsZEVsZW1zIHRvIGZpbHRlckZvdW5kIGFycmF5XG4gICAgICBmZkVsZW1zID0gZmZFbGVtcy5jb25jYXQoIC4uLmNoaWxkRWxlbXMgKTtcbiAgICAgIHJldHVybiBmZkVsZW1zO1xuICAgIH0sIFtdICk7XG59O1xuXG4vLyAtLS0tLSBkZWJvdW5jZU1ldGhvZCAtLS0tLSAvL1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCA9IGZ1bmN0aW9uKCBfY2xhc3MsIG1ldGhvZE5hbWUsIHRocmVzaG9sZCApIHtcbiAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IDEwMDtcbiAgLy8gb3JpZ2luYWwgbWV0aG9kXG4gIGxldCBtZXRob2QgPSBfY2xhc3MucHJvdG90eXBlWyBtZXRob2ROYW1lIF07XG4gIGxldCB0aW1lb3V0TmFtZSA9IG1ldGhvZE5hbWUgKyAnVGltZW91dCc7XG5cbiAgX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdID0gZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KCB0aGlzWyB0aW1lb3V0TmFtZSBdICk7XG5cbiAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcbiAgICB0aGlzWyB0aW1lb3V0TmFtZSBdID0gc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgbWV0aG9kLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gICAgICBkZWxldGUgdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICB9LCB0aHJlc2hvbGQgKTtcbiAgfTtcbn07XG5cbi8vIC0tLS0tIGRvY1JlYWR5IC0tLS0tIC8vXG5cbnV0aWxzLmRvY1JlYWR5ID0gZnVuY3Rpb24oIG9uRG9jUmVhZHkgKSB7XG4gIGxldCByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgaWYgKCByZWFkeVN0YXRlID09ICdjb21wbGV0ZScgfHwgcmVhZHlTdGF0ZSA9PSAnaW50ZXJhY3RpdmUnICkge1xuICAgIC8vIGRvIGFzeW5jIHRvIGFsbG93IGZvciBvdGhlciBzY3JpcHRzIHRvIHJ1bi4gbWV0YWZpenp5L2ZsaWNraXR5IzQ0MVxuICAgIHNldFRpbWVvdXQoIG9uRG9jUmVhZHkgKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnRE9NQ29udGVudExvYWRlZCcsIG9uRG9jUmVhZHkgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gaHRtbEluaXQgLS0tLS0gLy9cblxuLy8gaHR0cDovL2JpdC5seS8zb1lMdXNjXG51dGlscy50b0Rhc2hlZCA9IGZ1bmN0aW9uKCBzdHIgKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSggLyguKShbQS1aXSkvZywgZnVuY3Rpb24oIG1hdGNoLCAkMSwgJDIgKSB7XG4gICAgcmV0dXJuICQxICsgJy0nICsgJDI7XG4gIH0gKS50b0xvd2VyQ2FzZSgpO1xufTtcblxubGV0IGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZTtcblxuLy8gYWxsb3cgdXNlciB0byBpbml0aWFsaXplIGNsYXNzZXMgdmlhIFtkYXRhLW5hbWVzcGFjZV0gb3IgLmpzLW5hbWVzcGFjZSBjbGFzc1xuLy8gaHRtbEluaXQoIFdpZGdldCwgJ3dpZGdldE5hbWUnIClcbi8vIG9wdGlvbnMgYXJlIHBhcnNlZCBmcm9tIGRhdGEtbmFtZXNwYWNlLW9wdGlvbnNcbnV0aWxzLmh0bWxJbml0ID0gZnVuY3Rpb24oIFdpZGdldENsYXNzLCBuYW1lc3BhY2UgKSB7XG4gIHV0aWxzLmRvY1JlYWR5KCBmdW5jdGlvbigpIHtcbiAgICBsZXQgZGFzaGVkTmFtZXNwYWNlID0gdXRpbHMudG9EYXNoZWQoIG5hbWVzcGFjZSApO1xuICAgIGxldCBkYXRhQXR0ciA9ICdkYXRhLScgKyBkYXNoZWROYW1lc3BhY2U7XG4gICAgbGV0IGRhdGFBdHRyRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCBgWyR7ZGF0YUF0dHJ9XWAgKTtcbiAgICBsZXQgalF1ZXJ5ID0gZ2xvYmFsLmpRdWVyeTtcblxuICAgIFsgLi4uZGF0YUF0dHJFbGVtcyBdLmZvckVhY2goICggZWxlbSApID0+IHtcbiAgICAgIGxldCBhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoIGRhdGFBdHRyICk7XG4gICAgICBsZXQgb3B0aW9ucztcbiAgICAgIHRyeSB7XG4gICAgICAgIG9wdGlvbnMgPSBhdHRyICYmIEpTT04ucGFyc2UoIGF0dHIgKTtcbiAgICAgIH0gY2F0Y2ggKCBlcnJvciApIHtcbiAgICAgICAgLy8gbG9nIGVycm9yLCBkbyBub3QgaW5pdGlhbGl6ZVxuICAgICAgICBpZiAoIGNvbnNvbGUgKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvciggYEVycm9yIHBhcnNpbmcgJHtkYXRhQXR0cn0gb24gJHtlbGVtLmNsYXNzTmFtZX06ICR7ZXJyb3J9YCApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgIGxldCBpbnN0YW5jZSA9IG5ldyBXaWRnZXRDbGFzcyggZWxlbSwgb3B0aW9ucyApO1xuICAgICAgLy8gbWFrZSBhdmFpbGFibGUgdmlhICQoKS5kYXRhKCduYW1lc3BhY2UnKVxuICAgICAgaWYgKCBqUXVlcnkgKSB7XG4gICAgICAgIGpRdWVyeS5kYXRhKCBlbGVtLCBuYW1lc3BhY2UsIGluc3RhbmNlICk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gIH0gKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gdXRpbHM7XG5cbn0gKSApO1xuIiwiLy8gYnV0dG9uXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgcmVxdWlyZSgnLi9jb3JlJyksXG4gICAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgd2luZG93LkluZmluaXRlU2Nyb2xsLFxuICAgICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEluZmluaXRlU2Nyb2xsLCB1dGlscyApIHtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSW5maW5pdGVTY3JvbGxCdXR0b24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuY2xhc3MgSW5maW5pdGVTY3JvbGxCdXR0b24ge1xuICBjb25zdHJ1Y3RvciggZWxlbWVudCwgaW5mU2Nyb2xsICkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pbmZTY3JvbGwgPSBpbmZTY3JvbGw7XG4gICAgLy8gZXZlbnRzXG4gICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLm9uQ2xpY2suYmluZCggdGhpcyApO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlciApO1xuICAgIGluZlNjcm9sbC5vbiggJ3JlcXVlc3QnLCB0aGlzLmRpc2FibGUuYmluZCggdGhpcyApICk7XG4gICAgaW5mU2Nyb2xsLm9uKCAnbG9hZCcsIHRoaXMuZW5hYmxlLmJpbmQoIHRoaXMgKSApO1xuICAgIGluZlNjcm9sbC5vbiggJ2Vycm9yJywgdGhpcy5oaWRlLmJpbmQoIHRoaXMgKSApO1xuICAgIGluZlNjcm9sbC5vbiggJ2xhc3QnLCB0aGlzLmhpZGUuYmluZCggdGhpcyApICk7XG4gIH1cblxuICBvbkNsaWNrKCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuaW5mU2Nyb2xsLmxvYWROZXh0UGFnZSgpO1xuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuZWxlbWVudC5kaXNhYmxlZCA9ICdkaXNhYmxlZCc7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIgKTtcbiAgfVxuXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEluZmluaXRlU2Nyb2xsIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gSW5maW5pdGVTY3JvbGwuZGVmYXVsdHMuYnV0dG9uID0gbnVsbDtcblxuSW5maW5pdGVTY3JvbGwuY3JlYXRlLmJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICBsZXQgYnV0dG9uRWxlbSA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggdGhpcy5vcHRpb25zLmJ1dHRvbiApO1xuICBpZiAoIGJ1dHRvbkVsZW0gKSB7XG4gICAgdGhpcy5idXR0b24gPSBuZXcgSW5maW5pdGVTY3JvbGxCdXR0b24oIGJ1dHRvbkVsZW0sIHRoaXMgKTtcbiAgfVxufTtcblxuSW5maW5pdGVTY3JvbGwuZGVzdHJveS5idXR0b24gPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmJ1dHRvbiApIHRoaXMuYnV0dG9uLmRlc3Ryb3koKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5JbmZpbml0ZVNjcm9sbC5CdXR0b24gPSBJbmZpbml0ZVNjcm9sbEJ1dHRvbjtcblxucmV0dXJuIEluZmluaXRlU2Nyb2xsO1xuXG59ICkgKTtcbiIsIi8vIGNvcmVcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICByZXF1aXJlKCdldi1lbWl0dGVyJyksXG4gICAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5JbmZpbml0ZVNjcm9sbCA9IGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIsIHV0aWxzICkge1xuXG5sZXQgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcbi8vIGludGVybmFsIHN0b3JlIG9mIGFsbCBJbmZpbml0ZVNjcm9sbCBpbnRhbmNlc1xubGV0IGluc3RhbmNlcyA9IHt9O1xuXG5mdW5jdGlvbiBJbmZpbml0ZVNjcm9sbCggZWxlbWVudCwgb3B0aW9ucyApIHtcbiAgbGV0IHF1ZXJ5RWxlbSA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbWVudCApO1xuXG4gIGlmICggIXF1ZXJ5RWxlbSApIHtcbiAgICBjb25zb2xlLmVycm9yKCAnQmFkIGVsZW1lbnQgZm9yIEluZmluaXRlU2Nyb2xsOiAnICsgKCBxdWVyeUVsZW0gfHwgZWxlbWVudCApICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQgPSBxdWVyeUVsZW07XG4gIC8vIGRvIG5vdCBpbml0aWFsaXplIHR3aWNlIG9uIHNhbWUgZWxlbWVudFxuICBpZiAoIGVsZW1lbnQuaW5maW5pdGVTY3JvbGxHVUlEICkge1xuICAgIGxldCBpbnN0YW5jZSA9IGluc3RhbmNlc1sgZWxlbWVudC5pbmZpbml0ZVNjcm9sbEdVSUQgXTtcbiAgICBpbnN0YW5jZS5vcHRpb24oIG9wdGlvbnMgKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAvLyBvcHRpb25zXG4gIHRoaXMub3B0aW9ucyA9IHsgLi4uSW5maW5pdGVTY3JvbGwuZGVmYXVsdHMgfTtcbiAgdGhpcy5vcHRpb24oIG9wdGlvbnMgKTtcbiAgLy8gYWRkIGpRdWVyeVxuICBpZiAoIGpRdWVyeSApIHtcbiAgICB0aGlzLiRlbGVtZW50ID0galF1ZXJ5KCB0aGlzLmVsZW1lbnQgKTtcbiAgfVxuXG4gIHRoaXMuY3JlYXRlKCk7XG59XG5cbi8vIGRlZmF1bHRzXG5JbmZpbml0ZVNjcm9sbC5kZWZhdWx0cyA9IHtcbiAgLy8gcGF0aDogbnVsbCxcbiAgLy8gaGlkZU5hdjogbnVsbCxcbiAgLy8gZGVidWc6IGZhbHNlLFxufTtcblxuLy8gY3JlYXRlICYgZGVzdHJveSBtZXRob2RzXG5JbmZpbml0ZVNjcm9sbC5jcmVhdGUgPSB7fTtcbkluZmluaXRlU2Nyb2xsLmRlc3Ryb3kgPSB7fTtcblxubGV0IHByb3RvID0gSW5maW5pdGVTY3JvbGwucHJvdG90eXBlO1xuLy8gaW5oZXJpdCBFdkVtaXR0ZXJcbk9iamVjdC5hc3NpZ24oIHByb3RvLCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnbG9iYWxseSB1bmlxdWUgaWRlbnRpZmllcnNcbmxldCBHVUlEID0gMDtcblxucHJvdG8uY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNyZWF0ZSBjb3JlXG4gIC8vIGFkZCBpZCBmb3IgSW5maW5pdGVTY3JvbGwuZGF0YVxuICBsZXQgaWQgPSB0aGlzLmd1aWQgPSArK0dVSUQ7XG4gIHRoaXMuZWxlbWVudC5pbmZpbml0ZVNjcm9sbEdVSUQgPSBpZDsgLy8gZXhwYW5kb1xuICBpbnN0YW5jZXNbIGlkIF0gPSB0aGlzOyAvLyBhc3NvY2lhdGUgdmlhIGlkXG4gIC8vIHByb3BlcnRpZXNcbiAgdGhpcy5wYWdlSW5kZXggPSAxOyAvLyBkZWZhdWx0IHRvIGZpcnN0IHBhZ2VcbiAgdGhpcy5sb2FkQ291bnQgPSAwO1xuICB0aGlzLnVwZGF0ZUdldFBhdGgoKTtcbiAgLy8gYmFpbCBpZiBnZXRQYXRoIG5vdCBzZXQsIG9yIHJldHVybnMgZmFsc2V5ICM3NzZcbiAgbGV0IGhhc1BhdGggPSB0aGlzLmdldFBhdGggJiYgdGhpcy5nZXRQYXRoKCk7XG4gIGlmICggIWhhc1BhdGggKSB7XG4gICAgY29uc29sZS5lcnJvcignRGlzYWJsaW5nIEluZmluaXRlU2Nyb2xsJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMudXBkYXRlR2V0QWJzb2x1dGVQYXRoKCk7XG4gIHRoaXMubG9nKCAnaW5pdGlhbGl6ZWQnLCBbIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgXSApO1xuICB0aGlzLmNhbGxPbkluaXQoKTtcbiAgLy8gY3JlYXRlIGZlYXR1cmVzXG4gIGZvciAoIGxldCBtZXRob2QgaW4gSW5maW5pdGVTY3JvbGwuY3JlYXRlICkge1xuICAgIEluZmluaXRlU2Nyb2xsLmNyZWF0ZVsgbWV0aG9kIF0uY2FsbCggdGhpcyApO1xuICB9XG59O1xuXG5wcm90by5vcHRpb24gPSBmdW5jdGlvbiggb3B0cyApIHtcbiAgT2JqZWN0LmFzc2lnbiggdGhpcy5vcHRpb25zLCBvcHRzICk7XG59O1xuXG4vLyBjYWxsIG9uSW5pdCBvcHRpb24sIHVzZWQgZm9yIGJpbmRpbmcgZXZlbnRzIG9uIGluaXRcbnByb3RvLmNhbGxPbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgbGV0IG9uSW5pdCA9IHRoaXMub3B0aW9ucy5vbkluaXQ7XG4gIGlmICggb25Jbml0ICkge1xuICAgIG9uSW5pdC5jYWxsKCB0aGlzLCB0aGlzICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGV2ZW50cyAtLS0tLSAvL1xuXG5wcm90by5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oIHR5cGUsIGV2ZW50LCBhcmdzICkge1xuICB0aGlzLmxvZyggdHlwZSwgYXJncyApO1xuICBsZXQgZW1pdEFyZ3MgPSBldmVudCA/IFsgZXZlbnQgXS5jb25jYXQoIGFyZ3MgKSA6IGFyZ3M7XG4gIHRoaXMuZW1pdEV2ZW50KCB0eXBlLCBlbWl0QXJncyApO1xuICAvLyB0cmlnZ2VyIGpRdWVyeSBldmVudFxuICBpZiAoICFqUXVlcnkgfHwgIXRoaXMuJGVsZW1lbnQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIG5hbWVzcGFjZSBqUXVlcnkgZXZlbnRcbiAgdHlwZSArPSAnLmluZmluaXRlU2Nyb2xsJztcbiAgbGV0ICRldmVudCA9IHR5cGU7XG4gIGlmICggZXZlbnQgKSB7XG4gICAgLy8gY3JlYXRlIGpRdWVyeSBldmVudFxuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwICovXG4gICAgbGV0IGpRRXZlbnQgPSBqUXVlcnkuRXZlbnQoIGV2ZW50ICk7XG4gICAgalFFdmVudC50eXBlID0gdHlwZTtcbiAgICAkZXZlbnQgPSBqUUV2ZW50O1xuICB9XG4gIHRoaXMuJGVsZW1lbnQudHJpZ2dlciggJGV2ZW50LCBhcmdzICk7XG59O1xuXG5sZXQgbG9nZ2VycyA9IHtcbiAgaW5pdGlhbGl6ZWQ6ICggY2xhc3NOYW1lICkgPT4gYG9uICR7Y2xhc3NOYW1lfWAsXG4gIHJlcXVlc3Q6ICggcGF0aCApID0+IGBVUkw6ICR7cGF0aH1gLFxuICBsb2FkOiAoIHJlc3BvbnNlLCBwYXRoICkgPT4gYCR7cmVzcG9uc2UudGl0bGUgfHwgJyd9LiBVUkw6ICR7cGF0aH1gLFxuICBlcnJvcjogKCBlcnJvciwgcGF0aCApID0+IGAke2Vycm9yfS4gVVJMOiAke3BhdGh9YCxcbiAgYXBwZW5kOiAoIHJlc3BvbnNlLCBwYXRoLCBpdGVtcyApID0+IGAke2l0ZW1zLmxlbmd0aH0gaXRlbXMuIFVSTDogJHtwYXRofWAsXG4gIGxhc3Q6ICggcmVzcG9uc2UsIHBhdGggKSA9PiBgVVJMOiAke3BhdGh9YCxcbiAgaGlzdG9yeTogKCB0aXRsZSwgcGF0aCApID0+IGBVUkw6ICR7cGF0aH1gLFxuICBwYWdlSW5kZXg6IGZ1bmN0aW9uKCBpbmRleCwgb3JpZ2luICkge1xuICAgIHJldHVybiBgY3VycmVudCBwYWdlIGRldGVybWluZWQgdG8gYmU6ICR7aW5kZXh9IGZyb20gJHtvcmlnaW59YDtcbiAgfSxcbn07XG5cbi8vIGxvZyBldmVudHNcbnByb3RvLmxvZyA9IGZ1bmN0aW9uKCB0eXBlLCBhcmdzICkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuZGVidWcgKSByZXR1cm47XG5cbiAgbGV0IG1lc3NhZ2UgPSBgW0luZmluaXRlU2Nyb2xsXSAke3R5cGV9YDtcbiAgbGV0IGxvZ2dlciA9IGxvZ2dlcnNbIHR5cGUgXTtcbiAgaWYgKCBsb2dnZXIgKSBtZXNzYWdlICs9ICcuICcgKyBsb2dnZXIuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcbiAgY29uc29sZS5sb2coIG1lc3NhZ2UgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1ldGhvZHMgdXNlZCBhbW91bmcgZmVhdHVyZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8udXBkYXRlTWVhc3VyZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMud2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICBsZXQgcmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdGhpcy50b3AgPSByZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZO1xufTtcblxucHJvdG8udXBkYXRlU2Nyb2xsZXIgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGVsZW1lbnRTY3JvbGwgPSB0aGlzLm9wdGlvbnMuZWxlbWVudFNjcm9sbDtcbiAgaWYgKCAhZWxlbWVudFNjcm9sbCApIHtcbiAgICAvLyBkZWZhdWx0LCB1c2Ugd2luZG93XG4gICAgdGhpcy5zY3JvbGxlciA9IHdpbmRvdztcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gaWYgdHJ1ZSwgc2V0IHRvIGVsZW1lbnQsIG90aGVyd2lzZSB1c2Ugb3B0aW9uXG4gIHRoaXMuc2Nyb2xsZXIgPSBlbGVtZW50U2Nyb2xsID09PSB0cnVlID8gdGhpcy5lbGVtZW50IDpcbiAgICB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIGVsZW1lbnRTY3JvbGwgKTtcbiAgaWYgKCAhdGhpcy5zY3JvbGxlciApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBmaW5kIGVsZW1lbnRTY3JvbGw6ICR7ZWxlbWVudFNjcm9sbH1gKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcGFnZSBwYXRoIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnVwZGF0ZUdldFBhdGggPSBmdW5jdGlvbigpIHtcbiAgbGV0IG9wdFBhdGggPSB0aGlzLm9wdGlvbnMucGF0aDtcbiAgaWYgKCAhb3B0UGF0aCApIHtcbiAgICBjb25zb2xlLmVycm9yKGBJbmZpbml0ZVNjcm9sbCBwYXRoIG9wdGlvbiByZXF1aXJlZC4gU2V0IGFzOiAke29wdFBhdGh9YCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGZ1bmN0aW9uXG4gIGxldCB0eXBlID0gdHlwZW9mIG9wdFBhdGg7XG4gIGlmICggdHlwZSA9PSAnZnVuY3Rpb24nICkge1xuICAgIHRoaXMuZ2V0UGF0aCA9IG9wdFBhdGg7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHRlbXBsYXRlIHN0cmluZzogJy9wYWdlcy97eyN9fS5odG1sJ1xuICBsZXQgdGVtcGxhdGVNYXRjaCA9IHR5cGUgPT0gJ3N0cmluZycgJiYgb3B0UGF0aC5tYXRjaCgne3sjfX0nKTtcbiAgaWYgKCB0ZW1wbGF0ZU1hdGNoICkge1xuICAgIHRoaXMudXBkYXRlR2V0UGF0aFRlbXBsYXRlKCBvcHRQYXRoICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNlbGVjdG9yOiAnLm5leHQtcGFnZS1zZWxlY3RvcidcbiAgdGhpcy51cGRhdGVHZXRQYXRoU2VsZWN0b3IoIG9wdFBhdGggKTtcbn07XG5cbnByb3RvLnVwZGF0ZUdldFBhdGhUZW1wbGF0ZSA9IGZ1bmN0aW9uKCBvcHRQYXRoICkge1xuICAvLyBzZXQgZ2V0UGF0aCB3aXRoIHRlbXBsYXRlIHN0cmluZ1xuICB0aGlzLmdldFBhdGggPSAoKSA9PiB7XG4gICAgbGV0IG5leHRJbmRleCA9IHRoaXMucGFnZUluZGV4ICsgMTtcbiAgICByZXR1cm4gb3B0UGF0aC5yZXBsYWNlKCAne3sjfX0nLCBuZXh0SW5kZXggKTtcbiAgfTtcbiAgLy8gZ2V0IHBhZ2VJbmRleCBmcm9tIGxvY2F0aW9uXG4gIC8vIGNvbnZlcnQgcGF0aCBvcHRpb24gaW50byByZWdleCB0byBsb29rIGZvciBwYXR0ZXJuIGluIGxvY2F0aW9uXG4gIC8vIGVzY2FwZSBxdWVyeSAoPykgaW4gdXJsLCBhbGxvd3MgZm9yIHBhcnNpbmcgR0VUIHBhcmFtZXRlcnNcbiAgbGV0IHJlZ2V4U3RyaW5nID0gb3B0UGF0aFxuICAgIC5yZXBsYWNlKCAvKFxcXFxcXD98XFw/KS8sICdcXFxcPycgKVxuICAgIC5yZXBsYWNlKCAne3sjfX0nLCAnKFxcXFxkXFxcXGQ/XFxcXGQ/KScgKTtcbiAgbGV0IHRlbXBsYXRlUmUgPSBuZXcgUmVnRXhwKCByZWdleFN0cmluZyApO1xuICBsZXQgbWF0Y2ggPSBsb2NhdGlvbi5ocmVmLm1hdGNoKCB0ZW1wbGF0ZVJlICk7XG5cbiAgaWYgKCBtYXRjaCApIHtcbiAgICB0aGlzLnBhZ2VJbmRleCA9IHBhcnNlSW50KCBtYXRjaFsxXSwgMTAgKTtcbiAgICB0aGlzLmxvZyggJ3BhZ2VJbmRleCcsIFsgdGhpcy5wYWdlSW5kZXgsICd0ZW1wbGF0ZSBzdHJpbmcnIF0gKTtcbiAgfVxufTtcblxubGV0IHBhdGhSZWdleGVzID0gW1xuICAvLyBXb3JkUHJlc3MgJiBUdW1ibHIgLSBleGFtcGxlLmNvbS9wYWdlLzJcbiAgLy8gSmVreWxsIC0gZXhhbXBsZS5jb20vcGFnZTJcbiAgL14oLio/XFwvP3BhZ2VcXC8/KShcXGRcXGQ/XFxkPykoLio/JCkvLFxuICAvLyBEcnVwYWwgLSBleGFtcGxlLmNvbS8/cGFnZT0xXG4gIC9eKC4qP1xcLz9cXD9wYWdlPSkoXFxkXFxkP1xcZD8pKC4qPyQpLyxcbiAgLy8gY2F0Y2ggYWxsLCBsYXN0IG9jY3VyZW5jZSBvZiBhIG51bWJlclxuICAvKC4qPykoXFxkXFxkP1xcZD8pKD8hLipcXGQpKC4qPyQpLyxcbl07XG5cbi8vIHRyeSBtYXRjaGluZyBocmVmIHRvIHBhdGhSZWdleGVzIHBhdHRlcm5zXG5sZXQgZ2V0UGF0aFBhcnRzID0gSW5maW5pdGVTY3JvbGwuZ2V0UGF0aFBhcnRzID0gZnVuY3Rpb24oIGhyZWYgKSB7XG4gIGlmICggIWhyZWYgKSByZXR1cm47XG4gIGZvciAoIGxldCByZWdleCBvZiBwYXRoUmVnZXhlcyApIHtcbiAgICBsZXQgbWF0Y2ggPSBocmVmLm1hdGNoKCByZWdleCApO1xuICAgIGlmICggbWF0Y2ggKSB7XG4gICAgICBsZXQgWyAsIGJlZ2luLCBpbmRleCwgZW5kIF0gPSBtYXRjaDtcbiAgICAgIHJldHVybiB7IGJlZ2luLCBpbmRleCwgZW5kIH07XG4gICAgfVxuICB9XG59O1xuXG5wcm90by51cGRhdGVHZXRQYXRoU2VsZWN0b3IgPSBmdW5jdGlvbiggb3B0UGF0aCApIHtcbiAgLy8gcGFyc2UgaHJlZiBvZiBsaW5rOiAnLm5leHQtcGFnZS1saW5rJ1xuICBsZXQgaHJlZkVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBvcHRQYXRoICk7XG4gIGlmICggIWhyZWZFbGVtICkge1xuICAgIGNvbnNvbGUuZXJyb3IoYEJhZCBJbmZpbml0ZVNjcm9sbCBwYXRoIG9wdGlvbi4gTmV4dCBsaW5rIG5vdCBmb3VuZDogJHtvcHRQYXRofWApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBocmVmID0gaHJlZkVsZW0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gIGxldCBwYXRoUGFydHMgPSBnZXRQYXRoUGFydHMoIGhyZWYgKTtcbiAgaWYgKCAhcGF0aFBhcnRzICkge1xuICAgIGNvbnNvbGUuZXJyb3IoYEluZmluaXRlU2Nyb2xsIHVuYWJsZSB0byBwYXJzZSBuZXh0IGxpbmsgaHJlZjogJHtocmVmfWApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB7IGJlZ2luLCBpbmRleCwgZW5kIH0gPSBwYXRoUGFydHM7XG4gIHRoaXMuaXNQYXRoU2VsZWN0b3IgPSB0cnVlOyAvLyBmbGFnIGZvciBjaGVja0xhc3RQYWdlKClcbiAgdGhpcy5nZXRQYXRoID0gKCkgPT4gYmVnaW4gKyAoIHRoaXMucGFnZUluZGV4ICsgMSApICsgZW5kO1xuICAvLyBnZXQgcGFnZUluZGV4IGZyb20gaHJlZlxuICB0aGlzLnBhZ2VJbmRleCA9IHBhcnNlSW50KCBpbmRleCwgMTAgKSAtIDE7XG4gIHRoaXMubG9nKCAncGFnZUluZGV4JywgWyB0aGlzLnBhZ2VJbmRleCwgJ25leHQgbGluaycgXSApO1xufTtcblxucHJvdG8udXBkYXRlR2V0QWJzb2x1dGVQYXRoID0gZnVuY3Rpb24oKSB7XG4gIGxldCBwYXRoID0gdGhpcy5nZXRQYXRoKCk7XG4gIC8vIHBhdGggZG9lc24ndCBzdGFydCB3aXRoIGh0dHAgb3IgL1xuICBsZXQgaXNBYnNvbHV0ZSA9IHBhdGgubWF0Y2goIC9eaHR0cC8gKSB8fCBwYXRoLm1hdGNoKCAvXlxcLy8gKTtcbiAgaWYgKCBpc0Fic29sdXRlICkge1xuICAgIHRoaXMuZ2V0QWJzb2x1dGVQYXRoID0gdGhpcy5nZXRQYXRoO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB7IHBhdGhuYW1lIH0gPSBsb2NhdGlvbjtcbiAgLy8gcXVlcnkgcGFyYW1ldGVyICM4MjkuIGV4YW1wbGUuY29tLz9wZz0yXG4gIGxldCBpc1F1ZXJ5ID0gcGF0aC5tYXRjaCggL15cXD8vICk7XG4gIC8vIC9mb28vYmFyL2luZGV4Lmh0bWwgPT4gL2Zvby9iYXJcbiAgbGV0IGRpcmVjdG9yeSA9IHBhdGhuYW1lLnN1YnN0cmluZyggMCwgcGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSApO1xuICBsZXQgcGF0aFN0YXJ0ID0gaXNRdWVyeSA/IHBhdGhuYW1lIDogZGlyZWN0b3J5ICsgJy8nO1xuXG4gIHRoaXMuZ2V0QWJzb2x1dGVQYXRoID0gKCkgPT4gcGF0aFN0YXJ0ICsgdGhpcy5nZXRQYXRoKCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBuYXYgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gaGlkZSBuYXZpZ2F0aW9uXG5JbmZpbml0ZVNjcm9sbC5jcmVhdGUuaGlkZU5hdiA9IGZ1bmN0aW9uKCkge1xuICBsZXQgbmF2ID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCB0aGlzLm9wdGlvbnMuaGlkZU5hdiApO1xuICBpZiAoICFuYXYgKSByZXR1cm47XG5cbiAgbmF2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHRoaXMubmF2ID0gbmF2O1xufTtcblxuSW5maW5pdGVTY3JvbGwuZGVzdHJveS5oaWRlTmF2ID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5uYXYgKSB0aGlzLm5hdi5zdHlsZS5kaXNwbGF5ID0gJyc7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkZXN0cm95IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hbGxPZmYoKTsgLy8gcmVtb3ZlIGFsbCBldmVudCBsaXN0ZW5lcnNcbiAgLy8gY2FsbCBkZXN0cm95IG1ldGhvZHNcbiAgZm9yICggbGV0IG1ldGhvZCBpbiBJbmZpbml0ZVNjcm9sbC5kZXN0cm95ICkge1xuICAgIEluZmluaXRlU2Nyb2xsLmRlc3Ryb3lbIG1ldGhvZCBdLmNhbGwoIHRoaXMgKTtcbiAgfVxuXG4gIGRlbGV0ZSB0aGlzLmVsZW1lbnQuaW5maW5pdGVTY3JvbGxHVUlEO1xuICBkZWxldGUgaW5zdGFuY2VzWyB0aGlzLmd1aWQgXTtcbiAgLy8gcmVtb3ZlIGpRdWVyeSBkYXRhLiAjODA3XG4gIGlmICggalF1ZXJ5ICYmIHRoaXMuJGVsZW1lbnQgKSB7XG4gICAgalF1ZXJ5LnJlbW92ZURhdGEoIHRoaXMuZWxlbWVudCwgJ2luZmluaXRlU2Nyb2xsJyApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB1dGlsaXRpZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xuSW5maW5pdGVTY3JvbGwudGhyb3R0bGUgPSBmdW5jdGlvbiggZm4sIHRocmVzaG9sZCApIHtcbiAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IDIwMDtcbiAgbGV0IGxhc3QsIHRpbWVvdXQ7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGxldCBub3cgPSArbmV3IERhdGUoKTtcbiAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcbiAgICBsZXQgdHJpZ2dlciA9ICgpID0+IHtcbiAgICAgIGxhc3QgPSBub3c7XG4gICAgICBmbi5hcHBseSggdGhpcywgYXJncyApO1xuICAgIH07XG4gICAgaWYgKCBsYXN0ICYmIG5vdyA8IGxhc3QgKyB0aHJlc2hvbGQgKSB7XG4gICAgICAvLyBob2xkIG9uIHRvIGl0XG4gICAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCB0cmlnZ2VyLCB0aHJlc2hvbGQgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJpZ2dlcigpO1xuICAgIH1cbiAgfTtcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRhdGEgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgZWxlbSA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbSApO1xuICBsZXQgaWQgPSBlbGVtICYmIGVsZW0uaW5maW5pdGVTY3JvbGxHVUlEO1xuICByZXR1cm4gaWQgJiYgaW5zdGFuY2VzWyBpZCBdO1xufTtcblxuLy8gc2V0IGludGVybmFsIGpRdWVyeSwgZm9yIFdlYnBhY2sgKyBqUXVlcnkgdjNcbkluZmluaXRlU2Nyb2xsLnNldEpRdWVyeSA9IGZ1bmN0aW9uKCBqcXJ5ICkge1xuICBqUXVlcnkgPSBqcXJ5O1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuaHRtbEluaXQoIEluZmluaXRlU2Nyb2xsLCAnaW5maW5pdGUtc2Nyb2xsJyApO1xuXG4vLyBhZGQgbm9vcCBfaW5pdCBtZXRob2QgZm9yIGpRdWVyeSBCcmlkZ2V0LiAjNzY4XG5wcm90by5faW5pdCA9IGZ1bmN0aW9uKCkge307XG5cbmxldCB7IGpRdWVyeUJyaWRnZXQgfSA9IHdpbmRvdztcbmlmICggalF1ZXJ5ICYmIGpRdWVyeUJyaWRnZXQgKSB7XG4gIGpRdWVyeUJyaWRnZXQoICdpbmZpbml0ZVNjcm9sbCcsIEluZmluaXRlU2Nyb2xsLCBqUXVlcnkgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnJldHVybiBJbmZpbml0ZVNjcm9sbDtcblxufSApICk7XG4iLCIvLyBoaXN0b3J5XG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgcmVxdWlyZSgnLi9jb3JlJyksXG4gICAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgd2luZG93LkluZmluaXRlU2Nyb2xsLFxuICAgICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEluZmluaXRlU2Nyb2xsLCB1dGlscyApIHtcblxubGV0IHByb3RvID0gSW5maW5pdGVTY3JvbGwucHJvdG90eXBlO1xuXG5PYmplY3QuYXNzaWduKCBJbmZpbml0ZVNjcm9sbC5kZWZhdWx0cywge1xuICBoaXN0b3J5OiAncmVwbGFjZScsXG4gIC8vIGhpc3RvcnlUaXRsZTogZmFsc2UsXG59ICk7XG5cbmxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4vLyAtLS0tLSBjcmVhdGUvZGVzdHJveSAtLS0tLSAvL1xuXG5JbmZpbml0ZVNjcm9sbC5jcmVhdGUuaGlzdG9yeSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuaGlzdG9yeSApIHJldHVybjtcblxuICAvLyBjaGVjayBmb3Igc2FtZSBvcmlnaW5cbiAgbGluay5ocmVmID0gdGhpcy5nZXRBYnNvbHV0ZVBhdGgoKTtcbiAgLy8gTVMgRWRnZSBkb2VzIG5vdCBoYXZlIG9yaWdpbiBvbiBsaW5rXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzEyMjM2NDkzL1xuICBsZXQgbGlua09yaWdpbiA9IGxpbmsub3JpZ2luIHx8IGxpbmsucHJvdG9jb2wgKyAnLy8nICsgbGluay5ob3N0O1xuICBsZXQgaXNTYW1lT3JpZ2luID0gbGlua09yaWdpbiA9PSBsb2NhdGlvbi5vcmlnaW47XG4gIGlmICggIWlzU2FtZU9yaWdpbiApIHtcbiAgICBjb25zb2xlLmVycm9yKCAnW0luZmluaXRlU2Nyb2xsXSBjYW5ub3Qgc2V0IGhpc3Rvcnkgd2l0aCBkaWZmZXJlbnQgb3JpZ2luOiAnICtcbiAgICAgIGAke2xpbmsub3JpZ2lufSBvbiAke2xvY2F0aW9uLm9yaWdpbn0gLiBIaXN0b3J5IGJlaGF2aW9yIGRpc2FibGVkLmAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB0d28gd2F5cyB0byBoYW5kbGUgY2hhbmdpbmcgaGlzdG9yeVxuICBpZiAoIHRoaXMub3B0aW9ucy5hcHBlbmQgKSB7XG4gICAgdGhpcy5jcmVhdGVIaXN0b3J5QXBwZW5kKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jcmVhdGVIaXN0b3J5UGFnZUxvYWQoKTtcbiAgfVxufTtcblxucHJvdG8uY3JlYXRlSGlzdG9yeUFwcGVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnVwZGF0ZU1lYXN1cmVtZW50cygpO1xuICB0aGlzLnVwZGF0ZVNjcm9sbGVyKCk7XG4gIC8vIGFycmF5IG9mIHNjcm9sbCBwb3NpdGlvbnMgb2YgYXBwZW5kZWQgcGFnZXNcbiAgdGhpcy5zY3JvbGxQYWdlcyA9IFtcbiAgICAvLyBmaXJzdCBwYWdlXG4gICAge1xuICAgICAgdG9wOiAwLFxuICAgICAgcGF0aDogbG9jYXRpb24uaHJlZixcbiAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZSxcbiAgICB9LFxuICBdO1xuICB0aGlzLnNjcm9sbFBhZ2UgPSB0aGlzLnNjcm9sbFBhZ2VzWzBdO1xuICAvLyBldmVudHNcbiAgdGhpcy5zY3JvbGxIaXN0b3J5SGFuZGxlciA9IHRoaXMub25TY3JvbGxIaXN0b3J5LmJpbmQoIHRoaXMgKTtcbiAgdGhpcy51bmxvYWRIYW5kbGVyID0gdGhpcy5vblVubG9hZC5iaW5kKCB0aGlzICk7XG4gIHRoaXMuc2Nyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGlzdG9yeUhhbmRsZXIgKTtcbiAgdGhpcy5vbiggJ2FwcGVuZCcsIHRoaXMub25BcHBlbmRIaXN0b3J5ICk7XG4gIHRoaXMuYmluZEhpc3RvcnlBcHBlbmRFdmVudHMoIHRydWUgKTtcbn07XG5cbnByb3RvLmJpbmRIaXN0b3J5QXBwZW5kRXZlbnRzID0gZnVuY3Rpb24oIGlzQmluZCApIHtcbiAgbGV0IGFkZFJlbW92ZSA9IGlzQmluZCA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgdGhpcy5zY3JvbGxlclsgYWRkUmVtb3ZlIF0oICdzY3JvbGwnLCB0aGlzLnNjcm9sbEhpc3RvcnlIYW5kbGVyICk7XG4gIHdpbmRvd1sgYWRkUmVtb3ZlIF0oICd1bmxvYWQnLCB0aGlzLnVubG9hZEhhbmRsZXIgKTtcbn07XG5cbnByb3RvLmNyZWF0ZUhpc3RvcnlQYWdlTG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9uKCAnbG9hZCcsIHRoaXMub25QYWdlTG9hZEhpc3RvcnkgKTtcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlc3Ryb3kuaGlzdG9yeSA9XG5wcm90by5kZXN0cm95SGlzdG9yeSA9IGZ1bmN0aW9uKCkge1xuICBsZXQgaXNIaXN0b3J5QXBwZW5kID0gdGhpcy5vcHRpb25zLmhpc3RvcnkgJiYgdGhpcy5vcHRpb25zLmFwcGVuZDtcbiAgaWYgKCBpc0hpc3RvcnlBcHBlbmQgKSB7XG4gICAgdGhpcy5iaW5kSGlzdG9yeUFwcGVuZEV2ZW50cyggZmFsc2UgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gYXBwZW5kIGhpc3RvcnkgLS0tLS0gLy9cblxucHJvdG8ub25BcHBlbmRIaXN0b3J5ID0gZnVuY3Rpb24oIHJlc3BvbnNlLCBwYXRoLCBpdGVtcyApIHtcbiAgLy8gZG8gbm90IHByb2NlZWQgaWYgbm8gaXRlbXMuICM3NzlcbiAgaWYgKCAhaXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCApIHJldHVybjtcblxuICBsZXQgZmlyc3RJdGVtID0gaXRlbXNbMF07XG4gIGxldCBlbGVtU2Nyb2xsWSA9IHRoaXMuZ2V0RWxlbWVudFNjcm9sbFkoIGZpcnN0SXRlbSApO1xuICAvLyByZXNvbHZlIHBhdGhcbiAgbGluay5ocmVmID0gcGF0aDtcbiAgLy8gYWRkIHBhZ2UgZGF0YSB0byBoYXNoXG4gIHRoaXMuc2Nyb2xsUGFnZXMucHVzaCh7XG4gICAgdG9wOiBlbGVtU2Nyb2xsWSxcbiAgICBwYXRoOiBsaW5rLmhyZWYsXG4gICAgdGl0bGU6IHJlc3BvbnNlLnRpdGxlLFxuICB9KTtcbn07XG5cbnByb3RvLmdldEVsZW1lbnRTY3JvbGxZID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLmVsZW1lbnRTY3JvbGwgKSB7XG4gICAgcmV0dXJuIGVsZW0ub2Zmc2V0VG9wIC0gdGhpcy50b3A7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiByZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuICB9XG59O1xuXG5wcm90by5vblNjcm9sbEhpc3RvcnkgPSBmdW5jdGlvbigpIHtcbiAgLy8gY3ljbGUgdGhyb3VnaCBwb3NpdGlvbnMsIGZpbmQgYmlnZ2VzdCB3aXRob3V0IGdvaW5nIG92ZXJcbiAgbGV0IHNjcm9sbFBhZ2UgPSB0aGlzLmdldENsb3Nlc3RTY3JvbGxQYWdlKCk7XG4gIC8vIHNldCBoaXN0b3J5IGlmIGNoYW5nZWRcbiAgaWYgKCBzY3JvbGxQYWdlICE9IHRoaXMuc2Nyb2xsUGFnZSApIHtcbiAgICB0aGlzLnNjcm9sbFBhZ2UgPSBzY3JvbGxQYWdlO1xuICAgIHRoaXMuc2V0SGlzdG9yeSggc2Nyb2xsUGFnZS50aXRsZSwgc2Nyb2xsUGFnZS5wYXRoICk7XG4gIH1cbn07XG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kKCBJbmZpbml0ZVNjcm9sbCwgJ29uU2Nyb2xsSGlzdG9yeScsIDE1MCApO1xuXG5wcm90by5nZXRDbG9zZXN0U2Nyb2xsUGFnZSA9IGZ1bmN0aW9uKCkge1xuICBsZXQgc2Nyb2xsVmlld1k7XG4gIGlmICggdGhpcy5vcHRpb25zLmVsZW1lbnRTY3JvbGwgKSB7XG4gICAgc2Nyb2xsVmlld1kgPSB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvcCArIHRoaXMuc2Nyb2xsZXIuY2xpZW50SGVpZ2h0IC8gMjtcbiAgfSBlbHNlIHtcbiAgICBzY3JvbGxWaWV3WSA9IHdpbmRvdy5zY3JvbGxZICsgdGhpcy53aW5kb3dIZWlnaHQgLyAyO1xuICB9XG5cbiAgbGV0IHNjcm9sbFBhZ2U7XG4gIGZvciAoIGxldCBwYWdlIG9mIHRoaXMuc2Nyb2xsUGFnZXMgKSB7XG4gICAgaWYgKCBwYWdlLnRvcCA+PSBzY3JvbGxWaWV3WSApIGJyZWFrO1xuXG4gICAgc2Nyb2xsUGFnZSA9IHBhZ2U7XG4gIH1cbiAgcmV0dXJuIHNjcm9sbFBhZ2U7XG59O1xuXG5wcm90by5zZXRIaXN0b3J5ID0gZnVuY3Rpb24oIHRpdGxlLCBwYXRoICkge1xuICBsZXQgb3B0SGlzdG9yeSA9IHRoaXMub3B0aW9ucy5oaXN0b3J5O1xuICBsZXQgaGlzdG9yeU1ldGhvZCA9IG9wdEhpc3RvcnkgJiYgaGlzdG9yeVsgb3B0SGlzdG9yeSArICdTdGF0ZScgXTtcbiAgaWYgKCAhaGlzdG9yeU1ldGhvZCApIHJldHVybjtcblxuICBoaXN0b3J5WyBvcHRIaXN0b3J5ICsgJ1N0YXRlJyBdKCBudWxsLCB0aXRsZSwgcGF0aCApO1xuICBpZiAoIHRoaXMub3B0aW9ucy5oaXN0b3J5VGl0bGUgKSBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdoaXN0b3J5JywgbnVsbCwgWyB0aXRsZSwgcGF0aCBdICk7XG59O1xuXG4vLyBzY3JvbGwgdG8gdG9wIHRvIHByZXZlbnQgaW5pdGlhbCBzY3JvbGwtcmVzZXQgYWZ0ZXIgcGFnZSByZWZyZXNoXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTg2MzM5MTUvMTgyMTgzXG5wcm90by5vblVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuc2Nyb2xsUGFnZS50b3AgPT09IDAgKSByZXR1cm47XG5cbiAgLy8gY2FsY3VsYXRlIHdoZXJlIHNjcm9sbCBwb3NpdGlvbiB3b3VsZCBiZSBvbiByZWZyZXNoXG4gIGxldCBzY3JvbGxZID0gd2luZG93LnNjcm9sbFkgLSB0aGlzLnNjcm9sbFBhZ2UudG9wICsgdGhpcy50b3A7XG4gIC8vIGRpc2FibGUgc2Nyb2xsIGV2ZW50IGJlZm9yZSBzZXR0aW5nIHNjcm9sbCAjNjc5XG4gIHRoaXMuZGVzdHJveUhpc3RvcnkoKTtcbiAgc2Nyb2xsVG8oIDAsIHNjcm9sbFkgKTtcbn07XG5cbi8vIC0tLS0tIGxvYWQgaGlzdG9yeSAtLS0tLSAvL1xuXG4vLyB1cGRhdGUgVVJMXG5wcm90by5vblBhZ2VMb2FkSGlzdG9yeSA9IGZ1bmN0aW9uKCByZXNwb25zZSwgcGF0aCApIHtcbiAgdGhpcy5zZXRIaXN0b3J5KCByZXNwb25zZS50aXRsZSwgcGF0aCApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnJldHVybiBJbmZpbml0ZVNjcm9sbDtcblxufSApICk7XG4iLCIvKiFcbiAqIEluZmluaXRlIFNjcm9sbCB2NC4wLjFcbiAqIEF1dG9tYXRpY2FsbHkgYWRkIG5leHQgcGFnZVxuICpcbiAqIExpY2Vuc2VkIEdQTHYzIGZvciBvcGVuIHNvdXJjZSB1c2VcbiAqIG9yIEluZmluaXRlIFNjcm9sbCBDb21tZXJjaWFsIExpY2Vuc2UgZm9yIGNvbW1lcmNpYWwgdXNlXG4gKlxuICogaHR0cHM6Ly9pbmZpbml0ZS1zY3JvbGwuY29tXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDIwIE1ldGFmaXp6eVxuICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgICAgcmVxdWlyZSgnLi9jb3JlJyksXG4gICAgICAgIHJlcXVpcmUoJy4vcGFnZS1sb2FkJyksXG4gICAgICAgIHJlcXVpcmUoJy4vc2Nyb2xsLXdhdGNoJyksXG4gICAgICAgIHJlcXVpcmUoJy4vaGlzdG9yeScpLFxuICAgICAgICByZXF1aXJlKCcuL2J1dHRvbicpLFxuICAgICAgICByZXF1aXJlKCcuL3N0YXR1cycpLFxuICAgICk7XG4gIH1cblxufSApKCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIEluZmluaXRlU2Nyb2xsICkge1xuICByZXR1cm4gSW5maW5pdGVTY3JvbGw7XG59ICk7XG4iLCIvLyBwYWdlLWxvYWRcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICByZXF1aXJlKCcuL2NvcmUnKSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICB3aW5kb3cuSW5maW5pdGVTY3JvbGwsXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgSW5maW5pdGVTY3JvbGwgKSB7XG5cbmxldCBwcm90byA9IEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZTtcblxuT2JqZWN0LmFzc2lnbiggSW5maW5pdGVTY3JvbGwuZGVmYXVsdHMsIHtcbiAgLy8gYXBwZW5kOiBmYWxzZSxcbiAgbG9hZE9uU2Nyb2xsOiB0cnVlLFxuICBjaGVja0xhc3RQYWdlOiB0cnVlLFxuICByZXNwb25zZUJvZHk6ICd0ZXh0JyxcbiAgZG9tUGFyc2VSZXNwb25zZTogdHJ1ZSxcbiAgLy8gcHJlZmlsbDogZmFsc2UsXG4gIC8vIG91dGxheWVyOiBudWxsLFxufSApO1xuXG5JbmZpbml0ZVNjcm9sbC5jcmVhdGUucGFnZUxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jYW5Mb2FkID0gdHJ1ZTtcbiAgdGhpcy5vbiggJ3Njcm9sbFRocmVzaG9sZCcsIHRoaXMub25TY3JvbGxUaHJlc2hvbGRMb2FkICk7XG4gIHRoaXMub24oICdsb2FkJywgdGhpcy5jaGVja0xhc3RQYWdlICk7XG4gIGlmICggdGhpcy5vcHRpb25zLm91dGxheWVyICkge1xuICAgIHRoaXMub24oICdhcHBlbmQnLCB0aGlzLm9uQXBwZW5kT3V0bGF5ZXIgKTtcbiAgfVxufTtcblxucHJvdG8ub25TY3JvbGxUaHJlc2hvbGRMb2FkID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLmxvYWRPblNjcm9sbCApIHRoaXMubG9hZE5leHRQYWdlKCk7XG59O1xuXG5sZXQgZG9tUGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuXG5wcm90by5sb2FkTmV4dFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzTG9hZGluZyB8fCAhdGhpcy5jYW5Mb2FkICkgcmV0dXJuO1xuXG4gIGxldCB7IHJlc3BvbnNlQm9keSwgZG9tUGFyc2VSZXNwb25zZSwgZmV0Y2hPcHRpb25zIH0gPSB0aGlzLm9wdGlvbnM7XG4gIGxldCBwYXRoID0gdGhpcy5nZXRBYnNvbHV0ZVBhdGgoKTtcbiAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICBpZiAoIHR5cGVvZiBmZXRjaE9wdGlvbnMgPT0gJ2Z1bmN0aW9uJyApIGZldGNoT3B0aW9ucyA9IGZldGNoT3B0aW9ucygpO1xuXG4gIGxldCBmZXRjaFByb21pc2UgPSBmZXRjaCggcGF0aCwgZmV0Y2hPcHRpb25zIClcbiAgICAudGhlbiggKCByZXNwb25zZSApID0+IHtcbiAgICAgIGlmICggIXJlc3BvbnNlLm9rICkge1xuICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoIHJlc3BvbnNlLnN0YXR1c1RleHQgKTtcbiAgICAgICAgdGhpcy5vblBhZ2VFcnJvciggZXJyb3IsIHBhdGgsIHJlc3BvbnNlICk7XG4gICAgICAgIHJldHVybiB7IHJlc3BvbnNlIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZVsgcmVzcG9uc2VCb2R5IF0oKS50aGVuKCAoIGJvZHkgKSA9PiB7XG4gICAgICAgIGxldCBjYW5Eb21QYXJzZSA9IHJlc3BvbnNlQm9keSA9PSAndGV4dCcgJiYgZG9tUGFyc2VSZXNwb25zZTtcbiAgICAgICAgaWYgKCBjYW5Eb21QYXJzZSApIHtcbiAgICAgICAgICBib2R5ID0gZG9tUGFyc2VyLnBhcnNlRnJvbVN0cmluZyggYm9keSwgJ3RleHQvaHRtbCcgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHJlc3BvbnNlLnN0YXR1cyA9PSAyMDQgKSB7XG4gICAgICAgICAgdGhpcy5sYXN0UGFnZVJlYWNoZWQoIGJvZHksIHBhdGggKTtcbiAgICAgICAgICByZXR1cm4geyBib2R5LCByZXNwb25zZSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9uUGFnZUxvYWQoIGJvZHksIHBhdGgsIHJlc3BvbnNlICk7XG4gICAgICAgIH1cbiAgICAgIH0gKTtcbiAgICB9IClcbiAgICAuY2F0Y2goICggZXJyb3IgKSA9PiB7XG4gICAgICB0aGlzLm9uUGFnZUVycm9yKCBlcnJvciwgcGF0aCApO1xuICAgIH0gKTtcblxuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdyZXF1ZXN0JywgbnVsbCwgWyBwYXRoLCBmZXRjaFByb21pc2UgXSApO1xuXG4gIHJldHVybiBmZXRjaFByb21pc2U7XG59O1xuXG5wcm90by5vblBhZ2VMb2FkID0gZnVuY3Rpb24oIGJvZHksIHBhdGgsIHJlc3BvbnNlICkge1xuICAvLyBkb25lIGxvYWRpbmcgaWYgbm90IGFwcGVuZGluZ1xuICBpZiAoICF0aGlzLm9wdGlvbnMuYXBwZW5kICkge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gIH1cbiAgdGhpcy5wYWdlSW5kZXgrKztcbiAgdGhpcy5sb2FkQ291bnQrKztcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnbG9hZCcsIG51bGwsIFsgYm9keSwgcGF0aCwgcmVzcG9uc2UgXSApO1xuICByZXR1cm4gdGhpcy5hcHBlbmROZXh0UGFnZSggYm9keSwgcGF0aCwgcmVzcG9uc2UgKTtcbn07XG5cbnByb3RvLmFwcGVuZE5leHRQYWdlID0gZnVuY3Rpb24oIGJvZHksIHBhdGgsIHJlc3BvbnNlICkge1xuICBsZXQgeyBhcHBlbmQsIHJlc3BvbnNlQm9keSwgZG9tUGFyc2VSZXNwb25zZSB9ID0gdGhpcy5vcHRpb25zO1xuICAvLyBkbyBub3QgYXBwZW5kIGpzb25cbiAgbGV0IGlzRG9jdW1lbnQgPSByZXNwb25zZUJvZHkgPT0gJ3RleHQnICYmIGRvbVBhcnNlUmVzcG9uc2U7XG4gIGlmICggIWlzRG9jdW1lbnQgfHwgIWFwcGVuZCApIHJldHVybiB7IGJvZHksIHJlc3BvbnNlIH07XG5cbiAgbGV0IGl0ZW1zID0gYm9keS5xdWVyeVNlbGVjdG9yQWxsKCBhcHBlbmQgKTtcbiAgbGV0IHByb21pc2VWYWx1ZSA9IHsgYm9keSwgcmVzcG9uc2UsIGl0ZW1zIH07XG4gIC8vIGxhc3QgcGFnZSBoaXQgaWYgbm8gaXRlbXMuICM4NDBcbiAgaWYgKCAhaXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCApIHtcbiAgICB0aGlzLmxhc3RQYWdlUmVhY2hlZCggYm9keSwgcGF0aCApO1xuICAgIHJldHVybiBwcm9taXNlVmFsdWU7XG4gIH1cblxuICBsZXQgZnJhZ21lbnQgPSBnZXRJdGVtc0ZyYWdtZW50KCBpdGVtcyApO1xuICBsZXQgYXBwZW5kUmVhZHkgPSAoKSA9PiB7XG4gICAgdGhpcy5hcHBlbmRJdGVtcyggaXRlbXMsIGZyYWdtZW50ICk7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoICdhcHBlbmQnLCBudWxsLCBbIGJvZHksIHBhdGgsIGl0ZW1zLCByZXNwb25zZSBdICk7XG4gICAgcmV0dXJuIHByb21pc2VWYWx1ZTtcbiAgfTtcblxuICAvLyBUT0RPIGFkZCBob29rIGZvciBvcHRpb24gdG8gdHJpZ2dlciBhcHBlbmRSZWFkeVxuICBpZiAoIHRoaXMub3B0aW9ucy5vdXRsYXllciApIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRPdXRsYXllckl0ZW1zKCBmcmFnbWVudCwgYXBwZW5kUmVhZHkgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXBwZW5kUmVhZHkoKTtcbiAgfVxufTtcblxucHJvdG8uYXBwZW5kSXRlbXMgPSBmdW5jdGlvbiggaXRlbXMsIGZyYWdtZW50ICkge1xuICBpZiAoICFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoICkgcmV0dXJuO1xuXG4gIC8vIGdldCBmcmFnbWVudCBpZiBub3QgcHJvdmlkZWRcbiAgZnJhZ21lbnQgPSBmcmFnbWVudCB8fCBnZXRJdGVtc0ZyYWdtZW50KCBpdGVtcyApO1xuICByZWZyZXNoU2NyaXB0cyggZnJhZ21lbnQgKTtcbiAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCBmcmFnbWVudCApO1xufTtcblxuZnVuY3Rpb24gZ2V0SXRlbXNGcmFnbWVudCggaXRlbXMgKSB7XG4gIC8vIGFkZCBpdGVtcyB0byBmcmFnbWVudFxuICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGlmICggaXRlbXMgKSBmcmFnbWVudC5hcHBlbmQoIC4uLml0ZW1zICk7XG4gIHJldHVybiBmcmFnbWVudDtcbn1cblxuLy8gcmVwbGFjZSA8c2NyaXB0PnMgd2l0aCBjb3BpZXMgc28gdGhleSBsb2FkXG4vLyA8c2NyaXB0PnMgYWRkZWQgYnkgSW5maW5pdGVTY3JvbGwgd2lsbCBub3QgbG9hZFxuLy8gc2ltaWxhciB0byBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MTA5OTVcbmZ1bmN0aW9uIHJlZnJlc2hTY3JpcHRzKCBmcmFnbWVudCApIHtcbiAgbGV0IHNjcmlwdHMgPSBmcmFnbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKTtcbiAgZm9yICggbGV0IHNjcmlwdCBvZiBzY3JpcHRzICkge1xuICAgIGxldCBmcmVzaFNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIC8vIGNvcHkgYXR0cmlidXRlc1xuICAgIGxldCBhdHRycyA9IHNjcmlwdC5hdHRyaWJ1dGVzO1xuICAgIGZvciAoIGxldCBhdHRyIG9mIGF0dHJzICkge1xuICAgICAgZnJlc2hTY3JpcHQuc2V0QXR0cmlidXRlKCBhdHRyLm5hbWUsIGF0dHIudmFsdWUgKTtcbiAgICB9XG4gICAgLy8gY29weSBpbm5lciBzY3JpcHQgY29kZS4gIzcxOCwgIzc4MlxuICAgIGZyZXNoU2NyaXB0LmlubmVySFRNTCA9IHNjcmlwdC5pbm5lckhUTUw7XG4gICAgc2NyaXB0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKCBmcmVzaFNjcmlwdCwgc2NyaXB0ICk7XG4gIH1cbn1cblxuLy8gLS0tLS0gb3V0bGF5ZXIgLS0tLS0gLy9cblxucHJvdG8uYXBwZW5kT3V0bGF5ZXJJdGVtcyA9IGZ1bmN0aW9uKCBmcmFnbWVudCwgYXBwZW5kUmVhZHkgKSB7XG4gIGxldCBpbWFnZXNMb2FkZWQgPSBJbmZpbml0ZVNjcm9sbC5pbWFnZXNMb2FkZWQgfHwgd2luZG93LmltYWdlc0xvYWRlZDtcbiAgaWYgKCAhaW1hZ2VzTG9hZGVkICkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tJbmZpbml0ZVNjcm9sbF0gaW1hZ2VzTG9hZGVkIHJlcXVpcmVkIGZvciBvdXRsYXllciBvcHRpb24nKTtcbiAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBhcHBlbmQgb25jZSBpbWFnZXMgbG9hZGVkXG4gIHJldHVybiBuZXcgUHJvbWlzZSggZnVuY3Rpb24oIHJlc29sdmUgKSB7XG4gICAgaW1hZ2VzTG9hZGVkKCBmcmFnbWVudCwgZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgYm9keVJlc3BvbnNlID0gYXBwZW5kUmVhZHkoKTtcbiAgICAgIHJlc29sdmUoIGJvZHlSZXNwb25zZSApO1xuICAgIH0gKTtcbiAgfSApO1xufTtcblxucHJvdG8ub25BcHBlbmRPdXRsYXllciA9IGZ1bmN0aW9uKCByZXNwb25zZSwgcGF0aCwgaXRlbXMgKSB7XG4gIHRoaXMub3B0aW9ucy5vdXRsYXllci5hcHBlbmRlZCggaXRlbXMgKTtcbn07XG5cbi8vIC0tLS0tIGNoZWNrTGFzdFBhZ2UgLS0tLS0gLy9cblxuLy8gY2hlY2sgcmVzcG9uc2UgZm9yIG5leHQgZWxlbWVudFxucHJvdG8uY2hlY2tMYXN0UGFnZSA9IGZ1bmN0aW9uKCBib2R5LCBwYXRoICkge1xuICBsZXQgeyBjaGVja0xhc3RQYWdlLCBwYXRoOiBwYXRoT3B0IH0gPSB0aGlzLm9wdGlvbnM7XG4gIGlmICggIWNoZWNrTGFzdFBhZ2UgKSByZXR1cm47XG5cbiAgLy8gaWYgcGF0aCBpcyBmdW5jdGlvbiwgY2hlY2sgaWYgbmV4dCBwYXRoIGlzIHRydXRoeVxuICBpZiAoIHR5cGVvZiBwYXRoT3B0ID09ICdmdW5jdGlvbicgKSB7XG4gICAgbGV0IG5leHRQYXRoID0gdGhpcy5nZXRQYXRoKCk7XG4gICAgaWYgKCAhbmV4dFBhdGggKSB7XG4gICAgICB0aGlzLmxhc3RQYWdlUmVhY2hlZCggYm9keSwgcGF0aCApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICAvLyBnZXQgc2VsZWN0b3IgZnJvbSBjaGVja0xhc3RQYWdlIG9yIHBhdGggb3B0aW9uXG4gIGxldCBzZWxlY3RvcjtcbiAgaWYgKCB0eXBlb2YgY2hlY2tMYXN0UGFnZSA9PSAnc3RyaW5nJyApIHtcbiAgICBzZWxlY3RvciA9IGNoZWNrTGFzdFBhZ2U7XG4gIH0gZWxzZSBpZiAoIHRoaXMuaXNQYXRoU2VsZWN0b3IgKSB7XG4gICAgLy8gcGF0aCBvcHRpb24gaXMgc2VsZWN0b3Igc3RyaW5nXG4gICAgc2VsZWN0b3IgPSBwYXRoT3B0O1xuICB9XG4gIC8vIGNoZWNrIGxhc3QgcGFnZSBmb3Igc2VsZWN0b3JcbiAgLy8gYmFpbCBpZiBubyBzZWxlY3RvciBvciBub3QgZG9jdW1lbnQgcmVzcG9uc2VcbiAgaWYgKCAhc2VsZWN0b3IgfHwgIWJvZHkucXVlcnlTZWxlY3RvciApIHJldHVybjtcblxuICAvLyBjaGVjayBpZiByZXNwb25zZSBoYXMgc2VsZWN0b3JcbiAgbGV0IG5leHRFbGVtID0gYm9keS5xdWVyeVNlbGVjdG9yKCBzZWxlY3RvciApO1xuICBpZiAoICFuZXh0RWxlbSApIHRoaXMubGFzdFBhZ2VSZWFjaGVkKCBib2R5LCBwYXRoICk7XG59O1xuXG5wcm90by5sYXN0UGFnZVJlYWNoZWQgPSBmdW5jdGlvbiggYm9keSwgcGF0aCApIHtcbiAgdGhpcy5jYW5Mb2FkID0gZmFsc2U7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2xhc3QnLCBudWxsLCBbIGJvZHksIHBhdGggXSApO1xufTtcblxuLy8gLS0tLS0gZXJyb3IgLS0tLS0gLy9cblxucHJvdG8ub25QYWdlRXJyb3IgPSBmdW5jdGlvbiggZXJyb3IsIHBhdGgsIHJlc3BvbnNlICkge1xuICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICB0aGlzLmNhbkxvYWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnZXJyb3InLCBudWxsLCBbIGVycm9yLCBwYXRoLCByZXNwb25zZSBdICk7XG4gIHJldHVybiBlcnJvcjtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHByZWZpbGwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuSW5maW5pdGVTY3JvbGwuY3JlYXRlLnByZWZpbGwgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLnByZWZpbGwgKSByZXR1cm47XG5cbiAgbGV0IGFwcGVuZCA9IHRoaXMub3B0aW9ucy5hcHBlbmQ7XG4gIGlmICggIWFwcGVuZCApIHtcbiAgICBjb25zb2xlLmVycm9yKGBhcHBlbmQgb3B0aW9uIHJlcXVpcmVkIGZvciBwcmVmaWxsLiBTZXQgYXMgOiR7YXBwZW5kfWApO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnVwZGF0ZU1lYXN1cmVtZW50cygpO1xuICB0aGlzLnVwZGF0ZVNjcm9sbGVyKCk7XG4gIHRoaXMuaXNQcmVmaWxsaW5nID0gdHJ1ZTtcbiAgdGhpcy5vbiggJ2FwcGVuZCcsIHRoaXMucHJlZmlsbCApO1xuICB0aGlzLm9uY2UoICdlcnJvcicsIHRoaXMuc3RvcFByZWZpbGwgKTtcbiAgdGhpcy5vbmNlKCAnbGFzdCcsIHRoaXMuc3RvcFByZWZpbGwgKTtcbiAgdGhpcy5wcmVmaWxsKCk7XG59O1xuXG5wcm90by5wcmVmaWxsID0gZnVuY3Rpb24oKSB7XG4gIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0UHJlZmlsbERpc3RhbmNlKCk7XG4gIHRoaXMuaXNQcmVmaWxsaW5nID0gZGlzdGFuY2UgPj0gMDtcbiAgaWYgKCB0aGlzLmlzUHJlZmlsbGluZyApIHtcbiAgICB0aGlzLmxvZygncHJlZmlsbCcpO1xuICAgIHRoaXMubG9hZE5leHRQYWdlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zdG9wUHJlZmlsbCgpO1xuICB9XG59O1xuXG5wcm90by5nZXRQcmVmaWxsRGlzdGFuY2UgPSBmdW5jdGlvbigpIHtcbiAgLy8gZWxlbWVudCBzY3JvbGxcbiAgaWYgKCB0aGlzLm9wdGlvbnMuZWxlbWVudFNjcm9sbCApIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGxlci5jbGllbnRIZWlnaHQgLSB0aGlzLnNjcm9sbGVyLnNjcm9sbEhlaWdodDtcbiAgfVxuICAvLyB3aW5kb3dcbiAgcmV0dXJuIHRoaXMud2luZG93SGVpZ2h0IC0gdGhpcy5lbGVtZW50LmNsaWVudEhlaWdodDtcbn07XG5cbnByb3RvLnN0b3BQcmVmaWxsID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubG9nKCdzdG9wUHJlZmlsbCcpO1xuICB0aGlzLm9mZiggJ2FwcGVuZCcsIHRoaXMucHJlZmlsbCApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnJldHVybiBJbmZpbml0ZVNjcm9sbDtcblxufSApICk7XG4iLCIvLyBzY3JvbGwtd2F0Y2hcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICByZXF1aXJlKCcuL2NvcmUnKSxcbiAgICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICB3aW5kb3cuSW5maW5pdGVTY3JvbGwsXG4gICAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgSW5maW5pdGVTY3JvbGwsIHV0aWxzICkge1xuXG5sZXQgcHJvdG8gPSBJbmZpbml0ZVNjcm9sbC5wcm90b3R5cGU7XG5cbi8vIGRlZmF1bHQgb3B0aW9uc1xuT2JqZWN0LmFzc2lnbiggSW5maW5pdGVTY3JvbGwuZGVmYXVsdHMsIHtcbiAgc2Nyb2xsVGhyZXNob2xkOiA0MDAsXG4gIC8vIGVsZW1lbnRTY3JvbGw6IG51bGwsXG59ICk7XG5cbkluZmluaXRlU2Nyb2xsLmNyZWF0ZS5zY3JvbGxXYXRjaCA9IGZ1bmN0aW9uKCkge1xuICAvLyBldmVudHNcbiAgdGhpcy5wYWdlU2Nyb2xsSGFuZGxlciA9IHRoaXMub25QYWdlU2Nyb2xsLmJpbmQoIHRoaXMgKTtcbiAgdGhpcy5yZXNpemVIYW5kbGVyID0gdGhpcy5vblJlc2l6ZS5iaW5kKCB0aGlzICk7XG5cbiAgbGV0IHNjcm9sbFRocmVzaG9sZCA9IHRoaXMub3B0aW9ucy5zY3JvbGxUaHJlc2hvbGQ7XG4gIGxldCBpc0VuYWJsZSA9IHNjcm9sbFRocmVzaG9sZCB8fCBzY3JvbGxUaHJlc2hvbGQgPT09IDA7XG4gIGlmICggaXNFbmFibGUgKSB0aGlzLmVuYWJsZVNjcm9sbFdhdGNoKCk7XG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZXN0cm95LnNjcm9sbFdhdGNoID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGlzYWJsZVNjcm9sbFdhdGNoKCk7XG59O1xuXG5wcm90by5lbmFibGVTY3JvbGxXYXRjaCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNTY3JvbGxXYXRjaGluZyApIHJldHVybjtcblxuICB0aGlzLmlzU2Nyb2xsV2F0Y2hpbmcgPSB0cnVlO1xuICB0aGlzLnVwZGF0ZU1lYXN1cmVtZW50cygpO1xuICB0aGlzLnVwZGF0ZVNjcm9sbGVyKCk7XG4gIC8vIFRPRE8gZGlzYWJsZSBhZnRlciBlcnJvcj9cbiAgdGhpcy5vbiggJ2xhc3QnLCB0aGlzLmRpc2FibGVTY3JvbGxXYXRjaCApO1xuICB0aGlzLmJpbmRTY3JvbGxXYXRjaEV2ZW50cyggdHJ1ZSApO1xufTtcblxucHJvdG8uZGlzYWJsZVNjcm9sbFdhdGNoID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNTY3JvbGxXYXRjaGluZyApIHJldHVybjtcblxuICB0aGlzLmJpbmRTY3JvbGxXYXRjaEV2ZW50cyggZmFsc2UgKTtcbiAgZGVsZXRlIHRoaXMuaXNTY3JvbGxXYXRjaGluZztcbn07XG5cbnByb3RvLmJpbmRTY3JvbGxXYXRjaEV2ZW50cyA9IGZ1bmN0aW9uKCBpc0JpbmQgKSB7XG4gIGxldCBhZGRSZW1vdmUgPSBpc0JpbmQgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gIHRoaXMuc2Nyb2xsZXJbIGFkZFJlbW92ZSBdKCAnc2Nyb2xsJywgdGhpcy5wYWdlU2Nyb2xsSGFuZGxlciApO1xuICB3aW5kb3dbIGFkZFJlbW92ZSBdKCAncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyICk7XG59O1xuXG5wcm90by5vblBhZ2VTY3JvbGwgPSBJbmZpbml0ZVNjcm9sbC50aHJvdHRsZSggZnVuY3Rpb24oKSB7XG4gIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0Qm90dG9tRGlzdGFuY2UoKTtcbiAgaWYgKCBkaXN0YW5jZSA8PSB0aGlzLm9wdGlvbnMuc2Nyb2xsVGhyZXNob2xkICkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnc2Nyb2xsVGhyZXNob2xkJyk7XG4gIH1cbn0gKTtcblxucHJvdG8uZ2V0Qm90dG9tRGlzdGFuY2UgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGJvdHRvbSwgc2Nyb2xsWTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMuZWxlbWVudFNjcm9sbCApIHtcbiAgICBib3R0b20gPSB0aGlzLnNjcm9sbGVyLnNjcm9sbEhlaWdodDtcbiAgICBzY3JvbGxZID0gdGhpcy5zY3JvbGxlci5zY3JvbGxUb3AgKyB0aGlzLnNjcm9sbGVyLmNsaWVudEhlaWdodDtcbiAgfSBlbHNlIHtcbiAgICBib3R0b20gPSB0aGlzLnRvcCArIHRoaXMuZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZICsgdGhpcy53aW5kb3dIZWlnaHQ7XG4gIH1cbiAgcmV0dXJuIGJvdHRvbSAtIHNjcm9sbFk7XG59O1xuXG5wcm90by5vblJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnVwZGF0ZU1lYXN1cmVtZW50cygpO1xufTtcblxudXRpbHMuZGVib3VuY2VNZXRob2QoIEluZmluaXRlU2Nyb2xsLCAnb25SZXNpemUnLCAxNTAgKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnJldHVybiBJbmZpbml0ZVNjcm9sbDtcblxufSApICk7XG4iLCIvLyBzdGF0dXNcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICByZXF1aXJlKCcuL2NvcmUnKSxcbiAgICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICB3aW5kb3cuSW5maW5pdGVTY3JvbGwsXG4gICAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgSW5maW5pdGVTY3JvbGwsIHV0aWxzICkge1xuXG5sZXQgcHJvdG8gPSBJbmZpbml0ZVNjcm9sbC5wcm90b3R5cGU7XG5cbi8vIEluZmluaXRlU2Nyb2xsLmRlZmF1bHRzLnN0YXR1cyA9IG51bGw7XG5cbkluZmluaXRlU2Nyb2xsLmNyZWF0ZS5zdGF0dXMgPSBmdW5jdGlvbigpIHtcbiAgbGV0IHN0YXR1c0VsZW0gPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIHRoaXMub3B0aW9ucy5zdGF0dXMgKTtcbiAgaWYgKCAhc3RhdHVzRWxlbSApIHJldHVybjtcblxuICAvLyBlbGVtZW50c1xuICB0aGlzLnN0YXR1c0VsZW1lbnQgPSBzdGF0dXNFbGVtO1xuICB0aGlzLnN0YXR1c0V2ZW50RWxlbWVudHMgPSB7XG4gICAgcmVxdWVzdDogc3RhdHVzRWxlbS5xdWVyeVNlbGVjdG9yKCcuaW5maW5pdGUtc2Nyb2xsLXJlcXVlc3QnKSxcbiAgICBlcnJvcjogc3RhdHVzRWxlbS5xdWVyeVNlbGVjdG9yKCcuaW5maW5pdGUtc2Nyb2xsLWVycm9yJyksXG4gICAgbGFzdDogc3RhdHVzRWxlbS5xdWVyeVNlbGVjdG9yKCcuaW5maW5pdGUtc2Nyb2xsLWxhc3QnKSxcbiAgfTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMub24oICdyZXF1ZXN0JywgdGhpcy5zaG93UmVxdWVzdFN0YXR1cyApO1xuICB0aGlzLm9uKCAnZXJyb3InLCB0aGlzLnNob3dFcnJvclN0YXR1cyApO1xuICB0aGlzLm9uKCAnbGFzdCcsIHRoaXMuc2hvd0xhc3RTdGF0dXMgKTtcbiAgdGhpcy5iaW5kSGlkZVN0YXR1cygnb24nKTtcbn07XG5cbnByb3RvLmJpbmRIaWRlU3RhdHVzID0gZnVuY3Rpb24oIGJpbmRNZXRob2QgKSB7XG4gIGxldCBoaWRlRXZlbnQgPSB0aGlzLm9wdGlvbnMuYXBwZW5kID8gJ2FwcGVuZCcgOiAnbG9hZCc7XG4gIHRoaXNbIGJpbmRNZXRob2QgXSggaGlkZUV2ZW50LCB0aGlzLmhpZGVBbGxTdGF0dXMgKTtcbn07XG5cbnByb3RvLnNob3dSZXF1ZXN0U3RhdHVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2hvd1N0YXR1cygncmVxdWVzdCcpO1xufTtcblxucHJvdG8uc2hvd0Vycm9yU3RhdHVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2hvd1N0YXR1cygnZXJyb3InKTtcbn07XG5cbnByb3RvLnNob3dMYXN0U3RhdHVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2hvd1N0YXR1cygnbGFzdCcpO1xuICAvLyBwcmV2ZW50IGxhc3QgdGhlbiBhcHBlbmQgZXZlbnQgcmFjZSBjb25kaXRpb24gZnJvbSBzaG93aW5nIGxhc3Qgc3RhdHVzICM3MDZcbiAgdGhpcy5iaW5kSGlkZVN0YXR1cygnb2ZmJyk7XG59O1xuXG5wcm90by5zaG93U3RhdHVzID0gZnVuY3Rpb24oIGV2ZW50TmFtZSApIHtcbiAgc2hvdyggdGhpcy5zdGF0dXNFbGVtZW50ICk7XG4gIHRoaXMuaGlkZVN0YXR1c0V2ZW50RWxlbWVudHMoKTtcbiAgbGV0IGV2ZW50RWxlbSA9IHRoaXMuc3RhdHVzRXZlbnRFbGVtZW50c1sgZXZlbnROYW1lIF07XG4gIHNob3coIGV2ZW50RWxlbSApO1xufTtcblxucHJvdG8uaGlkZUFsbFN0YXR1cyA9IGZ1bmN0aW9uKCkge1xuICBoaWRlKCB0aGlzLnN0YXR1c0VsZW1lbnQgKTtcbiAgdGhpcy5oaWRlU3RhdHVzRXZlbnRFbGVtZW50cygpO1xufTtcblxucHJvdG8uaGlkZVN0YXR1c0V2ZW50RWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgZm9yICggbGV0IHR5cGUgaW4gdGhpcy5zdGF0dXNFdmVudEVsZW1lbnRzICkge1xuICAgIGxldCBldmVudEVsZW0gPSB0aGlzLnN0YXR1c0V2ZW50RWxlbWVudHNbIHR5cGUgXTtcbiAgICBoaWRlKCBldmVudEVsZW0gKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIGhpZGUoIGVsZW0gKSB7XG4gIHNldERpc3BsYXkoIGVsZW0sICdub25lJyApO1xufVxuXG5mdW5jdGlvbiBzaG93KCBlbGVtICkge1xuICBzZXREaXNwbGF5KCBlbGVtLCAnYmxvY2snICk7XG59XG5cbmZ1bmN0aW9uIHNldERpc3BsYXkoIGVsZW0sIHZhbHVlICkge1xuICBpZiAoIGVsZW0gKSB7XG4gICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gdmFsdWU7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnJldHVybiBJbmZpbml0ZVNjcm9sbDtcblxufSApICk7XG4iLCJpbXBvcnQgSW5maW5pdGVTY3JvbGwgZnJvbSAnaW5maW5pdGUtc2Nyb2xsJ1xyXG5cclxuKGZ1bmN0aW9uIChkb2N1bWVudCkge1xyXG4gIC8vIE5leHQgbGluayBFbGVtZW50XHJcbiAgY29uc3QgbmV4dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1uZXh0XScpXHJcbiAgaWYgKCFuZXh0RWxlbWVudCkgcmV0dXJuXHJcblxyXG4gIC8vIFBvc3QgRmVlZCBlbGVtZW50XHJcbiAgY29uc3QgJGZlZWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWZlZWQtZW50cnknKVxyXG4gIGlmICghJGZlZWRFbGVtZW50KSByZXR1cm5cclxuXHJcbiAgY29uc3QgJHZpZXdNb3JlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWQtbW9yZS1idG4nKVxyXG4gIC8vIGNvbnN0ICRpY29uTG9hZGVyID0gJHZpZXdNb3JlQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5pY29uJylcclxuICAvLyBjb25zdCAkbGFiZWwgPSAkdmlld01vcmVCdXR0b24ucXVlcnlTZWxlY3RvcignLmxhYmVsJylcclxuXHJcbiAgY29uc3QgaW5mU2Nyb2xsID0gbmV3IEluZmluaXRlU2Nyb2xsKCRmZWVkRWxlbWVudCwge1xyXG4gICAgYXBwZW5kOiAnLmpzLXN0b3J5JyxcclxuICAgIGJ1dHRvbjogJHZpZXdNb3JlQnV0dG9uLFxyXG4gICAgaGlzdG9yeTogZmFsc2UsXHJcbiAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICBoaWRlTmF2OiAnLnBhZ2luYXRpb24nLFxyXG4gICAgcGF0aDogJy5wYWdpbmF0aW9uIC5vbGRlci1wb3N0cydcclxuICB9KVxyXG5cclxuICBpbmZTY3JvbGwub24oJ2xvYWQnLCBvblBhZ2VMb2FkKVxyXG5cclxuICBmdW5jdGlvbiBvblBhZ2VMb2FkICgpIHtcclxuICAgIGlmIChpbmZTY3JvbGwubG9hZENvdW50ID09PSAxKSB7XHJcbiAgICAgIC8vIGFmdGVyIDNuZCBwYWdlIGxvYWRlZFxyXG4gICAgICAvLyBkaXNhYmxlIGxvYWRpbmcgb24gc2Nyb2xsXHJcbiAgICAgIGluZlNjcm9sbC5vcHRpb25zLmxvYWRPblNjcm9sbCA9IGZhbHNlXHJcbiAgICAgIC8vIHNob3cgYnV0dG9uXHJcbiAgICAgICR2aWV3TW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmbGV4JylcclxuICAgICAgJHZpZXdNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgICAgIC8vIHJlbW92ZSBldmVudCBsaXN0ZW5lclxyXG4gICAgICBpbmZTY3JvbGwub2ZmKG9uUGFnZUxvYWQpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpbmZTY3JvbGwub24oJ3JlcXVlc3QnLCBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gICAkbGFiZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcclxuICAvLyAgICRpY29uTG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgLy8gfSlcclxuXHJcbiAgLy8gaW5mU2Nyb2xsLm9uKCdhcHBlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gICAkbGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAvLyAgICRpY29uTG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXHJcbiAgLy8gfSlcclxuXHJcbiAgJHZpZXdNb3JlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gbG9hZCBuZXh0IHBhZ2VcclxuICAgIGluZlNjcm9sbC5sb2FkTmV4dFBhZ2UoKVxyXG4gICAgLy8gZW5hYmxlIGxvYWRpbmcgb24gc2Nyb2xsXHJcbiAgICBpbmZTY3JvbGwub3B0aW9ucy5sb2FkT25TY3JvbGwgPSB0cnVlXHJcbiAgICAvLyBoaWRlIHBhZ2VcclxuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcclxuICB9KVxyXG59KShkb2N1bWVudClcclxuIl19

//# sourceMappingURL=map/pagination.js.map
