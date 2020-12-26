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
    (0, _classCallCheck2["default"])(this, GhostSearch);
    this.check = false;
    var defaults = {
      url: window.location.origin,
      key: '',
      version: 'v3',
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

  (0, _createClass2["default"])(GhostSearch, [{
    key: "mergeDeep",
    value: function mergeDeep(target, source) {
      var _this = this;

      if (target && (0, _typeof2["default"])(target) === 'object' && !Array.isArray(target) && target !== null && source && (0, _typeof2["default"])(source) === 'object' && !Array.isArray(source) && source !== null) {
        Object.keys(source).forEach(function (key) {
          if (source[key] && (0, _typeof2["default"])(source[key]) === 'object' && !Array.isArray(source[key]) && source[key] !== null) {
            if (!target[key]) Object.assign(target, (0, _defineProperty2["default"])({}, key, {}));

            _this.mergeDeep(target[key], source[key]);
          } else {
            Object.assign(target, (0, _defineProperty2["default"])({}, key, source[key]));
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
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return "".concat(k, "=").concat(encodeURIComponent(v));
      }).join('&');
      var apiUrl = "".concat(this.url, "/ghost/api/").concat(this.version, "/content/").concat(this.api.resource, "/?key=").concat(this.key, "&").concat(encoded);

      var getApi = /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
          var response, data;
          return _regenerator["default"].wrap(function _callee$(_context) {
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
      })["catch"](function (err) {
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

      var results = _fuzzysort["default"].go(inputValue, data, {
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


  new _ghostSearch["default"](mySearchSettings);
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
},{}],4:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
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
},{}],6:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
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
},{}],9:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
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
},{}],11:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
},{}],12:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":4,"./iterableToArrayLimit":10,"./nonIterableRest":11,"./unsupportedIterableToArray":14}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
},{"./arrayLikeToArray":3}],15:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9saWIvZ2hvc3Qtc2VhcmNoLmpzIiwianMvc2VhcmNoLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlMaWtlVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Z1enp5c29ydC9mdXp6eXNvcnQuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTUE7O0FBTkE7O0FBRUE7QUFDQTtBQUNBO0FBR0E7SUFFTSxXO0FBQ0osdUJBQWEsSUFBYixFQUFtQjtBQUFBO0FBQ2pCLFNBQUssS0FBTCxHQUFhLEtBQWI7QUFFQSxRQUFNLFFBQVEsR0FBRztBQUNmLE1BQUEsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFQLENBQWdCLE1BRE47QUFFZixNQUFBLEdBQUcsRUFBRSxFQUZVO0FBR2YsTUFBQSxPQUFPLEVBQUUsSUFITTtBQUlmLE1BQUEsS0FBSyxFQUFFLGVBSlE7QUFLZixNQUFBLE9BQU8sRUFBRSxpQkFMTTtBQU1mLE1BQUEsWUFBWSxFQUFFLEVBTkM7QUFPZixNQUFBLFFBQVEsRUFBRSxrQkFBQSxNQUFNO0FBQUEsb0NBQWlCLE1BQU0sQ0FBQyxJQUF4Qiw0SkFBcUssTUFBTSxDQUFDLEtBQTVLO0FBQUEsT0FQRDtBQVFmLE1BQUEsT0FBTyxFQUFFO0FBQ1AsUUFBQSxJQUFJLEVBQUUsQ0FDSixPQURJLENBREM7QUFJUCxRQUFBLEtBQUssRUFBRSxFQUpBO0FBS1AsUUFBQSxTQUFTLEVBQUUsQ0FBQyxJQUxMO0FBTVAsUUFBQSxTQUFTLEVBQUU7QUFOSixPQVJNO0FBZ0JmLE1BQUEsR0FBRyxFQUFFO0FBQ0gsUUFBQSxRQUFRLEVBQUUsT0FEUDtBQUVILFFBQUEsVUFBVSxFQUFFO0FBQ1YsVUFBQSxLQUFLLEVBQUUsS0FERztBQUVWLFVBQUEsTUFBTSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FGRTtBQUdWLFVBQUEsTUFBTSxFQUFFLEVBSEU7QUFJVixVQUFBLE9BQU8sRUFBRSxFQUpDO0FBS1YsVUFBQSxLQUFLLEVBQUUsRUFMRztBQU1WLFVBQUEsT0FBTyxFQUFFLEVB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNWxCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogZ2xvYmFsIGZldGNoICovXG5cbi8qKlxuICogVGhhbmtzID0+IGh0dHBzOi8vZ2l0aHViLmNvbS9IYXVudGVkVGhlbWVzL2dob3N0LXNlYXJjaFxuICovXG5cbmltcG9ydCBmdXp6eXNvcnQgZnJvbSAnZnV6enlzb3J0J1xuLy8gY29uc3QgZnV6enlzb3J0ID0gcmVxdWlyZSgnZnV6enlzb3J0JylcblxuY2xhc3MgR2hvc3RTZWFyY2gge1xuICBjb25zdHJ1Y3RvciAoYXJncykge1xuICAgIHRoaXMuY2hlY2sgPSBmYWxzZVxuXG4gICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICBrZXk6ICcnLFxuICAgICAgdmVyc2lvbjogJ3YzJyxcbiAgICAgIGlucHV0OiAnI3NlYXJjaC1maWVsZCcsXG4gICAgICByZXN1bHRzOiAnI3NlYXJjaC1yZXN1bHRzJyxcbiAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICB0ZW1wbGF0ZTogcmVzdWx0ID0+IGA8YSBocmVmPVwiLyR7cmVzdWx0LnNsdWd9L1wiIGNsYXNzPVwiYmxvY2sgcHktMiBwci0zIHBsLTEwXCI+PHN2ZyBjbGFzcz1cImljb24gaWNvbi0tc2VhcmNoXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDotMjhweFwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXNlYXJjaFwiPjwvdXNlPjwvc3ZnPiAke3Jlc3VsdC50aXRsZX08L2E+YCxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAga2V5czogW1xuICAgICAgICAgICd0aXRsZSdcbiAgICAgICAgXSxcbiAgICAgICAgbGltaXQ6IDEwLFxuICAgICAgICB0aHJlc2hvbGQ6IC0zNTAwLFxuICAgICAgICBhbGxvd1R5cG86IGZhbHNlXG4gICAgICB9LFxuICAgICAgYXBpOiB7XG4gICAgICAgIHJlc291cmNlOiAncG9zdHMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgbGltaXQ6ICdhbGwnLFxuICAgICAgICAgIGZpZWxkczogWyd0aXRsZScsICdzbHVnJ10sXG4gICAgICAgICAgZmlsdGVyOiAnJyxcbiAgICAgICAgICBpbmNsdWRlOiAnJyxcbiAgICAgICAgICBvcmRlcjogJycsXG4gICAgICAgICAgZm9ybWF0czogJycsXG4gICAgICAgICAgcGFnZTogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGJlZm9yZURpc3BsYXk6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgICAgYWZ0ZXJEaXNwbGF5OiBmdW5jdGlvbiAocmVzdWx0cykgeyB9LFxuICAgICAgICBiZWZvcmVGZXRjaDogKCkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdpcy1sb2FkaW5nJyksXG4gICAgICAgIGFmdGVyRmV0Y2g6ICgpID0+IHNldFRpbWVvdXQoKCkgPT4geyBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWxvYWRpbmcnKSB9LCA0MDAwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1lcmdlZCA9IHRoaXMubWVyZ2VEZWVwKGRlZmF1bHRzLCBhcmdzKVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgbWVyZ2VkKVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBtZXJnZURlZXAgKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKCh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiB0YXJnZXQgIT09IG51bGwpICYmIChzb3VyY2UgJiYgdHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlKSAmJiBzb3VyY2UgIT09IG51bGwpKSB7XG4gICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHNvdXJjZVtrZXldICYmIHR5cGVvZiBzb3VyY2Vba2V5XSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlW2tleV0pICYmIHNvdXJjZVtrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKCF0YXJnZXRba2V5XSkgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHsgW2tleV06IHt9IH0pXG4gICAgICAgICAgdGhpcy5tZXJnZURlZXAodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCB7IFtrZXldOiBzb3VyY2Vba2V5XSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cblxuICBmZXRjaCAoKSB7XG4gICAgdGhpcy5vbi5iZWZvcmVGZXRjaCgpXG5cbiAgICAvLyBjb25zdCBnaG9zdEFQSSA9IG5ldyBHaG9zdENvbnRlbnRBUEkoe1xuICAgIC8vICAgdXJsOiB0aGlzLnVybCxcbiAgICAvLyAgIGtleTogdGhpcy5rZXksXG4gICAgLy8gICB2ZXJzaW9uOiB0aGlzLnZlcnNpb25cbiAgICAvLyB9KVxuXG4gICAgY29uc3QgYnJvd3NlID0ge31cbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gdGhpcy5hcGkucGFyYW1ldGVyc1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcGFyYW1ldGVycykge1xuICAgICAgaWYgKHBhcmFtZXRlcnNba2V5XSAhPT0gJycpIHtcbiAgICAgICAgYnJvd3NlW2tleV0gPSBwYXJhbWV0ZXJzW2tleV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbmNvZGVkID0gT2JqZWN0LmVudHJpZXMoYnJvd3NlKS5tYXAoKFtrLCB2XSkgPT4gYCR7a309JHtlbmNvZGVVUklDb21wb25lbnQodil9YCkuam9pbignJicpXG4gICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy51cmx9L2dob3N0L2FwaS8ke3RoaXMudmVyc2lvbn0vY29udGVudC8ke3RoaXMuYXBpLnJlc291cmNlfS8/a2V5PSR7dGhpcy5rZXl9JiR7ZW5jb2RlZH1gXG5cbiAgICBjb25zdCBnZXRBcGkgPSBhc3luYyB1cmwgPT4ge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cblxuICAgIGdldEFwaShhcGlVcmwpXG4gICAgICAudGhlbihkYXRhID0+IHRoaXMuc2VhcmNoKGRhdGFbdGhpcy5hcGkucmVzb3VyY2VdKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKVxuXG4gICAgLy8gZ2hvc3RBUElbdGhpcy5hcGkucmVzb3VyY2VdXG4gICAgLy8gICAuYnJvd3NlKGJyb3dzZSlcbiAgICAvLyAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgLy8gICAgIHRoaXMuc2VhcmNoKGRhdGEpXG4gICAgLy8gICB9KVxuICAgIC8vICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgLy8gICB9KVxuICB9XG5cbiAgY3JlYXRlRWxlbWVudEZyb21IVE1MIChodG1sU3RyaW5nKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbFN0cmluZy50cmltKClcbiAgICByZXR1cm4gZGl2LmZpcnN0Q2hpbGRcbiAgfVxuXG4gIGRpc3BsYXlSZXN1bHRzIChkYXRhKSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKVswXS5maXJzdENoaWxkICE9PSBudWxsICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKVswXS5maXJzdENoaWxkICE9PSAnJykge1xuICAgICAgd2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKVswXS5maXJzdENoaWxkKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKVswXS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVzdWx0cylbMF0uZmlyc3RDaGlsZClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgaW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dClbMF0udmFsdWVcbiAgICBpZiAodGhpcy5kZWZhdWx0VmFsdWUgIT09ICcnKSB7XG4gICAgICBpbnB1dFZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0cyA9IGZ1enp5c29ydC5nbyhpbnB1dFZhbHVlLCBkYXRhLCB7XG4gICAgICBrZXlzOiB0aGlzLm9wdGlvbnMua2V5cyxcbiAgICAgIGxpbWl0OiB0aGlzLm9wdGlvbnMubGltaXQsXG4gICAgICBhbGxvd1R5cG86IHRoaXMub3B0aW9ucy5hbGxvd1R5cG8sXG4gICAgICB0aHJlc2hvbGQ6IHRoaXMub3B0aW9ucy50aHJlc2hvbGRcbiAgICB9KVxuICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdHMpIHtcbiAgICAgIGlmIChrZXkgPCByZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVzdWx0cylbMF0uYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVFbGVtZW50RnJvbUhUTUwodGhpcy50ZW1wbGF0ZShyZXN1bHRzW2tleV0ub2JqKSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vbi5hZnRlckRpc3BsYXkocmVzdWx0cylcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9ICcnXG4gIH1cblxuICBzZWFyY2ggKGRhdGEpIHtcbiAgICB0aGlzLm9uLmFmdGVyRmV0Y2goZGF0YSlcbiAgICB0aGlzLmNoZWNrID0gdHJ1ZVxuXG4gICAgaWYgKHRoaXMuZGVmYXVsdFZhbHVlICE9PSAnJykge1xuICAgICAgdGhpcy5vbi5iZWZvcmVEaXNwbGF5KClcbiAgICAgIHRoaXMuZGlzcGxheVJlc3VsdHMoZGF0YSlcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuaW5wdXQpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xuICAgICAgdGhpcy5vbi5iZWZvcmVEaXNwbGF5KClcbiAgICAgIHRoaXMuZGlzcGxheVJlc3VsdHMoZGF0YSlcbiAgICB9KVxuICB9XG5cbiAgY2hlY2tBcmdzICgpIHtcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dCkubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLmxvZygnSW5wdXQgbm90IGZvdW5kLicpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKS5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRzIG5vdCBmb3VuZC4nKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHRoaXMudXJsID09PSAnJykge1xuICAgICAgY29uc29sZS5sb2coJ0NvbnRlbnQgQVBJIENsaWVudCBMaWJyYXJ5IGhvc3QgbWlzc2luZy4gUGxlYXNlIHNldCB0aGUgaG9zdC4gTXVzdCBub3QgZW5kIGluIGEgdHJhaWxpbmcgc2xhc2guJylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICh0aGlzLmtleSA9PT0gJycpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdDb250ZW50IEFQSSBDbGllbnQgTGlicmFyeSBrZXkgbWlzc2luZy4gUGxlYXNlIHNldCB0aGUga2V5LiBIZXggc3RyaW5nIGNvcGllZCBmcm9tIHRoZSBcIkludGVncmF0aW9uc1wiIHNjcmVlbiBpbiBHaG9zdCBBZG1pbi4nKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHZhbGlkYXRlICgpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tBcmdzKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGUoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVmYXVsdFZhbHVlICE9PSAnJykge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmlucHV0KVswXS52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlXG4gICAgICB3aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2spIHtcbiAgICAgICAgICB0aGlzLmZldGNoKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dClbMF0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuY2hlY2spIHtcbiAgICAgICAgdGhpcy5mZXRjaCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKiBFeHBvcnQgQ2xhc3MgKi9cbm1vZHVsZS5leHBvcnRzID0gR2hvc3RTZWFyY2hcbiIsIi8qIGdsb2JhbCBzZWFyY2hTZXR0aW5ncyAqL1xuXG5pbXBvcnQgR2hvc3RTZWFyY2ggZnJvbSAnLi9saWIvZ2hvc3Qtc2VhcmNoJ1xuXG4oZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gIGNvbnN0ICRib2R5ID0gZG9jdW1lbnQuYm9keVxuICBjb25zdCAkaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWZpZWxkJylcbiAgY29uc3QgJHJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdHMnKVxuICBjb25zdCAkc2VhcmNoTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zZWFyY2gtbWVzc2FnZScpXG5cbiAgY29uc3QgY2xhc3NJc0FjdGl2ZSA9ICdpcy1hY3RpdmUnXG5cbiAgbGV0IGFsbFNlYXJjaExpbmtzTGVuZ3RoID0gMFxuXG4gIGxldCBzZWFyY2hSZXN1bHRzSGVpZ2h0ID0ge1xuICAgIG91dGVyOiAwLFxuICAgIHNjcm9sbDogMFxuICB9XG5cbiAgLy8gU0hvdyBpY29uIHNlYXJjaCBpbiBoZWFkZXJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtkYXRhLXRhcmdldD1tb2RhbC1zZWFyY2hdJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcblxuICAvLyBWYXJpYWJsZSBmb3Igc2VhcmNoXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3QgYWZ0ZXJEaXNwbGF5U2VhcmNoID0gcmVzdWx0cyA9PiB7XG4gICAgLy8gQWN0aXZlIGNsYXNzIHRvIGxpbmsgc2VhcmNoXG4gICAgc2VhcmNoUmVzdWx0QWN0aXZlKClcblxuICAgIGFsbFNlYXJjaExpbmtzTGVuZ3RoID0gcmVzdWx0cy5sZW5ndGhcblxuICAgIHNlYXJjaFJlc3VsdHNIZWlnaHQgPSB7XG4gICAgICBvdXRlcjogJHJlc3VsdHMub2Zmc2V0SGVpZ2h0LFxuICAgICAgc2Nyb2xsOiAkcmVzdWx0cy5zY3JvbGxIZWlnaHRcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0cy50b3RhbCA9PT0gMCAmJiAkaW5wdXQudmFsdWUgIT09ICcnKSB7XG4gICAgICAkc2VhcmNoTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgJGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG15U2VhcmNoS2V5KVxuICAgIH0gZWxzZSB7XG4gICAgICAkc2VhcmNoTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgJGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG15U2VhcmNoS2V5KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG15U2VhcmNoU2V0dGluZ3MgPSB7IG9uOiB7IGFmdGVyRGlzcGxheTogcmVzdWx0cyA9PiBhZnRlckRpc3BsYXlTZWFyY2gocmVzdWx0cykgfSB9XG5cbiAgLy8gam9pbiB1c2VyIHNldHRpbmdzXG4gIE9iamVjdC5hc3NpZ24obXlTZWFyY2hTZXR0aW5ncywgc2VhcmNoU2V0dGluZ3MpXG5cbiAgLy8gd2hlbiB0aGUgRW50ZXIga2V5IGlzIHByZXNzZWRcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgZnVuY3Rpb24gZW50ZXJLZXkgKCkge1xuICAgIGNvbnN0IGxpbmsgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yKGBhLiR7Y2xhc3NJc0FjdGl2ZX1gKVxuICAgIGxpbmsgJiYgbGluay5jbGljaygpXG4gIH1cblxuICAvLyBBdHRlbmRpbmcgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgc2VhcmNoIGxpbmtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgZnVuY3Rpb24gc2VhcmNoUmVzdWx0QWN0aXZlIChpbmRleCwgdXBEb3duKSB7XG4gICAgaW5kZXggPSBpbmRleCB8fCAwXG4gICAgdXBEb3duID0gdXBEb3duIHx8ICd1cCdcblxuICAgIGNvbnN0IGFsbFNlYXJjaExpbmtzID0gJHJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnYScpXG5cbiAgICAvLyBSZXR1cm4gaWYgdGhlcmUgYXJlIG5vIHJlc3VsdHNcbiAgICBpZiAoIWFsbFNlYXJjaExpbmtzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICAvLyBSZW1vdmUgQWxsIGNsYXNzIEFjdGl2ZVxuICAgIGFsbFNlYXJjaExpbmtzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NJc0FjdGl2ZSkpXG5cbiAgICAvLyBBZGQgY2xhc3MgYWN0aXZlXG4gICAgYWxsU2VhcmNoTGlua3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoY2xhc3NJc0FjdGl2ZSlcblxuICAgIC8vIFNjcm9sbCBmb3IgcmVzdWx0cyBib3hcbiAgICBjb25zdCBsaW5rT2ZmU2V0VG9wID0gYWxsU2VhcmNoTGlua3NbaW5kZXhdLm9mZnNldFRvcFxuICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9IDBcblxuICAgIHVwRG93biA9PT0gJ2Rvd24nICYmIGxpbmtPZmZTZXRUb3AgPiBzZWFyY2hSZXN1bHRzSGVpZ2h0Lm91dGVyIC8gMiA/IHNjcm9sbFBvc2l0aW9uID0gbGlua09mZlNldFRvcCAtIHNlYXJjaFJlc3VsdHNIZWlnaHQub3V0ZXIgLyAyIDogdXBEb3duID09PSAndXAnICYmIChzY3JvbGxQb3NpdGlvbiA9IGxpbmtPZmZTZXRUb3AgPCBzZWFyY2hSZXN1bHRzSGVpZ2h0LnNjcm9sbCAtIHNlYXJjaFJlc3VsdHNIZWlnaHQub3V0ZXIgLyAyID8gbGlua09mZlNldFRvcCAtIHNlYXJjaFJlc3VsdHNIZWlnaHQub3V0ZXIgLyAyIDogc2VhcmNoUmVzdWx0c0hlaWdodC5zY3JvbGwpXG5cbiAgICAkcmVzdWx0cy5zY3JvbGxUbygwLCBzY3JvbGxQb3NpdGlvbilcbiAgfVxuXG4gIC8vIFJlYWN0ZWQgdG8gdGhlIHVwIG9yIGRvd24ga2V5c1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBmdW5jdGlvbiBhcnJvd0tleVVwRG93biAoa2V5TnVtYmVyKSB7XG4gICAgbGV0IHVwRG93blxuICAgIGxldCBpbmRleFRoZUxpbmsgPSAwXG5cbiAgICBjb25zdCByZXN1bHRBY3RpdmUgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yKCcuaXMtYWN0aXZlJylcblxuICAgIGlmIChyZXN1bHRBY3RpdmUpIHtcbiAgICAgIGluZGV4VGhlTGluayA9IFtdLnNsaWNlLmNhbGwocmVzdWx0QWN0aXZlLnBhcmVudE5vZGUuY2hpbGRyZW4pLmluZGV4T2YocmVzdWx0QWN0aXZlKVxuICAgIH1cblxuICAgICRpbnB1dC5ibHVyKClcblxuICAgIC8vIDM4ID09PSBVUFxuICAgIGlmIChrZXlOdW1iZXIgPT09IDM4KSB7XG4gICAgICB1cERvd24gPSAndXAnXG5cbiAgICAgIGlmIChpbmRleFRoZUxpbmsgPD0gMCkge1xuICAgICAgICAkaW5wdXQuZm9jdXMoKVxuICAgICAgICBpbmRleFRoZUxpbmsgPSAwXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleFRoZUxpbmsgLT0gMVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1cERvd24gPSAnZG93bidcblxuICAgICAgaWYgKGluZGV4VGhlTGluayA+PSBhbGxTZWFyY2hMaW5rc0xlbmd0aCAtIDEpIHtcbiAgICAgICAgaW5kZXhUaGVMaW5rID0gMFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXhUaGVMaW5rICs9IDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZWFyY2hSZXN1bHRBY3RpdmUoaW5kZXhUaGVMaW5rLCB1cERvd24pXG4gIH1cblxuICAvLyBBZGRpbmcgZnVuY3Rpb25zIHRvIHRoZSBrZXlzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGZ1bmN0aW9uIG15U2VhcmNoS2V5IChlKSB7XG4gICAgY29uc3Qga2V5TnVtYmVyID0gZS5rZXlDb2RlXG5cbiAgICAvKipcbiAgICAgICogMzggPT4gVXBcbiAgICAgICogNDAgPT4gZG93blxuICAgICAgKiAxMyA9PiBlbnRlclxuICAgICAgKiovXG5cbiAgICBpZiAoa2V5TnVtYmVyID09PSAxMykge1xuICAgICAgJGlucHV0LmJsdXIoKVxuICAgICAgZW50ZXJLZXkoKVxuICAgIH0gZWxzZSBpZiAoa2V5TnVtYmVyID09PSAzOCB8fCBrZXlOdW1iZXIgPT09IDQwKSB7XG4gICAgICBhcnJvd0tleVVwRG93bihrZXlOdW1iZXIpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICAvLyBTZWFyY2hcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tbmV3ICovXG4gIG5ldyBHaG9zdFNlYXJjaChteVNlYXJjaFNldHRpbmdzKVxufSkoZG9jdW1lbnQpXG4iLCJmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5TGlrZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlczsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsInZhciBhcnJheUxpa2VUb0FycmF5ID0gcmVxdWlyZShcIi4vYXJyYXlMaWtlVG9BcnJheVwiKTtcblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsIi8qXHJcbldIQVQ6IFN1YmxpbWVUZXh0LWxpa2UgRnV6enkgU2VhcmNoXHJcblxyXG5VU0FHRTpcclxuICBmdXp6eXNvcnQuc2luZ2xlKCdmcycsICdGdXp6eSBTZWFyY2gnKSAvLyB7c2NvcmU6IC0xNn1cclxuICBmdXp6eXNvcnQuc2luZ2xlKCd0ZXN0JywgJ3Rlc3QnKSAvLyB7c2NvcmU6IDB9XHJcbiAgZnV6enlzb3J0LnNpbmdsZSgnZG9lc250IGV4aXN0JywgJ3RhcmdldCcpIC8vIG51bGxcclxuXHJcbiAgZnV6enlzb3J0LmdvKCdtcicsIFsnTW9uaXRvci5jcHAnLCAnTWVzaFJlbmRlcmVyLmNwcCddKVxyXG4gIC8vIFt7c2NvcmU6IC0xOCwgdGFyZ2V0OiBcIk1lc2hSZW5kZXJlci5jcHBcIn0sIHtzY29yZTogLTYwMDksIHRhcmdldDogXCJNb25pdG9yLmNwcFwifV1cclxuXHJcbiAgZnV6enlzb3J0LmhpZ2hsaWdodChmdXp6eXNvcnQuc2luZ2xlKCdmcycsICdGdXp6eSBTZWFyY2gnKSwgJzxiPicsICc8L2I+JylcclxuICAvLyA8Yj5GPC9iPnV6enkgPGI+UzwvYj5lYXJjaFxyXG4qL1xyXG5cclxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pIGZvciBmdXp6eXNvcnRcclxuOyhmdW5jdGlvbihyb290LCBVTUQpIHtcclxuICBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShbXSwgVU1EKVxyXG4gIGVsc2UgaWYodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gVU1EKClcclxuICBlbHNlIHJvb3QuZnV6enlzb3J0ID0gVU1EKClcclxufSkodGhpcywgZnVuY3Rpb24gVU1EKCkgeyBmdW5jdGlvbiBmdXp6eXNvcnROZXcoaW5zdGFuY2VPcHRpb25zKSB7XHJcblxyXG4gIHZhciBmdXp6eXNvcnQgPSB7XHJcblxyXG4gICAgc2luZ2xlOiBmdW5jdGlvbihzZWFyY2gsIHRhcmdldCwgb3B0aW9ucykge1xyXG4gICAgICBpZighc2VhcmNoKSByZXR1cm4gbnVsbFxyXG4gICAgICBpZighaXNPYmooc2VhcmNoKSkgc2VhcmNoID0gZnV6enlzb3J0LmdldFByZXBhcmVkU2VhcmNoKHNlYXJjaClcclxuXHJcbiAgICAgIGlmKCF0YXJnZXQpIHJldHVybiBudWxsXHJcbiAgICAgIGlmKCFpc09iaih0YXJnZXQpKSB0YXJnZXQgPSBmdXp6eXNvcnQuZ2V0UHJlcGFyZWQodGFyZ2V0KVxyXG5cclxuICAgICAgdmFyIGFsbG93VHlwbyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBvcHRpb25zLmFsbG93VHlwb1xyXG4gICAgICAgIDogaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBpbnN0YW5jZU9wdGlvbnMuYWxsb3dUeXBvXHJcbiAgICAgICAgOiB0cnVlXHJcbiAgICAgIHZhciBhbGdvcml0aG0gPSBhbGxvd1R5cG8gPyBmdXp6eXNvcnQuYWxnb3JpdGhtIDogZnV6enlzb3J0LmFsZ29yaXRobU5vVHlwb1xyXG4gICAgICByZXR1cm4gYWxnb3JpdGhtKHNlYXJjaCwgdGFyZ2V0LCBzZWFyY2hbMF0pXHJcbiAgICAgIC8vIHZhciB0aHJlc2hvbGQgPSBvcHRpb25zICYmIG9wdGlvbnMudGhyZXNob2xkIHx8IGluc3RhbmNlT3B0aW9ucyAmJiBpbnN0YW5jZU9wdGlvbnMudGhyZXNob2xkIHx8IC05MDA3MTk5MjU0NzQwOTkxXHJcbiAgICAgIC8vIHZhciByZXN1bHQgPSBhbGdvcml0aG0oc2VhcmNoLCB0YXJnZXQsIHNlYXJjaFswXSlcclxuICAgICAgLy8gaWYocmVzdWx0ID09PSBudWxsKSByZXR1cm4gbnVsbFxyXG4gICAgICAvLyBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIHJldHVybiBudWxsXHJcbiAgICAgIC8vIHJldHVybiByZXN1bHRcclxuICAgIH0sXHJcblxyXG4gICAgZ286IGZ1bmN0aW9uKHNlYXJjaCwgdGFyZ2V0cywgb3B0aW9ucykge1xyXG4gICAgICBpZighc2VhcmNoKSByZXR1cm4gbm9SZXN1bHRzXHJcbiAgICAgIHNlYXJjaCA9IGZ1enp5c29ydC5wcmVwYXJlU2VhcmNoKHNlYXJjaClcclxuICAgICAgdmFyIHNlYXJjaExvd2VyQ29kZSA9IHNlYXJjaFswXVxyXG5cclxuICAgICAgdmFyIHRocmVzaG9sZCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aHJlc2hvbGQgfHwgaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy50aHJlc2hvbGQgfHwgLTkwMDcxOTkyNTQ3NDA5OTFcclxuICAgICAgdmFyIGxpbWl0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmxpbWl0IHx8IGluc3RhbmNlT3B0aW9ucyAmJiBpbnN0YW5jZU9wdGlvbnMubGltaXQgfHwgOTAwNzE5OTI1NDc0MDk5MVxyXG4gICAgICB2YXIgYWxsb3dUeXBvID0gb3B0aW9ucyAmJiBvcHRpb25zLmFsbG93VHlwbyE9PXVuZGVmaW5lZCA/IG9wdGlvbnMuYWxsb3dUeXBvXHJcbiAgICAgICAgOiBpbnN0YW5jZU9wdGlvbnMgJiYgaW5zdGFuY2VPcHRpb25zLmFsbG93VHlwbyE9PXVuZGVmaW5lZCA/IGluc3RhbmNlT3B0aW9ucy5hbGxvd1R5cG9cclxuICAgICAgICA6IHRydWVcclxuICAgICAgdmFyIGFsZ29yaXRobSA9IGFsbG93VHlwbyA/IGZ1enp5c29ydC5hbGdvcml0aG0gOiBmdXp6eXNvcnQuYWxnb3JpdGhtTm9UeXBvXHJcbiAgICAgIHZhciByZXN1bHRzTGVuID0gMDsgdmFyIGxpbWl0ZWRDb3VudCA9IDBcclxuICAgICAgdmFyIHRhcmdldHNMZW4gPSB0YXJnZXRzLmxlbmd0aFxyXG5cclxuICAgICAgLy8gVGhpcyBjb2RlIGlzIGNvcHkvcGFzdGVkIDMgdGltZXMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgW29wdGlvbnMua2V5cywgb3B0aW9ucy5rZXksIG5vIGtleXNdXHJcblxyXG4gICAgICAvLyBvcHRpb25zLmtleXNcclxuICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmtleXMpIHtcclxuICAgICAgICB2YXIgc2NvcmVGbiA9IG9wdGlvbnMuc2NvcmVGbiB8fCBkZWZhdWx0U2NvcmVGblxyXG4gICAgICAgIHZhciBrZXlzID0gb3B0aW9ucy5rZXlzXHJcbiAgICAgICAgdmFyIGtleXNMZW4gPSBrZXlzLmxlbmd0aFxyXG4gICAgICAgIGZvcih2YXIgaSA9IHRhcmdldHNMZW4gLSAxOyBpID49IDA7IC0taSkgeyB2YXIgb2JqID0gdGFyZ2V0c1tpXVxyXG4gICAgICAgICAgdmFyIG9ialJlc3VsdHMgPSBuZXcgQXJyYXkoa2V5c0xlbilcclxuICAgICAgICAgIGZvciAodmFyIGtleUkgPSBrZXlzTGVuIC0gMTsga2V5SSA+PSAwOyAtLWtleUkpIHtcclxuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNba2V5SV1cclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGdldFZhbHVlKG9iaiwga2V5KVxyXG4gICAgICAgICAgICBpZighdGFyZ2V0KSB7IG9ialJlc3VsdHNba2V5SV0gPSBudWxsOyBjb250aW51ZSB9XHJcbiAgICAgICAgICAgIGlmKCFpc09iaih0YXJnZXQpKSB0YXJnZXQgPSBmdXp6eXNvcnQuZ2V0UHJlcGFyZWQodGFyZ2V0KVxyXG5cclxuICAgICAgICAgICAgb2JqUmVzdWx0c1trZXlJXSA9IGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoTG93ZXJDb2RlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgb2JqUmVzdWx0cy5vYmogPSBvYmogLy8gYmVmb3JlIHNjb3JlRm4gc28gc2NvcmVGbiBjYW4gdXNlIGl0XHJcbiAgICAgICAgICB2YXIgc2NvcmUgPSBzY29yZUZuKG9ialJlc3VsdHMpXHJcbiAgICAgICAgICBpZihzY29yZSA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgIGlmKHNjb3JlIDwgdGhyZXNob2xkKSBjb250aW51ZVxyXG4gICAgICAgICAgb2JqUmVzdWx0cy5zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgICBpZihyZXN1bHRzTGVuIDwgbGltaXQpIHsgcS5hZGQob2JqUmVzdWx0cyk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgKytsaW1pdGVkQ291bnRcclxuICAgICAgICAgICAgaWYoc2NvcmUgPiBxLnBlZWsoKS5zY29yZSkgcS5yZXBsYWNlVG9wKG9ialJlc3VsdHMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gb3B0aW9ucy5rZXlcclxuICAgICAgfSBlbHNlIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5rZXkpIHtcclxuICAgICAgICB2YXIga2V5ID0gb3B0aW9ucy5rZXlcclxuICAgICAgICBmb3IodmFyIGkgPSB0YXJnZXRzTGVuIC0gMTsgaSA+PSAwOyAtLWkpIHsgdmFyIG9iaiA9IHRhcmdldHNbaV1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBnZXRWYWx1ZShvYmosIGtleSlcclxuICAgICAgICAgIGlmKCF0YXJnZXQpIGNvbnRpbnVlXHJcbiAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gYWxnb3JpdGhtKHNlYXJjaCwgdGFyZ2V0LCBzZWFyY2hMb3dlckNvZGUpXHJcbiAgICAgICAgICBpZihyZXN1bHQgPT09IG51bGwpIGNvbnRpbnVlXHJcbiAgICAgICAgICBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgICAgLy8gaGF2ZSB0byBjbG9uZSByZXN1bHQgc28gZHVwbGljYXRlIHRhcmdldHMgZnJvbSBkaWZmZXJlbnQgb2JqIGNhbiBlYWNoIHJlZmVyZW5jZSB0aGUgY29ycmVjdCBvYmpcclxuICAgICAgICAgIHJlc3VsdCA9IHt0YXJnZXQ6cmVzdWx0LnRhcmdldCwgX3RhcmdldExvd2VyQ29kZXM6bnVsbCwgX25leHRCZWdpbm5pbmdJbmRleGVzOm51bGwsIHNjb3JlOnJlc3VsdC5zY29yZSwgaW5kZXhlczpyZXN1bHQuaW5kZXhlcywgb2JqOm9ian0gLy8gaGlkZGVuXHJcblxyXG4gICAgICAgICAgaWYocmVzdWx0c0xlbiA8IGxpbWl0KSB7IHEuYWRkKHJlc3VsdCk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgKytsaW1pdGVkQ291bnRcclxuICAgICAgICAgICAgaWYocmVzdWx0LnNjb3JlID4gcS5wZWVrKCkuc2NvcmUpIHEucmVwbGFjZVRvcChyZXN1bHQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gbm8ga2V5c1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IHRhcmdldHNMZW4gLSAxOyBpID49IDA7IC0taSkgeyB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXVxyXG4gICAgICAgICAgaWYoIXRhcmdldCkgY29udGludWVcclxuICAgICAgICAgIGlmKCFpc09iaih0YXJnZXQpKSB0YXJnZXQgPSBmdXp6eXNvcnQuZ2V0UHJlcGFyZWQodGFyZ2V0KVxyXG5cclxuICAgICAgICAgIHZhciByZXN1bHQgPSBhbGdvcml0aG0oc2VhcmNoLCB0YXJnZXQsIHNlYXJjaExvd2VyQ29kZSlcclxuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgIGlmKHJlc3VsdC5zY29yZSA8IHRocmVzaG9sZCkgY29udGludWVcclxuICAgICAgICAgIGlmKHJlc3VsdHNMZW4gPCBsaW1pdCkgeyBxLmFkZChyZXN1bHQpOyArK3Jlc3VsdHNMZW4gfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICsrbGltaXRlZENvdW50XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5zY29yZSA+IHEucGVlaygpLnNjb3JlKSBxLnJlcGxhY2VUb3AocmVzdWx0KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYocmVzdWx0c0xlbiA9PT0gMCkgcmV0dXJuIG5vUmVzdWx0c1xyXG4gICAgICB2YXIgcmVzdWx0cyA9IG5ldyBBcnJheShyZXN1bHRzTGVuKVxyXG4gICAgICBmb3IodmFyIGkgPSByZXN1bHRzTGVuIC0gMTsgaSA+PSAwOyAtLWkpIHJlc3VsdHNbaV0gPSBxLnBvbGwoKVxyXG4gICAgICByZXN1bHRzLnRvdGFsID0gcmVzdWx0c0xlbiArIGxpbWl0ZWRDb3VudFxyXG4gICAgICByZXR1cm4gcmVzdWx0c1xyXG4gICAgfSxcclxuXHJcbiAgICBnb0FzeW5jOiBmdW5jdGlvbihzZWFyY2gsIHRhcmdldHMsIG9wdGlvbnMpIHtcclxuICAgICAgdmFyIGNhbmNlbGVkID0gZmFsc2VcclxuICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBpZighc2VhcmNoKSByZXR1cm4gcmVzb2x2ZShub1Jlc3VsdHMpXHJcbiAgICAgICAgc2VhcmNoID0gZnV6enlzb3J0LnByZXBhcmVTZWFyY2goc2VhcmNoKVxyXG4gICAgICAgIHZhciBzZWFyY2hMb3dlckNvZGUgPSBzZWFyY2hbMF1cclxuXHJcbiAgICAgICAgdmFyIHEgPSBmYXN0cHJpb3JpdHlxdWV1ZSgpXHJcbiAgICAgICAgdmFyIGlDdXJyZW50ID0gdGFyZ2V0cy5sZW5ndGggLSAxXHJcbiAgICAgICAgdmFyIHRocmVzaG9sZCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aHJlc2hvbGQgfHwgaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy50aHJlc2hvbGQgfHwgLTkwMDcxOTkyNTQ3NDA5OTFcclxuICAgICAgICB2YXIgbGltaXQgPSBvcHRpb25zICYmIG9wdGlvbnMubGltaXQgfHwgaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy5saW1pdCB8fCA5MDA3MTk5MjU0NzQwOTkxXHJcbiAgICAgICAgdmFyIGFsbG93VHlwbyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBvcHRpb25zLmFsbG93VHlwb1xyXG4gICAgICAgICAgOiBpbnN0YW5jZU9wdGlvbnMgJiYgaW5zdGFuY2VPcHRpb25zLmFsbG93VHlwbyE9PXVuZGVmaW5lZCA/IGluc3RhbmNlT3B0aW9ucy5hbGxvd1R5cG9cclxuICAgICAgICAgIDogdHJ1ZVxyXG4gICAgICAgIHZhciBhbGdvcml0aG0gPSBhbGxvd1R5cG8gPyBmdXp6eXNvcnQuYWxnb3JpdGhtIDogZnV6enlzb3J0LmFsZ29yaXRobU5vVHlwb1xyXG4gICAgICAgIHZhciByZXN1bHRzTGVuID0gMDsgdmFyIGxpbWl0ZWRDb3VudCA9IDBcclxuICAgICAgICBmdW5jdGlvbiBzdGVwKCkge1xyXG4gICAgICAgICAgaWYoY2FuY2VsZWQpIHJldHVybiByZWplY3QoJ2NhbmNlbGVkJylcclxuXHJcbiAgICAgICAgICB2YXIgc3RhcnRNcyA9IERhdGUubm93KClcclxuXHJcbiAgICAgICAgICAvLyBUaGlzIGNvZGUgaXMgY29weS9wYXN0ZWQgMyB0aW1lcyBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBbb3B0aW9ucy5rZXlzLCBvcHRpb25zLmtleSwgbm8ga2V5c11cclxuXHJcbiAgICAgICAgICAvLyBvcHRpb25zLmtleXNcclxuICAgICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5rZXlzKSB7XHJcbiAgICAgICAgICAgIHZhciBzY29yZUZuID0gb3B0aW9ucy5zY29yZUZuIHx8IGRlZmF1bHRTY29yZUZuXHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gb3B0aW9ucy5rZXlzXHJcbiAgICAgICAgICAgIHZhciBrZXlzTGVuID0ga2V5cy5sZW5ndGhcclxuICAgICAgICAgICAgZm9yKDsgaUN1cnJlbnQgPj0gMDsgLS1pQ3VycmVudCkgeyB2YXIgb2JqID0gdGFyZ2V0c1tpQ3VycmVudF1cclxuICAgICAgICAgICAgICB2YXIgb2JqUmVzdWx0cyA9IG5ldyBBcnJheShrZXlzTGVuKVxyXG4gICAgICAgICAgICAgIGZvciAodmFyIGtleUkgPSBrZXlzTGVuIC0gMTsga2V5SSA+PSAwOyAtLWtleUkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2tleUldXHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZ2V0VmFsdWUob2JqLCBrZXkpXHJcbiAgICAgICAgICAgICAgICBpZighdGFyZ2V0KSB7IG9ialJlc3VsdHNba2V5SV0gPSBudWxsOyBjb250aW51ZSB9XHJcbiAgICAgICAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICAgICAgICBvYmpSZXN1bHRzW2tleUldID0gYWxnb3JpdGhtKHNlYXJjaCwgdGFyZ2V0LCBzZWFyY2hMb3dlckNvZGUpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIG9ialJlc3VsdHMub2JqID0gb2JqIC8vIGJlZm9yZSBzY29yZUZuIHNvIHNjb3JlRm4gY2FuIHVzZSBpdFxyXG4gICAgICAgICAgICAgIHZhciBzY29yZSA9IHNjb3JlRm4ob2JqUmVzdWx0cylcclxuICAgICAgICAgICAgICBpZihzY29yZSA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZihzY29yZSA8IHRocmVzaG9sZCkgY29udGludWVcclxuICAgICAgICAgICAgICBvYmpSZXN1bHRzLnNjb3JlID0gc2NvcmVcclxuICAgICAgICAgICAgICBpZihyZXN1bHRzTGVuIDwgbGltaXQpIHsgcS5hZGQob2JqUmVzdWx0cyk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICArK2xpbWl0ZWRDb3VudFxyXG4gICAgICAgICAgICAgICAgaWYoc2NvcmUgPiBxLnBlZWsoKS5zY29yZSkgcS5yZXBsYWNlVG9wKG9ialJlc3VsdHMpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZihpQ3VycmVudCUxMDAwLyppdGVtc1BlckNoZWNrKi8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmKERhdGUubm93KCkgLSBzdGFydE1zID49IDEwLyphc3luY0ludGVydmFsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgaXNOb2RlP3NldEltbWVkaWF0ZShzdGVwKTpzZXRUaW1lb3V0KHN0ZXApXHJcbiAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG9wdGlvbnMua2V5XHJcbiAgICAgICAgICB9IGVsc2UgaWYob3B0aW9ucyAmJiBvcHRpb25zLmtleSkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gb3B0aW9ucy5rZXlcclxuICAgICAgICAgICAgZm9yKDsgaUN1cnJlbnQgPj0gMDsgLS1pQ3VycmVudCkgeyB2YXIgb2JqID0gdGFyZ2V0c1tpQ3VycmVudF1cclxuICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZ2V0VmFsdWUob2JqLCBrZXkpXHJcbiAgICAgICAgICAgICAgaWYoIXRhcmdldCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoTG93ZXJDb2RlKVxyXG4gICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgICAgICAgIC8vIGhhdmUgdG8gY2xvbmUgcmVzdWx0IHNvIGR1cGxpY2F0ZSB0YXJnZXRzIGZyb20gZGlmZmVyZW50IG9iaiBjYW4gZWFjaCByZWZlcmVuY2UgdGhlIGNvcnJlY3Qgb2JqXHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0ge3RhcmdldDpyZXN1bHQudGFyZ2V0LCBfdGFyZ2V0TG93ZXJDb2RlczpudWxsLCBfbmV4dEJlZ2lubmluZ0luZGV4ZXM6bnVsbCwgc2NvcmU6cmVzdWx0LnNjb3JlLCBpbmRleGVzOnJlc3VsdC5pbmRleGVzLCBvYmo6b2JqfSAvLyBoaWRkZW5cclxuXHJcbiAgICAgICAgICAgICAgaWYocmVzdWx0c0xlbiA8IGxpbWl0KSB7IHEuYWRkKHJlc3VsdCk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICArK2xpbWl0ZWRDb3VudFxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnNjb3JlID4gcS5wZWVrKCkuc2NvcmUpIHEucmVwbGFjZVRvcChyZXN1bHQpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZihpQ3VycmVudCUxMDAwLyppdGVtc1BlckNoZWNrKi8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmKERhdGUubm93KCkgLSBzdGFydE1zID49IDEwLyphc3luY0ludGVydmFsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgaXNOb2RlP3NldEltbWVkaWF0ZShzdGVwKTpzZXRUaW1lb3V0KHN0ZXApXHJcbiAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG5vIGtleXNcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcig7IGlDdXJyZW50ID49IDA7IC0taUN1cnJlbnQpIHsgdmFyIHRhcmdldCA9IHRhcmdldHNbaUN1cnJlbnRdXHJcbiAgICAgICAgICAgICAgaWYoIXRhcmdldCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoTG93ZXJDb2RlKVxyXG4gICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgaWYocmVzdWx0c0xlbiA8IGxpbWl0KSB7IHEuYWRkKHJlc3VsdCk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICArK2xpbWl0ZWRDb3VudFxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnNjb3JlID4gcS5wZWVrKCkuc2NvcmUpIHEucmVwbGFjZVRvcChyZXN1bHQpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZihpQ3VycmVudCUxMDAwLyppdGVtc1BlckNoZWNrKi8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmKERhdGUubm93KCkgLSBzdGFydE1zID49IDEwLyphc3luY0ludGVydmFsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgaXNOb2RlP3NldEltbWVkaWF0ZShzdGVwKTpzZXRUaW1lb3V0KHN0ZXApXHJcbiAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKHJlc3VsdHNMZW4gPT09IDApIHJldHVybiByZXNvbHZlKG5vUmVzdWx0cylcclxuICAgICAgICAgIHZhciByZXN1bHRzID0gbmV3IEFycmF5KHJlc3VsdHNMZW4pXHJcbiAgICAgICAgICBmb3IodmFyIGkgPSByZXN1bHRzTGVuIC0gMTsgaSA+PSAwOyAtLWkpIHJlc3VsdHNbaV0gPSBxLnBvbGwoKVxyXG4gICAgICAgICAgcmVzdWx0cy50b3RhbCA9IHJlc3VsdHNMZW4gKyBsaW1pdGVkQ291bnRcclxuICAgICAgICAgIHJlc29sdmUocmVzdWx0cylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzTm9kZT9zZXRJbW1lZGlhdGUoc3RlcCk6c3RlcCgpXHJcbiAgICAgIH0pXHJcbiAgICAgIHAuY2FuY2VsID0gZnVuY3Rpb24oKSB7IGNhbmNlbGVkID0gdHJ1ZSB9XHJcbiAgICAgIHJldHVybiBwXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZ2hsaWdodDogZnVuY3Rpb24ocmVzdWx0LCBoT3BlbiwgaENsb3NlKSB7XHJcbiAgICAgIGlmKHJlc3VsdCA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICAgICAgaWYoaE9wZW4gPT09IHVuZGVmaW5lZCkgaE9wZW4gPSAnPGI+J1xyXG4gICAgICBpZihoQ2xvc2UgPT09IHVuZGVmaW5lZCkgaENsb3NlID0gJzwvYj4nXHJcbiAgICAgIHZhciBoaWdobGlnaHRlZCA9ICcnXHJcbiAgICAgIHZhciBtYXRjaGVzSW5kZXggPSAwXHJcbiAgICAgIHZhciBvcGVuZWQgPSBmYWxzZVxyXG4gICAgICB2YXIgdGFyZ2V0ID0gcmVzdWx0LnRhcmdldFxyXG4gICAgICB2YXIgdGFyZ2V0TGVuID0gdGFyZ2V0Lmxlbmd0aFxyXG4gICAgICB2YXIgbWF0Y2hlc0Jlc3QgPSByZXN1bHQuaW5kZXhlc1xyXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGFyZ2V0TGVuOyArK2kpIHsgdmFyIGNoYXIgPSB0YXJnZXRbaV1cclxuICAgICAgICBpZihtYXRjaGVzQmVzdFttYXRjaGVzSW5kZXhdID09PSBpKSB7XHJcbiAgICAgICAgICArK21hdGNoZXNJbmRleFxyXG4gICAgICAgICAgaWYoIW9wZW5lZCkgeyBvcGVuZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkICs9IGhPcGVuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYobWF0Y2hlc0luZGV4ID09PSBtYXRjaGVzQmVzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQgKz0gY2hhciArIGhDbG9zZSArIHRhcmdldC5zdWJzdHIoaSsxKVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZihvcGVuZWQpIHsgb3BlbmVkID0gZmFsc2VcclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQgKz0gaENsb3NlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhpZ2hsaWdodGVkICs9IGNoYXJcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGhpZ2hsaWdodGVkXHJcbiAgICB9LFxyXG5cclxuICAgIHByZXBhcmU6IGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICBpZighdGFyZ2V0KSByZXR1cm5cclxuICAgICAgcmV0dXJuIHt0YXJnZXQ6dGFyZ2V0LCBfdGFyZ2V0TG93ZXJDb2RlczpmdXp6eXNvcnQucHJlcGFyZUxvd2VyQ29kZXModGFyZ2V0KSwgX25leHRCZWdpbm5pbmdJbmRleGVzOm51bGwsIHNjb3JlOm51bGwsIGluZGV4ZXM6bnVsbCwgb2JqOm51bGx9IC8vIGhpZGRlblxyXG4gICAgfSxcclxuICAgIHByZXBhcmVTbG93OiBmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgaWYoIXRhcmdldCkgcmV0dXJuXHJcbiAgICAgIHJldHVybiB7dGFyZ2V0OnRhcmdldCwgX3RhcmdldExvd2VyQ29kZXM6ZnV6enlzb3J0LnByZXBhcmVMb3dlckNvZGVzKHRhcmdldCksIF9uZXh0QmVnaW5uaW5nSW5kZXhlczpmdXp6eXNvcnQucHJlcGFyZU5leHRCZWdpbm5pbmdJbmRleGVzKHRhcmdldCksIHNjb3JlOm51bGwsIGluZGV4ZXM6bnVsbCwgb2JqOm51bGx9IC8vIGhpZGRlblxyXG4gICAgfSxcclxuICAgIHByZXBhcmVTZWFyY2g6IGZ1bmN0aW9uKHNlYXJjaCkge1xyXG4gICAgICBpZighc2VhcmNoKSByZXR1cm5cclxuICAgICAgcmV0dXJuIGZ1enp5c29ydC5wcmVwYXJlTG93ZXJDb2RlcyhzZWFyY2gpXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLy8gQmVsb3cgdGhpcyBwb2ludCBpcyBvbmx5IGludGVybmFsIGNvZGVcclxuICAgIC8vIEJlbG93IHRoaXMgcG9pbnQgaXMgb25seSBpbnRlcm5hbCBjb2RlXHJcbiAgICAvLyBCZWxvdyB0aGlzIHBvaW50IGlzIG9ubHkgaW50ZXJuYWwgY29kZVxyXG4gICAgLy8gQmVsb3cgdGhpcyBwb2ludCBpcyBvbmx5IGludGVybmFsIGNvZGVcclxuXHJcblxyXG5cclxuICAgIGdldFByZXBhcmVkOiBmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgaWYodGFyZ2V0Lmxlbmd0aCA+IDk5OSkgcmV0dXJuIGZ1enp5c29ydC5wcmVwYXJlKHRhcmdldCkgLy8gZG9uJ3QgY2FjaGUgaHVnZSB0YXJnZXRzXHJcbiAgICAgIHZhciB0YXJnZXRQcmVwYXJlZCA9IHByZXBhcmVkQ2FjaGUuZ2V0KHRhcmdldClcclxuICAgICAgaWYodGFyZ2V0UHJlcGFyZWQgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHRhcmdldFByZXBhcmVkXHJcbiAgICAgIHRhcmdldFByZXBhcmVkID0gZnV6enlzb3J0LnByZXBhcmUodGFyZ2V0KVxyXG4gICAgICBwcmVwYXJlZENhY2hlLnNldCh0YXJnZXQsIHRhcmdldFByZXBhcmVkKVxyXG4gICAgICByZXR1cm4gdGFyZ2V0UHJlcGFyZWRcclxuICAgIH0sXHJcbiAgICBnZXRQcmVwYXJlZFNlYXJjaDogZnVuY3Rpb24oc2VhcmNoKSB7XHJcbiAgICAgIGlmKHNlYXJjaC5sZW5ndGggPiA5OTkpIHJldHVybiBmdXp6eXNvcnQucHJlcGFyZVNlYXJjaChzZWFyY2gpIC8vIGRvbid0IGNhY2hlIGh1Z2Ugc2VhcmNoZXNcclxuICAgICAgdmFyIHNlYXJjaFByZXBhcmVkID0gcHJlcGFyZWRTZWFyY2hDYWNoZS5nZXQoc2VhcmNoKVxyXG4gICAgICBpZihzZWFyY2hQcmVwYXJlZCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gc2VhcmNoUHJlcGFyZWRcclxuICAgICAgc2VhcmNoUHJlcGFyZWQgPSBmdXp6eXNvcnQucHJlcGFyZVNlYXJjaChzZWFyY2gpXHJcbiAgICAgIHByZXBhcmVkU2VhcmNoQ2FjaGUuc2V0KHNlYXJjaCwgc2VhcmNoUHJlcGFyZWQpXHJcbiAgICAgIHJldHVybiBzZWFyY2hQcmVwYXJlZFxyXG4gICAgfSxcclxuXHJcbiAgICBhbGdvcml0aG06IGZ1bmN0aW9uKHNlYXJjaExvd2VyQ29kZXMsIHByZXBhcmVkLCBzZWFyY2hMb3dlckNvZGUpIHtcclxuICAgICAgdmFyIHRhcmdldExvd2VyQ29kZXMgPSBwcmVwYXJlZC5fdGFyZ2V0TG93ZXJDb2Rlc1xyXG4gICAgICB2YXIgc2VhcmNoTGVuID0gc2VhcmNoTG93ZXJDb2Rlcy5sZW5ndGhcclxuICAgICAgdmFyIHRhcmdldExlbiA9IHRhcmdldExvd2VyQ29kZXMubGVuZ3RoXHJcbiAgICAgIHZhciBzZWFyY2hJID0gMCAvLyB3aGVyZSB3ZSBhdFxyXG4gICAgICB2YXIgdGFyZ2V0SSA9IDAgLy8gd2hlcmUgeW91IGF0XHJcbiAgICAgIHZhciB0eXBvU2ltcGxlSSA9IDBcclxuICAgICAgdmFyIG1hdGNoZXNTaW1wbGVMZW4gPSAwXHJcblxyXG4gICAgICAvLyB2ZXJ5IGJhc2ljIGZ1enp5IG1hdGNoOyB0byByZW1vdmUgbm9uLW1hdGNoaW5nIHRhcmdldHMgQVNBUCFcclxuICAgICAgLy8gd2FsayB0aHJvdWdoIHRhcmdldC4gZmluZCBzZXF1ZW50aWFsIG1hdGNoZXMuXHJcbiAgICAgIC8vIGlmIGFsbCBjaGFycyBhcmVuJ3QgZm91bmQgdGhlbiBleGl0XHJcbiAgICAgIGZvcig7Oykge1xyXG4gICAgICAgIHZhciBpc01hdGNoID0gc2VhcmNoTG93ZXJDb2RlID09PSB0YXJnZXRMb3dlckNvZGVzW3RhcmdldEldXHJcbiAgICAgICAgaWYoaXNNYXRjaCkge1xyXG4gICAgICAgICAgbWF0Y2hlc1NpbXBsZVttYXRjaGVzU2ltcGxlTGVuKytdID0gdGFyZ2V0SVxyXG4gICAgICAgICAgKytzZWFyY2hJOyBpZihzZWFyY2hJID09PSBzZWFyY2hMZW4pIGJyZWFrXHJcbiAgICAgICAgICBzZWFyY2hMb3dlckNvZGUgPSBzZWFyY2hMb3dlckNvZGVzW3R5cG9TaW1wbGVJPT09MD9zZWFyY2hJIDogKHR5cG9TaW1wbGVJPT09c2VhcmNoST9zZWFyY2hJKzEgOiAodHlwb1NpbXBsZUk9PT1zZWFyY2hJLTE/c2VhcmNoSS0xIDogc2VhcmNoSSkpXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgKyt0YXJnZXRJOyBpZih0YXJnZXRJID49IHRhcmdldExlbikgeyAvLyBGYWlsZWQgdG8gZmluZCBzZWFyY2hJXHJcbiAgICAgICAgICAvLyBDaGVjayBmb3IgdHlwbyBvciBleGl0XHJcbiAgICAgICAgICAvLyB3ZSBnbyBhcyBmYXIgYXMgcG9zc2libGUgYmVmb3JlIHRyeWluZyB0byB0cmFuc3Bvc2VcclxuICAgICAgICAgIC8vIHRoZW4gd2UgdHJhbnNwb3NlIGJhY2t3YXJkcyB1bnRpbCB3ZSByZWFjaCB0aGUgYmVnaW5uaW5nXHJcbiAgICAgICAgICBmb3IoOzspIHtcclxuICAgICAgICAgICAgaWYoc2VhcmNoSSA8PSAxKSByZXR1cm4gbnVsbCAvLyBub3QgYWxsb3dlZCB0byB0cmFuc3Bvc2UgZmlyc3QgY2hhclxyXG4gICAgICAgICAgICBpZih0eXBvU2ltcGxlSSA9PT0gMCkgeyAvLyB3ZSBoYXZlbid0IHRyaWVkIHRvIHRyYW5zcG9zZSB5ZXRcclxuICAgICAgICAgICAgICAtLXNlYXJjaElcclxuICAgICAgICAgICAgICB2YXIgc2VhcmNoTG93ZXJDb2RlTmV3ID0gc2VhcmNoTG93ZXJDb2Rlc1tzZWFyY2hJXVxyXG4gICAgICAgICAgICAgIGlmKHNlYXJjaExvd2VyQ29kZSA9PT0gc2VhcmNoTG93ZXJDb2RlTmV3KSBjb250aW51ZSAvLyBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gdHJhbnNwb3NlIGEgcmVwZWF0IGNoYXJcclxuICAgICAgICAgICAgICB0eXBvU2ltcGxlSSA9IHNlYXJjaElcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZih0eXBvU2ltcGxlSSA9PT0gMSkgcmV0dXJuIG51bGwgLy8gcmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBsaW5lIGZvciB0cmFuc3Bvc2luZ1xyXG4gICAgICAgICAgICAgIC0tdHlwb1NpbXBsZUlcclxuICAgICAgICAgICAgICBzZWFyY2hJID0gdHlwb1NpbXBsZUlcclxuICAgICAgICAgICAgICBzZWFyY2hMb3dlckNvZGUgPSBzZWFyY2hMb3dlckNvZGVzW3NlYXJjaEkgKyAxXVxyXG4gICAgICAgICAgICAgIHZhciBzZWFyY2hMb3dlckNvZGVOZXcgPSBzZWFyY2hMb3dlckNvZGVzW3NlYXJjaEldXHJcbiAgICAgICAgICAgICAgaWYoc2VhcmNoTG93ZXJDb2RlID09PSBzZWFyY2hMb3dlckNvZGVOZXcpIGNvbnRpbnVlIC8vIGRvZXNuJ3QgbWFrZSBzZW5zZSB0byB0cmFuc3Bvc2UgYSByZXBlYXQgY2hhclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hdGNoZXNTaW1wbGVMZW4gPSBzZWFyY2hJXHJcbiAgICAgICAgICAgIHRhcmdldEkgPSBtYXRjaGVzU2ltcGxlW21hdGNoZXNTaW1wbGVMZW4gLSAxXSArIDFcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBzZWFyY2hJID0gMFxyXG4gICAgICB2YXIgdHlwb1N0cmljdEkgPSAwXHJcbiAgICAgIHZhciBzdWNjZXNzU3RyaWN0ID0gZmFsc2VcclxuICAgICAgdmFyIG1hdGNoZXNTdHJpY3RMZW4gPSAwXHJcblxyXG4gICAgICB2YXIgbmV4dEJlZ2lubmluZ0luZGV4ZXMgPSBwcmVwYXJlZC5fbmV4dEJlZ2lubmluZ0luZGV4ZXNcclxuICAgICAgaWYobmV4dEJlZ2lubmluZ0luZGV4ZXMgPT09IG51bGwpIG5leHRCZWdpbm5pbmdJbmRleGVzID0gcHJlcGFyZWQuX25leHRCZWdpbm5pbmdJbmRleGVzID0gZnV6enlzb3J0LnByZXBhcmVOZXh0QmVnaW5uaW5nSW5kZXhlcyhwcmVwYXJlZC50YXJnZXQpXHJcbiAgICAgIHZhciBmaXJzdFBvc3NpYmxlSSA9IHRhcmdldEkgPSBtYXRjaGVzU2ltcGxlWzBdPT09MCA/IDAgOiBuZXh0QmVnaW5uaW5nSW5kZXhlc1ttYXRjaGVzU2ltcGxlWzBdLTFdXHJcblxyXG4gICAgICAvLyBPdXIgdGFyZ2V0IHN0cmluZyBzdWNjZXNzZnVsbHkgbWF0Y2hlZCBhbGwgY2hhcmFjdGVycyBpbiBzZXF1ZW5jZSFcclxuICAgICAgLy8gTGV0J3MgdHJ5IGEgbW9yZSBhZHZhbmNlZCBhbmQgc3RyaWN0IHRlc3QgdG8gaW1wcm92ZSB0aGUgc2NvcmVcclxuICAgICAgLy8gb25seSBjb3VudCBpdCBhcyBhIG1hdGNoIGlmIGl0J3MgY29uc2VjdXRpdmUgb3IgYSBiZWdpbm5pbmcgY2hhcmFjdGVyIVxyXG4gICAgICBpZih0YXJnZXRJICE9PSB0YXJnZXRMZW4pIGZvcig7Oykge1xyXG4gICAgICAgIGlmKHRhcmdldEkgPj0gdGFyZ2V0TGVuKSB7XHJcbiAgICAgICAgICAvLyBXZSBmYWlsZWQgdG8gZmluZCBhIGdvb2Qgc3BvdCBmb3IgdGhpcyBzZWFyY2ggY2hhciwgZ28gYmFjayB0byB0aGUgcHJldmlvdXMgc2VhcmNoIGNoYXIgYW5kIGZvcmNlIGl0IGZvcndhcmRcclxuICAgICAgICAgIGlmKHNlYXJjaEkgPD0gMCkgeyAvLyBXZSBmYWlsZWQgdG8gcHVzaCBjaGFycyBmb3J3YXJkIGZvciBhIGJldHRlciBtYXRjaFxyXG4gICAgICAgICAgICAvLyB0cmFuc3Bvc2UsIHN0YXJ0aW5nIGZyb20gdGhlIGJlZ2lubmluZ1xyXG4gICAgICAgICAgICArK3R5cG9TdHJpY3RJOyBpZih0eXBvU3RyaWN0SSA+IHNlYXJjaExlbi0yKSBicmVha1xyXG4gICAgICAgICAgICBpZihzZWFyY2hMb3dlckNvZGVzW3R5cG9TdHJpY3RJXSA9PT0gc2VhcmNoTG93ZXJDb2Rlc1t0eXBvU3RyaWN0SSsxXSkgY29udGludWUgLy8gZG9lc24ndCBtYWtlIHNlbnNlIHRvIHRyYW5zcG9zZSBhIHJlcGVhdCBjaGFyXHJcbiAgICAgICAgICAgIHRhcmdldEkgPSBmaXJzdFBvc3NpYmxlSVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC0tc2VhcmNoSVxyXG4gICAgICAgICAgdmFyIGxhc3RNYXRjaCA9IG1hdGNoZXNTdHJpY3RbLS1tYXRjaGVzU3RyaWN0TGVuXVxyXG4gICAgICAgICAgdGFyZ2V0SSA9IG5leHRCZWdpbm5pbmdJbmRleGVzW2xhc3RNYXRjaF1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBpc01hdGNoID0gc2VhcmNoTG93ZXJDb2Rlc1t0eXBvU3RyaWN0ST09PTA/c2VhcmNoSSA6ICh0eXBvU3RyaWN0ST09PXNlYXJjaEk/c2VhcmNoSSsxIDogKHR5cG9TdHJpY3RJPT09c2VhcmNoSS0xP3NlYXJjaEktMSA6IHNlYXJjaEkpKV0gPT09IHRhcmdldExvd2VyQ29kZXNbdGFyZ2V0SV1cclxuICAgICAgICAgIGlmKGlzTWF0Y2gpIHtcclxuICAgICAgICAgICAgbWF0Y2hlc1N0cmljdFttYXRjaGVzU3RyaWN0TGVuKytdID0gdGFyZ2V0SVxyXG4gICAgICAgICAgICArK3NlYXJjaEk7IGlmKHNlYXJjaEkgPT09IHNlYXJjaExlbikgeyBzdWNjZXNzU3RyaWN0ID0gdHJ1ZTsgYnJlYWsgfVxyXG4gICAgICAgICAgICArK3RhcmdldElcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhcmdldEkgPSBuZXh0QmVnaW5uaW5nSW5kZXhlc1t0YXJnZXRJXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgeyAvLyB0YWxseSB1cCB0aGUgc2NvcmUgJiBrZWVwIHRyYWNrIG9mIG1hdGNoZXMgZm9yIGhpZ2hsaWdodGluZyBsYXRlclxyXG4gICAgICAgIGlmKHN1Y2Nlc3NTdHJpY3QpIHsgdmFyIG1hdGNoZXNCZXN0ID0gbWF0Y2hlc1N0cmljdDsgdmFyIG1hdGNoZXNCZXN0TGVuID0gbWF0Y2hlc1N0cmljdExlbiB9XHJcbiAgICAgICAgZWxzZSB7IHZhciBtYXRjaGVzQmVzdCA9IG1hdGNoZXNTaW1wbGU7IHZhciBtYXRjaGVzQmVzdExlbiA9IG1hdGNoZXNTaW1wbGVMZW4gfVxyXG4gICAgICAgIHZhciBzY29yZSA9IDBcclxuICAgICAgICB2YXIgbGFzdFRhcmdldEkgPSAtMVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWFyY2hMZW47ICsraSkgeyB2YXIgdGFyZ2V0SSA9IG1hdGNoZXNCZXN0W2ldXHJcbiAgICAgICAgICAvLyBzY29yZSBvbmx5IGdvZXMgZG93biBpZiB0aGV5J3JlIG5vdCBjb25zZWN1dGl2ZVxyXG4gICAgICAgICAgaWYobGFzdFRhcmdldEkgIT09IHRhcmdldEkgLSAxKSBzY29yZSAtPSB0YXJnZXRJXHJcbiAgICAgICAgICBsYXN0VGFyZ2V0SSA9IHRhcmdldElcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXN1Y2Nlc3NTdHJpY3QpIHtcclxuICAgICAgICAgIHNjb3JlICo9IDEwMDBcclxuICAgICAgICAgIGlmKHR5cG9TaW1wbGVJICE9PSAwKSBzY29yZSArPSAtMjAvKnR5cG9QZW5hbHR5Ki9cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYodHlwb1N0cmljdEkgIT09IDApIHNjb3JlICs9IC0yMC8qdHlwb1BlbmFsdHkqL1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZSAtPSB0YXJnZXRMZW4gLSBzZWFyY2hMZW5cclxuICAgICAgICBwcmVwYXJlZC5zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgcHJlcGFyZWQuaW5kZXhlcyA9IG5ldyBBcnJheShtYXRjaGVzQmVzdExlbik7IGZvcih2YXIgaSA9IG1hdGNoZXNCZXN0TGVuIC0gMTsgaSA+PSAwOyAtLWkpIHByZXBhcmVkLmluZGV4ZXNbaV0gPSBtYXRjaGVzQmVzdFtpXVxyXG5cclxuICAgICAgICByZXR1cm4gcHJlcGFyZWRcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhbGdvcml0aG1Ob1R5cG86IGZ1bmN0aW9uKHNlYXJjaExvd2VyQ29kZXMsIHByZXBhcmVkLCBzZWFyY2hMb3dlckNvZGUpIHtcclxuICAgICAgdmFyIHRhcmdldExvd2VyQ29kZXMgPSBwcmVwYXJlZC5fdGFyZ2V0TG93ZXJDb2Rlc1xyXG4gICAgICB2YXIgc2VhcmNoTGVuID0gc2VhcmNoTG93ZXJDb2Rlcy5sZW5ndGhcclxuICAgICAgdmFyIHRhcmdldExlbiA9IHRhcmdldExvd2VyQ29kZXMubGVuZ3RoXHJcbiAgICAgIHZhciBzZWFyY2hJID0gMCAvLyB3aGVyZSB3ZSBhdFxyXG4gICAgICB2YXIgdGFyZ2V0SSA9IDAgLy8gd2hlcmUgeW91IGF0XHJcbiAgICAgIHZhciBtYXRjaGVzU2ltcGxlTGVuID0gMFxyXG5cclxuICAgICAgLy8gdmVyeSBiYXNpYyBmdXp6eSBtYXRjaDsgdG8gcmVtb3ZlIG5vbi1tYXRjaGluZyB0YXJnZXRzIEFTQVAhXHJcbiAgICAgIC8vIHdhbGsgdGhyb3VnaCB0YXJnZXQuIGZpbmQgc2VxdWVudGlhbCBtYXRjaGVzLlxyXG4gICAgICAvLyBpZiBhbGwgY2hhcnMgYXJlbid0IGZvdW5kIHRoZW4gZXhpdFxyXG4gICAgICBmb3IoOzspIHtcclxuICAgICAgICB2YXIgaXNNYXRjaCA9IHNlYXJjaExvd2VyQ29kZSA9PT0gdGFyZ2V0TG93ZXJDb2Rlc1t0YXJnZXRJXVxyXG4gICAgICAgIGlmKGlzTWF0Y2gpIHtcclxuICAgICAgICAgIG1hdGNoZXNTaW1wbGVbbWF0Y2hlc1NpbXBsZUxlbisrXSA9IHRhcmdldElcclxuICAgICAgICAgICsrc2VhcmNoSTsgaWYoc2VhcmNoSSA9PT0gc2VhcmNoTGVuKSBicmVha1xyXG4gICAgICAgICAgc2VhcmNoTG93ZXJDb2RlID0gc2VhcmNoTG93ZXJDb2Rlc1tzZWFyY2hJXVxyXG4gICAgICAgIH1cclxuICAgICAgICArK3RhcmdldEk7IGlmKHRhcmdldEkgPj0gdGFyZ2V0TGVuKSByZXR1cm4gbnVsbCAvLyBGYWlsZWQgdG8gZmluZCBzZWFyY2hJXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBzZWFyY2hJID0gMFxyXG4gICAgICB2YXIgc3VjY2Vzc1N0cmljdCA9IGZhbHNlXHJcbiAgICAgIHZhciBtYXRjaGVzU3RyaWN0TGVuID0gMFxyXG5cclxuICAgICAgdmFyIG5leHRCZWdpbm5pbmdJbmRleGVzID0gcHJlcGFyZWQuX25leHRCZWdpbm5pbmdJbmRleGVzXHJcbiAgICAgIGlmKG5leHRCZWdpbm5pbmdJbmRleGVzID09PSBudWxsKSBuZXh0QmVnaW5uaW5nSW5kZXhlcyA9IHByZXBhcmVkLl9uZXh0QmVnaW5uaW5nSW5kZXhlcyA9IGZ1enp5c29ydC5wcmVwYXJlTmV4dEJlZ2lubmluZ0luZGV4ZXMocHJlcGFyZWQudGFyZ2V0KVxyXG4gICAgICB2YXIgZmlyc3RQb3NzaWJsZUkgPSB0YXJnZXRJID0gbWF0Y2hlc1NpbXBsZVswXT09PTAgPyAwIDogbmV4dEJlZ2lubmluZ0luZGV4ZXNbbWF0Y2hlc1NpbXBsZVswXS0xXVxyXG5cclxuICAgICAgLy8gT3VyIHRhcmdldCBzdHJpbmcgc3VjY2Vzc2Z1bGx5IG1hdGNoZWQgYWxsIGNoYXJhY3RlcnMgaW4gc2VxdWVuY2UhXHJcbiAgICAgIC8vIExldCdzIHRyeSBhIG1vcmUgYWR2YW5jZWQgYW5kIHN0cmljdCB0ZXN0IHRvIGltcHJvdmUgdGhlIHNjb3JlXHJcbiAgICAgIC8vIG9ubHkgY291bnQgaXQgYXMgYSBtYXRjaCBpZiBpdCdzIGNvbnNlY3V0aXZlIG9yIGEgYmVnaW5uaW5nIGNoYXJhY3RlciFcclxuICAgICAgaWYodGFyZ2V0SSAhPT0gdGFyZ2V0TGVuKSBmb3IoOzspIHtcclxuICAgICAgICBpZih0YXJnZXRJID49IHRhcmdldExlbikge1xyXG4gICAgICAgICAgLy8gV2UgZmFpbGVkIHRvIGZpbmQgYSBnb29kIHNwb3QgZm9yIHRoaXMgc2VhcmNoIGNoYXIsIGdvIGJhY2sgdG8gdGhlIHByZXZpb3VzIHNlYXJjaCBjaGFyIGFuZCBmb3JjZSBpdCBmb3J3YXJkXHJcbiAgICAgICAgICBpZihzZWFyY2hJIDw9IDApIGJyZWFrIC8vIFdlIGZhaWxlZCB0byBwdXNoIGNoYXJzIGZvcndhcmQgZm9yIGEgYmV0dGVyIG1hdGNoXHJcblxyXG4gICAgICAgICAgLS1zZWFyY2hJXHJcbiAgICAgICAgICB2YXIgbGFzdE1hdGNoID0gbWF0Y2hlc1N0cmljdFstLW1hdGNoZXNTdHJpY3RMZW5dXHJcbiAgICAgICAgICB0YXJnZXRJID0gbmV4dEJlZ2lubmluZ0luZGV4ZXNbbGFzdE1hdGNoXVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGlzTWF0Y2ggPSBzZWFyY2hMb3dlckNvZGVzW3NlYXJjaEldID09PSB0YXJnZXRMb3dlckNvZGVzW3RhcmdldEldXHJcbiAgICAgICAgICBpZihpc01hdGNoKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZXNTdHJpY3RbbWF0Y2hlc1N0cmljdExlbisrXSA9IHRhcmdldElcclxuICAgICAgICAgICAgKytzZWFyY2hJOyBpZihzZWFyY2hJID09PSBzZWFyY2hMZW4pIHsgc3VjY2Vzc1N0cmljdCA9IHRydWU7IGJyZWFrIH1cclxuICAgICAgICAgICAgKyt0YXJnZXRJXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YXJnZXRJID0gbmV4dEJlZ2lubmluZ0luZGV4ZXNbdGFyZ2V0SV1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHsgLy8gdGFsbHkgdXAgdGhlIHNjb3JlICYga2VlcCB0cmFjayBvZiBtYXRjaGVzIGZvciBoaWdobGlnaHRpbmcgbGF0ZXJcclxuICAgICAgICBpZihzdWNjZXNzU3RyaWN0KSB7IHZhciBtYXRjaGVzQmVzdCA9IG1hdGNoZXNTdHJpY3Q7IHZhciBtYXRjaGVzQmVzdExlbiA9IG1hdGNoZXNTdHJpY3RMZW4gfVxyXG4gICAgICAgIGVsc2UgeyB2YXIgbWF0Y2hlc0Jlc3QgPSBtYXRjaGVzU2ltcGxlOyB2YXIgbWF0Y2hlc0Jlc3RMZW4gPSBtYXRjaGVzU2ltcGxlTGVuIH1cclxuICAgICAgICB2YXIgc2NvcmUgPSAwXHJcbiAgICAgICAgdmFyIGxhc3RUYXJnZXRJID0gLTFcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VhcmNoTGVuOyArK2kpIHsgdmFyIHRhcmdldEkgPSBtYXRjaGVzQmVzdFtpXVxyXG4gICAgICAgICAgLy8gc2NvcmUgb25seSBnb2VzIGRvd24gaWYgdGhleSdyZSBub3QgY29uc2VjdXRpdmVcclxuICAgICAgICAgIGlmKGxhc3RUYXJnZXRJICE9PSB0YXJnZXRJIC0gMSkgc2NvcmUgLT0gdGFyZ2V0SVxyXG4gICAgICAgICAgbGFzdFRhcmdldEkgPSB0YXJnZXRJXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFzdWNjZXNzU3RyaWN0KSBzY29yZSAqPSAxMDAwXHJcbiAgICAgICAgc2NvcmUgLT0gdGFyZ2V0TGVuIC0gc2VhcmNoTGVuXHJcbiAgICAgICAgcHJlcGFyZWQuc2NvcmUgPSBzY29yZVxyXG4gICAgICAgIHByZXBhcmVkLmluZGV4ZXMgPSBuZXcgQXJyYXkobWF0Y2hlc0Jlc3RMZW4pOyBmb3IodmFyIGkgPSBtYXRjaGVzQmVzdExlbiAtIDE7IGkgPj0gMDsgLS1pKSBwcmVwYXJlZC5pbmRleGVzW2ldID0gbWF0Y2hlc0Jlc3RbaV1cclxuXHJcbiAgICAgICAgcmV0dXJuIHByZXBhcmVkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcHJlcGFyZUxvd2VyQ29kZXM6IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgICB2YXIgc3RyTGVuID0gc3RyLmxlbmd0aFxyXG4gICAgICB2YXIgbG93ZXJDb2RlcyA9IFtdIC8vIG5ldyBBcnJheShzdHJMZW4pICAgIHNwYXJzZSBhcnJheSBpcyB0b28gc2xvd1xyXG4gICAgICB2YXIgbG93ZXIgPSBzdHIudG9Mb3dlckNhc2UoKVxyXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3RyTGVuOyArK2kpIGxvd2VyQ29kZXNbaV0gPSBsb3dlci5jaGFyQ29kZUF0KGkpXHJcbiAgICAgIHJldHVybiBsb3dlckNvZGVzXHJcbiAgICB9LFxyXG4gICAgcHJlcGFyZUJlZ2lubmluZ0luZGV4ZXM6IGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICB2YXIgdGFyZ2V0TGVuID0gdGFyZ2V0Lmxlbmd0aFxyXG4gICAgICB2YXIgYmVnaW5uaW5nSW5kZXhlcyA9IFtdOyB2YXIgYmVnaW5uaW5nSW5kZXhlc0xlbiA9IDBcclxuICAgICAgdmFyIHdhc1VwcGVyID0gZmFsc2VcclxuICAgICAgdmFyIHdhc0FscGhhbnVtID0gZmFsc2VcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRhcmdldExlbjsgKytpKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldENvZGUgPSB0YXJnZXQuY2hhckNvZGVBdChpKVxyXG4gICAgICAgIHZhciBpc1VwcGVyID0gdGFyZ2V0Q29kZT49NjUmJnRhcmdldENvZGU8PTkwXHJcbiAgICAgICAgdmFyIGlzQWxwaGFudW0gPSBpc1VwcGVyIHx8IHRhcmdldENvZGU+PTk3JiZ0YXJnZXRDb2RlPD0xMjIgfHwgdGFyZ2V0Q29kZT49NDgmJnRhcmdldENvZGU8PTU3XHJcbiAgICAgICAgdmFyIGlzQmVnaW5uaW5nID0gaXNVcHBlciAmJiAhd2FzVXBwZXIgfHwgIXdhc0FscGhhbnVtIHx8ICFpc0FscGhhbnVtXHJcbiAgICAgICAgd2FzVXBwZXIgPSBpc1VwcGVyXHJcbiAgICAgICAgd2FzQWxwaGFudW0gPSBpc0FscGhhbnVtXHJcbiAgICAgICAgaWYoaXNCZWdpbm5pbmcpIGJlZ2lubmluZ0luZGV4ZXNbYmVnaW5uaW5nSW5kZXhlc0xlbisrXSA9IGlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYmVnaW5uaW5nSW5kZXhlc1xyXG4gICAgfSxcclxuICAgIHByZXBhcmVOZXh0QmVnaW5uaW5nSW5kZXhlczogZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgIHZhciB0YXJnZXRMZW4gPSB0YXJnZXQubGVuZ3RoXHJcbiAgICAgIHZhciBiZWdpbm5pbmdJbmRleGVzID0gZnV6enlzb3J0LnByZXBhcmVCZWdpbm5pbmdJbmRleGVzKHRhcmdldClcclxuICAgICAgdmFyIG5leHRCZWdpbm5pbmdJbmRleGVzID0gW10gLy8gbmV3IEFycmF5KHRhcmdldExlbikgICAgIHNwYXJzZSBhcnJheSBpcyB0b28gc2xvd1xyXG4gICAgICB2YXIgbGFzdElzQmVnaW5uaW5nID0gYmVnaW5uaW5nSW5kZXhlc1swXVxyXG4gICAgICB2YXIgbGFzdElzQmVnaW5uaW5nSSA9IDBcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRhcmdldExlbjsgKytpKSB7XHJcbiAgICAgICAgaWYobGFzdElzQmVnaW5uaW5nID4gaSkge1xyXG4gICAgICAgICAgbmV4dEJlZ2lubmluZ0luZGV4ZXNbaV0gPSBsYXN0SXNCZWdpbm5pbmdcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGFzdElzQmVnaW5uaW5nID0gYmVnaW5uaW5nSW5kZXhlc1srK2xhc3RJc0JlZ2lubmluZ0ldXHJcbiAgICAgICAgICBuZXh0QmVnaW5uaW5nSW5kZXhlc1tpXSA9IGxhc3RJc0JlZ2lubmluZz09PXVuZGVmaW5lZCA/IHRhcmdldExlbiA6IGxhc3RJc0JlZ2lubmluZ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dEJlZ2lubmluZ0luZGV4ZXNcclxuICAgIH0sXHJcblxyXG4gICAgY2xlYW51cDogY2xlYW51cCxcclxuICAgIG5ldzogZnV6enlzb3J0TmV3LFxyXG4gIH1cclxuICByZXR1cm4gZnV6enlzb3J0XHJcbn0gLy8gZnV6enlzb3J0TmV3XHJcblxyXG4vLyBUaGlzIHN0dWZmIGlzIG91dHNpZGUgZnV6enlzb3J0TmV3LCBiZWNhdXNlIGl0J3Mgc2hhcmVkIHdpdGggaW5zdGFuY2VzIG9mIGZ1enp5c29ydC5uZXcoKVxyXG52YXIgaXNOb2RlID0gdHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnXHJcbi8vIHZhciBNQVhfSU5UID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcclxuLy8gdmFyIE1JTl9JTlQgPSBOdW1iZXIuTUlOX1ZBTFVFXHJcbnZhciBwcmVwYXJlZENhY2hlID0gbmV3IE1hcCgpXHJcbnZhciBwcmVwYXJlZFNlYXJjaENhY2hlID0gbmV3IE1hcCgpXHJcbnZhciBub1Jlc3VsdHMgPSBbXTsgbm9SZXN1bHRzLnRvdGFsID0gMFxyXG52YXIgbWF0Y2hlc1NpbXBsZSA9IFtdOyB2YXIgbWF0Y2hlc1N0cmljdCA9IFtdXHJcbmZ1bmN0aW9uIGNsZWFudXAoKSB7IHByZXBhcmVkQ2FjaGUuY2xlYXIoKTsgcHJlcGFyZWRTZWFyY2hDYWNoZS5jbGVhcigpOyBtYXRjaGVzU2ltcGxlID0gW107IG1hdGNoZXNTdHJpY3QgPSBbXSB9XHJcbmZ1bmN0aW9uIGRlZmF1bHRTY29yZUZuKGEpIHtcclxuICB2YXIgbWF4ID0gLTkwMDcxOTkyNTQ3NDA5OTFcclxuICBmb3IgKHZhciBpID0gYS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgdmFyIHJlc3VsdCA9IGFbaV07IGlmKHJlc3VsdCA9PT0gbnVsbCkgY29udGludWVcclxuICAgIHZhciBzY29yZSA9IHJlc3VsdC5zY29yZVxyXG4gICAgaWYoc2NvcmUgPiBtYXgpIG1heCA9IHNjb3JlXHJcbiAgfVxyXG4gIGlmKG1heCA9PT0gLTkwMDcxOTkyNTQ3NDA5OTEpIHJldHVybiBudWxsXHJcbiAgcmV0dXJuIG1heFxyXG59XHJcblxyXG4vLyBwcm9wID0gJ2tleScgICAgICAgICAgICAgIDIuNW1zIG9wdGltaXplZCBmb3IgdGhpcyBjYXNlLCBzZWVtcyB0byBiZSBhYm91dCBhcyBmYXN0IGFzIGRpcmVjdCBvYmpbcHJvcF1cclxuLy8gcHJvcCA9ICdrZXkxLmtleTInICAgICAgICAxMG1zXHJcbi8vIHByb3AgPSBbJ2tleTEnLCAna2V5MiddICAgMjdtc1xyXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmosIHByb3ApIHtcclxuICB2YXIgdG1wID0gb2JqW3Byb3BdOyBpZih0bXAgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHRtcFxyXG4gIHZhciBzZWdzID0gcHJvcFxyXG4gIGlmKCFBcnJheS5pc0FycmF5KHByb3ApKSBzZWdzID0gcHJvcC5zcGxpdCgnLicpXHJcbiAgdmFyIGxlbiA9IHNlZ3MubGVuZ3RoXHJcbiAgdmFyIGkgPSAtMVxyXG4gIHdoaWxlIChvYmogJiYgKCsraSA8IGxlbikpIG9iaiA9IG9ialtzZWdzW2ldXVxyXG4gIHJldHVybiBvYmpcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPYmooeCkgeyByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnIH0gLy8gZmFzdGVyIGFzIGEgZnVuY3Rpb25cclxuXHJcbi8vIEhhY2tlZCB2ZXJzaW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9sZW1pcmUvRmFzdFByaW9yaXR5UXVldWUuanNcclxudmFyIGZhc3Rwcmlvcml0eXF1ZXVlPWZ1bmN0aW9uKCl7dmFyIHI9W10sbz0wLGU9e307ZnVuY3Rpb24gbigpe2Zvcih2YXIgZT0wLG49cltlXSxjPTE7YzxvOyl7dmFyIGY9YysxO2U9YyxmPG8mJnJbZl0uc2NvcmU8cltjXS5zY29yZSYmKGU9ZikscltlLTE+PjFdPXJbZV0sYz0xKyhlPDwxKX1mb3IodmFyIGE9ZS0xPj4xO2U+MCYmbi5zY29yZTxyW2FdLnNjb3JlO2E9KGU9YSktMT4+MSlyW2VdPXJbYV07cltlXT1ufXJldHVybiBlLmFkZD1mdW5jdGlvbihlKXt2YXIgbj1vO3JbbysrXT1lO2Zvcih2YXIgYz1uLTE+PjE7bj4wJiZlLnNjb3JlPHJbY10uc2NvcmU7Yz0obj1jKS0xPj4xKXJbbl09cltjXTtyW25dPWV9LGUucG9sbD1mdW5jdGlvbigpe2lmKDAhPT1vKXt2YXIgZT1yWzBdO3JldHVybiByWzBdPXJbLS1vXSxuKCksZX19LGUucGVlaz1mdW5jdGlvbihlKXtpZigwIT09bylyZXR1cm4gclswXX0sZS5yZXBsYWNlVG9wPWZ1bmN0aW9uKG8pe3JbMF09byxuKCl9LGV9O1xyXG52YXIgcSA9IGZhc3Rwcmlvcml0eXF1ZXVlKCkgLy8gcmV1c2UgdGhpcywgZXhjZXB0IGZvciBhc3luYywgaXQgbmVlZHMgdG8gbWFrZSBpdHMgb3duXHJcblxyXG5yZXR1cm4gZnV6enlzb3J0TmV3KClcclxufSkgLy8gVU1EXHJcblxyXG4vLyBUT0RPOiAocGVyZm9ybWFuY2UpIHdhc20gdmVyc2lvbiE/XHJcblxyXG4vLyBUT0RPOiAocGVyZm9ybWFuY2UpIGxheW91dCBtZW1vcnkgaW4gYW4gb3B0aW1hbCB3YXkgdG8gZ28gZmFzdCBieSBhdm9pZGluZyBjYWNoZSBtaXNzZXNcclxuXHJcbi8vIFRPRE86IChwZXJmb3JtYW5jZSkgcHJlcGFyZWRDYWNoZSBpcyBhIG1lbW9yeSBsZWFrXHJcblxyXG4vLyBUT0RPOiAobGlrZSBzdWJsaW1lKSBiYWNrc2xhc2ggPT09IGZvcndhcmRzbGFzaFxyXG5cclxuLy8gVE9ETzogKHBlcmZvcm1hbmNlKSBpIGhhdmUgbm8gaWRlYSBob3cgd2VsbCBvcHRpem1pZWQgdGhlIGFsbG93aW5nIHR5cG9zIGFsZ29yaXRobSBpc1xyXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCJ2YXIgbmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzL2Jyb3dzZXIuanMnKS5uZXh0VGljaztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpbW1lZGlhdGVJZHMgPSB7fTtcbnZhciBuZXh0SW1tZWRpYXRlSWQgPSAwO1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkgeyB0aW1lb3V0LmNsb3NlKCk7IH07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gVGhhdCdzIG5vdCBob3cgbm9kZS5qcyBpbXBsZW1lbnRzIGl0IGJ1dCB0aGUgZXhwb3NlZCBhcGkgaXMgdGhlIHNhbWUuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IGZ1bmN0aW9uKGZuKSB7XG4gIHZhciBpZCA9IG5leHRJbW1lZGlhdGVJZCsrO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gZmFsc2UgOiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgaW1tZWRpYXRlSWRzW2lkXSA9IHRydWU7XG5cbiAgbmV4dFRpY2soZnVuY3Rpb24gb25OZXh0VGljaygpIHtcbiAgICBpZiAoaW1tZWRpYXRlSWRzW2lkXSkge1xuICAgICAgLy8gZm4uY2FsbCgpIGlzIGZhc3RlciBzbyB3ZSBvcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiB1c2UtY2FzZVxuICAgICAgLy8gQHNlZSBodHRwOi8vanNwZXJmLmNvbS9jYWxsLWFwcGx5LXNlZ3VcbiAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uY2FsbChudWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIFByZXZlbnQgaWRzIGZyb20gbGVha2luZ1xuICAgICAgZXhwb3J0cy5jbGVhckltbWVkaWF0ZShpZCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaWQ7XG59O1xuXG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gdHlwZW9mIGNsZWFySW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBjbGVhckltbWVkaWF0ZSA6IGZ1bmN0aW9uKGlkKSB7XG4gIGRlbGV0ZSBpbW1lZGlhdGVJZHNbaWRdO1xufTsiXX0=

//# sourceMappingURL=map/search.js.map
