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
  const nextElement = document.querySelector('link[rel=next]');
  if (!nextElement) return;

  // Post Feed element
  const $feedElement = document.querySelector('.js-feed-entry');
  if (!$feedElement) return;
  const $viewMoreButton = document.querySelector('.load-more-btn');
  // const $iconLoader = $viewMoreButton.querySelector('.icon')
  // const $label = $viewMoreButton.querySelector('.label')

  const infScroll = new _infiniteScroll.default($feedElement, {
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
      infScroll.options.loadOnScroll = false;
      // show button
      $viewMoreButton.classList.add('flex');
      $viewMoreButton.classList.remove('hidden');
      // remove event listener
      infScroll.off(onPageLoad);
    }
  }

  // infScroll.on('request', function () {
  //   $label.classList.add('hidden')
  //   $iconLoader.classList.remove('hidden')
  // })

  // infScroll.on('append', function () {
  //   $label.classList.remove('hidden')
  //   $iconLoader.classList.add('hidden')
  // })

  $viewMoreButton.addEventListener('click', function () {
    // load next page
    infScroll.loadNextPage();
    // enable loading on scroll
    infScroll.options.loadOnScroll = true;
    // hide page
    this.classList.add('hidden');
  });
})(document);

},{"@babel/runtime/helpers/interopRequireDefault":1,"infinite-scroll":7}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvZXYtZW1pdHRlci9ldi1lbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2luZmluaXRlLXNjcm9sbC9qcy9idXR0b24uanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2NvcmUuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2luZmluaXRlLXNjcm9sbC9qcy9wYWdlLWxvYWQuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL3Njcm9sbC13YXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9pbmZpbml0ZS1zY3JvbGwvanMvc3RhdHVzLmpzIiwic3JjL2pzL3BhZ2luYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3RHQTtBQUVBLENBQUMsVUFBVSxRQUFRLEVBQUU7RUFDbkI7RUFDQSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQzVELElBQUksQ0FBQyxXQUFXLEVBQUU7O0VBRWxCO0VBQ0EsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztFQUM3RCxJQUFJLENBQUMsWUFBWSxFQUFFO0VBRW5CLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7RUFDaEU7RUFDQTs7RUFFQSxNQUFNLFNBQVMsR0FBRyxJQUFJLHVCQUFjLENBQUMsWUFBWSxFQUFFO0lBQ2pELE1BQU0sRUFBRSxXQUFXO0lBQ25CLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsS0FBSyxFQUFFLEtBQUs7SUFDWixPQUFPLEVBQUUsYUFBYTtJQUN0QixJQUFJLEVBQUU7RUFDUixDQUFDLENBQUM7RUFFRixTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7RUFFaEMsU0FBUyxVQUFVLEdBQUk7SUFDckIsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRTtNQUM3QjtNQUNBO01BQ0EsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSztNQUN0QztNQUNBLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUNyQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDMUM7TUFDQSxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUMzQjtFQUNGOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWTtJQUNwRDtJQUNBLFNBQVMsQ0FBQyxZQUFZLEVBQUU7SUFDeEI7SUFDQSxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJO0lBQ3JDO0lBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQzlCLENBQUMsQ0FBQztBQUNKLENBQUMsRUFBRSxRQUFRLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsIi8qKlxuICogRXZFbWl0dGVyIHYyLjEuMVxuICogTGlsJyBldmVudCBlbWl0dGVyXG4gKiBNSVQgTGljZW5zZVxuICovXG5cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KUyAtIEJyb3dzZXJpZnksIFdlYnBhY2tcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBnbG9iYWwuRXZFbWl0dGVyID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbigpIHtcblxuZnVuY3Rpb24gRXZFbWl0dGVyKCkge31cblxubGV0IHByb3RvID0gRXZFbWl0dGVyLnByb3RvdHlwZTtcblxucHJvdG8ub24gPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgaWYgKCAhZXZlbnROYW1lIHx8ICFsaXN0ZW5lciApIHJldHVybiB0aGlzO1xuXG4gIC8vIHNldCBldmVudHMgaGFzaFxuICBsZXQgZXZlbnRzID0gdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgbGlzdGVuZXJzIGFycmF5XG4gIGxldCBsaXN0ZW5lcnMgPSBldmVudHNbIGV2ZW50TmFtZSBdID0gZXZlbnRzWyBldmVudE5hbWUgXSB8fCBbXTtcbiAgLy8gb25seSBhZGQgb25jZVxuICBpZiAoICFsaXN0ZW5lcnMuaW5jbHVkZXMoIGxpc3RlbmVyICkgKSB7XG4gICAgbGlzdGVuZXJzLnB1c2goIGxpc3RlbmVyICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9uY2UgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgaWYgKCAhZXZlbnROYW1lIHx8ICFsaXN0ZW5lciApIHJldHVybiB0aGlzO1xuXG4gIC8vIGFkZCBldmVudFxuICB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gIC8vIHNldCBvbmNlIGZsYWdcbiAgLy8gc2V0IG9uY2VFdmVudHMgaGFzaFxuICBsZXQgb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgb25jZUxpc3RlbmVycyBvYmplY3RcbiAgbGV0IG9uY2VMaXN0ZW5lcnMgPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdIHx8IHt9O1xuICAvLyBzZXQgZmxhZ1xuICBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdID0gdHJ1ZTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9mZiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBsZXQgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHJldHVybiB0aGlzO1xuXG4gIGxldCBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKCBsaXN0ZW5lciApO1xuICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgIGxpc3RlbmVycy5zcGxpY2UoIGluZGV4LCAxICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGFyZ3MgKSB7XG4gIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXTtcbiAgaWYgKCAhbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoICkgcmV0dXJuIHRoaXM7XG5cbiAgLy8gY29weSBvdmVyIHRvIGF2b2lkIGludGVyZmVyZW5jZSBpZiAub2ZmKCkgaW4gbGlzdGVuZXJcbiAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCAwICk7XG4gIGFyZ3MgPSBhcmdzIHx8IFtdO1xuICAvLyBvbmNlIHN0dWZmXG4gIGxldCBvbmNlTGlzdGVuZXJzID0gdGhpcy5fb25jZUV2ZW50cyAmJiB0aGlzLl9vbmNlRXZlbnRzWyBldmVudE5hbWUgXTtcblxuICBmb3IgKCBsZXQgbGlzdGVuZXIgb2YgbGlzdGVuZXJzICkge1xuICAgIGxldCBpc09uY2UgPSBvbmNlTGlzdGVuZXJzICYmIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF07XG4gICAgaWYgKCBpc09uY2UgKSB7XG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXJcbiAgICAgIC8vIHJlbW92ZSBiZWZvcmUgdHJpZ2dlciB0byBwcmV2ZW50IHJlY3Vyc2lvblxuICAgICAgdGhpcy5vZmYoIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgICAgIC8vIHVuc2V0IG9uY2UgZmxhZ1xuICAgICAgZGVsZXRlIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF07XG4gICAgfVxuICAgIC8vIHRyaWdnZXIgbGlzdGVuZXJcbiAgICBsaXN0ZW5lci5hcHBseSggdGhpcywgYXJncyApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5hbGxPZmYgPSBmdW5jdGlvbigpIHtcbiAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgZGVsZXRlIHRoaXMuX29uY2VFdmVudHM7XG4gIHJldHVybiB0aGlzO1xufTtcblxucmV0dXJuIEV2RW1pdHRlcjtcblxufSApICk7XG4iLCIvKipcbiAqIEZpenp5IFVJIHV0aWxzIHYzLjAuMFxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoIGdsb2JhbCApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZ2xvYmFsLmZpenp5VUlVdGlscyA9IGZhY3RvcnkoIGdsb2JhbCApO1xuICB9XG5cbn0oIHRoaXMsIGZ1bmN0aW9uIGZhY3RvcnkoIGdsb2JhbCApIHtcblxubGV0IHV0aWxzID0ge307XG5cbi8vIC0tLS0tIGV4dGVuZCAtLS0tLSAvL1xuXG4vLyBleHRlbmRzIG9iamVjdHNcbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbiggYSwgYiApO1xufTtcblxuLy8gLS0tLS0gbW9kdWxvIC0tLS0tIC8vXG5cbnV0aWxzLm1vZHVsbyA9IGZ1bmN0aW9uKCBudW0sIGRpdiApIHtcbiAgcmV0dXJuICggKCBudW0gJSBkaXYgKSArIGRpdiApICUgZGl2O1xufTtcblxuLy8gLS0tLS0gbWFrZUFycmF5IC0tLS0tIC8vXG5cbi8vIHR1cm4gZWxlbWVudCBvciBub2RlTGlzdCBpbnRvIGFuIGFycmF5XG51dGlscy5tYWtlQXJyYXkgPSBmdW5jdGlvbiggb2JqICkge1xuICAvLyB1c2Ugb2JqZWN0IGlmIGFscmVhZHkgYW4gYXJyYXlcbiAgaWYgKCBBcnJheS5pc0FycmF5KCBvYmogKSApIHJldHVybiBvYmo7XG5cbiAgLy8gcmV0dXJuIGVtcHR5IGFycmF5IGlmIHVuZGVmaW5lZCBvciBudWxsLiAjNlxuICBpZiAoIG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCApIHJldHVybiBbXTtcblxuICBsZXQgaXNBcnJheUxpa2UgPSB0eXBlb2Ygb2JqID09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInO1xuICAvLyBjb252ZXJ0IG5vZGVMaXN0IHRvIGFycmF5XG4gIGlmICggaXNBcnJheUxpa2UgKSByZXR1cm4gWyAuLi5vYmogXTtcblxuICAvLyBhcnJheSBvZiBzaW5nbGUgaW5kZXhcbiAgcmV0dXJuIFsgb2JqIF07XG59O1xuXG4vLyAtLS0tLSByZW1vdmVGcm9tIC0tLS0tIC8vXG5cbnV0aWxzLnJlbW92ZUZyb20gPSBmdW5jdGlvbiggYXJ5LCBvYmogKSB7XG4gIGxldCBpbmRleCA9IGFyeS5pbmRleE9mKCBvYmogKTtcbiAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICBhcnkuc3BsaWNlKCBpbmRleCwgMSApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBnZXRQYXJlbnQgLS0tLS0gLy9cblxudXRpbHMuZ2V0UGFyZW50ID0gZnVuY3Rpb24oIGVsZW0sIHNlbGVjdG9yICkge1xuICB3aGlsZSAoIGVsZW0ucGFyZW50Tm9kZSAmJiBlbGVtICE9IGRvY3VtZW50LmJvZHkgKSB7XG4gICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICBpZiAoIGVsZW0ubWF0Y2hlcyggc2VsZWN0b3IgKSApIHJldHVybiBlbGVtO1xuICB9XG59O1xuXG4vLyAtLS0tLSBnZXRRdWVyeUVsZW1lbnQgLS0tLS0gLy9cblxuLy8gdXNlIGVsZW1lbnQgYXMgc2VsZWN0b3Igc3RyaW5nXG51dGlscy5nZXRRdWVyeUVsZW1lbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgaWYgKCB0eXBlb2YgZWxlbSA9PSAnc3RyaW5nJyApIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZWxlbSApO1xuICB9XG4gIHJldHVybiBlbGVtO1xufTtcblxuLy8gLS0tLS0gaGFuZGxlRXZlbnQgLS0tLS0gLy9cblxuLy8gZW5hYmxlIC5vbnR5cGUgdG8gdHJpZ2dlciBmcm9tIC5hZGRFdmVudExpc3RlbmVyKCBlbGVtLCAndHlwZScgKVxudXRpbHMuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGxldCBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZmlsdGVyRmluZEVsZW1lbnRzIC0tLS0tIC8vXG5cbnV0aWxzLmZpbHRlckZpbmRFbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcywgc2VsZWN0b3IgKSB7XG4gIC8vIG1ha2UgYXJyYXkgb2YgZWxlbXNcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG5cbiAgcmV0dXJuIGVsZW1zXG4gICAgLy8gY2hlY2sgdGhhdCBlbGVtIGlzIGFuIGFjdHVhbCBlbGVtZW50XG4gICAgLmZpbHRlciggKCBlbGVtICkgPT4gZWxlbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IClcbiAgICAucmVkdWNlKCAoIGZmRWxlbXMsIGVsZW0gKSA9PiB7XG4gICAgICAvLyBhZGQgZWxlbSBpZiBubyBzZWxlY3RvclxuICAgICAgaWYgKCAhc2VsZWN0b3IgKSB7XG4gICAgICAgIGZmRWxlbXMucHVzaCggZWxlbSApO1xuICAgICAgICByZXR1cm4gZmZFbGVtcztcbiAgICAgIH1cbiAgICAgIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhIHNlbGVjdG9yXG4gICAgICAvLyBmaWx0ZXJcbiAgICAgIGlmICggZWxlbS5tYXRjaGVzKCBzZWxlY3RvciApICkge1xuICAgICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICAgIH1cbiAgICAgIC8vIGZpbmQgY2hpbGRyZW5cbiAgICAgIGxldCBjaGlsZEVsZW1zID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApO1xuICAgICAgLy8gY29uY2F0IGNoaWxkRWxlbXMgdG8gZmlsdGVyRm91bmQgYXJyYXlcbiAgICAgIGZmRWxlbXMgPSBmZkVsZW1zLmNvbmNhdCggLi4uY2hpbGRFbGVtcyApO1xuICAgICAgcmV0dXJuIGZmRWxlbXM7XG4gICAgfSwgW10gKTtcbn07XG5cbi8vIC0tLS0tIGRlYm91bmNlTWV0aG9kIC0tLS0tIC8vXG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kID0gZnVuY3Rpb24oIF9jbGFzcywgbWV0aG9kTmFtZSwgdGhyZXNob2xkICkge1xuICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgMTAwO1xuICAvLyBvcmlnaW5hbCBtZXRob2RcbiAgbGV0IG1ldGhvZCA9IF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXTtcbiAgbGV0IHRpbWVvdXROYW1lID0gbWV0aG9kTmFtZSArICdUaW1lb3V0JztcblxuICBfY2xhc3MucHJvdG90eXBlWyBtZXRob2ROYW1lIF0gPSBmdW5jdGlvbigpIHtcbiAgICBjbGVhclRpbWVvdXQoIHRoaXNbIHRpbWVvdXROYW1lIF0gKTtcblxuICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHRoaXNbIHRpbWVvdXROYW1lIF0gPSBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgICBtZXRob2QuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcbiAgICAgIGRlbGV0ZSB0aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIH0sIHRocmVzaG9sZCApO1xuICB9O1xufTtcblxuLy8gLS0tLS0gZG9jUmVhZHkgLS0tLS0gLy9cblxudXRpbHMuZG9jUmVhZHkgPSBmdW5jdGlvbiggb25Eb2NSZWFkeSApIHtcbiAgbGV0IHJlYWR5U3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICBpZiAoIHJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJyB8fCByZWFkeVN0YXRlID09ICdpbnRlcmFjdGl2ZScgKSB7XG4gICAgLy8gZG8gYXN5bmMgdG8gYWxsb3cgZm9yIG90aGVyIHNjcmlwdHMgdG8gcnVuLiBtZXRhZml6enkvZmxpY2tpdHkjNDQxXG4gICAgc2V0VGltZW91dCggb25Eb2NSZWFkeSApO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Db250ZW50TG9hZGVkJywgb25Eb2NSZWFkeSApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBodG1sSW5pdCAtLS0tLSAvL1xuXG4vLyBodHRwOi8vYml0Lmx5LzNvWUx1c2NcbnV0aWxzLnRvRGFzaGVkID0gZnVuY3Rpb24oIHN0ciApIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKCAvKC4pKFtBLVpdKS9nLCBmdW5jdGlvbiggbWF0Y2gsICQxLCAkMiApIHtcbiAgICByZXR1cm4gJDEgKyAnLScgKyAkMjtcbiAgfSApLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5sZXQgY29uc29sZSA9IGdsb2JhbC5jb25zb2xlO1xuXG4vLyBhbGxvdyB1c2VyIHRvIGluaXRpYWxpemUgY2xhc3NlcyB2aWEgW2RhdGEtbmFtZXNwYWNlXSBvciAuanMtbmFtZXNwYWNlIGNsYXNzXG4vLyBodG1sSW5pdCggV2lkZ2V0LCAnd2lkZ2V0TmFtZScgKVxuLy8gb3B0aW9ucyBhcmUgcGFyc2VkIGZyb20gZGF0YS1uYW1lc3BhY2Utb3B0aW9uc1xudXRpbHMuaHRtbEluaXQgPSBmdW5jdGlvbiggV2lkZ2V0Q2xhc3MsIG5hbWVzcGFjZSApIHtcbiAgdXRpbHMuZG9jUmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgIGxldCBkYXNoZWROYW1lc3BhY2UgPSB1dGlscy50b0Rhc2hlZCggbmFtZXNwYWNlICk7XG4gICAgbGV0IGRhdGFBdHRyID0gJ2RhdGEtJyArIGRhc2hlZE5hbWVzcGFjZTtcbiAgICBsZXQgZGF0YUF0dHJFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGBbJHtkYXRhQXR0cn1dYCApO1xuICAgIGxldCBqUXVlcnkgPSBnbG9iYWwualF1ZXJ5O1xuXG4gICAgWyAuLi5kYXRhQXR0ckVsZW1zIF0uZm9yRWFjaCggKCBlbGVtICkgPT4ge1xuICAgICAgbGV0IGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZSggZGF0YUF0dHIgKTtcbiAgICAgIGxldCBvcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgb3B0aW9ucyA9IGF0dHIgJiYgSlNPTi5wYXJzZSggYXR0ciApO1xuICAgICAgfSBjYXRjaCAoIGVycm9yICkge1xuICAgICAgICAvLyBsb2cgZXJyb3IsIGRvIG5vdCBpbml0aWFsaXplXG4gICAgICAgIGlmICggY29uc29sZSApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCBgRXJyb3IgcGFyc2luZyAke2RhdGFBdHRyfSBvbiAke2VsZW0uY2xhc3NOYW1lfTogJHtlcnJvcn1gICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgbGV0IGluc3RhbmNlID0gbmV3IFdpZGdldENsYXNzKCBlbGVtLCBvcHRpb25zICk7XG4gICAgICAvLyBtYWtlIGF2YWlsYWJsZSB2aWEgJCgpLmRhdGEoJ25hbWVzcGFjZScpXG4gICAgICBpZiAoIGpRdWVyeSApIHtcbiAgICAgICAgalF1ZXJ5LmRhdGEoIGVsZW0sIG5hbWVzcGFjZSwgaW5zdGFuY2UgKTtcbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgfSApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiB1dGlscztcblxufSApICk7XG4iLCIvLyBidXR0b25cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICByZXF1aXJlKCcuL2NvcmUnKSxcbiAgICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICB3aW5kb3cuSW5maW5pdGVTY3JvbGwsXG4gICAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgSW5maW5pdGVTY3JvbGwsIHV0aWxzICkge1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJbmZpbml0ZVNjcm9sbEJ1dHRvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5jbGFzcyBJbmZpbml0ZVNjcm9sbEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKCBlbGVtZW50LCBpbmZTY3JvbGwgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmluZlNjcm9sbCA9IGluZlNjcm9sbDtcbiAgICAvLyBldmVudHNcbiAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMub25DbGljay5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyICk7XG4gICAgaW5mU2Nyb2xsLm9uKCAncmVxdWVzdCcsIHRoaXMuZGlzYWJsZS5iaW5kKCB0aGlzICkgKTtcbiAgICBpbmZTY3JvbGwub24oICdsb2FkJywgdGhpcy5lbmFibGUuYmluZCggdGhpcyApICk7XG4gICAgaW5mU2Nyb2xsLm9uKCAnZXJyb3InLCB0aGlzLmhpZGUuYmluZCggdGhpcyApICk7XG4gICAgaW5mU2Nyb2xsLm9uKCAnbGFzdCcsIHRoaXMuaGlkZS5iaW5kKCB0aGlzICkgKTtcbiAgfVxuXG4gIG9uQ2xpY2soIGV2ZW50ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5pbmZTY3JvbGwubG9hZE5leHRQYWdlKCk7XG4gIH1cblxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5lbGVtZW50LmRpc2FibGVkID0gJ2Rpc2FibGVkJztcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlciApO1xuICB9XG5cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSW5maW5pdGVTY3JvbGwgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBJbmZpbml0ZVNjcm9sbC5kZWZhdWx0cy5idXR0b24gPSBudWxsO1xuXG5JbmZpbml0ZVNjcm9sbC5jcmVhdGUuYnV0dG9uID0gZnVuY3Rpb24oKSB7XG4gIGxldCBidXR0b25FbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCB0aGlzLm9wdGlvbnMuYnV0dG9uICk7XG4gIGlmICggYnV0dG9uRWxlbSApIHtcbiAgICB0aGlzLmJ1dHRvbiA9IG5ldyBJbmZpbml0ZVNjcm9sbEJ1dHRvbiggYnV0dG9uRWxlbSwgdGhpcyApO1xuICB9XG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZXN0cm95LmJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuYnV0dG9uICkgdGhpcy5idXR0b24uZGVzdHJveSgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbkluZmluaXRlU2Nyb2xsLkJ1dHRvbiA9IEluZmluaXRlU2Nyb2xsQnV0dG9uO1xuXG5yZXR1cm4gSW5maW5pdGVTY3JvbGw7XG5cbn0gKSApO1xuIiwiLy8gY29yZVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKSxcbiAgICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkluZmluaXRlU2Nyb2xsID0gZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICB3aW5kb3cuRXZFbWl0dGVyLFxuICAgICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciwgdXRpbHMgKSB7XG5cbmxldCBqUXVlcnkgPSB3aW5kb3cualF1ZXJ5O1xuLy8gaW50ZXJuYWwgc3RvcmUgb2YgYWxsIEluZmluaXRlU2Nyb2xsIGludGFuY2VzXG5sZXQgaW5zdGFuY2VzID0ge307XG5cbmZ1bmN0aW9uIEluZmluaXRlU2Nyb2xsKCBlbGVtZW50LCBvcHRpb25zICkge1xuICBsZXQgcXVlcnlFbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtZW50ICk7XG5cbiAgaWYgKCAhcXVlcnlFbGVtICkge1xuICAgIGNvbnNvbGUuZXJyb3IoICdCYWQgZWxlbWVudCBmb3IgSW5maW5pdGVTY3JvbGw6ICcgKyAoIHF1ZXJ5RWxlbSB8fCBlbGVtZW50ICkgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudCA9IHF1ZXJ5RWxlbTtcbiAgLy8gZG8gbm90IGluaXRpYWxpemUgdHdpY2Ugb24gc2FtZSBlbGVtZW50XG4gIGlmICggZWxlbWVudC5pbmZpbml0ZVNjcm9sbEdVSUQgKSB7XG4gICAgbGV0IGluc3RhbmNlID0gaW5zdGFuY2VzWyBlbGVtZW50LmluZmluaXRlU2Nyb2xsR1VJRCBdO1xuICAgIGluc3RhbmNlLm9wdGlvbiggb3B0aW9ucyApO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIC8vIG9wdGlvbnNcbiAgdGhpcy5vcHRpb25zID0geyAuLi5JbmZpbml0ZVNjcm9sbC5kZWZhdWx0cyB9O1xuICB0aGlzLm9wdGlvbiggb3B0aW9ucyApO1xuICAvLyBhZGQgalF1ZXJ5XG4gIGlmICggalF1ZXJ5ICkge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBqUXVlcnkoIHRoaXMuZWxlbWVudCApO1xuICB9XG5cbiAgdGhpcy5jcmVhdGUoKTtcbn1cblxuLy8gZGVmYXVsdHNcbkluZmluaXRlU2Nyb2xsLmRlZmF1bHRzID0ge1xuICAvLyBwYXRoOiBudWxsLFxuICAvLyBoaWRlTmF2OiBudWxsLFxuICAvLyBkZWJ1ZzogZmFsc2UsXG59O1xuXG4vLyBjcmVhdGUgJiBkZXN0cm95IG1ldGhvZHNcbkluZmluaXRlU2Nyb2xsLmNyZWF0ZSA9IHt9O1xuSW5maW5pdGVTY3JvbGwuZGVzdHJveSA9IHt9O1xuXG5sZXQgcHJvdG8gPSBJbmZpbml0ZVNjcm9sbC5wcm90b3R5cGU7XG4vLyBpbmhlcml0IEV2RW1pdHRlclxuT2JqZWN0LmFzc2lnbiggcHJvdG8sIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdsb2JhbGx5IHVuaXF1ZSBpZGVudGlmaWVyc1xubGV0IEdVSUQgPSAwO1xuXG5wcm90by5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gY3JlYXRlIGNvcmVcbiAgLy8gYWRkIGlkIGZvciBJbmZpbml0ZVNjcm9sbC5kYXRhXG4gIGxldCBpZCA9IHRoaXMuZ3VpZCA9ICsrR1VJRDtcbiAgdGhpcy5lbGVtZW50LmluZmluaXRlU2Nyb2xsR1VJRCA9IGlkOyAvLyBleHBhbmRvXG4gIGluc3RhbmNlc1sgaWQgXSA9IHRoaXM7IC8vIGFzc29jaWF0ZSB2aWEgaWRcbiAgLy8gcHJvcGVydGllc1xuICB0aGlzLnBhZ2VJbmRleCA9IDE7IC8vIGRlZmF1bHQgdG8gZmlyc3QgcGFnZVxuICB0aGlzLmxvYWRDb3VudCA9IDA7XG4gIHRoaXMudXBkYXRlR2V0UGF0aCgpO1xuICAvLyBiYWlsIGlmIGdldFBhdGggbm90IHNldCwgb3IgcmV0dXJucyBmYWxzZXkgIzc3NlxuICBsZXQgaGFzUGF0aCA9IHRoaXMuZ2V0UGF0aCAmJiB0aGlzLmdldFBhdGgoKTtcbiAgaWYgKCAhaGFzUGF0aCApIHtcbiAgICBjb25zb2xlLmVycm9yKCdEaXNhYmxpbmcgSW5maW5pdGVTY3JvbGwnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy51cGRhdGVHZXRBYnNvbHV0ZVBhdGgoKTtcbiAgdGhpcy5sb2coICdpbml0aWFsaXplZCcsIFsgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSBdICk7XG4gIHRoaXMuY2FsbE9uSW5pdCgpO1xuICAvLyBjcmVhdGUgZmVhdHVyZXNcbiAgZm9yICggbGV0IG1ldGhvZCBpbiBJbmZpbml0ZVNjcm9sbC5jcmVhdGUgKSB7XG4gICAgSW5maW5pdGVTY3JvbGwuY3JlYXRlWyBtZXRob2QgXS5jYWxsKCB0aGlzICk7XG4gIH1cbn07XG5cbnByb3RvLm9wdGlvbiA9IGZ1bmN0aW9uKCBvcHRzICkge1xuICBPYmplY3QuYXNzaWduKCB0aGlzLm9wdGlvbnMsIG9wdHMgKTtcbn07XG5cbi8vIGNhbGwgb25Jbml0IG9wdGlvbiwgdXNlZCBmb3IgYmluZGluZyBldmVudHMgb24gaW5pdFxucHJvdG8uY2FsbE9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgb25Jbml0ID0gdGhpcy5vcHRpb25zLm9uSW5pdDtcbiAgaWYgKCBvbkluaXQgKSB7XG4gICAgb25Jbml0LmNhbGwoIHRoaXMsIHRoaXMgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZXZlbnRzIC0tLS0tIC8vXG5cbnByb3RvLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiggdHlwZSwgZXZlbnQsIGFyZ3MgKSB7XG4gIHRoaXMubG9nKCB0eXBlLCBhcmdzICk7XG4gIGxldCBlbWl0QXJncyA9IGV2ZW50ID8gWyBldmVudCBdLmNvbmNhdCggYXJncyApIDogYXJncztcbiAgdGhpcy5lbWl0RXZlbnQoIHR5cGUsIGVtaXRBcmdzICk7XG4gIC8vIHRyaWdnZXIgalF1ZXJ5IGV2ZW50XG4gIGlmICggIWpRdWVyeSB8fCAhdGhpcy4kZWxlbWVudCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gbmFtZXNwYWNlIGpRdWVyeSBldmVudFxuICB0eXBlICs9ICcuaW5maW5pdGVTY3JvbGwnO1xuICBsZXQgJGV2ZW50ID0gdHlwZTtcbiAgaWYgKCBldmVudCApIHtcbiAgICAvLyBjcmVhdGUgalF1ZXJ5IGV2ZW50XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5ldy1jYXAgKi9cbiAgICBsZXQgalFFdmVudCA9IGpRdWVyeS5FdmVudCggZXZlbnQgKTtcbiAgICBqUUV2ZW50LnR5cGUgPSB0eXBlO1xuICAgICRldmVudCA9IGpRRXZlbnQ7XG4gIH1cbiAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCAkZXZlbnQsIGFyZ3MgKTtcbn07XG5cbmxldCBsb2dnZXJzID0ge1xuICBpbml0aWFsaXplZDogKCBjbGFzc05hbWUgKSA9PiBgb24gJHtjbGFzc05hbWV9YCxcbiAgcmVxdWVzdDogKCBwYXRoICkgPT4gYFVSTDogJHtwYXRofWAsXG4gIGxvYWQ6ICggcmVzcG9uc2UsIHBhdGggKSA9PiBgJHtyZXNwb25zZS50aXRsZSB8fCAnJ30uIFVSTDogJHtwYXRofWAsXG4gIGVycm9yOiAoIGVycm9yLCBwYXRoICkgPT4gYCR7ZXJyb3J9LiBVUkw6ICR7cGF0aH1gLFxuICBhcHBlbmQ6ICggcmVzcG9uc2UsIHBhdGgsIGl0ZW1zICkgPT4gYCR7aXRlbXMubGVuZ3RofSBpdGVtcy4gVVJMOiAke3BhdGh9YCxcbiAgbGFzdDogKCByZXNwb25zZSwgcGF0aCApID0+IGBVUkw6ICR7cGF0aH1gLFxuICBoaXN0b3J5OiAoIHRpdGxlLCBwYXRoICkgPT4gYFVSTDogJHtwYXRofWAsXG4gIHBhZ2VJbmRleDogZnVuY3Rpb24oIGluZGV4LCBvcmlnaW4gKSB7XG4gICAgcmV0dXJuIGBjdXJyZW50IHBhZ2UgZGV0ZXJtaW5lZCB0byBiZTogJHtpbmRleH0gZnJvbSAke29yaWdpbn1gO1xuICB9LFxufTtcblxuLy8gbG9nIGV2ZW50c1xucHJvdG8ubG9nID0gZnVuY3Rpb24oIHR5cGUsIGFyZ3MgKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5kZWJ1ZyApIHJldHVybjtcblxuICBsZXQgbWVzc2FnZSA9IGBbSW5maW5pdGVTY3JvbGxdICR7dHlwZX1gO1xuICBsZXQgbG9nZ2VyID0gbG9nZ2Vyc1sgdHlwZSBdO1xuICBpZiAoIGxvZ2dlciApIG1lc3NhZ2UgKz0gJy4gJyArIGxvZ2dlci5hcHBseSggdGhpcywgYXJncyApO1xuICBjb25zb2xlLmxvZyggbWVzc2FnZSApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWV0aG9kcyB1c2VkIGFtb3VuZyBmZWF0dXJlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by51cGRhdGVNZWFzdXJlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIGxldCByZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB0aGlzLnRvcCA9IHJlY3QudG9wICsgd2luZG93LnNjcm9sbFk7XG59O1xuXG5wcm90by51cGRhdGVTY3JvbGxlciA9IGZ1bmN0aW9uKCkge1xuICBsZXQgZWxlbWVudFNjcm9sbCA9IHRoaXMub3B0aW9ucy5lbGVtZW50U2Nyb2xsO1xuICBpZiAoICFlbGVtZW50U2Nyb2xsICkge1xuICAgIC8vIGRlZmF1bHQsIHVzZSB3aW5kb3dcbiAgICB0aGlzLnNjcm9sbGVyID0gd2luZG93O1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBpZiB0cnVlLCBzZXQgdG8gZWxlbWVudCwgb3RoZXJ3aXNlIHVzZSBvcHRpb25cbiAgdGhpcy5zY3JvbGxlciA9IGVsZW1lbnRTY3JvbGwgPT09IHRydWUgPyB0aGlzLmVsZW1lbnQgOlxuICAgIHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbWVudFNjcm9sbCApO1xuICBpZiAoICF0aGlzLnNjcm9sbGVyICkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGZpbmQgZWxlbWVudFNjcm9sbDogJHtlbGVtZW50U2Nyb2xsfWApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwYWdlIHBhdGggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8udXBkYXRlR2V0UGF0aCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgb3B0UGF0aCA9IHRoaXMub3B0aW9ucy5wYXRoO1xuICBpZiAoICFvcHRQYXRoICkge1xuICAgIGNvbnNvbGUuZXJyb3IoYEluZmluaXRlU2Nyb2xsIHBhdGggb3B0aW9uIHJlcXVpcmVkLiBTZXQgYXM6ICR7b3B0UGF0aH1gKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZnVuY3Rpb25cbiAgbGV0IHR5cGUgPSB0eXBlb2Ygb3B0UGF0aDtcbiAgaWYgKCB0eXBlID09ICdmdW5jdGlvbicgKSB7XG4gICAgdGhpcy5nZXRQYXRoID0gb3B0UGF0aDtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gdGVtcGxhdGUgc3RyaW5nOiAnL3BhZ2VzL3t7I319Lmh0bWwnXG4gIGxldCB0ZW1wbGF0ZU1hdGNoID0gdHlwZSA9PSAnc3RyaW5nJyAmJiBvcHRQYXRoLm1hdGNoKCd7eyN9fScpO1xuICBpZiAoIHRlbXBsYXRlTWF0Y2ggKSB7XG4gICAgdGhpcy51cGRhdGVHZXRQYXRoVGVtcGxhdGUoIG9wdFBhdGggKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gc2VsZWN0b3I6ICcubmV4dC1wYWdlLXNlbGVjdG9yJ1xuICB0aGlzLnVwZGF0ZUdldFBhdGhTZWxlY3Rvciggb3B0UGF0aCApO1xufTtcblxucHJvdG8udXBkYXRlR2V0UGF0aFRlbXBsYXRlID0gZnVuY3Rpb24oIG9wdFBhdGggKSB7XG4gIC8vIHNldCBnZXRQYXRoIHdpdGggdGVtcGxhdGUgc3RyaW5nXG4gIHRoaXMuZ2V0UGF0aCA9ICgpID0+IHtcbiAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5wYWdlSW5kZXggKyAxO1xuICAgIHJldHVybiBvcHRQYXRoLnJlcGxhY2UoICd7eyN9fScsIG5leHRJbmRleCApO1xuICB9O1xuICAvLyBnZXQgcGFnZUluZGV4IGZyb20gbG9jYXRpb25cbiAgLy8gY29udmVydCBwYXRoIG9wdGlvbiBpbnRvIHJlZ2V4IHRvIGxvb2sgZm9yIHBhdHRlcm4gaW4gbG9jYXRpb25cbiAgLy8gZXNjYXBlIHF1ZXJ5ICg/KSBpbiB1cmwsIGFsbG93cyBmb3IgcGFyc2luZyBHRVQgcGFyYW1ldGVyc1xuICBsZXQgcmVnZXhTdHJpbmcgPSBvcHRQYXRoXG4gICAgLnJlcGxhY2UoIC8oXFxcXFxcP3xcXD8pLywgJ1xcXFw/JyApXG4gICAgLnJlcGxhY2UoICd7eyN9fScsICcoXFxcXGRcXFxcZD9cXFxcZD8pJyApO1xuICBsZXQgdGVtcGxhdGVSZSA9IG5ldyBSZWdFeHAoIHJlZ2V4U3RyaW5nICk7XG4gIGxldCBtYXRjaCA9IGxvY2F0aW9uLmhyZWYubWF0Y2goIHRlbXBsYXRlUmUgKTtcblxuICBpZiAoIG1hdGNoICkge1xuICAgIHRoaXMucGFnZUluZGV4ID0gcGFyc2VJbnQoIG1hdGNoWzFdLCAxMCApO1xuICAgIHRoaXMubG9nKCAncGFnZUluZGV4JywgWyB0aGlzLnBhZ2VJbmRleCwgJ3RlbXBsYXRlIHN0cmluZycgXSApO1xuICB9XG59O1xuXG5sZXQgcGF0aFJlZ2V4ZXMgPSBbXG4gIC8vIFdvcmRQcmVzcyAmIFR1bWJsciAtIGV4YW1wbGUuY29tL3BhZ2UvMlxuICAvLyBKZWt5bGwgLSBleGFtcGxlLmNvbS9wYWdlMlxuICAvXiguKj9cXC8/cGFnZVxcLz8pKFxcZFxcZD9cXGQ/KSguKj8kKS8sXG4gIC8vIERydXBhbCAtIGV4YW1wbGUuY29tLz9wYWdlPTFcbiAgL14oLio/XFwvP1xcP3BhZ2U9KShcXGRcXGQ/XFxkPykoLio/JCkvLFxuICAvLyBjYXRjaCBhbGwsIGxhc3Qgb2NjdXJlbmNlIG9mIGEgbnVtYmVyXG4gIC8oLio/KShcXGRcXGQ/XFxkPykoPyEuKlxcZCkoLio/JCkvLFxuXTtcblxuLy8gdHJ5IG1hdGNoaW5nIGhyZWYgdG8gcGF0aFJlZ2V4ZXMgcGF0dGVybnNcbmxldCBnZXRQYXRoUGFydHMgPSBJbmZpbml0ZVNjcm9sbC5nZXRQYXRoUGFydHMgPSBmdW5jdGlvbiggaHJlZiApIHtcbiAgaWYgKCAhaHJlZiApIHJldHVybjtcbiAgZm9yICggbGV0IHJlZ2V4IG9mIHBhdGhSZWdleGVzICkge1xuICAgIGxldCBtYXRjaCA9IGhyZWYubWF0Y2goIHJlZ2V4ICk7XG4gICAgaWYgKCBtYXRjaCApIHtcbiAgICAgIGxldCBbICwgYmVnaW4sIGluZGV4LCBlbmQgXSA9IG1hdGNoO1xuICAgICAgcmV0dXJuIHsgYmVnaW4sIGluZGV4LCBlbmQgfTtcbiAgICB9XG4gIH1cbn07XG5cbnByb3RvLnVwZGF0ZUdldFBhdGhTZWxlY3RvciA9IGZ1bmN0aW9uKCBvcHRQYXRoICkge1xuICAvLyBwYXJzZSBocmVmIG9mIGxpbms6ICcubmV4dC1wYWdlLWxpbmsnXG4gIGxldCBocmVmRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIG9wdFBhdGggKTtcbiAgaWYgKCAhaHJlZkVsZW0gKSB7XG4gICAgY29uc29sZS5lcnJvcihgQmFkIEluZmluaXRlU2Nyb2xsIHBhdGggb3B0aW9uLiBOZXh0IGxpbmsgbm90IGZvdW5kOiAke29wdFBhdGh9YCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGhyZWYgPSBocmVmRWxlbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgbGV0IHBhdGhQYXJ0cyA9IGdldFBhdGhQYXJ0cyggaHJlZiApO1xuICBpZiAoICFwYXRoUGFydHMgKSB7XG4gICAgY29uc29sZS5lcnJvcihgSW5maW5pdGVTY3JvbGwgdW5hYmxlIHRvIHBhcnNlIG5leHQgbGluayBocmVmOiAke2hyZWZ9YCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHsgYmVnaW4sIGluZGV4LCBlbmQgfSA9IHBhdGhQYXJ0cztcbiAgdGhpcy5pc1BhdGhTZWxlY3RvciA9IHRydWU7IC8vIGZsYWcgZm9yIGNoZWNrTGFzdFBhZ2UoKVxuICB0aGlzLmdldFBhdGggPSAoKSA9PiBiZWdpbiArICggdGhpcy5wYWdlSW5kZXggKyAxICkgKyBlbmQ7XG4gIC8vIGdldCBwYWdlSW5kZXggZnJvbSBocmVmXG4gIHRoaXMucGFnZUluZGV4ID0gcGFyc2VJbnQoIGluZGV4LCAxMCApIC0gMTtcbiAgdGhpcy5sb2coICdwYWdlSW5kZXgnLCBbIHRoaXMucGFnZUluZGV4LCAnbmV4dCBsaW5rJyBdICk7XG59O1xuXG5wcm90by51cGRhdGVHZXRBYnNvbHV0ZVBhdGggPSBmdW5jdGlvbigpIHtcbiAgbGV0IHBhdGggPSB0aGlzLmdldFBhdGgoKTtcbiAgLy8gcGF0aCBkb2Vzbid0IHN0YXJ0IHdpdGggaHR0cCBvciAvXG4gIGxldCBpc0Fic29sdXRlID0gcGF0aC5tYXRjaCggL15odHRwLyApIHx8IHBhdGgubWF0Y2goIC9eXFwvLyApO1xuICBpZiAoIGlzQWJzb2x1dGUgKSB7XG4gICAgdGhpcy5nZXRBYnNvbHV0ZVBhdGggPSB0aGlzLmdldFBhdGg7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHsgcGF0aG5hbWUgfSA9IGxvY2F0aW9uO1xuICAvLyBxdWVyeSBwYXJhbWV0ZXIgIzgyOS4gZXhhbXBsZS5jb20vP3BnPTJcbiAgbGV0IGlzUXVlcnkgPSBwYXRoLm1hdGNoKCAvXlxcPy8gKTtcbiAgLy8gL2Zvby9iYXIvaW5kZXguaHRtbCA9PiAvZm9vL2JhclxuICBsZXQgZGlyZWN0b3J5ID0gcGF0aG5hbWUuc3Vic3RyaW5nKCAwLCBwYXRobmFtZS5sYXN0SW5kZXhPZignLycpICk7XG4gIGxldCBwYXRoU3RhcnQgPSBpc1F1ZXJ5ID8gcGF0aG5hbWUgOiBkaXJlY3RvcnkgKyAnLyc7XG5cbiAgdGhpcy5nZXRBYnNvbHV0ZVBhdGggPSAoKSA9PiBwYXRoU3RhcnQgKyB0aGlzLmdldFBhdGgoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG5hdiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBoaWRlIG5hdmlnYXRpb25cbkluZmluaXRlU2Nyb2xsLmNyZWF0ZS5oaWRlTmF2ID0gZnVuY3Rpb24oKSB7XG4gIGxldCBuYXYgPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIHRoaXMub3B0aW9ucy5oaWRlTmF2ICk7XG4gIGlmICggIW5hdiApIHJldHVybjtcblxuICBuYXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgdGhpcy5uYXYgPSBuYXY7XG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZXN0cm95LmhpZGVOYXYgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLm5hdiApIHRoaXMubmF2LnN0eWxlLmRpc3BsYXkgPSAnJztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlc3Ryb3kgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFsbE9mZigpOyAvLyByZW1vdmUgYWxsIGV2ZW50IGxpc3RlbmVyc1xuICAvLyBjYWxsIGRlc3Ryb3kgbWV0aG9kc1xuICBmb3IgKCBsZXQgbWV0aG9kIGluIEluZmluaXRlU2Nyb2xsLmRlc3Ryb3kgKSB7XG4gICAgSW5maW5pdGVTY3JvbGwuZGVzdHJveVsgbWV0aG9kIF0uY2FsbCggdGhpcyApO1xuICB9XG5cbiAgZGVsZXRlIHRoaXMuZWxlbWVudC5pbmZpbml0ZVNjcm9sbEdVSUQ7XG4gIGRlbGV0ZSBpbnN0YW5jZXNbIHRoaXMuZ3VpZCBdO1xuICAvLyByZW1vdmUgalF1ZXJ5IGRhdGEuICM4MDdcbiAgaWYgKCBqUXVlcnkgJiYgdGhpcy4kZWxlbWVudCApIHtcbiAgICBqUXVlcnkucmVtb3ZlRGF0YSggdGhpcy5lbGVtZW50LCAnaW5maW5pdGVTY3JvbGwnICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxpdGllcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXG5JbmZpbml0ZVNjcm9sbC50aHJvdHRsZSA9IGZ1bmN0aW9uKCBmbiwgdGhyZXNob2xkICkge1xuICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgMjAwO1xuICBsZXQgbGFzdCwgdGltZW91dDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgbGV0IG5vdyA9ICtuZXcgRGF0ZSgpO1xuICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xuICAgIGxldCB0cmlnZ2VyID0gKCkgPT4ge1xuICAgICAgbGFzdCA9IG5vdztcbiAgICAgIGZuLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gICAgfTtcbiAgICBpZiAoIGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaG9sZCApIHtcbiAgICAgIC8vIGhvbGQgb24gdG8gaXRcbiAgICAgIGNsZWFyVGltZW91dCggdGltZW91dCApO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoIHRyaWdnZXIsIHRocmVzaG9sZCApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmlnZ2VyKCk7XG4gICAgfVxuICB9O1xufTtcblxuSW5maW5pdGVTY3JvbGwuZGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBlbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtICk7XG4gIGxldCBpZCA9IGVsZW0gJiYgZWxlbS5pbmZpbml0ZVNjcm9sbEdVSUQ7XG4gIHJldHVybiBpZCAmJiBpbnN0YW5jZXNbIGlkIF07XG59O1xuXG4vLyBzZXQgaW50ZXJuYWwgalF1ZXJ5LCBmb3IgV2VicGFjayArIGpRdWVyeSB2M1xuSW5maW5pdGVTY3JvbGwuc2V0SlF1ZXJ5ID0gZnVuY3Rpb24oIGpxcnkgKSB7XG4gIGpRdWVyeSA9IGpxcnk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzZXR1cCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5odG1sSW5pdCggSW5maW5pdGVTY3JvbGwsICdpbmZpbml0ZS1zY3JvbGwnICk7XG5cbi8vIGFkZCBub29wIF9pbml0IG1ldGhvZCBmb3IgalF1ZXJ5IEJyaWRnZXQuICM3NjhcbnByb3RvLl9pbml0ID0gZnVuY3Rpb24oKSB7fTtcblxubGV0IHsgalF1ZXJ5QnJpZGdldCB9ID0gd2luZG93O1xuaWYgKCBqUXVlcnkgJiYgalF1ZXJ5QnJpZGdldCApIHtcbiAgalF1ZXJ5QnJpZGdldCggJ2luZmluaXRlU2Nyb2xsJywgSW5maW5pdGVTY3JvbGwsIGpRdWVyeSApO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIEluZmluaXRlU2Nyb2xsO1xuXG59ICkgKTtcbiIsIi8vIGhpc3RvcnlcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICByZXF1aXJlKCcuL2NvcmUnKSxcbiAgICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgICAgd2luZG93LFxuICAgICAgICB3aW5kb3cuSW5maW5pdGVTY3JvbGwsXG4gICAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgSW5maW5pdGVTY3JvbGwsIHV0aWxzICkge1xuXG5sZXQgcHJvdG8gPSBJbmZpbml0ZVNjcm9sbC5wcm90b3R5cGU7XG5cbk9iamVjdC5hc3NpZ24oIEluZmluaXRlU2Nyb2xsLmRlZmF1bHRzLCB7XG4gIGhpc3Rvcnk6ICdyZXBsYWNlJyxcbiAgLy8gaGlzdG9yeVRpdGxlOiBmYWxzZSxcbn0gKTtcblxubGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbi8vIC0tLS0tIGNyZWF0ZS9kZXN0cm95IC0tLS0tIC8vXG5cbkluZmluaXRlU2Nyb2xsLmNyZWF0ZS5oaXN0b3J5ID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5oaXN0b3J5ICkgcmV0dXJuO1xuXG4gIC8vIGNoZWNrIGZvciBzYW1lIG9yaWdpblxuICBsaW5rLmhyZWYgPSB0aGlzLmdldEFic29sdXRlUGF0aCgpO1xuICAvLyBNUyBFZGdlIGRvZXMgbm90IGhhdmUgb3JpZ2luIG9uIGxpbmtcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTIyMzY0OTMvXG4gIGxldCBsaW5rT3JpZ2luID0gbGluay5vcmlnaW4gfHwgbGluay5wcm90b2NvbCArICcvLycgKyBsaW5rLmhvc3Q7XG4gIGxldCBpc1NhbWVPcmlnaW4gPSBsaW5rT3JpZ2luID09IGxvY2F0aW9uLm9yaWdpbjtcbiAgaWYgKCAhaXNTYW1lT3JpZ2luICkge1xuICAgIGNvbnNvbGUuZXJyb3IoICdbSW5maW5pdGVTY3JvbGxdIGNhbm5vdCBzZXQgaGlzdG9yeSB3aXRoIGRpZmZlcmVudCBvcmlnaW46ICcgK1xuICAgICAgYCR7bGluay5vcmlnaW59IG9uICR7bG9jYXRpb24ub3JpZ2lufSAuIEhpc3RvcnkgYmVoYXZpb3IgZGlzYWJsZWQuYCApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHR3byB3YXlzIHRvIGhhbmRsZSBjaGFuZ2luZyBoaXN0b3J5XG4gIGlmICggdGhpcy5vcHRpb25zLmFwcGVuZCApIHtcbiAgICB0aGlzLmNyZWF0ZUhpc3RvcnlBcHBlbmQoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmNyZWF0ZUhpc3RvcnlQYWdlTG9hZCgpO1xuICB9XG59O1xuXG5wcm90by5jcmVhdGVIaXN0b3J5QXBwZW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudXBkYXRlTWVhc3VyZW1lbnRzKCk7XG4gIHRoaXMudXBkYXRlU2Nyb2xsZXIoKTtcbiAgLy8gYXJyYXkgb2Ygc2Nyb2xsIHBvc2l0aW9ucyBvZiBhcHBlbmRlZCBwYWdlc1xuICB0aGlzLnNjcm9sbFBhZ2VzID0gW1xuICAgIC8vIGZpcnN0IHBhZ2VcbiAgICB7XG4gICAgICB0b3A6IDAsXG4gICAgICBwYXRoOiBsb2NhdGlvbi5ocmVmLFxuICAgICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlLFxuICAgIH0sXG4gIF07XG4gIHRoaXMuc2Nyb2xsUGFnZSA9IHRoaXMuc2Nyb2xsUGFnZXNbMF07XG4gIC8vIGV2ZW50c1xuICB0aGlzLnNjcm9sbEhpc3RvcnlIYW5kbGVyID0gdGhpcy5vblNjcm9sbEhpc3RvcnkuYmluZCggdGhpcyApO1xuICB0aGlzLnVubG9hZEhhbmRsZXIgPSB0aGlzLm9uVW5sb2FkLmJpbmQoIHRoaXMgKTtcbiAgdGhpcy5zY3JvbGxlci5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgdGhpcy5zY3JvbGxIaXN0b3J5SGFuZGxlciApO1xuICB0aGlzLm9uKCAnYXBwZW5kJywgdGhpcy5vbkFwcGVuZEhpc3RvcnkgKTtcbiAgdGhpcy5iaW5kSGlzdG9yeUFwcGVuZEV2ZW50cyggdHJ1ZSApO1xufTtcblxucHJvdG8uYmluZEhpc3RvcnlBcHBlbmRFdmVudHMgPSBmdW5jdGlvbiggaXNCaW5kICkge1xuICBsZXQgYWRkUmVtb3ZlID0gaXNCaW5kID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuICB0aGlzLnNjcm9sbGVyWyBhZGRSZW1vdmUgXSggJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGlzdG9yeUhhbmRsZXIgKTtcbiAgd2luZG93WyBhZGRSZW1vdmUgXSggJ3VubG9hZCcsIHRoaXMudW5sb2FkSGFuZGxlciApO1xufTtcblxucHJvdG8uY3JlYXRlSGlzdG9yeVBhZ2VMb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub24oICdsb2FkJywgdGhpcy5vblBhZ2VMb2FkSGlzdG9yeSApO1xufTtcblxuSW5maW5pdGVTY3JvbGwuZGVzdHJveS5oaXN0b3J5ID1cbnByb3RvLmRlc3Ryb3lIaXN0b3J5ID0gZnVuY3Rpb24oKSB7XG4gIGxldCBpc0hpc3RvcnlBcHBlbmQgPSB0aGlzLm9wdGlvbnMuaGlzdG9yeSAmJiB0aGlzLm9wdGlvbnMuYXBwZW5kO1xuICBpZiAoIGlzSGlzdG9yeUFwcGVuZCApIHtcbiAgICB0aGlzLmJpbmRIaXN0b3J5QXBwZW5kRXZlbnRzKCBmYWxzZSApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBhcHBlbmQgaGlzdG9yeSAtLS0tLSAvL1xuXG5wcm90by5vbkFwcGVuZEhpc3RvcnkgPSBmdW5jdGlvbiggcmVzcG9uc2UsIHBhdGgsIGl0ZW1zICkge1xuICAvLyBkbyBub3QgcHJvY2VlZCBpZiBubyBpdGVtcy4gIzc3OVxuICBpZiAoICFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoICkgcmV0dXJuO1xuXG4gIGxldCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgbGV0IGVsZW1TY3JvbGxZID0gdGhpcy5nZXRFbGVtZW50U2Nyb2xsWSggZmlyc3RJdGVtICk7XG4gIC8vIHJlc29sdmUgcGF0aFxuICBsaW5rLmhyZWYgPSBwYXRoO1xuICAvLyBhZGQgcGFnZSBkYXRhIHRvIGhhc2hcbiAgdGhpcy5zY3JvbGxQYWdlcy5wdXNoKHtcbiAgICB0b3A6IGVsZW1TY3JvbGxZLFxuICAgIHBhdGg6IGxpbmsuaHJlZixcbiAgICB0aXRsZTogcmVzcG9uc2UudGl0bGUsXG4gIH0pO1xufTtcblxucHJvdG8uZ2V0RWxlbWVudFNjcm9sbFkgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgaWYgKCB0aGlzLm9wdGlvbnMuZWxlbWVudFNjcm9sbCApIHtcbiAgICByZXR1cm4gZWxlbS5vZmZzZXRUb3AgLSB0aGlzLnRvcDtcbiAgfSBlbHNlIHtcbiAgICBsZXQgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHJlY3QudG9wICsgd2luZG93LnNjcm9sbFk7XG4gIH1cbn07XG5cbnByb3RvLm9uU2Nyb2xsSGlzdG9yeSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjeWNsZSB0aHJvdWdoIHBvc2l0aW9ucywgZmluZCBiaWdnZXN0IHdpdGhvdXQgZ29pbmcgb3ZlclxuICBsZXQgc2Nyb2xsUGFnZSA9IHRoaXMuZ2V0Q2xvc2VzdFNjcm9sbFBhZ2UoKTtcbiAgLy8gc2V0IGhpc3RvcnkgaWYgY2hhbmdlZFxuICBpZiAoIHNjcm9sbFBhZ2UgIT0gdGhpcy5zY3JvbGxQYWdlICkge1xuICAgIHRoaXMuc2Nyb2xsUGFnZSA9IHNjcm9sbFBhZ2U7XG4gICAgdGhpcy5zZXRIaXN0b3J5KCBzY3JvbGxQYWdlLnRpdGxlLCBzY3JvbGxQYWdlLnBhdGggKTtcbiAgfVxufTtcblxudXRpbHMuZGVib3VuY2VNZXRob2QoIEluZmluaXRlU2Nyb2xsLCAnb25TY3JvbGxIaXN0b3J5JywgMTUwICk7XG5cbnByb3RvLmdldENsb3Nlc3RTY3JvbGxQYWdlID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzY3JvbGxWaWV3WTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMuZWxlbWVudFNjcm9sbCApIHtcbiAgICBzY3JvbGxWaWV3WSA9IHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wICsgdGhpcy5zY3JvbGxlci5jbGllbnRIZWlnaHQgLyAyO1xuICB9IGVsc2Uge1xuICAgIHNjcm9sbFZpZXdZID0gd2luZG93LnNjcm9sbFkgKyB0aGlzLndpbmRvd0hlaWdodCAvIDI7XG4gIH1cblxuICBsZXQgc2Nyb2xsUGFnZTtcbiAgZm9yICggbGV0IHBhZ2Ugb2YgdGhpcy5zY3JvbGxQYWdlcyApIHtcbiAgICBpZiAoIHBhZ2UudG9wID49IHNjcm9sbFZpZXdZICkgYnJlYWs7XG5cbiAgICBzY3JvbGxQYWdlID0gcGFnZTtcbiAgfVxuICByZXR1cm4gc2Nyb2xsUGFnZTtcbn07XG5cbnByb3RvLnNldEhpc3RvcnkgPSBmdW5jdGlvbiggdGl0bGUsIHBhdGggKSB7XG4gIGxldCBvcHRIaXN0b3J5ID0gdGhpcy5vcHRpb25zLmhpc3Rvcnk7XG4gIGxldCBoaXN0b3J5TWV0aG9kID0gb3B0SGlzdG9yeSAmJiBoaXN0b3J5WyBvcHRIaXN0b3J5ICsgJ1N0YXRlJyBdO1xuICBpZiAoICFoaXN0b3J5TWV0aG9kICkgcmV0dXJuO1xuXG4gIGhpc3RvcnlbIG9wdEhpc3RvcnkgKyAnU3RhdGUnIF0oIG51bGwsIHRpdGxlLCBwYXRoICk7XG4gIGlmICggdGhpcy5vcHRpb25zLmhpc3RvcnlUaXRsZSApIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2hpc3RvcnknLCBudWxsLCBbIHRpdGxlLCBwYXRoIF0gKTtcbn07XG5cbi8vIHNjcm9sbCB0byB0b3AgdG8gcHJldmVudCBpbml0aWFsIHNjcm9sbC1yZXNldCBhZnRlciBwYWdlIHJlZnJlc2hcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xODYzMzkxNS8xODIxODNcbnByb3RvLm9uVW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5zY3JvbGxQYWdlLnRvcCA9PT0gMCApIHJldHVybjtcblxuICAvLyBjYWxjdWxhdGUgd2hlcmUgc2Nyb2xsIHBvc2l0aW9uIHdvdWxkIGJlIG9uIHJlZnJlc2hcbiAgbGV0IHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWSAtIHRoaXMuc2Nyb2xsUGFnZS50b3AgKyB0aGlzLnRvcDtcbiAgLy8gZGlzYWJsZSBzY3JvbGwgZXZlbnQgYmVmb3JlIHNldHRpbmcgc2Nyb2xsICM2NzlcbiAgdGhpcy5kZXN0cm95SGlzdG9yeSgpO1xuICBzY3JvbGxUbyggMCwgc2Nyb2xsWSApO1xufTtcblxuLy8gLS0tLS0gbG9hZCBoaXN0b3J5IC0tLS0tIC8vXG5cbi8vIHVwZGF0ZSBVUkxcbnByb3RvLm9uUGFnZUxvYWRIaXN0b3J5ID0gZnVuY3Rpb24oIHJlc3BvbnNlLCBwYXRoICkge1xuICB0aGlzLnNldEhpc3RvcnkoIHJlc3BvbnNlLnRpdGxlLCBwYXRoICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIEluZmluaXRlU2Nyb2xsO1xuXG59ICkgKTtcbiIsIi8qIVxuICogSW5maW5pdGUgU2Nyb2xsIHY0LjAuMVxuICogQXV0b21hdGljYWxseSBhZGQgbmV4dCBwYWdlXG4gKlxuICogTGljZW5zZWQgR1BMdjMgZm9yIG9wZW4gc291cmNlIHVzZVxuICogb3IgSW5maW5pdGUgU2Nyb2xsIENvbW1lcmNpYWwgTGljZW5zZSBmb3IgY29tbWVyY2lhbCB1c2VcbiAqXG4gKiBodHRwczovL2luZmluaXRlLXNjcm9sbC5jb21cbiAqIENvcHlyaWdodCAyMDE4LTIwMjAgTWV0YWZpenp5XG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgICByZXF1aXJlKCcuL2NvcmUnKSxcbiAgICAgICAgcmVxdWlyZSgnLi9wYWdlLWxvYWQnKSxcbiAgICAgICAgcmVxdWlyZSgnLi9zY3JvbGwtd2F0Y2gnKSxcbiAgICAgICAgcmVxdWlyZSgnLi9oaXN0b3J5JyksXG4gICAgICAgIHJlcXVpcmUoJy4vYnV0dG9uJyksXG4gICAgICAgIHJlcXVpcmUoJy4vc3RhdHVzJyksXG4gICAgKTtcbiAgfVxuXG59ICkoIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggSW5maW5pdGVTY3JvbGwgKSB7XG4gIHJldHVybiBJbmZpbml0ZVNjcm9sbDtcbn0gKTtcbiIsIi8vIHBhZ2UtbG9hZFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHJlcXVpcmUoJy4vY29yZScpLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHdpbmRvdy5JbmZpbml0ZVNjcm9sbCxcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBJbmZpbml0ZVNjcm9sbCApIHtcblxubGV0IHByb3RvID0gSW5maW5pdGVTY3JvbGwucHJvdG90eXBlO1xuXG5PYmplY3QuYXNzaWduKCBJbmZpbml0ZVNjcm9sbC5kZWZhdWx0cywge1xuICAvLyBhcHBlbmQ6IGZhbHNlLFxuICBsb2FkT25TY3JvbGw6IHRydWUsXG4gIGNoZWNrTGFzdFBhZ2U6IHRydWUsXG4gIHJlc3BvbnNlQm9keTogJ3RleHQnLFxuICBkb21QYXJzZVJlc3BvbnNlOiB0cnVlLFxuICAvLyBwcmVmaWxsOiBmYWxzZSxcbiAgLy8gb3V0bGF5ZXI6IG51bGwsXG59ICk7XG5cbkluZmluaXRlU2Nyb2xsLmNyZWF0ZS5wYWdlTG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNhbkxvYWQgPSB0cnVlO1xuICB0aGlzLm9uKCAnc2Nyb2xsVGhyZXNob2xkJywgdGhpcy5vblNjcm9sbFRocmVzaG9sZExvYWQgKTtcbiAgdGhpcy5vbiggJ2xvYWQnLCB0aGlzLmNoZWNrTGFzdFBhZ2UgKTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMub3V0bGF5ZXIgKSB7XG4gICAgdGhpcy5vbiggJ2FwcGVuZCcsIHRoaXMub25BcHBlbmRPdXRsYXllciApO1xuICB9XG59O1xuXG5wcm90by5vblNjcm9sbFRocmVzaG9sZExvYWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLm9wdGlvbnMubG9hZE9uU2Nyb2xsICkgdGhpcy5sb2FkTmV4dFBhZ2UoKTtcbn07XG5cbmxldCBkb21QYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG5cbnByb3RvLmxvYWROZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNMb2FkaW5nIHx8ICF0aGlzLmNhbkxvYWQgKSByZXR1cm47XG5cbiAgbGV0IHsgcmVzcG9uc2VCb2R5LCBkb21QYXJzZVJlc3BvbnNlLCBmZXRjaE9wdGlvbnMgfSA9IHRoaXMub3B0aW9ucztcbiAgbGV0IHBhdGggPSB0aGlzLmdldEFic29sdXRlUGF0aCgpO1xuICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gIGlmICggdHlwZW9mIGZldGNoT3B0aW9ucyA9PSAnZnVuY3Rpb24nICkgZmV0Y2hPcHRpb25zID0gZmV0Y2hPcHRpb25zKCk7XG5cbiAgbGV0IGZldGNoUHJvbWlzZSA9IGZldGNoKCBwYXRoLCBmZXRjaE9wdGlvbnMgKVxuICAgIC50aGVuKCAoIHJlc3BvbnNlICkgPT4ge1xuICAgICAgaWYgKCAhcmVzcG9uc2Uub2sgKSB7XG4gICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvciggcmVzcG9uc2Uuc3RhdHVzVGV4dCApO1xuICAgICAgICB0aGlzLm9uUGFnZUVycm9yKCBlcnJvciwgcGF0aCwgcmVzcG9uc2UgKTtcbiAgICAgICAgcmV0dXJuIHsgcmVzcG9uc2UgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlWyByZXNwb25zZUJvZHkgXSgpLnRoZW4oICggYm9keSApID0+IHtcbiAgICAgICAgbGV0IGNhbkRvbVBhcnNlID0gcmVzcG9uc2VCb2R5ID09ICd0ZXh0JyAmJiBkb21QYXJzZVJlc3BvbnNlO1xuICAgICAgICBpZiAoIGNhbkRvbVBhcnNlICkge1xuICAgICAgICAgIGJvZHkgPSBkb21QYXJzZXIucGFyc2VGcm9tU3RyaW5nKCBib2R5LCAndGV4dC9odG1sJyApO1xuICAgICAgICB9XG4gICAgICAgIGlmICggcmVzcG9uc2Uuc3RhdHVzID09IDIwNCApIHtcbiAgICAgICAgICB0aGlzLmxhc3RQYWdlUmVhY2hlZCggYm9keSwgcGF0aCApO1xuICAgICAgICAgIHJldHVybiB7IGJvZHksIHJlc3BvbnNlIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub25QYWdlTG9hZCggYm9keSwgcGF0aCwgcmVzcG9uc2UgKTtcbiAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0gKVxuICAgIC5jYXRjaCggKCBlcnJvciApID0+IHtcbiAgICAgIHRoaXMub25QYWdlRXJyb3IoIGVycm9yLCBwYXRoICk7XG4gICAgfSApO1xuXG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3JlcXVlc3QnLCBudWxsLCBbIHBhdGgsIGZldGNoUHJvbWlzZSBdICk7XG5cbiAgcmV0dXJuIGZldGNoUHJvbWlzZTtcbn07XG5cbnByb3RvLm9uUGFnZUxvYWQgPSBmdW5jdGlvbiggYm9keSwgcGF0aCwgcmVzcG9uc2UgKSB7XG4gIC8vIGRvbmUgbG9hZGluZyBpZiBub3QgYXBwZW5kaW5nXG4gIGlmICggIXRoaXMub3B0aW9ucy5hcHBlbmQgKSB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgfVxuICB0aGlzLnBhZ2VJbmRleCsrO1xuICB0aGlzLmxvYWRDb3VudCsrO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdsb2FkJywgbnVsbCwgWyBib2R5LCBwYXRoLCByZXNwb25zZSBdICk7XG4gIHJldHVybiB0aGlzLmFwcGVuZE5leHRQYWdlKCBib2R5LCBwYXRoLCByZXNwb25zZSApO1xufTtcblxucHJvdG8uYXBwZW5kTmV4dFBhZ2UgPSBmdW5jdGlvbiggYm9keSwgcGF0aCwgcmVzcG9uc2UgKSB7XG4gIGxldCB7IGFwcGVuZCwgcmVzcG9uc2VCb2R5LCBkb21QYXJzZVJlc3BvbnNlIH0gPSB0aGlzLm9wdGlvbnM7XG4gIC8vIGRvIG5vdCBhcHBlbmQganNvblxuICBsZXQgaXNEb2N1bWVudCA9IHJlc3BvbnNlQm9keSA9PSAndGV4dCcgJiYgZG9tUGFyc2VSZXNwb25zZTtcbiAgaWYgKCAhaXNEb2N1bWVudCB8fCAhYXBwZW5kICkgcmV0dXJuIHsgYm9keSwgcmVzcG9uc2UgfTtcblxuICBsZXQgaXRlbXMgPSBib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoIGFwcGVuZCApO1xuICBsZXQgcHJvbWlzZVZhbHVlID0geyBib2R5LCByZXNwb25zZSwgaXRlbXMgfTtcbiAgLy8gbGFzdCBwYWdlIGhpdCBpZiBubyBpdGVtcy4gIzg0MFxuICBpZiAoICFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoICkge1xuICAgIHRoaXMubGFzdFBhZ2VSZWFjaGVkKCBib2R5LCBwYXRoICk7XG4gICAgcmV0dXJuIHByb21pc2VWYWx1ZTtcbiAgfVxuXG4gIGxldCBmcmFnbWVudCA9IGdldEl0ZW1zRnJhZ21lbnQoIGl0ZW1zICk7XG4gIGxldCBhcHBlbmRSZWFkeSA9ICgpID0+IHtcbiAgICB0aGlzLmFwcGVuZEl0ZW1zKCBpdGVtcywgZnJhZ21lbnQgKTtcbiAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2FwcGVuZCcsIG51bGwsIFsgYm9keSwgcGF0aCwgaXRlbXMsIHJlc3BvbnNlIF0gKTtcbiAgICByZXR1cm4gcHJvbWlzZVZhbHVlO1xuICB9O1xuXG4gIC8vIFRPRE8gYWRkIGhvb2sgZm9yIG9wdGlvbiB0byB0cmlnZ2VyIGFwcGVuZFJlYWR5XG4gIGlmICggdGhpcy5vcHRpb25zLm91dGxheWVyICkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZE91dGxheWVySXRlbXMoIGZyYWdtZW50LCBhcHBlbmRSZWFkeSApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhcHBlbmRSZWFkeSgpO1xuICB9XG59O1xuXG5wcm90by5hcHBlbmRJdGVtcyA9IGZ1bmN0aW9uKCBpdGVtcywgZnJhZ21lbnQgKSB7XG4gIGlmICggIWl0ZW1zIHx8ICFpdGVtcy5sZW5ndGggKSByZXR1cm47XG5cbiAgLy8gZ2V0IGZyYWdtZW50IGlmIG5vdCBwcm92aWRlZFxuICBmcmFnbWVudCA9IGZyYWdtZW50IHx8IGdldEl0ZW1zRnJhZ21lbnQoIGl0ZW1zICk7XG4gIHJlZnJlc2hTY3JpcHRzKCBmcmFnbWVudCApO1xuICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoIGZyYWdtZW50ICk7XG59O1xuXG5mdW5jdGlvbiBnZXRJdGVtc0ZyYWdtZW50KCBpdGVtcyApIHtcbiAgLy8gYWRkIGl0ZW1zIHRvIGZyYWdtZW50XG4gIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgaWYgKCBpdGVtcyApIGZyYWdtZW50LmFwcGVuZCggLi4uaXRlbXMgKTtcbiAgcmV0dXJuIGZyYWdtZW50O1xufVxuXG4vLyByZXBsYWNlIDxzY3JpcHQ+cyB3aXRoIGNvcGllcyBzbyB0aGV5IGxvYWRcbi8vIDxzY3JpcHQ+cyBhZGRlZCBieSBJbmZpbml0ZVNjcm9sbCB3aWxsIG5vdCBsb2FkXG4vLyBzaW1pbGFyIHRvIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYxMDk5NVxuZnVuY3Rpb24gcmVmcmVzaFNjcmlwdHMoIGZyYWdtZW50ICkge1xuICBsZXQgc2NyaXB0cyA9IGZyYWdtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpO1xuICBmb3IgKCBsZXQgc2NyaXB0IG9mIHNjcmlwdHMgKSB7XG4gICAgbGV0IGZyZXNoU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgLy8gY29weSBhdHRyaWJ1dGVzXG4gICAgbGV0IGF0dHJzID0gc2NyaXB0LmF0dHJpYnV0ZXM7XG4gICAgZm9yICggbGV0IGF0dHIgb2YgYXR0cnMgKSB7XG4gICAgICBmcmVzaFNjcmlwdC5zZXRBdHRyaWJ1dGUoIGF0dHIubmFtZSwgYXR0ci52YWx1ZSApO1xuICAgIH1cbiAgICAvLyBjb3B5IGlubmVyIHNjcmlwdCBjb2RlLiAjNzE4LCAjNzgyXG4gICAgZnJlc2hTY3JpcHQuaW5uZXJIVE1MID0gc2NyaXB0LmlubmVySFRNTDtcbiAgICBzY3JpcHQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoIGZyZXNoU2NyaXB0LCBzY3JpcHQgKTtcbiAgfVxufVxuXG4vLyAtLS0tLSBvdXRsYXllciAtLS0tLSAvL1xuXG5wcm90by5hcHBlbmRPdXRsYXllckl0ZW1zID0gZnVuY3Rpb24oIGZyYWdtZW50LCBhcHBlbmRSZWFkeSApIHtcbiAgbGV0IGltYWdlc0xvYWRlZCA9IEluZmluaXRlU2Nyb2xsLmltYWdlc0xvYWRlZCB8fCB3aW5kb3cuaW1hZ2VzTG9hZGVkO1xuICBpZiAoICFpbWFnZXNMb2FkZWQgKSB7XG4gICAgY29uc29sZS5lcnJvcignW0luZmluaXRlU2Nyb2xsXSBpbWFnZXNMb2FkZWQgcmVxdWlyZWQgZm9yIG91dGxheWVyIG9wdGlvbicpO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGFwcGVuZCBvbmNlIGltYWdlcyBsb2FkZWRcbiAgcmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiggcmVzb2x2ZSApIHtcbiAgICBpbWFnZXNMb2FkZWQoIGZyYWdtZW50LCBmdW5jdGlvbigpIHtcbiAgICAgIGxldCBib2R5UmVzcG9uc2UgPSBhcHBlbmRSZWFkeSgpO1xuICAgICAgcmVzb2x2ZSggYm9keVJlc3BvbnNlICk7XG4gICAgfSApO1xuICB9ICk7XG59O1xuXG5wcm90by5vbkFwcGVuZE91dGxheWVyID0gZnVuY3Rpb24oIHJlc3BvbnNlLCBwYXRoLCBpdGVtcyApIHtcbiAgdGhpcy5vcHRpb25zLm91dGxheWVyLmFwcGVuZGVkKCBpdGVtcyApO1xufTtcblxuLy8gLS0tLS0gY2hlY2tMYXN0UGFnZSAtLS0tLSAvL1xuXG4vLyBjaGVjayByZXNwb25zZSBmb3IgbmV4dCBlbGVtZW50XG5wcm90by5jaGVja0xhc3RQYWdlID0gZnVuY3Rpb24oIGJvZHksIHBhdGggKSB7XG4gIGxldCB7IGNoZWNrTGFzdFBhZ2UsIHBhdGg6IHBhdGhPcHQgfSA9IHRoaXMub3B0aW9ucztcbiAgaWYgKCAhY2hlY2tMYXN0UGFnZSApIHJldHVybjtcblxuICAvLyBpZiBwYXRoIGlzIGZ1bmN0aW9uLCBjaGVjayBpZiBuZXh0IHBhdGggaXMgdHJ1dGh5XG4gIGlmICggdHlwZW9mIHBhdGhPcHQgPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICBsZXQgbmV4dFBhdGggPSB0aGlzLmdldFBhdGgoKTtcbiAgICBpZiAoICFuZXh0UGF0aCApIHtcbiAgICAgIHRoaXMubGFzdFBhZ2VSZWFjaGVkKCBib2R5LCBwYXRoICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIC8vIGdldCBzZWxlY3RvciBmcm9tIGNoZWNrTGFzdFBhZ2Ugb3IgcGF0aCBvcHRpb25cbiAgbGV0IHNlbGVjdG9yO1xuICBpZiAoIHR5cGVvZiBjaGVja0xhc3RQYWdlID09ICdzdHJpbmcnICkge1xuICAgIHNlbGVjdG9yID0gY2hlY2tMYXN0UGFnZTtcbiAgfSBlbHNlIGlmICggdGhpcy5pc1BhdGhTZWxlY3RvciApIHtcbiAgICAvLyBwYXRoIG9wdGlvbiBpcyBzZWxlY3RvciBzdHJpbmdcbiAgICBzZWxlY3RvciA9IHBhdGhPcHQ7XG4gIH1cbiAgLy8gY2hlY2sgbGFzdCBwYWdlIGZvciBzZWxlY3RvclxuICAvLyBiYWlsIGlmIG5vIHNlbGVjdG9yIG9yIG5vdCBkb2N1bWVudCByZXNwb25zZVxuICBpZiAoICFzZWxlY3RvciB8fCAhYm9keS5xdWVyeVNlbGVjdG9yICkgcmV0dXJuO1xuXG4gIC8vIGNoZWNrIGlmIHJlc3BvbnNlIGhhcyBzZWxlY3RvclxuICBsZXQgbmV4dEVsZW0gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoIHNlbGVjdG9yICk7XG4gIGlmICggIW5leHRFbGVtICkgdGhpcy5sYXN0UGFnZVJlYWNoZWQoIGJvZHksIHBhdGggKTtcbn07XG5cbnByb3RvLmxhc3RQYWdlUmVhY2hlZCA9IGZ1bmN0aW9uKCBib2R5LCBwYXRoICkge1xuICB0aGlzLmNhbkxvYWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnbGFzdCcsIG51bGwsIFsgYm9keSwgcGF0aCBdICk7XG59O1xuXG4vLyAtLS0tLSBlcnJvciAtLS0tLSAvL1xuXG5wcm90by5vblBhZ2VFcnJvciA9IGZ1bmN0aW9uKCBlcnJvciwgcGF0aCwgcmVzcG9uc2UgKSB7XG4gIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gIHRoaXMuY2FuTG9hZCA9IGZhbHNlO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdlcnJvcicsIG51bGwsIFsgZXJyb3IsIHBhdGgsIHJlc3BvbnNlIF0gKTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcHJlZmlsbCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5JbmZpbml0ZVNjcm9sbC5jcmVhdGUucHJlZmlsbCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMucHJlZmlsbCApIHJldHVybjtcblxuICBsZXQgYXBwZW5kID0gdGhpcy5vcHRpb25zLmFwcGVuZDtcbiAgaWYgKCAhYXBwZW5kICkge1xuICAgIGNvbnNvbGUuZXJyb3IoYGFwcGVuZCBvcHRpb24gcmVxdWlyZWQgZm9yIHByZWZpbGwuIFNldCBhcyA6JHthcHBlbmR9YCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMudXBkYXRlTWVhc3VyZW1lbnRzKCk7XG4gIHRoaXMudXBkYXRlU2Nyb2xsZXIoKTtcbiAgdGhpcy5pc1ByZWZpbGxpbmcgPSB0cnVlO1xuICB0aGlzLm9uKCAnYXBwZW5kJywgdGhpcy5wcmVmaWxsICk7XG4gIHRoaXMub25jZSggJ2Vycm9yJywgdGhpcy5zdG9wUHJlZmlsbCApO1xuICB0aGlzLm9uY2UoICdsYXN0JywgdGhpcy5zdG9wUHJlZmlsbCApO1xuICB0aGlzLnByZWZpbGwoKTtcbn07XG5cbnByb3RvLnByZWZpbGwgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGRpc3RhbmNlID0gdGhpcy5nZXRQcmVmaWxsRGlzdGFuY2UoKTtcbiAgdGhpcy5pc1ByZWZpbGxpbmcgPSBkaXN0YW5jZSA+PSAwO1xuICBpZiAoIHRoaXMuaXNQcmVmaWxsaW5nICkge1xuICAgIHRoaXMubG9nKCdwcmVmaWxsJyk7XG4gICAgdGhpcy5sb2FkTmV4dFBhZ2UoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0b3BQcmVmaWxsKCk7XG4gIH1cbn07XG5cbnByb3RvLmdldFByZWZpbGxEaXN0YW5jZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBlbGVtZW50IHNjcm9sbFxuICBpZiAoIHRoaXMub3B0aW9ucy5lbGVtZW50U2Nyb2xsICkge1xuICAgIHJldHVybiB0aGlzLnNjcm9sbGVyLmNsaWVudEhlaWdodCAtIHRoaXMuc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0O1xuICB9XG4gIC8vIHdpbmRvd1xuICByZXR1cm4gdGhpcy53aW5kb3dIZWlnaHQgLSB0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0O1xufTtcblxucHJvdG8uc3RvcFByZWZpbGwgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5sb2coJ3N0b3BQcmVmaWxsJyk7XG4gIHRoaXMub2ZmKCAnYXBwZW5kJywgdGhpcy5wcmVmaWxsICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIEluZmluaXRlU2Nyb2xsO1xuXG59ICkgKTtcbiIsIi8vIHNjcm9sbC13YXRjaFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHJlcXVpcmUoJy4vY29yZScpLFxuICAgICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHdpbmRvdy5JbmZpbml0ZVNjcm9sbCxcbiAgICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBJbmZpbml0ZVNjcm9sbCwgdXRpbHMgKSB7XG5cbmxldCBwcm90byA9IEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZTtcblxuLy8gZGVmYXVsdCBvcHRpb25zXG5PYmplY3QuYXNzaWduKCBJbmZpbml0ZVNjcm9sbC5kZWZhdWx0cywge1xuICBzY3JvbGxUaHJlc2hvbGQ6IDQwMCxcbiAgLy8gZWxlbWVudFNjcm9sbDogbnVsbCxcbn0gKTtcblxuSW5maW5pdGVTY3JvbGwuY3JlYXRlLnNjcm9sbFdhdGNoID0gZnVuY3Rpb24oKSB7XG4gIC8vIGV2ZW50c1xuICB0aGlzLnBhZ2VTY3JvbGxIYW5kbGVyID0gdGhpcy5vblBhZ2VTY3JvbGwuYmluZCggdGhpcyApO1xuICB0aGlzLnJlc2l6ZUhhbmRsZXIgPSB0aGlzLm9uUmVzaXplLmJpbmQoIHRoaXMgKTtcblxuICBsZXQgc2Nyb2xsVGhyZXNob2xkID0gdGhpcy5vcHRpb25zLnNjcm9sbFRocmVzaG9sZDtcbiAgbGV0IGlzRW5hYmxlID0gc2Nyb2xsVGhyZXNob2xkIHx8IHNjcm9sbFRocmVzaG9sZCA9PT0gMDtcbiAgaWYgKCBpc0VuYWJsZSApIHRoaXMuZW5hYmxlU2Nyb2xsV2F0Y2goKTtcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlc3Ryb3kuc2Nyb2xsV2F0Y2ggPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaXNhYmxlU2Nyb2xsV2F0Y2goKTtcbn07XG5cbnByb3RvLmVuYWJsZVNjcm9sbFdhdGNoID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc1Njcm9sbFdhdGNoaW5nICkgcmV0dXJuO1xuXG4gIHRoaXMuaXNTY3JvbGxXYXRjaGluZyA9IHRydWU7XG4gIHRoaXMudXBkYXRlTWVhc3VyZW1lbnRzKCk7XG4gIHRoaXMudXBkYXRlU2Nyb2xsZXIoKTtcbiAgLy8gVE9ETyBkaXNhYmxlIGFmdGVyIGVycm9yP1xuICB0aGlzLm9uKCAnbGFzdCcsIHRoaXMuZGlzYWJsZVNjcm9sbFdhdGNoICk7XG4gIHRoaXMuYmluZFNjcm9sbFdhdGNoRXZlbnRzKCB0cnVlICk7XG59O1xuXG5wcm90by5kaXNhYmxlU2Nyb2xsV2F0Y2ggPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc1Njcm9sbFdhdGNoaW5nICkgcmV0dXJuO1xuXG4gIHRoaXMuYmluZFNjcm9sbFdhdGNoRXZlbnRzKCBmYWxzZSApO1xuICBkZWxldGUgdGhpcy5pc1Njcm9sbFdhdGNoaW5nO1xufTtcblxucHJvdG8uYmluZFNjcm9sbFdhdGNoRXZlbnRzID0gZnVuY3Rpb24oIGlzQmluZCApIHtcbiAgbGV0IGFkZFJlbW92ZSA9IGlzQmluZCA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgdGhpcy5zY3JvbGxlclsgYWRkUmVtb3ZlIF0oICdzY3JvbGwnLCB0aGlzLnBhZ2VTY3JvbGxIYW5kbGVyICk7XG4gIHdpbmRvd1sgYWRkUmVtb3ZlIF0oICdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIgKTtcbn07XG5cbnByb3RvLm9uUGFnZVNjcm9sbCA9IEluZmluaXRlU2Nyb2xsLnRocm90dGxlKCBmdW5jdGlvbigpIHtcbiAgbGV0IGRpc3RhbmNlID0gdGhpcy5nZXRCb3R0b21EaXN0YW5jZSgpO1xuICBpZiAoIGRpc3RhbmNlIDw9IHRoaXMub3B0aW9ucy5zY3JvbGxUaHJlc2hvbGQgKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdzY3JvbGxUaHJlc2hvbGQnKTtcbiAgfVxufSApO1xuXG5wcm90by5nZXRCb3R0b21EaXN0YW5jZSA9IGZ1bmN0aW9uKCkge1xuICBsZXQgYm90dG9tLCBzY3JvbGxZO1xuICBpZiAoIHRoaXMub3B0aW9ucy5lbGVtZW50U2Nyb2xsICkge1xuICAgIGJvdHRvbSA9IHRoaXMuc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0O1xuICAgIHNjcm9sbFkgPSB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvcCArIHRoaXMuc2Nyb2xsZXIuY2xpZW50SGVpZ2h0O1xuICB9IGVsc2Uge1xuICAgIGJvdHRvbSA9IHRoaXMudG9wICsgdGhpcy5lbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICBzY3JvbGxZID0gd2luZG93LnNjcm9sbFkgKyB0aGlzLndpbmRvd0hlaWdodDtcbiAgfVxuICByZXR1cm4gYm90dG9tIC0gc2Nyb2xsWTtcbn07XG5cbnByb3RvLm9uUmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudXBkYXRlTWVhc3VyZW1lbnRzKCk7XG59O1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCggSW5maW5pdGVTY3JvbGwsICdvblJlc2l6ZScsIDE1MCApO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIEluZmluaXRlU2Nyb2xsO1xuXG59ICkgKTtcbiIsIi8vIHN0YXR1c1xuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHJlcXVpcmUoJy4vY29yZScpLFxuICAgICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHdpbmRvdy5JbmZpbml0ZVNjcm9sbCxcbiAgICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBJbmZpbml0ZVNjcm9sbCwgdXRpbHMgKSB7XG5cbmxldCBwcm90byA9IEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZTtcblxuLy8gSW5maW5pdGVTY3JvbGwuZGVmYXVsdHMuc3RhdHVzID0gbnVsbDtcblxuSW5maW5pdGVTY3JvbGwuY3JlYXRlLnN0YXR1cyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgc3RhdHVzRWxlbSA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggdGhpcy5vcHRpb25zLnN0YXR1cyApO1xuICBpZiAoICFzdGF0dXNFbGVtICkgcmV0dXJuO1xuXG4gIC8vIGVsZW1lbnRzXG4gIHRoaXMuc3RhdHVzRWxlbWVudCA9IHN0YXR1c0VsZW07XG4gIHRoaXMuc3RhdHVzRXZlbnRFbGVtZW50cyA9IHtcbiAgICByZXF1ZXN0OiBzdGF0dXNFbGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbmZpbml0ZS1zY3JvbGwtcmVxdWVzdCcpLFxuICAgIGVycm9yOiBzdGF0dXNFbGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbmZpbml0ZS1zY3JvbGwtZXJyb3InKSxcbiAgICBsYXN0OiBzdGF0dXNFbGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbmZpbml0ZS1zY3JvbGwtbGFzdCcpLFxuICB9O1xuICAvLyBldmVudHNcbiAgdGhpcy5vbiggJ3JlcXVlc3QnLCB0aGlzLnNob3dSZXF1ZXN0U3RhdHVzICk7XG4gIHRoaXMub24oICdlcnJvcicsIHRoaXMuc2hvd0Vycm9yU3RhdHVzICk7XG4gIHRoaXMub24oICdsYXN0JywgdGhpcy5zaG93TGFzdFN0YXR1cyApO1xuICB0aGlzLmJpbmRIaWRlU3RhdHVzKCdvbicpO1xufTtcblxucHJvdG8uYmluZEhpZGVTdGF0dXMgPSBmdW5jdGlvbiggYmluZE1ldGhvZCApIHtcbiAgbGV0IGhpZGVFdmVudCA9IHRoaXMub3B0aW9ucy5hcHBlbmQgPyAnYXBwZW5kJyA6ICdsb2FkJztcbiAgdGhpc1sgYmluZE1ldGhvZCBdKCBoaWRlRXZlbnQsIHRoaXMuaGlkZUFsbFN0YXR1cyApO1xufTtcblxucHJvdG8uc2hvd1JlcXVlc3RTdGF0dXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaG93U3RhdHVzKCdyZXF1ZXN0Jyk7XG59O1xuXG5wcm90by5zaG93RXJyb3JTdGF0dXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaG93U3RhdHVzKCdlcnJvcicpO1xufTtcblxucHJvdG8uc2hvd0xhc3RTdGF0dXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaG93U3RhdHVzKCdsYXN0Jyk7XG4gIC8vIHByZXZlbnQgbGFzdCB0aGVuIGFwcGVuZCBldmVudCByYWNlIGNvbmRpdGlvbiBmcm9tIHNob3dpbmcgbGFzdCBzdGF0dXMgIzcwNlxuICB0aGlzLmJpbmRIaWRlU3RhdHVzKCdvZmYnKTtcbn07XG5cbnByb3RvLnNob3dTdGF0dXMgPSBmdW5jdGlvbiggZXZlbnROYW1lICkge1xuICBzaG93KCB0aGlzLnN0YXR1c0VsZW1lbnQgKTtcbiAgdGhpcy5oaWRlU3RhdHVzRXZlbnRFbGVtZW50cygpO1xuICBsZXQgZXZlbnRFbGVtID0gdGhpcy5zdGF0dXNFdmVudEVsZW1lbnRzWyBldmVudE5hbWUgXTtcbiAgc2hvdyggZXZlbnRFbGVtICk7XG59O1xuXG5wcm90by5oaWRlQWxsU3RhdHVzID0gZnVuY3Rpb24oKSB7XG4gIGhpZGUoIHRoaXMuc3RhdHVzRWxlbWVudCApO1xuICB0aGlzLmhpZGVTdGF0dXNFdmVudEVsZW1lbnRzKCk7XG59O1xuXG5wcm90by5oaWRlU3RhdHVzRXZlbnRFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKCBsZXQgdHlwZSBpbiB0aGlzLnN0YXR1c0V2ZW50RWxlbWVudHMgKSB7XG4gICAgbGV0IGV2ZW50RWxlbSA9IHRoaXMuc3RhdHVzRXZlbnRFbGVtZW50c1sgdHlwZSBdO1xuICAgIGhpZGUoIGV2ZW50RWxlbSApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gaGlkZSggZWxlbSApIHtcbiAgc2V0RGlzcGxheSggZWxlbSwgJ25vbmUnICk7XG59XG5cbmZ1bmN0aW9uIHNob3coIGVsZW0gKSB7XG4gIHNldERpc3BsYXkoIGVsZW0sICdibG9jaycgKTtcbn1cblxuZnVuY3Rpb24gc2V0RGlzcGxheSggZWxlbSwgdmFsdWUgKSB7XG4gIGlmICggZWxlbSApIHtcbiAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIEluZmluaXRlU2Nyb2xsO1xuXG59ICkgKTtcbiIsImltcG9ydCBJbmZpbml0ZVNjcm9sbCBmcm9tICdpbmZpbml0ZS1zY3JvbGwnXHJcblxyXG4oZnVuY3Rpb24gKGRvY3VtZW50KSB7XHJcbiAgLy8gTmV4dCBsaW5rIEVsZW1lbnRcclxuICBjb25zdCBuZXh0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPW5leHRdJylcclxuICBpZiAoIW5leHRFbGVtZW50KSByZXR1cm5cclxuXHJcbiAgLy8gUG9zdCBGZWVkIGVsZW1lbnRcclxuICBjb25zdCAkZmVlZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtZmVlZC1lbnRyeScpXHJcbiAgaWYgKCEkZmVlZEVsZW1lbnQpIHJldHVyblxyXG5cclxuICBjb25zdCAkdmlld01vcmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZC1tb3JlLWJ0bicpXHJcbiAgLy8gY29uc3QgJGljb25Mb2FkZXIgPSAkdmlld01vcmVCdXR0b24ucXVlcnlTZWxlY3RvcignLmljb24nKVxyXG4gIC8vIGNvbnN0ICRsYWJlbCA9ICR2aWV3TW9yZUJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcubGFiZWwnKVxyXG5cclxuICBjb25zdCBpbmZTY3JvbGwgPSBuZXcgSW5maW5pdGVTY3JvbGwoJGZlZWRFbGVtZW50LCB7XHJcbiAgICBhcHBlbmQ6ICcuanMtc3RvcnknLFxyXG4gICAgYnV0dG9uOiAkdmlld01vcmVCdXR0b24sXHJcbiAgICBoaXN0b3J5OiBmYWxzZSxcclxuICAgIGRlYnVnOiBmYWxzZSxcclxuICAgIGhpZGVOYXY6ICcucGFnaW5hdGlvbicsXHJcbiAgICBwYXRoOiAnLnBhZ2luYXRpb24gLm9sZGVyLXBvc3RzJ1xyXG4gIH0pXHJcblxyXG4gIGluZlNjcm9sbC5vbignbG9hZCcsIG9uUGFnZUxvYWQpXHJcblxyXG4gIGZ1bmN0aW9uIG9uUGFnZUxvYWQgKCkge1xyXG4gICAgaWYgKGluZlNjcm9sbC5sb2FkQ291bnQgPT09IDEpIHtcclxuICAgICAgLy8gYWZ0ZXIgM25kIHBhZ2UgbG9hZGVkXHJcbiAgICAgIC8vIGRpc2FibGUgbG9hZGluZyBvbiBzY3JvbGxcclxuICAgICAgaW5mU2Nyb2xsLm9wdGlvbnMubG9hZE9uU2Nyb2xsID0gZmFsc2VcclxuICAgICAgLy8gc2hvdyBidXR0b25cclxuICAgICAgJHZpZXdNb3JlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKVxyXG4gICAgICAkdmlld01vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgIGluZlNjcm9sbC5vZmYob25QYWdlTG9hZClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGluZlNjcm9sbC5vbigncmVxdWVzdCcsIGZ1bmN0aW9uICgpIHtcclxuICAvLyAgICRsYWJlbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxyXG4gIC8vICAgJGljb25Mb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAvLyB9KVxyXG5cclxuICAvLyBpbmZTY3JvbGwub24oJ2FwcGVuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAvLyAgICRsYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gIC8vICAgJGljb25Mb2FkZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcclxuICAvLyB9KVxyXG5cclxuICAkdmlld01vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBsb2FkIG5leHQgcGFnZVxyXG4gICAgaW5mU2Nyb2xsLmxvYWROZXh0UGFnZSgpXHJcbiAgICAvLyBlbmFibGUgbG9hZGluZyBvbiBzY3JvbGxcclxuICAgIGluZlNjcm9sbC5vcHRpb25zLmxvYWRPblNjcm9sbCA9IHRydWVcclxuICAgIC8vIGhpZGUgcGFnZVxyXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxyXG4gIH0pXHJcbn0pKGRvY3VtZW50KVxyXG4iXX0=

//# sourceMappingURL=map/pagination.js.map
