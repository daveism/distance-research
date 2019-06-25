/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "02a964e87bd54eb189f1";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
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
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
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
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
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
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
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
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
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
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
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
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
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
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
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
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
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
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
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
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
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
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/drawstyles.js":
/*!***********************************!*\
  !*** ./src/scripts/drawstyles.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://github.com/NYCPlanning/labs-factfinder/blob/4a67da273b6ff87588f5044a15b3490d4ac07a25/app/layers/draw-styles.js
exports.default = [
// ACTIVE (being drawn)
// line stroke
{
  id: 'gl-draw-line',
  type: 'line',
  filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  },
  paint: {
    'line-color': '#D96B27',
    'line-dasharray': [0.2, 2],
    'line-width': 4
  }
},

// polygon fill
{
  id: 'gl-draw-polygon-fill',
  type: 'fill',
  filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
  paint: {
    'fill-color': '#D20C0C',
    'fill-outline-color': '#D20C0C',
    'fill-opacity': 0.1
  }
},

// polygon outline stroke
// This doesn't style the first edge of the polygon, which uses the line stroke styling instead
{
  id: 'gl-draw-polygon-stroke-active',
  type: 'line',
  filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  },
  paint: {
    'line-color': '#D96B27',
    'line-dasharray': [0.2, 2],
    'line-width': 4
  }
},
// vertex point halos
{
  id: 'gl-draw-polygon-and-line-vertex-halo-active',
  type: 'circle',
  filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
  paint: {
    'circle-radius': 7,
    'circle-color': '#FFF'
  }
},
// vertex points
{
  id: 'gl-draw-polygon-and-line-vertex-active',
  type: 'circle',
  filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
  paint: {
    'circle-radius': 6,
    'circle-color': '#D96B27'
  }
},

// radius label
{
  id: 'gl-draw-radius-label',
  type: 'symbol',
  filter: ['==', 'meta', 'currentPosition'],
  layout: {
    'text-field': '{radiusFeet} \n {radiusMiles}',
    'text-anchor': 'left',
    'text-offset': [1, 0],
    'text-size': 22
  },
  paint: {
    'text-color': 'rgba(0, 0, 0, 1)',
    'text-halo-color': 'rgba(255, 255, 255, 1)',
    'text-halo-width': 3,
    'icon-opacity': {
      base: 1,
      stops: [[7.99, 1], [8, 0]]
    },
    'text-halo-blur': 1
  }
},

// INACTIVE (static, already drawn)
// line stroke
{
  id: 'gl-draw-line-static',
  type: 'line',
  filter: ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  },
  paint: {
    'line-color': '#000',
    'line-width': 3
  }
},
// polygon fill
{
  id: 'gl-draw-polygon-fill-static',
  type: 'fill',
  filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
  paint: {
    'fill-color': '#000',
    'fill-outline-color': '#000',
    'fill-opacity': 0.1
  }
},
// polygon outline
{
  id: 'gl-draw-polygon-stroke-static',
  type: 'line',
  filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  },
  paint: {
    'line-color': '#000',
    'line-width': 3
  }
}];

/***/ }),

/***/ "./src/scripts/ga.js":
/*!***************************!*\
  !*** ./src/scripts/ga.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAnalytics = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = new _store.Store({});
var datapi = 'https://script.google.com/macros/s/AKfycbyn02FKtVokS_2GZlGtVWRHJ7OfEHn7YHHgGmdWZNE7M8MGmH4/exec';

var GoogleAnalytics = exports.GoogleAnalytics = function () {
  function GoogleAnalytics() {
    _classCallCheck(this, GoogleAnalytics);

    this.foo = {};
  }

  _createClass(GoogleAnalytics, [{
    key: 'setEvent',
    value: function setEvent() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var uuid = store.getStateItem('uuid');
      var date = new Date().toISOString();
      var data = label;

      var fooObj = this.foo; // eslint-disable-line
      gtag('event', uuid, { // eslint-disable-line
        event_category: category,
        event_label: label,
        value: '' + value,
        uuid: uuid
      });

      // since FF could be blocking ga writing data here as backup
      var jsondata = {
        uuid: uuid,
        category: category,
        data: data,
        date: date
      };

      var dataAPIURL = new URL(datapi);
      dataAPIURL.search = new URLSearchParams(jsondata);
      fetch(dataAPIURL);
    }
  }]);

  return GoogleAnalytics;
}();

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // import dependencies


var _fontawesomeSvgCore = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");

var _freeSolidSvgIcons = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");

var _freeRegularSvgIcons = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.es.js");

var _mapboxGl = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _mapboxGlDraw = __webpack_require__(/*! @mapbox/mapbox-gl-draw */ "./node_modules/@mapbox/mapbox-gl-draw/index.js");

var _mapboxGlDraw2 = _interopRequireDefault(_mapboxGlDraw);

var _mapboxGlGeocoder = __webpack_require__(/*! @mapbox/mapbox-gl-geocoder */ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/index.js");

var _mapboxGlGeocoder2 = _interopRequireDefault(_mapboxGlGeocoder);

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

var _radiusMode = __webpack_require__(/*! ./radiusMode */ "./src/scripts/radiusMode.js");

var _radiusMode2 = _interopRequireDefault(_radiusMode);

var _drawstyles = __webpack_require__(/*! ./drawstyles */ "./src/scripts/drawstyles.js");

var _drawstyles2 = _interopRequireDefault(_drawstyles);

var _ga = __webpack_require__(/*! ./ga */ "./src/scripts/ga.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = new _store.Store({});
var googleAnalytics = new _ga.GoogleAnalytics();

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas, _freeRegularSvgIcons.far);
_fontawesomeSvgCore.dom.watch();

function isMobileDevice() {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera); // eslint-disable-line
  return check;
}

var urlString = window.location.href;
var url = new URL(urlString);
var campaign = url.searchParams.get('camp');

// ga event action, category, label
googleAnalytics.setEvent('data', 'study started', 'true');

// ga event action, category, label
googleAnalytics.setEvent('data', 'campaign', campaign);

// ga event action, category, label
googleAnalytics.setEvent('data', 'mobile', isMobileDevice());

_mapboxGl2.default.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';

var map = new _mapboxGl2.default.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  // 'mapbox://styles/daveism/cjwrrdfd20uic1dnzsti2owlk', - dark
  center: [-98, 38.88], // starting position [lng, lat]
  zoom: 3, // starting zoom
  showZoom: true,
  touchEnabled: true,
  keybindings: true
});

// setup map
var drawControl = new _mapboxGlDraw2.default({
  displayControlsDefault: true,
  controls: {
    rectangle: true,
    polygon: true,
    line_string: true,
    trash: true
  },
  options: {
    touchEnabled: true,
    keybindings: true,
    touchBuffer: 10
  },
  styles: _drawstyles2.default,
  modes: Object.assign({
    draw_radius: _radiusMode2.default
  }, _mapboxGlDraw2.default.modes)
});

map.addControl(drawControl);

var nav = new _mapboxGl2.default.NavigationControl();
map.addControl(nav, 'top-left');

var geocoder = new _mapboxGlGeocoder2.default({
  accessToken: _mapboxGl2.default.accessToken,
  mapboxgl: _mapboxGl2.default,
  setZoom: 8,
  flyTo: false,
  placeholder: 'Search for a location...'
});

map.on('zoomend', function () {
  if (map.getZoom() > 10) {
    var circleButtonElem = document.getElementById('circle-button');
    if (circleButtonElem.classList.contains('disabled')) {
      circleButtonElem.classList.remove('disabled');
      $('#circle-button').tooltip({ trigger: 'manual' });
      $('#circle-button').tooltip('hide');
      $('#circle-button').tooltip('disable');
      $('#circle-button').tooltip('dispose');
      document.getElementById('step2-title').classList.remove('disabled');
      document.getElementById('step2-directions').classList.remove('disabled');
    }
  }
});

// function
function handleAgreeClick() {
  document.getElementById('study-progress').classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');
  document.getElementById('study-dissaggree').remove();
  store.setStateItem('study-agreement', true);
  // document.getElementById('map-action-holder').classList.remove('h-80');
  // document.getElementById('map-action-holder').classList.add('h-70');

  document.getElementById('map-action-holder').classList.remove('start-height-actions');
  document.getElementById('map-holder').classList.remove('start-height-map');

  document.getElementById('map-action-holder').classList.add('step-height-actions');
  document.getElementById('map-holder').classList.add('step-height-map');
  map.resize();
  // ga event action, category, label
  googleAnalytics.setEvent('data', 'study-agreement', true);
  return null;
}

function handleDissagreeClick() {
  document.getElementById('study-progress').classList.remove('d-none');
  document.getElementById('study-dissaggree').classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');
  document.getElementById('study-progress').remove();
  store.setStateItem('study-agreement', false);
  // ga event action, category, label
  googleAnalytics.setEvent('data', 'study-agreement', false);

  return null;
}

// ensure the object or variable is valid...
// @param obj - typeless
function checkValidObject(obj) {
  if (obj === undefined || obj === null) {
    return false;
  }
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Object.keys(obj).length === 0) {
    return false;
  }
  if (typeof obj === 'string' && obj.length === 0) {
    return false;
  }

  return true;
}

function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join('-');
}

function handleDrawButtonClick(e) {
  var circleButtonElem = document.getElementById('' + e.target.id);
  if (circleButtonElem) {
    if (circleButtonElem.classList.contains('disabled')) {
      $('#' + e.target.id).tooltip({ trigger: 'hover focus' });
      $('#' + e.target.id).tooltip('show');
      return null;
    } else {
      // eslint-disable-line
      $('#' + e.target.id).tooltip({ trigger: 'manual' });
      $('#' + e.target.id).tooltip('hide');
      $('#' + e.target.id).tooltip('disable');
      $('#' + e.target.id).tooltip('dispose');
    }
  }

  drawControl.trash();

  if (map.getLayer('circle-line')) {
    map.removeLayer('circle-line');
  }

  if (map.getLayer('circle-fill')) {
    map.removeLayer('circle-fill');
  }
  if (map.getSource('circle')) {
    map.removeSource('circle');
  }

  drawControl.changeMode('draw_radius');
  return null;
}

// check study session state for completetion
var isStudycompleted = store.getStateItem('studycompleted');
var studyCompleted = false;
if (typeof isStudycompleted === 'boolean') {
  studyCompleted = isStudycompleted;
} else {
  studyCompleted = false;
}

// check study session state for completetion
var StudyAgrreement = store.getStateItem('study-agreement');
var studyAgrreed = false;
if (typeof StudyAgrreement === 'boolean') {
  studyAgrreed = StudyAgrreement;
} else {
  studyAgrreed = false;
}

// already agreed
if (studyAgrreed) {}
// handleAgreeClick();


// hide study
if (studyCompleted) {
  // || studyAgrreed
  handleAgreeClick();

  var distancekm = store.getStateItem('distancekm');
  var distancemeters = store.getStateItem('distancemeters');
  var distancefeet = store.getStateItem('distancefeet');
  var distancemiles = store.getStateItem('distancemiles');
  var studydistancequestion = store.getStateItem('studydistancequestion');

  document.getElementById('study-complete-question').innerHTML = '' + studydistancequestion;
  document.getElementById('study-complete-miles').innerHTML = distancemiles.toFixed(2) + ' miles or';
  document.getElementById('study-complete-feet').innerHTML = distancefeet.toFixed(2) + ' feet or';
  document.getElementById('study-complete-km').innerHTML = distancekm.toFixed(2) + ' kilometers or';
  document.getElementById('study-complete-meters').innerHTML = distancemeters.toFixed(2) + ' meters.';

  document.getElementById('study-complete').classList.remove('d-none');
  document.getElementById('study-progress').remove();
  document.getElementById('map-holder').remove();
  document.getElementById('study-agreement-all').remove();
  document.getElementById('map-action-holder').className = 'col-12'; // eslint-disable-line
} else {
  // document.getElementById('study-progress').classList.remove('d-none');
  store.setStateItem('studycompleted', false);
}

if (!checkValidObject(store.getStateItem('uuid'))) {
  store.setStateItem('uuid', uuid());
}

geocoder.on('result', function (e) {
  var x = e.result.center[0];
  var y = e.result.center[1];

  // ga event action, category, label
  googleAnalytics.setEvent('data', 'searchpoint', x + ', ' + y);

  var offsetdist = 0.0025;
  var bbox = [[x - offsetdist, y - offsetdist], [x + offsetdist, y + offsetdist]];

  // create random zoom incase users are influenced by intial zoomlevel
  var min = 10;
  var max = 14;
  if (isMobileDevice()) {
    min = 10;
    max = 15;
  }

  var zm = Math.floor(Math.random() * (max - min + 1) + min);
  map.fitBounds(bbox, { maxZoom: zm });

  // ga event action, category, label
  googleAnalytics.setEvent('data', 'searchzoom', zm);

  var circleButtonElem = document.getElementById('circle-button');
  if (circleButtonElem.classList.contains('disabled')) {
    circleButtonElem.classList.remove('disabled');
    $('#circle-button').tooltip({ trigger: 'manual' });
    $('#circle-button').tooltip('hide');
    $('#circle-button').tooltip('disable');
    $('#circle-button').tooltip('dispose');
    document.getElementById('step2-title').classList.remove('disabled');
    document.getElementById('step2-directions').classList.remove('disabled');

    document.getElementById('step-1').classList.add('step-not-vis');
    document.getElementById('step-2').classList.remove('step-not-vis');
  }
});

var geocodeElem = document.getElementById('geocoder');
if (geocodeElem) {
  geocodeElem.appendChild(geocoder.onAdd(map));

  geocodeElem.addEventListener('touchstart', function (e) {
    // e.preventDefault();
    geocodeElem.classList.remove('expand');
    geocodeElem.classList.add('expand');
  });
}

var suggestionsElem = document.querySelector('#geocoder .suggestions-wrapper');
if (suggestionsElem) {
  suggestionsElem.addEventListener('touchstart', function (e) {
    var geocodeElem = document.getElementById('geocoder'); // eslint-disable-line
    geocodeElem.classList.remove('expand');
  });
}

var drawCircleElement = document.querySelector('.btn-draw-circle');
if (drawCircleElement) {
  drawCircleElement.addEventListener('click', handleDrawButtonClick);
}

var reDrawCircleElement = document.querySelector('.btn-redraw-circle');
if (reDrawCircleElement) {
  reDrawCircleElement.addEventListener('click', handleDrawButtonClick);
}

function handleStepNavClick(e) {
  var valNode = e.target.getAttributeNode('val'); // eslint-disable-line
  if (valNode) {
    var _geocodeElem = document.getElementById('geocoder'); // eslint-disable-line
    if (_geocodeElem) {
      _geocodeElem.classList.remove('expand');
    }

    document.getElementById('step-1').classList.remove('step-not-vis');
    document.getElementById('step-2').classList.remove('step-not-vis');
    document.getElementById('step-3').classList.remove('step-not-vis');
    document.getElementById('step-1').classList.add('step-not-vis');
    document.getElementById('step-2').classList.add('step-not-vis');
    document.getElementById('step-3').classList.add('step-not-vis');
    var value = e.target.getAttributeNode('val').value; // eslint-disable-line
    document.getElementById('' + value).classList.remove('step-not-vis');
  }
}

var stepNav1Elem = document.getElementById('step-nav-1');
if (stepNav1Elem) {
  stepNav1Elem.addEventListener('click', handleStepNavClick);
}

var mainContentElem = document.getElementById('main-content'); // eslint-disable-line
if (mainContentElem) {
  mainContentElem.addEventListener('click', function (e) {
    if (!e.target.classList.contains('mapboxgl-ctrl-geocoder--input')) {
      var _geocodeElem2 = document.getElementById('geocoder'); // eslint-disable-line
      if (_geocodeElem2) {
        _geocodeElem2.classList.remove('expand');
      }
    }
  });
}

var stepNav2Elem = document.getElementById('step-nav-2');
if (stepNav2Elem) {
  stepNav2Elem.addEventListener('click', handleStepNavClick);
}

var stepNav3Elem = document.getElementById('step-nav-3');
if (stepNav3Elem) {
  stepNav3Elem.addEventListener('click', handleStepNavClick);
}

function handleSubmitButtonClick(e) {
  var submitButtonElem = document.getElementById('submit-button');
  if (submitButtonElem.classList.contains('disabled')) {
    $('#submit-button').tooltip({ trigger: 'hover focus' });
    $('#submit-button').tooltip('show');
    return null;
  } else {
    // eslint-disable-line
    $('#submit-button').tooltip({ trigger: 'manual' });
    $('#submit-button').tooltip('hide');
    $('#submit-button').tooltip('disable');
    $('#submit-button').tooltip('dispose');

    var circle = store.getStateItem('circle');
    var line = store.getStateItem('line');
    var _distancekm = store.getStateItem('distancekm');
    var _distancemeters = store.getStateItem('distancemeters');
    var _distancefeet = store.getStateItem('distancefeet');
    var _distancemiles = store.getStateItem('distancemiles');
    var _studydistancequestion = store.getStateItem('studydistancequestion');

    // ga event action, category, label
    googleAnalytics.setEvent('data', 'circle-submitted', circle);
    googleAnalytics.setEvent('data', 'line-submitted', line);
    googleAnalytics.setEvent('data', 'distancekm-submitted', _distancekm);
    googleAnalytics.setEvent('data', 'distancefeet-submitted', _distancefeet);
    googleAnalytics.setEvent('data', 'distancemeters-submitted', _distancemeters);
    googleAnalytics.setEvent('data', 'distancemiles-submitted', _distancemiles);

    document.getElementById('study-complete-question').innerHTML = '' + _studydistancequestion;
    document.getElementById('study-complete-miles').innerHTML = _distancemiles.toFixed(2) + ' miles or';
    document.getElementById('study-complete-feet').innerHTML = _distancefeet.toFixed(2) + ' feet or';
    document.getElementById('study-complete-km').innerHTML = _distancekm.toFixed(2) + ' kilometers or';
    document.getElementById('study-complete-meters').innerHTML = _distancemeters.toFixed(2) + ' meters.';

    // end study
    document.getElementById('study-complete').classList.remove('d-none');
    document.getElementById('study-progress').remove();
    document.getElementById('map-holder').remove();
    document.getElementById('study-agreement-all').remove();
    document.getElementById('map-action-holder').className = 'col-12'; // eslint-disable-line
    store.setStateItem('studycompleted', true);

    // ga event action, category, label
    googleAnalytics.setEvent('data', 'studycompleted', true);
  }
  return null;
}

var submitButtonElem = document.getElementById('submit-button');
if (submitButtonElem) {
  submitButtonElem.addEventListener('click', handleSubmitButtonClick);
}

var directionsOne = ['Search for a location you care about.', 'Search for a location to find about crime.', 'Search for a location to find about the closest pizza place.'];

var minOne = 0;
var maxOne = 2;
var messageIndexOne = Math.floor(Math.random() * (maxOne - minOne + 1) + minOne);
var stepDirections1 = document.getElementById('step1-directions');
if (stepDirections1) {
  stepDirections1.innerHTML = directionsOne[messageIndexOne];
}

// ga event action, category, label
googleAnalytics.setEvent('data', 'step1text', directionsOne[messageIndexOne]);

var directionsTwo = ['Draw a circle that represents 1 mile.', 'Draw a circle that represents a 5-minute <strong>DRIVE</strong>.', 'Draw a circle that represents a 5-minute <strong>WALK</strong>.'];

var minTwo = 0;
var maxTwo = 2;
var messageIndexTwo = Math.floor(Math.random() * (maxTwo - minTwo + 1) + minTwo);
var stepDirections2 = document.getElementById('step2-directions');
if (stepDirections2) {
  stepDirections2.innerHTML = directionsTwo[messageIndexTwo];
}

// ga event action, category, label
googleAnalytics.setEvent('data', 'step2text', directionsTwo[messageIndexTwo]);
store.setStateItem('studydistancequestion', directionsTwo[messageIndexTwo]);

var aggreeButtonElement = document.getElementById('aggree-button');
if (aggreeButtonElement) {
  aggreeButtonElement.addEventListener('click', handleAgreeClick);
}

var dissaggreeButtonElement = document.getElementById('diaggree-button');
if (dissaggreeButtonElement) {
  dissaggreeButtonElement.addEventListener('click', handleDissagreeClick);
}

var step2MinorDirectionsElement = document.getElementById('step2-minor-directions');
if (step2MinorDirectionsElement) {
  if (isMobileDevice()) {
    step2MinorDirectionsElement.innerHTML = 'Click on the map, then drag your finger across the map until the circle best represents the distance.';
  }
}

/***/ }),

/***/ "./src/scripts/radiusMode.js":
/*!***********************************!*\
  !*** ./src/scripts/radiusMode.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapboxGlDraw = __webpack_require__(/*! @mapbox/mapbox-gl-draw */ "./node_modules/@mapbox/mapbox-gl-draw/index.js");

var _mapboxGlDraw2 = _interopRequireDefault(_mapboxGlDraw);

var _numeral = __webpack_require__(/*! numeral */ "./node_modules/numeral/numeral.js");

var _numeral2 = _interopRequireDefault(_numeral);

var _lineDistance = __webpack_require__(/*! @turf/line-distance */ "./node_modules/@turf/line-distance/index.js");

var _lineDistance2 = _interopRequireDefault(_lineDistance);

var _ga = __webpack_require__(/*! ./ga */ "./src/scripts/ga.js");

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = new _store.Store({}); // https://gist.github.com/chriswhong/694779bc1f1e5d926e47bab7205fa559
// custom mapbopx-gl-draw mode that modifies draw_line_string
// shows a center point, radius line, and circle polygon while drawing
// forces draw.create on creation of second vertex

var RadiusMode = _mapboxGlDraw2.default.modes.draw_line_string;
var googleAnalytics = new _ga.GoogleAnalytics();

// store.setStateItem('isTouchMove', true);

function createVertex(parentId, coordinates, path, selected) {
  return {
    type: 'Feature',
    properties: {
      meta: 'vertex',
      parent: parentId,
      coord_path: path,
      active: selected ? 'true' : 'false'
    },
    geometry: {
      type: 'Point',
      coordinates: coordinates
    }
  };
}

// create a circle-like polygon given a center point and radius
// https://stackoverflow.com/questions/37599561/drawing-a-circle-with-the-radius-in-miles-meters-with-mapbox-gl-js/39006388#39006388
function createGeoJSONCircle(center, radiusInKm, parentId) {
  var points = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 64;

  var coords = {
    latitude: center[1],
    longitude: center[0]
  };

  var km = radiusInKm;

  var ret = [];
  var distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
  var distanceY = km / 110.574;

  var theta = void 0;
  var x = void 0;
  var y = void 0;
  for (var i = 0; i < points; i += 1) {
    theta = i / points * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [ret]
    },
    properties: {
      parent: parentId,
      active: 'true'
    }
  };
}

function getDisplayMeasurements(feature) {
  // should log both metric and standard display strings for the current drawn feature
  // metric calculation
  var drawnLength = (0, _lineDistance2.default)(feature) * 1000; // meters

  var metricUnits = 'm';
  var metricFormat = '0,0';
  var metricMeasurement = void 0;

  var standardUnits = 'feet';
  var standardFormat = '0,0';
  var standardMeasurement = void 0;

  metricMeasurement = drawnLength;
  if (drawnLength >= 1000) {
    // if over 1000 meters, upgrade metric
    metricMeasurement = drawnLength / 1000;
    metricUnits = 'km';
    metricFormat = '0.00';
  }

  standardMeasurement = drawnLength * 3.28084;
  if (standardMeasurement >= 5280) {
    // if over 5280 feet, upgrade standard
    standardMeasurement /= 5280;
    standardUnits = 'mi';
    standardFormat = '0.00';
  }

  var displayMeasurements = {
    metric: (0, _numeral2.default)(metricMeasurement).format(metricFormat) + ' ' + metricUnits,
    standard: (0, _numeral2.default)(standardMeasurement).format(standardFormat) + ' ' + standardUnits
  };

  return displayMeasurements;
}

var doubleClickZoom = {
  enable: function enable(ctx) {
    setTimeout(function () {
      // First check we've got a map and some context.
      if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx || !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) return;
      // Now check initial state wasn't false (we leave it disabled if so)
      if (!ctx._ctx.store.getInitialConfigValue('doubleClickZoom')) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  }
};

// Whenever a user clicks on a key while focused on the map, it will be sent here
RadiusMode.onKeyUp = function onKeyUp(state, e) {
  if (e.keyCode === 27) {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode('simple_select', {}, { silent: true });
  }
};

// for mobile touch move in mobile there is no click
// since it would provide no feedback to user
function onTouchMoveDraw(state, e) {
  if (state.currentVertexPosition === 1) {
    state.line.removeCoordinate('2');
    state.line.addCoordinate(2, e.lngLat.lng, e.lngLat.lat);
    return null;
  }

  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  if (state.direction === 'forward') {
    state.currentVertexPosition += 1; // eslint-disable-line
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }
  return null;
}

// for desktop clicks
function interactiveDraw(state, e, eventType, self) {
  if (state.currentVertexPosition === 1) {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
    return self.changeMode('simple_select', { featureIds: [state.line.id] });
  }

  self.updateUIClasses({ mouse: 'add' });

  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  if (state.direction === 'forward') {
    state.currentVertexPosition += 1; // eslint-disable-line
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }

  return null;
}

RadiusMode.onTouchStart = function onTouchStart(state, e) {
  e.preventDefault();
  return null;
};

RadiusMode.onTouchMove = function onTouchMove(state, e) {
  // console.log('onTouchMove')
  e.preventDefault();
  return onTouchMoveDraw(state, e);
};

RadiusMode.onTouchEnd = function onTouchEnd(state, e) {
  // console.log('onTouchEnd')
  e.preventDefault();
  return interactiveDraw(state, e, 'onTouchEnd', this);
};

RadiusMode.clickAnywhere = function clickAnywhere(state, e) {
  // console.log('clickAnywhere')
  e.preventDefault();
  return interactiveDraw(state, e, 'mouse', this);
};

// creates the final geojson point feature with a radius property
// triggers draw.create
RadiusMode.onStop = function onStop(state) {
  doubleClickZoom.enable(this);
  // console.log('onStop')
  this.activateUIButton();

  // check to see if we've deleted this feature
  if (this.getFeature(state.line.id) === undefined) return;

  // remove last added coordinate
  state.line.removeCoordinate('0');
  if (state.line.isValid()) {
    var lineGeoJson = state.line.toGeoJSON();
    var startPoint = lineGeoJson.geometry.coordinates[0];
    var distance = (0, _lineDistance2.default)(lineGeoJson);

    var circleGeoJSON = createGeoJSONCircle(startPoint, distance, null, 32);
    var feet = distance * 1000 * 3.28084;
    store.setStateItem('circle', JSON.stringify(circleGeoJSON));
    store.setStateItem('line', JSON.stringify(lineGeoJson));
    store.setStateItem('distancekm', distance);
    store.setStateItem('distancemeters', distance * 1000);
    store.setStateItem('distancefeet', feet);
    store.setStateItem('distancemiles', feet / 5280);

    // ga event action, category, label
    googleAnalytics.setEvent('data', 'circle-presubmit', JSON.stringify(circleGeoJSON));
    googleAnalytics.setEvent('data', 'line-presubmit', JSON.stringify(lineGeoJson));
    googleAnalytics.setEvent('data', 'distancekm-presubmit', distance);
    googleAnalytics.setEvent('data', 'distancemeters-presubmit', distance * 1000);
    googleAnalytics.setEvent('data', 'distancefeet-presubmit', feet);
    googleAnalytics.setEvent('data', 'distancemiles-presubmit', feet / 5280);
    var innerWidth = window.innerWidth; // eslint-disable-line
    var innerHeight = window.innerHeight; // eslint-disable-line
    var availWidth = window.screen.availWidth; // eslint-disable-line
    var availHeight = window.screen.availHeight; // eslint-disable-line
    var heightJSON = {
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      availWidth: availWidth,
      availHeight: availHeight
    };

    googleAnalytics.setEvent('data', 'presubmit-screen', JSON.stringify(heightJSON));
    googleAnalytics.setEvent('data', 'presubmit-zoom', this.map.getZoom());

    var submitButtonElem = document.getElementById('submit-button');
    if (submitButtonElem) {
      submitButtonElem.classList.remove('disabled');
      submitButtonElem.classList.remove('disabled');

      document.getElementById('step-2').classList.add('step-not-vis');
      document.getElementById('step-3').classList.remove('step-not-vis');
    }

    var circle2ButtonElem = document.getElementById('circle-button2');
    if (circle2ButtonElem) {
      circle2ButtonElem.classList.remove('disabled');
      $('#circle-button2').tooltip('hide');
      $('#circle-button2').tooltip('disable');
      $('#circle-button2').tooltip('dispose');
    }

    // reconfigure the geojson line into a geojson point with a radius property
    var pointWithRadius = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: circleGeoJSON.geometry.coordinates
      },
      properties: {
        radiusMetric: (0, _lineDistance2.default)(lineGeoJson).toFixed(1),
        radiusFeet: feet
      }
    };

    if (this.map.getLayer('circle-line')) {
      this.map.removeLayer('circle-line');
    }

    if (this.map.getLayer('circle-fill')) {
      this.map.removeLayer('circle-fill');
    }
    if (this.map.getSource('circle')) {
      this.map.removeSource('circle');
    }

    this.map.addSource('circle', {
      type: 'geojson',
      data: pointWithRadius
    });

    this.map.addLayer({
      id: 'circle-fill',
      type: 'fill',
      source: 'circle',
      paint: {
        'fill-color': '#D20C0C',
        'fill-outline-color': '#D20C0C',
        'fill-opacity': 0.1
      }
    });

    this.map.addLayer({
      id: 'circle-line',
      type: 'line',
      source: 'circle',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#D96B27',
        'line-dasharray': [0.2, 2],
        'line-width': 4
      }
    });

    this.map.fire('draw.create', {
      features: [pointWithRadius]
    });
  } else {
    this.deleteFeature([state.line.id], { silent: true });
    this.changeMode('simple_select', {}, { silent: true });
  }
};

RadiusMode.toDisplayFeatures = function toDisplayFeatures(state, geojson, display) {
  var isActiveLine = geojson.properties.id === state.line.id;

  geojson.properties.active = isActiveLine ? 'true' : 'false'; // eslint-disable-line
  if (!isActiveLine) return display(geojson);

  // Only render the line if it has at least one real coordinate
  if (geojson.geometry.coordinates.length < 2) return null;
  geojson.properties.meta = 'feature'; // eslint-disable-line

  // displays center vertex as a point feature
  display(createVertex(state.line.id, geojson.geometry.coordinates[state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1], '' + (state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1), false));

  // displays the line as it is drawn
  display(geojson);

  var displayMeasurements = getDisplayMeasurements(geojson);

  // create custom feature for the current pointer position
  var currentVertex = {
    type: 'Feature',
    properties: {
      meta: 'currentPosition',
      active: 'true',
      radiusMetric: displayMeasurements.metric,
      radiusStandard: displayMeasurements.standard,
      parent: state.line.id
    },
    geometry: {
      type: 'Point',
      coordinates: geojson.geometry.coordinates[1]
    }
  };
  display(currentVertex);

  // create custom feature for radius circlemarker
  var center = geojson.geometry.coordinates[0];
  var radiusInKm = (0, _lineDistance2.default)(geojson, 'kilometers');
  var circleFeature = createGeoJSONCircle(center, radiusInKm, state.line.id);
  circleFeature.properties.meta = 'radius';

  display(circleFeature);
  return null;
};

exports.default = RadiusMode;

/***/ }),

/***/ "./src/scripts/store.js":
/*!******************************!*\
  !*** ./src/scripts/store.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { StorageAPI } from './localStorageAPI';

/**
* This component is intended to handle the storage and retrieval of the state of
* As of this writing it is using localStorage to do this.
* Uses simple class instance methods with the short-hand method declaration
* pattern.
*
* To note: There is a difference between the Store and the State. As of 0a3106e
* the Store is a String saved to the browsers localStorage and is a serialized
* version of the State. The State is an Object which is interacted with by
* parsing the State string from the Store, modifying the results of the parse,
* and re-serializing it back to the Store.
*/
var STATE_KEY = 'state';

var Store = exports.Store = function () {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  function Store() {
    _classCallCheck(this, Store);

    // this.state = state;
    // this.store = new StorageAPI();
    if (Store.storageAvailable()) {
      this.storage = window.localStorage;
      this.state = {};
      if (this.checkStateExists) {
        this.state = this.getState();
      } else {
        this.state = { STATE_KEY: STATE_KEY };
      }
    }
  }

  // Sets a key/value pair to the storage provider, primarily used later in the composed functions
  //
  // @param key | string
  // @param value | string


  _createClass(Store, [{
    key: 'setStateItem',
    value: function setStateItem() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var storeObj = _defineProperty({}, key, value);
      var newStateObj = _extends({}, this.getState(), storeObj);
      this.setState(newStateObj);
    }

    // Gets the entire state object
    //
    // @return object

  }, {
    key: 'getState',
    value: function getState() {
      return this.checkStateExists() ? JSON.parse(this.getItem(STATE_KEY)) : {};
    }

    // Gets an item from the storage provider, primarily used later in the composed functions
    //
    // @param key | string
    // @return string

  }, {
    key: 'getItem',
    value: function getItem() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.storage.getItem(STATE_KEY);
    }

    // G
    // Gets an item from the storage provider, primarily used later in the composed functions
    //
    // @param key | string
    // @return string

  }, {
    key: 'getStateItem',
    value: function getStateItem() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.checkItem(key) ? this.getState()[key] : {};
      // this.storage.getItem(key);
    }

    // Sets a new state object state
    //
    // @param value | string

  }, {
    key: 'setState',
    value: function setState() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.storage.setItem(STATE_KEY, JSON.stringify(value));
    }

    // Checks if the state exists in the storage provider

  }, {
    key: 'checkStateExists',
    value: function checkStateExists() {
      return Boolean(this.getItem(STATE_KEY));
    }

    // Gets the state from the storage provider
    //
    // @return string

  }, {
    key: 'getStateAsString',
    value: function getStateAsString() {
      return this.getItem(STATE_KEY);
    }

    // Check if an item has been saved to the store
    // unused as of 0a3106e
    //
    // @param item - string
    // @return boolean

  }, {
    key: 'isStateItemExist',
    value: function isStateItemExist(item) {
      if (this.checkStateExists()) {
        var stateStr = this.getStateAsString();
        if (stateStr.indexOf(item) > 0) {
          return true;
        }
      }
      return false;
    }

    //
    // @param item - string
    // @return boolean

  }, {
    key: 'checkItem',
    value: function checkItem(item) {
      return this.checkStateExists() && this.getStateAsString().indexOf(item) > 0;
    }

    // Check if localStorage available.
    // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    //
    // @return boolean

  }], [{
    key: 'storageAvailable',
    value: function storageAvailable() {
      var type = 'localStorage';
      var storage = void 0;
      try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
      }
    }
  }]);

  return Store;
}();

/***/ }),

/***/ 0:
/*!***************************************************!*\
  !*** multi babel-polyfill ./src/scripts/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */"./node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__(/*! /Users/daveism/Github/distance-research/src/scripts/index.js */"./src/scripts/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZHJhd3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yYWRpdXNNb2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0b3JlLmpzIl0sIm5hbWVzIjpbImlkIiwidHlwZSIsImZpbHRlciIsImxheW91dCIsInBhaW50IiwiYmFzZSIsInN0b3BzIiwic3RvcmUiLCJTdG9yZSIsImRhdGFwaSIsIkdvb2dsZUFuYWx5dGljcyIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJ2YWx1ZSIsInV1aWQiLCJnZXRTdGF0ZUl0ZW0iLCJkYXRlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGF0YSIsImZvb09iaiIsImd0YWciLCJldmVudF9jYXRlZ29yeSIsImV2ZW50X2xhYmVsIiwianNvbmRhdGEiLCJkYXRhQVBJVVJMIiwiVVJMIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZmV0Y2giLCJnb29nbGVBbmFseXRpY3MiLCJsaWJyYXJ5IiwiYWRkIiwiZmFzIiwiZmFyIiwiZG9tIiwid2F0Y2giLCJpc01vYmlsZURldmljZSIsImNoZWNrIiwiYSIsInRlc3QiLCJzdWJzdHIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZW5kb3IiLCJ3aW5kb3ciLCJvcGVyYSIsInVybFN0cmluZyIsImxvY2F0aW9uIiwiaHJlZiIsInVybCIsImNhbXBhaWduIiwic2VhcmNoUGFyYW1zIiwiZ2V0Iiwic2V0RXZlbnQiLCJtYXBib3hnbCIsImFjY2Vzc1Rva2VuIiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJjZW50ZXIiLCJ6b29tIiwic2hvd1pvb20iLCJ0b3VjaEVuYWJsZWQiLCJrZXliaW5kaW5ncyIsImRyYXdDb250cm9sIiwiTWFwYm94RHJhdyIsImRpc3BsYXlDb250cm9sc0RlZmF1bHQiLCJjb250cm9scyIsInJlY3RhbmdsZSIsInBvbHlnb24iLCJsaW5lX3N0cmluZyIsInRyYXNoIiwib3B0aW9ucyIsInRvdWNoQnVmZmVyIiwic3R5bGVzIiwiZHJhd1N0eWxlcyIsIm1vZGVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZHJhd19yYWRpdXMiLCJSYWRpdXNNb2RlIiwiYWRkQ29udHJvbCIsIm5hdiIsIk5hdmlnYXRpb25Db250cm9sIiwiZ2VvY29kZXIiLCJNYXBib3hHZW9jb2RlciIsInNldFpvb20iLCJmbHlUbyIsInBsYWNlaG9sZGVyIiwib24iLCJnZXRab29tIiwiY2lyY2xlQnV0dG9uRWxlbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsIiQiLCJ0b29sdGlwIiwidHJpZ2dlciIsImhhbmRsZUFncmVlQ2xpY2siLCJzZXRTdGF0ZUl0ZW0iLCJyZXNpemUiLCJoYW5kbGVEaXNzYWdyZWVDbGljayIsImNoZWNrVmFsaWRPYmplY3QiLCJvYmoiLCJ1bmRlZmluZWQiLCJrZXlzIiwibGVuZ3RoIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiaGFuZGxlRHJhd0J1dHRvbkNsaWNrIiwiZSIsInRhcmdldCIsImdldExheWVyIiwicmVtb3ZlTGF5ZXIiLCJnZXRTb3VyY2UiLCJyZW1vdmVTb3VyY2UiLCJjaGFuZ2VNb2RlIiwiaXNTdHVkeWNvbXBsZXRlZCIsInN0dWR5Q29tcGxldGVkIiwiU3R1ZHlBZ3JyZWVtZW50Iiwic3R1ZHlBZ3JyZWVkIiwiZGlzdGFuY2VrbSIsImRpc3RhbmNlbWV0ZXJzIiwiZGlzdGFuY2VmZWV0IiwiZGlzdGFuY2VtaWxlcyIsInN0dWR5ZGlzdGFuY2VxdWVzdGlvbiIsImlubmVySFRNTCIsInRvRml4ZWQiLCJjbGFzc05hbWUiLCJ4IiwicmVzdWx0IiwieSIsIm9mZnNldGRpc3QiLCJiYm94IiwibWluIiwibWF4Iiwiem0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJmaXRCb3VuZHMiLCJtYXhab29tIiwiZ2VvY29kZUVsZW0iLCJhcHBlbmRDaGlsZCIsIm9uQWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN1Z2dlc3Rpb25zRWxlbSIsInF1ZXJ5U2VsZWN0b3IiLCJkcmF3Q2lyY2xlRWxlbWVudCIsInJlRHJhd0NpcmNsZUVsZW1lbnQiLCJoYW5kbGVTdGVwTmF2Q2xpY2siLCJ2YWxOb2RlIiwiZ2V0QXR0cmlidXRlTm9kZSIsInN0ZXBOYXYxRWxlbSIsIm1haW5Db250ZW50RWxlbSIsInN0ZXBOYXYyRWxlbSIsInN0ZXBOYXYzRWxlbSIsImhhbmRsZVN1Ym1pdEJ1dHRvbkNsaWNrIiwic3VibWl0QnV0dG9uRWxlbSIsImNpcmNsZSIsImxpbmUiLCJkaXJlY3Rpb25zT25lIiwibWluT25lIiwibWF4T25lIiwibWVzc2FnZUluZGV4T25lIiwic3RlcERpcmVjdGlvbnMxIiwiZGlyZWN0aW9uc1R3byIsIm1pblR3byIsIm1heFR3byIsIm1lc3NhZ2VJbmRleFR3byIsInN0ZXBEaXJlY3Rpb25zMiIsImFnZ3JlZUJ1dHRvbkVsZW1lbnQiLCJkaXNzYWdncmVlQnV0dG9uRWxlbWVudCIsInN0ZXAyTWlub3JEaXJlY3Rpb25zRWxlbWVudCIsImRyYXdfbGluZV9zdHJpbmciLCJjcmVhdGVWZXJ0ZXgiLCJwYXJlbnRJZCIsImNvb3JkaW5hdGVzIiwicGF0aCIsInNlbGVjdGVkIiwicHJvcGVydGllcyIsIm1ldGEiLCJwYXJlbnQiLCJjb29yZF9wYXRoIiwiYWN0aXZlIiwiZ2VvbWV0cnkiLCJjcmVhdGVHZW9KU09OQ2lyY2xlIiwicmFkaXVzSW5LbSIsInBvaW50cyIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwia20iLCJyZXQiLCJkaXN0YW5jZVgiLCJjb3MiLCJQSSIsImRpc3RhbmNlWSIsInRoZXRhIiwiaSIsInNpbiIsInB1c2giLCJnZXREaXNwbGF5TWVhc3VyZW1lbnRzIiwiZmVhdHVyZSIsImRyYXduTGVuZ3RoIiwibWV0cmljVW5pdHMiLCJtZXRyaWNGb3JtYXQiLCJtZXRyaWNNZWFzdXJlbWVudCIsInN0YW5kYXJkVW5pdHMiLCJzdGFuZGFyZEZvcm1hdCIsInN0YW5kYXJkTWVhc3VyZW1lbnQiLCJkaXNwbGF5TWVhc3VyZW1lbnRzIiwibWV0cmljIiwiZm9ybWF0Iiwic3RhbmRhcmQiLCJkb3VibGVDbGlja1pvb20iLCJlbmFibGUiLCJjdHgiLCJzZXRUaW1lb3V0IiwiX2N0eCIsImdldEluaXRpYWxDb25maWdWYWx1ZSIsIm9uS2V5VXAiLCJzdGF0ZSIsImtleUNvZGUiLCJkZWxldGVGZWF0dXJlIiwic2lsZW50Iiwib25Ub3VjaE1vdmVEcmF3IiwiY3VycmVudFZlcnRleFBvc2l0aW9uIiwicmVtb3ZlQ29vcmRpbmF0ZSIsImFkZENvb3JkaW5hdGUiLCJsbmdMYXQiLCJsbmciLCJsYXQiLCJ1cGRhdGVDb29yZGluYXRlIiwiZGlyZWN0aW9uIiwiaW50ZXJhY3RpdmVEcmF3IiwiZXZlbnRUeXBlIiwic2VsZiIsImZlYXR1cmVJZHMiLCJ1cGRhdGVVSUNsYXNzZXMiLCJtb3VzZSIsIm9uVG91Y2hTdGFydCIsInByZXZlbnREZWZhdWx0Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwiY2xpY2tBbnl3aGVyZSIsIm9uU3RvcCIsImFjdGl2YXRlVUlCdXR0b24iLCJnZXRGZWF0dXJlIiwiaXNWYWxpZCIsImxpbmVHZW9Kc29uIiwidG9HZW9KU09OIiwic3RhcnRQb2ludCIsImRpc3RhbmNlIiwiY2lyY2xlR2VvSlNPTiIsImZlZXQiLCJKU09OIiwic3RyaW5naWZ5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYXZhaWxXaWR0aCIsInNjcmVlbiIsImF2YWlsSGVpZ2h0IiwiaGVpZ2h0SlNPTiIsImNpcmNsZTJCdXR0b25FbGVtIiwicG9pbnRXaXRoUmFkaXVzIiwicmFkaXVzTWV0cmljIiwicmFkaXVzRmVldCIsImFkZFNvdXJjZSIsImFkZExheWVyIiwic291cmNlIiwiZmlyZSIsImZlYXR1cmVzIiwidG9EaXNwbGF5RmVhdHVyZXMiLCJnZW9qc29uIiwiZGlzcGxheSIsImlzQWN0aXZlTGluZSIsImN1cnJlbnRWZXJ0ZXgiLCJyYWRpdXNTdGFuZGFyZCIsImNpcmNsZUZlYXR1cmUiLCJTVEFURV9LRVkiLCJzdG9yYWdlQXZhaWxhYmxlIiwic3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsImNoZWNrU3RhdGVFeGlzdHMiLCJnZXRTdGF0ZSIsImtleSIsInN0b3JlT2JqIiwibmV3U3RhdGVPYmoiLCJzZXRTdGF0ZSIsInBhcnNlIiwiZ2V0SXRlbSIsImNoZWNrSXRlbSIsInNldEl0ZW0iLCJCb29sZWFuIiwiaXRlbSIsInN0YXRlU3RyIiwiZ2V0U3RhdGVBc1N0cmluZyIsImluZGV4T2YiLCJyZW1vdmVJdGVtIiwiRE9NRXhjZXB0aW9uIiwiY29kZSIsIm5hbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QXhCLENBQWdDSCxJQUFoQyxJQUF3QyxDQUExRTtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBOzs7O3VDQUMwQjtBQUN4QixVQUFNOVMsT0FBTyxjQUFiO0FBQ0EsVUFBSWlTLGdCQUFKO0FBQ0EsVUFBSTtBQUNGQSxrQkFBVW5QLE9BQU85QyxJQUFQLENBQVY7QUFDQSxZQUFNd0ksSUFBSSxrQkFBVjtBQUNBeUosZ0JBQVFXLE9BQVIsQ0FBZ0JwSyxDQUFoQixFQUFtQkEsQ0FBbkI7QUFDQXlKLGdCQUFRaUIsVUFBUixDQUFtQjFLLENBQW5CO0FBQ0EsZUFBTyxJQUFQO0FBQ0QsT0FORCxDQU1FLE9BQU9uQixDQUFQLEVBQVU7QUFDVixlQUFPQSxhQUFhOEwsWUFBYjtBQUNMO0FBQ0E5TCxVQUFFK0wsSUFBRixLQUFXLEVBQVg7QUFDQTtBQUNBL0wsVUFBRStMLElBQUYsS0FBVyxJQUZYO0FBR0E7QUFDQTtBQUNBL0wsVUFBRWdNLElBQUYsS0FBVyxvQkFMWDtBQU1BO0FBQ0FoTSxVQUFFZ00sSUFBRixLQUFXLDRCQVROO0FBVUw7QUFDQXBCLGdCQUFRbEwsTUFBUixLQUFtQixDQVhyQjtBQVlEO0FBQ0YiLCJmaWxlIjoiaW5kZXguYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMDJhOTY0ZTg3YmQ1NGViMTg5ZjFcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc35pbmRleFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9OWUNQbGFubmluZy9sYWJzLWZhY3RmaW5kZXIvYmxvYi80YTY3ZGEyNzNiNmZmODc1ODhmNTA0NGExNWIzNDkwZDRhYzA3YTI1L2FwcC9sYXllcnMvZHJhdy1zdHlsZXMuanNcbmV4cG9ydCBkZWZhdWx0IFtcbiAgLy8gQUNUSVZFIChiZWluZyBkcmF3bilcbiAgLy8gbGluZSBzdHJva2VcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1saW5lJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnTGluZVN0cmluZyddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnI0Q5NkIyNycsXG4gICAgICAnbGluZS1kYXNoYXJyYXknOiBbMC4yLCAyXSxcbiAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgIH1cbiAgfSxcblxuICAvLyBwb2x5Z29uIGZpbGxcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWZpbGwnLFxuICAgIHR5cGU6ICdmaWxsJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdmaWxsLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgJ2ZpbGwtb3V0bGluZS1jb2xvcic6ICcjRDIwQzBDJyxcbiAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICB9XG4gIH0sXG5cbiAgLy8gcG9seWdvbiBvdXRsaW5lIHN0cm9rZVxuICAvLyBUaGlzIGRvZXNuJ3Qgc3R5bGUgdGhlIGZpcnN0IGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHdoaWNoIHVzZXMgdGhlIGxpbmUgc3Ryb2tlIHN0eWxpbmcgaW5zdGVhZFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tc3Ryb2tlLWFjdGl2ZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAnbGluZS13aWR0aCc6IDRcbiAgICB9XG4gIH0sXG4gIC8vIHZlcnRleCBwb2ludCBoYWxvc1xuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tYW5kLWxpbmUtdmVydGV4LWhhbG8tYWN0aXZlJyxcbiAgICB0eXBlOiAnY2lyY2xlJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICdtZXRhJywgJ3ZlcnRleCddLCBbJz09JywgJyR0eXBlJywgJ1BvaW50J10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdjaXJjbGUtcmFkaXVzJzogNyxcbiAgICAgICdjaXJjbGUtY29sb3InOiAnI0ZGRidcbiAgICB9XG4gIH0sXG4gIC8vIHZlcnRleCBwb2ludHNcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWFuZC1saW5lLXZlcnRleC1hY3RpdmUnLFxuICAgIHR5cGU6ICdjaXJjbGUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJ21ldGEnLCAndmVydGV4J10sIFsnPT0nLCAnJHR5cGUnLCAnUG9pbnQnXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2NpcmNsZS1yYWRpdXMnOiA2LFxuICAgICAgJ2NpcmNsZS1jb2xvcic6ICcjRDk2QjI3J1xuICAgIH1cbiAgfSxcblxuICAvLyByYWRpdXMgbGFiZWxcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1yYWRpdXMtbGFiZWwnLFxuICAgIHR5cGU6ICdzeW1ib2wnLFxuICAgIGZpbHRlcjogWyc9PScsICdtZXRhJywgJ2N1cnJlbnRQb3NpdGlvbiddLFxuICAgIGxheW91dDoge1xuICAgICAgJ3RleHQtZmllbGQnOiAne3JhZGl1c0ZlZXR9IFxcbiB7cmFkaXVzTWlsZXN9JyxcbiAgICAgICd0ZXh0LWFuY2hvcic6ICdsZWZ0JyxcbiAgICAgICd0ZXh0LW9mZnNldCc6IFtcbiAgICAgICAgMSxcbiAgICAgICAgMFxuICAgICAgXSxcbiAgICAgICd0ZXh0LXNpemUnOiAyMlxuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICd0ZXh0LWNvbG9yJzogJ3JnYmEoMCwgMCwgMCwgMSknLFxuICAgICAgJ3RleHQtaGFsby1jb2xvcic6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJyxcbiAgICAgICd0ZXh0LWhhbG8td2lkdGgnOiAzLFxuICAgICAgJ2ljb24tb3BhY2l0eSc6IHtcbiAgICAgICAgYmFzZTogMSxcbiAgICAgICAgc3RvcHM6IFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICA3Ljk5LFxuICAgICAgICAgICAgMVxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICBdXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICAndGV4dC1oYWxvLWJsdXInOiAxXG4gICAgfVxuICB9LFxuXG4gIC8vIElOQUNUSVZFIChzdGF0aWMsIGFscmVhZHkgZHJhd24pXG4gIC8vIGxpbmUgc3Ryb2tlXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctbGluZS1zdGF0aWMnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdMaW5lU3RyaW5nJ10sIFsnPT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdsaW5lLXdpZHRoJzogM1xuICAgIH1cbiAgfSxcbiAgLy8gcG9seWdvbiBmaWxsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1maWxsLXN0YXRpYycsXG4gICAgdHlwZTogJ2ZpbGwnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWyc9PScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2ZpbGwtY29sb3InOiAnIzAwMCcsXG4gICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuMVxuICAgIH1cbiAgfSxcbiAgLy8gcG9seWdvbiBvdXRsaW5lXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1zdHJva2Utc3RhdGljJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJz09JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnIzAwMCcsXG4gICAgICAnbGluZS13aWR0aCc6IDNcbiAgICB9XG4gIH1cbl07XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBkYXRhcGkgPSAnaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5bjAyRkt0Vm9rU18yR1psR3RWV1JISjdPZkVIbjdZSEhnR21kV1pORTdNOE1HbUg0L2V4ZWMnO1xuXG5leHBvcnQgY2xhc3MgR29vZ2xlQW5hbHl0aWNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb28gPSB7fTtcbiAgfVxuXG4gIHNldEV2ZW50KGFjdGlvbiA9ICcnLCBjYXRlZ29yeSA9ICcnLCBsYWJlbCA9ICcnLCB2YWx1ZSA9IDApIHtcbiAgICBjb25zdCB1dWlkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJyk7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICBjb25zdCBkYXRhID0gbGFiZWw7XG5cbiAgICBjb25zdCBmb29PYmogPSB0aGlzLmZvbzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGd0YWcoJ2V2ZW50JywgdXVpZCwgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgICAgZXZlbnRfbGFiZWw6IGxhYmVsLFxuICAgICAgdmFsdWU6IGAke3ZhbHVlfWAsXG4gICAgICB1dWlkXG4gICAgfSk7XG5cbiAgICAvLyBzaW5jZSBGRiBjb3VsZCBiZSBibG9ja2luZyBnYSB3cml0aW5nIGRhdGEgaGVyZSBhcyBiYWNrdXBcbiAgICBjb25zdCBqc29uZGF0YSA9IHtcbiAgICAgIHV1aWQsXG4gICAgICBjYXRlZ29yeSxcbiAgICAgIGRhdGEsXG4gICAgICBkYXRlXG4gICAgfTtcblxuICAgIGNvbnN0IGRhdGFBUElVUkwgPSBuZXcgVVJMKGRhdGFwaSk7XG4gICAgZGF0YUFQSVVSTC5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGpzb25kYXRhKTtcbiAgICBmZXRjaChkYXRhQVBJVVJMKTtcbiAgfVxufVxuIiwiLy8gaW1wb3J0IGRlcGVuZGVuY2llc1xuaW1wb3J0IHsgbGlicmFyeSwgZG9tIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcbmltcG9ydCB7IGZhcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBmYXIgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1yZWd1bGFyLXN2Zy1pY29ucyc7XG5pbXBvcnQgbWFwYm94Z2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWRyYXcnO1xuaW1wb3J0IE1hcGJveEdlb2NvZGVyIGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWdlb2NvZGVyJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgUmFkaXVzTW9kZSBmcm9tICcuL3JhZGl1c01vZGUnO1xuaW1wb3J0IGRyYXdTdHlsZXMgZnJvbSAnLi9kcmF3c3R5bGVzJztcbmltcG9ydCB7IEdvb2dsZUFuYWx5dGljcyB9IGZyb20gJy4vZ2EnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBnb29nbGVBbmFseXRpY3MgPSBuZXcgR29vZ2xlQW5hbHl0aWNzKCk7XG5cbi8vIEtpY2tzIG9mZiB0aGUgcHJvY2VzcyBvZiBmaW5kaW5nIDxpPiB0YWdzIGFuZCByZXBsYWNpbmcgd2l0aCA8c3ZnPlxuLy8gYWRkZXMgc3VwcG9ydCBmb3IgZm9udGF3ZXNvbWVcbmxpYnJhcnkuYWRkKGZhcywgZmFyKTtcbmRvbS53YXRjaCgpO1xuXG5mdW5jdGlvbiBpc01vYmlsZURldmljZSgpIHtcbiAgbGV0IGNoZWNrID0gZmFsc2U7XG4gIChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSkgY2hlY2sgPSB0cnVlO30pKG5hdmlnYXRvci51c2VyQWdlbnR8fG5hdmlnYXRvci52ZW5kb3J8fHdpbmRvdy5vcGVyYSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgcmV0dXJuIGNoZWNrO1xufVxuXG5jb25zdCB1cmxTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbmNvbnN0IHVybCA9IG5ldyBVUkwodXJsU3RyaW5nKTtcbmNvbnN0IGNhbXBhaWduID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2NhbXAnKTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzdHVkeSBzdGFydGVkJywgJ3RydWUnKTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdjYW1wYWlnbicsIGNhbXBhaWduKTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdtb2JpbGUnLCBpc01vYmlsZURldmljZSgpKTtcblxubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuXG5jb25zdCBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcbiAgY29udGFpbmVyOiAnbWFwJyxcbiAgc3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJyxcbiAgLy8gJ21hcGJveDovL3N0eWxlcy9kYXZlaXNtL2Nqd3JyZGZkMjB1aWMxZG56c3RpMm93bGsnLCAtIGRhcmtcbiAgY2VudGVyOiBbLTk4LCAzOC44OF0sIC8vIHN0YXJ0aW5nIHBvc2l0aW9uIFtsbmcsIGxhdF1cbiAgem9vbTogMywgLy8gc3RhcnRpbmcgem9vbVxuICBzaG93Wm9vbTogdHJ1ZSxcbiAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICBrZXliaW5kaW5nczogdHJ1ZVxufSk7XG5cblxuLy8gc2V0dXAgbWFwXG5jb25zdCBkcmF3Q29udHJvbCA9IG5ldyBNYXBib3hEcmF3KHtcbiAgZGlzcGxheUNvbnRyb2xzRGVmYXVsdDogdHJ1ZSxcbiAgY29udHJvbHM6IHtcbiAgICByZWN0YW5nbGU6IHRydWUsXG4gICAgcG9seWdvbjogdHJ1ZSxcbiAgICBsaW5lX3N0cmluZzogdHJ1ZSxcbiAgICB0cmFzaDogdHJ1ZVxuICB9LFxuICBvcHRpb25zOiB7XG4gICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgIHRvdWNoQnVmZmVyOiAxMFxuICB9LFxuICBzdHlsZXM6IGRyYXdTdHlsZXMsXG4gIG1vZGVzOiBPYmplY3QuYXNzaWduKHtcbiAgICBkcmF3X3JhZGl1czogUmFkaXVzTW9kZVxuICB9LCBNYXBib3hEcmF3Lm1vZGVzKVxufSk7XG5cbm1hcC5hZGRDb250cm9sKGRyYXdDb250cm9sKTtcblxuY29uc3QgbmF2ID0gbmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKCk7XG5tYXAuYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xuXG5jb25zdCBnZW9jb2RlciA9IG5ldyBNYXBib3hHZW9jb2Rlcih7XG4gIGFjY2Vzc1Rva2VuOiBtYXBib3hnbC5hY2Nlc3NUb2tlbixcbiAgbWFwYm94Z2wsXG4gIHNldFpvb206IDgsXG4gIGZseVRvOiBmYWxzZSxcbiAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggZm9yIGEgbG9jYXRpb24uLi4nXG59KTtcblxubWFwLm9uKCd6b29tZW5kJywgKCkgPT4ge1xuICBpZiAobWFwLmdldFpvb20oKSA+IDEwKSB7XG4gICAgY29uc3QgY2lyY2xlQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uJyk7XG4gICAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICBjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnaGlkZScpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNhYmxlJyk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi10aXRsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gZnVuY3Rpb25cbmZ1bmN0aW9uIGhhbmRsZUFncmVlQ2xpY2soKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktYWdyZWVtZW50LWFsbCcpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktZGlzc2FnZ3JlZScpLnJlbW92ZSgpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIHRydWUpO1xuICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdoLTgwJyk7XG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtYWN0aW9uLWhvbGRlcicpLmNsYXNzTGlzdC5hZGQoJ2gtNzAnKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGFydC1oZWlnaHQtYWN0aW9ucycpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJ0LWhlaWdodC1tYXAnKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QuYWRkKCdzdGVwLWhlaWdodC1hY3Rpb25zJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtaG9sZGVyJykuY2xhc3NMaXN0LmFkZCgnc3RlcC1oZWlnaHQtbWFwJyk7XG4gIG1hcC5yZXNpemUoKTtcbiAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0dWR5LWFncmVlbWVudCcsIHRydWUpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGlzc2FncmVlQ2xpY2soKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktZGlzc2FnZ3JlZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktYWdyZWVtZW50LWFsbCcpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCBmYWxzZSk7XG4gIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzdHVkeS1hZ3JlZW1lbnQnLCBmYWxzZSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGVuc3VyZSB0aGUgb2JqZWN0IG9yIHZhcmlhYmxlIGlzIHZhbGlkLi4uXG4vLyBAcGFyYW0gb2JqIC0gdHlwZWxlc3NcbmZ1bmN0aW9uIGNoZWNrVmFsaWRPYmplY3Qob2JqKSB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnICYmIG9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSg0KSkuam9pbignLScpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmF3QnV0dG9uQ2xpY2soZSkge1xuICBjb25zdCBjaXJjbGVCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZS50YXJnZXQuaWR9YCk7XG4gIGlmIChjaXJjbGVCdXR0b25FbGVtKSB7XG4gICAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICAkKGAjJHtlLnRhcmdldC5pZH1gKS50b29sdGlwKHsgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyB9KTtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoJ3Nob3cnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICB9XG4gIH1cblxuICBkcmF3Q29udHJvbC50cmFzaCgpO1xuXG4gIGlmIChtYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1saW5lJykpIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1saW5lJyk7XG4gIH1cblxuICBpZiAobWFwLmdldExheWVyKCdjaXJjbGUtZmlsbCcpKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtZmlsbCcpO1xuICB9XG4gIGlmIChtYXAuZ2V0U291cmNlKCdjaXJjbGUnKSkge1xuICAgIG1hcC5yZW1vdmVTb3VyY2UoJ2NpcmNsZScpO1xuICB9XG5cbiAgZHJhd0NvbnRyb2wuY2hhbmdlTW9kZSgnZHJhd19yYWRpdXMnKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGNoZWNrIHN0dWR5IHNlc3Npb24gc3RhdGUgZm9yIGNvbXBsZXRldGlvblxuY29uc3QgaXNTdHVkeWNvbXBsZXRlZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHljb21wbGV0ZWQnKTtcbmxldCBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBpc1N0dWR5Y29tcGxldGVkID09PSAnYm9vbGVhbicpIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBpc1N0dWR5Y29tcGxldGVkO1xufSBlbHNlIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBmYWxzZTtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBTdHVkeUFncnJlZW1lbnQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xubGV0IHN0dWR5QWdycmVlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBTdHVkeUFncnJlZW1lbnQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUFncnJlZWQgPSBTdHVkeUFncnJlZW1lbnQ7XG59IGVsc2Uge1xuICBzdHVkeUFncnJlZWQgPSBmYWxzZTtcbn1cblxuLy8gYWxyZWFkeSBhZ3JlZWRcbmlmIChzdHVkeUFncnJlZWQpIHtcbiAgLy8gaGFuZGxlQWdyZWVDbGljaygpO1xufVxuXG4vLyBoaWRlIHN0dWR5XG5pZiAoc3R1ZHlDb21wbGV0ZWQpIHsgLy8gfHwgc3R1ZHlBZ3JyZWVkXG4gIGhhbmRsZUFncmVlQ2xpY2soKTtcblxuICBjb25zdCBkaXN0YW5jZWttID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZWttJyk7XG4gIGNvbnN0IGRpc3RhbmNlbWV0ZXJzID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZW1ldGVycycpO1xuICBjb25zdCBkaXN0YW5jZWZlZXQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2Rpc3RhbmNlZmVldCcpO1xuICBjb25zdCBkaXN0YW5jZW1pbGVzID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZW1pbGVzJyk7XG4gIGNvbnN0IHN0dWR5ZGlzdGFuY2VxdWVzdGlvbiA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHlkaXN0YW5jZXF1ZXN0aW9uJyk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlLXF1ZXN0aW9uJykuaW5uZXJIVE1MID0gYCR7c3R1ZHlkaXN0YW5jZXF1ZXN0aW9ufWA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1jb21wbGV0ZS1taWxlcycpLmlubmVySFRNTCA9IGAke2Rpc3RhbmNlbWlsZXMudG9GaXhlZCgyKX0gbWlsZXMgb3JgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktY29tcGxldGUtZmVldCcpLmlubmVySFRNTCA9IGAke2Rpc3RhbmNlZmVldC50b0ZpeGVkKDIpfSBmZWV0IG9yYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlLWttJykuaW5uZXJIVE1MID0gYCR7ZGlzdGFuY2VrbS50b0ZpeGVkKDIpfSBraWxvbWV0ZXJzIG9yYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlLW1ldGVycycpLmlubmVySFRNTCA9IGAke2Rpc3RhbmNlbWV0ZXJzLnRvRml4ZWQoMil9IG1ldGVycy5gO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1jb21wbGV0ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1ob2xkZXInKS5yZW1vdmUoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWFncmVlbWVudC1hbGwnKS5yZW1vdmUoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1hY3Rpb24taG9sZGVyJykuY2xhc3NOYW1lID0nY29sLTEyJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxufSBlbHNlIHtcbiAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHljb21wbGV0ZWQnLCBmYWxzZSk7XG59XG5cbmlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCd1dWlkJywgdXVpZCgpKTtcbn1cblxuZ2VvY29kZXIub24oJ3Jlc3VsdCcsIChlKSA9PiB7XG4gIGNvbnN0IHggPSBlLnJlc3VsdC5jZW50ZXJbMF07XG4gIGNvbnN0IHkgPSBlLnJlc3VsdC5jZW50ZXJbMV07XG5cbiAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3NlYXJjaHBvaW50JywgYCR7eH0sICR7eX1gKTtcblxuICBjb25zdCBvZmZzZXRkaXN0ID0gMC4wMDI1O1xuICBjb25zdCBiYm94ID0gW1t4IC0gb2Zmc2V0ZGlzdCwgeSAtIG9mZnNldGRpc3RdLCBbeCArIG9mZnNldGRpc3QsIHkgKyBvZmZzZXRkaXN0XV07XG5cbiAgLy8gY3JlYXRlIHJhbmRvbSB6b29tIGluY2FzZSB1c2VycyBhcmUgaW5mbHVlbmNlZCBieSBpbnRpYWwgem9vbWxldmVsXG4gIGxldCBtaW4gPSAxMDtcbiAgbGV0IG1heCA9IDE0O1xuICBpZiAoaXNNb2JpbGVEZXZpY2UoKSkge1xuICAgIG1pbiA9IDEwO1xuICAgIG1heCA9IDE1O1xuICB9XG5cbiAgY29uc3Qgem0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICBtYXAuZml0Qm91bmRzKGJib3gsIHsgbWF4Wm9vbTogem0gfSk7XG5cbiAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3NlYXJjaHpvb20nLCB6bSk7XG5cblxuICBjb25zdCBjaXJjbGVCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1idXR0b24nKTtcbiAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdtYW51YWwnIH0pO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnaGlkZScpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzcG9zZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi10aXRsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLWRpcmVjdGlvbnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMScpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTInKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgfVxufSk7XG5cbmNvbnN0IGdlb2NvZGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlb2NvZGVyJyk7XG5pZiAoZ2VvY29kZUVsZW0pIHtcbiAgZ2VvY29kZUVsZW0uYXBwZW5kQ2hpbGQoZ2VvY29kZXIub25BZGQobWFwKSk7XG5cbiAgZ2VvY29kZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG4gICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGdlb2NvZGVFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZCcpO1xuICAgIGdlb2NvZGVFbGVtLmNsYXNzTGlzdC5hZGQoJ2V4cGFuZCcpO1xuICB9KTtcbn1cblxuY29uc3Qgc3VnZ2VzdGlvbnNFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dlb2NvZGVyIC5zdWdnZXN0aW9ucy13cmFwcGVyJyk7XG5pZiAoc3VnZ2VzdGlvbnNFbGVtKSB7XG4gIHN1Z2dlc3Rpb25zRWxlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHtcbiAgICBjb25zdCBnZW9jb2RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW9jb2RlcicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZ2VvY29kZUVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kJyk7XG4gIH0pO1xufVxuXG5jb25zdCBkcmF3Q2lyY2xlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tZHJhdy1jaXJjbGUnKTtcbmlmIChkcmF3Q2lyY2xlRWxlbWVudCkge1xuICBkcmF3Q2lyY2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURyYXdCdXR0b25DbGljayk7XG59XG5cbmNvbnN0IHJlRHJhd0NpcmNsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJlZHJhdy1jaXJjbGUnKTtcbmlmIChyZURyYXdDaXJjbGVFbGVtZW50KSB7XG4gIHJlRHJhd0NpcmNsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEcmF3QnV0dG9uQ2xpY2spO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdGVwTmF2Q2xpY2soZSkge1xuICBjb25zdCB2YWxOb2RlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlTm9kZSgndmFsJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHZhbE5vZGUpIHtcbiAgICBjb25zdCBnZW9jb2RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW9jb2RlcicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKGdlb2NvZGVFbGVtKSB7XG4gICAgICBnZW9jb2RlRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0xJykuY2xhc3NMaXN0LnJlbW92ZSgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0xJykuY2xhc3NMaXN0LmFkZCgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QuYWRkKCdzdGVwLW5vdC12aXMnKTtcbiAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZU5vZGUoJ3ZhbCcpLnZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dmFsdWV9YCkuY2xhc3NMaXN0LnJlbW92ZSgnc3RlcC1ub3QtdmlzJyk7XG4gIH1cbn1cblxuY29uc3Qgc3RlcE5hdjFFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtbmF2LTEnKTtcbmlmIChzdGVwTmF2MUVsZW0pIHtcbiAgc3RlcE5hdjFFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3RlcE5hdkNsaWNrKTtcbn1cblxuY29uc3QgbWFpbkNvbnRlbnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY29udGVudCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5pZiAobWFpbkNvbnRlbnRFbGVtKSB7XG4gIG1haW5Db250ZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21hcGJveGdsLWN0cmwtZ2VvY29kZXItLWlucHV0JykpIHtcbiAgICAgIGNvbnN0IGdlb2NvZGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlb2NvZGVyJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGlmIChnZW9jb2RlRWxlbSkge1xuICAgICAgICBnZW9jb2RlRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBzdGVwTmF2MkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC1uYXYtMicpO1xuaWYgKHN0ZXBOYXYyRWxlbSkge1xuICBzdGVwTmF2MkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTdGVwTmF2Q2xpY2spO1xufVxuXG5jb25zdCBzdGVwTmF2M0VsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC1uYXYtMycpO1xuaWYgKHN0ZXBOYXYzRWxlbSkge1xuICBzdGVwTmF2M0VsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTdGVwTmF2Q2xpY2spO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdWJtaXRCdXR0b25DbGljayhlKSB7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbicpO1xuICBpZiAoc3VibWl0QnV0dG9uRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnIH0pO1xuICAgICQoJyNzdWJtaXQtYnV0dG9uJykudG9vbHRpcCgnc2hvdycpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ21hbnVhbCcgfSk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdoaWRlJyk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdkaXNhYmxlJyk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdkaXNwb3NlJyk7XG5cbiAgICBjb25zdCBjaXJjbGUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2NpcmNsZScpO1xuICAgIGNvbnN0IGxpbmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2xpbmUnKTtcbiAgICBjb25zdCBkaXN0YW5jZWttID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZWttJyk7XG4gICAgY29uc3QgZGlzdGFuY2VtZXRlcnMgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2Rpc3RhbmNlbWV0ZXJzJyk7XG4gICAgY29uc3QgZGlzdGFuY2VmZWV0ID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZWZlZXQnKTtcbiAgICBjb25zdCBkaXN0YW5jZW1pbGVzID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZW1pbGVzJyk7XG4gICAgY29uc3Qgc3R1ZHlkaXN0YW5jZXF1ZXN0aW9uID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeWRpc3RhbmNlcXVlc3Rpb24nKTtcblxuICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2NpcmNsZS1zdWJtaXR0ZWQnLCBjaXJjbGUpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdsaW5lLXN1Ym1pdHRlZCcsIGxpbmUpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdkaXN0YW5jZWttLXN1Ym1pdHRlZCcsIGRpc3RhbmNla20pO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdkaXN0YW5jZWZlZXQtc3VibWl0dGVkJywgZGlzdGFuY2VmZWV0KTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnZGlzdGFuY2VtZXRlcnMtc3VibWl0dGVkJywgZGlzdGFuY2VtZXRlcnMpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdkaXN0YW5jZW1pbGVzLXN1Ym1pdHRlZCcsIGRpc3RhbmNlbWlsZXMpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlLXF1ZXN0aW9uJykuaW5uZXJIVE1MID0gYCR7c3R1ZHlkaXN0YW5jZXF1ZXN0aW9ufWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlLW1pbGVzJykuaW5uZXJIVE1MID0gYCR7ZGlzdGFuY2VtaWxlcy50b0ZpeGVkKDIpfSBtaWxlcyBvcmA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlLWZlZXQnKS5pbm5lckhUTUwgPSBgJHtkaXN0YW5jZWZlZXQudG9GaXhlZCgyKX0gZmVldCBvcmA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlLWttJykuaW5uZXJIVE1MID0gYCR7ZGlzdGFuY2VrbS50b0ZpeGVkKDIpfSBraWxvbWV0ZXJzIG9yYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktY29tcGxldGUtbWV0ZXJzJykuaW5uZXJIVE1MID0gYCR7ZGlzdGFuY2VtZXRlcnMudG9GaXhlZCgyKX0gbWV0ZXJzLmA7XG5cbiAgICAvLyBlbmQgc3R1ZHlcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktY29tcGxldGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWhvbGRlcicpLnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1hZ3JlZW1lbnQtYWxsJykucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1hY3Rpb24taG9sZGVyJykuY2xhc3NOYW1lID0nY29sLTEyJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHljb21wbGV0ZWQnLCB0cnVlKTtcblxuICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0dWR5Y29tcGxldGVkJywgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IHN1Ym1pdEJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbicpO1xuaWYgKHN1Ym1pdEJ1dHRvbkVsZW0pIHtcbiAgc3VibWl0QnV0dG9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVN1Ym1pdEJ1dHRvbkNsaWNrKTtcbn1cblxuY29uc3QgZGlyZWN0aW9uc09uZSA9IFtcbiAgJ1NlYXJjaCBmb3IgYSBsb2NhdGlvbiB5b3UgY2FyZSBhYm91dC4nLFxuICAnU2VhcmNoIGZvciBhIGxvY2F0aW9uIHRvIGZpbmQgYWJvdXQgY3JpbWUuJyxcbiAgJ1NlYXJjaCBmb3IgYSBsb2NhdGlvbiB0byBmaW5kIGFib3V0IHRoZSBjbG9zZXN0IHBpenphIHBsYWNlLidcbl07XG5cbmNvbnN0IG1pbk9uZSA9IDA7XG5jb25zdCBtYXhPbmUgPSAyO1xuY29uc3QgbWVzc2FnZUluZGV4T25lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE9uZSAtIG1pbk9uZSArIDEpICsgbWluT25lKTtcbmNvbnN0IHN0ZXBEaXJlY3Rpb25zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMS1kaXJlY3Rpb25zJyk7XG5pZiAoc3RlcERpcmVjdGlvbnMxKSB7XG4gIHN0ZXBEaXJlY3Rpb25zMS5pbm5lckhUTUwgPSBkaXJlY3Rpb25zT25lW21lc3NhZ2VJbmRleE9uZV07XG59XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3RlcDF0ZXh0JywgZGlyZWN0aW9uc09uZVttZXNzYWdlSW5kZXhPbmVdKTtcblxuY29uc3QgZGlyZWN0aW9uc1R3byA9IFtcbiAgJ0RyYXcgYSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIDEgbWlsZS4nLFxuICAnRHJhdyBhIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgYSA1LW1pbnV0ZSA8c3Ryb25nPkRSSVZFPC9zdHJvbmc+LicsXG4gICdEcmF3IGEgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyBhIDUtbWludXRlIDxzdHJvbmc+V0FMSzwvc3Ryb25nPi4nXG5dO1xuXG5jb25zdCBtaW5Ud28gPSAwO1xuY29uc3QgbWF4VHdvID0gMjtcbmNvbnN0IG1lc3NhZ2VJbmRleFR3byA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhUd28gLSBtaW5Ud28gKyAxKSArIG1pblR3byk7XG5jb25zdCBzdGVwRGlyZWN0aW9uczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpO1xuaWYgKHN0ZXBEaXJlY3Rpb25zMikge1xuICBzdGVwRGlyZWN0aW9uczIuaW5uZXJIVE1MID0gZGlyZWN0aW9uc1R3b1ttZXNzYWdlSW5kZXhUd29dO1xufVxuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0ZXAydGV4dCcsIGRpcmVjdGlvbnNUd29bbWVzc2FnZUluZGV4VHdvXSk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5ZGlzdGFuY2VxdWVzdGlvbicsIGRpcmVjdGlvbnNUd29bbWVzc2FnZUluZGV4VHdvXSk7XG5cbmNvbnN0IGFnZ3JlZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdncmVlLWJ1dHRvbicpO1xuaWYgKGFnZ3JlZUJ1dHRvbkVsZW1lbnQpIHtcbiAgYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUFncmVlQ2xpY2spO1xufVxuXG5jb25zdCBkaXNzYWdncmVlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFnZ3JlZS1idXR0b24nKTtcbmlmIChkaXNzYWdncmVlQnV0dG9uRWxlbWVudCkge1xuICBkaXNzYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURpc3NhZ3JlZUNsaWNrKTtcbn1cblxuY29uc3Qgc3RlcDJNaW5vckRpcmVjdGlvbnNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLW1pbm9yLWRpcmVjdGlvbnMnKTtcbmlmIChzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQpIHtcbiAgaWYgKGlzTW9iaWxlRGV2aWNlKCkpIHtcbiAgICBzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQuaW5uZXJIVE1MID0gJ0NsaWNrIG9uIHRoZSBtYXAsIHRoZW4gZHJhZyB5b3VyIGZpbmdlciBhY3Jvc3MgdGhlIG1hcCB1bnRpbCB0aGUgY2lyY2xlIGJlc3QgcmVwcmVzZW50cyB0aGUgZGlzdGFuY2UuJztcbiAgfVxufVxuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY2hyaXN3aG9uZy82OTQ3NzliYzFmMWU1ZDkyNmU0N2JhYjcyMDVmYTU1OVxuLy8gY3VzdG9tIG1hcGJvcHgtZ2wtZHJhdyBtb2RlIHRoYXQgbW9kaWZpZXMgZHJhd19saW5lX3N0cmluZ1xuLy8gc2hvd3MgYSBjZW50ZXIgcG9pbnQsIHJhZGl1cyBsaW5lLCBhbmQgY2lyY2xlIHBvbHlnb24gd2hpbGUgZHJhd2luZ1xuLy8gZm9yY2VzIGRyYXcuY3JlYXRlIG9uIGNyZWF0aW9uIG9mIHNlY29uZCB2ZXJ0ZXhcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWRyYXcnO1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XG5pbXBvcnQgbGluZURpc3RhbmNlIGZyb20gJ0B0dXJmL2xpbmUtZGlzdGFuY2UnO1xuaW1wb3J0IHsgR29vZ2xlQW5hbHl0aWNzIH0gZnJvbSAnLi9nYSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBSYWRpdXNNb2RlID0gTWFwYm94RHJhdy5tb2Rlcy5kcmF3X2xpbmVfc3RyaW5nO1xuY29uc3QgZ29vZ2xlQW5hbHl0aWNzID0gbmV3IEdvb2dsZUFuYWx5dGljcygpO1xuXG4vLyBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2lzVG91Y2hNb3ZlJywgdHJ1ZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVZlcnRleChwYXJlbnRJZCwgY29vcmRpbmF0ZXMsIHBhdGgsIHNlbGVjdGVkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG1ldGE6ICd2ZXJ0ZXgnLFxuICAgICAgcGFyZW50OiBwYXJlbnRJZCxcbiAgICAgIGNvb3JkX3BhdGg6IHBhdGgsXG4gICAgICBhY3RpdmU6IChzZWxlY3RlZCkgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgfSxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzXG4gICAgfVxuICB9O1xufVxuXG4vLyBjcmVhdGUgYSBjaXJjbGUtbGlrZSBwb2x5Z29uIGdpdmVuIGEgY2VudGVyIHBvaW50IGFuZCByYWRpdXNcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTk5NTYxL2RyYXdpbmctYS1jaXJjbGUtd2l0aC10aGUtcmFkaXVzLWluLW1pbGVzLW1ldGVycy13aXRoLW1hcGJveC1nbC1qcy8zOTAwNjM4OCMzOTAwNjM4OFxuZnVuY3Rpb24gY3JlYXRlR2VvSlNPTkNpcmNsZShjZW50ZXIsIHJhZGl1c0luS20sIHBhcmVudElkLCBwb2ludHMgPSA2NCkge1xuICBjb25zdCBjb29yZHMgPSB7XG4gICAgbGF0aXR1ZGU6IGNlbnRlclsxXSxcbiAgICBsb25naXR1ZGU6IGNlbnRlclswXVxuICB9O1xuXG4gIGNvbnN0IGttID0gcmFkaXVzSW5LbTtcblxuICBjb25zdCByZXQgPSBbXTtcbiAgY29uc3QgZGlzdGFuY2VYID0ga20gLyAoMTExLjMyMCAqIE1hdGguY29zKChjb29yZHMubGF0aXR1ZGUgKiBNYXRoLlBJKSAvIDE4MCkpO1xuICBjb25zdCBkaXN0YW5jZVkgPSBrbSAvIDExMC41NzQ7XG5cbiAgbGV0IHRoZXRhO1xuICBsZXQgeDtcbiAgbGV0IHk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzOyBpICs9IDEpIHtcbiAgICB0aGV0YSA9IChpIC8gcG9pbnRzKSAqICgyICogTWF0aC5QSSk7XG4gICAgeCA9IGRpc3RhbmNlWCAqIE1hdGguY29zKHRoZXRhKTtcbiAgICB5ID0gZGlzdGFuY2VZICogTWF0aC5zaW4odGhldGEpO1xuXG4gICAgcmV0LnB1c2goW2Nvb3Jkcy5sb25naXR1ZGUgKyB4LCBjb29yZHMubGF0aXR1ZGUgKyB5XSk7XG4gIH1cbiAgcmV0LnB1c2gocmV0WzBdKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IFtyZXRdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBwYXJlbnQ6IHBhcmVudElkLFxuICAgICAgYWN0aXZlOiAndHJ1ZSdcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlNZWFzdXJlbWVudHMoZmVhdHVyZSkge1xuICAvLyBzaG91bGQgbG9nIGJvdGggbWV0cmljIGFuZCBzdGFuZGFyZCBkaXNwbGF5IHN0cmluZ3MgZm9yIHRoZSBjdXJyZW50IGRyYXduIGZlYXR1cmVcbiAgLy8gbWV0cmljIGNhbGN1bGF0aW9uXG4gIGNvbnN0IGRyYXduTGVuZ3RoID0gKGxpbmVEaXN0YW5jZShmZWF0dXJlKSAqIDEwMDApOyAvLyBtZXRlcnNcblxuICBsZXQgbWV0cmljVW5pdHMgPSAnbSc7XG4gIGxldCBtZXRyaWNGb3JtYXQgPSAnMCwwJztcbiAgbGV0IG1ldHJpY01lYXN1cmVtZW50O1xuXG4gIGxldCBzdGFuZGFyZFVuaXRzID0gJ2ZlZXQnO1xuICBsZXQgc3RhbmRhcmRGb3JtYXQgPSAnMCwwJztcbiAgbGV0IHN0YW5kYXJkTWVhc3VyZW1lbnQ7XG5cbiAgbWV0cmljTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aDtcbiAgaWYgKGRyYXduTGVuZ3RoID49IDEwMDApIHsgLy8gaWYgb3ZlciAxMDAwIG1ldGVycywgdXBncmFkZSBtZXRyaWNcbiAgICBtZXRyaWNNZWFzdXJlbWVudCA9IGRyYXduTGVuZ3RoIC8gMTAwMDtcbiAgICBtZXRyaWNVbml0cyA9ICdrbSc7XG4gICAgbWV0cmljRm9ybWF0ID0gJzAuMDAnO1xuICB9XG5cbiAgc3RhbmRhcmRNZWFzdXJlbWVudCA9IGRyYXduTGVuZ3RoICogMy4yODA4NDtcbiAgaWYgKHN0YW5kYXJkTWVhc3VyZW1lbnQgPj0gNTI4MCkgeyAvLyBpZiBvdmVyIDUyODAgZmVldCwgdXBncmFkZSBzdGFuZGFyZFxuICAgIHN0YW5kYXJkTWVhc3VyZW1lbnQgLz0gNTI4MDtcbiAgICBzdGFuZGFyZFVuaXRzID0gJ21pJztcbiAgICBzdGFuZGFyZEZvcm1hdCA9ICcwLjAwJztcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlNZWFzdXJlbWVudHMgPSB7XG4gICAgbWV0cmljOiBgJHtudW1lcmFsKG1ldHJpY01lYXN1cmVtZW50KS5mb3JtYXQobWV0cmljRm9ybWF0KX0gJHttZXRyaWNVbml0c31gLFxuICAgIHN0YW5kYXJkOiBgJHtudW1lcmFsKHN0YW5kYXJkTWVhc3VyZW1lbnQpLmZvcm1hdChzdGFuZGFyZEZvcm1hdCl9ICR7c3RhbmRhcmRVbml0c31gXG4gIH07XG5cbiAgcmV0dXJuIGRpc3BsYXlNZWFzdXJlbWVudHM7XG59XG5cbmNvbnN0IGRvdWJsZUNsaWNrWm9vbSA9IHtcbiAgZW5hYmxlOiAoY3R4KSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBGaXJzdCBjaGVjayB3ZSd2ZSBnb3QgYSBtYXAgYW5kIHNvbWUgY29udGV4dC5cbiAgICAgIGlmICghY3R4Lm1hcCB8fCAhY3R4Lm1hcC5kb3VibGVDbGlja1pvb20gfHwgIWN0eC5fY3R4IHx8XG4gICAgICAgICAhY3R4Ll9jdHguc3RvcmUgfHwgIWN0eC5fY3R4LnN0b3JlLmdldEluaXRpYWxDb25maWdWYWx1ZSkgcmV0dXJuO1xuICAgICAgLy8gTm93IGNoZWNrIGluaXRpYWwgc3RhdGUgd2Fzbid0IGZhbHNlICh3ZSBsZWF2ZSBpdCBkaXNhYmxlZCBpZiBzbylcbiAgICAgIGlmICghY3R4Ll9jdHguc3RvcmUuZ2V0SW5pdGlhbENvbmZpZ1ZhbHVlKCdkb3VibGVDbGlja1pvb20nKSkgcmV0dXJuO1xuICAgICAgY3R4Lm1hcC5kb3VibGVDbGlja1pvb20uZW5hYmxlKCk7XG4gICAgfSwgMCk7XG4gIH1cbn07XG5cblxuLy8gV2hlbmV2ZXIgYSB1c2VyIGNsaWNrcyBvbiBhIGtleSB3aGlsZSBmb2N1c2VkIG9uIHRoZSBtYXAsIGl0IHdpbGwgYmUgc2VudCBoZXJlXG5SYWRpdXNNb2RlLm9uS2V5VXAgPSBmdW5jdGlvbiBvbktleVVwKHN0YXRlLCBlKSB7XG4gIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgdGhpcy5kZWxldGVGZWF0dXJlKFtzdGF0ZS5saW5lLmlkXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgdGhpcy5jaGFuZ2VNb2RlKCdzaW1wbGVfc2VsZWN0Jywge30sIHsgc2lsZW50OiB0cnVlIH0pO1xuICB9XG59O1xuXG4vLyBmb3IgbW9iaWxlIHRvdWNoIG1vdmUgaW4gbW9iaWxlIHRoZXJlIGlzIG5vIGNsaWNrXG4vLyBzaW5jZSBpdCB3b3VsZCBwcm92aWRlIG5vIGZlZWRiYWNrIHRvIHVzZXJcbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlRHJhdyhzdGF0ZSwgZSkge1xuICBpZiAoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uID09PSAxKSB7XG4gICAgc3RhdGUubGluZS5yZW1vdmVDb29yZGluYXRlKCcyJyk7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDIsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgaWYgKHN0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKSB7XG4gICAgc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uICs9IDE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gZm9yIGRlc2t0b3AgY2xpY2tzXG5mdW5jdGlvbiBpbnRlcmFjdGl2ZURyYXcoc3RhdGUsIGUsIGV2ZW50VHlwZSwgc2VsZikge1xuICBpZiAoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uID09PSAxKSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgICByZXR1cm4gc2VsZi5jaGFuZ2VNb2RlKCdzaW1wbGVfc2VsZWN0JywgeyBmZWF0dXJlSWRzOiBbc3RhdGUubGluZS5pZF0gfSk7XG4gIH1cblxuICBzZWxmLnVwZGF0ZVVJQ2xhc3Nlcyh7IG1vdXNlOiAnYWRkJyB9KTtcblxuICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIGlmIChzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xuICAgIHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiArPSAxOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3RhdGUubGluZS51cGRhdGVDb29yZGluYXRlKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmxpbmUuYWRkQ29vcmRpbmF0ZSgwLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuUmFkaXVzTW9kZS5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbiBvblRvdWNoU3RhcnQoc3RhdGUsIGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cblJhZGl1c01vZGUub25Ub3VjaE1vdmUgPSBmdW5jdGlvbiBvblRvdWNoTW92ZShzdGF0ZSwgZSkge1xuICAvLyBjb25zb2xlLmxvZygnb25Ub3VjaE1vdmUnKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBvblRvdWNoTW92ZURyYXcoc3RhdGUsIGUpO1xufTtcblxuUmFkaXVzTW9kZS5vblRvdWNoRW5kID0gZnVuY3Rpb24gb25Ub3VjaEVuZChzdGF0ZSwgZSkge1xuICAvLyBjb25zb2xlLmxvZygnb25Ub3VjaEVuZCcpXG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcmV0dXJuIGludGVyYWN0aXZlRHJhdyhzdGF0ZSwgZSwgJ29uVG91Y2hFbmQnLCB0aGlzKTtcbn07XG5cblJhZGl1c01vZGUuY2xpY2tBbnl3aGVyZSA9IGZ1bmN0aW9uIGNsaWNrQW55d2hlcmUoc3RhdGUsIGUpIHtcbiAgLy8gY29uc29sZS5sb2coJ2NsaWNrQW55d2hlcmUnKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBpbnRlcmFjdGl2ZURyYXcoc3RhdGUsIGUsICdtb3VzZScsIHRoaXMpO1xufTtcblxuLy8gY3JlYXRlcyB0aGUgZmluYWwgZ2VvanNvbiBwb2ludCBmZWF0dXJlIHdpdGggYSByYWRpdXMgcHJvcGVydHlcbi8vIHRyaWdnZXJzIGRyYXcuY3JlYXRlXG5SYWRpdXNNb2RlLm9uU3RvcCA9IGZ1bmN0aW9uIG9uU3RvcChzdGF0ZSkge1xuICBkb3VibGVDbGlja1pvb20uZW5hYmxlKHRoaXMpO1xuICAvLyBjb25zb2xlLmxvZygnb25TdG9wJylcbiAgdGhpcy5hY3RpdmF0ZVVJQnV0dG9uKCk7XG5cbiAgLy8gY2hlY2sgdG8gc2VlIGlmIHdlJ3ZlIGRlbGV0ZWQgdGhpcyBmZWF0dXJlXG4gIGlmICh0aGlzLmdldEZlYXR1cmUoc3RhdGUubGluZS5pZCkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gIC8vIHJlbW92ZSBsYXN0IGFkZGVkIGNvb3JkaW5hdGVcbiAgc3RhdGUubGluZS5yZW1vdmVDb29yZGluYXRlKCcwJyk7XG4gIGlmIChzdGF0ZS5saW5lLmlzVmFsaWQoKSkge1xuICAgIGNvbnN0IGxpbmVHZW9Kc29uID0gc3RhdGUubGluZS50b0dlb0pTT04oKTtcbiAgICBjb25zdCBzdGFydFBvaW50ID0gbGluZUdlb0pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF07XG4gICAgY29uc3QgZGlzdGFuY2UgPSBsaW5lRGlzdGFuY2UobGluZUdlb0pzb24pO1xuXG4gICAgY29uc3QgY2lyY2xlR2VvSlNPTiA9IGNyZWF0ZUdlb0pTT05DaXJjbGUoc3RhcnRQb2ludCwgZGlzdGFuY2UsIG51bGwsIDMyKTtcbiAgICBjb25zdCBmZWV0ID0gKGRpc3RhbmNlICogMTAwMCkgKiAzLjI4MDg0O1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnY2lyY2xlJywgSlNPTi5zdHJpbmdpZnkoY2lyY2xlR2VvSlNPTikpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnbGluZScsIEpTT04uc3RyaW5naWZ5KGxpbmVHZW9Kc29uKSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdkaXN0YW5jZWttJywgZGlzdGFuY2UpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnZGlzdGFuY2VtZXRlcnMnLCAoZGlzdGFuY2UgKiAxMDAwKSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdkaXN0YW5jZWZlZXQnLCBmZWV0KTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2Rpc3RhbmNlbWlsZXMnLCBmZWV0IC8gNTI4MCk7XG5cbiAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdjaXJjbGUtcHJlc3VibWl0JywgSlNPTi5zdHJpbmdpZnkoY2lyY2xlR2VvSlNPTikpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdsaW5lLXByZXN1Ym1pdCcsIEpTT04uc3RyaW5naWZ5KGxpbmVHZW9Kc29uKSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNla20tcHJlc3VibWl0JywgZGlzdGFuY2UpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdkaXN0YW5jZW1ldGVycy1wcmVzdWJtaXQnLCAoZGlzdGFuY2UgKiAxMDAwKSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNlZmVldC1wcmVzdWJtaXQnLCBmZWV0KTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnZGlzdGFuY2VtaWxlcy1wcmVzdWJtaXQnLCBmZWV0IC8gNTI4MCk7XG4gICAgY29uc3QgaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBhdmFpbFdpZHRoID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgYXZhaWxIZWlnaHQgPSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgaGVpZ2h0SlNPTiA9IHtcbiAgICAgIGlubmVyV2lkdGgsXG4gICAgICBpbm5lckhlaWdodCxcbiAgICAgIGF2YWlsV2lkdGgsXG4gICAgICBhdmFpbEhlaWdodFxuICAgIH07XG5cbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAncHJlc3VibWl0LXNjcmVlbicsIEpTT04uc3RyaW5naWZ5KGhlaWdodEpTT04pKTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAncHJlc3VibWl0LXpvb20nLCB0aGlzLm1hcC5nZXRab29tKCkpO1xuXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtYnV0dG9uJyk7XG4gICAgaWYgKHN1Ym1pdEJ1dHRvbkVsZW0pIHtcbiAgICAgIHN1Ym1pdEJ1dHRvbkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgIHN1Ym1pdEJ1dHRvbkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtbm90LXZpcycpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMycpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXAtbm90LXZpcycpO1xuICAgIH1cblxuICAgIGNvbnN0IGNpcmNsZTJCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1idXR0b24yJyk7XG4gICAgaWYgKGNpcmNsZTJCdXR0b25FbGVtKSB7XG4gICAgICBjaXJjbGUyQnV0dG9uRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24yJykudG9vbHRpcCgnaGlkZScpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24yJykudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24yJykudG9vbHRpcCgnZGlzcG9zZScpO1xuICAgIH1cblxuICAgIC8vIHJlY29uZmlndXJlIHRoZSBnZW9qc29uIGxpbmUgaW50byBhIGdlb2pzb24gcG9pbnQgd2l0aCBhIHJhZGl1cyBwcm9wZXJ0eVxuICAgIGNvbnN0IHBvaW50V2l0aFJhZGl1cyA9IHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNpcmNsZUdlb0pTT04uZ2VvbWV0cnkuY29vcmRpbmF0ZXNcbiAgICAgIH0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJhZGl1c01ldHJpYzogKGxpbmVEaXN0YW5jZShsaW5lR2VvSnNvbikpLnRvRml4ZWQoMSksXG4gICAgICAgIHJhZGl1c0ZlZXQ6IGZlZXRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMubWFwLmdldExheWVyKCdjaXJjbGUtbGluZScpKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcignY2lyY2xlLWxpbmUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1maWxsJykpIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtZmlsbCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXAuZ2V0U291cmNlKCdjaXJjbGUnKSkge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlU291cmNlKCdjaXJjbGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcC5hZGRTb3VyY2UoJ2NpcmNsZScsIHtcbiAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgIGRhdGE6IHBvaW50V2l0aFJhZGl1c1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIoe1xuICAgICAgaWQ6ICdjaXJjbGUtZmlsbCcsXG4gICAgICB0eXBlOiAnZmlsbCcsXG4gICAgICBzb3VyY2U6ICdjaXJjbGUnLFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2ZpbGwtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAgICdmaWxsLW91dGxpbmUtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmFkZExheWVyKHtcbiAgICAgIGlkOiAnY2lyY2xlLWxpbmUnLFxuICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgc291cmNlOiAnY2lyY2xlJyxcbiAgICAgIGxheW91dDoge1xuICAgICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgICAgfSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgICAnbGluZS1kYXNoYXJyYXknOiBbMC4yLCAyXSxcbiAgICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcC5maXJlKCdkcmF3LmNyZWF0ZScsIHtcbiAgICAgIGZlYXR1cmVzOiBbcG9pbnRXaXRoUmFkaXVzXVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGVsZXRlRmVhdHVyZShbc3RhdGUubGluZS5pZF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgIHRoaXMuY2hhbmdlTW9kZSgnc2ltcGxlX3NlbGVjdCcsIHt9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuUmFkaXVzTW9kZS50b0Rpc3BsYXlGZWF0dXJlcyA9IGZ1bmN0aW9uIHRvRGlzcGxheUZlYXR1cmVzKHN0YXRlLCBnZW9qc29uLCBkaXNwbGF5KSB7XG4gIGNvbnN0IGlzQWN0aXZlTGluZSA9IGdlb2pzb24ucHJvcGVydGllcy5pZCA9PT0gc3RhdGUubGluZS5pZDtcblxuICBnZW9qc29uLnByb3BlcnRpZXMuYWN0aXZlID0gKGlzQWN0aXZlTGluZSkgPyAndHJ1ZScgOiAnZmFsc2UnOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAoIWlzQWN0aXZlTGluZSkgcmV0dXJuIGRpc3BsYXkoZ2VvanNvbik7XG5cbiAgLy8gT25seSByZW5kZXIgdGhlIGxpbmUgaWYgaXQgaGFzIGF0IGxlYXN0IG9uZSByZWFsIGNvb3JkaW5hdGVcbiAgaWYgKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoIDwgMikgcmV0dXJuIG51bGw7XG4gIGdlb2pzb24ucHJvcGVydGllcy5tZXRhID0gJ2ZlYXR1cmUnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLy8gZGlzcGxheXMgY2VudGVyIHZlcnRleCBhcyBhIHBvaW50IGZlYXR1cmVcbiAgZGlzcGxheShjcmVhdGVWZXJ0ZXgoXG4gICAgc3RhdGUubGluZS5pZCxcbiAgICBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzW3N0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggLSAyIDogMV0sXG4gICAgYCR7c3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCAtIDIgOiAxfWAsXG4gICAgZmFsc2UsXG4gICkpO1xuXG4gIC8vIGRpc3BsYXlzIHRoZSBsaW5lIGFzIGl0IGlzIGRyYXduXG4gIGRpc3BsYXkoZ2VvanNvbik7XG5cbiAgY29uc3QgZGlzcGxheU1lYXN1cmVtZW50cyA9IGdldERpc3BsYXlNZWFzdXJlbWVudHMoZ2VvanNvbik7XG5cbiAgLy8gY3JlYXRlIGN1c3RvbSBmZWF0dXJlIGZvciB0aGUgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uXG4gIGNvbnN0IGN1cnJlbnRWZXJ0ZXggPSB7XG4gICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG1ldGE6ICdjdXJyZW50UG9zaXRpb24nLFxuICAgICAgYWN0aXZlOiAndHJ1ZScsXG4gICAgICByYWRpdXNNZXRyaWM6IGRpc3BsYXlNZWFzdXJlbWVudHMubWV0cmljLFxuICAgICAgcmFkaXVzU3RhbmRhcmQ6IGRpc3BsYXlNZWFzdXJlbWVudHMuc3RhbmRhcmQsXG4gICAgICBwYXJlbnQ6IHN0YXRlLmxpbmUuaWRcbiAgICB9LFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXM6IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1cbiAgICB9XG4gIH07XG4gIGRpc3BsYXkoY3VycmVudFZlcnRleCk7XG5cbiAgLy8gY3JlYXRlIGN1c3RvbSBmZWF0dXJlIGZvciByYWRpdXMgY2lyY2xlbWFya2VyXG4gIGNvbnN0IGNlbnRlciA9IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF07XG4gIGNvbnN0IHJhZGl1c0luS20gPSBsaW5lRGlzdGFuY2UoZ2VvanNvbiwgJ2tpbG9tZXRlcnMnKTtcbiAgY29uc3QgY2lyY2xlRmVhdHVyZSA9IGNyZWF0ZUdlb0pTT05DaXJjbGUoY2VudGVyLCByYWRpdXNJbkttLCBzdGF0ZS5saW5lLmlkKTtcbiAgY2lyY2xlRmVhdHVyZS5wcm9wZXJ0aWVzLm1ldGEgPSAncmFkaXVzJztcblxuICBkaXNwbGF5KGNpcmNsZUZlYXR1cmUpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhZGl1c01vZGU7XG4iLCIvLyBpbXBvcnQgeyBTdG9yYWdlQVBJIH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2VBUEknO1xuXG4vKipcbiogVGhpcyBjb21wb25lbnQgaXMgaW50ZW5kZWQgdG8gaGFuZGxlIHRoZSBzdG9yYWdlIGFuZCByZXRyaWV2YWwgb2YgdGhlIHN0YXRlIG9mXG4qIEFzIG9mIHRoaXMgd3JpdGluZyBpdCBpcyB1c2luZyBsb2NhbFN0b3JhZ2UgdG8gZG8gdGhpcy5cbiogVXNlcyBzaW1wbGUgY2xhc3MgaW5zdGFuY2UgbWV0aG9kcyB3aXRoIHRoZSBzaG9ydC1oYW5kIG1ldGhvZCBkZWNsYXJhdGlvblxuKiBwYXR0ZXJuLlxuKlxuKiBUbyBub3RlOiBUaGVyZSBpcyBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgU3RvcmUgYW5kIHRoZSBTdGF0ZS4gQXMgb2YgMGEzMTA2ZVxuKiB0aGUgU3RvcmUgaXMgYSBTdHJpbmcgc2F2ZWQgdG8gdGhlIGJyb3dzZXJzIGxvY2FsU3RvcmFnZSBhbmQgaXMgYSBzZXJpYWxpemVkXG4qIHZlcnNpb24gb2YgdGhlIFN0YXRlLiBUaGUgU3RhdGUgaXMgYW4gT2JqZWN0IHdoaWNoIGlzIGludGVyYWN0ZWQgd2l0aCBieVxuKiBwYXJzaW5nIHRoZSBTdGF0ZSBzdHJpbmcgZnJvbSB0aGUgU3RvcmUsIG1vZGlmeWluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcGFyc2UsXG4qIGFuZCByZS1zZXJpYWxpemluZyBpdCBiYWNrIHRvIHRoZSBTdG9yZS5cbiovXG5jb25zdCBTVEFURV9LRVkgPSAnc3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAvLyAuLmFuZCBhbiAob3B0aW9uYWwpIGN1c3RvbSBjbGFzcyBjb25zdHJ1Y3Rvci4gSWYgb25lIGlzXG4gIC8vIG5vdCBzdXBwbGllZCwgYSBkZWZhdWx0IGNvbnN0cnVjdG9yIGlzIHVzZWQgaW5zdGVhZDpcbiAgLy8gY29uc3RydWN0b3IoKSB7IH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIC8vIHRoaXMuc3RvcmUgPSBuZXcgU3RvcmFnZUFQSSgpO1xuICAgIGlmIChTdG9yZS5zdG9yYWdlQXZhaWxhYmxlKCkpIHtcbiAgICAgIHRoaXMuc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0geyBTVEFURV9LRVkgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXRzIGEga2V5L3ZhbHVlIHBhaXIgdG8gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGVJdGVtKGtleSA9ICcnLCB2YWx1ZSA9ICcnKSB7XG4gICAgY29uc3Qgc3RvcmVPYmogPSB7IFtrZXldOiB2YWx1ZSB9O1xuICAgIGNvbnN0IG5ld1N0YXRlT2JqID0geyAuLi50aGlzLmdldFN0YXRlKCksIC4uLnN0b3JlT2JqIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZU9iaik7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBlbnRpcmUgc3RhdGUgb2JqZWN0XG4gIC8vXG4gIC8vIEByZXR1cm4gb2JqZWN0XG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSA/IEpTT04ucGFyc2UodGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpIDoge307XG4gIH1cblxuICAvLyBHZXRzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldEl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIEdcbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0l0ZW0oa2V5KSA/IHRoaXMuZ2V0U3RhdGUoKVtrZXldIDoge307XG4gICAgLy8gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8vIFNldHMgYSBuZXcgc3RhdGUgb2JqZWN0IHN0YXRlXG4gIC8vXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZSh2YWx1ZSA9IHt9KSB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oU1RBVEVfS0VZLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG5cblxuICAvLyBDaGVja3MgaWYgdGhlIHN0YXRlIGV4aXN0cyBpbiB0aGUgc3RvcmFnZSBwcm92aWRlclxuICBjaGVja1N0YXRlRXhpc3RzKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKTtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIHN0YXRlIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgLy9cbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVBc1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJdGVtKFNUQVRFX0tFWSk7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbiBpdGVtIGhhcyBiZWVuIHNhdmVkIHRvIHRoZSBzdG9yZVxuICAvLyB1bnVzZWQgYXMgb2YgMGEzMTA2ZVxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgaXNTdGF0ZUl0ZW1FeGlzdChpdGVtKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpKSB7XG4gICAgICBjb25zdCBzdGF0ZVN0ciA9IHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpO1xuICAgICAgaWYgKHN0YXRlU3RyLmluZGV4T2YoaXRlbSkgPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgY2hlY2tJdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgJiYgdGhpcy5nZXRTdGF0ZUFzU3RyaW5nKCkuaW5kZXhPZihpdGVtKSA+IDA7XG4gIH1cblxuICAvLyBDaGVjayBpZiBsb2NhbFN0b3JhZ2UgYXZhaWxhYmxlLlxuICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfU3RvcmFnZV9BUEkvVXNpbmdfdGhlX1dlYl9TdG9yYWdlX0FQSVxuICAvL1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgc3RhdGljIHN0b3JhZ2VBdmFpbGFibGUoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdsb2NhbFN0b3JhZ2UnO1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgY29uc3QgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==