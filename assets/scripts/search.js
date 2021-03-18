(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fuzzysort = _interopRequireDefault(require("fuzzysort"));

/* global fetch */

/**
 * Thanks => https://github.com/HauntedThemes/ghost-search
 */
// const fuzzysort = require('fuzzysort')
var GhostSearch = /*#__PURE__*/function () {
  function GhostSearch(args) {
    (0, _classCallCheck2.default)(this, GhostSearch);
    this.check = false;
    var defaults = {
      url: window.location.origin,
      key: '',
      version: 'v4',
      input: '#search-field',
      results: '#search-results',
      defaultValue: '',
      template: function template(result) {
        return "<a href=\"/".concat(result.slug, "/\" class=\"block py-2 pr-3 pl-10\"><svg class=\"icon icon--search\" style=\"margin-left:-28px\"><use xlink:href=\"#icon-search\"></use></svg> ").concat(result.title, "</a>");
      },
      options: {
        keys: ['title'],
        limit: 10,
        threshold: -3500,
        allowTypo: false
      },
      api: {
        resource: 'posts',
        parameters: {
          limit: 'all',
          fields: ['title', 'slug'],
          filter: '',
          include: '',
          order: '',
          formats: '',
          page: ''
        }
      },
      on: {
        beforeDisplay: function beforeDisplay() {},
        afterDisplay: function afterDisplay(results) {},
        beforeFetch: function beforeFetch() {
          return document.body.classList.add('is-loading');
        },
        afterFetch: function afterFetch() {
          return setTimeout(function () {
            document.body.classList.remove('is-loading');
          }, 4000);
        }
      }
    };
    var merged = this.mergeDeep(defaults, args);
    Object.assign(this, merged);
    this.init();
  }

  (0, _createClass2.default)(GhostSearch, [{
    key: "mergeDeep",
    value: function mergeDeep(target, source) {
      var _this = this;

      if (target && (0, _typeof2.default)(target) === 'object' && !Array.isArray(target) && target !== null && source && (0, _typeof2.default)(source) === 'object' && !Array.isArray(source) && source !== null) {
        Object.keys(source).forEach(function (key) {
          if (source[key] && (0, _typeof2.default)(source[key]) === 'object' && !Array.isArray(source[key]) && source[key] !== null) {
            if (!target[key]) Object.assign(target, (0, _defineProperty2.default)({}, key, {}));

            _this.mergeDeep(target[key], source[key]);
          } else {
            Object.assign(target, (0, _defineProperty2.default)({}, key, source[key]));
          }
        });
      }

      return target;
    }
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
      var _this2 = this;

      this.on.beforeFetch(); // const ghostAPI = new GhostContentAPI({
      //   url: this.url,
      //   key: this.key,
      //   version: this.version
      // })

      var browse = {};
      var parameters = this.api.parameters;

      for (var key in parameters) {
        if (parameters[key] !== '') {
          browse[key] = parameters[key];
        }
      }

      var encoded = Object.entries(browse).map(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return "".concat(k, "=").concat(encodeURIComponent(v));
      }).join('&');
      var apiUrl = "".concat(this.url, "/ghost/api/").concat(this.version, "/content/").concat(this.api.resource, "/?key=").concat(this.key, "&").concat(encoded);

      var getApi = /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url) {
          var response, data;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fetch(url);

                case 2:
                  response = _context.sent;
                  _context.next = 5;
                  return response.json();

                case 5:
                  data = _context.sent;
                  return _context.abrupt("return", data);

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function getApi(_x) {
          return _ref3.apply(this, arguments);
        };
      }();

      getApi(apiUrl).then(function (data) {
        return _this2.search(data[_this2.api.resource]);
      }).catch(function (err) {
        return console.error(err);
      }); // ghostAPI[this.api.resource]
      //   .browse(browse)
      //   .then((data) => {
      //     console.log(data)
      //     this.search(data)
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })
    })
  }, {
    key: "createElementFromHTML",
    value: function createElementFromHTML(htmlString) {
      var div = document.createElement('div');
      div.innerHTML = htmlString.trim();
      return div.firstChild;
    }
  }, {
    key: "displayResults",
    value: function displayResults(data) {
      if (document.querySelectorAll(this.results)[0].firstChild !== null && document.querySelectorAll(this.results)[0].firstChild !== '') {
        while (document.querySelectorAll(this.results)[0].firstChild) {
          document.querySelectorAll(this.results)[0].removeChild(document.querySelectorAll(this.results)[0].firstChild);
        }
      }

      var inputValue = document.querySelectorAll(this.input)[0].value;

      if (this.defaultValue !== '') {
        inputValue = this.defaultValue;
      }

      var results = _fuzzysort.default.go(inputValue, data, {
        keys: this.options.keys,
        limit: this.options.limit,
        allowTypo: this.options.allowTypo,
        threshold: this.options.threshold
      });

      for (var key in results) {
        if (key < results.length) {
          document.querySelectorAll(this.results)[0].appendChild(this.createElementFromHTML(this.template(results[key].obj)));
        }
      }

      this.on.afterDisplay(results);
      this.defaultValue = '';
    }
  }, {
    key: "search",
    value: function search(data) {
      var _this3 = this;

      this.on.afterFetch(data);
      this.check = true;

      if (this.defaultValue !== '') {
        this.on.beforeDisplay();
        this.displayResults(data);
      }

      document.querySelectorAll(this.input)[0].addEventListener('keyup', function () {
        _this3.on.beforeDisplay();

        _this3.displayResults(data);
      });
    }
  }, {
    key: "checkArgs",
    value: function checkArgs() {
      if (!document.querySelectorAll(this.input).length) {
        console.log('Input not found.');
        return false;
      }

      if (!document.querySelectorAll(this.results).length) {
        console.log('Results not found.');
        return false;
      }

      if (this.url === '') {
        console.log('Content API Client Library host missing. Please set the host. Must not end in a trailing slash.');
        return false;
      }

      if (this.key === '') {
        console.log('Content API Client Library key missing. Please set the key. Hex string copied from the "Integrations" screen in Ghost Admin.');
        return false;
      }

      return true;
    }
  }, {
    key: "validate",
    value: function validate() {
      if (!this.checkArgs()) {
        return false;
      }

      return true;
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;

      if (!this.validate()) {
        return;
      }

      if (this.defaultValue !== '') {
        document.querySelectorAll(this.input)[0].value = this.defaultValue;

        window.onload = function () {
          if (!_this4.check) {
            _this4.fetch();
          }
        };
      }

      document.querySelectorAll(this.input)[0].addEventListener('focus', function () {
        if (!_this4.check) {
          _this4.fetch();
        }
      });
    }
  }]);
  return GhostSearch;
}();
/* Export Class */


module.exports = GhostSearch;

},{"@babel/runtime/helpers/asyncToGenerator":5,"@babel/runtime/helpers/classCallCheck":6,"@babel/runtime/helpers/createClass":7,"@babel/runtime/helpers/defineProperty":8,"@babel/runtime/helpers/interopRequireDefault":9,"@babel/runtime/helpers/slicedToArray":12,"@babel/runtime/helpers/typeof":13,"@babel/runtime/regenerator":15,"fuzzysort":16}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ghostSearch = _interopRequireDefault(require("./lib/ghost-search"));

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

  document.querySelector('a[data-target=modal-search]').classList.remove('hidden'); // Variable for search
  // -----------------------------------------------------------------------------

  var afterDisplaySearch = function afterDisplaySearch(results) {
    // Active class to link search
    searchResultActive();
    allSearchLinksLength = results.length;
    searchResultsHeight = {
      outer: $results.offsetHeight,
      scroll: $results.scrollHeight
    };

    if (results.total === 0 && $input.value !== '') {
      $searchMessage.classList.remove('hidden');
      $body.removeEventListener('keydown', mySearchKey);
    } else {
      $searchMessage.classList.add('hidden');
      $body.addEventListener('keydown', mySearchKey);
    }
  };

  var mySearchSettings = {
    on: {
      afterDisplay: function afterDisplay(results) {
        return afterDisplaySearch(results);
      }
    }
  }; // join user settings

  Object.assign(mySearchSettings, searchSettings); // when the Enter key is pressed
  // -----------------------------------------------------------------------------

  function enterKey() {
    var link = $results.querySelector("a.".concat(classIsActive));
    link && link.click();
  } // Attending the active class to the search link
  // -----------------------------------------------------------------------------


  function searchResultActive(index, upDown) {
    index = index || 0;
    upDown = upDown || 'up';
    var allSearchLinks = $results.querySelectorAll('a'); // Return if there are no results

    if (!allSearchLinks.length) return; // Remove All class Active

    allSearchLinks.forEach(function (element) {
      return element.classList.remove(classIsActive);
    }); // Add class active

    allSearchLinks[index].classList.add(classIsActive); // Scroll for results box

    var linkOffSetTop = allSearchLinks[index].offsetTop;
    var scrollPosition = 0;
    upDown === 'down' && linkOffSetTop > searchResultsHeight.outer / 2 ? scrollPosition = linkOffSetTop - searchResultsHeight.outer / 2 : upDown === 'up' && (scrollPosition = linkOffSetTop < searchResultsHeight.scroll - searchResultsHeight.outer / 2 ? linkOffSetTop - searchResultsHeight.outer / 2 : searchResultsHeight.scroll);
    $results.scrollTo(0, scrollPosition);
  } // Reacted to the up or down keys
  // -----------------------------------------------------------------------------


  function arrowKeyUpDown(keyNumber) {
    var upDown;
    var indexTheLink = 0;
    var resultActive = $results.querySelector('.is-active');

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
  } // Adding functions to the keys
  // -----------------------------------------------------------------------------


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
  } // Search
  // -----------------------------------------------------------------------------

  /* eslint-disable no-new */


  new _ghostSearch.default(mySearchSettings);
})(document);

},{"./lib/ghost-search":1,"@babel/runtime/helpers/interopRequireDefault":9}],3:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],4:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],5:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],6:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],7:[function(require,module,exports){
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
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],8:[function(require,module,exports){
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],9:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],10:[function(require,module,exports){
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
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],11:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],12:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles.js");

var iterableToArrayLimit = require("./iterableToArrayLimit.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableRest = require("./nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./arrayWithHoles.js":4,"./iterableToArrayLimit.js":10,"./nonIterableRest.js":11,"./unsupportedIterableToArray.js":14}],13:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],14:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./arrayLikeToArray.js":3}],15:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":18}],16:[function(require,module,exports){
(function (setImmediate){(function (){
/*
WHAT: SublimeText-like Fuzzy Search

USAGE:
  fuzzysort.single('fs', 'Fuzzy Search') // {score: -16}
  fuzzysort.single('test', 'test') // {score: 0}
  fuzzysort.single('doesnt exist', 'target') // null

  fuzzysort.go('mr', ['Monitor.cpp', 'MeshRenderer.cpp'])
  // [{score: -18, target: "MeshRenderer.cpp"}, {score: -6009, target: "Monitor.cpp"}]

  fuzzysort.highlight(fuzzysort.single('fs', 'Fuzzy Search'), '<b>', '</b>')
  // <b>F</b>uzzy <b>S</b>earch
*/

// UMD (Universal Module Definition) for fuzzysort
;(function(root, UMD) {
  if(typeof define === 'function' && define.amd) define([], UMD)
  else if(typeof module === 'object' && module.exports) module.exports = UMD()
  else root.fuzzysort = UMD()
})(this, function UMD() { function fuzzysortNew(instanceOptions) {

  var fuzzysort = {

    single: function(search, target, options) {
      if(!search) return null
      if(!isObj(search)) search = fuzzysort.getPreparedSearch(search)

      if(!target) return null
      if(!isObj(target)) target = fuzzysort.getPrepared(target)

      var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
        : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
        : true
      var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo
      return algorithm(search, target, search[0])
      // var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991
      // var result = algorithm(search, target, search[0])
      // if(result === null) return null
      // if(result.score < threshold) return null
      // return result
    },

    go: function(search, targets, options) {
      if(!search) return noResults
      search = fuzzysort.prepareSearch(search)
      var searchLowerCode = search[0]

      var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991
      var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991
      var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
        : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
        : true
      var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo
      var resultsLen = 0; var limitedCount = 0
      var targetsLen = targets.length

      // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

      // options.keys
      if(options && options.keys) {
        var scoreFn = options.scoreFn || defaultScoreFn
        var keys = options.keys
        var keysLen = keys.length
        for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i]
          var objResults = new Array(keysLen)
          for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
            var key = keys[keyI]
            var target = getValue(obj, key)
            if(!target) { objResults[keyI] = null; continue }
            if(!isObj(target)) target = fuzzysort.getPrepared(target)

            objResults[keyI] = algorithm(search, target, searchLowerCode)
          }
          objResults.obj = obj // before scoreFn so scoreFn can use it
          var score = scoreFn(objResults)
          if(score === null) continue
          if(score < threshold) continue
          objResults.score = score
          if(resultsLen < limit) { q.add(objResults); ++resultsLen }
          else {
            ++limitedCount
            if(score > q.peek().score) q.replaceTop(objResults)
          }
        }

      // options.key
      } else if(options && options.key) {
        var key = options.key
        for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i]
          var target = getValue(obj, key)
          if(!target) continue
          if(!isObj(target)) target = fuzzysort.getPrepared(target)

          var result = algorithm(search, target, searchLowerCode)
          if(result === null) continue
          if(result.score < threshold) continue

          // have to clone result so duplicate targets from different obj can each reference the correct obj
          result = {target:result.target, _targetLowerCodes:null, _nextBeginningIndexes:null, score:result.score, indexes:result.indexes, obj:obj} // hidden

          if(resultsLen < limit) { q.add(result); ++resultsLen }
          else {
            ++limitedCount
            if(result.score > q.peek().score) q.replaceTop(result)
          }
        }

      // no keys
      } else {
        for(var i = targetsLen - 1; i >= 0; --i) { var target = targets[i]
          if(!target) continue
          if(!isObj(target)) target = fuzzysort.getPrepared(target)

          var result = algorithm(search, target, searchLowerCode)
          if(result === null) continue
          if(result.score < threshold) continue
          if(resultsLen < limit) { q.add(result); ++resultsLen }
          else {
            ++limitedCount
            if(result.score > q.peek().score) q.replaceTop(result)
          }
        }
      }

      if(resultsLen === 0) return noResults
      var results = new Array(resultsLen)
      for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll()
      results.total = resultsLen + limitedCount
      return results
    },

    goAsync: function(search, targets, options) {
      var canceled = false
      var p = new Promise(function(resolve, reject) {
        if(!search) return resolve(noResults)
        search = fuzzysort.prepareSearch(search)
        var searchLowerCode = search[0]

        var q = fastpriorityqueue()
        var iCurrent = targets.length - 1
        var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991
        var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991
        var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
          : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
          : true
        var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo
        var resultsLen = 0; var limitedCount = 0
        function step() {
          if(canceled) return reject('canceled')

          var startMs = Date.now()

          // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

          // options.keys
          if(options && options.keys) {
            var scoreFn = options.scoreFn || defaultScoreFn
            var keys = options.keys
            var keysLen = keys.length
            for(; iCurrent >= 0; --iCurrent) { var obj = targets[iCurrent]
              var objResults = new Array(keysLen)
              for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
                var key = keys[keyI]
                var target = getValue(obj, key)
                if(!target) { objResults[keyI] = null; continue }
                if(!isObj(target)) target = fuzzysort.getPrepared(target)

                objResults[keyI] = algorithm(search, target, searchLowerCode)
              }
              objResults.obj = obj // before scoreFn so scoreFn can use it
              var score = scoreFn(objResults)
              if(score === null) continue
              if(score < threshold) continue
              objResults.score = score
              if(resultsLen < limit) { q.add(objResults); ++resultsLen }
              else {
                ++limitedCount
                if(score > q.peek().score) q.replaceTop(objResults)
              }

              if(iCurrent%1000/*itemsPerCheck*/ === 0) {
                if(Date.now() - startMs >= 10/*asyncInterval*/) {
                  isNode?setImmediate(step):setTimeout(step)
                  return
                }
              }
            }

          // options.key
          } else if(options && options.key) {
            var key = options.key
            for(; iCurrent >= 0; --iCurrent) { var obj = targets[iCurrent]
              var target = getValue(obj, key)
              if(!target) continue
              if(!isObj(target)) target = fuzzysort.getPrepared(target)

              var result = algorithm(search, target, searchLowerCode)
              if(result === null) continue
              if(result.score < threshold) continue

              // have to clone result so duplicate targets from different obj can each reference the correct obj
              result = {target:result.target, _targetLowerCodes:null, _nextBeginningIndexes:null, score:result.score, indexes:result.indexes, obj:obj} // hidden

              if(resultsLen < limit) { q.add(result); ++resultsLen }
              else {
                ++limitedCount
                if(result.score > q.peek().score) q.replaceTop(result)
              }

              if(iCurrent%1000/*itemsPerCheck*/ === 0) {
                if(Date.now() - startMs >= 10/*asyncInterval*/) {
                  isNode?setImmediate(step):setTimeout(step)
                  return
                }
              }
            }

          // no keys
          } else {
            for(; iCurrent >= 0; --iCurrent) { var target = targets[iCurrent]
              if(!target) continue
              if(!isObj(target)) target = fuzzysort.getPrepared(target)

              var result = algorithm(search, target, searchLowerCode)
              if(result === null) continue
              if(result.score < threshold) continue
              if(resultsLen < limit) { q.add(result); ++resultsLen }
              else {
                ++limitedCount
                if(result.score > q.peek().score) q.replaceTop(result)
              }

              if(iCurrent%1000/*itemsPerCheck*/ === 0) {
                if(Date.now() - startMs >= 10/*asyncInterval*/) {
                  isNode?setImmediate(step):setTimeout(step)
                  return
                }
              }
            }
          }

          if(resultsLen === 0) return resolve(noResults)
          var results = new Array(resultsLen)
          for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll()
          results.total = resultsLen + limitedCount
          resolve(results)
        }

        isNode?setImmediate(step):step()
      })
      p.cancel = function() { canceled = true }
      return p
    },

    highlight: function(result, hOpen, hClose) {
      if(result === null) return null
      if(hOpen === undefined) hOpen = '<b>'
      if(hClose === undefined) hClose = '</b>'
      var highlighted = ''
      var matchesIndex = 0
      var opened = false
      var target = result.target
      var targetLen = target.length
      var matchesBest = result.indexes
      for(var i = 0; i < targetLen; ++i) { var char = target[i]
        if(matchesBest[matchesIndex] === i) {
          ++matchesIndex
          if(!opened) { opened = true
            highlighted += hOpen
          }

          if(matchesIndex === matchesBest.length) {
            highlighted += char + hClose + target.substr(i+1)
            break
          }
        } else {
          if(opened) { opened = false
            highlighted += hClose
          }
        }
        highlighted += char
      }

      return highlighted
    },

    prepare: function(target) {
      if(!target) return
      return {target:target, _targetLowerCodes:fuzzysort.prepareLowerCodes(target), _nextBeginningIndexes:null, score:null, indexes:null, obj:null} // hidden
    },
    prepareSlow: function(target) {
      if(!target) return
      return {target:target, _targetLowerCodes:fuzzysort.prepareLowerCodes(target), _nextBeginningIndexes:fuzzysort.prepareNextBeginningIndexes(target), score:null, indexes:null, obj:null} // hidden
    },
    prepareSearch: function(search) {
      if(!search) return
      return fuzzysort.prepareLowerCodes(search)
    },



    // Below this point is only internal code
    // Below this point is only internal code
    // Below this point is only internal code
    // Below this point is only internal code



    getPrepared: function(target) {
      if(target.length > 999) return fuzzysort.prepare(target) // don't cache huge targets
      var targetPrepared = preparedCache.get(target)
      if(targetPrepared !== undefined) return targetPrepared
      targetPrepared = fuzzysort.prepare(target)
      preparedCache.set(target, targetPrepared)
      return targetPrepared
    },
    getPreparedSearch: function(search) {
      if(search.length > 999) return fuzzysort.prepareSearch(search) // don't cache huge searches
      var searchPrepared = preparedSearchCache.get(search)
      if(searchPrepared !== undefined) return searchPrepared
      searchPrepared = fuzzysort.prepareSearch(search)
      preparedSearchCache.set(search, searchPrepared)
      return searchPrepared
    },

    algorithm: function(searchLowerCodes, prepared, searchLowerCode) {
      var targetLowerCodes = prepared._targetLowerCodes
      var searchLen = searchLowerCodes.length
      var targetLen = targetLowerCodes.length
      var searchI = 0 // where we at
      var targetI = 0 // where you at
      var typoSimpleI = 0
      var matchesSimpleLen = 0

      // very basic fuzzy match; to remove non-matching targets ASAP!
      // walk through target. find sequential matches.
      // if all chars aren't found then exit
      for(;;) {
        var isMatch = searchLowerCode === targetLowerCodes[targetI]
        if(isMatch) {
          matchesSimple[matchesSimpleLen++] = targetI
          ++searchI; if(searchI === searchLen) break
          searchLowerCode = searchLowerCodes[typoSimpleI===0?searchI : (typoSimpleI===searchI?searchI+1 : (typoSimpleI===searchI-1?searchI-1 : searchI))]
        }

        ++targetI; if(targetI >= targetLen) { // Failed to find searchI
          // Check for typo or exit
          // we go as far as possible before trying to transpose
          // then we transpose backwards until we reach the beginning
          for(;;) {
            if(searchI <= 1) return null // not allowed to transpose first char
            if(typoSimpleI === 0) { // we haven't tried to transpose yet
              --searchI
              var searchLowerCodeNew = searchLowerCodes[searchI]
              if(searchLowerCode === searchLowerCodeNew) continue // doesn't make sense to transpose a repeat char
              typoSimpleI = searchI
            } else {
              if(typoSimpleI === 1) return null // reached the end of the line for transposing
              --typoSimpleI
              searchI = typoSimpleI
              searchLowerCode = searchLowerCodes[searchI + 1]
              var searchLowerCodeNew = searchLowerCodes[searchI]
              if(searchLowerCode === searchLowerCodeNew) continue // doesn't make sense to transpose a repeat char
            }
            matchesSimpleLen = searchI
            targetI = matchesSimple[matchesSimpleLen - 1] + 1
            break
          }
        }
      }

      var searchI = 0
      var typoStrictI = 0
      var successStrict = false
      var matchesStrictLen = 0

      var nextBeginningIndexes = prepared._nextBeginningIndexes
      if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target)
      var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1]

      // Our target string successfully matched all characters in sequence!
      // Let's try a more advanced and strict test to improve the score
      // only count it as a match if it's consecutive or a beginning character!
      if(targetI !== targetLen) for(;;) {
        if(targetI >= targetLen) {
          // We failed to find a good spot for this search char, go back to the previous search char and force it forward
          if(searchI <= 0) { // We failed to push chars forward for a better match
            // transpose, starting from the beginning
            ++typoStrictI; if(typoStrictI > searchLen-2) break
            if(searchLowerCodes[typoStrictI] === searchLowerCodes[typoStrictI+1]) continue // doesn't make sense to transpose a repeat char
            targetI = firstPossibleI
            continue
          }

          --searchI
          var lastMatch = matchesStrict[--matchesStrictLen]
          targetI = nextBeginningIndexes[lastMatch]

        } else {
          var isMatch = searchLowerCodes[typoStrictI===0?searchI : (typoStrictI===searchI?searchI+1 : (typoStrictI===searchI-1?searchI-1 : searchI))] === targetLowerCodes[targetI]
          if(isMatch) {
            matchesStrict[matchesStrictLen++] = targetI
            ++searchI; if(searchI === searchLen) { successStrict = true; break }
            ++targetI
          } else {
            targetI = nextBeginningIndexes[targetI]
          }
        }
      }

      { // tally up the score & keep track of matches for highlighting later
        if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen }
        else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen }
        var score = 0
        var lastTargetI = -1
        for(var i = 0; i < searchLen; ++i) { var targetI = matchesBest[i]
          // score only goes down if they're not consecutive
          if(lastTargetI !== targetI - 1) score -= targetI
          lastTargetI = targetI
        }
        if(!successStrict) {
          score *= 1000
          if(typoSimpleI !== 0) score += -20/*typoPenalty*/
        } else {
          if(typoStrictI !== 0) score += -20/*typoPenalty*/
        }
        score -= targetLen - searchLen
        prepared.score = score
        prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i]

        return prepared
      }
    },

    algorithmNoTypo: function(searchLowerCodes, prepared, searchLowerCode) {
      var targetLowerCodes = prepared._targetLowerCodes
      var searchLen = searchLowerCodes.length
      var targetLen = targetLowerCodes.length
      var searchI = 0 // where we at
      var targetI = 0 // where you at
      var matchesSimpleLen = 0

      // very basic fuzzy match; to remove non-matching targets ASAP!
      // walk through target. find sequential matches.
      // if all chars aren't found then exit
      for(;;) {
        var isMatch = searchLowerCode === targetLowerCodes[targetI]
        if(isMatch) {
          matchesSimple[matchesSimpleLen++] = targetI
          ++searchI; if(searchI === searchLen) break
          searchLowerCode = searchLowerCodes[searchI]
        }
        ++targetI; if(targetI >= targetLen) return null // Failed to find searchI
      }

      var searchI = 0
      var successStrict = false
      var matchesStrictLen = 0

      var nextBeginningIndexes = prepared._nextBeginningIndexes
      if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target)
      var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1]

      // Our target string successfully matched all characters in sequence!
      // Let's try a more advanced and strict test to improve the score
      // only count it as a match if it's consecutive or a beginning character!
      if(targetI !== targetLen) for(;;) {
        if(targetI >= targetLen) {
          // We failed to find a good spot for this search char, go back to the previous search char and force it forward
          if(searchI <= 0) break // We failed to push chars forward for a better match

          --searchI
          var lastMatch = matchesStrict[--matchesStrictLen]
          targetI = nextBeginningIndexes[lastMatch]

        } else {
          var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI]
          if(isMatch) {
            matchesStrict[matchesStrictLen++] = targetI
            ++searchI; if(searchI === searchLen) { successStrict = true; break }
            ++targetI
          } else {
            targetI = nextBeginningIndexes[targetI]
          }
        }
      }

      { // tally up the score & keep track of matches for highlighting later
        if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen }
        else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen }
        var score = 0
        var lastTargetI = -1
        for(var i = 0; i < searchLen; ++i) { var targetI = matchesBest[i]
          // score only goes down if they're not consecutive
          if(lastTargetI !== targetI - 1) score -= targetI
          lastTargetI = targetI
        }
        if(!successStrict) score *= 1000
        score -= targetLen - searchLen
        prepared.score = score
        prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i]

        return prepared
      }
    },

    prepareLowerCodes: function(str) {
      var strLen = str.length
      var lowerCodes = [] // new Array(strLen)    sparse array is too slow
      var lower = str.toLowerCase()
      for(var i = 0; i < strLen; ++i) lowerCodes[i] = lower.charCodeAt(i)
      return lowerCodes
    },
    prepareBeginningIndexes: function(target) {
      var targetLen = target.length
      var beginningIndexes = []; var beginningIndexesLen = 0
      var wasUpper = false
      var wasAlphanum = false
      for(var i = 0; i < targetLen; ++i) {
        var targetCode = target.charCodeAt(i)
        var isUpper = targetCode>=65&&targetCode<=90
        var isAlphanum = isUpper || targetCode>=97&&targetCode<=122 || targetCode>=48&&targetCode<=57
        var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum
        wasUpper = isUpper
        wasAlphanum = isAlphanum
        if(isBeginning) beginningIndexes[beginningIndexesLen++] = i
      }
      return beginningIndexes
    },
    prepareNextBeginningIndexes: function(target) {
      var targetLen = target.length
      var beginningIndexes = fuzzysort.prepareBeginningIndexes(target)
      var nextBeginningIndexes = [] // new Array(targetLen)     sparse array is too slow
      var lastIsBeginning = beginningIndexes[0]
      var lastIsBeginningI = 0
      for(var i = 0; i < targetLen; ++i) {
        if(lastIsBeginning > i) {
          nextBeginningIndexes[i] = lastIsBeginning
        } else {
          lastIsBeginning = beginningIndexes[++lastIsBeginningI]
          nextBeginningIndexes[i] = lastIsBeginning===undefined ? targetLen : lastIsBeginning
        }
      }
      return nextBeginningIndexes
    },

    cleanup: cleanup,
    new: fuzzysortNew,
  }
  return fuzzysort
} // fuzzysortNew

// This stuff is outside fuzzysortNew, because it's shared with instances of fuzzysort.new()
var isNode = typeof require !== 'undefined' && typeof window === 'undefined'
// var MAX_INT = Number.MAX_SAFE_INTEGER
// var MIN_INT = Number.MIN_VALUE
var preparedCache = new Map()
var preparedSearchCache = new Map()
var noResults = []; noResults.total = 0
var matchesSimple = []; var matchesStrict = []
function cleanup() { preparedCache.clear(); preparedSearchCache.clear(); matchesSimple = []; matchesStrict = [] }
function defaultScoreFn(a) {
  var max = -9007199254740991
  for (var i = a.length - 1; i >= 0; --i) {
    var result = a[i]; if(result === null) continue
    var score = result.score
    if(score > max) max = score
  }
  if(max === -9007199254740991) return null
  return max
}

// prop = 'key'              2.5ms optimized for this case, seems to be about as fast as direct obj[prop]
// prop = 'key1.key2'        10ms
// prop = ['key1', 'key2']   27ms
function getValue(obj, prop) {
  var tmp = obj[prop]; if(tmp !== undefined) return tmp
  var segs = prop
  if(!Array.isArray(prop)) segs = prop.split('.')
  var len = segs.length
  var i = -1
  while (obj && (++i < len)) obj = obj[segs[i]]
  return obj
}

function isObj(x) { return typeof x === 'object' } // faster as a function

// Hacked version of https://github.com/lemire/FastPriorityQueue.js
var fastpriorityqueue=function(){var r=[],o=0,e={};function n(){for(var e=0,n=r[e],c=1;c<o;){var f=c+1;e=c,f<o&&r[f].score<r[c].score&&(e=f),r[e-1>>1]=r[e],c=1+(e<<1)}for(var a=e-1>>1;e>0&&n.score<r[a].score;a=(e=a)-1>>1)r[e]=r[a];r[e]=n}return e.add=function(e){var n=o;r[o++]=e;for(var c=n-1>>1;n>0&&e.score<r[c].score;c=(n=c)-1>>1)r[n]=r[c];r[n]=e},e.poll=function(){if(0!==o){var e=r[0];return r[0]=r[--o],n(),e}},e.peek=function(e){if(0!==o)return r[0]},e.replaceTop=function(o){r[0]=o,n()},e};
var q = fastpriorityqueue() // reuse this, except for async, it needs to make its own

return fuzzysortNew()
}) // UMD

// TODO: (performance) wasm version!?

// TODO: (performance) layout memory in an optimal way to go fast by avoiding cache misses

// TODO: (performance) preparedCache is a memory leak

// TODO: (like sublime) backslash === forwardslash

// TODO: (performance) i have no idea how well optizmied the allowing typos algorithm is

}).call(this)}).call(this,require("timers").setImmediate)

},{"timers":19}],17:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],18:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],19:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":17,"timers":19}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9saWIvZ2hvc3Qtc2VhcmNoLmpzIiwianMvc2VhcmNoLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlMaWtlVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Z1enp5c29ydC9mdXp6eXNvcnQuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTUE7O0FBTkE7O0FBRUE7QUFDQTtBQUNBO0FBR0E7SUFFTSxXO0FBQ0osdUJBQWEsSUFBYixFQUFtQjtBQUFBO0FBQ2pCLFNBQUssS0FBTCxHQUFhLEtBQWI7QUFFQSxRQUFNLFFBQVEsR0FBRztBQUNmLE1BQUEsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFQLENBQWdCLE1BRE47QUFFZixNQUFBLEdBQUcsRUFBRSxFQUZVO0FBR2YsTUFBQSxPQUFPLEVBQUUsSUFITTtBQUlmLE1BQUEsS0FBSyxFQUFFLGVBSlE7QUFLZixNQUFBLE9BQU8sRUFBRSxpQkFMTTtBQU1mLE1BQUEsWUFBWSxFQUFFLEVBTkM7QUFPZixNQUFBLFFBQVEsRUFBRSxrQkFBQSxNQUFNO0FBQUEsb0NBQWlCLE1BQU0sQ0FBQyxJQUF4Qiw0SkFBcUssTUFBTSxDQUFDLEtBQTVLO0FBQUEsT0FQRDtBQVFmLE1BQUEsT0FBTyxFQUFFO0FBQ1AsUUFBQSxJQUFJLEVBQUUsQ0FDSixPQURJLENBREM7QUFJUCxRQUFBLEtBQUssRUFBRSxFQUpBO0FBS1AsUUFBQSxTQUFTLEVBQUUsQ0FBQyxJQUxMO0FBTVAsUUFBQSxTQUFTLEVBQUU7QUFOSixPQVJNO0FBZ0JmLE1BQUEsR0FBRyxFQUFFO0FBQ0gsUUFBQSxRQUFRLEVBQUUsT0FEUDtBQUVILFFBQUEsVUFBVSxFQUFFO0FBQ1YsVUFBQSxLQUFLLEVBQUUsS0FERztBQUVWLFVBQUEsTUFBTSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FGRTtBQUdWLFVBQUEsTUFBTSxFQUFFLEVBSEU7QUFJVixVQUFBLE9BQU8sRUFBRSxFQUpDO0FBS1YsVUFBQSxLQUFLLEVBQUUsRUFMRztBQU1WLFVBQUEsT0FBTyxFQUFFLEVB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNWxCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogZ2xvYmFsIGZldGNoICovXHJcblxyXG4vKipcclxuICogVGhhbmtzID0+IGh0dHBzOi8vZ2l0aHViLmNvbS9IYXVudGVkVGhlbWVzL2dob3N0LXNlYXJjaFxyXG4gKi9cclxuXHJcbmltcG9ydCBmdXp6eXNvcnQgZnJvbSAnZnV6enlzb3J0J1xyXG4vLyBjb25zdCBmdXp6eXNvcnQgPSByZXF1aXJlKCdmdXp6eXNvcnQnKVxyXG5cclxuY2xhc3MgR2hvc3RTZWFyY2gge1xyXG4gIGNvbnN0cnVjdG9yIChhcmdzKSB7XHJcbiAgICB0aGlzLmNoZWNrID0gZmFsc2VcclxuXHJcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxyXG4gICAgICBrZXk6ICcnLFxyXG4gICAgICB2ZXJzaW9uOiAndjQnLFxyXG4gICAgICBpbnB1dDogJyNzZWFyY2gtZmllbGQnLFxyXG4gICAgICByZXN1bHRzOiAnI3NlYXJjaC1yZXN1bHRzJyxcclxuICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcclxuICAgICAgdGVtcGxhdGU6IHJlc3VsdCA9PiBgPGEgaHJlZj1cIi8ke3Jlc3VsdC5zbHVnfS9cIiBjbGFzcz1cImJsb2NrIHB5LTIgcHItMyBwbC0xMFwiPjxzdmcgY2xhc3M9XCJpY29uIGljb24tLXNlYXJjaFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTI4cHhcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1zZWFyY2hcIj48L3VzZT48L3N2Zz4gJHtyZXN1bHQudGl0bGV9PC9hPmAsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBrZXlzOiBbXHJcbiAgICAgICAgICAndGl0bGUnXHJcbiAgICAgICAgXSxcclxuICAgICAgICBsaW1pdDogMTAsXHJcbiAgICAgICAgdGhyZXNob2xkOiAtMzUwMCxcclxuICAgICAgICBhbGxvd1R5cG86IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGFwaToge1xyXG4gICAgICAgIHJlc291cmNlOiAncG9zdHMnLFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgIGxpbWl0OiAnYWxsJyxcclxuICAgICAgICAgIGZpZWxkczogWyd0aXRsZScsICdzbHVnJ10sXHJcbiAgICAgICAgICBmaWx0ZXI6ICcnLFxyXG4gICAgICAgICAgaW5jbHVkZTogJycsXHJcbiAgICAgICAgICBvcmRlcjogJycsXHJcbiAgICAgICAgICBmb3JtYXRzOiAnJyxcclxuICAgICAgICAgIHBhZ2U6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvbjoge1xyXG4gICAgICAgIGJlZm9yZURpc3BsYXk6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgICBhZnRlckRpc3BsYXk6IGZ1bmN0aW9uIChyZXN1bHRzKSB7IH0sXHJcbiAgICAgICAgYmVmb3JlRmV0Y2g6ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaXMtbG9hZGluZycpLFxyXG4gICAgICAgIGFmdGVyRmV0Y2g6ICgpID0+IHNldFRpbWVvdXQoKCkgPT4geyBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWxvYWRpbmcnKSB9LCA0MDAwKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVyZ2VkID0gdGhpcy5tZXJnZURlZXAoZGVmYXVsdHMsIGFyZ3MpXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG1lcmdlZClcclxuICAgIHRoaXMuaW5pdCgpXHJcbiAgfVxyXG5cclxuICBtZXJnZURlZXAgKHRhcmdldCwgc291cmNlKSB7XHJcbiAgICBpZiAoKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIHRhcmdldCAhPT0gbnVsbCkgJiYgKHNvdXJjZSAmJiB0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShzb3VyY2UpICYmIHNvdXJjZSAhPT0gbnVsbCkpIHtcclxuICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgaWYgKHNvdXJjZVtrZXldICYmIHR5cGVvZiBzb3VyY2Vba2V5XSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlW2tleV0pICYmIHNvdXJjZVtrZXldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAoIXRhcmdldFtrZXldKSBPYmplY3QuYXNzaWduKHRhcmdldCwgeyBba2V5XToge30gfSlcclxuICAgICAgICAgIHRoaXMubWVyZ2VEZWVwKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHsgW2tleV06IHNvdXJjZVtrZXldIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldFxyXG4gIH1cclxuXHJcbiAgZmV0Y2ggKCkge1xyXG4gICAgdGhpcy5vbi5iZWZvcmVGZXRjaCgpXHJcblxyXG4gICAgLy8gY29uc3QgZ2hvc3RBUEkgPSBuZXcgR2hvc3RDb250ZW50QVBJKHtcclxuICAgIC8vICAgdXJsOiB0aGlzLnVybCxcclxuICAgIC8vICAga2V5OiB0aGlzLmtleSxcclxuICAgIC8vICAgdmVyc2lvbjogdGhpcy52ZXJzaW9uXHJcbiAgICAvLyB9KVxyXG5cclxuICAgIGNvbnN0IGJyb3dzZSA9IHt9XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gdGhpcy5hcGkucGFyYW1ldGVyc1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtZXRlcnMpIHtcclxuICAgICAgaWYgKHBhcmFtZXRlcnNba2V5XSAhPT0gJycpIHtcclxuICAgICAgICBicm93c2Vba2V5XSA9IHBhcmFtZXRlcnNba2V5XVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW5jb2RlZCA9IE9iamVjdC5lbnRyaWVzKGJyb3dzZSkubWFwKChbaywgdl0pID0+IGAke2t9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHYpfWApLmpvaW4oJyYnKVxyXG4gICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy51cmx9L2dob3N0L2FwaS8ke3RoaXMudmVyc2lvbn0vY29udGVudC8ke3RoaXMuYXBpLnJlc291cmNlfS8/a2V5PSR7dGhpcy5rZXl9JiR7ZW5jb2RlZH1gXHJcblxyXG4gICAgY29uc3QgZ2V0QXBpID0gYXN5bmMgdXJsID0+IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcGkoYXBpVXJsKVxyXG4gICAgICAudGhlbihkYXRhID0+IHRoaXMuc2VhcmNoKGRhdGFbdGhpcy5hcGkucmVzb3VyY2VdKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpXHJcblxyXG4gICAgLy8gZ2hvc3RBUElbdGhpcy5hcGkucmVzb3VyY2VdXHJcbiAgICAvLyAgIC5icm93c2UoYnJvd3NlKVxyXG4gICAgLy8gICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAvLyAgICAgdGhpcy5zZWFyY2goZGF0YSlcclxuICAgIC8vICAgfSlcclxuICAgIC8vICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgIC8vICAgICBjb25zb2xlLmVycm9yKGVycilcclxuICAgIC8vICAgfSlcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVsZW1lbnRGcm9tSFRNTCAoaHRtbFN0cmluZykge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sU3RyaW5nLnRyaW0oKVxyXG4gICAgcmV0dXJuIGRpdi5maXJzdENoaWxkXHJcbiAgfVxyXG5cclxuICBkaXNwbGF5UmVzdWx0cyAoZGF0YSkge1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKVswXS5maXJzdENoaWxkICE9PSBudWxsICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKVswXS5maXJzdENoaWxkICE9PSAnJykge1xyXG4gICAgICB3aGlsZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJlc3VsdHMpWzBdLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVzdWx0cylbMF0ucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJlc3VsdHMpWzBdLmZpcnN0Q2hpbGQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgaW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dClbMF0udmFsdWVcclxuICAgIGlmICh0aGlzLmRlZmF1bHRWYWx1ZSAhPT0gJycpIHtcclxuICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHRzID0gZnV6enlzb3J0LmdvKGlucHV0VmFsdWUsIGRhdGEsIHtcclxuICAgICAga2V5czogdGhpcy5vcHRpb25zLmtleXMsXHJcbiAgICAgIGxpbWl0OiB0aGlzLm9wdGlvbnMubGltaXQsXHJcbiAgICAgIGFsbG93VHlwbzogdGhpcy5vcHRpb25zLmFsbG93VHlwbyxcclxuICAgICAgdGhyZXNob2xkOiB0aGlzLm9wdGlvbnMudGhyZXNob2xkXHJcbiAgICB9KVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xyXG4gICAgICBpZiAoa2V5IDwgcmVzdWx0cy5sZW5ndGgpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVzdWx0cylbMF0uYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVFbGVtZW50RnJvbUhUTUwodGhpcy50ZW1wbGF0ZShyZXN1bHRzW2tleV0ub2JqKSkpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uLmFmdGVyRGlzcGxheShyZXN1bHRzKVxyXG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSAnJ1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoIChkYXRhKSB7XHJcbiAgICB0aGlzLm9uLmFmdGVyRmV0Y2goZGF0YSlcclxuICAgIHRoaXMuY2hlY2sgPSB0cnVlXHJcblxyXG4gICAgaWYgKHRoaXMuZGVmYXVsdFZhbHVlICE9PSAnJykge1xyXG4gICAgICB0aGlzLm9uLmJlZm9yZURpc3BsYXkoKVxyXG4gICAgICB0aGlzLmRpc3BsYXlSZXN1bHRzKGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmlucHV0KVswXS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgdGhpcy5vbi5iZWZvcmVEaXNwbGF5KClcclxuICAgICAgdGhpcy5kaXNwbGF5UmVzdWx0cyhkYXRhKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNoZWNrQXJncyAoKSB7XHJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dCkubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdJbnB1dCBub3QgZm91bmQuJylcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVzdWx0cykubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRzIG5vdCBmb3VuZC4nKVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy51cmwgPT09ICcnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdDb250ZW50IEFQSSBDbGllbnQgTGlicmFyeSBob3N0IG1pc3NpbmcuIFBsZWFzZSBzZXQgdGhlIGhvc3QuIE11c3Qgbm90IGVuZCBpbiBhIHRyYWlsaW5nIHNsYXNoLicpXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmtleSA9PT0gJycpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0NvbnRlbnQgQVBJIENsaWVudCBMaWJyYXJ5IGtleSBtaXNzaW5nLiBQbGVhc2Ugc2V0IHRoZSBrZXkuIEhleCBzdHJpbmcgY29waWVkIGZyb20gdGhlIFwiSW50ZWdyYXRpb25zXCIgc2NyZWVuIGluIEdob3N0IEFkbWluLicpXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZSAoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2hlY2tBcmdzKCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGluaXQgKCkge1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlKCkpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGVmYXVsdFZhbHVlICE9PSAnJykge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuaW5wdXQpWzBdLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuICAgICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2spIHtcclxuICAgICAgICAgIHRoaXMuZmV0Y2goKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dClbMF0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5jaGVjaykge1xyXG4gICAgICAgIHRoaXMuZmV0Y2goKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuLyogRXhwb3J0IENsYXNzICovXHJcbm1vZHVsZS5leHBvcnRzID0gR2hvc3RTZWFyY2hcclxuIiwiLyogZ2xvYmFsIHNlYXJjaFNldHRpbmdzICovXHJcblxyXG5pbXBvcnQgR2hvc3RTZWFyY2ggZnJvbSAnLi9saWIvZ2hvc3Qtc2VhcmNoJ1xyXG5cclxuKGZ1bmN0aW9uIChkb2N1bWVudCkge1xyXG4gIGNvbnN0ICRib2R5ID0gZG9jdW1lbnQuYm9keVxyXG4gIGNvbnN0ICRpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtZmllbGQnKVxyXG4gIGNvbnN0ICRyZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHRzJylcclxuICBjb25zdCAkc2VhcmNoTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zZWFyY2gtbWVzc2FnZScpXHJcblxyXG4gIGNvbnN0IGNsYXNzSXNBY3RpdmUgPSAnaXMtYWN0aXZlJ1xyXG5cclxuICBsZXQgYWxsU2VhcmNoTGlua3NMZW5ndGggPSAwXHJcblxyXG4gIGxldCBzZWFyY2hSZXN1bHRzSGVpZ2h0ID0ge1xyXG4gICAgb3V0ZXI6IDAsXHJcbiAgICBzY3JvbGw6IDBcclxuICB9XHJcblxyXG4gIC8vIFNIb3cgaWNvbiBzZWFyY2ggaW4gaGVhZGVyXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtkYXRhLXRhcmdldD1tb2RhbC1zZWFyY2hdJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuXHJcbiAgLy8gVmFyaWFibGUgZm9yIHNlYXJjaFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIGNvbnN0IGFmdGVyRGlzcGxheVNlYXJjaCA9IHJlc3VsdHMgPT4ge1xyXG4gICAgLy8gQWN0aXZlIGNsYXNzIHRvIGxpbmsgc2VhcmNoXHJcbiAgICBzZWFyY2hSZXN1bHRBY3RpdmUoKVxyXG5cclxuICAgIGFsbFNlYXJjaExpbmtzTGVuZ3RoID0gcmVzdWx0cy5sZW5ndGhcclxuXHJcbiAgICBzZWFyY2hSZXN1bHRzSGVpZ2h0ID0ge1xyXG4gICAgICBvdXRlcjogJHJlc3VsdHMub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICBzY3JvbGw6ICRyZXN1bHRzLnNjcm9sbEhlaWdodFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHRzLnRvdGFsID09PSAwICYmICRpbnB1dC52YWx1ZSAhPT0gJycpIHtcclxuICAgICAgJHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgJGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG15U2VhcmNoS2V5KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcclxuICAgICAgJGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG15U2VhcmNoS2V5KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbXlTZWFyY2hTZXR0aW5ncyA9IHsgb246IHsgYWZ0ZXJEaXNwbGF5OiByZXN1bHRzID0+IGFmdGVyRGlzcGxheVNlYXJjaChyZXN1bHRzKSB9IH1cclxuXHJcbiAgLy8gam9pbiB1c2VyIHNldHRpbmdzXHJcbiAgT2JqZWN0LmFzc2lnbihteVNlYXJjaFNldHRpbmdzLCBzZWFyY2hTZXR0aW5ncylcclxuXHJcbiAgLy8gd2hlbiB0aGUgRW50ZXIga2V5IGlzIHByZXNzZWRcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGZ1bmN0aW9uIGVudGVyS2V5ICgpIHtcclxuICAgIGNvbnN0IGxpbmsgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yKGBhLiR7Y2xhc3NJc0FjdGl2ZX1gKVxyXG4gICAgbGluayAmJiBsaW5rLmNsaWNrKClcclxuICB9XHJcblxyXG4gIC8vIEF0dGVuZGluZyB0aGUgYWN0aXZlIGNsYXNzIHRvIHRoZSBzZWFyY2ggbGlua1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgZnVuY3Rpb24gc2VhcmNoUmVzdWx0QWN0aXZlIChpbmRleCwgdXBEb3duKSB7XHJcbiAgICBpbmRleCA9IGluZGV4IHx8IDBcclxuICAgIHVwRG93biA9IHVwRG93biB8fCAndXAnXHJcblxyXG4gICAgY29uc3QgYWxsU2VhcmNoTGlua3MgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdhJylcclxuXHJcbiAgICAvLyBSZXR1cm4gaWYgdGhlcmUgYXJlIG5vIHJlc3VsdHNcclxuICAgIGlmICghYWxsU2VhcmNoTGlua3MubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICAvLyBSZW1vdmUgQWxsIGNsYXNzIEFjdGl2ZVxyXG4gICAgYWxsU2VhcmNoTGlua3MuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc0lzQWN0aXZlKSlcclxuXHJcbiAgICAvLyBBZGQgY2xhc3MgYWN0aXZlXHJcbiAgICBhbGxTZWFyY2hMaW5rc1tpbmRleF0uY2xhc3NMaXN0LmFkZChjbGFzc0lzQWN0aXZlKVxyXG5cclxuICAgIC8vIFNjcm9sbCBmb3IgcmVzdWx0cyBib3hcclxuICAgIGNvbnN0IGxpbmtPZmZTZXRUb3AgPSBhbGxTZWFyY2hMaW5rc1tpbmRleF0ub2Zmc2V0VG9wXHJcbiAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSAwXHJcblxyXG4gICAgdXBEb3duID09PSAnZG93bicgJiYgbGlua09mZlNldFRvcCA+IHNlYXJjaFJlc3VsdHNIZWlnaHQub3V0ZXIgLyAyID8gc2Nyb2xsUG9zaXRpb24gPSBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiB1cERvd24gPT09ICd1cCcgJiYgKHNjcm9sbFBvc2l0aW9uID0gbGlua09mZlNldFRvcCA8IHNlYXJjaFJlc3VsdHNIZWlnaHQuc2Nyb2xsIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgPyBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiBzZWFyY2hSZXN1bHRzSGVpZ2h0LnNjcm9sbClcclxuXHJcbiAgICAkcmVzdWx0cy5zY3JvbGxUbygwLCBzY3JvbGxQb3NpdGlvbilcclxuICB9XHJcblxyXG4gIC8vIFJlYWN0ZWQgdG8gdGhlIHVwIG9yIGRvd24ga2V5c1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgZnVuY3Rpb24gYXJyb3dLZXlVcERvd24gKGtleU51bWJlcikge1xyXG4gICAgbGV0IHVwRG93blxyXG4gICAgbGV0IGluZGV4VGhlTGluayA9IDBcclxuXHJcbiAgICBjb25zdCByZXN1bHRBY3RpdmUgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yKCcuaXMtYWN0aXZlJylcclxuXHJcbiAgICBpZiAocmVzdWx0QWN0aXZlKSB7XHJcbiAgICAgIGluZGV4VGhlTGluayA9IFtdLnNsaWNlLmNhbGwocmVzdWx0QWN0aXZlLnBhcmVudE5vZGUuY2hpbGRyZW4pLmluZGV4T2YocmVzdWx0QWN0aXZlKVxyXG4gICAgfVxyXG5cclxuICAgICRpbnB1dC5ibHVyKClcclxuXHJcbiAgICAvLyAzOCA9PT0gVVBcclxuICAgIGlmIChrZXlOdW1iZXIgPT09IDM4KSB7XHJcbiAgICAgIHVwRG93biA9ICd1cCdcclxuXHJcbiAgICAgIGlmIChpbmRleFRoZUxpbmsgPD0gMCkge1xyXG4gICAgICAgICRpbnB1dC5mb2N1cygpXHJcbiAgICAgICAgaW5kZXhUaGVMaW5rID0gMFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGluZGV4VGhlTGluayAtPSAxXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVwRG93biA9ICdkb3duJ1xyXG5cclxuICAgICAgaWYgKGluZGV4VGhlTGluayA+PSBhbGxTZWFyY2hMaW5rc0xlbmd0aCAtIDEpIHtcclxuICAgICAgICBpbmRleFRoZUxpbmsgPSAwXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXhUaGVMaW5rICs9IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaFJlc3VsdEFjdGl2ZShpbmRleFRoZUxpbmssIHVwRG93bilcclxuICB9XHJcblxyXG4gIC8vIEFkZGluZyBmdW5jdGlvbnMgdG8gdGhlIGtleXNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGZ1bmN0aW9uIG15U2VhcmNoS2V5IChlKSB7XHJcbiAgICBjb25zdCBrZXlOdW1iZXIgPSBlLmtleUNvZGVcclxuXHJcbiAgICAvKipcclxuICAgICAgKiAzOCA9PiBVcFxyXG4gICAgICAqIDQwID0+IGRvd25cclxuICAgICAgKiAxMyA9PiBlbnRlclxyXG4gICAgICAqKi9cclxuXHJcbiAgICBpZiAoa2V5TnVtYmVyID09PSAxMykge1xyXG4gICAgICAkaW5wdXQuYmx1cigpXHJcbiAgICAgIGVudGVyS2V5KClcclxuICAgIH0gZWxzZSBpZiAoa2V5TnVtYmVyID09PSAzOCB8fCBrZXlOdW1iZXIgPT09IDQwKSB7XHJcbiAgICAgIGFycm93S2V5VXBEb3duKGtleU51bWJlcilcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBTZWFyY2hcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xyXG4gIG5ldyBHaG9zdFNlYXJjaChteVNlYXJjaFNldHRpbmdzKVxyXG59KShkb2N1bWVudClcclxuIiwiZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheUxpa2VUb0FycmF5O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FzeW5jVG9HZW5lcmF0b3I7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzcztcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIik7XG5cbnZhciB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcblxuICAgIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcblxuICAgIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCIvKlxyXG5XSEFUOiBTdWJsaW1lVGV4dC1saWtlIEZ1enp5IFNlYXJjaFxyXG5cclxuVVNBR0U6XHJcbiAgZnV6enlzb3J0LnNpbmdsZSgnZnMnLCAnRnV6enkgU2VhcmNoJykgLy8ge3Njb3JlOiAtMTZ9XHJcbiAgZnV6enlzb3J0LnNpbmdsZSgndGVzdCcsICd0ZXN0JykgLy8ge3Njb3JlOiAwfVxyXG4gIGZ1enp5c29ydC5zaW5nbGUoJ2RvZXNudCBleGlzdCcsICd0YXJnZXQnKSAvLyBudWxsXHJcblxyXG4gIGZ1enp5c29ydC5nbygnbXInLCBbJ01vbml0b3IuY3BwJywgJ01lc2hSZW5kZXJlci5jcHAnXSlcclxuICAvLyBbe3Njb3JlOiAtMTgsIHRhcmdldDogXCJNZXNoUmVuZGVyZXIuY3BwXCJ9LCB7c2NvcmU6IC02MDA5LCB0YXJnZXQ6IFwiTW9uaXRvci5jcHBcIn1dXHJcblxyXG4gIGZ1enp5c29ydC5oaWdobGlnaHQoZnV6enlzb3J0LnNpbmdsZSgnZnMnLCAnRnV6enkgU2VhcmNoJyksICc8Yj4nLCAnPC9iPicpXHJcbiAgLy8gPGI+RjwvYj51enp5IDxiPlM8L2I+ZWFyY2hcclxuKi9cclxuXHJcbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKSBmb3IgZnV6enlzb3J0XHJcbjsoZnVuY3Rpb24ocm9vdCwgVU1EKSB7XHJcbiAgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoW10sIFVNRClcclxuICBlbHNlIGlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IFVNRCgpXHJcbiAgZWxzZSByb290LmZ1enp5c29ydCA9IFVNRCgpXHJcbn0pKHRoaXMsIGZ1bmN0aW9uIFVNRCgpIHsgZnVuY3Rpb24gZnV6enlzb3J0TmV3KGluc3RhbmNlT3B0aW9ucykge1xyXG5cclxuICB2YXIgZnV6enlzb3J0ID0ge1xyXG5cclxuICAgIHNpbmdsZTogZnVuY3Rpb24oc2VhcmNoLCB0YXJnZXQsIG9wdGlvbnMpIHtcclxuICAgICAgaWYoIXNlYXJjaCkgcmV0dXJuIG51bGxcclxuICAgICAgaWYoIWlzT2JqKHNlYXJjaCkpIHNlYXJjaCA9IGZ1enp5c29ydC5nZXRQcmVwYXJlZFNlYXJjaChzZWFyY2gpXHJcblxyXG4gICAgICBpZighdGFyZ2V0KSByZXR1cm4gbnVsbFxyXG4gICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgIHZhciBhbGxvd1R5cG8gPSBvcHRpb25zICYmIG9wdGlvbnMuYWxsb3dUeXBvIT09dW5kZWZpbmVkID8gb3B0aW9ucy5hbGxvd1R5cG9cclxuICAgICAgICA6IGluc3RhbmNlT3B0aW9ucyAmJiBpbnN0YW5jZU9wdGlvbnMuYWxsb3dUeXBvIT09dW5kZWZpbmVkID8gaW5zdGFuY2VPcHRpb25zLmFsbG93VHlwb1xyXG4gICAgICAgIDogdHJ1ZVxyXG4gICAgICB2YXIgYWxnb3JpdGhtID0gYWxsb3dUeXBvID8gZnV6enlzb3J0LmFsZ29yaXRobSA6IGZ1enp5c29ydC5hbGdvcml0aG1Ob1R5cG9cclxuICAgICAgcmV0dXJuIGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoWzBdKVxyXG4gICAgICAvLyB2YXIgdGhyZXNob2xkID0gb3B0aW9ucyAmJiBvcHRpb25zLnRocmVzaG9sZCB8fCBpbnN0YW5jZU9wdGlvbnMgJiYgaW5zdGFuY2VPcHRpb25zLnRocmVzaG9sZCB8fCAtOTAwNzE5OTI1NDc0MDk5MVxyXG4gICAgICAvLyB2YXIgcmVzdWx0ID0gYWxnb3JpdGhtKHNlYXJjaCwgdGFyZ2V0LCBzZWFyY2hbMF0pXHJcbiAgICAgIC8vIGlmKHJlc3VsdCA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICAgICAgLy8gaWYocmVzdWx0LnNjb3JlIDwgdGhyZXNob2xkKSByZXR1cm4gbnVsbFxyXG4gICAgICAvLyByZXR1cm4gcmVzdWx0XHJcbiAgICB9LFxyXG5cclxuICAgIGdvOiBmdW5jdGlvbihzZWFyY2gsIHRhcmdldHMsIG9wdGlvbnMpIHtcclxuICAgICAgaWYoIXNlYXJjaCkgcmV0dXJuIG5vUmVzdWx0c1xyXG4gICAgICBzZWFyY2ggPSBmdXp6eXNvcnQucHJlcGFyZVNlYXJjaChzZWFyY2gpXHJcbiAgICAgIHZhciBzZWFyY2hMb3dlckNvZGUgPSBzZWFyY2hbMF1cclxuXHJcbiAgICAgIHZhciB0aHJlc2hvbGQgPSBvcHRpb25zICYmIG9wdGlvbnMudGhyZXNob2xkIHx8IGluc3RhbmNlT3B0aW9ucyAmJiBpbnN0YW5jZU9wdGlvbnMudGhyZXNob2xkIHx8IC05MDA3MTk5MjU0NzQwOTkxXHJcbiAgICAgIHZhciBsaW1pdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5saW1pdCB8fCBpbnN0YW5jZU9wdGlvbnMgJiYgaW5zdGFuY2VPcHRpb25zLmxpbWl0IHx8IDkwMDcxOTkyNTQ3NDA5OTFcclxuICAgICAgdmFyIGFsbG93VHlwbyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBvcHRpb25zLmFsbG93VHlwb1xyXG4gICAgICAgIDogaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBpbnN0YW5jZU9wdGlvbnMuYWxsb3dUeXBvXHJcbiAgICAgICAgOiB0cnVlXHJcbiAgICAgIHZhciBhbGdvcml0aG0gPSBhbGxvd1R5cG8gPyBmdXp6eXNvcnQuYWxnb3JpdGhtIDogZnV6enlzb3J0LmFsZ29yaXRobU5vVHlwb1xyXG4gICAgICB2YXIgcmVzdWx0c0xlbiA9IDA7IHZhciBsaW1pdGVkQ291bnQgPSAwXHJcbiAgICAgIHZhciB0YXJnZXRzTGVuID0gdGFyZ2V0cy5sZW5ndGhcclxuXHJcbiAgICAgIC8vIFRoaXMgY29kZSBpcyBjb3B5L3Bhc3RlZCAzIHRpbWVzIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIFtvcHRpb25zLmtleXMsIG9wdGlvbnMua2V5LCBubyBrZXlzXVxyXG5cclxuICAgICAgLy8gb3B0aW9ucy5rZXlzXHJcbiAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5rZXlzKSB7XHJcbiAgICAgICAgdmFyIHNjb3JlRm4gPSBvcHRpb25zLnNjb3JlRm4gfHwgZGVmYXVsdFNjb3JlRm5cclxuICAgICAgICB2YXIga2V5cyA9IG9wdGlvbnMua2V5c1xyXG4gICAgICAgIHZhciBrZXlzTGVuID0ga2V5cy5sZW5ndGhcclxuICAgICAgICBmb3IodmFyIGkgPSB0YXJnZXRzTGVuIC0gMTsgaSA+PSAwOyAtLWkpIHsgdmFyIG9iaiA9IHRhcmdldHNbaV1cclxuICAgICAgICAgIHZhciBvYmpSZXN1bHRzID0gbmV3IEFycmF5KGtleXNMZW4pXHJcbiAgICAgICAgICBmb3IgKHZhciBrZXlJID0ga2V5c0xlbiAtIDE7IGtleUkgPj0gMDsgLS1rZXlJKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2tleUldXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBnZXRWYWx1ZShvYmosIGtleSlcclxuICAgICAgICAgICAgaWYoIXRhcmdldCkgeyBvYmpSZXN1bHRzW2tleUldID0gbnVsbDsgY29udGludWUgfVxyXG4gICAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICAgIG9ialJlc3VsdHNba2V5SV0gPSBhbGdvcml0aG0oc2VhcmNoLCB0YXJnZXQsIHNlYXJjaExvd2VyQ29kZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG9ialJlc3VsdHMub2JqID0gb2JqIC8vIGJlZm9yZSBzY29yZUZuIHNvIHNjb3JlRm4gY2FuIHVzZSBpdFxyXG4gICAgICAgICAgdmFyIHNjb3JlID0gc2NvcmVGbihvYmpSZXN1bHRzKVxyXG4gICAgICAgICAgaWYoc2NvcmUgPT09IG51bGwpIGNvbnRpbnVlXHJcbiAgICAgICAgICBpZihzY29yZSA8IHRocmVzaG9sZCkgY29udGludWVcclxuICAgICAgICAgIG9ialJlc3VsdHMuc2NvcmUgPSBzY29yZVxyXG4gICAgICAgICAgaWYocmVzdWx0c0xlbiA8IGxpbWl0KSB7IHEuYWRkKG9ialJlc3VsdHMpOyArK3Jlc3VsdHNMZW4gfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICsrbGltaXRlZENvdW50XHJcbiAgICAgICAgICAgIGlmKHNjb3JlID4gcS5wZWVrKCkuc2NvcmUpIHEucmVwbGFjZVRvcChvYmpSZXN1bHRzKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vIG9wdGlvbnMua2V5XHJcbiAgICAgIH0gZWxzZSBpZihvcHRpb25zICYmIG9wdGlvbnMua2V5KSB7XHJcbiAgICAgICAgdmFyIGtleSA9IG9wdGlvbnMua2V5XHJcbiAgICAgICAgZm9yKHZhciBpID0gdGFyZ2V0c0xlbiAtIDE7IGkgPj0gMDsgLS1pKSB7IHZhciBvYmogPSB0YXJnZXRzW2ldXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZ2V0VmFsdWUob2JqLCBrZXkpXHJcbiAgICAgICAgICBpZighdGFyZ2V0KSBjb250aW51ZVxyXG4gICAgICAgICAgaWYoIWlzT2JqKHRhcmdldCkpIHRhcmdldCA9IGZ1enp5c29ydC5nZXRQcmVwYXJlZCh0YXJnZXQpXHJcblxyXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoTG93ZXJDb2RlKVxyXG4gICAgICAgICAgaWYocmVzdWx0ID09PSBudWxsKSBjb250aW51ZVxyXG4gICAgICAgICAgaWYocmVzdWx0LnNjb3JlIDwgdGhyZXNob2xkKSBjb250aW51ZVxyXG5cclxuICAgICAgICAgIC8vIGhhdmUgdG8gY2xvbmUgcmVzdWx0IHNvIGR1cGxpY2F0ZSB0YXJnZXRzIGZyb20gZGlmZmVyZW50IG9iaiBjYW4gZWFjaCByZWZlcmVuY2UgdGhlIGNvcnJlY3Qgb2JqXHJcbiAgICAgICAgICByZXN1bHQgPSB7dGFyZ2V0OnJlc3VsdC50YXJnZXQsIF90YXJnZXRMb3dlckNvZGVzOm51bGwsIF9uZXh0QmVnaW5uaW5nSW5kZXhlczpudWxsLCBzY29yZTpyZXN1bHQuc2NvcmUsIGluZGV4ZXM6cmVzdWx0LmluZGV4ZXMsIG9iajpvYmp9IC8vIGhpZGRlblxyXG5cclxuICAgICAgICAgIGlmKHJlc3VsdHNMZW4gPCBsaW1pdCkgeyBxLmFkZChyZXN1bHQpOyArK3Jlc3VsdHNMZW4gfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICsrbGltaXRlZENvdW50XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5zY29yZSA+IHEucGVlaygpLnNjb3JlKSBxLnJlcGxhY2VUb3AocmVzdWx0KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vIG5vIGtleXNcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IodmFyIGkgPSB0YXJnZXRzTGVuIC0gMTsgaSA+PSAwOyAtLWkpIHsgdmFyIHRhcmdldCA9IHRhcmdldHNbaV1cclxuICAgICAgICAgIGlmKCF0YXJnZXQpIGNvbnRpbnVlXHJcbiAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gYWxnb3JpdGhtKHNlYXJjaCwgdGFyZ2V0LCBzZWFyY2hMb3dlckNvZGUpXHJcbiAgICAgICAgICBpZihyZXN1bHQgPT09IG51bGwpIGNvbnRpbnVlXHJcbiAgICAgICAgICBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIGNvbnRpbnVlXHJcbiAgICAgICAgICBpZihyZXN1bHRzTGVuIDwgbGltaXQpIHsgcS5hZGQocmVzdWx0KTsgKytyZXN1bHRzTGVuIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICArK2xpbWl0ZWRDb3VudFxyXG4gICAgICAgICAgICBpZihyZXN1bHQuc2NvcmUgPiBxLnBlZWsoKS5zY29yZSkgcS5yZXBsYWNlVG9wKHJlc3VsdClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKHJlc3VsdHNMZW4gPT09IDApIHJldHVybiBub1Jlc3VsdHNcclxuICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkocmVzdWx0c0xlbilcclxuICAgICAgZm9yKHZhciBpID0gcmVzdWx0c0xlbiAtIDE7IGkgPj0gMDsgLS1pKSByZXN1bHRzW2ldID0gcS5wb2xsKClcclxuICAgICAgcmVzdWx0cy50b3RhbCA9IHJlc3VsdHNMZW4gKyBsaW1pdGVkQ291bnRcclxuICAgICAgcmV0dXJuIHJlc3VsdHNcclxuICAgIH0sXHJcblxyXG4gICAgZ29Bc3luYzogZnVuY3Rpb24oc2VhcmNoLCB0YXJnZXRzLCBvcHRpb25zKSB7XHJcbiAgICAgIHZhciBjYW5jZWxlZCA9IGZhbHNlXHJcbiAgICAgIHZhciBwID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgaWYoIXNlYXJjaCkgcmV0dXJuIHJlc29sdmUobm9SZXN1bHRzKVxyXG4gICAgICAgIHNlYXJjaCA9IGZ1enp5c29ydC5wcmVwYXJlU2VhcmNoKHNlYXJjaClcclxuICAgICAgICB2YXIgc2VhcmNoTG93ZXJDb2RlID0gc2VhcmNoWzBdXHJcblxyXG4gICAgICAgIHZhciBxID0gZmFzdHByaW9yaXR5cXVldWUoKVxyXG4gICAgICAgIHZhciBpQ3VycmVudCA9IHRhcmdldHMubGVuZ3RoIC0gMVxyXG4gICAgICAgIHZhciB0aHJlc2hvbGQgPSBvcHRpb25zICYmIG9wdGlvbnMudGhyZXNob2xkIHx8IGluc3RhbmNlT3B0aW9ucyAmJiBpbnN0YW5jZU9wdGlvbnMudGhyZXNob2xkIHx8IC05MDA3MTk5MjU0NzQwOTkxXHJcbiAgICAgICAgdmFyIGxpbWl0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmxpbWl0IHx8IGluc3RhbmNlT3B0aW9ucyAmJiBpbnN0YW5jZU9wdGlvbnMubGltaXQgfHwgOTAwNzE5OTI1NDc0MDk5MVxyXG4gICAgICAgIHZhciBhbGxvd1R5cG8gPSBvcHRpb25zICYmIG9wdGlvbnMuYWxsb3dUeXBvIT09dW5kZWZpbmVkID8gb3B0aW9ucy5hbGxvd1R5cG9cclxuICAgICAgICAgIDogaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBpbnN0YW5jZU9wdGlvbnMuYWxsb3dUeXBvXHJcbiAgICAgICAgICA6IHRydWVcclxuICAgICAgICB2YXIgYWxnb3JpdGhtID0gYWxsb3dUeXBvID8gZnV6enlzb3J0LmFsZ29yaXRobSA6IGZ1enp5c29ydC5hbGdvcml0aG1Ob1R5cG9cclxuICAgICAgICB2YXIgcmVzdWx0c0xlbiA9IDA7IHZhciBsaW1pdGVkQ291bnQgPSAwXHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcCgpIHtcclxuICAgICAgICAgIGlmKGNhbmNlbGVkKSByZXR1cm4gcmVqZWN0KCdjYW5jZWxlZCcpXHJcblxyXG4gICAgICAgICAgdmFyIHN0YXJ0TXMgPSBEYXRlLm5vdygpXHJcblxyXG4gICAgICAgICAgLy8gVGhpcyBjb2RlIGlzIGNvcHkvcGFzdGVkIDMgdGltZXMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgW29wdGlvbnMua2V5cywgb3B0aW9ucy5rZXksIG5vIGtleXNdXHJcblxyXG4gICAgICAgICAgLy8gb3B0aW9ucy5rZXlzXHJcbiAgICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMua2V5cykge1xyXG4gICAgICAgICAgICB2YXIgc2NvcmVGbiA9IG9wdGlvbnMuc2NvcmVGbiB8fCBkZWZhdWx0U2NvcmVGblxyXG4gICAgICAgICAgICB2YXIga2V5cyA9IG9wdGlvbnMua2V5c1xyXG4gICAgICAgICAgICB2YXIga2V5c0xlbiA9IGtleXMubGVuZ3RoXHJcbiAgICAgICAgICAgIGZvcig7IGlDdXJyZW50ID49IDA7IC0taUN1cnJlbnQpIHsgdmFyIG9iaiA9IHRhcmdldHNbaUN1cnJlbnRdXHJcbiAgICAgICAgICAgICAgdmFyIG9ialJlc3VsdHMgPSBuZXcgQXJyYXkoa2V5c0xlbilcclxuICAgICAgICAgICAgICBmb3IgKHZhciBrZXlJID0ga2V5c0xlbiAtIDE7IGtleUkgPj0gMDsgLS1rZXlJKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1trZXlJXVxyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGdldFZhbHVlKG9iaiwga2V5KVxyXG4gICAgICAgICAgICAgICAgaWYoIXRhcmdldCkgeyBvYmpSZXN1bHRzW2tleUldID0gbnVsbDsgY29udGludWUgfVxyXG4gICAgICAgICAgICAgICAgaWYoIWlzT2JqKHRhcmdldCkpIHRhcmdldCA9IGZ1enp5c29ydC5nZXRQcmVwYXJlZCh0YXJnZXQpXHJcblxyXG4gICAgICAgICAgICAgICAgb2JqUmVzdWx0c1trZXlJXSA9IGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoTG93ZXJDb2RlKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBvYmpSZXN1bHRzLm9iaiA9IG9iaiAvLyBiZWZvcmUgc2NvcmVGbiBzbyBzY29yZUZuIGNhbiB1c2UgaXRcclxuICAgICAgICAgICAgICB2YXIgc2NvcmUgPSBzY29yZUZuKG9ialJlc3VsdHMpXHJcbiAgICAgICAgICAgICAgaWYoc2NvcmUgPT09IG51bGwpIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgaWYoc2NvcmUgPCB0aHJlc2hvbGQpIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgb2JqUmVzdWx0cy5zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgICAgICAgaWYocmVzdWx0c0xlbiA8IGxpbWl0KSB7IHEuYWRkKG9ialJlc3VsdHMpOyArK3Jlc3VsdHNMZW4gfVxyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgKytsaW1pdGVkQ291bnRcclxuICAgICAgICAgICAgICAgIGlmKHNjb3JlID4gcS5wZWVrKCkuc2NvcmUpIHEucmVwbGFjZVRvcChvYmpSZXN1bHRzKVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYoaUN1cnJlbnQlMTAwMC8qaXRlbXNQZXJDaGVjayovID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZihEYXRlLm5vdygpIC0gc3RhcnRNcyA+PSAxMC8qYXN5bmNJbnRlcnZhbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlzTm9kZT9zZXRJbW1lZGlhdGUoc3RlcCk6c2V0VGltZW91dChzdGVwKVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBvcHRpb25zLmtleVxyXG4gICAgICAgICAgfSBlbHNlIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5rZXkpIHtcclxuICAgICAgICAgICAgdmFyIGtleSA9IG9wdGlvbnMua2V5XHJcbiAgICAgICAgICAgIGZvcig7IGlDdXJyZW50ID49IDA7IC0taUN1cnJlbnQpIHsgdmFyIG9iaiA9IHRhcmdldHNbaUN1cnJlbnRdXHJcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGdldFZhbHVlKG9iaiwga2V5KVxyXG4gICAgICAgICAgICAgIGlmKCF0YXJnZXQpIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgaWYoIWlzT2JqKHRhcmdldCkpIHRhcmdldCA9IGZ1enp5c29ydC5nZXRQcmVwYXJlZCh0YXJnZXQpXHJcblxyXG4gICAgICAgICAgICAgIHZhciByZXN1bHQgPSBhbGdvcml0aG0oc2VhcmNoLCB0YXJnZXQsIHNlYXJjaExvd2VyQ29kZSlcclxuICAgICAgICAgICAgICBpZihyZXN1bHQgPT09IG51bGwpIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgaWYocmVzdWx0LnNjb3JlIDwgdGhyZXNob2xkKSBjb250aW51ZVxyXG5cclxuICAgICAgICAgICAgICAvLyBoYXZlIHRvIGNsb25lIHJlc3VsdCBzbyBkdXBsaWNhdGUgdGFyZ2V0cyBmcm9tIGRpZmZlcmVudCBvYmogY2FuIGVhY2ggcmVmZXJlbmNlIHRoZSBjb3JyZWN0IG9ialxyXG4gICAgICAgICAgICAgIHJlc3VsdCA9IHt0YXJnZXQ6cmVzdWx0LnRhcmdldCwgX3RhcmdldExvd2VyQ29kZXM6bnVsbCwgX25leHRCZWdpbm5pbmdJbmRleGVzOm51bGwsIHNjb3JlOnJlc3VsdC5zY29yZSwgaW5kZXhlczpyZXN1bHQuaW5kZXhlcywgb2JqOm9ian0gLy8gaGlkZGVuXHJcblxyXG4gICAgICAgICAgICAgIGlmKHJlc3VsdHNMZW4gPCBsaW1pdCkgeyBxLmFkZChyZXN1bHQpOyArK3Jlc3VsdHNMZW4gfVxyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgKytsaW1pdGVkQ291bnRcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zY29yZSA+IHEucGVlaygpLnNjb3JlKSBxLnJlcGxhY2VUb3AocmVzdWx0KVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYoaUN1cnJlbnQlMTAwMC8qaXRlbXNQZXJDaGVjayovID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZihEYXRlLm5vdygpIC0gc3RhcnRNcyA+PSAxMC8qYXN5bmNJbnRlcnZhbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlzTm9kZT9zZXRJbW1lZGlhdGUoc3RlcCk6c2V0VGltZW91dChzdGVwKVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBubyBrZXlzXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IoOyBpQ3VycmVudCA+PSAwOyAtLWlDdXJyZW50KSB7IHZhciB0YXJnZXQgPSB0YXJnZXRzW2lDdXJyZW50XVxyXG4gICAgICAgICAgICAgIGlmKCF0YXJnZXQpIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgaWYoIWlzT2JqKHRhcmdldCkpIHRhcmdldCA9IGZ1enp5c29ydC5nZXRQcmVwYXJlZCh0YXJnZXQpXHJcblxyXG4gICAgICAgICAgICAgIHZhciByZXN1bHQgPSBhbGdvcml0aG0oc2VhcmNoLCB0YXJnZXQsIHNlYXJjaExvd2VyQ29kZSlcclxuICAgICAgICAgICAgICBpZihyZXN1bHQgPT09IG51bGwpIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgaWYocmVzdWx0LnNjb3JlIDwgdGhyZXNob2xkKSBjb250aW51ZVxyXG4gICAgICAgICAgICAgIGlmKHJlc3VsdHNMZW4gPCBsaW1pdCkgeyBxLmFkZChyZXN1bHQpOyArK3Jlc3VsdHNMZW4gfVxyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgKytsaW1pdGVkQ291bnRcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zY29yZSA+IHEucGVlaygpLnNjb3JlKSBxLnJlcGxhY2VUb3AocmVzdWx0KVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYoaUN1cnJlbnQlMTAwMC8qaXRlbXNQZXJDaGVjayovID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZihEYXRlLm5vdygpIC0gc3RhcnRNcyA+PSAxMC8qYXN5bmNJbnRlcnZhbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlzTm9kZT9zZXRJbW1lZGlhdGUoc3RlcCk6c2V0VGltZW91dChzdGVwKVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZihyZXN1bHRzTGVuID09PSAwKSByZXR1cm4gcmVzb2x2ZShub1Jlc3VsdHMpXHJcbiAgICAgICAgICB2YXIgcmVzdWx0cyA9IG5ldyBBcnJheShyZXN1bHRzTGVuKVxyXG4gICAgICAgICAgZm9yKHZhciBpID0gcmVzdWx0c0xlbiAtIDE7IGkgPj0gMDsgLS1pKSByZXN1bHRzW2ldID0gcS5wb2xsKClcclxuICAgICAgICAgIHJlc3VsdHMudG90YWwgPSByZXN1bHRzTGVuICsgbGltaXRlZENvdW50XHJcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc05vZGU/c2V0SW1tZWRpYXRlKHN0ZXApOnN0ZXAoKVxyXG4gICAgICB9KVxyXG4gICAgICBwLmNhbmNlbCA9IGZ1bmN0aW9uKCkgeyBjYW5jZWxlZCA9IHRydWUgfVxyXG4gICAgICByZXR1cm4gcFxyXG4gICAgfSxcclxuXHJcbiAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uKHJlc3VsdCwgaE9wZW4sIGhDbG9zZSkge1xyXG4gICAgICBpZihyZXN1bHQgPT09IG51bGwpIHJldHVybiBudWxsXHJcbiAgICAgIGlmKGhPcGVuID09PSB1bmRlZmluZWQpIGhPcGVuID0gJzxiPidcclxuICAgICAgaWYoaENsb3NlID09PSB1bmRlZmluZWQpIGhDbG9zZSA9ICc8L2I+J1xyXG4gICAgICB2YXIgaGlnaGxpZ2h0ZWQgPSAnJ1xyXG4gICAgICB2YXIgbWF0Y2hlc0luZGV4ID0gMFxyXG4gICAgICB2YXIgb3BlbmVkID0gZmFsc2VcclxuICAgICAgdmFyIHRhcmdldCA9IHJlc3VsdC50YXJnZXRcclxuICAgICAgdmFyIHRhcmdldExlbiA9IHRhcmdldC5sZW5ndGhcclxuICAgICAgdmFyIG1hdGNoZXNCZXN0ID0gcmVzdWx0LmluZGV4ZXNcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRhcmdldExlbjsgKytpKSB7IHZhciBjaGFyID0gdGFyZ2V0W2ldXHJcbiAgICAgICAgaWYobWF0Y2hlc0Jlc3RbbWF0Y2hlc0luZGV4XSA9PT0gaSkge1xyXG4gICAgICAgICAgKyttYXRjaGVzSW5kZXhcclxuICAgICAgICAgIGlmKCFvcGVuZWQpIHsgb3BlbmVkID0gdHJ1ZVxyXG4gICAgICAgICAgICBoaWdobGlnaHRlZCArPSBoT3BlblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKG1hdGNoZXNJbmRleCA9PT0gbWF0Y2hlc0Jlc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkICs9IGNoYXIgKyBoQ2xvc2UgKyB0YXJnZXQuc3Vic3RyKGkrMSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYob3BlbmVkKSB7IG9wZW5lZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkICs9IGhDbG9zZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBoaWdobGlnaHRlZCArPSBjaGFyXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBoaWdobGlnaHRlZFxyXG4gICAgfSxcclxuXHJcbiAgICBwcmVwYXJlOiBmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgaWYoIXRhcmdldCkgcmV0dXJuXHJcbiAgICAgIHJldHVybiB7dGFyZ2V0OnRhcmdldCwgX3RhcmdldExvd2VyQ29kZXM6ZnV6enlzb3J0LnByZXBhcmVMb3dlckNvZGVzKHRhcmdldCksIF9uZXh0QmVnaW5uaW5nSW5kZXhlczpudWxsLCBzY29yZTpudWxsLCBpbmRleGVzOm51bGwsIG9iajpudWxsfSAvLyBoaWRkZW5cclxuICAgIH0sXHJcbiAgICBwcmVwYXJlU2xvdzogZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgIGlmKCF0YXJnZXQpIHJldHVyblxyXG4gICAgICByZXR1cm4ge3RhcmdldDp0YXJnZXQsIF90YXJnZXRMb3dlckNvZGVzOmZ1enp5c29ydC5wcmVwYXJlTG93ZXJDb2Rlcyh0YXJnZXQpLCBfbmV4dEJlZ2lubmluZ0luZGV4ZXM6ZnV6enlzb3J0LnByZXBhcmVOZXh0QmVnaW5uaW5nSW5kZXhlcyh0YXJnZXQpLCBzY29yZTpudWxsLCBpbmRleGVzOm51bGwsIG9iajpudWxsfSAvLyBoaWRkZW5cclxuICAgIH0sXHJcbiAgICBwcmVwYXJlU2VhcmNoOiBmdW5jdGlvbihzZWFyY2gpIHtcclxuICAgICAgaWYoIXNlYXJjaCkgcmV0dXJuXHJcbiAgICAgIHJldHVybiBmdXp6eXNvcnQucHJlcGFyZUxvd2VyQ29kZXMoc2VhcmNoKVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8vIEJlbG93IHRoaXMgcG9pbnQgaXMgb25seSBpbnRlcm5hbCBjb2RlXHJcbiAgICAvLyBCZWxvdyB0aGlzIHBvaW50IGlzIG9ubHkgaW50ZXJuYWwgY29kZVxyXG4gICAgLy8gQmVsb3cgdGhpcyBwb2ludCBpcyBvbmx5IGludGVybmFsIGNvZGVcclxuICAgIC8vIEJlbG93IHRoaXMgcG9pbnQgaXMgb25seSBpbnRlcm5hbCBjb2RlXHJcblxyXG5cclxuXHJcbiAgICBnZXRQcmVwYXJlZDogZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgIGlmKHRhcmdldC5sZW5ndGggPiA5OTkpIHJldHVybiBmdXp6eXNvcnQucHJlcGFyZSh0YXJnZXQpIC8vIGRvbid0IGNhY2hlIGh1Z2UgdGFyZ2V0c1xyXG4gICAgICB2YXIgdGFyZ2V0UHJlcGFyZWQgPSBwcmVwYXJlZENhY2hlLmdldCh0YXJnZXQpXHJcbiAgICAgIGlmKHRhcmdldFByZXBhcmVkICE9PSB1bmRlZmluZWQpIHJldHVybiB0YXJnZXRQcmVwYXJlZFxyXG4gICAgICB0YXJnZXRQcmVwYXJlZCA9IGZ1enp5c29ydC5wcmVwYXJlKHRhcmdldClcclxuICAgICAgcHJlcGFyZWRDYWNoZS5zZXQodGFyZ2V0LCB0YXJnZXRQcmVwYXJlZClcclxuICAgICAgcmV0dXJuIHRhcmdldFByZXBhcmVkXHJcbiAgICB9LFxyXG4gICAgZ2V0UHJlcGFyZWRTZWFyY2g6IGZ1bmN0aW9uKHNlYXJjaCkge1xyXG4gICAgICBpZihzZWFyY2gubGVuZ3RoID4gOTk5KSByZXR1cm4gZnV6enlzb3J0LnByZXBhcmVTZWFyY2goc2VhcmNoKSAvLyBkb24ndCBjYWNoZSBodWdlIHNlYXJjaGVzXHJcbiAgICAgIHZhciBzZWFyY2hQcmVwYXJlZCA9IHByZXBhcmVkU2VhcmNoQ2FjaGUuZ2V0KHNlYXJjaClcclxuICAgICAgaWYoc2VhcmNoUHJlcGFyZWQgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHNlYXJjaFByZXBhcmVkXHJcbiAgICAgIHNlYXJjaFByZXBhcmVkID0gZnV6enlzb3J0LnByZXBhcmVTZWFyY2goc2VhcmNoKVxyXG4gICAgICBwcmVwYXJlZFNlYXJjaENhY2hlLnNldChzZWFyY2gsIHNlYXJjaFByZXBhcmVkKVxyXG4gICAgICByZXR1cm4gc2VhcmNoUHJlcGFyZWRcclxuICAgIH0sXHJcblxyXG4gICAgYWxnb3JpdGhtOiBmdW5jdGlvbihzZWFyY2hMb3dlckNvZGVzLCBwcmVwYXJlZCwgc2VhcmNoTG93ZXJDb2RlKSB7XHJcbiAgICAgIHZhciB0YXJnZXRMb3dlckNvZGVzID0gcHJlcGFyZWQuX3RhcmdldExvd2VyQ29kZXNcclxuICAgICAgdmFyIHNlYXJjaExlbiA9IHNlYXJjaExvd2VyQ29kZXMubGVuZ3RoXHJcbiAgICAgIHZhciB0YXJnZXRMZW4gPSB0YXJnZXRMb3dlckNvZGVzLmxlbmd0aFxyXG4gICAgICB2YXIgc2VhcmNoSSA9IDAgLy8gd2hlcmUgd2UgYXRcclxuICAgICAgdmFyIHRhcmdldEkgPSAwIC8vIHdoZXJlIHlvdSBhdFxyXG4gICAgICB2YXIgdHlwb1NpbXBsZUkgPSAwXHJcbiAgICAgIHZhciBtYXRjaGVzU2ltcGxlTGVuID0gMFxyXG5cclxuICAgICAgLy8gdmVyeSBiYXNpYyBmdXp6eSBtYXRjaDsgdG8gcmVtb3ZlIG5vbi1tYXRjaGluZyB0YXJnZXRzIEFTQVAhXHJcbiAgICAgIC8vIHdhbGsgdGhyb3VnaCB0YXJnZXQuIGZpbmQgc2VxdWVudGlhbCBtYXRjaGVzLlxyXG4gICAgICAvLyBpZiBhbGwgY2hhcnMgYXJlbid0IGZvdW5kIHRoZW4gZXhpdFxyXG4gICAgICBmb3IoOzspIHtcclxuICAgICAgICB2YXIgaXNNYXRjaCA9IHNlYXJjaExvd2VyQ29kZSA9PT0gdGFyZ2V0TG93ZXJDb2Rlc1t0YXJnZXRJXVxyXG4gICAgICAgIGlmKGlzTWF0Y2gpIHtcclxuICAgICAgICAgIG1hdGNoZXNTaW1wbGVbbWF0Y2hlc1NpbXBsZUxlbisrXSA9IHRhcmdldElcclxuICAgICAgICAgICsrc2VhcmNoSTsgaWYoc2VhcmNoSSA9PT0gc2VhcmNoTGVuKSBicmVha1xyXG4gICAgICAgICAgc2VhcmNoTG93ZXJDb2RlID0gc2VhcmNoTG93ZXJDb2Rlc1t0eXBvU2ltcGxlST09PTA/c2VhcmNoSSA6ICh0eXBvU2ltcGxlST09PXNlYXJjaEk/c2VhcmNoSSsxIDogKHR5cG9TaW1wbGVJPT09c2VhcmNoSS0xP3NlYXJjaEktMSA6IHNlYXJjaEkpKV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICsrdGFyZ2V0STsgaWYodGFyZ2V0SSA+PSB0YXJnZXRMZW4pIHsgLy8gRmFpbGVkIHRvIGZpbmQgc2VhcmNoSVxyXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHR5cG8gb3IgZXhpdFxyXG4gICAgICAgICAgLy8gd2UgZ28gYXMgZmFyIGFzIHBvc3NpYmxlIGJlZm9yZSB0cnlpbmcgdG8gdHJhbnNwb3NlXHJcbiAgICAgICAgICAvLyB0aGVuIHdlIHRyYW5zcG9zZSBiYWNrd2FyZHMgdW50aWwgd2UgcmVhY2ggdGhlIGJlZ2lubmluZ1xyXG4gICAgICAgICAgZm9yKDs7KSB7XHJcbiAgICAgICAgICAgIGlmKHNlYXJjaEkgPD0gMSkgcmV0dXJuIG51bGwgLy8gbm90IGFsbG93ZWQgdG8gdHJhbnNwb3NlIGZpcnN0IGNoYXJcclxuICAgICAgICAgICAgaWYodHlwb1NpbXBsZUkgPT09IDApIHsgLy8gd2UgaGF2ZW4ndCB0cmllZCB0byB0cmFuc3Bvc2UgeWV0XHJcbiAgICAgICAgICAgICAgLS1zZWFyY2hJXHJcbiAgICAgICAgICAgICAgdmFyIHNlYXJjaExvd2VyQ29kZU5ldyA9IHNlYXJjaExvd2VyQ29kZXNbc2VhcmNoSV1cclxuICAgICAgICAgICAgICBpZihzZWFyY2hMb3dlckNvZGUgPT09IHNlYXJjaExvd2VyQ29kZU5ldykgY29udGludWUgLy8gZG9lc24ndCBtYWtlIHNlbnNlIHRvIHRyYW5zcG9zZSBhIHJlcGVhdCBjaGFyXHJcbiAgICAgICAgICAgICAgdHlwb1NpbXBsZUkgPSBzZWFyY2hJXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYodHlwb1NpbXBsZUkgPT09IDEpIHJldHVybiBudWxsIC8vIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGUgbGluZSBmb3IgdHJhbnNwb3NpbmdcclxuICAgICAgICAgICAgICAtLXR5cG9TaW1wbGVJXHJcbiAgICAgICAgICAgICAgc2VhcmNoSSA9IHR5cG9TaW1wbGVJXHJcbiAgICAgICAgICAgICAgc2VhcmNoTG93ZXJDb2RlID0gc2VhcmNoTG93ZXJDb2Rlc1tzZWFyY2hJICsgMV1cclxuICAgICAgICAgICAgICB2YXIgc2VhcmNoTG93ZXJDb2RlTmV3ID0gc2VhcmNoTG93ZXJDb2Rlc1tzZWFyY2hJXVxyXG4gICAgICAgICAgICAgIGlmKHNlYXJjaExvd2VyQ29kZSA9PT0gc2VhcmNoTG93ZXJDb2RlTmV3KSBjb250aW51ZSAvLyBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gdHJhbnNwb3NlIGEgcmVwZWF0IGNoYXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXRjaGVzU2ltcGxlTGVuID0gc2VhcmNoSVxyXG4gICAgICAgICAgICB0YXJnZXRJID0gbWF0Y2hlc1NpbXBsZVttYXRjaGVzU2ltcGxlTGVuIC0gMV0gKyAxXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc2VhcmNoSSA9IDBcclxuICAgICAgdmFyIHR5cG9TdHJpY3RJID0gMFxyXG4gICAgICB2YXIgc3VjY2Vzc1N0cmljdCA9IGZhbHNlXHJcbiAgICAgIHZhciBtYXRjaGVzU3RyaWN0TGVuID0gMFxyXG5cclxuICAgICAgdmFyIG5leHRCZWdpbm5pbmdJbmRleGVzID0gcHJlcGFyZWQuX25leHRCZWdpbm5pbmdJbmRleGVzXHJcbiAgICAgIGlmKG5leHRCZWdpbm5pbmdJbmRleGVzID09PSBudWxsKSBuZXh0QmVnaW5uaW5nSW5kZXhlcyA9IHByZXBhcmVkLl9uZXh0QmVnaW5uaW5nSW5kZXhlcyA9IGZ1enp5c29ydC5wcmVwYXJlTmV4dEJlZ2lubmluZ0luZGV4ZXMocHJlcGFyZWQudGFyZ2V0KVxyXG4gICAgICB2YXIgZmlyc3RQb3NzaWJsZUkgPSB0YXJnZXRJID0gbWF0Y2hlc1NpbXBsZVswXT09PTAgPyAwIDogbmV4dEJlZ2lubmluZ0luZGV4ZXNbbWF0Y2hlc1NpbXBsZVswXS0xXVxyXG5cclxuICAgICAgLy8gT3VyIHRhcmdldCBzdHJpbmcgc3VjY2Vzc2Z1bGx5IG1hdGNoZWQgYWxsIGNoYXJhY3RlcnMgaW4gc2VxdWVuY2UhXHJcbiAgICAgIC8vIExldCdzIHRyeSBhIG1vcmUgYWR2YW5jZWQgYW5kIHN0cmljdCB0ZXN0IHRvIGltcHJvdmUgdGhlIHNjb3JlXHJcbiAgICAgIC8vIG9ubHkgY291bnQgaXQgYXMgYSBtYXRjaCBpZiBpdCdzIGNvbnNlY3V0aXZlIG9yIGEgYmVnaW5uaW5nIGNoYXJhY3RlciFcclxuICAgICAgaWYodGFyZ2V0SSAhPT0gdGFyZ2V0TGVuKSBmb3IoOzspIHtcclxuICAgICAgICBpZih0YXJnZXRJID49IHRhcmdldExlbikge1xyXG4gICAgICAgICAgLy8gV2UgZmFpbGVkIHRvIGZpbmQgYSBnb29kIHNwb3QgZm9yIHRoaXMgc2VhcmNoIGNoYXIsIGdvIGJhY2sgdG8gdGhlIHByZXZpb3VzIHNlYXJjaCBjaGFyIGFuZCBmb3JjZSBpdCBmb3J3YXJkXHJcbiAgICAgICAgICBpZihzZWFyY2hJIDw9IDApIHsgLy8gV2UgZmFpbGVkIHRvIHB1c2ggY2hhcnMgZm9yd2FyZCBmb3IgYSBiZXR0ZXIgbWF0Y2hcclxuICAgICAgICAgICAgLy8gdHJhbnNwb3NlLCBzdGFydGluZyBmcm9tIHRoZSBiZWdpbm5pbmdcclxuICAgICAgICAgICAgKyt0eXBvU3RyaWN0STsgaWYodHlwb1N0cmljdEkgPiBzZWFyY2hMZW4tMikgYnJlYWtcclxuICAgICAgICAgICAgaWYoc2VhcmNoTG93ZXJDb2Rlc1t0eXBvU3RyaWN0SV0gPT09IHNlYXJjaExvd2VyQ29kZXNbdHlwb1N0cmljdEkrMV0pIGNvbnRpbnVlIC8vIGRvZXNuJ3QgbWFrZSBzZW5zZSB0byB0cmFuc3Bvc2UgYSByZXBlYXQgY2hhclxyXG4gICAgICAgICAgICB0YXJnZXRJID0gZmlyc3RQb3NzaWJsZUlcclxuICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAtLXNlYXJjaElcclxuICAgICAgICAgIHZhciBsYXN0TWF0Y2ggPSBtYXRjaGVzU3RyaWN0Wy0tbWF0Y2hlc1N0cmljdExlbl1cclxuICAgICAgICAgIHRhcmdldEkgPSBuZXh0QmVnaW5uaW5nSW5kZXhlc1tsYXN0TWF0Y2hdXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgaXNNYXRjaCA9IHNlYXJjaExvd2VyQ29kZXNbdHlwb1N0cmljdEk9PT0wP3NlYXJjaEkgOiAodHlwb1N0cmljdEk9PT1zZWFyY2hJP3NlYXJjaEkrMSA6ICh0eXBvU3RyaWN0ST09PXNlYXJjaEktMT9zZWFyY2hJLTEgOiBzZWFyY2hJKSldID09PSB0YXJnZXRMb3dlckNvZGVzW3RhcmdldEldXHJcbiAgICAgICAgICBpZihpc01hdGNoKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZXNTdHJpY3RbbWF0Y2hlc1N0cmljdExlbisrXSA9IHRhcmdldElcclxuICAgICAgICAgICAgKytzZWFyY2hJOyBpZihzZWFyY2hJID09PSBzZWFyY2hMZW4pIHsgc3VjY2Vzc1N0cmljdCA9IHRydWU7IGJyZWFrIH1cclxuICAgICAgICAgICAgKyt0YXJnZXRJXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YXJnZXRJID0gbmV4dEJlZ2lubmluZ0luZGV4ZXNbdGFyZ2V0SV1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHsgLy8gdGFsbHkgdXAgdGhlIHNjb3JlICYga2VlcCB0cmFjayBvZiBtYXRjaGVzIGZvciBoaWdobGlnaHRpbmcgbGF0ZXJcclxuICAgICAgICBpZihzdWNjZXNzU3RyaWN0KSB7IHZhciBtYXRjaGVzQmVzdCA9IG1hdGNoZXNTdHJpY3Q7IHZhciBtYXRjaGVzQmVzdExlbiA9IG1hdGNoZXNTdHJpY3RMZW4gfVxyXG4gICAgICAgIGVsc2UgeyB2YXIgbWF0Y2hlc0Jlc3QgPSBtYXRjaGVzU2ltcGxlOyB2YXIgbWF0Y2hlc0Jlc3RMZW4gPSBtYXRjaGVzU2ltcGxlTGVuIH1cclxuICAgICAgICB2YXIgc2NvcmUgPSAwXHJcbiAgICAgICAgdmFyIGxhc3RUYXJnZXRJID0gLTFcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VhcmNoTGVuOyArK2kpIHsgdmFyIHRhcmdldEkgPSBtYXRjaGVzQmVzdFtpXVxyXG4gICAgICAgICAgLy8gc2NvcmUgb25seSBnb2VzIGRvd24gaWYgdGhleSdyZSBub3QgY29uc2VjdXRpdmVcclxuICAgICAgICAgIGlmKGxhc3RUYXJnZXRJICE9PSB0YXJnZXRJIC0gMSkgc2NvcmUgLT0gdGFyZ2V0SVxyXG4gICAgICAgICAgbGFzdFRhcmdldEkgPSB0YXJnZXRJXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFzdWNjZXNzU3RyaWN0KSB7XHJcbiAgICAgICAgICBzY29yZSAqPSAxMDAwXHJcbiAgICAgICAgICBpZih0eXBvU2ltcGxlSSAhPT0gMCkgc2NvcmUgKz0gLTIwLyp0eXBvUGVuYWx0eSovXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmKHR5cG9TdHJpY3RJICE9PSAwKSBzY29yZSArPSAtMjAvKnR5cG9QZW5hbHR5Ki9cclxuICAgICAgICB9XHJcbiAgICAgICAgc2NvcmUgLT0gdGFyZ2V0TGVuIC0gc2VhcmNoTGVuXHJcbiAgICAgICAgcHJlcGFyZWQuc2NvcmUgPSBzY29yZVxyXG4gICAgICAgIHByZXBhcmVkLmluZGV4ZXMgPSBuZXcgQXJyYXkobWF0Y2hlc0Jlc3RMZW4pOyBmb3IodmFyIGkgPSBtYXRjaGVzQmVzdExlbiAtIDE7IGkgPj0gMDsgLS1pKSBwcmVwYXJlZC5pbmRleGVzW2ldID0gbWF0Y2hlc0Jlc3RbaV1cclxuXHJcbiAgICAgICAgcmV0dXJuIHByZXBhcmVkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYWxnb3JpdGhtTm9UeXBvOiBmdW5jdGlvbihzZWFyY2hMb3dlckNvZGVzLCBwcmVwYXJlZCwgc2VhcmNoTG93ZXJDb2RlKSB7XHJcbiAgICAgIHZhciB0YXJnZXRMb3dlckNvZGVzID0gcHJlcGFyZWQuX3RhcmdldExvd2VyQ29kZXNcclxuICAgICAgdmFyIHNlYXJjaExlbiA9IHNlYXJjaExvd2VyQ29kZXMubGVuZ3RoXHJcbiAgICAgIHZhciB0YXJnZXRMZW4gPSB0YXJnZXRMb3dlckNvZGVzLmxlbmd0aFxyXG4gICAgICB2YXIgc2VhcmNoSSA9IDAgLy8gd2hlcmUgd2UgYXRcclxuICAgICAgdmFyIHRhcmdldEkgPSAwIC8vIHdoZXJlIHlvdSBhdFxyXG4gICAgICB2YXIgbWF0Y2hlc1NpbXBsZUxlbiA9IDBcclxuXHJcbiAgICAgIC8vIHZlcnkgYmFzaWMgZnV6enkgbWF0Y2g7IHRvIHJlbW92ZSBub24tbWF0Y2hpbmcgdGFyZ2V0cyBBU0FQIVxyXG4gICAgICAvLyB3YWxrIHRocm91Z2ggdGFyZ2V0LiBmaW5kIHNlcXVlbnRpYWwgbWF0Y2hlcy5cclxuICAgICAgLy8gaWYgYWxsIGNoYXJzIGFyZW4ndCBmb3VuZCB0aGVuIGV4aXRcclxuICAgICAgZm9yKDs7KSB7XHJcbiAgICAgICAgdmFyIGlzTWF0Y2ggPSBzZWFyY2hMb3dlckNvZGUgPT09IHRhcmdldExvd2VyQ29kZXNbdGFyZ2V0SV1cclxuICAgICAgICBpZihpc01hdGNoKSB7XHJcbiAgICAgICAgICBtYXRjaGVzU2ltcGxlW21hdGNoZXNTaW1wbGVMZW4rK10gPSB0YXJnZXRJXHJcbiAgICAgICAgICArK3NlYXJjaEk7IGlmKHNlYXJjaEkgPT09IHNlYXJjaExlbikgYnJlYWtcclxuICAgICAgICAgIHNlYXJjaExvd2VyQ29kZSA9IHNlYXJjaExvd2VyQ29kZXNbc2VhcmNoSV1cclxuICAgICAgICB9XHJcbiAgICAgICAgKyt0YXJnZXRJOyBpZih0YXJnZXRJID49IHRhcmdldExlbikgcmV0dXJuIG51bGwgLy8gRmFpbGVkIHRvIGZpbmQgc2VhcmNoSVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc2VhcmNoSSA9IDBcclxuICAgICAgdmFyIHN1Y2Nlc3NTdHJpY3QgPSBmYWxzZVxyXG4gICAgICB2YXIgbWF0Y2hlc1N0cmljdExlbiA9IDBcclxuXHJcbiAgICAgIHZhciBuZXh0QmVnaW5uaW5nSW5kZXhlcyA9IHByZXBhcmVkLl9uZXh0QmVnaW5uaW5nSW5kZXhlc1xyXG4gICAgICBpZihuZXh0QmVnaW5uaW5nSW5kZXhlcyA9PT0gbnVsbCkgbmV4dEJlZ2lubmluZ0luZGV4ZXMgPSBwcmVwYXJlZC5fbmV4dEJlZ2lubmluZ0luZGV4ZXMgPSBmdXp6eXNvcnQucHJlcGFyZU5leHRCZWdpbm5pbmdJbmRleGVzKHByZXBhcmVkLnRhcmdldClcclxuICAgICAgdmFyIGZpcnN0UG9zc2libGVJID0gdGFyZ2V0SSA9IG1hdGNoZXNTaW1wbGVbMF09PT0wID8gMCA6IG5leHRCZWdpbm5pbmdJbmRleGVzW21hdGNoZXNTaW1wbGVbMF0tMV1cclxuXHJcbiAgICAgIC8vIE91ciB0YXJnZXQgc3RyaW5nIHN1Y2Nlc3NmdWxseSBtYXRjaGVkIGFsbCBjaGFyYWN0ZXJzIGluIHNlcXVlbmNlIVxyXG4gICAgICAvLyBMZXQncyB0cnkgYSBtb3JlIGFkdmFuY2VkIGFuZCBzdHJpY3QgdGVzdCB0byBpbXByb3ZlIHRoZSBzY29yZVxyXG4gICAgICAvLyBvbmx5IGNvdW50IGl0IGFzIGEgbWF0Y2ggaWYgaXQncyBjb25zZWN1dGl2ZSBvciBhIGJlZ2lubmluZyBjaGFyYWN0ZXIhXHJcbiAgICAgIGlmKHRhcmdldEkgIT09IHRhcmdldExlbikgZm9yKDs7KSB7XHJcbiAgICAgICAgaWYodGFyZ2V0SSA+PSB0YXJnZXRMZW4pIHtcclxuICAgICAgICAgIC8vIFdlIGZhaWxlZCB0byBmaW5kIGEgZ29vZCBzcG90IGZvciB0aGlzIHNlYXJjaCBjaGFyLCBnbyBiYWNrIHRvIHRoZSBwcmV2aW91cyBzZWFyY2ggY2hhciBhbmQgZm9yY2UgaXQgZm9yd2FyZFxyXG4gICAgICAgICAgaWYoc2VhcmNoSSA8PSAwKSBicmVhayAvLyBXZSBmYWlsZWQgdG8gcHVzaCBjaGFycyBmb3J3YXJkIGZvciBhIGJldHRlciBtYXRjaFxyXG5cclxuICAgICAgICAgIC0tc2VhcmNoSVxyXG4gICAgICAgICAgdmFyIGxhc3RNYXRjaCA9IG1hdGNoZXNTdHJpY3RbLS1tYXRjaGVzU3RyaWN0TGVuXVxyXG4gICAgICAgICAgdGFyZ2V0SSA9IG5leHRCZWdpbm5pbmdJbmRleGVzW2xhc3RNYXRjaF1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBpc01hdGNoID0gc2VhcmNoTG93ZXJDb2Rlc1tzZWFyY2hJXSA9PT0gdGFyZ2V0TG93ZXJDb2Rlc1t0YXJnZXRJXVxyXG4gICAgICAgICAgaWYoaXNNYXRjaCkge1xyXG4gICAgICAgICAgICBtYXRjaGVzU3RyaWN0W21hdGNoZXNTdHJpY3RMZW4rK10gPSB0YXJnZXRJXHJcbiAgICAgICAgICAgICsrc2VhcmNoSTsgaWYoc2VhcmNoSSA9PT0gc2VhcmNoTGVuKSB7IHN1Y2Nlc3NTdHJpY3QgPSB0cnVlOyBicmVhayB9XHJcbiAgICAgICAgICAgICsrdGFyZ2V0SVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGFyZ2V0SSA9IG5leHRCZWdpbm5pbmdJbmRleGVzW3RhcmdldEldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB7IC8vIHRhbGx5IHVwIHRoZSBzY29yZSAmIGtlZXAgdHJhY2sgb2YgbWF0Y2hlcyBmb3IgaGlnaGxpZ2h0aW5nIGxhdGVyXHJcbiAgICAgICAgaWYoc3VjY2Vzc1N0cmljdCkgeyB2YXIgbWF0Y2hlc0Jlc3QgPSBtYXRjaGVzU3RyaWN0OyB2YXIgbWF0Y2hlc0Jlc3RMZW4gPSBtYXRjaGVzU3RyaWN0TGVuIH1cclxuICAgICAgICBlbHNlIHsgdmFyIG1hdGNoZXNCZXN0ID0gbWF0Y2hlc1NpbXBsZTsgdmFyIG1hdGNoZXNCZXN0TGVuID0gbWF0Y2hlc1NpbXBsZUxlbiB9XHJcbiAgICAgICAgdmFyIHNjb3JlID0gMFxyXG4gICAgICAgIHZhciBsYXN0VGFyZ2V0SSA9IC0xXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlYXJjaExlbjsgKytpKSB7IHZhciB0YXJnZXRJID0gbWF0Y2hlc0Jlc3RbaV1cclxuICAgICAgICAgIC8vIHNjb3JlIG9ubHkgZ29lcyBkb3duIGlmIHRoZXkncmUgbm90IGNvbnNlY3V0aXZlXHJcbiAgICAgICAgICBpZihsYXN0VGFyZ2V0SSAhPT0gdGFyZ2V0SSAtIDEpIHNjb3JlIC09IHRhcmdldElcclxuICAgICAgICAgIGxhc3RUYXJnZXRJID0gdGFyZ2V0SVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighc3VjY2Vzc1N0cmljdCkgc2NvcmUgKj0gMTAwMFxyXG4gICAgICAgIHNjb3JlIC09IHRhcmdldExlbiAtIHNlYXJjaExlblxyXG4gICAgICAgIHByZXBhcmVkLnNjb3JlID0gc2NvcmVcclxuICAgICAgICBwcmVwYXJlZC5pbmRleGVzID0gbmV3IEFycmF5KG1hdGNoZXNCZXN0TGVuKTsgZm9yKHZhciBpID0gbWF0Y2hlc0Jlc3RMZW4gLSAxOyBpID49IDA7IC0taSkgcHJlcGFyZWQuaW5kZXhlc1tpXSA9IG1hdGNoZXNCZXN0W2ldXHJcblxyXG4gICAgICAgIHJldHVybiBwcmVwYXJlZFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHByZXBhcmVMb3dlckNvZGVzOiBmdW5jdGlvbihzdHIpIHtcclxuICAgICAgdmFyIHN0ckxlbiA9IHN0ci5sZW5ndGhcclxuICAgICAgdmFyIGxvd2VyQ29kZXMgPSBbXSAvLyBuZXcgQXJyYXkoc3RyTGVuKSAgICBzcGFyc2UgYXJyYXkgaXMgdG9vIHNsb3dcclxuICAgICAgdmFyIGxvd2VyID0gc3RyLnRvTG93ZXJDYXNlKClcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN0ckxlbjsgKytpKSBsb3dlckNvZGVzW2ldID0gbG93ZXIuY2hhckNvZGVBdChpKVxyXG4gICAgICByZXR1cm4gbG93ZXJDb2Rlc1xyXG4gICAgfSxcclxuICAgIHByZXBhcmVCZWdpbm5pbmdJbmRleGVzOiBmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgdmFyIHRhcmdldExlbiA9IHRhcmdldC5sZW5ndGhcclxuICAgICAgdmFyIGJlZ2lubmluZ0luZGV4ZXMgPSBbXTsgdmFyIGJlZ2lubmluZ0luZGV4ZXNMZW4gPSAwXHJcbiAgICAgIHZhciB3YXNVcHBlciA9IGZhbHNlXHJcbiAgICAgIHZhciB3YXNBbHBoYW51bSA9IGZhbHNlXHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0YXJnZXRMZW47ICsraSkge1xyXG4gICAgICAgIHZhciB0YXJnZXRDb2RlID0gdGFyZ2V0LmNoYXJDb2RlQXQoaSlcclxuICAgICAgICB2YXIgaXNVcHBlciA9IHRhcmdldENvZGU+PTY1JiZ0YXJnZXRDb2RlPD05MFxyXG4gICAgICAgIHZhciBpc0FscGhhbnVtID0gaXNVcHBlciB8fCB0YXJnZXRDb2RlPj05NyYmdGFyZ2V0Q29kZTw9MTIyIHx8IHRhcmdldENvZGU+PTQ4JiZ0YXJnZXRDb2RlPD01N1xyXG4gICAgICAgIHZhciBpc0JlZ2lubmluZyA9IGlzVXBwZXIgJiYgIXdhc1VwcGVyIHx8ICF3YXNBbHBoYW51bSB8fCAhaXNBbHBoYW51bVxyXG4gICAgICAgIHdhc1VwcGVyID0gaXNVcHBlclxyXG4gICAgICAgIHdhc0FscGhhbnVtID0gaXNBbHBoYW51bVxyXG4gICAgICAgIGlmKGlzQmVnaW5uaW5nKSBiZWdpbm5pbmdJbmRleGVzW2JlZ2lubmluZ0luZGV4ZXNMZW4rK10gPSBpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGJlZ2lubmluZ0luZGV4ZXNcclxuICAgIH0sXHJcbiAgICBwcmVwYXJlTmV4dEJlZ2lubmluZ0luZGV4ZXM6IGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICB2YXIgdGFyZ2V0TGVuID0gdGFyZ2V0Lmxlbmd0aFxyXG4gICAgICB2YXIgYmVnaW5uaW5nSW5kZXhlcyA9IGZ1enp5c29ydC5wcmVwYXJlQmVnaW5uaW5nSW5kZXhlcyh0YXJnZXQpXHJcbiAgICAgIHZhciBuZXh0QmVnaW5uaW5nSW5kZXhlcyA9IFtdIC8vIG5ldyBBcnJheSh0YXJnZXRMZW4pICAgICBzcGFyc2UgYXJyYXkgaXMgdG9vIHNsb3dcclxuICAgICAgdmFyIGxhc3RJc0JlZ2lubmluZyA9IGJlZ2lubmluZ0luZGV4ZXNbMF1cclxuICAgICAgdmFyIGxhc3RJc0JlZ2lubmluZ0kgPSAwXHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0YXJnZXRMZW47ICsraSkge1xyXG4gICAgICAgIGlmKGxhc3RJc0JlZ2lubmluZyA+IGkpIHtcclxuICAgICAgICAgIG5leHRCZWdpbm5pbmdJbmRleGVzW2ldID0gbGFzdElzQmVnaW5uaW5nXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxhc3RJc0JlZ2lubmluZyA9IGJlZ2lubmluZ0luZGV4ZXNbKytsYXN0SXNCZWdpbm5pbmdJXVxyXG4gICAgICAgICAgbmV4dEJlZ2lubmluZ0luZGV4ZXNbaV0gPSBsYXN0SXNCZWdpbm5pbmc9PT11bmRlZmluZWQgPyB0YXJnZXRMZW4gOiBsYXN0SXNCZWdpbm5pbmdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5leHRCZWdpbm5pbmdJbmRleGVzXHJcbiAgICB9LFxyXG5cclxuICAgIGNsZWFudXA6IGNsZWFudXAsXHJcbiAgICBuZXc6IGZ1enp5c29ydE5ldyxcclxuICB9XHJcbiAgcmV0dXJuIGZ1enp5c29ydFxyXG59IC8vIGZ1enp5c29ydE5ld1xyXG5cclxuLy8gVGhpcyBzdHVmZiBpcyBvdXRzaWRlIGZ1enp5c29ydE5ldywgYmVjYXVzZSBpdCdzIHNoYXJlZCB3aXRoIGluc3RhbmNlcyBvZiBmdXp6eXNvcnQubmV3KClcclxudmFyIGlzTm9kZSA9IHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJ1xyXG4vLyB2YXIgTUFYX0lOVCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXHJcbi8vIHZhciBNSU5fSU5UID0gTnVtYmVyLk1JTl9WQUxVRVxyXG52YXIgcHJlcGFyZWRDYWNoZSA9IG5ldyBNYXAoKVxyXG52YXIgcHJlcGFyZWRTZWFyY2hDYWNoZSA9IG5ldyBNYXAoKVxyXG52YXIgbm9SZXN1bHRzID0gW107IG5vUmVzdWx0cy50b3RhbCA9IDBcclxudmFyIG1hdGNoZXNTaW1wbGUgPSBbXTsgdmFyIG1hdGNoZXNTdHJpY3QgPSBbXVxyXG5mdW5jdGlvbiBjbGVhbnVwKCkgeyBwcmVwYXJlZENhY2hlLmNsZWFyKCk7IHByZXBhcmVkU2VhcmNoQ2FjaGUuY2xlYXIoKTsgbWF0Y2hlc1NpbXBsZSA9IFtdOyBtYXRjaGVzU3RyaWN0ID0gW10gfVxyXG5mdW5jdGlvbiBkZWZhdWx0U2NvcmVGbihhKSB7XHJcbiAgdmFyIG1heCA9IC05MDA3MTk5MjU0NzQwOTkxXHJcbiAgZm9yICh2YXIgaSA9IGEubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgIHZhciByZXN1bHQgPSBhW2ldOyBpZihyZXN1bHQgPT09IG51bGwpIGNvbnRpbnVlXHJcbiAgICB2YXIgc2NvcmUgPSByZXN1bHQuc2NvcmVcclxuICAgIGlmKHNjb3JlID4gbWF4KSBtYXggPSBzY29yZVxyXG4gIH1cclxuICBpZihtYXggPT09IC05MDA3MTk5MjU0NzQwOTkxKSByZXR1cm4gbnVsbFxyXG4gIHJldHVybiBtYXhcclxufVxyXG5cclxuLy8gcHJvcCA9ICdrZXknICAgICAgICAgICAgICAyLjVtcyBvcHRpbWl6ZWQgZm9yIHRoaXMgY2FzZSwgc2VlbXMgdG8gYmUgYWJvdXQgYXMgZmFzdCBhcyBkaXJlY3Qgb2JqW3Byb3BdXHJcbi8vIHByb3AgPSAna2V5MS5rZXkyJyAgICAgICAgMTBtc1xyXG4vLyBwcm9wID0gWydrZXkxJywgJ2tleTInXSAgIDI3bXNcclxuZnVuY3Rpb24gZ2V0VmFsdWUob2JqLCBwcm9wKSB7XHJcbiAgdmFyIHRtcCA9IG9ialtwcm9wXTsgaWYodG1wICE9PSB1bmRlZmluZWQpIHJldHVybiB0bXBcclxuICB2YXIgc2VncyA9IHByb3BcclxuICBpZighQXJyYXkuaXNBcnJheShwcm9wKSkgc2VncyA9IHByb3Auc3BsaXQoJy4nKVxyXG4gIHZhciBsZW4gPSBzZWdzLmxlbmd0aFxyXG4gIHZhciBpID0gLTFcclxuICB3aGlsZSAob2JqICYmICgrK2kgPCBsZW4pKSBvYmogPSBvYmpbc2Vnc1tpXV1cclxuICByZXR1cm4gb2JqXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzT2JqKHgpIHsgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyB9IC8vIGZhc3RlciBhcyBhIGZ1bmN0aW9uXHJcblxyXG4vLyBIYWNrZWQgdmVyc2lvbiBvZiBodHRwczovL2dpdGh1Yi5jb20vbGVtaXJlL0Zhc3RQcmlvcml0eVF1ZXVlLmpzXHJcbnZhciBmYXN0cHJpb3JpdHlxdWV1ZT1mdW5jdGlvbigpe3ZhciByPVtdLG89MCxlPXt9O2Z1bmN0aW9uIG4oKXtmb3IodmFyIGU9MCxuPXJbZV0sYz0xO2M8bzspe3ZhciBmPWMrMTtlPWMsZjxvJiZyW2ZdLnNjb3JlPHJbY10uc2NvcmUmJihlPWYpLHJbZS0xPj4xXT1yW2VdLGM9MSsoZTw8MSl9Zm9yKHZhciBhPWUtMT4+MTtlPjAmJm4uc2NvcmU8clthXS5zY29yZTthPShlPWEpLTE+PjEpcltlXT1yW2FdO3JbZV09bn1yZXR1cm4gZS5hZGQ9ZnVuY3Rpb24oZSl7dmFyIG49bztyW28rK109ZTtmb3IodmFyIGM9bi0xPj4xO24+MCYmZS5zY29yZTxyW2NdLnNjb3JlO2M9KG49YyktMT4+MSlyW25dPXJbY107cltuXT1lfSxlLnBvbGw9ZnVuY3Rpb24oKXtpZigwIT09byl7dmFyIGU9clswXTtyZXR1cm4gclswXT1yWy0tb10sbigpLGV9fSxlLnBlZWs9ZnVuY3Rpb24oZSl7aWYoMCE9PW8pcmV0dXJuIHJbMF19LGUucmVwbGFjZVRvcD1mdW5jdGlvbihvKXtyWzBdPW8sbigpfSxlfTtcclxudmFyIHEgPSBmYXN0cHJpb3JpdHlxdWV1ZSgpIC8vIHJldXNlIHRoaXMsIGV4Y2VwdCBmb3IgYXN5bmMsIGl0IG5lZWRzIHRvIG1ha2UgaXRzIG93blxyXG5cclxucmV0dXJuIGZ1enp5c29ydE5ldygpXHJcbn0pIC8vIFVNRFxyXG5cclxuLy8gVE9ETzogKHBlcmZvcm1hbmNlKSB3YXNtIHZlcnNpb24hP1xyXG5cclxuLy8gVE9ETzogKHBlcmZvcm1hbmNlKSBsYXlvdXQgbWVtb3J5IGluIGFuIG9wdGltYWwgd2F5IHRvIGdvIGZhc3QgYnkgYXZvaWRpbmcgY2FjaGUgbWlzc2VzXHJcblxyXG4vLyBUT0RPOiAocGVyZm9ybWFuY2UpIHByZXBhcmVkQ2FjaGUgaXMgYSBtZW1vcnkgbGVha1xyXG5cclxuLy8gVE9ETzogKGxpa2Ugc3VibGltZSkgYmFja3NsYXNoID09PSBmb3J3YXJkc2xhc2hcclxuXHJcbi8vIFRPRE86IChwZXJmb3JtYW5jZSkgaSBoYXZlIG5vIGlkZWEgaG93IHdlbGwgb3B0aXptaWVkIHRoZSBhbGxvd2luZyB0eXBvcyBhbGdvcml0aG0gaXNcclxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwidmFyIG5leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy9icm93c2VyLmpzJykubmV4dFRpY2s7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaW1tZWRpYXRlSWRzID0ge307XG52YXIgbmV4dEltbWVkaWF0ZUlkID0gMDtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHsgdGltZW91dC5jbG9zZSgpOyB9O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIFRoYXQncyBub3QgaG93IG5vZGUuanMgaW1wbGVtZW50cyBpdCBidXQgdGhlIGV4cG9zZWQgYXBpIGlzIHRoZSBzYW1lLlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBmdW5jdGlvbihmbikge1xuICB2YXIgaWQgPSBuZXh0SW1tZWRpYXRlSWQrKztcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGZhbHNlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIGltbWVkaWF0ZUlkc1tpZF0gPSB0cnVlO1xuXG4gIG5leHRUaWNrKGZ1bmN0aW9uIG9uTmV4dFRpY2soKSB7XG4gICAgaWYgKGltbWVkaWF0ZUlkc1tpZF0pIHtcbiAgICAgIC8vIGZuLmNhbGwoKSBpcyBmYXN0ZXIgc28gd2Ugb3B0aW1pemUgZm9yIHRoZSBjb21tb24gdXNlLWNhc2VcbiAgICAgIC8vIEBzZWUgaHR0cDovL2pzcGVyZi5jb20vY2FsbC1hcHBseS1zZWd1XG4gICAgICBpZiAoYXJncykge1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCk7XG4gICAgICB9XG4gICAgICAvLyBQcmV2ZW50IGlkcyBmcm9tIGxlYWtpbmdcbiAgICAgIGV4cG9ydHMuY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IHR5cGVvZiBjbGVhckltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gY2xlYXJJbW1lZGlhdGUgOiBmdW5jdGlvbihpZCkge1xuICBkZWxldGUgaW1tZWRpYXRlSWRzW2lkXTtcbn07Il19

//# sourceMappingURL=map/search.js.map
