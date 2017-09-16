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
/******/ 	var hotCurrentHash = "b564c923d6a1fbeccc03"; // eslint-disable-line no-unused-vars
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
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
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
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
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
/******/ 								orginalError: err
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
/******/ 	return hotCreateRequire(4)(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/cache-loader/dist/cjs.js!../node_modules/css-loader?{"sourceMap":true}!../node_modules/postcss-loader/lib?{"config":{"path":"C://Users//Smigol//Projects//joder//content//themes//simply//src//build","ctx":{"open":true,"copy":"images/**_/*","proxyUrl":"http://localhost:3000","cacheBusting":"[name]","paths":{"root":"C://Users//Smigol//Projects//joder//content//themes//simply","assets":"C://Users//Smigol//Projects//joder//content//themes//simply//src","dist":"C://Users//Smigol//Projects//joder//content//themes//simply//assets"},"enabled":{"sourceMaps":true,"optimize":false,"cacheBusting":false,"watcher":true},"watch":["**_/*.hbs"],"entry":{"main":["./scripts/main.js","./styles/main.scss"]},"publicPath":"/assets/","devUrl":"http://localhost:2368","env":{"production":false,"development":true},"manifest":{}}},"sourceMap":true}!../node_modules/resolve-url-loader?{"sourceMap":true}!../node_modules/sass-loader/lib/loader.js?{"sourceMap":true}!../node_modules/import-glob!./styles/main.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ 33)(true);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none;\n}\n\n.link--accent:hover {\n  color: #00ab6b;\n}\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.tag.not--image,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection,\npre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection,\ncode[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none;\n  }\n}\n\n/* Code blocks */\n\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0;\n}\n\n/* Inline code */\n\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n.token.punctuation {\n  color: #999;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n.token.function {\n  color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\nimg[data-action=\"zoom\"] {\n  cursor: -webkit-zoom-in;\n  cursor: zoom-in;\n}\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms;\n}\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out;\n}\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1;\n}\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default;\n}\n\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 16px;\n}\n\nfigure {\n  margin: 0;\n}\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4;\n}\n\ncode[class*=language-] .token.comment,\npre[class*=language-] .token.comment {\n  opacity: .8;\n}\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n}\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -25px;\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\ni {\n  vertical-align: middle;\n}\n\nol,\nul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#d7fdd3), to(#d7fdd3));\n  background-image: -webkit-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: -o-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n}\n\nq:before,\nq:after {\n  display: none;\n}\n\n.link--underline:active,\n.link--underline:focus,\n.link--underline:hover {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.main,\n.footer {\n  -webkit-transition: -webkit-transform .5s ease;\n  transition: -webkit-transform .5s ease;\n  -o-transition: -o-transform .5s ease;\n  transition: transform .5s ease;\n  transition: transform .5s ease, -webkit-transform .5s ease, -o-transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px;\n  }\n}\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n.warning::before {\n  content: \"\\E002\";\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n.note::before {\n  content: \"\\E838\";\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n.success::before {\n  color: #00bfa5;\n  content: \"\\E86C\";\n}\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n  margin-top: -5px;\n}\n\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n}\n\n.tag-wrap {\n  z-index: 2;\n}\n\n.tag.not--image {\n  min-height: auto;\n}\n\n.tag-description {\n  max-width: 500px;\n}\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n.with-tooltip:after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #FFF;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 130px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n.with-tooltip:hover:after {\n  -webkit-animation: tooltip .1s ease-out both;\n       -o-animation: tooltip .1s ease-out both;\n          animation: tooltip .1s ease-out both;\n}\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.footer a:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n}\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  left: 50%;\n  min-width: 680px;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n}\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n.bg-google,\n.sideNav-follow .i-google {\n  background-color: #dd4b39 !important;\n}\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n.c-github {\n  color: #555 !important;\n}\n\n.bg-github,\n.sideNav-follow .i-github {\n  background-color: #555 !important;\n}\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n.bg-linkedin,\n.sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important;\n}\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n.bg-spotify,\n.sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important;\n}\n\n.c-codepen {\n  color: #222 !important;\n}\n\n.bg-codepen,\n.sideNav-follow .i-codepen {\n  background-color: #222 !important;\n}\n\n.c-behance {\n  color: #131418 !important;\n}\n\n.bg-behance,\n.sideNav-follow .i-behance {\n  background-color: #131418 !important;\n}\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n.bg-dribbble,\n.sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n.bg-flickr,\n.sideNav-follow .i-flickr {\n  background-color: #0063dc !important;\n}\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n.bg-reddit,\n.sideNav-follow .i-reddit {\n  background-color: #ff4500 !important;\n}\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n.bg-pocket,\n.sideNav-follow .i-pocket {\n  background-color: #f50057 !important;\n}\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n.bg-pinterest,\n.sideNav-follow .i-pinterest {\n  background-color: #bd081c !important;\n}\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n.bg-whatsapp,\n.sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important;\n}\n\n.fbSave-dropdown {\n  background-color: #FFF;\n  border: 1px solid #e0e0e0;\n  bottom: 100%;\n  display: none;\n  max-width: 200px;\n  min-width: 100px;\n  padding: 8px;\n  -webkit-transform: translate(-50%, 0);\n       -o-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n  z-index: 10;\n}\n\n.fbSave-dropdown.is-visible {\n  display: block;\n}\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n}\n\n.rocket:hover svg path {\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.svgIcon {\n  display: inline-block;\n}\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  -webkit-animation-delay: .8s;\n       -o-animation-delay: .8s;\n          animation-delay: .8s;\n  -webkit-animation: loading-bar 1s ease-in-out infinite;\n       -o-animation: loading-bar 1s ease-in-out infinite;\n          animation: loading-bar 1s ease-in-out infinite;\n  display: block;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034;\n}\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n.u-headerColorLink a {\n  color: #BBF1B9;\n}\n\n.u-headerColorLink a.active,\n.u-headerColorLink a:hover {\n  color: #EEFFEA;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-fixed {\n  position: fixed !important;\n}\n\n.u-block {\n  display: block !important;\n}\n\n.u-inlineBlock {\n  display: inline-block;\n}\n\n.u-backgroundDark {\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(29%, rgba(0, 0, 0, 0.3)), color-stop(81%, rgba(0, 0, 0, 0.6)));\n  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n.u-clear::before,\n.row::before,\n.u-clear::after,\n.row::after {\n  content: \" \";\n  display: table;\n}\n\n.u-clear::after,\n.row::after {\n  clear: both;\n}\n\n.u-fontSize13 {\n  font-size: 13px;\n}\n\n.u-fontSize14 {\n  font-size: 14px;\n}\n\n.u-fontSize15 {\n  font-size: 15px;\n}\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n.u-fontSize28 {\n  font-size: 28px !important;\n}\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important;\n  }\n\n  .u-md-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n.u-fontWeightSemibold {\n  font-weight: 600;\n}\n\n.u-fontWeightBold {\n  font-weight: 700;\n}\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.u-marginTop20 {\n  margin-top: 20px;\n}\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important;\n}\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n.u-padding20 {\n  padding: 20px;\n}\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n.u-paddingRight10 {\n  padding-right: 10px;\n}\n\n.u-paddingLeft15 {\n  padding-left: 15px;\n}\n\n.u-paddingTop2 {\n  padding-top: 2px;\n}\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n.u-lineHeightTight {\n  line-height: 1.2;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-floatRight {\n  float: right;\n}\n\n.u-floatLeft {\n  float: left;\n}\n\n.u-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-flexCenter {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-flex1 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n.u-flex0 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n\n.u-flexWrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.u-flexColumn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.u-flexEnd {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.u-flexColumnTop {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1200 {\n  max-width: 1200px;\n}\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.u-round {\n  border-radius: 50%;\n}\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n.u-card--p {\n  font-family: \"Droid Serif\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.u-boxShadowBottom {\n  -webkit-box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n.u-height540 {\n  height: 540px;\n}\n\n.u-height280 {\n  height: 280px;\n}\n\n.u-height260 {\n  height: 260px;\n}\n\n.u-height100 {\n  height: 100px;\n}\n\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.u-hide {\n  display: none !important;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important;\n  }\n\n  .u-md-heightAuto {\n    height: auto;\n  }\n\n  .u-md-height170 {\n    height: 170px;\n  }\n\n  .u-md-relative {\n    position: relative;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n.row {\n  margin-left: -10px;\n  margin-right: -10px;\n}\n\n.row .col {\n  float: left;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n.row .col.s1 {\n  width: 8.33333%;\n}\n\n.row .col.s2 {\n  width: 16.66667%;\n}\n\n.row .col.s3 {\n  width: 25%;\n}\n\n.row .col.s4 {\n  width: 33.33333%;\n}\n\n.row .col.s5 {\n  width: 41.66667%;\n}\n\n.row .col.s6 {\n  width: 50%;\n}\n\n.row .col.s7 {\n  width: 58.33333%;\n}\n\n.row .col.s8 {\n  width: 66.66667%;\n}\n\n.row .col.s9 {\n  width: 75%;\n}\n\n.row .col.s10 {\n  width: 83.33333%;\n}\n\n.row .col.s11 {\n  width: 91.66667%;\n}\n\n.row .col.s12 {\n  width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  .row .col.m1 {\n    width: 8.33333%;\n  }\n\n  .row .col.m2 {\n    width: 16.66667%;\n  }\n\n  .row .col.m3 {\n    width: 25%;\n  }\n\n  .row .col.m4 {\n    width: 33.33333%;\n  }\n\n  .row .col.m5 {\n    width: 41.66667%;\n  }\n\n  .row .col.m6 {\n    width: 50%;\n  }\n\n  .row .col.m7 {\n    width: 58.33333%;\n  }\n\n  .row .col.m8 {\n    width: 66.66667%;\n  }\n\n  .row .col.m9 {\n    width: 75%;\n  }\n\n  .row .col.m10 {\n    width: 83.33333%;\n  }\n\n  .row .col.m11 {\n    width: 91.66667%;\n  }\n\n  .row .col.m12 {\n    width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .row .col.l1 {\n    width: 8.33333%;\n  }\n\n  .row .col.l2 {\n    width: 16.66667%;\n  }\n\n  .row .col.l3 {\n    width: 25%;\n  }\n\n  .row .col.l4 {\n    width: 33.33333%;\n  }\n\n  .row .col.l5 {\n    width: 41.66667%;\n  }\n\n  .row .col.l6 {\n    width: 50%;\n  }\n\n  .row .col.l7 {\n    width: 58.33333%;\n  }\n\n  .row .col.l8 {\n    width: 66.66667%;\n  }\n\n  .row .col.l9 {\n    width: 75%;\n  }\n\n  .row .col.l10 {\n    width: 83.33333%;\n  }\n\n  .row .col.l11 {\n    width: 91.66667%;\n  }\n\n  .row .col.l12 {\n    width: 100%;\n  }\n}\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.button i {\n  display: inline-block;\n}\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n.button--chromeless:active,\n.button--chromeless:hover,\n.button--chromeless:focus {\n  border-width: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.button--primary {\n  border-color: #00A034;\n  color: #00A034;\n}\n\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n\n.buttonSet > .button:last-child {\n  margin-right: 0;\n}\n\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px;\n}\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(" + __webpack_require__(/*! ./../fonts/simply.eot */ 3) + ");\n  src: url(" + __webpack_require__(/*! ./../fonts/simply.eot */ 3) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(/*! ./../fonts/simply.ttf */ 34) + ") format(\"truetype\"), url(" + __webpack_require__(/*! ./../fonts/simply.woff */ 35) + ") format(\"woff\"), url(" + __webpack_require__(/*! ./../fonts/simply.svg */ 36) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.i-telegram:before {\n  content: \"\\F2C6\";\n}\n\n.i-link:before {\n  content: \"\\F0C1\";\n}\n\n.i-reddit:before {\n  content: \"\\F281\";\n}\n\n.i-twitter:before {\n  content: \"\\F099\";\n}\n\n.i-github:before {\n  content: \"\\F09B\";\n}\n\n.i-linkedin:before {\n  content: \"\\F0E1\";\n}\n\n.i-code:before {\n  content: \"\\F121\";\n}\n\n.i-youtube:before {\n  content: \"\\F16A\";\n}\n\n.i-stack-overflow:before {\n  content: \"\\F16C\";\n}\n\n.i-instagram:before {\n  content: \"\\F16D\";\n}\n\n.i-flickr:before {\n  content: \"\\F16E\";\n}\n\n.i-dribbble:before {\n  content: \"\\F17D\";\n}\n\n.i-behance:before {\n  content: \"\\F1B4\";\n}\n\n.i-spotify:before {\n  content: \"\\F1BC\";\n}\n\n.i-codepen:before {\n  content: \"\\F1CB\";\n}\n\n.i-facebook:before {\n  content: \"\\F230\";\n}\n\n.i-pinterest:before {\n  content: \"\\F231\";\n}\n\n.i-whatsapp:before {\n  content: \"\\F232\";\n}\n\n.i-snapchat:before {\n  content: \"\\F2AC\";\n}\n\n.i-comments:before {\n  content: \"\\E900\";\n}\n\n.i-location:before {\n  content: \"\\E8B4\";\n}\n\n.i-save:before {\n  content: \"\\E8E6\";\n}\n\n.i-save--line:before {\n  content: \"\\E8E7\";\n}\n\n.i-check-circle:before {\n  content: \"\\E86C\";\n}\n\n.i-close:before {\n  content: \"\\E5CD\";\n}\n\n.i-favorite:before {\n  content: \"\\E87D\";\n}\n\n.i-star:before {\n  content: \"\\E838\";\n}\n\n.i-warning:before {\n  content: \"\\E002\";\n}\n\n.i-rss:before {\n  content: \"\\E0E5\";\n}\n\n.i-search:before {\n  content: \"\\E8B6\";\n}\n\n.i-send:before {\n  content: \"\\E163\";\n}\n\n.i-share:before {\n  content: \"\\E80D\";\n}\n\n.animated {\n  -webkit-animation-duration: 1s;\n       -o-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n       -o-animation-fill-mode: both;\n          animation-fill-mode: both;\n}\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n       -o-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n       -o-animation-name: bounceIn;\n          animation-name: bounceIn;\n}\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n       -o-animation-name: bounceInDown;\n          animation-name: bounceInDown;\n}\n\n.pulse {\n  -webkit-animation-name: pulse;\n       -o-animation-name: pulse;\n          animation-name: pulse;\n}\n\n@-webkit-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n       animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n         -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n@-o-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n       animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -o-transform: none;\n       transform: none;\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n         -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n         -o-transform: none;\n            transform: none;\n  }\n}\n\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-o-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -o-transform: translateY(0);\n       transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -o-transform: translateY(10px);\n       transform: translateY(10px);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n         -o-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n         -o-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-webkit-keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@-o-keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-o-keyframes spin {\n  from {\n    -o-transform: rotate(0deg);\n       transform: rotate(0deg);\n  }\n\n  to {\n    -o-transform: rotate(360deg);\n       transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n         -o-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n         -o-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-o-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -o-transform: translate(-50%, 6px);\n       transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -o-transform: translate(-50%, 0);\n       transform: translate(-50%, 0);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n         -o-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n         -o-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-webkit-keyframes loading-bar {\n  0% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n  }\n\n  40% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  60% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n  }\n}\n\n@-o-keyframes loading-bar {\n  0% {\n    -o-transform: translateX(-100%);\n       transform: translateX(-100%);\n  }\n\n  40% {\n    -o-transform: translateX(0);\n       transform: translateX(0);\n  }\n\n  60% {\n    -o-transform: translateX(0);\n       transform: translateX(0);\n  }\n\n  100% {\n    -o-transform: translateX(100%);\n       transform: translateX(100%);\n  }\n}\n\n@keyframes loading-bar {\n  0% {\n    -webkit-transform: translateX(-100%);\n         -o-transform: translateX(-100%);\n            transform: translateX(-100%);\n  }\n\n  40% {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  60% {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  100% {\n    -webkit-transform: translateX(100%);\n         -o-transform: translateX(100%);\n            transform: translateX(100%);\n  }\n}\n\n.header {\n  z-index: 80;\n}\n\n.header-wrap {\n  height: 55px;\n}\n\n.header-logo {\n  color: #fff !important;\n  height: 30px;\n}\n\n.header-logo img {\n  max-height: 100%;\n}\n\n.header-logo,\n.header .button-search--open,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n.header-description {\n  color: rgba(255, 255, 255, 0.8);\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 650px;\n}\n\n.not-logo .header-logo {\n  height: auto !important;\n}\n\n.follow > a {\n  padding-left: 15px;\n}\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n}\n\n.nav ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.nav li {\n  float: left;\n}\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  -webkit-transition: -webkit-transform .4s;\n  transition: -webkit-transform .4s;\n  -o-transition: -o-transform .4s;\n  transition: transform .4s;\n  transition: transform .4s, -webkit-transform .4s, -o-transform .4s;\n  width: 48px;\n}\n\n.button-nav--toggle span {\n  background-color: #BBF1B9;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  -webkit-transition: .4s;\n  -o-transition: .4s;\n  transition: .4s;\n  width: 20px;\n}\n\n.button-nav--toggle span:first-child {\n  -webkit-transform: translate(0, -6px);\n       -o-transform: translate(0, -6px);\n          transform: translate(0, -6px);\n}\n\n.button-nav--toggle span:last-child {\n  -webkit-transform: translate(0, 6px);\n       -o-transform: translate(0, 6px);\n          transform: translate(0, 6px);\n}\n\n@media only screen and (min-width: 766px) {\n  body.is-home .header-wrap {\n    height: 200px;\n  }\n\n  body.is-home .header-logo {\n    height: 50px;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed;\n  }\n\n  .header-wrap {\n    height: 50px;\n  }\n\n  .header-logo--wrap {\n    text-align: left;\n  }\n\n  .header-top {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  body.is-showNavMob .sideNav {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    -webkit-transform: rotate(90deg);\n         -o-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    -webkit-transform: rotate(45deg) translate(0, 0);\n         -o-transform: rotate(45deg) translate(0, 0);\n            transform: rotate(45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    -webkit-transform: scaleX(0);\n         -o-transform: scaleX(0);\n            transform: scaleX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    -webkit-transform: rotate(-45deg) translate(0, 0);\n         -o-transform: rotate(-45deg) translate(0, 0);\n            transform: rotate(-45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    -webkit-transform: translateX(-25%);\n         -o-transform: translateX(-25%);\n            transform: translateX(-25%);\n  }\n}\n\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px;\n}\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%;\n}\n\n.story-title {\n  letter-spacing: -.028em;\n}\n\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 4.5em;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n\n@media only screen and (min-width: 766px) {\n  .story--260 .story-wrap {\n    height: 260px;\n  }\n\n  .story--260 .story-image {\n    height: 100px;\n  }\n\n  .story--260 .story-body {\n    height: 160px;\n  }\n\n  .story--200 .story-wrap {\n    height: 260px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n\n  .story--200 .story-body {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    height: 100%;\n  }\n\n  .story--200 .story-image {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    height: 100%;\n    width: 200px;\n  }\n}\n\n.post-title {\n  line-height: 1.04;\n}\n\n.post-body a {\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(50%, rgba(0, 0, 0, 0.6)), color-stop(50%, transparent));\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px;\n}\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px;\n}\n\n.post-body ul li,\n.post-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-bottom: 14px;\n  margin-left: 30px;\n}\n\n.post-body ul li::before,\n.post-body ol li::before {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n.post-body ul li::before {\n  content: '\\2022';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px;\n}\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  display: block;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  margin-top: 40px !important;\n}\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important;\n}\n\n.kg-card-markdown > p:first-of-type::first-letter,\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.post-newsletter {\n  max-width: 520px;\n}\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n.post-related .entry-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px;\n}\n\n.post-related .entry-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n.post-related .u-card {\n  height: 250px;\n  margin-bottom: 20px;\n}\n\n.sharePost {\n  margin-left: -130px;\n  margin-top: 28px;\n  width: 45px;\n}\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n          box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transition: all 0.25s ease-in-out;\n  -o-transition: all 0.25s ease-in-out;\n  transition: all 0.25s ease-in-out;\n  z-index: 400;\n}\n\n.postActions.is-visible {\n  -webkit-transform: translateY(100%);\n       -o-transform: translateY(100%);\n          transform: translateY(100%);\n}\n\n.postActions-wrap {\n  max-width: 1200px;\n}\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px;\n  }\n\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px;\n  }\n\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px;\n  }\n\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important;\n  }\n\n  .post-body > p:first-of-type:first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px;\n  }\n\n  .post-body ol,\n  .post-body ul,\n  .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n.author-wrap {\n  z-index: 2;\n}\n\n.author-avatar {\n  height: 80px;\n  margin-right: 10px;\n  width: 80px;\n}\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author-bio {\n  max-width: 600px;\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n.author.has--image .u-accentColor--iconNormal {\n  fill: #fff;\n}\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n.author.has--image .author-follow a {\n  border: 2px solid;\n  border-color: rgba(255, 255, 255, 0.5) !important;\n  font-size: 16px;\n}\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block;\n  }\n\n  .author-header {\n    display: block;\n  }\n\n  .author-avatar {\n    margin: 0 auto 20px;\n  }\n}\n\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999;\n}\n\n.search-form {\n  max-width: 680px;\n  margin-top: 80px;\n}\n\n.search-form::before {\n  background: #eee;\n  bottom: 0;\n  content: '';\n  display: block;\n  height: 2px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n.search-form input {\n  border: none;\n  display: block;\n  line-height: 40px;\n  padding-bottom: 8px;\n}\n\n.search-form input:focus {\n  outline: 0;\n}\n\n.search-results {\n  max-height: calc(90% - 100px);\n  max-width: 680px;\n  overflow: auto;\n}\n\n.search-results a {\n  border-bottom: 1px solid #eee;\n  padding: 12px 0;\n}\n\n.search-results a:hover {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px;\n}\n\nbody.is-search {\n  overflow: hidden;\n}\n\nbody.is-search .search {\n  bottom: 0 !important;\n  height: 100%;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  transition: all .3s;\n  visibility: visible;\n}\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  -webkit-transition: 0.4s;\n  -o-transition: 0.4s;\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n@media only screen and (min-width: 766px) {\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important;\n  }\n\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff !important;\n  }\n\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -110px;\n  }\n\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 120px;\n  }\n\n  .is-article .post-header {\n    padding-top: 35px;\n  }\n\n  .is-article .post-body {\n    margin-top: 30px;\n  }\n\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px;\n  }\n}\n\n", "", {"version":3,"sources":["C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/main.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/common/_mixins.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/main.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/common/_global.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/node_modules/normalize.css/normalize.css","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/node_modules/prismjs/themes/prism.css","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/lib/_zoom.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/common/_typography.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/common/_utilities.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/components/_grid.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/components/_form.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/components/_icons.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/components/_animated.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_header.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_story-card.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_post.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_author.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_search.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_sidebar.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_sidenav.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/helper.scss"],"names":[],"mappings":"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CA,oBAAA;CRwiED;;AQtiEC;EAAI,sBAAA;CR0iEL;;AQxiEC;EACE,iBAAA;EACA,gBAAA;EACA,yBAAA;UAAA,iBAAA;EACA,2BAAA;EACA,aAAA;EACA,qBAAA;EACA,WAAA;EACA,iBAAA;EACA,yBAAA;EACA,oBAAA;CR2iEH;;AQrjEC;;;EAeI,gBAAA;EACA,0BAAA;CR4iEL;;AQxiEC;EACE,gBAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;CR2iEH;;AQxiEC;EACE,iCAAA;EACA,0BAAA;CR2iEH;;AQziEG;EACE,iCAAA;EACA,0BAAA;CR4iEL;;AQtiED;EACE,sBAAA;EACA,eAAA;CRyiED;;AQriEG;EACA,kBAAA;EACA,uBAAA;CRwiEH;;AQ3iED;EAOI,gBAAA;CRwiEH;;AQriEC;EACE,aAAA;EACA,kBAAA;CRwiEH;;AQpiED;;EAGI,aAAA;EACA,kBAAA;CRsiEH;;AQniEG;EACA,gBAAA;EACA,mBAAA;CRsiEH;;AQ/iED;EAaI,eAAA;EACA,kBAAA;CRsiEH;;AQniEG;EACA,iBAAA;CRsiEH;;AQliED;;EAEE,WAAA;CRqiED;;ASnpED;EACE,sBAAA;EACA,mCAAA;EACA,4MAAA;EAIA,oBAAA;EACA,mBAAA;CTmpED;;AS3oED;EACE,iBAAA;CT8oED;;AS5oED;EACE,iBAAA;CT+oED;;AS7oED;EACE,iBAAA;CTgpED;;AS9oED;EACE,iBAAA;CTipED;;AS/oED;EACE,iBAAA;CTkpED;;AShpED;EACE,iBAAA;CTmpED;;ASjpED;EACE,iBAAA;CTopED;;ASlpED;EACE,iBAAA;CTqpED;;ASnpED;EACE,iBAAA;CTspED;;ASppED;EACE,iBAAA;CTupED;;ASrpED;EACE,iBAAA;CTwpED;;AStpED;EACE,iBAAA;CTypED;;ASvpED;EACE,iBAAA;CT0pED;;ASxpED;EACE,iBAAA;CT2pED;;ASzpED;EACE,iBAAA;CT4pED;;AS1pED;EACE,iBAAA;CT6pED;;AS3pED;EACE,iBAAA;CT8pED;;AS5pED;EACE,iBAAA;CT+pED;;AS7pED;EACE,iBAAA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","file":"main.scss","sourcesContent":["@charset \"UTF-8\";\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none; }\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none; }\n  .link--accent:hover {\n    color: #00ab6b; }\n\n.u-absolute0, .post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.tag.not--image, .u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important; }\n\n.warning::before, .note::before, .success::before, [class^=\"i-\"]::before, [class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none; }\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc; }\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc; }\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none; } }\n\n/* Code blocks */\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto; }\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0; }\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal; }\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray; }\n\n.token.punctuation {\n  color: #999; }\n\n.namespace {\n  opacity: .7; }\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905; }\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690; }\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5); }\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a; }\n\n.token.function {\n  color: #DD4A68; }\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90; }\n\n.token.important,\n.token.bold {\n  font-weight: bold; }\n\n.token.italic {\n  font-style: italic; }\n\n.token.entity {\n  cursor: help; }\n\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in; }\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms; }\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out; }\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms; }\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1; }\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default; }\n\n*, *::before, *::after {\n  box-sizing: border-box; }\n\na {\n  color: inherit;\n  text-decoration: none; }\n  a:active, a:hover {\n    outline: 0; }\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px; }\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility; }\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px; }\n\nfigure {\n  margin: 0; }\n\nkbd, samp, code {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap; }\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal; }\n  pre code {\n    background: transparent;\n    color: #37474f;\n    padding: 0;\n    text-shadow: 0 1px #fff; }\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4; }\n  code[class*=language-] .token.comment,\n  pre[class*=language-] .token.comment {\n    opacity: .8; }\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center; }\n  hr::before {\n    color: rgba(0, 0, 0, 0.6);\n    content: '...';\n    display: inline-block;\n    font-family: \"Source Sans Pro\", sans-serif;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -25px; }\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto; }\n  img:not([src]) {\n    visibility: hidden; }\n\ni {\n  vertical-align: middle; }\n\nol, ul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8); }\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left; }\n  q:before, q:after {\n    display: none; }\n\n.link--underline:active, .link--underline:focus, .link--underline:hover {\n  color: inherit;\n  text-decoration: underline; }\n\n.main,\n.footer {\n  transition: transform .5s ease; }\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px; } }\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000; }\n  .warning::before {\n    content: \"\"; }\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1; }\n  .note::before {\n    content: \"\"; }\n\n.success {\n  background: #e0f2f1;\n  color: #00897b; }\n  .success::before {\n    color: #00bfa5;\n    content: \"\"; }\n\n.warning, .note, .success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px; }\n  .warning a, .note a, .success a {\n    color: inherit;\n    text-decoration: underline; }\n  .warning::before, .note::before, .success::before {\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n    margin-top: -5px; }\n\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2; }\n  .tag-wrap {\n    z-index: 2; }\n  .tag.not--image {\n    min-height: auto; }\n  .tag-description {\n    max-width: 500px; }\n\n.with-tooltip {\n  overflow: visible;\n  position: relative; }\n  .with-tooltip:after {\n    background: rgba(0, 0, 0, 0.85);\n    border-radius: 4px;\n    color: #FFF;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 130px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1; }\n  .with-tooltip:hover:after {\n    animation: tooltip .1s ease-out both; }\n\n.footer {\n  color: rgba(0, 0, 0, 0.44); }\n  .footer a {\n    color: rgba(0, 0, 0, 0.6); }\n    .footer a:hover {\n      color: rgba(0, 0, 0, 0.8); }\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%; }\n  .errorPage-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px; }\n  .errorPage-text {\n    margin-top: 60px;\n    white-space: pre-wrap; }\n  .errorPage-wrap {\n    color: rgba(0, 0, 0, 0.4);\n    left: 50%;\n    min-width: 680px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%); }\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative; }\n  .video-responsive iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .video-responsive video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n\n.c-facebook {\n  color: #3b5998 !important; }\n\n.bg-facebook, .sideNav-follow .i-facebook {\n  background-color: #3b5998 !important; }\n\n.c-twitter {\n  color: #55acee !important; }\n\n.bg-twitter, .sideNav-follow .i-twitter {\n  background-color: #55acee !important; }\n\n.c-google {\n  color: #dd4b39 !important; }\n\n.bg-google, .sideNav-follow .i-google {\n  background-color: #dd4b39 !important; }\n\n.c-instagram {\n  color: #306088 !important; }\n\n.bg-instagram, .sideNav-follow .i-instagram {\n  background-color: #306088 !important; }\n\n.c-youtube {\n  color: #e52d27 !important; }\n\n.bg-youtube, .sideNav-follow .i-youtube {\n  background-color: #e52d27 !important; }\n\n.c-github {\n  color: #555 !important; }\n\n.bg-github, .sideNav-follow .i-github {\n  background-color: #555 !important; }\n\n.c-linkedin {\n  color: #007bb6 !important; }\n\n.bg-linkedin, .sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important; }\n\n.c-spotify {\n  color: #2ebd59 !important; }\n\n.bg-spotify, .sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important; }\n\n.c-codepen {\n  color: #222 !important; }\n\n.bg-codepen, .sideNav-follow .i-codepen {\n  background-color: #222 !important; }\n\n.c-behance {\n  color: #131418 !important; }\n\n.bg-behance, .sideNav-follow .i-behance {\n  background-color: #131418 !important; }\n\n.c-dribbble {\n  color: #ea4c89 !important; }\n\n.bg-dribbble, .sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important; }\n\n.c-flickr {\n  color: #0063dc !important; }\n\n.bg-flickr, .sideNav-follow .i-flickr {\n  background-color: #0063dc !important; }\n\n.c-reddit {\n  color: #ff4500 !important; }\n\n.bg-reddit, .sideNav-follow .i-reddit {\n  background-color: #ff4500 !important; }\n\n.c-pocket {\n  color: #f50057 !important; }\n\n.bg-pocket, .sideNav-follow .i-pocket {\n  background-color: #f50057 !important; }\n\n.c-pinterest {\n  color: #bd081c !important; }\n\n.bg-pinterest, .sideNav-follow .i-pinterest {\n  background-color: #bd081c !important; }\n\n.c-whatsapp {\n  color: #64d448 !important; }\n\n.bg-whatsapp, .sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important; }\n\n.fbSave-dropdown {\n  background-color: #FFF;\n  border: 1px solid #e0e0e0;\n  bottom: 100%;\n  display: none;\n  max-width: 200px;\n  min-width: 100px;\n  padding: 8px;\n  transform: translate(-50%, 0);\n  z-index: 10; }\n  .fbSave-dropdown.is-visible {\n    display: block; }\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888; }\n  .rocket:hover svg path {\n    fill: rgba(0, 0, 0, 0.6); }\n\n.svgIcon {\n  display: inline-block; }\n\nsvg {\n  height: auto;\n  width: 100%; }\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center; }\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800; }\n\n.is-loading .loadingBar {\n  animation-delay: .8s;\n  animation: loading-bar 1s ease-in-out infinite;\n  display: block; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0; }\n  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,\n  .h1 a, .h2 a, .h3 a, .h4 a, .h5 a, .h6 a {\n    color: inherit;\n    line-height: inherit; }\n\nh1 {\n  font-size: 2.25rem; }\n\nh2 {\n  font-size: 1.875rem; }\n\nh3 {\n  font-size: 1.5625rem; }\n\nh4 {\n  font-size: 1.375rem; }\n\nh5 {\n  font-size: 1.125rem; }\n\nh6 {\n  font-size: 1rem; }\n\n.h1 {\n  font-size: 2.25rem; }\n\n.h2 {\n  font-size: 1.875rem; }\n\n.h3 {\n  font-size: 1.5625rem; }\n\n.h4 {\n  font-size: 1.375rem; }\n\n.h5 {\n  font-size: 1.125rem; }\n\n.h6 {\n  font-size: 1rem; }\n\np {\n  margin: 0; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0; }\n  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,\n  .h1 a, .h2 a, .h3 a, .h4 a, .h5 a, .h6 a {\n    color: inherit;\n    line-height: inherit; }\n\nh1 {\n  font-size: 2.25rem; }\n\nh2 {\n  font-size: 1.875rem; }\n\nh3 {\n  font-size: 1.5625rem; }\n\nh4 {\n  font-size: 1.375rem; }\n\nh5 {\n  font-size: 1.125rem; }\n\nh6 {\n  font-size: 1rem; }\n\n.h1 {\n  font-size: 2.25rem; }\n\n.h2 {\n  font-size: 1.875rem; }\n\n.h3 {\n  font-size: 1.5625rem; }\n\n.h4 {\n  font-size: 1.375rem; }\n\n.h5 {\n  font-size: 1.125rem; }\n\n.h6 {\n  font-size: 1rem; }\n\np {\n  margin: 0; }\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44); }\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6); }\n\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034; }\n\n.u-bgColor {\n  background-color: #00A034; }\n\n.u-headerColorLink a {\n  color: #BBF1B9; }\n  .u-headerColorLink a.active, .u-headerColorLink a:hover {\n    color: #EEFFEA; }\n\n.u-relative {\n  position: relative; }\n\n.u-absolute {\n  position: absolute; }\n\n.u-fixed {\n  position: fixed !important; }\n\n.u-block {\n  display: block !important; }\n\n.u-inlineBlock {\n  display: inline-block; }\n\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1; }\n\n.u-backgroundWhite {\n  background-color: #fafafa; }\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important; }\n\n.u-clear::before, .row::before, .u-clear::after, .row::after {\n  content: \" \";\n  display: table; }\n\n.u-clear::after, .row::after {\n  clear: both; }\n\n.u-fontSize13 {\n  font-size: 13px; }\n\n.u-fontSize14 {\n  font-size: 14px; }\n\n.u-fontSize15 {\n  font-size: 15px; }\n\n.u-fontSize20 {\n  font-size: 20px; }\n\n.u-fontSize22 {\n  font-size: 22px; }\n\n.u-fontSize28 {\n  font-size: 28px !important; }\n\n.u-fontSize36 {\n  font-size: 36px; }\n\n.u-fontSize40 {\n  font-size: 40px; }\n\n.u-fontSizeBase {\n  font-size: 18px; }\n\n.u-fontSizeJumbo {\n  font-size: 50px; }\n\n.u-fontSizeLarge {\n  font-size: 24px !important; }\n\n.u-fontSizeLarger {\n  font-size: 32px; }\n\n.u-fontSizeLargest {\n  font-size: 44px; }\n\n.u-fontSizeMicro {\n  font-size: 11px; }\n\n.u-fontSizeSmall {\n  font-size: 16px; }\n\n.u-fontSizeSmaller {\n  font-size: 14px; }\n\n.u-fontSizeSmallest {\n  font-size: 12px; }\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important; }\n  .u-md-fontSizeLarger {\n    font-size: 32px; } }\n\n.u-fontWeightThin {\n  font-weight: 300; }\n\n.u-fontWeightNormal {\n  font-weight: 400; }\n\n.u-fontWeightSemibold {\n  font-weight: 600; }\n\n.u-fontWeightBold {\n  font-weight: 700; }\n\n.u-textUppercase {\n  text-transform: uppercase; }\n\n.u-textAlignCenter {\n  text-align: center; }\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important; }\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto; }\n\n.u-marginTop20 {\n  margin-top: 20px; }\n\n.u-marginTop30 {\n  margin-top: 30px; }\n\n.u-marginBottom15 {\n  margin-bottom: 15px; }\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important; }\n\n.u-marginBottom30 {\n  margin-bottom: 30px; }\n\n.u-marginBottom40 {\n  margin-bottom: 40px; }\n\n.u-padding0 {\n  padding: 0 !important; }\n\n.u-padding20 {\n  padding: 20px; }\n\n.u-padding15 {\n  padding: 15px !important; }\n\n.u-paddingBottom2 {\n  padding-bottom: 2px; }\n\n.u-paddingBottom30 {\n  padding-bottom: 30px; }\n\n.u-paddingBottom20 {\n  padding-bottom: 20px; }\n\n.u-paddingRight10 {\n  padding-right: 10px; }\n\n.u-paddingLeft15 {\n  padding-left: 15px; }\n\n.u-paddingTop2 {\n  padding-top: 2px; }\n\n.u-paddingTop5 {\n  padding-top: 5px; }\n\n.u-paddingTop10 {\n  padding-top: 10px; }\n\n.u-paddingTop15 {\n  padding-top: 15px; }\n\n.u-paddingTop20 {\n  padding-top: 20px; }\n\n.u-paddingTop30 {\n  padding-top: 30px; }\n\n.u-paddingBottom15 {\n  padding-bottom: 15px; }\n\n.u-paddingRight20 {\n  padding-right: 20px; }\n\n.u-paddingLeft20 {\n  padding-left: 20px; }\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em; }\n\n.u-lineHeight1 {\n  line-height: 1; }\n\n.u-lineHeightTight {\n  line-height: 1.2; }\n\n.u-overflowHidden {\n  overflow: hidden; }\n\n.u-floatRight {\n  float: right; }\n\n.u-floatLeft {\n  float: left; }\n\n.u-flex {\n  display: flex; }\n\n.u-flexCenter {\n  align-items: center;\n  display: flex; }\n\n.u-flex1 {\n  flex: 1 1 auto; }\n\n.u-flex0 {\n  flex: 0 0 auto; }\n\n.u-flexWrap {\n  flex-wrap: wrap; }\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end; }\n\n.u-flexColumnTop {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start; }\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover; }\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px; }\n\n.u-maxWidth1200 {\n  max-width: 1200px; }\n\n.u-maxWidth1000 {\n  max-width: 1000px; }\n\n.u-maxWidth740 {\n  max-width: 740px; }\n\n.u-maxWidth1040 {\n  max-width: 1040px; }\n\n.u-sizeFullWidth {\n  width: 100%; }\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15); }\n\n.u-round {\n  border-radius: 50%; }\n\n.u-borderRadius2 {\n  border-radius: 2px; }\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px; }\n  .u-card--p {\n    font-family: \"Droid Serif\", serif;\n    font-style: normal;\n    font-weight: 400;\n    letter-spacing: -.004em;\n    line-height: 1.58; }\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05); }\n\n.u-height540 {\n  height: 540px; }\n\n.u-height280 {\n  height: 280px; }\n\n.u-height260 {\n  height: 260px; }\n\n.u-height100 {\n  height: 100px; }\n\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1); }\n\n.u-hide {\n  display: none !important; }\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important; }\n  .u-md-heightAuto {\n    height: auto; }\n  .u-md-height170 {\n    height: 170px; }\n  .u-md-relative {\n    position: relative; } }\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important; } }\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important; } }\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important; } }\n\n.row {\n  margin-left: -10px;\n  margin-right: -10px; }\n  .row .col {\n    float: left;\n    padding-left: 10px;\n    padding-right: 10px; }\n    .row .col.s1 {\n      width: 8.33333%; }\n    .row .col.s2 {\n      width: 16.66667%; }\n    .row .col.s3 {\n      width: 25%; }\n    .row .col.s4 {\n      width: 33.33333%; }\n    .row .col.s5 {\n      width: 41.66667%; }\n    .row .col.s6 {\n      width: 50%; }\n    .row .col.s7 {\n      width: 58.33333%; }\n    .row .col.s8 {\n      width: 66.66667%; }\n    .row .col.s9 {\n      width: 75%; }\n    .row .col.s10 {\n      width: 83.33333%; }\n    .row .col.s11 {\n      width: 91.66667%; }\n    .row .col.s12 {\n      width: 100%; }\n    @media only screen and (min-width: 766px) {\n      .row .col.m1 {\n        width: 8.33333%; }\n      .row .col.m2 {\n        width: 16.66667%; }\n      .row .col.m3 {\n        width: 25%; }\n      .row .col.m4 {\n        width: 33.33333%; }\n      .row .col.m5 {\n        width: 41.66667%; }\n      .row .col.m6 {\n        width: 50%; }\n      .row .col.m7 {\n        width: 58.33333%; }\n      .row .col.m8 {\n        width: 66.66667%; }\n      .row .col.m9 {\n        width: 75%; }\n      .row .col.m10 {\n        width: 83.33333%; }\n      .row .col.m11 {\n        width: 91.66667%; }\n      .row .col.m12 {\n        width: 100%; } }\n    @media only screen and (min-width: 1000px) {\n      .row .col.l1 {\n        width: 8.33333%; }\n      .row .col.l2 {\n        width: 16.66667%; }\n      .row .col.l3 {\n        width: 25%; }\n      .row .col.l4 {\n        width: 33.33333%; }\n      .row .col.l5 {\n        width: 41.66667%; }\n      .row .col.l6 {\n        width: 50%; }\n      .row .col.l7 {\n        width: 58.33333%; }\n      .row .col.l8 {\n        width: 66.66667%; }\n      .row .col.l9 {\n        width: 75%; }\n      .row .col.l10 {\n        width: 83.33333%; }\n      .row .col.l11 {\n        width: 91.66667%; }\n      .row .col.l12 {\n        width: 100%; } }\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap; }\n  .button i {\n    display: inline-block; }\n  .button--chromeless {\n    border-radius: 0;\n    border-width: 0;\n    box-shadow: none;\n    color: rgba(0, 0, 0, 0.44);\n    height: auto;\n    line-height: inherit;\n    padding: 0;\n    text-align: left;\n    vertical-align: baseline;\n    white-space: normal; }\n    .button--chromeless:active, .button--chromeless:hover, .button--chromeless:focus {\n      border-width: 0;\n      color: rgba(0, 0, 0, 0.6); }\n  .button--large {\n    font-size: 15px;\n    height: 44px;\n    line-height: 42px;\n    padding: 0 18px; }\n  .button--dark {\n    border-color: rgba(0, 0, 0, 0.6);\n    color: rgba(0, 0, 0, 0.6); }\n    .button--dark:hover {\n      border-color: rgba(0, 0, 0, 0.8);\n      color: rgba(0, 0, 0, 0.8); }\n\n.button--primary {\n  border-color: #00A034;\n  color: #00A034; }\n\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle; }\n\n.buttonSet > .button:last-child {\n  margin-right: 0; }\n\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px; }\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px; }\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px; }\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px; }\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0; }\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0; }\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"../fonts/simply.eot?eso605\");\n  src: url(\"../fonts/simply.eot?eso605#iefix\") format(\"embedded-opentype\"), url(\"../fonts/simply.ttf?eso605\") format(\"truetype\"), url(\"../fonts/simply.woff?eso605\") format(\"woff\"), url(\"../fonts/simply.svg?eso605#simply\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.i-telegram:before {\n  content: \"\\f2c6\"; }\n\n.i-link:before {\n  content: \"\\f0c1\"; }\n\n.i-reddit:before {\n  content: \"\\f281\"; }\n\n.i-twitter:before {\n  content: \"\\f099\"; }\n\n.i-github:before {\n  content: \"\\f09b\"; }\n\n.i-linkedin:before {\n  content: \"\\f0e1\"; }\n\n.i-code:before {\n  content: \"\\f121\"; }\n\n.i-youtube:before {\n  content: \"\\f16a\"; }\n\n.i-stack-overflow:before {\n  content: \"\\f16c\"; }\n\n.i-instagram:before {\n  content: \"\\f16d\"; }\n\n.i-flickr:before {\n  content: \"\\f16e\"; }\n\n.i-dribbble:before {\n  content: \"\\f17d\"; }\n\n.i-behance:before {\n  content: \"\\f1b4\"; }\n\n.i-spotify:before {\n  content: \"\\f1bc\"; }\n\n.i-codepen:before {\n  content: \"\\f1cb\"; }\n\n.i-facebook:before {\n  content: \"\\f230\"; }\n\n.i-pinterest:before {\n  content: \"\\f231\"; }\n\n.i-whatsapp:before {\n  content: \"\\f232\"; }\n\n.i-snapchat:before {\n  content: \"\\f2ac\"; }\n\n.i-comments:before {\n  content: \"\\e900\"; }\n\n.i-location:before {\n  content: \"\\e8b4\"; }\n\n.i-save:before {\n  content: \"\\e8e6\"; }\n\n.i-save--line:before {\n  content: \"\\e8e7\"; }\n\n.i-check-circle:before {\n  content: \"\\e86c\"; }\n\n.i-close:before {\n  content: \"\\e5cd\"; }\n\n.i-favorite:before {\n  content: \"\\e87d\"; }\n\n.i-star:before {\n  content: \"\\e838\"; }\n\n.i-warning:before {\n  content: \"\\e002\"; }\n\n.i-rss:before {\n  content: \"\\e0e5\"; }\n\n.i-search:before {\n  content: \"\\e8b6\"; }\n\n.i-send:before {\n  content: \"\\e163\"; }\n\n.i-share:before {\n  content: \"\\e80d\"; }\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both; }\n  .animated.infinite {\n    animation-iteration-count: infinite; }\n\n.bounceIn {\n  animation-name: bounceIn; }\n\n.bounceInDown {\n  animation-name: bounceInDown; }\n\n.pulse {\n  animation-name: pulse; }\n\n@keyframes bounceIn {\n  0%,\n  20%,\n  40%,\n  60%,\n  80%,\n  100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97); }\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes bounceInDown {\n  0%,\n  60%,\n  75%,\n  90%,\n  100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1); }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    transform: translate3d(0, 5px, 0); }\n  100% {\n    transform: none; } }\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1); }\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes scroll {\n  0% {\n    opacity: 0; }\n  10% {\n    opacity: 1;\n    transform: translateY(0); }\n  100% {\n    opacity: 0;\n    transform: translateY(10px); } }\n\n@keyframes opacity {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px); }\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0); } }\n\n@keyframes loading-bar {\n  0% {\n    transform: translateX(-100%); }\n  40% {\n    transform: translateX(0); }\n  60% {\n    transform: translateX(0); }\n  100% {\n    transform: translateX(100%); } }\n\n.header {\n  z-index: 80; }\n  .header-wrap {\n    height: 55px; }\n  .header-logo {\n    color: #fff !important;\n    height: 30px; }\n    .header-logo img {\n      max-height: 100%; }\n  .header-logo,\n  .header .button-search--open,\n  .header .button-nav--toggle {\n    z-index: 150; }\n  .header-description {\n    color: rgba(255, 255, 255, 0.8);\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 650px; }\n\n.not-logo .header-logo {\n  height: auto !important; }\n\n.follow > a {\n  padding-left: 15px; }\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden; }\n  .nav ul {\n    display: flex;\n    margin-right: 20px;\n    overflow: hidden;\n    white-space: nowrap; }\n  .nav li {\n    float: left; }\n    .nav li a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase; }\n\n.button-search--open {\n  padding-right: 0 !important; }\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px; }\n  .button-nav--toggle span {\n    background-color: #BBF1B9;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px; }\n    .button-nav--toggle span:first-child {\n      transform: translate(0, -6px); }\n    .button-nav--toggle span:last-child {\n      transform: translate(0, 6px); }\n\n@media only screen and (min-width: 766px) {\n  body.is-home .header-wrap {\n    height: 200px; }\n  body.is-home .header-logo {\n    height: 50px; } }\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed; }\n    .header-wrap {\n      height: 50px; }\n  .header-logo--wrap {\n    text-align: left; }\n  .header-top {\n    display: flex;\n    align-items: center; }\n  body.is-showNavMob {\n    overflow: hidden; }\n    body.is-showNavMob .sideNav {\n      transform: translateX(0); }\n    body.is-showNavMob .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg); }\n      body.is-showNavMob .button-nav--toggle span:first-child {\n        transform: rotate(45deg) translate(0, 0); }\n      body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n        transform: scaleX(0); }\n      body.is-showNavMob .button-nav--toggle span:last-child {\n        transform: rotate(-45deg) translate(0, 0); }\n    body.is-showNavMob .header .button-search--toggle {\n      display: none; }\n    body.is-showNavMob .main, body.is-showNavMob .footer {\n      transform: translateX(-25%); } }\n\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px; }\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%; }\n\n.story-title {\n  letter-spacing: -.028em; }\n\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 4.5em;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3; }\n\n@media only screen and (min-width: 766px) {\n  .story--260 .story-wrap {\n    height: 260px; }\n  .story--260 .story-image {\n    height: 100px; }\n  .story--260 .story-body {\n    height: 160px; }\n  .story--200 .story-wrap {\n    height: 260px;\n    display: flex; }\n  .story--200 .story-body {\n    flex: 1 1 auto;\n    height: 100%; }\n  .story--200 .story-image {\n    flex: 0 0 auto;\n    height: 100%;\n    width: 200px; } }\n\n.post-title {\n  line-height: 1.04; }\n\n.post-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none; }\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.post-body h1, .post-body h2, .post-body h3, .post-body h4, .post-body h5, .post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal; }\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px; }\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px; }\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px; }\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px; }\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px; }\n  .post-body ul li,\n  .post-body ol li {\n    letter-spacing: -.003em;\n    line-height: 1.58;\n    margin-bottom: 14px;\n    margin-left: 30px; }\n    .post-body ul li::before,\n    .post-body ol li::before {\n      box-sizing: border-box;\n      display: inline-block;\n      margin-left: -78px;\n      position: absolute;\n      text-align: right;\n      width: 78px; }\n\n.post-body ul li::before {\n  content: '•';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px; }\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px; }\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  display: block;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  margin-top: 40px !important; }\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important; }\n\n.kg-card-markdown > p:first-of-type::first-letter,\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase; }\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px; }\n  .post-tags a:hover {\n    background: rgba(0, 0, 0, 0.1);\n    color: rgba(0, 0, 0, 0.6); }\n\n.post-newsletter {\n  max-width: 520px; }\n  .post-newsletter .newsletter-form {\n    max-width: 400px; }\n  .post-newsletter .form-group {\n    width: 80%;\n    padding-right: 5px; }\n  .post-newsletter .form--input {\n    border: 0;\n    border-bottom: 1px solid #ccc;\n    height: 48px;\n    padding: 6px 12px 8px 5px;\n    resize: none;\n    width: 100%; }\n    .post-newsletter .form--input:focus {\n      outline: 0; }\n  .post-newsletter .form--btn {\n    background-color: #a9a9a9;\n    border-radius: 0 45px 45px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    padding: 0;\n    width: 20%; }\n    .post-newsletter .form--btn::before {\n      background-color: #a9a9a9;\n      border-radius: 0 45px 45px 0;\n      line-height: 45px;\n      z-index: 2; }\n    .post-newsletter .form--btn:hover {\n      opacity: .8; }\n    .post-newsletter .form--btn:focus {\n      outline: 0; }\n\n.post-related .entry-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px; }\n\n.post-related .entry-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important; }\n\n.post-related .u-card {\n  height: 250px;\n  margin-bottom: 20px; }\n\n.sharePost {\n  margin-left: -130px;\n  margin-top: 28px;\n  width: 45px; }\n  .sharePost a {\n    background-image: none;\n    border-radius: 5px;\n    color: #fff;\n    height: 36px;\n    line-height: 20px;\n    margin: 10px auto;\n    padding: 8px;\n    text-decoration: none;\n    width: 36px; }\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translate3d(0, 0, 0);\n  transition: all 0.25s ease-in-out;\n  z-index: 400; }\n  .postActions.is-visible {\n    transform: translateY(100%); }\n  .postActions-wrap {\n    max-width: 1200px; }\n  .postActions .separator {\n    background: rgba(0, 0, 0, 0.15);\n    height: 24px;\n    margin: 0 15px;\n    width: 1px; }\n\n.nextPost {\n  max-width: 260px; }\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px; }\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px; }\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px; }\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important; }\n  .post-body > p:first-of-type:first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px; }\n  .post-body ol, .post-body ul, .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58; } }\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px; }\n  .author-wrap {\n    z-index: 2; }\n  .author-avatar {\n    height: 80px;\n    margin-right: 10px;\n    width: 80px; }\n  .author-meta span {\n    display: inline-block;\n    font-size: 17px;\n    font-style: italic;\n    margin: 0 25px 16px 0;\n    opacity: .8;\n    word-wrap: break-word; }\n  .author-name {\n    color: rgba(0, 0, 0, 0.8); }\n  .author-bio {\n    max-width: 600px; }\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33); }\n  .author.has--image .author-link:hover {\n    opacity: 1 !important; }\n  .author.has--image .u-accentColor--iconNormal {\n    fill: #fff; }\n  .author.has--image a,\n  .author.has--image .author-name {\n    color: #fff; }\n  .author.has--image .author-follow a {\n    border: 2px solid;\n    border-color: rgba(255, 255, 255, 0.5) !important;\n    font-size: 16px; }\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block; }\n  .author-header {\n    display: block; }\n  .author-avatar {\n    margin: 0 auto 20px; } }\n\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999; }\n  .search-form {\n    max-width: 680px;\n    margin-top: 80px; }\n    .search-form::before {\n      background: #eee;\n      bottom: 0;\n      content: '';\n      display: block;\n      height: 2px;\n      left: 0;\n      position: absolute;\n      width: 100%;\n      z-index: 1; }\n    .search-form input {\n      border: none;\n      display: block;\n      line-height: 40px;\n      padding-bottom: 8px; }\n      .search-form input:focus {\n        outline: 0; }\n  .search-results {\n    max-height: calc(90% - 100px);\n    max-width: 680px;\n    overflow: auto; }\n    .search-results a {\n      border-bottom: 1px solid #eee;\n      padding: 12px 0; }\n      .search-results a:hover {\n        color: rgba(0, 0, 0, 0.44); }\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px; }\n\nbody.is-search {\n  overflow: hidden; }\n  body.is-search .search {\n    bottom: 0 !important;\n    height: 100%;\n    transition: all .3s;\n    visibility: visible; }\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px; }\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0; }\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00; }\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed; }\n\n.sidebar-post--title {\n  line-height: 1.1; }\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px; }\n  .sidebar-post--link:hover .sidebar-border {\n    background-color: #e5eff5; }\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99; }\n  .sideNav-menu a {\n    padding: 10px 20px; }\n  .sideNav-wrap {\n    background: #eee;\n    overflow: auto;\n    padding: 20px 0;\n    top: 50px; }\n  .sideNav-section {\n    border-bottom: solid 1px #ddd;\n    margin-bottom: 8px;\n    padding-bottom: 8px; }\n  .sideNav-follow {\n    border-top: 1px solid #ddd;\n    margin: 15px 0; }\n    .sideNav-follow a {\n      color: #fff;\n      display: inline-block;\n      height: 36px;\n      line-height: 20px;\n      margin: 0 5px 5px 0;\n      min-width: 36px;\n      padding: 8px;\n      text-align: center;\n      vertical-align: middle; }\n\n@media only screen and (min-width: 766px) {\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important; }\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff !important; }\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -110px; }\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 120px; }\n  .is-article .post-header {\n    padding-top: 35px; }\n  .is-article .post-body {\n    margin-top: 30px; }\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px; } }\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdHlsZXMvbWFpbi5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX3ZhcmlhYmxlcy5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX21peGlucy5zY3NzIiwibm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIm5vZGVfbW9kdWxlcy9wcmlzbWpzL3RoZW1lcy9wcmlzbS5jc3MiLCJzcmMvc3R5bGVzL2xpYi9fem9vbS5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX2dsb2JhbC5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX3R5cG9ncmFwaHkuc2NzcyIsInNyYy9zdHlsZXMvY29tbW9uL190eXBvZ3JhcGh5LnNjc3MiLCJzcmMvc3R5bGVzL2NvbW1vbi9fdXRpbGl0aWVzLnNjc3MiLCJzcmMvc3R5bGVzL2NvbXBvbmVudHMvX2dyaWQuc2NzcyIsInNyYy9zdHlsZXMvY29tcG9uZW50cy9fZm9ybS5zY3NzIiwic3JjL3N0eWxlcy9jb21wb25lbnRzL19pY29ucy5zY3NzIiwic3JjL3N0eWxlcy9jb21wb25lbnRzL19hbmltYXRlZC5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19oZWFkZXIuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fc3RvcnktY2FyZC5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19ob21lcGFnZS5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19wb3N0LnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvX2F1dGhvci5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19zZWFyY2guc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fc2lkZWJhci5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19zaWRlbmF2LnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvaGVscGVyLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuXG4vLyBNaXhpbnMgJiBWYXJpYWJsZXNcbkBpbXBvcnQgXCJjb21tb24vdmFyaWFibGVzXCI7XG5AaW1wb3J0IFwiY29tbW9uL21peGluc1wiO1xuXG4vLyBJbXBvcnQgbnBtIGRlcGVuZGVuY2llc1xuQGltcG9ydCBcIn5ub3JtYWxpemUuY3NzL25vcm1hbGl6ZVwiO1xuQGltcG9ydCBcIn5wcmlzbWpzL3RoZW1lcy9wcmlzbVwiO1xuXG4vLyBpbXBvcnQgbGliXG5AaW1wb3J0IFwibGliL3pvb21cIjtcblxuLy8gY29tbW9uXG5AaW1wb3J0IFwiY29tbW9uL2dsb2JhbFwiO1xuQGltcG9ydCBcImNvbW1vbi90eXBvZ3JhcGh5XCI7XG5AaW1wb3J0IFwiY29tbW9uL3R5cG9ncmFwaHlcIjtcbkBpbXBvcnQgXCJjb21tb24vdXRpbGl0aWVzXCI7XG5cbi8vIGNvbXBvbmVudHNcbkBpbXBvcnQgXCJjb21wb25lbnRzL2dyaWRcIjtcbkBpbXBvcnQgXCJjb21wb25lbnRzL2Zvcm1cIjtcbkBpbXBvcnQgXCJjb21wb25lbnRzL2ljb25zXCI7XG5AaW1wb3J0IFwiY29tcG9uZW50cy9hbmltYXRlZFwiO1xuXG4vL2xheW91dHNcbkBpbXBvcnQgXCJsYXlvdXRzL2hlYWRlclwiO1xuQGltcG9ydCBcImxheW91dHMvc3RvcnktY2FyZFwiO1xuQGltcG9ydCBcImxheW91dHMvaG9tZXBhZ2VcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL3Bvc3RcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL2F1dGhvclwiO1xuQGltcG9ydCBcImxheW91dHMvc2VhcmNoXCI7XG5AaW1wb3J0IFwibGF5b3V0cy9zaWRlYmFyXCI7XG5AaW1wb3J0IFwibGF5b3V0cy9zaWRlbmF2XCI7XG5AaW1wb3J0IFwibGF5b3V0cy9oZWxwZXJcIjtcbiIsIi8vIDEuIENvbG9yc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuJHByaW1hcnktY29sb3I6ICMwMEEwMzQ7XG4kcHJpbWFyeS1jb2xvci1ob3ZlcjogIzAwYWI2YjtcblxuLy8gJHByaW1hcnktY29sb3I6ICMzMzY2OGM7XG4kcHJpbWFyeS1jb2xvci1kYXJrOiAgICMxOTc2ZDI7XG5cbiRwcmltYXJ5LXRleHQtY29sb3I6ICAgcmdiYSgwLCAwLCAwLCAuOCk7XG5cblxuLy8gJHByaW1hcnktY29sb3ItbGlnaHQ6XG4vLyAkcHJpbWFyeS1jb2xvci10ZXh0OlxuLy8gJGFjY2VudC1jb2xvcjpcbi8vICRwcmltYXJ5LXRleHQtY29sb3I6XG4vLyAkc2Vjb25kYXJ5LXRleHQtY29sb3I6XG4vLyAkZGl2aWRlci1jb2xvcjpcblxuLy8gc29jaWFsIGNvbG9yc1xuJHNvY2lhbC1jb2xvcnM6IChcbiAgZmFjZWJvb2s6ICAgIzNiNTk5OCxcbiAgdHdpdHRlcjogICAgIzU1YWNlZSxcbiAgZ29vZ2xlOiAgICAgI2RkNGIzOSxcbiAgaW5zdGFncmFtOiAgIzMwNjA4OCxcbiAgeW91dHViZTogICAgI2U1MmQyNyxcbiAgZ2l0aHViOiAgICAgIzU1NSxcbiAgbGlua2VkaW46ICAgIzAwN2JiNixcbiAgc3BvdGlmeTogICAgIzJlYmQ1OSxcbiAgY29kZXBlbjogICAgIzIyMixcbiAgYmVoYW5jZTogICAgIzEzMTQxOCxcbiAgZHJpYmJibGU6ICAgI2VhNGM4OSxcbiAgZmxpY2tyOiAgICAgIzAwNjNkYyxcbiAgcmVkZGl0OiAgICAgI2ZmNDUwMCxcbiAgcG9ja2V0OiAgICAgI2Y1MDA1NyxcbiAgcGludGVyZXN0OiAgI2JkMDgxYyxcbiAgd2hhdHNhcHA6ICAgIzY0ZDQ0OCxcbik7XG5cbi8vIDIuIEZvbnRzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kcHJpbWFyeS1mb250OiAgICAnU291cmNlIFNhbnMgUHJvJywgc2Fucy1zZXJpZjsgLy8gZm9udCBkZWZhdWx0IHBhZ2UgYW5kIHRpdGxlc1xuJHNlY3VuZGFyeS1mb250OiAgJ0Ryb2lkIFNlcmlmJywgc2VyaWY7IC8vIGZvbnQgZm9yIGNvbnRlbnRcbiRjb2RlLWZvbnQ6ICAgICAgICdTb3VyY2UgQ29kZSBQcm8nLCBtb25vc3BhY2U7IC8vIGZvbnQgZm9yIGNvZGUgYW5kIHByZVxuXG4vLyAzLiBUeXBvZ3JhcGh5XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kc3BhY2VyOiAgICAgICAgICAxNnB4O1xuJGxpbmUtaGVpZ2h0OiAgICAgMS41O1xuXG4kZm9udC1zaXplLXJvb3Q6ICAxNnB4O1xuXG4kZm9udC1zaXplLWJhc2U6ICAxOHB4O1xuJGZvbnQtc2l6ZS1sZzogICAgMzJweDtcbiRmb250LXNpemUtc206ICAgIC44NzVyZW07IC8vMTRweFxuJGZvbnQtc2l6ZS14czogICAgLjgxMjU7IC8vMTNweFxuXG4kZm9udC1zaXplLWgxOiAgICAyLjI1cmVtO1xuJGZvbnQtc2l6ZS1oMjogICAgMS44NzVyZW07XG4kZm9udC1zaXplLWgzOiAgICAxLjU2MjVyZW07XG4kZm9udC1zaXplLWg0OiAgICAxLjM3NXJlbTtcbiRmb250LXNpemUtaDU6ICAgIDEuMTI1cmVtO1xuJGZvbnQtc2l6ZS1oNjogICAgMXJlbTtcblxuJGhlYWRpbmdzLW1hcmdpbi1ib3R0b206ICAgKCRzcGFjZXIgLyAyKTtcbiRoZWFkaW5ncy1mb250LWZhbWlseTogICAgICRwcmltYXJ5LWZvbnQ7XG4kaGVhZGluZ3MtZm9udC13ZWlnaHQ6ICAgICA2MDA7XG4kaGVhZGluZ3MtbGluZS1oZWlnaHQ6ICAgICAxLjE7XG4kaGVhZGluZ3MtY29sb3I6ICAgICAgICAgICBpbmhlcml0O1xuXG4kZm9udC13ZWlnaHQ6ICAgICAgICAgICAgICA2MDA7XG5cbiRibG9ja3F1b3RlLWZvbnQtc2l6ZTogICAgIDEuMTI1cmVtO1xuXG4vLyBDb250YWluZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiRncmlkLWd1dHRlci13aWR0aDogICAgICAgIDI0cHg7XG5cbiRjb250YWluZXItc206ICAgICAgICAgICAgIDU3NnB4O1xuJGNvbnRhaW5lci1tZDogICAgICAgICAgICAgNzY3cHg7XG4kY29udGFpbmVyLWxnOiAgICAgICAgICAgICA5NzBweDtcbiRjb250YWluZXIteGw6ICAgICAgICAgICAgIDEyMDBweDtcblxuLy8gSGVhZGVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuJGhlYWRlci1jb2xvcjogI0JCRjFCOTtcbiRoZWFkZXItY29sb3ItaG92ZXI6ICNFRUZGRUE7XG4kaGVhZGVyLWhlaWdodC1tb2JpbGU6IDUwcHg7XG5cbi8vIDMuIE1lZGlhIFF1ZXJ5IFJhbmdlc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuJG51bS1jb2xzOiAxMjtcbiRndXR0ZXItd2lkdGg6IDI0cHg7XG4kZWxlbWVudC10b3AtbWFyZ2luOiAkZ3V0dGVyLXdpZHRoIC8gMztcbiRlbGVtZW50LWJvdHRvbS1tYXJnaW46ICgkZ3V0dGVyLXdpZHRoICogMikgLyAzO1xuXG4vLyAzLiBNZWRpYSBRdWVyeSBSYW5nZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiRzbTogICAgICAgICAgICA2NDBweDtcbiRtZDogICAgICAgICAgICA3NjZweDtcbiRsZzogICAgICAgICAgICAxMDAwcHg7XG4keGw6ICAgICAgICAgICAgMTIzMHB4O1xuXG4kc20tYW5kLXVwOiAgICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6ICN7JHNtfSlcIjtcbiRtZC1hbmQtdXA6ICAgICBcIm9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoIDogI3skbWR9KVwiO1xuJGxnLWFuZC11cDogICAgIFwib25seSBzY3JlZW4gYW5kIChtaW4td2lkdGggOiAjeyRsZ30pXCI7XG4keGwtYW5kLXVwOiAgICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6ICN7JHhsfSlcIjtcblxuJHNtLWFuZC1kb3duOiAgIFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOiAjeyRzbX0pXCI7XG4kbWQtYW5kLWRvd246ICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6ICN7JG1kfSlcIjtcbiRsZy1hbmQtZG93bjogICBcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogI3skbGd9KVwiO1xuXG5cbi8vIENvZGUgQ29sb3JcbiRjb2RlLWJnLWNvbG9yOiAgICNmN2Y3Zjc7XG4kZm9udC1zaXplLWNvZGU6ICAxNnB4O1xuJGNvZGUtY29sb3I6ICAgICAgI2M3MjU0ZTtcbiRwcmUtY29kZS1jb2xvcjogICMzNzQ3NGY7XG5cbi8vIGljb25zXG5cbiRpLWNvZGU6IFwiXFxmMTIxXCI7XG4kaS13YXJuaW5nOiBcIlxcZTAwMlwiO1xuJGktY2hlY2s6IFwiXFxlODZjXCI7XG4kaS1zdGFyOiBcIlxcZTgzOFwiO1xuIiwiJWxpbmsge1xuICBjb2xvcjogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbiVsaW5rLS1hY2NlbnQge1xuICBjb2xvcjogJHByaW1hcnktY29sb3I7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgJjpob3ZlciB7IGNvbG9yOiAkcHJpbWFyeS1jb2xvci1ob3ZlcjsgfVxufVxuXG4lY29udGVudC1hYnNvbHV0ZS1ib3R0b20ge1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIG1hcmdpbjogMzBweDtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAyO1xufVxuXG4ldS1hYnNvbHV0ZTAge1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbn1cblxuJXUtdGV4dC1jb2xvci1kYXJrZXIge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCkgIWltcG9ydGFudDtcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAuOCkgIWltcG9ydGFudDtcbn1cblxuJWZvbnRzLWljb25zIHtcbiAgLyogdXNlICFpbXBvcnRhbnQgdG8gcHJldmVudCBpc3N1ZXMgd2l0aCBicm93c2VyIGV4dGVuc2lvbnMgdGhhdCBjaGFuZ2UgZm9udHMgKi9cbiAgZm9udC1mYW1pbHk6ICdzaW1wbHknICFpbXBvcnRhbnQ7XG4gIHNwZWFrOiBub25lO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtdmFyaWFudDogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG5cbiAgLyogQmV0dGVyIEZvbnQgUmVuZGVyaW5nID09PT09PT09PT09ICovXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xufVxuIiwiLyohIG5vcm1hbGl6ZS5jc3MgdjcuMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xuXG4vKiBEb2N1bWVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluXG4gKiAgICBJRSBvbiBXaW5kb3dzIFBob25lIGFuZCBpbiBpT1MuXG4gKi9cblxuaHRtbCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xufVxuXG4vKiBTZWN0aW9uc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMgKG9waW5pb25hdGVkKS5cbiAqL1xuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxuICovXG5cbmFydGljbGUsXG5hc2lkZSxcbmZvb3RlcixcbmhlYWRlcixcbm5hdixcbnNlY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxuICovXG5cbmgxIHtcbiAgZm9udC1zaXplOiAyZW07XG4gIG1hcmdpbjogMC42N2VtIDA7XG59XG5cbi8qIEdyb3VwaW5nIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRS5cbiAqL1xuXG5maWdjYXB0aW9uLFxuZmlndXJlLFxubWFpbiB7IC8qIDEgKi9cbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IG1hcmdpbiBpbiBJRSA4LlxuICovXG5cbmZpZ3VyZSB7XG4gIG1hcmdpbjogMWVtIDQwcHg7XG59XG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxuICovXG5cbmhyIHtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cbiAgaGVpZ2h0OiAwOyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5wcmUge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuICogMi4gUmVtb3ZlIGdhcHMgaW4gbGlua3MgdW5kZXJsaW5lIGluIGlPUyA4KyBhbmQgU2FmYXJpIDgrLlxuICovXG5cbmEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgLyogMSAqL1xuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1za2lwOiBvYmplY3RzOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny0gYW5kIEZpcmVmb3ggMzktLlxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXG59XG5cbi8qKlxuICogUHJldmVudCB0aGUgZHVwbGljYXRlIGFwcGxpY2F0aW9uIG9mIGBib2xkZXJgIGJ5IHRoZSBuZXh0IHJ1bGUgaW4gU2FmYXJpIDYuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHN0eWxlIGluIEFuZHJvaWQgNC4zLS5cbiAqL1xuXG5kZm4ge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGJhY2tncm91bmQgYW5kIGNvbG9yIGluIElFIDktLlxuICovXG5cbm1hcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwO1xuICBjb2xvcjogIzAwMDtcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zbWFsbCB7XG4gIGZvbnQtc2l6ZTogODAlO1xufVxuXG4vKipcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxuICogYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1YixcbnN1cCB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbnN1YiB7XG4gIGJvdHRvbTogLTAuMjVlbTtcbn1cblxuc3VwIHtcbiAgdG9wOiAtMC41ZW07XG59XG5cbi8qIEVtYmVkZGVkIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKi9cblxuYXVkaW8sXG52aWRlbyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBpT1MgNC03LlxuICovXG5cbmF1ZGlvOm5vdChbY29udHJvbHNdKSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGhlaWdodDogMDtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLS5cbiAqL1xuXG5pbWcge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qKlxuICogSGlkZSB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKi9cblxuc3ZnOm5vdCg6cm9vdCkge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vKiBGb3Jtc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQgeyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbixcbnNlbGVjdCB7IC8qIDEgKi9cbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG59XG5cbi8qKlxuICogMS4gUHJldmVudCBhIFdlYktpdCBidWcgd2hlcmUgKDIpIGRlc3Ryb3lzIG5hdGl2ZSBgYXVkaW9gIGFuZCBgdmlkZW9gXG4gKiAgICBjb250cm9scyBpbiBBbmRyb2lkIDQuXG4gKiAyLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmh0bWwgW3R5cGU9XCJidXR0b25cIl0sIC8qIDEgKi9cblt0eXBlPVwicmVzZXRcIl0sXG5bdHlwZT1cInN1Ym1pdFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cImJ1dHRvblwiXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPVwicmVzZXRcIl06Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cInN1Ym1pdFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLyoqXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXG4gKi9cblxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJidXR0b25cIl06LW1vei1mb2N1c3JpbmcsXG5bdHlwZT1cInJlc2V0XCJdOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJzdWJtaXRcIl06LW1vei1mb2N1c3Jpbmcge1xuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmZpZWxkc2V0IHtcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5sZWdlbmQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAzICovXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IC8qIDEgKi9cbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRS5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLS5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC0uXG4gKi9cblxuW3R5cGU9XCJjaGVja2JveFwiXSxcblt0eXBlPVwicmFkaW9cIl0ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5bdHlwZT1cIm51bWJlclwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgYW5kIGNhbmNlbCBidXR0b25zIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxuW3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUsIGFuZCBGaXJlZm94LlxuICovXG5cbmRldGFpbHMsIC8qIDEgKi9cbm1lbnUge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdW1tYXJ5IHtcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xufVxuXG4vKiBTY3JpcHRpbmdcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKi9cblxuY2FudmFzIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyogSGlkZGVuXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLS5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iLCIvKipcbiAqIHByaXNtLmpzIGRlZmF1bHQgdGhlbWUgZm9yIEphdmFTY3JpcHQsIENTUyBhbmQgSFRNTFxuICogQmFzZWQgb24gZGFiYmxldCAoaHR0cDovL2RhYmJsZXQuY29tKVxuICogQGF1dGhvciBMZWEgVmVyb3VcbiAqL1xuXG5jb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSxcbnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0ge1xuXHRjb2xvcjogYmxhY2s7XG5cdGJhY2tncm91bmQ6IG5vbmU7XG5cdHRleHQtc2hhZG93OiAwIDFweCB3aGl0ZTtcblx0Zm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sICdBbmRhbGUgTW9ubycsICdVYnVudHUgTW9ubycsIG1vbm9zcGFjZTtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0d2hpdGUtc3BhY2U6IHByZTtcblx0d29yZC1zcGFjaW5nOiBub3JtYWw7XG5cdHdvcmQtYnJlYWs6IG5vcm1hbDtcblx0d29yZC13cmFwOiBub3JtYWw7XG5cdGxpbmUtaGVpZ2h0OiAxLjU7XG5cblx0LW1vei10YWItc2l6ZTogNDtcblx0LW8tdGFiLXNpemU6IDQ7XG5cdHRhYi1zaXplOiA0O1xuXG5cdC13ZWJraXQtaHlwaGVuczogbm9uZTtcblx0LW1vei1oeXBoZW5zOiBub25lO1xuXHQtbXMtaHlwaGVuczogbm9uZTtcblx0aHlwaGVuczogbm9uZTtcbn1cblxucHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTo6LW1vei1zZWxlY3Rpb24sIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjotbW96LXNlbGVjdGlvbixcbmNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOjotbW96LXNlbGVjdGlvbiwgY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjotbW96LXNlbGVjdGlvbiB7XG5cdHRleHQtc2hhZG93OiBub25lO1xuXHRiYWNrZ3JvdW5kOiAjYjNkNGZjO1xufVxuXG5wcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOjpzZWxlY3Rpb24sIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjpzZWxlY3Rpb24sXG5jb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTo6c2VsZWN0aW9uLCBjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSA6OnNlbGVjdGlvbiB7XG5cdHRleHQtc2hhZG93OiBub25lO1xuXHRiYWNrZ3JvdW5kOiAjYjNkNGZjO1xufVxuXG5AbWVkaWEgcHJpbnQge1xuXHRjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSxcblx0cHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7XG5cdFx0dGV4dC1zaGFkb3c6IG5vbmU7XG5cdH1cbn1cblxuLyogQ29kZSBibG9ja3MgKi9cbnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0ge1xuXHRwYWRkaW5nOiAxZW07XG5cdG1hcmdpbjogLjVlbSAwO1xuXHRvdmVyZmxvdzogYXV0bztcbn1cblxuOm5vdChwcmUpID4gY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sXG5wcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0YmFja2dyb3VuZDogI2Y1ZjJmMDtcbn1cblxuLyogSW5saW5lIGNvZGUgKi9cbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0cGFkZGluZzogLjFlbTtcblx0Ym9yZGVyLXJhZGl1czogLjNlbTtcblx0d2hpdGUtc3BhY2U6IG5vcm1hbDtcbn1cblxuLnRva2VuLmNvbW1lbnQsXG4udG9rZW4ucHJvbG9nLFxuLnRva2VuLmRvY3R5cGUsXG4udG9rZW4uY2RhdGEge1xuXHRjb2xvcjogc2xhdGVncmF5O1xufVxuXG4udG9rZW4ucHVuY3R1YXRpb24ge1xuXHRjb2xvcjogIzk5OTtcbn1cblxuLm5hbWVzcGFjZSB7XG5cdG9wYWNpdHk6IC43O1xufVxuXG4udG9rZW4ucHJvcGVydHksXG4udG9rZW4udGFnLFxuLnRva2VuLmJvb2xlYW4sXG4udG9rZW4ubnVtYmVyLFxuLnRva2VuLmNvbnN0YW50LFxuLnRva2VuLnN5bWJvbCxcbi50b2tlbi5kZWxldGVkIHtcblx0Y29sb3I6ICM5MDU7XG59XG5cbi50b2tlbi5zZWxlY3Rvcixcbi50b2tlbi5hdHRyLW5hbWUsXG4udG9rZW4uc3RyaW5nLFxuLnRva2VuLmNoYXIsXG4udG9rZW4uYnVpbHRpbixcbi50b2tlbi5pbnNlcnRlZCB7XG5cdGNvbG9yOiAjNjkwO1xufVxuXG4udG9rZW4ub3BlcmF0b3IsXG4udG9rZW4uZW50aXR5LFxuLnRva2VuLnVybCxcbi5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZyxcbi5zdHlsZSAudG9rZW4uc3RyaW5nIHtcblx0Y29sb3I6ICNhNjdmNTk7XG5cdGJhY2tncm91bmQ6IGhzbGEoMCwgMCUsIDEwMCUsIC41KTtcbn1cblxuLnRva2VuLmF0cnVsZSxcbi50b2tlbi5hdHRyLXZhbHVlLFxuLnRva2VuLmtleXdvcmQge1xuXHRjb2xvcjogIzA3YTtcbn1cblxuLnRva2VuLmZ1bmN0aW9uIHtcblx0Y29sb3I6ICNERDRBNjg7XG59XG5cbi50b2tlbi5yZWdleCxcbi50b2tlbi5pbXBvcnRhbnQsXG4udG9rZW4udmFyaWFibGUge1xuXHRjb2xvcjogI2U5MDtcbn1cblxuLnRva2VuLmltcG9ydGFudCxcbi50b2tlbi5ib2xkIHtcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4udG9rZW4uaXRhbGljIHtcblx0Zm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4udG9rZW4uZW50aXR5IHtcblx0Y3Vyc29yOiBoZWxwO1xufVxuIiwiaW1nW2RhdGEtYWN0aW9uPVwiem9vbVwiXSB7XHJcbiAgY3Vyc29yOiB6b29tLWluO1xyXG59XHJcbi56b29tLWltZyxcclxuLnpvb20taW1nLXdyYXAge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB6LWluZGV4OiA2NjY7XHJcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbiAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbn1cclxuaW1nLnpvb20taW1nIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgY3Vyc29yOiAtd2Via2l0LXpvb20tb3V0O1xyXG4gIGN1cnNvcjogLW1vei16b29tLW91dDtcclxufVxyXG4uem9vbS1vdmVybGF5IHtcclxuICB6LWluZGV4OiA0MjA7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gIGZpbHRlcjogXCJhbHBoYShvcGFjaXR5PTApXCI7XHJcbiAgb3BhY2l0eTogMDtcclxuICAtd2Via2l0LXRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxuICAgICAgIC1vLXRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxuICAgICAgICAgIHRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxufVxyXG4uem9vbS1vdmVybGF5LW9wZW4gLnpvb20tb3ZlcmxheSB7XHJcbiAgZmlsdGVyOiBcImFscGhhKG9wYWNpdHk9MTAwKVwiO1xyXG4gIG9wYWNpdHk6IDE7XHJcbn1cclxuLnpvb20tb3ZlcmxheS1vcGVuLFxyXG4uem9vbS1vdmVybGF5LXRyYW5zaXRpb25pbmcge1xyXG4gIGN1cnNvcjogZGVmYXVsdDtcclxufVxyXG4iLCJcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5hIHtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblxuICAmOmFjdGl2ZSxcbiAgJjpob3ZlciB7XG4gICAgb3V0bGluZTogMDtcbiAgfVxufVxuXG5ibG9ja3F1b3RlIHtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCByZ2JhKDAsMCwwLC44KTtcbiAgZm9udC1mYW1pbHk6ICRzZWN1bmRhcnktZm9udDtcbiAgZm9udC1zaXplOiAyMXB4O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxldHRlci1zcGFjaW5nOiAtLjAwM2VtO1xuICBsaW5lLWhlaWdodDogMS41ODtcbiAgbWFyZ2luLWxlZnQ6IC0yM3B4O1xuICBwYWRkaW5nLWJvdHRvbTogMnB4O1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbmJvZHkge1xuICBjb2xvcjogJHByaW1hcnktdGV4dC1jb2xvcjtcbiAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xuICBsaW5lLWhlaWdodDogMS40O1xuICBtYXJnaW46IDAgYXV0bztcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbn1cblxuLy9EZWZhdWx0IHN0eWxlc1xuaHRtbCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1yb290O1xufVxuXG5maWd1cmUge1xuICBtYXJnaW46IDA7XG59XG5cbi8vIENvZGVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5rYmQsIHNhbXAsIGNvZGUge1xuICBiYWNrZ3JvdW5kOiAkY29kZS1iZy1jb2xvcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjb2xvcjogJGNvZGUtY29sb3I7XG4gIGZvbnQtZmFtaWx5OiAkY29kZS1mb250ICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1jb2RlO1xuICBwYWRkaW5nOiA0cHggNnB4O1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbnByZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2RlLWJnLWNvbG9yICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1mYW1pbHk6ICRjb2RlLWZvbnQgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLWNvZGU7XG4gIG1hcmdpbi10b3A6IDMwcHggIWltcG9ydGFudDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogMXJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcblxuICBjb2RlIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogJHByZS1jb2RlLWNvbG9yO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgdGV4dC1zaGFkb3c6IDAgMXB4ICNmZmY7XG4gIH1cbn1cblxuXG5jb2RlW2NsYXNzKj1sYW5ndWFnZS1dLFxucHJlW2NsYXNzKj1sYW5ndWFnZS1dIHtcbiAgY29sb3I6ICRwcmUtY29kZS1jb2xvcjtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcblxuICAudG9rZW4uY29tbWVudCB7IG9wYWNpdHk6IC44OyB9XG5cbn1cblxuXG4vLyBoclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmhyIHtcbiAgYm9yZGVyOiAwO1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiA1MHB4IGF1dG87XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICBjb250ZW50OiAnLi4uJztcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC42ZW07XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogLTI1cHg7XG4gIH1cbn1cblxuaW1nIHtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdpZHRoOiBhdXRvO1xuXG4gICY6bm90KFtzcmNdKSB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB9XG59XG5cbmkge1xuICAvLyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbm9sLCB1bCB7XG4gIGxpc3Qtc3R5bGUtaW1hZ2U6IG5vbmU7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxubWFyayB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMjE1LCAyNTMsIDIxMSwgMSksIHJnYmEoMjE1LCAyNTMsIDIxMSwgMSkpO1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCk7XG59XG5cbnEge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNDQpO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAyOHB4O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxldHRlci1zcGFjaW5nOiAtLjAxNGVtO1xuICBsaW5lLWhlaWdodDogMS40ODtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXRvcDogMTVweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcblxuICAmOmJlZm9yZSwgJjphZnRlciB7ZGlzcGxheTogbm9uZTt9XG59XG5cbi8vIExpbmtzIGNvbG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmxpbmstLWFjY2VudCB7IEBleHRlbmQgJWxpbmstLWFjY2VudDsgfVxuXG4ubGluayB7IEBleHRlbmQgJWxpbms7IH1cblxuLmxpbmstLXVuZGVybGluZSB7XG4gICY6YWN0aXZlLFxuICAmOmZvY3VzLFxuICAmOmhvdmVyIHtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxufVxuXG4vLyBBbmltYXRpb24gbWFpbiBwYWdlIGFuZCBmb290ZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ubWFpbixcbi5mb290ZXIgeyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjVzIGVhc2U7IH1cblxuQG1lZGlhICN7JG1kLWFuZC1kb3dufSB7XG4gIC5tYWluIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHBhZGRpbmctdG9wOiAkaGVhZGVyLWhlaWdodC1tb2JpbGU7XG4gIH1cbn1cblxuLy8gd2FybmluZyBzdWNjZXNzIGFuZCBOb3RlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLndhcm5pbmcge1xuICBiYWNrZ3JvdW5kOiAjZmJlOWU3O1xuICBjb2xvcjogI2Q1MDAwMDtcbiAgJjo6YmVmb3JlIHtjb250ZW50OiAkaS13YXJuaW5nO31cbn1cblxuLm5vdGUge1xuICBiYWNrZ3JvdW5kOiAjZTFmNWZlO1xuICBjb2xvcjogIzAyODhkMTtcbiAgJjo6YmVmb3JlIHtjb250ZW50OiAkaS1zdGFyO31cbn1cblxuLnN1Y2Nlc3Mge1xuICBiYWNrZ3JvdW5kOiAjZTBmMmYxO1xuICBjb2xvcjogIzAwODk3YjtcbiAgJjo6YmVmb3JlIHtjb2xvcjogIzAwYmZhNTsgY29udGVudDogJGktY2hlY2s7fVxufVxuXG4ud2FybmluZywgLm5vdGUsIC5zdWNjZXNze1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxOHB4ICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxLjU4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi10b3A6IDI4cHg7XG4gIHBhZGRpbmc6IDEycHggMjRweCAxMnB4IDYwcHg7XG5cbiAgYSB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIH1cblxuICAmOjpiZWZvcmUge1xuICAgIEBleHRlbmQgJWZvbnRzLWljb25zO1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBtYXJnaW4tbGVmdDogLTM2cHg7XG4gICAgbWFyZ2luLXRvcDogLTVweDtcbiAgfVxufVxuXG4vLyBQYWdlIFRhZ3Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4udGFnIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICB6LWluZGV4OiAyO1xuXG4gICYtd3JhcCB7ei1pbmRleDogMjt9XG5cbiAgJi5ub3QtLWltYWdlIHtcbiAgICBAZXh0ZW5kICV1LXRleHQtY29sb3ItZGFya2VyO1xuICAgIG1pbi1oZWlnaHQ6IGF1dG87XG4gIH1cblxuICAmLWRlc2NyaXB0aW9uIHtcbiAgICBtYXgtd2lkdGg6IDUwMHB4O1xuICB9XG59XG5cblxuLy8gdG9sdGlwXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLndpdGgtdG9vbHRpcCB7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuODUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBjb2xvcjogI0ZGRjtcbiAgICBjb250ZW50OiBhdHRyKGRhdGEtdG9vbHRpcCk7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBsaW5lLWhlaWdodDogMS4yNTtcbiAgICBtaW4td2lkdGg6IDEzMHB4O1xuICAgIG9wYWNpdHk6IDA7XG4gICAgcGFkZGluZzogNHB4IDhweDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIHRvcDogLTMwcHg7XG4gICAgd2lsbC1jaGFuZ2U6IG9wYWNpdHksIHRyYW5zZm9ybTtcbiAgICB6LWluZGV4OiAxO1xuICB9XG5cbiAgJjpob3ZlcjphZnRlciB7XG4gICAgYW5pbWF0aW9uOiB0b29sdGlwIC4xcyBlYXNlLW91dCBib3RoO1xuICB9XG59XG5cbi8vIEZvb3RlclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5mb290ZXIge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNDQpO1xuXG4gIGEge1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICAmOmhvdmVyIHtjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCk7fVxuICB9XG59XG5cbi8vIEVycm9yIHBhZ2Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4uZXJyb3JQYWdlIHtcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gTW9ubycsIG1vbm9zcGFjZTtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgJi1saW5rIHtcbiAgICBsZWZ0OiAtNXB4O1xuICAgIHBhZGRpbmc6IDI0cHggNjBweDtcbiAgICB0b3A6IC02cHg7XG4gIH1cblxuICAmLXRleHQge1xuICAgIG1hcmdpbi10b3A6IDYwcHg7XG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICB9XG5cbiAgJi13cmFwIHtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNCk7XG4gICAgbGVmdDogNTAlO1xuICAgIG1pbi13aWR0aDogNjgwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB9XG59XG5cblxuLy8gVmlkZW8gUmVzcG9uc2l2ZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi52aWRlby1yZXNwb25zaXZlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMDtcbiAgbWFyZ2luLXRvcDogMzBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogMCAwIDU2LjI1JTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gIGlmcmFtZSB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbGVmdDogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgdmlkZW8ge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3R0b206IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGxlZnQ6IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuXG5cbi8vIFNvY2lhbCBNZWRpYSBDb2xvclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkBlYWNoICRzb2NpYWwtbmFtZSwgJGNvbG9yIGluICRzb2NpYWwtY29sb3JzIHtcbiAgLmMtI3skc29jaWFsLW5hbWV9IHsgY29sb3I6ICRjb2xvciAhaW1wb3J0YW50O31cbiAgLmJnLSN7JHNvY2lhbC1uYW1lfSB7IGJhY2tncm91bmQtY29sb3I6ICRjb2xvciAhaW1wb3J0YW50OyB9XG59XG5cblxuLy8gRmFjZWJvb2sgU2F2ZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5mYlNhdmUge1xuICAmLWRyb3Bkb3duIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMGUwZTA7XG4gICAgYm90dG9tOiAxMDAlO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICBtaW4td2lkdGg6IDEwMHB4O1xuICAgIHBhZGRpbmc6IDhweDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAwKTtcbiAgICB6LWluZGV4OiAxMDtcblxuICAgICYuaXMtdmlzaWJsZSB7ZGlzcGxheTogYmxvY2s7IH1cbiAgfVxufVxuXG4vLyBSb2NrZXQgZm9yIHJldHVybiB0b3AgcGFnZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5yb2NrZXQge1xuICBib3R0b206IDUwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDIwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDYwcHg7XG4gIHotaW5kZXg6IDg4ODtcblxuICAmOmhvdmVyIHN2ZyBwYXRoIHtcbiAgICBmaWxsOiByZ2JhKDAsIDAsIDAsIC42KTtcbiAgfVxufVxuXG4uc3ZnSWNvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuc3ZnIHtcbiAgaGVpZ2h0OiBhdXRvO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLy8gTG9hZCBNb3JlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmxvYWRNb3JlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIG1heC13aWR0aDogMTAwMHB4O1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubG9hZGluZ0JhciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0OGU3OWE7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGhlaWdodDogMnB4O1xuICBsZWZ0OiAwO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgei1pbmRleDogODAwO1xufVxuXG4uaXMtbG9hZGluZyAubG9hZGluZ0JhciB7XG4gIGFuaW1hdGlvbi1kZWxheTogLjhzO1xuICBhbmltYXRpb246IGxvYWRpbmctYmFyIDFzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbiIsIi8vIEhlYWRpbmdzXHJcblxyXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LFxyXG4uaDEsIC5oMiwgLmgzLCAuaDQsIC5oNSwgLmg2IHtcclxuICBjb2xvcjogJGhlYWRpbmdzLWNvbG9yO1xyXG4gIGZvbnQtZmFtaWx5OiAkaGVhZGluZ3MtZm9udC1mYW1pbHk7XHJcbiAgZm9udC13ZWlnaHQ6ICRoZWFkaW5ncy1mb250LXdlaWdodDtcclxuICBsaW5lLWhlaWdodDogJGhlYWRpbmdzLWxpbmUtaGVpZ2h0O1xyXG4gIG1hcmdpbjogMDtcclxuXHJcbiAgYSB7XHJcbiAgICBjb2xvcjogaW5oZXJpdDtcclxuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gIH1cclxufVxyXG5cclxuaDEgeyBmb250LXNpemU6ICRmb250LXNpemUtaDE7IH1cclxuaDIgeyBmb250LXNpemU6ICRmb250LXNpemUtaDI7IH1cclxuaDMgeyBmb250LXNpemU6ICRmb250LXNpemUtaDM7IH1cclxuaDQgeyBmb250LXNpemU6ICRmb250LXNpemUtaDQ7IH1cclxuaDUgeyBmb250LXNpemU6ICRmb250LXNpemUtaDU7IH1cclxuaDYgeyBmb250LXNpemU6ICRmb250LXNpemUtaDY7IH1cclxuXHJcbi8vIFRoZXNlIGRlY2xhcmF0aW9ucyBhcmUga2VwdCBzZXBhcmF0ZSBmcm9tIGFuZCBwbGFjZWQgYWZ0ZXJcclxuLy8gdGhlIHByZXZpb3VzIHRhZy1iYXNlZCBkZWNsYXJhdGlvbnMgc28gdGhhdCB0aGUgY2xhc3NlcyBiZWF0IHRoZSB0YWdzIGluXHJcbi8vIHRoZSBDU1MgY2FzY2FkZSwgYW5kIHRodXMgPGgxIGNsYXNzPVwiaDJcIj4gd2lsbCBiZSBzdHlsZWQgbGlrZSBhbiBoMi5cclxuLmgxIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgxOyB9XHJcbi5oMiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMjsgfVxyXG4uaDMgeyBmb250LXNpemU6ICRmb250LXNpemUtaDM7IH1cclxuLmg0IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg0OyB9XHJcbi5oNSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNTsgfVxyXG4uaDYgeyBmb250LXNpemU6ICRmb250LXNpemUtaDY7IH1cclxuXHJcblxyXG5wIHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuIiwiLy8gSGVhZGluZ3NcclxuXHJcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsXHJcbi5oMSwgLmgyLCAuaDMsIC5oNCwgLmg1LCAuaDYge1xyXG4gIGNvbG9yOiAkaGVhZGluZ3MtY29sb3I7XHJcbiAgZm9udC1mYW1pbHk6ICRoZWFkaW5ncy1mb250LWZhbWlseTtcclxuICBmb250LXdlaWdodDogJGhlYWRpbmdzLWZvbnQtd2VpZ2h0O1xyXG4gIGxpbmUtaGVpZ2h0OiAkaGVhZGluZ3MtbGluZS1oZWlnaHQ7XHJcbiAgbWFyZ2luOiAwO1xyXG5cclxuICBhIHtcclxuICAgIGNvbG9yOiBpbmhlcml0O1xyXG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgfVxyXG59XHJcblxyXG5oMSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMTsgfVxyXG5oMiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMjsgfVxyXG5oMyB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMzsgfVxyXG5oNCB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNDsgfVxyXG5oNSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNTsgfVxyXG5oNiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNjsgfVxyXG5cclxuLy8gVGhlc2UgZGVjbGFyYXRpb25zIGFyZSBrZXB0IHNlcGFyYXRlIGZyb20gYW5kIHBsYWNlZCBhZnRlclxyXG4vLyB0aGUgcHJldmlvdXMgdGFnLWJhc2VkIGRlY2xhcmF0aW9ucyBzbyB0aGF0IHRoZSBjbGFzc2VzIGJlYXQgdGhlIHRhZ3MgaW5cclxuLy8gdGhlIENTUyBjYXNjYWRlLCBhbmQgdGh1cyA8aDEgY2xhc3M9XCJoMlwiPiB3aWxsIGJlIHN0eWxlZCBsaWtlIGFuIGgyLlxyXG4uaDEgeyBmb250LXNpemU6ICRmb250LXNpemUtaDE7IH1cclxuLmgyIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgyOyB9XHJcbi5oMyB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMzsgfVxyXG4uaDQgeyBmb250LXNpemU6ICRmb250LXNpemUtaDQ7IH1cclxuLmg1IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg1OyB9XHJcbi5oNiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNjsgfVxyXG5cclxuXHJcbnAge1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG4iLCIvLyBjb2xvclxuLnUtdGV4dENvbG9yTm9ybWFsIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAuNDQpO1xufVxuXG4udS1ob3ZlckNvbG9yTm9ybWFsOmhvdmVyIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICBmaWxsOiByZ2JhKDAsIDAsIDAsIC42KTtcbn1cblxuLnUtYWNjZW50Q29sb3ItLWljb25Ob3JtYWwge1xuICBjb2xvcjogJHByaW1hcnktY29sb3I7XG4gIGZpbGw6ICRwcmltYXJ5LWNvbG9yO1xufVxuXG4vLyAgYmFja2dyb3VuZCBjb2xvclxuLnUtYmdDb2xvciB7IGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yOyB9XG5cbi51LWhlYWRlckNvbG9yTGluayBhIHtcbiAgLy8gY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgY29sb3I6ICRoZWFkZXItY29sb3I7XG5cbiAgJi5hY3RpdmUsXG4gICY6aG92ZXIge1xuICAgIC8vIGNvbG9yOiAkaGVhZGVyLVxuICAgIGNvbG9yOiAkaGVhZGVyLWNvbG9yLWhvdmVyO1xuICB9XG59XG5cbi51LXRleHRDb2xvckRhcmtlciB7IEBleHRlbmQgJXUtdGV4dC1jb2xvci1kYXJrZXI7IH1cblxuLy8gUG9zaXRpb25zXG4udS1yZWxhdGl2ZSB7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuLnUtYWJzb2x1dGUgeyBwb3NpdGlvbjogYWJzb2x1dGU7IH1cbi51LWFic29sdXRlMCB7IEBleHRlbmQgJXUtYWJzb2x1dGUwOyB9XG4udS1maXhlZCB7IHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50OyB9XG5cbi51LWJsb2NrIHsgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudCB9XG4udS1pbmxpbmVCbG9jayB7IGRpc3BsYXk6IGlubGluZS1ibG9jayB9XG5cbi8vICBCYWNrZ3JvdW5kXG4udS1iYWNrZ3JvdW5kRGFyayB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwgMCwgMCwgLjMpIDI5JSwgcmdiYSgwLCAwLCAwLCAuNikgODElKTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG4gIHotaW5kZXg6IDE7XG59XG5cbi8vIC51LWJhY2tncm91bmQtd2hpdGUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZmVlOyB9XG4udS1iYWNrZ3JvdW5kV2hpdGUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhOyB9XG4udS1iYWNrZ3JvdW5kQ29sb3JHcmF5TGlnaHQgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwICFpbXBvcnRhbnQ7IH1cblxuLy8gQ2xlYXJcbi51LWNsZWFyIHtcbiAgJjo6YmVmb3JlLFxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogXCIgXCI7XG4gICAgZGlzcGxheTogdGFibGU7XG4gIH1cbiAgJjo6YWZ0ZXIgeyBjbGVhcjogYm90aDsgfVxufVxuXG4vLyBmb250IHNpemVcbi51LWZvbnRTaXplMTMgeyBmb250LXNpemU6IDEzcHggfVxuLnUtZm9udFNpemUxNCB7IGZvbnQtc2l6ZTogMTRweCB9XG4udS1mb250U2l6ZTE1IHsgZm9udC1zaXplOiAxNXB4IH1cbi51LWZvbnRTaXplMjAgeyBmb250LXNpemU6IDIwcHggfVxuLnUtZm9udFNpemUyMiB7IGZvbnQtc2l6ZTogMjJweCB9XG4udS1mb250U2l6ZTI4IHsgZm9udC1zaXplOiAyOHB4ICFpbXBvcnRhbnQ7IH1cbi51LWZvbnRTaXplMzYgeyBmb250LXNpemU6IDM2cHggfVxuLnUtZm9udFNpemU0MCB7IGZvbnQtc2l6ZTogNDBweCB9XG4udS1mb250U2l6ZUJhc2UgeyBmb250LXNpemU6IDE4cHggfVxuLnUtZm9udFNpemVKdW1ibyB7IGZvbnQtc2l6ZTogNTBweCB9XG4udS1mb250U2l6ZUxhcmdlIHsgZm9udC1zaXplOiAyNHB4ICFpbXBvcnRhbnQgfVxuLnUtZm9udFNpemVMYXJnZXIgeyBmb250LXNpemU6IDMycHggfVxuLnUtZm9udFNpemVMYXJnZXN0IHsgZm9udC1zaXplOiA0NHB4IH1cbi51LWZvbnRTaXplTWljcm8geyBmb250LXNpemU6IDExcHggfVxuLnUtZm9udFNpemVTbWFsbCB7IGZvbnQtc2l6ZTogMTZweCB9XG4udS1mb250U2l6ZVNtYWxsZXIgeyBmb250LXNpemU6IDE0cHggfVxuLnUtZm9udFNpemVTbWFsbGVzdCB7IGZvbnQtc2l6ZTogMTJweCB9XG5cbkBtZWRpYSAjeyRtZC1hbmQtZG93bn0ge1xuICAudS1tZC1mb250U2l6ZUJhc2UgeyBmb250LXNpemU6IDE4cHggIWltcG9ydGFudCB9XG4gIC51LW1kLWZvbnRTaXplTGFyZ2VyIHsgZm9udC1zaXplOiAzMnB4IH1cbn1cblxuLy8gQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4vLyAgIC51LXhzLWZvbnRTaXplQmFzZSB7Zm9udC1zaXplOiAxOHB4fVxuLy8gICAudS14cy1mb250U2l6ZTEzIHtmb250LXNpemU6IDEzcHh9XG4vLyAgIC51LXhzLWZvbnRTaXplU21hbGxlciB7Zm9udC1zaXplOiAxNHB4fVxuLy8gICAudS14cy1mb250U2l6ZVNtYWxsIHtmb250LXNpemU6IDE2cHh9XG4vLyAgIC51LXhzLWZvbnRTaXplMjIge2ZvbnQtc2l6ZTogMjJweH1cbi8vICAgLnUteHMtZm9udFNpemVMYXJnZSB7Zm9udC1zaXplOiAyNHB4fVxuLy8gICAudS14cy1mb250U2l6ZTQwIHtmb250LXNpemU6IDQwcHh9XG4vLyAgIC51LXhzLWZvbnRTaXplTGFyZ2VyIHtmb250LXNpemU6IDMycHh9XG4vLyAgIC51LXhzLWZvbnRTaXplU21hbGxlc3Qge2ZvbnQtc2l6ZTogMTJweH1cbi8vIH1cblxuLy8gZm9udCB3ZWlnaHRcbi51LWZvbnRXZWlnaHRUaGluIHsgZm9udC13ZWlnaHQ6IDMwMCB9XG4udS1mb250V2VpZ2h0Tm9ybWFsIHsgZm9udC13ZWlnaHQ6IDQwMCB9XG4vLyAudS1mb250V2VpZ2h0TWVkaXVtIHsgZm9udC13ZWlnaHQ6IDUwMCB9XG4udS1mb250V2VpZ2h0U2VtaWJvbGQgeyBmb250LXdlaWdodDogNjAwIH1cbi51LWZvbnRXZWlnaHRCb2xkIHsgZm9udC13ZWlnaHQ6IDcwMCB9XG5cbi51LXRleHRVcHBlcmNhc2UgeyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlIH1cbi51LXRleHRBbGlnbkNlbnRlciB7IHRleHQtYWxpZ246IGNlbnRlciB9XG5cbi51LW5vV3JhcFdpdGhFbGxpcHNpcyB7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXMgIWltcG9ydGFudDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50O1xufVxuXG4vLyBNYXJnaW5cbi51LW1hcmdpbkF1dG8geyBtYXJnaW4tbGVmdDogYXV0bzsgbWFyZ2luLXJpZ2h0OiBhdXRvOyB9XG4udS1tYXJnaW5Ub3AyMCB7IG1hcmdpbi10b3A6IDIwcHggfVxuLnUtbWFyZ2luVG9wMzAgeyBtYXJnaW4tdG9wOiAzMHB4IH1cbi51LW1hcmdpbkJvdHRvbTE1IHsgbWFyZ2luLWJvdHRvbTogMTVweCB9XG4udS1tYXJnaW5Cb3R0b20yMCB7IG1hcmdpbi1ib3R0b206IDIwcHggIWltcG9ydGFudCB9XG4udS1tYXJnaW5Cb3R0b20zMCB7IG1hcmdpbi1ib3R0b206IDMwcHggfVxuLnUtbWFyZ2luQm90dG9tNDAgeyBtYXJnaW4tYm90dG9tOiA0MHB4IH1cblxuLy8gcGFkZGluZ1xuLnUtcGFkZGluZzAgeyBwYWRkaW5nOiAwICFpbXBvcnRhbnQgfVxuLnUtcGFkZGluZzIwIHsgcGFkZGluZzogMjBweCB9XG4udS1wYWRkaW5nMTUgeyBwYWRkaW5nOiAxNXB4ICFpbXBvcnRhbnQ7IH1cbi51LXBhZGRpbmdCb3R0b20yIHsgcGFkZGluZy1ib3R0b206IDJweDsgfVxuLnUtcGFkZGluZ0JvdHRvbTMwIHsgcGFkZGluZy1ib3R0b206IDMwcHg7IH1cbi51LXBhZGRpbmdCb3R0b20yMCB7IHBhZGRpbmctYm90dG9tOiAyMHB4IH1cbi51LXBhZGRpbmdSaWdodDEwIHsgcGFkZGluZy1yaWdodDogMTBweCB9XG4udS1wYWRkaW5nTGVmdDE1IHsgcGFkZGluZy1sZWZ0OiAxNXB4IH1cblxuLnUtcGFkZGluZ1RvcDIgeyBwYWRkaW5nLXRvcDogMnB4IH1cbi51LXBhZGRpbmdUb3A1IHsgcGFkZGluZy10b3A6IDVweDsgfVxuLnUtcGFkZGluZ1RvcDEwIHsgcGFkZGluZy10b3A6IDEwcHg7IH1cbi51LXBhZGRpbmdUb3AxNSB7IHBhZGRpbmctdG9wOiAxNXB4OyB9XG4udS1wYWRkaW5nVG9wMjAgeyBwYWRkaW5nLXRvcDogMjBweDsgfVxuLnUtcGFkZGluZ1RvcDMwIHsgcGFkZGluZy10b3A6IDMwcHg7IH1cblxuLnUtcGFkZGluZ0JvdHRvbTE1IHsgcGFkZGluZy1ib3R0b206IDE1cHg7IH1cblxuLnUtcGFkZGluZ1JpZ2h0MjAgeyBwYWRkaW5nLXJpZ2h0OiAyMHB4IH1cbi51LXBhZGRpbmdMZWZ0MjAgeyBwYWRkaW5nLWxlZnQ6IDIwcHggfVxuXG4udS1jb250ZW50VGl0bGUge1xuICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogLS4wMjhlbTtcbn1cblxuLy8gbGluZS1oZWlnaHRcbi51LWxpbmVIZWlnaHQxIHsgbGluZS1oZWlnaHQ6IDE7IH1cbi51LWxpbmVIZWlnaHRUaWdodCB7IGxpbmUtaGVpZ2h0OiAxLjIgfVxuXG4vLyBvdmVyZmxvd1xuLnUtb3ZlcmZsb3dIaWRkZW4geyBvdmVyZmxvdzogaGlkZGVuIH1cblxuLy8gZmxvYXRcbi51LWZsb2F0UmlnaHQgeyBmbG9hdDogcmlnaHQ7IH1cbi51LWZsb2F0TGVmdCB7IGZsb2F0OiBsZWZ0OyB9XG5cbi8vICBmbGV4XG4udS1mbGV4IHsgZGlzcGxheTogZmxleDsgfVxuLnUtZmxleENlbnRlciB7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGRpc3BsYXk6IGZsZXg7IH1cbi8vIC51LWZsZXgtLTEgeyBmbGV4OiAxIH1cbi51LWZsZXgxIHsgZmxleDogMSAxIGF1dG87IH1cbi51LWZsZXgwIHsgZmxleDogMCAwIGF1dG87IH1cbi51LWZsZXhXcmFwIHsgZmxleC13cmFwOiB3cmFwIH1cblxuLnUtZmxleENvbHVtbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4udS1mbGV4RW5kIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLnUtZmxleENvbHVtblRvcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbn1cblxuLy8gQmFja2dyb3VuZFxuLnUtYmFja2dyb3VuZFNpemVDb3ZlciB7XG4gIGJhY2tncm91bmQtb3JpZ2luOiBib3JkZXItYm94O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG5cbi8vIG1heCB3aWRodFxuLnUtY29udGFpbmVyIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xufVxuXG4udS1tYXhXaWR0aDEyMDAgeyBtYXgtd2lkdGg6IDEyMDBweCB9XG4udS1tYXhXaWR0aDEwMDAgeyBtYXgtd2lkdGg6IDEwMDBweCB9XG4udS1tYXhXaWR0aDc0MCB7IG1heC13aWR0aDogNzQwcHggfVxuLnUtbWF4V2lkdGgxMDQwIHsgbWF4LXdpZHRoOiAxMDQwcHggfVxuLnUtc2l6ZUZ1bGxXaWR0aCB7IHdpZHRoOiAxMDAlIH1cblxuLy8gYm9yZGVyXG4udS1ib3JkZXJMaWdodGVyIHsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMTUpOyB9XG4udS1yb3VuZCB7IGJvcmRlci1yYWRpdXM6IDUwJSB9XG4udS1ib3JkZXJSYWRpdXMyIHsgYm9yZGVyLXJhZGl1czogMnB4IH1cblxuLy8gY2FyZFxuLnUtY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjA5KTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBib3gtc2hhZG93OiAwIDFweCA0cHggcmdiYSgwLCAwLCAwLCAuMDQpO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBwYWRkaW5nOiAxMHB4IDIwcHggMTVweDtcblxuICAmLS1wIHtcbiAgICBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250O1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAwNGVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU4O1xuICB9XG59XG5cbi51LWJveFNoYWRvd0JvdHRvbSB7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDJweCAtMnB4IHJnYmEoMCwgMCwgMCwgLjA1KTtcbn1cblxuLy8gSGVpbmdodFxuLnUtaGVpZ2h0NTQwIHsgaGVpZ2h0OiA1NDBweCB9XG4udS1oZWlnaHQyODAgeyBoZWlnaHQ6IDI4MHB4IH1cbi51LWhlaWdodDI2MCB7IGhlaWdodDogMjYwcHggfVxuLnUtaGVpZ2h0MTAwIHsgaGVpZ2h0OiAxMDBweCB9XG4udS1ib3JkZXJCbGFja0xpZ2h0ZXN0IHsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMSkgfVxuXG4vLyBoaWRlIGdsb2JhbFxuLnUtaGlkZSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9XG5cbkBtZWRpYSAjeyRtZC1hbmQtZG93bn0ge1xuICAudS1oaWRlLWJlZm9yZS1tZCB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9XG4gIC51LW1kLWhlaWdodEF1dG8geyBoZWlnaHQ6IGF1dG87IH1cbiAgLnUtbWQtaGVpZ2h0MTcwIHsgaGVpZ2h0OiAxNzBweCB9XG4gIC51LW1kLXJlbGF0aXZlIHsgcG9zaXRpb246IHJlbGF0aXZlIH1cbn1cblxuQG1lZGlhICN7JGxnLWFuZC1kb3dufSB7IC51LWhpZGUtYmVmb3JlLWxnIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50IH0gfVxuXG4vLyBoaWRlIGFmdGVyXG5AbWVkaWEgI3skbWQtYW5kLXVwfSB7IC51LWhpZGUtYWZ0ZXItbWQgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQgfSB9XG5cbkBtZWRpYSAjeyRsZy1hbmQtdXB9IHsgLnUtaGlkZS1hZnRlci1sZyB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9IH1cbiIsIi8vIEBtZWRpYSAjeyRsZy1hbmQtdXB9IHtcbi8vICAgLmNvbnRlbnQge1xuLy8gICAgIGZsZXg6IDEgIWltcG9ydGFudDtcbi8vICAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDM0MHB4KSAhaW1wb3J0YW50O1xuLy8gICAgIG9yZGVyOiAxO1xuLy8gICAgIC8vIG92ZXJmbG93OiBoaWRkZW47XG4vLyAgIH1cbi8vICAgLnNpZGViYXIge1xuLy8gICAgIGZsZXg6IDAgMCAzNDBweCAhaW1wb3J0YW50O1xuLy8gICAgIG9yZGVyOiAyO1xuLy8gICB9XG4vLyB9XG5cbi5yb3cge1xuICBtYXJnaW4tbGVmdDogLSAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IC0gMTBweDtcblxuICBAZXh0ZW5kIC51LWNsZWFyO1xuXG4gIC5jb2wge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuXG4gICAgJGk6IDE7XG5cbiAgICBAd2hpbGUgJGkgPD0gJG51bS1jb2xzIHtcbiAgICAgICRwZXJjOiB1bnF1b3RlKCgxMDAgLyAoJG51bS1jb2xzIC8gJGkpKSArIFwiJVwiKTtcblxuICAgICAgJi5zI3skaX0ge1xuICAgICAgICB3aWR0aDogJHBlcmM7XG4gICAgICB9XG5cbiAgICAgICRpOiAkaSArIDE7XG4gICAgfVxuXG4gICAgQG1lZGlhICN7JG1kLWFuZC11cH0ge1xuXG4gICAgICAkaTogMTtcblxuICAgICAgQHdoaWxlICRpIDw9ICRudW0tY29scyB7XG4gICAgICAgICRwZXJjOiB1bnF1b3RlKCgxMDAgLyAoJG51bS1jb2xzIC8gJGkpKSArIFwiJVwiKTtcblxuICAgICAgICAmLm0jeyRpfSB7XG4gICAgICAgICAgd2lkdGg6ICRwZXJjO1xuICAgICAgICB9XG5cbiAgICAgICAgJGk6ICRpICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgI3skbGctYW5kLXVwfSB7XG5cbiAgICAgICRpOiAxO1xuXG4gICAgICBAd2hpbGUgJGkgPD0gJG51bS1jb2xzIHtcbiAgICAgICAgJHBlcmM6IHVucXVvdGUoKDEwMCAvICgkbnVtLWNvbHMgLyAkaSkpICsgXCIlXCIpO1xuXG4gICAgICAgICYubCN7JGl9IHtcbiAgICAgICAgICB3aWR0aDogJHBlcmM7XG4gICAgICAgIH1cblxuICAgICAgICAkaTogJGkgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLmJ1dHRvbiB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC4xNSk7XHJcbiAgYm9yZGVyLXJhZGl1czogOTk5ZW07XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNDQpO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG4gIGhlaWdodDogMzdweDtcclxuICBsZXR0ZXItc3BhY2luZzogMDtcclxuICBsaW5lLWhlaWdodDogMzVweDtcclxuICBwYWRkaW5nOiAwIDE2cHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcclxuICB1c2VyLXNlbGVjdDogbm9uZTtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcblxyXG4gIGkgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cclxuXHJcbiAgJi0tY2hyb21lbGVzcyB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAwO1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuXHJcbiAgICAmOmFjdGl2ZSxcclxuICAgICY6aG92ZXIsXHJcbiAgICAmOmZvY3VzIHtcclxuICAgICAgYm9yZGVyLXdpZHRoOiAwO1xyXG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmLS1sYXJnZSB7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBoZWlnaHQ6IDQ0cHg7XHJcbiAgICBsaW5lLWhlaWdodDogNDJweDtcclxuICAgIHBhZGRpbmc6IDAgMThweDtcclxuICB9XHJcblxyXG4gICYtLWRhcmsge1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcclxuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC44KTtcclxuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUHJpbWFyeVxyXG4uYnV0dG9uLS1wcmltYXJ5IHtcclxuICBib3JkZXItY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xyXG4gIGNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcclxufVxyXG5cclxuLmJ1dHRvblNldCB7XHJcbiAgPiAuYnV0dG9uIHtcclxuICAgIG1hcmdpbi1yaWdodDogOHB4O1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICB9XHJcblxyXG4gID4gLmJ1dHRvbjpsYXN0LWNoaWxkIHtcclxuICAgIG1hcmdpbi1yaWdodDogMDtcclxuICB9XHJcblxyXG4gIC5idXR0b24tLWNocm9tZWxlc3Mge1xyXG4gICAgaGVpZ2h0OiAzN3B4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDM1cHg7XHJcbiAgfVxyXG59XHJcblxyXG4uYnV0dG9uU2V0IHtcclxuICAuYnV0dG9uLS1sYXJnZS5idXR0b24tLWNocm9tZWxlc3MsXHJcbiAgLmJ1dHRvbi0tbGFyZ2UuYnV0dG9uLS1saW5rIHtcclxuICAgIGhlaWdodDogNDRweDtcclxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xyXG4gIH1cclxuXHJcbiAgJj4uYnV0dG9uLS1jaHJvbWVsZXNzOm5vdCguYnV0dG9uLS1jaXJjbGUpIHtcclxuICAgIG1hcmdpbi1yaWdodDogMDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcclxuICB9XHJcblxyXG4gICY+LmJ1dHRvbi0tY2hyb21lbGVzcysuYnV0dG9uLS1jaHJvbWVsZXNzOm5vdCguYnV0dG9uLS1jaXJjbGUpIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gICAgcGFkZGluZy1sZWZ0OiA4cHg7XHJcbiAgfVxyXG5cclxuICAmPi5idXR0b24tLWNocm9tZWxlc3M6bGFzdC1jaGlsZCB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG4gIH1cclxufVxyXG5cclxuLmJ1dHRvbi0tbGFyZ2UuYnV0dG9uLS1jaHJvbWVsZXNzLFxyXG4uYnV0dG9uLS1sYXJnZS5idXR0b24tLWxpbmsge1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbiIsIkBmb250LWZhY2Uge1xyXG4gIGZvbnQtZmFtaWx5OiAnc2ltcGx5JztcclxuICBzcmM6ICB1cmwoJy4uL2ZvbnRzL3NpbXBseS5lb3Q/ZXNvNjA1Jyk7XHJcbiAgc3JjOiAgdXJsKCcuLi9mb250cy9zaW1wbHkuZW90P2VzbzYwNSNpZWZpeCcpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcclxuICAgIHVybCgnLi4vZm9udHMvc2ltcGx5LnR0Zj9lc282MDUnKSBmb3JtYXQoJ3RydWV0eXBlJyksXHJcbiAgICB1cmwoJy4uL2ZvbnRzL3NpbXBseS53b2ZmP2VzbzYwNScpIGZvcm1hdCgnd29mZicpLFxyXG4gICAgdXJsKCcuLi9mb250cy9zaW1wbHkuc3ZnP2VzbzYwNSNzaW1wbHknKSBmb3JtYXQoJ3N2ZycpO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG59XHJcblxyXG5bY2xhc3NePVwiaS1cIl06OmJlZm9yZSwgW2NsYXNzKj1cIiBpLVwiXTo6YmVmb3JlIHtcclxuICBAZXh0ZW5kICVmb250cy1pY29ucztcclxufVxyXG5cclxuXHJcbi5pLXRlbGVncmFtOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYyYzZcIjtcclxufVxyXG4uaS1saW5rOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYwYzFcIjtcclxufVxyXG4uaS1yZWRkaXQ6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjI4MVwiO1xyXG59XHJcbi5pLXR3aXR0ZXI6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjA5OVwiO1xyXG59XHJcbi5pLWdpdGh1YjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMDliXCI7XHJcbn1cclxuLmktbGlua2VkaW46YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjBlMVwiO1xyXG59XHJcbi5pLWNvZGU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjEyMVwiO1xyXG59XHJcbi5pLXlvdXR1YmU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjE2YVwiO1xyXG59XHJcbi5pLXN0YWNrLW92ZXJmbG93OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxNmNcIjtcclxufVxyXG4uaS1pbnN0YWdyYW06YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjE2ZFwiO1xyXG59XHJcbi5pLWZsaWNrcjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTZlXCI7XHJcbn1cclxuLmktZHJpYmJibGU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjE3ZFwiO1xyXG59XHJcbi5pLWJlaGFuY2U6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjFiNFwiO1xyXG59XHJcbi5pLXNwb3RpZnk6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjFiY1wiO1xyXG59XHJcbi5pLWNvZGVwZW46YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjFjYlwiO1xyXG59XHJcbi5pLWZhY2Vib29rOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYyMzBcIjtcclxufVxyXG4uaS1waW50ZXJlc3Q6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjIzMVwiO1xyXG59XHJcbi5pLXdoYXRzYXBwOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYyMzJcIjtcclxufVxyXG4uaS1zbmFwY2hhdDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMmFjXCI7XHJcbn1cclxuLmktY29tbWVudHM6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTkwMFwiO1xyXG59XHJcbi5pLWxvY2F0aW9uOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4YjRcIjtcclxufVxyXG4uaS1zYXZlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4ZTZcIjtcclxufVxyXG4uaS1zYXZlLS1saW5lOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4ZTdcIjtcclxufVxyXG4uaS1jaGVjay1jaXJjbGU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTg2Y1wiO1xyXG59XHJcbi5pLWNsb3NlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU1Y2RcIjtcclxufVxyXG4uaS1mYXZvcml0ZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlODdkXCI7XHJcbn1cclxuLmktc3RhcjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlODM4XCI7XHJcbn1cclxuLmktd2FybmluZzpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlMDAyXCI7XHJcbn1cclxuLmktcnNzOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGUwZTVcIjtcclxufVxyXG4uaS1zZWFyY2g6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZThiNlwiO1xyXG59XHJcbi5pLXNlbmQ6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTE2M1wiO1xyXG59XHJcbi5pLXNoYXJlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4MGRcIjtcclxufVxyXG4iLCIvLyBhbmltYXRlZCBHbG9iYWxcclxuLmFuaW1hdGVkIHtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xyXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XHJcblxyXG4gICYuaW5maW5pdGUge1xyXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBhbmltYXRlZCBBbGxcclxuLmJvdW5jZUluIHsgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluO31cclxuLmJvdW5jZUluRG93biB7IGFuaW1hdGlvbi1uYW1lOiBib3VuY2VJbkRvd247fVxyXG4ucHVsc2UgeyBhbmltYXRpb24tbmFtZTogcHVsc2U7IH1cclxuXHJcbi8vIGFsbCBrZXlmcmFtZXMgQW5pbWF0ZXNcclxuLy8gYm91bmNlSW5cclxuQGtleWZyYW1lcyBib3VuY2VJbiB7XHJcbiAgMCUsXHJcbiAgMjAlLFxyXG4gIDQwJSxcclxuICA2MCUsXHJcbiAgODAlLFxyXG4gIDEwMCUgeyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoLjIxNSwgLjYxMCwgLjM1NSwgMSk7fVxyXG4gIDAlIHtvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHNjYWxlM2QoLjMsIC4zLCAuMyk7fVxyXG4gIDIwJSB7IHRyYW5zZm9ybTogc2NhbGUzZCgxLjEsIDEuMSwgMS4xKTt9XHJcbiAgNDAlIHsgdHJhbnNmb3JtOiBzY2FsZTNkKC45LCAuOSwgLjkpOyB9XHJcbiAgNjAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpOyB9XHJcbiAgODAlIHsgdHJhbnNmb3JtOiBzY2FsZTNkKC45NywgLjk3LCAuOTcpOyB9XHJcbiAgMTAwJSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfVxyXG59XHJcblxyXG47XHJcbi8vIGJvdW5jZUluRG93blxyXG5Aa2V5ZnJhbWVzIGJvdW5jZUluRG93biB7XHJcbiAgMCUsXHJcbiAgNjAlLFxyXG4gIDc1JSxcclxuICA5MCUsXHJcbiAgMTAwJSB7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigyMTUsIDYxMCwgMzU1LCAxKTsgfVxyXG4gIDAlIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMzAwMHB4LCAwKTsgfVxyXG4gIDYwJSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMjVweCwgMCk7fVxyXG4gIDc1JSB7dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMTBweCwgMCk7fVxyXG4gIDkwJSB7dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCA1cHgsIDApO31cclxuICAxMDAlIHt0cmFuc2Zvcm06IG5vbmU7fVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHB1bHNlIHtcclxuICBmcm9tIHsgdHJhbnNmb3JtOiBzY2FsZTNkKDEsIDEsIDEpO31cclxuICA1MCUge3RyYW5zZm9ybTogc2NhbGUzZCgxLjIsIDEuMiwgMS4yKTt9XHJcbiAgdG8ge3RyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfVxyXG59XHJcblxyXG5cclxuQGtleWZyYW1lcyBzY3JvbGwge1xyXG4gIDAlIHtvcGFjaXR5OiAwO31cclxuICAxMCUge29wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKX1cclxuICAxMDAlIHtvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7fVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIG9wYWNpdHkge1xyXG4gIDAlIHtvcGFjaXR5OiAwO31cclxuICA1MCUge29wYWNpdHk6IDA7fVxyXG4gIDEwMCUge29wYWNpdHk6IDE7fVxyXG59XHJcblxyXG4vLyAgc3BpbiBmb3IgcGFnaW5hdGlvblxyXG5Aa2V5ZnJhbWVzIHNwaW4ge1xyXG4gIGZyb20ge3RyYW5zZm9ybTogcm90YXRlKDBkZWcpO31cclxuICB0byB7dHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTt9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgdG9vbHRpcCB7XHJcbiAgMCUge29wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDZweCk7fVxyXG4gIDEwMCUge29wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO31cclxufVxyXG5cclxuQGtleWZyYW1lcyBsb2FkaW5nLWJhciB7XHJcbiAgMCUge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSl9XHJcbiAgNDAlIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCl9XHJcbiAgNjAlIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCl9XHJcbiAgMTAwJSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpfVxyXG59XHJcbiIsIi8vIEhlYWRlclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLmhlYWRlciB7XG4gIHotaW5kZXg6IDgwO1xuXG4gICYtd3JhcCB7IGhlaWdodDogNTVweDsgfVxuXG4gICYtbG9nbyB7XG4gICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDMwcHg7XG5cbiAgICBpbWcgeyBtYXgtaGVpZ2h0OiAxMDAlOyB9XG4gIH1cblxuICAmLWxvZ28sXG4gIC5idXR0b24tc2VhcmNoLS1vcGVuLFxuICAuYnV0dG9uLW5hdi0tdG9nZ2xlIHsgei1pbmRleDogMTUwOyB9XG5cbiAgLy8gaGVhZGVyIGRlc2NyaXB0aW9uIGhvbWUgcGFnZVxuICAmLWRlc2NyaXB0aW9uIHtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBtYXgtd2lkdGg6IDY1MHB4O1xuICB9XG59XG5cbi8vIG5vdCBoYXZlIGxvZ29cbi5ub3QtbG9nbyAuaGVhZGVyLWxvZ28geyBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudCB9XG5cbi8vIEhlYWRlciBGb2xsb3dcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi5mb2xsb3cgPiBhIHsgcGFkZGluZy1sZWZ0OiAxNXB4IH1cblxuLy8gSGVhZGVyIG1lbnVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi5uYXYge1xuICBwYWRkaW5nLXRvcDogOHB4O1xuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgdWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuXG4gIGxpIHtcbiAgICBmbG9hdDogbGVmdDtcblxuICAgIGEge1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbi1yaWdodDogMjJweDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgfVxuICB9XG59XG5cbi5idXR0b24tc2VhcmNoLS1vcGVuIHtcbiAgcGFkZGluZy1yaWdodDogMCAhaW1wb3J0YW50O1xufVxuXG4vLyBidXR0b24tbmF2XG4uYnV0dG9uLW5hdi0tdG9nZ2xlIHtcbiAgaGVpZ2h0OiA0OHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNHM7XG4gIHdpZHRoOiA0OHB4O1xuXG4gIHNwYW4ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRoZWFkZXItY29sb3I7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgaGVpZ2h0OiAycHg7XG4gICAgbGVmdDogMTRweDtcbiAgICBtYXJnaW4tdG9wOiAtMXB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2l0aW9uOiAuNHM7XG4gICAgd2lkdGg6IDIwcHg7XG5cbiAgICAmOmZpcnN0LWNoaWxkIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTZweCk7IH1cbiAgICAmOmxhc3QtY2hpbGQgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA2cHgpOyB9XG4gIH1cbn1cblxuLy8gTWVkaWEgUXVlcnlcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbkBtZWRpYSAjeyRtZC1hbmQtdXB9IHtcbiAgYm9keS5pcy1ob21lIHtcbiAgICAuaGVhZGVyIHtcbiAgICAgICYtd3JhcCB7IGhlaWdodDogMjAwcHg7IH1cblxuICAgICAgJi1sb2dvIHtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIE1haW4gTWVudSBGaXhlZFxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyAubWFpbk1lbnUtLWFmZml4ZWQge1xuICAvLyAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgLy8gICB0b3A6IDA7XG4gIC8vIH1cbn1cblxuLy8gSGVhZGVyIG1lbnVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcbiAgLmhlYWRlciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuXG4gICAgJi13cmFwIHsgaGVpZ2h0OiAkaGVhZGVyLWhlaWdodC1tb2JpbGUgfVxuICB9XG5cbiAgLmhlYWRlci1sb2dvLS13cmFwIHsgdGV4dC1hbGlnbjogbGVmdCB9XG5cbiAgLmhlYWRlci10b3Age1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC8vIHNob3cgbWVudSBtb2JpbGVcbiAgYm9keS5pcy1zaG93TmF2TW9iIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgLnNpZGVOYXYgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH1cblxuICAgIC5idXR0b24tbmF2LS10b2dnbGUge1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuXG4gICAgICBzcGFuOmZpcnN0LWNoaWxkIHsgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpIHRyYW5zbGF0ZSgwLCAwKTsgfVxuICAgICAgc3BhbjpudGgtY2hpbGQoMikgeyB0cmFuc2Zvcm06IHNjYWxlWCgwKTsgfVxuICAgICAgc3BhbjpsYXN0LWNoaWxkIHsgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKSB0cmFuc2xhdGUoMCwgMCk7IH1cbiAgICB9XG5cbiAgICAuaGVhZGVyIC5idXR0b24tc2VhcmNoLS10b2dnbGUgeyBkaXNwbGF5OiBub25lOyB9XG4gICAgLm1haW4sIC5mb290ZXIgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1JSk7IH1cbiAgfVxufVxuIiwiLmF2YXRhci1pbWFnZS0tc21hbGxlciB7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG59XG5cbi5hdmF0YXItaW1hZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG59XG5cbi5zdG9yeSB7XG4gICYtdGl0bGUgeyBsZXR0ZXItc3BhY2luZzogLS4wMjhlbTsgfVxuXG4gICYtZXhjZXJwdCB7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIG1heC1oZWlnaHQ6IDQuNWVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAgIC13ZWJraXQtbGluZS1jbGFtcDogMztcbiAgfVxufVxuXG4vLyAgbWVkaWEgUXVlcnlcbkBtZWRpYSAjeyRtZC1hbmQtdXB9IHtcbiAgLnN0b3J5LS0yNjAge1xuICAgIC5zdG9yeS13cmFwIHsgaGVpZ2h0OiAyNjBweCB9XG4gICAgLnN0b3J5LWltYWdlIHsgaGVpZ2h0OiAxMDBweCB9XG5cbiAgICAuc3RvcnktYm9keSB7XG4gICAgICBoZWlnaHQ6IDE2MHB4O1xuICAgIH1cbiAgfVxuXG4gIC5zdG9yeS0tMjAwIHtcbiAgICAuc3Rvcnktd3JhcCB7IGhlaWdodDogMjYwcHg7IGRpc3BsYXk6IGZsZXggfVxuXG4gICAgLnN0b3J5LWJvZHkge1xuICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuXG4gICAgLnN0b3J5LWltYWdlIHtcbiAgICAgIGZsZXg6IDAgMCBhdXRvO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgd2lkdGg6IDIwMHB4O1xuICAgIH1cbiAgfVxufVxuIiwiLy8gSG9tZSBQYWdlIFN0eWxlc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gLmhvbWVQYWdlIHtcbi8vICAgLmVudHJ5IHtcbi8vICAgICAudS1iYWNrZ3JvdW5kRGFyayB7IGRpc3BsYXk6IG5vbmU7IH1cbi8vICAgICAmLWltYWdlIHsgaGVpZ2h0OiAxNzJweDsgfVxuLy8gICB9XG4vLyB9XG5cblxuLy8gQG1lZGlhICN7JG1kLWFuZC11cH0ge1xuLy8gICAuaG9tZVBhZ2Uge1xuLy8gICAgIC5lbnRyeSB7XG4vLyAgICAgICAmLWltYWdlIHsgaGVpZ2h0OiAxNzRweDsgfVxuXG4vLyAgICAgICAmLmVudHJ5MSxcbi8vICAgICAgICYuZW50cnk3IHtcbi8vICAgICAgICAgZmxleC1iYXNpczogMTAwJTtcbi8vICAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICAvLyBmaXJzdCBwb3N0IHdpdGggaW1nIDY2JVxuLy8gICAgICAgJi5lbnRyeTEge1xuLy8gICAgICAgICBkaXNwbGF5OiBmbGV4O1xuXG4vLyAgICAgICAgIC5lbnRyeS1pbWFnZSB7XG4vLyAgICAgICAgICAgaGVpZ2h0OiAzNTBweDtcbi8vICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4vLyAgICAgICAgICAgd2lkdGg6IDY2LjY2NjY2NjY3JSAhaW1wb3J0YW50O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIC5lbnRyeS10aXRsZSB7Zm9udC1zaXplOiAzNnB4ICFpbXBvcnRhbnR9XG4vLyAgICAgICAgIC5lbnRyeS1ib2R5IHtcbi8vICAgICAgICAgICBwYWRkaW5nOiAwIDAgMCAxM3B4O1xuLy8gICAgICAgICAgIHdpZHRoOiAzMy4zMzMzMzMzMyUgIWltcG9ydGFudDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuXG4vLyAgICAgICAvLyBlbnRyeSBmdWxsIHdpdGggYmFja2dyb3VuZCBhbGxcbi8vICAgICAgICYuZW50cnk3IHtcbi8vICAgICAgICAgLmVudHJ5LWltYWdlIHtoZWlnaHQ6IDQ1MHB4O31cbi8vICAgICAgICAgLmVudHJ5LXRpdGxlIHtmb250LXNpemU6IDQ0cHggIWltcG9ydGFudH1cbi8vICAgICAgICAgLmVudHJ5LWV4Y2VycHQgeyBmb250LXNpemU6IDI0cHg7IGxpbmUtaGVpZ2h0OiAxLjM7fVxuLy8gICAgICAgICAudS1hY2NlbnRDb2xvci0taWNvbk5vcm1hbCB7IGZpbGw6ICNmZmY7IH1cbi8vICAgICAgIH1cblxuLy8gICAgICAgJi5lbnRyeTcsXG4vLyAgICAgICAmLmVudHJ5MTMsXG4vLyAgICAgICAmLmVudHJ5MTQge1xuLy8gICAgICAgICAudS1iYWNrZ3JvdW5kRGFyayB7IGRpc3BsYXk6IGJsb2NrOyB9XG5cbi8vICAgICAgICAgLmVudHJ5LWJvZHkge1xuLy8gICAgICAgICAgIGJvdHRvbTogMDtcbi8vICAgICAgICAgICBsZWZ0OiAwO1xuLy8gICAgICAgICAgIG1hcmdpbjogMzBweCA0MHB4O1xuLy8gICAgICAgICAgIG1heC13aWR0aDogNjAwcHg7XG4vLyAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuLy8gICAgICAgICAgIHotaW5kZXg6IDI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAmOm5vdCgubm90LS1pbWFnZSkge1xuLy8gICAgICAgICAgIC5lbnRyeS1ib2R5IHtjb2xvcjogI2ZmZjt9XG4vLyAgICAgICAgICAgLmVudHJ5LWF1dGhvciB7XG4vLyAgICAgICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuOSk7XG4vLyAgICAgICAgICAgICBhLCAuZW50cnktZGF0ZSB7Y29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgLjkpOyB9XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG5cbi8vICAgICAgICYuZW50cnkxMywgJi5lbnRyeTE0IHtcbi8vICAgICAgICAgLmVudHJ5LWltYWdlIHtoZWlnaHQ6IDQ1MHB4O31cbi8vICAgICAgICAgLmVudHJ5LXRpdGxlIHtmb250LXNpemU6IDMycHggIWltcG9ydGFudH1cbi8vICAgICAgICAgLmVudHJ5LWV4Y2VycHQge2Rpc3BsYXk6IG5vbmU7fVxuLy8gICAgICAgICAuZW50cnktYnlsaW5lIHttYXJnaW4tdG9wOiAyMHB4O31cbi8vICAgICAgICAgLmVudHJ5LWJvZHkge21heC13aWR0aDogNDAwcHg7fVxuLy8gICAgICAgfVxuXG5cbi8vICAgICAgIC8vIGVudHJ5IDUwJVxuLy8gICAgICAgJi5lbnRyeTUsICYuZW50cnk2LCAmLmVudHJ5MTEsICYuZW50cnkxMiB7XG4vLyAgICAgICAgIGZsZXgtYmFzaXM6IDUwJTtcbi8vICAgICAgICAgbWF4LXdpZHRoOiA1MCU7XG4vLyAgICAgICAgIC5lbnRyeS1pbWFnZSB7IGhlaWdodDogMjc0cHg7fVxuLy8gICAgICAgfVxuXG4vLyAgICAgICAvLyBlbnRyeSAxM1xuLy8gICAgICAgJi5lbnRyeTEzIHtcbi8vICAgICAgICAgZmxleC1iYXNpczogNjAlO1xuLy8gICAgICAgICBtYXgtd2lkdGg6IDYwJTtcbi8vICAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbi8vICAgICAgIH1cblxuLy8gICAgICAgLy8gZW50cnkgMTRcbi8vICAgICAgICYuZW50cnkxNCB7XG4vLyAgICAgICAgIGZsZXgtYmFzaXM6IDQwJTtcbi8vICAgICAgICAgbWF4LXdpZHRoOiA0MCU7XG4vLyAgICAgICB9XG5cbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cbiIsIi5wb3N0IHtcclxuICAmLXRpdGxlIHtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjA0O1xyXG4gIH1cclxuXHJcbiAgLy8gJi1mb290ZXIge1xyXG4gIC8vICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjA1KTtcclxuICAvLyB9XHJcbn1cclxuXHJcblxyXG4vLyBwb3N0IGNvbnRlbnQgYm9keVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4ucG9zdC1ib2R5IHtcclxuICBhIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwgMCwgMCwgLjYpIDUwJSwgcmdiYSgwLCAwLCAwLCAwKSA1MCUpO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjA3ZW07XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDJweCAuMWVtO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIH1cclxuICBpbWcge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcclxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcclxuICB9XHJcblxyXG4gIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYge1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgfVxyXG5cclxuICBoMiB7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogLS4wM2VtO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMDQ7XHJcbiAgICBtYXJnaW4tdG9wOiA1NHB4O1xyXG4gIH1cclxuXHJcbiAgaDMge1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDJlbTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xyXG4gICAgbWFyZ2luLXRvcDogNTJweDtcclxuICB9XHJcblxyXG4gIGg0IHtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAtLjAxOGVtO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMjI7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gIH1cclxuXHJcbiAgcCB7XHJcbiAgICBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250O1xyXG4gICAgZm9udC1zaXplOiAyMXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAtLjAwM2VtO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNTg7XHJcbiAgICBtYXJnaW4tdG9wOiAyOHB4O1xyXG4gIH1cclxuXHJcbiAgdWwsXHJcbiAgb2wge1xyXG4gICAgY291bnRlci1yZXNldDogcG9zdDtcclxuICAgIGZvbnQtZmFtaWx5OiAkc2VjdW5kYXJ5LWZvbnQ7XHJcbiAgICBmb250LXNpemU6IDIxcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG5cclxuICAgIGxpIHtcclxuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0uMDAzZW07XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxNHB4O1xyXG4gICAgICBtYXJnaW4tbGVmdDogMzBweDtcclxuXHJcbiAgICAgICY6OmJlZm9yZSB7XHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC03OHB4O1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgICB3aWR0aDogNzhweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdWwgbGk6OmJlZm9yZSB7XHJcbiAgICBjb250ZW50OiAn4oCiJztcclxuICAgIGZvbnQtc2l6ZTogMTYuOHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTVweDtcclxuICAgIHBhZGRpbmctdG9wOiA0cHg7XHJcbiAgfVxyXG5cclxuICBvbCBsaTo6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6IGNvdW50ZXIocG9zdCkgXCIuXCI7XHJcbiAgICBjb3VudGVyLWluY3JlbWVudDogcG9zdDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7XHJcbiAgfVxyXG5cclxuICAudHdpdHRlci10d2VldCxcclxuICBpZnJhbWUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tbGVmdDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiA0MHB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICAudmlkZW8tcmVzcG9uc2l2ZSBpZnJhbWUgeyBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnR9XHJcblxyXG59XHJcblxyXG4vLyBmaXNydCBwXHJcbi5rZy1jYXJkLW1hcmtkb3duID4gcDpmaXJzdC1vZi10eXBlOjpmaXJzdC1sZXR0ZXIsXHJcbi5wb3N0LWJvZHkgPiBwOmZpcnN0LW9mLXR5cGU6OmZpcnN0LWxldHRlciB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgZm9udC1zaXplOiA2NHB4O1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGxldHRlci1zcGFjaW5nOiAtLjAzZW07XHJcbiAgbGluZS1oZWlnaHQ6IC44MztcclxuICBtYXJnaW4tYm90dG9tOiAtLjA4ZW07XHJcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA3cHg7XHJcbiAgcGFkZGluZy10b3A6IDdweDtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcblxyXG4vLyBwb3N0IFRhZ3NcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLnBvc3QtdGFncyB7XHJcbiAgYSB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC4wOCk7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC4xKTtcclxuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gcG9zdCBOZXdzbGV0dGVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4ucG9zdC1uZXdzbGV0dGVyIHtcclxuICBtYXgtd2lkdGg6IDUyMHB4O1xyXG4gIC5uZXdzbGV0dGVyLWZvcm0ge21heC13aWR0aDogNDAwcHh9XHJcblxyXG4gIC5mb3JtLWdyb3VwIHsgd2lkdGg6IDgwJTsgcGFkZGluZy1yaWdodDogNXB4OyB9XHJcbiAgLmZvcm0tLWlucHV0IHtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgcGFkZGluZzogNnB4IDEycHggOHB4IDVweDtcclxuICAgIHJlc2l6ZTogbm9uZTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgJjpmb2N1cyB7XHJcbiAgICAgIG91dGxpbmU6IDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5mb3JtLS1idG4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2E5YTlhOTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAgNDVweCA0NXB4IDA7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICB3aWR0aDogMjAlO1xyXG5cclxuICAgICY6OmJlZm9yZSB7XHJcbiAgICAgIEBleHRlbmQgJXUtYWJzb2x1dGUwO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlhOWE5O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwIDQ1cHggNDVweCAwO1xyXG4gICAgICBsaW5lLWhlaWdodDogNDVweDtcclxuICAgICAgei1pbmRleDogMjtcclxuICAgIH1cclxuXHJcbiAgICAmOmhvdmVyIHtvcGFjaXR5OiAuODsgfVxyXG4gICAgJjpmb2N1cyB7IG91dGxpbmU6IDA7IH1cclxuICB9XHJcbn1cclxuXHJcblxyXG4vLyBwb3N0IFJlbGF0aXZlXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi5wb3N0LXJlbGF0ZWQge1xyXG4gIC5lbnRyeS1pbWFnZSB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMDc4NSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcclxuICAgIGhlaWdodDogMTYwcHg7XHJcbiAgfVxyXG5cclxuICAuZW50cnktdGl0bGUge1xyXG4gICAgY29sb3I6IHJnYmEoMCwwLDAsLjkpO1xyXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbCAhaW1wb3J0YW50O1xyXG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiAyICFpbXBvcnRhbnQ7XHJcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveCFpbXBvcnRhbnQ7XHJcbiAgICBsaW5lLWhlaWdodDogMS4xICFpbXBvcnRhbnQ7XHJcbiAgICBtYXgtaGVpZ2h0OiAyLjJlbSAhaW1wb3J0YW50O1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXMgIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC51LWNhcmQge1xyXG4gICAgaGVpZ2h0OiAyNTBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gU2hhcmUgUG9zdFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4uc2hhcmVQb3N0IHtcclxuICBtYXJnaW4tbGVmdDogLTEzMHB4O1xyXG4gIG1hcmdpbi10b3A6IDI4cHg7XHJcbiAgd2lkdGg6IDQ1cHg7XHJcblxyXG4gIGEge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICBtYXJnaW46IDEwcHggYXV0bztcclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gIH1cclxufVxyXG5cclxuLy8gUG9zdCBBY3Rpb25zXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi5wb3N0QWN0aW9ucyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBib3R0b206IDA7XHJcbiAgYm94LXNoYWRvdzogMCAwIDFweCByZ2JhKDAsIDAsIDAsIC40NCk7XHJcbiAgaGVpZ2h0OiA0NHB4O1xyXG4gIGxlZnQ6IDA7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIC8vIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcclxuICAvLyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjNzO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UtaW4tb3V0O1xyXG4gIC8vIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICB6LWluZGV4OiA0MDA7XHJcblxyXG4gICYuaXMtdmlzaWJsZSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XHJcbiAgICAvLyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XHJcbiAgICAvLyB0cmFuc2l0aW9uLWRlbGF5OiAwcztcclxuICAgIC8vIHZpc2liaWxpdHk6IHZpc2libGU7XHJcbiAgfVxyXG5cclxuICAmLXdyYXAge21heC13aWR0aDogMTIwMHB4O31cclxuXHJcbiAgLnNlcGFyYXRvciB7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC4xNSk7XHJcbiAgICBoZWlnaHQ6IDI0cHg7XHJcbiAgICBtYXJnaW46IDAgMTVweDtcclxuICAgIHdpZHRoOiAxcHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubmV4dFBvc3Qge1xyXG4gIG1heC13aWR0aDogMjYwcHg7XHJcbn1cclxuXHJcblxyXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcclxuXHJcbiAgLnBvc3QtYm9keSB7XHJcblxyXG4gICAgaDIge1xyXG4gICAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDI2cHg7XHJcbiAgICB9XHJcblxyXG4gICAgaDMge1xyXG4gICAgICBmb250LXNpemU6IDI4cHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDI4cHg7XHJcbiAgICB9XHJcblxyXG4gICAgaDQge1xyXG4gICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDIycHg7XHJcbiAgICB9XHJcblxyXG4gICAgcSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjJweCAhaW1wb3J0YW50O1xyXG4gICAgICBsZXR0ZXItc3BhY2luZzogLS4wMDhlbSAhaW1wb3J0YW50O1xyXG4gICAgICBsaW5lLWhlaWdodDogMS40ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgJj4gcDpmaXJzdC1vZi10eXBlOmZpcnN0LWxldHRlciB7XHJcbiAgICAgIGZvbnQtc2l6ZTogNTQuODVweDtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC00cHg7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogNnB4O1xyXG4gICAgICBwYWRkaW5nLXRvcDogMy41cHg7XHJcbiAgICB9XHJcblxyXG4gICAgb2wgLCB1bCwgcCB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0uMDA0ZW07XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU4O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIuYXV0aG9yIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcclxuICBtaW4taGVpZ2h0OiA0MDBweDtcclxuXHJcbiAgLy8gYSB7XHJcbiAgLy8gICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCk7XHJcbiAgLy8gICAmOmhvdmVyIHtcclxuICAvLyAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbiAgJi13cmFwIHtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgfVxyXG5cclxuICAmLWF2YXRhciB7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICB3aWR0aDogODBweDtcclxuICB9XHJcblxyXG4gICYtbWV0YSB7XHJcbiAgICBzcGFuIHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgbWFyZ2luOiAwIDI1cHggMTZweCAwO1xyXG4gICAgICBvcGFjaXR5OiAuODtcclxuICAgICAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJi1uYW1lIHsgY29sb3I6IHJnYmEoMCwwLDAsLjgpfVxyXG5cclxuICAmLWJpbyB7XHJcbiAgICBtYXgtd2lkdGg6IDYwMHB4O1xyXG4gICAgLy8gY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi5hdXRob3IuaGFzLS1pbWFnZSB7XHJcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcclxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAuMzMpO1xyXG5cclxuICAuYXV0aG9yLWxpbms6aG92ZXIgeyBvcGFjaXR5OiAxICFpbXBvcnRhbnQgfVxyXG5cclxuICAudS1hY2NlbnRDb2xvci0taWNvbk5vcm1hbCB7IGZpbGw6ICNmZmY7IH1cclxuXHJcbiAgYSxcclxuICAuYXV0aG9yLW5hbWUgeyBjb2xvcjogI2ZmZjsgfVxyXG5cclxuICAuYXV0aG9yLWZvbGxvdyBhIHtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkO1xyXG4gICAgYm9yZGVyLWNvbG9yOiBoc2xhKDAsIDAlLCAxMDAlLCAuNSkgIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICB9XHJcblxyXG59XHJcblxyXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcclxuICAuYXV0aG9yLW1ldGEgc3BhbiB7IGRpc3BsYXk6IGJsb2NrOyB9XHJcbiAgLmF1dGhvci1oZWFkZXIgeyBkaXNwbGF5OiBibG9jazsgfVxyXG4gIC5hdXRob3ItYXZhdGFyIHsgbWFyZ2luOiAwIGF1dG8gMjBweDsgfVxyXG59XHJcbiIsIi8vIFNlYXJjaFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5zZWFyY2gge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3R0b206IDEwMCUgIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAwIDQwcHg7XG4gIHRyYW5zaXRpb246IGFsbCAuM3M7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgei1pbmRleDogOTk5OTtcblxuICAmLWZvcm0ge1xuICAgIG1heC13aWR0aDogNjgwcHg7XG4gICAgbWFyZ2luLXRvcDogODBweDtcblxuICAgICY6OmJlZm9yZSB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZWVlO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGhlaWdodDogMnB4O1xuICAgICAgbGVmdDogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgei1pbmRleDogMTtcbiAgICB9XG5cbiAgICBpbnB1dCB7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICAgICAgcGFkZGluZy1ib3R0b206IDhweDtcblxuICAgICAgJjpmb2N1cyB7IG91dGxpbmU6IDA7IH1cbiAgICB9XG4gIH1cblxuICAvLyByZXN1bHRcbiAgJi1yZXN1bHRzIHtcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKDkwJSAtIDEwMHB4KTtcbiAgICBtYXgtd2lkdGg6IDY4MHB4O1xuICAgIG92ZXJmbG93OiBhdXRvO1xuXG4gICAgYSB7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcbiAgICAgIHBhZGRpbmc6IDEycHggMDtcblxuICAgICAgJjpob3ZlciB7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCkgfVxuICAgIH1cbiAgfVxufVxuXG4uYnV0dG9uLXNlYXJjaC0tY2xvc2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcbiAgcmlnaHQ6IDUwcHg7XG4gIHRvcDogMjBweDtcbn1cblxuYm9keS5pcy1zZWFyY2gge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIC5zZWFyY2gge1xuICAgIGJvdHRvbTogMCAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjNzO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbn1cbiIsIi5zaWRlYmFyIHtcclxuICAmLXRpdGxlIHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC4wNzg1KTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDVweDtcclxuICB9XHJcblxyXG4gIC8vIGJvcmRlciBmb3IgcG9zdFxyXG4gICYtYm9yZGVyIHtcclxuICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgJHByaW1hcnktY29sb3I7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuMik7XHJcbiAgICBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250O1xyXG4gICAgbGVmdDogMDtcclxuICAgIHBhZGRpbmc6IDE1cHggMTBweCAxMHB4O1xyXG4gICAgdG9wOiAwO1xyXG4gIH1cclxufVxyXG5cclxuLnNpZGViYXItcG9zdCB7XHJcbiAgJjpudGgtY2hpbGQoM24pIHsgLnNpZGViYXItYm9yZGVyIHsgYm9yZGVyLWNvbG9yOiBkYXJrZW4ob3JhbmdlLCAyJSk7IH0gfVxyXG4gICY6bnRoLWNoaWxkKDNuKzIpIHsgLnNpZGViYXItYm9yZGVyIHsgYm9yZGVyLWNvbG9yOiAjMjZhOGVkIH0gfVxyXG5cclxuICAmLS10aXRsZSB7XHJcbiAgICBsaW5lLWhlaWdodDogMS4xO1xyXG4gIH1cclxuXHJcbiAgJi0tbGluayB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgbWluLWhlaWdodDogNTBweDtcclxuICAgIHBhZGRpbmc6IDE1cHggMTVweCAxNXB4IDU1cHg7XHJcbiAgICAmOmhvdmVyIHsgLnNpZGViYXItYm9yZGVyIHtiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIyOSwyMzksMjQ1LDEpO30gIH1cclxuXHJcbiAgfVxyXG59XHJcbiIsIi8vIE5hdmlnYXRpb24gTW9iaWxlXHJcbi5zaWRlTmF2IHtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcclxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgcGFkZGluZzogJGhlYWRlci1oZWlnaHQtbW9iaWxlIDIwcHg7XHJcbiAgcG9zaXRpb246IGZpeGVkICFpbXBvcnRhbnQ7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xyXG4gIHRyYW5zaXRpb246IDAuNHM7XHJcbiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcclxuICB6LWluZGV4OiA5OTtcclxuXHJcbiAgJi1tZW51IGEgeyBwYWRkaW5nOiAxMHB4IDIwcHg7IH1cclxuXHJcbiAgJi13cmFwIHtcclxuICAgIGJhY2tncm91bmQ6ICNlZWU7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIHBhZGRpbmc6IDIwcHggMDtcclxuICAgIHRvcDogJGhlYWRlci1oZWlnaHQtbW9iaWxlO1xyXG4gIH1cclxuXHJcbiAgJi1zZWN0aW9uIHtcclxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjZGRkO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDhweDtcclxuICB9XHJcblxyXG4gICYtZm9sbG93IHtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgbWFyZ2luOiAxNXB4IDA7XHJcblxyXG4gICAgYSB7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIGhlaWdodDogMzZweDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICAgIG1hcmdpbjogMCA1cHggNXB4IDA7XHJcbiAgICAgIG1pbi13aWR0aDogMzZweDtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICB9XHJcblxyXG4gICAgQGVhY2ggJHNvY2lhbC1uYW1lLCAkY29sb3IgaW4gJHNvY2lhbC1jb2xvcnMge1xyXG4gICAgICAuaS0jeyRzb2NpYWwtbmFtZX0ge1xyXG4gICAgICAgIEBleHRlbmQgLmJnLSN7JHNvY2lhbC1uYW1lfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJAbWVkaWEgI3skbWQtYW5kLXVwfSB7XHJcbiAgLy8gYmFja2dyb3VuZCBpbWFnZSBmZWF0dXJlZCBpbiB0YWcgYW5kIGF1dGhvclxyXG4gIC5pcy1hdXRob3IuaGFzLWZlYXR1cmVkLWltYWdlLFxyXG4gIC5pcy10YWcuaGFzLWZlYXR1cmVkLWltYWdlIHtcclxuICAgIC5oZWFkZXIsXHJcbiAgICAubWFpbk1lbnUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLnUtaGVhZGVyQ29sb3JMaW5rIGEgeyBjb2xvcjogI2ZmZiAhaW1wb3J0YW50OyB9XHJcblxyXG4gICAgLm1haW4ge1xyXG4gICAgICBtYXJnaW4tdG9wOiAtMTEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRhZyxcclxuICAgIC5hdXRob3Ige1xyXG4gICAgICBwYWRkaW5nLXRvcDogMTIwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpcy1hcnRpY2xlXHJcbiAgLmlzLWFydGljbGUge1xyXG4gICAgLnBvc3QtaGVhZGVyIHsgcGFkZGluZy10b3A6IDM1cHg7IH1cclxuICAgIC5wb3N0LWJvZHkgeyBtYXJnaW4tdG9wOiAzMHB4OyB9XHJcblxyXG4gICAgLnBvc3QtaW1hZ2UsXHJcbiAgICAudmlkZW8tcG9zdC1mb3JtYXQgeyBtYXJnaW4tdG9wOiA1MHB4OyB9XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FNaUtBLEFKaktBLEtJaUtLLENKaktDO0VBQ0osS0FBSyxFQUFFLE9BQU87RUFDZCxNQUFNLEVBQUUsT0FBTztFQUNmLGVBQWUsRUFBRSxJQUFJLEdBQ3RCOztBSTJKRCxBSnpKQSxhSXlKYSxDSnpKQztFQUNaLEtBQUssRURKUyxPQUFPO0VDS3JCLGVBQWUsRUFBRSxJQUFJLEdBRXRCO0VJcUpELEFKekpBLGFJeUphLEFKdEpYLE1BQU8sQ0FBQztJQUFFLEtBQUssRURMSyxPQUFPLEdDS2M7O0FPMEIzQyxBUGRBLFlPY1ksRVFpSFosQWYvSEEsZ0JlK0hnQixDQWdCZCxVQUFVLEFBU1IsUUFBUyxDZnhKQTtFQUNYLE1BQU0sRUFBRSxDQUFDO0VBQ1QsSUFBSSxFQUFFLENBQUM7RUFDUCxRQUFRLEVBQUUsUUFBUTtFQUNsQixLQUFLLEVBQUUsQ0FBQztFQUNSLEdBQUcsRUFBRSxDQUFDLEdBQ1A7O0FJd01ELEFKdE1BLElJc01JLEFBT0YsV0FBWSxFRzVNZCxBUERBLGtCT0NrQixDUERHO0VBQ25CLEtBQUssRUFBRSxrQkFBaUIsQ0FBQyxVQUFVO0VBQ25DLElBQUksRUFBRSxrQkFBaUIsQ0FBQyxVQUFVLEdBQ25DOztBSTRLRCxBSjFLQSxRSTBLUSxBQVlSLFFBQVcsRUFaRCxBSjFLVixLSTBLZSxBQVlmLFFBQVcsRUFaTSxBSjFLakIsUUkwS3lCLEFBWXpCLFFBQVcsR003TVgsQUFBQSxBVnVCQSxLVXZCQyxFQUFPLElBQUksQUFBWCxDQUFZLFFBQVEsR0FBRSxBQUFBLEFWdUJ2QixLVXZCd0IsRUFBTyxLQUFLLEFBQVosQ0FBYSxRQUFRLENW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RSxDQU1GLElBQUksQUFVQSxHQUFJLENBQUs7TUFDUCxLQUFLLEVBSEEsR0FBdUMsR0FJN0M7SUFsQlAsQUFNRSxJQU5FLENBTUYsSUFBSSxBQVVBLElBQUssQ0FBSTtNQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztJQWxCUCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBVUEsSUFBSyxDQUFJO01BQ1AsS0FBSyxFQUhBLFNBQXVDLEdBSTdDO0lBbEJQLEFBTUUsSUFORSxDQU1GLElBQUksQUFVQSxJQUFLLENBQUk7TUFDUCxLQUFLLEVBSEEsSUFBdUMsR0FJN0M7SUFLSCxNQUFNLE1BQU0sTUFBTSxNQUFNLFNBQVMsRUFBRyxLQUFLO01BdkI3QyxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxRQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxHQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxHQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxHQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLElBQUssQ0FBSTtRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLElBQUssQ0FBSTtRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQWhDVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBd0JFLElBQUssQ0FBSTtRQUNQLEtBQUssRUFIQSxJQUF1QyxHQUk3QztJQU1MLE1BQU0sTUFBTSxNQUFNLE1BQU0sU0FBUyxFQUFHLE1BQU07TUF0QzlDLEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLFFBQXVDLEdBSTdDO01BL0NULEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLFNBQXVDLEdBSTdDO01BL0NULEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLEdBQXVDLEdBSTdDO01BL0NULEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLFNBQXVDLEdBSTdDO01BL0NULEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLFNBQXVDLEdBSTdDO01BL0NULEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLEdBQXVDLEdBSTdDO01BL0NULEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLFNBQXVDLEdBSTdDO01BL0NULEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLFNBQXVDLEdBSTdDO01BL0NULEFBTUUsSUFORSxDQU1GLElBQUksQUF1Q0UsR0FBSSxDQUFLO1FBQ1AsS0FBSyxFQUhBLEdBQXVDLEdBSTdDO01BL0NULEFBTUUs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 */","%link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n%link--accent {\n  color: $primary-color;\n  text-decoration: none;\n  &:hover { color: $primary-color-hover; }\n}\n\n%content-absolute-bottom {\n  bottom: 0;\n  left: 0;\n  margin: 30px;\n  max-width: 600px;\n  position: absolute;\n  z-index: 2;\n}\n\n%u-absolute0 {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n%u-text-color-darker {\n  color: rgba(0, 0, 0, .8) !important;\n  fill: rgba(0, 0, 0, .8) !important;\n}\n\n%fonts-icons {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n","@charset \"UTF-8\";\n\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none;\n}\n\n.link--accent:hover {\n  color: #00ab6b;\n}\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.tag.not--image,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection,\npre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection,\ncode[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none;\n  }\n}\n\n/* Code blocks */\n\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0;\n}\n\n/* Inline code */\n\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n.token.punctuation {\n  color: #999;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n.token.function {\n  color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in;\n}\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms;\n}\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out;\n}\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1;\n}\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px;\n}\n\nfigure {\n  margin: 0;\n}\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4;\n}\n\ncode[class*=language-] .token.comment,\npre[class*=language-] .token.comment {\n  opacity: .8;\n}\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n}\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -25px;\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\ni {\n  vertical-align: middle;\n}\n\nol,\nul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n}\n\nq:before,\nq:after {\n  display: none;\n}\n\n.link--underline:active,\n.link--underline:focus,\n.link--underline:hover {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.main,\n.footer {\n  transition: transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px;\n  }\n}\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n.warning::before {\n  content: \"\";\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n.note::before {\n  content: \"\";\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n.success::before {\n  color: #00bfa5;\n  content: \"\";\n}\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n  margin-top: -5px;\n}\n\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n}\n\n.tag-wrap {\n  z-index: 2;\n}\n\n.tag.not--image {\n  min-height: auto;\n}\n\n.tag-description {\n  max-width: 500px;\n}\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n.with-tooltip:after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #FFF;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 130px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n.with-tooltip:hover:after {\n  animation: tooltip .1s ease-out both;\n}\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.footer a:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n}\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  left: 50%;\n  min-width: 680px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n}\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n.bg-google,\n.sideNav-follow .i-google {\n  background-color: #dd4b39 !important;\n}\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n.c-github {\n  color: #555 !important;\n}\n\n.bg-github,\n.sideNav-follow .i-github {\n  background-color: #555 !important;\n}\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n.bg-linkedin,\n.sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important;\n}\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n.bg-spotify,\n.sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important;\n}\n\n.c-codepen {\n  color: #222 !important;\n}\n\n.bg-codepen,\n.sideNav-follow .i-codepen {\n  background-color: #222 !important;\n}\n\n.c-behance {\n  color: #131418 !important;\n}\n\n.bg-behance,\n.sideNav-follow .i-behance {\n  background-color: #131418 !important;\n}\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n.bg-dribbble,\n.sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n.bg-flickr,\n.sideNav-follow .i-flickr {\n  background-color: #0063dc !important;\n}\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n.bg-reddit,\n.sideNav-follow .i-reddit {\n  background-color: #ff4500 !important;\n}\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n.bg-pocket,\n.sideNav-follow .i-pocket {\n  background-color: #f50057 !important;\n}\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n.bg-pinterest,\n.sideNav-follow .i-pinterest {\n  background-color: #bd081c !important;\n}\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n.bg-whatsapp,\n.sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important;\n}\n\n.fbSave-dropdown {\n  background-color: #FFF;\n  border: 1px solid #e0e0e0;\n  bottom: 100%;\n  display: none;\n  max-width: 200px;\n  min-width: 100px;\n  padding: 8px;\n  transform: translate(-50%, 0);\n  z-index: 10;\n}\n\n.fbSave-dropdown.is-visible {\n  display: block;\n}\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n}\n\n.rocket:hover svg path {\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.svgIcon {\n  display: inline-block;\n}\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  animation-delay: .8s;\n  animation: loading-bar 1s ease-in-out infinite;\n  display: block;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034;\n}\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n.u-headerColorLink a {\n  color: #BBF1B9;\n}\n\n.u-headerColorLink a.active,\n.u-headerColorLink a:hover {\n  color: #EEFFEA;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-fixed {\n  position: fixed !important;\n}\n\n.u-block {\n  display: block !important;\n}\n\n.u-inlineBlock {\n  display: inline-block;\n}\n\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n.u-clear::before,\n.row::before,\n.u-clear::after,\n.row::after {\n  content: \" \";\n  display: table;\n}\n\n.u-clear::after,\n.row::after {\n  clear: both;\n}\n\n.u-fontSize13 {\n  font-size: 13px;\n}\n\n.u-fontSize14 {\n  font-size: 14px;\n}\n\n.u-fontSize15 {\n  font-size: 15px;\n}\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n.u-fontSize28 {\n  font-size: 28px !important;\n}\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important;\n  }\n\n  .u-md-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n.u-fontWeightSemibold {\n  font-weight: 600;\n}\n\n.u-fontWeightBold {\n  font-weight: 700;\n}\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.u-marginTop20 {\n  margin-top: 20px;\n}\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important;\n}\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n.u-padding20 {\n  padding: 20px;\n}\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n.u-paddingRight10 {\n  padding-right: 10px;\n}\n\n.u-paddingLeft15 {\n  padding-left: 15px;\n}\n\n.u-paddingTop2 {\n  padding-top: 2px;\n}\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n.u-lineHeightTight {\n  line-height: 1.2;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-floatRight {\n  float: right;\n}\n\n.u-floatLeft {\n  float: left;\n}\n\n.u-flex {\n  display: flex;\n}\n\n.u-flexCenter {\n  align-items: center;\n  display: flex;\n}\n\n.u-flex1 {\n  flex: 1 1 auto;\n}\n\n.u-flex0 {\n  flex: 0 0 auto;\n}\n\n.u-flexWrap {\n  flex-wrap: wrap;\n}\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.u-flexColumnTop {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1200 {\n  max-width: 1200px;\n}\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.u-round {\n  border-radius: 50%;\n}\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n.u-card--p {\n  font-family: \"Droid Serif\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n.u-height540 {\n  height: 540px;\n}\n\n.u-height280 {\n  height: 280px;\n}\n\n.u-height260 {\n  height: 260px;\n}\n\n.u-height100 {\n  height: 100px;\n}\n\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.u-hide {\n  display: none !important;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important;\n  }\n\n  .u-md-heightAuto {\n    height: auto;\n  }\n\n  .u-md-height170 {\n    height: 170px;\n  }\n\n  .u-md-relative {\n    position: relative;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n.row {\n  margin-left: -10px;\n  margin-right: -10px;\n}\n\n.row .col {\n  float: left;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n.row .col.s1 {\n  width: 8.33333%;\n}\n\n.row .col.s2 {\n  width: 16.66667%;\n}\n\n.row .col.s3 {\n  width: 25%;\n}\n\n.row .col.s4 {\n  width: 33.33333%;\n}\n\n.row .col.s5 {\n  width: 41.66667%;\n}\n\n.row .col.s6 {\n  width: 50%;\n}\n\n.row .col.s7 {\n  width: 58.33333%;\n}\n\n.row .col.s8 {\n  width: 66.66667%;\n}\n\n.row .col.s9 {\n  width: 75%;\n}\n\n.row .col.s10 {\n  width: 83.33333%;\n}\n\n.row .col.s11 {\n  width: 91.66667%;\n}\n\n.row .col.s12 {\n  width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  .row .col.m1 {\n    width: 8.33333%;\n  }\n\n  .row .col.m2 {\n    width: 16.66667%;\n  }\n\n  .row .col.m3 {\n    width: 25%;\n  }\n\n  .row .col.m4 {\n    width: 33.33333%;\n  }\n\n  .row .col.m5 {\n    width: 41.66667%;\n  }\n\n  .row .col.m6 {\n    width: 50%;\n  }\n\n  .row .col.m7 {\n    width: 58.33333%;\n  }\n\n  .row .col.m8 {\n    width: 66.66667%;\n  }\n\n  .row .col.m9 {\n    width: 75%;\n  }\n\n  .row .col.m10 {\n    width: 83.33333%;\n  }\n\n  .row .col.m11 {\n    width: 91.66667%;\n  }\n\n  .row .col.m12 {\n    width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .row .col.l1 {\n    width: 8.33333%;\n  }\n\n  .row .col.l2 {\n    width: 16.66667%;\n  }\n\n  .row .col.l3 {\n    width: 25%;\n  }\n\n  .row .col.l4 {\n    width: 33.33333%;\n  }\n\n  .row .col.l5 {\n    width: 41.66667%;\n  }\n\n  .row .col.l6 {\n    width: 50%;\n  }\n\n  .row .col.l7 {\n    width: 58.33333%;\n  }\n\n  .row .col.l8 {\n    width: 66.66667%;\n  }\n\n  .row .col.l9 {\n    width: 75%;\n  }\n\n  .row .col.l10 {\n    width: 83.33333%;\n  }\n\n  .row .col.l11 {\n    width: 91.66667%;\n  }\n\n  .row .col.l12 {\n    width: 100%;\n  }\n}\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.button i {\n  display: inline-block;\n}\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n.button--chromeless:active,\n.button--chromeless:hover,\n.button--chromeless:focus {\n  border-width: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.button--primary {\n  border-color: #00A034;\n  color: #00A034;\n}\n\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n\n.buttonSet > .button:last-child {\n  margin-right: 0;\n}\n\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px;\n}\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"./../fonts/simply.eot\");\n  src: url(\"./../fonts/simply.eot\") format(\"embedded-opentype\"), url(\"./../fonts/simply.ttf\") format(\"truetype\"), url(\"./../fonts/simply.woff\") format(\"woff\"), url(\"./../fonts/simply.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.i-telegram:before {\n  content: \"\\f2c6\";\n}\n\n.i-link:before {\n  content: \"\\f0c1\";\n}\n\n.i-reddit:before {\n  content: \"\\f281\";\n}\n\n.i-twitter:before {\n  content: \"\\f099\";\n}\n\n.i-github:before {\n  content: \"\\f09b\";\n}\n\n.i-linkedin:before {\n  content: \"\\f0e1\";\n}\n\n.i-code:before {\n  content: \"\\f121\";\n}\n\n.i-youtube:before {\n  content: \"\\f16a\";\n}\n\n.i-stack-overflow:before {\n  content: \"\\f16c\";\n}\n\n.i-instagram:before {\n  content: \"\\f16d\";\n}\n\n.i-flickr:before {\n  content: \"\\f16e\";\n}\n\n.i-dribbble:before {\n  content: \"\\f17d\";\n}\n\n.i-behance:before {\n  content: \"\\f1b4\";\n}\n\n.i-spotify:before {\n  content: \"\\f1bc\";\n}\n\n.i-codepen:before {\n  content: \"\\f1cb\";\n}\n\n.i-facebook:before {\n  content: \"\\f230\";\n}\n\n.i-pinterest:before {\n  content: \"\\f231\";\n}\n\n.i-whatsapp:before {\n  content: \"\\f232\";\n}\n\n.i-snapchat:before {\n  content: \"\\f2ac\";\n}\n\n.i-comments:before {\n  content: \"\\e900\";\n}\n\n.i-location:before {\n  content: \"\\e8b4\";\n}\n\n.i-save:before {\n  content: \"\\e8e6\";\n}\n\n.i-save--line:before {\n  content: \"\\e8e7\";\n}\n\n.i-check-circle:before {\n  content: \"\\e86c\";\n}\n\n.i-close:before {\n  content: \"\\e5cd\";\n}\n\n.i-favorite:before {\n  content: \"\\e87d\";\n}\n\n.i-star:before {\n  content: \"\\e838\";\n}\n\n.i-warning:before {\n  content: \"\\e002\";\n}\n\n.i-rss:before {\n  content: \"\\e0e5\";\n}\n\n.i-search:before {\n  content: \"\\e8b6\";\n}\n\n.i-send:before {\n  content: \"\\e163\";\n}\n\n.i-share:before {\n  content: \"\\e80d\";\n}\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both;\n}\n\n.animated.infinite {\n  animation-iteration-count: infinite;\n}\n\n.bounceIn {\n  animation-name: bounceIn;\n}\n\n.bounceInDown {\n  animation-name: bounceInDown;\n}\n\n.pulse {\n  animation-name: pulse;\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    transform: none;\n  }\n}\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n}\n\n@keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n\n@keyframes loading-bar {\n  0% {\n    transform: translateX(-100%);\n  }\n\n  40% {\n    transform: translateX(0);\n  }\n\n  60% {\n    transform: translateX(0);\n  }\n\n  100% {\n    transform: translateX(100%);\n  }\n}\n\n.header {\n  z-index: 80;\n}\n\n.header-wrap {\n  height: 55px;\n}\n\n.header-logo {\n  color: #fff !important;\n  height: 30px;\n}\n\n.header-logo img {\n  max-height: 100%;\n}\n\n.header-logo,\n.header .button-search--open,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n.header-description {\n  color: rgba(255, 255, 255, 0.8);\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 650px;\n}\n\n.not-logo .header-logo {\n  height: auto !important;\n}\n\n.follow > a {\n  padding-left: 15px;\n}\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n}\n\n.nav ul {\n  display: flex;\n  margin-right: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.nav li {\n  float: left;\n}\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n}\n\n.button-nav--toggle span {\n  background-color: #BBF1B9;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  transition: .4s;\n  width: 20px;\n}\n\n.button-nav--toggle span:first-child {\n  transform: translate(0, -6px);\n}\n\n.button-nav--toggle span:last-child {\n  transform: translate(0, 6px);\n}\n\n@media only screen and (min-width: 766px) {\n  body.is-home .header-wrap {\n    height: 200px;\n  }\n\n  body.is-home .header-logo {\n    height: 50px;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed;\n  }\n\n  .header-wrap {\n    height: 50px;\n  }\n\n  .header-logo--wrap {\n    text-align: left;\n  }\n\n  .header-top {\n    display: flex;\n    align-items: center;\n  }\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  body.is-showNavMob .sideNav {\n    transform: translateX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    transform: rotate(90deg);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    transform: rotate(45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    transform: scaleX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    transform: rotate(-45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    transform: translateX(-25%);\n  }\n}\n\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px;\n}\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%;\n}\n\n.story-title {\n  letter-spacing: -.028em;\n}\n\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 4.5em;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n\n@media only screen and (min-width: 766px) {\n  .story--260 .story-wrap {\n    height: 260px;\n  }\n\n  .story--260 .story-image {\n    height: 100px;\n  }\n\n  .story--260 .story-body {\n    height: 160px;\n  }\n\n  .story--200 .story-wrap {\n    height: 260px;\n    display: flex;\n  }\n\n  .story--200 .story-body {\n    flex: 1 1 auto;\n    height: 100%;\n  }\n\n  .story--200 .story-image {\n    flex: 0 0 auto;\n    height: 100%;\n    width: 200px;\n  }\n}\n\n.post-title {\n  line-height: 1.04;\n}\n\n.post-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px;\n}\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px;\n}\n\n.post-body ul li,\n.post-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-bottom: 14px;\n  margin-left: 30px;\n}\n\n.post-body ul li::before,\n.post-body ol li::before {\n  box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n.post-body ul li::before {\n  content: '•';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px;\n}\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  display: block;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  margin-top: 40px !important;\n}\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important;\n}\n\n.kg-card-markdown > p:first-of-type::first-letter,\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.post-newsletter {\n  max-width: 520px;\n}\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n.post-related .entry-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px;\n}\n\n.post-related .entry-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n.post-related .u-card {\n  height: 250px;\n  margin-bottom: 20px;\n}\n\n.sharePost {\n  margin-left: -130px;\n  margin-top: 28px;\n  width: 45px;\n}\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translate3d(0, 0, 0);\n  transition: all 0.25s ease-in-out;\n  z-index: 400;\n}\n\n.postActions.is-visible {\n  transform: translateY(100%);\n}\n\n.postActions-wrap {\n  max-width: 1200px;\n}\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px;\n  }\n\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px;\n  }\n\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px;\n  }\n\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important;\n  }\n\n  .post-body > p:first-of-type:first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px;\n  }\n\n  .post-body ol,\n  .post-body ul,\n  .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n.author-wrap {\n  z-index: 2;\n}\n\n.author-avatar {\n  height: 80px;\n  margin-right: 10px;\n  width: 80px;\n}\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author-bio {\n  max-width: 600px;\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n.author.has--image .u-accentColor--iconNormal {\n  fill: #fff;\n}\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n.author.has--image .author-follow a {\n  border: 2px solid;\n  border-color: rgba(255, 255, 255, 0.5) !important;\n  font-size: 16px;\n}\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block;\n  }\n\n  .author-header {\n    display: block;\n  }\n\n  .author-avatar {\n    margin: 0 auto 20px;\n  }\n}\n\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999;\n}\n\n.search-form {\n  max-width: 680px;\n  margin-top: 80px;\n}\n\n.search-form::before {\n  background: #eee;\n  bottom: 0;\n  content: '';\n  display: block;\n  height: 2px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n.search-form input {\n  border: none;\n  display: block;\n  line-height: 40px;\n  padding-bottom: 8px;\n}\n\n.search-form input:focus {\n  outline: 0;\n}\n\n.search-results {\n  max-height: calc(90% - 100px);\n  max-width: 680px;\n  overflow: auto;\n}\n\n.search-results a {\n  border-bottom: 1px solid #eee;\n  padding: 12px 0;\n}\n\n.search-results a:hover {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px;\n}\n\nbody.is-search {\n  overflow: hidden;\n}\n\nbody.is-search .search {\n  bottom: 0 !important;\n  height: 100%;\n  transition: all .3s;\n  visibility: visible;\n}\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n@media only screen and (min-width: 766px) {\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important;\n  }\n\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff !important;\n  }\n\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -110px;\n  }\n\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 120px;\n  }\n\n  .is-article .post-header {\n    padding-top: 35px;\n  }\n\n  .is-article .post-body {\n    margin-top: 30px;\n  }\n\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px;\n  }\n}\n\n","\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n\n  &:active,\n  &:hover {\n    outline: 0;\n  }\n}\n\nblockquote {\n  border-left: 3px solid rgba(0,0,0,.8);\n  font-family: $secundary-font;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: $primary-text-color;\n  font-family: $primary-font;\n  font-size: $font-size-base;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\n//Default styles\nhtml {\n  box-sizing: border-box;\n  font-size: $font-size-root;\n}\n\nfigure {\n  margin: 0;\n}\n\n// Code\n// ==========================================================================\nkbd, samp, code {\n  background: $code-bg-color;\n  border-radius: 4px;\n  color: $code-color;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: $code-bg-color !important;\n  border-radius: 4px;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  margin-top: 30px !important;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n\n  code {\n    background: transparent;\n    color: $pre-code-color;\n    padding: 0;\n    text-shadow: 0 1px #fff;\n  }\n}\n\n\ncode[class*=language-],\npre[class*=language-] {\n  color: $pre-code-color;\n  line-height: 1.4;\n\n  .token.comment { opacity: .8; }\n\n}\n\n\n// hr\n// ==========================================================================\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n\n  &::before {\n    color: rgba(0, 0, 0, .6);\n    content: '...';\n    display: inline-block;\n    font-family: $primary-font;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -25px;\n  }\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n\n  &:not([src]) {\n    visibility: hidden;\n  }\n}\n\ni {\n  // display: inline-block;\n  vertical-align: middle;\n}\n\nol, ul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, rgba(215, 253, 211, 1), rgba(215, 253, 211, 1));\n  color: rgba(0, 0, 0, .8);\n}\n\nq {\n  color: rgba(0, 0, 0, .44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n\n  &:before, &:after {display: none;}\n}\n\n// Links color\n// ==========================================================================\n.link--accent { @extend %link--accent; }\n\n.link { @extend %link; }\n\n.link--underline {\n  &:active,\n  &:focus,\n  &:hover {\n    color: inherit;\n    text-decoration: underline;\n  }\n}\n\n// Animation main page and footer\n// ==========================================================================\n.main,\n.footer { transition: transform .5s ease; }\n\n@media #{$md-and-down} {\n  .main {\n    overflow: hidden;\n    padding-top: $header-height-mobile;\n  }\n}\n\n// warning success and Note\n// ==========================================================================\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n  &::before {content: $i-warning;}\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n  &::before {content: $i-star;}\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n  &::before {color: #00bfa5; content: $i-check;}\n}\n\n.warning, .note, .success{\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n\n  a {\n    color: inherit;\n    text-decoration: underline;\n  }\n\n  &::before {\n    @extend %fonts-icons;\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n    margin-top: -5px;\n  }\n}\n\n// Page Tags\n// ==========================================================================\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n\n  &-wrap {z-index: 2;}\n\n  &.not--image {\n    @extend %u-text-color-darker;\n    min-height: auto;\n  }\n\n  &-description {\n    max-width: 500px;\n  }\n}\n\n\n// toltip\n// ==========================================================================\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n\n  &:after {\n    background: rgba(0, 0, 0, .85);\n    border-radius: 4px;\n    color: #FFF;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 130px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1;\n  }\n\n  &:hover:after {\n    animation: tooltip .1s ease-out both;\n  }\n}\n\n// Footer\n// ==========================================================================\n.footer {\n  color: rgba(0, 0, 0, .44);\n\n  a {\n    color: rgba(0, 0, 0, .6);\n    &:hover {color: rgba(0, 0, 0, .8);}\n  }\n}\n\n// Error page\n// ==========================================================================\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n\n  &-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px;\n  }\n\n  &-text {\n    margin-top: 60px;\n    white-space: pre-wrap;\n  }\n\n  &-wrap {\n    color: rgba(0, 0, 0, .4);\n    left: 50%;\n    min-width: 680px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n}\n\n\n// Video Responsive\n// ==========================================================================\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n\n  iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n}\n\n\n// Social Media Color\n// ==========================================================================\n@each $social-name, $color in $social-colors {\n  .c-#{$social-name} { color: $color !important;}\n  .bg-#{$social-name} { background-color: $color !important; }\n}\n\n\n// Facebook Save\n// ==========================================================================\n.fbSave {\n  &-dropdown {\n    background-color: #FFF;\n    border: 1px solid #e0e0e0;\n    bottom: 100%;\n    display: none;\n    max-width: 200px;\n    min-width: 100px;\n    padding: 8px;\n    transform: translate(-50%, 0);\n    z-index: 10;\n\n    &.is-visible {display: block; }\n  }\n}\n\n// Rocket for return top page\n// ==========================================================================\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n\n  &:hover svg path {\n    fill: rgba(0, 0, 0, .6);\n  }\n}\n\n.svgIcon {\n  display: inline-block;\n}\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n// Load More\n// ==========================================================================\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  animation-delay: .8s;\n  animation: loading-bar 1s ease-in-out infinite;\n  display: block;\n}\n","/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n","/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*=\"language-\"],\n\tpre[class*=\"language-\"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #a67f59;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n","img[data-action=\"zoom\"] {\r\n  cursor: zoom-in;\r\n}\r\n.zoom-img,\r\n.zoom-img-wrap {\r\n  position: relative;\r\n  z-index: 666;\r\n  -webkit-transition: all 300ms;\r\n       -o-transition: all 300ms;\r\n          transition: all 300ms;\r\n}\r\nimg.zoom-img {\r\n  cursor: pointer;\r\n  cursor: -webkit-zoom-out;\r\n  cursor: -moz-zoom-out;\r\n}\r\n.zoom-overlay {\r\n  z-index: 420;\r\n  background: #fff;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  pointer-events: none;\r\n  filter: \"alpha(opacity=0)\";\r\n  opacity: 0;\r\n  -webkit-transition:      opacity 300ms;\r\n       -o-transition:      opacity 300ms;\r\n          transition:      opacity 300ms;\r\n}\r\n.zoom-overlay-open .zoom-overlay {\r\n  filter: \"alpha(opacity=100)\";\r\n  opacity: 1;\r\n}\r\n.zoom-overlay-open,\r\n.zoom-overlay-transitioning {\r\n  cursor: default;\r\n}\r\n","// Headings\r\n\r\nh1, h2, h3, h4, h5, h6,\r\n.h1, .h2, .h3, .h4, .h5, .h6 {\r\n  color: $headings-color;\r\n  font-family: $headings-font-family;\r\n  font-weight: $headings-font-weight;\r\n  line-height: $headings-line-height;\r\n  margin: 0;\r\n\r\n  a {\r\n    color: inherit;\r\n    line-height: inherit;\r\n  }\r\n}\r\n\r\nh1 { font-size: $font-size-h1; }\r\nh2 { font-size: $font-size-h2; }\r\nh3 { font-size: $font-size-h3; }\r\nh4 { font-size: $font-size-h4; }\r\nh5 { font-size: $font-size-h5; }\r\nh6 { font-size: $font-size-h6; }\r\n\r\n// These declarations are kept separate from and placed after\r\n// the previous tag-based declarations so that the classes beat the tags in\r\n// the CSS cascade, and thus <h1 class=\"h2\"> will be styled like an h2.\r\n.h1 { font-size: $font-size-h1; }\r\n.h2 { font-size: $font-size-h2; }\r\n.h3 { font-size: $font-size-h3; }\r\n.h4 { font-size: $font-size-h4; }\r\n.h5 { font-size: $font-size-h5; }\r\n.h6 { font-size: $font-size-h6; }\r\n\r\n\r\np {\r\n  margin: 0;\r\n}\r\n","// color\n.u-textColorNormal {\n  color: rgba(0, 0, 0, .44);\n  fill: rgba(0, 0, 0, .44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, .6);\n  fill: rgba(0, 0, 0, .6);\n}\n\n.u-accentColor--iconNormal {\n  color: $primary-color;\n  fill: $primary-color;\n}\n\n//  background color\n.u-bgColor { background-color: $primary-color; }\n\n.u-headerColorLink a {\n  // color: rgba(0, 0, 0, .44);\n  color: $header-color;\n\n  &.active,\n  &:hover {\n    // color: $header-\n    color: $header-color-hover;\n  }\n}\n\n.u-textColorDarker { @extend %u-text-color-darker; }\n\n// Positions\n.u-relative { position: relative; }\n.u-absolute { position: absolute; }\n.u-absolute0 { @extend %u-absolute0; }\n.u-fixed { position: fixed !important; }\n\n.u-block { display: block !important }\n.u-inlineBlock { display: inline-block }\n\n//  Background\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, .3) 29%, rgba(0, 0, 0, .6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n// .u-background-white { background-color: #eeefee; }\n.u-backgroundWhite { background-color: #fafafa; }\n.u-backgroundColorGrayLight { background-color: #f0f0f0 !important; }\n\n// Clear\n.u-clear {\n  &::before,\n  &::after {\n    content: \" \";\n    display: table;\n  }\n  &::after { clear: both; }\n}\n\n// font size\n.u-fontSize13 { font-size: 13px }\n.u-fontSize14 { font-size: 14px }\n.u-fontSize15 { font-size: 15px }\n.u-fontSize20 { font-size: 20px }\n.u-fontSize22 { font-size: 22px }\n.u-fontSize28 { font-size: 28px !important; }\n.u-fontSize36 { font-size: 36px }\n.u-fontSize40 { font-size: 40px }\n.u-fontSizeBase { font-size: 18px }\n.u-fontSizeJumbo { font-size: 50px }\n.u-fontSizeLarge { font-size: 24px !important }\n.u-fontSizeLarger { font-size: 32px }\n.u-fontSizeLargest { font-size: 44px }\n.u-fontSizeMicro { font-size: 11px }\n.u-fontSizeSmall { font-size: 16px }\n.u-fontSizeSmaller { font-size: 14px }\n.u-fontSizeSmallest { font-size: 12px }\n\n@media #{$md-and-down} {\n  .u-md-fontSizeBase { font-size: 18px !important }\n  .u-md-fontSizeLarger { font-size: 32px }\n}\n\n// @media (max-width: 767px) {\n//   .u-xs-fontSizeBase {font-size: 18px}\n//   .u-xs-fontSize13 {font-size: 13px}\n//   .u-xs-fontSizeSmaller {font-size: 14px}\n//   .u-xs-fontSizeSmall {font-size: 16px}\n//   .u-xs-fontSize22 {font-size: 22px}\n//   .u-xs-fontSizeLarge {font-size: 24px}\n//   .u-xs-fontSize40 {font-size: 40px}\n//   .u-xs-fontSizeLarger {font-size: 32px}\n//   .u-xs-fontSizeSmallest {font-size: 12px}\n// }\n\n// font weight\n.u-fontWeightThin { font-weight: 300 }\n.u-fontWeightNormal { font-weight: 400 }\n// .u-fontWeightMedium { font-weight: 500 }\n.u-fontWeightSemibold { font-weight: 600 }\n.u-fontWeightBold { font-weight: 700 }\n\n.u-textUppercase { text-transform: uppercase }\n.u-textAlignCenter { text-align: center }\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n// Margin\n.u-marginAuto { margin-left: auto; margin-right: auto; }\n.u-marginTop20 { margin-top: 20px }\n.u-marginTop30 { margin-top: 30px }\n.u-marginBottom15 { margin-bottom: 15px }\n.u-marginBottom20 { margin-bottom: 20px !important }\n.u-marginBottom30 { margin-bottom: 30px }\n.u-marginBottom40 { margin-bottom: 40px }\n\n// padding\n.u-padding0 { padding: 0 !important }\n.u-padding20 { padding: 20px }\n.u-padding15 { padding: 15px !important; }\n.u-paddingBottom2 { padding-bottom: 2px; }\n.u-paddingBottom30 { padding-bottom: 30px; }\n.u-paddingBottom20 { padding-bottom: 20px }\n.u-paddingRight10 { padding-right: 10px }\n.u-paddingLeft15 { padding-left: 15px }\n\n.u-paddingTop2 { padding-top: 2px }\n.u-paddingTop5 { padding-top: 5px; }\n.u-paddingTop10 { padding-top: 10px; }\n.u-paddingTop15 { padding-top: 15px; }\n.u-paddingTop20 { padding-top: 20px; }\n.u-paddingTop30 { padding-top: 30px; }\n\n.u-paddingBottom15 { padding-bottom: 15px; }\n\n.u-paddingRight20 { padding-right: 20px }\n.u-paddingLeft20 { padding-left: 20px }\n\n.u-contentTitle {\n  font-family: $primary-font;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n// line-height\n.u-lineHeight1 { line-height: 1; }\n.u-lineHeightTight { line-height: 1.2 }\n\n// overflow\n.u-overflowHidden { overflow: hidden }\n\n// float\n.u-floatRight { float: right; }\n.u-floatLeft { float: left; }\n\n//  flex\n.u-flex { display: flex; }\n.u-flexCenter { align-items: center; display: flex; }\n// .u-flex--1 { flex: 1 }\n.u-flex1 { flex: 1 1 auto; }\n.u-flex0 { flex: 0 0 auto; }\n.u-flexWrap { flex-wrap: wrap }\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.u-flexColumnTop {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n// Background\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n// max widht\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1200 { max-width: 1200px }\n.u-maxWidth1000 { max-width: 1000px }\n.u-maxWidth740 { max-width: 740px }\n.u-maxWidth1040 { max-width: 1040px }\n.u-sizeFullWidth { width: 100% }\n\n// border\n.u-borderLighter { border: 1px solid rgba(0, 0, 0, .15); }\n.u-round { border-radius: 50% }\n.u-borderRadius2 { border-radius: 2px }\n\n// card\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, .09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n\n  &--p {\n    font-family: $secundary-font;\n    font-style: normal;\n    font-weight: 400;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .05);\n}\n\n// Heinght\n.u-height540 { height: 540px }\n.u-height280 { height: 280px }\n.u-height260 { height: 260px }\n.u-height100 { height: 100px }\n.u-borderBlackLightest { border: 1px solid rgba(0, 0, 0, .1) }\n\n// hide global\n.u-hide { display: none !important }\n\n@media #{$md-and-down} {\n  .u-hide-before-md { display: none !important }\n  .u-md-heightAuto { height: auto; }\n  .u-md-height170 { height: 170px }\n  .u-md-relative { position: relative }\n}\n\n@media #{$lg-and-down} { .u-hide-before-lg { display: none !important } }\n\n// hide after\n@media #{$md-and-up} { .u-hide-after-md { display: none !important } }\n\n@media #{$lg-and-up} { .u-hide-after-lg { display: none !important } }\n","// @media #{$lg-and-up} {\n//   .content {\n//     flex: 1 !important;\n//     max-width: calc(100% - 340px) !important;\n//     order: 1;\n//     // overflow: hidden;\n//   }\n//   .sidebar {\n//     flex: 0 0 340px !important;\n//     order: 2;\n//   }\n// }\n\n.row {\n  margin-left: - 10px;\n  margin-right: - 10px;\n\n  @extend .u-clear;\n\n  .col {\n    float: left;\n    padding-left: 10px;\n    padding-right: 10px;\n\n    $i: 1;\n\n    @while $i <= $num-cols {\n      $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n      &.s#{$i} {\n        width: $perc;\n      }\n\n      $i: $i + 1;\n    }\n\n    @media #{$md-and-up} {\n\n      $i: 1;\n\n      @while $i <= $num-cols {\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n        &.m#{$i} {\n          width: $perc;\n        }\n\n        $i: $i + 1;\n      }\n    }\n\n    @media #{$lg-and-up} {\n\n      $i: 1;\n\n      @while $i <= $num-cols {\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n        &.l#{$i} {\n          width: $perc;\n        }\n\n        $i: $i + 1;\n      }\n    }\n  }\n}\n",".button {\r\n  background: rgba(0, 0, 0, 0);\r\n  border: 1px solid rgba(0, 0, 0, .15);\r\n  border-radius: 999em;\r\n  box-sizing: border-box;\r\n  color: rgba(0, 0, 0, .44);\r\n  cursor: pointer;\r\n  display: inline-block;\r\n  font-family: $primary-font;\r\n  font-size: 14px;\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  height: 37px;\r\n  letter-spacing: 0;\r\n  line-height: 35px;\r\n  padding: 0 16px;\r\n  position: relative;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  text-rendering: optimizeLegibility;\r\n  user-select: none;\r\n  vertical-align: middle;\r\n  white-space: nowrap;\r\n\r\n  i { display: inline-block; }\r\n\r\n  &--chromeless {\r\n    border-radius: 0;\r\n    border-width: 0;\r\n    box-shadow: none;\r\n    color: rgba(0, 0, 0, .44);\r\n    height: auto;\r\n    line-height: inherit;\r\n    padding: 0;\r\n    text-align: left;\r\n    vertical-align: baseline;\r\n    white-space: normal;\r\n\r\n    &:active,\r\n    &:hover,\r\n    &:focus {\r\n      border-width: 0;\r\n      color: rgba(0, 0, 0, .6);\r\n    }\r\n  }\r\n\r\n  &--large {\r\n    font-size: 15px;\r\n    height: 44px;\r\n    line-height: 42px;\r\n    padding: 0 18px;\r\n  }\r\n\r\n  &--dark {\r\n    border-color: rgba(0, 0, 0, .6);\r\n    color: rgba(0, 0, 0, .6);\r\n\r\n    &:hover {\r\n      border-color: rgba(0, 0, 0, .8);\r\n      color: rgba(0, 0, 0, .8);\r\n    }\r\n  }\r\n}\r\n\r\n// Primary\r\n.button--primary {\r\n  border-color: $primary-color;\r\n  color: $primary-color;\r\n}\r\n\r\n.buttonSet {\r\n  > .button {\r\n    margin-right: 8px;\r\n    vertical-align: middle;\r\n  }\r\n\r\n  > .button:last-child {\r\n    margin-right: 0;\r\n  }\r\n\r\n  .button--chromeless {\r\n    height: 37px;\r\n    line-height: 35px;\r\n  }\r\n}\r\n\r\n.buttonSet {\r\n  .button--large.button--chromeless,\r\n  .button--large.button--link {\r\n    height: 44px;\r\n    line-height: 42px;\r\n  }\r\n\r\n  &>.button--chromeless:not(.button--circle) {\r\n    margin-right: 0;\r\n    padding-right: 8px;\r\n  }\r\n\r\n  &>.button--chromeless+.button--chromeless:not(.button--circle) {\r\n    margin-left: 0;\r\n    padding-left: 8px;\r\n  }\r\n\r\n  &>.button--chromeless:last-child {\r\n    padding-right: 0;\r\n  }\r\n}\r\n\r\n.button--large.button--chromeless,\r\n.button--large.button--link {\r\n  padding: 0;\r\n}\r\n\r\n","@font-face {\r\n  font-family: 'simply';\r\n  src:  url('../fonts/simply.eot?eso605');\r\n  src:  url('../fonts/simply.eot?eso605#iefix') format('embedded-opentype'),\r\n    url('../fonts/simply.ttf?eso605') format('truetype'),\r\n    url('../fonts/simply.woff?eso605') format('woff'),\r\n    url('../fonts/simply.svg?eso605#simply') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n\r\n[class^=\"i-\"]::before, [class*=\" i-\"]::before {\r\n  @extend %fonts-icons;\r\n}\r\n\r\n\r\n.i-telegram:before {\r\n  content: \"\\f2c6\";\r\n}\r\n.i-link:before {\r\n  content: \"\\f0c1\";\r\n}\r\n.i-reddit:before {\r\n  content: \"\\f281\";\r\n}\r\n.i-twitter:before {\r\n  content: \"\\f099\";\r\n}\r\n.i-github:before {\r\n  content: \"\\f09b\";\r\n}\r\n.i-linkedin:before {\r\n  content: \"\\f0e1\";\r\n}\r\n.i-code:before {\r\n  content: \"\\f121\";\r\n}\r\n.i-youtube:before {\r\n  content: \"\\f16a\";\r\n}\r\n.i-stack-overflow:before {\r\n  content: \"\\f16c\";\r\n}\r\n.i-instagram:before {\r\n  content: \"\\f16d\";\r\n}\r\n.i-flickr:before {\r\n  content: \"\\f16e\";\r\n}\r\n.i-dribbble:before {\r\n  content: \"\\f17d\";\r\n}\r\n.i-behance:before {\r\n  content: \"\\f1b4\";\r\n}\r\n.i-spotify:before {\r\n  content: \"\\f1bc\";\r\n}\r\n.i-codepen:before {\r\n  content: \"\\f1cb\";\r\n}\r\n.i-facebook:before {\r\n  content: \"\\f230\";\r\n}\r\n.i-pinterest:before {\r\n  content: \"\\f231\";\r\n}\r\n.i-whatsapp:before {\r\n  content: \"\\f232\";\r\n}\r\n.i-snapchat:before {\r\n  content: \"\\f2ac\";\r\n}\r\n.i-comments:before {\r\n  content: \"\\e900\";\r\n}\r\n.i-location:before {\r\n  content: \"\\e8b4\";\r\n}\r\n.i-save:before {\r\n  content: \"\\e8e6\";\r\n}\r\n.i-save--line:before {\r\n  content: \"\\e8e7\";\r\n}\r\n.i-check-circle:before {\r\n  content: \"\\e86c\";\r\n}\r\n.i-close:before {\r\n  content: \"\\e5cd\";\r\n}\r\n.i-favorite:before {\r\n  content: \"\\e87d\";\r\n}\r\n.i-star:before {\r\n  content: \"\\e838\";\r\n}\r\n.i-warning:before {\r\n  content: \"\\e002\";\r\n}\r\n.i-rss:before {\r\n  content: \"\\e0e5\";\r\n}\r\n.i-search:before {\r\n  content: \"\\e8b6\";\r\n}\r\n.i-send:before {\r\n  content: \"\\e163\";\r\n}\r\n.i-share:before {\r\n  content: \"\\e80d\";\r\n}\r\n","// animated Global\r\n.animated {\r\n  animation-duration: 1s;\r\n  animation-fill-mode: both;\r\n\r\n  &.infinite {\r\n    animation-iteration-count: infinite;\r\n  }\r\n}\r\n\r\n// animated All\r\n.bounceIn { animation-name: bounceIn;}\r\n.bounceInDown { animation-name: bounceInDown;}\r\n.pulse { animation-name: pulse; }\r\n\r\n// all keyframes Animates\r\n// bounceIn\r\n@keyframes bounceIn {\r\n  0%,\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80%,\r\n  100% { animation-timing-function: cubic-bezier(.215, .610, .355, 1);}\r\n  0% {opacity: 0; transform: scale3d(.3, .3, .3);}\r\n  20% { transform: scale3d(1.1, 1.1, 1.1);}\r\n  40% { transform: scale3d(.9, .9, .9); }\r\n  60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }\r\n  80% { transform: scale3d(.97, .97, .97); }\r\n  100% { opacity: 1; transform: scale3d(1, 1, 1); }\r\n}\r\n\r\n;\r\n// bounceInDown\r\n@keyframes bounceInDown {\r\n  0%,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  100% { animation-timing-function: cubic-bezier(215, 610, 355, 1); }\r\n  0% { opacity: 0; transform: translate3d(0, -3000px, 0); }\r\n  60% { opacity: 1; transform: translate3d(0, 25px, 0);}\r\n  75% {transform: translate3d(0, -10px, 0);}\r\n  90% {transform: translate3d(0, 5px, 0);}\r\n  100% {transform: none;}\r\n}\r\n\r\n@keyframes pulse {\r\n  from { transform: scale3d(1, 1, 1);}\r\n  50% {transform: scale3d(1.2, 1.2, 1.2);}\r\n  to {transform: scale3d(1, 1, 1); }\r\n}\r\n\r\n\r\n@keyframes scroll {\r\n  0% {opacity: 0;}\r\n  10% {opacity: 1; transform: translateY(0)}\r\n  100% {opacity: 0; transform: translateY(10px);}\r\n}\r\n\r\n@keyframes opacity {\r\n  0% {opacity: 0;}\r\n  50% {opacity: 0;}\r\n  100% {opacity: 1;}\r\n}\r\n\r\n//  spin for pagination\r\n@keyframes spin {\r\n  from {transform: rotate(0deg);}\r\n  to {transform: rotate(360deg);}\r\n}\r\n\r\n@keyframes tooltip {\r\n  0% {opacity: 0; transform: translate(-50%, 6px);}\r\n  100% {opacity: 1; transform: translate(-50%, 0);}\r\n}\r\n\r\n@keyframes loading-bar {\r\n  0% {transform: translateX(-100%)}\r\n  40% {transform: translateX(0)}\r\n  60% {transform: translateX(0)}\r\n  100% {transform: translateX(100%)}\r\n}\r\n","// Header\n// ==========================================================================\n\n.header {\n  z-index: 80;\n\n  &-wrap { height: 55px; }\n\n  &-logo {\n    color: #fff !important;\n    height: 30px;\n\n    img { max-height: 100%; }\n  }\n\n  &-logo,\n  .button-search--open,\n  .button-nav--toggle { z-index: 150; }\n\n  // header description home page\n  &-description {\n    color: rgba(255, 255, 255, 0.8);\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 650px;\n  }\n}\n\n// not have logo\n.not-logo .header-logo { height: auto !important }\n\n// Header Follow\n// ==========================================================================\n\n.follow > a { padding-left: 15px }\n\n// Header menu\n// ==========================================================================\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n\n  ul {\n    display: flex;\n    margin-right: 20px;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n\n  li {\n    float: left;\n\n    a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase;\n    }\n  }\n}\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n// button-nav\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n\n  span {\n    background-color: $header-color;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px;\n\n    &:first-child { transform: translate(0, -6px); }\n    &:last-child { transform: translate(0, 6px); }\n  }\n}\n\n// Media Query\n// ==========================================================================\n\n@media #{$md-and-up} {\n  body.is-home {\n    .header {\n      &-wrap { height: 200px; }\n\n      &-logo {\n        height: 50px;\n      }\n    }\n  }\n\n  // Main Menu Fixed\n  // ==========================================================================\n  // .mainMenu--affixed {\n  //   position: fixed;\n  //   top: 0;\n  // }\n}\n\n// Header menu\n// ==========================================================================\n@media #{$md-and-down} {\n  .header {\n    position: fixed;\n\n    &-wrap { height: $header-height-mobile }\n  }\n\n  .header-logo--wrap { text-align: left }\n\n  .header-top {\n    display: flex;\n    align-items: center;\n  }\n\n  // show menu mobile\n  body.is-showNavMob {\n    overflow: hidden;\n\n    .sideNav { transform: translateX(0); }\n\n    .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg);\n\n      span:first-child { transform: rotate(45deg) translate(0, 0); }\n      span:nth-child(2) { transform: scaleX(0); }\n      span:last-child { transform: rotate(-45deg) translate(0, 0); }\n    }\n\n    .header .button-search--toggle { display: none; }\n    .main, .footer { transform: translateX(-25%); }\n  }\n}\n",".avatar-image--smaller {\n  width: 40px;\n  height: 40px;\n}\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%;\n}\n\n.story {\n  &-title { letter-spacing: -.028em; }\n\n  &-excerpt {\n    display: -webkit-box;\n    margin-top: 5px;\n    max-height: 4.5em;\n    line-height: 1.4;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 3;\n  }\n}\n\n//  media Query\n@media #{$md-and-up} {\n  .story--260 {\n    .story-wrap { height: 260px }\n    .story-image { height: 100px }\n\n    .story-body {\n      height: 160px;\n    }\n  }\n\n  .story--200 {\n    .story-wrap { height: 260px; display: flex }\n\n    .story-body {\n      flex: 1 1 auto;\n      height: 100%;\n    }\n\n    .story-image {\n      flex: 0 0 auto;\n      height: 100%;\n      width: 200px;\n    }\n  }\n}\n",".post {\r\n  &-title {\r\n    line-height: 1.04;\r\n  }\r\n\r\n  // &-footer {\r\n  //   border-bottom: 1px solid rgba(0,0,0,.05);\r\n  // }\r\n}\r\n\r\n\r\n// post content body\r\n// ==========================================================================\r\n.post-body {\r\n  a {\r\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, 0) 50%);\r\n    background-position: 0 1.07em;\r\n    background-repeat: repeat-x;\r\n    background-size: 2px .1em;\r\n    text-decoration: none;\r\n  }\r\n  img {\r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n  }\r\n\r\n  h1, h2, h3, h4, h5, h6 {\r\n    margin-top: 30px;\r\n    font-weight: 700;\r\n    font-style: normal;\r\n  }\r\n\r\n  h2 {\r\n    font-size: 40px;\r\n    letter-spacing: -.03em;\r\n    line-height: 1.04;\r\n    margin-top: 54px;\r\n  }\r\n\r\n  h3 {\r\n    font-size: 32px;\r\n    letter-spacing: -.02em;\r\n    line-height: 1.15;\r\n    margin-top: 52px;\r\n  }\r\n\r\n  h4 {\r\n    font-size: 24px;\r\n    letter-spacing: -.018em;\r\n    line-height: 1.22;\r\n    margin-top: 30px;\r\n  }\r\n\r\n  p {\r\n    font-family: $secundary-font;\r\n    font-size: 21px;\r\n    font-weight: 400;\r\n    letter-spacing: -.003em;\r\n    line-height: 1.58;\r\n    margin-top: 28px;\r\n  }\r\n\r\n  ul,\r\n  ol {\r\n    counter-reset: post;\r\n    font-family: $secundary-font;\r\n    font-size: 21px;\r\n    margin-top: 20px;\r\n\r\n    li {\r\n      letter-spacing: -.003em;\r\n      line-height: 1.58;\r\n      margin-bottom: 14px;\r\n      margin-left: 30px;\r\n\r\n      &::before {\r\n        box-sizing: border-box;\r\n        display: inline-block;\r\n        margin-left: -78px;\r\n        position: absolute;\r\n        text-align: right;\r\n        width: 78px;\r\n      }\r\n    }\r\n  }\r\n\r\n  ul li::before {\r\n    content: 'â¢';\r\n    font-size: 16.8px;\r\n    padding-right: 15px;\r\n    padding-top: 4px;\r\n  }\r\n\r\n  ol li::before {\r\n    content: counter(post) \".\";\r\n    counter-increment: post;\r\n    padding-right: 12px;\r\n  }\r\n\r\n  .twitter-tweet,\r\n  iframe {\r\n    display: block;\r\n    margin-left: auto !important;\r\n    margin-right: auto !important;\r\n    margin-top: 40px !important;\r\n  }\r\n\r\n  .video-responsive iframe { margin-top: 0 !important}\r\n\r\n}\r\n\r\n// fisrt p\r\n.kg-card-markdown > p:first-of-type::first-letter,\r\n.post-body > p:first-of-type::first-letter {\r\n  float: left;\r\n  font-size: 64px;\r\n  font-style: normal;\r\n  font-weight: 700;\r\n  letter-spacing: -.03em;\r\n  line-height: .83;\r\n  margin-bottom: -.08em;\r\n  margin-left: -5px;\r\n  margin-right: 7px;\r\n  padding-top: 7px;\r\n  text-transform: uppercase;\r\n}\r\n\r\n// post Tags\r\n// ==========================================================================\r\n.post-tags {\r\n  a {\r\n    background: rgba(0, 0, 0, .08);\r\n    border: none;\r\n    border-radius: 3px;\r\n    color: rgba(0, 0, 0, .6);\r\n    margin-bottom: 8px;\r\n    margin-right: 8px;\r\n    &:hover {\r\n      background: rgba(0, 0, 0, .1);\r\n      color: rgba(0, 0, 0, .6);\r\n    }\r\n  }\r\n}\r\n\r\n// post Newsletter\r\n// ==========================================================================\r\n\r\n.post-newsletter {\r\n  max-width: 520px;\r\n  .newsletter-form {max-width: 400px}\r\n\r\n  .form-group { width: 80%; padding-right: 5px; }\r\n  .form--input {\r\n    border: 0;\r\n    border-bottom: 1px solid #ccc;\r\n    height: 48px;\r\n    padding: 6px 12px 8px 5px;\r\n    resize: none;\r\n    width: 100%;\r\n    &:focus {\r\n      outline: 0;\r\n    }\r\n  }\r\n  .form--btn {\r\n    background-color: #a9a9a9;\r\n    border-radius: 0 45px 45px 0;\r\n    border: 0;\r\n    color: #fff;\r\n    cursor: pointer;\r\n    padding: 0;\r\n    width: 20%;\r\n\r\n    &::before {\r\n      @extend %u-absolute0;\r\n      background-color: #a9a9a9;\r\n      border-radius: 0 45px 45px 0;\r\n      line-height: 45px;\r\n      z-index: 2;\r\n    }\r\n\r\n    &:hover {opacity: .8; }\r\n    &:focus { outline: 0; }\r\n  }\r\n}\r\n\r\n\r\n// post Relative\r\n// ==========================================================================\r\n.post-related {\r\n  .entry-image {\r\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\r\n    border-radius: 4px 4px 0 0;\r\n    height: 160px;\r\n  }\r\n\r\n  .entry-title {\r\n    color: rgba(0,0,0,.9);\r\n    -webkit-box-orient: vertical !important;\r\n    -webkit-line-clamp: 2 !important;\r\n    display: -webkit-box!important;\r\n    line-height: 1.1 !important;\r\n    max-height: 2.2em !important;\r\n    text-overflow: ellipsis !important;\r\n  }\r\n\r\n  .u-card {\r\n    height: 250px;\r\n    margin-bottom: 20px;\r\n  }\r\n}\r\n\r\n\r\n// Share Post\r\n// ==========================================================================\r\n.sharePost {\r\n  margin-left: -130px;\r\n  margin-top: 28px;\r\n  width: 45px;\r\n\r\n  a {\r\n    background-image: none;\r\n    border-radius: 5px;\r\n    color: #fff;\r\n    height: 36px;\r\n    line-height: 20px;\r\n    margin: 10px auto;\r\n    padding: 8px;\r\n    text-decoration: none;\r\n    width: 36px;\r\n  }\r\n}\r\n\r\n// Post Actions\r\n// ==========================================================================\r\n.postActions {\r\n  background-color: #fff;\r\n  bottom: 0;\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, .44);\r\n  height: 44px;\r\n  left: 0;\r\n  position: fixed;\r\n  right: 0;\r\n  // transform: translateY(100%);\r\n  // transition: transform .3s;\r\n  transform: translate3d(0, 0, 0);\r\n  transition: all 0.25s ease-in-out;\r\n  // visibility: hidden;\r\n  z-index: 400;\r\n\r\n  &.is-visible {\r\n    transform: translateY(100%);\r\n    // transform: translateY(0);\r\n    // transition-delay: 0s;\r\n    // visibility: visible;\r\n  }\r\n\r\n  &-wrap {max-width: 1200px;}\r\n\r\n  .separator {\r\n    background: rgba(0, 0, 0, .15);\r\n    height: 24px;\r\n    margin: 0 15px;\r\n    width: 1px;\r\n  }\r\n}\r\n\r\n.nextPost {\r\n  max-width: 260px;\r\n}\r\n\r\n\r\n@media #{$md-and-down} {\r\n\r\n  .post-body {\r\n\r\n    h2 {\r\n      font-size: 32px;\r\n      margin-top: 26px;\r\n    }\r\n\r\n    h3 {\r\n      font-size: 28px;\r\n      margin-top: 28px;\r\n    }\r\n\r\n    h4 {\r\n      font-size: 22px;\r\n      margin-top: 22px;\r\n    }\r\n\r\n    q {\r\n      font-size: 22px !important;\r\n      letter-spacing: -.008em !important;\r\n      line-height: 1.4 !important;\r\n    }\r\n\r\n    &> p:first-of-type:first-letter {\r\n      font-size: 54.85px;\r\n      margin-left: -4px;\r\n      margin-right: 6px;\r\n      padding-top: 3.5px;\r\n    }\r\n\r\n    ol , ul, p {\r\n      font-size: 18px;\r\n      letter-spacing: -.004em;\r\n      line-height: 1.58;\r\n    }\r\n  }\r\n}\r\n",".author {\r\n  background-color: #fff;\r\n  color: rgba(0, 0, 0, .6);\r\n  min-height: 400px;\r\n\r\n  // a {\r\n  //   color: rgba(0, 0, 0, .8);\r\n  //   &:hover {\r\n  //     color: rgba(0, 0, 0, .6);\r\n  //   }\r\n  // }\r\n\r\n  &-wrap {\r\n    z-index: 2;\r\n  }\r\n\r\n  &-avatar {\r\n    height: 80px;\r\n    margin-right: 10px;\r\n    width: 80px;\r\n  }\r\n\r\n  &-meta {\r\n    span {\r\n      display: inline-block;\r\n      font-size: 17px;\r\n      font-style: italic;\r\n      margin: 0 25px 16px 0;\r\n      opacity: .8;\r\n      word-wrap: break-word;\r\n    }\r\n  }\r\n\r\n  &-name { color: rgba(0,0,0,.8)}\r\n\r\n  &-bio {\r\n    max-width: 600px;\r\n    // color: rgba(0, 0, 0, .6);\r\n  }\r\n}\r\n\r\n\r\n.author.has--image {\r\n  color: #fff !important;\r\n  text-shadow: 0 0 10px rgba(0, 0, 0, .33);\r\n\r\n  .author-link:hover { opacity: 1 !important }\r\n\r\n  .u-accentColor--iconNormal { fill: #fff; }\r\n\r\n  a,\r\n  .author-name { color: #fff; }\r\n\r\n  .author-follow a {\r\n    border: 2px solid;\r\n    border-color: hsla(0, 0%, 100%, .5) !important;\r\n    font-size: 16px;\r\n  }\r\n\r\n}\r\n\r\n@media #{$md-and-down} {\r\n  .author-meta span { display: block; }\r\n  .author-header { display: block; }\r\n  .author-avatar { margin: 0 auto 20px; }\r\n}\r\n","// Search\n// ==========================================================================\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999;\n\n  &-form {\n    max-width: 680px;\n    margin-top: 80px;\n\n    &::before {\n      background: #eee;\n      bottom: 0;\n      content: '';\n      display: block;\n      height: 2px;\n      left: 0;\n      position: absolute;\n      width: 100%;\n      z-index: 1;\n    }\n\n    input {\n      border: none;\n      display: block;\n      line-height: 40px;\n      padding-bottom: 8px;\n\n      &:focus { outline: 0; }\n    }\n  }\n\n  // result\n  &-results {\n    max-height: calc(90% - 100px);\n    max-width: 680px;\n    overflow: auto;\n\n    a {\n      border-bottom: 1px solid #eee;\n      padding: 12px 0;\n\n      &:hover { color: rgba(0, 0, 0, .44) }\n    }\n  }\n}\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px;\n}\n\nbody.is-search {\n  overflow: hidden;\n\n  .search {\n    bottom: 0 !important;\n    height: 100%;\n    transition: all .3s;\n    visibility: visible;\n  }\n}\n",".sidebar {\r\n  &-title {\r\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\r\n    font-weight: 700;\r\n    margin-bottom: 10px;\r\n    padding-bottom: 5px;\r\n  }\r\n\r\n  // border for post\r\n  &-border {\r\n    border-left: 3px solid $primary-color;\r\n    bottom: 0;\r\n    color: rgba(0, 0, 0, .2);\r\n    font-family: $secundary-font;\r\n    left: 0;\r\n    padding: 15px 10px 10px;\r\n    top: 0;\r\n  }\r\n}\r\n\r\n.sidebar-post {\r\n  &:nth-child(3n) { .sidebar-border { border-color: darken(orange, 2%); } }\r\n  &:nth-child(3n+2) { .sidebar-border { border-color: #26a8ed } }\r\n\r\n  &--title {\r\n    line-height: 1.1;\r\n  }\r\n\r\n  &--link {\r\n    background-color: #fff;\r\n    min-height: 50px;\r\n    padding: 15px 15px 15px 55px;\r\n    &:hover { .sidebar-border {background-color: rgba(229,239,245,1);}  }\r\n\r\n  }\r\n}\r\n","// Navigation Mobile\r\n.sideNav {\r\n  // background-color: $primary-color;\r\n  color: rgba(0, 0, 0, 0.8);\r\n  height: 100vh;\r\n  padding: $header-height-mobile 20px;\r\n  position: fixed !important;\r\n  transform: translateX(100%);\r\n  transition: 0.4s;\r\n  will-change: transform;\r\n  z-index: 99;\r\n\r\n  &-menu a { padding: 10px 20px; }\r\n\r\n  &-wrap {\r\n    background: #eee;\r\n    overflow: auto;\r\n    padding: 20px 0;\r\n    top: $header-height-mobile;\r\n  }\r\n\r\n  &-section {\r\n    border-bottom: solid 1px #ddd;\r\n    margin-bottom: 8px;\r\n    padding-bottom: 8px;\r\n  }\r\n\r\n  &-follow {\r\n    border-top: 1px solid #ddd;\r\n    margin: 15px 0;\r\n\r\n    a {\r\n      color: #fff;\r\n      display: inline-block;\r\n      height: 36px;\r\n      line-height: 20px;\r\n      margin: 0 5px 5px 0;\r\n      min-width: 36px;\r\n      padding: 8px;\r\n      text-align: center;\r\n      vertical-align: middle;\r\n    }\r\n\r\n    @each $social-name, $color in $social-colors {\r\n      .i-#{$social-name} {\r\n        @extend .bg-#{$social-name};\r\n      }\r\n    }\r\n  }\r\n}\r\n","@media #{$md-and-up} {\r\n  // background image featured in tag and author\r\n  .is-author.has-featured-image,\r\n  .is-tag.has-featured-image {\r\n    .header,\r\n    .mainMenu {\r\n      background-color: transparent !important;\r\n    }\r\n    .u-headerColorLink a { color: #fff !important; }\r\n\r\n    .main {\r\n      margin-top: -110px;\r\n    }\r\n\r\n    .tag,\r\n    .author {\r\n      padding-top: 120px;\r\n    }\r\n  }\r\n\r\n  // is-article\r\n  .is-article {\r\n    .post-header { padding-top: 35px; }\r\n    .post-body { margin-top: 30px; }\r\n\r\n    .post-image,\r\n    .video-post-format { margin-top: 50px; }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 2 */
/*!***********************************************************!*\
  !*** ../node_modules/html-entities/lib/html5-entities.js ***!
  \***********************************************************/
/*! no static exports found */
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
/* 3 */
/*!**************************!*\
  !*** ./fonts/simply.eot ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.eot";

/***/ }),
/* 4 */
/*!****************************************************************************************!*\
  !*** multi ./build/util/../helpers/hmr-client.js ./scripts/main.js ./styles/main.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Smigol\Projects\joder\content\themes\simply\src\build\util/../helpers/hmr-client.js */5);
__webpack_require__(/*! ./scripts/main.js */19);
module.exports = __webpack_require__(/*! ./styles/main.scss */32);


/***/ }),
/* 5 */
/*!*************************************!*\
  !*** ./build/helpers/hmr-client.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var hotMiddlewareScript = __webpack_require__(/*! webpack-hot-middleware/client?noInfo=true&timeout=20000&reload=true */ 6);

hotMiddlewareScript.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});


/***/ }),
/* 6 */
/*!**********************************************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/client.js?noInfo=true&timeout=20000&reload=true ***!
  \**********************************************************************************************/
/*! no static exports found */
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
  name: ''
};
if (true) {
  var querystring = __webpack_require__(/*! querystring */ 8);
  var overrides = querystring.parse(__resourceQuery.slice(1));
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

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
    "You should include a polyfill if you want to support this browser: " +
    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
  );
} else {
  connect();
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
  var strip = __webpack_require__(/*! strip-ansi */ 11);

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ 13);
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

var processUpdate = __webpack_require__(/*! ./process-update */ 18);

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
    }
  };
}

/* WEBPACK VAR INJECTION */}.call(exports, "?noInfo=true&timeout=20000&reload=true", __webpack_require__(/*! ./../webpack/buildin/module.js */ 7)(module)))

/***/ }),
/* 7 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
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
/* 8 */
/*!************************************************!*\
  !*** ../node_modules/querystring-es3/index.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ 9);
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ 10);


/***/ }),
/* 9 */
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/decode.js ***!
  \*************************************************/
/*! no static exports found */
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
/* 10 */
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/encode.js ***!
  \*************************************************/
/*! no static exports found */
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
/* 11 */
/*!*******************************************!*\
  !*** ../node_modules/strip-ansi/index.js ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ 12)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 12 */
/*!*******************************************!*\
  !*** ../node_modules/ansi-regex/index.js ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 13 */
/*!****************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/client-overlay.js ***!
  \****************************************************************/
/*! no static exports found */
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

var ansiHTML = __webpack_require__(/*! ansi-html */ 14);
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

var Entities = __webpack_require__(/*! html-entities */ 15).AllHtmlEntities;
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
/* 14 */
/*!******************************************!*\
  !*** ../node_modules/ansi-html/index.js ***!
  \******************************************/
/*! no static exports found */
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
/* 15 */
/*!**********************************************!*\
  !*** ../node_modules/html-entities/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ 16),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ 17),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ 2),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ 2)
};


/***/ }),
/* 16 */
/*!*********************************************************!*\
  !*** ../node_modules/html-entities/lib/xml-entities.js ***!
  \*********************************************************/
/*! no static exports found */
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
/* 17 */
/*!***********************************************************!*\
  !*** ../node_modules/html-entities/lib/html4-entities.js ***!
  \***********************************************************/
/*! no static exports found */
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
/* 18 */
/*!****************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/process-update.js ***!
  \****************************************************************/
/*! no static exports found */
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

var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = { ignoreUnaccepted: true };

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
/* 19 */
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sticky_kit_dist_sticky_kit__ = __webpack_require__(/*! sticky-kit/dist/sticky-kit */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sticky_kit_dist_sticky_kit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sticky_kit_dist_sticky_kit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs__ = __webpack_require__(/*! prismjs */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prismjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_plugins_autoloader_prism_autoloader__ = __webpack_require__(/*! prismjs/plugins/autoloader/prism-autoloader */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_plugins_autoloader_prism_autoloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prismjs_plugins_autoloader_prism_autoloader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery_lazyload__ = __webpack_require__(/*! jquery-lazyload */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery_lazyload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_zoom__ = __webpack_require__(/*! ./lib/zoom */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_zoom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__lib_zoom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_transition__ = __webpack_require__(/*! ./lib/transition */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_transition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__lib_transition__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_jquery_ghostHunter__ = __webpack_require__(/*! ./lib/jquery.ghostHunter */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_jquery_ghostHunter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__lib_jquery_ghostHunter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_helper__ = __webpack_require__(/*! ./app/app.helper */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__app_app_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_share__ = __webpack_require__(/*! ./app/app.share */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__app_app_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_pagination__ = __webpack_require__(/*! ./app/app.pagination */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__app_app_pagination__);
/**
 * @package GodoFredoNinja
 * JavaScript functions
 */

// import external dependencies









// import local dependencies




// Variables
var $doc = $(document);
var $win = $(window);

var $body = $('body');
var $pageUrl = $body.attr('data-page');
var $postBody = $('.post-body');
var $shareCount = $('.share-count');
var $share = $('.simply-share');
var $postActions = $('.postActions');
var $followBox = $('.follow-box');
var $comments = $('.post-comments');
var $videoPostFormat = $('.video-post-format');
var $seachInput = $('#search-field');
// const $mainMenu = $('.mainMenu');

var urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line

// const mainMenuOffsetTop = $mainMenu.offset().top;
var postActionsHeight = $postActions.outerHeight();

var scrollTimeOut = true;
var lastYPos = 0;
var yPos = 0;
var yPosDelta = 5;

/* Menu open and close for mobile */
$('.button-nav--toggle').on('click', function (e) {
  e.preventDefault();
  $body.toggleClass('is-showNavMob');
});

/* Search Open */
$('.button-search--open').on('click', function (e) {
  e.preventDefault();
  $body.addClass('is-search');
  $seachInput.focus();
});

/* Search Close */
$('.button-search--close').on('click', function (e) {
  e.preventDefault();
  $body.removeClass('is-search');
});

/* Save Post in facebook*/
$('.fbSave').on('click', function (e) {
  var this$1 = this;

  e.stopPropagation();
  $(this).find('.fbSave-dropdown').toggleClass('is-visible');
  $doc.one('click', function () { return $(this$1).find('.fbSave-dropdown').toggleClass('is-visible'); });
});

/* scroll link width click (ID)*/
$('.scroll-id').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 50 }, 500, 'linear');
});


/* Disqus Comments */
function disqusComments(shortname) {
  var d = document;
  var s = d.createElement('script');
  s.async = true;
  s.src = "//" + shortname + ".disqus.com/embed.js";
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
}

/** show and hidePost Actions in footer of post */
function setPostActionsClass () {
  var heightPostBody = $postBody.outerHeight();
  var headerheight = $('.header').outerHeight();

  scrollTimeOut = false;
  yPos = $win.scrollTop();

  if (yPos < (heightPostBody+headerheight)){
    if (Math.abs(lastYPos - yPos) >= yPosDelta) {
      if (yPos > lastYPos && yPos > postActionsHeight) {
        $postActions.addClass('is-visible');
      } else {
        $postActions.removeClass('is-visible');
      }
      lastYPos = yPos;
    }
  } else {
    $postActions.addClass('is-visible')
  }
}

/* Video Post Format subscribe */
function videoPostFormatSubscribe(){
  if (typeof youtubeChannelName !== 'undefined' && typeof youtubeChannelID !== 'undefined') {
    /*eslint-disable */
    var template = "<div class=\"u-flex u-flexWrap u-paddingTop20 u-fontSize15 u-flexCenter channel-name\">\n      <span class=\"u-paddingRight20\">Subscribe to " + youtubeChannelName + "</span>\n      <div class=\"g-ytsubscribe\" data-channelid=\"" + youtubeChannelID + "\" data-layout=\"default\" data-count=\"default\"></div>\n    </div>";
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
}

/* enable scroll time */
$win.on('scroll', function () { return scrollTimeOut = true; });

$doc.on('ready', function () {
  /** Follow social media */
  if (typeof followSocialMedia !== 'undefined') { __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default.a.followMe(followSocialMedia, $followBox, urlRegexp); } // eslint-disable-line

  /* Featured Post Animation */
  // if ($featuredPost.find('.entry').hover(function() {$featuredPost.find('.entry').removeClass('first'), $(this).addClass('first')}));

  /* add atribute for Zoom img */
  $postBody.find('img').attr('data-action', 'zoom');

  /* Video Post Format */
  __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default.a.videoPostFormat($videoPostFormat); // eslint-disable-line
  videoPostFormatSubscribe();
  /* Video Responsive*/
  __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default.a.videoResponsive($postBody);

  /** Share Count in facebook */
  __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default.a.facebookShareCount($shareCount);

  /* Share article in Social media */
  $share.bind('click', function (e) {
    e.preventDefault();
    var share = new __WEBPACK_IMPORTED_MODULE_8__app_app_share___default.a($(this));
    share.share();
  });

  /* Disqys Comments */
  if (typeof disqusShortName !== 'undefined' && $comments.length > 0) { disqusComments(disqusShortName); } // eslint-disable-line

  /** sticky for Share Post and sidebar sticky */
  $('.sharePost, .sidebar-sticky').stick_in_parent({
    offset_top: 30,
  });

   /* Search Template */
  var searchTemplate = "\n    <a class=\"u-block\" href=\"" + $pageUrl + "{{link}}\">\n      <span class=\"u-contentTitle u-fontSizeBase\">{{title}}</span>\n      <span class=\"u-block u-fontSizeSmaller u-textColorNormal u-paddingTop5\">{{pubDate}}</span>\n    </a>";

  /* Search */
  $seachInput.ghostHunter({
      results: '#searchResults',
      zeroResultsInfo: true,
      info_template: '<p class="u-paddingBottom20 u-fontSize15">Showing {{amount}} results</p>',
      result_template: searchTemplate,
      onKeyUp: true,
    });

  /* rocket to the moon */
  $('.rocket').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0}, 250);
  });

  /* Lazy load for image */
  $('.simply-lazy.lazy').lazyload({threshold : 200});
  $('.cover-lazy.lazy').lazyload({ effect : 'fadeIn'});

  setInterval( function () {
    /* Called the function setPostActionsClass */
    if (scrollTimeOut) { setPostActionsClass(); }

    /* show btn SctrollTop */
    ($win.scrollTop() > 100) ? $('.rocket').removeClass('u-hide') : $('.rocket').addClass('u-hide');
  }, 250);

  /* Prism code syntax autoloader */
  __WEBPACK_IMPORTED_MODULE_1_prismjs___default.a.plugins.autoloader.languages_path = '../assets/scripts/prism-components/';
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 20 */
/*!*****************************************************!*\
  !*** ../node_modules/sticky-kit/dist/sticky-kit.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {// Generated by CoffeeScript 1.6.2
/**
@license Sticky-kit v1.1.3 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
*/


(function() {
  var $, win;

  $ = this.jQuery || __webpack_provided_window_dot_jQuery;

  win = $(window);

  $.fn.stick_in_parent = function(opts) {
    var doc, elm, enable_bottoming, inner_scrolling, manual_spacer, offset_top, outer_width, parent_selector, recalc_every, sticky_class, _fn, _i, _len;

    if (opts == null) {
      opts = {};
    }
    sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
    if (offset_top == null) {
      offset_top = 0;
    }
    if (parent_selector == null) {
      parent_selector = void 0;
    }
    if (inner_scrolling == null) {
      inner_scrolling = true;
    }
    if (sticky_class == null) {
      sticky_class = "is_stuck";
    }
    doc = $(document);
    if (enable_bottoming == null) {
      enable_bottoming = true;
    }
    outer_width = function(el) {
      var computed, w, _el;

      if (window.getComputedStyle) {
        _el = el[0];
        computed = window.getComputedStyle(el[0]);
        w = parseFloat(computed.getPropertyValue("width")) + parseFloat(computed.getPropertyValue("margin-left")) + parseFloat(computed.getPropertyValue("margin-right"));
        if (computed.getPropertyValue("box-sizing") !== "border-box") {
          w += parseFloat(computed.getPropertyValue("border-left-width")) + parseFloat(computed.getPropertyValue("border-right-width")) + parseFloat(computed.getPropertyValue("padding-left")) + parseFloat(computed.getPropertyValue("padding-right"));
        }
        return w;
      } else {
        return el.outerWidth(true);
      }
    };
    _fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
      var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;

      if (elm.data("sticky_kit")) {
        return;
      }
      elm.data("sticky_kit", true);
      last_scroll_height = doc.height();
      parent = elm.parent();
      if (parent_selector != null) {
        parent = parent.closest(parent_selector);
      }
      if (!parent.length) {
        throw "failed to find stick parent";
      }
      fixed = false;
      bottomed = false;
      spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
      if (spacer) {
        spacer.css('position', elm.css('position'));
      }
      recalc = function() {
        var border_top, padding_top, restore;

        if (detached) {
          return;
        }
        last_scroll_height = doc.height();
        border_top = parseInt(parent.css("border-top-width"), 10);
        padding_top = parseInt(parent.css("padding-top"), 10);
        padding_bottom = parseInt(parent.css("padding-bottom"), 10);
        parent_top = parent.offset().top + border_top + padding_top;
        parent_height = parent.height();
        if (fixed) {
          fixed = false;
          bottomed = false;
          if (manual_spacer == null) {
            elm.insertAfter(spacer);
            spacer.detach();
          }
          elm.css({
            position: "",
            top: "",
            width: "",
            bottom: ""
          }).removeClass(sticky_class);
          restore = true;
        }
        top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
        height = elm.outerHeight(true);
        el_float = elm.css("float");
        if (spacer) {
          spacer.css({
            width: outer_width(elm),
            height: height,
            display: elm.css("display"),
            "vertical-align": elm.css("vertical-align"),
            "float": el_float
          });
        }
        if (restore) {
          return tick();
        }
      };
      recalc();
      if (height === parent_height) {
        return;
      }
      last_pos = void 0;
      offset = offset_top;
      recalc_counter = recalc_every;
      tick = function() {
        var css, delta, recalced, scroll, will_bottom, win_height;

        if (detached) {
          return;
        }
        recalced = false;
        if (recalc_counter != null) {
          recalc_counter -= 1;
          if (recalc_counter <= 0) {
            recalc_counter = recalc_every;
            recalc();
            recalced = true;
          }
        }
        if (!recalced && doc.height() !== last_scroll_height) {
          recalc();
          recalced = true;
        }
        scroll = win.scrollTop();
        if (last_pos != null) {
          delta = scroll - last_pos;
        }
        last_pos = scroll;
        if (fixed) {
          if (enable_bottoming) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
            if (bottomed && !will_bottom) {
              bottomed = false;
              elm.css({
                position: "fixed",
                bottom: "",
                top: offset
              }).trigger("sticky_kit:unbottom");
            }
          }
          if (scroll < top) {
            fixed = false;
            offset = offset_top;
            if (manual_spacer == null) {
              if (el_float === "left" || el_float === "right") {
                elm.insertAfter(spacer);
              }
              spacer.detach();
            }
            css = {
              position: "",
              width: "",
              top: ""
            };
            elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
          }
          if (inner_scrolling) {
            win_height = win.height();
            if (height + offset_top > win_height) {
              if (!bottomed) {
                offset -= delta;
                offset = Math.max(win_height - height, offset);
                offset = Math.min(offset_top, offset);
                if (fixed) {
                  elm.css({
                    top: offset + "px"
                  });
                }
              }
            }
          }
        } else {
          if (scroll > top) {
            fixed = true;
            css = {
              position: "fixed",
              top: offset
            };
            css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
            elm.css(css).addClass(sticky_class);
            if (manual_spacer == null) {
              elm.after(spacer);
              if (el_float === "left" || el_float === "right") {
                spacer.append(elm);
              }
            }
            elm.trigger("sticky_kit:stick");
          }
        }
        if (fixed && enable_bottoming) {
          if (will_bottom == null) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
          }
          if (!bottomed && will_bottom) {
            bottomed = true;
            if (parent.css("position") === "static") {
              parent.css({
                position: "relative"
              });
            }
            return elm.css({
              position: "absolute",
              bottom: padding_bottom,
              top: "auto"
            }).trigger("sticky_kit:bottom");
          }
        }
      };
      recalc_and_tick = function() {
        recalc();
        return tick();
      };
      detach = function() {
        detached = true;
        win.off("touchmove", tick);
        win.off("scroll", tick);
        win.off("resize", recalc_and_tick);
        $(document.body).off("sticky_kit:recalc", recalc_and_tick);
        elm.off("sticky_kit:detach", detach);
        elm.removeData("sticky_kit");
        elm.css({
          position: "",
          bottom: "",
          top: "",
          width: ""
        });
        parent.position("position", "");
        if (fixed) {
          if (manual_spacer == null) {
            if (el_float === "left" || el_float === "right") {
              elm.insertAfter(spacer);
            }
            spacer.remove();
          }
          return elm.removeClass(sticky_class);
        }
      };
      win.on("touchmove", tick);
      win.on("scroll", tick);
      win.on("resize", recalc_and_tick);
      $(document.body).on("sticky_kit:recalc", recalc_and_tick);
      elm.on("sticky_kit:detach", detach);
      return setTimeout(tick, 0);
    };
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      elm = this[_i];
      _fn($(elm));
    }
    return this;
  };

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 21 */
/*!****************************************!*\
  !*** ../node_modules/prismjs/prism.js ***!
  \****************************************/
/*! no static exports found */
/*! exports used: default */
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
var lang = /\blang(?:uage)?-(\w+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
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
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					// Check for existence for IE8
					return o.map && o.map(function(v) { return _.util.clone(v); });
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
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || document.querySelectorAll(env.selector);

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

		// Set language on the parent, for styling
		parent = element.parentNode;

		if (/pre/i.test(parent.nodeName)) {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
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
				env.element.textContent = env.code;
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
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	tokenize: function(text, grammar, language) {
		var Token = _.Token;

		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		tokenloop: for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
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
				for (var i=0, pos = 0; i<strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						break tokenloop;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str),
					    delNum = 1;

					// Greedy patterns can override/remove up to two previously matched tokens
					if (!match && greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && p < to; ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						/*
						 * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						 * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
						 */
						if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					}

					if (!match) {
						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1].length;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);
				}
			}
		}

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

	if (env.type == 'comment') {
		env.attributes['spellcheck'] = 'true';
	}

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
 	// In worker
	_self.addEventListener('message', function(evt) {
		var message = JSON.parse(evt.data),
		    lang = message.language,
		    code = message.code,
		    immediateClose = message.immediateClose;

		_self.postMessage(_.highlight(code, _.languages[lang], lang));
		if (immediateClose) {
			_self.close();
		}
	}, false);

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (document.addEventListener && !script.hasAttribute('data-manual')) {
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
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/i,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
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
	'comment': /\/\*[\w\W]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});
	
	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
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
			pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': {
		pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
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

		if(Array.prototype.forEach) { // Check to prevent error in IE8
			Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
				var src = pre.getAttribute('data-src');

				var language, parent = pre;
				var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
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
		}

	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 22)))

/***/ }),
/* 22 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
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
/* 23 */
/*!**********************************************************************!*\
  !*** ../node_modules/prismjs/plugins/autoloader/prism-autoloader.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.createElement) {
		return;
	}

	// The dependencies map is built automatically with gulp
	var lang_dependencies = /*languages_placeholder[*/{"javascript":"clike","actionscript":"javascript","aspnet":"markup","bison":"c","c":"clike","csharp":"clike","cpp":"c","coffeescript":"javascript","crystal":"ruby","css-extras":"css","d":"clike","dart":"clike","fsharp":"clike","glsl":"clike","go":"clike","groovy":"clike","haml":"ruby","handlebars":"markup","haxe":"clike","jade":"javascript","java":"clike","jolie":"clike","kotlin":"clike","less":"css","markdown":"markup","nginx":"clike","objectivec":"c","parser":"markup","php":"clike","php-extras":"php","processing":"clike","protobuf":"clike","qore":"clike","jsx":["markup","javascript"],"reason":"clike","ruby":"clike","sass":"css","scss":"css","scala":"java","smarty":"markup","swift":"clike","textile":"markup","twig":"markup","typescript":"javascript","wiki":"markup"}/*]*/;

	var lang_data = {};

	var ignored_language = 'none';

	var config = Prism.plugins.autoloader = {
		languages_path: 'components/',
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
/* 24 */
/*!**********************************************************!*\
  !*** ../node_modules/jquery-lazyload/jquery.lazyload.js ***!
  \**********************************************************/
/*! no static exports found */
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
/* 25 */
/*!*****************************!*\
  !*** ./scripts/lib/zoom.js ***!
  \*****************************/
/*! no static exports found */
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
/* 26 */
/*!***********************************!*\
  !*** ./scripts/lib/transition.js ***!
  \***********************************/
/*! no static exports found */
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
/* 27 */
/*!*******************************************!*\
  !*** ./scripts/lib/jquery.ghostHunter.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/* eslint-disable */

/**
* ghostHunter - 0.3.5
 * Copyright (C) 2014 Jamal Neufeld (jamal@i11u.me)
 * MIT Licensed
 * @license
*/
(function( $ ) {

	/* Include the Lunr library */
	var lunr=__webpack_require__(/*! lunr */ 28);

	//This is the main plugin definition
	$.fn.ghostHunter 	= function( options ) {

		//Here we use jQuery's extend to set default values if they weren't set by the user
		var opts 		= $.extend( {}, $.fn.ghostHunter.defaults, options );
		if( opts.results )
		{
			pluginMethods.init( this , opts );
			return pluginMethods;
		}
	};

	$.fn.ghostHunter.defaults = {
		resultsData			: false,
		onPageLoad			: false,
		onKeyUp				: false,
		result_template 	: "<a href='{{link}}'><p><h2>{{title}}</h2><h4>{{prettyPubDate}}</h4></p></a>",
		info_template		: "<p>Number of posts found: {{amount}}</p>",
		displaySearchInfo	: true,
		zeroResultsInfo		: true,
		before				: false,
		onComplete			: false,
		includepages		: false,
		filterfields		: false
	};
	var prettyDate = function(date) {
		var d = new Date(date);
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();
	};

	var pluginMethods	= {

		isInit			: false,

		init			: function( target , opts ){
			var that				= this;
			this.target				= target;
			this.results			= opts.results;
			this.blogData			= {};
			this.result_template	= opts.result_template;
			this.info_template		= opts.info_template;
			this.zeroResultsInfo	= opts.zeroResultsInfo;
			this.displaySearchInfo	= opts.displaySearchInfo;
			this.before				= opts.before;
			this.onComplete			= opts.onComplete;
			this.includepages		= opts.includepages;
			this.filterfields		= opts.filterfields;

			//This is where we'll build the index for later searching. It's not a big deal to build it on every load as it takes almost no space without data
			this.index = lunr(function () {
				this.field('title', {boost: 10})
				this.field('description')
				this.field('link')
				this.field('markdown', {boost: 5})
				this.field('pubDate')
				this.field('tag')
				this.ref('id')
			});

			if ( opts.onPageLoad ) {
				that.loadAPI();
			} else {
				target.focus(function(){
					that.loadAPI();
				});
			}

			target.closest("form").submit(function(e){
				e.preventDefault();
				that.find(target.val());
			});

			if( opts.onKeyUp ) {
				target.keyup(function() {
					that.find(target.val());
				});

			}

		},

		loadAPI			: function(){

			if(this.isInit) { return false; }

		/*	Here we load all of the blog posts to the index.
			This function will not call on load to avoid unnecessary heavy
			operations on a page if a visitor never ends up searching anything. */

			var index 		= this.index,
				blogData 	= this.blogData;
				obj			= {limit: "all",  include: "tags"};
							if  ( this.includepages ){
								obj.filter="(page:true,page:false)";
							}


			$.get(ghost.url.api('posts',obj)).done(function(data){
				searchData = data.posts;
				searchData.forEach(function(arrayItem){
					var tag_arr = arrayItem.tags.map(function(v) {
						return v.name; // `tag` object has an `name` property which is the value of tag. If you also want other info, check API and get that property
					})
					if(arrayItem.meta_description == null) { arrayItem.meta_description = '' };
					var category = tag_arr.join(", ");
					if (category.length < 1){
						category = "undefined";
					}
					var parsedData 	= {
						id 			: String(arrayItem.id),
						title 		: String(arrayItem.title),
						description	: String(arrayItem.meta_description),
						markdown 	: String(arrayItem.markdown),
						pubDate 	: String(arrayItem.created_at),
						tag 		: category,
						link 		: String(arrayItem.url)
					}

					parsedData.prettyPubDate = prettyDate(parsedData.pubDate);
					var tempdate = prettyDate(parsedData.pubDate);

					index.add(parsedData)
					blogData[arrayItem.id] = {title: arrayItem.title, description: arrayItem.meta_description, pubDate: tempdate, link: arrayItem.url};
				});
			});
			this.isInit = true;
		},

		find 		 	: function(value){
			var this$1 = this;

			var searchResult 	= this.index.search(value);
			var results 		= $(this.results);
			var resultsData 	= [];
			results.empty();

			if(this.before) {
				this.before();
			};

			if(this.zeroResultsInfo || searchResult.length > 0)
			{
				if(this.displaySearchInfo) { results.append(this.format(this.info_template,{"amount":searchResult.length})); }
			}

			for (var i = 0; i < searchResult.length; i++)
			{
				var lunrref		= searchResult[i].ref;
				var postData  	= this$1.blogData[lunrref];
				results.append(this$1.format(this$1.result_template,postData));
				resultsData.push(postData);
			}

			if(this.onComplete) {
				this.onComplete(resultsData);
			};
		},

		clear 			: function(){
			$(this.results).empty();
			this.target.val("");
		},

		format 			: function (t, d) {
			return t.replace(/{{([^{}]*)}}/g, function (a, b) {
				var r = d[b];
				return typeof r === 'string' || typeof r === 'number' ? r : a;
			});
		}
	}

})( jQuery );

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 28 */
/*!************************************!*\
  !*** ../node_modules/lunr/lunr.js ***!
  \************************************/
/*! no static exports found */
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
/* 29 */
/*!***********************************!*\
  !*** ./scripts/app/app.helper.js ***!
  \***********************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * @package GodoFredoNinja
 * JavaScript modules for helper
 */

/* Iframe SRC video */
var iframeForVideoResponsive = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="facebook.com/plugins/video.php"]',
  'iframe[src*="youtube.com"]',
  'iframe[src*="youtube-nocookie.com"]',
  'iframe[src*="kickstarter.com"][src*="video.html"]' ];

/* Iframe src audio */
var iframeForAudioResponsive = [
  'iframe[src*="w.soundcloud.com"]',
  'iframe[src*="soundcloud.com"]',
  'iframe[src*="embed.spotify.com"]',
  'iframe[src*="spotify.com"]' ];

/* Return rounded and pretty value of share count. */
var convertNumber = function (n) {
  if (n >= 1000000000) { return (((n / 1000000000).toFixed(1)) + "G"); }
  if (n >= 1000000) { return (((n / 1000000).toFixed(1)) + "M"); }
  if (n >= 1000) { return (((n / 1000).toFixed(1)) + "K"); }
  return n;
};

/* search all video in <post-body>  for Responsive*/
function simplyVideoResponsive(elem) {
  var iframe = iframeForAudioResponsive.concat(iframeForVideoResponsive);
  var allVideos = elem.find(iframe.join(','));

  return allVideos.map(function (key, value) { return $(value).wrap('<aside class="video-responsive"></aside>'); });
}

/* Facebook Share Counts */
function simplyFacebookShareCount(sharebox) {
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
}

/* Follow me in my social media*/
function simplyFollowMe(links, box, urlRegexp) {
  return $.each(links, function (name, url) {
    if (typeof url === 'string' && urlRegexp.test(url)) {
      var template = "<a data-event-category=\"FollowMe\" data-event-action=\"Social\" data-event-label=\"" + name + "\" data-event-non-interaction=\"1\" title=\"Follow me in " + name + "\" href=\"" + url + "\" target=\"_blank\" class=\"simply-tracking i-" + name + "\"></a>";
      box.append(template);
    }
  });
}

/* Video Post Format */
function simplyVideoPostFormat (videoPostFormatBox) {
  var firstVideo = $('.post-body').find(iframeForVideoResponsive.join(','))[0];
  $(firstVideo).appendTo(videoPostFormatBox).wrap('<aside class="video-responsive"></aside>');
}

module.exports = {
  videoResponsive: simplyVideoResponsive,
  facebookShareCount: simplyFacebookShareCount,
  followMe: simplyFollowMe,
  videoPostFormat: simplyVideoPostFormat,
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 30 */
/*!**********************************!*\
  !*** ./scripts/app/app.share.js ***!
  \**********************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

/*
* @package godofredoninja
* Share social media
*/

var zetamindsShare = function zetamindsShare(elem) {
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
zetamindsShare.prototype.attributes = function attributes (a) {
  var val = this.elem.attr(("data-" + a));
  return (val === undefined || val === null) ? false : val;
};

/**
 * @description Main share event. Will pop a window or redirect to a link
 */
zetamindsShare.prototype.share = function share () {
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
zetamindsShare.prototype.popup = function popup (share) {
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
module.exports = zetamindsShare;


/***/ }),
/* 31 */
/*!***************************************!*\
  !*** ./scripts/app/app.pagination.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * @package godofredoninja
 * pagination
 */
var $win = $(window);
var $pathname = $('link[rel=canonical]').attr('href');
var $btnLoadMore = $('.loadMore');
var $maxPages = $btnLoadMore.attr('data-page-total');

var scrollTime = false;
var currentPage = 2;

var lastScroll = 0;

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
        $('.simply-lazy.lazy').lazyload({ threshold : 200 });

        $win.on('scroll', onScroll);
      },
      complete: function () {
        setTimeout(function () {$('body').removeClass('is-loading')}, 700);
      },
    });

    /* Disable scroll */
    scrollTime = false;
  } else {
    $btnLoadMore.remove();
  }
}

/* Is visble next page */
function isVisible(element) {
  var scroll_pos = $win.scrollTop();
  var windowHeight = $win.height();
  var elementTop = $(element).offset().top;
  var elementHeight = $(element).height();
  var elementBottom = elementTop + elementHeight;
  return ((elementBottom - elementHeight * 0.25 > scroll_pos) && (elementTop < (scroll_pos + 0.5 * windowHeight)));
}

function historyReplaceState () {
  if ($btnLoadMore.length > 0) {
    var scroll = $win.scrollTop();

    if (Math.abs(scroll - lastScroll) > $win.height() * 0.1) {
      lastScroll = scroll;

      $('.feed-entry-wrap').each(function () {
        if (isVisible($(this))) {
          history.replaceState(null, null, $(this).attr("data-page"));
          return (false);
        }
      });
    }
  }
}

//  window scroll
$win.on('scroll', onScroll);

// set interbal
setInterval(function () {
  fetchPage();
  historyReplaceState();
}, 500);



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 32 */
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./main.scss */ 1);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ 37)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./main.scss */ 1, function() {
			var newContent = __webpack_require__(/*! !../../node_modules/cache-loader/dist/cjs.js!../../node_modules/css-loader??ref--4-3!../../node_modules/postcss-loader/lib??ref--4-4!../../node_modules/resolve-url-loader??ref--4-5!../../node_modules/sass-loader/lib/loader.js??ref--4-6!../../node_modules/import-glob!./main.scss */ 1);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/*!**************************************************!*\
  !*** ../node_modules/css-loader/lib/css-base.js ***!
  \**************************************************/
/*! no static exports found */
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
/* 34 */
/*!**************************!*\
  !*** ./fonts/simply.ttf ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.ttf";

/***/ }),
/* 35 */
/*!***************************!*\
  !*** ./fonts/simply.woff ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.woff";

/***/ }),
/* 36 */
/*!**************************!*\
  !*** ./fonts/simply.svg ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.svg";

/***/ }),
/* 37 */
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! no static exports found */
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
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ 38);

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
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
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
/* 38 */
/*!************************************************!*\
  !*** ../node_modules/style-loader/lib/urls.js ***!
  \************************************************/
/*! no static exports found */
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


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map