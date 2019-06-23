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
/******/ 	var hotCurrentHash = "0f52305ed35a22a8b702";
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
var userType = url.searchParams.get('userType');

// ga event action, category, label
googleAnalytics.setEvent('data', 'study started', 'true');

// ga event action, category, label
googleAnalytics.setEvent('data', 'userType', userType);

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
    var distancekm = store.getStateItem('distancekm');
    var distancefeet = store.getStateItem('distancefeet');

    // ga event action, category, label
    googleAnalytics.setEvent('data', 'circle-submitted', circle);
    googleAnalytics.setEvent('data', 'line-submitted', line);
    googleAnalytics.setEvent('data', 'distancekm-submitted', distancekm);
    googleAnalytics.setEvent('data', 'distancefeet-submitted', distancefeet);

    // end study
    document.getElementById('study-complete').classList.remove('d-none');
    document.getElementById('study-progress').remove();
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
    googleAnalytics.setEvent('data', 'distancekm-presubmit', distance);
    googleAnalytics.setEvent('data', 'distancefeet-presubmit', feet);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZHJhd3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yYWRpdXNNb2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0b3JlLmpzIl0sIm5hbWVzIjpbImlkIiwidHlwZSIsImZpbHRlciIsImxheW91dCIsInBhaW50IiwiYmFzZSIsInN0b3BzIiwic3RvcmUiLCJTdG9yZSIsImRhdGFwaSIsIkdvb2dsZUFuYWx5dGljcyIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJ2YWx1ZSIsInV1aWQiLCJnZXRTdGF0ZUl0ZW0iLCJkYXRlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGF0YSIsImZvb09iaiIsImd0YWciLCJldmVudF9jYXRlZ29yeSIsImV2ZW50X2xhYmVsIiwianNvbmRhdGEiLCJkYXRhQVBJVVJMIiwiVVJMIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZmV0Y2giLCJnb29nbGVBbmFseXRpY3MiLCJsaWJyYXJ5IiwiYWRkIiwiZmFzIiwiZmFyIiwiZG9tIiwid2F0Y2giLCJpc01vYmlsZURldmljZSIsImNoZWNrIiwiYSIsInRlc3QiLCJzdWJzdHIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZW5kb3IiLCJ3aW5kb3ciLCJvcGVyYSIsInVybFN0cmluZyIsImxvY2F0aW9uIiwiaHJlZiIsInVybCIsInVzZXJUeXBlIiwic2VhcmNoUGFyYW1zIiwiZ2V0Iiwic2V0RXZlbnQiLCJtYXBib3hnbCIsImFjY2Vzc1Rva2VuIiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJjZW50ZXIiLCJ6b29tIiwic2hvd1pvb20iLCJ0b3VjaEVuYWJsZWQiLCJrZXliaW5kaW5ncyIsImRyYXdDb250cm9sIiwiTWFwYm94RHJhdyIsImRpc3BsYXlDb250cm9sc0RlZmF1bHQiLCJjb250cm9scyIsInJlY3RhbmdsZSIsInBvbHlnb24iLCJsaW5lX3N0cmluZyIsInRyYXNoIiwib3B0aW9ucyIsInRvdWNoQnVmZmVyIiwic3R5bGVzIiwiZHJhd1N0eWxlcyIsIm1vZGVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZHJhd19yYWRpdXMiLCJSYWRpdXNNb2RlIiwiYWRkQ29udHJvbCIsIm5hdiIsIk5hdmlnYXRpb25Db250cm9sIiwiZ2VvY29kZXIiLCJNYXBib3hHZW9jb2RlciIsInNldFpvb20iLCJmbHlUbyIsInBsYWNlaG9sZGVyIiwib24iLCJnZXRab29tIiwiY2lyY2xlQnV0dG9uRWxlbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsIiQiLCJ0b29sdGlwIiwidHJpZ2dlciIsImhhbmRsZUFncmVlQ2xpY2siLCJzZXRTdGF0ZUl0ZW0iLCJyZXNpemUiLCJoYW5kbGVEaXNzYWdyZWVDbGljayIsImNoZWNrVmFsaWRPYmplY3QiLCJvYmoiLCJ1bmRlZmluZWQiLCJrZXlzIiwibGVuZ3RoIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiaGFuZGxlRHJhd0J1dHRvbkNsaWNrIiwiZSIsInRhcmdldCIsImdldExheWVyIiwicmVtb3ZlTGF5ZXIiLCJnZXRTb3VyY2UiLCJyZW1vdmVTb3VyY2UiLCJjaGFuZ2VNb2RlIiwiaXNTdHVkeWNvbXBsZXRlZCIsInN0dWR5Q29tcGxldGVkIiwiU3R1ZHlBZ3JyZWVtZW50Iiwic3R1ZHlBZ3JyZWVkIiwieCIsInJlc3VsdCIsInkiLCJvZmZzZXRkaXN0IiwiYmJveCIsIm1pbiIsIm1heCIsInptIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZml0Qm91bmRzIiwibWF4Wm9vbSIsImdlb2NvZGVFbGVtIiwiYXBwZW5kQ2hpbGQiLCJvbkFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWdnZXN0aW9uc0VsZW0iLCJxdWVyeVNlbGVjdG9yIiwiZHJhd0NpcmNsZUVsZW1lbnQiLCJyZURyYXdDaXJjbGVFbGVtZW50IiwiaGFuZGxlU3RlcE5hdkNsaWNrIiwidmFsTm9kZSIsImdldEF0dHJpYnV0ZU5vZGUiLCJzdGVwTmF2MUVsZW0iLCJtYWluQ29udGVudEVsZW0iLCJzdGVwTmF2MkVsZW0iLCJzdGVwTmF2M0VsZW0iLCJoYW5kbGVTdWJtaXRCdXR0b25DbGljayIsInN1Ym1pdEJ1dHRvbkVsZW0iLCJjaXJjbGUiLCJsaW5lIiwiZGlzdGFuY2VrbSIsImRpc3RhbmNlZmVldCIsImRpcmVjdGlvbnNPbmUiLCJtaW5PbmUiLCJtYXhPbmUiLCJtZXNzYWdlSW5kZXhPbmUiLCJzdGVwRGlyZWN0aW9uczEiLCJpbm5lckhUTUwiLCJkaXJlY3Rpb25zVHdvIiwibWluVHdvIiwibWF4VHdvIiwibWVzc2FnZUluZGV4VHdvIiwic3RlcERpcmVjdGlvbnMyIiwiYWdncmVlQnV0dG9uRWxlbWVudCIsImRpc3NhZ2dyZWVCdXR0b25FbGVtZW50Iiwic3RlcDJNaW5vckRpcmVjdGlvbnNFbGVtZW50IiwiZHJhd19saW5lX3N0cmluZyIsImNyZWF0ZVZlcnRleCIsInBhcmVudElkIiwiY29vcmRpbmF0ZXMiLCJwYXRoIiwic2VsZWN0ZWQiLCJwcm9wZXJ0aWVzIiwibWV0YSIsInBhcmVudCIsImNvb3JkX3BhdGgiLCJhY3RpdmUiLCJnZW9tZXRyeSIsImNyZWF0ZUdlb0pTT05DaXJjbGUiLCJyYWRpdXNJbkttIiwicG9pbnRzIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJrbSIsInJldCIsImRpc3RhbmNlWCIsImNvcyIsIlBJIiwiZGlzdGFuY2VZIiwidGhldGEiLCJpIiwic2luIiwicHVzaCIsImdldERpc3BsYXlNZWFzdXJlbWVudHMiLCJmZWF0dXJlIiwiZHJhd25MZW5ndGgiLCJtZXRyaWNVbml0cyIsIm1ldHJpY0Zvcm1hdCIsIm1ldHJpY01lYXN1cmVtZW50Iiwic3RhbmRhcmRVbml0cyIsInN0YW5kYXJkRm9ybWF0Iiwic3RhbmRhcmRNZWFzdXJlbWVudCIsImRpc3BsYXlNZWFzdXJlbWVudHMiLCJtZXRyaWMiLCJmb3JtYXQiLCJzdGFuZGFyZCIsImRvdWJsZUNsaWNrWm9vbSIsImVuYWJsZSIsImN0eCIsInNldFRpbWVvdXQiLCJfY3R4IiwiZ2V0SW5pdGlhbENvbmZpZ1ZhbHVlIiwib25LZXlVcCIsInN0YXRlIiwia2V5Q29kZSIsImRlbGV0ZUZlYXR1cmUiLCJzaWxlbnQiLCJvblRvdWNoTW92ZURyYXciLCJjdXJyZW50VmVydGV4UG9zaXRpb24iLCJyZW1vdmVDb29yZGluYXRlIiwiYWRkQ29vcmRpbmF0ZSIsImxuZ0xhdCIsImxuZyIsImxhdCIsInVwZGF0ZUNvb3JkaW5hdGUiLCJkaXJlY3Rpb24iLCJpbnRlcmFjdGl2ZURyYXciLCJldmVudFR5cGUiLCJzZWxmIiwiZmVhdHVyZUlkcyIsInVwZGF0ZVVJQ2xhc3NlcyIsIm1vdXNlIiwib25Ub3VjaFN0YXJ0IiwicHJldmVudERlZmF1bHQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJjbGlja0FueXdoZXJlIiwib25TdG9wIiwiYWN0aXZhdGVVSUJ1dHRvbiIsImdldEZlYXR1cmUiLCJpc1ZhbGlkIiwibGluZUdlb0pzb24iLCJ0b0dlb0pTT04iLCJzdGFydFBvaW50IiwiZGlzdGFuY2UiLCJjaXJjbGVHZW9KU09OIiwiZmVldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJhdmFpbFdpZHRoIiwic2NyZWVuIiwiYXZhaWxIZWlnaHQiLCJoZWlnaHRKU09OIiwiY2lyY2xlMkJ1dHRvbkVsZW0iLCJwb2ludFdpdGhSYWRpdXMiLCJyYWRpdXNNZXRyaWMiLCJ0b0ZpeGVkIiwicmFkaXVzRmVldCIsImFkZFNvdXJjZSIsImFkZExheWVyIiwic291cmNlIiwiZmlyZSIsImZlYXR1cmVzIiwidG9EaXNwbGF5RmVhdHVyZXMiLCJnZW9qc29uIiwiZGlzcGxheSIsImlzQWN0aXZlTGluZSIsImN1cnJlbnRWZXJ0ZXgiLCJyYWRpdXNTdGFuZGFyZCIsImNpcmNsZUZlYXR1cmUiLCJTVEFURV9LRVkiLCJzdG9yYWdlQXZhaWxhYmxlIiwic3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsImNoZWNrU3RhdGVFeGlzdHMiLCJnZXRTdGF0ZSIsImtleSIsInN0b3JlT2JqIiwibmV3U3RhdGVPYmoiLCJzZXRTdGF0ZSIsInBhcnNlIiwiZ2V0SXRlbSIsImNoZWNrSXRlbSIsInNldEl0ZW0iLCJCb29sZWFuIiwiaXRlbSIsInN0YXRlU3RyIiwiZ2V0U3RhdGVBc1N0cmluZyIsImluZGV4T2YiLCJyZW1vdmVJdGVtIiwiRE9NRXhjZXB0aW9uIiwiY29kZSIsIm5hbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNO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LElBQVAsQ0FBVjtBQUNBLFlBQU1nSSxJQUFJLGtCQUFWO0FBQ0E2SixnQkFBUVcsT0FBUixDQUFnQnhLLENBQWhCLEVBQW1CQSxDQUFuQjtBQUNBNkosZ0JBQVFpQixVQUFSLENBQW1COUssQ0FBbkI7QUFDQSxlQUFPLElBQVA7QUFDRCxPQU5ELENBTUUsT0FBT1gsQ0FBUCxFQUFVO0FBQ1YsZUFBT0EsYUFBYTBMLFlBQWI7QUFDTDtBQUNBMUwsVUFBRTJMLElBQUYsS0FBVyxFQUFYO0FBQ0E7QUFDQTNMLFVBQUUyTCxJQUFGLEtBQVcsSUFGWDtBQUdBO0FBQ0E7QUFDQTNMLFVBQUU0TCxJQUFGLEtBQVcsb0JBTFg7QUFNQTtBQUNBNUwsVUFBRTRMLElBQUYsS0FBVyw0QkFUTjtBQVVMO0FBQ0FwQixnQkFBUTlLLE1BQVIsS0FBbUIsQ0FYckI7QUFZRDtBQUNGIiwiZmlsZSI6ImluZGV4LmFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjBmNTIzMDVlZDM1YTIyYThiNzAyXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJpbmRleFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnN+aW5kZXhcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vTllDUGxhbm5pbmcvbGFicy1mYWN0ZmluZGVyL2Jsb2IvNGE2N2RhMjczYjZmZjg3NTg4ZjUwNDRhMTViMzQ5MGQ0YWMwN2EyNS9hcHAvbGF5ZXJzL2RyYXctc3R5bGVzLmpzXG5leHBvcnQgZGVmYXVsdCBbXG4gIC8vIEFDVElWRSAoYmVpbmcgZHJhd24pXG4gIC8vIGxpbmUgc3Ryb2tlXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctbGluZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ0xpbmVTdHJpbmcnXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAnbGluZS13aWR0aCc6IDRcbiAgICB9XG4gIH0sXG5cbiAgLy8gcG9seWdvbiBmaWxsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1maWxsJyxcbiAgICB0eXBlOiAnZmlsbCcsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnZmlsbC1jb2xvcic6ICcjRDIwQzBDJyxcbiAgICAgICdmaWxsLW91dGxpbmUtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgfVxuICB9LFxuXG4gIC8vIHBvbHlnb24gb3V0bGluZSBzdHJva2VcbiAgLy8gVGhpcyBkb2Vzbid0IHN0eWxlIHRoZSBmaXJzdCBlZGdlIG9mIHRoZSBwb2x5Z29uLCB3aGljaCB1c2VzIHRoZSBsaW5lIHN0cm9rZSBzdHlsaW5nIGluc3RlYWRcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLXN0cm9rZS1hY3RpdmUnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICdsaW5lLWRhc2hhcnJheSc6IFswLjIsIDJdLFxuICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgfVxuICB9LFxuICAvLyB2ZXJ0ZXggcG9pbnQgaGFsb3NcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWFuZC1saW5lLXZlcnRleC1oYWxvLWFjdGl2ZScsXG4gICAgdHlwZTogJ2NpcmNsZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnbWV0YScsICd2ZXJ0ZXgnXSwgWyc9PScsICckdHlwZScsICdQb2ludCddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnY2lyY2xlLXJhZGl1cyc6IDcsXG4gICAgICAnY2lyY2xlLWNvbG9yJzogJyNGRkYnXG4gICAgfVxuICB9LFxuICAvLyB2ZXJ0ZXggcG9pbnRzXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1hbmQtbGluZS12ZXJ0ZXgtYWN0aXZlJyxcbiAgICB0eXBlOiAnY2lyY2xlJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICdtZXRhJywgJ3ZlcnRleCddLCBbJz09JywgJyR0eXBlJywgJ1BvaW50J10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdjaXJjbGUtcmFkaXVzJzogNixcbiAgICAgICdjaXJjbGUtY29sb3InOiAnI0Q5NkIyNydcbiAgICB9XG4gIH0sXG5cbiAgLy8gcmFkaXVzIGxhYmVsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcmFkaXVzLWxhYmVsJyxcbiAgICB0eXBlOiAnc3ltYm9sJyxcbiAgICBmaWx0ZXI6IFsnPT0nLCAnbWV0YScsICdjdXJyZW50UG9zaXRpb24nXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICd0ZXh0LWZpZWxkJzogJ3tyYWRpdXNGZWV0fSBcXG4ge3JhZGl1c01pbGVzfScsXG4gICAgICAndGV4dC1hbmNob3InOiAnbGVmdCcsXG4gICAgICAndGV4dC1vZmZzZXQnOiBbXG4gICAgICAgIDEsXG4gICAgICAgIDBcbiAgICAgIF0sXG4gICAgICAndGV4dC1zaXplJzogMjJcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAndGV4dC1jb2xvcic6ICdyZ2JhKDAsIDAsIDAsIDEpJyxcbiAgICAgICd0ZXh0LWhhbG8tY29sb3InOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsXG4gICAgICAndGV4dC1oYWxvLXdpZHRoJzogMyxcbiAgICAgICdpY29uLW9wYWNpdHknOiB7XG4gICAgICAgIGJhc2U6IDEsXG4gICAgICAgIHN0b3BzOiBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgNy45OSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIDgsXG4gICAgICAgICAgICAwXG4gICAgICAgICAgXVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgJ3RleHQtaGFsby1ibHVyJzogMVxuICAgIH1cbiAgfSxcblxuICAvLyBJTkFDVElWRSAoc3RhdGljLCBhbHJlYWR5IGRyYXduKVxuICAvLyBsaW5lIHN0cm9rZVxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LWxpbmUtc3RhdGljJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnTGluZVN0cmluZyddLCBbJz09JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnIzAwMCcsXG4gICAgICAnbGluZS13aWR0aCc6IDNcbiAgICB9XG4gIH0sXG4gIC8vIHBvbHlnb24gZmlsbFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tZmlsbC1zdGF0aWMnLFxuICAgIHR5cGU6ICdmaWxsJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnPT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdmaWxsLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2ZpbGwtb3V0bGluZS1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICB9XG4gIH0sXG4gIC8vIHBvbHlnb24gb3V0bGluZVxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tc3Ryb2tlLXN0YXRpYycsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWyc9PScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2xpbmUtd2lkdGgnOiAzXG4gICAgfVxuICB9XG5dO1xuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgZGF0YXBpID0gJ2h0dHBzOi8vc2NyaXB0Lmdvb2dsZS5jb20vbWFjcm9zL3MvQUtmeWNieW4wMkZLdFZva1NfMkdabEd0VldSSEo3T2ZFSG43WUhIZ0dtZFdaTkU3TThNR21INC9leGVjJztcblxuZXhwb3J0IGNsYXNzIEdvb2dsZUFuYWx5dGljcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9vID0ge307XG4gIH1cblxuICBzZXRFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gICAgY29uc3QgdXVpZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpO1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgY29uc3QgZGF0YSA9IGxhYmVsO1xuXG4gICAgY29uc3QgZm9vT2JqID0gdGhpcy5mb287IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBndGFnKCdldmVudCcsIHV1aWQsIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGV2ZW50X2NhdGVnb3J5OiBjYXRlZ29yeSxcbiAgICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcbiAgICAgIHZhbHVlOiBgJHt2YWx1ZX1gLFxuICAgICAgdXVpZFxuICAgIH0pO1xuXG4gICAgLy8gc2luY2UgRkYgY291bGQgYmUgYmxvY2tpbmcgZ2Egd3JpdGluZyBkYXRhIGhlcmUgYXMgYmFja3VwXG4gICAgY29uc3QganNvbmRhdGEgPSB7XG4gICAgICB1dWlkLFxuICAgICAgY2F0ZWdvcnksXG4gICAgICBkYXRhLFxuICAgICAgZGF0ZVxuICAgIH07XG5cbiAgICBjb25zdCBkYXRhQVBJVVJMID0gbmV3IFVSTChkYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMnO1xuaW1wb3J0IG1hcGJveGdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgTWFwYm94RHJhdyBmcm9tICdAbWFwYm94L21hcGJveC1nbC1kcmF3JztcbmltcG9ydCBNYXBib3hHZW9jb2RlciBmcm9tICdAbWFwYm94L21hcGJveC1nbC1nZW9jb2Rlcic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IFJhZGl1c01vZGUgZnJvbSAnLi9yYWRpdXNNb2RlJztcbmltcG9ydCBkcmF3U3R5bGVzIGZyb20gJy4vZHJhd3N0eWxlcyc7XG5pbXBvcnQgeyBHb29nbGVBbmFseXRpY3MgfSBmcm9tICcuL2dhJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgZ29vZ2xlQW5hbHl0aWNzID0gbmV3IEdvb2dsZUFuYWx5dGljcygpO1xuXG4vLyBLaWNrcyBvZmYgdGhlIHByb2Nlc3Mgb2YgZmluZGluZyA8aT4gdGFncyBhbmQgcmVwbGFjaW5nIHdpdGggPHN2Zz5cbi8vIGFkZGVzIHN1cHBvcnQgZm9yIGZvbnRhd2Vzb21lXG5saWJyYXJ5LmFkZChmYXMsIGZhcik7XG5kb20ud2F0Y2goKTtcblxuZnVuY3Rpb24gaXNNb2JpbGVEZXZpY2UoKSB7XG4gIGxldCBjaGVjayA9IGZhbHNlO1xuICAoZnVuY3Rpb24oYSl7aWYoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWlub3xhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pLnRlc3QoYSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCw0KSkpIGNoZWNrID0gdHJ1ZTt9KShuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmEpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIHJldHVybiBjaGVjaztcbn1cblxuY29uc3QgdXJsU3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5jb25zdCB1cmwgPSBuZXcgVVJMKHVybFN0cmluZyk7XG5jb25zdCB1c2VyVHlwZSA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCd1c2VyVHlwZScpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0dWR5IHN0YXJ0ZWQnLCAndHJ1ZScpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3VzZXJUeXBlJywgdXNlclR5cGUpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ21vYmlsZScsIGlzTW9iaWxlRGV2aWNlKCkpO1xuXG5tYXBib3hnbC5hY2Nlc3NUb2tlbiA9ICdway5leUoxSWpvaVpHRjJaV2x6YlNJc0ltRWlPaUpDZGpVeFQwRnpJbjAuVjlvSWtfd1VjNHVadTdVQmJsUjhtdyc7XG5cbmNvbnN0IG1hcCA9IG5ldyBtYXBib3hnbC5NYXAoe1xuICBjb250YWluZXI6ICdtYXAnLFxuICBzdHlsZTogJ21hcGJveDovL3N0eWxlcy9tYXBib3gvc3RyZWV0cy12MTEnLFxuICAvLyAnbWFwYm94Oi8vc3R5bGVzL2RhdmVpc20vY2p3cnJkZmQyMHVpYzFkbnpzdGkyb3dsaycsIC0gZGFya1xuICBjZW50ZXI6IFstOTgsIDM4Ljg4XSwgLy8gc3RhcnRpbmcgcG9zaXRpb24gW2xuZywgbGF0XVxuICB6b29tOiAzLCAvLyBzdGFydGluZyB6b29tXG4gIHNob3dab29tOiB0cnVlLFxuICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gIGtleWJpbmRpbmdzOiB0cnVlXG59KTtcblxuXG4vLyBzZXR1cCBtYXBcbmNvbnN0IGRyYXdDb250cm9sID0gbmV3IE1hcGJveERyYXcoe1xuICBkaXNwbGF5Q29udHJvbHNEZWZhdWx0OiB0cnVlLFxuICBjb250cm9sczoge1xuICAgIHJlY3RhbmdsZTogdHJ1ZSxcbiAgICBwb2x5Z29uOiB0cnVlLFxuICAgIGxpbmVfc3RyaW5nOiB0cnVlLFxuICAgIHRyYXNoOiB0cnVlXG4gIH0sXG4gIG9wdGlvbnM6IHtcbiAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAga2V5YmluZGluZ3M6IHRydWUsXG4gICAgdG91Y2hCdWZmZXI6IDEwXG4gIH0sXG4gIHN0eWxlczogZHJhd1N0eWxlcyxcbiAgbW9kZXM6IE9iamVjdC5hc3NpZ24oe1xuICAgIGRyYXdfcmFkaXVzOiBSYWRpdXNNb2RlXG4gIH0sIE1hcGJveERyYXcubW9kZXMpXG59KTtcblxubWFwLmFkZENvbnRyb2woZHJhd0NvbnRyb2wpO1xuXG5jb25zdCBuYXYgPSBuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woKTtcbm1hcC5hZGRDb250cm9sKG5hdiwgJ3RvcC1sZWZ0Jyk7XG5cbmNvbnN0IGdlb2NvZGVyID0gbmV3IE1hcGJveEdlb2NvZGVyKHtcbiAgYWNjZXNzVG9rZW46IG1hcGJveGdsLmFjY2Vzc1Rva2VuLFxuICBtYXBib3hnbCxcbiAgc2V0Wm9vbTogOCxcbiAgZmx5VG86IGZhbHNlLFxuICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBmb3IgYSBsb2NhdGlvbi4uLidcbn0pO1xuXG5tYXAub24oJ3pvb21lbmQnLCAoKSA9PiB7XG4gIGlmIChtYXAuZ2V0Wm9vbSgpID4gMTApIHtcbiAgICBjb25zdCBjaXJjbGVCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1idXR0b24nKTtcbiAgICBpZiAoY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgIGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdtYW51YWwnIH0pO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdoaWRlJyk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzcG9zZScpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLXRpdGxlJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi1kaXJlY3Rpb25zJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBmdW5jdGlvblxuZnVuY3Rpb24gaGFuZGxlQWdyZWVDbGljaygpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1hZ3JlZW1lbnQtYWxsJykuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1kaXNzYWdncmVlJykucmVtb3ZlKCk7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50JywgdHJ1ZSk7XG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtYWN0aW9uLWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2gtODAnKTtcbiAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1hY3Rpb24taG9sZGVyJykuY2xhc3NMaXN0LmFkZCgnaC03MCcpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtYWN0aW9uLWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJ0LWhlaWdodC1hY3Rpb25zJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtaG9sZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgnc3RhcnQtaGVpZ2h0LW1hcCcpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtYWN0aW9uLWhvbGRlcicpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtaGVpZ2h0LWFjdGlvbnMnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1ob2xkZXInKS5jbGFzc0xpc3QuYWRkKCdzdGVwLWhlaWdodC1tYXAnKTtcbiAgbWFwLnJlc2l6ZSgpO1xuICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3R1ZHktYWdyZWVtZW50JywgdHJ1ZSk7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEaXNzYWdyZWVDbGljaygpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1kaXNzYWdncmVlJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1hZ3JlZW1lbnQtYWxsJykuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLnJlbW92ZSgpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcbiAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0dWR5LWFncmVlbWVudCcsIGZhbHNlKTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gZW5zdXJlIHRoZSBvYmplY3Qgb3IgdmFyaWFibGUgaXMgdmFsaWQuLi5cbi8vIEBwYXJhbSBvYmogLSB0eXBlbGVzc1xuZnVuY3Rpb24gY2hlY2tWYWxpZE9iamVjdChvYmopIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgJiYgb2JqLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdXVpZCgpIHtcbiAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDQpKS5qb2luKCctJyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYXdCdXR0b25DbGljayhlKSB7XG4gIGNvbnN0IGNpcmNsZUJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlLnRhcmdldC5pZH1gKTtcbiAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0pIHtcbiAgICBpZiAoY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoeyB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnIH0pO1xuICAgICAgJChgIyR7ZS50YXJnZXQuaWR9YCkudG9vbHRpcCgnc2hvdycpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgJChgIyR7ZS50YXJnZXQuaWR9YCkudG9vbHRpcCh7IHRyaWdnZXI6ICdtYW51YWwnIH0pO1xuICAgICAgJChgIyR7ZS50YXJnZXQuaWR9YCkudG9vbHRpcCgnaGlkZScpO1xuICAgICAgJChgIyR7ZS50YXJnZXQuaWR9YCkudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICAgJChgIyR7ZS50YXJnZXQuaWR9YCkudG9vbHRpcCgnZGlzcG9zZScpO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdDb250cm9sLnRyYXNoKCk7XG5cbiAgaWYgKG1hcC5nZXRMYXllcignY2lyY2xlLWxpbmUnKSkge1xuICAgIG1hcC5yZW1vdmVMYXllcignY2lyY2xlLWxpbmUnKTtcbiAgfVxuXG4gIGlmIChtYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1maWxsJykpIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1maWxsJyk7XG4gIH1cbiAgaWYgKG1hcC5nZXRTb3VyY2UoJ2NpcmNsZScpKSB7XG4gICAgbWFwLnJlbW92ZVNvdXJjZSgnY2lyY2xlJyk7XG4gIH1cblxuICBkcmF3Q29udHJvbC5jaGFuZ2VNb2RlKCdkcmF3X3JhZGl1cycpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBpc1N0dWR5Y29tcGxldGVkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcpO1xubGV0IHN0dWR5Q29tcGxldGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIGlzU3R1ZHljb21wbGV0ZWQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUNvbXBsZXRlZCA9IGlzU3R1ZHljb21wbGV0ZWQ7XG59IGVsc2Uge1xuICBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBjb21wbGV0ZXRpb25cbmNvbnN0IFN0dWR5QWdycmVlbWVudCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG5sZXQgc3R1ZHlBZ3JyZWVkID0gZmFsc2U7XG5pZiAodHlwZW9mIFN0dWR5QWdycmVlbWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gIHN0dWR5QWdycmVlZCA9IFN0dWR5QWdycmVlbWVudDtcbn0gZWxzZSB7XG4gIHN0dWR5QWdycmVlZCA9IGZhbHNlO1xufVxuXG4vLyBhbHJlYWR5IGFncmVlZFxuaWYgKHN0dWR5QWdycmVlZCkge1xuICAvLyBoYW5kbGVBZ3JlZUNsaWNrKCk7XG59XG5cbi8vIGhpZGUgc3R1ZHlcbmlmIChzdHVkeUNvbXBsZXRlZCkgeyAvLyB8fCBzdHVkeUFncnJlZWRcbiAgaGFuZGxlQWdyZWVDbGljaygpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktY29tcGxldGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykucmVtb3ZlKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtaG9sZGVyJykucmVtb3ZlKCk7XG59IGVsc2Uge1xuICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIGZhbHNlKTtcbn1cblxuaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3V1aWQnLCB1dWlkKCkpO1xufVxuXG5nZW9jb2Rlci5vbigncmVzdWx0JywgKGUpID0+IHtcbiAgY29uc3QgeCA9IGUucmVzdWx0LmNlbnRlclswXTtcbiAgY29uc3QgeSA9IGUucmVzdWx0LmNlbnRlclsxXTtcblxuICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc2VhcmNocG9pbnQnLCBgJHt4fSwgJHt5fWApO1xuXG4gIGNvbnN0IG9mZnNldGRpc3QgPSAwLjAwMjU7XG4gIGNvbnN0IGJib3ggPSBbW3ggLSBvZmZzZXRkaXN0LCB5IC0gb2Zmc2V0ZGlzdF0sIFt4ICsgb2Zmc2V0ZGlzdCwgeSArIG9mZnNldGRpc3RdXTtcblxuICAvLyBjcmVhdGUgcmFuZG9tIHpvb20gaW5jYXNlIHVzZXJzIGFyZSBpbmZsdWVuY2VkIGJ5IGludGlhbCB6b29tbGV2ZWxcbiAgbGV0IG1pbiA9IDEwO1xuICBsZXQgbWF4ID0gMTQ7XG4gIGlmIChpc01vYmlsZURldmljZSgpKSB7XG4gICAgbWluID0gMTA7XG4gICAgbWF4ID0gMTU7XG4gIH1cblxuICBjb25zdCB6bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIG1hcC5maXRCb3VuZHMoYmJveCwgeyBtYXhab29tOiB6bSB9KTtcblxuICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc2VhcmNoem9vbScsIHptKTtcblxuXG4gIGNvbnN0IGNpcmNsZUJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLWJ1dHRvbicpO1xuICBpZiAoY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICBjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ21hbnVhbCcgfSk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdoaWRlJyk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNhYmxlJyk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNwb3NlJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLXRpdGxlJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0xJykuY2xhc3NMaXN0LmFkZCgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXAtbm90LXZpcycpO1xuICB9XG59KTtcblxuY29uc3QgZ2VvY29kZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VvY29kZXInKTtcbmlmIChnZW9jb2RlRWxlbSkge1xuICBnZW9jb2RlRWxlbS5hcHBlbmRDaGlsZChnZW9jb2Rlci5vbkFkZChtYXApKTtcblxuICBnZW9jb2RlRWxlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHtcbiAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZ2VvY29kZUVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kJyk7XG4gICAgZ2VvY29kZUVsZW0uY2xhc3NMaXN0LmFkZCgnZXhwYW5kJyk7XG4gIH0pO1xufVxuXG5jb25zdCBzdWdnZXN0aW9uc0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2VvY29kZXIgLnN1Z2dlc3Rpb25zLXdyYXBwZXInKTtcbmlmIChzdWdnZXN0aW9uc0VsZW0pIHtcbiAgc3VnZ2VzdGlvbnNFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgIGNvbnN0IGdlb2NvZGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlb2NvZGVyJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBnZW9jb2RlRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmQnKTtcbiAgfSk7XG59XG5cbmNvbnN0IGRyYXdDaXJjbGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1kcmF3LWNpcmNsZScpO1xuaWYgKGRyYXdDaXJjbGVFbGVtZW50KSB7XG4gIGRyYXdDaXJjbGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRHJhd0J1dHRvbkNsaWNrKTtcbn1cblxuY29uc3QgcmVEcmF3Q2lyY2xlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tcmVkcmF3LWNpcmNsZScpO1xuaWYgKHJlRHJhd0NpcmNsZUVsZW1lbnQpIHtcbiAgcmVEcmF3Q2lyY2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURyYXdCdXR0b25DbGljayk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN0ZXBOYXZDbGljayhlKSB7XG4gIGNvbnN0IHZhbE5vZGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGVOb2RlKCd2YWwnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodmFsTm9kZSkge1xuICAgIGNvbnN0IGdlb2NvZGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlb2NvZGVyJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBpZiAoZ2VvY29kZUVsZW0pIHtcbiAgICAgIGdlb2NvZGVFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTEnKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0yJykuY2xhc3NMaXN0LnJlbW92ZSgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMycpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTEnKS5jbGFzc0xpc3QuYWRkKCdzdGVwLW5vdC12aXMnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0yJykuY2xhc3NMaXN0LmFkZCgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMycpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlTm9kZSgndmFsJykudmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt2YWx1ZX1gKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgfVxufVxuXG5jb25zdCBzdGVwTmF2MUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC1uYXYtMScpO1xuaWYgKHN0ZXBOYXYxRWxlbSkge1xuICBzdGVwTmF2MUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTdGVwTmF2Q2xpY2spO1xufVxuXG5jb25zdCBtYWluQ29udGVudEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1jb250ZW50Jyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbmlmIChtYWluQ29udGVudEVsZW0pIHtcbiAgbWFpbkNvbnRlbnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWFwYm94Z2wtY3RybC1nZW9jb2Rlci0taW5wdXQnKSkge1xuICAgICAgY29uc3QgZ2VvY29kZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VvY29kZXInKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgaWYgKGdlb2NvZGVFbGVtKSB7XG4gICAgICAgIGdlb2NvZGVFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHN0ZXBOYXYyRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLW5hdi0yJyk7XG5pZiAoc3RlcE5hdjJFbGVtKSB7XG4gIHN0ZXBOYXYyRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVN0ZXBOYXZDbGljayk7XG59XG5cbmNvbnN0IHN0ZXBOYXYzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLW5hdi0zJyk7XG5pZiAoc3RlcE5hdjNFbGVtKSB7XG4gIHN0ZXBOYXYzRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVN0ZXBOYXZDbGljayk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN1Ym1pdEJ1dHRvbkNsaWNrKGUpIHtcbiAgY29uc3Qgc3VibWl0QnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtYnV0dG9uJyk7XG4gIGlmIChzdWJtaXRCdXR0b25FbGVtLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICQoJyNzdWJtaXQtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdob3ZlciBmb2N1cycgfSk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdzaG93Jyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcblxuICAgIGNvbnN0IGNpcmNsZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnY2lyY2xlJyk7XG4gICAgY29uc3QgbGluZSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnbGluZScpO1xuICAgIGNvbnN0IGRpc3RhbmNla20gPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2Rpc3RhbmNla20nKTtcbiAgICBjb25zdCBkaXN0YW5jZWZlZXQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2Rpc3RhbmNlZmVldCcpO1xuXG4gICAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnY2lyY2xlLXN1Ym1pdHRlZCcsIGNpcmNsZSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2xpbmUtc3VibWl0dGVkJywgbGluZSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNla20tc3VibWl0dGVkJywgZGlzdGFuY2VrbSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNlZmVldC1zdWJtaXR0ZWQnLCBkaXN0YW5jZWZlZXQpO1xuXG4gICAgLy8gZW5kIHN0dWR5XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykucmVtb3ZlKCk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIHRydWUpO1xuXG4gICAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3R1ZHljb21wbGV0ZWQnLCB0cnVlKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3Qgc3VibWl0QnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtYnV0dG9uJyk7XG5pZiAoc3VibWl0QnV0dG9uRWxlbSkge1xuICBzdWJtaXRCdXR0b25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3VibWl0QnV0dG9uQ2xpY2spO1xufVxuXG5jb25zdCBkaXJlY3Rpb25zT25lID0gW1xuICAnU2VhcmNoIGZvciBhIGxvY2F0aW9uIHlvdSBjYXJlIGFib3V0LicsXG4gICdTZWFyY2ggZm9yIGEgbG9jYXRpb24gdG8gZmluZCBhYm91dCBjcmltZS4nLFxuICAnU2VhcmNoIGZvciBhIGxvY2F0aW9uIHRvIGZpbmQgYWJvdXQgYSBwaXp6YSBwbGFjZS4nXG5dO1xuXG5jb25zdCBtaW5PbmUgPSAwO1xuY29uc3QgbWF4T25lID0gMjtcbmNvbnN0IG1lc3NhZ2VJbmRleE9uZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhPbmUgLSBtaW5PbmUgKyAxKSArIG1pbk9uZSk7XG5jb25zdCBzdGVwRGlyZWN0aW9uczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDEtZGlyZWN0aW9ucycpO1xuaWYgKHN0ZXBEaXJlY3Rpb25zMSkge1xuICBzdGVwRGlyZWN0aW9uczEuaW5uZXJIVE1MID0gZGlyZWN0aW9uc09uZVttZXNzYWdlSW5kZXhPbmVdO1xufVxuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0ZXAxdGV4dCcsIGRpcmVjdGlvbnNPbmVbbWVzc2FnZUluZGV4T25lXSk7XG5cbmNvbnN0IGRpcmVjdGlvbnNUd28gPSBbXG4gICdEcmF3IGEgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyAxIG1pbGUgZnJvbSB0aGUgbG9jYXRpb24uJyxcbiAgJ0RyYXcgYSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIGEgNSBtaW51dGUgPHN0cm9uZz5EUklWRTwvc3Ryb25nPi4nLFxuICAnRHJhdyBhIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgYSA1IG1pbnV0ZSA8c3Ryb25nPldBTEs8L3N0cm9uZz4uJ1xuXTtcblxuY29uc3QgbWluVHdvID0gMDtcbmNvbnN0IG1heFR3byA9IDI7XG5jb25zdCBtZXNzYWdlSW5kZXhUd28gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4VHdvIC0gbWluVHdvICsgMSkgKyBtaW5Ud28pO1xuY29uc3Qgc3RlcERpcmVjdGlvbnMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLWRpcmVjdGlvbnMnKTtcbmlmIChzdGVwRGlyZWN0aW9uczIpIHtcbiAgc3RlcERpcmVjdGlvbnMyLmlubmVySFRNTCA9IGRpcmVjdGlvbnNUd29bbWVzc2FnZUluZGV4VHdvXTtcbn1cblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzdGVwMnRleHQnLCBkaXJlY3Rpb25zVHdvW21lc3NhZ2VJbmRleFR3b10pO1xuXG5jb25zdCBhZ2dyZWVCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZ3JlZS1idXR0b24nKTtcbmlmIChhZ2dyZWVCdXR0b25FbGVtZW50KSB7XG4gIGFnZ3JlZUJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVBZ3JlZUNsaWNrKTtcbn1cblxuY29uc3QgZGlzc2FnZ3JlZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhZ2dyZWUtYnV0dG9uJyk7XG5pZiAoZGlzc2FnZ3JlZUJ1dHRvbkVsZW1lbnQpIHtcbiAgZGlzc2FnZ3JlZUJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEaXNzYWdyZWVDbGljayk7XG59XG5cbmNvbnN0IHN0ZXAyTWlub3JEaXJlY3Rpb25zRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi1taW5vci1kaXJlY3Rpb25zJyk7XG5pZiAoc3RlcDJNaW5vckRpcmVjdGlvbnNFbGVtZW50KSB7XG4gIGlmIChpc01vYmlsZURldmljZSgpKSB7XG4gICAgc3RlcDJNaW5vckRpcmVjdGlvbnNFbGVtZW50LmlubmVySFRNTCA9ICdDbGljayBvbiB0aGUgbWFwLCB0aGVuIGRyYWcgeW91ciBmaW5nZXIgYWNyb3NzIHRoZSBtYXAgdW50aWwgdGhlIGNpcmNsZSBiZXN0IHJlcHJlc2VudHMgdGhlIGRpc3RhbmNlLic7XG4gIH1cbn1cbiIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2Nocmlzd2hvbmcvNjk0Nzc5YmMxZjFlNWQ5MjZlNDdiYWI3MjA1ZmE1NTlcbi8vIGN1c3RvbSBtYXBib3B4LWdsLWRyYXcgbW9kZSB0aGF0IG1vZGlmaWVzIGRyYXdfbGluZV9zdHJpbmdcbi8vIHNob3dzIGEgY2VudGVyIHBvaW50LCByYWRpdXMgbGluZSwgYW5kIGNpcmNsZSBwb2x5Z29uIHdoaWxlIGRyYXdpbmdcbi8vIGZvcmNlcyBkcmF3LmNyZWF0ZSBvbiBjcmVhdGlvbiBvZiBzZWNvbmQgdmVydGV4XG5pbXBvcnQgTWFwYm94RHJhdyBmcm9tICdAbWFwYm94L21hcGJveC1nbC1kcmF3JztcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnO1xuaW1wb3J0IGxpbmVEaXN0YW5jZSBmcm9tICdAdHVyZi9saW5lLWRpc3RhbmNlJztcbmltcG9ydCB7IEdvb2dsZUFuYWx5dGljcyB9IGZyb20gJy4vZ2EnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgUmFkaXVzTW9kZSA9IE1hcGJveERyYXcubW9kZXMuZHJhd19saW5lX3N0cmluZztcbmNvbnN0IGdvb2dsZUFuYWx5dGljcyA9IG5ldyBHb29nbGVBbmFseXRpY3MoKTtcblxuLy8gc3RvcmUuc2V0U3RhdGVJdGVtKCdpc1RvdWNoTW92ZScsIHRydWUpO1xuXG5mdW5jdGlvbiBjcmVhdGVWZXJ0ZXgocGFyZW50SWQsIGNvb3JkaW5hdGVzLCBwYXRoLCBzZWxlY3RlZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBtZXRhOiAndmVydGV4JyxcbiAgICAgIHBhcmVudDogcGFyZW50SWQsXG4gICAgICBjb29yZF9wYXRoOiBwYXRoLFxuICAgICAgYWN0aXZlOiAoc2VsZWN0ZWQpID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgIH0sXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBjb29yZGluYXRlc1xuICAgIH1cbiAgfTtcbn1cblxuLy8gY3JlYXRlIGEgY2lyY2xlLWxpa2UgcG9seWdvbiBnaXZlbiBhIGNlbnRlciBwb2ludCBhbmQgcmFkaXVzXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNzU5OTU2MS9kcmF3aW5nLWEtY2lyY2xlLXdpdGgtdGhlLXJhZGl1cy1pbi1taWxlcy1tZXRlcnMtd2l0aC1tYXBib3gtZ2wtanMvMzkwMDYzODgjMzkwMDYzODhcbmZ1bmN0aW9uIGNyZWF0ZUdlb0pTT05DaXJjbGUoY2VudGVyLCByYWRpdXNJbkttLCBwYXJlbnRJZCwgcG9pbnRzID0gNjQpIHtcbiAgY29uc3QgY29vcmRzID0ge1xuICAgIGxhdGl0dWRlOiBjZW50ZXJbMV0sXG4gICAgbG9uZ2l0dWRlOiBjZW50ZXJbMF1cbiAgfTtcblxuICBjb25zdCBrbSA9IHJhZGl1c0luS207XG5cbiAgY29uc3QgcmV0ID0gW107XG4gIGNvbnN0IGRpc3RhbmNlWCA9IGttIC8gKDExMS4zMjAgKiBNYXRoLmNvcygoY29vcmRzLmxhdGl0dWRlICogTWF0aC5QSSkgLyAxODApKTtcbiAgY29uc3QgZGlzdGFuY2VZID0ga20gLyAxMTAuNTc0O1xuXG4gIGxldCB0aGV0YTtcbiAgbGV0IHg7XG4gIGxldCB5O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50czsgaSArPSAxKSB7XG4gICAgdGhldGEgPSAoaSAvIHBvaW50cykgKiAoMiAqIE1hdGguUEkpO1xuICAgIHggPSBkaXN0YW5jZVggKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgeSA9IGRpc3RhbmNlWSAqIE1hdGguc2luKHRoZXRhKTtcblxuICAgIHJldC5wdXNoKFtjb29yZHMubG9uZ2l0dWRlICsgeCwgY29vcmRzLmxhdGl0dWRlICsgeV0pO1xuICB9XG4gIHJldC5wdXNoKHJldFswXSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBbcmV0XVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgcGFyZW50OiBwYXJlbnRJZCxcbiAgICAgIGFjdGl2ZTogJ3RydWUnXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5TWVhc3VyZW1lbnRzKGZlYXR1cmUpIHtcbiAgLy8gc2hvdWxkIGxvZyBib3RoIG1ldHJpYyBhbmQgc3RhbmRhcmQgZGlzcGxheSBzdHJpbmdzIGZvciB0aGUgY3VycmVudCBkcmF3biBmZWF0dXJlXG4gIC8vIG1ldHJpYyBjYWxjdWxhdGlvblxuICBjb25zdCBkcmF3bkxlbmd0aCA9IChsaW5lRGlzdGFuY2UoZmVhdHVyZSkgKiAxMDAwKTsgLy8gbWV0ZXJzXG5cbiAgbGV0IG1ldHJpY1VuaXRzID0gJ20nO1xuICBsZXQgbWV0cmljRm9ybWF0ID0gJzAsMCc7XG4gIGxldCBtZXRyaWNNZWFzdXJlbWVudDtcblxuICBsZXQgc3RhbmRhcmRVbml0cyA9ICdmZWV0JztcbiAgbGV0IHN0YW5kYXJkRm9ybWF0ID0gJzAsMCc7XG4gIGxldCBzdGFuZGFyZE1lYXN1cmVtZW50O1xuXG4gIG1ldHJpY01lYXN1cmVtZW50ID0gZHJhd25MZW5ndGg7XG4gIGlmIChkcmF3bkxlbmd0aCA+PSAxMDAwKSB7IC8vIGlmIG92ZXIgMTAwMCBtZXRlcnMsIHVwZ3JhZGUgbWV0cmljXG4gICAgbWV0cmljTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aCAvIDEwMDA7XG4gICAgbWV0cmljVW5pdHMgPSAna20nO1xuICAgIG1ldHJpY0Zvcm1hdCA9ICcwLjAwJztcbiAgfVxuXG4gIHN0YW5kYXJkTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aCAqIDMuMjgwODQ7XG4gIGlmIChzdGFuZGFyZE1lYXN1cmVtZW50ID49IDUyODApIHsgLy8gaWYgb3ZlciA1MjgwIGZlZXQsIHVwZ3JhZGUgc3RhbmRhcmRcbiAgICBzdGFuZGFyZE1lYXN1cmVtZW50IC89IDUyODA7XG4gICAgc3RhbmRhcmRVbml0cyA9ICdtaSc7XG4gICAgc3RhbmRhcmRGb3JtYXQgPSAnMC4wMCc7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5TWVhc3VyZW1lbnRzID0ge1xuICAgIG1ldHJpYzogYCR7bnVtZXJhbChtZXRyaWNNZWFzdXJlbWVudCkuZm9ybWF0KG1ldHJpY0Zvcm1hdCl9ICR7bWV0cmljVW5pdHN9YCxcbiAgICBzdGFuZGFyZDogYCR7bnVtZXJhbChzdGFuZGFyZE1lYXN1cmVtZW50KS5mb3JtYXQoc3RhbmRhcmRGb3JtYXQpfSAke3N0YW5kYXJkVW5pdHN9YFxuICB9O1xuXG4gIHJldHVybiBkaXNwbGF5TWVhc3VyZW1lbnRzO1xufVxuXG5jb25zdCBkb3VibGVDbGlja1pvb20gPSB7XG4gIGVuYWJsZTogKGN0eCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gRmlyc3QgY2hlY2sgd2UndmUgZ290IGEgbWFwIGFuZCBzb21lIGNvbnRleHQuXG4gICAgICBpZiAoIWN0eC5tYXAgfHwgIWN0eC5tYXAuZG91YmxlQ2xpY2tab29tIHx8ICFjdHguX2N0eCB8fFxuICAgICAgICAgIWN0eC5fY3R4LnN0b3JlIHx8ICFjdHguX2N0eC5zdG9yZS5nZXRJbml0aWFsQ29uZmlnVmFsdWUpIHJldHVybjtcbiAgICAgIC8vIE5vdyBjaGVjayBpbml0aWFsIHN0YXRlIHdhc24ndCBmYWxzZSAod2UgbGVhdmUgaXQgZGlzYWJsZWQgaWYgc28pXG4gICAgICBpZiAoIWN0eC5fY3R4LnN0b3JlLmdldEluaXRpYWxDb25maWdWYWx1ZSgnZG91YmxlQ2xpY2tab29tJykpIHJldHVybjtcbiAgICAgIGN0eC5tYXAuZG91YmxlQ2xpY2tab29tLmVuYWJsZSgpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG5cbi8vIFdoZW5ldmVyIGEgdXNlciBjbGlja3Mgb24gYSBrZXkgd2hpbGUgZm9jdXNlZCBvbiB0aGUgbWFwLCBpdCB3aWxsIGJlIHNlbnQgaGVyZVxuUmFkaXVzTW9kZS5vbktleVVwID0gZnVuY3Rpb24gb25LZXlVcChzdGF0ZSwgZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgIHRoaXMuZGVsZXRlRmVhdHVyZShbc3RhdGUubGluZS5pZF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgIHRoaXMuY2hhbmdlTW9kZSgnc2ltcGxlX3NlbGVjdCcsIHt9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuLy8gZm9yIG1vYmlsZSB0b3VjaCBtb3ZlIGluIG1vYmlsZSB0aGVyZSBpcyBubyBjbGlja1xuLy8gc2luY2UgaXQgd291bGQgcHJvdmlkZSBubyBmZWVkYmFjayB0byB1c2VyXG5mdW5jdGlvbiBvblRvdWNoTW92ZURyYXcoc3RhdGUsIGUpIHtcbiAgaWYgKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiA9PT0gMSkge1xuICAgIHN0YXRlLmxpbmUucmVtb3ZlQ29vcmRpbmF0ZSgnMicpO1xuICAgIHN0YXRlLmxpbmUuYWRkQ29vcmRpbmF0ZSgyLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIGlmIChzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xuICAgIHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiArPSAxOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3RhdGUubGluZS51cGRhdGVDb29yZGluYXRlKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmxpbmUuYWRkQ29vcmRpbmF0ZSgwLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGZvciBkZXNrdG9wIGNsaWNrc1xuZnVuY3Rpb24gaW50ZXJhY3RpdmVEcmF3KHN0YXRlLCBlLCBldmVudFR5cGUsIHNlbGYpIHtcbiAgaWYgKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiA9PT0gMSkge1xuICAgIHN0YXRlLmxpbmUuYWRkQ29vcmRpbmF0ZSgwLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gICAgcmV0dXJuIHNlbGYuY2hhbmdlTW9kZSgnc2ltcGxlX3NlbGVjdCcsIHsgZmVhdHVyZUlkczogW3N0YXRlLmxpbmUuaWRdIH0pO1xuICB9XG5cbiAgc2VsZi51cGRhdGVVSUNsYXNzZXMoeyBtb3VzZTogJ2FkZCcgfSk7XG5cbiAgc3RhdGUubGluZS51cGRhdGVDb29yZGluYXRlKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICBpZiAoc3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpIHtcbiAgICBzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24gKz0gMTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5saW5lLmFkZENvb3JkaW5hdGUoMCwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cblJhZGl1c01vZGUub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KHN0YXRlLCBlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5SYWRpdXNNb2RlLm9uVG91Y2hNb3ZlID0gZnVuY3Rpb24gb25Ub3VjaE1vdmUoc3RhdGUsIGUpIHtcbiAgLy8gY29uc29sZS5sb2coJ29uVG91Y2hNb3ZlJylcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZXR1cm4gb25Ub3VjaE1vdmVEcmF3KHN0YXRlLCBlKTtcbn07XG5cblJhZGl1c01vZGUub25Ub3VjaEVuZCA9IGZ1bmN0aW9uIG9uVG91Y2hFbmQoc3RhdGUsIGUpIHtcbiAgLy8gY29uc29sZS5sb2coJ29uVG91Y2hFbmQnKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBpbnRlcmFjdGl2ZURyYXcoc3RhdGUsIGUsICdvblRvdWNoRW5kJywgdGhpcyk7XG59O1xuXG5SYWRpdXNNb2RlLmNsaWNrQW55d2hlcmUgPSBmdW5jdGlvbiBjbGlja0FueXdoZXJlKHN0YXRlLCBlKSB7XG4gIC8vIGNvbnNvbGUubG9nKCdjbGlja0FueXdoZXJlJylcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZXR1cm4gaW50ZXJhY3RpdmVEcmF3KHN0YXRlLCBlLCAnbW91c2UnLCB0aGlzKTtcbn07XG5cbi8vIGNyZWF0ZXMgdGhlIGZpbmFsIGdlb2pzb24gcG9pbnQgZmVhdHVyZSB3aXRoIGEgcmFkaXVzIHByb3BlcnR5XG4vLyB0cmlnZ2VycyBkcmF3LmNyZWF0ZVxuUmFkaXVzTW9kZS5vblN0b3AgPSBmdW5jdGlvbiBvblN0b3Aoc3RhdGUpIHtcbiAgZG91YmxlQ2xpY2tab29tLmVuYWJsZSh0aGlzKTtcbiAgLy8gY29uc29sZS5sb2coJ29uU3RvcCcpXG4gIHRoaXMuYWN0aXZhdGVVSUJ1dHRvbigpO1xuXG4gIC8vIGNoZWNrIHRvIHNlZSBpZiB3ZSd2ZSBkZWxldGVkIHRoaXMgZmVhdHVyZVxuICBpZiAodGhpcy5nZXRGZWF0dXJlKHN0YXRlLmxpbmUuaWQpID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAvLyByZW1vdmUgbGFzdCBhZGRlZCBjb29yZGluYXRlXG4gIHN0YXRlLmxpbmUucmVtb3ZlQ29vcmRpbmF0ZSgnMCcpO1xuICBpZiAoc3RhdGUubGluZS5pc1ZhbGlkKCkpIHtcbiAgICBjb25zdCBsaW5lR2VvSnNvbiA9IHN0YXRlLmxpbmUudG9HZW9KU09OKCk7XG4gICAgY29uc3Qgc3RhcnRQb2ludCA9IGxpbmVHZW9Kc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gbGluZURpc3RhbmNlKGxpbmVHZW9Kc29uKTtcblxuICAgIGNvbnN0IGNpcmNsZUdlb0pTT04gPSBjcmVhdGVHZW9KU09OQ2lyY2xlKHN0YXJ0UG9pbnQsIGRpc3RhbmNlLCBudWxsLCAzMik7XG4gICAgY29uc3QgZmVldCA9IChkaXN0YW5jZSAqIDEwMDApICogMy4yODA4NDtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2NpcmNsZScsIEpTT04uc3RyaW5naWZ5KGNpcmNsZUdlb0pTT04pKTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2xpbmUnLCBKU09OLnN0cmluZ2lmeShsaW5lR2VvSnNvbikpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnZGlzdGFuY2VrbScsIGRpc3RhbmNlKTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2Rpc3RhbmNlZmVldCcsIGZlZXQpO1xuXG4gICAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnY2lyY2xlLXByZXN1Ym1pdCcsIEpTT04uc3RyaW5naWZ5KGNpcmNsZUdlb0pTT04pKTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnbGluZS1wcmVzdWJtaXQnLCBKU09OLnN0cmluZ2lmeShsaW5lR2VvSnNvbikpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdkaXN0YW5jZWttLXByZXN1Ym1pdCcsIGRpc3RhbmNlKTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnZGlzdGFuY2VmZWV0LXByZXN1Ym1pdCcsIGZlZXQpO1xuICAgIGNvbnN0IGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgYXZhaWxXaWR0aCA9IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGF2YWlsSGVpZ2h0ID0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGhlaWdodEpTT04gPSB7XG4gICAgICBpbm5lcldpZHRoLFxuICAgICAgaW5uZXJIZWlnaHQsXG4gICAgICBhdmFpbFdpZHRoLFxuICAgICAgYXZhaWxIZWlnaHRcbiAgICB9O1xuXG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3ByZXN1Ym1pdC1zY3JlZW4nLCBKU09OLnN0cmluZ2lmeShoZWlnaHRKU09OKSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3ByZXN1Ym1pdC16b29tJywgdGhpcy5tYXAuZ2V0Wm9vbSgpKTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbicpO1xuICAgIGlmIChzdWJtaXRCdXR0b25FbGVtKSB7XG4gICAgICBzdWJtaXRCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICBzdWJtaXRCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTInKS5jbGFzc0xpc3QuYWRkKCdzdGVwLW5vdC12aXMnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaXJjbGUyQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uMicpO1xuICAgIGlmIChjaXJjbGUyQnV0dG9uRWxlbSkge1xuICAgICAgY2lyY2xlMkJ1dHRvbkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICB9XG5cbiAgICAvLyByZWNvbmZpZ3VyZSB0aGUgZ2VvanNvbiBsaW5lIGludG8gYSBnZW9qc29uIHBvaW50IHdpdGggYSByYWRpdXMgcHJvcGVydHlcbiAgICBjb25zdCBwb2ludFdpdGhSYWRpdXMgPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBnZW9tZXRyeToge1xuICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjaXJjbGVHZW9KU09OLmdlb21ldHJ5LmNvb3JkaW5hdGVzXG4gICAgICB9LFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICByYWRpdXNNZXRyaWM6IChsaW5lRGlzdGFuY2UobGluZUdlb0pzb24pKS50b0ZpeGVkKDEpLFxuICAgICAgICByYWRpdXNGZWV0OiBmZWV0XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLm1hcC5nZXRMYXllcignY2lyY2xlLWxpbmUnKSkge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1saW5lJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWFwLmdldExheWVyKCdjaXJjbGUtZmlsbCcpKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcignY2lyY2xlLWZpbGwnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFwLmdldFNvdXJjZSgnY2lyY2xlJykpIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZVNvdXJjZSgnY2lyY2xlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXAuYWRkU291cmNlKCdjaXJjbGUnLCB7XG4gICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICBkYXRhOiBwb2ludFdpdGhSYWRpdXNcbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmFkZExheWVyKHtcbiAgICAgIGlkOiAnY2lyY2xlLWZpbGwnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiAnY2lyY2xlJyxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdmaWxsLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcC5hZGRMYXllcih7XG4gICAgICBpZDogJ2NpcmNsZS1saW5lJyxcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIHNvdXJjZTogJ2NpcmNsZScsXG4gICAgICBsYXlvdXQ6IHtcbiAgICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICAgIH0sXG4gICAgICBwYWludDoge1xuICAgICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAuZmlyZSgnZHJhdy5jcmVhdGUnLCB7XG4gICAgICBmZWF0dXJlczogW3BvaW50V2l0aFJhZGl1c11cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRlbGV0ZUZlYXR1cmUoW3N0YXRlLmxpbmUuaWRdLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICB0aGlzLmNoYW5nZU1vZGUoJ3NpbXBsZV9zZWxlY3QnLCB7fSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gIH1cbn07XG5cblJhZGl1c01vZGUudG9EaXNwbGF5RmVhdHVyZXMgPSBmdW5jdGlvbiB0b0Rpc3BsYXlGZWF0dXJlcyhzdGF0ZSwgZ2VvanNvbiwgZGlzcGxheSkge1xuICBjb25zdCBpc0FjdGl2ZUxpbmUgPSBnZW9qc29uLnByb3BlcnRpZXMuaWQgPT09IHN0YXRlLmxpbmUuaWQ7XG5cbiAgZ2VvanNvbi5wcm9wZXJ0aWVzLmFjdGl2ZSA9IChpc0FjdGl2ZUxpbmUpID8gJ3RydWUnIDogJ2ZhbHNlJzsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKCFpc0FjdGl2ZUxpbmUpIHJldHVybiBkaXNwbGF5KGdlb2pzb24pO1xuXG4gIC8vIE9ubHkgcmVuZGVyIHRoZSBsaW5lIGlmIGl0IGhhcyBhdCBsZWFzdCBvbmUgcmVhbCBjb29yZGluYXRlXG4gIGlmIChnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHJldHVybiBudWxsO1xuICBnZW9qc29uLnByb3BlcnRpZXMubWV0YSA9ICdmZWF0dXJlJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIC8vIGRpc3BsYXlzIGNlbnRlciB2ZXJ0ZXggYXMgYSBwb2ludCBmZWF0dXJlXG4gIGRpc3BsYXkoY3JlYXRlVmVydGV4KFxuICAgIHN0YXRlLmxpbmUuaWQsXG4gICAgZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1tzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoIC0gMiA6IDFdLFxuICAgIGAke3N0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggLSAyIDogMX1gLFxuICAgIGZhbHNlLFxuICApKTtcblxuICAvLyBkaXNwbGF5cyB0aGUgbGluZSBhcyBpdCBpcyBkcmF3blxuICBkaXNwbGF5KGdlb2pzb24pO1xuXG4gIGNvbnN0IGRpc3BsYXlNZWFzdXJlbWVudHMgPSBnZXREaXNwbGF5TWVhc3VyZW1lbnRzKGdlb2pzb24pO1xuXG4gIC8vIGNyZWF0ZSBjdXN0b20gZmVhdHVyZSBmb3IgdGhlIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvblxuICBjb25zdCBjdXJyZW50VmVydGV4ID0ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBtZXRhOiAnY3VycmVudFBvc2l0aW9uJyxcbiAgICAgIGFjdGl2ZTogJ3RydWUnLFxuICAgICAgcmFkaXVzTWV0cmljOiBkaXNwbGF5TWVhc3VyZW1lbnRzLm1ldHJpYyxcbiAgICAgIHJhZGl1c1N0YW5kYXJkOiBkaXNwbGF5TWVhc3VyZW1lbnRzLnN0YW5kYXJkLFxuICAgICAgcGFyZW50OiBzdGF0ZS5saW5lLmlkXG4gICAgfSxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzOiBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdXG4gICAgfVxuICB9O1xuICBkaXNwbGF5KGN1cnJlbnRWZXJ0ZXgpO1xuXG4gIC8vIGNyZWF0ZSBjdXN0b20gZmVhdHVyZSBmb3IgcmFkaXVzIGNpcmNsZW1hcmtlclxuICBjb25zdCBjZW50ZXIgPSBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCByYWRpdXNJbkttID0gbGluZURpc3RhbmNlKGdlb2pzb24sICdraWxvbWV0ZXJzJyk7XG4gIGNvbnN0IGNpcmNsZUZlYXR1cmUgPSBjcmVhdGVHZW9KU09OQ2lyY2xlKGNlbnRlciwgcmFkaXVzSW5LbSwgc3RhdGUubGluZS5pZCk7XG4gIGNpcmNsZUZlYXR1cmUucHJvcGVydGllcy5tZXRhID0gJ3JhZGl1cyc7XG5cbiAgZGlzcGxheShjaXJjbGVGZWF0dXJlKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSYWRpdXNNb2RlO1xuIiwiLy8gaW1wb3J0IHsgU3RvcmFnZUFQSSB9IGZyb20gJy4vbG9jYWxTdG9yYWdlQVBJJztcblxuLyoqXG4qIFRoaXMgY29tcG9uZW50IGlzIGludGVuZGVkIHRvIGhhbmRsZSB0aGUgc3RvcmFnZSBhbmQgcmV0cmlldmFsIG9mIHRoZSBzdGF0ZSBvZlxuKiBBcyBvZiB0aGlzIHdyaXRpbmcgaXQgaXMgdXNpbmcgbG9jYWxTdG9yYWdlIHRvIGRvIHRoaXMuXG4qIFVzZXMgc2ltcGxlIGNsYXNzIGluc3RhbmNlIG1ldGhvZHMgd2l0aCB0aGUgc2hvcnQtaGFuZCBtZXRob2QgZGVjbGFyYXRpb25cbiogcGF0dGVybi5cbipcbiogVG8gbm90ZTogVGhlcmUgaXMgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIFN0b3JlIGFuZCB0aGUgU3RhdGUuIEFzIG9mIDBhMzEwNmVcbiogdGhlIFN0b3JlIGlzIGEgU3RyaW5nIHNhdmVkIHRvIHRoZSBicm93c2VycyBsb2NhbFN0b3JhZ2UgYW5kIGlzIGEgc2VyaWFsaXplZFxuKiB2ZXJzaW9uIG9mIHRoZSBTdGF0ZS4gVGhlIFN0YXRlIGlzIGFuIE9iamVjdCB3aGljaCBpcyBpbnRlcmFjdGVkIHdpdGggYnlcbiogcGFyc2luZyB0aGUgU3RhdGUgc3RyaW5nIGZyb20gdGhlIFN0b3JlLCBtb2RpZnlpbmcgdGhlIHJlc3VsdHMgb2YgdGhlIHBhcnNlLFxuKiBhbmQgcmUtc2VyaWFsaXppbmcgaXQgYmFjayB0byB0aGUgU3RvcmUuXG4qL1xuY29uc3QgU1RBVEVfS0VZID0gJ3N0YXRlJztcblxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgLy8gLi5hbmQgYW4gKG9wdGlvbmFsKSBjdXN0b20gY2xhc3MgY29uc3RydWN0b3IuIElmIG9uZSBpc1xuICAvLyBub3Qgc3VwcGxpZWQsIGEgZGVmYXVsdCBjb25zdHJ1Y3RvciBpcyB1c2VkIGluc3RlYWQ6XG4gIC8vIGNvbnN0cnVjdG9yKCkgeyB9XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAvLyB0aGlzLnN0b3JlID0gbmV3IFN0b3JhZ2VBUEkoKTtcbiAgICBpZiAoU3RvcmUuc3RvcmFnZUF2YWlsYWJsZSgpKSB7XG4gICAgICB0aGlzLnN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgaWYgKHRoaXMuY2hlY2tTdGF0ZUV4aXN0cykge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgU1RBVEVfS0VZIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0cyBhIGtleS92YWx1ZSBwYWlyIHRvIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHBhcmFtIHZhbHVlIHwgc3RyaW5nXG4gIHNldFN0YXRlSXRlbShrZXkgPSAnJywgdmFsdWUgPSAnJykge1xuICAgIGNvbnN0IHN0b3JlT2JqID0geyBba2V5XTogdmFsdWUgfTtcbiAgICBjb25zdCBuZXdTdGF0ZU9iaiA9IHsgLi4udGhpcy5nZXRTdGF0ZSgpLCAuLi5zdG9yZU9iaiB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGVPYmopO1xuICB9XG5cbiAgLy8gR2V0cyB0aGUgZW50aXJlIHN0YXRlIG9iamVjdFxuICAvL1xuICAvLyBAcmV0dXJuIG9iamVjdFxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgPyBKU09OLnBhcnNlKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKSA6IHt9O1xuICB9XG5cbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRJdGVtKGtleSA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFNUQVRFX0tFWSk7XG4gIH1cblxuICAvLyBHXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVJdGVtKGtleSA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tJdGVtKGtleSkgPyB0aGlzLmdldFN0YXRlKClba2V5XSA6IHt9O1xuICAgIC8vIHRoaXMuc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICAvLyBTZXRzIGEgbmV3IHN0YXRlIG9iamVjdCBzdGF0ZVxuICAvL1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGUodmFsdWUgPSB7fSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFNUQVRFX0tFWSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBzdGF0ZSBleGlzdHMgaW4gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgY2hlY2tTdGF0ZUV4aXN0cygpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSk7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBzdGF0ZSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIC8vXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldFN0YXRlQXNTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW4gaXRlbSBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc3RvcmVcbiAgLy8gdW51c2VkIGFzIG9mIDBhMzEwNmVcbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGlzU3RhdGVJdGVtRXhpc3QoaXRlbSkge1xuICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSkge1xuICAgICAgY29uc3Qgc3RhdGVTdHIgPSB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKTtcbiAgICAgIGlmIChzdGF0ZVN0ci5pbmRleE9mKGl0ZW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGNoZWNrSXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpICYmIHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpLmluZGV4T2YoaXRlbSkgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIGF2YWlsYWJsZS5cbiAgLy8gVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX1N0b3JhZ2VfQVBJL1VzaW5nX3RoZV9XZWJfU3RvcmFnZV9BUElcbiAgLy9cbiAgLy8gQHJldHVybiBib29sZWFuXG4gIHN0YXRpYyBzdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbG9jYWxTdG9yYWdlJztcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMDtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=