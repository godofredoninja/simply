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
/******/ 	var hotCurrentHash = "c157dc7ac0cc0a5c6c20"; // eslint-disable-line no-unused-vars
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

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ 39)(true);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none;\n}\n\n.link--accent:hover {\n  color: #00ab6b;\n}\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.tag.not--image,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection,\npre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection,\ncode[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none;\n  }\n}\n\n/* Code blocks */\n\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0;\n}\n\n/* Inline code */\n\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n.token.punctuation {\n  color: #999;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n.token.function {\n  color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\nimg[data-action=\"zoom\"] {\n  cursor: -webkit-zoom-in;\n  cursor: zoom-in;\n}\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms;\n}\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out;\n}\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1;\n}\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default;\n}\n\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nblockquote p:first-of-type {\n  margin-top: 0;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 16px;\n}\n\nfigure {\n  margin: 0;\n}\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4;\n}\n\ncode[class*=language-] .token.comment,\npre[class*=language-] .token.comment {\n  opacity: .8;\n}\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n}\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -25px;\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\ni {\n  vertical-align: middle;\n}\n\nol,\nul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#d7fdd3), to(#d7fdd3));\n  background-image: -webkit-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: -o-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n}\n\nq::before,\nq::after {\n  display: none;\n}\n\n.link--underline:active,\n.link--underline:focus,\n.link--underline:hover {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.main,\n.footer {\n  -webkit-transition: -webkit-transform .5s ease;\n  transition: -webkit-transform .5s ease;\n  -o-transition: -o-transform .5s ease;\n  transition: transform .5s ease;\n  transition: transform .5s ease, -webkit-transform .5s ease, -o-transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px;\n  }\n}\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n.warning::before {\n  content: \"\\E002\";\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n.note::before {\n  content: \"\\E838\";\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n.success::before {\n  color: #00bfa5;\n  content: \"\\E86C\";\n}\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n  margin-top: -5px;\n}\n\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n}\n\n.tag-wrap {\n  z-index: 2;\n}\n\n.tag.not--image {\n  min-height: auto;\n}\n\n.tag-description {\n  max-width: 500px;\n}\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n.with-tooltip::after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #fff;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 130px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n.with-tooltip:hover::after {\n  -webkit-animation: tooltip .1s ease-out both;\n       -o-animation: tooltip .1s ease-out both;\n          animation: tooltip .1s ease-out both;\n}\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n  padding-bottom: 45px;\n}\n\n.footer .follow a {\n  color: rgba(0, 0, 0, 0.8);\n  padding: 0 7px;\n}\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.footer a:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n}\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  left: 50%;\n  min-width: 680px;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n}\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n.bg-google,\n.sideNav-follow .i-google {\n  background-color: #dd4b39 !important;\n}\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n.c-github {\n  color: #555 !important;\n}\n\n.bg-github,\n.sideNav-follow .i-github {\n  background-color: #555 !important;\n}\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n.bg-linkedin,\n.sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important;\n}\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n.bg-spotify,\n.sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important;\n}\n\n.c-codepen {\n  color: #222 !important;\n}\n\n.bg-codepen,\n.sideNav-follow .i-codepen {\n  background-color: #222 !important;\n}\n\n.c-behance {\n  color: #131418 !important;\n}\n\n.bg-behance,\n.sideNav-follow .i-behance {\n  background-color: #131418 !important;\n}\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n.bg-dribbble,\n.sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n.bg-flickr,\n.sideNav-follow .i-flickr {\n  background-color: #0063dc !important;\n}\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n.bg-reddit,\n.sideNav-follow .i-reddit {\n  background-color: #ff4500 !important;\n}\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n.bg-pocket,\n.sideNav-follow .i-pocket {\n  background-color: #f50057 !important;\n}\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n.bg-pinterest,\n.sideNav-follow .i-pinterest {\n  background-color: #bd081c !important;\n}\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n.bg-whatsapp,\n.sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important;\n}\n\n.c-telegram {\n  color: #08c !important;\n}\n\n.bg-telegram,\n.sideNav-follow .i-telegram {\n  background-color: #08c !important;\n}\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n}\n\n.rocket:hover svg path {\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.svgIcon {\n  display: inline-block;\n}\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  -webkit-animation: loading-bar 1s ease-in-out infinite;\n       -o-animation: loading-bar 1s ease-in-out infinite;\n          animation: loading-bar 1s ease-in-out infinite;\n  -webkit-animation-delay: .8s;\n       -o-animation-delay: .8s;\n          animation-delay: .8s;\n  display: block;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44) !important;\n  fill: rgba(0, 0, 0, 0.44) !important;\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034;\n}\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n.u-headerColorLink a {\n  color: #BBF1B9;\n}\n\n.u-headerColorLink a.active,\n.u-headerColorLink a:hover {\n  color: #EEFFEA;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-fixed {\n  position: fixed !important;\n}\n\n.u-block {\n  display: block !important;\n}\n\n.u-inlineBlock {\n  display: inline-block;\n}\n\n.u-backgroundDark {\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(29%, rgba(0, 0, 0, 0.3)), color-stop(81%, rgba(0, 0, 0, 0.6)));\n  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n.u-clear::before,\n.row::before,\n.u-clear::after,\n.row::after {\n  content: \" \";\n  display: table;\n}\n\n.u-clear::after,\n.row::after {\n  clear: both;\n}\n\n.u-fontSize13 {\n  font-size: 13px;\n}\n\n.u-fontSize14 {\n  font-size: 14px;\n}\n\n.u-fontSize15 {\n  font-size: 15px !important;\n}\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n.u-fontSize28 {\n  font-size: 28px !important;\n}\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important;\n  }\n\n  .u-md-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n.u-fontWeightSemibold {\n  font-weight: 600;\n}\n\n.u-fontWeightBold {\n  font-weight: 700;\n}\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.u-marginTop20 {\n  margin-top: 20px;\n}\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important;\n}\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n.u-padding20 {\n  padding: 20px;\n}\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n.u-paddingRight10 {\n  padding-right: 10px;\n}\n\n.u-paddingLeft15 {\n  padding-left: 15px;\n}\n\n.u-paddingTop2 {\n  padding-top: 2px;\n}\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n.u-lineHeightTight {\n  line-height: 1.2;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-floatRight {\n  float: right;\n}\n\n.u-floatLeft {\n  float: left;\n}\n\n.u-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-flexCenter {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-flex1 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n.u-flex0 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n\n.u-flexWrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.u-flexColumn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.u-flexEnd {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.u-flexColumnTop {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1200 {\n  max-width: 1200px;\n}\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.u-round {\n  border-radius: 50%;\n}\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n.u-boxShadowBottom {\n  -webkit-box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n.u-height540 {\n  height: 540px;\n}\n\n.u-height280 {\n  height: 280px;\n}\n\n.u-height260 {\n  height: 260px;\n}\n\n.u-height100 {\n  height: 100px;\n}\n\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.u-hide {\n  display: none !important;\n}\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  border-radius: 3px;\n  -webkit-box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n          box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important;\n  }\n\n  .u-md-heightAuto {\n    height: auto;\n  }\n\n  .u-md-height170 {\n    height: 170px;\n  }\n\n  .u-md-relative {\n    position: relative;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .content {\n    max-width: calc(100% - 340px) !important;\n  }\n\n  .sidebar {\n    width: 340px !important;\n  }\n}\n\n.row {\n  margin-left: -10px;\n  margin-right: -10px;\n}\n\n.row .col {\n  float: left;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n.row .col.s1 {\n  width: 8.33333%;\n}\n\n.row .col.s2 {\n  width: 16.66667%;\n}\n\n.row .col.s3 {\n  width: 25%;\n}\n\n.row .col.s4 {\n  width: 33.33333%;\n}\n\n.row .col.s5 {\n  width: 41.66667%;\n}\n\n.row .col.s6 {\n  width: 50%;\n}\n\n.row .col.s7 {\n  width: 58.33333%;\n}\n\n.row .col.s8 {\n  width: 66.66667%;\n}\n\n.row .col.s9 {\n  width: 75%;\n}\n\n.row .col.s10 {\n  width: 83.33333%;\n}\n\n.row .col.s11 {\n  width: 91.66667%;\n}\n\n.row .col.s12 {\n  width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  .row .col.m1 {\n    width: 8.33333%;\n  }\n\n  .row .col.m2 {\n    width: 16.66667%;\n  }\n\n  .row .col.m3 {\n    width: 25%;\n  }\n\n  .row .col.m4 {\n    width: 33.33333%;\n  }\n\n  .row .col.m5 {\n    width: 41.66667%;\n  }\n\n  .row .col.m6 {\n    width: 50%;\n  }\n\n  .row .col.m7 {\n    width: 58.33333%;\n  }\n\n  .row .col.m8 {\n    width: 66.66667%;\n  }\n\n  .row .col.m9 {\n    width: 75%;\n  }\n\n  .row .col.m10 {\n    width: 83.33333%;\n  }\n\n  .row .col.m11 {\n    width: 91.66667%;\n  }\n\n  .row .col.m12 {\n    width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .row .col.l1 {\n    width: 8.33333%;\n  }\n\n  .row .col.l2 {\n    width: 16.66667%;\n  }\n\n  .row .col.l3 {\n    width: 25%;\n  }\n\n  .row .col.l4 {\n    width: 33.33333%;\n  }\n\n  .row .col.l5 {\n    width: 41.66667%;\n  }\n\n  .row .col.l6 {\n    width: 50%;\n  }\n\n  .row .col.l7 {\n    width: 58.33333%;\n  }\n\n  .row .col.l8 {\n    width: 66.66667%;\n  }\n\n  .row .col.l9 {\n    width: 75%;\n  }\n\n  .row .col.l10 {\n    width: 83.33333%;\n  }\n\n  .row .col.l11 {\n    width: 91.66667%;\n  }\n\n  .row .col.l12 {\n    width: 100%;\n  }\n}\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.button i {\n  display: inline-block;\n}\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n.button--chromeless:active,\n.button--chromeless:hover,\n.button--chromeless:focus {\n  border-width: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.button--primary {\n  border-color: #00A034;\n  color: #00A034;\n}\n\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n\n.buttonSet > .button:last-child {\n  margin-right: 0;\n}\n\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px;\n}\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(" + __webpack_require__(/*! ./../fonts/simply.eot */ 3) + ");\n  src: url(" + __webpack_require__(/*! ./../fonts/simply.eot */ 3) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(/*! ./../fonts/simply.ttf */ 40) + ") format(\"truetype\"), url(" + __webpack_require__(/*! ./../fonts/simply.woff */ 41) + ") format(\"woff\"), url(" + __webpack_require__(/*! ./../fonts/simply.svg */ 42) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.i-telegram:before {\n  content: \"\\F2C6\";\n}\n\n.i-link:before {\n  content: \"\\F0C1\";\n}\n\n.i-reddit:before {\n  content: \"\\F281\";\n}\n\n.i-twitter:before {\n  content: \"\\F099\";\n}\n\n.i-github:before {\n  content: \"\\F09B\";\n}\n\n.i-linkedin:before {\n  content: \"\\F0E1\";\n}\n\n.i-code:before {\n  content: \"\\F121\";\n}\n\n.i-youtube:before {\n  content: \"\\F16A\";\n}\n\n.i-stack-overflow:before {\n  content: \"\\F16C\";\n}\n\n.i-instagram:before {\n  content: \"\\F16D\";\n}\n\n.i-flickr:before {\n  content: \"\\F16E\";\n}\n\n.i-dribbble:before {\n  content: \"\\F17D\";\n}\n\n.i-behance:before {\n  content: \"\\F1B4\";\n}\n\n.i-spotify:before {\n  content: \"\\F1BC\";\n}\n\n.i-codepen:before {\n  content: \"\\F1CB\";\n}\n\n.i-facebook:before {\n  content: \"\\F230\";\n}\n\n.i-pinterest:before {\n  content: \"\\F231\";\n}\n\n.i-whatsapp:before {\n  content: \"\\F232\";\n}\n\n.i-snapchat:before {\n  content: \"\\F2AC\";\n}\n\n.i-comments:before {\n  content: \"\\E900\";\n}\n\n.i-location:before {\n  content: \"\\E8B4\";\n}\n\n.i-save:before {\n  content: \"\\E8E6\";\n}\n\n.i-save--line:before {\n  content: \"\\E8E7\";\n}\n\n.i-check-circle:before {\n  content: \"\\E86C\";\n}\n\n.i-close:before {\n  content: \"\\E5CD\";\n}\n\n.i-favorite:before {\n  content: \"\\E87D\";\n}\n\n.i-star:before {\n  content: \"\\E838\";\n}\n\n.i-warning:before {\n  content: \"\\E002\";\n}\n\n.i-rss:before {\n  content: \"\\E0E5\";\n}\n\n.i-search:before {\n  content: \"\\E8B6\";\n}\n\n.i-send:before {\n  content: \"\\E163\";\n}\n\n.i-share:before {\n  content: \"\\E80D\";\n}\n\n.animated {\n  -webkit-animation-duration: 1s;\n       -o-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n       -o-animation-fill-mode: both;\n          animation-fill-mode: both;\n}\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n       -o-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n       -o-animation-name: bounceIn;\n          animation-name: bounceIn;\n}\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n       -o-animation-name: bounceInDown;\n          animation-name: bounceInDown;\n}\n\n.pulse {\n  -webkit-animation-name: pulse;\n       -o-animation-name: pulse;\n          animation-name: pulse;\n}\n\n@-webkit-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n       animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n         -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n@-o-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n       animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -o-transform: none;\n       transform: none;\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n         -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n         -o-transform: none;\n            transform: none;\n  }\n}\n\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-o-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -o-transform: translateY(0);\n       transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -o-transform: translateY(10px);\n       transform: translateY(10px);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n         -o-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n         -o-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-webkit-keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@-o-keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-o-keyframes spin {\n  from {\n    -o-transform: rotate(0deg);\n       transform: rotate(0deg);\n  }\n\n  to {\n    -o-transform: rotate(360deg);\n       transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n         -o-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n         -o-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-o-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -o-transform: translate(-50%, 6px);\n       transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -o-transform: translate(-50%, 0);\n       transform: translate(-50%, 0);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n         -o-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n         -o-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-webkit-keyframes loading-bar {\n  0% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n  }\n\n  40% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  60% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n  }\n}\n\n@-o-keyframes loading-bar {\n  0% {\n    -o-transform: translateX(-100%);\n       transform: translateX(-100%);\n  }\n\n  40% {\n    -o-transform: translateX(0);\n       transform: translateX(0);\n  }\n\n  60% {\n    -o-transform: translateX(0);\n       transform: translateX(0);\n  }\n\n  100% {\n    -o-transform: translateX(100%);\n       transform: translateX(100%);\n  }\n}\n\n@keyframes loading-bar {\n  0% {\n    -webkit-transform: translateX(-100%);\n         -o-transform: translateX(-100%);\n            transform: translateX(-100%);\n  }\n\n  40% {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  60% {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  100% {\n    -webkit-transform: translateX(100%);\n         -o-transform: translateX(100%);\n            transform: translateX(100%);\n  }\n}\n\n.header {\n  z-index: 80;\n}\n\n.header-wrap {\n  height: 55px;\n}\n\n.header-logo {\n  color: #fff !important;\n  height: 30px;\n}\n\n.header-logo img {\n  max-height: 100%;\n}\n\n.header-logo,\n.header .button-search--open,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n.header-description {\n  color: rgba(255, 255, 255, 0.8);\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 650px;\n}\n\n.not-logo .header-logo {\n  height: auto !important;\n}\n\n.follow > a {\n  padding-left: 15px;\n}\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n}\n\n.nav ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.nav li {\n  float: left;\n}\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  -webkit-transition: -webkit-transform .4s;\n  transition: -webkit-transform .4s;\n  -o-transition: -o-transform .4s;\n  transition: transform .4s;\n  transition: transform .4s, -webkit-transform .4s, -o-transform .4s;\n  width: 48px;\n}\n\n.button-nav--toggle span {\n  background-color: #BBF1B9;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  -webkit-transition: .4s;\n  -o-transition: .4s;\n  transition: .4s;\n  width: 20px;\n}\n\n.button-nav--toggle span:first-child {\n  -webkit-transform: translate(0, -6px);\n       -o-transform: translate(0, -6px);\n          transform: translate(0, -6px);\n}\n\n.button-nav--toggle span:last-child {\n  -webkit-transform: translate(0, 6px);\n       -o-transform: translate(0, 6px);\n          transform: translate(0, 6px);\n}\n\n@media only screen and (min-width: 766px) {\n  body.is-home .header-wrap {\n    height: 200px;\n  }\n\n  body.is-home .header-logo {\n    height: 50px;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed;\n  }\n\n  .header-wrap {\n    height: 50px;\n  }\n\n  .header-logo--wrap {\n    text-align: left;\n  }\n\n  .header-logo {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n  }\n\n  .header-top {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  body.is-showNavMob .sideNav {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    -webkit-transform: rotate(90deg);\n         -o-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    -webkit-transform: rotate(45deg) translate(0, 0);\n         -o-transform: rotate(45deg) translate(0, 0);\n            transform: rotate(45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    -webkit-transform: scaleX(0);\n         -o-transform: scaleX(0);\n            transform: scaleX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    -webkit-transform: rotate(-45deg) translate(0, 0);\n         -o-transform: rotate(-45deg) translate(0, 0);\n            transform: rotate(-45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    -webkit-transform: translateX(-25%);\n         -o-transform: translateX(-25%);\n            transform: translateX(-25%);\n  }\n}\n\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px;\n}\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%;\n}\n\n.story-title {\n  letter-spacing: -.028em;\n}\n\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 4.5em;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n\n@media only screen and (min-width: 766px) {\n  .story--260 .story-wrap {\n    height: 260px;\n  }\n\n  .story--260 .story-image {\n    height: 100px;\n  }\n\n  .story--260 .story-body {\n    height: 160px;\n  }\n\n  .story--200 .story-wrap {\n    height: 260px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n\n  .story--200 .story-body {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    height: 100%;\n  }\n\n  .story--200 .story-image {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    height: 100%;\n    width: 200px;\n  }\n}\n\n.card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n.card--p {\n  font-family: \"Droid Serif\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.card-image {\n  max-height: 240px;\n  max-width: 360px;\n}\n\n.card.card--large .card-body {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.card.card--large .card-image {\n  height: 200px;\n  margin-bottom: 20px;\n  margin-top: 5px;\n  max-width: 100%;\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1;\n}\n\n.card.card--large .card-image--link {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 100%;\n}\n\n.card.card--medium .card-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n}\n\n.post-title {\n  line-height: 1.04;\n}\n\n.postMetaInline {\n  letter-spacing: 0;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n.post-body a {\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(50%, rgba(0, 0, 0, 0.6)), color-stop(50%, transparent));\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px;\n}\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px;\n}\n\n.post-body ul li,\n.post-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-bottom: 14px;\n  margin-left: 30px;\n}\n\n.post-body ul li::before,\n.post-body ol li::before {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n.post-body ul li::before {\n  content: '\\2022';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px;\n}\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  margin-top: 40px !important;\n}\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important;\n}\n\n.post-body blockquote,\n.post-body dl,\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6,\n.post-body ol,\n.post-body p,\n.post-body pre,\n.post-body ul {\n  min-width: 100%;\n}\n\n.kg-card-markdown {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.kg-card-markdown > p:first-of-type::first-letter,\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.post-newsletter {\n  outline: 1px solid #f0f0f0 !important;\n  outline-offset: -1px;\n  border-radius: 2px;\n  padding: 40px 10px;\n}\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n.post-related-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px;\n}\n\n.post-related-excerpt {\n  font-family: \"Droid Serif\", serif;\n}\n\n.post-related-excerpt,\n.post-related-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n.post-related .u-card {\n  height: 270px;\n  margin-bottom: 20px;\n}\n\n.sharePost {\n  left: -130px;\n  margin-top: 28px;\n  width: 45px;\n  position: absolute !important;\n}\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n          box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transition: all 0.25s ease-in-out;\n  -o-transition: all 0.25s ease-in-out;\n  transition: all 0.25s ease-in-out;\n  z-index: 400;\n}\n\n.postActions.is-visible {\n  -webkit-transform: translateY(100%);\n       -o-transform: translateY(100%);\n          transform: translateY(100%);\n}\n\n.postActions-wrap {\n  max-width: 1200px;\n}\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px;\n  }\n\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px;\n  }\n\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px;\n  }\n\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important;\n  }\n\n  .post-body > p:first-of-type::first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px;\n  }\n\n  .post-body ol,\n  .post-body ul,\n  .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n.author-avatar {\n  height: 80px;\n  width: 80px;\n}\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author-bio {\n  max-width: 600px;\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n.author.has--image .u-accentColor--iconNormal {\n  fill: #fff;\n}\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n.author.has--image .author-follow a {\n  border: 2px solid;\n  border-color: rgba(255, 255, 255, 0.5) !important;\n  font-size: 16px;\n}\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block;\n  }\n\n  .author-header {\n    display: block;\n  }\n\n  .author-avatar {\n    margin: 0 auto 20px;\n  }\n}\n\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999;\n}\n\n.search-form {\n  max-width: 680px;\n  margin-top: 80px;\n}\n\n.search-form::before {\n  background: #eee;\n  bottom: 0;\n  content: '';\n  display: block;\n  height: 2px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n.search-form input {\n  border: none;\n  display: block;\n  line-height: 40px;\n  padding-bottom: 8px;\n}\n\n.search-form input:focus {\n  outline: 0;\n}\n\n.search-results {\n  max-height: calc(90% - 100px);\n  max-width: 680px;\n  overflow: auto;\n}\n\n.search-results a {\n  border-bottom: 1px solid #eee;\n  padding: 12px 0;\n}\n\n.search-results a:hover {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px;\n}\n\nbody.is-search {\n  overflow: hidden;\n}\n\nbody.is-search .search {\n  bottom: 0 !important;\n  height: 100%;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  transition: all .3s;\n  visibility: visible;\n}\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  -webkit-transition: 0.4s;\n  -o-transition: 0.4s;\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n@media only screen and (min-width: 766px) {\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  }\n\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff;\n  }\n\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -56px;\n  }\n\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 100px;\n  }\n\n  .is-article .post-header {\n    padding-top: 35px;\n  }\n\n  .is-article .post-body {\n    margin-top: 30px;\n  }\n\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px;\n  }\n}\n\n", "", {"version":3,"sources":["C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/main.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/common/_mixins.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/main.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/common/_global.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/node_modules/normalize.css/normalize.css","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/node_modules/prismjs/themes/prism.css","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/lib/_zoom.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/common/_typography.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/common/_utilities.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/components/_grid.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/components/_form.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/components/_icons.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/components/_animated.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_header.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_story-card.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_post.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_author.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_search.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_sidebar.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/_sidenav.scss","C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/C:/Users/Smigol/Projects/joder/content/themes/simply/src/styles/src/styles/layouts/helper.scss"],"names":[],"mappings":"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","file":"main.scss","sourcesContent":["@charset \"UTF-8\";\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none; }\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none; }\n  .link--accent:hover {\n    color: #00ab6b; }\n\n.u-absolute0, .post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.tag.not--image, .u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important; }\n\n.warning::before, .note::before, .success::before, [class^=\"i-\"]::before, [class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none; }\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc; }\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc; }\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none; } }\n\n/* Code blocks */\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto; }\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0; }\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal; }\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray; }\n\n.token.punctuation {\n  color: #999; }\n\n.namespace {\n  opacity: .7; }\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905; }\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690; }\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5); }\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a; }\n\n.token.function {\n  color: #DD4A68; }\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90; }\n\n.token.important,\n.token.bold {\n  font-weight: bold; }\n\n.token.italic {\n  font-style: italic; }\n\n.token.entity {\n  cursor: help; }\n\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in; }\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms; }\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out; }\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms; }\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1; }\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default; }\n\n*, *::before, *::after {\n  box-sizing: border-box; }\n\na {\n  color: inherit;\n  text-decoration: none; }\n  a:active, a:hover {\n    outline: 0; }\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px; }\n  blockquote p:first-of-type {\n    margin-top: 0; }\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility; }\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px; }\n\nfigure {\n  margin: 0; }\n\nkbd, samp, code {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap; }\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal; }\n  pre code {\n    background: transparent;\n    color: #37474f;\n    padding: 0;\n    text-shadow: 0 1px #fff; }\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4; }\n  code[class*=language-] .token.comment,\n  pre[class*=language-] .token.comment {\n    opacity: .8; }\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center; }\n  hr::before {\n    color: rgba(0, 0, 0, 0.6);\n    content: '...';\n    display: inline-block;\n    font-family: \"Source Sans Pro\", sans-serif;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -25px; }\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto; }\n  img:not([src]) {\n    visibility: hidden; }\n\ni {\n  vertical-align: middle; }\n\nol, ul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0; }\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8); }\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left; }\n  q::before, q::after {\n    display: none; }\n\n.link--underline:active, .link--underline:focus, .link--underline:hover {\n  color: inherit;\n  text-decoration: underline; }\n\n.main,\n.footer {\n  transition: transform .5s ease; }\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px; } }\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000; }\n  .warning::before {\n    content: \"\"; }\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1; }\n  .note::before {\n    content: \"\"; }\n\n.success {\n  background: #e0f2f1;\n  color: #00897b; }\n  .success::before {\n    color: #00bfa5;\n    content: \"\"; }\n\n.warning, .note, .success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px; }\n  .warning a, .note a, .success a {\n    color: inherit;\n    text-decoration: underline; }\n  .warning::before, .note::before, .success::before {\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n    margin-top: -5px; }\n\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2; }\n  .tag-wrap {\n    z-index: 2; }\n  .tag.not--image {\n    min-height: auto; }\n  .tag-description {\n    max-width: 500px; }\n\n.with-tooltip {\n  overflow: visible;\n  position: relative; }\n  .with-tooltip::after {\n    background: rgba(0, 0, 0, 0.85);\n    border-radius: 4px;\n    color: #fff;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 130px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1; }\n  .with-tooltip:hover::after {\n    animation: tooltip .1s ease-out both; }\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n  padding-bottom: 45px; }\n  .footer .follow a {\n    color: rgba(0, 0, 0, 0.8);\n    padding: 0 7px; }\n  .footer a {\n    color: rgba(0, 0, 0, 0.6); }\n    .footer a:hover {\n      color: rgba(0, 0, 0, 0.8); }\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%; }\n  .errorPage-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px; }\n  .errorPage-text {\n    margin-top: 60px;\n    white-space: pre-wrap; }\n  .errorPage-wrap {\n    color: rgba(0, 0, 0, 0.4);\n    left: 50%;\n    min-width: 680px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%); }\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%; }\n  .video-responsive iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .video-responsive video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n\n.c-facebook {\n  color: #3b5998 !important; }\n\n.bg-facebook, .sideNav-follow .i-facebook {\n  background-color: #3b5998 !important; }\n\n.c-twitter {\n  color: #55acee !important; }\n\n.bg-twitter, .sideNav-follow .i-twitter {\n  background-color: #55acee !important; }\n\n.c-google {\n  color: #dd4b39 !important; }\n\n.bg-google, .sideNav-follow .i-google {\n  background-color: #dd4b39 !important; }\n\n.c-instagram {\n  color: #306088 !important; }\n\n.bg-instagram, .sideNav-follow .i-instagram {\n  background-color: #306088 !important; }\n\n.c-youtube {\n  color: #e52d27 !important; }\n\n.bg-youtube, .sideNav-follow .i-youtube {\n  background-color: #e52d27 !important; }\n\n.c-github {\n  color: #555 !important; }\n\n.bg-github, .sideNav-follow .i-github {\n  background-color: #555 !important; }\n\n.c-linkedin {\n  color: #007bb6 !important; }\n\n.bg-linkedin, .sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important; }\n\n.c-spotify {\n  color: #2ebd59 !important; }\n\n.bg-spotify, .sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important; }\n\n.c-codepen {\n  color: #222 !important; }\n\n.bg-codepen, .sideNav-follow .i-codepen {\n  background-color: #222 !important; }\n\n.c-behance {\n  color: #131418 !important; }\n\n.bg-behance, .sideNav-follow .i-behance {\n  background-color: #131418 !important; }\n\n.c-dribbble {\n  color: #ea4c89 !important; }\n\n.bg-dribbble, .sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important; }\n\n.c-flickr {\n  color: #0063dc !important; }\n\n.bg-flickr, .sideNav-follow .i-flickr {\n  background-color: #0063dc !important; }\n\n.c-reddit {\n  color: #ff4500 !important; }\n\n.bg-reddit, .sideNav-follow .i-reddit {\n  background-color: #ff4500 !important; }\n\n.c-pocket {\n  color: #f50057 !important; }\n\n.bg-pocket, .sideNav-follow .i-pocket {\n  background-color: #f50057 !important; }\n\n.c-pinterest {\n  color: #bd081c !important; }\n\n.bg-pinterest, .sideNav-follow .i-pinterest {\n  background-color: #bd081c !important; }\n\n.c-whatsapp {\n  color: #64d448 !important; }\n\n.bg-whatsapp, .sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important; }\n\n.c-telegram {\n  color: #08c !important; }\n\n.bg-telegram, .sideNav-follow .i-telegram {\n  background-color: #08c !important; }\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888; }\n  .rocket:hover svg path {\n    fill: rgba(0, 0, 0, 0.6); }\n\n.svgIcon {\n  display: inline-block; }\n\nsvg {\n  height: auto;\n  width: 100%; }\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center; }\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800; }\n\n.is-loading .loadingBar {\n  animation: loading-bar 1s ease-in-out infinite;\n  animation-delay: .8s;\n  display: block; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0; }\n  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,\n  .h1 a, .h2 a, .h3 a, .h4 a, .h5 a, .h6 a {\n    color: inherit;\n    line-height: inherit; }\n\nh1 {\n  font-size: 2.25rem; }\n\nh2 {\n  font-size: 1.875rem; }\n\nh3 {\n  font-size: 1.5625rem; }\n\nh4 {\n  font-size: 1.375rem; }\n\nh5 {\n  font-size: 1.125rem; }\n\nh6 {\n  font-size: 1rem; }\n\n.h1 {\n  font-size: 2.25rem; }\n\n.h2 {\n  font-size: 1.875rem; }\n\n.h3 {\n  font-size: 1.5625rem; }\n\n.h4 {\n  font-size: 1.375rem; }\n\n.h5 {\n  font-size: 1.125rem; }\n\n.h6 {\n  font-size: 1rem; }\n\np {\n  margin: 0; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0; }\n  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,\n  .h1 a, .h2 a, .h3 a, .h4 a, .h5 a, .h6 a {\n    color: inherit;\n    line-height: inherit; }\n\nh1 {\n  font-size: 2.25rem; }\n\nh2 {\n  font-size: 1.875rem; }\n\nh3 {\n  font-size: 1.5625rem; }\n\nh4 {\n  font-size: 1.375rem; }\n\nh5 {\n  font-size: 1.125rem; }\n\nh6 {\n  font-size: 1rem; }\n\n.h1 {\n  font-size: 2.25rem; }\n\n.h2 {\n  font-size: 1.875rem; }\n\n.h3 {\n  font-size: 1.5625rem; }\n\n.h4 {\n  font-size: 1.375rem; }\n\n.h5 {\n  font-size: 1.125rem; }\n\n.h6 {\n  font-size: 1rem; }\n\np {\n  margin: 0; }\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44) !important;\n  fill: rgba(0, 0, 0, 0.44) !important; }\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6); }\n\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034; }\n\n.u-bgColor {\n  background-color: #00A034; }\n\n.u-headerColorLink a {\n  color: #BBF1B9; }\n  .u-headerColorLink a.active, .u-headerColorLink a:hover {\n    color: #EEFFEA; }\n\n.u-relative {\n  position: relative; }\n\n.u-absolute {\n  position: absolute; }\n\n.u-fixed {\n  position: fixed !important; }\n\n.u-block {\n  display: block !important; }\n\n.u-inlineBlock {\n  display: inline-block; }\n\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1; }\n\n.u-backgroundWhite {\n  background-color: #fafafa; }\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important; }\n\n.u-clear::before, .row::before, .u-clear::after, .row::after {\n  content: \" \";\n  display: table; }\n\n.u-clear::after, .row::after {\n  clear: both; }\n\n.u-fontSize13 {\n  font-size: 13px; }\n\n.u-fontSize14 {\n  font-size: 14px; }\n\n.u-fontSize15 {\n  font-size: 15px !important; }\n\n.u-fontSize20 {\n  font-size: 20px; }\n\n.u-fontSize22 {\n  font-size: 22px; }\n\n.u-fontSize28 {\n  font-size: 28px !important; }\n\n.u-fontSize36 {\n  font-size: 36px; }\n\n.u-fontSize40 {\n  font-size: 40px; }\n\n.u-fontSizeBase {\n  font-size: 18px; }\n\n.u-fontSizeJumbo {\n  font-size: 50px; }\n\n.u-fontSizeLarge {\n  font-size: 24px !important; }\n\n.u-fontSizeLarger {\n  font-size: 32px; }\n\n.u-fontSizeLargest {\n  font-size: 44px; }\n\n.u-fontSizeMicro {\n  font-size: 11px; }\n\n.u-fontSizeSmall {\n  font-size: 16px; }\n\n.u-fontSizeSmaller {\n  font-size: 14px; }\n\n.u-fontSizeSmallest {\n  font-size: 12px; }\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important; }\n  .u-md-fontSizeLarger {\n    font-size: 32px; } }\n\n.u-fontWeightThin {\n  font-weight: 300; }\n\n.u-fontWeightNormal {\n  font-weight: 400; }\n\n.u-fontWeightSemibold {\n  font-weight: 600; }\n\n.u-fontWeightBold {\n  font-weight: 700; }\n\n.u-textUppercase {\n  text-transform: uppercase; }\n\n.u-textAlignCenter {\n  text-align: center; }\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important; }\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto; }\n\n.u-marginTop20 {\n  margin-top: 20px; }\n\n.u-marginTop30 {\n  margin-top: 30px; }\n\n.u-marginBottom15 {\n  margin-bottom: 15px; }\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important; }\n\n.u-marginBottom30 {\n  margin-bottom: 30px; }\n\n.u-marginBottom40 {\n  margin-bottom: 40px; }\n\n.u-padding0 {\n  padding: 0 !important; }\n\n.u-padding20 {\n  padding: 20px; }\n\n.u-padding15 {\n  padding: 15px !important; }\n\n.u-paddingBottom2 {\n  padding-bottom: 2px; }\n\n.u-paddingBottom30 {\n  padding-bottom: 30px; }\n\n.u-paddingBottom20 {\n  padding-bottom: 20px; }\n\n.u-paddingRight10 {\n  padding-right: 10px; }\n\n.u-paddingLeft15 {\n  padding-left: 15px; }\n\n.u-paddingTop2 {\n  padding-top: 2px; }\n\n.u-paddingTop5 {\n  padding-top: 5px; }\n\n.u-paddingTop10 {\n  padding-top: 10px; }\n\n.u-paddingTop15 {\n  padding-top: 15px; }\n\n.u-paddingTop20 {\n  padding-top: 20px; }\n\n.u-paddingTop30 {\n  padding-top: 30px; }\n\n.u-paddingBottom15 {\n  padding-bottom: 15px; }\n\n.u-paddingRight20 {\n  padding-right: 20px; }\n\n.u-paddingLeft20 {\n  padding-left: 20px; }\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em; }\n\n.u-lineHeight1 {\n  line-height: 1; }\n\n.u-lineHeightTight {\n  line-height: 1.2; }\n\n.u-overflowHidden {\n  overflow: hidden; }\n\n.u-floatRight {\n  float: right; }\n\n.u-floatLeft {\n  float: left; }\n\n.u-flex {\n  display: flex; }\n\n.u-flexCenter {\n  align-items: center;\n  display: flex; }\n\n.u-flex1 {\n  flex: 1 1 auto; }\n\n.u-flex0 {\n  flex: 0 0 auto; }\n\n.u-flexWrap {\n  flex-wrap: wrap; }\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end; }\n\n.u-flexColumnTop {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start; }\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover; }\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px; }\n\n.u-maxWidth1200 {\n  max-width: 1200px; }\n\n.u-maxWidth1000 {\n  max-width: 1000px; }\n\n.u-maxWidth740 {\n  max-width: 740px; }\n\n.u-maxWidth1040 {\n  max-width: 1040px; }\n\n.u-sizeFullWidth {\n  width: 100%; }\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15); }\n\n.u-round {\n  border-radius: 50%; }\n\n.u-borderRadius2 {\n  border-radius: 2px; }\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05); }\n\n.u-height540 {\n  height: 540px; }\n\n.u-height280 {\n  height: 280px; }\n\n.u-height260 {\n  height: 260px; }\n\n.u-height100 {\n  height: 100px; }\n\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1); }\n\n.u-hide {\n  display: none !important; }\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  border-radius: 3px;\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px; }\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important; }\n  .u-md-heightAuto {\n    height: auto; }\n  .u-md-height170 {\n    height: 170px; }\n  .u-md-relative {\n    position: relative; } }\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important; } }\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important; } }\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important; } }\n\n@media only screen and (min-width: 1000px) {\n  .content {\n    max-width: calc(100% - 340px) !important; }\n  .sidebar {\n    width: 340px !important; } }\n\n.row {\n  margin-left: -10px;\n  margin-right: -10px; }\n  .row .col {\n    float: left;\n    padding-left: 10px;\n    padding-right: 10px; }\n    .row .col.s1 {\n      width: 8.33333%; }\n    .row .col.s2 {\n      width: 16.66667%; }\n    .row .col.s3 {\n      width: 25%; }\n    .row .col.s4 {\n      width: 33.33333%; }\n    .row .col.s5 {\n      width: 41.66667%; }\n    .row .col.s6 {\n      width: 50%; }\n    .row .col.s7 {\n      width: 58.33333%; }\n    .row .col.s8 {\n      width: 66.66667%; }\n    .row .col.s9 {\n      width: 75%; }\n    .row .col.s10 {\n      width: 83.33333%; }\n    .row .col.s11 {\n      width: 91.66667%; }\n    .row .col.s12 {\n      width: 100%; }\n    @media only screen and (min-width: 766px) {\n      .row .col.m1 {\n        width: 8.33333%; }\n      .row .col.m2 {\n        width: 16.66667%; }\n      .row .col.m3 {\n        width: 25%; }\n      .row .col.m4 {\n        width: 33.33333%; }\n      .row .col.m5 {\n        width: 41.66667%; }\n      .row .col.m6 {\n        width: 50%; }\n      .row .col.m7 {\n        width: 58.33333%; }\n      .row .col.m8 {\n        width: 66.66667%; }\n      .row .col.m9 {\n        width: 75%; }\n      .row .col.m10 {\n        width: 83.33333%; }\n      .row .col.m11 {\n        width: 91.66667%; }\n      .row .col.m12 {\n        width: 100%; } }\n    @media only screen and (min-width: 1000px) {\n      .row .col.l1 {\n        width: 8.33333%; }\n      .row .col.l2 {\n        width: 16.66667%; }\n      .row .col.l3 {\n        width: 25%; }\n      .row .col.l4 {\n        width: 33.33333%; }\n      .row .col.l5 {\n        width: 41.66667%; }\n      .row .col.l6 {\n        width: 50%; }\n      .row .col.l7 {\n        width: 58.33333%; }\n      .row .col.l8 {\n        width: 66.66667%; }\n      .row .col.l9 {\n        width: 75%; }\n      .row .col.l10 {\n        width: 83.33333%; }\n      .row .col.l11 {\n        width: 91.66667%; }\n      .row .col.l12 {\n        width: 100%; } }\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap; }\n  .button i {\n    display: inline-block; }\n  .button--chromeless {\n    border-radius: 0;\n    border-width: 0;\n    box-shadow: none;\n    color: rgba(0, 0, 0, 0.44);\n    height: auto;\n    line-height: inherit;\n    padding: 0;\n    text-align: left;\n    vertical-align: baseline;\n    white-space: normal; }\n    .button--chromeless:active, .button--chromeless:hover, .button--chromeless:focus {\n      border-width: 0;\n      color: rgba(0, 0, 0, 0.6); }\n  .button--large {\n    font-size: 15px;\n    height: 44px;\n    line-height: 42px;\n    padding: 0 18px; }\n  .button--dark {\n    border-color: rgba(0, 0, 0, 0.6);\n    color: rgba(0, 0, 0, 0.6); }\n    .button--dark:hover {\n      border-color: rgba(0, 0, 0, 0.8);\n      color: rgba(0, 0, 0, 0.8); }\n\n.button--primary {\n  border-color: #00A034;\n  color: #00A034; }\n\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle; }\n\n.buttonSet > .button:last-child {\n  margin-right: 0; }\n\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px; }\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px; }\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px; }\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px; }\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0; }\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0; }\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"../fonts/simply.eot?eso605\");\n  src: url(\"../fonts/simply.eot?eso605#iefix\") format(\"embedded-opentype\"), url(\"../fonts/simply.ttf?eso605\") format(\"truetype\"), url(\"../fonts/simply.woff?eso605\") format(\"woff\"), url(\"../fonts/simply.svg?eso605#simply\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.i-telegram:before {\n  content: \"\\f2c6\"; }\n\n.i-link:before {\n  content: \"\\f0c1\"; }\n\n.i-reddit:before {\n  content: \"\\f281\"; }\n\n.i-twitter:before {\n  content: \"\\f099\"; }\n\n.i-github:before {\n  content: \"\\f09b\"; }\n\n.i-linkedin:before {\n  content: \"\\f0e1\"; }\n\n.i-code:before {\n  content: \"\\f121\"; }\n\n.i-youtube:before {\n  content: \"\\f16a\"; }\n\n.i-stack-overflow:before {\n  content: \"\\f16c\"; }\n\n.i-instagram:before {\n  content: \"\\f16d\"; }\n\n.i-flickr:before {\n  content: \"\\f16e\"; }\n\n.i-dribbble:before {\n  content: \"\\f17d\"; }\n\n.i-behance:before {\n  content: \"\\f1b4\"; }\n\n.i-spotify:before {\n  content: \"\\f1bc\"; }\n\n.i-codepen:before {\n  content: \"\\f1cb\"; }\n\n.i-facebook:before {\n  content: \"\\f230\"; }\n\n.i-pinterest:before {\n  content: \"\\f231\"; }\n\n.i-whatsapp:before {\n  content: \"\\f232\"; }\n\n.i-snapchat:before {\n  content: \"\\f2ac\"; }\n\n.i-comments:before {\n  content: \"\\e900\"; }\n\n.i-location:before {\n  content: \"\\e8b4\"; }\n\n.i-save:before {\n  content: \"\\e8e6\"; }\n\n.i-save--line:before {\n  content: \"\\e8e7\"; }\n\n.i-check-circle:before {\n  content: \"\\e86c\"; }\n\n.i-close:before {\n  content: \"\\e5cd\"; }\n\n.i-favorite:before {\n  content: \"\\e87d\"; }\n\n.i-star:before {\n  content: \"\\e838\"; }\n\n.i-warning:before {\n  content: \"\\e002\"; }\n\n.i-rss:before {\n  content: \"\\e0e5\"; }\n\n.i-search:before {\n  content: \"\\e8b6\"; }\n\n.i-send:before {\n  content: \"\\e163\"; }\n\n.i-share:before {\n  content: \"\\e80d\"; }\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both; }\n  .animated.infinite {\n    animation-iteration-count: infinite; }\n\n.bounceIn {\n  animation-name: bounceIn; }\n\n.bounceInDown {\n  animation-name: bounceInDown; }\n\n.pulse {\n  animation-name: pulse; }\n\n@keyframes bounceIn {\n  0%,\n  20%,\n  40%,\n  60%,\n  80%,\n  100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97); }\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes bounceInDown {\n  0%,\n  60%,\n  75%,\n  90%,\n  100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1); }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    transform: translate3d(0, 5px, 0); }\n  100% {\n    transform: none; } }\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1); }\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes scroll {\n  0% {\n    opacity: 0; }\n  10% {\n    opacity: 1;\n    transform: translateY(0); }\n  100% {\n    opacity: 0;\n    transform: translateY(10px); } }\n\n@keyframes opacity {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px); }\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0); } }\n\n@keyframes loading-bar {\n  0% {\n    transform: translateX(-100%); }\n  40% {\n    transform: translateX(0); }\n  60% {\n    transform: translateX(0); }\n  100% {\n    transform: translateX(100%); } }\n\n.header {\n  z-index: 80; }\n  .header-wrap {\n    height: 55px; }\n  .header-logo {\n    color: #fff !important;\n    height: 30px; }\n    .header-logo img {\n      max-height: 100%; }\n  .header-logo,\n  .header .button-search--open,\n  .header .button-nav--toggle {\n    z-index: 150; }\n  .header-description {\n    color: rgba(255, 255, 255, 0.8);\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 650px; }\n\n.not-logo .header-logo {\n  height: auto !important; }\n\n.follow > a {\n  padding-left: 15px; }\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden; }\n  .nav ul {\n    display: flex;\n    margin-right: 20px;\n    overflow: hidden;\n    white-space: nowrap; }\n  .nav li {\n    float: left; }\n    .nav li a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase; }\n\n.button-search--open {\n  padding-right: 0 !important; }\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px; }\n  .button-nav--toggle span {\n    background-color: #BBF1B9;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px; }\n    .button-nav--toggle span:first-child {\n      transform: translate(0, -6px); }\n    .button-nav--toggle span:last-child {\n      transform: translate(0, 6px); }\n\n@media only screen and (min-width: 766px) {\n  body.is-home .header-wrap {\n    height: 200px; }\n  body.is-home .header-logo {\n    height: 50px; } }\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed; }\n    .header-wrap {\n      height: 50px; }\n  .header-logo--wrap {\n    text-align: left; }\n  .header-logo {\n    display: flex;\n    flex: 1 1 auto; }\n  .header-top {\n    display: flex;\n    align-items: center; }\n  body.is-showNavMob {\n    overflow: hidden; }\n    body.is-showNavMob .sideNav {\n      transform: translateX(0); }\n    body.is-showNavMob .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg); }\n      body.is-showNavMob .button-nav--toggle span:first-child {\n        transform: rotate(45deg) translate(0, 0); }\n      body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n        transform: scaleX(0); }\n      body.is-showNavMob .button-nav--toggle span:last-child {\n        transform: rotate(-45deg) translate(0, 0); }\n    body.is-showNavMob .header .button-search--toggle {\n      display: none; }\n    body.is-showNavMob .main, body.is-showNavMob .footer {\n      transform: translateX(-25%); } }\n\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px; }\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%; }\n\n.story-title {\n  letter-spacing: -.028em; }\n\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 4.5em;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3; }\n\n@media only screen and (min-width: 766px) {\n  .story--260 .story-wrap {\n    height: 260px; }\n  .story--260 .story-image {\n    height: 100px; }\n  .story--260 .story-body {\n    height: 160px; }\n  .story--200 .story-wrap {\n    height: 260px;\n    display: flex; }\n  .story--200 .story-body {\n    flex: 1 1 auto;\n    height: 100%; }\n  .story--200 .story-image {\n    flex: 0 0 auto;\n    height: 100%;\n    width: 200px; } }\n\n.card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px; }\n  .card--p {\n    font-family: \"Droid Serif\", serif;\n    font-style: normal;\n    font-weight: 400;\n    letter-spacing: -.004em;\n    line-height: 1.58; }\n  .card-image {\n    max-height: 240px;\n    max-width: 360px; }\n  .card.card--large .card-body {\n    display: flex;\n    flex-direction: column; }\n  .card.card--large .card-image {\n    height: 200px;\n    margin-bottom: 20px;\n    margin-top: 5px;\n    max-width: 100%;\n    order: -1; }\n  .card.card--large .card-image--link {\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 100%; }\n  .card.card--medium .card-excerpt {\n    color: rgba(0, 0, 0, 0.44);\n    font-family: \"Source Sans Pro\", sans-serif;\n    font-size: 23px;\n    letter-spacing: -.022em;\n    line-height: 1.22; }\n\n.post-title {\n  line-height: 1.04; }\n\n.postMetaInline {\n  letter-spacing: 0;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44); }\n\n.post-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none; }\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.post-body h1, .post-body h2, .post-body h3, .post-body h4, .post-body h5, .post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal; }\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px; }\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px; }\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px; }\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px; }\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px; }\n  .post-body ul li,\n  .post-body ol li {\n    letter-spacing: -.003em;\n    line-height: 1.58;\n    margin-bottom: 14px;\n    margin-left: 30px; }\n    .post-body ul li::before,\n    .post-body ol li::before {\n      box-sizing: border-box;\n      display: inline-block;\n      margin-left: -78px;\n      position: absolute;\n      text-align: right;\n      width: 78px; }\n\n.post-body ul li::before {\n  content: '•';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px; }\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px; }\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  margin-top: 40px !important; }\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important; }\n\n.post-body blockquote,\n.post-body dl,\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6,\n.post-body ol,\n.post-body p,\n.post-body pre,\n.post-body ul {\n  min-width: 100%; }\n\n.kg-card-markdown {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.kg-card-markdown > p:first-of-type::first-letter,\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase; }\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px; }\n  .post-tags a:hover {\n    background: rgba(0, 0, 0, 0.1);\n    color: rgba(0, 0, 0, 0.6); }\n\n.post-newsletter {\n  outline: 1px solid #f0f0f0 !important;\n  outline-offset: -1px;\n  border-radius: 2px;\n  padding: 40px 10px; }\n  .post-newsletter .newsletter-form {\n    max-width: 400px; }\n  .post-newsletter .form-group {\n    width: 80%;\n    padding-right: 5px; }\n  .post-newsletter .form--input {\n    border: 0;\n    border-bottom: 1px solid #ccc;\n    height: 48px;\n    padding: 6px 12px 8px 5px;\n    resize: none;\n    width: 100%; }\n    .post-newsletter .form--input:focus {\n      outline: 0; }\n  .post-newsletter .form--btn {\n    background-color: #a9a9a9;\n    border-radius: 0 45px 45px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    padding: 0;\n    width: 20%; }\n    .post-newsletter .form--btn::before {\n      background-color: #a9a9a9;\n      border-radius: 0 45px 45px 0;\n      line-height: 45px;\n      z-index: 2; }\n    .post-newsletter .form--btn:hover {\n      opacity: .8; }\n    .post-newsletter .form--btn:focus {\n      outline: 0; }\n\n.post-related-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px; }\n\n.post-related-excerpt {\n  font-family: \"Droid Serif\", serif; }\n\n.post-related-excerpt, .post-related-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important; }\n\n.post-related .u-card {\n  height: 270px;\n  margin-bottom: 20px; }\n\n.sharePost {\n  left: -130px;\n  margin-top: 28px;\n  width: 45px;\n  position: absolute !important; }\n  .sharePost a {\n    background-image: none;\n    border-radius: 5px;\n    color: #fff;\n    height: 36px;\n    line-height: 20px;\n    margin: 10px auto;\n    padding: 8px;\n    text-decoration: none;\n    width: 36px; }\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translate3d(0, 0, 0);\n  transition: all 0.25s ease-in-out;\n  z-index: 400; }\n  .postActions.is-visible {\n    transform: translateY(100%); }\n  .postActions-wrap {\n    max-width: 1200px; }\n  .postActions .separator {\n    background: rgba(0, 0, 0, 0.15);\n    height: 24px;\n    margin: 0 15px;\n    width: 1px; }\n\n.nextPost {\n  max-width: 260px; }\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px; }\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px; }\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px; }\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important; }\n  .post-body > p:first-of-type::first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px; }\n  .post-body ol, .post-body ul, .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58; } }\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px; }\n  .author-avatar {\n    height: 80px;\n    width: 80px; }\n  .author-meta span {\n    display: inline-block;\n    font-size: 17px;\n    font-style: italic;\n    margin: 0 25px 16px 0;\n    opacity: .8;\n    word-wrap: break-word; }\n  .author-name {\n    color: rgba(0, 0, 0, 0.8); }\n  .author-bio {\n    max-width: 600px; }\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33); }\n  .author.has--image .author-link:hover {\n    opacity: 1 !important; }\n  .author.has--image .u-accentColor--iconNormal {\n    fill: #fff; }\n  .author.has--image a,\n  .author.has--image .author-name {\n    color: #fff; }\n  .author.has--image .author-follow a {\n    border: 2px solid;\n    border-color: rgba(255, 255, 255, 0.5) !important;\n    font-size: 16px; }\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block; }\n  .author-header {\n    display: block; }\n  .author-avatar {\n    margin: 0 auto 20px; } }\n\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999; }\n  .search-form {\n    max-width: 680px;\n    margin-top: 80px; }\n    .search-form::before {\n      background: #eee;\n      bottom: 0;\n      content: '';\n      display: block;\n      height: 2px;\n      left: 0;\n      position: absolute;\n      width: 100%;\n      z-index: 1; }\n    .search-form input {\n      border: none;\n      display: block;\n      line-height: 40px;\n      padding-bottom: 8px; }\n      .search-form input:focus {\n        outline: 0; }\n  .search-results {\n    max-height: calc(90% - 100px);\n    max-width: 680px;\n    overflow: auto; }\n    .search-results a {\n      border-bottom: 1px solid #eee;\n      padding: 12px 0; }\n      .search-results a:hover {\n        color: rgba(0, 0, 0, 0.44); }\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px; }\n\nbody.is-search {\n  overflow: hidden; }\n  body.is-search .search {\n    bottom: 0 !important;\n    height: 100%;\n    transition: all .3s;\n    visibility: visible; }\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px; }\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0; }\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00; }\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed; }\n\n.sidebar-post--title {\n  line-height: 1.1; }\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px; }\n  .sidebar-post--link:hover .sidebar-border {\n    background-color: #e5eff5; }\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99; }\n  .sideNav-menu a {\n    padding: 10px 20px; }\n  .sideNav-wrap {\n    background: #eee;\n    overflow: auto;\n    padding: 20px 0;\n    top: 50px; }\n  .sideNav-section {\n    border-bottom: solid 1px #ddd;\n    margin-bottom: 8px;\n    padding-bottom: 8px; }\n  .sideNav-follow {\n    border-top: 1px solid #ddd;\n    margin: 15px 0; }\n    .sideNav-follow a {\n      color: #fff;\n      display: inline-block;\n      height: 36px;\n      line-height: 20px;\n      margin: 0 5px 5px 0;\n      min-width: 36px;\n      padding: 8px;\n      text-align: center;\n      vertical-align: middle; }\n\n@media only screen and (min-width: 766px) {\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1); }\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff; }\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -56px; }\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 100px; }\n  .is-article .post-header {\n    padding-top: 35px; }\n  .is-article .post-body {\n    margin-top: 30px; }\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px; } }\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdHlsZXMvbWFpbi5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX3ZhcmlhYmxlcy5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX21peGlucy5zY3NzIiwibm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIm5vZGVfbW9kdWxlcy9wcmlzbWpzL3RoZW1lcy9wcmlzbS5jc3MiLCJzcmMvc3R5bGVzL2xpYi9fem9vbS5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX2dsb2JhbC5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX3R5cG9ncmFwaHkuc2NzcyIsInNyYy9zdHlsZXMvY29tbW9uL190eXBvZ3JhcGh5LnNjc3MiLCJzcmMvc3R5bGVzL2NvbW1vbi9fdXRpbGl0aWVzLnNjc3MiLCJzcmMvc3R5bGVzL2NvbXBvbmVudHMvX2dyaWQuc2NzcyIsInNyYy9zdHlsZXMvY29tcG9uZW50cy9fZm9ybS5zY3NzIiwic3JjL3N0eWxlcy9jb21wb25lbnRzL19pY29ucy5zY3NzIiwic3JjL3N0eWxlcy9jb21wb25lbnRzL19hbmltYXRlZC5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19oZWFkZXIuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fc3RvcnktY2FyZC5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19ob21lcGFnZS5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19wb3N0LnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvX2F1dGhvci5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19zZWFyY2guc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fc2lkZWJhci5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19zaWRlbmF2LnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvaGVscGVyLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuXG4vLyBNaXhpbnMgJiBWYXJpYWJsZXNcbkBpbXBvcnQgXCJjb21tb24vdmFyaWFibGVzXCI7XG5AaW1wb3J0IFwiY29tbW9uL21peGluc1wiO1xuXG4vLyBJbXBvcnQgbnBtIGRlcGVuZGVuY2llc1xuQGltcG9ydCBcIn5ub3JtYWxpemUuY3NzL25vcm1hbGl6ZVwiO1xuQGltcG9ydCBcIn5wcmlzbWpzL3RoZW1lcy9wcmlzbVwiO1xuXG4vLyBpbXBvcnQgbGliXG5AaW1wb3J0IFwibGliL3pvb21cIjtcblxuLy8gY29tbW9uXG5AaW1wb3J0IFwiY29tbW9uL2dsb2JhbFwiO1xuQGltcG9ydCBcImNvbW1vbi90eXBvZ3JhcGh5XCI7XG5AaW1wb3J0IFwiY29tbW9uL3R5cG9ncmFwaHlcIjtcbkBpbXBvcnQgXCJjb21tb24vdXRpbGl0aWVzXCI7XG5cbi8vIGNvbXBvbmVudHNcbkBpbXBvcnQgXCJjb21wb25lbnRzL2dyaWRcIjtcbkBpbXBvcnQgXCJjb21wb25lbnRzL2Zvcm1cIjtcbkBpbXBvcnQgXCJjb21wb25lbnRzL2ljb25zXCI7XG5AaW1wb3J0IFwiY29tcG9uZW50cy9hbmltYXRlZFwiO1xuXG4vL2xheW91dHNcbkBpbXBvcnQgXCJsYXlvdXRzL2hlYWRlclwiO1xuQGltcG9ydCBcImxheW91dHMvc3RvcnktY2FyZFwiO1xuQGltcG9ydCBcImxheW91dHMvaG9tZXBhZ2VcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL3Bvc3RcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL2F1dGhvclwiO1xuQGltcG9ydCBcImxheW91dHMvc2VhcmNoXCI7XG5AaW1wb3J0IFwibGF5b3V0cy9zaWRlYmFyXCI7XG5AaW1wb3J0IFwibGF5b3V0cy9zaWRlbmF2XCI7XG5AaW1wb3J0IFwibGF5b3V0cy9oZWxwZXJcIjtcbiIsIi8vIDEuIENvbG9yc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuJHByaW1hcnktY29sb3I6ICMwMEEwMzQ7XG4kcHJpbWFyeS1jb2xvci1ob3ZlcjogIzAwYWI2YjtcblxuLy8gJHByaW1hcnktY29sb3I6ICMzMzY2OGM7XG4kcHJpbWFyeS1jb2xvci1kYXJrOiAgICMxOTc2ZDI7XG5cbiRwcmltYXJ5LXRleHQtY29sb3I6ICAgcmdiYSgwLCAwLCAwLCAuOCk7XG5cblxuLy8gJHByaW1hcnktY29sb3ItbGlnaHQ6XG4vLyAkcHJpbWFyeS1jb2xvci10ZXh0OlxuLy8gJGFjY2VudC1jb2xvcjpcbi8vICRwcmltYXJ5LXRleHQtY29sb3I6XG4vLyAkc2Vjb25kYXJ5LXRleHQtY29sb3I6XG4vLyAkZGl2aWRlci1jb2xvcjpcblxuLy8gc29jaWFsIGNvbG9yc1xuJHNvY2lhbC1jb2xvcnM6IChcbiAgZmFjZWJvb2s6ICAgIzNiNTk5OCxcbiAgdHdpdHRlcjogICAgIzU1YWNlZSxcbiAgZ29vZ2xlOiAgICAgI2RkNGIzOSxcbiAgaW5zdGFncmFtOiAgIzMwNjA4OCxcbiAgeW91dHViZTogICAgI2U1MmQyNyxcbiAgZ2l0aHViOiAgICAgIzU1NSxcbiAgbGlua2VkaW46ICAgIzAwN2JiNixcbiAgc3BvdGlmeTogICAgIzJlYmQ1OSxcbiAgY29kZXBlbjogICAgIzIyMixcbiAgYmVoYW5jZTogICAgIzEzMTQxOCxcbiAgZHJpYmJibGU6ICAgI2VhNGM4OSxcbiAgZmxpY2tyOiAgICAgIzAwNjNkYyxcbiAgcmVkZGl0OiAgICAgI2ZmNDUwMCxcbiAgcG9ja2V0OiAgICAgI2Y1MDA1NyxcbiAgcGludGVyZXN0OiAgI2JkMDgxYyxcbiAgd2hhdHNhcHA6ICAgIzY0ZDQ0OCxcbiAgdGVsZWdyYW06ICAgIzA4Yyxcbik7XG5cbi8vIDIuIEZvbnRzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kcHJpbWFyeS1mb250OiAgICAnU291cmNlIFNhbnMgUHJvJywgc2Fucy1zZXJpZjsgLy8gZm9udCBkZWZhdWx0IHBhZ2UgYW5kIHRpdGxlc1xuJHNlY3VuZGFyeS1mb250OiAgJ0Ryb2lkIFNlcmlmJywgc2VyaWY7IC8vIGZvbnQgZm9yIGNvbnRlbnRcbiRjb2RlLWZvbnQ6ICAgICAgICdTb3VyY2UgQ29kZSBQcm8nLCBtb25vc3BhY2U7IC8vIGZvbnQgZm9yIGNvZGUgYW5kIHByZVxuXG4vLyAzLiBUeXBvZ3JhcGh5XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kc3BhY2VyOiAgICAgICAgICAxNnB4O1xuJGxpbmUtaGVpZ2h0OiAgICAgMS41O1xuXG4kZm9udC1zaXplLXJvb3Q6ICAxNnB4O1xuXG4kZm9udC1zaXplLWJhc2U6ICAxOHB4O1xuJGZvbnQtc2l6ZS1sZzogICAgMzJweDtcbiRmb250LXNpemUtc206ICAgIC44NzVyZW07IC8vMTRweFxuJGZvbnQtc2l6ZS14czogICAgLjgxMjU7IC8vMTNweFxuXG4kZm9udC1zaXplLWgxOiAgICAyLjI1cmVtO1xuJGZvbnQtc2l6ZS1oMjogICAgMS44NzVyZW07XG4kZm9udC1zaXplLWgzOiAgICAxLjU2MjVyZW07XG4kZm9udC1zaXplLWg0OiAgICAxLjM3NXJlbTtcbiRmb250LXNpemUtaDU6ICAgIDEuMTI1cmVtO1xuJGZvbnQtc2l6ZS1oNjogICAgMXJlbTtcblxuJGhlYWRpbmdzLW1hcmdpbi1ib3R0b206ICAgKCRzcGFjZXIgLyAyKTtcbiRoZWFkaW5ncy1mb250LWZhbWlseTogICAgICRwcmltYXJ5LWZvbnQ7XG4kaGVhZGluZ3MtZm9udC13ZWlnaHQ6ICAgICA2MDA7XG4kaGVhZGluZ3MtbGluZS1oZWlnaHQ6ICAgICAxLjE7XG4kaGVhZGluZ3MtY29sb3I6ICAgICAgICAgICBpbmhlcml0O1xuXG4kZm9udC13ZWlnaHQ6ICAgICAgICAgICAgICA2MDA7XG5cbiRibG9ja3F1b3RlLWZvbnQtc2l6ZTogICAgIDEuMTI1cmVtO1xuXG4vLyBDb250YWluZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiRncmlkLWd1dHRlci13aWR0aDogICAgICAgIDI0cHg7XG5cbiRjb250YWluZXItc206ICAgICAgICAgICAgIDU3NnB4O1xuJGNvbnRhaW5lci1tZDogICAgICAgICAgICAgNzY3cHg7XG4kY29udGFpbmVyLWxnOiAgICAgICAgICAgICA5NzBweDtcbiRjb250YWluZXIteGw6ICAgICAgICAgICAgIDEyMDBweDtcblxuLy8gSGVhZGVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuJGhlYWRlci1jb2xvcjogI0JCRjFCOTtcbiRoZWFkZXItY29sb3ItaG92ZXI6ICNFRUZGRUE7XG4kaGVhZGVyLWhlaWdodC1tb2JpbGU6IDUwcHg7XG5cbi8vIDMuIE1lZGlhIFF1ZXJ5IFJhbmdlc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuJG51bS1jb2xzOiAxMjtcbiRndXR0ZXItd2lkdGg6IDI0cHg7XG4kZWxlbWVudC10b3AtbWFyZ2luOiAkZ3V0dGVyLXdpZHRoIC8gMztcbiRlbGVtZW50LWJvdHRvbS1tYXJnaW46ICgkZ3V0dGVyLXdpZHRoICogMikgLyAzO1xuXG4vLyAzLiBNZWRpYSBRdWVyeSBSYW5nZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiRzbTogICAgICAgICAgICA2NDBweDtcbiRtZDogICAgICAgICAgICA3NjZweDtcbiRsZzogICAgICAgICAgICAxMDAwcHg7XG4keGw6ICAgICAgICAgICAgMTIzMHB4O1xuXG4kc20tYW5kLXVwOiAgICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6ICN7JHNtfSlcIjtcbiRtZC1hbmQtdXA6ICAgICBcIm9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoIDogI3skbWR9KVwiO1xuJGxnLWFuZC11cDogICAgIFwib25seSBzY3JlZW4gYW5kIChtaW4td2lkdGggOiAjeyRsZ30pXCI7XG4keGwtYW5kLXVwOiAgICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6ICN7JHhsfSlcIjtcblxuJHNtLWFuZC1kb3duOiAgIFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOiAjeyRzbX0pXCI7XG4kbWQtYW5kLWRvd246ICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6ICN7JG1kfSlcIjtcbiRsZy1hbmQtZG93bjogICBcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogI3skbGd9KVwiO1xuXG5cbi8vIENvZGUgQ29sb3JcbiRjb2RlLWJnLWNvbG9yOiAgICNmN2Y3Zjc7XG4kZm9udC1zaXplLWNvZGU6ICAxNnB4O1xuJGNvZGUtY29sb3I6ICAgICAgI2M3MjU0ZTtcbiRwcmUtY29kZS1jb2xvcjogICMzNzQ3NGY7XG5cbi8vIGljb25zXG5cbiRpLWNvZGU6IFwiXFxmMTIxXCI7XG4kaS13YXJuaW5nOiBcIlxcZTAwMlwiO1xuJGktY2hlY2s6IFwiXFxlODZjXCI7XG4kaS1zdGFyOiBcIlxcZTgzOFwiO1xuIiwiJWxpbmsge1xuICBjb2xvcjogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbiVsaW5rLS1hY2NlbnQge1xuICBjb2xvcjogJHByaW1hcnktY29sb3I7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgJjpob3ZlciB7IGNvbG9yOiAkcHJpbWFyeS1jb2xvci1ob3ZlcjsgfVxufVxuXG4lY29udGVudC1hYnNvbHV0ZS1ib3R0b20ge1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIG1hcmdpbjogMzBweDtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAyO1xufVxuXG4ldS1hYnNvbHV0ZTAge1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbn1cblxuJXUtdGV4dC1jb2xvci1kYXJrZXIge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCkgIWltcG9ydGFudDtcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAuOCkgIWltcG9ydGFudDtcbn1cblxuJWZvbnRzLWljb25zIHtcbiAgLyogdXNlICFpbXBvcnRhbnQgdG8gcHJldmVudCBpc3N1ZXMgd2l0aCBicm93c2VyIGV4dGVuc2lvbnMgdGhhdCBjaGFuZ2UgZm9udHMgKi9cbiAgZm9udC1mYW1pbHk6ICdzaW1wbHknICFpbXBvcnRhbnQ7XG4gIHNwZWFrOiBub25lO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtdmFyaWFudDogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG5cbiAgLyogQmV0dGVyIEZvbnQgUmVuZGVyaW5nID09PT09PT09PT09ICovXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xufVxuIiwiLyohIG5vcm1hbGl6ZS5jc3MgdjcuMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xuXG4vKiBEb2N1bWVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluXG4gKiAgICBJRSBvbiBXaW5kb3dzIFBob25lIGFuZCBpbiBpT1MuXG4gKi9cblxuaHRtbCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xufVxuXG4vKiBTZWN0aW9uc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMgKG9waW5pb25hdGVkKS5cbiAqL1xuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxuICovXG5cbmFydGljbGUsXG5hc2lkZSxcbmZvb3RlcixcbmhlYWRlcixcbm5hdixcbnNlY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxuICovXG5cbmgxIHtcbiAgZm9udC1zaXplOiAyZW07XG4gIG1hcmdpbjogMC42N2VtIDA7XG59XG5cbi8qIEdyb3VwaW5nIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRS5cbiAqL1xuXG5maWdjYXB0aW9uLFxuZmlndXJlLFxubWFpbiB7IC8qIDEgKi9cbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IG1hcmdpbiBpbiBJRSA4LlxuICovXG5cbmZpZ3VyZSB7XG4gIG1hcmdpbjogMWVtIDQwcHg7XG59XG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxuICovXG5cbmhyIHtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cbiAgaGVpZ2h0OiAwOyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5wcmUge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuICogMi4gUmVtb3ZlIGdhcHMgaW4gbGlua3MgdW5kZXJsaW5lIGluIGlPUyA4KyBhbmQgU2FmYXJpIDgrLlxuICovXG5cbmEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgLyogMSAqL1xuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1za2lwOiBvYmplY3RzOyAvKiAyICovXG59XG5cbi8qKlxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny0gYW5kIEZpcmVmb3ggMzktLlxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXG59XG5cbi8qKlxuICogUHJldmVudCB0aGUgZHVwbGljYXRlIGFwcGxpY2F0aW9uIG9mIGBib2xkZXJgIGJ5IHRoZSBuZXh0IHJ1bGUgaW4gU2FmYXJpIDYuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXG4gKi9cblxuYixcbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHN0eWxlIGluIEFuZHJvaWQgNC4zLS5cbiAqL1xuXG5kZm4ge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGJhY2tncm91bmQgYW5kIGNvbG9yIGluIElFIDktLlxuICovXG5cbm1hcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwO1xuICBjb2xvcjogIzAwMDtcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zbWFsbCB7XG4gIGZvbnQtc2l6ZTogODAlO1xufVxuXG4vKipcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxuICogYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1YixcbnN1cCB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbnN1YiB7XG4gIGJvdHRvbTogLTAuMjVlbTtcbn1cblxuc3VwIHtcbiAgdG9wOiAtMC41ZW07XG59XG5cbi8qIEVtYmVkZGVkIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKi9cblxuYXVkaW8sXG52aWRlbyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBpT1MgNC03LlxuICovXG5cbmF1ZGlvOm5vdChbY29udHJvbHNdKSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGhlaWdodDogMDtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLS5cbiAqL1xuXG5pbWcge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qKlxuICogSGlkZSB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKi9cblxuc3ZnOm5vdCg6cm9vdCkge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vKiBGb3Jtc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQgeyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbixcbnNlbGVjdCB7IC8qIDEgKi9cbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG59XG5cbi8qKlxuICogMS4gUHJldmVudCBhIFdlYktpdCBidWcgd2hlcmUgKDIpIGRlc3Ryb3lzIG5hdGl2ZSBgYXVkaW9gIGFuZCBgdmlkZW9gXG4gKiAgICBjb250cm9scyBpbiBBbmRyb2lkIDQuXG4gKiAyLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmh0bWwgW3R5cGU9XCJidXR0b25cIl0sIC8qIDEgKi9cblt0eXBlPVwicmVzZXRcIl0sXG5bdHlwZT1cInN1Ym1pdFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cImJ1dHRvblwiXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPVwicmVzZXRcIl06Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cInN1Ym1pdFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLyoqXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXG4gKi9cblxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJidXR0b25cIl06LW1vei1mb2N1c3JpbmcsXG5bdHlwZT1cInJlc2V0XCJdOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJzdWJtaXRcIl06LW1vei1mb2N1c3Jpbmcge1xuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmZpZWxkc2V0IHtcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5sZWdlbmQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAzICovXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IC8qIDEgKi9cbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRS5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLS5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC0uXG4gKi9cblxuW3R5cGU9XCJjaGVja2JveFwiXSxcblt0eXBlPVwicmFkaW9cIl0ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5bdHlwZT1cIm51bWJlclwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgYW5kIGNhbmNlbCBidXR0b25zIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxuW3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUsIGFuZCBGaXJlZm94LlxuICovXG5cbmRldGFpbHMsIC8qIDEgKi9cbm1lbnUge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdW1tYXJ5IHtcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xufVxuXG4vKiBTY3JpcHRpbmdcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKi9cblxuY2FudmFzIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyogSGlkZGVuXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLS5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iLCIvKipcbiAqIHByaXNtLmpzIGRlZmF1bHQgdGhlbWUgZm9yIEphdmFTY3JpcHQsIENTUyBhbmQgSFRNTFxuICogQmFzZWQgb24gZGFiYmxldCAoaHR0cDovL2RhYmJsZXQuY29tKVxuICogQGF1dGhvciBMZWEgVmVyb3VcbiAqL1xuXG5jb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSxcbnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0ge1xuXHRjb2xvcjogYmxhY2s7XG5cdGJhY2tncm91bmQ6IG5vbmU7XG5cdHRleHQtc2hhZG93OiAwIDFweCB3aGl0ZTtcblx0Zm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sICdBbmRhbGUgTW9ubycsICdVYnVudHUgTW9ubycsIG1vbm9zcGFjZTtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0d2hpdGUtc3BhY2U6IHByZTtcblx0d29yZC1zcGFjaW5nOiBub3JtYWw7XG5cdHdvcmQtYnJlYWs6IG5vcm1hbDtcblx0d29yZC13cmFwOiBub3JtYWw7XG5cdGxpbmUtaGVpZ2h0OiAxLjU7XG5cblx0LW1vei10YWItc2l6ZTogNDtcblx0LW8tdGFiLXNpemU6IDQ7XG5cdHRhYi1zaXplOiA0O1xuXG5cdC13ZWJraXQtaHlwaGVuczogbm9uZTtcblx0LW1vei1oeXBoZW5zOiBub25lO1xuXHQtbXMtaHlwaGVuczogbm9uZTtcblx0aHlwaGVuczogbm9uZTtcbn1cblxucHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTo6LW1vei1zZWxlY3Rpb24sIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjotbW96LXNlbGVjdGlvbixcbmNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOjotbW96LXNlbGVjdGlvbiwgY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjotbW96LXNlbGVjdGlvbiB7XG5cdHRleHQtc2hhZG93OiBub25lO1xuXHRiYWNrZ3JvdW5kOiAjYjNkNGZjO1xufVxuXG5wcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOjpzZWxlY3Rpb24sIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjpzZWxlY3Rpb24sXG5jb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTo6c2VsZWN0aW9uLCBjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSA6OnNlbGVjdGlvbiB7XG5cdHRleHQtc2hhZG93OiBub25lO1xuXHRiYWNrZ3JvdW5kOiAjYjNkNGZjO1xufVxuXG5AbWVkaWEgcHJpbnQge1xuXHRjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSxcblx0cHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7XG5cdFx0dGV4dC1zaGFkb3c6IG5vbmU7XG5cdH1cbn1cblxuLyogQ29kZSBibG9ja3MgKi9cbnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0ge1xuXHRwYWRkaW5nOiAxZW07XG5cdG1hcmdpbjogLjVlbSAwO1xuXHRvdmVyZmxvdzogYXV0bztcbn1cblxuOm5vdChwcmUpID4gY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sXG5wcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0YmFja2dyb3VuZDogI2Y1ZjJmMDtcbn1cblxuLyogSW5saW5lIGNvZGUgKi9cbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0cGFkZGluZzogLjFlbTtcblx0Ym9yZGVyLXJhZGl1czogLjNlbTtcblx0d2hpdGUtc3BhY2U6IG5vcm1hbDtcbn1cblxuLnRva2VuLmNvbW1lbnQsXG4udG9rZW4ucHJvbG9nLFxuLnRva2VuLmRvY3R5cGUsXG4udG9rZW4uY2RhdGEge1xuXHRjb2xvcjogc2xhdGVncmF5O1xufVxuXG4udG9rZW4ucHVuY3R1YXRpb24ge1xuXHRjb2xvcjogIzk5OTtcbn1cblxuLm5hbWVzcGFjZSB7XG5cdG9wYWNpdHk6IC43O1xufVxuXG4udG9rZW4ucHJvcGVydHksXG4udG9rZW4udGFnLFxuLnRva2VuLmJvb2xlYW4sXG4udG9rZW4ubnVtYmVyLFxuLnRva2VuLmNvbnN0YW50LFxuLnRva2VuLnN5bWJvbCxcbi50b2tlbi5kZWxldGVkIHtcblx0Y29sb3I6ICM5MDU7XG59XG5cbi50b2tlbi5zZWxlY3Rvcixcbi50b2tlbi5hdHRyLW5hbWUsXG4udG9rZW4uc3RyaW5nLFxuLnRva2VuLmNoYXIsXG4udG9rZW4uYnVpbHRpbixcbi50b2tlbi5pbnNlcnRlZCB7XG5cdGNvbG9yOiAjNjkwO1xufVxuXG4udG9rZW4ub3BlcmF0b3IsXG4udG9rZW4uZW50aXR5LFxuLnRva2VuLnVybCxcbi5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZyxcbi5zdHlsZSAudG9rZW4uc3RyaW5nIHtcblx0Y29sb3I6ICNhNjdmNTk7XG5cdGJhY2tncm91bmQ6IGhzbGEoMCwgMCUsIDEwMCUsIC41KTtcbn1cblxuLnRva2VuLmF0cnVsZSxcbi50b2tlbi5hdHRyLXZhbHVlLFxuLnRva2VuLmtleXdvcmQge1xuXHRjb2xvcjogIzA3YTtcbn1cblxuLnRva2VuLmZ1bmN0aW9uIHtcblx0Y29sb3I6ICNERDRBNjg7XG59XG5cbi50b2tlbi5yZWdleCxcbi50b2tlbi5pbXBvcnRhbnQsXG4udG9rZW4udmFyaWFibGUge1xuXHRjb2xvcjogI2U5MDtcbn1cblxuLnRva2VuLmltcG9ydGFudCxcbi50b2tlbi5ib2xkIHtcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4udG9rZW4uaXRhbGljIHtcblx0Zm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4udG9rZW4uZW50aXR5IHtcblx0Y3Vyc29yOiBoZWxwO1xufVxuIiwiaW1nW2RhdGEtYWN0aW9uPVwiem9vbVwiXSB7XHJcbiAgY3Vyc29yOiB6b29tLWluO1xyXG59XHJcbi56b29tLWltZyxcclxuLnpvb20taW1nLXdyYXAge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB6LWluZGV4OiA2NjY7XHJcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbiAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbn1cclxuaW1nLnpvb20taW1nIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgY3Vyc29yOiAtd2Via2l0LXpvb20tb3V0O1xyXG4gIGN1cnNvcjogLW1vei16b29tLW91dDtcclxufVxyXG4uem9vbS1vdmVybGF5IHtcclxuICB6LWluZGV4OiA0MjA7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gIGZpbHRlcjogXCJhbHBoYShvcGFjaXR5PTApXCI7XHJcbiAgb3BhY2l0eTogMDtcclxuICAtd2Via2l0LXRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxuICAgICAgIC1vLXRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxuICAgICAgICAgIHRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxufVxyXG4uem9vbS1vdmVybGF5LW9wZW4gLnpvb20tb3ZlcmxheSB7XHJcbiAgZmlsdGVyOiBcImFscGhhKG9wYWNpdHk9MTAwKVwiO1xyXG4gIG9wYWNpdHk6IDE7XHJcbn1cclxuLnpvb20tb3ZlcmxheS1vcGVuLFxyXG4uem9vbS1vdmVybGF5LXRyYW5zaXRpb25pbmcge1xyXG4gIGN1cnNvcjogZGVmYXVsdDtcclxufVxyXG4iLCJcbiosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5hIHtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblxuICAmOmFjdGl2ZSxcbiAgJjpob3ZlciB7XG4gICAgb3V0bGluZTogMDtcbiAgfVxufVxuXG5ibG9ja3F1b3RlIHtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC44KTtcbiAgZm9udC1mYW1pbHk6ICRzZWN1bmRhcnktZm9udDtcbiAgZm9udC1zaXplOiAyMXB4O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxldHRlci1zcGFjaW5nOiAtLjAwM2VtO1xuICBsaW5lLWhlaWdodDogMS41ODtcbiAgbWFyZ2luLWxlZnQ6IC0yM3B4O1xuICBwYWRkaW5nLWJvdHRvbTogMnB4O1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG5cbiAgcDpmaXJzdC1vZi10eXBlIHsgbWFyZ2luLXRvcDogMCB9XG59XG5cbmJvZHkge1xuICBjb2xvcjogJHByaW1hcnktdGV4dC1jb2xvcjtcbiAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xuICBsaW5lLWhlaWdodDogMS40O1xuICBtYXJnaW46IDAgYXV0bztcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbn1cblxuLy9EZWZhdWx0IHN0eWxlc1xuaHRtbCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1yb290O1xufVxuXG5maWd1cmUge1xuICBtYXJnaW46IDA7XG59XG5cbi8vIENvZGVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5rYmQsIHNhbXAsIGNvZGUge1xuICBiYWNrZ3JvdW5kOiAkY29kZS1iZy1jb2xvcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjb2xvcjogJGNvZGUtY29sb3I7XG4gIGZvbnQtZmFtaWx5OiAkY29kZS1mb250ICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1jb2RlO1xuICBwYWRkaW5nOiA0cHggNnB4O1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbnByZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2RlLWJnLWNvbG9yICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1mYW1pbHk6ICRjb2RlLWZvbnQgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAkZm9udC1zaXplLWNvZGU7XG4gIG1hcmdpbi10b3A6IDMwcHggIWltcG9ydGFudDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAxcmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuXG4gIGNvZGUge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGNvbG9yOiAkcHJlLWNvZGUtY29sb3I7XG4gICAgcGFkZGluZzogMDtcbiAgICB0ZXh0LXNoYWRvdzogMCAxcHggI2ZmZjtcbiAgfVxufVxuXG5jb2RlW2NsYXNzKj1sYW5ndWFnZS1dLFxucHJlW2NsYXNzKj1sYW5ndWFnZS1dIHtcbiAgY29sb3I6ICRwcmUtY29kZS1jb2xvcjtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcblxuICAudG9rZW4uY29tbWVudCB7IG9wYWNpdHk6IC44OyB9XG59XG5cbi8vIGhyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaHIge1xuICBib3JkZXI6IDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDUwcHggYXV0bztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgIGNvbnRlbnQ6ICcuLi4nO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBsZXR0ZXItc3BhY2luZzogLjZlbTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAtMjVweDtcbiAgfVxufVxuXG5pbWcge1xuICBoZWlnaHQ6IGF1dG87XG4gIG1heC13aWR0aDogMTAwJTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6IGF1dG87XG5cbiAgJjpub3QoW3NyY10pIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbn1cblxuaSB7XG4gIC8vIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxub2wsIHVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgbGlzdC1zdHlsZS1pbWFnZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG5tYXJrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgyMTUsIDI1MywgMjExLCAxKSwgcmdiYSgyMTUsIDI1MywgMjExLCAxKSk7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC44KTtcbn1cblxucSB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDI4cHg7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC0uMDE0ZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjQ4O1xuICBwYWRkaW5nLWxlZnQ6IDUwcHg7XG4gIHBhZGRpbmctdG9wOiAxNXB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuXG4gICY6OmJlZm9yZSwgJjo6YWZ0ZXIgeyBkaXNwbGF5OiBub25lOyB9XG59XG5cbi8vIExpbmtzIGNvbG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmxpbmstLWFjY2VudCB7IEBleHRlbmQgJWxpbmstLWFjY2VudDsgfVxuXG4ubGluayB7IEBleHRlbmQgJWxpbms7IH1cblxuLmxpbmstLXVuZGVybGluZSB7XG4gICY6YWN0aXZlLFxuICAmOmZvY3VzLFxuICAmOmhvdmVyIHtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxufVxuXG4vLyBBbmltYXRpb24gbWFpbiBwYWdlIGFuZCBmb290ZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ubWFpbixcbi5mb290ZXIgeyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjVzIGVhc2U7IH1cblxuQG1lZGlhICN7JG1kLWFuZC1kb3dufSB7XG4gIC5tYWluIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHBhZGRpbmctdG9wOiAkaGVhZGVyLWhlaWdodC1tb2JpbGU7XG4gIH1cbn1cblxuLy8gd2FybmluZyBzdWNjZXNzIGFuZCBOb3RlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLndhcm5pbmcge1xuICBiYWNrZ3JvdW5kOiAjZmJlOWU3O1xuICBjb2xvcjogI2Q1MDAwMDtcbiAgJjo6YmVmb3JlIHsgY29udGVudDogJGktd2FybmluZzsgfVxufVxuXG4ubm90ZSB7XG4gIGJhY2tncm91bmQ6ICNlMWY1ZmU7XG4gIGNvbG9yOiAjMDI4OGQxO1xuICAmOjpiZWZvcmUgeyBjb250ZW50OiAkaS1zdGFyOyB9XG59XG5cbi5zdWNjZXNzIHtcbiAgYmFja2dyb3VuZDogI2UwZjJmMTtcbiAgY29sb3I6ICMwMDg5N2I7XG4gICY6OmJlZm9yZSB7IGNvbG9yOiAjMDBiZmE1OyBjb250ZW50OiAkaS1jaGVjazsgfVxufVxuXG4ud2FybmluZywgLm5vdGUsIC5zdWNjZXNzIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMThweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogMS41OCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAyOHB4O1xuICBwYWRkaW5nOiAxMnB4IDI0cHggMTJweCA2MHB4O1xuXG4gIGEge1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB9XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBAZXh0ZW5kICVmb250cy1pY29ucztcblxuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBtYXJnaW4tbGVmdDogLTM2cHg7XG4gICAgbWFyZ2luLXRvcDogLTVweDtcbiAgfVxufVxuXG4vLyBQYWdlIFRhZ3Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4udGFnIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICB6LWluZGV4OiAyO1xuXG4gICYtd3JhcCB7IHotaW5kZXg6IDI7IH1cblxuICAmLm5vdC0taW1hZ2Uge1xuICAgIEBleHRlbmQgJXUtdGV4dC1jb2xvci1kYXJrZXI7XG5cbiAgICBtaW4taGVpZ2h0OiBhdXRvO1xuICB9XG5cbiAgJi1kZXNjcmlwdGlvbiB7XG4gICAgbWF4LXdpZHRoOiA1MDBweDtcbiAgfVxufVxuXG4vLyB0b2x0aXBcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ud2l0aC10b29sdGlwIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuODUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBjb250ZW50OiBhdHRyKGRhdGEtdG9vbHRpcCk7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBsaW5lLWhlaWdodDogMS4yNTtcbiAgICBtaW4td2lkdGg6IDEzMHB4O1xuICAgIG9wYWNpdHk6IDA7XG4gICAgcGFkZGluZzogNHB4IDhweDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIHRvcDogLTMwcHg7XG4gICAgd2lsbC1jaGFuZ2U6IG9wYWNpdHksIHRyYW5zZm9ybTtcbiAgICB6LWluZGV4OiAxO1xuICB9XG5cbiAgJjpob3Zlcjo6YWZ0ZXIge1xuICAgIGFuaW1hdGlvbjogdG9vbHRpcCAuMXMgZWFzZS1vdXQgYm90aDtcbiAgfVxufVxuXG4vLyBGb290ZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4uZm9vdGVyIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgcGFkZGluZy1ib3R0b206IDQ1cHg7XG5cbiAgLmZvbGxvdyB7XG4gICAgYSB7XG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xuICAgICAgcGFkZGluZzogMCA3cHg7XG4gICAgfVxuICB9XG5cbiAgYSB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgICY6aG92ZXIgeyBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCk7IH1cbiAgfVxufVxuXG4vLyBFcnJvciBwYWdlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmVycm9yUGFnZSB7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2U7XG4gIGhlaWdodDogMTAwdmg7XG4gIHdpZHRoOiAxMDAlO1xuXG4gICYtbGluayB7XG4gICAgbGVmdDogLTVweDtcbiAgICBwYWRkaW5nOiAyNHB4IDYwcHg7XG4gICAgdG9wOiAtNnB4O1xuICB9XG5cbiAgJi10ZXh0IHtcbiAgICBtYXJnaW4tdG9wOiA2MHB4O1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgfVxuXG4gICYtd3JhcCB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQpO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtaW4td2lkdGg6IDY4MHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgfVxufVxuXG4vLyBWaWRlbyBSZXNwb25zaXZlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnZpZGVvLXJlc3BvbnNpdmUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAwO1xuICBtYXJnaW4tdG9wOiAzMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAwIDAgNTYuMjUlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIGlmcmFtZSB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbGVmdDogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgdmlkZW8ge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3R0b206IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGxlZnQ6IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuXG4vLyBTb2NpYWwgTWVkaWEgQ29sb3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5AZWFjaCAkc29jaWFsLW5hbWUsICRjb2xvciBpbiAkc29jaWFsLWNvbG9ycyB7XG4gIC5jLSN7JHNvY2lhbC1uYW1lfSB7IGNvbG9yOiAkY29sb3IgIWltcG9ydGFudDsgfVxuICAuYmctI3skc29jaWFsLW5hbWV9IHsgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yICFpbXBvcnRhbnQ7IH1cbn1cblxuLy8gRmFjZWJvb2sgU2F2ZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIC5mYlNhdmUge1xuLy8gICAmLWRyb3Bkb3duIHtcbi8vICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuLy8gICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMGUwZTA7XG4vLyAgICAgYm90dG9tOiAxMDAlO1xuLy8gICAgIGRpc3BsYXk6IG5vbmU7XG4vLyAgICAgbWF4LXdpZHRoOiAyMDBweDtcbi8vICAgICBtaW4td2lkdGg6IDEwMHB4O1xuLy8gICAgIHBhZGRpbmc6IDhweDtcbi8vICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAwKTtcbi8vICAgICB6LWluZGV4OiAxMDtcblxuLy8gICAgICYuaXMtdmlzaWJsZSB7IGRpc3BsYXk6IGJsb2NrOyB9XG4vLyAgIH1cbi8vIH1cblxuLy8gUm9ja2V0IGZvciByZXR1cm4gdG9wIHBhZ2Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ucm9ja2V0IHtcbiAgYm90dG9tOiA1MHB4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA2MHB4O1xuICB6LWluZGV4OiA4ODg7XG5cbiAgJjpob3ZlciBzdmcgcGF0aCB7XG4gICAgZmlsbDogcmdiYSgwLCAwLCAwLCAuNik7XG4gIH1cbn1cblxuLnN2Z0ljb24ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbnN2ZyB7XG4gIGhlaWdodDogYXV0bztcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi8vIExvYWQgTW9yZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5sb2FkTW9yZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDE1cHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMDBweDtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmxvYWRpbmdCYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhlNzlhO1xuICBkaXNwbGF5OiBub25lO1xuICBoZWlnaHQ6IDJweDtcbiAgbGVmdDogMDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gIHotaW5kZXg6IDgwMDtcbn1cblxuLmlzLWxvYWRpbmcgLmxvYWRpbmdCYXIge1xuICBhbmltYXRpb246IGxvYWRpbmctYmFyIDFzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xuICBhbmltYXRpb24tZGVsYXk6IC44cztcbiAgZGlzcGxheTogYmxvY2s7XG59XG4iLCIvLyBIZWFkaW5nc1xyXG5cclxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNixcclxuLmgxLCAuaDIsIC5oMywgLmg0LCAuaDUsIC5oNiB7XHJcbiAgY29sb3I6ICRoZWFkaW5ncy1jb2xvcjtcclxuICBmb250LWZhbWlseTogJGhlYWRpbmdzLWZvbnQtZmFtaWx5O1xyXG4gIGZvbnQtd2VpZ2h0OiAkaGVhZGluZ3MtZm9udC13ZWlnaHQ7XHJcbiAgbGluZS1oZWlnaHQ6ICRoZWFkaW5ncy1saW5lLWhlaWdodDtcclxuICBtYXJnaW46IDA7XHJcblxyXG4gIGEge1xyXG4gICAgY29sb3I6IGluaGVyaXQ7XHJcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICB9XHJcbn1cclxuXHJcbmgxIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgxOyB9XHJcbmgyIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgyOyB9XHJcbmgzIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgzOyB9XHJcbmg0IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg0OyB9XHJcbmg1IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg1OyB9XHJcbmg2IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg2OyB9XHJcblxyXG4vLyBUaGVzZSBkZWNsYXJhdGlvbnMgYXJlIGtlcHQgc2VwYXJhdGUgZnJvbSBhbmQgcGxhY2VkIGFmdGVyXHJcbi8vIHRoZSBwcmV2aW91cyB0YWctYmFzZWQgZGVjbGFyYXRpb25zIHNvIHRoYXQgdGhlIGNsYXNzZXMgYmVhdCB0aGUgdGFncyBpblxyXG4vLyB0aGUgQ1NTIGNhc2NhZGUsIGFuZCB0aHVzIDxoMSBjbGFzcz1cImgyXCI+IHdpbGwgYmUgc3R5bGVkIGxpa2UgYW4gaDIuXHJcbi5oMSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMTsgfVxyXG4uaDIgeyBmb250LXNpemU6ICRmb250LXNpemUtaDI7IH1cclxuLmgzIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgzOyB9XHJcbi5oNCB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNDsgfVxyXG4uaDUgeyBmb250LXNpemU6ICRmb250LXNpemUtaDU7IH1cclxuLmg2IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg2OyB9XHJcblxyXG5cclxucCB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcbiIsIi8vIEhlYWRpbmdzXHJcblxyXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LFxyXG4uaDEsIC5oMiwgLmgzLCAuaDQsIC5oNSwgLmg2IHtcclxuICBjb2xvcjogJGhlYWRpbmdzLWNvbG9yO1xyXG4gIGZvbnQtZmFtaWx5OiAkaGVhZGluZ3MtZm9udC1mYW1pbHk7XHJcbiAgZm9udC13ZWlnaHQ6ICRoZWFkaW5ncy1mb250LXdlaWdodDtcclxuICBsaW5lLWhlaWdodDogJGhlYWRpbmdzLWxpbmUtaGVpZ2h0O1xyXG4gIG1hcmdpbjogMDtcclxuXHJcbiAgYSB7XHJcbiAgICBjb2xvcjogaW5oZXJpdDtcclxuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gIH1cclxufVxyXG5cclxuaDEgeyBmb250LXNpemU6ICRmb250LXNpemUtaDE7IH1cclxuaDIgeyBmb250LXNpemU6ICRmb250LXNpemUtaDI7IH1cclxuaDMgeyBmb250LXNpemU6ICRmb250LXNpemUtaDM7IH1cclxuaDQgeyBmb250LXNpemU6ICRmb250LXNpemUtaDQ7IH1cclxuaDUgeyBmb250LXNpemU6ICRmb250LXNpemUtaDU7IH1cclxuaDYgeyBmb250LXNpemU6ICRmb250LXNpemUtaDY7IH1cclxuXHJcbi8vIFRoZXNlIGRlY2xhcmF0aW9ucyBhcmUga2VwdCBzZXBhcmF0ZSBmcm9tIGFuZCBwbGFjZWQgYWZ0ZXJcclxuLy8gdGhlIHByZXZpb3VzIHRhZy1iYXNlZCBkZWNsYXJhdGlvbnMgc28gdGhhdCB0aGUgY2xhc3NlcyBiZWF0IHRoZSB0YWdzIGluXHJcbi8vIHRoZSBDU1MgY2FzY2FkZSwgYW5kIHRodXMgPGgxIGNsYXNzPVwiaDJcIj4gd2lsbCBiZSBzdHlsZWQgbGlrZSBhbiBoMi5cclxuLmgxIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgxOyB9XHJcbi5oMiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMjsgfVxyXG4uaDMgeyBmb250LXNpemU6ICRmb250LXNpemUtaDM7IH1cclxuLmg0IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg0OyB9XHJcbi5oNSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNTsgfVxyXG4uaDYgeyBmb250LXNpemU6ICRmb250LXNpemUtaDY7IH1cclxuXHJcblxyXG5wIHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuIiwiLy8gY29sb3Jcbi51LXRleHRDb2xvck5vcm1hbCB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCkgIWltcG9ydGFudDtcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAuNDQpICFpbXBvcnRhbnQ7XG59XG5cbi51LWhvdmVyQ29sb3JOb3JtYWw6aG92ZXIge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XG4gIGZpbGw6IHJnYmEoMCwgMCwgMCwgLjYpO1xufVxuXG4udS1hY2NlbnRDb2xvci0taWNvbk5vcm1hbCB7XG4gIGNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcbiAgZmlsbDogJHByaW1hcnktY29sb3I7XG59XG5cbi8vICBiYWNrZ3JvdW5kIGNvbG9yXG4udS1iZ0NvbG9yIHsgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7IH1cblxuLnUtaGVhZGVyQ29sb3JMaW5rIGEge1xuICAvLyBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNDQpO1xuICBjb2xvcjogJGhlYWRlci1jb2xvcjtcblxuICAmLmFjdGl2ZSxcbiAgJjpob3ZlciB7XG4gICAgLy8gY29sb3I6ICRoZWFkZXItXG4gICAgY29sb3I6ICRoZWFkZXItY29sb3ItaG92ZXI7XG4gIH1cbn1cblxuLnUtdGV4dENvbG9yRGFya2VyIHsgQGV4dGVuZCAldS10ZXh0LWNvbG9yLWRhcmtlcjsgfVxuXG4vLyBQb3NpdGlvbnNcbi51LXJlbGF0aXZlIHsgcG9zaXRpb246IHJlbGF0aXZlOyB9XG4udS1hYnNvbHV0ZSB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgfVxuLnUtYWJzb2x1dGUwIHsgQGV4dGVuZCAldS1hYnNvbHV0ZTA7IH1cbi51LWZpeGVkIHsgcG9zaXRpb246IGZpeGVkICFpbXBvcnRhbnQ7IH1cblxuLnUtYmxvY2sgeyBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50IH1cbi51LWlubGluZUJsb2NrIHsgZGlzcGxheTogaW5saW5lLWJsb2NrIH1cblxuLy8gIEJhY2tncm91bmRcbi51LWJhY2tncm91bmREYXJrIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLCAwLCAwLCAuMykgMjklLCByZ2JhKDAsIDAsIDAsIC42KSA4MSUpO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMTtcbn1cblxuLy8gLnUtYmFja2dyb3VuZC13aGl0ZSB7IGJhY2tncm91bmQtY29sb3I6ICNlZWVmZWU7IH1cbi51LWJhY2tncm91bmRXaGl0ZSB7IGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7IH1cbi51LWJhY2tncm91bmRDb2xvckdyYXlMaWdodCB7IGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjAgIWltcG9ydGFudDsgfVxuXG4vLyBDbGVhclxuLnUtY2xlYXIge1xuICAmOjpiZWZvcmUsXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbiAgfVxuICAmOjphZnRlciB7IGNsZWFyOiBib3RoOyB9XG59XG5cbi8vIGZvbnQgc2l6ZVxuLnUtZm9udFNpemUxMyB7IGZvbnQtc2l6ZTogMTNweCB9XG4udS1mb250U2l6ZTE0IHsgZm9udC1zaXplOiAxNHB4IH1cbi51LWZvbnRTaXplMTUgeyBmb250LXNpemU6IDE1cHggIWltcG9ydGFudCB9XG4udS1mb250U2l6ZTIwIHsgZm9udC1zaXplOiAyMHB4IH1cbi51LWZvbnRTaXplMjIgeyBmb250LXNpemU6IDIycHggfVxuLnUtZm9udFNpemUyOCB7IGZvbnQtc2l6ZTogMjhweCAhaW1wb3J0YW50OyB9XG4udS1mb250U2l6ZTM2IHsgZm9udC1zaXplOiAzNnB4IH1cbi51LWZvbnRTaXplNDAgeyBmb250LXNpemU6IDQwcHggfVxuLnUtZm9udFNpemVCYXNlIHsgZm9udC1zaXplOiAxOHB4IH1cbi51LWZvbnRTaXplSnVtYm8geyBmb250LXNpemU6IDUwcHggfVxuLnUtZm9udFNpemVMYXJnZSB7IGZvbnQtc2l6ZTogMjRweCAhaW1wb3J0YW50IH1cbi51LWZvbnRTaXplTGFyZ2VyIHsgZm9udC1zaXplOiAzMnB4IH1cbi51LWZvbnRTaXplTGFyZ2VzdCB7IGZvbnQtc2l6ZTogNDRweCB9XG4udS1mb250U2l6ZU1pY3JvIHsgZm9udC1zaXplOiAxMXB4IH1cbi51LWZvbnRTaXplU21hbGwgeyBmb250LXNpemU6IDE2cHggfVxuLnUtZm9udFNpemVTbWFsbGVyIHsgZm9udC1zaXplOiAxNHB4IH1cbi51LWZvbnRTaXplU21hbGxlc3QgeyBmb250LXNpemU6IDEycHggfVxuXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcbiAgLnUtbWQtZm9udFNpemVCYXNlIHsgZm9udC1zaXplOiAxOHB4ICFpbXBvcnRhbnQgfVxuICAudS1tZC1mb250U2l6ZUxhcmdlciB7IGZvbnQtc2l6ZTogMzJweCB9XG59XG5cbi8vIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuLy8gICAudS14cy1mb250U2l6ZUJhc2Uge2ZvbnQtc2l6ZTogMThweH1cbi8vICAgLnUteHMtZm9udFNpemUxMyB7Zm9udC1zaXplOiAxM3B4fVxuLy8gICAudS14cy1mb250U2l6ZVNtYWxsZXIge2ZvbnQtc2l6ZTogMTRweH1cbi8vICAgLnUteHMtZm9udFNpemVTbWFsbCB7Zm9udC1zaXplOiAxNnB4fVxuLy8gICAudS14cy1mb250U2l6ZTIyIHtmb250LXNpemU6IDIycHh9XG4vLyAgIC51LXhzLWZvbnRTaXplTGFyZ2Uge2ZvbnQtc2l6ZTogMjRweH1cbi8vICAgLnUteHMtZm9udFNpemU0MCB7Zm9udC1zaXplOiA0MHB4fVxuLy8gICAudS14cy1mb250U2l6ZUxhcmdlciB7Zm9udC1zaXplOiAzMnB4fVxuLy8gICAudS14cy1mb250U2l6ZVNtYWxsZXN0IHtmb250LXNpemU6IDEycHh9XG4vLyB9XG5cbi8vIGZvbnQgd2VpZ2h0XG4udS1mb250V2VpZ2h0VGhpbiB7IGZvbnQtd2VpZ2h0OiAzMDAgfVxuLnUtZm9udFdlaWdodE5vcm1hbCB7IGZvbnQtd2VpZ2h0OiA0MDAgfVxuLy8gLnUtZm9udFdlaWdodE1lZGl1bSB7IGZvbnQtd2VpZ2h0OiA1MDAgfVxuLnUtZm9udFdlaWdodFNlbWlib2xkIHsgZm9udC13ZWlnaHQ6IDYwMCB9XG4udS1mb250V2VpZ2h0Qm9sZCB7IGZvbnQtd2VpZ2h0OiA3MDAgfVxuXG4udS10ZXh0VXBwZXJjYXNlIHsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZSB9XG4udS10ZXh0QWxpZ25DZW50ZXIgeyB0ZXh0LWFsaWduOiBjZW50ZXIgfVxuXG4udS1ub1dyYXBXaXRoRWxsaXBzaXMge1xuICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzICFpbXBvcnRhbnQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXAgIWltcG9ydGFudDtcbn1cblxuLy8gTWFyZ2luXG4udS1tYXJnaW5BdXRvIHsgbWFyZ2luLWxlZnQ6IGF1dG87IG1hcmdpbi1yaWdodDogYXV0bzsgfVxuLnUtbWFyZ2luVG9wMjAgeyBtYXJnaW4tdG9wOiAyMHB4IH1cbi51LW1hcmdpblRvcDMwIHsgbWFyZ2luLXRvcDogMzBweCB9XG4udS1tYXJnaW5Cb3R0b20xNSB7IG1hcmdpbi1ib3R0b206IDE1cHggfVxuLnUtbWFyZ2luQm90dG9tMjAgeyBtYXJnaW4tYm90dG9tOiAyMHB4ICFpbXBvcnRhbnQgfVxuLnUtbWFyZ2luQm90dG9tMzAgeyBtYXJnaW4tYm90dG9tOiAzMHB4IH1cbi51LW1hcmdpbkJvdHRvbTQwIHsgbWFyZ2luLWJvdHRvbTogNDBweCB9XG5cbi8vIHBhZGRpbmdcbi51LXBhZGRpbmcwIHsgcGFkZGluZzogMCAhaW1wb3J0YW50IH1cbi51LXBhZGRpbmcyMCB7IHBhZGRpbmc6IDIwcHggfVxuLnUtcGFkZGluZzE1IHsgcGFkZGluZzogMTVweCAhaW1wb3J0YW50OyB9XG4udS1wYWRkaW5nQm90dG9tMiB7IHBhZGRpbmctYm90dG9tOiAycHg7IH1cbi51LXBhZGRpbmdCb3R0b20zMCB7IHBhZGRpbmctYm90dG9tOiAzMHB4OyB9XG4udS1wYWRkaW5nQm90dG9tMjAgeyBwYWRkaW5nLWJvdHRvbTogMjBweCB9XG4udS1wYWRkaW5nUmlnaHQxMCB7IHBhZGRpbmctcmlnaHQ6IDEwcHggfVxuLnUtcGFkZGluZ0xlZnQxNSB7IHBhZGRpbmctbGVmdDogMTVweCB9XG5cbi51LXBhZGRpbmdUb3AyIHsgcGFkZGluZy10b3A6IDJweCB9XG4udS1wYWRkaW5nVG9wNSB7IHBhZGRpbmctdG9wOiA1cHg7IH1cbi51LXBhZGRpbmdUb3AxMCB7IHBhZGRpbmctdG9wOiAxMHB4OyB9XG4udS1wYWRkaW5nVG9wMTUgeyBwYWRkaW5nLXRvcDogMTVweDsgfVxuLnUtcGFkZGluZ1RvcDIwIHsgcGFkZGluZy10b3A6IDIwcHg7IH1cbi51LXBhZGRpbmdUb3AzMCB7IHBhZGRpbmctdG9wOiAzMHB4OyB9XG5cbi51LXBhZGRpbmdCb3R0b20xNSB7IHBhZGRpbmctYm90dG9tOiAxNXB4OyB9XG5cbi51LXBhZGRpbmdSaWdodDIwIHsgcGFkZGluZy1yaWdodDogMjBweCB9XG4udS1wYWRkaW5nTGVmdDIwIHsgcGFkZGluZy1sZWZ0OiAyMHB4IH1cblxuLnUtY29udGVudFRpdGxlIHtcbiAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC0uMDI4ZW07XG59XG5cbi8vIGxpbmUtaGVpZ2h0XG4udS1saW5lSGVpZ2h0MSB7IGxpbmUtaGVpZ2h0OiAxOyB9XG4udS1saW5lSGVpZ2h0VGlnaHQgeyBsaW5lLWhlaWdodDogMS4yIH1cblxuLy8gb3ZlcmZsb3dcbi51LW92ZXJmbG93SGlkZGVuIHsgb3ZlcmZsb3c6IGhpZGRlbiB9XG5cbi8vIGZsb2F0XG4udS1mbG9hdFJpZ2h0IHsgZmxvYXQ6IHJpZ2h0OyB9XG4udS1mbG9hdExlZnQgeyBmbG9hdDogbGVmdDsgfVxuXG4vLyAgZmxleFxuLnUtZmxleCB7IGRpc3BsYXk6IGZsZXg7IH1cbi51LWZsZXhDZW50ZXIgeyBhbGlnbi1pdGVtczogY2VudGVyOyBkaXNwbGF5OiBmbGV4OyB9XG4vLyAudS1mbGV4LS0xIHsgZmxleDogMSB9XG4udS1mbGV4MSB7IGZsZXg6IDEgMSBhdXRvOyB9XG4udS1mbGV4MCB7IGZsZXg6IDAgMCBhdXRvOyB9XG4udS1mbGV4V3JhcCB7IGZsZXgtd3JhcDogd3JhcCB9XG5cbi51LWZsZXhDb2x1bW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnUtZmxleEVuZCB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG5cbi51LWZsZXhDb2x1bW5Ub3Age1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG59XG5cbi8vIEJhY2tncm91bmRcbi51LWJhY2tncm91bmRTaXplQ292ZXIge1xuICBiYWNrZ3JvdW5kLW9yaWdpbjogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4vLyBtYXggd2lkaHRcbi51LWNvbnRhaW5lciB7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbiAgcGFkZGluZy1yaWdodDogMjBweDtcbn1cblxuLnUtbWF4V2lkdGgxMjAwIHsgbWF4LXdpZHRoOiAxMjAwcHggfVxuLnUtbWF4V2lkdGgxMDAwIHsgbWF4LXdpZHRoOiAxMDAwcHggfVxuLnUtbWF4V2lkdGg3NDAgeyBtYXgtd2lkdGg6IDc0MHB4IH1cbi51LW1heFdpZHRoMTA0MCB7IG1heC13aWR0aDogMTA0MHB4IH1cbi51LXNpemVGdWxsV2lkdGggeyB3aWR0aDogMTAwJSB9XG5cbi8vIGJvcmRlclxuLnUtYm9yZGVyTGlnaHRlciB7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjE1KTsgfVxuLnUtcm91bmQgeyBib3JkZXItcmFkaXVzOiA1MCUgfVxuLnUtYm9yZGVyUmFkaXVzMiB7IGJvcmRlci1yYWRpdXM6IDJweCB9XG5cbi51LWJveFNoYWRvd0JvdHRvbSB7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDJweCAtMnB4IHJnYmEoMCwgMCwgMCwgLjA1KTtcbn1cblxuLy8gSGVpbmdodFxuLnUtaGVpZ2h0NTQwIHsgaGVpZ2h0OiA1NDBweCB9XG4udS1oZWlnaHQyODAgeyBoZWlnaHQ6IDI4MHB4IH1cbi51LWhlaWdodDI2MCB7IGhlaWdodDogMjYwcHggfVxuLnUtaGVpZ2h0MTAwIHsgaGVpZ2h0OiAxMDBweCB9XG4udS1ib3JkZXJCbGFja0xpZ2h0ZXN0IHsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMSkgfVxuXG4vLyBoaWRlIGdsb2JhbFxuLnUtaGlkZSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9XG5cbi8vIGNhcmRcbi51LWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC4wNCk7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgLy8gYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgLjA0KTtcbiAgYm94LXNoYWRvdzogMCAxcHggN3B4IHJnYmEoMCwgMCwgMCwgLjA1KTtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgcGFkZGluZzogMTBweCAyMHB4IDE1cHg7XG59XG5cbkBtZWRpYSAjeyRtZC1hbmQtZG93bn0ge1xuICAudS1oaWRlLWJlZm9yZS1tZCB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9XG4gIC51LW1kLWhlaWdodEF1dG8geyBoZWlnaHQ6IGF1dG87IH1cbiAgLnUtbWQtaGVpZ2h0MTcwIHsgaGVpZ2h0OiAxNzBweCB9XG4gIC51LW1kLXJlbGF0aXZlIHsgcG9zaXRpb246IHJlbGF0aXZlIH1cbn1cblxuQG1lZGlhICN7JGxnLWFuZC1kb3dufSB7IC51LWhpZGUtYmVmb3JlLWxnIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50IH0gfVxuXG4vLyBoaWRlIGFmdGVyXG5AbWVkaWEgI3skbWQtYW5kLXVwfSB7IC51LWhpZGUtYWZ0ZXItbWQgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQgfSB9XG5cbkBtZWRpYSAjeyRsZy1hbmQtdXB9IHsgLnUtaGlkZS1hZnRlci1sZyB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9IH1cbiIsIkBtZWRpYSAjeyRsZy1hbmQtdXB9IHtcbiAgLmNvbnRlbnQge1xuICAgIC8vIGZsZXg6IDEgIWltcG9ydGFudDtcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDM0MHB4KSAhaW1wb3J0YW50O1xuICAgIC8vIG9yZGVyOiAxO1xuICAgIC8vIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cblxuICAuc2lkZWJhciB7XG4gICAgd2lkdGg6IDM0MHB4ICFpbXBvcnRhbnQ7XG4gICAgLy8gZmxleDogMCAwIDM0MHB4ICFpbXBvcnRhbnQ7XG4gICAgLy8gb3JkZXI6IDI7XG4gIH1cbn1cblxuLnJvdyB7XG4gIG1hcmdpbi1sZWZ0OiAtIDEwcHg7XG4gIG1hcmdpbi1yaWdodDogLSAxMHB4O1xuXG4gIEBleHRlbmQgLnUtY2xlYXI7XG5cbiAgLmNvbCB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG5cbiAgICAkaTogMTtcblxuICAgIEB3aGlsZSAkaSA8PSAkbnVtLWNvbHMge1xuICAgICAgJHBlcmM6IHVucXVvdGUoKDEwMCAvICgkbnVtLWNvbHMgLyAkaSkpICsgXCIlXCIpO1xuXG4gICAgICAmLnMjeyRpfSB7XG4gICAgICAgIHdpZHRoOiAkcGVyYztcbiAgICAgIH1cblxuICAgICAgJGk6ICRpICsgMTtcbiAgICB9XG5cbiAgICBAbWVkaWEgI3skbWQtYW5kLXVwfSB7XG5cbiAgICAgICRpOiAxO1xuXG4gICAgICBAd2hpbGUgJGkgPD0gJG51bS1jb2xzIHtcbiAgICAgICAgJHBlcmM6IHVucXVvdGUoKDEwMCAvICgkbnVtLWNvbHMgLyAkaSkpICsgXCIlXCIpO1xuXG4gICAgICAgICYubSN7JGl9IHtcbiAgICAgICAgICB3aWR0aDogJHBlcmM7XG4gICAgICAgIH1cblxuICAgICAgICAkaTogJGkgKyAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAjeyRsZy1hbmQtdXB9IHtcblxuICAgICAgJGk6IDE7XG5cbiAgICAgIEB3aGlsZSAkaSA8PSAkbnVtLWNvbHMge1xuICAgICAgICAkcGVyYzogdW5xdW90ZSgoMTAwIC8gKCRudW0tY29scyAvICRpKSkgKyBcIiVcIik7XG5cbiAgICAgICAgJi5sI3skaX0ge1xuICAgICAgICAgIHdpZHRoOiAkcGVyYztcbiAgICAgICAgfVxuXG4gICAgICAgICRpOiAkaSArIDE7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIuYnV0dG9uIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDApO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjE1KTtcclxuICBib3JkZXItcmFkaXVzOiA5OTllbTtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgaGVpZ2h0OiAzN3B4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xyXG4gIHBhZGRpbmc6IDAgMTZweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuXHJcbiAgaSB7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxyXG5cclxuICAmLS1jaHJvbWVsZXNzIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgICBib3JkZXItd2lkdGg6IDA7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG5cclxuICAgICY6YWN0aXZlLFxyXG4gICAgJjpob3ZlcixcclxuICAgICY6Zm9jdXMge1xyXG4gICAgICBib3JkZXItd2lkdGg6IDA7XHJcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICYtLWxhcmdlIHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIGhlaWdodDogNDRweDtcclxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xyXG4gICAgcGFkZGluZzogMCAxOHB4O1xyXG4gIH1cclxuXHJcbiAgJi0tZGFyayB7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xyXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xyXG5cclxuICAgICY6aG92ZXIge1xyXG4gICAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgLjgpO1xyXG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQcmltYXJ5XHJcbi5idXR0b24tLXByaW1hcnkge1xyXG4gIGJvcmRlci1jb2xvcjogJHByaW1hcnktY29sb3I7XHJcbiAgY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xyXG59XHJcblxyXG4uYnV0dG9uU2V0IHtcclxuICA+IC5idXR0b24ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIH1cclxuXHJcbiAgPiAuYnV0dG9uOmxhc3QtY2hpbGQge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gIH1cclxuXHJcbiAgLmJ1dHRvbi0tY2hyb21lbGVzcyB7XHJcbiAgICBoZWlnaHQ6IDM3cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMzVweDtcclxuICB9XHJcbn1cclxuXHJcbi5idXR0b25TZXQge1xyXG4gIC5idXR0b24tLWxhcmdlLmJ1dHRvbi0tY2hyb21lbGVzcyxcclxuICAuYnV0dG9uLS1sYXJnZS5idXR0b24tLWxpbmsge1xyXG4gICAgaGVpZ2h0OiA0NHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDQycHg7XHJcbiAgfVxyXG5cclxuICAmPi5idXR0b24tLWNocm9tZWxlc3M6bm90KC5idXR0b24tLWNpcmNsZSkge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gICAgcGFkZGluZy1yaWdodDogOHB4O1xyXG4gIH1cclxuXHJcbiAgJj4uYnV0dG9uLS1jaHJvbWVsZXNzKy5idXR0b24tLWNocm9tZWxlc3M6bm90KC5idXR0b24tLWNpcmNsZSkge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDhweDtcclxuICB9XHJcblxyXG4gICY+LmJ1dHRvbi0tY2hyb21lbGVzczpsYXN0LWNoaWxkIHtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbiAgfVxyXG59XHJcblxyXG4uYnV0dG9uLS1sYXJnZS5idXR0b24tLWNocm9tZWxlc3MsXHJcbi5idXR0b24tLWxhcmdlLmJ1dHRvbi0tbGluayB7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxuIiwiQGZvbnQtZmFjZSB7XHJcbiAgZm9udC1mYW1pbHk6ICdzaW1wbHknO1xyXG4gIHNyYzogIHVybCgnLi4vZm9udHMvc2ltcGx5LmVvdD9lc282MDUnKTtcclxuICBzcmM6ICB1cmwoJy4uL2ZvbnRzL3NpbXBseS5lb3Q/ZXNvNjA1I2llZml4JykgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxyXG4gICAgdXJsKCcuLi9mb250cy9zaW1wbHkudHRmP2VzbzYwNScpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcclxuICAgIHVybCgnLi4vZm9udHMvc2ltcGx5LndvZmY/ZXNvNjA1JykgZm9ybWF0KCd3b2ZmJyksXHJcbiAgICB1cmwoJy4uL2ZvbnRzL3NpbXBseS5zdmc/ZXNvNjA1I3NpbXBseScpIGZvcm1hdCgnc3ZnJyk7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbn1cclxuXHJcbltjbGFzc149XCJpLVwiXTo6YmVmb3JlLCBbY2xhc3MqPVwiIGktXCJdOjpiZWZvcmUge1xyXG4gIEBleHRlbmQgJWZvbnRzLWljb25zO1xyXG59XHJcblxyXG5cclxuLmktdGVsZWdyYW06YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjJjNlwiO1xyXG59XHJcbi5pLWxpbms6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjBjMVwiO1xyXG59XHJcbi5pLXJlZGRpdDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMjgxXCI7XHJcbn1cclxuLmktdHdpdHRlcjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMDk5XCI7XHJcbn1cclxuLmktZ2l0aHViOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYwOWJcIjtcclxufVxyXG4uaS1saW5rZWRpbjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMGUxXCI7XHJcbn1cclxuLmktY29kZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTIxXCI7XHJcbn1cclxuLmkteW91dHViZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTZhXCI7XHJcbn1cclxuLmktc3RhY2stb3ZlcmZsb3c6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjE2Y1wiO1xyXG59XHJcbi5pLWluc3RhZ3JhbTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTZkXCI7XHJcbn1cclxuLmktZmxpY2tyOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxNmVcIjtcclxufVxyXG4uaS1kcmliYmJsZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTdkXCI7XHJcbn1cclxuLmktYmVoYW5jZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMWI0XCI7XHJcbn1cclxuLmktc3BvdGlmeTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMWJjXCI7XHJcbn1cclxuLmktY29kZXBlbjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMWNiXCI7XHJcbn1cclxuLmktZmFjZWJvb2s6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjIzMFwiO1xyXG59XHJcbi5pLXBpbnRlcmVzdDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMjMxXCI7XHJcbn1cclxuLmktd2hhdHNhcHA6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjIzMlwiO1xyXG59XHJcbi5pLXNuYXBjaGF0OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYyYWNcIjtcclxufVxyXG4uaS1jb21tZW50czpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlOTAwXCI7XHJcbn1cclxuLmktbG9jYXRpb246YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZThiNFwiO1xyXG59XHJcbi5pLXNhdmU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZThlNlwiO1xyXG59XHJcbi5pLXNhdmUtLWxpbmU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZThlN1wiO1xyXG59XHJcbi5pLWNoZWNrLWNpcmNsZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlODZjXCI7XHJcbn1cclxuLmktY2xvc2U6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTVjZFwiO1xyXG59XHJcbi5pLWZhdm9yaXRlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4N2RcIjtcclxufVxyXG4uaS1zdGFyOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4MzhcIjtcclxufVxyXG4uaS13YXJuaW5nOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGUwMDJcIjtcclxufVxyXG4uaS1yc3M6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTBlNVwiO1xyXG59XHJcbi5pLXNlYXJjaDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlOGI2XCI7XHJcbn1cclxuLmktc2VuZDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlMTYzXCI7XHJcbn1cclxuLmktc2hhcmU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTgwZFwiO1xyXG59XHJcbiIsIi8vIGFuaW1hdGVkIEdsb2JhbFxyXG4uYW5pbWF0ZWQge1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XHJcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcclxuXHJcbiAgJi5pbmZpbml0ZSB7XHJcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGFuaW1hdGVkIEFsbFxyXG4uYm91bmNlSW4geyBhbmltYXRpb24tbmFtZTogYm91bmNlSW47fVxyXG4uYm91bmNlSW5Eb3duIHsgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluRG93bjt9XHJcbi5wdWxzZSB7IGFuaW1hdGlvbi1uYW1lOiBwdWxzZTsgfVxyXG5cclxuLy8gYWxsIGtleWZyYW1lcyBBbmltYXRlc1xyXG4vLyBib3VuY2VJblxyXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcclxuICAwJSxcclxuICAyMCUsXHJcbiAgNDAlLFxyXG4gIDYwJSxcclxuICA4MCUsXHJcbiAgMTAwJSB7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllciguMjE1LCAuNjEwLCAuMzU1LCAxKTt9XHJcbiAgMCUge29wYWNpdHk6IDA7IHRyYW5zZm9ybTogc2NhbGUzZCguMywgLjMsIC4zKTt9XHJcbiAgMjAlIHsgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMSwgMS4xLCAxLjEpO31cclxuICA0MCUgeyB0cmFuc2Zvcm06IHNjYWxlM2QoLjksIC45LCAuOSk7IH1cclxuICA2MCUgeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyk7IH1cclxuICA4MCUgeyB0cmFuc2Zvcm06IHNjYWxlM2QoLjk3LCAuOTcsIC45Nyk7IH1cclxuICAxMDAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiBzY2FsZTNkKDEsIDEsIDEpOyB9XHJcbn1cclxuXHJcbjtcclxuLy8gYm91bmNlSW5Eb3duXHJcbkBrZXlmcmFtZXMgYm91bmNlSW5Eb3duIHtcclxuICAwJSxcclxuICA2MCUsXHJcbiAgNzUlLFxyXG4gIDkwJSxcclxuICAxMDAlIHsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDIxNSwgNjEwLCAzNTUsIDEpOyB9XHJcbiAgMCUgeyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0zMDAwcHgsIDApOyB9XHJcbiAgNjAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAyNXB4LCAwKTt9XHJcbiAgNzUlIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIC0xMHB4LCAwKTt9XHJcbiAgOTAlIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDVweCwgMCk7fVxyXG4gIDEwMCUge3RyYW5zZm9ybTogbm9uZTt9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgcHVsc2Uge1xyXG4gIGZyb20geyB0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7fVxyXG4gIDUwJSB7dHJhbnNmb3JtOiBzY2FsZTNkKDEuMiwgMS4yLCAxLjIpO31cclxuICB0byB7dHJhbnNmb3JtOiBzY2FsZTNkKDEsIDEsIDEpOyB9XHJcbn1cclxuXHJcblxyXG5Aa2V5ZnJhbWVzIHNjcm9sbCB7XHJcbiAgMCUge29wYWNpdHk6IDA7fVxyXG4gIDEwJSB7b3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApfVxyXG4gIDEwMCUge29wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTt9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgb3BhY2l0eSB7XHJcbiAgMCUge29wYWNpdHk6IDA7fVxyXG4gIDUwJSB7b3BhY2l0eTogMDt9XHJcbiAgMTAwJSB7b3BhY2l0eTogMTt9XHJcbn1cclxuXHJcbi8vICBzcGluIGZvciBwYWdpbmF0aW9uXHJcbkBrZXlmcmFtZXMgc3BpbiB7XHJcbiAgZnJvbSB7dHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7fVxyXG4gIHRvIHt0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO31cclxufVxyXG5cclxuQGtleWZyYW1lcyB0b29sdGlwIHtcclxuICAwJSB7b3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgNnB4KTt9XHJcbiAgMTAwJSB7b3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgMCk7fVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGxvYWRpbmctYmFyIHtcclxuICAwJSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKX1cclxuICA0MCUge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgwKX1cclxuICA2MCUge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgwKX1cclxuICAxMDAlIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSl9XHJcbn1cclxuIiwiLy8gSGVhZGVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4uaGVhZGVyIHtcbiAgei1pbmRleDogODA7XG5cbiAgJi13cmFwIHsgaGVpZ2h0OiA1NXB4OyB9XG5cbiAgJi1sb2dvIHtcbiAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogMzBweDtcblxuICAgIGltZyB7IG1heC1oZWlnaHQ6IDEwMCU7IH1cbiAgfVxuXG4gICYtbG9nbyxcbiAgLmJ1dHRvbi1zZWFyY2gtLW9wZW4sXG4gIC5idXR0b24tbmF2LS10b2dnbGUgeyB6LWluZGV4OiAxNTA7IH1cblxuICAvLyBoZWFkZXIgZGVzY3JpcHRpb24gaG9tZSBwYWdlXG4gICYtZGVzY3JpcHRpb24ge1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIG1heC13aWR0aDogNjUwcHg7XG4gIH1cbn1cblxuLy8gbm90IGhhdmUgbG9nb1xuLm5vdC1sb2dvIC5oZWFkZXItbG9nbyB7IGhlaWdodDogYXV0byAhaW1wb3J0YW50IH1cblxuLy8gSGVhZGVyIEZvbGxvd1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLmZvbGxvdyA+IGEgeyBwYWRkaW5nLWxlZnQ6IDE1cHggfVxuXG4vLyBIZWFkZXIgbWVudVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLm5hdiB7XG4gIHBhZGRpbmctdG9wOiA4cHg7XG4gIHBhZGRpbmctYm90dG9tOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICB1bCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG5cbiAgbGkge1xuICAgIGZsb2F0OiBsZWZ0O1xuXG4gICAgYSB7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAyMnB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB9XG4gIH1cbn1cblxuLmJ1dHRvbi1zZWFyY2gtLW9wZW4ge1xuICBwYWRkaW5nLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XG59XG5cbi8vIGJ1dHRvbi1uYXZcbi5idXR0b24tbmF2LS10b2dnbGUge1xuICBoZWlnaHQ6IDQ4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC40cztcbiAgd2lkdGg6IDQ4cHg7XG5cbiAgc3BhbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGhlYWRlci1jb2xvcjtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBsZWZ0OiAxNHB4O1xuICAgIG1hcmdpbi10b3A6IC0xcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zaXRpb246IC40cztcbiAgICB3aWR0aDogMjBweDtcblxuICAgICY6Zmlyc3QtY2hpbGQgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNnB4KTsgfVxuICAgICY6bGFzdC1jaGlsZCB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDZweCk7IH1cbiAgfVxufVxuXG4vLyBNZWRpYSBRdWVyeVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuQG1lZGlhICN7JG1kLWFuZC11cH0ge1xuICBib2R5LmlzLWhvbWUge1xuICAgIC5oZWFkZXIge1xuICAgICAgJi13cmFwIHsgaGVpZ2h0OiAyMDBweDsgfVxuXG4gICAgICAmLWxvZ28ge1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTWFpbiBNZW51IEZpeGVkXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIC5tYWluTWVudS0tYWZmaXhlZCB7XG4gIC8vICAgcG9zaXRpb246IGZpeGVkO1xuICAvLyAgIHRvcDogMDtcbiAgLy8gfVxufVxuXG4vLyBIZWFkZXIgbWVudVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkBtZWRpYSAjeyRtZC1hbmQtZG93bn0ge1xuICAuaGVhZGVyIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG5cbiAgICAmLXdyYXAgeyBoZWlnaHQ6ICRoZWFkZXItaGVpZ2h0LW1vYmlsZSB9XG4gIH1cblxuICAuaGVhZGVyLWxvZ28tLXdyYXAgeyB0ZXh0LWFsaWduOiBsZWZ0IH1cbiAgLmhlYWRlci1sb2dvIHsgZGlzcGxheTogZmxleDsgZmxleDogMSAxIGF1dG8gfVxuXG4gIC5oZWFkZXItdG9wIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAvLyBzaG93IG1lbnUgbW9iaWxlXG4gIGJvZHkuaXMtc2hvd05hdk1vYiB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIC5zaWRlTmF2IHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9XG5cbiAgICAuYnV0dG9uLW5hdi0tdG9nZ2xlIHtcbiAgICAgIGJvcmRlcjogMDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcblxuICAgICAgc3BhbjpmaXJzdC1jaGlsZCB7IHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKSB0cmFuc2xhdGUoMCwgMCk7IH1cbiAgICAgIHNwYW46bnRoLWNoaWxkKDIpIHsgdHJhbnNmb3JtOiBzY2FsZVgoMCk7IH1cbiAgICAgIHNwYW46bGFzdC1jaGlsZCB7IHRyYW5zZm9ybTogcm90YXRlKC00NWRlZykgdHJhbnNsYXRlKDAsIDApOyB9XG4gICAgfVxuXG4gICAgLmhlYWRlciAuYnV0dG9uLXNlYXJjaC0tdG9nZ2xlIHsgZGlzcGxheTogbm9uZTsgfVxuICAgIC5tYWluLCAuZm9vdGVyIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yNSUpOyB9XG4gIH1cbn1cbiIsIi5hdmF0YXItaW1hZ2UtLXNtYWxsZXIge1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xufVxuXG4uYXZhdGFyLWltYWdlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xufVxuXG4uc3Rvcnkge1xuICAmLXRpdGxlIHsgbGV0dGVyLXNwYWNpbmc6IC0uMDI4ZW07IH1cblxuICAmLWV4Y2VycHQge1xuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBtYXgtaGVpZ2h0OiA0LjVlbTtcbiAgICBsaW5lLWhlaWdodDogMS40O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgICAtd2Via2l0LWxpbmUtY2xhbXA6IDM7XG4gIH1cbn1cblxuLy8gIG1lZGlhIFF1ZXJ5XG5AbWVkaWEgI3skbWQtYW5kLXVwfSB7XG4gIC5zdG9yeS0tMjYwIHtcbiAgICAuc3Rvcnktd3JhcCB7IGhlaWdodDogMjYwcHggfVxuICAgIC5zdG9yeS1pbWFnZSB7IGhlaWdodDogMTAwcHggfVxuXG4gICAgLnN0b3J5LWJvZHkge1xuICAgICAgaGVpZ2h0OiAxNjBweDtcbiAgICB9XG4gIH1cblxuICAuc3RvcnktLTIwMCB7XG4gICAgLnN0b3J5LXdyYXAgeyBoZWlnaHQ6IDI2MHB4OyBkaXNwbGF5OiBmbGV4IH1cblxuICAgIC5zdG9yeS1ib2R5IHtcbiAgICAgIGZsZXg6IDEgMSBhdXRvO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cblxuICAgIC5zdG9yeS1pbWFnZSB7XG4gICAgICBmbGV4OiAwIDAgYXV0bztcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIHdpZHRoOiAyMDBweDtcbiAgICB9XG4gIH1cbn1cblxuLy8gY2FyZCBmb3IgKGF1dGhvciBhbmQgdGFnKSBzdG9yeVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMDkpO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDRweCByZ2JhKDAsIDAsIDAsIC4wNCk7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIHBhZGRpbmc6IDEwcHggMjBweCAxNXB4O1xuXG4gICYtLXAge1xuICAgIGZvbnQtZmFtaWx5OiAkc2VjdW5kYXJ5LWZvbnQ7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDA0ZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuNTg7XG4gIH1cblxuICAmLWltYWdlIHtcbiAgICBtYXgtaGVpZ2h0OiAyNDBweDtcbiAgICBtYXgtd2lkdGg6IDM2MHB4O1xuICB9XG5cbiAgLy8gaWYgc3RvcnkgaXMgZmVhdHVyZWRcbiAgJi5jYXJkLS1sYXJnZSB7XG4gICAgLmNhcmQtYm9keSB7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cblxuICAgIC5jYXJkLWltYWdlIHtcbiAgICAgIGhlaWdodDogMjAwcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgb3JkZXI6IC0xO1xuICAgIH1cblxuICAgIC5jYXJkLWltYWdlLS1saW5rIHtcbiAgICAgIGxlZnQ6IDUwJTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gIH1cblxuICAvLyBldmVuXG4gICYuY2FyZC0tbWVkaXVtIHtcbiAgICAuY2FyZC1leGNlcnB0IHtcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XG4gICAgICBmb250LWZhbWlseTogJHByaW1hcnktZm9udDtcbiAgICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAyMmVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMjI7XG4gICAgfVxuICB9XG59XG4iLCIvLyBIb21lIFBhZ2UgU3R5bGVzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyAuaG9tZVBhZ2Uge1xuLy8gICAuZW50cnkge1xuLy8gICAgIC51LWJhY2tncm91bmREYXJrIHsgZGlzcGxheTogbm9uZTsgfVxuLy8gICAgICYtaW1hZ2UgeyBoZWlnaHQ6IDE3MnB4OyB9XG4vLyAgIH1cbi8vIH1cblxuXG4vLyBAbWVkaWEgI3skbWQtYW5kLXVwfSB7XG4vLyAgIC5ob21lUGFnZSB7XG4vLyAgICAgLmVudHJ5IHtcbi8vICAgICAgICYtaW1hZ2UgeyBoZWlnaHQ6IDE3NHB4OyB9XG5cbi8vICAgICAgICYuZW50cnkxLFxuLy8gICAgICAgJi5lbnRyeTcge1xuLy8gICAgICAgICBmbGV4LWJhc2lzOiAxMDAlO1xuLy8gICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4vLyAgICAgICB9XG5cbi8vICAgICAgIC8vIGZpcnN0IHBvc3Qgd2l0aCBpbWcgNjYlXG4vLyAgICAgICAmLmVudHJ5MSB7XG4vLyAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG5cbi8vICAgICAgICAgLmVudHJ5LWltYWdlIHtcbi8vICAgICAgICAgICBoZWlnaHQ6IDM1MHB4O1xuLy8gICAgICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcbi8vICAgICAgICAgICB3aWR0aDogNjYuNjY2NjY2NjclICFpbXBvcnRhbnQ7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgLmVudHJ5LXRpdGxlIHtmb250LXNpemU6IDM2cHggIWltcG9ydGFudH1cbi8vICAgICAgICAgLmVudHJ5LWJvZHkge1xuLy8gICAgICAgICAgIHBhZGRpbmc6IDAgMCAwIDEzcHg7XG4vLyAgICAgICAgICAgd2lkdGg6IDMzLjMzMzMzMzMzJSAhaW1wb3J0YW50O1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG5cbi8vICAgICAgIC8vIGVudHJ5IGZ1bGwgd2l0aCBiYWNrZ3JvdW5kIGFsbFxuLy8gICAgICAgJi5lbnRyeTcge1xuLy8gICAgICAgICAuZW50cnktaW1hZ2Uge2hlaWdodDogNDUwcHg7fVxuLy8gICAgICAgICAuZW50cnktdGl0bGUge2ZvbnQtc2l6ZTogNDRweCAhaW1wb3J0YW50fVxuLy8gICAgICAgICAuZW50cnktZXhjZXJwdCB7IGZvbnQtc2l6ZTogMjRweDsgbGluZS1oZWlnaHQ6IDEuMzt9XG4vLyAgICAgICAgIC51LWFjY2VudENvbG9yLS1pY29uTm9ybWFsIHsgZmlsbDogI2ZmZjsgfVxuLy8gICAgICAgfVxuXG4vLyAgICAgICAmLmVudHJ5Nyxcbi8vICAgICAgICYuZW50cnkxMyxcbi8vICAgICAgICYuZW50cnkxNCB7XG4vLyAgICAgICAgIC51LWJhY2tncm91bmREYXJrIHsgZGlzcGxheTogYmxvY2s7IH1cblxuLy8gICAgICAgICAuZW50cnktYm9keSB7XG4vLyAgICAgICAgICAgYm90dG9tOiAwO1xuLy8gICAgICAgICAgIGxlZnQ6IDA7XG4vLyAgICAgICAgICAgbWFyZ2luOiAzMHB4IDQwcHg7XG4vLyAgICAgICAgICAgbWF4LXdpZHRoOiA2MDBweDtcbi8vICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4vLyAgICAgICAgICAgei1pbmRleDogMjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgICY6bm90KC5ub3QtLWltYWdlKSB7XG4vLyAgICAgICAgICAgLmVudHJ5LWJvZHkge2NvbG9yOiAjZmZmO31cbi8vICAgICAgICAgICAuZW50cnktYXV0aG9yIHtcbi8vICAgICAgICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIC45KTtcbi8vICAgICAgICAgICAgIGEsIC5lbnRyeS1kYXRlIHtjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuOSk7IH1cbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cblxuLy8gICAgICAgJi5lbnRyeTEzLCAmLmVudHJ5MTQge1xuLy8gICAgICAgICAuZW50cnktaW1hZ2Uge2hlaWdodDogNDUwcHg7fVxuLy8gICAgICAgICAuZW50cnktdGl0bGUge2ZvbnQtc2l6ZTogMzJweCAhaW1wb3J0YW50fVxuLy8gICAgICAgICAuZW50cnktZXhjZXJwdCB7ZGlzcGxheTogbm9uZTt9XG4vLyAgICAgICAgIC5lbnRyeS1ieWxpbmUge21hcmdpbi10b3A6IDIwcHg7fVxuLy8gICAgICAgICAuZW50cnktYm9keSB7bWF4LXdpZHRoOiA0MDBweDt9XG4vLyAgICAgICB9XG5cblxuLy8gICAgICAgLy8gZW50cnkgNTAlXG4vLyAgICAgICAmLmVudHJ5NSwgJi5lbnRyeTYsICYuZW50cnkxMSwgJi5lbnRyeTEyIHtcbi8vICAgICAgICAgZmxleC1iYXNpczogNTAlO1xuLy8gICAgICAgICBtYXgtd2lkdGg6IDUwJTtcbi8vICAgICAgICAgLmVudHJ5LWltYWdlIHsgaGVpZ2h0OiAyNzRweDt9XG4vLyAgICAgICB9XG5cbi8vICAgICAgIC8vIGVudHJ5IDEzXG4vLyAgICAgICAmLmVudHJ5MTMge1xuLy8gICAgICAgICBmbGV4LWJhc2lzOiA2MCU7XG4vLyAgICAgICAgIG1heC13aWR0aDogNjAlO1xuLy8gICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICAvLyBlbnRyeSAxNFxuLy8gICAgICAgJi5lbnRyeTE0IHtcbi8vICAgICAgICAgZmxleC1iYXNpczogNDAlO1xuLy8gICAgICAgICBtYXgtd2lkdGg6IDQwJTtcbi8vICAgICAgIH1cblxuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuIiwiLnBvc3Qge1xuICAmLXRpdGxlIHtcbiAgICBsaW5lLWhlaWdodDogMS4wNDtcbiAgfVxuXG4gIC8vICYtZm9vdGVyIHtcbiAgLy8gICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLDAsMCwuMDUpO1xuICAvLyB9XG59XG5cbi8vIG1ldGEgbGluZVxuLnBvc3RNZXRhSW5saW5lIHtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNDQpO1xuICBmaWxsOiByZ2JhKDAsIDAsIDAsIC40NCk7XG59XG5cbi8vIHBvc3QgY29udGVudCBib2R5XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnBvc3QtYm9keSB7XG4gIGEge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwgMCwgMCwgLjYpIDUwJSwgcmdiYSgwLCAwLCAwLCAwKSA1MCUpO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS4wN2VtO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDJweCAuMWVtO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuXG4gIGltZyB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIC8vIG1heC13aWR0aDogMTAwMHB4O1xuICB9XG5cbiAgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiB7XG4gICAgbWFyZ2luLXRvcDogMzBweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgfVxuXG4gIGgyIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDNlbTtcbiAgICBsaW5lLWhlaWdodDogMS4wNDtcbiAgICBtYXJnaW4tdG9wOiA1NHB4O1xuICB9XG5cbiAgaDMge1xuICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICBsZXR0ZXItc3BhY2luZzogLS4wMmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xuICAgIG1hcmdpbi10b3A6IDUycHg7XG4gIH1cblxuICBoNCB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAxOGVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjIyO1xuICAgIG1hcmdpbi10b3A6IDMwcHg7XG4gIH1cblxuICBwIHtcbiAgICBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250O1xuICAgIGZvbnQtc2l6ZTogMjFweDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAwM2VtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU4O1xuICAgIG1hcmdpbi10b3A6IDI4cHg7XG4gIH1cblxuICB1bCxcbiAgb2wge1xuICAgIGNvdW50ZXItcmVzZXQ6IHBvc3Q7XG4gICAgZm9udC1mYW1pbHk6ICRzZWN1bmRhcnktZm9udDtcbiAgICBmb250LXNpemU6IDIxcHg7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcblxuICAgIGxpIHtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAwM2VtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDMwcHg7XG5cbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC03OHB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICB3aWR0aDogNzhweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1bCBsaTo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAn4oCiJztcbiAgICBmb250LXNpemU6IDE2LjhweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICAgIHBhZGRpbmctdG9wOiA0cHg7XG4gIH1cblxuICBvbCBsaTo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBjb3VudGVyKHBvc3QpIFwiLlwiO1xuICAgIGNvdW50ZXItaW5jcmVtZW50OiBwb3N0O1xuICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7XG4gIH1cblxuICAudHdpdHRlci10d2VldCxcbiAgaWZyYW1lIHtcbiAgICAvLyBkaXNwbGF5OiBibG9jaztcbiAgICAvLyBtYXJnaW4tbGVmdDogYXV0byAhaW1wb3J0YW50O1xuICAgIC8vIG1hcmdpbi1yaWdodDogYXV0byAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi10b3A6IDQwcHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC52aWRlby1yZXNwb25zaXZlIGlmcmFtZSB7IG1hcmdpbi10b3A6IDAgIWltcG9ydGFudCB9XG5cbiAgYmxvY2txdW90ZSxcbiAgZGwsXG4gIGgxLFxuICBoMixcbiAgaDMsXG4gIGg0LFxuICBoNSxcbiAgaDYsXG4gIG9sLFxuICBwLFxuICBwcmUsXG4gIHVsIHtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gIH1cbn1cblxuLy8gbWFya2Rvd24gY29udGVudCBvZiBwb3N0XG4ua2ctY2FyZC1tYXJrZG93biB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC8vIG1heC13aWR0aDogOTIwcHg7XG59XG5cbi8vIGZpc3J0IHBcbi5rZy1jYXJkLW1hcmtkb3duID4gcDpmaXJzdC1vZi10eXBlOjpmaXJzdC1sZXR0ZXIsXG4ucG9zdC1ib2R5ID4gcDpmaXJzdC1vZi10eXBlOjpmaXJzdC1sZXR0ZXIge1xuICBmbG9hdDogbGVmdDtcbiAgZm9udC1zaXplOiA2NHB4O1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAtLjAzZW07XG4gIGxpbmUtaGVpZ2h0OiAuODM7XG4gIG1hcmdpbi1ib3R0b206IC0uMDhlbTtcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gIG1hcmdpbi1yaWdodDogN3B4O1xuICBwYWRkaW5nLXRvcDogN3B4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4vLyBwb3N0IFRhZ3Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ucG9zdC10YWdzIHtcbiAgYSB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuMDgpO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuMSk7XG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XG4gICAgfVxuICB9XG59XG5cbi8vIHBvc3QgTmV3c2xldHRlclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLnBvc3QtbmV3c2xldHRlciB7XG4gIG91dGxpbmU6IDFweCBzb2xpZCAjZjBmMGYwICFpbXBvcnRhbnQ7XG4gIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDQwcHggMTBweDtcblxuICAubmV3c2xldHRlci1mb3JtIHsgbWF4LXdpZHRoOiA0MDBweCB9XG5cbiAgLmZvcm0tZ3JvdXAgeyB3aWR0aDogODAlOyBwYWRkaW5nLXJpZ2h0OiA1cHg7IH1cblxuICAuZm9ybS0taW5wdXQge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgcGFkZGluZzogNnB4IDEycHggOHB4IDVweDtcbiAgICByZXNpemU6IG5vbmU7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAmOmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IDA7XG4gICAgfVxuICB9XG5cbiAgLmZvcm0tLWJ0biB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2E5YTlhOTtcbiAgICBib3JkZXItcmFkaXVzOiAwIDQ1cHggNDVweCAwO1xuICAgIGJvcmRlcjogMDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcGFkZGluZzogMDtcbiAgICB3aWR0aDogMjAlO1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIEBleHRlbmQgJXUtYWJzb2x1dGUwO1xuXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlhOWE5O1xuICAgICAgYm9yZGVyLXJhZGl1czogMCA0NXB4IDQ1cHggMDtcbiAgICAgIGxpbmUtaGVpZ2h0OiA0NXB4O1xuICAgICAgei1pbmRleDogMjtcbiAgICB9XG5cbiAgICAmOmhvdmVyIHsgb3BhY2l0eTogLjg7IH1cbiAgICAmOmZvY3VzIHsgb3V0bGluZTogMDsgfVxuICB9XG59XG5cbi8vIHBvc3QgUmVsYXRpdmVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ucG9zdC1yZWxhdGVkIHtcbiAgJi1pbWFnZSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjA3ODUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICAgIGhlaWdodDogMTYwcHg7XG4gIH1cblxuICAmLWV4Y2VycHQgeyBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250IH1cblxuICAmLWV4Y2VycHQsXG4gICYtdGl0bGUge1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC45KTtcbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiAyICFpbXBvcnRhbnQ7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3ggIWltcG9ydGFudDtcbiAgICBsaW5lLWhlaWdodDogMS4xICFpbXBvcnRhbnQ7XG4gICAgbWF4LWhlaWdodDogMi4yZW0gIWltcG9ydGFudDtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcyAhaW1wb3J0YW50O1xuICB9XG5cbiAgLnUtY2FyZCB7XG4gICAgaGVpZ2h0OiAyNzBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICB9XG59XG5cbi8vIFNoYXJlIFBvc3Rcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4uc2hhcmVQb3N0IHtcbiAgLy8gbWFyZ2luLWxlZnQ6IC0xMzBweDtcbiAgbGVmdDogLTEzMHB4O1xuICBtYXJnaW4tdG9wOiAyOHB4O1xuICB3aWR0aDogNDVweDtcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XG5cbiAgYSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgIG1hcmdpbjogMTBweCBhdXRvO1xuICAgIHBhZGRpbmc6IDhweDtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgd2lkdGg6IDM2cHg7XG4gIH1cbn1cblxuLy8gUG9zdCBBY3Rpb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnBvc3RBY3Rpb25zIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm90dG9tOiAwO1xuICBib3gtc2hhZG93OiAwIDAgMXB4IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgaGVpZ2h0OiA0NHB4O1xuICBsZWZ0OiAwO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAwO1xuICAvLyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XG4gIC8vIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3M7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlLWluLW91dDtcbiAgLy8gdmlzaWJpbGl0eTogaGlkZGVuO1xuICB6LWluZGV4OiA0MDA7XG5cbiAgJi5pcy12aXNpYmxlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XG4gICAgLy8gdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIC8vIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xuICAgIC8vIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cblxuICAmLXdyYXAgeyBtYXgtd2lkdGg6IDEyMDBweDsgfVxuXG4gIC5zZXBhcmF0b3Ige1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjE1KTtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgbWFyZ2luOiAwIDE1cHg7XG4gICAgd2lkdGg6IDFweDtcbiAgfVxufVxuXG4ubmV4dFBvc3Qge1xuICBtYXgtd2lkdGg6IDI2MHB4O1xufVxuXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcbiAgLnBvc3QtYm9keSB7XG4gICAgaDIge1xuICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgbWFyZ2luLXRvcDogMjZweDtcbiAgICB9XG5cbiAgICBoMyB7XG4gICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICBtYXJnaW4tdG9wOiAyOHB4O1xuICAgIH1cblxuICAgIGg0IHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIG1hcmdpbi10b3A6IDIycHg7XG4gICAgfVxuXG4gICAgcSB7XG4gICAgICBmb250LXNpemU6IDIycHggIWltcG9ydGFudDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAwOGVtICFpbXBvcnRhbnQ7XG4gICAgICBsaW5lLWhlaWdodDogMS40ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgJiA+IHA6Zmlyc3Qtb2YtdHlwZTo6Zmlyc3QtbGV0dGVyIHtcbiAgICAgIGZvbnQtc2l6ZTogNTQuODVweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICAgICAgbWFyZ2luLXJpZ2h0OiA2cHg7XG4gICAgICBwYWRkaW5nLXRvcDogMy41cHg7XG4gICAgfVxuXG4gICAgb2wsIHVsLCBwIHtcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAwNGVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTg7XG4gICAgfVxuICB9XG59XG4iLCIuYXV0aG9yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICBtaW4taGVpZ2h0OiA0MDBweDtcblxuICAmLWF2YXRhciB7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIHdpZHRoOiA4MHB4O1xuICB9XG5cbiAgJi1tZXRhIHNwYW4ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXNpemU6IDE3cHg7XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIG1hcmdpbjogMCAyNXB4IDE2cHggMDtcbiAgICBvcGFjaXR5OiAuODtcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gIH1cblxuICAmLW5hbWUgeyBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCkgfVxuXG4gICYtYmlvIHsgbWF4LXdpZHRoOiA2MDBweDsgfVxufVxuXG4uYXV0aG9yLmhhcy0taW1hZ2Uge1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAuMzMpO1xuXG4gIC5hdXRob3ItbGluazpob3ZlciB7IG9wYWNpdHk6IDEgIWltcG9ydGFudCB9XG5cbiAgLnUtYWNjZW50Q29sb3ItLWljb25Ob3JtYWwgeyBmaWxsOiAjZmZmOyB9XG5cbiAgYSxcbiAgLmF1dGhvci1uYW1lIHsgY29sb3I6ICNmZmY7IH1cblxuICAuYXV0aG9yLWZvbGxvdyBhIHtcbiAgICBib3JkZXI6IDJweCBzb2xpZDtcbiAgICBib3JkZXItY29sb3I6IGhzbGEoMCwgMCUsIDEwMCUsIC41KSAhaW1wb3J0YW50O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcbiAgLmF1dGhvci1tZXRhIHNwYW4geyBkaXNwbGF5OiBibG9jazsgfVxuICAuYXV0aG9yLWhlYWRlciB7IGRpc3BsYXk6IGJsb2NrOyB9XG4gIC5hdXRob3ItYXZhdGFyIHsgbWFyZ2luOiAwIGF1dG8gMjBweDsgfVxufVxuIiwiLy8gU2VhcmNoXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnNlYXJjaCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvdHRvbTogMTAwJSAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDAgNDBweDtcbiAgdHJhbnNpdGlvbjogYWxsIC4zcztcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB6LWluZGV4OiA5OTk5O1xuXG4gICYtZm9ybSB7XG4gICAgbWF4LXdpZHRoOiA2ODBweDtcbiAgICBtYXJnaW4tdG9wOiA4MHB4O1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlZWU7XG4gICAgICBib3R0b206IDA7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgaGVpZ2h0OiAycHg7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB6LWluZGV4OiAxO1xuICAgIH1cblxuICAgIGlucHV0IHtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xuXG4gICAgICAmOmZvY3VzIHsgb3V0bGluZTogMDsgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHJlc3VsdFxuICAmLXJlc3VsdHMge1xuICAgIG1heC1oZWlnaHQ6IGNhbGMoOTAlIC0gMTAwcHgpO1xuICAgIG1heC13aWR0aDogNjgwcHg7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG5cbiAgICBhIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xuICAgICAgcGFkZGluZzogMTJweCAwO1xuXG4gICAgICAmOmhvdmVyIHsgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KSB9XG4gICAgfVxuICB9XG59XG5cbi5idXR0b24tc2VhcmNoLS1jbG9zZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xuICByaWdodDogNTBweDtcbiAgdG9wOiAyMHB4O1xufVxuXG5ib2R5LmlzLXNlYXJjaCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgLnNlYXJjaCB7XG4gICAgYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHRyYW5zaXRpb246IGFsbCAuM3M7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgfVxufVxuIiwiLnNpZGViYXIge1xyXG4gICYtdGl0bGUge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjA3ODUpO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xyXG4gIH1cclxuXHJcbiAgLy8gYm9yZGVyIGZvciBwb3N0XHJcbiAgJi1ib3JkZXIge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAkcHJpbWFyeS1jb2xvcjtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC4yKTtcclxuICAgIGZvbnQtZmFtaWx5OiAkc2VjdW5kYXJ5LWZvbnQ7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcGFkZGluZzogMTVweCAxMHB4IDEwcHg7XHJcbiAgICB0b3A6IDA7XHJcbiAgfVxyXG59XHJcblxyXG4uc2lkZWJhci1wb3N0IHtcclxuICAmOm50aC1jaGlsZCgzbikgeyAuc2lkZWJhci1ib3JkZXIgeyBib3JkZXItY29sb3I6IGRhcmtlbihvcmFuZ2UsIDIlKTsgfSB9XHJcbiAgJjpudGgtY2hpbGQoM24rMikgeyAuc2lkZWJhci1ib3JkZXIgeyBib3JkZXItY29sb3I6ICMyNmE4ZWQgfSB9XHJcblxyXG4gICYtLXRpdGxlIHtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XHJcbiAgfVxyXG5cclxuICAmLS1saW5rIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBtaW4taGVpZ2h0OiA1MHB4O1xyXG4gICAgcGFkZGluZzogMTVweCAxNXB4IDE1cHggNTVweDtcclxuICAgICY6aG92ZXIgeyAuc2lkZWJhci1ib3JkZXIge2JhY2tncm91bmQtY29sb3I6IHJnYmEoMjI5LDIzOSwyNDUsMSk7fSAgfVxyXG5cclxuICB9XHJcbn1cclxuIiwiLy8gTmF2aWdhdGlvbiBNb2JpbGVcclxuLnNpZGVOYXYge1xyXG4gIC8vIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xyXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBwYWRkaW5nOiAkaGVhZGVyLWhlaWdodC1tb2JpbGUgMjBweDtcclxuICBwb3NpdGlvbjogZml4ZWQgIWltcG9ydGFudDtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XHJcbiAgdHJhbnNpdGlvbjogMC40cztcclxuICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xyXG4gIHotaW5kZXg6IDk5O1xyXG5cclxuICAmLW1lbnUgYSB7IHBhZGRpbmc6IDEwcHggMjBweDsgfVxyXG5cclxuICAmLXdyYXAge1xyXG4gICAgYmFja2dyb3VuZDogI2VlZTtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgcGFkZGluZzogMjBweCAwO1xyXG4gICAgdG9wOiAkaGVhZGVyLWhlaWdodC1tb2JpbGU7XHJcbiAgfVxyXG5cclxuICAmLXNlY3Rpb24ge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICNkZGQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xyXG4gIH1cclxuXHJcbiAgJi1mb2xsb3cge1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICBtYXJnaW46IDE1cHggMDtcclxuXHJcbiAgICBhIHtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgICBsaW5lLWhlaWdodDogMjBweDtcclxuICAgICAgbWFyZ2luOiAwIDVweCA1cHggMDtcclxuICAgICAgbWluLXdpZHRoOiAzNnB4O1xyXG4gICAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIH1cclxuXHJcbiAgICBAZWFjaCAkc29jaWFsLW5hbWUsICRjb2xvciBpbiAkc29jaWFsLWNvbG9ycyB7XHJcbiAgICAgIC5pLSN7JHNvY2lhbC1uYW1lfSB7XHJcbiAgICAgICAgQGV4dGVuZCAuYmctI3skc29jaWFsLW5hbWV9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIkBtZWRpYSAjeyRtZC1hbmQtdXB9IHtcbiAgLy8gYmFja2dyb3VuZCBpbWFnZSBmZWF0dXJlZCBpbiB0YWcgYW5kIGF1dGhvclxuICAuaXMtYXV0aG9yLmhhcy1mZWF0dXJlZC1pbWFnZSxcbiAgLmlzLXRhZy5oYXMtZmVhdHVyZWQtaW1hZ2Uge1xuICAgIC5oZWFkZXIsXG4gICAgLm1haW5NZW51IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgIH1cbiAgICAudS1oZWFkZXJDb2xvckxpbmsgYSB7IGNvbG9yOiAjZmZmOyB9XG5cbiAgICAubWFpbiB7XG4gICAgICBtYXJnaW4tdG9wOiAtNTZweDtcbiAgICB9XG5cbiAgICAudGFnLFxuICAgIC5hdXRob3Ige1xuICAgICAgcGFkZGluZy10b3A6IDEwMHB4O1xuICAgIH1cbiAgfVxuXG4gIC8vIGlzLWFydGljbGVcbiAgLmlzLWFydGljbGUge1xuICAgIC5wb3N0LWhlYWRlciB7IHBhZGRpbmctdG9wOiAzNXB4OyB9XG4gICAgLnBvc3QtYm9keSB7IG1hcmdpbi10b3A6IDMwcHg7IH1cblxuICAgIC5wb3N0LWltYWdlLFxuICAgIC52aWRlby1wb3N0LWZvcm1hdCB7IG1hcmdpbi10b3A6IDUwcHg7IH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QU1pS0EsQUpqS0EsS0lpS0ssQ0pqS0M7RUFDSixLQUFLLEVBQUUsT0FBTztFQUNkLE1BQU0sRUFBRSxPQUFPO0VBQ2YsZUFBZSxFQUFFLElBQUksR0FDdEI7O0FJMkpELEFKekpBLGFJeUphLENKekpDO0VBQ1osS0FBSyxFREpTLE9BQU87RUNLckIsZUFBZSxFQUFFLElBQUksR0FFdEI7RUlxSkQsQUp6SkEsYUl5SmEsQUp0SlgsTUFBTyxDQUFDO0lBQUUsS0FBSyxFRExLLE9BQU8sR0NLYzs7QU8wQjNDLEFQZEEsWU9jWSxFUW1KWixBZmpLQSxnQmVpS2dCLENBdUJkLFVBQVUsQUFTUixRQUFTLENmak1BO0VBQ1gsTUFBTSxFQUFFLENBQUM7RUFDVCxJQUFJLEVBQUUsQ0FBQztFQUNQLFFBQVEsRUFBRSxRQUFRO0VBQ2xCLEtBQUssRUFBRSxDQUFDO0VBQ1IsR0FBRyxFQUFFLENBQUMsR0FDUDs7QUl5TUQsQUp2TUEsSUl1TUksQUFPRixXQUFZLEVHN01kLEFQREEsa0JPQ2tCLENQREc7RUFDbkIsS0FBSyxFQUFFLGtCQUFpQixDQUFDLFVBQVU7RUFDbkMsSUFBSSxFQUFFLGtCQUFpQixD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Q1QsQUFNRSxJQU5FLENBTUYsSUFBSSxBQXdCRSxHQUFJLENBQUs7UUFDUCxLQUFLLEVBSEEsU0FBdUMsR0FJN0M7TUFoQ1QsQUFNRSxJQU5FLENBTUYsSUFBSSxBQXdCRSxHQUFJLENBQUs7UUFDUCxLQUFLLEVBSEEsR0FBdUMsR0FJN0M7TUFoQ1QsQUFNRSxJQU5FLENBTUYsSUFBSSxBQXdCRSxHQUFJLENBQUs7UUFDUCxLQUFLLEVBSEEsU0FBdUMsR0FJN0M7TUFoQ1QsQUFNRSxJQU5FLENBTUYsSUFBSSxBQXdCRSxHQUFJLENBQUs7UUFDUCxLQUFLLEVBSEEsU0FBdUMsR0FJN0M7TUFoQ1QsQUFNRSxJQU5FLENBTUYsSUFBSSxBQXdCRSxHQUFJLENBQUs7UUFDUCxLQUFLLEVBSEEsR0FBdUMsR0FJN0M7TUFoQ1QsQUFNRSxJQU5FLENBTUYsSUFBSSxBQXdCRSxJQUFLLENBQUk7UUFDUCxLQUFLLEVBSEEsU0FBdUMsR0FJN0M7TUFoQ1QsQUFNRSxJQU5FLENBTUYsSUFBSSxBQXdCRSxJQUFLLENBQUk7UUFDUCxLQUFLLEVBSEEsU0FBdUMsR0FJN0M7TUFoQ1QsQUFNRSxJQU5FLENBTUYsSUFBSSxBQXdCRSxJQUFLLENBQUk7UUFDUCxLQUFLLEVBSEEsSUFBdUMsR0FJN0M7SUFNTCxNQUFNLE1BQU0sTUFBTSxNQUFNLFNBQVMsRUFBRyxNQUFNO01BdEM5QyxBQU1FLElBTkUsQ0FNRixJQUFJLEFBdUNFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxRQUF1QyxHQUk3QztNQS9DVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBdUNFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQS9DVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBdUNFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxHQUF1QyxHQUk3QztNQS9DVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBdUNFLEdBQUksQ0FBSztRQUNQLEtBQUssRUFIQSxTQUF1QyxHQUk3QztNQS9DVCxBQU1FLElBTkUsQ0FNRixJQUFJLEFBdUNFLEdB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 */","%link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n%link--accent {\n  color: $primary-color;\n  text-decoration: none;\n  &:hover { color: $primary-color-hover; }\n}\n\n%content-absolute-bottom {\n  bottom: 0;\n  left: 0;\n  margin: 30px;\n  max-width: 600px;\n  position: absolute;\n  z-index: 2;\n}\n\n%u-absolute0 {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n%u-text-color-darker {\n  color: rgba(0, 0, 0, .8) !important;\n  fill: rgba(0, 0, 0, .8) !important;\n}\n\n%fonts-icons {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n","@charset \"UTF-8\";\n\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none;\n}\n\n.link--accent:hover {\n  color: #00ab6b;\n}\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.tag.not--image,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection,\npre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection,\ncode[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none;\n  }\n}\n\n/* Code blocks */\n\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0;\n}\n\n/* Inline code */\n\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n.token.punctuation {\n  color: #999;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n.token.function {\n  color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in;\n}\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms;\n}\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out;\n}\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1;\n}\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nblockquote p:first-of-type {\n  margin-top: 0;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px;\n}\n\nfigure {\n  margin: 0;\n}\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4;\n}\n\ncode[class*=language-] .token.comment,\npre[class*=language-] .token.comment {\n  opacity: .8;\n}\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n}\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -25px;\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\ni {\n  vertical-align: middle;\n}\n\nol,\nul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n}\n\nq::before,\nq::after {\n  display: none;\n}\n\n.link--underline:active,\n.link--underline:focus,\n.link--underline:hover {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.main,\n.footer {\n  transition: transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px;\n  }\n}\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n.warning::before {\n  content: \"\";\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n.note::before {\n  content: \"\";\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n.success::before {\n  color: #00bfa5;\n  content: \"\";\n}\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n  margin-top: -5px;\n}\n\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n}\n\n.tag-wrap {\n  z-index: 2;\n}\n\n.tag.not--image {\n  min-height: auto;\n}\n\n.tag-description {\n  max-width: 500px;\n}\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n.with-tooltip::after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #fff;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 130px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n.with-tooltip:hover::after {\n  animation: tooltip .1s ease-out both;\n}\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n  padding-bottom: 45px;\n}\n\n.footer .follow a {\n  color: rgba(0, 0, 0, 0.8);\n  padding: 0 7px;\n}\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.footer a:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n}\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  left: 50%;\n  min-width: 680px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n}\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n.bg-google,\n.sideNav-follow .i-google {\n  background-color: #dd4b39 !important;\n}\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n.c-github {\n  color: #555 !important;\n}\n\n.bg-github,\n.sideNav-follow .i-github {\n  background-color: #555 !important;\n}\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n.bg-linkedin,\n.sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important;\n}\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n.bg-spotify,\n.sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important;\n}\n\n.c-codepen {\n  color: #222 !important;\n}\n\n.bg-codepen,\n.sideNav-follow .i-codepen {\n  background-color: #222 !important;\n}\n\n.c-behance {\n  color: #131418 !important;\n}\n\n.bg-behance,\n.sideNav-follow .i-behance {\n  background-color: #131418 !important;\n}\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n.bg-dribbble,\n.sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n.bg-flickr,\n.sideNav-follow .i-flickr {\n  background-color: #0063dc !important;\n}\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n.bg-reddit,\n.sideNav-follow .i-reddit {\n  background-color: #ff4500 !important;\n}\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n.bg-pocket,\n.sideNav-follow .i-pocket {\n  background-color: #f50057 !important;\n}\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n.bg-pinterest,\n.sideNav-follow .i-pinterest {\n  background-color: #bd081c !important;\n}\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n.bg-whatsapp,\n.sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important;\n}\n\n.c-telegram {\n  color: #08c !important;\n}\n\n.bg-telegram,\n.sideNav-follow .i-telegram {\n  background-color: #08c !important;\n}\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n}\n\n.rocket:hover svg path {\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.svgIcon {\n  display: inline-block;\n}\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  animation: loading-bar 1s ease-in-out infinite;\n  animation-delay: .8s;\n  display: block;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44) !important;\n  fill: rgba(0, 0, 0, 0.44) !important;\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.u-accentColor--iconNormal {\n  color: #00A034;\n  fill: #00A034;\n}\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n.u-headerColorLink a {\n  color: #BBF1B9;\n}\n\n.u-headerColorLink a.active,\n.u-headerColorLink a:hover {\n  color: #EEFFEA;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-fixed {\n  position: fixed !important;\n}\n\n.u-block {\n  display: block !important;\n}\n\n.u-inlineBlock {\n  display: inline-block;\n}\n\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n.u-clear::before,\n.row::before,\n.u-clear::after,\n.row::after {\n  content: \" \";\n  display: table;\n}\n\n.u-clear::after,\n.row::after {\n  clear: both;\n}\n\n.u-fontSize13 {\n  font-size: 13px;\n}\n\n.u-fontSize14 {\n  font-size: 14px;\n}\n\n.u-fontSize15 {\n  font-size: 15px !important;\n}\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n.u-fontSize28 {\n  font-size: 28px !important;\n}\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important;\n  }\n\n  .u-md-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n.u-fontWeightSemibold {\n  font-weight: 600;\n}\n\n.u-fontWeightBold {\n  font-weight: 700;\n}\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.u-marginTop20 {\n  margin-top: 20px;\n}\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important;\n}\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n.u-padding20 {\n  padding: 20px;\n}\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n.u-paddingRight10 {\n  padding-right: 10px;\n}\n\n.u-paddingLeft15 {\n  padding-left: 15px;\n}\n\n.u-paddingTop2 {\n  padding-top: 2px;\n}\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n.u-lineHeightTight {\n  line-height: 1.2;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-floatRight {\n  float: right;\n}\n\n.u-floatLeft {\n  float: left;\n}\n\n.u-flex {\n  display: flex;\n}\n\n.u-flexCenter {\n  align-items: center;\n  display: flex;\n}\n\n.u-flex1 {\n  flex: 1 1 auto;\n}\n\n.u-flex0 {\n  flex: 0 0 auto;\n}\n\n.u-flexWrap {\n  flex-wrap: wrap;\n}\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.u-flexColumnTop {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1200 {\n  max-width: 1200px;\n}\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.u-round {\n  border-radius: 50%;\n}\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n.u-height540 {\n  height: 540px;\n}\n\n.u-height280 {\n  height: 280px;\n}\n\n.u-height260 {\n  height: 260px;\n}\n\n.u-height100 {\n  height: 100px;\n}\n\n.u-borderBlackLightest {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.u-hide {\n  display: none !important;\n}\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  border-radius: 3px;\n  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important;\n  }\n\n  .u-md-heightAuto {\n    height: auto;\n  }\n\n  .u-md-height170 {\n    height: 170px;\n  }\n\n  .u-md-relative {\n    position: relative;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .content {\n    max-width: calc(100% - 340px) !important;\n  }\n\n  .sidebar {\n    width: 340px !important;\n  }\n}\n\n.row {\n  margin-left: -10px;\n  margin-right: -10px;\n}\n\n.row .col {\n  float: left;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n.row .col.s1 {\n  width: 8.33333%;\n}\n\n.row .col.s2 {\n  width: 16.66667%;\n}\n\n.row .col.s3 {\n  width: 25%;\n}\n\n.row .col.s4 {\n  width: 33.33333%;\n}\n\n.row .col.s5 {\n  width: 41.66667%;\n}\n\n.row .col.s6 {\n  width: 50%;\n}\n\n.row .col.s7 {\n  width: 58.33333%;\n}\n\n.row .col.s8 {\n  width: 66.66667%;\n}\n\n.row .col.s9 {\n  width: 75%;\n}\n\n.row .col.s10 {\n  width: 83.33333%;\n}\n\n.row .col.s11 {\n  width: 91.66667%;\n}\n\n.row .col.s12 {\n  width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  .row .col.m1 {\n    width: 8.33333%;\n  }\n\n  .row .col.m2 {\n    width: 16.66667%;\n  }\n\n  .row .col.m3 {\n    width: 25%;\n  }\n\n  .row .col.m4 {\n    width: 33.33333%;\n  }\n\n  .row .col.m5 {\n    width: 41.66667%;\n  }\n\n  .row .col.m6 {\n    width: 50%;\n  }\n\n  .row .col.m7 {\n    width: 58.33333%;\n  }\n\n  .row .col.m8 {\n    width: 66.66667%;\n  }\n\n  .row .col.m9 {\n    width: 75%;\n  }\n\n  .row .col.m10 {\n    width: 83.33333%;\n  }\n\n  .row .col.m11 {\n    width: 91.66667%;\n  }\n\n  .row .col.m12 {\n    width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .row .col.l1 {\n    width: 8.33333%;\n  }\n\n  .row .col.l2 {\n    width: 16.66667%;\n  }\n\n  .row .col.l3 {\n    width: 25%;\n  }\n\n  .row .col.l4 {\n    width: 33.33333%;\n  }\n\n  .row .col.l5 {\n    width: 41.66667%;\n  }\n\n  .row .col.l6 {\n    width: 50%;\n  }\n\n  .row .col.l7 {\n    width: 58.33333%;\n  }\n\n  .row .col.l8 {\n    width: 66.66667%;\n  }\n\n  .row .col.l9 {\n    width: 75%;\n  }\n\n  .row .col.l10 {\n    width: 83.33333%;\n  }\n\n  .row .col.l11 {\n    width: 91.66667%;\n  }\n\n  .row .col.l12 {\n    width: 100%;\n  }\n}\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.button i {\n  display: inline-block;\n}\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n.button--chromeless:active,\n.button--chromeless:hover,\n.button--chromeless:focus {\n  border-width: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.button--primary {\n  border-color: #00A034;\n  color: #00A034;\n}\n\n.buttonSet > .button {\n  margin-right: 8px;\n  vertical-align: middle;\n}\n\n.buttonSet > .button:last-child {\n  margin-right: 0;\n}\n\n.buttonSet .button--chromeless {\n  height: 37px;\n  line-height: 35px;\n}\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"./../fonts/simply.eot\");\n  src: url(\"./../fonts/simply.eot\") format(\"embedded-opentype\"), url(\"./../fonts/simply.ttf\") format(\"truetype\"), url(\"./../fonts/simply.woff\") format(\"woff\"), url(\"./../fonts/simply.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.i-telegram:before {\n  content: \"\\f2c6\";\n}\n\n.i-link:before {\n  content: \"\\f0c1\";\n}\n\n.i-reddit:before {\n  content: \"\\f281\";\n}\n\n.i-twitter:before {\n  content: \"\\f099\";\n}\n\n.i-github:before {\n  content: \"\\f09b\";\n}\n\n.i-linkedin:before {\n  content: \"\\f0e1\";\n}\n\n.i-code:before {\n  content: \"\\f121\";\n}\n\n.i-youtube:before {\n  content: \"\\f16a\";\n}\n\n.i-stack-overflow:before {\n  content: \"\\f16c\";\n}\n\n.i-instagram:before {\n  content: \"\\f16d\";\n}\n\n.i-flickr:before {\n  content: \"\\f16e\";\n}\n\n.i-dribbble:before {\n  content: \"\\f17d\";\n}\n\n.i-behance:before {\n  content: \"\\f1b4\";\n}\n\n.i-spotify:before {\n  content: \"\\f1bc\";\n}\n\n.i-codepen:before {\n  content: \"\\f1cb\";\n}\n\n.i-facebook:before {\n  content: \"\\f230\";\n}\n\n.i-pinterest:before {\n  content: \"\\f231\";\n}\n\n.i-whatsapp:before {\n  content: \"\\f232\";\n}\n\n.i-snapchat:before {\n  content: \"\\f2ac\";\n}\n\n.i-comments:before {\n  content: \"\\e900\";\n}\n\n.i-location:before {\n  content: \"\\e8b4\";\n}\n\n.i-save:before {\n  content: \"\\e8e6\";\n}\n\n.i-save--line:before {\n  content: \"\\e8e7\";\n}\n\n.i-check-circle:before {\n  content: \"\\e86c\";\n}\n\n.i-close:before {\n  content: \"\\e5cd\";\n}\n\n.i-favorite:before {\n  content: \"\\e87d\";\n}\n\n.i-star:before {\n  content: \"\\e838\";\n}\n\n.i-warning:before {\n  content: \"\\e002\";\n}\n\n.i-rss:before {\n  content: \"\\e0e5\";\n}\n\n.i-search:before {\n  content: \"\\e8b6\";\n}\n\n.i-send:before {\n  content: \"\\e163\";\n}\n\n.i-share:before {\n  content: \"\\e80d\";\n}\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both;\n}\n\n.animated.infinite {\n  animation-iteration-count: infinite;\n}\n\n.bounceIn {\n  animation-name: bounceIn;\n}\n\n.bounceInDown {\n  animation-name: bounceInDown;\n}\n\n.pulse {\n  animation-name: pulse;\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    transform: none;\n  }\n}\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n}\n\n@keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n\n@keyframes loading-bar {\n  0% {\n    transform: translateX(-100%);\n  }\n\n  40% {\n    transform: translateX(0);\n  }\n\n  60% {\n    transform: translateX(0);\n  }\n\n  100% {\n    transform: translateX(100%);\n  }\n}\n\n.header {\n  z-index: 80;\n}\n\n.header-wrap {\n  height: 55px;\n}\n\n.header-logo {\n  color: #fff !important;\n  height: 30px;\n}\n\n.header-logo img {\n  max-height: 100%;\n}\n\n.header-logo,\n.header .button-search--open,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n.header-description {\n  color: rgba(255, 255, 255, 0.8);\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 650px;\n}\n\n.not-logo .header-logo {\n  height: auto !important;\n}\n\n.follow > a {\n  padding-left: 15px;\n}\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n}\n\n.nav ul {\n  display: flex;\n  margin-right: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.nav li {\n  float: left;\n}\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n}\n\n.button-nav--toggle span {\n  background-color: #BBF1B9;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  transition: .4s;\n  width: 20px;\n}\n\n.button-nav--toggle span:first-child {\n  transform: translate(0, -6px);\n}\n\n.button-nav--toggle span:last-child {\n  transform: translate(0, 6px);\n}\n\n@media only screen and (min-width: 766px) {\n  body.is-home .header-wrap {\n    height: 200px;\n  }\n\n  body.is-home .header-logo {\n    height: 50px;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed;\n  }\n\n  .header-wrap {\n    height: 50px;\n  }\n\n  .header-logo--wrap {\n    text-align: left;\n  }\n\n  .header-logo {\n    display: flex;\n    flex: 1 1 auto;\n  }\n\n  .header-top {\n    display: flex;\n    align-items: center;\n  }\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  body.is-showNavMob .sideNav {\n    transform: translateX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    transform: rotate(90deg);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    transform: rotate(45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    transform: scaleX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    transform: rotate(-45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    transform: translateX(-25%);\n  }\n}\n\n.avatar-image--smaller {\n  width: 40px;\n  height: 40px;\n}\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%;\n}\n\n.story-title {\n  letter-spacing: -.028em;\n}\n\n.story-excerpt {\n  display: -webkit-box;\n  margin-top: 5px;\n  max-height: 4.5em;\n  line-height: 1.4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n\n@media only screen and (min-width: 766px) {\n  .story--260 .story-wrap {\n    height: 260px;\n  }\n\n  .story--260 .story-image {\n    height: 100px;\n  }\n\n  .story--260 .story-body {\n    height: 160px;\n  }\n\n  .story--200 .story-wrap {\n    height: 260px;\n    display: flex;\n  }\n\n  .story--200 .story-body {\n    flex: 1 1 auto;\n    height: 100%;\n  }\n\n  .story--200 .story-image {\n    flex: 0 0 auto;\n    height: 100%;\n    width: 200px;\n  }\n}\n\n.card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n.card--p {\n  font-family: \"Droid Serif\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.card-image {\n  max-height: 240px;\n  max-width: 360px;\n}\n\n.card.card--large .card-body {\n  display: flex;\n  flex-direction: column;\n}\n\n.card.card--large .card-image {\n  height: 200px;\n  margin-bottom: 20px;\n  margin-top: 5px;\n  max-width: 100%;\n  order: -1;\n}\n\n.card.card--large .card-image--link {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n}\n\n.card.card--medium .card-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n}\n\n.post-title {\n  line-height: 1.04;\n}\n\n.postMetaInline {\n  letter-spacing: 0;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n.post-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px;\n}\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px;\n}\n\n.post-body ul li,\n.post-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-bottom: 14px;\n  margin-left: 30px;\n}\n\n.post-body ul li::before,\n.post-body ol li::before {\n  box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n.post-body ul li::before {\n  content: '•';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px;\n}\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  margin-top: 40px !important;\n}\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important;\n}\n\n.post-body blockquote,\n.post-body dl,\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6,\n.post-body ol,\n.post-body p,\n.post-body pre,\n.post-body ul {\n  min-width: 100%;\n}\n\n.kg-card-markdown {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.kg-card-markdown > p:first-of-type::first-letter,\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.post-newsletter {\n  outline: 1px solid #f0f0f0 !important;\n  outline-offset: -1px;\n  border-radius: 2px;\n  padding: 40px 10px;\n}\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n.post-related-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 160px;\n}\n\n.post-related-excerpt {\n  font-family: \"Droid Serif\", serif;\n}\n\n.post-related-excerpt,\n.post-related-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n.post-related .u-card {\n  height: 270px;\n  margin-bottom: 20px;\n}\n\n.sharePost {\n  left: -130px;\n  margin-top: 28px;\n  width: 45px;\n  position: absolute !important;\n}\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translate3d(0, 0, 0);\n  transition: all 0.25s ease-in-out;\n  z-index: 400;\n}\n\n.postActions.is-visible {\n  transform: translateY(100%);\n}\n\n.postActions-wrap {\n  max-width: 1200px;\n}\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px;\n  }\n\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px;\n  }\n\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px;\n  }\n\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important;\n  }\n\n  .post-body > p:first-of-type::first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px;\n  }\n\n  .post-body ol,\n  .post-body ul,\n  .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n.author-avatar {\n  height: 80px;\n  width: 80px;\n}\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author-bio {\n  max-width: 600px;\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n.author.has--image .u-accentColor--iconNormal {\n  fill: #fff;\n}\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n.author.has--image .author-follow a {\n  border: 2px solid;\n  border-color: rgba(255, 255, 255, 0.5) !important;\n  font-size: 16px;\n}\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block;\n  }\n\n  .author-header {\n    display: block;\n  }\n\n  .author-avatar {\n    margin: 0 auto 20px;\n  }\n}\n\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999;\n}\n\n.search-form {\n  max-width: 680px;\n  margin-top: 80px;\n}\n\n.search-form::before {\n  background: #eee;\n  bottom: 0;\n  content: '';\n  display: block;\n  height: 2px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n.search-form input {\n  border: none;\n  display: block;\n  line-height: 40px;\n  padding-bottom: 8px;\n}\n\n.search-form input:focus {\n  outline: 0;\n}\n\n.search-results {\n  max-height: calc(90% - 100px);\n  max-width: 680px;\n  overflow: auto;\n}\n\n.search-results a {\n  border-bottom: 1px solid #eee;\n  padding: 12px 0;\n}\n\n.search-results a:hover {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px;\n}\n\nbody.is-search {\n  overflow: hidden;\n}\n\nbody.is-search .search {\n  bottom: 0 !important;\n  height: 100%;\n  transition: all .3s;\n  visibility: visible;\n}\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: 0.4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n@media only screen and (min-width: 766px) {\n  .is-author.has-featured-image .header,\n  .is-author.has-featured-image .mainMenu,\n  .is-tag.has-featured-image .header,\n  .is-tag.has-featured-image .mainMenu {\n    background-color: transparent !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  }\n\n  .is-author.has-featured-image .u-headerColorLink a,\n  .is-tag.has-featured-image .u-headerColorLink a {\n    color: #fff;\n  }\n\n  .is-author.has-featured-image .main,\n  .is-tag.has-featured-image .main {\n    margin-top: -56px;\n  }\n\n  .is-author.has-featured-image .tag,\n  .is-author.has-featured-image .author,\n  .is-tag.has-featured-image .tag,\n  .is-tag.has-featured-image .author {\n    padding-top: 100px;\n  }\n\n  .is-article .post-header {\n    padding-top: 35px;\n  }\n\n  .is-article .post-body {\n    margin-top: 30px;\n  }\n\n  .is-article .post-image,\n  .is-article .video-post-format {\n    margin-top: 50px;\n  }\n}\n\n","\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n\n  &:active,\n  &:hover {\n    outline: 0;\n  }\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, .8);\n  font-family: $secundary-font;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n\n  p:first-of-type { margin-top: 0 }\n}\n\nbody {\n  color: $primary-text-color;\n  font-family: $primary-font;\n  font-size: $font-size-base;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\n//Default styles\nhtml {\n  box-sizing: border-box;\n  font-size: $font-size-root;\n}\n\nfigure {\n  margin: 0;\n}\n\n// Code\n// ==========================================================================\nkbd, samp, code {\n  background: $code-bg-color;\n  border-radius: 4px;\n  color: $code-color;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: $code-bg-color !important;\n  border-radius: 4px;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  margin-top: 30px !important;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n\n  code {\n    background: transparent;\n    color: $pre-code-color;\n    padding: 0;\n    text-shadow: 0 1px #fff;\n  }\n}\n\ncode[class*=language-],\npre[class*=language-] {\n  color: $pre-code-color;\n  line-height: 1.4;\n\n  .token.comment { opacity: .8; }\n}\n\n// hr\n// ==========================================================================\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n\n  &::before {\n    color: rgba(0, 0, 0, .6);\n    content: '...';\n    display: inline-block;\n    font-family: $primary-font;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -25px;\n  }\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n\n  &:not([src]) {\n    visibility: hidden;\n  }\n}\n\ni {\n  // display: inline-block;\n  vertical-align: middle;\n}\n\nol, ul {\n  list-style: none;\n  list-style-image: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, rgba(215, 253, 211, 1), rgba(215, 253, 211, 1));\n  color: rgba(0, 0, 0, .8);\n}\n\nq {\n  color: rgba(0, 0, 0, .44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n\n  &::before, &::after { display: none; }\n}\n\n// Links color\n// ==========================================================================\n.link--accent { @extend %link--accent; }\n\n.link { @extend %link; }\n\n.link--underline {\n  &:active,\n  &:focus,\n  &:hover {\n    color: inherit;\n    text-decoration: underline;\n  }\n}\n\n// Animation main page and footer\n// ==========================================================================\n.main,\n.footer { transition: transform .5s ease; }\n\n@media #{$md-and-down} {\n  .main {\n    overflow: hidden;\n    padding-top: $header-height-mobile;\n  }\n}\n\n// warning success and Note\n// ==========================================================================\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n  &::before { content: $i-warning; }\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n  &::before { content: $i-star; }\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n  &::before { color: #00bfa5; content: $i-check; }\n}\n\n.warning, .note, .success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n\n  a {\n    color: inherit;\n    text-decoration: underline;\n  }\n\n  &::before {\n    @extend %fonts-icons;\n\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n    margin-top: -5px;\n  }\n}\n\n// Page Tags\n// ==========================================================================\n.tag {\n  color: #fff;\n  min-height: 300px;\n  z-index: 2;\n\n  &-wrap { z-index: 2; }\n\n  &.not--image {\n    @extend %u-text-color-darker;\n\n    min-height: auto;\n  }\n\n  &-description {\n    max-width: 500px;\n  }\n}\n\n// toltip\n// ==========================================================================\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n\n  &::after {\n    background: rgba(0, 0, 0, .85);\n    border-radius: 4px;\n    color: #fff;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 130px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1;\n  }\n\n  &:hover::after {\n    animation: tooltip .1s ease-out both;\n  }\n}\n\n// Footer\n// ==========================================================================\n.footer {\n  color: rgba(0, 0, 0, .44);\n  padding-bottom: 45px;\n\n  .follow {\n    a {\n      color: rgba(0, 0, 0, 0.8);\n      padding: 0 7px;\n    }\n  }\n\n  a {\n    color: rgba(0, 0, 0, .6);\n    &:hover { color: rgba(0, 0, 0, .8); }\n  }\n}\n\n// Error page\n// ==========================================================================\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n\n  &-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px;\n  }\n\n  &-text {\n    margin-top: 60px;\n    white-space: pre-wrap;\n  }\n\n  &-wrap {\n    color: rgba(0, 0, 0, .4);\n    left: 50%;\n    min-width: 680px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n}\n\n// Video Responsive\n// ==========================================================================\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n  width: 100%;\n\n  iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n}\n\n// Social Media Color\n// ==========================================================================\n@each $social-name, $color in $social-colors {\n  .c-#{$social-name} { color: $color !important; }\n  .bg-#{$social-name} { background-color: $color !important; }\n}\n\n// Facebook Save\n// ==========================================================================\n// .fbSave {\n//   &-dropdown {\n//     background-color: #fff;\n//     border: 1px solid #e0e0e0;\n//     bottom: 100%;\n//     display: none;\n//     max-width: 200px;\n//     min-width: 100px;\n//     padding: 8px;\n//     transform: translate(-50%, 0);\n//     z-index: 10;\n\n//     &.is-visible { display: block; }\n//   }\n// }\n\n// Rocket for return top page\n// ==========================================================================\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  width: 60px;\n  z-index: 888;\n\n  &:hover svg path {\n    fill: rgba(0, 0, 0, .6);\n  }\n}\n\n.svgIcon {\n  display: inline-block;\n}\n\nsvg {\n  height: auto;\n  width: 100%;\n}\n\n// Load More\n// ==========================================================================\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  background-color: #48e79a;\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  animation: loading-bar 1s ease-in-out infinite;\n  animation-delay: .8s;\n  display: block;\n}\n","/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n","/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*=\"language-\"],\n\tpre[class*=\"language-\"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #a67f59;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n","img[data-action=\"zoom\"] {\r\n  cursor: zoom-in;\r\n}\r\n.zoom-img,\r\n.zoom-img-wrap {\r\n  position: relative;\r\n  z-index: 666;\r\n  -webkit-transition: all 300ms;\r\n       -o-transition: all 300ms;\r\n          transition: all 300ms;\r\n}\r\nimg.zoom-img {\r\n  cursor: pointer;\r\n  cursor: -webkit-zoom-out;\r\n  cursor: -moz-zoom-out;\r\n}\r\n.zoom-overlay {\r\n  z-index: 420;\r\n  background: #fff;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  pointer-events: none;\r\n  filter: \"alpha(opacity=0)\";\r\n  opacity: 0;\r\n  -webkit-transition:      opacity 300ms;\r\n       -o-transition:      opacity 300ms;\r\n          transition:      opacity 300ms;\r\n}\r\n.zoom-overlay-open .zoom-overlay {\r\n  filter: \"alpha(opacity=100)\";\r\n  opacity: 1;\r\n}\r\n.zoom-overlay-open,\r\n.zoom-overlay-transitioning {\r\n  cursor: default;\r\n}\r\n","// Headings\r\n\r\nh1, h2, h3, h4, h5, h6,\r\n.h1, .h2, .h3, .h4, .h5, .h6 {\r\n  color: $headings-color;\r\n  font-family: $headings-font-family;\r\n  font-weight: $headings-font-weight;\r\n  line-height: $headings-line-height;\r\n  margin: 0;\r\n\r\n  a {\r\n    color: inherit;\r\n    line-height: inherit;\r\n  }\r\n}\r\n\r\nh1 { font-size: $font-size-h1; }\r\nh2 { font-size: $font-size-h2; }\r\nh3 { font-size: $font-size-h3; }\r\nh4 { font-size: $font-size-h4; }\r\nh5 { font-size: $font-size-h5; }\r\nh6 { font-size: $font-size-h6; }\r\n\r\n// These declarations are kept separate from and placed after\r\n// the previous tag-based declarations so that the classes beat the tags in\r\n// the CSS cascade, and thus <h1 class=\"h2\"> will be styled like an h2.\r\n.h1 { font-size: $font-size-h1; }\r\n.h2 { font-size: $font-size-h2; }\r\n.h3 { font-size: $font-size-h3; }\r\n.h4 { font-size: $font-size-h4; }\r\n.h5 { font-size: $font-size-h5; }\r\n.h6 { font-size: $font-size-h6; }\r\n\r\n\r\np {\r\n  margin: 0;\r\n}\r\n","// color\n.u-textColorNormal {\n  color: rgba(0, 0, 0, .44) !important;\n  fill: rgba(0, 0, 0, .44) !important;\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, .6);\n  fill: rgba(0, 0, 0, .6);\n}\n\n.u-accentColor--iconNormal {\n  color: $primary-color;\n  fill: $primary-color;\n}\n\n//  background color\n.u-bgColor { background-color: $primary-color; }\n\n.u-headerColorLink a {\n  // color: rgba(0, 0, 0, .44);\n  color: $header-color;\n\n  &.active,\n  &:hover {\n    // color: $header-\n    color: $header-color-hover;\n  }\n}\n\n.u-textColorDarker { @extend %u-text-color-darker; }\n\n// Positions\n.u-relative { position: relative; }\n.u-absolute { position: absolute; }\n.u-absolute0 { @extend %u-absolute0; }\n.u-fixed { position: fixed !important; }\n\n.u-block { display: block !important }\n.u-inlineBlock { display: inline-block }\n\n//  Background\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, .3) 29%, rgba(0, 0, 0, .6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n// .u-background-white { background-color: #eeefee; }\n.u-backgroundWhite { background-color: #fafafa; }\n.u-backgroundColorGrayLight { background-color: #f0f0f0 !important; }\n\n// Clear\n.u-clear {\n  &::before,\n  &::after {\n    content: \" \";\n    display: table;\n  }\n  &::after { clear: both; }\n}\n\n// font size\n.u-fontSize13 { font-size: 13px }\n.u-fontSize14 { font-size: 14px }\n.u-fontSize15 { font-size: 15px !important }\n.u-fontSize20 { font-size: 20px }\n.u-fontSize22 { font-size: 22px }\n.u-fontSize28 { font-size: 28px !important; }\n.u-fontSize36 { font-size: 36px }\n.u-fontSize40 { font-size: 40px }\n.u-fontSizeBase { font-size: 18px }\n.u-fontSizeJumbo { font-size: 50px }\n.u-fontSizeLarge { font-size: 24px !important }\n.u-fontSizeLarger { font-size: 32px }\n.u-fontSizeLargest { font-size: 44px }\n.u-fontSizeMicro { font-size: 11px }\n.u-fontSizeSmall { font-size: 16px }\n.u-fontSizeSmaller { font-size: 14px }\n.u-fontSizeSmallest { font-size: 12px }\n\n@media #{$md-and-down} {\n  .u-md-fontSizeBase { font-size: 18px !important }\n  .u-md-fontSizeLarger { font-size: 32px }\n}\n\n// @media (max-width: 767px) {\n//   .u-xs-fontSizeBase {font-size: 18px}\n//   .u-xs-fontSize13 {font-size: 13px}\n//   .u-xs-fontSizeSmaller {font-size: 14px}\n//   .u-xs-fontSizeSmall {font-size: 16px}\n//   .u-xs-fontSize22 {font-size: 22px}\n//   .u-xs-fontSizeLarge {font-size: 24px}\n//   .u-xs-fontSize40 {font-size: 40px}\n//   .u-xs-fontSizeLarger {font-size: 32px}\n//   .u-xs-fontSizeSmallest {font-size: 12px}\n// }\n\n// font weight\n.u-fontWeightThin { font-weight: 300 }\n.u-fontWeightNormal { font-weight: 400 }\n// .u-fontWeightMedium { font-weight: 500 }\n.u-fontWeightSemibold { font-weight: 600 }\n.u-fontWeightBold { font-weight: 700 }\n\n.u-textUppercase { text-transform: uppercase }\n.u-textAlignCenter { text-align: center }\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n// Margin\n.u-marginAuto { margin-left: auto; margin-right: auto; }\n.u-marginTop20 { margin-top: 20px }\n.u-marginTop30 { margin-top: 30px }\n.u-marginBottom15 { margin-bottom: 15px }\n.u-marginBottom20 { margin-bottom: 20px !important }\n.u-marginBottom30 { margin-bottom: 30px }\n.u-marginBottom40 { margin-bottom: 40px }\n\n// padding\n.u-padding0 { padding: 0 !important }\n.u-padding20 { padding: 20px }\n.u-padding15 { padding: 15px !important; }\n.u-paddingBottom2 { padding-bottom: 2px; }\n.u-paddingBottom30 { padding-bottom: 30px; }\n.u-paddingBottom20 { padding-bottom: 20px }\n.u-paddingRight10 { padding-right: 10px }\n.u-paddingLeft15 { padding-left: 15px }\n\n.u-paddingTop2 { padding-top: 2px }\n.u-paddingTop5 { padding-top: 5px; }\n.u-paddingTop10 { padding-top: 10px; }\n.u-paddingTop15 { padding-top: 15px; }\n.u-paddingTop20 { padding-top: 20px; }\n.u-paddingTop30 { padding-top: 30px; }\n\n.u-paddingBottom15 { padding-bottom: 15px; }\n\n.u-paddingRight20 { padding-right: 20px }\n.u-paddingLeft20 { padding-left: 20px }\n\n.u-contentTitle {\n  font-family: $primary-font;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n// line-height\n.u-lineHeight1 { line-height: 1; }\n.u-lineHeightTight { line-height: 1.2 }\n\n// overflow\n.u-overflowHidden { overflow: hidden }\n\n// float\n.u-floatRight { float: right; }\n.u-floatLeft { float: left; }\n\n//  flex\n.u-flex { display: flex; }\n.u-flexCenter { align-items: center; display: flex; }\n// .u-flex--1 { flex: 1 }\n.u-flex1 { flex: 1 1 auto; }\n.u-flex0 { flex: 0 0 auto; }\n.u-flexWrap { flex-wrap: wrap }\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.u-flexColumnTop {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n// Background\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n// max widht\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1200 { max-width: 1200px }\n.u-maxWidth1000 { max-width: 1000px }\n.u-maxWidth740 { max-width: 740px }\n.u-maxWidth1040 { max-width: 1040px }\n.u-sizeFullWidth { width: 100% }\n\n// border\n.u-borderLighter { border: 1px solid rgba(0, 0, 0, .15); }\n.u-round { border-radius: 50% }\n.u-borderRadius2 { border-radius: 2px }\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .05);\n}\n\n// Heinght\n.u-height540 { height: 540px }\n.u-height280 { height: 280px }\n.u-height260 { height: 260px }\n.u-height100 { height: 100px }\n.u-borderBlackLightest { border: 1px solid rgba(0, 0, 0, .1) }\n\n// hide global\n.u-hide { display: none !important }\n\n// card\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, .04);\n  border-radius: 3px;\n  // box-shadow: 0 1px 4px rgba(0, 0, 0, .04);\n  box-shadow: 0 1px 7px rgba(0, 0, 0, .05);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n@media #{$md-and-down} {\n  .u-hide-before-md { display: none !important }\n  .u-md-heightAuto { height: auto; }\n  .u-md-height170 { height: 170px }\n  .u-md-relative { position: relative }\n}\n\n@media #{$lg-and-down} { .u-hide-before-lg { display: none !important } }\n\n// hide after\n@media #{$md-and-up} { .u-hide-after-md { display: none !important } }\n\n@media #{$lg-and-up} { .u-hide-after-lg { display: none !important } }\n","@media #{$lg-and-up} {\n  .content {\n    // flex: 1 !important;\n    max-width: calc(100% - 340px) !important;\n    // order: 1;\n    // overflow: hidden;\n  }\n\n  .sidebar {\n    width: 340px !important;\n    // flex: 0 0 340px !important;\n    // order: 2;\n  }\n}\n\n.row {\n  margin-left: - 10px;\n  margin-right: - 10px;\n\n  @extend .u-clear;\n\n  .col {\n    float: left;\n    padding-left: 10px;\n    padding-right: 10px;\n\n    $i: 1;\n\n    @while $i <= $num-cols {\n      $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n      &.s#{$i} {\n        width: $perc;\n      }\n\n      $i: $i + 1;\n    }\n\n    @media #{$md-and-up} {\n\n      $i: 1;\n\n      @while $i <= $num-cols {\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n        &.m#{$i} {\n          width: $perc;\n        }\n\n        $i: $i + 1;\n      }\n    }\n\n    @media #{$lg-and-up} {\n\n      $i: 1;\n\n      @while $i <= $num-cols {\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n\n        &.l#{$i} {\n          width: $perc;\n        }\n\n        $i: $i + 1;\n      }\n    }\n  }\n}\n",".button {\r\n  background: rgba(0, 0, 0, 0);\r\n  border: 1px solid rgba(0, 0, 0, .15);\r\n  border-radius: 999em;\r\n  box-sizing: border-box;\r\n  color: rgba(0, 0, 0, .44);\r\n  cursor: pointer;\r\n  display: inline-block;\r\n  font-family: $primary-font;\r\n  font-size: 14px;\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  height: 37px;\r\n  letter-spacing: 0;\r\n  line-height: 35px;\r\n  padding: 0 16px;\r\n  position: relative;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  text-rendering: optimizeLegibility;\r\n  user-select: none;\r\n  vertical-align: middle;\r\n  white-space: nowrap;\r\n\r\n  i { display: inline-block; }\r\n\r\n  &--chromeless {\r\n    border-radius: 0;\r\n    border-width: 0;\r\n    box-shadow: none;\r\n    color: rgba(0, 0, 0, .44);\r\n    height: auto;\r\n    line-height: inherit;\r\n    padding: 0;\r\n    text-align: left;\r\n    vertical-align: baseline;\r\n    white-space: normal;\r\n\r\n    &:active,\r\n    &:hover,\r\n    &:focus {\r\n      border-width: 0;\r\n      color: rgba(0, 0, 0, .6);\r\n    }\r\n  }\r\n\r\n  &--large {\r\n    font-size: 15px;\r\n    height: 44px;\r\n    line-height: 42px;\r\n    padding: 0 18px;\r\n  }\r\n\r\n  &--dark {\r\n    border-color: rgba(0, 0, 0, .6);\r\n    color: rgba(0, 0, 0, .6);\r\n\r\n    &:hover {\r\n      border-color: rgba(0, 0, 0, .8);\r\n      color: rgba(0, 0, 0, .8);\r\n    }\r\n  }\r\n}\r\n\r\n// Primary\r\n.button--primary {\r\n  border-color: $primary-color;\r\n  color: $primary-color;\r\n}\r\n\r\n.buttonSet {\r\n  > .button {\r\n    margin-right: 8px;\r\n    vertical-align: middle;\r\n  }\r\n\r\n  > .button:last-child {\r\n    margin-right: 0;\r\n  }\r\n\r\n  .button--chromeless {\r\n    height: 37px;\r\n    line-height: 35px;\r\n  }\r\n}\r\n\r\n.buttonSet {\r\n  .button--large.button--chromeless,\r\n  .button--large.button--link {\r\n    height: 44px;\r\n    line-height: 42px;\r\n  }\r\n\r\n  &>.button--chromeless:not(.button--circle) {\r\n    margin-right: 0;\r\n    padding-right: 8px;\r\n  }\r\n\r\n  &>.button--chromeless+.button--chromeless:not(.button--circle) {\r\n    margin-left: 0;\r\n    padding-left: 8px;\r\n  }\r\n\r\n  &>.button--chromeless:last-child {\r\n    padding-right: 0;\r\n  }\r\n}\r\n\r\n.button--large.button--chromeless,\r\n.button--large.button--link {\r\n  padding: 0;\r\n}\r\n\r\n","@font-face {\r\n  font-family: 'simply';\r\n  src:  url('../fonts/simply.eot?eso605');\r\n  src:  url('../fonts/simply.eot?eso605#iefix') format('embedded-opentype'),\r\n    url('../fonts/simply.ttf?eso605') format('truetype'),\r\n    url('../fonts/simply.woff?eso605') format('woff'),\r\n    url('../fonts/simply.svg?eso605#simply') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n\r\n[class^=\"i-\"]::before, [class*=\" i-\"]::before {\r\n  @extend %fonts-icons;\r\n}\r\n\r\n\r\n.i-telegram:before {\r\n  content: \"\\f2c6\";\r\n}\r\n.i-link:before {\r\n  content: \"\\f0c1\";\r\n}\r\n.i-reddit:before {\r\n  content: \"\\f281\";\r\n}\r\n.i-twitter:before {\r\n  content: \"\\f099\";\r\n}\r\n.i-github:before {\r\n  content: \"\\f09b\";\r\n}\r\n.i-linkedin:before {\r\n  content: \"\\f0e1\";\r\n}\r\n.i-code:before {\r\n  content: \"\\f121\";\r\n}\r\n.i-youtube:before {\r\n  content: \"\\f16a\";\r\n}\r\n.i-stack-overflow:before {\r\n  content: \"\\f16c\";\r\n}\r\n.i-instagram:before {\r\n  content: \"\\f16d\";\r\n}\r\n.i-flickr:before {\r\n  content: \"\\f16e\";\r\n}\r\n.i-dribbble:before {\r\n  content: \"\\f17d\";\r\n}\r\n.i-behance:before {\r\n  content: \"\\f1b4\";\r\n}\r\n.i-spotify:before {\r\n  content: \"\\f1bc\";\r\n}\r\n.i-codepen:before {\r\n  content: \"\\f1cb\";\r\n}\r\n.i-facebook:before {\r\n  content: \"\\f230\";\r\n}\r\n.i-pinterest:before {\r\n  content: \"\\f231\";\r\n}\r\n.i-whatsapp:before {\r\n  content: \"\\f232\";\r\n}\r\n.i-snapchat:before {\r\n  content: \"\\f2ac\";\r\n}\r\n.i-comments:before {\r\n  content: \"\\e900\";\r\n}\r\n.i-location:before {\r\n  content: \"\\e8b4\";\r\n}\r\n.i-save:before {\r\n  content: \"\\e8e6\";\r\n}\r\n.i-save--line:before {\r\n  content: \"\\e8e7\";\r\n}\r\n.i-check-circle:before {\r\n  content: \"\\e86c\";\r\n}\r\n.i-close:before {\r\n  content: \"\\e5cd\";\r\n}\r\n.i-favorite:before {\r\n  content: \"\\e87d\";\r\n}\r\n.i-star:before {\r\n  content: \"\\e838\";\r\n}\r\n.i-warning:before {\r\n  content: \"\\e002\";\r\n}\r\n.i-rss:before {\r\n  content: \"\\e0e5\";\r\n}\r\n.i-search:before {\r\n  content: \"\\e8b6\";\r\n}\r\n.i-send:before {\r\n  content: \"\\e163\";\r\n}\r\n.i-share:before {\r\n  content: \"\\e80d\";\r\n}\r\n","// animated Global\r\n.animated {\r\n  animation-duration: 1s;\r\n  animation-fill-mode: both;\r\n\r\n  &.infinite {\r\n    animation-iteration-count: infinite;\r\n  }\r\n}\r\n\r\n// animated All\r\n.bounceIn { animation-name: bounceIn;}\r\n.bounceInDown { animation-name: bounceInDown;}\r\n.pulse { animation-name: pulse; }\r\n\r\n// all keyframes Animates\r\n// bounceIn\r\n@keyframes bounceIn {\r\n  0%,\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80%,\r\n  100% { animation-timing-function: cubic-bezier(.215, .610, .355, 1);}\r\n  0% {opacity: 0; transform: scale3d(.3, .3, .3);}\r\n  20% { transform: scale3d(1.1, 1.1, 1.1);}\r\n  40% { transform: scale3d(.9, .9, .9); }\r\n  60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }\r\n  80% { transform: scale3d(.97, .97, .97); }\r\n  100% { opacity: 1; transform: scale3d(1, 1, 1); }\r\n}\r\n\r\n;\r\n// bounceInDown\r\n@keyframes bounceInDown {\r\n  0%,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  100% { animation-timing-function: cubic-bezier(215, 610, 355, 1); }\r\n  0% { opacity: 0; transform: translate3d(0, -3000px, 0); }\r\n  60% { opacity: 1; transform: translate3d(0, 25px, 0);}\r\n  75% {transform: translate3d(0, -10px, 0);}\r\n  90% {transform: translate3d(0, 5px, 0);}\r\n  100% {transform: none;}\r\n}\r\n\r\n@keyframes pulse {\r\n  from { transform: scale3d(1, 1, 1);}\r\n  50% {transform: scale3d(1.2, 1.2, 1.2);}\r\n  to {transform: scale3d(1, 1, 1); }\r\n}\r\n\r\n\r\n@keyframes scroll {\r\n  0% {opacity: 0;}\r\n  10% {opacity: 1; transform: translateY(0)}\r\n  100% {opacity: 0; transform: translateY(10px);}\r\n}\r\n\r\n@keyframes opacity {\r\n  0% {opacity: 0;}\r\n  50% {opacity: 0;}\r\n  100% {opacity: 1;}\r\n}\r\n\r\n//  spin for pagination\r\n@keyframes spin {\r\n  from {transform: rotate(0deg);}\r\n  to {transform: rotate(360deg);}\r\n}\r\n\r\n@keyframes tooltip {\r\n  0% {opacity: 0; transform: translate(-50%, 6px);}\r\n  100% {opacity: 1; transform: translate(-50%, 0);}\r\n}\r\n\r\n@keyframes loading-bar {\r\n  0% {transform: translateX(-100%)}\r\n  40% {transform: translateX(0)}\r\n  60% {transform: translateX(0)}\r\n  100% {transform: translateX(100%)}\r\n}\r\n","// Header\n// ==========================================================================\n\n.header {\n  z-index: 80;\n\n  &-wrap { height: 55px; }\n\n  &-logo {\n    color: #fff !important;\n    height: 30px;\n\n    img { max-height: 100%; }\n  }\n\n  &-logo,\n  .button-search--open,\n  .button-nav--toggle { z-index: 150; }\n\n  // header description home page\n  &-description {\n    color: rgba(255, 255, 255, 0.8);\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 650px;\n  }\n}\n\n// not have logo\n.not-logo .header-logo { height: auto !important }\n\n// Header Follow\n// ==========================================================================\n\n.follow > a { padding-left: 15px }\n\n// Header menu\n// ==========================================================================\n\n.nav {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n\n  ul {\n    display: flex;\n    margin-right: 20px;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n\n  li {\n    float: left;\n\n    a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase;\n    }\n  }\n}\n\n.button-search--open {\n  padding-right: 0 !important;\n}\n\n// button-nav\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n\n  span {\n    background-color: $header-color;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px;\n\n    &:first-child { transform: translate(0, -6px); }\n    &:last-child { transform: translate(0, 6px); }\n  }\n}\n\n// Media Query\n// ==========================================================================\n\n@media #{$md-and-up} {\n  body.is-home {\n    .header {\n      &-wrap { height: 200px; }\n\n      &-logo {\n        height: 50px;\n      }\n    }\n  }\n\n  // Main Menu Fixed\n  // ==========================================================================\n  // .mainMenu--affixed {\n  //   position: fixed;\n  //   top: 0;\n  // }\n}\n\n// Header menu\n// ==========================================================================\n@media #{$md-and-down} {\n  .header {\n    position: fixed;\n\n    &-wrap { height: $header-height-mobile }\n  }\n\n  .header-logo--wrap { text-align: left }\n  .header-logo { display: flex; flex: 1 1 auto }\n\n  .header-top {\n    display: flex;\n    align-items: center;\n  }\n\n  // show menu mobile\n  body.is-showNavMob {\n    overflow: hidden;\n\n    .sideNav { transform: translateX(0); }\n\n    .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg);\n\n      span:first-child { transform: rotate(45deg) translate(0, 0); }\n      span:nth-child(2) { transform: scaleX(0); }\n      span:last-child { transform: rotate(-45deg) translate(0, 0); }\n    }\n\n    .header .button-search--toggle { display: none; }\n    .main, .footer { transform: translateX(-25%); }\n  }\n}\n",".avatar-image--smaller {\n  width: 40px;\n  height: 40px;\n}\n\n.avatar-image {\n  display: inline-block;\n  vertical-align: middle;\n  border-radius: 100%;\n}\n\n.story {\n  &-title { letter-spacing: -.028em; }\n\n  &-excerpt {\n    display: -webkit-box;\n    margin-top: 5px;\n    max-height: 4.5em;\n    line-height: 1.4;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 3;\n  }\n}\n\n//  media Query\n@media #{$md-and-up} {\n  .story--260 {\n    .story-wrap { height: 260px }\n    .story-image { height: 100px }\n\n    .story-body {\n      height: 160px;\n    }\n  }\n\n  .story--200 {\n    .story-wrap { height: 260px; display: flex }\n\n    .story-body {\n      flex: 1 1 auto;\n      height: 100%;\n    }\n\n    .story-image {\n      flex: 0 0 auto;\n      height: 100%;\n      width: 200px;\n    }\n  }\n}\n\n// card for (author and tag) story\n// ==========================================================================\n.card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, .09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n\n  &--p {\n    font-family: $secundary-font;\n    font-style: normal;\n    font-weight: 400;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n\n  &-image {\n    max-height: 240px;\n    max-width: 360px;\n  }\n\n  // if story is featured\n  &.card--large {\n    .card-body { display: flex; flex-direction: column; }\n\n    .card-image {\n      height: 200px;\n      margin-bottom: 20px;\n      margin-top: 5px;\n      max-width: 100%;\n      order: -1;\n    }\n\n    .card-image--link {\n      left: 50%;\n      position: absolute;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      width: 100%;\n    }\n  }\n\n  // even\n  &.card--medium {\n    .card-excerpt {\n      color: rgba(0, 0, 0, .44);\n      font-family: $primary-font;\n      font-size: 23px;\n      letter-spacing: -.022em;\n      line-height: 1.22;\n    }\n  }\n}\n",".post {\n  &-title {\n    line-height: 1.04;\n  }\n\n  // &-footer {\n  //   border-bottom: 1px solid rgba(0,0,0,.05);\n  // }\n}\n\n// meta line\n.postMetaInline {\n  letter-spacing: 0;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 14px;\n  color: rgba(0, 0, 0, .44);\n  fill: rgba(0, 0, 0, .44);\n}\n\n// post content body\n// ==========================================================================\n.post-body {\n  a {\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, 0) 50%);\n    background-position: 0 1.07em;\n    background-repeat: repeat-x;\n    background-size: 2px .1em;\n    text-decoration: none;\n  }\n\n  img {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n    // max-width: 1000px;\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    margin-top: 30px;\n    font-weight: 700;\n    font-style: normal;\n  }\n\n  h2 {\n    font-size: 40px;\n    letter-spacing: -.03em;\n    line-height: 1.04;\n    margin-top: 54px;\n  }\n\n  h3 {\n    font-size: 32px;\n    letter-spacing: -.02em;\n    line-height: 1.15;\n    margin-top: 52px;\n  }\n\n  h4 {\n    font-size: 24px;\n    letter-spacing: -.018em;\n    line-height: 1.22;\n    margin-top: 30px;\n  }\n\n  p {\n    font-family: $secundary-font;\n    font-size: 21px;\n    font-weight: 400;\n    letter-spacing: -.003em;\n    line-height: 1.58;\n    margin-top: 28px;\n  }\n\n  ul,\n  ol {\n    counter-reset: post;\n    font-family: $secundary-font;\n    font-size: 21px;\n    margin-top: 20px;\n\n    li {\n      letter-spacing: -.003em;\n      line-height: 1.58;\n      margin-bottom: 14px;\n      margin-left: 30px;\n\n      &::before {\n        box-sizing: border-box;\n        display: inline-block;\n        margin-left: -78px;\n        position: absolute;\n        text-align: right;\n        width: 78px;\n      }\n    }\n  }\n\n  ul li::before {\n    content: 'â¢';\n    font-size: 16.8px;\n    padding-right: 15px;\n    padding-top: 4px;\n  }\n\n  ol li::before {\n    content: counter(post) \".\";\n    counter-increment: post;\n    padding-right: 12px;\n  }\n\n  .twitter-tweet,\n  iframe {\n    // display: block;\n    // margin-left: auto !important;\n    // margin-right: auto !important;\n    margin-top: 40px !important;\n  }\n\n  .video-responsive iframe { margin-top: 0 !important }\n\n  blockquote,\n  dl,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  ol,\n  p,\n  pre,\n  ul {\n    min-width: 100%;\n  }\n}\n\n// markdown content of post\n.kg-card-markdown {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  // max-width: 920px;\n}\n\n// fisrt p\n.kg-card-markdown > p:first-of-type::first-letter,\n.post-body > p:first-of-type::first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n// post Tags\n// ==========================================================================\n.post-tags {\n  a {\n    background: rgba(0, 0, 0, .08);\n    border: none;\n    border-radius: 3px;\n    color: rgba(0, 0, 0, .6);\n    margin-bottom: 8px;\n    margin-right: 8px;\n\n    &:hover {\n      background: rgba(0, 0, 0, .1);\n      color: rgba(0, 0, 0, .6);\n    }\n  }\n}\n\n// post Newsletter\n// ==========================================================================\n\n.post-newsletter {\n  outline: 1px solid #f0f0f0 !important;\n  outline-offset: -1px;\n  border-radius: 2px;\n  padding: 40px 10px;\n\n  .newsletter-form { max-width: 400px }\n\n  .form-group { width: 80%; padding-right: 5px; }\n\n  .form--input {\n    border: 0;\n    border-bottom: 1px solid #ccc;\n    height: 48px;\n    padding: 6px 12px 8px 5px;\n    resize: none;\n    width: 100%;\n\n    &:focus {\n      outline: 0;\n    }\n  }\n\n  .form--btn {\n    background-color: #a9a9a9;\n    border-radius: 0 45px 45px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    padding: 0;\n    width: 20%;\n\n    &::before {\n      @extend %u-absolute0;\n\n      background-color: #a9a9a9;\n      border-radius: 0 45px 45px 0;\n      line-height: 45px;\n      z-index: 2;\n    }\n\n    &:hover { opacity: .8; }\n    &:focus { outline: 0; }\n  }\n}\n\n// post Relative\n// ==========================================================================\n.post-related {\n  &-image {\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\n    border-radius: 4px 4px 0 0;\n    height: 160px;\n  }\n\n  &-excerpt { font-family: $secundary-font }\n\n  &-excerpt,\n  &-title {\n    color: rgba(0, 0, 0, .9);\n    -webkit-box-orient: vertical !important;\n    -webkit-line-clamp: 2 !important;\n    display: -webkit-box !important;\n    line-height: 1.1 !important;\n    max-height: 2.2em !important;\n    text-overflow: ellipsis !important;\n  }\n\n  .u-card {\n    height: 270px;\n    margin-bottom: 20px;\n  }\n}\n\n// Share Post\n// ==========================================================================\n.sharePost {\n  // margin-left: -130px;\n  left: -130px;\n  margin-top: 28px;\n  width: 45px;\n  position: absolute !important;\n\n  a {\n    background-image: none;\n    border-radius: 5px;\n    color: #fff;\n    height: 36px;\n    line-height: 20px;\n    margin: 10px auto;\n    padding: 8px;\n    text-decoration: none;\n    width: 36px;\n  }\n}\n\n// Post Actions\n// ==========================================================================\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, .44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  // transform: translateY(100%);\n  // transition: transform .3s;\n  transform: translate3d(0, 0, 0);\n  transition: all 0.25s ease-in-out;\n  // visibility: hidden;\n  z-index: 400;\n\n  &.is-visible {\n    transform: translateY(100%);\n    // transform: translateY(0);\n    // transition-delay: 0s;\n    // visibility: visible;\n  }\n\n  &-wrap { max-width: 1200px; }\n\n  .separator {\n    background: rgba(0, 0, 0, .15);\n    height: 24px;\n    margin: 0 15px;\n    width: 1px;\n  }\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n@media #{$md-and-down} {\n  .post-body {\n    h2 {\n      font-size: 32px;\n      margin-top: 26px;\n    }\n\n    h3 {\n      font-size: 28px;\n      margin-top: 28px;\n    }\n\n    h4 {\n      font-size: 22px;\n      margin-top: 22px;\n    }\n\n    q {\n      font-size: 22px !important;\n      letter-spacing: -.008em !important;\n      line-height: 1.4 !important;\n    }\n\n    & > p:first-of-type::first-letter {\n      font-size: 54.85px;\n      margin-left: -4px;\n      margin-right: 6px;\n      padding-top: 3.5px;\n    }\n\n    ol, ul, p {\n      font-size: 18px;\n      letter-spacing: -.004em;\n      line-height: 1.58;\n    }\n  }\n}\n",".author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, .6);\n  min-height: 400px;\n\n  &-avatar {\n    height: 80px;\n    width: 80px;\n  }\n\n  &-meta span {\n    display: inline-block;\n    font-size: 17px;\n    font-style: italic;\n    margin: 0 25px 16px 0;\n    opacity: .8;\n    word-wrap: break-word;\n  }\n\n  &-name { color: rgba(0, 0, 0, .8) }\n\n  &-bio { max-width: 600px; }\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, .33);\n\n  .author-link:hover { opacity: 1 !important }\n\n  .u-accentColor--iconNormal { fill: #fff; }\n\n  a,\n  .author-name { color: #fff; }\n\n  .author-follow a {\n    border: 2px solid;\n    border-color: hsla(0, 0%, 100%, .5) !important;\n    font-size: 16px;\n  }\n}\n\n@media #{$md-and-down} {\n  .author-meta span { display: block; }\n  .author-header { display: block; }\n  .author-avatar { margin: 0 auto 20px; }\n}\n","// Search\n// ==========================================================================\n.search {\n  background-color: #fff;\n  bottom: 100% !important;\n  height: 0;\n  overflow: hidden;\n  padding: 0 40px;\n  transition: all .3s;\n  visibility: hidden;\n  z-index: 9999;\n\n  &-form {\n    max-width: 680px;\n    margin-top: 80px;\n\n    &::before {\n      background: #eee;\n      bottom: 0;\n      content: '';\n      display: block;\n      height: 2px;\n      left: 0;\n      position: absolute;\n      width: 100%;\n      z-index: 1;\n    }\n\n    input {\n      border: none;\n      display: block;\n      line-height: 40px;\n      padding-bottom: 8px;\n\n      &:focus { outline: 0; }\n    }\n  }\n\n  // result\n  &-results {\n    max-height: calc(90% - 100px);\n    max-width: 680px;\n    overflow: auto;\n\n    a {\n      border-bottom: 1px solid #eee;\n      padding: 12px 0;\n\n      &:hover { color: rgba(0, 0, 0, .44) }\n    }\n  }\n}\n\n.button-search--close {\n  position: absolute !important;\n  right: 50px;\n  top: 20px;\n}\n\nbody.is-search {\n  overflow: hidden;\n\n  .search {\n    bottom: 0 !important;\n    height: 100%;\n    transition: all .3s;\n    visibility: visible;\n  }\n}\n",".sidebar {\r\n  &-title {\r\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\r\n    font-weight: 700;\r\n    margin-bottom: 10px;\r\n    padding-bottom: 5px;\r\n  }\r\n\r\n  // border for post\r\n  &-border {\r\n    border-left: 3px solid $primary-color;\r\n    bottom: 0;\r\n    color: rgba(0, 0, 0, .2);\r\n    font-family: $secundary-font;\r\n    left: 0;\r\n    padding: 15px 10px 10px;\r\n    top: 0;\r\n  }\r\n}\r\n\r\n.sidebar-post {\r\n  &:nth-child(3n) { .sidebar-border { border-color: darken(orange, 2%); } }\r\n  &:nth-child(3n+2) { .sidebar-border { border-color: #26a8ed } }\r\n\r\n  &--title {\r\n    line-height: 1.1;\r\n  }\r\n\r\n  &--link {\r\n    background-color: #fff;\r\n    min-height: 50px;\r\n    padding: 15px 15px 15px 55px;\r\n    &:hover { .sidebar-border {background-color: rgba(229,239,245,1);}  }\r\n\r\n  }\r\n}\r\n","// Navigation Mobile\r\n.sideNav {\r\n  // background-color: $primary-color;\r\n  color: rgba(0, 0, 0, 0.8);\r\n  height: 100vh;\r\n  padding: $header-height-mobile 20px;\r\n  position: fixed !important;\r\n  transform: translateX(100%);\r\n  transition: 0.4s;\r\n  will-change: transform;\r\n  z-index: 99;\r\n\r\n  &-menu a { padding: 10px 20px; }\r\n\r\n  &-wrap {\r\n    background: #eee;\r\n    overflow: auto;\r\n    padding: 20px 0;\r\n    top: $header-height-mobile;\r\n  }\r\n\r\n  &-section {\r\n    border-bottom: solid 1px #ddd;\r\n    margin-bottom: 8px;\r\n    padding-bottom: 8px;\r\n  }\r\n\r\n  &-follow {\r\n    border-top: 1px solid #ddd;\r\n    margin: 15px 0;\r\n\r\n    a {\r\n      color: #fff;\r\n      display: inline-block;\r\n      height: 36px;\r\n      line-height: 20px;\r\n      margin: 0 5px 5px 0;\r\n      min-width: 36px;\r\n      padding: 8px;\r\n      text-align: center;\r\n      vertical-align: middle;\r\n    }\r\n\r\n    @each $social-name, $color in $social-colors {\r\n      .i-#{$social-name} {\r\n        @extend .bg-#{$social-name};\r\n      }\r\n    }\r\n  }\r\n}\r\n","@media #{$md-and-up} {\n  // background image featured in tag and author\n  .is-author.has-featured-image,\n  .is-tag.has-featured-image {\n    .header,\n    .mainMenu {\n      background-color: transparent !important;\n      border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n    }\n    .u-headerColorLink a { color: #fff; }\n\n    .main {\n      margin-top: -56px;\n    }\n\n    .tag,\n    .author {\n      padding-top: 100px;\n    }\n  }\n\n  // is-article\n  .is-article {\n    .post-header { padding-top: 35px; }\n    .post-body { margin-top: 30px; }\n\n    .post-image,\n    .video-post-format { margin-top: 50px; }\n  }\n}\n"],"sourceRoot":""}]);

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
module.exports = __webpack_require__(/*! ./styles/main.scss */38);


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
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismjs__ = __webpack_require__(/*! prismjs */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prismjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs_plugins_autoloader_prism_autoloader__ = __webpack_require__(/*! prismjs/plugins/autoloader/prism-autoloader */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs_plugins_autoloader_prism_autoloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prismjs_plugins_autoloader_prism_autoloader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery_lazyload__ = __webpack_require__(/*! jquery-lazyload */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery_lazyload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_theia_sticky_sidebar__ = __webpack_require__(/*! theia-sticky-sidebar */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_theia_sticky_sidebar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_theia_sticky_sidebar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autoload_jquery_ghostHunter_js__ = __webpack_require__(/*! ./autoload/jquery.ghostHunter.js */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autoload_jquery_ghostHunter_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__autoload_jquery_ghostHunter_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__autoload_transition_js__ = __webpack_require__(/*! ./autoload/transition.js */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__autoload_transition_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__autoload_transition_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__autoload_zoom_js__ = __webpack_require__(/*! ./autoload/zoom.js */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__autoload_zoom_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__autoload_zoom_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helper_pagination__ = __webpack_require__(/*! ./helper/pagination */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helper_pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__helper_pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_Router__ = __webpack_require__(/*! ./util/Router */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes_common__ = __webpack_require__(/*! ./routes/common */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__routes_post__ = __webpack_require__(/*! ./routes/post */ 35);
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
});

// Load Events
$(document).on('ready', function () { return routes.loadEvents(); });

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 20 */
/*!****************************************!*\
  !*** ../node_modules/prismjs/prism.js ***!
  \****************************************/
/*! no static exports found */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 21)))

/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
/*!*************************************************************************!*\
  !*** ../node_modules/theia-sticky-sidebar/dist/theia-sticky-sidebar.js ***!
  \*************************************************************************/
/*! no static exports found */
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
/* 25 */
/*!************************************************!*\
  !*** ./scripts/autoload/jquery.ghostHunter.js ***!
  \************************************************/
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
	var lunr=__webpack_require__(/*! lunr */ 26);

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
/* 26 */
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
/* 27 */
/*!****************************************!*\
  !*** ./scripts/autoload/transition.js ***!
  \****************************************/
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
/* 28 */
/*!**********************************!*\
  !*** ./scripts/autoload/zoom.js ***!
  \**********************************/
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
/* 29 */
/*!**************************************!*\
  !*** ./scripts/helper/pagination.js ***!
  \**************************************/
/*! no static exports found */
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

})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 30 */
/*!********************************!*\
  !*** ./scripts/util/Router.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__camelCase__ = __webpack_require__(/*! ./camelCase */ 31);


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
/* 31 */
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
/* 32 */
/*!**********************************!*\
  !*** ./scripts/routes/common.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_share__ = __webpack_require__(/*! ../helper/share */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__helper_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_follow_me__ = __webpack_require__(/*! ../helper/follow-me */ 34);



// Varibles
var $body = $('body');
var $pageUrl = $body.attr('data-page');
var $seachInput = $('#search-field');

/* Search Template */
var searchTemplate = "\n  <a class=\"u-block\" href=\"" + $pageUrl + "{{link}}\">\n    <span class=\"u-contentTitle u-fontSizeBase\">{{title}}</span>\n    <span class=\"u-block u-fontSizeSmaller u-textColorNormal u-paddingTop5\">{{pubDate}}</span>\n  </a>\n";


/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // Follow me
    if (typeof followSocialMedia !== 'undefined') {
      Object(__WEBPACK_IMPORTED_MODULE_1__helper_follow_me__["a" /* default */])(followSocialMedia); // eslint-disable-line
    }

    /* Lazy load for image */
    $('.cover-lazy.lazy').lazyload({effect : 'fadeIn'});
    $('.simply-lazy.lazy').lazyload({threshold : 200});
  }, // end Init

  finalize: function finalize() {
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

    /* Search */
    $seachInput.ghostHunter({
      results: '#searchResults',
      zeroResultsInfo: true,
      info_template: '<p class="u-paddingBottom20 u-fontSize15">Showing {{amount}} results</p>',
      result_template: searchTemplate,
      onKeyUp: true,
    });

    /* rocket to the moon (retur TOP HOME) */
    $('.rocket').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 250);
    });

    /* Share article in Social media */
    $('.simply-share').bind('click', function (e) {
      e.preventDefault();
      var share = new __WEBPACK_IMPORTED_MODULE_0__helper_share___default.a($(this));
      share.share();
    });

    /* sicky sidebar */
    $('.sidebar-sticky').theiaStickySidebar({
      additionalMarginTop: 30,
    });

    // show comments count of disqus
    if (typeof disqusShortName !== 'undefined') {
      $('.simply-disqus').removeClass('u-hide');
    }

    /* show btn for Retur TOP PAGE */
    setInterval( function () {
      ($(window).scrollTop() > 100) ? $('.rocket').removeClass('u-hide') : $('.rocket').addClass('u-hide');
    }, 250);

  }, //end => Finalize
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 33 */
/*!*********************************!*\
  !*** ./scripts/helper/share.js ***!
  \*********************************/
/*! no static exports found */
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
/* 34 */
/*!*************************************!*\
  !*** ./scripts/helper/follow-me.js ***!
  \*************************************/
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
/* 35 */
/*!********************************!*\
  !*** ./scripts/routes/post.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_video__ = __webpack_require__(/*! ../helper/video */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_facebook_share_count__ = __webpack_require__(/*! ../helper/facebook-share-count */ 37);



/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // Embed Video Post Format (Media Embed)
    Object(__WEBPACK_IMPORTED_MODULE_0__helper_video__["a" /* default */])();
  },
  finalize: function finalize() {
    // Add data action zoom FOR IMG
    $('.post-body').find('img').attr('data-action', 'zoom');

    // Share Count
    Object(__WEBPACK_IMPORTED_MODULE_1__helper_facebook_share_count__["a" /* default */])($('.share-count'));

    // sticky share post in left
    $('.sharePost').theiaStickySidebar({
      additionalMarginTop: 30,
    });

    // newsletter title change
    if (typeof newsletterTitle !== 'undefined') {
      $('.newsletter-title').html(newsletterTitle); // eslint-disable-line
    }

    // newsletter Description
    if (typeof newsletterDescription !== 'undefined') {
      $('.newsletter-description').html(newsletterDescription); // eslint-disable-line
    }

    // show and hide post actions
    setInterval( function () {
      var scrollTop = $(window).scrollTop();
      var heightPostBody = $('.post-body').height();

      (scrollTop < heightPostBody) ? $('.postActions').addClass('is-visible') : $('.postActions').removeClass('is-visible');
    }, 250);

    /* Prism autoloader */
    Prism.plugins.autoloader.languages_path = ($('body').attr('data-page')) + "/assets/scripts/prism-components/"; // eslint-disable-line
  }, // end finalize
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 36 */
/*!*********************************!*\
  !*** ./scripts/helper/video.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var $videoPostFormat = $('.video-post-format');

/* Iframe SRC video */
var iframeVideo = [
  'iframe[src*="player.vimeo.com"]',
  'iframe[src*="dailymotion.com"]',
  'iframe[src*="facebook.com/plugins/video.php"]',
  'iframe[src*="youtube.com"]',
  'iframe[src*="youtube-nocookie.com"]',
  'iframe[src*="kickstarter.com"][src*="video.html"]' ];

/* Iframe src audio */
// const iframeAudio = [
//   'iframe[src*="w.soundcloud.com"]',
//   'iframe[src*="soundcloud.com"]',
//   'iframe[src*="embed.spotify.com"]',
//   'iframe[src*="spotify.com"]',
// ];

/* harmony default export */ __webpack_exports__["a"] = (function () {
  //  Variables for embed media
  // const iframe = iframeAudio.concat(iframeVideo);
  var $allMedia = $('.post-body').find(iframeVideo.join(','));

  // Map ALL EMBED MEDIA
  // allMedia.map((key, value) => $(value).wrap('<aside class="video-responsive"></aside>'));
  $allMedia.each(function () {
    var $this = $(this);

    var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height();
    var width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width();
    var aspectRatio = height / width;

    $(this).wrap('<aside class="video-responsive"></aside>').parent('.video-responsive').css('padding-bottom', (aspectRatio * 100)+'%');
  });

  // Video Post Format
  if ($('.video-post-format').length) {
    // Video large in top af page
    var firstVideo = $('.post-body').find(iframeVideo.join(','))[0];
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
  }
});;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 37 */
/*!************************************************!*\
  !*** ./scripts/helper/facebook-share-count.js ***!
  \************************************************/
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
/* 38 */
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
var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ 43)(content, options);
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
/* 39 */
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
/* 40 */
/*!**************************!*\
  !*** ./fonts/simply.ttf ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.ttf";

/***/ }),
/* 41 */
/*!***************************!*\
  !*** ./fonts/simply.woff ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.woff";

/***/ }),
/* 42 */
/*!**************************!*\
  !*** ./fonts/simply.svg ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.svg";

/***/ }),
/* 43 */
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

var	fixUrls = __webpack_require__(/*! ./urls */ 44);

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
/* 44 */
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