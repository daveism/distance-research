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
/******/ 	var hotCurrentHash = "9e6afa7f6b2420fa43fc";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZHJhd3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yYWRpdXNNb2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0b3JlLmpzIl0sIm5hbWVzIjpbImlkIiwidHlwZSIsImZpbHRlciIsImxheW91dCIsInBhaW50IiwiYmFzZSIsInN0b3BzIiwic3RvcmUiLCJTdG9yZSIsImRhdGFwaSIsIkdvb2dsZUFuYWx5dGljcyIsImZvbyIsImFjdGlvbiIsImNhdGVnb3J5IiwibGFiZWwiLCJ2YWx1ZSIsInV1aWQiLCJnZXRTdGF0ZUl0ZW0iLCJkYXRlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGF0YSIsImZvb09iaiIsImd0YWciLCJldmVudF9jYXRlZ29yeSIsImV2ZW50X2xhYmVsIiwianNvbmRhdGEiLCJkYXRhQVBJVVJMIiwiVVJMIiwic2VhcmNoIiwiVVJMU2VhcmNoUGFyYW1zIiwiZmV0Y2giLCJnb29nbGVBbmFseXRpY3MiLCJsaWJyYXJ5IiwiYWRkIiwiZmFzIiwiZmFyIiwiZG9tIiwid2F0Y2giLCJ1cmxTdHJpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ1cmwiLCJ1c2VyVHlwZSIsInNlYXJjaFBhcmFtcyIsImdldCIsInNldEV2ZW50IiwibWFwYm94Z2wiLCJhY2Nlc3NUb2tlbiIsIm1hcCIsIk1hcCIsImNvbnRhaW5lciIsInN0eWxlIiwiY2VudGVyIiwiem9vbSIsInNob3dab29tIiwidG91Y2hFbmFibGVkIiwia2V5YmluZGluZ3MiLCJkcmF3Q29udHJvbCIsIk1hcGJveERyYXciLCJkaXNwbGF5Q29udHJvbHNEZWZhdWx0IiwiY29udHJvbHMiLCJyZWN0YW5nbGUiLCJwb2x5Z29uIiwibGluZV9zdHJpbmciLCJ0cmFzaCIsIm9wdGlvbnMiLCJ0b3VjaEJ1ZmZlciIsInN0eWxlcyIsImRyYXdTdHlsZXMiLCJtb2RlcyIsIk9iamVjdCIsImFzc2lnbiIsImRyYXdfcmFkaXVzIiwiUmFkaXVzTW9kZSIsImFkZENvbnRyb2wiLCJuYXYiLCJOYXZpZ2F0aW9uQ29udHJvbCIsImdlb2NvZGVyIiwiTWFwYm94R2VvY29kZXIiLCJzZXRab29tIiwiZmx5VG8iLCJwbGFjZWhvbGRlciIsIm9uIiwiZ2V0Wm9vbSIsImNpcmNsZUJ1dHRvbkVsZW0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCIkIiwidG9vbHRpcCIsInRyaWdnZXIiLCJoYW5kbGVBZ3JlZUNsaWNrIiwic2V0U3RhdGVJdGVtIiwicmVzaXplIiwiaGFuZGxlRGlzc2FncmVlQ2xpY2siLCJjaGVja1ZhbGlkT2JqZWN0Iiwib2JqIiwidW5kZWZpbmVkIiwia2V5cyIsImxlbmd0aCIsImlzTW9iaWxlRGV2aWNlIiwiY2hlY2siLCJhIiwidGVzdCIsInN1YnN0ciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInZlbmRvciIsIm9wZXJhIiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwiVWludDMyQXJyYXkiLCJqb2luIiwiaGFuZGxlRHJhd0J1dHRvbkNsaWNrIiwiZSIsInRhcmdldCIsImdldExheWVyIiwicmVtb3ZlTGF5ZXIiLCJnZXRTb3VyY2UiLCJyZW1vdmVTb3VyY2UiLCJjaGFuZ2VNb2RlIiwiaXNTdHVkeWNvbXBsZXRlZCIsInN0dWR5Q29tcGxldGVkIiwiU3R1ZHlBZ3JyZWVtZW50Iiwic3R1ZHlBZ3JyZWVkIiwieCIsInJlc3VsdCIsInkiLCJvZmZzZXRkaXN0IiwiYmJveCIsIm1pbiIsIm1heCIsInptIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZml0Qm91bmRzIiwibWF4Wm9vbSIsImdlb2NvZGVFbGVtIiwiYXBwZW5kQ2hpbGQiLCJvbkFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWdnZXN0aW9uc0VsZW0iLCJxdWVyeVNlbGVjdG9yIiwiZHJhd0NpcmNsZUVsZW1lbnQiLCJyZURyYXdDaXJjbGVFbGVtZW50IiwiaGFuZGxlU3RlcE5hdkNsaWNrIiwidmFsTm9kZSIsImdldEF0dHJpYnV0ZU5vZGUiLCJzdGVwTmF2MUVsZW0iLCJtYWluQ29udGVudEVsZW0iLCJzdGVwTmF2MkVsZW0iLCJzdGVwTmF2M0VsZW0iLCJoYW5kbGVTdWJtaXRCdXR0b25DbGljayIsInN1Ym1pdEJ1dHRvbkVsZW0iLCJjaXJjbGUiLCJsaW5lIiwiZGlzdGFuY2VrbSIsImRpc3RhbmNlZmVldCIsImRpcmVjdGlvbnNPbmUiLCJtaW5PbmUiLCJtYXhPbmUiLCJtZXNzYWdlSW5kZXhPbmUiLCJzdGVwRGlyZWN0aW9uczEiLCJpbm5lckhUTUwiLCJkaXJlY3Rpb25zVHdvIiwibWluVHdvIiwibWF4VHdvIiwibWVzc2FnZUluZGV4VHdvIiwic3RlcERpcmVjdGlvbnMyIiwiYWdncmVlQnV0dG9uRWxlbWVudCIsImRpc3NhZ2dyZWVCdXR0b25FbGVtZW50Iiwic3RlcDJNaW5vckRpcmVjdGlvbnNFbGVtZW50IiwiZHJhd19saW5lX3N0cmluZyIsImNyZWF0ZVZlcnRleCIsInBhcmVudElkIiwiY29vcmRpbmF0ZXMiLCJwYXRoIiwic2VsZWN0ZWQiLCJwcm9wZXJ0aWVzIiwibWV0YSIsInBhcmVudCIsImNvb3JkX3BhdGgiLCJhY3RpdmUiLCJnZW9tZXRyeSIsImNyZWF0ZUdlb0pTT05DaXJjbGUiLCJyYWRpdXNJbkttIiwicG9pbnRzIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJrbSIsInJldCIsImRpc3RhbmNlWCIsImNvcyIsIlBJIiwiZGlzdGFuY2VZIiwidGhldGEiLCJpIiwic2luIiwicHVzaCIsImdldERpc3BsYXlNZWFzdXJlbWVudHMiLCJmZWF0dXJlIiwiZHJhd25MZW5ndGgiLCJtZXRyaWNVbml0cyIsIm1ldHJpY0Zvcm1hdCIsIm1ldHJpY01lYXN1cmVtZW50Iiwic3RhbmRhcmRVbml0cyIsInN0YW5kYXJkRm9ybWF0Iiwic3RhbmRhcmRNZWFzdXJlbWVudCIsImRpc3BsYXlNZWFzdXJlbWVudHMiLCJtZXRyaWMiLCJmb3JtYXQiLCJzdGFuZGFyZCIsImRvdWJsZUNsaWNrWm9vbSIsImVuYWJsZSIsImN0eCIsInNldFRpbWVvdXQiLCJfY3R4IiwiZ2V0SW5pdGlhbENvbmZpZ1ZhbHVlIiwib25LZXlVcCIsInN0YXRlIiwia2V5Q29kZSIsImRlbGV0ZUZlYXR1cmUiLCJzaWxlbnQiLCJvblRvdWNoTW92ZURyYXciLCJjdXJyZW50VmVydGV4UG9zaXRpb24iLCJyZW1vdmVDb29yZGluYXRlIiwiYWRkQ29vcmRpbmF0ZSIsImxuZ0xhdCIsImxuZyIsImxhdCIsInVwZGF0ZUNvb3JkaW5hdGUiLCJkaXJlY3Rpb24iLCJpbnRlcmFjdGl2ZURyYXciLCJldmVudFR5cGUiLCJzZWxmIiwiZmVhdHVyZUlkcyIsInVwZGF0ZVVJQ2xhc3NlcyIsIm1vdXNlIiwib25Ub3VjaFN0YXJ0IiwicHJldmVudERlZmF1bHQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJjbGlja0FueXdoZXJlIiwib25TdG9wIiwiYWN0aXZhdGVVSUJ1dHRvbiIsImdldEZlYXR1cmUiLCJpc1ZhbGlkIiwibGluZUdlb0pzb24iLCJ0b0dlb0pTT04iLCJzdGFydFBvaW50IiwiZGlzdGFuY2UiLCJjaXJjbGVHZW9KU09OIiwiZmVldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjaXJjbGUyQnV0dG9uRWxlbSIsInBvaW50V2l0aFJhZGl1cyIsInJhZGl1c01ldHJpYyIsInRvRml4ZWQiLCJyYWRpdXNGZWV0IiwiYWRkU291cmNlIiwiYWRkTGF5ZXIiLCJzb3VyY2UiLCJmaXJlIiwiZmVhdHVyZXMiLCJ0b0Rpc3BsYXlGZWF0dXJlcyIsImdlb2pzb24iLCJkaXNwbGF5IiwiaXNBY3RpdmVMaW5lIiwiY3VycmVudFZlcnRleCIsInJhZGl1c1N0YW5kYXJkIiwiY2lyY2xlRmVhdHVyZSIsIlNUQVRFX0tFWSIsInN0b3JhZ2VBdmFpbGFibGUiLCJzdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwiY2hlY2tTdGF0ZUV4aXN0cyIsImdldFN0YXRlIiwia2V5Iiwic3RvcmVPYmoiLCJuZXdTdGF0ZU9iaiIsInNldFN0YXRlIiwicGFyc2UiLCJnZXRJdGVtIiwiY2hlY2tJdGVtIiwic2V0SXRlbSIsIkJvb2xlYW4iLCJpdGVtIiwic3RhdGVTdHIiLCJnZXRTdGF0ZUFzU3RyaW5nIiwiaW5kZXhPZiIsInJlbW92ZUl0ZW0iLCJET01FeGNlcHRpb24iLCJjb2RlIiwibmFtZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QWpCLElBQXlCLENBQTdCLEVBQWdDO0FBQzlCLGlCQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0QsYUFBTyxLQUFQO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBOzs7OzhCQUNVQSxJLEVBQU07QUFDZCxhQUFPLEtBQUtYLGdCQUFMLE1BQTJCLEtBQUthLGdCQUFMLEdBQXdCQyxPQUF4QixDQUFnQ0gsSUFBaEMsSUFBd0MsQ0FBMUU7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7Ozt1Q0FDMEI7QUFDeEIsVUFBTXBTLE9BQU8sY0FBYjtBQUNBLFVBQUl1UixnQkFBSjtBQUNBLFVBQUk7QUFDRkEsa0JBQVVoUCxPQUFPdkMsSUFBUCxDQUFWO0FBQ0EsWUFBTWdJLElBQUksa0JBQVY7QUFDQXVKLGdCQUFRVyxPQUFSLENBQWdCbEssQ0FBaEIsRUFBbUJBLENBQW5CO0FBQ0F1SixnQkFBUWlCLFVBQVIsQ0FBbUJ4SyxDQUFuQjtBQUNBLGVBQU8sSUFBUDtBQUNELE9BTkQsQ0FNRSxPQUFPWCxDQUFQLEVBQVU7QUFDVixlQUFPQSxhQUFhb0wsWUFBYjtBQUNMO0FBQ0FwTCxVQUFFcUwsSUFBRixLQUFXLEVBQVg7QUFDQTtBQUNBckwsVUFBRXFMLElBQUYsS0FBVyxJQUZYO0FBR0E7QUFDQTtBQUNBckwsVUFBRXNMLElBQUYsS0FBVyxvQkFMWDtBQU1BO0FBQ0F0TCxVQUFFc0wsSUFBRixLQUFXLDRCQVROO0FBVUw7QUFDQXBCLGdCQUFRakwsTUFBUixLQUFtQixDQVhyQjtBQVlEO0FBQ0YiLCJmaWxlIjoiaW5kZXguYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiOWU2YWZhN2Y2YjI0MjBmYTQzZmNcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc35pbmRleFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9OWUNQbGFubmluZy9sYWJzLWZhY3RmaW5kZXIvYmxvYi80YTY3ZGEyNzNiNmZmODc1ODhmNTA0NGExNWIzNDkwZDRhYzA3YTI1L2FwcC9sYXllcnMvZHJhdy1zdHlsZXMuanNcbmV4cG9ydCBkZWZhdWx0IFtcbiAgLy8gQUNUSVZFIChiZWluZyBkcmF3bilcbiAgLy8gbGluZSBzdHJva2VcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1saW5lJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnTGluZVN0cmluZyddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnI0Q5NkIyNycsXG4gICAgICAnbGluZS1kYXNoYXJyYXknOiBbMC4yLCAyXSxcbiAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgIH1cbiAgfSxcblxuICAvLyBwb2x5Z29uIGZpbGxcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWZpbGwnLFxuICAgIHR5cGU6ICdmaWxsJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdmaWxsLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgJ2ZpbGwtb3V0bGluZS1jb2xvcic6ICcjRDIwQzBDJyxcbiAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICB9XG4gIH0sXG5cbiAgLy8gcG9seWdvbiBvdXRsaW5lIHN0cm9rZVxuICAvLyBUaGlzIGRvZXNuJ3Qgc3R5bGUgdGhlIGZpcnN0IGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHdoaWNoIHVzZXMgdGhlIGxpbmUgc3Ryb2tlIHN0eWxpbmcgaW5zdGVhZFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tc3Ryb2tlLWFjdGl2ZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAnbGluZS13aWR0aCc6IDRcbiAgICB9XG4gIH0sXG4gIC8vIHZlcnRleCBwb2ludCBoYWxvc1xuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tYW5kLWxpbmUtdmVydGV4LWhhbG8tYWN0aXZlJyxcbiAgICB0eXBlOiAnY2lyY2xlJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICdtZXRhJywgJ3ZlcnRleCddLCBbJz09JywgJyR0eXBlJywgJ1BvaW50J10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdjaXJjbGUtcmFkaXVzJzogNyxcbiAgICAgICdjaXJjbGUtY29sb3InOiAnI0ZGRidcbiAgICB9XG4gIH0sXG4gIC8vIHZlcnRleCBwb2ludHNcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWFuZC1saW5lLXZlcnRleC1hY3RpdmUnLFxuICAgIHR5cGU6ICdjaXJjbGUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJ21ldGEnLCAndmVydGV4J10sIFsnPT0nLCAnJHR5cGUnLCAnUG9pbnQnXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2NpcmNsZS1yYWRpdXMnOiA2LFxuICAgICAgJ2NpcmNsZS1jb2xvcic6ICcjRDk2QjI3J1xuICAgIH1cbiAgfSxcblxuICAvLyByYWRpdXMgbGFiZWxcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1yYWRpdXMtbGFiZWwnLFxuICAgIHR5cGU6ICdzeW1ib2wnLFxuICAgIGZpbHRlcjogWyc9PScsICdtZXRhJywgJ2N1cnJlbnRQb3NpdGlvbiddLFxuICAgIGxheW91dDoge1xuICAgICAgJ3RleHQtZmllbGQnOiAne3JhZGl1c0ZlZXR9IFxcbiB7cmFkaXVzTWlsZXN9JyxcbiAgICAgICd0ZXh0LWFuY2hvcic6ICdsZWZ0JyxcbiAgICAgICd0ZXh0LW9mZnNldCc6IFtcbiAgICAgICAgMSxcbiAgICAgICAgMFxuICAgICAgXSxcbiAgICAgICd0ZXh0LXNpemUnOiAyMlxuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICd0ZXh0LWNvbG9yJzogJ3JnYmEoMCwgMCwgMCwgMSknLFxuICAgICAgJ3RleHQtaGFsby1jb2xvcic6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJyxcbiAgICAgICd0ZXh0LWhhbG8td2lkdGgnOiAzLFxuICAgICAgJ2ljb24tb3BhY2l0eSc6IHtcbiAgICAgICAgYmFzZTogMSxcbiAgICAgICAgc3RvcHM6IFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICA3Ljk5LFxuICAgICAgICAgICAgMVxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICBdXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICAndGV4dC1oYWxvLWJsdXInOiAxXG4gICAgfVxuICB9LFxuXG4gIC8vIElOQUNUSVZFIChzdGF0aWMsIGFscmVhZHkgZHJhd24pXG4gIC8vIGxpbmUgc3Ryb2tlXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctbGluZS1zdGF0aWMnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdMaW5lU3RyaW5nJ10sIFsnPT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdsaW5lLXdpZHRoJzogM1xuICAgIH1cbiAgfSxcbiAgLy8gcG9seWdvbiBmaWxsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1maWxsLXN0YXRpYycsXG4gICAgdHlwZTogJ2ZpbGwnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWyc9PScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2ZpbGwtY29sb3InOiAnIzAwMCcsXG4gICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuMVxuICAgIH1cbiAgfSxcbiAgLy8gcG9seWdvbiBvdXRsaW5lXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1zdHJva2Utc3RhdGljJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJz09JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnIzAwMCcsXG4gICAgICAnbGluZS13aWR0aCc6IDNcbiAgICB9XG4gIH1cbl07XG4iLCJpbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBkYXRhcGkgPSAnaHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5bjAyRkt0Vm9rU18yR1psR3RWV1JISjdPZkVIbjdZSEhnR21kV1pORTdNOE1HbUg0L2V4ZWMnO1xuXG5leHBvcnQgY2xhc3MgR29vZ2xlQW5hbHl0aWNzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb28gPSB7fTtcbiAgfVxuXG4gIHNldEV2ZW50KGFjdGlvbiA9ICcnLCBjYXRlZ29yeSA9ICcnLCBsYWJlbCA9ICcnLCB2YWx1ZSA9IDApIHtcbiAgICBjb25zdCB1dWlkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCd1dWlkJyk7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICBjb25zdCBkYXRhID0gbGFiZWw7XG5cbiAgICBjb25zdCBmb29PYmogPSB0aGlzLmZvbzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGd0YWcoJ2V2ZW50JywgdXVpZCwgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgICAgZXZlbnRfbGFiZWw6IGxhYmVsLFxuICAgICAgdmFsdWU6IGAke3ZhbHVlfWAsXG4gICAgICB1dWlkXG4gICAgfSk7XG5cbiAgICAvLyBzaW5jZSBGRiBjb3VsZCBiZSBibG9ja2luZyBnYSB3cml0aW5nIGRhdGEgaGVyZSBhcyBiYWNrdXBcbiAgICBjb25zdCBqc29uZGF0YSA9IHtcbiAgICAgIHV1aWQsXG4gICAgICBjYXRlZ29yeSxcbiAgICAgIGRhdGEsXG4gICAgICBkYXRlXG4gICAgfTtcblxuICAgIGNvbnN0IGRhdGFBUElVUkwgPSBuZXcgVVJMKGRhdGFwaSk7XG4gICAgZGF0YUFQSVVSTC5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGpzb25kYXRhKTtcbiAgICBmZXRjaChkYXRhQVBJVVJMKTtcbiAgfVxufVxuIiwiLy8gaW1wb3J0IGRlcGVuZGVuY2llc1xuaW1wb3J0IHsgbGlicmFyeSwgZG9tIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcbmltcG9ydCB7IGZhcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBmYXIgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1yZWd1bGFyLXN2Zy1pY29ucyc7XG5pbXBvcnQgbWFwYm94Z2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWRyYXcnO1xuaW1wb3J0IE1hcGJveEdlb2NvZGVyIGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWdlb2NvZGVyJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgUmFkaXVzTW9kZSBmcm9tICcuL3JhZGl1c01vZGUnO1xuaW1wb3J0IGRyYXdTdHlsZXMgZnJvbSAnLi9kcmF3c3R5bGVzJztcbmltcG9ydCB7IEdvb2dsZUFuYWx5dGljcyB9IGZyb20gJy4vZ2EnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5jb25zdCBnb29nbGVBbmFseXRpY3MgPSBuZXcgR29vZ2xlQW5hbHl0aWNzKCk7XG5cblxuLy8gS2lja3Mgb2ZmIHRoZSBwcm9jZXNzIG9mIGZpbmRpbmcgPGk+IHRhZ3MgYW5kIHJlcGxhY2luZyB3aXRoIDxzdmc+XG4vLyBhZGRlcyBzdXBwb3J0IGZvciBmb250YXdlc29tZVxubGlicmFyeS5hZGQoZmFzLCBmYXIpO1xuZG9tLndhdGNoKCk7XG5cbmNvbnN0IHVybFN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuY29uc3QgdXJsID0gbmV3IFVSTCh1cmxTdHJpbmcpO1xuY29uc3QgdXNlclR5cGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgndXNlclR5cGUnKTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzdHVkeSBzdGFydGVkJywgJ3RydWUnKTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICd1c2VyVHlwZScsIHVzZXJUeXBlKTtcblxubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuXG5jb25zdCBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcbiAgY29udGFpbmVyOiAnbWFwJyxcbiAgc3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJyxcbiAgLy8gJ21hcGJveDovL3N0eWxlcy9kYXZlaXNtL2Nqd3JyZGZkMjB1aWMxZG56c3RpMm93bGsnLCAtIGRhcmtcbiAgY2VudGVyOiBbLTk4LCAzOC44OF0sIC8vIHN0YXJ0aW5nIHBvc2l0aW9uIFtsbmcsIGxhdF1cbiAgem9vbTogMywgLy8gc3RhcnRpbmcgem9vbVxuICBzaG93Wm9vbTogdHJ1ZSxcbiAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICBrZXliaW5kaW5nczogdHJ1ZVxufSk7XG5cblxuLy8gc2V0dXAgbWFwXG5jb25zdCBkcmF3Q29udHJvbCA9IG5ldyBNYXBib3hEcmF3KHtcbiAgZGlzcGxheUNvbnRyb2xzRGVmYXVsdDogdHJ1ZSxcbiAgY29udHJvbHM6IHtcbiAgICByZWN0YW5nbGU6IHRydWUsXG4gICAgcG9seWdvbjogdHJ1ZSxcbiAgICBsaW5lX3N0cmluZzogdHJ1ZSxcbiAgICB0cmFzaDogdHJ1ZVxuICB9LFxuICBvcHRpb25zOiB7XG4gICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgIGtleWJpbmRpbmdzOiB0cnVlLFxuICAgIHRvdWNoQnVmZmVyOiAxMFxuICB9LFxuICBzdHlsZXM6IGRyYXdTdHlsZXMsXG4gIG1vZGVzOiBPYmplY3QuYXNzaWduKHtcbiAgICBkcmF3X3JhZGl1czogUmFkaXVzTW9kZVxuICB9LCBNYXBib3hEcmF3Lm1vZGVzKVxufSk7XG5cbm1hcC5hZGRDb250cm9sKGRyYXdDb250cm9sKTtcblxuY29uc3QgbmF2ID0gbmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKCk7XG5tYXAuYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xuXG5jb25zdCBnZW9jb2RlciA9IG5ldyBNYXBib3hHZW9jb2Rlcih7XG4gIGFjY2Vzc1Rva2VuOiBtYXBib3hnbC5hY2Nlc3NUb2tlbixcbiAgbWFwYm94Z2wsXG4gIHNldFpvb206IDgsXG4gIGZseVRvOiBmYWxzZSxcbiAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggZm9yIGEgbG9jYXRpb24uLi4nXG59KTtcblxubWFwLm9uKCd6b29tZW5kJywgKCkgPT4ge1xuICBpZiAobWFwLmdldFpvb20oKSA+IDEwKSB7XG4gICAgY29uc3QgY2lyY2xlQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uJyk7XG4gICAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICBjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnaGlkZScpO1xuICAgICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdkaXNhYmxlJyk7XG4gICAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi10aXRsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItZGlyZWN0aW9ucycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gZnVuY3Rpb25cbmZ1bmN0aW9uIGhhbmRsZUFncmVlQ2xpY2soKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktYWdyZWVtZW50LWFsbCcpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktZGlzc2FnZ3JlZScpLnJlbW92ZSgpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIHRydWUpO1xuICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdoLTgwJyk7XG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtYWN0aW9uLWhvbGRlcicpLmNsYXNzTGlzdC5hZGQoJ2gtNzAnKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGFydC1oZWlnaHQtYWN0aW9ucycpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJ0LWhlaWdodC1tYXAnKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWFjdGlvbi1ob2xkZXInKS5jbGFzc0xpc3QuYWRkKCdzdGVwLWhlaWdodC1hY3Rpb25zJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtaG9sZGVyJykuY2xhc3NMaXN0LmFkZCgnc3RlcC1oZWlnaHQtbWFwJyk7XG4gIG1hcC5yZXNpemUoKTtcbiAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0dWR5LWFncmVlbWVudCcsIHRydWUpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGlzc2FncmVlQ2xpY2soKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktZGlzc2FnZ3JlZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktYWdyZWVtZW50LWFsbCcpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCBmYWxzZSk7XG4gIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzdHVkeS1hZ3JlZW1lbnQnLCBmYWxzZSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGVuc3VyZSB0aGUgb2JqZWN0IG9yIHZhcmlhYmxlIGlzIHZhbGlkLi4uXG4vLyBAcGFyYW0gb2JqIC0gdHlwZWxlc3NcbmZ1bmN0aW9uIGNoZWNrVmFsaWRPYmplY3Qob2JqKSB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnICYmIG9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzTW9iaWxlRGV2aWNlKCkge1xuICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgKGZ1bmN0aW9uKGEpe2lmKC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm98YW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKSBjaGVjayA9IHRydWU7fSkobmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICByZXR1cm4gY2hlY2s7XG59XG5cbmZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSg0KSkuam9pbignLScpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmF3QnV0dG9uQ2xpY2soZSkge1xuICBjb25zdCBjaXJjbGVCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZS50YXJnZXQuaWR9YCk7XG4gIGlmIChjaXJjbGVCdXR0b25FbGVtKSB7XG4gICAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICAkKGAjJHtlLnRhcmdldC5pZH1gKS50b29sdGlwKHsgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyB9KTtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoJ3Nob3cnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAgICQoYCMke2UudGFyZ2V0LmlkfWApLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICB9XG4gIH1cblxuICBkcmF3Q29udHJvbC50cmFzaCgpO1xuXG4gIGlmIChtYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1saW5lJykpIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1saW5lJyk7XG4gIH1cblxuICBpZiAobWFwLmdldExheWVyKCdjaXJjbGUtZmlsbCcpKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtZmlsbCcpO1xuICB9XG4gIGlmIChtYXAuZ2V0U291cmNlKCdjaXJjbGUnKSkge1xuICAgIG1hcC5yZW1vdmVTb3VyY2UoJ2NpcmNsZScpO1xuICB9XG5cbiAgZHJhd0NvbnRyb2wuY2hhbmdlTW9kZSgnZHJhd19yYWRpdXMnKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGNoZWNrIHN0dWR5IHNlc3Npb24gc3RhdGUgZm9yIGNvbXBsZXRldGlvblxuY29uc3QgaXNTdHVkeWNvbXBsZXRlZCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHljb21wbGV0ZWQnKTtcbmxldCBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBpc1N0dWR5Y29tcGxldGVkID09PSAnYm9vbGVhbicpIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBpc1N0dWR5Y29tcGxldGVkO1xufSBlbHNlIHtcbiAgc3R1ZHlDb21wbGV0ZWQgPSBmYWxzZTtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBTdHVkeUFncnJlZW1lbnQgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcpO1xubGV0IHN0dWR5QWdycmVlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBTdHVkeUFncnJlZW1lbnQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUFncnJlZWQgPSBTdHVkeUFncnJlZW1lbnQ7XG59IGVsc2Uge1xuICBzdHVkeUFncnJlZWQgPSBmYWxzZTtcbn1cblxuLy8gYWxyZWFkeSBhZ3JlZWRcbmlmIChzdHVkeUFncnJlZWQpIHtcbiAgLy8gaGFuZGxlQWdyZWVDbGljaygpO1xufVxuXG4vLyBoaWRlIHN0dWR5XG5pZiAoc3R1ZHlDb21wbGV0ZWQpIHsgLy8gfHwgc3R1ZHlBZ3JyZWVkXG4gIGhhbmRsZUFncmVlQ2xpY2soKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LWNvbXBsZXRlJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLnJlbW92ZSgpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWhvbGRlcicpLnJlbW92ZSgpO1xufSBlbHNlIHtcbiAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHljb21wbGV0ZWQnLCBmYWxzZSk7XG59XG5cbmlmICghY2hlY2tWYWxpZE9iamVjdChzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKSkpIHtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCd1dWlkJywgdXVpZCgpKTtcbn1cblxuZ2VvY29kZXIub24oJ3Jlc3VsdCcsIChlKSA9PiB7XG4gIGNvbnN0IHggPSBlLnJlc3VsdC5jZW50ZXJbMF07XG4gIGNvbnN0IHkgPSBlLnJlc3VsdC5jZW50ZXJbMV07XG5cbiAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3NlYXJjaHBvaW50JywgYCR7eH0sICR7eX1gKTtcblxuICBjb25zdCBvZmZzZXRkaXN0ID0gMC4wMDI1O1xuICBjb25zdCBiYm94ID0gW1t4IC0gb2Zmc2V0ZGlzdCwgeSAtIG9mZnNldGRpc3RdLCBbeCArIG9mZnNldGRpc3QsIHkgKyBvZmZzZXRkaXN0XV07XG5cbiAgLy8gY3JlYXRlIHJhbmRvbSB6b29tIGluY2FzZSB1c2VycyBhcmUgaW5mbHVlbmNlZCBieSBpbnRpYWwgem9vbWxldmVsXG4gIGxldCBtaW4gPSAxMDtcbiAgbGV0IG1heCA9IDE0O1xuICBpZiAoaXNNb2JpbGVEZXZpY2UoKSkge1xuICAgIG1pbiA9IDEwO1xuICAgIG1heCA9IDE1O1xuICB9XG5cbiAgY29uc3Qgem0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICBtYXAuZml0Qm91bmRzKGJib3gsIHsgbWF4Wm9vbTogem0gfSk7XG5cbiAgLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbiAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3NlYXJjaHpvb20nLCB6bSk7XG5cblxuICBjb25zdCBjaXJjbGVCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1idXR0b24nKTtcbiAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdtYW51YWwnIH0pO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnaGlkZScpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzcG9zZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi10aXRsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLWRpcmVjdGlvbnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMScpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTInKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgfVxufSk7XG5cbmNvbnN0IGdlb2NvZGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlb2NvZGVyJyk7XG5pZiAoZ2VvY29kZUVsZW0pIHtcbiAgZ2VvY29kZUVsZW0uYXBwZW5kQ2hpbGQoZ2VvY29kZXIub25BZGQobWFwKSk7XG5cbiAgZ2VvY29kZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG4gICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGdlb2NvZGVFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZCcpO1xuICAgIGdlb2NvZGVFbGVtLmNsYXNzTGlzdC5hZGQoJ2V4cGFuZCcpO1xuICB9KTtcbn1cblxuY29uc3Qgc3VnZ2VzdGlvbnNFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dlb2NvZGVyIC5zdWdnZXN0aW9ucy13cmFwcGVyJyk7XG5pZiAoc3VnZ2VzdGlvbnNFbGVtKSB7XG4gIHN1Z2dlc3Rpb25zRWxlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHtcbiAgICBjb25zdCBnZW9jb2RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW9jb2RlcicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZ2VvY29kZUVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kJyk7XG4gIH0pO1xufVxuXG5jb25zdCBkcmF3Q2lyY2xlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tZHJhdy1jaXJjbGUnKTtcbmlmIChkcmF3Q2lyY2xlRWxlbWVudCkge1xuICBkcmF3Q2lyY2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURyYXdCdXR0b25DbGljayk7XG59XG5cbmNvbnN0IHJlRHJhd0NpcmNsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJlZHJhdy1jaXJjbGUnKTtcbmlmIChyZURyYXdDaXJjbGVFbGVtZW50KSB7XG4gIHJlRHJhd0NpcmNsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEcmF3QnV0dG9uQ2xpY2spO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdGVwTmF2Q2xpY2soZSkge1xuICBjb25zdCB2YWxOb2RlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlTm9kZSgndmFsJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHZhbE5vZGUpIHtcbiAgICBjb25zdCBnZW9jb2RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW9jb2RlcicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKGdlb2NvZGVFbGVtKSB7XG4gICAgICBnZW9jb2RlRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0xJykuY2xhc3NMaXN0LnJlbW92ZSgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC0xJykuY2xhc3NMaXN0LmFkZCgnc3RlcC1ub3QtdmlzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtMicpLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtbm90LXZpcycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QuYWRkKCdzdGVwLW5vdC12aXMnKTtcbiAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZU5vZGUoJ3ZhbCcpLnZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dmFsdWV9YCkuY2xhc3NMaXN0LnJlbW92ZSgnc3RlcC1ub3QtdmlzJyk7XG4gIH1cbn1cblxuY29uc3Qgc3RlcE5hdjFFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAtbmF2LTEnKTtcbmlmIChzdGVwTmF2MUVsZW0pIHtcbiAgc3RlcE5hdjFFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3RlcE5hdkNsaWNrKTtcbn1cblxuY29uc3QgbWFpbkNvbnRlbnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY29udGVudCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5pZiAobWFpbkNvbnRlbnRFbGVtKSB7XG4gIG1haW5Db250ZW50RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21hcGJveGdsLWN0cmwtZ2VvY29kZXItLWlucHV0JykpIHtcbiAgICAgIGNvbnN0IGdlb2NvZGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlb2NvZGVyJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGlmIChnZW9jb2RlRWxlbSkge1xuICAgICAgICBnZW9jb2RlRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdleHBhbmQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBzdGVwTmF2MkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC1uYXYtMicpO1xuaWYgKHN0ZXBOYXYyRWxlbSkge1xuICBzdGVwTmF2MkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTdGVwTmF2Q2xpY2spO1xufVxuXG5jb25zdCBzdGVwTmF2M0VsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcC1uYXYtMycpO1xuaWYgKHN0ZXBOYXYzRWxlbSkge1xuICBzdGVwTmF2M0VsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTdGVwTmF2Q2xpY2spO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdWJtaXRCdXR0b25DbGljayhlKSB7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbicpO1xuICBpZiAoc3VibWl0QnV0dG9uRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAkKCcjc3VibWl0LWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnIH0pO1xuICAgICQoJyNzdWJtaXQtYnV0dG9uJykudG9vbHRpcCgnc2hvdycpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKHsgdHJpZ2dlcjogJ21hbnVhbCcgfSk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdoaWRlJyk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdkaXNhYmxlJyk7XG4gICAgJCgnI3N1Ym1pdC1idXR0b24nKS50b29sdGlwKCdkaXNwb3NlJyk7XG5cbiAgICBjb25zdCBjaXJjbGUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2NpcmNsZScpO1xuICAgIGNvbnN0IGxpbmUgPSBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ2xpbmUnKTtcbiAgICBjb25zdCBkaXN0YW5jZWttID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZWttJyk7XG4gICAgY29uc3QgZGlzdGFuY2VmZWV0ID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdkaXN0YW5jZWZlZXQnKTtcblxuICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2NpcmNsZS1zdWJtaXR0ZWQnLCBjaXJjbGUpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdsaW5lLXN1Ym1pdHRlZCcsIGxpbmUpO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdkaXN0YW5jZWttLXN1Ym1pdHRlZCcsIGRpc3RhbmNla20pO1xuICAgIGdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdkaXN0YW5jZWZlZXQtc3VibWl0dGVkJywgZGlzdGFuY2VmZWV0KTtcblxuICAgIC8vIGVuZCBzdHVkeVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1jb21wbGV0ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLnJlbW92ZSgpO1xuICAgIHN0b3JlLnNldFN0YXRlSXRlbSgnc3R1ZHljb21wbGV0ZWQnLCB0cnVlKTtcblxuICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ3N0dWR5Y29tcGxldGVkJywgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IHN1Ym1pdEJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbicpO1xuaWYgKHN1Ym1pdEJ1dHRvbkVsZW0pIHtcbiAgc3VibWl0QnV0dG9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVN1Ym1pdEJ1dHRvbkNsaWNrKTtcbn1cblxuY29uc3QgZGlyZWN0aW9uc09uZSA9IFtcbiAgJ1NlYXJjaCBmb3IgYSBsb2NhdGlvbiB5b3UgY2FyZSBhYm91dC4nLFxuICAnU2VhcmNoIGZvciBhIGxvY2F0aW9uIHRvIGZpbmQgYWJvdXQgY3JpbWUuJyxcbiAgJ1NlYXJjaCBmb3IgYSBsb2NhdGlvbiB0byBmaW5kIGFib3V0IGEgcGl6emEgcGxhY2UuJ1xuXTtcblxuY29uc3QgbWluT25lID0gMDtcbmNvbnN0IG1heE9uZSA9IDI7XG5jb25zdCBtZXNzYWdlSW5kZXhPbmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4T25lIC0gbWluT25lICsgMSkgKyBtaW5PbmUpO1xuY29uc3Qgc3RlcERpcmVjdGlvbnMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAxLWRpcmVjdGlvbnMnKTtcbmlmIChzdGVwRGlyZWN0aW9uczEpIHtcbiAgc3RlcERpcmVjdGlvbnMxLmlubmVySFRNTCA9IGRpcmVjdGlvbnNPbmVbbWVzc2FnZUluZGV4T25lXTtcbn1cblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljcy5zZXRFdmVudCgnZGF0YScsICdzdGVwMXRleHQnLCBkaXJlY3Rpb25zT25lW21lc3NhZ2VJbmRleE9uZV0pO1xuXG5jb25zdCBkaXJlY3Rpb25zVHdvID0gW1xuICAnRHJhdyBhIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgMSBtaWxlIGZyb20gdGhlIGxvY2F0aW9uLicsXG4gICdEcmF3IGEgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyBhIDUgbWludXRlIDxzdHJvbmc+RFJJVkU8L3N0cm9uZz4uJyxcbiAgJ0RyYXcgYSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIGEgNSBtaW51dGUgPHN0cm9uZz5XQUxLPC9zdHJvbmc+Lidcbl07XG5cbmNvbnN0IG1pblR3byA9IDA7XG5jb25zdCBtYXhUd28gPSAyO1xuY29uc3QgbWVzc2FnZUluZGV4VHdvID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heFR3byAtIG1pblR3byArIDEpICsgbWluVHdvKTtcbmNvbnN0IHN0ZXBEaXJlY3Rpb25zMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi1kaXJlY3Rpb25zJyk7XG5pZiAoc3RlcERpcmVjdGlvbnMyKSB7XG4gIHN0ZXBEaXJlY3Rpb25zMi5pbm5lckhUTUwgPSBkaXJlY3Rpb25zVHdvW21lc3NhZ2VJbmRleFR3b107XG59XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnc3RlcDJ0ZXh0JywgZGlyZWN0aW9uc1R3b1ttZXNzYWdlSW5kZXhUd29dKTtcblxuY29uc3QgYWdncmVlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2dyZWUtYnV0dG9uJyk7XG5pZiAoYWdncmVlQnV0dG9uRWxlbWVudCkge1xuICBhZ2dyZWVCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQWdyZWVDbGljayk7XG59XG5cbmNvbnN0IGRpc3NhZ2dyZWVCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWdncmVlLWJ1dHRvbicpO1xuaWYgKGRpc3NhZ2dyZWVCdXR0b25FbGVtZW50KSB7XG4gIGRpc3NhZ2dyZWVCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRGlzc2FncmVlQ2xpY2spO1xufVxuXG5jb25zdCBzdGVwMk1pbm9yRGlyZWN0aW9uc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDItbWlub3ItZGlyZWN0aW9ucycpO1xuaWYgKHN0ZXAyTWlub3JEaXJlY3Rpb25zRWxlbWVudCkge1xuICBpZiAoaXNNb2JpbGVEZXZpY2UoKSkge1xuICAgIHN0ZXAyTWlub3JEaXJlY3Rpb25zRWxlbWVudC5pbm5lckhUTUwgPSAnQ2xpY2sgb24gdGhlIG1hcCwgdGhlbiBkcmFnIHlvdXIgZmluZ2VyIGFjcm9zcyB0aGUgbWFwIHVudGlsIHRoZSBjaXJjbGUgYmVzdCByZXByZXNlbnRzIHRoZSBkaXN0YW5jZS4nO1xuICB9XG59XG4iLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9jaHJpc3dob25nLzY5NDc3OWJjMWYxZTVkOTI2ZTQ3YmFiNzIwNWZhNTU5XG4vLyBjdXN0b20gbWFwYm9weC1nbC1kcmF3IG1vZGUgdGhhdCBtb2RpZmllcyBkcmF3X2xpbmVfc3RyaW5nXG4vLyBzaG93cyBhIGNlbnRlciBwb2ludCwgcmFkaXVzIGxpbmUsIGFuZCBjaXJjbGUgcG9seWdvbiB3aGlsZSBkcmF3aW5nXG4vLyBmb3JjZXMgZHJhdy5jcmVhdGUgb24gY3JlYXRpb24gb2Ygc2Vjb25kIHZlcnRleFxuaW1wb3J0IE1hcGJveERyYXcgZnJvbSAnQG1hcGJveC9tYXBib3gtZ2wtZHJhdyc7XG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJztcbmltcG9ydCBsaW5lRGlzdGFuY2UgZnJvbSAnQHR1cmYvbGluZS1kaXN0YW5jZSc7XG5pbXBvcnQgeyBHb29nbGVBbmFseXRpY3MgfSBmcm9tICcuL2dhJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcbmNvbnN0IFJhZGl1c01vZGUgPSBNYXBib3hEcmF3Lm1vZGVzLmRyYXdfbGluZV9zdHJpbmc7XG5jb25zdCBnb29nbGVBbmFseXRpY3MgPSBuZXcgR29vZ2xlQW5hbHl0aWNzKCk7XG5cbi8vIHN0b3JlLnNldFN0YXRlSXRlbSgnaXNUb3VjaE1vdmUnLCB0cnVlKTtcblxuZnVuY3Rpb24gY3JlYXRlVmVydGV4KHBhcmVudElkLCBjb29yZGluYXRlcywgcGF0aCwgc2VsZWN0ZWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbWV0YTogJ3ZlcnRleCcsXG4gICAgICBwYXJlbnQ6IHBhcmVudElkLFxuICAgICAgY29vcmRfcGF0aDogcGF0aCxcbiAgICAgIGFjdGl2ZTogKHNlbGVjdGVkKSA/ICd0cnVlJyA6ICdmYWxzZSdcbiAgICB9LFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXNcbiAgICB9XG4gIH07XG59XG5cbi8vIGNyZWF0ZSBhIGNpcmNsZS1saWtlIHBvbHlnb24gZ2l2ZW4gYSBjZW50ZXIgcG9pbnQgYW5kIHJhZGl1c1xuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzc1OTk1NjEvZHJhd2luZy1hLWNpcmNsZS13aXRoLXRoZS1yYWRpdXMtaW4tbWlsZXMtbWV0ZXJzLXdpdGgtbWFwYm94LWdsLWpzLzM5MDA2Mzg4IzM5MDA2Mzg4XG5mdW5jdGlvbiBjcmVhdGVHZW9KU09OQ2lyY2xlKGNlbnRlciwgcmFkaXVzSW5LbSwgcGFyZW50SWQsIHBvaW50cyA9IDY0KSB7XG4gIGNvbnN0IGNvb3JkcyA9IHtcbiAgICBsYXRpdHVkZTogY2VudGVyWzFdLFxuICAgIGxvbmdpdHVkZTogY2VudGVyWzBdXG4gIH07XG5cbiAgY29uc3Qga20gPSByYWRpdXNJbkttO1xuXG4gIGNvbnN0IHJldCA9IFtdO1xuICBjb25zdCBkaXN0YW5jZVggPSBrbSAvICgxMTEuMzIwICogTWF0aC5jb3MoKGNvb3Jkcy5sYXRpdHVkZSAqIE1hdGguUEkpIC8gMTgwKSk7XG4gIGNvbnN0IGRpc3RhbmNlWSA9IGttIC8gMTEwLjU3NDtcblxuICBsZXQgdGhldGE7XG4gIGxldCB4O1xuICBsZXQgeTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHM7IGkgKz0gMSkge1xuICAgIHRoZXRhID0gKGkgLyBwb2ludHMpICogKDIgKiBNYXRoLlBJKTtcbiAgICB4ID0gZGlzdGFuY2VYICogTWF0aC5jb3ModGhldGEpO1xuICAgIHkgPSBkaXN0YW5jZVkgKiBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICByZXQucHVzaChbY29vcmRzLmxvbmdpdHVkZSArIHgsIGNvb3Jkcy5sYXRpdHVkZSArIHldKTtcbiAgfVxuICByZXQucHVzaChyZXRbMF0pO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICBjb29yZGluYXRlczogW3JldF1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHBhcmVudDogcGFyZW50SWQsXG4gICAgICBhY3RpdmU6ICd0cnVlJ1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheU1lYXN1cmVtZW50cyhmZWF0dXJlKSB7XG4gIC8vIHNob3VsZCBsb2cgYm90aCBtZXRyaWMgYW5kIHN0YW5kYXJkIGRpc3BsYXkgc3RyaW5ncyBmb3IgdGhlIGN1cnJlbnQgZHJhd24gZmVhdHVyZVxuICAvLyBtZXRyaWMgY2FsY3VsYXRpb25cbiAgY29uc3QgZHJhd25MZW5ndGggPSAobGluZURpc3RhbmNlKGZlYXR1cmUpICogMTAwMCk7IC8vIG1ldGVyc1xuXG4gIGxldCBtZXRyaWNVbml0cyA9ICdtJztcbiAgbGV0IG1ldHJpY0Zvcm1hdCA9ICcwLDAnO1xuICBsZXQgbWV0cmljTWVhc3VyZW1lbnQ7XG5cbiAgbGV0IHN0YW5kYXJkVW5pdHMgPSAnZmVldCc7XG4gIGxldCBzdGFuZGFyZEZvcm1hdCA9ICcwLDAnO1xuICBsZXQgc3RhbmRhcmRNZWFzdXJlbWVudDtcblxuICBtZXRyaWNNZWFzdXJlbWVudCA9IGRyYXduTGVuZ3RoO1xuICBpZiAoZHJhd25MZW5ndGggPj0gMTAwMCkgeyAvLyBpZiBvdmVyIDEwMDAgbWV0ZXJzLCB1cGdyYWRlIG1ldHJpY1xuICAgIG1ldHJpY01lYXN1cmVtZW50ID0gZHJhd25MZW5ndGggLyAxMDAwO1xuICAgIG1ldHJpY1VuaXRzID0gJ2ttJztcbiAgICBtZXRyaWNGb3JtYXQgPSAnMC4wMCc7XG4gIH1cblxuICBzdGFuZGFyZE1lYXN1cmVtZW50ID0gZHJhd25MZW5ndGggKiAzLjI4MDg0O1xuICBpZiAoc3RhbmRhcmRNZWFzdXJlbWVudCA+PSA1MjgwKSB7IC8vIGlmIG92ZXIgNTI4MCBmZWV0LCB1cGdyYWRlIHN0YW5kYXJkXG4gICAgc3RhbmRhcmRNZWFzdXJlbWVudCAvPSA1MjgwO1xuICAgIHN0YW5kYXJkVW5pdHMgPSAnbWknO1xuICAgIHN0YW5kYXJkRm9ybWF0ID0gJzAuMDAnO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheU1lYXN1cmVtZW50cyA9IHtcbiAgICBtZXRyaWM6IGAke251bWVyYWwobWV0cmljTWVhc3VyZW1lbnQpLmZvcm1hdChtZXRyaWNGb3JtYXQpfSAke21ldHJpY1VuaXRzfWAsXG4gICAgc3RhbmRhcmQ6IGAke251bWVyYWwoc3RhbmRhcmRNZWFzdXJlbWVudCkuZm9ybWF0KHN0YW5kYXJkRm9ybWF0KX0gJHtzdGFuZGFyZFVuaXRzfWBcbiAgfTtcblxuICByZXR1cm4gZGlzcGxheU1lYXN1cmVtZW50cztcbn1cblxuY29uc3QgZG91YmxlQ2xpY2tab29tID0ge1xuICBlbmFibGU6IChjdHgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIEZpcnN0IGNoZWNrIHdlJ3ZlIGdvdCBhIG1hcCBhbmQgc29tZSBjb250ZXh0LlxuICAgICAgaWYgKCFjdHgubWFwIHx8ICFjdHgubWFwLmRvdWJsZUNsaWNrWm9vbSB8fCAhY3R4Ll9jdHggfHxcbiAgICAgICAgICFjdHguX2N0eC5zdG9yZSB8fCAhY3R4Ll9jdHguc3RvcmUuZ2V0SW5pdGlhbENvbmZpZ1ZhbHVlKSByZXR1cm47XG4gICAgICAvLyBOb3cgY2hlY2sgaW5pdGlhbCBzdGF0ZSB3YXNuJ3QgZmFsc2UgKHdlIGxlYXZlIGl0IGRpc2FibGVkIGlmIHNvKVxuICAgICAgaWYgKCFjdHguX2N0eC5zdG9yZS5nZXRJbml0aWFsQ29uZmlnVmFsdWUoJ2RvdWJsZUNsaWNrWm9vbScpKSByZXR1cm47XG4gICAgICBjdHgubWFwLmRvdWJsZUNsaWNrWm9vbS5lbmFibGUoKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuXG4vLyBXaGVuZXZlciBhIHVzZXIgY2xpY2tzIG9uIGEga2V5IHdoaWxlIGZvY3VzZWQgb24gdGhlIG1hcCwgaXQgd2lsbCBiZSBzZW50IGhlcmVcblJhZGl1c01vZGUub25LZXlVcCA9IGZ1bmN0aW9uIG9uS2V5VXAoc3RhdGUsIGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICB0aGlzLmRlbGV0ZUZlYXR1cmUoW3N0YXRlLmxpbmUuaWRdLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICB0aGlzLmNoYW5nZU1vZGUoJ3NpbXBsZV9zZWxlY3QnLCB7fSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gIH1cbn07XG5cbi8vIGZvciBtb2JpbGUgdG91Y2ggbW92ZSBpbiBtb2JpbGUgdGhlcmUgaXMgbm8gY2xpY2tcbi8vIHNpbmNlIGl0IHdvdWxkIHByb3ZpZGUgbm8gZmVlZGJhY2sgdG8gdXNlclxuZnVuY3Rpb24gb25Ub3VjaE1vdmVEcmF3KHN0YXRlLCBlKSB7XG4gIGlmIChzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24gPT09IDEpIHtcbiAgICBzdGF0ZS5saW5lLnJlbW92ZUNvb3JkaW5hdGUoJzInKTtcbiAgICBzdGF0ZS5saW5lLmFkZENvb3JkaW5hdGUoMiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGUubGluZS51cGRhdGVDb29yZGluYXRlKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICBpZiAoc3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpIHtcbiAgICBzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24gKz0gMTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5saW5lLmFkZENvb3JkaW5hdGUoMCwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBmb3IgZGVza3RvcCBjbGlja3NcbmZ1bmN0aW9uIGludGVyYWN0aXZlRHJhdyhzdGF0ZSwgZSwgZXZlbnRUeXBlLCBzZWxmKSB7XG4gIGlmIChzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24gPT09IDEpIHtcbiAgICBzdGF0ZS5saW5lLmFkZENvb3JkaW5hdGUoMCwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICAgIHJldHVybiBzZWxmLmNoYW5nZU1vZGUoJ3NpbXBsZV9zZWxlY3QnLCB7IGZlYXR1cmVJZHM6IFtzdGF0ZS5saW5lLmlkXSB9KTtcbiAgfVxuXG4gIHNlbGYudXBkYXRlVUlDbGFzc2VzKHsgbW91c2U6ICdhZGQnIH0pO1xuXG4gIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgaWYgKHN0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKSB7XG4gICAgc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uICs9IDE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5SYWRpdXNNb2RlLm9uVG91Y2hTdGFydCA9IGZ1bmN0aW9uIG9uVG91Y2hTdGFydChzdGF0ZSwgZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBudWxsO1xufTtcblxuUmFkaXVzTW9kZS5vblRvdWNoTW92ZSA9IGZ1bmN0aW9uIG9uVG91Y2hNb3ZlKHN0YXRlLCBlKSB7XG4gIC8vIGNvbnNvbGUubG9nKCdvblRvdWNoTW92ZScpXG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcmV0dXJuIG9uVG91Y2hNb3ZlRHJhdyhzdGF0ZSwgZSk7XG59O1xuXG5SYWRpdXNNb2RlLm9uVG91Y2hFbmQgPSBmdW5jdGlvbiBvblRvdWNoRW5kKHN0YXRlLCBlKSB7XG4gIC8vIGNvbnNvbGUubG9nKCdvblRvdWNoRW5kJylcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICByZXR1cm4gaW50ZXJhY3RpdmVEcmF3KHN0YXRlLCBlLCAnb25Ub3VjaEVuZCcsIHRoaXMpO1xufTtcblxuUmFkaXVzTW9kZS5jbGlja0FueXdoZXJlID0gZnVuY3Rpb24gY2xpY2tBbnl3aGVyZShzdGF0ZSwgZSkge1xuICAvLyBjb25zb2xlLmxvZygnY2xpY2tBbnl3aGVyZScpXG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcmV0dXJuIGludGVyYWN0aXZlRHJhdyhzdGF0ZSwgZSwgJ21vdXNlJywgdGhpcyk7XG59O1xuXG4vLyBjcmVhdGVzIHRoZSBmaW5hbCBnZW9qc29uIHBvaW50IGZlYXR1cmUgd2l0aCBhIHJhZGl1cyBwcm9wZXJ0eVxuLy8gdHJpZ2dlcnMgZHJhdy5jcmVhdGVcblJhZGl1c01vZGUub25TdG9wID0gZnVuY3Rpb24gb25TdG9wKHN0YXRlKSB7XG4gIGRvdWJsZUNsaWNrWm9vbS5lbmFibGUodGhpcyk7XG4gIC8vIGNvbnNvbGUubG9nKCdvblN0b3AnKVxuICB0aGlzLmFjdGl2YXRlVUlCdXR0b24oKTtcblxuICAvLyBjaGVjayB0byBzZWUgaWYgd2UndmUgZGVsZXRlZCB0aGlzIGZlYXR1cmVcbiAgaWYgKHRoaXMuZ2V0RmVhdHVyZShzdGF0ZS5saW5lLmlkKSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgLy8gcmVtb3ZlIGxhc3QgYWRkZWQgY29vcmRpbmF0ZVxuICBzdGF0ZS5saW5lLnJlbW92ZUNvb3JkaW5hdGUoJzAnKTtcbiAgaWYgKHN0YXRlLmxpbmUuaXNWYWxpZCgpKSB7XG4gICAgY29uc3QgbGluZUdlb0pzb24gPSBzdGF0ZS5saW5lLnRvR2VvSlNPTigpO1xuICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSBsaW5lR2VvSnNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IGxpbmVEaXN0YW5jZShsaW5lR2VvSnNvbik7XG5cbiAgICBjb25zdCBjaXJjbGVHZW9KU09OID0gY3JlYXRlR2VvSlNPTkNpcmNsZShzdGFydFBvaW50LCBkaXN0YW5jZSwgbnVsbCwgMzIpO1xuICAgIGNvbnN0IGZlZXQgPSAoZGlzdGFuY2UgKiAxMDAwKSAqIDMuMjgwODQ7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdjaXJjbGUnLCBKU09OLnN0cmluZ2lmeShjaXJjbGVHZW9KU09OKSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdsaW5lJywgSlNPTi5zdHJpbmdpZnkobGluZUdlb0pzb24pKTtcbiAgICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ2Rpc3RhbmNla20nLCBkaXN0YW5jZSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdkaXN0YW5jZWZlZXQnLCBmZWV0KTtcblxuICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2NpcmNsZS1wcmVzdWJtaXQnLCBKU09OLnN0cmluZ2lmeShjaXJjbGVHZW9KU09OKSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2xpbmUtcHJlc3VibWl0JywgSlNPTi5zdHJpbmdpZnkobGluZUdlb0pzb24pKTtcbiAgICBnb29nbGVBbmFseXRpY3Muc2V0RXZlbnQoJ2RhdGEnLCAnZGlzdGFuY2VrbS1wcmVzdWJtaXQnLCBkaXN0YW5jZSk7XG4gICAgZ29vZ2xlQW5hbHl0aWNzLnNldEV2ZW50KCdkYXRhJywgJ2Rpc3RhbmNlZmVldC1wcmVzdWJtaXQnLCBmZWV0KTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbkVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LWJ1dHRvbicpO1xuICAgIGlmIChzdWJtaXRCdXR0b25FbGVtKSB7XG4gICAgICBzdWJtaXRCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICBzdWJtaXRCdXR0b25FbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTInKS5jbGFzc0xpc3QuYWRkKCdzdGVwLW5vdC12aXMnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwLTMnKS5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLW5vdC12aXMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaXJjbGUyQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uMicpO1xuICAgIGlmIChjaXJjbGUyQnV0dG9uRWxlbSkge1xuICAgICAgY2lyY2xlMkJ1dHRvbkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAgICQoJyNjaXJjbGUtYnV0dG9uMicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgICB9XG5cbiAgICAvLyByZWNvbmZpZ3VyZSB0aGUgZ2VvanNvbiBsaW5lIGludG8gYSBnZW9qc29uIHBvaW50IHdpdGggYSByYWRpdXMgcHJvcGVydHlcbiAgICBjb25zdCBwb2ludFdpdGhSYWRpdXMgPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBnZW9tZXRyeToge1xuICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjaXJjbGVHZW9KU09OLmdlb21ldHJ5LmNvb3JkaW5hdGVzXG4gICAgICB9LFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICByYWRpdXNNZXRyaWM6IChsaW5lRGlzdGFuY2UobGluZUdlb0pzb24pKS50b0ZpeGVkKDEpLFxuICAgICAgICByYWRpdXNGZWV0OiBmZWV0XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLm1hcC5nZXRMYXllcignY2lyY2xlLWxpbmUnKSkge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1saW5lJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWFwLmdldExheWVyKCdjaXJjbGUtZmlsbCcpKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcignY2lyY2xlLWZpbGwnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFwLmdldFNvdXJjZSgnY2lyY2xlJykpIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZVNvdXJjZSgnY2lyY2xlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXAuYWRkU291cmNlKCdjaXJjbGUnLCB7XG4gICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICBkYXRhOiBwb2ludFdpdGhSYWRpdXNcbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmFkZExheWVyKHtcbiAgICAgIGlkOiAnY2lyY2xlLWZpbGwnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiAnY2lyY2xlJyxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdmaWxsLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcC5hZGRMYXllcih7XG4gICAgICBpZDogJ2NpcmNsZS1saW5lJyxcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIHNvdXJjZTogJ2NpcmNsZScsXG4gICAgICBsYXlvdXQ6IHtcbiAgICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICAgIH0sXG4gICAgICBwYWludDoge1xuICAgICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAuZmlyZSgnZHJhdy5jcmVhdGUnLCB7XG4gICAgICBmZWF0dXJlczogW3BvaW50V2l0aFJhZGl1c11cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRlbGV0ZUZlYXR1cmUoW3N0YXRlLmxpbmUuaWRdLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICB0aGlzLmNoYW5nZU1vZGUoJ3NpbXBsZV9zZWxlY3QnLCB7fSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gIH1cbn07XG5cblJhZGl1c01vZGUudG9EaXNwbGF5RmVhdHVyZXMgPSBmdW5jdGlvbiB0b0Rpc3BsYXlGZWF0dXJlcyhzdGF0ZSwgZ2VvanNvbiwgZGlzcGxheSkge1xuICBjb25zdCBpc0FjdGl2ZUxpbmUgPSBnZW9qc29uLnByb3BlcnRpZXMuaWQgPT09IHN0YXRlLmxpbmUuaWQ7XG5cbiAgZ2VvanNvbi5wcm9wZXJ0aWVzLmFjdGl2ZSA9IChpc0FjdGl2ZUxpbmUpID8gJ3RydWUnIDogJ2ZhbHNlJzsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKCFpc0FjdGl2ZUxpbmUpIHJldHVybiBkaXNwbGF5KGdlb2pzb24pO1xuXG4gIC8vIE9ubHkgcmVuZGVyIHRoZSBsaW5lIGlmIGl0IGhhcyBhdCBsZWFzdCBvbmUgcmVhbCBjb29yZGluYXRlXG4gIGlmIChnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHJldHVybiBudWxsO1xuICBnZW9qc29uLnByb3BlcnRpZXMubWV0YSA9ICdmZWF0dXJlJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIC8vIGRpc3BsYXlzIGNlbnRlciB2ZXJ0ZXggYXMgYSBwb2ludCBmZWF0dXJlXG4gIGRpc3BsYXkoY3JlYXRlVmVydGV4KFxuICAgIHN0YXRlLmxpbmUuaWQsXG4gICAgZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1tzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoIC0gMiA6IDFdLFxuICAgIGAke3N0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggLSAyIDogMX1gLFxuICAgIGZhbHNlLFxuICApKTtcblxuICAvLyBkaXNwbGF5cyB0aGUgbGluZSBhcyBpdCBpcyBkcmF3blxuICBkaXNwbGF5KGdlb2pzb24pO1xuXG4gIGNvbnN0IGRpc3BsYXlNZWFzdXJlbWVudHMgPSBnZXREaXNwbGF5TWVhc3VyZW1lbnRzKGdlb2pzb24pO1xuXG4gIC8vIGNyZWF0ZSBjdXN0b20gZmVhdHVyZSBmb3IgdGhlIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvblxuICBjb25zdCBjdXJyZW50VmVydGV4ID0ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBtZXRhOiAnY3VycmVudFBvc2l0aW9uJyxcbiAgICAgIGFjdGl2ZTogJ3RydWUnLFxuICAgICAgcmFkaXVzTWV0cmljOiBkaXNwbGF5TWVhc3VyZW1lbnRzLm1ldHJpYyxcbiAgICAgIHJhZGl1c1N0YW5kYXJkOiBkaXNwbGF5TWVhc3VyZW1lbnRzLnN0YW5kYXJkLFxuICAgICAgcGFyZW50OiBzdGF0ZS5saW5lLmlkXG4gICAgfSxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzOiBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdXG4gICAgfVxuICB9O1xuICBkaXNwbGF5KGN1cnJlbnRWZXJ0ZXgpO1xuXG4gIC8vIGNyZWF0ZSBjdXN0b20gZmVhdHVyZSBmb3IgcmFkaXVzIGNpcmNsZW1hcmtlclxuICBjb25zdCBjZW50ZXIgPSBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCByYWRpdXNJbkttID0gbGluZURpc3RhbmNlKGdlb2pzb24sICdraWxvbWV0ZXJzJyk7XG4gIGNvbnN0IGNpcmNsZUZlYXR1cmUgPSBjcmVhdGVHZW9KU09OQ2lyY2xlKGNlbnRlciwgcmFkaXVzSW5LbSwgc3RhdGUubGluZS5pZCk7XG4gIGNpcmNsZUZlYXR1cmUucHJvcGVydGllcy5tZXRhID0gJ3JhZGl1cyc7XG5cbiAgZGlzcGxheShjaXJjbGVGZWF0dXJlKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSYWRpdXNNb2RlO1xuIiwiLy8gaW1wb3J0IHsgU3RvcmFnZUFQSSB9IGZyb20gJy4vbG9jYWxTdG9yYWdlQVBJJztcblxuLyoqXG4qIFRoaXMgY29tcG9uZW50IGlzIGludGVuZGVkIHRvIGhhbmRsZSB0aGUgc3RvcmFnZSBhbmQgcmV0cmlldmFsIG9mIHRoZSBzdGF0ZSBvZlxuKiBBcyBvZiB0aGlzIHdyaXRpbmcgaXQgaXMgdXNpbmcgbG9jYWxTdG9yYWdlIHRvIGRvIHRoaXMuXG4qIFVzZXMgc2ltcGxlIGNsYXNzIGluc3RhbmNlIG1ldGhvZHMgd2l0aCB0aGUgc2hvcnQtaGFuZCBtZXRob2QgZGVjbGFyYXRpb25cbiogcGF0dGVybi5cbipcbiogVG8gbm90ZTogVGhlcmUgaXMgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIFN0b3JlIGFuZCB0aGUgU3RhdGUuIEFzIG9mIDBhMzEwNmVcbiogdGhlIFN0b3JlIGlzIGEgU3RyaW5nIHNhdmVkIHRvIHRoZSBicm93c2VycyBsb2NhbFN0b3JhZ2UgYW5kIGlzIGEgc2VyaWFsaXplZFxuKiB2ZXJzaW9uIG9mIHRoZSBTdGF0ZS4gVGhlIFN0YXRlIGlzIGFuIE9iamVjdCB3aGljaCBpcyBpbnRlcmFjdGVkIHdpdGggYnlcbiogcGFyc2luZyB0aGUgU3RhdGUgc3RyaW5nIGZyb20gdGhlIFN0b3JlLCBtb2RpZnlpbmcgdGhlIHJlc3VsdHMgb2YgdGhlIHBhcnNlLFxuKiBhbmQgcmUtc2VyaWFsaXppbmcgaXQgYmFjayB0byB0aGUgU3RvcmUuXG4qL1xuY29uc3QgU1RBVEVfS0VZID0gJ3N0YXRlJztcblxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgLy8gLi5hbmQgYW4gKG9wdGlvbmFsKSBjdXN0b20gY2xhc3MgY29uc3RydWN0b3IuIElmIG9uZSBpc1xuICAvLyBub3Qgc3VwcGxpZWQsIGEgZGVmYXVsdCBjb25zdHJ1Y3RvciBpcyB1c2VkIGluc3RlYWQ6XG4gIC8vIGNvbnN0cnVjdG9yKCkgeyB9XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAvLyB0aGlzLnN0b3JlID0gbmV3IFN0b3JhZ2VBUEkoKTtcbiAgICBpZiAoU3RvcmUuc3RvcmFnZUF2YWlsYWJsZSgpKSB7XG4gICAgICB0aGlzLnN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgaWYgKHRoaXMuY2hlY2tTdGF0ZUV4aXN0cykge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgU1RBVEVfS0VZIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0cyBhIGtleS92YWx1ZSBwYWlyIHRvIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHBhcmFtIHZhbHVlIHwgc3RyaW5nXG4gIHNldFN0YXRlSXRlbShrZXkgPSAnJywgdmFsdWUgPSAnJykge1xuICAgIGNvbnN0IHN0b3JlT2JqID0geyBba2V5XTogdmFsdWUgfTtcbiAgICBjb25zdCBuZXdTdGF0ZU9iaiA9IHsgLi4udGhpcy5nZXRTdGF0ZSgpLCAuLi5zdG9yZU9iaiB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGVPYmopO1xuICB9XG5cbiAgLy8gR2V0cyB0aGUgZW50aXJlIHN0YXRlIG9iamVjdFxuICAvL1xuICAvLyBAcmV0dXJuIG9iamVjdFxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgPyBKU09OLnBhcnNlKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKSA6IHt9O1xuICB9XG5cbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRJdGVtKGtleSA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFNUQVRFX0tFWSk7XG4gIH1cblxuICAvLyBHXG4gIC8vIEdldHMgYW4gaXRlbSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyLCBwcmltYXJpbHkgdXNlZCBsYXRlciBpbiB0aGUgY29tcG9zZWQgZnVuY3Rpb25zXG4gIC8vXG4gIC8vIEBwYXJhbSBrZXkgfCBzdHJpbmdcbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVJdGVtKGtleSA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tJdGVtKGtleSkgPyB0aGlzLmdldFN0YXRlKClba2V5XSA6IHt9O1xuICAgIC8vIHRoaXMuc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICAvLyBTZXRzIGEgbmV3IHN0YXRlIG9iamVjdCBzdGF0ZVxuICAvL1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGUodmFsdWUgPSB7fSkge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFNUQVRFX0tFWSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBzdGF0ZSBleGlzdHMgaW4gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgY2hlY2tTdGF0ZUV4aXN0cygpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldEl0ZW0oU1RBVEVfS0VZKSk7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBzdGF0ZSBmcm9tIHRoZSBzdG9yYWdlIHByb3ZpZGVyXG4gIC8vXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldFN0YXRlQXNTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW4gaXRlbSBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc3RvcmVcbiAgLy8gdW51c2VkIGFzIG9mIDBhMzEwNmVcbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGlzU3RhdGVJdGVtRXhpc3QoaXRlbSkge1xuICAgIGlmICh0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSkge1xuICAgICAgY29uc3Qgc3RhdGVTdHIgPSB0aGlzLmdldFN0YXRlQXNTdHJpbmcoKTtcbiAgICAgIGlmIChzdGF0ZVN0ci5pbmRleE9mKGl0ZW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gLSBzdHJpbmdcbiAgLy8gQHJldHVybiBib29sZWFuXG4gIGNoZWNrSXRlbShpdGVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpICYmIHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpLmluZGV4T2YoaXRlbSkgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIGF2YWlsYWJsZS5cbiAgLy8gVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX1N0b3JhZ2VfQVBJL1VzaW5nX3RoZV9XZWJfU3RvcmFnZV9BUElcbiAgLy9cbiAgLy8gQHJldHVybiBib29sZWFuXG4gIHN0YXRpYyBzdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbG9jYWxTdG9yYWdlJztcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMDtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=