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
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "42ff875cbf040009261d"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotMainModule = true; // eslint-disable-line no-unused-vars
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
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			hotMainModule = false;
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
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		Object.defineProperty(fn, "e", {
/******/ 			enumerable: true,
/******/ 			value: function(chunkId) {
/******/ 				if(hotStatus === "ready")
/******/ 					hotSetStatus("prepare");
/******/ 				hotChunksLoading++;
/******/ 				return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 					finishChunkLoading();
/******/ 					throw err;
/******/ 				});
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		});
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
/******/ 			_main: hotMainModule,
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
/******/ 		hotMainModule = true;
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
/******/ 	
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

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3000/assets/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(26)(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************************************************************************************************!*\
  !*** ../~/css-loader?+sourceMap!../~/postcss-loader!../~/resolve-url-loader?+sourceMap!../~/sass-loader?+sourceMap!./styles/main.scss ***!
  \****************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 13)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n\n.entry-author a {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.entry-author a {\n  color: #00A034;\n}\n\n.entry-author a:hover {\n  color: #1976d2;\n}\n\n.featured .entry-body {\n  bottom: 0;\n  left: 0;\n  margin: 30px;\n  max-width: 600px;\n  position: absolute;\n  z-index: 2;\n}\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.tag.not--image,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\nhr::before,\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\n/* Document\n   ========================================================================== */\n\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  text-rendering: optimizeLegibility;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px;\n}\n\nfigure {\n  margin: 0;\n}\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\nhr {\n  background: #F1F2F1;\n  background: -webkit-linear-gradient(left, #F1F2F1 0, #b5b5b5 50%, #F1F2F1 100%);\n  background: -o-linear-gradient(left, #F1F2F1 0, #b5b5b5 50%, #F1F2F1 100%);\n  background: linear-gradient(to right, #F1F2F1 0, #b5b5b5 50%, #F1F2F1 100%);\n  border: 0;\n  height: 1px;\n  margin: 80px auto;\n  max-width: 90%;\n  position: relative;\n}\n\nhr::before {\n  background: #fff;\n  color: rgba(73, 55, 65, 0.75);\n  content: \"\\F121\";\n  display: block;\n  font-size: 35px;\n  left: 50%;\n  padding: 0 25px;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\ni {\n  display: inline-block;\n  vertical-align: middle;\n}\n\nol,\nul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.main,\n.footer {\n  -webkit-transition: -webkit-transform .5s ease;\n  transition: -webkit-transform .5s ease;\n  -o-transition: -o-transform .5s ease;\n  transition: transform .5s ease;\n  transition: transform .5s ease, -webkit-transform .5s ease, -o-transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  .main {\n    padding-top: 50px;\n  }\n}\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n.warning::before {\n  content: \"\\E002\";\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n.note::before {\n  content: \"\\E838\";\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n.success::before {\n  color: #00bfa5;\n  content: \"\\E86C\";\n}\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.2 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n}\n\n.tag {\n  color: #fff;\n  min-height: 250px;\n  z-index: 2;\n}\n\n.tag-wrap {\n  z-index: 2;\n}\n\n.tag.not--image {\n  min-height: auto;\n}\n\n.tag-description {\n  max-width: 500px;\n}\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n.with-tooltip:after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #FFF;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 120px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n.with-tooltip:hover:after {\n  -webkit-animation: tooltip .1s ease-out both;\n       -o-animation: tooltip .1s ease-out both;\n          animation: tooltip .1s ease-out both;\n}\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.footer a:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n}\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  left: 50%;\n  min-width: 680px;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n}\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n.bg-google {\n  background-color: #dd4b39 !important;\n}\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n.c-github {\n  color: #333 !important;\n}\n\n.bg-github {\n  background-color: #333 !important;\n}\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n.bg-linkedin {\n  background-color: #007bb6 !important;\n}\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n.bg-spotify {\n  background-color: #2ebd59 !important;\n}\n\n.c-codepen {\n  color: #222 !important;\n}\n\n.bg-codepen {\n  background-color: #222 !important;\n}\n\n.c-behance {\n  color: #131418 !important;\n}\n\n.bg-behance {\n  background-color: #131418 !important;\n}\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n.bg-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n.bg-flickr {\n  background-color: #0063dc !important;\n}\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n.bg-reddit {\n  background-color: #ff4500 !important;\n}\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n.bg-pocket {\n  background-color: #f50057 !important;\n}\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n.bg-pinterest {\n  background-color: #bd081c !important;\n}\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n.bg-whatsapp {\n  background-color: #64d448 !important;\n}\n\n.fbSave-dropdown {\n  background-color: #FFF;\n  border: 1px solid #e0e0e0;\n  bottom: 100%;\n  display: none;\n  max-width: 200px;\n  min-width: 100px;\n  padding: 8px;\n  -webkit-transform: translate(-50%, 0);\n       -o-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n  z-index: 10;\n}\n\n.fbSave-dropdown.is-visible {\n  display: block;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.u-link {\n  color: #00A034 !important;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-block {\n  display: block;\n}\n\n.u-backgroundDark {\n  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n.u-clear::before,\n.u-clear::after {\n  content: \" \";\n  display: table;\n}\n\n.u-clear::after {\n  clear: both;\n}\n\n.u-fontSize13 {\n  font-size: 13px;\n}\n\n.u-fontSize15 {\n  font-size: 15px;\n}\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n.u-fontSize28 {\n  font-size: 28px;\n}\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media (max-width: 991px) {\n  .u-sm-fontSizeBase {\n    font-size: 18px;\n  }\n\n  .u-sm-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n@media (max-width: 767px) {\n  .u-xs-fontSizeBase {\n    font-size: 18px;\n  }\n\n  .u-xs-fontSize13 {\n    font-size: 13px;\n  }\n\n  .u-xs-fontSizeSmaller {\n    font-size: 14px;\n  }\n\n  .u-xs-fontSizeSmall {\n    font-size: 16px;\n  }\n\n  .u-xs-fontSize22 {\n    font-size: 22px;\n  }\n\n  .u-xs-fontSizeLarge {\n    font-size: 24px;\n  }\n\n  .u-xs-fontSize40 {\n    font-size: 40px;\n  }\n\n  .u-xs-fontSizeLarger {\n    font-size: 32px;\n  }\n\n  .u-xs-fontSizeSmallest {\n    font-size: 12px;\n  }\n}\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n.u-fontWeightMedium {\n  font-weight: 500;\n}\n\n.u-fontWeightSemibold {\n  font-weight: 600;\n}\n\n.u-fontWeightBold {\n  font-weight: 700 !important;\n}\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 600;\n  letter-spacing: -.028em;\n}\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-floatRight {\n  float: right;\n}\n\n.u-floatLeft {\n  float: left;\n}\n\n.u-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-flexCenter {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.u-flex1 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n.u-flex0 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n\n.u-flexWrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.u-flexColumn {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.u-flexEnd {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.u-round {\n  border-radius: 50%;\n}\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n.u-card--p {\n  font-family: \"Droid Serif\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n.u-hide {\n  display: none !important;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n.u-wrap {\n  margin: 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n  width: 100%;\n}\n\n@media only screen and (min-width: 1230px) {\n  .u-wrap {\n    max-width: 1200px;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .content {\n    -webkit-box-flex: 1 !important;\n        -ms-flex: 1 !important;\n            flex: 1 !important;\n    max-width: calc(100% - 340px) !important;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n\n  .sidebar {\n    -webkit-box-flex: 0 !important;\n        -ms-flex: 0 0 340px !important;\n            flex: 0 0 340px !important;\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n}\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n  -ms-flex-flow: row wrap;\n      flex-flow: row wrap;\n  margin-left: -12px;\n  margin-right: -12px;\n}\n\n.row .col {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n\n.row .col.s1 {\n  -ms-flex-preferred-size: 8.33333%;\n      flex-basis: 8.33333%;\n  max-width: 8.33333%;\n}\n\n.row .col.s2 {\n  -ms-flex-preferred-size: 16.66667%;\n      flex-basis: 16.66667%;\n  max-width: 16.66667%;\n}\n\n.row .col.s3 {\n  -ms-flex-preferred-size: 25%;\n      flex-basis: 25%;\n  max-width: 25%;\n}\n\n.row .col.s4 {\n  -ms-flex-preferred-size: 33.33333%;\n      flex-basis: 33.33333%;\n  max-width: 33.33333%;\n}\n\n.row .col.s5 {\n  -ms-flex-preferred-size: 41.66667%;\n      flex-basis: 41.66667%;\n  max-width: 41.66667%;\n}\n\n.row .col.s6 {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n  max-width: 50%;\n}\n\n.row .col.s7 {\n  -ms-flex-preferred-size: 58.33333%;\n      flex-basis: 58.33333%;\n  max-width: 58.33333%;\n}\n\n.row .col.s8 {\n  -ms-flex-preferred-size: 66.66667%;\n      flex-basis: 66.66667%;\n  max-width: 66.66667%;\n}\n\n.row .col.s9 {\n  -ms-flex-preferred-size: 75%;\n      flex-basis: 75%;\n  max-width: 75%;\n}\n\n.row .col.s10 {\n  -ms-flex-preferred-size: 83.33333%;\n      flex-basis: 83.33333%;\n  max-width: 83.33333%;\n}\n\n.row .col.s11 {\n  -ms-flex-preferred-size: 91.66667%;\n      flex-basis: 91.66667%;\n  max-width: 91.66667%;\n}\n\n.row .col.s12 {\n  -ms-flex-preferred-size: 100%;\n      flex-basis: 100%;\n  max-width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  .row .col.m1 {\n    -ms-flex-preferred-size: 8.33333%;\n        flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .row .col.m2 {\n    -ms-flex-preferred-size: 16.66667%;\n        flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .row .col.m3 {\n    -ms-flex-preferred-size: 25%;\n        flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .row .col.m4 {\n    -ms-flex-preferred-size: 33.33333%;\n        flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .row .col.m5 {\n    -ms-flex-preferred-size: 41.66667%;\n        flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .row .col.m6 {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .row .col.m7 {\n    -ms-flex-preferred-size: 58.33333%;\n        flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .row .col.m8 {\n    -ms-flex-preferred-size: 66.66667%;\n        flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .row .col.m9 {\n    -ms-flex-preferred-size: 75%;\n        flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .row .col.m10 {\n    -ms-flex-preferred-size: 83.33333%;\n        flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .row .col.m11 {\n    -ms-flex-preferred-size: 91.66667%;\n        flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .row .col.m12 {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .row .col.l1 {\n    -ms-flex-preferred-size: 8.33333%;\n        flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .row .col.l2 {\n    -ms-flex-preferred-size: 16.66667%;\n        flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .row .col.l3 {\n    -ms-flex-preferred-size: 25%;\n        flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .row .col.l4 {\n    -ms-flex-preferred-size: 33.33333%;\n        flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .row .col.l5 {\n    -ms-flex-preferred-size: 41.66667%;\n        flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .row .col.l6 {\n    -ms-flex-preferred-size: 50%;\n        flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .row .col.l7 {\n    -ms-flex-preferred-size: 58.33333%;\n        flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .row .col.l8 {\n    -ms-flex-preferred-size: 66.66667%;\n        flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .row .col.l9 {\n    -ms-flex-preferred-size: 75%;\n        flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .row .col.l10 {\n    -ms-flex-preferred-size: 83.33333%;\n        flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .row .col.l11 {\n    -ms-flex-preferred-size: 91.66667%;\n        flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .row .col.l12 {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n.header {\n  background: #00A034;\n  color: #dce6ec;\n  z-index: 80;\n}\n\n.header a:hover {\n  color: #fff;\n}\n\n.header-wrap {\n  height: 50px;\n}\n\n.header-logo {\n  height: 30px;\n}\n\n.header-logo img {\n  max-height: 100%;\n}\n\n.header-logo,\n.header .button-search--toggle,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n.header-description {\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 750px;\n}\n\n.follow > a {\n  padding-left: 15px;\n}\n\n.nav {\n  line-height: 40px;\n  padding: 8px 0;\n  position: relative;\n}\n\n.nav ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.nav li {\n  float: left;\n}\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n.nav-border {\n  border-left: 1px solid #dce6ec;\n  height: 24px;\n}\n\n.button-search--toggle {\n  color: inherit !important;\n  padding-right: 0 !important;\n}\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  -webkit-transition: -webkit-transform .4s;\n  transition: -webkit-transform .4s;\n  -o-transition: -o-transform .4s;\n  transition: transform .4s;\n  transition: transform .4s, -webkit-transform .4s, -o-transform .4s;\n  width: 48px;\n}\n\n.button-nav--toggle span {\n  background-color: #dce6ec;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  -webkit-transition: .4s;\n  -o-transition: .4s;\n  transition: .4s;\n  width: 20px;\n}\n\n.button-nav--toggle span:first-child {\n  -webkit-transform: translate(0, -6px);\n       -o-transform: translate(0, -6px);\n          transform: translate(0, -6px);\n}\n\n.button-nav--toggle span:last-child {\n  -webkit-transform: translate(0, 6px);\n       -o-transform: translate(0, 6px);\n          transform: translate(0, 6px);\n}\n\nbody.is-frontpage .header-wrap {\n  height: auto;\n}\n\n@media only screen and (min-width: 766px) {\n  .header-wrap {\n    border: 0;\n    height: 70px;\n  }\n\n  .header-logo {\n    height: 40px;\n    padding-left: 0;\n  }\n\n  body.is-frontpage .header-wrap {\n    height: 190px;\n  }\n\n  body.is-frontpage .header-logo {\n    height: 50px;\n  }\n\n  body.is-frontpage .nav ul {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed;\n  }\n\n  .header-wrap {\n    height: 50px !important;\n  }\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  body.is-showNavMob .sideNav {\n    -webkit-transform: translateX(0);\n         -o-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    -webkit-transform: rotate(90deg);\n         -o-transform: rotate(90deg);\n            transform: rotate(90deg);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    -webkit-transform: rotate(45deg) translate(0, 0);\n         -o-transform: rotate(45deg) translate(0, 0);\n            transform: rotate(45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    -webkit-transform: scaleX(0);\n         -o-transform: scaleX(0);\n            transform: scaleX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    -webkit-transform: rotate(-45deg) translate(0, 0);\n         -o-transform: rotate(-45deg) translate(0, 0);\n            transform: rotate(-45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    -webkit-transform: translateX(-25%);\n         -o-transform: translateX(-25%);\n            transform: translateX(-25%);\n  }\n}\n\n.featured {\n  padding-bottom: 33%;\n}\n\n.featured .entry {\n  color: #fff;\n  margin: 0;\n  -webkit-transition: width .5s;\n  -o-transition: width .5s;\n  transition: width .5s;\n  width: 50%;\n}\n\n.featured .entry-title {\n  font-size: 32px !important;\n}\n\n.featured .entry.entry2 {\n  border-left: solid 1px #fff;\n  border-right: solid 1px #fff;\n}\n\n.featured .entry-image {\n  height: 100%;\n}\n\n.featured .entry:not(.first) {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  width: 25%;\n}\n\n.featured .entry:not(.first) .entry-byline,\n.featured .entry:not(.first) .entry-excerpt {\n  display: none;\n}\n\n.featured .entry:not(.not--image) .entry-author {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.featured .entry:not(.not--image) .entry-author a,\n.featured .entry:not(.not--image) .entry-author .entry-date {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n@media only screen and (max-width: 1000px) {\n  .featured {\n    padding: 0;\n  }\n\n  .featured-wrap {\n    display: block;\n    position: relative;\n  }\n\n  .featured .entry {\n    width: 100% !important;\n  }\n\n  .featured .entry-image {\n    height: 350px;\n  }\n\n  .featured .entry-excerpt {\n    display: none;\n  }\n\n  .featured .entry-title {\n    font-size: 24px !important;\n  }\n\n  .featured .entry-byline {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n\n  .featured .entry.entry2 {\n    border: 0;\n  }\n}\n\n.entry-author {\n  line-height: 1.4;\n  padding-left: 10px;\n}\n\n.entry-avatar--img {\n  border-radius: 50%;\n  height: 40px;\n  width: 40px;\n}\n\n.entry-avatar--img.no-avatar {\n  background-image: url(" + __webpack_require__(/*! ./../images/avatar.png */ 16) + ");\n}\n\n.entry.not--image {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.entry.u-card .entry-image--link {\n  max-height: 240px;\n  max-width: 360px;\n}\n\n.entry.entry--featured .entry-body {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.entry.entry--featured .entry-image--link {\n  max-width: 100%;\n  max-height: 185px;\n}\n\n.entry.entry--featured .entry-image {\n  margin-bottom: 20px;\n  margin-top: 5px;\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1;\n}\n\n.entry.entry--featured .entry-img {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n       -o-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.entry.entry--featured .entry-excerpt,\n.entry.even:not(.entry--featured) .entry-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n}\n\n.homePage .entry .u-backgroundDark {\n  display: none;\n}\n\n.homePage .entry-image {\n  height: 170px;\n}\n\n@media only screen and (min-width: 766px) {\n  .homePage .entry {\n    margin-bottom: 50px;\n  }\n\n  .homePage .entry-image {\n    height: 270px;\n  }\n\n  .homePage .entry.entry5,\n  .homePage .entry.entry6,\n  .homePage .entry.entry7,\n  .homePage .entry.entry11,\n  .homePage .entry.entry12,\n  .homePage .entry.entry13 {\n    -ms-flex-preferred-size: 33.33333%;\n        flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .homePage .entry.entry5 .entry-image,\n  .homePage .entry.entry6 .entry-image,\n  .homePage .entry.entry7 .entry-image,\n  .homePage .entry.entry11 .entry-image,\n  .homePage .entry.entry12 .entry-image,\n  .homePage .entry.entry13 .entry-image {\n    height: 170px;\n  }\n\n  .homePage .entry.entry8,\n  .homePage .entry.entry14 {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .homePage .entry.entry8 {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n\n  .homePage .entry.entry8 .entry-image {\n    height: 350px;\n    margin-right: 15px;\n    width: 66.66667% !important;\n  }\n\n  .homePage .entry.entry8 .entry-title {\n    font-size: 36px !important;\n  }\n\n  .homePage .entry.entry8 .entry-body {\n    padding-top: 0;\n    padding-left: 13px;\n    width: 33.33333% !important;\n  }\n\n  .homePage .entry.entry14 .u-backgroundDark {\n    display: block;\n  }\n\n  .homePage .entry.entry14 .entry-image {\n    height: 450px;\n  }\n\n  .homePage .entry.entry14 .entry-body {\n    bottom: 0;\n    left: 0;\n    margin: 30px 40px;\n    max-width: 600px;\n    position: absolute;\n    z-index: 2;\n  }\n\n  .homePage .entry.entry14 .entry-title {\n    font-size: 44px !important;\n  }\n\n  .homePage .entry.entry14 .entry-excerpt {\n    font-size: 24px;\n    line-height: 1.3;\n  }\n\n  .homePage .entry.entry14:not(.not--image) .entry-body {\n    color: #fff;\n  }\n\n  .homePage .entry.entry14:not(.not--image) .entry-author {\n    color: rgba(255, 255, 255, 0.9);\n  }\n\n  .homePage .entry.entry14:not(.not--image) .entry-author a,\n  .homePage .entry.entry14:not(.not--image) .entry-author .entry-date {\n    color: rgba(255, 255, 255, 0.9);\n  }\n}\n\n.post-title {\n  line-height: 1.04;\n}\n\n.post-footer {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.post-body a {\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px;\n}\n\n.post-body ul,\n.post-body ol {\n  font-size: 21px;\n  list-style: disc;\n  margin-top: 30px;\n  padding-left: 40px;\n}\n\n.post-body ul li,\n.post-body ol li {\n  line-height: 1.58;\n}\n\n.post-body ol {\n  list-style: decimal;\n}\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 40px !important;\n}\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.post-newsletter {\n  max-width: 520px;\n}\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n.post-related .entry-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 150px;\n}\n\n.post-related .entry-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n.post-related .u-card {\n  height: 240px;\n}\n\n.sharePost {\n  left: -100px;\n  top: 0;\n  width: 45px;\n}\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  -webkit-transform: translateY(100%);\n       -o-transform: translateY(100%);\n          transform: translateY(100%);\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  -o-transition: -o-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s, -o-transform .3s;\n  visibility: hidden;\n  z-index: 500;\n}\n\n.postActions.is-visible {\n  -webkit-transform: translateY(0);\n       -o-transform: translateY(0);\n          transform: translateY(0);\n  -webkit-transition-delay: 0s;\n       -o-transition-delay: 0s;\n          transition-delay: 0s;\n  visibility: visible;\n}\n\n.postActions-wrap {\n  max-width: 1200px;\n}\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n.author a {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author a:hover {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.author-wrap {\n  z-index: 2;\n}\n\n.author-avatar {\n  height: 80px;\n  margin-right: 10px;\n  width: 80px;\n}\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author-bio {\n  max-width: 600px;\n}\n\n.author-follow a {\n  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.5);\n  cursor: pointer;\n  display: inline-block;\n  height: 40px;\n  line-height: 40px;\n  margin: 0 10px;\n  padding: 0 16px;\n  text-shadow: none;\n}\n\n.author-follow a:hover {\n  box-shadow: inset 0 0 0 2px #fff;\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block;\n  }\n}\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n.sideNav {\n  background-color: #00A034;\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  -webkit-transform: translateX(100%);\n       -o-transform: translateX(100%);\n          transform: translateX(100%);\n  -webkit-transition: .4s;\n  -o-transition: .4s;\n  transition: .4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(" + __webpack_require__(/*! ./../fonts/simply.eot */ 1) + ");\n  src: url(" + __webpack_require__(/*! ./../fonts/simply.eot */ 1) + ") format(\"embedded-opentype\"), url(" + __webpack_require__(/*! ./../fonts/simply.ttf */ 15) + ") format(\"truetype\"), url(" + __webpack_require__(/*! ./../fonts/simply.woff */ 22) + ") format(\"woff\"), url(" + __webpack_require__(/*! ./../fonts/simply.svg */ 14) + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.i-comments:before {\n  content: \"\\E900\";\n}\n\n.i-location:before {\n  content: \"\\E8B4\";\n}\n\n.i-save:before {\n  content: \"\\E8E6\";\n}\n\n.i-save--line:before {\n  content: \"\\E8E7\";\n}\n\n.i-check-circle:before {\n  content: \"\\E86C\";\n}\n\n.i-close:before {\n  content: \"\\E5CD\";\n}\n\n.i-favorite:before {\n  content: \"\\E87D\";\n}\n\n.i-star:before {\n  content: \"\\E838\";\n}\n\n.i-warning:before {\n  content: \"\\E002\";\n}\n\n.i-rss:before {\n  content: \"\\E0E5\";\n}\n\n.i-search:before {\n  content: \"\\E8B6\";\n}\n\n.i-send:before {\n  content: \"\\E163\";\n}\n\n.i-share:before {\n  content: \"\\E80D\";\n}\n\n.i-link:before {\n  content: \"\\F0C1\";\n}\n\n.i-reddit:before {\n  content: \"\\F281\";\n}\n\n.i-twitter:before {\n  content: \"\\F099\";\n}\n\n.i-github:before {\n  content: \"\\F09B\";\n}\n\n.i-linkedin:before {\n  content: \"\\F0E1\";\n}\n\n.i-code:before {\n  content: \"\\F121\";\n}\n\n.i-youtube:before {\n  content: \"\\F16A\";\n}\n\n.i-stack-overflow:before {\n  content: \"\\F16C\";\n}\n\n.i-instagram:before {\n  content: \"\\F16D\";\n}\n\n.i-flickr:before {\n  content: \"\\F16E\";\n}\n\n.i-dribbble:before {\n  content: \"\\F17D\";\n}\n\n.i-behance:before {\n  content: \"\\F1B4\";\n}\n\n.i-spotify:before {\n  content: \"\\F1BC\";\n}\n\n.i-codepen:before {\n  content: \"\\F1CB\";\n}\n\n.i-facebook:before {\n  content: \"\\F230\";\n}\n\n.i-pinterest:before {\n  content: \"\\F231\";\n}\n\n.i-whatsapp:before {\n  content: \"\\F232\";\n}\n\n.i-snapchat:before {\n  content: \"\\F2AC\";\n}\n\n.animated {\n  -webkit-animation-duration: 1s;\n       -o-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n       -o-animation-fill-mode: both;\n          animation-fill-mode: both;\n}\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n       -o-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n       -o-animation-name: bounceIn;\n          animation-name: bounceIn;\n}\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n       -o-animation-name: bounceInDown;\n          animation-name: bounceInDown;\n}\n\n.pulse {\n  -webkit-animation-name: pulse;\n       -o-animation-name: pulse;\n          animation-name: pulse;\n}\n\n@-webkit-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n       animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n         -o-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n            transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n            transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n            transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n            transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n            transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n            transform: none;\n  }\n}\n\n@-o-keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n       animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -o-transform: none;\n       transform: none;\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    -webkit-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n         -o-animation-timing-function: cubic-bezier(215, 610, 355, 1);\n            animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n            transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n            transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n            transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    -webkit-transform: none;\n         -o-transform: none;\n            transform: none;\n  }\n}\n\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-o-keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.2, 1.2, 1.2);\n            transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1);\n  }\n}\n\n@-webkit-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-o-keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -o-transform: translateY(0);\n       transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -o-transform: translateY(10px);\n       transform: translateY(10px);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n         -o-transform: translateY(0);\n            transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(10px);\n         -o-transform: translateY(10px);\n            transform: translateY(10px);\n  }\n}\n\n@-webkit-keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-o-keyframes spin {\n  from {\n    -o-transform: rotate(0deg);\n       transform: rotate(0deg);\n  }\n\n  to {\n    -o-transform: rotate(360deg);\n       transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n         -o-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n\n  to {\n    -webkit-transform: rotate(360deg);\n         -o-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n@-o-keyframes tooltip {\n  0% {\n    opacity: 0;\n    -o-transform: translate(-50%, 6px);\n       transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -o-transform: translate(-50%, 0);\n       transform: translate(-50%, 0);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate(-50%, 6px);\n         -o-transform: translate(-50%, 6px);\n            transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translate(-50%, 0);\n         -o-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n  }\n}\n\n", "", {"version":3,"sources":["/./styles/main.scss","/./styles/components/_entry.scss","/./styles/common/_mixins.scss","/./styles/main.scss","/./styles/components/_featured.scss","/./styles/common/_utilities.scss","/./styles/common/_global.scss","/../node_modules/normalize.css/normalize.css","/./styles/common/_typography.scss","/./styles/components/_grid.scss","/./styles/components/_header.scss","/./styles/components/_homepage.scss","/./styles/components/_post.scss","/./styles/components/_author.scss","/./styles/components/_form.scss","/./styles/components/_sidebar.scss","/./styles/components/_sidenav.scss","/./styles/components/_icons.scss","/./styles/components/_animated.scss"],"names":[],"mappings":"AAAA,iBAAA;;ACGE;ECFA,eAAA;EACA,gBAAA;EACA,sBAAA;CCGD;;ADAD;EACE,eAAA;CCGD;;ADJD;EAEW,eAAA;CCMV;;ACZD;EFUE,UAAA;EACA,QAAA;EACA,aAAA;EACA,iBAAA;EACA,mBAAA;EACA,WAAA;CCMD;;AELD;;EHGE,UAAA;EACA,QAAA;EACA,mBAAA;EACA,SAAA;EACA,OAAA;CCOD;;AGkJD;;EJrJE,qCAAA;EACA,oCAAA;CCQD;;AG4CD;;;;;;EJhDE,gFAAA;EACA,iCAAA;EACA,YAAA;EACA,mBAAA;EACA,oBAAA;EACA,qBAAA;EACA,qBAAA;EACA,qBAAA;EAEA,uCAAA;EACA,oCAAA;EACA,mCAAA;CCYD;;AIzDD,4EAAA;;AAEA;;;;;GJgEG;;AIzDH;gFJ4DgF;;AIzDhF;EACE,wBAAA;EAA0B,OAAA;EAC1B,kBAAA;EAAoB,OAAA;EACpB,2BAAA;EAA6B,OAAA;EAC7B,+BAAA;EAAiC,OAAA;CJgElC;;AI7DD;gFJgEgF;;AI7DhF;;GJiEG;;AI7DH;EACE,UAAA;CJgED;;AI7DD;;GJiEG;;AI7DH;;;;;;EAME,eAAA;CJgED;;AI7DD;;;GJkEG;;AI7DH;EACE,eAAA;EACA,iBAAA;CJgED;;AI7DD;gFJgEgF;;AI7DhF;;;GJkEG;;AI7DH;;;EAEO,OAAA;EACL,eAAA;CJiED;;AI9DD;;GJkEG;;AI9DH;EACE,iBAAA;CJiED;;AI9DD;;;GJmEG;;AI9DH;EACE,wBAAA;EAA0B,OAAA;EAC1B,UAAA;EAAY,OAAA;EACZ,kBAAA;EAAoB,OAAA;CJoErB;;AIjED;;;GJsEG;;AIjEH;EACE,kCAAA;EAAoC,OAAA;EACpC,eAAA;EAAiB,OAAA;CJsElB;;AInED;gFJsEgF;;AInEhF;;;GJwEG;;AInEH;EACE,8BAAA;EAAgC,OAAA;EAChC,sCAAA;EAAwC,OAAA;CJwEzC;;AIrED;;;GJ0EG;;AIrEH;;EAEE,iBAAA;CJwED;;AIrED;;;GJ0EG;;AIrEH;EACE,oBAAA;EAAsB,OAAA;EACtB,2BAAA;EAA6B,OAAA;EAC7B,kCAAA;EAAoC,OAAA;CJ2ErC;;AIxED;;GJ4EG;;AIxEH;;EAEE,qBAAA;CJ2ED;;AIxED;;GJ4EG;;AIxEH;;EAEE,oBAAA;CJ2ED;;AIxED;;;GJ6EG;;AIxEH;;;EAGE,kCAAA;EAAoC,OAAA;EACpC,eAAA;EAAiB,OAAA;CJ6ElB;;AI1ED;;GJ8EG;;AI1EH;EACE,mBAAA;CJ6ED;;AI1ED;;GJ8EG;;AI1EH;EACE,uBAAA;EACA,YAAA;CJ6ED;;AI1ED;;GJ8EG;;AI1EH;EACE,eAAA;CJ6ED;;AI1ED;;;GJ+EG;;AI1EH;;EAEE,eAAA;EACA,eAAA;EACA,mBAAA;EACA,yBAAA;CJ6ED;;AI1ED;EACE,gBAAA;CJ6ED;;AI1ED;EACE,YAAA;CJ6ED;;AI1ED;gFJ6EgF;;AI1EhF;;GJ8EG;;AI1EH;;EAEE,sBAAA;CJ6ED;;AI1ED;;GJ8EG;;AI1EH;EACE,cAAA;EACA,UAAA;CJ6ED;;AI1ED;;GJ8EG;;AI1EH;EACE,mBAAA;CJ6ED;;AI1ED;;GJ8EG;;AI1EH;EACE,iBAAA;CJ6ED;;AI1ED;gFJ6EgF;;AI1EhF;;;GJ+EG;;AI1EH;;;;;EAKE,wBAAA;EAA0B,OAAA;EAC1B,gBAAA;EAAkB,OAAA;EAClB,kBAAA;EAAoB,OAAA;EACpB,UAAA;EAAY,OAAA;CJiFb;;AI9ED;;;GJmFG;;AI9EH;;EACQ,OAAA;EACN,kBAAA;CJkFD;;AI/ED;;;GJoFG;;AI/EH;;EACS,OAAA;EACP,qBAAA;CJmFD;;AIhFD;;;;GJsFG;;AIhFH;;;;EAIE,2BAAA;EAA6B,OAAA;CJoF9B;;AIjFD;;GJqFG;;AIjFH;;;;EAIE,mBAAA;EACA,WAAA;CJoFD;;AIjFD;;GJqFG;;AIjFH;;;;EAIE,+BAAA;CJoFD;;AIjFD;;GJqFG;;AIjFH;EACE,0BAAA;EACA,cAAA;EACA,+BAAA;CJoFD;;AIjFD;;;;;GJwFG;;AIjFH;EACE,uBAAA;EAAyB,OAAA;EACzB,eAAA;EAAiB,OAAA;EACjB,eAAA;EAAiB,OAAA;EACjB,gBAAA;EAAkB,OAAA;EAClB,WAAA;EAAa,OAAA;EACb,oBAAA;EAAsB,OAAA;CJ0FvB;;AIvFD;;;GJ4FG;;AIvFH;EACE,sBAAA;EAAwB,OAAA;EACxB,yBAAA;EAA2B,OAAA;CJ4F5B;;AIzFD;;GJ6FG;;AIzFH;EACE,eAAA;CJ4FD;;AIzFD;;;GJ8FG;;AHxFH;;EOCE,uBAAA;EAAyB,OAAA;EACzB,WAAA;EAAa,OAAA;CJ8Fd;;AI3FD;;GJ+FG;;AH1FH;;EOCE,aAAA;CJ8FD;;AI3FD;;;GJgGG;;AH5FH;EOEE,8BAAA;EAAgC,OAAA;EAChC,qBAAA;EAAuB,OAAA;CJgGxB;;AI7FD;;GJiGG;;AH9FH;;EOGE,yBAAA;CJgGD;;AI7FD;;;GJkGG;;AI7FH;EACE,2BAAA;EAA6B,OAAA;EAC7B,cAAA;EAAgB,OAAA;CJkGjB;;AI/FD;gFJkGgF;;AI/FhF;;;GJoGG;;AI/FH;;EAEE,eAAA;CJkGD;;AI/FD;;GJmGG;;AI/FH;EACE,mBAAA;CJkGD;;AI/FD;gFJkGgF;;AI/FhF;;GJmGG;;AI/FH;EACE,sBAAA;CJkGD;;AI/FD;;GJmGG;;AI/FH;EACE,cAAA;CJkGD;;AI/FD;gFJkGgF;;AI/FhF;;GJmGG;;AH7GH;EOeE,cAAA;CJkGD;;AG5iBD;;;EACE,oBAAA;CHijBD;;AG9iBD;EACE,eAAA;EACA,sBAAA;CHijBD;;AGnjBD;;EAMI,WAAA;CHkjBH;;AG9iBD;EACE,0CAAA;EACA,kCAAA;EACA,gBAAA;EACA,mBAAA;EACA,iBAAA;EACA,wBAAA;EACA,kBAAA;EACA,mBAAA;EACA,oBAAA;EACA,mBAAA;CHijBD;;AG9iBD;EACE,0BAAA;EACA,2CAAA;EACA,gBAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,iBAAA;EACA,mCAAA;CHijBD;;AG7iBD;EACE,uBAAA;EACA,gBAAA;CHgjBD;;AG7iBD;EACE,UAAA;CHgjBD;;AG3iBD;;;EACE,oBAAA;EACA,mBAAA;EACA,eAAA;EACA,qDAAA;EACA,gBAAA;EACA,iBAAA;EACA,sBAAA;CHgjBD;;AG7iBD;EACE,qCAAA;EACA,mBAAA;EACA,qDAAA;EACA,gBAAA;EACA,iBAAA;EACA,iBAAA;EACA,cAAA;EACA,mBAAA;EACA,kBAAA;CHgjBD;;AGzjBD;EAYI,wBAAA;EACA,eAAA;EACA,WAAA;EACA,wBAAA;CHijBH;;AG3iBD;EACE,oBAAA;EACA,gFAAA;EAAA,2EAAA;EAAA,4EAAA;EACA,UAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,mBAAA;CH8iBD;;AGrjBD;EAWI,iBAAA;EACA,8BAAA;EACA,iBAAA;EACA,eAAA;EACA,gBAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,SAAA;EACA,yCAAA;OAAA,oCAAA;UAAA,iCAAA;CH8iBH;;AG1iBD;EACE,aAAA;EACA,gBAAA;EACA,uBAAA;EACA,YAAA;CH6iBD;;AGjjBD;EAOI,mBAAA;CH8iBH;;AG1iBD;EACE,sBAAA;EACA,uBAAA;CH6iBD;;AG1iBD;;EACE,uBAAA;EACA,iBAAA;EACA,UAAA;EACA,WAAA;CH8iBD;;AG3iBD;;EACS,+CAAA;EAAA,uCAAA;EAAA,qCAAA;EAAA,+BAAA;EAAA,kFAAA;CH+iBR;;AG7iBD;EACE;IAAO,kBAAA;GHijBN;CACF;;AG7iBD;EACE,oBAAA;EACA,eAAA;CHgjBD;;AG/iBC;EAAW,iBAAA;CHmjBZ;;AGhjBD;EACE,oBAAA;EACA,eAAA;CHmjBD;;AGljBC;EAAW,iBAAA;CHsjBZ;;AGnjBD;EACE,oBAAA;EACA,eAAA;CHsjBD;;AGxjBD;EAGa,eAAA;EAAiB,iBAAA;CH0jB7B;;AGvjBD;;;EACE,eAAA;EACA,2BAAA;EACA,4BAAA;EACA,iBAAA;EACA,6BAAA;CH4jBD;;AG1jBC;;;EACE,eAAA;EACA,2BAAA;CH+jBH;;AG5jBC;;;EAEE,YAAA;EACA,gBAAA;EACA,mBAAA;CHgkBH;;AG1jBD;EACE,YAAA;EACA,kBAAA;EACA,WAAA;CH6jBD;;AG3jBC;EAAQ,WAAA;CH+jBT;;AGpkBD;EASI,iBAAA;CH+jBH;;AG5jBC;EACE,iBAAA;CH+jBH;;AGxjBD;EACE,kBAAA;EACA,mBAAA;CH2jBD;;AG7jBD;EAKI,gCAAA;EACA,mBAAA;EACA,YAAA;EACA,4BAAA;EACA,sBAAA;EACA,gBAAA;EACA,iBAAA;EACA,UAAA;EACA,kBAAA;EACA,iBAAA;EACA,WAAA;EACA,iBAAA;EACA,qBAAA;EACA,mBAAA;EACA,mBAAA;EACA,qBAAA;EACA,WAAA;EACA,gCAAA;EACA,WAAA;CH4jBH;;AGnlBD;EA2BI,6CAAA;OAAA,wCAAA;UAAA,qCAAA;CH4jBH;;AGtjBD;EACE,2BAAA;CHyjBD;;AGvjBC;EACE,0BAAA;CH0jBH;;AG9jBD;EAKa,0BAAA;CH6jBZ;;AGvjBD;EACE,sCAAA;EACA,cAAA;EACA,YAAA;CH0jBD;;AGxjBC;EACE,WAAA;EACA,mBAAA;EACA,UAAA;CH2jBH;;AGxjBC;EACE,iBAAA;EACA,sBAAA;CH2jBH;;AGxjBC;EACE,0BAAA;EACA,UAAA;EACA,iBAAA;EACA,mBAAA;EACA,SAAA;EACA,yCAAA;OAAA,oCAAA;UAAA,iCAAA;CH2jBH;;AGpjBD;EACE,eAAA;EACA,UAAA;EACA,iBAAA;EACA,iBAAA;EACA,oBAAA;EACA,mBAAA;CHujBD;;AGrjBC;EACE,UAAA;EACA,UAAA;EACA,aAAA;EACA,QAAA;EACA,mBAAA;EACA,OAAA;EACA,YAAA;CHwjBH;;AGjjBC;EAAqB,0BAAA;CHqjBtB;;AGpjBC;;EAAsB,qCAAA;CHyjBvB;;AG1jBC;EAAqB,0BAAA;CH8jBtB;;AG7jBC;;EAAsB,qCAAA;CHkkBvB;;AGnkBC;EAAqB,0BAAA;CHukBtB;;AGtkBC;EAAsB,qCAAA;CH0kBvB;;AG3kBC;EAAqB,0BAAA;CH+kBtB;;AG9kBC;;EAAsB,qCAAA;CHmlBvB;;AGplBC;EAAqB,0BAAA;CHwlBtB;;AGvlBC;;EAAsB,qCAAA;CH4lBvB;;AG7lBC;EAAqB,uBAAA;CHimBtB;;AGhmBC;EAAsB,kCAAA;CHomBvB;;AGrmBC;EAAqB,0BAAA;CHymBtB;;AGxmBC;EAAsB,qCAAA;CH4mBvB;;AG7mBC;EAAqB,0BAAA;CHinBtB;;AGhnBC;EAAsB,qCAAA;CHonBvB;;AGrnBC;EAAqB,uBAAA;CHynBtB;;AGxnBC;EAAsB,kCAAA;CH4nBvB;;AG7nBC;EAAqB,0BAAA;CHioBtB;;AGhoBC;EAAsB,qCAAA;CHooBvB;;AGroBC;EAAqB,0BAAA;CHyoBtB;;AGxoBC;EAAsB,qCAAA;CH4oBvB;;AG7oBC;EAAqB,0BAAA;CHipBtB;;AGhpBC;EAAsB,qCAAA;CHopBvB;;AGrpBC;EAAqB,0BAAA;CHypBtB;;AGxpBC;EAAsB,qCAAA;CH4pBvB;;AG7pBC;EAAqB,0BAAA;CHiqBtB;;AGhqBC;EAAsB,qCAAA;CHoqBvB;;AGrqBC;EAAqB,0BAAA;CHyqBtB;;AGxqBC;EAAsB,qCAAA;CH4qBvB;;AG7qBC;EAAqB,0BAAA;CHirBtB;;AGhrBC;EAAsB,qCAAA;CHorBvB;;AG7qBC;EACE,uBAAA;EACA,0BAAA;EACA,aAAA;EACA,cAAA;EACA,iBAAA;EACA,iBAAA;EACA,aAAA;EACA,sCAAA;OAAA,iCAAA;UAAA,8BAAA;EACA,YAAA;CHgrBH;;AGzrBC;EAWgB,eAAA;CHkrBjB;;AKx+BD;;;;;;;;;;;;EAEE,eAAA;EACA,2CAAA;EACA,iBAAA;EACA,iBAAA;EACA,UAAA;CLq/BD;;AK3/BD;;;;;;;;;;;;EASI,eAAA;EACA,qBAAA;CLigCH;;AK7/BD;EAAK,mBAAA;CLigCJ;;AKhgCD;EAAK,oBAAA;CLogCJ;;AKngCD;EAAK,qBAAA;CLugCJ;;AKtgCD;EAAK,oBAAA;CL0gCJ;;AKzgCD;EAAK,oBAAA;CL6gCJ;;AK5gCD;EAAK,gBAAA;CLghCJ;;AK3gCD;EAAM,mBAAA;CL+gCL;;AK9gCD;EAAM,oBAAA;CLkhCL;;AKjhCD;EAAM,qBAAA;CLqhCL;;AKphCD;EAAM,oBAAA;CLwhCL;;AKvhCD;EAAM,oBAAA;CL2hCL;;AK1hCD;EAAM,gBAAA;CL8hCL;;AK3hCD;EACE,UAAA;CL8hCD;;AK/jCD;;;;;;;;;;;;EAEE,eAAA;EACA,2CAAA;EACA,iBAAA;EACA,iBAAA;EACA,UAAA;CL4kCD;;AK1kCC;;;;;;;;;;;;EACE,eAAA;EACA,qBAAA;CLwlCH;;AKplCD;EAAK,mBAAA;CLwlCJ;;AKvlCD;EAAK,oBAAA;CL2lCJ;;AK1lCD;EAAK,qBAAA;CL8lCJ;;AK7lCD;EAAK,oBAAA;CLimCJ;;AKhmCD;EAAK,oBAAA;CLomCJ;;AKnmCD;EAAK,gBAAA;CLumCJ;;AKlmCD;EAAM,mBAAA;CLsmCL;;AKrmCD;EAAM,oBAAA;CLymCL;;AKxmCD;EAAM,qBAAA;CL4mCL;;AK3mCD;EAAM,oBAAA;CL+mCL;;AK9mCD;EAAM,oBAAA;CLknCL;;AKjnCD;EAAM,gBAAA;CLqnCL;;AKlnCD;EACE,UAAA;CLqnCD;;AEvpCD;EACE,2BAAA;EACA,0BAAA;CF0pCD;;AEvpCD;EACE,0BAAA;EACA,yBAAA;CF0pCD;;AErpCD;EAAU,0BAAA;CFypCT;;AEtpCD;EAAc,mBAAA;CF0pCb;;AEzpCD;EAAc,mBAAA;CF6pCb;;AE1pCD;EAAU,eAAA;CF8pCT;;AE3pCD;EACE,yFAAA;EAAA,oFAAA;EAAA,uFAAA;EACA,UAAA;EACA,QAAA;EACA,mBAAA;EACA,SAAA;EACA,OAAA;EACA,WAAA;CF8pCD;;AE1pCD;EAAoB,0BAAA;CF8pCnB;;AE7pCD;EAA6B,qCAAA;CFiqC5B;;AE9pCD;;EAGI,aAAA;EACA,eAAA;CFgqCH;;AE9pCC;EAAU,YAAA;CFkqCX;;AE9pCD;EAAe,gBAAA;CFkqCd;;AEjqCD;EAAe,gBAAA;CFqqCd;;AEpqCD;EAAe,gBAAA;CFwqCd;;AEvqCD;EAAe,gBAAA;CF2qCd;;AE1qCD;EAAe,gBAAA;CF8qCd;;AE7qCD;EAAe,gBAAA;CFirCd;;AEhrCD;EAAe,gBAAA;CForCd;;AEnrCD;EAAiB,gBAAA;CFurChB;;AEtrCD;EAAkB,gBAAA;CF0rCjB;;AEzrCD;EAAkB,2BAAA;CF6rCjB;;AE5rCD;EAAmB,gBAAA;CFgsClB;;AE/rCD;EAAoB,gBAAA;CFmsCnB;;AElsCD;EAAkB,gBAAA;CFssCjB;;AErsCD;EAAkB,gBAAA;CFysCjB;;AExsCD;EAAoB,gBAAA;CF4sCnB;;AE3sCD;EAAqB,gBAAA;CF+sCpB;;AE7sCD;EACE;IAAoB,gBAAA;GFitCnB;;EEhtCD;IAAsB,gBAAA;GFotCrB;CACF;;AEltCD;EACE;IAAoB,gBAAA;GFstCnB;;EErtCD;IAAkB,gBAAA;GFytCjB;;EExtCD;IAAuB,gBAAA;GF4tCtB;;EE3tCD;IAAqB,gBAAA;GF+tCpB;;EE9tCD;IAAkB,gBAAA;GFkuCjB;;EEjuCD;IAAqB,gBAAA;GFquCpB;;EEpuCD;IAAkB,gBAAA;GFwuCjB;;EEvuCD;IAAsB,gBAAA;GF2uCrB;;EE1uCD;IAAwB,gBAAA;GF8uCvB;CACF;;AE3uCD;EAAmB,iBAAA;CF+uClB;;AE9uCD;EAAqB,iBAAA;CFkvCpB;;AEjvCD;EAAqB,iBAAA;CFqvCpB;;AEpvCD;EAAuB,iBAAA;CFwvCtB;;AEvvCD;EAAmB,4BAAA;CF2vClB;;AEzvCD;EAAkB,0BAAA;CF6vCjB;;AE5vCD;EAAoB,mBAAA;CFgwCnB;;AE7vCD;EACE,4BAAA;EACA,mCAAA;EACA,+BAAA;CFgwCD;;AE5vCD;EAAgB,kBAAA;EAAoB,mBAAA;CFiwCnC;;AEhwCD;EAAgB,iBAAA;CFowCf;;AEnwCD;EAAmB,oBAAA;CFuwClB;;AEtwCD;EAAmB,oBAAA;CF0wClB;;AEzwCD;EAAmB,oBAAA;CF6wClB;;AE1wCD;EAAa,sBAAA;CF8wCZ;;AE7wCD;EAAc,yBAAA;CFixCb;;AEhxCD;EAAoB,oBAAA;CFoxCnB;;AEnxCD;EAAqB,qBAAA;CFuxCpB;;AEtxCD;EAAoB,qBAAA;CF0xCnB;;AExxCD;EAAiB,iBAAA;CF4xChB;;AE3xCD;EAAiB,kBAAA;CF+xChB;;AE9xCD;EAAiB,kBAAA;CFkyChB;;AEjyCD;EAAiB,kBAAA;CFqyChB;;AEpyCD;EAAiB,kBAAA;CFwyChB;;AEtyCD;EAAoB,qBAAA;CF0yCnB;;AExyCD;EAAmB,oBAAA;CF4yClB;;AE3yCD;EAAkB,mBAAA;CF+yCjB;;AE7yCD;EACE,2CAAA;EACA,mBAAA;EACA,iBAAA;EACA,wBAAA;CFgzCD;;AE5yCD;EAAgB,eAAA;CFgzCf;;AE7yCD;EAAmB,iBAAA;CFizClB;;AE9yCD;EAAgB,aAAA;CFkzCf;;AEjzCD;EAAe,YAAA;CFqzCd;;AElzCD;EAAU,qBAAA;EAAA,qBAAA;EAAA,cAAA;CFszCT;;AErzCD;EAAgB,0BAAA;MAAA,uBAAA;UAAA,oBAAA;EAAsB,qBAAA;EAAA,qBAAA;EAAA,cAAA;CF0zCrC;;AEzzCD;EAAW,oBAAA;MAAA,mBAAA;UAAA,eAAA;CF6zCV;;AE5zCD;EAAW,oBAAA;MAAA,mBAAA;UAAA,eAAA;CFg0CV;;AE/zCD;EAAa,oBAAA;MAAA,gBAAA;CFm0CZ;;AEj0CD;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;CFo0CD;;AEj0CD;EACE,0BAAA;MAAA,uBAAA;UAAA,oBAAA;EACA,sBAAA;MAAA,mBAAA;UAAA,0BAAA;CFo0CD;;AEh0CD;EACE,8BAAA;EACA,4BAAA;EACA,uBAAA;CFm0CD;;AE/zCD;EACE,kBAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;CFk0CD;;AEh0CD;EAAkB,kBAAA;CFo0CjB;;AEn0CD;EAAgB,iBAAA;CFu0Cf;;AEt0CD;EAAkB,kBAAA;CF00CjB;;AEz0CD;EAAkB,YAAA;CF60CjB;;AE10CD;EAAmB,sCAAA;CF80ClB;;AE70CD;EAAU,mBAAA;CFi1CT;;AEh1CD;EAAkB,mBAAA;CFo1CjB;;AEh1CD;EACE,iBAAA;EACA,sCAAA;EACA,mBAAA;EACA,0CAAA;EACA,oBAAA;EACA,wBAAA;CFm1CD;;AEj1CC;EACE,kCAAA;EACA,mBAAA;EACA,iBAAA;EACA,wBAAA;EACA,kBAAA;CFo1CH;;AEh1CD;EACE,+CAAA;CFm1CD;;AE/0CD;EAAS,yBAAA;CFm1CR;;AEj1CD;EAAwB;IAAmB,yBAAA;GFs1CxC;CACF;;AEt1CD;EAAwB;IAAmB,yBAAA;GF21CxC;CACF;;AEz1CD;EAAsB;IAAkB,yBAAA;GF81CrC;CACF;;AE91CD;EAAsB;IAAkB,yBAAA;GFm2CrC;CACF;;AM1jDD;EACE,eAAA;EACA,mBAAA;EACA,oBAAA;EACA,YAAA;CN6jDD;;AMxjDC;EATF;IASwB,kBAAA;GN6jDrB;CACF;;AM1jDD;EACE;IACE,+BAAA;QAAA,uBAAA;YAAA,mBAAA;IACA,yCAAA;IACA,6BAAA;QAAA,kBAAA;YAAA,SAAA;GN6jDD;;EM1jDD;IACE,+BAAA;QAAA,+BAAA;YAAA,2BAAA;IACA,6BAAA;QAAA,kBAAA;YAAA,SAAA;GN6jDD;CACF;;AMzjDD;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,oBAAA;MAAA,mBAAA;UAAA,eAAA;EACA,wBAAA;MAAA,oBAAA;EAEA,mBAAA;EACA,oBAAA;CN2jDD;;AMjkDD;EASI,oBAAA;MAAA,mBAAA;UAAA,eAAA;EACA,mBAAA;EACA,oBAAA;CN4jDH;;AMvkDD;EAiBQ,kCAAA;MAAA,qBAAA;EACA,oBAAA;CN0jDP;;AM5kDD;EAiBQ,mCAAA;MAAA,sBAAA;EACA,qBAAA;CN+jDP;;AMzkDC;EASM,6BAAA;MAAA,gBAAA;EACA,eAAA;CNokDP;;AM9kDC;EASM,mCAAA;MAAA,sBAAA;EACA,qBAAA;CNykDP;;AMnlDC;EASM,mCAAA;MAAA,sBAAA;EACA,qBAAA;CN8kDP;;AMxlDC;EASM,6BAAA;MAAA,gBAAA;EACA,eAAA;CNmlDP;;AMrmDD;EAiBQ,mCAAA;MAAA,sBAAA;EACA,qBAAA;CNwlDP;;AM1mDD;EAiBQ,mCAAA;MAAA,sBAAA;EACA,qBAAA;CN6lDP;;AMvmDC;EASM,6BAAA;MAAA,gBAAA;EACA,eAAA;CNkmDP;;AM5mDC;EASM,mCAAA;MAAA,sBAAA;EACA,qBAAA;CNumDP;;AMznDD;EAiBQ,mCAAA;MAAA,sBAAA;EACA,qBAAA;CN4mDP;;AM9nDD;EAiBQ,8BAAA;MAAA,iBAAA;EACA,gBAAA;CNinDP;;AM5mDG;EAfF;IAoBQ,kCAAA;QAAA,qBAAA;IACA,oBAAA;GN4mDP;;EMjoDD;IAoBQ,mCAAA;QAAA,sBAAA;IACA,qBAAA;GNinDP;;EM9oDH;IA4BU,6BAAA;QAAA,gBAAA;IACA,eAAA;GNsnDP;;EMnpDH;IA4BU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GN2nDP;;EMhpDD;IAoBQ,mCAAA;QAAA,sBAAA;IACA,qBAAA;GNgoDP;;EMrpDD;IAoBQ,6BAAA;QAAA,gBAAA;IACA,eAAA;GNqoDP;;EMlqDH;IA4BU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GN0oDP;;EMvqDH;IA4BU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GN+oDP;;EM5qDH;IA4BU,6BAAA;QAAA,gBAAA;IACA,eAAA;GNopDP;;EMjrDH;IA4BU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GNypDP;;EMtrDH;IA4BU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GN8pDP;;EMnrDD;IAoBQ,8BAAA;QAAA,iBAAA;IACA,gBAAA;GNmqDP;CACF;;AM9pDG;EA3BF;IAgCQ,kCAAA;QAAA,qBAAA;IACA,oBAAA;GN8pDP;;EMvsDH;IAwCU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GNmqDP;;EM5sDH;IAwCU,6BAAA;QAAA,gBAAA;IACA,eAAA;GNwqDP;;EMzsDD;IAgCQ,mCAAA;QAAA,sBAAA;IACA,qBAAA;GN6qDP;;EM9sDD;IAgCQ,mCAAA;QAAA,sBAAA;IACA,qBAAA;GNkrDP;;EM3tDH;IAwCU,6BAAA;QAAA,gBAAA;IACA,eAAA;GNurDP;;EMhuDH;IAwCU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GN4rDP;;EM7tDD;IAgCQ,mCAAA;QAAA,sBAAA;IACA,qBAAA;GNisDP;;EMluDD;IAgCQ,6BAAA;QAAA,gBAAA;IACA,eAAA;GNssDP;;EM/uDH;IAwCU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GN2sDP;;EMpvDH;IAwCU,mCAAA;QAAA,sBAAA;IACA,qBAAA;GNgtDP;;EMzvDH;IAwCU,8BAAA;QAAA,iBAAA;IACA,gBAAA;GNqtDP;CACF;;AOvxDD;EACE,oBAAA;EACA,eAAA;EACA,YAAA;CP0xDD;;AOxxDC;EACE,YAAA;CP2xDH;;AOxxDC;EACE,aAAA;CP2xDH;;AOxxDC;EACE,aAAA;CP2xDH;;AO1xDG;EAAK,iBAAA;CP8xDR;;AO3xDC;;;EAEqB,aAAA;CP+xDtB;;AO3xDC;EACE,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,iBAAA;CP8xDH;;AOxxDD;EACE,mBAAA;CP2xDD;;AOrxDD;EACE,kBAAA;EACA,eAAA;EACA,mBAAA;CPwxDD;;AOtxDC;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;CPyxDH;;AO/xDD;EAUI,YAAA;CPyxDH;;AOvxDG;EACE,iBAAA;EACA,mBAAA;EACA,0BAAA;CP0xDL;;AOtxDC;EACE,+BAAA;EACA,aAAA;CPyxDH;;AOnxDD;EACE,0BAAA;EACA,4BAAA;CPsxDD;;AOjxDD;EACE,aAAA;EACA,mBAAA;EACA,0CAAA;EAAA,kCAAA;EAAA,gCAAA;EAAA,0BAAA;EAAA,mEAAA;EACA,YAAA;CPoxDD;;AOxxDD;EAOI,0BAAA;EACA,eAAA;EACA,YAAA;EACA,WAAA;EACA,iBAAA;EACA,mBAAA;EACA,SAAA;EACA,wBAAA;EAAA,mBAAA;EAAA,gBAAA;EACA,YAAA;CPqxDH;;AO9xDC;EAWkB,sCAAA;OAAA,iCAAA;UAAA,8BAAA;CPuxDnB;;AOxyDD;EAkBmB,qCAAA;OAAA,gCAAA;UAAA,6BAAA;CP0xDlB;;AOrxDD;EAAgC,aAAA;CPyxD/B;;AOnxDD;EAEI;IACE,UAAA;IACA,aAAA;GPqxDH;;EOnxDC;IACE,aAAA;IACA,gBAAA;GPsxDH;;EOlxDD;IAEa,cAAA;GPoxDZ;;EOrxDC;IAEW,aAAA;GPuxDZ;;EOpxDM;IAAI,oBAAA;QAAA,mBAAA;YAAA,eAAA;GPwxDV;CACF;;AOhxDD;EAEE;IACE,gBAAA;GPkxDD;;EOhxDC;IACE,wBAAA;GPmxDH;;EO9wDD;IACE,iBAAA;GPixDD;;EO/wDC;IAAU,iCAAA;SAAA,4BAAA;YAAA,yBAAA;GPmxDX;;EOjxDC;IACE,UAAA;IACA,iCAAA;SAAA,4BAAA;YAAA,yBAAA;GPoxDH;;EO3xDD;IASuB,iDAAA;SAAA,4CAAA;YAAA,yCAAA;GPsxDtB;;EO/xDD;IAUwB,6BAAA;SAAA,wBAAA;YAAA,qBAAA;GPyxDvB;;EOnyDD;IAWqB,kDAAA;SAAA,6CAAA;YAAA,0CAAA;GP4xDpB;;EOzxDS;IAAwB,cAAA;GP6xDjC;;EO3yDD;;IAemB,oCAAA;SAAA,+BAAA;YAAA,4BAAA;GPiyDlB;CACF;;ACh8DD;EACE,oBAAA;CDm8DD;;ACp8DD;EAII,YAAA;EACA,UAAA;EACA,8BAAA;EAAA,yBAAA;EAAA,sBAAA;EACA,WAAA;CDo8DH;;AC38DD;EASa,2BAAA;CDs8DZ;;AC58DC;EASI,4BAAA;EACA,6BAAA;CDu8DL;;ACj9DC;EAaW,aAAA;CDw8DZ;;ACx9DD;EAmBM,oBAAA;MAAA,qBAAA;UAAA,aAAA;EACA,WAAA;CDy8DL;;ACv8DK;;EACgB,cAAA;CD28DrB;;ACl+DD;EA4BQ,gCAAA;CD08DP;;ACt+DD;;EA6BwB,gCAAA;CD88DvB;;ACr8DD;EACE;IACE,WAAA;GDw8DD;;ECt8DC;IAAS,eAAA;IAAiB,mBAAA;GD28D3B;;EC98DD;IAIU,uBAAA;GD88DT;;ECl9DD;IAKgB,cAAA;GDi9Df;;ECh9DC;IAAgB,cAAA;GDo9DjB;;ECn9DC;IAAc,2BAAA;GDu9Df;;ECt9DC;IAAe,gCAAA;IAAA,gCAAA;IAAA,yBAAA;GD09DhB;;ECl+DD;IASiB,UAAA;GD69DhB;CACF;;AF7gEC;EAEE,iBAAA;EACA,mBAAA;CE+gEH;;AFvgEC;EACE,mBAAA;EACA,aAAA;EACA,YAAA;CE0gEH;;AF7gEC;EAKgB,gDAAA;CE4gEjB;;AF9hED;EAuBI,0BAAA;CE2gEH;;AFngEC;EACE,kBAAA;EACA,iBAAA;CEsgEH;;AFjgED;EACgB,qBAAA;EAAA,qBAAA;EAAA,cAAA;EAAgB,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;CEqgE/B;;AFtgED;EAEsB,gBAAA;EAAkB,kBAAA;CEygEvC;;AFxgEC;EACE,oBAAA;EACA,gBAAA;EACA,6BAAA;MAAA,mBAAA;UAAA,UAAA;CE2gEH;;AFxgEC;EACE,UAAA;EACA,SAAA;EACA,yCAAA;OAAA,oCAAA;UAAA,iCAAA;CE2gEH;;AFlgEC;;EACE,2BAAA;EACA,2CAAA;EACA,gBAAA;EACA,wBAAA;EACA,kBAAA;CEsgEH;;AQlkEG;EAAmB,cAAA;CRskEtB;;AQxkED;EAGa,cAAA;CRykEZ;;AQnkED;EACE;IAEI,oBAAA;GRqkEH;;EQvkED;IAKM,cAAA;GRskEL;;EQ3kED;;;;;;IAUM,mCAAA;QAAA,sBAAA;IACA,qBAAA;GR0kEL;;EQzkEK;;;;;;IAAe,cAAA;GRklEpB;;EQ7lEC;;IAeI,8BAAA;QAAA,iBAAA;IACA,gBAAA;GRmlEL;;EQpmED;IAqBM,qBAAA;IAAA,qBAAA;IAAA,cAAA;GRmlEL;;EQllEK;IACE,cAAA;IACA,mBAAA;IACA,4BAAA;GRqlEP;;EQnlEK;IAAc,2BAAA;GRulEnB;;EQlnED;IA6BQ,eAAA;IACA,mBAAA;IACA,4BAAA;GRylEP;;EQxnED;IAoC0B,eAAA;GRwlEzB;;EQ5nED;IAsCiB,cAAA;GR0lEhB;;EQhoED;IAwCU,UAAA;IACA,QAAA;IACA,kBAAA;IACA,iBAAA;IACA,mBAAA;IACA,WAAA;GR4lET;;EQzoED;IA+CiB,2BAAA;GR8lEhB;;EQ7oED;IAgDoB,gBAAA;IAAkB,iBAAA;GRkmErC;;EQ9lEO;IAAa,YAAA;GRkmEpB;;EQtpED;IAsDU,gCAAA;GRomET;;EQ1pED;;IAuD0B,gCAAA;GRwmEzB;CACF;;AS5qEC;EACE,kBAAA;CT+qEH;;AS5qEC;EACE,6CAAA;CT+qEH;;ASvqEC;EACE,wFAAA;EAAA,mFAAA;EAAA,sFAAA;EACA,8BAAA;EACA,4BAAA;EACA,0BAAA;EACA,sBAAA;CT0qEH;;ASxqEC;EACE,eAAA;EACA,kBAAA;EACA,mBAAA;CT2qEH;;AStrED;;;;;;EAeI,iBAAA;EACA,iBAAA;EACA,mBAAA;CTgrEH;;ASjsED;EAqBI,gBAAA;EACA,uBAAA;EACA,kBAAA;EACA,iBAAA;CTgrEH;;ASxsED;EA4BI,gBAAA;EACA,uBAAA;EACA,kBAAA;EACA,iBAAA;CTgrEH;;AS/sED;EAmCI,gBAAA;EACA,wBAAA;EACA,kBAAA;EACA,iBAAA;CTgrEH;;ASttED;EA0CI,kCAAA;EACA,gBAAA;EACA,iBAAA;EACA,wBAAA;EACA,kBAAA;EACA,iBAAA;CTgrEH;;AS/tED;;EAoDI,gBAAA;EACA,iBAAA;EACA,iBAAA;EACA,mBAAA;CTgrEH;;AS/qEG;;EAAI,kBAAA;CTorEP;;ASjrEC;EAAI,oBAAA;CTqrEL;;ASnrEC;;EAEE,eAAA;EACA,kBAAA;EACA,mBAAA;EACA,4BAAA;CTsrEH;;AS9qED;EAEI,gCAAA;EACA,aAAA;EACA,mBAAA;EACA,0BAAA;EACA,mBAAA;EACA,kBAAA;CTgrEH;;AStrEC;EAQI,+BAAA;EACA,0BAAA;CTkrEL;;AS1qED;EACE,iBAAA;CT6qED;;AS9qED;EAEoB,iBAAA;CTgrEnB;;ASlrED;EAIgB,WAAA;EAAa,mBAAA;CTmrE5B;;ASvrED;EAMI,UAAA;EACA,8BAAA;EACA,aAAA;EACA,0BAAA;EACA,aAAA;EACA,YAAA;CTqrEH;;AShsED;EAaM,WAAA;CTurEL;;ASprEC;EACE,0BAAA;EACA,6BAAA;EACA,UAAA;EACA,YAAA;EACA,gBAAA;EACA,WAAA;EACA,WAAA;CTurEH;;AS9rEC;EAWI,0BAAA;EACA,6BAAA;EACA,kBAAA;EACA,WAAA;CTurEL;;ASrsEC;EAiBW,YAAA;CTwrEZ;;ASzsEC;EAkBY,WAAA;CT2rEb;;ASprED;EAEI,+CAAA;EACA,2BAAA;EACA,cAAA;CTsrEH;;AS1rED;EAQI,0BAAA;EACA,wCAAA;EACA,iCAAA;EACA,gCAAA;EACA,4BAAA;EACA,6BAAA;EACA,mCAAA;CTsrEH;;ASpsED;EAkBI,cAAA;CTsrEH;;AS/qED;EACE,aAAA;EACA,OAAA;EACA,YAAA;CTkrED;;AShrEC;EACE,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;CTmrEH;;AS7qED;EACE,uBAAA;EACA,UAAA;EACA,wCAAA;EACA,aAAA;EACA,QAAA;EACA,gBAAA;EACA,SAAA;EACA,oCAAA;OAAA,+BAAA;UAAA,4BAAA;EACA,0CAAA;EAAA,kCAAA;EAAA,gCAAA;EAAA,0BAAA;EAAA,mEAAA;EACA,mBAAA;EACA,aAAA;CTgrED;;AS9qEC;EACE,iCAAA;OAAA,4BAAA;UAAA,yBAAA;EACA,6BAAA;OAAA,wBAAA;UAAA,qBAAA;EACA,oBAAA;CTirEH;;AS9qEC;EAAQ,kBAAA;CTkrET;;AShrEC;EACE,gCAAA;EACA,aAAA;EACA,eAAA;EACA,WAAA;CTmrEH;;AS/qED;EACE,iBAAA;CTkrED;;AU/4ED;EACE,uBAAA;EACA,0BAAA;EACA,kBAAA;CVk5ED;;AUr5ED;EAMI,0BAAA;CVm5EH;;AUp5EC;EAGI,0BAAA;CVq5EL;;AUj5EC;EACE,WAAA;CVo5EH;;AUj5EC;EACE,aAAA;EACA,mBAAA;EACA,YAAA;CVo5EH;;AUh5EG;EACE,sBAAA;EACA,gBAAA;EACA,mBAAA;EACA,sBAAA;EACA,YAAA;EACA,sBAAA;CVm5EL;;AU/4EC;EAAS,0BAAA;CVm5EV;;AUj5EC;EACE,iBAAA;CVo5EH;;AUh5EC;EACE,qDAAA;EACA,gBAAA;EACA,sBAAA;EACA,aAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;CVm5EH;;AU35EU;EAWL,iCAAA;CVo5EL;;AU54ED;EACE,uBAAA;EACA,0CAAA;CV+4ED;;AUj5ED;EAIuB,sBAAA;CVi5EtB;;AUr5ED;;EAMiB,YAAA;CVo5EhB;;AUj5ED;EACe;IAAM,eAAA;GVq5ElB;CACF;;AW39ED;EACE,wBAAA;EACA,sCAAA;EACA,qBAAA;EACA,uBAAA;EACA,2BAAA;EACA,gBAAA;EACA,sBAAA;EACA,2CAAA;EACA,gBAAA;EACA,mBAAA;EACA,iBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;EACA,mBAAA;EACA,sBAAA;EACA,mCAAA;EACA,0BAAA;KAAA,uBAAA;MAAA,sBAAA;UAAA,kBAAA;EACA,uBAAA;EACA,oBAAA;CX89ED;;AW59EC;EACE,iBAAA;EACA,gBAAA;EACA,iBAAA;EACA,2BAAA;EACA,aAAA;EACA,qBAAA;EACA,WAAA;EACA,iBAAA;EACA,yBAAA;EACA,oBAAA;CX+9EH;;AW59EC;EACE,gBAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;CX+9EH;;AW59EC;EACE,iCAAA;EACA,0BAAA;CX+9EH;;AW79EG;EACE,iCAAA;EACA,0BAAA;CXg+EL;;AWv9EC;;EAEE,aAAA;EACA,kBAAA;CX09EH;;AW/9ED;EASI,gBAAA;EACA,mBAAA;CX09EH;;AWp+ED;EAcI,eAAA;EACA,kBAAA;CX09EH;;AWv9EG;EACA,iBAAA;CX09EH;;AWn9ED;;EAEE,WAAA;CXs9ED;;AY1iFC;EACE,+CAAA;EACA,iBAAA;EACA,oBAAA;EACA,oBAAA;CZ6iFH;;AYziFC;EACE,+BAAA;EACA,UAAA;EACA,0BAAA;EACA,kCAAA;EACA,QAAA;EACA,wBAAA;EACA,OAAA;CZ4iFH;;AYviFmB;EAAkB,sBAAA;CZ2iFrC;;AY5iFD;EAEwC,sBAAA;CZ8iFvC;;AY5iFC;EACE,iBAAA;CZ+iFH;;AY5iFC;EACE,uBAAA;EACA,iBAAA;EACA,6BAAA;CZ+iFH;;AYljFC;EAI6B,0BAAA;CZkjF9B;;AahlFD;EACE,0BAAA;EACA,0BAAA;EACA,cAAA;EACA,mBAAA;EACA,2BAAA;EACA,oCAAA;OAAA,+BAAA;UAAA,4BAAA;EACA,wBAAA;EAAA,mBAAA;EAAA,gBAAA;EACA,uBAAA;EACA,YAAA;CbmlFD;;AajlFQ;EAAI,mBAAA;CbqlFZ;;AanlFC;EACE,iBAAA;EACA,eAAA;EACA,gBAAA;EACA,UAAA;CbslFH;;AanlFC;EACE,8BAAA;EACA,mBAAA;EACA,oBAAA;CbslFH;;AanlFC;EACE,2BAAA;EACA,eAAA;CbslFH;;AaplFG;EACE,YAAA;EACA,sBAAA;EACA,aAAA;EACA,kBAAA;EACA,oBAAA;EACA,gBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;CbulFL;;AchoFD;EACE,sBAAA;EACA,mCAAA;EACA,4MAAA;EAIA,oBAAA;EACA,mBAAA;CdgoFD;;AcxnFD;EACE,iBAAA;Cd2nFD;;AcznFD;EACE,iBAAA;Cd4nFD;;Ac1nFD;EACE,iBAAA;Cd6nFD;;Ac3nFD;EACE,iBAAA;Cd8nFD;;Ac5nFD;EACE,iBAAA;Cd+nFD;;Ac7nFD;EACE,iBAAA;CdgoFD;;Ac9nFD;EACE,iBAAA;CdioFD;;Ac/nFD;EACE,iBAAA;CdkoFD;;AchoFD;EACE,iBAAA;CdmoFD;;AcjoFD;EACE,iBAAA;CdooFD;;AcloFD;EACE,iBAAA;CdqoFD;;AcnoFD;EACE,iBAAA;CdsoFD;;AcpoFD;EACE,iBAAA;CduoFD;;AcroFD;EACE,iBAAA;CdwoFD;;ActoFD;EACE,iBAAA;CdyoFD;;AcvoFD;EACE,iBAAA;Cd0oFD;;AcxoFD;EACE,iBAAA;Cd2oFD;;AczoFD;EACE,iBAAA;Cd4oFD;;Ac1oFD;EACE,iBAAA;Cd6oFD;;Ac3oFD;EACE,iBAAA;Cd8oFD;;Ac5oFD;EACE,iBAAA;Cd+oFD;;Ac7oFD;EACE,iBAAA;CdgpFD;;Ac9oFD;EACE,iBAAA;CdipFD;;Ac/oFD;EACE,iBAAA;CdkpFD;;AchpFD;EACE,iBAAA;CdmpFD;;AcjpFD;EACE,iBAAA;CdopFD;;AclpFD;EACE,iBAAA;CdqpFD;;AcnpFD;EACE,iBAAA;CdspFD;;AcppFD;EACE,iBAAA;CdupFD;;AcrpFD;EACE,iBAAA;CdwpFD;;ActpFD;EACE,iBAAA;CdypFD;;AenwFD;EACE,+BAAA;OAAA,0BAAA;UAAA,uBAAA;EACA,kCAAA;OAAA,6BAAA;UAAA,0BAAA;CfswFD;;AexwFD;EAKI,4CAAA;OAAA,uCAAA;UAAA,oCAAA;CfuwFH;;AelwFD;EAAY,iCAAA;OAAA,4BAAA;UAAA,yBAAA;CfswFX;;AerwFD;EAAgB,qCAAA;OAAA,gCAAA;UAAA,6BAAA;CfywFf;;AexwFD;EAAS,8BAAA;OAAA,yBAAA;UAAA,sBAAA;Cf4wFR;;AexwFD;EACE;IAKO,uEAAA;YAAA,+DAAA;GfuwFN;;EetwFD;IAAI,WAAA;IAAa,0CAAA;YAAA,kCAAA;Gf2wFhB;;Ee1wFD;IAAM,0CAAA;YAAA,kCAAA;Gf8wFL;;Ee7wFD;IAAM,0CAAA;YAAA,kCAAA;GfixFL;;EehxFD;IAAM,WAAA;IAAa,6CAAA;YAAA,qCAAA;GfqxFlB;;EepxFD;IAAM,6CAAA;YAAA,qCAAA;GfwxFL;;EevxFD;IAAO,WAAA;IAAa,oCAAA;YAAA,4BAAA;Gf4xFnB;CACF;;AezyFD;EACE;IAKO,kEAAA;OAAA,+DAAA;GfuwFN;;EetwFD;IAAI,WAAA;IAAa,kCAAA;Gf2wFhB;;Ee1wFD;IAAM,kCAAA;Gf8wFL;;Ee7wFD;IAAM,kCAAA;GfixFL;;EehxFD;IAAM,WAAA;IAAa,qCAAA;GfqxFlB;;EepxFD;IAAM,qCAAA;GfwxFL;;EevxFD;IAAO,WAAA;IAAa,4BAAA;Gf4xFnB;CACF;;AezyFD;EACE;IAKO,uEAAA;SAAA,kEAAA;YAAA,+DAAA;GfuwFN;;EetwFD;IAAI,WAAA;IAAa,0CAAA;YAAA,kCAAA;Gf2wFhB;;Ee1wFD;IAAM,0CAAA;YAAA,kCAAA;Gf8wFL;;Ee7wFD;IAAM,0CAAA;YAAA,kCAAA;GfixFL;;EehxFD;IAAM,WAAA;IAAa,6CAAA;YAAA,qCAAA;GfqxFlB;;EepxFD;IAAM,6CAAA;YAAA,qCAAA;GfwxFL;;EevxFD;IAAO,WAAA;IAAa,oCAAA;YAAA,4BAAA;Gf4xFnB;CACF;;AexxFD;EACE;IAIO,kEAAA;YAAA,0DAAA;GfwxFN;;EevxFD;IAAK,WAAA;IAAa,8CAAA;YAAA,sCAAA;Gf4xFjB;;Ee3xFD;IAAM,WAAA;IAAa,2CAAA;YAAA,mCAAA;GfgyFlB;;Ee/xFD;IAAK,4CAAA;YAAA,oCAAA;GfmyFJ;;EelyFD;IAAK,0CAAA;YAAA,kCAAA;GfsyFJ;;EeryFD;IAAM,wBAAA;YAAA,gBAAA;GfyyFL;CACF;;AepzFD;EACE;IAIO,6DAAA;OAAA,0DAAA;GfwxFN;;EevxFD;IAAK,WAAA;IAAa,sCAAA;Gf4xFjB;;Ee3xFD;IAAM,WAAA;IAAa,mCAAA;GfgyFlB;;Ee/xFD;IAAK,oCAAA;GfmyFJ;;EelyFD;IAAK,kCAAA;GfsyFJ;;EeryFD;IAAM,mBAAA;OAAA,gBAAA;GfyyFL;CACF;;AepzFD;EACE;IAIO,kEAAA;SAAA,6DAAA;YAAA,0DAAA;GfwxFN;;EevxFD;IAAK,WAAA;IAAa,8CAAA;YAAA,sCAAA;Gf4xFjB;;Ee3xFD;IAAM,WAAA;IAAa,2CAAA;YAAA,mCAAA;GfgyFlB;;Ee/xFD;IAAK,4CAAA;YAAA,oCAAA;GfmyFJ;;EelyFD;IAAK,0CAAA;YAAA,kCAAA;GfsyFJ;;EeryFD;IAAM,wBAAA;SAAA,mBAAA;YAAA,gBAAA;GfyyFL;CACF;;AevyFD;EACE;IAAO,oCAAA;YAAA,4BAAA;Gf2yFN;;Ee1yFD;IAAK,0CAAA;YAAA,kCAAA;Gf8yFJ;;Ee7yFD;IAAI,oCAAA;YAAA,4BAAA;GfizFH;CACF;;AerzFD;EACE;IAAO,4BAAA;Gf2yFN;;Ee1yFD;IAAK,kCAAA;Gf8yFJ;;Ee7yFD;IAAI,4BAAA;GfizFH;CACF;;AerzFD;EACE;IAAO,oCAAA;YAAA,4BAAA;Gf2yFN;;Ee1yFD;IAAK,0CAAA;YAAA,kCAAA;Gf8yFJ;;Ee7yFD;IAAI,oCAAA;YAAA,4BAAA;GfizFH;CACF;;Ae9yFD;EACE;IAAI,WAAA;GfkzFH;;EejzFD;IAAK,WAAA;IAAa,iCAAA;YAAA,yBAAA;GfszFjB;;EerzFD;IAAM,WAAA;IAAa,oCAAA;YAAA,4BAAA;Gf0zFlB;CACF;;Ae9zFD;EACE;IAAI,WAAA;GfkzFH;;EejzFD;IAAK,WAAA;IAAa,4BAAA;OAAA,yBAAA;GfszFjB;;EerzFD;IAAM,WAAA;IAAa,+BAAA;OAAA,4BAAA;Gf0zFlB;CACF;;Ae9zFD;EACE;IAAI,WAAA;GfkzFH;;EejzFD;IAAK,WAAA;IAAa,iCAAA;SAAA,4BAAA;YAAA,yBAAA;GfszFjB;;EerzFD;IAAM,WAAA;IAAa,oCAAA;SAAA,+BAAA;YAAA,4BAAA;Gf0zFlB;CACF;;AevzFD;EACE;IAAM,gCAAA;YAAA,wBAAA;Gf2zFL;;Ee1zFD;IAAI,kCAAA;YAAA,0BAAA;Gf8zFH;CACF;;Aej0FD;EACE;IAAM,2BAAA;OAAA,wBAAA;Gf2zFL;;Ee1zFD;IAAI,6BAAA;OAAA,0BAAA;Gf8zFH;CACF;;Aej0FD;EACE;IAAM,gCAAA;SAAA,2BAAA;YAAA,wBAAA;Gf2zFL;;Ee1zFD;IAAI,kCAAA;SAAA,6BAAA;YAAA,0BAAA;Gf8zFH;CACF;;Ae5zFD;EACE;IAAI,WAAA;IAAa,wCAAA;YAAA,gCAAA;Gfi0FhB;;Eeh0FD;IAAM,WAAA;IAAa,sCAAA;YAAA,8BAAA;Gfq0FlB;CACF;;Aex0FD;EACE;IAAI,WAAA;IAAa,mCAAA;OAAA,gCAAA;Gfi0FhB;;Eeh0FD;IAAM,WAAA;IAAa,iCAAA;OAAA,8BAAA;Gfq0FlB;CACF;;Aex0FD;EACE;IAAI,WAAA;IAAa,wCAAA;SAAA,mCAAA;YAAA,gCAAA;Gfi0FhB;;Eeh0FD;IAAM,WAAA;IAAa,sCAAA;SAAA,iCAAA;YAAA,8BAAA;Gfq0FlB;CACF","file":"main.scss","sourcesContent":["@charset \"UTF-8\";\n\n// Mixins & Variables\n@import \"common/variables\";\n@import \"common/mixins\";\n\n// Import npm dependencies\n@import \"~normalize.css/normalize\";\n\n// common\n@import \"common/global\";\n@import \"common/typography\";\n@import \"common/typography\";\n@import \"common/utilities\";\n\n// components\n@import \"components/grid\";\n@import \"components/header\";\n@import \"components/featured\";\n@import \"components/entry\";\n@import \"components/homepage\";\n@import \"components/post\";\n@import \"components/author\";\n@import \"components/form\";\n@import \"components/sidebar\";\n@import \"components/sidenav\";\n@import \"components/icons\";\n@import \"components/animated\";\n","// entry by line\n.entry {\n\n  &-author {\n    // display: table-cell;\n    line-height: 1.4;\n    padding-left: 10px;\n    // vertical-align: middle;\n\n    a { @extend %link, %link--accent;}\n  }\n\n  // author avatar\n  // &-avatar { display: table-cell; }\n  &-avatar--img {\n    border-radius: 50%;\n    height: 40px;\n    width: 40px;\n\n    &.no-avatar { background-image: url('../../images/avatar.png')}\n  }\n\n  // not has image\n  &.not--image {\n    color: rgba(0, 0, 0, .8);\n  }\n\n}\r\n\n\n// entry Global\n.entry.u-card {\n  .entry-image--link {\n    max-height: 240px;\n    max-width: 360px;\n  }\n}\n\n// if post is featured\n.entry.entry--featured {\n  .entry-body { display: flex; flex-direction: column;}\n  .entry-image--link {max-width: 100%; max-height: 185px;}\n  .entry-image {\n    margin-bottom: 20px;\n    margin-top: 5px;\n    order: -1;\n  }\n\n  .entry-img {\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%,-50%);\n  }\n\n}\n\n\n// even entry\n.entry.entry--featured,\n.entry.even:not(.entry--featured) {\n  .entry-excerpt {\n    color: rgba(0, 0, 0, .44);\n    font-family: $primary-font;\n    font-size: 23px;\n    letter-spacing: -.022em;\n    line-height: 1.22;\n  }\n}\n","%link {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n%link--accent {\n  color: $primary-color;\n  &:hover {color: $primary-color-dark;}\n}\n\n%content-absolute-bottom {\n  bottom: 0;\n  left: 0;\n  margin: 30px;\n  max-width: 600px;\n  position: absolute;\n  z-index: 2;\n}\n\n%u-absolute0 {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n%u-text-color-darker {\n  color: rgba(0, 0, 0, .8) !important;\n  fill: rgba(0, 0, 0, .8) !important;\n}\n\n%fonts-icons {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n","@charset \"UTF-8\";\n\n.entry-author a {\n  color: inherit;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.entry-author a {\n  color: #00A034;\n}\n\n.entry-author a:hover {\n  color: #1976d2;\n}\n\n.featured .entry-body {\n  bottom: 0;\n  left: 0;\n  margin: 30px;\n  max-width: 600px;\n  position: absolute;\n  z-index: 2;\n}\n\n.u-absolute0,\n.post-newsletter .form--btn::before {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.tag.not--image,\n.u-textColorDarker {\n  color: rgba(0, 0, 0, 0.8) !important;\n  fill: rgba(0, 0, 0, 0.8) !important;\n}\n\nhr::before,\n.warning::before,\n.note::before,\n.success::before,\n[class^=\"i-\"]::before,\n[class*=\" i-\"]::before {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'simply' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\n/* Document\n   ========================================================================== */\n\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nblockquote {\n  border-left: 3px solid rgba(0, 0, 0, 0.8);\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: rgba(0, 0, 0, 0.8);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  text-rendering: optimizeLegibility;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: 16px;\n}\n\nfigure {\n  margin: 0;\n}\n\nkbd,\nsamp,\ncode {\n  background: #f7f7f7;\n  border-radius: 4px;\n  color: #c7254e;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: #f7f7f7 !important;\n  border-radius: 4px;\n  font-family: \"Source Code Pro\", monospace !important;\n  font-size: 16px;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n}\n\npre code {\n  background: transparent;\n  color: #37474f;\n  padding: 0;\n  text-shadow: 0 1px #fff;\n}\n\nhr {\n  background: #F1F2F1;\n  background: linear-gradient(to right, #F1F2F1 0, #b5b5b5 50%, #F1F2F1 100%);\n  border: 0;\n  height: 1px;\n  margin: 80px auto;\n  max-width: 90%;\n  position: relative;\n}\n\nhr::before {\n  background: #fff;\n  color: rgba(73, 55, 65, 0.75);\n  content: \"\";\n  display: block;\n  font-size: 35px;\n  left: 50%;\n  padding: 0 25px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n}\n\nimg:not([src]) {\n  visibility: hidden;\n}\n\ni {\n  display: inline-block;\n  vertical-align: middle;\n}\n\nol,\nul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.main,\n.footer {\n  transition: transform .5s ease;\n}\n\n@media only screen and (max-width: 766px) {\n  .main {\n    padding-top: 50px;\n  }\n}\n\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n}\n\n.warning::before {\n  content: \"\";\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n}\n\n.note::before {\n  content: \"\";\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n}\n\n.success::before {\n  color: #00bfa5;\n  content: \"\";\n}\n\n.warning,\n.note,\n.success {\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.2 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n}\n\n.warning a,\n.note a,\n.success a {\n  color: inherit;\n  text-decoration: underline;\n}\n\n.warning::before,\n.note::before,\n.success::before {\n  float: left;\n  font-size: 24px;\n  margin-left: -36px;\n}\n\n.tag {\n  color: #fff;\n  min-height: 250px;\n  z-index: 2;\n}\n\n.tag-wrap {\n  z-index: 2;\n}\n\n.tag.not--image {\n  min-height: auto;\n}\n\n.tag-description {\n  max-width: 500px;\n}\n\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n}\n\n.with-tooltip:after {\n  background: rgba(0, 0, 0, 0.85);\n  border-radius: 4px;\n  color: #FFF;\n  content: attr(data-tooltip);\n  display: inline-block;\n  font-size: 12px;\n  font-weight: 600;\n  left: 50%;\n  line-height: 1.25;\n  min-width: 120px;\n  opacity: 0;\n  padding: 4px 8px;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  top: -30px;\n  will-change: opacity, transform;\n  z-index: 1;\n}\n\n.with-tooltip:hover:after {\n  animation: tooltip .1s ease-out both;\n}\n\n.footer {\n  color: rgba(0, 0, 0, 0.44);\n}\n\n.footer a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.footer a:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n}\n\n.errorPage-link {\n  left: -5px;\n  padding: 24px 60px;\n  top: -6px;\n}\n\n.errorPage-text {\n  margin-top: 60px;\n  white-space: pre-wrap;\n}\n\n.errorPage-wrap {\n  color: rgba(0, 0, 0, 0.4);\n  left: 50%;\n  min-width: 680px;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n}\n\n.video-responsive iframe {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n\n.c-facebook {\n  color: #3b5998 !important;\n}\n\n.bg-facebook,\n.sideNav-follow .i-facebook {\n  background-color: #3b5998 !important;\n}\n\n.c-twitter {\n  color: #55acee !important;\n}\n\n.bg-twitter,\n.sideNav-follow .i-twitter {\n  background-color: #55acee !important;\n}\n\n.c-google {\n  color: #dd4b39 !important;\n}\n\n.bg-google {\n  background-color: #dd4b39 !important;\n}\n\n.c-instagram {\n  color: #306088 !important;\n}\n\n.bg-instagram,\n.sideNav-follow .i-instagram {\n  background-color: #306088 !important;\n}\n\n.c-youtube {\n  color: #e52d27 !important;\n}\n\n.bg-youtube,\n.sideNav-follow .i-youtube {\n  background-color: #e52d27 !important;\n}\n\n.c-github {\n  color: #333 !important;\n}\n\n.bg-github {\n  background-color: #333 !important;\n}\n\n.c-linkedin {\n  color: #007bb6 !important;\n}\n\n.bg-linkedin {\n  background-color: #007bb6 !important;\n}\n\n.c-spotify {\n  color: #2ebd59 !important;\n}\n\n.bg-spotify {\n  background-color: #2ebd59 !important;\n}\n\n.c-codepen {\n  color: #222 !important;\n}\n\n.bg-codepen {\n  background-color: #222 !important;\n}\n\n.c-behance {\n  color: #131418 !important;\n}\n\n.bg-behance {\n  background-color: #131418 !important;\n}\n\n.c-dribbble {\n  color: #ea4c89 !important;\n}\n\n.bg-dribbble {\n  background-color: #ea4c89 !important;\n}\n\n.c-flickr {\n  color: #0063dc !important;\n}\n\n.bg-flickr {\n  background-color: #0063dc !important;\n}\n\n.c-reddit {\n  color: #ff4500 !important;\n}\n\n.bg-reddit {\n  background-color: #ff4500 !important;\n}\n\n.c-pocket {\n  color: #f50057 !important;\n}\n\n.bg-pocket {\n  background-color: #f50057 !important;\n}\n\n.c-pinterest {\n  color: #bd081c !important;\n}\n\n.bg-pinterest {\n  background-color: #bd081c !important;\n}\n\n.c-whatsapp {\n  color: #64d448 !important;\n}\n\n.bg-whatsapp {\n  background-color: #64d448 !important;\n}\n\n.fbSave-dropdown {\n  background-color: #FFF;\n  border: 1px solid #e0e0e0;\n  bottom: 100%;\n  display: none;\n  max-width: 200px;\n  min-width: 100px;\n  padding: 8px;\n  transform: translate(-50%, 0);\n  z-index: 10;\n}\n\n.fbSave-dropdown.is-visible {\n  display: block;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  color: inherit;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n  margin: 0;\n}\n\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a,\n.h1 a,\n.h2 a,\n.h3 a,\n.h4 a,\n.h5 a,\n.h6 a {\n  color: inherit;\n  line-height: inherit;\n}\n\nh1 {\n  font-size: 2.25rem;\n}\n\nh2 {\n  font-size: 1.875rem;\n}\n\nh3 {\n  font-size: 1.5625rem;\n}\n\nh4 {\n  font-size: 1.375rem;\n}\n\nh5 {\n  font-size: 1.125rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\n.h1 {\n  font-size: 2.25rem;\n}\n\n.h2 {\n  font-size: 1.875rem;\n}\n\n.h3 {\n  font-size: 1.5625rem;\n}\n\n.h4 {\n  font-size: 1.375rem;\n}\n\n.h5 {\n  font-size: 1.125rem;\n}\n\n.h6 {\n  font-size: 1rem;\n}\n\np {\n  margin: 0;\n}\n\n.u-textColorNormal {\n  color: rgba(0, 0, 0, 0.44);\n  fill: rgba(0, 0, 0, 0.44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, 0.6);\n  fill: rgba(0, 0, 0, 0.6);\n}\n\n.u-link {\n  color: #00A034 !important;\n}\n\n.u-relative {\n  position: relative;\n}\n\n.u-absolute {\n  position: absolute;\n}\n\n.u-block {\n  display: block;\n}\n\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 29%, rgba(0, 0, 0, 0.6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n.u-backgroundWhite {\n  background-color: #fafafa;\n}\n\n.u-backgroundColorGrayLight {\n  background-color: #f0f0f0 !important;\n}\n\n.u-clear::before,\n.u-clear::after {\n  content: \" \";\n  display: table;\n}\n\n.u-clear::after {\n  clear: both;\n}\n\n.u-fontSize13 {\n  font-size: 13px;\n}\n\n.u-fontSize15 {\n  font-size: 15px;\n}\n\n.u-fontSize20 {\n  font-size: 20px;\n}\n\n.u-fontSize22 {\n  font-size: 22px;\n}\n\n.u-fontSize28 {\n  font-size: 28px;\n}\n\n.u-fontSize36 {\n  font-size: 36px;\n}\n\n.u-fontSize40 {\n  font-size: 40px;\n}\n\n.u-fontSizeBase {\n  font-size: 18px;\n}\n\n.u-fontSizeJumbo {\n  font-size: 50px;\n}\n\n.u-fontSizeLarge {\n  font-size: 24px !important;\n}\n\n.u-fontSizeLarger {\n  font-size: 32px;\n}\n\n.u-fontSizeLargest {\n  font-size: 44px;\n}\n\n.u-fontSizeMicro {\n  font-size: 11px;\n}\n\n.u-fontSizeSmall {\n  font-size: 16px;\n}\n\n.u-fontSizeSmaller {\n  font-size: 14px;\n}\n\n.u-fontSizeSmallest {\n  font-size: 12px;\n}\n\n@media (max-width: 991px) {\n  .u-sm-fontSizeBase {\n    font-size: 18px;\n  }\n\n  .u-sm-fontSizeLarger {\n    font-size: 32px;\n  }\n}\n\n@media (max-width: 767px) {\n  .u-xs-fontSizeBase {\n    font-size: 18px;\n  }\n\n  .u-xs-fontSize13 {\n    font-size: 13px;\n  }\n\n  .u-xs-fontSizeSmaller {\n    font-size: 14px;\n  }\n\n  .u-xs-fontSizeSmall {\n    font-size: 16px;\n  }\n\n  .u-xs-fontSize22 {\n    font-size: 22px;\n  }\n\n  .u-xs-fontSizeLarge {\n    font-size: 24px;\n  }\n\n  .u-xs-fontSize40 {\n    font-size: 40px;\n  }\n\n  .u-xs-fontSizeLarger {\n    font-size: 32px;\n  }\n\n  .u-xs-fontSizeSmallest {\n    font-size: 12px;\n  }\n}\n\n.u-fontWeightThin {\n  font-weight: 300;\n}\n\n.u-fontWeightNormal {\n  font-weight: 400;\n}\n\n.u-fontWeightMedium {\n  font-weight: 500;\n}\n\n.u-fontWeightSemibold {\n  font-weight: 600;\n}\n\n.u-fontWeightBold {\n  font-weight: 700 !important;\n}\n\n.u-textUppercase {\n  text-transform: uppercase;\n}\n\n.u-textAlignCenter {\n  text-align: center;\n}\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n.u-marginAuto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.u-marginTop30 {\n  margin-top: 30px;\n}\n\n.u-marginBottom15 {\n  margin-bottom: 15px;\n}\n\n.u-marginBottom30 {\n  margin-bottom: 30px;\n}\n\n.u-marginBottom40 {\n  margin-bottom: 40px;\n}\n\n.u-padding0 {\n  padding: 0 !important;\n}\n\n.u-padding15 {\n  padding: 15px !important;\n}\n\n.u-paddingBottom2 {\n  padding-bottom: 2px;\n}\n\n.u-paddingBottom30 {\n  padding-bottom: 30px;\n}\n\n.u-paddingBottom20 {\n  padding-bottom: 20px;\n}\n\n.u-paddingTop5 {\n  padding-top: 5px;\n}\n\n.u-paddingTop10 {\n  padding-top: 10px;\n}\n\n.u-paddingTop15 {\n  padding-top: 15px;\n}\n\n.u-paddingTop20 {\n  padding-top: 20px;\n}\n\n.u-paddingTop30 {\n  padding-top: 30px;\n}\n\n.u-paddingBottom15 {\n  padding-bottom: 15px;\n}\n\n.u-paddingRight20 {\n  padding-right: 20px;\n}\n\n.u-paddingLeft20 {\n  padding-left: 20px;\n}\n\n.u-contentTitle {\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-style: normal;\n  font-weight: 600;\n  letter-spacing: -.028em;\n}\n\n.u-lineHeight1 {\n  line-height: 1;\n}\n\n.u-overflowHidden {\n  overflow: hidden;\n}\n\n.u-floatRight {\n  float: right;\n}\n\n.u-floatLeft {\n  float: left;\n}\n\n.u-flex {\n  display: flex;\n}\n\n.u-flexCenter {\n  align-items: center;\n  display: flex;\n}\n\n.u-flex1 {\n  flex: 1 1 auto;\n}\n\n.u-flex0 {\n  flex: 0 0 auto;\n}\n\n.u-flexWrap {\n  flex-wrap: wrap;\n}\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.u-maxWidth1000 {\n  max-width: 1000px;\n}\n\n.u-maxWidth740 {\n  max-width: 740px;\n}\n\n.u-maxWidth1040 {\n  max-width: 1040px;\n}\n\n.u-sizeFullWidth {\n  width: 100%;\n}\n\n.u-borderLighter {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.u-round {\n  border-radius: 50%;\n}\n\n.u-borderRadius2 {\n  border-radius: 2px;\n}\n\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n}\n\n.u-card--p {\n  font-family: \"Droid Serif\", serif;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: -.004em;\n  line-height: 1.58;\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.05);\n}\n\n.u-hide {\n  display: none !important;\n}\n\n@media only screen and (max-width: 766px) {\n  .u-hide-before-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (max-width: 1000px) {\n  .u-hide-before-lg {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 766px) {\n  .u-hide-after-md {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .u-hide-after-lg {\n    display: none !important;\n  }\n}\n\n.u-wrap {\n  margin: 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n  width: 100%;\n}\n\n@media only screen and (min-width: 1230px) {\n  .u-wrap {\n    max-width: 1200px;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .content {\n    flex: 1 !important;\n    max-width: calc(100% - 340px) !important;\n    order: 1;\n  }\n\n  .sidebar {\n    flex: 0 0 340px !important;\n    order: 2;\n  }\n}\n\n.row {\n  display: flex;\n  flex: 0 1 auto;\n  flex-flow: row wrap;\n  margin-left: -12px;\n  margin-right: -12px;\n}\n\n.row .col {\n  flex: 0 0 auto;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n\n.row .col.s1 {\n  flex-basis: 8.33333%;\n  max-width: 8.33333%;\n}\n\n.row .col.s2 {\n  flex-basis: 16.66667%;\n  max-width: 16.66667%;\n}\n\n.row .col.s3 {\n  flex-basis: 25%;\n  max-width: 25%;\n}\n\n.row .col.s4 {\n  flex-basis: 33.33333%;\n  max-width: 33.33333%;\n}\n\n.row .col.s5 {\n  flex-basis: 41.66667%;\n  max-width: 41.66667%;\n}\n\n.row .col.s6 {\n  flex-basis: 50%;\n  max-width: 50%;\n}\n\n.row .col.s7 {\n  flex-basis: 58.33333%;\n  max-width: 58.33333%;\n}\n\n.row .col.s8 {\n  flex-basis: 66.66667%;\n  max-width: 66.66667%;\n}\n\n.row .col.s9 {\n  flex-basis: 75%;\n  max-width: 75%;\n}\n\n.row .col.s10 {\n  flex-basis: 83.33333%;\n  max-width: 83.33333%;\n}\n\n.row .col.s11 {\n  flex-basis: 91.66667%;\n  max-width: 91.66667%;\n}\n\n.row .col.s12 {\n  flex-basis: 100%;\n  max-width: 100%;\n}\n\n@media only screen and (min-width: 766px) {\n  .row .col.m1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .row .col.m2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .row .col.m3 {\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .row .col.m4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .row .col.m5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .row .col.m6 {\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .row .col.m7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .row .col.m8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .row .col.m9 {\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .row .col.m10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .row .col.m11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .row .col.m12 {\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n@media only screen and (min-width: 1000px) {\n  .row .col.l1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n  }\n\n  .row .col.l2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n  }\n\n  .row .col.l3 {\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .row .col.l4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .row .col.l5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n  }\n\n  .row .col.l6 {\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .row .col.l7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n  }\n\n  .row .col.l8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n  }\n\n  .row .col.l9 {\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .row .col.l10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n  }\n\n  .row .col.l11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n  }\n\n  .row .col.l12 {\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n}\n\n.header {\n  background: #00A034;\n  color: #dce6ec;\n  z-index: 80;\n}\n\n.header a:hover {\n  color: #fff;\n}\n\n.header-wrap {\n  height: 50px;\n}\n\n.header-logo {\n  height: 30px;\n}\n\n.header-logo img {\n  max-height: 100%;\n}\n\n.header-logo,\n.header .button-search--toggle,\n.header .button-nav--toggle {\n  z-index: 150;\n}\n\n.header-description {\n  letter-spacing: -.02em;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  max-width: 750px;\n}\n\n.follow > a {\n  padding-left: 15px;\n}\n\n.nav {\n  line-height: 40px;\n  padding: 8px 0;\n  position: relative;\n}\n\n.nav ul {\n  display: flex;\n}\n\n.nav li {\n  float: left;\n}\n\n.nav li a {\n  font-weight: 600;\n  margin-right: 22px;\n  text-transform: uppercase;\n}\n\n.nav-border {\n  border-left: 1px solid #dce6ec;\n  height: 24px;\n}\n\n.button-search--toggle {\n  color: inherit !important;\n  padding-right: 0 !important;\n}\n\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n}\n\n.button-nav--toggle span {\n  background-color: #dce6ec;\n  display: block;\n  height: 2px;\n  left: 14px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  transition: .4s;\n  width: 20px;\n}\n\n.button-nav--toggle span:first-child {\n  transform: translate(0, -6px);\n}\n\n.button-nav--toggle span:last-child {\n  transform: translate(0, 6px);\n}\n\nbody.is-frontpage .header-wrap {\n  height: auto;\n}\n\n@media only screen and (min-width: 766px) {\n  .header-wrap {\n    border: 0;\n    height: 70px;\n  }\n\n  .header-logo {\n    height: 40px;\n    padding-left: 0;\n  }\n\n  body.is-frontpage .header-wrap {\n    height: 190px;\n  }\n\n  body.is-frontpage .header-logo {\n    height: 50px;\n  }\n\n  body.is-frontpage .nav ul {\n    flex: 1 1 auto;\n  }\n}\n\n@media only screen and (max-width: 766px) {\n  .header {\n    position: fixed;\n  }\n\n  .header-wrap {\n    height: 50px !important;\n  }\n\n  body.is-showNavMob {\n    overflow: hidden;\n  }\n\n  body.is-showNavMob .sideNav {\n    transform: translateX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle {\n    border: 0;\n    transform: rotate(90deg);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:first-child {\n    transform: rotate(45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:nth-child(2) {\n    transform: scaleX(0);\n  }\n\n  body.is-showNavMob .button-nav--toggle span:last-child {\n    transform: rotate(-45deg) translate(0, 0);\n  }\n\n  body.is-showNavMob .header .button-search--toggle {\n    display: none;\n  }\n\n  body.is-showNavMob .main,\n  body.is-showNavMob .footer {\n    transform: translateX(-25%);\n  }\n}\n\n.featured {\n  padding-bottom: 33%;\n}\n\n.featured .entry {\n  color: #fff;\n  margin: 0;\n  transition: width .5s;\n  width: 50%;\n}\n\n.featured .entry-title {\n  font-size: 32px !important;\n}\n\n.featured .entry.entry2 {\n  border-left: solid 1px #fff;\n  border-right: solid 1px #fff;\n}\n\n.featured .entry-image {\n  height: 100%;\n}\n\n.featured .entry:not(.first) {\n  flex-grow: 1;\n  width: 25%;\n}\n\n.featured .entry:not(.first) .entry-byline,\n.featured .entry:not(.first) .entry-excerpt {\n  display: none;\n}\n\n.featured .entry:not(.not--image) .entry-author {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.featured .entry:not(.not--image) .entry-author a,\n.featured .entry:not(.not--image) .entry-author .entry-date {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n@media only screen and (max-width: 1000px) {\n  .featured {\n    padding: 0;\n  }\n\n  .featured-wrap {\n    display: block;\n    position: relative;\n  }\n\n  .featured .entry {\n    width: 100% !important;\n  }\n\n  .featured .entry-image {\n    height: 350px;\n  }\n\n  .featured .entry-excerpt {\n    display: none;\n  }\n\n  .featured .entry-title {\n    font-size: 24px !important;\n  }\n\n  .featured .entry-byline {\n    display: flex !important;\n  }\n\n  .featured .entry.entry2 {\n    border: 0;\n  }\n}\n\n.entry-author {\n  line-height: 1.4;\n  padding-left: 10px;\n}\n\n.entry-avatar--img {\n  border-radius: 50%;\n  height: 40px;\n  width: 40px;\n}\n\n.entry-avatar--img.no-avatar {\n  background-image: url(\"./../images/avatar.png\");\n}\n\n.entry.not--image {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.entry.u-card .entry-image--link {\n  max-height: 240px;\n  max-width: 360px;\n}\n\n.entry.entry--featured .entry-body {\n  display: flex;\n  flex-direction: column;\n}\n\n.entry.entry--featured .entry-image--link {\n  max-width: 100%;\n  max-height: 185px;\n}\n\n.entry.entry--featured .entry-image {\n  margin-bottom: 20px;\n  margin-top: 5px;\n  order: -1;\n}\n\n.entry.entry--featured .entry-img {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.entry.entry--featured .entry-excerpt,\n.entry.even:not(.entry--featured) .entry-excerpt {\n  color: rgba(0, 0, 0, 0.44);\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 23px;\n  letter-spacing: -.022em;\n  line-height: 1.22;\n}\n\n.homePage .entry .u-backgroundDark {\n  display: none;\n}\n\n.homePage .entry-image {\n  height: 170px;\n}\n\n@media only screen and (min-width: 766px) {\n  .homePage .entry {\n    margin-bottom: 50px;\n  }\n\n  .homePage .entry-image {\n    height: 270px;\n  }\n\n  .homePage .entry.entry5,\n  .homePage .entry.entry6,\n  .homePage .entry.entry7,\n  .homePage .entry.entry11,\n  .homePage .entry.entry12,\n  .homePage .entry.entry13 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n  }\n\n  .homePage .entry.entry5 .entry-image,\n  .homePage .entry.entry6 .entry-image,\n  .homePage .entry.entry7 .entry-image,\n  .homePage .entry.entry11 .entry-image,\n  .homePage .entry.entry12 .entry-image,\n  .homePage .entry.entry13 .entry-image {\n    height: 170px;\n  }\n\n  .homePage .entry.entry8,\n  .homePage .entry.entry14 {\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .homePage .entry.entry8 {\n    display: flex;\n  }\n\n  .homePage .entry.entry8 .entry-image {\n    height: 350px;\n    margin-right: 15px;\n    width: 66.66667% !important;\n  }\n\n  .homePage .entry.entry8 .entry-title {\n    font-size: 36px !important;\n  }\n\n  .homePage .entry.entry8 .entry-body {\n    padding-top: 0;\n    padding-left: 13px;\n    width: 33.33333% !important;\n  }\n\n  .homePage .entry.entry14 .u-backgroundDark {\n    display: block;\n  }\n\n  .homePage .entry.entry14 .entry-image {\n    height: 450px;\n  }\n\n  .homePage .entry.entry14 .entry-body {\n    bottom: 0;\n    left: 0;\n    margin: 30px 40px;\n    max-width: 600px;\n    position: absolute;\n    z-index: 2;\n  }\n\n  .homePage .entry.entry14 .entry-title {\n    font-size: 44px !important;\n  }\n\n  .homePage .entry.entry14 .entry-excerpt {\n    font-size: 24px;\n    line-height: 1.3;\n  }\n\n  .homePage .entry.entry14:not(.not--image) .entry-body {\n    color: #fff;\n  }\n\n  .homePage .entry.entry14:not(.not--image) .entry-author {\n    color: rgba(255, 255, 255, 0.9);\n  }\n\n  .homePage .entry.entry14:not(.not--image) .entry-author a,\n  .homePage .entry.entry14:not(.not--image) .entry-author .entry-date {\n    color: rgba(255, 255, 255, 0.9);\n  }\n}\n\n.post-title {\n  line-height: 1.04;\n}\n\n.post-footer {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.post-body a {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, transparent 50%);\n  background-position: 0 1.07em;\n  background-repeat: repeat-x;\n  background-size: 2px .1em;\n  text-decoration: none;\n}\n\n.post-body img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.post-body h1,\n.post-body h2,\n.post-body h3,\n.post-body h4,\n.post-body h5,\n.post-body h6 {\n  margin-top: 30px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.post-body h2 {\n  font-size: 40px;\n  letter-spacing: -.03em;\n  line-height: 1.04;\n  margin-top: 54px;\n}\n\n.post-body h3 {\n  font-size: 32px;\n  letter-spacing: -.02em;\n  line-height: 1.15;\n  margin-top: 52px;\n}\n\n.post-body h4 {\n  font-size: 24px;\n  letter-spacing: -.018em;\n  line-height: 1.22;\n  margin-top: 30px;\n}\n\n.post-body p {\n  font-family: \"Droid Serif\", serif;\n  font-size: 21px;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-top: 28px;\n}\n\n.post-body ul,\n.post-body ol {\n  font-size: 21px;\n  list-style: disc;\n  margin-top: 30px;\n  padding-left: 40px;\n}\n\n.post-body ul li,\n.post-body ol li {\n  line-height: 1.58;\n}\n\n.post-body ol {\n  list-style: decimal;\n}\n\n.post-body .twitter-tweet,\n.post-body iframe {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 40px !important;\n}\n\n.post-tags a {\n  background: rgba(0, 0, 0, 0.08);\n  border: none;\n  border-radius: 3px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  margin-right: 8px;\n}\n\n.post-tags a:hover {\n  background: rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.post-newsletter {\n  max-width: 520px;\n}\n\n.post-newsletter .newsletter-form {\n  max-width: 400px;\n}\n\n.post-newsletter .form-group {\n  width: 80%;\n  padding-right: 5px;\n}\n\n.post-newsletter .form--input {\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  height: 48px;\n  padding: 6px 12px 8px 5px;\n  resize: none;\n  width: 100%;\n}\n\n.post-newsletter .form--input:focus {\n  outline: 0;\n}\n\n.post-newsletter .form--btn {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  padding: 0;\n  width: 20%;\n}\n\n.post-newsletter .form--btn::before {\n  background-color: #a9a9a9;\n  border-radius: 0 45px 45px 0;\n  line-height: 45px;\n  z-index: 2;\n}\n\n.post-newsletter .form--btn:hover {\n  opacity: .8;\n}\n\n.post-newsletter .form--btn:focus {\n  outline: 0;\n}\n\n.post-related .entry-image {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  border-radius: 4px 4px 0 0;\n  height: 150px;\n}\n\n.post-related .entry-title {\n  color: rgba(0, 0, 0, 0.9);\n  -webkit-box-orient: vertical !important;\n  -webkit-line-clamp: 2 !important;\n  display: -webkit-box !important;\n  line-height: 1.1 !important;\n  max-height: 2.2em !important;\n  text-overflow: ellipsis !important;\n}\n\n.post-related .u-card {\n  height: 240px;\n}\n\n.sharePost {\n  left: -100px;\n  top: 0;\n  width: 45px;\n}\n\n.sharePost a {\n  background-image: none;\n  border-radius: 5px;\n  color: #fff;\n  height: 36px;\n  line-height: 20px;\n  margin: 10px auto;\n  padding: 8px;\n  text-decoration: none;\n  width: 36px;\n}\n\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translateY(100%);\n  transition: transform .3s;\n  visibility: hidden;\n  z-index: 500;\n}\n\n.postActions.is-visible {\n  transform: translateY(0);\n  transition-delay: 0s;\n  visibility: visible;\n}\n\n.postActions-wrap {\n  max-width: 1200px;\n}\n\n.postActions .separator {\n  background: rgba(0, 0, 0, 0.15);\n  height: 24px;\n  margin: 0 15px;\n  width: 1px;\n}\n\n.nextPost {\n  max-width: 260px;\n}\n\n.author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, 0.6);\n  min-height: 400px;\n}\n\n.author a {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author a:hover {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.author-wrap {\n  z-index: 2;\n}\n\n.author-avatar {\n  height: 80px;\n  margin-right: 10px;\n  width: 80px;\n}\n\n.author-meta span {\n  display: inline-block;\n  font-size: 17px;\n  font-style: italic;\n  margin: 0 25px 16px 0;\n  opacity: .8;\n  word-wrap: break-word;\n}\n\n.author-name {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.author-bio {\n  max-width: 600px;\n}\n\n.author-follow a {\n  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.5);\n  cursor: pointer;\n  display: inline-block;\n  height: 40px;\n  line-height: 40px;\n  margin: 0 10px;\n  padding: 0 16px;\n  text-shadow: none;\n}\n\n.author-follow a:hover {\n  box-shadow: inset 0 0 0 2px #fff;\n}\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, 0.33);\n}\n\n.author.has--image .author-link:hover {\n  opacity: 1 !important;\n}\n\n.author.has--image a,\n.author.has--image .author-name {\n  color: #fff;\n}\n\n@media only screen and (max-width: 766px) {\n  .author-meta span {\n    display: block;\n  }\n}\n\n.button {\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, 0.44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Source Sans Pro\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.button--chromeless {\n  border-radius: 0;\n  border-width: 0;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.44);\n  height: auto;\n  line-height: inherit;\n  padding: 0;\n  text-align: left;\n  vertical-align: baseline;\n  white-space: normal;\n}\n\n.button--large {\n  font-size: 15px;\n  height: 44px;\n  line-height: 42px;\n  padding: 0 18px;\n}\n\n.button--dark {\n  border-color: rgba(0, 0, 0, 0.6);\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.button--dark:hover {\n  border-color: rgba(0, 0, 0, 0.8);\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.buttonSet .button--large.button--chromeless,\n.buttonSet .button--large.button--link {\n  height: 44px;\n  line-height: 42px;\n}\n\n.buttonSet > .button--chromeless:not(.button--circle) {\n  margin-right: 0;\n  padding-right: 8px;\n}\n\n.buttonSet > .button--chromeless + .button--chromeless:not(.button--circle) {\n  margin-left: 0;\n  padding-left: 8px;\n}\n\n.buttonSet > .button--chromeless:last-child {\n  padding-right: 0;\n}\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n.sidebar-title {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.0785);\n  font-weight: 700;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n}\n\n.sidebar-border {\n  border-left: 3px solid #00A034;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.2);\n  font-family: \"Droid Serif\", serif;\n  left: 0;\n  padding: 15px 10px 10px;\n  top: 0;\n}\n\n.sidebar-post:nth-child(3n) .sidebar-border {\n  border-color: #f59e00;\n}\n\n.sidebar-post:nth-child(3n+2) .sidebar-border {\n  border-color: #26a8ed;\n}\n\n.sidebar-post--title {\n  line-height: 1.1;\n}\n\n.sidebar-post--link {\n  background-color: #fff;\n  min-height: 50px;\n  padding: 15px 15px 15px 55px;\n}\n\n.sidebar-post--link:hover .sidebar-border {\n  background-color: #e5eff5;\n}\n\n.sideNav {\n  background-color: #00A034;\n  color: rgba(0, 0, 0, 0.8);\n  height: 100vh;\n  padding: 50px 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: .4s;\n  will-change: transform;\n  z-index: 99;\n}\n\n.sideNav-menu a {\n  padding: 10px 20px;\n}\n\n.sideNav-wrap {\n  background: #eee;\n  overflow: auto;\n  padding: 20px 0;\n  top: 50px;\n}\n\n.sideNav-section {\n  border-bottom: solid 1px #ddd;\n  margin-bottom: 8px;\n  padding-bottom: 8px;\n}\n\n.sideNav-follow {\n  border-top: 1px solid #ddd;\n  margin: 15px 0;\n}\n\n.sideNav-follow a {\n  color: #fff;\n  display: inline-block;\n  height: 36px;\n  line-height: 20px;\n  margin: 0 5px 5px 0;\n  min-width: 36px;\n  padding: 8px;\n  text-align: center;\n  vertical-align: middle;\n}\n\n@font-face {\n  font-family: 'simply';\n  src: url(\"./../fonts/simply.eot\");\n  src: url(\"./../fonts/simply.eot\") format(\"embedded-opentype\"), url(\"./../fonts/simply.ttf\") format(\"truetype\"), url(\"./../fonts/simply.woff\") format(\"woff\"), url(\"./../fonts/simply.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.i-comments:before {\n  content: \"\\e900\";\n}\n\n.i-location:before {\n  content: \"\\e8b4\";\n}\n\n.i-save:before {\n  content: \"\\e8e6\";\n}\n\n.i-save--line:before {\n  content: \"\\e8e7\";\n}\n\n.i-check-circle:before {\n  content: \"\\e86c\";\n}\n\n.i-close:before {\n  content: \"\\e5cd\";\n}\n\n.i-favorite:before {\n  content: \"\\e87d\";\n}\n\n.i-star:before {\n  content: \"\\e838\";\n}\n\n.i-warning:before {\n  content: \"\\e002\";\n}\n\n.i-rss:before {\n  content: \"\\e0e5\";\n}\n\n.i-search:before {\n  content: \"\\e8b6\";\n}\n\n.i-send:before {\n  content: \"\\e163\";\n}\n\n.i-share:before {\n  content: \"\\e80d\";\n}\n\n.i-link:before {\n  content: \"\\f0c1\";\n}\n\n.i-reddit:before {\n  content: \"\\f281\";\n}\n\n.i-twitter:before {\n  content: \"\\f099\";\n}\n\n.i-github:before {\n  content: \"\\f09b\";\n}\n\n.i-linkedin:before {\n  content: \"\\f0e1\";\n}\n\n.i-code:before {\n  content: \"\\f121\";\n}\n\n.i-youtube:before {\n  content: \"\\f16a\";\n}\n\n.i-stack-overflow:before {\n  content: \"\\f16c\";\n}\n\n.i-instagram:before {\n  content: \"\\f16d\";\n}\n\n.i-flickr:before {\n  content: \"\\f16e\";\n}\n\n.i-dribbble:before {\n  content: \"\\f17d\";\n}\n\n.i-behance:before {\n  content: \"\\f1b4\";\n}\n\n.i-spotify:before {\n  content: \"\\f1bc\";\n}\n\n.i-codepen:before {\n  content: \"\\f1cb\";\n}\n\n.i-facebook:before {\n  content: \"\\f230\";\n}\n\n.i-pinterest:before {\n  content: \"\\f231\";\n}\n\n.i-whatsapp:before {\n  content: \"\\f232\";\n}\n\n.i-snapchat:before {\n  content: \"\\f2ac\";\n}\n\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both;\n}\n\n.animated.infinite {\n  animation-iteration-count: infinite;\n}\n\n.bounceIn {\n  animation-name: bounceIn;\n}\n\n.bounceInDown {\n  animation-name: bounceInDown;\n}\n\n.pulse {\n  animation-name: pulse;\n}\n\n@keyframes bounceIn {\n  0%, 20%, 40%, 60%, 80%, 100% {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes bounceInDown {\n  0%, 60%, 75%, 90%, 100% {\n    animation-timing-function: cubic-bezier(215, 610, 355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n\n  100% {\n    transform: none;\n  }\n}\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.2, 1.2, 1.2);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes scroll {\n  0% {\n    opacity: 0;\n  }\n\n  10% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n}\n\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes tooltip {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, 6px);\n  }\n\n  100% {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n\n","// Featured home page\n// ==========================================================================\n.featured {\n  padding-bottom: 33%;\n\n  .entry {\n    color: #fff;\n    margin: 0;\n    transition: width .5s;\n    width: 50%;\n\n    &-title {font-size: 32px !important;}\n\n    &.entry2 {\n      border-left: solid 1px #fff;\n      border-right: solid 1px #fff;\n    }\n\n    &-image {height: 100%;}\n\n    &:not(.first) {\n      flex-grow: 1;\n      width: 25%;\n\n      .entry-byline,\n      .entry-excerpt {display: none;}\n    }\n\n    &:not(.not--image) {\n      .entry-author {\n        color: rgba(255, 255, 255, .9);\n        a, .entry-date {color: rgba(255, 255, 255, .9); }\n      }\n    }\n\n    &-body { @extend %content-absolute-bottom;}\n  }\n}\n\n\n@media #{$lg-and-down}  {\n  .featured {\n    padding: 0;\n\n    &-wrap { display: block; position: relative}\n    .entry {width: 100% !important;}\n    .entry-image {height: 350px;}\n    .entry-excerpt {display: none;}\n    .entry-title {font-size: 24px !important;}\n    .entry-byline {display: flex !important;}\n    .entry.entry2 {border: 0}\n  }\n}\n","// color\n.u-textColorNormal {\n  color: rgba(0, 0, 0, .44);\n  fill: rgba(0, 0, 0, .44);\n}\n\n.u-hoverColorNormal:hover {\n  color: rgba(0, 0, 0, .6);\n  fill: rgba(0, 0, 0, .6);\n}\n\n.u-textColorDarker {@extend %u-text-color-darker;}\n\n.u-link { color: $primary-color !important; }\n\n// Positions\n.u-relative { position: relative; }\n.u-absolute { position: absolute; }\n.u-absolute0 { @extend %u-absolute0;}\n\n.u-block {display: block}\n\n//  Background\n.u-backgroundDark {\n  background: linear-gradient(to bottom, rgba(0, 0, 0, .3) 29%, rgba(0, 0, 0, .6) 81%);\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1;\n}\n\n// .u-background-white { background-color: #eeefee; }\n.u-backgroundWhite {background-color: #fafafa;}\n.u-backgroundColorGrayLight {background-color: #f0f0f0 !important;}\n\n// Clear\n.u-clear {\n  &::before,\n  &::after {\n    content: \" \";\n    display: table;\n  }\n  &::after {clear: both;}\n}\n\n// font size\n.u-fontSize13 {font-size: 13px}\n.u-fontSize15 {font-size: 15px}\n.u-fontSize20 {font-size: 20px}\n.u-fontSize22 {font-size: 22px}\n.u-fontSize28 {font-size: 28px}\n.u-fontSize36 {font-size: 36px}\n.u-fontSize40 {font-size: 40px}\n.u-fontSizeBase {font-size: 18px}\n.u-fontSizeJumbo {font-size: 50px}\n.u-fontSizeLarge {font-size: 24px !important}\n.u-fontSizeLarger {font-size: 32px}\n.u-fontSizeLargest {font-size: 44px}\n.u-fontSizeMicro {font-size: 11px}\n.u-fontSizeSmall {font-size: 16px}\n.u-fontSizeSmaller {font-size: 14px}\n.u-fontSizeSmallest {font-size: 12px}\n\n@media (max-width: 991px) {\n  .u-sm-fontSizeBase {font-size: 18px}\n  .u-sm-fontSizeLarger {font-size: 32px}\n}\n\n@media (max-width: 767px) {\n  .u-xs-fontSizeBase {font-size: 18px}\n  .u-xs-fontSize13 {font-size: 13px}\n  .u-xs-fontSizeSmaller {font-size: 14px}\n  .u-xs-fontSizeSmall {font-size: 16px}\n  .u-xs-fontSize22 {font-size: 22px}\n  .u-xs-fontSizeLarge {font-size: 24px}\n  .u-xs-fontSize40 {font-size: 40px}\n  .u-xs-fontSizeLarger {font-size: 32px}\n  .u-xs-fontSizeSmallest {font-size: 12px}\n}\n\n// font weight\n.u-fontWeightThin {font-weight: 300}\n.u-fontWeightNormal {font-weight: 400}\n.u-fontWeightMedium {font-weight: 500}\n.u-fontWeightSemibold {font-weight: 600}\n.u-fontWeightBold {font-weight: 700 !important}\n\n.u-textUppercase {text-transform: uppercase}\n.u-textAlignCenter {text-align: center}\n\n\n.u-noWrapWithEllipsis {\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n}\n\n// Margin\n.u-marginAuto { margin-left: auto; margin-right: auto;}\n.u-marginTop30 {margin-top: 30px}\n.u-marginBottom15 {margin-bottom: 15px}\n.u-marginBottom30 {margin-bottom: 30px}\n.u-marginBottom40 {margin-bottom: 40px}\n\n// padding\n.u-padding0 {padding: 0 !important}\n.u-padding15 {padding: 15px !important;}\n.u-paddingBottom2 { padding-bottom: 2px;}\n.u-paddingBottom30 { padding-bottom: 30px;}\n.u-paddingBottom20 {padding-bottom: 20px}\n\n.u-paddingTop5 { padding-top: 5px;}\n.u-paddingTop10 {padding-top: 10px;}\n.u-paddingTop15 {padding-top: 15px;}\n.u-paddingTop20 {padding-top: 20px;}\n.u-paddingTop30 {padding-top: 30px;}\n\n.u-paddingBottom15 {padding-bottom: 15px;}\n\n.u-paddingRight20 {padding-right: 20px}\n.u-paddingLeft20 {padding-left: 20px}\n\n.u-contentTitle {\n  font-family: $primary-font;\n  font-style: normal;\n  font-weight: 600;\n  letter-spacing: -.028em;\n}\n\n// line-height\n.u-lineHeight1 {line-height: 1;}\n\n// overflow\n.u-overflowHidden {overflow: hidden}\n\n// float\n.u-floatRight { float: right; }\n.u-floatLeft { float: left; }\n\n//  flex\n.u-flex { display: flex; }\n.u-flexCenter { align-items: center; display: flex; }\n.u-flex1 { flex: 1 1 auto; }\n.u-flex0 { flex: 0 0 auto; }\n.u-flexWrap {flex-wrap: wrap}\n\n.u-flexColumn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.u-flexEnd {\n  align-items: center;\n  justify-content: flex-end;\n}\n\n// Background\n.u-backgroundSizeCover {\n  background-origin: border-box;\n  background-position: center;\n  background-size: cover;\n}\n\n// max widht\n.u-container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.u-maxWidth1000 { max-width: 1000px;}\n.u-maxWidth740 {max-width: 740px;}\n.u-maxWidth1040 { max-width: 1040px;}\n.u-sizeFullWidth {width: 100%}\n\n// border\n.u-borderLighter { border: 1px solid rgba(0, 0, 0, .15);}\n.u-round {border-radius: 50%}\n.u-borderRadius2 {border-radius: 2px}\n\n\n// card\n.u-card {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, .09);\n  border-radius: 3px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);\n  margin-bottom: 10px;\n  padding: 10px 20px 15px;\n\n  &--p {\n    font-family: $secundary-font;\n    font-style: normal;\n    font-weight: 400;\n    letter-spacing: -.004em;\n    line-height: 1.58;\n  }\n}\n\n.u-boxShadowBottom {\n  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .05);\n}\n\n// hide global\n.u-hide {display: none !important}\n// hide before\n@media #{$md-and-down} {.u-hide-before-md {display: none !important} }\n@media #{$lg-and-down} {.u-hide-before-lg {display: none !important} }\n\n// hide after\n@media #{$md-and-up} {.u-hide-after-md {display: none !important} }\n@media #{$lg-and-up} {.u-hide-after-lg {display: none !important} }\n","\n*, *:before, *:after {\n  box-sizing: inherit;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n\n  &:active,\n  &:hover {\n    outline: 0;\n  }\n}\n\nblockquote {\n  border-left: 3px solid rgba(0,0,0,.8);\n  font-family: $secundary-font;\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 400;\n  letter-spacing: -.003em;\n  line-height: 1.58;\n  margin-left: -23px;\n  padding-bottom: 2px;\n  padding-left: 20px;\n}\n\nbody {\n  color: $primary-text-color;\n  font-family: $primary-font;\n  font-size: $font-size-base;\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 1.4;\n  text-rendering: optimizeLegibility;\n}\n\n//Default styles\nhtml {\n  box-sizing: border-box;\n  font-size: $font-size-root;\n}\n\nfigure {\n  margin: 0;\n}\n\n// Code\n// ==========================================================================\nkbd, samp, code {\n  background: $code-bg-color;\n  border-radius: 4px;\n  color: $code-color;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  padding: 4px 6px;\n  white-space: pre-wrap;\n}\n\npre {\n  background-color: $code-bg-color !important;\n  border-radius: 4px;\n  font-family: $code-font !important;\n  font-size: $font-size-code;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 1rem;\n  position: relative;\n  word-wrap: normal;\n\n  code {\n    background: transparent;\n    color: $pre-code-color;\n    padding: 0;\n    text-shadow: 0 1px #fff;\n  }\n}\n\n// hr\n// ==========================================================================\nhr {\n  background: #F1F2F1;\n  background: linear-gradient(to right, #F1F2F1 0, #b5b5b5 50%, #F1F2F1 100%);\n  border: 0;\n  height: 1px;\n  margin: 80px auto;\n  max-width: 90%;\n  position: relative;\n\n  &::before {\n    @extend %fonts-icons;\n    background: #fff;\n    color: rgba(73, 55, 65, .75);\n    content: $i-code;\n    display: block;\n    font-size: 35px;\n    left: 50%;\n    padding: 0 25px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%,-50%);\n  }\n}\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  width: auto;\n\n  &:not([src]) {\n    visibility: hidden;\n  }\n}\n\ni {\n  display: inline-block;\n  vertical-align: middle;\n}\n\nol, ul {\n  list-style-image: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.main,\n.footer {transition: transform .5s ease;}\n\n@media #{$md-and-down} {\n  .main {padding-top: $header-height-mobile;}\n}\n\n// warning success and Note\n// ==========================================================================\n.warning {\n  background: #fbe9e7;\n  color: #d50000;\n  &::before {content: $i-warning;}\n}\n\n.note {\n  background: #e1f5fe;\n  color: #0288d1;\n  &::before {content: $i-star;}\n}\n\n.success {\n  background: #e0f2f1;\n  color: #00897b;\n  &::before {color: #00bfa5; content: $i-check;}\n}\n\n.warning, .note, .success{\n  display: block;\n  font-size: 18px !important;\n  line-height: 1.2 !important;\n  margin-top: 28px;\n  padding: 12px 24px 12px 60px;\n\n  a {\n    color: inherit;\n    text-decoration: underline;\n  }\n\n  &::before {\n    @extend %fonts-icons;\n    float: left;\n    font-size: 24px;\n    margin-left: -36px;\n  }\n}\n\n// Page Tags\n// ==========================================================================\n.tag {\n  color: #fff;\n  min-height: 250px;\n  z-index: 2;\n\n  &-wrap {z-index: 2;}\n\n  &.not--image {\n    @extend %u-text-color-darker;\n    min-height: auto;\n  }\n\n  &-description {\n    max-width: 500px;\n  }\n}\n\n\n// toltip\n// ==========================================================================\n.with-tooltip {\n  overflow: visible;\n  position: relative;\n\n  &:after {\n    background: rgba(0, 0, 0, .85);\n    border-radius: 4px;\n    color: #FFF;\n    content: attr(data-tooltip);\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 600;\n    left: 50%;\n    line-height: 1.25;\n    min-width: 120px;\n    opacity: 0;\n    padding: 4px 8px;\n    pointer-events: none;\n    position: absolute;\n    text-align: center;\n    text-transform: none;\n    top: -30px;\n    will-change: opacity, transform;\n    z-index: 1;\n  }\n\n  &:hover:after {\n    animation: tooltip .1s ease-out both;\n  }\n}\n\n// Footer\n// ==========================================================================\n.footer {\n  color: rgba(0, 0, 0, .44);\n\n  a {\n    color: rgba(0, 0, 0, .6);\n    &:hover {color: rgba(0, 0, 0, .8);}\n  }\n}\n\n// Error page\n// ==========================================================================\n.errorPage {\n  font-family: 'Roboto Mono', monospace;\n  height: 100vh;\n  width: 100%;\n\n  &-link {\n    left: -5px;\n    padding: 24px 60px;\n    top: -6px;\n  }\n\n  &-text {\n    margin-top: 60px;\n    white-space: pre-wrap;\n  }\n\n  &-wrap {\n    color: rgba(0, 0, 0, .4);\n    left: 50%;\n    min-width: 680px;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n}\n\n\n// Video Responsive\n// ==========================================================================\n.video-responsive {\n  display: block;\n  height: 0;\n  margin-top: 30px;\n  overflow: hidden;\n  padding: 0 0 56.25%;\n  position: relative;\n\n  iframe {\n    border: 0;\n    bottom: 0;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n  }\n}\n\n// Social Media Color\n// ==========================================================================\n@each $social-name, $color in $social-colors {\n  .c-#{$social-name} { color: $color !important;}\n  .bg-#{$social-name} { background-color: $color !important; }\n}\n\n\n// Facebook Save\n// ==========================================================================\n.fbSave {\n  &-dropdown {\n    background-color: #FFF;\n    border: 1px solid #e0e0e0;\n    bottom: 100%;\n    display: none;\n    max-width: 200px;\n    min-width: 100px;\n    padding: 8px;\n    transform: translate(-50%, 0);\n    z-index: 10;\n\n    &.is-visible {display: block; }\n  }\n}\n","/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\n/* Document\n   ========================================================================== */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  line-height: 1.15; /* 2 */\n  -ms-text-size-adjust: 100%; /* 3 */\n  -webkit-text-size-adjust: 100%; /* 3 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n","// Headings\n\nh1, h2, h3, h4, h5, h6,\r\n.h1, .h2, .h3, .h4, .h5, .h6 {\r\n  color: $headings-color;\r\n  font-family: $headings-font-family;\r\n  font-weight: $headings-font-weight;\r\n  line-height: $headings-line-height;\r\n  margin: 0;\n\n  a {\n    color: inherit;\n    line-height: inherit;\n  }\n}\r\n\r\nh1 { font-size: $font-size-h1; }\r\nh2 { font-size: $font-size-h2; }\r\nh3 { font-size: $font-size-h3; }\r\nh4 { font-size: $font-size-h4; }\r\nh5 { font-size: $font-size-h5; }\r\nh6 { font-size: $font-size-h6; }\r\n\r\n// These declarations are kept separate from and placed after\r\n// the previous tag-based declarations so that the classes beat the tags in\r\n// the CSS cascade, and thus <h1 class=\"h2\"> will be styled like an h2.\r\n.h1 { font-size: $font-size-h1; }\r\n.h2 { font-size: $font-size-h2; }\r\n.h3 { font-size: $font-size-h3; }\r\n.h4 { font-size: $font-size-h4; }\r\n.h5 { font-size: $font-size-h5; }\r\n.h6 { font-size: $font-size-h6; }\r\n\n\r\np {\n  margin: 0;\n}\r\n",".u-wrap {\n  margin: 0 auto;\n  padding-left:  ($grid-gutter-width / 2);\n  padding-right: ($grid-gutter-width / 2);\n  width: 100%;\n\n  // @media #{$sm-and-up}{max-width: $container-sm;}\n  // @media #{$md-and-up}{max-width: $container-md;}\n  // @media #{$lg-and-up}{max-width: $container-lg;}\n  @media #{$xl-and-up} {max-width: $container-xl;}\n}\n\n\n@media #{$lg-and-up} {\n  .content {\n    flex: 1 !important;\n    max-width: calc(100% - 340px) !important;\n    order: 1;\n    // overflow: hidden;\n  }\n  .sidebar {\n    flex: 0 0 340px !important;\n    order: 2;\n  }\n}\n\n\n.row {\n  display: flex;\n  flex: 0 1 auto;\n  flex-flow: row wrap;\n\n  margin-left: - $gutter-width / 2;\n  margin-right: - $gutter-width / 2;\n\n  .col {\n    flex: 0 0 auto;\n    padding-left: $gutter-width / 2;\n    padding-right: $gutter-width / 2;\n\n    $i: 1;\n    @while $i <= $num-cols {\n      $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n      &.s#{$i} {\n        flex-basis: $perc;\n        max-width: $perc;\n      }\n      $i: $i + 1;\n    }\n\n    @media #{$md-and-up} {\n      $i: 1;\n      @while $i <= $num-cols {\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n        &.m#{$i} {\n          flex-basis: $perc;\n          max-width: $perc;\n        }\n        $i: $i + 1;\n      }\n    }\n\n    @media #{$lg-and-up} {\n      $i: 1;\n      @while $i <= $num-cols {\n        $perc: unquote((100 / ($num-cols / $i)) + \"%\");\n        &.l#{$i} {\n          flex-basis: $perc;\n          max-width: $perc;\n        }\n        $i: $i + 1;\n      }\n    }\n  }\n}\n","// Header\n// ==========================================================================\n\n.header {\n  background: $primary-color;\n  color: #dce6ec;\n  z-index: 80;\n\n  a:hover {\n    color: #fff;\n  }\n\n  &-wrap {\n    height: 50px;\n  }\n\n  &-logo {\n    height: 30px;\n    img {max-height: 100%; }\n  }\n\n  &-logo,\n  .button-search--toggle,\n  .button-nav--toggle {z-index: 150;}\n\n\n  // header description home page\n  &-description {\n    letter-spacing: -.02em;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    max-width: 750px;\n  }\n}\n\n// Header Follow\n// ==========================================================================\n.follow>a {\n  padding-left: 15px;\n}\n\n// Header menu\n// ==========================================================================\n\n.nav {\n  line-height: 40px;\n  padding: 8px 0;\n  position: relative;\n\n  ul {\n    display: flex;\n  }\n\n  li {\n    float: left;\n\n    a {\n      font-weight: 600;\n      margin-right: 22px;\n      text-transform: uppercase;\n    }\n  }\n\n  &-border {\n    border-left: 1px solid #dce6ec;\n    height: 24px;\n  }\n}\n\n\n\n.button-search--toggle {\n  color: inherit !important;\n  padding-right: 0 !important;\n}\n\n\n// button-nav\n.button-nav--toggle {\n  height: 48px;\n  position: relative;\n  transition: transform .4s;\n  width: 48px;\n\n  span {\n    background-color: #dce6ec;\n    display: block;\n    height: 2px;\n    left: 14px;\n    margin-top: -1px;\n    position: absolute;\n    top: 50%;\n    transition: .4s;\n    width: 20px;\n\n    &:first-child { transform: translate(0, -6px); }\n    &:last-child { transform: translate(0, 6px); }\n  }\n}\n\n\nbody.is-frontpage .header-wrap {height: auto;}\n\n\n// Media Query\n// ==========================================================================\n\n@media #{$md-and-up} {\n  .header {\n    &-wrap {\n      border: 0;\n      height: 70px;\n    }\n    &-logo {\n      height: 40px;\n      padding-left: 0;\n    }\n  }\n\n  body.is-frontpage {\n    .header {\n      &-wrap { height: 190px; }\n      &-logo { height: 50px;}\n    }\n\n    .nav ul {flex: 1 1 auto;}\n  }\n\n\n}\n\n\n// Header menu\n// ==========================================================================\n@media #{$md-and-down} {\n\n  .header {\n    position: fixed;\n\n    &-wrap {\n      height: $header-height-mobile !important;\n    }\n  }\n\n  // show menu mobile\n  body.is-showNavMob {\n    overflow: hidden;\n\n    .sideNav {transform: translateX(0); }\n\n    .button-nav--toggle {\n      border: 0;\n      transform: rotate(90deg);\n\n      span:first-child { transform: rotate(45deg) translate(0, 0);}\n      span:nth-child(2) { transform: scaleX(0);}\n      span:last-child {transform: rotate(-45deg) translate(0, 0);}\n    }\n\n    .header .button-search--toggle {display: none;}\n    .main, .footer { transform: translateX(-25%);}\n  }\n\n}\n","// Home Page Styles\r\n// ==========================================================================\r\n\n.homePage {\n  .entry {\n    .u-backgroundDark {display: none;}\n    &-image {height: 170px;}\n  }\n}\n\n\n\n@media #{$md-and-up} {\n  .homePage {\n    .entry {\n      margin-bottom: 50px;\n\n      &-image {\n        height: 270px;\n        // border: 1px solid rgba(0, 0, 0, .15);\n      }\n\n      &.entry5, &.entry6, &.entry7, &.entry11, &.entry12, &.entry13,{\n        flex-basis: 33.33333%;\n        max-width: 33.33333%;\n        .entry-image { height: 170px;}\n      }\n\n      &.entry8, &.entry14 {\n        flex-basis: 100%;\n        max-width: 100%;\n      }\n\n      &.entry8 {\n        display: flex;\n        .entry-image {\n          height: 350px;\n          margin-right: 15px;\n          width: 66.66666667%!important;\n        }\n        .entry-title {font-size: 36px!important}\n        .entry-body {\n          padding-top: 0;\n          padding-left: 13px;\n          width: 33.33333333%!important;\n        }\n      }\n\n      &.entry14 {\n        .u-backgroundDark { display: block; }\n        .entry {\n          &-image {height: 450px;}\n          &-body {\n            bottom: 0;\n            left: 0;\n            margin: 30px 40px;\n            max-width: 600px;\n            position: absolute;\n            z-index: 2;\n          }\n          &-title {font-size: 44px !important}\n          &-excerpt { font-size: 24px; line-height: 1.3;}\n        }\n\n        &:not(.not--image) {\n          .entry-body {color: #fff;}\n          .entry-author {\n            color: rgba(255, 255, 255, .9);\n            a, .entry-date {color: rgba(255, 255, 255, .9); }\n          }\n        }\n      }\n\n\n\n    }\n}\n\n}\n",".post {\n  &-title {\n    line-height: 1.04;\n  }\n\n  &-footer {\n    border-bottom: 1px solid rgba(0,0,0,.05);\n  }\n}\n\n\n// post content body\n// ==========================================================================\n.post-body {\n  a {\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, 0) 50%);\n    background-position: 0 1.07em;\n    background-repeat: repeat-x;\n    background-size: 2px .1em;\n    text-decoration: none;\n  }\n  img {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    margin-top: 30px;\n    font-weight: 700;\n    font-style: normal;\n  }\n\n  h2 {\n    font-size: 40px;\n    letter-spacing: -.03em;\n    line-height: 1.04;\n    margin-top: 54px;\n  }\n\n  h3 {\n    font-size: 32px;\n    letter-spacing: -.02em;\n    line-height: 1.15;\n    margin-top: 52px;\n  }\n\n  h4 {\n    font-size: 24px;\n    letter-spacing: -.018em;\n    line-height: 1.22;\n    margin-top: 30px;\n  }\n\n  p {\n    font-family: $secundary-font;\n    font-size: 21px;\n    font-weight: 400;\n    letter-spacing: -.003em;\n    line-height: 1.58;\n    margin-top: 28px;\n  }\n\n  ul,\n  ol {\n    font-size: 21px;\n    list-style: disc;\n    margin-top: 30px;\n    padding-left: 40px;\n    li {line-height: 1.58;}\n  }\n\n  ol {list-style: decimal;}\n\n  .twitter-tweet,\n  iframe {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 40px !important;\n  }\n\n}\n\n\n// post Tags\n// ==========================================================================\n.post-tags {\n  a {\n    background: rgba(0, 0, 0, .08);\n    border: none;\n    border-radius: 3px;\n    color: rgba(0, 0, 0, .6);\n    margin-bottom: 8px;\n    margin-right: 8px;\n    &:hover {\n      background: rgba(0, 0, 0, .1);\n      color: rgba(0, 0, 0, .6);\n    }\n  }\n}\n\n// post Newsletter\n// ==========================================================================\n\n.post-newsletter {\n  max-width: 520px;\n  .newsletter-form {max-width: 400px}\n\n  .form-group { width: 80%; padding-right: 5px; }\n  .form--input {\n    border: 0;\n    border-bottom: 1px solid #ccc;\n    height: 48px;\n    padding: 6px 12px 8px 5px;\n    resize: none;\n    width: 100%;\n    &:focus {\n      outline: 0;\n    }\n  }\n  .form--btn {\n    background-color: #a9a9a9;\n    border-radius: 0 45px 45px 0;\n    border: 0;\n    color: #fff;\n    cursor: pointer;\n    padding: 0;\n    width: 20%;\n\n    &::before {\n      @extend %u-absolute0;\n      background-color: #a9a9a9;\n      border-radius: 0 45px 45px 0;\n      line-height: 45px;\n      z-index: 2;\n    }\n\n    &:hover {opacity: .8; }\n    &:focus { outline: 0; }\n  }\n}\n\n\n// post Relative\n// ==========================================================================\n.post-related {\n  .entry-image {\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\n    border-radius: 4px 4px 0 0;\n    height: 150px;\n  }\n\n  .entry-title {\n    color: rgba(0,0,0,.9);\n    -webkit-box-orient: vertical !important;\n    -webkit-line-clamp: 2 !important;\n    display: -webkit-box!important;\n    line-height: 1.1 !important;\n    max-height: 2.2em !important;\n    text-overflow: ellipsis !important;\n  }\n\n  .u-card {\n    height: 240px;\n  }\n}\n\n\n// Share Post\n// ==========================================================================\n.sharePost {\n  left: -100px;\n  top: 0;\n  width: 45px;\n\n  a {\n    background-image: none;\n    border-radius: 5px;\n    color: #fff;\n    height: 36px;\n    line-height: 20px;\n    margin: 10px auto;\n    padding: 8px;\n    text-decoration: none;\n    width: 36px;\n  }\n}\n\n// Post Actions\n// ==========================================================================\n.postActions {\n  background-color: #fff;\n  bottom: 0;\n  box-shadow: 0 0 1px rgba(0, 0, 0, .44);\n  height: 44px;\n  left: 0;\n  position: fixed;\n  right: 0;\n  transform: translateY(100%);\n  transition: transform .3s;\n  visibility: hidden;\n  z-index: 500;\n\n  &.is-visible {\n    transform: translateY(0);\n    transition-delay: 0s;\n    visibility: visible;\n  }\n\n  &-wrap {max-width: 1200px;}\n\n  .separator {\n    background: rgba(0, 0, 0, .15);\n    height: 24px;\n    margin: 0 15px;\n    width: 1px;\n  }\n}\n\n.nextPost {\n  max-width: 260px;\n}\n",".author {\n  background-color: #fff;\n  color: rgba(0, 0, 0, .6);\n  min-height: 400px;\n\n  a {\n    color: rgba(0, 0, 0, .8);\n    &:hover {\n      color: rgba(0, 0, 0, .6);\n    }\n  }\n\n  &-wrap {\r\n    z-index: 2;\r\n  }\n\n  &-avatar {\n    height: 80px;\n    margin-right: 10px;\n    width: 80px;\n  }\n\n  &-meta {\n    span {\n      display: inline-block;\n      font-size: 17px;\n      font-style: italic;\n      margin: 0 25px 16px 0;\n      opacity: .8;\n      word-wrap: break-word;\n    }\n  }\n\n  &-name { color: rgba(0,0,0,.8)}\n\n  &-bio {\n    max-width: 600px;\n    // color: rgba(0, 0, 0, .6);\n  }\n\n  &-follow a {\n    box-shadow: inset 0 0 0 2px hsla(0,0%,100%,.5);\n    cursor: pointer;\n    display: inline-block;\n    height: 40px;\n    line-height: 40px;\n    margin: 0 10px;\n    padding: 0 16px;\n    text-shadow: none;\n\n    &:hover {\n      box-shadow: inset 0 0 0 2px #fff;\n    }\n\n  }\n\n}\r\n\n\n.author.has--image {\n  color: #fff !important;\n  text-shadow: 0 0 10px rgba(0, 0, 0, .33);\n\n  .author-link:hover { opacity: 1!important}\n  a,\n  .author-name { color: #fff;}\n}\n\n@media #{$md-and-down} {\n  .author-meta span {display: block;}\n}\n",".button {\n  background: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: 999em;\n  box-sizing: border-box;\n  color: rgba(0, 0, 0, .44);\n  cursor: pointer;\n  display: inline-block;\n  font-family: $primary-font;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  height: 37px;\n  letter-spacing: 0;\n  line-height: 35px;\n  padding: 0 16px;\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  text-rendering: optimizeLegibility;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  &--chromeless {\n    border-radius: 0;\n    border-width: 0;\n    box-shadow: none;\n    color: rgba(0, 0, 0, .44);\n    height: auto;\n    line-height: inherit;\n    padding: 0;\n    text-align: left;\n    vertical-align: baseline;\n    white-space: normal;\n  }\n\n  &--large {\n    font-size: 15px;\n    height: 44px;\n    line-height: 42px;\n    padding: 0 18px;\n  }\n\n  &--dark {\n    border-color: rgba(0, 0, 0, .6);\n    color: rgba(0, 0, 0, .6);\n\n    &:hover {\n      border-color: rgba(0, 0, 0, .8);\n      color: rgba(0, 0, 0, .8);\n    }\n  }\n}\n\n\n\n.buttonSet {\n\n  .button--large.button--chromeless,\n  .button--large.button--link {\n    height: 44px;\n    line-height: 42px;\n  }\n\n  &>.button--chromeless:not(.button--circle) {\n    margin-right: 0;\n    padding-right: 8px;\n  }\n\n  &>.button--chromeless+.button--chromeless:not(.button--circle) {\n    margin-left: 0;\n    padding-left: 8px;\n  }\n\n  &>.button--chromeless:last-child {\n    padding-right: 0;\n  }\n}\n\n\n\n\n.button--large.button--chromeless,\n.button--large.button--link {\n  padding: 0;\n}\n\n",".sidebar {\r\n  &-title {\r\n    border-bottom: 1px solid rgba(0, 0, 0, .0785);\r\n    font-weight: 700;\r\n    margin-bottom: 10px;\r\n    padding-bottom: 5px;\r\n  }\n\n  // border for post\n  &-border {\n    border-left: 3px solid $primary-color;\n    bottom: 0;\n    color: rgba(0, 0, 0, .2);\n    font-family: $secundary-font;\n    left: 0;\n    padding: 15px 10px 10px;\n    top: 0;\n  }\n}\r\n\n.sidebar-post {\n  &:nth-child(3n) { .sidebar-border { border-color: darken(orange, 2%); } }\n  &:nth-child(3n+2) { .sidebar-border { border-color: #26a8ed } }\n\n  &--title {\n    line-height: 1.1;\n  }\n\n  &--link {\n    background-color: #fff;\n    min-height: 50px;\n    padding: 15px 15px 15px 55px;\n    &:hover { .sidebar-border {background-color: rgba(229,239,245,1);}  }\n\n  }\n}\n"," // Navigation Mobile\n\n.sideNav {\n  background-color: $primary-color;\n  color: rgba(0, 0, 0, .8);\n  height: 100vh;\n  padding: $header-height-mobile 20px;\n  position: fixed !important;\n  transform: translateX(100%);\n  transition: .4s;\n  will-change: transform;\n  z-index: 99;\n\n  &-menu a { padding: 10px 20px; }\n\n  &-wrap {\n    background: #eee;\n    overflow: auto;\n    padding: 20px 0;\n    top: $header-height-mobile;\n  }\n\n  &-section {\n    border-bottom: solid 1px #ddd;\n    margin-bottom: 8px;\n    padding-bottom: 8px;\n  }\n\n  &-follow {\n    border-top: 1px solid #ddd;\n    margin: 15px 0;\n\n    a {\n      color: #fff;\n      display: inline-block;\n      height: 36px;\n      line-height: 20px;\n      margin: 0 5px 5px 0;\n      min-width: 36px;\n      padding: 8px;\n      text-align: center;\n      vertical-align: middle;\n    }\n\n    .i-facebook {@extend .bg-facebook;}\n    .i-twitter {@extend .bg-twitter;}\n    .i-instagram {@extend .bg-instagram;}\n    .i-youtube {@extend .bg-youtube;}\n  }\n\n\n}\n","@font-face {\n  font-family: 'simply';\n  src:  url('../../fonts/simply.eot?b9w9k4');\n  src:  url('../../fonts/simply.eot?b9w9k4#iefix') format('embedded-opentype'),\n    url('../../fonts/simply.ttf?b9w9k4') format('truetype'),\n    url('../../fonts/simply.woff?b9w9k4') format('woff'),\n    url('../../fonts/simply.svg?b9w9k4#simply') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n\n[class^=\"i-\"]::before, [class*=\" i-\"]::before {\n  @extend %fonts-icons;\n}\n\n\n.i-comments:before {\n  content: \"\\e900\";\n}\n.i-location:before {\n  content: \"\\e8b4\";\n}\n.i-save:before {\n  content: \"\\e8e6\";\n}\n.i-save--line:before {\n  content: \"\\e8e7\";\n}\n.i-check-circle:before {\n  content: \"\\e86c\";\n}\n.i-close:before {\n  content: \"\\e5cd\";\n}\n.i-favorite:before {\n  content: \"\\e87d\";\n}\n.i-star:before {\n  content: \"\\e838\";\n}\n.i-warning:before {\n  content: \"\\e002\";\n}\n.i-rss:before {\n  content: \"\\e0e5\";\n}\n.i-search:before {\n  content: \"\\e8b6\";\n}\n.i-send:before {\n  content: \"\\e163\";\n}\n.i-share:before {\n  content: \"\\e80d\";\n}\n.i-link:before {\n  content: \"\\f0c1\";\n}\n.i-reddit:before {\n  content: \"\\f281\";\n}\n.i-twitter:before {\n  content: \"\\f099\";\n}\n.i-github:before {\n  content: \"\\f09b\";\n}\n.i-linkedin:before {\n  content: \"\\f0e1\";\n}\n.i-code:before {\n  content: \"\\f121\";\n}\n.i-youtube:before {\n  content: \"\\f16a\";\n}\n.i-stack-overflow:before {\n  content: \"\\f16c\";\n}\n.i-instagram:before {\n  content: \"\\f16d\";\n}\n.i-flickr:before {\n  content: \"\\f16e\";\n}\n.i-dribbble:before {\n  content: \"\\f17d\";\n}\n.i-behance:before {\n  content: \"\\f1b4\";\n}\n.i-spotify:before {\n  content: \"\\f1bc\";\n}\n.i-codepen:before {\n  content: \"\\f1cb\";\n}\n.i-facebook:before {\n  content: \"\\f230\";\n}\n.i-pinterest:before {\n  content: \"\\f231\";\n}\n.i-whatsapp:before {\n  content: \"\\f232\";\n}\n.i-snapchat:before {\n  content: \"\\f2ac\";\n}\n","// animated Global\n.animated {\n  animation-duration: 1s;\n  animation-fill-mode: both;\n\n  &.infinite {\n    animation-iteration-count: infinite;\n  }\n}\n\n// animated All\n.bounceIn { animation-name: bounceIn;}\n.bounceInDown { animation-name: bounceInDown;}\n.pulse { animation-name: pulse; }\n\n// all keyframes Animates\n// bounceIn\n@keyframes bounceIn {\n  0%,\n  20%,\n  40%,\n  60%,\n  80%,\n  100% { animation-timing-function: cubic-bezier(.215, .610, .355, 1);}\n  0% {opacity: 0; transform: scale3d(.3, .3, .3);}\n  20% { transform: scale3d(1.1, 1.1, 1.1);}\n  40% { transform: scale3d(.9, .9, .9); }\n  60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }\n  80% { transform: scale3d(.97, .97, .97); }\n  100% { opacity: 1; transform: scale3d(1, 1, 1); }\n}\n\n;\n// bounceInDown\n@keyframes bounceInDown {\n  0%,\n  60%,\n  75%,\n  90%,\n  100% { animation-timing-function: cubic-bezier(215, 610, 355, 1); }\n  0% { opacity: 0; transform: translate3d(0, -3000px, 0); }\n  60% { opacity: 1; transform: translate3d(0, 25px, 0);}\n  75% {transform: translate3d(0, -10px, 0);}\n  90% {transform: translate3d(0, 5px, 0);}\n  100% {transform: none;}\n}\n\n@keyframes pulse {\n  from { transform: scale3d(1, 1, 1);}\n  50% {transform: scale3d(1.2, 1.2, 1.2);}\n  to {transform: scale3d(1, 1, 1); }\n}\n\n\n@keyframes scroll {\n  0% {opacity: 0;}\n  10% {opacity: 1; transform: translateY(0)}\n  100% {opacity: 0; transform: translateY(10px);}\n}\n\n//  spin for pagination\n@keyframes spin {\n  from {transform: rotate(0deg);}\n  to {transform: rotate(360deg);}\n}\n\n@keyframes tooltip {\n  0% {opacity: 0; transform: translate(-50%, 6px);}\n  100% {opacity: 1; transform: translate(-50%, 0);}\n}\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./fonts/simply.eot ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.eot";

/***/ }),
/* 2 */
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
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_helper__ = __webpack_require__(/*! ./app/app.helper */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_app_helper__);
/**
 * @package GodoFredoNinja
 * JavaScript functions
 */

// import external dependencies
// import 'sticky-kit/dist/sticky-kit';

// import local dependencies

// import SimplyShare from './app/app.share';
// import './app/app.pagination';

// Variables
var $doc = $(document);
// const $win = $(window);

var $postBody = $('.post-body');
var $shareCount = $('.share-count');


/* Menu open and close for mobile */
$('.button-nav--toggle').on('click', function (e) {
  e.preventDefault();
  $('body').toggleClass('is-showNavMob');
});



$doc.on('ready', function () {
  /* Video Responsive*/
  __WEBPACK_IMPORTED_MODULE_0__app_app_helper___default.a.videoResponsive($postBody);

  /** Share Count in facebook */
  __WEBPACK_IMPORTED_MODULE_0__app_app_helper___default.a.facebookShareCount($shareCount);
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ 3)))

/***/ }),
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !./../../~/css-loader?+sourceMap!./../../~/postcss-loader!./../../~/resolve-url-loader?+sourceMap!./../../~/sass-loader?+sourceMap!./main.scss */ 0);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 21)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !./../../~/css-loader?+sourceMap!./../../~/postcss-loader!./../../~/resolve-url-loader?+sourceMap!./../../~/sass-loader?+sourceMap!./main.scss */ 0, function() {
			var newContent = __webpack_require__(/*! !./../../~/css-loader?+sourceMap!./../../~/postcss-loader!./../../~/resolve-url-loader?+sourceMap!./../../~/sass-loader?+sourceMap!./main.scss */ 0);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
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
  var querystring = __webpack_require__(/*! querystring */ 9);
  var overrides = querystring.parse(__resourceQuery.slice(1));
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name 
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
  connect(window.EventSource);
}

function connect(EventSource) {
  var source = new EventSource(options.path);
  var lastActivity = new Date();

  source.onopen = handleOnline;
  source.onmessage = handleMessage;
  source.onerror = handleDisconnect;

  var timer = setInterval(function() {
    if ((new Date() - lastActivity) > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function handleOnline() {
    if (options.log) console.log("[HMR] connected");
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
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

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(function() { connect(EventSource); }, options.timeout);
  }

}

var reporter;
// the reporter needs to be a singleton on the page
// in case the client is being used by mutliple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
if (typeof window !== 'undefined' && !window[singletonKey]) {
  reporter = window[singletonKey] = createReporter();
}

function createReporter() {
  var strip = __webpack_require__(/*! strip-ansi */ 20);

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ 23);
  }


  var previousProblems = null;

  return {
    cleanProblemsCache: function () {
      previousProblems = null;
    },
    problems: function(type, obj) {
      if (options.warn) {
        var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');

        if (previousProblems !== newProblems) {
          previousProblems = newProblems;
          console.warn("[HMR] bundle has " + type + ":\n" + newProblems);
        }
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

var processUpdate = __webpack_require__(/*! ./process-update */ 24);

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch(obj.action) {
    case "building":
      if (options.log) console.log("[HMR] bundle rebuilding");
      break;
    case "built":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? obj.name + " " : "") +
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

/* WEBPACK VAR INJECTION */}.call(exports, "?timeout=20000&reload=true", __webpack_require__(/*! ./../webpack/buildin/module.js */ 25)(module)))

/***/ }),
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************************************************!*\
  !*** C:/Users/Smigol/Projects/ghost/content/themes/simply/~/querystring-es3/decode.js ***!
  \****************************************************************************************/
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
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************************************************!*\
  !*** C:/Users/Smigol/Projects/ghost/content/themes/simply/~/querystring-es3/encode.js ***!
  \****************************************************************************************/
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
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************************************************!*\
  !*** C:/Users/Smigol/Projects/ghost/content/themes/simply/~/querystring-es3/index.js ***!
  \***************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ 7);
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ 8);


/***/ }),
/* 10 */
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
  '2': 'opacity:0.8', // dim
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
/* 11 */
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
/* 12 */
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


module.exports = {
  videoResponsive: simplyVideoResponsive,
  facebookShareCount: simplyFacebookShareCount,
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 3)))

/***/ }),
/* 13 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ../~/css-loader/lib/css-base.js ***!
  \***************************************/
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
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


/***/ }),
/* 14 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./fonts/simply.svg ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.svg";

/***/ }),
/* 15 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./fonts/simply.ttf ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/simply.ttf";

/***/ }),
/* 16 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./images/avatar.png ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/avatar.png";

/***/ }),
/* 17 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ../~/html-entities/index.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ 19),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ 18),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ 2),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ 2)
};


/***/ }),
/* 18 */
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
/* 19 */
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
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ../~/strip-ansi/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ 11)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ../~/style-loader/addStyles.js ***!
  \**************************************/
/***/ (function(module, exports) {

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
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
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
}

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
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
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
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
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
		update = updateLink.bind(null, styleElement);
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

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

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
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** ./fonts/simply.woff ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = "data:application/font-woff;base64,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"

/***/ }),
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ../~/webpack-hot-middleware/client-overlay.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
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
  dir: 'ltr'
};
for (var key in styles) {
  clientOverlay.style[key] = styles[key];
}

var ansiHTML = __webpack_require__(/*! ansi-html */ 10);
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

var Entities = __webpack_require__(/*! html-entities */ 17).AllHtmlEntities;
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
/* 24 */
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
/* 25 */
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
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************************************************!*\
  !*** multi webpack-hot-middleware/client?timeout=20000&reload=true ./scripts/main.js ./styles/main.scss ***!
  \**********************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack-hot-middleware/client?timeout=20000&reload=true */6);
__webpack_require__(/*! ./scripts/main.js */4);
module.exports = __webpack_require__(/*! ./styles/main.scss */5);


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map