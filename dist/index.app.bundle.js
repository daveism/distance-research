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
/******/ 	var hotCurrentHash = "023081146af67cad3106";
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
/******/ 	deferredModules.push([0,"vendors~index","index~store"]);
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

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _radiusMode = __webpack_require__(/*! ./radius-mode */ "./src/scripts/radius-mode.js");

var _radiusMode2 = _interopRequireDefault(_radiusMode);

var _drawstyles = __webpack_require__(/*! ./drawstyles */ "./src/scripts/drawstyles.js");

var _drawstyles2 = _interopRequireDefault(_drawstyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Kicks off the process of finding <i> tags and replacing with <svg>
// addes support for fontawesome
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas, _freeRegularSvgIcons.far); // import dependencies

_fontawesomeSvgCore.dom.watch();

var store = new _store.Store({});
store.setStateItem('daveism', '{test:true}');

_mapboxGl2.default.accessToken = 'pk.eyJ1IjoiZGF2ZWlzbSIsImEiOiJCdjUxT0FzIn0.V9oIk_wUc4uZu7UBblR8mw';

var map = new _mapboxGl2.default.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-98, 38.88], // starting position [lng, lat]
  // maxZoom: 14,
  zoom: 3, // starting zoom
  showZoom: true
});

var nav = new _mapboxGl2.default.NavigationControl();
map.addControl(nav, 'top-left');

var geocoder = new _mapboxGlGeocoder2.default({
  accessToken: _mapboxGl2.default.accessToken,
  mapboxgl: _mapboxGl2.default,
  setZoom: 8,
  flyTo: false,
  placeholder: 'Search for locations...'
});

geocoder.on('result', function (e) {
  var x = e.result.center[0];
  var y = e.result.center[1];
  var offsetdist = 0.0025;
  var bbox = [[x - offsetdist, y - offsetdist], [x + offsetdist, y + offsetdist]];
  map.fitBounds(bbox, { maxZoom: 12 });
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

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

function handleDrawButtonClick(e) {
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
}
var drawCircleElement = document.querySelector('.btn-draw-circle');
drawCircleElement.addEventListener('click', handleDrawButtonClick);

/***/ }),

/***/ "./src/scripts/radius-mode.js":
/*!************************************!*\
  !*** ./src/scripts/radius-mode.js ***!
  \************************************/
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadiusMode = _mapboxGlDraw2.default.modes.draw_line_string; // https://gist.github.com/chriswhong/694779bc1f1e5d926e47bab7205fa559
// custom mapbopx-gl-draw mode that modifies draw_line_string
// shows a center point, radius line, and circle polygon while drawing
// forces draw.create on creation of second vertex


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZHJhd3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9yYWRpdXMtbW9kZS5qcyJdLCJuYW1lcyI6WyJpZCIsInR5cGUiLCJmaWx0ZXIiLCJsYXlvdXQiLCJwYWludCIsImJhc2UiLCJzdG9wcyIsImxpYnJhcnkiLCJhZGQiLCJmYXMiLCJmYXIiLCJkb20iLCJ3YXRjaCIsInN0b3JlIiwiU3RvcmUiLCJzZXRTdGF0ZUl0ZW0iLCJtYXBib3hnbCIsImFjY2Vzc1Rva2VuIiwibWFwIiwiTWFwIiwiY29udGFpbmVyIiwic3R5bGUiLCJjZW50ZXIiLCJ6b29tIiwic2hvd1pvb20iLCJuYXYiLCJOYXZpZ2F0aW9uQ29udHJvbCIsImFkZENvbnRyb2wiLCJnZW9jb2RlciIsIk1hcGJveEdlb2NvZGVyIiwic2V0Wm9vbSIsImZseVRvIiwicGxhY2Vob2xkZXIiLCJvbiIsImUiLCJ4IiwicmVzdWx0IiwieSIsIm9mZnNldGRpc3QiLCJiYm94IiwiZml0Qm91bmRzIiwibWF4Wm9vbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRDaGlsZCIsIm9uQWRkIiwiZHJhd0NvbnRyb2wiLCJNYXBib3hEcmF3IiwiZGlzcGxheUNvbnRyb2xzRGVmYXVsdCIsImNvbnRyb2xzIiwicmVjdGFuZ2xlIiwicG9seWdvbiIsInRyYXNoIiwic3R5bGVzIiwiZHJhd1N0eWxlcyIsIm1vZGVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZHJhd19yYWRpdXMiLCJSYWRpdXNNb2RlIiwiaGFuZGxlRHJhd0J1dHRvbkNsaWNrIiwiZ2V0TGF5ZXIiLCJyZW1vdmVMYXllciIsImdldFNvdXJjZSIsInJlbW92ZVNvdXJjZSIsImNoYW5nZU1vZGUiLCJkcmF3Q2lyY2xlRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZHJhd19saW5lX3N0cmluZyIsImNyZWF0ZVZlcnRleCIsInBhcmVudElkIiwiY29vcmRpbmF0ZXMiLCJwYXRoIiwic2VsZWN0ZWQiLCJwcm9wZXJ0aWVzIiwibWV0YSIsInBhcmVudCIsImNvb3JkX3BhdGgiLCJhY3RpdmUiLCJnZW9tZXRyeSIsImNyZWF0ZUdlb0pTT05DaXJjbGUiLCJyYWRpdXNJbkttIiwicG9pbnRzIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJrbSIsInJldCIsImRpc3RhbmNlWCIsIk1hdGgiLCJjb3MiLCJQSSIsImRpc3RhbmNlWSIsInRoZXRhIiwiaSIsInNpbiIsInB1c2giLCJnZXREaXNwbGF5TWVhc3VyZW1lbnRzIiwiZmVhdHVyZSIsImRyYXduTGVuZ3RoIiwibWV0cmljVW5pdHMiLCJtZXRyaWNGb3JtYXQiLCJtZXRyaWNNZWFzdXJlbWVudCIsInN0YW5kYXJkVW5pdHMiLCJzdGFuZGFyZEZvcm1hdCIsInN0YW5kYXJkTWVhc3VyZW1lbnQiLCJkaXNwbGF5TWVhc3VyZW1lbnRzIiwibWV0cmljIiwiZm9ybWF0Iiwic3RhbmRhcmQiLCJkb3VibGVDbGlja1pvb20iLCJlbmFibGUiLCJjdHgiLCJzZXRUaW1lb3V0IiwiX2N0eCIsImdldEluaXRpYWxDb25maWdWYWx1ZSIsImNsaWNrQW55d2hlcmUiLCJzdGF0ZSIsImN1cnJlbnRWZXJ0ZXhQb3NpdGlvbiIsImxpbmUiLCJhZGRDb29yZGluYXRlIiwibG5nTGF0IiwibG5nIiwibGF0IiwiZmVhdHVyZUlkcyIsInVwZGF0ZVVJQ2xhc3NlcyIsIm1vdXNlIiwidXBkYXRlQ29vcmRpbmF0ZSIsImRpcmVjdGlvbiIsIm9uU3RvcCIsImFjdGl2YXRlVUlCdXR0b24iLCJnZXRGZWF0dXJlIiwidW5kZWZpbmVkIiwicmVtb3ZlQ29vcmRpbmF0ZSIsImlzVmFsaWQiLCJsaW5lR2VvSnNvbiIsInRvR2VvSlNPTiIsInN0YXJ0UG9pbnQiLCJkaXN0YW5jZSIsImNpcmNsZUdlb0pTT04iLCJwb2ludFdpdGhSYWRpdXMiLCJyYWRpdXMiLCJ0b0ZpeGVkIiwiYWRkU291cmNlIiwiZGF0YSIsImFkZExheWVyIiwic291cmNlIiwiZmlyZSIsImZlYXR1cmVzIiwiZGVsZXRlRmVhdHVyZSIsInNpbGVudCIsInRvRGlzcGxheUZlYXR1cmVzIiwiZ2VvanNvbiIsImRpc3BsYXkiLCJpc0FjdGl2ZUxpbmUiLCJsZW5ndGgiLCJjdXJyZW50VmVydGV4IiwicmFkaXVzTWV0cmljIiwicmFkaXVzU3RhbmRhcmQiLCJjaXJjbGVGZWF0dXJlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QjtBQWNBa0YsVUFBUUcsYUFBUjs7QUFFQTtBQUNBLE1BQU12SSxTQUFTbUksUUFBUXpFLFFBQVIsQ0FBaUJSLFdBQWpCLENBQTZCLENBQTdCLENBQWY7QUFDQSxNQUFNVSxhQUFhLDRCQUFhdUUsT0FBYixFQUFzQixZQUF0QixDQUFuQjtBQUNBLE1BQU1PLGdCQUFnQi9FLG9CQUFvQjNELE1BQXBCLEVBQTRCNEQsVUFBNUIsRUFBd0NvQyxNQUFNRSxJQUFOLENBQVd4SCxFQUFuRCxDQUF0QjtBQUNBZ0ssZ0JBQWNyRixVQUFkLENBQXlCQyxJQUF6QixHQUFnQyxRQUFoQzs7QUFFQThFLFVBQVFNLGFBQVI7O0FBRUEsU0FBTyxJQUFQO0FBQ0QsQ0FoREQ7O2tCQWtEZXJHLFUiLCJmaWxlIjoiaW5kZXguYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMDIzMDgxMTQ2YWY2N2NhZDMxMDZcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc35pbmRleFwiLFwiaW5kZXh+c3RvcmVcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vTllDUGxhbm5pbmcvbGFicy1mYWN0ZmluZGVyL2Jsb2IvNGE2N2RhMjczYjZmZjg3NTg4ZjUwNDRhMTViMzQ5MGQ0YWMwN2EyNS9hcHAvbGF5ZXJzL2RyYXctc3R5bGVzLmpzXG5leHBvcnQgZGVmYXVsdCBbXG4gIC8vIEFDVElWRSAoYmVpbmcgZHJhd24pXG4gIC8vIGxpbmUgc3Ryb2tlXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctbGluZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ0xpbmVTdHJpbmcnXSwgWychPScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyNEOTZCMjcnLFxuICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAnbGluZS13aWR0aCc6IDRcbiAgICB9XG4gIH0sXG5cbiAgLy8gcG9seWdvbiBmaWxsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1maWxsJyxcbiAgICB0eXBlOiAnZmlsbCcsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnUG9seWdvbiddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnZmlsbC1jb2xvcic6ICcjRDIwQzBDJyxcbiAgICAgICdmaWxsLW91dGxpbmUtY29sb3InOiAnI0QyMEMwQycsXG4gICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgfVxuICB9LFxuXG4gIC8vIHBvbHlnb24gb3V0bGluZSBzdHJva2VcbiAgLy8gVGhpcyBkb2Vzbid0IHN0eWxlIHRoZSBmaXJzdCBlZGdlIG9mIHRoZSBwb2x5Z29uLCB3aGljaCB1c2VzIHRoZSBsaW5lIHN0cm9rZSBzdHlsaW5nIGluc3RlYWRcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLXN0cm9rZS1hY3RpdmUnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgbGF5b3V0OiB7XG4gICAgICAnbGluZS1jYXAnOiAncm91bmQnLFxuICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICdsaW5lLWRhc2hhcnJheSc6IFswLjIsIDJdLFxuICAgICAgJ2xpbmUtd2lkdGgnOiA0XG4gICAgfVxuICB9LFxuICAvLyB2ZXJ0ZXggcG9pbnQgaGFsb3NcbiAge1xuICAgIGlkOiAnZ2wtZHJhdy1wb2x5Z29uLWFuZC1saW5lLXZlcnRleC1oYWxvLWFjdGl2ZScsXG4gICAgdHlwZTogJ2NpcmNsZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnbWV0YScsICd2ZXJ0ZXgnXSwgWyc9PScsICckdHlwZScsICdQb2ludCddLCBbJyE9JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIHBhaW50OiB7XG4gICAgICAnY2lyY2xlLXJhZGl1cyc6IDcsXG4gICAgICAnY2lyY2xlLWNvbG9yJzogJyNGRkYnXG4gICAgfVxuICB9LFxuICAvLyB2ZXJ0ZXggcG9pbnRzXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcG9seWdvbi1hbmQtbGluZS12ZXJ0ZXgtYWN0aXZlJyxcbiAgICB0eXBlOiAnY2lyY2xlJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICdtZXRhJywgJ3ZlcnRleCddLCBbJz09JywgJyR0eXBlJywgJ1BvaW50J10sIFsnIT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdjaXJjbGUtcmFkaXVzJzogNixcbiAgICAgICdjaXJjbGUtY29sb3InOiAnI0Q5NkIyNydcbiAgICB9XG4gIH0sXG5cbiAgLy8gcmFkaXVzIGxhYmVsXG4gIHtcbiAgICBpZDogJ2dsLWRyYXctcmFkaXVzLWxhYmVsJyxcbiAgICB0eXBlOiAnc3ltYm9sJyxcbiAgICBmaWx0ZXI6IFsnPT0nLCAnbWV0YScsICdjdXJyZW50UG9zaXRpb24nXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICd0ZXh0LWZpZWxkJzogJ3tyYWRpdXNGZWV0fSBcXG4ge3JhZGl1c01pbGVzfScsXG4gICAgICAndGV4dC1hbmNob3InOiAnbGVmdCcsXG4gICAgICAndGV4dC1vZmZzZXQnOiBbXG4gICAgICAgIDEsXG4gICAgICAgIDBcbiAgICAgIF0sXG4gICAgICAndGV4dC1zaXplJzogMjJcbiAgICB9LFxuICAgIHBhaW50OiB7XG4gICAgICAndGV4dC1jb2xvcic6ICdyZ2JhKDAsIDAsIDAsIDEpJyxcbiAgICAgICd0ZXh0LWhhbG8tY29sb3InOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsXG4gICAgICAndGV4dC1oYWxvLXdpZHRoJzogMyxcbiAgICAgICdpY29uLW9wYWNpdHknOiB7XG4gICAgICAgIGJhc2U6IDEsXG4gICAgICAgIHN0b3BzOiBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgNy45OSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIDgsXG4gICAgICAgICAgICAwXG4gICAgICAgICAgXVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgJ3RleHQtaGFsby1ibHVyJzogMVxuICAgIH1cbiAgfSxcblxuICAvLyBJTkFDVElWRSAoc3RhdGljLCBhbHJlYWR5IGRyYXduKVxuICAvLyBsaW5lIHN0cm9rZVxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LWxpbmUtc3RhdGljJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgZmlsdGVyOiBbJ2FsbCcsIFsnPT0nLCAnJHR5cGUnLCAnTGluZVN0cmluZyddLCBbJz09JywgJ21vZGUnLCAnc3RhdGljJ11dLFxuICAgIGxheW91dDoge1xuICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICdsaW5lLWpvaW4nOiAncm91bmQnXG4gICAgfSxcbiAgICBwYWludDoge1xuICAgICAgJ2xpbmUtY29sb3InOiAnIzAwMCcsXG4gICAgICAnbGluZS13aWR0aCc6IDNcbiAgICB9XG4gIH0sXG4gIC8vIHBvbHlnb24gZmlsbFxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tZmlsbC1zdGF0aWMnLFxuICAgIHR5cGU6ICdmaWxsJyxcbiAgICBmaWx0ZXI6IFsnYWxsJywgWyc9PScsICckdHlwZScsICdQb2x5Z29uJ10sIFsnPT0nLCAnbW9kZScsICdzdGF0aWMnXV0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdmaWxsLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2ZpbGwtb3V0bGluZS1jb2xvcic6ICcjMDAwJyxcbiAgICAgICdmaWxsLW9wYWNpdHknOiAwLjFcbiAgICB9XG4gIH0sXG4gIC8vIHBvbHlnb24gb3V0bGluZVxuICB7XG4gICAgaWQ6ICdnbC1kcmF3LXBvbHlnb24tc3Ryb2tlLXN0YXRpYycsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGZpbHRlcjogWydhbGwnLCBbJz09JywgJyR0eXBlJywgJ1BvbHlnb24nXSwgWyc9PScsICdtb2RlJywgJ3N0YXRpYyddXSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgICdsaW5lLWNhcCc6ICdyb3VuZCcsXG4gICAgICAnbGluZS1qb2luJzogJ3JvdW5kJ1xuICAgIH0sXG4gICAgcGFpbnQ6IHtcbiAgICAgICdsaW5lLWNvbG9yJzogJyMwMDAnLFxuICAgICAgJ2xpbmUtd2lkdGgnOiAzXG4gICAgfVxuICB9XG5dO1xuIiwiLy8gaW1wb3J0IGRlcGVuZGVuY2llc1xuaW1wb3J0IHsgbGlicmFyeSwgZG9tIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcbmltcG9ydCB7IGZhcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBmYXIgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1yZWd1bGFyLXN2Zy1pY29ucyc7XG5pbXBvcnQgbWFwYm94Z2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWRyYXcnO1xuaW1wb3J0IE1hcGJveEdlb2NvZGVyIGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWdlb2NvZGVyJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgUmFkaXVzTW9kZSBmcm9tICcuL3JhZGl1cy1tb2RlJztcbmltcG9ydCBkcmF3U3R5bGVzIGZyb20gJy4vZHJhd3N0eWxlcyc7XG5cbi8vIEtpY2tzIG9mZiB0aGUgcHJvY2VzcyBvZiBmaW5kaW5nIDxpPiB0YWdzIGFuZCByZXBsYWNpbmcgd2l0aCA8c3ZnPlxuLy8gYWRkZXMgc3VwcG9ydCBmb3IgZm9udGF3ZXNvbWVcbmxpYnJhcnkuYWRkKGZhcywgZmFyKTtcbmRvbS53YXRjaCgpO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSh7fSk7XG5zdG9yZS5zZXRTdGF0ZUl0ZW0oJ2RhdmVpc20nLCAne3Rlc3Q6dHJ1ZX0nKTtcblxubWFwYm94Z2wuYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2laR0YyWldsemJTSXNJbUVpT2lKQ2RqVXhUMEZ6SW4wLlY5b0lrX3dVYzR1WnU3VUJibFI4bXcnO1xuXG5jb25zdCBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcbiAgY29udGFpbmVyOiAnbWFwJyxcbiAgc3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExJyxcbiAgY2VudGVyOiBbLTk4LCAzOC44OF0sIC8vIHN0YXJ0aW5nIHBvc2l0aW9uIFtsbmcsIGxhdF1cbiAgLy8gbWF4Wm9vbTogMTQsXG4gIHpvb206IDMsIC8vIHN0YXJ0aW5nIHpvb21cbiAgc2hvd1pvb206IHRydWVcbn0pO1xuXG5jb25zdCBuYXYgPSBuZXcgbWFwYm94Z2wuTmF2aWdhdGlvbkNvbnRyb2woKTtcbm1hcC5hZGRDb250cm9sKG5hdiwgJ3RvcC1sZWZ0Jyk7XG5cbmNvbnN0IGdlb2NvZGVyID0gbmV3IE1hcGJveEdlb2NvZGVyKHtcbiAgYWNjZXNzVG9rZW46IG1hcGJveGdsLmFjY2Vzc1Rva2VuLFxuICBtYXBib3hnbCxcbiAgc2V0Wm9vbTogOCxcbiAgZmx5VG86IGZhbHNlLFxuICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBmb3IgbG9jYXRpb25zLi4uJ1xufSk7XG5cbmdlb2NvZGVyLm9uKCdyZXN1bHQnLCAoZSkgPT4ge1xuICBjb25zdCB4ID0gZS5yZXN1bHQuY2VudGVyWzBdO1xuICBjb25zdCB5ID0gZS5yZXN1bHQuY2VudGVyWzFdO1xuICBjb25zdCBvZmZzZXRkaXN0ID0gMC4wMDI1O1xuICBjb25zdCBiYm94ID0gW1t4IC0gb2Zmc2V0ZGlzdCwgeSAtIG9mZnNldGRpc3RdLCBbeCArIG9mZnNldGRpc3QsIHkgKyBvZmZzZXRkaXN0XV07XG4gIG1hcC5maXRCb3VuZHMoYmJveCwgeyBtYXhab29tOiAxMiB9KTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VvY29kZXInKS5hcHBlbmRDaGlsZChnZW9jb2Rlci5vbkFkZChtYXApKTtcblxuY29uc3QgZHJhd0NvbnRyb2wgPSBuZXcgTWFwYm94RHJhdyh7XG4gIGRpc3BsYXlDb250cm9sc0RlZmF1bHQ6IGZhbHNlLFxuICBjb250cm9sczoge1xuICAgIHJlY3RhbmdsZTogZmFsc2UsXG4gICAgcG9seWdvbjogZmFsc2UsXG4gICAgdHJhc2g6IGZhbHNlXG4gIH0sXG4gIHN0eWxlczogZHJhd1N0eWxlcyxcbiAgbW9kZXM6IE9iamVjdC5hc3NpZ24oe1xuICAgIGRyYXdfcmFkaXVzOiBSYWRpdXNNb2RlXG4gIH0sIE1hcGJveERyYXcubW9kZXMpXG59KTtcblxubWFwLmFkZENvbnRyb2woZHJhd0NvbnRyb2wpO1xuXG5mdW5jdGlvbiBoYW5kbGVEcmF3QnV0dG9uQ2xpY2soZSkge1xuICBkcmF3Q29udHJvbC50cmFzaCgpO1xuXG4gIGlmIChtYXAuZ2V0TGF5ZXIoJ2NpcmNsZS1saW5lJykpIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1saW5lJyk7XG4gIH1cblxuICBpZiAobWFwLmdldExheWVyKCdjaXJjbGUtZmlsbCcpKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKCdjaXJjbGUtZmlsbCcpO1xuICB9XG4gIGlmIChtYXAuZ2V0U291cmNlKCdjaXJjbGUnKSkge1xuICAgIG1hcC5yZW1vdmVTb3VyY2UoJ2NpcmNsZScpO1xuICB9XG5cbiAgZHJhd0NvbnRyb2wuY2hhbmdlTW9kZSgnZHJhd19yYWRpdXMnKTtcbn1cbmNvbnN0IGRyYXdDaXJjbGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1kcmF3LWNpcmNsZScpO1xuZHJhd0NpcmNsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEcmF3QnV0dG9uQ2xpY2spO1xuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY2hyaXN3aG9uZy82OTQ3NzliYzFmMWU1ZDkyNmU0N2JhYjcyMDVmYTU1OVxuLy8gY3VzdG9tIG1hcGJvcHgtZ2wtZHJhdyBtb2RlIHRoYXQgbW9kaWZpZXMgZHJhd19saW5lX3N0cmluZ1xuLy8gc2hvd3MgYSBjZW50ZXIgcG9pbnQsIHJhZGl1cyBsaW5lLCBhbmQgY2lyY2xlIHBvbHlnb24gd2hpbGUgZHJhd2luZ1xuLy8gZm9yY2VzIGRyYXcuY3JlYXRlIG9uIGNyZWF0aW9uIG9mIHNlY29uZCB2ZXJ0ZXhcbmltcG9ydCBNYXBib3hEcmF3IGZyb20gJ0BtYXBib3gvbWFwYm94LWdsLWRyYXcnO1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XG5pbXBvcnQgbGluZURpc3RhbmNlIGZyb20gJ0B0dXJmL2xpbmUtZGlzdGFuY2UnO1xuXG5jb25zdCBSYWRpdXNNb2RlID0gTWFwYm94RHJhdy5tb2Rlcy5kcmF3X2xpbmVfc3RyaW5nO1xuXG5mdW5jdGlvbiBjcmVhdGVWZXJ0ZXgocGFyZW50SWQsIGNvb3JkaW5hdGVzLCBwYXRoLCBzZWxlY3RlZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBtZXRhOiAndmVydGV4JyxcbiAgICAgIHBhcmVudDogcGFyZW50SWQsXG4gICAgICBjb29yZF9wYXRoOiBwYXRoLFxuICAgICAgYWN0aXZlOiAoc2VsZWN0ZWQpID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgIH0sXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBjb29yZGluYXRlc1xuICAgIH1cbiAgfTtcbn1cblxuLy8gY3JlYXRlIGEgY2lyY2xlLWxpa2UgcG9seWdvbiBnaXZlbiBhIGNlbnRlciBwb2ludCBhbmQgcmFkaXVzXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNzU5OTU2MS9kcmF3aW5nLWEtY2lyY2xlLXdpdGgtdGhlLXJhZGl1cy1pbi1taWxlcy1tZXRlcnMtd2l0aC1tYXBib3gtZ2wtanMvMzkwMDYzODgjMzkwMDYzODhcbmZ1bmN0aW9uIGNyZWF0ZUdlb0pTT05DaXJjbGUoY2VudGVyLCByYWRpdXNJbkttLCBwYXJlbnRJZCwgcG9pbnRzID0gNjQpIHtcbiAgY29uc3QgY29vcmRzID0ge1xuICAgIGxhdGl0dWRlOiBjZW50ZXJbMV0sXG4gICAgbG9uZ2l0dWRlOiBjZW50ZXJbMF1cbiAgfTtcblxuICBjb25zdCBrbSA9IHJhZGl1c0luS207XG5cbiAgY29uc3QgcmV0ID0gW107XG4gIGNvbnN0IGRpc3RhbmNlWCA9IGttIC8gKDExMS4zMjAgKiBNYXRoLmNvcygoY29vcmRzLmxhdGl0dWRlICogTWF0aC5QSSkgLyAxODApKTtcbiAgY29uc3QgZGlzdGFuY2VZID0ga20gLyAxMTAuNTc0O1xuXG4gIGxldCB0aGV0YTtcbiAgbGV0IHg7XG4gIGxldCB5O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50czsgaSArPSAxKSB7XG4gICAgdGhldGEgPSAoaSAvIHBvaW50cykgKiAoMiAqIE1hdGguUEkpO1xuICAgIHggPSBkaXN0YW5jZVggKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgeSA9IGRpc3RhbmNlWSAqIE1hdGguc2luKHRoZXRhKTtcblxuICAgIHJldC5wdXNoKFtjb29yZHMubG9uZ2l0dWRlICsgeCwgY29vcmRzLmxhdGl0dWRlICsgeV0pO1xuICB9XG4gIHJldC5wdXNoKHJldFswXSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBbcmV0XVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgcGFyZW50OiBwYXJlbnRJZCxcbiAgICAgIGFjdGl2ZTogJ3RydWUnXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5TWVhc3VyZW1lbnRzKGZlYXR1cmUpIHtcbiAgLy8gc2hvdWxkIGxvZyBib3RoIG1ldHJpYyBhbmQgc3RhbmRhcmQgZGlzcGxheSBzdHJpbmdzIGZvciB0aGUgY3VycmVudCBkcmF3biBmZWF0dXJlXG5cblxuICAvLyBtZXRyaWMgY2FsY3VsYXRpb25cbiAgY29uc3QgZHJhd25MZW5ndGggPSAobGluZURpc3RhbmNlKGZlYXR1cmUpICogMTAwMCk7IC8vIG1ldGVyc1xuXG4gIGxldCBtZXRyaWNVbml0cyA9ICdtJztcbiAgbGV0IG1ldHJpY0Zvcm1hdCA9ICcwLDAnO1xuICBsZXQgbWV0cmljTWVhc3VyZW1lbnQ7XG5cbiAgbGV0IHN0YW5kYXJkVW5pdHMgPSAnZmVldCc7XG4gIGxldCBzdGFuZGFyZEZvcm1hdCA9ICcwLDAnO1xuICBsZXQgc3RhbmRhcmRNZWFzdXJlbWVudDtcblxuICBtZXRyaWNNZWFzdXJlbWVudCA9IGRyYXduTGVuZ3RoO1xuICBpZiAoZHJhd25MZW5ndGggPj0gMTAwMCkgeyAvLyBpZiBvdmVyIDEwMDAgbWV0ZXJzLCB1cGdyYWRlIG1ldHJpY1xuICAgIG1ldHJpY01lYXN1cmVtZW50ID0gZHJhd25MZW5ndGggLyAxMDAwO1xuICAgIG1ldHJpY1VuaXRzID0gJ2ttJztcbiAgICBtZXRyaWNGb3JtYXQgPSAnMC4wMCc7XG4gIH1cblxuICBzdGFuZGFyZE1lYXN1cmVtZW50ID0gZHJhd25MZW5ndGggKiAzLjI4MDg0O1xuICBpZiAoc3RhbmRhcmRNZWFzdXJlbWVudCA+PSA1MjgwKSB7IC8vIGlmIG92ZXIgNTI4MCBmZWV0LCB1cGdyYWRlIHN0YW5kYXJkXG4gICAgc3RhbmRhcmRNZWFzdXJlbWVudCAvPSA1MjgwO1xuICAgIHN0YW5kYXJkVW5pdHMgPSAnbWknO1xuICAgIHN0YW5kYXJkRm9ybWF0ID0gJzAuMDAnO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheU1lYXN1cmVtZW50cyA9IHtcbiAgICBtZXRyaWM6IGAke251bWVyYWwobWV0cmljTWVhc3VyZW1lbnQpLmZvcm1hdChtZXRyaWNGb3JtYXQpfSAke21ldHJpY1VuaXRzfWAsXG4gICAgc3RhbmRhcmQ6IGAke251bWVyYWwoc3RhbmRhcmRNZWFzdXJlbWVudCkuZm9ybWF0KHN0YW5kYXJkRm9ybWF0KX0gJHtzdGFuZGFyZFVuaXRzfWBcbiAgfTtcblxuICByZXR1cm4gZGlzcGxheU1lYXN1cmVtZW50cztcbn1cblxuY29uc3QgZG91YmxlQ2xpY2tab29tID0ge1xuICBlbmFibGU6IChjdHgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIEZpcnN0IGNoZWNrIHdlJ3ZlIGdvdCBhIG1hcCBhbmQgc29tZSBjb250ZXh0LlxuICAgICAgaWYgKCFjdHgubWFwIHx8ICFjdHgubWFwLmRvdWJsZUNsaWNrWm9vbSB8fCAhY3R4Ll9jdHggfHxcbiAgICAgICAgICFjdHguX2N0eC5zdG9yZSB8fCAhY3R4Ll9jdHguc3RvcmUuZ2V0SW5pdGlhbENvbmZpZ1ZhbHVlKSByZXR1cm47XG4gICAgICAvLyBOb3cgY2hlY2sgaW5pdGlhbCBzdGF0ZSB3YXNuJ3QgZmFsc2UgKHdlIGxlYXZlIGl0IGRpc2FibGVkIGlmIHNvKVxuICAgICAgaWYgKCFjdHguX2N0eC5zdG9yZS5nZXRJbml0aWFsQ29uZmlnVmFsdWUoJ2RvdWJsZUNsaWNrWm9vbScpKSByZXR1cm47XG4gICAgICBjdHgubWFwLmRvdWJsZUNsaWNrWm9vbS5lbmFibGUoKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuUmFkaXVzTW9kZS5jbGlja0FueXdoZXJlID0gZnVuY3Rpb24gY2xpY2tBbnl3aGVyZShzdGF0ZSwgZSkge1xuICAvLyB0aGlzIGVuZHMgdGhlIGRyYXdpbmcgYWZ0ZXIgdGhlIHVzZXIgY3JlYXRlcyBhIHNlY29uZCBwb2ludCwgdHJpZ2dlcmluZyB0aGlzLm9uU3RvcFxuICBpZiAoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uID09PSAxKSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VNb2RlKCdzaW1wbGVfc2VsZWN0JywgeyBmZWF0dXJlSWRzOiBbc3RhdGUubGluZS5pZF0gfSk7XG4gIH1cbiAgdGhpcy51cGRhdGVVSUNsYXNzZXMoeyBtb3VzZTogJ2FkZCcgfSk7XG4gIHN0YXRlLmxpbmUudXBkYXRlQ29vcmRpbmF0ZShzdGF0ZS5jdXJyZW50VmVydGV4UG9zaXRpb24sIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgaWYgKHN0YXRlLmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKSB7XG4gICAgc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uICs9IDE7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBzdGF0ZS5saW5lLnVwZGF0ZUNvb3JkaW5hdGUoc3RhdGUuY3VycmVudFZlcnRleFBvc2l0aW9uLCBlLmxuZ0xhdC5sbmcsIGUubG5nTGF0LmxhdCk7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubGluZS5hZGRDb29yZGluYXRlKDAsIGUubG5nTGF0LmxuZywgZS5sbmdMYXQubGF0KTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gY3JlYXRlcyB0aGUgZmluYWwgZ2VvanNvbiBwb2ludCBmZWF0dXJlIHdpdGggYSByYWRpdXMgcHJvcGVydHlcbi8vIHRyaWdnZXJzIGRyYXcuY3JlYXRlXG5SYWRpdXNNb2RlLm9uU3RvcCA9IGZ1bmN0aW9uIG9uU3RvcChzdGF0ZSkge1xuICBkb3VibGVDbGlja1pvb20uZW5hYmxlKHRoaXMpO1xuXG4gIHRoaXMuYWN0aXZhdGVVSUJ1dHRvbigpO1xuXG4gIC8vIGNoZWNrIHRvIHNlZSBpZiB3ZSd2ZSBkZWxldGVkIHRoaXMgZmVhdHVyZVxuICBpZiAodGhpcy5nZXRGZWF0dXJlKHN0YXRlLmxpbmUuaWQpID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAvLyByZW1vdmUgbGFzdCBhZGRlZCBjb29yZGluYXRlXG4gIHN0YXRlLmxpbmUucmVtb3ZlQ29vcmRpbmF0ZSgnMCcpO1xuICBpZiAoc3RhdGUubGluZS5pc1ZhbGlkKCkpIHtcbiAgICBjb25zdCBsaW5lR2VvSnNvbiA9IHN0YXRlLmxpbmUudG9HZW9KU09OKCk7XG4gICAgY29uc3Qgc3RhcnRQb2ludCA9IGxpbmVHZW9Kc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdO1xuICAgIGNvbnN0IGRpc3RhbmNlID0gbGluZURpc3RhbmNlKGxpbmVHZW9Kc29uKTtcblxuICAgIGNvbnN0IGNpcmNsZUdlb0pTT04gPSBjcmVhdGVHZW9KU09OQ2lyY2xlKHN0YXJ0UG9pbnQsIGRpc3RhbmNlLCBudWxsLCAzMik7XG5cbiAgICAvLyByZWNvbmZpZ3VyZSB0aGUgZ2VvanNvbiBsaW5lIGludG8gYSBnZW9qc29uIHBvaW50IHdpdGggYSByYWRpdXMgcHJvcGVydHlcbiAgICBjb25zdCBwb2ludFdpdGhSYWRpdXMgPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBnZW9tZXRyeToge1xuICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjaXJjbGVHZW9KU09OLmdlb21ldHJ5LmNvb3JkaW5hdGVzXG4gICAgICB9LFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICByYWRpdXM6IChsaW5lRGlzdGFuY2UobGluZUdlb0pzb24pKS50b0ZpeGVkKDEpXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLm1hcC5nZXRMYXllcignY2lyY2xlLWxpbmUnKSkge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIoJ2NpcmNsZS1saW5lJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWFwLmdldExheWVyKCdjaXJjbGUtZmlsbCcpKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVMYXllcignY2lyY2xlLWZpbGwnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFwLmdldFNvdXJjZSgnY2lyY2xlJykpIHtcbiAgICAgIHRoaXMubWFwLnJlbW92ZVNvdXJjZSgnY2lyY2xlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXAuYWRkU291cmNlKCdjaXJjbGUnLCB7XG4gICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICBkYXRhOiBwb2ludFdpdGhSYWRpdXNcbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmFkZExheWVyKHtcbiAgICAgIGlkOiAnY2lyY2xlLWZpbGwnLFxuICAgICAgdHlwZTogJ2ZpbGwnLFxuICAgICAgc291cmNlOiAnY2lyY2xlJyxcbiAgICAgIHBhaW50OiB7XG4gICAgICAgICdmaWxsLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJzogJyNEMjBDMEMnLFxuICAgICAgICAnZmlsbC1vcGFjaXR5JzogMC4xXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcC5hZGRMYXllcih7XG4gICAgICBpZDogJ2NpcmNsZS1saW5lJyxcbiAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgIHNvdXJjZTogJ2NpcmNsZScsXG4gICAgICBsYXlvdXQ6IHtcbiAgICAgICAgJ2xpbmUtY2FwJzogJ3JvdW5kJyxcbiAgICAgICAgJ2xpbmUtam9pbic6ICdyb3VuZCdcbiAgICAgIH0sXG4gICAgICBwYWludDoge1xuICAgICAgICAnbGluZS1jb2xvcic6ICcjRDk2QjI3JyxcbiAgICAgICAgJ2xpbmUtZGFzaGFycmF5JzogWzAuMiwgMl0sXG4gICAgICAgICdsaW5lLXdpZHRoJzogNFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAuZmlyZSgnZHJhdy5jcmVhdGUnLCB7XG4gICAgICBmZWF0dXJlczogW3BvaW50V2l0aFJhZGl1c11cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRlbGV0ZUZlYXR1cmUoW3N0YXRlLmxpbmUuaWRdLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICB0aGlzLmNoYW5nZU1vZGUoJ3NpbXBsZV9zZWxlY3QnLCB7fSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gIH1cbn07XG5cblJhZGl1c01vZGUudG9EaXNwbGF5RmVhdHVyZXMgPSBmdW5jdGlvbiB0b0Rpc3BsYXlGZWF0dXJlcyhzdGF0ZSwgZ2VvanNvbiwgZGlzcGxheSkge1xuICBjb25zdCBpc0FjdGl2ZUxpbmUgPSBnZW9qc29uLnByb3BlcnRpZXMuaWQgPT09IHN0YXRlLmxpbmUuaWQ7XG4gIGdlb2pzb24ucHJvcGVydGllcy5hY3RpdmUgPSAoaXNBY3RpdmVMaW5lKSA/ICd0cnVlJyA6ICdmYWxzZSc7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICghaXNBY3RpdmVMaW5lKSByZXR1cm4gZGlzcGxheShnZW9qc29uKTtcblxuICAvLyBPbmx5IHJlbmRlciB0aGUgbGluZSBpZiBpdCBoYXMgYXQgbGVhc3Qgb25lIHJlYWwgY29vcmRpbmF0ZVxuICBpZiAoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggPCAyKSByZXR1cm4gbnVsbDtcbiAgZ2VvanNvbi5wcm9wZXJ0aWVzLm1ldGEgPSAnZmVhdHVyZSc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAvLyBkaXNwbGF5cyBjZW50ZXIgdmVydGV4IGFzIGEgcG9pbnQgZmVhdHVyZVxuICBkaXNwbGF5KGNyZWF0ZVZlcnRleChcbiAgICBzdGF0ZS5saW5lLmlkLFxuICAgIGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbc3RhdGUuZGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCAtIDIgOiAxXSxcbiAgICBgJHtzdGF0ZS5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoIC0gMiA6IDF9YCxcbiAgICBmYWxzZSxcbiAgKSk7XG5cbiAgLy8gZGlzcGxheXMgdGhlIGxpbmUgYXMgaXQgaXMgZHJhd25cbiAgZGlzcGxheShnZW9qc29uKTtcblxuICBjb25zdCBkaXNwbGF5TWVhc3VyZW1lbnRzID0gZ2V0RGlzcGxheU1lYXN1cmVtZW50cyhnZW9qc29uKTtcblxuICAvLyBjcmVhdGUgY3VzdG9tIGZlYXR1cmUgZm9yIHRoZSBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb25cbiAgY29uc3QgY3VycmVudFZlcnRleCA9IHtcbiAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbWV0YTogJ2N1cnJlbnRQb3NpdGlvbicsXG4gICAgICBhY3RpdmU6ICd0cnVlJyxcbiAgICAgIHJhZGl1c01ldHJpYzogZGlzcGxheU1lYXN1cmVtZW50cy5tZXRyaWMsXG4gICAgICByYWRpdXNTdGFuZGFyZDogZGlzcGxheU1lYXN1cmVtZW50cy5zdGFuZGFyZCxcbiAgICAgIHBhcmVudDogc3RhdGUubGluZS5pZFxuICAgIH0sXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBjb29yZGluYXRlczogZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXVxuICAgIH1cbiAgfTtcbiAgZGlzcGxheShjdXJyZW50VmVydGV4KTtcblxuICAvLyBjcmVhdGUgY3VzdG9tIGZlYXR1cmUgZm9yIHJhZGl1cyBjaXJjbGVtYXJrZXJcbiAgY29uc3QgY2VudGVyID0gZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXTtcbiAgY29uc3QgcmFkaXVzSW5LbSA9IGxpbmVEaXN0YW5jZShnZW9qc29uLCAna2lsb21ldGVycycpO1xuICBjb25zdCBjaXJjbGVGZWF0dXJlID0gY3JlYXRlR2VvSlNPTkNpcmNsZShjZW50ZXIsIHJhZGl1c0luS20sIHN0YXRlLmxpbmUuaWQpO1xuICBjaXJjbGVGZWF0dXJlLnByb3BlcnRpZXMubWV0YSA9ICdyYWRpdXMnO1xuXG4gIGRpc3BsYXkoY2lyY2xlRmVhdHVyZSk7XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSYWRpdXNNb2RlO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==