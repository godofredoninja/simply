/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
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
/******/ 	var hotCurrentHash = "7118560c56d22955fec9"; // eslint-disable-line no-unused-vars
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
/******/ 			var chunkId = 1;
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
/******/ 	return hotCreateRequire(8)(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************************!*\
  !*** ./build/helpers/hmr-client.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var hotMiddlewareScript = __webpack_require__(/*! webpack-hot-middleware/client?noInfo=true&timeout=20000&reload=true */ 1);

hotMiddlewareScript.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});


/***/ }),
/* 1 */
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
  autoConnect: true
};
if (true) {
  var querystring = __webpack_require__(/*! querystring */ 3);
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
  var strip = __webpack_require__(/*! strip-ansi */ 12);

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ 14);
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
      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
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
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
      } else {
        if (reporter) {
          if (obj.warnings.length > 0) {
            reporter.problems('warnings', obj);
          } else {
            reporter.cleanProblemsCache();
          }
          reporter.success();
        }
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

/* WEBPACK VAR INJECTION */}.call(exports, "?noInfo=true&timeout=20000&reload=true", __webpack_require__(/*! ./../webpack/buildin/module.js */ 2)(module)))

/***/ }),
/* 2 */
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
/* 3 */
/*!************************************************!*\
  !*** ../node_modules/querystring-es3/index.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ 4);
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ 11);


/***/ }),
/* 4 */
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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!**************************************************************************************!*\
  !*** multi ./build/util/../helpers/hmr-client.js ./scripts/amp.js ./styles/amp.scss ***!
  \**************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Smigol\projects\ghost\content\themes\simply\src\build\util/../helpers/hmr-client.js */0);
__webpack_require__(/*! ./scripts/amp.js */9);
module.exports = __webpack_require__(/*! ./styles/amp.scss */10);


/***/ }),
/* 9 */
/*!************************!*\
  !*** ./scripts/amp.js ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

console.log('hola Mundo'); // eslint-disable-line


/***/ }),
/* 10 */
/*!*************************!*\
  !*** ./styles/amp.scss ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./amp.scss */ 20);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ 18)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./amp.scss */ 20, function() {
			var newContent = __webpack_require__(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./amp.scss */ 20);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
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
/* 12 */
/*!*******************************************!*\
  !*** ../node_modules/strip-ansi/index.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ 13)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 13 */
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
/* 14 */
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
for (var key in styles) {
  clientOverlay.style[key] = styles[key];
}

var ansiHTML = __webpack_require__(/*! ansi-html */ 22);
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
ansiHTML.setColors(colors);

var Entities = __webpack_require__(/*! html-entities */ 21).AllHtmlEntities;
var entities = new Entities();

exports.showProblems =
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
};

exports.clear =
function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
};

var problemColors = {
  errors: colors.red,
  warnings: colors.yellow
};

function problemType (type) {
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
      type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}


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
/* 16 */,
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

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

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
	if (!options.singleton) options.singleton = isOldIE();

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
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
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
/* 20 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/cache-loader/dist/cjs.js!../node_modules/css-loader?{"sourceMap":true}!../node_modules/postcss-loader/lib?{"config":{"path":"C://Users//Smigol//projects//ghost//content//themes//simply//src//build","ctx":{"open":true,"copy":"images/**_/*","proxyUrl":"http://localhost:3000","cacheBusting":"[name]","paths":{"root":"C://Users//Smigol//projects//ghost//content//themes//simply","assets":"C://Users//Smigol//projects//ghost//content//themes//simply//src","dist":"C://Users//Smigol//projects//ghost//content//themes//simply//assets"},"enabled":{"sourceMaps":true,"optimize":false,"cacheBusting":false,"watcher":true},"watch":["**_/*.hbs"],"entry":{"main":["./scripts/main.js","./styles/main.scss"],"amp":["./scripts/amp.js","./styles/amp.scss"]},"publicPath":"/assets/","devUrl":"http://localhost:2368","env":{"production":false,"development":true},"manifest":{}}},"sourceMap":true}!../node_modules/resolve-url-loader?{"sourceMap":true}!../node_modules/sass-loader/lib/loader.js?{"sourceMap":true}!../node_modules/import-glob!./styles/amp.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ 17)(true);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n.u-flexCenter {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-block {\n  display: block;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-flex1 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-textCenter {\n  text-align: center;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-style: italic;\n  letter-spacing: -.003em;\n  margin-left: -5px;\n  margin-right: 0;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n  line-height: 1.1;\n  margin: 32px 0 0;\n}\n\nh1 {\n  font-size: 32px;\n}\n\nh2 {\n  font-size: 30px;\n}\n\nh3 {\n  font-size: 28px;\n}\n\nh4 {\n  font-size: 22px;\n}\n\nh5 {\n  font-size: 20px;\n}\n\nh6 {\n  font-size: 18px;\n}\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n  overflow: visible;\n  height: 0;\n}\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -30px;\n}\n\nmark {\n  background-color: transparent;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#d7fdd3), to(#d7fdd3));\n  background-image: -webkit-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: -o-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\np {\n  margin: 0;\n}\n\nol,\nul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\np code {\n  background: #EFEFEF;\n  border-radius: 4px;\n  color: #c7254e;\n  padding: 4px 6px;\n  text-shadow: 0 1px #fff;\n}\n\npre {\n  background: #EFEFEF;\n  border-radius: 3px;\n  padding: 10px;\n  overflow-x: auto;\n  font-size: 14px;\n}\n\niframe,\namp-iframe,\n.fluid-width-video-wrapper {\n  margin-top: 30px;\n}\n\n.svg-icon {\n  width: auto;\n  height: 20px;\n  fill: rgba(0, 0, 0, 0.8);\n  stroke: none;\n}\n\n.main-header {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 1000;\n}\n\n.blog-title {\n  height: 50px;\n  line-height: 0;\n}\n\n.logo-link {\n  color: #fff;\n  font-size: 24px;\n  font-weight: 600;\n}\n\n.hamburgermenu {\n  background-color: transparent;\n  border: none;\n  padding: 0;\n  height: 48px;\n  position: relative;\n  -webkit-transition: -webkit-transform .4s;\n  transition: -webkit-transform .4s;\n  -o-transition: -o-transform .4s;\n  transition: transform .4s;\n  transition: transform .4s, -webkit-transform .4s, -o-transform .4s;\n  width: 48px;\n  margin-right: -12px;\n}\n\n.hamburgermenu span {\n  background-color: #fff;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  width: 20px;\n}\n\n.hamburgermenu span:first-child {\n  -webkit-transform: translate(0, -6px);\n       -o-transform: translate(0, -6px);\n          transform: translate(0, -6px);\n}\n\n.hamburgermenu span:last-child {\n  -webkit-transform: translate(0, 6px);\n       -o-transform: translate(0, 6px);\n          transform: translate(0, 6px);\n}\n\n.sidebar {\n  width: 280px;\n  background: #eee;\n}\n\n.sidebar ul {\n  margin: 18px 0 20px;\n}\n\n.sidebar ul li a {\n  margin-bottom: 5px;\n  padding: 6px 20px;\n}\n\n.sidebar .follow {\n  border-top: 1px solid #ddd;\n}\n\n.close-sidebar {\n  height: 50px;\n  font-size: 25px;\n  line-height: 50px;\n  text-align: right;\n  padding-right: 20px;\n  color: #fff;\n}\n\n.author {\n  border-radius: 50%;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n\n.author-avatar {\n  height: 60px;\n  width: 60px;\n}\n\n.author-image {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 100%;\n}\n\n.author-left {\n  padding-left: 15px;\n  font-size: 16px;\n}\n\n.author-bio {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.main {\n  margin: auto;\n  max-width: 600px;\n  padding-top: 50px;\n}\n\n.article-header {\n  margin-top: 20px;\n}\n\n.article-title {\n  line-height: 1.04;\n  margin-top: 20px;\n}\n\n.article-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-size: 20px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n  margin-bottom: 20px;\n  margin-top: 10px;\n}\n\n.article-image {\n  margin-right: -20px;\n  margin-left: -20px;\n}\n\n.article-tags {\n  padding: 30px 0 0;\n}\n\n.article-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  display: inline-block;\n  font-size: 14px;\n  height: 37px;\n  line-height: 35px;\n  padding: 0 16px;\n  margin: 0 8px 8px 0;\n}\n\n.article-body {\n  font-family: \"Droid Serif\", serif;\n  font-size: 18px;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.article-body a {\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(50%, rgba(0, 0, 0, 0.6)), color-stop(50%, transparent));\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.article-body p {\n  margin-top: 28px;\n}\n\n.article-body ul,\n.article-body ol {\n  counter-reset: post;\n  margin-top: 20px;\n}\n\n.article-body ul li,\n.article-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: 30px;\n}\n\n.article-body ul li::before,\n.article-body ol li::before {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n.article-body ul li::before {\n  content: '\\2022';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px;\n}\n\n.article-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n.kg-card-markdown > p:first-of-type::first-letter {\n  float: left;\n  font-size: 50px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n.related {\n  padding-top: 20px;\n  padding-bottom: 20px;\n  margin-top: 40px;\n  background: #fafafa;\n}\n\n.related-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.15);\n  margin-bottom: 30px;\n}\n\n.related-title span {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.54);\n  color: rgba(0, 0, 0, 0.84);\n  display: inline-block;\n  font-size: 18px;\n  font-weight: 600;\n  padding-bottom: 20px;\n}\n\n.story:nth-child(3n) .story-border {\n  border-color: #f59e00;\n}\n\n.story:nth-child(3n+2) .story-border {\n  border-color: #26a8ed;\n}\n\n.story-link {\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  -webkit-box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.story-title {\n  line-height: 1.1;\n  font-size: 18px;\n  font-weight: 400;\n  margin: 0;\n}\n\n.story-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  font-size: 28px;\n  font-weight: 700;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.footer {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.44);\n  font-weight: 600;\n  padding-top: 20px;\n  padding-bottom: 45px;\n}\n\n.copyright {\n  font-size: 14px;\n}\n\n.copyright a {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.follow {\n  padding: 20px;\n}\n\n.follow a {\n  padding: 0 7px;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.share {\n  margin: 15px 0 0;\n  height: 26px;\n}\n\n.share ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 26px;\n}\n\n.share li {\n  width: 25%;\n  margin: 0 2px;\n}\n\n.share li svg {\n  width: 100%;\n  height: 100%;\n  display: block;\n  fill: #fff;\n}\n\n.share li.fb {\n  background-color: #45619D;\n}\n\n.share li.tw {\n  background-color: #00ACEE;\n}\n\n.share li.wa {\n  background-color: #0f9938;\n}\n\n.share li.gplus {\n  background-color: #F63E28;\n}\n\n", "", {"version":3,"sources":["C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/amp.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/src/styles/amp.scss","C:/Users/Smigol/projects/ghost/content/themes/simply/src/styles/C:/Users/Smigol/projects/ghost/content/themes/simply/amp.scss"],"names":[],"mappings":"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","file":"amp.scss","sourcesContent":["@charset \"UTF-8\";\n.u-bgColor {\n  background-color: #00A034; }\n\n.u-flexCenter {\n  align-items: center;\n  display: flex; }\n\n.u-block {\n  display: block; }\n\n.u-relative {\n  position: relative; }\n\n.u-overflowHidden {\n  overflow: hidden; }\n\n.u-fontSizeSmaller {\n  font-size: 14px; }\n\n.u-flex1 {\n  flex: 1 1 auto; }\n\n.u-absolute {\n  position: absolute; }\n\n.u-textCenter {\n  text-align: center; }\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px; }\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44); }\n\n*, *::before, *::after {\n  box-sizing: border-box; }\n\na {\n  color: inherit;\n  text-decoration: none; }\n  a:active, a:hover {\n    outline: 0; }\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility; }\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-style: italic;\n  letter-spacing: -.003em;\n  margin-left: -5px;\n  margin-right: 0;\n  padding-bottom: 2px;\n  padding-left: 20px; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n  line-height: 1.1;\n  margin: 32px 0 0; }\n\nh1 {\n  font-size: 32px; }\n\nh2 {\n  font-size: 30px; }\n\nh3 {\n  font-size: 28px; }\n\nh4 {\n  font-size: 22px; }\n\nh5 {\n  font-size: 20px; }\n\nh6 {\n  font-size: 18px; }\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n  overflow: visible;\n  height: 0; }\n  hr::before {\n    color: rgba(0, 0, 0, 0.6);\n    content: '...';\n    display: inline-block;\n    font-family: \"Source Sans Pro\", sans-serif;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -30px; }\n\nmark {\n  background-color: transparent;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8); }\n\np {\n  margin: 0; }\n\nol, ul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0; }\n\np code {\n  background: #EFEFEF;\n  border-radius: 4px;\n  color: #c7254e;\n  padding: 4px 6px;\n  text-shadow: 0 1px #fff; }\n\npre {\n  background: #EFEFEF;\n  border-radius: 3px;\n  padding: 10px;\n  overflow-x: auto;\n  font-size: 14px; }\n\niframe,\namp-iframe,\n.fluid-width-video-wrapper {\n  margin-top: 30px; }\n\n.svg-icon {\n  width: auto;\n  height: 20px;\n  fill: rgba(0, 0, 0, 0.8);\n  stroke: none; }\n\n.main-header {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 1000; }\n\n.blog-title {\n  height: 50px;\n  line-height: 0; }\n\n.logo-link {\n  color: #fff;\n  font-size: 24px;\n  font-weight: 600; }\n\n.hamburgermenu {\n  background-color: transparent;\n  border: none;\n  padding: 0;\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n  margin-right: -12px; }\n  .hamburgermenu span {\n    background-color: #fff;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    width: 20px; }\n    .hamburgermenu span:first-child {\n      transform: translate(0, -6px); }\n    .hamburgermenu span:last-child {\n      transform: translate(0, 6px); }\n\n.sidebar {\n  width: 280px;\n  background: #eee; }\n  .sidebar ul {\n    margin: 18px 0 20px; }\n  .sidebar ul li a {\n    margin-bottom: 5px;\n    padding: 6px 20px; }\n  .sidebar .follow {\n    border-top: 1px solid #ddd; }\n\n.close-sidebar {\n  height: 50px;\n  font-size: 25px;\n  line-height: 50px;\n  text-align: right;\n  padding-right: 20px;\n  color: #fff; }\n\n.author {\n  border-radius: 50%;\n  flex: 0 0 auto; }\n  .author-avatar {\n    height: 60px;\n    width: 60px; }\n  .author-image {\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 100%; }\n  .author-left {\n    padding-left: 15px;\n    font-size: 16px; }\n  .author-bio {\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n\n.main {\n  margin: auto;\n  max-width: 600px;\n  padding-top: 50px; }\n\n.article-header {\n  margin-top: 20px; }\n\n.article-title {\n  line-height: 1.04;\n  margin-top: 20px; }\n\n.article-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-size: 20px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n  margin-bottom: 20px;\n  margin-top: 10px; }\n\n.article-image {\n  margin-right: -20px;\n  margin-left: -20px; }\n\n.article-tags {\n  padding: 30px 0 0; }\n  .article-tags a {\n    background: rgba(0, 0, 0, 0.08);\n    border-radius: 3px;\n    color: rgba(0, 0, 0, 0.6);\n    display: inline-block;\n    font-size: 14px;\n    height: 37px;\n    line-height: 35px;\n    padding: 0 16px;\n    margin: 0 8px 8px 0; }\n\n.article-body {\n  font-family: \"Droid Serif\", serif;\n  font-size: 18px;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58; }\n  .article-body a {\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n    background-position: 0 1.07em;\n    background-repeat: repeat-x;\n    background-size: 2px .1em;\n    text-decoration: none; }\n  .article-body p {\n    margin-top: 28px; }\n  .article-body ul,\n  .article-body ol {\n    counter-reset: post;\n    margin-top: 20px; }\n    .article-body ul li,\n    .article-body ol li {\n      letter-spacing: -.003em;\n      line-height: 1.58;\n      margin-left: 30px; }\n      .article-body ul li::before,\n      .article-body ol li::before {\n        box-sizing: border-box;\n        display: inline-block;\n        margin-left: -78px;\n        position: absolute;\n        text-align: right;\n        width: 78px; }\n  .article-body ul li::before {\n    content: '•';\n    font-size: 16.8px;\n    padding-right: 15px;\n    padding-top: 4px; }\n  .article-body ol li::before {\n    content: counter(post) \".\";\n    counter-increment: post;\n    padding-right: 12px; }\n\n.kg-card-markdown > p:first-of-type::first-letter {\n  float: left;\n  font-size: 50px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase; }\n\n.related {\n  padding-top: 20px;\n  padding-bottom: 20px;\n  margin-top: 40px;\n  background: #fafafa; }\n  .related-title {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.15);\n    margin-bottom: 30px; }\n    .related-title span {\n      border-bottom: 1px solid rgba(0, 0, 0, 0.54);\n      color: rgba(0, 0, 0, 0.84);\n      display: inline-block;\n      font-size: 18px;\n      font-weight: 600;\n      padding-bottom: 20px; }\n\n.story:nth-child(3n) .story-border {\n  border-color: #f59e00; }\n\n.story:nth-child(3n+2) .story-border {\n  border-color: #26a8ed; }\n\n.story-link {\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  min-height: 50px;\n  padding: 15px 15px 15px 55px; }\n\n.story-title {\n  line-height: 1.1;\n  font-size: 18px;\n  font-weight: 400;\n  margin: 0; }\n\n.story-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  font-size: 28px;\n  font-weight: 700;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0; }\n\n.footer {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.44);\n  font-weight: 600;\n  padding-top: 20px;\n  padding-bottom: 45px; }\n\n.copyright {\n  font-size: 14px; }\n  .copyright a {\n    color: rgba(0, 0, 0, 0.7); }\n\n.follow {\n  padding: 20px; }\n  .follow a {\n    padding: 0 7px;\n    display: inline-block;\n    vertical-align: middle; }\n\n.share {\n  margin: 15px 0 0;\n  height: 26px; }\n  .share ul {\n    display: flex;\n    height: 26px; }\n  .share li {\n    width: 25%;\n    margin: 0 2px; }\n  .share li svg {\n    width: 100%;\n    height: 100%;\n    display: block;\n    fill: #fff; }\n  .share li.fb {\n    background-color: #45619D; }\n  .share li.tw {\n    background-color: #00ACEE; }\n  .share li.wa {\n    background-color: #0f9938; }\n  .share li.gplus {\n    background-color: #F63E28; }\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdHlsZXMvYW1wLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMDEuIFZhcmlhYmxlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4kY29kZS1jb2xvcjojYzcyNTRlO1xyXG4kcHJpbWFyeS1jb2xvcjogIzAwQTAzNDtcclxuJHByaW1hcnktZm9udDogICAgJ1NvdXJjZSBTYW5zIFBybycsIHNhbnMtc2VyaWY7XHJcbiRzZWN1bmRhcnktZm9udDogICdEcm9pZCBTZXJpZicsIHNlcmlmO1xyXG5cclxuLy8gMDIuIFV0aWxpdGllc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4udS1iZ0NvbG9yIHsgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3IgfVxyXG4udS1mbGV4Q2VudGVyIHsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZGlzcGxheTogZmxleDsgfVxyXG4udS1ibG9jayB7IGRpc3BsYXk6IGJsb2NrIH1cclxuLnUtcmVsYXRpdmUgeyBwb3NpdGlvbjogcmVsYXRpdmUgfVxyXG4udS1vdmVyZmxvd0hpZGRlbiB7IG92ZXJmbG93OiBoaWRkZW4gfVxyXG4udS1mb250U2l6ZVNtYWxsZXIgeyBmb250LXNpemU6IDE0cHggfVxyXG4udS1mbGV4MSB7IGZsZXg6IDEgMSBhdXRvIH1cclxuLnUtYWJzb2x1dGUgeyBwb3NpdGlvbjogYWJzb2x1dGUgfVxyXG4udS10ZXh0Q2VudGVyIHsgdGV4dC1hbGlnbjogY2VudGVyIH1cclxuXHJcbi51LWNvbnRhaW5lciB7XHJcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gIHBhZGRpbmctbGVmdDogMjBweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG59XHJcblxyXG4udS10ZXh0Q29sb3JOb3JtYWwge1xyXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDQpO1xyXG4gIGZpbGw6IHJnYmEoMCwgMCwgMCwgMC40NCk7XHJcbn1cclxuXHJcbi8vIDAzLiBHbG9iYWxcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbmEge1xyXG4gIGNvbG9yOiBpbmhlcml0O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHJcbiAgJjphY3RpdmUsXHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gIH1cclxufVxyXG5cclxuYm9keSB7XHJcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcclxuICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xyXG59XHJcblxyXG5ibG9ja3F1b3RlIHtcclxuICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC44KTtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IC0uMDAzZW07XHJcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gIHBhZGRpbmctYm90dG9tOiAycHg7XHJcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG59XHJcblxyXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcclxuICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBsZXR0ZXItc3BhY2luZzogLS4wMjhlbTtcclxuICBsaW5lLWhlaWdodDogMS4xO1xyXG4gIG1hcmdpbjogMzJweCAwIDA7XHJcbn1cclxuXHJcbmgxIHsgZm9udC1zaXplOiAzMnB4IH1cclxuaDIgeyBmb250LXNpemU6IDMwcHggfVxyXG5oMyB7IGZvbnQtc2l6ZTogMjhweCB9XHJcbmg0IHsgZm9udC1zaXplOiAyMnB4IH1cclxuaDUgeyBmb250LXNpemU6IDIwcHggfVxyXG5oNiB7IGZvbnQtc2l6ZTogMThweCB9XHJcblxyXG5ociB7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbjogNTBweCBhdXRvO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBvdmVyZmxvdzogdmlzaWJsZTtcclxuICBoZWlnaHQ6IDA7XHJcblxyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgICBjb250ZW50OiAnLi4uJztcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGZvbnQtZmFtaWx5OiAkcHJpbWFyeS1mb250O1xyXG4gICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAuNmVtO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdG9wOiAtMzBweDtcclxuICB9XHJcbn1cclxuXHJcbm1hcmsge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMjE1LCAyNTMsIDIxMSwgMSksIHJnYmEoMjE1LCAyNTMsIDIxMSwgMSkpO1xyXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC44KTtcclxufVxyXG5cclxucCB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG5vbCwgdWwge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgbGlzdC1zdHlsZS1pbWFnZTogbm9uZTtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxucCBjb2RlIHtcclxuICBiYWNrZ3JvdW5kOiAjRUZFRkVGO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBjb2xvcjogJGNvZGUtY29sb3I7XHJcbiAgcGFkZGluZzogNHB4IDZweDtcclxuICB0ZXh0LXNoYWRvdzogMCAxcHggI2ZmZjtcclxufVxyXG5cclxucHJlIHtcclxuICBiYWNrZ3JvdW5kOiAjRUZFRkVGO1xyXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4vLyBzdHlsZWxpbnQtZGlzYWJsZVxyXG5pZnJhbWUsXHJcbmFtcC1pZnJhbWUsXHJcbi5mbHVpZC13aWR0aC12aWRlby13cmFwcGVyIHsgbWFyZ2luLXRvcDogMzBweCB9XHJcbi8vIHN0eWxlbGludC1lbmFibGVcclxuXHJcbi5zdmctaWNvbiB7XHJcbiAgd2lkdGg6IGF1dG87XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGZpbGw6IHJnYmEoMCwgMCwgMCwgMC44KTtcclxuICBzdHJva2U6IG5vbmU7XHJcbn1cclxuXHJcbi8vIDA0LiBIZWFkZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLm1haW4taGVhZGVyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcbn1cclxuXHJcbi5ibG9nLXRpdGxlIHtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDA7XHJcbn1cclxuXHJcbi5sb2dvLWxpbmsge1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcblxyXG4uaGFtYnVyZ2VybWVudSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgaGVpZ2h0OiA0OHB4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjRzO1xyXG4gIHdpZHRoOiA0OHB4O1xyXG4gIG1hcmdpbi1yaWdodDogLTEycHg7XHJcblxyXG4gIHNwYW4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgaGVpZ2h0OiAycHg7XHJcbiAgICBsZWZ0OiAxNHB4O1xyXG4gICAgbWFyZ2luLXRvcDogLTFweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcblxyXG4gICAgJjpmaXJzdC1jaGlsZCB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC02cHgpOyB9XHJcbiAgICAmOmxhc3QtY2hpbGQgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA2cHgpOyB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyAwNS4gU2lkZWJhclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLnNpZGViYXIge1xyXG4gIHdpZHRoOiAyODBweDtcclxuICBiYWNrZ3JvdW5kOiAjZWVlO1xyXG5cclxuICB1bCB7IG1hcmdpbjogMThweCAwIDIwcHggfVxyXG5cclxuICB1bCBsaSBhIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuICAgIHBhZGRpbmc6IDZweCAyMHB4O1xyXG4gIH1cclxuXHJcbiAgLmZvbGxvdyB7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkIH1cclxufVxyXG5cclxuLmNsb3NlLXNpZGViYXIge1xyXG4gIGhlaWdodDogNTBweDtcclxuICBmb250LXNpemU6IDI1cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDUwcHg7XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgcGFkZGluZy1yaWdodDogMjBweDtcclxuICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLy8gMDYuIGF1dGhvciBpbmZvXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi5hdXRob3Ige1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBmbGV4OiAwIDAgYXV0bztcclxuXHJcbiAgJi1hdmF0YXIge1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgd2lkdGg6IDYwcHg7XHJcbiAgfVxyXG5cclxuICAmLWltYWdlIHtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG4gICYtbGVmdCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgfVxyXG5cclxuICAmLWJpbyB7XHJcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgfVxyXG59XHJcblxyXG4vLyAwNy4gQXJ0aWNsZVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLm1haW4ge1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBtYXgtd2lkdGg6IDYwMHB4O1xyXG4gIHBhZGRpbmctdG9wOiA1MHB4O1xyXG59XHJcblxyXG4uYXJ0aWNsZSB7XHJcbiAgJi1oZWFkZXIgeyBtYXJnaW4tdG9wOiAyMHB4IH1cclxuICAmLXRpdGxlIHsgbGluZS1oZWlnaHQ6IDEuMDQ7IG1hcmdpbi10b3A6IDIwcHggfVxyXG5cclxuICAmLWV4Y2VycHQge1xyXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NCk7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogLS4wMjJlbTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjIyO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgfVxyXG5cclxuICAmLWltYWdlIHtcclxuICAgIG1hcmdpbi1yaWdodDogLTIwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTIwcHg7XHJcbiAgfVxyXG5cclxuICAmLXRhZ3Mge1xyXG4gICAgcGFkZGluZzogMzBweCAwIDA7XHJcblxyXG4gICAgYSB7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wOCk7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgIGhlaWdodDogMzdweDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDM1cHg7XHJcbiAgICAgIHBhZGRpbmc6IDAgMTZweDtcclxuICAgICAgbWFyZ2luOiAwIDhweCA4cHggMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIHBvc3QgY29udGVudFxyXG4uYXJ0aWNsZS1ib2R5IHtcclxuICBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250O1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGxldHRlci1zcGFjaW5nOiAtLjAwNGVtO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjU4O1xyXG5cclxuICBhIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwgMCwgMCwgLjYpIDUwJSwgcmdiYSgwLCAwLCAwLCAwKSA1MCUpO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjA3ZW07XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDJweCAuMWVtO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIH1cclxuXHJcbiAgcCB7IG1hcmdpbi10b3A6IDI4cHggfVxyXG5cclxuICB1bCxcclxuICBvbCB7XHJcbiAgICBjb3VudGVyLXJlc2V0OiBwb3N0O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuXHJcbiAgICBsaSB7XHJcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAwM2VtO1xyXG4gICAgICBsaW5lLWhlaWdodDogMS41ODtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcblxyXG4gICAgICAmOjpiZWZvcmUge1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNzhweDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgICAgd2lkdGg6IDc4cHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVsIGxpOjpiZWZvcmUge1xyXG4gICAgY29udGVudDogJ+KAoic7XHJcbiAgICBmb250LXNpemU6IDE2LjhweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDE1cHg7XHJcbiAgICBwYWRkaW5nLXRvcDogNHB4O1xyXG4gIH1cclxuXHJcbiAgb2wgbGk6OmJlZm9yZSB7XHJcbiAgICBjb250ZW50OiBjb3VudGVyKHBvc3QpIFwiLlwiO1xyXG4gICAgY291bnRlci1pbmNyZW1lbnQ6IHBvc3Q7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMnB4O1xyXG4gIH1cclxufVxyXG5cclxuLmtnLWNhcmQtbWFya2Rvd24gPiBwOmZpcnN0LW9mLXR5cGU6OmZpcnN0LWxldHRlciB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgZm9udC1zaXplOiA1MHB4O1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGxldHRlci1zcGFjaW5nOiAtLjAzZW07XHJcbiAgbGluZS1oZWlnaHQ6IC44MztcclxuICBtYXJnaW4tYm90dG9tOiAtLjA4ZW07XHJcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA3cHg7XHJcbiAgcGFkZGluZy10b3A6IDdweDtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcblxyXG4vLyAwLjggQXJ0aWNsZSBSZWxhdGVkXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi5yZWxhdGVkIHtcclxuICBwYWRkaW5nLXRvcDogMjBweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxuICBtYXJnaW4tdG9wOiA0MHB4O1xyXG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XHJcblxyXG4gICYtdGl0bGUge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjE1KTtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcblxyXG4gICAgc3BhbiB7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC41NCk7XHJcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC44NCk7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5zdG9yeSB7XHJcbiAgLy8gcGFkZGluZy1ib3R0b206IDJweDtcclxuXHJcbiAgJjpudGgtY2hpbGQoM24pIHsgLnN0b3J5LWJvcmRlciB7IGJvcmRlci1jb2xvcjogZGFya2VuKG9yYW5nZSwgMiUpOyB9IH1cclxuICAmOm50aC1jaGlsZCgzbisyKSB7IC5zdG9yeS1ib3JkZXIgeyBib3JkZXItY29sb3I6ICMyNmE4ZWQgfSB9XHJcblxyXG4gICYtbGluayB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjA0KTtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDdweCByZ2JhKDAsIDAsIDAsIC4wNSk7XHJcbiAgICBtaW4taGVpZ2h0OiA1MHB4O1xyXG4gICAgcGFkZGluZzogMTVweCAxNXB4IDE1cHggNTVweDtcclxuICB9XHJcblxyXG4gICYtdGl0bGUge1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgfVxyXG5cclxuICAmLWJvcmRlciB7XHJcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICRwcmltYXJ5LWNvbG9yO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjIpO1xyXG4gICAgZm9udC1mYW1pbHk6ICRzZWN1bmRhcnktZm9udDtcclxuICAgIGZvbnQtc2l6ZTogMjhweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcGFkZGluZzogMTVweCAxMHB4IDEwcHg7XHJcbiAgICB0b3A6IDA7XHJcbiAgfVxyXG59XHJcblxyXG4vLyAwLjkgRm9vdGVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi5mb290ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiA0NXB4O1xyXG59XHJcblxyXG4uY29weXJpZ2h0IHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcblxyXG4gIGEgeyBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNykgfVxyXG59XHJcblxyXG4vLyAxMCBGb2xsb3dcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLmZvbGxvdyB7XHJcbiAgcGFkZGluZzogMjBweDtcclxuXHJcbiAgYSB7XHJcbiAgICBwYWRkaW5nOiAwIDdweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgfVxyXG59XHJcblxyXG4uc2hhcmUge1xyXG4gIG1hcmdpbjogMTVweCAwIDA7XHJcbiAgaGVpZ2h0OiAyNnB4O1xyXG5cclxuICB1bCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgaGVpZ2h0OiAyNnB4O1xyXG4gIH1cclxuXHJcbiAgbGkge1xyXG4gICAgd2lkdGg6IDI1JTtcclxuICAgIG1hcmdpbjogMCAycHg7XHJcbiAgfVxyXG5cclxuICBsaSBzdmcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGZpbGw6ICNmZmY7XHJcbiAgfVxyXG5cclxuICBsaS5mYiB7IGJhY2tncm91bmQtY29sb3I6ICM0NTYxOUQgfVxyXG4gIGxpLnR3IHsgYmFja2dyb3VuZC1jb2xvcjogIzAwQUNFRSB9XHJcbiAgbGkud2EgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5OTM4IH1cclxuICBsaS5ncGx1cyB7IGJhY2tncm91bmQtY29sb3I6ICNGNjNFMjggfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBU0EsQUFBQSxVQUFVLENBQUM7RUFBRSxnQkFBZ0IsRUFOYixPQUFPLEdBTXlCOztBQUNoRCxBQUFBLGFBQWEsQ0FBQztFQUFFLFdBQVcsRUFBRSxNQUFNO0VBQUcsT0FBTyxFQUFFLElBQUksR0FBSzs7QUFDeEQsQUFBQSxRQUFRLENBQUM7RUFBRSxPQUFPLEVBQUUsS0FBTSxHQUFHOztBQUM3QixBQUFBLFdBQVcsQ0FBQztFQUFFLFFBQVEsRUFBRSxRQUFTLEdBQUc7O0FBQ3BDLEFBQUEsaUJBQWlCLENBQUM7RUFBRSxRQUFRLEVBQUUsTUFBTyxHQUFHOztBQUN4QyxBQUFBLGtCQUFrQixDQUFDO0VBQUUsU0FBUyxFQUFFLElBQUssR0FBRzs7QUFDeEMsQUFBQSxRQUFRLENBQUM7RUFBRSxJQUFJLEVBQUUsUUFBUyxHQUFHOztBQUM3QixBQUFBLFdBQVcsQ0FBQztFQUFFLFFBQVEsRUFBRSxRQUFTLEdBQUc7O0FBQ3BDLEFBQUEsYUFBYSxDQUFDO0VBQUUsVUFBVSxFQUFFLE1BQU8sR0FBRzs7QUFFdEMsQUFBQSxZQUFZLENBQUM7RUFDWCxXQUFXLEVBQUUsSUFBSTtFQUNqQixZQUFZLEVBQUUsSUFBSTtFQUNsQixZQUFZLEVBQUUsSUFBSTtFQUNsQixhQUFhLEVBQUUsSUFBSSxHQUNwQjs7QUFFRCxBQUFBLGtCQUFrQixDQUFDO0VBQ2pCLEtBQUssRUFBRSxtQkFBbUI7RUFDMUIs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 */","// 01. Variables\r\n// ==========================================================================\r\n$code-color:#c7254e;\r\n$primary-color: #00A034;\r\n$primary-font:    'Source Sans Pro', sans-serif;\r\n$secundary-font:  'Droid Serif', serif;\r\n\r\n// 02. Utilities\r\n// ==========================================================================\r\n.u-bgColor { background-color: $primary-color }\r\n.u-flexCenter { align-items: center; display: flex; }\r\n.u-block { display: block }\r\n.u-relative { position: relative }\r\n.u-overflowHidden { overflow: hidden }\r\n.u-fontSizeSmaller { font-size: 14px }\r\n.u-flex1 { flex: 1 1 auto }\r\n.u-absolute { position: absolute }\r\n.u-textCenter { text-align: center }\r\n\r\n.u-container {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.u-textColorNormal {\r\n  color: rgba(0, 0, 0, 0.44);\r\n  fill: rgba(0, 0, 0, 0.44);\r\n}\r\n\r\n// 03. Global\r\n// ==========================================================================\r\n\r\n*, *::before, *::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\na {\r\n  color: inherit;\r\n  text-decoration: none;\r\n\r\n  &:active,\r\n  &:hover {\r\n    outline: 0;\r\n  }\r\n}\r\n\r\nbody {\r\n  color: rgba(0, 0, 0, 0.8);\r\n  font-family: $primary-font;\r\n  font-size: 18px;\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  letter-spacing: 0;\r\n  line-height: 1.4;\r\n  margin: 0 auto;\r\n  text-rendering: optimizeLegibility;\r\n}\r\n\r\nblockquote {\r\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\r\n  font-style: italic;\r\n  letter-spacing: -.003em;\r\n  margin-left: -5px;\r\n  margin-right: 0;\r\n  padding-bottom: 2px;\r\n  padding-left: 20px;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6 {\r\n  font-family: $primary-font;\r\n  font-style: normal;\r\n  font-weight: 700;\r\n  letter-spacing: -.028em;\r\n  line-height: 1.1;\r\n  margin: 32px 0 0;\r\n}\r\n\r\nh1 { font-size: 32px }\r\nh2 { font-size: 30px }\r\nh3 { font-size: 28px }\r\nh4 { font-size: 22px }\r\nh5 { font-size: 20px }\r\nh6 { font-size: 18px }\r\n\r\nhr {\r\n  border: 0;\r\n  display: block;\r\n  margin: 50px auto;\r\n  text-align: center;\r\n  overflow: visible;\r\n  height: 0;\r\n\r\n  &::before {\r\n    color: rgba(0, 0, 0, .6);\r\n    content: '...';\r\n    display: inline-block;\r\n    font-family: $primary-font;\r\n    font-size: 28px;\r\n    font-weight: 400;\r\n    letter-spacing: .6em;\r\n    position: relative;\r\n    top: -30px;\r\n  }\r\n}\r\n\r\nmark {\r\n  background-color: transparent;\r\n  background-image: linear-gradient(to bottom, rgba(215, 253, 211, 1), rgba(215, 253, 211, 1));\r\n  color: rgba(0, 0, 0, .8);\r\n}\r\n\r\np {\r\n  margin: 0;\r\n}\r\n\r\nol, ul {\r\n  list-style: none;\r\n  list-style-image: none;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\np code {\r\n  background: #EFEFEF;\r\n  border-radius: 4px;\r\n  color: $code-color;\r\n  padding: 4px 6px;\r\n  text-shadow: 0 1px #fff;\r\n}\r\n\r\npre {\r\n  background: #EFEFEF;\r\n  border-radius: 3px;\r\n  padding: 10px;\r\n  overflow-x: auto;\r\n  font-size: 14px;\r\n}\r\n\r\n// stylelint-disable\r\niframe,\r\namp-iframe,\r\n.fluid-width-video-wrapper { margin-top: 30px }\r\n// stylelint-enable\r\n\r\n.svg-icon {\r\n  width: auto;\r\n  height: 20px;\r\n  fill: rgba(0, 0, 0, 0.8);\r\n  stroke: none;\r\n}\r\n\r\n// 04. Header\r\n// ==========================================================================\r\n.main-header {\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100%;\r\n  z-index: 1000;\r\n}\r\n\r\n.blog-title {\r\n  height: 50px;\r\n  line-height: 0;\r\n}\r\n\r\n.logo-link {\r\n  color: #fff;\r\n  font-size: 24px;\r\n  font-weight: 600;\r\n}\r\n\r\n.hamburgermenu {\r\n  background-color: transparent;\r\n  border: none;\r\n  padding: 0;\r\n  height: 48px;\r\n  position: relative;\r\n  transition: transform .4s;\r\n  width: 48px;\r\n  margin-right: -12px;\r\n\r\n  span {\r\n    background-color: #fff;\r\n    display: block;\r\n    height: 2px;\r\n    left: 14px;\r\n    margin-top: -1px;\r\n    position: absolute;\r\n    top: 50%;\r\n    width: 20px;\r\n\r\n    &:first-child { transform: translate(0, -6px); }\r\n    &:last-child { transform: translate(0, 6px); }\r\n  }\r\n}\r\n\r\n// 05. Sidebar\r\n// ==========================================================================\r\n\r\n.sidebar {\r\n  width: 280px;\r\n  background: #eee;\r\n\r\n  ul { margin: 18px 0 20px }\r\n\r\n  ul li a {\r\n    margin-bottom: 5px;\r\n    padding: 6px 20px;\r\n  }\r\n\r\n  .follow { border-top: 1px solid #ddd }\r\n}\r\n\r\n.close-sidebar {\r\n  height: 50px;\r\n  font-size: 25px;\r\n  line-height: 50px;\r\n  text-align: right;\r\n  padding-right: 20px;\r\n  color: #fff;\r\n}\r\n\r\n// 06. author info\r\n// ==========================================================================\r\n.author {\r\n  border-radius: 50%;\r\n  flex: 0 0 auto;\r\n\r\n  &-avatar {\r\n    height: 60px;\r\n    width: 60px;\r\n  }\r\n\r\n  &-image {\r\n    left: 50%;\r\n    top: 50%;\r\n    transform: translate(-50%, -50%);\r\n    width: 100%;\r\n  }\r\n\r\n  &-left {\r\n    padding-left: 15px;\r\n    font-size: 16px;\r\n  }\r\n\r\n  &-bio {\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n  }\r\n}\r\n\r\n// 07. Article\r\n// ==========================================================================\r\n\r\n.main {\r\n  margin: auto;\r\n  max-width: 600px;\r\n  padding-top: 50px;\r\n}\r\n\r\n.article {\r\n  &-header { margin-top: 20px }\r\n  &-title { line-height: 1.04; margin-top: 20px }\r\n\r\n  &-excerpt {\r\n    color: rgba(0, 0, 0, 0.44);\r\n    font-size: 20px;\r\n    letter-spacing: -.022em;\r\n    line-height: 1.22;\r\n    margin-bottom: 20px;\r\n    margin-top: 10px;\r\n  }\r\n\r\n  &-image {\r\n    margin-right: -20px;\r\n    margin-left: -20px;\r\n  }\r\n\r\n  &-tags {\r\n    padding: 30px 0 0;\r\n\r\n    a {\r\n      background: rgba(0, 0, 0, 0.08);\r\n      border-radius: 3px;\r\n      color: rgba(0, 0, 0, 0.6);\r\n      display: inline-block;\r\n      font-size: 14px;\r\n      height: 37px;\r\n      line-height: 35px;\r\n      padding: 0 16px;\r\n      margin: 0 8px 8px 0;\r\n    }\r\n  }\r\n}\r\n\r\n// post content\r\n.article-body {\r\n  font-family: $secundary-font;\r\n  font-size: 18px;\r\n  font-weight: 400;\r\n  letter-spacing: -.004em;\r\n  line-height: 1.58;\r\n\r\n  a {\r\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, 0) 50%);\r\n    background-position: 0 1.07em;\r\n    background-repeat: repeat-x;\r\n    background-size: 2px .1em;\r\n    text-decoration: none;\r\n  }\r\n\r\n  p { margin-top: 28px }\r\n\r\n  ul,\r\n  ol {\r\n    counter-reset: post;\r\n    margin-top: 20px;\r\n\r\n    li {\r\n      letter-spacing: -.003em;\r\n      line-height: 1.58;\r\n      margin-left: 30px;\r\n\r\n      &::before {\r\n        box-sizing: border-box;\r\n        display: inline-block;\r\n        margin-left: -78px;\r\n        position: absolute;\r\n        text-align: right;\r\n        width: 78px;\r\n      }\r\n    }\r\n  }\r\n\r\n  ul li::before {\r\n    content: 'â¢';\r\n    font-size: 16.8px;\r\n    padding-right: 15px;\r\n    padding-top: 4px;\r\n  }\r\n\r\n  ol li::before {\r\n    content: counter(post) \".\";\r\n    counter-increment: post;\r\n    padding-right: 12px;\r\n  }\r\n}\r\n\r\n.kg-card-markdown > p:first-of-type::first-letter {\r\n  float: left;\r\n  font-size: 50px;\r\n  font-style: normal;\r\n  font-weight: 700;\r\n  letter-spacing: -.03em;\r\n  line-height: .83;\r\n  margin-bottom: -.08em;\r\n  margin-left: -5px;\r\n  margin-right: 7px;\r\n  padding-top: 7px;\r\n  text-transform: uppercase;\r\n}\r\n\r\n// 0.8 Article Related\r\n// ==========================================================================\r\n.related {\r\n  padding-top: 20px;\r\n  padding-bottom: 20px;\r\n  margin-top: 40px;\r\n  background: #fafafa;\r\n\r\n  &-title {\r\n    border-bottom: 1px solid rgba(0, 0, 0, .15);\r\n    margin-bottom: 30px;\r\n\r\n    span {\r\n      border-bottom: 1px solid rgba(0, 0, 0, .54);\r\n      color: rgba(0, 0, 0, .84);\r\n      display: inline-block;\r\n      font-size: 18px;\r\n      font-weight: 600;\r\n      padding-bottom: 20px;\r\n    }\r\n  }\r\n}\r\n\r\n.story {\r\n  // padding-bottom: 2px;\r\n\r\n  &:nth-child(3n) { .story-border { border-color: darken(orange, 2%); } }\r\n  &:nth-child(3n+2) { .story-border { border-color: #26a8ed } }\r\n\r\n  &-link {\r\n    background-color: #fff;\r\n    border-bottom: 1px solid rgba(0, 0, 0, .04);\r\n    box-shadow: 0 1px 7px rgba(0, 0, 0, .05);\r\n    min-height: 50px;\r\n    padding: 15px 15px 15px 55px;\r\n  }\r\n\r\n  &-title {\r\n    line-height: 1.1;\r\n    font-size: 18px;\r\n    font-weight: 400;\r\n    margin: 0;\r\n  }\r\n\r\n  &-border {\r\n    border-left: 3px solid $primary-color;\r\n    bottom: 0;\r\n    color: rgba(0, 0, 0, .2);\r\n    font-family: $secundary-font;\r\n    font-size: 28px;\r\n    font-weight: 700;\r\n    left: 0;\r\n    padding: 15px 10px 10px;\r\n    top: 0;\r\n  }\r\n}\r\n\r\n// 0.9 Footer\r\n// ==========================================================================\r\n.footer {\r\n  background-color: #fafafa;\r\n  color: rgba(0, 0, 0, .44);\r\n  font-weight: 600;\r\n  padding-top: 20px;\r\n  padding-bottom: 45px;\r\n}\r\n\r\n.copyright {\r\n  font-size: 14px;\r\n\r\n  a { color: rgba(0, 0, 0, .7) }\r\n}\r\n\r\n// 10 Follow\r\n// ==========================================================================\r\n.follow {\r\n  padding: 20px;\r\n\r\n  a {\r\n    padding: 0 7px;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n  }\r\n}\r\n\r\n.share {\r\n  margin: 15px 0 0;\r\n  height: 26px;\r\n\r\n  ul {\r\n    display: flex;\r\n    height: 26px;\r\n  }\r\n\r\n  li {\r\n    width: 25%;\r\n    margin: 0 2px;\r\n  }\r\n\r\n  li svg {\r\n    width: 100%;\r\n    height: 100%;\r\n    display: block;\r\n    fill: #fff;\r\n  }\r\n\r\n  li.fb { background-color: #45619D }\r\n  li.tw { background-color: #00ACEE }\r\n  li.wa { background-color: #0f9938 }\r\n  li.gplus { background-color: #F63E28 }\r\n}\r\n","@charset \"UTF-8\";\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n.u-flexCenter {\n  align-items: center;\n  display: flex;\n}\n\n.u-block {\n  display: block;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-flex1 {\n  flex: 1 1 auto;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-textCenter {\n  text-align: center;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-style: italic;\n  letter-spacing: -.003em;\n  margin-left: -5px;\n  margin-right: 0;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n  line-height: 1.1;\n  margin: 32px 0 0;\n}\n\nh1 {\n  font-size: 32px;\n}\n\nh2 {\n  font-size: 30px;\n}\n\nh3 {\n  font-size: 28px;\n}\n\nh4 {\n  font-size: 22px;\n}\n\nh5 {\n  font-size: 20px;\n}\n\nh6 {\n  font-size: 18px;\n}\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n  overflow: visible;\n  height: 0;\n}\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -30px;\n}\n\nmark {\n  background-color: transparent;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\np {\n  margin: 0;\n}\n\nol,\nul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\np code {\n  background: #EFEFEF;\n  border-radius: 4px;\n  color: #c7254e;\n  padding: 4px 6px;\n  text-shadow: 0 1px #fff;\n}\n\npre {\n  background: #EFEFEF;\n  border-radius: 3px;\n  padding: 10px;\n  overflow-x: auto;\n  font-size: 14px;\n}\n\niframe,\namp-iframe,\n.fluid-width-video-wrapper {\n  margin-top: 30px;\n}\n\n.svg-icon {\n  width: auto;\n  height: 20px;\n  fill: rgba(0, 0, 0, 0.8);\n  stroke: none;\n}\n\n.main-header {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 1000;\n}\n\n.blog-title {\n  height: 50px;\n  line-height: 0;\n}\n\n.logo-link {\n  color: #fff;\n  font-size: 24px;\n  font-weight: 600;\n}\n\n.hamburgermenu {\n  background-color: transparent;\n  border: none;\n  padding: 0;\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n  margin-right: -12px;\n}\n\n.hamburgermenu span {\n  background-color: #fff;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  width: 20px;\n}\n\n.hamburgermenu span:first-child {\n  transform: translate(0, -6px);\n}\n\n.hamburgermenu span:last-child {\n  transform: translate(0, 6px);\n}\n\n.sidebar {\n  width: 280px;\n  background: #eee;\n}\n\n.sidebar ul {\n  margin: 18px 0 20px;\n}\n\n.sidebar ul li a {\n  margin-bottom: 5px;\n  padding: 6px 20px;\n}\n\n.sidebar .follow {\n  border-top: 1px solid #ddd;\n}\n\n.close-sidebar {\n  height: 50px;\n  font-size: 25px;\n  line-height: 50px;\n  text-align: right;\n  padding-right: 20px;\n  color: #fff;\n}\n\n.author {\n  border-radius: 50%;\n  flex: 0 0 auto;\n}\n\n.author-avatar {\n  height: 60px;\n  width: 60px;\n}\n\n.author-image {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n}\n\n.author-left {\n  padding-left: 15px;\n  font-size: 16px;\n}\n\n.author-bio {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.main {\n  margin: auto;\n  max-width: 600px;\n  padding-top: 50px;\n}\n\n.article-header {\n  margin-top: 20px;\n}\n\n.article-title {\n  line-height: 1.04;\n  margin-top: 20px;\n}\n\n.article-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-size: 20px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n  margin-bottom: 20px;\n  margin-top: 10px;\n}\n\n.article-image {\n  margin-right: -20px;\n  margin-left: -20px;\n}\n\n.article-tags {\n  padding: 30px 0 0;\n}\n\n.article-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  display: inline-block;\n  font-size: 14px;\n  height: 37px;\n  line-height: 35px;\n  padding: 0 16px;\n  margin: 0 8px 8px 0;\n}\n\n.article-body {\n  font-family: \"Droid Serif\", serif;\n  font-size: 18px;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.article-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.article-body p {\n  margin-top: 28px;\n}\n\n.article-body ul,\n.article-body ol {\n  counter-reset: post;\n  margin-top: 20px;\n}\n\n.article-body ul li,\n.article-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: 30px;\n}\n\n.article-body ul li::before,\n.article-body ol li::before {\n  box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n.article-body ul li::before {\n  content: '•';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px;\n}\n\n.article-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n.kg-card-markdown > p:first-of-type::first-letter {\n  float: left;\n  font-size: 50px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n.related {\n  padding-top: 20px;\n  padding-bottom: 20px;\n  margin-top: 40px;\n  background: #fafafa;\n}\n\n.related-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.15);\n  margin-bottom: 30px;\n}\n\n.related-title span {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.54);\n  color: rgba(0, 0, 0, 0.84);\n  display: inline-block;\n  font-size: 18px;\n  font-weight: 600;\n  padding-bottom: 20px;\n}\n\n.story:nth-child(3n) .story-border {\n  border-color: #f59e00;\n}\n\n.story:nth-child(3n+2) .story-border {\n  border-color: #26a8ed;\n}\n\n.story-link {\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.story-title {\n  line-height: 1.1;\n  font-size: 18px;\n  font-weight: 400;\n  margin: 0;\n}\n\n.story-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  font-size: 28px;\n  font-weight: 700;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.footer {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.44);\n  font-weight: 600;\n  padding-top: 20px;\n  padding-bottom: 45px;\n}\n\n.copyright {\n  font-size: 14px;\n}\n\n.copyright a {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.follow {\n  padding: 20px;\n}\n\n.follow a {\n  padding: 0 7px;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.share {\n  margin: 15px 0 0;\n  height: 26px;\n}\n\n.share ul {\n  display: flex;\n  height: 26px;\n}\n\n.share li {\n  width: 25%;\n  margin: 0 2px;\n}\n\n.share li svg {\n  width: 100%;\n  height: 100%;\n  display: block;\n  fill: #fff;\n}\n\n.share li.fb {\n  background-color: #45619D;\n}\n\n.share li.tw {\n  background-color: #00ACEE;\n}\n\n.share li.wa {\n  background-color: #0f9938;\n}\n\n.share li.gplus {\n  background-color: #F63E28;\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 21 */
/*!**********************************************!*\
  !*** ../node_modules/html-entities/index.js ***!
  \**********************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ 26),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ 25),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ 23),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ 23)
};


/***/ }),
/* 22 */
/*!******************************************!*\
  !*** ../node_modules/ansi-html/index.js ***!
  \******************************************/
/*! dynamic exports provided */
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
/* 23 */
/*!***********************************************************!*\
  !*** ../node_modules/html-entities/lib/html5-entities.js ***!
  \***********************************************************/
/*! dynamic exports provided */
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
/* 24 */,
/* 25 */
/*!***********************************************************!*\
  !*** ../node_modules/html-entities/lib/html4-entities.js ***!
  \***********************************************************/
/*! dynamic exports provided */
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
/* 26 */
/*!*********************************************************!*\
  !*** ../node_modules/html-entities/lib/xml-entities.js ***!
  \*********************************************************/
/*! dynamic exports provided */
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


/***/ })
/******/ ]);
//# sourceMappingURL=amp.js.map