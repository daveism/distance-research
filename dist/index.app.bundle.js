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
/******/ 	var hotCurrentHash = "2a9213fa9178065d0f10";
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

      var fooObj = this.foo; // eslint-disable-line
      gtag('event', store.getStateItem('uuid'), { // eslint-disable-line
        event_category: category,
        event_label: label,
        value: '' + value,
        uuid: store.getStateItem('uuid')
      });
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

var urlString = window.location.href;
var url = new URL(urlString);
var userType = url.searchParams.get('userType');

// ga event action, category, label
googleAnalytics.setEvent('data', 'userType', userType);

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
  document.getElementById('map-action-holder').classList.remove('h-80');
  document.getElementById('map-action-holder').classList.add('h-70');
  return null;
}

function handleDissagreeClick() {
  document.getElementById('study-progress').classList.remove('d-none');
  document.getElementById('study-dissaggree').classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');
  document.getElementById('study-progress').remove();
  store.setStateItem('study-agreement', false);
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

function isMobileDevice() {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera); // eslint-disable-line
  return check;
}

function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join('-');
}

function handleDrawButtonClick(e) {
  var circleButtonElem = document.getElementById('circle-button');
  if (circleButtonElem) {
    if (circleButtonElem.classList.contains('disabled')) {
      $('#circle-button').tooltip({ trigger: 'hover focus' });
      $('#circle-button').tooltip('show');
      return null;
    } else {
      // eslint-disable-line
      $('#circle-button').tooltip({ trigger: 'manual' });
      $('#circle-button').tooltip('hide');
      $('#circle-button').tooltip('disable');
      $('#circle-button').tooltip('dispose');
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

  var submitButtonElem = document.getElementById('submit-button');
  if (submitButtonElem) {
    submitButtonElem.classList.remove('disabled');
  }
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
  document.getElementById('study-complete').classList.remove('d-none');
  document.getElementById('study-progress').remove();
  document.getElementById('map-holder').remove();
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
  }
});

var geocodeElem = document.getElementById('geocoder');
if (geocodeElem) {
  geocodeElem.appendChild(geocoder.onAdd(map));
}
var drawCircleElement = document.querySelector('.btn-draw-circle');
if (drawCircleElement) {
  drawCircleElement.addEventListener('click', handleDrawButtonClick);
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
    var distancekm = store.getStateItem('distancekm');
    var distancefeet = store.getStateItem('distancefeet');

    // ga event action, category, label
    googleAnalytics.setEvent('data', 'circle', circle);
    googleAnalytics.setEvent('data', 'line', line);
    googleAnalytics.setEvent('data', 'distancekm', distancekm);
    googleAnalytics.setEvent('data', 'distancefeet', distancefeet);

    // end study
    document.getElementById('study-complete').classList.remove('d-none');
    document.getElementById('study-progress').remove();
    store.setStateItem('studycompleted', true);
  }
  return null;
}

var submitButtonElem = document.getElementById('submit-button');
if (submitButtonElem) {
  submitButtonElem.addEventListener('click', handleSubmitButtonClick);
}

var directionsOne = ['Search for a location you care about.', 'Search for a location to find about crime.', 'Search for a location to find about a pizza place.'];

var minOne = 0;
var maxOne = 2;
var messageIndexOne = Math.floor(Math.random() * (maxOne - minOne + 1) + minOne);
var stepDirections1 = document.getElementById('step1-directions');
if (stepDirections1) {
  stepDirections1.innerHTML = directionsOne[messageIndexOne];
}

// ga event action, category, label
googleAnalytics.setEvent('data', 'step1text', directionsOne[messageIndexOne]);

var directionsTwo = ['Draw a circle that represents 1 mile from the location.', 'Draw a circle that represents a 5 minute <strong>DRIVE</strong>.', 'Draw a circle that represents a 5 minute <strong>WALK</strong>.'];

var minTwo = 0;
var maxTwo = 2;
var messageIndexTwo = Math.floor(Math.random() * (maxTwo - minTwo + 1) + minTwo);
var stepDirections2 = document.getElementById('step2-directions');
if (stepDirections2) {
  stepDirections2.innerHTML = directionsTwo[messageIndexTwo];
}

// ga event action, category, label
googleAnalytics.setEvent('data', 'step2text', directionsTwo[messageIndexTwo]);

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
    store.setStateItem('distancefeet', feet);

    // ga event action, category, label
    googleAnalytics.setEvent('data', 'circle-presubmit', JSON.stringify(circleGeoJSON));
    googleAnalytics.setEvent('data', 'line-presubmit', JSON.stringify(lineGeoJson));
    googleAnalytics.setEvent('data', 'distancekm-presubmit', feet);
    googleAnalytics.setEvent('data', 'distancefeet-presubmit', feet);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZHJhd3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yYWRpdXNNb2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0b3JlLmpzIl0sIm5hbWVzIjpbImlkIiwidHlwZSIsImZpbHRlciIsImxheW91dCIsInBhaW50IiwiYmFzZSIsInN0b3BzIiwic3RvcmUiLCJTdG9yZSIsIkdvb2dsZUFuYWx5dGljcyIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJ2YWx1ZSIsImZvb09iaiIsImd0YWciLCJnZXRTdGF0ZUl0ZW0iLCJldmVudF9jYXRlZ29yeSIsImV2ZW50X2xhYmVsIiwidXVpZCIsImdvb2dsZUFuYWx5dGljcyIsImxpYnJhcnkiLCJhZGQiLCJmYXMiLCJmYXIiLCJkb20iLCJ3YXRjaCIsInVybFN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInVybCIsIlVSTCIsInVzZXJUeXBlIiwic2VhcmNoUGFyYW1zIiwiZ2V0Iiwic2V0RXZlbnQiLCJtYXBib3hnbCIsImFjY2Vzc1Rva2VuIiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJjZW50ZXIiLCJ6b29tIiwic2hvd1pvb20iLCJ0b3VjaEVuYWJsZWQiLCJrZXliaW5kaW5ncyIsImRyYXdDb250cm9sIiwiTWFwYm94RHJhdyIsImRpc3BsYXlDb250cm9sc0RlZmF1bHQiLCJjb250cm9scyIsInJlY3RhbmdsZSIsInBvbHlnb24iLCJsaW5lX3N0cmluZyIsInRyYXNoIiwib3B0aW9ucyIsInRvdWNoQnVmZmVyIiwic3R5bGVzIiwiZHJhd1N0eWxlcyIsIm1vZGVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZHJhd19yYWRpdXMiLCJSYWRpdXNNb2RlIiwiYWRkQ29udHJvbCIsIm5hdiIsIk5hdmlnYXRpb25Db250cm9sIiwiZ2VvY29kZXIiLCJNYXBib3hHZW9jb2RlciIsInNldFpvb20iLCJmbHlUbyIsInBsYWNlaG9sZGVyIiwib24iLCJnZXRab29tIiwiY2lyY2xlQnV0dG9uRWxlbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsIiQiLCJ0b29sdGlwIiwidHJpZ2dlciIsImhhbmRsZUFncmVlQ2xpY2siLCJzZXRTdGF0ZUl0ZW0iLCJoYW5kbGVEaXNzYWdyZWVDbGljayIsImNoZWNrVmFsaWRPYmplY3QiLCJvYmoiLCJ1bmRlZmluZWQiLCJrZXlzIiwibGVuZ3RoIiwiaXNNb2JpbGVEZXZpY2UiLCJjaGVjayIsImEiLCJ0ZXN0Iiwic3Vic3RyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidmVuZG9yIiwib3BlcmEiLCJjcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJVaW50MzJBcnJheSIsImpvaW4iLCJoYW5kbGVEcmF3QnV0dG9uQ2xpY2siLCJlIiwiZ2V0TGF5ZXIiLCJyZW1vdmVMYXllciIsImdldFNvdXJjZSIsInJlbW92ZVNvdXJjZSIsImNoYW5nZU1vZGUiLCJzdWJtaXRCdXR0b25FbGVtIiwiaXNTdHVkeWNvbXBsZXRlZCIsInN0dWR5Q29tcGxldGVkIiwiU3R1ZHlBZ3JyZWVtZW50Iiwic3R1ZHlBZ3JyZWVkIiwieCIsInJlc3VsdCIsInkiLCJvZmZzZXRkaXN0IiwiYmJveCIsIm1pbiIsIm1heCIsInptIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZml0Qm91bmRzIiwibWF4Wm9vbSIsImdlb2NvZGVFbGVtIiwiYXBwZW5kQ2hpbGQiLCJvbkFkZCIsImRyYXdDaXJjbGVFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVTdWJtaXRCdXR0b25DbGljayIsImNpcmNsZSIsImxpbmUiLCJkaXN0YW5jZWttIiwiZGlzdGFuY2VmZWV0IiwiZGlyZWN0aW9uc09uZSIsIm1pbk9uZSIsIm1heE9uZSIsIm1lc3NhZ2VJbmRleE9uZSIsInN0ZXBEaXJlY3Rpb25zMSIsImlubmVySFRNTCIsImRpcmVjdGlvbnNUd28iLCJtaW5Ud28iLCJtYXhUd28iLCJtZXNzYWdlSW5kZXhUd28iLCJzdGVwRGlyZWN0aW9uczIiLCJhZ2dyZWVCdXR0b25FbGVtZW50IiwiZGlzc2FnZ3JlZUJ1dHRvbkVsZW1lbnQiLCJzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQiLCJkcmF3X2xpbmVfc3RyaW5nIiwiY3JlYXRlVmVydGV4IiwicGFyZW50SWQiLCJjb29yZGluYXRlcyIsInBhdGgiLCJzZWxlY3RlZCIsInByb3BlcnRpZXMiLCJtZXRhIiwicGFyZW50IiwiY29vcmRfcGF0aCIsImFjdGl2ZSIsImdlb21ldHJ5IiwiY3JlYXRlR2VvSlNPTkNpcmNsZSIsInJhZGl1c0luS20iLCJwb2ludHMiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImttIiwicmV0IiwiZGlzdGFuY2VYIiwiY29zIiwiUEkiLCJkaXN0YW5jZVkiLCJ0aGV0YSIsImkiLCJzaW4iLCJwdXNoIiwiZ2V0RGlzcGxheU1lYXN1cmVtZW50cyIsImZlYXR1cmUiLCJkcmF3bkxlbmd0aCIsIm1ldHJpY1VuaXRzIiwibWV0cmljRm9ybWF0IiwibWV0cmljTWVhc3VyZW1lbnQiLCJzdGFuZGFyZFVuaXRzIiwic3RhbmRhcmRGb3JtYXQiLCJzdGFuZGFyZE1lYXN1cmVtZW50IiwiZGlzcGxheU1lYXN1cmVtZW50cyIsIm1ldHJpYyIsImZvcm1hdCIsInN0YW5kYXJkIiwiZG91YmxlQ2xpY2tab29tIiwiZW5hYmxlIiwiY3R4Iiwic2V0VGltZW91dCIsIl9jdHgiLCJnZXRJbml0aWFsQ29uZmlnVmFsdWUiLCJvbktleVVwIiwic3RhdGUiLCJrZXlDb2RlIiwiZGVsZXRlRmVhdHVyZSIsInNpbGVudCIsIm9uVG91Y2hNb3ZlRHJhdyIsImN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiIsInJlbW92ZUNvb3JkaW5hdGUiLCJhZGRDb29yZGluYXRlIiwibG5nTGF0IiwibG5nIiwibGF0IiwidXBkYXRlQ29vcmRpbmF0ZSIsImRpcmVjdGlvbiIsImludGVyYWN0aXZlRHJhdyIsImV2ZW50VHlwZSIsInNlbGYiLCJmZWF0dXJlSWRzIiwidXBkYXRlVUlDbGFzc2VzIiwibW91c2UiLCJvblRvdWNoU3RhcnQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsImNsaWNrQW55d2hlcmUiLCJvblN0b3AiLCJhY3RpdmF0ZVVJQnV0dG9uIiwiZ2V0RmVhdHVyZSIsImlzVmFsaWQiLCJsaW5lR2VvSnNvbiIsInRvR2VvSlNPTiIsInN0YXJ0UG9pbnQiLCJkaXN0YW5jZSIsImNpcmNsZUdlb0pTT04iLCJmZWV0IiwiSlNPTiIsInN0cmluZ2lmeSIsInBvaW50V2l0aFJhZGl1cyIsInJhZGl1c01ldHJpYyIsInRvRml4ZWQiLCJyYWRpdXNGZWV0IiwiYWRkU291cmNlIiwiZGF0YSIsImFkZExheWVyIiwic291cmNlIiwiZmlyZSIsImZlYXR1cmVzIiwidG9EaXNwbGF5RmVhdHVyZXMiLCJnZW9qc29uIiwiZGlzcGxheSIsImlzQWN0aXZlTGluZSIsImN1cnJlbnRWZXJ0ZXgiLCJyYWRpdXNTdGFuZGFyZCIsImNpcmNsZUZlYXR1cmUiLCJTVEFURV9LRVkiLCJzdG9yYWdlQXZhaWxhYmxlIiwic3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsImNoZWNrU3RhdGVFeGlzdHMiLCJnZXRTdGF0ZSIsImtleSIsInN0b3JlT2JqIiwibmV3U3RhdGVPYmoiLCJzZXRTdGF0ZSIsInBhcnNlIiwiZ2V0SXRlbSIsImNoZWNrSXRlbSIsInNldEl0ZW0iLCJCb29sZWFuIiwiaXRlbSIsInN0YXRlU3RyIiwiZ2V0U3RhdGVBc1N0cmluZyIsImluZGV4T2YiLCJyZW1vdmVJdGVtIiwiRE9NRXhjZXB0aW9uIiwiY29kZSIsIm5hbWUiXSwibWFwcGluZ3MiOiI7QUFB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MEI7QUFDeEIsVUFBTS9RLE9BQU8sY0FBYjtBQUNBLFVBQUlrUSxnQkFBSjtBQUNBLFVBQUk7QUFDRkEsa0JBQVV0TyxPQUFPNUIsSUFBUCxDQUFWO0FBQ0EsWUFBTXFILElBQUksa0JBQVY7QUFDQTZJLGdCQUFRVyxPQUFSLENBQWdCeEosQ0FBaEIsRUFBbUJBLENBQW5CO0FBQ0E2SSxnQkFBUWlCLFVBQVIsQ0FBbUI5SixDQUFuQjtBQUNBLGVBQU8sSUFBUDtBQUNELE9BTkQsQ0FNRSxPQUFPWCxDQUFQLEVBQVU7QUFDVixlQUFPQSxhQUFhMEssWUFBYjtBQUNMO0FBQ0ExSyxVQUFFMkssSUFBRixLQUFXLEVBQVg7QUFDQTtBQUNBM0ssVUFBRTJLLElBQUYsS0FBVyxJQUZYO0FBR0E7QUFDQTtBQUNBM0ssVUFBRTRLLElBQUYsS0FBVyxvQkFMWDtBQU1BO0FBQ0E1SyxVQUFFNEssSUFBRixLQUFXLDRCQVROO0FBVUw7QUFDQXBCLGdCQUFRdkssTUFBUixLQUFtQixDQVhyQjtBQVlEO0FBQ0YiLCJmaWxlIjoiaW5kZXguYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMmE5MjEzZmE5MTc4MDY1ZDBmMTBcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc35pbmRleFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9OWUNQbGFubmluZy9sYWJzLWZhY3RmaW5kZXIvYmxvYi80YTY3ZGEyNzNiNmZmODc1ODhmNTA0NGExNWIzNDkwZDRhYzA3YTI1L2FwcC9sYXllcnMvZHJhdy1zdHlsZXMuanNcbmV4cG9ydCBkZWZhdWx0IFtcbiAgLy8gQUNUSVZFIChiZWluZyBkcmF3bilcbiAgLy8gbGluZSBzdHJva2VcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1saW5lJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnTGluZVN0cmluZyddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnI0Q5NkIyNycsXG4gICAgICAnbGluZS1kYXNoYXJyYXknOiBbMC4yLCAyXSxcbiAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgIH1cbiAgfSxcblxuICAvLyBwb2x5Z29uIGZpbGxcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWZpbGwnLFxuICAgIHR5cGU6ICdmaWxsJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdmaWxsLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgJ2ZpbGwtb3V0bGluZS1jb2xvcic6ICcjRDIwQzBDJyxcbiAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICB9XG4gIH0sXG5cbiAgLy8gcG9seWdvbiBvdXRsaW5lIHN0cm9rZVxuICAvLyBUaGlzIGRvZXNuJ3Qgc3R5bGUgdGhlIGZpcnN0IGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHdoaWNoIHVzZXMgdGhlIGxpbmUgc3Ryb2tlIHN0eWxpbmcgaW5zdGVhZFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tc3Ryb2tlLWFjdGl2ZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAnbGluZS13aWR0aCc6IDRcbiAgICB9XG4gIH0sXG4gIC8vIHZlcnRleCBwb2ludCBoYWxvc1xuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tYW5kLWxpbmUtdmVydGV4LWhhbG8tYWN0aXZlJyxcbiAgICB0eXBlOiAnY2lyY2xlJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICdtZXRhJywgJ3ZlcnRleCddLCBbJz09JywgJyR0eXBlJywgJ1BvaW50J10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdjaXJjbGUtcmFkaXVzJzogNyxcbiAgICAgICdjaXJjbGUtY29sb3InOiAnI0ZGRidcbiAgICB9XG4gIH0sXG4gIC8vIHZlcnRleCBwb2ludHNcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWFuZC1saW5lLXZlcnRleC1hY3RpdmUnLFxuICAgIHR5cGU6ICdjaXJjbGUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJ21ldGEnLCAndmVydGV4J10sIFsnPT0nLCAnJHR5cGUnLCAnUG9pbnQnXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2NpcmNsZS1yYWRpdXMnOiA2LFxuICAgICAgJ2NpcmNsZS1jb2xvcic6ICcjRDk2QjI3J1xuICAgIH1cbiAgfSxcblxuICAvLyByYWRpdXMgbGFiZWxcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1yYWRpdXMtbGFiZWwnLFxuICAgIHR5cGU6ICdzeW1ib2wnLFxuICAgIGZpbHRlcjogWyc9PScsICdtZXRhJywgJ2N1cnJlbnRQb3NpdGlvbiddLFxuICAgIGxheW91dDoge1xuICAgICAgJ3RleHQtZmllbGQnOiAne3JhZGl1c0ZlZXR9IFxcbiB7cmFkaXVzTWlsZXN9JyxcbiAgICAgICd0ZXh0LWFuY2hvcic6ICdsZWZ0JyxcbiAgICAgICd0ZXh0LW9mZnNldCc6IFtcbiAgICAgICAgMSxcbiAgICAgICAgMFxuICAgICAgXSxcbiAgICAgICd0ZXh0LXNpemUnOiAyMlxuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICd0ZXh0LWNvbG9yJzogJ3JnYmEoMCwgMCwgMCwgMSknLFxuICAgICAgJ3RleHQtaGFsby1jb2xvcic6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJyxcbiAgICAgICd0ZXh0LWhhbG8td2lkdGgnOiAzLFxuICAgICAgJ2ljb24tb3BhY2l0eSc6IHtcbiAgICAgICAgYmFzZTogMSxcbiAgICAgICAgc3RvcHM6IFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICA3Ljk5LFxuICAgICAgICAgICAgMVxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICBdXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICAndGV4dC1oYWxvLWJsdXInOiAxXG4gICAgfVxuICB9LFxuXG4gIC8vIElOQUNUSVZFIChzdGF0aWMsIGFscmVhZHkgZHJhd24pXG4gIC8vIGxpbmUgc3Ryb2tlXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctbGluZS1zdGF0aWMnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdMaW5lU3RyaW5nJ10sIFsnPT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdsaW5lLXdpZHRoJzogM1xuICAgIH1cbiAgfSxcbiAgLy8gcG9seWdvbiBmaWxsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1maWxsLXN0YXRpYycsXG4gICAgdHlwZTogJ2ZpbGwnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWyc9PScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2ZpbGwtY29sb3InOiAnIzAwMCcsXG4gICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuMVxuICAgIH1cbiAgfSxcbiAgLy8gcG9seWdvbiBvdXRsaW5lXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1zdHJva2Utc3RhdGljJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJz09JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnIzAwMCcsXG4gICAgICAnbGluZS13aWR0aCc6IDNcbiAgICB9XG4gIH1cbl07XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5cbmV4cG9ydCBjbGFzcyBHb29nbGVBbmFseXRpY3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvbyA9IHt9O1xuICB9XG5cbiAgc2V0RXZlbnQoYWN0aW9uID0gJycsIGNhdGVnb3J5ID0gJycsIGxhYmVsID0gJycsIHZhbHVlID0gMCkge1xuICAgIGNvbnN0IGZvb09iaiA9IHRoaXMuZm9vOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZ3RhZygnZXZlbnQnLCBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKSwgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgICAgZXZlbnRfbGFiZWw6IGxhYmVsLFxuICAgICAgdmFsdWU6IGAke3ZhbHVlfWAsXG4gICAgICB1dWlkOiBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKVxuICAgIH0pO1xuICB9XG59XG4iLCIvLyBpbXBvcnQgZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBsaWJyYXJ5LCBkb20gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgZmFzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IGZhciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zJztcbmltcG9ydCBtYXBib3hnbCBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IE1hcGJveERyYXcgZnJvbSAnQG1hcGJveC9tYXBib3gtZ2wtZHJhdyc7XG5pbXBvcnQgTWFwYm94R2VvY29kZXIgZnJvbSAnQG1hcGJveC9tYXBib3gtZ2wtZ2VvY29kZXInO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBSYWRpdXNNb2RlIGZyb20gJy4vcmFkaXVzTW9kZSc7XG5pbXBvcnQgZHJhd1N0eWxlcyBmcm9tICcuL2RyYXdzdHlsZXMnO1xuaW1wb3J0IHsgR29vZ2xlQW5hbHl0aWNzIH0gZnJvbSAnLi9nYSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcbmNvbnN0IGdvb2dsZUFuYWx5dGljcyA9IG5ldyBHb29nbGVBbmFseXRpY3MoKTtcblxuLy8gS2lja3Mgb2ZmIHRoZSBwcm9jZXNzIG9mIGZpbmRpbmcgPGk+IHRhZ3MgYW5kIHJlcGxhY2luZyB3aXRoIDxzdmc+XG4vLyBhZGRlcyBzdXBwb3J0IGZvciBmb250YXdlc29tZVxubGlicmFyeS5hZGQoZmFzLCBmYXIpO1xuZG9tLndhdGNoKCk7XG5cbmNvbnN0IHVybFN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuY29uc3QgdXJsID0gbmV3IFVSTCh1cmxTdHJpbmcpO1xuY29uc3QgdXNlclR5cGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgndXNlclR5cGUnKTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICd1c2VyVHlwZScsIHVzZXJUeXBlKTtcblxubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuXG5jb25zdCBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcbiAgY29udGFpbmVyOiAnbWFwJyxcbiAgc3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJyxcbiAgLy8gJ21hcGJveDovL3N0eWxlcy9kYXZlaXNtL2Nqd3JyZGZkMjB1aWMxZG56c3RpMm93bGsnLCAtIGRhcmtcbiAgY2VudGVyOiBbLTk4LCAzOC44OF0sIC8vIHN0YXJ0aW5nIHBvc2l0aW9uIFtsbmcsIGxhdF1cbiAgem9vbTogMywgLy8gc3RhcnRpbmcgem9vbVxuICBzaG93Wm9vbTogdHJ1ZSxcbiAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICBrZXliaW5kaW5nczogdHJ1ZVxufSk7XG5cbi8vIHNldHVwIG1hcFxuY29uc3QgZHJhd0NvbnRyb2wgPSBuZXcgTWFwYm94RHJhdyh7XG4gIGRpc3BsYXlDb250cm9sc0RlZmF1bHQ6IHRydWUsXG4gIGNvbnRyb2xzOiB7XG4gICAgcmVjdGFuZ2xlOiB0cnVlLFxuICAgIHBvbHlnb246IHRydWUsXG4gICAgbGluZV9zdHJpbmc6IHRydWUsXG4gICAgdHJhc2g6IHRydWVcbiAgfSxcbiAgb3B0aW9uczoge1xuICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICB0b3VjaEJ1ZmZlcjogMTBcbiAgfSxcbiAgc3R5bGVzOiBkcmF3U3R5bGVzLFxuICBtb2RlczogT2JqZWN0LmFzc2lnbih7XG4gICAgZHJhd19yYWRpdXM6IFJhZGl1c01vZGVcbiAgfSwgTWFwYm94RHJhdy5tb2Rlcylcbn0pO1xuXG5tYXAuYWRkQ29udHJvbChkcmF3Q29udHJvbCk7XG5cbmNvbnN0IG5hdiA9IG5ldyBtYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCgpO1xubWFwLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcblxuY29uc3QgZ2VvY29kZXIgPSBuZXcgTWFwYm94R2VvY29kZXIoe1xuICBhY2Nlc3NUb2tlbjogbWFwYm94Z2wuYWNjZXNzVG9rZW4sXG4gIG1hcGJveGdsLFxuICBzZXRab29tOiA4LFxuICBmbHlUbzogZmFsc2UsXG4gIHBsYWNlaG9sZGVyOiAnU2VhcmNoIGZvciBhIGxvY2F0aW9uLi4uJ1xufSk7XG5cbm1hcC5vbignem9vbWVuZCcsICgpID0+IHtcbiAgaWYgKG1hcC5nZXRab29tKCkgPiAxMCkge1xuICAgIGNvbnN0IGNpcmNsZUJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLWJ1dHRvbicpO1xuICAgIGlmIChjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ21hbnVhbCcgfSk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNwb3NlJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItdGl0bGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLWRpcmVjdGlvbnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIGZ1bmN0aW9uXG5mdW5jdGlvbiBoYW5kbGVBZ3JlZUNsaWNrKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWFncmVlbWVudC1hbGwnKS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWRpc3NhZ2dyZWUnKS5yZW1vdmUoKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCB0cnVlKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1hY3Rpb24taG9sZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaC04MCcpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QuYWRkKCdoLTcwJyk7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEaXNzYWdyZWVDbGljaygpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1kaXNzYWdncmVlJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1hZ3JlZW1lbnQtYWxsJykuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLnJlbW92ZSgpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGVuc3VyZSB0aGUgb2JqZWN0IG9yIHZhcmlhYmxlIGlzIHZhbGlkLi4uXG4vLyBAcGFyYW0gb2JqIC0gdHlwZWxlc3NcbmZ1bmN0aW9uIGNoZWNrVmFsaWRPYmplY3Qob2JqKSB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnICYmIG9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzTW9iaWxlRGV2aWNlKCkge1xuICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgKGZ1bmN0aW9uKGEpe2lmKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSBjaGVjayA9IHRydWU7fSkobmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICByZXR1cm4gY2hlY2s7XG59XG5cbmZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSg0KSkuam9pbignLScpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmF3QnV0dG9uQ2xpY2soZSkge1xuICBjb25zdCBjaXJjbGVCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1idXR0b24nKTtcbiAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0pIHtcbiAgICBpZiAoY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdob3ZlciBmb2N1cycgfSk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ3Nob3cnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdtYW51YWwnIH0pO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdoaWRlJyk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzcG9zZScpO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdDb250cm9sLnRyYXNoKCk7XG5cbiAgaWYgKG1hcC5nZXRMYXllcignY2lyY2xlLWxpbmUnKSkge1xuICAgIG1hcC5yZW1vdmVMYXllcignY2lyY2xlLWxpbmUnKTtcbiAgfVxuXG4gIGlmIChtYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1maWxsJykpIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1maWxsJyk7XG4gIH1cbiAgaWYgKG1hcC5nZXRTb3VyY2UoJ2NpcmNsZScpKSB7XG4gICAgbWFwLnJlbW92ZVNvdXJjZSgnY2lyY2xlJyk7XG4gIH1cblxuICBkcmF3Q29udHJvbC5jaGFuZ2VNb2RlKCdkcmF3X3JhZGl1cycpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbicpO1xuICBpZiAoc3VibWl0QnV0dG9uRWxlbSkge1xuICAgIHN1Ym1pdEJ1dHRvbkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBpc1N0dWR5Y29tcGxldGVkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcpO1xubGV0IHN0dWR5Q29tcGxldGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIGlzU3R1ZHljb21wbGV0ZWQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUNvbXBsZXRlZCA9IGlzU3R1ZHljb21wbGV0ZWQ7XG59IGVsc2Uge1xuICBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBjb21wbGV0ZXRpb25cbmNvbnN0IFN0dWR5QWdycmVlbWVudCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG5sZXQgc3R1ZHlBZ3JyZWVkID0gZmFsc2U7XG5pZiAodHlwZW9mIFN0dWR5QWdycmVlbWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gIHN0dWR5QWdycmVlZCA9IFN0dWR5QWdycmVlbWVudDtcbn0gZWxzZSB7XG4gIHN0dWR5QWdycmVlZCA9IGZhbHNlO1xufVxuXG4vLyBhbHJlYWR5IGFncmVlZFxuaWYgKHN0dWR5QWdycmVlZCkge1xuICAvLyBoYW5kbGVBZ3JlZUNsaWNrKCk7XG59XG5cbi8vIGhpZGUgc3R1ZHlcbmlmIChzdHVkeUNvbXBsZXRlZCkgeyAvLyB8fCBzdHVkeUFncnJlZWRcbiAgaGFuZGxlQWdyZWVDbGljaygpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktY29tcGxldGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykucmVtb3ZlKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtaG9sZGVyJykucmVtb3ZlKCk7XG59IGVsc2Uge1xuICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIGZhbHNlKTtcbn1cblxuaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3V1aWQnLCB1dWlkKCkpO1xufVxuXG5nZW9jb2Rlci5vbigncmVzdWx0JywgKGUpID0+IHtcbiAgY29uc3QgeCA9IGUucmVzdWx0LmNlbnRlclswXTtcbiAgY29uc3QgeSA9IGUucmVzdWx0LmNlbnRlclsxXTtcblxuICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc2VhcmNocG9pbnQnLCBgJHt4fSwgJHt5fWApO1xuXG4gIGNvbnN0IG9mZnNldGRpc3QgPSAwLjAwMjU7XG4gIGNvbnN0IGJib3ggPSBbW3ggLSBvZmZzZXRkaXN0LCB5IC0gb2Zmc2V0ZGlzdF0sIFt4ICsgb2Zmc2V0ZGlzdCwgeSArIG9mZnNldGRpc3RdXTtcblxuICAvLyBjcmVhdGUgcmFuZG9tIHpvb20gaW5jYXNlIHVzZXJzIGFyZSBpbmZsdWVuY2VkIGJ5IGludGlhbCB6b29tbGV2ZWxcbiAgbGV0IG1pbiA9IDEwO1xuICBsZXQgbWF4ID0gMTQ7XG4gIGlmIChpc01vYmlsZURldmljZSgpKSB7XG4gICAgbWluID0gMTA7XG4gICAgbWF4ID0gMTU7XG4gIH1cblxuICBjb25zdCB6bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIG1hcC5maXRCb3VuZHMoYmJveCwgeyBtYXhab29tOiB6bSB9KTtcblxuICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc2VhcmNoem9vbScsIHptKTtcblxuXG4gIGNvbnN0IGNpcmNsZUJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLWJ1dHRvbicpO1xuICBpZiAoY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICBjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ21hbnVhbCcgfSk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdoaWRlJyk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNhYmxlJyk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNwb3NlJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLXRpdGxlJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gIH1cbn0pO1xuXG5jb25zdCBnZW9jb2RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW9jb2RlcicpO1xuaWYgKGdlb2NvZGVFbGVtKSB7XG4gIGdlb2NvZGVFbGVtLmFwcGVuZENoaWxkKGdlb2NvZGVyLm9uQWRkKG1hcCkpO1xufVxuY29uc3QgZHJhd0NpcmNsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWRyYXctY2lyY2xlJyk7XG5pZiAoZHJhd0NpcmNsZUVsZW1lbnQpIHtcbiAgZHJhd0NpcmNsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEcmF3QnV0dG9uQ2xpY2spO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdWJtaXRCdXR0b25DbGljayhlKSB7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbicpO1xuICBpZiAoc3VibWl0QnV0dG9uRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnIH0pO1xuICAgICQoJyNzdWJtaXQtYnV0dG9uJykudG9vbHRpcCgnc2hvdycpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ21hbnVhbCcgfSk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdoaWRlJyk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdkaXNhYmxlJyk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdkaXNwb3NlJyk7XG5cbiAgICBjb25zdCBjaXJjbGUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2NpcmNsZScpO1xuICAgIGNvbnN0IGxpbmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2xpbmUnKTtcbiAgICBjb25zdCBkaXN0YW5jZWttID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZWttJyk7XG4gICAgY29uc3QgZGlzdGFuY2VmZWV0ID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZWZlZXQnKTtcblxuICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2NpcmNsZScsIGNpcmNsZSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2xpbmUnLCBsaW5lKTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnZGlzdGFuY2VrbScsIGRpc3RhbmNla20pO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdkaXN0YW5jZWZlZXQnLCBkaXN0YW5jZWZlZXQpO1xuXG4gICAgLy8gZW5kIHN0dWR5XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykucmVtb3ZlKCk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIHRydWUpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBzdWJtaXRCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1idXR0b24nKTtcbmlmIChzdWJtaXRCdXR0b25FbGVtKSB7XG4gIHN1Ym1pdEJ1dHRvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTdWJtaXRCdXR0b25DbGljayk7XG59XG5cbmNvbnN0IGRpcmVjdGlvbnNPbmUgPSBbXG4gICdTZWFyY2ggZm9yIGEgbG9jYXRpb24geW91IGNhcmUgYWJvdXQuJyxcbiAgJ1NlYXJjaCBmb3IgYSBsb2NhdGlvbiB0byBmaW5kIGFib3V0IGNyaW1lLicsXG4gICdTZWFyY2ggZm9yIGEgbG9jYXRpb24gdG8gZmluZCBhYm91dCBhIHBpenphIHBsYWNlLidcbl07XG5cbmNvbnN0IG1pbk9uZSA9IDA7XG5jb25zdCBtYXhPbmUgPSAyO1xuY29uc3QgbWVzc2FnZUluZGV4T25lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE9uZSAtIG1pbk9uZSArIDEpICsgbWluT25lKTtcbmNvbnN0IHN0ZXBEaXJlY3Rpb25zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMS1kaXJlY3Rpb25zJyk7XG5pZiAoc3RlcERpcmVjdGlvbnMxKSB7XG4gIHN0ZXBEaXJlY3Rpb25zMS5pbm5lckhUTUwgPSBkaXJlY3Rpb25zT25lW21lc3NhZ2VJbmRleE9uZV07XG59XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3RlcDF0ZXh0JywgZGlyZWN0aW9uc09uZVttZXNzYWdlSW5kZXhPbmVdKTtcblxuY29uc3QgZGlyZWN0aW9uc1R3byA9IFtcbiAgJ0RyYXcgYSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIDEgbWlsZSBmcm9tIHRoZSBsb2NhdGlvbi4nLFxuICAnRHJhdyBhIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgYSA1IG1pbnV0ZSA8c3Ryb25nPkRSSVZFPC9zdHJvbmc+LicsXG4gICdEcmF3IGEgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyBhIDUgbWludXRlIDxzdHJvbmc+V0FMSzwvc3Ryb25nPi4nXG5dO1xuXG5jb25zdCBtaW5Ud28gPSAwO1xuY29uc3QgbWF4VHdvID0gMjtcbmNvbnN0IG1lc3NhZ2VJbmRleFR3byA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhUd28gLSBtaW5Ud28gKyAxKSArIG1pblR3byk7XG5jb25zdCBzdGVwRGlyZWN0aW9uczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpO1xuaWYgKHN0ZXBEaXJlY3Rpb25zMikge1xuICBzdGVwRGlyZWN0aW9uczIuaW5uZXJIVE1MID0gZGlyZWN0aW9uc1R3b1ttZXNzYWdlSW5kZXhUd29dO1xufVxuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0ZXAydGV4dCcsIGRpcmVjdGlvbnNUd29bbWVzc2FnZUluZGV4VHdvXSk7XG5cbmNvbnN0IGFnZ3JlZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdncmVlLWJ1dHRvbicpO1xuaWYgKGFnZ3JlZUJ1dHRvbkVsZW1lbnQpIHtcbiAgYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUFncmVlQ2xpY2spO1xufVxuXG5jb25zdCBkaXNzYWdncmVlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFnZ3JlZS1idXR0b24nKTtcbmlmIChkaXNzYWdncmVlQnV0dG9uRWxlbWVudCkge1xuICBkaXNzYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURpc3NhZ3JlZUNsaWNrKTtcbn1cblxuY29uc3Qgc3RlcDJNaW5vckRpcmVjdGlvbnNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLW1pbm9yLWRpcmVjdGlvbnMnKTtcbmlmIChzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQpIHtcbiAgaWYgKGlzTW9iaWxlRGV2aWNlKCkpIHtcbiAgICBzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQuaW5uZXJIVE1MID0gJ0NsaWNrIG9uIHRoZSBtYXAsIHRoZW4gZHJhZyB5b3VyIGZpbmdlciBhY3Jvc3MgdGhlIG1hcCB1bnRpbCB0aGUgY2lyY2xlIGJlc3QgcmVwcmVzZW50cyB0aGUgZGlzdGFuY2UuJztcbiAgfVxufVxuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY2hyaXN3aG9uZy82OTQ3NzliYzFmMWU1ZDkyNmU0N2JhYjcyMDVmYTU1OVxuLy8gY3VzdG9tIG1hcGJvcHgtZ2wtZHJhdyBtb2RlIHRoYXQgbW9kaWZpZXMgZHJhd19saW5lX3N0cmluZ1xuLy8gc2hvd3MgYSBjZW50ZXIgcG9pbnQsIHJhZGl1cyBsaW5lLCBhbmQgY2lyY2xlIHBvbHlnb24gd2hpbGUgZHJhd2luZ1xuLy8gZm9yY2VzIGRyYXcuY3JlYXRlIG9uIGNyZWF0aW9uIG9mIHNlY29uZCB2ZXJ0ZXhcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWRyYXcnO1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XG5pbXBvcnQgbGluZURpc3RhbmNlIGZyb20gJ0B0dXJmL2xpbmUtZGlzdGFuY2UnO1xuaW1wb3J0IHsgR29vZ2xlQW5hbHl0aWNzIH0gZnJvbSAnLi9nYSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBSYWRpdXNNb2RlID0gTWFwYm94RHJhdy5tb2Rlcy5kcmF3X2xpbmVfc3RyaW5nO1xuY29uc3QgZ29vZ2xlQW5hbHl0aWNzID0gbmV3IEdvb2dsZUFuYWx5dGljcygpO1xuXG4vLyBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2lzVG91Y2hNb3ZlJywgdHJ1ZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVZlcnRleChwYXJlbnRJZCwgY29vcmRpbmF0ZXMsIHBhdGgsIHNlbGVjdGVkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG1ldGE6ICd2ZXJ0ZXgnLFxuICAgICAgcGFyZW50OiBwYXJlbnRJZCxcbiAgICAgIGNvb3JkX3BhdGg6IHBhdGgsXG4gICAgICBhY3RpdmU6IChzZWxlY3RlZCkgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgfSxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzXG4gICAgfVxuICB9O1xufVxuXG4vLyBjcmVhdGUgYSBjaXJjbGUtbGlrZSBwb2x5Z29uIGdpdmVuIGEgY2VudGVyIHBvaW50IGFuZCByYWRpdXNcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTk5NTYxL2RyYXdpbmctYS1jaXJjbGUtd2l0aC10aGUtcmFkaXVzLWluLW1pbGVzLW1ldGVycy13aXRoLW1hcGJveC1nbC1qcy8zOTAwNjM4OCMzOTAwNjM4OFxuZnVuY3Rpb24gY3JlYXRlR2VvSlNPTkNpcmNsZShjZW50ZXIsIHJhZGl1c0luS20sIHBhcmVudElkLCBwb2ludHMgPSA2NCkge1xuICBjb25zdCBjb29yZHMgPSB7XG4gICAgbGF0aXR1ZGU6IGNlbnRlclsxXSxcbiAgICBsb25naXR1ZGU6IGNlbnRlclswXVxuICB9O1xuXG4gIGNvbnN0IGttID0gcmFkaXVzSW5LbTtcblxuICBjb25zdCByZXQgPSBbXTtcbiAgY29uc3QgZGlzdGFuY2VYID0ga20gLyAoMTExLjMyMCAqIE1hdGguY29zKChjb29yZHMubGF0aXR1ZGUgKiBNYXRoLlBJKSAvIDE4MCkpO1xuICBjb25zdCBkaXN0YW5jZVkgPSBrbSAvIDExMC41NzQ7XG5cbiAgbGV0IHRoZXRhO1xuICBsZXQgeDtcbiAgbGV0IHk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzOyBpICs9IDEpIHtcbiAgICB0aGV0YSA9IChpIC8gcG9pbnRzKSAqICgyICogTWF0aC5QSSk7XG4gICAgeCA9IGRpc3RhbmNlWCAqIE1hdGguY29zKHRoZXRhKTtcbiAgICB5ID0gZGlzdGFuY2VZICogTWF0aC5zaW4odGhldGEpO1xuXG4gICAgcmV0LnB1c2goW2Nvb3Jkcy5sb25naXR1ZGUgKyB4LCBjb29yZHMubGF0aXR1ZGUgKyB5XSk7XG4gIH1cbiAgcmV0LnB1c2gocmV0WzBdKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IFtyZXRdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBwYXJlbnQ6IHBhcmVudElkLFxuICAgICAgYWN0aXZlOiAndHJ1ZSdcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlNZWFzdXJlbWVudHMoZmVhdHVyZSkge1xuICAvLyBzaG91bGQgbG9nIGJvdGggbWV0cmljIGFuZCBzdGFuZGFyZCBkaXNwbGF5IHN0cmluZ3MgZm9yIHRoZSBjdXJyZW50IGRyYXduIGZlYXR1cmVcbiAgLy8gbWV0cmljIGNhbGN1bGF0aW9uXG4gIGNvbnN0IGRyYXduTGVuZ3RoID0gKGxpbmVEaXN0YW5jZShmZWF0dXJlKSAqIDEwMDApOyAvLyBtZXRlcnNcblxuICBsZXQgbWV0cmljVW5pdHMgPSAnbSc7XG4gIGxldCBtZXRyaWNGb3JtYXQgPSAnMCwwJztcbiAgbGV0IG1ldHJpY01lYXN1cmVtZW50O1xuXG4gIGxldCBzdGFuZGFyZFVuaXRzID0gJ2ZlZXQnO1xuICBsZXQgc3RhbmRhcmRGb3JtYXQgPSAnMCwwJztcbiAgbGV0IHN0YW5kYXJkTWVhc3VyZW1lbnQ7XG5cbiAgbWV0cmljTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aDtcbiAgaWYgKGRyYXduTGVuZ3RoID49IDEwMDApIHsgLy8gaWYgb3ZlciAxMDAwIG1ldGVycywgdXBncmFkZSBtZXRyaWNcbiAgICBtZXRyaWNNZWFzdXJlbWVudCA9IGRyYXduTGVuZ3RoIC8gMTAwMDtcbiAgICBtZXRyaWNVbml0cyA9ICdrbSc7XG4gICAgbWV0cmljRm9ybWF0ID0gJzAuMDAnO1xuICB9XG5cbiAgc3RhbmRhcmRNZWFzdXJlbWVudCA9IGRyYXduTGVuZ3RoICogMy4yODA4NDtcbiAgaWYgKHN0YW5kYXJkTWVhc3VyZW1lbnQgPj0gNTI4MCkgeyAvLyBpZiBvdmVyIDUyODAgZmVldCwgdXBncmFkZSBzdGFuZGFyZFxuICAgIHN0YW5kYXJkTWVhc3VyZW1lbnQgLz0gNTI4MDtcbiAgICBzdGFuZGFyZFVuaXRzID0gJ21pJztcbiAgICBzdGFuZGFyZEZvcm1hdCA9ICcwLjAwJztcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlNZWFzdXJlbWVudHMgPSB7XG4gICAgbWV0cmljOiBgJHtudW1lcmFsKG1ldHJpY01lYXN1cmVtZW50KS5mb3JtYXQobWV0cmljRm9ybWF0KX0gJHttZXRyaWNVbml0c31gLFxuICAgIHN0YW5kYXJkOiBgJHtudW1lcmFsKHN0YW5kYXJkTWVhc3VyZW1lbnQpLmZvcm1hdChzdGFuZGFyZEZvcm1hdCl9ICR7c3RhbmRhcmRVbml0c31gXG4gIH07XG5cbiAgcmV0dXJuIGRpc3BsYXlNZWFzdXJlbWVudHM7XG59XG5cbmNvbnN0IGRvdWJsZUNsaWNrWm9vbSA9IHtcbiAgZW5hYmxlOiAoY3R4KSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBGaXJzdCBjaGVjayB3ZSd2ZSBnb3QgYSBtYXAgYW5kIHNvbWUgY29udGV4dC5cbiAgICAgIGlmICghY3R4Lm1hcCB8fCAhY3R4Lm1hcC5kb3VibGVDbGlja1pvb20gfHwgIWN0eC5fY3R4IHx8XG4gICAgICAgICAhY3R4Ll9jdHguc3RvcmUgfHwgIWN0eC5fY3R4LnN0b3JlLmdldEluaXRpYWxDb25maWdWYWx1ZSkgcmV0dXJuO1xuICAgICAgLy8gTm93IGNoZWNrIGluaXRpYWwgc3RhdGUgd2Fzbid0IGZhbHNlICh3ZSBsZWF2ZSBpdCBkaXNhYmxlZCBpZiBzbylcbiAgICAgIGlmICghY3R4Ll9jdHguc3RvcmUuZ2V0SW5pdGlhbENvbmZpZ1ZhbHVlKCdkb3VibGVDbGlja1pvb20nKSkgcmV0dXJuO1xuICAgICAgY3R4Lm1hcC5kb3VibGVDbGlja1pvb20uZW5hYmxlKCk7XG4gICAgfSwgMCk7XG4gIH1cbn07XG5cblxuLy8gV2hlbmV2ZXIgYSB1c2VyIGNsaWNrcyBvbiBhIGtleSB3aGlsZSBmb2N1c2VkIG9uIHRoZSBtYXAsIGl0IHdpbGwgYmUgc2VudCBoZXJlXG5SYWRpdXNNb2RlLm9uS2V5VXAgPSBmdW5jdGlvbiBvbktleVVwKHN0YXRlLCBlKSB7XG4gIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgdGhpcy5kZWxldGVGZWF0dXJlKFtzdGF0ZS5saW5lLmlkXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgdGhpcy5jaGFuZ2VNb2RlKCdzaW1wbGVfc2VsZWN0Jywge30sIHsgc2lsZW50OiB0cnVlIH0pO1xuICB9XG59O1xuXG4vLyBmb3IgbW9iaWxlIHRvdWNoIG1vdmUgaW4gbW9iaWxlIHRoZXJlIGlzIG5vIGNsaWNrXG4vLyBzaW5jZSBpdCB3b3VsZCBwcm92aWRlIG5vIGZlZWRiYWNrIHRvIHVzZXJcbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlRHJhdyhzdGF0ZSwgZSkge1xuICBpZiAoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uID09PSAxKSB7XG4gICAgc3RhdGUubGluZS5yZW1vdmVDb29yZGluYXRlKCcyJyk7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDIsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgaWYgKHN0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKSB7XG4gICAgc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uICs9IDE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gZm9yIGRlc2t0b3AgY2xpY2tzXG5mdW5jdGlvbiBpbnRlcmFjdGl2ZURyYXcoc3RhdGUsIGUsIGV2ZW50VHlwZSwgc2VsZikge1xuICBpZiAoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uID09PSAxKSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgICByZXR1cm4gc2VsZi5jaGFuZ2VNb2RlKCdzaW1wbGVfc2VsZWN0JywgeyBmZWF0dXJlSWRzOiBbc3RhdGUubGluZS5pZF0gfSk7XG4gIH1cblxuICBzZWxmLnVwZGF0ZVVJQ2xhc3Nlcyh7IG1vdXNlOiAnYWRkJyB9KTtcblxuICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIGlmIChzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xuICAgIHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiArPSAxOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3RhdGUubGluZS51cGRhdGVDb29yZGluYXRlKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmxpbmUuYWRkQ29vcmRpbmF0ZSgwLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuUmFkaXVzTW9kZS5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbiBvblRvdWNoU3RhcnQoc3RhdGUsIGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cblJhZGl1c01vZGUub25Ub3VjaE1vdmUgPSBmdW5jdGlvbiBvblRvdWNoTW92ZShzdGF0ZSwgZSkge1xuICAvLyBjb25zb2xlLmxvZygnb25Ub3VjaE1vdmUnKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBvblRvdWNoTW92ZURyYXcoc3RhdGUsIGUpO1xufTtcblxuUmFkaXVzTW9kZS5vblRvdWNoRW5kID0gZnVuY3Rpb24gb25Ub3VjaEVuZChzdGF0ZSwgZSkge1xuICAvLyBjb25zb2xlLmxvZygnb25Ub3VjaEVuZCcpXG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcmV0dXJuIGludGVyYWN0aXZlRHJhdyhzdGF0ZSwgZSwgJ29uVG91Y2hFbmQnLCB0aGlzKTtcbn07XG5cblJhZGl1c01vZGUuY2xpY2tBbnl3aGVyZSA9IGZ1bmN0aW9uIGNsaWNrQW55d2hlcmUoc3RhdGUsIGUpIHtcbiAgLy8gY29uc29sZS5sb2coJ2NsaWNrQW55d2hlcmUnKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBpbnRlcmFjdGl2ZURyYXcoc3RhdGUsIGUsICdtb3VzZScsIHRoaXMpO1xufTtcblxuLy8gY3JlYXRlcyB0aGUgZmluYWwgZ2VvanNvbiBwb2ludCBmZWF0dXJlIHdpdGggYSByYWRpdXMgcHJvcGVydHlcbi8vIHRyaWdnZXJzIGRyYXcuY3JlYXRlXG5SYWRpdXNNb2RlLm9uU3RvcCA9IGZ1bmN0aW9uIG9uU3RvcChzdGF0ZSkge1xuICBkb3VibGVDbGlja1pvb20uZW5hYmxlKHRoaXMpO1xuICAvLyBjb25zb2xlLmxvZygnb25TdG9wJylcbiAgdGhpcy5hY3RpdmF0ZVVJQnV0dG9uKCk7XG5cbiAgLy8gY2hlY2sgdG8gc2VlIGlmIHdlJ3ZlIGRlbGV0ZWQgdGhpcyBmZWF0dXJlXG4gIGlmICh0aGlzLmdldEZlYXR1cmUoc3RhdGUubGluZS5pZCkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gIC8vIHJlbW92ZSBsYXN0IGFkZGVkIGNvb3JkaW5hdGVcbiAgc3RhdGUubGluZS5yZW1vdmVDb29yZGluYXRlKCcwJyk7XG4gIGlmIChzdGF0ZS5saW5lLmlzVmFsaWQoKSkge1xuICAgIGNvbnN0IGxpbmVHZW9Kc29uID0gc3RhdGUubGluZS50b0dlb0pTT04oKTtcbiAgICBjb25zdCBzdGFydFBvaW50ID0gbGluZUdlb0pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF07XG4gICAgY29uc3QgZGlzdGFuY2UgPSBsaW5lRGlzdGFuY2UobGluZUdlb0pzb24pO1xuXG4gICAgY29uc3QgY2lyY2xlR2VvSlNPTiA9IGNyZWF0ZUdlb0pTT05DaXJjbGUoc3RhcnRQb2ludCwgZGlzdGFuY2UsIG51bGwsIDMyKTtcbiAgICBjb25zdCBmZWV0ID0gKGRpc3RhbmNlICogMTAwMCkgKiAzLjI4MDg0O1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnY2lyY2xlJywgSlNPTi5zdHJpbmdpZnkoY2lyY2xlR2VvSlNPTikpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnbGluZScsIEpTT04uc3RyaW5naWZ5KGxpbmVHZW9Kc29uKSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdkaXN0YW5jZWttJywgZGlzdGFuY2UpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnZGlzdGFuY2VmZWV0JywgZmVldCk7XG5cbiAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdjaXJjbGUtcHJlc3VibWl0JywgSlNPTi5zdHJpbmdpZnkoY2lyY2xlR2VvSlNPTikpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdsaW5lLXByZXN1Ym1pdCcsIEpTT04uc3RyaW5naWZ5KGxpbmVHZW9Kc29uKSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNla20tcHJlc3VibWl0JywgZmVldCk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNlZmVldC1wcmVzdWJtaXQnLCBmZWV0KTtcblxuICAgIC8vIHJlY29uZmlndXJlIHRoZSBnZW9qc29uIGxpbmUgaW50byBhIGdlb2pzb24gcG9pbnQgd2l0aCBhIHJhZGl1cyBwcm9wZXJ0eVxuICAgIGNvbnN0IHBvaW50V2l0aFJhZGl1cyA9IHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNpcmNsZUdlb0pTT04uZ2VvbWV0cnkuY29vcmRpbmF0ZXNcbiAgICAgIH0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJhZGl1c01ldHJpYzogKGxpbmVEaXN0YW5jZShsaW5lR2VvSnNvbikpLnRvRml4ZWQoMSksXG4gICAgICAgIHJhZGl1c0ZlZXQ6IGZlZXRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMubWFwLmdldExheWVyKCdjaXJjbGUtbGluZScpKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcignY2lyY2xlLWxpbmUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1maWxsJykpIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtZmlsbCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXAuZ2V0U291cmNlKCdjaXJjbGUnKSkge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlU291cmNlKCdjaXJjbGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcC5hZGRTb3VyY2UoJ2NpcmNsZScsIHtcbiAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgIGRhdGE6IHBvaW50V2l0aFJhZGl1c1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIoe1xuICAgICAgaWQ6ICdjaXJjbGUtZmlsbCcsXG4gICAgICB0eXBlOiAnZmlsbCcsXG4gICAgICBzb3VyY2U6ICdjaXJjbGUnLFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2ZpbGwtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAgICdmaWxsLW91dGxpbmUtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmFkZExheWVyKHtcbiAgICAgIGlkOiAnY2lyY2xlLWxpbmUnLFxuICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgc291cmNlOiAnY2lyY2xlJyxcbiAgICAgIGxheW91dDoge1xuICAgICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgICAgfSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgICAnbGluZS1kYXNoYXJyYXknOiBbMC4yLCAyXSxcbiAgICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcC5maXJlKCdkcmF3LmNyZWF0ZScsIHtcbiAgICAgIGZlYXR1cmVzOiBbcG9pbnRXaXRoUmFkaXVzXVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGVsZXRlRmVhdHVyZShbc3RhdGUubGluZS5pZF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgIHRoaXMuY2hhbmdlTW9kZSgnc2ltcGxlX3NlbGVjdCcsIHt9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuUmFkaXVzTW9kZS50b0Rpc3BsYXlGZWF0dXJlcyA9IGZ1bmN0aW9uIHRvRGlzcGxheUZlYXR1cmVzKHN0YXRlLCBnZW9qc29uLCBkaXNwbGF5KSB7XG4gIGNvbnN0IGlzQWN0aXZlTGluZSA9IGdlb2pzb24ucHJvcGVydGllcy5pZCA9PT0gc3RhdGUubGluZS5pZDtcblxuICBnZW9qc29uLnByb3BlcnRpZXMuYWN0aXZlID0gKGlzQWN0aXZlTGluZSkgPyAndHJ1ZScgOiAnZmFsc2UnOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAoIWlzQWN0aXZlTGluZSkgcmV0dXJuIGRpc3BsYXkoZ2VvanNvbik7XG5cbiAgLy8gT25seSByZW5kZXIgdGhlIGxpbmUgaWYgaXQgaGFzIGF0IGxlYXN0IG9uZSByZWFsIGNvb3JkaW5hdGVcbiAgaWYgKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoIDwgMikgcmV0dXJuIG51bGw7XG4gIGdlb2pzb24ucHJvcGVydGllcy5tZXRhID0gJ2ZlYXR1cmUnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLy8gZGlzcGxheXMgY2VudGVyIHZlcnRleCBhcyBhIHBvaW50IGZlYXR1cmVcbiAgZGlzcGxheShjcmVhdGVWZXJ0ZXgoXG4gICAgc3RhdGUubGluZS5pZCxcbiAgICBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzW3N0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggLSAyIDogMV0sXG4gICAgYCR7c3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCAtIDIgOiAxfWAsXG4gICAgZmFsc2UsXG4gICkpO1xuXG4gIC8vIGRpc3BsYXlzIHRoZSBsaW5lIGFzIGl0IGlzIGRyYXduXG4gIGRpc3BsYXkoZ2VvanNvbik7XG5cbiAgY29uc3QgZGlzcGxheU1lYXN1cmVtZW50cyA9IGdldERpc3BsYXlNZWFzdXJlbWVudHMoZ2VvanNvbik7XG5cbiAgLy8gY3JlYXRlIGN1c3RvbSBmZWF0dXJlIGZvciB0aGUgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uXG4gIGNvbnN0IGN1cnJlbnRWZXJ0ZXggPSB7XG4gICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG1ldGE6ICdjdXJyZW50UG9zaXRpb24nLFxuICAgICAgYWN0aXZlOiAndHJ1ZScsXG4gICAgICByYWRpdXNNZXRyaWM6IGRpc3BsYXlNZWFzdXJlbWVudHMubWV0cmljLFxuICAgICAgcmFkaXVzU3RhbmRhcmQ6IGRpc3BsYXlNZWFzdXJlbWVudHMuc3RhbmRhcmQsXG4gICAgICBwYXJlbnQ6IHN0YXRlLmxpbmUuaWRcbiAgICB9LFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXM6IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1cbiAgICB9XG4gIH07XG4gIGRpc3BsYXkoY3VycmVudFZlcnRleCk7XG5cbiAgLy8gY3JlYXRlIGN1c3RvbSBmZWF0dXJlIGZvciByYWRpdXMgY2lyY2xlbWFya2VyXG4gIGNvbnN0IGNlbnRlciA9IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF07XG4gIGNvbnN0IHJhZGl1c0luS20gPSBsaW5lRGlzdGFuY2UoZ2VvanNvbiwgJ2tpbG9tZXRlcnMnKTtcbiAgY29uc3QgY2lyY2xlRmVhdHVyZSA9IGNyZWF0ZUdlb0pTT05DaXJjbGUoY2VudGVyLCByYWRpdXNJbkttLCBzdGF0ZS5saW5lLmlkKTtcbiAgY2lyY2xlRmVhdHVyZS5wcm9wZXJ0aWVzLm1ldGEgPSAncmFkaXVzJztcblxuICBkaXNwbGF5KGNpcmNsZUZlYXR1cmUpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhZGl1c01vZGU7XG4iLCIvLyBpbXBvcnQgeyBTdG9yYWdlQVBJIH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2VBUEknO1xuXG4vKipcbiogVGhpcyBjb21wb25lbnQgaXMgaW50ZW5kZWQgdG8gaGFuZGxlIHRoZSBzdG9yYWdlIGFuZCByZXRyaWV2YWwgb2YgdGhlIHN0YXRlIG9mXG4qIEFzIG9mIHRoaXMgd3JpdGluZyBpdCBpcyB1c2luZyBsb2NhbFN0b3JhZ2UgdG8gZG8gdGhpcy5cbiogVXNlcyBzaW1wbGUgY2xhc3MgaW5zdGFuY2UgbWV0aG9kcyB3aXRoIHRoZSBzaG9ydC1oYW5kIG1ldGhvZCBkZWNsYXJhdGlvblxuKiBwYXR0ZXJuLlxuKlxuKiBUbyBub3RlOiBUaGVyZSBpcyBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgU3RvcmUgYW5kIHRoZSBTdGF0ZS4gQXMgb2YgMGEzMTA2ZVxuKiB0aGUgU3RvcmUgaXMgYSBTdHJpbmcgc2F2ZWQgdG8gdGhlIGJyb3dzZXJzIGxvY2FsU3RvcmFnZSBhbmQgaXMgYSBzZXJpYWxpemVkXG4qIHZlcnNpb24gb2YgdGhlIFN0YXRlLiBUaGUgU3RhdGUgaXMgYW4gT2JqZWN0IHdoaWNoIGlzIGludGVyYWN0ZWQgd2l0aCBieVxuKiBwYXJzaW5nIHRoZSBTdGF0ZSBzdHJpbmcgZnJvbSB0aGUgU3RvcmUsIG1vZGlmeWluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcGFyc2UsXG4qIGFuZCByZS1zZXJpYWxpemluZyBpdCBiYWNrIHRvIHRoZSBTdG9yZS5cbiovXG5jb25zdCBTVEFURV9LRVkgPSAnc3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAvLyAuLmFuZCBhbiAob3B0aW9uYWwpIGN1c3RvbSBjbGFzcyBjb25zdHJ1Y3Rvci4gSWYgb25lIGlzXG4gIC8vIG5vdCBzdXBwbGllZCwgYSBkZWZhdWx0IGNvbnN0cnVjdG9yIGlzIHVzZWQgaW5zdGVhZDpcbiAgLy8gY29uc3RydWN0b3IoKSB7IH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIC8vIHRoaXMuc3RvcmUgPSBuZXcgU3RvcmFnZUFQSSgpO1xuICAgIGlmIChTdG9yZS5zdG9yYWdlQXZhaWxhYmxlKCkpIHtcbiAgICAgIHRoaXMuc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0geyBTVEFURV9LRVkgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXRzIGEga2V5L3ZhbHVlIHBhaXIgdG8gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGVJdGVtKGtleSA9ICcnLCB2YWx1ZSA9ICcnKSB7XG4gICAgY29uc3Qgc3RvcmVPYmogPSB7IFtrZXldOiB2YWx1ZSB9O1xuICAgIGNvbnN0IG5ld1N0YXRlT2JqID0geyAuLi50aGlzLmdldFN0YXRlKCksIC4uLnN0b3JlT2JqIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZU9iaik7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBlbnRpcmUgc3RhdGUgb2JqZWN0XG4gIC8vXG4gIC8vIEByZXR1cm4gb2JqZWN0XG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSA/IEpTT04ucGFyc2UodGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpIDoge307XG4gIH1cblxuICAvLyBHZXRzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldEl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIEdcbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0l0ZW0oa2V5KSA/IHRoaXMuZ2V0U3RhdGUoKVtrZXldIDoge307XG4gICAgLy8gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8vIFNldHMgYSBuZXcgc3RhdGUgb2JqZWN0IHN0YXRlXG4gIC8vXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZSh2YWx1ZSA9IHt9KSB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oU1RBVEVfS0VZLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG5cblxuICAvLyBDaGVja3MgaWYgdGhlIHN0YXRlIGV4aXN0cyBpbiB0aGUgc3RvcmFnZSBwcm92aWRlclxuICBjaGVja1N0YXRlRXhpc3RzKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKTtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIHN0YXRlIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgLy9cbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVBc1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJdGVtKFNUQVRFX0tFWSk7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbiBpdGVtIGhhcyBiZWVuIHNhdmVkIHRvIHRoZSBzdG9yZVxuICAvLyB1bnVzZWQgYXMgb2YgMGEzMTA2ZVxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgaXNTdGF0ZUl0ZW1FeGlzdChpdGVtKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpKSB7XG4gICAgICBjb25zdCBzdGF0ZVN0ciA9IHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpO1xuICAgICAgaWYgKHN0YXRlU3RyLmluZGV4T2YoaXRlbSkgPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgY2hlY2tJdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgJiYgdGhpcy5nZXRTdGF0ZUFzU3RyaW5nKCkuaW5kZXhPZihpdGVtKSA+IDA7XG4gIH1cblxuICAvLyBDaGVjayBpZiBsb2NhbFN0b3JhZ2UgYXZhaWxhYmxlLlxuICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfU3RvcmFnZV9BUEkvVXNpbmdfdGhlX1dlYl9TdG9yYWdlX0FQSVxuICAvL1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgc3RhdGljIHN0b3JhZ2VBdmFpbGFibGUoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdsb2NhbFN0b3JhZ2UnO1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgY29uc3QgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==