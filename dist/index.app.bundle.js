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
/******/ 	var hotCurrentHash = "67c61bd264929eeb09cd";
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

var urlString = window.location.href;
var url = new URL(urlString);
var userType = url.searchParams.get('userType');

// ga event action, category, label
googleAnalytics.setEvent('data', 'study started', 'true');

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
      $('#circle-button2').tooltip({ trigger: 'hover focus' });
      $('#circle-button2').tooltip('show');
      return null;
    } else {
      // eslint-disable-line
      $('#circle-button2').tooltip({ trigger: 'manual' });
      $('#circle-button2').tooltip('hide');
      $('#circle-button2').tooltip('disable');
      $('#circle-button2').tooltip('dispose');
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
    submitButtonElem.classList.remove('disabled');

    document.getElementById('step-2').classList.add('step-not-vis');
    document.getElementById('step-3').classList.remove('step-not-vis');
  }

  var circle2ButtonElem = document.getElementById('circle-button2');
  if (circle2ButtonElem) {
    circle2ButtonElem.classList.remove('disabled');
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

    document.getElementById('step-1').classList.add('step-not-vis');
    document.getElementById('step-2').classList.remove('step-not-vis');
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

var reDrawCircleElement = document.querySelector('.btn-redraw-circle');
if (reDrawCircleElement) {
  reDrawCircleElement.addEventListener('click', handleDrawButtonClick);
}

function handleStepNavClick(e) {
  var valNode = e.target.getAttributeNode('val'); // eslint-disable-line
  if (valNode) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZHJhd3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yYWRpdXNNb2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0b3JlLmpzIl0sIm5hbWVzIjpbImlkIiwidHlwZSIsImZpbHRlciIsImxheW91dCIsInBhaW50IiwiYmFzZSIsInN0b3BzIiwic3RvcmUiLCJTdG9yZSIsImRhdGFwaSIsIkdvb2dsZUFuYWx5dGljcyIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJ2YWx1ZSIsInV1aWQiLCJnZXRTdGF0ZUl0ZW0iLCJkYXRlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGF0YSIsImZvb09iaiIsImd0YWciLCJldmVudF9jYXRlZ29yeSIsImV2ZW50X2xhYmVsIiwianNvbmRhdGEiLCJkYXRhQVBJVVJMIiwiVVJMIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZmV0Y2giLCJnb29nbGVBbmFseXRpY3MiLCJsaWJyYXJ5IiwiYWRkIiwiZmFzIiwiZmFyIiwiZG9tIiwid2F0Y2giLCJ1cmxTdHJpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ1cmwiLCJ1c2VyVHlwZSIsInNlYXJjaFBhcmFtcyIsImdldCIsInNldEV2ZW50IiwibWFwYm94Z2wiLCJhY2Nlc3NUb2tlbiIsIm1hcCIsIk1hcCIsImNvbnRhaW5lciIsInN0eWxlIiwiY2VudGVyIiwiem9vbSIsInNob3dab29tIiwidG91Y2hFbmFibGVkIiwia2V5YmluZGluZ3MiLCJkcmF3Q29udHJvbCIsIk1hcGJveERyYXciLCJkaXNwbGF5Q29udHJvbHNEZWZhdWx0IiwiY29udHJvbHMiLCJyZWN0YW5nbGUiLCJwb2x5Z29uIiwibGluZV9zdHJpbmciLCJ0cmFzaCIsIm9wdGlvbnMiLCJ0b3VjaEJ1ZmZlciIsInN0eWxlcyIsImRyYXdTdHlsZXMiLCJtb2RlcyIsIk9iamVjdCIsImFzc2lnbiIsImRyYXdfcmFkaXVzIiwiUmFkaXVzTW9kZSIsImFkZENvbnRyb2wiLCJuYXYiLCJOYXZpZ2F0aW9uQ29udHJvbCIsImdlb2NvZGVyIiwiTWFwYm94R2VvY29kZXIiLCJzZXRab29tIiwiZmx5VG8iLCJwbGFjZWhvbGRlciIsIm9uIiwiZ2V0Wm9vbSIsImNpcmNsZUJ1dHRvbkVsZW0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCIkIiwidG9vbHRpcCIsInRyaWdnZXIiLCJoYW5kbGVBZ3JlZUNsaWNrIiwic2V0U3RhdGVJdGVtIiwicmVzaXplIiwiaGFuZGxlRGlzc2FncmVlQ2xpY2siLCJjaGVja1ZhbGlkT2JqZWN0Iiwib2JqIiwidW5kZWZpbmVkIiwia2V5cyIsImxlbmd0aCIsImlzTW9iaWxlRGV2aWNlIiwiY2hlY2siLCJhIiwidGVzdCIsInN1YnN0ciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInZlbmRvciIsIm9wZXJhIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiaGFuZGxlRHJhd0J1dHRvbkNsaWNrIiwiZSIsImdldExheWVyIiwicmVtb3ZlTGF5ZXIiLCJnZXRTb3VyY2UiLCJyZW1vdmVTb3VyY2UiLCJjaGFuZ2VNb2RlIiwic3VibWl0QnV0dG9uRWxlbSIsImNpcmNsZTJCdXR0b25FbGVtIiwiaXNTdHVkeWNvbXBsZXRlZCIsInN0dWR5Q29tcGxldGVkIiwiU3R1ZHlBZ3JyZWVtZW50Iiwic3R1ZHlBZ3JyZWVkIiwieCIsInJlc3VsdCIsInkiLCJvZmZzZXRkaXN0IiwiYmJveCIsIm1pbiIsIm1heCIsInptIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZml0Qm91bmRzIiwibWF4Wm9vbSIsImdlb2NvZGVFbGVtIiwiYXBwZW5kQ2hpbGQiLCJvbkFkZCIsImRyYXdDaXJjbGVFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZURyYXdDaXJjbGVFbGVtZW50IiwiaGFuZGxlU3RlcE5hdkNsaWNrIiwidmFsTm9kZSIsInRhcmdldCIsImdldEF0dHJpYnV0ZU5vZGUiLCJzdGVwTmF2MUVsZW0iLCJzdGVwTmF2MkVsZW0iLCJzdGVwTmF2M0VsZW0iLCJoYW5kbGVTdWJtaXRCdXR0b25DbGljayIsImNpcmNsZSIsImxpbmUiLCJkaXN0YW5jZWttIiwiZGlzdGFuY2VmZWV0IiwiZGlyZWN0aW9uc09uZSIsIm1pbk9uZSIsIm1heE9uZSIsIm1lc3NhZ2VJbmRleE9uZSIsInN0ZXBEaXJlY3Rpb25zMSIsImlubmVySFRNTCIsImRpcmVjdGlvbnNUd28iLCJtaW5Ud28iLCJtYXhUd28iLCJtZXNzYWdlSW5kZXhUd28iLCJzdGVwRGlyZWN0aW9uczIiLCJhZ2dyZWVCdXR0b25FbGVtZW50IiwiZGlzc2FnZ3JlZUJ1dHRvbkVsZW1lbnQiLCJzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQiLCJkcmF3X2xpbmVfc3RyaW5nIiwiY3JlYXRlVmVydGV4IiwicGFyZW50SWQiLCJjb29yZGluYXRlcyIsInBhdGgiLCJzZWxlY3RlZCIsInByb3BlcnRpZXMiLCJtZXRhIiwicGFyZW50IiwiY29vcmRfcGF0aCIsImFjdGl2ZSIsImdlb21ldHJ5IiwiY3JlYXRlR2VvSlNPTkNpcmNsZSIsInJhZGl1c0luS20iLCJwb2ludHMiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImttIiwicmV0IiwiZGlzdGFuY2VYIiwiY29zIiwiUEkiLCJkaXN0YW5jZVkiLCJ0aGV0YSIsImkiLCJzaW4iLCJwdXNoIiwiZ2V0RGlzcGxheU1lYXN1cmVtZW50cyIsImZlYXR1cmUiLCJkcmF3bkxlbmd0aCIsIm1ldHJpY1VuaXRzIiwibWV0cmljRm9ybWF0IiwibWV0cmljTWVhc3VyZW1lbnQiLCJzdGFuZGFyZFVuaXRzIiwic3RhbmRhcmRGb3JtYXQiLCJzdGFuZGFyZE1lYXN1cmVtZW50IiwiZGlzcGxheU1lYXN1cmVtZW50cyIsIm1ldHJpYyIsImZvcm1hdCIsInN0YW5kYXJkIiwiZG91YmxlQ2xpY2tab29tIiwiZW5hYmxlIiwiY3R4Iiwic2V0VGltZW91dCIsIl9jdHgiLCJnZXRJbml0aWFsQ29uZmlnVmFsdWUiLCJvbktleVVwIiwic3RhdGUiLCJrZXlDb2RlIiwiZGVsZXRlRmVhdHVyZSIsInNpbGVudCIsIm9uVG91Y2hNb3ZlRHJhdyIsImN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiIsInJlbW92ZUNvb3JkaW5hdGUiLCJhZGRDb29yZGluYXRlIiwibG5nTGF0IiwibG5nIiwibGF0IiwidXBkYXRlQ29vcmRpbmF0ZSIsImRpcmVjdGlvbiIsImludGVyYWN0aXZlRHJhdyIsImV2ZW50VHlwZSIsInNlbGYiLCJmZWF0dXJlSWRzIiwidXBkYXRlVUlDbGFzc2VzIiwibW91c2UiLCJvblRvdWNoU3RhcnQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsImNsaWNrQW55d2hlcmUiLCJvblN0b3AiLCJhY3RpdmF0ZVVJQnV0dG9uIiwiZ2V0RmVhdHVyZSIsImlzVmFsaWQiLCJsaW5lR2VvSnNvbiIsInRvR2VvSlNPTiIsInN0YXJ0UG9pbnQiLCJkaXN0YW5jZSIsImNpcmNsZUdlb0pTT04iLCJmZWV0IiwiSlNPTiIsInN0cmluZ2lmeSIsInBvaW50V2l0aFJhZGl1cyIsInJhZGl1c01ldHJpYyIsInRvRml4ZWQiLCJyYWRpdXNGZWV0IiwiYWRkU291cmNlIiwiYWRkTGF5ZXIiLCJzb3VyY2UiLCJmaXJlIiwiZmVhdHVyZXMiLCJ0b0Rpc3BsYXlGZWF0dXJlcyIsImdlb2pzb24iLCJkaXNwbGF5IiwiaXNBY3RpdmVMaW5lIiwiY3VycmVudFZlcnRleCIsInJhZGl1c1N0YW5kYXJkIiwiY2lyY2xlRmVhdHVyZSIsIlNUQVRFX0tFWSIsInN0b3JhZ2VBdmFpbGFibGUiLCJzdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwiY2hlY2tTdGF0ZUV4aXN0cyIsImdldFN0YXRlIiwia2V5Iiwic3RvcmVPYmoiLCJuZXdTdGF0ZU9iaiIsInNldFN0YXRlIiwicGFyc2UiLCJnZXRJdGVtIiwiY2hlY2tJdGVtIiwic2V0SXRlbSIsIkJvb2xlYW4iLCJpdGVtIiwic3RhdGVTdHIiLCJnZXRTdGF0ZUFzU3RyaW5nIiwiaW5kZXhPZiIsInJlbW92ZUl0ZW0iLCJET01FeGNlcHRpb24iLCJjb2RlIiwibmFtZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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O0FBQ0FvSixnQkFBUVcsT0FBUixDQUFnQi9KLENBQWhCLEVBQW1CQSxDQUFuQjtBQUNBb0osZ0JBQVFpQixVQUFSLENBQW1CckssQ0FBbkI7QUFDQSxlQUFPLElBQVA7QUFDRCxPQU5ELENBTUUsT0FBT1osQ0FBUCxFQUFVO0FBQ1YsZUFBT0EsYUFBYWtMLFlBQWI7QUFDTDtBQUNBbEwsVUFBRW1MLElBQUYsS0FBVyxFQUFYO0FBQ0E7QUFDQW5MLFVBQUVtTCxJQUFGLEtBQVcsSUFGWDtBQUdBO0FBQ0E7QUFDQW5MLFVBQUVvTCxJQUFGLEtBQVcsb0JBTFg7QUFNQTtBQUNBcEwsVUFBRW9MLElBQUYsS0FBVyw0QkFUTjtBQVVMO0FBQ0FwQixnQkFBUS9LLE1BQVIsS0FBbUIsQ0FYckI7QUFZRDtBQUNGIiwiZmlsZSI6ImluZGV4LmFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjY3YzYxYmQyNjQ5MjllZWIwOWNkXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJpbmRleFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnN+aW5kZXhcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vTllDUGxhbm5pbmcvbGFicy1mYWN0ZmluZGVyL2Jsb2IvNGE2N2RhMjczYjZmZjg3NTg4ZjUwNDRhMTViMzQ5MGQ0YWMwN2EyNS9hcHAvbGF5ZXJzL2RyYXctc3R5bGVzLmpzXG5leHBvcnQgZGVmYXVsdCBbXG4gIC8vIEFDVElWRSAoYmVpbmcgZHJhd24pXG4gIC8vIGxpbmUgc3Ryb2tlXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctbGluZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ0xpbmVTdHJpbmcnXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAnbGluZS13aWR0aCc6IDRcbiAgICB9XG4gIH0sXG5cbiAgLy8gcG9seWdvbiBmaWxsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1maWxsJyxcbiAgICB0eXBlOiAnZmlsbCcsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnZmlsbC1jb2xvcic6ICcjRDIwQzBDJyxcbiAgICAgICdmaWxsLW91dGxpbmUtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgfVxuICB9LFxuXG4gIC8vIHBvbHlnb24gb3V0bGluZSBzdHJva2VcbiAgLy8gVGhpcyBkb2Vzbid0IHN0eWxlIHRoZSBmaXJzdCBlZGdlIG9mIHRoZSBwb2x5Z29uLCB3aGljaCB1c2VzIHRoZSBsaW5lIHN0cm9rZSBzdHlsaW5nIGluc3RlYWRcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLXN0cm9rZS1hY3RpdmUnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICdsaW5lLWRhc2hhcnJheSc6IFswLjIsIDJdLFxuICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgfVxuICB9LFxuICAvLyB2ZXJ0ZXggcG9pbnQgaGFsb3NcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWFuZC1saW5lLXZlcnRleC1oYWxvLWFjdGl2ZScsXG4gICAgdHlwZTogJ2NpcmNsZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnbWV0YScsICd2ZXJ0ZXgnXSwgWyc9PScsICckdHlwZScsICdQb2ludCddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnY2lyY2xlLXJhZGl1cyc6IDcsXG4gICAgICAnY2lyY2xlLWNvbG9yJzogJyNGRkYnXG4gICAgfVxuICB9LFxuICAvLyB2ZXJ0ZXggcG9pbnRzXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1hbmQtbGluZS12ZXJ0ZXgtYWN0aXZlJyxcbiAgICB0eXBlOiAnY2lyY2xlJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICdtZXRhJywgJ3ZlcnRleCddLCBbJz09JywgJyR0eXBlJywgJ1BvaW50J10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdjaXJjbGUtcmFkaXVzJzogNixcbiAgICAgICdjaXJjbGUtY29sb3InOiAnI0Q5NkIyNydcbiAgICB9XG4gIH0sXG5cbiAgLy8gcmFkaXVzIGxhYmVsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcmFkaXVzLWxhYmVsJyxcbiAgICB0eXBlOiAnc3ltYm9sJyxcbiAgICBmaWx0ZXI6IFsnPT0nLCAnbWV0YScsICdjdXJyZW50UG9zaXRpb24nXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICd0ZXh0LWZpZWxkJzogJ3tyYWRpdXNGZWV0fSBcXG4ge3JhZGl1c01pbGVzfScsXG4gICAgICAndGV4dC1hbmNob3InOiAnbGVmdCcsXG4gICAgICAndGV4dC1vZmZzZXQnOiBbXG4gICAgICAgIDEsXG4gICAgICAgIDBcbiAgICAgIF0sXG4gICAgICAndGV4dC1zaXplJzogMjJcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAndGV4dC1jb2xvcic6ICdyZ2JhKDAsIDAsIDAsIDEpJyxcbiAgICAgICd0ZXh0LWhhbG8tY29sb3InOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsXG4gICAgICAndGV4dC1oYWxvLXdpZHRoJzogMyxcbiAgICAgICdpY29uLW9wYWNpdHknOiB7XG4gICAgICAgIGJhc2U6IDEsXG4gICAgICAgIHN0b3BzOiBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgNy45OSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIDgsXG4gICAgICAgICAgICAwXG4gICAgICAgICAgXVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgJ3RleHQtaGFsby1ibHVyJzogMVxuICAgIH1cbiAgfSxcblxuICAvLyBJTkFDVElWRSAoc3RhdGljLCBhbHJlYWR5IGRyYXduKVxuICAvLyBsaW5lIHN0cm9rZVxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LWxpbmUtc3RhdGljJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnTGluZVN0cmluZyddLCBbJz09JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnIzAwMCcsXG4gICAgICAnbGluZS13aWR0aCc6IDNcbiAgICB9XG4gIH0sXG4gIC8vIHBvbHlnb24gZmlsbFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tZmlsbC1zdGF0aWMnLFxuICAgIHR5cGU6ICdmaWxsJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnPT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdmaWxsLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2ZpbGwtb3V0bGluZS1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICB9XG4gIH0sXG4gIC8vIHBvbHlnb24gb3V0bGluZVxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tc3Ryb2tlLXN0YXRpYycsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWyc9PScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2xpbmUtd2lkdGgnOiAzXG4gICAgfVxuICB9XG5dO1xuIiwiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgZGF0YXBpID0gJ2h0dHBzOi8vc2NyaXB0Lmdvb2dsZS5jb20vbWFjcm9zL3MvQUtmeWNieW4wMkZLdFZva1NfMkdabEd0VldSSEo3T2ZFSG43WUhIZ0dtZFdaTkU3TThNR21INC9leGVjJztcblxuZXhwb3J0IGNsYXNzIEdvb2dsZUFuYWx5dGljcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9vID0ge307XG4gIH1cblxuICBzZXRFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gICAgY29uc3QgdXVpZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpO1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgY29uc3QgZGF0YSA9IGxhYmVsO1xuXG4gICAgY29uc3QgZm9vT2JqID0gdGhpcy5mb287IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBndGFnKCdldmVudCcsIHV1aWQsIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGV2ZW50X2NhdGVnb3J5OiBjYXRlZ29yeSxcbiAgICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcbiAgICAgIHZhbHVlOiBgJHt2YWx1ZX1gLFxuICAgICAgdXVpZFxuICAgIH0pO1xuXG4gICAgLy8gc2luY2UgRkYgY291bGQgYmUgYmxvY2tpbmcgZ2Egd3JpdGluZyBkYXRhIGhlcmUgYXMgYmFja3VwXG4gICAgY29uc3QganNvbmRhdGEgPSB7XG4gICAgICB1dWlkLFxuICAgICAgY2F0ZWdvcnksXG4gICAgICBkYXRhLFxuICAgICAgZGF0ZVxuICAgIH07XG5cbiAgICBjb25zdCBkYXRhQVBJVVJMID0gbmV3IFVSTChkYXRhcGkpO1xuICAgIGRhdGFBUElVUkwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhqc29uZGF0YSk7XG4gICAgZmV0Y2goZGF0YUFQSVVSTCk7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMnO1xuaW1wb3J0IG1hcGJveGdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgTWFwYm94RHJhdyBmcm9tICdAbWFwYm94L21hcGJveC1nbC1kcmF3JztcbmltcG9ydCBNYXBib3hHZW9jb2RlciBmcm9tICdAbWFwYm94L21hcGJveC1nbC1nZW9jb2Rlcic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IFJhZGl1c01vZGUgZnJvbSAnLi9yYWRpdXNNb2RlJztcbmltcG9ydCBkcmF3U3R5bGVzIGZyb20gJy4vZHJhd3N0eWxlcyc7XG5pbXBvcnQgeyBHb29nbGVBbmFseXRpY3MgfSBmcm9tICcuL2dhJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgZ29vZ2xlQW5hbHl0aWNzID0gbmV3IEdvb2dsZUFuYWx5dGljcygpO1xuXG5cbi8vIEtpY2tzIG9mZiB0aGUgcHJvY2VzcyBvZiBmaW5kaW5nIDxpPiB0YWdzIGFuZCByZXBsYWNpbmcgd2l0aCA8c3ZnPlxuLy8gYWRkZXMgc3VwcG9ydCBmb3IgZm9udGF3ZXNvbWVcbmxpYnJhcnkuYWRkKGZhcywgZmFyKTtcbmRvbS53YXRjaCgpO1xuXG5jb25zdCB1cmxTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbmNvbnN0IHVybCA9IG5ldyBVUkwodXJsU3RyaW5nKTtcbmNvbnN0IHVzZXJUeXBlID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3VzZXJUeXBlJyk7XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3R1ZHkgc3RhcnRlZCcsICd0cnVlJyk7XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAndXNlclR5cGUnLCB1c2VyVHlwZSk7XG5cbm1hcGJveGdsLmFjY2Vzc1Rva2VuID0gJ3BrLmV5SjFJam9pWkdGMlpXbHpiU0lzSW1FaU9pSkNkalV4VDBGekluMC5WOW9Ja193VWM0dVp1N1VCYmxSOG13JztcblxuY29uc3QgbWFwID0gbmV3IG1hcGJveGdsLk1hcCh7XG4gIGNvbnRhaW5lcjogJ21hcCcsXG4gIHN0eWxlOiAnbWFwYm94Oi8vc3R5bGVzL21hcGJveC9zdHJlZXRzLXYxMScsXG4gIC8vICdtYXBib3g6Ly9zdHlsZXMvZGF2ZWlzbS9jandycmRmZDIwdWljMWRuenN0aTJvd2xrJywgLSBkYXJrXG4gIGNlbnRlcjogWy05OCwgMzguODhdLCAvLyBzdGFydGluZyBwb3NpdGlvbiBbbG5nLCBsYXRdXG4gIHpvb206IDMsIC8vIHN0YXJ0aW5nIHpvb21cbiAgc2hvd1pvb206IHRydWUsXG4gIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAga2V5YmluZGluZ3M6IHRydWVcbn0pO1xuXG5cbi8vIHNldHVwIG1hcFxuY29uc3QgZHJhd0NvbnRyb2wgPSBuZXcgTWFwYm94RHJhdyh7XG4gIGRpc3BsYXlDb250cm9sc0RlZmF1bHQ6IHRydWUsXG4gIGNvbnRyb2xzOiB7XG4gICAgcmVjdGFuZ2xlOiB0cnVlLFxuICAgIHBvbHlnb246IHRydWUsXG4gICAgbGluZV9zdHJpbmc6IHRydWUsXG4gICAgdHJhc2g6IHRydWVcbiAgfSxcbiAgb3B0aW9uczoge1xuICAgIHRvdWNoRW5hYmxlZDogdHJ1ZSxcbiAgICBrZXliaW5kaW5nczogdHJ1ZSxcbiAgICB0b3VjaEJ1ZmZlcjogMTBcbiAgfSxcbiAgc3R5bGVzOiBkcmF3U3R5bGVzLFxuICBtb2RlczogT2JqZWN0LmFzc2lnbih7XG4gICAgZHJhd19yYWRpdXM6IFJhZGl1c01vZGVcbiAgfSwgTWFwYm94RHJhdy5tb2Rlcylcbn0pO1xuXG5tYXAuYWRkQ29udHJvbChkcmF3Q29udHJvbCk7XG5cbmNvbnN0IG5hdiA9IG5ldyBtYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCgpO1xubWFwLmFkZENvbnRyb2wobmF2LCAndG9wLWxlZnQnKTtcblxuY29uc3QgZ2VvY29kZXIgPSBuZXcgTWFwYm94R2VvY29kZXIoe1xuICBhY2Nlc3NUb2tlbjogbWFwYm94Z2wuYWNjZXNzVG9rZW4sXG4gIG1hcGJveGdsLFxuICBzZXRab29tOiA4LFxuICBmbHlUbzogZmFsc2UsXG4gIHBsYWNlaG9sZGVyOiAnU2VhcmNoIGZvciBhIGxvY2F0aW9uLi4uJ1xufSk7XG5cbm1hcC5vbignem9vbWVuZCcsICgpID0+IHtcbiAgaWYgKG1hcC5nZXRab29tKCkgPiAxMCkge1xuICAgIGNvbnN0IGNpcmNsZUJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLWJ1dHRvbicpO1xuICAgIGlmIChjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ21hbnVhbCcgfSk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNwb3NlJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItdGl0bGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLWRpcmVjdGlvbnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIGZ1bmN0aW9uXG5mdW5jdGlvbiBoYW5kbGVBZ3JlZUNsaWNrKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWFncmVlbWVudC1hbGwnKS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWRpc3NhZ2dyZWUnKS5yZW1vdmUoKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCB0cnVlKTtcbiAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1hY3Rpb24taG9sZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaC04MCcpO1xuICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QuYWRkKCdoLTcwJyk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1hY3Rpb24taG9sZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgnc3RhcnQtaGVpZ2h0LWFjdGlvbnMnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1ob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGFydC1oZWlnaHQtbWFwJyk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1hY3Rpb24taG9sZGVyJykuY2xhc3NMaXN0LmFkZCgnc3RlcC1oZWlnaHQtYWN0aW9ucycpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWhvbGRlcicpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtaGVpZ2h0LW1hcCcpO1xuICBtYXAucmVzaXplKCk7XG4gIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzdHVkeS1hZ3JlZW1lbnQnLCB0cnVlKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURpc3NhZ3JlZUNsaWNrKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWRpc3NhZ2dyZWUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWFncmVlbWVudC1hbGwnKS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykucmVtb3ZlKCk7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50JywgZmFsc2UpO1xuICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3R1ZHktYWdyZWVtZW50JywgZmFsc2UpO1xuXG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBlbnN1cmUgdGhlIG9iamVjdCBvciB2YXJpYWJsZSBpcyB2YWxpZC4uLlxuLy8gQHBhcmFtIG9iaiAtIHR5cGVsZXNzXG5mdW5jdGlvbiBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICBpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc01vYmlsZURldmljZSgpIHtcbiAgbGV0IGNoZWNrID0gZmFsc2U7XG4gIChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSkgY2hlY2sgPSB0cnVlO30pKG5hdmlnYXRvci51c2VyQWdlbnR8fG5hdmlnYXRvci52ZW5kb3J8fHdpbmRvdy5vcGVyYSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgcmV0dXJuIGNoZWNrO1xufVxuXG5mdW5jdGlvbiB1dWlkKCkge1xuICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoNCkpLmpvaW4oJy0nKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhd0J1dHRvbkNsaWNrKGUpIHtcbiAgY29uc3QgY2lyY2xlQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uJyk7XG4gIGlmIChjaXJjbGVCdXR0b25FbGVtKSB7XG4gICAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbjInKS50b29sdGlwKHsgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyB9KTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ3Nob3cnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICB9XG4gIH1cblxuICBkcmF3Q29udHJvbC50cmFzaCgpO1xuXG4gIGlmIChtYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1saW5lJykpIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1saW5lJyk7XG4gIH1cblxuICBpZiAobWFwLmdldExheWVyKCdjaXJjbGUtZmlsbCcpKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtZmlsbCcpO1xuICB9XG4gIGlmIChtYXAuZ2V0U291cmNlKCdjaXJjbGUnKSkge1xuICAgIG1hcC5yZW1vdmVTb3VyY2UoJ2NpcmNsZScpO1xuICB9XG5cbiAgZHJhd0NvbnRyb2wuY2hhbmdlTW9kZSgnZHJhd19yYWRpdXMnKTtcblxuICBjb25zdCBzdWJtaXRCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1idXR0b24nKTtcbiAgaWYgKHN1Ym1pdEJ1dHRvbkVsZW0pIHtcbiAgICBzdWJtaXRCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgc3VibWl0QnV0dG9uRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgfVxuXG4gIGNvbnN0IGNpcmNsZTJCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1idXR0b24yJyk7XG4gIGlmIChjaXJjbGUyQnV0dG9uRWxlbSkge1xuICAgIGNpcmNsZTJCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBjb21wbGV0ZXRpb25cbmNvbnN0IGlzU3R1ZHljb21wbGV0ZWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5Y29tcGxldGVkJyk7XG5sZXQgc3R1ZHlDb21wbGV0ZWQgPSBmYWxzZTtcbmlmICh0eXBlb2YgaXNTdHVkeWNvbXBsZXRlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gIHN0dWR5Q29tcGxldGVkID0gaXNTdHVkeWNvbXBsZXRlZDtcbn0gZWxzZSB7XG4gIHN0dWR5Q29tcGxldGVkID0gZmFsc2U7XG59XG5cbi8vIGNoZWNrIHN0dWR5IHNlc3Npb24gc3RhdGUgZm9yIGNvbXBsZXRldGlvblxuY29uc3QgU3R1ZHlBZ3JyZWVtZW50ID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnKTtcbmxldCBzdHVkeUFncnJlZWQgPSBmYWxzZTtcbmlmICh0eXBlb2YgU3R1ZHlBZ3JyZWVtZW50ID09PSAnYm9vbGVhbicpIHtcbiAgc3R1ZHlBZ3JyZWVkID0gU3R1ZHlBZ3JyZWVtZW50O1xufSBlbHNlIHtcbiAgc3R1ZHlBZ3JyZWVkID0gZmFsc2U7XG59XG5cbi8vIGFscmVhZHkgYWdyZWVkXG5pZiAoc3R1ZHlBZ3JyZWVkKSB7XG4gIC8vIGhhbmRsZUFncmVlQ2xpY2soKTtcbn1cblxuLy8gaGlkZSBzdHVkeVxuaWYgKHN0dWR5Q29tcGxldGVkKSB7IC8vIHx8IHN0dWR5QWdycmVlZFxuICBoYW5kbGVBZ3JlZUNsaWNrKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1jb21wbGV0ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1ob2xkZXInKS5yZW1vdmUoKTtcbn0gZWxzZSB7XG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5Y29tcGxldGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgndXVpZCcsIHV1aWQoKSk7XG59XG5cbmdlb2NvZGVyLm9uKCdyZXN1bHQnLCAoZSkgPT4ge1xuICBjb25zdCB4ID0gZS5yZXN1bHQuY2VudGVyWzBdO1xuICBjb25zdCB5ID0gZS5yZXN1bHQuY2VudGVyWzFdO1xuXG4gIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzZWFyY2hwb2ludCcsIGAke3h9LCAke3l9YCk7XG5cbiAgY29uc3Qgb2Zmc2V0ZGlzdCA9IDAuMDAyNTtcbiAgY29uc3QgYmJveCA9IFtbeCAtIG9mZnNldGRpc3QsIHkgLSBvZmZzZXRkaXN0XSwgW3ggKyBvZmZzZXRkaXN0LCB5ICsgb2Zmc2V0ZGlzdF1dO1xuXG4gIC8vIGNyZWF0ZSByYW5kb20gem9vbSBpbmNhc2UgdXNlcnMgYXJlIGluZmx1ZW5jZWQgYnkgaW50aWFsIHpvb21sZXZlbFxuICBsZXQgbWluID0gMTA7XG4gIGxldCBtYXggPSAxNDtcbiAgaWYgKGlzTW9iaWxlRGV2aWNlKCkpIHtcbiAgICBtaW4gPSAxMDtcbiAgICBtYXggPSAxNTtcbiAgfVxuXG4gIGNvbnN0IHptID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgbWFwLmZpdEJvdW5kcyhiYm94LCB7IG1heFpvb206IHptIH0pO1xuXG4gIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzZWFyY2h6b29tJywgem0pO1xuXG5cbiAgY29uc3QgY2lyY2xlQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uJyk7XG4gIGlmIChjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgIGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItdGl0bGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi1kaXJlY3Rpb25zJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTEnKS5jbGFzc0xpc3QuYWRkKCdzdGVwLW5vdC12aXMnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0yJykuY2xhc3NMaXN0LnJlbW92ZSgnc3RlcC1ub3QtdmlzJyk7XG4gIH1cbn0pO1xuXG5jb25zdCBnZW9jb2RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW9jb2RlcicpO1xuaWYgKGdlb2NvZGVFbGVtKSB7XG4gIGdlb2NvZGVFbGVtLmFwcGVuZENoaWxkKGdlb2NvZGVyLm9uQWRkKG1hcCkpO1xufVxuXG5jb25zdCBkcmF3Q2lyY2xlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tZHJhdy1jaXJjbGUnKTtcbmlmIChkcmF3Q2lyY2xlRWxlbWVudCkge1xuICBkcmF3Q2lyY2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURyYXdCdXR0b25DbGljayk7XG59XG5cbmNvbnN0IHJlRHJhd0NpcmNsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJlZHJhdy1jaXJjbGUnKTtcbmlmIChyZURyYXdDaXJjbGVFbGVtZW50KSB7XG4gIHJlRHJhd0NpcmNsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEcmF3QnV0dG9uQ2xpY2spO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdGVwTmF2Q2xpY2soZSkge1xuICBjb25zdCB2YWxOb2RlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlTm9kZSgndmFsJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHZhbE5vZGUpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0xJykuY2xhc3NMaXN0LnJlbW92ZSgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0xJykuY2xhc3NMaXN0LmFkZCgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QuYWRkKCdzdGVwLW5vdC12aXMnKTtcbiAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZU5vZGUoJ3ZhbCcpLnZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dmFsdWV9YCkuY2xhc3NMaXN0LnJlbW92ZSgnc3RlcC1ub3QtdmlzJyk7XG4gIH1cbn1cblxuY29uc3Qgc3RlcE5hdjFFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtbmF2LTEnKTtcbmlmIChzdGVwTmF2MUVsZW0pIHtcbiAgc3RlcE5hdjFFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3RlcE5hdkNsaWNrKTtcbn1cblxuY29uc3Qgc3RlcE5hdjJFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtbmF2LTInKTtcbmlmIChzdGVwTmF2MkVsZW0pIHtcbiAgc3RlcE5hdjJFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3RlcE5hdkNsaWNrKTtcbn1cblxuY29uc3Qgc3RlcE5hdjNFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtbmF2LTMnKTtcbmlmIChzdGVwTmF2M0VsZW0pIHtcbiAgc3RlcE5hdjNFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3RlcE5hdkNsaWNrKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU3VibWl0QnV0dG9uQ2xpY2soZSkge1xuICBjb25zdCBzdWJtaXRCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1idXR0b24nKTtcbiAgaWYgKHN1Ym1pdEJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyB9KTtcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnRvb2x0aXAoJ3Nob3cnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICQoJyNzdWJtaXQtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdtYW51YWwnIH0pO1xuICAgICQoJyNzdWJtaXQtYnV0dG9uJykudG9vbHRpcCgnaGlkZScpO1xuICAgICQoJyNzdWJtaXQtYnV0dG9uJykudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICQoJyNzdWJtaXQtYnV0dG9uJykudG9vbHRpcCgnZGlzcG9zZScpO1xuXG4gICAgY29uc3QgY2lyY2xlID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdjaXJjbGUnKTtcbiAgICBjb25zdCBsaW5lID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdsaW5lJyk7XG4gICAgY29uc3QgZGlzdGFuY2VrbSA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZGlzdGFuY2VrbScpO1xuICAgIGNvbnN0IGRpc3RhbmNlZmVldCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnZGlzdGFuY2VmZWV0Jyk7XG5cbiAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdjaXJjbGUtc3VibWl0dGVkJywgY2lyY2xlKTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnbGluZS1zdWJtaXR0ZWQnLCBsaW5lKTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnZGlzdGFuY2VrbS1zdWJtaXR0ZWQnLCBkaXN0YW5jZWttKTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnZGlzdGFuY2VmZWV0LXN1Ym1pdHRlZCcsIGRpc3RhbmNlZmVldCk7XG5cbiAgICAvLyBlbmQgc3R1ZHlcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktY29tcGxldGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5Y29tcGxldGVkJywgdHJ1ZSk7XG5cbiAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzdHVkeWNvbXBsZXRlZCcsIHRydWUpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBzdWJtaXRCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1idXR0b24nKTtcbmlmIChzdWJtaXRCdXR0b25FbGVtKSB7XG4gIHN1Ym1pdEJ1dHRvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTdWJtaXRCdXR0b25DbGljayk7XG59XG5cbmNvbnN0IGRpcmVjdGlvbnNPbmUgPSBbXG4gICdTZWFyY2ggZm9yIGEgbG9jYXRpb24geW91IGNhcmUgYWJvdXQuJyxcbiAgJ1NlYXJjaCBmb3IgYSBsb2NhdGlvbiB0byBmaW5kIGFib3V0IGNyaW1lLicsXG4gICdTZWFyY2ggZm9yIGEgbG9jYXRpb24gdG8gZmluZCBhYm91dCBhIHBpenphIHBsYWNlLidcbl07XG5cbmNvbnN0IG1pbk9uZSA9IDA7XG5jb25zdCBtYXhPbmUgPSAyO1xuY29uc3QgbWVzc2FnZUluZGV4T25lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE9uZSAtIG1pbk9uZSArIDEpICsgbWluT25lKTtcbmNvbnN0IHN0ZXBEaXJlY3Rpb25zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMS1kaXJlY3Rpb25zJyk7XG5pZiAoc3RlcERpcmVjdGlvbnMxKSB7XG4gIHN0ZXBEaXJlY3Rpb25zMS5pbm5lckhUTUwgPSBkaXJlY3Rpb25zT25lW21lc3NhZ2VJbmRleE9uZV07XG59XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3RlcDF0ZXh0JywgZGlyZWN0aW9uc09uZVttZXNzYWdlSW5kZXhPbmVdKTtcblxuY29uc3QgZGlyZWN0aW9uc1R3byA9IFtcbiAgJ0RyYXcgYSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIDEgbWlsZSBmcm9tIHRoZSBsb2NhdGlvbi4nLFxuICAnRHJhdyBhIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgYSA1IG1pbnV0ZSA8c3Ryb25nPkRSSVZFPC9zdHJvbmc+LicsXG4gICdEcmF3IGEgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyBhIDUgbWludXRlIDxzdHJvbmc+V0FMSzwvc3Ryb25nPi4nXG5dO1xuXG5jb25zdCBtaW5Ud28gPSAwO1xuY29uc3QgbWF4VHdvID0gMjtcbmNvbnN0IG1lc3NhZ2VJbmRleFR3byA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhUd28gLSBtaW5Ud28gKyAxKSArIG1pblR3byk7XG5jb25zdCBzdGVwRGlyZWN0aW9uczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpO1xuaWYgKHN0ZXBEaXJlY3Rpb25zMikge1xuICBzdGVwRGlyZWN0aW9uczIuaW5uZXJIVE1MID0gZGlyZWN0aW9uc1R3b1ttZXNzYWdlSW5kZXhUd29dO1xufVxuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0ZXAydGV4dCcsIGRpcmVjdGlvbnNUd29bbWVzc2FnZUluZGV4VHdvXSk7XG5cbmNvbnN0IGFnZ3JlZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdncmVlLWJ1dHRvbicpO1xuaWYgKGFnZ3JlZUJ1dHRvbkVsZW1lbnQpIHtcbiAgYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUFncmVlQ2xpY2spO1xufVxuXG5jb25zdCBkaXNzYWdncmVlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFnZ3JlZS1idXR0b24nKTtcbmlmIChkaXNzYWdncmVlQnV0dG9uRWxlbWVudCkge1xuICBkaXNzYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURpc3NhZ3JlZUNsaWNrKTtcbn1cblxuY29uc3Qgc3RlcDJNaW5vckRpcmVjdGlvbnNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLW1pbm9yLWRpcmVjdGlvbnMnKTtcbmlmIChzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQpIHtcbiAgaWYgKGlzTW9iaWxlRGV2aWNlKCkpIHtcbiAgICBzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQuaW5uZXJIVE1MID0gJ0NsaWNrIG9uIHRoZSBtYXAsIHRoZW4gZHJhZyB5b3VyIGZpbmdlciBhY3Jvc3MgdGhlIG1hcCB1bnRpbCB0aGUgY2lyY2xlIGJlc3QgcmVwcmVzZW50cyB0aGUgZGlzdGFuY2UuJztcbiAgfVxufVxuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY2hyaXN3aG9uZy82OTQ3NzliYzFmMWU1ZDkyNmU0N2JhYjcyMDVmYTU1OVxuLy8gY3VzdG9tIG1hcGJvcHgtZ2wtZHJhdyBtb2RlIHRoYXQgbW9kaWZpZXMgZHJhd19saW5lX3N0cmluZ1xuLy8gc2hvd3MgYSBjZW50ZXIgcG9pbnQsIHJhZGl1cyBsaW5lLCBhbmQgY2lyY2xlIHBvbHlnb24gd2hpbGUgZHJhd2luZ1xuLy8gZm9yY2VzIGRyYXcuY3JlYXRlIG9uIGNyZWF0aW9uIG9mIHNlY29uZCB2ZXJ0ZXhcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWRyYXcnO1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XG5pbXBvcnQgbGluZURpc3RhbmNlIGZyb20gJ0B0dXJmL2xpbmUtZGlzdGFuY2UnO1xuaW1wb3J0IHsgR29vZ2xlQW5hbHl0aWNzIH0gZnJvbSAnLi9nYSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBSYWRpdXNNb2RlID0gTWFwYm94RHJhdy5tb2Rlcy5kcmF3X2xpbmVfc3RyaW5nO1xuY29uc3QgZ29vZ2xlQW5hbHl0aWNzID0gbmV3IEdvb2dsZUFuYWx5dGljcygpO1xuXG4vLyBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2lzVG91Y2hNb3ZlJywgdHJ1ZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVZlcnRleChwYXJlbnRJZCwgY29vcmRpbmF0ZXMsIHBhdGgsIHNlbGVjdGVkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG1ldGE6ICd2ZXJ0ZXgnLFxuICAgICAgcGFyZW50OiBwYXJlbnRJZCxcbiAgICAgIGNvb3JkX3BhdGg6IHBhdGgsXG4gICAgICBhY3RpdmU6IChzZWxlY3RlZCkgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgfSxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzXG4gICAgfVxuICB9O1xufVxuXG4vLyBjcmVhdGUgYSBjaXJjbGUtbGlrZSBwb2x5Z29uIGdpdmVuIGEgY2VudGVyIHBvaW50IGFuZCByYWRpdXNcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTk5NTYxL2RyYXdpbmctYS1jaXJjbGUtd2l0aC10aGUtcmFkaXVzLWluLW1pbGVzLW1ldGVycy13aXRoLW1hcGJveC1nbC1qcy8zOTAwNjM4OCMzOTAwNjM4OFxuZnVuY3Rpb24gY3JlYXRlR2VvSlNPTkNpcmNsZShjZW50ZXIsIHJhZGl1c0luS20sIHBhcmVudElkLCBwb2ludHMgPSA2NCkge1xuICBjb25zdCBjb29yZHMgPSB7XG4gICAgbGF0aXR1ZGU6IGNlbnRlclsxXSxcbiAgICBsb25naXR1ZGU6IGNlbnRlclswXVxuICB9O1xuXG4gIGNvbnN0IGttID0gcmFkaXVzSW5LbTtcblxuICBjb25zdCByZXQgPSBbXTtcbiAgY29uc3QgZGlzdGFuY2VYID0ga20gLyAoMTExLjMyMCAqIE1hdGguY29zKChjb29yZHMubGF0aXR1ZGUgKiBNYXRoLlBJKSAvIDE4MCkpO1xuICBjb25zdCBkaXN0YW5jZVkgPSBrbSAvIDExMC41NzQ7XG5cbiAgbGV0IHRoZXRhO1xuICBsZXQgeDtcbiAgbGV0IHk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzOyBpICs9IDEpIHtcbiAgICB0aGV0YSA9IChpIC8gcG9pbnRzKSAqICgyICogTWF0aC5QSSk7XG4gICAgeCA9IGRpc3RhbmNlWCAqIE1hdGguY29zKHRoZXRhKTtcbiAgICB5ID0gZGlzdGFuY2VZICogTWF0aC5zaW4odGhldGEpO1xuXG4gICAgcmV0LnB1c2goW2Nvb3Jkcy5sb25naXR1ZGUgKyB4LCBjb29yZHMubGF0aXR1ZGUgKyB5XSk7XG4gIH1cbiAgcmV0LnB1c2gocmV0WzBdKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IFtyZXRdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBwYXJlbnQ6IHBhcmVudElkLFxuICAgICAgYWN0aXZlOiAndHJ1ZSdcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlNZWFzdXJlbWVudHMoZmVhdHVyZSkge1xuICAvLyBzaG91bGQgbG9nIGJvdGggbWV0cmljIGFuZCBzdGFuZGFyZCBkaXNwbGF5IHN0cmluZ3MgZm9yIHRoZSBjdXJyZW50IGRyYXduIGZlYXR1cmVcbiAgLy8gbWV0cmljIGNhbGN1bGF0aW9uXG4gIGNvbnN0IGRyYXduTGVuZ3RoID0gKGxpbmVEaXN0YW5jZShmZWF0dXJlKSAqIDEwMDApOyAvLyBtZXRlcnNcblxuICBsZXQgbWV0cmljVW5pdHMgPSAnbSc7XG4gIGxldCBtZXRyaWNGb3JtYXQgPSAnMCwwJztcbiAgbGV0IG1ldHJpY01lYXN1cmVtZW50O1xuXG4gIGxldCBzdGFuZGFyZFVuaXRzID0gJ2ZlZXQnO1xuICBsZXQgc3RhbmRhcmRGb3JtYXQgPSAnMCwwJztcbiAgbGV0IHN0YW5kYXJkTWVhc3VyZW1lbnQ7XG5cbiAgbWV0cmljTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aDtcbiAgaWYgKGRyYXduTGVuZ3RoID49IDEwMDApIHsgLy8gaWYgb3ZlciAxMDAwIG1ldGVycywgdXBncmFkZSBtZXRyaWNcbiAgICBtZXRyaWNNZWFzdXJlbWVudCA9IGRyYXduTGVuZ3RoIC8gMTAwMDtcbiAgICBtZXRyaWNVbml0cyA9ICdrbSc7XG4gICAgbWV0cmljRm9ybWF0ID0gJzAuMDAnO1xuICB9XG5cbiAgc3RhbmRhcmRNZWFzdXJlbWVudCA9IGRyYXduTGVuZ3RoICogMy4yODA4NDtcbiAgaWYgKHN0YW5kYXJkTWVhc3VyZW1lbnQgPj0gNTI4MCkgeyAvLyBpZiBvdmVyIDUyODAgZmVldCwgdXBncmFkZSBzdGFuZGFyZFxuICAgIHN0YW5kYXJkTWVhc3VyZW1lbnQgLz0gNTI4MDtcbiAgICBzdGFuZGFyZFVuaXRzID0gJ21pJztcbiAgICBzdGFuZGFyZEZvcm1hdCA9ICcwLjAwJztcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlNZWFzdXJlbWVudHMgPSB7XG4gICAgbWV0cmljOiBgJHtudW1lcmFsKG1ldHJpY01lYXN1cmVtZW50KS5mb3JtYXQobWV0cmljRm9ybWF0KX0gJHttZXRyaWNVbml0c31gLFxuICAgIHN0YW5kYXJkOiBgJHtudW1lcmFsKHN0YW5kYXJkTWVhc3VyZW1lbnQpLmZvcm1hdChzdGFuZGFyZEZvcm1hdCl9ICR7c3RhbmRhcmRVbml0c31gXG4gIH07XG5cbiAgcmV0dXJuIGRpc3BsYXlNZWFzdXJlbWVudHM7XG59XG5cbmNvbnN0IGRvdWJsZUNsaWNrWm9vbSA9IHtcbiAgZW5hYmxlOiAoY3R4KSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBGaXJzdCBjaGVjayB3ZSd2ZSBnb3QgYSBtYXAgYW5kIHNvbWUgY29udGV4dC5cbiAgICAgIGlmICghY3R4Lm1hcCB8fCAhY3R4Lm1hcC5kb3VibGVDbGlja1pvb20gfHwgIWN0eC5fY3R4IHx8XG4gICAgICAgICAhY3R4Ll9jdHguc3RvcmUgfHwgIWN0eC5fY3R4LnN0b3JlLmdldEluaXRpYWxDb25maWdWYWx1ZSkgcmV0dXJuO1xuICAgICAgLy8gTm93IGNoZWNrIGluaXRpYWwgc3RhdGUgd2Fzbid0IGZhbHNlICh3ZSBsZWF2ZSBpdCBkaXNhYmxlZCBpZiBzbylcbiAgICAgIGlmICghY3R4Ll9jdHguc3RvcmUuZ2V0SW5pdGlhbENvbmZpZ1ZhbHVlKCdkb3VibGVDbGlja1pvb20nKSkgcmV0dXJuO1xuICAgICAgY3R4Lm1hcC5kb3VibGVDbGlja1pvb20uZW5hYmxlKCk7XG4gICAgfSwgMCk7XG4gIH1cbn07XG5cblxuLy8gV2hlbmV2ZXIgYSB1c2VyIGNsaWNrcyBvbiBhIGtleSB3aGlsZSBmb2N1c2VkIG9uIHRoZSBtYXAsIGl0IHdpbGwgYmUgc2VudCBoZXJlXG5SYWRpdXNNb2RlLm9uS2V5VXAgPSBmdW5jdGlvbiBvbktleVVwKHN0YXRlLCBlKSB7XG4gIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgdGhpcy5kZWxldGVGZWF0dXJlKFtzdGF0ZS5saW5lLmlkXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgdGhpcy5jaGFuZ2VNb2RlKCdzaW1wbGVfc2VsZWN0Jywge30sIHsgc2lsZW50OiB0cnVlIH0pO1xuICB9XG59O1xuXG4vLyBmb3IgbW9iaWxlIHRvdWNoIG1vdmUgaW4gbW9iaWxlIHRoZXJlIGlzIG5vIGNsaWNrXG4vLyBzaW5jZSBpdCB3b3VsZCBwcm92aWRlIG5vIGZlZWRiYWNrIHRvIHVzZXJcbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlRHJhdyhzdGF0ZSwgZSkge1xuICBpZiAoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uID09PSAxKSB7XG4gICAgc3RhdGUubGluZS5yZW1vdmVDb29yZGluYXRlKCcyJyk7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDIsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgaWYgKHN0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKSB7XG4gICAgc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uICs9IDE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gZm9yIGRlc2t0b3AgY2xpY2tzXG5mdW5jdGlvbiBpbnRlcmFjdGl2ZURyYXcoc3RhdGUsIGUsIGV2ZW50VHlwZSwgc2VsZikge1xuICBpZiAoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uID09PSAxKSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgICByZXR1cm4gc2VsZi5jaGFuZ2VNb2RlKCdzaW1wbGVfc2VsZWN0JywgeyBmZWF0dXJlSWRzOiBbc3RhdGUubGluZS5pZF0gfSk7XG4gIH1cblxuICBzZWxmLnVwZGF0ZVVJQ2xhc3Nlcyh7IG1vdXNlOiAnYWRkJyB9KTtcblxuICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIGlmIChzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xuICAgIHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiArPSAxOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3RhdGUubGluZS51cGRhdGVDb29yZGluYXRlKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmxpbmUuYWRkQ29vcmRpbmF0ZSgwLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuUmFkaXVzTW9kZS5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbiBvblRvdWNoU3RhcnQoc3RhdGUsIGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cblJhZGl1c01vZGUub25Ub3VjaE1vdmUgPSBmdW5jdGlvbiBvblRvdWNoTW92ZShzdGF0ZSwgZSkge1xuICAvLyBjb25zb2xlLmxvZygnb25Ub3VjaE1vdmUnKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBvblRvdWNoTW92ZURyYXcoc3RhdGUsIGUpO1xufTtcblxuUmFkaXVzTW9kZS5vblRvdWNoRW5kID0gZnVuY3Rpb24gb25Ub3VjaEVuZChzdGF0ZSwgZSkge1xuICAvLyBjb25zb2xlLmxvZygnb25Ub3VjaEVuZCcpXG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcmV0dXJuIGludGVyYWN0aXZlRHJhdyhzdGF0ZSwgZSwgJ29uVG91Y2hFbmQnLCB0aGlzKTtcbn07XG5cblJhZGl1c01vZGUuY2xpY2tBbnl3aGVyZSA9IGZ1bmN0aW9uIGNsaWNrQW55d2hlcmUoc3RhdGUsIGUpIHtcbiAgLy8gY29uc29sZS5sb2coJ2NsaWNrQW55d2hlcmUnKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBpbnRlcmFjdGl2ZURyYXcoc3RhdGUsIGUsICdtb3VzZScsIHRoaXMpO1xufTtcblxuLy8gY3JlYXRlcyB0aGUgZmluYWwgZ2VvanNvbiBwb2ludCBmZWF0dXJlIHdpdGggYSByYWRpdXMgcHJvcGVydHlcbi8vIHRyaWdnZXJzIGRyYXcuY3JlYXRlXG5SYWRpdXNNb2RlLm9uU3RvcCA9IGZ1bmN0aW9uIG9uU3RvcChzdGF0ZSkge1xuICBkb3VibGVDbGlja1pvb20uZW5hYmxlKHRoaXMpO1xuICAvLyBjb25zb2xlLmxvZygnb25TdG9wJylcbiAgdGhpcy5hY3RpdmF0ZVVJQnV0dG9uKCk7XG5cbiAgLy8gY2hlY2sgdG8gc2VlIGlmIHdlJ3ZlIGRlbGV0ZWQgdGhpcyBmZWF0dXJlXG4gIGlmICh0aGlzLmdldEZlYXR1cmUoc3RhdGUubGluZS5pZCkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gIC8vIHJlbW92ZSBsYXN0IGFkZGVkIGNvb3JkaW5hdGVcbiAgc3RhdGUubGluZS5yZW1vdmVDb29yZGluYXRlKCcwJyk7XG4gIGlmIChzdGF0ZS5saW5lLmlzVmFsaWQoKSkge1xuICAgIGNvbnN0IGxpbmVHZW9Kc29uID0gc3RhdGUubGluZS50b0dlb0pTT04oKTtcbiAgICBjb25zdCBzdGFydFBvaW50ID0gbGluZUdlb0pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF07XG4gICAgY29uc3QgZGlzdGFuY2UgPSBsaW5lRGlzdGFuY2UobGluZUdlb0pzb24pO1xuXG4gICAgY29uc3QgY2lyY2xlR2VvSlNPTiA9IGNyZWF0ZUdlb0pTT05DaXJjbGUoc3RhcnRQb2ludCwgZGlzdGFuY2UsIG51bGwsIDMyKTtcbiAgICBjb25zdCBmZWV0ID0gKGRpc3RhbmNlICogMTAwMCkgKiAzLjI4MDg0O1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnY2lyY2xlJywgSlNPTi5zdHJpbmdpZnkoY2lyY2xlR2VvSlNPTikpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnbGluZScsIEpTT04uc3RyaW5naWZ5KGxpbmVHZW9Kc29uKSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdkaXN0YW5jZWttJywgZGlzdGFuY2UpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnZGlzdGFuY2VmZWV0JywgZmVldCk7XG5cbiAgICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdjaXJjbGUtcHJlc3VibWl0JywgSlNPTi5zdHJpbmdpZnkoY2lyY2xlR2VvSlNPTikpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdsaW5lLXByZXN1Ym1pdCcsIEpTT04uc3RyaW5naWZ5KGxpbmVHZW9Kc29uKSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNla20tcHJlc3VibWl0JywgZmVldCk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNlZmVldC1wcmVzdWJtaXQnLCBmZWV0KTtcblxuICAgIC8vIHJlY29uZmlndXJlIHRoZSBnZW9qc29uIGxpbmUgaW50byBhIGdlb2pzb24gcG9pbnQgd2l0aCBhIHJhZGl1cyBwcm9wZXJ0eVxuICAgIGNvbnN0IHBvaW50V2l0aFJhZGl1cyA9IHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNpcmNsZUdlb0pTT04uZ2VvbWV0cnkuY29vcmRpbmF0ZXNcbiAgICAgIH0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJhZGl1c01ldHJpYzogKGxpbmVEaXN0YW5jZShsaW5lR2VvSnNvbikpLnRvRml4ZWQoMSksXG4gICAgICAgIHJhZGl1c0ZlZXQ6IGZlZXRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMubWFwLmdldExheWVyKCdjaXJjbGUtbGluZScpKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcignY2lyY2xlLWxpbmUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1maWxsJykpIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtZmlsbCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXAuZ2V0U291cmNlKCdjaXJjbGUnKSkge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlU291cmNlKCdjaXJjbGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcC5hZGRTb3VyY2UoJ2NpcmNsZScsIHtcbiAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgIGRhdGE6IHBvaW50V2l0aFJhZGl1c1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIoe1xuICAgICAgaWQ6ICdjaXJjbGUtZmlsbCcsXG4gICAgICB0eXBlOiAnZmlsbCcsXG4gICAgICBzb3VyY2U6ICdjaXJjbGUnLFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2ZpbGwtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAgICdmaWxsLW91dGxpbmUtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmFkZExheWVyKHtcbiAgICAgIGlkOiAnY2lyY2xlLWxpbmUnLFxuICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgc291cmNlOiAnY2lyY2xlJyxcbiAgICAgIGxheW91dDoge1xuICAgICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgICAgfSxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgICAnbGluZS1kYXNoYXJyYXknOiBbMC4yLCAyXSxcbiAgICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcC5maXJlKCdkcmF3LmNyZWF0ZScsIHtcbiAgICAgIGZlYXR1cmVzOiBbcG9pbnRXaXRoUmFkaXVzXVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGVsZXRlRmVhdHVyZShbc3RhdGUubGluZS5pZF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgIHRoaXMuY2hhbmdlTW9kZSgnc2ltcGxlX3NlbGVjdCcsIHt9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuUmFkaXVzTW9kZS50b0Rpc3BsYXlGZWF0dXJlcyA9IGZ1bmN0aW9uIHRvRGlzcGxheUZlYXR1cmVzKHN0YXRlLCBnZW9qc29uLCBkaXNwbGF5KSB7XG4gIGNvbnN0IGlzQWN0aXZlTGluZSA9IGdlb2pzb24ucHJvcGVydGllcy5pZCA9PT0gc3RhdGUubGluZS5pZDtcblxuICBnZW9qc29uLnByb3BlcnRpZXMuYWN0aXZlID0gKGlzQWN0aXZlTGluZSkgPyAndHJ1ZScgOiAnZmFsc2UnOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAoIWlzQWN0aXZlTGluZSkgcmV0dXJuIGRpc3BsYXkoZ2VvanNvbik7XG5cbiAgLy8gT25seSByZW5kZXIgdGhlIGxpbmUgaWYgaXQgaGFzIGF0IGxlYXN0IG9uZSByZWFsIGNvb3JkaW5hdGVcbiAgaWYgKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoIDwgMikgcmV0dXJuIG51bGw7XG4gIGdlb2pzb24ucHJvcGVydGllcy5tZXRhID0gJ2ZlYXR1cmUnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgLy8gZGlzcGxheXMgY2VudGVyIHZlcnRleCBhcyBhIHBvaW50IGZlYXR1cmVcbiAgZGlzcGxheShjcmVhdGVWZXJ0ZXgoXG4gICAgc3RhdGUubGluZS5pZCxcbiAgICBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzW3N0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggLSAyIDogMV0sXG4gICAgYCR7c3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCAtIDIgOiAxfWAsXG4gICAgZmFsc2UsXG4gICkpO1xuXG4gIC8vIGRpc3BsYXlzIHRoZSBsaW5lIGFzIGl0IGlzIGRyYXduXG4gIGRpc3BsYXkoZ2VvanNvbik7XG5cbiAgY29uc3QgZGlzcGxheU1lYXN1cmVtZW50cyA9IGdldERpc3BsYXlNZWFzdXJlbWVudHMoZ2VvanNvbik7XG5cbiAgLy8gY3JlYXRlIGN1c3RvbSBmZWF0dXJlIGZvciB0aGUgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uXG4gIGNvbnN0IGN1cnJlbnRWZXJ0ZXggPSB7XG4gICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG1ldGE6ICdjdXJyZW50UG9zaXRpb24nLFxuICAgICAgYWN0aXZlOiAndHJ1ZScsXG4gICAgICByYWRpdXNNZXRyaWM6IGRpc3BsYXlNZWFzdXJlbWVudHMubWV0cmljLFxuICAgICAgcmFkaXVzU3RhbmRhcmQ6IGRpc3BsYXlNZWFzdXJlbWVudHMuc3RhbmRhcmQsXG4gICAgICBwYXJlbnQ6IHN0YXRlLmxpbmUuaWRcbiAgICB9LFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXM6IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV1cbiAgICB9XG4gIH07XG4gIGRpc3BsYXkoY3VycmVudFZlcnRleCk7XG5cbiAgLy8gY3JlYXRlIGN1c3RvbSBmZWF0dXJlIGZvciByYWRpdXMgY2lyY2xlbWFya2VyXG4gIGNvbnN0IGNlbnRlciA9IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF07XG4gIGNvbnN0IHJhZGl1c0luS20gPSBsaW5lRGlzdGFuY2UoZ2VvanNvbiwgJ2tpbG9tZXRlcnMnKTtcbiAgY29uc3QgY2lyY2xlRmVhdHVyZSA9IGNyZWF0ZUdlb0pTT05DaXJjbGUoY2VudGVyLCByYWRpdXNJbkttLCBzdGF0ZS5saW5lLmlkKTtcbiAgY2lyY2xlRmVhdHVyZS5wcm9wZXJ0aWVzLm1ldGEgPSAncmFkaXVzJztcblxuICBkaXNwbGF5KGNpcmNsZUZlYXR1cmUpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhZGl1c01vZGU7XG4iLCIvLyBpbXBvcnQgeyBTdG9yYWdlQVBJIH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2VBUEknO1xuXG4vKipcbiogVGhpcyBjb21wb25lbnQgaXMgaW50ZW5kZWQgdG8gaGFuZGxlIHRoZSBzdG9yYWdlIGFuZCByZXRyaWV2YWwgb2YgdGhlIHN0YXRlIG9mXG4qIEFzIG9mIHRoaXMgd3JpdGluZyBpdCBpcyB1c2luZyBsb2NhbFN0b3JhZ2UgdG8gZG8gdGhpcy5cbiogVXNlcyBzaW1wbGUgY2xhc3MgaW5zdGFuY2UgbWV0aG9kcyB3aXRoIHRoZSBzaG9ydC1oYW5kIG1ldGhvZCBkZWNsYXJhdGlvblxuKiBwYXR0ZXJuLlxuKlxuKiBUbyBub3RlOiBUaGVyZSBpcyBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgU3RvcmUgYW5kIHRoZSBTdGF0ZS4gQXMgb2YgMGEzMTA2ZVxuKiB0aGUgU3RvcmUgaXMgYSBTdHJpbmcgc2F2ZWQgdG8gdGhlIGJyb3dzZXJzIGxvY2FsU3RvcmFnZSBhbmQgaXMgYSBzZXJpYWxpemVkXG4qIHZlcnNpb24gb2YgdGhlIFN0YXRlLiBUaGUgU3RhdGUgaXMgYW4gT2JqZWN0IHdoaWNoIGlzIGludGVyYWN0ZWQgd2l0aCBieVxuKiBwYXJzaW5nIHRoZSBTdGF0ZSBzdHJpbmcgZnJvbSB0aGUgU3RvcmUsIG1vZGlmeWluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcGFyc2UsXG4qIGFuZCByZS1zZXJpYWxpemluZyBpdCBiYWNrIHRvIHRoZSBTdG9yZS5cbiovXG5jb25zdCBTVEFURV9LRVkgPSAnc3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAvLyAuLmFuZCBhbiAob3B0aW9uYWwpIGN1c3RvbSBjbGFzcyBjb25zdHJ1Y3Rvci4gSWYgb25lIGlzXG4gIC8vIG5vdCBzdXBwbGllZCwgYSBkZWZhdWx0IGNvbnN0cnVjdG9yIGlzIHVzZWQgaW5zdGVhZDpcbiAgLy8gY29uc3RydWN0b3IoKSB7IH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIC8vIHRoaXMuc3RvcmUgPSBuZXcgU3RvcmFnZUFQSSgpO1xuICAgIGlmIChTdG9yZS5zdG9yYWdlQXZhaWxhYmxlKCkpIHtcbiAgICAgIHRoaXMuc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0geyBTVEFURV9LRVkgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXRzIGEga2V5L3ZhbHVlIHBhaXIgdG8gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGVJdGVtKGtleSA9ICcnLCB2YWx1ZSA9ICcnKSB7XG4gICAgY29uc3Qgc3RvcmVPYmogPSB7IFtrZXldOiB2YWx1ZSB9O1xuICAgIGNvbnN0IG5ld1N0YXRlT2JqID0geyAuLi50aGlzLmdldFN0YXRlKCksIC4uLnN0b3JlT2JqIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZU9iaik7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBlbnRpcmUgc3RhdGUgb2JqZWN0XG4gIC8vXG4gIC8vIEByZXR1cm4gb2JqZWN0XG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSA/IEpTT04ucGFyc2UodGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpIDoge307XG4gIH1cblxuICAvLyBHZXRzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldEl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIEdcbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0l0ZW0oa2V5KSA/IHRoaXMuZ2V0U3RhdGUoKVtrZXldIDoge307XG4gICAgLy8gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8vIFNldHMgYSBuZXcgc3RhdGUgb2JqZWN0IHN0YXRlXG4gIC8vXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZSh2YWx1ZSA9IHt9KSB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oU1RBVEVfS0VZLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG5cblxuICAvLyBDaGVja3MgaWYgdGhlIHN0YXRlIGV4aXN0cyBpbiB0aGUgc3RvcmFnZSBwcm92aWRlclxuICBjaGVja1N0YXRlRXhpc3RzKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKTtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIHN0YXRlIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgLy9cbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVBc1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJdGVtKFNUQVRFX0tFWSk7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbiBpdGVtIGhhcyBiZWVuIHNhdmVkIHRvIHRoZSBzdG9yZVxuICAvLyB1bnVzZWQgYXMgb2YgMGEzMTA2ZVxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgaXNTdGF0ZUl0ZW1FeGlzdChpdGVtKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpKSB7XG4gICAgICBjb25zdCBzdGF0ZVN0ciA9IHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpO1xuICAgICAgaWYgKHN0YXRlU3RyLmluZGV4T2YoaXRlbSkgPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgY2hlY2tJdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgJiYgdGhpcy5nZXRTdGF0ZUFzU3RyaW5nKCkuaW5kZXhPZihpdGVtKSA+IDA7XG4gIH1cblxuICAvLyBDaGVjayBpZiBsb2NhbFN0b3JhZ2UgYXZhaWxhYmxlLlxuICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfU3RvcmFnZV9BUEkvVXNpbmdfdGhlX1dlYl9TdG9yYWdlX0FQSVxuICAvL1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgc3RhdGljIHN0b3JhZ2VBdmFpbGFibGUoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdsb2NhbFN0b3JhZ2UnO1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgY29uc3QgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==