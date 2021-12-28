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

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],4:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],5:[function(require,module,exports){
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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
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

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],7:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],10:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles.js");

var iterableToArrayLimit = require("./iterableToArrayLimit.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableRest = require("./nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithHoles.js":2,"./iterableToArrayLimit.js":8,"./nonIterableRest.js":9,"./unsupportedIterableToArray.js":12}],11:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],12:[function(require,module,exports){
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
},{"./arrayLikeToArray.js":1}],13:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":16}],14:[function(require,module,exports){
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

},{"timers":17}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

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
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
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
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
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
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

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
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],17:[function(require,module,exports){
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

},{"process/browser.js":15,"timers":17}],18:[function(require,module,exports){
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

},{"@babel/runtime/helpers/asyncToGenerator":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/defineProperty":6,"@babel/runtime/helpers/interopRequireDefault":7,"@babel/runtime/helpers/slicedToArray":10,"@babel/runtime/helpers/typeof":11,"@babel/runtime/regenerator":13,"fuzzysort":14}],19:[function(require,module,exports){
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

},{"./lib/ghost-search":18,"@babel/runtime/helpers/interopRequireDefault":7}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZnV6enlzb3J0L2Z1enp5c29ydC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJzcmMvanMvbGliL2dob3N0LXNlYXJjaC5qcyIsInNyYy9qcy9zZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2x2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QSxZQUFZLElBQUksQ0FBaEI7QUFDRDtBQUNGOztBQUVELElBQUEsa0JBQWtCLENBQUMsWUFBRCxFQUFlLE1BQWYsQ0FBbEI7QUFDRCxHQWxIa0IsQ0FvSG5CO0FBQ0E7OztBQUNBLFdBQVMsV0FBVCxDQUFzQixDQUF0QixFQUF5QjtBQUN2QixRQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsT0FBcEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVJLFFBQUksU0FBUyxLQUFLLEVBQWxCLEVBQXNCO0FBQ3BCLE1BQUEsTUFBTSxDQUFDLElBQVA7QUFDQSxNQUFBLFFBQVE7QUFDVCxLQUhELE1BR08sSUFBSSxTQUFTLEtBQUssRUFBZCxJQUFvQixTQUFTLEtBQUssRUFBdEMsRUFBMEM7QUFDL0MsTUFBQSxjQUFjLENBQUMsU0FBRCxDQUFkO0FBQ0EsTUFBQSxDQUFDLENBQUMsY0FBRjtBQUNEO0FBQ0YsR0F0SWtCLENBd0luQjtBQUNBOztBQUNBOzs7QUFDQSxNQUFJLG9CQUFKLENBQWdCLGdCQUFoQjtBQUNELENBNUlELEVBNElHLFFBNUlIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheUxpa2VUb0FycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlcywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2ssIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3MsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG5cbiAgaWYgKF9pID09IG51bGwpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG5cbiAgdmFyIF9zLCBfZTtcblxuICB0cnkge1xuICAgIGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdCwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzLmpzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiKTtcblxudmFyIHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzKSwgX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsIi8qXHJcbldIQVQ6IFN1YmxpbWVUZXh0LWxpa2UgRnV6enkgU2VhcmNoXHJcblxyXG5VU0FHRTpcclxuICBmdXp6eXNvcnQuc2luZ2xlKCdmcycsICdGdXp6eSBTZWFyY2gnKSAvLyB7c2NvcmU6IC0xNn1cclxuICBmdXp6eXNvcnQuc2luZ2xlKCd0ZXN0JywgJ3Rlc3QnKSAvLyB7c2NvcmU6IDB9XHJcbiAgZnV6enlzb3J0LnNpbmdsZSgnZG9lc250IGV4aXN0JywgJ3RhcmdldCcpIC8vIG51bGxcclxuXHJcbiAgZnV6enlzb3J0LmdvKCdtcicsIFsnTW9uaXRvci5jcHAnLCAnTWVzaFJlbmRlcmVyLmNwcCddKVxyXG4gIC8vIFt7c2NvcmU6IC0xOCwgdGFyZ2V0OiBcIk1lc2hSZW5kZXJlci5jcHBcIn0sIHtzY29yZTogLTYwMDksIHRhcmdldDogXCJNb25pdG9yLmNwcFwifV1cclxuXHJcbiAgZnV6enlzb3J0LmhpZ2hsaWdodChmdXp6eXNvcnQuc2luZ2xlKCdmcycsICdGdXp6eSBTZWFyY2gnKSwgJzxiPicsICc8L2I+JylcclxuICAvLyA8Yj5GPC9iPnV6enkgPGI+UzwvYj5lYXJjaFxyXG4qL1xyXG5cclxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pIGZvciBmdXp6eXNvcnRcclxuOyhmdW5jdGlvbihyb290LCBVTUQpIHtcclxuICBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShbXSwgVU1EKVxyXG4gIGVsc2UgaWYodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gVU1EKClcclxuICBlbHNlIHJvb3QuZnV6enlzb3J0ID0gVU1EKClcclxufSkodGhpcywgZnVuY3Rpb24gVU1EKCkgeyBmdW5jdGlvbiBmdXp6eXNvcnROZXcoaW5zdGFuY2VPcHRpb25zKSB7XHJcblxyXG4gIHZhciBmdXp6eXNvcnQgPSB7XHJcblxyXG4gICAgc2luZ2xlOiBmdW5jdGlvbihzZWFyY2gsIHRhcmdldCwgb3B0aW9ucykge1xyXG4gICAgICBpZighc2VhcmNoKSByZXR1cm4gbnVsbFxyXG4gICAgICBpZighaXNPYmooc2VhcmNoKSkgc2VhcmNoID0gZnV6enlzb3J0LmdldFByZXBhcmVkU2VhcmNoKHNlYXJjaClcclxuXHJcbiAgICAgIGlmKCF0YXJnZXQpIHJldHVybiBudWxsXHJcbiAgICAgIGlmKCFpc09iaih0YXJnZXQpKSB0YXJnZXQgPSBmdXp6eXNvcnQuZ2V0UHJlcGFyZWQodGFyZ2V0KVxyXG5cclxuICAgICAgdmFyIGFsbG93VHlwbyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBvcHRpb25zLmFsbG93VHlwb1xyXG4gICAgICAgIDogaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBpbnN0YW5jZU9wdGlvbnMuYWxsb3dUeXBvXHJcbiAgICAgICAgOiB0cnVlXHJcbiAgICAgIHZhciBhbGdvcml0aG0gPSBhbGxvd1R5cG8gPyBmdXp6eXNvcnQuYWxnb3JpdGhtIDogZnV6enlzb3J0LmFsZ29yaXRobU5vVHlwb1xyXG4gICAgICByZXR1cm4gYWxnb3JpdGhtKHNlYXJjaCwgdGFyZ2V0LCBzZWFyY2hbMF0pXHJcbiAgICAgIC8vIHZhciB0aHJlc2hvbGQgPSBvcHRpb25zICYmIG9wdGlvbnMudGhyZXNob2xkIHx8IGluc3RhbmNlT3B0aW9ucyAmJiBpbnN0YW5jZU9wdGlvbnMudGhyZXNob2xkIHx8IC05MDA3MTk5MjU0NzQwOTkxXHJcbiAgICAgIC8vIHZhciByZXN1bHQgPSBhbGdvcml0aG0oc2VhcmNoLCB0YXJnZXQsIHNlYXJjaFswXSlcclxuICAgICAgLy8gaWYocmVzdWx0ID09PSBudWxsKSByZXR1cm4gbnVsbFxyXG4gICAgICAvLyBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIHJldHVybiBudWxsXHJcbiAgICAgIC8vIHJldHVybiByZXN1bHRcclxuICAgIH0sXHJcblxyXG4gICAgZ286IGZ1bmN0aW9uKHNlYXJjaCwgdGFyZ2V0cywgb3B0aW9ucykge1xyXG4gICAgICBpZighc2VhcmNoKSByZXR1cm4gbm9SZXN1bHRzXHJcbiAgICAgIHNlYXJjaCA9IGZ1enp5c29ydC5wcmVwYXJlU2VhcmNoKHNlYXJjaClcclxuICAgICAgdmFyIHNlYXJjaExvd2VyQ29kZSA9IHNlYXJjaFswXVxyXG5cclxuICAgICAgdmFyIHRocmVzaG9sZCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aHJlc2hvbGQgfHwgaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy50aHJlc2hvbGQgfHwgLTkwMDcxOTkyNTQ3NDA5OTFcclxuICAgICAgdmFyIGxpbWl0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmxpbWl0IHx8IGluc3RhbmNlT3B0aW9ucyAmJiBpbnN0YW5jZU9wdGlvbnMubGltaXQgfHwgOTAwNzE5OTI1NDc0MDk5MVxyXG4gICAgICB2YXIgYWxsb3dUeXBvID0gb3B0aW9ucyAmJiBvcHRpb25zLmFsbG93VHlwbyE9PXVuZGVmaW5lZCA/IG9wdGlvbnMuYWxsb3dUeXBvXHJcbiAgICAgICAgOiBpbnN0YW5jZU9wdGlvbnMgJiYgaW5zdGFuY2VPcHRpb25zLmFsbG93VHlwbyE9PXVuZGVmaW5lZCA/IGluc3RhbmNlT3B0aW9ucy5hbGxvd1R5cG9cclxuICAgICAgICA6IHRydWVcclxuICAgICAgdmFyIGFsZ29yaXRobSA9IGFsbG93VHlwbyA/IGZ1enp5c29ydC5hbGdvcml0aG0gOiBmdXp6eXNvcnQuYWxnb3JpdGhtTm9UeXBvXHJcbiAgICAgIHZhciByZXN1bHRzTGVuID0gMDsgdmFyIGxpbWl0ZWRDb3VudCA9IDBcclxuICAgICAgdmFyIHRhcmdldHNMZW4gPSB0YXJnZXRzLmxlbmd0aFxyXG5cclxuICAgICAgLy8gVGhpcyBjb2RlIGlzIGNvcHkvcGFzdGVkIDMgdGltZXMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgW29wdGlvbnMua2V5cywgb3B0aW9ucy5rZXksIG5vIGtleXNdXHJcblxyXG4gICAgICAvLyBvcHRpb25zLmtleXNcclxuICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmtleXMpIHtcclxuICAgICAgICB2YXIgc2NvcmVGbiA9IG9wdGlvbnMuc2NvcmVGbiB8fCBkZWZhdWx0U2NvcmVGblxyXG4gICAgICAgIHZhciBrZXlzID0gb3B0aW9ucy5rZXlzXHJcbiAgICAgICAgdmFyIGtleXNMZW4gPSBrZXlzLmxlbmd0aFxyXG4gICAgICAgIGZvcih2YXIgaSA9IHRhcmdldHNMZW4gLSAxOyBpID49IDA7IC0taSkgeyB2YXIgb2JqID0gdGFyZ2V0c1tpXVxyXG4gICAgICAgICAgdmFyIG9ialJlc3VsdHMgPSBuZXcgQXJyYXkoa2V5c0xlbilcclxuICAgICAgICAgIGZvciAodmFyIGtleUkgPSBrZXlzTGVuIC0gMTsga2V5SSA+PSAwOyAtLWtleUkpIHtcclxuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNba2V5SV1cclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGdldFZhbHVlKG9iaiwga2V5KVxyXG4gICAgICAgICAgICBpZighdGFyZ2V0KSB7IG9ialJlc3VsdHNba2V5SV0gPSBudWxsOyBjb250aW51ZSB9XHJcbiAgICAgICAgICAgIGlmKCFpc09iaih0YXJnZXQpKSB0YXJnZXQgPSBmdXp6eXNvcnQuZ2V0UHJlcGFyZWQodGFyZ2V0KVxyXG5cclxuICAgICAgICAgICAgb2JqUmVzdWx0c1trZXlJXSA9IGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoTG93ZXJDb2RlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgb2JqUmVzdWx0cy5vYmogPSBvYmogLy8gYmVmb3JlIHNjb3JlRm4gc28gc2NvcmVGbiBjYW4gdXNlIGl0XHJcbiAgICAgICAgICB2YXIgc2NvcmUgPSBzY29yZUZuKG9ialJlc3VsdHMpXHJcbiAgICAgICAgICBpZihzY29yZSA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgIGlmKHNjb3JlIDwgdGhyZXNob2xkKSBjb250aW51ZVxyXG4gICAgICAgICAgb2JqUmVzdWx0cy5zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgICBpZihyZXN1bHRzTGVuIDwgbGltaXQpIHsgcS5hZGQob2JqUmVzdWx0cyk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgKytsaW1pdGVkQ291bnRcclxuICAgICAgICAgICAgaWYoc2NvcmUgPiBxLnBlZWsoKS5zY29yZSkgcS5yZXBsYWNlVG9wKG9ialJlc3VsdHMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gb3B0aW9ucy5rZXlcclxuICAgICAgfSBlbHNlIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5rZXkpIHtcclxuICAgICAgICB2YXIga2V5ID0gb3B0aW9ucy5rZXlcclxuICAgICAgICBmb3IodmFyIGkgPSB0YXJnZXRzTGVuIC0gMTsgaSA+PSAwOyAtLWkpIHsgdmFyIG9iaiA9IHRhcmdldHNbaV1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBnZXRWYWx1ZShvYmosIGtleSlcclxuICAgICAgICAgIGlmKCF0YXJnZXQpIGNvbnRpbnVlXHJcbiAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gYWxnb3JpdGhtKHNlYXJjaCwgdGFyZ2V0LCBzZWFyY2hMb3dlckNvZGUpXHJcbiAgICAgICAgICBpZihyZXN1bHQgPT09IG51bGwpIGNvbnRpbnVlXHJcbiAgICAgICAgICBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgICAgLy8gaGF2ZSB0byBjbG9uZSByZXN1bHQgc28gZHVwbGljYXRlIHRhcmdldHMgZnJvbSBkaWZmZXJlbnQgb2JqIGNhbiBlYWNoIHJlZmVyZW5jZSB0aGUgY29ycmVjdCBvYmpcclxuICAgICAgICAgIHJlc3VsdCA9IHt0YXJnZXQ6cmVzdWx0LnRhcmdldCwgX3RhcmdldExvd2VyQ29kZXM6bnVsbCwgX25leHRCZWdpbm5pbmdJbmRleGVzOm51bGwsIHNjb3JlOnJlc3VsdC5zY29yZSwgaW5kZXhlczpyZXN1bHQuaW5kZXhlcywgb2JqOm9ian0gLy8gaGlkZGVuXHJcblxyXG4gICAgICAgICAgaWYocmVzdWx0c0xlbiA8IGxpbWl0KSB7IHEuYWRkKHJlc3VsdCk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgKytsaW1pdGVkQ291bnRcclxuICAgICAgICAgICAgaWYocmVzdWx0LnNjb3JlID4gcS5wZWVrKCkuc2NvcmUpIHEucmVwbGFjZVRvcChyZXN1bHQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gbm8ga2V5c1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IHRhcmdldHNMZW4gLSAxOyBpID49IDA7IC0taSkgeyB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXVxyXG4gICAgICAgICAgaWYoIXRhcmdldCkgY29udGludWVcclxuICAgICAgICAgIGlmKCFpc09iaih0YXJnZXQpKSB0YXJnZXQgPSBmdXp6eXNvcnQuZ2V0UHJlcGFyZWQodGFyZ2V0KVxyXG5cclxuICAgICAgICAgIHZhciByZXN1bHQgPSBhbGdvcml0aG0oc2VhcmNoLCB0YXJnZXQsIHNlYXJjaExvd2VyQ29kZSlcclxuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgIGlmKHJlc3VsdC5zY29yZSA8IHRocmVzaG9sZCkgY29udGludWVcclxuICAgICAgICAgIGlmKHJlc3VsdHNMZW4gPCBsaW1pdCkgeyBxLmFkZChyZXN1bHQpOyArK3Jlc3VsdHNMZW4gfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICsrbGltaXRlZENvdW50XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5zY29yZSA+IHEucGVlaygpLnNjb3JlKSBxLnJlcGxhY2VUb3AocmVzdWx0KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYocmVzdWx0c0xlbiA9PT0gMCkgcmV0dXJuIG5vUmVzdWx0c1xyXG4gICAgICB2YXIgcmVzdWx0cyA9IG5ldyBBcnJheShyZXN1bHRzTGVuKVxyXG4gICAgICBmb3IodmFyIGkgPSByZXN1bHRzTGVuIC0gMTsgaSA+PSAwOyAtLWkpIHJlc3VsdHNbaV0gPSBxLnBvbGwoKVxyXG4gICAgICByZXN1bHRzLnRvdGFsID0gcmVzdWx0c0xlbiArIGxpbWl0ZWRDb3VudFxyXG4gICAgICByZXR1cm4gcmVzdWx0c1xyXG4gICAgfSxcclxuXHJcbiAgICBnb0FzeW5jOiBmdW5jdGlvbihzZWFyY2gsIHRhcmdldHMsIG9wdGlvbnMpIHtcclxuICAgICAgdmFyIGNhbmNlbGVkID0gZmFsc2VcclxuICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBpZighc2VhcmNoKSByZXR1cm4gcmVzb2x2ZShub1Jlc3VsdHMpXHJcbiAgICAgICAgc2VhcmNoID0gZnV6enlzb3J0LnByZXBhcmVTZWFyY2goc2VhcmNoKVxyXG4gICAgICAgIHZhciBzZWFyY2hMb3dlckNvZGUgPSBzZWFyY2hbMF1cclxuXHJcbiAgICAgICAgdmFyIHEgPSBmYXN0cHJpb3JpdHlxdWV1ZSgpXHJcbiAgICAgICAgdmFyIGlDdXJyZW50ID0gdGFyZ2V0cy5sZW5ndGggLSAxXHJcbiAgICAgICAgdmFyIHRocmVzaG9sZCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aHJlc2hvbGQgfHwgaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy50aHJlc2hvbGQgfHwgLTkwMDcxOTkyNTQ3NDA5OTFcclxuICAgICAgICB2YXIgbGltaXQgPSBvcHRpb25zICYmIG9wdGlvbnMubGltaXQgfHwgaW5zdGFuY2VPcHRpb25zICYmIGluc3RhbmNlT3B0aW9ucy5saW1pdCB8fCA5MDA3MTk5MjU0NzQwOTkxXHJcbiAgICAgICAgdmFyIGFsbG93VHlwbyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd1R5cG8hPT11bmRlZmluZWQgPyBvcHRpb25zLmFsbG93VHlwb1xyXG4gICAgICAgICAgOiBpbnN0YW5jZU9wdGlvbnMgJiYgaW5zdGFuY2VPcHRpb25zLmFsbG93VHlwbyE9PXVuZGVmaW5lZCA/IGluc3RhbmNlT3B0aW9ucy5hbGxvd1R5cG9cclxuICAgICAgICAgIDogdHJ1ZVxyXG4gICAgICAgIHZhciBhbGdvcml0aG0gPSBhbGxvd1R5cG8gPyBmdXp6eXNvcnQuYWxnb3JpdGhtIDogZnV6enlzb3J0LmFsZ29yaXRobU5vVHlwb1xyXG4gICAgICAgIHZhciByZXN1bHRzTGVuID0gMDsgdmFyIGxpbWl0ZWRDb3VudCA9IDBcclxuICAgICAgICBmdW5jdGlvbiBzdGVwKCkge1xyXG4gICAgICAgICAgaWYoY2FuY2VsZWQpIHJldHVybiByZWplY3QoJ2NhbmNlbGVkJylcclxuXHJcbiAgICAgICAgICB2YXIgc3RhcnRNcyA9IERhdGUubm93KClcclxuXHJcbiAgICAgICAgICAvLyBUaGlzIGNvZGUgaXMgY29weS9wYXN0ZWQgMyB0aW1lcyBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBbb3B0aW9ucy5rZXlzLCBvcHRpb25zLmtleSwgbm8ga2V5c11cclxuXHJcbiAgICAgICAgICAvLyBvcHRpb25zLmtleXNcclxuICAgICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5rZXlzKSB7XHJcbiAgICAgICAgICAgIHZhciBzY29yZUZuID0gb3B0aW9ucy5zY29yZUZuIHx8IGRlZmF1bHRTY29yZUZuXHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gb3B0aW9ucy5rZXlzXHJcbiAgICAgICAgICAgIHZhciBrZXlzTGVuID0ga2V5cy5sZW5ndGhcclxuICAgICAgICAgICAgZm9yKDsgaUN1cnJlbnQgPj0gMDsgLS1pQ3VycmVudCkgeyB2YXIgb2JqID0gdGFyZ2V0c1tpQ3VycmVudF1cclxuICAgICAgICAgICAgICB2YXIgb2JqUmVzdWx0cyA9IG5ldyBBcnJheShrZXlzTGVuKVxyXG4gICAgICAgICAgICAgIGZvciAodmFyIGtleUkgPSBrZXlzTGVuIC0gMTsga2V5SSA+PSAwOyAtLWtleUkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2tleUldXHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZ2V0VmFsdWUob2JqLCBrZXkpXHJcbiAgICAgICAgICAgICAgICBpZighdGFyZ2V0KSB7IG9ialJlc3VsdHNba2V5SV0gPSBudWxsOyBjb250aW51ZSB9XHJcbiAgICAgICAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICAgICAgICBvYmpSZXN1bHRzW2tleUldID0gYWxnb3JpdGhtKHNlYXJjaCwgdGFyZ2V0LCBzZWFyY2hMb3dlckNvZGUpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIG9ialJlc3VsdHMub2JqID0gb2JqIC8vIGJlZm9yZSBzY29yZUZuIHNvIHNjb3JlRm4gY2FuIHVzZSBpdFxyXG4gICAgICAgICAgICAgIHZhciBzY29yZSA9IHNjb3JlRm4ob2JqUmVzdWx0cylcclxuICAgICAgICAgICAgICBpZihzY29yZSA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZihzY29yZSA8IHRocmVzaG9sZCkgY29udGludWVcclxuICAgICAgICAgICAgICBvYmpSZXN1bHRzLnNjb3JlID0gc2NvcmVcclxuICAgICAgICAgICAgICBpZihyZXN1bHRzTGVuIDwgbGltaXQpIHsgcS5hZGQob2JqUmVzdWx0cyk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICArK2xpbWl0ZWRDb3VudFxyXG4gICAgICAgICAgICAgICAgaWYoc2NvcmUgPiBxLnBlZWsoKS5zY29yZSkgcS5yZXBsYWNlVG9wKG9ialJlc3VsdHMpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZihpQ3VycmVudCUxMDAwLyppdGVtc1BlckNoZWNrKi8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmKERhdGUubm93KCkgLSBzdGFydE1zID49IDEwLyphc3luY0ludGVydmFsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgaXNOb2RlP3NldEltbWVkaWF0ZShzdGVwKTpzZXRUaW1lb3V0KHN0ZXApXHJcbiAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG9wdGlvbnMua2V5XHJcbiAgICAgICAgICB9IGVsc2UgaWYob3B0aW9ucyAmJiBvcHRpb25zLmtleSkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gb3B0aW9ucy5rZXlcclxuICAgICAgICAgICAgZm9yKDsgaUN1cnJlbnQgPj0gMDsgLS1pQ3VycmVudCkgeyB2YXIgb2JqID0gdGFyZ2V0c1tpQ3VycmVudF1cclxuICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZ2V0VmFsdWUob2JqLCBrZXkpXHJcbiAgICAgICAgICAgICAgaWYoIXRhcmdldCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoTG93ZXJDb2RlKVxyXG4gICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIGNvbnRpbnVlXHJcblxyXG4gICAgICAgICAgICAgIC8vIGhhdmUgdG8gY2xvbmUgcmVzdWx0IHNvIGR1cGxpY2F0ZSB0YXJnZXRzIGZyb20gZGlmZmVyZW50IG9iaiBjYW4gZWFjaCByZWZlcmVuY2UgdGhlIGNvcnJlY3Qgb2JqXHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0ge3RhcmdldDpyZXN1bHQudGFyZ2V0LCBfdGFyZ2V0TG93ZXJDb2RlczpudWxsLCBfbmV4dEJlZ2lubmluZ0luZGV4ZXM6bnVsbCwgc2NvcmU6cmVzdWx0LnNjb3JlLCBpbmRleGVzOnJlc3VsdC5pbmRleGVzLCBvYmo6b2JqfSAvLyBoaWRkZW5cclxuXHJcbiAgICAgICAgICAgICAgaWYocmVzdWx0c0xlbiA8IGxpbWl0KSB7IHEuYWRkKHJlc3VsdCk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICArK2xpbWl0ZWRDb3VudFxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnNjb3JlID4gcS5wZWVrKCkuc2NvcmUpIHEucmVwbGFjZVRvcChyZXN1bHQpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZihpQ3VycmVudCUxMDAwLyppdGVtc1BlckNoZWNrKi8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmKERhdGUubm93KCkgLSBzdGFydE1zID49IDEwLyphc3luY0ludGVydmFsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgaXNOb2RlP3NldEltbWVkaWF0ZShzdGVwKTpzZXRUaW1lb3V0KHN0ZXApXHJcbiAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG5vIGtleXNcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcig7IGlDdXJyZW50ID49IDA7IC0taUN1cnJlbnQpIHsgdmFyIHRhcmdldCA9IHRhcmdldHNbaUN1cnJlbnRdXHJcbiAgICAgICAgICAgICAgaWYoIXRhcmdldCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZighaXNPYmoodGFyZ2V0KSkgdGFyZ2V0ID0gZnV6enlzb3J0LmdldFByZXBhcmVkKHRhcmdldClcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGFsZ29yaXRobShzZWFyY2gsIHRhcmdldCwgc2VhcmNoTG93ZXJDb2RlKVxyXG4gICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gbnVsbCkgY29udGludWVcclxuICAgICAgICAgICAgICBpZihyZXN1bHQuc2NvcmUgPCB0aHJlc2hvbGQpIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgaWYocmVzdWx0c0xlbiA8IGxpbWl0KSB7IHEuYWRkKHJlc3VsdCk7ICsrcmVzdWx0c0xlbiB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICArK2xpbWl0ZWRDb3VudFxyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LnNjb3JlID4gcS5wZWVrKCkuc2NvcmUpIHEucmVwbGFjZVRvcChyZXN1bHQpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZihpQ3VycmVudCUxMDAwLyppdGVtc1BlckNoZWNrKi8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmKERhdGUubm93KCkgLSBzdGFydE1zID49IDEwLyphc3luY0ludGVydmFsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgaXNOb2RlP3NldEltbWVkaWF0ZShzdGVwKTpzZXRUaW1lb3V0KHN0ZXApXHJcbiAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKHJlc3VsdHNMZW4gPT09IDApIHJldHVybiByZXNvbHZlKG5vUmVzdWx0cylcclxuICAgICAgICAgIHZhciByZXN1bHRzID0gbmV3IEFycmF5KHJlc3VsdHNMZW4pXHJcbiAgICAgICAgICBmb3IodmFyIGkgPSByZXN1bHRzTGVuIC0gMTsgaSA+PSAwOyAtLWkpIHJlc3VsdHNbaV0gPSBxLnBvbGwoKVxyXG4gICAgICAgICAgcmVzdWx0cy50b3RhbCA9IHJlc3VsdHNMZW4gKyBsaW1pdGVkQ291bnRcclxuICAgICAgICAgIHJlc29sdmUocmVzdWx0cylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzTm9kZT9zZXRJbW1lZGlhdGUoc3RlcCk6c3RlcCgpXHJcbiAgICAgIH0pXHJcbiAgICAgIHAuY2FuY2VsID0gZnVuY3Rpb24oKSB7IGNhbmNlbGVkID0gdHJ1ZSB9XHJcbiAgICAgIHJldHVybiBwXHJcbiAgICB9LFxyXG5cclxuICAgIGhpZ2hsaWdodDogZnVuY3Rpb24ocmVzdWx0LCBoT3BlbiwgaENsb3NlKSB7XHJcbiAgICAgIGlmKHJlc3VsdCA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICAgICAgaWYoaE9wZW4gPT09IHVuZGVmaW5lZCkgaE9wZW4gPSAnPGI+J1xyXG4gICAgICBpZihoQ2xvc2UgPT09IHVuZGVmaW5lZCkgaENsb3NlID0gJzwvYj4nXHJcbiAgICAgIHZhciBoaWdobGlnaHRlZCA9ICcnXHJcbiAgICAgIHZhciBtYXRjaGVzSW5kZXggPSAwXHJcbiAgICAgIHZhciBvcGVuZWQgPSBmYWxzZVxyXG4gICAgICB2YXIgdGFyZ2V0ID0gcmVzdWx0LnRhcmdldFxyXG4gICAgICB2YXIgdGFyZ2V0TGVuID0gdGFyZ2V0Lmxlbmd0aFxyXG4gICAgICB2YXIgbWF0Y2hlc0Jlc3QgPSByZXN1bHQuaW5kZXhlc1xyXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGFyZ2V0TGVuOyArK2kpIHsgdmFyIGNoYXIgPSB0YXJnZXRbaV1cclxuICAgICAgICBpZihtYXRjaGVzQmVzdFttYXRjaGVzSW5kZXhdID09PSBpKSB7XHJcbiAgICAgICAgICArK21hdGNoZXNJbmRleFxyXG4gICAgICAgICAgaWYoIW9wZW5lZCkgeyBvcGVuZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodGVkICs9IGhPcGVuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYobWF0Y2hlc0luZGV4ID09PSBtYXRjaGVzQmVzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQgKz0gY2hhciArIGhDbG9zZSArIHRhcmdldC5zdWJzdHIoaSsxKVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZihvcGVuZWQpIHsgb3BlbmVkID0gZmFsc2VcclxuICAgICAgICAgICAgaGlnaGxpZ2h0ZWQgKz0gaENsb3NlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhpZ2hsaWdodGVkICs9IGNoYXJcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGhpZ2hsaWdodGVkXHJcbiAgICB9LFxyXG5cclxuICAgIHByZXBhcmU6IGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICBpZighdGFyZ2V0KSByZXR1cm5cclxuICAgICAgcmV0dXJuIHt0YXJnZXQ6dGFyZ2V0LCBfdGFyZ2V0TG93ZXJDb2RlczpmdXp6eXNvcnQucHJlcGFyZUxvd2VyQ29kZXModGFyZ2V0KSwgX25leHRCZWdpbm5pbmdJbmRleGVzOm51bGwsIHNjb3JlOm51bGwsIGluZGV4ZXM6bnVsbCwgb2JqOm51bGx9IC8vIGhpZGRlblxyXG4gICAgfSxcclxuICAgIHByZXBhcmVTbG93OiBmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgaWYoIXRhcmdldCkgcmV0dXJuXHJcbiAgICAgIHJldHVybiB7dGFyZ2V0OnRhcmdldCwgX3RhcmdldExvd2VyQ29kZXM6ZnV6enlzb3J0LnByZXBhcmVMb3dlckNvZGVzKHRhcmdldCksIF9uZXh0QmVnaW5uaW5nSW5kZXhlczpmdXp6eXNvcnQucHJlcGFyZU5leHRCZWdpbm5pbmdJbmRleGVzKHRhcmdldCksIHNjb3JlOm51bGwsIGluZGV4ZXM6bnVsbCwgb2JqOm51bGx9IC8vIGhpZGRlblxyXG4gICAgfSxcclxuICAgIHByZXBhcmVTZWFyY2g6IGZ1bmN0aW9uKHNlYXJjaCkge1xyXG4gICAgICBpZighc2VhcmNoKSByZXR1cm5cclxuICAgICAgcmV0dXJuIGZ1enp5c29ydC5wcmVwYXJlTG93ZXJDb2RlcyhzZWFyY2gpXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLy8gQmVsb3cgdGhpcyBwb2ludCBpcyBvbmx5IGludGVybmFsIGNvZGVcclxuICAgIC8vIEJlbG93IHRoaXMgcG9pbnQgaXMgb25seSBpbnRlcm5hbCBjb2RlXHJcbiAgICAvLyBCZWxvdyB0aGlzIHBvaW50IGlzIG9ubHkgaW50ZXJuYWwgY29kZVxyXG4gICAgLy8gQmVsb3cgdGhpcyBwb2ludCBpcyBvbmx5IGludGVybmFsIGNvZGVcclxuXHJcblxyXG5cclxuICAgIGdldFByZXBhcmVkOiBmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgaWYodGFyZ2V0Lmxlbmd0aCA+IDk5OSkgcmV0dXJuIGZ1enp5c29ydC5wcmVwYXJlKHRhcmdldCkgLy8gZG9uJ3QgY2FjaGUgaHVnZSB0YXJnZXRzXHJcbiAgICAgIHZhciB0YXJnZXRQcmVwYXJlZCA9IHByZXBhcmVkQ2FjaGUuZ2V0KHRhcmdldClcclxuICAgICAgaWYodGFyZ2V0UHJlcGFyZWQgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHRhcmdldFByZXBhcmVkXHJcbiAgICAgIHRhcmdldFByZXBhcmVkID0gZnV6enlzb3J0LnByZXBhcmUodGFyZ2V0KVxyXG4gICAgICBwcmVwYXJlZENhY2hlLnNldCh0YXJnZXQsIHRhcmdldFByZXBhcmVkKVxyXG4gICAgICByZXR1cm4gdGFyZ2V0UHJlcGFyZWRcclxuICAgIH0sXHJcbiAgICBnZXRQcmVwYXJlZFNlYXJjaDogZnVuY3Rpb24oc2VhcmNoKSB7XHJcbiAgICAgIGlmKHNlYXJjaC5sZW5ndGggPiA5OTkpIHJldHVybiBmdXp6eXNvcnQucHJlcGFyZVNlYXJjaChzZWFyY2gpIC8vIGRvbid0IGNhY2hlIGh1Z2Ugc2VhcmNoZXNcclxuICAgICAgdmFyIHNlYXJjaFByZXBhcmVkID0gcHJlcGFyZWRTZWFyY2hDYWNoZS5nZXQoc2VhcmNoKVxyXG4gICAgICBpZihzZWFyY2hQcmVwYXJlZCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gc2VhcmNoUHJlcGFyZWRcclxuICAgICAgc2VhcmNoUHJlcGFyZWQgPSBmdXp6eXNvcnQucHJlcGFyZVNlYXJjaChzZWFyY2gpXHJcbiAgICAgIHByZXBhcmVkU2VhcmNoQ2FjaGUuc2V0KHNlYXJjaCwgc2VhcmNoUHJlcGFyZWQpXHJcbiAgICAgIHJldHVybiBzZWFyY2hQcmVwYXJlZFxyXG4gICAgfSxcclxuXHJcbiAgICBhbGdvcml0aG06IGZ1bmN0aW9uKHNlYXJjaExvd2VyQ29kZXMsIHByZXBhcmVkLCBzZWFyY2hMb3dlckNvZGUpIHtcclxuICAgICAgdmFyIHRhcmdldExvd2VyQ29kZXMgPSBwcmVwYXJlZC5fdGFyZ2V0TG93ZXJDb2Rlc1xyXG4gICAgICB2YXIgc2VhcmNoTGVuID0gc2VhcmNoTG93ZXJDb2Rlcy5sZW5ndGhcclxuICAgICAgdmFyIHRhcmdldExlbiA9IHRhcmdldExvd2VyQ29kZXMubGVuZ3RoXHJcbiAgICAgIHZhciBzZWFyY2hJID0gMCAvLyB3aGVyZSB3ZSBhdFxyXG4gICAgICB2YXIgdGFyZ2V0SSA9IDAgLy8gd2hlcmUgeW91IGF0XHJcbiAgICAgIHZhciB0eXBvU2ltcGxlSSA9IDBcclxuICAgICAgdmFyIG1hdGNoZXNTaW1wbGVMZW4gPSAwXHJcblxyXG4gICAgICAvLyB2ZXJ5IGJhc2ljIGZ1enp5IG1hdGNoOyB0byByZW1vdmUgbm9uLW1hdGNoaW5nIHRhcmdldHMgQVNBUCFcclxuICAgICAgLy8gd2FsayB0aHJvdWdoIHRhcmdldC4gZmluZCBzZXF1ZW50aWFsIG1hdGNoZXMuXHJcbiAgICAgIC8vIGlmIGFsbCBjaGFycyBhcmVuJ3QgZm91bmQgdGhlbiBleGl0XHJcbiAgICAgIGZvcig7Oykge1xyXG4gICAgICAgIHZhciBpc01hdGNoID0gc2VhcmNoTG93ZXJDb2RlID09PSB0YXJnZXRMb3dlckNvZGVzW3RhcmdldEldXHJcbiAgICAgICAgaWYoaXNNYXRjaCkge1xyXG4gICAgICAgICAgbWF0Y2hlc1NpbXBsZVttYXRjaGVzU2ltcGxlTGVuKytdID0gdGFyZ2V0SVxyXG4gICAgICAgICAgKytzZWFyY2hJOyBpZihzZWFyY2hJID09PSBzZWFyY2hMZW4pIGJyZWFrXHJcbiAgICAgICAgICBzZWFyY2hMb3dlckNvZGUgPSBzZWFyY2hMb3dlckNvZGVzW3R5cG9TaW1wbGVJPT09MD9zZWFyY2hJIDogKHR5cG9TaW1wbGVJPT09c2VhcmNoST9zZWFyY2hJKzEgOiAodHlwb1NpbXBsZUk9PT1zZWFyY2hJLTE/c2VhcmNoSS0xIDogc2VhcmNoSSkpXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgKyt0YXJnZXRJOyBpZih0YXJnZXRJID49IHRhcmdldExlbikgeyAvLyBGYWlsZWQgdG8gZmluZCBzZWFyY2hJXHJcbiAgICAgICAgICAvLyBDaGVjayBmb3IgdHlwbyBvciBleGl0XHJcbiAgICAgICAgICAvLyB3ZSBnbyBhcyBmYXIgYXMgcG9zc2libGUgYmVmb3JlIHRyeWluZyB0byB0cmFuc3Bvc2VcclxuICAgICAgICAgIC8vIHRoZW4gd2UgdHJhbnNwb3NlIGJhY2t3YXJkcyB1bnRpbCB3ZSByZWFjaCB0aGUgYmVnaW5uaW5nXHJcbiAgICAgICAgICBmb3IoOzspIHtcclxuICAgICAgICAgICAgaWYoc2VhcmNoSSA8PSAxKSByZXR1cm4gbnVsbCAvLyBub3QgYWxsb3dlZCB0byB0cmFuc3Bvc2UgZmlyc3QgY2hhclxyXG4gICAgICAgICAgICBpZih0eXBvU2ltcGxlSSA9PT0gMCkgeyAvLyB3ZSBoYXZlbid0IHRyaWVkIHRvIHRyYW5zcG9zZSB5ZXRcclxuICAgICAgICAgICAgICAtLXNlYXJjaElcclxuICAgICAgICAgICAgICB2YXIgc2VhcmNoTG93ZXJDb2RlTmV3ID0gc2VhcmNoTG93ZXJDb2Rlc1tzZWFyY2hJXVxyXG4gICAgICAgICAgICAgIGlmKHNlYXJjaExvd2VyQ29kZSA9PT0gc2VhcmNoTG93ZXJDb2RlTmV3KSBjb250aW51ZSAvLyBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gdHJhbnNwb3NlIGEgcmVwZWF0IGNoYXJcclxuICAgICAgICAgICAgICB0eXBvU2ltcGxlSSA9IHNlYXJjaElcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZih0eXBvU2ltcGxlSSA9PT0gMSkgcmV0dXJuIG51bGwgLy8gcmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBsaW5lIGZvciB0cmFuc3Bvc2luZ1xyXG4gICAgICAgICAgICAgIC0tdHlwb1NpbXBsZUlcclxuICAgICAgICAgICAgICBzZWFyY2hJID0gdHlwb1NpbXBsZUlcclxuICAgICAgICAgICAgICBzZWFyY2hMb3dlckNvZGUgPSBzZWFyY2hMb3dlckNvZGVzW3NlYXJjaEkgKyAxXVxyXG4gICAgICAgICAgICAgIHZhciBzZWFyY2hMb3dlckNvZGVOZXcgPSBzZWFyY2hMb3dlckNvZGVzW3NlYXJjaEldXHJcbiAgICAgICAgICAgICAgaWYoc2VhcmNoTG93ZXJDb2RlID09PSBzZWFyY2hMb3dlckNvZGVOZXcpIGNvbnRpbnVlIC8vIGRvZXNuJ3QgbWFrZSBzZW5zZSB0byB0cmFuc3Bvc2UgYSByZXBlYXQgY2hhclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hdGNoZXNTaW1wbGVMZW4gPSBzZWFyY2hJXHJcbiAgICAgICAgICAgIHRhcmdldEkgPSBtYXRjaGVzU2ltcGxlW21hdGNoZXNTaW1wbGVMZW4gLSAxXSArIDFcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBzZWFyY2hJID0gMFxyXG4gICAgICB2YXIgdHlwb1N0cmljdEkgPSAwXHJcbiAgICAgIHZhciBzdWNjZXNzU3RyaWN0ID0gZmFsc2VcclxuICAgICAgdmFyIG1hdGNoZXNTdHJpY3RMZW4gPSAwXHJcblxyXG4gICAgICB2YXIgbmV4dEJlZ2lubmluZ0luZGV4ZXMgPSBwcmVwYXJlZC5fbmV4dEJlZ2lubmluZ0luZGV4ZXNcclxuICAgICAgaWYobmV4dEJlZ2lubmluZ0luZGV4ZXMgPT09IG51bGwpIG5leHRCZWdpbm5pbmdJbmRleGVzID0gcHJlcGFyZWQuX25leHRCZWdpbm5pbmdJbmRleGVzID0gZnV6enlzb3J0LnByZXBhcmVOZXh0QmVnaW5uaW5nSW5kZXhlcyhwcmVwYXJlZC50YXJnZXQpXHJcbiAgICAgIHZhciBmaXJzdFBvc3NpYmxlSSA9IHRhcmdldEkgPSBtYXRjaGVzU2ltcGxlWzBdPT09MCA/IDAgOiBuZXh0QmVnaW5uaW5nSW5kZXhlc1ttYXRjaGVzU2ltcGxlWzBdLTFdXHJcblxyXG4gICAgICAvLyBPdXIgdGFyZ2V0IHN0cmluZyBzdWNjZXNzZnVsbHkgbWF0Y2hlZCBhbGwgY2hhcmFjdGVycyBpbiBzZXF1ZW5jZSFcclxuICAgICAgLy8gTGV0J3MgdHJ5IGEgbW9yZSBhZHZhbmNlZCBhbmQgc3RyaWN0IHRlc3QgdG8gaW1wcm92ZSB0aGUgc2NvcmVcclxuICAgICAgLy8gb25seSBjb3VudCBpdCBhcyBhIG1hdGNoIGlmIGl0J3MgY29uc2VjdXRpdmUgb3IgYSBiZWdpbm5pbmcgY2hhcmFjdGVyIVxyXG4gICAgICBpZih0YXJnZXRJICE9PSB0YXJnZXRMZW4pIGZvcig7Oykge1xyXG4gICAgICAgIGlmKHRhcmdldEkgPj0gdGFyZ2V0TGVuKSB7XHJcbiAgICAgICAgICAvLyBXZSBmYWlsZWQgdG8gZmluZCBhIGdvb2Qgc3BvdCBmb3IgdGhpcyBzZWFyY2ggY2hhciwgZ28gYmFjayB0byB0aGUgcHJldmlvdXMgc2VhcmNoIGNoYXIgYW5kIGZvcmNlIGl0IGZvcndhcmRcclxuICAgICAgICAgIGlmKHNlYXJjaEkgPD0gMCkgeyAvLyBXZSBmYWlsZWQgdG8gcHVzaCBjaGFycyBmb3J3YXJkIGZvciBhIGJldHRlciBtYXRjaFxyXG4gICAgICAgICAgICAvLyB0cmFuc3Bvc2UsIHN0YXJ0aW5nIGZyb20gdGhlIGJlZ2lubmluZ1xyXG4gICAgICAgICAgICArK3R5cG9TdHJpY3RJOyBpZih0eXBvU3RyaWN0SSA+IHNlYXJjaExlbi0yKSBicmVha1xyXG4gICAgICAgICAgICBpZihzZWFyY2hMb3dlckNvZGVzW3R5cG9TdHJpY3RJXSA9PT0gc2VhcmNoTG93ZXJDb2Rlc1t0eXBvU3RyaWN0SSsxXSkgY29udGludWUgLy8gZG9lc24ndCBtYWtlIHNlbnNlIHRvIHRyYW5zcG9zZSBhIHJlcGVhdCBjaGFyXHJcbiAgICAgICAgICAgIHRhcmdldEkgPSBmaXJzdFBvc3NpYmxlSVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC0tc2VhcmNoSVxyXG4gICAgICAgICAgdmFyIGxhc3RNYXRjaCA9IG1hdGNoZXNTdHJpY3RbLS1tYXRjaGVzU3RyaWN0TGVuXVxyXG4gICAgICAgICAgdGFyZ2V0SSA9IG5leHRCZWdpbm5pbmdJbmRleGVzW2xhc3RNYXRjaF1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBpc01hdGNoID0gc2VhcmNoTG93ZXJDb2Rlc1t0eXBvU3RyaWN0ST09PTA/c2VhcmNoSSA6ICh0eXBvU3RyaWN0ST09PXNlYXJjaEk/c2VhcmNoSSsxIDogKHR5cG9TdHJpY3RJPT09c2VhcmNoSS0xP3NlYXJjaEktMSA6IHNlYXJjaEkpKV0gPT09IHRhcmdldExvd2VyQ29kZXNbdGFyZ2V0SV1cclxuICAgICAgICAgIGlmKGlzTWF0Y2gpIHtcclxuICAgICAgICAgICAgbWF0Y2hlc1N0cmljdFttYXRjaGVzU3RyaWN0TGVuKytdID0gdGFyZ2V0SVxyXG4gICAgICAgICAgICArK3NlYXJjaEk7IGlmKHNlYXJjaEkgPT09IHNlYXJjaExlbikgeyBzdWNjZXNzU3RyaWN0ID0gdHJ1ZTsgYnJlYWsgfVxyXG4gICAgICAgICAgICArK3RhcmdldElcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhcmdldEkgPSBuZXh0QmVnaW5uaW5nSW5kZXhlc1t0YXJnZXRJXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgeyAvLyB0YWxseSB1cCB0aGUgc2NvcmUgJiBrZWVwIHRyYWNrIG9mIG1hdGNoZXMgZm9yIGhpZ2hsaWdodGluZyBsYXRlclxyXG4gICAgICAgIGlmKHN1Y2Nlc3NTdHJpY3QpIHsgdmFyIG1hdGNoZXNCZXN0ID0gbWF0Y2hlc1N0cmljdDsgdmFyIG1hdGNoZXNCZXN0TGVuID0gbWF0Y2hlc1N0cmljdExlbiB9XHJcbiAgICAgICAgZWxzZSB7IHZhciBtYXRjaGVzQmVzdCA9IG1hdGNoZXNTaW1wbGU7IHZhciBtYXRjaGVzQmVzdExlbiA9IG1hdGNoZXNTaW1wbGVMZW4gfVxyXG4gICAgICAgIHZhciBzY29yZSA9IDBcclxuICAgICAgICB2YXIgbGFzdFRhcmdldEkgPSAtMVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWFyY2hMZW47ICsraSkgeyB2YXIgdGFyZ2V0SSA9IG1hdGNoZXNCZXN0W2ldXHJcbiAgICAgICAgICAvLyBzY29yZSBvbmx5IGdvZXMgZG93biBpZiB0aGV5J3JlIG5vdCBjb25zZWN1dGl2ZVxyXG4gICAgICAgICAgaWYobGFzdFRhcmdldEkgIT09IHRhcmdldEkgLSAxKSBzY29yZSAtPSB0YXJnZXRJXHJcbiAgICAgICAgICBsYXN0VGFyZ2V0SSA9IHRhcmdldElcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXN1Y2Nlc3NTdHJpY3QpIHtcclxuICAgICAgICAgIHNjb3JlICo9IDEwMDBcclxuICAgICAgICAgIGlmKHR5cG9TaW1wbGVJICE9PSAwKSBzY29yZSArPSAtMjAvKnR5cG9QZW5hbHR5Ki9cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYodHlwb1N0cmljdEkgIT09IDApIHNjb3JlICs9IC0yMC8qdHlwb1BlbmFsdHkqL1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZSAtPSB0YXJnZXRMZW4gLSBzZWFyY2hMZW5cclxuICAgICAgICBwcmVwYXJlZC5zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgcHJlcGFyZWQuaW5kZXhlcyA9IG5ldyBBcnJheShtYXRjaGVzQmVzdExlbik7IGZvcih2YXIgaSA9IG1hdGNoZXNCZXN0TGVuIC0gMTsgaSA+PSAwOyAtLWkpIHByZXBhcmVkLmluZGV4ZXNbaV0gPSBtYXRjaGVzQmVzdFtpXVxyXG5cclxuICAgICAgICByZXR1cm4gcHJlcGFyZWRcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhbGdvcml0aG1Ob1R5cG86IGZ1bmN0aW9uKHNlYXJjaExvd2VyQ29kZXMsIHByZXBhcmVkLCBzZWFyY2hMb3dlckNvZGUpIHtcclxuICAgICAgdmFyIHRhcmdldExvd2VyQ29kZXMgPSBwcmVwYXJlZC5fdGFyZ2V0TG93ZXJDb2Rlc1xyXG4gICAgICB2YXIgc2VhcmNoTGVuID0gc2VhcmNoTG93ZXJDb2Rlcy5sZW5ndGhcclxuICAgICAgdmFyIHRhcmdldExlbiA9IHRhcmdldExvd2VyQ29kZXMubGVuZ3RoXHJcbiAgICAgIHZhciBzZWFyY2hJID0gMCAvLyB3aGVyZSB3ZSBhdFxyXG4gICAgICB2YXIgdGFyZ2V0SSA9IDAgLy8gd2hlcmUgeW91IGF0XHJcbiAgICAgIHZhciBtYXRjaGVzU2ltcGxlTGVuID0gMFxyXG5cclxuICAgICAgLy8gdmVyeSBiYXNpYyBmdXp6eSBtYXRjaDsgdG8gcmVtb3ZlIG5vbi1tYXRjaGluZyB0YXJnZXRzIEFTQVAhXHJcbiAgICAgIC8vIHdhbGsgdGhyb3VnaCB0YXJnZXQuIGZpbmQgc2VxdWVudGlhbCBtYXRjaGVzLlxyXG4gICAgICAvLyBpZiBhbGwgY2hhcnMgYXJlbid0IGZvdW5kIHRoZW4gZXhpdFxyXG4gICAgICBmb3IoOzspIHtcclxuICAgICAgICB2YXIgaXNNYXRjaCA9IHNlYXJjaExvd2VyQ29kZSA9PT0gdGFyZ2V0TG93ZXJDb2Rlc1t0YXJnZXRJXVxyXG4gICAgICAgIGlmKGlzTWF0Y2gpIHtcclxuICAgICAgICAgIG1hdGNoZXNTaW1wbGVbbWF0Y2hlc1NpbXBsZUxlbisrXSA9IHRhcmdldElcclxuICAgICAgICAgICsrc2VhcmNoSTsgaWYoc2VhcmNoSSA9PT0gc2VhcmNoTGVuKSBicmVha1xyXG4gICAgICAgICAgc2VhcmNoTG93ZXJDb2RlID0gc2VhcmNoTG93ZXJDb2Rlc1tzZWFyY2hJXVxyXG4gICAgICAgIH1cclxuICAgICAgICArK3RhcmdldEk7IGlmKHRhcmdldEkgPj0gdGFyZ2V0TGVuKSByZXR1cm4gbnVsbCAvLyBGYWlsZWQgdG8gZmluZCBzZWFyY2hJXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBzZWFyY2hJID0gMFxyXG4gICAgICB2YXIgc3VjY2Vzc1N0cmljdCA9IGZhbHNlXHJcbiAgICAgIHZhciBtYXRjaGVzU3RyaWN0TGVuID0gMFxyXG5cclxuICAgICAgdmFyIG5leHRCZWdpbm5pbmdJbmRleGVzID0gcHJlcGFyZWQuX25leHRCZWdpbm5pbmdJbmRleGVzXHJcbiAgICAgIGlmKG5leHRCZWdpbm5pbmdJbmRleGVzID09PSBudWxsKSBuZXh0QmVnaW5uaW5nSW5kZXhlcyA9IHByZXBhcmVkLl9uZXh0QmVnaW5uaW5nSW5kZXhlcyA9IGZ1enp5c29ydC5wcmVwYXJlTmV4dEJlZ2lubmluZ0luZGV4ZXMocHJlcGFyZWQudGFyZ2V0KVxyXG4gICAgICB2YXIgZmlyc3RQb3NzaWJsZUkgPSB0YXJnZXRJID0gbWF0Y2hlc1NpbXBsZVswXT09PTAgPyAwIDogbmV4dEJlZ2lubmluZ0luZGV4ZXNbbWF0Y2hlc1NpbXBsZVswXS0xXVxyXG5cclxuICAgICAgLy8gT3VyIHRhcmdldCBzdHJpbmcgc3VjY2Vzc2Z1bGx5IG1hdGNoZWQgYWxsIGNoYXJhY3RlcnMgaW4gc2VxdWVuY2UhXHJcbiAgICAgIC8vIExldCdzIHRyeSBhIG1vcmUgYWR2YW5jZWQgYW5kIHN0cmljdCB0ZXN0IHRvIGltcHJvdmUgdGhlIHNjb3JlXHJcbiAgICAgIC8vIG9ubHkgY291bnQgaXQgYXMgYSBtYXRjaCBpZiBpdCdzIGNvbnNlY3V0aXZlIG9yIGEgYmVnaW5uaW5nIGNoYXJhY3RlciFcclxuICAgICAgaWYodGFyZ2V0SSAhPT0gdGFyZ2V0TGVuKSBmb3IoOzspIHtcclxuICAgICAgICBpZih0YXJnZXRJID49IHRhcmdldExlbikge1xyXG4gICAgICAgICAgLy8gV2UgZmFpbGVkIHRvIGZpbmQgYSBnb29kIHNwb3QgZm9yIHRoaXMgc2VhcmNoIGNoYXIsIGdvIGJhY2sgdG8gdGhlIHByZXZpb3VzIHNlYXJjaCBjaGFyIGFuZCBmb3JjZSBpdCBmb3J3YXJkXHJcbiAgICAgICAgICBpZihzZWFyY2hJIDw9IDApIGJyZWFrIC8vIFdlIGZhaWxlZCB0byBwdXNoIGNoYXJzIGZvcndhcmQgZm9yIGEgYmV0dGVyIG1hdGNoXHJcblxyXG4gICAgICAgICAgLS1zZWFyY2hJXHJcbiAgICAgICAgICB2YXIgbGFzdE1hdGNoID0gbWF0Y2hlc1N0cmljdFstLW1hdGNoZXNTdHJpY3RMZW5dXHJcbiAgICAgICAgICB0YXJnZXRJID0gbmV4dEJlZ2lubmluZ0luZGV4ZXNbbGFzdE1hdGNoXVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGlzTWF0Y2ggPSBzZWFyY2hMb3dlckNvZGVzW3NlYXJjaEldID09PSB0YXJnZXRMb3dlckNvZGVzW3RhcmdldEldXHJcbiAgICAgICAgICBpZihpc01hdGNoKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZXNTdHJpY3RbbWF0Y2hlc1N0cmljdExlbisrXSA9IHRhcmdldElcclxuICAgICAgICAgICAgKytzZWFyY2hJOyBpZihzZWFyY2hJID09PSBzZWFyY2hMZW4pIHsgc3VjY2Vzc1N0cmljdCA9IHRydWU7IGJyZWFrIH1cclxuICAgICAgICAgICAgKyt0YXJnZXRJXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YXJnZXRJID0gbmV4dEJlZ2lubmluZ0luZGV4ZXNbdGFyZ2V0SV1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHsgLy8gdGFsbHkgdXAgdGhlIHNjb3JlICYga2VlcCB0cmFjayBvZiBtYXRjaGVzIGZvciBoaWdobGlnaHRpbmcgbGF0ZXJcclxuICAgICAgICBpZihzdWNjZXNzU3RyaWN0KSB7IHZhciBtYXRjaGVzQmVzdCA9IG1hdGNoZXNTdHJpY3Q7IHZhciBtYXRjaGVzQmVzdExlbiA9IG1hdGNoZXNTdHJpY3RMZW4gfVxyXG4gICAgICAgIGVsc2UgeyB2YXIgbWF0Y2hlc0Jlc3QgPSBtYXRjaGVzU2ltcGxlOyB2YXIgbWF0Y2hlc0Jlc3RMZW4gPSBtYXRjaGVzU2ltcGxlTGVuIH1cclxuICAgICAgICB2YXIgc2NvcmUgPSAwXHJcbiAgICAgICAgdmFyIGxhc3RUYXJnZXRJID0gLTFcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VhcmNoTGVuOyArK2kpIHsgdmFyIHRhcmdldEkgPSBtYXRjaGVzQmVzdFtpXVxyXG4gICAgICAgICAgLy8gc2NvcmUgb25seSBnb2VzIGRvd24gaWYgdGhleSdyZSBub3QgY29uc2VjdXRpdmVcclxuICAgICAgICAgIGlmKGxhc3RUYXJnZXRJICE9PSB0YXJnZXRJIC0gMSkgc2NvcmUgLT0gdGFyZ2V0SVxyXG4gICAgICAgICAgbGFzdFRhcmdldEkgPSB0YXJnZXRJXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFzdWNjZXNzU3RyaWN0KSBzY29yZSAqPSAxMDAwXHJcbiAgICAgICAgc2NvcmUgLT0gdGFyZ2V0TGVuIC0gc2VhcmNoTGVuXHJcbiAgICAgICAgcHJlcGFyZWQuc2NvcmUgPSBzY29yZVxyXG4gICAgICAgIHByZXBhcmVkLmluZGV4ZXMgPSBuZXcgQXJyYXkobWF0Y2hlc0Jlc3RMZW4pOyBmb3IodmFyIGkgPSBtYXRjaGVzQmVzdExlbiAtIDE7IGkgPj0gMDsgLS1pKSBwcmVwYXJlZC5pbmRleGVzW2ldID0gbWF0Y2hlc0Jlc3RbaV1cclxuXHJcbiAgICAgICAgcmV0dXJuIHByZXBhcmVkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcHJlcGFyZUxvd2VyQ29kZXM6IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgICB2YXIgc3RyTGVuID0gc3RyLmxlbmd0aFxyXG4gICAgICB2YXIgbG93ZXJDb2RlcyA9IFtdIC8vIG5ldyBBcnJheShzdHJMZW4pICAgIHNwYXJzZSBhcnJheSBpcyB0b28gc2xvd1xyXG4gICAgICB2YXIgbG93ZXIgPSBzdHIudG9Mb3dlckNhc2UoKVxyXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3RyTGVuOyArK2kpIGxvd2VyQ29kZXNbaV0gPSBsb3dlci5jaGFyQ29kZUF0KGkpXHJcbiAgICAgIHJldHVybiBsb3dlckNvZGVzXHJcbiAgICB9LFxyXG4gICAgcHJlcGFyZUJlZ2lubmluZ0luZGV4ZXM6IGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICB2YXIgdGFyZ2V0TGVuID0gdGFyZ2V0Lmxlbmd0aFxyXG4gICAgICB2YXIgYmVnaW5uaW5nSW5kZXhlcyA9IFtdOyB2YXIgYmVnaW5uaW5nSW5kZXhlc0xlbiA9IDBcclxuICAgICAgdmFyIHdhc1VwcGVyID0gZmFsc2VcclxuICAgICAgdmFyIHdhc0FscGhhbnVtID0gZmFsc2VcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRhcmdldExlbjsgKytpKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldENvZGUgPSB0YXJnZXQuY2hhckNvZGVBdChpKVxyXG4gICAgICAgIHZhciBpc1VwcGVyID0gdGFyZ2V0Q29kZT49NjUmJnRhcmdldENvZGU8PTkwXHJcbiAgICAgICAgdmFyIGlzQWxwaGFudW0gPSBpc1VwcGVyIHx8IHRhcmdldENvZGU+PTk3JiZ0YXJnZXRDb2RlPD0xMjIgfHwgdGFyZ2V0Q29kZT49NDgmJnRhcmdldENvZGU8PTU3XHJcbiAgICAgICAgdmFyIGlzQmVnaW5uaW5nID0gaXNVcHBlciAmJiAhd2FzVXBwZXIgfHwgIXdhc0FscGhhbnVtIHx8ICFpc0FscGhhbnVtXHJcbiAgICAgICAgd2FzVXBwZXIgPSBpc1VwcGVyXHJcbiAgICAgICAgd2FzQWxwaGFudW0gPSBpc0FscGhhbnVtXHJcbiAgICAgICAgaWYoaXNCZWdpbm5pbmcpIGJlZ2lubmluZ0luZGV4ZXNbYmVnaW5uaW5nSW5kZXhlc0xlbisrXSA9IGlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYmVnaW5uaW5nSW5kZXhlc1xyXG4gICAgfSxcclxuICAgIHByZXBhcmVOZXh0QmVnaW5uaW5nSW5kZXhlczogZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgIHZhciB0YXJnZXRMZW4gPSB0YXJnZXQubGVuZ3RoXHJcbiAgICAgIHZhciBiZWdpbm5pbmdJbmRleGVzID0gZnV6enlzb3J0LnByZXBhcmVCZWdpbm5pbmdJbmRleGVzKHRhcmdldClcclxuICAgICAgdmFyIG5leHRCZWdpbm5pbmdJbmRleGVzID0gW10gLy8gbmV3IEFycmF5KHRhcmdldExlbikgICAgIHNwYXJzZSBhcnJheSBpcyB0b28gc2xvd1xyXG4gICAgICB2YXIgbGFzdElzQmVnaW5uaW5nID0gYmVnaW5uaW5nSW5kZXhlc1swXVxyXG4gICAgICB2YXIgbGFzdElzQmVnaW5uaW5nSSA9IDBcclxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRhcmdldExlbjsgKytpKSB7XHJcbiAgICAgICAgaWYobGFzdElzQmVnaW5uaW5nID4gaSkge1xyXG4gICAgICAgICAgbmV4dEJlZ2lubmluZ0luZGV4ZXNbaV0gPSBsYXN0SXNCZWdpbm5pbmdcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGFzdElzQmVnaW5uaW5nID0gYmVnaW5uaW5nSW5kZXhlc1srK2xhc3RJc0JlZ2lubmluZ0ldXHJcbiAgICAgICAgICBuZXh0QmVnaW5uaW5nSW5kZXhlc1tpXSA9IGxhc3RJc0JlZ2lubmluZz09PXVuZGVmaW5lZCA/IHRhcmdldExlbiA6IGxhc3RJc0JlZ2lubmluZ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dEJlZ2lubmluZ0luZGV4ZXNcclxuICAgIH0sXHJcblxyXG4gICAgY2xlYW51cDogY2xlYW51cCxcclxuICAgIG5ldzogZnV6enlzb3J0TmV3LFxyXG4gIH1cclxuICByZXR1cm4gZnV6enlzb3J0XHJcbn0gLy8gZnV6enlzb3J0TmV3XHJcblxyXG4vLyBUaGlzIHN0dWZmIGlzIG91dHNpZGUgZnV6enlzb3J0TmV3LCBiZWNhdXNlIGl0J3Mgc2hhcmVkIHdpdGggaW5zdGFuY2VzIG9mIGZ1enp5c29ydC5uZXcoKVxyXG52YXIgaXNOb2RlID0gdHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnXHJcbi8vIHZhciBNQVhfSU5UID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcclxuLy8gdmFyIE1JTl9JTlQgPSBOdW1iZXIuTUlOX1ZBTFVFXHJcbnZhciBwcmVwYXJlZENhY2hlID0gbmV3IE1hcCgpXHJcbnZhciBwcmVwYXJlZFNlYXJjaENhY2hlID0gbmV3IE1hcCgpXHJcbnZhciBub1Jlc3VsdHMgPSBbXTsgbm9SZXN1bHRzLnRvdGFsID0gMFxyXG52YXIgbWF0Y2hlc1NpbXBsZSA9IFtdOyB2YXIgbWF0Y2hlc1N0cmljdCA9IFtdXHJcbmZ1bmN0aW9uIGNsZWFudXAoKSB7IHByZXBhcmVkQ2FjaGUuY2xlYXIoKTsgcHJlcGFyZWRTZWFyY2hDYWNoZS5jbGVhcigpOyBtYXRjaGVzU2ltcGxlID0gW107IG1hdGNoZXNTdHJpY3QgPSBbXSB9XHJcbmZ1bmN0aW9uIGRlZmF1bHRTY29yZUZuKGEpIHtcclxuICB2YXIgbWF4ID0gLTkwMDcxOTkyNTQ3NDA5OTFcclxuICBmb3IgKHZhciBpID0gYS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgdmFyIHJlc3VsdCA9IGFbaV07IGlmKHJlc3VsdCA9PT0gbnVsbCkgY29udGludWVcclxuICAgIHZhciBzY29yZSA9IHJlc3VsdC5zY29yZVxyXG4gICAgaWYoc2NvcmUgPiBtYXgpIG1heCA9IHNjb3JlXHJcbiAgfVxyXG4gIGlmKG1heCA9PT0gLTkwMDcxOTkyNTQ3NDA5OTEpIHJldHVybiBudWxsXHJcbiAgcmV0dXJuIG1heFxyXG59XHJcblxyXG4vLyBwcm9wID0gJ2tleScgICAgICAgICAgICAgIDIuNW1zIG9wdGltaXplZCBmb3IgdGhpcyBjYXNlLCBzZWVtcyB0byBiZSBhYm91dCBhcyBmYXN0IGFzIGRpcmVjdCBvYmpbcHJvcF1cclxuLy8gcHJvcCA9ICdrZXkxLmtleTInICAgICAgICAxMG1zXHJcbi8vIHByb3AgPSBbJ2tleTEnLCAna2V5MiddICAgMjdtc1xyXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmosIHByb3ApIHtcclxuICB2YXIgdG1wID0gb2JqW3Byb3BdOyBpZih0bXAgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHRtcFxyXG4gIHZhciBzZWdzID0gcHJvcFxyXG4gIGlmKCFBcnJheS5pc0FycmF5KHByb3ApKSBzZWdzID0gcHJvcC5zcGxpdCgnLicpXHJcbiAgdmFyIGxlbiA9IHNlZ3MubGVuZ3RoXHJcbiAgdmFyIGkgPSAtMVxyXG4gIHdoaWxlIChvYmogJiYgKCsraSA8IGxlbikpIG9iaiA9IG9ialtzZWdzW2ldXVxyXG4gIHJldHVybiBvYmpcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPYmooeCkgeyByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnIH0gLy8gZmFzdGVyIGFzIGEgZnVuY3Rpb25cclxuXHJcbi8vIEhhY2tlZCB2ZXJzaW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9sZW1pcmUvRmFzdFByaW9yaXR5UXVldWUuanNcclxudmFyIGZhc3Rwcmlvcml0eXF1ZXVlPWZ1bmN0aW9uKCl7dmFyIHI9W10sbz0wLGU9e307ZnVuY3Rpb24gbigpe2Zvcih2YXIgZT0wLG49cltlXSxjPTE7YzxvOyl7dmFyIGY9YysxO2U9YyxmPG8mJnJbZl0uc2NvcmU8cltjXS5zY29yZSYmKGU9ZikscltlLTE+PjFdPXJbZV0sYz0xKyhlPDwxKX1mb3IodmFyIGE9ZS0xPj4xO2U+MCYmbi5zY29yZTxyW2FdLnNjb3JlO2E9KGU9YSktMT4+MSlyW2VdPXJbYV07cltlXT1ufXJldHVybiBlLmFkZD1mdW5jdGlvbihlKXt2YXIgbj1vO3JbbysrXT1lO2Zvcih2YXIgYz1uLTE+PjE7bj4wJiZlLnNjb3JlPHJbY10uc2NvcmU7Yz0obj1jKS0xPj4xKXJbbl09cltjXTtyW25dPWV9LGUucG9sbD1mdW5jdGlvbigpe2lmKDAhPT1vKXt2YXIgZT1yWzBdO3JldHVybiByWzBdPXJbLS1vXSxuKCksZX19LGUucGVlaz1mdW5jdGlvbihlKXtpZigwIT09bylyZXR1cm4gclswXX0sZS5yZXBsYWNlVG9wPWZ1bmN0aW9uKG8pe3JbMF09byxuKCl9LGV9O1xyXG52YXIgcSA9IGZhc3Rwcmlvcml0eXF1ZXVlKCkgLy8gcmV1c2UgdGhpcywgZXhjZXB0IGZvciBhc3luYywgaXQgbmVlZHMgdG8gbWFrZSBpdHMgb3duXHJcblxyXG5yZXR1cm4gZnV6enlzb3J0TmV3KClcclxufSkgLy8gVU1EXHJcblxyXG4vLyBUT0RPOiAocGVyZm9ybWFuY2UpIHdhc20gdmVyc2lvbiE/XHJcblxyXG4vLyBUT0RPOiAocGVyZm9ybWFuY2UpIGxheW91dCBtZW1vcnkgaW4gYW4gb3B0aW1hbCB3YXkgdG8gZ28gZmFzdCBieSBhdm9pZGluZyBjYWNoZSBtaXNzZXNcclxuXHJcbi8vIFRPRE86IChwZXJmb3JtYW5jZSkgcHJlcGFyZWRDYWNoZSBpcyBhIG1lbW9yeSBsZWFrXHJcblxyXG4vLyBUT0RPOiAobGlrZSBzdWJsaW1lKSBiYWNrc2xhc2ggPT09IGZvcndhcmRzbGFzaFxyXG5cclxuLy8gVE9ETzogKHBlcmZvcm1hbmNlKSBpIGhhdmUgbm8gaWRlYSBob3cgd2VsbCBvcHRpem1pZWQgdGhlIGFsbG93aW5nIHR5cG9zIGFsZ29yaXRobSBpc1xyXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwidmFyIG5leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy9icm93c2VyLmpzJykubmV4dFRpY2s7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaW1tZWRpYXRlSWRzID0ge307XG52YXIgbmV4dEltbWVkaWF0ZUlkID0gMDtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHsgdGltZW91dC5jbG9zZSgpOyB9O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIFRoYXQncyBub3QgaG93IG5vZGUuanMgaW1wbGVtZW50cyBpdCBidXQgdGhlIGV4cG9zZWQgYXBpIGlzIHRoZSBzYW1lLlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBmdW5jdGlvbihmbikge1xuICB2YXIgaWQgPSBuZXh0SW1tZWRpYXRlSWQrKztcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGZhbHNlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIGltbWVkaWF0ZUlkc1tpZF0gPSB0cnVlO1xuXG4gIG5leHRUaWNrKGZ1bmN0aW9uIG9uTmV4dFRpY2soKSB7XG4gICAgaWYgKGltbWVkaWF0ZUlkc1tpZF0pIHtcbiAgICAgIC8vIGZuLmNhbGwoKSBpcyBmYXN0ZXIgc28gd2Ugb3B0aW1pemUgZm9yIHRoZSBjb21tb24gdXNlLWNhc2VcbiAgICAgIC8vIEBzZWUgaHR0cDovL2pzcGVyZi5jb20vY2FsbC1hcHBseS1zZWd1XG4gICAgICBpZiAoYXJncykge1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCk7XG4gICAgICB9XG4gICAgICAvLyBQcmV2ZW50IGlkcyBmcm9tIGxlYWtpbmdcbiAgICAgIGV4cG9ydHMuY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IHR5cGVvZiBjbGVhckltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gY2xlYXJJbW1lZGlhdGUgOiBmdW5jdGlvbihpZCkge1xuICBkZWxldGUgaW1tZWRpYXRlSWRzW2lkXTtcbn07IiwiLyogZ2xvYmFsIGZldGNoICovXHJcblxyXG4vKipcclxuICogVGhhbmtzID0+IGh0dHBzOi8vZ2l0aHViLmNvbS9IYXVudGVkVGhlbWVzL2dob3N0LXNlYXJjaFxyXG4gKi9cclxuXHJcbmltcG9ydCBmdXp6eXNvcnQgZnJvbSAnZnV6enlzb3J0J1xyXG4vLyBjb25zdCBmdXp6eXNvcnQgPSByZXF1aXJlKCdmdXp6eXNvcnQnKVxyXG5cclxuY2xhc3MgR2hvc3RTZWFyY2gge1xyXG4gIGNvbnN0cnVjdG9yIChhcmdzKSB7XHJcbiAgICB0aGlzLmNoZWNrID0gZmFsc2VcclxuXHJcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxyXG4gICAgICBrZXk6ICcnLFxyXG4gICAgICB2ZXJzaW9uOiAndjQnLFxyXG4gICAgICBpbnB1dDogJyNzZWFyY2gtZmllbGQnLFxyXG4gICAgICByZXN1bHRzOiAnI3NlYXJjaC1yZXN1bHRzJyxcclxuICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcclxuICAgICAgdGVtcGxhdGU6IHJlc3VsdCA9PiBgPGEgaHJlZj1cIi8ke3Jlc3VsdC5zbHVnfS9cIiBjbGFzcz1cImJsb2NrIHB5LTIgcHItMyBwbC0xMFwiPjxzdmcgY2xhc3M9XCJpY29uIGljb24tLXNlYXJjaFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTI4cHhcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1zZWFyY2hcIj48L3VzZT48L3N2Zz4gJHtyZXN1bHQudGl0bGV9PC9hPmAsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBrZXlzOiBbXHJcbiAgICAgICAgICAndGl0bGUnXHJcbiAgICAgICAgXSxcclxuICAgICAgICBsaW1pdDogMTAsXHJcbiAgICAgICAgdGhyZXNob2xkOiAtMzUwMCxcclxuICAgICAgICBhbGxvd1R5cG86IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGFwaToge1xyXG4gICAgICAgIHJlc291cmNlOiAncG9zdHMnLFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgIGxpbWl0OiAnYWxsJyxcclxuICAgICAgICAgIGZpZWxkczogWyd0aXRsZScsICdzbHVnJ10sXHJcbiAgICAgICAgICBmaWx0ZXI6ICcnLFxyXG4gICAgICAgICAgaW5jbHVkZTogJycsXHJcbiAgICAgICAgICBvcmRlcjogJycsXHJcbiAgICAgICAgICBmb3JtYXRzOiAnJyxcclxuICAgICAgICAgIHBhZ2U6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvbjoge1xyXG4gICAgICAgIGJlZm9yZURpc3BsYXk6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgICBhZnRlckRpc3BsYXk6IGZ1bmN0aW9uIChyZXN1bHRzKSB7IH0sXHJcbiAgICAgICAgYmVmb3JlRmV0Y2g6ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaXMtbG9hZGluZycpLFxyXG4gICAgICAgIGFmdGVyRmV0Y2g6ICgpID0+IHNldFRpbWVvdXQoKCkgPT4geyBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWxvYWRpbmcnKSB9LCA0MDAwKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVyZ2VkID0gdGhpcy5tZXJnZURlZXAoZGVmYXVsdHMsIGFyZ3MpXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG1lcmdlZClcclxuICAgIHRoaXMuaW5pdCgpXHJcbiAgfVxyXG5cclxuICBtZXJnZURlZXAgKHRhcmdldCwgc291cmNlKSB7XHJcbiAgICBpZiAoKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIHRhcmdldCAhPT0gbnVsbCkgJiYgKHNvdXJjZSAmJiB0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShzb3VyY2UpICYmIHNvdXJjZSAhPT0gbnVsbCkpIHtcclxuICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgaWYgKHNvdXJjZVtrZXldICYmIHR5cGVvZiBzb3VyY2Vba2V5XSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlW2tleV0pICYmIHNvdXJjZVtrZXldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAoIXRhcmdldFtrZXldKSBPYmplY3QuYXNzaWduKHRhcmdldCwgeyBba2V5XToge30gfSlcclxuICAgICAgICAgIHRoaXMubWVyZ2VEZWVwKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHsgW2tleV06IHNvdXJjZVtrZXldIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldFxyXG4gIH1cclxuXHJcbiAgZmV0Y2ggKCkge1xyXG4gICAgdGhpcy5vbi5iZWZvcmVGZXRjaCgpXHJcblxyXG4gICAgLy8gY29uc3QgZ2hvc3RBUEkgPSBuZXcgR2hvc3RDb250ZW50QVBJKHtcclxuICAgIC8vICAgdXJsOiB0aGlzLnVybCxcclxuICAgIC8vICAga2V5OiB0aGlzLmtleSxcclxuICAgIC8vICAgdmVyc2lvbjogdGhpcy52ZXJzaW9uXHJcbiAgICAvLyB9KVxyXG5cclxuICAgIGNvbnN0IGJyb3dzZSA9IHt9XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gdGhpcy5hcGkucGFyYW1ldGVyc1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtZXRlcnMpIHtcclxuICAgICAgaWYgKHBhcmFtZXRlcnNba2V5XSAhPT0gJycpIHtcclxuICAgICAgICBicm93c2Vba2V5XSA9IHBhcmFtZXRlcnNba2V5XVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW5jb2RlZCA9IE9iamVjdC5lbnRyaWVzKGJyb3dzZSkubWFwKChbaywgdl0pID0+IGAke2t9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHYpfWApLmpvaW4oJyYnKVxyXG4gICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy51cmx9L2dob3N0L2FwaS8ke3RoaXMudmVyc2lvbn0vY29udGVudC8ke3RoaXMuYXBpLnJlc291cmNlfS8/a2V5PSR7dGhpcy5rZXl9JiR7ZW5jb2RlZH1gXHJcblxyXG4gICAgY29uc3QgZ2V0QXBpID0gYXN5bmMgdXJsID0+IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcGkoYXBpVXJsKVxyXG4gICAgICAudGhlbihkYXRhID0+IHRoaXMuc2VhcmNoKGRhdGFbdGhpcy5hcGkucmVzb3VyY2VdKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpXHJcblxyXG4gICAgLy8gZ2hvc3RBUElbdGhpcy5hcGkucmVzb3VyY2VdXHJcbiAgICAvLyAgIC5icm93c2UoYnJvd3NlKVxyXG4gICAgLy8gICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAvLyAgICAgdGhpcy5zZWFyY2goZGF0YSlcclxuICAgIC8vICAgfSlcclxuICAgIC8vICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgIC8vICAgICBjb25zb2xlLmVycm9yKGVycilcclxuICAgIC8vICAgfSlcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVsZW1lbnRGcm9tSFRNTCAoaHRtbFN0cmluZykge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sU3RyaW5nLnRyaW0oKVxyXG4gICAgcmV0dXJuIGRpdi5maXJzdENoaWxkXHJcbiAgfVxyXG5cclxuICBkaXNwbGF5UmVzdWx0cyAoZGF0YSkge1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKVswXS5maXJzdENoaWxkICE9PSBudWxsICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXN1bHRzKVswXS5maXJzdENoaWxkICE9PSAnJykge1xyXG4gICAgICB3aGlsZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJlc3VsdHMpWzBdLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVzdWx0cylbMF0ucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJlc3VsdHMpWzBdLmZpcnN0Q2hpbGQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgaW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dClbMF0udmFsdWVcclxuICAgIGlmICh0aGlzLmRlZmF1bHRWYWx1ZSAhPT0gJycpIHtcclxuICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHRzID0gZnV6enlzb3J0LmdvKGlucHV0VmFsdWUsIGRhdGEsIHtcclxuICAgICAga2V5czogdGhpcy5vcHRpb25zLmtleXMsXHJcbiAgICAgIGxpbWl0OiB0aGlzLm9wdGlvbnMubGltaXQsXHJcbiAgICAgIGFsbG93VHlwbzogdGhpcy5vcHRpb25zLmFsbG93VHlwbyxcclxuICAgICAgdGhyZXNob2xkOiB0aGlzLm9wdGlvbnMudGhyZXNob2xkXHJcbiAgICB9KVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xyXG4gICAgICBpZiAoa2V5IDwgcmVzdWx0cy5sZW5ndGgpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVzdWx0cylbMF0uYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVFbGVtZW50RnJvbUhUTUwodGhpcy50ZW1wbGF0ZShyZXN1bHRzW2tleV0ub2JqKSkpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uLmFmdGVyRGlzcGxheShyZXN1bHRzKVxyXG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSAnJ1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoIChkYXRhKSB7XHJcbiAgICB0aGlzLm9uLmFmdGVyRmV0Y2goZGF0YSlcclxuICAgIHRoaXMuY2hlY2sgPSB0cnVlXHJcblxyXG4gICAgaWYgKHRoaXMuZGVmYXVsdFZhbHVlICE9PSAnJykge1xyXG4gICAgICB0aGlzLm9uLmJlZm9yZURpc3BsYXkoKVxyXG4gICAgICB0aGlzLmRpc3BsYXlSZXN1bHRzKGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmlucHV0KVswXS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgdGhpcy5vbi5iZWZvcmVEaXNwbGF5KClcclxuICAgICAgdGhpcy5kaXNwbGF5UmVzdWx0cyhkYXRhKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNoZWNrQXJncyAoKSB7XHJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dCkubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdJbnB1dCBub3QgZm91bmQuJylcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVzdWx0cykubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdSZXN1bHRzIG5vdCBmb3VuZC4nKVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy51cmwgPT09ICcnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdDb250ZW50IEFQSSBDbGllbnQgTGlicmFyeSBob3N0IG1pc3NpbmcuIFBsZWFzZSBzZXQgdGhlIGhvc3QuIE11c3Qgbm90IGVuZCBpbiBhIHRyYWlsaW5nIHNsYXNoLicpXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmtleSA9PT0gJycpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0NvbnRlbnQgQVBJIENsaWVudCBMaWJyYXJ5IGtleSBtaXNzaW5nLiBQbGVhc2Ugc2V0IHRoZSBrZXkuIEhleCBzdHJpbmcgY29waWVkIGZyb20gdGhlIFwiSW50ZWdyYXRpb25zXCIgc2NyZWVuIGluIEdob3N0IEFkbWluLicpXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZSAoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2hlY2tBcmdzKCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGluaXQgKCkge1xyXG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlKCkpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGVmYXVsdFZhbHVlICE9PSAnJykge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuaW5wdXQpWzBdLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuICAgICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2spIHtcclxuICAgICAgICAgIHRoaXMuZmV0Y2goKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dClbMF0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5jaGVjaykge1xyXG4gICAgICAgIHRoaXMuZmV0Y2goKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuLyogRXhwb3J0IENsYXNzICovXHJcbm1vZHVsZS5leHBvcnRzID0gR2hvc3RTZWFyY2hcclxuIiwiLyogZ2xvYmFsIHNlYXJjaFNldHRpbmdzICovXHJcblxyXG5pbXBvcnQgR2hvc3RTZWFyY2ggZnJvbSAnLi9saWIvZ2hvc3Qtc2VhcmNoJ1xyXG5cclxuKGZ1bmN0aW9uIChkb2N1bWVudCkge1xyXG4gIGNvbnN0ICRib2R5ID0gZG9jdW1lbnQuYm9keVxyXG4gIGNvbnN0ICRpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtZmllbGQnKVxyXG4gIGNvbnN0ICRyZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHRzJylcclxuICBjb25zdCAkc2VhcmNoTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zZWFyY2gtbWVzc2FnZScpXHJcblxyXG4gIGNvbnN0IGNsYXNzSXNBY3RpdmUgPSAnaXMtYWN0aXZlJ1xyXG5cclxuICBsZXQgYWxsU2VhcmNoTGlua3NMZW5ndGggPSAwXHJcblxyXG4gIGxldCBzZWFyY2hSZXN1bHRzSGVpZ2h0ID0ge1xyXG4gICAgb3V0ZXI6IDAsXHJcbiAgICBzY3JvbGw6IDBcclxuICB9XHJcblxyXG4gIC8vIFNIb3cgaWNvbiBzZWFyY2ggaW4gaGVhZGVyXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtkYXRhLXRhcmdldD1tb2RhbC1zZWFyY2hdJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuXHJcbiAgLy8gVmFyaWFibGUgZm9yIHNlYXJjaFxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIGNvbnN0IGFmdGVyRGlzcGxheVNlYXJjaCA9IHJlc3VsdHMgPT4ge1xyXG4gICAgLy8gQWN0aXZlIGNsYXNzIHRvIGxpbmsgc2VhcmNoXHJcbiAgICBzZWFyY2hSZXN1bHRBY3RpdmUoKVxyXG5cclxuICAgIGFsbFNlYXJjaExpbmtzTGVuZ3RoID0gcmVzdWx0cy5sZW5ndGhcclxuXHJcbiAgICBzZWFyY2hSZXN1bHRzSGVpZ2h0ID0ge1xyXG4gICAgICBvdXRlcjogJHJlc3VsdHMub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICBzY3JvbGw6ICRyZXN1bHRzLnNjcm9sbEhlaWdodFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHRzLnRvdGFsID09PSAwICYmICRpbnB1dC52YWx1ZSAhPT0gJycpIHtcclxuICAgICAgJHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgJGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG15U2VhcmNoS2V5KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJHNlYXJjaE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcclxuICAgICAgJGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG15U2VhcmNoS2V5KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbXlTZWFyY2hTZXR0aW5ncyA9IHsgb246IHsgYWZ0ZXJEaXNwbGF5OiByZXN1bHRzID0+IGFmdGVyRGlzcGxheVNlYXJjaChyZXN1bHRzKSB9IH1cclxuXHJcbiAgLy8gam9pbiB1c2VyIHNldHRpbmdzXHJcbiAgT2JqZWN0LmFzc2lnbihteVNlYXJjaFNldHRpbmdzLCBzZWFyY2hTZXR0aW5ncylcclxuXHJcbiAgLy8gd2hlbiB0aGUgRW50ZXIga2V5IGlzIHByZXNzZWRcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGZ1bmN0aW9uIGVudGVyS2V5ICgpIHtcclxuICAgIGNvbnN0IGxpbmsgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yKGBhLiR7Y2xhc3NJc0FjdGl2ZX1gKVxyXG4gICAgbGluayAmJiBsaW5rLmNsaWNrKClcclxuICB9XHJcblxyXG4gIC8vIEF0dGVuZGluZyB0aGUgYWN0aXZlIGNsYXNzIHRvIHRoZSBzZWFyY2ggbGlua1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgZnVuY3Rpb24gc2VhcmNoUmVzdWx0QWN0aXZlIChpbmRleCwgdXBEb3duKSB7XHJcbiAgICBpbmRleCA9IGluZGV4IHx8IDBcclxuICAgIHVwRG93biA9IHVwRG93biB8fCAndXAnXHJcblxyXG4gICAgY29uc3QgYWxsU2VhcmNoTGlua3MgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdhJylcclxuXHJcbiAgICAvLyBSZXR1cm4gaWYgdGhlcmUgYXJlIG5vIHJlc3VsdHNcclxuICAgIGlmICghYWxsU2VhcmNoTGlua3MubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICAvLyBSZW1vdmUgQWxsIGNsYXNzIEFjdGl2ZVxyXG4gICAgYWxsU2VhcmNoTGlua3MuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc0lzQWN0aXZlKSlcclxuXHJcbiAgICAvLyBBZGQgY2xhc3MgYWN0aXZlXHJcbiAgICBhbGxTZWFyY2hMaW5rc1tpbmRleF0uY2xhc3NMaXN0LmFkZChjbGFzc0lzQWN0aXZlKVxyXG5cclxuICAgIC8vIFNjcm9sbCBmb3IgcmVzdWx0cyBib3hcclxuICAgIGNvbnN0IGxpbmtPZmZTZXRUb3AgPSBhbGxTZWFyY2hMaW5rc1tpbmRleF0ub2Zmc2V0VG9wXHJcbiAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSAwXHJcblxyXG4gICAgdXBEb3duID09PSAnZG93bicgJiYgbGlua09mZlNldFRvcCA+IHNlYXJjaFJlc3VsdHNIZWlnaHQub3V0ZXIgLyAyID8gc2Nyb2xsUG9zaXRpb24gPSBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiB1cERvd24gPT09ICd1cCcgJiYgKHNjcm9sbFBvc2l0aW9uID0gbGlua09mZlNldFRvcCA8IHNlYXJjaFJlc3VsdHNIZWlnaHQuc2Nyb2xsIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgPyBsaW5rT2ZmU2V0VG9wIC0gc2VhcmNoUmVzdWx0c0hlaWdodC5vdXRlciAvIDIgOiBzZWFyY2hSZXN1bHRzSGVpZ2h0LnNjcm9sbClcclxuXHJcbiAgICAkcmVzdWx0cy5zY3JvbGxUbygwLCBzY3JvbGxQb3NpdGlvbilcclxuICB9XHJcblxyXG4gIC8vIFJlYWN0ZWQgdG8gdGhlIHVwIG9yIGRvd24ga2V5c1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgZnVuY3Rpb24gYXJyb3dLZXlVcERvd24gKGtleU51bWJlcikge1xyXG4gICAgbGV0IHVwRG93blxyXG4gICAgbGV0IGluZGV4VGhlTGluayA9IDBcclxuXHJcbiAgICBjb25zdCByZXN1bHRBY3RpdmUgPSAkcmVzdWx0cy5xdWVyeVNlbGVjdG9yKCcuaXMtYWN0aXZlJylcclxuXHJcbiAgICBpZiAocmVzdWx0QWN0aXZlKSB7XHJcbiAgICAgIGluZGV4VGhlTGluayA9IFtdLnNsaWNlLmNhbGwocmVzdWx0QWN0aXZlLnBhcmVudE5vZGUuY2hpbGRyZW4pLmluZGV4T2YocmVzdWx0QWN0aXZlKVxyXG4gICAgfVxyXG5cclxuICAgICRpbnB1dC5ibHVyKClcclxuXHJcbiAgICAvLyAzOCA9PT0gVVBcclxuICAgIGlmIChrZXlOdW1iZXIgPT09IDM4KSB7XHJcbiAgICAgIHVwRG93biA9ICd1cCdcclxuXHJcbiAgICAgIGlmIChpbmRleFRoZUxpbmsgPD0gMCkge1xyXG4gICAgICAgICRpbnB1dC5mb2N1cygpXHJcbiAgICAgICAgaW5kZXhUaGVMaW5rID0gMFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGluZGV4VGhlTGluayAtPSAxXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVwRG93biA9ICdkb3duJ1xyXG5cclxuICAgICAgaWYgKGluZGV4VGhlTGluayA+PSBhbGxTZWFyY2hMaW5rc0xlbmd0aCAtIDEpIHtcclxuICAgICAgICBpbmRleFRoZUxpbmsgPSAwXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXhUaGVMaW5rICs9IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaFJlc3VsdEFjdGl2ZShpbmRleFRoZUxpbmssIHVwRG93bilcclxuICB9XHJcblxyXG4gIC8vIEFkZGluZyBmdW5jdGlvbnMgdG8gdGhlIGtleXNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGZ1bmN0aW9uIG15U2VhcmNoS2V5IChlKSB7XHJcbiAgICBjb25zdCBrZXlOdW1iZXIgPSBlLmtleUNvZGVcclxuXHJcbiAgICAvKipcclxuICAgICAgKiAzOCA9PiBVcFxyXG4gICAgICAqIDQwID0+IGRvd25cclxuICAgICAgKiAxMyA9PiBlbnRlclxyXG4gICAgICAqKi9cclxuXHJcbiAgICBpZiAoa2V5TnVtYmVyID09PSAxMykge1xyXG4gICAgICAkaW5wdXQuYmx1cigpXHJcbiAgICAgIGVudGVyS2V5KClcclxuICAgIH0gZWxzZSBpZiAoa2V5TnVtYmVyID09PSAzOCB8fCBrZXlOdW1iZXIgPT09IDQwKSB7XHJcbiAgICAgIGFycm93S2V5VXBEb3duKGtleU51bWJlcilcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBTZWFyY2hcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xyXG4gIG5ldyBHaG9zdFNlYXJjaChteVNlYXJjaFNldHRpbmdzKVxyXG59KShkb2N1bWVudClcclxuIl19

//# sourceMappingURL=map/search.js.map
