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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvZXYtZW1pdHRlci9ldi1lbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2luZmluaXRlLXNjcm9sbC9qcy9idXR0b24uanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2NvcmUuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2luZmluaXRlLXNjcm9sbC9qcy9wYWdlLWxvYWQuanMiLCJub2RlX21vZHVsZXMvaW5maW5pdGUtc2Nyb2xsL2pzL3Njcm9sbC13YXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9pbmZpbml0ZS1zY3JvbGwvanMvc3RhdHVzLmpzIiwic3JjL2pzL3BhZ2luYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3RHQSxJQUFBLGVBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUE7QUFFQSxDQUFDLFVBQVUsUUFBUSxFQUFFO0VBQ25CO0VBQ0EsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztFQUM1RCxJQUFJLENBQUMsV0FBVyxFQUFFOztFQUVsQjtFQUNBLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7RUFDN0QsSUFBSSxDQUFDLFlBQVksRUFBRTtFQUVuQixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQ2hFO0VBQ0E7O0VBRUEsTUFBTSxTQUFTLEdBQUcsSUFBSSx1QkFBYyxDQUFDLFlBQVksRUFBRTtJQUNqRCxNQUFNLEVBQUUsV0FBVztJQUNuQixNQUFNLEVBQUUsZUFBZTtJQUN2QixPQUFPLEVBQUUsS0FBSztJQUNkLEtBQUssRUFBRSxLQUFLO0lBQ1osT0FBTyxFQUFFLGFBQWE7SUFDdEIsSUFBSSxFQUFFO0VBQ1IsQ0FBQyxDQUFDO0VBRUYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO0VBRWhDLFNBQVMsVUFBVSxDQUFBLEVBQUk7SUFDckIsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRTtNQUM3QjtNQUNBO01BQ0EsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSztNQUN0QztNQUNBLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUNyQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDMUM7TUFDQSxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUMzQjtFQUNGOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWTtJQUNwRDtJQUNBLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QjtJQUNBLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUk7SUFDckM7SUFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDOUIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxFQUFFLFFBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiLyoqXG4gKiBFdkVtaXR0ZXIgdjIuMS4xXG4gKiBMaWwnIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBMaWNlbnNlXG4gKi9cblxuKCBmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTIC0gQnJvd3NlcmlmeSwgV2VicGFja1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGdsb2JhbC5FdkVtaXR0ZXIgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCkge1xuXG5mdW5jdGlvbiBFdkVtaXR0ZXIoKSB7fVxuXG5sZXQgcHJvdG8gPSBFdkVtaXR0ZXIucHJvdG90eXBlO1xuXG5wcm90by5vbiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBpZiAoICFldmVudE5hbWUgfHwgIWxpc3RlbmVyICkgcmV0dXJuIHRoaXM7XG5cbiAgLy8gc2V0IGV2ZW50cyBoYXNoXG4gIGxldCBldmVudHMgPSB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIC8vIHNldCBsaXN0ZW5lcnMgYXJyYXlcbiAgbGV0IGxpc3RlbmVycyA9IGV2ZW50c1sgZXZlbnROYW1lIF0gPSBldmVudHNbIGV2ZW50TmFtZSBdIHx8IFtdO1xuICAvLyBvbmx5IGFkZCBvbmNlXG4gIGlmICggIWxpc3RlbmVycy5pbmNsdWRlcyggbGlzdGVuZXIgKSApIHtcbiAgICBsaXN0ZW5lcnMucHVzaCggbGlzdGVuZXIgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub25jZSA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBpZiAoICFldmVudE5hbWUgfHwgIWxpc3RlbmVyICkgcmV0dXJuIHRoaXM7XG5cbiAgLy8gYWRkIGV2ZW50XG4gIHRoaXMub24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgLy8gc2V0IG9uY2UgZmxhZ1xuICAvLyBzZXQgb25jZUV2ZW50cyBoYXNoXG4gIGxldCBvbmNlRXZlbnRzID0gdGhpcy5fb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgfHwge307XG4gIC8vIHNldCBvbmNlTGlzdGVuZXJzIG9iamVjdFxuICBsZXQgb25jZUxpc3RlbmVycyA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdID0gb25jZUV2ZW50c1sgZXZlbnROYW1lIF0gfHwge307XG4gIC8vIHNldCBmbGFnXG4gIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF0gPSB0cnVlO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub2ZmID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXTtcbiAgaWYgKCAhbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoICkgcmV0dXJuIHRoaXM7XG5cbiAgbGV0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgYXJncyApIHtcbiAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSByZXR1cm4gdGhpcztcblxuICAvLyBjb3B5IG92ZXIgdG8gYXZvaWQgaW50ZXJmZXJlbmNlIGlmIC5vZmYoKSBpbiBsaXN0ZW5lclxuICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoIDAgKTtcbiAgYXJncyA9IGFyZ3MgfHwgW107XG4gIC8vIG9uY2Ugc3R1ZmZcbiAgbGV0IG9uY2VMaXN0ZW5lcnMgPSB0aGlzLl9vbmNlRXZlbnRzICYmIHRoaXMuX29uY2VFdmVudHNbIGV2ZW50TmFtZSBdO1xuXG4gIGZvciAoIGxldCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMgKSB7XG4gICAgbGV0IGlzT25jZSA9IG9uY2VMaXN0ZW5lcnMgJiYgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICBpZiAoIGlzT25jZSApIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgLy8gcmVtb3ZlIGJlZm9yZSB0cmlnZ2VyIHRvIHByZXZlbnQgcmVjdXJzaW9uXG4gICAgICB0aGlzLm9mZiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAgICAgLy8gdW5zZXQgb25jZSBmbGFnXG4gICAgICBkZWxldGUgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICB9XG4gICAgLy8gdHJpZ2dlciBsaXN0ZW5lclxuICAgIGxpc3RlbmVyLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmFsbE9mZiA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICBkZWxldGUgdGhpcy5fb25jZUV2ZW50cztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5yZXR1cm4gRXZFbWl0dGVyO1xuXG59ICkgKTtcbiIsIi8qKlxuICogRml6enkgVUkgdXRpbHMgdjMuMC4wXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSggZ2xvYmFsICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBnbG9iYWwuZml6enlVSVV0aWxzID0gZmFjdG9yeSggZ2xvYmFsICk7XG4gIH1cblxufSggdGhpcywgZnVuY3Rpb24gZmFjdG9yeSggZ2xvYmFsICkge1xuXG5sZXQgdXRpbHMgPSB7fTtcblxuLy8gLS0tLS0gZXh0ZW5kIC0tLS0tIC8vXG5cbi8vIGV4dGVuZHMgb2JqZWN0c1xudXRpbHMuZXh0ZW5kID0gZnVuY3Rpb24oIGEsIGIgKSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKCBhLCBiICk7XG59O1xuXG4vLyAtLS0tLSBtb2R1bG8gLS0tLS0gLy9cblxudXRpbHMubW9kdWxvID0gZnVuY3Rpb24oIG51bSwgZGl2ICkge1xuICByZXR1cm4gKCAoIG51bSAlIGRpdiApICsgZGl2ICkgJSBkaXY7XG59O1xuXG4vLyAtLS0tLSBtYWtlQXJyYXkgLS0tLS0gLy9cblxuLy8gdHVybiBlbGVtZW50IG9yIG5vZGVMaXN0IGludG8gYW4gYXJyYXlcbnV0aWxzLm1ha2VBcnJheSA9IGZ1bmN0aW9uKCBvYmogKSB7XG4gIC8vIHVzZSBvYmplY3QgaWYgYWxyZWFkeSBhbiBhcnJheVxuICBpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkgcmV0dXJuIG9iajtcblxuICAvLyByZXR1cm4gZW1wdHkgYXJyYXkgaWYgdW5kZWZpbmVkIG9yIG51bGwuICM2XG4gIGlmICggb2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkICkgcmV0dXJuIFtdO1xuXG4gIGxldCBpc0FycmF5TGlrZSA9IHR5cGVvZiBvYmogPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcic7XG4gIC8vIGNvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXlcbiAgaWYgKCBpc0FycmF5TGlrZSApIHJldHVybiBbIC4uLm9iaiBdO1xuXG4gIC8vIGFycmF5IG9mIHNpbmdsZSBpbmRleFxuICByZXR1cm4gWyBvYmogXTtcbn07XG5cbi8vIC0tLS0tIHJlbW92ZUZyb20gLS0tLS0gLy9cblxudXRpbHMucmVtb3ZlRnJvbSA9IGZ1bmN0aW9uKCBhcnksIG9iaiApIHtcbiAgbGV0IGluZGV4ID0gYXJ5LmluZGV4T2YoIG9iaiApO1xuICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgIGFyeS5zcGxpY2UoIGluZGV4LCAxICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFBhcmVudCAtLS0tLSAvL1xuXG51dGlscy5nZXRQYXJlbnQgPSBmdW5jdGlvbiggZWxlbSwgc2VsZWN0b3IgKSB7XG4gIHdoaWxlICggZWxlbS5wYXJlbnROb2RlICYmIGVsZW0gIT0gZG9jdW1lbnQuYm9keSApIHtcbiAgICBlbGVtID0gZWxlbS5wYXJlbnROb2RlO1xuICAgIGlmICggZWxlbS5tYXRjaGVzKCBzZWxlY3RvciApICkgcmV0dXJuIGVsZW07XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFF1ZXJ5RWxlbWVudCAtLS0tLSAvL1xuXG4vLyB1c2UgZWxlbWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbnV0aWxzLmdldFF1ZXJ5RWxlbWVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cbiAgcmV0dXJuIGVsZW07XG59O1xuXG4vLyAtLS0tLSBoYW5kbGVFdmVudCAtLS0tLSAvL1xuXG4vLyBlbmFibGUgLm9udHlwZSB0byB0cmlnZ2VyIGZyb20gLmFkZEV2ZW50TGlzdGVuZXIoIGVsZW0sICd0eXBlJyApXG51dGlscy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgbGV0IG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBmaWx0ZXJGaW5kRWxlbWVudHMgLS0tLS0gLy9cblxudXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zLCBzZWxlY3RvciApIHtcbiAgLy8gbWFrZSBhcnJheSBvZiBlbGVtc1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcblxuICByZXR1cm4gZWxlbXNcbiAgICAvLyBjaGVjayB0aGF0IGVsZW0gaXMgYW4gYWN0dWFsIGVsZW1lbnRcbiAgICAuZmlsdGVyKCAoIGVsZW0gKSA9PiBlbGVtIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKVxuICAgIC5yZWR1Y2UoICggZmZFbGVtcywgZWxlbSApID0+IHtcbiAgICAgIC8vIGFkZCBlbGVtIGlmIG5vIHNlbGVjdG9yXG4gICAgICBpZiAoICFzZWxlY3RvciApIHtcbiAgICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgICAgIHJldHVybiBmZkVsZW1zO1xuICAgICAgfVxuICAgICAgLy8gZmlsdGVyICYgZmluZCBpdGVtcyBpZiB3ZSBoYXZlIGEgc2VsZWN0b3JcbiAgICAgIC8vIGZpbHRlclxuICAgICAgaWYgKCBlbGVtLm1hdGNoZXMoIHNlbGVjdG9yICkgKSB7XG4gICAgICAgIGZmRWxlbXMucHVzaCggZWxlbSApO1xuICAgICAgfVxuICAgICAgLy8gZmluZCBjaGlsZHJlblxuICAgICAgbGV0IGNoaWxkRWxlbXMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9yICk7XG4gICAgICAvLyBjb25jYXQgY2hpbGRFbGVtcyB0byBmaWx0ZXJGb3VuZCBhcnJheVxuICAgICAgZmZFbGVtcyA9IGZmRWxlbXMuY29uY2F0KCAuLi5jaGlsZEVsZW1zICk7XG4gICAgICByZXR1cm4gZmZFbGVtcztcbiAgICB9LCBbXSApO1xufTtcblxuLy8gLS0tLS0gZGVib3VuY2VNZXRob2QgLS0tLS0gLy9cblxudXRpbHMuZGVib3VuY2VNZXRob2QgPSBmdW5jdGlvbiggX2NsYXNzLCBtZXRob2ROYW1lLCB0aHJlc2hvbGQgKSB7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCAxMDA7XG4gIC8vIG9yaWdpbmFsIG1ldGhvZFxuICBsZXQgbWV0aG9kID0gX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdO1xuICBsZXQgdGltZW91dE5hbWUgPSBtZXRob2ROYW1lICsgJ1RpbWVvdXQnO1xuXG4gIF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXSA9IGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dCggdGhpc1sgdGltZW91dE5hbWUgXSApO1xuXG4gICAgbGV0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdGhpc1sgdGltZW91dE5hbWUgXSA9IHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgIG1ldGhvZC5hcHBseSggdGhpcywgYXJncyApO1xuICAgICAgZGVsZXRlIHRoaXNbIHRpbWVvdXROYW1lIF07XG4gICAgfSwgdGhyZXNob2xkICk7XG4gIH07XG59O1xuXG4vLyAtLS0tLSBkb2NSZWFkeSAtLS0tLSAvL1xuXG51dGlscy5kb2NSZWFkeSA9IGZ1bmN0aW9uKCBvbkRvY1JlYWR5ICkge1xuICBsZXQgcmVhZHlTdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIGlmICggcmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnIHx8IHJlYWR5U3RhdGUgPT0gJ2ludGVyYWN0aXZlJyApIHtcbiAgICAvLyBkbyBhc3luYyB0byBhbGxvdyBmb3Igb3RoZXIgc2NyaXB0cyB0byBydW4uIG1ldGFmaXp6eS9mbGlja2l0eSM0NDFcbiAgICBzZXRUaW1lb3V0KCBvbkRvY1JlYWR5ICk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTUNvbnRlbnRMb2FkZWQnLCBvbkRvY1JlYWR5ICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGh0bWxJbml0IC0tLS0tIC8vXG5cbi8vIGh0dHA6Ly9iaXQubHkvM29ZTHVzY1xudXRpbHMudG9EYXNoZWQgPSBmdW5jdGlvbiggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oLikoW0EtWl0pL2csIGZ1bmN0aW9uKCBtYXRjaCwgJDEsICQyICkge1xuICAgIHJldHVybiAkMSArICctJyArICQyO1xuICB9ICkudG9Mb3dlckNhc2UoKTtcbn07XG5cbmxldCBjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGU7XG5cbi8vIGFsbG93IHVzZXIgdG8gaW5pdGlhbGl6ZSBjbGFzc2VzIHZpYSBbZGF0YS1uYW1lc3BhY2VdIG9yIC5qcy1uYW1lc3BhY2UgY2xhc3Ncbi8vIGh0bWxJbml0KCBXaWRnZXQsICd3aWRnZXROYW1lJyApXG4vLyBvcHRpb25zIGFyZSBwYXJzZWQgZnJvbSBkYXRhLW5hbWVzcGFjZS1vcHRpb25zXG51dGlscy5odG1sSW5pdCA9IGZ1bmN0aW9uKCBXaWRnZXRDbGFzcywgbmFtZXNwYWNlICkge1xuICB1dGlscy5kb2NSZWFkeSggZnVuY3Rpb24oKSB7XG4gICAgbGV0IGRhc2hlZE5hbWVzcGFjZSA9IHV0aWxzLnRvRGFzaGVkKCBuYW1lc3BhY2UgKTtcbiAgICBsZXQgZGF0YUF0dHIgPSAnZGF0YS0nICsgZGFzaGVkTmFtZXNwYWNlO1xuICAgIGxldCBkYXRhQXR0ckVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggYFske2RhdGFBdHRyfV1gICk7XG4gICAgbGV0IGpRdWVyeSA9IGdsb2JhbC5qUXVlcnk7XG5cbiAgICBbIC4uLmRhdGFBdHRyRWxlbXMgXS5mb3JFYWNoKCAoIGVsZW0gKSA9PiB7XG4gICAgICBsZXQgYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhQXR0ciApO1xuICAgICAgbGV0IG9wdGlvbnM7XG4gICAgICB0cnkge1xuICAgICAgICBvcHRpb25zID0gYXR0ciAmJiBKU09OLnBhcnNlKCBhdHRyICk7XG4gICAgICB9IGNhdGNoICggZXJyb3IgKSB7XG4gICAgICAgIC8vIGxvZyBlcnJvciwgZG8gbm90IGluaXRpYWxpemVcbiAgICAgICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoIGBFcnJvciBwYXJzaW5nICR7ZGF0YUF0dHJ9IG9uICR7ZWxlbS5jbGFzc05hbWV9OiAke2Vycm9yfWAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBpbml0aWFsaXplXG4gICAgICBsZXQgaW5zdGFuY2UgPSBuZXcgV2lkZ2V0Q2xhc3MoIGVsZW0sIG9wdGlvbnMgKTtcbiAgICAgIC8vIG1ha2UgYXZhaWxhYmxlIHZpYSAkKCkuZGF0YSgnbmFtZXNwYWNlJylcbiAgICAgIGlmICggalF1ZXJ5ICkge1xuICAgICAgICBqUXVlcnkuZGF0YSggZWxlbSwgbmFtZXNwYWNlLCBpbnN0YW5jZSApO1xuICAgICAgfVxuICAgIH0gKTtcblxuICB9ICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIHV0aWxzO1xuXG59ICkgKTtcbiIsIi8vIGJ1dHRvblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHJlcXVpcmUoJy4vY29yZScpLFxuICAgICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHdpbmRvdy5JbmZpbml0ZVNjcm9sbCxcbiAgICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBJbmZpbml0ZVNjcm9sbCwgdXRpbHMgKSB7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEluZmluaXRlU2Nyb2xsQnV0dG9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmNsYXNzIEluZmluaXRlU2Nyb2xsQnV0dG9uIHtcbiAgY29uc3RydWN0b3IoIGVsZW1lbnQsIGluZlNjcm9sbCApIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaW5mU2Nyb2xsID0gaW5mU2Nyb2xsO1xuICAgIC8vIGV2ZW50c1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5vbkNsaWNrLmJpbmQoIHRoaXMgKTtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIgKTtcbiAgICBpbmZTY3JvbGwub24oICdyZXF1ZXN0JywgdGhpcy5kaXNhYmxlLmJpbmQoIHRoaXMgKSApO1xuICAgIGluZlNjcm9sbC5vbiggJ2xvYWQnLCB0aGlzLmVuYWJsZS5iaW5kKCB0aGlzICkgKTtcbiAgICBpbmZTY3JvbGwub24oICdlcnJvcicsIHRoaXMuaGlkZS5iaW5kKCB0aGlzICkgKTtcbiAgICBpbmZTY3JvbGwub24oICdsYXN0JywgdGhpcy5oaWRlLmJpbmQoIHRoaXMgKSApO1xuICB9XG5cbiAgb25DbGljayggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmluZlNjcm9sbC5sb2FkTmV4dFBhZ2UoKTtcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuZGlzYWJsZWQgPSAnZGlzYWJsZWQnO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyICk7XG4gIH1cblxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJbmZpbml0ZVNjcm9sbCBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIEluZmluaXRlU2Nyb2xsLmRlZmF1bHRzLmJ1dHRvbiA9IG51bGw7XG5cbkluZmluaXRlU2Nyb2xsLmNyZWF0ZS5idXR0b24gPSBmdW5jdGlvbigpIHtcbiAgbGV0IGJ1dHRvbkVsZW0gPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIHRoaXMub3B0aW9ucy5idXR0b24gKTtcbiAgaWYgKCBidXR0b25FbGVtICkge1xuICAgIHRoaXMuYnV0dG9uID0gbmV3IEluZmluaXRlU2Nyb2xsQnV0dG9uKCBidXR0b25FbGVtLCB0aGlzICk7XG4gIH1cbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlc3Ryb3kuYnV0dG9uID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5idXR0b24gKSB0aGlzLmJ1dHRvbi5kZXN0cm95KCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuSW5maW5pdGVTY3JvbGwuQnV0dG9uID0gSW5maW5pdGVTY3JvbGxCdXR0b247XG5cbnJldHVybiBJbmZpbml0ZVNjcm9sbDtcblxufSApICk7XG4iLCIvLyBjb3JlXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpLFxuICAgICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuSW5maW5pdGVTY3JvbGwgPSBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHdpbmRvdy5FdkVtaXR0ZXIsXG4gICAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyLCB1dGlscyApIHtcblxubGV0IGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG4vLyBpbnRlcm5hbCBzdG9yZSBvZiBhbGwgSW5maW5pdGVTY3JvbGwgaW50YW5jZXNcbmxldCBpbnN0YW5jZXMgPSB7fTtcblxuZnVuY3Rpb24gSW5maW5pdGVTY3JvbGwoIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG4gIGxldCBxdWVyeUVsZW0gPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIGVsZW1lbnQgKTtcblxuICBpZiAoICFxdWVyeUVsZW0gKSB7XG4gICAgY29uc29sZS5lcnJvciggJ0JhZCBlbGVtZW50IGZvciBJbmZpbml0ZVNjcm9sbDogJyArICggcXVlcnlFbGVtIHx8IGVsZW1lbnQgKSApO1xuICAgIHJldHVybjtcbiAgfVxuICBlbGVtZW50ID0gcXVlcnlFbGVtO1xuICAvLyBkbyBub3QgaW5pdGlhbGl6ZSB0d2ljZSBvbiBzYW1lIGVsZW1lbnRcbiAgaWYgKCBlbGVtZW50LmluZmluaXRlU2Nyb2xsR1VJRCApIHtcbiAgICBsZXQgaW5zdGFuY2UgPSBpbnN0YW5jZXNbIGVsZW1lbnQuaW5maW5pdGVTY3JvbGxHVUlEIF07XG4gICAgaW5zdGFuY2Uub3B0aW9uKCBvcHRpb25zICk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgLy8gb3B0aW9uc1xuICB0aGlzLm9wdGlvbnMgPSB7IC4uLkluZmluaXRlU2Nyb2xsLmRlZmF1bHRzIH07XG4gIHRoaXMub3B0aW9uKCBvcHRpb25zICk7XG4gIC8vIGFkZCBqUXVlcnlcbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gIH1cblxuICB0aGlzLmNyZWF0ZSgpO1xufVxuXG4vLyBkZWZhdWx0c1xuSW5maW5pdGVTY3JvbGwuZGVmYXVsdHMgPSB7XG4gIC8vIHBhdGg6IG51bGwsXG4gIC8vIGhpZGVOYXY6IG51bGwsXG4gIC8vIGRlYnVnOiBmYWxzZSxcbn07XG5cbi8vIGNyZWF0ZSAmIGRlc3Ryb3kgbWV0aG9kc1xuSW5maW5pdGVTY3JvbGwuY3JlYXRlID0ge307XG5JbmZpbml0ZVNjcm9sbC5kZXN0cm95ID0ge307XG5cbmxldCBwcm90byA9IEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZTtcbi8vIGluaGVyaXQgRXZFbWl0dGVyXG5PYmplY3QuYXNzaWduKCBwcm90bywgRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZ2xvYmFsbHkgdW5pcXVlIGlkZW50aWZpZXJzXG5sZXQgR1VJRCA9IDA7XG5cbnByb3RvLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjcmVhdGUgY29yZVxuICAvLyBhZGQgaWQgZm9yIEluZmluaXRlU2Nyb2xsLmRhdGFcbiAgbGV0IGlkID0gdGhpcy5ndWlkID0gKytHVUlEO1xuICB0aGlzLmVsZW1lbnQuaW5maW5pdGVTY3JvbGxHVUlEID0gaWQ7IC8vIGV4cGFuZG9cbiAgaW5zdGFuY2VzWyBpZCBdID0gdGhpczsgLy8gYXNzb2NpYXRlIHZpYSBpZFxuICAvLyBwcm9wZXJ0aWVzXG4gIHRoaXMucGFnZUluZGV4ID0gMTsgLy8gZGVmYXVsdCB0byBmaXJzdCBwYWdlXG4gIHRoaXMubG9hZENvdW50ID0gMDtcbiAgdGhpcy51cGRhdGVHZXRQYXRoKCk7XG4gIC8vIGJhaWwgaWYgZ2V0UGF0aCBub3Qgc2V0LCBvciByZXR1cm5zIGZhbHNleSAjNzc2XG4gIGxldCBoYXNQYXRoID0gdGhpcy5nZXRQYXRoICYmIHRoaXMuZ2V0UGF0aCgpO1xuICBpZiAoICFoYXNQYXRoICkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Rpc2FibGluZyBJbmZpbml0ZVNjcm9sbCcpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnVwZGF0ZUdldEFic29sdXRlUGF0aCgpO1xuICB0aGlzLmxvZyggJ2luaXRpYWxpemVkJywgWyB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lIF0gKTtcbiAgdGhpcy5jYWxsT25Jbml0KCk7XG4gIC8vIGNyZWF0ZSBmZWF0dXJlc1xuICBmb3IgKCBsZXQgbWV0aG9kIGluIEluZmluaXRlU2Nyb2xsLmNyZWF0ZSApIHtcbiAgICBJbmZpbml0ZVNjcm9sbC5jcmVhdGVbIG1ldGhvZCBdLmNhbGwoIHRoaXMgKTtcbiAgfVxufTtcblxucHJvdG8ub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gIE9iamVjdC5hc3NpZ24oIHRoaXMub3B0aW9ucywgb3B0cyApO1xufTtcblxuLy8gY2FsbCBvbkluaXQgb3B0aW9uLCB1c2VkIGZvciBiaW5kaW5nIGV2ZW50cyBvbiBpbml0XG5wcm90by5jYWxsT25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gIGxldCBvbkluaXQgPSB0aGlzLm9wdGlvbnMub25Jbml0O1xuICBpZiAoIG9uSW5pdCApIHtcbiAgICBvbkluaXQuY2FsbCggdGhpcywgdGhpcyApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBldmVudHMgLS0tLS0gLy9cblxucHJvdG8uZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKCB0eXBlLCBldmVudCwgYXJncyApIHtcbiAgdGhpcy5sb2coIHR5cGUsIGFyZ3MgKTtcbiAgbGV0IGVtaXRBcmdzID0gZXZlbnQgPyBbIGV2ZW50IF0uY29uY2F0KCBhcmdzICkgOiBhcmdzO1xuICB0aGlzLmVtaXRFdmVudCggdHlwZSwgZW1pdEFyZ3MgKTtcbiAgLy8gdHJpZ2dlciBqUXVlcnkgZXZlbnRcbiAgaWYgKCAhalF1ZXJ5IHx8ICF0aGlzLiRlbGVtZW50ICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBuYW1lc3BhY2UgalF1ZXJ5IGV2ZW50XG4gIHR5cGUgKz0gJy5pbmZpbml0ZVNjcm9sbCc7XG4gIGxldCAkZXZlbnQgPSB0eXBlO1xuICBpZiAoIGV2ZW50ICkge1xuICAgIC8vIGNyZWF0ZSBqUXVlcnkgZXZlbnRcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbmV3LWNhcCAqL1xuICAgIGxldCBqUUV2ZW50ID0galF1ZXJ5LkV2ZW50KCBldmVudCApO1xuICAgIGpRRXZlbnQudHlwZSA9IHR5cGU7XG4gICAgJGV2ZW50ID0galFFdmVudDtcbiAgfVxuICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoICRldmVudCwgYXJncyApO1xufTtcblxubGV0IGxvZ2dlcnMgPSB7XG4gIGluaXRpYWxpemVkOiAoIGNsYXNzTmFtZSApID0+IGBvbiAke2NsYXNzTmFtZX1gLFxuICByZXF1ZXN0OiAoIHBhdGggKSA9PiBgVVJMOiAke3BhdGh9YCxcbiAgbG9hZDogKCByZXNwb25zZSwgcGF0aCApID0+IGAke3Jlc3BvbnNlLnRpdGxlIHx8ICcnfS4gVVJMOiAke3BhdGh9YCxcbiAgZXJyb3I6ICggZXJyb3IsIHBhdGggKSA9PiBgJHtlcnJvcn0uIFVSTDogJHtwYXRofWAsXG4gIGFwcGVuZDogKCByZXNwb25zZSwgcGF0aCwgaXRlbXMgKSA9PiBgJHtpdGVtcy5sZW5ndGh9IGl0ZW1zLiBVUkw6ICR7cGF0aH1gLFxuICBsYXN0OiAoIHJlc3BvbnNlLCBwYXRoICkgPT4gYFVSTDogJHtwYXRofWAsXG4gIGhpc3Rvcnk6ICggdGl0bGUsIHBhdGggKSA9PiBgVVJMOiAke3BhdGh9YCxcbiAgcGFnZUluZGV4OiBmdW5jdGlvbiggaW5kZXgsIG9yaWdpbiApIHtcbiAgICByZXR1cm4gYGN1cnJlbnQgcGFnZSBkZXRlcm1pbmVkIHRvIGJlOiAke2luZGV4fSBmcm9tICR7b3JpZ2lufWA7XG4gIH0sXG59O1xuXG4vLyBsb2cgZXZlbnRzXG5wcm90by5sb2cgPSBmdW5jdGlvbiggdHlwZSwgYXJncyApIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmRlYnVnICkgcmV0dXJuO1xuXG4gIGxldCBtZXNzYWdlID0gYFtJbmZpbml0ZVNjcm9sbF0gJHt0eXBlfWA7XG4gIGxldCBsb2dnZXIgPSBsb2dnZXJzWyB0eXBlIF07XG4gIGlmICggbG9nZ2VyICkgbWVzc2FnZSArPSAnLiAnICsgbG9nZ2VyLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gIGNvbnNvbGUubG9nKCBtZXNzYWdlICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtZXRob2RzIHVzZWQgYW1vdW5nIGZlYXR1cmVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnVwZGF0ZU1lYXN1cmVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgbGV0IHJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHRoaXMudG9wID0gcmVjdC50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcbn07XG5cbnByb3RvLnVwZGF0ZVNjcm9sbGVyID0gZnVuY3Rpb24oKSB7XG4gIGxldCBlbGVtZW50U2Nyb2xsID0gdGhpcy5vcHRpb25zLmVsZW1lbnRTY3JvbGw7XG4gIGlmICggIWVsZW1lbnRTY3JvbGwgKSB7XG4gICAgLy8gZGVmYXVsdCwgdXNlIHdpbmRvd1xuICAgIHRoaXMuc2Nyb2xsZXIgPSB3aW5kb3c7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGlmIHRydWUsIHNldCB0byBlbGVtZW50LCBvdGhlcndpc2UgdXNlIG9wdGlvblxuICB0aGlzLnNjcm9sbGVyID0gZWxlbWVudFNjcm9sbCA9PT0gdHJ1ZSA/IHRoaXMuZWxlbWVudCA6XG4gICAgdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtZW50U2Nyb2xsICk7XG4gIGlmICggIXRoaXMuc2Nyb2xsZXIgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZmluZCBlbGVtZW50U2Nyb2xsOiAke2VsZW1lbnRTY3JvbGx9YCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBhZ2UgcGF0aCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by51cGRhdGVHZXRQYXRoID0gZnVuY3Rpb24oKSB7XG4gIGxldCBvcHRQYXRoID0gdGhpcy5vcHRpb25zLnBhdGg7XG4gIGlmICggIW9wdFBhdGggKSB7XG4gICAgY29uc29sZS5lcnJvcihgSW5maW5pdGVTY3JvbGwgcGF0aCBvcHRpb24gcmVxdWlyZWQuIFNldCBhczogJHtvcHRQYXRofWApO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBmdW5jdGlvblxuICBsZXQgdHlwZSA9IHR5cGVvZiBvcHRQYXRoO1xuICBpZiAoIHR5cGUgPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICB0aGlzLmdldFBhdGggPSBvcHRQYXRoO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB0ZW1wbGF0ZSBzdHJpbmc6ICcvcGFnZXMve3sjfX0uaHRtbCdcbiAgbGV0IHRlbXBsYXRlTWF0Y2ggPSB0eXBlID09ICdzdHJpbmcnICYmIG9wdFBhdGgubWF0Y2goJ3t7I319Jyk7XG4gIGlmICggdGVtcGxhdGVNYXRjaCApIHtcbiAgICB0aGlzLnVwZGF0ZUdldFBhdGhUZW1wbGF0ZSggb3B0UGF0aCApO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBzZWxlY3RvcjogJy5uZXh0LXBhZ2Utc2VsZWN0b3InXG4gIHRoaXMudXBkYXRlR2V0UGF0aFNlbGVjdG9yKCBvcHRQYXRoICk7XG59O1xuXG5wcm90by51cGRhdGVHZXRQYXRoVGVtcGxhdGUgPSBmdW5jdGlvbiggb3B0UGF0aCApIHtcbiAgLy8gc2V0IGdldFBhdGggd2l0aCB0ZW1wbGF0ZSBzdHJpbmdcbiAgdGhpcy5nZXRQYXRoID0gKCkgPT4ge1xuICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLnBhZ2VJbmRleCArIDE7XG4gICAgcmV0dXJuIG9wdFBhdGgucmVwbGFjZSggJ3t7I319JywgbmV4dEluZGV4ICk7XG4gIH07XG4gIC8vIGdldCBwYWdlSW5kZXggZnJvbSBsb2NhdGlvblxuICAvLyBjb252ZXJ0IHBhdGggb3B0aW9uIGludG8gcmVnZXggdG8gbG9vayBmb3IgcGF0dGVybiBpbiBsb2NhdGlvblxuICAvLyBlc2NhcGUgcXVlcnkgKD8pIGluIHVybCwgYWxsb3dzIGZvciBwYXJzaW5nIEdFVCBwYXJhbWV0ZXJzXG4gIGxldCByZWdleFN0cmluZyA9IG9wdFBhdGhcbiAgICAucmVwbGFjZSggLyhcXFxcXFw/fFxcPykvLCAnXFxcXD8nIClcbiAgICAucmVwbGFjZSggJ3t7I319JywgJyhcXFxcZFxcXFxkP1xcXFxkPyknICk7XG4gIGxldCB0ZW1wbGF0ZVJlID0gbmV3IFJlZ0V4cCggcmVnZXhTdHJpbmcgKTtcbiAgbGV0IG1hdGNoID0gbG9jYXRpb24uaHJlZi5tYXRjaCggdGVtcGxhdGVSZSApO1xuXG4gIGlmICggbWF0Y2ggKSB7XG4gICAgdGhpcy5wYWdlSW5kZXggPSBwYXJzZUludCggbWF0Y2hbMV0sIDEwICk7XG4gICAgdGhpcy5sb2coICdwYWdlSW5kZXgnLCBbIHRoaXMucGFnZUluZGV4LCAndGVtcGxhdGUgc3RyaW5nJyBdICk7XG4gIH1cbn07XG5cbmxldCBwYXRoUmVnZXhlcyA9IFtcbiAgLy8gV29yZFByZXNzICYgVHVtYmxyIC0gZXhhbXBsZS5jb20vcGFnZS8yXG4gIC8vIEpla3lsbCAtIGV4YW1wbGUuY29tL3BhZ2UyXG4gIC9eKC4qP1xcLz9wYWdlXFwvPykoXFxkXFxkP1xcZD8pKC4qPyQpLyxcbiAgLy8gRHJ1cGFsIC0gZXhhbXBsZS5jb20vP3BhZ2U9MVxuICAvXiguKj9cXC8/XFw/cGFnZT0pKFxcZFxcZD9cXGQ/KSguKj8kKS8sXG4gIC8vIGNhdGNoIGFsbCwgbGFzdCBvY2N1cmVuY2Ugb2YgYSBudW1iZXJcbiAgLyguKj8pKFxcZFxcZD9cXGQ/KSg/IS4qXFxkKSguKj8kKS8sXG5dO1xuXG4vLyB0cnkgbWF0Y2hpbmcgaHJlZiB0byBwYXRoUmVnZXhlcyBwYXR0ZXJuc1xubGV0IGdldFBhdGhQYXJ0cyA9IEluZmluaXRlU2Nyb2xsLmdldFBhdGhQYXJ0cyA9IGZ1bmN0aW9uKCBocmVmICkge1xuICBpZiAoICFocmVmICkgcmV0dXJuO1xuICBmb3IgKCBsZXQgcmVnZXggb2YgcGF0aFJlZ2V4ZXMgKSB7XG4gICAgbGV0IG1hdGNoID0gaHJlZi5tYXRjaCggcmVnZXggKTtcbiAgICBpZiAoIG1hdGNoICkge1xuICAgICAgbGV0IFsgLCBiZWdpbiwgaW5kZXgsIGVuZCBdID0gbWF0Y2g7XG4gICAgICByZXR1cm4geyBiZWdpbiwgaW5kZXgsIGVuZCB9O1xuICAgIH1cbiAgfVxufTtcblxucHJvdG8udXBkYXRlR2V0UGF0aFNlbGVjdG9yID0gZnVuY3Rpb24oIG9wdFBhdGggKSB7XG4gIC8vIHBhcnNlIGhyZWYgb2YgbGluazogJy5uZXh0LXBhZ2UtbGluaydcbiAgbGV0IGhyZWZFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvciggb3B0UGF0aCApO1xuICBpZiAoICFocmVmRWxlbSApIHtcbiAgICBjb25zb2xlLmVycm9yKGBCYWQgSW5maW5pdGVTY3JvbGwgcGF0aCBvcHRpb24uIE5leHQgbGluayBub3QgZm91bmQ6ICR7b3B0UGF0aH1gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaHJlZiA9IGhyZWZFbGVtLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICBsZXQgcGF0aFBhcnRzID0gZ2V0UGF0aFBhcnRzKCBocmVmICk7XG4gIGlmICggIXBhdGhQYXJ0cyApIHtcbiAgICBjb25zb2xlLmVycm9yKGBJbmZpbml0ZVNjcm9sbCB1bmFibGUgdG8gcGFyc2UgbmV4dCBsaW5rIGhyZWY6ICR7aHJlZn1gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgeyBiZWdpbiwgaW5kZXgsIGVuZCB9ID0gcGF0aFBhcnRzO1xuICB0aGlzLmlzUGF0aFNlbGVjdG9yID0gdHJ1ZTsgLy8gZmxhZyBmb3IgY2hlY2tMYXN0UGFnZSgpXG4gIHRoaXMuZ2V0UGF0aCA9ICgpID0+IGJlZ2luICsgKCB0aGlzLnBhZ2VJbmRleCArIDEgKSArIGVuZDtcbiAgLy8gZ2V0IHBhZ2VJbmRleCBmcm9tIGhyZWZcbiAgdGhpcy5wYWdlSW5kZXggPSBwYXJzZUludCggaW5kZXgsIDEwICkgLSAxO1xuICB0aGlzLmxvZyggJ3BhZ2VJbmRleCcsIFsgdGhpcy5wYWdlSW5kZXgsICduZXh0IGxpbmsnIF0gKTtcbn07XG5cbnByb3RvLnVwZGF0ZUdldEFic29sdXRlUGF0aCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgcGF0aCA9IHRoaXMuZ2V0UGF0aCgpO1xuICAvLyBwYXRoIGRvZXNuJ3Qgc3RhcnQgd2l0aCBodHRwIG9yIC9cbiAgbGV0IGlzQWJzb2x1dGUgPSBwYXRoLm1hdGNoKCAvXmh0dHAvICkgfHwgcGF0aC5tYXRjaCggL15cXC8vICk7XG4gIGlmICggaXNBYnNvbHV0ZSApIHtcbiAgICB0aGlzLmdldEFic29sdXRlUGF0aCA9IHRoaXMuZ2V0UGF0aDtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgeyBwYXRobmFtZSB9ID0gbG9jYXRpb247XG4gIC8vIHF1ZXJ5IHBhcmFtZXRlciAjODI5LiBleGFtcGxlLmNvbS8/cGc9MlxuICBsZXQgaXNRdWVyeSA9IHBhdGgubWF0Y2goIC9eXFw/LyApO1xuICAvLyAvZm9vL2Jhci9pbmRleC5odG1sID0+IC9mb28vYmFyXG4gIGxldCBkaXJlY3RvcnkgPSBwYXRobmFtZS5zdWJzdHJpbmcoIDAsIHBhdGhuYW1lLmxhc3RJbmRleE9mKCcvJykgKTtcbiAgbGV0IHBhdGhTdGFydCA9IGlzUXVlcnkgPyBwYXRobmFtZSA6IGRpcmVjdG9yeSArICcvJztcblxuICB0aGlzLmdldEFic29sdXRlUGF0aCA9ICgpID0+IHBhdGhTdGFydCArIHRoaXMuZ2V0UGF0aCgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbmF2IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGhpZGUgbmF2aWdhdGlvblxuSW5maW5pdGVTY3JvbGwuY3JlYXRlLmhpZGVOYXYgPSBmdW5jdGlvbigpIHtcbiAgbGV0IG5hdiA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggdGhpcy5vcHRpb25zLmhpZGVOYXYgKTtcbiAgaWYgKCAhbmF2ICkgcmV0dXJuO1xuXG4gIG5hdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB0aGlzLm5hdiA9IG5hdjtcbn07XG5cbkluZmluaXRlU2Nyb2xsLmRlc3Ryb3kuaGlkZU5hdiA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMubmF2ICkgdGhpcy5uYXYuc3R5bGUuZGlzcGxheSA9ICcnO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZGVzdHJveSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYWxsT2ZmKCk7IC8vIHJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gIC8vIGNhbGwgZGVzdHJveSBtZXRob2RzXG4gIGZvciAoIGxldCBtZXRob2QgaW4gSW5maW5pdGVTY3JvbGwuZGVzdHJveSApIHtcbiAgICBJbmZpbml0ZVNjcm9sbC5kZXN0cm95WyBtZXRob2QgXS5jYWxsKCB0aGlzICk7XG4gIH1cblxuICBkZWxldGUgdGhpcy5lbGVtZW50LmluZmluaXRlU2Nyb2xsR1VJRDtcbiAgZGVsZXRlIGluc3RhbmNlc1sgdGhpcy5ndWlkIF07XG4gIC8vIHJlbW92ZSBqUXVlcnkgZGF0YS4gIzgwN1xuICBpZiAoIGpRdWVyeSAmJiB0aGlzLiRlbGVtZW50ICkge1xuICAgIGpRdWVyeS5yZW1vdmVEYXRhKCB0aGlzLmVsZW1lbnQsICdpbmZpbml0ZVNjcm9sbCcgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gdXRpbGl0aWVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGh0dHBzOi8vcmVteXNoYXJwLmNvbS8yMDEwLzA3LzIxL3Rocm90dGxpbmctZnVuY3Rpb24tY2FsbHNcbkluZmluaXRlU2Nyb2xsLnRocm90dGxlID0gZnVuY3Rpb24oIGZuLCB0aHJlc2hvbGQgKSB7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCAyMDA7XG4gIGxldCBsYXN0LCB0aW1lb3V0O1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBsZXQgbm93ID0gK25ldyBEYXRlKCk7XG4gICAgbGV0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGV0IHRyaWdnZXIgPSAoKSA9PiB7XG4gICAgICBsYXN0ID0gbm93O1xuICAgICAgZm4uYXBwbHkoIHRoaXMsIGFyZ3MgKTtcbiAgICB9O1xuICAgIGlmICggbGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNob2xkICkge1xuICAgICAgLy8gaG9sZCBvbiB0byBpdFxuICAgICAgY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCggdHJpZ2dlciwgdGhyZXNob2xkICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyaWdnZXIoKTtcbiAgICB9XG4gIH07XG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kYXRhID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIGVsZW0gPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIGVsZW0gKTtcbiAgbGV0IGlkID0gZWxlbSAmJiBlbGVtLmluZmluaXRlU2Nyb2xsR1VJRDtcbiAgcmV0dXJuIGlkICYmIGluc3RhbmNlc1sgaWQgXTtcbn07XG5cbi8vIHNldCBpbnRlcm5hbCBqUXVlcnksIGZvciBXZWJwYWNrICsgalF1ZXJ5IHYzXG5JbmZpbml0ZVNjcm9sbC5zZXRKUXVlcnkgPSBmdW5jdGlvbigganFyeSApIHtcbiAgalF1ZXJ5ID0ganFyeTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNldHVwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmh0bWxJbml0KCBJbmZpbml0ZVNjcm9sbCwgJ2luZmluaXRlLXNjcm9sbCcgKTtcblxuLy8gYWRkIG5vb3AgX2luaXQgbWV0aG9kIGZvciBqUXVlcnkgQnJpZGdldC4gIzc2OFxucHJvdG8uX2luaXQgPSBmdW5jdGlvbigpIHt9O1xuXG5sZXQgeyBqUXVlcnlCcmlkZ2V0IH0gPSB3aW5kb3c7XG5pZiAoIGpRdWVyeSAmJiBqUXVlcnlCcmlkZ2V0ICkge1xuICBqUXVlcnlCcmlkZ2V0KCAnaW5maW5pdGVTY3JvbGwnLCBJbmZpbml0ZVNjcm9sbCwgalF1ZXJ5ICk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5yZXR1cm4gSW5maW5pdGVTY3JvbGw7XG5cbn0gKSApO1xuIiwiLy8gaGlzdG9yeVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHJlcXVpcmUoJy4vY29yZScpLFxuICAgICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgICB3aW5kb3csXG4gICAgICAgIHdpbmRvdy5JbmZpbml0ZVNjcm9sbCxcbiAgICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBJbmZpbml0ZVNjcm9sbCwgdXRpbHMgKSB7XG5cbmxldCBwcm90byA9IEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZTtcblxuT2JqZWN0LmFzc2lnbiggSW5maW5pdGVTY3JvbGwuZGVmYXVsdHMsIHtcbiAgaGlzdG9yeTogJ3JlcGxhY2UnLFxuICAvLyBoaXN0b3J5VGl0bGU6IGZhbHNlLFxufSApO1xuXG5sZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuLy8gLS0tLS0gY3JlYXRlL2Rlc3Ryb3kgLS0tLS0gLy9cblxuSW5maW5pdGVTY3JvbGwuY3JlYXRlLmhpc3RvcnkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmhpc3RvcnkgKSByZXR1cm47XG5cbiAgLy8gY2hlY2sgZm9yIHNhbWUgb3JpZ2luXG4gIGxpbmsuaHJlZiA9IHRoaXMuZ2V0QWJzb2x1dGVQYXRoKCk7XG4gIC8vIE1TIEVkZ2UgZG9lcyBub3QgaGF2ZSBvcmlnaW4gb24gbGlua1xuICAvLyBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMjIzNjQ5My9cbiAgbGV0IGxpbmtPcmlnaW4gPSBsaW5rLm9yaWdpbiB8fCBsaW5rLnByb3RvY29sICsgJy8vJyArIGxpbmsuaG9zdDtcbiAgbGV0IGlzU2FtZU9yaWdpbiA9IGxpbmtPcmlnaW4gPT0gbG9jYXRpb24ub3JpZ2luO1xuICBpZiAoICFpc1NhbWVPcmlnaW4gKSB7XG4gICAgY29uc29sZS5lcnJvciggJ1tJbmZpbml0ZVNjcm9sbF0gY2Fubm90IHNldCBoaXN0b3J5IHdpdGggZGlmZmVyZW50IG9yaWdpbjogJyArXG4gICAgICBgJHtsaW5rLm9yaWdpbn0gb24gJHtsb2NhdGlvbi5vcmlnaW59IC4gSGlzdG9yeSBiZWhhdmlvciBkaXNhYmxlZC5gICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdHdvIHdheXMgdG8gaGFuZGxlIGNoYW5naW5nIGhpc3RvcnlcbiAgaWYgKCB0aGlzLm9wdGlvbnMuYXBwZW5kICkge1xuICAgIHRoaXMuY3JlYXRlSGlzdG9yeUFwcGVuZCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuY3JlYXRlSGlzdG9yeVBhZ2VMb2FkKCk7XG4gIH1cbn07XG5cbnByb3RvLmNyZWF0ZUhpc3RvcnlBcHBlbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy51cGRhdGVNZWFzdXJlbWVudHMoKTtcbiAgdGhpcy51cGRhdGVTY3JvbGxlcigpO1xuICAvLyBhcnJheSBvZiBzY3JvbGwgcG9zaXRpb25zIG9mIGFwcGVuZGVkIHBhZ2VzXG4gIHRoaXMuc2Nyb2xsUGFnZXMgPSBbXG4gICAgLy8gZmlyc3QgcGFnZVxuICAgIHtcbiAgICAgIHRvcDogMCxcbiAgICAgIHBhdGg6IGxvY2F0aW9uLmhyZWYsXG4gICAgICB0aXRsZTogZG9jdW1lbnQudGl0bGUsXG4gICAgfSxcbiAgXTtcbiAgdGhpcy5zY3JvbGxQYWdlID0gdGhpcy5zY3JvbGxQYWdlc1swXTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMuc2Nyb2xsSGlzdG9yeUhhbmRsZXIgPSB0aGlzLm9uU2Nyb2xsSGlzdG9yeS5iaW5kKCB0aGlzICk7XG4gIHRoaXMudW5sb2FkSGFuZGxlciA9IHRoaXMub25VbmxvYWQuYmluZCggdGhpcyApO1xuICB0aGlzLnNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzLnNjcm9sbEhpc3RvcnlIYW5kbGVyICk7XG4gIHRoaXMub24oICdhcHBlbmQnLCB0aGlzLm9uQXBwZW5kSGlzdG9yeSApO1xuICB0aGlzLmJpbmRIaXN0b3J5QXBwZW5kRXZlbnRzKCB0cnVlICk7XG59O1xuXG5wcm90by5iaW5kSGlzdG9yeUFwcGVuZEV2ZW50cyA9IGZ1bmN0aW9uKCBpc0JpbmQgKSB7XG4gIGxldCBhZGRSZW1vdmUgPSBpc0JpbmQgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gIHRoaXMuc2Nyb2xsZXJbIGFkZFJlbW92ZSBdKCAnc2Nyb2xsJywgdGhpcy5zY3JvbGxIaXN0b3J5SGFuZGxlciApO1xuICB3aW5kb3dbIGFkZFJlbW92ZSBdKCAndW5sb2FkJywgdGhpcy51bmxvYWRIYW5kbGVyICk7XG59O1xuXG5wcm90by5jcmVhdGVIaXN0b3J5UGFnZUxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vbiggJ2xvYWQnLCB0aGlzLm9uUGFnZUxvYWRIaXN0b3J5ICk7XG59O1xuXG5JbmZpbml0ZVNjcm9sbC5kZXN0cm95Lmhpc3RvcnkgPVxucHJvdG8uZGVzdHJveUhpc3RvcnkgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGlzSGlzdG9yeUFwcGVuZCA9IHRoaXMub3B0aW9ucy5oaXN0b3J5ICYmIHRoaXMub3B0aW9ucy5hcHBlbmQ7XG4gIGlmICggaXNIaXN0b3J5QXBwZW5kICkge1xuICAgIHRoaXMuYmluZEhpc3RvcnlBcHBlbmRFdmVudHMoIGZhbHNlICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGFwcGVuZCBoaXN0b3J5IC0tLS0tIC8vXG5cbnByb3RvLm9uQXBwZW5kSGlzdG9yeSA9IGZ1bmN0aW9uKCByZXNwb25zZSwgcGF0aCwgaXRlbXMgKSB7XG4gIC8vIGRvIG5vdCBwcm9jZWVkIGlmIG5vIGl0ZW1zLiAjNzc5XG4gIGlmICggIWl0ZW1zIHx8ICFpdGVtcy5sZW5ndGggKSByZXR1cm47XG5cbiAgbGV0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICBsZXQgZWxlbVNjcm9sbFkgPSB0aGlzLmdldEVsZW1lbnRTY3JvbGxZKCBmaXJzdEl0ZW0gKTtcbiAgLy8gcmVzb2x2ZSBwYXRoXG4gIGxpbmsuaHJlZiA9IHBhdGg7XG4gIC8vIGFkZCBwYWdlIGRhdGEgdG8gaGFzaFxuICB0aGlzLnNjcm9sbFBhZ2VzLnB1c2goe1xuICAgIHRvcDogZWxlbVNjcm9sbFksXG4gICAgcGF0aDogbGluay5ocmVmLFxuICAgIHRpdGxlOiByZXNwb25zZS50aXRsZSxcbiAgfSk7XG59O1xuXG5wcm90by5nZXRFbGVtZW50U2Nyb2xsWSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHRoaXMub3B0aW9ucy5lbGVtZW50U2Nyb2xsICkge1xuICAgIHJldHVybiBlbGVtLm9mZnNldFRvcCAtIHRoaXMudG9wO1xuICB9IGVsc2Uge1xuICAgIGxldCByZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gcmVjdC50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgfVxufTtcblxucHJvdG8ub25TY3JvbGxIaXN0b3J5ID0gZnVuY3Rpb24oKSB7XG4gIC8vIGN5Y2xlIHRocm91Z2ggcG9zaXRpb25zLCBmaW5kIGJpZ2dlc3Qgd2l0aG91dCBnb2luZyBvdmVyXG4gIGxldCBzY3JvbGxQYWdlID0gdGhpcy5nZXRDbG9zZXN0U2Nyb2xsUGFnZSgpO1xuICAvLyBzZXQgaGlzdG9yeSBpZiBjaGFuZ2VkXG4gIGlmICggc2Nyb2xsUGFnZSAhPSB0aGlzLnNjcm9sbFBhZ2UgKSB7XG4gICAgdGhpcy5zY3JvbGxQYWdlID0gc2Nyb2xsUGFnZTtcbiAgICB0aGlzLnNldEhpc3RvcnkoIHNjcm9sbFBhZ2UudGl0bGUsIHNjcm9sbFBhZ2UucGF0aCApO1xuICB9XG59O1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCggSW5maW5pdGVTY3JvbGwsICdvblNjcm9sbEhpc3RvcnknLCAxNTAgKTtcblxucHJvdG8uZ2V0Q2xvc2VzdFNjcm9sbFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgbGV0IHNjcm9sbFZpZXdZO1xuICBpZiAoIHRoaXMub3B0aW9ucy5lbGVtZW50U2Nyb2xsICkge1xuICAgIHNjcm9sbFZpZXdZID0gdGhpcy5zY3JvbGxlci5zY3JvbGxUb3AgKyB0aGlzLnNjcm9sbGVyLmNsaWVudEhlaWdodCAvIDI7XG4gIH0gZWxzZSB7XG4gICAgc2Nyb2xsVmlld1kgPSB3aW5kb3cuc2Nyb2xsWSArIHRoaXMud2luZG93SGVpZ2h0IC8gMjtcbiAgfVxuXG4gIGxldCBzY3JvbGxQYWdlO1xuICBmb3IgKCBsZXQgcGFnZSBvZiB0aGlzLnNjcm9sbFBhZ2VzICkge1xuICAgIGlmICggcGFnZS50b3AgPj0gc2Nyb2xsVmlld1kgKSBicmVhaztcblxuICAgIHNjcm9sbFBhZ2UgPSBwYWdlO1xuICB9XG4gIHJldHVybiBzY3JvbGxQYWdlO1xufTtcblxucHJvdG8uc2V0SGlzdG9yeSA9IGZ1bmN0aW9uKCB0aXRsZSwgcGF0aCApIHtcbiAgbGV0IG9wdEhpc3RvcnkgPSB0aGlzLm9wdGlvbnMuaGlzdG9yeTtcbiAgbGV0IGhpc3RvcnlNZXRob2QgPSBvcHRIaXN0b3J5ICYmIGhpc3RvcnlbIG9wdEhpc3RvcnkgKyAnU3RhdGUnIF07XG4gIGlmICggIWhpc3RvcnlNZXRob2QgKSByZXR1cm47XG5cbiAgaGlzdG9yeVsgb3B0SGlzdG9yeSArICdTdGF0ZScgXSggbnVsbCwgdGl0bGUsIHBhdGggKTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMuaGlzdG9yeVRpdGxlICkgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnaGlzdG9yeScsIG51bGwsIFsgdGl0bGUsIHBhdGggXSApO1xufTtcblxuLy8gc2Nyb2xsIHRvIHRvcCB0byBwcmV2ZW50IGluaXRpYWwgc2Nyb2xsLXJlc2V0IGFmdGVyIHBhZ2UgcmVmcmVzaFxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE4NjMzOTE1LzE4MjE4M1xucHJvdG8ub25VbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnNjcm9sbFBhZ2UudG9wID09PSAwICkgcmV0dXJuO1xuXG4gIC8vIGNhbGN1bGF0ZSB3aGVyZSBzY3JvbGwgcG9zaXRpb24gd291bGQgYmUgb24gcmVmcmVzaFxuICBsZXQgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZIC0gdGhpcy5zY3JvbGxQYWdlLnRvcCArIHRoaXMudG9wO1xuICAvLyBkaXNhYmxlIHNjcm9sbCBldmVudCBiZWZvcmUgc2V0dGluZyBzY3JvbGwgIzY3OVxuICB0aGlzLmRlc3Ryb3lIaXN0b3J5KCk7XG4gIHNjcm9sbFRvKCAwLCBzY3JvbGxZICk7XG59O1xuXG4vLyAtLS0tLSBsb2FkIGhpc3RvcnkgLS0tLS0gLy9cblxuLy8gdXBkYXRlIFVSTFxucHJvdG8ub25QYWdlTG9hZEhpc3RvcnkgPSBmdW5jdGlvbiggcmVzcG9uc2UsIHBhdGggKSB7XG4gIHRoaXMuc2V0SGlzdG9yeSggcmVzcG9uc2UudGl0bGUsIHBhdGggKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5yZXR1cm4gSW5maW5pdGVTY3JvbGw7XG5cbn0gKSApO1xuIiwiLyohXG4gKiBJbmZpbml0ZSBTY3JvbGwgdjQuMC4xXG4gKiBBdXRvbWF0aWNhbGx5IGFkZCBuZXh0IHBhZ2VcbiAqXG4gKiBMaWNlbnNlZCBHUEx2MyBmb3Igb3BlbiBzb3VyY2UgdXNlXG4gKiBvciBJbmZpbml0ZSBTY3JvbGwgQ29tbWVyY2lhbCBMaWNlbnNlIGZvciBjb21tZXJjaWFsIHVzZVxuICpcbiAqIGh0dHBzOi8vaW5maW5pdGUtc2Nyb2xsLmNvbVxuICogQ29weXJpZ2h0IDIwMTgtMjAyMCBNZXRhZml6enlcbiAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICAgIHJlcXVpcmUoJy4vY29yZScpLFxuICAgICAgICByZXF1aXJlKCcuL3BhZ2UtbG9hZCcpLFxuICAgICAgICByZXF1aXJlKCcuL3Njcm9sbC13YXRjaCcpLFxuICAgICAgICByZXF1aXJlKCcuL2hpc3RvcnknKSxcbiAgICAgICAgcmVxdWlyZSgnLi9idXR0b24nKSxcbiAgICAgICAgcmVxdWlyZSgnLi9zdGF0dXMnKSxcbiAgICApO1xuICB9XG5cbn0gKSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBJbmZpbml0ZVNjcm9sbCApIHtcbiAgcmV0dXJuIEluZmluaXRlU2Nyb2xsO1xufSApO1xuIiwiLy8gcGFnZS1sb2FkXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgcmVxdWlyZSgnLi9jb3JlJyksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgd2luZG93LkluZmluaXRlU2Nyb2xsLFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEluZmluaXRlU2Nyb2xsICkge1xuXG5sZXQgcHJvdG8gPSBJbmZpbml0ZVNjcm9sbC5wcm90b3R5cGU7XG5cbk9iamVjdC5hc3NpZ24oIEluZmluaXRlU2Nyb2xsLmRlZmF1bHRzLCB7XG4gIC8vIGFwcGVuZDogZmFsc2UsXG4gIGxvYWRPblNjcm9sbDogdHJ1ZSxcbiAgY2hlY2tMYXN0UGFnZTogdHJ1ZSxcbiAgcmVzcG9uc2VCb2R5OiAndGV4dCcsXG4gIGRvbVBhcnNlUmVzcG9uc2U6IHRydWUsXG4gIC8vIHByZWZpbGw6IGZhbHNlLFxuICAvLyBvdXRsYXllcjogbnVsbCxcbn0gKTtcblxuSW5maW5pdGVTY3JvbGwuY3JlYXRlLnBhZ2VMb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2FuTG9hZCA9IHRydWU7XG4gIHRoaXMub24oICdzY3JvbGxUaHJlc2hvbGQnLCB0aGlzLm9uU2Nyb2xsVGhyZXNob2xkTG9hZCApO1xuICB0aGlzLm9uKCAnbG9hZCcsIHRoaXMuY2hlY2tMYXN0UGFnZSApO1xuICBpZiAoIHRoaXMub3B0aW9ucy5vdXRsYXllciApIHtcbiAgICB0aGlzLm9uKCAnYXBwZW5kJywgdGhpcy5vbkFwcGVuZE91dGxheWVyICk7XG4gIH1cbn07XG5cbnByb3RvLm9uU2Nyb2xsVGhyZXNob2xkTG9hZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMub3B0aW9ucy5sb2FkT25TY3JvbGwgKSB0aGlzLmxvYWROZXh0UGFnZSgpO1xufTtcblxubGV0IGRvbVBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcblxucHJvdG8ubG9hZE5leHRQYWdlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc0xvYWRpbmcgfHwgIXRoaXMuY2FuTG9hZCApIHJldHVybjtcblxuICBsZXQgeyByZXNwb25zZUJvZHksIGRvbVBhcnNlUmVzcG9uc2UsIGZldGNoT3B0aW9ucyB9ID0gdGhpcy5vcHRpb25zO1xuICBsZXQgcGF0aCA9IHRoaXMuZ2V0QWJzb2x1dGVQYXRoKCk7XG4gIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgaWYgKCB0eXBlb2YgZmV0Y2hPcHRpb25zID09ICdmdW5jdGlvbicgKSBmZXRjaE9wdGlvbnMgPSBmZXRjaE9wdGlvbnMoKTtcblxuICBsZXQgZmV0Y2hQcm9taXNlID0gZmV0Y2goIHBhdGgsIGZldGNoT3B0aW9ucyApXG4gICAgLnRoZW4oICggcmVzcG9uc2UgKSA9PiB7XG4gICAgICBpZiAoICFyZXNwb25zZS5vayApIHtcbiAgICAgICAgbGV0IGVycm9yID0gbmV3IEVycm9yKCByZXNwb25zZS5zdGF0dXNUZXh0ICk7XG4gICAgICAgIHRoaXMub25QYWdlRXJyb3IoIGVycm9yLCBwYXRoLCByZXNwb25zZSApO1xuICAgICAgICByZXR1cm4geyByZXNwb25zZSB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2VbIHJlc3BvbnNlQm9keSBdKCkudGhlbiggKCBib2R5ICkgPT4ge1xuICAgICAgICBsZXQgY2FuRG9tUGFyc2UgPSByZXNwb25zZUJvZHkgPT0gJ3RleHQnICYmIGRvbVBhcnNlUmVzcG9uc2U7XG4gICAgICAgIGlmICggY2FuRG9tUGFyc2UgKSB7XG4gICAgICAgICAgYm9keSA9IGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcoIGJvZHksICd0ZXh0L2h0bWwnICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCByZXNwb25zZS5zdGF0dXMgPT0gMjA0ICkge1xuICAgICAgICAgIHRoaXMubGFzdFBhZ2VSZWFjaGVkKCBib2R5LCBwYXRoICk7XG4gICAgICAgICAgcmV0dXJuIHsgYm9keSwgcmVzcG9uc2UgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vblBhZ2VMb2FkKCBib2R5LCBwYXRoLCByZXNwb25zZSApO1xuICAgICAgICB9XG4gICAgICB9ICk7XG4gICAgfSApXG4gICAgLmNhdGNoKCAoIGVycm9yICkgPT4ge1xuICAgICAgdGhpcy5vblBhZ2VFcnJvciggZXJyb3IsIHBhdGggKTtcbiAgICB9ICk7XG5cbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncmVxdWVzdCcsIG51bGwsIFsgcGF0aCwgZmV0Y2hQcm9taXNlIF0gKTtcblxuICByZXR1cm4gZmV0Y2hQcm9taXNlO1xufTtcblxucHJvdG8ub25QYWdlTG9hZCA9IGZ1bmN0aW9uKCBib2R5LCBwYXRoLCByZXNwb25zZSApIHtcbiAgLy8gZG9uZSBsb2FkaW5nIGlmIG5vdCBhcHBlbmRpbmdcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmFwcGVuZCApIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICB9XG4gIHRoaXMucGFnZUluZGV4Kys7XG4gIHRoaXMubG9hZENvdW50Kys7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2xvYWQnLCBudWxsLCBbIGJvZHksIHBhdGgsIHJlc3BvbnNlIF0gKTtcbiAgcmV0dXJuIHRoaXMuYXBwZW5kTmV4dFBhZ2UoIGJvZHksIHBhdGgsIHJlc3BvbnNlICk7XG59O1xuXG5wcm90by5hcHBlbmROZXh0UGFnZSA9IGZ1bmN0aW9uKCBib2R5LCBwYXRoLCByZXNwb25zZSApIHtcbiAgbGV0IHsgYXBwZW5kLCByZXNwb25zZUJvZHksIGRvbVBhcnNlUmVzcG9uc2UgfSA9IHRoaXMub3B0aW9ucztcbiAgLy8gZG8gbm90IGFwcGVuZCBqc29uXG4gIGxldCBpc0RvY3VtZW50ID0gcmVzcG9uc2VCb2R5ID09ICd0ZXh0JyAmJiBkb21QYXJzZVJlc3BvbnNlO1xuICBpZiAoICFpc0RvY3VtZW50IHx8ICFhcHBlbmQgKSByZXR1cm4geyBib2R5LCByZXNwb25zZSB9O1xuXG4gIGxldCBpdGVtcyA9IGJvZHkucXVlcnlTZWxlY3RvckFsbCggYXBwZW5kICk7XG4gIGxldCBwcm9taXNlVmFsdWUgPSB7IGJvZHksIHJlc3BvbnNlLCBpdGVtcyB9O1xuICAvLyBsYXN0IHBhZ2UgaGl0IGlmIG5vIGl0ZW1zLiAjODQwXG4gIGlmICggIWl0ZW1zIHx8ICFpdGVtcy5sZW5ndGggKSB7XG4gICAgdGhpcy5sYXN0UGFnZVJlYWNoZWQoIGJvZHksIHBhdGggKTtcbiAgICByZXR1cm4gcHJvbWlzZVZhbHVlO1xuICB9XG5cbiAgbGV0IGZyYWdtZW50ID0gZ2V0SXRlbXNGcmFnbWVudCggaXRlbXMgKTtcbiAgbGV0IGFwcGVuZFJlYWR5ID0gKCkgPT4ge1xuICAgIHRoaXMuYXBwZW5kSXRlbXMoIGl0ZW1zLCBmcmFnbWVudCApO1xuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnYXBwZW5kJywgbnVsbCwgWyBib2R5LCBwYXRoLCBpdGVtcywgcmVzcG9uc2UgXSApO1xuICAgIHJldHVybiBwcm9taXNlVmFsdWU7XG4gIH07XG5cbiAgLy8gVE9ETyBhZGQgaG9vayBmb3Igb3B0aW9uIHRvIHRyaWdnZXIgYXBwZW5kUmVhZHlcbiAgaWYgKCB0aGlzLm9wdGlvbnMub3V0bGF5ZXIgKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kT3V0bGF5ZXJJdGVtcyggZnJhZ21lbnQsIGFwcGVuZFJlYWR5ICk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFwcGVuZFJlYWR5KCk7XG4gIH1cbn07XG5cbnByb3RvLmFwcGVuZEl0ZW1zID0gZnVuY3Rpb24oIGl0ZW1zLCBmcmFnbWVudCApIHtcbiAgaWYgKCAhaXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCApIHJldHVybjtcblxuICAvLyBnZXQgZnJhZ21lbnQgaWYgbm90IHByb3ZpZGVkXG4gIGZyYWdtZW50ID0gZnJhZ21lbnQgfHwgZ2V0SXRlbXNGcmFnbWVudCggaXRlbXMgKTtcbiAgcmVmcmVzaFNjcmlwdHMoIGZyYWdtZW50ICk7XG4gIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCggZnJhZ21lbnQgKTtcbn07XG5cbmZ1bmN0aW9uIGdldEl0ZW1zRnJhZ21lbnQoIGl0ZW1zICkge1xuICAvLyBhZGQgaXRlbXMgdG8gZnJhZ21lbnRcbiAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBpZiAoIGl0ZW1zICkgZnJhZ21lbnQuYXBwZW5kKCAuLi5pdGVtcyApO1xuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5cbi8vIHJlcGxhY2UgPHNjcmlwdD5zIHdpdGggY29waWVzIHNvIHRoZXkgbG9hZFxuLy8gPHNjcmlwdD5zIGFkZGVkIGJ5IEluZmluaXRlU2Nyb2xsIHdpbGwgbm90IGxvYWRcbi8vIHNpbWlsYXIgdG8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjEwOTk1XG5mdW5jdGlvbiByZWZyZXNoU2NyaXB0cyggZnJhZ21lbnQgKSB7XG4gIGxldCBzY3JpcHRzID0gZnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0Jyk7XG4gIGZvciAoIGxldCBzY3JpcHQgb2Ygc2NyaXB0cyApIHtcbiAgICBsZXQgZnJlc2hTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAvLyBjb3B5IGF0dHJpYnV0ZXNcbiAgICBsZXQgYXR0cnMgPSBzY3JpcHQuYXR0cmlidXRlcztcbiAgICBmb3IgKCBsZXQgYXR0ciBvZiBhdHRycyApIHtcbiAgICAgIGZyZXNoU2NyaXB0LnNldEF0dHJpYnV0ZSggYXR0ci5uYW1lLCBhdHRyLnZhbHVlICk7XG4gICAgfVxuICAgIC8vIGNvcHkgaW5uZXIgc2NyaXB0IGNvZGUuICM3MTgsICM3ODJcbiAgICBmcmVzaFNjcmlwdC5pbm5lckhUTUwgPSBzY3JpcHQuaW5uZXJIVE1MO1xuICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCggZnJlc2hTY3JpcHQsIHNjcmlwdCApO1xuICB9XG59XG5cbi8vIC0tLS0tIG91dGxheWVyIC0tLS0tIC8vXG5cbnByb3RvLmFwcGVuZE91dGxheWVySXRlbXMgPSBmdW5jdGlvbiggZnJhZ21lbnQsIGFwcGVuZFJlYWR5ICkge1xuICBsZXQgaW1hZ2VzTG9hZGVkID0gSW5maW5pdGVTY3JvbGwuaW1hZ2VzTG9hZGVkIHx8IHdpbmRvdy5pbWFnZXNMb2FkZWQ7XG4gIGlmICggIWltYWdlc0xvYWRlZCApIHtcbiAgICBjb25zb2xlLmVycm9yKCdbSW5maW5pdGVTY3JvbGxdIGltYWdlc0xvYWRlZCByZXF1aXJlZCBmb3Igb3V0bGF5ZXIgb3B0aW9uJyk7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gYXBwZW5kIG9uY2UgaW1hZ2VzIGxvYWRlZFxuICByZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uKCByZXNvbHZlICkge1xuICAgIGltYWdlc0xvYWRlZCggZnJhZ21lbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGJvZHlSZXNwb25zZSA9IGFwcGVuZFJlYWR5KCk7XG4gICAgICByZXNvbHZlKCBib2R5UmVzcG9uc2UgKTtcbiAgICB9ICk7XG4gIH0gKTtcbn07XG5cbnByb3RvLm9uQXBwZW5kT3V0bGF5ZXIgPSBmdW5jdGlvbiggcmVzcG9uc2UsIHBhdGgsIGl0ZW1zICkge1xuICB0aGlzLm9wdGlvbnMub3V0bGF5ZXIuYXBwZW5kZWQoIGl0ZW1zICk7XG59O1xuXG4vLyAtLS0tLSBjaGVja0xhc3RQYWdlIC0tLS0tIC8vXG5cbi8vIGNoZWNrIHJlc3BvbnNlIGZvciBuZXh0IGVsZW1lbnRcbnByb3RvLmNoZWNrTGFzdFBhZ2UgPSBmdW5jdGlvbiggYm9keSwgcGF0aCApIHtcbiAgbGV0IHsgY2hlY2tMYXN0UGFnZSwgcGF0aDogcGF0aE9wdCB9ID0gdGhpcy5vcHRpb25zO1xuICBpZiAoICFjaGVja0xhc3RQYWdlICkgcmV0dXJuO1xuXG4gIC8vIGlmIHBhdGggaXMgZnVuY3Rpb24sIGNoZWNrIGlmIG5leHQgcGF0aCBpcyB0cnV0aHlcbiAgaWYgKCB0eXBlb2YgcGF0aE9wdCA9PSAnZnVuY3Rpb24nICkge1xuICAgIGxldCBuZXh0UGF0aCA9IHRoaXMuZ2V0UGF0aCgpO1xuICAgIGlmICggIW5leHRQYXRoICkge1xuICAgICAgdGhpcy5sYXN0UGFnZVJlYWNoZWQoIGJvZHksIHBhdGggKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdG9yIGZyb20gY2hlY2tMYXN0UGFnZSBvciBwYXRoIG9wdGlvblxuICBsZXQgc2VsZWN0b3I7XG4gIGlmICggdHlwZW9mIGNoZWNrTGFzdFBhZ2UgPT0gJ3N0cmluZycgKSB7XG4gICAgc2VsZWN0b3IgPSBjaGVja0xhc3RQYWdlO1xuICB9IGVsc2UgaWYgKCB0aGlzLmlzUGF0aFNlbGVjdG9yICkge1xuICAgIC8vIHBhdGggb3B0aW9uIGlzIHNlbGVjdG9yIHN0cmluZ1xuICAgIHNlbGVjdG9yID0gcGF0aE9wdDtcbiAgfVxuICAvLyBjaGVjayBsYXN0IHBhZ2UgZm9yIHNlbGVjdG9yXG4gIC8vIGJhaWwgaWYgbm8gc2VsZWN0b3Igb3Igbm90IGRvY3VtZW50IHJlc3BvbnNlXG4gIGlmICggIXNlbGVjdG9yIHx8ICFib2R5LnF1ZXJ5U2VsZWN0b3IgKSByZXR1cm47XG5cbiAgLy8gY2hlY2sgaWYgcmVzcG9uc2UgaGFzIHNlbGVjdG9yXG4gIGxldCBuZXh0RWxlbSA9IGJvZHkucXVlcnlTZWxlY3Rvciggc2VsZWN0b3IgKTtcbiAgaWYgKCAhbmV4dEVsZW0gKSB0aGlzLmxhc3RQYWdlUmVhY2hlZCggYm9keSwgcGF0aCApO1xufTtcblxucHJvdG8ubGFzdFBhZ2VSZWFjaGVkID0gZnVuY3Rpb24oIGJvZHksIHBhdGggKSB7XG4gIHRoaXMuY2FuTG9hZCA9IGZhbHNlO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdsYXN0JywgbnVsbCwgWyBib2R5LCBwYXRoIF0gKTtcbn07XG5cbi8vIC0tLS0tIGVycm9yIC0tLS0tIC8vXG5cbnByb3RvLm9uUGFnZUVycm9yID0gZnVuY3Rpb24oIGVycm9yLCBwYXRoLCByZXNwb25zZSApIHtcbiAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgdGhpcy5jYW5Mb2FkID0gZmFsc2U7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2Vycm9yJywgbnVsbCwgWyBlcnJvciwgcGF0aCwgcmVzcG9uc2UgXSApO1xuICByZXR1cm4gZXJyb3I7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwcmVmaWxsIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbkluZmluaXRlU2Nyb2xsLmNyZWF0ZS5wcmVmaWxsID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5wcmVmaWxsICkgcmV0dXJuO1xuXG4gIGxldCBhcHBlbmQgPSB0aGlzLm9wdGlvbnMuYXBwZW5kO1xuICBpZiAoICFhcHBlbmQgKSB7XG4gICAgY29uc29sZS5lcnJvcihgYXBwZW5kIG9wdGlvbiByZXF1aXJlZCBmb3IgcHJlZmlsbC4gU2V0IGFzIDoke2FwcGVuZH1gKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy51cGRhdGVNZWFzdXJlbWVudHMoKTtcbiAgdGhpcy51cGRhdGVTY3JvbGxlcigpO1xuICB0aGlzLmlzUHJlZmlsbGluZyA9IHRydWU7XG4gIHRoaXMub24oICdhcHBlbmQnLCB0aGlzLnByZWZpbGwgKTtcbiAgdGhpcy5vbmNlKCAnZXJyb3InLCB0aGlzLnN0b3BQcmVmaWxsICk7XG4gIHRoaXMub25jZSggJ2xhc3QnLCB0aGlzLnN0b3BQcmVmaWxsICk7XG4gIHRoaXMucHJlZmlsbCgpO1xufTtcblxucHJvdG8ucHJlZmlsbCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgZGlzdGFuY2UgPSB0aGlzLmdldFByZWZpbGxEaXN0YW5jZSgpO1xuICB0aGlzLmlzUHJlZmlsbGluZyA9IGRpc3RhbmNlID49IDA7XG4gIGlmICggdGhpcy5pc1ByZWZpbGxpbmcgKSB7XG4gICAgdGhpcy5sb2coJ3ByZWZpbGwnKTtcbiAgICB0aGlzLmxvYWROZXh0UGFnZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RvcFByZWZpbGwoKTtcbiAgfVxufTtcblxucHJvdG8uZ2V0UHJlZmlsbERpc3RhbmNlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGVsZW1lbnQgc2Nyb2xsXG4gIGlmICggdGhpcy5vcHRpb25zLmVsZW1lbnRTY3JvbGwgKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsZXIuY2xpZW50SGVpZ2h0IC0gdGhpcy5zY3JvbGxlci5zY3JvbGxIZWlnaHQ7XG4gIH1cbiAgLy8gd2luZG93XG4gIHJldHVybiB0aGlzLndpbmRvd0hlaWdodCAtIHRoaXMuZWxlbWVudC5jbGllbnRIZWlnaHQ7XG59O1xuXG5wcm90by5zdG9wUHJlZmlsbCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmxvZygnc3RvcFByZWZpbGwnKTtcbiAgdGhpcy5vZmYoICdhcHBlbmQnLCB0aGlzLnByZWZpbGwgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5yZXR1cm4gSW5maW5pdGVTY3JvbGw7XG5cbn0gKSApO1xuIiwiLy8gc2Nyb2xsLXdhdGNoXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgcmVxdWlyZSgnLi9jb3JlJyksXG4gICAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgd2luZG93LkluZmluaXRlU2Nyb2xsLFxuICAgICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEluZmluaXRlU2Nyb2xsLCB1dGlscyApIHtcblxubGV0IHByb3RvID0gSW5maW5pdGVTY3JvbGwucHJvdG90eXBlO1xuXG4vLyBkZWZhdWx0IG9wdGlvbnNcbk9iamVjdC5hc3NpZ24oIEluZmluaXRlU2Nyb2xsLmRlZmF1bHRzLCB7XG4gIHNjcm9sbFRocmVzaG9sZDogNDAwLFxuICAvLyBlbGVtZW50U2Nyb2xsOiBudWxsLFxufSApO1xuXG5JbmZpbml0ZVNjcm9sbC5jcmVhdGUuc2Nyb2xsV2F0Y2ggPSBmdW5jdGlvbigpIHtcbiAgLy8gZXZlbnRzXG4gIHRoaXMucGFnZVNjcm9sbEhhbmRsZXIgPSB0aGlzLm9uUGFnZVNjcm9sbC5iaW5kKCB0aGlzICk7XG4gIHRoaXMucmVzaXplSGFuZGxlciA9IHRoaXMub25SZXNpemUuYmluZCggdGhpcyApO1xuXG4gIGxldCBzY3JvbGxUaHJlc2hvbGQgPSB0aGlzLm9wdGlvbnMuc2Nyb2xsVGhyZXNob2xkO1xuICBsZXQgaXNFbmFibGUgPSBzY3JvbGxUaHJlc2hvbGQgfHwgc2Nyb2xsVGhyZXNob2xkID09PSAwO1xuICBpZiAoIGlzRW5hYmxlICkgdGhpcy5lbmFibGVTY3JvbGxXYXRjaCgpO1xufTtcblxuSW5maW5pdGVTY3JvbGwuZGVzdHJveS5zY3JvbGxXYXRjaCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpc2FibGVTY3JvbGxXYXRjaCgpO1xufTtcblxucHJvdG8uZW5hYmxlU2Nyb2xsV2F0Y2ggPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzU2Nyb2xsV2F0Y2hpbmcgKSByZXR1cm47XG5cbiAgdGhpcy5pc1Njcm9sbFdhdGNoaW5nID0gdHJ1ZTtcbiAgdGhpcy51cGRhdGVNZWFzdXJlbWVudHMoKTtcbiAgdGhpcy51cGRhdGVTY3JvbGxlcigpO1xuICAvLyBUT0RPIGRpc2FibGUgYWZ0ZXIgZXJyb3I/XG4gIHRoaXMub24oICdsYXN0JywgdGhpcy5kaXNhYmxlU2Nyb2xsV2F0Y2ggKTtcbiAgdGhpcy5iaW5kU2Nyb2xsV2F0Y2hFdmVudHMoIHRydWUgKTtcbn07XG5cbnByb3RvLmRpc2FibGVTY3JvbGxXYXRjaCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzU2Nyb2xsV2F0Y2hpbmcgKSByZXR1cm47XG5cbiAgdGhpcy5iaW5kU2Nyb2xsV2F0Y2hFdmVudHMoIGZhbHNlICk7XG4gIGRlbGV0ZSB0aGlzLmlzU2Nyb2xsV2F0Y2hpbmc7XG59O1xuXG5wcm90by5iaW5kU2Nyb2xsV2F0Y2hFdmVudHMgPSBmdW5jdGlvbiggaXNCaW5kICkge1xuICBsZXQgYWRkUmVtb3ZlID0gaXNCaW5kID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuICB0aGlzLnNjcm9sbGVyWyBhZGRSZW1vdmUgXSggJ3Njcm9sbCcsIHRoaXMucGFnZVNjcm9sbEhhbmRsZXIgKTtcbiAgd2luZG93WyBhZGRSZW1vdmUgXSggJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlciApO1xufTtcblxucHJvdG8ub25QYWdlU2Nyb2xsID0gSW5maW5pdGVTY3JvbGwudGhyb3R0bGUoIGZ1bmN0aW9uKCkge1xuICBsZXQgZGlzdGFuY2UgPSB0aGlzLmdldEJvdHRvbURpc3RhbmNlKCk7XG4gIGlmICggZGlzdGFuY2UgPD0gdGhpcy5vcHRpb25zLnNjcm9sbFRocmVzaG9sZCApIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3Njcm9sbFRocmVzaG9sZCcpO1xuICB9XG59ICk7XG5cbnByb3RvLmdldEJvdHRvbURpc3RhbmNlID0gZnVuY3Rpb24oKSB7XG4gIGxldCBib3R0b20sIHNjcm9sbFk7XG4gIGlmICggdGhpcy5vcHRpb25zLmVsZW1lbnRTY3JvbGwgKSB7XG4gICAgYm90dG9tID0gdGhpcy5zY3JvbGxlci5zY3JvbGxIZWlnaHQ7XG4gICAgc2Nyb2xsWSA9IHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wICsgdGhpcy5zY3JvbGxlci5jbGllbnRIZWlnaHQ7XG4gIH0gZWxzZSB7XG4gICAgYm90dG9tID0gdGhpcy50b3AgKyB0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWSArIHRoaXMud2luZG93SGVpZ2h0O1xuICB9XG4gIHJldHVybiBib3R0b20gLSBzY3JvbGxZO1xufTtcblxucHJvdG8ub25SZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy51cGRhdGVNZWFzdXJlbWVudHMoKTtcbn07XG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kKCBJbmZpbml0ZVNjcm9sbCwgJ29uUmVzaXplJywgMTUwICk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5yZXR1cm4gSW5maW5pdGVTY3JvbGw7XG5cbn0gKSApO1xuIiwiLy8gc3RhdHVzXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgcmVxdWlyZSgnLi9jb3JlJyksXG4gICAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICAgIHdpbmRvdyxcbiAgICAgICAgd2luZG93LkluZmluaXRlU2Nyb2xsLFxuICAgICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEluZmluaXRlU2Nyb2xsLCB1dGlscyApIHtcblxubGV0IHByb3RvID0gSW5maW5pdGVTY3JvbGwucHJvdG90eXBlO1xuXG4vLyBJbmZpbml0ZVNjcm9sbC5kZWZhdWx0cy5zdGF0dXMgPSBudWxsO1xuXG5JbmZpbml0ZVNjcm9sbC5jcmVhdGUuc3RhdHVzID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzdGF0dXNFbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCB0aGlzLm9wdGlvbnMuc3RhdHVzICk7XG4gIGlmICggIXN0YXR1c0VsZW0gKSByZXR1cm47XG5cbiAgLy8gZWxlbWVudHNcbiAgdGhpcy5zdGF0dXNFbGVtZW50ID0gc3RhdHVzRWxlbTtcbiAgdGhpcy5zdGF0dXNFdmVudEVsZW1lbnRzID0ge1xuICAgIHJlcXVlc3Q6IHN0YXR1c0VsZW0ucXVlcnlTZWxlY3RvcignLmluZmluaXRlLXNjcm9sbC1yZXF1ZXN0JyksXG4gICAgZXJyb3I6IHN0YXR1c0VsZW0ucXVlcnlTZWxlY3RvcignLmluZmluaXRlLXNjcm9sbC1lcnJvcicpLFxuICAgIGxhc3Q6IHN0YXR1c0VsZW0ucXVlcnlTZWxlY3RvcignLmluZmluaXRlLXNjcm9sbC1sYXN0JyksXG4gIH07XG4gIC8vIGV2ZW50c1xuICB0aGlzLm9uKCAncmVxdWVzdCcsIHRoaXMuc2hvd1JlcXVlc3RTdGF0dXMgKTtcbiAgdGhpcy5vbiggJ2Vycm9yJywgdGhpcy5zaG93RXJyb3JTdGF0dXMgKTtcbiAgdGhpcy5vbiggJ2xhc3QnLCB0aGlzLnNob3dMYXN0U3RhdHVzICk7XG4gIHRoaXMuYmluZEhpZGVTdGF0dXMoJ29uJyk7XG59O1xuXG5wcm90by5iaW5kSGlkZVN0YXR1cyA9IGZ1bmN0aW9uKCBiaW5kTWV0aG9kICkge1xuICBsZXQgaGlkZUV2ZW50ID0gdGhpcy5vcHRpb25zLmFwcGVuZCA/ICdhcHBlbmQnIDogJ2xvYWQnO1xuICB0aGlzWyBiaW5kTWV0aG9kIF0oIGhpZGVFdmVudCwgdGhpcy5oaWRlQWxsU3RhdHVzICk7XG59O1xuXG5wcm90by5zaG93UmVxdWVzdFN0YXR1cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNob3dTdGF0dXMoJ3JlcXVlc3QnKTtcbn07XG5cbnByb3RvLnNob3dFcnJvclN0YXR1cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNob3dTdGF0dXMoJ2Vycm9yJyk7XG59O1xuXG5wcm90by5zaG93TGFzdFN0YXR1cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNob3dTdGF0dXMoJ2xhc3QnKTtcbiAgLy8gcHJldmVudCBsYXN0IHRoZW4gYXBwZW5kIGV2ZW50IHJhY2UgY29uZGl0aW9uIGZyb20gc2hvd2luZyBsYXN0IHN0YXR1cyAjNzA2XG4gIHRoaXMuYmluZEhpZGVTdGF0dXMoJ29mZicpO1xufTtcblxucHJvdG8uc2hvd1N0YXR1cyA9IGZ1bmN0aW9uKCBldmVudE5hbWUgKSB7XG4gIHNob3coIHRoaXMuc3RhdHVzRWxlbWVudCApO1xuICB0aGlzLmhpZGVTdGF0dXNFdmVudEVsZW1lbnRzKCk7XG4gIGxldCBldmVudEVsZW0gPSB0aGlzLnN0YXR1c0V2ZW50RWxlbWVudHNbIGV2ZW50TmFtZSBdO1xuICBzaG93KCBldmVudEVsZW0gKTtcbn07XG5cbnByb3RvLmhpZGVBbGxTdGF0dXMgPSBmdW5jdGlvbigpIHtcbiAgaGlkZSggdGhpcy5zdGF0dXNFbGVtZW50ICk7XG4gIHRoaXMuaGlkZVN0YXR1c0V2ZW50RWxlbWVudHMoKTtcbn07XG5cbnByb3RvLmhpZGVTdGF0dXNFdmVudEVsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIGZvciAoIGxldCB0eXBlIGluIHRoaXMuc3RhdHVzRXZlbnRFbGVtZW50cyApIHtcbiAgICBsZXQgZXZlbnRFbGVtID0gdGhpcy5zdGF0dXNFdmVudEVsZW1lbnRzWyB0eXBlIF07XG4gICAgaGlkZSggZXZlbnRFbGVtICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBoaWRlKCBlbGVtICkge1xuICBzZXREaXNwbGF5KCBlbGVtLCAnbm9uZScgKTtcbn1cblxuZnVuY3Rpb24gc2hvdyggZWxlbSApIHtcbiAgc2V0RGlzcGxheSggZWxlbSwgJ2Jsb2NrJyApO1xufVxuXG5mdW5jdGlvbiBzZXREaXNwbGF5KCBlbGVtLCB2YWx1ZSApIHtcbiAgaWYgKCBlbGVtICkge1xuICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IHZhbHVlO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5yZXR1cm4gSW5maW5pdGVTY3JvbGw7XG5cbn0gKSApO1xuIiwiaW1wb3J0IEluZmluaXRlU2Nyb2xsIGZyb20gJ2luZmluaXRlLXNjcm9sbCdcclxuXHJcbihmdW5jdGlvbiAoZG9jdW1lbnQpIHtcclxuICAvLyBOZXh0IGxpbmsgRWxlbWVudFxyXG4gIGNvbnN0IG5leHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9bmV4dF0nKVxyXG4gIGlmICghbmV4dEVsZW1lbnQpIHJldHVyblxyXG5cclxuICAvLyBQb3N0IEZlZWQgZWxlbWVudFxyXG4gIGNvbnN0ICRmZWVkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1mZWVkLWVudHJ5JylcclxuICBpZiAoISRmZWVkRWxlbWVudCkgcmV0dXJuXHJcblxyXG4gIGNvbnN0ICR2aWV3TW9yZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkLW1vcmUtYnRuJylcclxuICAvLyBjb25zdCAkaWNvbkxvYWRlciA9ICR2aWV3TW9yZUJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcuaWNvbicpXHJcbiAgLy8gY29uc3QgJGxhYmVsID0gJHZpZXdNb3JlQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5sYWJlbCcpXHJcblxyXG4gIGNvbnN0IGluZlNjcm9sbCA9IG5ldyBJbmZpbml0ZVNjcm9sbCgkZmVlZEVsZW1lbnQsIHtcclxuICAgIGFwcGVuZDogJy5qcy1zdG9yeScsXHJcbiAgICBidXR0b246ICR2aWV3TW9yZUJ1dHRvbixcclxuICAgIGhpc3Rvcnk6IGZhbHNlLFxyXG4gICAgZGVidWc6IGZhbHNlLFxyXG4gICAgaGlkZU5hdjogJy5wYWdpbmF0aW9uJyxcclxuICAgIHBhdGg6ICcucGFnaW5hdGlvbiAub2xkZXItcG9zdHMnXHJcbiAgfSlcclxuXHJcbiAgaW5mU2Nyb2xsLm9uKCdsb2FkJywgb25QYWdlTG9hZClcclxuXHJcbiAgZnVuY3Rpb24gb25QYWdlTG9hZCAoKSB7XHJcbiAgICBpZiAoaW5mU2Nyb2xsLmxvYWRDb3VudCA9PT0gMSkge1xyXG4gICAgICAvLyBhZnRlciAzbmQgcGFnZSBsb2FkZWRcclxuICAgICAgLy8gZGlzYWJsZSBsb2FkaW5nIG9uIHNjcm9sbFxyXG4gICAgICBpbmZTY3JvbGwub3B0aW9ucy5sb2FkT25TY3JvbGwgPSBmYWxzZVxyXG4gICAgICAvLyBzaG93IGJ1dHRvblxyXG4gICAgICAkdmlld01vcmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmxleCcpXHJcbiAgICAgICR2aWV3TW9yZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAvLyByZW1vdmUgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgaW5mU2Nyb2xsLm9mZihvblBhZ2VMb2FkKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaW5mU2Nyb2xsLm9uKCdyZXF1ZXN0JywgZnVuY3Rpb24gKCkge1xyXG4gIC8vICAgJGxhYmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXHJcbiAgLy8gICAkaWNvbkxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gIC8vIH0pXHJcblxyXG4gIC8vIGluZlNjcm9sbC5vbignYXBwZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gIC8vICAgJGxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgLy8gICAkaWNvbkxvYWRlci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxyXG4gIC8vIH0pXHJcblxyXG4gICR2aWV3TW9yZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGxvYWQgbmV4dCBwYWdlXHJcbiAgICBpbmZTY3JvbGwubG9hZE5leHRQYWdlKClcclxuICAgIC8vIGVuYWJsZSBsb2FkaW5nIG9uIHNjcm9sbFxyXG4gICAgaW5mU2Nyb2xsLm9wdGlvbnMubG9hZE9uU2Nyb2xsID0gdHJ1ZVxyXG4gICAgLy8gaGlkZSBwYWdlXHJcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXHJcbiAgfSlcclxufSkoZG9jdW1lbnQpXHJcbiJdfQ==

//# sourceMappingURL=map/pagination.js.map
