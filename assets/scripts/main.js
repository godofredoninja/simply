/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "45b90e05f3f4d4c8e93e"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3000/assets/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(22)(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/*!***********************************************************!*\
  !*** ../node_modules/html-entities/lib/html5-entities.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;


/***/ }),
/* 2 */
/*!*************************************!*\
  !*** ./build/helpers/hmr-client.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var hotMiddlewareScript = __webpack_require__(/*! webpack-hot-middleware/client?noInfo=true&timeout=20000&reload=true */ 3);

hotMiddlewareScript.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});


/***/ }),
/* 3 */
/*!**********************************************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/client.js?noInfo=true&timeout=20000&reload=true ***!
  \**********************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
/*global __resourceQuery __webpack_public_path__*/

var options = {
  path: "/__webpack_hmr",
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: '',
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {}
};
if (true) {
  var querystring = __webpack_require__(/*! querystring */ 5);
  var overrides = querystring.parse(__resourceQuery.slice(1));
  setOverrides(overrides);
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
    "You should include a polyfill if you want to support this browser: " +
    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
  );
} else {
  if (options.autoConnect) {
    connect();
  }
}

/* istanbul ignore next */
function setOptionsAndConnect(overrides) {
  setOverrides(overrides);
  connect();
}

function setOverrides(overrides) {
  if (overrides.autoConnect) options.autoConnect = overrides.autoConnect == 'true';
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name;
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }

  if (overrides.dynamicPublicPath) {
    options.path = __webpack_require__.p + options.path;
  }

  if (overrides.ansiColors) options.ansiColors = JSON.parse(overrides.ansiColors);
  if (overrides.overlayStyles) options.overlayStyles = JSON.parse(overrides.overlayStyles);

  if (overrides.overlayWarnings) {
    options.overlayWarnings = overrides.overlayWarnings == 'true';
  }
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  init();
  var timer = setInterval(function() {
    if ((new Date() - lastActivity) > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log("[HMR] connected");
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function(fn) {
      listeners.push(fn);
    }
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }
  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == "\uD83D\uDC93") {
      return;
    }
    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }
  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__(/*! strip-ansi */ 8);

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ 10)({
      ansiColors: options.ansiColors,
      overlayStyles: options.overlayStyles
    });
  }

  var styles = {
    errors: "color: #ff0000;",
    warnings: "color: #999933;"
  };
  var previousProblems = null;
  function log(type, obj) {
    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');
    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : "";
    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group("%c" + title, style);
      console.log("%c" + newProblems, style);
      console.groupEnd();
    } else {
      console.log(
        "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
        style + "font-weight: bold;",
        style + "font-weight: normal;"
      );
    }
  }

  return {
    cleanProblemsCache: function () {
      previousProblems = null;
    },
    problems: function(type, obj) {
      if (options.warn) {
        log(type, obj);
      }
      if (overlay) {
        if (options.overlayWarnings || type === 'errors') {
          overlay.showProblems(type, obj[type]);
          return false;
        }
        overlay.clear();
      }
      return true;
    },
    success: function() {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function(customOverlay) {
      overlay = customOverlay;
    }
  };
}

var processUpdate = __webpack_require__(/*! ./process-update */ 15);

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch(obj.action) {
    case "building":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilding"
        );
      }
      break;
    case "built":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilt in " + obj.time + "ms"
        );
      }
      // fall through
    case "sync":
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }
      var applyUpdate = true;
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
        applyUpdate = false;
      } else if (obj.warnings.length > 0) {
        if (reporter) {
          var overlayShown = reporter.problems('warnings', obj);
          applyUpdate = overlayShown;
        }
      } else {
        if (reporter) {
          reporter.cleanProblemsCache();
          reporter.success();
        }
      }
      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    },
    setOptionsAndConnect: setOptionsAndConnect
  };
}

/* WEBPACK VAR INJECTION */}.call(exports, "?noInfo=true&timeout=20000&reload=true", __webpack_require__(/*! ./../webpack/buildin/module.js */ 4)(module)))

/***/ }),
/* 4 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/*!************************************************!*\
  !*** ../node_modules/querystring-es3/index.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ 6);
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ 7);


/***/ }),
/* 6 */
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/decode.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 7 */
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/encode.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 8 */
/*!*******************************************!*\
  !*** ../node_modules/strip-ansi/index.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ 9)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 9 */
/*!*******************************************!*\
  !*** ../node_modules/ansi-regex/index.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/client-overlay.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#E8E8E8',
  lineHeight: '1.2',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left'
};

var ansiHTML = __webpack_require__(/*! ansi-html */ 11);
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};

var Entities = __webpack_require__(/*! html-entities */ 12).AllHtmlEntities;
var entities = new Entities();

function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function(msg) {
    msg = ansiHTML(entities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });
  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
}

function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
}

function problemType (type) {
  var problemColors = {
    errors: colors.red,
    warnings: colors.yellow
  };
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
      type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}

module.exports = function(options) {
  for (var color in options.overlayColors) {
    if (color in colors) {
      colors[color] = options.overlayColors[color];
    }
    ansiHTML.setColors(colors);
  }

  for (var style in options.overlayStyles) {
    styles[style] = options.overlayStyles[style];
  }

  for (var key in styles) {
    clientOverlay.style[key] = styles[key];
  }

  return {
    showProblems: showProblems,
    clear: clear
  }
};

module.exports.clear = clear;
module.exports.showProblems = showProblems;


/***/ }),
/* 11 */
/*!******************************************!*\
  !*** ../node_modules/ansi-html/index.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),
/* 12 */
/*!**********************************************!*\
  !*** ../node_modules/html-entities/index.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ 13),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ 14),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ 1),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ 1)
};


/***/ }),
/* 13 */
/*!*********************************************************!*\
  !*** ../node_modules/html-entities/lib/xml-entities.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;


/***/ }),
/* 14 */
/*!***********************************************************!*\
  !*** ../node_modules/html-entities/lib/html4-entities.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;


/***/ }),
/* 15 */
/*!****************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/process-update.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */

if (false) {
  throw new Error("[HMR] Hot Module Replacement is disabled.");
}

var hmrDocsUrl = "https://webpack.js.org/concepts/hot-module-replacement/"; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = { 				
  ignoreUnaccepted: true,
  ignoreDeclined: true,
  ignoreErrored: true,
  onUnaccepted: function(data) {
    console.warn("Ignored an update to unaccepted module " + data.chain.join(" -> "));
  },
  onDeclined: function(data) {
    console.warn("Ignored an update to declined module " + data.chain.join(" -> "));
  },
  onErrored: function(data) {
    console.error(data.error);
    console.warn("Ignored an error while updating module " + data.moduleId + " (" + data.type + ")");
  } 
}

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function(hash, moduleMap, options) {
  var reload = options.reload;
  if (!upToDate(hash) && module.hot.status() == "idle") {
    if (options.log) console.log("[HMR] Checking for updates on the server...");
    check();
  }

  function check() {
    var cb = function(err, updatedModules) {
      if (err) return handleError(err);

      if(!updatedModules) {
        if (options.warn) {
          console.warn("[HMR] Cannot find update (Full reload needed)");
          console.warn("[HMR] (Probably because of restarting the server)");
        }
        performReload();
        return null;
      }

      var applyCallback = function(applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);

        if (!upToDate()) check();

        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback);
      // webpack 2 promise
      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function(outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }

    };

    var result = module.hot.check(false, cb);
    // webpack 2 promise
    if (result && result.then) {
        result.then(function(updatedModules) {
            cb(null, updatedModules);
        });
        result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if(unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn(
          "[HMR] The following modules couldn't be hot updated: " +
          "(Full reload needed)\n" +
          "This is usually because the modules which have changed " +
          "(and their parents) do not know how to hot reload themselves. " +
          "See " + hmrDocsUrl + " for more details."
        );
        unacceptedModules.forEach(function(moduleId) {
          console.warn("[HMR]  - " + moduleMap[moduleId]);
        });
      }
      performReload();
      return;
    }

    if (options.log) {
      if(!renewedModules || renewedModules.length === 0) {
        console.log("[HMR] Nothing hot updated.");
      } else {
        console.log("[HMR] Updated modules:");
        renewedModules.forEach(function(moduleId) {
          console.log("[HMR]  - " + moduleMap[moduleId]);
        });
      }

      if (upToDate()) {
        console.log("[HMR] App is up to date.");
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn("[HMR] Cannot check for update (Full reload needed)");
        console.warn("[HMR] " + err.stack || err.message);
      }
      performReload();
      return;
    }
    if (options.warn) {
      console.warn("[HMR] Update check failed: " + err.stack || err.message);
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn("[HMR] Reloading page");
      window.location.reload();
    }
  }
};


/***/ }),
/* 16 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/cache-loader/dist/cjs.js!../node_modules/css-loader?{"sourceMap":true}!../node_modules/postcss-loader/lib?{"config":{"path":"C://Users//Smigol//projects//ghost//content//themes//simply//src//build","ctx":{"open":true,"copy":"images/**_/*","proxyUrl":"http://localhost:3000","cacheBusting":"[name]","paths":{"root":"C://Users//Smigol//projects//ghost//content//themes//simply","assets":"C://Users//Smigol//projects//ghost//content//themes//simply//src","dist":"C://Users//Smigol//projects//ghost//content//themes//simply//assets"},"enabled":{"sourceMaps":true,"optimize":false,"cacheBusting":false,"watcher":true},"watch":["**_/*.hbs"],"entry":{"main":["./scripts/main.js","./styles/main.scss"],"amp":["./scripts/amp.js","./styles/amp.scss"]},"publicPath":"/assets/","devUrl":"http://localhost:2368","env":{"production":false,"development":true},"manifest":{}}},"sourceMap":true}!../node_modules/resolve-url-loader?{"sourceMap":true}!../node_modules/sass-loader/lib/loader.js?{"sourceMap":true,"sourceComments":true}!../node_modules/import-glob!./styles/main.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ 46);
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ 17)(true);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n\n/* line 1, src/styles/common/_mixins.scss */\n\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n/* line 7, src/styles/common/_mixins.scss */\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none;\n}\n\n/* line 22, src/styles/common/_mixins.scss */\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n/* line 30, src/styles/common/_mixins.scss */\n\n.tag.not--image,\n.footer a:hover,\n.footer .follow a,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\n/* line 35, src/styles/common/_mixins.scss */\n\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\n/* line 12, node_modules/normalize.css/normalize.css */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\n/* line 25, node_modules/normalize.css/normalize.css */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\n/* line 33, node_modules/normalize.css/normalize.css */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\n/* line 47, node_modules/normalize.css/normalize.css */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\n/* line 60, node_modules/normalize.css/normalize.css */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\n/* line 70, node_modules/normalize.css/normalize.css */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\n/* line 79, node_modules/normalize.css/normalize.css */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\n/* line 90, node_modules/normalize.css/normalize.css */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\n/* line 103, node_modules/normalize.css/normalize.css */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\n/* line 113, node_modules/normalize.css/normalize.css */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\n/* line 123, node_modules/normalize.css/normalize.css */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\n/* line 132, node_modules/normalize.css/normalize.css */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\n/* line 142, node_modules/normalize.css/normalize.css */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\n/* line 153, node_modules/normalize.css/normalize.css */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\n/* line 161, node_modules/normalize.css/normalize.css */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\n/* line 170, node_modules/normalize.css/normalize.css */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\n/* line 179, node_modules/normalize.css/normalize.css */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\n/* line 187, node_modules/normalize.css/normalize.css */\n\nsub {\n  bottom: -0.25em;\n}\n\n/* line 191, node_modules/normalize.css/normalize.css */\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\n/* line 202, node_modules/normalize.css/normalize.css */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\n/* line 211, node_modules/normalize.css/normalize.css */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\n/* line 220, node_modules/normalize.css/normalize.css */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\n/* line 228, node_modules/normalize.css/normalize.css */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\n/* line 240, node_modules/normalize.css/normalize.css */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\n/* line 256, node_modules/normalize.css/normalize.css */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\n/* line 266, node_modules/normalize.css/normalize.css */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\n/* line 277, node_modules/normalize.css/normalize.css */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\n/* line 288, node_modules/normalize.css/normalize.css */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\n/* line 300, node_modules/normalize.css/normalize.css */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\n/* line 311, node_modules/normalize.css/normalize.css */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\n/* line 322, node_modules/normalize.css/normalize.css */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\n/* line 336, node_modules/normalize.css/normalize.css */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\n/* line 345, node_modules/normalize.css/normalize.css */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n/* line 354, node_modules/normalize.css/normalize.css */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n/* line 364, node_modules/normalize.css/normalize.css */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n/* line 374, node_modules/normalize.css/normalize.css */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n/* line 383, node_modules/normalize.css/normalize.css */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n/* line 393, node_modules/normalize.css/normalize.css */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\n/* line 406, node_modules/normalize.css/normalize.css */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\n/* line 415, node_modules/normalize.css/normalize.css */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\n/* line 426, node_modules/normalize.css/normalize.css */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\n/* line 434, node_modules/normalize.css/normalize.css */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n/* line 445, node_modules/normalize.css/normalize.css */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\n/* line 7, node_modules/prismjs/themes/prism.css */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\n/* line 30, node_modules/prismjs/themes/prism.css */\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n/* line 36, node_modules/prismjs/themes/prism.css */\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection,\npre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection,\ncode[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  /* line 43, node_modules/prismjs/themes/prism.css */\n\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none;\n  }\n}\n\n/* Code blocks */\n\n/* line 50, node_modules/prismjs/themes/prism.css */\n\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto;\n}\n\n/* line 56, node_modules/prismjs/themes/prism.css */\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0;\n}\n\n/* Inline code */\n\n/* line 62, node_modules/prismjs/themes/prism.css */\n\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal;\n}\n\n/* line 68, node_modules/prismjs/themes/prism.css */\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n/* line 75, node_modules/prismjs/themes/prism.css */\n\n.token.punctuation {\n  color: #999;\n}\n\n/* line 79, node_modules/prismjs/themes/prism.css */\n\n.namespace {\n  opacity: .7;\n}\n\n/* line 83, node_modules/prismjs/themes/prism.css */\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n/* line 93, node_modules/prismjs/themes/prism.css */\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n/* line 102, node_modules/prismjs/themes/prism.css */\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #9a6e3a;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n/* line 111, node_modules/prismjs/themes/prism.css */\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n/* line 117, node_modules/prismjs/themes/prism.css */\n\n.token.function,\n.token.class-name {\n  color: #DD4A68;\n}\n\n/* line 122, node_modules/prismjs/themes/prism.css */\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n/* line 128, node_modules/prismjs/themes/prism.css */\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n/* line 132, node_modules/prismjs/themes/prism.css */\n\n.token.italic {\n  font-style: italic;\n}\n\n/* line 136, node_modules/prismjs/themes/prism.css */\n\n.token.entity {\n  cursor: help;\n}\n\n/* line 2, src/styles/lib/_zoom.scss */\n\nimg[data-action=\"zoom\"] {\n  cursor: -webkit-zoom-in;\n  cursor: zoom-in;\n}\n\n/* line 5, src/styles/lib/_zoom.scss */\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms;\n}\n\n/* line 13, src/styles/lib/_zoom.scss */\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out;\n}\n\n/* line 18, src/styles/lib/_zoom.scss */\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n\n/* line 33, src/styles/lib/_zoom.scss */\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1;\n}\n\n/* line 37, src/styles/lib/_zoom.scss */\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default;\n}\n\n/* line 2, src/styles/common/_global.scss */\n\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n/* line 6, src/styles/common/_global.scss */\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\n/* line 10, src/styles/common/_global.scss */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* line 16, src/styles/common/_global.scss */\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  color: #000;\n  font-family: \"Merriweather\", serif;\n  font-size: 1.1875rem;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.7;\n  margin: 30px 0 0 -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\n/* line 29, src/styles/common/_global.scss */\n\nblockquote p:first-of-type {\n  margin-top: 0;\n}\n\n/* line 32, src/styles/common/_global.scss */\n\nbody {\n  color: rgba(0, 0, 0, 0.84);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\n/* line 45, src/styles/common/_global.scss */\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 16px;\n}\n\n/* line 50, src/styles/common/_global.scss */\n\nfigure {\n  margin: 0;\n}\n\n/* line 54, src/styles/common/_global.scss */\n\nfigcaption {\n  color: rgba(0, 0, 0, 0.68);\n  display: block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  -webkit-font-feature-settings: \"liga\" on, \"lnum\" on;\n          font-feature-settings: \"liga\" on, \"lnum\" on;\n  font-size: 15px;\n  font-style: normal;\n  font-weight: 400;\n  left: 0;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin-top: 10px;\n  outline: 0;\n  position: relative;\n  text-align: center;\n  top: 0;\n  width: 100%;\n}\n\n/* line 75, src/styles/common/_global.scss */\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\n/* line 85, src/styles/common/_global.scss */\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\n/* line 97, src/styles/common/_global.scss */\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\n/* line 105, src/styles/common/_global.scss */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: #37474f;\n  line-height: 1.4;\n}\n\n/* line 110, src/styles/common/_global.scss */\n\ncode[class*=language-] .token.comment,\npre[class*=language-] .token.comment {\n  opacity: .8;\n}\n\n/* line 115, src/styles/common/_global.scss */\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n}\n\n/* line 121, src/styles/common/_global.scss */\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -25px;\n}\n\n/* line 134, src/styles/common/_global.scss */\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\n/* line 140, src/styles/common/_global.scss */\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\n/* line 145, src/styles/common/_global.scss */\n\ni {\n  vertical-align: middle;\n}\n\n/* line 150, src/styles/common/_global.scss */\n\nol,\nul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\n/* line 157, src/styles/common/_global.scss */\n\nmark {\n  background-color: transparent !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#d7fdd3), to(#d7fdd3));\n  background-image: -webkit-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: -o-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n/* line 163, src/styles/common/_global.scss */\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n}\n\n/* line 175, src/styles/common/_global.scss */\n\nq::before,\nq::after {\n  display: none;\n}\n\n/* line 185, src/styles/common/_global.scss */\n\n.link--underline:active,\n.link--underline:focus,\n.link--underline:hover {\n  color: inherit;\n  text-decoration: underline;\n}\n\n/* line 195, src/styles/common/_global.scss */\n\n.main,\n.footer {\n  -webkit-transition: -webkit-transform .5s ease;\n  transition: -webkit-transform .5s ease;\n  -o-transition: -o-transform .5s ease;\n  transition: transform .5s ease;\n  transition: transform .5s ease, -webkit-transform .5s ease, -o-transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 199, src/styles/common/_global.scss */\n\n  .main {\n    overflow: hidden;\n    padding-top: 50px;\n  }\n\n  /* line 204, src/styles/common/_global.scss */\n\n  .feed-entry-content {\n    padding-left: 20px;\n    padding-right: 20px;\n    overflow: hidden;\n  }\n\n  /* line 210, src/styles/common/_global.scss */\n\n  blockquote {\n    margin-left: -5px;\n  }\n}\n\n/* line 215, src/styles/common/_global.scss */\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n/* line 218, src/styles/common/_global.scss */\n\n.warning::before {\n  content: \"\\E002\";\n}\n\n/* line 221, src/styles/common/_global.scss */\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n/* line 224, src/styles/common/_global.scss */\n\n.note::before {\n  content: \"\\E838\";\n}\n\n/* line 227, src/styles/common/_global.scss */\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n/* line 230, src/styles/common/_global.scss */\n\n.success::before {\n  color: #00bfa5;\n  content: \"\\E86C\";\n}\n\n/* line 233, src/styles/common/_global.scss */\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n/* line 240, src/styles/common/_global.scss */\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n/* line 245, src/styles/common/_global.scss */\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n  margin-top: -5px;\n}\n\n/* line 257, src/styles/common/_global.scss */\n\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n}\n\n/* line 262, src/styles/common/_global.scss */\n\n.tag-wrap {\n  z-index: 2;\n}\n\n/* line 264, src/styles/common/_global.scss */\n\n.tag.not--image {\n  min-height: auto;\n}\n\n/* line 270, src/styles/common/_global.scss */\n\n.tag-description {\n  max-width: 500px;\n}\n\n/* line 277, src/styles/common/_global.scss */\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n/* line 281, src/styles/common/_global.scss */\n\n.with-tooltip::after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #fff;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 130px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n/* line 303, src/styles/common/_global.scss */\n\n.with-tooltip:hover::after {\n  -webkit-animation: tooltip .1s ease-out both;\n       -o-animation: tooltip .1s ease-out both;\n          animation: tooltip .1s ease-out both;\n}\n\n/* line 310, src/styles/common/_global.scss */\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n  padding-bottom: 45px;\n}\n\n/* line 314, src/styles/common/_global.scss */\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n/* line 319, src/styles/common/_global.scss */\n\n.footer .follow {\n  display: block !important;\n  text-align: center;\n}\n\n/* line 323, src/styles/common/_global.scss */\n\n.footer .follow a {\n  padding: 0 7px;\n}\n\n/* line 328, src/styles/common/_global.scss */\n\n.footer .follow a:hover {\n  color: rgba(0, 0, 0, 0.6) !important;\n}\n\n/* line 336, src/styles/common/_global.scss */\n\n.instagram-hover {\n  background-color: rgba(0, 0, 0, 0.3);\n  opacity: 0;\n}\n\n/* line 342, src/styles/common/_global.scss */\n\n.instagram-img {\n  height: 264px;\n}\n\n/* line 345, src/styles/common/_global.scss */\n\n.instagram-img:hover > .instagram-hover {\n  opacity: 1;\n}\n\n/* line 348, src/styles/common/_global.scss */\n\n.instagram-name {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  z-index: 10;\n}\n\n/* line 355, src/styles/common/_global.scss */\n\n.instagram-name a {\n  background-color: #fff;\n  color: #000 !important;\n  font-size: 20px !important;\n  font-weight: 600 !important;\n  min-width: 200px;\n  padding-left: 10px !important;\n  padding-right: 10px !important;\n  text-align: center !important;\n}\n\n/* line 367, src/styles/common/_global.scss */\n\n.instagram-col {\n  padding: 0 !important;\n  margin: 0 !important;\n}\n\n/* line 375, src/styles/common/_global.scss */\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n}\n\n/* line 378, src/styles/common/_global.scss */\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n/* line 384, src/styles/common/_global.scss */\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n/* line 389, src/styles/common/_global.scss */\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  padding: 7vw 4vw;\n}\n\n/* line 397, src/styles/common/_global.scss */\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n}\n\n/* line 406, src/styles/common/_global.scss */\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* line 416, src/styles/common/_global.scss */\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* line 427, src/styles/common/_global.scss */\n\n.kg-embed-card .video-responsive {\n  margin-top: 0;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-google,\n.sideNav-follow .i-google {\n  background-color: #dd4b39 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-github {\n  color: #555 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-github,\n.sideNav-follow .i-github {\n  background-color: #555 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-linkedin,\n.sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-spotify,\n.sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-codepen {\n  color: #222 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-codepen,\n.sideNav-follow .i-codepen {\n  background-color: #222 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-behance {\n  color: #131418 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-behance,\n.sideNav-follow .i-behance {\n  background-color: #131418 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-dribbble,\n.sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-flickr,\n.sideNav-follow .i-flickr {\n  background-color: #0063dc !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-reddit,\n.sideNav-follow .i-reddit {\n  background-color: #ff4500 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-pocket,\n.sideNav-follow .i-pocket {\n  background-color: #f50057 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-pinterest,\n.sideNav-follow .i-pinterest {\n  background-color: #bd081c !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-whatsapp,\n.sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-telegram {\n  color: #08c !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-telegram,\n.sideNav-follow .i-telegram {\n  background-color: #08c !important;\n}\n\n/* line 456, src/styles/common/_global.scss */\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n}\n\n/* line 464, src/styles/common/_global.scss */\n\n.rocket:hover svg path {\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n/* line 469, src/styles/common/_global.scss */\n\n.svgIcon {\n  display: inline-block;\n}\n\n/* line 473, src/styles/common/_global.scss */\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n/* line 480, src/styles/common/_global.scss */\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n/* line 489, src/styles/common/_global.scss */\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  z-index: 800;\n}\n\n/* line 501, src/styles/common/_global.scss */\n\n.is-loading .loadingBar {\n  -webkit-animation: loading-bar 1s ease-in-out infinite;\n       -o-animation: loading-bar 1s ease-in-out infinite;\n          animation: loading-bar 1s ease-in-out infinite;\n  -webkit-animation-delay: .8s;\n       -o-animation-delay: .8s;\n          animation-delay: .8s;\n  display: block;\n}\n\n/* line 3, src/styles/common/_typography.scss */\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\n/* line 11, src/styles/common/_typography.scss */\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\n/* line 17, src/styles/common/_typography.scss */\n\nh1 {\n  font-size: 2.25rem;\n}\n\n/* line 18, src/styles/common/_typography.scss */\n\nh2 {\n  font-size: 1.875rem;\n}\n\n/* line 19, src/styles/common/_typography.scss */\n\nh3 {\n  font-size: 1.5625rem;\n}\n\n/* line 20, src/styles/common/_typography.scss */\n\nh4 {\n  font-size: 1.375rem;\n}\n\n/* line 21, src/styles/common/_typography.scss */\n\nh5 {\n  font-size: 1.125rem;\n}\n\n/* line 22, src/styles/common/_typography.scss */\n\nh6 {\n  font-size: 1rem;\n}\n\n/* line 27, src/styles/common/_typography.scss */\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n/* line 28, src/styles/common/_typography.scss */\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n/* line 29, src/styles/common/_typography.scss */\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n/* line 30, src/styles/common/_typography.scss */\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n/* line 31, src/styles/common/_typography.scss */\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n/* line 32, src/styles/common/_typography.scss */\n\n.h6 {\n  font-size: 1rem;\n}\n\n/* line 34, src/styles/common/_typography.scss */\n\np {\n  margin: 0;\n}\n\n/* line 2, src/styles/common/_utilities.scss */\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.54) !important;\n  fill: rgba(0, 0, 0, 0.54) !important;\n}\n\n/* line 9, src/styles/common/_utilities.scss */\n\n.u-textColorWhite {\n  color: #fff !important;\n  fill: #fff !important;\n}\n\n/* line 14, src/styles/common/_utilities.scss */\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n/* line 19, src/styles/common/_utilities.scss */\n\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034;\n}\n\n/* line 25, src/styles/common/_utilities.scss */\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n/* line 27, src/styles/common/_utilities.scss */\n\n.u-headerColorLink a {\n  color: #BBF1B9;\n}\n\n/* line 31, src/styles/common/_utilities.scss */\n\n.u-headerColorLink a.active,\n.u-headerColorLink a:hover {\n  color: #EEFFEA;\n}\n\n/* line 41, src/styles/common/_utilities.scss */\n\n.u-relative {\n  position: relative;\n}\n\n/* line 42, src/styles/common/_utilities.scss */\n\n.u-absolute {\n  position: absolute;\n}\n\n/* line 44, src/styles/common/_utilities.scss */\n\n.u-fixed {\n  position: fixed !important;\n}\n\n/* line 46, src/styles/common/_utilities.scss */\n\n.u-block {\n  display: block !important;\n}\n\n/* line 47, src/styles/common/_utilities.scss */\n\n.u-inlineBlock {\n  display: inline-block;\n}\n\n/* line 50, src/styles/common/_utilities.scss */\n\n.u-backgroundDark {\n  background-color: #000;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n/* line 62, src/styles/common/_utilities.scss */\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n/* line 63, src/styles/common/_utilities.scss */\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n/* line 67, src/styles/common/_utilities.scss */\n\n.u-clear::before,\n.row::before,\n.u-clear::after,\n.row::after {\n  content: \" \";\n  display: table;\n}\n\n/* line 72, src/styles/common/_utilities.scss */\n\n.u-clear::after,\n.row::after {\n  clear: both;\n}\n\n/* line 76, src/styles/common/_utilities.scss */\n\n.u-fontSize13 {\n  font-size: 13px !important;\n}\n\n/* line 77, src/styles/common/_utilities.scss */\n\n.u-fontSize14 {\n  font-size: 14px;\n}\n\n/* line 78, src/styles/common/_utilities.scss */\n\n.u-fontSize15 {\n  font-size: 15px !important;\n}\n\n/* line 79, src/styles/common/_utilities.scss */\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n/* line 80, src/styles/common/_utilities.scss */\n\n.u-fontSize21 {\n  font-size: 21px;\n}\n\n/* line 81, src/styles/common/_utilities.scss */\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n/* line 82, src/styles/common/_utilities.scss */\n\n.u-fontSize28 {\n  font-size: 28px !important;\n}\n\n/* line 83, src/styles/common/_utilities.scss */\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n/* line 84, src/styles/common/_utilities.scss */\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n/* line 85, src/styles/common/_utilities.scss */\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n/* line 86, src/styles/common/_utilities.scss */\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n/* line 87, src/styles/common/_utilities.scss */\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n/* line 88, src/styles/common/_utilities.scss */\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n/* line 89, src/styles/common/_utilities.scss */\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n/* line 90, src/styles/common/_utilities.scss */\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n/* line 91, src/styles/common/_utilities.scss */\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n/* line 92, src/styles/common/_utilities.scss */\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n/* line 93, src/styles/common/_utilities.scss */\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 96, src/styles/common/_utilities.scss */\n\n  .u-md-fontSizeBase {\n    font-size: 18px !important;\n  }\n\n  /* line 97, src/styles/common/_utilities.scss */\n\n  .u-md-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n/* line 113, src/styles/common/_utilities.scss */\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n/* line 114, src/styles/common/_utilities.scss */\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n/* line 116, src/styles/common/_utilities.scss */\n\n.u-fontWeightSemibold {\n  font-weight: 600 !important;\n}\n\n/* line 117, src/styles/common/_utilities.scss */\n\n.u-fontWeightBold {\n  font-weight: 700;\n}\n\n/* line 119, src/styles/common/_utilities.scss */\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n/* line 120, src/styles/common/_utilities.scss */\n\n.u-textCapitalize {\n  text-transform: capitalize;\n}\n\n/* line 121, src/styles/common/_utilities.scss */\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n/* line 123, src/styles/common/_utilities.scss */\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n/* line 130, src/styles/common/_utilities.scss */\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n/* line 131, src/styles/common/_utilities.scss */\n\n.u-marginTop20 {\n  margin-top: 20px;\n}\n\n/* line 132, src/styles/common/_utilities.scss */\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n/* line 133, src/styles/common/_utilities.scss */\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n/* line 134, src/styles/common/_utilities.scss */\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important;\n}\n\n/* line 135, src/styles/common/_utilities.scss */\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n/* line 136, src/styles/common/_utilities.scss */\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n/* line 139, src/styles/common/_utilities.scss */\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n/* line 140, src/styles/common/_utilities.scss */\n\n.u-padding20 {\n  padding: 20px;\n}\n\n/* line 141, src/styles/common/_utilities.scss */\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n/* line 142, src/styles/common/_utilities.scss */\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n/* line 143, src/styles/common/_utilities.scss */\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n/* line 144, src/styles/common/_utilities.scss */\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n/* line 145, src/styles/common/_utilities.scss */\n\n.u-paddingRight10 {\n  padding-right: 10px;\n}\n\n/* line 146, src/styles/common/_utilities.scss */\n\n.u-paddingLeft15 {\n  padding-left: 15px;\n}\n\n/* line 148, src/styles/common/_utilities.scss */\n\n.u-paddingTop2 {\n  padding-top: 2px;\n}\n\n/* line 149, src/styles/common/_utilities.scss */\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n/* line 150, src/styles/common/_utilities.scss */\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n/* line 151, src/styles/common/_utilities.scss */\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n/* line 152, src/styles/common/_utilities.scss */\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n/* line 153, src/styles/common/_utilities.scss */\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n/* line 155, src/styles/common/_utilities.scss */\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n/* line 157, src/styles/common/_utilities.scss */\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n/* line 158, src/styles/common/_utilities.scss */\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n/* line 160, src/styles/common/_utilities.scss */\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n/* line 168, src/styles/common/_utilities.scss */\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n/* line 169, src/styles/common/_utilities.scss */\n\n.u-lineHeightTight {\n  line-height: 1.2;\n}\n\n/* line 172, src/styles/common/_utilities.scss */\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n/* line 175, src/styles/common/_utilities.scss */\n\n.u-floatRight {\n  float: right;\n}\n\n/* line 176, src/styles/common/_utilities.scss */\n\n.u-floatLeft {\n  float: left;\n}\n\n/* line 179, src/styles/common/_utilities.scss */\n\n.u-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n/* line 180, src/styles/common/_utilities.scss */\n\n.u-flexCenter {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n/* line 182, src/styles/common/_utilities.scss */\n\n.u-flex1 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n/* line 183, src/styles/common/_utilities.scss */\n\n.u-flex0 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n\n/* line 184, src/styles/common/_utilities.scss */\n\n.u-flexWrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n/* line 186, src/styles/common/_utilities.scss */\n\n.u-flexColumn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n/* line 192, src/styles/common/_utilities.scss */\n\n.u-flexEnd {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n/* line 197, src/styles/common/_utilities.scss */\n\n.u-flexColumnTop {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n/* line 204, src/styles/common/_utilities.scss */\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n/* line 211, src/styles/common/_utilities.scss */\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n/* line 218, src/styles/common/_utilities.scss */\n\n.u-maxWidth1200 {\n  max-width: 1200px;\n}\n\n/* line 219, src/styles/common/_utilities.scss */\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n/* line 220, src/styles/common/_utilities.scss */\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n/* line 221, src/styles/common/_utilities.scss */\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n/* line 222, src/styles/common/_utilities.scss */\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n/* line 225, src/styles/common/_utilities.scss */\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n/* line 226, src/styles/common/_utilities.scss */\n\n.u-round {\n  border-radius: 50%;\n}\n\n/* line 227, src/styles/common/_utilities.scss */\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n/* line 229, src/styles/common/_utilities.scss */\n\n.u-boxShadowBottom {\n  -webkit-box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n/* line 234, src/styles/common/_utilities.scss */\n\n.u-height540 {\n  height: 540px;\n}\n\n/* line 235, src/styles/common/_utilities.scss */\n\n.u-height280 {\n  height: 280px;\n}\n\n/* line 236, src/styles/common/_utilities.scss */\n\n.u-height260 {\n  height: 260px;\n}\n\n/* line 237, src/styles/common/_utilities.scss */\n\n.u-height100 {\n  height: 100px;\n}\n\n/* line 238, src/styles/common/_utilities.scss */\n\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n/* line 241, src/styles/common/_utilities.scss */\n\n.u-hide {\n  display: none !important;\n}\n\n/* line 244, src/styles/common/_utilities.scss */\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  -webkit-box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n/* line 254, src/styles/common/_utilities.scss */\n\n.no-avatar {\n  background-image: url(" + escape(__webpack_require__(/*! ./../images/avatar.png */ 47)) + ") !important;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 259, src/styles/common/_utilities.scss */\n\n  .u-hide-before-md {\n    display: none !important;\n  }\n\n  /* line 260, src/styles/common/_utilities.scss */\n\n  .u-md-heightAuto {\n    height: auto;\n  }\n\n  /* line 261, src/styles/common/_utilities.scss */\n\n  .u-md-height170 {\n    height: 170px;\n  }\n\n  /* line 262, src/styles/common/_utilities.scss */\n\n  .u-md-relative {\n    position: relative;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  /* line 265, src/styles/common/_utilities.scss */\n\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 268, src/styles/common/_utilities.scss */\n\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  /* line 270, src/styles/common/_utilities.scss */\n\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  /* line 2, src/styles/components/_grid.scss */\n\n  .content {\n    max-width: calc(100% - 340px) !important;\n  }\n\n  /* line 9, src/styles/components/_grid.scss */\n\n  .sidebar {\n    width: 340px !important;\n  }\n}\n\n/* line 16, src/styles/components/_grid.scss */\n\n.row {\n  margin-left: -10px;\n  margin-right: -10px;\n}\n\n/* line 22, src/styles/components/_grid.scss */\n\n.row .col {\n  float: left;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s1 {\n  width: 8.33333%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s2 {\n  width: 16.66667%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s3 {\n  width: 25%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s4 {\n  width: 33.33333%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s5 {\n  width: 41.66667%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s6 {\n  width: 50%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s7 {\n  width: 58.33333%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s8 {\n  width: 66.66667%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s9 {\n  width: 75%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s10 {\n  width: 83.33333%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s11 {\n  width: 91.66667%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s12 {\n  width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m1 {\n    width: 8.33333%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m2 {\n    width: 16.66667%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m3 {\n    width: 25%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m4 {\n    width: 33.33333%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m5 {\n    width: 41.66667%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m6 {\n    width: 50%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m7 {\n    width: 58.33333%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m8 {\n    width: 66.66667%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m9 {\n    width: 75%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m10 {\n    width: 83.33333%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m11 {\n    width: 91.66667%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m12 {\n    width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l1 {\n    width: 8.33333%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l2 {\n    width: 16.66667%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l3 {\n    width: 25%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l4 {\n    width: 33.33333%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l5 {\n    width: 41.66667%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l6 {\n    width: 50%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l7 {\n    width: 58.33333%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l8 {\n    width: 66.66667%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l9 {\n    width: 75%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l10 {\n    width: 83.33333%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l11 {\n    width: 91.66667%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l12 {\n    width: 100%;\n  }\n}\n\n/* line 1, src/styles/components/_form.scss */\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n/* line 25, src/styles/components/_form.scss */\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n/* line 37, src/styles/components/_form.scss */\n\n.button--chromeless:active,\n.button--chromeless:hover,\n.button--chromeless:focus {\n  border-width: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n/* line 45, src/styles/components/_form.scss */\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n/* line 52, src/styles/components/_form.scss */\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n/* line 56, src/styles/components/_form.scss */\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n/* line 64, src/styles/components/_form.scss */\n\n.button--primary {\n  border-color: #00A034;\n  color: #00A034;\n}\n\n/* line 69, src/styles/components/_form.scss */\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n/* line 75, src/styles/components/_form.scss */\n\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n\n/* line 80, src/styles/components/_form.scss */\n\n.buttonSet > .button:last-child {\n  margin-right: 0;\n}\n\n/* line 84, src/styles/components/_form.scss */\n\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px;\n}\n\n/* line 89, src/styles/components/_form.scss */\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n/* line 95, src/styles/components/_form.scss */\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n/* line 99, src/styles/components/_form.scss */\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n/* line 104, src/styles/components/_form.scss */\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(" + escape(__webpack_require__(/*! ./../fonts/simply.eot */ 21)) + ");\n  src: url(" + escape(__webpack_require__(/*! ./../fonts/simply.eot */ 21)) + ") format(\"embedded-opentype\"), url(" + escape(__webpack_require__(/*! ./../fonts/simply.ttf */ 48)) + ") format(\"truetype\"), url(" + escape(__webpack_require__(/*! ./../fonts/simply.woff */ 49)) + ") format(\"woff\"), url(" + escape(__webpack_require__(/*! ./../fonts/simply.svg */ 50)) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n/* line 18, src/styles/components/_icons.scss */\n\n.i-audio:before {\n  content: \"\\E901\";\n}\n\n/* line 21, src/styles/components/_icons.scss */\n\n.i-rocket:before {\n  content: \"\\E902\";\n  color: #999;\n}\n\n/* line 25, src/styles/components/_icons.scss */\n\n.i-comments:before {\n  content: \"\\E900\";\n}\n\n/* line 28, src/styles/components/_icons.scss */\n\n.i-google:before {\n  content: \"\\F1A0\";\n}\n\n/* line 31, src/styles/components/_icons.scss */\n\n.i-telegram:before {\n  content: \"\\F2C6\";\n}\n\n/* line 34, src/styles/components/_icons.scss */\n\n.i-link:before {\n  content: \"\\F0C1\";\n}\n\n/* line 37, src/styles/components/_icons.scss */\n\n.i-reddit:before {\n  content: \"\\F281\";\n}\n\n/* line 40, src/styles/components/_icons.scss */\n\n.i-twitter:before {\n  content: \"\\F099\";\n}\n\n/* line 43, src/styles/components/_icons.scss */\n\n.i-github:before {\n  content: \"\\F09B\";\n}\n\n/* line 46, src/styles/components/_icons.scss */\n\n.i-linkedin:before {\n  content: \"\\F0E1\";\n}\n\n/* line 49, src/styles/components/_icons.scss */\n\n.i-youtube:before {\n  content: \"\\F16A\";\n}\n\n/* line 52, src/styles/components/_icons.scss */\n\n.i-stack-overflow:before {\n  content: \"\\F16C\";\n}\n\n/* line 55, src/styles/components/_icons.scss */\n\n.i-instagram:before {\n  content: \"\\F16D\";\n}\n\n/* line 58, src/styles/components/_icons.scss */\n\n.i-flickr:before {\n  content: \"\\F16E\";\n}\n\n/* line 61, src/styles/components/_icons.scss */\n\n.i-dribbble:before {\n  content: \"\\F17D\";\n}\n\n/* line 64, src/styles/components/_icons.scss */\n\n.i-behance:before {\n  content: \"\\F1B4\";\n}\n\n/* line 67, src/styles/components/_icons.scss */\n\n.i-spotify:before {\n  content: \"\\F1BC\";\n}\n\n/* line 70, src/styles/components/_icons.scss */\n\n.i-codepen:before {\n  content: \"\\F1CB\";\n}\n\n/* line 73, src/styles/components/_icons.scss */\n\n.i-facebook:before {\n  content: \"\\F230\";\n}\n\n/* line 76, src/styles/components/_icons.scss */\n\n.i-pinterest:before {\n  content: \"\\F231\";\n}\n\n/* line 79, src/styles/components/_icons.scss */\n\n.i-whatsapp:before {\n  content: \"\\F232\";\n}\n\n/* line 82, src/styles/components/_icons.scss */\n\n.i-snapchat:before {\n  content: \"\\F2AC\";\n}\n\n/* line 85, src/styles/components/_icons.scss */\n\n.i-arrow_left:before {\n  content: \"\\E314\";\n}\n\n/* line 88, src/styles/components/_icons.scss */\n\n.i-arrow_right:before {\n  content: \"\\E315\";\n}\n\n/* line 91, src/styles/components/_icons.scss */\n\n.i-play:before {\n  content: \"\\E037\";\n}\n\n/* line 94, src/styles/components/_icons.scss */\n\n.i-star-line:before {\n  content: \"\\E83A\";\n}\n\n/* line 97, src/styles/components/_icons.scss */\n\n.i-photo:before {\n  content: \"\\E412\";\n}\n\n/* line 100, src/styles/components/_icons.scss */\n\n.i-location:before {\n  content: \"\\E8B4\";\n}\n\n/* line 103, src/styles/components/_icons.scss */\n\n.i-check-circle:before {\n  content: \"\\E86C\";\n}\n\n/* line 106, src/styles/components/_icons.scss */\n\n.i-close:before {\n  content: \"\\E5CD\";\n}\n\n/* line 109, src/styles/components/_icons.scss */\n\n.i-favorite:before {\n  content: \"\\E87D\";\n}\n\n/* line 112, src/styles/components/_icons.scss */\n\n.i-star:before {\n  content: \"\\E838\";\n}\n\n/* line 115, src/styles/components/_icons.scss */\n\n.i-warning:before {\n  content: \"\\E002\";\n}\n\n/* line 118, src/styles/components/_icons.scss */\n\n.i-rss:before {\n  content: \"\\E0E5\";\n}\n\n/* line 121, src/styles/components/_icons.scss */\n\n.i-search:before {\n  content: \"\\E8B6\";\n}\n\n/* line 124, src/styles/components/_icons.scss */\n\n.i-send:before {\n  content: \"\\E163\";\n}\n\n/* line 127, src/styles/components/_icons.scss */\n\n.i-share:before {\n  content: \"\\E80D\";\n}\n\n/* line 2, src/styles/components/_animated.scss */\n\n.animated {\n  -webkit-animation-duration: 1s;\n       -o-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n       -o-animation-fill-mode: both;\n          animation-fill-mode: both;\n}\n\n/* line 6, src/styles/components/_animated.scss */\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n       -o-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n\n/* line 12, src/styles/components/_animated.scss */\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n       -o-animation-name: bounceIn;\n          animation-name: bounceIn;\n}\n\n/* line 13, src/styles/components/_animated.scss */\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n       -o-animation-name: bounceInDown;\n          animation-name: bounceInDown;\n}\n\n/* line 14, src/styles/components/_animated.scss */\n\n.pulse {\n  -webkit-animation-name: pulse;\n       -o-animation-name: pulse;\n          animation-name: pulse;\n}\n\n@-webkit-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n       animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n         -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n@-o-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n       animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -o-transform: none;\n       transform: none;\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n         -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n         -o-transform: none;\n            transform: none;\n  }\n}\n\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-o-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -o-transform: translateY(0);\n       transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -o-transform: translateY(10px);\n       transform: translateY(10px);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n         -o-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n         -o-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-webkit-keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@-o-keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-o-keyframes spin {\n  from {\n    -o-transform: rotate(0deg);\n       transform: rotate(0deg);\n  }\n\n  to {\n    -o-transform: rotate(360deg);\n       transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n         -o-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n         -o-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-o-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -o-transform: translate(-50%, 6px);\n       transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -o-transform: translate(-50%, 0);\n       transform: translate(-50%, 0);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n         -o-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n         -o-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-webkit-keyframes loading-bar {\n  0% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n  }\n\n  40% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  60% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n  }\n}\n\n@-o-keyframes loading-bar {\n  0% {\n    -o-transform: translateX(-100%);\n       transform: translateX(-100%);\n  }\n\n  40% {\n    -o-transform: translateX(0);\n       transform: translateX(0);\n  }\n\n  60% {\n    -o-transform: translateX(0);\n       transform: translateX(0);\n  }\n\n  100% {\n    -o-transform: translateX(100%);\n       transform: translateX(100%);\n  }\n}\n\n@keyframes loading-bar {\n  0% {\n    -webkit-transform: translateX(-100%);\n         -o-transform: translateX(-100%);\n            transform: translateX(-100%);\n  }\n\n  40% {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  60% {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  100% {\n    -webkit-transform: translateX(100%);\n         -o-transform: translateX(100%);\n            transform: translateX(100%);\n  }\n}\n\n/* line 4, src/styles/layouts/_header.scss */\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n/* line 9, src/styles/layouts/_header.scss */\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  -webkit-transition: -webkit-transform .4s;\n  transition: -webkit-transform .4s;\n  -o-transition: -o-transform .4s;\n  transition: transform .4s;\n  transition: transform .4s, -webkit-transform .4s, -o-transform .4s;\n  width: 48px;\n}\n\n/* line 15, src/styles/layouts/_header.scss */\n\n.button-nav--toggle span {\n  background-color: #BBF1B9;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  -webkit-transition: .4s;\n  -o-transition: .4s;\n  transition: .4s;\n  width: 20px;\n}\n\n/* line 26, src/styles/layouts/_header.scss */\n\n.button-nav--toggle span:first-child {\n  -webkit-transform: translate(0, -6px);\n       -o-transform: translate(0, -6px);\n          transform: translate(0, -6px);\n}\n\n/* line 27, src/styles/layouts/_header.scss */\n\n.button-nav--toggle span:last-child {\n  -webkit-transform: translate(0, 6px);\n       -o-transform: translate(0, 6px);\n          transform: translate(0, 6px);\n}\n\n/* line 31, src/styles/layouts/_header.scss */\n\n.header {\n  z-index: 999;\n}\n\n/* line 34, src/styles/layouts/_header.scss */\n\n.header-wrap {\n  height: 55px;\n}\n\n/* line 36, src/styles/layouts/_header.scss */\n\n.header-logo {\n  color: #fff !important;\n  height: 30px;\n}\n\n/* line 40, src/styles/layouts/_header.scss */\n\n.header-logo img {\n  max-height: 100%;\n}\n\n/* line 43, src/styles/layouts/_header.scss */\n\n.header-logo,\n.header .button-search--open,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n/* line 48, src/styles/layouts/_header.scss */\n\n.header-description {\n  color: rgba(255, 255, 255, 0.8);\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 650px;\n}\n\n/* line 58, src/styles/layouts/_header.scss */\n\n.not-logo .header-logo {\n  height: auto !important;\n}\n\n/* line 63, src/styles/layouts/_header.scss */\n\n.follow > a {\n  padding-left: 15px;\n}\n\n/* line 68, src/styles/layouts/_header.scss */\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n}\n\n/* line 74, src/styles/layouts/_header.scss */\n\n.nav ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n/* line 81, src/styles/layouts/_header.scss */\n\n.nav li {\n  float: left;\n}\n\n/* line 84, src/styles/layouts/_header.scss */\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 98, src/styles/layouts/_header.scss */\n\n  body.is-home .header-wrap {\n    height: 200px;\n  }\n\n  /* line 100, src/styles/layouts/_header.scss */\n\n  body.is-home .header-logo {\n    height: 50px;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 117, src/styles/layouts/_header.scss */\n\n  .header {\n    position: fixed;\n  }\n\n  /* line 120, src/styles/layouts/_header.scss */\n\n  .header-wrap {\n    height: 50px;\n  }\n\n  /* line 123, src/styles/layouts/_header.scss */\n\n  .header-logo--wrap {\n    text-align: left;\n  }\n\n  /* line 124, src/styles/layouts/_header.scss */\n\n  .header-logo {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n  }\n\n  /* line 125, src/styles/layouts/_header.scss */\n\n  .header-logo span {\n    font-size: 24px;\n  }\n\n  /* line 127, src/styles/layouts/_header.scss */\n\n  .header-top {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n\n  /* line 133, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  /* line 136, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .sideNav {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  /* line 138, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    -webkit-transform: rotate(90deg);\n         -o-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n\n  /* line 142, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    -webkit-transform: rotate(45deg) translate(0, 0);\n         -o-transform: rotate(45deg) translate(0, 0);\n            transform: rotate(45deg) translate(0, 0);\n  }\n\n  /* line 143, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    -webkit-transform: scaleX(0);\n         -o-transform: scaleX(0);\n            transform: scaleX(0);\n  }\n\n  /* line 144, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    -webkit-transform: rotate(-45deg) translate(0, 0);\n         -o-transform: rotate(-45deg) translate(0, 0);\n            transform: rotate(-45deg) translate(0, 0);\n  }\n\n  /* line 147, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  /* line 148, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    -webkit-transform: translateX(-25%);\n         -o-transform: translateX(-25%);\n            transform: translateX(-25%);\n  }\n}\n\n/* line 1, src/styles/layouts/_story-card.scss */\n\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px;\n}\n\n/* line 6, src/styles/layouts/_story-card.scss */\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%;\n}\n\n/* line 13, src/styles/layouts/_story-card.scss */\n\n.story-title {\n  letter-spacing: -.028em;\n  line-height: 24px !important;\n}\n\n/* line 18, src/styles/layouts/_story-card.scss */\n\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 60px;\n  line-height: 20px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n\n/* line 29, src/styles/layouts/_story-card.scss */\n\n.story-tag i {\n  color: rgba(0, 0, 0, 0.3) !important;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 5px;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 39, src/styles/layouts/_story-card.scss */\n\n  .story--260 .story-wrap {\n    height: 260px;\n  }\n\n  /* line 40, src/styles/layouts/_story-card.scss */\n\n  .story--260 .story-image {\n    height: 100px;\n  }\n\n  /* line 42, src/styles/layouts/_story-card.scss */\n\n  .story--260 .story-body {\n    height: 160px;\n  }\n\n  /* line 48, src/styles/layouts/_story-card.scss */\n\n  .story--200 .story-wrap {\n    height: 260px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n\n  /* line 50, src/styles/layouts/_story-card.scss */\n\n  .story--200 .story-body {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    height: 100%;\n  }\n\n  /* line 55, src/styles/layouts/_story-card.scss */\n\n  .story--200 .story-image {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    height: 100%;\n    width: 200px;\n  }\n}\n\n/* line 65, src/styles/layouts/_story-card.scss */\n\n.card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n/* line 73, src/styles/layouts/_story-card.scss */\n\n.card--p {\n  font-family: \"Merriweather\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n/* line 81, src/styles/layouts/_story-card.scss */\n\n.card-image {\n  max-height: 240px;\n  max-width: 360px;\n}\n\n/* line 88, src/styles/layouts/_story-card.scss */\n\n.card.card--large .card-body {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n/* line 90, src/styles/layouts/_story-card.scss */\n\n.card.card--large .card-image {\n  height: 200px;\n  margin-bottom: 20px;\n  margin-top: 5px;\n  max-width: 100%;\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1;\n}\n\n/* line 98, src/styles/layouts/_story-card.scss */\n\n.card.card--large .card-image--link {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 100%;\n}\n\n/* line 109, src/styles/layouts/_story-card.scss */\n\n.card.card--medium .card-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n}\n\n/* line 1, src/styles/layouts/_homepage.scss */\n\n.cover-lazy {\n  opacity: .5;\n  z-index: 2;\n}\n\n/* line 2, src/styles/layouts/_post.scss */\n\n.post-title {\n  line-height: 1.04;\n  font-weight: 600;\n}\n\n/* line 7, src/styles/layouts/_post.scss */\n\n.post-excerpt {\n  font-family: \"Merriweather\", serif;\n  font-size: 22px;\n  line-height: 1.5;\n  letter-spacing: -.022em;\n}\n\n/* line 20, src/styles/layouts/_post.scss */\n\n.postMetaInline {\n  letter-spacing: 0;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.54);\n  fill: rgba(0, 0, 0, 0.54);\n}\n\n/* line 31, src/styles/layouts/_post.scss */\n\n.post-body {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n/* line 36, src/styles/layouts/_post.scss */\n\n.post-body a {\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(50%, rgba(0, 0, 0, 0.6)), color-stop(50%, transparent));\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n/* line 44, src/styles/layouts/_post.scss */\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n/* line 51, src/styles/layouts/_post.scss */\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 600;\n  font-style: normal;\n}\n\n/* line 57, src/styles/layouts/_post.scss */\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n/* line 64, src/styles/layouts/_post.scss */\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n/* line 71, src/styles/layouts/_post.scss */\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n/* line 78, src/styles/layouts/_post.scss */\n\n.post-body p {\n  font-family: \"Merriweather\", serif;\n  font-size: 1.125rem;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.7;\n  margin-top: 25px;\n}\n\n/* line 87, src/styles/layouts/_post.scss */\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Merriweather\", serif;\n  font-size: 1.125rem;\n  margin-top: 30px;\n}\n\n/* line 94, src/styles/layouts/_post.scss */\n\n.post-body ul li,\n.post-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-bottom: 14px;\n  margin-left: 30px;\n}\n\n/* line 100, src/styles/layouts/_post.scss */\n\n.post-body ul li::before,\n.post-body ol li::before {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n/* line 111, src/styles/layouts/_post.scss */\n\n.post-body ul li::before {\n  content: '\\2022';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 3px;\n}\n\n/* line 118, src/styles/layouts/_post.scss */\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n/* line 124, src/styles/layouts/_post.scss */\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6,\n.post-body p,\n.post-body ol,\n.post-body ul,\n.post-body hr,\n.post-body pre,\n.post-body dl,\n.post-body blockquote,\n.post-body .kg-embed-card {\n  min-width: 100%;\n}\n\n/* line 129, src/styles/layouts/_post.scss */\n\n.post-body > ul {\n  margin-top: 35px;\n}\n\n/* line 131, src/styles/layouts/_post.scss */\n\n.post-body > iframe,\n.post-body > img,\n.post-body .kg-image-card,\n.post-body .kg-gallery-card,\n.post-body .kg-card,\n.post-body .kg-embed-card {\n  margin-top: 30px !important;\n}\n\n/* line 142, src/styles/layouts/_post.scss */\n\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n/* line 159, src/styles/layouts/_post.scss */\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n/* line 167, src/styles/layouts/_post.scss */\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n/* line 177, src/styles/layouts/_post.scss */\n\n.post-newsletter {\n  outline: 1px solid #f0f0f0 !important;\n  outline-offset: -1px;\n  border-radius: 2px;\n  padding: 40px 10px;\n}\n\n/* line 183, src/styles/layouts/_post.scss */\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n/* line 185, src/styles/layouts/_post.scss */\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n/* line 187, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n/* line 195, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n/* line 200, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n/* line 209, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n/* line 218, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n/* line 219, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n/* line 226, src/styles/layouts/_post.scss */\n\n.cardPost-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px;\n}\n\n/* line 235, src/styles/layouts/_post.scss */\n\n.cardPost-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n/* line 245, src/styles/layouts/_post.scss */\n\n.cardPost .u-card {\n  height: 296px;\n  margin-bottom: 20px;\n}\n\n/* line 253, src/styles/layouts/_post.scss */\n\n.sharePost {\n  left: -130px;\n  margin-top: 28px;\n  width: 65px;\n  position: absolute !important;\n}\n\n/* line 261, src/styles/layouts/_post.scss */\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n/* line 276, src/styles/layouts/_post.scss */\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n          box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transition: all 0.25s ease-in-out;\n  -o-transition: all 0.25s ease-in-out;\n  transition: all 0.25s ease-in-out;\n  z-index: 400;\n}\n\n/* line 291, src/styles/layouts/_post.scss */\n\n.postActions.is-visible {\n  -webkit-transform: translateY(100%);\n       -o-transform: translateY(100%);\n          transform: translateY(100%);\n}\n\n/* line 298, src/styles/layouts/_post.scss */\n\n.postActions-wrap {\n  max-width: 1200px;\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n/* line 304, src/styles/layouts/_post.scss */\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n/* line 312, src/styles/layouts/_post.scss */\n\n.nextPost {\n  max-width: 260px;\n}\n\n/* line 318, src/styles/layouts/_post.scss */\n\n.kg-gallery-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  max-width: 100%;\n  width: 100%;\n}\n\n/* line 325, src/styles/layouts/_post.scss */\n\n.kg-gallery-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n/* line 331, src/styles/layouts/_post.scss */\n\n.kg-gallery-image img {\n  display: block;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/* line 338, src/styles/layouts/_post.scss */\n\n.kg-gallery-row:not(:first-of-type) {\n  margin: 0.75em 0 0 0;\n}\n\n/* line 342, src/styles/layouts/_post.scss */\n\n.kg-gallery-image:not(:first-of-type) {\n  margin: 0 0 0 0.75em;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 348, src/styles/layouts/_post.scss */\n\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px;\n  }\n\n  /* line 353, src/styles/layouts/_post.scss */\n\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px;\n  }\n\n  /* line 358, src/styles/layouts/_post.scss */\n\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px;\n  }\n\n  /* line 363, src/styles/layouts/_post.scss */\n\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important;\n  }\n\n  /* line 369, src/styles/layouts/_post.scss */\n\n  .post-body > p:first-of-type::first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px;\n  }\n\n  /* line 376, src/styles/layouts/_post.scss */\n\n  .post-body ol,\n  .post-body ul,\n  .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n\n  /* line 382, src/styles/layouts/_post.scss */\n\n  .post-body iframe {\n    width: 100% !important;\n  }\n\n  /* line 386, src/styles/layouts/_post.scss */\n\n  .post-related {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n}\n\n/* line 1, src/styles/layouts/_author.scss */\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n/* line 6, src/styles/layouts/_author.scss */\n\n.author-avatar {\n  height: 80px;\n  width: 80px;\n}\n\n/* line 11, src/styles/layouts/_author.scss */\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n/* line 20, src/styles/layouts/_author.scss */\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n/* line 22, src/styles/layouts/_author.scss */\n\n.author-bio {\n  max-width: 600px;\n}\n\n/* line 25, src/styles/layouts/_author.scss */\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n/* line 29, src/styles/layouts/_author.scss */\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n/* line 31, src/styles/layouts/_author.scss */\n\n.author.has--image .u-accentColor--iconNormal {\n  fill: #fff;\n}\n\n/* line 33, src/styles/layouts/_author.scss */\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n/* line 36, src/styles/layouts/_author.scss */\n\n.author.has--image .author-follow a {\n  border: 2px solid;\n  border-color: rgba(255, 255, 255, 0.5) !important;\n  font-size: 16px;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 44, src/styles/layouts/_author.scss */\n\n  .author-meta span {\n    display: block;\n  }\n\n  /* line 45, src/styles/layouts/_author.scss */\n\n  .author-header {\n    display: block;\n  }\n\n  /* line 46, src/styles/layouts/_author.scss */\n\n  .author-avatar {\n    margin: 0 auto 20px;\n  }\n}\n\n/* line 3, src/styles/layouts/_search.scss */\n\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999;\n}\n\n/* line 13, src/styles/layouts/_search.scss */\n\n.search-form {\n  max-width: 680px;\n  margin-top: 80px;\n}\n\n/* line 17, src/styles/layouts/_search.scss */\n\n.search-form::before {\n  background: #eee;\n  bottom: 0;\n  content: '';\n  display: block;\n  height: 2px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n/* line 29, src/styles/layouts/_search.scss */\n\n.search-form input {\n  border: none;\n  display: block;\n  line-height: 40px;\n  padding-bottom: 8px;\n}\n\n/* line 35, src/styles/layouts/_search.scss */\n\n.search-form input:focus {\n  outline: 0;\n}\n\n/* line 40, src/styles/layouts/_search.scss */\n\n.search-results {\n  max-height: calc(90% - 100px);\n  max-width: 680px;\n  overflow: auto;\n}\n\n/* line 45, src/styles/layouts/_search.scss */\n\n.search-results a {\n  border-bottom: 1px solid #eee;\n  padding: 12px 0;\n}\n\n/* line 49, src/styles/layouts/_search.scss */\n\n.search-results a:hover {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n/* line 54, src/styles/layouts/_search.scss */\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px;\n}\n\n/* line 60, src/styles/layouts/_search.scss */\n\nbody.is-search {\n  overflow: hidden;\n}\n\n/* line 63, src/styles/layouts/_search.scss */\n\nbody.is-search .search {\n  bottom: 0 !important;\n  height: 100%;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  transition: all .3s;\n  visibility: visible;\n}\n\n/* line 2, src/styles/layouts/_sidebar.scss */\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n/* line 10, src/styles/layouts/_sidebar.scss */\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Merriweather\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n/* line 22, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n/* line 23, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n/* line 25, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n/* line 29, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post--link {\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.09);\n  -webkit-box-shadow: 0 1px 7px rgba(0, 0, 0, 0.09);\n          box-shadow: 0 1px 7px rgba(0, 0, 0, 0.09);\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n/* line 36, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n/* line 2, src/styles/layouts/_sidenav.scss */\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  -webkit-transition: 0.4s;\n  -o-transition: 0.4s;\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n/* line 13, src/styles/layouts/_sidenav.scss */\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n/* line 15, src/styles/layouts/_sidenav.scss */\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n/* line 22, src/styles/layouts/_sidenav.scss */\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n/* line 28, src/styles/layouts/_sidenav.scss */\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n/* line 32, src/styles/layouts/_sidenav.scss */\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n/* line 4, src/styles/layouts/helper.scss */\n\n.simply-follow:hover .simply-hover-hidden {\n  display: none !important;\n}\n\n/* line 5, src/styles/layouts/helper.scss */\n\n.simply-follow:hover .simply-hover-show {\n  display: inline-block !important;\n}\n\n/* line 8, src/styles/layouts/helper.scss */\n\n.simply-follow-btn {\n  height: 19px;\n  line-height: 17px;\n  padding: 0 10px;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 19, src/styles/layouts/helper.scss */\n\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  }\n\n  /* line 24, src/styles/layouts/helper.scss */\n\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff;\n  }\n\n  /* line 26, src/styles/layouts/helper.scss */\n\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -56px;\n  }\n\n  /* line 30, src/styles/layouts/helper.scss */\n\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 100px;\n  }\n\n  /* line 38, src/styles/layouts/helper.scss */\n\n  .is-article .post-header {\n    padding-top: 35px;\n  }\n\n  /* line 39, src/styles/layouts/helper.scss */\n\n  .is-article .post-body {\n    margin-top: 30px;\n  }\n\n  /* line 41, src/styles/layouts/helper.scss */\n\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px;\n  }\n}\n\n/* line 1, src/styles/layouts/subscribe.scss */\n\n.is-subscribe .footer {\n  background-color: #f0f0f0;\n}\n\n/* line 5, src/styles/layouts/subscribe.scss */\n\n.subscribe {\n  min-height: 80vh !important;\n  height: 100%;\n  background-color: #f0f0f0 !important;\n}\n\n/* line 10, src/styles/layouts/subscribe.scss */\n\n.subscribe-card {\n  background-color: #D7EFEE;\n  -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);\n          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  width: 900px;\n  height: 550px;\n  padding: 50px;\n  margin: 5px;\n}\n\n/* line 20, src/styles/layouts/subscribe.scss */\n\n.subscribe form {\n  max-width: 300px;\n}\n\n/* line 24, src/styles/layouts/subscribe.scss */\n\n.subscribe-form {\n  height: 100%;\n}\n\n/* line 28, src/styles/layouts/subscribe.scss */\n\n.subscribe-input {\n  background: 0 0;\n  border: 0;\n  border-bottom: 1px solid #cc5454;\n  border-radius: 0;\n  padding: 7px 5px;\n  height: 45px;\n  outline: 0;\n  font-family: \"Source Sans Pro\", sans-serif;\n}\n\n/* line 38, src/styles/layouts/subscribe.scss */\n\n.subscribe-input::-webkit-input-placeholder {\n  color: #cc5454;\n}\n\n.subscribe-input:-ms-input-placeholder {\n  color: #cc5454;\n}\n\n.subscribe-input::-ms-input-placeholder {\n  color: #cc5454;\n}\n\n.subscribe-input::placeholder {\n  color: #cc5454;\n}\n\n/* line 43, src/styles/layouts/subscribe.scss */\n\n.subscribe .button {\n  background: #029e74;\n  border-color: #029e74;\n  color: #fff;\n  -webkit-box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  font-size: 17px !important;\n}\n\n/* line 51, src/styles/layouts/subscribe.scss */\n\n.subscribe .main-error {\n  color: #cc5454;\n  font-size: 16px;\n  margin-top: 15px;\n}\n\n/* line 60, src/styles/layouts/subscribe.scss */\n\n.subscribe-success .subscribe-card {\n  background-color: #E8F3EC;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 66, src/styles/layouts/subscribe.scss */\n\n  .subscribe-card {\n    height: auto;\n    width: auto;\n  }\n}\n\n", "", {"version":3,"sources":["C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/main.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/common/_mixins.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/main.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/node_modules/normalize.css/normalize.css","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/node_modules/prismjs/themes/prism.css","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/lib/_zoom.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/common/_global.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/common/_typography.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/common/_utilities.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/components/_grid.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/components/_form.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/components/_icons.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/components/_animated.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/_header.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/_story-card.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/_homepage.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/_post.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/_author.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/_search.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/_sidebar.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/_sidenav.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/helper.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/layouts/subscribe.scss"],"names":[],"mappings":"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7DA;EACE,iBAAA;CT42FD;;AF/6BD,gDAAA;;AW37DA;EACE,iBAAA;CT+2FD;;AFj7BD,gDAAA;;AW57DA;EACE,iBAAA;CTk3FD;;AFn7BD,gDAAA;;AW77DA;EACE,iBAAA;CTq3FD;;AFr7BD,gDAAA;;AW97DA;EACE,iBAAA;CTw3FD;;AFv7BD,gDAAA;;AW/7DA;EACE,iBAAA;CT23FD;;AFz7BD,gDAAA;;AWh8DA;EACE,iBAAA;CT83FD;;AF37BD,gDAAA;;AWj8DA;EACE,iBAAA;CTi4FD;;AF77BD,gDAAA;;AWl8DA;EACE,iBAAA;CTo4FD;;AF/7BD,gDAAA;;AWn8DA;EACE,iBAAA;CTu4FD;;AFj8BD,gDAAA;;AWp8DA;EACE,iBAAA;CT04FD;;AFn8BD,gDAAA;;AWr8DA;EACE,iBAAA;CT64FD;;AFr8BD,gDAAA;;AWt8DA;EACE,iBAAA;CTg5FD;;AFv8BD,gDAAA;;AWv8DA;EACE,iBAAA;CTm5FD;;AFz8BD,gDAAA;;AWx8DA;EACE,iBAAA;CTs5FD;;AF38BD,gDAAA;;AWz8DA;EACE,iBAAA;CTy5FD;;AF78BD,gDAAA;;AW18DA;EACE,iBAAA;CT45FD;;AF/8BD,gDAAA;;AW38DA;EACE,iBAAA;CT+5FD;;AFj9BD,gDAAA;;AW58DA;EACE,iBAAA;CTk6FD;;AFn9BD,gDAAA;;AW78DA;EACE,iBAAA;CTq6FD;;AFr9BD,iDAAA;;AW98DA;EACE,iBAAA;CTw6FD;;AFv9BD,iDAAA;;AW/8DA;EACE,iBAAA;CT26FD;;AFz9BD,iDAAA;;AWh9DA;EACE,iBAAA;CT86FD;;AF39BD,iDAAA;;AWj9DA;EACE,iBAAA;CTi7FD;;AF79BD,iDAAA;;AWl9DA;EACE,iBAAA;CTo7FD;;AF/9BD,iDAAA;;AWn9DA;EACE,iBAAA;CTu7FD;;AFj+BD,iDAAA;;AWp9DA;EACE,iBAAA;CT07FD;;AFn+BD,iDAAA;;AWr9DA;EACE,iBAAA;CT67FD;;AFr+BD,iDAAA;;AWt9DA;EACE,iBAAA;CTg8FD;;AFv+BD,iDAAA;;AWv9DA;EACE,iBAAA;CTm8FD;;AFz+BD,kDAAA;;AYx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","file":"main.scss","sourcesContent":["@charset \"UTF-8\";\n/* line 1, src/styles/common/_mixins.scss */\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none; }\n\n/* line 7, src/styles/common/_mixins.scss */\n.link--accent {\n  color: #00A034;\n  text-decoration: none; }\n\n/* line 22, src/styles/common/_mixins.scss */\n.u-absolute0, .post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n/* line 30, src/styles/common/_mixins.scss */\n.tag.not--image, .footer a:hover, .footer .follow a, .u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important; }\n\n/* line 35, src/styles/common/_mixins.scss */\n.warning::before, .note::before, .success::before, [class^=\"i-\"]::before, [class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* line 12, node_modules/normalize.css/normalize.css */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\n/* line 25, node_modules/normalize.css/normalize.css */\nbody {\n  margin: 0; }\n\n/**\n * Add the correct display in IE 9-.\n */\n/* line 33, node_modules/normalize.css/normalize.css */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n/* line 47, node_modules/normalize.css/normalize.css */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n/* line 60, node_modules/normalize.css/normalize.css */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\n/* line 70, node_modules/normalize.css/normalize.css */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n/* line 79, node_modules/normalize.css/normalize.css */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n/* line 90, node_modules/normalize.css/normalize.css */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n/* line 103, node_modules/normalize.css/normalize.css */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n/* line 113, node_modules/normalize.css/normalize.css */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n/* line 123, node_modules/normalize.css/normalize.css */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n/* line 132, node_modules/normalize.css/normalize.css */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n/* line 142, node_modules/normalize.css/normalize.css */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n/* line 153, node_modules/normalize.css/normalize.css */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\n/* line 161, node_modules/normalize.css/normalize.css */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\n/* line 170, node_modules/normalize.css/normalize.css */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n/* line 179, node_modules/normalize.css/normalize.css */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\n/* line 187, node_modules/normalize.css/normalize.css */\nsub {\n  bottom: -0.25em; }\n\n/* line 191, node_modules/normalize.css/normalize.css */\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\n/* line 202, node_modules/normalize.css/normalize.css */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\n/* line 211, node_modules/normalize.css/normalize.css */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n/* line 220, node_modules/normalize.css/normalize.css */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\n/* line 228, node_modules/normalize.css/normalize.css */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n/* line 240, node_modules/normalize.css/normalize.css */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n/* line 256, node_modules/normalize.css/normalize.css */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n/* line 266, node_modules/normalize.css/normalize.css */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n/* line 277, node_modules/normalize.css/normalize.css */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n/* line 288, node_modules/normalize.css/normalize.css */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n/* line 300, node_modules/normalize.css/normalize.css */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\n/* line 311, node_modules/normalize.css/normalize.css */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n/* line 322, node_modules/normalize.css/normalize.css */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n/* line 336, node_modules/normalize.css/normalize.css */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n/* line 345, node_modules/normalize.css/normalize.css */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n/* line 354, node_modules/normalize.css/normalize.css */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n/* line 364, node_modules/normalize.css/normalize.css */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n/* line 374, node_modules/normalize.css/normalize.css */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n/* line 383, node_modules/normalize.css/normalize.css */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n/* line 393, node_modules/normalize.css/normalize.css */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n/* line 406, node_modules/normalize.css/normalize.css */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\n/* line 415, node_modules/normalize.css/normalize.css */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\n/* line 426, node_modules/normalize.css/normalize.css */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\n/* line 434, node_modules/normalize.css/normalize.css */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n/* line 445, node_modules/normalize.css/normalize.css */\n[hidden] {\n  display: none; }\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n/* line 7, node_modules/prismjs/themes/prism.css */\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none; }\n\n/* line 30, node_modules/prismjs/themes/prism.css */\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc; }\n\n/* line 36, node_modules/prismjs/themes/prism.css */\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc; }\n\n@media print {\n  /* line 43, node_modules/prismjs/themes/prism.css */\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none; } }\n\n/* Code blocks */\n/* line 50, node_modules/prismjs/themes/prism.css */\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto; }\n\n/* line 56, node_modules/prismjs/themes/prism.css */\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0; }\n\n/* Inline code */\n/* line 62, node_modules/prismjs/themes/prism.css */\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal; }\n\n/* line 68, node_modules/prismjs/themes/prism.css */\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray; }\n\n/* line 75, node_modules/prismjs/themes/prism.css */\n.token.punctuation {\n  color: #999; }\n\n/* line 79, node_modules/prismjs/themes/prism.css */\n.namespace {\n  opacity: .7; }\n\n/* line 83, node_modules/prismjs/themes/prism.css */\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905; }\n\n/* line 93, node_modules/prismjs/themes/prism.css */\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690; }\n\n/* line 102, node_modules/prismjs/themes/prism.css */\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #9a6e3a;\n  background: rgba(255, 255, 255, 0.5); }\n\n/* line 111, node_modules/prismjs/themes/prism.css */\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a; }\n\n/* line 117, node_modules/prismjs/themes/prism.css */\n.token.function,\n.token.class-name {\n  color: #DD4A68; }\n\n/* line 122, node_modules/prismjs/themes/prism.css */\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90; }\n\n/* line 128, node_modules/prismjs/themes/prism.css */\n.token.important,\n.token.bold {\n  font-weight: bold; }\n\n/* line 132, node_modules/prismjs/themes/prism.css */\n.token.italic {\n  font-style: italic; }\n\n/* line 136, node_modules/prismjs/themes/prism.css */\n.token.entity {\n  cursor: help; }\n\n/* line 2, src/styles/lib/_zoom.scss */\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in; }\n\n/* line 5, src/styles/lib/_zoom.scss */\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms; }\n\n/* line 13, src/styles/lib/_zoom.scss */\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out; }\n\n/* line 18, src/styles/lib/_zoom.scss */\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms; }\n\n/* line 33, src/styles/lib/_zoom.scss */\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1; }\n\n/* line 37, src/styles/lib/_zoom.scss */\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default; }\n\n/* line 2, src/styles/common/_global.scss */\n*, *::before, *::after {\n  box-sizing: border-box; }\n\n/* line 6, src/styles/common/_global.scss */\na {\n  color: inherit;\n  text-decoration: none; }\n  /* line 10, src/styles/common/_global.scss */\n  a:active, a:hover {\n    outline: 0; }\n\n/* line 16, src/styles/common/_global.scss */\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  color: #000;\n  font-family: \"Merriweather\", serif;\n  font-size: 1.1875rem;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.7;\n  margin: 30px 0 0 -23px;\n  padding-bottom: 2px;\n  padding-left: 20px; }\n  /* line 29, src/styles/common/_global.scss */\n  blockquote p:first-of-type {\n    margin-top: 0; }\n\n/* line 32, src/styles/common/_global.scss */\nbody {\n  color: rgba(0, 0, 0, 0.84);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility; }\n\n/* line 45, src/styles/common/_global.scss */\nhtml {\n  box-sizing: border-box;\n  font-size: 16px; }\n\n/* line 50, src/styles/common/_global.scss */\nfigure {\n  margin: 0; }\n\n/* line 54, src/styles/common/_global.scss */\nfigcaption {\n  color: rgba(0, 0, 0, 0.68);\n  display: block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-feature-settings: \"liga\" on, \"lnum\" on;\n  font-size: 15px;\n  font-style: normal;\n  font-weight: 400;\n  left: 0;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin-top: 10px;\n  outline: 0;\n  position: relative;\n  text-align: center;\n  top: 0;\n  width: 100%; }\n\n/* line 75, src/styles/common/_global.scss */\nkbd, samp, code {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap; }\n\n/* line 85, src/styles/common/_global.scss */\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal; }\n  /* line 97, src/styles/common/_global.scss */\n  pre code {\n    background: transparent;\n    color: #37474f;\n    padding: 0;\n    text-shadow: 0 1px #fff; }\n\n/* line 105, src/styles/common/_global.scss */\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: #37474f;\n  line-height: 1.4; }\n  /* line 110, src/styles/common/_global.scss */\n  code[class*=language-] .token.comment,\n  pre[class*=language-] .token.comment {\n    opacity: .8; }\n\n/* line 115, src/styles/common/_global.scss */\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center; }\n  /* line 121, src/styles/common/_global.scss */\n  hr::before {\n    color: rgba(0, 0, 0, 0.6);\n    content: '...';\n    display: inline-block;\n    font-family: \"Source Sans Pro\", sans-serif;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -25px; }\n\n/* line 134, src/styles/common/_global.scss */\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto; }\n  /* line 140, src/styles/common/_global.scss */\n  img:not([src]) {\n    visibility: hidden; }\n\n/* line 145, src/styles/common/_global.scss */\ni {\n  vertical-align: middle; }\n\n/* line 150, src/styles/common/_global.scss */\nol, ul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0; }\n\n/* line 157, src/styles/common/_global.scss */\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8); }\n\n/* line 163, src/styles/common/_global.scss */\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left; }\n  /* line 175, src/styles/common/_global.scss */\n  q::before, q::after {\n    display: none; }\n\n/* line 185, src/styles/common/_global.scss */\n.link--underline:active, .link--underline:focus, .link--underline:hover {\n  color: inherit;\n  text-decoration: underline; }\n\n/* line 195, src/styles/common/_global.scss */\n.main,\n.footer {\n  transition: transform .5s ease; }\n\n@media only screen and (max-width: 766px) {\n  /* line 199, src/styles/common/_global.scss */\n  .main {\n    overflow: hidden;\n    padding-top: 50px; }\n  /* line 204, src/styles/common/_global.scss */\n  .feed-entry-content {\n    padding-left: 20px;\n    padding-right: 20px;\n    overflow: hidden; }\n  /* line 210, src/styles/common/_global.scss */\n  blockquote {\n    margin-left: -5px; } }\n\n/* line 215, src/styles/common/_global.scss */\n.warning {\n  background: #fbe9e7;\n  color: #d50000; }\n  /* line 218, src/styles/common/_global.scss */\n  .warning::before {\n    content: \"\"; }\n\n/* line 221, src/styles/common/_global.scss */\n.note {\n  background: #e1f5fe;\n  color: #0288d1; }\n  /* line 224, src/styles/common/_global.scss */\n  .note::before {\n    content: \"\"; }\n\n/* line 227, src/styles/common/_global.scss */\n.success {\n  background: #e0f2f1;\n  color: #00897b; }\n  /* line 230, src/styles/common/_global.scss */\n  .success::before {\n    color: #00bfa5;\n    content: \"\"; }\n\n/* line 233, src/styles/common/_global.scss */\n.warning, .note, .success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px; }\n  /* line 240, src/styles/common/_global.scss */\n  .warning a, .note a, .success a {\n    color: inherit;\n    text-decoration: underline; }\n  /* line 245, src/styles/common/_global.scss */\n  .warning::before, .note::before, .success::before {\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n    margin-top: -5px; }\n\n/* line 257, src/styles/common/_global.scss */\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2; }\n  /* line 262, src/styles/common/_global.scss */\n  .tag-wrap {\n    z-index: 2; }\n  /* line 264, src/styles/common/_global.scss */\n  .tag.not--image {\n    min-height: auto; }\n  /* line 270, src/styles/common/_global.scss */\n  .tag-description {\n    max-width: 500px; }\n\n/* line 277, src/styles/common/_global.scss */\n.with-tooltip {\n  overflow: visible;\n  position: relative; }\n  /* line 281, src/styles/common/_global.scss */\n  .with-tooltip::after {\n    background: rgba(0, 0, 0, 0.85);\n    border-radius: 4px;\n    color: #fff;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 130px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1; }\n  /* line 303, src/styles/common/_global.scss */\n  .with-tooltip:hover::after {\n    animation: tooltip .1s ease-out both; }\n\n/* line 310, src/styles/common/_global.scss */\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n  padding-bottom: 45px; }\n  /* line 314, src/styles/common/_global.scss */\n  .footer a {\n    color: rgba(0, 0, 0, 0.6); }\n  /* line 319, src/styles/common/_global.scss */\n  .footer .follow {\n    display: block !important;\n    text-align: center; }\n    /* line 323, src/styles/common/_global.scss */\n    .footer .follow a {\n      padding: 0 7px; }\n      /* line 328, src/styles/common/_global.scss */\n      .footer .follow a:hover {\n        color: rgba(0, 0, 0, 0.6) !important; }\n\n/* line 336, src/styles/common/_global.scss */\n.instagram-hover {\n  background-color: rgba(0, 0, 0, 0.3);\n  opacity: 0; }\n\n/* line 342, src/styles/common/_global.scss */\n.instagram-img {\n  height: 264px; }\n  /* line 345, src/styles/common/_global.scss */\n  .instagram-img:hover > .instagram-hover {\n    opacity: 1; }\n\n/* line 348, src/styles/common/_global.scss */\n.instagram-name {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10; }\n  /* line 355, src/styles/common/_global.scss */\n  .instagram-name a {\n    background-color: #fff;\n    color: #000 !important;\n    font-size: 20px !important;\n    font-weight: 600 !important;\n    min-width: 200px;\n    padding-left: 10px !important;\n    padding-right: 10px !important;\n    text-align: center !important; }\n\n/* line 367, src/styles/common/_global.scss */\n.instagram-col {\n  padding: 0 !important;\n  margin: 0 !important; }\n\n/* line 375, src/styles/common/_global.scss */\n.errorPage {\n  font-family: 'Roboto Mono', monospace; }\n  /* line 378, src/styles/common/_global.scss */\n  .errorPage-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px; }\n  /* line 384, src/styles/common/_global.scss */\n  .errorPage-text {\n    margin-top: 60px;\n    white-space: pre-wrap; }\n  /* line 389, src/styles/common/_global.scss */\n  .errorPage-wrap {\n    color: rgba(0, 0, 0, 0.4);\n    padding: 7vw 4vw; }\n\n/* line 397, src/styles/common/_global.scss */\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%; }\n  /* line 406, src/styles/common/_global.scss */\n  .video-responsive iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  /* line 416, src/styles/common/_global.scss */\n  .video-responsive video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n\n/* line 427, src/styles/common/_global.scss */\n.kg-embed-card .video-responsive {\n  margin-top: 0; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-facebook {\n  color: #3b5998 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-facebook, .sideNav-follow .i-facebook {\n  background-color: #3b5998 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-twitter {\n  color: #55acee !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-twitter, .sideNav-follow .i-twitter {\n  background-color: #55acee !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-google {\n  color: #dd4b39 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-google, .sideNav-follow .i-google {\n  background-color: #dd4b39 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-instagram {\n  color: #306088 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-instagram, .sideNav-follow .i-instagram {\n  background-color: #306088 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-youtube {\n  color: #e52d27 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-youtube, .sideNav-follow .i-youtube {\n  background-color: #e52d27 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-github {\n  color: #555 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-github, .sideNav-follow .i-github {\n  background-color: #555 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-linkedin {\n  color: #007bb6 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-linkedin, .sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-spotify {\n  color: #2ebd59 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-spotify, .sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-codepen {\n  color: #222 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-codepen, .sideNav-follow .i-codepen {\n  background-color: #222 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-behance {\n  color: #131418 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-behance, .sideNav-follow .i-behance {\n  background-color: #131418 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-dribbble {\n  color: #ea4c89 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-dribbble, .sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-flickr {\n  color: #0063dc !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-flickr, .sideNav-follow .i-flickr {\n  background-color: #0063dc !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-reddit {\n  color: #ff4500 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-reddit, .sideNav-follow .i-reddit {\n  background-color: #ff4500 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-pocket {\n  color: #f50057 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-pocket, .sideNav-follow .i-pocket {\n  background-color: #f50057 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-pinterest {\n  color: #bd081c !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-pinterest, .sideNav-follow .i-pinterest {\n  background-color: #bd081c !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-whatsapp {\n  color: #64d448 !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-whatsapp, .sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important; }\n\n/* line 432, src/styles/common/_global.scss */\n.c-telegram {\n  color: #08c !important; }\n\n/* line 433, src/styles/common/_global.scss */\n.bg-telegram, .sideNav-follow .i-telegram {\n  background-color: #08c !important; }\n\n/* line 456, src/styles/common/_global.scss */\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888; }\n  /* line 464, src/styles/common/_global.scss */\n  .rocket:hover svg path {\n    fill: rgba(0, 0, 0, 0.6); }\n\n/* line 469, src/styles/common/_global.scss */\n.svgIcon {\n  display: inline-block; }\n\n/* line 473, src/styles/common/_global.scss */\nsvg {\n  height: auto;\n  width: 100%; }\n\n/* line 480, src/styles/common/_global.scss */\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center; }\n\n/* line 489, src/styles/common/_global.scss */\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800; }\n\n/* line 501, src/styles/common/_global.scss */\n.is-loading .loadingBar {\n  animation: loading-bar 1s ease-in-out infinite;\n  animation-delay: .8s;\n  display: block; }\n\n/* line 3, src/styles/common/_typography.scss */\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0; }\n  /* line 11, src/styles/common/_typography.scss */\n  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,\n  .h1 a, .h2 a, .h3 a, .h4 a, .h5 a, .h6 a {\n    color: inherit;\n    line-height: inherit; }\n\n/* line 17, src/styles/common/_typography.scss */\nh1 {\n  font-size: 2.25rem; }\n\n/* line 18, src/styles/common/_typography.scss */\nh2 {\n  font-size: 1.875rem; }\n\n/* line 19, src/styles/common/_typography.scss */\nh3 {\n  font-size: 1.5625rem; }\n\n/* line 20, src/styles/common/_typography.scss */\nh4 {\n  font-size: 1.375rem; }\n\n/* line 21, src/styles/common/_typography.scss */\nh5 {\n  font-size: 1.125rem; }\n\n/* line 22, src/styles/common/_typography.scss */\nh6 {\n  font-size: 1rem; }\n\n/* line 27, src/styles/common/_typography.scss */\n.h1 {\n  font-size: 2.25rem; }\n\n/* line 28, src/styles/common/_typography.scss */\n.h2 {\n  font-size: 1.875rem; }\n\n/* line 29, src/styles/common/_typography.scss */\n.h3 {\n  font-size: 1.5625rem; }\n\n/* line 30, src/styles/common/_typography.scss */\n.h4 {\n  font-size: 1.375rem; }\n\n/* line 31, src/styles/common/_typography.scss */\n.h5 {\n  font-size: 1.125rem; }\n\n/* line 32, src/styles/common/_typography.scss */\n.h6 {\n  font-size: 1rem; }\n\n/* line 34, src/styles/common/_typography.scss */\np {\n  margin: 0; }\n\n/* line 2, src/styles/common/_utilities.scss */\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.54) !important;\n  fill: rgba(0, 0, 0, 0.54) !important; }\n\n/* line 9, src/styles/common/_utilities.scss */\n.u-textColorWhite {\n  color: #fff !important;\n  fill: #fff !important; }\n\n/* line 14, src/styles/common/_utilities.scss */\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6); }\n\n/* line 19, src/styles/common/_utilities.scss */\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034; }\n\n/* line 25, src/styles/common/_utilities.scss */\n.u-bgColor {\n  background-color: #00A034; }\n\n/* line 27, src/styles/common/_utilities.scss */\n.u-headerColorLink a {\n  color: #BBF1B9; }\n  /* line 31, src/styles/common/_utilities.scss */\n  .u-headerColorLink a.active, .u-headerColorLink a:hover {\n    color: #EEFFEA; }\n\n/* line 41, src/styles/common/_utilities.scss */\n.u-relative {\n  position: relative; }\n\n/* line 42, src/styles/common/_utilities.scss */\n.u-absolute {\n  position: absolute; }\n\n/* line 44, src/styles/common/_utilities.scss */\n.u-fixed {\n  position: fixed !important; }\n\n/* line 46, src/styles/common/_utilities.scss */\n.u-block {\n  display: block !important; }\n\n/* line 47, src/styles/common/_utilities.scss */\n.u-inlineBlock {\n  display: inline-block; }\n\n/* line 50, src/styles/common/_utilities.scss */\n.u-backgroundDark {\n  background-color: #000;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1; }\n\n/* line 62, src/styles/common/_utilities.scss */\n.u-backgroundWhite {\n  background-color: #fafafa; }\n\n/* line 63, src/styles/common/_utilities.scss */\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important; }\n\n/* line 67, src/styles/common/_utilities.scss */\n.u-clear::before, .row::before, .u-clear::after, .row::after {\n  content: \" \";\n  display: table; }\n\n/* line 72, src/styles/common/_utilities.scss */\n.u-clear::after, .row::after {\n  clear: both; }\n\n/* line 76, src/styles/common/_utilities.scss */\n.u-fontSize13 {\n  font-size: 13px !important; }\n\n/* line 77, src/styles/common/_utilities.scss */\n.u-fontSize14 {\n  font-size: 14px; }\n\n/* line 78, src/styles/common/_utilities.scss */\n.u-fontSize15 {\n  font-size: 15px !important; }\n\n/* line 79, src/styles/common/_utilities.scss */\n.u-fontSize20 {\n  font-size: 20px; }\n\n/* line 80, src/styles/common/_utilities.scss */\n.u-fontSize21 {\n  font-size: 21px; }\n\n/* line 81, src/styles/common/_utilities.scss */\n.u-fontSize22 {\n  font-size: 22px; }\n\n/* line 82, src/styles/common/_utilities.scss */\n.u-fontSize28 {\n  font-size: 28px !important; }\n\n/* line 83, src/styles/common/_utilities.scss */\n.u-fontSize36 {\n  font-size: 36px; }\n\n/* line 84, src/styles/common/_utilities.scss */\n.u-fontSize40 {\n  font-size: 40px; }\n\n/* line 85, src/styles/common/_utilities.scss */\n.u-fontSizeBase {\n  font-size: 18px; }\n\n/* line 86, src/styles/common/_utilities.scss */\n.u-fontSizeJumbo {\n  font-size: 50px; }\n\n/* line 87, src/styles/common/_utilities.scss */\n.u-fontSizeLarge {\n  font-size: 24px !important; }\n\n/* line 88, src/styles/common/_utilities.scss */\n.u-fontSizeLarger {\n  font-size: 32px; }\n\n/* line 89, src/styles/common/_utilities.scss */\n.u-fontSizeLargest {\n  font-size: 44px; }\n\n/* line 90, src/styles/common/_utilities.scss */\n.u-fontSizeMicro {\n  font-size: 11px; }\n\n/* line 91, src/styles/common/_utilities.scss */\n.u-fontSizeSmall {\n  font-size: 16px; }\n\n/* line 92, src/styles/common/_utilities.scss */\n.u-fontSizeSmaller {\n  font-size: 14px; }\n\n/* line 93, src/styles/common/_utilities.scss */\n.u-fontSizeSmallest {\n  font-size: 12px; }\n\n@media only screen and (max-width: 766px) {\n  /* line 96, src/styles/common/_utilities.scss */\n  .u-md-fontSizeBase {\n    font-size: 18px !important; }\n  /* line 97, src/styles/common/_utilities.scss */\n  .u-md-fontSizeLarger {\n    font-size: 32px; } }\n\n/* line 113, src/styles/common/_utilities.scss */\n.u-fontWeightThin {\n  font-weight: 300; }\n\n/* line 114, src/styles/common/_utilities.scss */\n.u-fontWeightNormal {\n  font-weight: 400; }\n\n/* line 116, src/styles/common/_utilities.scss */\n.u-fontWeightSemibold {\n  font-weight: 600 !important; }\n\n/* line 117, src/styles/common/_utilities.scss */\n.u-fontWeightBold {\n  font-weight: 700; }\n\n/* line 119, src/styles/common/_utilities.scss */\n.u-textUppercase {\n  text-transform: uppercase; }\n\n/* line 120, src/styles/common/_utilities.scss */\n.u-textCapitalize {\n  text-transform: capitalize; }\n\n/* line 121, src/styles/common/_utilities.scss */\n.u-textAlignCenter {\n  text-align: center; }\n\n/* line 123, src/styles/common/_utilities.scss */\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important; }\n\n/* line 130, src/styles/common/_utilities.scss */\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto; }\n\n/* line 131, src/styles/common/_utilities.scss */\n.u-marginTop20 {\n  margin-top: 20px; }\n\n/* line 132, src/styles/common/_utilities.scss */\n.u-marginTop30 {\n  margin-top: 30px; }\n\n/* line 133, src/styles/common/_utilities.scss */\n.u-marginBottom15 {\n  margin-bottom: 15px; }\n\n/* line 134, src/styles/common/_utilities.scss */\n.u-marginBottom20 {\n  margin-bottom: 20px !important; }\n\n/* line 135, src/styles/common/_utilities.scss */\n.u-marginBottom30 {\n  margin-bottom: 30px; }\n\n/* line 136, src/styles/common/_utilities.scss */\n.u-marginBottom40 {\n  margin-bottom: 40px; }\n\n/* line 139, src/styles/common/_utilities.scss */\n.u-padding0 {\n  padding: 0 !important; }\n\n/* line 140, src/styles/common/_utilities.scss */\n.u-padding20 {\n  padding: 20px; }\n\n/* line 141, src/styles/common/_utilities.scss */\n.u-padding15 {\n  padding: 15px !important; }\n\n/* line 142, src/styles/common/_utilities.scss */\n.u-paddingBottom2 {\n  padding-bottom: 2px; }\n\n/* line 143, src/styles/common/_utilities.scss */\n.u-paddingBottom30 {\n  padding-bottom: 30px; }\n\n/* line 144, src/styles/common/_utilities.scss */\n.u-paddingBottom20 {\n  padding-bottom: 20px; }\n\n/* line 145, src/styles/common/_utilities.scss */\n.u-paddingRight10 {\n  padding-right: 10px; }\n\n/* line 146, src/styles/common/_utilities.scss */\n.u-paddingLeft15 {\n  padding-left: 15px; }\n\n/* line 148, src/styles/common/_utilities.scss */\n.u-paddingTop2 {\n  padding-top: 2px; }\n\n/* line 149, src/styles/common/_utilities.scss */\n.u-paddingTop5 {\n  padding-top: 5px; }\n\n/* line 150, src/styles/common/_utilities.scss */\n.u-paddingTop10 {\n  padding-top: 10px; }\n\n/* line 151, src/styles/common/_utilities.scss */\n.u-paddingTop15 {\n  padding-top: 15px; }\n\n/* line 152, src/styles/common/_utilities.scss */\n.u-paddingTop20 {\n  padding-top: 20px; }\n\n/* line 153, src/styles/common/_utilities.scss */\n.u-paddingTop30 {\n  padding-top: 30px; }\n\n/* line 155, src/styles/common/_utilities.scss */\n.u-paddingBottom15 {\n  padding-bottom: 15px; }\n\n/* line 157, src/styles/common/_utilities.scss */\n.u-paddingRight20 {\n  padding-right: 20px; }\n\n/* line 158, src/styles/common/_utilities.scss */\n.u-paddingLeft20 {\n  padding-left: 20px; }\n\n/* line 160, src/styles/common/_utilities.scss */\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em; }\n\n/* line 168, src/styles/common/_utilities.scss */\n.u-lineHeight1 {\n  line-height: 1; }\n\n/* line 169, src/styles/common/_utilities.scss */\n.u-lineHeightTight {\n  line-height: 1.2; }\n\n/* line 172, src/styles/common/_utilities.scss */\n.u-overflowHidden {\n  overflow: hidden; }\n\n/* line 175, src/styles/common/_utilities.scss */\n.u-floatRight {\n  float: right; }\n\n/* line 176, src/styles/common/_utilities.scss */\n.u-floatLeft {\n  float: left; }\n\n/* line 179, src/styles/common/_utilities.scss */\n.u-flex {\n  display: flex; }\n\n/* line 180, src/styles/common/_utilities.scss */\n.u-flexCenter {\n  align-items: center;\n  display: flex; }\n\n/* line 182, src/styles/common/_utilities.scss */\n.u-flex1 {\n  flex: 1 1 auto; }\n\n/* line 183, src/styles/common/_utilities.scss */\n.u-flex0 {\n  flex: 0 0 auto; }\n\n/* line 184, src/styles/common/_utilities.scss */\n.u-flexWrap {\n  flex-wrap: wrap; }\n\n/* line 186, src/styles/common/_utilities.scss */\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n\n/* line 192, src/styles/common/_utilities.scss */\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end; }\n\n/* line 197, src/styles/common/_utilities.scss */\n.u-flexColumnTop {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start; }\n\n/* line 204, src/styles/common/_utilities.scss */\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover; }\n\n/* line 211, src/styles/common/_utilities.scss */\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px; }\n\n/* line 218, src/styles/common/_utilities.scss */\n.u-maxWidth1200 {\n  max-width: 1200px; }\n\n/* line 219, src/styles/common/_utilities.scss */\n.u-maxWidth1000 {\n  max-width: 1000px; }\n\n/* line 220, src/styles/common/_utilities.scss */\n.u-maxWidth740 {\n  max-width: 740px; }\n\n/* line 221, src/styles/common/_utilities.scss */\n.u-maxWidth1040 {\n  max-width: 1040px; }\n\n/* line 222, src/styles/common/_utilities.scss */\n.u-sizeFullWidth {\n  width: 100%; }\n\n/* line 225, src/styles/common/_utilities.scss */\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15); }\n\n/* line 226, src/styles/common/_utilities.scss */\n.u-round {\n  border-radius: 50%; }\n\n/* line 227, src/styles/common/_utilities.scss */\n.u-borderRadius2 {\n  border-radius: 2px; }\n\n/* line 229, src/styles/common/_utilities.scss */\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05); }\n\n/* line 234, src/styles/common/_utilities.scss */\n.u-height540 {\n  height: 540px; }\n\n/* line 235, src/styles/common/_utilities.scss */\n.u-height280 {\n  height: 280px; }\n\n/* line 236, src/styles/common/_utilities.scss */\n.u-height260 {\n  height: 260px; }\n\n/* line 237, src/styles/common/_utilities.scss */\n.u-height100 {\n  height: 100px; }\n\n/* line 238, src/styles/common/_utilities.scss */\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1); }\n\n/* line 241, src/styles/common/_utilities.scss */\n.u-hide {\n  display: none !important; }\n\n/* line 244, src/styles/common/_utilities.scss */\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px; }\n\n/* line 254, src/styles/common/_utilities.scss */\n.no-avatar {\n  background-image: url(\"../images/avatar.png\") !important; }\n\n@media only screen and (max-width: 766px) {\n  /* line 259, src/styles/common/_utilities.scss */\n  .u-hide-before-md {\n    display: none !important; }\n  /* line 260, src/styles/common/_utilities.scss */\n  .u-md-heightAuto {\n    height: auto; }\n  /* line 261, src/styles/common/_utilities.scss */\n  .u-md-height170 {\n    height: 170px; }\n  /* line 262, src/styles/common/_utilities.scss */\n  .u-md-relative {\n    position: relative; } }\n\n@media only screen and (max-width: 1000px) {\n  /* line 265, src/styles/common/_utilities.scss */\n  .u-hide-before-lg {\n    display: none !important; } }\n\n@media only screen and (min-width: 766px) {\n  /* line 268, src/styles/common/_utilities.scss */\n  .u-hide-after-md {\n    display: none !important; } }\n\n@media only screen and (min-width: 1000px) {\n  /* line 270, src/styles/common/_utilities.scss */\n  .u-hide-after-lg {\n    display: none !important; } }\n\n@media only screen and (min-width: 1000px) {\n  /* line 2, src/styles/components/_grid.scss */\n  .content {\n    max-width: calc(100% - 340px) !important; }\n  /* line 9, src/styles/components/_grid.scss */\n  .sidebar {\n    width: 340px !important; } }\n\n/* line 16, src/styles/components/_grid.scss */\n.row {\n  margin-left: -10px;\n  margin-right: -10px; }\n  /* line 22, src/styles/components/_grid.scss */\n  .row .col {\n    float: left;\n    padding-left: 10px;\n    padding-right: 10px; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s1 {\n      width: 8.33333%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s2 {\n      width: 16.66667%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s3 {\n      width: 25%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s4 {\n      width: 33.33333%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s5 {\n      width: 41.66667%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s6 {\n      width: 50%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s7 {\n      width: 58.33333%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s8 {\n      width: 66.66667%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s9 {\n      width: 75%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s10 {\n      width: 83.33333%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s11 {\n      width: 91.66667%; }\n    /* line 32, src/styles/components/_grid.scss */\n    .row .col.s12 {\n      width: 100%; }\n    @media only screen and (min-width: 766px) {\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m1 {\n        width: 8.33333%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m2 {\n        width: 16.66667%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m3 {\n        width: 25%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m4 {\n        width: 33.33333%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m5 {\n        width: 41.66667%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m6 {\n        width: 50%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m7 {\n        width: 58.33333%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m8 {\n        width: 66.66667%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m9 {\n        width: 75%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m10 {\n        width: 83.33333%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m11 {\n        width: 91.66667%; }\n      /* line 46, src/styles/components/_grid.scss */\n      .row .col.m12 {\n        width: 100%; } }\n    @media only screen and (min-width: 1000px) {\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l1 {\n        width: 8.33333%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l2 {\n        width: 16.66667%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l3 {\n        width: 25%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l4 {\n        width: 33.33333%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l5 {\n        width: 41.66667%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l6 {\n        width: 50%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l7 {\n        width: 58.33333%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l8 {\n        width: 66.66667%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l9 {\n        width: 75%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l10 {\n        width: 83.33333%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l11 {\n        width: 91.66667%; }\n      /* line 61, src/styles/components/_grid.scss */\n      .row .col.l12 {\n        width: 100%; } }\n\n/* line 1, src/styles/components/_form.scss */\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap; }\n  /* line 25, src/styles/components/_form.scss */\n  .button--chromeless {\n    border-radius: 0;\n    border-width: 0;\n    box-shadow: none;\n    color: rgba(0, 0, 0, 0.44);\n    height: auto;\n    line-height: inherit;\n    padding: 0;\n    text-align: left;\n    vertical-align: baseline;\n    white-space: normal; }\n    /* line 37, src/styles/components/_form.scss */\n    .button--chromeless:active, .button--chromeless:hover, .button--chromeless:focus {\n      border-width: 0;\n      color: rgba(0, 0, 0, 0.6); }\n  /* line 45, src/styles/components/_form.scss */\n  .button--large {\n    font-size: 15px;\n    height: 44px;\n    line-height: 42px;\n    padding: 0 18px; }\n  /* line 52, src/styles/components/_form.scss */\n  .button--dark {\n    border-color: rgba(0, 0, 0, 0.6);\n    color: rgba(0, 0, 0, 0.6); }\n    /* line 56, src/styles/components/_form.scss */\n    .button--dark:hover {\n      border-color: rgba(0, 0, 0, 0.8);\n      color: rgba(0, 0, 0, 0.8); }\n\n/* line 64, src/styles/components/_form.scss */\n.button--primary {\n  border-color: #00A034;\n  color: #00A034; }\n\n/* line 69, src/styles/components/_form.scss */\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0; }\n\n/* line 75, src/styles/components/_form.scss */\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle; }\n\n/* line 80, src/styles/components/_form.scss */\n.buttonSet > .button:last-child {\n  margin-right: 0; }\n\n/* line 84, src/styles/components/_form.scss */\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px; }\n\n/* line 89, src/styles/components/_form.scss */\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px; }\n\n/* line 95, src/styles/components/_form.scss */\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0; }\n\n/* line 99, src/styles/components/_form.scss */\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px; }\n\n/* line 104, src/styles/components/_form.scss */\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px; }\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"../fonts/simply.eot?25764j\");\n  src: url(\"../fonts/simply.eot?25764j#iefix\") format(\"embedded-opentype\"), url(\"../fonts/simply.ttf?25764j\") format(\"truetype\"), url(\"../fonts/simply.woff?25764j\") format(\"woff\"), url(\"../fonts/simply.svg?25764j#simply\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n/* line 18, src/styles/components/_icons.scss */\n.i-audio:before {\n  content: \"\\e901\"; }\n\n/* line 21, src/styles/components/_icons.scss */\n.i-rocket:before {\n  content: \"\\e902\";\n  color: #999; }\n\n/* line 25, src/styles/components/_icons.scss */\n.i-comments:before {\n  content: \"\\e900\"; }\n\n/* line 28, src/styles/components/_icons.scss */\n.i-google:before {\n  content: \"\\f1a0\"; }\n\n/* line 31, src/styles/components/_icons.scss */\n.i-telegram:before {\n  content: \"\\f2c6\"; }\n\n/* line 34, src/styles/components/_icons.scss */\n.i-link:before {\n  content: \"\\f0c1\"; }\n\n/* line 37, src/styles/components/_icons.scss */\n.i-reddit:before {\n  content: \"\\f281\"; }\n\n/* line 40, src/styles/components/_icons.scss */\n.i-twitter:before {\n  content: \"\\f099\"; }\n\n/* line 43, src/styles/components/_icons.scss */\n.i-github:before {\n  content: \"\\f09b\"; }\n\n/* line 46, src/styles/components/_icons.scss */\n.i-linkedin:before {\n  content: \"\\f0e1\"; }\n\n/* line 49, src/styles/components/_icons.scss */\n.i-youtube:before {\n  content: \"\\f16a\"; }\n\n/* line 52, src/styles/components/_icons.scss */\n.i-stack-overflow:before {\n  content: \"\\f16c\"; }\n\n/* line 55, src/styles/components/_icons.scss */\n.i-instagram:before {\n  content: \"\\f16d\"; }\n\n/* line 58, src/styles/components/_icons.scss */\n.i-flickr:before {\n  content: \"\\f16e\"; }\n\n/* line 61, src/styles/components/_icons.scss */\n.i-dribbble:before {\n  content: \"\\f17d\"; }\n\n/* line 64, src/styles/components/_icons.scss */\n.i-behance:before {\n  content: \"\\f1b4\"; }\n\n/* line 67, src/styles/components/_icons.scss */\n.i-spotify:before {\n  content: \"\\f1bc\"; }\n\n/* line 70, src/styles/components/_icons.scss */\n.i-codepen:before {\n  content: \"\\f1cb\"; }\n\n/* line 73, src/styles/components/_icons.scss */\n.i-facebook:before {\n  content: \"\\f230\"; }\n\n/* line 76, src/styles/components/_icons.scss */\n.i-pinterest:before {\n  content: \"\\f231\"; }\n\n/* line 79, src/styles/components/_icons.scss */\n.i-whatsapp:before {\n  content: \"\\f232\"; }\n\n/* line 82, src/styles/components/_icons.scss */\n.i-snapchat:before {\n  content: \"\\f2ac\"; }\n\n/* line 85, src/styles/components/_icons.scss */\n.i-arrow_left:before {\n  content: \"\\e314\"; }\n\n/* line 88, src/styles/components/_icons.scss */\n.i-arrow_right:before {\n  content: \"\\e315\"; }\n\n/* line 91, src/styles/components/_icons.scss */\n.i-play:before {\n  content: \"\\e037\"; }\n\n/* line 94, src/styles/components/_icons.scss */\n.i-star-line:before {\n  content: \"\\e83a\"; }\n\n/* line 97, src/styles/components/_icons.scss */\n.i-photo:before {\n  content: \"\\e412\"; }\n\n/* line 100, src/styles/components/_icons.scss */\n.i-location:before {\n  content: \"\\e8b4\"; }\n\n/* line 103, src/styles/components/_icons.scss */\n.i-check-circle:before {\n  content: \"\\e86c\"; }\n\n/* line 106, src/styles/components/_icons.scss */\n.i-close:before {\n  content: \"\\e5cd\"; }\n\n/* line 109, src/styles/components/_icons.scss */\n.i-favorite:before {\n  content: \"\\e87d\"; }\n\n/* line 112, src/styles/components/_icons.scss */\n.i-star:before {\n  content: \"\\e838\"; }\n\n/* line 115, src/styles/components/_icons.scss */\n.i-warning:before {\n  content: \"\\e002\"; }\n\n/* line 118, src/styles/components/_icons.scss */\n.i-rss:before {\n  content: \"\\e0e5\"; }\n\n/* line 121, src/styles/components/_icons.scss */\n.i-search:before {\n  content: \"\\e8b6\"; }\n\n/* line 124, src/styles/components/_icons.scss */\n.i-send:before {\n  content: \"\\e163\"; }\n\n/* line 127, src/styles/components/_icons.scss */\n.i-share:before {\n  content: \"\\e80d\"; }\n\n/* line 2, src/styles/components/_animated.scss */\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both; }\n  /* line 6, src/styles/components/_animated.scss */\n  .animated.infinite {\n    animation-iteration-count: infinite; }\n\n/* line 12, src/styles/components/_animated.scss */\n.bounceIn {\n  animation-name: bounceIn; }\n\n/* line 13, src/styles/components/_animated.scss */\n.bounceInDown {\n  animation-name: bounceInDown; }\n\n/* line 14, src/styles/components/_animated.scss */\n.pulse {\n  animation-name: pulse; }\n\n@keyframes bounceIn {\n  0%,\n  20%,\n  40%,\n  60%,\n  80%,\n  100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97); }\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes bounceInDown {\n  0%,\n  60%,\n  75%,\n  90%,\n  100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1); }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    transform: translate3d(0, 5px, 0); }\n  100% {\n    transform: none; } }\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1); }\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes scroll {\n  0% {\n    opacity: 0; }\n  10% {\n    opacity: 1;\n    transform: translateY(0); }\n  100% {\n    opacity: 0;\n    transform: translateY(10px); } }\n\n@keyframes opacity {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px); }\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0); } }\n\n@keyframes loading-bar {\n  0% {\n    transform: translateX(-100%); }\n  40% {\n    transform: translateX(0); }\n  60% {\n    transform: translateX(0); }\n  100% {\n    transform: translateX(100%); } }\n\n/* line 4, src/styles/layouts/_header.scss */\n.button-search--open {\n  padding-right: 0 !important; }\n\n/* line 9, src/styles/layouts/_header.scss */\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px; }\n  /* line 15, src/styles/layouts/_header.scss */\n  .button-nav--toggle span {\n    background-color: #BBF1B9;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px; }\n    /* line 26, src/styles/layouts/_header.scss */\n    .button-nav--toggle span:first-child {\n      transform: translate(0, -6px); }\n    /* line 27, src/styles/layouts/_header.scss */\n    .button-nav--toggle span:last-child {\n      transform: translate(0, 6px); }\n\n/* line 31, src/styles/layouts/_header.scss */\n.header {\n  z-index: 999; }\n  /* line 34, src/styles/layouts/_header.scss */\n  .header-wrap {\n    height: 55px; }\n  /* line 36, src/styles/layouts/_header.scss */\n  .header-logo {\n    color: #fff !important;\n    height: 30px; }\n    /* line 40, src/styles/layouts/_header.scss */\n    .header-logo img {\n      max-height: 100%; }\n  /* line 43, src/styles/layouts/_header.scss */\n  .header-logo,\n  .header .button-search--open,\n  .header .button-nav--toggle {\n    z-index: 150; }\n  /* line 48, src/styles/layouts/_header.scss */\n  .header-description {\n    color: rgba(255, 255, 255, 0.8);\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 650px; }\n\n/* line 58, src/styles/layouts/_header.scss */\n.not-logo .header-logo {\n  height: auto !important; }\n\n/* line 63, src/styles/layouts/_header.scss */\n.follow > a {\n  padding-left: 15px; }\n\n/* line 68, src/styles/layouts/_header.scss */\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden; }\n  /* line 74, src/styles/layouts/_header.scss */\n  .nav ul {\n    display: flex;\n    margin-right: 20px;\n    overflow: hidden;\n    white-space: nowrap; }\n  /* line 81, src/styles/layouts/_header.scss */\n  .nav li {\n    float: left; }\n    /* line 84, src/styles/layouts/_header.scss */\n    .nav li a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase; }\n\n@media only screen and (min-width: 766px) {\n  /* line 98, src/styles/layouts/_header.scss */\n  body.is-home .header-wrap {\n    height: 200px; }\n  /* line 100, src/styles/layouts/_header.scss */\n  body.is-home .header-logo {\n    height: 50px; } }\n\n@media only screen and (max-width: 766px) {\n  /* line 117, src/styles/layouts/_header.scss */\n  .header {\n    position: fixed; }\n    /* line 120, src/styles/layouts/_header.scss */\n    .header-wrap {\n      height: 50px; }\n  /* line 123, src/styles/layouts/_header.scss */\n  .header-logo--wrap {\n    text-align: left; }\n  /* line 124, src/styles/layouts/_header.scss */\n  .header-logo {\n    display: flex;\n    flex: 1 1 auto; }\n  /* line 125, src/styles/layouts/_header.scss */\n  .header-logo span {\n    font-size: 24px; }\n  /* line 127, src/styles/layouts/_header.scss */\n  .header-top {\n    display: flex;\n    align-items: center; }\n  /* line 133, src/styles/layouts/_header.scss */\n  body.is-showNavMob {\n    overflow: hidden; }\n    /* line 136, src/styles/layouts/_header.scss */\n    body.is-showNavMob .sideNav {\n      transform: translateX(0); }\n    /* line 138, src/styles/layouts/_header.scss */\n    body.is-showNavMob .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg); }\n      /* line 142, src/styles/layouts/_header.scss */\n      body.is-showNavMob .button-nav--toggle span:first-child {\n        transform: rotate(45deg) translate(0, 0); }\n      /* line 143, src/styles/layouts/_header.scss */\n      body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n        transform: scaleX(0); }\n      /* line 144, src/styles/layouts/_header.scss */\n      body.is-showNavMob .button-nav--toggle span:last-child {\n        transform: rotate(-45deg) translate(0, 0); }\n    /* line 147, src/styles/layouts/_header.scss */\n    body.is-showNavMob .header .button-search--toggle {\n      display: none; }\n    /* line 148, src/styles/layouts/_header.scss */\n    body.is-showNavMob .main, body.is-showNavMob .footer {\n      transform: translateX(-25%); } }\n\n/* line 1, src/styles/layouts/_story-card.scss */\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px; }\n\n/* line 6, src/styles/layouts/_story-card.scss */\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%; }\n\n/* line 13, src/styles/layouts/_story-card.scss */\n.story-title {\n  letter-spacing: -.028em;\n  line-height: 24px !important; }\n\n/* line 18, src/styles/layouts/_story-card.scss */\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 60px;\n  line-height: 20px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3; }\n\n/* line 29, src/styles/layouts/_story-card.scss */\n.story-tag i {\n  color: rgba(0, 0, 0, 0.3) !important;\n  display: flex;\n  margin-right: 5px; }\n\n@media only screen and (min-width: 766px) {\n  /* line 39, src/styles/layouts/_story-card.scss */\n  .story--260 .story-wrap {\n    height: 260px; }\n  /* line 40, src/styles/layouts/_story-card.scss */\n  .story--260 .story-image {\n    height: 100px; }\n  /* line 42, src/styles/layouts/_story-card.scss */\n  .story--260 .story-body {\n    height: 160px; }\n  /* line 48, src/styles/layouts/_story-card.scss */\n  .story--200 .story-wrap {\n    height: 260px;\n    display: flex; }\n  /* line 50, src/styles/layouts/_story-card.scss */\n  .story--200 .story-body {\n    flex: 1 1 auto;\n    height: 100%; }\n  /* line 55, src/styles/layouts/_story-card.scss */\n  .story--200 .story-image {\n    flex: 0 0 auto;\n    height: 100%;\n    width: 200px; } }\n\n/* line 65, src/styles/layouts/_story-card.scss */\n.card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px; }\n  /* line 73, src/styles/layouts/_story-card.scss */\n  .card--p {\n    font-family: \"Merriweather\", serif;\n    font-style: normal;\n    font-weight: 400;\n    letter-spacing: -.004em;\n    line-height: 1.58; }\n  /* line 81, src/styles/layouts/_story-card.scss */\n  .card-image {\n    max-height: 240px;\n    max-width: 360px; }\n  /* line 88, src/styles/layouts/_story-card.scss */\n  .card.card--large .card-body {\n    display: flex;\n    flex-direction: column; }\n  /* line 90, src/styles/layouts/_story-card.scss */\n  .card.card--large .card-image {\n    height: 200px;\n    margin-bottom: 20px;\n    margin-top: 5px;\n    max-width: 100%;\n    order: -1; }\n  /* line 98, src/styles/layouts/_story-card.scss */\n  .card.card--large .card-image--link {\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 100%; }\n  /* line 109, src/styles/layouts/_story-card.scss */\n  .card.card--medium .card-excerpt {\n    color: rgba(0, 0, 0, 0.44);\n    font-family: \"Source Sans Pro\", sans-serif;\n    font-size: 23px;\n    letter-spacing: -.022em;\n    line-height: 1.22; }\n\n/* line 1, src/styles/layouts/_homepage.scss */\n.cover-lazy {\n  opacity: .5;\n  z-index: 2; }\n\n/* line 2, src/styles/layouts/_post.scss */\n.post-title {\n  line-height: 1.04;\n  font-weight: 600; }\n\n/* line 7, src/styles/layouts/_post.scss */\n.post-excerpt {\n  font-family: \"Merriweather\", serif;\n  font-size: 22px;\n  line-height: 1.5;\n  letter-spacing: -.022em; }\n\n/* line 20, src/styles/layouts/_post.scss */\n.postMetaInline {\n  letter-spacing: 0;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.54);\n  fill: rgba(0, 0, 0, 0.54); }\n\n/* line 31, src/styles/layouts/_post.scss */\n.post-body {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  /* line 36, src/styles/layouts/_post.scss */\n  .post-body a {\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n    background-position: 0 1.07em;\n    background-repeat: repeat-x;\n    background-size: 2px .1em;\n    text-decoration: none; }\n  /* line 44, src/styles/layouts/_post.scss */\n  .post-body img {\n    display: block;\n    margin-left: auto;\n    margin-right: auto; }\n  /* line 51, src/styles/layouts/_post.scss */\n  .post-body h1, .post-body h2, .post-body h3, .post-body h4, .post-body h5, .post-body h6 {\n    margin-top: 30px;\n    font-weight: 600;\n    font-style: normal; }\n  /* line 57, src/styles/layouts/_post.scss */\n  .post-body h2 {\n    font-size: 40px;\n    letter-spacing: -.03em;\n    line-height: 1.04;\n    margin-top: 54px; }\n  /* line 64, src/styles/layouts/_post.scss */\n  .post-body h3 {\n    font-size: 32px;\n    letter-spacing: -.02em;\n    line-height: 1.15;\n    margin-top: 52px; }\n  /* line 71, src/styles/layouts/_post.scss */\n  .post-body h4 {\n    font-size: 24px;\n    letter-spacing: -.018em;\n    line-height: 1.22;\n    margin-top: 30px; }\n  /* line 78, src/styles/layouts/_post.scss */\n  .post-body p {\n    font-family: \"Merriweather\", serif;\n    font-size: 1.125rem;\n    font-weight: 400;\n    letter-spacing: -.003em;\n    line-height: 1.7;\n    margin-top: 25px; }\n  /* line 87, src/styles/layouts/_post.scss */\n  .post-body ul,\n  .post-body ol {\n    counter-reset: post;\n    font-family: \"Merriweather\", serif;\n    font-size: 1.125rem;\n    margin-top: 30px; }\n    /* line 94, src/styles/layouts/_post.scss */\n    .post-body ul li,\n    .post-body ol li {\n      letter-spacing: -.003em;\n      line-height: 1.58;\n      margin-bottom: 14px;\n      margin-left: 30px; }\n      /* line 100, src/styles/layouts/_post.scss */\n      .post-body ul li::before,\n      .post-body ol li::before {\n        box-sizing: border-box;\n        display: inline-block;\n        margin-left: -78px;\n        position: absolute;\n        text-align: right;\n        width: 78px; }\n  /* line 111, src/styles/layouts/_post.scss */\n  .post-body ul li::before {\n    content: '\\2022';\n    font-size: 16.8px;\n    padding-right: 15px;\n    padding-top: 3px; }\n  /* line 118, src/styles/layouts/_post.scss */\n  .post-body ol li::before {\n    content: counter(post) \".\";\n    counter-increment: post;\n    padding-right: 12px; }\n  /* line 124, src/styles/layouts/_post.scss */\n  .post-body h1, .post-body h2, .post-body h3, .post-body h4, .post-body h5, .post-body h6, .post-body p,\n  .post-body ol, .post-body ul, .post-body hr, .post-body pre, .post-body dl, .post-body blockquote, .post-body .kg-embed-card {\n    min-width: 100%; }\n  /* line 129, src/styles/layouts/_post.scss */\n  .post-body > ul {\n    margin-top: 35px; }\n  /* line 131, src/styles/layouts/_post.scss */\n  .post-body > iframe,\n  .post-body > img,\n  .post-body .kg-image-card,\n  .post-body .kg-gallery-card,\n  .post-body .kg-card,\n  .post-body .kg-embed-card {\n    margin-top: 30px !important; }\n\n/* line 142, src/styles/layouts/_post.scss */\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase; }\n\n/* line 159, src/styles/layouts/_post.scss */\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px; }\n  /* line 167, src/styles/layouts/_post.scss */\n  .post-tags a:hover {\n    background: rgba(0, 0, 0, 0.1);\n    color: rgba(0, 0, 0, 0.6); }\n\n/* line 177, src/styles/layouts/_post.scss */\n.post-newsletter {\n  outline: 1px solid #f0f0f0 !important;\n  outline-offset: -1px;\n  border-radius: 2px;\n  padding: 40px 10px; }\n  /* line 183, src/styles/layouts/_post.scss */\n  .post-newsletter .newsletter-form {\n    max-width: 400px; }\n  /* line 185, src/styles/layouts/_post.scss */\n  .post-newsletter .form-group {\n    width: 80%;\n    padding-right: 5px; }\n  /* line 187, src/styles/layouts/_post.scss */\n  .post-newsletter .form--input {\n    border: 0;\n    border-bottom: 1px solid #ccc;\n    height: 48px;\n    padding: 6px 12px 8px 5px;\n    resize: none;\n    width: 100%; }\n    /* line 195, src/styles/layouts/_post.scss */\n    .post-newsletter .form--input:focus {\n      outline: 0; }\n  /* line 200, src/styles/layouts/_post.scss */\n  .post-newsletter .form--btn {\n    background-color: #a9a9a9;\n    border-radius: 0 45px 45px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    padding: 0;\n    width: 20%; }\n    /* line 209, src/styles/layouts/_post.scss */\n    .post-newsletter .form--btn::before {\n      background-color: #a9a9a9;\n      border-radius: 0 45px 45px 0;\n      line-height: 45px;\n      z-index: 2; }\n    /* line 218, src/styles/layouts/_post.scss */\n    .post-newsletter .form--btn:hover {\n      opacity: .8; }\n    /* line 219, src/styles/layouts/_post.scss */\n    .post-newsletter .form--btn:focus {\n      outline: 0; }\n\n/* line 226, src/styles/layouts/_post.scss */\n.cardPost-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px; }\n\n/* line 235, src/styles/layouts/_post.scss */\n.cardPost-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important; }\n\n/* line 245, src/styles/layouts/_post.scss */\n.cardPost .u-card {\n  height: 296px;\n  margin-bottom: 20px; }\n\n/* line 253, src/styles/layouts/_post.scss */\n.sharePost {\n  left: -130px;\n  margin-top: 28px;\n  width: 65px;\n  position: absolute !important; }\n  /* line 261, src/styles/layouts/_post.scss */\n  .sharePost a {\n    background-image: none;\n    border-radius: 5px;\n    color: #fff;\n    height: 36px;\n    line-height: 20px;\n    margin: 10px auto;\n    padding: 8px;\n    text-decoration: none;\n    width: 36px; }\n\n/* line 276, src/styles/layouts/_post.scss */\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translate3d(0, 0, 0);\n  transition: all 0.25s ease-in-out;\n  z-index: 400; }\n  /* line 291, src/styles/layouts/_post.scss */\n  .postActions.is-visible {\n    transform: translateY(100%); }\n  /* line 298, src/styles/layouts/_post.scss */\n  .postActions-wrap {\n    max-width: 1200px;\n    padding-left: 8px;\n    padding-right: 8px; }\n  /* line 304, src/styles/layouts/_post.scss */\n  .postActions .separator {\n    background: rgba(0, 0, 0, 0.15);\n    height: 24px;\n    margin: 0 15px;\n    width: 1px; }\n\n/* line 312, src/styles/layouts/_post.scss */\n.nextPost {\n  max-width: 260px; }\n\n/* line 318, src/styles/layouts/_post.scss */\n.kg-gallery-container {\n  display: flex;\n  flex-direction: column;\n  max-width: 100%;\n  width: 100%; }\n\n/* line 325, src/styles/layouts/_post.scss */\n.kg-gallery-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: center; }\n\n/* line 331, src/styles/layouts/_post.scss */\n.kg-gallery-image img {\n  display: block;\n  margin: 0;\n  width: 100%;\n  height: 100%; }\n\n/* line 338, src/styles/layouts/_post.scss */\n.kg-gallery-row:not(:first-of-type) {\n  margin: 0.75em 0 0 0; }\n\n/* line 342, src/styles/layouts/_post.scss */\n.kg-gallery-image:not(:first-of-type) {\n  margin: 0 0 0 0.75em; }\n\n@media only screen and (max-width: 766px) {\n  /* line 348, src/styles/layouts/_post.scss */\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px; }\n  /* line 353, src/styles/layouts/_post.scss */\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px; }\n  /* line 358, src/styles/layouts/_post.scss */\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px; }\n  /* line 363, src/styles/layouts/_post.scss */\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important; }\n  /* line 369, src/styles/layouts/_post.scss */\n  .post-body > p:first-of-type::first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px; }\n  /* line 376, src/styles/layouts/_post.scss */\n  .post-body ol, .post-body ul, .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58; }\n  /* line 382, src/styles/layouts/_post.scss */\n  .post-body iframe {\n    width: 100% !important; }\n  /* line 386, src/styles/layouts/_post.scss */\n  .post-related {\n    padding-left: 8px;\n    padding-right: 8px; } }\n\n/* line 1, src/styles/layouts/_author.scss */\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px; }\n  /* line 6, src/styles/layouts/_author.scss */\n  .author-avatar {\n    height: 80px;\n    width: 80px; }\n  /* line 11, src/styles/layouts/_author.scss */\n  .author-meta span {\n    display: inline-block;\n    font-size: 17px;\n    font-style: italic;\n    margin: 0 25px 16px 0;\n    opacity: .8;\n    word-wrap: break-word; }\n  /* line 20, src/styles/layouts/_author.scss */\n  .author-name {\n    color: rgba(0, 0, 0, 0.8); }\n  /* line 22, src/styles/layouts/_author.scss */\n  .author-bio {\n    max-width: 600px; }\n\n/* line 25, src/styles/layouts/_author.scss */\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33); }\n  /* line 29, src/styles/layouts/_author.scss */\n  .author.has--image .author-link:hover {\n    opacity: 1 !important; }\n  /* line 31, src/styles/layouts/_author.scss */\n  .author.has--image .u-accentColor--iconNormal {\n    fill: #fff; }\n  /* line 33, src/styles/layouts/_author.scss */\n  .author.has--image a,\n  .author.has--image .author-name {\n    color: #fff; }\n  /* line 36, src/styles/layouts/_author.scss */\n  .author.has--image .author-follow a {\n    border: 2px solid;\n    border-color: rgba(255, 255, 255, 0.5) !important;\n    font-size: 16px; }\n\n@media only screen and (max-width: 766px) {\n  /* line 44, src/styles/layouts/_author.scss */\n  .author-meta span {\n    display: block; }\n  /* line 45, src/styles/layouts/_author.scss */\n  .author-header {\n    display: block; }\n  /* line 46, src/styles/layouts/_author.scss */\n  .author-avatar {\n    margin: 0 auto 20px; } }\n\n/* line 3, src/styles/layouts/_search.scss */\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999; }\n  /* line 13, src/styles/layouts/_search.scss */\n  .search-form {\n    max-width: 680px;\n    margin-top: 80px; }\n    /* line 17, src/styles/layouts/_search.scss */\n    .search-form::before {\n      background: #eee;\n      bottom: 0;\n      content: '';\n      display: block;\n      height: 2px;\n      left: 0;\n      position: absolute;\n      width: 100%;\n      z-index: 1; }\n    /* line 29, src/styles/layouts/_search.scss */\n    .search-form input {\n      border: none;\n      display: block;\n      line-height: 40px;\n      padding-bottom: 8px; }\n      /* line 35, src/styles/layouts/_search.scss */\n      .search-form input:focus {\n        outline: 0; }\n  /* line 40, src/styles/layouts/_search.scss */\n  .search-results {\n    max-height: calc(90% - 100px);\n    max-width: 680px;\n    overflow: auto; }\n    /* line 45, src/styles/layouts/_search.scss */\n    .search-results a {\n      border-bottom: 1px solid #eee;\n      padding: 12px 0; }\n      /* line 49, src/styles/layouts/_search.scss */\n      .search-results a:hover {\n        color: rgba(0, 0, 0, 0.44); }\n\n/* line 54, src/styles/layouts/_search.scss */\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px; }\n\n/* line 60, src/styles/layouts/_search.scss */\nbody.is-search {\n  overflow: hidden; }\n  /* line 63, src/styles/layouts/_search.scss */\n  body.is-search .search {\n    bottom: 0 !important;\n    height: 100%;\n    transition: all .3s;\n    visibility: visible; }\n\n/* line 2, src/styles/layouts/_sidebar.scss */\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px; }\n\n/* line 10, src/styles/layouts/_sidebar.scss */\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Merriweather\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0; }\n\n/* line 22, src/styles/layouts/_sidebar.scss */\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00; }\n\n/* line 23, src/styles/layouts/_sidebar.scss */\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed; }\n\n/* line 25, src/styles/layouts/_sidebar.scss */\n.sidebar-post--title {\n  line-height: 1.1; }\n\n/* line 29, src/styles/layouts/_sidebar.scss */\n.sidebar-post--link {\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.09);\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.09);\n  min-height: 50px;\n  padding: 15px 15px 15px 55px; }\n  /* line 36, src/styles/layouts/_sidebar.scss */\n  .sidebar-post--link:hover .sidebar-border {\n    background-color: #e5eff5; }\n\n/* line 2, src/styles/layouts/_sidenav.scss */\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99; }\n  /* line 13, src/styles/layouts/_sidenav.scss */\n  .sideNav-menu a {\n    padding: 10px 20px; }\n  /* line 15, src/styles/layouts/_sidenav.scss */\n  .sideNav-wrap {\n    background: #eee;\n    overflow: auto;\n    padding: 20px 0;\n    top: 50px; }\n  /* line 22, src/styles/layouts/_sidenav.scss */\n  .sideNav-section {\n    border-bottom: solid 1px #ddd;\n    margin-bottom: 8px;\n    padding-bottom: 8px; }\n  /* line 28, src/styles/layouts/_sidenav.scss */\n  .sideNav-follow {\n    border-top: 1px solid #ddd;\n    margin: 15px 0; }\n    /* line 32, src/styles/layouts/_sidenav.scss */\n    .sideNav-follow a {\n      color: #fff;\n      display: inline-block;\n      height: 36px;\n      line-height: 20px;\n      margin: 0 5px 5px 0;\n      min-width: 36px;\n      padding: 8px;\n      text-align: center;\n      vertical-align: middle; }\n\n/* line 4, src/styles/layouts/helper.scss */\n.simply-follow:hover .simply-hover-hidden {\n  display: none !important; }\n\n/* line 5, src/styles/layouts/helper.scss */\n.simply-follow:hover .simply-hover-show {\n  display: inline-block !important; }\n\n/* line 8, src/styles/layouts/helper.scss */\n.simply-follow-btn {\n  height: 19px;\n  line-height: 17px;\n  padding: 0 10px; }\n\n@media only screen and (min-width: 766px) {\n  /* line 19, src/styles/layouts/helper.scss */\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1); }\n  /* line 24, src/styles/layouts/helper.scss */\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff; }\n  /* line 26, src/styles/layouts/helper.scss */\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -56px; }\n  /* line 30, src/styles/layouts/helper.scss */\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 100px; }\n  /* line 38, src/styles/layouts/helper.scss */\n  .is-article .post-header {\n    padding-top: 35px; }\n  /* line 39, src/styles/layouts/helper.scss */\n  .is-article .post-body {\n    margin-top: 30px; }\n  /* line 41, src/styles/layouts/helper.scss */\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px; } }\n\n/* line 1, src/styles/layouts/subscribe.scss */\n.is-subscribe .footer {\n  background-color: #f0f0f0; }\n\n/* line 5, src/styles/layouts/subscribe.scss */\n.subscribe {\n  min-height: 80vh !important;\n  height: 100%;\n  background-color: #f0f0f0 !important; }\n  /* line 10, src/styles/layouts/subscribe.scss */\n  .subscribe-card {\n    background-color: #D7EFEE;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);\n    border-radius: 4px;\n    width: 900px;\n    height: 550px;\n    padding: 50px;\n    margin: 5px; }\n  /* line 20, src/styles/layouts/subscribe.scss */\n  .subscribe form {\n    max-width: 300px; }\n  /* line 24, src/styles/layouts/subscribe.scss */\n  .subscribe-form {\n    height: 100%; }\n  /* line 28, src/styles/layouts/subscribe.scss */\n  .subscribe-input {\n    background: 0 0;\n    border: 0;\n    border-bottom: 1px solid #cc5454;\n    border-radius: 0;\n    padding: 7px 5px;\n    height: 45px;\n    outline: 0;\n    font-family: \"Source Sans Pro\", sans-serif; }\n    /* line 38, src/styles/layouts/subscribe.scss */\n    .subscribe-input::placeholder {\n      color: #cc5454; }\n  /* line 43, src/styles/layouts/subscribe.scss */\n  .subscribe .button {\n    background: #029e74;\n    border-color: #029e74;\n    color: #fff;\n    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n    font-size: 17px !important; }\n  /* line 51, src/styles/layouts/subscribe.scss */\n  .subscribe .main-error {\n    color: #cc5454;\n    font-size: 16px;\n    margin-top: 15px; }\n\n/* line 60, src/styles/layouts/subscribe.scss */\n.subscribe-success .subscribe-card {\n  background-color: #E8F3EC; }\n\n@media only screen and (max-width: 766px) {\n  /* line 66, src/styles/layouts/subscribe.scss */\n  .subscribe-card {\n    height: auto;\n    width: auto; } }\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdHlsZXMvbWFpbi5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX3ZhcmlhYmxlcy5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX21peGlucy5zY3NzIiwibm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIm5vZGVfbW9kdWxlcy9wcmlzbWpzL3RoZW1lcy9wcmlzbS5jc3MiLCJzcmMvc3R5bGVzL2xpYi9fem9vbS5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX2dsb2JhbC5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX3R5cG9ncmFwaHkuc2NzcyIsInNyYy9zdHlsZXMvY29tbW9uL191dGlsaXRpZXMuc2NzcyIsInNyYy9zdHlsZXMvY29tcG9uZW50cy9fZ3JpZC5zY3NzIiwic3JjL3N0eWxlcy9jb21wb25lbnRzL19mb3JtLnNjc3MiLCJzcmMvc3R5bGVzL2NvbXBvbmVudHMvX2ljb25zLnNjc3MiLCJzcmMvc3R5bGVzL2NvbXBvbmVudHMvX2FuaW1hdGVkLnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvX2hlYWRlci5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19zdG9yeS1jYXJkLnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvX2hvbWVwYWdlLnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvX3Bvc3Quc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fYXV0aG9yLnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvX3NlYXJjaC5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19zaWRlYmFyLnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvX3NpZGVuYXYuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9oZWxwZXIuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9zdWJzY3JpYmUuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG5cbi8vIE1peGlucyAmIFZhcmlhYmxlc1xuQGltcG9ydCBcImNvbW1vbi92YXJpYWJsZXNcIjtcbkBpbXBvcnQgXCJjb21tb24vbWl4aW5zXCI7XG5cbi8vIEltcG9ydCBucG0gZGVwZW5kZW5jaWVzXG5AaW1wb3J0IFwifm5vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplXCI7XG5AaW1wb3J0IFwifnByaXNtanMvdGhlbWVzL3ByaXNtXCI7XG5cbi8vIGltcG9ydCBsaWJcbkBpbXBvcnQgXCJsaWIvem9vbVwiO1xuXG4vLyBjb21tb25cbkBpbXBvcnQgXCJjb21tb24vZ2xvYmFsXCI7XG5AaW1wb3J0IFwiY29tbW9uL3R5cG9ncmFwaHlcIjtcbkBpbXBvcnQgXCJjb21tb24vdXRpbGl0aWVzXCI7XG5cbi8vIGNvbXBvbmVudHNcbkBpbXBvcnQgXCJjb21wb25lbnRzL2dyaWRcIjtcbkBpbXBvcnQgXCJjb21wb25lbnRzL2Zvcm1cIjtcbkBpbXBvcnQgXCJjb21wb25lbnRzL2ljb25zXCI7XG5AaW1wb3J0IFwiY29tcG9uZW50cy9hbmltYXRlZFwiO1xuXG4vL2xheW91dHNcbkBpbXBvcnQgXCJsYXlvdXRzL2hlYWRlclwiO1xuQGltcG9ydCBcImxheW91dHMvc3RvcnktY2FyZFwiO1xuQGltcG9ydCBcImxheW91dHMvaG9tZXBhZ2VcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL3Bvc3RcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL2F1dGhvclwiO1xuQGltcG9ydCBcImxheW91dHMvc2VhcmNoXCI7XG5AaW1wb3J0IFwibGF5b3V0cy9zaWRlYmFyXCI7XG5AaW1wb3J0IFwibGF5b3V0cy9zaWRlbmF2XCI7XG5AaW1wb3J0IFwibGF5b3V0cy9oZWxwZXJcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL3N1YnNjcmliZVwiO1xuIiwiLy8gMS4gQ29sb3JzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kcHJpbWFyeS1jb2xvcjogIzAwQTAzNDtcbiRwcmltYXJ5LWNvbG9yLWhvdmVyOiAjMDBhYjZiO1xuXG4vLyAkcHJpbWFyeS1jb2xvcjogIzMzNjY4YztcbiRwcmltYXJ5LWNvbG9yLWRhcms6ICAgIzE5NzZkMjtcblxuJHByaW1hcnktdGV4dC1jb2xvcjogICByZ2JhKDAsIDAsIDAsIC44NCk7XG5cbi8vICRwcmltYXJ5LWNvbG9yLWxpZ2h0OlxuLy8gJHByaW1hcnktY29sb3ItdGV4dDpcbi8vICRhY2NlbnQtY29sb3I6XG4vLyAkcHJpbWFyeS10ZXh0LWNvbG9yOlxuLy8gJHNlY29uZGFyeS10ZXh0LWNvbG9yOlxuLy8gJGRpdmlkZXItY29sb3I6XG5cbi8vIHNvY2lhbCBjb2xvcnNcbiRzb2NpYWwtY29sb3JzOiAoXG4gIGZhY2Vib29rOiAgICMzYjU5OTgsXG4gIHR3aXR0ZXI6ICAgICM1NWFjZWUsXG4gIGdvb2dsZTogICAgICNkZDRiMzksXG4gIGluc3RhZ3JhbTogICMzMDYwODgsXG4gIHlvdXR1YmU6ICAgICNlNTJkMjcsXG4gIGdpdGh1YjogICAgICM1NTUsXG4gIGxpbmtlZGluOiAgICMwMDdiYjYsXG4gIHNwb3RpZnk6ICAgICMyZWJkNTksXG4gIGNvZGVwZW46ICAgICMyMjIsXG4gIGJlaGFuY2U6ICAgICMxMzE0MTgsXG4gIGRyaWJiYmxlOiAgICNlYTRjODksXG4gIGZsaWNrcjogICAgICMwMDYzZGMsXG4gIHJlZGRpdDogICAgICNmZjQ1MDAsXG4gIHBvY2tldDogICAgICNmNTAwNTcsXG4gIHBpbnRlcmVzdDogICNiZDA4MWMsXG4gIHdoYXRzYXBwOiAgICM2NGQ0NDgsXG4gIHRlbGVncmFtOiAgICMwOGMsXG4pO1xuXG4vLyAyLiBGb250c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuJHByaW1hcnktZm9udDogICAgJ1NvdXJjZSBTYW5zIFBybycsIHNhbnMtc2VyaWY7IC8vIGZvbnQgZGVmYXVsdCBwYWdlIGFuZCB0aXRsZXNcbiRzZWN1bmRhcnktZm9udDogJ01lcnJpd2VhdGhlcicsIHNlcmlmOyAvLyBmb250IGZvciBjb250ZW50XG4kY29kZS1mb250OiAgICAgICAnU291cmNlIENvZGUgUHJvJywgbW9ub3NwYWNlOyAvLyBmb250IGZvciBjb2RlIGFuZCBwcmVcblxuLy8gMy4gVHlwb2dyYXBoeVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuJHNwYWNlcjogICAgICAgICAgMTZweDtcbiRsaW5lLWhlaWdodDogICAgIDEuNTtcblxuJGZvbnQtc2l6ZS1yb290OiAgMTZweDtcblxuJGZvbnQtc2l6ZS1iYXNlOiAgMThweDtcbiRmb250LXNpemUtbGc6ICAgIDMycHg7XG4kZm9udC1zaXplLXNtOiAgICAuODc1cmVtOyAvLzE0cHhcbiRmb250LXNpemUteHM6ICAgIC44MTI1OyAvLzEzcHhcblxuJGZvbnQtc2l6ZS1oMTogICAgMi4yNXJlbTtcbiRmb250LXNpemUtaDI6ICAgIDEuODc1cmVtO1xuJGZvbnQtc2l6ZS1oMzogICAgMS41NjI1cmVtO1xuJGZvbnQtc2l6ZS1oNDogICAgMS4zNzVyZW07XG4kZm9udC1zaXplLWg1OiAgICAxLjEyNXJlbTtcbiRmb250LXNpemUtaDY6ICAgIDFyZW07XG5cbiRoZWFkaW5ncy1tYXJnaW4tYm90dG9tOiAgICgkc3BhY2VyIC8gMik7XG4kaGVhZGluZ3MtZm9udC1mYW1pbHk6ICAgICAkcHJpbWFyeS1mb250O1xuJGhlYWRpbmdzLWZvbnQtd2VpZ2h0OiAgICAgNjAwO1xuJGhlYWRpbmdzLWxpbmUtaGVpZ2h0OiAgICAgMS4xO1xuJGhlYWRpbmdzLWNvbG9yOiAgICAgICAgICAgaW5oZXJpdDtcblxuJGZvbnQtd2VpZ2h0OiAgICAgICAgICAgICAgNjAwO1xuXG4kYmxvY2txdW90ZS1mb250LXNpemU6ICAgICAxLjEyNXJlbTtcblxuLy8gQ29udGFpbmVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kZ3JpZC1ndXR0ZXItd2lkdGg6ICAgICAgICAyNHB4O1xuXG4kY29udGFpbmVyLXNtOiAgICAgICAgICAgICA1NzZweDtcbiRjb250YWluZXItbWQ6ICAgICAgICAgICAgIDc2N3B4O1xuJGNvbnRhaW5lci1sZzogICAgICAgICAgICAgOTcwcHg7XG4kY29udGFpbmVyLXhsOiAgICAgICAgICAgICAxMjAwcHg7XG5cbi8vIEhlYWRlclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiRoZWFkZXItY29sb3I6ICNCQkYxQjk7XG4kaGVhZGVyLWNvbG9yLWhvdmVyOiAjRUVGRkVBO1xuJGhlYWRlci1oZWlnaHQtbW9iaWxlOiA1MHB4O1xuXG4vLyAzLiBNZWRpYSBRdWVyeSBSYW5nZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiRudW0tY29sczogMTI7XG4kZ3V0dGVyLXdpZHRoOiAyNHB4O1xuJGVsZW1lbnQtdG9wLW1hcmdpbjogJGd1dHRlci13aWR0aCAvIDM7XG4kZWxlbWVudC1ib3R0b20tbWFyZ2luOiAoJGd1dHRlci13aWR0aCAqIDIpIC8gMztcblxuLy8gMy4gTWVkaWEgUXVlcnkgUmFuZ2VzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kc206ICAgICAgICAgICAgNjQwcHg7XG4kbWQ6ICAgICAgICAgICAgNzY2cHg7XG4kbGc6ICAgICAgICAgICAgMTAwMHB4O1xuJHhsOiAgICAgICAgICAgIDEyMzBweDtcblxuJHNtLWFuZC11cDogICAgIFwib25seSBzY3JlZW4gYW5kIChtaW4td2lkdGggOiAjeyRzbX0pXCI7XG4kbWQtYW5kLXVwOiAgICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6ICN7JG1kfSlcIjtcbiRsZy1hbmQtdXA6ICAgICBcIm9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoIDogI3skbGd9KVwiO1xuJHhsLWFuZC11cDogICAgIFwib25seSBzY3JlZW4gYW5kIChtaW4td2lkdGggOiAjeyR4bH0pXCI7XG5cbiRzbS1hbmQtZG93bjogICBcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogI3skc219KVwiO1xuJG1kLWFuZC1kb3duOiAgIFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOiAjeyRtZH0pXCI7XG4kbGctYW5kLWRvd246ICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6ICN7JGxnfSlcIjtcblxuLy8gQ29kZSBDb2xvclxuJGNvZGUtYmctY29sb3I6ICAgI2Y3ZjdmNztcbiRmb250LXNpemUtY29kZTogIDE2cHg7XG4kY29kZS1jb2xvcjogICAgICAjYzcyNTRlO1xuJHByZS1jb2RlLWNvbG9yOiAgIzM3NDc0ZjtcblxuLy8gaWNvbnNcblxuJGktY29kZTogXCJcXGYxMjFcIjtcbiRpLXdhcm5pbmc6IFwiXFxlMDAyXCI7XG4kaS1jaGVjazogXCJcXGU4NmNcIjtcbiRpLXN0YXI6IFwiXFxlODM4XCI7XG4iLCIlbGluayB7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuJWxpbmstLWFjY2VudCB7XG4gIGNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAvLyAmOmhvdmVyIHsgY29sb3I6ICRwcmltYXJ5LWNvbG9yLWhvdmVyOyB9XG59XG5cbiVjb250ZW50LWFic29sdXRlLWJvdHRvbSB7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgbWFyZ2luOiAzMHB4O1xuICBtYXgtd2lkdGg6IDYwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDI7XG59XG5cbiV1LWFic29sdXRlMCB7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xufVxuXG4ldS10ZXh0LWNvbG9yLWRhcmtlciB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC44KSAhaW1wb3J0YW50O1xuICBmaWxsOiByZ2JhKDAsIDAsIDAsIC44KSAhaW1wb3J0YW50O1xufVxuXG4lZm9udHMtaWNvbnMge1xuICAvKiB1c2UgIWltcG9ydGFudCB0byBwcmV2ZW50IGlzc3VlcyB3aXRoIGJyb3dzZXIgZXh0ZW5zaW9ucyB0aGF0IGNoYW5nZSBmb250cyAqL1xuICBmb250LWZhbWlseTogJ3NpbXBseScgIWltcG9ydGFudDsgLy9zdHlsZWxpbnQtZGlzYWJsZS1saW5lXG4gIHNwZWFrOiBub25lO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtdmFyaWFudDogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG5cbiAgLyogQmV0dGVyIEZvbnQgUmVuZGVyaW5nID09PT09PT09PT09ICovXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xufVxuIiwiLyohIG5vcm1hbGl6ZS5jc3MgdjcuMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xuXG4vKiBEb2N1bWVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluXG4gKiAgICBJRSBvbiBXaW5kb3dzIFBob25lIGFuZCBpbiBpT1MuXG4gKi9cblxuaHRtbCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xufVxuXG4vKiBTZWN0aW9uc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMgKG9waW5pb25hdGVkKS5cbiAqL1xuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxuICovXG5cbmFydGljbGUsXG5hc2lkZSxcbmZvb3RlcixcbmhlYWRlcixcbm5hdixcbnNlY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxuICovXG5cbmgxIHtcbiAgZm9udC1zaXplOiAyZW07XG4gIG1hcmdpbjogMC42N2VtIDA7XG59XG5cbi8qIEdyb3VwaW5nIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRS5cbiAqL1xuXG5maWdjYXB0aW9uLFxuZmlndXJlLFxubWFpbiB7IC8qIDEgKi9cbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IG1hcmdpbiBpbiBJRSA4LlxuICovXG5cbmZpZ3VyZSB7XG4gIG1hcmdpbjogMWVtIDQwcHg7XG59XG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxuICovXG5cbmhyIHtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cbiAgaGVpZ2h0OiAwOyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5wcmUge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuICogMi4gUmVtb3ZlIGdhcHMgaW4gbGlua3MgdW5kZXJsaW5lIGluIGlPUyA4KyBhbmQgU2FmYXJpIDgrLlxuICovXG5cbmEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgLyogMSAqL1xuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1za2lwOiBvYmplY3RzOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny0gYW5kIEZpcmVmb3ggMzktLlxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXG59XG5cbi8qKlxuICogUHJldmVudCB0aGUgZHVwbGljYXRlIGFwcGxpY2F0aW9uIG9mIGBib2xkZXJgIGJ5IHRoZSBuZXh0IHJ1bGUgaW4gU2FmYXJpIDYuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHN0eWxlIGluIEFuZHJvaWQgNC4zLS5cbiAqL1xuXG5kZm4ge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGJhY2tncm91bmQgYW5kIGNvbG9yIGluIElFIDktLlxuICovXG5cbm1hcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwO1xuICBjb2xvcjogIzAwMDtcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zbWFsbCB7XG4gIGZvbnQtc2l6ZTogODAlO1xufVxuXG4vKipcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxuICogYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1YixcbnN1cCB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbnN1YiB7XG4gIGJvdHRvbTogLTAuMjVlbTtcbn1cblxuc3VwIHtcbiAgdG9wOiAtMC41ZW07XG59XG5cbi8qIEVtYmVkZGVkIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKi9cblxuYXVkaW8sXG52aWRlbyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBpT1MgNC03LlxuICovXG5cbmF1ZGlvOm5vdChbY29udHJvbHNdKSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGhlaWdodDogMDtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLS5cbiAqL1xuXG5pbWcge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qKlxuICogSGlkZSB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKi9cblxuc3ZnOm5vdCg6cm9vdCkge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vKiBGb3Jtc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQgeyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbixcbnNlbGVjdCB7IC8qIDEgKi9cbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG59XG5cbi8qKlxuICogMS4gUHJldmVudCBhIFdlYktpdCBidWcgd2hlcmUgKDIpIGRlc3Ryb3lzIG5hdGl2ZSBgYXVkaW9gIGFuZCBgdmlkZW9gXG4gKiAgICBjb250cm9scyBpbiBBbmRyb2lkIDQuXG4gKiAyLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmh0bWwgW3R5cGU9XCJidXR0b25cIl0sIC8qIDEgKi9cblt0eXBlPVwicmVzZXRcIl0sXG5bdHlwZT1cInN1Ym1pdFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cImJ1dHRvblwiXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPVwicmVzZXRcIl06Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cInN1Ym1pdFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLyoqXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXG4gKi9cblxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJidXR0b25cIl06LW1vei1mb2N1c3JpbmcsXG5bdHlwZT1cInJlc2V0XCJdOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJzdWJtaXRcIl06LW1vei1mb2N1c3Jpbmcge1xuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmZpZWxkc2V0IHtcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5sZWdlbmQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAzICovXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IC8qIDEgKi9cbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRS5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLS5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC0uXG4gKi9cblxuW3R5cGU9XCJjaGVja2JveFwiXSxcblt0eXBlPVwicmFkaW9cIl0ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5bdHlwZT1cIm51bWJlclwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgYW5kIGNhbmNlbCBidXR0b25zIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxuW3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUsIGFuZCBGaXJlZm94LlxuICovXG5cbmRldGFpbHMsIC8qIDEgKi9cbm1lbnUge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdW1tYXJ5IHtcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xufVxuXG4vKiBTY3JpcHRpbmdcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKi9cblxuY2FudmFzIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyogSGlkZGVuXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLS5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iLCIvKipcbiAqIHByaXNtLmpzIGRlZmF1bHQgdGhlbWUgZm9yIEphdmFTY3JpcHQsIENTUyBhbmQgSFRNTFxuICogQmFzZWQgb24gZGFiYmxldCAoaHR0cDovL2RhYmJsZXQuY29tKVxuICogQGF1dGhvciBMZWEgVmVyb3VcbiAqL1xuXG5jb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSxcbnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0ge1xuXHRjb2xvcjogYmxhY2s7XG5cdGJhY2tncm91bmQ6IG5vbmU7XG5cdHRleHQtc2hhZG93OiAwIDFweCB3aGl0ZTtcblx0Zm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sICdBbmRhbGUgTW9ubycsICdVYnVudHUgTW9ubycsIG1vbm9zcGFjZTtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0d2hpdGUtc3BhY2U6IHByZTtcblx0d29yZC1zcGFjaW5nOiBub3JtYWw7XG5cdHdvcmQtYnJlYWs6IG5vcm1hbDtcblx0d29yZC13cmFwOiBub3JtYWw7XG5cdGxpbmUtaGVpZ2h0OiAxLjU7XG5cblx0LW1vei10YWItc2l6ZTogNDtcblx0LW8tdGFiLXNpemU6IDQ7XG5cdHRhYi1zaXplOiA0O1xuXG5cdC13ZWJraXQtaHlwaGVuczogbm9uZTtcblx0LW1vei1oeXBoZW5zOiBub25lO1xuXHQtbXMtaHlwaGVuczogbm9uZTtcblx0aHlwaGVuczogbm9uZTtcbn1cblxucHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTo6LW1vei1zZWxlY3Rpb24sIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjotbW96LXNlbGVjdGlvbixcbmNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOjotbW96LXNlbGVjdGlvbiwgY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjotbW96LXNlbGVjdGlvbiB7XG5cdHRleHQtc2hhZG93OiBub25lO1xuXHRiYWNrZ3JvdW5kOiAjYjNkNGZjO1xufVxuXG5wcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOjpzZWxlY3Rpb24sIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjpzZWxlY3Rpb24sXG5jb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTo6c2VsZWN0aW9uLCBjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSA6OnNlbGVjdGlvbiB7XG5cdHRleHQtc2hhZG93OiBub25lO1xuXHRiYWNrZ3JvdW5kOiAjYjNkNGZjO1xufVxuXG5AbWVkaWEgcHJpbnQge1xuXHRjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSxcblx0cHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7XG5cdFx0dGV4dC1zaGFkb3c6IG5vbmU7XG5cdH1cbn1cblxuLyogQ29kZSBibG9ja3MgKi9cbnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0ge1xuXHRwYWRkaW5nOiAxZW07XG5cdG1hcmdpbjogLjVlbSAwO1xuXHRvdmVyZmxvdzogYXV0bztcbn1cblxuOm5vdChwcmUpID4gY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sXG5wcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0YmFja2dyb3VuZDogI2Y1ZjJmMDtcbn1cblxuLyogSW5saW5lIGNvZGUgKi9cbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0cGFkZGluZzogLjFlbTtcblx0Ym9yZGVyLXJhZGl1czogLjNlbTtcblx0d2hpdGUtc3BhY2U6IG5vcm1hbDtcbn1cblxuLnRva2VuLmNvbW1lbnQsXG4udG9rZW4ucHJvbG9nLFxuLnRva2VuLmRvY3R5cGUsXG4udG9rZW4uY2RhdGEge1xuXHRjb2xvcjogc2xhdGVncmF5O1xufVxuXG4udG9rZW4ucHVuY3R1YXRpb24ge1xuXHRjb2xvcjogIzk5OTtcbn1cblxuLm5hbWVzcGFjZSB7XG5cdG9wYWNpdHk6IC43O1xufVxuXG4udG9rZW4ucHJvcGVydHksXG4udG9rZW4udGFnLFxuLnRva2VuLmJvb2xlYW4sXG4udG9rZW4ubnVtYmVyLFxuLnRva2VuLmNvbnN0YW50LFxuLnRva2VuLnN5bWJvbCxcbi50b2tlbi5kZWxldGVkIHtcblx0Y29sb3I6ICM5MDU7XG59XG5cbi50b2tlbi5zZWxlY3Rvcixcbi50b2tlbi5hdHRyLW5hbWUsXG4udG9rZW4uc3RyaW5nLFxuLnRva2VuLmNoYXIsXG4udG9rZW4uYnVpbHRpbixcbi50b2tlbi5pbnNlcnRlZCB7XG5cdGNvbG9yOiAjNjkwO1xufVxuXG4udG9rZW4ub3BlcmF0b3IsXG4udG9rZW4uZW50aXR5LFxuLnRva2VuLnVybCxcbi5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZyxcbi5zdHlsZSAudG9rZW4uc3RyaW5nIHtcblx0Y29sb3I6ICM5YTZlM2E7XG5cdGJhY2tncm91bmQ6IGhzbGEoMCwgMCUsIDEwMCUsIC41KTtcbn1cblxuLnRva2VuLmF0cnVsZSxcbi50b2tlbi5hdHRyLXZhbHVlLFxuLnRva2VuLmtleXdvcmQge1xuXHRjb2xvcjogIzA3YTtcbn1cblxuLnRva2VuLmZ1bmN0aW9uLFxuLnRva2VuLmNsYXNzLW5hbWUge1xuXHRjb2xvcjogI0RENEE2ODtcbn1cblxuLnRva2VuLnJlZ2V4LFxuLnRva2VuLmltcG9ydGFudCxcbi50b2tlbi52YXJpYWJsZSB7XG5cdGNvbG9yOiAjZTkwO1xufVxuXG4udG9rZW4uaW1wb3J0YW50LFxuLnRva2VuLmJvbGQge1xuXHRmb250LXdlaWdodDogYm9sZDtcbn1cbi50b2tlbi5pdGFsaWMge1xuXHRmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi50b2tlbi5lbnRpdHkge1xuXHRjdXJzb3I6IGhlbHA7XG59XG4iLCIvLyBzdHlsZWxpbnQtZGlzYWJsZVxyXG5pbWdbZGF0YS1hY3Rpb249XCJ6b29tXCJdIHtcclxuICBjdXJzb3I6IHpvb20taW47XHJcbn1cclxuLnpvb20taW1nLFxyXG4uem9vbS1pbWctd3JhcCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHotaW5kZXg6IDY2NjtcclxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAzMDBtcztcclxuICAgICAgIC1vLXRyYW5zaXRpb246IGFsbCAzMDBtcztcclxuICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAzMDBtcztcclxufVxyXG5pbWcuem9vbS1pbWcge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBjdXJzb3I6IC13ZWJraXQtem9vbS1vdXQ7XHJcbiAgY3Vyc29yOiAtbW96LXpvb20tb3V0O1xyXG59XHJcbi56b29tLW92ZXJsYXkge1xyXG4gIHotaW5kZXg6IDQyMDtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgZmlsdGVyOiBcImFscGhhKG9wYWNpdHk9MClcIjtcclxuICBvcGFjaXR5OiAwO1xyXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogICAgICBvcGFjaXR5IDMwMG1zO1xyXG4gICAgICAgLW8tdHJhbnNpdGlvbjogICAgICBvcGFjaXR5IDMwMG1zO1xyXG4gICAgICAgICAgdHJhbnNpdGlvbjogICAgICBvcGFjaXR5IDMwMG1zO1xyXG59XHJcbi56b29tLW92ZXJsYXktb3BlbiAuem9vbS1vdmVybGF5IHtcclxuICBmaWx0ZXI6IFwiYWxwaGEob3BhY2l0eT0xMDApXCI7XHJcbiAgb3BhY2l0eTogMTtcclxufVxyXG4uem9vbS1vdmVybGF5LW9wZW4sXHJcbi56b29tLW92ZXJsYXktdHJhbnNpdGlvbmluZyB7XHJcbiAgY3Vyc29yOiBkZWZhdWx0O1xyXG59XHJcbiIsIlxuKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmEge1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXG4gICY6YWN0aXZlLFxuICAmOmhvdmVyIHtcbiAgICBvdXRsaW5lOiAwO1xuICB9XG59XG5cbmJsb2NrcXVvdGUge1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjgpO1xuICBjb2xvcjogIzAwMDtcbiAgZm9udC1mYW1pbHk6ICRzZWN1bmRhcnktZm9udDtcbiAgZm9udC1zaXplOiAxLjE4NzVyZW07XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC0uMDAzZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjc7XG4gIG1hcmdpbjogMzBweCAwIDAgLTIzcHg7XG4gIHBhZGRpbmctYm90dG9tOiAycHg7XG4gIHBhZGRpbmctbGVmdDogMjBweDtcblxuICBwOmZpcnN0LW9mLXR5cGUgeyBtYXJnaW4tdG9wOiAwIH1cbn1cblxuYm9keSB7XG4gIGNvbG9yOiAkcHJpbWFyeS10ZXh0LWNvbG9yO1xuICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLWJhc2U7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xufVxuXG4vL0RlZmF1bHQgc3R5bGVzXG5odG1sIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLXJvb3Q7XG59XG5cbmZpZ3VyZSB7XG4gIG1hcmdpbjogMDtcbn1cblxuZmlnY2FwdGlvbiB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42OCk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcImxpZ2FcIiBvbiwgXCJsbnVtXCIgb247XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsZWZ0OiAwO1xuICBsZXR0ZXItc3BhY2luZzogMDtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgb3V0bGluZTogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi8vIENvZGVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5rYmQsIHNhbXAsIGNvZGUge1xuICBiYWNrZ3JvdW5kOiAkY29kZS1iZy1jb2xvcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjb2xvcjogJGNvZGUtY29sb3I7XG4gIGZvbnQtZmFtaWx5OiAkY29kZS1mb250ICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1jb2RlO1xuICBwYWRkaW5nOiA0cHggNnB4O1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbnByZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2RlLWJnLWNvbG9yICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1mYW1pbHk6ICRjb2RlLWZvbnQgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLWNvZGU7XG4gIG1hcmdpbi10b3A6IDMwcHggIWltcG9ydGFudDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAxcmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuXG4gIGNvZGUge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGNvbG9yOiAkcHJlLWNvZGUtY29sb3I7XG4gICAgcGFkZGluZzogMDtcbiAgICB0ZXh0LXNoYWRvdzogMCAxcHggI2ZmZjtcbiAgfVxufVxuXG5jb2RlW2NsYXNzKj1sYW5ndWFnZS1dLFxucHJlW2NsYXNzKj1sYW5ndWFnZS1dIHtcbiAgY29sb3I6ICRwcmUtY29kZS1jb2xvcjtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcblxuICAudG9rZW4uY29tbWVudCB7IG9wYWNpdHk6IC44OyB9XG59XG5cbi8vIGhyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaHIge1xuICBib3JkZXI6IDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDUwcHggYXV0bztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgIGNvbnRlbnQ6ICcuLi4nO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBsZXR0ZXItc3BhY2luZzogLjZlbTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAtMjVweDtcbiAgfVxufVxuXG5pbWcge1xuICBoZWlnaHQ6IGF1dG87XG4gIG1heC13aWR0aDogMTAwJTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6IGF1dG87XG5cbiAgJjpub3QoW3NyY10pIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbn1cblxuaSB7XG4gIC8vIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxub2wsIHVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgbGlzdC1zdHlsZS1pbWFnZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG5tYXJrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgyMTUsIDI1MywgMjExLCAxKSwgcmdiYSgyMTUsIDI1MywgMjExLCAxKSk7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC44KTtcbn1cblxucSB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDI4cHg7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC0uMDE0ZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjQ4O1xuICBwYWRkaW5nLWxlZnQ6IDUwcHg7XG4gIHBhZGRpbmctdG9wOiAxNXB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuXG4gICY6OmJlZm9yZSwgJjo6YWZ0ZXIgeyBkaXNwbGF5OiBub25lOyB9XG59XG5cbi8vIExpbmtzIGNvbG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmxpbmstLWFjY2VudCB7IEBleHRlbmQgJWxpbmstLWFjY2VudDsgfVxuXG4ubGluayB7IEBleHRlbmQgJWxpbms7IH1cblxuLmxpbmstLXVuZGVybGluZSB7XG4gICY6YWN0aXZlLFxuICAmOmZvY3VzLFxuICAmOmhvdmVyIHtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxufVxuXG4vLyBBbmltYXRpb24gbWFpbiBwYWdlIGFuZCBmb290ZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ubWFpbixcbi5mb290ZXIgeyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjVzIGVhc2U7IH1cblxuQG1lZGlhICN7JG1kLWFuZC1kb3dufSB7XG4gIC5tYWluIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHBhZGRpbmctdG9wOiAkaGVhZGVyLWhlaWdodC1tb2JpbGU7XG4gIH1cblxuICAuZmVlZC1lbnRyeS1jb250ZW50IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgYmxvY2txdW90ZSB7IG1hcmdpbi1sZWZ0OiAtNXB4IH1cbn1cblxuLy8gd2FybmluZyBzdWNjZXNzIGFuZCBOb3RlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLndhcm5pbmcge1xuICBiYWNrZ3JvdW5kOiAjZmJlOWU3O1xuICBjb2xvcjogI2Q1MDAwMDtcbiAgJjo6YmVmb3JlIHsgY29udGVudDogJGktd2FybmluZzsgfVxufVxuXG4ubm90ZSB7XG4gIGJhY2tncm91bmQ6ICNlMWY1ZmU7XG4gIGNvbG9yOiAjMDI4OGQxO1xuICAmOjpiZWZvcmUgeyBjb250ZW50OiAkaS1zdGFyOyB9XG59XG5cbi5zdWNjZXNzIHtcbiAgYmFja2dyb3VuZDogI2UwZjJmMTtcbiAgY29sb3I6ICMwMDg5N2I7XG4gICY6OmJlZm9yZSB7IGNvbG9yOiAjMDBiZmE1OyBjb250ZW50OiAkaS1jaGVjazsgfVxufVxuXG4ud2FybmluZywgLm5vdGUsIC5zdWNjZXNzIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMThweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogMS41OCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAyOHB4O1xuICBwYWRkaW5nOiAxMnB4IDI0cHggMTJweCA2MHB4O1xuXG4gIGEge1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB9XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBAZXh0ZW5kICVmb250cy1pY29ucztcblxuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBtYXJnaW4tbGVmdDogLTM2cHg7XG4gICAgbWFyZ2luLXRvcDogLTVweDtcbiAgfVxufVxuXG4vLyBQYWdlIFRhZ3Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4udGFnIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICB6LWluZGV4OiAyO1xuXG4gICYtd3JhcCB7IHotaW5kZXg6IDI7IH1cblxuICAmLm5vdC0taW1hZ2Uge1xuICAgIEBleHRlbmQgJXUtdGV4dC1jb2xvci1kYXJrZXI7XG5cbiAgICBtaW4taGVpZ2h0OiBhdXRvO1xuICB9XG5cbiAgJi1kZXNjcmlwdGlvbiB7XG4gICAgbWF4LXdpZHRoOiA1MDBweDtcbiAgfVxufVxuXG4vLyB0b2x0aXBcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ud2l0aC10b29sdGlwIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuODUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBjb250ZW50OiBhdHRyKGRhdGEtdG9vbHRpcCk7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBsaW5lLWhlaWdodDogMS4yNTtcbiAgICBtaW4td2lkdGg6IDEzMHB4O1xuICAgIG9wYWNpdHk6IDA7XG4gICAgcGFkZGluZzogNHB4IDhweDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIHRvcDogLTMwcHg7XG4gICAgd2lsbC1jaGFuZ2U6IG9wYWNpdHksIHRyYW5zZm9ybTtcbiAgICB6LWluZGV4OiAxO1xuICB9XG5cbiAgJjpob3Zlcjo6YWZ0ZXIge1xuICAgIGFuaW1hdGlvbjogdG9vbHRpcCAuMXMgZWFzZS1vdXQgYm90aDtcbiAgfVxufVxuXG4vLyBGb290ZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4uZm9vdGVyIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgcGFkZGluZy1ib3R0b206IDQ1cHg7XG5cbiAgYSB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgICY6aG92ZXIgeyBAZXh0ZW5kICV1LXRleHQtY29sb3ItZGFya2VyOyB9XG4gIH1cblxuICAuZm9sbG93IHtcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgIGEge1xuICAgICAgQGV4dGVuZCAldS10ZXh0LWNvbG9yLWRhcmtlcjtcblxuICAgICAgcGFkZGluZzogMCA3cHg7XG5cbiAgICAgICY6aG92ZXIgeyBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpICFpbXBvcnRhbnQgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBJbnN0YWdyYW0gRmVkZFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5pbnN0YWdyYW0ge1xuICAmLWhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC4zKTtcbiAgICAvLyB0cmFuc2l0aW9uOiBvcGFjaXR5IDFzIGVhc2UtaW4tb3V0O1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICAmLWltZyB7XG4gICAgaGVpZ2h0OiAyNjRweDtcblxuICAgICY6aG92ZXIgPiAuaW5zdGFncmFtLWhvdmVyIHsgb3BhY2l0eTogMSB9XG4gIH1cblxuICAmLW5hbWUge1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICB6LWluZGV4OiAxMDtcblxuICAgIC8vIHN0eWxlbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIGEge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgIGNvbG9yOiAjMDAwICFpbXBvcnRhbnQ7XG4gICAgICBmb250LXNpemU6IDIwcHggIWltcG9ydGFudDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDAgIWltcG9ydGFudDtcbiAgICAgIG1pbi13aWR0aDogMjAwcHg7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDEwcHggIWltcG9ydGFudDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDEwcHggIWltcG9ydGFudDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuXG4gICYtY29sIHtcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuLy8gRXJyb3IgcGFnZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5lcnJvclBhZ2Uge1xuICBmb250LWZhbWlseTogJ1JvYm90byBNb25vJywgbW9ub3NwYWNlO1xuXG4gICYtbGluayB7XG4gICAgbGVmdDogLTVweDtcbiAgICBwYWRkaW5nOiAyNHB4IDYwcHg7XG4gICAgdG9wOiAtNnB4O1xuICB9XG5cbiAgJi10ZXh0IHtcbiAgICBtYXJnaW4tdG9wOiA2MHB4O1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgfVxuXG4gICYtd3JhcCB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQpO1xuICAgIHBhZGRpbmc6IDd2dyA0dnc7XG4gIH1cbn1cblxuLy8gVmlkZW8gUmVzcG9uc2l2ZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi52aWRlby1yZXNwb25zaXZlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMDtcbiAgbWFyZ2luLXRvcDogMzBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogMCAwIDU2LjI1JTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcblxuICBpZnJhbWUge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3R0b206IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGxlZnQ6IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIHZpZGVvIHtcbiAgICBib3JkZXI6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBsZWZ0OiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cblxuLmtnLWVtYmVkLWNhcmQgLnZpZGVvLXJlc3BvbnNpdmUgeyBtYXJnaW4tdG9wOiAwIH1cblxuLy8gU29jaWFsIE1lZGlhIENvbG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuQGVhY2ggJHNvY2lhbC1uYW1lLCAkY29sb3IgaW4gJHNvY2lhbC1jb2xvcnMge1xuICAuYy0jeyRzb2NpYWwtbmFtZX0geyBjb2xvcjogJGNvbG9yICFpbXBvcnRhbnQ7IH1cbiAgLmJnLSN7JHNvY2lhbC1uYW1lfSB7IGJhY2tncm91bmQtY29sb3I6ICRjb2xvciAhaW1wb3J0YW50OyB9XG59XG5cbi8vIEZhY2Vib29rIFNhdmVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyAuZmJTYXZlIHtcbi8vICAgJi1kcm9wZG93biB7XG4vLyAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbi8vICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xuLy8gICAgIGJvdHRvbTogMTAwJTtcbi8vICAgICBkaXNwbGF5OiBub25lO1xuLy8gICAgIG1heC13aWR0aDogMjAwcHg7XG4vLyAgICAgbWluLXdpZHRoOiAxMDBweDtcbi8vICAgICBwYWRkaW5nOiA4cHg7XG4vLyAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgMCk7XG4vLyAgICAgei1pbmRleDogMTA7XG5cbi8vICAgICAmLmlzLXZpc2libGUgeyBkaXNwbGF5OiBibG9jazsgfVxuLy8gICB9XG4vLyB9XG5cbi8vIFJvY2tldCBmb3IgcmV0dXJuIHRvcCBwYWdlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnJvY2tldCB7XG4gIGJvdHRvbTogNTBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICByaWdodDogMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogNjBweDtcbiAgei1pbmRleDogODg4O1xuXG4gICY6aG92ZXIgc3ZnIHBhdGgge1xuICAgIGZpbGw6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICB9XG59XG5cbi5zdmdJY29uIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG5zdmcge1xuICBoZWlnaHQ6IGF1dG87XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4vLyBMb2FkIE1vcmVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ubG9hZE1vcmUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxNXB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgbWF4LXdpZHRoOiAxMDAwcHg7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5sb2FkaW5nQmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ4ZTc5YTtcbiAgZGlzcGxheTogbm9uZTtcbiAgaGVpZ2h0OiAycHg7XG4gIGxlZnQ6IDA7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICB6LWluZGV4OiA4MDA7XG59XG5cbi5pcy1sb2FkaW5nIC5sb2FkaW5nQmFyIHtcbiAgYW5pbWF0aW9uOiBsb2FkaW5nLWJhciAxcyBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgYW5pbWF0aW9uLWRlbGF5OiAuOHM7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuIiwiLy8gSGVhZGluZ3NcclxuXHJcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsXHJcbi5oMSwgLmgyLCAuaDMsIC5oNCwgLmg1LCAuaDYge1xyXG4gIGNvbG9yOiAkaGVhZGluZ3MtY29sb3I7XHJcbiAgZm9udC1mYW1pbHk6ICRoZWFkaW5ncy1mb250LWZhbWlseTtcclxuICBmb250LXdlaWdodDogJGhlYWRpbmdzLWZvbnQtd2VpZ2h0O1xyXG4gIGxpbmUtaGVpZ2h0OiAkaGVhZGluZ3MtbGluZS1oZWlnaHQ7XHJcbiAgbWFyZ2luOiAwO1xyXG5cclxuICBhIHtcclxuICAgIGNvbG9yOiBpbmhlcml0O1xyXG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgfVxyXG59XHJcblxyXG5oMSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMTsgfVxyXG5oMiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMjsgfVxyXG5oMyB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMzsgfVxyXG5oNCB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNDsgfVxyXG5oNSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNTsgfVxyXG5oNiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNjsgfVxyXG5cclxuLy8gVGhlc2UgZGVjbGFyYXRpb25zIGFyZSBrZXB0IHNlcGFyYXRlIGZyb20gYW5kIHBsYWNlZCBhZnRlclxyXG4vLyB0aGUgcHJldmlvdXMgdGFnLWJhc2VkIGRlY2xhcmF0aW9ucyBzbyB0aGF0IHRoZSBjbGFzc2VzIGJlYXQgdGhlIHRhZ3MgaW5cclxuLy8gdGhlIENTUyBjYXNjYWRlLCBhbmQgdGh1cyA8aDEgY2xhc3M9XCJoMlwiPiB3aWxsIGJlIHN0eWxlZCBsaWtlIGFuIGgyLlxyXG4uaDEgeyBmb250LXNpemU6ICRmb250LXNpemUtaDE7IH1cclxuLmgyIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgyOyB9XHJcbi5oMyB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMzsgfVxyXG4uaDQgeyBmb250LXNpemU6ICRmb250LXNpemUtaDQ7IH1cclxuLmg1IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg1OyB9XHJcbi5oNiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNjsgfVxyXG5cclxucCB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcbiIsIi8vIGNvbG9yXHJcbi51LXRleHRDb2xvck5vcm1hbCB7XHJcbiAgLy8gY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KSAhaW1wb3J0YW50O1xyXG4gIC8vIGZpbGw6IHJnYmEoMCwgMCwgMCwgLjQ0KSAhaW1wb3J0YW50O1xyXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC41NCkgIWltcG9ydGFudDtcclxuICBmaWxsOiByZ2JhKDAsIDAsIDAsIC41NCkgIWltcG9ydGFudDtcclxufVxyXG5cclxuLnUtdGV4dENvbG9yV2hpdGUge1xyXG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XHJcbiAgZmlsbDogI2ZmZiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4udS1ob3ZlckNvbG9yTm9ybWFsOmhvdmVyIHtcclxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAuNik7XHJcbn1cclxuXHJcbi51LWFjY2VudENvbG9yLS1pY29uTm9ybWFsIHtcclxuICBjb2xvcjogJHByaW1hcnktY29sb3I7XHJcbiAgZmlsbDogJHByaW1hcnktY29sb3I7XHJcbn1cclxuXHJcbi8vICBiYWNrZ3JvdW5kIGNvbG9yXHJcbi51LWJnQ29sb3IgeyBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjsgfVxyXG5cclxuLnUtaGVhZGVyQ29sb3JMaW5rIGEge1xyXG4gIC8vIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XHJcbiAgY29sb3I6ICRoZWFkZXItY29sb3I7XHJcblxyXG4gICYuYWN0aXZlLFxyXG4gICY6aG92ZXIge1xyXG4gICAgLy8gY29sb3I6ICRoZWFkZXItXHJcbiAgICBjb2xvcjogJGhlYWRlci1jb2xvci1ob3ZlcjtcclxuICB9XHJcbn1cclxuXHJcbi51LXRleHRDb2xvckRhcmtlciB7IEBleHRlbmQgJXUtdGV4dC1jb2xvci1kYXJrZXI7IH1cclxuXHJcbi8vIFBvc2l0aW9uc1xyXG4udS1yZWxhdGl2ZSB7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxyXG4udS1hYnNvbHV0ZSB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgfVxyXG4udS1hYnNvbHV0ZTAgeyBAZXh0ZW5kICV1LWFic29sdXRlMDsgfVxyXG4udS1maXhlZCB7IHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50OyB9XHJcblxyXG4udS1ibG9jayB7IGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQgfVxyXG4udS1pbmxpbmVCbG9jayB7IGRpc3BsYXk6IGlubGluZS1ibG9jayB9XHJcblxyXG4vLyAgQmFja2dyb3VuZFxyXG4udS1iYWNrZ3JvdW5kRGFyayB7XHJcbiAgLy8gYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLCAwLCAwLCAuMykgMjklLCByZ2JhKDAsIDAsIDAsIC42KSA4MSUpO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHRvcDogMDtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcblxyXG4vLyAudS1iYWNrZ3JvdW5kLXdoaXRlIHsgYmFja2dyb3VuZC1jb2xvcjogI2VlZWZlZTsgfVxyXG4udS1iYWNrZ3JvdW5kV2hpdGUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhOyB9XHJcbi51LWJhY2tncm91bmRDb2xvckdyYXlMaWdodCB7IGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjAgIWltcG9ydGFudDsgfVxyXG5cclxuLy8gQ2xlYXJcclxuLnUtY2xlYXIge1xyXG4gICY6OmJlZm9yZSxcclxuICAmOjphZnRlciB7XHJcbiAgICBjb250ZW50OiBcIiBcIjtcclxuICAgIGRpc3BsYXk6IHRhYmxlO1xyXG4gIH1cclxuICAmOjphZnRlciB7IGNsZWFyOiBib3RoOyB9XHJcbn1cclxuXHJcbi8vIGZvbnQgc2l6ZVxyXG4udS1mb250U2l6ZTEzIHsgZm9udC1zaXplOiAxM3B4ICFpbXBvcnRhbnQgfVxyXG4udS1mb250U2l6ZTE0IHsgZm9udC1zaXplOiAxNHB4IH1cclxuLnUtZm9udFNpemUxNSB7IGZvbnQtc2l6ZTogMTVweCAhaW1wb3J0YW50IH1cclxuLnUtZm9udFNpemUyMCB7IGZvbnQtc2l6ZTogMjBweCB9XHJcbi51LWZvbnRTaXplMjEgeyBmb250LXNpemU6IDIxcHggfVxyXG4udS1mb250U2l6ZTIyIHsgZm9udC1zaXplOiAyMnB4IH1cclxuLnUtZm9udFNpemUyOCB7IGZvbnQtc2l6ZTogMjhweCAhaW1wb3J0YW50OyB9XHJcbi51LWZvbnRTaXplMzYgeyBmb250LXNpemU6IDM2cHggfVxyXG4udS1mb250U2l6ZTQwIHsgZm9udC1zaXplOiA0MHB4IH1cclxuLnUtZm9udFNpemVCYXNlIHsgZm9udC1zaXplOiAxOHB4IH1cclxuLnUtZm9udFNpemVKdW1ibyB7IGZvbnQtc2l6ZTogNTBweCB9XHJcbi51LWZvbnRTaXplTGFyZ2UgeyBmb250LXNpemU6IDI0cHggIWltcG9ydGFudCB9XHJcbi51LWZvbnRTaXplTGFyZ2VyIHsgZm9udC1zaXplOiAzMnB4IH1cclxuLnUtZm9udFNpemVMYXJnZXN0IHsgZm9udC1zaXplOiA0NHB4IH1cclxuLnUtZm9udFNpemVNaWNybyB7IGZvbnQtc2l6ZTogMTFweCB9XHJcbi51LWZvbnRTaXplU21hbGwgeyBmb250LXNpemU6IDE2cHggfVxyXG4udS1mb250U2l6ZVNtYWxsZXIgeyBmb250LXNpemU6IDE0cHggfVxyXG4udS1mb250U2l6ZVNtYWxsZXN0IHsgZm9udC1zaXplOiAxMnB4IH1cclxuXHJcbkBtZWRpYSAjeyRtZC1hbmQtZG93bn0ge1xyXG4gIC51LW1kLWZvbnRTaXplQmFzZSB7IGZvbnQtc2l6ZTogMThweCAhaW1wb3J0YW50IH1cclxuICAudS1tZC1mb250U2l6ZUxhcmdlciB7IGZvbnQtc2l6ZTogMzJweCB9XHJcbn1cclxuXHJcbi8vIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4vLyAgIC51LXhzLWZvbnRTaXplQmFzZSB7Zm9udC1zaXplOiAxOHB4fVxyXG4vLyAgIC51LXhzLWZvbnRTaXplMTMge2ZvbnQtc2l6ZTogMTNweH1cclxuLy8gICAudS14cy1mb250U2l6ZVNtYWxsZXIge2ZvbnQtc2l6ZTogMTRweH1cclxuLy8gICAudS14cy1mb250U2l6ZVNtYWxsIHtmb250LXNpemU6IDE2cHh9XHJcbi8vICAgLnUteHMtZm9udFNpemUyMiB7Zm9udC1zaXplOiAyMnB4fVxyXG4vLyAgIC51LXhzLWZvbnRTaXplTGFyZ2Uge2ZvbnQtc2l6ZTogMjRweH1cclxuLy8gICAudS14cy1mb250U2l6ZTQwIHtmb250LXNpemU6IDQwcHh9XHJcbi8vICAgLnUteHMtZm9udFNpemVMYXJnZXIge2ZvbnQtc2l6ZTogMzJweH1cclxuLy8gICAudS14cy1mb250U2l6ZVNtYWxsZXN0IHtmb250LXNpemU6IDEycHh9XHJcbi8vIH1cclxuXHJcbi8vIGZvbnQgd2VpZ2h0XHJcbi51LWZvbnRXZWlnaHRUaGluIHsgZm9udC13ZWlnaHQ6IDMwMCB9XHJcbi51LWZvbnRXZWlnaHROb3JtYWwgeyBmb250LXdlaWdodDogNDAwIH1cclxuLy8gLnUtZm9udFdlaWdodE1lZGl1bSB7IGZvbnQtd2VpZ2h0OiA1MDAgfVxyXG4udS1mb250V2VpZ2h0U2VtaWJvbGQgeyBmb250LXdlaWdodDogNjAwICFpbXBvcnRhbnQgfVxyXG4udS1mb250V2VpZ2h0Qm9sZCB7IGZvbnQtd2VpZ2h0OiA3MDAgfVxyXG5cclxuLnUtdGV4dFVwcGVyY2FzZSB7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2UgfVxyXG4udS10ZXh0Q2FwaXRhbGl6ZSB7IHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplIH1cclxuLnUtdGV4dEFsaWduQ2VudGVyIHsgdGV4dC1hbGlnbjogY2VudGVyIH1cclxuXHJcbi51LW5vV3JhcFdpdGhFbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzICFpbXBvcnRhbnQ7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4vLyBNYXJnaW5cclxuLnUtbWFyZ2luQXV0byB7IG1hcmdpbi1sZWZ0OiBhdXRvOyBtYXJnaW4tcmlnaHQ6IGF1dG87IH1cclxuLnUtbWFyZ2luVG9wMjAgeyBtYXJnaW4tdG9wOiAyMHB4IH1cclxuLnUtbWFyZ2luVG9wMzAgeyBtYXJnaW4tdG9wOiAzMHB4IH1cclxuLnUtbWFyZ2luQm90dG9tMTUgeyBtYXJnaW4tYm90dG9tOiAxNXB4IH1cclxuLnUtbWFyZ2luQm90dG9tMjAgeyBtYXJnaW4tYm90dG9tOiAyMHB4ICFpbXBvcnRhbnQgfVxyXG4udS1tYXJnaW5Cb3R0b20zMCB7IG1hcmdpbi1ib3R0b206IDMwcHggfVxyXG4udS1tYXJnaW5Cb3R0b200MCB7IG1hcmdpbi1ib3R0b206IDQwcHggfVxyXG5cclxuLy8gcGFkZGluZ1xyXG4udS1wYWRkaW5nMCB7IHBhZGRpbmc6IDAgIWltcG9ydGFudCB9XHJcbi51LXBhZGRpbmcyMCB7IHBhZGRpbmc6IDIwcHggfVxyXG4udS1wYWRkaW5nMTUgeyBwYWRkaW5nOiAxNXB4ICFpbXBvcnRhbnQ7IH1cclxuLnUtcGFkZGluZ0JvdHRvbTIgeyBwYWRkaW5nLWJvdHRvbTogMnB4OyB9XHJcbi51LXBhZGRpbmdCb3R0b20zMCB7IHBhZGRpbmctYm90dG9tOiAzMHB4OyB9XHJcbi51LXBhZGRpbmdCb3R0b20yMCB7IHBhZGRpbmctYm90dG9tOiAyMHB4IH1cclxuLnUtcGFkZGluZ1JpZ2h0MTAgeyBwYWRkaW5nLXJpZ2h0OiAxMHB4IH1cclxuLnUtcGFkZGluZ0xlZnQxNSB7IHBhZGRpbmctbGVmdDogMTVweCB9XHJcblxyXG4udS1wYWRkaW5nVG9wMiB7IHBhZGRpbmctdG9wOiAycHggfVxyXG4udS1wYWRkaW5nVG9wNSB7IHBhZGRpbmctdG9wOiA1cHg7IH1cclxuLnUtcGFkZGluZ1RvcDEwIHsgcGFkZGluZy10b3A6IDEwcHg7IH1cclxuLnUtcGFkZGluZ1RvcDE1IHsgcGFkZGluZy10b3A6IDE1cHg7IH1cclxuLnUtcGFkZGluZ1RvcDIwIHsgcGFkZGluZy10b3A6IDIwcHg7IH1cclxuLnUtcGFkZGluZ1RvcDMwIHsgcGFkZGluZy10b3A6IDMwcHg7IH1cclxuXHJcbi51LXBhZGRpbmdCb3R0b20xNSB7IHBhZGRpbmctYm90dG9tOiAxNXB4OyB9XHJcblxyXG4udS1wYWRkaW5nUmlnaHQyMCB7IHBhZGRpbmctcmlnaHQ6IDIwcHggfVxyXG4udS1wYWRkaW5nTGVmdDIwIHsgcGFkZGluZy1sZWZ0OiAyMHB4IH1cclxuXHJcbi51LWNvbnRlbnRUaXRsZSB7XHJcbiAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IC0uMDI4ZW07XHJcbn1cclxuXHJcbi8vIGxpbmUtaGVpZ2h0XHJcbi51LWxpbmVIZWlnaHQxIHsgbGluZS1oZWlnaHQ6IDE7IH1cclxuLnUtbGluZUhlaWdodFRpZ2h0IHsgbGluZS1oZWlnaHQ6IDEuMiB9XHJcblxyXG4vLyBvdmVyZmxvd1xyXG4udS1vdmVyZmxvd0hpZGRlbiB7IG92ZXJmbG93OiBoaWRkZW4gfVxyXG5cclxuLy8gZmxvYXRcclxuLnUtZmxvYXRSaWdodCB7IGZsb2F0OiByaWdodDsgfVxyXG4udS1mbG9hdExlZnQgeyBmbG9hdDogbGVmdDsgfVxyXG5cclxuLy8gIGZsZXhcclxuLnUtZmxleCB7IGRpc3BsYXk6IGZsZXg7IH1cclxuLnUtZmxleENlbnRlciB7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGRpc3BsYXk6IGZsZXg7IH1cclxuLy8gLnUtZmxleC0tMSB7IGZsZXg6IDEgfVxyXG4udS1mbGV4MSB7IGZsZXg6IDEgMSBhdXRvOyB9XHJcbi51LWZsZXgwIHsgZmxleDogMCAwIGF1dG87IH1cclxuLnUtZmxleFdyYXAgeyBmbGV4LXdyYXA6IHdyYXAgfVxyXG5cclxuLnUtZmxleENvbHVtbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4udS1mbGV4RW5kIHtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbn1cclxuXHJcbi51LWZsZXhDb2x1bW5Ub3Age1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbi8vIEJhY2tncm91bmRcclxuLnUtYmFja2dyb3VuZFNpemVDb3ZlciB7XHJcbiAgYmFja2dyb3VuZC1vcmlnaW46IGJvcmRlci1ib3g7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuXHJcbi8vIG1heCB3aWRodFxyXG4udS1jb250YWluZXIge1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogYXV0bztcclxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMjBweDtcclxufVxyXG5cclxuLnUtbWF4V2lkdGgxMjAwIHsgbWF4LXdpZHRoOiAxMjAwcHggfVxyXG4udS1tYXhXaWR0aDEwMDAgeyBtYXgtd2lkdGg6IDEwMDBweCB9XHJcbi51LW1heFdpZHRoNzQwIHsgbWF4LXdpZHRoOiA3NDBweCB9XHJcbi51LW1heFdpZHRoMTA0MCB7IG1heC13aWR0aDogMTA0MHB4IH1cclxuLnUtc2l6ZUZ1bGxXaWR0aCB7IHdpZHRoOiAxMDAlIH1cclxuXHJcbi8vIGJvcmRlclxyXG4udS1ib3JkZXJMaWdodGVyIHsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMTUpOyB9XHJcbi51LXJvdW5kIHsgYm9yZGVyLXJhZGl1czogNTAlIH1cclxuLnUtYm9yZGVyUmFkaXVzMiB7IGJvcmRlci1yYWRpdXM6IDJweCB9XHJcblxyXG4udS1ib3hTaGFkb3dCb3R0b20ge1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDJweCAtMnB4IHJnYmEoMCwgMCwgMCwgLjA1KTtcclxufVxyXG5cclxuLy8gSGVpbmdodFxyXG4udS1oZWlnaHQ1NDAgeyBoZWlnaHQ6IDU0MHB4IH1cclxuLnUtaGVpZ2h0MjgwIHsgaGVpZ2h0OiAyODBweCB9XHJcbi51LWhlaWdodDI2MCB7IGhlaWdodDogMjYwcHggfVxyXG4udS1oZWlnaHQxMDAgeyBoZWlnaHQ6IDEwMHB4IH1cclxuLnUtYm9yZGVyQmxhY2tMaWdodGVzdCB7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjEpIH1cclxuXHJcbi8vIGhpZGUgZ2xvYmFsXHJcbi51LWhpZGUgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQgfVxyXG5cclxuLy8gY2FyZFxyXG4udS1jYXJkIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjA5KTtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgLy8gYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgLjA0KTtcclxuICBib3gtc2hhZG93OiAwIDFweCA3cHggcmdiYSgwLCAwLCAwLCAuMDUpO1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgcGFkZGluZzogMTBweCAyMHB4IDE1cHg7XHJcbn1cclxuXHJcbi5uby1hdmF0YXIge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi4vaW1hZ2VzL2F2YXRhci5wbmcnKSAhaW1wb3J0YW50XHJcbn1cclxuXHJcbkBtZWRpYSAjeyRtZC1hbmQtZG93bn0ge1xyXG4gIC51LWhpZGUtYmVmb3JlLW1kIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50IH1cclxuICAudS1tZC1oZWlnaHRBdXRvIHsgaGVpZ2h0OiBhdXRvOyB9XHJcbiAgLnUtbWQtaGVpZ2h0MTcwIHsgaGVpZ2h0OiAxNzBweCB9XHJcbiAgLnUtbWQtcmVsYXRpdmUgeyBwb3NpdGlvbjogcmVsYXRpdmUgfVxyXG59XHJcblxyXG5AbWVkaWEgI3skbGctYW5kLWRvd259IHsgLnUtaGlkZS1iZWZvcmUtbGcgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQgfSB9XHJcblxyXG4vLyBoaWRlIGFmdGVyXHJcbkBtZWRpYSAjeyRtZC1hbmQtdXB9IHsgLnUtaGlkZS1hZnRlci1tZCB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9IH1cclxuXHJcbkBtZWRpYSAjeyRsZy1hbmQtdXB9IHsgLnUtaGlkZS1hZnRlci1sZyB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9IH1cclxuIiwiQG1lZGlhICN7JGxnLWFuZC11cH0ge1xyXG4gIC5jb250ZW50IHtcclxuICAgIC8vIGZsZXg6IDEgIWltcG9ydGFudDtcclxuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gMzQwcHgpICFpbXBvcnRhbnQ7XHJcbiAgICAvLyBvcmRlcjogMTtcclxuICAgIC8vIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgfVxyXG5cclxuICAuc2lkZWJhciB7XHJcbiAgICB3aWR0aDogMzQwcHggIWltcG9ydGFudDtcclxuICAgIC8vIGZsZXg6IDAgMCAzNDBweCAhaW1wb3J0YW50O1xyXG4gICAgLy8gb3JkZXI6IDI7XHJcbiAgfVxyXG59XHJcblxyXG4ucm93IHtcclxuICBtYXJnaW4tbGVmdDogLSAxMHB4O1xyXG4gIG1hcmdpbi1yaWdodDogLSAxMHB4O1xyXG5cclxuICBAZXh0ZW5kIC51LWNsZWFyO1xyXG5cclxuICAuY29sIHtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuXHJcbiAgICAkaTogMTtcclxuXHJcbiAgICBAd2hpbGUgJGkgPD0gJG51bS1jb2xzIHtcclxuICAgICAgJHBlcmM6IHVucXVvdGUoKDEwMCAvICgkbnVtLWNvbHMgLyAkaSkpICsgXCIlXCIpO1xyXG5cclxuICAgICAgJi5zI3skaX0ge1xyXG4gICAgICAgIHdpZHRoOiAkcGVyYztcclxuICAgICAgfVxyXG5cclxuICAgICAgJGk6ICRpICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBAbWVkaWEgI3skbWQtYW5kLXVwfSB7XHJcblxyXG4gICAgICAkaTogMTtcclxuXHJcbiAgICAgIEB3aGlsZSAkaSA8PSAkbnVtLWNvbHMge1xyXG4gICAgICAgICRwZXJjOiB1bnF1b3RlKCgxMDAgLyAoJG51bS1jb2xzIC8gJGkpKSArIFwiJVwiKTtcclxuXHJcbiAgICAgICAgJi5tI3skaX0ge1xyXG4gICAgICAgICAgd2lkdGg6ICRwZXJjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGk6ICRpICsgMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBtZWRpYSAjeyRsZy1hbmQtdXB9IHtcclxuXHJcbiAgICAgICRpOiAxO1xyXG5cclxuICAgICAgQHdoaWxlICRpIDw9ICRudW0tY29scyB7XHJcbiAgICAgICAgJHBlcmM6IHVucXVvdGUoKDEwMCAvICgkbnVtLWNvbHMgLyAkaSkpICsgXCIlXCIpO1xyXG5cclxuICAgICAgICAmLmwjeyRpfSB7XHJcbiAgICAgICAgICB3aWR0aDogJHBlcmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkaTogJGkgKyAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi5idXR0b24ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDApO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC4xNSk7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtZmFtaWx5OiAkcHJpbWFyeS1mb250O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgaGVpZ2h0OiAzN3B4O1xuICBsZXR0ZXItc3BhY2luZzogMDtcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XG4gIHBhZGRpbmc6IDAgMTZweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgJi0tY2hyb21lbGVzcyB7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICBib3JkZXItd2lkdGg6IDA7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNDQpO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG5cbiAgICAmOmFjdGl2ZSxcbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgYm9yZGVyLXdpZHRoOiAwO1xuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgIH1cbiAgfVxuXG4gICYtLWxhcmdlIHtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgaGVpZ2h0OiA0NHB4O1xuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xuICAgIHBhZGRpbmc6IDAgMThweDtcbiAgfVxuXG4gICYtLWRhcmsge1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgLjgpO1xuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjgpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBQcmltYXJ5XG4uYnV0dG9uLS1wcmltYXJ5IHtcbiAgYm9yZGVyLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcbiAgY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xufVxuXG4uYnV0dG9uLS1sYXJnZS5idXR0b24tLWNocm9tZWxlc3MsXG4uYnV0dG9uLS1sYXJnZS5idXR0b24tLWxpbmsge1xuICBwYWRkaW5nOiAwO1xufVxuXG4uYnV0dG9uU2V0IHtcbiAgPiAuYnV0dG9uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB9XG5cbiAgPiAuYnV0dG9uOmxhc3QtY2hpbGQge1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgfVxuXG4gIC5idXR0b24tLWNocm9tZWxlc3Mge1xuICAgIGhlaWdodDogMzdweDtcbiAgICBsaW5lLWhlaWdodDogMzVweDtcbiAgfVxuXG4gIC5idXR0b24tLWxhcmdlLmJ1dHRvbi0tY2hyb21lbGVzcyxcbiAgLmJ1dHRvbi0tbGFyZ2UuYnV0dG9uLS1saW5rIHtcbiAgICBoZWlnaHQ6IDQ0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDQycHg7XG4gIH1cblxuICAmID4gLmJ1dHRvbi0tY2hyb21lbGVzczpsYXN0LWNoaWxkIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICB9XG5cbiAgJiA+IC5idXR0b24tLWNocm9tZWxlc3M6bm90KC5idXR0b24tLWNpcmNsZSkge1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG4gIH1cblxuICAmID4gLmJ1dHRvbi0tY2hyb21lbGVzcyArIC5idXR0b24tLWNocm9tZWxlc3M6bm90KC5idXR0b24tLWNpcmNsZSkge1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIHBhZGRpbmctbGVmdDogOHB4O1xuICB9XG59XG4iLCIvLyBzdHlsZWxpbnQtZGlzYWJsZVxyXG5AZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogJ3NpbXBseSc7XHJcbiAgc3JjOiAgdXJsKCcuLi9mb250cy9zaW1wbHkuZW90PzI1NzY0aicpO1xyXG4gIHNyYzogIHVybCgnLi4vZm9udHMvc2ltcGx5LmVvdD8yNTc2NGojaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXHJcbiAgICB1cmwoJy4uL2ZvbnRzL3NpbXBseS50dGY/MjU3NjRqJykgZm9ybWF0KCd0cnVldHlwZScpLFxyXG4gICAgdXJsKCcuLi9mb250cy9zaW1wbHkud29mZj8yNTc2NGonKSBmb3JtYXQoJ3dvZmYnKSxcclxuICAgIHVybCgnLi4vZm9udHMvc2ltcGx5LnN2Zz8yNTc2NGojc2ltcGx5JykgZm9ybWF0KCdzdmcnKTtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxufVxyXG5cclxuW2NsYXNzXj1cImktXCJdOjpiZWZvcmUsIFtjbGFzcyo9XCIgaS1cIl06OmJlZm9yZSB7XHJcbiAgQGV4dGVuZCAlZm9udHMtaWNvbnM7XHJcbn1cclxuXHJcblxyXG4uaS1hdWRpbzpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlOTAxXCI7XHJcbn1cclxuLmktcm9ja2V0OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU5MDJcIjtcclxuICBjb2xvcjogIzk5OTtcclxufVxyXG4uaS1jb21tZW50czpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlOTAwXCI7XHJcbn1cclxuLmktZ29vZ2xlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxYTBcIjtcclxufVxyXG4uaS10ZWxlZ3JhbTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMmM2XCI7XHJcbn1cclxuLmktbGluazpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMGMxXCI7XHJcbn1cclxuLmktcmVkZGl0OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYyODFcIjtcclxufVxyXG4uaS10d2l0dGVyOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYwOTlcIjtcclxufVxyXG4uaS1naXRodWI6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjA5YlwiO1xyXG59XHJcbi5pLWxpbmtlZGluOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYwZTFcIjtcclxufVxyXG4uaS15b3V0dWJlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxNmFcIjtcclxufVxyXG4uaS1zdGFjay1vdmVyZmxvdzpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTZjXCI7XHJcbn1cclxuLmktaW5zdGFncmFtOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxNmRcIjtcclxufVxyXG4uaS1mbGlja3I6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjE2ZVwiO1xyXG59XHJcbi5pLWRyaWJiYmxlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxN2RcIjtcclxufVxyXG4uaS1iZWhhbmNlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxYjRcIjtcclxufVxyXG4uaS1zcG90aWZ5OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxYmNcIjtcclxufVxyXG4uaS1jb2RlcGVuOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxY2JcIjtcclxufVxyXG4uaS1mYWNlYm9vazpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMjMwXCI7XHJcbn1cclxuLmktcGludGVyZXN0OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYyMzFcIjtcclxufVxyXG4uaS13aGF0c2FwcDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMjMyXCI7XHJcbn1cclxuLmktc25hcGNoYXQ6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjJhY1wiO1xyXG59XHJcbi5pLWFycm93X2xlZnQ6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTMxNFwiO1xyXG59XHJcbi5pLWFycm93X3JpZ2h0OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGUzMTVcIjtcclxufVxyXG4uaS1wbGF5OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGUwMzdcIjtcclxufVxyXG4uaS1zdGFyLWxpbmU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTgzYVwiO1xyXG59XHJcbi5pLXBob3RvOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU0MTJcIjtcclxufVxyXG4uaS1sb2NhdGlvbjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlOGI0XCI7XHJcbn1cclxuLmktY2hlY2stY2lyY2xlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4NmNcIjtcclxufVxyXG4uaS1jbG9zZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlNWNkXCI7XHJcbn1cclxuLmktZmF2b3JpdGU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTg3ZFwiO1xyXG59XHJcbi5pLXN0YXI6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTgzOFwiO1xyXG59XHJcbi5pLXdhcm5pbmc6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTAwMlwiO1xyXG59XHJcbi5pLXJzczpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlMGU1XCI7XHJcbn1cclxuLmktc2VhcmNoOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4YjZcIjtcclxufVxyXG4uaS1zZW5kOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGUxNjNcIjtcclxufVxyXG4uaS1zaGFyZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlODBkXCI7XHJcbn1cclxuIiwiLy8gYW5pbWF0ZWQgR2xvYmFsXHJcbi5hbmltYXRlZCB7XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcclxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xyXG5cclxuICAmLmluZmluaXRlIHtcclxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xyXG4gIH1cclxufVxyXG5cclxuLy8gYW5pbWF0ZWQgQWxsXHJcbi5ib3VuY2VJbiB7IGFuaW1hdGlvbi1uYW1lOiBib3VuY2VJbjsgfVxyXG4uYm91bmNlSW5Eb3duIHsgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluRG93bjsgfVxyXG4ucHVsc2UgeyBhbmltYXRpb24tbmFtZTogcHVsc2U7IH1cclxuXHJcbi8vIGFsbCBrZXlmcmFtZXMgQW5pbWF0ZXNcclxuLy8gYm91bmNlSW5cclxuQGtleWZyYW1lcyBib3VuY2VJbiB7XHJcbiAgMCUsXHJcbiAgMjAlLFxyXG4gIDQwJSxcclxuICA2MCUsXHJcbiAgODAlLFxyXG4gIDEwMCUgeyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKTsgfVxyXG4gIDAlIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiBzY2FsZTNkKC4zLCAuMywgLjMpOyB9XHJcbiAgMjAlIHsgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMSwgMS4xLCAxLjEpOyB9XHJcbiAgNDAlIHsgdHJhbnNmb3JtOiBzY2FsZTNkKC45LCAuOSwgLjkpOyB9XHJcbiAgNjAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpOyB9XHJcbiAgODAlIHsgdHJhbnNmb3JtOiBzY2FsZTNkKC45NywgLjk3LCAuOTcpOyB9XHJcbiAgMTAwJSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfVxyXG59XHJcblxyXG4vLyBib3VuY2VJbkRvd25cclxuQGtleWZyYW1lcyBib3VuY2VJbkRvd24ge1xyXG4gIDAlLFxyXG4gIDYwJSxcclxuICA3NSUsXHJcbiAgOTAlLFxyXG4gIDEwMCUgeyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMjE1LCA2MTAsIDM1NSwgMSk7IH1cclxuICAwJSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgLTMwMDBweCwgMCk7IH1cclxuICA2MCUgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDI1cHgsIDApOyB9XHJcbiAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMTBweCwgMCk7IH1cclxuICA5MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDVweCwgMCk7IH1cclxuICAxMDAlIHsgdHJhbnNmb3JtOiBub25lOyB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgcHVsc2Uge1xyXG4gIGZyb20geyB0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7IH1cclxuICA1MCUgeyB0cmFuc2Zvcm06IHNjYWxlM2QoMS4yLCAxLjIsIDEuMik7IH1cclxuICB0byB7IHRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNjcm9sbCB7XHJcbiAgMCUgeyBvcGFjaXR5OiAwOyB9XHJcbiAgMTAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIH1cclxuICAxMDAlIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpOyB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgb3BhY2l0eSB7XHJcbiAgMCUgeyBvcGFjaXR5OiAwOyB9XHJcbiAgNTAlIHsgb3BhY2l0eTogMDsgfVxyXG4gIDEwMCUgeyBvcGFjaXR5OiAxOyB9XHJcbn1cclxuXHJcbi8vICBzcGluIGZvciBwYWdpbmF0aW9uXHJcbkBrZXlmcmFtZXMgc3BpbiB7XHJcbiAgZnJvbSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XHJcbiAgdG8geyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgdG9vbHRpcCB7XHJcbiAgMCUgeyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCA2cHgpOyB9XHJcbiAgMTAwJSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApOyB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgbG9hZGluZy1iYXIge1xyXG4gIDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKSB9XHJcbiAgNDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApIH1cclxuICA2MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCkgfVxyXG4gIDEwMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSkgfVxyXG59XHJcbiIsIi8vIEhlYWRlclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLmJ1dHRvbi1zZWFyY2gtLW9wZW4ge1xuICBwYWRkaW5nLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XG59XG5cbi8vIGJ1dHRvbi1uYXZcbi5idXR0b24tbmF2LS10b2dnbGUge1xuICBoZWlnaHQ6IDQ4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC40cztcbiAgd2lkdGg6IDQ4cHg7XG5cbiAgc3BhbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGhlYWRlci1jb2xvcjtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBsZWZ0OiAxNHB4O1xuICAgIG1hcmdpbi10b3A6IC0xcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zaXRpb246IC40cztcbiAgICB3aWR0aDogMjBweDtcblxuICAgICY6Zmlyc3QtY2hpbGQgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNnB4KTsgfVxuICAgICY6bGFzdC1jaGlsZCB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDZweCk7IH1cbiAgfVxufVxuXG4uaGVhZGVyIHtcbiAgei1pbmRleDogOTk5O1xuXG4gICYtd3JhcCB7IGhlaWdodDogNTVweDsgfVxuXG4gICYtbG9nbyB7XG4gICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDMwcHg7XG5cbiAgICBpbWcgeyBtYXgtaGVpZ2h0OiAxMDAlOyB9XG4gIH1cblxuICAmLWxvZ28sXG4gIC5idXR0b24tc2VhcmNoLS1vcGVuLFxuICAuYnV0dG9uLW5hdi0tdG9nZ2xlIHsgei1pbmRleDogMTUwOyB9XG5cbiAgLy8gaGVhZGVyIGRlc2NyaXB0aW9uIGhvbWUgcGFnZVxuICAmLWRlc2NyaXB0aW9uIHtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBtYXgtd2lkdGg6IDY1MHB4O1xuICB9XG59XG5cbi8vIG5vdCBoYXZlIGxvZ29cbi5ub3QtbG9nbyAuaGVhZGVyLWxvZ28geyBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudCB9XG5cbi8vIEhlYWRlciBGb2xsb3dcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi5mb2xsb3cgPiBhIHsgcGFkZGluZy1sZWZ0OiAxNXB4IH1cblxuLy8gSGVhZGVyIG1lbnVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi5uYXYge1xuICBwYWRkaW5nLXRvcDogOHB4O1xuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgdWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuXG4gIGxpIHtcbiAgICBmbG9hdDogbGVmdDtcblxuICAgIGEge1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbi1yaWdodDogMjJweDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgfVxuICB9XG59XG5cbi8vIE1lZGlhIFF1ZXJ5XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5AbWVkaWEgI3skbWQtYW5kLXVwfSB7XG4gIGJvZHkuaXMtaG9tZSB7XG4gICAgLmhlYWRlciB7XG4gICAgICAmLXdyYXAgeyBoZWlnaHQ6IDIwMHB4OyB9XG5cbiAgICAgICYtbG9nbyB7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBNYWluIE1lbnUgRml4ZWRcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gLm1haW5NZW51LS1hZmZpeGVkIHtcbiAgLy8gICBwb3NpdGlvbjogZml4ZWQ7XG4gIC8vICAgdG9wOiAwO1xuICAvLyB9XG59XG5cbi8vIEhlYWRlciBtZW51XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuQG1lZGlhICN7JG1kLWFuZC1kb3dufSB7XG4gIC5oZWFkZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcblxuICAgICYtd3JhcCB7IGhlaWdodDogJGhlYWRlci1oZWlnaHQtbW9iaWxlIH1cbiAgfVxuXG4gIC5oZWFkZXItbG9nby0td3JhcCB7IHRleHQtYWxpZ246IGxlZnQgfVxuICAuaGVhZGVyLWxvZ28geyBkaXNwbGF5OiBmbGV4OyBmbGV4OiAxIDEgYXV0bzsgfVxuICAuaGVhZGVyLWxvZ28gc3BhbiB7IGZvbnQtc2l6ZTogMjRweCB9XG5cbiAgLmhlYWRlci10b3Age1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC8vIHNob3cgbWVudSBtb2JpbGVcbiAgYm9keS5pcy1zaG93TmF2TW9iIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgLnNpZGVOYXYgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH1cblxuICAgIC5idXR0b24tbmF2LS10b2dnbGUge1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuXG4gICAgICBzcGFuOmZpcnN0LWNoaWxkIHsgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpIHRyYW5zbGF0ZSgwLCAwKTsgfVxuICAgICAgc3BhbjpudGgtY2hpbGQoMikgeyB0cmFuc2Zvcm06IHNjYWxlWCgwKTsgfVxuICAgICAgc3BhbjpsYXN0LWNoaWxkIHsgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKSB0cmFuc2xhdGUoMCwgMCk7IH1cbiAgICB9XG5cbiAgICAuaGVhZGVyIC5idXR0b24tc2VhcmNoLS10b2dnbGUgeyBkaXNwbGF5OiBub25lOyB9XG4gICAgLm1haW4sIC5mb290ZXIgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1JSk7IH1cbiAgfVxufVxuIiwiLmF2YXRhci1pbWFnZS0tc21hbGxlciB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG59XHJcblxyXG4uYXZhdGFyLWltYWdlIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG59XHJcblxyXG4uc3Rvcnkge1xyXG4gICYtdGl0bGUge1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDI4ZW07XHJcbiAgICBsaW5lLWhlaWdodDogMjRweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgJi1leGNlcnB0IHtcclxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgbWF4LWhlaWdodDogNjBweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcclxuICAgIC13ZWJraXQtbGluZS1jbGFtcDogMztcclxuICB9XHJcblxyXG4gICYtdGFnIGkge1xyXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjMpICFpbXBvcnRhbnQ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgfVxyXG59XHJcblxyXG4vLyAgbWVkaWEgUXVlcnlcclxuQG1lZGlhICN7JG1kLWFuZC11cH0ge1xyXG4gIC5zdG9yeS0tMjYwIHtcclxuICAgIC5zdG9yeS13cmFwIHsgaGVpZ2h0OiAyNjBweCB9XHJcbiAgICAuc3RvcnktaW1hZ2UgeyBoZWlnaHQ6IDEwMHB4IH1cclxuXHJcbiAgICAuc3RvcnktYm9keSB7XHJcbiAgICAgIGhlaWdodDogMTYwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuc3RvcnktLTIwMCB7XHJcbiAgICAuc3Rvcnktd3JhcCB7IGhlaWdodDogMjYwcHg7IGRpc3BsYXk6IGZsZXggfVxyXG5cclxuICAgIC5zdG9yeS1ib2R5IHtcclxuICAgICAgZmxleDogMSAxIGF1dG87XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgIH1cclxuXHJcbiAgICAuc3RvcnktaW1hZ2Uge1xyXG4gICAgICBmbGV4OiAwIDAgYXV0bztcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICB3aWR0aDogMjAwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBjYXJkIGZvciAoYXV0aG9yIGFuZCB0YWcpIHN0b3J5XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi5jYXJkIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjA5KTtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgLjA0KTtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIHBhZGRpbmc6IDEwcHggMjBweCAxNXB4O1xyXG5cclxuICAmLS1wIHtcclxuICAgIGZvbnQtZmFtaWx5OiAkc2VjdW5kYXJ5LWZvbnQ7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDA0ZW07XHJcbiAgICBsaW5lLWhlaWdodDogMS41ODtcclxuICB9XHJcblxyXG4gICYtaW1hZ2Uge1xyXG4gICAgbWF4LWhlaWdodDogMjQwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDM2MHB4O1xyXG4gIH1cclxuXHJcbiAgLy8gaWYgc3RvcnkgaXMgZmVhdHVyZWRcclxuICAmLmNhcmQtLWxhcmdlIHtcclxuICAgIC5jYXJkLWJvZHkgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XHJcblxyXG4gICAgLmNhcmQtaW1hZ2Uge1xyXG4gICAgICBoZWlnaHQ6IDIwMHB4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgb3JkZXI6IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC5jYXJkLWltYWdlLS1saW5rIHtcclxuICAgICAgbGVmdDogNTAlO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogNTAlO1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBldmVuXHJcbiAgJi5jYXJkLS1tZWRpdW0ge1xyXG4gICAgLmNhcmQtZXhjZXJwdCB7XHJcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiAkcHJpbWFyeS1mb250O1xyXG4gICAgICBmb250LXNpemU6IDIzcHg7XHJcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAyMmVtO1xyXG4gICAgICBsaW5lLWhlaWdodDogMS4yMjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLmNvdmVyLWxhenkge1xyXG4gIG9wYWNpdHk6IC41O1xyXG4gIHotaW5kZXg6IDI7XHJcbn1cclxuXHJcbi8vIEhvbWUgUGFnZSBTdHlsZXNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIC5ob21lUGFnZSB7XHJcbi8vICAgLmVudHJ5IHtcclxuLy8gICAgIC51LWJhY2tncm91bmREYXJrIHsgZGlzcGxheTogbm9uZTsgfVxyXG4vLyAgICAgJi1pbWFnZSB7IGhlaWdodDogMTcycHg7IH1cclxuLy8gICB9XHJcbi8vIH1cclxuXHJcbi8vIEBtZWRpYSAjeyRtZC1hbmQtdXB9IHtcclxuLy8gICAuaG9tZVBhZ2Uge1xyXG4vLyAgICAgLmVudHJ5IHtcclxuLy8gICAgICAgJi1pbWFnZSB7IGhlaWdodDogMTc0cHg7IH1cclxuXHJcbi8vICAgICAgICYuZW50cnkxLFxyXG4vLyAgICAgICAmLmVudHJ5NyB7XHJcbi8vICAgICAgICAgZmxleC1iYXNpczogMTAwJTtcclxuLy8gICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICAgIC8vIGZpcnN0IHBvc3Qgd2l0aCBpbWcgNjYlXHJcbi8vICAgICAgICYuZW50cnkxIHtcclxuLy8gICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG5cclxuLy8gICAgICAgICAuZW50cnktaW1hZ2Uge1xyXG4vLyAgICAgICAgICAgaGVpZ2h0OiAzNTBweDtcclxuLy8gICAgICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuLy8gICAgICAgICAgIHdpZHRoOiA2Ni42NjY2NjY2NyUgIWltcG9ydGFudDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgLmVudHJ5LXRpdGxlIHtmb250LXNpemU6IDM2cHggIWltcG9ydGFudH1cclxuLy8gICAgICAgICAuZW50cnktYm9keSB7XHJcbi8vICAgICAgICAgICBwYWRkaW5nOiAwIDAgMCAxM3B4O1xyXG4vLyAgICAgICAgICAgd2lkdGg6IDMzLjMzMzMzMzMzJSAhaW1wb3J0YW50O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfVxyXG5cclxuLy8gICAgICAgLy8gZW50cnkgZnVsbCB3aXRoIGJhY2tncm91bmQgYWxsXHJcbi8vICAgICAgICYuZW50cnk3IHtcclxuLy8gICAgICAgICAuZW50cnktaW1hZ2Uge2hlaWdodDogNDUwcHg7fVxyXG4vLyAgICAgICAgIC5lbnRyeS10aXRsZSB7Zm9udC1zaXplOiA0NHB4ICFpbXBvcnRhbnR9XHJcbi8vICAgICAgICAgLmVudHJ5LWV4Y2VycHQgeyBmb250LXNpemU6IDI0cHg7IGxpbmUtaGVpZ2h0OiAxLjM7fVxyXG4vLyAgICAgICAgIC51LWFjY2VudENvbG9yLS1pY29uTm9ybWFsIHsgZmlsbDogI2ZmZjsgfVxyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgICAmLmVudHJ5NyxcclxuLy8gICAgICAgJi5lbnRyeTEzLFxyXG4vLyAgICAgICAmLmVudHJ5MTQge1xyXG4vLyAgICAgICAgIC51LWJhY2tncm91bmREYXJrIHsgZGlzcGxheTogYmxvY2s7IH1cclxuXHJcbi8vICAgICAgICAgLmVudHJ5LWJvZHkge1xyXG4vLyAgICAgICAgICAgYm90dG9tOiAwO1xyXG4vLyAgICAgICAgICAgbGVmdDogMDtcclxuLy8gICAgICAgICAgIG1hcmdpbjogMzBweCA0MHB4O1xyXG4vLyAgICAgICAgICAgbWF4LXdpZHRoOiA2MDBweDtcclxuLy8gICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICAgICAgICAgIHotaW5kZXg6IDI7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAmOm5vdCgubm90LS1pbWFnZSkge1xyXG4vLyAgICAgICAgICAgLmVudHJ5LWJvZHkge2NvbG9yOiAjZmZmO31cclxuLy8gICAgICAgICAgIC5lbnRyeS1hdXRob3Ige1xyXG4vLyAgICAgICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuOSk7XHJcbi8vICAgICAgICAgICAgIGEsIC5lbnRyeS1kYXRlIHtjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuOSk7IH1cclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICAgICYuZW50cnkxMywgJi5lbnRyeTE0IHtcclxuLy8gICAgICAgICAuZW50cnktaW1hZ2Uge2hlaWdodDogNDUwcHg7fVxyXG4vLyAgICAgICAgIC5lbnRyeS10aXRsZSB7Zm9udC1zaXplOiAzMnB4ICFpbXBvcnRhbnR9XHJcbi8vICAgICAgICAgLmVudHJ5LWV4Y2VycHQge2Rpc3BsYXk6IG5vbmU7fVxyXG4vLyAgICAgICAgIC5lbnRyeS1ieWxpbmUge21hcmdpbi10b3A6IDIwcHg7fVxyXG4vLyAgICAgICAgIC5lbnRyeS1ib2R5IHttYXgtd2lkdGg6IDQwMHB4O31cclxuLy8gICAgICAgfVxyXG5cclxuLy8gICAgICAgLy8gZW50cnkgNTAlXHJcbi8vICAgICAgICYuZW50cnk1LCAmLmVudHJ5NiwgJi5lbnRyeTExLCAmLmVudHJ5MTIge1xyXG4vLyAgICAgICAgIGZsZXgtYmFzaXM6IDUwJTtcclxuLy8gICAgICAgICBtYXgtd2lkdGg6IDUwJTtcclxuLy8gICAgICAgICAuZW50cnktaW1hZ2UgeyBoZWlnaHQ6IDI3NHB4O31cclxuLy8gICAgICAgfVxyXG5cclxuLy8gICAgICAgLy8gZW50cnkgMTNcclxuLy8gICAgICAgJi5lbnRyeTEzIHtcclxuLy8gICAgICAgICBmbGV4LWJhc2lzOiA2MCU7XHJcbi8vICAgICAgICAgbWF4LXdpZHRoOiA2MCU7XHJcbi8vICAgICAgICAgcGFkZGluZy1yaWdodDogMDtcclxuLy8gICAgICAgfVxyXG5cclxuLy8gICAgICAgLy8gZW50cnkgMTRcclxuLy8gICAgICAgJi5lbnRyeTE0IHtcclxuLy8gICAgICAgICBmbGV4LWJhc2lzOiA0MCU7XHJcbi8vICAgICAgICAgbWF4LXdpZHRoOiA0MCU7XHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vLyB9XHJcbiIsIi5wb3N0IHtcbiAgJi10aXRsZSB7XG4gICAgbGluZS1oZWlnaHQ6IDEuMDQ7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxuXG4gICYtZXhjZXJwdCB7XG4gICAgZm9udC1mYW1pbHk6ICRzZWN1bmRhcnktZm9udDtcbiAgICBmb250LXNpemU6IDIycHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICBsZXR0ZXItc3BhY2luZzogLS4wMjJlbTtcbiAgfVxuXG4gIC8vICYtZm9vdGVyIHtcbiAgLy8gICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLDAsMCwuMDUpO1xuICAvLyB9XG59XG5cbi8vIG1ldGEgbGluZVxuLnBvc3RNZXRhSW5saW5lIHtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNTQpO1xuICBmaWxsOiByZ2JhKDAsIDAsIDAsIC41NCk7XG59XG5cbi8vIHBvc3QgY29udGVudCBib2R5XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnBvc3QtYm9keSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgYSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLCAwLCAwLCAuNikgNTAlLCByZ2JhKDAsIDAsIDAsIDApIDUwJSk7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjA3ZW07XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICAgIGJhY2tncm91bmQtc2l6ZTogMnB4IC4xZW07XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB9XG5cbiAgaW1nIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgLy8gbWF4LXdpZHRoOiAxMDAwcHg7XG4gIH1cblxuICBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBsZXR0ZXItc3BhY2luZzogLS4wM2VtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjA0O1xuICAgIG1hcmdpbi10b3A6IDU0cHg7XG4gIH1cblxuICBoMyB7XG4gICAgZm9udC1zaXplOiAzMnB4O1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuMTU7XG4gICAgbWFyZ2luLXRvcDogNTJweDtcbiAgfVxuXG4gIGg0IHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDE4ZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuMjI7XG4gICAgbWFyZ2luLXRvcDogMzBweDtcbiAgfVxuXG4gIHAge1xuICAgIGZvbnQtZmFtaWx5OiAkc2VjdW5kYXJ5LWZvbnQ7XG4gICAgZm9udC1zaXplOiAxLjEyNXJlbTtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAwM2VtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjc7XG4gICAgbWFyZ2luLXRvcDogMjVweDtcbiAgfVxuXG4gIHVsLFxuICBvbCB7XG4gICAgY291bnRlci1yZXNldDogcG9zdDtcbiAgICBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250O1xuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XG4gICAgbWFyZ2luLXRvcDogMzBweDtcblxuICAgIGxpIHtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAwM2VtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDMwcHg7XG5cbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC03OHB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICB3aWR0aDogNzhweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1bCBsaTo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnXFwyMDIyJztcbiAgICBmb250LXNpemU6IDE2LjhweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICAgIHBhZGRpbmctdG9wOiAzcHg7XG4gIH1cblxuICBvbCBsaTo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBjb3VudGVyKHBvc3QpIFwiLlwiO1xuICAgIGNvdW50ZXItaW5jcmVtZW50OiBwb3N0O1xuICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7XG4gIH1cblxuICBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLFxuICBvbCwgdWwsIGhyLCBwcmUsIGRsLCBibG9ja3F1b3RlLCAua2ctZW1iZWQtY2FyZCB7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICB9XG5cbiAgJiA+IHVsIHsgbWFyZ2luLXRvcDogMzVweCB9XG5cbiAgJiA+IGlmcmFtZSxcbiAgJiA+IGltZyxcbiAgLmtnLWltYWdlLWNhcmQsXG4gIC5rZy1nYWxsZXJ5LWNhcmQsXG4gIC5rZy1jYXJkLFxuICAua2ctZW1iZWQtY2FyZCB7XG4gICAgbWFyZ2luLXRvcDogMzBweCAhaW1wb3J0YW50XG4gIH1cbn1cblxuLy8gZmlzcnQgcFxuLnBvc3QtYm9keSA+IHA6Zmlyc3Qtb2YtdHlwZTo6Zmlyc3QtbGV0dGVyIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGZvbnQtc2l6ZTogNjRweDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogLS4wM2VtO1xuICBsaW5lLWhlaWdodDogLjgzO1xuICBtYXJnaW4tYm90dG9tOiAtLjA4ZW07XG4gIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDdweDtcbiAgcGFkZGluZy10b3A6IDdweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLy8gcG9zdCBUYWdzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnBvc3QtdGFncyB7XG4gIGEge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjA4KTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjEpO1xuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBwb3N0IE5ld3NsZXR0ZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi5wb3N0LW5ld3NsZXR0ZXIge1xuICBvdXRsaW5lOiAxcHggc29saWQgI2YwZjBmMCAhaW1wb3J0YW50O1xuICBvdXRsaW5lLW9mZnNldDogLTFweDtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBwYWRkaW5nOiA0MHB4IDEwcHg7XG5cbiAgLm5ld3NsZXR0ZXItZm9ybSB7IG1heC13aWR0aDogNDAwcHggfVxuXG4gIC5mb3JtLWdyb3VwIHsgd2lkdGg6IDgwJTsgcGFkZGluZy1yaWdodDogNXB4OyB9XG5cbiAgLmZvcm0tLWlucHV0IHtcbiAgICBib3JkZXI6IDA7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG4gICAgaGVpZ2h0OiA0OHB4O1xuICAgIHBhZGRpbmc6IDZweCAxMnB4IDhweCA1cHg7XG4gICAgcmVzaXplOiBub25lO1xuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgJjpmb2N1cyB7XG4gICAgICBvdXRsaW5lOiAwO1xuICAgIH1cbiAgfVxuXG4gIC5mb3JtLS1idG4ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNhOWE5YTk7XG4gICAgYm9yZGVyLXJhZGl1czogMCA0NXB4IDQ1cHggMDtcbiAgICBib3JkZXI6IDA7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgd2lkdGg6IDIwJTtcblxuICAgICY6OmJlZm9yZSB7XG4gICAgICBAZXh0ZW5kICV1LWFic29sdXRlMDtcblxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2E5YTlhOTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAgNDVweCA0NXB4IDA7XG4gICAgICBsaW5lLWhlaWdodDogNDVweDtcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgJjpob3ZlciB7IG9wYWNpdHk6IC44OyB9XG4gICAgJjpmb2N1cyB7IG91dGxpbmU6IDA7IH1cbiAgfVxufVxuXG4vLyBDYXJkIFBvc3Rcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4uY2FyZFBvc3Qge1xuICAmLWltYWdlIHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMDc4NSk7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4IDRweCAwIDA7XG4gICAgaGVpZ2h0OiAxNjBweDtcbiAgfVxuXG4gIC8vICYtZXhjZXJwdCB7IGZvbnQtZmFtaWx5OiAkc2VjdW5kYXJ5LWZvbnQgfVxuXG4gIC8vICYtZXhjZXJwdCxcbiAgJi10aXRsZSB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjkpO1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWwgIWltcG9ydGFudDtcbiAgICAtd2Via2l0LWxpbmUtY2xhbXA6IDIgIWltcG9ydGFudDtcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveCAhaW1wb3J0YW50O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjEgIWltcG9ydGFudDtcbiAgICBtYXgtaGVpZ2h0OiAyLjJlbSAhaW1wb3J0YW50O1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzICFpbXBvcnRhbnQ7XG4gIH1cblxuICAudS1jYXJkIHtcbiAgICBoZWlnaHQ6IDI5NnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cbn1cblxuLy8gU2hhcmUgUG9zdFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5zaGFyZVBvc3Qge1xuICAvLyBtYXJnaW4tbGVmdDogLTEzMHB4O1xuICBsZWZ0OiAtMTMwcHg7XG4gIG1hcmdpbi10b3A6IDI4cHg7XG4gIHdpZHRoOiA2NXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcblxuICAvL3N0eWxlbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBhIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgbWFyZ2luOiAxMHB4IGF1dG87XG4gICAgcGFkZGluZzogOHB4O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICB3aWR0aDogMzZweDtcbiAgfVxufVxuXG4vLyBQb3N0IEFjdGlvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ucG9zdEFjdGlvbnMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3R0b206IDA7XG4gIGJveC1zaGFkb3c6IDAgMCAxcHggcmdiYSgwLCAwLCAwLCAuNDQpO1xuICBoZWlnaHQ6IDQ0cHg7XG4gIGxlZnQ6IDA7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIC8vIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcbiAgLy8gdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcztcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UtaW4tb3V0O1xuICAvLyB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHotaW5kZXg6IDQwMDtcblxuICAmLmlzLXZpc2libGUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcbiAgICAvLyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgLy8gdHJhbnNpdGlvbi1kZWxheTogMHM7XG4gICAgLy8gdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgfVxuXG4gICYtd3JhcCB7XG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gICAgcGFkZGluZy1sZWZ0OiA4cHg7XG4gICAgcGFkZGluZy1yaWdodDogOHB4O1xuICB9XG5cbiAgLnNlcGFyYXRvciB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuMTUpO1xuICAgIGhlaWdodDogMjRweDtcbiAgICBtYXJnaW46IDAgMTVweDtcbiAgICB3aWR0aDogMXB4O1xuICB9XG59XG5cbi5uZXh0UG9zdCB7XG4gIG1heC13aWR0aDogMjYwcHg7XG59XG5cbi8vIEdhbGxlcnlcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ua2ctZ2FsbGVyeS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ua2ctZ2FsbGVyeS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmtnLWdhbGxlcnktaW1hZ2UgaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmtnLWdhbGxlcnktcm93Om5vdCg6Zmlyc3Qtb2YtdHlwZSkge1xuICBtYXJnaW46IDAuNzVlbSAwIDAgMDtcbn1cblxuLmtnLWdhbGxlcnktaW1hZ2U6bm90KDpmaXJzdC1vZi10eXBlKSB7XG4gIG1hcmdpbjogMCAwIDAgMC43NWVtO1xufVxuXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcbiAgLnBvc3QtYm9keSB7XG4gICAgaDIge1xuICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgbWFyZ2luLXRvcDogMjZweDtcbiAgICB9XG5cbiAgICBoMyB7XG4gICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICBtYXJnaW4tdG9wOiAyOHB4O1xuICAgIH1cblxuICAgIGg0IHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIG1hcmdpbi10b3A6IDIycHg7XG4gICAgfVxuXG4gICAgcSB7XG4gICAgICBmb250LXNpemU6IDIycHggIWltcG9ydGFudDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAwOGVtICFpbXBvcnRhbnQ7XG4gICAgICBsaW5lLWhlaWdodDogMS40ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgJiA+IHA6Zmlyc3Qtb2YtdHlwZTo6Zmlyc3QtbGV0dGVyIHtcbiAgICAgIGZvbnQtc2l6ZTogNTQuODVweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICAgICAgbWFyZ2luLXJpZ2h0OiA2cHg7XG4gICAgICBwYWRkaW5nLXRvcDogMy41cHg7XG4gICAgfVxuXG4gICAgb2wsIHVsLCBwIHtcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAwNGVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTg7XG4gICAgfVxuXG4gICAgaWZyYW1lIHsgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxuICB9XG5cbiAgLy8gUG9zdCBSZWxhdGVkXG4gIC5wb3N0LXJlbGF0ZWQge1xuICAgIHBhZGRpbmctbGVmdDogOHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcbiAgfVxufVxuIiwiLmF1dGhvciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgbWluLWhlaWdodDogNDAwcHg7XHJcblxyXG4gICYtYXZhdGFyIHtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIHdpZHRoOiA4MHB4O1xyXG4gIH1cclxuXHJcbiAgJi1tZXRhIHNwYW4ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgZm9udC1zaXplOiAxN3B4O1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgbWFyZ2luOiAwIDI1cHggMTZweCAwO1xyXG4gICAgb3BhY2l0eTogLjg7XHJcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgfVxyXG5cclxuICAmLW5hbWUgeyBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCkgfVxyXG5cclxuICAmLWJpbyB7IG1heC13aWR0aDogNjAwcHg7IH1cclxufVxyXG5cclxuLmF1dGhvci5oYXMtLWltYWdlIHtcclxuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xyXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIC4zMyk7XHJcblxyXG4gIC5hdXRob3ItbGluazpob3ZlciB7IG9wYWNpdHk6IDEgIWltcG9ydGFudCB9XHJcblxyXG4gIC51LWFjY2VudENvbG9yLS1pY29uTm9ybWFsIHsgZmlsbDogI2ZmZjsgfVxyXG5cclxuICBhLFxyXG4gIC5hdXRob3ItbmFtZSB7IGNvbG9yOiAjZmZmOyB9XHJcblxyXG4gIC5hdXRob3ItZm9sbG93IGEge1xyXG4gICAgYm9yZGVyOiAycHggc29saWQ7XHJcbiAgICBib3JkZXItY29sb3I6IGhzbGEoMCwgMCUsIDEwMCUsIC41KSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhICN7JG1kLWFuZC1kb3dufSB7XHJcbiAgLmF1dGhvci1tZXRhIHNwYW4geyBkaXNwbGF5OiBibG9jazsgfVxyXG4gIC5hdXRob3ItaGVhZGVyIHsgZGlzcGxheTogYmxvY2s7IH1cclxuICAuYXV0aG9yLWF2YXRhciB7IG1hcmdpbjogMCBhdXRvIDIwcHg7IH1cclxufVxyXG4iLCIvLyBTZWFyY2hcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLnNlYXJjaCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBib3R0b206IDEwMCUgIWltcG9ydGFudDtcclxuICBoZWlnaHQ6IDA7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBwYWRkaW5nOiAwIDQwcHg7XHJcbiAgdHJhbnNpdGlvbjogYWxsIC4zcztcclxuICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgei1pbmRleDogOTk5OTtcclxuXHJcbiAgJi1mb3JtIHtcclxuICAgIG1heC13aWR0aDogNjgwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiA4MHB4O1xyXG5cclxuICAgICY6OmJlZm9yZSB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNlZWU7XHJcbiAgICAgIGJvdHRvbTogMDtcclxuICAgICAgY29udGVudDogJyc7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBoZWlnaHQ6IDJweDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgei1pbmRleDogMTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dCB7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xyXG5cclxuICAgICAgJjpmb2N1cyB7IG91dGxpbmU6IDA7IH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHJlc3VsdFxyXG4gICYtcmVzdWx0cyB7XHJcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKDkwJSAtIDEwMHB4KTtcclxuICAgIG1heC13aWR0aDogNjgwcHg7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuXHJcbiAgICBhIHtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XHJcbiAgICAgIHBhZGRpbmc6IDEycHggMDtcclxuXHJcbiAgICAgICY6aG92ZXIgeyBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNDQpIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5idXR0b24tc2VhcmNoLS1jbG9zZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XHJcbiAgcmlnaHQ6IDUwcHg7XHJcbiAgdG9wOiAyMHB4O1xyXG59XHJcblxyXG5ib2R5LmlzLXNlYXJjaCB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgLnNlYXJjaCB7XHJcbiAgICBib3R0b206IDAgIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHRyYW5zaXRpb246IGFsbCAuM3M7XHJcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG4gIH1cclxufVxyXG4iLCIuc2lkZWJhciB7XHJcbiAgJi10aXRsZSB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMDc4NSk7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XHJcbiAgfVxyXG5cclxuICAvLyBib3JkZXIgZm9yIHBvc3RcclxuICAmLWJvcmRlciB7XHJcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICRwcmltYXJ5LWNvbG9yO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjIpO1xyXG4gICAgZm9udC1mYW1pbHk6ICRzZWN1bmRhcnktZm9udDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDEwcHggMTBweDtcclxuICAgIHRvcDogMDtcclxuICB9XHJcbn1cclxuXHJcbi5zaWRlYmFyLXBvc3Qge1xyXG4gICY6bnRoLWNoaWxkKDNuKSB7IC5zaWRlYmFyLWJvcmRlciB7IGJvcmRlci1jb2xvcjogZGFya2VuKG9yYW5nZSwgMiUpOyB9IH1cclxuICAmOm50aC1jaGlsZCgzbisyKSB7IC5zaWRlYmFyLWJvcmRlciB7IGJvcmRlci1jb2xvcjogIzI2YThlZCB9IH1cclxuXHJcbiAgJi0tdGl0bGUge1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcclxuICB9XHJcblxyXG4gICYtLWxpbmsge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC4wOSk7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCA3cHggcmdiYSgwLCAwLCAwLCAuMDkpO1xyXG4gICAgbWluLWhlaWdodDogNTBweDtcclxuICAgIHBhZGRpbmc6IDE1cHggMTVweCAxNXB4IDU1cHg7XHJcblxyXG4gICAgJjpob3ZlciB7IC5zaWRlYmFyLWJvcmRlciB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjI5LCAyMzksIDI0NSwgMSkgfSB9XHJcbiAgfVxyXG59XHJcbiIsIi8vIE5hdmlnYXRpb24gTW9iaWxlXHJcbi5zaWRlTmF2IHtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcclxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgcGFkZGluZzogJGhlYWRlci1oZWlnaHQtbW9iaWxlIDIwcHg7XHJcbiAgcG9zaXRpb246IGZpeGVkICFpbXBvcnRhbnQ7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xyXG4gIHRyYW5zaXRpb246IDAuNHM7XHJcbiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcclxuICB6LWluZGV4OiA5OTtcclxuXHJcbiAgJi1tZW51IGEgeyBwYWRkaW5nOiAxMHB4IDIwcHg7IH1cclxuXHJcbiAgJi13cmFwIHtcclxuICAgIGJhY2tncm91bmQ6ICNlZWU7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIHBhZGRpbmc6IDIwcHggMDtcclxuICAgIHRvcDogJGhlYWRlci1oZWlnaHQtbW9iaWxlO1xyXG4gIH1cclxuXHJcbiAgJi1zZWN0aW9uIHtcclxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjZGRkO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDhweDtcclxuICB9XHJcblxyXG4gICYtZm9sbG93IHtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgbWFyZ2luOiAxNXB4IDA7XHJcblxyXG4gICAgYSB7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIGhlaWdodDogMzZweDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICAgIG1hcmdpbjogMCA1cHggNXB4IDA7XHJcbiAgICAgIG1pbi13aWR0aDogMzZweDtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICB9XHJcblxyXG4gICAgQGVhY2ggJHNvY2lhbC1uYW1lLCAkY29sb3IgaW4gJHNvY2lhbC1jb2xvcnMge1xyXG4gICAgICAuaS0jeyRzb2NpYWwtbmFtZX0ge1xyXG4gICAgICAgIEBleHRlbmQgLmJnLSN7JHNvY2lhbC1uYW1lfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvLyAgRm9sbG93IG1lIGJ0biBpcyBwb3N0XHJcbi5zaW1wbHktZm9sbG93IHtcclxuICAmOmhvdmVyIHtcclxuICAgIC5zaW1wbHktaG92ZXItaGlkZGVuIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50IH1cclxuICAgIC5zaW1wbHktaG92ZXItc2hvdyB7IGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50IH1cclxuICB9XHJcblxyXG4gICYtYnRuIHtcclxuICAgIGhlaWdodDogMTlweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxN3B4O1xyXG4gICAgcGFkZGluZzogMCAxMHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhICN7JG1kLWFuZC11cH0ge1xyXG4gIC8vIGJhY2tncm91bmQgaW1hZ2UgZmVhdHVyZWQgaW4gdGFnIGFuZCBhdXRob3JcclxuICAuaXMtYXV0aG9yLmhhcy1mZWF0dXJlZC1pbWFnZSxcclxuICAuaXMtdGFnLmhhcy1mZWF0dXJlZC1pbWFnZSB7XHJcbiAgICAuaGVhZGVyLFxyXG4gICAgLm1haW5NZW51IHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcclxuICAgIH1cclxuICAgIC51LWhlYWRlckNvbG9yTGluayBhIHsgY29sb3I6ICNmZmY7IH1cclxuXHJcbiAgICAubWFpbiB7XHJcbiAgICAgIG1hcmdpbi10b3A6IC01NnB4O1xyXG4gICAgfVxyXG5cclxuICAgIC50YWcsXHJcbiAgICAuYXV0aG9yIHtcclxuICAgICAgcGFkZGluZy10b3A6IDEwMHB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaXMtYXJ0aWNsZVxyXG4gIC5pcy1hcnRpY2xlIHtcclxuICAgIC5wb3N0LWhlYWRlciB7IHBhZGRpbmctdG9wOiAzNXB4OyB9XHJcbiAgICAucG9zdC1ib2R5IHsgbWFyZ2luLXRvcDogMzBweDsgfVxyXG5cclxuICAgIC5wb3N0LWltYWdlLFxyXG4gICAgLnZpZGVvLXBvc3QtZm9ybWF0IHsgbWFyZ2luLXRvcDogNTBweDsgfVxyXG4gIH1cclxufVxyXG4iLCIuaXMtc3Vic2NyaWJlIC5mb290ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XHJcbn1cclxuXHJcbi5zdWJzY3JpYmUge1xyXG4gIG1pbi1oZWlnaHQ6IDgwdmggIWltcG9ydGFudDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMCAhaW1wb3J0YW50O1xyXG5cclxuICAmLWNhcmQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Q3RUZFRTtcclxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLCAwLCAwLCAuMTUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgd2lkdGg6IDkwMHB4O1xyXG4gICAgaGVpZ2h0OiA1NTBweDtcclxuICAgIHBhZGRpbmc6IDUwcHg7XHJcbiAgICBtYXJnaW46IDVweDtcclxuICB9XHJcblxyXG4gIGZvcm0ge1xyXG4gICAgbWF4LXdpZHRoOiAzMDBweDtcclxuICB9XHJcblxyXG4gICYtZm9ybSB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgfVxyXG5cclxuICAmLWlucHV0IHtcclxuICAgIGJhY2tncm91bmQ6IDAgMDtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2M1NDU0O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMDtcclxuICAgIHBhZGRpbmc6IDdweCA1cHg7XHJcbiAgICBoZWlnaHQ6IDQ1cHg7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gICAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XHJcblxyXG4gICAgJjo6cGxhY2Vob2xkZXIge1xyXG4gICAgICBjb2xvcjogI2NjNTQ1NDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5idXR0b24ge1xyXG4gICAgYmFja2dyb3VuZDogIzAyOWU3NDtcclxuICAgIGJvcmRlci1jb2xvcjogIzAyOWU3NDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggN3B4IHJnYmEoMCwgMCwgMCwgLjA1KTtcclxuICAgIGZvbnQtc2l6ZTogMTdweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgLm1haW4tZXJyb3Ige1xyXG4gICAgY29sb3I6ICNjYzU0NTQ7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIH1cclxufVxyXG5cclxuLy8gU3VjY2Vzc1xyXG4uc3Vic2NyaWJlLXN1Y2Nlc3Mge1xyXG4gIC5zdWJzY3JpYmUtY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRThGM0VDO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhICN7JG1kLWFuZC1kb3dufSB7XHJcbiAgLnN1YnNjcmliZS1jYXJkIHtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6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 */","%link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n%link--accent {\n  color: $primary-color;\n  text-decoration: none;\n  // &:hover { color: $primary-color-hover; }\n}\n\n%content-absolute-bottom {\n  bottom: 0;\n  left: 0;\n  margin: 30px;\n  max-width: 600px;\n  position: absolute;\n  z-index: 2;\n}\n\n%u-absolute0 {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n%u-text-color-darker {\n  color: rgba(0, 0, 0, .8) !important;\n  fill: rgba(0, 0, 0, .8) !important;\n}\n\n%fonts-icons {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important; //stylelint-disable-line\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n","@charset \"UTF-8\";\n\n/* line 1, src/styles/common/_mixins.scss */\n\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n/* line 7, src/styles/common/_mixins.scss */\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none;\n}\n\n/* line 22, src/styles/common/_mixins.scss */\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n/* line 30, src/styles/common/_mixins.scss */\n\n.tag.not--image,\n.footer a:hover,\n.footer .follow a,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\n/* line 35, src/styles/common/_mixins.scss */\n\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\n/* line 12, node_modules/normalize.css/normalize.css */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\n/* line 25, node_modules/normalize.css/normalize.css */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\n/* line 33, node_modules/normalize.css/normalize.css */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\n/* line 47, node_modules/normalize.css/normalize.css */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\n/* line 60, node_modules/normalize.css/normalize.css */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\n/* line 70, node_modules/normalize.css/normalize.css */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\n/* line 79, node_modules/normalize.css/normalize.css */\n\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\n/* line 90, node_modules/normalize.css/normalize.css */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\n/* line 103, node_modules/normalize.css/normalize.css */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\n/* line 113, node_modules/normalize.css/normalize.css */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\n/* line 123, node_modules/normalize.css/normalize.css */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\n/* line 132, node_modules/normalize.css/normalize.css */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\n/* line 142, node_modules/normalize.css/normalize.css */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\n/* line 153, node_modules/normalize.css/normalize.css */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\n/* line 161, node_modules/normalize.css/normalize.css */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\n/* line 170, node_modules/normalize.css/normalize.css */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\n/* line 179, node_modules/normalize.css/normalize.css */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\n/* line 187, node_modules/normalize.css/normalize.css */\n\nsub {\n  bottom: -0.25em;\n}\n\n/* line 191, node_modules/normalize.css/normalize.css */\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\n/* line 202, node_modules/normalize.css/normalize.css */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\n/* line 211, node_modules/normalize.css/normalize.css */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\n/* line 220, node_modules/normalize.css/normalize.css */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\n/* line 228, node_modules/normalize.css/normalize.css */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\n/* line 240, node_modules/normalize.css/normalize.css */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\n/* line 256, node_modules/normalize.css/normalize.css */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\n/* line 266, node_modules/normalize.css/normalize.css */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\n/* line 277, node_modules/normalize.css/normalize.css */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\n/* line 288, node_modules/normalize.css/normalize.css */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\n/* line 300, node_modules/normalize.css/normalize.css */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\n/* line 311, node_modules/normalize.css/normalize.css */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\n/* line 322, node_modules/normalize.css/normalize.css */\n\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\n/* line 336, node_modules/normalize.css/normalize.css */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\n/* line 345, node_modules/normalize.css/normalize.css */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n/* line 354, node_modules/normalize.css/normalize.css */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n/* line 364, node_modules/normalize.css/normalize.css */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n/* line 374, node_modules/normalize.css/normalize.css */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n/* line 383, node_modules/normalize.css/normalize.css */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n/* line 393, node_modules/normalize.css/normalize.css */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\n/* line 406, node_modules/normalize.css/normalize.css */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\n/* line 415, node_modules/normalize.css/normalize.css */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\n/* line 426, node_modules/normalize.css/normalize.css */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\n/* line 434, node_modules/normalize.css/normalize.css */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n/* line 445, node_modules/normalize.css/normalize.css */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\n/* line 7, node_modules/prismjs/themes/prism.css */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\n/* line 30, node_modules/prismjs/themes/prism.css */\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n/* line 36, node_modules/prismjs/themes/prism.css */\n\npre[class*=\"language-\"]::selection,\npre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection,\ncode[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  /* line 43, node_modules/prismjs/themes/prism.css */\n\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none;\n  }\n}\n\n/* Code blocks */\n\n/* line 50, node_modules/prismjs/themes/prism.css */\n\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto;\n}\n\n/* line 56, node_modules/prismjs/themes/prism.css */\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0;\n}\n\n/* Inline code */\n\n/* line 62, node_modules/prismjs/themes/prism.css */\n\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal;\n}\n\n/* line 68, node_modules/prismjs/themes/prism.css */\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n/* line 75, node_modules/prismjs/themes/prism.css */\n\n.token.punctuation {\n  color: #999;\n}\n\n/* line 79, node_modules/prismjs/themes/prism.css */\n\n.namespace {\n  opacity: .7;\n}\n\n/* line 83, node_modules/prismjs/themes/prism.css */\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n/* line 93, node_modules/prismjs/themes/prism.css */\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n/* line 102, node_modules/prismjs/themes/prism.css */\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #9a6e3a;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n/* line 111, node_modules/prismjs/themes/prism.css */\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n/* line 117, node_modules/prismjs/themes/prism.css */\n\n.token.function,\n.token.class-name {\n  color: #DD4A68;\n}\n\n/* line 122, node_modules/prismjs/themes/prism.css */\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n/* line 128, node_modules/prismjs/themes/prism.css */\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n/* line 132, node_modules/prismjs/themes/prism.css */\n\n.token.italic {\n  font-style: italic;\n}\n\n/* line 136, node_modules/prismjs/themes/prism.css */\n\n.token.entity {\n  cursor: help;\n}\n\n/* line 2, src/styles/lib/_zoom.scss */\n\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in;\n}\n\n/* line 5, src/styles/lib/_zoom.scss */\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms;\n}\n\n/* line 13, src/styles/lib/_zoom.scss */\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out;\n}\n\n/* line 18, src/styles/lib/_zoom.scss */\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n\n/* line 33, src/styles/lib/_zoom.scss */\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1;\n}\n\n/* line 37, src/styles/lib/_zoom.scss */\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default;\n}\n\n/* line 2, src/styles/common/_global.scss */\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* line 6, src/styles/common/_global.scss */\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\n/* line 10, src/styles/common/_global.scss */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* line 16, src/styles/common/_global.scss */\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  color: #000;\n  font-family: \"Merriweather\", serif;\n  font-size: 1.1875rem;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.7;\n  margin: 30px 0 0 -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\n/* line 29, src/styles/common/_global.scss */\n\nblockquote p:first-of-type {\n  margin-top: 0;\n}\n\n/* line 32, src/styles/common/_global.scss */\n\nbody {\n  color: rgba(0, 0, 0, 0.84);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\n/* line 45, src/styles/common/_global.scss */\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px;\n}\n\n/* line 50, src/styles/common/_global.scss */\n\nfigure {\n  margin: 0;\n}\n\n/* line 54, src/styles/common/_global.scss */\n\nfigcaption {\n  color: rgba(0, 0, 0, 0.68);\n  display: block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-feature-settings: \"liga\" on, \"lnum\" on;\n  font-size: 15px;\n  font-style: normal;\n  font-weight: 400;\n  left: 0;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin-top: 10px;\n  outline: 0;\n  position: relative;\n  text-align: center;\n  top: 0;\n  width: 100%;\n}\n\n/* line 75, src/styles/common/_global.scss */\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\n/* line 85, src/styles/common/_global.scss */\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\n/* line 97, src/styles/common/_global.scss */\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\n/* line 105, src/styles/common/_global.scss */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: #37474f;\n  line-height: 1.4;\n}\n\n/* line 110, src/styles/common/_global.scss */\n\ncode[class*=language-] .token.comment,\npre[class*=language-] .token.comment {\n  opacity: .8;\n}\n\n/* line 115, src/styles/common/_global.scss */\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n}\n\n/* line 121, src/styles/common/_global.scss */\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -25px;\n}\n\n/* line 134, src/styles/common/_global.scss */\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\n/* line 140, src/styles/common/_global.scss */\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\n/* line 145, src/styles/common/_global.scss */\n\ni {\n  vertical-align: middle;\n}\n\n/* line 150, src/styles/common/_global.scss */\n\nol,\nul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\n/* line 157, src/styles/common/_global.scss */\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n/* line 163, src/styles/common/_global.scss */\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n}\n\n/* line 175, src/styles/common/_global.scss */\n\nq::before,\nq::after {\n  display: none;\n}\n\n/* line 185, src/styles/common/_global.scss */\n\n.link--underline:active,\n.link--underline:focus,\n.link--underline:hover {\n  color: inherit;\n  text-decoration: underline;\n}\n\n/* line 195, src/styles/common/_global.scss */\n\n.main,\n.footer {\n  transition: transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 199, src/styles/common/_global.scss */\n\n  .main {\n    overflow: hidden;\n    padding-top: 50px;\n  }\n\n  /* line 204, src/styles/common/_global.scss */\n\n  .feed-entry-content {\n    padding-left: 20px;\n    padding-right: 20px;\n    overflow: hidden;\n  }\n\n  /* line 210, src/styles/common/_global.scss */\n\n  blockquote {\n    margin-left: -5px;\n  }\n}\n\n/* line 215, src/styles/common/_global.scss */\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n/* line 218, src/styles/common/_global.scss */\n\n.warning::before {\n  content: \"\";\n}\n\n/* line 221, src/styles/common/_global.scss */\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n/* line 224, src/styles/common/_global.scss */\n\n.note::before {\n  content: \"\";\n}\n\n/* line 227, src/styles/common/_global.scss */\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n/* line 230, src/styles/common/_global.scss */\n\n.success::before {\n  color: #00bfa5;\n  content: \"\";\n}\n\n/* line 233, src/styles/common/_global.scss */\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n/* line 240, src/styles/common/_global.scss */\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n/* line 245, src/styles/common/_global.scss */\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n  margin-top: -5px;\n}\n\n/* line 257, src/styles/common/_global.scss */\n\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n}\n\n/* line 262, src/styles/common/_global.scss */\n\n.tag-wrap {\n  z-index: 2;\n}\n\n/* line 264, src/styles/common/_global.scss */\n\n.tag.not--image {\n  min-height: auto;\n}\n\n/* line 270, src/styles/common/_global.scss */\n\n.tag-description {\n  max-width: 500px;\n}\n\n/* line 277, src/styles/common/_global.scss */\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n/* line 281, src/styles/common/_global.scss */\n\n.with-tooltip::after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #fff;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 130px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n/* line 303, src/styles/common/_global.scss */\n\n.with-tooltip:hover::after {\n  animation: tooltip .1s ease-out both;\n}\n\n/* line 310, src/styles/common/_global.scss */\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n  padding-bottom: 45px;\n}\n\n/* line 314, src/styles/common/_global.scss */\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n/* line 319, src/styles/common/_global.scss */\n\n.footer .follow {\n  display: block !important;\n  text-align: center;\n}\n\n/* line 323, src/styles/common/_global.scss */\n\n.footer .follow a {\n  padding: 0 7px;\n}\n\n/* line 328, src/styles/common/_global.scss */\n\n.footer .follow a:hover {\n  color: rgba(0, 0, 0, 0.6) !important;\n}\n\n/* line 336, src/styles/common/_global.scss */\n\n.instagram-hover {\n  background-color: rgba(0, 0, 0, 0.3);\n  opacity: 0;\n}\n\n/* line 342, src/styles/common/_global.scss */\n\n.instagram-img {\n  height: 264px;\n}\n\n/* line 345, src/styles/common/_global.scss */\n\n.instagram-img:hover > .instagram-hover {\n  opacity: 1;\n}\n\n/* line 348, src/styles/common/_global.scss */\n\n.instagram-name {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n}\n\n/* line 355, src/styles/common/_global.scss */\n\n.instagram-name a {\n  background-color: #fff;\n  color: #000 !important;\n  font-size: 20px !important;\n  font-weight: 600 !important;\n  min-width: 200px;\n  padding-left: 10px !important;\n  padding-right: 10px !important;\n  text-align: center !important;\n}\n\n/* line 367, src/styles/common/_global.scss */\n\n.instagram-col {\n  padding: 0 !important;\n  margin: 0 !important;\n}\n\n/* line 375, src/styles/common/_global.scss */\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n}\n\n/* line 378, src/styles/common/_global.scss */\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n/* line 384, src/styles/common/_global.scss */\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n/* line 389, src/styles/common/_global.scss */\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  padding: 7vw 4vw;\n}\n\n/* line 397, src/styles/common/_global.scss */\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n}\n\n/* line 406, src/styles/common/_global.scss */\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* line 416, src/styles/common/_global.scss */\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n/* line 427, src/styles/common/_global.scss */\n\n.kg-embed-card .video-responsive {\n  margin-top: 0;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-google,\n.sideNav-follow .i-google {\n  background-color: #dd4b39 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-github {\n  color: #555 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-github,\n.sideNav-follow .i-github {\n  background-color: #555 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-linkedin,\n.sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-spotify,\n.sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-codepen {\n  color: #222 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-codepen,\n.sideNav-follow .i-codepen {\n  background-color: #222 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-behance {\n  color: #131418 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-behance,\n.sideNav-follow .i-behance {\n  background-color: #131418 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-dribbble,\n.sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-flickr,\n.sideNav-follow .i-flickr {\n  background-color: #0063dc !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-reddit,\n.sideNav-follow .i-reddit {\n  background-color: #ff4500 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-pocket,\n.sideNav-follow .i-pocket {\n  background-color: #f50057 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-pinterest,\n.sideNav-follow .i-pinterest {\n  background-color: #bd081c !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-whatsapp,\n.sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important;\n}\n\n/* line 432, src/styles/common/_global.scss */\n\n.c-telegram {\n  color: #08c !important;\n}\n\n/* line 433, src/styles/common/_global.scss */\n\n.bg-telegram,\n.sideNav-follow .i-telegram {\n  background-color: #08c !important;\n}\n\n/* line 456, src/styles/common/_global.scss */\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n}\n\n/* line 464, src/styles/common/_global.scss */\n\n.rocket:hover svg path {\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n/* line 469, src/styles/common/_global.scss */\n\n.svgIcon {\n  display: inline-block;\n}\n\n/* line 473, src/styles/common/_global.scss */\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n/* line 480, src/styles/common/_global.scss */\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n/* line 489, src/styles/common/_global.scss */\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800;\n}\n\n/* line 501, src/styles/common/_global.scss */\n\n.is-loading .loadingBar {\n  animation: loading-bar 1s ease-in-out infinite;\n  animation-delay: .8s;\n  display: block;\n}\n\n/* line 3, src/styles/common/_typography.scss */\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\n/* line 11, src/styles/common/_typography.scss */\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\n/* line 17, src/styles/common/_typography.scss */\n\nh1 {\n  font-size: 2.25rem;\n}\n\n/* line 18, src/styles/common/_typography.scss */\n\nh2 {\n  font-size: 1.875rem;\n}\n\n/* line 19, src/styles/common/_typography.scss */\n\nh3 {\n  font-size: 1.5625rem;\n}\n\n/* line 20, src/styles/common/_typography.scss */\n\nh4 {\n  font-size: 1.375rem;\n}\n\n/* line 21, src/styles/common/_typography.scss */\n\nh5 {\n  font-size: 1.125rem;\n}\n\n/* line 22, src/styles/common/_typography.scss */\n\nh6 {\n  font-size: 1rem;\n}\n\n/* line 27, src/styles/common/_typography.scss */\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n/* line 28, src/styles/common/_typography.scss */\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n/* line 29, src/styles/common/_typography.scss */\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n/* line 30, src/styles/common/_typography.scss */\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n/* line 31, src/styles/common/_typography.scss */\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n/* line 32, src/styles/common/_typography.scss */\n\n.h6 {\n  font-size: 1rem;\n}\n\n/* line 34, src/styles/common/_typography.scss */\n\np {\n  margin: 0;\n}\n\n/* line 2, src/styles/common/_utilities.scss */\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.54) !important;\n  fill: rgba(0, 0, 0, 0.54) !important;\n}\n\n/* line 9, src/styles/common/_utilities.scss */\n\n.u-textColorWhite {\n  color: #fff !important;\n  fill: #fff !important;\n}\n\n/* line 14, src/styles/common/_utilities.scss */\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n/* line 19, src/styles/common/_utilities.scss */\n\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034;\n}\n\n/* line 25, src/styles/common/_utilities.scss */\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n/* line 27, src/styles/common/_utilities.scss */\n\n.u-headerColorLink a {\n  color: #BBF1B9;\n}\n\n/* line 31, src/styles/common/_utilities.scss */\n\n.u-headerColorLink a.active,\n.u-headerColorLink a:hover {\n  color: #EEFFEA;\n}\n\n/* line 41, src/styles/common/_utilities.scss */\n\n.u-relative {\n  position: relative;\n}\n\n/* line 42, src/styles/common/_utilities.scss */\n\n.u-absolute {\n  position: absolute;\n}\n\n/* line 44, src/styles/common/_utilities.scss */\n\n.u-fixed {\n  position: fixed !important;\n}\n\n/* line 46, src/styles/common/_utilities.scss */\n\n.u-block {\n  display: block !important;\n}\n\n/* line 47, src/styles/common/_utilities.scss */\n\n.u-inlineBlock {\n  display: inline-block;\n}\n\n/* line 50, src/styles/common/_utilities.scss */\n\n.u-backgroundDark {\n  background-color: #000;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n/* line 62, src/styles/common/_utilities.scss */\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n/* line 63, src/styles/common/_utilities.scss */\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n/* line 67, src/styles/common/_utilities.scss */\n\n.u-clear::before,\n.row::before,\n.u-clear::after,\n.row::after {\n  content: \" \";\n  display: table;\n}\n\n/* line 72, src/styles/common/_utilities.scss */\n\n.u-clear::after,\n.row::after {\n  clear: both;\n}\n\n/* line 76, src/styles/common/_utilities.scss */\n\n.u-fontSize13 {\n  font-size: 13px !important;\n}\n\n/* line 77, src/styles/common/_utilities.scss */\n\n.u-fontSize14 {\n  font-size: 14px;\n}\n\n/* line 78, src/styles/common/_utilities.scss */\n\n.u-fontSize15 {\n  font-size: 15px !important;\n}\n\n/* line 79, src/styles/common/_utilities.scss */\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n/* line 80, src/styles/common/_utilities.scss */\n\n.u-fontSize21 {\n  font-size: 21px;\n}\n\n/* line 81, src/styles/common/_utilities.scss */\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n/* line 82, src/styles/common/_utilities.scss */\n\n.u-fontSize28 {\n  font-size: 28px !important;\n}\n\n/* line 83, src/styles/common/_utilities.scss */\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n/* line 84, src/styles/common/_utilities.scss */\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n/* line 85, src/styles/common/_utilities.scss */\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n/* line 86, src/styles/common/_utilities.scss */\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n/* line 87, src/styles/common/_utilities.scss */\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n/* line 88, src/styles/common/_utilities.scss */\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n/* line 89, src/styles/common/_utilities.scss */\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n/* line 90, src/styles/common/_utilities.scss */\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n/* line 91, src/styles/common/_utilities.scss */\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n/* line 92, src/styles/common/_utilities.scss */\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n/* line 93, src/styles/common/_utilities.scss */\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 96, src/styles/common/_utilities.scss */\n\n  .u-md-fontSizeBase {\n    font-size: 18px !important;\n  }\n\n  /* line 97, src/styles/common/_utilities.scss */\n\n  .u-md-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n/* line 113, src/styles/common/_utilities.scss */\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n/* line 114, src/styles/common/_utilities.scss */\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n/* line 116, src/styles/common/_utilities.scss */\n\n.u-fontWeightSemibold {\n  font-weight: 600 !important;\n}\n\n/* line 117, src/styles/common/_utilities.scss */\n\n.u-fontWeightBold {\n  font-weight: 700;\n}\n\n/* line 119, src/styles/common/_utilities.scss */\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n/* line 120, src/styles/common/_utilities.scss */\n\n.u-textCapitalize {\n  text-transform: capitalize;\n}\n\n/* line 121, src/styles/common/_utilities.scss */\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n/* line 123, src/styles/common/_utilities.scss */\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n/* line 130, src/styles/common/_utilities.scss */\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n/* line 131, src/styles/common/_utilities.scss */\n\n.u-marginTop20 {\n  margin-top: 20px;\n}\n\n/* line 132, src/styles/common/_utilities.scss */\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n/* line 133, src/styles/common/_utilities.scss */\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n/* line 134, src/styles/common/_utilities.scss */\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important;\n}\n\n/* line 135, src/styles/common/_utilities.scss */\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n/* line 136, src/styles/common/_utilities.scss */\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n/* line 139, src/styles/common/_utilities.scss */\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n/* line 140, src/styles/common/_utilities.scss */\n\n.u-padding20 {\n  padding: 20px;\n}\n\n/* line 141, src/styles/common/_utilities.scss */\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n/* line 142, src/styles/common/_utilities.scss */\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n/* line 143, src/styles/common/_utilities.scss */\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n/* line 144, src/styles/common/_utilities.scss */\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n/* line 145, src/styles/common/_utilities.scss */\n\n.u-paddingRight10 {\n  padding-right: 10px;\n}\n\n/* line 146, src/styles/common/_utilities.scss */\n\n.u-paddingLeft15 {\n  padding-left: 15px;\n}\n\n/* line 148, src/styles/common/_utilities.scss */\n\n.u-paddingTop2 {\n  padding-top: 2px;\n}\n\n/* line 149, src/styles/common/_utilities.scss */\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n/* line 150, src/styles/common/_utilities.scss */\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n/* line 151, src/styles/common/_utilities.scss */\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n/* line 152, src/styles/common/_utilities.scss */\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n/* line 153, src/styles/common/_utilities.scss */\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n/* line 155, src/styles/common/_utilities.scss */\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n/* line 157, src/styles/common/_utilities.scss */\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n/* line 158, src/styles/common/_utilities.scss */\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n/* line 160, src/styles/common/_utilities.scss */\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n/* line 168, src/styles/common/_utilities.scss */\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n/* line 169, src/styles/common/_utilities.scss */\n\n.u-lineHeightTight {\n  line-height: 1.2;\n}\n\n/* line 172, src/styles/common/_utilities.scss */\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n/* line 175, src/styles/common/_utilities.scss */\n\n.u-floatRight {\n  float: right;\n}\n\n/* line 176, src/styles/common/_utilities.scss */\n\n.u-floatLeft {\n  float: left;\n}\n\n/* line 179, src/styles/common/_utilities.scss */\n\n.u-flex {\n  display: flex;\n}\n\n/* line 180, src/styles/common/_utilities.scss */\n\n.u-flexCenter {\n  align-items: center;\n  display: flex;\n}\n\n/* line 182, src/styles/common/_utilities.scss */\n\n.u-flex1 {\n  flex: 1 1 auto;\n}\n\n/* line 183, src/styles/common/_utilities.scss */\n\n.u-flex0 {\n  flex: 0 0 auto;\n}\n\n/* line 184, src/styles/common/_utilities.scss */\n\n.u-flexWrap {\n  flex-wrap: wrap;\n}\n\n/* line 186, src/styles/common/_utilities.scss */\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n/* line 192, src/styles/common/_utilities.scss */\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n/* line 197, src/styles/common/_utilities.scss */\n\n.u-flexColumnTop {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n/* line 204, src/styles/common/_utilities.scss */\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n/* line 211, src/styles/common/_utilities.scss */\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n/* line 218, src/styles/common/_utilities.scss */\n\n.u-maxWidth1200 {\n  max-width: 1200px;\n}\n\n/* line 219, src/styles/common/_utilities.scss */\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n/* line 220, src/styles/common/_utilities.scss */\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n/* line 221, src/styles/common/_utilities.scss */\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n/* line 222, src/styles/common/_utilities.scss */\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n/* line 225, src/styles/common/_utilities.scss */\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n/* line 226, src/styles/common/_utilities.scss */\n\n.u-round {\n  border-radius: 50%;\n}\n\n/* line 227, src/styles/common/_utilities.scss */\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n/* line 229, src/styles/common/_utilities.scss */\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n/* line 234, src/styles/common/_utilities.scss */\n\n.u-height540 {\n  height: 540px;\n}\n\n/* line 235, src/styles/common/_utilities.scss */\n\n.u-height280 {\n  height: 280px;\n}\n\n/* line 236, src/styles/common/_utilities.scss */\n\n.u-height260 {\n  height: 260px;\n}\n\n/* line 237, src/styles/common/_utilities.scss */\n\n.u-height100 {\n  height: 100px;\n}\n\n/* line 238, src/styles/common/_utilities.scss */\n\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n/* line 241, src/styles/common/_utilities.scss */\n\n.u-hide {\n  display: none !important;\n}\n\n/* line 244, src/styles/common/_utilities.scss */\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n/* line 254, src/styles/common/_utilities.scss */\n\n.no-avatar {\n  background-image: url(\"./../images/avatar.png\") !important;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 259, src/styles/common/_utilities.scss */\n\n  .u-hide-before-md {\n    display: none !important;\n  }\n\n  /* line 260, src/styles/common/_utilities.scss */\n\n  .u-md-heightAuto {\n    height: auto;\n  }\n\n  /* line 261, src/styles/common/_utilities.scss */\n\n  .u-md-height170 {\n    height: 170px;\n  }\n\n  /* line 262, src/styles/common/_utilities.scss */\n\n  .u-md-relative {\n    position: relative;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  /* line 265, src/styles/common/_utilities.scss */\n\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 268, src/styles/common/_utilities.scss */\n\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  /* line 270, src/styles/common/_utilities.scss */\n\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  /* line 2, src/styles/components/_grid.scss */\n\n  .content {\n    max-width: calc(100% - 340px) !important;\n  }\n\n  /* line 9, src/styles/components/_grid.scss */\n\n  .sidebar {\n    width: 340px !important;\n  }\n}\n\n/* line 16, src/styles/components/_grid.scss */\n\n.row {\n  margin-left: -10px;\n  margin-right: -10px;\n}\n\n/* line 22, src/styles/components/_grid.scss */\n\n.row .col {\n  float: left;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s1 {\n  width: 8.33333%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s2 {\n  width: 16.66667%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s3 {\n  width: 25%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s4 {\n  width: 33.33333%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s5 {\n  width: 41.66667%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s6 {\n  width: 50%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s7 {\n  width: 58.33333%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s8 {\n  width: 66.66667%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s9 {\n  width: 75%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s10 {\n  width: 83.33333%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s11 {\n  width: 91.66667%;\n}\n\n/* line 32, src/styles/components/_grid.scss */\n\n.row .col.s12 {\n  width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m1 {\n    width: 8.33333%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m2 {\n    width: 16.66667%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m3 {\n    width: 25%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m4 {\n    width: 33.33333%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m5 {\n    width: 41.66667%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m6 {\n    width: 50%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m7 {\n    width: 58.33333%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m8 {\n    width: 66.66667%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m9 {\n    width: 75%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m10 {\n    width: 83.33333%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m11 {\n    width: 91.66667%;\n  }\n\n  /* line 46, src/styles/components/_grid.scss */\n\n  .row .col.m12 {\n    width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l1 {\n    width: 8.33333%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l2 {\n    width: 16.66667%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l3 {\n    width: 25%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l4 {\n    width: 33.33333%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l5 {\n    width: 41.66667%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l6 {\n    width: 50%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l7 {\n    width: 58.33333%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l8 {\n    width: 66.66667%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l9 {\n    width: 75%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l10 {\n    width: 83.33333%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l11 {\n    width: 91.66667%;\n  }\n\n  /* line 61, src/styles/components/_grid.scss */\n\n  .row .col.l12 {\n    width: 100%;\n  }\n}\n\n/* line 1, src/styles/components/_form.scss */\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n/* line 25, src/styles/components/_form.scss */\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n/* line 37, src/styles/components/_form.scss */\n\n.button--chromeless:active,\n.button--chromeless:hover,\n.button--chromeless:focus {\n  border-width: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n/* line 45, src/styles/components/_form.scss */\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n/* line 52, src/styles/components/_form.scss */\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n/* line 56, src/styles/components/_form.scss */\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n/* line 64, src/styles/components/_form.scss */\n\n.button--primary {\n  border-color: #00A034;\n  color: #00A034;\n}\n\n/* line 69, src/styles/components/_form.scss */\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n/* line 75, src/styles/components/_form.scss */\n\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n\n/* line 80, src/styles/components/_form.scss */\n\n.buttonSet > .button:last-child {\n  margin-right: 0;\n}\n\n/* line 84, src/styles/components/_form.scss */\n\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px;\n}\n\n/* line 89, src/styles/components/_form.scss */\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n/* line 95, src/styles/components/_form.scss */\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n/* line 99, src/styles/components/_form.scss */\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n/* line 104, src/styles/components/_form.scss */\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"./../fonts/simply.eot\");\n  src: url(\"./../fonts/simply.eot\") format(\"embedded-opentype\"), url(\"./../fonts/simply.ttf\") format(\"truetype\"), url(\"./../fonts/simply.woff\") format(\"woff\"), url(\"./../fonts/simply.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n/* line 18, src/styles/components/_icons.scss */\n\n.i-audio:before {\n  content: \"\\e901\";\n}\n\n/* line 21, src/styles/components/_icons.scss */\n\n.i-rocket:before {\n  content: \"\\e902\";\n  color: #999;\n}\n\n/* line 25, src/styles/components/_icons.scss */\n\n.i-comments:before {\n  content: \"\\e900\";\n}\n\n/* line 28, src/styles/components/_icons.scss */\n\n.i-google:before {\n  content: \"\\f1a0\";\n}\n\n/* line 31, src/styles/components/_icons.scss */\n\n.i-telegram:before {\n  content: \"\\f2c6\";\n}\n\n/* line 34, src/styles/components/_icons.scss */\n\n.i-link:before {\n  content: \"\\f0c1\";\n}\n\n/* line 37, src/styles/components/_icons.scss */\n\n.i-reddit:before {\n  content: \"\\f281\";\n}\n\n/* line 40, src/styles/components/_icons.scss */\n\n.i-twitter:before {\n  content: \"\\f099\";\n}\n\n/* line 43, src/styles/components/_icons.scss */\n\n.i-github:before {\n  content: \"\\f09b\";\n}\n\n/* line 46, src/styles/components/_icons.scss */\n\n.i-linkedin:before {\n  content: \"\\f0e1\";\n}\n\n/* line 49, src/styles/components/_icons.scss */\n\n.i-youtube:before {\n  content: \"\\f16a\";\n}\n\n/* line 52, src/styles/components/_icons.scss */\n\n.i-stack-overflow:before {\n  content: \"\\f16c\";\n}\n\n/* line 55, src/styles/components/_icons.scss */\n\n.i-instagram:before {\n  content: \"\\f16d\";\n}\n\n/* line 58, src/styles/components/_icons.scss */\n\n.i-flickr:before {\n  content: \"\\f16e\";\n}\n\n/* line 61, src/styles/components/_icons.scss */\n\n.i-dribbble:before {\n  content: \"\\f17d\";\n}\n\n/* line 64, src/styles/components/_icons.scss */\n\n.i-behance:before {\n  content: \"\\f1b4\";\n}\n\n/* line 67, src/styles/components/_icons.scss */\n\n.i-spotify:before {\n  content: \"\\f1bc\";\n}\n\n/* line 70, src/styles/components/_icons.scss */\n\n.i-codepen:before {\n  content: \"\\f1cb\";\n}\n\n/* line 73, src/styles/components/_icons.scss */\n\n.i-facebook:before {\n  content: \"\\f230\";\n}\n\n/* line 76, src/styles/components/_icons.scss */\n\n.i-pinterest:before {\n  content: \"\\f231\";\n}\n\n/* line 79, src/styles/components/_icons.scss */\n\n.i-whatsapp:before {\n  content: \"\\f232\";\n}\n\n/* line 82, src/styles/components/_icons.scss */\n\n.i-snapchat:before {\n  content: \"\\f2ac\";\n}\n\n/* line 85, src/styles/components/_icons.scss */\n\n.i-arrow_left:before {\n  content: \"\\e314\";\n}\n\n/* line 88, src/styles/components/_icons.scss */\n\n.i-arrow_right:before {\n  content: \"\\e315\";\n}\n\n/* line 91, src/styles/components/_icons.scss */\n\n.i-play:before {\n  content: \"\\e037\";\n}\n\n/* line 94, src/styles/components/_icons.scss */\n\n.i-star-line:before {\n  content: \"\\e83a\";\n}\n\n/* line 97, src/styles/components/_icons.scss */\n\n.i-photo:before {\n  content: \"\\e412\";\n}\n\n/* line 100, src/styles/components/_icons.scss */\n\n.i-location:before {\n  content: \"\\e8b4\";\n}\n\n/* line 103, src/styles/components/_icons.scss */\n\n.i-check-circle:before {\n  content: \"\\e86c\";\n}\n\n/* line 106, src/styles/components/_icons.scss */\n\n.i-close:before {\n  content: \"\\e5cd\";\n}\n\n/* line 109, src/styles/components/_icons.scss */\n\n.i-favorite:before {\n  content: \"\\e87d\";\n}\n\n/* line 112, src/styles/components/_icons.scss */\n\n.i-star:before {\n  content: \"\\e838\";\n}\n\n/* line 115, src/styles/components/_icons.scss */\n\n.i-warning:before {\n  content: \"\\e002\";\n}\n\n/* line 118, src/styles/components/_icons.scss */\n\n.i-rss:before {\n  content: \"\\e0e5\";\n}\n\n/* line 121, src/styles/components/_icons.scss */\n\n.i-search:before {\n  content: \"\\e8b6\";\n}\n\n/* line 124, src/styles/components/_icons.scss */\n\n.i-send:before {\n  content: \"\\e163\";\n}\n\n/* line 127, src/styles/components/_icons.scss */\n\n.i-share:before {\n  content: \"\\e80d\";\n}\n\n/* line 2, src/styles/components/_animated.scss */\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both;\n}\n\n/* line 6, src/styles/components/_animated.scss */\n\n.animated.infinite {\n  animation-iteration-count: infinite;\n}\n\n/* line 12, src/styles/components/_animated.scss */\n\n.bounceIn {\n  animation-name: bounceIn;\n}\n\n/* line 13, src/styles/components/_animated.scss */\n\n.bounceInDown {\n  animation-name: bounceInDown;\n}\n\n/* line 14, src/styles/components/_animated.scss */\n\n.pulse {\n  animation-name: pulse;\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    transform: none;\n  }\n}\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n}\n\n@keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n\n@keyframes loading-bar {\n  0% {\n    transform: translateX(-100%);\n  }\n\n  40% {\n    transform: translateX(0);\n  }\n\n  60% {\n    transform: translateX(0);\n  }\n\n  100% {\n    transform: translateX(100%);\n  }\n}\n\n/* line 4, src/styles/layouts/_header.scss */\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n/* line 9, src/styles/layouts/_header.scss */\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n}\n\n/* line 15, src/styles/layouts/_header.scss */\n\n.button-nav--toggle span {\n  background-color: #BBF1B9;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  transition: .4s;\n  width: 20px;\n}\n\n/* line 26, src/styles/layouts/_header.scss */\n\n.button-nav--toggle span:first-child {\n  transform: translate(0, -6px);\n}\n\n/* line 27, src/styles/layouts/_header.scss */\n\n.button-nav--toggle span:last-child {\n  transform: translate(0, 6px);\n}\n\n/* line 31, src/styles/layouts/_header.scss */\n\n.header {\n  z-index: 999;\n}\n\n/* line 34, src/styles/layouts/_header.scss */\n\n.header-wrap {\n  height: 55px;\n}\n\n/* line 36, src/styles/layouts/_header.scss */\n\n.header-logo {\n  color: #fff !important;\n  height: 30px;\n}\n\n/* line 40, src/styles/layouts/_header.scss */\n\n.header-logo img {\n  max-height: 100%;\n}\n\n/* line 43, src/styles/layouts/_header.scss */\n\n.header-logo,\n.header .button-search--open,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n/* line 48, src/styles/layouts/_header.scss */\n\n.header-description {\n  color: rgba(255, 255, 255, 0.8);\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 650px;\n}\n\n/* line 58, src/styles/layouts/_header.scss */\n\n.not-logo .header-logo {\n  height: auto !important;\n}\n\n/* line 63, src/styles/layouts/_header.scss */\n\n.follow > a {\n  padding-left: 15px;\n}\n\n/* line 68, src/styles/layouts/_header.scss */\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n}\n\n/* line 74, src/styles/layouts/_header.scss */\n\n.nav ul {\n  display: flex;\n  margin-right: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n/* line 81, src/styles/layouts/_header.scss */\n\n.nav li {\n  float: left;\n}\n\n/* line 84, src/styles/layouts/_header.scss */\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 98, src/styles/layouts/_header.scss */\n\n  body.is-home .header-wrap {\n    height: 200px;\n  }\n\n  /* line 100, src/styles/layouts/_header.scss */\n\n  body.is-home .header-logo {\n    height: 50px;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 117, src/styles/layouts/_header.scss */\n\n  .header {\n    position: fixed;\n  }\n\n  /* line 120, src/styles/layouts/_header.scss */\n\n  .header-wrap {\n    height: 50px;\n  }\n\n  /* line 123, src/styles/layouts/_header.scss */\n\n  .header-logo--wrap {\n    text-align: left;\n  }\n\n  /* line 124, src/styles/layouts/_header.scss */\n\n  .header-logo {\n    display: flex;\n    flex: 1 1 auto;\n  }\n\n  /* line 125, src/styles/layouts/_header.scss */\n\n  .header-logo span {\n    font-size: 24px;\n  }\n\n  /* line 127, src/styles/layouts/_header.scss */\n\n  .header-top {\n    display: flex;\n    align-items: center;\n  }\n\n  /* line 133, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  /* line 136, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .sideNav {\n    transform: translateX(0);\n  }\n\n  /* line 138, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    transform: rotate(90deg);\n  }\n\n  /* line 142, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    transform: rotate(45deg) translate(0, 0);\n  }\n\n  /* line 143, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    transform: scaleX(0);\n  }\n\n  /* line 144, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    transform: rotate(-45deg) translate(0, 0);\n  }\n\n  /* line 147, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  /* line 148, src/styles/layouts/_header.scss */\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    transform: translateX(-25%);\n  }\n}\n\n/* line 1, src/styles/layouts/_story-card.scss */\n\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px;\n}\n\n/* line 6, src/styles/layouts/_story-card.scss */\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%;\n}\n\n/* line 13, src/styles/layouts/_story-card.scss */\n\n.story-title {\n  letter-spacing: -.028em;\n  line-height: 24px !important;\n}\n\n/* line 18, src/styles/layouts/_story-card.scss */\n\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 60px;\n  line-height: 20px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n\n/* line 29, src/styles/layouts/_story-card.scss */\n\n.story-tag i {\n  color: rgba(0, 0, 0, 0.3) !important;\n  display: flex;\n  margin-right: 5px;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 39, src/styles/layouts/_story-card.scss */\n\n  .story--260 .story-wrap {\n    height: 260px;\n  }\n\n  /* line 40, src/styles/layouts/_story-card.scss */\n\n  .story--260 .story-image {\n    height: 100px;\n  }\n\n  /* line 42, src/styles/layouts/_story-card.scss */\n\n  .story--260 .story-body {\n    height: 160px;\n  }\n\n  /* line 48, src/styles/layouts/_story-card.scss */\n\n  .story--200 .story-wrap {\n    height: 260px;\n    display: flex;\n  }\n\n  /* line 50, src/styles/layouts/_story-card.scss */\n\n  .story--200 .story-body {\n    flex: 1 1 auto;\n    height: 100%;\n  }\n\n  /* line 55, src/styles/layouts/_story-card.scss */\n\n  .story--200 .story-image {\n    flex: 0 0 auto;\n    height: 100%;\n    width: 200px;\n  }\n}\n\n/* line 65, src/styles/layouts/_story-card.scss */\n\n.card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n/* line 73, src/styles/layouts/_story-card.scss */\n\n.card--p {\n  font-family: \"Merriweather\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n/* line 81, src/styles/layouts/_story-card.scss */\n\n.card-image {\n  max-height: 240px;\n  max-width: 360px;\n}\n\n/* line 88, src/styles/layouts/_story-card.scss */\n\n.card.card--large .card-body {\n  display: flex;\n  flex-direction: column;\n}\n\n/* line 90, src/styles/layouts/_story-card.scss */\n\n.card.card--large .card-image {\n  height: 200px;\n  margin-bottom: 20px;\n  margin-top: 5px;\n  max-width: 100%;\n  order: -1;\n}\n\n/* line 98, src/styles/layouts/_story-card.scss */\n\n.card.card--large .card-image--link {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n}\n\n/* line 109, src/styles/layouts/_story-card.scss */\n\n.card.card--medium .card-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n}\n\n/* line 1, src/styles/layouts/_homepage.scss */\n\n.cover-lazy {\n  opacity: .5;\n  z-index: 2;\n}\n\n/* line 2, src/styles/layouts/_post.scss */\n\n.post-title {\n  line-height: 1.04;\n  font-weight: 600;\n}\n\n/* line 7, src/styles/layouts/_post.scss */\n\n.post-excerpt {\n  font-family: \"Merriweather\", serif;\n  font-size: 22px;\n  line-height: 1.5;\n  letter-spacing: -.022em;\n}\n\n/* line 20, src/styles/layouts/_post.scss */\n\n.postMetaInline {\n  letter-spacing: 0;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.54);\n  fill: rgba(0, 0, 0, 0.54);\n}\n\n/* line 31, src/styles/layouts/_post.scss */\n\n.post-body {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n/* line 36, src/styles/layouts/_post.scss */\n\n.post-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n/* line 44, src/styles/layouts/_post.scss */\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n/* line 51, src/styles/layouts/_post.scss */\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 600;\n  font-style: normal;\n}\n\n/* line 57, src/styles/layouts/_post.scss */\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n/* line 64, src/styles/layouts/_post.scss */\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n/* line 71, src/styles/layouts/_post.scss */\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n/* line 78, src/styles/layouts/_post.scss */\n\n.post-body p {\n  font-family: \"Merriweather\", serif;\n  font-size: 1.125rem;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.7;\n  margin-top: 25px;\n}\n\n/* line 87, src/styles/layouts/_post.scss */\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Merriweather\", serif;\n  font-size: 1.125rem;\n  margin-top: 30px;\n}\n\n/* line 94, src/styles/layouts/_post.scss */\n\n.post-body ul li,\n.post-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-bottom: 14px;\n  margin-left: 30px;\n}\n\n/* line 100, src/styles/layouts/_post.scss */\n\n.post-body ul li::before,\n.post-body ol li::before {\n  box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n/* line 111, src/styles/layouts/_post.scss */\n\n.post-body ul li::before {\n  content: '\\2022';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 3px;\n}\n\n/* line 118, src/styles/layouts/_post.scss */\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n/* line 124, src/styles/layouts/_post.scss */\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6,\n.post-body p,\n.post-body ol,\n.post-body ul,\n.post-body hr,\n.post-body pre,\n.post-body dl,\n.post-body blockquote,\n.post-body .kg-embed-card {\n  min-width: 100%;\n}\n\n/* line 129, src/styles/layouts/_post.scss */\n\n.post-body > ul {\n  margin-top: 35px;\n}\n\n/* line 131, src/styles/layouts/_post.scss */\n\n.post-body > iframe,\n.post-body > img,\n.post-body .kg-image-card,\n.post-body .kg-gallery-card,\n.post-body .kg-card,\n.post-body .kg-embed-card {\n  margin-top: 30px !important;\n}\n\n/* line 142, src/styles/layouts/_post.scss */\n\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n/* line 159, src/styles/layouts/_post.scss */\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n/* line 167, src/styles/layouts/_post.scss */\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n/* line 177, src/styles/layouts/_post.scss */\n\n.post-newsletter {\n  outline: 1px solid #f0f0f0 !important;\n  outline-offset: -1px;\n  border-radius: 2px;\n  padding: 40px 10px;\n}\n\n/* line 183, src/styles/layouts/_post.scss */\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n/* line 185, src/styles/layouts/_post.scss */\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n/* line 187, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n/* line 195, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n/* line 200, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n/* line 209, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n/* line 218, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n/* line 219, src/styles/layouts/_post.scss */\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n/* line 226, src/styles/layouts/_post.scss */\n\n.cardPost-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px;\n}\n\n/* line 235, src/styles/layouts/_post.scss */\n\n.cardPost-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n/* line 245, src/styles/layouts/_post.scss */\n\n.cardPost .u-card {\n  height: 296px;\n  margin-bottom: 20px;\n}\n\n/* line 253, src/styles/layouts/_post.scss */\n\n.sharePost {\n  left: -130px;\n  margin-top: 28px;\n  width: 65px;\n  position: absolute !important;\n}\n\n/* line 261, src/styles/layouts/_post.scss */\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n/* line 276, src/styles/layouts/_post.scss */\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translate3d(0, 0, 0);\n  transition: all 0.25s ease-in-out;\n  z-index: 400;\n}\n\n/* line 291, src/styles/layouts/_post.scss */\n\n.postActions.is-visible {\n  transform: translateY(100%);\n}\n\n/* line 298, src/styles/layouts/_post.scss */\n\n.postActions-wrap {\n  max-width: 1200px;\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n/* line 304, src/styles/layouts/_post.scss */\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n/* line 312, src/styles/layouts/_post.scss */\n\n.nextPost {\n  max-width: 260px;\n}\n\n/* line 318, src/styles/layouts/_post.scss */\n\n.kg-gallery-container {\n  display: flex;\n  flex-direction: column;\n  max-width: 100%;\n  width: 100%;\n}\n\n/* line 325, src/styles/layouts/_post.scss */\n\n.kg-gallery-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n/* line 331, src/styles/layouts/_post.scss */\n\n.kg-gallery-image img {\n  display: block;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/* line 338, src/styles/layouts/_post.scss */\n\n.kg-gallery-row:not(:first-of-type) {\n  margin: 0.75em 0 0 0;\n}\n\n/* line 342, src/styles/layouts/_post.scss */\n\n.kg-gallery-image:not(:first-of-type) {\n  margin: 0 0 0 0.75em;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 348, src/styles/layouts/_post.scss */\n\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px;\n  }\n\n  /* line 353, src/styles/layouts/_post.scss */\n\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px;\n  }\n\n  /* line 358, src/styles/layouts/_post.scss */\n\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px;\n  }\n\n  /* line 363, src/styles/layouts/_post.scss */\n\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important;\n  }\n\n  /* line 369, src/styles/layouts/_post.scss */\n\n  .post-body > p:first-of-type::first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px;\n  }\n\n  /* line 376, src/styles/layouts/_post.scss */\n\n  .post-body ol,\n  .post-body ul,\n  .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n\n  /* line 382, src/styles/layouts/_post.scss */\n\n  .post-body iframe {\n    width: 100% !important;\n  }\n\n  /* line 386, src/styles/layouts/_post.scss */\n\n  .post-related {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n}\n\n/* line 1, src/styles/layouts/_author.scss */\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n/* line 6, src/styles/layouts/_author.scss */\n\n.author-avatar {\n  height: 80px;\n  width: 80px;\n}\n\n/* line 11, src/styles/layouts/_author.scss */\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n/* line 20, src/styles/layouts/_author.scss */\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n/* line 22, src/styles/layouts/_author.scss */\n\n.author-bio {\n  max-width: 600px;\n}\n\n/* line 25, src/styles/layouts/_author.scss */\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n/* line 29, src/styles/layouts/_author.scss */\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n/* line 31, src/styles/layouts/_author.scss */\n\n.author.has--image .u-accentColor--iconNormal {\n  fill: #fff;\n}\n\n/* line 33, src/styles/layouts/_author.scss */\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n/* line 36, src/styles/layouts/_author.scss */\n\n.author.has--image .author-follow a {\n  border: 2px solid;\n  border-color: rgba(255, 255, 255, 0.5) !important;\n  font-size: 16px;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 44, src/styles/layouts/_author.scss */\n\n  .author-meta span {\n    display: block;\n  }\n\n  /* line 45, src/styles/layouts/_author.scss */\n\n  .author-header {\n    display: block;\n  }\n\n  /* line 46, src/styles/layouts/_author.scss */\n\n  .author-avatar {\n    margin: 0 auto 20px;\n  }\n}\n\n/* line 3, src/styles/layouts/_search.scss */\n\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999;\n}\n\n/* line 13, src/styles/layouts/_search.scss */\n\n.search-form {\n  max-width: 680px;\n  margin-top: 80px;\n}\n\n/* line 17, src/styles/layouts/_search.scss */\n\n.search-form::before {\n  background: #eee;\n  bottom: 0;\n  content: '';\n  display: block;\n  height: 2px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n/* line 29, src/styles/layouts/_search.scss */\n\n.search-form input {\n  border: none;\n  display: block;\n  line-height: 40px;\n  padding-bottom: 8px;\n}\n\n/* line 35, src/styles/layouts/_search.scss */\n\n.search-form input:focus {\n  outline: 0;\n}\n\n/* line 40, src/styles/layouts/_search.scss */\n\n.search-results {\n  max-height: calc(90% - 100px);\n  max-width: 680px;\n  overflow: auto;\n}\n\n/* line 45, src/styles/layouts/_search.scss */\n\n.search-results a {\n  border-bottom: 1px solid #eee;\n  padding: 12px 0;\n}\n\n/* line 49, src/styles/layouts/_search.scss */\n\n.search-results a:hover {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n/* line 54, src/styles/layouts/_search.scss */\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px;\n}\n\n/* line 60, src/styles/layouts/_search.scss */\n\nbody.is-search {\n  overflow: hidden;\n}\n\n/* line 63, src/styles/layouts/_search.scss */\n\nbody.is-search .search {\n  bottom: 0 !important;\n  height: 100%;\n  transition: all .3s;\n  visibility: visible;\n}\n\n/* line 2, src/styles/layouts/_sidebar.scss */\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n/* line 10, src/styles/layouts/_sidebar.scss */\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Merriweather\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n/* line 22, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n/* line 23, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n/* line 25, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n/* line 29, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post--link {\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.09);\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.09);\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n/* line 36, src/styles/layouts/_sidebar.scss */\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n/* line 2, src/styles/layouts/_sidenav.scss */\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n/* line 13, src/styles/layouts/_sidenav.scss */\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n/* line 15, src/styles/layouts/_sidenav.scss */\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n/* line 22, src/styles/layouts/_sidenav.scss */\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n/* line 28, src/styles/layouts/_sidenav.scss */\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n/* line 32, src/styles/layouts/_sidenav.scss */\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n/* line 4, src/styles/layouts/helper.scss */\n\n.simply-follow:hover .simply-hover-hidden {\n  display: none !important;\n}\n\n/* line 5, src/styles/layouts/helper.scss */\n\n.simply-follow:hover .simply-hover-show {\n  display: inline-block !important;\n}\n\n/* line 8, src/styles/layouts/helper.scss */\n\n.simply-follow-btn {\n  height: 19px;\n  line-height: 17px;\n  padding: 0 10px;\n}\n\n@media only screen and (min-width: 766px) {\n  /* line 19, src/styles/layouts/helper.scss */\n\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  }\n\n  /* line 24, src/styles/layouts/helper.scss */\n\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff;\n  }\n\n  /* line 26, src/styles/layouts/helper.scss */\n\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -56px;\n  }\n\n  /* line 30, src/styles/layouts/helper.scss */\n\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 100px;\n  }\n\n  /* line 38, src/styles/layouts/helper.scss */\n\n  .is-article .post-header {\n    padding-top: 35px;\n  }\n\n  /* line 39, src/styles/layouts/helper.scss */\n\n  .is-article .post-body {\n    margin-top: 30px;\n  }\n\n  /* line 41, src/styles/layouts/helper.scss */\n\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px;\n  }\n}\n\n/* line 1, src/styles/layouts/subscribe.scss */\n\n.is-subscribe .footer {\n  background-color: #f0f0f0;\n}\n\n/* line 5, src/styles/layouts/subscribe.scss */\n\n.subscribe {\n  min-height: 80vh !important;\n  height: 100%;\n  background-color: #f0f0f0 !important;\n}\n\n/* line 10, src/styles/layouts/subscribe.scss */\n\n.subscribe-card {\n  background-color: #D7EFEE;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  width: 900px;\n  height: 550px;\n  padding: 50px;\n  margin: 5px;\n}\n\n/* line 20, src/styles/layouts/subscribe.scss */\n\n.subscribe form {\n  max-width: 300px;\n}\n\n/* line 24, src/styles/layouts/subscribe.scss */\n\n.subscribe-form {\n  height: 100%;\n}\n\n/* line 28, src/styles/layouts/subscribe.scss */\n\n.subscribe-input {\n  background: 0 0;\n  border: 0;\n  border-bottom: 1px solid #cc5454;\n  border-radius: 0;\n  padding: 7px 5px;\n  height: 45px;\n  outline: 0;\n  font-family: \"Source Sans Pro\", sans-serif;\n}\n\n/* line 38, src/styles/layouts/subscribe.scss */\n\n.subscribe-input::placeholder {\n  color: #cc5454;\n}\n\n/* line 43, src/styles/layouts/subscribe.scss */\n\n.subscribe .button {\n  background: #029e74;\n  border-color: #029e74;\n  color: #fff;\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  font-size: 17px !important;\n}\n\n/* line 51, src/styles/layouts/subscribe.scss */\n\n.subscribe .main-error {\n  color: #cc5454;\n  font-size: 16px;\n  margin-top: 15px;\n}\n\n/* line 60, src/styles/layouts/subscribe.scss */\n\n.subscribe-success .subscribe-card {\n  background-color: #E8F3EC;\n}\n\n@media only screen and (max-width: 766px) {\n  /* line 66, src/styles/layouts/subscribe.scss */\n\n  .subscribe-card {\n    height: auto;\n    width: auto;\n  }\n}\n\n","/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n","/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*=\"language-\"],\n\tpre[class*=\"language-\"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #9a6e3a;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function,\n.token.class-name {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n","// stylelint-disable\r\nimg[data-action=\"zoom\"] {\r\n  cursor: zoom-in;\r\n}\r\n.zoom-img,\r\n.zoom-img-wrap {\r\n  position: relative;\r\n  z-index: 666;\r\n  -webkit-transition: all 300ms;\r\n       -o-transition: all 300ms;\r\n          transition: all 300ms;\r\n}\r\nimg.zoom-img {\r\n  cursor: pointer;\r\n  cursor: -webkit-zoom-out;\r\n  cursor: -moz-zoom-out;\r\n}\r\n.zoom-overlay {\r\n  z-index: 420;\r\n  background: #fff;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  pointer-events: none;\r\n  filter: \"alpha(opacity=0)\";\r\n  opacity: 0;\r\n  -webkit-transition:      opacity 300ms;\r\n       -o-transition:      opacity 300ms;\r\n          transition:      opacity 300ms;\r\n}\r\n.zoom-overlay-open .zoom-overlay {\r\n  filter: \"alpha(opacity=100)\";\r\n  opacity: 1;\r\n}\r\n.zoom-overlay-open,\r\n.zoom-overlay-transitioning {\r\n  cursor: default;\r\n}\r\n","\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n\n  &:active,\n  &:hover {\n    outline: 0;\n  }\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, .8);\n  color: #000;\n  font-family: $secundary-font;\n  font-size: 1.1875rem;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.7;\n  margin: 30px 0 0 -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n\n  p:first-of-type { margin-top: 0 }\n}\n\nbody {\n  color: $primary-text-color;\n  font-family: $primary-font;\n  font-size: $font-size-base;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\n//Default styles\nhtml {\n  box-sizing: border-box;\n  font-size: $font-size-root;\n}\n\nfigure {\n  margin: 0;\n}\n\nfigcaption {\n  color: rgba(0, 0, 0, .68);\n  display: block;\n  font-family: $primary-font;\n  font-feature-settings: \"liga\" on, \"lnum\" on;\n  font-size: 15px;\n  font-style: normal;\n  font-weight: 400;\n  left: 0;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin-top: 10px;\n  outline: 0;\n  position: relative;\n  text-align: center;\n  top: 0;\n  width: 100%;\n}\n\n// Code\n// ==========================================================================\nkbd, samp, code {\n  background: $code-bg-color;\n  border-radius: 4px;\n  color: $code-color;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: $code-bg-color !important;\n  border-radius: 4px;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  margin-top: 30px !important;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n\n  code {\n    background: transparent;\n    color: $pre-code-color;\n    padding: 0;\n    text-shadow: 0 1px #fff;\n  }\n}\n\ncode[class*=language-],\npre[class*=language-] {\n  color: $pre-code-color;\n  line-height: 1.4;\n\n  .token.comment { opacity: .8; }\n}\n\n// hr\n// ==========================================================================\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n\n  &::before {\n    color: rgba(0, 0, 0, .6);\n    content: '...';\n    display: inline-block;\n    font-family: $primary-font;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -25px;\n  }\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n\n  &:not([src]) {\n    visibility: hidden;\n  }\n}\n\ni {\n  // display: inline-block;\n  vertical-align: middle;\n}\n\nol, ul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, rgba(215, 253, 211, 1), rgba(215, 253, 211, 1));\n  color: rgba(0, 0, 0, .8);\n}\n\nq {\n  color: rgba(0, 0, 0, .44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n\n  &::before, &::after { display: none; }\n}\n\n// Links color\n// ==========================================================================\n.link--accent { @extend %link--accent; }\n\n.link { @extend %link; }\n\n.link--underline {\n  &:active,\n  &:focus,\n  &:hover {\n    color: inherit;\n    text-decoration: underline;\n  }\n}\n\n// Animation main page and footer\n// ==========================================================================\n.main,\n.footer { transition: transform .5s ease; }\n\n@media #{$md-and-down} {\n  .main {\n    overflow: hidden;\n    padding-top: $header-height-mobile;\n  }\n\n  .feed-entry-content {\n    padding-left: 20px;\n    padding-right: 20px;\n    overflow: hidden;\n  }\n\n  blockquote { margin-left: -5px }\n}\n\n// warning success and Note\n// ==========================================================================\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n  &::before { content: $i-warning; }\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n  &::before { content: $i-star; }\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n  &::before { color: #00bfa5; content: $i-check; }\n}\n\n.warning, .note, .success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n\n  a {\n    color: inherit;\n    text-decoration: underline;\n  }\n\n  &::before {\n    @extend %fonts-icons;\n\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n    margin-top: -5px;\n  }\n}\n\n// Page Tags\n// ==========================================================================\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n\n  &-wrap { z-index: 2; }\n\n  &.not--image {\n    @extend %u-text-color-darker;\n\n    min-height: auto;\n  }\n\n  &-description {\n    max-width: 500px;\n  }\n}\n\n// toltip\n// ==========================================================================\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n\n  &::after {\n    background: rgba(0, 0, 0, .85);\n    border-radius: 4px;\n    color: #fff;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 130px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1;\n  }\n\n  &:hover::after {\n    animation: tooltip .1s ease-out both;\n  }\n}\n\n// Footer\n// ==========================================================================\n.footer {\n  color: rgba(0, 0, 0, .44);\n  padding-bottom: 45px;\n\n  a {\n    color: rgba(0, 0, 0, .6);\n    &:hover { @extend %u-text-color-darker; }\n  }\n\n  .follow {\n    display: block !important;\n    text-align: center;\n\n    a {\n      @extend %u-text-color-darker;\n\n      padding: 0 7px;\n\n      &:hover { color: rgba(0, 0, 0, 0.6) !important }\n    }\n  }\n}\n\n// Instagram Fedd\n// ==========================================================================\n.instagram {\n  &-hover {\n    background-color: rgba(0, 0, 0, .3);\n    // transition: opacity 1s ease-in-out;\n    opacity: 0;\n  }\n\n  &-img {\n    height: 264px;\n\n    &:hover > .instagram-hover { opacity: 1 }\n  }\n\n  &-name {\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n\n    // stylelint-disable-next-line\n    a {\n      background-color: #fff;\n      color: #000 !important;\n      font-size: 20px !important;\n      font-weight: 600 !important;\n      min-width: 200px;\n      padding-left: 10px !important;\n      padding-right: 10px !important;\n      text-align: center !important;\n    }\n  }\n\n  &-col {\n    padding: 0 !important;\n    margin: 0 !important;\n  }\n}\n\n// Error page\n// ==========================================================================\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n\n  &-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px;\n  }\n\n  &-text {\n    margin-top: 60px;\n    white-space: pre-wrap;\n  }\n\n  &-wrap {\n    color: rgba(0, 0, 0, .4);\n    padding: 7vw 4vw;\n  }\n}\n\n// Video Responsive\n// ==========================================================================\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n\n  iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n}\n\n.kg-embed-card .video-responsive { margin-top: 0 }\n\n// Social Media Color\n// ==========================================================================\n@each $social-name, $color in $social-colors {\n  .c-#{$social-name} { color: $color !important; }\n  .bg-#{$social-name} { background-color: $color !important; }\n}\n\n// Facebook Save\n// ==========================================================================\n// .fbSave {\n//   &-dropdown {\n//     background-color: #fff;\n//     border: 1px solid #e0e0e0;\n//     bottom: 100%;\n//     display: none;\n//     max-width: 200px;\n//     min-width: 100px;\n//     padding: 8px;\n//     transform: translate(-50%, 0);\n//     z-index: 10;\n\n//     &.is-visible { display: block; }\n//   }\n// }\n\n// Rocket for return top page\n// ==========================================================================\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n\n  &:hover svg path {\n    fill: rgba(0, 0, 0, .6);\n  }\n}\n\n.svgIcon {\n  display: inline-block;\n}\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n// Load More\n// ==========================================================================\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  animation: loading-bar 1s ease-in-out infinite;\n  animation-delay: .8s;\n  display: block;\n}\n","// Headings\r\n\r\nh1, h2, h3, h4, h5, h6,\r\n.h1, .h2, .h3, .h4, .h5, .h6 {\r\n  color: $headings-color;\r\n  font-family: $headings-font-family;\r\n  font-weight: $headings-font-weight;\r\n  line-height: $headings-line-height;\r\n  margin: 0;\r\n\r\n  a {\r\n    color: inherit;\r\n    line-height: inherit;\r\n  }\r\n}\r\n\r\nh1 { font-size: $font-size-h1; }\r\nh2 { font-size: $font-size-h2; }\r\nh3 { font-size: $font-size-h3; }\r\nh4 { font-size: $font-size-h4; }\r\nh5 { font-size: $font-size-h5; }\r\nh6 { font-size: $font-size-h6; }\r\n\r\n// These declarations are kept separate from and placed after\r\n// the previous tag-based declarations so that the classes beat the tags in\r\n// the CSS cascade, and thus <h1 class=\"h2\"> will be styled like an h2.\r\n.h1 { font-size: $font-size-h1; }\r\n.h2 { font-size: $font-size-h2; }\r\n.h3 { font-size: $font-size-h3; }\r\n.h4 { font-size: $font-size-h4; }\r\n.h5 { font-size: $font-size-h5; }\r\n.h6 { font-size: $font-size-h6; }\r\n\r\np {\r\n  margin: 0;\r\n}\r\n","// color\r\n.u-textColorNormal {\r\n  // color: rgba(0, 0, 0, .44) !important;\r\n  // fill: rgba(0, 0, 0, .44) !important;\r\n  color: rgba(0, 0, 0, .54) !important;\r\n  fill: rgba(0, 0, 0, .54) !important;\r\n}\r\n\r\n.u-textColorWhite {\r\n  color: #fff !important;\r\n  fill: #fff !important;\r\n}\r\n\r\n.u-hoverColorNormal:hover {\r\n  color: rgba(0, 0, 0, .6);\r\n  fill: rgba(0, 0, 0, .6);\r\n}\r\n\r\n.u-accentColor--iconNormal {\r\n  color: $primary-color;\r\n  fill: $primary-color;\r\n}\r\n\r\n//  background color\r\n.u-bgColor { background-color: $primary-color; }\r\n\r\n.u-headerColorLink a {\r\n  // color: rgba(0, 0, 0, .44);\r\n  color: $header-color;\r\n\r\n  &.active,\r\n  &:hover {\r\n    // color: $header-\r\n    color: $header-color-hover;\r\n  }\r\n}\r\n\r\n.u-textColorDarker { @extend %u-text-color-darker; }\r\n\r\n// Positions\r\n.u-relative { position: relative; }\r\n.u-absolute { position: absolute; }\r\n.u-absolute0 { @extend %u-absolute0; }\r\n.u-fixed { position: fixed !important; }\r\n\r\n.u-block { display: block !important }\r\n.u-inlineBlock { display: inline-block }\r\n\r\n//  Background\r\n.u-backgroundDark {\r\n  // background: linear-gradient(to bottom, rgba(0, 0, 0, .3) 29%, rgba(0, 0, 0, .6) 81%);\r\n  background-color: #000;\r\n  bottom: 0;\r\n  left: 0;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  z-index: 1;\r\n}\r\n\r\n// .u-background-white { background-color: #eeefee; }\r\n.u-backgroundWhite { background-color: #fafafa; }\r\n.u-backgroundColorGrayLight { background-color: #f0f0f0 !important; }\r\n\r\n// Clear\r\n.u-clear {\r\n  &::before,\r\n  &::after {\r\n    content: \" \";\r\n    display: table;\r\n  }\r\n  &::after { clear: both; }\r\n}\r\n\r\n// font size\r\n.u-fontSize13 { font-size: 13px !important }\r\n.u-fontSize14 { font-size: 14px }\r\n.u-fontSize15 { font-size: 15px !important }\r\n.u-fontSize20 { font-size: 20px }\r\n.u-fontSize21 { font-size: 21px }\r\n.u-fontSize22 { font-size: 22px }\r\n.u-fontSize28 { font-size: 28px !important; }\r\n.u-fontSize36 { font-size: 36px }\r\n.u-fontSize40 { font-size: 40px }\r\n.u-fontSizeBase { font-size: 18px }\r\n.u-fontSizeJumbo { font-size: 50px }\r\n.u-fontSizeLarge { font-size: 24px !important }\r\n.u-fontSizeLarger { font-size: 32px }\r\n.u-fontSizeLargest { font-size: 44px }\r\n.u-fontSizeMicro { font-size: 11px }\r\n.u-fontSizeSmall { font-size: 16px }\r\n.u-fontSizeSmaller { font-size: 14px }\r\n.u-fontSizeSmallest { font-size: 12px }\r\n\r\n@media #{$md-and-down} {\r\n  .u-md-fontSizeBase { font-size: 18px !important }\r\n  .u-md-fontSizeLarger { font-size: 32px }\r\n}\r\n\r\n// @media (max-width: 767px) {\r\n//   .u-xs-fontSizeBase {font-size: 18px}\r\n//   .u-xs-fontSize13 {font-size: 13px}\r\n//   .u-xs-fontSizeSmaller {font-size: 14px}\r\n//   .u-xs-fontSizeSmall {font-size: 16px}\r\n//   .u-xs-fontSize22 {font-size: 22px}\r\n//   .u-xs-fontSizeLarge {font-size: 24px}\r\n//   .u-xs-fontSize40 {font-size: 40px}\r\n//   .u-xs-fontSizeLarger {font-size: 32px}\r\n//   .u-xs-fontSizeSmallest {font-size: 12px}\r\n// }\r\n\r\n// font weight\r\n.u-fontWeightThin { font-weight: 300 }\r\n.u-fontWeightNormal { font-weight: 400 }\r\n// .u-fontWeightMedium { font-weight: 500 }\r\n.u-fontWeightSemibold { font-weight: 600 !important }\r\n.u-fontWeightBold { font-weight: 700 }\r\n\r\n.u-textUppercase { text-transform: uppercase }\r\n.u-textCapitalize { text-transform: capitalize }\r\n.u-textAlignCenter { text-align: center }\r\n\r\n.u-noWrapWithEllipsis {\r\n  overflow: hidden !important;\r\n  text-overflow: ellipsis !important;\r\n  white-space: nowrap !important;\r\n}\r\n\r\n// Margin\r\n.u-marginAuto { margin-left: auto; margin-right: auto; }\r\n.u-marginTop20 { margin-top: 20px }\r\n.u-marginTop30 { margin-top: 30px }\r\n.u-marginBottom15 { margin-bottom: 15px }\r\n.u-marginBottom20 { margin-bottom: 20px !important }\r\n.u-marginBottom30 { margin-bottom: 30px }\r\n.u-marginBottom40 { margin-bottom: 40px }\r\n\r\n// padding\r\n.u-padding0 { padding: 0 !important }\r\n.u-padding20 { padding: 20px }\r\n.u-padding15 { padding: 15px !important; }\r\n.u-paddingBottom2 { padding-bottom: 2px; }\r\n.u-paddingBottom30 { padding-bottom: 30px; }\r\n.u-paddingBottom20 { padding-bottom: 20px }\r\n.u-paddingRight10 { padding-right: 10px }\r\n.u-paddingLeft15 { padding-left: 15px }\r\n\r\n.u-paddingTop2 { padding-top: 2px }\r\n.u-paddingTop5 { padding-top: 5px; }\r\n.u-paddingTop10 { padding-top: 10px; }\r\n.u-paddingTop15 { padding-top: 15px; }\r\n.u-paddingTop20 { padding-top: 20px; }\r\n.u-paddingTop30 { padding-top: 30px; }\r\n\r\n.u-paddingBottom15 { padding-bottom: 15px; }\r\n\r\n.u-paddingRight20 { padding-right: 20px }\r\n.u-paddingLeft20 { padding-left: 20px }\r\n\r\n.u-contentTitle {\r\n  font-family: $primary-font;\r\n  font-style: normal;\r\n  font-weight: 700;\r\n  letter-spacing: -.028em;\r\n}\r\n\r\n// line-height\r\n.u-lineHeight1 { line-height: 1; }\r\n.u-lineHeightTight { line-height: 1.2 }\r\n\r\n// overflow\r\n.u-overflowHidden { overflow: hidden }\r\n\r\n// float\r\n.u-floatRight { float: right; }\r\n.u-floatLeft { float: left; }\r\n\r\n//  flex\r\n.u-flex { display: flex; }\r\n.u-flexCenter { align-items: center; display: flex; }\r\n// .u-flex--1 { flex: 1 }\r\n.u-flex1 { flex: 1 1 auto; }\r\n.u-flex0 { flex: 0 0 auto; }\r\n.u-flexWrap { flex-wrap: wrap }\r\n\r\n.u-flexColumn {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n}\r\n\r\n.u-flexEnd {\r\n  align-items: center;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.u-flexColumnTop {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n}\r\n\r\n// Background\r\n.u-backgroundSizeCover {\r\n  background-origin: border-box;\r\n  background-position: center;\r\n  background-size: cover;\r\n}\r\n\r\n// max widht\r\n.u-container {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.u-maxWidth1200 { max-width: 1200px }\r\n.u-maxWidth1000 { max-width: 1000px }\r\n.u-maxWidth740 { max-width: 740px }\r\n.u-maxWidth1040 { max-width: 1040px }\r\n.u-sizeFullWidth { width: 100% }\r\n\r\n// border\r\n.u-borderLighter { border: 1px solid rgba(0, 0, 0, .15); }\r\n.u-round { border-radius: 50% }\r\n.u-borderRadius2 { border-radius: 2px }\r\n\r\n.u-boxShadowBottom {\r\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .05);\r\n}\r\n\r\n// Heinght\r\n.u-height540 { height: 540px }\r\n.u-height280 { height: 280px }\r\n.u-height260 { height: 260px }\r\n.u-height100 { height: 100px }\r\n.u-borderBlackLightest { border: 1px solid rgba(0, 0, 0, .1) }\r\n\r\n// hide global\r\n.u-hide { display: none !important }\r\n\r\n// card\r\n.u-card {\r\n  background: #fff;\r\n  border: 1px solid rgba(0, 0, 0, .09);\r\n  border-radius: 3px;\r\n  // box-shadow: 0 1px 4px rgba(0, 0, 0, .04);\r\n  box-shadow: 0 1px 7px rgba(0, 0, 0, .05);\r\n  margin-bottom: 10px;\r\n  padding: 10px 20px 15px;\r\n}\r\n\r\n.no-avatar {\r\n  background-image: url('../images/avatar.png') !important\r\n}\r\n\r\n@media #{$md-and-down} {\r\n  .u-hide-before-md { display: none !important }\r\n  .u-md-heightAuto { height: auto; }\r\n  .u-md-height170 { height: 170px }\r\n  .u-md-relative { position: relative }\r\n}\r\n\r\n@media #{$lg-and-down} { .u-hide-before-lg { display: none !important } }\r\n\r\n// hide after\r\n@media #{$md-and-up} { .u-hide-after-md { display: none !important } }\r\n\r\n@media #{$lg-and-up} { .u-hide-after-lg { display: none !important } }\r\n","@media #{$lg-and-up} {\r\n  .content {\r\n    // flex: 1 !important;\r\n    max-width: calc(100% - 340px) !important;\r\n    // order: 1;\r\n    // overflow: hidden;\r\n  }\r\n\r\n  .sidebar {\r\n    width: 340px !important;\r\n    // flex: 0 0 340px !important;\r\n    // order: 2;\r\n  }\r\n}\r\n\r\n.row {\r\n  margin-left: - 10px;\r\n  margin-right: - 10px;\r\n\r\n  @extend .u-clear;\r\n\r\n  .col {\r\n    float: left;\r\n    padding-left: 10px;\r\n    padding-right: 10px;\r\n\r\n    $i: 1;\r\n\r\n    @while $i <= $num-cols {\r\n      $perc: unquote((100 / ($num-cols / $i)) + \"%\");\r\n\r\n      &.s#{$i} {\r\n        width: $perc;\r\n      }\r\n\r\n      $i: $i + 1;\r\n    }\r\n\r\n    @media #{$md-and-up} {\r\n\r\n      $i: 1;\r\n\r\n      @while $i <= $num-cols {\r\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\r\n\r\n        &.m#{$i} {\r\n          width: $perc;\r\n        }\r\n\r\n        $i: $i + 1;\r\n      }\r\n    }\r\n\r\n    @media #{$lg-and-up} {\r\n\r\n      $i: 1;\r\n\r\n      @while $i <= $num-cols {\r\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\r\n\r\n        &.l#{$i} {\r\n          width: $perc;\r\n        }\r\n\r\n        $i: $i + 1;\r\n      }\r\n    }\r\n  }\r\n}\r\n",".button {\n  background: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: 4px;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, .44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: $primary-font;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  &--chromeless {\n    border-radius: 0;\n    border-width: 0;\n    box-shadow: none;\n    color: rgba(0, 0, 0, .44);\n    height: auto;\n    line-height: inherit;\n    padding: 0;\n    text-align: left;\n    vertical-align: baseline;\n    white-space: normal;\n\n    &:active,\n    &:hover,\n    &:focus {\n      border-width: 0;\n      color: rgba(0, 0, 0, .6);\n    }\n  }\n\n  &--large {\n    font-size: 15px;\n    height: 44px;\n    line-height: 42px;\n    padding: 0 18px;\n  }\n\n  &--dark {\n    border-color: rgba(0, 0, 0, .6);\n    color: rgba(0, 0, 0, .6);\n\n    &:hover {\n      border-color: rgba(0, 0, 0, .8);\n      color: rgba(0, 0, 0, .8);\n    }\n  }\n}\n\n// Primary\n.button--primary {\n  border-color: $primary-color;\n  color: $primary-color;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n.buttonSet {\n  > .button {\n    margin-right: 8px;\n    vertical-align: middle;\n  }\n\n  > .button:last-child {\n    margin-right: 0;\n  }\n\n  .button--chromeless {\n    height: 37px;\n    line-height: 35px;\n  }\n\n  .button--large.button--chromeless,\n  .button--large.button--link {\n    height: 44px;\n    line-height: 42px;\n  }\n\n  & > .button--chromeless:last-child {\n    padding-right: 0;\n  }\n\n  & > .button--chromeless:not(.button--circle) {\n    margin-right: 0;\n    padding-right: 8px;\n  }\n\n  & > .button--chromeless + .button--chromeless:not(.button--circle) {\n    margin-left: 0;\n    padding-left: 8px;\n  }\n}\n","// stylelint-disable\r\n@font-face {\r\n  font-family: 'simply';\r\n  src:  url('../fonts/simply.eot?25764j');\r\n  src:  url('../fonts/simply.eot?25764j#iefix') format('embedded-opentype'),\r\n    url('../fonts/simply.ttf?25764j') format('truetype'),\r\n    url('../fonts/simply.woff?25764j') format('woff'),\r\n    url('../fonts/simply.svg?25764j#simply') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n\r\n[class^=\"i-\"]::before, [class*=\" i-\"]::before {\r\n  @extend %fonts-icons;\r\n}\r\n\r\n\r\n.i-audio:before {\r\n  content: \"\\e901\";\r\n}\r\n.i-rocket:before {\r\n  content: \"\\e902\";\r\n  color: #999;\r\n}\r\n.i-comments:before {\r\n  content: \"\\e900\";\r\n}\r\n.i-google:before {\r\n  content: \"\\f1a0\";\r\n}\r\n.i-telegram:before {\r\n  content: \"\\f2c6\";\r\n}\r\n.i-link:before {\r\n  content: \"\\f0c1\";\r\n}\r\n.i-reddit:before {\r\n  content: \"\\f281\";\r\n}\r\n.i-twitter:before {\r\n  content: \"\\f099\";\r\n}\r\n.i-github:before {\r\n  content: \"\\f09b\";\r\n}\r\n.i-linkedin:before {\r\n  content: \"\\f0e1\";\r\n}\r\n.i-youtube:before {\r\n  content: \"\\f16a\";\r\n}\r\n.i-stack-overflow:before {\r\n  content: \"\\f16c\";\r\n}\r\n.i-instagram:before {\r\n  content: \"\\f16d\";\r\n}\r\n.i-flickr:before {\r\n  content: \"\\f16e\";\r\n}\r\n.i-dribbble:before {\r\n  content: \"\\f17d\";\r\n}\r\n.i-behance:before {\r\n  content: \"\\f1b4\";\r\n}\r\n.i-spotify:before {\r\n  content: \"\\f1bc\";\r\n}\r\n.i-codepen:before {\r\n  content: \"\\f1cb\";\r\n}\r\n.i-facebook:before {\r\n  content: \"\\f230\";\r\n}\r\n.i-pinterest:before {\r\n  content: \"\\f231\";\r\n}\r\n.i-whatsapp:before {\r\n  content: \"\\f232\";\r\n}\r\n.i-snapchat:before {\r\n  content: \"\\f2ac\";\r\n}\r\n.i-arrow_left:before {\r\n  content: \"\\e314\";\r\n}\r\n.i-arrow_right:before {\r\n  content: \"\\e315\";\r\n}\r\n.i-play:before {\r\n  content: \"\\e037\";\r\n}\r\n.i-star-line:before {\r\n  content: \"\\e83a\";\r\n}\r\n.i-photo:before {\r\n  content: \"\\e412\";\r\n}\r\n.i-location:before {\r\n  content: \"\\e8b4\";\r\n}\r\n.i-check-circle:before {\r\n  content: \"\\e86c\";\r\n}\r\n.i-close:before {\r\n  content: \"\\e5cd\";\r\n}\r\n.i-favorite:before {\r\n  content: \"\\e87d\";\r\n}\r\n.i-star:before {\r\n  content: \"\\e838\";\r\n}\r\n.i-warning:before {\r\n  content: \"\\e002\";\r\n}\r\n.i-rss:before {\r\n  content: \"\\e0e5\";\r\n}\r\n.i-search:before {\r\n  content: \"\\e8b6\";\r\n}\r\n.i-send:before {\r\n  content: \"\\e163\";\r\n}\r\n.i-share:before {\r\n  content: \"\\e80d\";\r\n}\r\n","// animated Global\r\n.animated {\r\n  animation-duration: 1s;\r\n  animation-fill-mode: both;\r\n\r\n  &.infinite {\r\n    animation-iteration-count: infinite;\r\n  }\r\n}\r\n\r\n// animated All\r\n.bounceIn { animation-name: bounceIn; }\r\n.bounceInDown { animation-name: bounceInDown; }\r\n.pulse { animation-name: pulse; }\r\n\r\n// all keyframes Animates\r\n// bounceIn\r\n@keyframes bounceIn {\r\n  0%,\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80%,\r\n  100% { animation-timing-function: cubic-bezier(.215, .61, .355, 1); }\r\n  0% { opacity: 0; transform: scale3d(.3, .3, .3); }\r\n  20% { transform: scale3d(1.1, 1.1, 1.1); }\r\n  40% { transform: scale3d(.9, .9, .9); }\r\n  60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }\r\n  80% { transform: scale3d(.97, .97, .97); }\r\n  100% { opacity: 1; transform: scale3d(1, 1, 1); }\r\n}\r\n\r\n// bounceInDown\r\n@keyframes bounceInDown {\r\n  0%,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  100% { animation-timing-function: cubic-bezier(215, 610, 355, 1); }\r\n  0% { opacity: 0; transform: translate3d(0, -3000px, 0); }\r\n  60% { opacity: 1; transform: translate3d(0, 25px, 0); }\r\n  75% { transform: translate3d(0, -10px, 0); }\r\n  90% { transform: translate3d(0, 5px, 0); }\r\n  100% { transform: none; }\r\n}\r\n\r\n@keyframes pulse {\r\n  from { transform: scale3d(1, 1, 1); }\r\n  50% { transform: scale3d(1.2, 1.2, 1.2); }\r\n  to { transform: scale3d(1, 1, 1); }\r\n}\r\n\r\n@keyframes scroll {\r\n  0% { opacity: 0; }\r\n  10% { opacity: 1; transform: translateY(0) }\r\n  100% { opacity: 0; transform: translateY(10px); }\r\n}\r\n\r\n@keyframes opacity {\r\n  0% { opacity: 0; }\r\n  50% { opacity: 0; }\r\n  100% { opacity: 1; }\r\n}\r\n\r\n//  spin for pagination\r\n@keyframes spin {\r\n  from { transform: rotate(0deg); }\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n@keyframes tooltip {\r\n  0% { opacity: 0; transform: translate(-50%, 6px); }\r\n  100% { opacity: 1; transform: translate(-50%, 0); }\r\n}\r\n\r\n@keyframes loading-bar {\r\n  0% { transform: translateX(-100%) }\r\n  40% { transform: translateX(0) }\r\n  60% { transform: translateX(0) }\r\n  100% { transform: translateX(100%) }\r\n}\r\n","// Header\n// ==========================================================================\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n// button-nav\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n\n  span {\n    background-color: $header-color;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px;\n\n    &:first-child { transform: translate(0, -6px); }\n    &:last-child { transform: translate(0, 6px); }\n  }\n}\n\n.header {\n  z-index: 999;\n\n  &-wrap { height: 55px; }\n\n  &-logo {\n    color: #fff !important;\n    height: 30px;\n\n    img { max-height: 100%; }\n  }\n\n  &-logo,\n  .button-search--open,\n  .button-nav--toggle { z-index: 150; }\n\n  // header description home page\n  &-description {\n    color: rgba(255, 255, 255, 0.8);\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 650px;\n  }\n}\n\n// not have logo\n.not-logo .header-logo { height: auto !important }\n\n// Header Follow\n// ==========================================================================\n\n.follow > a { padding-left: 15px }\n\n// Header menu\n// ==========================================================================\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n\n  ul {\n    display: flex;\n    margin-right: 20px;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n\n  li {\n    float: left;\n\n    a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase;\n    }\n  }\n}\n\n// Media Query\n// ==========================================================================\n\n@media #{$md-and-up} {\n  body.is-home {\n    .header {\n      &-wrap { height: 200px; }\n\n      &-logo {\n        height: 50px;\n      }\n    }\n  }\n\n  // Main Menu Fixed\n  // ==========================================================================\n  // .mainMenu--affixed {\n  //   position: fixed;\n  //   top: 0;\n  // }\n}\n\n// Header menu\n// ==========================================================================\n@media #{$md-and-down} {\n  .header {\n    position: fixed;\n\n    &-wrap { height: $header-height-mobile }\n  }\n\n  .header-logo--wrap { text-align: left }\n  .header-logo { display: flex; flex: 1 1 auto; }\n  .header-logo span { font-size: 24px }\n\n  .header-top {\n    display: flex;\n    align-items: center;\n  }\n\n  // show menu mobile\n  body.is-showNavMob {\n    overflow: hidden;\n\n    .sideNav { transform: translateX(0); }\n\n    .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg);\n\n      span:first-child { transform: rotate(45deg) translate(0, 0); }\n      span:nth-child(2) { transform: scaleX(0); }\n      span:last-child { transform: rotate(-45deg) translate(0, 0); }\n    }\n\n    .header .button-search--toggle { display: none; }\n    .main, .footer { transform: translateX(-25%); }\n  }\n}\n",".avatar-image--smaller {\r\n  width: 40px;\r\n  height: 40px;\r\n}\r\n\r\n.avatar-image {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  border-radius: 100%;\r\n}\r\n\r\n.story {\r\n  &-title {\r\n    letter-spacing: -.028em;\r\n    line-height: 24px !important;\r\n  }\r\n\r\n  &-excerpt {\r\n    display: -webkit-box;\r\n    margin-top: 5px;\r\n    max-height: 60px;\r\n    line-height: 20px;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-line-clamp: 3;\r\n  }\r\n\r\n  &-tag i {\r\n    color: rgba(0, 0, 0, .3) !important;\r\n    display: flex;\r\n    margin-right: 5px;\r\n  }\r\n}\r\n\r\n//  media Query\r\n@media #{$md-and-up} {\r\n  .story--260 {\r\n    .story-wrap { height: 260px }\r\n    .story-image { height: 100px }\r\n\r\n    .story-body {\r\n      height: 160px;\r\n    }\r\n  }\r\n\r\n  .story--200 {\r\n    .story-wrap { height: 260px; display: flex }\r\n\r\n    .story-body {\r\n      flex: 1 1 auto;\r\n      height: 100%;\r\n    }\r\n\r\n    .story-image {\r\n      flex: 0 0 auto;\r\n      height: 100%;\r\n      width: 200px;\r\n    }\r\n  }\r\n}\r\n\r\n// card for (author and tag) story\r\n// ==========================================================================\r\n.card {\r\n  background: #fff;\r\n  border: 1px solid rgba(0, 0, 0, .09);\r\n  border-radius: 3px;\r\n  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);\r\n  margin-bottom: 10px;\r\n  padding: 10px 20px 15px;\r\n\r\n  &--p {\r\n    font-family: $secundary-font;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    letter-spacing: -.004em;\r\n    line-height: 1.58;\r\n  }\r\n\r\n  &-image {\r\n    max-height: 240px;\r\n    max-width: 360px;\r\n  }\r\n\r\n  // if story is featured\r\n  &.card--large {\r\n    .card-body { display: flex; flex-direction: column; }\r\n\r\n    .card-image {\r\n      height: 200px;\r\n      margin-bottom: 20px;\r\n      margin-top: 5px;\r\n      max-width: 100%;\r\n      order: -1;\r\n    }\r\n\r\n    .card-image--link {\r\n      left: 50%;\r\n      position: absolute;\r\n      top: 50%;\r\n      transform: translate(-50%, -50%);\r\n      width: 100%;\r\n    }\r\n  }\r\n\r\n  // even\r\n  &.card--medium {\r\n    .card-excerpt {\r\n      color: rgba(0, 0, 0, .44);\r\n      font-family: $primary-font;\r\n      font-size: 23px;\r\n      letter-spacing: -.022em;\r\n      line-height: 1.22;\r\n    }\r\n  }\r\n}\r\n",".cover-lazy {\r\n  opacity: .5;\r\n  z-index: 2;\r\n}\r\n\r\n// Home Page Styles\r\n// ==========================================================================\r\n\r\n// .homePage {\r\n//   .entry {\r\n//     .u-backgroundDark { display: none; }\r\n//     &-image { height: 172px; }\r\n//   }\r\n// }\r\n\r\n// @media #{$md-and-up} {\r\n//   .homePage {\r\n//     .entry {\r\n//       &-image { height: 174px; }\r\n\r\n//       &.entry1,\r\n//       &.entry7 {\r\n//         flex-basis: 100%;\r\n//         max-width: 100%;\r\n//       }\r\n\r\n//       // first post with img 66%\r\n//       &.entry1 {\r\n//         display: flex;\r\n\r\n//         .entry-image {\r\n//           height: 350px;\r\n//           margin-right: 15px;\r\n//           width: 66.66666667% !important;\r\n//         }\r\n//         .entry-title {font-size: 36px !important}\r\n//         .entry-body {\r\n//           padding: 0 0 0 13px;\r\n//           width: 33.33333333% !important;\r\n//         }\r\n//       }\r\n\r\n//       // entry full with background all\r\n//       &.entry7 {\r\n//         .entry-image {height: 450px;}\r\n//         .entry-title {font-size: 44px !important}\r\n//         .entry-excerpt { font-size: 24px; line-height: 1.3;}\r\n//         .u-accentColor--iconNormal { fill: #fff; }\r\n//       }\r\n\r\n//       &.entry7,\r\n//       &.entry13,\r\n//       &.entry14 {\r\n//         .u-backgroundDark { display: block; }\r\n\r\n//         .entry-body {\r\n//           bottom: 0;\r\n//           left: 0;\r\n//           margin: 30px 40px;\r\n//           max-width: 600px;\r\n//           position: absolute;\r\n//           z-index: 2;\r\n//         }\r\n\r\n//         &:not(.not--image) {\r\n//           .entry-body {color: #fff;}\r\n//           .entry-author {\r\n//             color: rgba(255, 255, 255, .9);\r\n//             a, .entry-date {color: rgba(255, 255, 255, .9); }\r\n//           }\r\n//         }\r\n//       }\r\n\r\n//       &.entry13, &.entry14 {\r\n//         .entry-image {height: 450px;}\r\n//         .entry-title {font-size: 32px !important}\r\n//         .entry-excerpt {display: none;}\r\n//         .entry-byline {margin-top: 20px;}\r\n//         .entry-body {max-width: 400px;}\r\n//       }\r\n\r\n//       // entry 50%\r\n//       &.entry5, &.entry6, &.entry11, &.entry12 {\r\n//         flex-basis: 50%;\r\n//         max-width: 50%;\r\n//         .entry-image { height: 274px;}\r\n//       }\r\n\r\n//       // entry 13\r\n//       &.entry13 {\r\n//         flex-basis: 60%;\r\n//         max-width: 60%;\r\n//         padding-right: 0;\r\n//       }\r\n\r\n//       // entry 14\r\n//       &.entry14 {\r\n//         flex-basis: 40%;\r\n//         max-width: 40%;\r\n//       }\r\n\r\n//     }\r\n//   }\r\n// }\r\n",".post {\n  &-title {\n    line-height: 1.04;\n    font-weight: 600;\n  }\n\n  &-excerpt {\n    font-family: $secundary-font;\n    font-size: 22px;\n    line-height: 1.5;\n    letter-spacing: -.022em;\n  }\n\n  // &-footer {\n  //   border-bottom: 1px solid rgba(0,0,0,.05);\n  // }\n}\n\n// meta line\n.postMetaInline {\n  letter-spacing: 0;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 14px;\n  color: rgba(0, 0, 0, .54);\n  fill: rgba(0, 0, 0, .54);\n}\n\n// post content body\n// ==========================================================================\n.post-body {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  a {\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, 0) 50%);\n    background-position: 0 1.07em;\n    background-repeat: repeat-x;\n    background-size: 2px .1em;\n    text-decoration: none;\n  }\n\n  img {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n    // max-width: 1000px;\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    margin-top: 30px;\n    font-weight: 600;\n    font-style: normal;\n  }\n\n  h2 {\n    font-size: 40px;\n    letter-spacing: -.03em;\n    line-height: 1.04;\n    margin-top: 54px;\n  }\n\n  h3 {\n    font-size: 32px;\n    letter-spacing: -.02em;\n    line-height: 1.15;\n    margin-top: 52px;\n  }\n\n  h4 {\n    font-size: 24px;\n    letter-spacing: -.018em;\n    line-height: 1.22;\n    margin-top: 30px;\n  }\n\n  p {\n    font-family: $secundary-font;\n    font-size: 1.125rem;\n    font-weight: 400;\n    letter-spacing: -.003em;\n    line-height: 1.7;\n    margin-top: 25px;\n  }\n\n  ul,\n  ol {\n    counter-reset: post;\n    font-family: $secundary-font;\n    font-size: 1.125rem;\n    margin-top: 30px;\n\n    li {\n      letter-spacing: -.003em;\n      line-height: 1.58;\n      margin-bottom: 14px;\n      margin-left: 30px;\n\n      &::before {\n        box-sizing: border-box;\n        display: inline-block;\n        margin-left: -78px;\n        position: absolute;\n        text-align: right;\n        width: 78px;\n      }\n    }\n  }\n\n  ul li::before {\n    content: '\\2022';\n    font-size: 16.8px;\n    padding-right: 15px;\n    padding-top: 3px;\n  }\n\n  ol li::before {\n    content: counter(post) \".\";\n    counter-increment: post;\n    padding-right: 12px;\n  }\n\n  h1, h2, h3, h4, h5, h6, p,\n  ol, ul, hr, pre, dl, blockquote, .kg-embed-card {\n    min-width: 100%;\n  }\n\n  & > ul { margin-top: 35px }\n\n  & > iframe,\n  & > img,\n  .kg-image-card,\n  .kg-gallery-card,\n  .kg-card,\n  .kg-embed-card {\n    margin-top: 30px !important\n  }\n}\n\n// fisrt p\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n// post Tags\n// ==========================================================================\n.post-tags {\n  a {\n    background: rgba(0, 0, 0, .08);\n    border: none;\n    border-radius: 3px;\n    color: rgba(0, 0, 0, .6);\n    margin-bottom: 8px;\n    margin-right: 8px;\n\n    &:hover {\n      background: rgba(0, 0, 0, .1);\n      color: rgba(0, 0, 0, .6);\n    }\n  }\n}\n\n// post Newsletter\n// ==========================================================================\n\n.post-newsletter {\n  outline: 1px solid #f0f0f0 !important;\n  outline-offset: -1px;\n  border-radius: 2px;\n  padding: 40px 10px;\n\n  .newsletter-form { max-width: 400px }\n\n  .form-group { width: 80%; padding-right: 5px; }\n\n  .form--input {\n    border: 0;\n    border-bottom: 1px solid #ccc;\n    height: 48px;\n    padding: 6px 12px 8px 5px;\n    resize: none;\n    width: 100%;\n\n    &:focus {\n      outline: 0;\n    }\n  }\n\n  .form--btn {\n    background-color: #a9a9a9;\n    border-radius: 0 45px 45px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    padding: 0;\n    width: 20%;\n\n    &::before {\n      @extend %u-absolute0;\n\n      background-color: #a9a9a9;\n      border-radius: 0 45px 45px 0;\n      line-height: 45px;\n      z-index: 2;\n    }\n\n    &:hover { opacity: .8; }\n    &:focus { outline: 0; }\n  }\n}\n\n// Card Post\n// ==========================================================================\n.cardPost {\n  &-image {\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\n    border-radius: 4px 4px 0 0;\n    height: 160px;\n  }\n\n  // &-excerpt { font-family: $secundary-font }\n\n  // &-excerpt,\n  &-title {\n    color: rgba(0, 0, 0, .9);\n    -webkit-box-orient: vertical !important;\n    -webkit-line-clamp: 2 !important;\n    display: -webkit-box !important;\n    line-height: 1.1 !important;\n    max-height: 2.2em !important;\n    text-overflow: ellipsis !important;\n  }\n\n  .u-card {\n    height: 296px;\n    margin-bottom: 20px;\n  }\n}\n\n// Share Post\n// ==========================================================================\n.sharePost {\n  // margin-left: -130px;\n  left: -130px;\n  margin-top: 28px;\n  width: 65px;\n  position: absolute !important;\n\n  //stylelint-disable-next-line\n  a {\n    background-image: none;\n    border-radius: 5px;\n    color: #fff;\n    height: 36px;\n    line-height: 20px;\n    margin: 10px auto;\n    padding: 8px;\n    text-decoration: none;\n    width: 36px;\n  }\n}\n\n// Post Actions\n// ==========================================================================\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, .44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  // transform: translateY(100%);\n  // transition: transform .3s;\n  transform: translate3d(0, 0, 0);\n  transition: all 0.25s ease-in-out;\n  // visibility: hidden;\n  z-index: 400;\n\n  &.is-visible {\n    transform: translateY(100%);\n    // transform: translateY(0);\n    // transition-delay: 0s;\n    // visibility: visible;\n  }\n\n  &-wrap {\n    max-width: 1200px;\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n\n  .separator {\n    background: rgba(0, 0, 0, .15);\n    height: 24px;\n    margin: 0 15px;\n    width: 1px;\n  }\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n// Gallery\n// ==========================================================================\n.kg-gallery-container {\n  display: flex;\n  flex-direction: column;\n  max-width: 100%;\n  width: 100%;\n}\n\n.kg-gallery-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.kg-gallery-image img {\n  display: block;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.kg-gallery-row:not(:first-of-type) {\n  margin: 0.75em 0 0 0;\n}\n\n.kg-gallery-image:not(:first-of-type) {\n  margin: 0 0 0 0.75em;\n}\n\n@media #{$md-and-down} {\n  .post-body {\n    h2 {\n      font-size: 32px;\n      margin-top: 26px;\n    }\n\n    h3 {\n      font-size: 28px;\n      margin-top: 28px;\n    }\n\n    h4 {\n      font-size: 22px;\n      margin-top: 22px;\n    }\n\n    q {\n      font-size: 22px !important;\n      letter-spacing: -.008em !important;\n      line-height: 1.4 !important;\n    }\n\n    & > p:first-of-type::first-letter {\n      font-size: 54.85px;\n      margin-left: -4px;\n      margin-right: 6px;\n      padding-top: 3.5px;\n    }\n\n    ol, ul, p {\n      font-size: 18px;\n      letter-spacing: -.004em;\n      line-height: 1.58;\n    }\n\n    iframe { width: 100% !important; }\n  }\n\n  // Post Related\n  .post-related {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n}\n",".author {\r\n  background-color: #fff;\r\n  color: rgba(0, 0, 0, .6);\r\n  min-height: 400px;\r\n\r\n  &-avatar {\r\n    height: 80px;\r\n    width: 80px;\r\n  }\r\n\r\n  &-meta span {\r\n    display: inline-block;\r\n    font-size: 17px;\r\n    font-style: italic;\r\n    margin: 0 25px 16px 0;\r\n    opacity: .8;\r\n    word-wrap: break-word;\r\n  }\r\n\r\n  &-name { color: rgba(0, 0, 0, .8) }\r\n\r\n  &-bio { max-width: 600px; }\r\n}\r\n\r\n.author.has--image {\r\n  color: #fff !important;\r\n  text-shadow: 0 0 10px rgba(0, 0, 0, .33);\r\n\r\n  .author-link:hover { opacity: 1 !important }\r\n\r\n  .u-accentColor--iconNormal { fill: #fff; }\r\n\r\n  a,\r\n  .author-name { color: #fff; }\r\n\r\n  .author-follow a {\r\n    border: 2px solid;\r\n    border-color: hsla(0, 0%, 100%, .5) !important;\r\n    font-size: 16px;\r\n  }\r\n}\r\n\r\n@media #{$md-and-down} {\r\n  .author-meta span { display: block; }\r\n  .author-header { display: block; }\r\n  .author-avatar { margin: 0 auto 20px; }\r\n}\r\n","// Search\r\n// ==========================================================================\r\n.search {\r\n  background-color: #fff;\r\n  bottom: 100% !important;\r\n  height: 0;\r\n  overflow: hidden;\r\n  padding: 0 40px;\r\n  transition: all .3s;\r\n  visibility: hidden;\r\n  z-index: 9999;\r\n\r\n  &-form {\r\n    max-width: 680px;\r\n    margin-top: 80px;\r\n\r\n    &::before {\r\n      background: #eee;\r\n      bottom: 0;\r\n      content: '';\r\n      display: block;\r\n      height: 2px;\r\n      left: 0;\r\n      position: absolute;\r\n      width: 100%;\r\n      z-index: 1;\r\n    }\r\n\r\n    input {\r\n      border: none;\r\n      display: block;\r\n      line-height: 40px;\r\n      padding-bottom: 8px;\r\n\r\n      &:focus { outline: 0; }\r\n    }\r\n  }\r\n\r\n  // result\r\n  &-results {\r\n    max-height: calc(90% - 100px);\r\n    max-width: 680px;\r\n    overflow: auto;\r\n\r\n    a {\r\n      border-bottom: 1px solid #eee;\r\n      padding: 12px 0;\r\n\r\n      &:hover { color: rgba(0, 0, 0, .44) }\r\n    }\r\n  }\r\n}\r\n\r\n.button-search--close {\r\n  position: absolute !important;\r\n  right: 50px;\r\n  top: 20px;\r\n}\r\n\r\nbody.is-search {\r\n  overflow: hidden;\r\n\r\n  .search {\r\n    bottom: 0 !important;\r\n    height: 100%;\r\n    transition: all .3s;\r\n    visibility: visible;\r\n  }\r\n}\r\n",".sidebar {\r\n  &-title {\r\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\r\n    font-weight: 700;\r\n    margin-bottom: 10px;\r\n    padding-bottom: 5px;\r\n  }\r\n\r\n  // border for post\r\n  &-border {\r\n    border-left: 3px solid $primary-color;\r\n    bottom: 0;\r\n    color: rgba(0, 0, 0, .2);\r\n    font-family: $secundary-font;\r\n    left: 0;\r\n    padding: 15px 10px 10px;\r\n    top: 0;\r\n  }\r\n}\r\n\r\n.sidebar-post {\r\n  &:nth-child(3n) { .sidebar-border { border-color: darken(orange, 2%); } }\r\n  &:nth-child(3n+2) { .sidebar-border { border-color: #26a8ed } }\r\n\r\n  &--title {\r\n    line-height: 1.1;\r\n  }\r\n\r\n  &--link {\r\n    background-color: #fff;\r\n    border-bottom: 1px solid rgba(0, 0, 0, .09);\r\n    box-shadow: 0 1px 7px rgba(0, 0, 0, .09);\r\n    min-height: 50px;\r\n    padding: 15px 15px 15px 55px;\r\n\r\n    &:hover { .sidebar-border { background-color: rgba(229, 239, 245, 1) } }\r\n  }\r\n}\r\n","// Navigation Mobile\r\n.sideNav {\r\n  // background-color: $primary-color;\r\n  color: rgba(0, 0, 0, 0.8);\r\n  height: 100vh;\r\n  padding: $header-height-mobile 20px;\r\n  position: fixed !important;\r\n  transform: translateX(100%);\r\n  transition: 0.4s;\r\n  will-change: transform;\r\n  z-index: 99;\r\n\r\n  &-menu a { padding: 10px 20px; }\r\n\r\n  &-wrap {\r\n    background: #eee;\r\n    overflow: auto;\r\n    padding: 20px 0;\r\n    top: $header-height-mobile;\r\n  }\r\n\r\n  &-section {\r\n    border-bottom: solid 1px #ddd;\r\n    margin-bottom: 8px;\r\n    padding-bottom: 8px;\r\n  }\r\n\r\n  &-follow {\r\n    border-top: 1px solid #ddd;\r\n    margin: 15px 0;\r\n\r\n    a {\r\n      color: #fff;\r\n      display: inline-block;\r\n      height: 36px;\r\n      line-height: 20px;\r\n      margin: 0 5px 5px 0;\r\n      min-width: 36px;\r\n      padding: 8px;\r\n      text-align: center;\r\n      vertical-align: middle;\r\n    }\r\n\r\n    @each $social-name, $color in $social-colors {\r\n      .i-#{$social-name} {\r\n        @extend .bg-#{$social-name};\r\n      }\r\n    }\r\n  }\r\n}\r\n","//  Follow me btn is post\r\n.simply-follow {\r\n  &:hover {\r\n    .simply-hover-hidden { display: none !important }\r\n    .simply-hover-show { display: inline-block !important }\r\n  }\r\n\r\n  &-btn {\r\n    height: 19px;\r\n    line-height: 17px;\r\n    padding: 0 10px;\r\n  }\r\n}\r\n\r\n@media #{$md-and-up} {\r\n  // background image featured in tag and author\r\n  .is-author.has-featured-image,\r\n  .is-tag.has-featured-image {\r\n    .header,\r\n    .mainMenu {\r\n      background-color: transparent !important;\r\n      border-bottom: 1px solid rgba(255, 255, 255, 0.1);\r\n    }\r\n    .u-headerColorLink a { color: #fff; }\r\n\r\n    .main {\r\n      margin-top: -56px;\r\n    }\r\n\r\n    .tag,\r\n    .author {\r\n      padding-top: 100px;\r\n    }\r\n  }\r\n\r\n  // is-article\r\n  .is-article {\r\n    .post-header { padding-top: 35px; }\r\n    .post-body { margin-top: 30px; }\r\n\r\n    .post-image,\r\n    .video-post-format { margin-top: 50px; }\r\n  }\r\n}\r\n",".is-subscribe .footer {\r\n  background-color: #f0f0f0;\r\n}\r\n\r\n.subscribe {\r\n  min-height: 80vh !important;\r\n  height: 100%;\r\n  background-color: #f0f0f0 !important;\r\n\r\n  &-card {\r\n    background-color: #D7EFEE;\r\n    box-shadow: 0 2px 10px rgba(0, 0, 0, .15);\r\n    border-radius: 4px;\r\n    width: 900px;\r\n    height: 550px;\r\n    padding: 50px;\r\n    margin: 5px;\r\n  }\r\n\r\n  form {\r\n    max-width: 300px;\r\n  }\r\n\r\n  &-form {\r\n    height: 100%;\r\n  }\r\n\r\n  &-input {\r\n    background: 0 0;\r\n    border: 0;\r\n    border-bottom: 1px solid #cc5454;\r\n    border-radius: 0;\r\n    padding: 7px 5px;\r\n    height: 45px;\r\n    outline: 0;\r\n    font-family: $primary-font;\r\n\r\n    &::placeholder {\r\n      color: #cc5454;\r\n    }\r\n  }\r\n\r\n  .button {\r\n    background: #029e74;\r\n    border-color: #029e74;\r\n    color: #fff;\r\n    box-shadow: 0 1px 7px rgba(0, 0, 0, .05);\r\n    font-size: 17px !important;\r\n  }\r\n\r\n  .main-error {\r\n    color: #cc5454;\r\n    font-size: 16px;\r\n    margin-top: 15px;\r\n  }\r\n}\r\n\r\n// Success\r\n.subscribe-success {\r\n  .subscribe-card {\r\n    background-color: #E8F3EC;\r\n  }\r\n}\r\n\r\n@media #{$md-and-down} {\r\n  .subscribe-card {\r\n    height: auto;\r\n    width: auto;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 17 */
/*!**************************************************!*\
  !*** ../node_modules/css-loader/lib/css-base.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 18 */
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ 19);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 19 */
/*!************************************************!*\
  !*** ../node_modules/style-loader/lib/urls.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 20 */,
/* 21 */
/*!**************************!*\
  !*** ./fonts/simply.eot ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.eot";

/***/ }),
/* 22 */
/*!****************************************************************************************!*\
  !*** multi ./build/util/../helpers/hmr-client.js ./scripts/main.js ./styles/main.scss ***!
  \****************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Smigol\projects\ghost\content\themes\simply\src\build\util/../helpers/hmr-client.js */2);
__webpack_require__(/*! ./scripts/main.js */23);
module.exports = __webpack_require__(/*! ./styles/main.scss */45);


/***/ }),
/* 23 */
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismjs__ = __webpack_require__(/*! prismjs */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prismjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs_plugins_autoloader_prism_autoloader__ = __webpack_require__(/*! prismjs/plugins/autoloader/prism-autoloader */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs_plugins_autoloader_prism_autoloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prismjs_plugins_autoloader_prism_autoloader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery_lazyload__ = __webpack_require__(/*! jquery-lazyload */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery_lazyload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_theia_sticky_sidebar__ = __webpack_require__(/*! theia-sticky-sidebar */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_theia_sticky_sidebar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_theia_sticky_sidebar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autoload_jquery_ghostHunter_js__ = __webpack_require__(/*! ./autoload/jquery.ghostHunter.js */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autoload_jquery_ghostHunter_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__autoload_jquery_ghostHunter_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__autoload_transition_js__ = __webpack_require__(/*! ./autoload/transition.js */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__autoload_transition_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__autoload_transition_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__autoload_zoom_js__ = __webpack_require__(/*! ./autoload/zoom.js */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__autoload_zoom_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__autoload_zoom_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_pagination__ = __webpack_require__(/*! ./app/pagination */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__app_pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_Router__ = __webpack_require__(/*! ./util/Router */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes_common__ = __webpack_require__(/*! ./routes/common */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__routes_post__ = __webpack_require__(/*! ./routes/post */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__routes_video__ = __webpack_require__(/*! ./routes/video */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__routes_audio__ = __webpack_require__(/*! ./routes/audio */ 44);
// import external dependencies





// Import everything from autoload
  

// Pagination infinite scroll


// import local dependencies







/** Populate Router instance with DOM routes */
var routes = new __WEBPACK_IMPORTED_MODULE_8__util_Router__["a" /* default */]({
  // All pages
  common: __WEBPACK_IMPORTED_MODULE_9__routes_common__["a" /* default */],
  // article
  isArticle: __WEBPACK_IMPORTED_MODULE_10__routes_post__["a" /* default */],
  // video post format
  isVideo: __WEBPACK_IMPORTED_MODULE_11__routes_video__["a" /* default */],
  // Audio post Format
  isAudio: __WEBPACK_IMPORTED_MODULE_12__routes_audio__["a" /* default */],
});

// Load Events
$(document).on('ready', function () { return routes.loadEvents(); });

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 24 */
/*!****************************************!*\
  !*** ../node_modules/prismjs/prism.js ***!
  \****************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-([\w-]+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o, visited) {
			var type = _.util.type(o);
			visited = visited || {};

			switch (type) {
				case 'Object':
					if (visited[_.util.objId(o)]) {
						return visited[_.util.objId(o)];
					}
					var clone = {};
					visited[_.util.objId(o)] = clone;

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key], visited);
						}
					}

					return clone;

				case 'Array':
					if (visited[_.util.objId(o)]) {
						return visited[_.util.objId(o)];
					}
					var clone = [];
					visited[_.util.objId(o)] = clone;

					o.forEach(function (v, i) {
						clone[i] = _.util.clone(v, visited);
					});

					return clone;
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type, visited) {
			visited = visited || {};
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, null, visited);
					}
					else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, i, visited);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		_.highlightAllUnder(document, async, callback);
	},

	highlightAllUnder: function(container, async, callback) {
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || container.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		if (element.parentNode) {
			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-sanity-check', env);

		if (!env.code || !env.grammar) {
			if (env.code) {
				_.hooks.run('before-highlight', env);
				env.element.textContent = env.code;
				_.hooks.run('after-highlight', env);
			}
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var env = {
			code: text,
			grammar: grammar,
			language: language
		};
		_.hooks.run('before-tokenize', env);
		env.tokens = _.tokenize(env.code, env.grammar);
		_.hooks.run('after-tokenize', env);
		return Token.stringify(_.util.encode(env.tokens), env.language);
	},

	matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
		var Token = _.Token;

		for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			if (token == target) {
				return;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					if (greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						var match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						// If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						if (strarr[i] instanceof Token) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						pattern.lastIndex = 0;

						var match = pattern.exec(str),
							delNum = 1;
					}

					if (!match) {
						if (oneshot) {
							break;
						}

						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1] ? match[1].length : 0;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						++i;
						pos += before.length;
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);

					if (delNum != 1)
						_.matchGrammar(text, strarr, grammar, i, pos, true, token);

					if (oneshot)
						break;
				}
			}
		}
	},

	tokenize: function(text, grammar, language) {
		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		_.matchGrammar(text, strarr, grammar, 0, 0, false);

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
	this.type = type;
	this.content = content;
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || "").length|0;
	this.greedy = !!greedy;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
		return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}).join(' ');

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (!_.manual && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
}

return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
				inside: {
					'punctuation': [
						/^=/,
						{
							pattern: /(^|[^\\])["']/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;


/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\s\S]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css',
			greedy: true
		}
	});

	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
	'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
		lookbehind: true,
		greedy: true
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
		alias: 'function'
	},
	'constant': /\b[A-Z][A-Z\d_]*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\${[^}]+}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\${|}$/,
						alias: 'punctuation'
					},
					rest: null // See below
				}
			},
			'string': /[\s\S]+/
		}
	}
});
Prism.languages.javascript['template-string'].inside['interpolation'].inside.rest = Prism.languages.javascript;

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript',
			greedy: true
		}
	});
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function() {

		var Extensions = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
			var src = pre.getAttribute('data-src');

			var language, parent = pre;
			var lang = /\blang(?:uage)?-([\w-]+)\b/i;
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (pre.className.match(lang) || [, ''])[1];
			}

			if (!language) {
				var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
				language = Extensions[extension] || extension;
			}

			var code = document.createElement('code');
			code.className = 'language-' + language;

			pre.textContent = '';

			code.textContent = 'Loading…';

			pre.appendChild(code);

			var xhr = new XMLHttpRequest();

			xhr.open('GET', src, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {

					if (xhr.status < 400 && xhr.responseText) {
						code.textContent = xhr.responseText;

						Prism.highlightElement(code);
					}
					else if (xhr.status >= 400) {
						code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
					}
					else {
						code.textContent = '✖ Error: File does not exist or is empty';
					}
				}
			};

			xhr.send(null);
		});

		if (Prism.plugins.toolbar) {
			Prism.plugins.toolbar.registerButton('download-file', function (env) {
				var pre = env.element.parentNode;
				if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-download-link')) {
					return;
				}
				var src = pre.getAttribute('data-src');
				var a = document.createElement('a');
				a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
				a.setAttribute('download', '');
				a.href = src;
				return a;
			});
		}

	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 25)))

/***/ }),
/* 25 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 26 */
/*!**********************************************************************!*\
  !*** ../node_modules/prismjs/plugins/autoloader/prism-autoloader.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.createElement) {
		return;
	}

	// The dependencies map is built automatically with gulp
	var lang_dependencies = /*languages_placeholder[*/{"javascript":"clike","actionscript":"javascript","arduino":"cpp","aspnet":["markup","csharp"],"bison":"c","c":"clike","csharp":"clike","cpp":"c","coffeescript":"javascript","crystal":"ruby","css-extras":"css","d":"clike","dart":"clike","django":"markup","erb":["ruby","markup-templating"],"fsharp":"clike","flow":"javascript","glsl":"clike","go":"clike","groovy":"clike","haml":"ruby","handlebars":"markup-templating","haxe":"clike","java":"clike","jolie":"clike","kotlin":"clike","less":"css","markdown":"markup","markup-templating":"markup","n4js":"javascript","nginx":"clike","objectivec":"c","opencl":"cpp","parser":"markup","php":["clike","markup-templating"],"php-extras":"php","plsql":"sql","processing":"clike","protobuf":"clike","pug":"javascript","qore":"clike","jsx":["markup","javascript"],"tsx":["jsx","typescript"],"reason":"clike","ruby":"clike","sass":"css","scss":"css","scala":"java","smarty":"markup-templating","soy":"markup-templating","swift":"clike","tap":"yaml","textile":"markup","tt2":["clike","markup-templating"],"twig":"markup","typescript":"javascript","vbnet":"basic","velocity":"markup","wiki":"markup","xeora":"markup","xquery":"markup"}/*]*/;

	var lang_data = {};

	var ignored_language = 'none';

	var script = document.getElementsByTagName('script');
	script = script[script.length - 1];
	var languages_path = 'components/';
	if(script.hasAttribute('data-autoloader-path')) {
		var path = script.getAttribute('data-autoloader-path').trim();
		if(path.length > 0 && !/^[a-z]+:\/\//i.test(script.src)) {
			languages_path = path.replace(/\/?$/, '/');
		}
	} else if (/[\w-]+\.js$/.test(script.src)) {
		languages_path = script.src.replace(/[\w-]+\.js$/, 'components/');
	}
	var config = Prism.plugins.autoloader = {
		languages_path: languages_path,
		use_minified: true
	};

	/**
	 * Lazy loads an external script
	 * @param {string} src
	 * @param {function=} success
	 * @param {function=} error
	 */
	var script = function (src, success, error) {
		var s = document.createElement('script');
		s.src = src;
		s.async = true;
		s.onload = function() {
			document.body.removeChild(s);
			success && success();
		};
		s.onerror = function() {
			document.body.removeChild(s);
			error && error();
		};
		document.body.appendChild(s);
	};

	/**
	 * Returns the path to a grammar, using the language_path and use_minified config keys.
	 * @param {string} lang
	 * @returns {string}
	 */
	var getLanguagePath = function (lang) {
		return config.languages_path +
			'prism-' + lang
			+ (config.use_minified ? '.min' : '') + '.js'
	};

	/**
	 * Tries to load a grammar and
	 * highlight again the given element once loaded.
	 * @param {string} lang
	 * @param {HTMLElement} elt
	 */
	var registerElement = function (lang, elt) {
		var data = lang_data[lang];
		if (!data) {
			data = lang_data[lang] = {};
		}

		// Look for additional dependencies defined on the <code> or <pre> tags
		var deps = elt.getAttribute('data-dependencies');
		if (!deps && elt.parentNode && elt.parentNode.tagName.toLowerCase() === 'pre') {
			deps = elt.parentNode.getAttribute('data-dependencies');
		}

		if (deps) {
			deps = deps.split(/\s*,\s*/g);
		} else {
			deps = [];
		}

		loadLanguages(deps, function () {
			loadLanguage(lang, function () {
				Prism.highlightElement(elt);
			});
		});
	};

	/**
	 * Sequentially loads an array of grammars.
	 * @param {string[]|string} langs
	 * @param {function=} success
	 * @param {function=} error
	 */
	var loadLanguages = function (langs, success, error) {
		if (typeof langs === 'string') {
			langs = [langs];
		}
		var i = 0;
		var l = langs.length;
		var f = function () {
			if (i < l) {
				loadLanguage(langs[i], function () {
					i++;
					f();
				}, function () {
					error && error(langs[i]);
				});
			} else if (i === l) {
				success && success(langs);
			}
		};
		f();
	};

	/**
	 * Load a grammar with its dependencies
	 * @param {string} lang
	 * @param {function=} success
	 * @param {function=} error
	 */
	var loadLanguage = function (lang, success, error) {
		var load = function () {
			var force = false;
			// Do we want to force reload the grammar?
			if (lang.indexOf('!') >= 0) {
				force = true;
				lang = lang.replace('!', '');
			}

			var data = lang_data[lang];
			if (!data) {
				data = lang_data[lang] = {};
			}
			if (success) {
				if (!data.success_callbacks) {
					data.success_callbacks = [];
				}
				data.success_callbacks.push(success);
			}
			if (error) {
				if (!data.error_callbacks) {
					data.error_callbacks = [];
				}
				data.error_callbacks.push(error);
			}

			if (!force && Prism.languages[lang]) {
				languageSuccess(lang);
			} else if (!force && data.error) {
				languageError(lang);
			} else if (force || !data.loading) {
				data.loading = true;
				var src = getLanguagePath(lang);
				script(src, function () {
					data.loading = false;
					languageSuccess(lang);

				}, function () {
					data.loading = false;
					data.error = true;
					languageError(lang);
				});
			}
		};
		var dependencies = lang_dependencies[lang];
		if(dependencies && dependencies.length) {
			loadLanguages(dependencies, load);
		} else {
			load();
		}
	};

	/**
	 * Runs all success callbacks for this language.
	 * @param {string} lang
	 */
	var languageSuccess = function (lang) {
		if (lang_data[lang] && lang_data[lang].success_callbacks && lang_data[lang].success_callbacks.length) {
			lang_data[lang].success_callbacks.forEach(function (f) {
				f(lang);
			});
		}
	};

	/**
	 * Runs all error callbacks for this language.
	 * @param {string} lang
	 */
	var languageError = function (lang) {
		if (lang_data[lang] && lang_data[lang].error_callbacks && lang_data[lang].error_callbacks.length) {
			lang_data[lang].error_callbacks.forEach(function (f) {
				f(lang);
			});
		}
	};

	Prism.hooks.add('complete', function (env) {
		if (env.element && env.language && !env.grammar) {
			if (env.language !== ignored_language) {
				registerElement(env.language, env.element);
			}
		}
	});

}());

/***/ }),
/* 27 */
/*!**********************************************************!*\
  !*** ../node_modules/jquery-lazyload/jquery.lazyload.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 28 */
/*!*************************************************************************!*\
  !*** ../node_modules/theia-sticky-sidebar/dist/theia-sticky-sidebar.js ***!
  \*************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */

(function ($) {
    $.fn.theiaStickySidebar = function (options) {
        var defaults = {
            'containerSelector': '',
            'additionalMarginTop': 0,
            'additionalMarginBottom': 0,
            'updateSidebarHeight': true,
            'minWidth': 0,
            'disableOnResponsiveLayouts': true,
            'sidebarBehavior': 'modern',
            'defaultPosition': 'relative',
            'namespace': 'TSS'
        };
        options = $.extend(defaults, options);

        // Validate options
        options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
        options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;

        tryInitOrHookIntoEvents(options, this);

        // Try doing init, otherwise hook into window.resize and document.scroll and try again then.
        function tryInitOrHookIntoEvents(options, $that) {
            var success = tryInit(options, $that);

            if (!success) {
                console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');

                $(document).on('scroll.' + options.namespace, function (options, $that) {
                    return function (evt) {
                        var success = tryInit(options, $that);

                        if (success) {
                            $(this).unbind(evt);
                        }
                    };
                }(options, $that));
                $(window).on('resize.' + options.namespace, function (options, $that) {
                    return function (evt) {
                        var success = tryInit(options, $that);

                        if (success) {
                            $(this).unbind(evt);
                        }
                    };
                }(options, $that))
            }
        }

        // Try doing init if proper conditions are met.
        function tryInit(options, $that) {
            if (options.initialized === true) {
                return true;
            }

            if ($('body').width() < options.minWidth) {
                return false;
            }

            init(options, $that);

            return true;
        }

        // Init the sticky sidebar(s).
        function init(options, $that) {
            options.initialized = true;

            // Add CSS
            var existingStylesheet = $('#theia-sticky-sidebar-stylesheet-' + options.namespace);
            if (existingStylesheet.length === 0) {
                $('head').append($('<style id="theia-sticky-sidebar-stylesheet-' + options.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));
            }

            $that.each(function () {
                var o = {};

                o.sidebar = $(this);

                // Save options
                o.options = options || {};

                // Get container
                o.container = $(o.options.containerSelector);
                if (o.container.length == 0) {
                    o.container = o.sidebar.parent();
                }

                // Create sticky sidebar
                o.sidebar.parents().css('-webkit-transform', 'none'); // Fix for WebKit bug - https://code.google.com/p/chromium/issues/detail?id=20574
                o.sidebar.css({
                    'position': o.options.defaultPosition,
                    'overflow': 'visible',
                    // The "box-sizing" must be set to "content-box" because we set a fixed height to this element when the sticky sidebar has a fixed position.
                    '-webkit-box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    'box-sizing': 'border-box'
                });

                // Get the sticky sidebar element. If none has been found, then create one.
                o.stickySidebar = o.sidebar.find('.theiaStickySidebar');
                if (o.stickySidebar.length == 0) {
                    // Remove <script> tags, otherwise they will be run again when added to the stickySidebar.
                    var javaScriptMIMETypes = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                    o.sidebar.find('script').filter(function (index, script) {
                        return script.type.length === 0 || script.type.match(javaScriptMIMETypes);
                    }).remove();

                    o.stickySidebar = $('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());
                    o.sidebar.append(o.stickySidebar);
                }

                // Get existing top and bottom margins and paddings
                o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
                o.paddingTop = parseInt(o.sidebar.css('padding-top'));
                o.paddingBottom = parseInt(o.sidebar.css('padding-bottom'));

                // Add a temporary padding rule to check for collapsable margins.
                var collapsedTopHeight = o.stickySidebar.offset().top;
                var collapsedBottomHeight = o.stickySidebar.outerHeight();
                o.stickySidebar.css('padding-top', 1);
                o.stickySidebar.css('padding-bottom', 1);
                collapsedTopHeight -= o.stickySidebar.offset().top;
                collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;
                if (collapsedTopHeight == 0) {
                    o.stickySidebar.css('padding-top', 0);
                    o.stickySidebarPaddingTop = 0;
                }
                else {
                    o.stickySidebarPaddingTop = 1;
                }

                if (collapsedBottomHeight == 0) {
                    o.stickySidebar.css('padding-bottom', 0);
                    o.stickySidebarPaddingBottom = 0;
                }
                else {
                    o.stickySidebarPaddingBottom = 1;
                }

                // We use this to know whether the user is scrolling up or down.
                o.previousScrollTop = null;

                // Scroll top (value) when the sidebar has fixed position.
                o.fixedScrollTop = 0;

                // Set sidebar to default values.
                resetSidebar();

                o.onScroll = function (o) {
                    // Stop if the sidebar isn't visible.
                    if (!o.stickySidebar.is(":visible")) {
                        return;
                    }

                    // Stop if the window is too small.
                    if ($('body').width() < o.options.minWidth) {
                        resetSidebar();
                        return;
                    }

                    // Stop if the sidebar width is larger than the container width (e.g. the theme is responsive and the sidebar is now below the content)
                    if (o.options.disableOnResponsiveLayouts) {
                        var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');

                        if (sidebarWidth + 50 > o.container.width()) {
                            resetSidebar();
                            return;
                        }
                    }

                    var scrollTop = $(document).scrollTop();
                    var position = 'static';

                    // If the user has scrolled down enough for the sidebar to be clipped at the top, then we can consider changing its position.
                    if (scrollTop >= o.sidebar.offset().top + (o.paddingTop - o.options.additionalMarginTop)) {
                        // The top and bottom offsets, used in various calculations.
                        var offsetTop = o.paddingTop + options.additionalMarginTop;
                        var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom;

                        // All top and bottom positions are relative to the window, not to the parent elemnts.
                        var containerTop = o.sidebar.offset().top;
                        var containerBottom = o.sidebar.offset().top + getClearedHeight(o.container);

                        // The top and bottom offsets relative to the window screen top (zero) and bottom (window height).
                        var windowOffsetTop = 0 + options.additionalMarginTop;
                        var windowOffsetBottom;

                        var sidebarSmallerThanWindow = (o.stickySidebar.outerHeight() + offsetTop + offsetBottom) < $(window).height();
                        if (sidebarSmallerThanWindow) {
                            windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight();
                        }
                        else {
                            windowOffsetBottom = $(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom;
                        }

                        var staticLimitTop = containerTop - scrollTop + o.paddingTop;
                        var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;

                        var top = o.stickySidebar.offset().top - scrollTop;
                        var scrollTopDiff = o.previousScrollTop - scrollTop;

                        // If the sidebar position is fixed, then it won't move up or down by itself. So, we manually adjust the top coordinate.
                        if (o.stickySidebar.css('position') == 'fixed') {
                            if (o.options.sidebarBehavior == 'modern') {
                                top += scrollTopDiff;
                            }
                        }

                        if (o.options.sidebarBehavior == 'stick-to-top') {
                            top = options.additionalMarginTop;
                        }

                        if (o.options.sidebarBehavior == 'stick-to-bottom') {
                            top = windowOffsetBottom - o.stickySidebar.outerHeight();
                        }

                        if (scrollTopDiff > 0) { // If the user is scrolling up.
                            top = Math.min(top, windowOffsetTop);
                        }
                        else { // If the user is scrolling down.
                            top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight());
                        }

                        top = Math.max(top, staticLimitTop);

                        top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());

                        // If the sidebar is the same height as the container, we won't use fixed positioning.
                        var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();

                        if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
                            position = 'fixed';
                        }
                        else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
                            position = 'fixed';
                        }
                        else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
                            // Stuck to the top of the page. No special behavior.
                            position = 'static';
                        }
                        else {
                            // Stuck to the bottom of the page.
                            position = 'absolute';
                        }
                    }

                    /*
                     * Performance notice: It's OK to set these CSS values at each resize/scroll, even if they don't change.
                     * It's way slower to first check if the values have changed.
                     */
                    if (position == 'fixed') {
                        var scrollLeft = $(document).scrollLeft();

                        o.stickySidebar.css({
                            'position': 'fixed',
                            'width': getWidthForObject(o.stickySidebar) + 'px',
                            'transform': 'translateY(' + top + 'px)',
                            'left': (o.sidebar.offset().left + parseInt(o.sidebar.css('padding-left')) - scrollLeft) + 'px',
                            'top': '0px'
                        });
                    }
                    else if (position == 'absolute') {
                        var css = {};

                        if (o.stickySidebar.css('position') != 'absolute') {
                            css.position = 'absolute';
                            css.transform = 'translateY(' + (scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom) + 'px)';
                            css.top = '0px';
                        }

                        css.width = getWidthForObject(o.stickySidebar) + 'px';
                        css.left = '';

                        o.stickySidebar.css(css);
                    }
                    else if (position == 'static') {
                        resetSidebar();
                    }

                    if (position != 'static') {
                        if (o.options.updateSidebarHeight == true) {
                            o.sidebar.css({
                                'min-height': o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
                            });
                        }
                    }

                    o.previousScrollTop = scrollTop;
                };

                // Initialize the sidebar's position.
                o.onScroll(o);

                // Recalculate the sidebar's position on every scroll and resize.
                $(document).on('scroll.' + o.options.namespace, function (o) {
                    return function () {
                        o.onScroll(o);
                    };
                }(o));
                $(window).on('resize.' + o.options.namespace, function (o) {
                    return function () {
                        o.stickySidebar.css({'position': 'static'});
                        o.onScroll(o);
                    };
                }(o));

                // Recalculate the sidebar's position every time the sidebar changes its size.
                if (typeof ResizeSensor !== 'undefined') {
                    new ResizeSensor(o.stickySidebar[0], function (o) {
                        return function () {
                            o.onScroll(o);
                        };
                    }(o));
                }

                // Reset the sidebar to its default state
                function resetSidebar() {
                    o.fixedScrollTop = 0;
                    o.sidebar.css({
                        'min-height': '1px'
                    });
                    o.stickySidebar.css({
                        'position': 'static',
                        'width': '',
                        'transform': 'none'
                    });
                }

                // Get the height of a div as if its floated children were cleared. Note that this function fails if the floats are more than one level deep.
                function getClearedHeight(e) {
                    var height = e.height();

                    e.children().each(function () {
                        height = Math.max(height, $(this).height());
                    });

                    return height;
                }
            });
        }

        function getWidthForObject(object) {
            var width;

            try {
                width = object[0].getBoundingClientRect().width;
            }
            catch (err) {
            }

            if (typeof width === "undefined") {
                width = object.width();
            }

            return width;
        }

        return this;
    }
})(jQuery);

//# sourceMappingURL=maps/theia-sticky-sidebar.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 29 */
/*!************************************************!*\
  !*** ./scripts/autoload/jquery.ghostHunter.js ***!
  \************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/* eslint-disable */

/**
* ghostHunter - 0.4.0
 * Copyright (C) 2014 Jamal Neufeld (jamal@i11u.me)
 * MIT Licensed
 * @license
*/
(function ($) {

  var lunr = __webpack_require__(/*! lunr */ 30);

  //This is the main plugin definition
  $.fn.ghostHunter = function (options) {

    //Here we use jQuery's extend to set default values if they weren't set by the user
    var opts = $.extend({}, $.fn.ghostHunter.defaults, options);
    if (opts.results) {
      pluginMethods.init(this, opts);
      return pluginMethods;
    }
  };

  $.fn.ghostHunter.defaults = {
    resultsData: false,
    onPageLoad: true,
    onKeyUp: false,
    result_template: "<a href='{{link}}'><p><h2>{{title}}</h2><h4>{{prettyPubDate}}</h4></p></a>",
    info_template: "<p>Number of posts found: {{amount}}</p>",
    displaySearchInfo: true,
    zeroResultsInfo: true,
    before: false,
    onComplete: false,
    includepages: false,
    filterfields: false
  };
  var prettyDate = function (date) {
    var d = new Date(date);
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();
  };

  var pluginMethods = {

    isInit: false,

    init: function (target, opts) {
      var that = this;
      this.target = target;
      this.results = opts.results;
      this.blogData = {};
      this.result_template = opts.result_template;
      this.info_template = opts.info_template;
      this.zeroResultsInfo = opts.zeroResultsInfo;
      this.displaySearchInfo = opts.displaySearchInfo;
      this.before = opts.before;
      this.onComplete = opts.onComplete;
      this.includepages = opts.includepages;
      this.filterfields = opts.filterfields;

      //This is where we'll build the index for later searching. It's not a big deal to build it on every load as it takes almost no space without data
      this.index = lunr(function () {
        this.field('title', { boost: 10 })
        this.field('description')
        this.field('link')
        this.field('plaintext', { boost: 5 })
        this.field('pubDate')
        this.field('tag')
        this.ref('id')
      });

      if (opts.onPageLoad) {
        function miam() {
          that.loadAPI();
        }
        window.setTimeout(miam, 1);
      } else {
        target.focus(function () {
          that.loadAPI();
        });
      }

      target.closest("form").submit(function (e) {
        e.preventDefault();
        that.find(target.val());
      });

      if (opts.onKeyUp) {
        target.keyup(function () {
          that.find(target.val());
        });

      }

    },

    loadAPI: function () {

      if (this.isInit) { return false; }

      /*	Here we load all of the blog posts to the index.
        This function will not call on load to avoid unnecessary heavy
        operations on a page if a visitor never ends up searching anything. */

      var index = this.index,
        blogData = this.blogData;
      obj = { limit: "all", include: "tags", formats: ["plaintext"] };
      if (this.includepages) {
        obj.filter = "(page:true,page:false)";
      }


      $.get(ghost.url.api('posts', obj)).done(function (data) {
        searchData = data.posts;
        searchData.forEach(function (arrayItem) {
          var tag_arr = arrayItem.tags.map(function (v) {
            return v.name; // `tag` object has an `name` property which is the value of tag. If you also want other info, check API and get that property
          })
          if (arrayItem.meta_description == null) { arrayItem.meta_description = '' };
          var category = tag_arr.join(", ");
          if (category.length < 1) {
            category = "undefined";
          }
          var parsedData = {
            id: String(arrayItem.id),
            title: String(arrayItem.title),
            description: String(arrayItem.meta_description),
            plaintext: String(arrayItem.plaintext),
            pubDate: String(arrayItem.created_at),
            tag: category,
            link: String(arrayItem.url)
          }

          parsedData.prettyPubDate = prettyDate(parsedData.pubDate);
          var tempdate = prettyDate(parsedData.pubDate);

          index.add(parsedData)
          blogData[arrayItem.id] = { title: arrayItem.title, description: arrayItem.meta_description, pubDate: tempdate, link: arrayItem.url };
        });
      });
      this.isInit = true;
    },

    find: function (value) {
      var this$1 = this;

      var searchResult = this.index.search(value);
      var results = $(this.results);
      var resultsData = [];
      results.empty();

      if (this.before) {
        this.before();
      };

      if (this.zeroResultsInfo || searchResult.length > 0) {
        if (this.displaySearchInfo) { results.append(this.format(this.info_template, { "amount": searchResult.length })); }
      }

      for (var i = 0; i < searchResult.length; i++) {
        var lunrref = searchResult[i].ref;
        var postData = this$1.blogData[lunrref];
        results.append(this$1.format(this$1.result_template, postData));
        resultsData.push(postData);
      }

      if (this.onComplete) {
        this.onComplete(resultsData);
      };
    },

    clear: function () {
      $(this.results).empty();
      this.target.val("");
    },

    format: function (t, d) {
      return t.replace(/{{([^{}]*)}}/g, function (a, b) {
        var r = d[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    }
  }

})(jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 30 */
/*!************************************!*\
  !*** ../node_modules/lunr/lunr.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 1.0.0
 * Copyright (C) 2017 Oliver Nightingale
 * @license MIT
 */

;(function(){

/**
 * Convenience function for instantiating a new lunr index and configuring it
 * with the default pipeline functions and the passed config function.
 *
 * When using this convenience function a new index will be created with the
 * following functions already in the pipeline:
 *
 * lunr.StopWordFilter - filters out any stop words before they enter the
 * index
 *
 * lunr.stemmer - stems the tokens before entering the index.
 *
 * Example:
 *
 *     var idx = lunr(function () {
 *       this.field('title', 10)
 *       this.field('tags', 100)
 *       this.field('body')
 *       
 *       this.ref('cid')
 *       
 *       this.pipeline.add(function () {
 *         // some custom pipeline function
 *       })
 *       
 *     })
 *
 * @param {Function} config A function that will be called with the new instance
 * of the lunr.Index as both its context and first parameter. It can be used to
 * customize the instance of new lunr.Index.
 * @namespace
 * @module
 * @returns {lunr.Index}
 *
 */
var lunr = function (config) {
  var idx = new lunr.Index

  idx.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  if (config) config.call(idx, idx)

  return idx
}

lunr.version = "1.0.0"
/*!
 * lunr.utils
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
})(this)

/**
 * Convert an object to a string.
 *
 * In the case of `null` and `undefined` the function returns
 * the empty string, in all other cases the result of calling
 * `toString` on the passed object is returned.
 *
 * @param {Any} obj The object to convert to a string.
 * @return {String} string representation of the passed object.
 * @memberOf Utils
 */
lunr.utils.asString = function (obj) {
  if (obj === void 0 || obj === null) {
    return ""
  } else {
    return obj.toString()
  }
}
/*!
 * lunr.EventEmitter
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
 *
 * @constructor
 */
lunr.EventEmitter = function () {
  this.events = {}
}

/**
 * Binds a handler function to a specific event(s).
 *
 * Can bind a single function to many different events in one call.
 *
 * @param {String} [eventName] The name(s) of events to bind this function to.
 * @param {Function} fn The function to call when an event is fired.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.addListener = function () {
  var args = Array.prototype.slice.call(arguments),
      fn = args.pop(),
      names = args

  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")

  names.forEach(function (name) {
    if (!this.hasHandler(name)) this.events[name] = []
    this.events[name].push(fn)
  }, this)
}

/**
 * Removes a handler function from a specific event.
 *
 * @param {String} eventName The name of the event to remove this function from.
 * @param {Function} fn The function to remove from an event.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.removeListener = function (name, fn) {
  if (!this.hasHandler(name)) return

  var fnIndex = this.events[name].indexOf(fn)
  this.events[name].splice(fnIndex, 1)

  if (!this.events[name].length) delete this.events[name]
}

/**
 * Calls all functions bound to the given event.
 *
 * Additional data can be passed to the event handler as arguments to `emit`
 * after the event name.
 *
 * @param {String} eventName The name of the event to emit.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.emit = function (name) {
  if (!this.hasHandler(name)) return

  var args = Array.prototype.slice.call(arguments, 1)

  this.events[name].forEach(function (fn) {
    fn.apply(undefined, args)
  })
}

/**
 * Checks whether a handler has ever been stored against an event.
 *
 * @param {String} eventName The name of the event to check.
 * @private
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.hasHandler = function (name) {
  return name in this.events
}

/*!
 * lunr.tokenizer
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * @module
 * @param {String} obj The string to convert into tokens
 * @see lunr.tokenizer.separator
 * @returns {Array}
 */
lunr.tokenizer = function (obj) {
  if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return lunr.utils.asString(t).toLowerCase() })

  return obj.toString().trim().toLowerCase().split(lunr.tokenizer.separator)
}

/**
 * The sperator used to split a string into tokens. Override this property to change the behaviour of
 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @static
 * @see lunr.tokenizer
 */
lunr.tokenizer.separator = /[\s\-]+/

/**
 * Loads a previously serialised tokenizer.
 *
 * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
 * If the serialised tokenizer has not been registered then an error will be thrown.
 *
 * @param {String} label The label of the serialised tokenizer.
 * @returns {Function}
 * @memberOf tokenizer
 */
lunr.tokenizer.load = function (label) {
  var fn = this.registeredFunctions[label]

  if (!fn) {
    throw new Error('Cannot load un-registered function: ' + label)
  }

  return fn
}

lunr.tokenizer.label = 'default'

lunr.tokenizer.registeredFunctions = {
  'default': lunr.tokenizer
}

/**
 * Register a tokenizer function.
 *
 * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
 *
 * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
 *
 * @param {Function} fn The function to register.
 * @param {String} label The label to register this function with
 * @memberOf tokenizer
 */
lunr.tokenizer.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing tokenizer: ' + label)
  }

  fn.label = label
  this.registeredFunctions[label] = fn
}
/*!
 * lunr.Pipeline
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = {}

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {Function} fn The function to check for.
 * @param {String} label The label to register this function with
 * @memberOf Pipeline
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {Function} fn The function to check for.
 * @private
 * @memberOf Pipeline
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 * @memberOf Pipeline
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error('Cannot load un-registered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} functions Any number of functions to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  pos = pos + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {Function} fn The function to remove from the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  if (pos == -1) {
    return
  }

  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var out = [],
      tokenLength = tokens.length,
      stackLength = this._stack.length

  for (var i = 0; i < tokenLength; i++) {
    var token = tokens[i]

    for (var j = 0; j < stackLength; j++) {
      token = this._stack[j](token, i, tokens)
      if (token === void 0 || token === '') break
    };

    if (token !== void 0 && token !== '') out.push(token)
  };

  return out
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.Vectors implement vector related operations for
 * a series of elements.
 *
 * @constructor
 */
lunr.Vector = function () {
  this._magnitude = null
  this.list = undefined
  this.length = 0
}

/**
 * lunr.Vector.Node is a simple struct for each node
 * in a lunr.Vector.
 *
 * @private
 * @param {Number} The index of the node in the vector.
 * @param {Object} The data at this node in the vector.
 * @param {lunr.Vector.Node} The node directly after this node in the vector.
 * @constructor
 * @memberOf Vector
 */
lunr.Vector.Node = function (idx, val, next) {
  this.idx = idx
  this.val = val
  this.next = next
}

/**
 * Inserts a new value at a position in a vector.
 *
 * @param {Number} The index at which to insert a value.
 * @param {Object} The object to insert in the vector.
 * @memberOf Vector.
 */
lunr.Vector.prototype.insert = function (idx, val) {
  this._magnitude = undefined;
  var list = this.list

  if (!list) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  if (idx < list.idx) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  var prev = list,
      next = list.next

  while (next != undefined) {
    if (idx < next.idx) {
      prev.next = new lunr.Vector.Node (idx, val, next)
      return this.length++
    }

    prev = next, next = next.next
  }

  prev.next = new lunr.Vector.Node (idx, val, next)
  return this.length++
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magnitude) return this._magnitude
  var node = this.list,
      sumOfSquares = 0,
      val

  while (node) {
    val = node.val
    sumOfSquares += val * val
    node = node.next
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var node = this.list,
      otherNode = otherVector.list,
      dotProduct = 0

  while (node && otherNode) {
    if (node.idx < otherNode.idx) {
      node = node.next
    } else if (node.idx > otherNode.idx) {
      otherNode = otherNode.next
    } else {
      dotProduct += node.val * otherNode.val
      node = node.next
      otherNode = otherNode.next
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector The other vector to calculate the
 * similarity with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}
/*!
 * lunr.SortedSet
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
 * order.
 *
 * @constructor
 */
lunr.SortedSet = function () {
  this.length = 0
  this.elements = []
}

/**
 * Loads a previously serialised sorted set.
 *
 * @param {Array} serialisedData The serialised set to load.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.load = function (serialisedData) {
  var set = new this

  set.elements = serialisedData
  set.length = serialisedData.length

  return set
}

/**
 * Inserts new items into the set in the correct position to maintain the
 * order.
 *
 * @param {Object} The objects to add to this set.
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.add = function () {
  var i, element

  for (i = 0; i < arguments.length; i++) {
    element = arguments[i]
    if (~this.indexOf(element)) continue
    this.elements.splice(this.locationFor(element), 0, element)
  }

  this.length = this.elements.length
}

/**
 * Converts this sorted set into an array.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toArray = function () {
  return this.elements.slice()
}

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this sorted set.
 *
 * Delegates to Array.prototype.map and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * for the function fn.
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.map = function (fn, ctx) {
  return this.elements.map(fn, ctx)
}

/**
 * Executes a provided function once per sorted set element.
 *
 * Delegates to Array.prototype.forEach and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * @memberOf SortedSet
 * for the function fn.
 */
lunr.SortedSet.prototype.forEach = function (fn, ctx) {
  return this.elements.forEach(fn, ctx)
}

/**
 * Returns the index at which a given element can be found in the
 * sorted set, or -1 if it is not present.
 *
 * @param {Object} elem The object to locate in the sorted set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.indexOf = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem === elem) return pivot

    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem === elem) return pivot

  return -1
}

/**
 * Returns the position within the sorted set that an element should be
 * inserted at to maintain the current order of the set.
 *
 * This function assumes that the element to search for does not already exist
 * in the sorted set.
 *
 * @param {Object} elem The elem to find the position for in the set
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.locationFor = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem > elem) return pivot
  if (pivotElem < elem) return pivot + 1
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the intersection
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.intersect = function (otherSet) {
  var intersectSet = new lunr.SortedSet,
      i = 0, j = 0,
      a_len = this.length, b_len = otherSet.length,
      a = this.elements, b = otherSet.elements

  while (true) {
    if (i > a_len - 1 || j > b_len - 1) break

    if (a[i] === b[j]) {
      intersectSet.add(a[i])
      i++, j++
      continue
    }

    if (a[i] < b[j]) {
      i++
      continue
    }

    if (a[i] > b[j]) {
      j++
      continue
    }
  };

  return intersectSet
}

/**
 * Makes a copy of this set
 *
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.clone = function () {
  var clone = new lunr.SortedSet

  clone.elements = this.toArray()
  clone.length = clone.elements.length

  return clone
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the union
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to union with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.union = function (otherSet) {
  var longSet, shortSet, unionSet

  if (this.length >= otherSet.length) {
    longSet = this, shortSet = otherSet
  } else {
    longSet = otherSet, shortSet = this
  }

  unionSet = longSet.clone()

  for(var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++){
    unionSet.add(shortSetElements[i])
  }

  return unionSet
}

/**
 * Returns a representation of the sorted set ready for serialisation.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toJSON = function () {
  return this.toArray()
}
/*!
 * lunr.Index
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.Index is object that manages a search index.  It contains the indexes
 * and stores all the tokens and document lookups.  It also provides the main
 * user facing API for the library.
 *
 * @constructor
 */
lunr.Index = function () {
  this._fields = []
  this._ref = 'id'
  this.pipeline = new lunr.Pipeline
  this.documentStore = new lunr.Store
  this.tokenStore = new lunr.TokenStore
  this.corpusTokens = new lunr.SortedSet
  this.eventEmitter =  new lunr.EventEmitter
  this.tokenizerFn = lunr.tokenizer

  this._idfCache = {}

  this.on('add', 'remove', 'update', (function () {
    this._idfCache = {}
  }).bind(this))
}

/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}

/**
 * Loads a previously serialised index.
 *
 * Issues a warning if the index being imported was serialised
 * by a different version of lunr.
 *
 * @param {Object} serialisedData The serialised set to load.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.load = function (serialisedData) {
  if (serialisedData.version !== lunr.version) {
    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
  }

  var idx = new this

  idx._fields = serialisedData.fields
  idx._ref = serialisedData.ref

  idx.tokenizer(lunr.tokenizer.load(serialisedData.tokenizer))
  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

  return idx
}

/**
 * Adds a field to the list of fields that will be searchable within documents
 * in the index.
 *
 * An optional boost param can be passed to affect how much tokens in this field
 * rank in search results, by default the boost value is 1.
 *
 * Fields should be added before any documents are added to the index, fields
 * that are added after documents are added to the index will only apply to new
 * documents added to the index.
 *
 * @param {String} fieldName The name of the field within the document that
 * should be indexed
 * @param {Number} boost An optional boost that can be applied to terms in this
 * field.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.field = function (fieldName, opts) {
  var opts = opts || {},
      field = { name: fieldName, boost: opts.boost || 1 }

  this._fields.push(field)
  return this
}

/**
 * Sets the property used to uniquely identify documents added to the index,
 * by default this property is 'id'.
 *
 * This should only be changed before adding documents to the index, changing
 * the ref property without resetting the index can lead to unexpected results.
 *
 * The value of ref can be of any type but it _must_ be stably comparable and
 * orderable.
 *
 * @param {String} refName The property to use to uniquely identify the
 * documents in the index.
 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.ref = function (refName) {
  this._ref = refName
  return this
}

/**
 * Sets the tokenizer used for this index.
 *
 * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
 * should only be changed before adding documents to the index. Changing the tokenizer
 * without re-building the index can lead to unexpected results.
 *
 * @param {Function} fn The function to use as a tokenizer.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.tokenizer = function (fn) {
  var isRegistered = fn.label && (fn.label in lunr.tokenizer.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index')
  }

  this.tokenizerFn = fn
  return this
}

/**
 * Add a document to the index.
 *
 * This is the way new documents enter the index, this function will run the
 * fields from the document through the index's pipeline and then add it to
 * the index, it will then show up in search results.
 *
 * An 'add' event is emitted with the document that has been added and the index
 * the document has been added to. This event can be silenced by passing false
 * as the second argument to add.
 *
 * @param {Object} doc The document to add to the index.
 * @param {Boolean} emitEvent Whether or not to emit events, default true.
 * @memberOf Index
 */
lunr.Index.prototype.add = function (doc, emitEvent) {
  var docTokens = {},
      allDocumentTokens = new lunr.SortedSet,
      docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  this._fields.forEach(function (field) {
    var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]))

    docTokens[field.name] = fieldTokens

    for (var i = 0; i < fieldTokens.length; i++) {
      var token = fieldTokens[i]
      allDocumentTokens.add(token)
      this.corpusTokens.add(token)
    }
  }, this)

  this.documentStore.set(docRef, allDocumentTokens)

  for (var i = 0; i < allDocumentTokens.length; i++) {
    var token = allDocumentTokens.elements[i]
    var tf = 0;

    for (var j = 0; j < this._fields.length; j++){
      var field = this._fields[j]
      var fieldTokens = docTokens[field.name]
      var fieldLength = fieldTokens.length

      if (!fieldLength) continue

      var tokenCount = 0
      for (var k = 0; k < fieldLength; k++){
        if (fieldTokens[k] === token){
          tokenCount++
        }
      }

      tf += (tokenCount / fieldLength * field.boost)
    }

    this.tokenStore.add(token, { ref: docRef, tf: tf })
  };

  if (emitEvent) this.eventEmitter.emit('add', doc, this)
}

/**
 * Removes a document from the index.
 *
 * To make sure documents no longer show up in search results they can be
 * removed from the index using this method.
 *
 * The document passed only needs to have the same ref property value as the
 * document that was added to the index, they could be completely different
 * objects.
 *
 * A 'remove' event is emitted with the document that has been removed and the index
 * the document has been removed from. This event can be silenced by passing false
 * as the second argument to remove.
 *
 * @param {Object} doc The document to remove from the index.
 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
 * @memberOf Index
 */
lunr.Index.prototype.remove = function (doc, emitEvent) {
  var docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  if (!this.documentStore.has(docRef)) return

  var docTokens = this.documentStore.get(docRef)

  this.documentStore.remove(docRef)

  docTokens.forEach(function (token) {
    this.tokenStore.remove(token, docRef)
  }, this)

  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
}

/**
 * Updates a document in the index.
 *
 * When a document contained within the index gets updated, fields changed,
 * added or removed, to make sure it correctly matched against search queries,
 * it should be updated in the index.
 *
 * This method is just a wrapper around `remove` and `add`
 *
 * An 'update' event is emitted with the document that has been updated and the index.
 * This event can be silenced by passing false as the second argument to update. Only
 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
 * are silenced.
 *
 * @param {Object} doc The document to update in the index.
 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
 * @see Index.prototype.remove
 * @see Index.prototype.add
 * @memberOf Index
 */
lunr.Index.prototype.update = function (doc, emitEvent) {
  var emitEvent = emitEvent === undefined ? true : emitEvent

  this.remove(doc, false)
  this.add(doc, false)

  if (emitEvent) this.eventEmitter.emit('update', doc, this)
}

/**
 * Calculates the inverse document frequency for a token within the index.
 *
 * @param {String} token The token to calculate the idf of.
 * @see Index.prototype.idf
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.idf = function (term) {
  var cacheKey = "@" + term
  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

  var documentFrequency = this.tokenStore.count(term),
      idf = 1

  if (documentFrequency > 0) {
    idf = 1 + Math.log(this.documentStore.length / documentFrequency)
  }

  return this._idfCache[cacheKey] = idf
}

/**
 * Searches the index using the passed query.
 *
 * Queries should be a string, multiple words are allowed and will lead to an
 * AND based query, e.g. `idx.search('foo bar')` will run a search for
 * documents containing both 'foo' and 'bar'.
 *
 * All query tokens are passed through the same pipeline that document tokens
 * are passed through, so any language processing involved will be run on every
 * query term.
 *
 * Each query term is expanded, so that the term 'he' might be expanded to
 * 'hello' and 'help' if those terms were already included in the index.
 *
 * Matching documents are returned as an array of objects, each object contains
 * the matching document ref, as set for this index, and the similarity score
 * for this document against the query.
 *
 * @param {String} query The query to search the index with.
 * @returns {Object}
 * @see Index.prototype.idf
 * @see Index.prototype.documentVector
 * @memberOf Index
 */
lunr.Index.prototype.search = function (query) {
  var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
      queryVector = new lunr.Vector,
      documentSets = [],
      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

  var hasSomeToken = queryTokens.some(function (token) {
    return this.tokenStore.has(token)
  }, this)

  if (!hasSomeToken) return []

  queryTokens
    .forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length)
          similarityBoost = 1 / Math.log(diff)
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

        // add all the documents that have this key into a set
        // ensuring that the type of key is preserved
        var matchingDocuments = self.tokenStore.get(key),
            refs = Object.keys(matchingDocuments),
            refsLen = refs.length

        for (var i = 0; i < refsLen; i++) {
          set.add(matchingDocuments[refs[i]].ref)
        }

        return memo.union(set)
      }, new lunr.SortedSet)

      documentSets.push(set)
    }, this)

  var documentSet = documentSets.reduce(function (memo, set) {
    return memo.intersect(set)
  })

  return documentSet
    .map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
    }, this)
    .sort(function (a, b) {
      return b.score - a.score
    })
}

/**
 * Generates a vector containing all the tokens in the document matching the
 * passed documentRef.
 *
 * The vector contains the tf-idf score for each token contained in the
 * document with the passed documentRef.  The vector will contain an element
 * for every token in the indexes corpus, if the document does not contain that
 * token the element will be 0.
 *
 * @param {Object} documentRef The ref to find the document with.
 * @returns {lunr.Vector}
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.documentVector = function (documentRef) {
  var documentTokens = this.documentStore.get(documentRef),
      documentTokensLength = documentTokens.length,
      documentVector = new lunr.Vector

  for (var i = 0; i < documentTokensLength; i++) {
    var token = documentTokens.elements[i],
        tf = this.tokenStore.get(token)[documentRef].tf,
        idf = this.idf(token)

    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
  };

  return documentVector
}

/**
 * Returns a representation of the index ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Index
 */
lunr.Index.prototype.toJSON = function () {
  return {
    version: lunr.version,
    fields: this._fields,
    ref: this._ref,
    tokenizer: this.tokenizerFn.label,
    documentStore: this.documentStore.toJSON(),
    tokenStore: this.tokenStore.toJSON(),
    corpusTokens: this.corpusTokens.toJSON(),
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Applies a plugin to the current index.
 *
 * A plugin is a function that is called with the index as its context.
 * Plugins can be used to customise or extend the behaviour the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied to the index.
 *
 * The plugin function will be called with the index as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index as its context.
 *
 * Example:
 *
 *     var myPlugin = function (idx, arg1, arg2) {
 *       // `this` is the index to be extended
 *       // apply any extensions etc here.
 *     }
 *
 *     var idx = lunr(function () {
 *       this.use(myPlugin, 'arg1', 'arg2')
 *     })
 *
 * @param {Function} plugin The plugin to apply.
 * @memberOf Index
 */
lunr.Index.prototype.use = function (plugin) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  plugin.apply(this, args)
}
/*!
 * lunr.Store
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.Store is a simple key-value store used for storing sets of tokens for
 * documents stored in index.
 *
 * @constructor
 * @module
 */
lunr.Store = function () {
  this.store = {}
  this.length = 0
}

/**
 * Loads a previously serialised store
 *
 * @param {Object} serialisedData The serialised store to load.
 * @returns {lunr.Store}
 * @memberOf Store
 */
lunr.Store.load = function (serialisedData) {
  var store = new this

  store.length = serialisedData.length
  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
    return memo
  }, {})

  return store
}

/**
 * Stores the given tokens in the store against the given id.
 *
 * @param {Object} id The key used to store the tokens against.
 * @param {Object} tokens The tokens to store against the key.
 * @memberOf Store
 */
lunr.Store.prototype.set = function (id, tokens) {
  if (!this.has(id)) this.length++
  this.store[id] = tokens
}

/**
 * Retrieves the tokens from the store for a given key.
 *
 * @param {Object} id The key to lookup and retrieve from the store.
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.get = function (id) {
  return this.store[id]
}

/**
 * Checks whether the store contains a key.
 *
 * @param {Object} id The id to look up in the store.
 * @returns {Boolean}
 * @memberOf Store
 */
lunr.Store.prototype.has = function (id) {
  return id in this.store
}

/**
 * Removes the value for a key in the store.
 *
 * @param {Object} id The id to remove from the store.
 * @memberOf Store
 */
lunr.Store.prototype.remove = function (id) {
  if (!this.has(id)) return

  delete this.store[id]
  this.length--
}

/**
 * Returns a representation of the store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.toJSON = function () {
  return {
    store: this.store,
    length: this.length
  }
}

/*!
 * lunr.stemmer
 * Copyright (C) 2017 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @module
 * @param {String} str The string to stem
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);

  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;

  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var porterStemmer = function porterStemmer(w) {
    var   stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = re_1a
    re2 = re2_1a;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) {  w = w + "e"; }
        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  };

  return porterStemmer;
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
 * list of stop words.
 *
 * The built in lunr.stopWordFilter is built using this generator and can be used
 * to generate custom stopWordFilters for applications or non English languages.
 *
 * @module
 * @param {Array} token The token to pass through the filter
 * @returns {Function}
 * @see lunr.Pipeline
 * @see lunr.stopWordFilter
 */
lunr.generateStopWordFilter = function (stopWords) {
  var words = stopWords.reduce(function (memo, stopWord) {
    memo[stopWord] = stopWord
    return memo
  }, {})

  return function (token) {
    if (token && words[token] !== token) return token
  }
}

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stopWordFilter = lunr.generateStopWordFilter([
  'a',
  'able',
  'about',
  'across',
  'after',
  'all',
  'almost',
  'also',
  'am',
  'among',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'cannot',
  'could',
  'dear',
  'did',
  'do',
  'does',
  'either',
  'else',
  'ever',
  'every',
  'for',
  'from',
  'get',
  'got',
  'had',
  'has',
  'have',
  'he',
  'her',
  'hers',
  'him',
  'his',
  'how',
  'however',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'least',
  'let',
  'like',
  'likely',
  'may',
  'me',
  'might',
  'most',
  'must',
  'my',
  'neither',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'own',
  'rather',
  'said',
  'say',
  'says',
  'she',
  'should',
  'since',
  'so',
  'some',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'tis',
  'to',
  'too',
  'twas',
  'us',
  'wants',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'yet',
  'you',
  'your'
])

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the begining and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token.replace(/^\W+/, '').replace(/\W+$/, '')
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.stemmer
 * Copyright (C) 2017 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.TokenStore is used for efficient storing and lookup of the reverse
 * index of token to document ref.
 *
 * @constructor
 */
lunr.TokenStore = function () {
  this.root = { docs: {} }
  this.length = 0
}

/**
 * Loads a previously serialised token store
 *
 * @param {Object} serialisedData The serialised token store to load.
 * @returns {lunr.TokenStore}
 * @memberOf TokenStore
 */
lunr.TokenStore.load = function (serialisedData) {
  var store = new this

  store.root = serialisedData.root
  store.length = serialisedData.length

  return store
}

/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.add = function (token, doc, root) {
  var root = root || this.root,
      key = token.charAt(0),
      rest = token.slice(1)

  if (!(key in root)) root[key] = {docs: {}}

  if (rest.length === 0) {
    root[key].docs[doc.ref] = doc
    this.length += 1
    return
  } else {
    return this.add(rest, doc, root[key])
  }
}

/**
 * Checks whether this key is contained within this lunr.TokenStore.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to check for
 * @param {Object} root An optional node at which to start
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.has = function (token) {
  if (!token) return false

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token.charAt(i)]) return false

    node = node[token.charAt(i)]
  }

  return true
}

/**
 * Retrieve a node from the token store for a given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the node for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @see TokenStore.prototype.get
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.getNode = function (token) {
  if (!token) return {}

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token.charAt(i)]) return {}

    node = node[token.charAt(i)]
  }

  return node
}

/**
 * Retrieve the documents for a node for the given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.get = function (token, root) {
  return this.getNode(token, root).docs || {}
}

lunr.TokenStore.prototype.count = function (token, root) {
  return Object.keys(this.get(token, root)).length
}

/**
 * Remove the document identified by ref from the token in the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {String} ref The ref of the document to remove from this token.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.remove = function (token, ref) {
  if (!token) return
  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!(token.charAt(i) in node)) return
    node = node[token.charAt(i)]
  }

  delete node.docs[ref]
}

/**
 * Find all the possible suffixes of the passed token using tokens
 * currently in the store.
 *
 * @param {String} token The token to expand.
 * @returns {Array}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.expand = function (token, memo) {
  var root = this.getNode(token),
      docs = root.docs || {},
      memo = memo || []

  if (Object.keys(docs).length) memo.push(token)

  Object.keys(root)
    .forEach(function (key) {
      if (key === 'docs') return

      memo.concat(this.expand(token + key, memo))
    }, this)

  return memo
}

/**
 * Returns a representation of the token store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.toJSON = function () {
  return {
    root: this.root,
    length: this.length
  }
}

  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})();


/***/ }),
/* 31 */
/*!****************************************!*\
  !*** ./scripts/autoload/transition.js ***!
  \****************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/* eslint-disable */

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) { $($el).trigger($.support.transition.end) } }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) { return }

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) { return e.handleObj.handler.apply(this, arguments) }
      }
    }
  })

}(jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 32 */
/*!**********************************!*\
  !*** ./scripts/autoload/zoom.js ***!
  \**********************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/* eslint-disable */

/**
 * zoom.js - It's the best way to zoom an image
 * @version v0.0.2
 * @link https://github.com/fat/zoom.js
 * @license MIT
 */

+function ($) { "use strict";

  /**
   * The zoom service
   */
  function ZoomService () {
    this._activeZoom            =
    this._initialScrollPosition =
    this._initialTouchPosition  =
    this._touchMoveListener     = null

    this._$document = $(document)
    this._$window   = $(window)
    this._$body     = $(document.body)

    this._boundClick = $.proxy(this._clickHandler, this)
  }

  ZoomService.prototype.listen = function () {
    this._$body.on('click', '[data-action="zoom"]', $.proxy(this._zoom, this))
  }

  ZoomService.prototype._zoom = function (e) {
    var target = e.target

    if (!target || target.tagName != 'IMG') { return }

    if (this._$body.hasClass('zoom-overlay-open')) { return }

    if (e.metaKey || e.ctrlKey) {
      return window.open((e.target.getAttribute('data-original') || e.target.src), '_blank')
    }

    if (target.width >= ($(window).width() - Zoom.OFFSET)) { return }

    this._activeZoomClose(true)

    this._activeZoom = new Zoom(target)
    this._activeZoom.zoomImage()

    // todo(fat): probably worth throttling this
    this._$window.on('scroll.zoom', $.proxy(this._scrollHandler, this))

    this._$document.on('keyup.zoom', $.proxy(this._keyHandler, this))
    this._$document.on('touchstart.zoom', $.proxy(this._touchStart, this))

    // we use a capturing phase here to prevent unintended js events
    // sadly no useCapture in jquery api (http://bugs.jquery.com/ticket/14953)
    if (document.addEventListener) {
      document.addEventListener('click', this._boundClick, true)
    } else {
      document.attachEvent('onclick', this._boundClick, true)
    }

    if ('bubbles' in e) {
      if (e.bubbles) { e.stopPropagation() }
    } else {
      // Internet Explorer before version 9
      e.cancelBubble = true
    }
  }

  ZoomService.prototype._activeZoomClose = function (forceDispose) {
    if (!this._activeZoom) { return }

    if (forceDispose) {
      this._activeZoom.dispose()
    } else {
      this._activeZoom.close()
    }

    this._$window.off('.zoom')
    this._$document.off('.zoom')

    document.removeEventListener('click', this._boundClick, true)

    this._activeZoom = null
  }

  ZoomService.prototype._scrollHandler = function (e) {
    if (this._initialScrollPosition === null) { this._initialScrollPosition = $(window).scrollTop() }
    var deltaY = this._initialScrollPosition - $(window).scrollTop()
    if (Math.abs(deltaY) >= 40) { this._activeZoomClose() }
  }

  ZoomService.prototype._keyHandler = function (e) {
    if (e.keyCode == 27) { this._activeZoomClose() }
  }

  ZoomService.prototype._clickHandler = function (e) {
    if (e.preventDefault) { e.preventDefault() }
    else { event.returnValue = false }

    if ('bubbles' in e) {
      if (e.bubbles) { e.stopPropagation() }
    } else {
      // Internet Explorer before version 9
      e.cancelBubble = true
    }

    this._activeZoomClose()
  }

  ZoomService.prototype._touchStart = function (e) {
    this._initialTouchPosition = e.touches[0].pageY
    $(e.target).on('touchmove.zoom', $.proxy(this._touchMove, this))
  }

  ZoomService.prototype._touchMove = function (e) {
    if (Math.abs(e.touches[0].pageY - this._initialTouchPosition) > 10) {
      this._activeZoomClose()
      $(e.target).off('touchmove.zoom')
    }
  }


  /**
   * The zoom object
   */
  function Zoom (img) {
    this._fullHeight      =
    this._fullWidth       =
    this._overlay         =
    this._targetImageWrap = null

    this._targetImage = img

    this._$body = $(document.body)
  }

  Zoom.OFFSET = 80
  Zoom._MAX_WIDTH = 2560
  Zoom._MAX_HEIGHT = 4096

  Zoom.prototype.zoomImage = function () {
    var img = document.createElement('img')
    img.onload = $.proxy(function () {
      this._fullHeight = Number(img.height)
      this._fullWidth = Number(img.width)
      this._zoomOriginal()
    }, this)
    img.src = this._targetImage.src
  }

  Zoom.prototype._zoomOriginal = function () {
    this._targetImageWrap           = document.createElement('div')
    this._targetImageWrap.className = 'zoom-img-wrap'

    this._targetImage.parentNode.insertBefore(this._targetImageWrap, this._targetImage)
    this._targetImageWrap.appendChild(this._targetImage)

    $(this._targetImage)
      .addClass('zoom-img')
      .attr('data-action', 'zoom-out')

    this._overlay           = document.createElement('div')
    this._overlay.className = 'zoom-overlay'

    document.body.appendChild(this._overlay)

    this._calculateZoom()
    this._triggerAnimation()
  }

  Zoom.prototype._calculateZoom = function () {
    this._targetImage.offsetWidth // repaint before animating

    var originalFullImageWidth  = this._fullWidth
    var originalFullImageHeight = this._fullHeight

    var scrollTop = $(window).scrollTop()

    var maxScaleFactor = originalFullImageWidth / this._targetImage.width

    var viewportHeight = ($(window).height() - Zoom.OFFSET)
    var viewportWidth  = ($(window).width() - Zoom.OFFSET)

    var imageAspectRatio    = originalFullImageWidth / originalFullImageHeight
    var viewportAspectRatio = viewportWidth / viewportHeight

    if (originalFullImageWidth < viewportWidth && originalFullImageHeight < viewportHeight) {
      this._imgScaleFactor = maxScaleFactor

    } else if (imageAspectRatio < viewportAspectRatio) {
      this._imgScaleFactor = (viewportHeight / originalFullImageHeight) * maxScaleFactor

    } else {
      this._imgScaleFactor = (viewportWidth / originalFullImageWidth) * maxScaleFactor
    }
  }

  Zoom.prototype._triggerAnimation = function () {
    this._targetImage.offsetWidth // repaint before animating

    var imageOffset = $(this._targetImage).offset()
    var scrollTop   = $(window).scrollTop()

    var viewportY = scrollTop + ($(window).height() / 2)
    var viewportX = ($(window).width() / 2)

    var imageCenterY = imageOffset.top + (this._targetImage.height / 2)
    var imageCenterX = imageOffset.left + (this._targetImage.width / 2)

    this._translateY = viewportY - imageCenterY
    this._translateX = viewportX - imageCenterX

    var targetTransform = 'scale(' + this._imgScaleFactor + ')'
    var imageWrapTransform = 'translate(' + this._translateX + 'px, ' + this._translateY + 'px)'

    if ($.support.transition) {
      imageWrapTransform += ' translateZ(0)'
    }

    $(this._targetImage)
      .css({
        '-webkit-transform': targetTransform,
            '-ms-transform': targetTransform,
                'transform': targetTransform
      })

    $(this._targetImageWrap)
      .css({
        '-webkit-transform': imageWrapTransform,
            '-ms-transform': imageWrapTransform,
                'transform': imageWrapTransform
      })

    this._$body.addClass('zoom-overlay-open')
  }

  Zoom.prototype.close = function () {
    this._$body
      .removeClass('zoom-overlay-open')
      .addClass('zoom-overlay-transitioning')

    // we use setStyle here so that the correct vender prefix for transform is used
    $(this._targetImage)
      .css({
        '-webkit-transform': '',
            '-ms-transform': '',
                'transform': ''
      })

    $(this._targetImageWrap)
      .css({
        '-webkit-transform': '',
            '-ms-transform': '',
                'transform': ''
      })

    if (!$.support.transition) {
      return this.dispose()
    }

    $(this._targetImage)
      .one($.support.transition.end, $.proxy(this.dispose, this))
      .emulateTransitionEnd(300)
  }

  Zoom.prototype.dispose = function () {
    if (this._targetImageWrap && this._targetImageWrap.parentNode) {
      $(this._targetImage)
        .removeClass('zoom-img')
        .attr('data-action', 'zoom')

      this._targetImageWrap.parentNode.replaceChild(this._targetImage, this._targetImageWrap)
      this._overlay.parentNode.removeChild(this._overlay)

      this._$body.removeClass('zoom-overlay-transitioning')
    }
  }

  // wait for dom ready (incase script included before body)
  $(function () {
    new ZoomService().listen()
  })

}(jQuery)

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 33 */
/*!***********************************!*\
  !*** ./scripts/app/pagination.js ***!
  \***********************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * @package godofredoninja
 * pagination
 */

(function () {
  var $win = $(window);
  var $pathname = $('link[rel=canonical]').attr('href');
  var $btnLoadMore = $('.loadMore');
  var $maxPages = $btnLoadMore.attr('data-page-total');

  var scrollTime = false;
  var currentPage = 2;

  // let lastScroll = 0;

  /* active Scroll */
  var onScroll = function () { return scrollTime = true; };


  /* Scroll page END */
  var  detectPageEnd = function () {
    var scrollTopWindow = $win.scrollTop() + window.innerHeight;
    var scrollTopBody = document.body.clientHeight - (window.innerHeight * 2);

    return (scrollTime === true && scrollTopWindow > scrollTopBody);
  }

  /* Fetch Page */
  function fetchPage () {
    if (typeof $maxPages !== 'undefined' && currentPage <= $maxPages && detectPageEnd()) {
      $.ajax({
        type: 'GET',
        url: ($pathname + "page/" + currentPage),
        dataType: 'html',
        beforeSend: function () {
          $win.off('scroll', onScroll);
          $('body').addClass('is-loading');
          $btnLoadMore.text('Loading...');
        },
        success: function (data) {
          var entries = $('.feed-entry-wrap', data);
          $('.feed-entry-content').append(entries);
          $btnLoadMore.html('Load more');

          currentPage ++;

          /* Lazy load for image */
          $('.story-image-lazy').lazyload({ threshold : 200 });

          $win.on('scroll', onScroll);
        },
        complete: function () {
          setTimeout(function () {$('body').removeClass('is-loading')}, 700);

          // Disqus Update Count
          if (typeof disqusShortName !== 'undefined') {
            $('.simply-disqus').removeClass('u-hide');
            if (typeof DISQUSWIDGETS !== 'undefined') {
              DISQUSWIDGETS.getCount({reset: true}); // eslint-disable-line
            }
          }

        },

      });

      /* Disable scroll */
      scrollTime = false;
    } else {
      $btnLoadMore.remove();
    }
  }

  /* Is visble next page */
  // function isVisible(element) {
  //   const scroll_pos = $win.scrollTop();
  //   const windowHeight = $win.height();
  //   const elementTop = $(element).offset().top;
  //   const elementHeight = $(element).height();
  //   const elementBottom = elementTop + elementHeight;
  //   return ((elementBottom - elementHeight * 0.25 > scroll_pos) && (elementTop < (scroll_pos + 0.5 * windowHeight)));
  // }

  // function historyReplaceState () {
  //   if ($btnLoadMore.length > 0) {
  //     const scroll = $win.scrollTop();

  //     if (Math.abs(scroll - lastScroll) > $win.height() * 0.1) {
  //       lastScroll = scroll;

  //       $('.feed-entry-wrap').each(function () {
  //         if (isVisible($(this))) {
  //           history.replaceState(null, null, $(this).attr("data-page"));
  //           return (false);
  //         }
  //       });
  //     }
  //   }
  // }

  //  window scroll
  $win.on('scroll', onScroll);

  // set interbal
  setInterval(function () {
    fetchPage();
    // historyReplaceState();
  }, 500);

})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 34 */
/*!********************************!*\
  !*** ./scripts/util/Router.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__camelCase__ = __webpack_require__(/*! ./camelCase */ 35);


/**
 * DOM-based Routing
 *
 * Based on {@link http://goo.gl/EUTi53|Markup-based Unobtrusive Comprehensive DOM-ready Execution} by Paul Irish
 *
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
 */
var Router = function Router(routes) {
  this.routes = routes;
};

/**
 * Fire Router events
 * @param {string} route DOM-based route derived from body classes (`<body class="...">`)
 * @param {string} [event] Events on the route. By default, `init` and `finalize` events are called.
 * @param {string} [arg] Any custom argument to be passed to the event.
 */
Router.prototype.fire = function fire (route, event, arg) {
    if ( event === void 0 ) event = 'init';

  var fire = route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function';
  if (fire) {
    this.routes[route][event](arg);
  }
};

/**
 * Automatically load and fire Router events
 *
 * Events are fired in the following order:
 ** common init
 ** page-specific init
 ** page-specific finalize
 ** common finalize
 */
Router.prototype.loadEvents = function loadEvents () {
    var this$1 = this;

  // Fire common init JS
  this.fire('common');

  // Fire page-specific init JS, and then finalize JS
  document.body.className
    .toLowerCase()
    .replace(/-/g, '_')
    .split(/\s+/)
    .map(__WEBPACK_IMPORTED_MODULE_0__camelCase__["a" /* default */])
    .forEach(function (className) {
      this$1.fire(className);
      this$1.fire(className, 'finalize');
    });

  // Fire common finalize JS
  this.fire('common', 'finalize');
};

/* harmony default export */ __webpack_exports__["a"] = (Router);


/***/ }),
/* 35 */
/*!***********************************!*\
  !*** ./scripts/util/camelCase.js ***!
  \***********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * the most terrible camelizer on the internet, guaranteed!
 * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
 * @return {string} String converted to camel-case, e.g., camelCaseIsHard
 */
/* harmony default export */ __webpack_exports__["a"] = (function (str) { return ("" + (str.charAt(0).toLowerCase()) + (str.replace(/[\W_]/g, '|').split('|')
  .map(function (part) { return ("" + (part.charAt(0).toUpperCase()) + (part.slice(1))); })
  .join('')
  .slice(1))); });;


/***/ }),
/* 36 */
/*!**********************************!*\
  !*** ./scripts/routes/common.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_share__ = __webpack_require__(/*! ../app/app.share */ 37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_app_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_follow__ = __webpack_require__(/*! ../app/app.follow */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_search__ = __webpack_require__(/*! ../app/app.search */ 39);




// Varibles
var $body = $('body');
var $blogUrl = $body.attr('data-page');
var $seachInput = $('#search-field');

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // Follow me
    if (typeof followSocialMedia !== 'undefined') { Object(__WEBPACK_IMPORTED_MODULE_1__app_app_follow__["a" /* default */])(followSocialMedia); } // eslint-disable-line

    /* Lazy load for image */
    $('.cover-lazy').lazyload({effect : 'fadeIn'});
    $('.story-image-lazy').lazyload({threshold : 200});
  }, // end Init

  finalize: function finalize() {
    /* Menu open and close for mobile */
    $('.button-nav--toggle').on('click', function (e) {
      e.preventDefault();
      $body.toggleClass('is-showNavMob');
    });

    /* rocket to the moon (retur TOP HOME) */
    $('.rocket').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 250);
    });

    /* Share article in Social media */
    $('.simply-share').bind('click', function (e) {
      e.preventDefault();
      var share = new __WEBPACK_IMPORTED_MODULE_0__app_app_share___default.a($(this));
      share.share();
    });

    /* sicky sidebar */
    $('.sidebar-sticky').theiaStickySidebar({additionalMarginTop: 30});

    // show comments count of disqus
    if (typeof disqusShortName !== 'undefined') { $('.simply-disqus').removeClass('u-hide'); }

    // Search
    Object(__WEBPACK_IMPORTED_MODULE_2__app_app_search__["a" /* default */])($seachInput, $blogUrl);

    /* show btn for Retur TOP PAGE */
    setInterval( function () {
      ($(window).scrollTop() > 100) ? $('.rocket').removeClass('u-hide') : $('.rocket').addClass('u-hide');
    }, 250);

  }, //end => Finalize
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 37 */
/*!**********************************!*\
  !*** ./scripts/app/app.share.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

/*
* @package godofredoninja
* Share social media
*/

var simplyShare = function simplyShare(elem) {
  this.elem = elem;
  this.popWidth = 600;
  this.popHeight = 480;
  this.left = ((window.innerWidth / 2) - (this.popWidth / 2)) + window.screenX;
  this.top = ((window.innerHeight / 2) - (this.popHeight / 2)) + window.screenY;
};

/**
 * @description Helper to get the attribute of a DOM element
 * @param {String} attr DOM element attribute
 * @returns {String|Empty} returns the attr value or empty string
 */
simplyShare.prototype.attributes = function attributes (a) {
  var val = this.elem.attr(("data-" + a));
  return (val === undefined || val === null) ? false : val;
};

/**
 * @description Main share event. Will pop a window or redirect to a link
 */
simplyShare.prototype.share = function share () {
  var socialMediaName = this.attributes('share').toLowerCase();

  var socialMedia = {
    facebook: {
      shareUrl: 'https://www.facebook.com/sharer.php',
      params: {
        u: this.attributes('url'),
      },
    },
    twitter: {
      shareUrl: 'https://twitter.com/intent/tweet/',
      params: {
        text: this.attributes('title'),
        url: this.attributes('url'),
      },
    },
    reddit: {
      shareUrl: 'https://www.reddit.com/submit',
      params: {
        url: this.attributes('url'),
      },
    },
    pinterest: {
      shareUrl: 'https://www.pinterest.com/pin/create/button/',
      params: {
        url: this.attributes('url'),
        description: this.attributes('title'),
      },
    },
    linkedin: {
      shareUrl: 'https://www.linkedin.com/shareArticle',
      params: {
        url: this.attributes('url'),
        mini: true,
      },
    },
    whatsapp: {
      shareUrl: 'whatsapp://send',
      params: {
        text: this.attributes('title') + ' ' + this.attributes('url'),
      },
      isLink: true,
    },
    pocket: {
      shareUrl: 'https://getpocket.com/save',
      params: {
        url: this.attributes('url'),
      },
    },
  };

  var social = socialMedia[socialMediaName];

  return social !== undefined ? this.popup(social) : false;
};

/* windows Popup */
simplyShare.prototype.popup = function popup (share) {
  var p = share.params || {};
  var keys = Object.keys(p);

  var socialMediaUrl = share.shareUrl;
  var str = keys.length > 0 ? '?' : '';

  Object.keys(keys).forEach(function (i) {
    if (str !== '?') {
      str += '&';
    }

    if (p[keys[i]]) {
      str += (keys[i]) + "=" + (encodeURIComponent(p[keys[i]]));
    }
  });

  socialMediaUrl += str;

  if (!share.isLink) {
    var popParams = "scrollbars=no, width=" + (this.popWidth) + ", height=" + (this.popHeight) + ", top=" + (this.top) + ", left=" + (this.left);
    var newWindow = window.open(socialMediaUrl, '', popParams);

    if (window.focus) {
      newWindow.focus();
    }
  } else {
    window.location.href = socialMediaUrl;
  }
};

/* Export Class */
module.exports = simplyShare;


/***/ }),
/* 38 */
/*!***********************************!*\
  !*** ./scripts/app/app.follow.js ***!
  \***********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["a"] = (function (links) {
  var urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line

  return $.each(links, function (name, url) {
    if (typeof url === 'string' && urlRegexp.test(url)) {
      var template = "\n      <a\n        href=\"" + url + "\"\n        title=\"Follow me in " + name + "\"\n        target=\"_blank\"\n        class=\"simply-tracking i-" + name + "\"\n        data-event-category=\"FollowMe\"\n        data-event-action=\"Social\"\n        data-event-label=\"" + name + "\"\n        data-event-non-interaction=\"1\">\n      </a>";

      $('.followMe').append(template);
    }
  });
});;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 39 */
/*!***********************************!*\
  !*** ./scripts/app/app.search.js ***!
  \***********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["a"] = (function ($input, blogUrl) {
  /* Toggle card for search Search */
  $('.search-toggle').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('is-search');
    $input.focus();
  });

  /* Search Template */
  var searchTemplate = "\n  <a class=\"u-block\" href=\"" + blogUrl + "{{link}}\">\n    <span class=\"u-contentTitle u-fontSizeBase\">{{title}}</span>\n    <span class=\"u-block u-fontSizeSmaller u-textColorNormal u-paddingTop5\">{{pubDate}}</span>\n  </a>";

  // Search
  $input.ghostHunter({
    results: '#searchResults',
    zeroResultsInfo: true,
    info_template: '<p class="u-paddingBottom20 u-fontSize15">Showing {{amount}} results</p>',
    result_template: searchTemplate,
    onKeyUp: true,
  });
});;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 40 */
/*!********************************!*\
  !*** ./scripts/routes/post.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_facebook_share_count__ = __webpack_require__(/*! ../app/app.facebook-share-count */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_instagram__ = __webpack_require__(/*! ../app/app.instagram */ 42);



/* Iframe SRC video */
var iframeVideo = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="youtube.com"]',
  'iframe[src*="youtube-nocookie.com"]',
  'iframe[src*="vid.me"]',
  'iframe[src*="kickstarter.com"][src*="video.html"]' ];

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    var $allMedia = $('.post-body').find(iframeVideo.join(','));

    // Video responsive
    // allMedia.map((key, value) => $(value).wrap('<aside class="video-responsive"></aside>'));
    $allMedia.each(function () {
      $(this).wrap('<aside class="video-responsive"></aside>').parent('.video-responsive');
    });
  },
  finalize: function finalize() {
    // Add data action zoom FOR IMG
    $('.post-body').find('img').attr('data-action', 'zoom');

    // Share Count
    Object(__WEBPACK_IMPORTED_MODULE_0__app_app_facebook_share_count__["a" /* default */])($('.share-count'));

    // sticky share post in left
    $('.sharePost').theiaStickySidebar({additionalMarginTop: 30});

    // newsletter title change
    if (typeof newsletterTitle !== 'undefined') { $('.newsletter-title').html(newsletterTitle); } // eslint-disable-line

    // newsletter Description
    if (typeof newsletterDescription !== 'undefined') { $('.newsletter-description').html(newsletterDescription); } // eslint-disable-line

    // Instagram Feed
    if (typeof instagramUserId !== 'undefined' && typeof instagramToken !== 'undefined' && typeof instagramUserName !== 'undefined') {
      Object(__WEBPACK_IMPORTED_MODULE_1__app_app_instagram__["a" /* default */])(instagramUserId, instagramToken, instagramUserName); // eslint-disable-line
    }

    /* Prism autoloader */
    Prism.plugins.autoloader.languages_path = ($('body').attr('data-page')) + "/assets/scripts/prism-components/"; // eslint-disable-line
  }, // end finalize
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 41 */
/*!*************************************************!*\
  !*** ./scripts/app/app.facebook-share-count.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* Return rounded and pretty value of share count. */
var convertNumber = function (n) {
  if (n >= 1000000000) { return (((n / 1000000000).toFixed(1)) + "G"); }
  if (n >= 1000000) { return (((n / 1000000).toFixed(1)) + "M"); }
  if (n >= 1000) { return (((n / 1000).toFixed(1)) + "K"); }
  return n;
};

/* harmony default export */ __webpack_exports__["a"] = (function (sharebox) {
  sharebox.each( function () {
    var $this = $(this);
    var url = $this.attr('data-url');
    var getURL = "https://graph.facebook.com/?id=" + (encodeURIComponent(url)) + "&callback=?";

    $.getJSON(getURL, function (res) {
      if (res.share !== undefined) {
        var n = res.share.share_count;
        var count = convertNumber(n);
        $this.html(count);
      }
    });
  });
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 42 */
/*!**************************************!*\
  !*** ./scripts/app/app.instagram.js ***!
  \**************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {// user id => 1397790551
// token => 1397790551.1aa422d.37dca7d33ba34544941e111aa03e85c7
// user nname => GodoFredoNinja
// http://instagram.com/oauth/authorize/?client_id=YOURCLIENTIDHERE&redirect_uri=HTTP://YOURREDIRECTURLHERE.COM&response_type=token

/* Template for images */
function makeImages (data) {
  var template = "\n    <div class=\"instagram-col col s6 m4 l2\">\n      <a href=\"" + (data.link) + "\" class=\"instagram-img u-relative u-overflowHidden u-sizeFullWidth u-block\" target=\"_blank\">\n        <span class=\"u-absolute0 u-backgroundSizeCover u-backgroundColorGrayLight instagram-lazy lazy\" data-original=\"" + (data.images.standard_resolution.url) + "\" style:\"z-index:2\"></span>\n        <div class=\"instagram-hover u-absolute0 u-flexColumn\" style=\"z-index:3\">\n          <div class=\"u-textAlignCenter u-fontWeightBold u-textColorWhite u-fontSize20\">\n            <span style=\"padding-right:10px\"><i class=\"i-favorite\"></i> " + (data.likes.count) + "</span>\n            <span style=\"padding-left:10px\"><i class=\"i-comments\"></i> " + (data.comments.count) + "</span>\n          </div>\n        </div>\n      </a>\n    </div>\n  ";

  return template;
}

/* harmony default export */ __webpack_exports__["a"] = (function (userId, token, userName) {
  var imageTotal = 6;
  var getUrl = "https://api.instagram.com/v1/users/" + userId + "/media/recent/?access_token=" + token + "&count=" + imageTotal + "&callback=?";
  var userTemplate = "<a href=\"https://www.instagram.com/" + userName + "\" class=\"button button--large button--chromeless\" target=\"_blank\"><i class=\"i-instagram\"></i> " + userName + "</a>";

  $.ajax({
    url: getUrl,
    dataType: 'jsonp',
    type: 'GET',
    success: function (res) {
      res.data.map( function (dataImage) {
        var images = makeImages(dataImage);

        $('.instagram').removeClass('u-hide');
        $('.instagram-wrap').append(images);
        $('.instagram-name').html(userTemplate);
      });
    },
    complete: function () { $('.instagram-lazy.lazy').lazyload({effect : 'fadeIn'}) },
    error: function () { $('.instagram').remove() },
  });
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 43 */
/*!*********************************!*\
  !*** ./scripts/routes/video.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {// const $postBody = $('.post-body');
var $videoPostFormat = $('.video-post-format');

/* Iframe SRC video */
var iframeVideo = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="youtube.com"]',
  'iframe[src*="youtube-nocookie.com"]',
  'iframe[src*="vid.me"]',
  'iframe[src*="kickstarter.com"][src*="video.html"]' ];

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    var firstVideo = $('.post-body').find(iframeVideo.join(','))[0];

    $videoPostFormat.removeClass('u-hide');

    // Move for large fisrt Video
    $(firstVideo).parent('.video-responsive').appendTo($videoPostFormat);

     // youTube Btn Subscribe
     if (typeof youtubeChannelName !== 'undefined' && typeof youtubeChannelID !== 'undefined') {
      /*eslint-disable */
      var template = "\n      <div class=\"video-subscribe u-flex u-marginTop20 u-h-b-md\" style=\"margin-bottom:16px\">\n        <span class=\"channel-name\" style=\"margin-right:16px\">Subscribe to " + youtubeChannelName + "</span>\n        <div class=\"g-ytsubscribe\" data-channelid=\"" + youtubeChannelID + "\" data-layout=\"default\" data-count=\"default\"></div>\n      </div>";
      /*eslint-enable */

      $videoPostFormat.append(template);

      var go = document.createElement('script');
      go.type = 'text/javascript';
      go.async = true;
      go.src = 'https://apis.google.com/js/platform.js';
      // document.body.appendChild(go);
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(go, s);
    }
  },
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 44 */
/*!*********************************!*\
  !*** ./scripts/routes/audio.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {// const $postBody = $('.post-body');
var $audioPostFormat = $('.audio-post-format');

/* Iframe src audio */
var iframeAudio = [
  'iframe[src*="w.soundcloud.com"]',
  'iframe[src*="soundcloud.com"]',
  'iframe[src*="embed.spotify.com"]',
  'iframe[src*="spotify.com"]',
  'iframe[src*="mixcloud.com"]' ];

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    var firstAudio = $('.post-body').find(iframeAudio.join(','))[0];

    $audioPostFormat.removeClass('u-hide');
    $(firstAudio).appendTo($audioPostFormat);
  },
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 45 */
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./main.scss */ 16);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ 18)(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./main.scss */ 16, function() {
		var newContent = __webpack_require__(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./main.scss */ 16);

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/*!****************************************************!*\
  !*** ../node_modules/css-loader/lib/url/escape.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 47 */
/*!***************************!*\
  !*** ./images/avatar.png ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACbCAMAAABCvxm+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMERFNUY2MzE4Q0QxMUUzODE4RkFDREMyNzVDMjRDQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMERFNUY2NDE4Q0QxMUUzODE4RkFDREMyNzVDMjRDQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIwREU1RjYxMThDRDExRTM4MThGQUNEQzI3NUMyNENDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkIwREU1RjYyMThDRDExRTM4MThGQUNEQzI3NUMyNENDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+gkOp7wAAAjFQTFRFzN7oJCYo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"

/***/ }),
/* 48 */
/*!**************************!*\
  !*** ./fonts/simply.ttf ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.ttf";

/***/ }),
/* 49 */
/*!***************************!*\
  !*** ./fonts/simply.woff ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.woff";

/***/ }),
/* 50 */
/*!**************************!*\
  !*** ./fonts/simply.svg ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.svg";

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map