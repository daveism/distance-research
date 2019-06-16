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
/******/ 	var hotCurrentHash = "d8aba02a196b945ea3df";
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

store.setStateItem('isTouchMove', true);

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

function interactiveDraw(state, e, userSource, self) {
  // console.log( 'interactiveDraw',userSource)

  // this ends the drawing after the user creates a second point, triggering this.onStop
  if (state.currentVertexPosition === 1) {
    var coordnum = 0;
    // for reasons I am to lazy to figure out when a toch event is fired
    // you need an extra click or simulate an extra click to finish the circle.
    if (userSource === 'tap') {
      coordnum = 2;
    }

    // make sure touch drag draws cricle too
    if (userSource === 'touchMove' || userSource === 'tapstart') {
      state.line.removeCoordinate('2');
      state.line.addCoordinate(2, e.lngLat.lng, e.lngLat.lat);
      return null;
    }
    state.line.addCoordinate(coordnum, e.lngLat.lng, e.lngLat.lat);
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
  console.log('onTouchStart');
  e.preventDefault();
  if (state.didTouchStart) {
    state.didTouchStart = true; // eslint-disable-line
    return interactiveDraw(state, e, 'tapstart', this);
  }
  return null;
};

RadiusMode.onTap = function onTap(state, e) {
  console.log('onTap');
  if (!state.didTouchStart) {
    return interactiveDraw(state, e, 'tap', this);
  }
  return null;
};

RadiusMode.onTouchMove = function onTouchMove(state, e) {
  console.log('onTouchMove');
  var d = new Date();
  var n = d.getTime();
  var lastTouchMove = state.lastTouchMove;
  var differenceTravel = n - lastTouchMove;
  var seconds = Math.floor(differenceTravel); // / (1000)
  console.log('seconds', seconds);
  state.lastTouchMove = n;

  console.log(n);

  e.preventDefault();
  if (seconds > 200) {
    return interactiveDraw(state, e, 'touchMove', this);
  }
};

RadiusMode.onTouchEnd = function onTouchEnd(state, e) {
  console.log('onTouchEnd');
  e.preventDefault();
  return interactiveDraw(state, e, 'onTouchEnd', this);
};

RadiusMode.clickAnywhere = function clickAnywhere(state, e, userType) {
  return interactiveDraw(state, e, 'mouse', this);
};

// creates the final geojson point feature with a radius property
// triggers draw.create
RadiusMode.onStop = function onStop(state) {
  doubleClickZoom.enable(this);
  console.log('onStop');
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

    // ga event action, category, label
    googleAnalytics.setEvent('data', 'circle', JSON.stringify(circleGeoJSON));
    console.log(JSON.stringify(circleGeoJSON));
    var feet = distance * 1000 * 3.28084;
    googleAnalytics.setEvent('data', 'distance', feet);

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
    // store.setStateItem('studycompleted', true);
    // document.getElementById('study-complete').classList.remove('d-none');
    // document.getElementById('study-progress').remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZHJhd3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yYWRpdXNNb2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0b3JlLmpzIl0sIm5hbWVzIjpbImlkIiwidHlwZSIsImZpbHRlciIsImxheW91dCIsInBhaW50IiwiYmFzZSIsInN0b3BzIiwic3RvcmUiLCJTdG9yZSIsIkdvb2dsZUFuYWx5dGljcyIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJ2YWx1ZSIsImZvb09iaiIsImd0YWciLCJnZXRTdGF0ZUl0ZW0iLCJldmVudF9jYXRlZ29yeSIsImV2ZW50X2xhYmVsIiwidXVpZCIsImdvb2dsZUFuYWx5dGljcyIsImxpYnJhcnkiLCJhZGQiLCJmYXMiLCJmYXIiLCJkb20iLCJ3YXRjaCIsInVybFN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInVybCIsIlVSTCIsInVzZXJUeXBlIiwic2VhcmNoUGFyYW1zIiwiZ2V0Iiwic2V0RXZlbnQiLCJtYXBib3hnbCIsImFjY2Vzc1Rva2VuIiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJjZW50ZXIiLCJ6b29tIiwic2hvd1pvb20iLCJ0b3VjaEVuYWJsZWQiLCJrZXliaW5kaW5ncyIsImRyYXdDb250cm9sIiwiTWFwYm94RHJhdyIsImRpc3BsYXlDb250cm9sc0RlZmF1bHQiLCJjb250cm9scyIsInJlY3RhbmdsZSIsInBvbHlnb24iLCJsaW5lX3N0cmluZyIsInRyYXNoIiwib3B0aW9ucyIsInRvdWNoQnVmZmVyIiwic3R5bGVzIiwiZHJhd1N0eWxlcyIsIm1vZGVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZHJhd19yYWRpdXMiLCJSYWRpdXNNb2RlIiwiYWRkQ29udHJvbCIsIm5hdiIsIk5hdmlnYXRpb25Db250cm9sIiwiZ2VvY29kZXIiLCJNYXBib3hHZW9jb2RlciIsInNldFpvb20iLCJmbHlUbyIsInBsYWNlaG9sZGVyIiwib24iLCJnZXRab29tIiwiY2lyY2xlQnV0dG9uRWxlbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsIiQiLCJ0b29sdGlwIiwidHJpZ2dlciIsImhhbmRsZUFncmVlQ2xpY2siLCJzZXRTdGF0ZUl0ZW0iLCJoYW5kbGVEaXNzYWdyZWVDbGljayIsImNoZWNrVmFsaWRPYmplY3QiLCJvYmoiLCJ1bmRlZmluZWQiLCJrZXlzIiwibGVuZ3RoIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiaGFuZGxlRHJhd0J1dHRvbkNsaWNrIiwiZSIsImdldExheWVyIiwicmVtb3ZlTGF5ZXIiLCJnZXRTb3VyY2UiLCJyZW1vdmVTb3VyY2UiLCJjaGFuZ2VNb2RlIiwiaXNTdHVkeWNvbXBsZXRlZCIsInN0dWR5Q29tcGxldGVkIiwiU3R1ZHlBZ3JyZWVtZW50Iiwic3R1ZHlBZ3JyZWVkIiwieCIsInJlc3VsdCIsInkiLCJvZmZzZXRkaXN0IiwiYmJveCIsIm1pbiIsIm1heCIsInptIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZml0Qm91bmRzIiwibWF4Wm9vbSIsImdlb2NvZGVFbGVtIiwiYXBwZW5kQ2hpbGQiLCJvbkFkZCIsImRyYXdDaXJjbGVFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXJlY3Rpb25zT25lIiwibWluT25lIiwibWF4T25lIiwibWVzc2FnZUluZGV4T25lIiwic3RlcERpcmVjdGlvbnMxIiwiaW5uZXJIVE1MIiwiZGlyZWN0aW9uc1R3byIsIm1pblR3byIsIm1heFR3byIsIm1lc3NhZ2VJbmRleFR3byIsInN0ZXBEaXJlY3Rpb25zMiIsImFnZ3JlZUJ1dHRvbkVsZW1lbnQiLCJkaXNzYWdncmVlQnV0dG9uRWxlbWVudCIsImRyYXdfbGluZV9zdHJpbmciLCJjcmVhdGVWZXJ0ZXgiLCJwYXJlbnRJZCIsImNvb3JkaW5hdGVzIiwicGF0aCIsInNlbGVjdGVkIiwicHJvcGVydGllcyIsIm1ldGEiLCJwYXJlbnQiLCJjb29yZF9wYXRoIiwiYWN0aXZlIiwiZ2VvbWV0cnkiLCJjcmVhdGVHZW9KU09OQ2lyY2xlIiwicmFkaXVzSW5LbSIsInBvaW50cyIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwia20iLCJyZXQiLCJkaXN0YW5jZVgiLCJjb3MiLCJQSSIsImRpc3RhbmNlWSIsInRoZXRhIiwiaSIsInNpbiIsInB1c2giLCJnZXREaXNwbGF5TWVhc3VyZW1lbnRzIiwiZmVhdHVyZSIsImRyYXduTGVuZ3RoIiwibWV0cmljVW5pdHMiLCJtZXRyaWNGb3JtYXQiLCJtZXRyaWNNZWFzdXJlbWVudCIsInN0YW5kYXJkVW5pdHMiLCJzdGFuZGFyZEZvcm1hdCIsInN0YW5kYXJkTWVhc3VyZW1lbnQiLCJkaXNwbGF5TWVhc3VyZW1lbnRzIiwibWV0cmljIiwiZm9ybWF0Iiwic3RhbmRhcmQiLCJkb3VibGVDbGlja1pvb20iLCJlbmFibGUiLCJjdHgiLCJzZXRUaW1lb3V0IiwiX2N0eCIsImdldEluaXRpYWxDb25maWdWYWx1ZSIsIm9uS2V5VXAiLCJzdGF0ZSIsImtleUNvZGUiLCJkZWxldGVGZWF0dXJlIiwibGluZSIsInNpbGVudCIsImludGVyYWN0aXZlRHJhdyIsInVzZXJTb3VyY2UiLCJzZWxmIiwiY3VycmVudFZlcnRleFBvc2l0aW9uIiwiY29vcmRudW0iLCJyZW1vdmVDb29yZGluYXRlIiwiYWRkQ29vcmRpbmF0ZSIsImxuZ0xhdCIsImxuZyIsImxhdCIsImZlYXR1cmVJZHMiLCJ1cGRhdGVVSUNsYXNzZXMiLCJtb3VzZSIsInVwZGF0ZUNvb3JkaW5hdGUiLCJkaXJlY3Rpb24iLCJvblRvdWNoU3RhcnQiLCJjb25zb2xlIiwibG9nIiwicHJldmVudERlZmF1bHQiLCJkaWRUb3VjaFN0YXJ0Iiwib25UYXAiLCJvblRvdWNoTW92ZSIsImQiLCJEYXRlIiwibiIsImdldFRpbWUiLCJsYXN0VG91Y2hNb3ZlIiwiZGlmZmVyZW5jZVRyYXZlbCIsInNlY29uZHMiLCJvblRvdWNoRW5kIiwiY2xpY2tBbnl3aGVyZSIsIm9uU3RvcCIsImFjdGl2YXRlVUlCdXR0b24iLCJnZXRGZWF0dXJlIiwiaXNWYWxpZCIsImxpbmVHZW9Kc29uIiwidG9HZW9KU09OIiwic3RhcnRQb2ludCIsImRpc3RhbmNlIiwiY2lyY2xlR2VvSlNPTiIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZWV0IiwicG9pbnRXaXRoUmFkaXVzIiwicmFkaXVzTWV0cmljIiwidG9GaXhlZCIsInJhZGl1c0ZlZXQiLCJhZGRTb3VyY2UiLCJkYXRhIiwiYWRkTGF5ZXIiLCJzb3VyY2UiLCJmaXJlIiwiZmVhdHVyZXMiLCJ0b0Rpc3BsYXlGZWF0dXJlcyIsImdlb2pzb24iLCJkaXNwbGF5IiwiaXNBY3RpdmVMaW5lIiwiY3VycmVudFZlcnRleCIsInJhZGl1c1N0YW5kYXJkIiwiY2lyY2xlRmVhdHVyZSIsIlNUQVRFX0tFWSIsInN0b3JhZ2VBdmFpbGFibGUiLCJzdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwiY2hlY2tTdGF0ZUV4aXN0cyIsImdldFN0YXRlIiwia2V5Iiwic3RvcmVPYmoiLCJuZXdTdGF0ZU9iaiIsInNldFN0YXRlIiwicGFyc2UiLCJnZXRJdGVtIiwiY2hlY2tJdGVtIiwic2V0SXRlbSIsIkJvb2xlYW4iLCJpdGVtIiwic3RhdGVTdHIiLCJnZXRTdGF0ZUFzU3RyaW5nIiwiaW5kZXhPZiIsInJlbW92ZUl0ZW0iLCJET01FeGNlcHRpb24iLCJjb2RlIiwibmFtZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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STtBQUNGQSxrQkFBVWxPLE9BQU81QixJQUFQLENBQVY7QUFDQSxZQUFNMkcsSUFBSSxrQkFBVjtBQUNBbUosZ0JBQVFXLE9BQVIsQ0FBZ0I5SixDQUFoQixFQUFtQkEsQ0FBbkI7QUFDQW1KLGdCQUFRaUIsVUFBUixDQUFtQnBLLENBQW5CO0FBQ0EsZUFBTyxJQUFQO0FBQ0QsT0FORCxDQU1FLE9BQU9WLENBQVAsRUFBVTtBQUNWLGVBQU9BLGFBQWErSyxZQUFiO0FBQ0w7QUFDQS9LLFVBQUVnTCxJQUFGLEtBQVcsRUFBWDtBQUNBO0FBQ0FoTCxVQUFFZ0wsSUFBRixLQUFXLElBRlg7QUFHQTtBQUNBO0FBQ0FoTCxVQUFFaUwsSUFBRixLQUFXLG9CQUxYO0FBTUE7QUFDQWpMLFVBQUVpTCxJQUFGLEtBQVcsNEJBVE47QUFVTDtBQUNBcEIsZ0JBQVFuSyxNQUFSLEtBQW1CLENBWHJCO0FBWUQ7QUFDRiIsImZpbGUiOiJpbmRleC5hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJkOGFiYTAyYTE5NmI5NDVlYTNkZlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JzfmluZGV4XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL05ZQ1BsYW5uaW5nL2xhYnMtZmFjdGZpbmRlci9ibG9iLzRhNjdkYTI3M2I2ZmY4NzU4OGY1MDQ0YTE1YjM0OTBkNGFjMDdhMjUvYXBwL2xheWVycy9kcmF3LXN0eWxlcy5qc1xuZXhwb3J0IGRlZmF1bHQgW1xuICAvLyBBQ1RJVkUgKGJlaW5nIGRyYXduKVxuICAvLyBsaW5lIHN0cm9rZVxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LWxpbmUnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdMaW5lU3RyaW5nJ10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICdsaW5lLWRhc2hhcnJheSc6IFswLjIsIDJdLFxuICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgfVxuICB9LFxuXG4gIC8vIHBvbHlnb24gZmlsbFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tZmlsbCcsXG4gICAgdHlwZTogJ2ZpbGwnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2ZpbGwtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuMVxuICAgIH1cbiAgfSxcblxuICAvLyBwb2x5Z29uIG91dGxpbmUgc3Ryb2tlXG4gIC8vIFRoaXMgZG9lc24ndCBzdHlsZSB0aGUgZmlyc3QgZWRnZSBvZiB0aGUgcG9seWdvbiwgd2hpY2ggdXNlcyB0aGUgbGluZSBzdHJva2Ugc3R5bGluZyBpbnN0ZWFkXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1zdHJva2UtYWN0aXZlJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnI0Q5NkIyNycsXG4gICAgICAnbGluZS1kYXNoYXJyYXknOiBbMC4yLCAyXSxcbiAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgIH1cbiAgfSxcbiAgLy8gdmVydGV4IHBvaW50IGhhbG9zXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1hbmQtbGluZS12ZXJ0ZXgtaGFsby1hY3RpdmUnLFxuICAgIHR5cGU6ICdjaXJjbGUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJ21ldGEnLCAndmVydGV4J10sIFsnPT0nLCAnJHR5cGUnLCAnUG9pbnQnXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2NpcmNsZS1yYWRpdXMnOiA3LFxuICAgICAgJ2NpcmNsZS1jb2xvcic6ICcjRkZGJ1xuICAgIH1cbiAgfSxcbiAgLy8gdmVydGV4IHBvaW50c1xuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tYW5kLWxpbmUtdmVydGV4LWFjdGl2ZScsXG4gICAgdHlwZTogJ2NpcmNsZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnbWV0YScsICd2ZXJ0ZXgnXSwgWyc9PScsICckdHlwZScsICdQb2ludCddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnY2lyY2xlLXJhZGl1cyc6IDYsXG4gICAgICAnY2lyY2xlLWNvbG9yJzogJyNEOTZCMjcnXG4gICAgfVxuICB9LFxuXG4gIC8vIHJhZGl1cyBsYWJlbFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXJhZGl1cy1sYWJlbCcsXG4gICAgdHlwZTogJ3N5bWJvbCcsXG4gICAgZmlsdGVyOiBbJz09JywgJ21ldGEnLCAnY3VycmVudFBvc2l0aW9uJ10sXG4gICAgbGF5b3V0OiB7XG4gICAgICAndGV4dC1maWVsZCc6ICd7cmFkaXVzRmVldH0gXFxuIHtyYWRpdXNNaWxlc30nLFxuICAgICAgJ3RleHQtYW5jaG9yJzogJ2xlZnQnLFxuICAgICAgJ3RleHQtb2Zmc2V0JzogW1xuICAgICAgICAxLFxuICAgICAgICAwXG4gICAgICBdLFxuICAgICAgJ3RleHQtc2l6ZSc6IDIyXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ3RleHQtY29sb3InOiAncmdiYSgwLCAwLCAwLCAxKScsXG4gICAgICAndGV4dC1oYWxvLWNvbG9yJzogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknLFxuICAgICAgJ3RleHQtaGFsby13aWR0aCc6IDMsXG4gICAgICAnaWNvbi1vcGFjaXR5Jzoge1xuICAgICAgICBiYXNlOiAxLFxuICAgICAgICBzdG9wczogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIDcuOTksXG4gICAgICAgICAgICAxXG4gICAgICAgICAgXSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgMFxuICAgICAgICAgIF1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgICd0ZXh0LWhhbG8tYmx1cic6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gSU5BQ1RJVkUgKHN0YXRpYywgYWxyZWFkeSBkcmF3bilcbiAgLy8gbGluZSBzdHJva2VcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1saW5lLXN0YXRpYycsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ0xpbmVTdHJpbmcnXSwgWyc9PScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2xpbmUtd2lkdGgnOiAzXG4gICAgfVxuICB9LFxuICAvLyBwb2x5Z29uIGZpbGxcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWZpbGwtc3RhdGljJyxcbiAgICB0eXBlOiAnZmlsbCcsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJz09JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnZmlsbC1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdmaWxsLW91dGxpbmUtY29sb3InOiAnIzAwMCcsXG4gICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgfVxuICB9LFxuICAvLyBwb2x5Z29uIG91dGxpbmVcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLXN0cm9rZS1zdGF0aWMnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnPT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdsaW5lLXdpZHRoJzogM1xuICAgIH1cbiAgfVxuXTtcbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcblxuZXhwb3J0IGNsYXNzIEdvb2dsZUFuYWx5dGljcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZm9vID0ge307XG4gIH1cblxuICBzZXRFdmVudChhY3Rpb24gPSAnJywgY2F0ZWdvcnkgPSAnJywgbGFiZWwgPSAnJywgdmFsdWUgPSAwKSB7XG4gICAgY29uc3QgZm9vT2JqID0gdGhpcy5mb287IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBndGFnKCdldmVudCcsIHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpLCB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBldmVudF9jYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgICBldmVudF9sYWJlbDogbGFiZWwsXG4gICAgICB2YWx1ZTogYCR7dmFsdWV9YCxcbiAgICAgIHV1aWQ6IHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpXG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMnO1xuaW1wb3J0IG1hcGJveGdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgTWFwYm94RHJhdyBmcm9tICdAbWFwYm94L21hcGJveC1nbC1kcmF3JztcbmltcG9ydCBNYXBib3hHZW9jb2RlciBmcm9tICdAbWFwYm94L21hcGJveC1nbC1nZW9jb2Rlcic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IFJhZGl1c01vZGUgZnJvbSAnLi9yYWRpdXNNb2RlJztcbmltcG9ydCBkcmF3U3R5bGVzIGZyb20gJy4vZHJhd3N0eWxlcyc7XG5pbXBvcnQgeyBHb29nbGVBbmFseXRpY3MgfSBmcm9tICcuL2dhJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgZ29vZ2xlQW5hbHl0aWNzID0gbmV3IEdvb2dsZUFuYWx5dGljcygpO1xuXG4vLyBLaWNrcyBvZmYgdGhlIHByb2Nlc3Mgb2YgZmluZGluZyA8aT4gdGFncyBhbmQgcmVwbGFjaW5nIHdpdGggPHN2Zz5cbi8vIGFkZGVzIHN1cHBvcnQgZm9yIGZvbnRhd2Vzb21lXG5saWJyYXJ5LmFkZChmYXMsIGZhcik7XG5kb20ud2F0Y2goKTtcblxuY29uc3QgdXJsU3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5jb25zdCB1cmwgPSBuZXcgVVJMKHVybFN0cmluZyk7XG5jb25zdCB1c2VyVHlwZSA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCd1c2VyVHlwZScpO1xuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3VzZXJUeXBlJywgdXNlclR5cGUpO1xuXG5tYXBib3hnbC5hY2Nlc3NUb2tlbiA9ICdway5leUoxSWpvaVpHRjJaV2x6YlNJc0ltRWlPaUpDZGpVeFQwRnpJbjAuVjlvSWtfd1VjNHVadTdVQmJsUjhtdyc7XG5cbmNvbnN0IG1hcCA9IG5ldyBtYXBib3hnbC5NYXAoe1xuICBjb250YWluZXI6ICdtYXAnLFxuICBzdHlsZTogJ21hcGJveDovL3N0eWxlcy9tYXBib3gvc3RyZWV0cy12MTEnLFxuICAvLyAnbWFwYm94Oi8vc3R5bGVzL2RhdmVpc20vY2p3cnJkZmQyMHVpYzFkbnpzdGkyb3dsaycsIC0gZGFya1xuICBjZW50ZXI6IFstOTgsIDM4Ljg4XSwgLy8gc3RhcnRpbmcgcG9zaXRpb24gW2xuZywgbGF0XVxuICB6b29tOiAzLCAvLyBzdGFydGluZyB6b29tXG4gIHNob3dab29tOiB0cnVlLFxuICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gIGtleWJpbmRpbmdzOiB0cnVlXG59KTtcblxuLy8gc2V0dXAgbWFwXG5jb25zdCBkcmF3Q29udHJvbCA9IG5ldyBNYXBib3hEcmF3KHtcbiAgZGlzcGxheUNvbnRyb2xzRGVmYXVsdDogdHJ1ZSxcbiAgY29udHJvbHM6IHtcbiAgICByZWN0YW5nbGU6IHRydWUsXG4gICAgcG9seWdvbjogdHJ1ZSxcbiAgICBsaW5lX3N0cmluZzogdHJ1ZSxcbiAgICB0cmFzaDogdHJ1ZVxuICB9LFxuICBvcHRpb25zOiB7XG4gICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgIHRvdWNoQnVmZmVyOiAxMFxuICB9LFxuICBzdHlsZXM6IGRyYXdTdHlsZXMsXG4gIG1vZGVzOiBPYmplY3QuYXNzaWduKHtcbiAgICBkcmF3X3JhZGl1czogUmFkaXVzTW9kZVxuICB9LCBNYXBib3hEcmF3Lm1vZGVzKVxufSk7XG5cbm1hcC5hZGRDb250cm9sKGRyYXdDb250cm9sKTtcblxuY29uc3QgbmF2ID0gbmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKCk7XG5tYXAuYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xuXG5jb25zdCBnZW9jb2RlciA9IG5ldyBNYXBib3hHZW9jb2Rlcih7XG4gIGFjY2Vzc1Rva2VuOiBtYXBib3hnbC5hY2Nlc3NUb2tlbixcbiAgbWFwYm94Z2wsXG4gIHNldFpvb206IDgsXG4gIGZseVRvOiBmYWxzZSxcbiAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggZm9yIGEgbG9jYXRpb24uLi4nXG59KTtcblxubWFwLm9uKCd6b29tZW5kJywgKCkgPT4ge1xuICBpZiAobWFwLmdldFpvb20oKSA+IDEwKSB7XG4gICAgY29uc3QgY2lyY2xlQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uJyk7XG4gICAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICBjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnaGlkZScpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNhYmxlJyk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi10aXRsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gZnVuY3Rpb25cbmZ1bmN0aW9uIGhhbmRsZUFncmVlQ2xpY2soKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktYWdyZWVtZW50LWFsbCcpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktZGlzc2FnZ3JlZScpLnJlbW92ZSgpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIHRydWUpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdoLTgwJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtYWN0aW9uLWhvbGRlcicpLmNsYXNzTGlzdC5hZGQoJ2gtNzAnKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURpc3NhZ3JlZUNsaWNrKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWRpc3NhZ2dyZWUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWFncmVlbWVudC1hbGwnKS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykucmVtb3ZlKCk7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50JywgZmFsc2UpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gZW5zdXJlIHRoZSBvYmplY3Qgb3IgdmFyaWFibGUgaXMgdmFsaWQuLi5cbi8vIEBwYXJhbSBvYmogLSB0eXBlbGVzc1xuZnVuY3Rpb24gY2hlY2tWYWxpZE9iamVjdChvYmopIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgJiYgb2JqLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdXVpZCgpIHtcbiAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDQpKS5qb2luKCctJyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYXdCdXR0b25DbGljayhlKSB7XG4gIGNvbnN0IGNpcmNsZUJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLWJ1dHRvbicpO1xuICBpZiAoY2lyY2xlQnV0dG9uRWxlbSkge1xuICAgIGlmIChjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyB9KTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnc2hvdycpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ21hbnVhbCcgfSk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNwb3NlJyk7XG4gICAgfVxuICB9XG5cbiAgZHJhd0NvbnRyb2wudHJhc2goKTtcblxuICBpZiAobWFwLmdldExheWVyKCdjaXJjbGUtbGluZScpKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtbGluZScpO1xuICB9XG5cbiAgaWYgKG1hcC5nZXRMYXllcignY2lyY2xlLWZpbGwnKSkge1xuICAgIG1hcC5yZW1vdmVMYXllcignY2lyY2xlLWZpbGwnKTtcbiAgfVxuICBpZiAobWFwLmdldFNvdXJjZSgnY2lyY2xlJykpIHtcbiAgICBtYXAucmVtb3ZlU291cmNlKCdjaXJjbGUnKTtcbiAgfVxuXG4gIGRyYXdDb250cm9sLmNoYW5nZU1vZGUoJ2RyYXdfcmFkaXVzJyk7XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBjb21wbGV0ZXRpb25cbmNvbnN0IGlzU3R1ZHljb21wbGV0ZWQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5Y29tcGxldGVkJyk7XG5sZXQgc3R1ZHlDb21wbGV0ZWQgPSBmYWxzZTtcbmlmICh0eXBlb2YgaXNTdHVkeWNvbXBsZXRlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gIHN0dWR5Q29tcGxldGVkID0gaXNTdHVkeWNvbXBsZXRlZDtcbn0gZWxzZSB7XG4gIHN0dWR5Q29tcGxldGVkID0gZmFsc2U7XG59XG5cbi8vIGNoZWNrIHN0dWR5IHNlc3Npb24gc3RhdGUgZm9yIGNvbXBsZXRldGlvblxuY29uc3QgU3R1ZHlBZ3JyZWVtZW50ID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnKTtcbmxldCBzdHVkeUFncnJlZWQgPSBmYWxzZTtcbmlmICh0eXBlb2YgU3R1ZHlBZ3JyZWVtZW50ID09PSAnYm9vbGVhbicpIHtcbiAgc3R1ZHlBZ3JyZWVkID0gU3R1ZHlBZ3JyZWVtZW50O1xufSBlbHNlIHtcbiAgc3R1ZHlBZ3JyZWVkID0gZmFsc2U7XG59XG5cbi8vIGFscmVhZHkgYWdyZWVkXG5pZiAoc3R1ZHlBZ3JyZWVkKSB7XG4gIC8vIGhhbmRsZUFncmVlQ2xpY2soKTtcbn1cblxuLy8gaGlkZSBzdHVkeVxuaWYgKHN0dWR5Q29tcGxldGVkKSB7IC8vIHx8IHN0dWR5QWdycmVlZFxuICBoYW5kbGVBZ3JlZUNsaWNrKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1jb21wbGV0ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1ob2xkZXInKS5yZW1vdmUoKTtcbn0gZWxzZSB7XG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5Y29tcGxldGVkJywgZmFsc2UpO1xufVxuXG5pZiAoIWNoZWNrVmFsaWRPYmplY3Qoc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJykpKSB7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgndXVpZCcsIHV1aWQoKSk7XG59XG5cbmdlb2NvZGVyLm9uKCdyZXN1bHQnLCAoZSkgPT4ge1xuICBjb25zdCB4ID0gZS5yZXN1bHQuY2VudGVyWzBdO1xuICBjb25zdCB5ID0gZS5yZXN1bHQuY2VudGVyWzFdO1xuXG4gIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzZWFyY2hwb2ludCcsIGAke3h9LCAke3l9YCk7XG5cbiAgY29uc3Qgb2Zmc2V0ZGlzdCA9IDAuMDAyNTtcbiAgY29uc3QgYmJveCA9IFtbeCAtIG9mZnNldGRpc3QsIHkgLSBvZmZzZXRkaXN0XSwgW3ggKyBvZmZzZXRkaXN0LCB5ICsgb2Zmc2V0ZGlzdF1dO1xuXG4gIC8vIGNyZWF0ZSByYW5kb20gem9vbSBpbmNhc2UgdXNlcnMgYXJlIGluZmx1ZW5jZWQgYnkgaW50aWFsIHpvb21sZXZlbFxuICBjb25zdCBtaW4gPSAxMDtcbiAgY29uc3QgbWF4ID0gMTQ7XG4gIGNvbnN0IHptID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgbWFwLmZpdEJvdW5kcyhiYm94LCB7IG1heFpvb206IHptIH0pO1xuXG4gIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzZWFyY2h6b29tJywgem0pO1xuXG5cbiAgY29uc3QgY2lyY2xlQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uJyk7XG4gIGlmIChjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgIGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItdGl0bGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi1kaXJlY3Rpb25zJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgfVxufSk7XG5cbmNvbnN0IGdlb2NvZGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlb2NvZGVyJyk7XG5pZiAoZ2VvY29kZUVsZW0pIHtcbiAgZ2VvY29kZUVsZW0uYXBwZW5kQ2hpbGQoZ2VvY29kZXIub25BZGQobWFwKSk7XG59XG5jb25zdCBkcmF3Q2lyY2xlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tZHJhdy1jaXJjbGUnKTtcbmlmIChkcmF3Q2lyY2xlRWxlbWVudCkge1xuICBkcmF3Q2lyY2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURyYXdCdXR0b25DbGljayk7XG59XG5cbmNvbnN0IGRpcmVjdGlvbnNPbmUgPSBbXG4gICdTZWFyY2ggZm9yIGEgbG9jYXRpb24geW91IGNhcmUgYWJvdXQuJyxcbiAgJ1NlYXJjaCBmb3IgYSBsb2NhdGlvbiB0byBmaW5kIGFib3V0IGNyaW1lLicsXG4gICdTZWFyY2ggZm9yIGEgbG9jYXRpb24gdG8gZmluZCBhYm91dCBhIHBpenphIHBsYWNlLidcbl07XG5cbmNvbnN0IG1pbk9uZSA9IDA7XG5jb25zdCBtYXhPbmUgPSAyO1xuY29uc3QgbWVzc2FnZUluZGV4T25lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE9uZSAtIG1pbk9uZSArIDEpICsgbWluT25lKTtcbmNvbnN0IHN0ZXBEaXJlY3Rpb25zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMS1kaXJlY3Rpb25zJyk7XG5pZiAoc3RlcERpcmVjdGlvbnMxKSB7XG4gIHN0ZXBEaXJlY3Rpb25zMS5pbm5lckhUTUwgPSBkaXJlY3Rpb25zT25lW21lc3NhZ2VJbmRleE9uZV07XG59XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3RlcDF0ZXh0JywgZGlyZWN0aW9uc09uZVttZXNzYWdlSW5kZXhPbmVdKTtcblxuY29uc3QgZGlyZWN0aW9uc1R3byA9IFtcbiAgJ0RyYXcgYSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIDEgbWlsZSBmcm9tIHRoZSBsb2NhdGlvbi4nLFxuICAnRHJhdyBhIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgYSA1IG1pbnV0ZSA8c3Ryb25nPkRSSVZFPC9zdHJvbmc+LicsXG4gICdEcmF3IGEgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyBhIDUgbWludXRlIDxzdHJvbmc+V0FMSzwvc3Ryb25nPi4nXG5dO1xuXG5jb25zdCBtaW5Ud28gPSAwO1xuY29uc3QgbWF4VHdvID0gMjtcbmNvbnN0IG1lc3NhZ2VJbmRleFR3byA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhUd28gLSBtaW5Ud28gKyAxKSArIG1pblR3byk7XG5jb25zdCBzdGVwRGlyZWN0aW9uczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpO1xuaWYgKHN0ZXBEaXJlY3Rpb25zMikge1xuICBzdGVwRGlyZWN0aW9uczIuaW5uZXJIVE1MID0gZGlyZWN0aW9uc1R3b1ttZXNzYWdlSW5kZXhUd29dO1xufVxuXG4vLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0ZXAydGV4dCcsIGRpcmVjdGlvbnNUd29bbWVzc2FnZUluZGV4VHdvXSk7XG5cbmNvbnN0IGFnZ3JlZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdncmVlLWJ1dHRvbicpO1xuaWYgKGFnZ3JlZUJ1dHRvbkVsZW1lbnQpIHtcbiAgYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUFncmVlQ2xpY2spO1xufVxuXG5jb25zdCBkaXNzYWdncmVlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFnZ3JlZS1idXR0b24nKTtcbmlmIChkaXNzYWdncmVlQnV0dG9uRWxlbWVudCkge1xuICBkaXNzYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURpc3NhZ3JlZUNsaWNrKTtcbn1cbiIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2Nocmlzd2hvbmcvNjk0Nzc5YmMxZjFlNWQ5MjZlNDdiYWI3MjA1ZmE1NTlcbi8vIGN1c3RvbSBtYXBib3B4LWdsLWRyYXcgbW9kZSB0aGF0IG1vZGlmaWVzIGRyYXdfbGluZV9zdHJpbmdcbi8vIHNob3dzIGEgY2VudGVyIHBvaW50LCByYWRpdXMgbGluZSwgYW5kIGNpcmNsZSBwb2x5Z29uIHdoaWxlIGRyYXdpbmdcbi8vIGZvcmNlcyBkcmF3LmNyZWF0ZSBvbiBjcmVhdGlvbiBvZiBzZWNvbmQgdmVydGV4XG5pbXBvcnQgTWFwYm94RHJhdyBmcm9tICdAbWFwYm94L21hcGJveC1nbC1kcmF3JztcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnO1xuaW1wb3J0IGxpbmVEaXN0YW5jZSBmcm9tICdAdHVyZi9saW5lLWRpc3RhbmNlJztcbmltcG9ydCB7IEdvb2dsZUFuYWx5dGljcyB9IGZyb20gJy4vZ2EnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoe30pO1xuY29uc3QgUmFkaXVzTW9kZSA9IE1hcGJveERyYXcubW9kZXMuZHJhd19saW5lX3N0cmluZztcbmNvbnN0IGdvb2dsZUFuYWx5dGljcyA9IG5ldyBHb29nbGVBbmFseXRpY3MoKTtcblxuc3RvcmUuc2V0U3RhdGVJdGVtKCdpc1RvdWNoTW92ZScsIHRydWUpO1xuXG5mdW5jdGlvbiBjcmVhdGVWZXJ0ZXgocGFyZW50SWQsIGNvb3JkaW5hdGVzLCBwYXRoLCBzZWxlY3RlZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBtZXRhOiAndmVydGV4JyxcbiAgICAgIHBhcmVudDogcGFyZW50SWQsXG4gICAgICBjb29yZF9wYXRoOiBwYXRoLFxuICAgICAgYWN0aXZlOiAoc2VsZWN0ZWQpID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgIH0sXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBjb29yZGluYXRlc1xuICAgIH1cbiAgfTtcbn1cblxuLy8gY3JlYXRlIGEgY2lyY2xlLWxpa2UgcG9seWdvbiBnaXZlbiBhIGNlbnRlciBwb2ludCBhbmQgcmFkaXVzXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNzU5OTU2MS9kcmF3aW5nLWEtY2lyY2xlLXdpdGgtdGhlLXJhZGl1cy1pbi1taWxlcy1tZXRlcnMtd2l0aC1tYXBib3gtZ2wtanMvMzkwMDYzODgjMzkwMDYzODhcbmZ1bmN0aW9uIGNyZWF0ZUdlb0pTT05DaXJjbGUoY2VudGVyLCByYWRpdXNJbkttLCBwYXJlbnRJZCwgcG9pbnRzID0gNjQpIHtcbiAgY29uc3QgY29vcmRzID0ge1xuICAgIGxhdGl0dWRlOiBjZW50ZXJbMV0sXG4gICAgbG9uZ2l0dWRlOiBjZW50ZXJbMF1cbiAgfTtcblxuICBjb25zdCBrbSA9IHJhZGl1c0luS207XG5cbiAgY29uc3QgcmV0ID0gW107XG4gIGNvbnN0IGRpc3RhbmNlWCA9IGttIC8gKDExMS4zMjAgKiBNYXRoLmNvcygoY29vcmRzLmxhdGl0dWRlICogTWF0aC5QSSkgLyAxODApKTtcbiAgY29uc3QgZGlzdGFuY2VZID0ga20gLyAxMTAuNTc0O1xuXG4gIGxldCB0aGV0YTtcbiAgbGV0IHg7XG4gIGxldCB5O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50czsgaSArPSAxKSB7XG4gICAgdGhldGEgPSAoaSAvIHBvaW50cykgKiAoMiAqIE1hdGguUEkpO1xuICAgIHggPSBkaXN0YW5jZVggKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgeSA9IGRpc3RhbmNlWSAqIE1hdGguc2luKHRoZXRhKTtcblxuICAgIHJldC5wdXNoKFtjb29yZHMubG9uZ2l0dWRlICsgeCwgY29vcmRzLmxhdGl0dWRlICsgeV0pO1xuICB9XG4gIHJldC5wdXNoKHJldFswXSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBbcmV0XVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgcGFyZW50OiBwYXJlbnRJZCxcbiAgICAgIGFjdGl2ZTogJ3RydWUnXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5TWVhc3VyZW1lbnRzKGZlYXR1cmUpIHtcbiAgLy8gc2hvdWxkIGxvZyBib3RoIG1ldHJpYyBhbmQgc3RhbmRhcmQgZGlzcGxheSBzdHJpbmdzIGZvciB0aGUgY3VycmVudCBkcmF3biBmZWF0dXJlXG4gIC8vIG1ldHJpYyBjYWxjdWxhdGlvblxuICBjb25zdCBkcmF3bkxlbmd0aCA9IChsaW5lRGlzdGFuY2UoZmVhdHVyZSkgKiAxMDAwKTsgLy8gbWV0ZXJzXG5cbiAgbGV0IG1ldHJpY1VuaXRzID0gJ20nO1xuICBsZXQgbWV0cmljRm9ybWF0ID0gJzAsMCc7XG4gIGxldCBtZXRyaWNNZWFzdXJlbWVudDtcblxuICBsZXQgc3RhbmRhcmRVbml0cyA9ICdmZWV0JztcbiAgbGV0IHN0YW5kYXJkRm9ybWF0ID0gJzAsMCc7XG4gIGxldCBzdGFuZGFyZE1lYXN1cmVtZW50O1xuXG4gIG1ldHJpY01lYXN1cmVtZW50ID0gZHJhd25MZW5ndGg7XG4gIGlmIChkcmF3bkxlbmd0aCA+PSAxMDAwKSB7IC8vIGlmIG92ZXIgMTAwMCBtZXRlcnMsIHVwZ3JhZGUgbWV0cmljXG4gICAgbWV0cmljTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aCAvIDEwMDA7XG4gICAgbWV0cmljVW5pdHMgPSAna20nO1xuICAgIG1ldHJpY0Zvcm1hdCA9ICcwLjAwJztcbiAgfVxuXG4gIHN0YW5kYXJkTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aCAqIDMuMjgwODQ7XG4gIGlmIChzdGFuZGFyZE1lYXN1cmVtZW50ID49IDUyODApIHsgLy8gaWYgb3ZlciA1MjgwIGZlZXQsIHVwZ3JhZGUgc3RhbmRhcmRcbiAgICBzdGFuZGFyZE1lYXN1cmVtZW50IC89IDUyODA7XG4gICAgc3RhbmRhcmRVbml0cyA9ICdtaSc7XG4gICAgc3RhbmRhcmRGb3JtYXQgPSAnMC4wMCc7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5TWVhc3VyZW1lbnRzID0ge1xuICAgIG1ldHJpYzogYCR7bnVtZXJhbChtZXRyaWNNZWFzdXJlbWVudCkuZm9ybWF0KG1ldHJpY0Zvcm1hdCl9ICR7bWV0cmljVW5pdHN9YCxcbiAgICBzdGFuZGFyZDogYCR7bnVtZXJhbChzdGFuZGFyZE1lYXN1cmVtZW50KS5mb3JtYXQoc3RhbmRhcmRGb3JtYXQpfSAke3N0YW5kYXJkVW5pdHN9YFxuICB9O1xuXG4gIHJldHVybiBkaXNwbGF5TWVhc3VyZW1lbnRzO1xufVxuXG5jb25zdCBkb3VibGVDbGlja1pvb20gPSB7XG4gIGVuYWJsZTogKGN0eCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gRmlyc3QgY2hlY2sgd2UndmUgZ290IGEgbWFwIGFuZCBzb21lIGNvbnRleHQuXG4gICAgICBpZiAoIWN0eC5tYXAgfHwgIWN0eC5tYXAuZG91YmxlQ2xpY2tab29tIHx8ICFjdHguX2N0eCB8fFxuICAgICAgICAgIWN0eC5fY3R4LnN0b3JlIHx8ICFjdHguX2N0eC5zdG9yZS5nZXRJbml0aWFsQ29uZmlnVmFsdWUpIHJldHVybjtcbiAgICAgIC8vIE5vdyBjaGVjayBpbml0aWFsIHN0YXRlIHdhc24ndCBmYWxzZSAod2UgbGVhdmUgaXQgZGlzYWJsZWQgaWYgc28pXG4gICAgICBpZiAoIWN0eC5fY3R4LnN0b3JlLmdldEluaXRpYWxDb25maWdWYWx1ZSgnZG91YmxlQ2xpY2tab29tJykpIHJldHVybjtcbiAgICAgIGN0eC5tYXAuZG91YmxlQ2xpY2tab29tLmVuYWJsZSgpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG5cbi8vIFdoZW5ldmVyIGEgdXNlciBjbGlja3Mgb24gYSBrZXkgd2hpbGUgZm9jdXNlZCBvbiB0aGUgbWFwLCBpdCB3aWxsIGJlIHNlbnQgaGVyZVxuUmFkaXVzTW9kZS5vbktleVVwID0gZnVuY3Rpb24gb25LZXlVcChzdGF0ZSwgZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgIHRoaXMuZGVsZXRlRmVhdHVyZShbc3RhdGUubGluZS5pZF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgIHRoaXMuY2hhbmdlTW9kZSgnc2ltcGxlX3NlbGVjdCcsIHt9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gaW50ZXJhY3RpdmVEcmF3KHN0YXRlLCBlLCB1c2VyU291cmNlLCBzZWxmKSB7XG4gIC8vIGNvbnNvbGUubG9nKCAnaW50ZXJhY3RpdmVEcmF3Jyx1c2VyU291cmNlKVxuXG4gIC8vIHRoaXMgZW5kcyB0aGUgZHJhd2luZyBhZnRlciB0aGUgdXNlciBjcmVhdGVzIGEgc2Vjb25kIHBvaW50LCB0cmlnZ2VyaW5nIHRoaXMub25TdG9wXG4gIGlmIChzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24gPT09IDEpIHtcbiAgICBsZXQgY29vcmRudW0gPSAwO1xuICAgIC8vIGZvciByZWFzb25zIEkgYW0gdG8gbGF6eSB0byBmaWd1cmUgb3V0IHdoZW4gYSB0b2NoIGV2ZW50IGlzIGZpcmVkXG4gICAgLy8geW91IG5lZWQgYW4gZXh0cmEgY2xpY2sgb3Igc2ltdWxhdGUgYW4gZXh0cmEgY2xpY2sgdG8gZmluaXNoIHRoZSBjaXJjbGUuXG4gICAgaWYgKHVzZXJTb3VyY2UgPT09ICd0YXAnKSB7XG4gICAgICBjb29yZG51bSA9IDI7XG4gICAgfVxuXG4gICAgLy8gbWFrZSBzdXJlIHRvdWNoIGRyYWcgZHJhd3MgY3JpY2xlIHRvb1xuICAgIGlmICh1c2VyU291cmNlID09PSAndG91Y2hNb3ZlJyB8fCB1c2VyU291cmNlID09PSAndGFwc3RhcnQnKSB7XG4gICAgICBzdGF0ZS5saW5lLnJlbW92ZUNvb3JkaW5hdGUoJzInKTtcbiAgICAgIHN0YXRlLmxpbmUuYWRkQ29vcmRpbmF0ZSgyLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKGNvb3JkbnVtLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gICAgcmV0dXJuIHNlbGYuY2hhbmdlTW9kZSgnc2ltcGxlX3NlbGVjdCcsIHsgZmVhdHVyZUlkczogW3N0YXRlLmxpbmUuaWRdIH0pO1xuICB9XG5cbiAgc2VsZi51cGRhdGVVSUNsYXNzZXMoeyBtb3VzZTogJ2FkZCcgfSk7XG5cbiAgc3RhdGUubGluZS51cGRhdGVDb29yZGluYXRlKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICBpZiAoc3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpIHtcbiAgICBzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24gKz0gMTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5saW5lLmFkZENvb3JkaW5hdGUoMCwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cblJhZGl1c01vZGUub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KHN0YXRlLCBlKSB7XG4gIGNvbnNvbGUubG9nKCdvblRvdWNoU3RhcnQnKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGlmIChzdGF0ZS5kaWRUb3VjaFN0YXJ0KSB7XG4gICAgc3RhdGUuZGlkVG91Y2hTdGFydCA9IHRydWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gaW50ZXJhY3RpdmVEcmF3KHN0YXRlLCBlLCAndGFwc3RhcnQnLCB0aGlzKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cblJhZGl1c01vZGUub25UYXAgPSBmdW5jdGlvbiBvblRhcChzdGF0ZSwgZSkge1xuICBjb25zb2xlLmxvZygnb25UYXAnKVxuICBpZiAoIXN0YXRlLmRpZFRvdWNoU3RhcnQpIHtcbiAgICByZXR1cm4gaW50ZXJhY3RpdmVEcmF3KHN0YXRlLCBlLCAndGFwJywgdGhpcyk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5SYWRpdXNNb2RlLm9uVG91Y2hNb3ZlID0gZnVuY3Rpb24gb25Ub3VjaE1vdmUoc3RhdGUsIGUpIHtcbiAgY29uc29sZS5sb2coJ29uVG91Y2hNb3ZlJylcbiAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IG4gPSBkLmdldFRpbWUoKVxuICBjb25zdCBsYXN0VG91Y2hNb3ZlID0gc3RhdGUubGFzdFRvdWNoTW92ZTtcbiAgY29uc3QgZGlmZmVyZW5jZVRyYXZlbCA9IG4gIC0gbGFzdFRvdWNoTW92ZTtcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IoKGRpZmZlcmVuY2VUcmF2ZWwpICk7IC8vIC8gKDEwMDApXG4gIGNvbnNvbGUubG9nKCdzZWNvbmRzJywgc2Vjb25kcyk7XG4gIHN0YXRlLmxhc3RUb3VjaE1vdmUgPSBuO1xuXG4gIGNvbnNvbGUubG9nKG4pXG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBpZiAoc2Vjb25kcyA+IDIwMCl7XG4gICAgcmV0dXJuIGludGVyYWN0aXZlRHJhdyhzdGF0ZSwgZSwgJ3RvdWNoTW92ZScsIHRoaXMpO1xuICB9XG59O1xuXG5SYWRpdXNNb2RlLm9uVG91Y2hFbmQgPSBmdW5jdGlvbiBvblRvdWNoRW5kKHN0YXRlLCBlKSB7XG4gIGNvbnNvbGUubG9nKCdvblRvdWNoRW5kJylcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZXR1cm4gaW50ZXJhY3RpdmVEcmF3KHN0YXRlLCBlLCAnb25Ub3VjaEVuZCcsIHRoaXMpO1xufTtcblxuUmFkaXVzTW9kZS5jbGlja0FueXdoZXJlID0gZnVuY3Rpb24gY2xpY2tBbnl3aGVyZShzdGF0ZSwgZSwgdXNlclR5cGUpIHtcbiAgcmV0dXJuIGludGVyYWN0aXZlRHJhdyhzdGF0ZSwgZSwgJ21vdXNlJywgdGhpcyk7XG59O1xuXG4vLyBjcmVhdGVzIHRoZSBmaW5hbCBnZW9qc29uIHBvaW50IGZlYXR1cmUgd2l0aCBhIHJhZGl1cyBwcm9wZXJ0eVxuLy8gdHJpZ2dlcnMgZHJhdy5jcmVhdGVcblJhZGl1c01vZGUub25TdG9wID0gZnVuY3Rpb24gb25TdG9wKHN0YXRlKSB7XG4gIGRvdWJsZUNsaWNrWm9vbS5lbmFibGUodGhpcyk7XG4gIGNvbnNvbGUubG9nKCdvblN0b3AnKVxuICB0aGlzLmFjdGl2YXRlVUlCdXR0b24oKTtcblxuICAvLyBjaGVjayB0byBzZWUgaWYgd2UndmUgZGVsZXRlZCB0aGlzIGZlYXR1cmVcbiAgaWYgKHRoaXMuZ2V0RmVhdHVyZShzdGF0ZS5saW5lLmlkKSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgLy8gcmVtb3ZlIGxhc3QgYWRkZWQgY29vcmRpbmF0ZVxuICBzdGF0ZS5saW5lLnJlbW92ZUNvb3JkaW5hdGUoJzAnKTtcbiAgaWYgKHN0YXRlLmxpbmUuaXNWYWxpZCgpKSB7XG4gICAgY29uc3QgbGluZUdlb0pzb24gPSBzdGF0ZS5saW5lLnRvR2VvSlNPTigpO1xuICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSBsaW5lR2VvSnNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IGxpbmVEaXN0YW5jZShsaW5lR2VvSnNvbik7XG5cbiAgICBjb25zdCBjaXJjbGVHZW9KU09OID0gY3JlYXRlR2VvSlNPTkNpcmNsZShzdGFydFBvaW50LCBkaXN0YW5jZSwgbnVsbCwgMzIpO1xuXG4gICAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnY2lyY2xlJywgSlNPTi5zdHJpbmdpZnkoY2lyY2xlR2VvSlNPTikpO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNpcmNsZUdlb0pTT04pKVxuICAgIGNvbnN0IGZlZXQgPSAoZGlzdGFuY2UgKiAxMDAwKSAqIDMuMjgwODQ7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNlJywgZmVldCk7XG5cbiAgICAvLyByZWNvbmZpZ3VyZSB0aGUgZ2VvanNvbiBsaW5lIGludG8gYSBnZW9qc29uIHBvaW50IHdpdGggYSByYWRpdXMgcHJvcGVydHlcbiAgICBjb25zdCBwb2ludFdpdGhSYWRpdXMgPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBnZW9tZXRyeToge1xuICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjaXJjbGVHZW9KU09OLmdlb21ldHJ5LmNvb3JkaW5hdGVzXG4gICAgICB9LFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICByYWRpdXNNZXRyaWM6IChsaW5lRGlzdGFuY2UobGluZUdlb0pzb24pKS50b0ZpeGVkKDEpLFxuICAgICAgICByYWRpdXNGZWV0OiBmZWV0XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLm1hcC5nZXRMYXllcignY2lyY2xlLWxpbmUnKSkge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1saW5lJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWFwLmdldExheWVyKCdjaXJjbGUtZmlsbCcpKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcignY2lyY2xlLWZpbGwnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFwLmdldFNvdXJjZSgnY2lyY2xlJykpIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZVNvdXJjZSgnY2lyY2xlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXAuYWRkU291cmNlKCdjaXJjbGUnLCB7XG4gICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICBkYXRhOiBwb2ludFdpdGhSYWRpdXNcbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmFkZExheWVyKHtcbiAgICAgIGlkOiAnY2lyY2xlLWZpbGwnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiAnY2lyY2xlJyxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdmaWxsLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcC5hZGRMYXllcih7XG4gICAgICBpZDogJ2NpcmNsZS1saW5lJyxcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIHNvdXJjZTogJ2NpcmNsZScsXG4gICAgICBsYXlvdXQ6IHtcbiAgICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICAgIH0sXG4gICAgICBwYWludDoge1xuICAgICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAuZmlyZSgnZHJhdy5jcmVhdGUnLCB7XG4gICAgICBmZWF0dXJlczogW3BvaW50V2l0aFJhZGl1c11cbiAgICB9KTtcbiAgICAvLyBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5Y29tcGxldGVkJywgdHJ1ZSk7XG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykucmVtb3ZlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kZWxldGVGZWF0dXJlKFtzdGF0ZS5saW5lLmlkXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgdGhpcy5jaGFuZ2VNb2RlKCdzaW1wbGVfc2VsZWN0Jywge30sIHsgc2lsZW50OiB0cnVlIH0pO1xuICB9XG59O1xuXG5SYWRpdXNNb2RlLnRvRGlzcGxheUZlYXR1cmVzID0gZnVuY3Rpb24gdG9EaXNwbGF5RmVhdHVyZXMoc3RhdGUsIGdlb2pzb24sIGRpc3BsYXkpIHtcbiAgY29uc3QgaXNBY3RpdmVMaW5lID0gZ2VvanNvbi5wcm9wZXJ0aWVzLmlkID09PSBzdGF0ZS5saW5lLmlkO1xuXG4gIGdlb2pzb24ucHJvcGVydGllcy5hY3RpdmUgPSAoaXNBY3RpdmVMaW5lKSA/ICd0cnVlJyA6ICdmYWxzZSc7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICghaXNBY3RpdmVMaW5lKSByZXR1cm4gZGlzcGxheShnZW9qc29uKTtcblxuICAvLyBPbmx5IHJlbmRlciB0aGUgbGluZSBpZiBpdCBoYXMgYXQgbGVhc3Qgb25lIHJlYWwgY29vcmRpbmF0ZVxuICBpZiAoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggPCAyKSByZXR1cm4gbnVsbDtcbiAgZ2VvanNvbi5wcm9wZXJ0aWVzLm1ldGEgPSAnZmVhdHVyZSc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAvLyBkaXNwbGF5cyBjZW50ZXIgdmVydGV4IGFzIGEgcG9pbnQgZmVhdHVyZVxuICBkaXNwbGF5KGNyZWF0ZVZlcnRleChcbiAgICBzdGF0ZS5saW5lLmlkLFxuICAgIGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbc3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCAtIDIgOiAxXSxcbiAgICBgJHtzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoIC0gMiA6IDF9YCxcbiAgICBmYWxzZSxcbiAgKSk7XG5cbiAgLy8gZGlzcGxheXMgdGhlIGxpbmUgYXMgaXQgaXMgZHJhd25cbiAgZGlzcGxheShnZW9qc29uKTtcblxuICBjb25zdCBkaXNwbGF5TWVhc3VyZW1lbnRzID0gZ2V0RGlzcGxheU1lYXN1cmVtZW50cyhnZW9qc29uKTtcblxuICAvLyBjcmVhdGUgY3VzdG9tIGZlYXR1cmUgZm9yIHRoZSBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb25cbiAgY29uc3QgY3VycmVudFZlcnRleCA9IHtcbiAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbWV0YTogJ2N1cnJlbnRQb3NpdGlvbicsXG4gICAgICBhY3RpdmU6ICd0cnVlJyxcbiAgICAgIHJhZGl1c01ldHJpYzogZGlzcGxheU1lYXN1cmVtZW50cy5tZXRyaWMsXG4gICAgICByYWRpdXNTdGFuZGFyZDogZGlzcGxheU1lYXN1cmVtZW50cy5zdGFuZGFyZCxcbiAgICAgIHBhcmVudDogc3RhdGUubGluZS5pZFxuICAgIH0sXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBjb29yZGluYXRlczogZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXVxuICAgIH1cbiAgfTtcbiAgZGlzcGxheShjdXJyZW50VmVydGV4KTtcblxuICAvLyBjcmVhdGUgY3VzdG9tIGZlYXR1cmUgZm9yIHJhZGl1cyBjaXJjbGVtYXJrZXJcbiAgY29uc3QgY2VudGVyID0gZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXTtcbiAgY29uc3QgcmFkaXVzSW5LbSA9IGxpbmVEaXN0YW5jZShnZW9qc29uLCAna2lsb21ldGVycycpO1xuICBjb25zdCBjaXJjbGVGZWF0dXJlID0gY3JlYXRlR2VvSlNPTkNpcmNsZShjZW50ZXIsIHJhZGl1c0luS20sIHN0YXRlLmxpbmUuaWQpO1xuICBjaXJjbGVGZWF0dXJlLnByb3BlcnRpZXMubWV0YSA9ICdyYWRpdXMnO1xuXG4gIGRpc3BsYXkoY2lyY2xlRmVhdHVyZSk7XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmFkaXVzTW9kZTtcbiIsIi8vIGltcG9ydCB7IFN0b3JhZ2VBUEkgfSBmcm9tICcuL2xvY2FsU3RvcmFnZUFQSSc7XG5cbi8qKlxuKiBUaGlzIGNvbXBvbmVudCBpcyBpbnRlbmRlZCB0byBoYW5kbGUgdGhlIHN0b3JhZ2UgYW5kIHJldHJpZXZhbCBvZiB0aGUgc3RhdGUgb2ZcbiogQXMgb2YgdGhpcyB3cml0aW5nIGl0IGlzIHVzaW5nIGxvY2FsU3RvcmFnZSB0byBkbyB0aGlzLlxuKiBVc2VzIHNpbXBsZSBjbGFzcyBpbnN0YW5jZSBtZXRob2RzIHdpdGggdGhlIHNob3J0LWhhbmQgbWV0aG9kIGRlY2xhcmF0aW9uXG4qIHBhdHRlcm4uXG4qXG4qIFRvIG5vdGU6IFRoZXJlIGlzIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBTdG9yZSBhbmQgdGhlIFN0YXRlLiBBcyBvZiAwYTMxMDZlXG4qIHRoZSBTdG9yZSBpcyBhIFN0cmluZyBzYXZlZCB0byB0aGUgYnJvd3NlcnMgbG9jYWxTdG9yYWdlIGFuZCBpcyBhIHNlcmlhbGl6ZWRcbiogdmVyc2lvbiBvZiB0aGUgU3RhdGUuIFRoZSBTdGF0ZSBpcyBhbiBPYmplY3Qgd2hpY2ggaXMgaW50ZXJhY3RlZCB3aXRoIGJ5XG4qIHBhcnNpbmcgdGhlIFN0YXRlIHN0cmluZyBmcm9tIHRoZSBTdG9yZSwgbW9kaWZ5aW5nIHRoZSByZXN1bHRzIG9mIHRoZSBwYXJzZSxcbiogYW5kIHJlLXNlcmlhbGl6aW5nIGl0IGJhY2sgdG8gdGhlIFN0b3JlLlxuKi9cbmNvbnN0IFNUQVRFX0tFWSA9ICdzdGF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gIC8vIC4uYW5kIGFuIChvcHRpb25hbCkgY3VzdG9tIGNsYXNzIGNvbnN0cnVjdG9yLiBJZiBvbmUgaXNcbiAgLy8gbm90IHN1cHBsaWVkLCBhIGRlZmF1bHQgY29uc3RydWN0b3IgaXMgdXNlZCBpbnN0ZWFkOlxuICAvLyBjb25zdHJ1Y3RvcigpIHsgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgLy8gdGhpcy5zdG9yZSA9IG5ldyBTdG9yYWdlQVBJKCk7XG4gICAgaWYgKFN0b3JlLnN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5zdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IFNUQVRFX0tFWSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNldHMgYSBrZXkvdmFsdWUgcGFpciB0byB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZUl0ZW0oa2V5ID0gJycsIHZhbHVlID0gJycpIHtcbiAgICBjb25zdCBzdG9yZU9iaiA9IHsgW2tleV06IHZhbHVlIH07XG4gICAgY29uc3QgbmV3U3RhdGVPYmogPSB7IC4uLnRoaXMuZ2V0U3RhdGUoKSwgLi4uc3RvcmVPYmogfTtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlT2JqKTtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIGVudGlyZSBzdGF0ZSBvYmplY3RcbiAgLy9cbiAgLy8gQHJldHVybiBvYmplY3RcbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpID8gSlNPTi5wYXJzZSh0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSkgOiB7fTtcbiAgfVxuXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0SXRlbShrZXkgPSAnJykge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gR1xuICAvLyBHZXRzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldFN0YXRlSXRlbShrZXkgPSAnJykge1xuICAgIHJldHVybiB0aGlzLmNoZWNrSXRlbShrZXkpID8gdGhpcy5nZXRTdGF0ZSgpW2tleV0gOiB7fTtcbiAgICAvLyB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgLy8gU2V0cyBhIG5ldyBzdGF0ZSBvYmplY3Qgc3RhdGVcbiAgLy9cbiAgLy8gQHBhcmFtIHZhbHVlIHwgc3RyaW5nXG4gIHNldFN0YXRlKHZhbHVlID0ge30pIHtcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShTVEFURV9LRVksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuXG4gIC8vIENoZWNrcyBpZiB0aGUgc3RhdGUgZXhpc3RzIGluIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIGNoZWNrU3RhdGVFeGlzdHMoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpO1xuICB9XG5cbiAgLy8gR2V0cyB0aGUgc3RhdGUgZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlclxuICAvL1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUFzU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFuIGl0ZW0gaGFzIGJlZW4gc2F2ZWQgdG8gdGhlIHN0b3JlXG4gIC8vIHVudXNlZCBhcyBvZiAwYTMxMDZlXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBpc1N0YXRlSXRlbUV4aXN0KGl0ZW0pIHtcbiAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKCkpIHtcbiAgICAgIGNvbnN0IHN0YXRlU3RyID0gdGhpcy5nZXRTdGF0ZUFzU3RyaW5nKCk7XG4gICAgICBpZiAoc3RhdGVTdHIuaW5kZXhPZihpdGVtKSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtIC0gc3RyaW5nXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBjaGVja0l0ZW0oaXRlbSkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSAmJiB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKS5pbmRleE9mKGl0ZW0pID4gMDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIGxvY2FsU3RvcmFnZSBhdmFpbGFibGUuXG4gIC8vIFRha2VuIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9TdG9yYWdlX0FQSS9Vc2luZ190aGVfV2ViX1N0b3JhZ2VfQVBJXG4gIC8vXG4gIC8vIEByZXR1cm4gYm9vbGVhblxuICBzdGF0aWMgc3RvcmFnZUF2YWlsYWJsZSgpIHtcbiAgICBjb25zdCB0eXBlID0gJ2xvY2FsU3RvcmFnZSc7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgdHJ5IHtcbiAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICBjb25zdCB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgc3RvcmFnZS5sZW5ndGggIT09IDA7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9