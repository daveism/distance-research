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
/******/ 	var hotCurrentHash = "3a7592340754b3dac0fa";
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
exports.googleAnalyticsEvent = googleAnalyticsEvent;

var _store = __webpack_require__(/*! ./store */ "./src/scripts/store.js");

var store = new _store.Store({});

// adds a custom google events
function googleAnalyticsEvent() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  gtag('event', store.getStateItem('uuid'), { // eslint-disable-line
    event_category: category,
    event_label: label,
    value: '' + value,
    uuid: store.getStateItem('uuid')
  });
}

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

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas, _freeRegularSvgIcons.far);
_fontawesomeSvgCore.dom.watch();

var urlString = window.location.href;
var url = new URL(urlString);
var userType = url.searchParams.get('userType');

// ga event action, category, label
(0, _ga.googleAnalyticsEvent)('data', 'userType', userType);

_mapboxGl2.default.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';

var map = new _mapboxGl2.default.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-98, 38.88], // starting position [lng, lat]
  // maxZoom: 14,
  zoom: 3, // starting zoom
  showZoom: true
});

// setup map
var drawControl = new _mapboxGlDraw2.default({
  displayControlsDefault: false,
  controls: {
    rectangle: false,
    polygon: false,
    trash: false
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

// function
function handleAgreeClick() {
  document.getElementById('study-progress').classList.remove('d-none');
  document.getElementById('study-agreement-all').classList.add('d-none');
  document.getElementById('study-dissaggree').remove();
  store.setStateItem('study-agreement', true);
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
  (0, _ga.googleAnalyticsEvent)('data', 'searchpoint', x + ', ' + y);

  var offsetdist = 0.0025;
  var bbox = [[x - offsetdist, y - offsetdist], [x + offsetdist, y + offsetdist]];

  // create random zoom incase users are influenced by intial zoomlevel
  var min = 10;
  var max = 14;
  var zm = Math.floor(Math.random() * (max - min + 1) + min);
  map.fitBounds(bbox, { maxZoom: zm });

  // ga event action, category, label
  (0, _ga.googleAnalyticsEvent)('data', 'searchzoom', zm);

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

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

var drawCircleElement = document.querySelector('.btn-draw-circle');
drawCircleElement.addEventListener('click', handleDrawButtonClick);

var directionsOne = ['Search for a location you care about.', 'Search for a location to find about crime.', 'Search for a location to find about a pizza place.'];

var minOne = 0;
var maxOne = 2;
var messageIndexOne = Math.floor(Math.random() * (maxOne - minOne + 1) + minOne);
var stepDirections1 = document.getElementById('step1-directions');
stepDirections1.innerHTML = directionsOne[messageIndexOne];

// ga event action, category, label
(0, _ga.googleAnalyticsEvent)('data', 'step1text', directionsOne[messageIndexOne]);

var directionsTwo = ['Draw a circle that represents 1 mile from the location.', 'Draw a circle that represents a 5 minute <strong>DRIVE</strong>.', 'Draw a circle that represents a 5 minute <strong>WALK</strong>.'];

var minTwo = 0;
var maxTwo = 2;
var messageIndexTwo = Math.floor(Math.random() * (maxTwo - minTwo + 1) + minTwo);
var stepDirections2 = document.getElementById('step2-directions');
stepDirections2.innerHTML = directionsTwo[messageIndexTwo];

// ga event action, category, label
(0, _ga.googleAnalyticsEvent)('data', 'step2text', directionsTwo[messageIndexTwo]);

var aggreeButtonElement = document.getElementById('aggree-button');
aggreeButtonElement.addEventListener('click', handleAgreeClick);

var dissaggreeButtonElement = document.getElementById('diaggree-button');
dissaggreeButtonElement.addEventListener('click', handleDissagreeClick);

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

RadiusMode.clickAnywhere = function clickAnywhere(state, e) {
  // this ends the drawing after the user creates a second point, triggering this.onStop
  if (state.currentVertexPosition === 1) {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
    return this.changeMode('simple_select', { featureIds: [state.line.id] });
  }
  this.updateUIClasses({ mouse: 'add' });
  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  if (state.direction === 'forward') {
    state.currentVertexPosition += 1; // eslint-disable-line
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }

  return null;
};

// creates the final geojson point feature with a radius property
// triggers draw.create
RadiusMode.onStop = function onStop(state) {
  doubleClickZoom.enable(this);

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
    (0, _ga.googleAnalyticsEvent)('data', 'circle', JSON.stringify(circleGeoJSON));

    // reconfigure the geojson line into a geojson point with a radius property
    var pointWithRadius = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: circleGeoJSON.geometry.coordinates
      },
      properties: {
        radius: (0, _lineDistance2.default)(lineGeoJson).toFixed(1)
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
    store.setStateItem('studycompleted', true);
    document.getElementById('study-complete').classList.remove('d-none');
    document.getElementById('study-progress').remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZHJhd3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9nYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yYWRpdXNNb2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0b3JlLmpzIl0sIm5hbWVzIjpbImlkIiwidHlwZSIsImZpbHRlciIsImxheW91dCIsInBhaW50IiwiYmFzZSIsInN0b3BzIiwiZ29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJzdG9yZSIsIlN0b3JlIiwiYWN0aW9uIiwiY2F0ZWdvcnkiLCJsYWJlbCIsInZhbHVlIiwiZ3RhZyIsImdldFN0YXRlSXRlbSIsImV2ZW50X2NhdGVnb3J5IiwiZXZlbnRfbGFiZWwiLCJ1dWlkIiwibGlicmFyeSIsImFkZCIsImZhcyIsImZhciIsImRvbSIsIndhdGNoIiwidXJsU3RyaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwidXJsIiwiVVJMIiwidXNlclR5cGUiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJtYXBib3hnbCIsImFjY2Vzc1Rva2VuIiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJjZW50ZXIiLCJ6b29tIiwic2hvd1pvb20iLCJkcmF3Q29udHJvbCIsIk1hcGJveERyYXciLCJkaXNwbGF5Q29udHJvbHNEZWZhdWx0IiwiY29udHJvbHMiLCJyZWN0YW5nbGUiLCJwb2x5Z29uIiwidHJhc2giLCJzdHlsZXMiLCJkcmF3U3R5bGVzIiwibW9kZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJkcmF3X3JhZGl1cyIsIlJhZGl1c01vZGUiLCJhZGRDb250cm9sIiwibmF2IiwiTmF2aWdhdGlvbkNvbnRyb2wiLCJnZW9jb2RlciIsIk1hcGJveEdlb2NvZGVyIiwic2V0Wm9vbSIsImZseVRvIiwicGxhY2Vob2xkZXIiLCJoYW5kbGVBZ3JlZUNsaWNrIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInNldFN0YXRlSXRlbSIsImhhbmRsZURpc3NhZ3JlZUNsaWNrIiwiY2hlY2tWYWxpZE9iamVjdCIsIm9iaiIsInVuZGVmaW5lZCIsImtleXMiLCJsZW5ndGgiLCJjcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJVaW50MzJBcnJheSIsImpvaW4iLCJoYW5kbGVEcmF3QnV0dG9uQ2xpY2siLCJlIiwiY2lyY2xlQnV0dG9uRWxlbSIsImNvbnRhaW5zIiwiJCIsInRvb2x0aXAiLCJ0cmlnZ2VyIiwiZ2V0TGF5ZXIiLCJyZW1vdmVMYXllciIsImdldFNvdXJjZSIsInJlbW92ZVNvdXJjZSIsImNoYW5nZU1vZGUiLCJpc1N0dWR5Y29tcGxldGVkIiwic3R1ZHlDb21wbGV0ZWQiLCJTdHVkeUFncnJlZW1lbnQiLCJzdHVkeUFncnJlZWQiLCJvbiIsIngiLCJyZXN1bHQiLCJ5Iiwib2Zmc2V0ZGlzdCIsImJib3giLCJtaW4iLCJtYXgiLCJ6bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImZpdEJvdW5kcyIsIm1heFpvb20iLCJhcHBlbmRDaGlsZCIsIm9uQWRkIiwiZHJhd0NpcmNsZUVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpcmVjdGlvbnNPbmUiLCJtaW5PbmUiLCJtYXhPbmUiLCJtZXNzYWdlSW5kZXhPbmUiLCJzdGVwRGlyZWN0aW9uczEiLCJpbm5lckhUTUwiLCJkaXJlY3Rpb25zVHdvIiwibWluVHdvIiwibWF4VHdvIiwibWVzc2FnZUluZGV4VHdvIiwic3RlcERpcmVjdGlvbnMyIiwiYWdncmVlQnV0dG9uRWxlbWVudCIsImRpc3NhZ2dyZWVCdXR0b25FbGVtZW50IiwiZHJhd19saW5lX3N0cmluZyIsImNyZWF0ZVZlcnRleCIsInBhcmVudElkIiwiY29vcmRpbmF0ZXMiLCJwYXRoIiwic2VsZWN0ZWQiLCJwcm9wZXJ0aWVzIiwibWV0YSIsInBhcmVudCIsImNvb3JkX3BhdGgiLCJhY3RpdmUiLCJnZW9tZXRyeSIsImNyZWF0ZUdlb0pTT05DaXJjbGUiLCJyYWRpdXNJbkttIiwicG9pbnRzIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJrbSIsInJldCIsImRpc3RhbmNlWCIsImNvcyIsIlBJIiwiZGlzdGFuY2VZIiwidGhldGEiLCJpIiwic2luIiwicHVzaCIsImdldERpc3BsYXlNZWFzdXJlbWVudHMiLCJmZWF0dXJlIiwiZHJhd25MZW5ndGgiLCJtZXRyaWNVbml0cyIsIm1ldHJpY0Zvcm1hdCIsIm1ldHJpY01lYXN1cmVtZW50Iiwic3RhbmRhcmRVbml0cyIsInN0YW5kYXJkRm9ybWF0Iiwic3RhbmRhcmRNZWFzdXJlbWVudCIsImRpc3BsYXlNZWFzdXJlbWVudHMiLCJtZXRyaWMiLCJmb3JtYXQiLCJzdGFuZGFyZCIsImRvdWJsZUNsaWNrWm9vbSIsImVuYWJsZSIsImN0eCIsInNldFRpbWVvdXQiLCJfY3R4IiwiZ2V0SW5pdGlhbENvbmZpZ1ZhbHVlIiwiY2xpY2tBbnl3aGVyZSIsInN0YXRlIiwiY3VycmVudFZlcnRleFBvc2l0aW9uIiwibGluZSIsImFkZENvb3JkaW5hdGUiLCJsbmdMYXQiLCJsbmciLCJsYXQiLCJmZWF0dXJlSWRzIiwidXBkYXRlVUlDbGFzc2VzIiwibW91c2UiLCJ1cGRhdGVDb29yZGluYXRlIiwiZGlyZWN0aW9uIiwib25TdG9wIiwiYWN0aXZhdGVVSUJ1dHRvbiIsImdldEZlYXR1cmUiLCJyZW1vdmVDb29yZGluYXRlIiwiaXNWYWxpZCIsImxpbmVHZW9Kc29uIiwidG9HZW9KU09OIiwic3RhcnRQb2ludCIsImRpc3RhbmNlIiwiY2lyY2xlR2VvSlNPTiIsIkpTT04iLCJzdHJpbmdpZnkiLCJwb2ludFdpdGhSYWRpdXMiLCJyYWRpdXMiLCJ0b0ZpeGVkIiwiYWRkU291cmNlIiwiZGF0YSIsImFkZExheWVyIiwic291cmNlIiwiZmlyZSIsImZlYXR1cmVzIiwiZGVsZXRlRmVhdHVyZSIsInNpbGVudCIsInRvRGlzcGxheUZlYXR1cmVzIiwiZ2VvanNvbiIsImRpc3BsYXkiLCJpc0FjdGl2ZUxpbmUiLCJjdXJyZW50VmVydGV4IiwicmFkaXVzTWV0cmljIiwicmFkaXVzU3RhbmRhcmQiLCJjaXJjbGVGZWF0dXJlIiwiU1RBVEVfS0VZIiwic3RvcmFnZUF2YWlsYWJsZSIsInN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJjaGVja1N0YXRlRXhpc3RzIiwiZ2V0U3RhdGUiLCJrZXkiLCJzdG9yZU9iaiIsIm5ld1N0YXRlT2JqIiwic2V0U3RhdGUiLCJwYXJzZSIsImdldEl0ZW0iLCJjaGVja0l0ZW0iLCJzZXRJdGVtIiwiQm9vbGVhbiIsIml0ZW0iLCJzdGF0ZVN0ciIsImdldFN0YXRlQXNTdHJpbmciLCJpbmRleE9mIiwicmVtb3ZlSXRlbSIsIkRPTUV4Y2VwdGlvbiIsImNvZGUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFD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RUFBWDtBQUNBO0FBQ0EvSixVQUFFK0osSUFBRixLQUFXLElBRlg7QUFHQTtBQUNBO0FBQ0EvSixVQUFFZ0ssSUFBRixLQUFXLG9CQUxYO0FBTUE7QUFDQWhLLFVBQUVnSyxJQUFGLEtBQVcsNEJBVE47QUFVTDtBQUNBcEIsZ0JBQVFsSixNQUFSLEtBQW1CLENBWHJCO0FBWUQ7QUFDRiIsImZpbGUiOiJpbmRleC5hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIzYTc1OTIzNDA3NTRiM2RhYzBmYVwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JzfmluZGV4XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL05ZQ1BsYW5uaW5nL2xhYnMtZmFjdGZpbmRlci9ibG9iLzRhNjdkYTI3M2I2ZmY4NzU4OGY1MDQ0YTE1YjM0OTBkNGFjMDdhMjUvYXBwL2xheWVycy9kcmF3LXN0eWxlcy5qc1xuZXhwb3J0IGRlZmF1bHQgW1xuICAvLyBBQ1RJVkUgKGJlaW5nIGRyYXduKVxuICAvLyBsaW5lIHN0cm9rZVxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LWxpbmUnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdMaW5lU3RyaW5nJ10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICdsaW5lLWRhc2hhcnJheSc6IFswLjIsIDJdLFxuICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgfVxuICB9LFxuXG4gIC8vIHBvbHlnb24gZmlsbFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tZmlsbCcsXG4gICAgdHlwZTogJ2ZpbGwnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2ZpbGwtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuMVxuICAgIH1cbiAgfSxcblxuICAvLyBwb2x5Z29uIG91dGxpbmUgc3Ryb2tlXG4gIC8vIFRoaXMgZG9lc24ndCBzdHlsZSB0aGUgZmlyc3QgZWRnZSBvZiB0aGUgcG9seWdvbiwgd2hpY2ggdXNlcyB0aGUgbGluZSBzdHJva2Ugc3R5bGluZyBpbnN0ZWFkXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1zdHJva2UtYWN0aXZlJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnI0Q5NkIyNycsXG4gICAgICAnbGluZS1kYXNoYXJyYXknOiBbMC4yLCAyXSxcbiAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgIH1cbiAgfSxcbiAgLy8gdmVydGV4IHBvaW50IGhhbG9zXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1hbmQtbGluZS12ZXJ0ZXgtaGFsby1hY3RpdmUnLFxuICAgIHR5cGU6ICdjaXJjbGUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJ21ldGEnLCAndmVydGV4J10sIFsnPT0nLCAnJHR5cGUnLCAnUG9pbnQnXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBwYWludDoge1xuICAgICAgJ2NpcmNsZS1yYWRpdXMnOiA3LFxuICAgICAgJ2NpcmNsZS1jb2xvcic6ICcjRkZGJ1xuICAgIH1cbiAgfSxcbiAgLy8gdmVydGV4IHBvaW50c1xuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tYW5kLWxpbmUtdmVydGV4LWFjdGl2ZScsXG4gICAgdHlwZTogJ2NpcmNsZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnbWV0YScsICd2ZXJ0ZXgnXSwgWyc9PScsICckdHlwZScsICdQb2ludCddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnY2lyY2xlLXJhZGl1cyc6IDYsXG4gICAgICAnY2lyY2xlLWNvbG9yJzogJyNEOTZCMjcnXG4gICAgfVxuICB9LFxuXG4gIC8vIHJhZGl1cyBsYWJlbFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXJhZGl1cy1sYWJlbCcsXG4gICAgdHlwZTogJ3N5bWJvbCcsXG4gICAgZmlsdGVyOiBbJz09JywgJ21ldGEnLCAnY3VycmVudFBvc2l0aW9uJ10sXG4gICAgbGF5b3V0OiB7XG4gICAgICAndGV4dC1maWVsZCc6ICd7cmFkaXVzRmVldH0gXFxuIHtyYWRpdXNNaWxlc30nLFxuICAgICAgJ3RleHQtYW5jaG9yJzogJ2xlZnQnLFxuICAgICAgJ3RleHQtb2Zmc2V0JzogW1xuICAgICAgICAxLFxuICAgICAgICAwXG4gICAgICBdLFxuICAgICAgJ3RleHQtc2l6ZSc6IDIyXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ3RleHQtY29sb3InOiAncmdiYSgwLCAwLCAwLCAxKScsXG4gICAgICAndGV4dC1oYWxvLWNvbG9yJzogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknLFxuICAgICAgJ3RleHQtaGFsby13aWR0aCc6IDMsXG4gICAgICAnaWNvbi1vcGFjaXR5Jzoge1xuICAgICAgICBiYXNlOiAxLFxuICAgICAgICBzdG9wczogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIDcuOTksXG4gICAgICAgICAgICAxXG4gICAgICAgICAgXSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgMFxuICAgICAgICAgIF1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgICd0ZXh0LWhhbG8tYmx1cic6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gSU5BQ1RJVkUgKHN0YXRpYywgYWxyZWFkeSBkcmF3bilcbiAgLy8gbGluZSBzdHJva2VcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1saW5lLXN0YXRpYycsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ0xpbmVTdHJpbmcnXSwgWyc9PScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2xpbmUtd2lkdGgnOiAzXG4gICAgfVxuICB9LFxuICAvLyBwb2x5Z29uIGZpbGxcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWZpbGwtc3RhdGljJyxcbiAgICB0eXBlOiAnZmlsbCcsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJz09JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnZmlsbC1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdmaWxsLW91dGxpbmUtY29sb3InOiAnIzAwMCcsXG4gICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgfVxuICB9LFxuICAvLyBwb2x5Z29uIG91dGxpbmVcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLXN0cm9rZS1zdGF0aWMnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnPT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdsaW5lLXdpZHRoJzogM1xuICAgIH1cbiAgfVxuXTtcbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcblxuLy8gYWRkcyBhIGN1c3RvbSBnb29nbGUgZXZlbnRzXG5leHBvcnQgZnVuY3Rpb24gZ29vZ2xlQW5hbHl0aWNzRXZlbnQoYWN0aW9uID0gJycsIGNhdGVnb3J5ID0gJycsIGxhYmVsID0gJycsIHZhbHVlID0gMCkge1xuICBndGFnKCdldmVudCcsIHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpLCB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZXZlbnRfY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIGV2ZW50X2xhYmVsOiBsYWJlbCxcbiAgICB2YWx1ZTogYCR7dmFsdWV9YCxcbiAgICB1dWlkOiBzdG9yZS5nZXRTdGF0ZUl0ZW0oJ3V1aWQnKVxuICB9KTtcbn1cbiIsIi8vIGltcG9ydCBkZXBlbmRlbmNpZXNcbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBmYXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtcmVndWxhci1zdmctaWNvbnMnO1xuaW1wb3J0IG1hcGJveGdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgTWFwYm94RHJhdyBmcm9tICdAbWFwYm94L21hcGJveC1nbC1kcmF3JztcbmltcG9ydCBNYXBib3hHZW9jb2RlciBmcm9tICdAbWFwYm94L21hcGJveC1nbC1nZW9jb2Rlcic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IFJhZGl1c01vZGUgZnJvbSAnLi9yYWRpdXNNb2RlJztcbmltcG9ydCBkcmF3U3R5bGVzIGZyb20gJy4vZHJhd3N0eWxlcyc7XG5pbXBvcnQgeyBnb29nbGVBbmFseXRpY3NFdmVudCB9IGZyb20gJy4vZ2EnO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5cbi8vIEtpY2tzIG9mZiB0aGUgcHJvY2VzcyBvZiBmaW5kaW5nIDxpPiB0YWdzIGFuZCByZXBsYWNpbmcgd2l0aCA8c3ZnPlxuLy8gYWRkZXMgc3VwcG9ydCBmb3IgZm9udGF3ZXNvbWVcbmxpYnJhcnkuYWRkKGZhcywgZmFyKTtcbmRvbS53YXRjaCgpO1xuXG5jb25zdCB1cmxTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbmNvbnN0IHVybCA9IG5ldyBVUkwodXJsU3RyaW5nKTtcbmNvbnN0IHVzZXJUeXBlID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3VzZXJUeXBlJyk7XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3NFdmVudCgnZGF0YScsICd1c2VyVHlwZScsIHVzZXJUeXBlKTtcblxubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuXG5jb25zdCBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcbiAgY29udGFpbmVyOiAnbWFwJyxcbiAgc3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJyxcbiAgY2VudGVyOiBbLTk4LCAzOC44OF0sIC8vIHN0YXJ0aW5nIHBvc2l0aW9uIFtsbmcsIGxhdF1cbiAgLy8gbWF4Wm9vbTogMTQsXG4gIHpvb206IDMsIC8vIHN0YXJ0aW5nIHpvb21cbiAgc2hvd1pvb206IHRydWVcbn0pO1xuXG4vLyBzZXR1cCBtYXBcbmNvbnN0IGRyYXdDb250cm9sID0gbmV3IE1hcGJveERyYXcoe1xuICBkaXNwbGF5Q29udHJvbHNEZWZhdWx0OiBmYWxzZSxcbiAgY29udHJvbHM6IHtcbiAgICByZWN0YW5nbGU6IGZhbHNlLFxuICAgIHBvbHlnb246IGZhbHNlLFxuICAgIHRyYXNoOiBmYWxzZVxuICB9LFxuICBzdHlsZXM6IGRyYXdTdHlsZXMsXG4gIG1vZGVzOiBPYmplY3QuYXNzaWduKHtcbiAgICBkcmF3X3JhZGl1czogUmFkaXVzTW9kZVxuICB9LCBNYXBib3hEcmF3Lm1vZGVzKVxufSk7XG5cbm1hcC5hZGRDb250cm9sKGRyYXdDb250cm9sKTtcblxuY29uc3QgbmF2ID0gbmV3IG1hcGJveGdsLk5hdmlnYXRpb25Db250cm9sKCk7XG5tYXAuYWRkQ29udHJvbChuYXYsICd0b3AtbGVmdCcpO1xuXG5jb25zdCBnZW9jb2RlciA9IG5ldyBNYXBib3hHZW9jb2Rlcih7XG4gIGFjY2Vzc1Rva2VuOiBtYXBib3hnbC5hY2Nlc3NUb2tlbixcbiAgbWFwYm94Z2wsXG4gIHNldFpvb206IDgsXG4gIGZseVRvOiBmYWxzZSxcbiAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggZm9yIGEgbG9jYXRpb24uLi4nXG59KTtcblxuLy8gZnVuY3Rpb25cbmZ1bmN0aW9uIGhhbmRsZUFncmVlQ2xpY2soKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktYWdyZWVtZW50LWFsbCcpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktZGlzc2FnZ3JlZScpLnJlbW92ZSgpO1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3N0dWR5LWFncmVlbWVudCcsIHRydWUpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGlzc2FncmVlQ2xpY2soKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktZGlzc2FnZ3JlZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktYWdyZWVtZW50LWFsbCcpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeS1hZ3JlZW1lbnQnLCBmYWxzZSk7XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBlbnN1cmUgdGhlIG9iamVjdCBvciB2YXJpYWJsZSBpcyB2YWxpZC4uLlxuLy8gQHBhcmFtIG9iaiAtIHR5cGVsZXNzXG5mdW5jdGlvbiBjaGVja1ZhbGlkT2JqZWN0KG9iaikge1xuICBpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiB1dWlkKCkge1xuICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoNCkpLmpvaW4oJy0nKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhd0J1dHRvbkNsaWNrKGUpIHtcbiAgY29uc3QgY2lyY2xlQnV0dG9uRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGUtYnV0dG9uJyk7XG4gIGlmIChjaXJjbGVCdXR0b25FbGVtLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdob3ZlciBmb2N1cycgfSk7XG4gICAgJCgnI2NpcmNsZS1idXR0b24nKS50b29sdGlwKCdzaG93Jyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoeyB0cmlnZ2VyOiAnbWFudWFsJyB9KTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2hpZGUnKTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc2FibGUnKTtcbiAgICAkKCcjY2lyY2xlLWJ1dHRvbicpLnRvb2x0aXAoJ2Rpc3Bvc2UnKTtcbiAgfVxuXG4gIGRyYXdDb250cm9sLnRyYXNoKCk7XG5cbiAgaWYgKG1hcC5nZXRMYXllcignY2lyY2xlLWxpbmUnKSkge1xuICAgIG1hcC5yZW1vdmVMYXllcignY2lyY2xlLWxpbmUnKTtcbiAgfVxuXG4gIGlmIChtYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1maWxsJykpIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1maWxsJyk7XG4gIH1cbiAgaWYgKG1hcC5nZXRTb3VyY2UoJ2NpcmNsZScpKSB7XG4gICAgbWFwLnJlbW92ZVNvdXJjZSgnY2lyY2xlJyk7XG4gIH1cblxuICBkcmF3Q29udHJvbC5jaGFuZ2VNb2RlKCdkcmF3X3JhZGl1cycpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gY2hlY2sgc3R1ZHkgc2Vzc2lvbiBzdGF0ZSBmb3IgY29tcGxldGV0aW9uXG5jb25zdCBpc1N0dWR5Y29tcGxldGVkID0gc3RvcmUuZ2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcpO1xubGV0IHN0dWR5Q29tcGxldGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIGlzU3R1ZHljb21wbGV0ZWQgPT09ICdib29sZWFuJykge1xuICBzdHVkeUNvbXBsZXRlZCA9IGlzU3R1ZHljb21wbGV0ZWQ7XG59IGVsc2Uge1xuICBzdHVkeUNvbXBsZXRlZCA9IGZhbHNlO1xufVxuXG4vLyBjaGVjayBzdHVkeSBzZXNzaW9uIHN0YXRlIGZvciBjb21wbGV0ZXRpb25cbmNvbnN0IFN0dWR5QWdycmVlbWVudCA9IHN0b3JlLmdldFN0YXRlSXRlbSgnc3R1ZHktYWdyZWVtZW50Jyk7XG5sZXQgc3R1ZHlBZ3JyZWVkID0gZmFsc2U7XG5pZiAodHlwZW9mIFN0dWR5QWdycmVlbWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gIHN0dWR5QWdycmVlZCA9IFN0dWR5QWdycmVlbWVudDtcbn0gZWxzZSB7XG4gIHN0dWR5QWdycmVlZCA9IGZhbHNlO1xufVxuXG4vLyBhbHJlYWR5IGFncmVlZFxuaWYgKHN0dWR5QWdycmVlZCkge1xuICAvLyBoYW5kbGVBZ3JlZUNsaWNrKCk7XG59XG5cbi8vIGhpZGUgc3R1ZHlcbmlmIChzdHVkeUNvbXBsZXRlZCkgeyAvLyB8fCBzdHVkeUFncnJlZWRcbiAgaGFuZGxlQWdyZWVDbGljaygpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktY29tcGxldGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0dWR5LXByb2dyZXNzJykucmVtb3ZlKCk7XG59IGVsc2Uge1xuICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3R1ZHktcHJvZ3Jlc3MnKS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIGZhbHNlKTtcbn1cblxuaWYgKCFjaGVja1ZhbGlkT2JqZWN0KHN0b3JlLmdldFN0YXRlSXRlbSgndXVpZCcpKSkge1xuICBzdG9yZS5zZXRTdGF0ZUl0ZW0oJ3V1aWQnLCB1dWlkKCkpO1xufVxuXG5nZW9jb2Rlci5vbigncmVzdWx0JywgKGUpID0+IHtcbiAgY29uc3QgeCA9IGUucmVzdWx0LmNlbnRlclswXTtcbiAgY29uc3QgeSA9IGUucmVzdWx0LmNlbnRlclsxXTtcblxuICAvLyBnYSBldmVudCBhY3Rpb24sIGNhdGVnb3J5LCBsYWJlbFxuICBnb29nbGVBbmFseXRpY3NFdmVudCgnZGF0YScsICdzZWFyY2hwb2ludCcsIGAke3h9LCAke3l9YCk7XG5cbiAgY29uc3Qgb2Zmc2V0ZGlzdCA9IDAuMDAyNTtcbiAgY29uc3QgYmJveCA9IFtbeCAtIG9mZnNldGRpc3QsIHkgLSBvZmZzZXRkaXN0XSwgW3ggKyBvZmZzZXRkaXN0LCB5ICsgb2Zmc2V0ZGlzdF1dO1xuXG4gIC8vIGNyZWF0ZSByYW5kb20gem9vbSBpbmNhc2UgdXNlcnMgYXJlIGluZmx1ZW5jZWQgYnkgaW50aWFsIHpvb21sZXZlbFxuICBjb25zdCBtaW4gPSAxMDtcbiAgY29uc3QgbWF4ID0gMTQ7XG4gIGNvbnN0IHptID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgbWFwLmZpdEJvdW5kcyhiYm94LCB7IG1heFpvb206IHptIH0pO1xuXG4gIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gIGdvb2dsZUFuYWx5dGljc0V2ZW50KCdkYXRhJywgJ3NlYXJjaHpvb20nLCB6bSk7XG5cblxuICBjb25zdCBjaXJjbGVCdXR0b25FbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZS1idXR0b24nKTtcbiAgaWYgKGNpcmNsZUJ1dHRvbkVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgY2lyY2xlQnV0dG9uRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCh7IHRyaWdnZXI6ICdtYW51YWwnIH0pO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnaGlkZScpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzYWJsZScpO1xuICAgICQoJyNjaXJjbGUtYnV0dG9uJykudG9vbHRpcCgnZGlzcG9zZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGVwMi10aXRsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLWRpcmVjdGlvbnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICB9XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlb2NvZGVyJykuYXBwZW5kQ2hpbGQoZ2VvY29kZXIub25BZGQobWFwKSk7XG5cbmNvbnN0IGRyYXdDaXJjbGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1kcmF3LWNpcmNsZScpO1xuZHJhd0NpcmNsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEcmF3QnV0dG9uQ2xpY2spO1xuXG5jb25zdCBkaXJlY3Rpb25zT25lID0gW1xuICAnU2VhcmNoIGZvciBhIGxvY2F0aW9uIHlvdSBjYXJlIGFib3V0LicsXG4gICdTZWFyY2ggZm9yIGEgbG9jYXRpb24gdG8gZmluZCBhYm91dCBjcmltZS4nLFxuICAnU2VhcmNoIGZvciBhIGxvY2F0aW9uIHRvIGZpbmQgYWJvdXQgYSBwaXp6YSBwbGFjZS4nXG5dO1xuXG5jb25zdCBtaW5PbmUgPSAwO1xuY29uc3QgbWF4T25lID0gMjtcbmNvbnN0IG1lc3NhZ2VJbmRleE9uZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhPbmUgLSBtaW5PbmUgKyAxKSArIG1pbk9uZSk7XG5jb25zdCBzdGVwRGlyZWN0aW9uczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RlcDEtZGlyZWN0aW9ucycpO1xuc3RlcERpcmVjdGlvbnMxLmlubmVySFRNTCA9IGRpcmVjdGlvbnNPbmVbbWVzc2FnZUluZGV4T25lXTtcblxuLy8gZ2EgZXZlbnQgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWxcbmdvb2dsZUFuYWx5dGljc0V2ZW50KCdkYXRhJywgJ3N0ZXAxdGV4dCcsIGRpcmVjdGlvbnNPbmVbbWVzc2FnZUluZGV4T25lXSk7XG5cbmNvbnN0IGRpcmVjdGlvbnNUd28gPSBbXG4gICdEcmF3IGEgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyAxIG1pbGUgZnJvbSB0aGUgbG9jYXRpb24uJyxcbiAgJ0RyYXcgYSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIGEgNSBtaW51dGUgPHN0cm9uZz5EUklWRTwvc3Ryb25nPi4nLFxuICAnRHJhdyBhIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgYSA1IG1pbnV0ZSA8c3Ryb25nPldBTEs8L3N0cm9uZz4uJ1xuXTtcblxuY29uc3QgbWluVHdvID0gMDtcbmNvbnN0IG1heFR3byA9IDI7XG5jb25zdCBtZXNzYWdlSW5kZXhUd28gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4VHdvIC0gbWluVHdvICsgMSkgKyBtaW5Ud28pO1xuY29uc3Qgc3RlcERpcmVjdGlvbnMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0ZXAyLWRpcmVjdGlvbnMnKTtcbnN0ZXBEaXJlY3Rpb25zMi5pbm5lckhUTUwgPSBkaXJlY3Rpb25zVHdvW21lc3NhZ2VJbmRleFR3b107XG5cbi8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG5nb29nbGVBbmFseXRpY3NFdmVudCgnZGF0YScsICdzdGVwMnRleHQnLCBkaXJlY3Rpb25zVHdvW21lc3NhZ2VJbmRleFR3b10pO1xuXG5cbmNvbnN0IGFnZ3JlZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdncmVlLWJ1dHRvbicpO1xuYWdncmVlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUFncmVlQ2xpY2spO1xuXG5jb25zdCBkaXNzYWdncmVlQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFnZ3JlZS1idXR0b24nKTtcbmRpc3NhZ2dyZWVCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRGlzc2FncmVlQ2xpY2spO1xuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY2hyaXN3aG9uZy82OTQ3NzliYzFmMWU1ZDkyNmU0N2JhYjcyMDVmYTU1OVxuLy8gY3VzdG9tIG1hcGJvcHgtZ2wtZHJhdyBtb2RlIHRoYXQgbW9kaWZpZXMgZHJhd19saW5lX3N0cmluZ1xuLy8gc2hvd3MgYSBjZW50ZXIgcG9pbnQsIHJhZGl1cyBsaW5lLCBhbmQgY2lyY2xlIHBvbHlnb24gd2hpbGUgZHJhd2luZ1xuLy8gZm9yY2VzIGRyYXcuY3JlYXRlIG9uIGNyZWF0aW9uIG9mIHNlY29uZCB2ZXJ0ZXhcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWRyYXcnO1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XG5pbXBvcnQgbGluZURpc3RhbmNlIGZyb20gJ0B0dXJmL2xpbmUtZGlzdGFuY2UnO1xuaW1wb3J0IHsgZ29vZ2xlQW5hbHl0aWNzRXZlbnQgfSBmcm9tICcuL2dhJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKHt9KTtcbmNvbnN0IFJhZGl1c01vZGUgPSBNYXBib3hEcmF3Lm1vZGVzLmRyYXdfbGluZV9zdHJpbmc7XG5cbmZ1bmN0aW9uIGNyZWF0ZVZlcnRleChwYXJlbnRJZCwgY29vcmRpbmF0ZXMsIHBhdGgsIHNlbGVjdGVkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG1ldGE6ICd2ZXJ0ZXgnLFxuICAgICAgcGFyZW50OiBwYXJlbnRJZCxcbiAgICAgIGNvb3JkX3BhdGg6IHBhdGgsXG4gICAgICBhY3RpdmU6IChzZWxlY3RlZCkgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgfSxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzXG4gICAgfVxuICB9O1xufVxuXG4vLyBjcmVhdGUgYSBjaXJjbGUtbGlrZSBwb2x5Z29uIGdpdmVuIGEgY2VudGVyIHBvaW50IGFuZCByYWRpdXNcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTk5NTYxL2RyYXdpbmctYS1jaXJjbGUtd2l0aC10aGUtcmFkaXVzLWluLW1pbGVzLW1ldGVycy13aXRoLW1hcGJveC1nbC1qcy8zOTAwNjM4OCMzOTAwNjM4OFxuZnVuY3Rpb24gY3JlYXRlR2VvSlNPTkNpcmNsZShjZW50ZXIsIHJhZGl1c0luS20sIHBhcmVudElkLCBwb2ludHMgPSA2NCkge1xuICBjb25zdCBjb29yZHMgPSB7XG4gICAgbGF0aXR1ZGU6IGNlbnRlclsxXSxcbiAgICBsb25naXR1ZGU6IGNlbnRlclswXVxuICB9O1xuXG4gIGNvbnN0IGttID0gcmFkaXVzSW5LbTtcblxuICBjb25zdCByZXQgPSBbXTtcbiAgY29uc3QgZGlzdGFuY2VYID0ga20gLyAoMTExLjMyMCAqIE1hdGguY29zKChjb29yZHMubGF0aXR1ZGUgKiBNYXRoLlBJKSAvIDE4MCkpO1xuICBjb25zdCBkaXN0YW5jZVkgPSBrbSAvIDExMC41NzQ7XG5cbiAgbGV0IHRoZXRhO1xuICBsZXQgeDtcbiAgbGV0IHk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzOyBpICs9IDEpIHtcbiAgICB0aGV0YSA9IChpIC8gcG9pbnRzKSAqICgyICogTWF0aC5QSSk7XG4gICAgeCA9IGRpc3RhbmNlWCAqIE1hdGguY29zKHRoZXRhKTtcbiAgICB5ID0gZGlzdGFuY2VZICogTWF0aC5zaW4odGhldGEpO1xuXG4gICAgcmV0LnB1c2goW2Nvb3Jkcy5sb25naXR1ZGUgKyB4LCBjb29yZHMubGF0aXR1ZGUgKyB5XSk7XG4gIH1cbiAgcmV0LnB1c2gocmV0WzBdKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IFtyZXRdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBwYXJlbnQ6IHBhcmVudElkLFxuICAgICAgYWN0aXZlOiAndHJ1ZSdcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlNZWFzdXJlbWVudHMoZmVhdHVyZSkge1xuICAvLyBzaG91bGQgbG9nIGJvdGggbWV0cmljIGFuZCBzdGFuZGFyZCBkaXNwbGF5IHN0cmluZ3MgZm9yIHRoZSBjdXJyZW50IGRyYXduIGZlYXR1cmVcblxuXG4gIC8vIG1ldHJpYyBjYWxjdWxhdGlvblxuICBjb25zdCBkcmF3bkxlbmd0aCA9IChsaW5lRGlzdGFuY2UoZmVhdHVyZSkgKiAxMDAwKTsgLy8gbWV0ZXJzXG5cbiAgbGV0IG1ldHJpY1VuaXRzID0gJ20nO1xuICBsZXQgbWV0cmljRm9ybWF0ID0gJzAsMCc7XG4gIGxldCBtZXRyaWNNZWFzdXJlbWVudDtcblxuICBsZXQgc3RhbmRhcmRVbml0cyA9ICdmZWV0JztcbiAgbGV0IHN0YW5kYXJkRm9ybWF0ID0gJzAsMCc7XG4gIGxldCBzdGFuZGFyZE1lYXN1cmVtZW50O1xuXG4gIG1ldHJpY01lYXN1cmVtZW50ID0gZHJhd25MZW5ndGg7XG4gIGlmIChkcmF3bkxlbmd0aCA+PSAxMDAwKSB7IC8vIGlmIG92ZXIgMTAwMCBtZXRlcnMsIHVwZ3JhZGUgbWV0cmljXG4gICAgbWV0cmljTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aCAvIDEwMDA7XG4gICAgbWV0cmljVW5pdHMgPSAna20nO1xuICAgIG1ldHJpY0Zvcm1hdCA9ICcwLjAwJztcbiAgfVxuXG4gIHN0YW5kYXJkTWVhc3VyZW1lbnQgPSBkcmF3bkxlbmd0aCAqIDMuMjgwODQ7XG4gIGlmIChzdGFuZGFyZE1lYXN1cmVtZW50ID49IDUyODApIHsgLy8gaWYgb3ZlciA1MjgwIGZlZXQsIHVwZ3JhZGUgc3RhbmRhcmRcbiAgICBzdGFuZGFyZE1lYXN1cmVtZW50IC89IDUyODA7XG4gICAgc3RhbmRhcmRVbml0cyA9ICdtaSc7XG4gICAgc3RhbmRhcmRGb3JtYXQgPSAnMC4wMCc7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5TWVhc3VyZW1lbnRzID0ge1xuICAgIG1ldHJpYzogYCR7bnVtZXJhbChtZXRyaWNNZWFzdXJlbWVudCkuZm9ybWF0KG1ldHJpY0Zvcm1hdCl9ICR7bWV0cmljVW5pdHN9YCxcbiAgICBzdGFuZGFyZDogYCR7bnVtZXJhbChzdGFuZGFyZE1lYXN1cmVtZW50KS5mb3JtYXQoc3RhbmRhcmRGb3JtYXQpfSAke3N0YW5kYXJkVW5pdHN9YFxuICB9O1xuXG4gIHJldHVybiBkaXNwbGF5TWVhc3VyZW1lbnRzO1xufVxuXG5jb25zdCBkb3VibGVDbGlja1pvb20gPSB7XG4gIGVuYWJsZTogKGN0eCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gRmlyc3QgY2hlY2sgd2UndmUgZ290IGEgbWFwIGFuZCBzb21lIGNvbnRleHQuXG4gICAgICBpZiAoIWN0eC5tYXAgfHwgIWN0eC5tYXAuZG91YmxlQ2xpY2tab29tIHx8ICFjdHguX2N0eCB8fFxuICAgICAgICAgIWN0eC5fY3R4LnN0b3JlIHx8ICFjdHguX2N0eC5zdG9yZS5nZXRJbml0aWFsQ29uZmlnVmFsdWUpIHJldHVybjtcbiAgICAgIC8vIE5vdyBjaGVjayBpbml0aWFsIHN0YXRlIHdhc24ndCBmYWxzZSAod2UgbGVhdmUgaXQgZGlzYWJsZWQgaWYgc28pXG4gICAgICBpZiAoIWN0eC5fY3R4LnN0b3JlLmdldEluaXRpYWxDb25maWdWYWx1ZSgnZG91YmxlQ2xpY2tab29tJykpIHJldHVybjtcbiAgICAgIGN0eC5tYXAuZG91YmxlQ2xpY2tab29tLmVuYWJsZSgpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG5SYWRpdXNNb2RlLmNsaWNrQW55d2hlcmUgPSBmdW5jdGlvbiBjbGlja0FueXdoZXJlKHN0YXRlLCBlKSB7XG4gIC8vIHRoaXMgZW5kcyB0aGUgZHJhd2luZyBhZnRlciB0aGUgdXNlciBjcmVhdGVzIGEgc2Vjb25kIHBvaW50LCB0cmlnZ2VyaW5nIHRoaXMub25TdG9wXG4gIGlmIChzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24gPT09IDEpIHtcbiAgICBzdGF0ZS5saW5lLmFkZENvb3JkaW5hdGUoMCwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICAgIHJldHVybiB0aGlzLmNoYW5nZU1vZGUoJ3NpbXBsZV9zZWxlY3QnLCB7IGZlYXR1cmVJZHM6IFtzdGF0ZS5saW5lLmlkXSB9KTtcbiAgfVxuICB0aGlzLnVwZGF0ZVVJQ2xhc3Nlcyh7IG1vdXNlOiAnYWRkJyB9KTtcbiAgc3RhdGUubGluZS51cGRhdGVDb29yZGluYXRlKHN0YXRlLmN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICBpZiAoc3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpIHtcbiAgICBzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24gKz0gMTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5saW5lLmFkZENvb3JkaW5hdGUoMCwgZS5sbmdMYXQubG5nLCBlLmxuZ0xhdC5sYXQpO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBjcmVhdGVzIHRoZSBmaW5hbCBnZW9qc29uIHBvaW50IGZlYXR1cmUgd2l0aCBhIHJhZGl1cyBwcm9wZXJ0eVxuLy8gdHJpZ2dlcnMgZHJhdy5jcmVhdGVcblJhZGl1c01vZGUub25TdG9wID0gZnVuY3Rpb24gb25TdG9wKHN0YXRlKSB7XG4gIGRvdWJsZUNsaWNrWm9vbS5lbmFibGUodGhpcyk7XG5cbiAgdGhpcy5hY3RpdmF0ZVVJQnV0dG9uKCk7XG5cbiAgLy8gY2hlY2sgdG8gc2VlIGlmIHdlJ3ZlIGRlbGV0ZWQgdGhpcyBmZWF0dXJlXG4gIGlmICh0aGlzLmdldEZlYXR1cmUoc3RhdGUubGluZS5pZCkgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gIC8vIHJlbW92ZSBsYXN0IGFkZGVkIGNvb3JkaW5hdGVcbiAgc3RhdGUubGluZS5yZW1vdmVDb29yZGluYXRlKCcwJyk7XG4gIGlmIChzdGF0ZS5saW5lLmlzVmFsaWQoKSkge1xuICAgIGNvbnN0IGxpbmVHZW9Kc29uID0gc3RhdGUubGluZS50b0dlb0pTT04oKTtcbiAgICBjb25zdCBzdGFydFBvaW50ID0gbGluZUdlb0pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF07XG4gICAgY29uc3QgZGlzdGFuY2UgPSBsaW5lRGlzdGFuY2UobGluZUdlb0pzb24pO1xuXG4gICAgY29uc3QgY2lyY2xlR2VvSlNPTiA9IGNyZWF0ZUdlb0pTT05DaXJjbGUoc3RhcnRQb2ludCwgZGlzdGFuY2UsIG51bGwsIDMyKTtcblxuICAgIC8vIGdhIGV2ZW50IGFjdGlvbiwgY2F0ZWdvcnksIGxhYmVsXG4gICAgZ29vZ2xlQW5hbHl0aWNzRXZlbnQoJ2RhdGEnLCAnY2lyY2xlJywgSlNPTi5zdHJpbmdpZnkoY2lyY2xlR2VvSlNPTikpO1xuXG4gICAgLy8gcmVjb25maWd1cmUgdGhlIGdlb2pzb24gbGluZSBpbnRvIGEgZ2VvanNvbiBwb2ludCB3aXRoIGEgcmFkaXVzIHByb3BlcnR5XG4gICAgY29uc3QgcG9pbnRXaXRoUmFkaXVzID0ge1xuICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgICBjb29yZGluYXRlczogY2lyY2xlR2VvSlNPTi5nZW9tZXRyeS5jb29yZGluYXRlc1xuICAgICAgfSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcmFkaXVzOiAobGluZURpc3RhbmNlKGxpbmVHZW9Kc29uKSkudG9GaXhlZCgxKVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5tYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1saW5lJykpIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtbGluZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1hcC5nZXRMYXllcignY2lyY2xlLWZpbGwnKSkge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1maWxsJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1hcC5nZXRTb3VyY2UoJ2NpcmNsZScpKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVTb3VyY2UoJ2NpcmNsZScpO1xuICAgIH1cblxuICAgIHRoaXMubWFwLmFkZFNvdXJjZSgnY2lyY2xlJywge1xuICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgZGF0YTogcG9pbnRXaXRoUmFkaXVzXG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcC5hZGRMYXllcih7XG4gICAgICBpZDogJ2NpcmNsZS1maWxsJyxcbiAgICAgIHR5cGU6ICdmaWxsJyxcbiAgICAgIHNvdXJjZTogJ2NpcmNsZScsXG4gICAgICBwYWludDoge1xuICAgICAgICAnZmlsbC1jb2xvcic6ICcjRDIwQzBDJyxcbiAgICAgICAgJ2ZpbGwtb3V0bGluZS1jb2xvcic6ICcjRDIwQzBDJyxcbiAgICAgICAgJ2ZpbGwtb3BhY2l0eSc6IDAuMVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIoe1xuICAgICAgaWQ6ICdjaXJjbGUtbGluZScsXG4gICAgICB0eXBlOiAnbGluZScsXG4gICAgICBzb3VyY2U6ICdjaXJjbGUnLFxuICAgICAgbGF5b3V0OiB7XG4gICAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgICB9LFxuICAgICAgcGFpbnQ6IHtcbiAgICAgICAgJ2xpbmUtY29sb3InOiAnI0Q5NkIyNycsXG4gICAgICAgICdsaW5lLWRhc2hhcnJheSc6IFswLjIsIDJdLFxuICAgICAgICAnbGluZS13aWR0aCc6IDRcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmZpcmUoJ2RyYXcuY3JlYXRlJywge1xuICAgICAgZmVhdHVyZXM6IFtwb2ludFdpdGhSYWRpdXNdXG4gICAgfSk7XG4gICAgc3RvcmUuc2V0U3RhdGVJdGVtKCdzdHVkeWNvbXBsZXRlZCcsIHRydWUpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1jb21wbGV0ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHVkeS1wcm9ncmVzcycpLnJlbW92ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGVsZXRlRmVhdHVyZShbc3RhdGUubGluZS5pZF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgIHRoaXMuY2hhbmdlTW9kZSgnc2ltcGxlX3NlbGVjdCcsIHt9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuUmFkaXVzTW9kZS50b0Rpc3BsYXlGZWF0dXJlcyA9IGZ1bmN0aW9uIHRvRGlzcGxheUZlYXR1cmVzKHN0YXRlLCBnZW9qc29uLCBkaXNwbGF5KSB7XG4gIGNvbnN0IGlzQWN0aXZlTGluZSA9IGdlb2pzb24ucHJvcGVydGllcy5pZCA9PT0gc3RhdGUubGluZS5pZDtcbiAgZ2VvanNvbi5wcm9wZXJ0aWVzLmFjdGl2ZSA9IChpc0FjdGl2ZUxpbmUpID8gJ3RydWUnIDogJ2ZhbHNlJzsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKCFpc0FjdGl2ZUxpbmUpIHJldHVybiBkaXNwbGF5KGdlb2pzb24pO1xuXG4gIC8vIE9ubHkgcmVuZGVyIHRoZSBsaW5lIGlmIGl0IGhhcyBhdCBsZWFzdCBvbmUgcmVhbCBjb29yZGluYXRlXG4gIGlmIChnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCA8IDIpIHJldHVybiBudWxsO1xuICBnZW9qc29uLnByb3BlcnRpZXMubWV0YSA9ICdmZWF0dXJlJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIC8vIGRpc3BsYXlzIGNlbnRlciB2ZXJ0ZXggYXMgYSBwb2ludCBmZWF0dXJlXG4gIGRpc3BsYXkoY3JlYXRlVmVydGV4KFxuICAgIHN0YXRlLmxpbmUuaWQsXG4gICAgZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1tzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoIC0gMiA6IDFdLFxuICAgIGAke3N0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggLSAyIDogMX1gLFxuICAgIGZhbHNlLFxuICApKTtcblxuICAvLyBkaXNwbGF5cyB0aGUgbGluZSBhcyBpdCBpcyBkcmF3blxuICBkaXNwbGF5KGdlb2pzb24pO1xuXG4gIGNvbnN0IGRpc3BsYXlNZWFzdXJlbWVudHMgPSBnZXREaXNwbGF5TWVhc3VyZW1lbnRzKGdlb2pzb24pO1xuXG4gIC8vIGNyZWF0ZSBjdXN0b20gZmVhdHVyZSBmb3IgdGhlIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvblxuICBjb25zdCBjdXJyZW50VmVydGV4ID0ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBtZXRhOiAnY3VycmVudFBvc2l0aW9uJyxcbiAgICAgIGFjdGl2ZTogJ3RydWUnLFxuICAgICAgcmFkaXVzTWV0cmljOiBkaXNwbGF5TWVhc3VyZW1lbnRzLm1ldHJpYyxcbiAgICAgIHJhZGl1c1N0YW5kYXJkOiBkaXNwbGF5TWVhc3VyZW1lbnRzLnN0YW5kYXJkLFxuICAgICAgcGFyZW50OiBzdGF0ZS5saW5lLmlkXG4gICAgfSxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzOiBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdXG4gICAgfVxuICB9O1xuICBkaXNwbGF5KGN1cnJlbnRWZXJ0ZXgpO1xuXG4gIC8vIGNyZWF0ZSBjdXN0b20gZmVhdHVyZSBmb3IgcmFkaXVzIGNpcmNsZW1hcmtlclxuICBjb25zdCBjZW50ZXIgPSBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCByYWRpdXNJbkttID0gbGluZURpc3RhbmNlKGdlb2pzb24sICdraWxvbWV0ZXJzJyk7XG4gIGNvbnN0IGNpcmNsZUZlYXR1cmUgPSBjcmVhdGVHZW9KU09OQ2lyY2xlKGNlbnRlciwgcmFkaXVzSW5LbSwgc3RhdGUubGluZS5pZCk7XG4gIGNpcmNsZUZlYXR1cmUucHJvcGVydGllcy5tZXRhID0gJ3JhZGl1cyc7XG5cbiAgZGlzcGxheShjaXJjbGVGZWF0dXJlKTtcblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhZGl1c01vZGU7XG4iLCIvLyBpbXBvcnQgeyBTdG9yYWdlQVBJIH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2VBUEknO1xuXG4vKipcbiogVGhpcyBjb21wb25lbnQgaXMgaW50ZW5kZWQgdG8gaGFuZGxlIHRoZSBzdG9yYWdlIGFuZCByZXRyaWV2YWwgb2YgdGhlIHN0YXRlIG9mXG4qIEFzIG9mIHRoaXMgd3JpdGluZyBpdCBpcyB1c2luZyBsb2NhbFN0b3JhZ2UgdG8gZG8gdGhpcy5cbiogVXNlcyBzaW1wbGUgY2xhc3MgaW5zdGFuY2UgbWV0aG9kcyB3aXRoIHRoZSBzaG9ydC1oYW5kIG1ldGhvZCBkZWNsYXJhdGlvblxuKiBwYXR0ZXJuLlxuKlxuKiBUbyBub3RlOiBUaGVyZSBpcyBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgU3RvcmUgYW5kIHRoZSBTdGF0ZS4gQXMgb2YgMGEzMTA2ZVxuKiB0aGUgU3RvcmUgaXMgYSBTdHJpbmcgc2F2ZWQgdG8gdGhlIGJyb3dzZXJzIGxvY2FsU3RvcmFnZSBhbmQgaXMgYSBzZXJpYWxpemVkXG4qIHZlcnNpb24gb2YgdGhlIFN0YXRlLiBUaGUgU3RhdGUgaXMgYW4gT2JqZWN0IHdoaWNoIGlzIGludGVyYWN0ZWQgd2l0aCBieVxuKiBwYXJzaW5nIHRoZSBTdGF0ZSBzdHJpbmcgZnJvbSB0aGUgU3RvcmUsIG1vZGlmeWluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcGFyc2UsXG4qIGFuZCByZS1zZXJpYWxpemluZyBpdCBiYWNrIHRvIHRoZSBTdG9yZS5cbiovXG5jb25zdCBTVEFURV9LRVkgPSAnc3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAvLyAuLmFuZCBhbiAob3B0aW9uYWwpIGN1c3RvbSBjbGFzcyBjb25zdHJ1Y3Rvci4gSWYgb25lIGlzXG4gIC8vIG5vdCBzdXBwbGllZCwgYSBkZWZhdWx0IGNvbnN0cnVjdG9yIGlzIHVzZWQgaW5zdGVhZDpcbiAgLy8gY29uc3RydWN0b3IoKSB7IH1cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIC8vIHRoaXMuc3RvcmUgPSBuZXcgU3RvcmFnZUFQSSgpO1xuICAgIGlmIChTdG9yZS5zdG9yYWdlQXZhaWxhYmxlKCkpIHtcbiAgICAgIHRoaXMuc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICBpZiAodGhpcy5jaGVja1N0YXRlRXhpc3RzKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0geyBTVEFURV9LRVkgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXRzIGEga2V5L3ZhbHVlIHBhaXIgdG8gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcGFyYW0gdmFsdWUgfCBzdHJpbmdcbiAgc2V0U3RhdGVJdGVtKGtleSA9ICcnLCB2YWx1ZSA9ICcnKSB7XG4gICAgY29uc3Qgc3RvcmVPYmogPSB7IFtrZXldOiB2YWx1ZSB9O1xuICAgIGNvbnN0IG5ld1N0YXRlT2JqID0geyAuLi50aGlzLmdldFN0YXRlKCksIC4uLnN0b3JlT2JqIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZU9iaik7XG4gIH1cblxuICAvLyBHZXRzIHRoZSBlbnRpcmUgc3RhdGUgb2JqZWN0XG4gIC8vXG4gIC8vIEByZXR1cm4gb2JqZWN0XG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLmNoZWNrU3RhdGVFeGlzdHMoKSA/IEpTT04ucGFyc2UodGhpcy5nZXRJdGVtKFNUQVRFX0tFWSkpIDoge307XG4gIH1cblxuICAvLyBHZXRzIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmFnZSBwcm92aWRlciwgcHJpbWFyaWx5IHVzZWQgbGF0ZXIgaW4gdGhlIGNvbXBvc2VkIGZ1bmN0aW9uc1xuICAvL1xuICAvLyBAcGFyYW0ga2V5IHwgc3RyaW5nXG4gIC8vIEByZXR1cm4gc3RyaW5nXG4gIGdldEl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oU1RBVEVfS0VZKTtcbiAgfVxuXG4gIC8vIEdcbiAgLy8gR2V0cyBhbiBpdGVtIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXIsIHByaW1hcmlseSB1c2VkIGxhdGVyIGluIHRoZSBjb21wb3NlZCBmdW5jdGlvbnNcbiAgLy9cbiAgLy8gQHBhcmFtIGtleSB8IHN0cmluZ1xuICAvLyBAcmV0dXJuIHN0cmluZ1xuICBnZXRTdGF0ZUl0ZW0oa2V5ID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0l0ZW0oa2V5KSA/IHRoaXMuZ2V0U3RhdGUoKVtrZXldIDoge307XG4gICAgLy8gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8vIFNldHMgYSBuZXcgc3RhdGUgb2JqZWN0IHN0YXRlXG4gIC8vXG4gIC8vIEBwYXJhbSB2YWx1ZSB8IHN0cmluZ1xuICBzZXRTdGF0ZSh2YWx1ZSA9IHt9KSB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oU1RBVEVfS0VZLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG5cblxuICAvLyBDaGVja3MgaWYgdGhlIHN0YXRlIGV4aXN0cyBpbiB0aGUgc3RvcmFnZSBwcm92aWRlclxuICBjaGVja1N0YXRlRXhpc3RzKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuZ2V0SXRlbShTVEFURV9LRVkpKTtcbiAgfVxuXG4gIC8vIEdldHMgdGhlIHN0YXRlIGZyb20gdGhlIHN0b3JhZ2UgcHJvdmlkZXJcbiAgLy9cbiAgLy8gQHJldHVybiBzdHJpbmdcbiAgZ2V0U3RhdGVBc1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJdGVtKFNUQVRFX0tFWSk7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbiBpdGVtIGhhcyBiZWVuIHNhdmVkIHRvIHRoZSBzdG9yZVxuICAvLyB1bnVzZWQgYXMgb2YgMGEzMTA2ZVxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgaXNTdGF0ZUl0ZW1FeGlzdChpdGVtKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tTdGF0ZUV4aXN0cygpKSB7XG4gICAgICBjb25zdCBzdGF0ZVN0ciA9IHRoaXMuZ2V0U3RhdGVBc1N0cmluZygpO1xuICAgICAgaWYgKHN0YXRlU3RyLmluZGV4T2YoaXRlbSkgPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvL1xuICAvLyBAcGFyYW0gaXRlbSAtIHN0cmluZ1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgY2hlY2tJdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1N0YXRlRXhpc3RzKCkgJiYgdGhpcy5nZXRTdGF0ZUFzU3RyaW5nKCkuaW5kZXhPZihpdGVtKSA+IDA7XG4gIH1cblxuICAvLyBDaGVjayBpZiBsb2NhbFN0b3JhZ2UgYXZhaWxhYmxlLlxuICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfU3RvcmFnZV9BUEkvVXNpbmdfdGhlX1dlYl9TdG9yYWdlX0FQSVxuICAvL1xuICAvLyBAcmV0dXJuIGJvb2xlYW5cbiAgc3RhdGljIHN0b3JhZ2VBdmFpbGFibGUoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdsb2NhbFN0b3JhZ2UnO1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgY29uc3QgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==