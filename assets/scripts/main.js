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
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
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
/******/ 	var hotCurrentHash = "c4f3c8922fff4d84ffcf"; // eslint-disable-line no-unused-vars
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
/******/ 		return hotDownloadManifest().then(function(update) {
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
/******/ 		return Promise.resolve(outdatedModules);
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "http://localhost:3000/content/themes/simply/assets/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(42)(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************************************************************************************************************!*\
  !*** ../~/css-loader?+sourceMap!../~/postcss-loader!../~/resolve-url-loader?+sourceMap!../~/sass-loader/lib/loader.js?+sourceMap!./styles/main.scss ***!
  \******************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../~/css-loader/lib/css-base.js */ 19)(true);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none;\n}\n\n.link--accent:hover {\n  color: #00ab6b;\n}\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.tag.not--image,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v6.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection,\npre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection,\ncode[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none;\n  }\n}\n\n/* Code blocks */\n\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0;\n}\n\n/* Inline code */\n\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n.token.punctuation {\n  color: #999;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n.token.function {\n  color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in;\n}\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms;\n}\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -moz-zoom-out;\n}\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1;\n}\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px;\n}\n\nfigure {\n  margin: 0;\n}\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4;\n}\n\ncode[class*=language-] .token.comment,\npre[class*=language-] .token.comment {\n  opacity: .8;\n}\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n}\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -25px;\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\ni {\n  vertical-align: middle;\n}\n\nol,\nul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: -webkit-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: -o-linear-gradient(top, #d7fdd3, #d7fdd3);\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n}\n\nq:before,\nq:after {\n  display: none;\n}\n\n.main,\n.footer {\n  -webkit-transition: -webkit-transform .5s ease;\n  transition: -webkit-transform .5s ease;\n  -o-transition: -o-transform .5s ease;\n  transition: transform .5s ease;\n  transition: transform .5s ease, -webkit-transform .5s ease, -o-transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px;\n  }\n}\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n.warning::before {\n  content: \"\\E002\";\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n.note::before {\n  content: \"\\E838\";\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n.success::before {\n  color: #00bfa5;\n  content: \"\\E86C\";\n}\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n  margin-top: -5px;\n}\n\n.tag {\n  color: #fff;\n  min-height: 250px;\n  z-index: 2;\n}\n\n.tag-wrap {\n  z-index: 2;\n}\n\n.tag.not--image {\n  min-height: auto;\n}\n\n.tag-description {\n  max-width: 500px;\n}\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n.with-tooltip:after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #FFF;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 130px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n.with-tooltip:hover:after {\n  -webkit-animation: tooltip .1s ease-out both;\n       -o-animation: tooltip .1s ease-out both;\n          animation: tooltip .1s ease-out both;\n}\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.footer a:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n}\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  left: 50%;\n  min-width: 680px;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n}\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n.bg-google,\n.sideNav-follow .i-google {\n  background-color: #dd4b39 !important;\n}\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n.c-github {\n  color: #555 !important;\n}\n\n.bg-github,\n.sideNav-follow .i-github {\n  background-color: #555 !important;\n}\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n.bg-linkedin,\n.sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important;\n}\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n.bg-spotify,\n.sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important;\n}\n\n.c-codepen {\n  color: #222 !important;\n}\n\n.bg-codepen,\n.sideNav-follow .i-codepen {\n  background-color: #222 !important;\n}\n\n.c-behance {\n  color: #131418 !important;\n}\n\n.bg-behance,\n.sideNav-follow .i-behance {\n  background-color: #131418 !important;\n}\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n.bg-dribbble,\n.sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n.bg-flickr,\n.sideNav-follow .i-flickr {\n  background-color: #0063dc !important;\n}\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n.bg-reddit,\n.sideNav-follow .i-reddit {\n  background-color: #ff4500 !important;\n}\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n.bg-pocket,\n.sideNav-follow .i-pocket {\n  background-color: #f50057 !important;\n}\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n.bg-pinterest,\n.sideNav-follow .i-pinterest {\n  background-color: #bd081c !important;\n}\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n.bg-whatsapp,\n.sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important;\n}\n\n.fbSave-dropdown {\n  background-color: #FFF;\n  border: 1px solid #e0e0e0;\n  bottom: 100%;\n  display: none;\n  max-width: 200px;\n  min-width: 100px;\n  padding: 8px;\n  -webkit-transform: translate(-50%, 0);\n       -o-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n  z-index: 10;\n}\n\n.fbSave-dropdown.is-visible {\n  display: block;\n}\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  z-index: 888;\n  width: 60px;\n}\n\n.rocket:hover svg path {\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.svg-icon svg {\n  width: 100%;\n  height: auto;\n}\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  -webkit-animation-delay: .8s;\n       -o-animation-delay: .8s;\n          animation-delay: .8s;\n  -webkit-animation: loading-bar 1s ease-in-out infinite;\n       -o-animation: loading-bar 1s ease-in-out infinite;\n          animation: loading-bar 1s ease-in-out infinite;\n  display: block;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n.u-headerColorLink a {\n  color: #BBF1B9;\n}\n\n.u-headerColorLink a.active,\n.u-headerColorLink a:hover {\n  color: #EEFFEA;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-block {\n  display: block !important;\n}\n\n.u-backgroundDark {\n  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n.u-clear::before,\n.u-clear::after {\n  content: \" \";\n  display: table;\n}\n\n.u-clear::after {\n  clear: both;\n}\n\n.u-fontSize13 {\n  font-size: 13px;\n}\n\n.u-fontSize15 {\n  font-size: 15px;\n}\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n.u-fontSize28 {\n  font-size: 28px !important;\n}\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important;\n  }\n\n  .u-md-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n.u-fontWeightMedium {\n  font-weight: 500;\n}\n\n.u-fontWeightSemibold {\n  font-weight: 600;\n}\n\n.u-fontWeightBold {\n  font-weight: 700 !important;\n}\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important;\n}\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-floatRight {\n  float: right;\n}\n\n.u-floatLeft {\n  float: left;\n}\n\n.u-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-flexCenter {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-flex1 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n.u-flex0 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n\n.u-flexWrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.u-flexColumn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.u-flexEnd {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.u-round {\n  border-radius: 50%;\n}\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n.u-card--p {\n  font-family: \"Droid Serif\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n.u-hide {\n  display: none !important;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n.u-wrap {\n  margin: 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n  width: 100%;\n}\n\n@media only screen and (min-width: 1230px) {\n  .u-wrap {\n    max-width: 1200px;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .content {\n    -webkit-box-flex: 1 !important;\n        -ms-flex: 1 !important;\n            flex: 1 !important;\n    max-width: calc(100% - 340px) !important;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n\n  .sidebar {\n    -webkit-box-flex: 0 !important;\n        -ms-flex: 0 0 340px !important;\n            flex: 0 0 340px !important;\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n}\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  margin-left: -12px;\n  margin-right: -12px;\n}\n\n.row .col {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n\n.row .col.s1 {\n  -ms-flex-preferred-size: 8.33333%;\n      flex-basis: 8.33333%;\n  max-width: 8.33333%;\n}\n\n.row .col.s2 {\n  -ms-flex-preferred-size: 16.66667%;\n      flex-basis: 16.66667%;\n  max-width: 16.66667%;\n}\n\n.row .col.s3 {\n  -ms-flex-preferred-size: 25%;\n      flex-basis: 25%;\n  max-width: 25%;\n}\n\n.row .col.s4 {\n  -ms-flex-preferred-size: 33.33333%;\n      flex-basis: 33.33333%;\n  max-width: 33.33333%;\n}\n\n.row .col.s5 {\n  -ms-flex-preferred-size: 41.66667%;\n      flex-basis: 41.66667%;\n  max-width: 41.66667%;\n}\n\n.row .col.s6 {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n  max-width: 50%;\n}\n\n.row .col.s7 {\n  -ms-flex-preferred-size: 58.33333%;\n      flex-basis: 58.33333%;\n  max-width: 58.33333%;\n}\n\n.row .col.s8 {\n  -ms-flex-preferred-size: 66.66667%;\n      flex-basis: 66.66667%;\n  max-width: 66.66667%;\n}\n\n.row .col.s9 {\n  -ms-flex-preferred-size: 75%;\n      flex-basis: 75%;\n  max-width: 75%;\n}\n\n.row .col.s10 {\n  -ms-flex-preferred-size: 83.33333%;\n      flex-basis: 83.33333%;\n  max-width: 83.33333%;\n}\n\n.row .col.s11 {\n  -ms-flex-preferred-size: 91.66667%;\n      flex-basis: 91.66667%;\n  max-width: 91.66667%;\n}\n\n.row .col.s12 {\n  -ms-flex-preferred-size: 100%;\n      flex-basis: 100%;\n  max-width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  .row .col.m1 {\n    -ms-flex-preferred-size: 8.33333%;\n        flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .row .col.m2 {\n    -ms-flex-preferred-size: 16.66667%;\n        flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .row .col.m3 {\n    -ms-flex-preferred-size: 25%;\n        flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .row .col.m4 {\n    -ms-flex-preferred-size: 33.33333%;\n        flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .row .col.m5 {\n    -ms-flex-preferred-size: 41.66667%;\n        flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .row .col.m6 {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .row .col.m7 {\n    -ms-flex-preferred-size: 58.33333%;\n        flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .row .col.m8 {\n    -ms-flex-preferred-size: 66.66667%;\n        flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .row .col.m9 {\n    -ms-flex-preferred-size: 75%;\n        flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .row .col.m10 {\n    -ms-flex-preferred-size: 83.33333%;\n        flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .row .col.m11 {\n    -ms-flex-preferred-size: 91.66667%;\n        flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .row .col.m12 {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .row .col.l1 {\n    -ms-flex-preferred-size: 8.33333%;\n        flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .row .col.l2 {\n    -ms-flex-preferred-size: 16.66667%;\n        flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .row .col.l3 {\n    -ms-flex-preferred-size: 25%;\n        flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .row .col.l4 {\n    -ms-flex-preferred-size: 33.33333%;\n        flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .row .col.l5 {\n    -ms-flex-preferred-size: 41.66667%;\n        flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .row .col.l6 {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .row .col.l7 {\n    -ms-flex-preferred-size: 58.33333%;\n        flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .row .col.l8 {\n    -ms-flex-preferred-size: 66.66667%;\n        flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .row .col.l9 {\n    -ms-flex-preferred-size: 75%;\n        flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .row .col.l10 {\n    -ms-flex-preferred-size: 83.33333%;\n        flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .row .col.l11 {\n    -ms-flex-preferred-size: 91.66667%;\n        flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .row .col.l12 {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.button i {\n  display: inline-block;\n}\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n.button--chromeless:active,\n.button--chromeless:hover,\n.button--chromeless:focus {\n  border-width: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(" + __webpack_require__(/*! ./../fonts/simply.eot */ 2) + ");\n  src: url(" + __webpack_require__(/*! ./../fonts/simply.eot */ 2) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(/*! ./../fonts/simply.ttf */ 21) + ") format(\"truetype\"), url(" + __webpack_require__(/*! ./../fonts/simply.woff */ 38) + ") format(\"woff\"), url(" + __webpack_require__(/*! ./../fonts/simply.svg */ 20) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.i-comments:before {\n  content: \"\\E900\";\n}\n\n.i-location:before {\n  content: \"\\E8B4\";\n}\n\n.i-save:before {\n  content: \"\\E8E6\";\n}\n\n.i-save--line:before {\n  content: \"\\E8E7\";\n}\n\n.i-check-circle:before {\n  content: \"\\E86C\";\n}\n\n.i-close:before {\n  content: \"\\E5CD\";\n}\n\n.i-favorite:before {\n  content: \"\\E87D\";\n}\n\n.i-star:before {\n  content: \"\\E838\";\n}\n\n.i-warning:before {\n  content: \"\\E002\";\n}\n\n.i-rss:before {\n  content: \"\\E0E5\";\n}\n\n.i-search:before {\n  content: \"\\E8B6\";\n}\n\n.i-send:before {\n  content: \"\\E163\";\n}\n\n.i-share:before {\n  content: \"\\E80D\";\n}\n\n.i-link:before {\n  content: \"\\F0C1\";\n}\n\n.i-reddit:before {\n  content: \"\\F281\";\n}\n\n.i-twitter:before {\n  content: \"\\F099\";\n}\n\n.i-github:before {\n  content: \"\\F09B\";\n}\n\n.i-linkedin:before {\n  content: \"\\F0E1\";\n}\n\n.i-code:before {\n  content: \"\\F121\";\n}\n\n.i-youtube:before {\n  content: \"\\F16A\";\n}\n\n.i-stack-overflow:before {\n  content: \"\\F16C\";\n}\n\n.i-instagram:before {\n  content: \"\\F16D\";\n}\n\n.i-flickr:before {\n  content: \"\\F16E\";\n}\n\n.i-dribbble:before {\n  content: \"\\F17D\";\n}\n\n.i-behance:before {\n  content: \"\\F1B4\";\n}\n\n.i-spotify:before {\n  content: \"\\F1BC\";\n}\n\n.i-codepen:before {\n  content: \"\\F1CB\";\n}\n\n.i-facebook:before {\n  content: \"\\F230\";\n}\n\n.i-pinterest:before {\n  content: \"\\F231\";\n}\n\n.i-whatsapp:before {\n  content: \"\\F232\";\n}\n\n.i-snapchat:before {\n  content: \"\\F2AC\";\n}\n\n.animated {\n  -webkit-animation-duration: 1s;\n       -o-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n       -o-animation-fill-mode: both;\n          animation-fill-mode: both;\n}\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n       -o-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n       -o-animation-name: bounceIn;\n          animation-name: bounceIn;\n}\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n       -o-animation-name: bounceInDown;\n          animation-name: bounceInDown;\n}\n\n.pulse {\n  -webkit-animation-name: pulse;\n       -o-animation-name: pulse;\n          animation-name: pulse;\n}\n\n@-webkit-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n       animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n         -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n@-o-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n       animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -o-transform: none;\n       transform: none;\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n         -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n         -o-transform: none;\n            transform: none;\n  }\n}\n\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-o-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -o-transform: translateY(0);\n       transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -o-transform: translateY(10px);\n       transform: translateY(10px);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n         -o-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n         -o-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-webkit-keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@-o-keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-o-keyframes spin {\n  from {\n    -o-transform: rotate(0deg);\n       transform: rotate(0deg);\n  }\n\n  to {\n    -o-transform: rotate(360deg);\n       transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n         -o-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n         -o-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-o-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -o-transform: translate(-50%, 6px);\n       transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -o-transform: translate(-50%, 0);\n       transform: translate(-50%, 0);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n         -o-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n         -o-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-webkit-keyframes loading-bar {\n  0% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n  }\n\n  40% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  60% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n  }\n}\n\n@-o-keyframes loading-bar {\n  0% {\n    -o-transform: translateX(-100%);\n       transform: translateX(-100%);\n  }\n\n  40% {\n    -o-transform: translateX(0);\n       transform: translateX(0);\n  }\n\n  60% {\n    -o-transform: translateX(0);\n       transform: translateX(0);\n  }\n\n  100% {\n    -o-transform: translateX(100%);\n       transform: translateX(100%);\n  }\n}\n\n@keyframes loading-bar {\n  0% {\n    -webkit-transform: translateX(-100%);\n         -o-transform: translateX(-100%);\n            transform: translateX(-100%);\n  }\n\n  40% {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  60% {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  100% {\n    -webkit-transform: translateX(100%);\n         -o-transform: translateX(100%);\n            transform: translateX(100%);\n  }\n}\n\n.header {\n  z-index: 80;\n}\n\n.header-wrap {\n  height: 50px;\n}\n\n.header-logo {\n  height: 30px;\n}\n\n.header-logo img {\n  max-height: 100%;\n}\n\n.header-logo,\n.header .button-search--open,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n.header-description {\n  color: #BBF1B9;\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 750px;\n}\n\n.follow > a {\n  padding-left: 15px;\n}\n\n.nav {\n  line-height: 40px;\n  padding: 8px 0;\n  position: relative;\n}\n\n.nav ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.nav li {\n  float: left;\n}\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n.button-search--open {\n  color: inherit !important;\n  padding-right: 0 !important;\n}\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  -webkit-transition: -webkit-transform .4s;\n  transition: -webkit-transform .4s;\n  -o-transition: -o-transform .4s;\n  transition: transform .4s;\n  transition: transform .4s, -webkit-transform .4s, -o-transform .4s;\n  width: 48px;\n}\n\n.button-nav--toggle span {\n  background-color: #BBF1B9;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  -webkit-transition: .4s;\n  -o-transition: .4s;\n  transition: .4s;\n  width: 20px;\n}\n\n.button-nav--toggle span:first-child {\n  -webkit-transform: translate(0, -6px);\n       -o-transform: translate(0, -6px);\n          transform: translate(0, -6px);\n}\n\n.button-nav--toggle span:last-child {\n  -webkit-transform: translate(0, 6px);\n       -o-transform: translate(0, 6px);\n          transform: translate(0, 6px);\n}\n\nbody.is-frontpage .header-wrap {\n  height: auto;\n}\n\n@media only screen and (min-width: 766px) {\n  .header-wrap {\n    border: 0;\n  }\n\n  .header-logo {\n    height: 30px;\n    padding-left: 0;\n  }\n\n  .header-top-section {\n    padding-top: 15px;\n  }\n\n  body.is-frontpage .header-wrap {\n    height: 200px;\n  }\n\n  body.is-frontpage .header-logo {\n    height: 40px;\n    margin-bottom: 15px;\n  }\n\n  body.is-frontpage .header-top-section {\n    padding-top: 0;\n  }\n\n  body.is-frontpage .nav ul {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed;\n  }\n\n  .header-wrap {\n    height: 50px !important;\n  }\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  body.is-showNavMob .sideNav {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    -webkit-transform: rotate(90deg);\n         -o-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    -webkit-transform: rotate(45deg) translate(0, 0);\n         -o-transform: rotate(45deg) translate(0, 0);\n            transform: rotate(45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    -webkit-transform: scaleX(0);\n         -o-transform: scaleX(0);\n            transform: scaleX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    -webkit-transform: rotate(-45deg) translate(0, 0);\n         -o-transform: rotate(-45deg) translate(0, 0);\n            transform: rotate(-45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    -webkit-transform: translateX(-25%);\n         -o-transform: translateX(-25%);\n            transform: translateX(-25%);\n  }\n}\n\n.entry-author {\n  line-height: 1.4;\n  padding-left: 10px;\n}\n\n.entry-avatar--img {\n  border-radius: 50%;\n  height: 40px;\n  width: 40px;\n}\n\n.entry-avatar--img.no-avatar {\n  background-image: url(" + __webpack_require__(/*! ./../images/avatar.png */ 22) + ") !important;\n}\n\n.entry.not--image {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.entry.u-card .entry-image {\n  max-height: 240px;\n  max-width: 360px;\n}\n\n.entry.entry--featured .entry-body {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.entry.entry--featured .entry-image {\n  height: 200px;\n  margin-bottom: 20px;\n  margin-top: 5px;\n  max-width: 100%;\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1;\n}\n\n.entry.entry--featured .entry-image--link {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 100%;\n}\n\n.entry.entry--featured .entry-excerpt,\n.entry.even:not(.entry--featured) .entry-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n}\n\n.homePage .entry .u-backgroundDark {\n  display: none;\n}\n\n.homePage .entry-image {\n  height: 172px;\n}\n\n@media only screen and (min-width: 766px) {\n  .homePage .entry-image {\n    height: 174px;\n  }\n\n  .homePage .entry.entry1,\n  .homePage .entry.entry7 {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .homePage .entry.entry1 {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n\n  .homePage .entry.entry1 .entry-image {\n    height: 350px;\n    margin-right: 15px;\n    width: 66.66666667% !important;\n  }\n\n  .homePage .entry.entry1 .entry-title {\n    font-size: 36px !important;\n  }\n\n  .homePage .entry.entry1 .entry-body {\n    padding: 0 0 0 13px;\n    width: 33.33333333% !important;\n  }\n\n  .homePage .entry.entry7 .entry-image {\n    height: 450px;\n  }\n\n  .homePage .entry.entry7 .entry-title {\n    font-size: 44px !important;\n  }\n\n  .homePage .entry.entry7 .entry-excerpt {\n    font-size: 24px;\n    line-height: 1.3;\n  }\n\n  .homePage .entry.entry7 .u-backgroundDark,\n  .homePage .entry.entry13 .u-backgroundDark,\n  .homePage .entry.entry14 .u-backgroundDark {\n    display: block;\n  }\n\n  .homePage .entry.entry7 .entry-body,\n  .homePage .entry.entry13 .entry-body,\n  .homePage .entry.entry14 .entry-body {\n    bottom: 0;\n    left: 0;\n    margin: 30px 40px;\n    max-width: 600px;\n    position: absolute;\n    z-index: 2;\n  }\n\n  .homePage .entry.entry7:not(.not--image) .entry-body,\n  .homePage .entry.entry13:not(.not--image) .entry-body,\n  .homePage .entry.entry14:not(.not--image) .entry-body {\n    color: #fff;\n  }\n\n  .homePage .entry.entry7:not(.not--image) .entry-author,\n  .homePage .entry.entry13:not(.not--image) .entry-author,\n  .homePage .entry.entry14:not(.not--image) .entry-author {\n    color: rgba(255, 255, 255, 0.9);\n  }\n\n  .homePage .entry.entry7:not(.not--image) .entry-author a,\n  .homePage .entry.entry7:not(.not--image) .entry-author .entry-date,\n  .homePage .entry.entry13:not(.not--image) .entry-author a,\n  .homePage .entry.entry13:not(.not--image) .entry-author .entry-date,\n  .homePage .entry.entry14:not(.not--image) .entry-author a,\n  .homePage .entry.entry14:not(.not--image) .entry-author .entry-date {\n    color: rgba(255, 255, 255, 0.9);\n  }\n\n  .homePage .entry.entry13 .entry-image,\n  .homePage .entry.entry14 .entry-image {\n    height: 450px;\n  }\n\n  .homePage .entry.entry13 .entry-title,\n  .homePage .entry.entry14 .entry-title {\n    font-size: 32px !important;\n  }\n\n  .homePage .entry.entry13 .entry-excerpt,\n  .homePage .entry.entry14 .entry-excerpt {\n    display: none;\n  }\n\n  .homePage .entry.entry13 .entry-byline,\n  .homePage .entry.entry14 .entry-byline {\n    margin-top: 20px;\n  }\n\n  .homePage .entry.entry13 .entry-body,\n  .homePage .entry.entry14 .entry-body {\n    max-width: 400px;\n  }\n\n  .homePage .entry.entry5,\n  .homePage .entry.entry6,\n  .homePage .entry.entry11,\n  .homePage .entry.entry12 {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .homePage .entry.entry5 .entry-image,\n  .homePage .entry.entry6 .entry-image,\n  .homePage .entry.entry11 .entry-image,\n  .homePage .entry.entry12 .entry-image {\n    height: 274px;\n  }\n\n  .homePage .entry.entry13 {\n    -ms-flex-preferred-size: 60%;\n        flex-basis: 60%;\n    max-width: 60%;\n    padding-right: 0;\n  }\n\n  .homePage .entry.entry14 {\n    -ms-flex-preferred-size: 40%;\n        flex-basis: 40%;\n    max-width: 40%;\n  }\n}\n\n.post-title {\n  line-height: 1.04;\n}\n\n.post-footer {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.post-body a {\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px;\n}\n\n.post-body > p:first-of-type:first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px;\n}\n\n.post-body ul li,\n.post-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-bottom: 14px;\n  margin-left: 30px;\n}\n\n.post-body ul li::before,\n.post-body ol li::before {\n  box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n.post-body ul li::before {\n  content: '\\2022';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px;\n}\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  display: block;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  margin-top: 40px !important;\n}\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important;\n}\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.post-newsletter {\n  max-width: 520px;\n}\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n.post-related .entry-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 150px;\n}\n\n.post-related .entry-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n.post-related .u-card {\n  height: 240px;\n}\n\n.sharePost {\n  margin-left: -130px;\n  margin-top: 28px;\n  width: 45px;\n}\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  -webkit-transform: translateY(100%);\n       -o-transform: translateY(100%);\n          transform: translateY(100%);\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  -o-transition: -o-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s, -o-transform .3s;\n  visibility: hidden;\n  z-index: 400;\n}\n\n.postActions.is-visible {\n  -webkit-transform: translateY(0);\n       -o-transform: translateY(0);\n          transform: translateY(0);\n  -webkit-transition-delay: 0s;\n       -o-transition-delay: 0s;\n          transition-delay: 0s;\n  visibility: visible;\n}\n\n.postActions-wrap {\n  max-width: 1200px;\n}\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px;\n  }\n\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px;\n  }\n\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px;\n  }\n\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important;\n  }\n\n  .post-body > p:first-of-type:first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px;\n  }\n\n  .post-body ol,\n  .post-body ul,\n  .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n.author a {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author a:hover {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.author-wrap {\n  z-index: 2;\n}\n\n.author-avatar {\n  height: 80px;\n  margin-right: 10px;\n  width: 80px;\n}\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author-bio {\n  max-width: 600px;\n}\n\n.author-follow a {\n  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.5);\n  cursor: pointer;\n  display: inline-block;\n  height: 40px;\n  line-height: 40px;\n  margin: 0 10px;\n  padding: 0 16px;\n  text-shadow: none;\n}\n\n.author-follow a:hover {\n  box-shadow: inset 0 0 0 2px #fff;\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block;\n  }\n}\n\n.search {\n  background-color: #fff;\n  display: none;\n  height: 100%;\n  padding: 0 20px 0;\n  position: fixed !important;\n  z-index: 9999;\n}\n\n.search-header {\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);\n  height: 50px;\n  margin: 0 -20px 30px;\n  padding: 0 20px;\n}\n\n.search-form {\n  max-width: 680px;\n}\n\n.search-form::before {\n  background: #eee;\n  bottom: 0;\n  content: '';\n  display: block;\n  height: 2px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n.search-form input {\n  border: none;\n  display: block;\n  line-height: 40px;\n  padding-bottom: 8px;\n}\n\n.search-form input:focus {\n  outline: 0;\n}\n\n.search-results {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  height: 100%;\n  max-width: 680px;\n  overflow: auto;\n}\n\n.search-results a {\n  border-bottom: 1px solid #eee;\n  padding: 12px 0;\n}\n\n.search-results a:hover {\n  color: rgba(0, 0, 0, 0.44);\n}\n\nbody.is-search {\n  overflow: hidden;\n}\n\nbody.is-search .search {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  -webkit-transition: .4s;\n  -o-transition: .4s;\n  transition: .4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n", "", {"version":3,"sources":["C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\main.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\common\\_mixins.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/main.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\common\\_global.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\common\\_utilities.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\node_modules\\normalize.css\\normalize.css","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\node_modules\\prismjs\\themes\\prism.css","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\lib\\_zoom.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\common\\_typography.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\components\\_grid.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\components\\_form.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\components\\_icons.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\components\\_animated.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\layouts\\_header.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\layouts\\_entry.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\layouts\\_homepage.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\layouts\\_post.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\layouts\\_author.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\layouts\\_search.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\layouts\\_sidebar.scss","C:/Users/Smigol/Projects/ghost/content/themes/simply/src/styles/C:\\Users\\Smigol\\Projects\\ghost\\content\\themes\\simply/src\\styles\\src\\styles\\layouts\\_sidenav.scss"],"names":[],"mappings":"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","file":"main.scss","sourcesContent":["@charset \"UTF-8\";\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none; }\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none; }\n  .link--accent:hover {\n    color: #00ab6b; }\n\n.u-absolute0, .post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.tag.not--image, .u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important; }\n\n.warning::before, .note::before, .success::before, [class^=\"i-\"]::before, [class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/*! normalize.css v6.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0; }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none; }\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc; }\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc; }\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none; } }\n\n/* Code blocks */\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto; }\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0; }\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal; }\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray; }\n\n.token.punctuation {\n  color: #999; }\n\n.namespace {\n  opacity: .7; }\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905; }\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690; }\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5); }\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a; }\n\n.token.function {\n  color: #DD4A68; }\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90; }\n\n.token.important,\n.token.bold {\n  font-weight: bold; }\n\n.token.italic {\n  font-style: italic; }\n\n.token.entity {\n  cursor: help; }\n\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in; }\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms; }\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out; }\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms; }\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1; }\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default; }\n\n*, *:before, *:after {\n  box-sizing: inherit; }\n\na {\n  color: inherit;\n  text-decoration: none; }\n  a:active, a:hover {\n    outline: 0; }\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px; }\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility; }\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px; }\n\nfigure {\n  margin: 0; }\n\nkbd, samp, code {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap; }\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal; }\n  pre code {\n    background: transparent;\n    color: #37474f;\n    padding: 0;\n    text-shadow: 0 1px #fff; }\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4; }\n  code[class*=language-] .token.comment,\n  pre[class*=language-] .token.comment {\n    opacity: .8; }\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center; }\n  hr::before {\n    color: rgba(0, 0, 0, 0.6);\n    content: '...';\n    display: inline-block;\n    font-family: \"Source Sans Pro\", sans-serif;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -25px; }\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto; }\n  img:not([src]) {\n    visibility: hidden; }\n\ni {\n  vertical-align: middle; }\n\nol, ul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8); }\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left; }\n  q:before, q:after {\n    display: none; }\n\n.main,\n.footer {\n  transition: transform .5s ease; }\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px; } }\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000; }\n  .warning::before {\n    content: \"\"; }\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1; }\n  .note::before {\n    content: \"\"; }\n\n.success {\n  background: #e0f2f1;\n  color: #00897b; }\n  .success::before {\n    color: #00bfa5;\n    content: \"\"; }\n\n.warning, .note, .success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px; }\n  .warning a, .note a, .success a {\n    color: inherit;\n    text-decoration: underline; }\n  .warning::before, .note::before, .success::before {\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n    margin-top: -5px; }\n\n.tag {\n  color: #fff;\n  min-height: 250px;\n  z-index: 2; }\n  .tag-wrap {\n    z-index: 2; }\n  .tag.not--image {\n    min-height: auto; }\n  .tag-description {\n    max-width: 500px; }\n\n.with-tooltip {\n  overflow: visible;\n  position: relative; }\n  .with-tooltip:after {\n    background: rgba(0, 0, 0, 0.85);\n    border-radius: 4px;\n    color: #FFF;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 130px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1; }\n  .with-tooltip:hover:after {\n    animation: tooltip .1s ease-out both; }\n\n.footer {\n  color: rgba(0, 0, 0, 0.44); }\n  .footer a {\n    color: rgba(0, 0, 0, 0.6); }\n    .footer a:hover {\n      color: rgba(0, 0, 0, 0.8); }\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%; }\n  .errorPage-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px; }\n  .errorPage-text {\n    margin-top: 60px;\n    white-space: pre-wrap; }\n  .errorPage-wrap {\n    color: rgba(0, 0, 0, 0.4);\n    left: 50%;\n    min-width: 680px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%); }\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative; }\n  .video-responsive iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .video-responsive video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%; }\n\n.c-facebook {\n  color: #3b5998 !important; }\n\n.bg-facebook, .sideNav-follow .i-facebook {\n  background-color: #3b5998 !important; }\n\n.c-twitter {\n  color: #55acee !important; }\n\n.bg-twitter, .sideNav-follow .i-twitter {\n  background-color: #55acee !important; }\n\n.c-google {\n  color: #dd4b39 !important; }\n\n.bg-google, .sideNav-follow .i-google {\n  background-color: #dd4b39 !important; }\n\n.c-instagram {\n  color: #306088 !important; }\n\n.bg-instagram, .sideNav-follow .i-instagram {\n  background-color: #306088 !important; }\n\n.c-youtube {\n  color: #e52d27 !important; }\n\n.bg-youtube, .sideNav-follow .i-youtube {\n  background-color: #e52d27 !important; }\n\n.c-github {\n  color: #555 !important; }\n\n.bg-github, .sideNav-follow .i-github {\n  background-color: #555 !important; }\n\n.c-linkedin {\n  color: #007bb6 !important; }\n\n.bg-linkedin, .sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important; }\n\n.c-spotify {\n  color: #2ebd59 !important; }\n\n.bg-spotify, .sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important; }\n\n.c-codepen {\n  color: #222 !important; }\n\n.bg-codepen, .sideNav-follow .i-codepen {\n  background-color: #222 !important; }\n\n.c-behance {\n  color: #131418 !important; }\n\n.bg-behance, .sideNav-follow .i-behance {\n  background-color: #131418 !important; }\n\n.c-dribbble {\n  color: #ea4c89 !important; }\n\n.bg-dribbble, .sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important; }\n\n.c-flickr {\n  color: #0063dc !important; }\n\n.bg-flickr, .sideNav-follow .i-flickr {\n  background-color: #0063dc !important; }\n\n.c-reddit {\n  color: #ff4500 !important; }\n\n.bg-reddit, .sideNav-follow .i-reddit {\n  background-color: #ff4500 !important; }\n\n.c-pocket {\n  color: #f50057 !important; }\n\n.bg-pocket, .sideNav-follow .i-pocket {\n  background-color: #f50057 !important; }\n\n.c-pinterest {\n  color: #bd081c !important; }\n\n.bg-pinterest, .sideNav-follow .i-pinterest {\n  background-color: #bd081c !important; }\n\n.c-whatsapp {\n  color: #64d448 !important; }\n\n.bg-whatsapp, .sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important; }\n\n.fbSave-dropdown {\n  background-color: #FFF;\n  border: 1px solid #e0e0e0;\n  bottom: 100%;\n  display: none;\n  max-width: 200px;\n  min-width: 100px;\n  padding: 8px;\n  transform: translate(-50%, 0);\n  z-index: 10; }\n  .fbSave-dropdown.is-visible {\n    display: block; }\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  z-index: 888;\n  width: 60px; }\n  .rocket:hover svg path {\n    fill: rgba(0, 0, 0, 0.6); }\n\n.svg-icon svg {\n  width: 100%;\n  height: auto; }\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center; }\n\n.loadingBar {\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800; }\n\n.is-loading .loadingBar {\n  animation-delay: .8s;\n  animation: loading-bar 1s ease-in-out infinite;\n  display: block; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0; }\n  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,\n  .h1 a, .h2 a, .h3 a, .h4 a, .h5 a, .h6 a {\n    color: inherit;\n    line-height: inherit; }\n\nh1 {\n  font-size: 2.25rem; }\n\nh2 {\n  font-size: 1.875rem; }\n\nh3 {\n  font-size: 1.5625rem; }\n\nh4 {\n  font-size: 1.375rem; }\n\nh5 {\n  font-size: 1.125rem; }\n\nh6 {\n  font-size: 1rem; }\n\n.h1 {\n  font-size: 2.25rem; }\n\n.h2 {\n  font-size: 1.875rem; }\n\n.h3 {\n  font-size: 1.5625rem; }\n\n.h4 {\n  font-size: 1.375rem; }\n\n.h5 {\n  font-size: 1.125rem; }\n\n.h6 {\n  font-size: 1rem; }\n\np {\n  margin: 0; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0; }\n  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,\n  .h1 a, .h2 a, .h3 a, .h4 a, .h5 a, .h6 a {\n    color: inherit;\n    line-height: inherit; }\n\nh1 {\n  font-size: 2.25rem; }\n\nh2 {\n  font-size: 1.875rem; }\n\nh3 {\n  font-size: 1.5625rem; }\n\nh4 {\n  font-size: 1.375rem; }\n\nh5 {\n  font-size: 1.125rem; }\n\nh6 {\n  font-size: 1rem; }\n\n.h1 {\n  font-size: 2.25rem; }\n\n.h2 {\n  font-size: 1.875rem; }\n\n.h3 {\n  font-size: 1.5625rem; }\n\n.h4 {\n  font-size: 1.375rem; }\n\n.h5 {\n  font-size: 1.125rem; }\n\n.h6 {\n  font-size: 1rem; }\n\np {\n  margin: 0; }\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44); }\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6); }\n\n.u-bgColor {\n  background-color: #00A034; }\n\n.u-headerColorLink a {\n  color: #BBF1B9; }\n  .u-headerColorLink a.active, .u-headerColorLink a:hover {\n    color: #EEFFEA; }\n\n.u-relative {\n  position: relative; }\n\n.u-absolute {\n  position: absolute; }\n\n.u-block {\n  display: block !important; }\n\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1; }\n\n.u-backgroundWhite {\n  background-color: #fafafa; }\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important; }\n\n.u-clear::before, .u-clear::after {\n  content: \" \";\n  display: table; }\n\n.u-clear::after {\n  clear: both; }\n\n.u-fontSize13 {\n  font-size: 13px; }\n\n.u-fontSize15 {\n  font-size: 15px; }\n\n.u-fontSize20 {\n  font-size: 20px; }\n\n.u-fontSize22 {\n  font-size: 22px; }\n\n.u-fontSize28 {\n  font-size: 28px !important; }\n\n.u-fontSize36 {\n  font-size: 36px; }\n\n.u-fontSize40 {\n  font-size: 40px; }\n\n.u-fontSizeBase {\n  font-size: 18px; }\n\n.u-fontSizeJumbo {\n  font-size: 50px; }\n\n.u-fontSizeLarge {\n  font-size: 24px !important; }\n\n.u-fontSizeLarger {\n  font-size: 32px; }\n\n.u-fontSizeLargest {\n  font-size: 44px; }\n\n.u-fontSizeMicro {\n  font-size: 11px; }\n\n.u-fontSizeSmall {\n  font-size: 16px; }\n\n.u-fontSizeSmaller {\n  font-size: 14px; }\n\n.u-fontSizeSmallest {\n  font-size: 12px; }\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important; }\n  .u-md-fontSizeLarger {\n    font-size: 32px; } }\n\n.u-fontWeightThin {\n  font-weight: 300; }\n\n.u-fontWeightNormal {\n  font-weight: 400; }\n\n.u-fontWeightMedium {\n  font-weight: 500; }\n\n.u-fontWeightSemibold {\n  font-weight: 600; }\n\n.u-fontWeightBold {\n  font-weight: 700 !important; }\n\n.u-textUppercase {\n  text-transform: uppercase; }\n\n.u-textAlignCenter {\n  text-align: center; }\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important; }\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto; }\n\n.u-marginTop30 {\n  margin-top: 30px; }\n\n.u-marginBottom15 {\n  margin-bottom: 15px; }\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important; }\n\n.u-marginBottom30 {\n  margin-bottom: 30px; }\n\n.u-marginBottom40 {\n  margin-bottom: 40px; }\n\n.u-padding0 {\n  padding: 0 !important; }\n\n.u-padding15 {\n  padding: 15px !important; }\n\n.u-paddingBottom2 {\n  padding-bottom: 2px; }\n\n.u-paddingBottom30 {\n  padding-bottom: 30px; }\n\n.u-paddingBottom20 {\n  padding-bottom: 20px; }\n\n.u-paddingTop5 {\n  padding-top: 5px; }\n\n.u-paddingTop10 {\n  padding-top: 10px; }\n\n.u-paddingTop15 {\n  padding-top: 15px; }\n\n.u-paddingTop20 {\n  padding-top: 20px; }\n\n.u-paddingTop30 {\n  padding-top: 30px; }\n\n.u-paddingBottom15 {\n  padding-bottom: 15px; }\n\n.u-paddingRight20 {\n  padding-right: 20px; }\n\n.u-paddingLeft20 {\n  padding-left: 20px; }\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em; }\n\n.u-lineHeight1 {\n  line-height: 1; }\n\n.u-overflowHidden {\n  overflow: hidden; }\n\n.u-floatRight {\n  float: right; }\n\n.u-floatLeft {\n  float: left; }\n\n.u-flex {\n  display: flex; }\n\n.u-flexCenter {\n  align-items: center;\n  display: flex; }\n\n.u-flex1 {\n  flex: 1 1 auto; }\n\n.u-flex0 {\n  flex: 0 0 auto; }\n\n.u-flexWrap {\n  flex-wrap: wrap; }\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end; }\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover; }\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px; }\n\n.u-maxWidth1000 {\n  max-width: 1000px; }\n\n.u-maxWidth740 {\n  max-width: 740px; }\n\n.u-maxWidth1040 {\n  max-width: 1040px; }\n\n.u-sizeFullWidth {\n  width: 100%; }\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15); }\n\n.u-round {\n  border-radius: 50%; }\n\n.u-borderRadius2 {\n  border-radius: 2px; }\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px; }\n  .u-card--p {\n    font-family: \"Droid Serif\", serif;\n    font-style: normal;\n    font-weight: 400;\n    letter-spacing: -.004em;\n    line-height: 1.58; }\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05); }\n\n.u-hide {\n  display: none !important; }\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important; } }\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important; } }\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important; } }\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important; } }\n\n.u-wrap {\n  margin: 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n  width: 100%; }\n  @media only screen and (min-width: 1230px) {\n    .u-wrap {\n      max-width: 1200px; } }\n\n@media only screen and (min-width: 1000px) {\n  .content {\n    flex: 1 !important;\n    max-width: calc(100% - 340px) !important;\n    order: 1; }\n  .sidebar {\n    flex: 0 0 340px !important;\n    order: 2; } }\n\n.row {\n  display: flex;\n  flex: 0 1 auto;\n  flex-flow: row wrap;\n  margin-left: -12px;\n  margin-right: -12px; }\n  .row .col {\n    flex: 0 0 auto;\n    padding-left: 12px;\n    padding-right: 12px; }\n    .row .col.s1 {\n      flex-basis: 8.33333%;\n      max-width: 8.33333%; }\n    .row .col.s2 {\n      flex-basis: 16.66667%;\n      max-width: 16.66667%; }\n    .row .col.s3 {\n      flex-basis: 25%;\n      max-width: 25%; }\n    .row .col.s4 {\n      flex-basis: 33.33333%;\n      max-width: 33.33333%; }\n    .row .col.s5 {\n      flex-basis: 41.66667%;\n      max-width: 41.66667%; }\n    .row .col.s6 {\n      flex-basis: 50%;\n      max-width: 50%; }\n    .row .col.s7 {\n      flex-basis: 58.33333%;\n      max-width: 58.33333%; }\n    .row .col.s8 {\n      flex-basis: 66.66667%;\n      max-width: 66.66667%; }\n    .row .col.s9 {\n      flex-basis: 75%;\n      max-width: 75%; }\n    .row .col.s10 {\n      flex-basis: 83.33333%;\n      max-width: 83.33333%; }\n    .row .col.s11 {\n      flex-basis: 91.66667%;\n      max-width: 91.66667%; }\n    .row .col.s12 {\n      flex-basis: 100%;\n      max-width: 100%; }\n    @media only screen and (min-width: 766px) {\n      .row .col.m1 {\n        flex-basis: 8.33333%;\n        max-width: 8.33333%; }\n      .row .col.m2 {\n        flex-basis: 16.66667%;\n        max-width: 16.66667%; }\n      .row .col.m3 {\n        flex-basis: 25%;\n        max-width: 25%; }\n      .row .col.m4 {\n        flex-basis: 33.33333%;\n        max-width: 33.33333%; }\n      .row .col.m5 {\n        flex-basis: 41.66667%;\n        max-width: 41.66667%; }\n      .row .col.m6 {\n        flex-basis: 50%;\n        max-width: 50%; }\n      .row .col.m7 {\n        flex-basis: 58.33333%;\n        max-width: 58.33333%; }\n      .row .col.m8 {\n        flex-basis: 66.66667%;\n        max-width: 66.66667%; }\n      .row .col.m9 {\n        flex-basis: 75%;\n        max-width: 75%; }\n      .row .col.m10 {\n        flex-basis: 83.33333%;\n        max-width: 83.33333%; }\n      .row .col.m11 {\n        flex-basis: 91.66667%;\n        max-width: 91.66667%; }\n      .row .col.m12 {\n        flex-basis: 100%;\n        max-width: 100%; } }\n    @media only screen and (min-width: 1000px) {\n      .row .col.l1 {\n        flex-basis: 8.33333%;\n        max-width: 8.33333%; }\n      .row .col.l2 {\n        flex-basis: 16.66667%;\n        max-width: 16.66667%; }\n      .row .col.l3 {\n        flex-basis: 25%;\n        max-width: 25%; }\n      .row .col.l4 {\n        flex-basis: 33.33333%;\n        max-width: 33.33333%; }\n      .row .col.l5 {\n        flex-basis: 41.66667%;\n        max-width: 41.66667%; }\n      .row .col.l6 {\n        flex-basis: 50%;\n        max-width: 50%; }\n      .row .col.l7 {\n        flex-basis: 58.33333%;\n        max-width: 58.33333%; }\n      .row .col.l8 {\n        flex-basis: 66.66667%;\n        max-width: 66.66667%; }\n      .row .col.l9 {\n        flex-basis: 75%;\n        max-width: 75%; }\n      .row .col.l10 {\n        flex-basis: 83.33333%;\n        max-width: 83.33333%; }\n      .row .col.l11 {\n        flex-basis: 91.66667%;\n        max-width: 91.66667%; }\n      .row .col.l12 {\n        flex-basis: 100%;\n        max-width: 100%; } }\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap; }\n  .button i {\n    display: inline-block; }\n  .button--chromeless {\n    border-radius: 0;\n    border-width: 0;\n    box-shadow: none;\n    color: rgba(0, 0, 0, 0.44);\n    height: auto;\n    line-height: inherit;\n    padding: 0;\n    text-align: left;\n    vertical-align: baseline;\n    white-space: normal; }\n    .button--chromeless:active, .button--chromeless:hover, .button--chromeless:focus {\n      border-width: 0;\n      color: rgba(0, 0, 0, 0.6); }\n  .button--large {\n    font-size: 15px;\n    height: 44px;\n    line-height: 42px;\n    padding: 0 18px; }\n  .button--dark {\n    border-color: rgba(0, 0, 0, 0.6);\n    color: rgba(0, 0, 0, 0.6); }\n    .button--dark:hover {\n      border-color: rgba(0, 0, 0, 0.8);\n      color: rgba(0, 0, 0, 0.8); }\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px; }\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px; }\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px; }\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0; }\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0; }\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"../fonts/simply.eot?b9w9k4\");\n  src: url(\"../fonts/simply.eot?b9w9k4#iefix\") format(\"embedded-opentype\"), url(\"../fonts/simply.ttf?b9w9k4\") format(\"truetype\"), url(\"../fonts/simply.woff?b9w9k4\") format(\"woff\"), url(\"../fonts/simply.svg?b9w9k4#simply\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.i-comments:before {\n  content: \"\\e900\"; }\n\n.i-location:before {\n  content: \"\\e8b4\"; }\n\n.i-save:before {\n  content: \"\\e8e6\"; }\n\n.i-save--line:before {\n  content: \"\\e8e7\"; }\n\n.i-check-circle:before {\n  content: \"\\e86c\"; }\n\n.i-close:before {\n  content: \"\\e5cd\"; }\n\n.i-favorite:before {\n  content: \"\\e87d\"; }\n\n.i-star:before {\n  content: \"\\e838\"; }\n\n.i-warning:before {\n  content: \"\\e002\"; }\n\n.i-rss:before {\n  content: \"\\e0e5\"; }\n\n.i-search:before {\n  content: \"\\e8b6\"; }\n\n.i-send:before {\n  content: \"\\e163\"; }\n\n.i-share:before {\n  content: \"\\e80d\"; }\n\n.i-link:before {\n  content: \"\\f0c1\"; }\n\n.i-reddit:before {\n  content: \"\\f281\"; }\n\n.i-twitter:before {\n  content: \"\\f099\"; }\n\n.i-github:before {\n  content: \"\\f09b\"; }\n\n.i-linkedin:before {\n  content: \"\\f0e1\"; }\n\n.i-code:before {\n  content: \"\\f121\"; }\n\n.i-youtube:before {\n  content: \"\\f16a\"; }\n\n.i-stack-overflow:before {\n  content: \"\\f16c\"; }\n\n.i-instagram:before {\n  content: \"\\f16d\"; }\n\n.i-flickr:before {\n  content: \"\\f16e\"; }\n\n.i-dribbble:before {\n  content: \"\\f17d\"; }\n\n.i-behance:before {\n  content: \"\\f1b4\"; }\n\n.i-spotify:before {\n  content: \"\\f1bc\"; }\n\n.i-codepen:before {\n  content: \"\\f1cb\"; }\n\n.i-facebook:before {\n  content: \"\\f230\"; }\n\n.i-pinterest:before {\n  content: \"\\f231\"; }\n\n.i-whatsapp:before {\n  content: \"\\f232\"; }\n\n.i-snapchat:before {\n  content: \"\\f2ac\"; }\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both; }\n  .animated.infinite {\n    animation-iteration-count: infinite; }\n\n.bounceIn {\n  animation-name: bounceIn; }\n\n.bounceInDown {\n  animation-name: bounceInDown; }\n\n.pulse {\n  animation-name: pulse; }\n\n@keyframes bounceIn {\n  0%,\n  20%,\n  40%,\n  60%,\n  80%,\n  100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97); }\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes bounceInDown {\n  0%,\n  60%,\n  75%,\n  90%,\n  100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1); }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    transform: translate3d(0, 5px, 0); }\n  100% {\n    transform: none; } }\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1); }\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2); }\n  to {\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes scroll {\n  0% {\n    opacity: 0; }\n  10% {\n    opacity: 1;\n    transform: translateY(0); }\n  100% {\n    opacity: 0;\n    transform: translateY(10px); } }\n\n@keyframes opacity {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px); }\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0); } }\n\n@keyframes loading-bar {\n  0% {\n    transform: translateX(-100%); }\n  40% {\n    transform: translateX(0); }\n  60% {\n    transform: translateX(0); }\n  100% {\n    transform: translateX(100%); } }\n\n.header {\n  z-index: 80; }\n  .header-wrap {\n    height: 50px; }\n  .header-logo {\n    height: 30px; }\n    .header-logo img {\n      max-height: 100%; }\n  .header-logo,\n  .header .button-search--open,\n  .header .button-nav--toggle {\n    z-index: 150; }\n  .header-description {\n    color: #BBF1B9;\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 750px; }\n\n.follow > a {\n  padding-left: 15px; }\n\n.nav {\n  line-height: 40px;\n  padding: 8px 0;\n  position: relative; }\n  .nav ul {\n    display: flex; }\n  .nav li {\n    float: left; }\n    .nav li a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase; }\n\n.button-search--open {\n  color: inherit !important;\n  padding-right: 0 !important; }\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px; }\n  .button-nav--toggle span {\n    background-color: #BBF1B9;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px; }\n    .button-nav--toggle span:first-child {\n      transform: translate(0, -6px); }\n    .button-nav--toggle span:last-child {\n      transform: translate(0, 6px); }\n\nbody.is-frontpage .header-wrap {\n  height: auto; }\n\n@media only screen and (min-width: 766px) {\n  .header-wrap {\n    border: 0; }\n  .header-logo {\n    height: 30px;\n    padding-left: 0; }\n  .header-top-section {\n    padding-top: 15px; }\n  body.is-frontpage .header-wrap {\n    height: 200px; }\n  body.is-frontpage .header-logo {\n    height: 40px;\n    margin-bottom: 15px; }\n  body.is-frontpage .header-top-section {\n    padding-top: 0; }\n  body.is-frontpage .nav ul {\n    flex: 1 1 auto; } }\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed; }\n    .header-wrap {\n      height: 50px !important; }\n  body.is-showNavMob {\n    overflow: hidden; }\n    body.is-showNavMob .sideNav {\n      transform: translateX(0); }\n    body.is-showNavMob .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg); }\n      body.is-showNavMob .button-nav--toggle span:first-child {\n        transform: rotate(45deg) translate(0, 0); }\n      body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n        transform: scaleX(0); }\n      body.is-showNavMob .button-nav--toggle span:last-child {\n        transform: rotate(-45deg) translate(0, 0); }\n    body.is-showNavMob .header .button-search--toggle {\n      display: none; }\n    body.is-showNavMob .main, body.is-showNavMob .footer {\n      transform: translateX(-25%); } }\n\n.entry-author {\n  line-height: 1.4;\n  padding-left: 10px; }\n\n.entry-avatar--img {\n  border-radius: 50%;\n  height: 40px;\n  width: 40px; }\n  .entry-avatar--img.no-avatar {\n    background-image: url(\"../images/avatar.png\") !important; }\n\n.entry.not--image {\n  color: rgba(0, 0, 0, 0.8); }\n\n.entry.u-card .entry-image {\n  max-height: 240px;\n  max-width: 360px; }\n\n.entry.entry--featured .entry-body {\n  display: flex;\n  flex-direction: column; }\n\n.entry.entry--featured .entry-image {\n  height: 200px;\n  margin-bottom: 20px;\n  margin-top: 5px;\n  max-width: 100%;\n  order: -1; }\n\n.entry.entry--featured .entry-image--link {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%; }\n\n.entry.entry--featured .entry-excerpt,\n.entry.even:not(.entry--featured) .entry-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22; }\n\n.homePage .entry .u-backgroundDark {\n  display: none; }\n\n.homePage .entry-image {\n  height: 172px; }\n\n@media only screen and (min-width: 766px) {\n  .homePage .entry-image {\n    height: 174px; }\n  .homePage .entry.entry1, .homePage .entry.entry7 {\n    flex-basis: 100%;\n    max-width: 100%; }\n  .homePage .entry.entry1 {\n    display: flex; }\n    .homePage .entry.entry1 .entry-image {\n      height: 350px;\n      margin-right: 15px;\n      width: 66.66666667% !important; }\n    .homePage .entry.entry1 .entry-title {\n      font-size: 36px !important; }\n    .homePage .entry.entry1 .entry-body {\n      padding: 0 0 0 13px;\n      width: 33.33333333% !important; }\n  .homePage .entry.entry7 .entry-image {\n    height: 450px; }\n  .homePage .entry.entry7 .entry-title {\n    font-size: 44px !important; }\n  .homePage .entry.entry7 .entry-excerpt {\n    font-size: 24px;\n    line-height: 1.3; }\n  .homePage .entry.entry7 .u-backgroundDark, .homePage .entry.entry13 .u-backgroundDark, .homePage .entry.entry14 .u-backgroundDark {\n    display: block; }\n  .homePage .entry.entry7 .entry-body, .homePage .entry.entry13 .entry-body, .homePage .entry.entry14 .entry-body {\n    bottom: 0;\n    left: 0;\n    margin: 30px 40px;\n    max-width: 600px;\n    position: absolute;\n    z-index: 2; }\n  .homePage .entry.entry7:not(.not--image) .entry-body, .homePage .entry.entry13:not(.not--image) .entry-body, .homePage .entry.entry14:not(.not--image) .entry-body {\n    color: #fff; }\n  .homePage .entry.entry7:not(.not--image) .entry-author, .homePage .entry.entry13:not(.not--image) .entry-author, .homePage .entry.entry14:not(.not--image) .entry-author {\n    color: rgba(255, 255, 255, 0.9); }\n    .homePage .entry.entry7:not(.not--image) .entry-author a, .homePage .entry.entry7:not(.not--image) .entry-author .entry-date, .homePage .entry.entry13:not(.not--image) .entry-author a, .homePage .entry.entry13:not(.not--image) .entry-author .entry-date, .homePage .entry.entry14:not(.not--image) .entry-author a, .homePage .entry.entry14:not(.not--image) .entry-author .entry-date {\n      color: rgba(255, 255, 255, 0.9); }\n  .homePage .entry.entry13 .entry-image, .homePage .entry.entry14 .entry-image {\n    height: 450px; }\n  .homePage .entry.entry13 .entry-title, .homePage .entry.entry14 .entry-title {\n    font-size: 32px !important; }\n  .homePage .entry.entry13 .entry-excerpt, .homePage .entry.entry14 .entry-excerpt {\n    display: none; }\n  .homePage .entry.entry13 .entry-byline, .homePage .entry.entry14 .entry-byline {\n    margin-top: 20px; }\n  .homePage .entry.entry13 .entry-body, .homePage .entry.entry14 .entry-body {\n    max-width: 400px; }\n  .homePage .entry.entry5, .homePage .entry.entry6, .homePage .entry.entry11, .homePage .entry.entry12 {\n    flex-basis: 50%;\n    max-width: 50%; }\n    .homePage .entry.entry5 .entry-image, .homePage .entry.entry6 .entry-image, .homePage .entry.entry11 .entry-image, .homePage .entry.entry12 .entry-image {\n      height: 274px; }\n  .homePage .entry.entry13 {\n    flex-basis: 60%;\n    max-width: 60%;\n    padding-right: 0; }\n  .homePage .entry.entry14 {\n    flex-basis: 40%;\n    max-width: 40%; } }\n\n.post-title {\n  line-height: 1.04; }\n\n.post-footer {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05); }\n\n.post-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none; }\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.post-body h1, .post-body h2, .post-body h3, .post-body h4, .post-body h5, .post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal; }\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px; }\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px; }\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px; }\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px; }\n\n.post-body > p:first-of-type:first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase; }\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px; }\n  .post-body ul li,\n  .post-body ol li {\n    letter-spacing: -.003em;\n    line-height: 1.58;\n    margin-bottom: 14px;\n    margin-left: 30px; }\n    .post-body ul li::before,\n    .post-body ol li::before {\n      box-sizing: border-box;\n      display: inline-block;\n      margin-left: -78px;\n      position: absolute;\n      text-align: right;\n      width: 78px; }\n\n.post-body ul li::before {\n  content: '•';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px; }\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px; }\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  display: block;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  margin-top: 40px !important; }\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important; }\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px; }\n  .post-tags a:hover {\n    background: rgba(0, 0, 0, 0.1);\n    color: rgba(0, 0, 0, 0.6); }\n\n.post-newsletter {\n  max-width: 520px; }\n  .post-newsletter .newsletter-form {\n    max-width: 400px; }\n  .post-newsletter .form-group {\n    width: 80%;\n    padding-right: 5px; }\n  .post-newsletter .form--input {\n    border: 0;\n    border-bottom: 1px solid #ccc;\n    height: 48px;\n    padding: 6px 12px 8px 5px;\n    resize: none;\n    width: 100%; }\n    .post-newsletter .form--input:focus {\n      outline: 0; }\n  .post-newsletter .form--btn {\n    background-color: #a9a9a9;\n    border-radius: 0 45px 45px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    padding: 0;\n    width: 20%; }\n    .post-newsletter .form--btn::before {\n      background-color: #a9a9a9;\n      border-radius: 0 45px 45px 0;\n      line-height: 45px;\n      z-index: 2; }\n    .post-newsletter .form--btn:hover {\n      opacity: .8; }\n    .post-newsletter .form--btn:focus {\n      outline: 0; }\n\n.post-related .entry-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 150px; }\n\n.post-related .entry-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important; }\n\n.post-related .u-card {\n  height: 240px; }\n\n.sharePost {\n  margin-left: -130px;\n  margin-top: 28px;\n  width: 45px; }\n  .sharePost a {\n    background-image: none;\n    border-radius: 5px;\n    color: #fff;\n    height: 36px;\n    line-height: 20px;\n    margin: 10px auto;\n    padding: 8px;\n    text-decoration: none;\n    width: 36px; }\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translateY(100%);\n  transition: transform .3s;\n  visibility: hidden;\n  z-index: 400; }\n  .postActions.is-visible {\n    transform: translateY(0);\n    transition-delay: 0s;\n    visibility: visible; }\n  .postActions-wrap {\n    max-width: 1200px; }\n  .postActions .separator {\n    background: rgba(0, 0, 0, 0.15);\n    height: 24px;\n    margin: 0 15px;\n    width: 1px; }\n\n.nextPost {\n  max-width: 260px; }\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px; }\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px; }\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px; }\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important; }\n  .post-body > p:first-of-type:first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px; }\n  .post-body ol, .post-body ul, .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58; } }\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px; }\n  .author a {\n    color: rgba(0, 0, 0, 0.8); }\n    .author a:hover {\n      color: rgba(0, 0, 0, 0.6); }\n  .author-wrap {\n    z-index: 2; }\n  .author-avatar {\n    height: 80px;\n    margin-right: 10px;\n    width: 80px; }\n  .author-meta span {\n    display: inline-block;\n    font-size: 17px;\n    font-style: italic;\n    margin: 0 25px 16px 0;\n    opacity: .8;\n    word-wrap: break-word; }\n  .author-name {\n    color: rgba(0, 0, 0, 0.8); }\n  .author-bio {\n    max-width: 600px; }\n  .author-follow a {\n    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.5);\n    cursor: pointer;\n    display: inline-block;\n    height: 40px;\n    line-height: 40px;\n    margin: 0 10px;\n    padding: 0 16px;\n    text-shadow: none; }\n    .author-follow a:hover {\n      box-shadow: inset 0 0 0 2px #fff; }\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33); }\n  .author.has--image .author-link:hover {\n    opacity: 1 !important; }\n  .author.has--image a,\n  .author.has--image .author-name {\n    color: #fff; }\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block; } }\n\n.search {\n  background-color: #fff;\n  display: none;\n  height: 100%;\n  padding: 0 20px 0;\n  position: fixed !important;\n  z-index: 9999; }\n  .search-header {\n    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);\n    height: 50px;\n    margin: 0 -20px 30px;\n    padding: 0 20px; }\n  .search-form {\n    max-width: 680px; }\n    .search-form::before {\n      background: #eee;\n      bottom: 0;\n      content: '';\n      display: block;\n      height: 2px;\n      left: 0;\n      position: absolute;\n      width: 100%;\n      z-index: 1; }\n    .search-form input {\n      border: none;\n      display: block;\n      line-height: 40px;\n      padding-bottom: 8px; }\n      .search-form input:focus {\n        outline: 0; }\n  .search-results {\n    flex: 1;\n    height: 100%;\n    max-width: 680px;\n    overflow: auto; }\n    .search-results a {\n      border-bottom: 1px solid #eee;\n      padding: 12px 0; }\n      .search-results a:hover {\n        color: rgba(0, 0, 0, 0.44); }\n\nbody.is-search {\n  overflow: hidden; }\n  body.is-search .search {\n    display: flex;\n    flex-direction: column; }\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px; }\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0; }\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00; }\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed; }\n\n.sidebar-post--title {\n  line-height: 1.1; }\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px; }\n  .sidebar-post--link:hover .sidebar-border {\n    background-color: #e5eff5; }\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: .4s;\n  will-change: transform;\n  z-index: 99; }\n  .sideNav-menu a {\n    padding: 10px 20px; }\n  .sideNav-wrap {\n    background: #eee;\n    overflow: auto;\n    padding: 20px 0;\n    top: 50px; }\n  .sideNav-section {\n    border-bottom: solid 1px #ddd;\n    margin-bottom: 8px;\n    padding-bottom: 8px; }\n  .sideNav-follow {\n    border-top: 1px solid #ddd;\n    margin: 15px 0; }\n    .sideNav-follow a {\n      color: #fff;\n      display: inline-block;\n      height: 36px;\n      line-height: 20px;\n      margin: 0 5px 5px 0;\n      min-width: 36px;\n      padding: 8px;\n      text-align: center;\n      vertical-align: middle; }\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdHlsZXMvbWFpbi5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX3ZhcmlhYmxlcy5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX21peGlucy5zY3NzIiwibm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIm5vZGVfbW9kdWxlcy9wcmlzbWpzL3RoZW1lcy9wcmlzbS5jc3MiLCJzcmMvc3R5bGVzL2xpYi9fem9vbS5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX2dsb2JhbC5zY3NzIiwic3JjL3N0eWxlcy9jb21tb24vX3R5cG9ncmFwaHkuc2NzcyIsInNyYy9zdHlsZXMvY29tbW9uL190eXBvZ3JhcGh5LnNjc3MiLCJzcmMvc3R5bGVzL2NvbW1vbi9fdXRpbGl0aWVzLnNjc3MiLCJzcmMvc3R5bGVzL2NvbXBvbmVudHMvX2dyaWQuc2NzcyIsInNyYy9zdHlsZXMvY29tcG9uZW50cy9fZm9ybS5zY3NzIiwic3JjL3N0eWxlcy9jb21wb25lbnRzL19pY29ucy5zY3NzIiwic3JjL3N0eWxlcy9jb21wb25lbnRzL19hbmltYXRlZC5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19oZWFkZXIuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fZW50cnkuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9faG9tZXBhZ2Uuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fcG9zdC5zY3NzIiwic3JjL3N0eWxlcy9sYXlvdXRzL19hdXRob3Iuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fc2VhcmNoLnNjc3MiLCJzcmMvc3R5bGVzL2xheW91dHMvX3NpZGViYXIuc2NzcyIsInNyYy9zdHlsZXMvbGF5b3V0cy9fc2lkZW5hdi5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcblxuLy8gTWl4aW5zICYgVmFyaWFibGVzXG5AaW1wb3J0IFwiY29tbW9uL3ZhcmlhYmxlc1wiO1xuQGltcG9ydCBcImNvbW1vbi9taXhpbnNcIjtcblxuLy8gSW1wb3J0IG5wbSBkZXBlbmRlbmNpZXNcbkBpbXBvcnQgXCJ+bm9ybWFsaXplLmNzcy9ub3JtYWxpemVcIjtcbkBpbXBvcnQgXCJ+cHJpc21qcy90aGVtZXMvcHJpc21cIjtcblxuLy8gaW1wb3J0IGxpYlxuQGltcG9ydCBcImxpYi96b29tXCI7XG5cbi8vIGNvbW1vblxuQGltcG9ydCBcImNvbW1vbi9nbG9iYWxcIjtcbkBpbXBvcnQgXCJjb21tb24vdHlwb2dyYXBoeVwiO1xuQGltcG9ydCBcImNvbW1vbi90eXBvZ3JhcGh5XCI7XG5AaW1wb3J0IFwiY29tbW9uL3V0aWxpdGllc1wiO1xuXG4vLyBjb21wb25lbnRzXG5AaW1wb3J0IFwiY29tcG9uZW50cy9ncmlkXCI7XG5AaW1wb3J0IFwiY29tcG9uZW50cy9mb3JtXCI7XG5AaW1wb3J0IFwiY29tcG9uZW50cy9pY29uc1wiO1xuQGltcG9ydCBcImNvbXBvbmVudHMvYW5pbWF0ZWRcIjtcblxuLy9sYXlvdXRzXG5AaW1wb3J0IFwibGF5b3V0cy9oZWFkZXJcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL2VudHJ5XCI7XG5AaW1wb3J0IFwibGF5b3V0cy9ob21lcGFnZVwiO1xuQGltcG9ydCBcImxheW91dHMvcG9zdFwiO1xuQGltcG9ydCBcImxheW91dHMvYXV0aG9yXCI7XG5AaW1wb3J0IFwibGF5b3V0cy9zZWFyY2hcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL3NpZGViYXJcIjtcbkBpbXBvcnQgXCJsYXlvdXRzL3NpZGVuYXZcIjtcbiIsIi8vIDEuIENvbG9yc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuJHByaW1hcnktY29sb3I6ICMwMEEwMzQ7XHJcbiRwcmltYXJ5LWNvbG9yLWhvdmVyOiAjMDBhYjZiO1xyXG5cclxuLy8gJHByaW1hcnktY29sb3I6ICMzMzY2OGM7XHJcbiRwcmltYXJ5LWNvbG9yLWRhcms6ICAgIzE5NzZkMjtcclxuXHJcbiRwcmltYXJ5LXRleHQtY29sb3I6ICAgcmdiYSgwLCAwLCAwLCAuOCk7XHJcblxyXG5cclxuLy8gJHByaW1hcnktY29sb3ItbGlnaHQ6XHJcbi8vICRwcmltYXJ5LWNvbG9yLXRleHQ6XHJcbi8vICRhY2NlbnQtY29sb3I6XHJcbi8vICRwcmltYXJ5LXRleHQtY29sb3I6XHJcbi8vICRzZWNvbmRhcnktdGV4dC1jb2xvcjpcclxuLy8gJGRpdmlkZXItY29sb3I6XHJcblxyXG4vLyBzb2NpYWwgY29sb3JzXHJcbiRzb2NpYWwtY29sb3JzOiAoXHJcbiAgZmFjZWJvb2s6ICAgIzNiNTk5OCxcclxuICB0d2l0dGVyOiAgICAjNTVhY2VlLFxyXG4gIGdvb2dsZTogICAgICNkZDRiMzksXHJcbiAgaW5zdGFncmFtOiAgIzMwNjA4OCxcclxuICB5b3V0dWJlOiAgICAjZTUyZDI3LFxyXG4gIGdpdGh1YjogICAgICM1NTUsXHJcbiAgbGlua2VkaW46ICAgIzAwN2JiNixcclxuICBzcG90aWZ5OiAgICAjMmViZDU5LFxyXG4gIGNvZGVwZW46ICAgICMyMjIsXHJcbiAgYmVoYW5jZTogICAgIzEzMTQxOCxcclxuICBkcmliYmJsZTogICAjZWE0Yzg5LFxyXG4gIGZsaWNrcjogICAgICMwMDYzZGMsXHJcbiAgcmVkZGl0OiAgICAgI2ZmNDUwMCxcclxuICBwb2NrZXQ6ICAgICAjZjUwMDU3LFxyXG4gIHBpbnRlcmVzdDogICNiZDA4MWMsXHJcbiAgd2hhdHNhcHA6ICAgIzY0ZDQ0OCxcclxuKTtcclxuXHJcbi8vIDIuIEZvbnRzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4kcHJpbWFyeS1mb250OiAgICAnU291cmNlIFNhbnMgUHJvJywgc2Fucy1zZXJpZjsgLy8gZm9udCBkZWZhdWx0IHBhZ2UgYW5kIHRpdGxlc1xyXG4kc2VjdW5kYXJ5LWZvbnQ6ICAnRHJvaWQgU2VyaWYnLCBzZXJpZjsgLy8gZm9udCBmb3IgY29udGVudFxyXG4kY29kZS1mb250OiAgICAgICAnU291cmNlIENvZGUgUHJvJywgbW9ub3NwYWNlOyAvLyBmb250IGZvciBjb2RlIGFuZCBwcmVcclxuXHJcbi8vIDMuIFR5cG9ncmFwaHlcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiRzcGFjZXI6ICAgICAgICAgIDE2cHg7XHJcbiRsaW5lLWhlaWdodDogICAgIDEuNTtcclxuXHJcbiRmb250LXNpemUtcm9vdDogIDE2cHg7XHJcblxyXG4kZm9udC1zaXplLWJhc2U6ICAxOHB4O1xyXG4kZm9udC1zaXplLWxnOiAgICAzMnB4O1xyXG4kZm9udC1zaXplLXNtOiAgICAuODc1cmVtOyAvLzE0cHhcclxuJGZvbnQtc2l6ZS14czogICAgLjgxMjU7IC8vMTNweFxyXG5cclxuJGZvbnQtc2l6ZS1oMTogICAgMi4yNXJlbTtcclxuJGZvbnQtc2l6ZS1oMjogICAgMS44NzVyZW07XHJcbiRmb250LXNpemUtaDM6ICAgIDEuNTYyNXJlbTtcclxuJGZvbnQtc2l6ZS1oNDogICAgMS4zNzVyZW07XHJcbiRmb250LXNpemUtaDU6ICAgIDEuMTI1cmVtO1xyXG4kZm9udC1zaXplLWg2OiAgICAxcmVtO1xyXG5cclxuXHJcbiRoZWFkaW5ncy1tYXJnaW4tYm90dG9tOiAgICgkc3BhY2VyIC8gMik7XHJcbiRoZWFkaW5ncy1mb250LWZhbWlseTogICAgICRwcmltYXJ5LWZvbnQ7XHJcbiRoZWFkaW5ncy1mb250LXdlaWdodDogICAgIDYwMDtcclxuJGhlYWRpbmdzLWxpbmUtaGVpZ2h0OiAgICAgMS4xO1xyXG4kaGVhZGluZ3MtY29sb3I6ICAgICAgICAgICBpbmhlcml0O1xyXG5cclxuJGZvbnQtd2VpZ2h0OiAgICAgICAgICAgICAgNjAwO1xyXG5cclxuJGJsb2NrcXVvdGUtZm9udC1zaXplOiAgICAgMS4xMjVyZW07XHJcblxyXG4vLyBDb250YWluZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiRncmlkLWd1dHRlci13aWR0aDogICAgICAgIDI0cHg7XHJcblxyXG4kY29udGFpbmVyLXNtOiAgICAgICAgICAgICA1NzZweDtcclxuJGNvbnRhaW5lci1tZDogICAgICAgICAgICAgNzY3cHg7XHJcbiRjb250YWluZXItbGc6ICAgICAgICAgICAgIDk3MHB4O1xyXG4kY29udGFpbmVyLXhsOiAgICAgICAgICAgICAxMjAwcHg7XHJcblxyXG4vLyBIZWFkZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuJGhlYWRlci1jb2xvcjogI0JCRjFCOTtcclxuJGhlYWRlci1jb2xvci1ob3ZlcjogI0VFRkZFQTtcclxuJGhlYWRlci1oZWlnaHQtbW9iaWxlOiA1MHB4O1xyXG5cclxuLy8gMy4gTWVkaWEgUXVlcnkgUmFuZ2VzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4kbnVtLWNvbHM6IDEyO1xyXG4kZ3V0dGVyLXdpZHRoOiAyNHB4O1xyXG4kZWxlbWVudC10b3AtbWFyZ2luOiAkZ3V0dGVyLXdpZHRoIC8gMztcclxuJGVsZW1lbnQtYm90dG9tLW1hcmdpbjogKCRndXR0ZXItd2lkdGggKiAyKSAvIDM7XHJcblxyXG4vLyAzLiBNZWRpYSBRdWVyeSBSYW5nZXNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiRzbTogICAgICAgICAgICA2NDBweDtcclxuJG1kOiAgICAgICAgICAgIDc2NnB4O1xyXG4kbGc6ICAgICAgICAgICAgMTAwMHB4O1xyXG4keGw6ICAgICAgICAgICAgMTIzMHB4O1xyXG5cclxuJHNtLWFuZC11cDogICAgIFwib25seSBzY3JlZW4gYW5kIChtaW4td2lkdGggOiAjeyRzbX0pXCI7XHJcbiRtZC1hbmQtdXA6ICAgICBcIm9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoIDogI3skbWR9KVwiO1xyXG4kbGctYW5kLXVwOiAgICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aCA6ICN7JGxnfSlcIjtcclxuJHhsLWFuZC11cDogICAgIFwib25seSBzY3JlZW4gYW5kIChtaW4td2lkdGggOiAjeyR4bH0pXCI7XHJcblxyXG4kc20tYW5kLWRvd246ICAgXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6ICN7JHNtfSlcIjtcclxuJG1kLWFuZC1kb3duOiAgIFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGggOiAjeyRtZH0pXCI7XHJcbiRsZy1hbmQtZG93bjogICBcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogI3skbGd9KVwiO1xyXG5cclxuXHJcbi8vIENvZGUgQ29sb3JcclxuJGNvZGUtYmctY29sb3I6ICAgI2Y3ZjdmNztcclxuJGZvbnQtc2l6ZS1jb2RlOiAgMTZweDtcclxuJGNvZGUtY29sb3I6ICAgICAgI2M3MjU0ZTtcclxuJHByZS1jb2RlLWNvbG9yOiAgIzM3NDc0ZjtcclxuXHJcbi8vIGljb25zXHJcblxyXG4kaS1jb2RlOiBcIlxcZjEyMVwiO1xyXG4kaS13YXJuaW5nOiBcIlxcZTAwMlwiO1xyXG4kaS1jaGVjazogXCJcXGU4NmNcIjtcclxuJGktc3RhcjogXCJcXGU4MzhcIjtcclxuIiwiJWxpbmsge1xuICBjb2xvcjogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbiVsaW5rLS1hY2NlbnQge1xuICBjb2xvcjogJHByaW1hcnktY29sb3I7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgJjpob3ZlciB7Y29sb3I6ICRwcmltYXJ5LWNvbG9yLWhvdmVyO31cbn1cblxuJWNvbnRlbnQtYWJzb2x1dGUtYm90dG9tIHtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBtYXJnaW46IDMwcHg7XG4gIG1heC13aWR0aDogNjAwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMjtcbn1cblxuJXUtYWJzb2x1dGUwIHtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG59XG5cbiV1LXRleHQtY29sb3ItZGFya2VyIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjgpICFpbXBvcnRhbnQ7XG4gIGZpbGw6IHJnYmEoMCwgMCwgMCwgLjgpICFpbXBvcnRhbnQ7XG59XG5cbiVmb250cy1pY29ucyB7XG4gIC8qIHVzZSAhaW1wb3J0YW50IHRvIHByZXZlbnQgaXNzdWVzIHdpdGggYnJvd3NlciBleHRlbnNpb25zIHRoYXQgY2hhbmdlIGZvbnRzICovXG4gIGZvbnQtZmFtaWx5OiAnc2ltcGx5JyAhaW1wb3J0YW50O1xuICBzcGVhazogbm9uZTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXZhcmlhbnQ6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuXG4gIC8qIEJldHRlciBGb250IFJlbmRlcmluZyA9PT09PT09PT09PSAqL1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cbiIsIi8qISBub3JtYWxpemUuY3NzIHY2LjAuMCB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cblxuLyogRG9jdW1lbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpblxuICogICAgSUUgb24gV2luZG93cyBQaG9uZSBhbmQgaW4gaU9TLlxuICovXG5cbmh0bWwge1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cbn1cblxuLyogU2VjdGlvbnNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKi9cblxuYXJ0aWNsZSxcbmFzaWRlLFxuZm9vdGVyLFxuaGVhZGVyLFxubmF2LFxuc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXG4gKi9cblxuaDEge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcbn1cblxuLyogR3JvdXBpbmcgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFLlxuICovXG5cbmZpZ2NhcHRpb24sXG5maWd1cmUsXG5tYWluIHsgLyogMSAqL1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgbWFyZ2luIGluIElFIDguXG4gKi9cblxuZmlndXJlIHtcbiAgbWFyZ2luOiAxZW0gNDBweDtcbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXG4gKi9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xuICBoZWlnaHQ6IDA7IC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnByZSB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXG4gKiAyLiBSZW1vdmUgZ2FwcyBpbiBsaW5rcyB1bmRlcmxpbmUgaW4gaU9TIDgrIGFuZCBTYWZhcmkgOCsuXG4gKi9cblxuYSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyAvKiAxICovXG4gIC13ZWJraXQtdGV4dC1kZWNvcmF0aW9uLXNraXA6IG9iamVjdHM7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LSBhbmQgRmlyZWZveCAzOS0uXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxuICovXG5cbmFiYnJbdGl0bGVdIHtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBQcmV2ZW50IHRoZSBkdXBsaWNhdGUgYXBwbGljYXRpb24gb2YgYGJvbGRlcmAgYnkgdGhlIG5leHQgcnVsZSBpbiBTYWZhcmkgNi5cbiAqL1xuXG5iLFxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5iLFxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmNvZGUsXG5rYmQsXG5zYW1wIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc3R5bGUgaW4gQW5kcm9pZCA0LjMtLlxuICovXG5cbmRmbiB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgYmFja2dyb3VuZCBhbmQgY29sb3IgaW4gSUUgOS0uXG4gKi9cblxubWFyayB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjA7XG4gIGNvbG9yOiAjMDAwO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnNtYWxsIHtcbiAgZm9udC1zaXplOiA4MCU7XG59XG5cbi8qKlxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXG4gKiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3ViLFxuc3VwIHtcbiAgZm9udC1zaXplOiA3NSU7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuc3ViIHtcbiAgYm90dG9tOiAtMC4yNWVtO1xufVxuXG5zdXAge1xuICB0b3A6IC0wLjVlbTtcbn1cblxuLyogRW1iZWRkZWQgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cbiAqL1xuXG5hdWRpbyxcbnZpZGVvIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGlPUyA0LTcuXG4gKi9cblxuYXVkaW86bm90KFtjb250cm9sc10pIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgaGVpZ2h0OiAwO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAtLlxuICovXG5cbmltZyB7XG4gIGJvcmRlci1zdHlsZTogbm9uZTtcbn1cblxuLyoqXG4gKiBIaWRlIHRoZSBvdmVyZmxvdyBpbiBJRS5cbiAqL1xuXG5zdmc6bm90KDpyb290KSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi8qIEZvcm1zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCxcbm9wdGdyb3VwLFxuc2VsZWN0LFxudGV4dGFyZWEge1xuICBtYXJnaW46IDA7XG59XG5cbi8qKlxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxuICovXG5cbmJ1dHRvbixcbmlucHV0IHsgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b24sXG5zZWxlY3QgeyAvKiAxICovXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xufVxuXG4vKipcbiAqIDEuIFByZXZlbnQgYSBXZWJLaXQgYnVnIHdoZXJlICgyKSBkZXN0cm95cyBuYXRpdmUgYGF1ZGlvYCBhbmQgYHZpZGVvYFxuICogICAgY29udHJvbHMgaW4gQW5kcm9pZCA0LlxuICogMi4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5odG1sIFt0eXBlPVwiYnV0dG9uXCJdLCAvKiAxICovXG5bdHlwZT1cInJlc2V0XCJdLFxuW3R5cGU9XCJzdWJtaXRcIl0ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMiAqL1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9XCJidXR0b25cIl06Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cInJlc2V0XCJdOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9XCJzdWJtaXRcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxuICovXG5cbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcblt0eXBlPVwiYnV0dG9uXCJdOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJyZXNldFwiXTotbW96LWZvY3VzcmluZyxcblt0eXBlPVwic3VibWl0XCJdOi1tb3otZm9jdXNyaW5nIHtcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5sZWdlbmQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAzICovXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cbn1cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXG4gKi9cblxucHJvZ3Jlc3Mge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IC8qIDEgKi9cbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRS5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLS5cbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC0uXG4gKi9cblxuW3R5cGU9XCJjaGVja2JveFwiXSxcblt0eXBlPVwicmFkaW9cIl0ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5bdHlwZT1cIm51bWJlclwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgYW5kIGNhbmNlbCBidXR0b25zIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxuW3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cbiAqL1xuXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xufVxuXG4vKiBJbnRlcmFjdGl2ZVxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUsIGFuZCBGaXJlZm94LlxuICovXG5cbmRldGFpbHMsIC8qIDEgKi9cbm1lbnUge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdW1tYXJ5IHtcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xufVxuXG4vKiBTY3JpcHRpbmdcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXG4gKi9cblxuY2FudmFzIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFLlxuICovXG5cbnRlbXBsYXRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLyogSGlkZGVuXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLS5cbiAqL1xuXG5baGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iLCIvKipcbiAqIHByaXNtLmpzIGRlZmF1bHQgdGhlbWUgZm9yIEphdmFTY3JpcHQsIENTUyBhbmQgSFRNTFxuICogQmFzZWQgb24gZGFiYmxldCAoaHR0cDovL2RhYmJsZXQuY29tKVxuICogQGF1dGhvciBMZWEgVmVyb3VcbiAqL1xuXG5jb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSxcbnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0ge1xuXHRjb2xvcjogYmxhY2s7XG5cdGJhY2tncm91bmQ6IG5vbmU7XG5cdHRleHQtc2hhZG93OiAwIDFweCB3aGl0ZTtcblx0Zm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sICdBbmRhbGUgTW9ubycsICdVYnVudHUgTW9ubycsIG1vbm9zcGFjZTtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0d2hpdGUtc3BhY2U6IHByZTtcblx0d29yZC1zcGFjaW5nOiBub3JtYWw7XG5cdHdvcmQtYnJlYWs6IG5vcm1hbDtcblx0d29yZC13cmFwOiBub3JtYWw7XG5cdGxpbmUtaGVpZ2h0OiAxLjU7XG5cblx0LW1vei10YWItc2l6ZTogNDtcblx0LW8tdGFiLXNpemU6IDQ7XG5cdHRhYi1zaXplOiA0O1xuXG5cdC13ZWJraXQtaHlwaGVuczogbm9uZTtcblx0LW1vei1oeXBoZW5zOiBub25lO1xuXHQtbXMtaHlwaGVuczogbm9uZTtcblx0aHlwaGVuczogbm9uZTtcbn1cblxucHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTo6LW1vei1zZWxlY3Rpb24sIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjotbW96LXNlbGVjdGlvbixcbmNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOjotbW96LXNlbGVjdGlvbiwgY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjotbW96LXNlbGVjdGlvbiB7XG5cdHRleHQtc2hhZG93OiBub25lO1xuXHRiYWNrZ3JvdW5kOiAjYjNkNGZjO1xufVxuXG5wcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdOjpzZWxlY3Rpb24sIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gOjpzZWxlY3Rpb24sXG5jb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXTo6c2VsZWN0aW9uLCBjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSA6OnNlbGVjdGlvbiB7XG5cdHRleHQtc2hhZG93OiBub25lO1xuXHRiYWNrZ3JvdW5kOiAjYjNkNGZjO1xufVxuXG5AbWVkaWEgcHJpbnQge1xuXHRjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSxcblx0cHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7XG5cdFx0dGV4dC1zaGFkb3c6IG5vbmU7XG5cdH1cbn1cblxuLyogQ29kZSBibG9ja3MgKi9cbnByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0ge1xuXHRwYWRkaW5nOiAxZW07XG5cdG1hcmdpbjogLjVlbSAwO1xuXHRvdmVyZmxvdzogYXV0bztcbn1cblxuOm5vdChwcmUpID4gY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sXG5wcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0YmFja2dyb3VuZDogI2Y1ZjJmMDtcbn1cblxuLyogSW5saW5lIGNvZGUgKi9cbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0cGFkZGluZzogLjFlbTtcblx0Ym9yZGVyLXJhZGl1czogLjNlbTtcblx0d2hpdGUtc3BhY2U6IG5vcm1hbDtcbn1cblxuLnRva2VuLmNvbW1lbnQsXG4udG9rZW4ucHJvbG9nLFxuLnRva2VuLmRvY3R5cGUsXG4udG9rZW4uY2RhdGEge1xuXHRjb2xvcjogc2xhdGVncmF5O1xufVxuXG4udG9rZW4ucHVuY3R1YXRpb24ge1xuXHRjb2xvcjogIzk5OTtcbn1cblxuLm5hbWVzcGFjZSB7XG5cdG9wYWNpdHk6IC43O1xufVxuXG4udG9rZW4ucHJvcGVydHksXG4udG9rZW4udGFnLFxuLnRva2VuLmJvb2xlYW4sXG4udG9rZW4ubnVtYmVyLFxuLnRva2VuLmNvbnN0YW50LFxuLnRva2VuLnN5bWJvbCxcbi50b2tlbi5kZWxldGVkIHtcblx0Y29sb3I6ICM5MDU7XG59XG5cbi50b2tlbi5zZWxlY3Rvcixcbi50b2tlbi5hdHRyLW5hbWUsXG4udG9rZW4uc3RyaW5nLFxuLnRva2VuLmNoYXIsXG4udG9rZW4uYnVpbHRpbixcbi50b2tlbi5pbnNlcnRlZCB7XG5cdGNvbG9yOiAjNjkwO1xufVxuXG4udG9rZW4ub3BlcmF0b3IsXG4udG9rZW4uZW50aXR5LFxuLnRva2VuLnVybCxcbi5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZyxcbi5zdHlsZSAudG9rZW4uc3RyaW5nIHtcblx0Y29sb3I6ICNhNjdmNTk7XG5cdGJhY2tncm91bmQ6IGhzbGEoMCwgMCUsIDEwMCUsIC41KTtcbn1cblxuLnRva2VuLmF0cnVsZSxcbi50b2tlbi5hdHRyLXZhbHVlLFxuLnRva2VuLmtleXdvcmQge1xuXHRjb2xvcjogIzA3YTtcbn1cblxuLnRva2VuLmZ1bmN0aW9uIHtcblx0Y29sb3I6ICNERDRBNjg7XG59XG5cbi50b2tlbi5yZWdleCxcbi50b2tlbi5pbXBvcnRhbnQsXG4udG9rZW4udmFyaWFibGUge1xuXHRjb2xvcjogI2U5MDtcbn1cblxuLnRva2VuLmltcG9ydGFudCxcbi50b2tlbi5ib2xkIHtcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4udG9rZW4uaXRhbGljIHtcblx0Zm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4udG9rZW4uZW50aXR5IHtcblx0Y3Vyc29yOiBoZWxwO1xufVxuIiwiaW1nW2RhdGEtYWN0aW9uPVwiem9vbVwiXSB7XHJcbiAgY3Vyc29yOiB6b29tLWluO1xyXG59XHJcbi56b29tLWltZyxcclxuLnpvb20taW1nLXdyYXAge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB6LWluZGV4OiA2NjY7XHJcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbiAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXM7XHJcbn1cclxuaW1nLnpvb20taW1nIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgY3Vyc29yOiAtd2Via2l0LXpvb20tb3V0O1xyXG4gIGN1cnNvcjogLW1vei16b29tLW91dDtcclxufVxyXG4uem9vbS1vdmVybGF5IHtcclxuICB6LWluZGV4OiA0MjA7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gIGZpbHRlcjogXCJhbHBoYShvcGFjaXR5PTApXCI7XHJcbiAgb3BhY2l0eTogMDtcclxuICAtd2Via2l0LXRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxuICAgICAgIC1vLXRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxuICAgICAgICAgIHRyYW5zaXRpb246ICAgICAgb3BhY2l0eSAzMDBtcztcclxufVxyXG4uem9vbS1vdmVybGF5LW9wZW4gLnpvb20tb3ZlcmxheSB7XHJcbiAgZmlsdGVyOiBcImFscGhhKG9wYWNpdHk9MTAwKVwiO1xyXG4gIG9wYWNpdHk6IDE7XHJcbn1cclxuLnpvb20tb3ZlcmxheS1vcGVuLFxyXG4uem9vbS1vdmVybGF5LXRyYW5zaXRpb25pbmcge1xyXG4gIGN1cnNvcjogZGVmYXVsdDtcclxufVxyXG4iLCJcbiosICo6YmVmb3JlLCAqOmFmdGVyIHtcbiAgYm94LXNpemluZzogaW5oZXJpdDtcbn1cblxuYSB7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cbiAgJjphY3RpdmUsXG4gICY6aG92ZXIge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cbn1cblxuYmxvY2txdW90ZSB7XG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgcmdiYSgwLDAsMCwuOCk7XG4gIGZvbnQtZmFtaWx5OiAkc2VjdW5kYXJ5LWZvbnQ7XG4gIGZvbnQtc2l6ZTogMjFweDtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsZXR0ZXItc3BhY2luZzogLS4wMDNlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNTg7XG4gIG1hcmdpbi1sZWZ0OiAtMjNweDtcbiAgcGFkZGluZy1ib3R0b206IDJweDtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xufVxuXG5ib2R5IHtcbiAgY29sb3I6ICRwcmltYXJ5LXRleHQtY29sb3I7XG4gIGZvbnQtZmFtaWx5OiAkcHJpbWFyeS1mb250O1xuICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsZXR0ZXItc3BhY2luZzogMDtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG59XG5cbi8vRGVmYXVsdCBzdHlsZXNcbmh0bWwge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LXNpemU6ICRmb250LXNpemUtcm9vdDtcbn1cblxuZmlndXJlIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vLyBDb2RlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxua2JkLCBzYW1wLCBjb2RlIHtcbiAgYmFja2dyb3VuZDogJGNvZGUtYmctY29sb3I7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY29sb3I6ICRjb2RlLWNvbG9yO1xuICBmb250LWZhbWlseTogJGNvZGUtZm9udCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6ICRmb250LXNpemUtY29kZTtcbiAgcGFkZGluZzogNHB4IDZweDtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG5wcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29kZS1iZy1jb2xvciAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtZmFtaWx5OiAkY29kZS1mb250ICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1jb2RlO1xuICBtYXJnaW4tdG9wOiAzMHB4ICFpbXBvcnRhbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDFyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd29yZC13cmFwOiBub3JtYWw7XG5cbiAgY29kZSB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgY29sb3I6ICRwcmUtY29kZS1jb2xvcjtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHRleHQtc2hhZG93OiAwIDFweCAjZmZmO1xuICB9XG59XG5cblxuY29kZVtjbGFzcyo9bGFuZ3VhZ2UtXSxcbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXSB7XG4gIGNvbG9yOiAkcHJlLWNvZGUtY29sb3I7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG5cbiAgLnRva2VuLmNvbW1lbnQgeyBvcGFjaXR5OiAuODsgfVxuXG59XG5cblxuLy8gaHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5ociB7XG4gIGJvcmRlcjogMDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogNTBweCBhdXRvO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XG4gICAgY29udGVudDogJy4uLic7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtZmFtaWx5OiAkcHJpbWFyeS1mb250O1xuICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAuNmVtO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IC0yNXB4O1xuICB9XG59XG5cbmltZyB7XG4gIGhlaWdodDogYXV0bztcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB3aWR0aDogYXV0bztcblxuICAmOm5vdChbc3JjXSkge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxufVxuXG5pIHtcbiAgLy8gZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG5vbCwgdWwge1xuICBsaXN0LXN0eWxlLWltYWdlOiBub25lO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbm1hcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDIxNSwgMjUzLCAyMTEsIDEpLCByZ2JhKDIxNSwgMjUzLCAyMTEsIDEpKTtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjgpO1xufVxuXG5xIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsZXR0ZXItc3BhY2luZzogLS4wMTRlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNDg7XG4gIHBhZGRpbmctbGVmdDogNTBweDtcbiAgcGFkZGluZy10b3A6IDE1cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG5cbiAgJjpiZWZvcmUsICY6YWZ0ZXIge2Rpc3BsYXk6IG5vbmU7fVxufVxuXG5cbi8vIExpbmtzIGNvbG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmxpbmstLWFjY2VudCB7IEBleHRlbmQgJWxpbmstLWFjY2VudDsgfVxuXG4ubGluayB7IEBleHRlbmQgJWxpbms7IH1cblxuXG4vLyBBbmltYXRpb24gbWFpbiBwYWdlIGFuZCBmb290ZXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ubWFpbixcbi5mb290ZXIge3RyYW5zaXRpb246IHRyYW5zZm9ybSAuNXMgZWFzZTsgfVxuXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcbiAgLm1haW4ge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGFkZGluZy10b3A6ICRoZWFkZXItaGVpZ2h0LW1vYmlsZTtcbiAgfVxufVxuXG4vLyB3YXJuaW5nIHN1Y2Nlc3MgYW5kIE5vdGVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ud2FybmluZyB7XG4gIGJhY2tncm91bmQ6ICNmYmU5ZTc7XG4gIGNvbG9yOiAjZDUwMDAwO1xuICAmOjpiZWZvcmUge2NvbnRlbnQ6ICRpLXdhcm5pbmc7fVxufVxuXG4ubm90ZSB7XG4gIGJhY2tncm91bmQ6ICNlMWY1ZmU7XG4gIGNvbG9yOiAjMDI4OGQxO1xuICAmOjpiZWZvcmUge2NvbnRlbnQ6ICRpLXN0YXI7fVxufVxuXG4uc3VjY2VzcyB7XG4gIGJhY2tncm91bmQ6ICNlMGYyZjE7XG4gIGNvbG9yOiAjMDA4OTdiO1xuICAmOjpiZWZvcmUge2NvbG9yOiAjMDBiZmE1OyBjb250ZW50OiAkaS1jaGVjazt9XG59XG5cbi53YXJuaW5nLCAubm90ZSwgLnN1Y2Nlc3N7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDE4cHggIWltcG9ydGFudDtcbiAgbGluZS1oZWlnaHQ6IDEuNTggIWltcG9ydGFudDtcbiAgbWFyZ2luLXRvcDogMjhweDtcbiAgcGFkZGluZzogMTJweCAyNHB4IDEycHggNjBweDtcblxuICBhIHtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxuXG4gICY6OmJlZm9yZSB7XG4gICAgQGV4dGVuZCAlZm9udHMtaWNvbnM7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAtMzZweDtcbiAgICBtYXJnaW4tdG9wOiAtNXB4O1xuICB9XG59XG5cbi8vIFBhZ2UgVGFnc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi50YWcge1xuICBjb2xvcjogI2ZmZjtcbiAgbWluLWhlaWdodDogMjUwcHg7XG4gIHotaW5kZXg6IDI7XG5cbiAgJi13cmFwIHt6LWluZGV4OiAyO31cblxuICAmLm5vdC0taW1hZ2Uge1xuICAgIEBleHRlbmQgJXUtdGV4dC1jb2xvci1kYXJrZXI7XG4gICAgbWluLWhlaWdodDogYXV0bztcbiAgfVxuXG4gICYtZGVzY3JpcHRpb24ge1xuICAgIG1heC13aWR0aDogNTAwcHg7XG4gIH1cbn1cblxuXG4vLyB0b2x0aXBcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ud2l0aC10b29sdGlwIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOmFmdGVyIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC44NSk7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGNvbG9yOiAjRkZGO1xuICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS10b29sdGlwKTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbGVmdDogNTAlO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI1O1xuICAgIG1pbi13aWR0aDogMTMwcHg7XG4gICAgb3BhY2l0eTogMDtcbiAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgdG9wOiAtMzBweDtcbiAgICB3aWxsLWNoYW5nZTogb3BhY2l0eSwgdHJhbnNmb3JtO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cblxuICAmOmhvdmVyOmFmdGVyIHtcbiAgICBhbmltYXRpb246IHRvb2x0aXAgLjFzIGVhc2Utb3V0IGJvdGg7XG4gIH1cbn1cblxuLy8gRm9vdGVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmZvb3RlciB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XG5cbiAgYSB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgICY6aG92ZXIge2NvbG9yOiByZ2JhKDAsIDAsIDAsIC44KTt9XG4gIH1cbn1cblxuLy8gRXJyb3IgcGFnZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5lcnJvclBhZ2Uge1xuICBmb250LWZhbWlseTogJ1JvYm90byBNb25vJywgbW9ub3NwYWNlO1xuICBoZWlnaHQ6IDEwMHZoO1xuICB3aWR0aDogMTAwJTtcblxuICAmLWxpbmsge1xuICAgIGxlZnQ6IC01cHg7XG4gICAgcGFkZGluZzogMjRweCA2MHB4O1xuICAgIHRvcDogLTZweDtcbiAgfVxuXG4gICYtdGV4dCB7XG4gICAgbWFyZ2luLXRvcDogNjBweDtcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gIH1cblxuICAmLXdyYXAge1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40KTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgbWluLXdpZHRoOiA2ODBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIH1cbn1cblxuXG4vLyBWaWRlbyBSZXNwb25zaXZlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnZpZGVvLXJlc3BvbnNpdmUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAwO1xuICBtYXJnaW4tdG9wOiAzMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAwIDAgNTYuMjUlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgaWZyYW1lIHtcbiAgICBib3JkZXI6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBsZWZ0OiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICB2aWRlbyB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbGVmdDogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5cblxuLy8gU29jaWFsIE1lZGlhIENvbG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuQGVhY2ggJHNvY2lhbC1uYW1lLCAkY29sb3IgaW4gJHNvY2lhbC1jb2xvcnMge1xuICAuYy0jeyRzb2NpYWwtbmFtZX0geyBjb2xvcjogJGNvbG9yICFpbXBvcnRhbnQ7fVxuICAuYmctI3skc29jaWFsLW5hbWV9IHsgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yICFpbXBvcnRhbnQ7IH1cbn1cblxuXG4vLyBGYWNlYm9vayBTYXZlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmZiU2F2ZSB7XG4gICYtZHJvcGRvd24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcbiAgICBib3R0b206IDEwMCU7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xuICAgIG1pbi13aWR0aDogMTAwcHg7XG4gICAgcGFkZGluZzogOHB4O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO1xuICAgIHotaW5kZXg6IDEwO1xuXG4gICAgJi5pcy12aXNpYmxlIHtkaXNwbGF5OiBibG9jazsgfVxuICB9XG59XG5cbi8vIFJvY2tldCBmb3IgcmV0dXJuIHRvcCBwYWdlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnJvY2tldCB7XG4gIGJvdHRvbTogNTBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICByaWdodDogMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB6LWluZGV4OiA4ODg7XG4gIHdpZHRoOiA2MHB4O1xuXG4gICY6aG92ZXIgc3ZnIHBhdGgge1xuICAgIGZpbGw6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICB9XG59XG5cbi5zdmctaWNvbiB7XG4gIHN2ZyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICB9XG59XG5cbi8vIExvYWQgTW9yZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5sb2FkTW9yZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDE1cHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMDBweDtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuXG4ubG9hZGluZ0JhciB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGhlaWdodDogMnB4O1xuICBsZWZ0OiAwO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgei1pbmRleDogODAwO1xufVxuXG4uaXMtbG9hZGluZyAubG9hZGluZ0JhciB7XG4gIGFuaW1hdGlvbi1kZWxheTogLjhzO1xuICBhbmltYXRpb246IGxvYWRpbmctYmFyIDFzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbiIsIi8vIEhlYWRpbmdzXHJcblxyXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LFxyXG4uaDEsIC5oMiwgLmgzLCAuaDQsIC5oNSwgLmg2IHtcclxuICBjb2xvcjogJGhlYWRpbmdzLWNvbG9yO1xyXG4gIGZvbnQtZmFtaWx5OiAkaGVhZGluZ3MtZm9udC1mYW1pbHk7XHJcbiAgZm9udC13ZWlnaHQ6ICRoZWFkaW5ncy1mb250LXdlaWdodDtcclxuICBsaW5lLWhlaWdodDogJGhlYWRpbmdzLWxpbmUtaGVpZ2h0O1xyXG4gIG1hcmdpbjogMDtcclxuXHJcbiAgYSB7XHJcbiAgICBjb2xvcjogaW5oZXJpdDtcclxuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gIH1cclxufVxyXG5cclxuaDEgeyBmb250LXNpemU6ICRmb250LXNpemUtaDE7IH1cclxuaDIgeyBmb250LXNpemU6ICRmb250LXNpemUtaDI7IH1cclxuaDMgeyBmb250LXNpemU6ICRmb250LXNpemUtaDM7IH1cclxuaDQgeyBmb250LXNpemU6ICRmb250LXNpemUtaDQ7IH1cclxuaDUgeyBmb250LXNpemU6ICRmb250LXNpemUtaDU7IH1cclxuaDYgeyBmb250LXNpemU6ICRmb250LXNpemUtaDY7IH1cclxuXHJcbi8vIFRoZXNlIGRlY2xhcmF0aW9ucyBhcmUga2VwdCBzZXBhcmF0ZSBmcm9tIGFuZCBwbGFjZWQgYWZ0ZXJcclxuLy8gdGhlIHByZXZpb3VzIHRhZy1iYXNlZCBkZWNsYXJhdGlvbnMgc28gdGhhdCB0aGUgY2xhc3NlcyBiZWF0IHRoZSB0YWdzIGluXHJcbi8vIHRoZSBDU1MgY2FzY2FkZSwgYW5kIHRodXMgPGgxIGNsYXNzPVwiaDJcIj4gd2lsbCBiZSBzdHlsZWQgbGlrZSBhbiBoMi5cclxuLmgxIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgxOyB9XHJcbi5oMiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMjsgfVxyXG4uaDMgeyBmb250LXNpemU6ICRmb250LXNpemUtaDM7IH1cclxuLmg0IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg0OyB9XHJcbi5oNSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNTsgfVxyXG4uaDYgeyBmb250LXNpemU6ICRmb250LXNpemUtaDY7IH1cclxuXHJcblxyXG5wIHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuIiwiLy8gSGVhZGluZ3NcclxuXHJcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsXHJcbi5oMSwgLmgyLCAuaDMsIC5oNCwgLmg1LCAuaDYge1xyXG4gIGNvbG9yOiAkaGVhZGluZ3MtY29sb3I7XHJcbiAgZm9udC1mYW1pbHk6ICRoZWFkaW5ncy1mb250LWZhbWlseTtcclxuICBmb250LXdlaWdodDogJGhlYWRpbmdzLWZvbnQtd2VpZ2h0O1xyXG4gIGxpbmUtaGVpZ2h0OiAkaGVhZGluZ3MtbGluZS1oZWlnaHQ7XHJcbiAgbWFyZ2luOiAwO1xyXG5cclxuICBhIHtcclxuICAgIGNvbG9yOiBpbmhlcml0O1xyXG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgfVxyXG59XHJcblxyXG5oMSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMTsgfVxyXG5oMiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMjsgfVxyXG5oMyB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMzsgfVxyXG5oNCB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNDsgfVxyXG5oNSB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNTsgfVxyXG5oNiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNjsgfVxyXG5cclxuLy8gVGhlc2UgZGVjbGFyYXRpb25zIGFyZSBrZXB0IHNlcGFyYXRlIGZyb20gYW5kIHBsYWNlZCBhZnRlclxyXG4vLyB0aGUgcHJldmlvdXMgdGFnLWJhc2VkIGRlY2xhcmF0aW9ucyBzbyB0aGF0IHRoZSBjbGFzc2VzIGJlYXQgdGhlIHRhZ3MgaW5cclxuLy8gdGhlIENTUyBjYXNjYWRlLCBhbmQgdGh1cyA8aDEgY2xhc3M9XCJoMlwiPiB3aWxsIGJlIHN0eWxlZCBsaWtlIGFuIGgyLlxyXG4uaDEgeyBmb250LXNpemU6ICRmb250LXNpemUtaDE7IH1cclxuLmgyIHsgZm9udC1zaXplOiAkZm9udC1zaXplLWgyOyB9XHJcbi5oMyB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oMzsgfVxyXG4uaDQgeyBmb250LXNpemU6ICRmb250LXNpemUtaDQ7IH1cclxuLmg1IHsgZm9udC1zaXplOiAkZm9udC1zaXplLWg1OyB9XHJcbi5oNiB7IGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1oNjsgfVxyXG5cclxuXHJcbnAge1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG4iLCIvLyBjb2xvclxuLnUtdGV4dENvbG9yTm9ybWFsIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAuNDQpO1xufVxuXG4udS1ob3ZlckNvbG9yTm9ybWFsOmhvdmVyIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICBmaWxsOiByZ2JhKDAsIDAsIDAsIC42KTtcbn1cblxuLy8gIGJhY2tncm91bmQgY29sb3Jcbi51LWJnQ29sb3IgeyBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjsgfVxuXG4udS1oZWFkZXJDb2xvckxpbmsgYSB7XG4gIGNvbG9yOiAkaGVhZGVyLWNvbG9yO1xuICAmLmFjdGl2ZSxcbiAgJjpob3ZlciB7IGNvbG9yOiAkaGVhZGVyLWNvbG9yLWhvdmVyOyB9XG5cbn1cblxuLnUtdGV4dENvbG9yRGFya2VyIHtAZXh0ZW5kICV1LXRleHQtY29sb3ItZGFya2VyO31cblxuLy8gUG9zaXRpb25zXG4udS1yZWxhdGl2ZSB7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuLnUtYWJzb2x1dGUgeyBwb3NpdGlvbjogYWJzb2x1dGU7IH1cbi51LWFic29sdXRlMCB7IEBleHRlbmQgJXUtYWJzb2x1dGUwO31cblxuLnUtYmxvY2sge2Rpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnR9XG5cbi8vICBCYWNrZ3JvdW5kXG4udS1iYWNrZ3JvdW5kRGFyayB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwgMCwgMCwgLjMpIDI5JSwgcmdiYSgwLCAwLCAwLCAuNikgODElKTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG4gIHotaW5kZXg6IDE7XG59XG5cbi8vIC51LWJhY2tncm91bmQtd2hpdGUgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZmVlOyB9XG4udS1iYWNrZ3JvdW5kV2hpdGUge2JhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7fVxuLnUtYmFja2dyb3VuZENvbG9yR3JheUxpZ2h0IHtiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwICFpbXBvcnRhbnQ7fVxuXG4vLyBDbGVhclxuLnUtY2xlYXIge1xuICAmOjpiZWZvcmUsXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbiAgfVxuICAmOjphZnRlciB7Y2xlYXI6IGJvdGg7fVxufVxuXG4vLyBmb250IHNpemVcbi51LWZvbnRTaXplMTMge2ZvbnQtc2l6ZTogMTNweH1cbi51LWZvbnRTaXplMTUge2ZvbnQtc2l6ZTogMTVweH1cbi51LWZvbnRTaXplMjAge2ZvbnQtc2l6ZTogMjBweH1cbi51LWZvbnRTaXplMjIge2ZvbnQtc2l6ZTogMjJweH1cbi51LWZvbnRTaXplMjgge2ZvbnQtc2l6ZTogMjhweCAhaW1wb3J0YW50O31cbi51LWZvbnRTaXplMzYge2ZvbnQtc2l6ZTogMzZweH1cbi51LWZvbnRTaXplNDAge2ZvbnQtc2l6ZTogNDBweH1cbi51LWZvbnRTaXplQmFzZSB7Zm9udC1zaXplOiAxOHB4fVxuLnUtZm9udFNpemVKdW1ibyB7Zm9udC1zaXplOiA1MHB4fVxuLnUtZm9udFNpemVMYXJnZSB7Zm9udC1zaXplOiAyNHB4ICFpbXBvcnRhbnR9XG4udS1mb250U2l6ZUxhcmdlciB7Zm9udC1zaXplOiAzMnB4fVxuLnUtZm9udFNpemVMYXJnZXN0IHtmb250LXNpemU6IDQ0cHh9XG4udS1mb250U2l6ZU1pY3JvIHtmb250LXNpemU6IDExcHh9XG4udS1mb250U2l6ZVNtYWxsIHtmb250LXNpemU6IDE2cHh9XG4udS1mb250U2l6ZVNtYWxsZXIge2ZvbnQtc2l6ZTogMTRweH1cbi51LWZvbnRTaXplU21hbGxlc3Qge2ZvbnQtc2l6ZTogMTJweH1cblxuQG1lZGlhICN7JG1kLWFuZC1kb3dufSB7XG4gIC51LW1kLWZvbnRTaXplQmFzZSB7Zm9udC1zaXplOiAxOHB4ICFpbXBvcnRhbnR9XG4gIC51LW1kLWZvbnRTaXplTGFyZ2VyIHtmb250LXNpemU6IDMycHh9XG59XG5cbi8vIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuLy8gICAudS14cy1mb250U2l6ZUJhc2Uge2ZvbnQtc2l6ZTogMThweH1cbi8vICAgLnUteHMtZm9udFNpemUxMyB7Zm9udC1zaXplOiAxM3B4fVxuLy8gICAudS14cy1mb250U2l6ZVNtYWxsZXIge2ZvbnQtc2l6ZTogMTRweH1cbi8vICAgLnUteHMtZm9udFNpemVTbWFsbCB7Zm9udC1zaXplOiAxNnB4fVxuLy8gICAudS14cy1mb250U2l6ZTIyIHtmb250LXNpemU6IDIycHh9XG4vLyAgIC51LXhzLWZvbnRTaXplTGFyZ2Uge2ZvbnQtc2l6ZTogMjRweH1cbi8vICAgLnUteHMtZm9udFNpemU0MCB7Zm9udC1zaXplOiA0MHB4fVxuLy8gICAudS14cy1mb250U2l6ZUxhcmdlciB7Zm9udC1zaXplOiAzMnB4fVxuLy8gICAudS14cy1mb250U2l6ZVNtYWxsZXN0IHtmb250LXNpemU6IDEycHh9XG4vLyB9XG5cbi8vIGZvbnQgd2VpZ2h0XG4udS1mb250V2VpZ2h0VGhpbiB7Zm9udC13ZWlnaHQ6IDMwMH1cbi51LWZvbnRXZWlnaHROb3JtYWwge2ZvbnQtd2VpZ2h0OiA0MDB9XG4udS1mb250V2VpZ2h0TWVkaXVtIHtmb250LXdlaWdodDogNTAwfVxuLnUtZm9udFdlaWdodFNlbWlib2xkIHtmb250LXdlaWdodDogNjAwfVxuLnUtZm9udFdlaWdodEJvbGQge2ZvbnQtd2VpZ2h0OiA3MDAgIWltcG9ydGFudH1cblxuLnUtdGV4dFVwcGVyY2FzZSB7dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZX1cbi51LXRleHRBbGlnbkNlbnRlciB7dGV4dC1hbGlnbjogY2VudGVyfVxuXG5cbi51LW5vV3JhcFdpdGhFbGxpcHNpcyB7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXMgIWltcG9ydGFudDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50O1xufVxuXG4vLyBNYXJnaW5cbi51LW1hcmdpbkF1dG8geyBtYXJnaW4tbGVmdDogYXV0bzsgbWFyZ2luLXJpZ2h0OiBhdXRvO31cbi51LW1hcmdpblRvcDMwIHttYXJnaW4tdG9wOiAzMHB4fVxuLnUtbWFyZ2luQm90dG9tMTUge21hcmdpbi1ib3R0b206IDE1cHh9XG4udS1tYXJnaW5Cb3R0b20yMCB7bWFyZ2luLWJvdHRvbTogMjBweCAhaW1wb3J0YW50fVxuLnUtbWFyZ2luQm90dG9tMzAge21hcmdpbi1ib3R0b206IDMwcHh9XG4udS1tYXJnaW5Cb3R0b200MCB7bWFyZ2luLWJvdHRvbTogNDBweH1cblxuLy8gcGFkZGluZ1xuLnUtcGFkZGluZzAge3BhZGRpbmc6IDAgIWltcG9ydGFudH1cbi51LXBhZGRpbmcxNSB7cGFkZGluZzogMTVweCAhaW1wb3J0YW50O31cbi51LXBhZGRpbmdCb3R0b20yIHsgcGFkZGluZy1ib3R0b206IDJweDt9XG4udS1wYWRkaW5nQm90dG9tMzAgeyBwYWRkaW5nLWJvdHRvbTogMzBweDt9XG4udS1wYWRkaW5nQm90dG9tMjAge3BhZGRpbmctYm90dG9tOiAyMHB4fVxuXG4udS1wYWRkaW5nVG9wNSB7IHBhZGRpbmctdG9wOiA1cHg7fVxuLnUtcGFkZGluZ1RvcDEwIHtwYWRkaW5nLXRvcDogMTBweDt9XG4udS1wYWRkaW5nVG9wMTUge3BhZGRpbmctdG9wOiAxNXB4O31cbi51LXBhZGRpbmdUb3AyMCB7cGFkZGluZy10b3A6IDIwcHg7fVxuLnUtcGFkZGluZ1RvcDMwIHtwYWRkaW5nLXRvcDogMzBweDt9XG5cbi51LXBhZGRpbmdCb3R0b20xNSB7cGFkZGluZy1ib3R0b206IDE1cHg7fVxuXG4udS1wYWRkaW5nUmlnaHQyMCB7cGFkZGluZy1yaWdodDogMjBweH1cbi51LXBhZGRpbmdMZWZ0MjAge3BhZGRpbmctbGVmdDogMjBweH1cblxuLnUtY29udGVudFRpdGxlIHtcbiAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC0uMDI4ZW07XG59XG5cbi8vIGxpbmUtaGVpZ2h0XG4udS1saW5lSGVpZ2h0MSB7bGluZS1oZWlnaHQ6IDE7fVxuXG4vLyBvdmVyZmxvd1xuLnUtb3ZlcmZsb3dIaWRkZW4ge292ZXJmbG93OiBoaWRkZW59XG5cbi8vIGZsb2F0XG4udS1mbG9hdFJpZ2h0IHsgZmxvYXQ6IHJpZ2h0OyB9XG4udS1mbG9hdExlZnQgeyBmbG9hdDogbGVmdDsgfVxuXG4vLyAgZmxleFxuLnUtZmxleCB7IGRpc3BsYXk6IGZsZXg7IH1cbi51LWZsZXhDZW50ZXIgeyBhbGlnbi1pdGVtczogY2VudGVyOyBkaXNwbGF5OiBmbGV4OyB9XG4udS1mbGV4MSB7IGZsZXg6IDEgMSBhdXRvOyB9XG4udS1mbGV4MCB7IGZsZXg6IDAgMCBhdXRvOyB9XG4udS1mbGV4V3JhcCB7ZmxleC13cmFwOiB3cmFwfVxuXG4udS1mbGV4Q29sdW1uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi51LWZsZXhFbmQge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4vLyBCYWNrZ3JvdW5kXG4udS1iYWNrZ3JvdW5kU2l6ZUNvdmVyIHtcbiAgYmFja2dyb3VuZC1vcmlnaW46IGJvcmRlci1ib3g7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLy8gbWF4IHdpZGh0XG4udS1jb250YWluZXIge1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG59XG4udS1tYXhXaWR0aDEwMDAgeyBtYXgtd2lkdGg6IDEwMDBweDt9XG4udS1tYXhXaWR0aDc0MCB7bWF4LXdpZHRoOiA3NDBweDt9XG4udS1tYXhXaWR0aDEwNDAgeyBtYXgtd2lkdGg6IDEwNDBweDt9XG4udS1zaXplRnVsbFdpZHRoIHt3aWR0aDogMTAwJX1cblxuLy8gYm9yZGVyXG4udS1ib3JkZXJMaWdodGVyIHsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMTUpO31cbi51LXJvdW5kIHtib3JkZXItcmFkaXVzOiA1MCV9XG4udS1ib3JkZXJSYWRpdXMyIHtib3JkZXItcmFkaXVzOiAycHh9XG5cblxuLy8gY2FyZFxuLnUtY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjA5KTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBib3gtc2hhZG93OiAwIDFweCA0cHggcmdiYSgwLCAwLCAwLCAuMDQpO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBwYWRkaW5nOiAxMHB4IDIwcHggMTVweDtcblxuICAmLS1wIHtcbiAgICBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250O1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAwNGVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU4O1xuICB9XG59XG5cbi51LWJveFNoYWRvd0JvdHRvbSB7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDJweCAtMnB4IHJnYmEoMCwgMCwgMCwgLjA1KTtcbn1cblxuLy8gaGlkZSBnbG9iYWxcbi51LWhpZGUge2Rpc3BsYXk6IG5vbmUgIWltcG9ydGFudH1cbi8vIGhpZGUgYmVmb3JlXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHsudS1oaWRlLWJlZm9yZS1tZCB7ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50fSB9XG5AbWVkaWEgI3skbGctYW5kLWRvd259IHsudS1oaWRlLWJlZm9yZS1sZyB7ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50fSB9XG5cbi8vIGhpZGUgYWZ0ZXJcbkBtZWRpYSAjeyRtZC1hbmQtdXB9IHsudS1oaWRlLWFmdGVyLW1kIHtkaXNwbGF5OiBub25lICFpbXBvcnRhbnR9IH1cbkBtZWRpYSAjeyRsZy1hbmQtdXB9IHsudS1oaWRlLWFmdGVyLWxnIHtkaXNwbGF5OiBub25lICFpbXBvcnRhbnR9IH1cbiIsIi51LXdyYXAge1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIHBhZGRpbmctbGVmdDogICgkZ3JpZC1ndXR0ZXItd2lkdGggLyAyKTtcclxuICBwYWRkaW5nLXJpZ2h0OiAoJGdyaWQtZ3V0dGVyLXdpZHRoIC8gMik7XHJcbiAgd2lkdGg6IDEwMCU7XHJcblxyXG4gIC8vIEBtZWRpYSAjeyRzbS1hbmQtdXB9e21heC13aWR0aDogJGNvbnRhaW5lci1zbTt9XHJcbiAgLy8gQG1lZGlhICN7JG1kLWFuZC11cH17bWF4LXdpZHRoOiAkY29udGFpbmVyLW1kO31cclxuICAvLyBAbWVkaWEgI3skbGctYW5kLXVwfXttYXgtd2lkdGg6ICRjb250YWluZXItbGc7fVxyXG4gIEBtZWRpYSAjeyR4bC1hbmQtdXB9IHttYXgtd2lkdGg6ICRjb250YWluZXIteGw7fVxyXG59XHJcblxyXG5cclxuQG1lZGlhICN7JGxnLWFuZC11cH0ge1xyXG4gIC5jb250ZW50IHtcclxuICAgIGZsZXg6IDEgIWltcG9ydGFudDtcclxuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gMzQwcHgpICFpbXBvcnRhbnQ7XHJcbiAgICBvcmRlcjogMTtcclxuICAgIC8vIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgfVxyXG4gIC5zaWRlYmFyIHtcclxuICAgIGZsZXg6IDAgMCAzNDBweCAhaW1wb3J0YW50O1xyXG4gICAgb3JkZXI6IDI7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLnJvdyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4OiAwIDEgYXV0bztcclxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xyXG5cclxuICBtYXJnaW4tbGVmdDogLSAkZ3V0dGVyLXdpZHRoIC8gMjtcclxuICBtYXJnaW4tcmlnaHQ6IC0gJGd1dHRlci13aWR0aCAvIDI7XHJcblxyXG4gIC5jb2wge1xyXG4gICAgZmxleDogMCAwIGF1dG87XHJcbiAgICBwYWRkaW5nLWxlZnQ6ICRndXR0ZXItd2lkdGggLyAyO1xyXG4gICAgcGFkZGluZy1yaWdodDogJGd1dHRlci13aWR0aCAvIDI7XHJcblxyXG4gICAgJGk6IDE7XHJcbiAgICBAd2hpbGUgJGkgPD0gJG51bS1jb2xzIHtcclxuICAgICAgJHBlcmM6IHVucXVvdGUoKDEwMCAvICgkbnVtLWNvbHMgLyAkaSkpICsgXCIlXCIpO1xyXG4gICAgICAmLnMjeyRpfSB7XHJcbiAgICAgICAgZmxleC1iYXNpczogJHBlcmM7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAkcGVyYztcclxuICAgICAgfVxyXG4gICAgICAkaTogJGkgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIEBtZWRpYSAjeyRtZC1hbmQtdXB9IHtcclxuICAgICAgJGk6IDE7XHJcbiAgICAgIEB3aGlsZSAkaSA8PSAkbnVtLWNvbHMge1xyXG4gICAgICAgICRwZXJjOiB1bnF1b3RlKCgxMDAgLyAoJG51bS1jb2xzIC8gJGkpKSArIFwiJVwiKTtcclxuICAgICAgICAmLm0jeyRpfSB7XHJcbiAgICAgICAgICBmbGV4LWJhc2lzOiAkcGVyYztcclxuICAgICAgICAgIG1heC13aWR0aDogJHBlcmM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRpOiAkaSArIDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBAbWVkaWEgI3skbGctYW5kLXVwfSB7XHJcbiAgICAgICRpOiAxO1xyXG4gICAgICBAd2hpbGUgJGkgPD0gJG51bS1jb2xzIHtcclxuICAgICAgICAkcGVyYzogdW5xdW90ZSgoMTAwIC8gKCRudW0tY29scyAvICRpKSkgKyBcIiVcIik7XHJcbiAgICAgICAgJi5sI3skaX0ge1xyXG4gICAgICAgICAgZmxleC1iYXNpczogJHBlcmM7XHJcbiAgICAgICAgICBtYXgtd2lkdGg6ICRwZXJjO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkaTogJGkgKyAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi5idXR0b24ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDApO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC4xNSk7XG4gIGJvcmRlci1yYWRpdXM6IDk5OWVtO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNDQpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBoZWlnaHQ6IDM3cHg7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xuICBsaW5lLWhlaWdodDogMzVweDtcbiAgcGFkZGluZzogMCAxNnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuICBpIHsgZGlzcGxheTogaW5saW5lLWJsb2NrfVxuXG4gICYtLWNocm9tZWxlc3Mge1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYm9yZGVyLXdpZHRoOiAwO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgcGFkZGluZzogMDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuXG4gICAgJjphY3RpdmUsXG4gICAgJjpob3ZlcixcbiAgICAmOmZvY3VzIHtcbiAgICAgIGJvcmRlci13aWR0aDogMDtcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICB9XG4gIH1cblxuICAmLS1sYXJnZSB7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGhlaWdodDogNDRweDtcbiAgICBsaW5lLWhlaWdodDogNDJweDtcbiAgICBwYWRkaW5nOiAwIDE4cHg7XG4gIH1cblxuICAmLS1kYXJrIHtcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcblxuICAgICY6aG92ZXIge1xuICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC44KTtcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC44KTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi5idXR0b25TZXQge1xuXG4gIC5idXR0b24tLWxhcmdlLmJ1dHRvbi0tY2hyb21lbGVzcyxcbiAgLmJ1dHRvbi0tbGFyZ2UuYnV0dG9uLS1saW5rIHtcbiAgICBoZWlnaHQ6IDQ0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDQycHg7XG4gIH1cblxuICAmPi5idXR0b24tLWNocm9tZWxlc3M6bm90KC5idXR0b24tLWNpcmNsZSkge1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG4gIH1cblxuICAmPi5idXR0b24tLWNocm9tZWxlc3MrLmJ1dHRvbi0tY2hyb21lbGVzczpub3QoLmJ1dHRvbi0tY2lyY2xlKSB7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgcGFkZGluZy1sZWZ0OiA4cHg7XG4gIH1cblxuICAmPi5idXR0b24tLWNocm9tZWxlc3M6bGFzdC1jaGlsZCB7XG4gICAgcGFkZGluZy1yaWdodDogMDtcbiAgfVxufVxuXG5cblxuXG4uYnV0dG9uLS1sYXJnZS5idXR0b24tLWNocm9tZWxlc3MsXG4uYnV0dG9uLS1sYXJnZS5idXR0b24tLWxpbmsge1xuICBwYWRkaW5nOiAwO1xufVxuXG4iLCJAZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogJ3NpbXBseSc7XHJcbiAgc3JjOiAgdXJsKCcuLi9mb250cy9zaW1wbHkuZW90P2I5dzlrNCcpO1xyXG4gIHNyYzogIHVybCgnLi4vZm9udHMvc2ltcGx5LmVvdD9iOXc5azQjaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXHJcbiAgICB1cmwoJy4uL2ZvbnRzL3NpbXBseS50dGY/Yjl3OWs0JykgZm9ybWF0KCd0cnVldHlwZScpLFxyXG4gICAgdXJsKCcuLi9mb250cy9zaW1wbHkud29mZj9iOXc5azQnKSBmb3JtYXQoJ3dvZmYnKSxcclxuICAgIHVybCgnLi4vZm9udHMvc2ltcGx5LnN2Zz9iOXc5azQjc2ltcGx5JykgZm9ybWF0KCdzdmcnKTtcclxuICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxufVxyXG5cclxuW2NsYXNzXj1cImktXCJdOjpiZWZvcmUsIFtjbGFzcyo9XCIgaS1cIl06OmJlZm9yZSB7XHJcbiAgQGV4dGVuZCAlZm9udHMtaWNvbnM7XHJcbn1cclxuXHJcblxyXG4uaS1jb21tZW50czpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlOTAwXCI7XHJcbn1cclxuLmktbG9jYXRpb246YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZThiNFwiO1xyXG59XHJcbi5pLXNhdmU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZThlNlwiO1xyXG59XHJcbi5pLXNhdmUtLWxpbmU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZThlN1wiO1xyXG59XHJcbi5pLWNoZWNrLWNpcmNsZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlODZjXCI7XHJcbn1cclxuLmktY2xvc2U6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTVjZFwiO1xyXG59XHJcbi5pLWZhdm9yaXRlOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4N2RcIjtcclxufVxyXG4uaS1zdGFyOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGU4MzhcIjtcclxufVxyXG4uaS13YXJuaW5nOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGUwMDJcIjtcclxufVxyXG4uaS1yc3M6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTBlNVwiO1xyXG59XHJcbi5pLXNlYXJjaDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlOGI2XCI7XHJcbn1cclxuLmktc2VuZDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxlMTYzXCI7XHJcbn1cclxuLmktc2hhcmU6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZTgwZFwiO1xyXG59XHJcbi5pLWxpbms6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjBjMVwiO1xyXG59XHJcbi5pLXJlZGRpdDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMjgxXCI7XHJcbn1cclxuLmktdHdpdHRlcjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMDk5XCI7XHJcbn1cclxuLmktZ2l0aHViOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYwOWJcIjtcclxufVxyXG4uaS1saW5rZWRpbjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMGUxXCI7XHJcbn1cclxuLmktY29kZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTIxXCI7XHJcbn1cclxuLmkteW91dHViZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTZhXCI7XHJcbn1cclxuLmktc3RhY2stb3ZlcmZsb3c6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjE2Y1wiO1xyXG59XHJcbi5pLWluc3RhZ3JhbTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTZkXCI7XHJcbn1cclxuLmktZmxpY2tyOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxNmVcIjtcclxufVxyXG4uaS1kcmliYmJsZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTdkXCI7XHJcbn1cclxuLmktYmVoYW5jZTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMWI0XCI7XHJcbn1cclxuLmktc3BvdGlmeTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMWJjXCI7XHJcbn1cclxuLmktY29kZXBlbjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMWNiXCI7XHJcbn1cclxuLmktZmFjZWJvb2s6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjIzMFwiO1xyXG59XHJcbi5pLXBpbnRlcmVzdDpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMjMxXCI7XHJcbn1cclxuLmktd2hhdHNhcHA6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjIzMlwiO1xyXG59XHJcbi5pLXNuYXBjaGF0OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYyYWNcIjtcclxufVxyXG4iLCIvLyBhbmltYXRlZCBHbG9iYWxcclxuLmFuaW1hdGVkIHtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xyXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XHJcblxyXG4gICYuaW5maW5pdGUge1xyXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBhbmltYXRlZCBBbGxcclxuLmJvdW5jZUluIHsgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZUluO31cclxuLmJvdW5jZUluRG93biB7IGFuaW1hdGlvbi1uYW1lOiBib3VuY2VJbkRvd247fVxyXG4ucHVsc2UgeyBhbmltYXRpb24tbmFtZTogcHVsc2U7IH1cclxuXHJcbi8vIGFsbCBrZXlmcmFtZXMgQW5pbWF0ZXNcclxuLy8gYm91bmNlSW5cclxuQGtleWZyYW1lcyBib3VuY2VJbiB7XHJcbiAgMCUsXHJcbiAgMjAlLFxyXG4gIDQwJSxcclxuICA2MCUsXHJcbiAgODAlLFxyXG4gIDEwMCUgeyBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoLjIxNSwgLjYxMCwgLjM1NSwgMSk7fVxyXG4gIDAlIHtvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHNjYWxlM2QoLjMsIC4zLCAuMyk7fVxyXG4gIDIwJSB7IHRyYW5zZm9ybTogc2NhbGUzZCgxLjEsIDEuMSwgMS4xKTt9XHJcbiAgNDAlIHsgdHJhbnNmb3JtOiBzY2FsZTNkKC45LCAuOSwgLjkpOyB9XHJcbiAgNjAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiBzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpOyB9XHJcbiAgODAlIHsgdHJhbnNmb3JtOiBzY2FsZTNkKC45NywgLjk3LCAuOTcpOyB9XHJcbiAgMTAwJSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfVxyXG59XHJcblxyXG47XHJcbi8vIGJvdW5jZUluRG93blxyXG5Aa2V5ZnJhbWVzIGJvdW5jZUluRG93biB7XHJcbiAgMCUsXHJcbiAgNjAlLFxyXG4gIDc1JSxcclxuICA5MCUsXHJcbiAgMTAwJSB7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigyMTUsIDYxMCwgMzU1LCAxKTsgfVxyXG4gIDAlIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMzAwMHB4LCAwKTsgfVxyXG4gIDYwJSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMjVweCwgMCk7fVxyXG4gIDc1JSB7dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAtMTBweCwgMCk7fVxyXG4gIDkwJSB7dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCA1cHgsIDApO31cclxuICAxMDAlIHt0cmFuc2Zvcm06IG5vbmU7fVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHB1bHNlIHtcclxuICBmcm9tIHsgdHJhbnNmb3JtOiBzY2FsZTNkKDEsIDEsIDEpO31cclxuICA1MCUge3RyYW5zZm9ybTogc2NhbGUzZCgxLjIsIDEuMiwgMS4yKTt9XHJcbiAgdG8ge3RyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTsgfVxyXG59XHJcblxyXG5cclxuQGtleWZyYW1lcyBzY3JvbGwge1xyXG4gIDAlIHtvcGFjaXR5OiAwO31cclxuICAxMCUge29wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKX1cclxuICAxMDAlIHtvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7fVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIG9wYWNpdHkge1xyXG4gIDAlIHtvcGFjaXR5OiAwO31cclxuICA1MCUge29wYWNpdHk6IDA7fVxyXG4gIDEwMCUge29wYWNpdHk6IDE7fVxyXG59XHJcblxyXG4vLyAgc3BpbiBmb3IgcGFnaW5hdGlvblxyXG5Aa2V5ZnJhbWVzIHNwaW4ge1xyXG4gIGZyb20ge3RyYW5zZm9ybTogcm90YXRlKDBkZWcpO31cclxuICB0byB7dHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTt9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgdG9vbHRpcCB7XHJcbiAgMCUge29wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDZweCk7fVxyXG4gIDEwMCUge29wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO31cclxufVxyXG5cclxuQGtleWZyYW1lcyBsb2FkaW5nLWJhciB7XHJcbiAgMCUge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSl9XHJcbiAgNDAlIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCl9XHJcbiAgNjAlIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCl9XHJcbiAgMTAwJSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpfVxyXG59XHJcbiIsIi8vIEhlYWRlclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLmhlYWRlciB7XG4gIC8vIGJhY2tncm91bmQ6ICRwcmltYXJ5LWNvbG9yO1xuICB6LWluZGV4OiA4MDtcblxuICAmLXdyYXAgeyBoZWlnaHQ6IDUwcHg7IH1cblxuICAmLWxvZ28ge1xuICAgIGhlaWdodDogMzBweDtcbiAgICBpbWcge21heC1oZWlnaHQ6IDEwMCU7IH1cbiAgfVxuXG4gICYtbG9nbyxcbiAgLmJ1dHRvbi1zZWFyY2gtLW9wZW4sXG4gIC5idXR0b24tbmF2LS10b2dnbGUge3otaW5kZXg6IDE1MDt9XG5cblxuICAvLyBoZWFkZXIgZGVzY3JpcHRpb24gaG9tZSBwYWdlXG4gICYtZGVzY3JpcHRpb24ge1xuICAgIGNvbG9yOiAkaGVhZGVyLWNvbG9yO1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBtYXgtd2lkdGg6IDc1MHB4O1xuICB9XG59XG5cbi8vIEhlYWRlciBGb2xsb3dcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4uZm9sbG93PmEge1xuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG59XG5cbi8vIEhlYWRlciBtZW51XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4ubmF2IHtcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gIHBhZGRpbmc6IDhweCAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgdWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gIH1cblxuICBsaSB7XG4gICAgZmxvYXQ6IGxlZnQ7XG5cbiAgICBhIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDIycHg7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLmJ1dHRvbi1zZWFyY2gtLW9wZW4ge1xuICBjb2xvcjogaW5oZXJpdCAhaW1wb3J0YW50O1xuICBwYWRkaW5nLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XG59XG5cblxuLy8gYnV0dG9uLW5hdlxuLmJ1dHRvbi1uYXYtLXRvZ2dsZSB7XG4gIGhlaWdodDogNDhweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjRzO1xuICB3aWR0aDogNDhweDtcblxuICBzcGFuIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaGVhZGVyLWNvbG9yO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGhlaWdodDogMnB4O1xuICAgIGxlZnQ6IDE0cHg7XG4gICAgbWFyZ2luLXRvcDogLTFweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgdHJhbnNpdGlvbjogLjRzO1xuICAgIHdpZHRoOiAyMHB4O1xuXG4gICAgJjpmaXJzdC1jaGlsZCB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC02cHgpOyB9XG4gICAgJjpsYXN0LWNoaWxkIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNnB4KTsgfVxuICB9XG59XG5cblxuYm9keS5pcy1mcm9udHBhZ2UgLmhlYWRlci13cmFwIHtoZWlnaHQ6IGF1dG87fVxuXG5cbi8vIE1lZGlhIFF1ZXJ5XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5AbWVkaWEgI3skbWQtYW5kLXVwfSB7XG4gIC5oZWFkZXIge1xuICAgICYtd3JhcCB7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICAvLyBoZWlnaHQ6IDUwcHg7XG4gICAgfVxuICAgICYtbG9nbyB7XG4gICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgfVxuXG4gICAgJi10b3Atc2VjdGlvbiB7cGFkZGluZy10b3A6IDE1cHg7fVxuICB9XG5cbiAgYm9keS5pcy1mcm9udHBhZ2Uge1xuICAgIC5oZWFkZXIge1xuICAgICAgJi13cmFwIHsgaGVpZ2h0OiAyMDBweDsgfVxuICAgICAgJi1sb2dvIHtcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICAgICAgfVxuICAgICAgJi10b3Atc2VjdGlvbiB7cGFkZGluZy10b3A6IDA7fVxuICAgIH1cblxuICAgIC5uYXYgdWwge2ZsZXg6IDEgMSBhdXRvO31cbiAgfVxuXG59XG5cblxuLy8gSGVhZGVyIG1lbnVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcblxuICAuaGVhZGVyIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG5cbiAgICAmLXdyYXAge1xuICAgICAgaGVpZ2h0OiAkaGVhZGVyLWhlaWdodC1tb2JpbGUgIWltcG9ydGFudDtcbiAgICB9XG4gIH1cblxuICAvLyBzaG93IG1lbnUgbW9iaWxlXG4gIGJvZHkuaXMtc2hvd05hdk1vYiB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIC5zaWRlTmF2IHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH1cblxuICAgIC5idXR0b24tbmF2LS10b2dnbGUge1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuXG4gICAgICBzcGFuOmZpcnN0LWNoaWxkIHsgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpIHRyYW5zbGF0ZSgwLCAwKTt9XG4gICAgICBzcGFuOm50aC1jaGlsZCgyKSB7IHRyYW5zZm9ybTogc2NhbGVYKDApO31cbiAgICAgIHNwYW46bGFzdC1jaGlsZCB7dHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKSB0cmFuc2xhdGUoMCwgMCk7fVxuICAgIH1cblxuICAgIC5oZWFkZXIgLmJ1dHRvbi1zZWFyY2gtLXRvZ2dsZSB7ZGlzcGxheTogbm9uZTt9XG4gICAgLm1haW4sIC5mb290ZXIgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTI1JSk7fVxuICB9XG5cbn1cbiIsIi8vIGVudHJ5IGJ5IGxpbmVcbi5lbnRyeSB7XG4gICYtYXV0aG9yIHtcbiAgICAvLyBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgIC8vIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG5cbiAgICAvLyBhIHsgQGV4dGVuZCAlbGluaywgJWxpbmstLWFjY2VudDt9XG4gIH1cblxuICAvLyBhdXRob3IgYXZhdGFyXG4gIC8vICYtYXZhdGFyIHsgZGlzcGxheTogdGFibGUtY2VsbDsgfVxuICAmLWF2YXRhci0taW1nIHtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIHdpZHRoOiA0MHB4O1xuXG4gICAgJi5uby1hdmF0YXIgeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4uL2ltYWdlcy9hdmF0YXIucG5nJykgIWltcG9ydGFudH1cbiAgfVxuXG4gIC8vIG5vdCBoYXMgaW1hZ2VcbiAgJi5ub3QtLWltYWdlIHtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuOCk7XG4gIH1cbn1cblxuXG4vLyBlbnRyeSBHbG9iYWxcbi5lbnRyeS51LWNhcmQge1xuICAuZW50cnktaW1hZ2Uge1xuICAgIG1heC1oZWlnaHQ6IDI0MHB4O1xuICAgIG1heC13aWR0aDogMzYwcHg7XG4gIH1cbn1cblxuLy8gRW50cnkgb3IgcG9zdCAoYXV0aG9yIGFuZCB0YWcpIHBhZ2Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIGlmIHBvc3QgaXMgZmVhdHVyZWRcbi5lbnRyeS5lbnRyeS0tZmVhdHVyZWQge1xuICAuZW50cnktYm9keSB7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47fVxuXG4gIC5lbnRyeS1pbWFnZSB7XG4gICAgaGVpZ2h0OiAyMDBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgb3JkZXI6IC0xO1xuICB9XG5cbiAgLmVudHJ5LWltYWdlLS1saW5rIHtcbiAgICBsZWZ0OiA1MCU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbn1cblxuXG4vLyBldmVuIGVudHJ5XG4uZW50cnkuZW50cnktLWZlYXR1cmVkLFxuLmVudHJ5LmV2ZW46bm90KC5lbnRyeS0tZmVhdHVyZWQpIHtcbiAgLmVudHJ5LWV4Y2VycHQge1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC40NCk7XG4gICAgZm9udC1mYW1pbHk6ICRwcmltYXJ5LWZvbnQ7XG4gICAgZm9udC1zaXplOiAyM3B4O1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAyMmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjIyO1xuICB9XG59XG4iLCIvLyBIb21lIFBhZ2UgU3R5bGVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4uaG9tZVBhZ2Uge1xyXG4gIC5lbnRyeSB7XHJcbiAgICAudS1iYWNrZ3JvdW5kRGFyayB7ZGlzcGxheTogbm9uZTt9XHJcbiAgICAmLWltYWdlIHtoZWlnaHQ6IDE3MnB4O31cclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuQG1lZGlhICN7JG1kLWFuZC11cH0ge1xyXG4gIC5ob21lUGFnZSB7XHJcbiAgICAuZW50cnkge1xyXG4gICAgICAmLWltYWdlIHsgaGVpZ2h0OiAxNzRweDsgfVxyXG5cclxuICAgICAgJi5lbnRyeTEsXHJcbiAgICAgICYuZW50cnk3IHtcclxuICAgICAgICBmbGV4LWJhc2lzOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZmlyc3QgcG9zdCB3aXRoIGltZyA2NiVcclxuICAgICAgJi5lbnRyeTEge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcblxyXG4gICAgICAgIC5lbnRyeS1pbWFnZSB7XHJcbiAgICAgICAgICBoZWlnaHQ6IDM1MHB4O1xyXG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gICAgICAgICAgd2lkdGg6IDY2LjY2NjY2NjY3JSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZW50cnktdGl0bGUge2ZvbnQtc2l6ZTogMzZweCAhaW1wb3J0YW50fVxyXG4gICAgICAgIC5lbnRyeS1ib2R5IHtcclxuICAgICAgICAgIHBhZGRpbmc6IDAgMCAwIDEzcHg7XHJcbiAgICAgICAgICB3aWR0aDogMzMuMzMzMzMzMzMlICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBlbnRyeSBmdWxsIHdpdGggYmFja2dyb3VuZCBhbGxcclxuICAgICAgJi5lbnRyeTcge1xyXG4gICAgICAgIC5lbnRyeS1pbWFnZSB7aGVpZ2h0OiA0NTBweDt9XHJcblxyXG4gICAgICAgIC5lbnRyeS10aXRsZSB7Zm9udC1zaXplOiA0NHB4ICFpbXBvcnRhbnR9XHJcbiAgICAgICAgLmVudHJ5LWV4Y2VycHQgeyBmb250LXNpemU6IDI0cHg7IGxpbmUtaGVpZ2h0OiAxLjM7fVxyXG4gICAgICB9XHJcblxyXG4gICAgICAmLmVudHJ5NyxcclxuICAgICAgJi5lbnRyeTEzLFxyXG4gICAgICAmLmVudHJ5MTQge1xyXG4gICAgICAgIC51LWJhY2tncm91bmREYXJrIHsgZGlzcGxheTogYmxvY2s7IH1cclxuXHJcbiAgICAgICAgLmVudHJ5LWJvZHkge1xyXG4gICAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgICAgbGVmdDogMDtcclxuICAgICAgICAgIG1hcmdpbjogMzBweCA0MHB4O1xyXG4gICAgICAgICAgbWF4LXdpZHRoOiA2MDBweDtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHotaW5kZXg6IDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmOm5vdCgubm90LS1pbWFnZSkge1xyXG4gICAgICAgICAgLmVudHJ5LWJvZHkge2NvbG9yOiAjZmZmO31cclxuICAgICAgICAgIC5lbnRyeS1hdXRob3Ige1xyXG4gICAgICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuOSk7XHJcbiAgICAgICAgICAgIGEsIC5lbnRyeS1kYXRlIHtjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuOSk7IH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICYuZW50cnkxMywgJi5lbnRyeTE0IHtcclxuICAgICAgICAuZW50cnktaW1hZ2Uge2hlaWdodDogNDUwcHg7fVxyXG4gICAgICAgIC5lbnRyeS10aXRsZSB7Zm9udC1zaXplOiAzMnB4ICFpbXBvcnRhbnR9XHJcbiAgICAgICAgLmVudHJ5LWV4Y2VycHQge2Rpc3BsYXk6IG5vbmU7fVxyXG4gICAgICAgIC5lbnRyeS1ieWxpbmUge21hcmdpbi10b3A6IDIwcHg7fVxyXG4gICAgICAgIC5lbnRyeS1ib2R5IHttYXgtd2lkdGg6IDQwMHB4O31cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIGVudHJ5IDUwJVxyXG4gICAgICAmLmVudHJ5NSwgJi5lbnRyeTYsICYuZW50cnkxMSwgJi5lbnRyeTEyIHtcclxuICAgICAgICBmbGV4LWJhc2lzOiA1MCU7XHJcbiAgICAgICAgbWF4LXdpZHRoOiA1MCU7XHJcbiAgICAgICAgLmVudHJ5LWltYWdlIHsgaGVpZ2h0OiAyNzRweDt9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGVudHJ5IDEzXHJcbiAgICAgICYuZW50cnkxMyB7XHJcbiAgICAgICAgZmxleC1iYXNpczogNjAlO1xyXG4gICAgICAgIG1heC13aWR0aDogNjAlO1xyXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGVudHJ5IDE0XHJcbiAgICAgICYuZW50cnkxNCB7XHJcbiAgICAgICAgZmxleC1iYXNpczogNDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogNDAlO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIucG9zdCB7XG4gICYtdGl0bGUge1xuICAgIGxpbmUtaGVpZ2h0OiAxLjA0O1xuICB9XG5cbiAgJi1mb290ZXIge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLC4wNSk7XG4gIH1cbn1cblxuXG4vLyBwb3N0IGNvbnRlbnQgYm9keVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5wb3N0LWJvZHkge1xuICBhIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDAsIDAsIDAsIC42KSA1MCUsIHJnYmEoMCwgMCwgMCwgMCkgNTAlKTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMDdlbTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gICAgYmFja2dyb3VuZC1zaXplOiAycHggLjFlbTtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIH1cbiAgaW1nIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIH1cblxuICBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBsZXR0ZXItc3BhY2luZzogLS4wM2VtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjA0O1xuICAgIG1hcmdpbi10b3A6IDU0cHg7XG4gIH1cblxuICBoMyB7XG4gICAgZm9udC1zaXplOiAzMnB4O1xuICAgIGxldHRlci1zcGFjaW5nOiAtLjAyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuMTU7XG4gICAgbWFyZ2luLXRvcDogNTJweDtcbiAgfVxuXG4gIGg0IHtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDE4ZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuMjI7XG4gICAgbWFyZ2luLXRvcDogMzBweDtcbiAgfVxuXG4gIHAge1xuICAgIGZvbnQtZmFtaWx5OiAkc2VjdW5kYXJ5LWZvbnQ7XG4gICAgZm9udC1zaXplOiAyMXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0uMDAzZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuNTg7XG4gICAgbWFyZ2luLXRvcDogMjhweDtcbiAgfVxuXG4gICY+IHA6Zmlyc3Qtb2YtdHlwZTpmaXJzdC1sZXR0ZXIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogNjRweDtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBsZXR0ZXItc3BhY2luZzogLS4wM2VtO1xuICAgIGxpbmUtaGVpZ2h0OiAuODM7XG4gICAgbWFyZ2luLWJvdHRvbTogLS4wOGVtO1xuICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICAgIG1hcmdpbi1yaWdodDogN3B4O1xuICAgIHBhZGRpbmctdG9wOiA3cHg7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgfVxuXG4gIHVsLFxuICBvbCB7XG4gICAgY291bnRlci1yZXNldDogcG9zdDtcbiAgICBmb250LWZhbWlseTogJHNlY3VuZGFyeS1mb250O1xuICAgIGZvbnQtc2l6ZTogMjFweDtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuXG4gICAgbGkge1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0uMDAzZW07XG4gICAgICBsaW5lLWhlaWdodDogMS41ODtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE0cHg7XG4gICAgICBtYXJnaW4tbGVmdDogMzBweDtcblxuICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtYXJnaW4tbGVmdDogLTc4cHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIHdpZHRoOiA3OHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVsIGxpOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICfigKInO1xuICAgIGZvbnQtc2l6ZTogMTYuOHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gICAgcGFkZGluZy10b3A6IDRweDtcbiAgfVxuXG4gIG9sIGxpOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IGNvdW50ZXIocG9zdCkgXCIuXCI7XG4gICAgY291bnRlci1pbmNyZW1lbnQ6IHBvc3Q7XG4gICAgcGFkZGluZy1yaWdodDogMTJweDtcbiAgfVxuXG4gIC50d2l0dGVyLXR3ZWV0LFxuICBpZnJhbWUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLXRvcDogNDBweCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLnZpZGVvLXJlc3BvbnNpdmUgaWZyYW1lIHsgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50fVxuXG59XG5cblxuLy8gcG9zdCBUYWdzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnBvc3QtdGFncyB7XG4gIGEge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjA4KTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgJjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC4xKTtcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gcG9zdCBOZXdzbGV0dGVyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4ucG9zdC1uZXdzbGV0dGVyIHtcbiAgbWF4LXdpZHRoOiA1MjBweDtcbiAgLm5ld3NsZXR0ZXItZm9ybSB7bWF4LXdpZHRoOiA0MDBweH1cblxuICAuZm9ybS1ncm91cCB7IHdpZHRoOiA4MCU7IHBhZGRpbmctcmlnaHQ6IDVweDsgfVxuICAuZm9ybS0taW5wdXQge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgcGFkZGluZzogNnB4IDEycHggOHB4IDVweDtcbiAgICByZXNpemU6IG5vbmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgJjpmb2N1cyB7XG4gICAgICBvdXRsaW5lOiAwO1xuICAgIH1cbiAgfVxuICAuZm9ybS0tYnRuIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlhOWE5O1xuICAgIGJvcmRlci1yYWRpdXM6IDAgNDVweCA0NXB4IDA7XG4gICAgYm9yZGVyOiAwO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHdpZHRoOiAyMCU7XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgQGV4dGVuZCAldS1hYnNvbHV0ZTA7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTlhOWE5O1xuICAgICAgYm9yZGVyLXJhZGl1czogMCA0NXB4IDQ1cHggMDtcbiAgICAgIGxpbmUtaGVpZ2h0OiA0NXB4O1xuICAgICAgei1pbmRleDogMjtcbiAgICB9XG5cbiAgICAmOmhvdmVyIHtvcGFjaXR5OiAuODsgfVxuICAgICY6Zm9jdXMgeyBvdXRsaW5lOiAwOyB9XG4gIH1cbn1cblxuXG4vLyBwb3N0IFJlbGF0aXZlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLnBvc3QtcmVsYXRlZCB7XG4gIC5lbnRyeS1pbWFnZSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjA3ODUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICAgIGhlaWdodDogMTUwcHg7XG4gIH1cblxuICAuZW50cnktdGl0bGUge1xuICAgIGNvbG9yOiByZ2JhKDAsMCwwLC45KTtcbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiAyICFpbXBvcnRhbnQ7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3ghaW1wb3J0YW50O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjEgIWltcG9ydGFudDtcbiAgICBtYXgtaGVpZ2h0OiAyLjJlbSAhaW1wb3J0YW50O1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzICFpbXBvcnRhbnQ7XG4gIH1cblxuICAudS1jYXJkIHtcbiAgICBoZWlnaHQ6IDI0MHB4O1xuICB9XG59XG5cblxuLy8gU2hhcmUgUG9zdFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi5zaGFyZVBvc3Qge1xuICBtYXJnaW4tbGVmdDogLTEzMHB4O1xuICBtYXJnaW4tdG9wOiAyOHB4O1xuICB3aWR0aDogNDVweDtcblxuICBhIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgbWFyZ2luOiAxMHB4IGF1dG87XG4gICAgcGFkZGluZzogOHB4O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICB3aWR0aDogMzZweDtcbiAgfVxufVxuXG4vLyBQb3N0IEFjdGlvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4ucG9zdEFjdGlvbnMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3R0b206IDA7XG4gIGJveC1zaGFkb3c6IDAgMCAxcHggcmdiYSgwLCAwLCAwLCAuNDQpO1xuICBoZWlnaHQ6IDQ0cHg7XG4gIGxlZnQ6IDA7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcztcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB6LWluZGV4OiA0MDA7XG5cbiAgJi5pcy12aXNpYmxlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgdHJhbnNpdGlvbi1kZWxheTogMHM7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgfVxuXG4gICYtd3JhcCB7bWF4LXdpZHRoOiAxMjAwcHg7fVxuXG4gIC5zZXBhcmF0b3Ige1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjE1KTtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgbWFyZ2luOiAwIDE1cHg7XG4gICAgd2lkdGg6IDFweDtcbiAgfVxufVxuXG4ubmV4dFBvc3Qge1xuICBtYXgtd2lkdGg6IDI2MHB4O1xufVxuXG5cbkBtZWRpYSAjeyRtZC1hbmQtZG93bn0ge1xuXG4gIC5wb3N0LWJvZHkge1xuXG4gICAgaDIge1xuICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgbWFyZ2luLXRvcDogMjZweDtcbiAgICB9XG5cbiAgICBoMyB7XG4gICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICBtYXJnaW4tdG9wOiAyOHB4O1xuICAgIH1cblxuICAgIGg0IHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIG1hcmdpbi10b3A6IDIycHg7XG4gICAgfVxuXG4gICAgcSB7XG4gICAgICBmb250LXNpemU6IDIycHggIWltcG9ydGFudDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtLjAwOGVtICFpbXBvcnRhbnQ7XG4gICAgICBsaW5lLWhlaWdodDogMS40ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgJj4gcDpmaXJzdC1vZi10eXBlOmZpcnN0LWxldHRlciB7XG4gICAgICBmb250LXNpemU6IDU0Ljg1cHg7XG4gICAgICBtYXJnaW4tbGVmdDogLTRweDtcbiAgICAgIG1hcmdpbi1yaWdodDogNnB4O1xuICAgICAgcGFkZGluZy10b3A6IDMuNXB4O1xuICAgIH1cblxuICAgIG9sICwgdWwsIHAge1xuICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0uMDA0ZW07XG4gICAgICBsaW5lLWhlaWdodDogMS41ODtcbiAgICB9XG4gIH1cbn1cbiIsIi5hdXRob3Ige1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xyXG4gIG1pbi1oZWlnaHQ6IDQwMHB4O1xyXG5cclxuICBhIHtcclxuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC44KTtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmLXdyYXAge1xyXG4gICAgei1pbmRleDogMjtcclxuICB9XHJcblxyXG4gICYtYXZhdGFyIHtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuICAgIHdpZHRoOiA4MHB4O1xyXG4gIH1cclxuXHJcbiAgJi1tZXRhIHtcclxuICAgIHNwYW4ge1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICBtYXJnaW46IDAgMjVweCAxNnB4IDA7XHJcbiAgICAgIG9wYWNpdHk6IC44O1xyXG4gICAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmLW5hbWUgeyBjb2xvcjogcmdiYSgwLDAsMCwuOCl9XHJcblxyXG4gICYtYmlvIHtcclxuICAgIG1heC13aWR0aDogNjAwcHg7XHJcbiAgICAvLyBjb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgfVxyXG5cclxuICAmLWZvbGxvdyBhIHtcclxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDJweCBoc2xhKDAsMCUsMTAwJSwuNSk7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICBsaW5lLWhlaWdodDogNDBweDtcclxuICAgIG1hcmdpbjogMCAxMHB4O1xyXG4gICAgcGFkZGluZzogMCAxNnB4O1xyXG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7XHJcblxyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDJweCAjZmZmO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuLmF1dGhvci5oYXMtLWltYWdlIHtcclxuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xyXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIC4zMyk7XHJcblxyXG4gIC5hdXRob3ItbGluazpob3ZlciB7IG9wYWNpdHk6IDEhaW1wb3J0YW50fVxyXG4gIGEsXHJcbiAgLmF1dGhvci1uYW1lIHsgY29sb3I6ICNmZmY7fVxyXG59XHJcblxyXG5AbWVkaWEgI3skbWQtYW5kLWRvd259IHtcclxuICAuYXV0aG9yLW1ldGEgc3BhbiB7ZGlzcGxheTogYmxvY2s7fVxyXG59XHJcbiIsIi8vIFNlYXJjaFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4uc2VhcmNoIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHBhZGRpbmc6IDAgMjBweCAwO1xyXG4gIHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50O1xyXG4gIHotaW5kZXg6IDk5OTk7XHJcblxyXG4gICYtaGVhZGVyIHtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgwLCAwLCAwLCAuMDUpO1xyXG4gICAgaGVpZ2h0OiAkaGVhZGVyLWhlaWdodC1tb2JpbGU7XHJcbiAgICBtYXJnaW46IDAgLTIwcHggMzBweDtcclxuICAgIHBhZGRpbmc6IDAgMjBweDtcclxuICB9XHJcblxyXG4gICYtZm9ybSB7XHJcbiAgICBtYXgtd2lkdGg6IDY4MHB4O1xyXG5cclxuICAgICY6OmJlZm9yZSB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNlZWU7XHJcbiAgICAgIGJvdHRvbTogMDtcclxuICAgICAgY29udGVudDogJyc7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBoZWlnaHQ6IDJweDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgei1pbmRleDogMTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dCB7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xyXG5cclxuICAgICAgJjpmb2N1cyB7IG91dGxpbmU6IDA7IH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICAvLyByZXN1bHRcclxuICAmLXJlc3VsdHMge1xyXG4gICAgZmxleDogMTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG1heC13aWR0aDogNjgwcHg7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuXHJcbiAgICBhIHtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XHJcbiAgICAgIHBhZGRpbmc6IDEycHggMDtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjQ0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmJvZHkuaXMtc2VhcmNoIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxuICAuc2VhcmNoIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxufVxyXG4iLCIuc2lkZWJhciB7XHJcbiAgJi10aXRsZSB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMDc4NSk7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XHJcbiAgfVxyXG5cclxuICAvLyBib3JkZXIgZm9yIHBvc3RcclxuICAmLWJvcmRlciB7XHJcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICRwcmltYXJ5LWNvbG9yO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjIpO1xyXG4gICAgZm9udC1mYW1pbHk6ICRzZWN1bmRhcnktZm9udDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDEwcHggMTBweDtcclxuICAgIHRvcDogMDtcclxuICB9XHJcbn1cclxuXHJcbi5zaWRlYmFyLXBvc3Qge1xyXG4gICY6bnRoLWNoaWxkKDNuKSB7IC5zaWRlYmFyLWJvcmRlciB7IGJvcmRlci1jb2xvcjogZGFya2VuKG9yYW5nZSwgMiUpOyB9IH1cclxuICAmOm50aC1jaGlsZCgzbisyKSB7IC5zaWRlYmFyLWJvcmRlciB7IGJvcmRlci1jb2xvcjogIzI2YThlZCB9IH1cclxuXHJcbiAgJi0tdGl0bGUge1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMTtcclxuICB9XHJcblxyXG4gICYtLWxpbmsge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIG1pbi1oZWlnaHQ6IDUwcHg7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDE1cHggMTVweCA1NXB4O1xyXG4gICAgJjpob3ZlciB7IC5zaWRlYmFyLWJvcmRlciB7YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMjksMjM5LDI0NSwxKTt9ICB9XHJcblxyXG4gIH1cclxufVxyXG4iLCIgLy8gTmF2aWdhdGlvbiBNb2JpbGVcblxuLnNpZGVOYXYge1xuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjgpO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBwYWRkaW5nOiAkaGVhZGVyLWhlaWdodC1tb2JpbGUgMjBweDtcbiAgcG9zaXRpb246IGZpeGVkICFpbXBvcnRhbnQ7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgdHJhbnNpdGlvbjogLjRzO1xuICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xuICB6LWluZGV4OiA5OTtcblxuICAmLW1lbnUgYSB7IHBhZGRpbmc6IDEwcHggMjBweDsgfVxuXG4gICYtd3JhcCB7XG4gICAgYmFja2dyb3VuZDogI2VlZTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBwYWRkaW5nOiAyMHB4IDA7XG4gICAgdG9wOiAkaGVhZGVyLWhlaWdodC1tb2JpbGU7XG4gIH1cblxuICAmLXNlY3Rpb24ge1xuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjZGRkO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xuICB9XG5cbiAgJi1mb2xsb3cge1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1xuICAgIG1hcmdpbjogMTVweCAwO1xuXG4gICAgYSB7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGhlaWdodDogMzZweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgbWFyZ2luOiAwIDVweCA1cHggMDtcbiAgICAgIG1pbi13aWR0aDogMzZweDtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgfVxuXG4gICAgQGVhY2ggJHNvY2lhbC1uYW1lLCAkY29sb3IgaW4gJHNvY2lhbC1jb2xvcnMge1xuICAgICAgLmktI3skc29jaWFsLW5hbWV9IHtcbiAgICAgICAgQGV4dGVuZCAuYmctI3skc29jaWFsLW5hbWV9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FNa0tBLEFKbEtBLEtJa0tLLENKbEtDO0VBQ0osS0FBSyxFQUFFLE9BQU87RUFDZCxNQUFNLEVBQUUsT0FBTztFQUNmLGVBQWUsRUFBRSxJQUFJLEdBQ3RCOztBSTRKRCxBSjFKQSxhSTBKYSxDSjFKQztFQUNaLEtBQUssRURKUyxPQUFPO0VDS3JCLGVBQWUsRUFBRSxJQUFJLEdBRXRCO0VJc0pELEFKMUpBLGFJMEphLEFKdkpYLE1BQU8sQ0FBQztJQUFDLEtBQUssRURMTSxPQUFPLEdDS1k7O0FPaUJ6QyxBUExBLFlPS1ksRVF5SFosQWY5SEEsZ0JlOEhnQixDQWdCZCxVQUFVLEFBU1IsUUFBUyxDZnZKQTtFQUNYLE1BQU0sRUFBRSxDQUFDO0VBQ1QsSUFBSSxFQUFFLENBQUM7RUFDUCxRQUFRLEVBQUUsUUFBUTtFQUNsQixLQUFLLEVBQUUsQ0FBQztFQUNSLEdBQUcsRUFBRSxDQUFDLEdBQ1A7O0FJaU1ELEFKL0xBLElJK0xJLEFBT0YsV0FBWSxFRzlNZCxBUFFBLGtCT1JrQixDUFFHO0VBQ25CLEtBQUssRUFBRSxrQkFBaUIsQ0FBQyxVQUFVO0VBQ25DLElBQUksRUFBRSxrQkFBaUIsQ0FBQyxVQUFVLEdBQ25DOztBSXFLRCxBSm5LQSxRSW1LUSxBQVlSLFFBQVcsRUFaRCxBSm5LVixLSW1LZSxBQVlmLFFBQVcsRUFaTSxBSm5LakIsUUltS3lCLEFBWXpCLFFBQVcsR010TVgsQUFBQSxBVnVCQSxLVXZCQyxFQUFPLElBQUksQUFBWCxDQUFZLFFBQVEsR0FBRSxBQUFBLEFWdUJ2QixLVXZCd0IsRUFBTyxLQUFLLEFBQVosQ0FBYSxRQUFRLENWdUJoQztFQUNYLGdGQUFnRjtFQUNoRixXQUFXLEVBQUUsbUJBQW1CO0VBQ2hDLEtBQUssRUFBRSxJQUFJO0VBQ1gsVUFBVSxFQUFFLE1BQU07RUFDbEIsV0FBVyxFQUFFLE1BQU07RUFDbkIsWUFBWSxFQUFFLE1BQU07RUFDcEIsY0FBYyxFQUFFLElBQUk7RUFDcEIsV0FBVyxFQUFFLE9BQU87RUFFcEIsdUNBQXVDO0VBQ3ZDLHNCQUFzQixFQUFFLFdBQVc7RUFDbkMsdUJBQXVCLEVBQUUsU0FBUyxHQUNuQzs7QUMvQ0QsNEVBQTRFO0FBRTVFO2dGQUNnRjtBQUVoRjs7OztHQUlHO0FBRUgsQUFBQSxJQUFJLENBQUM7RUFDSCxXQUFXLEVBQUUsSUFBSTtFQUFHLE9BQU87RUFDM0Isb0JBQW9CLEVBQUUsSUFBSTtFQUFHLE9BQU87RUFDcEMsd0JBQXdCLEVBQUUsSUFBSTtFQUFHLE9BQU8sRUFDekM7O0FBRUQ7Z0ZBQ2dGO0FBRWhGOztHQUVHO0FBRUgsQUFBQSxPQUFPO0FBQ1AsQUFBQSxLQUFLO0FBQ0wsQUFBQSxNQUFNO0FBQ04sQUFBQSxNQUFNO0FBQ04sQUFBQSxHQUFHO0FBQ0gsQUFBQSxPQUFPLENBQUM7RUFDTixPQUFPLEVBQUUsS0FBSyxHQUNmOztBQUVEOzs7R0FHRztBQUVILEFBQUEsRUFBRSxDQUFDO0VBQ0QsU0FBUyxFQUFFLEdBQUc7RUFDZCxNQUFNLEVBQUUsUUFBUSxHQUNqQjs7QUFFRDtnRkFDZ0Y7QUFFaEY7OztHQUdHO0FBRUgsQUFBQSxVQUFVO0FBQ1YsQUFBQSxNQUFNO0FBQ04sQUFBQSxJQUFJLENBQUM7RUFBRSxPQUFPO0VBQ1osT0FBTyxFQUFFLEtBQUssR0FDZjs7QUFFRDs7R0FFRztBQUVILEFBQUEsTUFBTSxDQUFDO0VBQ0wsTUFBTSxFQUFFLFFBQVEsR0FDakI7O0FBRUQ7OztHQUdHO0FBRUgsQUFBQSxFQUFFLENBQUM7RUFDRCxVQUFVLEVBQUUsV0FBVztFQUFHLE9BQU87RUFDakMsTUFBTSxFQUFFLENBQUM7RUFBRyxPQUFPO0VBQ25CLFFBQVEsRUFBRSxPQUFPO0VBQUcsT0FBTyxFQUM1Qjs7QUFFRDs7O0dBR0c7QUFFSCxBQUFBLEdBQUcsQ0FBQztFQUNGLFdBQVcsRUFBRSxvQkFBb0I7RUFBRyxPQUFPO0VBQzNDLFNBQVMsRUFBRSxHQUFHO0VBQUcsT0FBTyxFQUN6Qjs7QUFFRDtnRkFDZ0Y7QUFFaEY7OztHQUdHO0FBRUgsQUFBQSxDQUFDLENBQUM7RUFDQSxnQkFBZ0IsRUFBRSxXQUFXO0VBQUcsT0FBTztFQUN2Qyw0QkFBNEIsRUFBRSxPQUFPO0VBQUcsT0FBTyxFQUNoRDs7QUFFRDs7O0dBR0c7QUFFSCxBQUFBLElBQUksQ0FBQSxBQUFBLEtBQUMsQUFBQSxFQUFPO0VBQ1YsYUFBYSxFQUFFLElBQUk7RUFBRyxPQUFPO0VBQzdCLGVBQWUsRUFBRSxTQUFTO0VBQUcsT0FBTztFQUNwQyxlQUFlLEVBQUUsZ0JBQWdCO0VBQUcsT0FBTyxFQUM1Qzs7QUFFRDs7R0FFRztBQUVILEFBQUEsQ0FBQztBQUNELEFBQUEsTUFBTSxDQUFDO0VBQ0wsV0FBVyxFQUFFLE9BQU8sR0FDckI7O0FBRUQ7O0dBRUc7QUFFSCxBQUFBLENBQUM7QUFDRCxBQUFBLE1BQU0sQ0FBQztFQUNMLFdBQVcsRUFBRSxNQUFNLEdBQ3BCOztBQUVEOzs7R0FHRztBQUVILEFBQUEsSUFBSTtBQUNKLEFBQUEsR0FBRztBQUNILEFBQUEsSUFBSSxDQUFDO0VBQ0gsV0FBVyxFQUFFLG9CQUFvQjtFQUFHLE9BQU87RUFDM0MsU0FBUyxFQUFFLEdBQUc7RUFBRyxPQUFPLEVBQ3pCOztBQUVEOztHQUVHO0FBRUgsQUFBQSxHQUFHLENBQUM7RUFDRixVQUFVLEVBQUUsTUFBTSxHQUNuQjs7QUFFRDs7R0FFRztBQUVILEFBQUEsSUFBSSxDQUFDO0VBQ0gsZ0JBQWdCLEVBQUUsSUFBSTtFQUN0QixLQUFLLEVBQUUsSUFBSSxHQUNaOztBQUVEOztHQUVHO0FBRUgsQUFBQSxLQUFLLENBQUM7RUFDSixTQUFTLEVBQUUsR0FBRyxHQUNmOztBQUVEOzs7R0FHRztBQUVILEFBQUEsR0FBRztBQUNILEFBQUEsR0FBRyxDQUFDO0VBQ0YsU0FBUyxFQUFFLEdBQUc7RUFDZCxXQUFXLEVBQUUsQ0FBQztFQUNkLFFBQVEsRUFBRSxRQUFRO0VBQ2xCLGNBQWMsRUFBRSxRQUFRLEdBQ3pCOztBQUVELEFBQUEsR0FBRyxDQUFDO0VBQ0YsTUFBTSxFQUFFLE9BQU8sR0FDaEI7O0FBRUQsQUFBQSxHQUFHLENBQUM7RUFDRixHQUFHLEVBQUUsTUFBTSxHQUNaOztBQUVEO2dGQUNnRjtBQUVoRjs7R0FFRztBQUVILEFBQUEsS0FBSztBQUNMLEFBQUEsS0FBSyxDQUFDO0VBQ0osT0FBTyxFQUFFLFlBQVksR0FDdEI7O0FBRUQ7O0dBRUc7QUFFSCxBQUFBLEtBQUssQUFBQSxJQUFLLEVBQUEsQUFBQSxBQUFBLFFBQUMsQUFBQSxHQUFXO0VBQ3BCLE9BQU8sRUFBRSxJQUFJO0VBQ2IsTUFBTSxFQUFFLENBQUMsR0FDVjs7QUFFRDs7R0FFRztBQUVILEFBQUEsR0FBRyxDQUFDO0VBQ0YsWUFBWSxFQUFFLElBQUksR0FDbkI7O0FBRUQ7O0dBRUc7QUFFSCxBQUFBLEdBQUcsQUFBQSxJQUFLLENBQUEsQUFBQSxLQUFLLEVBQUU7RUFDYixRQUFRLEVBQUUsTUFBTSxHQUNqQjs7QUFFRDtnRkFDZ0Y7QUFFaEY7O0dBRUc7QUFFSCxBQUFBLE1BQU07QUFDTixBQUFBLEtBQUs7QUFDTCxBQUFBLFFBQVE7QUFDUixBQUFBLE1BQU07QUFDTixBQUFBLFFBQVEsQ0FBQztFQUNQLE1BQU0sRUFBRSxDQUFDLEdBQ1Y7O0FBRUQ7OztHQUdHO0FBRUgsQUFBQSxNQUFNO0FBQ04sQUFBQSxLQUFLLENBQUM7RUFBRSxPQUFPO0VBQ2IsUUFBUSxFQUFFLE9BQU8sR0FDbEI7O0FBRUQ7OztHQUdHO0FBRUgsQUFBQSxNQUFNO0FBQ04sQUFBQSxNQUFNLENBQUM7RUFBRSxPQUFPO0VBQ2QsY0FBYyxFQUFFLElBQUksR0FDckI7O0FBRUQ7Ozs7R0FJRztBQUVILEFBQUEsTUFBTTtBQUNOLEFBQUssSUFBRCxFQUFDLEFBQUEsSUFBQyxDQUFLLFFBQVEsQUFBYjtDQUNOLEFBQUEsQUFBQSxJQUFDLENBQUssT0FBTyxBQUFaO0NBQ0QsQUFBQSxBQUFBLElBQUMsQ0FBSyxRQUFRLEFBQWIsRUFBZTtFQUNkLGtCQUFrQixFQUFFLE1BQU07RUFBRyxPQUFPLEVBQ3JDOztBQUVEOztHQUVHO0FBRUgsQUFBQSxNQUFNLEFBQUEsa0JBQWtCO0NBQ3hCLEFBQUEsQUFBQSxJQUFDLENBQUssUUFBUSxBQUFiLENBQWMsa0JBQWtCO0NBQ2pDLEFBQUEsQUFBQSxJQUFDLENBQUssT0FBTyxBQUFaLENBQWEsa0JBQWtCO0NBQ2hDLEFBQUEsQUFBQSxJQUFDLENBQUssUUFBUSxBQUFiLENBQWMsa0JBQWtCLENBQUM7RUFDaEMsWUFBWSxFQUFFLElBQUk7RUFDbEIsT0FBTyxFQUFFLENBQUMsR0FDWDs7QUFFRDs7R0FFRztBQUVILEFBQUEsTUFBTSxBQUFBLGVBQWU7Q0FDckIsQUFBQSxBQUFBLElBQUMsQ0FBSyxRQUFRLEFBQWIsQ0FBYyxlQUFlO0NBQzlCLEFBQUEsQUFBQSxJQUFDLENBQUssT0FBTyxBQUFaLENBQWEsZUFBZTtDQUM3QixBQUFBLEFBQUEsSUFBQyxDQUFLLFFBQVEsQUFBYixDQUFjLGVBQWUsQ0FBQztFQUM3QixPQUFPLEVBQUUscUJBQXFCLEdBQy9COztBQUVEOzs7OztHQUtHO0FBRUgsQUFBQSxNQUFNLENBQUM7RUFDTCxVQUFVLEVBQUUsVUFBVTtFQUFHLE9BQU87RUFDaEMsS0FBSyxFQUFFLE9BQU87RUFBRyxPQUFPO0VBQ3hCLE9BQU8sRUFBRSxLQUFLO0VBQUcsT0FBTztFQUN4QixTQUFTLEVBQUUsSUFBSTtFQUFHLE9BQU87RUFDekIsT0FBTyxFQUFFLENBQUM7RUFBRyxPQUFPO0VBQ3BCLFdBQVcsRUFBRSxNQUFNO0VBQUcsT0FBTyxFQUM5Qjs7QUFFRDs7O0dBR0c7QUFFSCxBQUFBLFFBQVEsQ0FBQztFQUNQLE9BQU8sRUFBRSxZQUFZO0VBQUcsT0FBTztFQUMvQixjQUFjLEVBQUUsUUFBUTtFQUFHLE9BQU8sRUFDbkM7O0FBRUQ7O0dBRUc7QUFFSCxBQUFBLFFBQVEsQ0FBQztFQUNQLFFBQVEsRUFBRSxJQUFJLEdBQ2Y7O0FBRUQ7OztHQUdHO0NBRUgsQUFBQSxBQUFBLElBQUMsQ0FBSyxVQUFVLEFBQWY7Q0FDRCxBQUFBLEFBQUEsSUFBQyxDQUFLLE9BQU8sQUFBWixFQUFjO0VBQ2IsVUFBVSxFQUFFLFVBQVU7RUFBRyxPQUFPO0VBQ2hDLE9BQU8sRUFBRSxDQUFDO0VBQUcsT0FBTyxFQUNyQjs7QUFFRDs7R0FFRztDQUVILEFBQUEsQUFBQSxJQUFDLENBQUssUUFBUSxBQUFiLENBQWMsMkJBQTJCO0NBQzFDLEFBQUEsQUFBQSxJQUFDLENBQUssUUFBUSxBQUFiLENBQWMsMkJBQTJCLENBQUM7RUFDekMsTUFBTSxFQUFFLElBQUksR0FDYjs7QUFFRDs7O0dBR0c7Q0FFSCxBQUFBLEFBQUEsSUFBQyxDQUFLLFFBQVEsQUFBYixFQUFlO0VBQ2Qsa0JBQWtCLEVBQUUsU0FBUztFQUFHLE9BQU87RUFDdkMsY0FBYyxFQUFFLElBQUk7RUFBRyxPQUFPLEVBQy9COztBQUVEOztHQUVHO0NBRUgsQUFBQSxBQUFBLElBQUMsQ0FBSyxRQUFRLEFBQWIsQ0FBYyw4QkFBOEI7Q0FDN0MsQUFBQSxBQUFBLElBQUMsQ0FBSyxRQUFRLEFBQWIsQ0FBYywyQkFBMkIsQ0FBQztFQUN6QyxrQkFBa0IsRUFBRSxJQUFJLEdBQ3pCOztBQUVEOzs7R0FHRztBQUVILEFBQUEsNEJBQTRCLENBQUM7RUFDM0Isa0JBQWtCLEVBQUUsTUFBTTtFQUFHLE9BQU87RUFDcEMsSUFBSSxFQUFFLE9BQU87RUFBRyxPQUFPLEVBQ3hCOztBQUVEO2dGQUNnRjtBQUVoRjs7O0dBR0c7QUFFSCxBQUFBLE9BQU87QUFDUCxBQUFBLElBQUksQ0FBQztFQUNILE9BQU8sRUFBRSxLQUFLLEdBQ2Y7O0FBRUQ7O0dBRUc7QUFFSCxBQUFBLE9BQU8sQ0FBQztFQUNOLE9BQU8sRUFBRSxTQUFTLEdBQ25COztBQUVEO2dGQUNnRjtBQUVoRjs7R0FFRztBQUVILEFBQUEsTUFBTSxDQUFDO0VBQ0wsT0FBTyxFQUFFLFlBQVksR0FDdEI7O0FBRUQ7O0dBRUc7QUFFSCxBQUFBLFFBQVEsQ0FBQztFQUNQLE9BQU8sRUFBRSxJQUFJLEdBQ2Q7O0FBRUQ7Z0ZBQ2dGO0FBRWhGOztHQUVHO0NBRUgsQUFBQSxBQUFBLE1BQUMsQUFBQSxFQUFRO0VBQ1AsT0FBTyxFQUFFLElBQUksR0FDZDs7QUMxYUQ7Ozs7R0FJRztBQUVILEFBQUEsSUFBSSxDQUFBLEFBQUEsS0FBQyxFQUFPLFdBQVcsQUFBbEI7QUFDTCxBQUFBLEdBQUcsQ0FBQSxBQUFBLEtBQUMsRUFBTyxXQUFXLEFBQWxCLEVBQW9CO0VBQ3ZCLEtBQUssRUFBRSxLQUFLO0VBQ1osVUFBVSxFQUFFLElBQUk7RUFDaEIsV0FBVyxFQUFFLFdBQVc7RUFDeEIsV0FBVyxFQUFFLHlEQUF5RDtFQUN0RSxVQUFVLEVBQUUsSUFBSTtFQUNoQixXQUFXLEVBQUUsR0FBRztFQUNoQixZQUFZLEVBQUUsTUFBTTtFQUNwQixVQUFVLEVBQUUsTUFBTTtFQUNsQixTQUFTLEVBQUUsTUFBTTtFQUNqQixXQUFXLEVBQUUsR0FBRztFQUVoQixhQUFhLEVBQUUsQ0FBQztFQUNoQixXQUFXLEVBQUUsQ0FBQztFQUNkLFFBQVEsRUFBRSxDQUFDO0VBRVgsZUFBZSxFQUFFLElBQUk7RUFDckIsWUFBWSxFQUFFLElBQUk7RUFDbEIsV0FBVyxFQUFFLElBQUk7RUFDakIsT0FBTyxFQUFFLElBQUksR0FDYjs7QUFFRCxBQUFBLEdBQUcsQ0FBQSxBQUFBLEtBQUMsRUFBTyxXQUFXLEFBQWxCLENBQW1CLGdCQUFnQixFQUFFLEFBQXdCLEdBQXJCLENBQUEsQUFBQSxLQUFDLEVBQU8sV0FBVyxBQUFsQixFQUFvQixnQkFBZ0I7QUFDakYsQUFBQSxJQUFJLENBQUEsQUFBQSxLQUFDLEVBQU8sV0FBVyxBQUFsQixDQUFtQixnQkFBZ0IsRUFBRSxBQUF5QixJQUFyQixDQUFBLEFBQUEsS0FBQyxFQUFPLFdBQVcsQUFBbEIsRUFBb0IsZ0JBQWdCLENBQUM7RUFDbkYsV0FBVyxFQUFFLElBQUk7RUFDakIsVUFBVSxFQUFFLE9BQU8sR0FDbkI7O0FBRUQsQUFBQSxHQUFHLENBQUEsQUFBQSxLQUFDLEVBQU8sV0FBVyxBQUFsQixDQUFtQixXQUFXLEVBQUUsQUFBd0IsR0FBckIsQ0FBQSxBQUFBLEtBQUMsRUFBTyxXQUFXLEFBQWxCLEVBQW9CLFdBQVc7QUFDdkUsQUFBQSxJQUFJLENBQUEsQUFBQSxLQUFDLEVBQU8sV0FBVyxBQUFsQixDQUFtQixXQUFXLEVBQUUsQUFBeUIsSUFBckIsQ0FBQSxBQUFBLEtBQUMsRUFBTyxXQUFXLEFBQWxCLEVBQW9CLFdBQVcsQ0FBQztFQUN6RSxXQUFXLEVBQUUsSUFBSTtFQUNqQixVQUFVLEVBQUUsT0FBTyxHQUNuQjs7QUFFRCxNQUFNLENBQUMsS0FBSztFQUNYLEFBQUEsSUFBSSxDQUFBLEFBQUEsS0FBQyxFQUFPLFdBQVcsQUFBbEI7RUFDTCxBQUFBLEdBQUcsQ0FBQSxBQUFBLEtBQUMsRUFBTyxXQUFXLEFBQWxCLEVBQW9CO0lBQ3ZCLFdBQVcsRUFBRSxJQUFJLEdBQ2pCOztBQUdGLGlCQUFpQjtBQUNqQixBQUFBLEdBQUcsQ0FBQSxBQUFBLEtBQUMsRUFBTyxXQUFXLEFBQWxCLEVBQW9CO0VBQ3ZCLE9BQU8sRUFBRSxHQUFHO0VBQ1osTUFBTSxFQUFFLE1BQU07RUFDZCxRQUFRLEVBQUUsSUFBSSxHQUNkOztBQUVELEFBQVksSUFBUCxDQUFBLEFBQUEsR0FBRyxJQUFJLElBQUksQ0FBQSxBQUFBLEtBQUMsRUFBTyxXQUFXLEFBQWxCO0FBQ2pCLEFBQUEsR0FBRyxDQUFBLEFBQUEsS0FBQyxFQUFPLFdBQVcsQUFBbEIsRUFBb0I7RUFDdkIsVUFBVSxFQUFFLE9BQU8sR0FDbkI7O0FBRUQsaUJBQWlCO0FBQ2pCLEFBQVksSUFBUCxDQUFBLEFBQUEsR0FBRyxJQUFJLElBQUksQ0FBQSxBQUFBLEtBQUMsRUFBTyxXQUFXLEFBQWxCLEVBQW9CO0VBQ3BDLE9BQU8sRUFBRSxJQUFJO0VBQ2IsYUFBYSxFQUFFLElBQUk7RUFDbkIsV0FBVyxFQUFFLE1BQU0sR0FDbkI7O0FBRUQsQUFBQSxNQUFNLEFBQUEsUUFBUTtBQUNkLEFBQUEsTUFBTSxBQUFBLE9BQU87QUFDYixBQUFBLE1BQU0sQUFBQSxRQUFRO0FBQ2QsQUFBQSxNQUFNLEFBQUEsTUFBTSxDQUFDO0VBQ1osS0FBSyxFQUFFLFNBQVMsR0FDaEI7O0FBRUQsQUFBQSxNQUFNLEFBQUEsWUFBWSxDQUFDO0VBQ2xCLEtBQUssRUFBRSxJQUFJLEdBQ1g7O0FBRUQsQUFBQSxVQUFVLENBQUM7RUFDVixPQUFPLEVBQUUsRUFBRSxHQUNYOztBQUVELEFBQUEsTUFBTSxBQUFBLFNBQVM7QUFDZixBQUFBLE1BQU0sQUFBQSxJQUFJO0FBQ1YsQUFBQSxNQUFNLEFBQUEsUUFBUTtBQUNkLEFBQUEsTUFBTSxBQUFBLE9BQU87QUFDYixBQUFBLE1BQU0sQUFBQSxTQUFTO0FBQ2YsQUFBQSxNQUFNLEFBQUEsT0FBTztBQUNiLEFBQUEsTUFBTSxBQUFBLFFBQVEsQ0FBQztFQUNkLEtBQUssRUFBRSxJQUFJLEdBQ1g7O0FBRUQsQUFBQSxNQUFNLEFBQUEsU0FBUztBQUNmLEFBQUEsTUFBTSxBQUFBLFVBQVU7QUFDaEIsQUFBQSxNQUFNLEFBQUEsT0FBTztBQUNiLEFBQUEsTUFBTSxBQUFBLEtBQUs7QUFDWCxBQUFBLE1BQU0sQUFBQSxRQUFRO0FBQ2QsQUFBQSxNQUFNLEFBQUEsU0FBUyxDQUFDO0VBQ2YsS0FBSyxFQUFFLElBQUksR0FDWDs7QUFFRCxBQUFBLE1BQU0sQUFBQSxTQUFTO0FBQ2YsQUFBQSxNQUFNLEFBQUEsT0FBTztBQUNiLEFBQUEsTUFBTSxBQUFBLElBQUk7QUFDVixBQUFjLGFBQUQsQ0FBQyxNQUFNLEFBQUEsT0FBTztBQUMzQixBQUFPLE1BQUQsQ0FBQyxNQUFNLEFBQUEsT0FBTyxDQUFDO0VBQ3BCLEtBQUssRUFBRSxPQUFPO0VBQ2QsVUFBVSxFQUFFLHdCQUFxQixHQUNqQzs7QUFFRCxBQUFBLE1BQU0sQUFBQSxPQUFPO0FBQ2IsQUFBQSxNQUFNLEFBQUEsV0FBVztBQUNqQixBQUFBLE1BQU0sQUFBQSxRQUFRLENBQUM7RUFDZCxLQUFLLEVBQUUsSUFBSSxHQUNYOztBQUVELEFBQUEsTUFBTSxBQUFBLFNBQVMsQ0FBQztFQUNmLEtBQUssRUFBRSxPQUFPLEdBQ2Q7O0FBRUQsQUFBQSxNQUFNLEFBQUEsTUFBTTtBQUNaLEFBQUEsTUFBTSxBQUFBLFVBQVU7QUFDaEIsQUFBQSxNQUFNLEFBQUEsU0FBUyxDQUFDO0VBQ2YsS0FBSyxFQUFFLElBQUksR0FDWDs7QUFFRCxBQUFBLE1BQU0sQUFBQSxVQUFVO0FBQ2hCLEFBQUEsTUFBTSxBQUFBLEtBQUssQ0FBQztFQUNYLFdBQVcsRUFBRSxJQUFJLEdBQ2pCOztBQUNELEFBQUEsTUFBTSxBQUFBLE9BQU8sQ0FBQztFQUNiLFVBQVUsRUFBRSxNQUFNLEdBQ2xCOztBQUVELEFBQUEsTUFBTSxBQUFBLE9BQU8sQ0FBQztFQUNiLE1BQU0sRUFBRSxJQUFJLEdBQ1o7O0FDeElELEFBQUEsR0FBRyxDQUFBLEFBQUEsV0FBQyxDQUFZLE1BQU0sQUFBbEIsRUFBb0I7RUFDdEIsTUFBTSxFQUFFLE9BQU8sR0FDaEI7O0FBQ0QsQUFBQSxTQUFTO0FBQ1QsQUFBQSxjQUFjLENBQUM7RUFDYixRQUFRLEVBQUUsUUFBUTtFQUNsQixPQUFPLEVBQUUsR0FBRztFQUNaLGtCQUFrQixFQUFFLFNBQVM7RUFDeEIsYUFBYSxFQUFFLFNBQVM7RUFDckIsVUFBVSxFQUFFLFNBQVMsR0FDOUI7O0FBQ0QsQUFBQSxHQUFHLEFBQUEsU0FBUyxDQUFDO0VBQ1gsTUFBTSxFQUFFLE9BQU87RUFDZixNQUFNLEVBQUUsZ0JBQWdCO0VBQ3hCLE1BQU0sRUFBRSxhQUFhLEdBQ3RCOztBQUNELEFBQUEsYUFBYSxDQUFDO0VBQ1osT0FBTyxFQUFFLEdBQUc7RUFDWixVQUFVLEVBQUUsSUFBSTtFQUNoQixRQUFRLEVBQUUsS0FBSztFQUNmLEdBQUcsRUFBRSxDQUFDO0VBQ04sSUFBSSxFQUFFLENBQUM7RUFDUCxLQUFLLEVBQUUsQ0FBQztFQUNSLE1BQU0sRUFBRSxDQUFDO0VBQ1QsY0FBYyxFQUFFLElBQUk7RUFDcEIsTUFBTSxFQUFFLGtCQUFrQjtFQUMxQixPQUFPLEVBQUUsQ0FBQztFQUNWLGtCQUFrQixFQUFPLGFBQWE7RUFDakMsYUFBYSxFQUFPLGFBQWE7RUFDOUIsVUFBVSxFQUFPLGFBQWEsR0FDdkM7O0FBQ0QsQUFBbUIsa0JBQUQsQ0FBQyxhQUFhLENBQUM7RUFDL0IsTUFBTSxFQUFFLG9CQUFvQjtFQUM1QixPQUFPLEVBQUUsQ0FBQyxHQUNYOztBQUNELEFBQUEsa0JBQWtCO0FBQ2xCLEFBQUEsMkJBQTJCLENBQUM7RUFDMUIsTUFBTSxFQUFFLE9BQU8sR0FDaEI7O0FDckNELEFBQUEsQ0FBQyxFQUFFLEFBQUEsQ0FBQyxBQUFBLE9BQU8sRUFBRSxBQUFBLENBQUMsQUFBQSxNQUFNLENBQUM7RUFDbkIsVUFBVSxFQUFFLE9BQU8sR0FDcEI7O0FBRUQsQUFBQSxDQUFDLENBQUM7RUFDQSxLQUFLLEVBQUUsT0FBTztFQUNkLGVBQWUsRUFBRSxJQUFJLEdBTXRCO0VBUkQsQUFJRSxDQUpELEFBSUMsT0FBUSxFQUpWLEFBS0UsQ0FMRCxBQUtDLE1BQU8sQ0FBQztJQUNOLE9BQU8sRUFBRSxDQUFDLEdBQ1g7O0FBR0gsQUFBQSxVQUFVLENBQUM7RUFDVCxXQUFXLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBYztFQUNyQyxXQUFXLEVMMEJLLGFBQWEsRUFBRSxLQUFLO0VLekJwQyxTQUFTLEVBQUUsSUFBSTtFQUNmLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLGNBQWMsRUFBRSxPQUFPO0VBQ3ZCLFdBQVcsRUFBRSxJQUFJO0VBQ2pCLFdBQVcsRUFBRSxLQUFLO0VBQ2xCLGNBQWMsRUFBRSxHQUFHO0VBQ25CLFlBQVksRUFBRSxJQUFJLEdBQ25COztBQUVELEFBQUEsSUFBSSxDQUFDO0VBQ0gsS0FBSyxFTHBCZ0Isa0JBQWlCO0VLcUJ0QyxXQUFXLEVMWUssaUJBQWlCLEVBQUUsVUFBVTtFS1g3QyxTQUFTLEVMdUJPLElBQUk7RUt0QnBCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLGNBQWMsRUFBRSxDQUFDO0VBQ2pCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLE1BQU0sRUFBRSxNQUFNO0VBQ2QsY0FBYyxFQUFFLGtCQUFrQixHQUNuQzs7QUFHRCxBQUFBLElBQUksQ0FBQztFQUNILFVBQVUsRUFBRSxVQUFVO0VBQ3RCLFNBQVMsRUxTTyxJQUFJLEdLUnJCOztBQUVELEFBQUEsTUFBTSxDQUFDO0VBQ0wsTUFBTSxFQUFFLENBQUMsR0FDVjs7QUFJRCxBQUFBLEdBQUcsRUFBRSxBQUFBLElBQUksRUFBRSxBQUFBLElBQUksQ0FBQztFQUNkLFVBQVUsRUxtRU0sT0FBTztFS2xFdkIsYUFBYSxFQUFFLEdBQUc7RUFDbEIsS0FBSyxFTG1FVyxPQUFPO0VLbEV2QixXQUFXLEVMWkssaUJBQWlCLEVBQUUsU0FBUyxDS1lwQixVQUFVO0VBQ2xDLFNBQVMsRUxnRU8sSUFBSTtFSy9EcEIsT0FBTyxFQUFFLE9BQU87RUFDaEIsV0FBVyxFQUFFLFFBQVEsR0FDdEI7O0FBRUQsQUFBQSxHQUFHLENBQUM7RUFDRixnQkFBZ0IsRUx5REEsT0FBTyxDS3pEVSxVQUFVO0VBQzNDLGFBQWEsRUFBRSxHQUFHO0VBQ2xCLFdBQVcsRUxyQkssaUJBQWlCLEVBQUUsU0FBUyxDS3FCcEIsVUFBVTtFQUNsQyxTQUFTLEVMdURPLElBQUk7RUt0RHBCLFVBQVUsRUFBRSxlQUFlO0VBQzNCLFFBQVEsRUFBRSxNQUFNO0VBQ2hCLE9BQU8sRUFBRSxJQUFJO0VBQ2IsUUFBUSxFQUFFLFFBQVE7RUFDbEIsU0FBUyxFQUFFLE1BQU0sR0FRbEI7RUFqQkQsQUFXRSxHQVhDLENBV0QsSUFBSSxDQUFDO0lBQ0gsVUFBVSxFQUFFLFdBQVc7SUFDdkIsS0FBSyxFTGdEUyxPQUFPO0lLL0NyQixPQUFPLEVBQUUsQ0FBQztJQUNWLFdBQVcsRUFBRSxVQUFVLEdBQ3hCOztBQUlILEFBQUEsSUFBSSxDQUFBLEFBQUEsS0FBQyxFQUFELFNBQUMsQUFBQTtBQUNMLEFBQUEsR0FBRyxDQUFBLEFBQUEsS0FBQyxFQUFELFNBQUMsQUFBQSxFQUFrQjtFQUNwQixLQUFLLEVMdUNXLE9BQU87RUt0Q3ZCLFdBQVcsRUFBRSxHQUFHLEdBSWpCO0VBUEQsQUFLRSxJQUxFLENBQUEsQUFBQSxLQUFDLEVBQUQsU0FBQyxBQUFBLEVBS0gsTUFBTSxBQUFBLFFBQVE7RUFKaEIsQUFJRSxHQUpDLENBQUEsQUFBQSxLQUFDLEVBQUQsU0FBQyxBQUFBLEVBSUYsTUFBTSxBQUFBLFFBQVEsQ0FBQztJQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUs7O0FBT25DLEFBQUEsRUFBRSxDQUFDO0VBQ0QsTUFBTSxFQUFFLENBQUM7RUFDVCxPQUFPLEVBQUUsS0FBSztFQUNkLE1BQU0sRUFBRSxTQUFTO0VBQ2pCLFVBQVUsRUFBRSxNQUFNLEdBYW5CO0VBakJELEFBTUUsRUFOQSxBQU1BLFFBQVMsQ0FBQztJQUNSLEtBQUssRUFBRSxrQkFBaUI7SUFDeEIsT0FBTyxFQUFFLEtBQUs7SUFDZCxPQUFPLEVBQUUsWUFBWTtJQUNyQixXQUFXLEVMOURHLGlCQUFpQixFQUFFLFVBQVU7SUsrRDNDLFNBQVMsRUFBRSxJQUFJO0lBQ2YsV0FBVyxFQUFFLEdBQUc7SUFDaEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsR0FBRyxFQUFFLEtBQUssR0FDWDs7QUFHSCxBQUFBLEdBQUcsQ0FBQztFQUNGLE1BQU0sRUFBRSxJQUFJO0VBQ1osU0FBUyxFQUFFLElBQUk7RUFDZixjQUFjLEVBQUUsTUFBTTtFQUN0QixLQUFLLEVBQUUsSUFBSSxHQUtaO0VBVEQsQUFNRSxHQU5DLEFBTUQsSUFBTSxFQUFBLEFBQUEsQUFBQSxHQUFDLEFBQUEsR0FBTTtJQUNYLFVBQVUsRUFBRSxNQUFNLEdBQ25COztBQUdILEFBQUEsQ0FBQyxDQUFDO0VBRUEsY0FBYyxFQUFFLE1BQU0sR0FDdkI7O0FBRUQsQUFBQSxFQUFFLEVBQUUsQUFBQSxFQUFFLENBQUM7RUFDTCxnQkFBZ0IsRUFBRSxJQUFJO0VBQ3RCLFVBQVUsRUFBRSxJQUFJO0VBQ2hCLE1BQU0sRUFBRSxDQUFDO0VBQ1QsT0FBTyxFQUFFLENBQUMsR0FDWDs7QUFFRCxBQUFBLElBQUksQ0FBQztFQUNILGdCQUFnQixFQUFFLHNCQUFzQjtFQUN4QyxnQkFBZ0IsRUFBRSw0Q0FBMEU7RUFDNUYsS0FBSyxFQUFFLGtCQUFpQixHQUN6Qjs7QUFFRCxBQUFBLENBQUMsQ0FBQztFQUNBLEtBQUssRUFBRSxtQkFBa0I7RUFDekIsT0FBTyxFQUFFLEtBQUs7RUFDZCxTQUFTLEVBQUUsSUFBSTtFQUNmLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLGNBQWMsRUFBRSxPQUFPO0VBQ3ZCLFdBQVcsRUFBRSxJQUFJO0VBQ2pCLFlBQVksRUFBRSxJQUFJO0VBQ2xCLFdBQVcsRUFBRSxJQUFJO0VBQ2pCLFVBQVUsRUFBRSxJQUFJLEdBR2pCO0VBYkQsQUFZRSxDQVpELEFBWUMsT0FBUSxFQVpWLEFBWVksQ0FaWCxBQVlXLE1BQU8sQ0FBQztJQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUk7O0FBYXRDLEFBQUEsS0FBSztBQUNMLEFBQUEsT0FBTyxDQUFDO0VBQUMsVUFBVSxFQUFFLGtCQUFrQixHQUFLOztBQUU1QyxNQUFNLE1BQU0sTUFBTSxNQUFNLFNBQVMsRUFBRyxLQUFLO0VBQ3ZDLEFBQUEsS0FBSyxDQUFDO0lBQ0osUUFBUSxFQUFFLE1BQU07SUFDaEIsV0FBVyxFTGxGUSxJQUFJLEdLbUZ4Qjs7QUFLSCxBQUFBLFFBQVEsQ0FBQztFQUNQLFVBQVUsRUFBRSxPQUFPO0VBQ25CLEtBQUssRUFBRSxPQUFPLEdBRWY7RUFKRCxBQUdFLFFBSE0sQUFHTixRQUFTLENBQUM7SUFBQyxPQUFPLEVMdERSLEtBQU8sR0tzRGdCOztBQUduQyxBQUFBLEtBQUssQ0FBQztFQUNKLFVBQVUsRUFBRSxPQUFPO0VBQ25CLEtBQUssRUFBRSxPQUFPLEdBRWY7RUFKRCxBQUdFLEtBSEcsQUFHSCxRQUFTLENBQUM7SUFBQyxPQUFPLEVMMURYLEtBQU8sR0swRGdCOztBQUdoQyxBQUFBLFFBQVEsQ0FBQztFQUNQLFVBQVUsRUFBRSxPQUFPO0VBQ25CLEtBQUssRUFBRSxPQUFPLEdBRWY7RUFKRCxBQUdFLFFBSE0sQUFHTixRQUFTLENBQUM7SUFBQyxLQUFLLEVBQUUsT0FBTztJQUFHLE9BQU8sRUxqRTNCLEtBQU8sR0tpRWlDOztBQUdsRCxBQUFBLFFBQVEsRUFBRSxBQUFBLEtBQUssRUFBRSxBQUFBLFFBQVEsQ0FBQTtFQUN2QixPQUFPLEVBQUUsS0FBSztFQUNkLFNBQVMsRUFBRSxlQUFlO0VBQzFCLFdBQVcsRUFBRSxlQUFlO0VBQzVCLFVBQVUsRUFBRSxJQUFJO0VBQ2hCLE9BQU8sRUFBRSxtQkFBbUIsR0FjN0I7RUFuQkQsQUFPRSxRQVBNLENBT04sQ0FBQyxFQVBPLEFBT1IsS0FQYSxDQU9iLENBQUMsRUFQYyxBQU9mLFFBUHVCLENBT3ZCLENBQUMsQ0FBQztJQUNBLEtBQUssRUFBRSxPQUFPO0lBQ2QsZUFBZSxFQUFFLFNBQVMsR0FDM0I7RUFWSCxBQVlFLFFBWk0sQUFZUixRQUFXLEVBWkQsQUFZUixLQVphLEFBWWYsUUFBVyxFQVpNLEFBWWYsUUFadUIsQUFZekIsUUFBVyxDQUFDO0lBRVIsS0FBSyxFQUFFLElBQUk7SUFDWCxTQUFTLEVBQUUsSUFBSTtJQUNmLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLFVBQVUsRUFBRSxJQUFJLEdBQ2pCOztBQUtILEFBQUEsSUFBSSxDQUFDO0VBQ0gsS0FBSyxFQUFFLElBQUk7RUFDWCxVQUFVLEVBQUUsS0FBSztFQUNqQixPQUFPLEVBQUUsQ0FBQyxHQVlYO0VBVkMsQUFBQSxTQUFNLENBQUM7SUFBQyxPQUFPLEVBQUUsQ0FBQyxHQUFJO0VBTHhCLEFBT0UsSUFQRSxBQU9GLFdBQVksQ0FBQztJQUVYLFVBQVUsRUFBRSxJQUFJLEdBQ2pCO0VBRUQsQUFBQSxnQkFBYSxDQUFDO0lBQ1osU0FBUyxFQUFFLEtBQUssR0FDakI7O0FBTUgsQUFBQSxhQUFhLENBQUM7RUFDWixRQUFRLEVBQUUsT0FBTztFQUNqQixRQUFRLEVBQUUsUUFBUSxHQTJCbkI7RUE3QkQsQUFJRSxhQUpXLEFBSVgsTUFBTyxDQUFDO0lBQ04sVUFBVSxFQUFFLG1CQUFrQjtJQUM5QixhQUFhLEVBQUUsR0FBRztJQUNsQixLQUFLLEVBQUUsSUFBSTtJQUNYLE9BQU8sRUFBRSxrQkFBa0I7SUFDM0IsT0FBTyxFQUFFLFlBQVk7SUFDckIsU0FBUyxFQUFFLElBQUk7SUFDZixXQUFXLEVBQUUsR0FBRztJQUNoQixJQUFJLEVBQUUsR0FBRztJQUNULFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsT0FBTyxFQUFFLE9BQU87SUFDaEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsVUFBVSxFQUFFLE1BQU07SUFDbEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsR0FBRyxFQUFFLEtBQUs7SUFDVixXQUFXLEVBQUUsa0JBQWtCO0lBQy9CLE9BQU8sRUFBRSxDQUFDLEdBQ1g7RUF4QkgsQUEwQkUsYUExQlcsQUEwQlgsTUFBTyxBQUFBLE1BQU0sQ0FBQztJQUNaLFNBQVMsRUFBRSx5QkFBeUIsR0FDckM7O0FBS0gsQUFBQSxPQUFPLENBQUM7RUFDTixLQUFLLEVBQUUsbUJBQWtCLEdBTTFCO0VBUEQsQUFHRSxPQUhLLENBR0wsQ0FBQyxDQUFDO0lBQ0EsS0FBSyxFQUFFLGtCQUFpQixHQUV6QjtJQU5ILEFBR0UsT0FISyxDQUdMLENBQUMsQUFFQyxNQUFPLENBQUM7TUFBQyxLQUFLLEVBQUUsa0JBQWlCLEdBQUc7O0FBTXhDLEFBQUEsVUFBVSxDQUFDO0VBQ1QsV0FBVyxFQUFFLHdCQUF3QjtFQUNyQyxNQUFNLEVBQUUsS0FBSztFQUNiLEtBQUssRUFBRSxJQUFJLEdBcUJaO0VBbkJDLEFBQUEsZUFBTSxDQUFDO0lBQ0wsSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsU0FBUztJQUNsQixHQUFHLEVBQUUsSUFBSSxHQUNWO0VBRUQsQUFBQSxlQUFNLENBQUM7SUFDTCxVQUFVLEVBQUUsSUFBSTtJQUNoQixXQUFXLEVBQUUsUUFBUSxHQUN0QjtFQUVELEFBQUEsZUFBTSxDQUFDO0lBQ0wsS0FBSyxFQUFFLGtCQUFpQjtJQUN4QixJQUFJLEVBQUUsR0FBRztJQUNULFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLEdBQUcsRUFBRSxHQUFHO0lBQ1IsU0FBUyxFQUFFLHFCQUFxQixHQUNqQzs7QUFNSCxBQUFBLGlCQUFpQixDQUFDO0VBQ2hCLE9BQU8sRUFBRSxLQUFLO0VBQ2QsTUFBTSxFQUFFLENBQUM7RUFDVCxVQUFVLEVBQUUsSUFBSTtFQUNoQixRQUFRLEVBQUUsTUFBTTtFQUNoQixPQUFPLEVBQUUsVUFBVTtFQUNuQixRQUFRLEVBQUUsUUFBUSxHQXFCbkI7RUEzQkQsQUFRRSxpQkFSZSxDQVFmLE1BQU0sQ0FBQztJQUNMLE1BQU0sRUFBRSxDQUFDO0lBQ1QsTUFBTSxFQUFFLENBQUM7SUFDVCxNQUFNLEVBQUUsSUFBSTtJQUNaLElBQUksRUFBRSxDQUFDO0lBQ1AsUUFBUSxFQUFFLFFBQVE7SUFDbEIsR0FBRyxFQUFFLENBQUM7SUFDTixLQUFLLEVBQUUsSUFBSSxHQUNaO0VBaEJILEFBa0JFLGlCQWxCZSxDQWtCZixLQUFLLENBQUM7SUFDSixNQUFNLEVBQUUsQ0FBQztJQUNULE1BQU0sRUFBRSxDQUFDO0lBQ1QsTUFBTSxFQUFFLElBQUk7SUFDWixJQUFJLEVBQUUsQ0FBQztJQUNQLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLEdBQUcsRUFBRSxDQUFDO0lBQ04sS0FBSyxFQUFFLElBQUksR0FDWjs7QUFPRCxBQUFBLFdBQVcsQ0FBUTtFQUFFLEtBQUssRUxyVWQsT0FBTyxDS3FVZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFlBQVksRWUvVFosQWYrVEEsZWUvVFEsQ0FpQkosV0FBVyxDZjhTSztFQUFFLGdCQUFnQixFTHRVMUIsT0FBTyxDS3NVNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFVBQVUsQ0FBUztFQUFFLEtBQUssRUxwVWQsT0FBTyxDS29VZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFdBQVcsRWUvVFgsQWYrVEEsZWUvVFEsQ0FpQkosVUFBVSxDZjhTTTtFQUFFLGdCQUFnQixFTHJVMUIsT0FBTyxDS3FVNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFNBQVMsQ0FBVTtFQUFFLEtBQUssRUxuVWQsT0FBTyxDS21VZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFVBQVUsRWUvVFYsQWYrVEEsZWUvVFEsQ0FpQkosU0FBUyxDZjhTTztFQUFFLGdCQUFnQixFTHBVMUIsT0FBTyxDS29VNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFlBQVksQ0FBTztFQUFFLEtBQUssRUxsVWQsT0FBTyxDS2tVZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLGFBQWEsRWUvVGIsQWYrVEEsZWUvVFEsQ0FpQkosWUFBWSxDZjhTSTtFQUFFLGdCQUFnQixFTG5VMUIsT0FBTyxDS21VNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFVBQVUsQ0FBUztFQUFFLEtBQUssRUxqVWQsT0FBTyxDS2lVZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFdBQVcsRWUvVFgsQWYrVEEsZWUvVFEsQ0FpQkosVUFBVSxDZjhTTTtFQUFFLGdCQUFnQixFTGxVMUIsT0FBTyxDS2tVNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFNBQVMsQ0FBVTtFQUFFLEtBQUssRUxoVWQsSUFBSSxDS2dVbUIsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFVBQVUsRWUvVFYsQWYrVEEsZWUvVFEsQ0FpQkosU0FBUyxDZjhTTztFQUFFLGdCQUFnQixFTGpVMUIsSUFBSSxDS2lVK0IsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFdBQVcsQ0FBUTtFQUFFLEtBQUssRUwvVGQsT0FBTyxDSytUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFlBQVksRWUvVFosQWYrVEEsZWUvVFEsQ0FpQkosV0FBVyxDZjhTSztFQUFFLGdCQUFnQixFTGhVMUIsT0FBTyxDS2dVNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFVBQVUsQ0FBUztFQUFFLEtBQUssRUw5VGQsT0FBTyxDSzhUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFdBQVcsRWUvVFgsQWYrVEEsZWUvVFEsQ0FpQkosVUFBVSxDZjhTTTtFQUFFLGdCQUFnQixFTC9UMUIsT0FBTyxDSytUNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFVBQVUsQ0FBUztFQUFFLEtBQUssRUw3VGQsSUFBSSxDSzZUbUIsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFdBQVcsRWUvVFgsQWYrVEEsZWUvVFEsQ0FpQkosVUFBVSxDZjhTTTtFQUFFLGdCQUFnQixFTDlUMUIsSUFBSSxDSzhUK0IsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFVBQVUsQ0FBUztFQUFFLEtBQUssRUw1VGQsT0FBTyxDSzRUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFdBQVcsRWUvVFgsQWYrVEEsZWUvVFEsQ0FpQkosVUFBVSxDZjhTTTtFQUFFLGdCQUFnQixFTDdUMUIsT0FBTyxDSzZUNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFdBQVcsQ0FBUTtFQUFFLEtBQUssRUwzVGQsT0FBTyxDSzJUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFlBQVksRWUvVFosQWYrVEEsZWUvVFEsQ0FpQkosV0FBVyxDZjhTSztFQUFFLGdCQUFnQixFTDVUMUIsT0FBTyxDSzRUNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFNBQVMsQ0FBVTtFQUFFLEtBQUssRUwxVGQsT0FBTyxDSzBUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFVBQVUsRWUvVFYsQWYrVEEsZWUvVFEsQ0FpQkosU0FBUyxDZjhTTztFQUFFLGdCQUFnQixFTDNUMUIsT0FBTyxDSzJUNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFNBQVMsQ0FBVTtFQUFFLEtBQUssRUx6VGQsT0FBTyxDS3lUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFVBQVUsRWUvVFYsQWYrVEEsZWUvVFEsQ0FpQkosU0FBUyxDZjhTTztFQUFFLGdCQUFnQixFTDFUMUIsT0FBTyxDSzBUNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFNBQVMsQ0FBVTtFQUFFLEtBQUssRUx4VGQsT0FBTyxDS3dUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFVBQVUsRWUvVFYsQWYrVEEsZWUvVFEsQ0FpQkosU0FBUyxDZjhTTztFQUFFLGdCQUFnQixFTHpUMUIsT0FBTyxDS3lUNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFlBQVksQ0FBTztFQUFFLEtBQUssRUx2VGQsT0FBTyxDS3VUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLGFBQWEsRWUvVGIsQWYrVEEsZWUvVFEsQ0FpQkosWUFBWSxDZjhTSTtFQUFFLGdCQUFnQixFTHhUMUIsT0FBTyxDS3dUNEIsVUFBVSxHQUFJOztBQUQ3RCxBQUFBLFdBQVcsQ0FBUTtFQUFFLEtBQUssRUx0VGQsT0FBTyxDS3NUZ0IsVUFBVSxHQUFHOztBQUNoRCxBQUFBLFlBQVksRWUvVFosQWYrVEEsZWUvVFEsQ0FpQkosV0FBVyxDZjhTSztFQUFFLGdCQUFnQixFTHZUMUIsT0FBTyxDS3VUNEIsVUFBVSxHQUFJOztBQU83RCxBQUFBLGdCQUFVLENBQUM7RUFDVCxnQkFBZ0IsRUFBRSxJQUFJO0VBQ3RCLE1BQU0sRUFBRSxpQkFBaUI7RUFDekIsTUFBTSxFQUFFLElBQUk7RUFDWixPQUFPLEVBQUUsSUFBSTtFQUNiLFNBQVMsRUFBRSxLQUFLO0VBQ2hCLFNBQVMsRUFBRSxLQUFLO0VBQ2hCLE9BQU8sRUFBRSxHQUFHO0VBQ1osU0FBUyxFQUFFLGtCQUFrQjtFQUM3QixPQUFPLEVBQUUsRUFBRSxHQUdaO0VBWkQsQUFXRSxnQkFYUSxBQVdSLFdBQVksQ0FBQztJQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUs7O0FBTXJDLEFBQUEsT0FBTyxDQUFDO0VBQ04sTUFBTSxFQUFFLElBQUk7RUFDWixRQUFRLEVBQUUsS0FBSztFQUNmLEtBQUssRUFBRSxJQUFJO0VBQ1gsVUFBVSxFQUFFLE1BQU07RUFDbEIsT0FBTyxFQUFFLEdBQUc7RUFDWixLQUFLLEVBQUUsSUFBSSxHQUtaO0VBWEQsQUFRYyxPQVJQLEFBUUwsTUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDZixJQUFJLEVBQUUsa0JBQWlCLEdBQ3hCOztBQUdILEFBQ0UsU0FETyxDQUNQLEdBQUcsQ0FBQztFQUNGLEtBQUssRUFBRSxJQUFJO0VBQ1gsTUFBTSxFQUFFLElBQUksR0FDYjs7QUFLSCxBQUFBLFNBQVMsQ0FBQztFQUNSLE9BQU8sRUFBRSxLQUFLO0VBQ2QsU0FBUyxFQUFFLElBQUk7RUFDZixNQUFNLEVBQUUsTUFBTTtFQUNkLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLFdBQVcsRUFBRSxJQUFJO0VBQ2pCLFVBQVUsRUFBRSxNQUFNLEdBQ25COztBQUdELEFBQUEsV0FBVyxDQUFDO0VBQ1YsT0FBTyxFQUFFLElBQUk7RUFDYixNQUFNLEVBQUUsR0FBRztFQUNYLElBQUksRUFBRSxDQUFDO0VBQ1AsUUFBUSxFQUFFLEtBQUs7RUFDZixLQUFLLEVBQUUsQ0FBQztFQUNSLEdBQUcsRUFBRSxDQUFDO0VBQ04sU0FBUyxFQUFFLGdCQUFnQjtFQUMzQixPQUFPLEVBQUUsR0FBRyxHQUNiOztBQUVELEFBQVksV0FBRCxDQUFDLFdBQVcsQ0FBQztFQUN0QixlQUFlLEVBQUUsR0FBRztFQUNwQixTQUFTLEVBQUUsbUNBQW1DO0VBQzlDLE9BQU8sRUFBRSxLQUFLLEdBQ2Y7O0FDaGFELEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRTtBQUN0QixBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsQ0FBQztFQUMzQixLQUFLLEVObUVvQixPQUFPO0VNbEVoQyxXQUFXLEVOcUNLLGlCQUFpQixFQUFFLFVBQVU7RU1wQzdDLFdBQVcsRU4rRGMsR0FBRztFTTlENUIsV0FBVyxFTitEYyxHQUFHO0VNOUQ1QixNQUFNLEVBQUUsQ0FBQyxHQU1WO0VBWkQsQUFRRSxFQVJBLENBUUEsQ0FBQyxFQVJDLEFBUUYsRUFSSSxDQVFKLENBQUMsRUFSSyxBQVFOLEVBUlEsQ0FRUixDQUFDLEVBUlMsQUFRVixFQVJZLENBUVosQ0FBQyxFQVJhLEFBUWQsRUFSZ0IsQ0FRaEIsQ0FBQyxFQVJpQixBQVFsQixFQVJvQixDQVFwQixDQUFDO0VBUEgsQUFPRSxHQVBDLENBT0QsQ0FBQyxFQVBFLEFBT0gsR0FQTSxDQU9OLENBQUMsRUFQTyxBQU9SLEdBUFcsQ0FPWCxDQUFDLEVBUFksQUFPYixHQVBnQixDQU9oQixDQUFDLEVBUGlCLEFBT2xCLEdBUHFCLENBT3JCLENBQUMsRUFQc0IsQUFPdkIsR0FQMEIsQ0FPMUIsQ0FBQyxDQUFDO0lBQ0EsS0FBSyxFQUFFLE9BQU87SUFDZCxXQUFXLEVBQUUsT0FBTyxHQUNyQjs7QUFHSCxBQUFBLEVBQUUsQ0FBQztFQUFFLFNBQVMsRU4yQ0ksT0FBTyxHTTNDUTs7QUFDakMsQUFBQSxFQUFFLENBQUM7RUFBRSxTQUFTLEVOMkNJLFFBQVEsR00zQ087O0FBQ2pDLEFBQUEsRUFBRSxDQUFDO0VBQUUsU0FBUyxFTjJDSSxTQUFTLEdNM0NNOztBQUNqQyxBQUFBLEVBQUUsQ0FBQztFQUFFLFNBQVMsRU4yQ0ksUUFBUSxHTTNDTzs7QUFDakMsQUFBQSxFQUFFLENBQUM7RUFBRSxTQUFTLEVOMkNJLFFBQVEsR00zQ087O0FBQ2pDLEFBQUEsRUFBRSxDQUFDO0VBQUUsU0FBUyxFTjJDSSxJQUFJLEdNM0NXOztBQUtqQyxBQUFBLEdBQUcsQ0FBQztFQUFFLFNBQVMsRU5pQ0csT0FBTyxHTWpDUzs7QUFDbEMsQUFBQSxHQUFHLENBQUM7RUFBRSxTQUFTLEVOaUNHLFFBQVEsR01qQ1E7O0FBQ2xDLEFBQUEsR0FBRyxDQUFDO0VBQUUsU0FBUyxFTmlDRyxTQUFTLEdNakNPOztBQUNsQyxBQUFBLEdBQUcsQ0FBQztFQUFFLFNBQVMsRU5pQ0csUUFBUSxHTWpDUTs7QUFDbEMsQUFBQSxHQUFHLENBQUM7RUFBRSxTQUFTLEVOaUNHLFFBQVEsR01qQ1E7O0FBQ2xDLEFBQUEsR0FBRyxDQUFDO0VBQUUsU0FBUyxFTmlDRyxJQUFJLEdNakNZOztBQUdsQyxBQUFBLENBQUMsQ0FBQztFQUNBLE1BQU0sRUFBRSxDQUFDLEdBQ1Y7O0FBbENELEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRSxFQUFFLEFBQUEsRUFBRTtBQUN0QixBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsRUFBRSxBQUFBLEdBQUcsQ0FBQztFQUMzQixLQUFLLEVObUVvQixPQUFPO0VNbEVoQyxXQUFXLEVOcUNLLGlCQUFpQixFQUFFLFVBQVU7RU1wQzdDLFdBQVcsRU4rRGMsR0FBRztFTTlENUIsV0FBVyxFTitEYyxHQUFHO0VNOUQ1QixNQUFNLEVBQUUsQ0FBQyxHQU1WO0VBWkQsQUFRRSxFQVJBLENBUUEsQ0FBQyxFQVJDLEFBUUYsRUFSSSxDQVFKLENBQUMsRUFSSyxBQVFOLEVBUlEsQ0FRUixDQUFDLEVBUlMsQUFRVixFQVJZLENBUVosQ0FBQyxFQVJhLEFBUWQsRUFSZ0IsQ0FRaEIsQ0FBQyxFQVJpQixBQVFsQixFQVJvQixDQVFwQixDQUFDO0VBUEgsQUFPRSxHQVBDLENBT0QsQ0FBQyxFQVBFLEFBT0gsR0FQTSxDQU9OLENBQUMsRUFQTyxBQU9SLEdBUFcsQ0FPWCxDQUFDLEVBUFksQUFPYixHQVBnQixDQU9oQixDQUFDLEVBUGlCLEFBT2xCLEdBUHFCLENBT3JCLENBQUMsRUFQc0IsQUFPdkIsR0FQMEIsQ0FPMUIsQ0FBQyxDQUFDO0lBQ0EsS0FBSyxFQUFFLE9BQU87SUFDZCxXQUFXLEVBQUUsT0FBTyxHQUNyQjs7QUFHSCxBQUFBLEVBQUUsQ0FBQztFQUFFLFNBQVMsRU4yQ0ksT0FBTyxHTTNDUTs7QUFDakMsQUFBQSxFQUFFLENBQUM7RUFBRSxTQUFTLEVOMkNJLFFBQVEsR00zQ087O0FBQ2pDLEFBQUEsRUFBRSxDQUFDO0VBQUUsU0FBUyxFTjJDSSxTQUFTLEdNM0NNOztBQUNqQyxBQUFBLEVBQUUsQ0FBQztFQUFFLFNBQVMsRU4yQ0ksUUFBUSxHTTNDTzs7QUFDakMsQUFBQSxFQUFFLENBQUM7RUFBRSxTQUFTLEVOMkNJLFFBQVEsR00zQ087O0FBQ2pDLEFBQUEsRUFBRSxDQUFDO0VBQUUsU0FBUyxFTjJDSSxJQUFJLEdNM0NXOztBQUtqQyxBQUFBLEdBQUcsQ0FBQztFQUFFLFNBQVMsRU5pQ0csT0FBTyxHTWpDUzs7QUFDbEMsQUFBQSxHQUFHLENBQUM7RUFBRSxTQUFTLEVOaUNHLFFBQVEsR01qQ1E7O0FBQ2xDLEFBQUEsR0FBRyxDQUFDO0VBQUUsU0FBUyxFTmlDRyxTQUFTLEdNakNPOztBQUNsQyxBQUFBLEdBQUcsQ0FBQztFQUFFLFNBQVMsRU5pQ0csUUFBUSxHTWpDUTs7QUFDbEMsQUFBQSxHQUFHLENBQUM7RUFBRSxTQUFTLEVOaUNHLFFBQVEsR01qQ1E7O0FBQ2xDLEFBQUEsR0FBRyxDQUFDO0VBQUUsU0FBUyxFTmlDRyxJQUFJLEdNakNZOztBQUdsQyxBQUFBLENBQUMsQ0FBQztFQUNBLE1BQU0sRUFBRSxDQUFDLEdBQ1Y7O0FFbkNELEFBQUEsa0JBQWtCLENBQUM7RUFDakIsS0FBSyxFQUFFLG1CQUFrQjtFQUN6QixJQUFJLEVBQUUsbUJBQWtCLEdBQ3pCOztBQUVELEFBQUEsbUJBQW1CLEFBQUEsTUFBTSxDQUFDO0VBQ3hCLEtBQUssRUFBRSxrQkFBaUI7RUFDeEIsSUFBSSxFQUFFLGtCQUFpQixHQUN4Qjs7QUFHRCxBQUFBLFVBQVUsQ0FBQztFQUFFLGdCQUFnQixFUlRiLE9BQU8sR1FTMEI7O0FBRWpELEFBQW1CLGtCQUFELENBQUMsQ0FBQyxDQUFDO0VBQ25CLEtBQUssRVIwRVEsT0FBTyxHUXRFckI7RUFMRCxBQUFtQixrQkFBRCxDQUFDLENBQUMsQUFFbEIsT0FBUSxFQUZWLEFBQW1CLGtCQUFELENBQUMsQ0FBQyxBQUdsQixNQUFPLENBQUM7SUFBRSxLQUFLLEVSeUVJLE9BQU8sR1F6RWM7O0FBTzFDLEFBQUEsV0FBVyxDQUFDO0VBQUUsUUFBUSxFQUFFLFFBQVEsR0FBSzs7QUFDckMsQUFBQSxXQUFXLENBQUM7RUFBRSxRQUFRLEVBQUUsUUFBUSxHQUFLOztBQUdyQyxBQUFBLFFBQVEsQ0FBQztFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsR0FBRzs7QUFHdEMsQUFBQSxpQkFBaUIsQ0FBQztFQUNoQixVQUFVLEVBQUUsMEVBQXdFO0VBQ3BGLE1BQU0sRUFBRSxDQUFDO0VBQ1QsSUFBSSxFQUFFLENBQUM7RUFDUCxRQUFRLEVBQUUsUUFBUTtFQUNsQixLQUFLLEVBQUUsQ0FBQztFQUNSLEdBQUcsRUFBRSxDQUFDO0VBQ04sT0FBTyxFQUFFLENBQUMsR0FDWDs7QUFHRCxBQUFBLGtCQUFrQixDQUFDO0VBQUMsZ0JBQWdCLEVBQUUsT0FBTyxHQUFJOztBQUNqRCxBQUFBLDJCQUEyQixDQUFDO0VBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLEdBQUk7O0FBR3JFLEFBQ0UsUUFETSxBQUNOLFFBQVMsRUFEWCxBQUVFLFFBRk0sQUFFTixPQUFRLENBQUM7RUFDUCxPQUFPLEVBQUUsR0FBRztFQUNaLE9BQU8sRUFBRSxLQUFLLEdBQ2Y7O0FBTEgsQUFNRSxRQU5NLEFBTU4sT0FBUSxDQUFDO0VBQUMsS0FBSyxFQUFFLElBQUksR0FBSTs7QUFJM0IsQUFBQSxhQUFhLENBQUM7RUFBQyxTQUFTLEVBQUUsSUFBSSxHQUFHOztBQUNqQyxBQUFBLGFBQWEsQ0FBQztFQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUc7O0FBQ2pDLEFBQUEsYUFBYSxDQUFDO0VBQUMsU0FBUyxFQUFFLElBQUksR0FBRzs7QUFDakMsQUFBQSxhQUFhLENBQUM7RUFBQyxTQUFTLEVBQUUsSUFBSSxHQUFHOztBQUNqQyxBQUFBLGFBQWEsQ0FBQztFQUFDLFNBQVMsRUFBRSxlQUFlLEdBQUk7O0FBQzdDLEFBQUEsYUFBYSxDQUFDO0VBQUMsU0FBUyxFQUFFLElBQUksR0FBRzs7QUFDakMsQUFBQSxhQUFhLENBQUM7RUFBQyxTQUFTLEVBQUUsSUFBSSxHQUFHOztBQUNqQyxBQUFBLGVBQWUsQ0FBQztFQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUc7O0FBQ25DLEFBQUEsZ0JBQWdCLENBQUM7RUFBQyxTQUFTLEVBQUUsSUFBSSxHQUFHOztBQUNwQyxBQUFBLGdCQUFnQixDQUFDO0VBQUMsU0FBUyxFQUFFLGVBQWUsR0FBRzs7QUFDL0MsQUFBQSxpQkFBaUIsQ0FBQztFQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUc7O0FBQ3JDLEFBQUEsa0JBQWtCLENBQUM7RUFBQyxTQUFTLEVBQUUsSUFBSSxHQUFHOztBQUN0QyxBQUFBLGdCQUFnQixDQUFDO0VBQUMsU0FBUyxFQUFFLElBQUksR0FBRzs7QUFDcEMsQUFBQSxnQkFBZ0IsQ0FBQztFQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUc7O0FBQ3BDLEFBQUEsa0JBQWtCLENBQUM7RUFBQyxTQUFTLEVBQUUsSUFBSSxHQUFHOztBQUN0QyxBQUFBLG1CQUFtQixDQUFDO0VBQUMsU0FBUyxFQUFFLElBQUksR0FBRzs7QUFFdkMsTUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUcsS0FBSztFQUN2QyxBQUFBLGtCQUFrQixDQUFDO0lBQUMsU0FBUyxFQUFFLGVBQWUsR0FBRztFQUNqRCxBQUFBLG9CQUFvQixDQUFDO0lBQUMsU0FBUyxFQUFFLElBQUksR0FBRzs7QUFnQjFDLEFBQUEsaUJBQWlCLENBQUM7RUFBQyxXQUFXLEVBQUUsR0FBRyxHQUFHOztBQUN0QyxBQUFBLG1CQUFtQixDQUFDO0VBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRzs7QUFDeEMsQUFBQSxtQkFBbUIsQ0FBQztFQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUc7O0FBQ3hDLEFBQUEscUJBQXFCLENBQUM7RUFBQyxXQUFXLEVBQUUsR0FBRyxHQUFHOztBQUMxQyxBQUFBLGlCQUFpQixDQUFDO0VBQUMsV0FBVyxFQUFFLGNBQWMsR0FBRzs7QUFFakQsQUFBQSxnQkFBZ0IsQ0FBQztFQUFDLGNBQWMsRUFBRSxTQUFTLEdBQUc7O0FBQzlDLEFBQUEsa0JBQWtCLENBQUM7RUFBQyxVQUFVLEVBQUUsTUFBTSxHQUFHOztBQUd6QyxBQUFBLHFCQUFxQixDQUFDO0VBQ3BCLFFBQVEsRUFBRSxpQkFBaUI7RUFDM0IsYUFBYSxFQUFFLG1CQUFtQjtFQUNsQyxXQUFXLEVBQUUsaUJBQWlCLEdBQy9COztBQUdELEFBQUEsYUFBYSxDQUFDO0VBQUUsV0FBVyxFQUFFLElBQUk7RUFBRyxZQUFZLEVBQUUsSUFBSSxHQUFJOztBQUMxRCxBQUFBLGNBQWMsQ0FBQztFQUFDLFVBQVUsRUFBRSxJQUFJLEdBQUc7O0FBQ25DLEFBQUEsaUJBQWlCLENBQUM7RUFBQyxhQUFhLEVBQUUsSUFBSSxHQUFHOztBQUN6QyxBQUFBLGlCQUFpQixDQUFDO0VBQUMsYUFBYSxFQUFFLGVBQWUsR0FBRzs7QUFDcEQsQUFBQSxpQkFBaUIsQ0FBQztFQUFDLGFBQWEsRUFBRSxJQUFJLEdBQUc7O0FBQ3pDLEFBQUEsaUJBQWlCLENBQUM7RUFBQyxhQUFhLEVBQUUsSUFBSSxHQUFHOztBQUd6QyxBQUFBLFdBQVcsQ0FBQztFQUFDLE9BQU8sRUFBRSxZQUFZLEdBQUc7O0FBQ3JDLEFBQUEsWUFBWSxDQUFDO0VBQUMsT0FBTyxFQUFFLGVBQWUsR0FBSTs7QUFDMUMsQUFBQSxpQkFBaUIsQ0FBQztFQUFFLGNBQWMsRUFBRSxHQUFHLEdBQUk7O0FBQzNDLEFBQUEsa0JBQWtCLENBQUM7RUFBRSxjQUFjLEVBQUUsSUFBSSxHQUFJOztBQUM3QyxBQUFBLGtCQUFrQixDQUFDO0VBQUMsY0FBYyxFQUFFLElBQUksR0FBRzs7QUFFM0MsQUFBQSxjQUFjLENBQUM7RUFBRSxXQUFXLEVBQUUsR0FBRyxHQUFJOztBQUNyQyxBQUFBLGVBQWUsQ0FBQztFQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUk7O0FBQ3RDLEFBQUEsZUFBZSxDQUFDO0VBQUMsV0FBVyxFQUFFLElBQUksR0FBSTs7QUFDdEMsQUFBQSxlQUFlLENBQUM7RUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFJOztBQUN0QyxBQUFBLGVBQWUsQ0FBQztFQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUk7O0FBRXRDLEFBQUEsa0JBQWtCLENBQUM7RUFBQyxjQUFjLEVBQUUsSUFBSSxHQUFJOztBQUU1QyxBQUFBLGlCQUFpQixDQUFDO0VBQUMsYUFBYSxFQUFFLElBQUksR0FBRzs7QUFDekMsQUFBQSxnQkFBZ0IsQ0FBQztFQUFDLFlBQVksRUFBRSxJQUFJLEdBQUc7O0FBRXZDLEFBQUEsZUFBZSxDQUFDO0VBQ2QsV0FBVyxFUjVGSyxpQkFBaUIsRUFBRSxVQUFVO0VRNkY3QyxVQUFVLEVBQUUsTUFBTTtFQUNsQixXQUFXLEVBQUUsR0FBRztFQUNoQixjQUFjLEVBQUUsT0FBTyxHQUN4Qjs7QUFHRCxBQUFBLGNBQWMsQ0FBQztFQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUk7O0FBR2xDLEFBQUEsaUJBQWlCLENBQUM7RUFBQyxRQUFRLEVBQUUsTUFBTSxHQUFHOztBQUd0QyxBQUFBLGFBQWEsQ0FBQztFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUs7O0FBQ2pDLEFBQUEsWUFBWSxDQUFDO0VBQUUsS0FBSyxFQUFFLElBQUksR0FBSzs7QUFHL0IsQUFBQSxPQUFPLENBQUM7RUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFLOztBQUM1QixBQUFBLGFBQWEsQ0FBQztFQUFFLFdBQVcsRUFBRSxNQUFNO0VBQUcsT0FBTyxFQUFFLElBQUksR0FBSzs7QUFDeEQsQUFBQSxRQUFRLENBQUM7RUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFLOztBQUM5QixBQUFBLFFBQVEsQ0FBQztFQUFFLElBQUksRUFBRSxRQUFRLEdBQUs7O0FBQzlCLEFBQUEsV0FBVyxDQUFDO0VBQUMsU0FBUyxFQUFFLElBQUksR0FBRzs7QUFFL0IsQUFBQSxhQUFhLENBQUM7RUFDWixPQUFPLEVBQUUsSUFBSTtFQUNiLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGVBQWUsRUFBRSxNQUFNLEdBQ3hCOztBQUVELEFBQUEsVUFBVSxDQUFDO0VBQ1QsV0FBVyxFQUFFLE1BQU07RUFDbkIsZUFBZSxFQUFFLFFBQVEsR0FDMUI7O0FBR0QsQUFBQSxzQkFBc0IsQ0FBQztFQUNyQixpQkFBaUIsRUFBRSxVQUFVO0VBQzdCLG1CQUFtQixFQUFFLE1BQU07RUFDM0IsZUFBZSxFQUFFLEtBQUssR0FDdkI7O0FBR0QsQUFBQSxZQUFZLENBQUM7RUFDWCxXQUFXLEVBQUUsSUFBSTtFQUNqQixZQUFZLEVBQUUsSUFBSTtFQUNsQixZQUFZLEVBQUUsSUFBSTtFQUNsQixhQUFhLEVBQUUsSUFBSSxHQUNwQjs7QUFDRCxBQUFBLGVBQWUsQ0FBQztFQUFFLFNBQVMsRUFBRSxNQUFNLEdBQUk7O0FBQ3ZDLEFBQUEsY0FBYyxDQUFDO0VBQUMsU0FBUyxFQUFFLEtBQUssR0FBSTs7QUFDcEMsQUFBQSxlQUFlLENBQUM7RUFBRSxTQUFTLEVBQUUsTUFBTSxHQUFJOztBQUN2QyxBQUFBLGdCQUFnQixDQUFDO0VBQUMsS0FBSyxFQUFFLElBQUksR0FBRzs7QUFHaEMsQUFBQSxnQkFBZ0IsQ0FBQztFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFrQixHQUFHOztBQUMxRCxBQUFBLFFBQVEsQ0FBQztFQUFDLGFBQWEsRUFBRSxHQUFHLEdBQUc7O0FBQy9CLEFBQUEsZ0JBQWdCLENBQUM7RUFBQyxhQUFhLEVBQUUsR0FBRyxHQUFHOztBQUl2QyxBQUFBLE9BQU8sQ0FBQztFQUNOLFVBQVUsRUFBRSxJQUFJO0VBQ2hCLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFrQjtFQUNwQyxhQUFhLEVBQUUsR0FBRztFQUNsQixVQUFVLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQWtCO0VBQ3hDLGFBQWEsRUFBRSxJQUFJO0VBQ25CLE9BQU8sRUFBRSxjQUFjLEdBU3hCO0VBUEMsQUFBQSxVQUFJLENBQUM7SUFDSCxXQUFXLEVSaEtHLGFBQWEsRUFBRSxLQUFLO0lRaUtsQyxVQUFVLEVBQUUsTUFBTTtJQUNsQixXQUFXLEVBQUUsR0FBRztJQUNoQixjQUFjLEVBQUUsT0FBTztJQUN2QixXQUFXLEVBQUUsSUFBSSxHQUNsQjs7QUFHSCxBQUFBLGtCQUFrQixDQUFDO0VBQ2pCLFVBQVUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxJQUFHLENBQUMsbUJBQWtCLEdBQzlDOztBQUdELEFBQUEsT0FBTyxDQUFDO0VBQUMsT0FBTyxFQUFFLGVBQWUsR0FBRzs7QUFFcEMsTUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUcsS0FBSztFQUFqQixBQUFBLGlCQUFpQixDQUFDO0lBQUMsT0FBTyxFQUFFLGVBQWUsR0FBRzs7QUFDdEUsTUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUcsTUFBTTtFQUFsQixBQUFBLGlCQUFpQixDQUFDO0lBQUMsT0FBTyxFQUFFLGVBQWUsR0FBRzs7QUFHdEUsTUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUcsS0FBSztFQUFuQixBQUFBLGdCQUFnQixDQUFDO0lBQUMsT0FBTyxFQUFFLGVBQWUsR0FBRzs7QUFDbkUsTUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUcsTUFBTTtFQUFwQixBQUFBLGdCQUFnQixDQUFDO0lBQUMsT0FBTyxFQUFFLGVBQWUsR0FBRzs7QUMvTm5FLEFBQUEsT0FBTyxDQUFDO0VBQ04sTUFBTSxFQUFFLE1BQU07RUFDZCxZQUFZLEVBQUcsSUFBd0I7RUFDdkMsYUFBYSxFQUFFLElBQXdCO0VBQ3ZDLEtBQUssRUFBRSxJQUFJLEdBTVo7RUFEQyxNQUFNLE1BQU0sTUFBTSxNQUFNLFNBQVMsRUFBRyxNQUFNO0lBVDVDLEFBQUEsT0FBTyxDQUFDO01BU2dCLFNBQVMsRVQ0RU4sTUFBTSxHUzNFaEM7O0FBR0QsTUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUcsTUFBTTtFQUN4QyxBQUFBLFFBQVEsQ0FBQztJQUNQLElBQUksRUFBRSxZQUFZO0lBQ2xCLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxVQUFVO0lBQ3hDLEtBQUssRUFBRSxDQUFDLEdBRVQ7RUFDRCxBQUFBLFFBQVEsQ0FBQztJQUNQLElBQUksRUFBRSxvQkFBb0I7SUFDMUIsS0FBSyxFQUFFLENBQUMsR0FDVDs7QUFJSCxBQUFBLElBQUksQ0FBQztFQUNILE9BQU8sRUFBRSxJQUFJO0VBQ2IsSUFBSSxFQUFFLFFBQVE7RUFDZCxTQUFTLEVBQUUsUUFBUTtFQUVuQixXQUFXLEVBQUUsS0FBbUI7RUFDaEMsWUFBWSxFQUFFLEtBQW1CLEdBeUNsQztFQS9DRCxBQVFFLElBUkUsQ0FRRixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUUsUUFBUTtJQUNkLFlBQVksRUFBRSxJQUFpQjtJQUMvQixhQUFhLEVBQUUsSUFBaUIsR0FtQ2pDO0lBOUNILEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsUUFBdUM7TUFHNUMsU0FBUyxFQUhKLFFBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsU0FBdUM7TUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsR0FBdUM7TUFHNUMsU0FBUyxFQUhKLEdBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsU0FBdUM7TUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsU0FBdUM7TUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsR0FBdUM7TUFHNUMsU0FBUyxFQUhKLEdBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsU0FBdUM7TUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsU0FBdUM7TUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxHQUFJLENBQUs7TUFDUCxVQUFVLEVBRkwsR0FBdUM7TUFHNUMsU0FBUyxFQUhKLEdBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxJQUFLLENBQUk7TUFDUCxVQUFVLEVBRkwsU0FBdUM7TUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxJQUFLLENBQUk7TUFDUCxVQUFVLEVBRkwsU0FBdUM7TUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO0lBbkJQLEFBUUUsSUFSRSxDQVFGLElBQUksQUFRQSxJQUFLLENBQUk7TUFDUCxVQUFVLEVBRkwsSUFBdUM7TUFHNUMsU0FBUyxFQUhKLElBQXVDLEdBSTdDO0lBSUgsTUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUcsS0FBSztNQXZCN0MsQUFRRSxJQVJFLENBUUYsSUFBSSxBQW1CRSxHQUFJLENBQUs7UUFDUCxVQUFVLEVBRkwsUUFBdUM7UUFHNUMsU0FBUyxFQUhKLFFBQXVDLEdBSTdDO01BOUJULEFBUUUsSUFSRSxDQVFGLElBQUksQUFtQkUsR0FBSSxDQUFLO1FBQ1AsVUFBVSxFQUZMLFNBQXVDO1FBRzVDLFNBQVMsRUFISixTQUF1QyxHQUk3QztNQTlCVCxBQVFFLElBUkUsQ0FRRixJQUFJLEFBbUJFLEdBQUksQ0FBSztRQUNQLFVBQVUsRUFGTCxHQUF1QztRQUc1QyxTQUFTLEVBSEosR0FBdUMsR0FJN0M7TUE5QlQsQUFRRSxJQVJFLENBUUYsSUFBSSxBQW1CRSxHQUFJLENBQUs7UUFDUCxVQUFVLEVBRkwsU0FBdUM7UUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO01BOUJULEFBUUUsSUFSRSxDQVFGLElBQUksQUFtQkUsR0FBSSxDQUFLO1FBQ1AsVUFBVSxFQUZMLFNBQXVDO1FBRzVDLFNBQVMsRUFISixTQUF1QyxHQUk3QztNQTlCVCxBQVFFLElBUkUsQ0FRRixJQUFJLEFBbUJFLEdBQUksQ0FBSztRQUNQLFVBQVUsRUFGTCxHQUF1QztRQUc1QyxTQUFTLEVBSEosR0FBdUMsR0FJN0M7TUE5QlQsQUFRRSxJQVJFLENBUUYsSUFBSSxBQW1CRSxHQUFJLENBQUs7UUFDUCxVQUFVLEVBRkwsU0FBdUM7UUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO01BOUJULEFBUUUsSUFSRSxDQVFGLElBQUksQUFtQkUsR0FBSSxDQUFLO1FBQ1AsVUFBVSxFQUZMLFNBQXVDO1FBRzVDLFNBQVMsRUFISixTQUF1QyxHQUk3QztNQTlCVCxBQVFFLElBUkUsQ0FRRixJQUFJLEFBbUJFLEdBQUksQ0FBSztRQUNQLFVBQVUsRUFGTCxHQUF1QztRQUc1QyxTQUFTLEVBSEosR0FBdUMsR0FJN0M7TUE5QlQsQUFRRSxJQVJFLENBUUYsSUFBSSxBQW1CRSxJQUFLLENBQUk7UUFDUCxVQUFVLEVBRkwsU0FBdUM7UUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO01BOUJULEFBUUUsSUFSRSxDQVFGLElBQUksQUFtQkUsSUFBSyxDQUFJO1FBQ1AsVUFBVSxFQUZMLFNBQXVDO1FBRzVDLFNBQVMsRUFISixTQUF1QyxHQUk3QztNQTlCVCxBQVFFLElBUkUsQ0FRRixJQUFJLEFBbUJFLElBQUssQ0FBSTtRQUNQLFVBQVUsRUFGTCxJQUF1QztRQUc1QyxTQUFTLEVBSEosSUFBdUMsR0FJN0M7SUFLTCxNQUFNLE1BQU0sTUFBTSxNQUFNLFNBQVMsRUFBRyxNQUFNO01BbkM5QyxBQVFFLElBUkUsQ0FRRixJQUFJLEFBK0JFLEdBQUksQ0FBSztRQUNQLFVBQVUsRUFGTCxRQUF1QztRQUc1QyxTQUFTLEVBSEosUUFBdUMsR0FJN0M7TUExQ1QsQUFRRSxJQVJFLENBUUYsSUFBSSxBQStCRSxHQUFJLENBQUs7UUFDUCxVQUFVLEVBRkwsU0FBdUM7UUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO01BMUNULEFBUUUsSUFSRSxDQVFGLElBQUksQUErQkUsR0FBSSxDQUFLO1FBQ1AsVUFBVSxFQUZMLEdBQXVDO1FBRzVDLFNBQVMsRUFISixHQUF1QyxHQUk3QztNQTFDVCxBQVFFLElBUkUsQ0FRRixJQUFJLEFBK0JFLEdBQUksQ0FBSztRQUNQLFVBQVUsRUFGTCxTQUF1QztRQUc1QyxTQUFTLEVBSEosU0FBdUMsR0FJN0M7TUExQ1QsQUFRRSxJQVJFLENBUUYsSUFBSSxBQStCRSxHQUFJLENBQUs7UUFDUCxVQUFVLEVBRkwsU0FBdUM7UUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO01BMUNULEFBUUUsSUFSRSxDQVFGLElBQUksQUErQkUsR0FBSSxDQUFLO1FBQ1AsVUFBVSxFQUZMLEdBQXVDO1FBRzVDLFNBQVMsRUFISixHQUF1QyxHQUk3QztNQTFDVCxBQVFFLElBUkUsQ0FRRixJQUFJLEFBK0JFLEdBQUksQ0FBSztRQUNQLFVBQVUsRUFGTCxTQUF1QztRQUc1QyxTQUFTLEVBSEosU0FBdUMsR0FJN0M7TUExQ1QsQUFRRSxJQVJFLENBUUYsSUFBSSxBQStCRSxHQUFJLENBQUs7UUFDUCxVQUFVLEVBRkwsU0FBdUM7UUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO01BMUNULEFBUUUsSUFSRSxDQVFGLElBQUksQUErQkUsR0FBSSxDQUFLO1FBQ1AsVUFBVSxFQUZMLEdBQXVDO1FBRzVDLFNBQVMsRUFISixHQUF1QyxHQUk3QztNQTFDVCxBQVFFLElBUkUsQ0FRRixJQUFJLEFBK0JFLElBQUssQ0FBSTtRQUNQLFVBQVUsRUFGTCxTQUF1QztRQUc1QyxTQUFTLEVBSEosU0FBdUMsR0FJN0M7TUExQ1QsQUFRRSxJQVJFLENBUUYsSUFBSSxBQStCRSxJQUFLLENBQUk7UUFDUCxVQUFVLEVBRkwsU0FBdUM7UUFHNUMsU0FBUyxFQUhKLFNBQXVDLEdBSTdDO01BMUNULEFBUUUsSUFSRSxDQVFGLElBQUksQUErQkUsSUFBSyxDQUFJO1FBQ1AsVUFBVSxFQUZMLElBQXVDO1FBRzVDLFNBQVMsRUFISixJQUF1QyxHQUk3Qzs7QUNyRVQsQUFBQSxPQUFPLENBQUM7RUFDTixVQUFVLEVBQUUsV0FBZ0I7RUFDNUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQWtCO0VBQ3BDLGFBQWEsRUFBRSxLQUFLO0VBQ3BCLFVBQVUsRUFBRSxVQUFVO0VBQ3RCLEtBQUssRUFBRSxtQkFBa0I7RUFDekIsTUFBTSxFQUFFLE9BQU87RUFDZixPQUFPLEVBQUUsWUFBWTtFQUNyQixXQUFXLEVWa0NLLGlCQUFpQixFQUFFLFVBQVU7RVVqQzdDLFNBQVMsRUFBRSxJQUFJO0VBQ2YsVUFBVSxFQUFFLE1BQU07RUFDbEIsV0FBVyxFQUFFLEdBQUc7RUFDaEIsTUFBTSxFQUFFLElBQUk7RUFDWixjQUFjLEVBQUUsQ0FBQztFQUNqQixXQUFXLEVBQUUsSUFBSTtFQUNqQixPQUFPLEVBQUUsTUFBTTtFQUNmLFFBQVEsRUFBRSxRQUFRO0VBQ2xCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLGVBQWUsRUFBRSxJQUFJO0VBQ3JCLGNBQWMsRUFBRSxrQkFBa0I7RUFDbEMsV0FBVyxFQUFFLElBQUk7RUFDakIsY0FBYyxFQUFFLE1BQU07RUFDdEIsV0FBVyxFQUFFLE1BQU0sR0F3Q3BCO0VBOURELEFBd0JFLE9BeEJLLENBd0JMLENBQUMsQ0FBQztJQUFFLE9BQU8sRUFBRSxZQUFZLEdBQUc7RUFFNUIsQUFBQSxtQkFBYSxDQUFDO0lBQ1osYUFBYSxFQUFFLENBQUM7SUFDaEIsWUFBWSxFQUFFLENBQUM7SUFDZixVQUFVLEVBQUUsSUFBSTtJQUNoQixLQUFLLEVBQUUsbUJBQWtCO0lBQ3pCLE1BQU0sRUFBRSxJQUFJO0lBQ1osV0FBVyxFQUFFLE9BQU87SUFDcEIsT0FBTyxFQUFFLENBQUM7SUFDVixVQUFVLEVBQUUsSUFBSTtJQUNoQixjQUFjLEVBQUUsUUFBUTtJQUN4QixXQUFXLEVBQUUsTUFBTSxHQVFwQjtJQWxCRCxBQVlFLG1CQVpXLEFBWVgsT0FBUSxFQVpWLEFBYUUsbUJBYlcsQUFhWCxNQUFPLEVBYlQsQUFjRSxtQkFkVyxBQWNYLE1BQU8sQ0FBQztNQUNOLFlBQVksRUFBRSxDQUFDO01BQ2YsS0FBSyxFQUFFLGtCQUFpQixHQUN6QjtFQUdILEFBQUEsY0FBUSxDQUFDO0lBQ1AsU0FBUyxFQUFFLElBQUk7SUFDZixNQUFNLEVBQUUsSUFBSTtJQUNaLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE9BQU8sRUFBRSxNQUFNLEdBQ2hCO0VBRUQsQUFBQSxhQUFPLENBQUM7SUFDTixZQUFZLEVBQUUsa0JBQWlCO0lBQy9CLEtBQUssRUFBRSxrQkFBaUIsR0FNekI7SUFSRCxBQUlFLGFBSkssQUFJTCxNQUFPLENBQUM7TUFDTixZQUFZLEVBQUUsa0JBQWlCO01BQy9CLEtBQUssRUFBRSxrQkFBaUIsR0FDekI7O0FBTUwsQUFFRSxVQUZRLENBRVIsY0FBYyxBQUFBLG1CQUFtQjtBQUZuQyxBQUdFLFVBSFEsQ0FHUixjQUFjLEFBQUEsYUFBYSxDQUFDO0VBQzFCLE1BQU0sRUFBRSxJQUFJO0VBQ1osV0FBVyxFQUFFLElBQUksR0FDbEI7O0FBTkgsQUFRSSxVQVJNLEdBUU4sbUJBQW1CLEFBQUEsSUFBSyxDQUFBLEFBQUEsZUFBZSxFQUFFO0VBQ3pDLFlBQVksRUFBRSxDQUFDO0VBQ2YsYUFBYSxFQUFFLEdBQUcsR0FDbkI7O0FBWEgsQUFhd0IsVUFiZCxHQWFOLG1CQUFtQixHQUFDLG1CQUFtQixBQUFBLElBQUssQ0FBQSxBQUFBLGVBQWUsRUFBRTtFQUM3RCxXQUFXLEVBQUUsQ0FBQztFQUNkLFlBQVksRUFBRSxHQUFHLEdBQ2xCOztBQWhCSCxBQWtCSSxVQWxCTSxHQWtCTixtQkFBbUIsQUFBQSxXQUFXLENBQUM7RUFDL0IsYUFBYSxFQUFFLENBQUMsR0FDakI7O0FBTUgsQUFBQSxjQUFjLEFBQUEsbUJBQW1CO0FBQ2pDLEFBQUEsY0FBYyxBQUFBLGFBQWEsQ0FBQztFQUMxQixPQUFPLEVBQUUsQ0FBQyxHQUNYOztBQy9GRCxVQUFVO0VBQ1IsV0FBVyxFQUFFLFFBQVE7RUFDckIsR0FBRyxFQUFHLGlDQUFpQztFQUN2QyxHQUFHLEVBQUcsdUNBQXVDLENBQUMsMkJBQTJCLEVBQ3ZFLGlDQUFpQyxDQUFDLGtCQUFrQixFQUNwRCxrQ0FBa0MsQ0FBQyxjQUFjLEVBQ2pELHdDQUF3QyxDQUFDLGFBQWE7RUFDeEQsV0FBVyxFQUFFLE1BQU07RUFDbkIsVUFBVSxFQUFFLE1BQU07O0FBUXBCLEFBQUEsV0FBVyxBQUFBLE9BQU8sQ0FBQztFQUNqQixPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFdBQVcsQUFBQSxPQUFPLENBQUM7RUFDakIsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxPQUFPLEFBQUEsT0FBTyxDQUFDO0VBQ2IsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxhQUFhLEFBQUEsT0FBTyxDQUFDO0VBQ25CLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsZUFBZSxBQUFBLE9BQU8sQ0FBQztFQUNyQixPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFFBQVEsQUFBQSxPQUFPLENBQUM7RUFDZCxPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFdBQVcsQUFBQSxPQUFPLENBQUM7RUFDakIsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxPQUFPLEFBQUEsT0FBTyxDQUFDO0VBQ2IsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxVQUFVLEFBQUEsT0FBTyxDQUFDO0VBQ2hCLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsTUFBTSxBQUFBLE9BQU8sQ0FBQztFQUNaLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsU0FBUyxBQUFBLE9BQU8sQ0FBQztFQUNmLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsT0FBTyxBQUFBLE9BQU8sQ0FBQztFQUNiLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsUUFBUSxBQUFBLE9BQU8sQ0FBQztFQUNkLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsT0FBTyxBQUFBLE9BQU8sQ0FBQztFQUNiLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsU0FBUyxBQUFBLE9BQU8sQ0FBQztFQUNmLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsVUFBVSxBQUFBLE9BQU8sQ0FBQztFQUNoQixPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFNBQVMsQUFBQSxPQUFPLENBQUM7RUFDZixPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFdBQVcsQUFBQSxPQUFPLENBQUM7RUFDakIsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxPQUFPLEFBQUEsT0FBTyxDQUFDO0VBQ2IsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxVQUFVLEFBQUEsT0FBTyxDQUFDO0VBQ2hCLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsaUJBQWlCLEFBQUEsT0FBTyxDQUFDO0VBQ3ZCLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsWUFBWSxBQUFBLE9BQU8sQ0FBQztFQUNsQixPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFNBQVMsQUFBQSxPQUFPLENBQUM7RUFDZixPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFdBQVcsQUFBQSxPQUFPLENBQUM7RUFDakIsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxVQUFVLEFBQUEsT0FBTyxDQUFDO0VBQ2hCLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsVUFBVSxBQUFBLE9BQU8sQ0FBQztFQUNoQixPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFVBQVUsQUFBQSxPQUFPLENBQUM7RUFDaEIsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxXQUFXLEFBQUEsT0FBTyxDQUFDO0VBQ2pCLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQUNELEFBQUEsWUFBWSxBQUFBLE9BQU8sQ0FBQztFQUNsQixPQUFPLEVBQUUsT0FBTyxHQUNqQjs7QUFDRCxBQUFBLFdBQVcsQUFBQSxPQUFPLENBQUM7RUFDakIsT0FBTyxFQUFFLE9BQU8sR0FDakI7O0FBQ0QsQUFBQSxXQUFXLEFBQUEsT0FBTyxDQUFDO0VBQ2pCLE9BQU8sRUFBRSxPQUFPLEdBQ2pCOztBQzNHRCxBQUFBLFNBQVMsQ0FBQztFQUNSLGtCQUFrQixFQUFFLEVBQUU7RUFDdEIsbUJBQW1CLEVBQUUsSUFBSSxHQUsxQjtFQVBELEFBSUUsU0FKTyxBQUlQLFNBQVUsQ0FBQztJQUNULHlCQUF5QixFQUFFLFFBQVEsR0FDcEM7O0FBSUgsQUFBQSxTQUFTLENBQUM7RUFBRSxjQUFjLEVBQUUsUUFBUSxHQUFJOztBQUN4QyxBQUFBLGFBQWEsQ0FBQztFQUFFLGNBQWMsRUFBRSxZQUFZLEdBQUk7O0FBQ2hELEFBQUEsTUFBTSxDQUFDO0VBQUUsY0FBYyxFQUFFLEtBQUssR0FBSzs7QUFJbkMsVUFBVSxDQUFWLFFBQVU7RUFDUixBQUFBLEVBQUU7RUFDRixBQUFBLEdBQUc7RUFDSCxBQUFBLEdBQUc7RUFDSCxBQUFBLEdBQUc7RUFDSCxBQUFBLEdBQUc7RUFDSCxBQUFBLElBQUk7SUFBRyx5QkFBeUIsRUFBRSxtQ0FBaUM7RUFDbkUsQUFBQSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRyxTQUFTLEVBQUUsc0JBQW1CO0VBQy9DLEFBQUEsR0FBRztJQUFHLFNBQVMsRUFBRSxzQkFBc0I7RUFDdkMsQUFBQSxHQUFHO0lBQUcsU0FBUyxFQUFFLHNCQUFtQjtFQUNwQyxBQUFBLEdBQUc7SUFBRyxPQUFPLEVBQUUsQ0FBQztJQUFHLFNBQVMsRUFBRSx5QkFBeUI7RUFDdkQsQUFBQSxHQUFHO0lBQUcsU0FBUyxFQUFFLHlCQUFzQjtFQUN2QyxBQUFBLElBQUk7SUFBRyxPQUFPLEVBQUUsQ0FBQztJQUFHLFNBQVMsRUFBRSxnQkFBZ0I7O0FBS2pELFVBQVUsQ0FBVixZQUFVO0VBQ1IsQUFBQSxFQUFFO0VBQ0YsQUFBQSxHQUFHO0VBQ0gsQUFBQSxHQUFHO0VBQ0gsQUFBQSxHQUFHO0VBQ0gsQUFBQSxJQUFJO0lBQUcseUJBQXlCLEVBQUUsOEJBQThCO0VBQ2hFLEFBQUEsRUFBRTtJQUFHLE9BQU8sRUFBRSxDQUFDO0lBQUcsU0FBUyxFQUFFLDBCQUEwQjtFQUN2RCxBQUFBLEdBQUc7SUFBRyxPQUFPLEVBQUUsQ0FBQztJQUFHLFNBQVMsRUFBRSx1QkFBdUI7RUFDckQsQUFBQSxHQUFHO0lBQUUsU0FBUyxFQUFFLHdCQUF3QjtFQUN4QyxBQUFBLEdBQUc7SUFBRSxTQUFTLEVBQUUsc0JBQXNCO0VBQ3RDLEFBQUEsSUFBSTtJQUFFLFNBQVMsRUFBRSxJQUFJOztBQUd2QixVQUFVLENBQVYsS0FBVTtFQUNSLEFBQUEsSUFBSTtJQUFHLFNBQVMsRUFBRSxnQkFBZ0I7RUFDbEMsQUFBQSxHQUFHO0lBQUUsU0FBUyxFQUFFLHNCQUFzQjtFQUN0QyxBQUFBLEVBQUU7SUFBRSxTQUFTLEVBQUUsZ0JBQWdCOztBQUlqQyxVQUFVLENBQVYsTUFBVTtFQUNSLEFBQUEsRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0VBQ2QsQUFBQSxHQUFHO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRyxTQUFTLEVBQUUsYUFBYTtFQUMxQyxBQUFBLElBQUk7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFHLFNBQVMsRUFBRSxnQkFBZ0I7O0FBR2hELFVBQVUsQ0FBVixPQUFVO0VBQ1IsQUFBQSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7RUFDZCxBQUFBLEdBQUc7SUFBRSxPQUFPLEVBQUUsQ0FBQztFQUNmLEFBQUEsSUFBSTtJQUFFLE9BQU8sRUFBRSxDQUFDOztBQUlsQixVQUFVLENBQVYsSUFBVTtFQUNSLEFBQUEsSUFBSTtJQUFFLFNBQVMsRUFBRSxZQUFZO0VBQzdCLEFBQUEsRUFBRTtJQUFFLFNBQVMsRUFBRSxjQUFjOztBQUcvQixVQUFVLENBQVYsT0FBVTtFQUNSLEFBQUEsRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUcsU0FBUyxFQUFFLG9CQUFvQjtFQUNoRCxBQUFBLElBQUk7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFHLFNBQVMsRUFBRSxrQkFBa0I7O0FBR2xELFVBQVUsQ0FBVixXQUFVO0VBQ1IsQUFBQSxFQUFFO0lBQUUsU0FBUyxFQUFFLGlCQUFpQjtFQUNoQyxBQUFBLEdBQUc7SUFBRSxTQUFTLEVBQUUsYUFBYTtFQUM3QixBQUFBLEdBQUc7SUFBRSxTQUFTLEVBQUUsYUFBYTtFQUM3QixBQUFBLElBQUk7SUFBRSxTQUFTLEVBQUUsZ0JBQWdCOztBQzlFbkMsQUFBQSxPQUFPLENBQUM7RUFFTixPQUFPLEVBQUUsRUFBRSxHQXNCWjtFQXBCQyxBQUFBLFlBQU0sQ0FBQztJQUFFLE1BQU0sRUFBRSxJQUFJLEdBQUs7RUFFMUIsQUFBQSxZQUFNLENBQUM7SUFDTCxNQUFNLEVBQUUsSUFBSSxHQUViO0lBSEQsQUFFRSxZQUZJLENBRUosR0FBRyxDQUFDO01BQUMsVUFBVSxFQUFFLElBQUksR0FBSztFQUc1QixBQUFBLFlBQU07RUFYUixBQVlFLE9BWkssQ0FZTCxvQkFBb0I7RUFadEIsQUFhRSxPQWJLLENBYUwsbUJBQW1CLENBQUM7SUFBQyxPQUFPLEVBQUUsR0FBRyxHQUFJO0VBSXJDLEFBQUEsbUJBQWEsQ0FBQztJQUNaLEtBQUssRWJvRU0sT0FBTztJYW5FbEIsY0FBYyxFQUFFLE1BQU07SUFDdEIsYUFBYSxFQUFFLEdBQUc7SUFDbEIsVUFBVSxFQUFFLEdBQUc7SUFDZixTQUFTLEVBQUUsS0FBSyxHQUNqQjs7QUFLSCxBQUFRLE9BQUQsR0FBQyxDQUFDLENBQUM7RUFDUixZQUFZLEVBQUUsSUFBSSxHQUNuQjs7QUFLRCxBQUFBLElBQUksQ0FBQztFQUNILFdBQVcsRUFBRSxJQUFJO0VBQ2pCLE9BQU8sRUFBRSxLQUFLO0VBQ2QsUUFBUSxFQUFFLFFBQVEsR0FlbkI7RUFsQkQsQUFLRSxJQUxFLENBS0YsRUFBRSxDQUFDO0lBQ0QsT0FBTyxFQUFFLElBQUksR0FDZDtFQVBILEFBU0UsSUFURSxDQVNGLEVBQUUsQ0FBQztJQUNELEtBQUssRUFBRSxJQUFJLEdBT1o7SUFqQkgsQUFZSSxJQVpBLENBU0YsRUFBRSxDQUdBLENBQUMsQ0FBQztNQUNBLFdBQVcsRUFBRSxHQUFHO01BQ2hCLFlBQVksRUFBRSxJQUFJO01BQ2xCLGNBQWMsRUFBRSxTQUFTLEdBQzFCOztBQU1MLEFBQUEsb0JBQW9CLENBQUM7RUFDbkIsS0FBSyxFQUFFLGtCQUFrQjtFQUN6QixhQUFhLEVBQUUsWUFBWSxHQUM1Qjs7QUFJRCxBQUFBLG1CQUFtQixDQUFDO0VBQ2xCLE1BQU0sRUFBRSxJQUFJO0VBQ1osUUFBUSxFQUFFLFFBQVE7RUFDbEIsVUFBVSxFQUFFLGFBQWE7RUFDekIsS0FBSyxFQUFFLElBQUksR0FnQlo7RUFwQkQsQUFNRSxtQkFOaUIsQ0FNakIsSUFBSSxDQUFDO0lBQ0gsZ0JBQWdCLEViZUwsT0FBTztJYWRsQixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxHQUFHO0lBQ1gsSUFBSSxFQUFFLElBQUk7SUFDVixVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUUsUUFBUTtJQUNsQixHQUFHLEVBQUUsR0FBRztJQUNSLFVBQVUsRUFBRSxHQUFHO0lBQ2YsS0FBSyxFQUFFLElBQUksR0FJWjtJQW5CSCxBQU1FLG1CQU5pQixDQU1qQixJQUFJLEFBV0YsWUFBYSxDQUFDO01BQUUsU0FBUyxFQUFFLGtCQUFrQixHQUFJO0lBakJyRCxBQU1FLG1CQU5pQixDQU1qQixJQUFJLEFBWUYsV0FBWSxDQUFDO01BQUUsU0FBUyxFQUFFLGlCQUFpQixHQUFJOztBQUtuRCxBQUFrQixJQUFkLEFBQUEsYUFBYSxDQUFDLFlBQVksQ0FBQztFQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUk7O0FBTWhELE1BQU0sTUFBTSxNQUFNLE1BQU0sU0FBUyxFQUFHLEtBQUs7RUFFckMsQUFBQSxZQUFNLENBQUM7SUFDTCxNQUFNLEVBQUUsQ0FBQyxHQUVWO0VBQ0QsQUFBQSxZQUFNLENBQUM7SUFDTCxNQUFNLEVBQUUsSUFBSTtJQUNaLFlBQVksRUFBRSxDQUFDLEdBQ2hCO0VBRUQsQUFBQSxtQkFBYSxDQUFDO0lBQUMsV0FBVyxFQUFFLElBQUksR0FBSTtFQUd0QyxBQUNFLElBREUsQUFBQSxhQUFhLENBRWIsWUFBTSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUssR0FBSztFQUYvQixBQUNFLElBREUsQUFBQSxhQUFhLENBR2IsWUFBTSxDQUFDO0lBQ0wsTUFBTSxFQUFFLElBQUk7SUFDWixhQUFhLEVBQUUsSUFBSSxHQUNwQjtFQU5MLEFBQ0UsSUFERSxBQUFBLGFBQWEsQ0FPYixtQkFBYSxDQUFDO0lBQUMsV0FBVyxFQUFFLENBQUMsR0FBSTtFQVByQyxBQVVPLElBVkgsQUFBQSxhQUFhLENBVWYsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUFDLElBQUksRUFBRSxRQUFRLEdBQUk7O0FBUS9CLE1BQU0sTUFBTSxNQUFNLE1BQU0sU0FBUyxFQUFHLEtBQUs7RUFFdkMsQUFBQSxPQUFPLENBQUM7SUFDTixRQUFRLEVBQUUsS0FBSyxHQUtoQjtJQUhDLEFBQUEsWUFBTSxDQUFDO01BQ0wsTUFBTSxFYjNDVyxJQUFJLENhMkNTLFVBQVUsR0FDekM7RUFJSCxBQUFBLElBQUksQUFBQSxjQUFjLENBQUM7SUFDakIsUUFBUSxFQUFFLE1BQU0sR0FlakI7SUFoQkQsQUFHRSxJQUhFLEFBQUEsY0FBYyxDQUdoQixRQUFRLENBQUM7TUFBQyxTQUFTLEVBQUUsYUFBYSxHQUFJO0lBSHhDLEFBS0UsSUFMRSxBQUFBLGNBQWMsQ0FLaEIsbUJBQW1CLENBQUM7TUFDbEIsTUFBTSxFQUFFLENBQUM7TUFDVCxTQUFTLEVBQUUsYUFBYSxHQUt6QjtNQVpILEFBU0ksSUFUQSxBQUFBLGNBQWMsQ0FLaEIsbUJBQW1CLENBSWpCLElBQUksQUFBQSxZQUFZLENBQUM7UUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLGVBQWUsR0FBRztNQVRsRSxBQVVJLElBVkEsQUFBQSxjQUFjLENBS2hCLG1CQUFtQixDQUtqQixJQUFJLEFBQUEsVUFBVyxDQUFBLEFBQUEsQ0FBQyxFQUFFO1FBQUUsU0FBUyxFQUFFLFNBQVMsR0FBRztNQVYvQyxBQVdJLElBWEEsQUFBQSxjQUFjLENBS2hCLG1CQUFtQixDQU1qQixJQUFJLEFBQUEsV0FBVyxDQUFDO1FBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxlQUFlLEdBQUc7SUFYakUsQUFjVSxJQWROLEFBQUEsY0FBYyxDQWNoQixPQUFPLENBQUMsc0JBQXNCLENBQUM7TUFBQyxPQUFPLEVBQUUsSUFBSSxHQUFJO0lBZG5ELEFBZUUsSUFmRSxBQUFBLGNBQWMsQ0FlaEIsS0FBSyxFQWZQLEFBZVMsSUFmTCxBQUFBLGNBQWMsQ0FlVCxPQUFPLENBQUM7TUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEdBQUc7O0FDeEpqRCxBQUFBLGFBQVEsQ0FBQztFQUVQLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLFlBQVksRUFBRSxJQUFJLEdBSW5COztBQUlELEFBQUEsa0JBQWEsQ0FBQztFQUNaLGFBQWEsRUFBRSxHQUFHO0VBQ2xCLE1BQU0sRUFBRSxJQUFJO0VBQ1osS0FBSyxFQUFFLElBQUksR0FHWjtFQU5ELEFBS0Usa0JBTFcsQUFLWCxVQUFXLENBQUM7SUFBRSxnQkFBZ0IsRUFBRSwyQkFBMkIsQ0FBQyxVQUFVLEdBQUU7O0FBakI1RSxBQXFCRSxNQXJCSSxBQXFCSixXQUFZLENBQUM7RUFDWCxLQUFLLEVBQUUsa0JBQWlCLEdBQ3pCOztBQUtILEFBQ0UsTUFESSxBQUFBLE9BQU8sQ0FDWCxZQUFZLENBQUM7RUFDWCxVQUFVLEVBQUUsS0FBSztFQUNqQixTQUFTLEVBQUUsS0FBSyxHQUNqQjs7QUFPSCxBQUNFLE1BREksQUFBQSxnQkFBZ0IsQ0FDcEIsV0FBVyxDQUFDO0VBQUUsT0FBTyxFQUFFLElBQUk7RUFBRyxjQUFjLEVBQUUsTUFBTSxHQUFJOztBQUQxRCxBQUdFLE1BSEksQUFBQSxnQkFBZ0IsQ0FHcEIsWUFBWSxDQUFDO0VBQ1gsTUFBTSxFQUFFLEtBQUs7RUFDYixhQUFhLEVBQUUsSUFBSTtFQUNuQixVQUFVLEVBQUUsR0FBRztFQUNmLFNBQVMsRUFBRSxJQUFJO0VBQ2YsS0FBSyxFQUFFLEVBQUUsR0FDVjs7QUFUSCxBQVdFLE1BWEksQUFBQSxnQkFBZ0IsQ0FXcEIsa0JBQWtCLENBQUM7RUFDakIsSUFBSSxFQUFFLEdBQUc7RUFDVCxRQUFRLEVBQUUsUUFBUTtFQUNsQixHQUFHLEVBQUUsR0FBRztFQUNSLFNBQVMsRUFBRSxxQkFBcUI7RUFDaEMsS0FBSyxFQUFFLElBQUksR0FDWjs7QUFNSCxBQUVFLE1BRkksQUFBQSxnQkFBZ0IsQ0FFcEIsY0FBYztBQURoQixBQUNFLE1BREksQUFBQSxLQUFLLEFBQUEsSUFBSyxDQUFBLEFBQUEsZ0JBQWdCLEVBQzlCLGNBQWMsQ0FBQztFQUNiLEtBQUssRUFBRSxtQkFBa0I7RUFDekIsV0FBVyxFZHpCRyxpQkFBaUIsRUFBRSxVQUFVO0VjMEIzQyxTQUFTLEVBQUUsSUFBSTtFQUNmLGNBQWMsRUFBRSxPQUFPO0VBQ3ZCLFdBQVcsRUFBRSxJQUFJLEdBQ2xCOztBQ3BFSCxBQUVJLFNBRkssQ0FDUCxNQUFNLENBQ0osaUJBQWlCLENBQUM7RUFBQyxPQUFPLEVBQUUsSUFBSSxHQUFJOztBQUZ4QyxBQUNFLFNBRE8sQ0FHTCxZQUFPLENBQUM7RUFBQyxNQUFNLEVBQUUsS0FBSyxHQUFJOztBQU05QixNQUFNLE1BQU0sTUFBTSxNQUFNLFNBQVMsRUFBRyxLQUFLO0VBQ3ZDLEFBQ0UsU0FETyxDQUVMLFlBQU8sQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLLEdBQUs7RUFGaEMsQUFDRSxTQURPLENBQ1AsTUFBTSxBQUdKLE9BQVEsRUFKWixBQUNFLFNBRE8sQ0FDUCxNQUFNLEFBSUosT0FBUSxDQUFDO0lBQ1AsVUFBVSxFQUFFLElBQUk7SUFDaEIsU0FBUyxFQUFFLElBQUksR0FDaEI7RUFSTCxBQUNFLFNBRE8sQ0FDUCxNQUFNLEFBVUosT0FBUSxDQUFDO0lBQ1AsT0FBTyxFQUFFLElBQUksR0FZZDtJQXhCTCxBQWNNLFNBZEcsQ0FDUCxNQUFNLEFBVUosT0FBUSxDQUdOLFlBQVksQ0FBQztNQUNYLE1BQU0sRUFBRSxLQUFLO01BQ2IsWUFBWSxFQUFFLElBQUk7TUFDbEIsS0FBSyxFQUFFLHVCQUF1QixHQUMvQjtJQWxCUCxBQW1CTSxTQW5CRyxDQUNQLE1BQU0sQUFVSixPQUFRLENBUU4sWUFBWSxDQUFDO01BQUMsU0FBUyxFQUFFLGVBQWUsR0FBRztJQW5CakQsQUFvQk0sU0FwQkcsQ0FDUCxNQUFNLEFBVUosT0FBUSxDQVNOLFdBQVcsQ0FBQztNQUNWLE9BQU8sRUFBRSxVQUFVO01BQ25CLEtBQUssRUFBRSx1QkFBdUIsR0FDL0I7RUF2QlAsQUE0Qk0sU0E1QkcsQ0FDUCxNQUFNLEFBMEJKLE9BQVEsQ0FDTixZQUFZLENBQUM7SUFBQyxNQUFNLEVBQUUsS0FBSyxHQUFJO0VBNUJyQyxBQThCTSxTQTlCRyxDQUNQLE1BQU0sQUEwQkosT0FBUSxDQUdOLFlBQVksQ0FBQztJQUFDLFNBQVMsRUFBRSxlQUFlLEdBQUc7RUE5QmpELEFBK0JNLFNBL0JHLENBQ1AsTUFBTSxBQTBCSixPQUFRLENBSU4sY0FBYyxDQUFDO0lBQUUsU0FBUyxFQUFFLElBQUk7SUFBRyxXQUFXLEVBQUUsR0FBRyxHQUFJO0VBL0I3RCxBQXFDTSxTQXJDRyxDQUNQLE1BQU0sQUFpQ0osT0FBUSxDQUdOLGlCQUFpQixFQXJDdkIsQUFxQ00sU0FyQ0csQ0FDUCxNQUFNLEFBa0NKLFFBQVMsQ0FFUCxpQkFBaUIsRUFyQ3ZCLEFBcUNNLFNBckNHLENBQ1AsTUFBTSxBQW1DSixRQUFTLENBQ1AsaUJBQWlCLENBQUM7SUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFLO0VBckM3QyxBQXVDTSxTQXZDRyxDQUNQLE1BQU0sQUFpQ0osT0FBUSxDQUtOLFdBQVcsRUF2Q2pCLEFBdUNNLFNBdkNHLENBQ1AsTUFBTSxBQWtDSixRQUFTLENBSVAsV0FBVyxFQXZDakIsQUF1Q00sU0F2Q0csQ0FDUCxNQUFNLEFBbUNKLFFBQVMsQ0FHUCxXQUFXLENBQUM7SUFDVixNQUFNLEVBQUUsQ0FBQztJQUNULElBQUksRUFBRSxDQUFDO0lBQ1AsTUFBTSxFQUFFLFNBQVM7SUFDakIsU0FBUyxFQUFFLEtBQUs7SUFDaEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLENBQUMsR0FDWDtFQTlDUCxBQWlEUSxTQWpEQyxDQUNQLE1BQU0sQUFpQ0osT0FBUSxBQWNSLElBQVEsQ0FBQSxBQUFBLFdBQVcsRUFDZixXQUFXLEVBakRuQixBQWlEUSxTQWpEQyxDQUNQLE1BQU0sQUFrQ0osUUFBUyxBQWFULElBQVEsQ0FBQSxBQUFBLFdBQVcsRUFDZixXQUFXLEVBakRuQixBQWlEUSxTQWpEQyxDQUNQLE1BQU0sQUFtQ0osUUFBUyxBQVlULElBQVEsQ0FBQSxBQUFBLFdBQVcsRUFDZixXQUFXLENBQUM7SUFBQyxLQUFLLEVBQUUsSUFBSSxHQUFJO0VBakRwQyxBQWtEUSxTQWxEQyxDQUNQLE1BQU0sQUFpQ0osT0FBUSxBQWNSLElBQVEsQ0FBQSxBQUFBLFdBQVcsRUFFZixhQUFhLEVBbERyQixBQWtEUSxTQWxEQyxDQUNQLE1BQU0sQUFrQ0osUUFBUyxBQWFULElBQVEsQ0FBQSxBQUFBLFdBQVcsRUFFZixhQUFhLEVBbERyQixBQWtEUSxTQWxEQyxDQUNQLE1BQU0sQUFtQ0osUUFBUyxBQVlULElBQVEsQ0FBQSxBQUFBLFdBQVcsRUFFZixhQUFhLENBQUM7SUFDWixLQUFLLEVBQUUsd0JBQXVCLEdBRS9CO0lBckRULEFBb0RVLFNBcERELENBQ1AsTUFBTSxBQWlDSixPQUFRLEFBY1IsSUFBUSxDQUFBLEFBQUEsV0FBVyxFQUVmLGFBQWEsQ0FFWCxDQUFDLEVBcERYLEFBb0RhLFNBcERKLENBQ1AsTUFBTSxBQWlDSixPQUFRLEFBY1IsSUFBUSxDQUFBLEFBQUEsV0FBVyxFQUVmLGFBQWEsQ0FFUixXQUFXLEVBcER4QixBQW9EVSxTQXBERCxDQUNQLE1BQU0sQUFrQ0osUUFBUyxBQWFULElBQVEsQ0FBQSxBQUFBLFdBQVcsRUFFZixhQUFhLENBRVgsQ0FBQyxFQXBEWCxBQW9EYSxTQXBESixDQUNQLE1BQU0sQUFrQ0osUUFBUyxBQWFULElBQVEsQ0FBQSxBQUFBLFdBQVcsRUFFZixhQUFhLENBRVIsV0FBVyxFQXBEeEIsQUFvRFUsU0FwREQsQ0FDUCxNQUFNLEFBbUNKLFFBQVMsQUFZVCxJQUFRLENBQUEsQUFBQSxXQUFXLEVBRWYsYUFBYSxDQUVYLENBQUMsRUFwRFgsQUFvRGEsU0FwREosQ0FDUCxNQUFNLEFBbUNKLFFBQVMsQUFZVCxJQUFRLENBQUEsQUFBQSxXQUFXLEVBRWYsYUFBYSxDQUVSLFdBQVcsQ0FBQztNQUFDLEtBQUssRUFBRSx3QkFBdUIsR0FBSTtFQXBENUQsQUEwRE0sU0ExREcsQ0FDUCxNQUFNLEFBd0RKLFFBQVMsQ0FDUCxZQUFZLEVBMURsQixBQTBETSxTQTFERyxDQUNQLE1BQU0sQUF3RE8sUUFBUyxDQUNsQixZQUFZLENBQUM7SUFBQyxNQUFNLEVBQUUsS0FBSyxHQUFJO0VBMURyQyxBQTJETSxTQTNERyxDQUNQLE1BQU0sQUF3REosUUFBUyxDQUVQLFlBQVksRUEzRGxCLEFBMkRNLFNBM0RHLENBQ1AsTUFBTSxBQXdETyxRQUFTLENBRWxCLFlBQVksQ0FBQztJQUFDLFNBQVMsRUFBRSxlQUFlLEdBQUc7RUEzRGpELEFBNERNLFNBNURHLENBQ1AsTUFBTSxBQXdESixRQUFTLENBR1AsY0FBYyxFQTVEcEIsQUE0RE0sU0E1REcsQ0FDUCxNQUFNLEFBd0RPLFFBQVMsQ0FHbEIsY0FBYyxDQUFDO0lBQUMsT0FBTyxFQUFFLElBQUksR0FBSTtFQTVEdkMsQUE2RE0sU0E3REcsQ0FDUCxNQUFNLEFBd0RKLFFBQVMsQ0FJUCxhQUFhLEVBN0RuQixBQTZETSxTQTdERyxDQUNQLE1BQU0sQUF3RE8sUUFBUyxDQUlsQixhQUFhLENBQUM7SUFBQyxVQUFVLEVBQUUsSUFBSSxHQUFJO0VBN0R6QyxBQThETSxTQTlERyxDQUNQLE1BQU0sQUF3REosUUFBUyxDQUtQLFdBQVcsRUE5RGpCLEFBOERNLFNBOURHLENBQ1AsTUFBTSxBQXdETyxRQUFTLENBS2xCLFdBQVcsQ0FBQztJQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUk7RUE5RHZDLEFBQ0UsU0FETyxDQUNQLE1BQU0sQUFrRUosT0FBUSxFQW5FWixBQUNFLFNBRE8sQ0FDUCxNQUFNLEFBa0VNLE9BQVEsRUFuRXRCLEFBQ0UsU0FETyxDQUNQLE1BQU0sQUFrRWdCLFFBQVMsRUFuRWpDLEFBQ0UsU0FETyxDQUNQLE1BQU0sQUFrRTJCLFFBQVMsQ0FBQztJQUN2QyxVQUFVLEVBQUUsR0FBRztJQUNmLFNBQVMsRUFBRSxHQUFHLEdBRWY7SUF2RUwsQUFzRU0sU0F0RUcsQ0FDUCxNQUFNLEFBa0VKLE9BQVEsQ0FHTixZQUFZLEVBdEVsQixBQXNFTSxTQXRFRyxDQUNQLE1BQU0sQUFrRU0sT0FBUSxDQUdoQixZQUFZLEVBdEVsQixBQXNFTSxTQXRFRyxDQUNQLE1BQU0sQUFrRWdCLFFBQVMsQ0FHM0IsWUFBWSxFQXRFbEIsQUFzRU0sU0F0RUcsQ0FDUCxNQUFNLEFBa0UyQixRQUFTLENBR3RDLFlBQVksQ0FBQztNQUFFLE1BQU0sRUFBRSxLQUFLLEdBQUk7RUF0RXRDLEFBQ0UsU0FETyxDQUNQLE1BQU0sQUF5RUosUUFBUyxDQUFDO0lBQ1IsVUFBVSxFQUFFLEdBQUc7SUFDZixTQUFTLEVBQUUsR0FBRztJQUNkLGFBQWEsRUFBRSxDQUFDLEdBQ2pCO0VBOUVMLEFBQ0UsU0FETyxDQUNQLE1BQU0sQUFnRkosUUFBUyxDQUFDO0lBQ1IsVUFBVSxFQUFFLEdBQUc7SUFDZixTQUFTLEVBQUUsR0FBRyxHQUNmOztBQ2hHTCxBQUFBLFdBQU8sQ0FBQztFQUNOLFdBQVcsRUFBRSxJQUFJLEdBQ2xCOztBQUVELEFBQUEsWUFBUSxDQUFDO0VBQ1AsYUFBYSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQWUsR0FDekM7O0FBTUgsQUFDRSxVQURRLENBQ1IsQ0FBQyxDQUFDO0VBQ0EsZ0JBQWdCLEVBQUUsbUVBQXVFO0VBQ3pGLG1CQUFtQixFQUFFLFFBQVE7RUFDN0IsaUJBQWlCLEVBQUUsUUFBUTtFQUMzQixlQUFlLEVBQUUsUUFBUTtFQUN6QixlQUFlLEVBQUUsSUFBSSxHQUN0Qjs7QUFQSCxBQVFFLFVBUlEsQ0FRUixHQUFHLENBQUM7RUFDRixPQUFPLEVBQUUsS0FBSztFQUNkLFdBQVcsRUFBRSxJQUFJO0VBQ2pCLFlBQVksRUFBRSxJQUFJLEdBQ25COztBQVpILEFBY0UsVUFkUSxDQWNSLEVBQUUsRUFkSixBQWNNLFVBZEksQ0FjSixFQUFFLEVBZFIsQUFjVSxVQWRBLENBY0EsRUFBRSxFQWRaLEFBY2MsVUFkSixDQWNJLEVBQUUsRUFkaEIsQUFja0IsVUFkUixDQWNRLEVBQUUsRUFkcEIsQUFjc0IsVUFkWixDQWNZLEVBQUUsQ0FBQztFQUNyQixVQUFVLEVBQUUsSUFBSTtFQUNoQixXQUFXLEVBQUUsR0FBRztFQUNoQixVQUFVLEVBQUUsTUFBTSxHQUNuQjs7QUFsQkgsQUFvQkUsVUFwQlEsQ0FvQlIsRUFBRSxDQUFDO0VBQ0QsU0FBUyxFQUFFLElBQUk7RUFDZixjQUFjLEVBQUUsTUFBTTtFQUN0QixXQUFXLEVBQUUsSUFBSTtFQUNqQixVQUFVLEVBQUUsSUFBSSxHQUNqQjs7QUF6QkgsQUEyQkUsVUEzQlEsQ0EyQlIsRUFBRSxDQUFDO0VBQ0QsU0FBUyxFQUFFLElBQUk7RUFDZixjQUFjLEVBQUUsTUFBTTtFQUN0QixXQUFXLEVBQUUsSUFBSTtFQUNqQixVQUFVLEVBQUUsSUFBSSxHQUNqQjs7QUFoQ0gsQUFrQ0UsVUFsQ1EsQ0FrQ1IsRUFBRSxDQUFDO0VBQ0QsU0FBUyxFQUFFLElBQUk7RUFDZixjQUFjLEVBQUUsT0FBTztFQUN2QixXQUFXLEVBQUUsSUFBSTtFQUNqQixVQUFVLEVBQUUsSUFBSSxHQUNqQjs7QUF2Q0gsQUF5Q0UsVUF6Q1EsQ0F5Q1IsQ0FBQyxDQUFDO0VBQ0EsV0FBVyxFaEJaRyxhQUFhLEVBQUUsS0FBSztFZ0JhbEMsU0FBUyxFQUFFLElBQUk7RUFDZixXQUFXLEVBQUUsR0FBRztFQUNoQixjQUFjLEVBQUUsT0FBTztFQUN2QixXQUFXLEVBQUUsSUFBSTtFQUNqQixVQUFVLEVBQUUsSUFBSSxHQUNqQjs7QUFoREgsQUFrREssVUFsREssR0FrREwsQ0FBQyxBQUFBLGNBQWMsQUFBQSxhQUFhLENBQUM7RUFDOUIsS0FBSyxFQUFFLElBQUk7RUFDWCxTQUFTLEVBQUUsSUFBSTtFQUNmLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLGFBQWEsRUFBRSxNQUFNO0VBQ3JCLFdBQVcsRUFBRSxJQUFJO0VBQ2pCLFlBQVksRUFBRSxHQUFHO0VBQ2pCLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLGNBQWMsRUFBRSxTQUFTLEdBQzFCOztBQTlESCxBQWdFRSxVQWhFUSxDQWdFUixFQUFFO0FBaEVKLEFBaUVFLFVBakVRLENBaUVSLEVBQUUsQ0FBQztFQUNELGFBQWEsRUFBRSxJQUFJO0VBQ25CLFdBQVcsRWhCckNHLGFBQWEsRUFBRSxLQUFLO0VnQnNDbEMsU0FBUyxFQUFFLElBQUk7RUFDZixVQUFVLEVBQUUsSUFBSSxHQWlCakI7RUF0RkgsQUF1RUksVUF2RU0sQ0FnRVIsRUFBRSxDQU9BLEVBQUU7RUF2RU4sQUF1RUksVUF2RU0sQ0FpRVIsRUFBRSxDQU1BLEVBQUUsQ0FBQztJQUNELGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFdBQVcsRUFBRSxJQUFJLEdBVWxCO0lBckZMLEFBdUVJLFVBdkVNLENBZ0VSLEVBQUUsQ0FPQSxFQUFFLEFBTUQsUUFBVTtJQTdFZixBQXVFSSxVQXZFTSxDQWlFUixFQUFFLENBTUEsRUFBRSxBQU1ELFFBQVUsQ0FBQztNQUNSLFVBQVUsRUFBRSxVQUFVO01BQ3RCLE9BQU8sRUFBRSxZQUFZO01BQ3JCLFdBQVcsRUFBRSxLQUFLO01BQ2xCLFFBQVEsRUFBRSxRQUFRO01BQ2xCLFVBQVUsRUFBRSxLQUFLO01BQ2pCLEtBQUssRUFBRSxJQUFJLEdBQ1o7O0FBcEZQLEFBd0ZLLFVBeEZLLENBd0ZSLEVBQUUsQ0FBQyxFQUFFLEFBQUEsUUFBUSxDQUFDO0VBQ1osT0FBTyxFQUFFLEtBQUs7RUFDZCxTQUFTLEVBQUUsTUFBTTtFQUNqQixhQUFhLEVBQUUsSUFBSTtFQUNuQixXQUFXLEVBQUUsR0FBRyxHQUNqQjs7QUE3RkgsQUErRkssVUEvRkssQ0ErRlIsRUFBRSxDQUFDLEVBQUUsQUFBQSxRQUFRLENBQUM7RUFDWixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUc7RUFDMUIsaUJBQWlCLEVBQUUsSUFBSTtFQUN2QixhQUFhLEVBQUUsSUFBSSxHQUNwQjs7QUFuR0gsQUFxR0UsVUFyR1EsQ0FxR1IsY0FBYztBQXJHaEIsQUFzR0UsVUF0R1EsQ0FzR1IsTUFBTSxDQUFDO0VBQ0wsT0FBTyxFQUFFLEtBQUs7RUFDZCxXQUFXLEVBQUUsZUFBZTtFQUM1QixZQUFZLEVBQUUsZUFBZTtFQUM3QixVQUFVLEVBQUUsZUFBZSxHQUM1Qjs7QUEzR0gsQUE2R29CLFVBN0dWLENBNkdSLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztFQUFFLFVBQVUsRUFBRSxZQUFZLEdBQUc7O0FBT3hELEFBQ0UsVUFEUSxDQUNSLENBQUMsQ0FBQztFQUNBLFVBQVUsRUFBRSxtQkFBa0I7RUFDOUIsTUFBTSxFQUFFLElBQUk7RUFDWixhQUFhLEVBQUUsR0FBRztFQUNsQixLQUFLLEVBQUUsa0JBQWlCO0VBQ3hCLGFBQWEsRUFBRSxHQUFHO0VBQ2xCLFlBQVksRUFBRSxHQUFHLEdBS2xCO0VBWkgsQUFDRSxVQURRLENBQ1IsQ0FBQyxBQU9DLE1BQU8sQ0FBQztJQUNOLFVBQVUsRUFBRSxrQkFBaUI7SUFDN0IsS0FBSyxFQUFFLGtCQUFpQixHQUN6Qjs7QUFPTCxBQUFBLGdCQUFnQixDQUFDO0VBQ2YsU0FBUyxFQUFFLEtBQUssR0FtQ2pCO0VBcENELEFBRUUsZ0JBRmMsQ0FFZCxnQkFBZ0IsQ0FBQztJQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUc7RUFGdkMsQUFJRSxnQkFKYyxDQUlkLFdBQVcsQ0FBQztJQUFFLEtBQUssRUFBRSxHQUFHO0lBQUcsYUFBYSxFQUFFLEdBQUcsR0FBSztFQUpwRCxBQUtFLGdCQUxjLENBS2QsWUFBWSxDQUFDO0lBQ1gsTUFBTSxFQUFFLENBQUM7SUFDVCxhQUFhLEVBQUUsY0FBYztJQUM3QixNQUFNLEVBQUUsSUFBSTtJQUNaLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsTUFBTSxFQUFFLElBQUk7SUFDWixLQUFLLEVBQUUsSUFBSSxHQUlaO0lBZkgsQUFLRSxnQkFMYyxDQUtkLFlBQVksQUFPVixNQUFPLENBQUM7TUFDTixPQUFPLEVBQUUsQ0FBQyxHQUNYO0VBZEwsQUFnQkUsZ0JBaEJjLENBZ0JkLFVBQVUsQ0FBQztJQUNULGdCQUFnQixFQUFFLE9BQU87SUFDekIsYUFBYSxFQUFFLGFBQWE7SUFDNUIsTUFBTSxFQUFFLENBQUM7SUFDVCxLQUFLLEVBQUUsSUFBSTtJQUNYLE1BQU0sRUFBRSxPQUFPO0lBQ2YsT0FBTyxFQUFFLENBQUM7SUFDVixLQUFLLEVBQUUsR0FBRyxHQVlYO0lBbkNILEFBZ0JFLGdCQWhCYyxDQWdCZCxVQUFVLEFBU1IsUUFBUyxDQUFDO01BRVIsZ0JBQWdCLEVBQUUsT0FBTztNQUN6QixhQUFhLEVBQUUsYUFBYTtNQUM1QixXQUFXLEVBQUUsSUFBSTtNQUNqQixPQUFPLEVBQUUsQ0FBQyxHQUNYO0lBL0JMLEFBZ0JFLGdCQWhCYyxDQWdCZCxVQUFVLEFBaUJSLE1BQU8sQ0FBQztNQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUs7SUFqQzdCLEFBZ0JFLGdCQWhCYyxDQWdCZCxVQUFVLEFBa0JSLE1BQU8sQ0FBQztNQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUs7O0FBTzdCLEFBQ0UsYUFEVyxDQUNYLFlBQVksQ0FBQztFQUNYLGFBQWEsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFvQjtFQUM3QyxhQUFhLEVBQUUsV0FBVztFQUMxQixNQUFNLEVBQUUsS0FBSyxHQUNkOztBQUxILEFBT0UsYUFQVyxDQU9YLFlBQVksQ0FBQztFQUNYLEtBQUssRUFBRSxrQkFBYztFQUNyQixrQkFBa0IsRUFBRSxtQkFBbUI7RUFDdkMsa0JBQWtCLEVBQUUsWUFBWTtFQUNoQyxPQUFPLEVBQUUsV0FBVyxDQUFBLFVBQVU7RUFDOUIsV0FBVyxFQUFFLGNBQWM7RUFDM0IsVUFBVSxFQUFFLGdCQUFnQjtFQUM1QixhQUFhLEVBQUUsbUJBQW1CLEdBQ25DOztBQWZILEFBaUJFLGFBakJXLENBaUJYLE9BQU8sQ0FBQztFQUNOLE1BQU0sRUFBRSxLQUFLLEdBQ2Q7O0FBTUgsQUFBQSxVQUFVLENBQUM7RUFDVCxXQUFXLEVBQUUsTUFBTTtFQUNuQixVQUFVLEVBQUUsSUFBSTtFQUNoQixLQUFLLEVBQUUsSUFBSSxHQWFaO0VBaEJELEFBS0UsVUFMUSxDQUtSLENBQUMsQ0FBQztJQUNBLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsYUFBYSxFQUFFLEdBQUc7SUFDbEIsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsSUFBSTtJQUNaLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE9BQU8sRUFBRSxHQUFHO0lBQ1osZUFBZSxFQUFFLElBQUk7SUFDckIsS0FBSyxFQUFFLElBQUksR0FDWjs7QUFLSCxBQUFBLFlBQVksQ0FBQztFQUNYLGdCQUFnQixFQUFFLElBQUk7RUFDdEIsTUFBTSxFQUFFLENBQUM7RUFDVCxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsbUJBQWtCO0VBQ3RDLE1BQU0sRUFBRSxJQUFJO0VBQ1osSUFBSSxFQUFFLENBQUM7RUFDUCxRQUFRLEVBQUUsS0FBSztFQUNmLEtBQUssRUFBRSxDQUFDO0VBQ1IsU0FBUyxFQUFFLGdCQUFnQjtFQUMzQixVQUFVLEVBQUUsYUFBYTtFQUN6QixVQUFVLEVBQUUsTUFBTTtFQUNsQixPQUFPLEVBQUUsR0FBRyxHQWdCYjtFQTNCRCxBQWFFLFlBYlUsQUFhVixXQUFZLENBQUM7SUFDWCxTQUFTLEVBQUUsYUFBYTtJQUN4QixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLFVBQVUsRUFBRSxPQUFPLEdBQ3BCO0VBRUQsQUFBQSxpQkFBTSxDQUFDO0lBQUMsU0FBUyxFQUFFLE1BQU0sR0FBSTtFQW5CL0IsQUFxQkUsWUFyQlUsQ0FxQlYsVUFBVSxDQUFDO0lBQ1QsVUFBVSxFQUFFLG1CQUFrQjtJQUM5QixNQUFNLEVBQUUsSUFBSTtJQUNaLE1BQU0sRUFBRSxNQUFNO0lBQ2QsS0FBSyxFQUFFLEdBQUcsR0FDWDs7QUFHSCxBQUFBLFNBQVMsQ0FBQztFQUNSLFNBQVMsRUFBRSxLQUFLLEdBQ2pCOztBQUdELE1BQU0sTUFBTSxNQUFNLE1BQU0sU0FBUyxFQUFHLEtBQUs7RUFFdkMsQUFFRSxVQUZRLENBRVIsRUFBRSxDQUFDO0lBQ0QsU0FBUyxFQUFFLElBQUk7SUFDZixVQUFVLEVBQUUsSUFBSSxHQUNqQjtFQUxILEFBT0UsVUFQUSxDQU9SLEVBQUUsQ0FBQztJQUNELFNBQVMsRUFBRSxJQUFJO0lBQ2YsVUFBVSxFQUFFLElBQUksR0FDakI7RUFWSCxBQVlFLFVBWlEsQ0FZUixFQUFFLENBQUM7SUFDRCxTQUFTLEVBQUUsSUFBSTtJQUNmLFVBQVUsRUFBRSxJQUFJLEdBQ2pCO0VBZkgsQUFpQkUsVUFqQlEsQ0FpQlIsQ0FBQyxDQUFDO0lBQ0EsU0FBUyxFQUFFLGVBQWU7SUFDMUIsY0FBYyxFQUFFLGtCQUFrQjtJQUNsQyxXQUFXLEVBQUUsY0FBYyxHQUM1QjtFQXJCSCxBQXVCSyxVQXZCSyxHQXVCTCxDQUFDLEFBQUEsY0FBYyxBQUFBLGFBQWEsQ0FBQztJQUM5QixTQUFTLEVBQUUsT0FBTztJQUNsQixXQUFXLEVBQUUsSUFBSTtJQUNqQixZQUFZLEVBQUUsR0FBRztJQUNqQixXQUFXLEVBQUUsS0FBSyxHQUNuQjtFQTVCSCxBQThCRSxVQTlCUSxDQThCUixFQUFFLEVBOUJKLEFBOEJPLFVBOUJHLENBOEJILEVBQUUsRUE5QlQsQUE4QlcsVUE5QkQsQ0E4QkMsQ0FBQyxDQUFDO0lBQ1QsU0FBUyxFQUFFLElBQUk7SUFDZixjQUFjLEVBQUUsT0FBTztJQUN2QixXQUFXLEVBQUUsSUFBSSxHQUNsQjs7QUMvU0wsQUFBQSxPQUFPLENBQUM7RUFDTixnQkFBZ0IsRUFBRSxJQUFJO0VBQ3RCLEtBQUssRUFBRSxrQkFBaUI7RUFDeEIsVUFBVSxFQUFFLEtBQUssR0FxRGxCO0VBeERELEFBS0UsT0FMSyxDQUtMLENBQUMsQ0FBQztJQUNBLEtBQUssRUFBRSxrQkFBaUIsR0FJekI7SUFWSCxBQUtFLE9BTEssQ0FLTCxDQUFDLEFBRUMsTUFBTyxDQUFDO01BQ04sS0FBSyxFQUFFLGtCQUFpQixHQUN6QjtFQUdILEFBQUEsWUFBTSxDQUFDO0lBQ0wsT0FBTyxFQUFFLENBQUMsR0FDWDtFQUVELEFBQUEsY0FBUSxDQUFDO0lBQ1AsTUFBTSxFQUFFLElBQUk7SUFDWixZQUFZLEVBQUUsSUFBSTtJQUNsQixLQUFLLEVBQUUsSUFBSSxHQUNaO0VBRUQsQUFDRSxZQURJLENBQ0osSUFBSSxDQUFDO0lBQ0gsT0FBTyxFQUFFLFlBQVk7SUFDckIsU0FBUyxFQUFFLElBQUk7SUFDZixVQUFVLEVBQUUsTUFBTTtJQUNsQixNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUUsRUFBRTtJQUNYLFNBQVMsRUFBRSxVQUFVLEdBQ3RCO0VBR0gsQUFBQSxZQUFNLENBQUM7SUFBRSxLQUFLLEVBQUUsa0JBQWMsR0FBRTtFQUVoQyxBQUFBLFdBQUssQ0FBQztJQUNKLFNBQVMsRUFBRSxLQUFLLEdBRWpCO0VBRUQsQUFBUyxjQUFELENBQUMsQ0FBQyxDQUFDO0lBQ1QsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsd0JBQWtCO0lBQzlDLE1BQU0sRUFBRSxPQUFPO0lBQ2YsT0FBTyxFQUFFLFlBQVk7SUFDckIsTUFBTSxFQUFFLElBQUk7SUFDWixXQUFXLEVBQUUsSUFBSTtJQUNqQixNQUFNLEVBQUUsTUFBTTtJQUNkLE9BQU8sRUFBRSxNQUFNO0lBQ2YsV0FBVyxFQUFFLElBQUksR0FNbEI7SUFkRCxBQUFTLGNBQUQsQ0FBQyxDQUFDLEFBVVIsTUFBTyxDQUFDO01BQ04sVUFBVSxFQUFFLG9CQUFvQixHQUNqQzs7QUFPTCxBQUFBLE9BQU8sQUFBQSxXQUFXLENBQUM7RUFDakIsS0FBSyxFQUFFLGVBQWU7RUFDdEIsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFrQixHQUt6QztFQVBELEFBSUUsT0FKSyxBQUFBLFdBQVcsQ0FJaEIsWUFBWSxBQUFBLE1BQU0sQ0FBQztJQUFFLE9BQU8sRUFBRSxDQUFDLENBQUEsVUFBVSxHQUFFO0VBSjdDLEFBS0UsT0FMSyxBQUFBLFdBQVcsQ0FLaEIsQ0FBQztFQUxILEFBTUUsT0FOSyxBQUFBLFdBQVcsQ0FNaEIsWUFBWSxDQUFDO0lBQUUsS0FBSyxFQUFFLElBQUksR0FBSTs7QUFHaEMsTUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLEVBQUcsS0FBSztFQUN2QyxBQUFhLFlBQUQsQ0FBQyxJQUFJLENBQUM7SUFBQyxPQUFPLEVBQUUsS0FBSyxHQUFJOztBQ25FdkMsQUFBQSxPQUFPLENBQUM7RUFDTixnQkFBZ0IsRUFBRSxJQUFJO0VBQ3RCLE9BQU8sRUFBRSxJQUFJO0VBQ2IsTUFBTSxFQUFFLElBQUk7RUFDWixPQUFPLEVBQUUsUUFBUTtFQUNqQixRQUFRLEVBQUUsZ0JBQWdCO0VBQzFCLE9BQU8sRUFBRSxJQUFJLEdBa0RkO0VBaERDLEFBQUEsY0FBUSxDQUFDO0lBQ1AsVUFBVSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFrQjtJQUN0QyxNQUFNLEVsQitFYSxJQUFJO0lrQjlFdkIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTyxFQUFFLE1BQU0sR0FDaEI7RUFFRCxBQUFBLFlBQU0sQ0FBQztJQUNMLFNBQVMsRUFBRSxLQUFLLEdBdUJqQjtJQXhCRCxBQUdFLFlBSEksQUFHSixRQUFTLENBQUM7TUFDUixVQUFVLEVBQUUsSUFBSTtNQUNoQixNQUFNLEVBQUUsQ0FBQztNQUNULE9BQU8sRUFBRSxFQUFFO01BQ1gsT0FBTyxFQUFFLEtBQUs7TUFDZCxNQUFNLEVBQUUsR0FBRztNQUNYLElBQUksRUFBRSxDQUFDO01BQ1AsUUFBUSxFQUFFLFFBQVE7TUFDbEIsS0FBSyxFQUFFLElBQUk7TUFDWCxPQUFPLEVBQUUsQ0FBQyxHQUNYO0lBYkgsQUFlRSxZQWZJLENBZUosS0FBSyxDQUFDO01BQ0osTUFBTSxFQUFFLElBQUk7TUFDWixPQUFPLEVBQUUsS0FBSztNQUNkLFdBQVcsRUFBRSxJQUFJO01BQ2pCLGNBQWMsRUFBRSxHQUFHLEdBR3BCO01BdEJILEFBZUUsWUFmSSxDQWVKLEtBQUssQUFNSCxNQUFPLENBQUM7UUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFLO0VBTTdCLEFBQUEsZUFBUyxDQUFDO0lBQ1IsSUFBSSxFQUFFLENBQUM7SUFDUCxNQUFNLEVBQUUsSUFBSTtJQUNaLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFFBQVEsRUFBRSxJQUFJLEdBU2Y7SUFiRCxBQU1FLGVBTk8sQ0FNUCxDQUFDLENBQUM7TUFDQSxhQUFhLEVBQUUsY0FBYztNQUM3QixPQUFPLEVBQUUsTUFBTSxHQUloQjtNQVpILEFBTUUsZUFOTyxDQU1QLENBQUMsQUFHQyxNQUFPLENBQUM7UUFDTixLQUFLLEVBQUUsbUJBQWtCLEdBQzFCOztBQU1QLEFBQUEsSUFBSSxBQUFBLFVBQVUsQ0FBQztFQUNiLFFBQVEsRUFBRSxNQUFNLEdBTWpCO0VBUEQsQUFHRSxJQUhFLEFBQUEsVUFBVSxDQUdaLE9BQU8sQ0FBQztJQUNOLE9BQU8sRUFBRSxJQUFJO0lBQ2IsY0FBYyxFQUFFLE1BQU0sR0FDdkI7O0FDbEVELEFBQUEsY0FBTyxDQUFDO0VBQ04sYUFBYSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQW9CO0VBQzdDLFdBQVcsRUFBRSxHQUFHO0VBQ2hCLGFBQWEsRUFBRSxJQUFJO0VBQ25CLGNBQWMsRUFBRSxHQUFHLEdBQ3BCOztBQUdELEFBQUEsZUFBUSxDQUFDO0VBQ1AsV0FBVyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENuQlBWLE9BQU87RW1CUW5CLE1BQU0sRUFBRSxDQUFDO0VBQ1QsS0FBSyxFQUFFLGtCQUFpQjtFQUN4QixXQUFXLEVuQjhCRyxhQUFhLEVBQUUsS0FBSztFbUI3QmxDLElBQUksRUFBRSxDQUFDO0VBQ1AsT0FBTyxFQUFFLGNBQWM7RUFDdkIsR0FBRyxFQUFFLENBQUMsR0FDUDs7QUFHSCxBQUNvQixhQURQLEFBQ1gsVUFBWSxDQUFBLEVBQUUsRUFBSSxlQUFlLENBQUM7RUFBRSxZQUFZLEVBQUUsT0FBa0IsR0FBSTs7QUFEMUUsQUFFc0IsYUFGVCxBQUVYLFVBQVksQ0FBQSxJQUFJLEVBQUksZUFBZSxDQUFDO0VBQUUsWUFBWSxFQUFFLE9BQVEsR0FBRzs7QUFFL0QsQUFBQSxvQkFBUSxDQUFDO0VBQ1AsV0FBVyxFQUFFLEdBQUcsR0FDakI7O0FBRUQsQUFBQSxtQkFBTyxDQUFDO0VBQ04sZ0JBQWdCLEVBQUUsSUFBSTtFQUN0QixVQUFVLEVBQUUsSUFBSTtFQUNoQixPQUFPLEVBQUUsbUJBQW1CLEdBRzdCO0VBTkQsQUFJWSxtQkFKTCxBQUlMLE1BQU8sQ0FBRyxlQUFlLENBQUM7SUFBQyxnQkFBZ0IsRUFBRSxPQUFtQixHQUFHOztBQzlCdkUsQUFBQSxRQUFRLENBQUM7RUFFUCxLQUFLLEVBQUUsa0JBQWlCO0VBQ3hCLE1BQU0sRUFBRSxLQUFLO0VBQ2IsT0FBTyxFcEJxRmMsSUFBSSxDb0JyRk0sSUFBSTtFQUNuQyxRQUFRLEVBQUUsZ0JBQWdCO0VBQzFCLFNBQVMsRUFBRSxnQkFBZ0I7RUFDM0IsVUFBVSxFQUFFLEdBQUc7RUFDZixXQUFXLEVBQUUsU0FBUztFQUN0QixPQUFPLEVBQUUsRUFBRSxHQXlDWjtFQXZDQyxBQUFPLGFBQUQsQ0FBQyxDQUFDLENBQUM7SUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFLO0VBRWxDLEFBQUEsYUFBTSxDQUFDO0lBQ0wsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFLElBQUk7SUFDZCxPQUFPLEVBQUUsTUFBTTtJQUNmLEdBQUcsRXBCd0VnQixJQUFJLEdvQnZFeEI7RUFFRCxBQUFBLGdCQUFTLENBQUM7SUFDUixhQUFhLEVBQUUsY0FBYztJQUM3QixhQUFhLEVBQUUsR0FBRztJQUNsQixjQUFjLEVBQUUsR0FBRyxHQUNwQjtFQUVELEFBQUEsZUFBUSxDQUFDO0lBQ1AsVUFBVSxFQUFFLGNBQWM7SUFDMUIsTUFBTSxFQUFFLE1BQU0sR0FtQmY7SUFyQkQsQUFJRSxlQUpNLENBSU4sQ0FBQyxDQUFDO01BQ0EsS0FBSyxFQUFFLElBQUk7TUFDWCxPQUFPLEVBQUUsWUFBWTtNQUNyQixNQUFNLEVBQUUsSUFBSTtNQUNaLFdBQVcsRUFBRSxJQUFJO01BQ2pCLE1BQU0sRUFBRSxXQUFXO01BQ25CLFNBQVMsRUFBRSxJQUFJO01BQ2YsT0FBTyxFQUFFLEdBQUc7TUFDWixVQUFVLEVBQUUsTUFBTTtNQUNsQixjQUFjLEVBQUUsTUFBTSxHQUN2QiJ9 */","%link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n%link--accent {\n  color: $primary-color;\n  text-decoration: none;\n  &:hover {color: $primary-color-hover;}\n}\n\n%content-absolute-bottom {\n  bottom: 0;\n  left: 0;\n  margin: 30px;\n  max-width: 600px;\n  position: absolute;\n  z-index: 2;\n}\n\n%u-absolute0 {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n%u-text-color-darker {\n  color: rgba(0, 0, 0, .8) !important;\n  fill: rgba(0, 0, 0, .8) !important;\n}\n\n%fonts-icons {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n","@charset \"UTF-8\";\n\n.link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.link--accent {\n  color: #00A034;\n  text-decoration: none;\n}\n\n.link--accent:hover {\n  color: #00ab6b;\n}\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.tag.not--image,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v6.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  text-shadow: 0 1px white;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection,\npre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection,\ncode[class*=\"language-\"] ::-moz-selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection,\npre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection,\ncode[class*=\"language-\"] ::selection {\n  text-shadow: none;\n  background: #b3d4fc;\n}\n\n@media print {\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    text-shadow: none;\n  }\n}\n\n/* Code blocks */\n\npre[class*=\"language-\"] {\n  padding: 1em;\n  margin: .5em 0;\n  overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background: #f5f2f0;\n}\n\n/* Inline code */\n\n:not(pre) > code[class*=\"language-\"] {\n  padding: .1em;\n  border-radius: .3em;\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: slategray;\n}\n\n.token.punctuation {\n  color: #999;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: #07a;\n}\n\n.token.function {\n  color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\nimg[data-action=\"zoom\"] {\n  cursor: zoom-in;\n}\n\n.zoom-img,\n.zoom-img-wrap {\n  position: relative;\n  z-index: 666;\n  -webkit-transition: all 300ms;\n  -o-transition: all 300ms;\n  transition: all 300ms;\n}\n\nimg.zoom-img {\n  cursor: pointer;\n  cursor: -webkit-zoom-out;\n  cursor: -moz-zoom-out;\n}\n\n.zoom-overlay {\n  z-index: 420;\n  background: #fff;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  filter: \"alpha(opacity=0)\";\n  opacity: 0;\n  -webkit-transition: opacity 300ms;\n  -o-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n\n.zoom-overlay-open .zoom-overlay {\n  filter: \"alpha(opacity=100)\";\n  opacity: 1;\n}\n\n.zoom-overlay-open,\n.zoom-overlay-transitioning {\n  cursor: default;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px;\n}\n\nfigure {\n  margin: 0;\n}\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px !important;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\ncode[class*=language-],\npre[class*=language-] {\n  color: #37474f;\n  line-height: 1.4;\n}\n\ncode[class*=language-] .token.comment,\npre[class*=language-] .token.comment {\n  opacity: .8;\n}\n\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n}\n\nhr::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: '...';\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: .6em;\n  position: relative;\n  top: -25px;\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\ni {\n  vertical-align: middle;\n}\n\nol,\nul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, #d7fdd3, #d7fdd3);\n  color: rgba(0, 0, 0, 0.8);\n}\n\nq {\n  color: rgba(0, 0, 0, 0.44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n}\n\nq:before,\nq:after {\n  display: none;\n}\n\n.main,\n.footer {\n  transition: transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  .main {\n    overflow: hidden;\n    padding-top: 50px;\n  }\n}\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n.warning::before {\n  content: \"\";\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n.note::before {\n  content: \"\";\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n.success::before {\n  color: #00bfa5;\n  content: \"\";\n}\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n  margin-top: -5px;\n}\n\n.tag {\n  color: #fff;\n  min-height: 250px;\n  z-index: 2;\n}\n\n.tag-wrap {\n  z-index: 2;\n}\n\n.tag.not--image {\n  min-height: auto;\n}\n\n.tag-description {\n  max-width: 500px;\n}\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n.with-tooltip:after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #FFF;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 130px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n.with-tooltip:hover:after {\n  animation: tooltip .1s ease-out both;\n}\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.footer a:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n}\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  left: 50%;\n  min-width: 680px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n}\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.video-responsive video {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n.bg-google,\n.sideNav-follow .i-google {\n  background-color: #dd4b39 !important;\n}\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n.c-github {\n  color: #555 !important;\n}\n\n.bg-github,\n.sideNav-follow .i-github {\n  background-color: #555 !important;\n}\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n.bg-linkedin,\n.sideNav-follow .i-linkedin {\n  background-color: #007bb6 !important;\n}\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n.bg-spotify,\n.sideNav-follow .i-spotify {\n  background-color: #2ebd59 !important;\n}\n\n.c-codepen {\n  color: #222 !important;\n}\n\n.bg-codepen,\n.sideNav-follow .i-codepen {\n  background-color: #222 !important;\n}\n\n.c-behance {\n  color: #131418 !important;\n}\n\n.bg-behance,\n.sideNav-follow .i-behance {\n  background-color: #131418 !important;\n}\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n.bg-dribbble,\n.sideNav-follow .i-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n.bg-flickr,\n.sideNav-follow .i-flickr {\n  background-color: #0063dc !important;\n}\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n.bg-reddit,\n.sideNav-follow .i-reddit {\n  background-color: #ff4500 !important;\n}\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n.bg-pocket,\n.sideNav-follow .i-pocket {\n  background-color: #f50057 !important;\n}\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n.bg-pinterest,\n.sideNav-follow .i-pinterest {\n  background-color: #bd081c !important;\n}\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n.bg-whatsapp,\n.sideNav-follow .i-whatsapp {\n  background-color: #64d448 !important;\n}\n\n.fbSave-dropdown {\n  background-color: #FFF;\n  border: 1px solid #e0e0e0;\n  bottom: 100%;\n  display: none;\n  max-width: 200px;\n  min-width: 100px;\n  padding: 8px;\n  transform: translate(-50%, 0);\n  z-index: 10;\n}\n\n.fbSave-dropdown.is-visible {\n  display: block;\n}\n\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  z-index: 888;\n  width: 60px;\n}\n\n.rocket:hover svg path {\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.svg-icon svg {\n  width: 100%;\n  height: auto;\n}\n\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n.loadingBar {\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  animation-delay: .8s;\n  animation: loading-bar 1s ease-in-out infinite;\n  display: block;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.u-bgColor {\n  background-color: #00A034;\n}\n\n.u-headerColorLink a {\n  color: #BBF1B9;\n}\n\n.u-headerColorLink a.active,\n.u-headerColorLink a:hover {\n  color: #EEFFEA;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-block {\n  display: block !important;\n}\n\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n.u-clear::before,\n.u-clear::after {\n  content: \" \";\n  display: table;\n}\n\n.u-clear::after {\n  clear: both;\n}\n\n.u-fontSize13 {\n  font-size: 13px;\n}\n\n.u-fontSize15 {\n  font-size: 15px;\n}\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n.u-fontSize28 {\n  font-size: 28px !important;\n}\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-md-fontSizeBase {\n    font-size: 18px !important;\n  }\n\n  .u-md-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n.u-fontWeightMedium {\n  font-weight: 500;\n}\n\n.u-fontWeightSemibold {\n  font-weight: 600;\n}\n\n.u-fontWeightBold {\n  font-weight: 700 !important;\n}\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n.u-marginBottom20 {\n  margin-bottom: 20px !important;\n}\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-floatRight {\n  float: right;\n}\n\n.u-floatLeft {\n  float: left;\n}\n\n.u-flex {\n  display: flex;\n}\n\n.u-flexCenter {\n  align-items: center;\n  display: flex;\n}\n\n.u-flex1 {\n  flex: 1 1 auto;\n}\n\n.u-flex0 {\n  flex: 0 0 auto;\n}\n\n.u-flexWrap {\n  flex-wrap: wrap;\n}\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.u-round {\n  border-radius: 50%;\n}\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n.u-card--p {\n  font-family: \"Droid Serif\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n.u-hide {\n  display: none !important;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n.u-wrap {\n  margin: 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n  width: 100%;\n}\n\n@media only screen and (min-width: 1230px) {\n  .u-wrap {\n    max-width: 1200px;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .content {\n    flex: 1 !important;\n    max-width: calc(100% - 340px) !important;\n    order: 1;\n  }\n\n  .sidebar {\n    flex: 0 0 340px !important;\n    order: 2;\n  }\n}\n\n.row {\n  display: flex;\n  flex: 0 1 auto;\n  flex-flow: row wrap;\n  margin-left: -12px;\n  margin-right: -12px;\n}\n\n.row .col {\n  flex: 0 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n\n.row .col.s1 {\n  flex-basis: 8.33333%;\n  max-width: 8.33333%;\n}\n\n.row .col.s2 {\n  flex-basis: 16.66667%;\n  max-width: 16.66667%;\n}\n\n.row .col.s3 {\n  flex-basis: 25%;\n  max-width: 25%;\n}\n\n.row .col.s4 {\n  flex-basis: 33.33333%;\n  max-width: 33.33333%;\n}\n\n.row .col.s5 {\n  flex-basis: 41.66667%;\n  max-width: 41.66667%;\n}\n\n.row .col.s6 {\n  flex-basis: 50%;\n  max-width: 50%;\n}\n\n.row .col.s7 {\n  flex-basis: 58.33333%;\n  max-width: 58.33333%;\n}\n\n.row .col.s8 {\n  flex-basis: 66.66667%;\n  max-width: 66.66667%;\n}\n\n.row .col.s9 {\n  flex-basis: 75%;\n  max-width: 75%;\n}\n\n.row .col.s10 {\n  flex-basis: 83.33333%;\n  max-width: 83.33333%;\n}\n\n.row .col.s11 {\n  flex-basis: 91.66667%;\n  max-width: 91.66667%;\n}\n\n.row .col.s12 {\n  flex-basis: 100%;\n  max-width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  .row .col.m1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .row .col.m2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .row .col.m3 {\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .row .col.m4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .row .col.m5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .row .col.m6 {\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .row .col.m7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .row .col.m8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .row .col.m9 {\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .row .col.m10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .row .col.m11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .row .col.m12 {\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .row .col.l1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .row .col.l2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .row .col.l3 {\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .row .col.l4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .row .col.l5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .row .col.l6 {\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .row .col.l7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .row .col.l8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .row .col.l9 {\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .row .col.l10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .row .col.l11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .row .col.l12 {\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.button i {\n  display: inline-block;\n}\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n.button--chromeless:active,\n.button--chromeless:hover,\n.button--chromeless:focus {\n  border-width: 0;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"./../fonts/simply.eot\");\n  src: url(\"./../fonts/simply.eot\") format(\"embedded-opentype\"), url(\"./../fonts/simply.ttf\") format(\"truetype\"), url(\"./../fonts/simply.woff\") format(\"woff\"), url(\"./../fonts/simply.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.i-comments:before {\n  content: \"\\e900\";\n}\n\n.i-location:before {\n  content: \"\\e8b4\";\n}\n\n.i-save:before {\n  content: \"\\e8e6\";\n}\n\n.i-save--line:before {\n  content: \"\\e8e7\";\n}\n\n.i-check-circle:before {\n  content: \"\\e86c\";\n}\n\n.i-close:before {\n  content: \"\\e5cd\";\n}\n\n.i-favorite:before {\n  content: \"\\e87d\";\n}\n\n.i-star:before {\n  content: \"\\e838\";\n}\n\n.i-warning:before {\n  content: \"\\e002\";\n}\n\n.i-rss:before {\n  content: \"\\e0e5\";\n}\n\n.i-search:before {\n  content: \"\\e8b6\";\n}\n\n.i-send:before {\n  content: \"\\e163\";\n}\n\n.i-share:before {\n  content: \"\\e80d\";\n}\n\n.i-link:before {\n  content: \"\\f0c1\";\n}\n\n.i-reddit:before {\n  content: \"\\f281\";\n}\n\n.i-twitter:before {\n  content: \"\\f099\";\n}\n\n.i-github:before {\n  content: \"\\f09b\";\n}\n\n.i-linkedin:before {\n  content: \"\\f0e1\";\n}\n\n.i-code:before {\n  content: \"\\f121\";\n}\n\n.i-youtube:before {\n  content: \"\\f16a\";\n}\n\n.i-stack-overflow:before {\n  content: \"\\f16c\";\n}\n\n.i-instagram:before {\n  content: \"\\f16d\";\n}\n\n.i-flickr:before {\n  content: \"\\f16e\";\n}\n\n.i-dribbble:before {\n  content: \"\\f17d\";\n}\n\n.i-behance:before {\n  content: \"\\f1b4\";\n}\n\n.i-spotify:before {\n  content: \"\\f1bc\";\n}\n\n.i-codepen:before {\n  content: \"\\f1cb\";\n}\n\n.i-facebook:before {\n  content: \"\\f230\";\n}\n\n.i-pinterest:before {\n  content: \"\\f231\";\n}\n\n.i-whatsapp:before {\n  content: \"\\f232\";\n}\n\n.i-snapchat:before {\n  content: \"\\f2ac\";\n}\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both;\n}\n\n.animated.infinite {\n  animation-iteration-count: infinite;\n}\n\n.bounceIn {\n  animation-name: bounceIn;\n}\n\n.bounceInDown {\n  animation-name: bounceInDown;\n}\n\n.pulse {\n  animation-name: pulse;\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    transform: none;\n  }\n}\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n}\n\n@keyframes opacity {\n  0% {\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n\n@keyframes loading-bar {\n  0% {\n    transform: translateX(-100%);\n  }\n\n  40% {\n    transform: translateX(0);\n  }\n\n  60% {\n    transform: translateX(0);\n  }\n\n  100% {\n    transform: translateX(100%);\n  }\n}\n\n.header {\n  z-index: 80;\n}\n\n.header-wrap {\n  height: 50px;\n}\n\n.header-logo {\n  height: 30px;\n}\n\n.header-logo img {\n  max-height: 100%;\n}\n\n.header-logo,\n.header .button-search--open,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n.header-description {\n  color: #BBF1B9;\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 750px;\n}\n\n.follow > a {\n  padding-left: 15px;\n}\n\n.nav {\n  line-height: 40px;\n  padding: 8px 0;\n  position: relative;\n}\n\n.nav ul {\n  display: flex;\n}\n\n.nav li {\n  float: left;\n}\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n.button-search--open {\n  color: inherit !important;\n  padding-right: 0 !important;\n}\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n}\n\n.button-nav--toggle span {\n  background-color: #BBF1B9;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  transition: .4s;\n  width: 20px;\n}\n\n.button-nav--toggle span:first-child {\n  transform: translate(0, -6px);\n}\n\n.button-nav--toggle span:last-child {\n  transform: translate(0, 6px);\n}\n\nbody.is-frontpage .header-wrap {\n  height: auto;\n}\n\n@media only screen and (min-width: 766px) {\n  .header-wrap {\n    border: 0;\n  }\n\n  .header-logo {\n    height: 30px;\n    padding-left: 0;\n  }\n\n  .header-top-section {\n    padding-top: 15px;\n  }\n\n  body.is-frontpage .header-wrap {\n    height: 200px;\n  }\n\n  body.is-frontpage .header-logo {\n    height: 40px;\n    margin-bottom: 15px;\n  }\n\n  body.is-frontpage .header-top-section {\n    padding-top: 0;\n  }\n\n  body.is-frontpage .nav ul {\n    flex: 1 1 auto;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed;\n  }\n\n  .header-wrap {\n    height: 50px !important;\n  }\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  body.is-showNavMob .sideNav {\n    transform: translateX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    transform: rotate(90deg);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    transform: rotate(45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    transform: scaleX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    transform: rotate(-45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    transform: translateX(-25%);\n  }\n}\n\n.entry-author {\n  line-height: 1.4;\n  padding-left: 10px;\n}\n\n.entry-avatar--img {\n  border-radius: 50%;\n  height: 40px;\n  width: 40px;\n}\n\n.entry-avatar--img.no-avatar {\n  background-image: url(\"./../images/avatar.png\") !important;\n}\n\n.entry.not--image {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.entry.u-card .entry-image {\n  max-height: 240px;\n  max-width: 360px;\n}\n\n.entry.entry--featured .entry-body {\n  display: flex;\n  flex-direction: column;\n}\n\n.entry.entry--featured .entry-image {\n  height: 200px;\n  margin-bottom: 20px;\n  margin-top: 5px;\n  max-width: 100%;\n  order: -1;\n}\n\n.entry.entry--featured .entry-image--link {\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n}\n\n.entry.entry--featured .entry-excerpt,\n.entry.even:not(.entry--featured) .entry-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n}\n\n.homePage .entry .u-backgroundDark {\n  display: none;\n}\n\n.homePage .entry-image {\n  height: 172px;\n}\n\n@media only screen and (min-width: 766px) {\n  .homePage .entry-image {\n    height: 174px;\n  }\n\n  .homePage .entry.entry1,\n  .homePage .entry.entry7 {\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .homePage .entry.entry1 {\n    display: flex;\n  }\n\n  .homePage .entry.entry1 .entry-image {\n    height: 350px;\n    margin-right: 15px;\n    width: 66.66666667% !important;\n  }\n\n  .homePage .entry.entry1 .entry-title {\n    font-size: 36px !important;\n  }\n\n  .homePage .entry.entry1 .entry-body {\n    padding: 0 0 0 13px;\n    width: 33.33333333% !important;\n  }\n\n  .homePage .entry.entry7 .entry-image {\n    height: 450px;\n  }\n\n  .homePage .entry.entry7 .entry-title {\n    font-size: 44px !important;\n  }\n\n  .homePage .entry.entry7 .entry-excerpt {\n    font-size: 24px;\n    line-height: 1.3;\n  }\n\n  .homePage .entry.entry7 .u-backgroundDark,\n  .homePage .entry.entry13 .u-backgroundDark,\n  .homePage .entry.entry14 .u-backgroundDark {\n    display: block;\n  }\n\n  .homePage .entry.entry7 .entry-body,\n  .homePage .entry.entry13 .entry-body,\n  .homePage .entry.entry14 .entry-body {\n    bottom: 0;\n    left: 0;\n    margin: 30px 40px;\n    max-width: 600px;\n    position: absolute;\n    z-index: 2;\n  }\n\n  .homePage .entry.entry7:not(.not--image) .entry-body,\n  .homePage .entry.entry13:not(.not--image) .entry-body,\n  .homePage .entry.entry14:not(.not--image) .entry-body {\n    color: #fff;\n  }\n\n  .homePage .entry.entry7:not(.not--image) .entry-author,\n  .homePage .entry.entry13:not(.not--image) .entry-author,\n  .homePage .entry.entry14:not(.not--image) .entry-author {\n    color: rgba(255, 255, 255, 0.9);\n  }\n\n  .homePage .entry.entry7:not(.not--image) .entry-author a,\n  .homePage .entry.entry7:not(.not--image) .entry-author .entry-date,\n  .homePage .entry.entry13:not(.not--image) .entry-author a,\n  .homePage .entry.entry13:not(.not--image) .entry-author .entry-date,\n  .homePage .entry.entry14:not(.not--image) .entry-author a,\n  .homePage .entry.entry14:not(.not--image) .entry-author .entry-date {\n    color: rgba(255, 255, 255, 0.9);\n  }\n\n  .homePage .entry.entry13 .entry-image,\n  .homePage .entry.entry14 .entry-image {\n    height: 450px;\n  }\n\n  .homePage .entry.entry13 .entry-title,\n  .homePage .entry.entry14 .entry-title {\n    font-size: 32px !important;\n  }\n\n  .homePage .entry.entry13 .entry-excerpt,\n  .homePage .entry.entry14 .entry-excerpt {\n    display: none;\n  }\n\n  .homePage .entry.entry13 .entry-byline,\n  .homePage .entry.entry14 .entry-byline {\n    margin-top: 20px;\n  }\n\n  .homePage .entry.entry13 .entry-body,\n  .homePage .entry.entry14 .entry-body {\n    max-width: 400px;\n  }\n\n  .homePage .entry.entry5,\n  .homePage .entry.entry6,\n  .homePage .entry.entry11,\n  .homePage .entry.entry12 {\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .homePage .entry.entry5 .entry-image,\n  .homePage .entry.entry6 .entry-image,\n  .homePage .entry.entry11 .entry-image,\n  .homePage .entry.entry12 .entry-image {\n    height: 274px;\n  }\n\n  .homePage .entry.entry13 {\n    flex-basis: 60%;\n    max-width: 60%;\n    padding-right: 0;\n  }\n\n  .homePage .entry.entry14 {\n    flex-basis: 40%;\n    max-width: 40%;\n  }\n}\n\n.post-title {\n  line-height: 1.04;\n}\n\n.post-footer {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.post-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px;\n}\n\n.post-body > p:first-of-type:first-letter {\n  float: left;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.03em;\n  line-height: .83;\n  margin-bottom: -.08em;\n  margin-left: -5px;\n  margin-right: 7px;\n  padding-top: 7px;\n  text-transform: uppercase;\n}\n\n.post-body ul,\n.post-body ol {\n  counter-reset: post;\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  margin-top: 20px;\n}\n\n.post-body ul li,\n.post-body ol li {\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-bottom: 14px;\n  margin-left: 30px;\n}\n\n.post-body ul li::before,\n.post-body ol li::before {\n  box-sizing: border-box;\n  display: inline-block;\n  margin-left: -78px;\n  position: absolute;\n  text-align: right;\n  width: 78px;\n}\n\n.post-body ul li::before {\n  content: '•';\n  font-size: 16.8px;\n  padding-right: 15px;\n  padding-top: 4px;\n}\n\n.post-body ol li::before {\n  content: counter(post) \".\";\n  counter-increment: post;\n  padding-right: 12px;\n}\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  display: block;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  margin-top: 40px !important;\n}\n\n.post-body .video-responsive iframe {\n  margin-top: 0 !important;\n}\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.post-newsletter {\n  max-width: 520px;\n}\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n.post-related .entry-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 150px;\n}\n\n.post-related .entry-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n.post-related .u-card {\n  height: 240px;\n}\n\n.sharePost {\n  margin-left: -130px;\n  margin-top: 28px;\n  width: 45px;\n}\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translateY(100%);\n  transition: transform .3s;\n  visibility: hidden;\n  z-index: 400;\n}\n\n.postActions.is-visible {\n  transform: translateY(0);\n  transition-delay: 0s;\n  visibility: visible;\n}\n\n.postActions-wrap {\n  max-width: 1200px;\n}\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n@media only screen and (max-width: 766px) {\n  .post-body h2 {\n    font-size: 32px;\n    margin-top: 26px;\n  }\n\n  .post-body h3 {\n    font-size: 28px;\n    margin-top: 28px;\n  }\n\n  .post-body h4 {\n    font-size: 22px;\n    margin-top: 22px;\n  }\n\n  .post-body q {\n    font-size: 22px !important;\n    letter-spacing: -.008em !important;\n    line-height: 1.4 !important;\n  }\n\n  .post-body > p:first-of-type:first-letter {\n    font-size: 54.85px;\n    margin-left: -4px;\n    margin-right: 6px;\n    padding-top: 3.5px;\n  }\n\n  .post-body ol,\n  .post-body ul,\n  .post-body p {\n    font-size: 18px;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n.author a {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author a:hover {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.author-wrap {\n  z-index: 2;\n}\n\n.author-avatar {\n  height: 80px;\n  margin-right: 10px;\n  width: 80px;\n}\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author-bio {\n  max-width: 600px;\n}\n\n.author-follow a {\n  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.5);\n  cursor: pointer;\n  display: inline-block;\n  height: 40px;\n  line-height: 40px;\n  margin: 0 10px;\n  padding: 0 16px;\n  text-shadow: none;\n}\n\n.author-follow a:hover {\n  box-shadow: inset 0 0 0 2px #fff;\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block;\n  }\n}\n\n.search {\n  background-color: #fff;\n  display: none;\n  height: 100%;\n  padding: 0 20px 0;\n  position: fixed !important;\n  z-index: 9999;\n}\n\n.search-header {\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);\n  height: 50px;\n  margin: 0 -20px 30px;\n  padding: 0 20px;\n}\n\n.search-form {\n  max-width: 680px;\n}\n\n.search-form::before {\n  background: #eee;\n  bottom: 0;\n  content: '';\n  display: block;\n  height: 2px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n.search-form input {\n  border: none;\n  display: block;\n  line-height: 40px;\n  padding-bottom: 8px;\n}\n\n.search-form input:focus {\n  outline: 0;\n}\n\n.search-results {\n  flex: 1;\n  height: 100%;\n  max-width: 680px;\n  overflow: auto;\n}\n\n.search-results a {\n  border-bottom: 1px solid #eee;\n  padding: 12px 0;\n}\n\n.search-results a:hover {\n  color: rgba(0, 0, 0, 0.44);\n}\n\nbody.is-search {\n  overflow: hidden;\n}\n\nbody.is-search .search {\n  display: flex;\n  flex-direction: column;\n}\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n.sideNav {\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: .4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n","\n*, *:before, *:after {\n  box-sizing: inherit;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n\n  &:active,\n  &:hover {\n    outline: 0;\n  }\n}\n\nblockquote {\n  border-left: 3px solid rgba(0,0,0,.8);\n  font-family: $secundary-font;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: $primary-text-color;\n  font-family: $primary-font;\n  font-size: $font-size-base;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  margin: 0 auto;\n  text-rendering: optimizeLegibility;\n}\n\n//Default styles\nhtml {\n  box-sizing: border-box;\n  font-size: $font-size-root;\n}\n\nfigure {\n  margin: 0;\n}\n\n// Code\n// ==========================================================================\nkbd, samp, code {\n  background: $code-bg-color;\n  border-radius: 4px;\n  color: $code-color;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: $code-bg-color !important;\n  border-radius: 4px;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  margin-top: 30px !important;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n\n  code {\n    background: transparent;\n    color: $pre-code-color;\n    padding: 0;\n    text-shadow: 0 1px #fff;\n  }\n}\n\n\ncode[class*=language-],\npre[class*=language-] {\n  color: $pre-code-color;\n  line-height: 1.4;\n\n  .token.comment { opacity: .8; }\n\n}\n\n\n// hr\n// ==========================================================================\nhr {\n  border: 0;\n  display: block;\n  margin: 50px auto;\n  text-align: center;\n\n  &::before {\n    color: rgba(0, 0, 0, .6);\n    content: '...';\n    display: inline-block;\n    font-family: $primary-font;\n    font-size: 28px;\n    font-weight: 400;\n    letter-spacing: .6em;\n    position: relative;\n    top: -25px;\n  }\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n\n  &:not([src]) {\n    visibility: hidden;\n  }\n}\n\ni {\n  // display: inline-block;\n  vertical-align: middle;\n}\n\nol, ul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\nmark {\n  background-color: transparent !important;\n  background-image: linear-gradient(to bottom, rgba(215, 253, 211, 1), rgba(215, 253, 211, 1));\n  color: rgba(0, 0, 0, .8);\n}\n\nq {\n  color: rgba(0, 0, 0, .44);\n  display: block;\n  font-size: 28px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.014em;\n  line-height: 1.48;\n  padding-left: 50px;\n  padding-top: 15px;\n  text-align: left;\n\n  &:before, &:after {display: none;}\n}\n\n\n// Links color\n// ==========================================================================\n.link--accent { @extend %link--accent; }\n\n.link { @extend %link; }\n\n\n// Animation main page and footer\n// ==========================================================================\n.main,\n.footer {transition: transform .5s ease; }\n\n@media #{$md-and-down} {\n  .main {\n    overflow: hidden;\n    padding-top: $header-height-mobile;\n  }\n}\n\n// warning success and Note\n// ==========================================================================\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n  &::before {content: $i-warning;}\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n  &::before {content: $i-star;}\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n  &::before {color: #00bfa5; content: $i-check;}\n}\n\n.warning, .note, .success{\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.58 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n\n  a {\n    color: inherit;\n    text-decoration: underline;\n  }\n\n  &::before {\n    @extend %fonts-icons;\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n    margin-top: -5px;\n  }\n}\n\n// Page Tags\n// ==========================================================================\n.tag {\n  color: #fff;\n  min-height: 250px;\n  z-index: 2;\n\n  &-wrap {z-index: 2;}\n\n  &.not--image {\n    @extend %u-text-color-darker;\n    min-height: auto;\n  }\n\n  &-description {\n    max-width: 500px;\n  }\n}\n\n\n// toltip\n// ==========================================================================\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n\n  &:after {\n    background: rgba(0, 0, 0, .85);\n    border-radius: 4px;\n    color: #FFF;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 130px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1;\n  }\n\n  &:hover:after {\n    animation: tooltip .1s ease-out both;\n  }\n}\n\n// Footer\n// ==========================================================================\n.footer {\n  color: rgba(0, 0, 0, .44);\n\n  a {\n    color: rgba(0, 0, 0, .6);\n    &:hover {color: rgba(0, 0, 0, .8);}\n  }\n}\n\n// Error page\n// ==========================================================================\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n\n  &-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px;\n  }\n\n  &-text {\n    margin-top: 60px;\n    white-space: pre-wrap;\n  }\n\n  &-wrap {\n    color: rgba(0, 0, 0, .4);\n    left: 50%;\n    min-width: 680px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n}\n\n\n// Video Responsive\n// ==========================================================================\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n\n  iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n\n  video {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n}\n\n\n// Social Media Color\n// ==========================================================================\n@each $social-name, $color in $social-colors {\n  .c-#{$social-name} { color: $color !important;}\n  .bg-#{$social-name} { background-color: $color !important; }\n}\n\n\n// Facebook Save\n// ==========================================================================\n.fbSave {\n  &-dropdown {\n    background-color: #FFF;\n    border: 1px solid #e0e0e0;\n    bottom: 100%;\n    display: none;\n    max-width: 200px;\n    min-width: 100px;\n    padding: 8px;\n    transform: translate(-50%, 0);\n    z-index: 10;\n\n    &.is-visible {display: block; }\n  }\n}\n\n// Rocket for return top page\n// ==========================================================================\n.rocket {\n  bottom: 50px;\n  position: fixed;\n  right: 20px;\n  text-align: center;\n  z-index: 888;\n  width: 60px;\n\n  &:hover svg path {\n    fill: rgba(0, 0, 0, .6);\n  }\n}\n\n.svg-icon {\n  svg {\n    width: 100%;\n    height: auto;\n  }\n}\n\n// Load More\n// ==========================================================================\n.loadMore {\n  display: block;\n  font-size: 15px;\n  margin: 0 auto;\n  max-width: 1000px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n\n.loadingBar {\n  display: none;\n  height: 2px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  transform: translateX(100%);\n  z-index: 800;\n}\n\n.is-loading .loadingBar {\n  animation-delay: .8s;\n  animation: loading-bar 1s ease-in-out infinite;\n  display: block;\n}\n","// color\n.u-textColorNormal {\n  color: rgba(0, 0, 0, .44);\n  fill: rgba(0, 0, 0, .44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, .6);\n  fill: rgba(0, 0, 0, .6);\n}\n\n//  background color\n.u-bgColor { background-color: $primary-color; }\n\n.u-headerColorLink a {\n  color: $header-color;\n  &.active,\n  &:hover { color: $header-color-hover; }\n\n}\n\n.u-textColorDarker {@extend %u-text-color-darker;}\n\n// Positions\n.u-relative { position: relative; }\n.u-absolute { position: absolute; }\n.u-absolute0 { @extend %u-absolute0;}\n\n.u-block {display: block !important}\n\n//  Background\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, .3) 29%, rgba(0, 0, 0, .6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n// .u-background-white { background-color: #eeefee; }\n.u-backgroundWhite {background-color: #fafafa;}\n.u-backgroundColorGrayLight {background-color: #f0f0f0 !important;}\n\n// Clear\n.u-clear {\n  &::before,\n  &::after {\n    content: \" \";\n    display: table;\n  }\n  &::after {clear: both;}\n}\n\n// font size\n.u-fontSize13 {font-size: 13px}\n.u-fontSize15 {font-size: 15px}\n.u-fontSize20 {font-size: 20px}\n.u-fontSize22 {font-size: 22px}\n.u-fontSize28 {font-size: 28px !important;}\n.u-fontSize36 {font-size: 36px}\n.u-fontSize40 {font-size: 40px}\n.u-fontSizeBase {font-size: 18px}\n.u-fontSizeJumbo {font-size: 50px}\n.u-fontSizeLarge {font-size: 24px !important}\n.u-fontSizeLarger {font-size: 32px}\n.u-fontSizeLargest {font-size: 44px}\n.u-fontSizeMicro {font-size: 11px}\n.u-fontSizeSmall {font-size: 16px}\n.u-fontSizeSmaller {font-size: 14px}\n.u-fontSizeSmallest {font-size: 12px}\n\n@media #{$md-and-down} {\n  .u-md-fontSizeBase {font-size: 18px !important}\n  .u-md-fontSizeLarger {font-size: 32px}\n}\n\n// @media (max-width: 767px) {\n//   .u-xs-fontSizeBase {font-size: 18px}\n//   .u-xs-fontSize13 {font-size: 13px}\n//   .u-xs-fontSizeSmaller {font-size: 14px}\n//   .u-xs-fontSizeSmall {font-size: 16px}\n//   .u-xs-fontSize22 {font-size: 22px}\n//   .u-xs-fontSizeLarge {font-size: 24px}\n//   .u-xs-fontSize40 {font-size: 40px}\n//   .u-xs-fontSizeLarger {font-size: 32px}\n//   .u-xs-fontSizeSmallest {font-size: 12px}\n// }\n\n// font weight\n.u-fontWeightThin {font-weight: 300}\n.u-fontWeightNormal {font-weight: 400}\n.u-fontWeightMedium {font-weight: 500}\n.u-fontWeightSemibold {font-weight: 600}\n.u-fontWeightBold {font-weight: 700 !important}\n\n.u-textUppercase {text-transform: uppercase}\n.u-textAlignCenter {text-align: center}\n\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n// Margin\n.u-marginAuto { margin-left: auto; margin-right: auto;}\n.u-marginTop30 {margin-top: 30px}\n.u-marginBottom15 {margin-bottom: 15px}\n.u-marginBottom20 {margin-bottom: 20px !important}\n.u-marginBottom30 {margin-bottom: 30px}\n.u-marginBottom40 {margin-bottom: 40px}\n\n// padding\n.u-padding0 {padding: 0 !important}\n.u-padding15 {padding: 15px !important;}\n.u-paddingBottom2 { padding-bottom: 2px;}\n.u-paddingBottom30 { padding-bottom: 30px;}\n.u-paddingBottom20 {padding-bottom: 20px}\n\n.u-paddingTop5 { padding-top: 5px;}\n.u-paddingTop10 {padding-top: 10px;}\n.u-paddingTop15 {padding-top: 15px;}\n.u-paddingTop20 {padding-top: 20px;}\n.u-paddingTop30 {padding-top: 30px;}\n\n.u-paddingBottom15 {padding-bottom: 15px;}\n\n.u-paddingRight20 {padding-right: 20px}\n.u-paddingLeft20 {padding-left: 20px}\n\n.u-contentTitle {\n  font-family: $primary-font;\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: -.028em;\n}\n\n// line-height\n.u-lineHeight1 {line-height: 1;}\n\n// overflow\n.u-overflowHidden {overflow: hidden}\n\n// float\n.u-floatRight { float: right; }\n.u-floatLeft { float: left; }\n\n//  flex\n.u-flex { display: flex; }\n.u-flexCenter { align-items: center; display: flex; }\n.u-flex1 { flex: 1 1 auto; }\n.u-flex0 { flex: 0 0 auto; }\n.u-flexWrap {flex-wrap: wrap}\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n// Background\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n// max widht\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.u-maxWidth1000 { max-width: 1000px;}\n.u-maxWidth740 {max-width: 740px;}\n.u-maxWidth1040 { max-width: 1040px;}\n.u-sizeFullWidth {width: 100%}\n\n// border\n.u-borderLighter { border: 1px solid rgba(0, 0, 0, .15);}\n.u-round {border-radius: 50%}\n.u-borderRadius2 {border-radius: 2px}\n\n\n// card\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, .09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n\n  &--p {\n    font-family: $secundary-font;\n    font-style: normal;\n    font-weight: 400;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .05);\n}\n\n// hide global\n.u-hide {display: none !important}\n// hide before\n@media #{$md-and-down} {.u-hide-before-md {display: none !important} }\n@media #{$lg-and-down} {.u-hide-before-lg {display: none !important} }\n\n// hide after\n@media #{$md-and-up} {.u-hide-after-md {display: none !important} }\n@media #{$lg-and-up} {.u-hide-after-lg {display: none !important} }\n","/*! normalize.css v6.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n","/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*=\"language-\"],\n\tpre[class*=\"language-\"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #a67f59;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n","img[data-action=\"zoom\"] {\r\n  cursor: zoom-in;\r\n}\r\n.zoom-img,\r\n.zoom-img-wrap {\r\n  position: relative;\r\n  z-index: 666;\r\n  -webkit-transition: all 300ms;\r\n       -o-transition: all 300ms;\r\n          transition: all 300ms;\r\n}\r\nimg.zoom-img {\r\n  cursor: pointer;\r\n  cursor: -webkit-zoom-out;\r\n  cursor: -moz-zoom-out;\r\n}\r\n.zoom-overlay {\r\n  z-index: 420;\r\n  background: #fff;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  pointer-events: none;\r\n  filter: \"alpha(opacity=0)\";\r\n  opacity: 0;\r\n  -webkit-transition:      opacity 300ms;\r\n       -o-transition:      opacity 300ms;\r\n          transition:      opacity 300ms;\r\n}\r\n.zoom-overlay-open .zoom-overlay {\r\n  filter: \"alpha(opacity=100)\";\r\n  opacity: 1;\r\n}\r\n.zoom-overlay-open,\r\n.zoom-overlay-transitioning {\r\n  cursor: default;\r\n}\r\n","// Headings\r\n\r\nh1, h2, h3, h4, h5, h6,\r\n.h1, .h2, .h3, .h4, .h5, .h6 {\r\n  color: $headings-color;\r\n  font-family: $headings-font-family;\r\n  font-weight: $headings-font-weight;\r\n  line-height: $headings-line-height;\r\n  margin: 0;\r\n\r\n  a {\r\n    color: inherit;\r\n    line-height: inherit;\r\n  }\r\n}\r\n\r\nh1 { font-size: $font-size-h1; }\r\nh2 { font-size: $font-size-h2; }\r\nh3 { font-size: $font-size-h3; }\r\nh4 { font-size: $font-size-h4; }\r\nh5 { font-size: $font-size-h5; }\r\nh6 { font-size: $font-size-h6; }\r\n\r\n// These declarations are kept separate from and placed after\r\n// the previous tag-based declarations so that the classes beat the tags in\r\n// the CSS cascade, and thus <h1 class=\"h2\"> will be styled like an h2.\r\n.h1 { font-size: $font-size-h1; }\r\n.h2 { font-size: $font-size-h2; }\r\n.h3 { font-size: $font-size-h3; }\r\n.h4 { font-size: $font-size-h4; }\r\n.h5 { font-size: $font-size-h5; }\r\n.h6 { font-size: $font-size-h6; }\r\n\r\n\r\np {\r\n  margin: 0;\r\n}\r\n",".u-wrap {\r\n  margin: 0 auto;\r\n  padding-left:  ($grid-gutter-width / 2);\r\n  padding-right: ($grid-gutter-width / 2);\r\n  width: 100%;\r\n\r\n  // @media #{$sm-and-up}{max-width: $container-sm;}\r\n  // @media #{$md-and-up}{max-width: $container-md;}\r\n  // @media #{$lg-and-up}{max-width: $container-lg;}\r\n  @media #{$xl-and-up} {max-width: $container-xl;}\r\n}\r\n\r\n\r\n@media #{$lg-and-up} {\r\n  .content {\r\n    flex: 1 !important;\r\n    max-width: calc(100% - 340px) !important;\r\n    order: 1;\r\n    // overflow: hidden;\r\n  }\r\n  .sidebar {\r\n    flex: 0 0 340px !important;\r\n    order: 2;\r\n  }\r\n}\r\n\r\n\r\n.row {\r\n  display: flex;\r\n  flex: 0 1 auto;\r\n  flex-flow: row wrap;\r\n\r\n  margin-left: - $gutter-width / 2;\r\n  margin-right: - $gutter-width / 2;\r\n\r\n  .col {\r\n    flex: 0 0 auto;\r\n    padding-left: $gutter-width / 2;\r\n    padding-right: $gutter-width / 2;\r\n\r\n    $i: 1;\r\n    @while $i <= $num-cols {\r\n      $perc: unquote((100 / ($num-cols / $i)) + \"%\");\r\n      &.s#{$i} {\r\n        flex-basis: $perc;\r\n        max-width: $perc;\r\n      }\r\n      $i: $i + 1;\r\n    }\r\n\r\n    @media #{$md-and-up} {\r\n      $i: 1;\r\n      @while $i <= $num-cols {\r\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\r\n        &.m#{$i} {\r\n          flex-basis: $perc;\r\n          max-width: $perc;\r\n        }\r\n        $i: $i + 1;\r\n      }\r\n    }\r\n\r\n    @media #{$lg-and-up} {\r\n      $i: 1;\r\n      @while $i <= $num-cols {\r\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\r\n        &.l#{$i} {\r\n          flex-basis: $perc;\r\n          max-width: $perc;\r\n        }\r\n        $i: $i + 1;\r\n      }\r\n    }\r\n  }\r\n}\r\n",".button {\n  background: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, .44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: $primary-font;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  i { display: inline-block}\n\n  &--chromeless {\n    border-radius: 0;\n    border-width: 0;\n    box-shadow: none;\n    color: rgba(0, 0, 0, .44);\n    height: auto;\n    line-height: inherit;\n    padding: 0;\n    text-align: left;\n    vertical-align: baseline;\n    white-space: normal;\n\n    &:active,\n    &:hover,\n    &:focus {\n      border-width: 0;\n      color: rgba(0, 0, 0, .6);\n    }\n  }\n\n  &--large {\n    font-size: 15px;\n    height: 44px;\n    line-height: 42px;\n    padding: 0 18px;\n  }\n\n  &--dark {\n    border-color: rgba(0, 0, 0, .6);\n    color: rgba(0, 0, 0, .6);\n\n    &:hover {\n      border-color: rgba(0, 0, 0, .8);\n      color: rgba(0, 0, 0, .8);\n    }\n  }\n}\n\n\n\n.buttonSet {\n\n  .button--large.button--chromeless,\n  .button--large.button--link {\n    height: 44px;\n    line-height: 42px;\n  }\n\n  &>.button--chromeless:not(.button--circle) {\n    margin-right: 0;\n    padding-right: 8px;\n  }\n\n  &>.button--chromeless+.button--chromeless:not(.button--circle) {\n    margin-left: 0;\n    padding-left: 8px;\n  }\n\n  &>.button--chromeless:last-child {\n    padding-right: 0;\n  }\n}\n\n\n\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n","@font-face {\r\n  font-family: 'simply';\r\n  src:  url('../fonts/simply.eot?b9w9k4');\r\n  src:  url('../fonts/simply.eot?b9w9k4#iefix') format('embedded-opentype'),\r\n    url('../fonts/simply.ttf?b9w9k4') format('truetype'),\r\n    url('../fonts/simply.woff?b9w9k4') format('woff'),\r\n    url('../fonts/simply.svg?b9w9k4#simply') format('svg');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n\r\n[class^=\"i-\"]::before, [class*=\" i-\"]::before {\r\n  @extend %fonts-icons;\r\n}\r\n\r\n\r\n.i-comments:before {\r\n  content: \"\\e900\";\r\n}\r\n.i-location:before {\r\n  content: \"\\e8b4\";\r\n}\r\n.i-save:before {\r\n  content: \"\\e8e6\";\r\n}\r\n.i-save--line:before {\r\n  content: \"\\e8e7\";\r\n}\r\n.i-check-circle:before {\r\n  content: \"\\e86c\";\r\n}\r\n.i-close:before {\r\n  content: \"\\e5cd\";\r\n}\r\n.i-favorite:before {\r\n  content: \"\\e87d\";\r\n}\r\n.i-star:before {\r\n  content: \"\\e838\";\r\n}\r\n.i-warning:before {\r\n  content: \"\\e002\";\r\n}\r\n.i-rss:before {\r\n  content: \"\\e0e5\";\r\n}\r\n.i-search:before {\r\n  content: \"\\e8b6\";\r\n}\r\n.i-send:before {\r\n  content: \"\\e163\";\r\n}\r\n.i-share:before {\r\n  content: \"\\e80d\";\r\n}\r\n.i-link:before {\r\n  content: \"\\f0c1\";\r\n}\r\n.i-reddit:before {\r\n  content: \"\\f281\";\r\n}\r\n.i-twitter:before {\r\n  content: \"\\f099\";\r\n}\r\n.i-github:before {\r\n  content: \"\\f09b\";\r\n}\r\n.i-linkedin:before {\r\n  content: \"\\f0e1\";\r\n}\r\n.i-code:before {\r\n  content: \"\\f121\";\r\n}\r\n.i-youtube:before {\r\n  content: \"\\f16a\";\r\n}\r\n.i-stack-overflow:before {\r\n  content: \"\\f16c\";\r\n}\r\n.i-instagram:before {\r\n  content: \"\\f16d\";\r\n}\r\n.i-flickr:before {\r\n  content: \"\\f16e\";\r\n}\r\n.i-dribbble:before {\r\n  content: \"\\f17d\";\r\n}\r\n.i-behance:before {\r\n  content: \"\\f1b4\";\r\n}\r\n.i-spotify:before {\r\n  content: \"\\f1bc\";\r\n}\r\n.i-codepen:before {\r\n  content: \"\\f1cb\";\r\n}\r\n.i-facebook:before {\r\n  content: \"\\f230\";\r\n}\r\n.i-pinterest:before {\r\n  content: \"\\f231\";\r\n}\r\n.i-whatsapp:before {\r\n  content: \"\\f232\";\r\n}\r\n.i-snapchat:before {\r\n  content: \"\\f2ac\";\r\n}\r\n","// animated Global\r\n.animated {\r\n  animation-duration: 1s;\r\n  animation-fill-mode: both;\r\n\r\n  &.infinite {\r\n    animation-iteration-count: infinite;\r\n  }\r\n}\r\n\r\n// animated All\r\n.bounceIn { animation-name: bounceIn;}\r\n.bounceInDown { animation-name: bounceInDown;}\r\n.pulse { animation-name: pulse; }\r\n\r\n// all keyframes Animates\r\n// bounceIn\r\n@keyframes bounceIn {\r\n  0%,\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80%,\r\n  100% { animation-timing-function: cubic-bezier(.215, .610, .355, 1);}\r\n  0% {opacity: 0; transform: scale3d(.3, .3, .3);}\r\n  20% { transform: scale3d(1.1, 1.1, 1.1);}\r\n  40% { transform: scale3d(.9, .9, .9); }\r\n  60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }\r\n  80% { transform: scale3d(.97, .97, .97); }\r\n  100% { opacity: 1; transform: scale3d(1, 1, 1); }\r\n}\r\n\r\n;\r\n// bounceInDown\r\n@keyframes bounceInDown {\r\n  0%,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  100% { animation-timing-function: cubic-bezier(215, 610, 355, 1); }\r\n  0% { opacity: 0; transform: translate3d(0, -3000px, 0); }\r\n  60% { opacity: 1; transform: translate3d(0, 25px, 0);}\r\n  75% {transform: translate3d(0, -10px, 0);}\r\n  90% {transform: translate3d(0, 5px, 0);}\r\n  100% {transform: none;}\r\n}\r\n\r\n@keyframes pulse {\r\n  from { transform: scale3d(1, 1, 1);}\r\n  50% {transform: scale3d(1.2, 1.2, 1.2);}\r\n  to {transform: scale3d(1, 1, 1); }\r\n}\r\n\r\n\r\n@keyframes scroll {\r\n  0% {opacity: 0;}\r\n  10% {opacity: 1; transform: translateY(0)}\r\n  100% {opacity: 0; transform: translateY(10px);}\r\n}\r\n\r\n@keyframes opacity {\r\n  0% {opacity: 0;}\r\n  50% {opacity: 0;}\r\n  100% {opacity: 1;}\r\n}\r\n\r\n//  spin for pagination\r\n@keyframes spin {\r\n  from {transform: rotate(0deg);}\r\n  to {transform: rotate(360deg);}\r\n}\r\n\r\n@keyframes tooltip {\r\n  0% {opacity: 0; transform: translate(-50%, 6px);}\r\n  100% {opacity: 1; transform: translate(-50%, 0);}\r\n}\r\n\r\n@keyframes loading-bar {\r\n  0% {transform: translateX(-100%)}\r\n  40% {transform: translateX(0)}\r\n  60% {transform: translateX(0)}\r\n  100% {transform: translateX(100%)}\r\n}\r\n","// Header\n// ==========================================================================\n\n.header {\n  // background: $primary-color;\n  z-index: 80;\n\n  &-wrap { height: 50px; }\n\n  &-logo {\n    height: 30px;\n    img {max-height: 100%; }\n  }\n\n  &-logo,\n  .button-search--open,\n  .button-nav--toggle {z-index: 150;}\n\n\n  // header description home page\n  &-description {\n    color: $header-color;\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 750px;\n  }\n}\n\n// Header Follow\n// ==========================================================================\n.follow>a {\n  padding-left: 15px;\n}\n\n// Header menu\n// ==========================================================================\n\n.nav {\n  line-height: 40px;\n  padding: 8px 0;\n  position: relative;\n\n  ul {\n    display: flex;\n  }\n\n  li {\n    float: left;\n\n    a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase;\n    }\n  }\n}\n\n\n\n.button-search--open {\n  color: inherit !important;\n  padding-right: 0 !important;\n}\n\n\n// button-nav\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n\n  span {\n    background-color: $header-color;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px;\n\n    &:first-child { transform: translate(0, -6px); }\n    &:last-child { transform: translate(0, 6px); }\n  }\n}\n\n\nbody.is-frontpage .header-wrap {height: auto;}\n\n\n// Media Query\n// ==========================================================================\n\n@media #{$md-and-up} {\n  .header {\n    &-wrap {\n      border: 0;\n      // height: 50px;\n    }\n    &-logo {\n      height: 30px;\n      padding-left: 0;\n    }\n\n    &-top-section {padding-top: 15px;}\n  }\n\n  body.is-frontpage {\n    .header {\n      &-wrap { height: 200px; }\n      &-logo {\n        height: 40px;\n        margin-bottom: 15px;\n      }\n      &-top-section {padding-top: 0;}\n    }\n\n    .nav ul {flex: 1 1 auto;}\n  }\n\n}\n\n\n// Header menu\n// ==========================================================================\n@media #{$md-and-down} {\n\n  .header {\n    position: fixed;\n\n    &-wrap {\n      height: $header-height-mobile !important;\n    }\n  }\n\n  // show menu mobile\n  body.is-showNavMob {\n    overflow: hidden;\n\n    .sideNav {transform: translateX(0); }\n\n    .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg);\n\n      span:first-child { transform: rotate(45deg) translate(0, 0);}\n      span:nth-child(2) { transform: scaleX(0);}\n      span:last-child {transform: rotate(-45deg) translate(0, 0);}\n    }\n\n    .header .button-search--toggle {display: none;}\n    .main, .footer { transform: translateX(-25%);}\n  }\n\n}\n","// entry by line\n.entry {\n  &-author {\n    // display: table-cell;\n    line-height: 1.4;\n    padding-left: 10px;\n    // vertical-align: middle;\n\n    // a { @extend %link, %link--accent;}\n  }\n\n  // author avatar\n  // &-avatar { display: table-cell; }\n  &-avatar--img {\n    border-radius: 50%;\n    height: 40px;\n    width: 40px;\n\n    &.no-avatar { background-image: url('../images/avatar.png') !important}\n  }\n\n  // not has image\n  &.not--image {\n    color: rgba(0, 0, 0, .8);\n  }\n}\n\n\n// entry Global\n.entry.u-card {\n  .entry-image {\n    max-height: 240px;\n    max-width: 360px;\n  }\n}\n\n// Entry or post (author and tag) page\n// ==========================================================================\n\n// if post is featured\n.entry.entry--featured {\n  .entry-body { display: flex; flex-direction: column;}\n\n  .entry-image {\n    height: 200px;\n    margin-bottom: 20px;\n    margin-top: 5px;\n    max-width: 100%;\n    order: -1;\n  }\n\n  .entry-image--link {\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 100%;\n  }\n\n}\n\n\n// even entry\n.entry.entry--featured,\n.entry.even:not(.entry--featured) {\n  .entry-excerpt {\n    color: rgba(0, 0, 0, .44);\n    font-family: $primary-font;\n    font-size: 23px;\n    letter-spacing: -.022em;\n    line-height: 1.22;\n  }\n}\n","// Home Page Styles\r\n// ==========================================================================\r\n\r\n.homePage {\r\n  .entry {\r\n    .u-backgroundDark {display: none;}\r\n    &-image {height: 172px;}\r\n  }\r\n}\r\n\r\n\r\n\r\n@media #{$md-and-up} {\r\n  .homePage {\r\n    .entry {\r\n      &-image { height: 174px; }\r\n\r\n      &.entry1,\r\n      &.entry7 {\r\n        flex-basis: 100%;\r\n        max-width: 100%;\r\n      }\r\n\r\n      // first post with img 66%\r\n      &.entry1 {\r\n        display: flex;\r\n\r\n        .entry-image {\r\n          height: 350px;\r\n          margin-right: 15px;\r\n          width: 66.66666667% !important;\r\n        }\r\n        .entry-title {font-size: 36px !important}\r\n        .entry-body {\r\n          padding: 0 0 0 13px;\r\n          width: 33.33333333% !important;\r\n        }\r\n      }\r\n\r\n      // entry full with background all\r\n      &.entry7 {\r\n        .entry-image {height: 450px;}\r\n\r\n        .entry-title {font-size: 44px !important}\r\n        .entry-excerpt { font-size: 24px; line-height: 1.3;}\r\n      }\r\n\r\n      &.entry7,\r\n      &.entry13,\r\n      &.entry14 {\r\n        .u-backgroundDark { display: block; }\r\n\r\n        .entry-body {\r\n          bottom: 0;\r\n          left: 0;\r\n          margin: 30px 40px;\r\n          max-width: 600px;\r\n          position: absolute;\r\n          z-index: 2;\r\n        }\r\n\r\n        &:not(.not--image) {\r\n          .entry-body {color: #fff;}\r\n          .entry-author {\r\n            color: rgba(255, 255, 255, .9);\r\n            a, .entry-date {color: rgba(255, 255, 255, .9); }\r\n          }\r\n        }\r\n      }\r\n\r\n      &.entry13, &.entry14 {\r\n        .entry-image {height: 450px;}\r\n        .entry-title {font-size: 32px !important}\r\n        .entry-excerpt {display: none;}\r\n        .entry-byline {margin-top: 20px;}\r\n        .entry-body {max-width: 400px;}\r\n      }\r\n\r\n\r\n      // entry 50%\r\n      &.entry5, &.entry6, &.entry11, &.entry12 {\r\n        flex-basis: 50%;\r\n        max-width: 50%;\r\n        .entry-image { height: 274px;}\r\n      }\r\n\r\n      // entry 13\r\n      &.entry13 {\r\n        flex-basis: 60%;\r\n        max-width: 60%;\r\n        padding-right: 0;\r\n      }\r\n\r\n      // entry 14\r\n      &.entry14 {\r\n        flex-basis: 40%;\r\n        max-width: 40%;\r\n      }\r\n\r\n    }\r\n  }\r\n}\r\n",".post {\n  &-title {\n    line-height: 1.04;\n  }\n\n  &-footer {\n    border-bottom: 1px solid rgba(0,0,0,.05);\n  }\n}\n\n\n// post content body\n// ==========================================================================\n.post-body {\n  a {\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, 0) 50%);\n    background-position: 0 1.07em;\n    background-repeat: repeat-x;\n    background-size: 2px .1em;\n    text-decoration: none;\n  }\n  img {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    margin-top: 30px;\n    font-weight: 700;\n    font-style: normal;\n  }\n\n  h2 {\n    font-size: 40px;\n    letter-spacing: -.03em;\n    line-height: 1.04;\n    margin-top: 54px;\n  }\n\n  h3 {\n    font-size: 32px;\n    letter-spacing: -.02em;\n    line-height: 1.15;\n    margin-top: 52px;\n  }\n\n  h4 {\n    font-size: 24px;\n    letter-spacing: -.018em;\n    line-height: 1.22;\n    margin-top: 30px;\n  }\n\n  p {\n    font-family: $secundary-font;\n    font-size: 21px;\n    font-weight: 400;\n    letter-spacing: -.003em;\n    line-height: 1.58;\n    margin-top: 28px;\n  }\n\n  &> p:first-of-type:first-letter {\n    float: left;\n    font-size: 64px;\n    font-style: normal;\n    font-weight: 700;\n    letter-spacing: -.03em;\n    line-height: .83;\n    margin-bottom: -.08em;\n    margin-left: -5px;\n    margin-right: 7px;\n    padding-top: 7px;\n    text-transform: uppercase;\n  }\n\n  ul,\n  ol {\n    counter-reset: post;\n    font-family: $secundary-font;\n    font-size: 21px;\n    margin-top: 20px;\n\n    li {\n      letter-spacing: -.003em;\n      line-height: 1.58;\n      margin-bottom: 14px;\n      margin-left: 30px;\n\n      &::before {\n        box-sizing: border-box;\n        display: inline-block;\n        margin-left: -78px;\n        position: absolute;\n        text-align: right;\n        width: 78px;\n      }\n    }\n  }\n\n  ul li::before {\n    content: 'â¢';\n    font-size: 16.8px;\n    padding-right: 15px;\n    padding-top: 4px;\n  }\n\n  ol li::before {\n    content: counter(post) \".\";\n    counter-increment: post;\n    padding-right: 12px;\n  }\n\n  .twitter-tweet,\n  iframe {\n    display: block;\n    margin-left: auto !important;\n    margin-right: auto !important;\n    margin-top: 40px !important;\n  }\n\n  .video-responsive iframe { margin-top: 0 !important}\n\n}\n\n\n// post Tags\n// ==========================================================================\n.post-tags {\n  a {\n    background: rgba(0, 0, 0, .08);\n    border: none;\n    border-radius: 3px;\n    color: rgba(0, 0, 0, .6);\n    margin-bottom: 8px;\n    margin-right: 8px;\n    &:hover {\n      background: rgba(0, 0, 0, .1);\n      color: rgba(0, 0, 0, .6);\n    }\n  }\n}\n\n// post Newsletter\n// ==========================================================================\n\n.post-newsletter {\n  max-width: 520px;\n  .newsletter-form {max-width: 400px}\n\n  .form-group { width: 80%; padding-right: 5px; }\n  .form--input {\n    border: 0;\n    border-bottom: 1px solid #ccc;\n    height: 48px;\n    padding: 6px 12px 8px 5px;\n    resize: none;\n    width: 100%;\n    &:focus {\n      outline: 0;\n    }\n  }\n  .form--btn {\n    background-color: #a9a9a9;\n    border-radius: 0 45px 45px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    padding: 0;\n    width: 20%;\n\n    &::before {\n      @extend %u-absolute0;\n      background-color: #a9a9a9;\n      border-radius: 0 45px 45px 0;\n      line-height: 45px;\n      z-index: 2;\n    }\n\n    &:hover {opacity: .8; }\n    &:focus { outline: 0; }\n  }\n}\n\n\n// post Relative\n// ==========================================================================\n.post-related {\n  .entry-image {\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\n    border-radius: 4px 4px 0 0;\n    height: 150px;\n  }\n\n  .entry-title {\n    color: rgba(0,0,0,.9);\n    -webkit-box-orient: vertical !important;\n    -webkit-line-clamp: 2 !important;\n    display: -webkit-box!important;\n    line-height: 1.1 !important;\n    max-height: 2.2em !important;\n    text-overflow: ellipsis !important;\n  }\n\n  .u-card {\n    height: 240px;\n  }\n}\n\n\n// Share Post\n// ==========================================================================\n.sharePost {\n  margin-left: -130px;\n  margin-top: 28px;\n  width: 45px;\n\n  a {\n    background-image: none;\n    border-radius: 5px;\n    color: #fff;\n    height: 36px;\n    line-height: 20px;\n    margin: 10px auto;\n    padding: 8px;\n    text-decoration: none;\n    width: 36px;\n  }\n}\n\n// Post Actions\n// ==========================================================================\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, .44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translateY(100%);\n  transition: transform .3s;\n  visibility: hidden;\n  z-index: 400;\n\n  &.is-visible {\n    transform: translateY(0);\n    transition-delay: 0s;\n    visibility: visible;\n  }\n\n  &-wrap {max-width: 1200px;}\n\n  .separator {\n    background: rgba(0, 0, 0, .15);\n    height: 24px;\n    margin: 0 15px;\n    width: 1px;\n  }\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n\n@media #{$md-and-down} {\n\n  .post-body {\n\n    h2 {\n      font-size: 32px;\n      margin-top: 26px;\n    }\n\n    h3 {\n      font-size: 28px;\n      margin-top: 28px;\n    }\n\n    h4 {\n      font-size: 22px;\n      margin-top: 22px;\n    }\n\n    q {\n      font-size: 22px !important;\n      letter-spacing: -.008em !important;\n      line-height: 1.4 !important;\n    }\n\n    &> p:first-of-type:first-letter {\n      font-size: 54.85px;\n      margin-left: -4px;\n      margin-right: 6px;\n      padding-top: 3.5px;\n    }\n\n    ol , ul, p {\n      font-size: 18px;\n      letter-spacing: -.004em;\n      line-height: 1.58;\n    }\n  }\n}\n",".author {\r\n  background-color: #fff;\r\n  color: rgba(0, 0, 0, .6);\r\n  min-height: 400px;\r\n\r\n  a {\r\n    color: rgba(0, 0, 0, .8);\r\n    &:hover {\r\n      color: rgba(0, 0, 0, .6);\r\n    }\r\n  }\r\n\r\n  &-wrap {\r\n    z-index: 2;\r\n  }\r\n\r\n  &-avatar {\r\n    height: 80px;\r\n    margin-right: 10px;\r\n    width: 80px;\r\n  }\r\n\r\n  &-meta {\r\n    span {\r\n      display: inline-block;\r\n      font-size: 17px;\r\n      font-style: italic;\r\n      margin: 0 25px 16px 0;\r\n      opacity: .8;\r\n      word-wrap: break-word;\r\n    }\r\n  }\r\n\r\n  &-name { color: rgba(0,0,0,.8)}\r\n\r\n  &-bio {\r\n    max-width: 600px;\r\n    // color: rgba(0, 0, 0, .6);\r\n  }\r\n\r\n  &-follow a {\r\n    box-shadow: inset 0 0 0 2px hsla(0,0%,100%,.5);\r\n    cursor: pointer;\r\n    display: inline-block;\r\n    height: 40px;\r\n    line-height: 40px;\r\n    margin: 0 10px;\r\n    padding: 0 16px;\r\n    text-shadow: none;\r\n\r\n    &:hover {\r\n      box-shadow: inset 0 0 0 2px #fff;\r\n    }\r\n\r\n  }\r\n\r\n}\r\n\r\n\r\n.author.has--image {\r\n  color: #fff !important;\r\n  text-shadow: 0 0 10px rgba(0, 0, 0, .33);\r\n\r\n  .author-link:hover { opacity: 1!important}\r\n  a,\r\n  .author-name { color: #fff;}\r\n}\r\n\r\n@media #{$md-and-down} {\r\n  .author-meta span {display: block;}\r\n}\r\n","// Search\r\n// ==========================================================================\r\n.search {\r\n  background-color: #fff;\r\n  display: none;\r\n  height: 100%;\r\n  padding: 0 20px 0;\r\n  position: fixed !important;\r\n  z-index: 9999;\r\n\r\n  &-header {\r\n    box-shadow: 0 1px 0 rgba(0, 0, 0, .05);\r\n    height: $header-height-mobile;\r\n    margin: 0 -20px 30px;\r\n    padding: 0 20px;\r\n  }\r\n\r\n  &-form {\r\n    max-width: 680px;\r\n\r\n    &::before {\r\n      background: #eee;\r\n      bottom: 0;\r\n      content: '';\r\n      display: block;\r\n      height: 2px;\r\n      left: 0;\r\n      position: absolute;\r\n      width: 100%;\r\n      z-index: 1;\r\n    }\r\n\r\n    input {\r\n      border: none;\r\n      display: block;\r\n      line-height: 40px;\r\n      padding-bottom: 8px;\r\n\r\n      &:focus { outline: 0; }\r\n    }\r\n\r\n  }\r\n\r\n  // result\r\n  &-results {\r\n    flex: 1;\r\n    height: 100%;\r\n    max-width: 680px;\r\n    overflow: auto;\r\n\r\n    a {\r\n      border-bottom: 1px solid #eee;\r\n      padding: 12px 0;\r\n      &:hover {\r\n        color: rgba(0, 0, 0, .44);\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n\r\nbody.is-search {\r\n  overflow: hidden;\r\n\r\n  .search {\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n}\r\n",".sidebar {\r\n  &-title {\r\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\r\n    font-weight: 700;\r\n    margin-bottom: 10px;\r\n    padding-bottom: 5px;\r\n  }\r\n\r\n  // border for post\r\n  &-border {\r\n    border-left: 3px solid $primary-color;\r\n    bottom: 0;\r\n    color: rgba(0, 0, 0, .2);\r\n    font-family: $secundary-font;\r\n    left: 0;\r\n    padding: 15px 10px 10px;\r\n    top: 0;\r\n  }\r\n}\r\n\r\n.sidebar-post {\r\n  &:nth-child(3n) { .sidebar-border { border-color: darken(orange, 2%); } }\r\n  &:nth-child(3n+2) { .sidebar-border { border-color: #26a8ed } }\r\n\r\n  &--title {\r\n    line-height: 1.1;\r\n  }\r\n\r\n  &--link {\r\n    background-color: #fff;\r\n    min-height: 50px;\r\n    padding: 15px 15px 15px 55px;\r\n    &:hover { .sidebar-border {background-color: rgba(229,239,245,1);}  }\r\n\r\n  }\r\n}\r\n"," // Navigation Mobile\n\n.sideNav {\n  // background-color: $primary-color;\n  color: rgba(0, 0, 0, .8);\n  height: 100vh;\n  padding: $header-height-mobile 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: .4s;\n  will-change: transform;\n  z-index: 99;\n\n  &-menu a { padding: 10px 20px; }\n\n  &-wrap {\n    background: #eee;\n    overflow: auto;\n    padding: 20px 0;\n    top: $header-height-mobile;\n  }\n\n  &-section {\n    border-bottom: solid 1px #ddd;\n    margin-bottom: 8px;\n    padding-bottom: 8px;\n  }\n\n  &-follow {\n    border-top: 1px solid #ddd;\n    margin: 15px 0;\n\n    a {\n      color: #fff;\n      display: inline-block;\n      height: 36px;\n      line-height: 20px;\n      margin: 0 5px 5px 0;\n      min-width: 36px;\n      padding: 8px;\n      text-align: center;\n      vertical-align: middle;\n    }\n\n    @each $social-name, $color in $social-colors {\n      .i-#{$social-name} {\n        @extend .bg-#{$social-name};\n      }\n    }\n  }\n\n\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./fonts/simply.eot ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.eot";

/***/ }),
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ../~/html-entities/lib/html5-entities.js ***!
  \************************************************/
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['CloseCurlyDoubleQuote', [8221]], ['CloseCurlyQuote', [8217]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

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
    if (str.length === 0) {
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
    var strLength = str.length;
    if (strLength === 0) {
        return '';
    }
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
    var strLength = str.length;
    if (strLength === 0) {
        return '';
    }
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
    var strLength = str.length;
    if (strLength === 0) {
        return '';
    }
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
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ../~/webpack/buildin/global.js ***!
  \**************************************/
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
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sticky_kit_dist_sticky_kit__ = __webpack_require__(/*! sticky-kit/dist/sticky-kit */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sticky_kit_dist_sticky_kit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sticky_kit_dist_sticky_kit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs__ = __webpack_require__(/*! prismjs */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prismjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prismjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_plugins_autoloader_prism_autoloader__ = __webpack_require__(/*! prismjs/plugins/autoloader/prism-autoloader */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismjs_plugins_autoloader_prism_autoloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prismjs_plugins_autoloader_prism_autoloader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery_lazyload__ = __webpack_require__(/*! jquery-lazyload */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery_lazyload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_zoom__ = __webpack_require__(/*! ./lib/zoom */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_zoom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__lib_zoom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_transition__ = __webpack_require__(/*! ./lib/transition */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_transition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__lib_transition__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_jquery_ghostHunter__ = __webpack_require__(/*! ./lib/jquery.ghostHunter */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_jquery_ghostHunter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__lib_jquery_ghostHunter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_helper__ = __webpack_require__(/*! ./app/app.helper */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__app_app_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_share__ = __webpack_require__(/*! ./app/app.share */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__app_app_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_pagination__ = __webpack_require__(/*! ./app/app.pagination */ 12);
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

var urlRegexp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \+\.-]*)*\/?$/; // eslint-disable-line


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
  var dsq = document.createElement('script');
  dsq.type = 'text/javascript';
  dsq.async = true;
  dsq.src = "//" + shortname + ".disqus.com/embed.js";
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}


$doc.on('ready', function () {
  /** Follow social media */
  if (typeof followSocialMedia !== 'undefined') { __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default.a.followMe(followSocialMedia, $followBox, urlRegexp); } // eslint-disable-line

  /* Featured Post Animation */
  // if ($featuredPost.find('.entry').hover(function() {$featuredPost.find('.entry').removeClass('first'), $(this).addClass('first')}));

  /* add atribute for Zoom img */
  $postBody.find('img').attr('data-action', 'zoom');

  /* Video Post Format */
  if ($videoPostFormat.length > 0 ){
     var video = $('iframe[src*="youtube.com"]')[0];
    $videoPostFormat.find('.video-responsive').prepend(video);
  }

  /** Share Count in facebook */
  __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default.a.facebookShareCount($shareCount);

  /* Share article in Social media */
  $share.bind('click', function (e) {
    e.preventDefault();
    var share = new __WEBPACK_IMPORTED_MODULE_8__app_app_share___default.a($(this));
    share.share();
  });

  /* Video Responsive*/
  __WEBPACK_IMPORTED_MODULE_7__app_app_helper___default.a.videoResponsive($postBody);

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
  $('.simply-lazy.lazy').lazyload({
    threshold : 200,
  });

  $('.cover-lazy.lazy').lazyload({
    effect : 'fadeIn',
  });

  /* Prism code syntax autoloader */
  __WEBPACK_IMPORTED_MODULE_1_prismjs___default.a.plugins.autoloader.languages_path = '../assets/scripts/prism-components/';
});


$win.on('scroll', function () {
  var scrollTop = $(this).scrollTop();
  var heightPostBody = $postBody.height();

  // active or desactive Post Actions in post Sections
  (scrollTop < heightPostBody) ? $postActions.addClass('is-visible') : $postActions.removeClass('is-visible');

});



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../~/css-loader?+sourceMap!../../~/postcss-loader!../../~/resolve-url-loader?+sourceMap!../../~/sass-loader/lib/loader.js?+sourceMap!./main.scss */ 1);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../~/style-loader/addStyles.js */ 36)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../~/css-loader?+sourceMap!../../~/postcss-loader!../../~/resolve-url-loader?+sourceMap!../../~/sass-loader/lib/loader.js?+sourceMap!./main.scss */ 1, function() {
			var newContent = __webpack_require__(/*! !../../~/css-loader?+sourceMap!../../~/postcss-loader!../../~/resolve-url-loader?+sourceMap!../../~/sass-loader/lib/loader.js?+sourceMap!./main.scss */ 1);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************************!*\
  !*** ../~/webpack-hot-middleware/client.js?timeout=20000&reload=true ***!
  \***********************************************************************/
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
  var querystring = __webpack_require__(/*! querystring */ 33);
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
  var strip = __webpack_require__(/*! strip-ansi */ 35);

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ 39);
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

var processUpdate = __webpack_require__(/*! ./process-update */ 40);

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

/* WEBPACK VAR INJECTION */}.call(exports, "?timeout=20000&reload=true", __webpack_require__(/*! ./../webpack/buildin/module.js */ 41)(module)))

/***/ }),
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ../~/ansi-html/index.js ***!
  \*******************************/
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
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ../~/ansi-regex/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 10 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ../~/base64-js/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 11 */
/* unknown exports provided */
/* exports used: default */
/*!***********************************!*\
  !*** ./scripts/app/app.helper.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * @package GodoFredoNinja
 * JavaScript modules for helper
 */

/* Return rounded and pretty value of share count. */
var convertNumber = function (n) {
  if (n >= 1000000000) { return (((n / 1000000000).toFixed(1)) + "G"); }
  if (n >= 1000000) { return (((n / 1000000).toFixed(1)) + "M"); }
  if (n >= 1000) { return (((n / 1000).toFixed(1)) + "K"); }
  return n;
};

/* search all video in <post-body>  for Responsive*/
function simplyVideoResponsive(elem) {
  return elem.each(function () {
    var selectors = [
      'iframe[src*="player.vimeo.com"]',
      'iframe[src*="w.soundcloud.com"]',
      'iframe[src*="soundcloud.com"]',
      'iframe[src*="embed.spotify.com"]',
      'iframe[src*="spotify.com"]',
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="kickstarter.com"][src*="video.html"]' ];

    var $allVideos = $(this).find(selectors.join(','));

    $allVideos.each(function () {
      $(this).wrap('<aside class="video-responsive"></aside>');
    });
  });
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
function SimplyFollowMe(links, box, urlRegexp) {
  return $.each(links, function (name, url) {
    if (typeof url === 'string' && urlRegexp.test(url)) {
      var template = "<a data-event-category=\"FollowMe\" data-event-action=\"Social\" data-event-label=\"" + name + "\" data-event-non-interaction=\"1\" title=\"Follow me in " + name + "\" href=\"" + url + "\" target=\"_blank\" class=\"simply-tracking i-" + name + "\"></a>";
      box.append(template);
    }
  });
}

module.exports = {
  videoResponsive: simplyVideoResponsive,
  facebookShareCount: simplyFacebookShareCount,
  followMe: SimplyFollowMe,
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 12 */
/* unknown exports provided */
/*!***************************************!*\
  !*** ./scripts/app/app.pagination.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * @package godofredoninja
 * pagination
 */
var $win = $(window);
var paginationUrl = $('link[rel=canonical]').attr('href');
var $btnLoadMore = $('.loadMore');
var $paginationTotal = $btnLoadMore.attr('data-page-total');

var enableDisableScroll = false; // false => !1
var paginationNumber = 2;

/* Page end */
function activeScroll() {
  enableDisableScroll = true; // true => !0
}

//  window scroll
$win.on('scroll', activeScroll);

/* Scroll page END */
function PageEnd() {
  var scrollTopWindow = $win.scrollTop() + window.innerHeight;
  var scrollTopBody = document.body.clientHeight - (window.innerHeight * 2);

  return (enableDisableScroll === true && scrollTopWindow > scrollTopBody);
}


$(document).on('ready', function () {
  // set interbal
  setInterval(function () {
    if (PageEnd()) {
      if (typeof $paginationTotal !== 'undefined' && paginationNumber <= $paginationTotal) {
        /* Call Ajax Get URL */
        $.ajax({
          type: 'GET',
          url: (paginationUrl + "page/" + paginationNumber),
          beforeSend: function () {
            $win.off('scroll', activeScroll);
            $('body').addClass('is-loading');
            $btnLoadMore.text('Loading...');
          },
          success: function (data) {
            var entries = $('.feed-entry-wrap', data);
            $('.feed-entry-content').append(entries);
            $btnLoadMore.html('Load more');

            paginationNumber += 1;

            /* Lazy load for image */
            $('.simply-lazy.lazy').lazyload({
              threshold : 200,
            });

            $win.on('scroll', activeScroll);
          },
          complete: function () {
            setTimeout(function () {$('body').removeClass('is-loading');}, 700);
          },
        });

        /* Disable scroll */
        enableDisableScroll = false; // => !1;
      } else {
        $btnLoadMore.remove();
      }
    }
  }, 500);

});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 0)))

/***/ }),
/* 13 */
/* unknown exports provided */
/* exports used: default */
/*!**********************************!*\
  !*** ./scripts/app/app.share.js ***!
  \**********************************/
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
      shareUrl: 'https://www.facebook.com/sharer/sharer.php',
      params: {
        url: this.attributes('url'),
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
/* 14 */
/* unknown exports provided */
/*!*******************************************!*\
  !*** ./scripts/lib/jquery.ghostHunter.js ***!
  \*******************************************/
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
/* 15 */
/* unknown exports provided */
/*!***********************************!*\
  !*** ./scripts/lib/transition.js ***!
  \***********************************/
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
/* 16 */
/* unknown exports provided */
/*!*****************************!*\
  !*** ./scripts/lib/zoom.js ***!
  \*****************************/
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
/* 17 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ../~/buffer/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 10)
var ieee754 = __webpack_require__(/*! ieee754 */ 26)
var isArray = __webpack_require__(/*! isarray */ 18)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 4)))

/***/ }),
/* 18 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ../~/buffer/~/isarray/index.js ***!
  \**************************************/
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 19 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ../~/css-loader/lib/css-base.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
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

	if (useSourceMap) {
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
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../buffer/index.js */ 17).Buffer))

/***/ }),
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./fonts/simply.svg ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.svg";

/***/ }),
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./fonts/simply.ttf ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.ttf";

/***/ }),
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./images/avatar.png ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/avatar.png";

/***/ }),
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ../~/html-entities/index.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ 25),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ 24),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ 3),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ 3)
};


/***/ }),
/* 24 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ../~/html-entities/lib/html4-entities.js ***!
  \************************************************/
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'Oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'oelig', 'oelig', 'scaron', 'scaron', 'yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
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
    if (str.length === 0) {
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
    var strLength = str.length;
    if (strLength === 0) {
        return '';
    }
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
    var strLength = str.length;
    if (strLength === 0) {
        return '';
    }
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
    var strLength = str.length;
    if (strLength === 0) {
        return '';
    }
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
/* 25 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ../~/html-entities/lib/xml-entities.js ***!
  \**********************************************/
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
    if (str.length === 0) {
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
    if (str.length === 0) {
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
    var strLength = str.length;
    if (strLength === 0) {
        return '';
    }
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
    var strLenght = str.length;
    if (strLenght === 0) {
        return '';
    }
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
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ../~/ieee754/index.js ***!
  \*****************************/
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 27 */
/* unknown exports provided */
/*!***********************************************!*\
  !*** ../~/jquery-lazyload/jquery.lazyload.js ***!
  \***********************************************/
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
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ../~/lunr/lunr.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.7.2
 * Copyright (C) 2016 Oliver Nightingale
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

lunr.version = "0.7.2"
/*!
 * lunr.utils
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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

  // TODO: This exists so that the deprecated property lunr.tokenizer.seperator can still be used. By
  // default it is set to false and so the correctly spelt lunr.tokenizer.separator is used unless
  // the user is using the old property to customise the tokenizer.
  //
  // This should be removed when version 1.0.0 is released.
  var separator = lunr.tokenizer.seperator || lunr.tokenizer.separator

  return obj.toString().trim().toLowerCase().split(separator)
}

/**
 * This property is legacy alias for lunr.tokenizer.separator to maintain backwards compatability.
 * When introduced the token was spelt incorrectly. It will remain until 1.0.0 when it will be removed,
 * all code should use the correctly spelt lunr.tokenizer.separator property instead.
 *
 * @static
 * @see lunr.tokenizer.separator
 * @deprecated since 0.7.2 will be removed in 1.0.0
 * @private
 * @see lunr.tokenizer
 */
lunr.tokenizer.seperator = false

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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
 * Copyright (C) 2016 Oliver Nightingale
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
/* unknown exports provided */
/*!***********************************************************!*\
  !*** ../~/prismjs/plugins/autoloader/prism-autoloader.js ***!
  \***********************************************************/
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
/* 30 */
/* unknown exports provided */
/* exports used: default */
/*!*****************************!*\
  !*** ../~/prismjs/prism.js ***!
  \*****************************/
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 4)))

/***/ }),
/* 31 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ../~/querystring-es3/decode.js ***!
  \**************************************/
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
/* 32 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ../~/querystring-es3/encode.js ***!
  \**************************************/
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
/* 33 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ../~/querystring-es3/index.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ 31);
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ 32);


/***/ }),
/* 34 */
/* unknown exports provided */
/*!******************************************!*\
  !*** ../~/sticky-kit/dist/sticky-kit.js ***!
  \******************************************/
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
/* 35 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ../~/strip-ansi/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ 9)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 36 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ../~/style-loader/addStyles.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(/*! ./fixUrls */ 37);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
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

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
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

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 37 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ../~/style-loader/fixUrls.js ***!
  \************************************/
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
/* 38 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./fonts/simply.woff ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = "data:application/font-woff;base64,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"

/***/ }),
/* 39 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ../~/webpack-hot-middleware/client-overlay.js ***!
  \*****************************************************/
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

var ansiHTML = __webpack_require__(/*! ansi-html */ 8);
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

var Entities = __webpack_require__(/*! html-entities */ 23).AllHtmlEntities;
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
/* 40 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ../~/webpack-hot-middleware/process-update.js ***!
  \*****************************************************/
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
/* 41 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ../~/webpack/buildin/module.js ***!
  \**************************************/
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
/* 42 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************************************************!*\
  !*** multi webpack-hot-middleware/client?timeout=20000&reload=true ./scripts/main.js ./styles/main.scss ***!
  \**********************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack-hot-middleware/client?timeout=20000&reload=true */7);
__webpack_require__(/*! ./scripts/main.js */5);
module.exports = __webpack_require__(/*! ./styles/main.scss */6);


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map